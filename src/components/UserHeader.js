import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UserHeader = ({ setUser }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [dropDown, setDropDown] = useState(false);
  const [data, setData] = useState({});
  const history = useHistory();

  // get Cookie id
  const getCookie = Cookies.getJSON("userInfo");
  const id = getCookie.id;
  const token = getCookie.token;

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_URL}/api/account?id=${id}`,
        {
          headers: { authorization: "Bearer " + token },
        }
      );

      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [id, token]);

  return isLoading ? (
    ""
  ) : (
    <div className="user-header">
      <div
        className="user-header-area"
        onClick={() => {
          setDropDown(!dropDown);
        }}
      >
        <div>
          <span className="user-header-name">
            {data.firstName} {data.name}
          </span>
          <br />
          <span className="user-header-company">
            {data.company.companyName}
          </span>
        </div>
        <FontAwesomeIcon id="arrow" icon="angle-down" />
      </div>

      {dropDown && (
        <div className="dropdown">
          <ul>
            <li
              className="redirect-link"
              onClick={() => {
                history.push("/account");
              }}
            >
              Mon compte
            </li>
            <li
              className="disconnect-link"
              onClick={() => {
                Cookies.remove("userInfo");
                history.push("/");
                setUser(null);
              }}
            >
              Se deconnecter
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserHeader;

Cookies.remove("nomDuCookie");
