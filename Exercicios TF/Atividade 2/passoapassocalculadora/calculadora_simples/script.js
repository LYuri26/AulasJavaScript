let entrada = ""; // Variável para armazenar os números e operações

function adicionarEntrada(valor) {
  // Adiciona números ou o sinal de soma à entrada
  entrada += valor;
  atualizarDisplay();
}

function calcularResultado() {
  // Calcula o resultado de uma expressão de soma
  const display = document.getElementById("display");
  try {
    const resultado = eval(entrada); // Avalia a soma
    entrada = resultado.toString();
    atualizarDisplay();
  } catch {
    // Em caso de erro, apenas limpa a entrada
    limparEntrada();
  }
}

function limparEntrada() {
  entrada = ""; // Reseta a entrada
  atualizarDisplay();
}

function atualizarDisplay() {
  const display = document.getElementById("display");
  display.textContent = entrada || "0"; // Mostra 0 se vazio
}
