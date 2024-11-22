// Variáveis para armazenar os números e a operação
let numero1 = null;
let numero2 = null;
let operador = null;

// Função para adicionar o número 2 ou 6 ao cálculo
function adicionarNumero(num) {
  // Se o primeiro número não foi escolhido, define-o
  if (numero1 === null) {
    numero1 = num;
  } else {
    // Se o primeiro número foi escolhido, define o segundo número
    numero2 = num;
  }
  atualizarDisplay();
}

// Função para adicionar a operação (soma, subtração, etc.)
function adicionarOperacao(op) {
  if (numero1 !== null && numero2 === null) {
    operador = op; // Defina a operação se o primeiro número foi escolhido
  }
  atualizarDisplay();
}

// Função para calcular o resultado da operação
function calcularResultado() {
  if (numero1 !== null && numero2 !== null && operador !== null) {
    let resultado;

    // Realiza a operação com base no operador
    switch (operador) {
      case "+":
        resultado = numero1 + numero2;
        break;
      case "-":
        resultado = numero1 - numero2;
        break;
      case "*":
        resultado = numero1 * numero2;
        break;
      case "/":
        resultado =
          numero2 !== 0 ? numero1 / numero2 : "Erro: Divisão por zero";
        break;
      default:
        resultado = "Operação inválida";
    }

    // Atualiza o display com o resultado
    const display = document.getElementById("display");
    display.textContent = `${numero1} ${operador} ${numero2} = ${resultado}`;
  }
}

// Função para limpar a entrada
function limparEntrada() {
  numero1 = null;
  numero2 = null;
  operador = null;
  atualizarDisplay();
}

// Função para atualizar o display com os números e operação atuais
function atualizarDisplay() {
  const display = document.getElementById("display");

  if (numero1 === null) {
    display.textContent = "Escolha os números e operação";
  } else if (numero2 === null) {
    display.textContent = `${numero1} ${operador || ""}`;
  } else {
    display.textContent = `${numero1} ${operador} ${numero2}`;
  }
}
