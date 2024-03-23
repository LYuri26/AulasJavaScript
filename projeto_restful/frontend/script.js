const baseURL = '../backend'; // O caminho relativo começa a partir do diretório atual

// Função para carregar a lista de usuários
function carregarUsuarios() {
    fetch(`${baseURL}/listar_usuarios.php`)
        .then(response => response.json())
        .then(usuarios => {
            // Limpar a lista de usuários existente
            document.getElementById('usuarios').innerHTML = '';

            // Adicionar cada usuário à lista
            usuarios.forEach(usuario => {
                const usuarioElemento = document.createElement('div');
                usuarioElemento.innerHTML = `<strong>Nome:</strong> ${usuario.nome}, <strong>Email:</strong> ${usuario.email}`;
                document.getElementById('usuarios').appendChild(usuarioElemento);
            });
        })
        .catch(error => console.error('Erro ao carregar usuários:', error));
}

// Função para adicionar um novo usuário
function adicionarUsuario(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    // Enviar uma requisição POST para inserir um novo usuário
    fetch(`${baseURL}/inserir_usuario.php`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, email, senha })
    })
    .then(response => {
        if (response.ok) {
            // Atualizar a lista de usuários após adicionar um novo usuário
            carregarUsuarios();
        } else {
            console.error('Erro ao adicionar usuário:', response.statusText);
        }
    })
    .catch(error => console.error('Erro ao adicionar usuário:', error));
}

// Adicionar evento de submit para o formulário de adicionar usuário
document.getElementById('formUsuario').addEventListener('submit', adicionarUsuario);

// Carregar a lista de usuários ao carregar a página
carregarUsuarios();
