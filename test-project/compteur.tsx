import React, { useState } from "react";

const Compteur = ({ debut = 0 }) => {
  const [compte, setCompte] = useState(debut);

  return (
    <div
      style={{ padding: "10px", border: "1px solid blue", borderRadius: "5px" }}
    >
      <p>Le compte actuel est : **{compte}**</p>
      <button onClick={() => setCompte((c) => c + 1)}>Incrémenter</button>
      <button onClick={() => setCompte(0)} style={{ marginLeft: "10px" }}>
        Réinitialiser
      </button>
    </div>
  );
};

export default Compteur;
