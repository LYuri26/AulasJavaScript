// Função para obter a lista de usuários da API JSONPlaceholder
const obterListaUsuarios = async () => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
            throw new Error('Erro ao obter lista de usuários');
        }
        const usuarios = await response.json();
        return usuarios;
    } catch (error) {
        throw new Error('Erro ao obter lista de usuários:', error);
    }
};

// Função para remover um usuário da lista
const removerUsuario = async (idUsuario) => {
    try {
        // Obter a lista de usuários
        let listaUsuarios = await obterListaUsuarios();

        // Verificar se o usuário a ser removido existe na lista
        const usuarioExistente = listaUsuarios.find(usuario => usuario.id === idUsuario);
        if (!usuarioExistente) {
            throw new Error('Usuário não encontrado');
        }

        // Remover o usuário da lista
        listaUsuarios = listaUsuarios.filter(usuario => usuario.id !== idUsuario);
        console.log(`Usuário com ID ${idUsuario} removido com sucesso`);

        // Retornar a lista atualizada de usuários
        return listaUsuarios;
    } catch (error) {
        throw new Error('Erro ao remover usuário:', error);
    }
};

// Programa funcional
const main = async () => {
    try {
        // Exibir lista de usuários antes da remoção
        console.log('Lista de usuários antes da remoção:');
        const listaAntesRemocao = await obterListaUsuarios();
        console.log(listaAntesRemocao);

        // Remover um usuário (exemplo: remover usuário com ID 3)
        const idUsuarioRemover = 3;
        const listaAtualizada = await removerUsuario(idUsuarioRemover);

        // Exibir lista de usuários após a remoção
        console.log('\nLista de usuários após remoção:');
        console.log(listaAtualizada);
    } catch (error) {
        console.error('Erro no programa:', error.message);
    }
};

// Execução do programa
main();
