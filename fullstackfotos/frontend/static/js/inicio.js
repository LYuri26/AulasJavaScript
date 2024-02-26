// Função para carregar curtidas e comentários do servidor
function loadLikesAndComments() {
  // Realiza uma solicitação AJAX para obter os likes do servidor
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "../../../backend/processar_like.php", true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        try {
          // Tentar analisar a resposta JSON
          var response = JSON.parse(xhr.responseText);
          if (response.success) {
            // Atualiza os likes e comentários exibidos no HTML
            updateLikes(response.likes);
            updateComments(response.comments);
          } else {
            console.log("Erro ao obter os likes e comentários: " + response.message);
          }
        } catch (error) {
          console.log("Erro ao analisar resposta JSON: " + error);
          console.log("Resposta JSON inválida: " + xhr.responseText);
        }
      } else {
        console.log("Erro na requisição AJAX: " + xhr.status);
      }
    }
  };
  xhr.send();
}

// Função para enviar um like para o servidor
function sendLike(postId, isLike) {
  var action = isLike ? "like" : "unlike";

  // Enviar uma requisição AJAX para o servidor
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "../../../backend/processar_like.php", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        try {
          // Tentar analisar a resposta JSON
          var response = JSON.parse(xhr.responseText);
          if (!response.success) {
            console.log("Erro ao processar o like: " + response.message);
          }
        } catch (error) {
          console.log("Erro ao analisar resposta JSON: " + error);
          console.log("Resposta JSON inválida: " + xhr.responseText);
        }
      } else {
        console.log("Erro na requisição AJAX: " + xhr.status);
      }
    }
  };
  xhr.send("postId=" + postId + "&action=" + action);
}

// Função para atualizar os likes exibidos no HTML
function updateLikes(likes) {
  // Itera sobre os elementos .likes e atualiza o conteúdo com os likes fornecidos
  var likeElements = document.querySelectorAll(".likes");
  likeElements.forEach(function (element) {
    element.textContent = likes;
  });
}

// Função para atualizar os comentários exibidos no HTML
function updateComments(comments) {
  // Limpa a lista de comentários
  var commentsList = document.getElementById("comments-list");
  commentsList.innerHTML = "";

  // Adiciona cada comentário na lista
  for (var i = 0; i < comments.length; i++) {
    var comment = comments[i];
    var commentElement = document.createElement("li");
    commentElement.textContent = comment.author + ": " + comment.text;
    commentsList.appendChild(commentElement);
  }
}

// Função para incrementar o número de likes da imagem relacionada ao ícone clicado
function like(postId) {
  var post = document.getElementById("post-" + postId);
  if (post) {
    var likeIcon = post.querySelector(".like-icon");
    var likesElement = post.querySelector(".likes");
    var likeCount = parseInt(likesElement.textContent);

    // Verificar se o ícone já foi clicado
    var liked = likeIcon.classList.contains("liked");

    // Atualizar o número de likes localmente
    if (!liked) {
      likeCount++;
      likeIcon.classList.add("liked");
      likeIcon.style.fill = "#FF0000"; // Altera a cor do ícone de like para vermelho
    } else {
      likeCount--;
      likeIcon.classList.remove("liked");
      likeIcon.style.fill = "#FFFFFF"; // Altera a cor do ícone de like para branco
    }

    likesElement.textContent = likeCount; // Atualiza o número de likes exibido no HTML

    // Enviar um like para o servidor
    sendLike(postId, !liked); // O segundo argumento indica se o like está sendo adicionado ou removido
  } else {
    console.log("Post não encontrado para o postId: " + postId);
  }
}

// Função para enviar um like para o servidor
function sendLike(postId, isLike) {
  var action = isLike ? "like" : "unlike";

  // Enviar uma requisição AJAX para o servidor
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "../../../backend/processar_like.php", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        try {
          // Tentar analisar a resposta JSON
          var response = JSON.parse(xhr.responseText);
          if (!response.success) {
            console.log("Erro ao processar o like: " + response.message);
          }
        } catch (error) {
          console.log("Erro ao analisar resposta JSON: " + error);
        }
      } else {
        console.log("Erro na requisição AJAX: " + xhr.status);
      }
    }
  };
  xhr.send("postId=" + postId + "&action=" + action);
}

// Função para abrir o modal de comentário
function openCommentModal(postId) {
  // Implemente o código para abrir o modal de comentário aqui
  console.log("Abrindo modal de comentário para a postagem " + postId);
}

// Evento que aguarda o carregamento do conteúdo da página
document.addEventListener("DOMContentLoaded", function () {
  // Chama a função para carregar curtidas e comentários
  loadLikesAndComments();

  // Adiciona um ouvinte de evento ao botão "Sair"
  var logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
      // Requisição AJAX para encerrar a sessão
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "../pages/logout.php", true);
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
          // Recarrega a página após o logout
          window.location.reload();
        }
      };
      xhr.send();
    });
  }

  // Abre o modal de login ao clicar no botão "Login"
  var openModalBtn = document.getElementById("openModalBtn");
  if (openModalBtn) {
    openModalBtn.addEventListener("click", function () {
      var loginModal = document.getElementById("loginModal");
      if (loginModal) {
        loginModal.style.display = "block";
      }
    });
  }
});
