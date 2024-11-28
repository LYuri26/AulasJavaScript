let entrada = ""; // Variável para armazenar os números e sinais digitados
let numero1 = 0; // Primeiro número
let numero2 = 0; // Segundo número
let operador = ""; // Operador atual
let resultado = 0; // Resultado da operação

function adicionarEntrada(valor) {
  // Adiciona o valor ao display e à entrada
  entrada += valor;
  atualizarDisplay();
}

function limparEntrada() {
  // Limpa a entrada e as variáveis
  entrada = "";
  numero1 = 0;
  numero2 = 0;
  operador = "";
  resultado = 0;
  atualizarDisplay();
}

function atualizarDisplay() {
  // Atualiza o texto do display com a entrada ou o resultado
  const display = document.getElementById("display");
  display.textContent = entrada || "Digite números e sinais";
}

// Função para adicionar um operador (+, -, *, /)
function adicionarOperacao(op) {
  if (numero1 !== 0 && numero2 !== 0) {
    // Se já houver dois números, calcula o resultado
    calcularResultado();
  }

  if (resultado !== 0) {
    // Se já houver um resultado, o resultado é considerado como o primeiro número
    numero1 = resultado;
    numero2 = 0;
    operador = op;
    entrada = `${numero1} ${operador}`;
  } else if (numero1 !== 0 && numero2 === 0) {
    operador = op;
    entrada = `${numero1} ${operador}`;
  }
  atualizarDisplay();
}

// Função para calcular o resultado
function calcularResultado() {
  // Caso a operação tenha sido realizada corretamente
  if (numero1 !== 0 && numero2 !== 0 && operador !== "") {
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
        if (numero2 === 0) {
          resultado = "Erro: Divisão por zero";
        } else {
          resultado = numero1 / numero2; // Mantém a divisão como float
        }
        break;
      default:
        resultado = "Operação inválida";
    }

    // Exibe o resultado
    const display = document.getElementById("display");
    display.textContent = resultado;

    // Reseta a entrada, mas mantém o resultado para continuar a operação
    numero1 = resultado;
    numero2 = 0;
    operador = "";
    entrada = `${resultado}`;
  }
}
