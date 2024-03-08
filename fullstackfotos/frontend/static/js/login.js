document.addEventListener("DOMContentLoaded", function () {
  var modal = document.getElementById("loginModal");
  if (modal) {
    var btn = document.getElementById("openModalBtn");
    if (btn) {
      var span = document.querySelector(".modal-content .close");
      var cancelBtn = document.querySelector(".modal-content .cancelbtn");

      btn.addEventListener("click", function () {
        modal.style.display = "block";
      });

      span.addEventListener("click", function () {
        modal.style.display = "none";
      });

      cancelBtn.addEventListener("click", function () {
        modal.style.display = "none";
      });

      window.addEventListener("click", function (event) {
        if (event.target === modal) {
          modal.style.display = "none";
        }
      });

      var form = document.querySelector("form");
      if (form) {
        form.addEventListener("submit", function (event) {
          var usernameInput = document.getElementById("username");
          var passwordInput = document.getElementById("password");

          if (
            usernameInput.value.trim() === "" ||
            passwordInput.value.trim() === ""
          ) {
            event.preventDefault();
            usernameInput.classList.add("invalid");
            passwordInput.classList.add("invalid");
            return;
          }

          usernameInput.classList.remove("invalid");
          passwordInput.classList.remove("invalid");
        });
      }
    }
  }
});

var openModalBtn = document.getElementById("openModalBtn");
if (openModalBtn) {
  openModalBtn.addEventListener("click", function () {
    var modal = document.getElementById("loginModal");
    if (modal) {
      modal.style.display = "block";
    }
  });
}
