// ==================================================
// EXERCÍCIO 1 - CADASTRAR INSCRITO
// ==================================================
function cadastrarInscrito() {
  let nome = prompt("Digite o nome do inscrito:");
  let id = prompt("Digite o ID do inscrito (ex: I001):");
  let telefone = prompt("Digite o telefone do inscrito:");
  nomesInscritos.push(nome);
  idsInscritos.push(id);
  telefonesInscritos.push(telefone);
  console.log("Inscrito cadastrado com sucesso!");
}

// ==================================================
// EXERCÍCIO 2 - CADASTRAR VÍDEO
// ==================================================
function cadastrarVideo() {
  let titulo = prompt("Digite o título do vídeo:");
  let codigo = prompt("Digite o código do vídeo (ex: V001):");
  let visualizacoes = parseInt(
    prompt("Digite o número inicial de visualizações:")
  );
  titulosVideos.push(titulo);
  codigosVideos.push(codigo);
  visualizacoesVideos.push(visualizacoes);
  console.log("Vídeo cadastrado com sucesso!");
}

// ==================================================
// EXERCÍCIO 3 - REGISTRAR VISUALIZAÇÃO
// ==================================================
function registrarVisualizacao() {
  let indiceInscrito = parseInt(prompt("Digite o índice do inscrito:"));
  let indiceVideo = parseInt(prompt("Digite o índice do vídeo:"));
  let quantidade = parseInt(
    prompt("Digite a quantidade de visualizações registradas:")
  );

  if (
    indiceInscrito < 0 ||
    indiceInscrito >= nomesInscritos.length ||
    indiceVideo < 0 ||
    indiceVideo >= titulosVideos.length
  ) {
    console.log("Índice inválido! Verifique e tente novamente.");
    return;
  }

  visualizacoesVideos[indiceVideo] += quantidade;
  indicesInscritosVisualizacoes.push(indiceInscrito);
  indicesVideosVisualizacoes.push(indiceVideo);
  quantidadesVisualizacoes.push(quantidade);
  console.log("Visualizações registradas com sucesso!");
}

// ==================================================
// EXERCÍCIO 4 - CONSULTAR REGISTROS DE VISUALIZAÇÕES
// ==================================================
function consultarRegistrosVisualizacoes() {
  if (quantidadesVisualizacoes.length === 0) {
    console.log("Nenhum registro de visualização encontrado.");
    return;
  }

  let resultado = "=== REGISTROS DE VISUALIZAÇÕES ===\n";
  for (let i = 0; i < quantidadesVisualizacoes.length; i++) {
    let nome = nomesInscritos[indicesInscritosVisualizacoes[i]];
    let titulo = titulosVideos[indicesVideosVisualizacoes[i]];
    let qtd = quantidadesVisualizacoes[i];
    let total = visualizacoesVideos[indicesVideosVisualizacoes[i]];
    resultado +=
      "Inscrito: " +
      nome +
      " | Vídeo: " +
      titulo +
      " | Quantidade: " +
      qtd +
      " | Total do vídeo: " +
      total +
      "\n";
  }
  console.log(resultado);
}

// ==================================================
// EXERCÍCIO 5 - ATUALIZAR INSCRITO
// ==================================================
function atualizarInscrito() {
  let idBusca = prompt("Digite o ID do inscrito que deseja atualizar:");
  let encontrado = false;

  for (let i = 0; i < idsInscritos.length; i++) {
    if (idsInscritos[i] === idBusca) {
      nomesInscritos[i] = prompt("Digite o novo nome do inscrito:");
      telefonesInscritos[i] = prompt("Digite o novo telefone:");
      console.log("Inscrito atualizado com sucesso!");
      encontrado = true;
      break;
    }
  }

  if (!encontrado) {
    console.log("Inscrito não encontrado.");
  }
}

// ==================================================
// EXERCÍCIO 6 - REMOVER INSCRITO
// ==================================================
function removerInscrito() {
  let idBusca = prompt("Digite o ID do inscrito que deseja remover:");
  let encontrado = false;

  for (let i = 0; i < idsInscritos.length; i++) {
    if (idsInscritos[i] === idBusca) {
      nomesInscritos.splice(i, 1);
      idsInscritos.splice(i, 1);
      telefonesInscritos.splice(i, 1);
      console.log("Inscrito removido com sucesso!");
      encontrado = true;
      break;
    }
  }

  if (!encontrado) {
    console.log("Inscrito não encontrado.");
  }
}

