import Card, { RatCard } from "./Card";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useOnlineOffline from "../utils/useOnlineOffline";
import Username from "../utils/UserContext";

const ShimmerCard = () => (
  <div className="animate-fade-in">
    <div className="w-full h-[180px] shimmer-bg rounded-2xl mb-3"></div>
    <div className="h-4 w-3/4 shimmer-bg mb-2"></div>
    <div className="h-3 w-1/2 shimmer-bg mb-1"></div>
    <div className="h-3 w-2/3 shimmer-bg"></div>
  </div>
);

const Body = () => {
  const [firstList, setFirstList] = useState([]);
  const [copyList, setCopyList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [activeFilter, setActiveFilter] = useState(null);
  const RatedCard = RatCard(Card);
  const { localUser, setUserNamelog } = useContext(Username);

  const bih = () => {
    if (activeFilter === "rating") {
      setCopyList(firstList);
      setActiveFilter(null);
    } else {
      const filtered = firstList.filter((res) => res.info.avgRating >= 4.4);
      setCopyList(filtered);
      setActiveFilter("rating");
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=22.5743545&lng=88.3628734&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
      );
      const json = await response.json();
      const restaurants =
        json.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants ||
        json.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants ||
        [];
      setFirstList(restaurants);
      setCopyList(restaurants);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const status = useOnlineOffline();
  if (status === false) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
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
    <div className="max-w-[1200px] mx-auto px-4 sm:px-5">
      {/* Category Carousel */}
      <section className="py-6 sm:py-8 border-b border-slate-border">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-title mb-5">
          What's on your mind?
        </h2>
        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
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
              onClick={() => {
                const filtered = firstList.filter((res) =>
                  res.info.cuisines?.some((c) =>
                    c.toLowerCase().includes(cat.name.toLowerCase())
                  )
                );
                setCopyList(filtered.length > 0 ? filtered : firstList);
              }}
              className="flex flex-col items-center gap-2 min-w-[80px] group cursor-pointer"
            >
              <div className="w-[72px] h-[72px] sm:w-[80px] sm:h-[80px] rounded-full bg-swiggy-orange-light flex items-center justify-center group-hover:bg-swiggy-orange group-hover:text-white transition-colors duration-200">
                <span className="text-2xl sm:text-3xl">{cat.icon}</span>
              </div>
              <span className="text-xs font-medium text-slate-body group-hover:text-slate-title whitespace-nowrap">
                {cat.name}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Search + Filters */}
      <section className="py-4 sm:py-5 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 border-b border-slate-border">
        <div className="flex-1 relative">
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
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const filtered = firstList.filter((res) =>
                  res.info.name
                    .toLowerCase()
                    .includes(searchText.toLowerCase())
                );
                setCopyList(filtered);
              }
            }}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-bg rounded-lg border-0 text-sm text-slate-title placeholder:text-slate-muted focus:outline-none focus:ring-2 focus:ring-swiggy-orange/30"
          />
        </div>

        <div className="flex gap-2 sm:gap-3 overflow-x-auto scrollbar-hide">
          <button
            onClick={() => {
              const filtered = firstList.filter((res) =>
                res.info.name
                  .toLowerCase()
                  .includes(searchText.toLowerCase())
              );
              setCopyList(filtered);
            }}
            className="px-4 py-2 text-sm font-medium rounded-full bg-swiggy-orange text-white hover:bg-swiggy-orange-dark transition-colors whitespace-nowrap shadow-button"
          >
            Search
          </button>
          <button
            data-testid="best_btn"
            onClick={bih}
            className={`px-4 py-2 text-sm font-medium rounded-full border transition-colors whitespace-nowrap ${
              activeFilter === "rating"
                ? "bg-slate-title text-white border-slate-title"
                : "border-slate-border text-slate-body hover:bg-slate-bg"
            }`}
          >
            Rating 4.4+
          </button>
          <button
            onClick={() => {
              const filtered = firstList.filter(
                (res) => res.info.sla?.deliveryTime <= 30
              );
              setCopyList(filtered.length > 0 ? filtered : firstList);
            }}
            className="px-4 py-2 text-sm font-medium rounded-full border border-slate-border text-slate-body hover:bg-slate-bg transition-colors whitespace-nowrap"
          >
            Fast Delivery
          </button>
          <button
            onClick={() => {
              setCopyList(firstList);
              setActiveFilter(null);
              setSearchText("");
            }}
            className="px-4 py-2 text-sm font-medium rounded-full border border-slate-border text-slate-body hover:bg-slate-bg transition-colors whitespace-nowrap"
          >
            Clear Filters
          </button>
        </div>
      </section>

      {/* Restaurant Grid */}
      <section className="py-6 sm:py-8">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-title mb-6">
          Restaurants with online food delivery
        </h2>
        <div
          data-testid="mainresCard"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6"
        >
          {copyList.length === 0
            ? Array(12)
                .fill(0)
                .map((_, i) => <ShimmerCard key={i} />)
            : copyList.map((res) => (
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
        </div>
      </section>
    </div>
  );
};

export default Body;
