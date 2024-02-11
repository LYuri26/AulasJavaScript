const countElement = document.getElementById('count');
const incrementButton = document.getElementById('incrementButton');

let count = 0;

incrementButton.addEventListener('click', () => {
  count++;
  countElement.textContent = count;
});
