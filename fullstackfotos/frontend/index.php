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
        $query = "SELECT id FROM usuario WHERE nome=:username AND senha=:password";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':username', $username);
        $stmt->bindParam(':password', $password);
        $stmt->execute();

        return $stmt->rowCount() == 1;
    } else {
        // Retorne falso se $conn for nulo
        return false;
    }
}

// Processar o formulário quando enviado
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['username'], $_POST['password'])) {
        $username = $_POST['username'];
        $password = $_POST['password'];

        // Verificar se o usuário existe no banco de dados
        if (validarUsuario($conn, $username, $password)) {
            // Usuário autenticado, redirecionar para a página principal
            $_SESSION['logged_in'] = true;
            $_SESSION['username'] = $username;
            header('Location: ../frontend/pages/inicio.php');
            exit();
        } else {
            // Usuário ou senha incorretos, redirecionar de volta para a página de login
            $_SESSION['message'] = 'Usuário ou senha incorretos.';
            header('Location: ../frontend/pages/inicio.php');
            exit();
        }
    } elseif (isset($_POST['cancel'])) {
        // Se o botão de cancelar foi clicado, redirecionar para a página de login
        header('Location: ../frontend/pages/inicio.php');
        exit();
    }
}
?>

<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
</head>

<body>

    <!-- Modal -->
    <div id="loginModal" class="modal">
        <!-- Conteúdo do modal -->
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2 style="font-family: Roboto;">Login</h2>
            <hr style="border-top: 1px solid black;">
            <form action="../index.php" method="post">
                <label for="username" class="label">Usuário:</label><br>
                <input type="text" id="username" name="username" class="input"><br>
                <label for="password" class="label">Senha:</label><br>
                <input type="password" id="password" name="password" class="input"><br><br>
                <button type="button" class="cancelbtn">Cancelar</button>
                <button type="submit" name="login" class="loginbtn">Entrar</button>
            </form>
        </div>
    </div>
</body>

</html>