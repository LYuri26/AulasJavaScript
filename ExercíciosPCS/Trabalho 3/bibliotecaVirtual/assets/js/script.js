// Função para abrir o modal
function openModal() {
  // Carrega o conteúdo do modal do arquivo login.php
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      // Insere o conteúdo do modal no elemento com ID "modal"
      document.getElementById("modal").innerHTML = this.responseText;
      // Exibe o modal alterando o estilo de exibição para "flex"
      document.getElementById("modal").style.display = "flex";
    }
  };
  xhr.open("GET", "login.php", true);
  xhr.send();
}

// Função para fechar o modal
function closeModal() {
  // Oculta o modal alterando o estilo de exibição para "none"
  document.getElementById("modal").style.display = "none";
}
