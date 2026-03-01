import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearItem } from "../utils/CartSlice";
import { imgLink } from "../utils/link";

const Cart = () => {
  const dispatch = useDispatch();
  const cartitems = useSelector((store) => store.cart.items);

  const handleClear = () => {
    dispatch(clearItem());
  };

  const calculateTotal = () => {
    return cartitems.reduce((total, item) => {
      const price = item.card.info.price || item.card.info.defaultPrice;
      return total + price / 100;
    }, 0);
  };

  if (cartitems.length === 0) {
    return (
      <div className="max-w-[800px] mx-auto px-4 sm:px-5 py-12 sm:py-20 text-center">
        <svg className="w-16 h-16 sm:w-24 sm:h-24 mx-auto text-slate-border mb-3 sm:mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
        </svg>
        <h2 className="text-lg sm:text-xl font-semibold text-slate-title mb-1.5 sm:mb-2">
          Your cart is empty
        </h2>
        <p className="text-slate-muted text-sm mb-5 sm:mb-6">
          You can go to home page to view more restaurants
        </p>
        <Link
          to="/"
          className="inline-block bg-swiggy-orange text-white font-semibold text-xs sm:text-sm px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg hover:bg-swiggy-orange-dark transition-colors shadow-button active:scale-[0.98]"
        >
          SEE RESTAURANTS NEAR YOU
        </Link>
      </div>
    );
  }

  const itemTotal = calculateTotal();
  const platformFee = 5;
  const gst = itemTotal * 0.05;
  const grandTotal = itemTotal + platformFee + gst;

  return (
    <div className="max-w-[900px] mx-auto px-3 sm:px-4 md:px-5 py-5 sm:py-8">
      <div className="flex items-center justify-between mb-5 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-title">Cart</h1>
        <button
          onClick={handleClear}
          className="text-swiggy-orange text-xs sm:text-sm font-medium hover:underline active:scale-95 transition-transform"
        >
          Clear Cart
        </button>
      </div>

      <div className="flex flex-col lg:grid lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_350px] gap-4 sm:gap-6 lg:gap-8">
        {/* Cart Items */}
        <div className="bg-white rounded-xl border border-slate-border p-3 sm:p-4 md:p-5">
          {cartitems.map((item, index) => (
            <div
              key={item.card.info.id + "-" + index}
              className="flex items-center justify-between py-3 sm:py-4 border-b border-slate-border last:border-b-0 gap-2 sm:gap-3"
            >
              {/* Veg/Non-veg + Name */}
              <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                <span
                  className={`w-3.5 h-3.5 sm:w-4 sm:h-4 border-2 rounded-sm flex items-center justify-center flex-shrink-0 ${
                    item.card.info.itemAttribute?.vegClassifier === "VEG"
                      ? "border-green-600"
                      : "border-red-600"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
                      item.card.info.itemAttribute?.vegClassifier === "VEG"
                        ? "bg-green-600"
                        : "bg-red-600"
                    }`}
                  ></span>
                </span>
                <span className="text-xs sm:text-sm font-medium text-slate-title truncate">
                  {item.card.info.name}
                </span>
              </div>

              {/* Price */}
              <span className="text-xs sm:text-sm font-medium text-slate-body flex-shrink-0">
                ₹{((item.card.info.price || item.card.info.defaultPrice) / 100).toFixed(0)}
              </span>
            </div>
          ))}
        </div>

        {/* Bill Details */}
        <div className="bg-white rounded-xl border border-slate-border p-4 sm:p-5 h-fit lg:sticky lg:top-24">
          <h3 className="text-xs sm:text-sm font-bold text-slate-title uppercase mb-3 sm:mb-4">
            Bill Details
          </h3>
          <div className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm">
            <div className="flex justify-between text-slate-body">
              <span>Item Total</span>
              <span>₹{itemTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-body">
              <span>Delivery Fee</span>
              <span className="text-green-600 font-medium">FREE</span>
            </div>
            <div className="flex justify-between text-slate-body">
              <span>Platform fee</span>
              <span>₹{platformFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-body">
              <span>GST & Charges</span>
              <span>₹{gst.toFixed(2)}</span>
            </div>
            <div className="border-t border-slate-border pt-2.5 sm:pt-3 flex justify-between font-bold text-slate-title text-sm sm:text-base">
              <span>TO PAY</span>
              <span>₹{grandTotal.toFixed(2)}</span>
            </div>
          </div>

          <button className="w-full mt-4 sm:mt-5 bg-swiggy-orange text-white font-bold text-xs sm:text-sm py-3 sm:py-3.5 rounded-lg hover:bg-swiggy-orange-dark transition-colors shadow-button active:scale-[0.98]">
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
};
export default Cart;
