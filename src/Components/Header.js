import { useState } from "react";
import { Link } from "react-router-dom";
import useOnlineOffline from "../utils/useOnlineOffline";

const Header = () => {
  const status = useOnlineOffline();
  const [BtnName, setBtnName] = useState("Login");
  return (
    <div className="header ">
      <img src="assests/1600w-4rQv_oY-CF8.webp" alt="logo" />
      <div className="lists">
        <ul>
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
          <button
            className="login"
            onClick={() => {
              BtnName === "Login" ? setBtnName("Logout") : setBtnName("Login");
            }}
          >
            {BtnName}
          </button>
        </ul>
      </div>
    </div>
  );
};
export default Header;
