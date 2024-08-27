document
  .getElementById("btnExibirTexto")
  .addEventListener("click", function () {
    const texto = document.getElementById("campoTexto").value;
    document.getElementById("resultado").innerText = texto;
  });
