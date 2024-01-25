$(document).ready(function () {
  // Função para trocar a imagem ao passar o mouse sobre ela
  $(".img-hover").hover(
    function () {
      // Troca a imagem para a imagem de hover
      $(this).attr("src", $(this).data("hover"));
    },
    function () {
      // Troca a imagem de volta para a original
      $(this).attr("src", $(this).data("original"));
    }
  );

  // Função para exibir alerta de redirecionamento ao clicar nos botões
  $(".btn").click(function () {
    alert("Você será redirecionado para outra página.");
  });
});
