import React from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Delete = ({ id, setreloadDelete }) => {
  const userInfo = JSON.parse(Cookies.get("userInfo"));

  const handleDelete = async () => {
    await axios.get(`${process.env.REACT_APP_URL}/api/episodes/delete/${id}`, {
      headers: {
        Authorization: "Bearer " + userInfo.token,
      },
    });

    setreloadDelete(true);
  };

  return (
    <button
      className="delete-episode"
      onClick={(e) => {
        e.preventDefault();
        let resultat = window.confirm(
          "Souhaitez vous supprimer votre brouillon ?"
        );
        if (resultat === true) {
          handleDelete();
        }
      }}
    >
      <FontAwesomeIcon icon="trash"></FontAwesomeIcon>
    </button>
  );
};

export default Delete;
