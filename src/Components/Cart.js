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
      <div className="max-w-[800px] mx-auto px-5 py-20 text-center">
        <svg className="w-24 h-24 mx-auto text-slate-border mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
        </svg>
        <h2 className="text-xl font-semibold text-slate-title mb-2">
          Your cart is empty
        </h2>
        <p className="text-slate-muted mb-6">
          You can go to home page to view more restaurants
        </p>
        <Link
          to="/"
          className="inline-block bg-swiggy-orange text-white font-semibold text-sm px-6 py-3 rounded-lg hover:bg-swiggy-orange-dark transition-colors shadow-button"
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
    <div className="max-w-[800px] mx-auto px-4 sm:px-5 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-slate-title">Cart</h1>
        <button
          onClick={handleClear}
          className="text-swiggy-orange text-sm font-medium hover:underline"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-6 lg:gap-8">
        {/* Cart Items */}
        <div className="bg-white rounded-xl border border-slate-border p-4 sm:p-5">
          {cartitems.map((item, index) => (
            <div
              key={item.card.info.id + "-" + index}
              className="flex items-center justify-between py-4 border-b border-slate-border last:border-b-0 gap-3"
            >
              {/* Veg/Non-veg + Name */}
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <span
                  className={`w-4 h-4 border-2 rounded-sm flex items-center justify-center flex-shrink-0 ${
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
                <span className="text-sm font-medium text-slate-title truncate">
                  {item.card.info.name}
                </span>
              </div>

              {/* Price */}
              <span className="text-sm font-medium text-slate-body flex-shrink-0">
                ₹{((item.card.info.price || item.card.info.defaultPrice) / 100).toFixed(0)}
              </span>
            </div>
          ))}
        </div>

        {/* Bill Details */}
        <div className="bg-white rounded-xl border border-slate-border p-5 h-fit lg:sticky lg:top-24">
          <h3 className="text-sm font-bold text-slate-title uppercase mb-4">
            Bill Details
          </h3>
          <div className="space-y-3 text-sm">
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
              <span>GST and Restaurant Charges</span>
              <span>₹{gst.toFixed(2)}</span>
            </div>
            <div className="border-t border-slate-border pt-3 flex justify-between font-bold text-slate-title">
              <span>TO PAY</span>
              <span>₹{grandTotal.toFixed(2)}</span>
            </div>
          </div>

          <button className="w-full mt-5 bg-swiggy-orange text-white font-bold text-sm py-3.5 rounded-lg hover:bg-swiggy-orange-dark transition-colors shadow-button active:scale-[0.98]">
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
};
export default Cart;
