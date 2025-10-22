//vetores cadastro
let ListaNomesCadastro = [];
let ListaIdsCadastro = [];
let ListaTelefonesCadastro = [];

//vetores Produtos
let ListaNomesProdutos = [];
let ListaCodigosProdutos = [];
let ListaPrecosProdutos = [];
let ListaQuantidadesProdutos = [];

//vetores Vendas
let ListaIndicesClientesVendas = [];
let ListaIndicesProdutosVendas = [];
let ListaQuantidadesVendas = [];
let ListaValoresUnitariosVendas = [];
let ListaValoresTotaisVendas = [];

//menu
function MenuPrincipal() {
  return parseInt(
    prompt(
      "=== MENU PRINCIPAL ===\n" +
        "1 - Cadastrar Cliente\n" +
        "2 - Cadastrar Produto\n" +
        "3 - Registrar Venda\n" +
        "4 - Consultar Vendas\n" +
        "5 - Atualizar Cliente\n" +
        "6 - Remover Cliente\n" +
        "7 - Encerrar Sistema"
    )
  );
}

//loop menu
let EscolhaUsuario = 0;
if (EscolhaUsuario !== 7) {
  EscolhaUsuario = MenuPrincipal();
  switch (EscolhaUsuario) {
    case 1:
      CadastrarCliente();
      break;
    case 2:
      CadastrarProduto();
      break;
    case 3:
      RegistrarVenda();
      break;
    case 4:
      ConsultarVendas();
      break;
    case 5:
      AtualizarCliente();
      break;
    case 6:
      RemoverCliente();
      break;
    case 7:
      alert("Encerrando Sistema...");
      break;
    default:
      alert("Opção Inválida!, tente novamente.");
      break;
  }
}

//Cadastrar Cliente
function CadastrarCliente() {
  let NomeCliente = prompt("Digite o nome do cliente:");
  let IdCliente = prompt("Digite o ID do cliente:");
  let TelefoneCliente = prompt("Digite o telefone do cliente:");
  ListaNomesCadastro.push(NomeCliente);
  ListaIdsCadastro.push(IdCliente);
  ListaTelefonesCadastro.push(TelefoneCliente);
  alert("Cliente cadastrado com sucesso!");
}
