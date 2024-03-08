// Função para enviar uma ação de like (curtir/descurtir) para o servidor
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
          } else {
            // Atualizar o número de curtidas exibido no HTML
            updateLikes(postId, response.likes); // Aqui chama a função updateLikes com o postId correto
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

// Função para atualizar os likes exibidos no HTML
function updateLikes(likes) {
  // Iterar sobre cada postagem e atualizar os likes correspondentes
  for (var postId in likes) {
    if (likes.hasOwnProperty(postId)) {
      // Selecionar o elemento de likes correto usando o ID da postagem
      var likesElement = document.querySelector("#post-" + postId + " .likes");
      if (likesElement) {
        // Atualizar o conteúdo do elemento com o número de likes correspondente
        likesElement.textContent = likes[postId];
      }
    }
  }
}

// Função para enviar um like para o servidor quando o botão de "Curtir" é clicado
function like(postId) {
  console.log("ID da postagem:", postId); // Imprime o ID da postagem no console
  var post = document.getElementById("post-" + postId);
  if (post) {
    var likeIcon = post.querySelector(".like-icon");
    var likesElement = post.querySelector(".likes");
    var likeCount = parseInt(likesElement.textContent);

    // Verificar o estado atual do like na sessão do usuário
    var likedState = sessionStorage.getItem("likeState_" + postId);
    var liked = likedState === "liked";

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

    // Atualizar o estado do like na sessão do usuário
    sessionStorage.setItem("likeState_" + postId, liked ? "" : "liked");
  } else {
    console.log("Post não encontrado para o postId: " + postId);
  }
}

// Adiciona um ouvinte de evento a todos os botões de "Curtir"
document.addEventListener("DOMContentLoaded", function () {
  var likeButtons = document.querySelectorAll(".like-btn");
  likeButtons.forEach(function (button) {
    button.addEventListener("click", function (event) {
      // Obtém o ID da postagem associada ao botão de "Curtir" clicado
      var postId = event.target.dataset.postId;
      // Envia uma curtida para a postagem
      like(postId);
    });
  });

  // Recuperar o estado dos likes da sessão do usuário e atualizar a interface
  for (var i = 0; i < sessionStorage.length; i++) {
    var key = sessionStorage.key(i);
    if (key.startsWith("likeState_")) {
      var postId = key.substring(10); // Remove "likeState_" do início da chave
      var liked = sessionStorage.getItem(key) === "liked";
      var likeIcon = document.querySelector("#post-" + postId + " .like-icon");
      if (likeIcon) {
        if (liked) {
          likeIcon.classList.add("liked");
          likeIcon.style.fill = "#FF0000"; // Altera a cor do ícone de like para vermelho
        } else {
          likeIcon.classList.remove("liked");
          likeIcon.style.fill = "#FFFFFF"; // Altera a cor do ícone de like para branco
        }
      }
    }
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // Verificar se o usuário está logado
  isUserLoggedIn().then(function(loggedIn) {
    // Selecionar o botão de curtir
    var likeIcon = document.querySelector(".like-icon");

    // Verificar se o botão foi encontrado e se o usuário está logado
    if (likeIcon && loggedIn) {
      console.log("Botão de curtir habilitado.");
    } else {
      // Desabilitar o botão se o usuário não estiver logado ou o botão não for encontrado
      if (likeIcon) {
        likeIcon.onclick = null; // Remover a função de clique
        console.log("Botão de curtir desabilitado.");
      } else {
        console.log("Botão de curtir não encontrado.");
      }
    }
  }).catch(function(error) {
    console.error("Erro ao verificar se o usuário está logado:", error);
  });
});
