// Array de objetos representando os produtos
const produtos = [
  {
    nome: "Pão de Queijo Original",
    imagem: "images/pao-de-queijo1.png",
    descricao:
      "Nosso pão de queijo original é feito com ingredientes selecionados, proporcionando uma experiência autêntica e deliciosa. Com uma textura macia por dentro e uma casquinha crocante por fora, é o lanche perfeito a qualquer hora do dia.",
  },
  {
    nome: "Pão de Queijo Recheado",
    imagem: "images/pao-de-queijo3.png",
    descricao:
      "Experimente o nosso pão de queijo recheado, uma explosão de sabores em cada mordida. Com diversos recheios disponíveis, como queijo, presunto, frango e muito mais, cada pedaço é uma surpresa irresistível.",
  },
  {
    nome: "Pão de Queijo Fit",
    imagem: "images/pao-de-queijo4.png",
    descricao:
      "Quer manter a forma sem abrir mão do sabor? Nosso pão de queijo fit é a opção ideal. Feito com ingredientes saudáveis e nutritivos, é perfeito para quem busca uma alimentação equilibrada sem perder o prazer de comer.",
  },
];

// Função para exibir os produtos na página
function exibirProdutos() {
  const productsRow = document.getElementById("productsRow");

  produtos.forEach((produto) => {
    const cardHtml = `
              <div class="col-md-4">
                  <div class="card mb-4">
                      <img src="${produto.imagem}" class="card-img-top" alt="${produto.nome}">
                      <div class="card-body">
                          <h5 class="card-title">${produto.nome}</h5>
                          <p class="card-text">${produto.descricao}</p>
                      </div>
                  </div>
              </div>
          `;
    productsRow.innerHTML += cardHtml;
  });
}

// Chama a função para exibir os produtos quando o conteúdo da página estiver carregado
document.addEventListener("DOMContentLoaded", exibirProdutos);
