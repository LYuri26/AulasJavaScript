import React, { useState } from "react";
import axios from "axios";
import "./ConversorDeMoedas.css";

function ConversorDeMoedas() {
  // Estados para armazenar o valor, as moedas de origem e destino, e o resultado da conversão
  const [valor, setValor] = useState("");
  const [moedaOrigem, setMoedaOrigem] = useState("USD");
  const [moedaDestino, setMoedaDestino] = useState("BRL");
  const [resultado, setResultado] = useState("");

  // Objeto contendo os símbolos das moedas
  const simbolosMoedas = {
    USD: "$", // Dólar Americano
    EUR: "€", // Euro
    BRL: "R$", // Real Brasileiro
    GBP: "£", // Libra Esterlina
    JPY: "¥", // Iene Japonês
    // Adicione mais símbolos conforme necessário
  };

  // Função para converter a moeda
  const converterMoeda = async () => {
    try {
      // Fazendo uma requisição à API para obter as taxas de câmbio
      const response = await axios.get(
        `https://open.er-api.com/v6/latest/${moedaOrigem}`
      );
      // Obtendo a taxa de câmbio da moeda de origem para a moeda de destino
      const taxaDeCambio = response.data.rates[moedaDestino];
      // Calculando o valor convertido
      const resultadoConvertido = parseFloat(valor) * taxaDeCambio;
      // Atualizando o estado do resultado com o valor convertido formatado
      setResultado(resultadoConvertido.toFixed(2));
    } catch (error) {
      // Tratamento de erro em caso de falha na conversão da moeda
      console.error("Erro ao converter moeda:", error);
    }
  };

  return (
    <div className="container">
      {/* Título da aplicação */}
      <h1>
        Aventura na Terra das Conversões de Moedas com Alice e seus Amigos em
        React
      </h1>
      {/* Campo de entrada para o valor a ser convertido */}
      <div className="form-group">
        <input
          type="number"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          className="input-field"
          placeholder="Digite o valor"
        />
      </div>
      {/* Dropdowns para seleção da moeda de origem e destino */}
      <div className="form-group">
        <select
          value={moedaOrigem}
          onChange={(e) => setMoedaOrigem(e.target.value)}
          className="select-field"
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="BRL">BRL</option>
          <option value="GBP">GBP</option>
          <option value="JPY">JPY</option>
          {/* Adicione mais opções de moeda conforme necessário */}
        </select>
        <select
          value={moedaDestino}
          onChange={(e) => setMoedaDestino(e.target.value)}
          className="select-field"
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="BRL">BRL</option>
          <option value="GBP">GBP</option>
          <option value="JPY">JPY</option>
          {/* Adicione mais opções de moeda conforme necessário */}
        </select>
      </div>
      {/* Botão para iniciar a conversão */}
      <button onClick={converterMoeda}>Converter</button>
      {/* Exibição do resultado da conversão */}
      {resultado && (
        <div className="result">
          <p>
            O valor convertido é: {simbolosMoedas[moedaDestino]} {resultado}
          </p>
        </div>
      )}
    </div>
  );
}

export default ConversorDeMoedas;
