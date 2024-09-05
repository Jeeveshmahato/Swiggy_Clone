import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { menulink } from "../utils/link";
import useMenu from "../utils/useMenu";
import ResCat from "./ResCat";

const Menu = () => {
  const [showIndex, setShowIndex] = useState(null);
  const { resid } = useParams();
  const params = useParams();
  // console.log(params);
  const menu = useMenu(resid);

  if (menu.length === 0) {
    return <h1>Loading...</h1>;
  }
  const { name, cuisines } = menu?.data?.cards[2]?.card?.card?.info;
  const category =
    menu?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
      (e) =>
        e?.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    ) ||
    menu?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
      (e) =>
        e?.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );
  // console.log(
  //   menu?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
  //     (e) =>
  //       e?.card?.card?.["@type"] ===
  //       "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
  //   ) ||
  //     menu?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
  //       (e) =>
  //         e?.card?.card?.["@type"] ===
  //         "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
  //     )
  // );
  return (
    <div className=" w-[60%] mx-auto  flex flex-col  gap-10">
      <div className="flex flex-col justify-center items-center">
        <h2 className=" text-bold text-lg font-bold">{name}</h2>
        <p className=" text-sm font-medium">{cuisines.join(",")}</p>
      </div>
      {category.map((res, index) => (
        <ResCat
          key={res?.card?.card?.title}
          data={res?.card?.card}
          show={index === showIndex}
          setShowIndex={() => setShowIndex(index)}
        />
      ))}
    </div>
  );
};
export default Menu;
