document.addEventListener("DOMContentLoaded", function () {
  // Slideshow functionality
  let index = 0;
  const images = document.querySelectorAll(".slideshow img");
  const prevButton = document.querySelector(".prev");
  const nextButton = document.querySelector(".next");

  function showImage(i) {
    images.forEach((img, idx) => {
      img.style.display = idx === i ? "block" : "none";
    });
  }

  showImage(index);

  prevButton.addEventListener("click", () => {
    index = index > 0 ? index - 1 : images.length - 1;
    showImage(index);
  });

  nextButton.addEventListener("click", () => {
    index = index < images.length - 1 ? index + 1 : 0;
    showImage(index);
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll("nav a").forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  // Read More functionality
  document.querySelectorAll(".read-more").forEach((button) => {
    button.addEventListener("click", function () {
      const content = this.previousElementSibling;
      const isExpanded = content.style.display === "block";

      content.style.display = isExpanded ? "none" : "block";
      this.textContent = isExpanded ? "Ler Mais" : "Ler Menos";
    });
  });
});
