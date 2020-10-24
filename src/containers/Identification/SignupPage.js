import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import Reaptcha from "reaptcha";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SignupPage = ({ setUser }) => {
  const [name, setName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cgv, setCgv] = useState(false);
  const [captcha, setCaptcha] = useState(false);
  const [error, setError] = useState("");
  const [eye1, setEye1] = useState(true);
  const [eye2, setEye2] = useState(true);
  const history = useHistory();

  const onVerify = (recaptchaResponse) => {
    setCaptcha(true);
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      if (
        name &&
        firstName &&
        email &&
        password === confirmPassword &&
        cgv &&
        captcha
      ) {
        const response = await axios.post(
          `${process.env.REACT_APP_URL}/api/signup`,
          {
            name: name,
            firstName: firstName,
            email: email,
            phone: phone,
            password: password,
          }
        );

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
      } else if (password !== confirmPassword) {
        setError("Les mots de passe ne sont pas identiques");
      } else if (!cgv) {
        setError("Vous n'avez pas accepté les Conditions Générales");
      } else {
        setError("Des informations sont manquantes ou incorectes");
      }
    } catch (error) {
      if (error.response.status === 409) {
        setError("Cet email existe déjà");
      } else if (error.response.status === 400) {
        setError("Vous n'avez pas remplis tout le formulaire");
      } else {
        alert("Erreur");
      }
    }
  };

  return (
    <div className="login-signup-container">
      <div className="sign-up">
        <h1>Créer un compte</h1>

        <p className="error">{error}</p>

        <form className="signup-form" onSubmit={(event) => handleSubmit(event)}>
          <div className="twoCols">
            <div className="signupLine">
              <div>
                <label className="label">Prénom &#42;</label>
                <br />
                <input
                  className="form-input"
                  type="text"
                  value={firstName}
                  required
                  onChange={(event) => {
                    setFirstName(event.target.value);
                  }}
                />
              </div>
              <div>
                <label className="label">Nom &#42;</label>
                <br />
                <input
                  className="form-input"
                  type="text"
                  value={name}
                  required
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                />
              </div>
            </div>

            <div className="signupLine">
              <div>
                <label className="label">Email &#42;</label>
                <br />
                <input
                  className="form-input"
                  type="email"
                  value={email}
                  required
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
              </div>
              <div>
                <label className="label">Téléphone</label>
                <br />
                <input
                  className="form-input"
                  type="tel"
                  maxLength="14"
                  value={phone}
                  onChange={(event) => {
                    setPhone(event.target.value);
                  }}
                />
              </div>
            </div>
            <div className="signupLine">
              <div>
                <label className="label">Mot de passe &#42;</label>
                <br />
                <div className="inputWithIcon">
                  <input
                    className="form-input-with-icon"
                    type="password"
                    id="password1"
                    required
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                    }}
                  />
                  <div className="inputIcon">
                    {eye1 === true ? (
                      <FontAwesomeIcon
                        id="eye1"
                        icon="eye"
                        onClick={() => {
                          setEye1(false);
                          var x = document.getElementById("password1");
                          x.type = "text";
                        }}
                      />
                    ) : (
                      <FontAwesomeIcon
                        id="eye1"
                        icon="eye-slash"
                        onClick={() => {
                          setEye1(true);
                          var x = document.getElementById("password1");
                          x.type = "password";
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="label">Confirmez le mot de passe &#42;</label>
                <br />
                <div className="inputWithIcon">
                  <input
                    className={
                      confirmPassword !== password
                        ? "form-input-unvalid-with-icon"
                        : "form-input-with-icon"
                    }
                    type="password"
                    id="password2"
                    required
                    value={confirmPassword}
                    onChange={(event) => {
                      setConfirmPassword(event.target.value);
                    }}
                  />
                  <div className="inputIcon">
                    {eye2 === true ? (
                      <FontAwesomeIcon
                        id="eye2"
                        icon="eye"
                        onClick={() => {
                          setEye2(false);
                          var y = document.getElementById("password2");
                          y.type = "text";
                        }}
                      />
                    ) : (
                      <FontAwesomeIcon
                        id="eye2"
                        icon="eye-slash"
                        onClick={() => {
                          setEye2(true);
                          var y = document.getElementById("password2");
                          y.type = "password";
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="general-conditions">
            {cgv === false ? (
              <i
                className="far fa-square"
                onClick={() => {
                  setCgv(!cgv);
                }}
              ></i>
            ) : (
              <i
                className="far fa-check-square"
                onClick={() => {
                  setCgv(!cgv);
                }}
              ></i>
            )}
            <p className="form-p">J'accepte les Conditions Générales</p>
          </div>

          <Reaptcha
            sitekey={process.env.REACT_APP_CAPTCHA}
            onVerify={onVerify}
          />

          <button className="btn-60 pink" type="submit">
            S'enregistrer
          </button>
        </form>
        <p className="form-p">
          Déjà un compte ?
          <button
            className="redirect-btn"
            onClick={() => {
              history.push("/");
            }}
          >
            Se connecter
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
