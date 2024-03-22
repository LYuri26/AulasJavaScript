// Função para exibir os likes da postagem
async function likeModal() {
  const postId = document.getElementById("modalImage").dataset.postId;

  // Verificar se o usuário está logado antes de aumentar o contador
  const loggedIn = await isUserLoggedIn();
  if (!loggedIn) {
    console.log("Usuário não está logado. Não é possível adicionar curtida.");
    return;
  }

  if (postId) {
    console.log("ID da imagem:", postId);

    // Chamar a função like quando o ícone de "Curtir" for clicado
    var likeIcon = document.querySelector(".action-icon-like-icon");
    likeIcon.addEventListener("click", function () {
      like(postId);
    });

    try {
      // Enviar uma solicitação ao servidor para obter os likes para o ID da postagem
      const response = await fetch(
        `../../../backend/processar_like_postagens.php?id=${postId}`
      );
      if (response.ok) {
        const responseData = await response.json();
        if (responseData.success) {
          const likes = responseData.likes[postId];
          console.log("Likes:", likes);

          // Atualizar o elemento HTML com o número de curtidas
          var likesCountElement = document.getElementById("likesCountPost");
          likesCountElement.innerText = likes;
          // Mostrar o elemento
          likesCountElement.style.display = "inline";
        } else {
          console.error("Erro ao obter os likes:", responseData.message);
        }
      } else {
        console.error("Erro ao obter os likes:", response.status);
      }
    } catch (error) {
      console.error("Erro ao obter os likes:", error);
    }
  } else {
    console.log("ID da imagem não encontrado.");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  var likeIcon = document.querySelector(".action-icon-like-icon");
  likeIcon.addEventListener("click", function () {
    // Chama a função likeModal() quando o ícone de "like" for clicado
    likeModal();
  });
});

// Evento de clique no documento inteiro para fechar o modal ao clicar fora dele
document.addEventListener("click", function (event) {
  var modal = document.getElementById("myModalPost");
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

// Função para enviar um like para o servidor
async function like(postId) {
  try {
    console.log("Enviando like para o servidor...");
    // Envia a solicitação para adicionar um like para o servidor
    const response = await fetch(
      "../../../backend/processar_like_curtidas.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId: postId,
          action: "like",
        }),
      }
    );

    // Verifica se a solicitação foi bem-sucedida
    if (response.ok) {
      console.log(
        "Like enviado com sucesso para o servidor e registrado na tabela."
      );
      // Atualize a contagem de likes na interface do usuário, se necessário
      likeModal();
    } else {
      console.error(
        "Erro ao enviar like para o servidor. Status:",
        response.status
      );
    }
  } catch (error) {
    console.error("Erro ao enviar like:", error);
  }
}
