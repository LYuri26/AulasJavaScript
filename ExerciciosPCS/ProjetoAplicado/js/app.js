// ===============================
// LogisTech - app.js (Corrigido + Melhorado)
// ===============================

const statusOperacional = document.getElementById("status-operacional");
const mensagemOperacional = document.getElementById("mensagem-operacional");
const distanciaDisplay = document.getElementById("distancia");
const btnConsultar = document.getElementById("btn-consultar");
const btnAtualizarAlertas = document.getElementById("atualizar-alertas");
const alertasContainer = document.getElementById("alertas");
const nomeCidadeTitulo = document.getElementById("nome-cidade");
const tituloDistancia = document.getElementById("titulo-distancia");

const origem = {
  nome: "Uberaba - MG",
  lat: -19.7483,
  lon: -47.9319,
};

let ultimaCoordenadaCidade = null;
let ultimoNomeCidade = "";

// ===============================
// Gerenciamento de Status
// ===============================
function atualizarStatusOperacional(nivel, mensagem) {
  statusOperacional.className = "badge";
  mensagemOperacional.className = "alert mb-0";

  switch (nivel) {
    case "verde":
      statusOperacional.classList.add("bg-success");
      statusOperacional.textContent = "Status: Operação Normal";
      mensagemOperacional.classList.add("alert-success");
      mensagemOperacional.textContent =
        mensagem || "Operação normal. Nenhum risco ambiental identificado.";
      document.body.style.backgroundColor = "#f8f9fa";
      break;
    case "amarelo":
      statusOperacional.classList.add("bg-warning", "text-dark");
      statusOperacional.textContent = "Status: Atenção";
      mensagemOperacional.classList.add("alert-warning");
      mensagemOperacional.textContent =
        mensagem || "Atenção: Condições ambientais exigem cuidado.";
      document.body.style.backgroundColor = "#fff3cd";
      break;
    case "vermelho":
      statusOperacional.classList.add("bg-danger");
      statusOperacional.textContent = "Status: Alerta Crítico";
      mensagemOperacional.classList.add("alert-danger");
      mensagemOperacional.textContent =
        mensagem ||
        "Alerta Crítico: Operação em risco devido a condições severas.";
      document.body.style.backgroundColor = "#f8d7da";
      break;
  }
}

// ===============================
// Calcular Distância (Haversine)
// ===============================
function calcularDistancia(lat1, lon1, lat2, lon2) {
  const rad = Math.PI / 180;
  const R = 6371;
  const dLat = (lat2 - lat1) * rad;
  const dLon = (lon2 - lon1) * rad;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * rad) * Math.cos(lat2 * rad) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// ===============================
// Consultar cidade digitada
// ===============================
btnConsultar.addEventListener("click", () => {
  const cidadeDigitada = document.getElementById("cidade-input").value.trim();
  if (!cidadeDigitada) {
    alert("Por favor, insira uma cidade.");
    return;
  }

  btnConsultar.textContent = "🔄 Buscando...";
  btnConsultar.disabled = true;

  // Coordenadas fixas de Uberaba
  const origem = { lat: -19.7483, lon: -47.9319 };

  obterCoordenadasPorCidade(
    cidadeDigitada,
    ({ lat, lon, nome }) => {
      // Atualiza variáveis globais se necessário
      ultimaCoordenadaCidade = { lat, lon };
      ultimoNomeCidade = nome;
      nomeCidadeTitulo.textContent = nome;
      tituloDistancia.textContent = `Distância entre Uberaba e ${nome}:`;

      // Obter clima de Uberaba primeiro
      obterClimaPorCoordenadas(
        origem.lat,
        origem.lon,
        (dadosUberaba) => {
          atualizarClimaInterface("uberaba", dadosUberaba);

          // Em seguida, obter clima da cidade digitada
          obterClimaPorCoordenadas(
            lat,
            lon,
            (dadosCidade) => {
              atualizarClimaInterface("cidade", dadosCidade);

              // Calcular e exibir distância
              const distancia = calcularDistancia(
                origem.lat,
                origem.lon,
                lat,
                lon
              );
              distanciaDisplay.textContent = distancia.toFixed(2) + " km";

              // Buscar alertas para a cidade digitada e distância calculada
              buscarAlertas(lat, lon, distancia);

              // Reabilitar botão e atualizar texto
              btnConsultar.textContent = "Consultar Clima e Alertas";
              btnConsultar.disabled = false;
            },
            btnConsultar
          );
        },
        btnConsultar
      );
    },
    btnConsultar
  );
});

// ===============================
// Atualizar alertas manualmente
// ===============================
btnAtualizarAlertas.addEventListener("click", () => {
  if (!ultimaCoordenadaCidade) {
    alert("Consulte uma cidade primeiro.");
    return;
  }

  btnAtualizarAlertas.textContent = "🔄 Atualizando...";
  btnAtualizarAlertas.disabled = true;

  const { lat, lon } = ultimaCoordenadaCidade;
  const distancia = calcularDistancia(origem.lat, origem.lon, lat, lon);

  buscarAlertas(lat, lon, distancia);

  setTimeout(() => {
    btnAtualizarAlertas.textContent = "Atualizar Alertas";
    btnAtualizarAlertas.disabled = false;
  }, 1500); // Feedback de atualização de pelo menos 1.5 segundos
});

// ===============================
// Inicialização
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  atualizarStatusOperacional("verde");
  obterClimaPorCoordenadas(origem.lat, origem.lon, (dadosUberaba) => {
    atualizarClimaInterface("uberaba", dadosUberaba);
  });
});
