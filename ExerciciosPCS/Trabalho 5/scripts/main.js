document.addEventListener("DOMContentLoaded", function () {
  // Função para validar o formulário de contato
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      const nome = document.getElementById("nome").value.trim();
      const email = document.getElementById("email").value.trim();
      const mensagem = document.getElementById("mensagem").value.trim();

      if (!nome || !email || !mensagem) {
        alert("Por favor, preencha todos os campos.");
        event.preventDefault(); // Impede o envio do formulário
      } else {
        alert("Mensagem enviada com sucesso!");
      }
    });
  }
});
