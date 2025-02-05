// Variável para acompanhar o jogador atual (1 = Jogador 1, 2 = Jogador 2)
let currentPlayer = 1;

// Variáveis para armazenar os personagens selecionados pelos jogadores
let player1Character = null;
let player2Character = null;

// Função chamada quando um jogador seleciona um personagem
function selectCharacter() {
  // Obtém o nome do personagem selecionado do modal
  const character = document.getElementById("characterTitle").textContent;
  console.log("Personagem selecionado:", character);

  // Se o jogador já tiver escolhido um personagem antes, restaura o anterior
  if (currentPlayer === 1 && player1Character) {
    resetCharacter(player1Character);
  } else if (currentPlayer === 2 && player2Character) {
    resetCharacter(player2Character);
  }

  // Armazena o novo personagem selecionado pelo jogador atual
  if (currentPlayer === 1) {
    player1Character = character;
    document.getElementById("player1Status").textContent =
      "Jogador 1: " + player1Character + " selecionado!";
    document.getElementById("continueButton").style.display = "block"; // Exibe o botão "Continuar"
  } else {
    player2Character = character;
    document.getElementById("player2Status").textContent =
      "Jogador 2: " + player2Character + " selecionado!";
  }

  // Torna o card do personagem selecionado mais escuro e esconde o botão de seleção
  const card = document.getElementById(character + "Card");
  if (card) {
    card.style.opacity = 0.5; // Reduz a opacidade do card para indicar que já foi escolhido
  } else {
    console.error("Card não encontrado para:", character);
  }

  const button = document.getElementById(character + "Btn");
  if (button) {
    button.style.display = "none"; // Oculta o botão de seleção do personagem já escolhido
  } else {
    console.error("Botão não encontrado para:", character);
  }

  // Exibe o botão "Iniciar Jogo" apenas quando ambos os jogadores tiverem escolhido um personagem
  if (player1Character !== null && player2Character !== null) {
    document.getElementById("startGameButton").style.display = "block";
  }

  // Atualiza a interface para o próximo jogador
  atualizarStatusJogador();

  // Fecha o modal após a seleção
  closeModal();
}

// Função para restaurar um personagem ao estado original (caso o jogador troque de escolha)
function resetCharacter(character) {
  const card = document.getElementById(character + "Card");
  if (card) {
    card.style.opacity = 1; // Restaura a opacidade
  }

  const button = document.getElementById(character + "Btn");
  if (button) {
    button.style.display = "block"; // Reexibe o botão de seleção
  }
}

// Função para avançar para a seleção do segundo jogador
function continueGame() {
  console.log(
    "Continuando jogo - currentPlayer:",
    currentPlayer,
    "P1:",
    player1Character,
    "P2:",
    player2Character
  );

  // Verifica se o Jogador 1 já selecionou um personagem antes de continuar
  if (currentPlayer === 1 && player1Character !== null) {
    currentPlayer = 2; // Muda para o Jogador 2
    atualizarStatusJogador();
    document.getElementById("continueButton").style.display = "none"; // Esconde botão continuar
  }
}

// Função para atualizar a interface e indicar qual jogador está selecionando
function atualizarStatusJogador() {
  // Define a mensagem de status de acordo com o jogador atual
  let statusText =
    currentPlayer === 1
      ? "Jogador 1 Selecionando Personagem"
      : "Jogador 2 Selecionando Personagem";

  // Atualiza os textos de status dos jogadores
  document.getElementById("player1Status").textContent = player1Character
    ? "Jogador 1: " + player1Character + " selecionado!"
    : statusText;
  document.getElementById("player2Status").textContent = player2Character
    ? "Jogador 2: " + player2Character + " selecionado!"
    : "Jogador 2 Aguardando...";

  // Atualiza o título principal da interface
  let playerStatusTitle = document.getElementById("playerStatusTitle");
  if (playerStatusTitle) {
    playerStatusTitle.textContent = statusText;
  } else {
    console.error("Elemento playerStatusTitle não encontrado no DOM.");
  }
}

// Função para iniciar o jogo após os dois jogadores selecionarem seus personagens
function startGame() {
  if (player1Character === null || player2Character === null) {
    alert(
      "Ambos os jogadores precisam selecionar um personagem antes de iniciar o jogo!"
    );
    return;
  }

  // Salva os personagens no localStorage para manter os dados ao trocar de página
  localStorage.setItem("player1Character", player1Character);
  localStorage.setItem("player2Character", player2Character);

  // Mensagem opcional antes de iniciar o jogo
  alert("Iniciando o jogo com " + player1Character + " e " + player2Character);

  // Redireciona para jogo.html
  window.location.href = "../jogo.html";
}

// Inicializa os status dos jogadores ao carregar a página
document.getElementById("player1Status").textContent =
  "Jogador 1 Selecionando Personagem";
document.getElementById("player2Status").textContent =
  "Jogador 2 Aguardando...";
