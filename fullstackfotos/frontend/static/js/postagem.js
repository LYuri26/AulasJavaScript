(function () {
  // Define as funções no escopo global
  window.openModal = openModal;
  window.likeImage = likeImage;
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

    // Carrega a quantidade de curtidas ao abrir o modal
    loadLikesCount(postId, function (likes) {
      // Atualiza o número de curtidas exibido no HTML
      var likesElement = document.getElementById("likesCount1");
      likesElement.textContent = likes;
    });
  }

  // Definição da função closeModal
  function closeModal(modalId) {
    var modalWrapper = document.getElementById("myModal" + modalId);
    modalWrapper.style.display = "none";
    location.reload(); // Recarrega a página ao fechar o modal
  }

  // Definição da função likeImage
  function likeImage(event) {
    var postId = document
      .getElementById("myModal1")
      .getAttribute("data-post-id");
    like(postId, function (likes) {
      // Atualiza o número de curtidas no botão de "Curtir"
      var likeButton = document.getElementById("likeButton1");
      likeButton.textContent = "Curtir " + likes;
    });
  }

  // Função para enviar um like para o servidor
  function like(postId) {
    console.log("ID da postagem:", postId); // Imprime o ID da postagem no console

    // Realiza uma solicitação AJAX para enviar o like para o servidor
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "../../../backend/processar_like.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          try {
            // Tentar analisar a resposta JSON
            var response = JSON.parse(xhr.responseText);
            if (response.success) {
              // Atualiza o número de curtidas exibido no HTML
              var likesElement = document.getElementById("likesCount1");
              likesElement.textContent = response.likes;
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
    // Envia os parâmetros postId e action corretamente
    xhr.send("postId=" + postId + "&action=like");
  }

  // Função para carregar o número de curtidas ao carregar a página
  function loadLikesCount(postId, callback) {
    // Realiza uma solicitação AJAX para carregar o número de curtidas da postagem
    var xhr = new XMLHttpRequest();
    xhr.open(
      "GET",
      "../../../backend/processar_like.php?postId=" + postId,
      true
    );
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          try {
            // Tentar analisar a resposta JSON
            var response = JSON.parse(xhr.responseText);
            if (response.success) {
              // Obter o total de curtidas para o postId específico
              var likes = response.likes[postId] || 0;
              // Executa a função de retorno com o número total de curtidas
              callback(likes);
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
})();
