import { useState } from "react";
import { useParams } from "react-router-dom";
import useMenu from "../utils/useMenu";
import ResCat from "./ResCat";

const MenuShimmer = () => (
  <div className="max-w-[800px] mx-auto px-5 py-6 animate-fade-in">
    <div className="h-7 w-1/2 shimmer-bg mb-3"></div>
    <div className="h-4 w-1/3 shimmer-bg mb-2"></div>
    <div className="h-4 w-1/4 shimmer-bg mb-6"></div>
    <div className="border-t border-slate-border pt-6">
      {Array(5)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="h-16 shimmer-bg mb-4 rounded-lg"></div>
        ))}
    </div>
  </div>
);

const Menu = () => {
  const [showIndex, setShowIndex] = useState(null);
  const { resid } = useParams();
  const menu = useMenu(resid);

  if (menu.length === 0) {
    return <MenuShimmer />;
  }

  const resInfo = menu?.data?.cards[2]?.card?.card?.info;
  const { name, cuisines, avgRating, totalRatingsString, costForTwoMessage, areaName, sla } =
    resInfo || {};

  const category =
    menu?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
      (e) =>
        e?.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    ) ||
    menu?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
      (e) =>
        e?.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );

  return (
    <div className="max-w-[800px] mx-auto px-4 sm:px-5 py-6">
      {/* Restaurant Info Header */}
      <div className="pb-5 border-b border-slate-border">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-slate-title">{name}</h1>
            <p className="text-sm text-slate-muted mt-1">
              {cuisines?.join(", ")}
            </p>
            <p className="text-sm text-slate-muted mt-0.5">
              {areaName} {sla?.slaString ? `| ${sla.slaString}` : ""}
            </p>
          </div>

          {/* Rating box */}
          {avgRating && (
            <div className="border border-slate-border rounded-lg p-2.5 text-center min-w-[70px] ml-4">
              <div
                className={`text-sm font-bold flex items-center justify-center gap-1 ${
                  avgRating >= 4 ? "text-green-rating" : "text-yellow-rating"
                }`}
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
                {avgRating}
              </div>
              {totalRatingsString && (
                <div className="border-t border-slate-border mt-1.5 pt-1.5">
                  <p className="text-[10px] text-slate-muted font-medium">
                    {totalRatingsString}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Cost for two */}
        {costForTwoMessage && (
          <div className="flex items-center gap-3 mt-4 text-sm text-slate-body">
            <span className="font-medium">{costForTwoMessage}</span>
          </div>
        )}
      </div>

      {/* Menu Heading */}
      <div className="mt-6">
        <h2 className="text-center text-xs font-bold text-slate-muted tracking-[4px] uppercase py-4">
          MENU
        </h2>
      </div>

      {/* Accordion Categories */}
      <div>
        {category?.map((res, index) => (
          <ResCat
            key={res?.card?.card?.title}
            data={res?.card?.card}
            show={index === showIndex}
            setShowIndex={() =>
              setShowIndex(index === showIndex ? null : index)
            }
          />
        ))}
      </div>
    </div>
  );
};
export default Menu;
