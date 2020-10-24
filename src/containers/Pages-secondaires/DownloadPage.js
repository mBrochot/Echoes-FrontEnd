import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import UserHeader from "../../components/UserHeader";
import Loader from "../../components/Loader";

// Download Icon import:
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DownloadPage = ({ setUser }) => {
  const history = useHistory();
  const { episodeId } = useParams();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [button, setButton] = useState(undefined);

  const handleSubmit = async (event) => {
    const userInfo = JSON.parse(Cookies.get("userInfo"));

    await axios.post(
      `${process.env.REACT_APP_URL}/api/episodes/validate/${data._id}`,
      {
        status: data.status,
        descriptionForPlatforms: data.clientInfos.descriptionForPlatforms,
        commentsRecording: data.clientInfos.comments.commentsRecording,
      },
      // `http://localhost:3310/api/episodes/validate/${data._id}`,
      // {
      //   status: data.status,
      //   descriptionForPlatforms: data.clientInfos.descriptionForPlatforms,
      //   commentsRecording: data.clientInfos.comments.commentsRecording,
      // },
      {
        headers: { authorization: "Bearer " + userInfo.token },
      }
    );

    history.push("/episodes");
  };

  useEffect(() => {
    const fetchData = async () => {
      const userInfo = JSON.parse(Cookies.get("userInfo"));
      if (userInfo.token) {
        const response = await axios.get(
          `${process.env.REACT_APP_URL}/api/episodes/${episodeId}`,
          //`http://localhost:3310/api/episodes/${episodeId}`,
          {
            headers: { authorization: "Bearer " + userInfo.token },
          }
        );

        setData(response.data);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [episodeId]);

  return isLoading ? (
    <Loader></Loader>
  ) : (
    <div className="main-container">
      <UserHeader setUser={setUser} />
      <div className="content-main">
        <div className="hello">
          <h1>Valider mon épisode</h1>
        </div>
        <p className="epTitle">{data.echoesInfos.nameEchoes}</p>
        <div className="recordingInfo">
          <div>
            <div>
              <p>Commentaires sur l'épisode</p>
              <textarea
                placeholder="Des modifications à apporter ?"
                type="text"
                rows={5}
                cols={10}
                value={data.clientInfos.comments.commentsRecording}
                onChange={(event) => {
                  const newData = { ...data };
                  newData.clientInfos.comments.commentsRecording =
                    event.target.value;
                  setData(newData);
                }}
              />
            </div>

            <div>
              <p>Description de l'épisode pour les plateformes podcast *</p>
              <textarea
                placeholder=" Entrez le texte qui accompagnera votre épisode sur les plateformes"
                type="text"
                rows={10}
                cols={10}
                value={data.clientInfos.descriptionForPlatforms}
                onChange={(event) => {
                  const newData = { ...data };

                  newData.clientInfos.descriptionForPlatforms =
                    event.target.value;
                  setData(newData);
                }}
              />
            </div>
          </div>

          <div className="audioAndValid">
            <div>
              <figure>
                <audio controls src={data.echoesInfos.audioEchoes.finalEchoes}>
                  Your browser does not support the
                  <code>audio</code> element.
                </audio>
                <br />
                <br />
                <a href={data.echoesInfos.audioEchoes.finalEchoes}>
                  <div
                    style={{
                      height: "40px",
                      backgroundColor: "var(--pink)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "10px",
                      marginBottom: "20px",
                    }}
                  >
                    <FontAwesomeIcon icon="download" />
                    <div>Télécharger</div>
                  </div>
                </a>
              </figure>
            </div>
            <br /> <br />
            <div className="recordingToTest" style={{ display: "flex" }}>
              <div style={{ marginBottom: "7px" }}>
                Est-ce que l'épisode vous convient?
              </div>
              <br />
              <div className="recordingButtons">
                <button
                  onClick={(event) => {
                    const newData = { ...data };
                    newData.status = "5 - Terminé";
                    setData(newData);
                    setButton("approved");
                  }}
                >
                  <FontAwesomeIcon
                    style={{ color: "var( --turquoise)" }}
                    icon="check-circle"
                  />
                </button>
                <button
                  onClick={(event) => {
                    const newData = { ...data };
                    newData.status = "3 - En production";
                    setData(newData);
                    setButton("refused");
                  }}
                >
                  <FontAwesomeIcon
                    style={{ color: "var(--pink)" }}
                    icon="times-circle"
                  />
                </button>
                <br />
              </div>
              {button === "approved" ? (
                <button
                  style={{
                    border: "none",
                    backgroundColor: "var( --turquoise)",
                    color: "white",
                    fontSize: "20px",
                    width: "250px",
                    height: "70px",
                    marginTop: "7px",
                    borderRadius: "10px",
                    cursor: "pointer",
                  }}
                  onClick={handleSubmit}
                >
                  Valider l'épisode
                </button>
              ) : (
                button === "refused" && (
                  <button
                    style={{
                      border: "none",
                      backgroundColor: "var(--pink)",
                      color: "white",
                      fontSize: "20px",
                      width: "250px",
                      height: "70px",
                      marginTop: "7px",
                      borderRadius: "10px",
                      cursor: "pointer",
                    }}
                    onClick={handleSubmit}
                  >
                    Demander une révision
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadPage;
