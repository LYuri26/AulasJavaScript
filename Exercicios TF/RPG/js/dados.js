let dadosRolados = { player1: 0, player2: 0 };

function rolarDado(playerId) {
  // Permitir rolar apenas se for a vez do jogador
  const dado = Math.floor(Math.random() * 20) + 1; // Gera valor aleatório entre 1 e 20
  document.getElementById(`${playerId}D20`).textContent = dado;

  if (playerId === "player1") {
    jogador1Jogou = true; // Jogador 1 fez sua jogada
  } else {
    jogador2Jogou = true; // Jogador 2 fez sua jogada
  }

  // Armazenar o resultado
  dadosRolados[playerId] = dado;

  // Feedback de rolagem
  console.log(
    `Jogador ${playerId === "player1" ? 1 : 2} rolou o D20! Resultado: ${dado}`
  );

  // Bloquear o botão do D20 para o jogador atual
  document.getElementById(`${playerId}D20Btn`).disabled = true;

  // Verificar vencedor sempre que um dado for rolado
  verificarVencedor();

  // Verificar e alternar o turno após a rolagem
  verificarEAlternarTurno();
}

function verificarVencedor() {
  const d20Player1 =
    parseInt(document.getElementById("player1D20").textContent) || 0;
  const d20Player2 =
    parseInt(document.getElementById("player2D20").textContent) || 0;

  const resultadoDisputa = document.getElementById("resultadoDisputa");
  const resultadoTurnoAnteriorTexto = document.getElementById(
    "resultadoTurnoAnteriorTexto"
  );

  if (d20Player1 > 0 && d20Player2 > 0) {
    let resultado = "";

    if (d20Player1 > d20Player2) {
      resultado = "Jogador 1 venceu a disputa!";
      console.log("Jogador 1 venceu a disputa!");
    } else if (d20Player2 > d20Player1) {
      resultado = "Jogador 2 venceu a disputa!";
      console.log("Jogador 2 venceu a disputa!");
    } else {
      resultado = "A disputa terminou em empate!";
      console.log("A disputa terminou em empate!");
    }

    // Exibindo o valor dos dados e o resultado no HTML
    resultadoDisputa.textContent = resultado;
    resultadoTurnoAnteriorTexto.innerHTML = `
        Jogador 1 rolou: ${d20Player1}<br>
        Jogador 2 rolou: ${d20Player2}
      `;
  }
}
