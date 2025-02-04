async function converterMoeda() {
  const valor = document.getElementById("valor").value;
  const moedaOrigem = document.getElementById("moedaOrigem").value;
  const moedaDestino = document.getElementById("moedaDestino").value;
  const resultadoDiv = document.getElementById("resultado");

  if (!valor) {
    resultadoDiv.innerHTML = "Por favor, insira um valor.";
    return;
  }

  try {
    // Fazendo a requisição à API de conversão
    const response = await fetch(
      `https://open.er-api.com/v6/latest/${moedaOrigem}`
    );
    const data = await response.json();

    if (!data.rates || !data.rates[moedaDestino]) {
      throw new Error("Dados de conversão inválidos.");
    }

    // Obtendo a taxa de câmbio e realizando a conversão
    const taxaDeCambio = data.rates[moedaDestino];
    const resultadoConvertido = (parseFloat(valor) * taxaDeCambio).toFixed(2);

    // Símbolos das moedas
    const simbolosMoedas = {
      USD: "$",
      EUR: "€",
      BRL: "R$",
      GBP: "£",
      JPY: "¥",
    };

    resultadoDiv.innerHTML = `O valor convertido é: ${simbolosMoedas[moedaDestino]} ${resultadoConvertido}`;
  } catch (error) {
    console.error("Erro ao converter moeda:", error);
    resultadoDiv.innerHTML =
      "Erro ao obter a taxa de câmbio. Tente novamente mais tarde.";
  }
}
