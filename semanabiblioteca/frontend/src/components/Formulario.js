import React, { useState } from "react";

const Formulario = () => {
  const [nome, setNome] = useState("");
  const [pontuacao, setPontuacao] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Enviar os dados para o backend
    fetch("http://localhost:3000/backend/inserir_dados.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `nome=${nome}&pontuacao=${pontuacao}`,
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data); // Exibe a resposta do backend
      })
      .catch((error) => console.error("Erro:", error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Nome:
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Pontuação:
          <input
            type="number"
            value={pontuacao}
            onChange={(e) => setPontuacao(e.target.value)}
          />
        </label>
      </div>
      <button type="submit">Enviar</button>
    </form>
  );
};

export default Formulario;
