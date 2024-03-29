// Função para enviar uma ação de like (curtir/descurtir) para o servidor
function sendLike(postId, isLike) {
  var action = isLike ? "like" : "unlike";

  // Enviar uma requisição AJAX para o servidor
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "../../../backend/processar_like_curtidas.php", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        try {
          // Tentar analisar a resposta JSON
          var response = JSON.parse(xhr.responseText);
          if (!response.success) {
            console.log("Erro ao processar o like: " + response.message);
          } else {
            console.log("Like processado com sucesso.");
            // Atualizar o número de curtidas na interface do usuário, se necessário
            if (typeof updateLikesUI === "function") {
              updateLikesUI(postId, response.likes);
            }
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
  // Certifique-se de enviar os parâmetros postId e action corretamente
  xhr.send("postId=" + postId + "&action=" + action);
}

// Função para enviar um like para o servidor quando o botão de "Curtir" é clicado
function like(postId) {
  console.log("ID da postagem:", postId); // Imprime o ID da postagem no console
  var post = document.getElementById("post-" + postId);
  if (post) {
    var likeIcon = post.querySelector(".like-icon");

    // Verificar o estado atual do like na sessão do usuário
    var likedState = sessionStorage.getItem("likeState_" + postId);
    var liked = likedState === "liked";

    // Verificar se o usuário está removendo o like
    if (liked) {
      sendLike(postId, false); // Envia um deslike
      likeIcon.classList.remove("liked");
      likeIcon.style.fill = "#FFFFFF"; // Altera a cor do ícone de like para branco
    } else {
      sendLike(postId, true); // Envia um like
      likeIcon.classList.add("liked");
      likeIcon.style.fill = "#FF0000"; // Altera a cor do ícone de like para vermelho
    }

    // Atualizar o estado do like na sessão do usuário
    sessionStorage.setItem("likeState_" + postId, liked ? "" : "liked");
  } else {
    console.log("Post não encontrado para o postId: " + postId);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // Verificar se o usuário está logado
  isUserLoggedIn()
    .then(function (loggedIn) {
      // Selecionar os botões de curtir
      var likeIcons = document.querySelectorAll(".like-icon");

      // Verificar se os botões foram encontrados e se o usuário está logado
      if (likeIcons.length > 0 && loggedIn) {
        // Habilitar os botões de curtir
        likeIcons.forEach(function (icon) {
          icon.classList.remove("disabled");
          console.log(
            "Botão de curtir habilitado para a postagem com ID " +
              icon.id.replace("like-icon-", "")
          );
        });
      } else {
        // Desabilitar os botões de curtir se o usuário não estiver logado ou se os botões não forem encontrados
        likeIcons.forEach(function (icon) {
          icon.classList.add("disabled");
          icon.onclick = null; // Remover a função de clique
          console.log(
            "Botão de curtir desabilitado para a postagem com ID " +
              icon.id.replace("like-icon-", "")
          );
        });
      }
    })
    .catch(function (error) {
      console.error("Erro ao verificar se o usuário está logado:", error);
    });
});

// Função para carregar as curtidas das postagens ao carregar a página
window.onload = function () {
  loadLikes();
  loadComments();
};

// Função para carregar as curtidas das postagens
function loadLikes() {
  // Faz uma solicitação AJAX para o servidor para obter as curtidas
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "../../../backend/processar_like_postagens.php", true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      // Processa a resposta do servidor
      var response = JSON.parse(xhr.responseText);
      if (response.success) {
        // Atualiza as curtidas para cada postagem
        var likes = response.likes;
        for (var postId in likes) {
          if (likes.hasOwnProperty(postId)) {
            var likesCount = likes[postId];
            // Atualiza o número de curtidas no DOM
            document.getElementById("likes-" + postId).innerText = likesCount;
          }
        }
      } else {
        // Exibe uma mensagem de erro se a solicitação falhar
        console.error("Erro ao carregar curtidas:", response.message);
      }
    }
  };
  xhr.send();
}

// Adiciona um evento de clique aos botões de "curtir"
document.querySelectorAll(".like-icon").forEach(function (btn) {
  btn.addEventListener("click", function () {
    var postId = this.dataset.postId;
    // Chama a função para carregar as curtidas quando um botão de "curtir" for clicado
    loadLikes(postId);
  });
});

// Função para carregar os comentários das postagens
function loadComments() {
  // Seleciona todos os elementos de postagem
  var posts = document.querySelectorAll(".post");

  // Itera sobre cada postagem
  posts.forEach(function (post) {
    // Extrai o ID da postagem do ID do elemento
    var postId = post.id.split("-")[1];

    // Faz uma solicitação AJAX para o servidor para obter a quantidade de comentários
    var xhr = new XMLHttpRequest();
    xhr.open(
      "GET",
      "../../../backend/processar_comentario_contagem.php?postId=" + postId,
      true
    );
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        // Processa a resposta do servidor
        var response = JSON.parse(xhr.responseText);
        if (response.success) {
          // Atualiza a quantidade de comentários para a postagem específica
          var commentsCount = response.comments[postId];
          // Atualiza o número de comentários no DOM
          var commentsElement = document.getElementById("comments-" + postId);
          if (commentsElement) {
            commentsElement.innerText = commentsCount;
          } else {
            console.error(
              "Elemento de comentários não encontrado para o postId: " + postId
            );
          }
        } else {
          // Exibe uma mensagem de erro se a solicitação falhar
          console.error("Erro ao carregar comentários:", response.message);
        }
      }
    };
    xhr.send();
  });
}
