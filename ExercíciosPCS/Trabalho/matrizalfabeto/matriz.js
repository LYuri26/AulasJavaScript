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

// Função para transformar uma texto em uma matriz usando a tabela de caracteres
function transformarTextoEmMatriz(texto) {
    // Verifica se a texto foi fornecida
    if (!texto) {
        console.error("Nenhuma texto fornecida.");
        return []; // Retorna uma matriz vazia se nenhuma texto foi fornecida
    }

    // Obtém a tabela de caracteres
    const tabelaCaracteres = obterTabelaCaracteres();

    // Transforma a texto em maiúsculas
    const textoMaiuscula = texto.toUpperCase();

    // Divide a texto em um array de caracteres
    const caracteres = textoMaiuscula.split('');

    // Define o número de colunas baseado na quantidade de caracteres, cada caractere ocupará uma coluna
    const numColunas = Math.ceil(caracteres.length / 2); // ceil: arredonda para cima

    // Array para armazenar os números correspondentes aos caracteres da texto
    const matriz = [];

    // Itera sobre cada caractere da texto
    for (let i = 0; i < caracteres.length; i++) {
        const caractereAtual = caracteres[i];
        // Verifica se o caractere existe na tabela de caracteres
        if (tabelaCaracteres.hasOwnProperty(caractereAtual)) { // hasOwnProperty: verifica se o objeto possui a propriedade especificada
            // Se existir, adiciona o número correspondente à matriz
            matriz.push(tabelaCaracteres[caractereAtual]);
        } else {
            // Se não existir, adiciona 0 à matriz
            matriz.push(0);
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
    const primeiraLinha = matriz.slice(0, numColunas); // slice: retorna uma parte do array, especificando o índice inicial e final
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


// Função para transformar uma sequência de números em uma matriz de números com duas linhas
function transformarNumerosEmMatriz(sequenciaNumeros) {
    // Verifica se a sequência de números foi fornecida
    if (!sequenciaNumeros) {
      console.error("Nenhuma sequência de números fornecida.");
      return [];
    }
    // Divide a sequência de números em um array, separando por espaços
    const numeros = sequenciaNumeros.split(" ");
    // Calcula o número de colunas baseado na quantidade de números
    const numColunas = Math.ceil(numeros.length / 2);
    // Array para armazenar os números na matriz
    const matriz = [];
    // Itera sobre as duas linhas da matriz
    for (let i = 0; i < 2; i++) {
      const linha = [];
      // Itera sobre as colunas da matriz
      for (let j = 0; j < numColunas; j++) {
        const index = i * numColunas + j;
        // Verifica se ainda há números na sequência
        if (index < numeros.length) {
          // Adiciona o número convertido para inteiro na matriz
          linha.push(parseInt(numeros[index]));
        } else {
          // Se não houver mais números, adiciona 0 na matriz
          linha.push(0);
        }
      }
      // Adiciona a linha na matriz final
      matriz.push(linha);
    }
    // Retorna a matriz resultante
    return matriz;
  }
  
// Função para ser chamada quando o botão de transformar texto for clicado
function criptografar() {
    // Obtém o texto digitado no textarea
    const texto = document.getElementById('texto').value;
    // Chama a função para transformar a texto em matriz
    const matriz = transformarTextoEmMatriz(texto);
    // Exibe o resultado na div resultado
    document.getElementById('resultado').innerText = JSON.stringify(matriz);
    // Exibe a matriz no console
    console.log(matriz);
}

// Função principal para descriptografar
function Descriptografar() {
    // Obtém a sequência de números digitada no input
    const sequenciaNumeros = document.getElementById("sequenciaNumeros").value;
    // Obtém os números das chaves
    const numero1 = parseInt(document.getElementById("numero1").value);
    const numero2 = parseInt(document.getElementById("numero2").value);
    const numero3 = parseInt(document.getElementById("numero3").value);
    const numero4 = parseInt(document.getElementById("numero4").value);
  
    // Calcula a matriz inversa das chaves
    const matrizInversa = calcularMatrizInversa(numero1, numero2, numero3, numero4);
    // Se a matriz inversa for nula, encerra a função
    if (matrizInversa === null) return;
  
    // Exibe a matriz criptografada no console
    console.log("Matriz Criptografada:");
    const matrizCriptografada = transformarNumerosEmMatriz(sequenciaNumeros);
    console.log(matrizCriptografada);
  
    // Exibe a matriz da chave no console
    console.log("Matriz Chave:");
    console.log(`[${numero1}, ${numero2}], [${numero3}, ${numero4}]`);
  
    // Exibe a matriz inversa no console
    console.log("Matriz Inversa:");
    console.log(matrizInversa);
  
    // Multiplica a matriz inversa pela matriz criptografada para obter a matriz resultante
    const matrizResultado = multiplicarInversaPorCriptografada(matrizInversa, matrizCriptografada);
    // Exibe a matriz resultante no console
    console.log("Matriz Resultante:");
    console.log(matrizResultado);
  
    // Converte os números da matriz resultante em letras
    const matrizLetras = converterNumerosEmLetras(matrizResultado);
    // Exibe as letras correspondentes no console
    console.log("Letras Correspondentes:");
    matrizLetras.forEach(row => {
      row.forEach(letter => {
        console.log(letter);
      });
    });
  
    // Exibe o resultado na div resultado
    document.getElementById("resultado").innerText = JSON.stringify(matrizLetras);
}

// Aguarda o carregamento completo da página antes de executar o código
document.addEventListener("DOMContentLoaded", () => {
    // Adiciona o evento de clique ao botão "Descriptografar"
    document.getElementById("btnDescriptografar").addEventListener("click", Descriptografar);
});
