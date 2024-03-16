// Função para abrir o modal apenas se o usuário estiver logado
async function openModal(imagePath, postId) {
  // Verificar se o usuário está logado
  const loggedIn = await isUserLoggedIn();
  if (!loggedIn) {
    console.log("Usuário não está logado. Não é possível abrir o modal.");
    return; // Não abre o modal se o usuário não estiver logado
  }

  var modal = document.getElementById("myModalPost");
  var modalImage = document.getElementById("modalImage");
  if (modalImage) {
    modalImage.src = imagePath;
    modalImage.dataset.postId = postId; // Definir o ID da postagem como um atributo de dados
    modal.style.display = "block";

    // Atualizar o conteúdo do modal
    likeModal();
  } else {
    console.error("Elemento modalImage não encontrado.");
  }
}

// Função para fechar o modal e recarregar a página
function closeModal() {
  document.getElementById("myModalPost").style.display = "none";
  location.reload(); // Recarrega a página
}
