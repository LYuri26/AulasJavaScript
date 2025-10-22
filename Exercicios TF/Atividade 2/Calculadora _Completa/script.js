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
  // Se já houver uma operação, faz o cálculo
  if (operacao !== "" && numero2 !== "") {
    calcularResultado();
  }
  // Define a operação
  operacao = op;
  aguardandoSegundoNumero = true;
  atualizarDisplay();
}

function limparEntrada() {
  numero1 = "";
  numero2 = "";
  operacao = "";
  aguardandoSegundoNumero = false;
  document.getElementById("display").textContent = "0";
}

function calcularResultado() {
  let resultado = 0;

  // Verifica se o número2 está vazio (caso de operações com apenas 1 número)
  if (numero2 === "") {
    numero2 = numero1; // Caso contrário, repete numero1 no lugar de numero2
  }

  // Realiza o cálculo sem o uso de parseFloat
  if (operacao === "+") {
    resultado = +numero1 + +numero2;
  } else if (operacao === "-") {
    resultado = +numero1 - +numero2;
  } else if (operacao === "*") {
    resultado = +numero1 * +numero2;
  } else if (operacao === "/") {
    if (numero2 === "0") {
      alert("Erro: divisão por zero");
      return;
    } else {
      resultado = +numero1 / +numero2;
    }
  }

  // Exibe o resultado
  document.getElementById("display").textContent = resultado;

  // Atualiza o número1 com o resultado e reinicia o número2 e operação
  numero1 = resultado.toString();
  numero2 = "";
  operacao = "";
  aguardandoSegundoNumero = false;
}

function atualizarDisplay() {
  // Mostra o número1, a operação e o número2 (se houver)
  if (aguardandoSegundoNumero) {
    document.getElementById(
      "display"
    ).textContent = `${numero1} ${operacao} ${numero2}`;
  } else {
    document.getElementById("display").textContent = numero1;
  }
}
