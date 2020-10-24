import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import Cookies from "js-cookie";

import Loader from "../../components/Loader";

import UserHeader from "../../components/UserHeader";
import Diff from "../../components/Diff";

// Download Icon import:
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//This page will be available once Echoes team receive an episode command from the client and send him back a link (by email:mailgun integration to be
//done in backoffice after recording demo to test) in order to display this page and test the demo
// Voice demo to upload here & Text adaptation done by Echoes team, differences between versions to be displayed

const ProductionRecord = ({ setUser }) => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const { episodeId } = useParams();
  const [data, setData] = useState();
  const [button, setButton] = useState(undefined);

  const handleSubmit = async (event) => {
    const userInfo = Cookies.getJSON("userInfo");
    await axios.post(
      `${process.env.REACT_APP_URL}/api/episodes/launchProduction/${data._id}`,
      {
        status: data.status,
        commentsDemo: data.clientInfos.comments.commentsDemo,
      },
      // `http://localhost:3310/api/episodes/update/${data._id}`,
      // data,

      // `http://localhost:3310/api/episodes/launchProduction/${data._id}`,
      // {
      //   status: data.status,
      //   commentsDemo: data.clientInfos.comments.commentsDemo,
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
          {
            headers: { authorization: "Bearer " + userInfo.token },
          }
        );
        // console.log(response.data);
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
          <h1>Options de l'épisode</h1>
        </div>

        <div className="recordingInfo" style={{ marginTop: "80px" }}>
          <div>
            <div className="titleAndText">
              <div className="titleAdapted">
                <p style={{ margin: "0 0 40px 0" }}>
                  Nom de l'épisode
                  <span style={{ color: "var(--pink)" }}>(Adapté)</span>
                </p>
                <div
                  className="diff"
                  style={{ textAlign: "justify", fontWeight: "500" }}
                >
                  <Diff
                    oldValue={data.clientInfos.name}
                    newValue={data.echoesInfos.nameEchoes}
                  />
                </div>
              </div>
              <div className="textAdapted">
                <p style={{ margin: "80px 0 40px 0" }}>
                  Texte à transformer en audio
                  <span style={{ color: "var(--pink)" }}>(Adapté)</span>
                </p>
                <div
                  className="diff"
                  style={{ textAlign: "justify", fontWeight: "500" }}
                >
                  <Diff
                    oldValue={data.clientInfos.textToTransform}
                    newValue={data.echoesInfos.textToTransformEchoes}
                  />
                </div>
              </div>

              <p style={{ margin: "80px 0 40px 0" }}>
                Voix séléctionnée :
                <span style={{ fontWeight: "500" }}>
                  {data.echoesInfos.voiceNameEchoes}
                </span>
              </p>

              <div>
                <p>Commentaires sur l'extrait*</p>
                <textarea
                  placeholder="Comment pourrions nous rendre cet extrait encore meilleur?"
                  type="text"
                  rows={10}
                  cols={10}
                  value={data.clientInfos.comments.commentsDemo}
                  onChange={(event) => {
                    const newData = { ...data };
                    newData.clientInfos.comments.commentsDemo =
                      event.target.value;
                    setData(newData);
                  }}
                />
              </div>
            </div>
          </div>

          <div className="audioAndValid">
            <div>
              <figure>
                <audio
                  style={{ marginBottom: "7px", textAlign: "center" }}
                  controls
                  src={data.echoesInfos.audioEchoes.extractEchoes}
                >
                  Your browser does not support the
                  <code>audio</code> element.
                </audio>
              </figure>
            </div>
            <br />
            <div className="demoToTest" style={{ display: "flex" }}>
              <div style={{ marginBottom: "7px" }}>
                Est-ce que l'extrait vous convient?
              </div>
              <br />
              <div style={{ textAlign: "center" }}>
                <div className="recordingButtons">
                  <button
                    onClick={(event) => {
                      const newData = { ...data };
                      newData.status = "3 - En production";
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
                      newData.status = "1 - En attente Echoes";
                      setData(newData);
                      setButton("refused");
                    }}
                  >
                    <FontAwesomeIcon
                      style={{ color: "var(--pink)" }}
                      icon="times-circle"
                    />
                  </button>
                </div>
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
                  Lancer la production
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

export default ProductionRecord;
