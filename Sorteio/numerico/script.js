// Função para sortear um número único dentro de um intervalo
function sortearNumeroUnico() {
  // Obtém o valor do início e do fim do intervalo a partir dos elementos de entrada
  var inicio = parseInt(document.getElementById("inicio").value);
  var fim = parseInt(document.getElementById("fim").value);

  // Verifica se os valores inseridos são válidos
  if (isNaN(inicio) || isNaN(fim)) {
    alert(
      "Por favor, insira um número válido para o início e o fim do intervalo."
    );
    return;
  }

  // Verifica se o início do intervalo é menor que o fim
  if (inicio >= fim) {
    alert("O início do intervalo deve ser menor que o fim.");
    return;
  }

  // Gera um número aleatório dentro do intervalo e exibe o resultado
  var numeroSorteado = Math.floor(Math.random() * (fim - inicio + 1)) + inicio;
  document.getElementById("resultado").innerText =
    "Número Sorteado: " + numeroSorteado;
}

// Função para sortear uma sequência de números dentro de um intervalo
function sortearSequencia() {
  // Obtém o valor do início e do fim do intervalo a partir dos elementos de entrada
  var inicio = parseInt(document.getElementById("inicio").value);
  var fim = parseInt(document.getElementById("fim").value);

  // Verifica se os valores inseridos são válidos
  if (isNaN(inicio) || isNaN(fim)) {
    alert(
      "Por favor, insira um número válido para o início e o fim do intervalo."
    );
    return;
  }

  // Verifica se o início do intervalo é menor que o fim
  if (inicio >= fim) {
    alert("O início do intervalo deve ser menor que o fim.");
    return;
  }

  // Cria uma sequência de números dentro do intervalo e a embaralha
  var sequencia = [];
  for (var i = inicio; i <= fim; i++) {
    sequencia.push(i);
  }

  for (var i = sequencia.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = sequencia[i];
    sequencia[i] = sequencia[j];
    sequencia[j] = temp;
  }

  // Exibe a sequência sorteada
  document.getElementById("resultado").innerText =
    "Sequência Sorteada: " + sequencia.join(", ");
}

// Função para criar um efeito de fogos de artifício
function createFirework() {
  // Cria um elemento para representar o foguete
  var rocket = document.createElement("div");
  rocket.className = "rocket";
  rocket.style.left = Math.random() * window.innerWidth + "px";
  document.getElementById("fireworks-container").appendChild(rocket);

  // Cria um elemento para representar a explosão
  var explosion = document.createElement("div");
  explosion.className = "explosion";
  explosion.style.left = Math.random() * window.innerWidth + "px";
  explosion.style.backgroundColor = randomColor(); // Define uma cor aleatória para a explosão
  document.getElementById("fireworks-container").appendChild(explosion);

  // Remove os elementos após a animação
  setTimeout(function () {
    rocket.remove();
    explosion.remove();
  }, 2000);
}

// Função para gerar uma cor aleatória em formato hexadecimal
function randomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Chama a função createFirework a cada 2 segundos para criar o efeito contínuo de fogos de artifício
setInterval(createFirework, 2000);
