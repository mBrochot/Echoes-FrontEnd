import React from "react";
import { NavLink } from "react-router-dom";

const HeaderLink = ({ to, imgSrc, txt }) => {
  return (
    <NavLink to={to} activeClassName="nav-button-active" className="nav-button">
      <div className="nav-button-content">
        <img src={imgSrc} alt={"Icon for page " + to} />
        <p>{txt}</p>
      </div>
    </NavLink>
  );
};

export default HeaderLink;
