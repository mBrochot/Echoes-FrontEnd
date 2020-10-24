import React from "react";
import UserHeader from "../../components/UserHeader";

const FacturationPage = ({ setUser }) => {
  return (
    <div className="main-container">
      <UserHeader setUser={setUser} />
      <h1>Facturation</h1>
    </div>
  );
};

export default FacturationPage;
