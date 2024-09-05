import { useDispatch } from "react-redux";
import { imgLink } from "../utils/link";
import { addItem } from "../utils/CartSlice";

const CatItems = ({ items }) => {
  const dispatch = useDispatch();

  const handleAddItem = (item) => {
    // Dispatch an action
    dispatch(addItem(item));
  };
  // console.log(items);
  return (
    <>
      {items.map((item) => (
        <div
          data-testid="foodItems"
          key={item.card.info.id}
          className="p-2 m-2 border-gray-300 bg-gray-200 border-b-2 text-left flex justify-between"
        >
          <div className="w-9/12">
            <div className="py-2">
              <span className=" text-xl font-bold">{item.card.info.name}</span>
              <span className=" text-lg font-medium">
                - ₹
                {item.card.info.price
                  ? item.card.info.price / 100
                  : item.card.info.defaultPrice / 100}
              </span>
            </div>
            <p className=" text-lg font-light">{item.card.info.description}</p>
          </div>
          <div className="w-3/12 p-4 relative">
            <div className="absolute left-0 right-0 bottom-0 mx-auto">
              <button
                className="p-2 absolute left-0 right-0 bottom-0 mx-auto rounded-lg bg-black text-white shadow-lg"
                onClick={() => handleAddItem(item)}
              >
                Add +
              </button>
            </div>
            <img src={imgLink + item.card.info.imageId} className="w-full" />
          </div>
        </div>
      ))}
    </>
  );
};
export default CatItems;
