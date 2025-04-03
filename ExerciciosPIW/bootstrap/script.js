document.addEventListener("DOMContentLoaded", function () {
  // Scroll suave para links internos
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: "smooth",
        });

        // Fechar menu mobile se estiver aberto
        const menu = document.querySelector(".navbar-collapse");
        if (menu.classList.contains("show")) {
          const bsCollapse = new bootstrap.Collapse(menu);
          bsCollapse.hide();
        }
      }
    });
  });

  // Validação do formulário
  const formContato = document.getElementById("formContato");
  if (formContato) {
    formContato.addEventListener("submit", function (e) {
      e.preventDefault();

      // Validação simples
      const nome = document.getElementById("nome").value;
      const email = document.getElementById("email").value;
      const mensagem = document.getElementById("mensagem").value;

      if (nome && email && mensagem) {
        alert("Mensagem enviada com sucesso! Entraremos em contato em breve.");
        formContato.reset();
      } else {
        alert("Por favor, preencha todos os campos do formulário.");
      }
    });
  }

  // Adicionar classe ativa ao item do menu conforme scroll
  const sections = document.querySelectorAll("section");
  const navItems = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", function () {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (pageYOffset >= sectionTop - 100) {
        current = section.getAttribute("id");
      }
    });

    navItems.forEach((item) => {
      item.classList.remove("active");
      if (item.getAttribute("href") === `#${current}`) {
        item.classList.add("active");
      }
    });
  });
});
