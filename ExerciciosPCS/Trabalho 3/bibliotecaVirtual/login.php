<?php
// Inclui o arquivo de configuração com a conexão PDO
require_once './bancoDeDados/conexao.php';

// Define a variável de erro
$erro = '';

// Verifica se o formulário de login foi enviado
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recebe os dados do formulário
    $email = $_POST['email'];
    $senha = $_POST['senha'];

    try {
        // Prepara a consulta SQL para verificar o usuário e a senha no banco de dados
        $query = $conexao->prepare("SELECT * FROM usuarios WHERE email = :email AND senha = :senha");
        $query->bindParam(':email', $email);
        $query->bindParam(':senha', $senha);

        // Executa a consulta
        $query->execute();

        // Verifica se encontrou um usuário com o email e senha fornecidos
        if ($query->rowCount() > 0) {
            // Usuário autenticado, redireciona para a página principal
            header("Location: index.html");
            exit; // Termina o script
        } else {
            // Caso contrário, define a mensagem de erro e reinicia a página
            $erro = "Email ou senha incorretos.";
            header("Location: erro.html");
            exit; // Termina o script
        }
    } catch (PDOException $e) {
        // Em caso de erro na consulta, exibe a mensagem de erro
        $erro = "Erro na consulta: " . $e->getMessage();
    }
}
?>

<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./assets/css/stylemodal.css"> <!-- Importa o arquivo CSS para estilização. -->
    <title>Login</title>
</head>

<body>

    <div id="modal">
        <div id="modalContent">
            <span onclick="closeModal()" class="close">&times;</span> <!-- Botão "X" para fechar o modal -->
            <h2>Login</h2>
            <form method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>">
                <label for="email">Email:</label>
                <input type="email" name="email" required>
                <label for="senha">Senha:</label>
                <input type="password" name="senha" required>
                <input type="submit" value="entrar">
            </form>
        </div>
    </div>

</body>

</html>