// Script para controlar o carrossel de imagens
const carrosselSlide = document.querySelector('.carrossel-slide');
const imagens = document.querySelectorAll('.carrossel-slide img');

// Botões de navegação
const btnAnterior = document.getElementById('btn-anterior');
const btnProximo = document.getElementById('btn-proximo');

// Contador de imagens
let contador = 1;
const tamanhoImagem = imagens[0].clientWidth;

// Posiciona as imagens corretamente
carrosselSlide.style.transform = `translateX(${-tamanhoImagem * contador}px)`;

// Botões de navegação
btnProximo.addEventListener('click', () => {
    if (contador >= imagens.length - 1) return;
    carrosselSlide.style.transition = "transform 0.4s ease-in-out";
    contador++;
    carrosselSlide.style.transform = `translateX(${-tamanhoImagem * contador}px)`;
});

btnAnterior.addEventListener('click', () => {
    if (contador <= 0) return;
    carrosselSlide.style.transition = "transform 0.4s ease-in-out";
    contador--;
    carrosselSlide.style.transform = `translateX(${-tamanhoImagem * contador}px)`;
});

// Reinicia o carrossel ao chegar na última imagem
carrosselSlide.addEventListener('transitionend', () => {
    if (imagens[contador].id === 'ultimo-slide') {
        carrosselSlide.style.transition = "none";
        contador = imagens.length - 2;
        carrosselSlide.style.transform = `translateX(${-tamanhoImagem * contador}px)`;
    }
    if (imagens[contador].id === 'primeiro-slide') {
        carrosselSlide.style.transition = "none";
        contador = imagens.length - contador;
        carrosselSlide.style.transform = `translateX(${-tamanhoImagem * contador}px)`;
    }
});
