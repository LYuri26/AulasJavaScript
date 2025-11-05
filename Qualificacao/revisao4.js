let palpite = 0;
let continuar;
let total = 0;
function sortearNumero() {
  let numeroSorteado = parseInt(Math.random() * 10 + 1);
  return numeroSorteado;
}
function verificarPalpite(palpite, numero) {
  let pontos = 0;
  if (palpite !== numero) {
    console.log("Número incorreto! Tente novamente.");
    pontos--;
    return parseInt(pontos);
  } else {
    console.log("Parabéns! Você acertou o número." + numero);
    pontos = pontos + 5;
    return parseInt(pontos);
  }
}
let numero = sortearNumero();
while (continuar !== "n") {
  while (palpite !== numero) {
    palpite = parseInt(prompt("Digite um número entre 1 e 10: "));
    const pontuacaoFinal = verificarPalpite(palpite, numero);
    total = parseInt(total + pontuacaoFinal);
    console.log("Sua pontuação final é:" + total);
  }
  continuar = prompt("Deseja continuar jogando? (s/n)");
  numero = sortearNumero();
}
console.log("Obrigado por jogar! Sua pontuação total foi: " + total);
