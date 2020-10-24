import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../../components/Loader";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ResetPasswordPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [authorization, setAuthorization] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState("");
  const [eye7, setEye7] = useState(true);
  const [eye8, setEye8] = useState(true);
  const [resetOK, setResetOK] = useState(false);
  const { resetToken } = useParams();
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios.post(`${process.env.REACT_APP_URL}/api/resetpassword`, {
          resetPasswordToken: resetToken,
        });
        setAuthorization(true);
      } catch (error) {
        if (error.response.status === 404) {
          setAuthorization(false);
        } else {
          setError(error.response);
        }
      }
      setIsLoading(false);
    };

    fetchData();
  }, [resetToken]);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      if (newPassword === confirmNewPassword) {
        await axios.post(`${process.env.REACT_APP_URL}/api/updatepassword`, {
          resetPasswordToken: resetToken,
          newPassword: newPassword,
        });

        setResetOK(true);
        function redirect() {
          history.push("/");
        }
        setTimeout(redirect, 3000);
      } else if (newPassword !== confirmNewPassword) {
        setError("Les mots de passe ne sont pas identiques");
      } else {
        setError("Des informations sont manquantes ou incorectes");
      }
    } catch (error) {
      if (error.response.status === 404) {
        setError("Vôtre lien n'est plus valide.");
      } else {
        setError(error.response);
      }
    }
  };

  return isLoading ? (
    <Loader></Loader>
  ) : (
    <div className="login-signup-container">
      <div className="reset-password">
        {resetOK === false ? (
          <>
            {authorization === false ? (
              <>
                <p>Ce lien n'est plus valide.</p>
                <br />
                <p>Suivez le lien ci-dessous pour recommencer la procédure.</p>
                <br />
                <button
                  className="redirect-btn"
                  onClick={() => {
                    history.push("/forgotpassword");
                  }}
                >
                  Mot de passe oublié ?
                </button>
              </>
            ) : (
              <>
                <h1>Réinitialisation</h1>
                <br />
                <p className="error">{error}</p>
                <br />
                <form onSubmit={handleSubmit}>
                  <label className="label">
                    Entrez votre nouveau mot de passe
                  </label>
                  <div className="inputWithIcon">
                    <input
                      className="form-input-with-icon"
                      type="password"
                      id="password1"
                      value={newPassword}
                      onChange={(event) => {
                        setNewPassword(event.target.value);
                      }}
                    />
                    <div className="inputIcon">
                      {eye7 === true ? (
                        <FontAwesomeIcon
                          id="eye7"
                          icon="eye"
                          onClick={() => {
                            setEye7(false);
                            var x = document.getElementById("password1");
                            x.type = "text";
                          }}
                        />
                      ) : (
                        <FontAwesomeIcon
                          id="eye7"
                          icon="eye-slash"
                          onClick={() => {
                            setEye7(true);
                            var x = document.getElementById("password1");
                            x.type = "password";
                          }}
                        />
                      )}
                    </div>
                  </div>
                  <br />

                  <br />
                  <label className="label">
                    Confirmation du nouveau mot de passe
                  </label>

                  <div className="inputWithIcon">
                    <input
                      className={
                        confirmNewPassword !== newPassword
                          ? "form-input-unvalid-with-icon"
                          : "form-input-with-icon"
                      }
                      type="password"
                      id="password2"
                      value={confirmNewPassword}
                      onChange={(event) => {
                        setConfirmNewPassword(event.target.value);
                      }}
                    />
                    <div className="inputIcon">
                      {eye8 === true ? (
                        <FontAwesomeIcon
                          id="eye8"
                          icon="eye"
                          onClick={() => {
                            setEye8(false);
                            var y = document.getElementById("password2");
                            y.type = "text";
                          }}
                        />
                      ) : (
                        <FontAwesomeIcon
                          id="eye8"
                          icon="eye-slash"
                          onClick={() => {
                            setEye8(true);
                            var y = document.getElementById("password2");
                            y.type = "password";
                          }}
                        />
                      )}
                    </div>
                  </div>
                  <br />
                  <button className="btn-60 pink" type="submit">
                    Valider
                  </button>
                </form>
              </>
            )}
          </>
        ) : (
          <>
            <p>Vous allez être redirigé vers la page d'accueil.</p>
          </>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordPage;
