// Função para carregar curtidas ao carregar a página
function loadLikesOnPageLoad() {
  // Realiza uma solicitação AJAX para obter as curtidas de cada postagem
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "../../../backend/processar_like_postagens.php", true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        try {
          // Tentar analisar a resposta JSON
          var response = JSON.parse(xhr.responseText);
          if (response.success) {
            // Atualiza as curtidas exibidas no HTML para cada postagem
            updateLikes(response.likes);
          } else {
            console.log("Erro ao obter as curtidas: " + response.message);
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

// Função para processar o like
function like(postId) {
  // Realiza uma solicitação AJAX para processar o like ou deslike
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "../../../backend/processar_like_postagens.php", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        try {
          // Tentar analisar a resposta JSON
          var response = JSON.parse(xhr.responseText);
          if (response.success) {
            // Atualiza a contagem de curtidas na página
            var likesSpan = document.getElementById("likes_" + postId);
            if (likesSpan) {
              likesSpan.textContent = response.likes;
            }
            // Atualiza localmente o campo de curtidas
            var likeIcon = document.querySelector(
              ".like-icon[data-postid='" + postId + "']"
            );
            var likesCount = document.querySelector(
              ".likes[data-postid='" + postId + "']"
            );
            if (likeIcon && likesCount) {
              likesCount.textContent = response.likes;
            }
          } else {
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
  xhr.send("postId=" + postId + "&action=like"); // Envia o ID da postagem e a ação de like
}

// Evento que aguarda o carregamento do conteúdo da página
document.addEventListener("DOMContentLoaded", function () {
  loadLikesOnPageLoad();
});

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
