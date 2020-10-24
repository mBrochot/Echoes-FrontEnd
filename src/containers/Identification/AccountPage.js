import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loader from "../../components/Loader";
import UserHeader from "../../components/UserHeader";

const AccountPage = ({
  setUser,
  hide,
  setHide,
  modal,
  setModal,
  disabled,
  setdisabled,
  erase,
  setErase,
  identity,
  setIdentity,
  name,
  setName,
  firstName,
  setFirstName,
  email,
  setEmail,
  phone,
  setPhone,
  newPassword,
  setNewPassword,
  confirmNewPassword,
  setConfirmNewPassword,
  companyName,
  setCompanyName,
  job,
  setJob,
  siret,
  setSiret,
  tva,
  setTva,
  street,
  setStreet,
  postalCode,
  setPostalCode,
  city,
  setCity,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [eye1, setEye1] = useState(true);
  const [eye2, setEye2] = useState(true);

  // get Cookie id
  const getCookie = Cookies.getJSON("userInfo");
  const id = getCookie.id;
  const token = getCookie.token;

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_URL}/api/account?id=${id}`,
        {
          headers: { authorization: "Bearer " + token },
        }
      );
      setIdentity(response.data.identity);
      setName(response.data.name);
      setFirstName(response.data.firstName);
      setEmail(response.data.email);
      setPhone(response.data.phone);
      setNewPassword(response.data.newPassword);
      setConfirmNewPassword(response.data.confirmNewPassword);
      setCompanyName(response.data.company.companyName);
      setJob(response.data.job);
      setSiret(response.data.company.siret);
      setTva(response.data.company.tva);
      setStreet(response.data.company.address.street);
      setPostalCode(response.data.company.address.postalCode);
      setCity(response.data.company.address.city);

      setIsLoading(false);
    };
    fetchData();
  }, [
    id,
    setCity,
    setCompanyName,
    setJob,
    setConfirmNewPassword,
    setEmail,
    setIdentity,
    setFirstName,
    setName,
    setNewPassword,
    setPhone,
    setPostalCode,
    setSiret,
    setStreet,
    setTva,
    token,
  ]);

  return isLoading ? (
    <Loader></Loader>
  ) : (
    <div className="main-container">
      <UserHeader setUser={setUser} />
      <div className="content-main">
        <div className="hello">
          <h1>Mon compte</h1>
        </div>
        <form className="myAccountForm">
          <h2>Vos informations</h2>
          <div className="myAccountUser">
            <div>
              <label htmlFor="label">Genre </label>
              <br />
              <select
                id="identity-select"
                disabled={disabled}
                value={identity}
                onChange={(event) => {
                  setIdentity(event.target.value);
                }}
              >
                <option value="-">-</option>
                <option value="M.">M.</option>
                <option value="Mme">Mme</option>
                <option value="Ne se prononce pas">Ne se prononce pas</option>
              </select>

              <label className="label">Nom</label>
              <br />
              <input
                className="form-input"
                type="text"
                disabled={disabled}
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />
              <br />
              <label className="label">Prénom</label>
              <br />
              <input
                className="form-input"
                type="text"
                disabled={disabled}
                value={firstName}
                onChange={(event) => {
                  setFirstName(event.target.value);
                }}
              />
              <br />
              <label className="label">Email</label>
              <br />
              <input
                className="form-input"
                type="email"
                disabled={disabled}
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
              <br />
              <label className="label">Téléphone</label>
              <br />
              <input
                className="form-input"
                type="tel"
                maxLength="14"
                disabled={disabled}
                value={phone}
                onChange={(event) => {
                  setPhone(event.target.value);
                }}
              />
            </div>

            <div>
              <label className="label">Nouveau mot de passe</label>
              <br />
              <div className="inputWithIcon">
                <input
                  className="form-input-with-icon"
                  type="password"
                  id="password1"
                  disabled={disabled}
                  value={newPassword}
                  onChange={(event) => {
                    setNewPassword(event.target.value);
                  }}
                />
                <div
                  className={
                    disabled === true ? "inputIconDisabledAccount" : "inputIcon"
                  }
                >
                  {eye1 === true ? (
                    <FontAwesomeIcon
                      id="eye3"
                      icon="eye"
                      onClick={() => {
                        setEye1(false);
                        var x = document.getElementById("password1");
                        x.type = "text";
                      }}
                    />
                  ) : (
                    <FontAwesomeIcon
                      id="eye3"
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

              <label className="label">Confirmez le nouveau mot de passe</label>
              <br />
              <div className="inputWithIcon">
                <input
                  className={
                    confirmNewPassword !== newPassword
                      ? "form-input-unvalid-with-icon"
                      : "form-input-with-icon"
                  }
                  type="password"
                  id="password2"
                  disabled={disabled}
                  value={confirmNewPassword}
                  onChange={(event) => {
                    setConfirmNewPassword(event.target.value);
                  }}
                />
                <div
                  className={
                    disabled === true ? "inputIconDisabledAccount" : "inputIcon"
                  }
                >
                  {eye2 === true ? (
                    <FontAwesomeIcon
                      id="eye4"
                      icon="eye"
                      onClick={() => {
                        setEye2(false);
                        var y = document.getElementById("password2");
                        y.type = "text";
                      }}
                    />
                  ) : (
                    <FontAwesomeIcon
                      id="eye4"
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
          <br />
          <div className="helloCenter"></div>
          <br />
          <br />
          <h2>Votre entreprise</h2>
          <div className="myAccountUser">
            <div>
              <label className="label">Nom de l'entreprise</label>
              <br />
              <input
                className="form-input"
                type="text"
                disabled={disabled}
                value={companyName}
                onChange={(event) => {
                  setCompanyName(event.target.value);
                }}
              />
              <br />
              <label className="label">Votre fonction</label>
              <br />
              <input
                className="form-input"
                type="text"
                disabled={disabled}
                value={job}
                onChange={(event) => {
                  setJob(event.target.value);
                }}
              />
              <br />
              <label className="label">N° de siret</label>
              <br />
              <input
                className="form-input"
                type="text"
                disabled={disabled}
                value={siret}
                onChange={(event) => {
                  setSiret(event.target.value);
                }}
              />
            </div>

            <div>
              <label className="label">TVA</label>
              <br />
              <input
                className="form-input"
                type="text"
                disabled={disabled}
                value={tva}
                onChange={(event) => {
                  setTva(event.target.value);
                }}
              />
              <br />
              <label className="label">Rue</label>
              <br />
              <input
                className="form-input"
                type="text"
                disabled={disabled}
                value={street}
                onChange={(event) => {
                  setStreet(event.target.value);
                }}
              />

              <div className="cpVille">
                <div>
                  <label className="label">Code postal</label>
                  <br />
                  <input
                    className="form-input"
                    type="text"
                    disabled={disabled}
                    value={postalCode}
                    onChange={(event) => {
                      setPostalCode(event.target.value);
                    }}
                  />
                </div>
                <div>
                  <label className="label">Ville</label>
                  <br />
                  <input
                    className="form-input"
                    type="text"
                    disabled={disabled}
                    value={city}
                    onChange={(event) => {
                      setCity(event.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </form>

        {hide ? (
          <div className="account-action">
            <button
              className="btn-modify "
              type="submit"
              onClick={() => {
                setdisabled(!disabled);
                setHide(!hide);
              }}
              setdisabled
            >
              Modifier
            </button>
            <button
              className="btn-delete"
              type="submit"
              onClick={() => {
                setModal(!modal);
                setErase(!erase);
              }}
            >
              Supprimer mon compte
            </button>
          </div>
        ) : (
          <div className="account-action ">
            <button
              className="btn-save"
              onClick={() => {
                setModal(!modal);
              }}
            >
              Enregister
            </button>
            <button
              className="btn-annul"
              type="submit"
              onClick={() => {
                setdisabled(!disabled);
                setHide(!hide);
              }}
              setdisabled
            >
              Annuler
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountPage;
