/*
===========================================
PROJETO FINAL - SISTEMA DE CADASTRO DE VENDAS
DISCIPLINA: Lógica de Programação
EQUIPE: (Eduardo Salge Rodrigues Alves
         Kaik Tavares Duarte Cruz
         Lucas Gabriel Rodrigues Antonio
DATA DE ENTREGA: 07/11/2025
===========================================
*/


// ==============================
// 1- Dados dos clientes (Vetores)
// ==============================

//Lista Clientes
let listaNomesClientes = [];
let listaCpfsClientes = [];
let listaTelefonesClientes = [];

//Lista Produtos
let listaNomesProdutos = [];
let listaCodigosProdutos = [];
let listaPrecosProdutos = [];
let listaQuantidadeProdutos = [];

//Lista Vendas
let listaIndicesClientesVendas = [];
let listaIndicesProdutosVendas = [];
let listaQuantidadesVendas = [];
let listaValoresUnitariosVendas = [];
let listaValoresTotaisVendas = [];

//===================================
//2- Menu principal
//===================================
function mostrarMenuPrincipal() {
    return parseFloat(
        prompt(
            "=== MENU PRINCIPAL ===\n"+
            "1 - Cadastrar Cliente\n"+
            "2 - Cadastrar Produto\n"+
            "3 - Registrar Vendas\n"+
            "4 - Consultar Vendas\n"+
            "5 - Atualizar Cliente\n"+
            "6 - Remover Cliente\n"+
            "7 - Encerrar Sistema"
        )
    );
}

// ================================
// 3- Cadastro do cliente
// ================================
function cadastrarCliente() {
    let nomeCliente = prompt("Digite o nome do cliente");
    let cpfCliente = prompt("Digite o CPF do cliente");
    let telefoneCliente = prompt("Digite o telefone do cliente");

    listaNomesClientes.push(nomeCliente);
    listaCpfsClientes.push(cpfCliente);
    listaTelefonesClientes.push(telefoneCliente);

    alert("Cliente cadastrado com sucesso!");
}

// ===================================
// 4- Cadastro de Produtos
// ===================================
function cadastrarProduto() {
    let nomeProduto = prompt("Digite o nome do produto");
    let codigoProduto = prompt("Digite o codigo do produto");
    let precoProduto = parseInt(prompt("Digite o preço unitario"));
    let quantidadeProduto = parseFloat(prompt("Digite a quantidade em estoque"));

    listaNomesProdutos.push(nomeProduto);
    listaCodigosProdutos.push(codigoProduto);
    listaPrecosProdutos.push(precoProduto);
    listaQuantidadeProdutos.push(quantidadeProduto);

    alert("Produto cadastrado com sucesso!");

}

// ========================================
// 5- Registrar vendas
// ========================================
function registrarVenda() {
    let indiceCliente = parseFloat(prompt("Digite o indice do cliente"));
    let indiceProduto = parseFloat(prompt("Digite o indice do produto"));
    let quantidadeVendida = parseFloat(prompt("Digite a quantidade vendida"));

    let valorUnitario = listaPrecosProdutos[indiceProduto];
    let valorTotal = quantidadeVendida * valorUnitario;

    listaIndicesClientesVendas.push(indiceCliente);
    listaIndicesProdutosVendas.push(indiceProduto);
    listaQuantidadesVendas.push(quantidadeVendida);
    listaValoresUnitariosVendas.push(valorUnitario);
    listaValoresTotaisVendas.push(valorTotal);

    alert("Venda registrada com sucesso!");
}

// =========================================
// 6- Consultar Vendas
// =========================================
function consultarVendas() {
    let relatorioVendas = "===RELATÓRIO DE VENDAS===\n";

    while (i = 0) i < listaIndicesClientesVendas.length; i++; {
        relatorioVendas +=
        "Cliente:" + listaNomesClientes[listaIndicesClientesVendas[i]]+
        "| Produto:" + listaNomesProdutos[listaIndicesProdutosVendas[i]]+
        "| Quantidade:" + listaQuantidadesVendas[i]+
        "| Valor Unitario:" + listaValoresUnitariosVendas[i]+
        "| Total:" + listaValoresTotaisVendas[i] + "\n";
    }

    alert(relatorioVendas);
}

//================================================
//7- Atualizar cliente
//================================================
function atualizarCliente() {
    let cpfAtualizar = prompt("Digite o CPF do cliente para atualizar:");

    while(i = 0) i < listaCpfsClientes.length; i++; {
        if (listaCpfsClientes[i] === cpfAtualizar) {
            listaNomesClientes[i] = prompt("Digite o novo nome:");
            listaTelefonesClientes[i] = prompt("Digite o novo telefone:");
            alert("Cliente atualizado com sucesso!");
            return;
        }
    }

    alert("Cliente nao encontrado");
}

// ================================================
// 8- Remover cliente
// ================================================
function removerCliente() {
    let cpfRemover = prompt("Digite o CPF do cliente para remover:");

    while(i = 0) i < listaCpfsClientes.length; i++; {
        if (listaCpfsClientes[i] === cpfRemover) {
            delete(listaNomesClientes, i);
            delete(listaCpfsClientes, i);
            delete(listaTelefonesClientes, i);
            alert("Cliente removido com sucesso!");
            return;
        }
    }

    alert("Cliente não encontrado.");
}
// ================================================
// 9- Loop principal
// ================================================
let escollhaUsuario = 0;
while(escollhaUsuario !== 7) {
    escollhaUsuario = mostrarMenuPrincipal();

    switch(escollhaUsuario) {
        case 1: cadastrarCliente();
        break;
        case 2: cadastrarProduto();
        break;
        case 3: registrarVenda();
        break;
        case 4: consultarVendas();
        break;
        case 5: atualizarCliente();
        break;
        case 6: removerCliente();
        break;
        case 7: alert("Encerrando o sistema...");
        break;
        
        default: alert("Opção inválida, tente novamente.");
    }
}