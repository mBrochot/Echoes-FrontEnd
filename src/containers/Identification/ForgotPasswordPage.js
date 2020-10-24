import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
// page permettant d'envoyer son email (et vérifier qu'il est bien en BDD)

const ForgotPasswordPage = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [check, setCheck] = useState(false);
  const history = useHistory();

  // Récupère l'URL
  var url = window.location.protocol + "//" + window.location.host;

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      if (email) {
        const response = await axios.post(
          `${process.env.REACT_APP_URL}/api/forgotpassword`,
          {
            email: email,
            url: url,
          }
        );
        if (response.data.status === 200) {
          setCheck(true);
        }
      } else {
        setError("Vous n'avez pas indiqué votre email.");
      }
    } catch (error) {
      if (error.response.status === 404) {
        setError("L'adresse mail est inconnue.");
      } else {
        alert("Erreur");
      }
    }
  };

  return (
    <div className="login-signup-container">
      <div className="forgot-password">
        {check ? (
          <>
            <p>Votre demande a bien été envoyée !</p>
            <br />
            <p>Allez consulter votre boîte mail.</p>
          </>
        ) : (
          <>
            <h1>Mot de passe oublié ?</h1>
            <br />
            <br />
            <p>Pour réinitialiser votre mot de passe,</p>
            <br />
            <p>saisissez l'adresse email que vous utilisez.</p>
            <br />
            <form onSubmit={handleSubmit}>
              <span className="error">{error}</span>
              <br />
              <label className="label">Adresse email</label>
              <input
                type="email"
                className="form-input"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
              <button type="submit" className="btn-60 pink">
                Envoyer
              </button>
            </form>

            <button
              className="redirect-btn"
              onClick={() => {
                history.push("/");
              }}
            >
              Retour à la page d'accueil
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
