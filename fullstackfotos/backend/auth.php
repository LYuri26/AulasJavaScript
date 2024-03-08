<?php
session_start();

// Inclui o arquivo de conexão com o banco de dados
include 'connect.php';

// Array para armazenar as mensagens de log
$logMessages = array();

// Verificar se o usuário está logado
if (isset($_SESSION['logged_in']) && $_SESSION['logged_in'] === true) {
    // Se o usuário estiver logado, retorna true
    echo json_encode(array('logged_in' => true, 'log_messages' => $logMessages));
} else {
    // Se o usuário não estiver logado, retorna false
    echo json_encode(array('logged_in' => false, 'log_messages' => $logMessages));
}

// Função para verificar se o usuário existe no banco de dados
function validarUsuario($conn, $username, $password)
{
    global $logMessages; // Importando o array de mensagens de log

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
            $logMessages[] = "Usuário autenticado.";
            return true;
        }
    }
    // Retorne falso se $conn for nulo ou se o usuário não for encontrado
    $logMessages[] = "Usuário não encontrado.";
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
            // Usuário ou senha incorretos, armazenar mensagem na sessão
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
