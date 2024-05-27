// Função para multiplicar duas matrizes
function multiplicarMatrizes(matrizChave, matrizTexto) {
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
      let soma = 0;
      for (let k = 0; k < numColunasMatrizChave; k++) {
        soma += matrizChave[i][k] * matrizTexto[k][j]; // Calcula o produto das matrizes
      }
      matrizCriptografada[i][j] = soma; // Armazena o resultado na matriz criptografada
    }
  }

  return matrizCriptografada; // Retorna a matriz criptografada
}

// Função para criptografar o texto
function criptografar() {
  // Obtém os valores dos campos da matriz chave
  const chave1 = parseInt(document.getElementById("numero1").value);
  const chave2 = parseInt(document.getElementById("numero2").value);
  const chave3 = parseInt(document.getElementById("numero3").value);
  const chave4 = parseInt(document.getElementById("numero4").value);

  // Cria a matriz chave com os valores dos campos
  const matrizChave = [
    [chave1, chave2],
    [chave3, chave4],
  ];

  // Obtém o texto digitado
  const texto = document.getElementById("texto").value;

  // Transforma o texto em uma matriz usando a função transformarTextoEmMatriz
  const matrizTexto = transformarTextoEmMatriz(texto);

  // Realiza a multiplicação das matrizes
  const matrizCriptografada = multiplicarMatrizes(matrizChave, matrizTexto);

  // Exibe a matriz criptografada na tabela HTML
  exibirMatrizCriptografada(matrizCriptografada);
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

// Obtendo uma referência ao botão "Criptografar"
const botaoCriptografar = document.getElementById("btnCriptografar");

// Adicionando um ouvinte de evento para o clique no botão "Criptografar"
botaoCriptografar.addEventListener("click", criptografar);

// Função para transformar um texto em uma matriz usando a tabela de caracteres
function transformarTextoEmMatriz(texto) {
  // Verifica se um texto foi fornecido
  if (!texto) {
    console.error("Nenhum texto fornecido.");
    return []; // Retorna uma matriz vazia se nenhum texto foi fornecido
  }

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
