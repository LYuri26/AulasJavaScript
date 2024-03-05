document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.post').forEach(function(post) {
      var img = post.querySelector('img');
      var postId = post.id.split('-')[1];
      img.addEventListener('click', function() {
          openModal(img.src, postId);
      });
  });
});

function openModal(imgSrc) {
  var modalWrapper = document.getElementById("myModal1"); // Usando diretamente o ID do modal
  var modalContent = document.getElementById("modalContent1"); // Usando diretamente o ID do conteúdo do modal
  modalContent.innerHTML = '<img src="' + imgSrc + '" alt="Imagem modal">';
  modalWrapper.style.display = "flex";
}

function closeModal() {
  var modalWrapper = document.getElementById("myModal1"); // Usando diretamente o ID do modal
  modalWrapper.style.display = "none";
}