// ================================================
// SISTEMA DE CADASTRO DE VENDAS - TEMPLATE INICIANTE
// Usando vetores puros (cada vetor armazena apenas um tipo de dado)
// ================================================

// =====================
// 1. Vetores de dados
// =====================

// Vetores para armazenar informações de clientes
var nomesClientes = []; // Vetor que armazena os nomes dos clientes
var cpfsClientes = []; // Vetor que armazena os CPFs dos clientes
var telefonesClientes = []; // Vetor que armazena os telefones dos clientes

// Vetores para armazenar informações de produtos
var nomesProdutos = []; // Vetor que armazena os nomes dos produtos
var codigosProdutos = []; // Vetor que armazena os códigos dos produtos
var precosProdutos = []; // Vetor que armazena os preços unitários dos produtos
var quantidadesProdutos = []; // Vetor que armazena as quantidades em estoque

// Vetores para registrar vendas
var clientesVendas = []; // Armazena o índice do cliente que realizou a compra
var produtosVendas = []; // Armazena o índice do produto vendido
var quantidadesVendas = []; // Armazena a quantidade vendida
var valoresUnitariosVendas = []; // Armazena o valor unitário do produto na venda
var valoresTotaisVendas = []; // Armazena o valor total da venda

// =====================
// 2. Menu principal
// =====================
function menuPrincipal() {
  // Exibe o menu de opções para o usuário
  // Retorna a opção escolhida como número inteiro
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

// =====================
// 3. Cadastro de cliente
// =====================
function cadastrarCliente() {
  // Solicita ao usuário os dados do cliente
  var nome = prompt("Digite o nome do cliente:"); // Nome do cliente
  var cpf = prompt("Digite o CPF do cliente:"); // CPF do cliente
  var telefone = prompt("Digite o telefone do cliente:"); // Telefone do cliente

  // Adiciona os dados nos vetores correspondentes
  nomesClientes.push(nome);
  cpfsClientes.push(cpf);
  telefonesClientes.push(telefone);

  // Confirma cadastro
  alert("Cliente cadastrado com sucesso!");
}

// =====================
// 4. Cadastro de produto
// =====================
function cadastrarProduto() {
  // Solicita ao usuário os dados do produto
  var nome = prompt("Digite o nome do produto:");
  var codigo = prompt("Digite o código do produto:");
  var preco = parseFloat(prompt("Digite o preço unitário:")); // Converte para número decimal
  var quantidade = parseInt(prompt("Digite a quantidade em estoque:")); // Converte para número inteiro

  // Adiciona os dados nos vetores correspondentes
  nomesProdutos.push(nome);
  codigosProdutos.push(codigo);
  precosProdutos.push(preco);
  quantidadesProdutos.push(quantidade);

  // Confirma cadastro
  alert("Produto cadastrado com sucesso!");
}

// =====================
// 5. Registrar venda
// =====================
function registrarVenda() {
  // Solicita os índices do cliente e produto
  // No caso de iniciantes, o índice é o número da posição no vetor
  var indiceCliente = parseInt(prompt("Digite o índice do cliente:"));
  var indiceProduto = parseInt(prompt("Digite o índice do produto:"));
  var quantidadeVendida = parseInt(prompt("Digite a quantidade vendida:"));

  // Recupera o valor unitário do produto usando o índice
  var valorUnitario = precosProdutos[indiceProduto];
  var valorTotal = quantidadeVendida * valorUnitario; // Calcula o valor total da venda

  // Registra a venda nos vetores correspondentes
  clientesVendas.push(indiceCliente);
  produtosVendas.push(indiceProduto);
  quantidadesVendas.push(quantidadeVendida);
  valoresUnitariosVendas.push(valorUnitario);
  valoresTotaisVendas.push(valorTotal);

  // Confirma registro da venda
  alert("Venda registrada com sucesso!");
}

// =====================
// 6. Consultar vendas
// =====================
function consultarVendas() {
  // Inicializa string para mostrar todas as vendas
  var resultado = "=== VENDAS ===\n";

  // Percorre todos os registros de vendas
  for (var i = 0; i < clientesVendas.length; i++) {
    resultado +=
      "Cliente: " +
      nomesClientes[clientesVendas[i]] + // Nome do cliente
      " | Produto: " +
      nomesProdutos[produtosVendas[i]] + // Nome do produto
      " | Quantidade: " +
      quantidadesVendas[i] + // Quantidade vendida
      " | Valor Unitário: " +
      valoresUnitariosVendas[i] + // Valor unitário
      " | Total: " +
      valoresTotaisVendas[i] +
      "\n"; // Valor total da venda
  }

  // Exibe o relatório completo
  alert(resultado);
}

// =====================
// 7. Atualizar cliente
// =====================
function atualizarCliente() {
  // Solicita o CPF do cliente que deseja atualizar
  var cpf = prompt("Digite o CPF do cliente para atualizar:");

  // Procura o CPF no vetor
  for (var i = 0; i < cpfsClientes.length; i++) {
    if (cpfsClientes[i] === cpf) {
      // Solicita novos dados do cliente
      nomesClientes[i] = prompt("Digite o novo nome:");
      telefonesClientes[i] = prompt("Digite o novo telefone:");
      alert("Cliente atualizado com sucesso!");
      return; // Encerra a função após atualizar
    }
  }

  // Caso não encontre o CPF
  alert("Cliente não encontrado.");
}

// =====================
// 8. Remover cliente
// =====================
function removerCliente() {
  // Solicita o CPF do cliente que deseja remover
  var cpf = prompt("Digite o CPF do cliente para remover:");

  // Procura o CPF no vetor
  for (var i = 0; i < cpfsClientes.length; i++) {
    if (cpfsClientes[i] === cpf) {
      // Remove o cliente de todos os vetores usando splice
      nomesClientes.splice(i, 1);
      cpfsClientes.splice(i, 1);
      telefonesClientes.splice(i, 1);
      alert("Cliente removido com sucesso!");
      return;
    }
  }

  // Caso não encontre o CPF
  alert("Cliente não encontrado.");
}

// =====================
// 9. Loop principal (com SWITCH)
// =====================
var opcao = 0;
while (opcao !== 7) {
  // Exibe o menu e captura a opção do usuário
  opcao = menuPrincipal();

  // Executa a ação correspondente usando SWITCH
  switch (opcao) {
    case 1:
      cadastrarCliente(); // Chama função de cadastro de cliente
      break;
    case 2:
      cadastrarProduto(); // Chama função de cadastro de produto
      break;
    case 3:
      registrarVenda(); // Chama função de registrar venda
      break;
    case 4:
      consultarVendas(); // Chama função de consultar vendas
      break;
    case 5:
      atualizarCliente(); // Chama função de atualizar cliente
      break;
    case 6:
      removerCliente(); // Chama função de remover cliente
      break;
    case 7:
      alert("Encerrando sistema..."); // Finaliza o sistema
      break;
    default:
      alert("Opção inválida, tente novamente."); // Valida entrada
  }
}
