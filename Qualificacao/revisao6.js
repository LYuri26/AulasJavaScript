function avaliarEnergia(energia) {
  if (energia < 30) {
    return "Nível de energia baixo. Considere descansar.";
  } else if (energia >= 30 && energia <= 70) {
    return "Nível de energia moderado. Você pode continuar suas atividades.";
  } else {
    return "Nível de energia alto. Aproveite o seu dia!";
  }
}

function voltasRobo() {
  let voltas = 0;
  for (let i = 1; i <= 10; i++) {
    console.log("Volta número:" + (voltas + 1));
    voltas += 1;
  }
  return "O robô deu um total de" + voltas + " voltas.";
}
const nivelEnergia = 70;

console.log(avaliarEnergia(nivelEnergia));

console.log(voltasRobo());
