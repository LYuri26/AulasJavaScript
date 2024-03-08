<?php
// Incluindo arquivo de conexão com o banco de dados
include '../../backend/connect.php'; // Verifique o caminho correto aqui

session_start();

// Função para verificar se o usuário existe no banco de dados
function validarUsuario($conn, $username, $password)
{
    // Certifique-se de que $conn não é nulo
    if ($conn) {
        // Consultar se o usuário e a senha correspondem
        $query = "SELECT id, nome FROM usuario WHERE nome=:username AND senha=:password";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':username', $username);
        $stmt->bindParam(':password', $password);
        $stmt->execute();

        // Verificar se a consulta retornou um resultado
        if ($stmt->rowCount() == 1) {
            // Armazenar o ID do usuário na sessão
            $user = $stmt->fetch(PDO::FETCH_ASSOC);
            $_SESSION['logged_in'] = true;
            $_SESSION['user_id'] = $user['id']; // Armazena o ID do usuário na sessão
            $_SESSION['username'] = $user['nome'];
            return true;
        }
    }
    // Retorne falso se $conn for nulo ou se o usuário não for encontrado
    return false;
}

// Processar o formulário quando enviado
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['username'], $_POST['password'])) {
        $username = $_POST['username'];
        $password = $_POST['password'];

        // Verificar se o usuário existe no banco de dados
        if (validarUsuario($conn, $username, $password)) {
            // Usuário autenticado, redirecionar para a página principal
            header('Location: ./index.php');
            exit();
        } else {
            // Usuário ou senha incorretos, redirecionar de volta para a página de login
            $_SESSION['message'] = 'Usuário ou senha incorretos.';
            header('Location: ./index.php');
            exit();
        }
    } elseif (isset($_POST['cancel'])) {
        // Se o botão de cancelar foi clicado, redirecionar para a página de login
        header('Location: ./index.php');
        exit();
    }
}
?>
