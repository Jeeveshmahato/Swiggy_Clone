import Card from "./Card";
import { restaurantList } from "../utils/restaurantList";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Body = () => {
  // this is array is structuring
  const [firstList, setfirstList] = useState([]);
  const [copyList, setCopyList] = useState([]);
  const [SearchText, setsearchText] = useState("");

  // const arr  =useState(restaurantList);
  // const  [firstList, setfirstList]  = arr;
  // const firstList = arr[0];
  // const setfirstList = arr[1];
  const bih = () => {
    let firstt = firstList.filter((res) => res.info.avgRating >= 4);
    setCopyList(firstt);
  };
  const fecthdat = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=22.8045665&lng=86.2028754&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();
    console.log(
      json.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setfirstList(
      json.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setCopyList(
      json.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    console.log(
      setfirstList(
        json.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants
      )
    );
  };
  useEffect(() => {
    fecthdat();
  }, []);
  // conditional rendring
  // if (firstList.length === 0) {
  //   return <h1>Loading...</h1>;
  // }

  return firstList.length === 0 ? (
    <h1>Loading...</h1>
  ) : (
    <div className="body">
      <h1>Welcome to our website</h1>
      <p>This resturant is all your's now.💕</p>
      <div className="search-box">
        <input
          type="search"
          placeholder="Search..."
          value={SearchText}
          onChange={(e) => {
            setsearchText(e.target.value);
          }}
          className="search"
        ></input>
        <button
          onClick={() => {
            const filtered = firstList.filter((res) =>
              res.info.name.toLowerCase().includes(SearchText.toLowerCase())
            );
            setCopyList(filtered);
          }}
          className="search-btn"
        >
          Search
        </button>
      </div>
      <button onClick={bih} className="best-btn">
        Best options
      </button>
      <input type="text" className=""></input>
      <div className="cards">
        {copyList.map((res) => (
          <Link key={res.info.id} to={"resturant/" + res.info.id}>
            {" "}
            <Card data={res.info} />
          </Link>
        ))}
      </div>
    </div>
  );
};
export default Body;
