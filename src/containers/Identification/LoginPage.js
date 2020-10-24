import React, { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useHistory } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LoginPage = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [eye, setEye] = useState(true);
  const history = useHistory();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      if (email && password) {
        const response = await axios.post(
          `${process.env.REACT_APP_URL}/api/login`,
          {
            email: email,
            password: password,
          }
        );
        if (response.data.token !== null) {
          const userInfo = {
            token: response.data.token,
            id: response.data._id,
            firstName: response.data.firstName,
          };
          Cookies.set(
            "userInfo",
            userInfo,
            {
              expires: 1,
            },
            { sameSite: "strict" }
          );
          setUser(response.data.token);
          history.push("/dashboard");
        }
      } else {
        setErrorMsg("Vous n'avez pas rempli tous les champs.");
      }
    } catch (err) {
      console.log(err);
      if (err.response.status === 401 || 404) {
        setErrorMsg("L'adresse mail et/ou mot de passe ne sont pas valide.");
      } else {
        alert("Erreur");
      }
    }
  };

  return (
    <div className="login-signup-container">
      <div className="log-in">
        <h1>Connectez-vous</h1>
        <form onSubmit={handleSubmit} className="login-form">
          <div>
            <p className="error">{errorMsg}</p>

            <label className="label">Email &#42;</label>
            <br />
            <input
              type="email"
              className="form-input"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            <br />
            <label className="label">Mot de passe &#42;</label>
            <br />
            <div className="inputWithIcon">
              <input
                type="password"
                className="form-input-with-icon"
                id="input"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
              <div className="inputIcon">
                {eye === true ? (
                  <FontAwesomeIcon
                    id="eye"
                    icon="eye"
                    onClick={() => {
                      setEye(false);
                      var x = document.getElementById("input");
                      x.type = "text";
                    }}
                  />
                ) : (
                  <FontAwesomeIcon
                    id="eye"
                    icon="eye-slash"
                    onClick={() => {
                      setEye(true);
                      var x = document.getElementById("input");
                      x.type = "password";
                    }}
                  />
                )}
              </div>
            </div>
            <br />
            <div className="log-in-bottom">
              <button type="submit" className="btn-60 pink">
                Se connecter
              </button>
              <button
                className="redirect-btn"
                onClick={() => {
                  history.push("/forgotpassword");
                }}
              >
                Mot de passe oublié ?
              </button>
              <br />
              <p className="form-p">
                Envie de nous rejoindre ?
                <button
                  className="redirect-btn"
                  onClick={() => {
                    history.push("/signup");
                  }}
                >
                  &nbsp;Créer un compte
                </button>
              </p>

              <br />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
