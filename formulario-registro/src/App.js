import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./App.css";
import axios from "axios";

function App() {
  const [formData, setFormData] = useState({
    nome: "",
    idade: "",
    sexo: "",
    dataNascimento: "",
    rua: "",
    bairro: "",
    estado: "",
    email: "",
  });

  const [mensagem, setMensagem] = useState(null); // Adicionado estado para mensagem

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/register", formData)
      .then((response) => {
        console.log("Dados enviados com sucesso!", response);
        setMensagem("Dados Registrados"); // Exibe a mensagem
        setTimeout(() => {
          setMensagem(null); // Remove a mensagem após 5 segundos
        }, 5000);
      })
      .catch((error) => {
        console.error("Erro ao enviar os dados:", error);
      });
  };

  const estadosBrasil = [
    "AC",
    "AL",
    "AP",
    "AM",
    "BA",
    "CE",
    "DF",
    "ES",
    "GO",
    "MA",
    "MT",
    "MS",
    "MG",
    "PA",
    "PB",
    "PR",
    "PE",
    "PI",
    "RJ",
    "RN",
    "RS",
    "RO",
    "RR",
    "SC",
    "SP",
    "SE",
    "TO",
  ];

  return (
    <div>
      {mensagem && <div className="mensagem">{mensagem}</div>}{" "}
      {/* Exibe a mensagem */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Idade:</label>
          <input
            type="text"
            name="idade"
            value={formData.idade}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Sexo:</label>
          <input
            type="text"
            name="sexo"
            value={formData.sexo}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Data de Nascimento:</label>
          <input
            type="date"
            name="dataNascimento"
            value={formData.dataNascimento}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Rua:</label>
          <input
            type="text"
            name="rua"
            value={formData.rua}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Bairro:</label>
          <input
            type="text"
            name="bairro"
            value={formData.bairro}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Estado:</label>
          <select name="estado" value={formData.estado} onChange={handleChange}>
            <option value="">Selecione...</option>
            {estadosBrasil.map((estado) => (
              <option key={estado} value={estado}>
                {estado}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}

export default App;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
