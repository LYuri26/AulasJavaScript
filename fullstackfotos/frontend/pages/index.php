<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Livros Recomendados</title>
    <link rel="stylesheet" href="../static/css/index.css">
    <link rel="stylesheet" href="../static/css/modallogin.css">
    <link rel="stylesheet" href="../static/css/conteudo.css">
    <link rel="stylesheet" href="../static/css/postagens.css">
    <link rel="stylesheet" href="../static/css/modalestilo.css">
    <link rel="stylesheet" href="../static/css/modalpostagens.css">

</head>

<body>
    <!-- Cabeçalho -->
    <header>
        <div class="logo">
            <h1>LIVROS RECOMENDADOS</h1>
        </div>
        <nav>
            <ul>
                
                <?php
                include './modallogin.php';

                // Verificar se o usuário está logado
                if (isset($_SESSION['logged_in']) && $_SESSION['logged_in'] === true) {
                    // Se estiver logado, exibir o nome do usuário e o botão "Sair"
                    echo '<li class="nomeusuario">Usuário logado: ' . $_SESSION['username'] . '</li>';
                    echo '<li><button id="logoutBtn">Sair</button></li>';
                } else {
                    // Se não estiver logado, exibir o botão "Login"
                    echo '<li><button id="openModalBtn">Login</button></li>';
                }
                ?>

            </ul>
        </nav>
    </header>

    <!-- Conteúdo do Corpo -->
    <?php
    include 'postagens.php';
    include 'modalpostagens.php';
    ?>

    <!-- Rodapé -->
    <footer>
        <div class="logo">
            <h1>LIVROS RECOMENDADOS</h1>
        </div>
        <div class="social-icons">
            <img src="../static/images/icons/twitter.svg" alt="Twitter">
            <img src="../static/images/icons/instagram.svg" alt="Instagram">
            <img src="../static/images/icons/youtube.svg" alt="YouTube">
            <img src="../static/images/icons/tiktok.svg" alt="TikTok">
        </div>
        <div class="copyright">
            <p>Copyright-2024</p>
        </div>
    </footer>

    <script src="../static/js/index.js"></script>
    <script src="../static/js/modallogin.js"></script>
    <script src="../static/js/modalpostagens_like.js"></script>
    <script src="../static/js/postagens.js"></script>
</body>

</html>