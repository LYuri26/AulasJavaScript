// Função para abrir o modal apenas se o usuário estiver logado
async function openModal(imagePath, postId) {
  // Verificar se o usuário está logado
  const loggedIn = await isUserLoggedIn();
  if (!loggedIn) {
    console.log("Usuário não está logado. Não é possível abrir o modal.");
    return; // Não abre o modal se o usuário não estiver logado
  }

  var modal = document.getElementById("myModal1");
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

// Função para fechar o modal
function closeModal() {
  document.getElementById("myModal1").style.display = "none";
}

async function likeModal() {
  // Verificar se o usuário está logado antes de aumentar o contador
  const loggedIn = await isUserLoggedIn();
  if (!loggedIn) {
    console.log("Usuário não está logado. Não é possível adicionar curtida.");
    return;
  }

  var modalImage = document.getElementById("modalImage");
  var postId = modalImage.dataset.postId; // Obter o ID da postagem do atributo de dados
  if (postId) {
    console.log("ID da imagem:", postId);

    try {
      // Enviar uma solicitação ao servidor para obter os likes para o ID da postagem
      const response = await fetch(
        `../../../backend/processar_like_postagens.php?id=${postId}`
      );
      if (response.ok) {
        const responseData = await response.json();
        if (responseData.success) {
          const likes = responseData.likes[postId];
          console.log("Likes:", likes);

          // Atualizar o elemento HTML com o número de curtidas
          var likesCountElement = document.getElementById("likesCount1");
          likesCountElement.innerText = likes;
          // Mostrar o elemento
          likesCountElement.style.display = "inline";
        } else {
          console.error("Erro ao obter os likes:", responseData.message);
        }
      } else {
        console.error("Erro ao obter os likes:", response.status);
      }
    } catch (error) {
      console.error("Erro ao obter os likes:", error);
    }
  } else {
    console.log("ID da imagem não encontrado.");
  }
}

// Função para aumentar o contador de comentários dentro do modal
function commentModal() {
  var commentsCount = document.getElementById("commentsCount1");
  commentsCount.innerText = parseInt(commentsCount.innerText) + 1;
}

// Função para adicionar like
function like() {
  // Coloque aqui a lógica para adicionar o like
  console.log("Like adicionado!");
}

// Evento de clique no documento inteiro para fechar o modal ao clicar fora dele
document.addEventListener("click", function (event) {
  var modal = document.getElementById("myModal1");
  if (event.target === modal) {
    closeModal();
  }
});

// Função para verificar se o usuário está logado consultando o servidor
async function isUserLoggedIn() {
  try {
    const response = await fetch("../../../backend/auth.php");
    if (response.ok) {
      const responseData = await response.text();
      const data = JSON.parse(responseData);
      return data.logged_in;
    } else {
      console.error("Erro ao verificar o status de login:", response.status);
      return false;
    }
  } catch (error) {
    console.error("Erro ao verificar o status de login:", error);
    return false;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  var likeIcon = document.querySelector(".action-icon-like-icon");
  likeIcon.addEventListener("click", likeModal);
});