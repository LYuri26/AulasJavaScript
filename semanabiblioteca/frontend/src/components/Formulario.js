import React, { useState } from "react";

const Questionario = () => {
  const [nome, setNome] = useState("");
  const [pergunta, setPergunta] = useState("Qual é a capital da França?");
  const [opcoes, setOpcoes] = useState([
    { texto: "Nova York", valor: 0 },
    { texto: "Londres", valor: 0 },
    { texto: "Paris", valor: 10 },
    { texto: "Roma", valor: 0 },
  ]);
  const [respostaSelecionada, setRespostaSelecionada] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (respostaSelecionada !== null && nome.trim() !== "") {
      // Enviar os dados para o backend
      fetch("http://localhost:3000/backend/inserir_dados.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `nome=${nome}&pergunta=${pergunta}&opcao=${opcoes[respostaSelecionada].texto}&pontuacao=${opcoes[respostaSelecionada].valor}`,
      })
        .then((response) => response.text())
        .then((data) => {
          console.log(data); // Exibe a resposta do backend
        })
        .catch((error) => console.error("Erro:", error));
    }
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
        <p>{pergunta}</p>
      </div>
      <div>
        {opcoes.map((opcao, index) => (
          <label key={index}>
            <input
              type="radio"
              value={index}
              checked={respostaSelecionada === index}
              onChange={() => setRespostaSelecionada(index)}
            />
            {opcao.texto}
          </label>
        ))}
      </div>
      <button type="submit" disabled={respostaSelecionada === null || nome.trim() === ""}>
        Enviar
      </button>
    </form>
  );
};

export default Questionario;
