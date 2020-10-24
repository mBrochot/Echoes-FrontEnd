import React, { useState } from "react";
import "./App.css";

// React-router
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Cookies
import Cookies from "js-cookie";

// Fontawsome
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faEye,
  faEyeSlash,
  faBell,
  faTrash,
  faDownload,
  faCheck,
  faCheckCircle,
  faTimesCircle,
  faEdit,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";

// Imports des composants //
import Header from "./components/Header";
import Footer from "./components/Footer";

// Imports des containers
// ------------------------------
// Identification
import LoginPage from "./containers/Identification/LoginPage";
import SignupPage from "./containers/Identification/SignupPage";
import AccountPage from "./containers/Identification/AccountPage";
import ForgotPasswordPage from "./containers/Identification/ForgotPasswordPage";
import ResetPasswordPage from "./containers/Identification/ResetPasswordPage";
import Modal from "./containers/Identification/Modal";
// Main pages
import ContactPage from "./containers/Mainpages/ContactPage";
import DashboardPage from "./containers/Mainpages/DashboardPage";
import FacturationPage from "./containers/Mainpages/FacturationPage";
// import InspirationPage from "./containers/Mainpages/InspirationPage";
import EpisodesPage from "./containers/Mainpages/EpisodesPage";
import UpdateDraft from "./containers/createAndUpdateEpisode/UpdateDraft";
import CreateEpisode from "./containers/createAndUpdateEpisode/CreateEpisode";
import ProductionPage from "./containers/Mainpages/ProductionPage";
// Paiement et devis
import CheckoutPage from "./containers/Paiement/CheckoutPage";
// import CheckoutForm from "./containers/Paiement/CheckoutForm";

// Pages secondaire
import EpisodesTypeChoicePage from "./containers/Pages-secondaires/EpisodesTypeChoicePage";
import DownloadPage from "./containers/Pages-secondaires/DownloadPage";
import TailorMadeFormPage from "./containers/Pages-secondaires/TailorMadeFormPage";
import EpisodeRecapPage from "./containers/Pages-secondaires/EpisodeRecap";

library.add(
  faEye,
  faEyeSlash,
  faBell,
  faTrash,
  faDownload,
  faCheck,
  faCheckCircle,
  faTimesCircle,
  faEdit,
  faAngleDown
);

function App() {
  let token;
  Cookies.get("userInfo") &&
    (token = JSON.parse(Cookies.get("userInfo")).token);
  const [user, setUser] = useState(null || token);

  // Update Account
  const [identity, setIdentity] = useState();
  const [name, setName] = useState();
  const [firstName, setFirstName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [newPassword, setNewPassword] = useState();
  const [confirmNewPassword, setConfirmNewPassword] = useState();
  const [companyName, setCompanyName] = useState();
  const [job, setJob] = useState();
  const [siret, setSiret] = useState();
  const [tva, setTva] = useState();
  const [street, setStreet] = useState();
  const [postalCode, setPostalCode] = useState();
  const [city, setCity] = useState();
  const [disabled, setdisabled] = useState(true);
  const [hide, setHide] = useState(true);
  const [erase, setErase] = useState(false);
  const [modal, setModal] = useState(false);

  return (
    <div id="App" className={!modal ? "App" : "AppFixed"}>
      <Router>
        {!user ? <div></div> : <Header />}

        <Switch>
          {/* Account */}
          <Route path="/account">
            <AccountPage
              user={user}
              setUser={setUser}
              hide={hide}
              setHide={setHide}
              modal={modal}
              setModal={setModal}
              disabled={disabled}
              setdisabled={setdisabled}
              erase={erase}
              setErase={setErase}
              identity={identity}
              setIdentity={setIdentity}
              name={name}
              setName={setName}
              firstName={firstName}
              setFirstName={setFirstName}
              email={email}
              setEmail={setEmail}
              phone={phone}
              setPhone={setPhone}
              newPassword={newPassword}
              setNewPassword={setNewPassword}
              confirmNewPassword={confirmNewPassword}
              setConfirmNewPassword={setConfirmNewPassword}
              companyName={companyName}
              setCompanyName={setCompanyName}
              job={job}
              setJob={setJob}
              siret={siret}
              setSiret={setSiret}
              tva={tva}
              setTva={setTva}
              street={street}
              setStreet={setStreet}
              postalCode={postalCode}
              setPostalCode={setPostalCode}
              city={city}
              setCity={setCity}
            />
          </Route>
          {/* ForgotPassword */}
          <Route path="/forgotpassword">
            <ForgotPasswordPage />
          </Route>
          {/* ResetPassword */}
          <Route path="/resetpassword/:resetToken">
            <ResetPasswordPage />
          </Route>
          {/* Dashboard */}
          <Route path="/dashboard">
            <DashboardPage setUser={setUser} />
          </Route>
          {/* Choix entre épisode ou Tailor */}
          <Route path="/order">
            <EpisodesTypeChoicePage setUser={setUser} />
          </Route>
          {/* Formulaire TailorMade */}
          <Route path="/tailormade">
            <TailorMadeFormPage />
          </Route>
          {/* Épisodes */}
          <Route path="/episodes">
            <EpisodesPage setUser={setUser} />
          </Route>
          {/* Facturation */}
          <Route path="/facturation">
            <FacturationPage setUser={setUser} />
          </Route>
          {/* Edit Order */}
          <Route path="/update/:episodeId">
            <UpdateDraft />
          </Route>
          {/* Order */}
          <Route path="/createEpisode">
            <CreateEpisode setUser={setUser} />
          </Route>
          {/* Suivi de production2 */}
          <Route path="/production/complete/:episodeId">
            <DownloadPage setUser={setUser} />
          </Route>
          {/* Suivi de production */}
          <Route path="/production/thumbnail/:episodeId">
            <ProductionPage setUser={setUser} />
          </Route>
          {/* Suivi de production - Recap*/}
          <Route path="/production/recap/:episodeId">
            <EpisodeRecapPage />
          </Route>
          {/* Contact */}
          <Route path="/contact">
            <ContactPage setUser={setUser} />
          </Route>
          {/* CheckOut */}
          <Route path="/checkout">
            {(props) => <CheckoutPage {...props} />}
            {/* <CheckoutPage /> */}
          </Route>
          {/* Signup */}
          <Route path="/signup">
            <SignupPage setUser={setUser} />
          </Route>
          {/* Login */}
          <Route path="/">
            {!user ? (
              <LoginPage setUser={setUser} />
            ) : (
              <DashboardPage setUser={setUser} />
            )}
          </Route>
        </Switch>
        <Footer />
        {modal && (
          <Modal
            hide={hide}
            setHide={setHide}
            modal={modal}
            setModal={setModal}
            disabled={disabled}
            setdisabled={setdisabled}
            erase={erase}
            setErase={setErase}
            identity={identity}
            name={name}
            firstName={firstName}
            email={email}
            phone={phone}
            newPassword={newPassword}
            confirmNewPassword={confirmNewPassword}
            companyName={companyName}
            job={job}
            siret={siret}
            tva={tva}
            street={street}
            postalCode={postalCode}
            city={city}
          />
        )}
      </Router>
    </div>
  );
}

export default App;
