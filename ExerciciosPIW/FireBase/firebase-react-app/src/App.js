// src/App.js
import React from "react";
import "./style.css"; // Importando o arquivo de estilo
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";

function App() {
  return (
    <div className="App">
      <h1>Projeto de Cadastro de Usuários</h1>
      <UserForm />
      <UserList />
    </div>
  );
}

export default App;
