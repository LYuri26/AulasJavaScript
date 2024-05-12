// Função para obter a tabela de caracteres
function obterTabelaCaracteres() {
  // Retorna um objeto contendo a correspondência entre caracteres e seus valores numéricos
  return {
      'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8, 'I': 9, 'J': 10,
      'K': 11, 'L': 12, 'M': 13, 'N': 14, 'O': 15, 'P': 16, 'Q': 17, 'R': 18, 'S': 19, 'T': 20,
      'U': 21, 'V': 22, 'W': 23, 'X': 24, 'Y': 25, 'Z': 26, ' ': 27, '-': 28, '.': 29, ',': 30,
      'Á': 31, 'É': 32, 'Í': 33, 'Ó': 34, 'Ú': 35, 'À': 36, 'Ê': 37, 'Ì': 38, 'Ò': 39, 'Ù': 40,
      'Ã': 41, 'Õ': 42, 'Â': 43, 'Î': 45, 'Ô': 46, 'Û': 47, 'Ç': 48, 'Ü': 50, '¬': 52
  };
}

// Função para transformar uma sequência de números em uma matriz de números com duas linhas
function transformarNumerosEmMatriz(sequenciaNumeros) {
  // Verifica se foi fornecida uma sequência de números
  if (!sequenciaNumeros) {
    console.error("Nenhuma sequência de números fornecida.");
    return [];
  }
  // Divide a sequência de números em um array
  const numeros = sequenciaNumeros.split(" ");
  // Calcula o número de colunas necessárias para a matriz
  const numColunas = Math.ceil(numeros.length / 2);
  // Inicializa a matriz
  const matriz = [];
  // Itera sobre as duas linhas da matriz
  for (let i = 0; i < 2; i++) {
    const linha = [];
    // Itera sobre as colunas da matriz
    for (let j = 0; j < numColunas; j++) {
      const index = i * numColunas + j;
      // Adiciona o número correspondente à posição na sequência, ou zero se não houver mais números
      linha.push(index < numeros.length ? parseInt(numeros[index]) : 0);
    }
    // Adiciona a linha à matriz
    matriz.push(linha);
  }
  // Retorna a matriz resultante
  return matriz;
}
