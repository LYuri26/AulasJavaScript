// Definindo o personagem Ladino
const ladino = {
  classe: "Ladino",
  nome: "Mulher Gato",
  vida: 25,
  danoBase: 2,
  armadura: 2,
  esquiva: 5,
  peso: 1,
  staminaMana: 6,
  dadoEspecial: "D10 extra no ataque (se não foi atacado)", // Representa o dado extra que o Ladino usa no ataque
  custo: 3, // Custo de Stamina
  maxUsos: 2, // Quantas vezes o Ladino pode usar a habilidade especial
  usosRestantes: 2, // Contador de usos restantes para a habilidade especial
  ataqueEspecial: function () {
    // Verifica se o Ladino ainda pode usar a habilidade especial
    if (this.usosRestantes <= 0) {
      console.log("O Ladino não pode mais usar o ataque especial.");
      return 0;
    }

    // Verifica se o Ladino foi atacado antes de usar a habilidade especial
    if (!this.foiAtacado) {
      // Se não foi atacado, faz o ataque com dado extra (D10)
      const dadoD10 = Math.floor(Math.random() * 10) + 1;
      const danoTotal = this.danoBase + dadoD10;
      console.log("Dano do ataque especial:", danoTotal);

      // Decrementa a Stamina após o uso do ataque especial
      this.staminaMana -= this.custo;
      console.log("Stamina restante:", this.staminaMana);

      // Decrementa os usos restantes da habilidade
      this.usosRestantes--;
      console.log("Usos restantes do ataque especial:", this.usosRestantes);

      // Marca que o Ladino foi atacado para não usar a habilidade especial imediatamente após
      this.foiAtacado = true;

      return danoTotal;
    } else {
      console.log(
        "O Ladino não pode usar a habilidade especial após ser atacado."
      );
      return 0;
    }
  },
  restaurarStamina: function () {
    // Função para restaurar a Stamina (caso necessário no jogo)
    this.staminaMana = 6;
    console.log("Stamina restaurada para:", this.staminaMana);
  },
  resetarAtaqueEspecial: function () {
    // Função para resetar a condição de ataque especial após um turno
    this.foiAtacado = false;
    console.log(
      "O Ladino pode usar novamente a habilidade especial no próximo turno."
    );
  },
  foiAtacado: false, // Verifica se o Ladino foi atacado antes de usar a habilidade
};

// Exemplo de como usar o Ladino no jogo
console.log("Personagem:", ladino.classe);
console.log("Vida:", ladino.vida);
console.log("Armadura:", ladino.armadura);

// Exemplo de uso do ataque especial do Ladino
const danoLadino = ladino.ataqueEspecial(); // Usando a habilidade especial

// Função de restaurar Stamina
ladino.restaurarStamina(); // Restaurando Stamina após o uso do ataque especial

// Função de resetar o status de ataque especial
ladino.resetarAtaqueEspecial(); // Resetando o status para permitir o uso da habilidade no próximo turno
