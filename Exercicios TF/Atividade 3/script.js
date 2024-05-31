document.addEventListener("DOMContentLoaded", () => {
  const posts = document.querySelectorAll(".post");

  posts.forEach((post) => {
    let likeCount = 0;
    const likeButton = post.querySelector(".likeButton");
    const likeIcon = post.querySelector(".likeIcon");
    const likeCounter = post.querySelector(".likeCount");

    likeButton.addEventListener("click", function () {
      if (likeIcon.classList.contains("liked")) {
        likeCount--;
        likeIcon.classList.remove("liked");
      } else {
        likeCount++;
        likeIcon.classList.add("liked");
      }
      likeCounter.textContent = likeCount;
    });

    const commentButton = post.querySelector(".commentButton");
    const commentInput = post.querySelector(".commentInput");
    const commentList = post.querySelector(".commentList");

    commentButton.addEventListener("click", function () {
      const commentText = commentInput.value;
      if (commentText.trim() !== "") {
        const newComment = document.createElement("li");
        newComment.textContent = commentText;
        commentList.appendChild(newComment);
        commentInput.value = "";
      }
    });
  });
});
