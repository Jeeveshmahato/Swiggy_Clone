import { useDispatch, useSelector } from "react-redux";
import CatItems from "./CatItems";
import { clearItem, deleteItem } from "../utils/CartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const cartitems = useSelector((store) => store.cart.items);

  // Bad and inefficient way of writing code in this type of way
  // const store = useSelector((store) => store);
  // because in this store in subscribe to whole store, and if any chnges in the store it will update the whole store variable but we only reqyire the items part of the store and we are concerned about the items in the store.
  // const cartitems = store.cart.items;

  // console.log(cartitems);
  const handledelete = () => {
    dispatch(clearItem());
  };
  return (
    <>
      <div className=" flex flex-col items-center justify-center">
        <h1 className=" text-2xl font-bold">Shopping Cart</h1>
        <p className=" text-lg font-medium">
          This app uses Redux to manage a shopping cart.
        </p>
        <button
          onClick={handledelete}
          className=" px-5 py-2 bg-black text-white"
        >
          Clear Cart
        </button>
      </div>
      {cartitems.length === 0 && (
        <h1 className="text-xl font-semibold text-center">
          Please add items to the card
        </h1>
      )}
      <CatItems items={cartitems} />
    </>
  );
};
export default Cart;
