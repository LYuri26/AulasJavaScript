// recomendacaoLivros.js

function processarQuestionario() {
  // Calcula a pontuação
  const pontuacao = calcularPontuacao();

  // Recomenda um livro com base na pontuação calculada
  recomendarLivro(pontuacao);
}

// Base de dados com recomendações de livros para cada categoria e intervalo de pontuação
const recomendacoes = {
  Romance: [
    {
      pontos: [10, 15],
      livro: "A Culpa é das Estrelas",
      url: "../html/livros/a-culpa-e-das-estrelas.html",
    },
  ],

  "Outros (Fantasia / Épico)": [
    {
      pontos: [10, 19],
      livro: "A Guerra dos Tronos",
      url: "../html/livros/a-guerra-dos-tronos.html",
    },
  ],
};

// Função para recomendar um livro com base na pontuação calculada
function recomendarLivro(pontuacao) {
  // Variáveis para determinar a categoria com a maior pontuação
  let categoriaFavorita = "";
  let maiorPontuacao = 0;

  // Itera sobre cada categoria para encontrar a que tem a maior pontuação
  for (const categoria in pontuacao) {
    // Se a pontuação atual é maior que a maior pontuação registrada
    if (pontuacao[categoria] > maiorPontuacao) {
      // Atualiza a maior pontuação e a categoria favorita
      maiorPontuacao = pontuacao[categoria];
      categoriaFavorita = categoria;
    }
  }

  // Inicializa a variável para armazenar a URL da recomendação de livro
  let urlLivroRecomendado = "../html/livros/nao-encontrado.html"; // Página genérica caso não encontre uma recomendação específica

  // Obtém as recomendações para a categoria favorita
  const recomendacoesCategoria = recomendacoes[categoriaFavorita];

  // Se há recomendações para a categoria favorita
  if (recomendacoesCategoria) {
    // Variáveis para armazenar a recomendação mais próxima caso nenhuma exata seja encontrada
    let recomendacaoProxima = null;
    let menorDiferenca = Infinity;

    // Itera sobre as recomendações para encontrar o livro apropriado com base na pontuação
    for (const recomendacao of recomendacoesCategoria) {
      // Se a pontuação está dentro do intervalo da recomendação atual
      if (
        maiorPontuacao >= recomendacao.pontos[0] &&
        maiorPontuacao <= recomendacao.pontos[1]
      ) {
        // Atualiza a URL da recomendação de livro
        urlLivroRecomendado = recomendacao.url;
        break; // Sai do loop após encontrar a primeira recomendação válida
      } else {
        // Calcula a diferença absoluta entre a pontuação atual e o intervalo da recomendação
        const diferencaMinima = Math.min(
          Math.abs(maiorPontuacao - recomendacao.pontos[0]),
          Math.abs(maiorPontuacao - recomendacao.pontos[1])
        );

        // Se a diferença atual é menor que a menor diferença registrada
        if (diferencaMinima < menorDiferenca) {
          // Atualiza a menor diferença e a recomendação mais próxima
          menorDiferenca = diferencaMinima;
          recomendacaoProxima = recomendacao;
        }
      }
    }

    // Se não encontramos uma recomendação exata, usamos a mais próxima
    if (
      urlLivroRecomendado === "../html/livros/nao-encontrado.html" &&
      recomendacaoProxima
    ) {
      urlLivroRecomendado = recomendacaoProxima.url;
    }
  }

  // Redireciona para a página específica do livro recomendado
  window.location.href = urlLivroRecomendado;
}
