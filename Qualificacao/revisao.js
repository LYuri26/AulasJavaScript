// 🦾 RINHA DE ROBÔS 🦾
console.log("=== Rinha de Robôs ===");

// -----------------------------------------------------
// Declaração de variáveis iniciais
// -----------------------------------------------------
let voltaRobo1 = 0;
let totalVoltasRobo1 = 0;
let voltaRobo2 = 0;
let totalVoltasRobo2 = 0;
let aposta = false;

// -----------------------------------------------------
// Escolha do jogador
// -----------------------------------------------------
let jogador = prompt(
  "Deseja jogar com o robô 1? ('s' para sim ou 'n' para não)"
);

if (jogador === "s") {
  console.log("Você escolheu o Robô 1!");
  aposta = true;
} else {
  console.log("Você escolheu o Robô 2!");
}

// -----------------------------------------------------
// Corrida: cada robô tenta completar 10 voltas
// -----------------------------------------------------
while (totalVoltasRobo1 < 10 && totalVoltasRobo2 < 10) {
  // Gera voltas aleatórias entre 1 e 10
  voltaRobo1 = parseInt(Math.random() * 10 + 1);
  voltaRobo2 = parseInt(Math.random() * 10 + 1);

  // Soma as voltas de cada robô
  totalVoltasRobo1 = totalVoltasRobo1 + voltaRobo1;
  totalVoltasRobo2 = totalVoltasRobo2 + voltaRobo2;

  // Evita que passem de 10 voltas
  if (totalVoltasRobo1 > 10) {
    totalVoltasRobo1 = totalVoltasRobo1 - voltaRobo1;
  }
  if (totalVoltasRobo2 > 10) {
    totalVoltasRobo2 = totalVoltasRobo2 - voltaRobo2;
  }

  // Exibe o progresso atual
  console.log("------------------------------");
  console.log("Voltas Robô 1:", totalVoltasRobo1);
  console.log("Voltas Robô 2:", totalVoltasRobo2);
}

// -----------------------------------------------------
// Resultado final da aposta
// -----------------------------------------------------
console.log("==============================");
if (aposta === true && totalVoltasRobo1 === 10) {
  console.log("🏆 Você ganhou! O Robô 1 venceu!");
} else if (aposta === true && totalVoltasRobo1 < 10) {
  console.log("❌ Você perdeu! O Robô 2 venceu!");
} else if (aposta === false && totalVoltasRobo2 === 10) {
  console.log("🏆 Você ganhou! O Robô 2 venceu!");
} else {
  console.log("❌ Você perdeu! O Robô 1 venceu!");
}
console.log("==============================");
