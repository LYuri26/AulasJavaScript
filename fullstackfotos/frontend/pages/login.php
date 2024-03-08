<?php

// Incluindo arquivo de conexão com o banco de dados
include '../../backend/conexao_login.php'; // Verifique o caminho correto aqui

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

    <script src="../static/js/login.js"></script>
</body>

</html>