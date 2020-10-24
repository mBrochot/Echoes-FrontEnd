import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
import UserHeader from "../../components/UserHeader";
import axios from "axios";
import CheckoutForm from "./CheckoutForm";
import Cookies from "js-cookie";
import Loader from "../../components/Loader";
// Stripe
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const CheckoutPage = ({ setUser, location }) => {
  // const location = useLocation();

  const epId = location.state.epId;

  // get Cookie id
  const userInfo = Cookies.getJSON("userInfo");
  const userToken = userInfo.token;

  // States
  const [clientInfos, setClientInfos] = useState([]);
  const [voice, setVoice] = useState("");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Variables
  let roundAmount = Math.round(amount * 100) / 100;

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_URL}/api/episodes/${epId}`,
        {
          headers: { authorization: "Bearer " + userToken },
        }
      );
      setData(response.data);
      setClientInfos(response.data.clientInfos);
      setVoice(response.data.clientInfos.voice);
      setTitle(response.data.clientInfos.name);
      setAmount(response.data.clientInfos.price);
      setIsLoading(false);
    };
    fetchData();
  }, [userToken, epId]);

  // Stripe
  const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPEKEY}`);

  return isLoading ? (
    <Loader></Loader>
  ) : (
    <div className="main-container">
      <UserHeader setUser={setUser} />
      <div className="content-main">
        <div className="hello">
          <h1>Paiement</h1>
        </div>
        <div className="recap-container">
          {/* Affichage du titre de l'épisode */}
          <div>
            <div className="recap-map">
              <h2>Récapitulatif de votre commande</h2>
              {title ? (
                <p>
                  <span>Nom de l'épisode :</span> {title}
                </p>
              ) : (
                <p>Nom de l'épisode : Non précisé</p>
              )}

              {/* Affichage des styles définis */}
              {clientInfos.adjectives.length !== 0 ? (
                <p>
                  Styles :
                  <br />
                  {clientInfos.adjectives.map((elem, index) => {
                    return (
                      <span>
                        {elem} <br />
                      </span>
                    );
                  })}
                </p>
              ) : (
                <p>
                  Style : <span>Non précisé(s)</span>
                </p>
              )}
              {/* Affichage type de voix */}
              <p>
                Type de voix :
                {voice && voice.voiceType ? (
                  <span> {voice.voiceType}</span>
                ) : (
                  <span> Non précisé</span>
                )}
              </p>
              <p>
                Hauteur de voix :
                {voice && voice.voiceHeight ? (
                  <span> {voice.voiceHeight}</span>
                ) : (
                  <span> Non précisée</span>
                )}
              </p>

              <p>
                Tempo :
                {voice && voice.voiceTempo ? (
                  <span> {voice.voiceTempo}</span>
                ) : (
                  <span> Non précisé</span>
                )}
              </p>
              {/* Affichage des options */}
              <div className="options-container">
                <p>
                  Options: <br />
                </p>
                {clientInfos.options.length !== 0 ? (
                  clientInfos.options.map((option, index) => {
                    return (
                      option.status === true && <span>- {option.title}</span>
                    );
                  })
                ) : (
                  <span>aucune option séléctionnée</span>
                )}
              </div>
              <p className="total-checkout">
                Total : <span>{roundAmount} €</span>
              </p>
            </div>
          </div>
          <div className="checkout-form">
            <Elements stripe={stripePromise}>
              <CheckoutForm
                title={title}
                productId={epId}
                amount={amount}
                data={data}
                setData={setData}
              />
            </Elements>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
