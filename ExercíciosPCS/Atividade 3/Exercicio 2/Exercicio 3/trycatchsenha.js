function ErroSegurancaWayne(mensagem) {
  this.message = mensagem;
  this.name = "Erro de Segurança Wayne";
}

function validarEntradaDados(dados) {
  try {
    if (!dados || dados.length < 8) {
      throw new ErroSegurancaWayne("A senha ou token de acesso é inválido.");
    }
    console.log("Entrada de dados válida.");
  } catch (error) {
    console.error(error.name + ": " + error.message);
  }
}

// Testando a função com uma senha inválida
validarEntradaDados("123");

// Testando a função com uma senha válida
validarEntradaDados("senha_segura123");
