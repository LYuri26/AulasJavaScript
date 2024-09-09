document.addEventListener("DOMContentLoaded", function () {
  const resultadoDiv = document.getElementById("resultado");

  // Aqui você pode simular a pontuação ou obtê-la do localStorage/local de dados
  const pontuacao = localStorage.getItem("pontuacao") || 0;
  const totalPerguntas = 10; // Número total de perguntas no quiz
  const porcentagem = (pontuacao / totalPerguntas) * 100;

  // Define o texto e a classe do alerta com base na pontuação
  let mensagem = "";
  let alertaClasse = "";

  if (porcentagem === 100) {
    mensagem = "Parabéns! Você acertou todas as perguntas!";
    alertaClasse = "alert-success";
  } else if (porcentagem >= 70) {
    mensagem = "Bom trabalho! Você acertou a maioria das perguntas.";
    alertaClasse = "alert-success";
  } else if (porcentagem >= 50) {
    mensagem = "Você fez um bom esforço, mas ainda há espaço para melhorar.";
    alertaClasse = "alert-warning";
  } else {
    mensagem = "Você pode tentar novamente para melhorar sua pontuação.";
    alertaClasse = "alert-danger";
  }

  // Atualiza o conteúdo da página com o resultado
  resultadoDiv.innerHTML = `
        <div class="alert ${alertaClasse} show">
            <h4>Você acertou ${pontuacao} de ${totalPerguntas} perguntas!</h4>
            <p>${mensagem}</p>
        </div>
    `;
});
