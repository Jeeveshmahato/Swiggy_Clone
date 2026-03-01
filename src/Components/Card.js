import { imgLink } from "../utils/link";

const Card = ({ data }) => {
  const ratingColor =
    data.avgRating >= 4.0
      ? "bg-green-rating"
      : data.avgRating >= 3.0
      ? "bg-yellow-rating"
      : "bg-red-rating";

  return (
    <div
      data-testid="resCard"
      className="group cursor-pointer transition-transform duration-200 hover:scale-[0.96] active:scale-[0.94]"
    >
      {/* Image container with gradient overlay */}
      <div className="relative w-full h-[130px] sm:h-[160px] md:h-[180px] rounded-xl sm:rounded-2xl overflow-hidden mb-2 sm:mb-3">
        <img
          className="w-full h-full object-cover"
          src={imgLink + data.cloudinaryImageId}
          alt={data.name}
          loading="lazy"
        />
        {/* Bottom gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

        {/* Offer tag */}
        {data.aggregatedDiscountInfoV3 && (
          <div className="absolute bottom-1.5 sm:bottom-2 left-2 sm:left-3 text-white font-display">
            <span className="text-base sm:text-lg md:text-xl font-extrabold leading-tight">
              {data.aggregatedDiscountInfoV3.header}
            </span>
            {data.aggregatedDiscountInfoV3.subHeader && (
              <span className="text-[10px] sm:text-xs md:text-sm font-semibold block">
                {data.aggregatedDiscountInfoV3.subHeader}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Card text content */}
      <div className="px-0.5 sm:px-1">
        <h3 className="text-sm sm:text-base font-semibold text-slate-title truncate">
          {data.name}
        </h3>

        {/* Rating + Delivery time */}
        <div className="flex items-center gap-1 sm:gap-1.5 mt-0.5 sm:mt-1">
          <span
            className={`${ratingColor} text-white text-[10px] sm:text-xs font-bold px-1 sm:px-1.5 py-0.5 rounded-md flex items-center gap-0.5`}
          >
            <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current" viewBox="0 0 20 20">
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
            </svg>
            {data.avgRating}
          </span>
          <span className="text-slate-muted text-[10px] sm:text-xs">|</span>
          <span className="text-[10px] sm:text-xs font-medium text-slate-body">
            {data.sla?.deliveryTime} mins
          </span>
        </div>

        {/* Cuisines */}
        <p className="text-xs sm:text-sm text-slate-muted truncate mt-0.5">
          {data.cuisines?.join(", ")}
        </p>

        {/* Cost */}
        <p className="text-xs sm:text-sm text-slate-muted truncate hidden sm:block">
          {data.costForTwo}
        </p>
      </div>
    </div>
  );
};

export const RatCard = (Card) => {
  return (props) => {
    return (
      <div className="relative">
        <div className="absolute top-2 sm:top-3 left-2 sm:left-3 z-10 bg-white/90 backdrop-blur-sm text-[8px] sm:text-[10px] font-bold text-slate-title px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md shadow-sm uppercase tracking-wide">
          Top Rated
        </div>
        <Card {...props} />
      </div>
    );
  };
};

export default Card;
