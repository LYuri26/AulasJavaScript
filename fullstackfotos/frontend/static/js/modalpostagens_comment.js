// Função assíncrona para enviar um comentário
async function submitComment() {
  // Verificar se o usuário está logado antes de enviar o comentário
  const loggedIn = await isUserLoggedIn();
  if (!loggedIn) {
    console.log("Usuário não está logado. Não é possível enviar o comentário.");
    return;
  }

  // Se o usuário estiver logado, prosseguir com o envio do comentário
  var commentText = document.getElementById("commentText1").value;
  var postId = document.getElementById("modalImage").dataset.postId;
  var userId = await getUserId(); // Obter o ID do usuário logado

  // Enviar o texto do comentário para o servidor usando XMLHttpRequest
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "../../../backend/processar_comentario_envio.php", true); // Arquivo PHP que irá lidar com o armazenamento do comentário
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        // Comentário enviado com sucesso
        console.log("Comentário enviado com sucesso!");
        // Limpar a caixa de texto após o envio do comentário
        document.getElementById("commentText1").value = "";
        // Você pode adicionar aqui qualquer lógica adicional, como atualizar a contagem de comentários na página
      } else {
        // Tratar possíveis erros
        console.error("Erro ao enviar comentário: " + xhr.status);
      }
    }
  };
  xhr.send(
    "commentText=" +
      encodeURIComponent(commentText) +
      "&postId=" +
      postId +
      "&userId=" +
      userId
  );
}

// Função para obter o ID do usuário logado
async function getUserId() {
  try {
    const response = await fetch("../../../backend/auth.php");
    if (response.ok) {
      const responseData = await response.json();
      return responseData.user_id;
    } else {
      console.error("Erro ao obter o ID do usuário:", response.status);
      return null;
    }
  } catch (error) {
    console.error("Erro ao obter o ID do usuário:", error);
    return null;
  }
}

// Função para verificar se o usuário está logado consultando o servidor
async function isUserLoggedIn() {
  try {
    const response = await fetch("../../../backend/auth.php");
    if (response.ok) {
      const responseData = await response.json();
      return responseData.logged_in;
    } else {
      console.error("Erro ao verificar o status de login:", response.status);
      return false;
    }
  } catch (error) {
    console.error("Erro ao verificar o status de login:", error);
    return false;
  }
}
