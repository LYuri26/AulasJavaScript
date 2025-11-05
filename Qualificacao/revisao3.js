const notebook = 2500;
const semanas = 5;
function somarEconomia() {
  let economiaSemana = 0;
  let valorEconomizado = 0;
  for (let j = 1; j <= 5; j++) {
    economiaSemana = parseFloat(
      prompt("Digite a economia da semana" + j + " :")
    );
    valorEconomizado = parseFloat(valorEconomizado + economiaSemana);
  }
  return valorEconomizado;
}

function media(economia, semanas) {
  return economia / semanas;
}

function comprarNotebook(economia, notebook) {
  if (economia >= notebook) {
    console.log("Parabéns! Você pode comprar o notebook.");
  } else {
    console.log("Infelizmente, você não pode comprar o notebook.");
  }
  return;
}
for (let i = 1; i <= 5; i++) {
  console.log("Economia da pessoa: " + i);
  const economia = somarEconomia();
  console.log("A economia da pessoa de numero:" + i + "é:" + economia);
  const resultadoMedia = media(economia, semanas);
  console.log("A média da pessoa de numero:" + i + "é:" + resultadoMedia);
  comprarNotebook(economia, notebook);
}
