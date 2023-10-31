import React, { useState } from "react";
import perguntas from './perguntas';

const Questionario = () => {
    const [nome, setNome] = useState("");
    const [perguntaAtual, setPerguntaAtual] = useState(0);
    const [respostas, setRespostas] = useState([]);
    const [pontuacao, setPontuacao] = useState(0);
    const [jogoFinalizado, setJogoFinalizado] = useState(false);

    const handleClickOpcao = (index) => {
      if (nome.trim() !== "" && !jogoFinalizado) {
        const novaResposta = [...respostas];
        novaResposta[perguntaAtual] = index;
        setRespostas(novaResposta);
        if (perguntaAtual + 1 < perguntas.length) {
          setPerguntaAtual(perguntaAtual + 1);
        } else {
          finalizarJogo(novaResposta);
        }
      }
    };

    const finalizarJogo = (novaResposta) => {
      if (nome.trim() !== "") {
        let pontuacaoFinal = 0;
        for (let i = 0; i < perguntas.length; i++) {
          const respostaSelecionada = novaResposta[i];
          if (respostaSelecionada !== null) {
            const valorResposta = perguntas[i].opcoes[respostaSelecionada].valor;
            if (valorResposta === 10) {
              pontuacaoFinal += 10;
            }
          }
        }
        setPontuacao(pontuacaoFinal);
        setJogoFinalizado(true);
      }
    };

    const reiniciarJogo = () => {
      setNome("");
      setPerguntaAtual(0);
      setRespostas([]);
      setPontuacao(0);
      setJogoFinalizado(false);
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
