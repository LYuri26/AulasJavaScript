(function () {
  // Define as funções no escopo global
  window.openModal = openModal;
  window.closeModal = closeModal;

  document.addEventListener("DOMContentLoaded", function () {
    // Adicionar o código restante aqui...
    document.querySelectorAll(".post").forEach(function (post) {
      var img = post.querySelector("img");
      var postId = post.id.split("-")[1];
      img.addEventListener("click", function () {
        openModal(img.src, postId);
        console.log("ID da postagem clicada:", postId);
      });
    });

    // Evento de clique fora do modal para fechá-lo
    var modalWrapper = document.getElementById("myModal1");
    modalWrapper.addEventListener("click", function (event) {
      if (event.target === modalWrapper) {
        closeModal(1); // Adicionei o argumento 1 para identificar o modal
      }
    });
  });

  // Definição da função openModal
  function openModal(imgSrc, postId) {
    var modalWrapper = document.getElementById("myModal1");
    var modalContent = document.getElementById("modalContent1");
    modalContent.innerHTML = '<img src="' + imgSrc + '" alt="Imagem modal">';
    modalWrapper.setAttribute("data-post-id", postId);
    modalWrapper.style.display = "flex";
    loadLikesCount(postId);
  }

  // Definição da função closeModal
  function closeModal(modalId) {
    var modalWrapper = document.getElementById("myModal" + modalId);
    modalWrapper.style.display = "none";
    location.reload(); // Recarrega a página ao fechar o modal
  }
})();

// Função para carregar as curtidas ao carregar a página
function loadLikesCount(postId) {
  // Realiza uma solicitação AJAX para carregar a quantidade de curtidas da postagem
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "../../../backend/processar_like.php?postId=" + postId, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        try {
          // Tentar analisar a resposta JSON
          var response = JSON.parse(xhr.responseText);
          if (response.success) {
            // Obter o número de curtidas para a postagem específica
            var likesCount = response.likes[postId] || 0;
            // Atualizar o conteúdo do elemento com o número de curtidas
            var likesCountElement = document.getElementById("likesCount1");
            likesCountElement.textContent = likesCount;
          } else {
            console.log(
              "Erro ao obter o número de curtidas: " + response.message
            );
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

// Definição da função para enviar um like para o servidor
function likeImage(event) {
  // Obtém o ID da postagem associado ao modal
  var postId = document.getElementById("myModal1").getAttribute("data-post-id");

  // Obtém o botão de curtir e o contador de likes
  var likeButtonInicio = document.querySelector(".like-icon");
  var likeButtonPostagem = document.querySelector(".action-icon-like-icon");
  var likesCountElement = document.getElementById("likesCount1");
  var likesElement = document.querySelector(".likes"); // Seleciona o span com a classe "likes"

  // Verifica se a postagem já foi curtida pelo usuário
  var alreadyLiked = likeButtonInicio.classList.contains("liked");

  // Envia uma requisição AJAX para o servidor para curtir ou descurtir a postagem
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "../../../backend/processar_like.php", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        try {
          var response = JSON.parse(xhr.responseText);
          if (response.success) {
            // Atualiza o contador de likes com o valor retornado pelo servidor
            likesCountElement.textContent = response.likes;
            likesElement.textContent = response.likes; // Atualiza o span com a classe "likes"

            // Atualiza a classe do botão de curtir para refletir o estado atual
            if (alreadyLiked) {
              likeButtonInicio.classList.remove("liked");
              likeButtonPostagem.classList.remove("liked");
            } else {
              likeButtonInicio.classList.add("liked");
              likeButtonPostagem.classList.add("liked");
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
  xhr.send(
    "postId=" + postId + "&action=" + (alreadyLiked ? "unlike" : "like")
  );
}
