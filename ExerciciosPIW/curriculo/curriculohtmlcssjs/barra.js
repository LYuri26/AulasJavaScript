// Função para renderizar o gráfico
function renderizarGrafico() {
  // Dados para o gráfico
  const data = [
    { linguagem: "C", porcentagem: 40 },
    { linguagem: "C++", porcentagem: 70 },
    { linguagem: "Java", porcentagem: 85 },
    { linguagem: "JavaScript", porcentagem: 67 },
    { linguagem: "CSS3", porcentagem: 60 },
    { linguagem: "HTML5", porcentagem: 68 },
    { linguagem: "MySQL", porcentagem: 80 },
    { linguagem: "PHP", porcentagem: 80 },
    { linguagem: "Shell", porcentagem: 70 },
    { linguagem: "Python", porcentagem: 80 },
  ];

  // Configurações do SVG
  const svgWidth = 800; // Largura do SVG
  const svgHeight = 400; // Altura do SVG
  const margin = { top: 20, right: 20, bottom: 50, left: 70 }; // Margens do gráfico
  const width = svgWidth - margin.left - margin.right; // Largura do gráfico
  const height = svgHeight - margin.top - margin.bottom; // Altura do gráfico

  // Criação do SVG
  const svg = d3
    .select("#grafico") // Seleciona o elemento HTML onde o gráfico será renderizado
    .append("svg") // Adiciona um elemento SVG
    .attr("width", svgWidth) // Define a largura do SVG
    .attr("height", svgHeight); // Define a altura do SVG

  // Criação do grupo para o gráfico
  const g = svg
    .append("g") // Adiciona um elemento de grupo
    .attr("transform", `translate(${margin.left}, ${margin.top})`); // Define a posição do grupo dentro do SVG

  // Escalas
  const x = d3.scaleLinear().rangeRound([0, width]).domain([0, 100]); // Escala para o eixo X

  const y = d3
    .scaleBand() // Escala para o eixo Y
    .rangeRound([height, 0]) // Define o intervalo da escala
    .padding(0.1) // Adiciona um espaçamento entre as barras
    .domain(data.map((d) => d.linguagem)); // Define o domínio da escala

  // Eixos
  const yAxis = d3.axisLeft(y).tickSizeOuter(0); // Eixo Y

  // Adicionando eixo Y
  g.append("g") // Adiciona um elemento de grupo para o eixo Y
    .call(yAxis) // Adiciona o eixo Y ao grupo
    .selectAll(".tick text") // Seleciona todos os rótulos do eixo Y
    .attr("class", "rotulo"); // Adiciona uma classe aos rótulos do eixo Y

  // Adicionando as barras
  g.selectAll(".barra") // Seleciona todos os elementos de classe 'barra'
    .data(data) // Vincula os dados às barras
    .enter() // Entra nos dados
    .append("rect") // Adiciona um retângulo para cada dado
    .attr("class", "barra") // Adiciona a classe 'barra' aos retângulos
    .attr("x", 0) // Posição inicial no eixo X
    .attr("y", (d) => y(d.linguagem)) // Posição inicial no eixo Y
    .attr("width", (d) => x(d.porcentagem)) // Largura das barras de acordo com a porcentagem
    .attr("height", y.bandwidth()) // Altura das barras
    .attr("rx", 5) // Arredonda a borda esquerda da barra
    .attr("ry", 5); // Arredonda a borda direita da barra


  // Adicionando a porcentagem dentro da barra
  g.selectAll(".porcentagem") // Seleciona todos os elementos de classe 'porcentagem'
    .data(data) // Vincula os dados à porcentagem
    .enter() // Entra nos dados
    .append("text") // Adiciona um elemento de texto para cada dado
    .attr("class", "porcentagem") // Adiciona a classe 'porcentagem' aos elementos de texto
    .attr("x", (d) => x(d.porcentagem) + 5) // Posição X do texto dentro da barra
    .attr("y", (d) => y(d.linguagem) + y.bandwidth() / 2) // Posição Y do texto dentro da barra
    .attr("dy", ".35em") // Deslocamento vertical do texto
    .text((d) => d.porcentagem + "%"); // Texto exibido dentro da barra
}
