import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import { useHistory } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Modal = ({
  hide,
  setHide,
  modal,
  setModal,
  disabled,
  setdisabled,
  erase,
  setErase,
  identity,
  name,
  firstName,
  email,
  phone,
  newPassword,
  confirmNewPassword,
  companyName,
  job,
  siret,
  tva,
  street,
  postalCode,
  city,
}) => {
  const [eye, setEye] = useState(true);
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const getCookie = Cookies.getJSON("userInfo");
  const id = getCookie.id;
  const token = getCookie.token;
  const history = useHistory();
  const handleSubmit = async (event) => {
    if (erase) {
      try {
        event.preventDefault();
        await axios.post(`${process.env.REACT_APP_URL}/api/deleteaccount`, {
          id: id,
          password: password,
        });

        setModal(!modal);
        history.push("/");
      } catch (error) {
        if (error.response.status === 401) {
          setError("Mot de passe incorrect");
        } else {
          alert("Erreur");
        }
      }
    } else {
      try {
        event.preventDefault();
        if (name && firstName && email && newPassword === confirmNewPassword) {
          await axios.post(
            `${process.env.REACT_APP_URL}/api/updateaccount?id=${id}`,
            {
              password: password,
              identity: identity,
              name: name,
              firstName: firstName,
              email: email,
              phone: phone,
              newPassword: newPassword,
              companyName: companyName,
              // companyName === "" ? (companyName = "") : companyName,
              job: job,
              siret: siret,
              tva: tva,
              street: street,
              postalCode: postalCode,
              city: city,
            },
            {
              headers: { authorization: "Bearer " + token },
            }
          );

          setModal(!modal);
          setdisabled(!disabled);
          setHide(!hide);
        } else if (newPassword !== confirmNewPassword) {
          setError("Les mots de passe ne sont pas identiques");
        } else {
          setError("Des informations sont manquantes ou incorectes");
        }
      } catch (error) {
        if (error.response.status === 401) {
          setError("Mot de passe incorrect");
        } else {
          alert("Erreur");
        }
      }
    }
  };

  const annuler = () => {
    setModal(!modal);

    if (!erase) {
      setHide(!hide);
      setdisabled(!disabled);
    } else {
      setErase(!erase);
    }
  };

  return (
    <div
      id="connect-modal"
      onClick={(event) => {
        var modalExit = document.getElementById("connect-modal");
        if (event.target === modalExit) {
          setModal(!modal);
        }
      }}
    >
      <div id="modal">
        <form onSubmit={handleSubmit}>
          {erase ? (
            <h2 className="modal-delete">Supprimez</h2>
          ) : (
            <h2 className="modal-valid">Validez</h2>
          )}
          <span className="error">{error}</span>
          <br />
          <label className="label">Entrez votre mot de passe</label>
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
                  id="eye5"
                  icon="eye"
                  onClick={() => {
                    setEye(false);
                    var x = document.getElementById("input");
                    x.type = "text";
                  }}
                />
              ) : (
                <FontAwesomeIcon
                  id="eye6"
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
          <div className="modalButtons">
            <button className="btn-60 pink" type="submit">
              Valider
            </button>
            <button className="btn-60" onClick={() => annuler()}>
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
