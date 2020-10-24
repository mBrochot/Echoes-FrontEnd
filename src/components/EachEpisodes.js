import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Delete from "./Delete";

const EachEpisodes = ({ elem, setreloadDelete }) => {
  const [episodeInfo, setEpisodeInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    setEpisodeInfo(elem);
    setIsLoading(false);
  }, [elem, episodeInfo.status]);

  const redirect = (status) => {
    if (status === "0 - Brouillon") {
      history.push(`/update/${elem._id}`);
    } else if (status === "2 - En attente validation") {
      history.push(`/production/thumbnail/${elem._id}`);
    } else {
      history.push(`/production/complete/${elem._id}`);
    }
  };
  // if (episodeInfo.status === "0 - Brouillon") {
  //   redirect = history.push(`/update/${elem._id}`);
  // } else if (episodeInfo.status === "2 - En attente validation") {
  //   redirect = history.push(`/production/thumbnail/${elem._id}`);
  // } else if (episodeInfo.status === "4 - En attente validation") {
  //   redirect = history.push(`/production/complete/${elem._id}`);
  // } else {
  //   redirect = "";
  // }

  const date = () => {
    const event = new Date(episodeInfo.timestamp);

    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    };
    return event.toLocaleDateString("fr-FR", options);
  };

  return isLoading ? (
    ""
  ) : (
    <div className="episodeItem">
      <Link to={{ pathname: `/production/recap/${elem._id}` }}>
        {episodeInfo.echoesInfos.nameEchoes &&
        (episodeInfo.status === "3 - En production" ||
          episodeInfo.status === "4 - En attente validation" ||
          episodeInfo.status === "5 - Terminé") ? (
          <div>{episodeInfo.echoesInfos.nameEchoes}</div>
        ) : episodeInfo.clientInfos.name ? (
          <div>{episodeInfo.clientInfos.name}</div>
        ) : (
          <div></div>
        )}

        <div>{date()}</div>

        <div
          className={
            episodeInfo.status === "0 - Brouillon"
              ? "status status-brouillon"
              : episodeInfo.status === "1 - En attente Echoes"
              ? "status status-echoes"
              : episodeInfo.status === "2 - En attente validation"
              ? "status status-attente-validation"
              : episodeInfo.status === "3 - En production"
              ? "status status-production"
              : episodeInfo.status === "4 - En attente validation"
              ? "status status-validation-finale"
              : "status status-termine"
          }
        >
          {episodeInfo.status}
        </div>

        {episodeInfo.echoesInfos.audioEchoes.durationEchoes === 0 ? (
          <div className="no-duration">-</div>
        ) : (
          <div>{episodeInfo.echoesInfos.audioEchoes.durationEchoes}</div>
        )}

        <div>
          {episodeInfo.status === "0 - Brouillon" && (
            <div className="deleteIcon">
              <Delete
                episodeInfo={episodeInfo}
                id={elem._id}
                setreloadDelete={setreloadDelete}
              />
            </div>
          )}
          {episodeInfo.status === "1 - En attente Echoes" ||
          episodeInfo.status === "3 - En production" ? (
            <div></div>
          ) : (
            <div>
              <button
                className="update-episode"
                onClick={() => redirect(episodeInfo.status)}
              >
                <FontAwesomeIcon icon="edit"></FontAwesomeIcon>
              </button>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default EachEpisodes;
