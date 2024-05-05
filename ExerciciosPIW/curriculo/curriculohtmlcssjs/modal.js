// Chama a função para carregar o modal quando o botão de abrir for clicado
document
  .getElementById("openModalButton") // Obtém o elemento do botão de abrir modal
  .addEventListener("click", function () {
    // Desativa o botão de abrir modal para evitar múltiplos cliques
    this.disabled = true;
    // Chama a função para carregar o conteúdo do modal
    loadModalContent();
  });

// Função para carregar o conteúdo do modal e adicionar os event listeners
function loadModalContent() {
  // Realiza a requisição para carregar o conteúdo do modal.html
  fetch("modal.html")
    .then((response) => response.text()) // Converte a resposta para texto
    .then((html) => {
      // Insere o conteúdo do modal no body do documento
      document.body.insertAdjacentHTML("beforeend", html);
      // Adiciona os event listeners para o modal
      document
        .getElementById("closeModalButton") // Obtém o botão de fechar modal
        .addEventListener("click", closeModal); // Adiciona evento de clique para fechar modal
      document
        .querySelector(".modal-overlay") // Obtém a camada de fundo do modal
        .addEventListener("click", (event) => {
          // Adiciona evento de clique para fechar modal quando clicado fora do modal
          if (event.target === event.currentTarget) {
            closeModal();
          }
        });
      // Chama a função para abrir o modal
      openModal();
    })
    .catch((error) => {
      console.error("Erro ao carregar o modal:", error);
    });
}

// Função para abrir o modal
function openModal() {
  const modal = document.getElementById("modal");
  if (modal) {
    modal.style.display = "block"; // Torna o modal visível
    // Carrega o script barra.js e a biblioteca D3
    loadScript("https://d3js.org/d3.v5.min.js", () => {
      loadScript("barra.js", () => {
        // Verifica se renderizarGrafico está definida antes de chamá-la
        if (typeof renderizarGrafico === "function") {
          renderizarGrafico();
        } else {
          console.error("Função renderizarGrafico não está definida.");
        }
      });
    });
  }
}

// Função para carregar um script dinamicamente
function loadScript(scriptUrl, callback) {
  const script = document.createElement("script"); // Cria um elemento <script>
  script.src = scriptUrl; // Define o URL do script a ser carregado
  script.onload = callback; // Chama a função de callback após o carregamento do script
  document.head.appendChild(script); // Adiciona o script ao cabeçalho do documento
}

// Função para fechar o modal
function closeModal() {
  const modal = document.getElementById("modal"); // Obtém o elemento do modal
  if (modal) {
    modal.style.display = "none"; // Oculta o modal
    // Remove o conteúdo do modal do DOM
    modal.remove();
    // Ativa novamente o botão de abrir modal
    document.getElementById("openModalButton").disabled = false;
  }
}
