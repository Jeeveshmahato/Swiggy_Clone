import Card, { RatCard } from "./Card";
import { useContext, useEffect, useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import useOnlineOffline from "../utils/useOnlineOffline";
import Username from "../utils/UserContext";

const SWIGGY_API_URL =
  "https://www.swiggy.com/dapi/restaurants/list/v5?lat=22.5743545&lng=88.3628734&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING";
const SWIGGY_UPDATE_URL =
  "https://www.swiggy.com/dapi/restaurants/list/update";
const LAT = "22.5743545";
const LNG = "88.3628734";

const ShimmerCard = () => (
  <div className="animate-fade-in">
    <div className="w-full h-[150px] sm:h-[180px] shimmer-bg rounded-2xl mb-3"></div>
    <div className="h-4 w-3/4 shimmer-bg mb-2"></div>
    <div className="h-3 w-1/2 shimmer-bg mb-1"></div>
    <div className="h-3 w-2/3 shimmer-bg"></div>
  </div>
);

const Body = () => {
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [activeFilter, setActiveFilter] = useState(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [pageOffset, setPageOffset] = useState(null);
  const [isFiltered, setIsFiltered] = useState(false);

  const sentinelRef = useRef(null);
  // Refs to avoid stale closures in IntersectionObserver callback
  const isLoadingMoreRef = useRef(false);
  const hasMoreRef = useRef(true);
  const pageOffsetRef = useRef(null);
  const isFilteredRef = useRef(false);
  const RatedCard = RatCard(Card);
  const { localUser, setUserNamelog } = useContext(Username);

  const applyCurrentFilters = useCallback(
    (restaurants) => {
      let result = restaurants;
      if (activeFilter === "rating") {
        result = result.filter((res) => res.info.avgRating >= 4.4);
      } else if (activeFilter === "fast") {
        result = result.filter((res) => res.info.sla?.deliveryTime <= 30);
      }
      if (searchText.trim()) {
        result = result.filter((res) =>
          res.info.name.toLowerCase().includes(searchText.toLowerCase())
        );
      }
      return result;
    },
    [activeFilter, searchText]
  );

  const fetchData = async () => {
    try {
      setIsInitialLoading(true);
      const response = await fetch(SWIGGY_API_URL);
      const json = await response.json();

      const restaurants =
        json.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants ||
        json.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants ||
        [];

      // Extract pagination offset from response
      const offset = json.data?.pageOffset || null;
      pageOffsetRef.current = offset;
      setPageOffset(offset);
      hasMoreRef.current = !!offset?.nextOffset;
      setHasMore(!!offset?.nextOffset);

      setAllRestaurants(restaurants);
      setFilteredList(restaurants);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsInitialLoading(false);
    }
  };

  // Stable fetch function — reads mutable refs instead of stale closure state.
  // This prevents the IntersectionObserver from being torn down and recreated
  // on every state change, which was causing the infinite reconnect cycle.
  const fetchMoreRestaurants = useCallback(async () => {
    if (
      isLoadingMoreRef.current ||
      !hasMoreRef.current ||
      !pageOffsetRef.current?.nextOffset ||
      isFilteredRef.current
    )
      return;

    try {
      isLoadingMoreRef.current = true;
      setIsLoadingMore(true);

      const currentOffset = pageOffsetRef.current;
      const response = await fetch(SWIGGY_UPDATE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lat: parseFloat(LAT),
          lng: parseFloat(LNG),
          nextOffset: currentOffset.nextOffset,
          widgetOffset: currentOffset.widgetOffset || null,
          seoParams: {
            apiName: "FoodHomePage",
            pageType: "FOOD_HOMEPAGE",
            seoUrl: "https://www.swiggy.com/",
          },
        }),
      });
      const json = await response.json();

      const newRestaurants =
        json.data?.cards?.[0]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants || [];

      if (newRestaurants.length === 0) {
        hasMoreRef.current = false;
        setHasMore(false);
        return;
      }

      const newOffset = json.data?.pageOffset || null;
      pageOffsetRef.current = newOffset;
      setPageOffset(newOffset);
      hasMoreRef.current = !!newOffset?.nextOffset;
      setHasMore(!!newOffset?.nextOffset);

      setAllRestaurants((prev) => {
        const existingIds = new Set(prev.map((r) => r.info.id));
        const unique = newRestaurants.filter(
          (r) => !existingIds.has(r.info.id)
        );
        return [...prev, ...unique];
      });
      setFilteredList((prev) => {
        const existingIds = new Set(prev.map((r) => r.info.id));
        const unique = newRestaurants.filter(
          (r) => !existingIds.has(r.info.id)
        );
        return [...prev, ...unique];
      });
    } catch (error) {
      console.error("Error fetching more restaurants:", error);
    } finally {
      isLoadingMoreRef.current = false;
      setIsLoadingMore(false);
    }
  }, []); // Stable — no deps, reads from refs

  // IntersectionObserver for infinite scroll — set up once, stays stable
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fetchMoreRestaurants();
        }
      },
      { threshold: 0.1, rootMargin: "400px" }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [fetchMoreRestaurants]);

  useEffect(() => {
    fetchData();
  }, []);

  // Update filtered list when filters change
  useEffect(() => {
    if (allRestaurants.length === 0) return;
    const anyFilterActive =
      activeFilter !== null || searchText.trim() !== "";
    isFilteredRef.current = anyFilterActive;
    setIsFiltered(anyFilterActive);
    setFilteredList(applyCurrentFilters(allRestaurants));
  }, [activeFilter, searchText, allRestaurants, applyCurrentFilters]);

  const handleCategoryFilter = (catName) => {
    const filtered = allRestaurants.filter((res) =>
      res.info.cuisines?.some((c) =>
        c.toLowerCase().includes(catName.toLowerCase())
      )
    );
    if (filtered.length > 0) {
      setFilteredList(filtered);
      setIsFiltered(true);
      setActiveFilter("category:" + catName);
    }
  };

  const clearFilters = () => {
    setFilteredList(allRestaurants);
    setActiveFilter(null);
    setSearchText("");
    isFilteredRef.current = false;
    setIsFiltered(false);
  };

  const status = useOnlineOffline();
  if (status === false) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center px-4">
        <div className="text-5xl mb-4">📡</div>
        <h2 className="text-xl font-semibold text-slate-title mb-2">
          You are offline
        </h2>
        <p className="text-slate-muted">
          Please check your internet connection and try again.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto px-3 sm:px-4 md:px-5">
      {/* Category Carousel */}
      <section className="py-5 sm:py-6 md:py-8 border-b border-slate-border">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-title mb-4 sm:mb-5">
          What's on your mind?
        </h2>
        <div className="flex gap-3 sm:gap-4 overflow-x-auto scrollbar-hide pb-2 -mx-3 px-3 sm:mx-0 sm:px-0">
          {[
            { name: "Pizza", icon: "🍕" },
            { name: "Burgers", icon: "🍔" },
            { name: "Biryani", icon: "🍛" },
            { name: "Chinese", icon: "🥡" },
            { name: "Desserts", icon: "🍰" },
            { name: "North Indian", icon: "🍲" },
            { name: "South Indian", icon: "🥘" },
            { name: "Rolls", icon: "🌯" },
            { name: "Thali", icon: "🍱" },
            { name: "Noodles", icon: "🍜" },
          ].map((cat) => (
            <button
              key={cat.name}
              onClick={() => handleCategoryFilter(cat.name)}
              className={`flex flex-col items-center gap-1.5 sm:gap-2 min-w-[64px] sm:min-w-[80px] group cursor-pointer ${
                activeFilter === "category:" + cat.name
                  ? "opacity-100"
                  : "opacity-80 hover:opacity-100"
              }`}
            >
              <div
                className={`w-[56px] h-[56px] sm:w-[72px] sm:h-[72px] md:w-[80px] md:h-[80px] rounded-full flex items-center justify-center transition-all duration-200 ${
                  activeFilter === "category:" + cat.name
                    ? "bg-swiggy-orange text-white shadow-button scale-105"
                    : "bg-swiggy-orange-light group-hover:bg-swiggy-orange group-hover:text-white"
                }`}
              >
                <span className="text-xl sm:text-2xl md:text-3xl">
                  {cat.icon}
                </span>
              </div>
              <span
                className={`text-[10px] sm:text-xs font-medium whitespace-nowrap transition-colors ${
                  activeFilter === "category:" + cat.name
                    ? "text-swiggy-orange font-semibold"
                    : "text-slate-body group-hover:text-slate-title"
                }`}
              >
                {cat.name}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Search + Filters */}
      <section className="py-3 sm:py-4 md:py-5 flex flex-col gap-3 border-b border-slate-border">
        {/* Search bar - full width on mobile */}
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-muted"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            data-testid="searchInput"
            type="search"
            placeholder="Search for restaurants and food"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-slate-bg rounded-xl border-0 text-sm text-slate-title placeholder:text-slate-muted focus:outline-none focus:ring-2 focus:ring-swiggy-orange/30 transition-shadow"
          />
        </div>

        {/* Filter pills - horizontal scroll on mobile */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-3 px-3 sm:mx-0 sm:px-0 pb-1">
          <button
            data-testid="best_btn"
            onClick={() => {
              if (activeFilter === "rating") {
                clearFilters();
              } else {
                setActiveFilter("rating");
              }
            }}
            className={`flex-shrink-0 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-full border transition-all whitespace-nowrap active:scale-95 ${
              activeFilter === "rating"
                ? "bg-slate-title text-white border-slate-title shadow-sm"
                : "border-slate-border text-slate-body hover:bg-slate-bg active:bg-slate-bg"
            }`}
          >
            Rating 4.4+
          </button>
          <button
            onClick={() => {
              if (activeFilter === "fast") {
                clearFilters();
              } else {
                setActiveFilter("fast");
              }
            }}
            className={`flex-shrink-0 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-full border transition-all whitespace-nowrap active:scale-95 ${
              activeFilter === "fast"
                ? "bg-slate-title text-white border-slate-title shadow-sm"
                : "border-slate-border text-slate-body hover:bg-slate-bg active:bg-slate-bg"
            }`}
          >
            Fast Delivery
          </button>
          {(activeFilter || searchText) && (
            <button
              onClick={clearFilters}
              className="flex-shrink-0 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-full border border-red-200 text-red-500 hover:bg-red-50 transition-all whitespace-nowrap active:scale-95"
            >
              Clear All
            </button>
          )}
        </div>
      </section>

      {/* Restaurant Grid */}
      <section className="py-5 sm:py-6 md:py-8">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-title">
            Restaurants with online food delivery
          </h2>
          {filteredList.length > 0 && !isInitialLoading && (
            <span className="text-xs sm:text-sm text-slate-muted hidden sm:block">
              {filteredList.length} restaurants
            </span>
          )}
        </div>

        <div
          data-testid="mainresCard"
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6"
        >
          {isInitialLoading
            ? Array(12)
                .fill(0)
                .map((_, i) => <ShimmerCard key={i} />)
            : filteredList.map((res) => (
                <Link
                  key={res.info.id}
                  to={"restaurant/" + res.info.id}
                  className="block"
                >
                  {res.info.avgRating > 4.2 ? (
                    <RatedCard data={res.info} />
                  ) : (
                    <Card data={res.info} />
                  )}
                </Link>
              ))}

          {/* Loading more shimmer cards */}
          {isLoadingMore &&
            Array(4)
              .fill(0)
              .map((_, i) => <ShimmerCard key={`loading-${i}`} />)}
        </div>

        {/* Sentinel for infinite scroll — always rendered so the ref stays attached */}
        <div
          ref={sentinelRef}
          className="flex justify-center py-8"
          style={{
            display:
              hasMore && !isFiltered && !isInitialLoading ? "flex" : "none",
          }}
        >
          {isLoadingMore && (
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 border-2 border-swiggy-orange border-t-transparent rounded-full animate-spin" />
              <span className="text-slate-muted text-sm">
                Loading more restaurants...
              </span>
            </div>
          )}
        </div>

        {/* No results state */}
        {!isInitialLoading && filteredList.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="text-4xl mb-3">🔍</div>
            <h3 className="text-lg font-semibold text-slate-title mb-1">
              No restaurants found
            </h3>
            <p className="text-slate-muted text-sm mb-4">
              Try adjusting your search or filters
            </p>
            <button
              onClick={clearFilters}
              className="px-5 py-2.5 text-sm font-medium rounded-full bg-swiggy-orange text-white hover:bg-swiggy-orange-dark transition-colors shadow-button active:scale-95"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* End of list */}
        {!hasMore && !isInitialLoading && filteredList.length > 0 && !isFiltered && (
          <div className="text-center py-8">
            <p className="text-slate-muted text-sm">
              You've seen all the restaurants in your area
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Body;
