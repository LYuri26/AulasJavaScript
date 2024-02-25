// Função para incrementar o número de likes da imagem relacionada ao ícone clicado
function like() {
  var likeIcon = event.target;
  var post = likeIcon.closest(".post");

  if (post) {
    var likesElement = post.querySelector(".likes");
    var likeCount = parseInt(likesElement.textContent);

    if (!likeIcon.classList.contains("liked")) {
      likeCount++;
      likeIcon.classList.add("liked");
      likeIcon.style.fill = "#FF0000"; // Altera a cor do ícone de like para vermelho
    } else {
      likeCount--;
      likeIcon.classList.remove("liked");
      likeIcon.style.fill = "#FFFFFF"; // Altera a cor do ícone de like para branco
    }

    likesElement.textContent = likeCount;
  } else {
    console.log("Elemento .post não encontrado.");
  }
}

// Função para incrementar o número de likes e mudar a cor do ícone de like
function incrementLike(postId) {
  var post = document.getElementById("post-" + postId);
  if (post) {
    var likesElement = post.querySelector(".likes");
    var likeIcon = post.querySelector(".like-icon");
    if (likesElement && likeIcon) {
      if (!likeIcon.classList.contains("liked")) {
        likesElement.textContent = parseInt(likesElement.textContent) + 1;
        likeIcon.classList.add("liked");
        likeIcon.style.fill = "#C60E0E"; // Mudando a cor do ícone de like
      } else {
        likesElement.textContent = parseInt(likesElement.textContent) - 1;
        likeIcon.classList.remove("liked");
        likeIcon.style.fill = "#FFFFFF"; // Mudando a cor do ícone de like
      }
    } else {
      console.log("Elementos não encontrados para o postId: " + postId);
    }
  } else {
    console.log("Post não encontrado para o postId: " + postId);
  }
}

// Função para abrir o modal de comentário
function openCommentModal(postId) {
  // Implemente o código para abrir o modal de comentário aqui
  console.log("Abrindo modal de comentário para a postagem " + postId);
}
