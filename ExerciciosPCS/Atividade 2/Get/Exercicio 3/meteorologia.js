const apiKey = 'ca5c8ad39282778e34a17044392901b2'; // Substitua pelo seu próprio API key do OpenWeatherMap
const cidade = 'Uberaba'; // Defina a cidade como Uberaba

const mostrarPrevisaoTempo = async () => {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&units=metric`);
    if (!response.ok) {
      throw new Error('Erro ao obter previsão do tempo');
    }
    const data = await response.json();
    exibirInformacoesTempo(data);
  } catch (error) {
    console.error(error.message);
  }
};

const exibirInformacoesTempo = (data) => {
  const temperatura = data.main.temp;
  const descricao = data.weather[0].description;
  const cidadeNome = data.name;

  console.log(`Previsão do tempo em ${cidadeNome}:`);
  console.log(`Temperatura: ${temperatura}°C`);
  console.log(`Descrição: ${descricao}`);
};

// Chamando a função para mostrar a previsão do tempo para Uberaba, MG
mostrarPrevisaoTempo();
