let turno = 1;
let jogadorAtivo = 1; // Jogador 1 começa
let jogador1Jogou = false;
let jogador2Jogou = false;

// Função para alternar o turno
function alternarTurno() {
  // Zerar os resultados dos dados ao final de cada turno
  document.getElementById("player1D20").textContent = ""; // Limpa o dado do jogador 1
  document.getElementById("player2D20").textContent = ""; // Limpa o dado do jogador 2

  // Resetando os status das jogadas
  jogador1Jogou = false;
  jogador2Jogou = false;

  if (turno % 2 === 1) {
    // Turno ímpar: Jogador 1 ataca, Jogador 2 esquiva
    document.getElementById("player1").classList.remove("disabled");
    document.getElementById("player2").classList.add("disabled");
    document.getElementById("player1D20Btn").disabled = false;
    document.getElementById("player2D20Btn").disabled = true;
    document.getElementById("resultadoTurno").textContent =
      "Jogador 1 está atacando. Jogador 2 está esquivando.";
    jogadorAtivo = 1; // Jogador 1 ataca
  } else {
    // Turno par: Jogador 2 ataca, Jogador 1 esquiva
    document.getElementById("player1").classList.add("disabled");
    document.getElementById("player2").classList.remove("disabled");
    document.getElementById("player1D20Btn").disabled = true;
    document.getElementById("player2D20Btn").disabled = false;
    document.getElementById("resultadoTurno").textContent =
      "Jogador 2 está atacando. Jogador 1 está esquivando.";
    jogadorAtivo = 2; // Jogador 2 ataca
  }

  document.getElementById("contadorTurno").textContent = `Turno: ${turno}`;
  turno++; // Alternar para o próximo turno
}

// Função chamada após cada rolagem de dado para alternar o turno
function verificarEAlternarTurno() {
  // Verifica se o jogador ativo rolou o dado e alterna o turno
  if (
    (jogadorAtivo === 1 && jogador1Jogou) ||
    (jogadorAtivo === 2 && jogador2Jogou)
  ) {
    // Verifica o valor dos dados dos jogadores
    verificarDadosJogadores();

    if (jogador1Jogou && jogador2Jogou) {
      alternarTurno(); // Ambos os jogadores jogaram, alterna o turno
    }
  }
}

// Função para verificar os dados dos jogadores
function verificarDadosJogadores() {
  const dado1 =
    parseInt(document.getElementById("player1D20").textContent) || 0;
  const dado2 =
    parseInt(document.getElementById("player2D20").textContent) || 0;

  // Se um dos jogadores rolou um dado diferente de zero, habilita o outro jogador
  if (dado1 !== 0 && dado2 === 0) {
    document.getElementById("player2").classList.remove("disabled");
    document.getElementById("player2D20Btn").disabled = false;
    document.getElementById("player1D20Btn").disabled = true;
  } else if (dado2 !== 0 && dado1 === 0) {
    document.getElementById("player1").classList.remove("disabled");
    document.getElementById("player1D20Btn").disabled = false;
    document.getElementById("player2D20Btn").disabled = true;
  }

  // Usando console.log em vez de alert
  console.log(`Dado Jogador 1: ${dado1}`);
  console.log(`Dado Jogador 2: ${dado2}`);
}

// Atualizar as regras e bloqueio de dados no começo do jogo
function iniciarJogo() {
  alternarTurno(); // Inicia com o primeiro turno
}

// Chamar a função iniciarJogo quando o jogo começar
iniciarJogo();

// Simulação de troca de turno a cada 5 segundos (para fins de teste, pode ser removido posteriormente)
setInterval(verificarEAlternarTurno, 1000); // Verifica a cada 1 segundo
