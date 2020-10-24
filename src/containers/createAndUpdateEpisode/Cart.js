import React from "react";

const Cart = ({
  totalTextPrice,
  pricePerWord,
  wordsNumber,
  options,
  totalOptionsPrice,
  totalPrice,
  setButtonRedirect,
}) => {
  const tva = totalPrice * 0.2;
  const ttc = totalPrice + tva;

  return (
    <div className="cart">
      <h2>Votre devis</h2>
      <div className="cartTextPrice">
        <div>
          <p>
            Texte de {wordsNumber} {wordsNumber > 1 ? "mots" : "mot"}
          </p>
          <p className="sublineInfo">({pricePerWord}&euro; par mot)</p>
        </div>
        <p>{totalTextPrice.toFixed(2)} &euro;</p>
      </div>
      <div className="cartOptions">
        <div className="cartOptionsPrice">
          <p>Options</p>
          <p>{totalOptionsPrice.toFixed(2)} &euro;</p>
        </div>
        <ul>
          {options.map((elem, index) => {
            let optionItemTotal = 0;
            if (elem.status === true) {
              if (elem.optionsType === "Prix par mot") {
                optionItemTotal = elem.amount * wordsNumber;
              } else {
                optionItemTotal = elem.amount;
              }
              return (
                <li key={index} className="cartOptionItem">
                  <p>- {elem.title}</p>
                  <p>{optionItemTotal} &euro;</p>
                </li>
              );
            } else {
              return "";
            }
          })}
        </ul>
      </div>
      <div className="tvaAndTtc">
        <div className="tva">
          <p>TVA</p>
          <p>{tva.toFixed(2)} &euro;</p>
        </div>
        <div className="ttc">
          <p>Total TTC</p>
          <p>{ttc.toFixed(2)} &euro;</p>
        </div>
      </div>
      <div className="ht">
        <p> Total HT</p>

        <p>{totalPrice.toFixed(2)} &euro;</p>
      </div>
      <br />
      <div className="buttons">
        <button
          className="btn-60 pink orderButton"
          onClick={() => {
            setButtonRedirect("checkout");
            // setEpisodeStatus("0 - En attente de paiement");
          }}
          type="submit"
        >
          Commander l'épisode
        </button>

        <button
          className="btn-60 dark-grey orderButton"
          onClick={() => {
            setButtonRedirect("episodes");
            // setEpisodeStatus("0 - Brouillon");
          }}
          type="submit"
        >
          Enregistrer comme brouillon
        </button>
      </div>
    </div>
  );
};

export default Cart;
