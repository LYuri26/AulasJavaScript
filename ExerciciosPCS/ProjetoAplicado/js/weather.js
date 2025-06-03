const API_KEY = "ca5c8ad39282778e34a17044392901b2";

// Obter clima
function obterClimaPorCoordenadas(lat, lon, callback, btn = null) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&appid=${API_KEY}`;
  fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error("Erro na API de clima.");
      return response.json();
    })
    .then((data) => {
      const clima = {
        temperatura: data.main.temp,
        umidade: data.main.humidity,
        vento: (data.wind.speed * 3.6).toFixed(1),
        direcao: converterDirecaoVento(data.wind.deg),
        condicao: formatarCondicao(data.weather[0].description),
        icone: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
        cidade: data.name,
        coord: data.coord,
      };
      callback(clima);
    })
    .catch((erro) => {
      alert("❌ Erro ao obter dados climáticos.");
      console.error(erro);
    })
    .finally(() => {
      if (btn) {
        btn.disabled = false;
        btn.textContent = "Consultar Clima e Alertas";
      }
    });
}

// Obter coordenadas da cidade
function obterCoordenadasPorCidade(cidade, callback, btn = null) {
  const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
    cidade
  )}&limit=1&appid=${API_KEY}`;
  fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error("Erro na API de geolocalização.");
      return res.json();
    })
    .then((data) => {
      if (!data.length) {
        alert("❌ Cidade não encontrada. Verifique a grafia.");
        throw new Error("Cidade não encontrada.");
      }
      const local = data[0];
      callback({
        lat: local.lat,
        lon: local.lon,
        nome: local.name,
      });
    })
    .catch((erro) => {
      alert("❌ Erro ao buscar localização.");
      console.error(erro);
    })
    .finally(() => {
      if (btn) {
        btn.disabled = false;
        btn.textContent = "Consultar Clima e Alertas";
      }
    });
}

// Atualizar Interface
function atualizarClimaInterface(cidade, dados) {
  const prefix = cidade === "uberaba" ? "uberaba" : "cidade";
  document.getElementById(`temp-${prefix}`).textContent =
    dados.temperatura.toFixed(1);
  document.getElementById(`umidade-${prefix}`).textContent = dados.umidade;
  document.getElementById(`vento-${prefix}`).textContent = dados.vento;
  document.getElementById(`direcao-${prefix}`).textContent = dados.direcao;
  document.getElementById(`condicao-${prefix}`).textContent = dados.condicao;
  document.getElementById(`icone-${prefix}`).src = dados.icone;
}

// Funções Auxiliares
function converterDirecaoVento(graus) {
  const direcoes = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSO",
    "SO",
    "OSO",
    "O",
    "ONO",
    "NO",
    "NNO",
  ];
  const index = Math.round(graus / 22.5) % 16;
  return direcoes[index];
}

function formatarCondicao(texto) {
  return texto
    .split(" ")
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join(" ");
}
