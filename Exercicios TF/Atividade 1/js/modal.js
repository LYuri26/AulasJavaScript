function openModal(imageSrc) {
  fetch("modal.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("modal-container").innerHTML = data;
      document.getElementById("modal-image").src = imageSrc;
      document.getElementById("modal").style.display = "flex";
    })
    .catch((error) => console.error("Error loading modal:", error));
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

function likeImage() {
  alert("Liked!");
}

function dislikeImage() {
  alert("Disliked!");
}

function sendComment() {
  const commentField = document.getElementById("comment-field");
  alert("Comentário: " + commentField.value);
  commentField.value = "";
}
