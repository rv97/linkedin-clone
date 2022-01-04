import React from "react";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import HeaderOption from "./HeaderOption";
import HomeIcon from "@material-ui/icons/Home";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import ChatIcon from "@material-ui/icons/Chat";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { useDispatch } from "react-redux";
import { logout } from "./features/userSlice";
import { fireBaseAuth } from "./firebaseConfig";
import { signOut } from "firebase/auth";

function Header() {
  const dispatch = useDispatch();

  const logOutOfApp = () => {
    dispatch(logout());
    signOut(fireBaseAuth);
  };
  return (
    <div className="header">
      <div className="header_left">
        <img
          src="https://img.icons8.com/color/240/000000/linkedin.png"
          alt=""
        />
        <div className="header_search">
          <SearchIcon />
          <input type="text" />
        </div>
      </div>
      <div className="header_right">
        <HeaderOption Icon={HomeIcon} title="Home" />
        <HeaderOption
          Icon={SupervisorAccountIcon}
          title="My Network"
        ></HeaderOption>
        <HeaderOption Icon={BusinessCenterIcon} title="Jobs" />
        <HeaderOption Icon={ChatIcon} title="Messaging" />
        <HeaderOption Icon={NotificationsIcon} title="Notifications" />
        <HeaderOption avatar={true} title="Me" onClick={logOutOfApp} />
      </div>
    </div>
  );
}

export default Header;
