import { useDispatch } from "react-redux";
import { imgLink } from "../utils/link";
import { addItem } from "../utils/CartSlice";

const CatItems = ({ items }) => {
  const dispatch = useDispatch();

  const handleAddItem = (item) => {
    dispatch(addItem(item));
  };

  return (
    <div className="pb-4">
      {items.map((item) => (
        <div
          data-testid="foodItems"
          key={item.card.info.id}
          className="flex justify-between items-start py-5 sm:py-6 px-2 border-b border-slate-border last:border-b-0"
        >
          {/* Left: Item details */}
          <div className="flex-1 pr-4">
            {/* Veg/Non-veg indicator */}
            <div className="flex items-center gap-2 mb-1">
              <span
                className={`w-4 h-4 border-2 rounded-sm flex items-center justify-center ${
                  item.card.info.itemAttribute?.vegClassifier === "VEG"
                    ? "border-green-600"
                    : "border-red-600"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    item.card.info.itemAttribute?.vegClassifier === "VEG"
                      ? "bg-green-600"
                      : "bg-red-600"
                  }`}
                ></span>
              </span>
              {item.card.info.isBestseller && (
                <span className="text-xs font-bold text-swiggy-orange">
                  Bestseller
                </span>
              )}
            </div>

            <h4 className="text-base font-semibold text-slate-title">
              {item.card.info.name}
            </h4>
            <p className="text-sm font-medium text-slate-title mt-0.5">
              ₹
              {item.card.info.price
                ? item.card.info.price / 100
                : item.card.info.defaultPrice / 100}
            </p>

            {item.card.info.ratings?.aggregatedRating?.rating && (
              <div className="flex items-center gap-1 mt-1.5">
                <span className="text-green-rating text-xs">★</span>
                <span className="text-xs font-medium text-slate-body">
                  {item.card.info.ratings.aggregatedRating.rating}
                </span>
                <span className="text-xs text-slate-muted">
                  ({item.card.info.ratings.aggregatedRating.ratingCountV2})
                </span>
              </div>
            )}

            <p className="text-sm text-slate-muted mt-2 line-clamp-2">
              {item.card.info.description}
            </p>
          </div>

          {/* Right: Image + Add button */}
          <div className="w-[118px] flex-shrink-0">
            <div className="relative">
              {item.card.info.imageId ? (
                <img
                  src={imgLink + item.card.info.imageId}
                  className="w-[118px] h-[96px] object-cover rounded-xl"
                  loading="lazy"
                  alt={item.card.info.name}
                />
              ) : (
                <div className="w-[118px] h-[96px] bg-slate-bg rounded-xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-slate-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}

              <button
                onClick={() => handleAddItem(item)}
                className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white text-green-600 font-bold text-sm px-7 py-1.5 rounded-lg border border-slate-border shadow-md hover:bg-gray-50 active:scale-95 transition-all"
              >
                ADD
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default CatItems;
