// calculoPontuacao.js

// Função para calcular a pontuação com base nas respostas do questionário
function calcularPontuacao() {
  // Objeto para armazenar as pontuações para cada categoria de livro
  const pontuacao = {
    Fantasia: 0,
    "Ficção Científica / Distopia": 0,
    Romance: 0,
    "Drama / Realismo": 0,
    "Outros (Biografia / Histórico)": 0,
    "Outros (Clássico)": 0,
    "Outros (Fantasia / Épico)": 0,
  };

  // Mapeamento das opções de resposta para as categorias
  const mapeamento = {
    A: "Fantasia",
    B: "Ficção Científica / Distopia",
    C: "Romance",
    D: "Drama / Realismo",
    E: "Outros (Biografia / Histórico)",
    F: "Outros (Clássico)",
    G: "Outros (Fantasia / Épico)",
  };

  // Define as pontuações para cada pergunta
  const pontosPergunta1 = 5; // A pergunta 1 vale 5 pontos
  const pontosPerguntas2a8 = 2; // As perguntas 2 a 8 valem 2 pontos

  // Itera sobre todas as perguntas (de 1 a 8)
  for (let i = 1; i <= 8; i++) {
    // Seleciona a resposta marcada para a pergunta atual
    const respostaSelecionada = document.querySelector(
      `input[name="q${i}"]:checked`
    );

    // Se há uma resposta selecionada
    if (respostaSelecionada) {
      // Obtém a categoria correspondente à resposta selecionada
      const categoria = mapeamento[respostaSelecionada.value];

      // Se a categoria é válida (mapeada corretamente)
      if (categoria) {
        // Adiciona a pontuação apropriada com base no número da pergunta
        if (i === 1) {
          pontuacao[categoria] += pontosPergunta1; // Pergunta 1
        } else {
          pontuacao[categoria] += pontosPerguntas2a8; // Perguntas 2 a 8
        }
      }
    }
  }

  return pontuacao;
}
