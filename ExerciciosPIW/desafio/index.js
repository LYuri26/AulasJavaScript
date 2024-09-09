// Array com as respostas corretas (indexadas a partir de 0)
const respostasCorretas = [0, 0, 1, 0, 0, 0, 1, 1, 0, 0];

function embaralharArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function verificarRespostas() {
  const perguntas = document.querySelectorAll(".pergunta");
  let respostasSelecionadas = [];

  // Iterar sobre cada pergunta e coletar as respostas selecionadas
  perguntas.forEach((pergunta, index) => {
    const respostaSelecionada = pergunta.querySelector(
      'input[type="radio"]:checked'
    );
    if (respostaSelecionada) {
      respostasSelecionadas[index] = parseInt(respostaSelecionada.value);
    } else {
      alert(`Por favor, responda a pergunta ${index + 1}.`);
      return;
    }
  });

  // Contar o número de respostas corretas
  let respostasCorretasContadas = 0;
  respostasSelecionadas.forEach((resposta, index) => {
    if (resposta === respostasCorretas[index]) {
      respostasCorretasContadas++;
    }
  });

  // Calcular a pontuação
  const pontuacao =
    (respostasCorretasContadas / respostasCorretas.length) * 100;

  // Armazenar a pontuação no localStorage
  localStorage.setItem("pontuacao", respostasCorretasContadas);

  // Redirecionar para a página de resultados
  window.location.href = "resultados.html";
}

function embaralharRespostas() {
  const perguntas = document.querySelectorAll(".pergunta");
  perguntas.forEach((pergunta) => {
    const respostas = Array.from(
      pergunta.querySelectorAll('input[type="radio"]')
    );
    embaralharArray(respostas);
    respostas.forEach((resposta) => {
      resposta.parentElement.parentElement.appendChild(resposta.parentElement);
    });
  });
}

// Embaralhar as respostas quando a página carregar
document.addEventListener("DOMContentLoaded", embaralharRespostas);
