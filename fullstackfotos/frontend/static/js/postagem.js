// JavaScript para manipular o modal
var likes = 0;

function openModal(imgSrc) {
  var modalWrapper = document.getElementById("myModal1");
  var modalContent = document.getElementById("modalContent1");
  modalContent.innerHTML = '<img src="' + imgSrc + '" alt="Imagem modal">';
  modalWrapper.style.display = "flex";
}

function closeModal() {
  var modalWrapper = document.getElementById("myModal1");
  modalWrapper.style.display = "none";
}

function likeImage() {
  likes++;
  document.getElementById("likesCount1").textContent = likes;
}

function submitComment() {
  var comment = document.getElementById("commentText1").value;
  console.log("Comentário enviado:", comment);
  // Aqui você pode enviar o comentário para o servidor ou fazer qualquer outra ação desejada
}

// Fechar o modal clicando fora da imagem
window.onclick = function (event) {
  var modalWrapper = document.getElementById("myModal1");
  if (event.target == modalWrapper) {
    modalWrapper.style.display = "none";
  }
};
