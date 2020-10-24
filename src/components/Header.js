import React from "react";
import { useHistory } from "react-router-dom";

// Import images
import logo from "../images/logo.svg";
import dashboard from "../images/dashboard.svg";
import order from "../images/order.svg";
import episodes from "../images/episodes.svg";
import inspiration from "../images/inspiration.svg";
import contact from "../images/contact.svg";
import HeaderLink from "./HeaderLink";

const Header = () => {
  const history = useHistory();
  return (
    <div className="side-menu-container">
      <div className="header-logo" onClick={() => history.push("/")}>
        <img src={logo} alt="echoes logo" />
      </div>

      <div className="menu-pages">
        <HeaderLink to="/dashboard" imgSrc={dashboard} txt="Dashboard" />
        <HeaderLink to="/order" imgSrc={order} txt="Commander" />
        <HeaderLink to="/episodes" imgSrc={episodes} txt="Mes épisodes" />
        <div
          className="nav-button"
          onClick={() => window.open("http://echoes.studio", "_blank")}
        >
          <div className="nav-button-content">
            <img src={inspiration} alt={"Icon for page Inspiration"} />
            <p>Inspiration</p>
          </div>
        </div>
        {/* <HeaderLink
          target={"_blank"}
          to="http:\\echoes.studio"
          imgSrc={inspiration}
          txt="Inspiration"
        /> */}
        <HeaderLink to="/contact" imgSrc={contact} txt="Contact" />
      </div>
    </div>
  );
};

export default Header;
