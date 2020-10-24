import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const TailorMadeFormPage = () => {
  const [programmeName, setProgrammeName] = useState("");
  const [podcastUse, setPodcastUse] = useState("");
  const [podcastType, setPodcastType] = useState("");
  const [podcastTone, setPodcastTone] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [reference, setReference] = useState("");
  const [launch, setLaunch] = useState("");
  const [frequence, setFrequence] = useState("");
  const [other, setOther] = useState("");
  const [email, setEmail] = useState("");
  const [isSend, setIsSend] = useState(false);
  const history = useHistory();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const userInfo = JSON.parse(Cookies.get("userInfo"));

      await axios.post(
        `${process.env.REACT_APP_URL}/api/devis`,
        {
          programmeName: programmeName,
          podcastUse: podcastUse,
          podcastType: podcastType,
          podcastTone: podcastTone,
          minPrice: minPrice,
          maxPrice: maxPrice,
          reference: reference,
          launch: launch,
          frequence: frequence,
          other: other,
          email: email,
        },
        {
          headers: { authorization: "Bearer " + userInfo.token },
        }
      );
      setIsSend(true);
      setTimeout(() => {
        history.push("/");
      }, 2000);
    } catch (error) {
      alert("Erreur");
    }
  };

  return (
    <div className="main-container">
      <div className="tailor-form-container">
        <h1>Nouveau Programme de podcast - Tailor Made</h1>
        <form className="tailor-form" onSubmit={handleSubmit}>
          <div className="tailor-form-input">
            <p>
              Nom du programme ? Indiquez le nom qui s'affichera dans votre
              studio Echoes uniquement:
            </p>

            <textarea
              required
              onChange={(event) => {
                setProgrammeName(event.target.value);
              }}
            ></textarea>

            <span style={{ marginTop: 10 }}>Champs obligatoire*</span>
          </div>

          <div className="tailor-form-input">
            <p>
              Pourquoi avez vous besoin de podcasts : Quel(s) message(s)
              voulez-vous faire passer? Quelle(s) cible(s)?
            </p>

            <textarea
              required
              onChange={(event) => {
                setPodcastUse(event.target.value);
              }}
            ></textarea>
            <span style={{ marginTop: 10 }}>Champs obligatoire*</span>
          </div>

          <div className="tailor-form-input">
            <p>
              Quel type de podcast souhaitez-vous que nous produisions?
              (Narratif, interview, hybride, E-learning...?)
            </p>
            <textarea
              required
              onChange={(event) => {
                setPodcastType(event.target.value);
              }}
            ></textarea>
            <span style={{ marginTop: 10 }}>Champs obligatoire*</span>
          </div>

          <div className="tailor-form-input">
            <p>
              Quelle tonalité souhaitez-vous pour votre/vos vidéo(s) ? (Tonique,
              calme, humoristique, sérieux, décalé, inspirant...?)
            </p>
            <textarea
              required
              onChange={(event) => {
                setPodcastTone(event.target.value);
              }}
            ></textarea>
            <span style={{ marginTop: 10 }}>Champs obligatoire*</span>
          </div>

          <div className="tailor-form-input">
            <p>Quel est votre budget?</p>
            <div className="tailor-form-input-price">
              <span>De </span>
              <input
                type="number"
                onChange={(event) => {
                  setMinPrice(event.target.value);
                }}
              />
              <span> à </span>
              <input
                required
                type="number"
                onChange={(event) => {
                  setMaxPrice(event.target.value);
                }}
              />
            </div>
            <span style={{ marginTop: 10 }}>Champs obligatoire*</span>
          </div>

          <div className="tailor-form-input">
            <p>Pouvez-vous nous donner des podcasts références ?</p>
            <textarea
              onChange={(event) => {
                setReference(event.target.value);
              }}
            ></textarea>
          </div>

          <div className="tailor-form-input">
            <p>Quand et où souhaitez vous diffuser votre podcast ?</p>
            <textarea
              required
              onChange={(event) => {
                setLaunch(event.target.value);
              }}
            ></textarea>
            <span style={{ marginTop: 10 }}>Champs obligatoire*</span>
          </div>
          <label className="tailor-form-input">
            <h4>A quelle fréquence? À titre indicatif</h4>

            <select
              required
              onChange={(event) => {
                setFrequence(event.target.value);
              }}
            >
              <option value="empty">--Veuillez choisir une option--</option>
              <option value="plusieurs épisodes par semaine">
                Plusieurs épisodes par semaine
              </option>
              <option value="hebdomadaire">Hebdomadaire</option>
              <option value="bimensuelle">Bimensuelle</option>
              <option value="mensuelle">Mensuelle</option>
              <option value="indéterminé">Indéterminé</option>
            </select>
          </label>

          <div className="tailor-form-input">
            <p>Avez-vous d'autre(s) chose(s) à nous dire?</p>
            <textarea
              onChange={(event) => {
                setOther(event.target.value);
              }}
            ></textarea>
          </div>

          <div className="tailor-form-input">
            <p>Veuillez entrer votre e-mail</p>
            <input
              type="email"
              className="email-form"
              required
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            ></input>
            <span style={{ marginTop: 10 }}>Champs obligatoire*</span>
          </div>

          {isSend ? (
            <div className="devis-send">Devis envoyé !</div>
          ) : (
            <button type="submit">Envoyer la demande de devis</button>
          )}
        </form>
      </div>
    </div>
  );
};

export default TailorMadeFormPage;
