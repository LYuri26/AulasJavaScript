function buscarFilmes() {
  const inputSearch = document.getElementById("input-search");
  const query = inputSearch.value.trim();

  if (query === "") {
    alert("Por favor, digite o nome de um filme para pesquisar.");
    return;
  }

  const apiKey = "f02344b6"; // Substitua pelo seu próprio API key do OMDb
  const apiUrl = `http://www.omdbapi.com/?apikey=${apiKey}&s=${query}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.Response === "True") {
        exibirResultados(data.Search);
      } else {
        alert("Nenhum resultado encontrado para a busca.");
      }
    })
    .catch((error) => {
      console.error("Erro ao buscar filmes:", error);
    });
}

function exibirResultados(filmes) {
  const resultadoElement = document.getElementById("resultado");
  resultadoElement.innerHTML = "";

  filmes.forEach((filme) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const titulo = document.createElement("h3");
    titulo.textContent = filme.Title;

    const ano = document.createElement("p");
    ano.textContent = `Ano: ${filme.Year}`;

    const tipo = document.createElement("p");
    tipo.textContent = `Tipo: ${filme.Type}`;

    card.appendChild(titulo);
    card.appendChild(ano);
    card.appendChild(tipo);

    resultadoElement.appendChild(card);
  });
}
