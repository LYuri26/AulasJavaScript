// recomendacaoLivros.js

function processarQuestionario() {
  // Calcula a pontuação
  const pontuacao = calcularPontuacao();

  // Recomenda um livro com base na pontuação calculada
  recomendarLivro(pontuacao);
}

// Base de dados com recomendações de livros para cada categoria e intervalo de pontuação
const recomendacoes = {
  Fantasia: [
    {
      pontos: [10, 14],
      livro: "Harry Potter e a Pedra Filosofal",
      url: "../html/livros/harry-potter.html",
    },
    {
      pontos: [15, 19],
      livro: "Percy Jackson e o Ladrão de Raios",
      url: "../html/livros/percy-jackson.html",
    },
    {
      pontos: [20, 24],
      livro: "O Senhor dos Anéis: A Sociedade do Anel",
      url: "../html/livros/senhor-dos-aneis.html",
    },
    {
      pontos: [25, 29],
      livro: "As Crônicas de Nárnia: O Leão, a Feiticeira e o Guarda-Roupa",
      url: "../html/livros/cronicas-de-narnia.html",
    },
    {
      pontos: [30, 34],
      livro: "O Hobbit",
      url: "../html/livros/o-hobbit.html",
    },
  ],
  "Ficção Científica / Distopia": [
    {
      pontos: [10, 16],
      livro: "Jogos Vorazes",
      url: "../html/livros/jogos-vorazes.html",
    },
    {
      pontos: [17, 23],
      livro: "Divergente",
      url: "../html/livros/divergente.html",
    },
    {
      pontos: [24, 30],
      livro: "Maze Runner: Correr ou Morrer",
      url: "../html/livros/maze-runner.html",
    },
  ],
  Romance: [
    {
      pontos: [10, 15],
      livro: "A Culpa é das Estrelas",
      url: "../html/livros/a-culpa-e-das-estrelas.html",
    },
    {
      pontos: [16, 21],
      livro: "Eleanor & Park",
      url: "../html/livros/eleanor-e-park.html",
    },
    {
      pontos: [22, 27],
      livro: "A Seleção",
      url: "../html/livros/a-selecao.html",
    },
    {
      pontos: [28, 33],
      livro: "Cidades de Papel",
      url: "../html/livros/cidades-de-papel.html",
    },
  ],
  "Drama / Realismo": [
    {
      pontos: [10, 15],
      livro: "Extraordinário",
      url: "../html/livros/extraordinario.html",
    },
    {
      pontos: [16, 21],
      livro: "O Sol é Para Todos",
      url: "../html/livros/o-sol-e-para-todos.html",
    },
    {
      pontos: [22, 27],
      livro: "Eu, Você e a Garota Que Vai Morrer",
      url: "../html/livros/eu-voce-e-a-garota.html",
    },
    {
      pontos: [28, 33],
      livro: "Os 13 Porquês",
      url: "../html/livros/os-treze-porques.html",
    },
    {
      pontos: [34, 39],
      livro: "A Menina que Roubava Livros",
      url: "../html/livros/a-menina-que-roubava-livros.html",
    },
  ],
  "Outros (Biografia / Histórico)": [
    {
      pontos: [10, 19],
      livro: "O Diário de Anne Frank",
      url: "../html/livros/o-diario-de-anne-frank.html",
    },
  ],
  "Outros (Clássico)": [
    {
      pontos: [20, 29],
      livro: "O Pequeno Príncipe",
      url: "../html/livros/o-pequeno-principe.html",
    },
  ],
  "Outros (Fantasia / Épico)": [
    {
      pontos: [30, 39],
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
