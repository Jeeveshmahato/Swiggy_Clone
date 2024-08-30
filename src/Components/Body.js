import Card, { RatCard } from "./Card";
import { restaurantList } from "../utils/restaurantList";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useOnlineOffline from "../utils/useOnlineOffline";
const Body = () => {
  // this is array is structuring
  const [firstList, setfirstList] = useState([]);
  const [copyList, setCopyList] = useState([]);
  const [SearchText, setsearchText] = useState("");
  const RatedCard = RatCard(Card);
  // const arr  =useState(restaurantList);
  // const  [firstList, setfirstList]  = arr;
  // const firstList = arr[0];
  // const setfirstList = arr[1];
  const bih = () => {
    let firstt = firstList.filter((res) => res.info.avgRating >= 4.2);
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
  };
  useEffect(() => {
    fecthdat();
  }, []);
  // conditional rendring
  // if (firstList.length === 0) {
  //   return <h1>Loading...</h1>;
  // }
  const status = useOnlineOffline();
  if (status === false) {
    return <h1>Your are Offline ,Kindly please check your connection</h1>;
  }
  return firstList.length === 0 ? (
    <h1>Loading...</h1>
  ) : (
    <div className=" flex flex-col items-center justify-center gap-5">
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
          className="search-btn px-5 py-2"
        >
          Search
        </button>
      </div>
      <button onClick={bih} className="best-btn px-5 py-2">
        Best options
      </button>
      <div className="cards flex items-center justify-center gap-5 flex-wrap">
        {copyList.map((res) => (
          <Link key={res.info.id} to={"resturant/" + res.info.id}>
            {res.info.avgRating > 4.2 ? (
              <RatedCard data={res.info} />
            ) : (
              <Card data={res.info} />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};
export default Body;
