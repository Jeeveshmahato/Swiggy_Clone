import Card, { RatCard } from "./Card";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useOnlineOffline from "../utils/useOnlineOffline";
import Username from "../utils/UserContext";
const Body = () => {
  const [firstList, setFirstList] = useState([]);
  const [copyList, setCopyList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const RatedCard = RatCard(Card);
  const { localUser, setUserNamelog } = useContext(Username);
  const bih = () => {
    const filtered = firstList.filter((res) => res.info.avgRating >= 4.4);
    // console.log(filtered);
    setCopyList(filtered);
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=22.5743545&lng=88.3628734&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
      );
      const json = await response.json();
      // console.log("Full API response:", json);
      const restaurants =
        json.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants ||
        json.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants ||
        [];
      // console.log("Fetched restaurants:", restaurants); // Debugging line
      setFirstList(restaurants);
      setCopyList(restaurants);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const status = useOnlineOffline();
  if (status === false) {
    return <h1>You are offline. Please check your connection.</h1>;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <h1>Welcome to our website</h1>
      <p>This restaurant is all yours now.💕</p>
      <p>{localUser}</p>
      <div className="search-box">
        <input
          data-testid="searchInput"
          type="search"
          placeholder="Search..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="search"
        />
        <button
          onClick={() => {
            const filtered = firstList.filter((res) =>
              res.info.name.toLowerCase().includes(searchText.toLowerCase())
            );
            setCopyList(filtered);
          }}
          className="search-btn px-5 py-2 border border-black ml-2"
        >
          Search
        </button>
      </div>
      <div>
        <input
          className=" border"
          value={localUser}
          onChange={(e) => {
            setUserNamelog(e.target.value);
          }}
        />
      </div>
      <button
        data-testid="best_btn"
        onClick={bih}
        className="best-btn px-5 py-2 border border-black"
      >
        Best options
      </button>
      <div
        data-testid="mainresCard"
        className="cards flex items-center justify-center gap-5 flex-wrap"
      >
        {copyList.length === 0 ? (
          <p>Loading ... </p>
        ) : (
          copyList.map((res) => (
            <Link key={res.info.id} to={"restaurant/" + res.info.id} className="border border-black p-2 rounded-lg" >
              {res.info.avgRating > 4.2 ? (
                <RatedCard data={res.info} />
              ) : (
                <Card data={res.info} />
              )}
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Body;
