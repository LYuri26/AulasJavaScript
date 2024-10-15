// Inicializa o conteúdo do clima como vazio
weatherInfo.innerHTML = '';
forecastContainer.innerHTML = '';

// Função para traduzir a descrição do clima
function translateDescription(description) {
    for (let i = 0; i < translations.length; i++) {
        if (translations[i][0] === description) {
            return translations[i][1]; // Retorna a tradução em português
        }
    }
    return description; // Retorna a descrição original se não encontrar tradução
}

// Função para buscar previsão de 5 dias
async function fetchFiveDayForecast(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
        if (!response.ok) {
            throw new Error('Cidade não encontrada');
        }
        const data = await response.json();
        displayFiveDayForecast(data);
    } catch (error) {
        displayError(error.message);
    }
}

// Função para exibir a previsão dos próximos 5 dias
function displayFiveDayForecast(data) {
    const forecastList = data.list;
    forecastContainer.innerHTML = ''; // Limpar previsões anteriores

    // Filtra previsões para exibir o clima ao meio-dia de cada dia
    const dailyForecasts = forecastList.filter(forecast => forecast.dt_txt.includes('12:00:00'));

    dailyForecasts.forEach(forecast => {
        const date = new Date(forecast.dt_txt);
        const options = { weekday: 'long', day: 'numeric', month: 'long' };
        const formattedDate = date.toLocaleDateString('pt-BR', options);

        const temp = forecast.main.temp.toFixed(1);
        const weatherType = forecast.weather[0].description;

        // Traduz a descrição do clima
        const description = translateDescription(weatherType);
        const weatherImage = getWeatherImage(weatherType);

        const forecastElement = document.createElement('div');
        forecastElement.classList.add('forecast-day');
        forecastElement.innerHTML = `
            <h5>${formattedDate}</h5>
            <img src="${weatherImage ? weatherImage.icon : ''}" alt="${description}" />
            <p><strong>${temp}°C</strong></p>
            <p>${description.charAt(0).toUpperCase() + description.slice(1)}</p>
            ${weatherImage ? `<img src="${weatherImage.image}" alt="${description}" style="width: 100%; height: auto;" />` : ''}
        `;
        forecastContainer.appendChild(forecastElement);
    });
}

// Evento de clique no botão de busca para carregar previsão atual e de 5 dias
searchButton.addEventListener('click', () => {
    const city = document.getElementById('cityInput').value;
    if (city) {
        fetchWeather(city); // Exibe o clima atual
        fetchFiveDayForecast(city); // Exibe a previsão de 5 dias
    } else {
        displayError('Por favor, insira o nome da cidade.');
    }
});

// Função para buscar previsão de 5 dias pela localização
async function fetchFiveDayForecastByCoordinates(lat, lon) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
        if (!response.ok) {
            throw new Error('Erro ao obter previsão de 5 dias.');
        }
        const data = await response.json();
        displayFiveDayForecast(data);
    } catch (error) {
        displayError(error.message);
    }
}

// Função para exibir erros
function displayError(message) {
    weatherInfo.innerHTML = `<p class="text-danger">${message}</p>`;
    forecastContainer.innerHTML = `<p class="text-danger">${message}</p>`;
}

// Carregar clima e previsão de 5 dias da localização atual ao abrir a página
window.onload = getCurrentLocationWeather;

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
