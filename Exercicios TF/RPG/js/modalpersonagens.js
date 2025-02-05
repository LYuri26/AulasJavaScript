// Dados dos personagens com base na tabela
const characterData = {
  Guerreiro: {
    title: "Guerreiro", // Nome do personagem
    life: 30, // Vida do personagem
    damage: 3, // Dano causado pelo personagem
    armor: 5, // Armadura do personagem
    dodge: 2, // Habilidade de esquiva do personagem
    weight: 4, // Peso do personagem
    stamina: 6, // Stamina (resistência) do personagem
    skill: "Força Brutal: Rola um D8 extra no ataque.", // Habilidade especial do personagem
    cost: "2 Stamina", // Custo para usar a habilidade
    penalty: "-1 defesa no turno seguinte.", // Penalidade de usar a habilidade
  },
  Ladino: {
    title: "Ladino",
    life: 25,
    damage: 2,
    armor: 2,
    dodge: 5,
    weight: 1,
    stamina: 6,
    skill:
      "Ataque Sorrateiro: Se não foi atacado no turno anterior, rola um D10 extra.",
    cost: "3 Stamina",
    penalty: "Só pode ser usado a cada 2 turnos.",
  },
  Mago: {
    title: "Mago",
    life: 20,
    damage: 4,
    armor: 1,
    dodge: 3,
    weight: 2,
    stamina: 9,
    skill: "Bola de Fogo: Pode rolar um D12 no ataque.",
    cost: "3 Mana", // O Mago usa Mana ao invés de Stamina
    penalty: "-1 esquiva no turno seguinte.",
  },
  Paladino: {
    title: "Paladino",
    life: 35,
    damage: 3,
    armor: 4,
    dodge: 3,
    weight: 3,
    stamina: 6,
    skill: "Proteção Divina: Rola um D8 extra na defesa.",
    cost: "2 Stamina",
    penalty: "-2 no próximo ataque.",
  },
  Barbaro: {
    title: "Bárbaro",
    life: 35,
    damage: 4,
    armor: 3,
    dodge: 3,
    weight: 3,
    stamina: 6,
    skill:
      "Fúria: Quando a vida cair abaixo de 15, rola um D10 extra no ataque.",
    cost: "6 Stamina",
    penalty: "Só pode ser usado uma vez por combate.",
  },
  Arqueiro: {
    title: "Arqueiro",
    life: 25,
    damage: 3,
    armor: 2,
    dodge: 4,
    weight: 1,
    stamina: 6,
    skill: "Tiro Preciso: Rola um D8 extra no ataque.",
    cost: "2 Stamina",
    penalty: "-1 esquiva no turno seguinte.",
  },
  Monge: {
    title: "Monge",
    life: 30,
    damage: 2,
    armor: 3,
    dodge: 5,
    weight: 0, // Peso do Monge é 0, o que pode indicar uma alta mobilidade
    stamina: 6,
    skill: "Reflexos Aguçados: Rola um D6 extra ao esquivar.",
    cost: "2 Stamina",
    penalty: "-1 dano no próximo ataque.",
  },
  Cavaleiro: {
    title: "Cavaleiro",
    life: 35,
    damage: 3,
    armor: 5,
    dodge: 2,
    weight: 4,
    stamina: 6,
    skill: "Defesa Absoluta: Ignora um ataque fraco ou médio.",
    cost: "3 Stamina",
    penalty: "Não pode atacar no turno seguinte.",
  },
  Assassino: {
    title: "Assassino",
    life: 25,
    damage: 4,
    armor: 2,
    dodge: 4,
    weight: 1,
    stamina: 6,
    skill: "Golpe Mortal: Se tirar 20 no D20 de ataque, rola um D12 extra.",
    cost: "3 Stamina",
    penalty: "Custa 3 Stamina adicionais se falhar.",
  },
  Druida: {
    title: "Druida",
    life: 30,
    damage: 3,
    armor: 3,
    dodge: 3,
    weight: 2,
    stamina: 9,
    skill: "Cura Natural: Rola um D8 e recupera vida.",
    cost: "3 Mana", // O Druida também usa Mana
    penalty: "Só pode ser usado 3 vezes por combate.",
  },
  Gladiador: {
    title: "Gladiador",
    life: 35,
    damage: 4,
    armor: 4,
    dodge: 2,
    weight: 3,
    stamina: 6,
    skill: "Resistência Extrema: Rola um D6 extra para reduzir dano recebido.",
    cost: "2 Stamina",
    penalty: "Não pode usar outra habilidade no próximo turno.",
  },
  Cacador: {
    title: "Caçador",
    life: 25,
    damage: 3,
    armor: 3,
    dodge: 4,
    weight: 2,
    stamina: 6,
    skill:
      "Armadilha Oculta: O inimigo rola um D12 em vez do D20 para esquiva.",
    cost: "3 Stamina",
    penalty: "Só pode ser usado a cada 3 turnos.",
  },
  Mercenario: {
    title: "Mercenário",
    life: 30,
    damage: 3,
    armor: 4,
    dodge: 3,
    weight: 3,
    stamina: 6,
    skill:
      "Golpe Oportunista: Se esquivar, pode contra-atacar com um D6 extra.",
    cost: "2 Stamina",
    penalty: "-1 esquiva no turno seguinte.",
  },
  Feiticeiro: {
    title: "Feiticeiro",
    life: 20,
    damage: 4,
    armor: 1,
    dodge: 3,
    weight: 2,
    stamina: 9,
    skill: "Explosão Arcana: Rola um D20 para ataque.",
    cost: "3 Mana", // Feiticeiro também utiliza Mana
    penalty: "Reduz 2 de vida ao usar.",
  },
  Samurai: {
    title: "Samurai",
    life: 30,
    damage: 4,
    armor: 4,
    dodge: 3,
    weight: 3,
    stamina: 6,
    skill:
      "Foco Perfeito: Se não usou habilidade no turno anterior, rola um D10 extra.",
    cost: "3 Stamina",
    penalty: "Só pode ser usado 2 vezes por combate.",
  },
};

