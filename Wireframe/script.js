// Adicionando funcionalidade ao menu expansível
document
  .querySelector(".menu-container h3") // Seleciona o elemento h3 dentro da classe menu-container
  .addEventListener("click", function () {
    const menuList = document.querySelector(".menu-container ul"); // Seleciona a lista ul dentro da classe menu-container
    menuList.classList.toggle("show-menu"); // Alterna a classe show-menu para exibir ou ocultar o menu
  });

// Adicionando funcionalidade ao formulário
document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault(); // Evita o comportamento padrão de enviar o formulário, impedindo a atualização da página
  const nome = document.getElementById("nome").value; // Obtém o valor do campo de entrada de nome
  const email = document.getElementById("email").value; // Obtém o valor do campo de entrada de e-mail

  alert(`Formulário enviado!\nNome: ${nome}\nEmail: ${email}`); // Exibe um alerta com os dados do formulário
});

// Adicionando funcionalidade ao botão na seção principal
document.querySelector("button").addEventListener("click", function () {
  alert("Ação de clique realizada!"); // Exibe um alerta ao clicar no botão
});
