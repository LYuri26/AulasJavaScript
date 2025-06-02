// =======================================
// LogisTech - weather.js
// Consulta da API OpenWeatherMap
// =======================================

const API_KEY = "ca5c8ad39282778e34a17044392901b2"; // Use a mesma chave aqui ou deixe em app.js e exporte/importe

/**
 * Obter clima de uma localização pelas coordenadas (lat, lon)
 * @param {number} lat Latitude
 * @param {number} lon Longitude
 * @param {function} callback Função callback que recebe o objeto clima
 */
function obterClimaPorCoordenadas(lat, lon, callback) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&appid=${API_KEY}`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro na consulta do clima.");
      }
      return response.json();
    })
    .then((dados) => {
      const clima = {
        temperatura: dados.main.temp,
        umidade: dados.main.humidity,
        vento: (dados.wind.speed * 3.6).toFixed(1), // m/s para km/h com 1 casa decimal
        direcao: converterDirecaoVento(dados.wind.deg),
        condicao: formatarCondicao(dados.weather[0].description),
        icone: `https://openweathermap.org/img/wn/${dados.weather[0].icon}@2x.png`,
        cidade: dados.name,
        coord: dados.coord,
      };
      callback(clima);
    })
    .catch((erro) => {
      console.error("Erro ao obter clima:", erro);
      alert(
        "Falha ao obter dados climáticos. Verifique sua conexão ou a chave da API."
      );
    });
}

// ===========================
// Funções auxiliares
// ===========================

// Converte direção do vento em graus para pontos cardeais (N, NE, E, ...)
function converterDirecaoVento(graus) {
  const direcoes = [
    "Norte",
    "Nornordeste",
    "Nordeste",
    "Lestonordeste",
    "Leste",
    "Lestesudeste",
    "Sudeste",
    "Sulsudeste",
    "Sul",
    "Sulsudoeste",
    "Sudoeste",
    "Oestesudoeste",
    "Oeste",
    "Oestenoroeste",
    "Noroeste",
    "Nornoroeste",
  ];
  const index = Math.round(graus / 22.5) % 16;
  return direcoes[index];
}

// Formata a descrição do tempo para frase mais amigável e capitalizada
function formatarCondicao(texto) {
  if (!texto) return "";
  return texto
    .split(" ")
    .map((palavra) => palavra.charAt(0).toUpperCase() + palavra.slice(1))
    .join(" ");
}
