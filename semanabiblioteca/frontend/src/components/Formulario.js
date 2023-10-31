import React, { useState } from "react";

const Questionario = () => {
  const [nome, setNome] = useState("");
  const [perguntas, setPerguntas] = useState([
    {
      pergunta: "Qual é a capital da França?",
      opcoes: [
        { texto: "Nova York", valor: 0 },
        { texto: "Londres", valor: 0 },
        { texto: "Paris", valor: 10 },
        { texto: "Roma", valor: 0 },
      ],
    },
    {
      pergunta: "Qual é a capital da Alemanha?",
      opcoes: [
        { texto: "Madrid", valor: 0 },
        { texto: "Berlim", valor: 10 },
        { texto: "Lisboa", valor: 0 },
        { texto: "Viena", valor: 0 },
      ],
    },
  ]);
  const [perguntaAtual, setPerguntaAtual] = useState(0);
  const [respostas, setRespostas] = useState(Array(perguntas.length).fill(null));
  const [jogoFinalizado, setJogoFinalizado] = useState(false);
  const [pontuacao, setPontuacao] = useState(0); // Adicionei a variável de pontuação

  const handleClickOpcao = (index) => {
    if (nome.trim() !== "" && !jogoFinalizado) {
      const novasRespostas = [...respostas];
      novasRespostas[perguntaAtual] = index;
      setRespostas(novasRespostas);

      if (perguntaAtual + 1 < perguntas.length) {
        setPerguntaAtual(perguntaAtual + 1);
      } else {
        finalizarJogo(novasRespostas);
      }
    }
  };

  const finalizarJogo = (novasRespostas) => {
    if (nome.trim() !== "") {
      let pontuacaoFinal = 0;

      // Soma os valores das respostas corretas
      for (let i = 0; i < perguntas.length; i++) {
        const respostaSelecionada = novasRespostas[i];
        if (respostaSelecionada !== null) {
          const valorResposta = perguntas[i].opcoes[respostaSelecionada].valor;
          if (valorResposta === 10) {
            pontuacaoFinal += 10;
          }
        }
      }

      // Enviar os dados para o backend
      fetch("http://localhost:3000/backend/inserir_dados.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `nome=${nome}&pontuacao=${pontuacaoFinal}`,
      })
        .then((response) => response.text())
        .then((data) => {
          console.log(data); // Exibe a resposta do backend
        })
        .catch((error) => console.error("Erro:", error));

      // Jogo finalizado
      setJogoFinalizado(true);

      // Atualiza a pontuação
      setPontuacao(pontuacaoFinal);
    }
  };

  const reiniciarJogo = () => {
    setPerguntaAtual(0);
    setRespostas(Array(perguntas.length).fill(null));
    setNome("");
    setJogoFinalizado(false);
    setPontuacao(0); // Zera a pontuação ao reiniciar o jogo
  };

  return (
    <form>
      {jogoFinalizado ? (
        <div>
          <h2>Jogo Finalizado!</h2>
          <p>Pontuação Total: {pontuacao}</p>
          <button type="button" onClick={reiniciarJogo}>
            Voltar ao Início
          </button>
        </div>
      ) : (
        <div>
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
          {perguntaAtual < perguntas.length && (
            <div>
              <p>{perguntas[perguntaAtual].pergunta}</p>
              <div>
                {perguntas[perguntaAtual].opcoes.map((opcao, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleClickOpcao(index)}
                    style={{
                      backgroundColor:
                        respostas[perguntaAtual] === index ? "#4CAF50" : "#ffffff",
                    }}
                  >
                    {opcao.texto}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </form>
  );
};

export default Questionario;
