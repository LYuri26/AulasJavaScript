document.addEventListener("DOMContentLoaded", function () {
  // Obter o modal
  var modal = document.getElementById("loginModal");

  // Obter o botão que abre o modal
  var btn = document.getElementById("openModalBtn");

  // Obter o elemento <span> que fecha o modal
  var span = document.getElementsByClassName("close")[0];

  // Obter o botão cancelar
  var cancelBtn = document.getElementsByClassName("cancelbtn")[0];

  // Quando o usuário clicar no botão, abrir o modal
  btn.onclick = function () {
    modal.style.display = "block";
  };

  // Quando o usuário clicar no <span> (x), fechar o modal
  span.onclick = function () {
    modal.style.display = "none";
  };

  // Quando o usuário clicar no botão cancelar, fechar o modal
  cancelBtn.onclick = function () {
    modal.style.display = "none";
  };

  // Quando o usuário clicar em qualquer lugar fora do modal, fechar o modal
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  // Validar formulário antes de submeter
  var form = document.querySelector("form");
  form.addEventListener("submit", function (event) {
    var usernameInput = document.getElementById("username");
    var passwordInput = document.getElementById("password");

    // Verificar se os campos estão vazios
    if (
      usernameInput.value.trim() === "" ||
      passwordInput.value.trim() === ""
    ) {
      event.preventDefault(); // Impedir envio do formulário
      usernameInput.classList.add("invalid"); // Realçar campo inválido
      passwordInput.classList.add("invalid"); // Realçar campo inválido
      return;
    }

    // Remover estilo de campo inválido se estiver presente
    usernameInput.classList.remove("invalid");
    passwordInput.classList.remove("invalid");
  });
});

// Função para abrir o modal quando o botão é clicado
document.getElementById("openModalBtn").addEventListener("click", function () {
  document.getElementById("loginModal").style.display = "block";
});
