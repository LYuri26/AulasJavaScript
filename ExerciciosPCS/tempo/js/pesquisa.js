// Variáveis para acessar elementos do DOM
const searchInput = document.getElementById('cityInput');
const selectedCity = document.getElementById('selectedCity');
const suggestionsList = document.getElementById('suggestionsList');

// Função para buscar sugestões de cidades
async function fetchCitySuggestions(city) {
    try {
        // Cria a query baseada na cidade
        const response = await fetch(`https://api.openweathermap.org/data/2.5/find?q=${city}&appid=${apiKey}&units=metric&cnt=5`);

        // Logs para verificar a resposta
        console.log(`Fetching city suggestions for query: ${city}`);
        console.log(`Response Status: ${response.status}`);

        // Verifica se a resposta é bem-sucedida
        if (!response.ok) {
            throw new Error('Erro ao buscar sugestões: ' + response.statusText);
        }

        // Converte a resposta para JSON
        const data = await response.json();
        console.log('City suggestions data:', data); // Log dos dados retornados

        // Exibe as sugestões
        displayCitySuggestions(data.list);
    } catch (error) {
        console.error('Error fetching city suggestions:', error.message);
    }
}

// Função para exibir as sugestões de cidades
function displayCitySuggestions(suggestions) {
    // Limpa a lista anterior
    suggestionsList.innerHTML = '';

    // Exibe a lista de sugestões se houver
    if (suggestions && suggestions.length > 0) {
        suggestionsList.style.display = 'block'; // Mostra a lista

        suggestions.forEach(city => {
            const listItem = document.createElement('li');
            const countryCode = city.sys.country; // Obter o código do país

            // Exibe apenas o nome da cidade e o país
            listItem.textContent = `${city.name}, ${countryCode}`;
            listItem.style.cursor = 'pointer'; // Muda o cursor para pointer

            // Evento de clique para selecionar a cidade
            listItem.addEventListener('click', () => {
                selectCity(city);
            });

            suggestionsList.appendChild(listItem);
        });
    } else {
        suggestionsList.style.display = 'none'; // Esconde a lista se não houver sugestões
    }
}

// Função para selecionar uma cidade da lista
function selectCity(city) {
    // Exibe a cidade selecionada
    const cityName = city.name; // Nome da cidade
    const countryCode = city.sys.country; // Código do país

    selectedCity.textContent = `${cityName}, ${countryCode}`; // Exibe nome da cidade e país
    suggestionsList.style.display = 'none'; // Esconde a lista de sugestões

    // Busca o clima da cidade selecionada
    fetchWeather(cityName, countryCode);
}

// Debounce para pesquisa automática
let debounceTimeout;

function debounce(func, delay) {
    return function (...args) {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

// Função que faz a pesquisa automática
const autoSearchWeather = debounce(() => {
    const city = searchInput.value;

    // Exige que o usuário insira o nome da cidade
    if (city) {
        fetchCitySuggestions(city); // Passa a cidade para a busca
    } else {
        selectedCity.textContent = ''; // Limpa se não houver entrada
        suggestionsList.style.display = 'none'; // Esconde a lista de sugestões
    }
}, 1000); // 1 segundo de espera após o usuário parar de digitar

// Adiciona um evento de input ao campo de pesquisa
searchInput.addEventListener('input', autoSearchWeather);

// Função para buscar clima da cidade
async function fetchWeather(city, country) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}&units=metric`);

        if (!response.ok) {
            throw new Error('Erro ao buscar clima: ' + response.statusText);
        }

        const data = await response.json();
        console.log('Weather data:', data); // Log dos dados do clima

        // Aqui você pode implementar a lógica para exibir as informações do clima no seu HTML
        displayWeather(data);
    } catch (error) {
        console.error('Error fetching weather:', error.message);
    }
}
