// batalha.js

function iniciarBatalha() {
  if (atacanteVenceu) {
    console.log(`Iniciando batalha com o Jogador ${jogadorAtivo} ativo.`);

    // Exibe a mensagem no HTML
    document.getElementById(
      "mensagemBatalha"
    ).textContent = `Iniciando batalha com o Jogador ${jogadorAtivo} ativo.`;

    // Lógica da batalha, aqui você pode adicionar os efeitos e a continuidade da batalha
    // A chamada de alternarTurno está agora controlada em outro local, por isso
    // não é necessário chamar aqui.
  } else {
    console.log(`Jogador ${jogadorAtivo} perdeu. Próximo turno.`);
    trocarPapeis(); // Se o atacante perdeu, só troca o turno
  }
}

function batalha(jogadorAtivo, callback) {
  console.log(`Iniciando batalha do Jogador ${jogadorAtivo}`);
  // Adicione a lógica da batalha aqui, considerando as condições de vitória, habilidades, etc.
  // Após a batalha, chame callback para alternar o turno ou atualizar a interface.
  alternarTurno();
  callback();
}
