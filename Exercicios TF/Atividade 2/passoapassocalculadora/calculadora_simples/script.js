let numero1 = "";
let numero2 = "";
let operacao = "";
let aguardandoSegundoNumero = false;

function adicionarEntrada(numero) {
  // Se estamos aguardando o segundo número, preenche o numero2
  if (aguardandoSegundoNumero) {
    numero2 = numero2 + numero;
  } else {
    // Caso contrário, preenche o numero1
    numero1 = numero1 + numero;
  }
  atualizarDisplay();
}

function adicionarOperacao(op) {
  // Se já houver um segundo número, faz o cálculo
  if (operacao !== "" && numero2 !== "") {
    calcularResultado();
  }
  // Define a operação
  operacao = op;
  aguardandoSegundoNumero = true;
  atualizarDisplay();
}

function calcularResultado() {
  let resultado = 0;

  // Verifica se o número2 está vazio (caso de operações com apenas 1 número)
  if (numero2 === "") {
    numero2 = numero1; // Caso contrário, repete numero1 no lugar de numero2
  }

  // Realiza o cálculo com switch case
  switch (operacao) {
    case "+":
      resultado = +numero1 + +numero2;
      break;
    default:
      alert("Operação não reconhecida");
      return;
  }

  // Exibe o resultado
  document.getElementById("display").textContent = resultado;

  // Atualiza o número1 com o resultado e reinicia o número2
  numero1 = resultado.toString();
  numero2 = "";
  aguardandoSegundoNumero = false;
}

function atualizarDisplay() {
  // Mostra o número1, a operação (+) e o número2 (se houver)
  if (aguardandoSegundoNumero) {
    document.getElementById(
      "display"
    ).textContent = `${numero1} ${operacao} ${numero2}`;
  } else {
    document.getElementById("display").textContent = numero1;
  }
}
