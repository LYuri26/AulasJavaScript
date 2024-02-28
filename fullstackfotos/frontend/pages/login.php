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
            header('Location: ./inicio.php');
            exit();
        } else {
            // Usuário ou senha incorretos, redirecionar de volta para a página de login
            $_SESSION['message'] = 'Usuário ou senha incorretos.';
            header('Location: ./inicio.php');
            exit();
        }
    } elseif (isset($_POST['cancel'])) {
        // Se o botão de cancelar foi clicado, redirecionar para a página de login
        header('Location: ./inicio.php');
        exit();
    }
}
?>

<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LIVROS RECOMENDADOS</title>
</head>

<body>

    <!-- Modal -->
    <div id="loginModal" class="modal">
        <!-- Conteúdo do modal -->
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2 style="font-family: Roboto;">Login</h2>
            <hr style="border-top: 1px solid black;">
            <form action="./login.php" method="post">
                <label for="username" class="label">Usuário:</label><br>
                <input type="text" id="username" name="username" class="input"><br>
                <label for="password" class="label">Senha:</label><br>
                <input type="password" id="password" name="password" class="input"><br><br>
                <button type="button" class="cancelbtn">Cancelar</button>
                <button type="submit" name="login" class="loginbtn">Entrar</button>
            </form>
        </div>
    </div>

    <script>
        // Verificar se há uma mensagem de sessão PHP
        <?php if (isset($_SESSION['message'])) { ?>
            console.log(<?php echo json_encode($_SESSION['message']); ?>);
            <?php unset($_SESSION['message']); // Limpar a mensagem de sessão 
            ?>
        <?php } ?>

        // Verificar se o usuário está logado e exibir seu nome no console
        <?php if (isset($_SESSION['logged_in']) && $_SESSION['logged_in']) { ?>
            console.log("Usuário logado: <?php echo $_SESSION['username']; ?>");
        <?php } ?>
    </script>
    <script src="../static/js/login.js"></script>
</body>

</html>