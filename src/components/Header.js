import { LOGO_URL } from "../utils/constants";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";

const Header = () => {
  const [btnName, setBtnName] = useState("Login");
  const onlineStatus = useOnlineStatus();
  
  const {loggedInUser}= useContext(UserContext);
  
  //selector
  const cartItems = useSelector((store) => store.cart.items);
  

  return (
    <div className="flex justify-between bg-gray-800 p-4">
      <div className="logo-container">
        <img className="w-40" src={LOGO_URL} alt="Logo" />
      </div>
      <div className="nav-item">
        <ul className="flex p-4 space-x-4 items-center text-white">
          <li>{onlineStatus ? "✅" : "❌"}</li>
          <li>
            <Link to="/" className="hover:underline hover:text-blue-300">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:underline hover:text-blue-300">
              About Us
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:underline hover:text-blue-300">
              Contact Us
            </Link>
          </li>
          <li>
            <Link to="/cart" className="hover:underline hover:text-blue-300">
              Cart - {cartItems.length}
            </Link>
          </li>
          <li>
            <Link to="/cart" className="hover:underline hover:text-blue-300">
              {loggedInUser}
            </Link>
          </li>
          <li>
            <button
              className="login bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                setBtnName((prevBtnName) =>
                  prevBtnName === "Login" ? "Logout" : "Login"
                );
              }}
            >
              {btnName}
            </button>
          </li>
         <li></li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
