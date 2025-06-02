// =======================================
// LogisTech - app.js
// Controle do Painel
// =======================================

// === CONSTANTES DO DOM ===
const statusOperacional = document.getElementById("status-operacional");
const mensagemOperacional = document.getElementById("mensagem-operacional");
const body = document.body;

const btnAtualizarClima = document.getElementById("atualizar-clima");
const btnConsultar = document.getElementById("btn-consultar");
const alertasContainer = document.getElementById("alertas");

const inputCidadeConsulta = document.getElementById("cidade-input");

const distanciaDisplay = document.getElementById("distancia");

// === CONSTANTES DE LOCALIZAÇÃO ===
const origem = {
  nome: "Uberaba - MG",
  lat: -19.7483,
  lon: -47.9319,
};

// === FUNÇÕES AUXILIARES ===

// Atualiza o status operacional na interface
function atualizarStatusOperacional(nivel, mensagem) {
  statusOperacional.classList.remove(
    "status-verde",
    "status-amarelo",
    "status-vermelho"
  );
  body.classList.remove(
    "operacao-normal",
    "operacao-atencao",
    "operacao-alerta"
  );

  switch (nivel) {
    case "verde":
      statusOperacional.classList.add("status-verde");
      body.classList.add("operacao-normal");
      statusOperacional.textContent = "Status: Operação Normal";
      mensagemOperacional.className = "alert alert-success";
      mensagemOperacional.textContent =
        mensagem || "Operação normal. Nenhum risco ambiental identificado.";
      break;
    case "amarelo":
      statusOperacional.classList.add("status-amarelo");
      body.classList.add("operacao-atencao");
      statusOperacional.textContent = "Status: Atenção";
      mensagemOperacional.className = "alert alert-warning";
      mensagemOperacional.textContent =
        mensagem || "Atenção: Condições ambientais exigem cuidado.";
      break;
    case "vermelho":
      statusOperacional.classList.add("status-vermelho");
      body.classList.add("operacao-alerta");
      statusOperacional.textContent = "Status: Alerta Crítico";
      mensagemOperacional.className = "alert alert-danger";
      mensagemOperacional.textContent =
        mensagem ||
        "Alerta Crítico: Operação em risco devido a condições severas.";
      break;
    default:
      console.warn("Nível de alerta desconhecido:", nivel);
  }
}

// Obter coordenadas pela API Geocoding do OpenWeatherMap
function obterCoordenadasPorCidade(cidade, callback) {
  const urlGeo = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
    cidade
  )}&limit=1&appid=${API_KEY}`;

  fetch(urlGeo)
    .then((response) => {
      if (!response.ok) throw new Error("Erro na consulta de geocodificação.");
      return response.json();
    })
    .then((dados) => {
      if (dados.length === 0) {
        alert("Cidade não encontrada. Verifique a grafia.");
        return;
      }
      const local = dados[0];
      callback({
        lat: local.lat,
        lon: local.lon,
        nome: local.name,
        uf: local.state || "",
      });
    })
    .catch((erro) => {
      console.error("Erro ao obter coordenadas:", erro);
      alert("Erro ao buscar localização da cidade.");
    });
}

// Calcular distância entre dois pontos (Haversine)
function calcularDistancia(lat1, lon1, lat2, lon2) {
  const rad = (x) => (x * Math.PI) / 180;
  const R = 6371; // km
  const dLat = rad(lat2 - lat1);
  const dLon = rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(lat1)) *
      Math.cos(rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Atualiza a interface do clima para Uberaba ou outra cidade
function atualizarClimaInterface(cidade, dados) {
  if (cidade === "uberaba") {
    document.getElementById("temp-uberaba").textContent =
      dados.temperatura.toFixed(1) + " °C";
    document.getElementById("umidade-uberaba").textContent =
      dados.umidade + " %";
    document.getElementById("vento-uberaba").textContent =
      dados.vento + " km/h";
    document.getElementById("direcao-uberaba").textContent = dados.direcao;
    document.getElementById("condicao-uberaba").textContent = dados.condicao;
    document.getElementById("icone-uberaba").src = dados.icone;
  } else if (cidade === "cidade") {
    document.getElementById("temp-cidade").textContent =
      dados.temperatura.toFixed(1) + " °C";
    document.getElementById("umidade-cidade").textContent =
      dados.umidade + " %";
    document.getElementById("vento-cidade").textContent = dados.vento + " km/h";
    document.getElementById("direcao-cidade").textContent = dados.direcao;
    document.getElementById("condicao-cidade").textContent = dados.condicao;
    document.getElementById("icone-cidade").src = dados.icone;
  }
}

// Atualiza alertas simulados
function atualizarAlertasCidade(lat, lon) {
  alertasContainer.innerHTML = "";

  // Simulação de alerta
  const alertaExemplo = {
    nivel: "amarelo",
    mensagem:
      "Possibilidade de chuva forte nas próximas horas. Fique atento às condições locais.",
  };

  const alertaEl = document.createElement("div");
  alertaEl.classList.add("alert");
  if (alertaExemplo.nivel === "verde") alertaEl.classList.add("alert-success");
  else if (alertaExemplo.nivel === "amarelo")
    alertaEl.classList.add("alert-warning");
  else if (alertaExemplo.nivel === "vermelho")
    alertaEl.classList.add("alert-danger");

  alertaEl.textContent = alertaExemplo.mensagem;
  alertasContainer.appendChild(alertaEl);

  atualizarStatusOperacional(alertaExemplo.nivel, alertaExemplo.mensagem);
}

// === EVENTO DO BOTÃO CONSULTAR ===
btnConsultar.addEventListener("click", () => {
  const cidadeDigitada = inputCidadeConsulta.value.trim();
  if (!cidadeDigitada) {
    alert("Por favor, informe uma cidade.");
    return;
  }

  obterCoordenadasPorCidade(cidadeDigitada, ({ lat, lon, nome, uf }) => {
    // Busca o clima de Uberaba
    obterClimaPorCoordenadas(origem.lat, origem.lon, (dadosUberaba) => {
      atualizarClimaInterface("uberaba", dadosUberaba);

      // Busca o clima da cidade digitada
      obterClimaPorCoordenadas(lat, lon, (dadosCidade) => {
        atualizarClimaInterface("cidade", dadosCidade);

        // Calcula e mostra a distância
        const dist = calcularDistancia(origem.lat, origem.lon, lat, lon);
        distanciaDisplay.textContent = dist.toFixed(2) + " km";

        // Atualiza alertas (simulado)
        atualizarAlertasCidade(lat, lon);
      });
    });
  });
});

// === INICIALIZAÇÃO ===
document.addEventListener("DOMContentLoaded", () => {
  atualizarStatusOperacional("verde");
  obterClimaPorCoordenadas(origem.lat, origem.lon, (dadosUberaba) => {
    atualizarClimaInterface("uberaba", dadosUberaba);
  });
});
