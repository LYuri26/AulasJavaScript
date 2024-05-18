// script.js
// Função para calcular a matriz inversa
export function calcularMatrizInversa(
  primeiroElemento,
  segundoElemento,
  terceiroElemento,
  quartoElemento
) {
  // Calcula o determinante da matriz
  const determinante =
    primeiroElemento * quartoElemento - segundoElemento * terceiroElemento;

  // Verifica se o determinante é zero, o que torna a matriz não inversível
  if (determinante === 0) {
    console.error("Não é possível calcular a matriz inversa.");
    return null; // Retorna null se a matriz não for inversível
  }

  // Calcula a matriz inversa utilizando a fórmula específica para matrizes 2x2
  return [
    [quartoElemento / determinante, -segundoElemento / determinante],
    [-terceiroElemento / determinante, primeiroElemento / determinante],
  ];
}

// Função para multiplicar matrizes
export function multiplicarMatrizes(matriz1, matriz2) {
  // Inicializa a matriz resultado
  const resultado = [];

  // Itera sobre as linhas da primeira matriz
  for (let i = 0; i < matriz1.length; i++) {
    resultado[i] = []; // Inicializa a linha na matriz resultado
    // Itera sobre as colunas da segunda matriz
    for (let j = 0; j < matriz2[0].length; j++) {
      let soma = 0;
      // Realiza a multiplicação e soma dos elementos
      for (let k = 0; k < matriz1[0].length; k++) {
        soma += matriz1[i][k] * matriz2[k][j];
      }
      // Arredonda o resultado e armazena na matriz resultado
      resultado[i][j] = Math.round(soma * 100) / 100;
    }
  }
  // Retorna a matriz resultado
  return resultado;
}

// Função principal para descriptografar
export function descriptografar(
  primeiroElemento,
  segundoElemento,
  terceiroElemento,
  quartoElemento,
  sequenciaNumeros
) {
  // Calcula a matriz inversa da matriz chave
  const matrizInversa = calcularMatrizInversa(
    primeiroElemento,
    segundoElemento,
    terceiroElemento,
    quartoElemento
  );
  if (matrizInversa === null) return null; // Retorna se a matriz inversa for nula

  // Calcula a matriz criptografada a partir da sequência de números
  const matrizCriptografada = transformarNumerosEmMatriz(sequenciaNumeros);

  // Calcula o produto da matriz inversa pela matriz criptografada
  return multiplicarMatrizes(matrizInversa, matrizCriptografada);
}
