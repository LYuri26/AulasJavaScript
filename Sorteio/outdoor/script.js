// Função para salvar a frase no armazenamento local e redirecionar para a página principal
function salvarFrase() {
    const form = document.getElementById('outdoorForm');
    if (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault(); // Impede o comportamento padrão do formulário
            const texto = document.getElementById('texto').value; // Obtém o texto digitado
            localStorage.setItem('outdoorTexto', texto); // Salva o texto no Local Storage
            window.location.href = 'outdoor.html'; // Redireciona para a página principal
        });
    }
}

// Função para ajustar o tamanho da fonte para que o texto caiba dentro do contêiner
function ajustarTamanhoFonte(elemento) {
    const container = document.querySelector('.outdoor');
    let fontSize = 10; // Tamanho inicial em vw
    elemento.style.fontSize = `${fontSize}vw`;

    // Reduz o tamanho da fonte até que o texto caiba no contêiner
    while ((elemento.scrollWidth > container.clientWidth || elemento.scrollHeight > container.clientHeight) && fontSize > 0.5) {
        fontSize -= 0.5; // Reduz o tamanho da fonte em passos pequenos
        elemento.style.fontSize = `${fontSize}vw`;
    }
}

// Função para exibir a frase na página principal
function exibirFrase() {
    const h1 = document.getElementById('texto');
    if (h1) {
        const texto = localStorage.getItem('outdoorTexto');
        if (texto) {
            h1.textContent = texto;
        } else {
            h1.textContent = "Sua frase aqui!";
        }
        ajustarTamanhoFonte(h1); // Ajusta o tamanho da fonte
    }
}

// Determina a função a ser executada com base na presença de elementos específicos na página
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('outdoorForm')) {
        salvarFrase(); // Executa na página de entrada de texto
    } else if (document.getElementById('texto')) {
        exibirFrase(); // Executa na página de exibição
    }
});

// Ajusta o tamanho da fonte quando a janela é redimensionada
window.addEventListener('resize', () => {
    const h1 = document.getElementById('texto');
    if (h1) {
        ajustarTamanhoFonte(h1);
    }
});



// Função para criar partículas de fogos de artifício
function createFirework() {
    const firework = document.createElement('div');
    firework.classList.add('fireworks');
    document.body.appendChild(firework);
    
    // Posiciona a partícula em um local aleatório na tela
    firework.style.left = Math.random() * window.innerWidth + 'px';
    firework.style.top = Math.random() * window.innerHeight + 'px';

    // Remove a partícula após a animação
    setTimeout(() => {
        firework.remove();
    }, 2000);
}

// Gera novas partículas periodicamente
setInterval(createFirework, 300); // Cria uma partícula a cada 300ms

// Função para alternar entre as animações de rotação 3D e pulsação de forma aleatória
function randomAnimation() {
    const textElement = document.getElementById('texto');
    const random = Math.random();
    
    if (random < 0.5) {
        textElement.classList.remove('rotate-animation');
        textElement.classList.add('pulse-animation');
    } else {
        textElement.classList.remove('pulse-animation');
        textElement.classList.add('rotate-animation');
    }
}

// Inicialmente aplica uma animação aleatória
randomAnimation();

// Chama a função a cada 10 segundos para alterar a animação
setInterval(randomAnimation, 10000); // A cada 10 segundos (10000 milissegundos)
