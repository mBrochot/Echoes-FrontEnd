import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import wordsCount from "words-count";

import Cart from "./Cart";
import TextToTransformElement from "./TextToTransformElement";
import Loader from "../../components/Loader";
import OrderOptions from "./OrderOptions";
import UserHeader from "../../components/UserHeader";

const UpdateDraft = ({ setUser }) => {
  const history = useHistory();
  const { episodeId } = useParams();
  const [pricings, setPricings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const userInfo = Cookies.getJSON("userInfo");

  // DECLARATION DES CHAMPS
  const [episodeCommand] = useState({});
  const [episodeStatus, setEpisodeStatus] = useState("");
  const [episodeName, setEpisodeName] = useState("");
  const [voiceFound, setVoiceFound] = useState(undefined);
  const [voiceName, setVoiceName] = useState("");
  const [voiceType, setVoiceType] = useState("");
  const [voiceHeight, setVoiceHeight] = useState("");
  const [voiceTempo, setVoiceTempo] = useState("");
  const [commentsOrder, setCommentsOrder] = useState("");
  const [options, setOptions] = useState([]);
  const [totalOptionsPrice, setTotalOptionsPrice] = useState(0);
  const [textToTransform, setTextToTransform] = useState("");
  const [wordsNumber, setWordsNumber] = useState(0);
  const [pricePerWord, setPricePerWord] = useState(0);
  const [totalTextPrice, setTotalTextPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [buttonRedirect, setButtonRedirect] = useState("");

  const [
    sliderTraditionnelleModerne,
    setSliderTraditionnelleModerne,
  ] = useState(2);
  const [sliderMatureJeune, setSliderMatureJeune] = useState(2);
  const [sliderDiscountLuxueuse, setSliderDiscountLuxueuse] = useState(2);
  const [sliderDecaleeSerieuse, setSliderDecaleeSerieuse] = useState(2);

  // Fonction pour trier les valeurs de pricing du plus petit au plus grand (nbInfMots)
  function sortByKey(array, key) {
    return array.sort(function (a, b) {
      var x = a[key];
      var y = b[key];
      return x < y ? -1 : x > y ? 1 : 0;
    });
  }

  // Fonction pour compter les mots
  const wordCount = (str) => {
    if (str) {
      return wordsCount(str);
    } else {
      return 0;
    }
  };

  useEffect(() => {
    const getCookie = Cookies.getJSON("userInfo");
    const token = getCookie.token;

    // Recupére la data concernant l'épisode s'il a déjà été enregistré en brouillon avant
    const fetchData = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_URL}/api/episodes/draft/${episodeId}`,
        {
          headers: { authorization: "Bearer " + token },
        }
      );

      const data = response.data;
      const clientInfos = response.data.clientInfos;
      setEpisodeStatus(data.status);
      setEpisodeName(clientInfos.name);
      !clientInfos.voice.voiceName ? setVoiceFound(false) : setVoiceFound(true);
      setVoiceName(clientInfos.voice.voiceName);
      setVoiceType(clientInfos.voice.voiceType);
      setVoiceHeight(clientInfos.voice.voiceHeight);
      setVoiceTempo(clientInfos.voice.voiceTempo);
      setCommentsOrder(clientInfos.comments.commentsOrder);
      setOptions(clientInfos.options);
      clientInfos.adjectives.map((elem) => {
        return elem === "Traditionnelle"
          ? setSliderTraditionnelleModerne(1)
          : elem === "Moderne"
          ? setSliderTraditionnelleModerne(3)
          : elem === "Mature"
          ? setSliderMatureJeune(1)
          : elem === "Jeune"
          ? setSliderMatureJeune(3)
          : elem === "Discount"
          ? setSliderDiscountLuxueuse(1)
          : elem === "Luxueuse"
          ? setSliderDiscountLuxueuse(3)
          : elem === "Décalée"
          ? setSliderDecaleeSerieuse(1)
          : elem === "Sérieuse" && setSliderDecaleeSerieuse(3);
      });

      setTextToTransform(clientInfos.textToTransform);
      setIsLoading(false);
    };

    fetchData();
  }, [episodeId]);

  useEffect(() => {
    // Recupère le pricing et options dans la database
    const fetchPricings = async () => {
      const pricingsBdd = await axios.get(
        `${process.env.REACT_APP_URL}/api/pricings`
      );
      setPricings(sortByKey(pricingsBdd.data, "nbMotsInf"));
      setIsLoading(false);
    };

    fetchPricings();
  }, []);

  useEffect(() => {
    setWordsNumber(wordCount(textToTransform));
    for (let i = 0; i < pricings.length; i++) {
      if (
        wordsNumber >= pricings[i].nbMotsInf &&
        wordsNumber <= pricings[i].nbMotsSup
      ) {
        setPricePerWord(pricings[i].amount);
        setTotalTextPrice(pricings[i].amount * wordCount(textToTransform));
      }
    }
  }, [textToTransform, pricings, wordsNumber]);

  useEffect(() => {
    let optionPrice = 0;
    for (let i = 0; i < options.length; i++) {
      if (options[i].status === true) {
        if (options[i].optionsType === "Prix par mot") {
          optionPrice = optionPrice + wordsNumber * options[i].amount;
        } else {
          optionPrice = optionPrice + options[i].amount;
        }
      }
    }
    setTotalOptionsPrice(optionPrice);
    setTotalPrice(totalTextPrice + optionPrice);
  }, [options, wordsNumber, totalTextPrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const adjectives = [];

    if (sliderTraditionnelleModerne < 2) {
      adjectives.push("Traditionnelle");
    } else if (sliderTraditionnelleModerne > 2) {
      adjectives.push("Moderne");
    }
    if (sliderMatureJeune < 2) {
      adjectives.push("Mature");
    } else if (sliderMatureJeune > 2) {
      adjectives.push("Jeune");
    }
    if (sliderDiscountLuxueuse < 2) {
      adjectives.push("Discount");
    } else if (sliderDiscountLuxueuse > 2) {
      adjectives.push("Luxueuse");
    }
    if (sliderDecaleeSerieuse < 2) {
      adjectives.push("Décalée");
    } else if (sliderDecaleeSerieuse > 2) {
      adjectives.push("Sérieuse");
    }

    try {
      episodeCommand.status = episodeStatus;
      episodeCommand.clientInfos = {
        name: episodeName,
        voice: {
          voiceName: voiceName,
          voiceType: voiceType,
          voiceHeight: voiceHeight,
          voiceTempo: voiceTempo,
        },
        adjectives: adjectives,
        options: options,
        textToTransform: textToTransform,
        comments: { commentsOrder: commentsOrder },
      };

      const response = await axios.post(
        `${process.env.REACT_APP_URL}/api/episodes/update/${episodeId}`,
        episodeCommand,
        {
          headers: { authorization: "Bearer " + userInfo.token },
        }
      );

      history.push(`/${buttonRedirect}`, {
        epId: response.data._id,
      });
    } catch (error) {
      alert(error);
    }
  };

  return isLoading ? (
    <Loader></Loader>
  ) : (
    <div className="main-container">
      <UserHeader setUser={setUser} />
      <div className="content-main">
        <div className="hello">
          <h1>Modifier mon épisode</h1>
        </div>

        <form className="orderPage" onSubmit={handleSubmit}>
          <div className="orderEpisodeInfos">
            <div className="episodeDesc">
              <p>Nom de l'épisode *</p>
              <input
                type="text"
                name="name"
                required
                value={episodeName}
                onChange={(event) => {
                  setEpisodeName(event.target.value);
                }}
              />
              <br />
              <br />
              <div className="voiceChoice">
                <p>Avez-vous déjà trouvé votre voix?*</p>
                <br />
                <label>
                  <input
                    type="radio"
                    name="voiceFound"
                    checked={voiceFound === true && "checked"}
                    onChange={(event) => setVoiceFound(true)}
                    required
                  />
                  Oui
                </label>
                <label>
                  <input
                    type="radio"
                    name="voiceFound"
                    checked={voiceFound === false && "checked"}
                    value={voiceFound}
                    onChange={(event) => setVoiceFound(false)}
                  />
                  Non
                </label>
              </div>

              {voiceFound === true ? (
                <div className="voiceIsFound">
                  <p>Indiquez son nom ici:</p>
                  <input
                    type="text"
                    value={voiceName}
                    onChange={(event) => {
                      setVoiceName(event.target.value);
                    }}
                  ></input>
                </div>
              ) : (
                voiceFound === false && (
                  <div className="voiceNotFound">
                    <div>
                      <br />

                      <p>
                        Indiquez vos préférences afin que nous trouvions la voix
                        parfaite pour votre projet
                      </p>
                      <br />
                    </div>

                    <div className="voiceInfos">
                      <label>
                        <p> Type de voix*</p>
                        <select
                          value={voiceType}
                          selected={voiceType}
                          onChange={(event) => {
                            setVoiceType(event.target.value);
                          }}
                        >
                          <option value="Masculine">Masculine</option>
                          <option value="Féminine">Féminine</option>
                          <option value="Indifférent">Indifférent</option>
                        </select>
                      </label>

                      <label>
                        <p>Hauteur*</p>
                        <select
                          value={voiceHeight}
                          onChange={(event) => {
                            setVoiceHeight(event.target.value);
                          }}
                        >
                          <option value="Aigu">Aigu</option>
                          <option value="Moyenne">Moyenne</option>
                          <option value="Grave">Grave</option>
                          <option value="Très grave">Très grave</option>
                          <option value="Indifférent">Indifférent</option>
                        </select>
                      </label>

                      <label>
                        <p>Tempo*</p>
                        <select
                          value={voiceTempo}
                          selected={voiceTempo}
                          onChange={(event) => {
                            setVoiceTempo(event.target.value);
                          }}
                        >
                          <option value="Posé">Posé</option>
                          <option value="Dynamique">Dynamique</option>
                        </select>
                      </label>
                    </div>
                  </div>
                )
              )}
              <br />
              <br />

              <p>
                Adjectifs révélateurs de votre identité de marque (minimum 1)*
              </p>
              <br />
              <div className="sliderBlock">
                <div className="sliderLabel">
                  <p>Traditionnelle</p>
                </div>
                <div className="sliderBar">
                  <Slider
                    value={sliderTraditionnelleModerne}
                    min={1}
                    max={3}
                    step={1}
                    trackStyle={{ display: "none" }}
                    onChange={(event) => setSliderTraditionnelleModerne(event)}
                  ></Slider>
                </div>
                <div className="sliderLabelRight">
                  <p>Moderne</p>
                </div>
              </div>
              <br />
              <div className="sliderBlock">
                <div className="sliderLabel">
                  <p>Mature</p>
                </div>
                <div className="sliderBar">
                  <Slider
                    value={sliderMatureJeune}
                    min={1}
                    max={3}
                    step={1}
                    trackStyle={{ display: "none" }}
                    onChange={(event) => setSliderMatureJeune(event)}
                  ></Slider>
                </div>
                <div className="sliderLabelRight">
                  <p>Jeune</p>
                </div>
              </div>
              <br />
              <div className="sliderBlock">
                <div className="sliderLabel">
                  <p>Discount</p>
                </div>
                <div className="sliderBar">
                  <Slider
                    value={sliderDiscountLuxueuse}
                    min={1}
                    max={3}
                    step={1}
                    trackStyle={{ display: "none" }}
                    onChange={(event) => setSliderDiscountLuxueuse(event)}
                  ></Slider>
                </div>
                <div className="sliderLabelRight">
                  <p>Luxueuse</p>
                </div>
              </div>
              <br />
              <div className="sliderBlock">
                <div className="sliderLabel">
                  <p>Décalée</p>
                </div>
                <div className="sliderBar">
                  <Slider
                    value={sliderDecaleeSerieuse}
                    min={1}
                    max={3}
                    step={1}
                    trackStyle={{ display: "none" }}
                    onChange={(event) => setSliderDecaleeSerieuse(event)}
                  ></Slider>
                </div>
                <div className="sliderLabelRight">
                  <p>Sérieuse</p>
                </div>
              </div>
              <br />
              <br />
              <br />
              <div>
                <p> Notes au producteur et/ou au narrateur</p>
                <textarea
                  name="commentsOrder"
                  rows={4}
                  cols={50}
                  value={commentsOrder}
                  onChange={(event) => {
                    setCommentsOrder(event.target.value);
                  }}
                />
              </div>
            </div>

            <OrderOptions
              options={options}
              setOptions={setOptions}
            ></OrderOptions>

            <TextToTransformElement
              textToTransform={textToTransform}
              setTextToTransform={setTextToTransform}
              wordsNumber={wordsNumber}
            ></TextToTransformElement>
          </div>

          <div className="orderCart">
            <Cart
              totalTextPrice={totalTextPrice}
              pricePerWord={pricePerWord}
              wordsNumber={wordsNumber}
              totalOptionsPrice={totalOptionsPrice}
              options={options}
              totalPrice={totalPrice}
              setEpisodeStatus={setEpisodeStatus}
              setButtonRedirect={setButtonRedirect}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateDraft;
