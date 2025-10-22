let entrada = ""; // Variável para armazenar os números e sinais digitados

function adicionarEntrada(valor) {
  // Adiciona o valor ao display
  entrada += valor;
  atualizarDisplay();
}

function limparEntrada() {
  // Limpa o display e a entrada
  entrada = "";
  atualizarDisplay();
}

function atualizarDisplay() {
  // Atualiza o texto do display com a entrada
  const display = document.getElementById("display");
  display.textContent = entrada || "Digite números e sinais";
}
