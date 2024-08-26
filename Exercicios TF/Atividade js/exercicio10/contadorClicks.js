let contador = 0;

document.getElementById("btnClique").addEventListener("click", function () {
  contador++;
  document.getElementById("contador").innerText = contador;
});
