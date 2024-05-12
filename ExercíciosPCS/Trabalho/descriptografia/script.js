// Função para calcular a matriz inversa
function calcularMatrizInversa(a, b, c, d) {
  // Calcula o determinante da matriz
  const determinante = a * d - b * c;
  // Verifica se o determinante é zero (matriz não invertível)
  if (determinante === 0) {
    console.error("Não é possível calcular a matriz inversa.");
    return null;
  }
  // Retorna a matriz inversa
  return [
    [d / determinante, -b / determinante],
    [-c / determinante, a / determinante],
  ];
}

// Função para multiplicar matrizes
function multiplicarInversaPorCriptografada(inversa, criptografada) {
  // Verifica se o número de colunas da matriz inversa é igual ao número de linhas da matriz criptografada
  if (inversa[0].length !== criptografada.length) {
    console.error("Não é possível multiplicar as matrizes.");
    return null;
  }
  // Inicializa a matriz resultado
  const resultado = [];
  // Itera sobre as linhas da matriz inversa
  for (let i = 0; i < inversa.length; i++) {
    resultado[i] = [];
    // Itera sobre as colunas da matriz criptografada
    for (let j = 0; j < criptografada[0].length; j++) {
      let soma = 0;
      // Calcula o produto escalar para obter cada elemento da matriz resultado
      for (let k = 0; k < inversa[0].length; k++) {
        soma += inversa[i][k] * criptografada[k][j];
      }
      // Arredonda o resultado para duas casas decimais
      resultado[i][j] = Math.round(soma * 100) / 100;
    }
  }
  // Retorna a matriz resultado
  return resultado;
}

// Função para converter números em letras
function converterNumerosEmLetras(matrizNumeros) {
  // Obtém a tabela de caracteres
  const tabela = obterTabelaCaracteres();
  // Inicializa a matriz de letras
  const letras = [];
  // Itera sobre as linhas da matriz de números
  for (let i = 0; i < matrizNumeros.length; i++) {
    const linha = [];
    // Itera sobre as colunas da matriz de números
    for (let j = 0; j < matrizNumeros[i].length; j++) {
      let letra = null;
      // Itera sobre as propriedades da tabela de caracteres
      for (let caractere in tabela) {
        // Verifica se o valor da célula da matriz de números corresponde a um caractere na tabela
        if (tabela[caractere] === matrizNumeros[i][j]) {
          letra = caractere;
          break;
        }
      }
      // Adiciona a letra correspondente à matriz de letras
      linha.push(letra);
    }
    // Adiciona a linha de letras à matriz de letras
    letras.push(linha);
  }
  // Retorna a matriz de letras
  return letras;
}

// Aguarda o carregamento completo da página
document.addEventListener("DOMContentLoaded", function () {
  // Adiciona um ouvinte de evento de clique ao botão "Descriptografar"
  document
    .getElementById("btnDescriptografar")
    .addEventListener("click", function () {
      // Obtém a sequência de números digitada pelo usuário
      const sequenciaNumeros =
        document.getElementById("sequenciaNumeros").value;
      // Obtém os números da chave de criptografia
      const numero1 = parseInt(document.getElementById("numero1").value);
      const numero2 = parseInt(document.getElementById("numero2").value);
      const numero3 = parseInt(document.getElementById("numero3").value);
      const numero4 = parseInt(document.getElementById("numero4").value);

      // Calcula a matriz inversa da chave de criptografia
      const matrizInversa = calcularMatrizInversa(
        numero1,
        numero2,
        numero3,
        numero4
      );
      // Verifica se a matriz inversa foi calculada com sucesso
      if (matrizInversa === null) return;

      // Imprime a matriz criptografada no console
      console.log("Matriz Criptografada:");
      const matrizCriptografada = transformarNumerosEmMatriz(sequenciaNumeros);
      console.log(matrizCriptografada);

      // Imprime a matriz da chave de criptografia no console
      console.log("Matriz Chave:");
      console.log(`[${numero1}, ${numero2}], [${numero3}, ${numero4}]`);

      // Imprime a matriz inversa no console
      console.log("Matriz Inversa:");
      console.log(matrizInversa);

      // Multiplica a matriz inversa pela matriz criptografada
      const matrizResultado = multiplicarInversaPorCriptografada(
        matrizInversa,
        matrizCriptografada
      );
      // Imprime a matriz resultante no console
      console.log("Matriz Resultante:");
      console.log(matrizResultado);

      // Converte os números da matriz resultante em letras
      const matrizLetras = converterNumerosEmLetras(matrizResultado);
      // Imprime as letras correspondentes no console
      console.log("Letras Correspondentes:");
      matrizLetras.forEach((row) => {
        row.forEach((letter) => {
          console.log(letter);
        });
      });

      // Atualiza o elemento HTML com o resultado
      document.getElementById("resultado").innerText =
        JSON.stringify(matrizLetras);
    });
});


