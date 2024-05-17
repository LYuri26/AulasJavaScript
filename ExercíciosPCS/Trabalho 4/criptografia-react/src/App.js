import React, { useState } from "react";
import { criptografar } from "./script";
import './App.css';

// Componente funcional App
function App() {
  // Definição dos estados utilizando o Hook useState
  const [chave1, setChave1] = useState("");
  const [chave2, setChave2] = useState("");
  const [chave3, setChave3] = useState("");
  const [chave4, setChave4] = useState("");
  const [texto, setTexto] = useState("");
  const [matrizCriptografada, setMatrizCriptografada] = useState([]);

  // Função para lidar com a ação de criptografar
  const handleCriptografar = () => {
    // Chama a função de criptografar definida em 'script.js', passando os valores dos estados como parâmetros
    const result = criptografar(
      parseInt(chave1),
      parseInt(chave2),
      parseInt(chave3),
      parseInt(chave4),
      texto
    );
    // Atualiza o estado da matriz criptografada com o resultado da criptografia
    setMatrizCriptografada(result);
  };

  // Componente retornando o layout da aplicação
  return (
    <div className="container">
      <h1>Criptografia</h1>
      <form>
        <label htmlFor="texto">Texto (máximo 40 caracteres):</label>
        {/* Input para inserção do texto, com onChange para atualizar o estado 'texto' */}
        <input
          type="text"
          id="texto"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          maxLength="40"
          required
        />

        {/* Inputs para inserção dos números da chave, cada um com seu respectivo estado e onChange */}
        <div className="matrizChave">
          <label htmlFor="numero1">Número 1:</label>
          <input
            type="number"
            id="numero1"
            value={chave1}
            onChange={(e) => setChave1(e.target.value)}
            required
          />
          <label htmlFor="numero2">Número 2:</label>
          <input
            type="number"
            id="numero2"
            value={chave2}
            onChange={(e) => setChave2(e.target.value)}
            required
          />
          <label htmlFor="numero3">Número 3:</label>
          <input
            type="number"
            id="numero3"
            value={chave3}
            onChange={(e) => setChave3(e.target.value)}
            required
          />
          <label htmlFor="numero4">Número 4:</label>
          <input
            type="number"
            id="numero4"
            value={chave4}
            onChange={(e) => setChave4(e.target.value)}
            required
          />
        </div>

        {/* Botão para acionar a função de criptografar ao ser clicado */}
        <button type="button" onClick={handleCriptografar}>
          Criptografar
        </button>
      </form>

      {/* Exibição da matriz criptografada, caso exista */}
      <div id="resultado">
        {matrizCriptografada.length > 0 && (
          <table className="matriz">
            {matrizCriptografada.map((linha, index) => (
              <tr key={index}>
                {linha.map((celula, idx) => (
                  <td key={idx}>{celula}</td>
                ))}
              </tr>
            ))}
          </table>
        )}
      </div>
    </div>
  );
}

// Exporta o componente App para ser utilizado em outros arquivos
export default App;
