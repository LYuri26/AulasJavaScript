// Função para abrir o modal apenas se o usuário estiver logado
async function openModal(imagePath) {
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
    modal.style.display = "block";
  } else {
    console.error("Elemento modalImage não encontrado.");
  }
}

// Função para fechar o modal
function closeModal() {
  document.getElementById("myModal1").style.display = "none";
}

// Função para aumentar o contador de curtidas dentro do modal
function likeModal() {
  // Verificar se o usuário está logado antes de aumentar o contador
  const loggedIn = isUserLoggedIn();
  if (!loggedIn) {
    console.log("Usuário não está logado. Não é possível adicionar curtida.");
    return;
  }

  var likesCount = document.getElementById("likesCount1");
  likesCount.innerText = parseInt(likesCount.innerText) + 1;
}

// Função para aumentar o contador de comentários dentro do modal
function commentModal() {
  var commentsCount = document.getElementById("commentsCount1");
  commentsCount.innerText = parseInt(commentsCount.innerText) + 1;
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
