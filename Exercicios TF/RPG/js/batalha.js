let atacante = null;
let defensor = null;

function iniciarBatalha() {
  if (atacante) {
    console.log(`Iniciando batalha com o Jogador ${atacante.nome} ativo.`);

    // Exibe a mensagem no HTML
    document.getElementById(
      "mensagemBatalha"
    ).textContent = `Jogador ${atacante.nome} está atacando o Jogador ${defensor.nome}.`;

    // Lógica da batalha (o atacante pode usar seus dados específicos)
    let danoTotal = 0;

    // O atacante usa os dados apropriados
    if (atacante.classe === "Guerreiro") {
      danoTotal = usarDadoGuerreiro(atacante);
    } else if (atacante.classe === "Ladino") {
      danoTotal = usarDadoLadino(atacante);
    }

    // Aplica o dano ao defensor
    defensor.vida -= danoTotal;
    console.log(
      `${defensor.nome} perdeu ${danoTotal} de vida. Vida restante: ${defensor.vida}`
    );

    // Atualiza a interface
    document.getElementById(
      "mensagemBatalha"
    ).textContent += ` Dano total: ${danoTotal}. Vida restante de ${defensor.nome}: ${defensor.vida}`;
  } else {
    console.log(`Jogador ${jogadorAtivo} perdeu. Próximo turno.`);
    trocarPapeis(); // Se o atacante perdeu, só troca o turno
  }
}

function usarDadoGuerreiro(guerreiro) {
  const dadoD8 = Math.floor(Math.random() * 8) + 1;
  const danoTotal = guerreiro.danoBase + dadoD8;
  guerreiro.staminaMana -= guerreiro.custoStamina;
  console.log("Dano do Guerreiro:", danoTotal);
  return danoTotal;
}

function usarDadoLadino(ladino) {
  const dadoD10 = Math.floor(Math.random() * 10) + 1;
  const danoTotal = ladino.danoBase + dadoD10;
  ladino.staminaMana -= ladino.custoStamina;
  console.log("Dano do Ladino:", danoTotal);
  return danoTotal;
}

function batalha(jogadorAtivo, callback) {
  console.log(`Iniciando batalha do Jogador ${jogadorAtivo}`);
  // Lógica da batalha, considerando as condições de vitória, habilidades, etc.
  alternarTurno();
  callback();
}
