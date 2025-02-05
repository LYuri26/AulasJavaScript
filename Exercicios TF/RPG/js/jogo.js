document.addEventListener("DOMContentLoaded", function () {
  // Recupera os dados dos jogadores do localStorage
  const player1Character = JSON.parse(localStorage.getItem("player1Character"));
  const player2Character = JSON.parse(localStorage.getItem("player2Character"));

  // Verifica se os dados dos jogadores estão disponíveis
  if (!player1Character || !player2Character) {
    alert("Os personagens não foram selecionados corretamente! Retornando...");
    window.location.href = "../index.html";
    return;
  } else {
    console.log("Jogadores carregados:", player1Character, player2Character);
  }

  // Função para atualizar as informações do jogador
  function updatePlayerInfo(playerId, character) {
    document.getElementById(
      `${playerId}Character`
    ).textContent = `${character.title} - ${character.name}`;
    document.getElementById(`${playerId}Vida`).textContent = character.life;
    document.getElementById(`${playerId}Dano`).textContent = character.damage;
    document.getElementById(`${playerId}Armadura`).textContent =
      character.armor;
    document.getElementById(`${playerId}Esquiva`).textContent = character.dodge;
    document.getElementById(`${playerId}Peso`).textContent = character.weight;
    document.getElementById(`${playerId}Stamina`).textContent =
      character.stamina;
  }

  // Atualiza os dados dos jogadores
  updatePlayerInfo("player1", player1Character);
  updatePlayerInfo("player2", player2Character);

  // Comparação de D20
  const resultado = document.getElementById("resultadoDisputa");
  if (player1D20 > player2D20) {
    resultado.textContent = "Jogador 1 venceu a disputa!";
  } else if (player2D20 > player1D20) {
    resultado.textContent = "Jogador 2 venceu a disputa!";
  } else {
    resultado.textContent = "A disputa terminou em empate!";
  }
});
