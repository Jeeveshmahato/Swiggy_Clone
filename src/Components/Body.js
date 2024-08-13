import Card from "./Card";
import { restaurantList } from "../utils/restaurantList";
import { useState } from "react";
const Body = () => {
  // this is array is structuring
  const [firstList, setfirstList] = useState(restaurantList);

  // const arr  =useState(restaurantList);
  // const  [firstList, setfirstList]  = arr;
  // const firstList = arr[0];
  // const setfirstList = arr[1];
  const bih = () => {
    let firstt = firstList.filter((res) => res.data.avgRating >= 4);
    setfirstList(firstt);
  };
  return (
    <div className="body">
      <h1>Welcome to our website</h1>
      <p>This resturant is all your's now.💕</p>
      <button onClick={bih} className="best-btn">
        Best options
      </button>
      <input type="text" className=""></input>
      <div className="cards">
        {firstList.map((restaurant) => (
          <Card key={restaurant.data.id} data={restaurant.data} />
        ))}
      </div>
    </div>
  );
};
export default Body;
