// Definindo o personagem Guerreiro
const guerreiro = {
  classe: "Guerreiro",
  nome: "Vegeta",
  vida: 30,
  danoBase: 3,
  armadura: 5,
  esquiva: 2,
  peso: 4,
  staminaMana: 6,
  dadoEspecial: "D8 extra no ataque", // Representa o dado extra que o Guerreiro usa no ataque
  custo: 2, // Custo de Stamina
  penalidade: "-1 defesa no turno seguinte", // Penalidade após usar a habilidade
  ataqueEspecial: function () {
    // Função para calcular o ataque especial
    const dadoD8 = Math.floor(Math.random() * 8) + 1; // Dado D8
    const danoTotal = this.danoBase + dadoD8;
    console.log("Dano do ataque especial:", danoTotal);

    // Decrementa a Stamina após o uso do ataque especial
    this.staminaMana -= this.custo;
    console.log("Stamina restante:", this.staminaMana);

    // Aplica a penalidade de defesa no turno seguinte
    this.aplicarPenalidade();

    return danoTotal;
  },
  aplicarPenalidade: function () {
    // Aqui você pode implementar a lógica para aplicar a penalidade de -1 na defesa no próximo turno
    console.log(this.penalidade);
  },
  restaurarStamina: function () {
    // Função para restaurar a Stamina (caso necessário no jogo)
    this.staminaMana = 6; // Você pode ajustar esse valor conforme necessário
    console.log("Stamina restaurada para:", this.staminaMana);
  },
};

// Exemplo de como usar o Guerreiro no jogo
console.log("Personagem:", guerreiro.classe);
console.log("Vida:", guerreiro.vida);
console.log("Armadura:", guerreiro.armadura);
console.log("Esquiva:", guerreiro.esquiva);

// Exemplo de uso do ataque especial do Guerreiro
const dano = guerreiro.ataqueEspecial(); // Usando o ataque especial

// Função de restaurar Stamina
guerreiro.restaurarStamina(); // Restaurando Stamina após o uso do ataque especial
