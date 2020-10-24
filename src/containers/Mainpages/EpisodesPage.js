import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import UserHeader from "../../components/UserHeader";
import EachEpisodes from ".././../components/EachEpisodes";
import Loader from "../../components/Loader";

const EpisodePage = ({ setUser }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const userInfo = JSON.parse(Cookies.get("userInfo"));
  const [reloadDelete, setreloadDelete] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_URL}/api/episodes`,
        {
          headers: {
            Authorization: "Bearer " + userInfo.token,
          },
        }
      );

      setData(response.data);
      setreloadDelete(false);
      setIsLoading(false);
    };
    fetchData();
  }, [reloadDelete, userInfo]);

  return isLoading ? (
    <Loader></Loader>
  ) : (
    <div className="main-container">
      <UserHeader setUser={setUser} />
      <div className="content-main">
        <div className="hello">
          <h1>Liste de mes épisodes</h1>
        </div>

        <div className="my-episodes">
          <div className="my-episodes-titles">
            <p>Nom de l'épisode</p>
            <p>Dernière modification</p>
            <p>Statut</p>
            <p>Durée</p>
            <p>Editer</p>
          </div>
          {data.length === 0 ? (
            <div style={{ height: "100vh" }}>
              <div className="no-episode">
                <h2>Vous n'avez actuellement aucun épisode</h2>
                <p>Envie de démarrer un projet ?</p>
                <Link to="/order/choice">
                  <button>Commander un épisode</button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="liste-episodes">
              {data.map((elem, index) => {
                return (
                  <EachEpisodes
                    key={index}
                    elem={elem}
                    setreloadDelete={setreloadDelete}
                  ></EachEpisodes>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EpisodePage;
