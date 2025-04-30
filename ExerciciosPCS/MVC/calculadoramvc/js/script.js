document
  .getElementById("formCalculadora")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Impede o envio tradicional do formulário

    const numero1 = parseFloat(document.getElementById("numero1").value);
    const numero2 = parseFloat(document.getElementById("numero2").value);
    const operacao = document.getElementById("operacao").value;

    let resultado;

    switch (operacao) {
      case "somar":
        resultado = numero1 + numero2;
        break;
      case "subtrair":
        resultado = numero1 - numero2;
        break;
      case "multiplicar":
        resultado = numero1 * numero2;
        break;
      case "dividir":
        if (numero2 !== 0) {
          resultado = numero1 / numero2;
        } else {
          resultado = "Erro: Divisão por zero";
        }
        break;
      default:
        resultado = "Operação inválida";
        break;
    }

    document.getElementById("resultado").innerText = resultado; // Exibe o resultado na página
  });
