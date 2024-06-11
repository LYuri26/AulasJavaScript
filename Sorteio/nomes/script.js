function sortearNomeUnico() {
    // Obtém o valor do textarea com a lista de nomes.
    const nomesInput = document.getElementById('nomes').value;
    // Divide a string em linhas, remove espaços em branco extras e filtra linhas vazias.
    const nomes = nomesInput.split('\n').map(nome => nome.trim()).filter(nome => nome.length > 0);
    
    // Verifica se a lista de nomes está vazia.
    if (nomes.length === 0) {
        // Exibe uma mensagem de erro se a lista estiver vazia.
        document.getElementById('resultado').innerText = 'Por favor, insira uma lista de nomes válida.';
        return; // Sai da função para evitar erros adicionais.
    }

    // Gera um índice aleatório dentro do tamanho da lista de nomes.
    const indiceSorteado = Math.floor(Math.random() * nomes.length);
    // Seleciona o nome sorteado com base no índice aleatório.
    const nomeSorteado = nomes[indiceSorteado];
    
    // Exibe o nome sorteado na div de resultado.
    document.getElementById('resultado').innerText = `Nome sorteado: ${nomeSorteado}`;
}

function sortearNomesEmGrupo() {
    // Obtém o valor do textarea com a lista de nomes.
    const nomesInput = document.getElementById('nomes').value;
    // Divide a string em linhas, remove espaços em branco extras e filtra linhas vazias.
    const nomes = nomesInput.split('\n').map(nome => nome.trim()).filter(nome => nome.length > 0);
    // Obtém o valor selecionado para o tamanho do grupo e converte para um número inteiro.
    const tamanhoGrupo = parseInt(document.getElementById('tamanho-grupo').value, 10);

    // Verifica se a lista de nomes está vazia ou se o tamanho do grupo é inválido.
    if (nomes.length === 0 || isNaN(tamanhoGrupo) || tamanhoGrupo <= 0) {
        // Exibe uma mensagem de erro se a lista ou o tamanho do grupo for inválido.
        document.getElementById('resultado').innerText = 'Por favor, insira uma lista de nomes válida e um tamanho de grupo válido.';
        return; // Sai da função para evitar erros adicionais.
    }

    // Verifica se o tamanho do grupo é maior que o número de nomes disponíveis.
    if (tamanhoGrupo > nomes.length) {
        // Exibe uma mensagem de erro se o tamanho do grupo for maior que a lista de nomes.
        document.getElementById('resultado').innerText = 'Tamanho do grupo não pode ser maior que o número de nomes.';
        return; // Sai da função para evitar erros adicionais.
    }

    // Inicializa um array para armazenar os grupos sorteados.
    const grupos = [];
    // Cria uma cópia da lista de nomes para manipulação durante o sorteio.
    const nomesDisponiveis = [...nomes];

    // Continua formando grupos até que todos os nomes sejam alocados.
    while (nomesDisponiveis.length > 0) {
        // Inicializa um array para armazenar o grupo atual.
        const grupo = [];
        // Adiciona nomes ao grupo até atingir o tamanho especificado ou esgotar os nomes disponíveis.
        for (let i = 0; i < tamanhoGrupo && nomesDisponiveis.length > 0; i++) {
            // Gera um índice aleatório para selecionar um nome.
            const indiceSorteado = Math.floor(Math.random() * nomesDisponiveis.length);
            // Adiciona o nome sorteado ao grupo.
            grupo.push(nomesDisponiveis[indiceSorteado]);
            // Remove o nome sorteado da lista de nomes disponíveis.
            nomesDisponiveis.splice(indiceSorteado, 1);
        }
        // Adiciona o grupo formado à lista de grupos.
        grupos.push(grupo);
    }

    // Constrói uma string de resultado com a descrição de cada grupo.
    const resultado = grupos.map((grupo, index) => `Grupo ${index + 1}: ${grupo.join(', ')}`).join('\n');
    // Exibe os grupos sorteados na div de resultado.
    document.getElementById('resultado').innerText = `Grupos sorteados:\n${resultado}`;
}

function sortearOrdemGrupos() {
    // Obtém o valor do textarea com a lista de grupos.
    const nomesInput = document.getElementById('nomes').value;
    // Divide a string em linhas, remove espaços em branco extras e filtra linhas vazias.
    const grupos = nomesInput.split('\n').map(grupo => grupo.trim()).filter(grupo => grupo.length > 0);
    
    // Verifica se a lista de grupos está vazia.
    if (grupos.length === 0) {
        // Exibe uma mensagem de erro se a lista estiver vazia.
        document.getElementById('resultado').innerText = 'Por favor, insira uma lista de grupos ou nomes válida.';
        return; // Sai da função para evitar erros adicionais.
    }

    // Embaralha a ordem dos grupos usando o algoritmo de Fisher-Yates.
    for (let i = grupos.length - 1; i > 0; i--) {
        // Gera um índice aleatório para trocar posições com o índice atual.
        const j = Math.floor(Math.random() * (i + 1));
        // Troca a posição do grupo no índice atual com o grupo no índice aleatório.
        [grupos[i], grupos[j]] = [grupos[j], grupos[i]];
    }

    // Constrói uma string de resultado com a nova ordem dos grupos.
    const resultado = grupos.map((grupo, index) => `Posição ${index + 1}: ${grupo}`).join('\n');
    // Exibe a nova ordem dos grupos na div de resultado.
    document.getElementById('resultado').innerText = `Ordem sorteada dos grupos:\n${resultado}`;
}
