// Banco de dados em memória (array de produtos)
let produtos = [];

// Função para realizar uma requisição GET (listar produtos)
function getProdutos() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(produtos); // Simula a resposta do servidor
    }, 500); // Delay para simular a requisição
  });
}

// Função para realizar uma requisição POST (adicionar produto)
function postProduto(produto) {
  return new Promise((resolve) => {
    setTimeout(() => {
      produtos.push(produto); // Adiciona o produto ao array
      resolve(produto); // Retorna o produto adicionando
    }, 500); // Delay para simular a requisição
  });
}

// Função para realizar uma requisição PUT (editar produto)
function putProduto(index, produtoAtualizado) {
  return new Promise((resolve) => {
    setTimeout(() => {
      produtos[index] = produtoAtualizado; // Atualiza o produto no array
      resolve(produtoAtualizado); // Retorna o produto atualizado
    }, 500); // Delay para simular a requisição
  });
}

// Função para realizar uma requisição DELETE (excluir produto)
function deleteProduto(index) {
  return new Promise((resolve) => {
    setTimeout(() => {
      produtos.splice(index, 1); // Exclui o produto do array
      resolve(); // Retorna uma resposta vazia
    }, 500); // Delay para simular a requisição
  });
}

// Função para realizar uma requisição PATCH (alterar parcialmente o produto)
function patchProduto(index, dadosParciais) {
  return new Promise((resolve) => {
    setTimeout(() => {
      produtos[index] = { ...produtos[index], ...dadosParciais };
      resolve(produtos[index]); // Retorna o produto atualizado
    }, 500);
  });
}

// Função para listar produtos na interface
function listarProdutos() {
  const lista = document.getElementById("lista-produtos");
  lista.innerHTML = ""; // Limpa a lista atual

  getProdutos().then((produtos) => {
    produtos.forEach((produto, index) => {
      const item = document.createElement("li");
      item.classList.add("list-group-item");
      item.innerHTML = `
                <strong>${produto.nome}</strong> — R$ ${produto.preco.toFixed(
        2
      )}
                <button class="btn btn-warning btn-sm ms-2" onclick="editarProduto(${index})">Editar</button>
                <button class="btn btn-danger btn-sm ms-2" onclick="excluirProduto(${index})">Excluir</button>
                <button class="btn btn-info btn-sm ms-2" onclick="alterarPrecoProduto(${index})">Alterar Preço</button>
            `;
      lista.appendChild(item);
    });
  });
}

// Função para adicionar produto via formulário (POST)
document.getElementById("produto-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const nome = document.getElementById("produtoNome").value;
  const preco = document.getElementById("produtoPreco").value;

  if (nome && preco) {
    const produto = { nome: nome, preco: parseFloat(preco) };
    postProduto(produto).then(() => {
      listarProdutos(); // Atualiza a lista após adicionar
    });
    e.target.reset(); // Limpa o formulário
  } else {
    alert("Preencha todos os campos corretamente!");
  }
});

// Função para editar produto (PUT)
function editarProduto(index) {
  const novoNome = prompt("Novo nome do produto:", produtos[index].nome);
  const novoPreco = prompt("Novo preço do produto:", produtos[index].preco);

  if (novoNome && novoPreco) {
    const produtoAtualizado = { nome: novoNome, preco: parseFloat(novoPreco) };
    putProduto(index, produtoAtualizado).then(() => {
      listarProdutos(); // Atualiza a lista após editar
    });
  }
}

// Função para excluir produto (DELETE)
function excluirProduto(index) {
  if (confirm("Tem certeza que deseja excluir este produto?")) {
    deleteProduto(index).then(() => {
      listarProdutos(); // Atualiza a lista após exclusão
    });
  }
}

// Função para alterar preço do produto (PATCH)
function alterarPrecoProduto(index) {
  const novoPreco = prompt("Novo preço:", produtos[index].preco);
  if (novoPreco) {
    patchProduto(index, { preco: parseFloat(novoPreco) }).then(() => {
      listarProdutos(); // Atualiza a lista após alteração parcial
    });
  }
}

// Inicializa a lista de produtos ao carregar a página
listarProdutos();
