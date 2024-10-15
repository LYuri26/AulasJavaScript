// Variáveis para acessar elementos do DOM
const searchInput = document.getElementById('cityInput');
const suggestionsList = document.getElementById('suggestionsList');

// Função para buscar sugestões de cidades
async function fetchCitySuggestions(query) {
    try {
        // Requisição à API para buscar cidades
        const response = await fetch(`https://api.openweathermap.org/data/2.5/find?q=${query}&appid=${apiKey}&units=metric&cnt=5`);

        // Logs para verificar a resposta
        console.log(`Fetching city suggestions for query: ${query}`);
        console.log(`Response Status: ${response.status}`);

        // Verifica se a resposta é bem-sucedida
        if (!response.ok) {
            throw new Error('Erro ao buscar sugestões: ' + response.statusText);
        }

        // Converte a resposta para JSON
        const data = await response.json();
        console.log('City suggestions data:', data); // Log dos dados retornados

        // Exibe as sugestões
        displaySuggestions(data.list);
    } catch (error) {
        console.error('Error fetching city suggestions:', error.message);
    }
}

// Função para exibir sugestões de cidades
function displaySuggestions(suggestions) {
    clearSuggestions(); // Limpa as sugestões anteriores

    // Verifica se há sugestões disponíveis
    if (suggestions && suggestions.length) {
        suggestions.forEach(city => {
            const suggestionItem = document.createElement('li');
            suggestionItem.textContent = `${city.name}, ${city.sys.country}`; // Exibe o nome da cidade e o país
            suggestionItem.addEventListener('click', () => {
                searchInput.value = city.name; // Define o valor do input como o nome da cidade selecionada
                fetchWeather(city.name); // Busca o clima da cidade selecionada
                clearSuggestions(); // Limpa sugestões após a seleção
            });
            suggestionsList.appendChild(suggestionItem);
        });

        suggestionsList.style.display = 'block'; // Exibe a lista se houver sugestões
    } else {
        suggestionsList.style.display = 'none'; // Esconde a lista se não houver sugestões
    }
}

// Função para limpar as sugestões
function clearSuggestions() {
    suggestionsList.innerHTML = ''; // Limpa a lista de sugestões
    suggestionsList.style.display = 'none'; // Esconde a lista
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
    if (city) {
        fetchCitySuggestions(city); // Busca sugestões
    } else {
        clearSuggestions(); // Limpa sugestões se não houver entrada
    }
}, 1000); // 1 segundo de espera após o usuário parar de digitar

// Adiciona um evento de input ao campo de pesquisa
searchInput.addEventListener('input', autoSearchWeather);
