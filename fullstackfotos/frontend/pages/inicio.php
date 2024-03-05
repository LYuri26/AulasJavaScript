<?php
include './login.php';
include './postagem.php';
include '../../backend/connect.php';
?>

<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Livros Recomendados</title>
    <link rel="stylesheet" href="../static/css/inicio.css">
    <link rel="stylesheet" href="../static/css/login.css">
    <link rel="stylesheet" href="../static/css/postagem.css">
    <title>LIVROS RECOMENDADOS</title>
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
    <div class="container">
        <div class="row">
            <div class="col-6">
                <div class="post" id="post-1">
                    <img src="../static/images/fotos/aeradocapitalimprodutivo.jpg" alt="A Era do Capital Improdutivo" class="regular-image" id="imagem-1" onclick="openModal('../static/images/fotos/aeradocapitalimprodutivo.jpg')">
                    <div class="actions">
                        <img src="../static/images/icons/coracao.svg" alt="Coração" class="like-icon" onclick="like(1)">
                        <span class="likes">0</span>
                        <img src="../static/images/icons/coment.svg" alt="Comentário" onclick="openCommentModal(1)">
                        <span class="comments">0</span>
                    </div>
                </div>
            </div>

            <div class="col-6">
                <div class="post" id="post-2">
                    <img src="../static/images/fotos/aorigemdafamíliadapropriedadeprivadaedoestado.jpg" alt="A Origem da Família da Propriedade Privada e do Estado" class="regular-image" id="imagem-2" onclick="openModal('../static/images/fotos/aorigemdafamíliadapropriedadeprivadaedoestado.jpg')">
                    <div class="actions">
                        <img src="../static/images/icons/coracao.svg" alt="Coração" class="like-icon" onclick="like(2)">
                        <span class="likes">0</span>
                        <img src="../static/images/icons/coment.svg" alt="Comentário" onclick="openCommentModal(2)">
                        <span class="comments">0</span>
                    </div>
                </div>
            </div>

            <div class="col-6">
                <div class="post" id="post-3">
                    <img src="../static/images/fotos/vigiarepunir.jpg" alt="Vigiar e Punir" class="regular-image" id="imagem-3" onclick="openModal('../static/images/fotos/vigiarepunir.jpg')">
                    <div class="actions">
                        <img src="../static/images/icons/coracao.svg" alt="Coração" class="like-icon" onclick="like(3)">
                        <span class="likes">0</span>
                        <img src="../static/images/icons/coment.svg" alt="Comentário" onclick="openCommentModal(3)">
                        <span class="comments">0</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-4">
                <div class="post" id="post-4" onclick="openModal('../static/images/fotos/asveiasabertasdaamericalatina.jpg')">
                    <img src="../static/images/fotos/asveiasabertasdaamericalatina.jpg" alt="As Veias Abertas da América Latina">
                    <div class="actions">
                        <img src="../static/images/icons/coracao.svg" alt="Coração" class="like-icon" onclick="like(4)">
                        <span class="likes">0</span>
                        <img src="../static/images/icons/coment.svg" alt="Comentário" onclick="openCommentModal(4)">
                        <span class="comments">0</span>
                    </div>
                </div>
            </div>
            <div class="col-4">
                <div class="post" id="post-5" onclick="openModal('../static/images/fotos/democraciaelutadeclasses.jpg')">
                    <img src="../static/images/fotos/democraciaelutadeclasses.jpg" alt="Democracia e Luta de Classes">
                    <div class="actions">
                        <img src="../static/images/icons/coracao.svg" alt="Coração" class="like-icon" onclick="like(5)">
                        <span class="likes">0</span>
                        <img src="../static/images/icons/coment.svg" alt="Comentário" onclick="openCommentModal(5)">
                        <span class="comments">0</span>
                    </div>
                </div>
            </div>
            <div class="col-4">
                <div class="post" id="post-6" onclick="openModal('../static/images/fotos/olivrovermelho.jpg')">
                    <img src="../static/images/fotos/olivrovermelho.jpg" alt="O Livro Vermelho">
                    <div class="actions">
                        <img src="../static/images/icons/coracao.svg" alt="Coração" class="like-icon" onclick="like(6)">
                        <span class="likes">0</span>
                        <img src="../static/images/icons/coment.svg" alt="Comentário" onclick="openCommentModal(6)">
                        <span class="comments">0</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <div class="post" id="post-7" onclick="openModal('../static/images/fotos/desigualdadeecaminhosparaumasociedademaisjusta.jpg')">
                    <img src="../static/images/fotos/desigualdadeecaminhosparaumasociedademaisjusta.jpg" alt="Desigualdade e Caminhos para uma Sociedade Mais Justa">
                    <div class="actions">
                        <img src="../static/images/icons/coracao.svg" alt="Coração" class="like-icon" onclick="like(7)">
                        <span class="likes">0</span>
                        <img src="../static/images/icons/coment.svg" alt="Comentário" onclick="openCommentModal(7)">
                        <span class="comments">0</span>
                    </div>
                </div>
            </div>
            <div class="col-4">
                <div class="post" id="post-8" onclick="openModal('../static/images/fotos/manifestocomunista.jpg')">
                    <img src="../static/images/fotos/manifestocomunista.jpg" alt="Manifesto Comunista">
                    <div class="actions">
                        <img src="../static/images/icons/coracao.svg" alt="Coração" class="like-icon" onclick="like(8)">
                        <span class="likes">0</span>
                        <img src="../static/images/icons/coment.svg" alt="Comentário" onclick="openCommentModal(8)">
                        <span class="comments">0</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="../static/js/inicio.js"></script>
    <script src="../static/js/login.js"></script>
    <script src="../static/js/postagem.js"></script>
</body>

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

</html>