import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [BtnName, setBtnName] = useState("Login");
  return (
    <div className=" flex justify-between items-center  bg-orange-400">
      <img className=" w-[100px]" src="https://graphicsfamily.com/wp-content/uploads/edd/2021/07/Restaurant-Logo-Design-Template-scaled.jpg" alt="logo" />
      <div className="lists">
        <ul className="flex gap-8 items-center">
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/about'>About</Link></li>
          <li><Link to='/contactus'>Contact</Link></li>
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
