<!-- Modal -->
<div class="modal-wrapper1" id="myModal1" style="display: none;">
    <div class="modal1">
        <span class="close1" onclick="closeModal()">&times;</span>
        <div class="modal-content1" id="modalContent1"></div>
        <div class="modal-caption1">
            <textarea id="commentText1" placeholder="Escreva seu comentário"></textarea>
            <img src="../static/images/icons/enviar.svg" alt="Enviar" class="action-icon" onclick="submitComment()">
            <img src="../static/images/icons/coracao.svg" alt="Curtir" class="action-icon" onclick="likeImage()">
            <span id="likesCount1">0</span>
        </div>
    </div>
</div>