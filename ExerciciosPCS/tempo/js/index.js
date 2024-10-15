// API Key do OpenWeatherMap (substitua pela sua chave)
const apiKey = 'ca5c8ad39282778e34a17044392901b2'; // Use sua chave de API
const weatherInfo = document.getElementById('weatherInfo');
const searchButton = document.getElementById('searchButton');
const forecastContainer = document.getElementById('fiveDayForecast');

// Inicializa o conteúdo do clima como vazio
weatherInfo.innerHTML = '';
forecastContainer.innerHTML = '';

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

// Função para exibir as informações do clima atual
function displayWeather(data) {
    const { name, main, weather } = data;
    const temperature = main.temp;
    const humidity = main.humidity;
    const description = translateDescription(weather[0].description);
    const weatherType = weather[0].description;

    const weatherImage = getWeatherImage(weatherType);

    if (weatherImage) {
        const { icon, image } = weatherImage;

        weatherInfo.innerHTML = `
            <h5>Informações do Clima Atual</h5>
            <p><strong>Cidade:</strong> ${name}</p>
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
    forecastContainer.innerHTML = `<p class="text-danger">${message}</p>`;
}


// Função para buscar clima e previsão por coordenadas (localização atual)
async function fetchWeatherByCoordinates(lat, lon) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
        if (!response.ok) {
            throw new Error('Erro ao obter clima da localização.');
        }
        const data = await response.json();
        displayWeather(data);

        // Após buscar o clima atual, busca a previsão de 5 dias pela localização
        fetchFiveDayForecastByCoordinates(lat, lon);
    } catch (error) {
        displayError(error.message);
    }
}


// Função para obter localização atual e clima
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

// Atualiza as informações automaticamente a cada 30 minutos
setInterval(getCurrentLocationWeather, 1800000);

