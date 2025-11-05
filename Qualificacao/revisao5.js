function perguntasERespostas() {
  let pontuação = 0;
  let respostas;
  let validacao = false;
  console.log(
    "A emissão de gases do efeito estufa contribui para o aquecimento global. (V/F)"
  );
  respostas = prompt("Digite 'v' para Verdadeiro ou 'f' para Falso: ");
  switch (respostas) {
    case "v":
      console.log("Resposta correta!");
      validacao = true;
      if (validacao === true) {
        pontuação++;
      }
      break;
    case "f":
      console.log("Resposta incorreta!");
      break;
    default:
      console.log("Resposta inválida!");
  }
  console.log(
    "Reciclar plástico não traz nenhum benefício ambiental, pois ele não se decompõe. (V/F)"
  );
  respostas = prompt("Digite 'v' para Verdadeiro ou 'f' para Falso: ");
  switch (respostas) {
    case "f":
      console.log("Resposta correta!");
      validacao = true;
      if (validacao === true) {
        pontuação++;
      }
      break;
    case "v":
      console.log("Resposta incorreta!");
      break;
    default:
      console.log("Resposta inválida!");
  }
  console.log(
    "O desmatamento das florestas reduz a biodiversidade e altera o ciclo da água. (V/F)"
  );
  respostas = prompt("Digite 'v' para Verdadeiro ou 'f' para Falso: ");
  switch (respostas) {
    case "v":
      console.log("Resposta correta!");
      validacao = true;
      if (validacao === true) {
        pontuação++;
      }
      break;
    case "f":
      console.log("Resposta incorreta!");
      break;
    default:
      console.log("Resposta inválida!");
  }
  return console.log("Sua pontuação final é: " + pontuação);
}

function temperatura() {
  let valor = parseFloat(prompt("Digite a temperatura: "));
  if (valor < 15) {
    return console.log("Está frio");
  } else if (valor >= 15 && valor <= 25) {
    return console.log("Está agradável");
  } else {
    return console.log("Está quente");
  }
}
console.log("Digite a função que deseja realizar no software:");
console.log("1 -Jogo de perguntas e respostas");
console.log("2 -Verificar temperatura");
let escolha = parseInt(prompt("Escolha 1 ou 2: "));
switch (escolha) {
  case 1:
    perguntasERespostas();
    break;
  case 2:
    temperatura();
    break;
}
