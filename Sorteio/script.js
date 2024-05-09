// Função para sortear um único número dentro do intervalo especificado
function sortearNumeroUnico() {
  // Obtém os valores de início e fim do intervalo a partir dos elementos de entrada HTML
  var inicio = parseInt(document.getElementById("inicio").value);
  var fim = parseInt(document.getElementById("fim").value);

  // Verifica se os valores de início e fim são números válidos
  if (isNaN(inicio) || isNaN(fim)) {
    // Se algum dos valores não for um número válido, exibe um alerta e interrompe a execução da função
    alert(
      "Por favor, insira um número válido para o início e o fim do intervalo."
    );
    return;
  }

  // Verifica se o valor de início é menor que o valor de fim
  if (inicio >= fim) {
    // Se o valor de início for maior ou igual ao valor de fim, exibe um alerta e interrompe a execução da função
    alert("O início do intervalo deve ser menor que o fim.");
    return;
  }

  // Gera um número aleatório dentro do intervalo especificado e o exibe no elemento HTML de resultado
  var numeroSorteado = Math.floor(Math.random() * (fim - inicio + 1)) + inicio;
  document.getElementById("resultado").innerText =
    "Número Sorteado: " + numeroSorteado;
}

// Função para sortear uma sequência de números dentro do intervalo especificado
function sortearSequencia() {
  // Obtém os valores de início e fim do intervalo a partir dos elementos de entrada HTML
  var inicio = parseInt(document.getElementById("inicio").value);
  var fim = parseInt(document.getElementById("fim").value);

  // Verifica se os valores de início e fim são números válidos
  if (isNaN(inicio) || isNaN(fim)) {
    // Se algum dos valores não for um número válido, exibe um alerta e interrompe a execução da função
    alert(
      "Por favor, insira um número válido para o início e o fim do intervalo."
    );
    return;
  }

  // Verifica se o valor de início é menor que o valor de fim
  if (inicio >= fim) {
    // Se o valor de início for maior ou igual ao valor de fim, exibe um alerta e interrompe a execução da função
    alert("O início do intervalo deve ser menor que o fim.");
    return;
  }

  // Cria uma array para armazenar a sequência de números dentro do intervalo especificado
  var sequencia = [];
  // Preenche a array com os números dentro do intervalo, começando de inicio até fim
  for (var i = inicio; i <= fim; i++) {
    sequencia.push(i);
  }

  // Embaralha a sequência de números para torná-la aleatória
  for (var i = sequencia.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = sequencia[i];
    sequencia[i] = sequencia[j];
    sequencia[j] = temp;
  }

  // Exibe a sequência sorteada no elemento HTML de resultado
  document.getElementById("resultado").innerText =
    "Sequência Sorteada: " + sequencia.join(", ");
}
