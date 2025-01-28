// src/components/UserForm.js
import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore"; // Para adicionar documentos no Firestore
import { db } from "../firebaseConfig"; // Importando a configuração do Firebase

const UserForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name && email) {
      try {
        // Referência à coleção 'users' no Firestore
        const docRef = await addDoc(collection(db, "users"), {
          name: name,
          email: email,
        });
        setMessage("Usuário cadastrado com sucesso!");
        setName("");
        setEmail("");
      } catch (e) {
        setMessage("Erro ao cadastrar usuário: " + e.message);
      }
    } else {
      setMessage("Por favor, preencha todos os campos.");
    }
  };

  return (
    <div>
      <h2>Cadastro de Usuário</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Digite seu nome"
            required
          />
        </div>
        <div>
          <label>E-mail:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu e-mail"
            required
          />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UserForm;
