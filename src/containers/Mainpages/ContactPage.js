import React, { useState } from "react";
import emailjs from "emailjs-com";
import { useHistory } from "react-router-dom";
import UserHeader from "../../components/UserHeader";

export const ContactPage = ({ setUser }) => {
  // States
  const [name, setName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [isSend, setIsSend] = useState(false);

  const history = useHistory();

  // Fonction changement état formulaire
  const sendEmail = (e) => {
    e.preventDefault();

    // EmailJS
    emailjs
      .sendForm(
        "echoes_mvp",
        "formulaire_de_contact",
        e.target,
        "user_aRcukPbxmZtI7872Jig6S"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );

    setIsSend(true);
    setTimeout(() => {
      history.push("/dashboard");
    }, 2000);
  };

  const handleNameChange = (event) => {
    const value = event.target.value;
    setName(value);
  };

  const handleFirstNameChange = (event) => {
    const value = event.target.value;
    setFirstName(value);
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  const handleDescriptionChange = (event) => {
    const value = event.target.value;
    setDescription(value);
  };

  return (
    <div className="main-container">
      <UserHeader setUser={setUser} />
      <div className="content-main">
        <div className="hello">
          <h1>Nous contacter</h1>
        </div>
        <div className="contact-container">
          <div className="contact">
            <h2>
              Il y a un projet pour tous les besoins
              <br /> et tous les budgets.
            </h2>
            <br />
            <br />

            <span>Contactez nous :</span>
            <br />
            <p>
              <span>Par téléphone:</span> <br /> +33 6 66 44 50 56
            </p>
            <br />
            <p>
              <span>Par email</span> <br />
              <a
                href="mailto:hello@echoes.studio"
                style={{ color: "var(--turquoise)", fontWeight: "bold" }}
              >
                hello@echoes.studio
              </a>
            </p>
            <br />
            <p>
              ...Ou rendez-vous sur{" "}
              <a
                href="https://echoes.studio/"
                style={{ color: "var(--pink)", fontWeight: "bold" }}
              >
                Echoes Studio
              </a>{" "}
              pour prendre rendez-vous.
            </p>
          </div>

          <div className="formulaire-contact">
            <form onSubmit={sendEmail}>
              <div>
                <input
                  placeholder="Nom"
                  required
                  type="texte"
                  name="name"
                  value={name}
                  onChange={handleNameChange}
                ></input>
              </div>
              <div>
                <input
                  placeholder="Prénom"
                  required
                  type="texte"
                  name="firstName"
                  value={firstName}
                  onChange={handleFirstNameChange}
                ></input>
              </div>
              <div>
                <input
                  placeholder="Email"
                  required
                  type="texte"
                  name="email"
                  value={email}
                  onChange={handleEmailChange}
                ></input>
              </div>
              <div>
                <textarea
                  placeholder="Entrez votre message ici"
                  required
                  cols={10}
                  rows={5}
                  type="texte"
                  name="description"
                  value={description}
                  onChange={handleDescriptionChange}
                ></textarea>
              </div>
              {isSend ? (
                <div className="redirectTo">
                  Formulaire envoyé! Redirection 3 secondes
                </div>
              ) : (
                <button className="btn-60 pink" type="submit" value="Send">
                  Envoyer
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
