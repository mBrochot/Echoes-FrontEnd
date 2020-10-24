import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import Loader from "../../components/Loader";
import UserHeader from "../../components/UserHeader";
import { useHistory } from "react-router-dom";

const DashboardPage = ({ setUser }) => {
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const [userName, setUserName] = useState("");
  const [data, setData] = useState([]);
  const newData = data.slice(0, 5);

  const date = (date) => {
    const event = new Date(date);

    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    };
    return event.toLocaleDateString("fr-FR", options);
  };

  useEffect(() => {
    try {
      const fetchData = async () => {
        const userInfo = JSON.parse(Cookies.get("userInfo"));
        const response = await axios.get(
          `${process.env.REACT_APP_URL}/api/episodesPopulate`,
          {
            headers: {
              Authorization: "Bearer " + userInfo.token,
            },
          }
        );
        setUserName(userInfo.firstName);
        setData(response.data);
        setIsLoading(false);
      };
      fetchData();
    } catch (err) {}
  }, []);

  return isLoading ? (
    <Loader></Loader>
  ) : (
    <div className="main-container">
      <UserHeader setUser={setUser} />
      <div className="content-main">
        <div className="hello">
          <h1>Bonjour {userName},</h1>
        </div>
        <div className="last-episodes-dashboard">
          <div className="last-episodes">
            <h3>Mes derniers épisodes</h3>

            <button
              className="btn-60 pink"
              onClick={() => history.push("/order/choice")}
            >
              Commander un épisode
            </button>
          </div>

          <div
            className="last-episodes-container"
            // onClick={() => {
            //   history.push("/episodes");
            // }}
          >
            <div className="last-episodes-column">
              <p className="last-episodes-column1">Nom de l'épisode</p>
              <p className="last-episodes-column2">Date</p>
              <p className="last-episodes-column3">Statut</p>
            </div>
            {newData.map((data, index) => {
              return (
                <div
                  key={index}
                  className="last-episodes-ep"
                  onClick={() => {
                    history.push(`/production/recap/${data._id}`);
                  }}
                >
                  <p className="last-episodes-ep1">{data.clientInfos.name}</p>
                  <p className="last-episodes-ep2">{date(data.timestamp)}</p>
                  <div className="last-episodes-ep3">
                    <p
                      id="last-episodes-ep3"
                      className={
                        data.status === "0 - Brouillon"
                          ? "status status-brouillon"
                          : data.status === "1 - En attente Echoes"
                          ? "status status-echoes"
                          : data.status === "2 - En attente validation"
                          ? "status status-attente-validation"
                          : data.status === "3 - En production"
                          ? "status status-production"
                          : data.status === " 4 - En attente validation"
                          ? "status status-validation-finale"
                          : "status status-termine"
                      }
                    >
                      {data.status}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="dashboard-footer">
          <p>Besoin d'aide sur l'un de vos projets?</p>
          <button
            className="btn-60 turquoise"
            onClick={() => history.push("/contact")}
          >
            Nous contacter
          </button>
        </div>
      </div>
    </div>
  );
};
export default DashboardPage;