// Função para abrir o modal e carregar os dados do personagem
function openModal(character) {
  // Verificar se o personagem existe na lista de dados
  if (characterData[character]) {
    // Atualiza as informações do modal com os dados do personagem selecionado
    document.getElementById("characterTitle").textContent =
      characterData[character].title; // Nome do personagem
    document.getElementById("characterLife").textContent =
      characterData[character].life; // Vida do personagem
    document.getElementById("characterDamage").textContent =
      characterData[character].damage; // Dano causado pelo personagem
    document.getElementById("characterArmor").textContent =
      characterData[character].armor; // Armadura do personagem
    document.getElementById("characterDodge").textContent =
      characterData[character].dodge; // Habilidade de esquiva do personagem
    document.getElementById("characterWeight").textContent =
      characterData[character].weight; // Peso do personagem
    document.getElementById("characterStamina").textContent =
      characterData[character].stamina; // Stamina do personagem
    document.getElementById("characterSkill").textContent =
      characterData[character].skill; // Habilidade especial do personagem
    document.getElementById("characterCost").textContent =
      characterData[character].cost; // Custo da habilidade especial
    document.getElementById("characterPenalty").textContent =
      characterData[character].penalty; // Penalidade por usar a habilidade

    // Exibe o modal utilizando o método show() do Bootstrap
    var modal = new bootstrap.Modal(document.getElementById("characterModal"));
    modal.show();
  } else {
    // Se o personagem não existir, exibe um erro no console
    console.error("Personagem não encontrado: " + character);
  }
}

// Função para fechar o modal
function closeModal() {
  // Obtém a instância do modal do Bootstrap
  var modal = bootstrap.Modal.getInstance(
    document.getElementById("characterModal")
  );
  // Fecha o modal
  modal.hide();
}
