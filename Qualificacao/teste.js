/*
===========================================
PROJETO: GERENCIADOR DE CANAL NO YOUTUBE
DISCIPLINA: Lógica de Programação
EQUIPE: (Nome dos 3 alunos do trio)
DATA DE ENTREGA: __/__/____
===========================================
*/

// ==================================================
// EXERCÍCIO 1 - Criando a Base do Sistema e Cadastrando Inscritos
// ==================================================

let nomesInscritos = [];
let idsInscritos = [];
let telefonesInscritos = [];

function cadastrarInscrito(nomesInscritos, idsInscritos, telefonesInscritos) {
  let nome = prompt("Digite o nome do inscrito: ");
  let id = parseInt(prompt("Digite o id do inscrito: "));
  let telefone = parseInt(prompt("Digite o telefone do inscrito: "));

  nomesInscritos.push(nome);
  idsInscritos.push(id);
  telefonesInscritos.push(telefone);

  alert("Inscrito cadastrado com sucesso!\n");
  //console.log("Nome: " + nomesInscritos + " | ID: " + idsInscritos + " | Telefone: " + telefonesInscritos);
}

let cadastro;

while (cadastro !== "n") {
  cadastro = prompt("Deseja cadastrar outro inscrito?(s/n)");

  if (cadastro === "s") {
    cadastrarInscrito(nomesInscritos, idsInscritos, telefonesInscritos);
  } else {
    console.log("=== INSCRITOS CADASTRADOS ===");
    for (let i = 0; i < nomesInscritos.length; i++) {
      alert(
        "Nome: " +
          nomesInscritos[i] +
          " | ID: " +
          idsInscritos[i] +
          " | Telefone: " +
          telefonesInscritos[i]
      );
    }
  }
}

// ==================================================
// EXERCÍCIO 2 - Criando o Cadastro de Vídeos
// ==================================================
let titulosVideos = [];
let codigosVideos = [];
let visualizacoesVideos = [];

function cadastrarVideo(titulosVideos, codigosVideos, visualizacoesVideos) {
  let titulos = prompt("Informe o título do vídeo: ");
  let codigos = parseInt(prompt("Informe o código do vídeo: "));
  let visualizacoes = parseInt(
    prompt("Informe o número inicial de visualizações: ")
  );

  titulosVideos.push(titulos);
  codigosVideos.push(codigos);
  visualizacoesVideos.push(visualizacoes);

  alert("Vídeo cadastrado com sucesso!");
}

let cadastroDeVideos;

while (cadastroDeVideos !== "n") {
  cadastroDeVideos = prompt("\nDeseja cadastrar outro vídeo?(s/n)");

  if (cadastroDeVideos === "s") {
    cadastrarVideo(titulosVideos, codigosVideos, visualizacoesVideos);
  } else {
    console.log("Finalizado.\n");
  }
}

// ==================================================
// EXERCÍCIO 3 - Listando Todos os Vídeos Cadastrados
// ==================================================
function consultarVideos(titulosVideos, codigosVideos, visualizacoesVideos) {
  console.log("=== VÍDEOS CADASTRADOS ===");
  for (let i = 0; i < titulosVideos.length; i++) {
    alert(
      "Nome do vídeo: " +
        titulosVideos[i] +
        " | Código do vídeo: " +
        codigosVideos[i] +
        " | Visualizações iniciais: " +
        visualizacoesVideos[i]
    );
  }
}

consultarVideos(titulosVideos, codigosVideos, visualizacoesVideos);

// ==================================================
// EXERCÍCIO 4 - Registrando Visualizações em um Vídeo
// ==================================================
function registrarVisualizacao(codigosVideos) {
  for (let i = 0; i < codigosVideos.length; i++) {
    if (codigo === codigosVideos[i]) {
      let novasVisualizacoes = parseInt(
        prompt("Digite quantas novas visualizações ele recebeu: ")
      );
      let total = parseInt(novasVisualizacoes + visualizacoesVideos[i]);
      visualizacoesVideos[i] = total;

      console.log(
        "Atualização de visualizações realizada:\n" +
          "Título: " +
          titulosVideos[i] +
          "\n" +
          "Código: " +
          codigosVideos[i] +
          "\n" +
          "Total de visualizações: " +
          visualizacoesVideos[i]
      );
    }
  }
}
let codigo = parseInt(
  prompt("\nDigite o código do vídeo para alterar a visualização: ")
);
registrarVisualizacao(codigosVideos);

// ==================================================
// EXERCÍCIO 5 - Consultando um Vídeo Específico pelo Código
// ==================================================
console.log("\nConsultando um Vídeo Específico");
function consultarVideoPorCodigo(
  titulosVideos,
  codigosVideos,
  visualizacoesVideos
) {
  let codigo = parseInt(prompt("Digite o código do vídeo: "));
  let achado = false;

  for (let i = 0; i < codigosVideos.length; i++) {
    if (codigosVideos[i] === codigo) {
      alert(
        "Título: " +
          titulosVideos[i] +
          "\n" +
          "Total de visualizações: " +
          visualizacoesVideos[i]
      );
    }
  }
  if (achado === true) {
    alert("Vídeo não encontrado");
  }
}
consultarVideoPorCodigo(titulosVideos, codigosVideos, visualizacoesVideos);

// ==================================================
// EXERCÍCIO 6 - Atualizando Informações de um Vídeo
// ==================================================
console.log("\nAtualizar Video");

function atualizarVideo(titulosVideos, codigosVideos, visualizacoesVideos) {
  let codigo = parseInt(prompt("Digite o código do vídeo: "));

  for (let i = 0; i < codigosVideos.length; i++) {
    if (codigosVideos[i] === codigo) {
      let titulo = parseInt(prompt("Digite o novo título: "));
      let visualizacoes = parseInt(
        prompt("Digite o novo número de visualizações:")
      );

      titulosVideos[i] = titulo;
      visualizacoesVideos[i] = visualizacoes;
    }
  }
  alert("Vídeo atualizado com sucesso!");
}
atualizarVideo(titulosVideos, codigosVideos, visualizacoesVideos);

// ==================================================
// EXERCÍCIO 7 - Atualizando Informações de um Vídeo
// ==================================================
console.log("\nRemover vídeo");

function removerVideo(titulosVideos, codigosVideos, visualizacoesVideos) {
  let codigo = parseInt(prompt("Digite o código do vídeo: "));

  for (let i = 0; i < codigosVideos.length; i++) {
    if (codigosVideos[i] === codigo) {
      titulosVideos.splice(i, 1);
      codigosVideos.splice(i, 1);
      visualizacoesVideos.splice(i, 1);
    }
  }
  alert("Vídeo removido com sucesso!");
}
removerVideo(titulosVideos, codigosVideos, visualizacoesVideos);
