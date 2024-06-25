// Função para salvar a frase no armazenamento local e redirecionar para a página principal
function salvarFrase() {
    const form = document.getElementById('outdoorForm');
    if (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault(); // Impede o comportamento padrão do formulário
            const texto = document.getElementById('texto').value; // Obtém o texto digitado
            console.log('Frase salva:', texto); // Log para verificar o valor salvo
            localStorage.setItem('outdoorTexto', texto); // Salva o texto no Local Storage
            console.log('Texto salvo no Local Storage:', localStorage.getItem('outdoorTexto')); // Verificar após salvar
            window.location.href = 'outdoor.html'; // Redireciona para a página principal
        });
    }
}

// Função para exibir a frase na página principal
function exibirFrase() {
    const h1 = document.getElementById('texto');
    if (h1) {
        const texto = localStorage.getItem('outdoorTexto');
        console.log('Frase recuperada do Local Storage:', texto); // Log para verificar o valor recuperado

        if (texto) {
            h1.textContent = texto;
        } else {
            console.log('Nenhum texto encontrado no Local Storage.');
            h1.textContent = "Sua frase aqui!";
        }
    }
}

// Determina a função a ser executada com base na presença de elementos específicos na página
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('outdoorForm')) {
        console.log("Página de configuração carregada.");
        salvarFrase(); // Executa na página de entrada de texto
    } else if (document.getElementById('texto')) {
        console.log("Página de exibição carregada.");
        exibirFrase(); // Executa na página de exibição
    } else {
        console.log("Nenhum formulário ou texto encontrado na página.");
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
