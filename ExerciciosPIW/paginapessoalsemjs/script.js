// Função para mudar a cor de fundo do cabeçalho ao passar o mouse sobre ele
function changeHeaderColor() {
  // Seleciona o elemento de cabeçalho (header) na página
  const header = document.querySelector("header");

  // Adiciona um evento de escuta para o mouse passando sobre o cabeçalho
  header.addEventListener("mouseover", function () {
    // Define a cor de fundo do cabeçalho para uma cor aleatória
    header.style.backgroundColor = getRandomColor();
  });

  // Adiciona um evento de escuta para o mouse saindo do cabeçalho
  header.addEventListener("mouseout", function () {
    // Restaura a cor de fundo original do cabeçalho
    header.style.backgroundColor = "#333";
  });
}

// Função para obter uma cor aleatória
function getRandomColor() {
  // Define os caracteres possíveis para representar uma cor hexadecimal
  const letters = "0123456789ABCDEF";

  // Inicializa a string de cor com "#" (indicador de cor hexadecimal)
  let color = "#";

  // Loop para gerar uma cor aleatória de 6 dígitos hexadecimais
  for (let i = 0; i < 6; i++) {
    // Concatena um caractere aleatório da string de letras à cor
    color += letters[Math.floor(Math.random() * 16)];
  }

  // Retorna a cor hexadecimal gerada
  return color;
}

// Função para animar a foto de perfil
function animateProfilePicture() {
  // Seleciona a imagem de perfil no cabeçalho
  const profilePicture = document.querySelector("header img");

  // Adiciona um evento de escuta para o mouse passando sobre a imagem
  profilePicture.addEventListener("mouseenter", function () {
    // Gira a imagem de perfil em 360 graus ao passar o mouse sobre ela
    profilePicture.style.transform = "rotate(360deg)";
  });

  // Adiciona um evento de escuta para o mouse saindo da imagem
  profilePicture.addEventListener("mouseleave", function () {
    // Retorna a imagem de perfil à sua rotação inicial ao tirar o mouse dela
    profilePicture.style.transform = "rotate(0deg)";
  });
}

// Função para destacar as seções ao passar o mouse sobre elas
function highlightSections() {
  // Seleciona todas as seções da página
  const sections = document.querySelectorAll("section");

  // Itera sobre cada seção selecionada
  sections.forEach((section) => {
    // Adiciona um evento de escuta para o mouse passando sobre a seção
    section.addEventListener("mouseenter", function () {
      // Define a cor de fundo da seção para uma cor mais clara
      section.style.backgroundColor = "#f9f9f9";
    });

    // Adiciona um evento de escuta para o mouse saindo da seção
    section.addEventListener("mouseleave", function () {
      // Restaura a cor de fundo original da seção
      section.style.backgroundColor = "#fff";
    });
  });
}

// Chamando as novas funções ao carregar a página
window.onload = function () {
  // Chama a função para mudar a cor de fundo do cabeçalho
  changeHeaderColor();

  // Chama a função para animar a foto de perfil
  animateProfilePicture();

  // Chama a função para destacar as seções ao passar o mouse sobre elas
  highlightSections();
};
