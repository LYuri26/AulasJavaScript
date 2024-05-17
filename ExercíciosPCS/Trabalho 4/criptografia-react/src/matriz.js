// Função para obter a tabela de caracteres
export function obterTabelaCaracteres() {
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
  export function transformarNumerosEmMatriz(sequenciaNumeros) {
    // Implemente a função aqui
  }
  
  // Função para converter números em letras
  export function converterNumerosEmLetras(matrizNumeros) {
    // Implemente a função aqui
  }
  
  // Função para transformar um texto em uma matriz usando a tabela de caracteres
  export function transformarTextoEmMatriz(texto) {
    // Obtém a tabela de caracteres
    const tabelaCaracteres = obterTabelaCaracteres();
  
    // Transforma o texto em maiúsculas
    const textoMaiusculo = texto.toUpperCase();
  
    // Divide o texto em um array de caracteres
    const caracteres = textoMaiusculo.split("");
  
    // Calcula o número de colunas baseado na quantidade de caracteres, cada caractere ocupará uma coluna
    const numColunas = Math.ceil(caracteres.length / 2);
  
    // Array para armazenar os números correspondentes aos caracteres do texto
    const matriz = [];
  
    // Itera sobre cada caractere do texto
    for (let i = 0; i < caracteres.length; i++) {
      const caractereAtual = caracteres[i];
      // Verifica se o caractere existe na tabela de caracteres
      if (tabelaCaracteres.hasOwnProperty(caractereAtual)) {
        matriz.push(tabelaCaracteres[caractereAtual]);
      } else {
        matriz.push(0); // Se não existir, adiciona 0 à matriz
      }
    }
  
    // Verifica se o número de colunas é maior que o número de elementos na matriz
    if (numColunas > matriz.length) {
      // Preenche com zeros até atingir o número de colunas
      const diferenca = numColunas - matriz.length;
      for (let i = 0; i < diferenca; i++) {
        matriz.push(0);
      }
    }
  
    // Divide a matriz em duas linhas
    const primeiraLinha = matriz.slice(0, numColunas);
    const segundaLinha = matriz.slice(numColunas);
  
    // Verifica se a segunda linha tem o mesmo número de elementos que a primeira
    if (segundaLinha.length < primeiraLinha.length) {
      // Preenche com zeros até ter a mesma quantidade de elementos
      const diferenca = primeiraLinha.length - segundaLinha.length;
      for (let i = 0; i < diferenca; i++) {
        segundaLinha.push(0);
      }
    }
  
    // Retorna a matriz resultante
    return [primeiraLinha, segundaLinha];
  }
  
  // Função para multiplicar duas matrizes
  export function multiplicarMatrizes(matrizChave, matrizTexto) {
    // Obtém o número de colunas da matriz chave e o número de linhas da matriz de texto
    const numColunasMatrizChave = matrizChave[0].length;
    const numLinhasMatrizTexto = matrizTexto.length;
  
    // Verifica se as dimensões das matrizes são compatíveis para multiplicação
    if (numColunasMatrizChave !== numLinhasMatrizTexto) {
      console.error(
        "As dimensões das matrizes não são compatíveis para multiplicação."
      );
      return []; // Retorna uma matriz vazia se as dimensões não forem compatíveis
    }
  
    // Obtém o número de linhas da matriz chave e o número de colunas da matriz de texto
    const numLinhasMatrizChave = matrizChave.length;
    const numColunasMatrizTexto = matrizTexto[0].length;
  
    // Inicializa a matriz criptografada
    const matrizCriptografada = [];
  
    // Realiza a multiplicação das matrizes
    for (let i = 0; i < numLinhasMatrizChave; i++) {
      matrizCriptografada[i] = [];
      for (let j = 0; j < numColunasMatrizTexto; j++) {
        let sum = 0;
        for (let k = 0; k < numColunasMatrizChave; k++) {
          sum += matrizChave[i][k] * matrizTexto[k][j];
        }
        matrizCriptografada[i][j] = sum % 53; // 53 é o tamanho do alfabeto + os caracteres especiais na tabela
      }
    }
  
    // Retorna a matriz criptografada
    return matrizCriptografada;
  }
