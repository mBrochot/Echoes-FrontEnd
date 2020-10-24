import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import UserHeader from "../../components/UserHeader";
import Loader from "../../components/Loader";

const EpisodeRecapPage = ({ setUser }) => {
  const history = useHistory();
  const { episodeId } = useParams();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState("true");

  useEffect(() => {
    const fetchData = async () => {
      const userInfo = Cookies.getJSON("userInfo");
      // const userInfo = JSON.parse(Cookies.get("userInfo"));
      if (userInfo.token) {
        const response = await axios.get(
          `${process.env.REACT_APP_URL}/api/episodes/${episodeId}`,
          {
            headers: { authorization: "Bearer " + userInfo.token },
          }
        );

        setData(response.data);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [episodeId]);

  const handleEdit = (event) => {
    history.push(`/update/${episodeId}`);
  };

  return isLoading ? (
    <Loader></Loader>
  ) : (
    // if status: en attente Echoes >>> Comme brouillon
    // if status : en production >>> le nom de l'episode donné par echoes + le texte par Echoes + la voix selectionnée + l extrait + les travaux dessus
    // if status: terminé >>> name de la voix selectionné + type de voix + le nom de l'episode + le texte transformé par echoes + les travaux techniques sur le recording + le recording
    // if status:brouillon >>> name de la voix si existe / sinon type de voix  + le nom de l'episode donné par le client + son texte + les travaux techninques sur l'episode
    <div className="main-container">
      <UserHeader setUser={setUser} />
      <div className="content-main">
        <div className="hello">
          <h1>Récapitulatif</h1>
        </div>
        <div className="allRecapEpisode">
          <div className="episodeRecapLeftCol">
            <div className="episodeRecapData">
              {(data.status === "3 - En production" ||
                data.status === "4 - En attente validation" ||
                data.status === "5 - Terminé") &&
              data.echoesInfos.nameEchoes ? (
                <>
                  <p className="titleRecap">Nom de l'épisode adapté : </p>
                  <p>{data.echoesInfos.nameEchoes}</p>
                </>
              ) : (
                <>
                  <p className="titleRecap">Nom de l'épisode :</p>
                  <p> {data.clientInfos.name}</p>
                </>
              )}
              <br />
              <br />
              {(data.status === "3 - En production" ||
                data.status === "4 - En attente validation" ||
                data.status === "5 - Terminé") &&
              data.echoesInfos.voiceNameEchoes ? (
                <>
                  <p className="titleRecap">Voix sélectionnée :</p>
                  <p> {data.echoesInfos.voiceNameEchoes}</p>
                </>
              ) : data.clientInfos.voice.voiceName ? (
                <>
                  <p className="titleRecap">Voix selectionnée : </p>
                  <p> {data.clientInfos.voice.voiceName}</p>
                </>
              ) : (
                <div>
                  {(data.clientInfos.voice.voiceType ||
                    data.clientInfos.voice.voiceHeight ||
                    data.clientInfos.voice.voiceTempo) && (
                    <p className="titleRecap">
                      Critères demandés pour la voix :
                    </p>
                  )}

                  <p>{data.clientInfos.voice.voiceType}</p>
                  <p>{data.clientInfos.voice.voiceHeight}</p>
                  <p>{data.clientInfos.voice.voiceTempo}</p>
                </div>
              )}
              <br />
              <div>
                {data.clientInfos.adjectives && (
                  <p className="titleRecap">Votre identité de marque :</p>
                )}
                {data.clientInfos.adjectives &&
                  data.clientInfos.adjectives.map((adjective, index) => {
                    return <p key={index}>{adjective}</p>;
                  })}
              </div>
              {(data.status === "3 - En production" ||
                data.status === "4 - En attente validation" ||
                data.status === "5 - Terminé") &&
              data.echoesInfos.textToTransformEchoes ? (
                <div>
                  <p className="titleRecap"> Texte adapté :</p>
                  <p className="textToTransformStyle">
                    {data.echoesInfos.textToTransformEchoes}
                  </p>
                </div>
              ) : (
                <div>
                  <p className="titleRecap"> Texte :</p>
                  <p className="textToTransformStyle">
                    {data.clientInfos.textToTransform}
                  </p>
                </div>
              )}
              {data.clientInfos.options && (
                <div className="optionsRecap">
                  <p className="titleRecap">Travaux techniques : </p>
                  {data.clientInfos.options.map((option, index) => {
                    return (
                      option.status === true && (
                        <p key={index}>- {option.title}</p>
                      )
                    );
                  })}
                </div>
              )}
              <div className="demo or rec">
                {data.status === "2 - En attente validation" ? (
                  <div>
                    <span className="titleRecap">Extrait :</span>
                    <br />
                    <audio
                      controls
                      src={data.echoesInfos.audioEchoes.extractEchoes}
                    ></audio>
                  </div>
                ) : (
                  data.status === "5 - Terminé" && (
                    <>
                      <div>
                        <p className="titleRecap">Ecouter l'épisode :</p>
                        <br />
                        <audio
                          controls
                          src={data.echoesInfos.audioEchoes.finalEchoes}
                        ></audio>
                      </div>
                    </>
                  )
                )}
              </div>
            </div>
            <div className="editButtonRecap">
              {data.status === "0 - Brouillon" && (
                <button className="btn-60 pink" onClick={handleEdit}>
                  Modifier votre épisode
                </button>
              )}

              {data.status === "2 - En attente validation" && (
                <button
                  className="btn-60 pink"
                  onClick={() => {
                    history.push(`/production/thumbnail/${episodeId}`);
                  }}
                >
                  Faire mon retour sur l'extrait
                </button>
              )}
              {data.status === "4 - En attente validation" && (
                <button
                  className="btn-60 pink"
                  onClick={() => {
                    history.push(`/production/complete/${episodeId}`);
                  }}
                >
                  Faire mon retour sur l'épisode
                </button>
              )}
            </div>
          </div>
          <div className="episodeRecapRightCol">
            <div className="statusProgression">
              <div className="brouillonStep">
                <div
                  className={
                    data.status === "0 - Brouillon"
                      ? "status status-brouillon"
                      : "status status-disabled"
                  }
                >
                  0 - Brouillon
                </div>
              </div>
              {data.status === "0 - Brouillon" ? (
                <p className="descBrouillon descSteps">
                  Vous n'en êtes encore qu'à l'étape d'édition de votre projet.
                  Pour toute question, n'hésitez pas à contacter l'équipe
                  Echoes. Les informations pour nous joindre se trouvent dans la
                  rubrique Contact.
                </p>
              ) : (
                ""
              )}
              <div className="verticalLine">
                <div></div>
                <div></div>
              </div>
              <div className="attenteEchoes">
                <div
                  className={
                    data.status === "1 - En attente Echoes"
                      ? "status status-echoes"
                      : "status status-disabled"
                  }
                >
                  1 - En attente Echoes
                </div>
              </div>
              {data.status === "1 - En attente Echoes" ? (
                <p className="descEchoes descSteps">
                  Echoes traite actuellement votre demande et cherche pour vous
                  sa plus belle voix. Nous reviendrons vers vous dès que
                  possible avec un extrait audio de votre projet.
                </p>
              ) : (
                ""
              )}
              <div className="verticalLine">
                <div></div>
                <div></div>
              </div>
              <div className="attenteValidationExtrait">
                <div
                  className={
                    data.status === "2 - En attente validation"
                      ? "status status-attente-validation"
                      : "status status-disabled"
                  }
                >
                  2 - En attente validation
                </div>
              </div>
              {data.status === "2 - En attente validation" ? (
                <p className="descAttenteValidation descSteps">
                  Nous vous avons envoyé un premier extrait de ce à quoi
                  ressemblera votre podcast. Dites-nous si cela vous convient et
                  nous en informerons nos équipes pour lancer la production.
                </p>
              ) : (
                ""
              )}
              <div className="verticalLine">
                <div></div>
                <div></div>
              </div>
              <div className="enProduction">
                <div
                  className={
                    data.status === "3 - En production"
                      ? "status status-production"
                      : "status status-disabled"
                  }
                >
                  3 - En production
                </div>
              </div>
              {data.status === "3 - En production" ? (
                <p className="descProduction descSteps">
                  L'équipe d'Echoes et ses narrateurs travaillent d'arrache-pied
                  pour produire le podcast de vos rêves. Patience...
                </p>
              ) : (
                ""
              )}
              <div className="verticalLine">
                <div></div>
                <div></div>
              </div>
              <div className="attenteValidationFinal">
                <div
                  className={
                    data.status === "4 - En attente validation"
                      ? "status status-validation-finale"
                      : "status status-disabled"
                  }
                >
                  4 - En attente validation
                </div>
              </div>
              {data.status === "4 - En attente validation" ? (
                <p className="descValidationFinale descSteps">
                  Vous avez reçu la version finale que nous vous proposons. Si
                  celle-ci vous convient, vous pourrez la télécharger. Si non,
                  faîtes le nous savoir pour que nous puissions vous renvoyer un
                  nouveau rendu.
                </p>
              ) : (
                ""
              )}
              <div className="verticalLine">
                <div></div>
                <div></div>
              </div>
              <div className="termine">
                <div
                  className={
                    data.status === "5 - Terminé"
                      ? "status status-termine"
                      : "status status-disabled"
                  }
                >
                  5 - Terminé
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EpisodeRecapPage;
