// API Key do OpenWeatherMap (substitua pela sua chave)
const apiKey = 'ca5c8ad39282778e34a17044392901b2'; // Use sua chave de API
const weatherInfo = document.getElementById('weatherInfo');
const searchButton = document.getElementById('searchButton');

// Inicializa o conteúdo do clima como vazio
weatherInfo.innerHTML = '';

// Função para buscar clima por cidade
async function fetchWeather(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        if (!response.ok) {
            throw new Error('Cidade não encontrada');
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        displayError(error.message);
    }
}

// Função para buscar ícone e imagem com base na descrição do clima
function getWeatherImage(weatherType) {
    for (let i = 0; i < weatherImages.length; i++) {
        if (weatherImages[i][0] === weatherType) {
            return { icon: weatherImages[i][1], image: weatherImages[i][2] };
        }
    }
    return null; // Retorna null se não encontrar
}

// Função para exibir as informações do clima
function displayWeather(data) {
    const { name, main, weather } = data; // Inclui o nome da cidade
    const temperature = main.temp;
    const humidity = main.humidity;
    const description = translateDescription(weather[0].description);
    const weatherType = weather[0].description; // Para acessar a descrição original do clima

    // Obtém o ícone e a imagem correspondentes
    const weatherImage = getWeatherImage(weatherType);

    if (weatherImage) {
        const { icon, image } = weatherImage;

        weatherInfo.innerHTML = `
            <h5>Informações do Clima</h5>
            <p><strong>Cidade:</strong> ${name}</p> <!-- Exibe o nome da cidade -->
            <img src="${icon}" alt="${description}" style="width: 100px; height: auto;" />
            <p><strong>Temperatura:</strong> ${temperature.toFixed(2)}°C</p>
            <p><strong>Umidade:</strong> ${humidity}%</p>
            <p><strong>Descrição:</strong> ${description.charAt(0).toUpperCase() + description.slice(1)}</p>
            <img src="${image}" alt="${description}" class="weather-background" style="width: 100%; height: auto;" />
        `;
    } else {
        displayError('Ícone ou imagem não disponível para este clima.');
    }
}

// Função para traduzir a descrição do clima
function translateDescription(description) {
    for (let i = 0; i < translations.length; i++) {
        if (translations[i][0] === description) {
            return translations[i][1];
        }
    }
    return description;
}

// Função para exibir erros
function displayError(message) {
    weatherInfo.innerHTML = `<p class="text-danger">${message}</p>`;
}

// Evento de clique no botão de busca
searchButton.addEventListener('click', () => {
    const city = document.getElementById('cityInput').value; // Obtém o valor do input
    if (city) {
        fetchWeather(city);
    } else {
        displayError('Por favor, insira o nome da cidade.');
    }
});

// Função para obter localização atual
function getCurrentLocationWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            fetchWeatherByCoordinates(lat, lon);
        }, () => {
            displayError('Não foi possível obter sua localização.');
        });
    } else {
        displayError('Geolocalização não é suportada por este navegador.');
    }
}

// Função para buscar clima por coordenadas
async function fetchWeatherByCoordinates(lat, lon) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
        if (!response.ok) {
            throw new Error('Erro ao obter clima da localização.');
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        displayError(error.message);
    }
}

// Atualiza as informações automaticamente a cada 30 minutos
setInterval(getCurrentLocationWeather, 1800000); // 30 minutos em milissegundos

// Carregar clima da localização atual ao abrir a página
window.onload = getCurrentLocationWeather;
