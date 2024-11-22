let entrada = ""; // Variável para armazenar a entrada do usuário

function adicionarEntrada(valor) {
  const display = document.getElementById("display");

  // Evitar múltiplos sinais consecutivos
  if (isOperador(valor) && isOperador(entrada.slice(-1))) {
    display.textContent = "Entrada inválida!";
    return;
  }

  entrada += valor;
  atualizarDisplay();
}

function calcularResultado() {
  const display = document.getElementById("display");
  try {
    // Substituir sinais para operações corretas e calcular
    const resultado = eval(entrada.replace("×", "*").replace("÷", "/"));
    entrada = resultado.toString();
    atualizarDisplay();
  } catch (e) {
    display.textContent = "Erro na operação!";
    entrada = "";
  }
}

function limparEntrada() {
  entrada = "";
  atualizarDisplay();
}

function removerUltimo() {
  entrada = entrada.slice(0, -1);
  atualizarDisplay();
}

function atualizarDisplay() {
  const display = document.getElementById("display");
  display.textContent = entrada || "0";
}

function isOperador(caractere) {
  return /[+\-*/]/.test(caractere);
}