// ==================================================
// EXERCÍCIO 7 - CONSULTAR VÍDEO POR CÓDIGO
// ==================================================
function consultarVideoPorCodigo() {
  let codigoBusca = prompt("Digite o código do vídeo:");
  let encontrado = false;

  for (let i = 0; i < codigosVideos.length; i++) {
    if (codigosVideos[i] === codigoBusca) {
      console.log(
        "Título: " +
          titulosVideos[i] +
          " | Visualizações: " +
          visualizacoesVideos[i]
      );
      encontrado = true;
      break;
    }
  }

  if (!encontrado) {
    console.log("Vídeo não encontrado.");
  }
}

// ==================================================
// EXERCÍCIO 8 - CONSULTAR VÍDEO MAIS POPULAR
// ==================================================
function consultarMaisPopular() {
  if (visualizacoesVideos.length === 0) {
    console.log("Nenhum vídeo cadastrado.");
    return;
  }

  let maior = visualizacoesVideos[0];
  let posicao = 0;

  for (let i = 1; i < visualizacoesVideos.length; i++) {
    if (visualizacoesVideos[i] > maior) {
      maior = visualizacoesVideos[i];
      posicao = i;
    }
  }

  console.log(
    "Vídeo mais popular: " +
      titulosVideos[posicao] +
      " | Visualizações: " +
      maior
  );
}

// ==================================================
// EXERCÍCIO 9 - RELATÓRIO POR INSCRITO
// ==================================================
function relatorioPorInscrito() {
  let idBusca = prompt("Digite o ID do inscrito para consultar o relatório:");
  let indiceInscrito = idsInscritos.indexOf(idBusca);

  if (indiceInscrito === -1) {
    console.log("Inscrito não encontrado.");
    return;
  }

  let resultado = "=== RELATÓRIO DE VISUALIZAÇÕES ===\n";
  let encontrouRegistros = false;

  for (let i = 0; i < indicesInscritosVisualizacoes.length; i++) {
    if (indicesInscritosVisualizacoes[i] === indiceInscrito) {
      let tituloVideo = titulosVideos[indicesVideosVisualizacoes[i]];
      let quantidade = quantidadesVisualizacoes[i];
      resultado +=
        "Vídeo: " + tituloVideo + " | Visualizações: " + quantidade + "\n";
      encontrouRegistros = true;
    }
  }

  if (encontrouRegistros) {
    console.log(resultado);
  } else {
    console.log("Sem registros para esse inscrito.");
  }
}

// ==================================================
// VETORES DE INSCRITOS
// ==================================================
let nomesInscritos = [];
let idsInscritos = [];
let telefonesInscritos = [];

// ==================================================
// VETORES DE VÍDEOS
// ==================================================
let titulosVideos = [];
let codigosVideos = [];
let visualizacoesVideos = [];

// ==================================================
// VETORES DE REGISTROS DE VISUALIZAÇÃO (HISTÓRICO)
// ==================================================
let indicesInscritosVisualizacoes = [];
let indicesVideosVisualizacoes = [];
let quantidadesVisualizacoes = [];
let valoresTotaisSimulados = []; // opcional (ex: receita estimada)

// ==================================================
// FUNÇÃO MENU PRINCIPAL
// ==================================================
console.log(
  "=== MENU PRINCIPAL ===\n" +
    "1 - Cadastrar inscrito\n" +
    "2 - Cadastrar vídeo\n" +
    "3 - Registrar visualização\n" +
    "4 - Consultar registros de visualizações\n" +
    "5 - Atualizar inscrito\n" +
    "6 - Remover inscrito\n" +
    "7 - Consultar vídeo por código\n" +
    "8 - Consultar vídeo mais popular\n" +
    "9 - Relatório por inscrito\n" +
    "10 - Encerrar"
);
// ==================================================
// LOOP PRINCIPAL
// ==================================================
let opcao;
while (opcao !== "s") {
  opcao = parseInt(prompt("Digite a opção desejada:"));
  switch (opcao) {
    case 1:
      cadastrarInscrito();
      break;
    case 2:
      cadastrarVideo();
      break;
    case 3:
      registrarVisualizacao();
      break;
    case 4:
      consultarRegistrosVisualizacoes();
      break;
    case 5:
      atualizarInscrito();
      break;
    case 6:
      removerInscrito();
      break;
    case 7:
      consultarVideoPorCodigo();
      break;
    case 8:
      consultarMaisPopular();
      break;
    case 9:
      relatorioPorInscrito();
      break;
    case 10:
      console.log("Encerrando o sistema... Até logo, criador de conteúdo!");
      break;
    default:
      console.log("Opção inválida! Tente novamente.");
      break;
  }
  opcao = prompt("Deseja encerrar? (s/n):");
}
