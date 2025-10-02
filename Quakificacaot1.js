// Sistema de Cadastro de Vendas - Ultra Básico

// Arrays para armazenar os dados do sistema
var clientes = []; // guarda os clientes cadastrados
var produtos = []; // guarda os produtos cadastrados
var vendas = []; // guarda as vendas registradas

// Função que exibe o menu principal e retorna a opção escolhida
function menuPrincipal() {
  return parseInt(
    prompt(
      "=== MENU ===\n" +
        "1 - Cadastrar Cliente\n" +
        "2 - Cadastrar Produto\n" +
        "3 - Registrar Venda\n" +
        "4 - Consultar Vendas\n" +
        "5 - Atualizar Cliente\n" +
        "6 - Remover Cliente\n" +
        "7 - Encerrar"
    )
  );
}

// Função para cadastrar clientes
function cadastrarCliente() {
  var nome = prompt("Nome do cliente:"); // solicita o nome
  var cpf = prompt("CPF do cliente:"); // solicita o CPF
  var telefone = prompt("Telefone do cliente:"); // solicita o telefone
  clientes.push({ nome: nome, cpf: cpf, telefone: telefone }); // adiciona ao array
  alert("Cliente cadastrado: " + nome + " | " + cpf + " | " + telefone); // confirma cadastro
}

// Função para cadastrar produtos
function cadastrarProduto() {
  var nome = prompt("Nome do produto:"); // solicita o nome
  var codigo = prompt("Código do produto:"); // solicita o código
  var preco = parseFloat(prompt("Preço unitário:")); // solicita o preço
  var quantidade = parseInt(prompt("Quantidade em estoque:")); // solicita a quantidade
  produtos.push({
    // adiciona ao array
    nome: nome,
    codigo: codigo,
    preco: preco,
    quantidade: quantidade,
  });
  alert(
    "Produto cadastrado: " +
      nome +
      " | " +
      codigo +
      " | " +
      preco +
      " | " +
      quantidade
  ); // confirma cadastro
}

// Função para registrar uma venda
function registrarVenda() {
  var cliente = prompt("Nome do cliente:"); // solicita o nome do cliente
  var produto = prompt("Nome do produto:"); // solicita o nome do produto
  var quantidade = parseInt(prompt("Quantidade vendida:")); // solicita a quantidade vendida
  var valorUnitario = parseFloat(prompt("Valor unitário do produto:")); // solicita o preço unitário
  var valorTotal = quantidade * valorUnitario; // calcula o valor total

  vendas.push({
    // adiciona a venda ao array
    cliente: cliente,
    produto: produto,
    quantidade: quantidade,
    valorUnitario: valorUnitario,
    valorTotal: valorTotal,
  });
  alert(
    "Venda registrada: " +
      cliente +
      " comprou " +
      quantidade +
      " de " +
      produto +
      " | Total: R$" +
      valorTotal
  ); // confirma registro da venda
}

// Função para consultar todas as vendas
function consultarVendas() {
  var resultado = "=== VENDAS ===\n"; // cabeçalho do relatório
  for (var i = 0; i < vendas.length; i++) {
    // percorre todas as vendas
    resultado +=
      "Cliente: " +
      vendas[i].cliente +
      " | Produto: " +
      vendas[i].produto +
      " | Quantidade: " +
      vendas[i].quantidade +
      " | Valor Unitário: " +
      vendas[i].valorUnitario +
      " | Total: " +
      vendas[i].valorTotal +
      "\n"; // adiciona cada venda à string
  }
  alert(resultado); // exibe todas as vendas
}

// Função para atualizar dados de um cliente
function atualizarCliente() {
  var cpf = prompt("CPF do cliente para atualizar:"); // solicita CPF
  for (var i = 0; i < clientes.length; i++) {
    // percorre o array
    if (clientes[i].cpf === cpf) {
      // encontra o cliente pelo CPF
      clientes[i].nome = prompt("Novo nome:"); // solicita novo nome
      clientes[i].telefone = prompt("Novo telefone:"); // solicita novo telefone
      alert(
        "Cliente atualizado: " + clientes[i].nome + " | " + clientes[i].telefone
      ); // confirma atualização
      return; // encerra a função
    }
  }
}

// Função para remover um cliente
function removerCliente() {
  var cpf = prompt("CPF do cliente para remover:"); // solicita CPF
  for (var i = 0; i < clientes.length; i++) {
    // percorre o array
    if (clientes[i].cpf === cpf) {
      // encontra o cliente
      alert("Cliente removido: " + clientes[i].nome); // confirma remoção
      clientes.splice(i, 1); // remove do array
      return; // encerra função
    }
  }
}

// Loop principal do sistema
var opcao = 0;
while (opcao !== 7) {
  // enquanto não escolher encerrar
  opcao = menuPrincipal(); // exibe menu e lê opção

  if (opcao === 1) cadastrarCliente(); // chama função de cadastro de cliente
  else if (opcao === 2)
    cadastrarProduto(); // chama função de cadastro de produto
  else if (opcao === 3) registrarVenda(); // chama função de registrar venda
  else if (opcao === 4) consultarVendas(); // chama função de consultar vendas
  else if (opcao === 5) atualizarCliente(); // chama função de atualizar cliente
  else if (opcao === 6) removerCliente(); // chama função de remover cliente
  else if (opcao === 7) alert("Encerrando sistema..."); // encerra o sistema
}
