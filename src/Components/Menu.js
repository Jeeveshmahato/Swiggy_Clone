import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { menulink } from "../utils/link";

const Menu = () => {
  const { resid } = useParams();
  const params = useParams();
  console.log(params)

  const [menu, setMenu] = useState([]);
  useEffect(() => {
    fetchMenu();
  }, []);
  const fetchMenu = async () => {
    const data = await fetch(menulink + resid);
    const json = await data.json();
    setMenu(json);
    console.log(json.data);
  };
  if (menu.length === 0) {
    return <h1>Loading...</h1>;
  }
  const { name, cuisines } = menu?.data?.cards[2]?.card?.card?.info;
  const { itemCards } =
    menu.data?.cards[4].groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card
      ?.card;
  console.log(itemCards);
  return (
    <div>
      <h2>{name}</h2>
      <p>{cuisines.join(",")}</p>
      <ul>
        {itemCards.map((res) => {
          console.log(res.card.info.id);

          return (
            <li key={res.card.info.id}>
              {" "}
              {res.card.info.name} - {res.card.info.price}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default Menu;
