let currentPlayer = 1; // 1 para Jogador 1, 2 para Jogador 2
let player1Character = null;
let player2Character = null;

function selectCharacter() {
  const character = document.getElementById("characterTitle").textContent;
  console.log("Personagem selecionado:", character);

  if (
    (currentPlayer === 1 && player1Character) ||
    (currentPlayer === 2 && player2Character)
  ) {
    return;
  }

  if (currentPlayer === 1) {
    player1Character = character;
    document.getElementById("player1Status").textContent =
      "Jogador 1: " + player1Character + " selecionado!";
    document.getElementById("continueButton").style.display = "block";
  } else {
    player2Character = character;
    document.getElementById("player2Status").textContent =
      "Jogador 2: " + player2Character + " selecionado!";
  }

  document.getElementById(character + "Card").style.opacity = 0.5;
  document.getElementById(character + "Btn").style.display = "none";

  if (player1Character !== null && player2Character !== null) {
    document.getElementById("startGameButton").style.display = "block";
  }

  if (currentPlayer === 1 && player1Character !== null) {
    currentPlayer = 2;
  }

  // Atualiza o status do jogador atual
  atualizarStatusJogador();

  closeModal();
}

function atualizarStatusJogador() {
  let statusText = "";

  if (currentPlayer === 1) {
    statusText = "Jogador 1 Selecionando Personagem";
    document.getElementById("player1Status").textContent = statusText;
    document.getElementById("player2Status").textContent =
      "Jogador 2 Aguardando...";
  } else {
    statusText = "Jogador 2 Selecionando Personagem";
    document.getElementById("player1Status").textContent =
      "Jogador 1: " + player1Character + " selecionado!";
    document.getElementById("player2Status").textContent = statusText;
  }

  let playerStatusTitle = document.getElementById("playerStatusTitle");
  if (playerStatusTitle) {
    playerStatusTitle.textContent = statusText;
  }
}

function continueGame() {
  console.log(
    "Continuando jogo - currentPlayer:",
    currentPlayer,
    "P1:",
    player1Character,
    "P2:",
    player2Character
  );

  if (currentPlayer === 2) {
    document.getElementById("player1Status").textContent =
      "Jogador 1: " + player1Character + " selecionado!";
    document.getElementById("player2Status").textContent =
      "Jogador 2 Selecionando Personagem";
    document.getElementById("continueButton").style.display = "none"; // Esconde botão continuar
  }
}

function startGame() {
  if (player1Character === null || player2Character === null) {
    alert(
      "Ambos os jogadores precisam selecionar um personagem antes de iniciar o jogo!"
    );
    return;
  }

  alert("Iniciando o jogo com " + player1Character + " e " + player2Character);
}

// Inicializa os títulos corretamente ao carregar a página
document.getElementById("player1Status").textContent =
  "Jogador 1 Selecionando Personagem";
document.getElementById("player2Status").textContent =
  "Jogador 2 Aguardando...";
