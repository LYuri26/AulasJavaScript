<div class="modal-wrapper1" id="myModal1" style="display: none;">
    <div class="modal1">
        <span class="close1" onclick="closeModal(1)">&times;</span>
        <div class="modal-content1" id="modalContent1"></div>
        <div class="modal-caption1">
            <div class="comment-container">
                <textarea id="commentText1" placeholder="Escreva seu comentário" class="comment-text" readonly></textarea>
                <img src="../static/images/icons/enviar.svg" alt="Enviar" class="action-icon" onclick="submitComment()">
            </div>
            <div class="action-icons">
                <img src="../static/images/icons/coracao2.svg" alt="Curtir" class="action-icon like-icon" onclick="likeImage(event)">
                <span id="likesCount1">0</span>
            </div>
        </div>
    </div>
</div>