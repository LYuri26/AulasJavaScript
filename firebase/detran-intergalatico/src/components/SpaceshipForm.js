// src/components/SpaceshipForm.js
import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

const SpaceshipForm = () => {
  const [name, setName] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [status, setStatus] = useState("Em investigação");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name && model && year) {
      try {
        await addDoc(collection(db, "spaceships"), {
          name: name,
          model: model,
          year: year,
          status: status,
        });
        setMessage("Espaçonave cadastrada com sucesso!");
        setName("");
        setModel("");
        setYear("");
      } catch (e) {
        setMessage("Erro ao cadastrar espaçonave: " + e.message);
      }
    } else {
      setMessage("Por favor, preencha todos os campos.");
    }
  };

  return (
    <div>
      <h2>Cadastro de Espaçonave Apreendida</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome da Nave:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Modelo:</label>
          <input
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Ano de Apreensão:</label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Status:</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Em investigação">Em investigação</option>
            <option value="Liberada">Liberada</option>
          </select>
        </div>
        <button type="submit">Cadastrar</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SpaceshipForm;
