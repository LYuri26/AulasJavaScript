document.addEventListener("DOMContentLoaded", function () {
  const formAdicionarItem = document.getElementById("form-adicionar-item");
  const listaComprasElement = document.getElementById("lista-compras");

  // Função para carregar e exibir a lista de compras
  const carregarListaCompras = async function () {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos"
      );
      if (!response.ok) {
        throw new Error("Erro ao obter lista de compras");
      }
      const listaCompras = await response.json();
      exibirListaCompras(listaCompras);
    } catch (error) {
      console.error(error.message);
    }
  };

  // Função para exibir a lista de compras na interface do usuário
  const exibirListaCompras = function (listaCompras) {
    listaComprasElement.innerHTML = ""; // Limpa a lista antes de adicionar os itens

    listaCompras.forEach(function (item) {
      const li = document.createElement("li");
      li.textContent = item.title; // Exemplo de exibição do item

      listaComprasElement.appendChild(li);
    });
  };

  // Função para adicionar um item à lista de compras
  const adicionarItemListaCompras = async function (nomeItem) {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos",
        {
          method: "POST",
          body: JSON.stringify({
            title: nomeItem,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Erro ao adicionar item à lista de compras");
      }

      // Atualiza dinamicamente a lista de compras na interface do usuário
      const novoItem = {
        title: nomeItem,
      };
      const li = document.createElement("li");
      li.textContent = novoItem.title;
      listaComprasElement.appendChild(li);
    } catch (error) {
      console.error(error.message);
    }
  };

  // Evento de submissão do formulário para adicionar item à lista de compras
  formAdicionarItem.addEventListener("submit", async function (event) {
    event.preventDefault(); // Evita o comportamento padrão de recarregar a página

    const nomeItem = document.getElementById("nome-item").value;

    await adicionarItemListaCompras(nomeItem);

    // Limpa o formulário após adicionar o item
    formAdicionarItem.reset();
  });

  // Carrega a lista de compras quando a página é carregada
  carregarListaCompras();
});
