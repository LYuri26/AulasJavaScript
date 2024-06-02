// Obtém o modal
var modal = document.getElementById("modal");

// Obtém o elemento de imagem no modal
var modalImg = document.getElementById("modal-image");

// Função para abrir o modal e carregar a imagem clicada
function openModal(img) {
  modal.style.display = "block";
  modalImg.src = img.src;
}

// Função para fechar o modal
function closeModal() {
  modal.style.display = "none";
}

// Fecha o modal quando o usuário clica fora da imagem
window.onclick = function (event) {
  if (event.target === modal) {
    closeModal();
  }
};
