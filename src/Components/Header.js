import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import useOnlineOffline from "../utils/useOnlineOffline";
import Username from "../utils/UserContext";

const Header = () => {
  const status = useOnlineOffline();
  const [BtnName, setBtnName] = useState("Login");
  const { localUser } = useContext(Username);
  return (
    <div className=" flex justify-between items-center px-20 ">
      <img
        className=" w-[150px] h-[150px]"
        src="https://img.freepik.com/premium-vector/modern-restaurant-logo-design-template_872774-98.jpg"
        alt="logo"
      />
      <div className="lists">
        <ul className="flex gap-4 items-center">
          <li>status:{status ? "🟢" : "🔴"}</li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contactus">Contact</Link>
          </li>
          <li>
            <Link to="/grocery">Grocery</Link>
          </li>
          <li className=" flex gap-3">
            <button
              className="login"
              onClick={() => {
                BtnName === "Login"
                  ? setBtnName("Logout")
                  : setBtnName("Login");
              }}
            >
              {BtnName}
            </button>
            <p>{localUser}</p>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Header;
