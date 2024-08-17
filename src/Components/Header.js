import { useState } from "react";

const Header = () => {
  const [BtnName, setBtnName] = useState("Login");
  return (
    <div className="header ">
      <img src="assests/1600w-4rQv_oY-CF8.webp" alt="logo" />
      <div className="lists">
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
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
