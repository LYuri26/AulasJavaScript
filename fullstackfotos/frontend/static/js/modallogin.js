document.addEventListener("DOMContentLoaded", function () {
  var modal = document.getElementById("loginModal");
  if (modal) {
    var btn = document.getElementById("openModalBtn");
    if (btn) {
      var span = document.querySelector(".modal-content .close");
      var cancelBtn = document.querySelector(".modal-content .cancelbtn");

      btn.addEventListener("click", function () {
        modal.style.display = "block";
      });

      span.addEventListener("click", function () {
        modal.style.display = "none";
      });

      cancelBtn.addEventListener("click", function () {
        modal.style.display = "none";
      });

      window.addEventListener("click", function (event) {
        if (event.target === modal) {
          modal.style.display = "none";
        }
      });

      var form = document.querySelector("form");
      if (form) {
        form.addEventListener("submit", function (event) {
          var usernameInput = document.getElementById("username");
          var passwordInput = document.getElementById("password");

          if (
            usernameInput.value.trim() === "" ||
            passwordInput.value.trim() === ""
          ) {
            event.preventDefault();
            usernameInput.classList.add("invalid");
            passwordInput.classList.add("invalid");
            return;
          }

          usernameInput.classList.remove("invalid");
          passwordInput.classList.remove("invalid");
        });
      }
    }
  }
});

// Função para verificar se o usuário está logado consultando o servidor
async function isUserLoggedIn() {
  try {
    const response = await fetch("../../../backend/auth.php");
    if (response.ok) {
      const responseData = await response.text(); // Obter o texto da resposta
      console.log("Conteúdo da resposta:", responseData); // Exibir o conteúdo da resposta no console
      const data = JSON.parse(responseData);
      const loggedIn = data.logged_in;
      return loggedIn;
    } else {
      console.error("Erro ao verificar o status de login:", response.status);
      return false;
    }
  } catch (error) {
    console.error("Erro ao verificar o status de login:", error);
    return false;
  }
}

// Função para abrir o modal de login
function openLoginModal() {
  var modal = document.getElementById("loginModal");
  if (modal) {
    modal.style.display = "block";
  }
}

// Função para abrir o modal de imagem para uma postagem específica
function openModalForPost(postId) {
  // Aqui você pode implementar a lógica para abrir o modal de imagem com base no postId
  console.log("Abrindo modal de imagem para a postagem com o ID:", postId);
}



// Função para manipular o clique no botão de ação
async function handleActionClick(postId) {
  const loggedIn = await isUserLoggedIn();
  if (!loggedIn) {
    openLoginModal();
    return; // Retorna aqui para evitar que o restante do código seja executado
  }

  // Lógica para abrir o modal de imagem
  openModalForPost(postId);
}

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
