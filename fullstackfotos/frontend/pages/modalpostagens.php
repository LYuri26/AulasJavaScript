<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LIVROS RECOMENDADOS</title>
</head>

<body>

    <!-- Modal -->
    <div class="modal" id="myModalPost" style="display: none;">
        <div class="modal-content">
            <span class="close" onclick="closeModal()">&times;</span>
            <div class="modal-body">
                <img id="modalImage" src="" alt="">
                <div class="divider"></div> <!-- Linha acima da caixa de texto -->
                <div class="comment-container">
                    <textarea id="commentText1" placeholder="Escreva seu comentário" class="comment-text"></textarea>
                    <img src="../static/images/icons/enviar.svg" alt="Enviar" class="action-icon-comment-text" onclick="submitComment()">
                </div>
                <div class="like-container">
                    <img src="../static/images/icons/coracao2.svg" alt="Curtir" class="action-icon-like-icon" onclick="likeModal()">
                    <span id="likesCountPost">0</span>
                    <img src="../static/images/icons/comment2.svg" alt="Comentário" class="action-icon-comment-icon">
                    <span id="comments">0</span>

                </div>
            </div>
        </div>
    </div>
    <script src="../static/js/modalpostagens_like.js"></script>
    <script src="../static/js/modalpostagens_comment.js"></script>
</body>

</html>