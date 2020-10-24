import React from "react";
import { useHistory } from "react-router-dom";
import UserHeader from "../../components/UserHeader";

const EpisodesTypeChoicePage = ({ setUser }) => {
  const history = useHistory();
  return (
    <div className="main-container">
      <UserHeader setUser={setUser} />
      <div className="content-main">
        <div className="choices-container">
          <div className="choice-container">
            <h3>TEXT TO AUDIO</h3>
            <p>À partir de 80 € / épisode</p>
            <p style={{ fontWeight: "bold" }}>
              Transformez en audio vos meilleurs articles de blogs, newsletters,
              livres blancs.
            </p>
            <br />
            <p style={{ fontWeight: "bold" }}>Nos options disponibles </p>
            <br />
            <ul>
              <li>Création intro sonore</li>
              <li>Adaptation du texte</li>
              <li>Sound Design</li>
              <li>Synchronisation vidéo</li>
            </ul>

            <button
              className="btn-60 pink"
              onClick={() => history.push("/createEpisode")}
            >
              Démarrer
            </button>
          </div>
          <div className="choice-container">
            <h3>TAILOR-MADE</h3>
            <span>Sur devis</span>
            <div>
              <p>
                Format narratif, interview ou hybride: nous trouvons le format
                qui vous fera sortir du lot.
              </p>
              <p>
                Notre équipe créative vous accompagne dans la rédaction du
                script, la recherche du meilleur ambassadeur etc.
              </p>
            </div>

            <button
              className="btn-60 pink"
              onClick={() => history.push("/tailormade")}
            >
              Devis personnalisé
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EpisodesTypeChoicePage;
