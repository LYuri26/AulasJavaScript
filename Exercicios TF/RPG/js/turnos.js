let jogadorAtivo = 1;
let jogador1Jogou = false;
let jogador2Jogou = false;
let turno = 1;
let jogador1Atacante = false;
let jogador2Atacante = false;

function alternarTurno() {
  // Determina quem está atacando e quem está se defendendo
  jogador1Atacante = turno % 2 !== 0;
  jogador2Atacante = !jogador1Atacante;

  // Exibe o turno no HTML
  document.getElementById("contadorTurno").textContent = `Turno: ${turno}`;

  // Exibe quem está atacando e quem está defendendo no HTML
  const atacante = jogador1Atacante ? "Jogador 1" : "Jogador 2";
  const defensor = jogador1Atacante ? "Jogador 2" : "Jogador 1";
  document.getElementById(
    "resultadoTurno"
  ).textContent = `${atacante} está atacando. ${defensor} está defendendo.`;

  // Verifica se ambos os jogadores rolaram os dados
  if (jogador1Jogou && jogador2Jogou) {
    verificarVencedor();
  } else {
    atualizarBotoes();
  }
}

// Função para verificar quem venceu a disputa de dados
function verificarVencedor() {
  if (dadosRolados.player1 !== 0 && dadosRolados.player2 !== 0) {
    const venceu = dadosRolados.player1 > dadosRolados.player2;

    // Modificado para não deixar o atacante vencer em caso de empate
    if (dadosRolados.player1 === dadosRolados.player2) {
      document.getElementById("mensagemBatalha").textContent =
        "Empate! Nenhum vencedor neste turno.";
      trocarTurno();
    } else if ((venceu && jogador1Atacante) || (!venceu && jogador2Atacante)) {
      iniciarBatalha();
    } else {
      trocarTurno();
    }
  }
}

// Função para iniciar a batalha
function iniciarBatalha() {
  let mensagem = jogador1Atacante
    ? "Jogador 1 venceu a batalha!"
    : "Jogador 2 venceu a batalha!";
  document.getElementById("mensagemBatalha").textContent = mensagem;
}

// Função para trocar os turnos automaticamente após um curto intervalo
function trocarTurno() {
  jogadorAtivo = jogadorAtivo === 1 ? 2 : 1;
  jogador1Jogou = jogador2Jogou = false;
  turno++;

  setTimeout(() => {
    prepararRolagemD20();
  }, 500); // Atraso de meio segundo antes de preparar a próxima rolagem
}

// Atualiza os botões de rolagem de dados
function atualizarBotoes() {
  document.getElementById("player1D20Btn").disabled =
    jogador1Jogou || jogadorAtivo !== 1;
  document.getElementById("player2D20Btn").disabled =
    jogador2Jogou || jogadorAtivo !== 2;
}

// Adiciona os ouvintes de evento para os botões de rolagem de dados
document.getElementById("player1D20Btn").addEventListener("click", () => {
  if (!jogador1Jogou && jogadorAtivo === 1) {
    jogador1Jogou = true;
    const resultado = rolarDado("D20", 1);
    dadosRolados.player1 = resultado;
    document.getElementById(
      "player1D20"
    ).textContent = `Resultado: ${resultado}`;

    jogadorAtivo = 2;
    document.getElementById("player1D20Btn").disabled = true;
    document.getElementById("player2D20Btn").disabled = false;

    alternarTurno();
  }
});

document.getElementById("player2D20Btn").addEventListener("click", () => {
  if (!jogador2Jogou && jogadorAtivo === 2) {
    jogador2Jogou = true;
    const resultado = rolarDado("D20", 2);
    dadosRolados.player2 = resultado;
    document.getElementById(
      "player2D20"
    ).textContent = `Resultado: ${resultado}`;

    jogadorAtivo = 1;
    document.getElementById("player1D20Btn").disabled = false;
    document.getElementById("player2D20Btn").disabled = true;

    alternarTurno();
  }
});

// Função para encerrar o turno e esperar o próximo
function encerrarTurnoEAguardarProximo() {
  if (jogadorAtivo === 1) {
    jogador1Jogou = true;
  } else {
    jogador2Jogou = true;
  }

  zerarDados();
  trocarTurno();
}

// Função para zerar os dados
function zerarDados() {
  dadosRolados.player1 = 0;
  dadosRolados.player2 = 0;
  document.getElementById("player1D20").textContent = "";
  document.getElementById("player2D20").textContent = "";
}

// Função para preparar a próxima rolagem de dados
function prepararRolagemD20() {
  dadosRolados.player1 = 0;
  dadosRolados.player2 = 0;
  document.getElementById("player1D20").textContent = "";
  document.getElementById("player2D20").textContent = "";
  atualizarBotoes();
}

document.addEventListener("DOMContentLoaded", () => {
  prepararRolagemD20();
});
