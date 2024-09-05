import { useEffect, useState } from "react";
import { menulink } from "./link";

const useMenu = (resid) => {
  const [menu, setMenu] = useState([]);
  useEffect(() => {
    fetchMenu();
  }, []);
  const fetchMenu = async () => {
    const data = await fetch(menulink + resid);
    const json = await data.json();
    setMenu(json);
    // console.log(menu);
  };
  return menu
};
export default useMenu;