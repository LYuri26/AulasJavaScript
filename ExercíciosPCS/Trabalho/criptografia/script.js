// Função para multiplicar duas matrizes
function multiplicarMatrizes(matrizChave, matrizTexto) {
    const colunasMatrizChave = matrizChave[0].length; // Obtém o número de colunas da matriz chave
    const linhasMatrizTexto = matrizTexto.length; // Obtém o número de linhas da matriz de texto
  
    // Verifica se as dimensões das matrizes são compatíveis para multiplicação
    if (colunasMatrizChave !== linhasMatrizTexto) {
      console.error(
        "As dimensões das matrizes não são compatíveis para multiplicação."
      );
      return []; // Retorna uma matriz vazia se as dimensões não forem compatíveis
    }
  
    const linhasMatrizChave = matrizChave.length; // Obtém o número de linhas da matriz chave
    const colunasMatrizTexto = matrizTexto[0].length; // Obtém o número de colunas da matriz de texto
  
    // Inicializa a matriz resultante
    const matrizCriptografada = [];
  
    // Realiza a multiplicação das matrizes
    for (let i = 0; i < linhasMatrizChave; i++) {
      matrizCriptografada[i] = [];
      for (let j = 0; j < colunasMatrizTexto; j++) {
        let sum = 0;
        for (let k = 0; k < colunasMatrizChave; k++) {
          sum += matrizChave[i][k] * matrizTexto[k][j]; // Calcula o produto das matrizes
        }
        matrizCriptografada[i][j] = sum; // Armazena o resultado na matriz criptografada
      }
    }
  
    return matrizCriptografada; // Retorna a matriz criptografada
  }
  
  // Função para criptografar o texto
  function criptografarTexto() {
    // Obtém os valores dos campos da matriz chave
    const chave1 = parseInt(document.getElementById("numero1").value);
    const chave2 = parseInt(document.getElementById("numero2").value);
    const chave3 = parseInt(document.getElementById("numero3").value);
    const chave4 = parseInt(document.getElementById("numero4").value);
  
    // Cria a matriz 2x2 chave com os valores dos campos
    const matrizChave = [
      [chave1, chave2],
      [chave3, chave4],
    ];
  
    // Obtém o texto digitado
    const texto = document.getElementById("texto").value;
  
    // Transforma o texto em uma matriz usando a função transformarTextoEmMatriz
    const matrizTexto = transformartextoEmMatriz(texto); // Função não definida
  
    // Realiza a multiplicação das matrizes
    const matrizCriptografada = multiplicarMatrizes(matrizChave, matrizTexto);
  
    // Exibe a matriz criptografada na tabela
    const resultadoDiv = document.getElementById("resultado");
    resultadoDiv.innerHTML = ""; // Limpa o conteúdo anterior
  
    const table = document.createElement("table");
    table.classList.add("matriz");
  
    // Itera sobre cada linha da matriz criptografada
    matrizCriptografada.forEach((row) => {
      const tr = document.createElement("tr");
  
      // Adiciona cada elemento da linha como uma célula na tabela
      row.forEach((cell) => {
        const td = document.createElement("td");
        td.textContent = cell;
        tr.appendChild(td);
      });
  
      table.appendChild(tr);
    });
  
    resultadoDiv.appendChild(table); // Adiciona a tabela ao elemento de resultado
  }
  
  // Obtendo uma referência ao botão "Criptografar"
  const btnCriptografar = document.getElementById("btnCriptografar");
  
  // Adicionando um ouvinte de evento para o clique no botão "Criptografar"
  btnCriptografar.addEventListener("click", criptografarTexto);
  