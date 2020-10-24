import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";

const CheckoutForm = ({ title, amount, productId, data }) => {
  // useHistory et Stripe
  const history = useHistory();
  const stripe = useStripe();
  const elements = useElements();

  // States
  const [complete, setComplete] = useState(false);
  const [user, setUser] = useState();
  const [disabled, setDisabled] = useState(true);
  const [hide, setHide] = useState(true);

  // State onChange
  const [changeName, setChangeName] = useState("");
  const [changeFirstName, setChangeFirstName] = useState("");
  const [changePhone, setChangePhone] = useState("");
  const [changeEmail, setChangeEmail] = useState("");
  const [changeAdress, setChangeAdress] = useState("");
  const [changePostalCode, setChangePostalCode] = useState("");
  const [changeCity, setChangeCity] = useState("");
  const [password, setPassword] = useState("");

  // get Cookie id
  const userInfo = Cookies.getJSON("userInfo");
  // const userId = userInfo.id;
  const userToken = userInfo.token;
  const stripeAmount = amount * 100;

  // Récupération des infos de l'utilisateur
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_URL}/api/account`,
        {
          headers: { authorization: "Bearer " + userToken },
        }
      );

      setUser(response.data);
      setChangeName(response.data.name);
      setChangeFirstName(response.data.firstName);
      setChangePhone(response.data.phone);
      setChangeEmail(response.data.email);
      setChangeAdress(response.data.company.address.street);
      setChangeCity(response.data.company.address.city);
      setChangePostalCode(response.data.company.address.postalCode);
    };

    fetchData();
  }, [userToken]);

  const episodeStatus = async () => {
    // console.log("le user token : ", userToken);
    try {
      data.status = "1 - En attente Echoes";
      const changeStatus = await axios.post(
        `${process.env.REACT_APP_URL}/api/episodes/update/${productId}`,
        data,
        {
          headers: { authorization: "Bearer " + userToken },
        }
      );
      // console.log("change status = ", changeStatus);
      return changeStatus;
    } catch (error) {
      // console.log(error.message);
    }
  };

  // Fonction submit lors de la modification des infos de l'utilisateur
  const handleSubmitChange = async (event) => {
    try {
      event.preventDefault();
      if (password !== "") {
        await axios.post(
          `${process.env.REACT_APP_URL}/api/updateaccount`,

          {
            name: changeName,
            firstName: changeFirstName,
            email: changeEmail,
            phone: changePhone,
            street: changeAdress,
            postalCode: changePostalCode,
            city: changeCity,
            password: password,
          },
          {
            headers: { authorization: "Bearer " + userToken },
          }
        );
        setDisabled(!disabled);
        setHide(!hide);
      } else {
        alert("Veuillez entrer votre mot de passe");
      }
    } catch (err) {
      if (err.response.status === 401 || 404) {
        alert("Mot de passe invalide.");
      } else {
        alert("Erreur");
      }
    }
  };

  // Fonction submit lors de la validation du paiement
  const submit = async (ev) => {
    try {
      // Destructuring info du user
      const { street, postalCode, city } = user.company.address;
      const { name, firstName } = user;

      // Requête Stripe : récupération du token
      const cardElement = elements.getElement(CardElement);
      const stripeResponse = await stripe.createToken(cardElement, {
        name: `${firstName} ${name}`,
        address_line1: street,

        address_city: city,

        address_zip: postalCode,
      });
      // console.log("stripe Response : ", stripeResponse);

      // Requête Stripe lors de l'envoie du paiement
      const stripeToken = stripeResponse.token.id;

      const chargeRes = await axios.post(
        `${process.env.REACT_APP_URL}/api/payment`,
        {
          // Exemple
          stripeToken: stripeToken,
          amount: stripeAmount,
          description: title,
          productId: productId,
        },
        { headers: { Authorization: "Bearer " + userToken } }
      );

      // Le backend nous confirme que le paiement a été effectué
      if (chargeRes.status === 200) {
        setComplete(true);
        episodeStatus();
        function redirect() {
          history.push("/episodes");
        }
        setTimeout(redirect, 3000);
      }
    } catch (error) {
      // console.log("error   =====>  ", error.message);
    }
  };

  // Si le paiement est effectué, alerte utilisateur
  if (complete) {
    return (
      <div className="payment-confirmed">
        <span>Paiement effectué !</span>
      </div>
    );
  }

  // Si il n'y a pas d'info user, on retourne une espace vide, sinon, on affiche le formulaire
  if (!user) {
    return <></>;
  } else {
    return (
      <div className="checkout">
        <h2>Vos coordonnées bancaires</h2>
        {/* On affiche le formualire de carte bleue */}
        {user && (
          <form className="checkout-userInfos" onSubmit={handleSubmitChange}>
            <div className="perso">
              <input
                placeholder="Prénom"
                type="text"
                value={changeFirstName}
                disabled={disabled}
                onChange={(event) => {
                  setChangeFirstName(event.target.value);
                }}
              />
              <input
                type="texte"
                placeholder="Nom"
                value={changeName}
                disabled={disabled}
                onChange={(event) => {
                  setChangeName(event.target.value);
                }}
              />
            </div>
            <div className="perso">
              <input
                placeholder="Téléphone"
                type="number"
                value={changePhone}
                disabled={disabled}
                onChange={(event) => {
                  setChangePhone(event.target.value);
                }}
              />
              <input
                placeholder="email"
                type="text"
                value={changeEmail}
                disabled={disabled}
                onChange={(event) => {
                  setChangeEmail(event.target.value);
                }}
              />
            </div>
            <div className="adress">
              <input
                placeholder="Adresse"
                type="text"
                value={changeAdress}
                disabled={disabled}
                onChange={(event) => {
                  setChangeAdress(event.target.value);
                }}
              />
              <input
                placeholder="Code postal"
                type="text"
                value={changePostalCode}
                disabled={disabled}
                onChange={(event) => {
                  setChangePostalCode(event.target.value);
                }}
              />
              <input
                placeholder="Ville"
                type="text"
                value={changeCity}
                disabled={disabled}
                onChange={(event) => {
                  setChangeCity(event.target.value);
                }}
              />
            </div>
            <div>
              {hide ? (
                <button
                  className="btn-60"
                  onClick={() => {
                    setDisabled(!disabled);
                    setHide(!hide);
                  }}
                >
                  Modifier mes informations
                </button>
              ) : (
                <>
                  <input
                    type="password"
                    value={password}
                    placeholder="password"
                    onChange={(event) => {
                      setPassword(event.target.value);
                    }}
                  />
                  <button className="btn-60" type="submit">
                    Enregistrer
                  </button>
                </>
              )}
            </div>
          </form>
        )}

        {/* Espace de paiement */}
        <div id="card-element">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "20px",
                  color: "#83818b",
                  "::placeholder": {
                    color: "white",
                  },
                },
                invalid: {
                  color: "#9e2146",

                  "::placeholder": {
                    color: "#FFCCA5",
                  },
                },
              },
            }}
          />

          <div className="checkout-buttons">
            <button className="btn-60 pink" onClick={submit}>
              Procéder au paiement
            </button>

            <button
              className="btn-60 dark-grey"
              onClick={() => {
                history.push("/episodes");
              }}
            >
              Annuler
            </button>
          </div>
        </div>
      </div>
    );
  }
};
export default CheckoutForm;
