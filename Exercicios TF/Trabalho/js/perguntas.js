function calcularPontuacao() {
  // Objeto para armazenar as pontuações para cada categoria de livro
  const pontuacao = {
      "Fantasia": 0,
      "Ficção Científica / Distopia": 0,
      "Romance": 0,
      "Drama / Realismo": 0,
      "Outros (Biografia / Histórico)": 0,
      "Outros (Clássico)": 0,
      "Outros (Fantasia / Épico)": 0
  };

  // Mapeamento das opções de resposta para as categorias
  const mapeamento = {
      "A": "Fantasia",
      "B": "Ficção Científica / Distopia",
      "C": "Romance",
      "D": "Drama / Realismo",
      "E": "Outros (Biografia / Histórico)",
      "F": "Outros (Clássico)",
      "G": "Outros (Fantasia / Épico)"
  };

  // Define as pontuações para cada pergunta
  const pontosPergunta1 = 5; // A pergunta 1 vale 5 pontos
  const pontosPerguntas2a8 = 2; // As perguntas 2 a 8 valem 2 pontos

  // Itera sobre todas as perguntas (de 1 a 8)
  for (let i = 1; i <= 8; i++) {
      // Seleciona a resposta marcada para a pergunta atual
      const respostaSelecionada = document.querySelector(`input[name="q${i}"]:checked`);

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

  // Base de dados com recomendações de livros para cada categoria e intervalo de pontuação
  const recomendacoes = {
      "Fantasia": [
          { pontos: [10, 15], livro: "Harry Potter e a Pedra Filosofal", url: "../html/livros/harry-potter.html" },
          { pontos: [16, 21], livro: "Percy Jackson e o Ladrão de Raios", url: "../html/livros/percy-jackson.html" },
          { pontos: [22, 27], livro: "O Senhor dos Anéis: A Sociedade do Anel", url: "../html/livros/senhor-dos-aneis.html" },
          { pontos: [28, 33], livro: "As Crônicas de Nárnia: O Leão, a Feiticeira e o Guarda-Roupa", url: "../html/livros/cronicas-de-narnia.html" },
          { pontos: [34, 39], livro: "O Hobbit", url: "../html/livros/o-hobbit.html" }
      ],
      "Ficção Científica / Distopia": [
          { pontos: [10, 15], livro: "Jogos Vorazes", url: "../html/livros/jogos-vorazes.html" },
          { pontos: [16, 21], livro: "Divergente", url: "../html/livros/divergente.html" },
          { pontos: [22, 27], livro: "Maze Runner: Correr ou Morrer", url: "../html/livros/maze-runner.html" }
      ],
      "Romance": [
          { pontos: [10, 15], livro: "A Culpa é das Estrelas", url: "../html/livros/a-culpa-e-das-estrelas.html" },
          { pontos: [16, 21], livro: "Eleanor & Park", url: "../html/livros/eleanor-e-park.html" },
          { pontos: [22, 27], livro: "A Seleção", url: "../html/livros/a-selecao.html" },
          { pontos: [28, 33], livro: "Cidades de Papel", url: "../html/livros/cidades-de-papel.html" }
      ],
      "Drama / Realismo": [
          { pontos: [10, 15], livro: "Extraordinário", url: "../html/livros/extraordinario.html" },
          { pontos: [16, 21], livro: "O Sol é Para Todos", url: "../html/livros/o-sol-e-para-todos.html" },
          { pontos: [22, 27], livro: "Eu, Você e a Garota Que Vai Morrer", url: "../html/livros/eu-voce-e-a-garota.html" },
          { pontos: [28, 33], livro: "Os 13 Porquês", url: "../html/livros/os-treze-porques.html" },
          { pontos: [34, 39], livro: "A Menina que Roubava Livros", url: "../html/livros/a-menina-que-roubava-livros.html" }
      ],
      "Outros (Biografia / Histórico)": [
          { pontos: [10, 19], livro: "O Diário de Anne Frank", url: "../html/livros/o-diario-de-anne-frank.html" }
      ],
      "Outros (Clássico)": [
          { pontos: [20, 29], livro: "O Pequeno Príncipe", url: "../html/livros/o-pequeno-principe.html" }
      ],
      "Outros (Fantasia / Épico)": [
          { pontos: [30, 39], livro: "A Guerra dos Tronos", url: "../html/livros/a-guerra-dos-tronos.html" }
      ]
  };

  // Inicializa a variável para armazenar a URL da recomendação de livro
  let urlLivroRecomendado = "../html/livros/nao-encontrado.html"; // Página genérica caso não encontre uma recomendação específica

  // Obtém as recomendações para a categoria favorita
  const recomendacoesCategoria = recomendacoes[categoriaFavorita];

  // Se há recomendações para a categoria favorita
  if (recomendacoesCategoria) {
      // Itera sobre as recomendações para encontrar o livro apropriado com base na pontuação
      for (const recomendacao of recomendacoesCategoria) {
          // Se a pontuação está dentro do intervalo da recomendação atual
          if (maiorPontuacao >= recomendacao.pontos[0] && maiorPontuacao <= recomendacao.pontos[1]) {
              // Atualiza a URL da recomendação de livro
              urlLivroRecomendado = recomendacao.url;
              break; // Sai do loop após encontrar a primeira recomendação válida
          }
      }
  }

  // Redireciona para a página específica do livro recomendado
  window.location.href = urlLivroRecomendado;

  // Opcionalmente, se você quiser exibir o resultado na página antes do redirecionamento, pode usar o código abaixo:
  // const resultadoContainer = document.getElementById("resultado");
  // resultadoContainer.innerHTML = `<p>Sua categoria favorita é: <strong>${categoriaFavorita}</strong></p>
  //                                 <p>Livro recomendado: <strong><a href="${urlLivroRecomendado}">${livroRecomendado}</a></strong></p>`;
}
