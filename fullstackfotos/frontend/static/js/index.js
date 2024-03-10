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
