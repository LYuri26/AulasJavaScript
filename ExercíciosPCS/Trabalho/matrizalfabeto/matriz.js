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
function transformartextoEmMatriz(texto) {
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

// Função para transformar uma sequência de números em uma matriz de letras usando a tabela de caracteres
function transformarNumerosEmMatriz(sequenciaNumeros) {
    // Verifica se a sequência de números foi fornecida
    if (!sequenciaNumeros) {
        console.error("Nenhuma sequência de números fornecida.");
        return []; // Retorna uma matriz vazia se nenhum número foi fornecido
    }

    // Obtém a tabela de caracteres
    const tabelaCaracteres = obterTabelaCaracteres();

    // Divide a sequência de números em um array, separando por espaços
    const numeros = sequenciaNumeros.split(' ');

    // Define o número de colunas baseado na quantidade de números
    const numColunas = Math.ceil(numeros.length / 2);

    // Array para armazenar as letras correspondentes aos números
    const matriz = [];

    // Itera sobre cada número da sequência
    for (let i = 0; i < numeros.length; i++) {
        const numeroAtual = numeros[i];
        // Verifica se o número existe na tabela de caracteres
        if (tabelaCaracteres.hasOwnProperty(numeroAtual)) {
            // Se existir, adiciona a letra correspondente à matriz
            matriz.push(tabelaCaracteres[numeroAtual]);
        } else {
            // Se não existir, adiciona '0' à matriz
            matriz.push('0');
        }
    }

    // Verifica se o número de colunas é maior que o número de elementos na matriz
    if (numColunas > matriz.length) {
        // Preenche com zeros até atingir o número de colunas
        const diferenca = numColunas - matriz.length;
        for (let i = 0; i < diferenca; i++) {
            matriz.push('0');
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
            segundaLinha.push('0');
        }
    }

    // Retorna a matriz resultante
    return [primeiraLinha, segundaLinha];
}

// Função para transformar uma sequência de números em uma matriz de letras usando a tabela de caracteres
function transformarNumerosEmMatriz(sequenciaNumeros) {
    // Verifica se a sequência de números foi fornecida
    if (!sequenciaNumeros) {
        console.error("Nenhuma sequência de números fornecida.");
        return []; // Retorna uma matriz vazia se nenhum número foi fornecido
    }

    // Obtém a tabela de caracteres
    const tabelaCaracteres = obterTabelaCaracteres(); // Obtém a tabela de caracteres da função 'obterTabelaCaracteres()'

    // Divide a sequência de números em um array, separando por espaços
    const numeros = sequenciaNumeros.split(' '); // split: divide a sequência de números em um array usando o espaço como separador

    // Define o número de colunas baseado na quantidade de números
    const numColunas = Math.ceil(numeros.length / 2); // ceil: arredonda para cima o resultado da divisão dos números por 2

    // Array para armazenar as letras correspondentes aos números
    const matriz = [];

    // Itera sobre cada número da sequência
    for (let i = 0; i < numeros.length; i++) {
        const numeroAtual = parseInt(numeros[i]); // Converte o número para inteiro usando parseInt
        // Verifica se o número existe na tabela de caracteres
        if (!isNaN(numeroAtual) && numeroAtual >= 1 && numeroAtual <= Object.keys(tabelaCaracteres).length) {
            // Se existir, adiciona a letra correspondente à matriz
            const letra = Object.keys(tabelaCaracteres)[numeroAtual - 1]; // Obtém a letra correspondente ao número atual
            matriz.push(letra); // Adiciona a letra à matriz
        } else {
            // Se o número estiver fora do intervalo permitido, adiciona '0' à matriz
            matriz.push('0');
        }
    }

    // Verifica se o número de colunas é maior que o número de elementos na matriz
    if (numColunas > matriz.length) {
        // Preenche com zeros até atingir o número de colunas
        const diferenca = numColunas - matriz.length;
        for (let i = 0; i < diferenca; i++) {
            matriz.push('0');
        }
    }

    // Divide a matriz em duas linhas
    const primeiraLinha = matriz.slice(0, numColunas); // slice: retorna uma parte da matriz, do índice 0 até numColunas
    const segundaLinha = matriz.slice(numColunas); // slice: retorna uma parte da matriz, do índice numColunas até o final

    // Verifica se a segunda linha tem o mesmo número de elementos que a primeira
    if (segundaLinha.length < primeiraLinha.length) {
        // Preenche com zeros até ter a mesma quantidade de elementos
        const diferenca = primeiraLinha.length - segundaLinha.length;
        for (let i = 0; i < diferenca; i++) {
            segundaLinha.push('0');
        }
    }

    // Retorna a matriz resultante
    return [primeiraLinha, segundaLinha];
}

// Função para ser chamada quando o botão de transformar texto for clicado
function criptografar() {
    // Obtém o texto digitado no textarea
    const texto = document.getElementById('texto').value;
    // Chama a função para transformar a texto em matriz
    const matriz = transformartextoEmMatriz(texto);
    // Exibe o resultado na div resultado
    document.getElementById('resultado').innerText = JSON.stringify(matriz);
    // Exibe a matriz no console
    console.log(matriz);
}

// Função para ser chamada quando o botão de transformar sequência de números for clicado
function testarTransformacaoNumeros() {
    // Obtém a sequência de números digitada no textarea
    const sequenciaNumeros = document.getElementById('sequenciaNumeros').value;
    // Chama a função para transformar a sequência de números em matriz de letras
    const matrizLetras = transformarNumerosEmMatriz(sequenciaNumeros);
    // Exibe o resultado na div resultado
    document.getElementById('resultado').innerText = JSON.stringify(matrizLetras);
    // Exibe a matriz no console
    console.log(matrizLetras);
}
