// Função para calcular a matriz inversa
function calcularMatrizInversa(
  primeiroElemento,
  segundoElemento,
  terceiroElemento,
  quartoElemento
) {
  // Calcula o determinante da matriz
  const determinante =
    primeiroElemento * quartoElemento - segundoElemento * terceiroElemento;

  // Se o determinante for zero, a matriz inversa não pode ser calculada
  if (determinante === 0) {
    console.error("Não é possível calcular a matriz inversa.");
    return null;
  }

  // Retorna a matriz inversa calculada
  return [
    [quartoElemento / determinante, -segundoElemento / determinante],
    [-terceiroElemento / determinante, primeiroElemento / determinante],
  ];
}

// Função para multiplicar matrizes
function multiplicarMatrizes(matriz1, matriz2) {
  const resultado = []; // Array para armazenar o resultado da multiplicação

  // Itera sobre as linhas da primeira matriz
  for (let i = 0; i < matriz1.length; i++) {
    resultado[i] = []; // Inicializa a linha no resultado

    // Itera sobre as colunas da segunda matriz
    for (let j = 0; j < matriz2[0].length; j++) {
      let soma = 0; // Inicializa a soma dos produtos

      // Itera sobre os elementos da linha e coluna correspondentes
      for (let k = 0; k < matriz1[0].length; k++) {
        soma += matriz1[i][k] * matriz2[k][j]; // Calcula o produto e adiciona à soma
      }

      // Arredonda o resultado para duas casas decimais e armazena no resultado
      resultado[i][j] = Math.round(soma * 100) / 100;
    }
  }

  // Retorna a matriz resultante da multiplicação
  return resultado;
}

// Função principal para descriptografar
function Descriptografar(
  primeiroElemento,
  segundoElemento,
  terceiroElemento,
  quartoElemento,
  sequenciaNumeros
) {
  // Calcula a matriz inversa usando os elementos fornecidos
  const matrizInversa = calcularMatrizInversa(
    primeiroElemento,
    segundoElemento,
    terceiroElemento,
    quartoElemento
  );

  // Se a matriz inversa não pôde ser calculada, retorna null
  if (matrizInversa === null) return null;

  // Converte a sequência de números em uma matriz criptografada
  const matrizCriptografada = transformarNumerosEmMatriz(sequenciaNumeros);

  // Multiplica a matriz criptografada pela matriz inversa para decifrá-la
  const matrizDecifrada = multiplicarMatrizes(
    matrizInversa,
    matrizCriptografada
  );

  // Converte a matriz decifrada em letras
  return converterNumerosEmLetras(matrizDecifrada);
}

// Função para descriptografar chamada pelo evento onclick
function descriptografar() {
  // Obtém os elementos da chave e a sequência de números do HTML
  const primeiroElemento = parseFloat(document.getElementById("numero1").value);
  const segundoElemento = parseFloat(document.getElementById("numero2").value);
  const terceiroElemento = parseFloat(document.getElementById("numero3").value);
  const quartoElemento = parseFloat(document.getElementById("numero4").value);
  const sequenciaNumeros = document.getElementById("sequenciaNumeros").value;

  // Chama a função de descriptografia com os elementos obtidos
  const resultado = Descriptografar(
    primeiroElemento,
    segundoElemento,
    terceiroElemento,
    quartoElemento,
    sequenciaNumeros
  );

  // Exibe o resultado da descriptografia como uma tabela HTML
  exibirMatrizCriptografada(resultado);
}

// Função para exibir a matriz criptografada na tabela HTML
function exibirMatrizCriptografada(matrizCriptografada) {
  // Obtém a referência ao elemento HTML onde a matriz será exibida
  const resultadoDiv = document.getElementById("resultado");
  resultadoDiv.innerHTML = ""; // Limpa o conteúdo anterior, se houver

  // Cria uma tabela HTML para exibir a matriz criptografada
  const table = document.createElement("table");
  table.classList.add("matriz");

  // Itera sobre cada linha da matriz criptografada
  matrizCriptografada.forEach((linha) => {
    const tr = document.createElement("tr");

    // Adiciona cada elemento da linha como uma célula na tabela
    linha.forEach((celula) => {
      const td = document.createElement("td");
      td.textContent = celula;
      tr.appendChild(td);
    });

    table.appendChild(tr); // Adiciona a linha à tabela
  });

  resultadoDiv.appendChild(table); // Adiciona a tabela ao elemento de resultado
}
