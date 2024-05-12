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
function multiplicarMatrizes(matriz1, matriz2) {
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
function Descriptografar() {
  // Obtém os valores dos campos de entrada
  const sequenciaNumeros = document.getElementById("sequenciaNumeros").value;
  const primeiroElemento = parseInt(document.getElementById("numero1").value);
  const segundoElemento = parseInt(document.getElementById("numero2").value);
  const terceiroElemento = parseInt(document.getElementById("numero3").value);
  const quartoElemento = parseInt(document.getElementById("numero4").value);

  // Calcula a matriz inversa da matriz chave
  const matrizInversa = calcularMatrizInversa(
    primeiroElemento,
    segundoElemento,
    terceiroElemento,
    quartoElemento
  );
  if (matrizInversa === null) return; // Retorna se a matriz inversa for nula

  // Exibe informações das matrizes para fins de depuração
  console.log("Matriz Criptografada:");
  const matrizCriptografada = transformarNumerosEmMatriz(sequenciaNumeros);
  console.log(matrizCriptografada);

  console.log("Matriz Chave:");
  console.log(
    `[${primeiroElemento}, ${segundoElemento}], [${terceiroElemento}, ${quartoElemento}]`
  );

  console.log("Matriz Inversa:");
  console.log(matrizInversa);

  // Calcula o produto da matriz inversa pela matriz criptografada
  const matrizResultado = multiplicarMatrizes(
    matrizInversa,
    matrizCriptografada
  );
  console.log("Matriz Resultante:");
  console.log(matrizResultado);

  // Converte os números resultantes em letras correspondentes
  const matrizLetras = converterNumerosEmLetras(matrizResultado);
  console.log("Letras Correspondentes:");
  matrizLetras.forEach((row) => {
    row.forEach((letter) => {
      console.log(letter);
    });
  });

  // Exibe a matriz descriptografada na página HTML
  exibirMatrizDescriptografada(matrizLetras);
}

// Função para exibir a matriz descriptografada na tabela HTML
function exibirMatrizDescriptografada(matrizDescriptografada) {
  // Obtém a referência ao elemento HTML onde a matriz será exibida
  const resultadoDiv = document.getElementById("resultado");
  resultadoDiv.innerHTML = ""; // Limpa o conteúdo anterior, se houver

  // Cria uma tabela HTML para exibir a matriz descriptografada
  const table = document.createElement("table");
  table.classList.add("matriz");

  // Itera sobre cada linha da matriz descriptografada
  matrizDescriptografada.forEach((linha) => {
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