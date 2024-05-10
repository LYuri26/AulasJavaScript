window.onerror = function (message, source, lineno, colno, error) {
  // Registra informações sobre o erro
  const dataErro = {
    mensagem: message,
    origem: source,
    linha: lineno,
    coluna: colno,
    erro: error.stack || error.toString(),
  };

  // Exibe o erro no console do navegador
  console.error("Erro capturado:", dataErro);

  // Exibe o erro em um alerta na tela
  alert("Erro capturado: " + JSON.stringify(dataErro));

  // Retorna true para evitar a exibição do erro no console do navegador
  return true;
};

function simularErro() {
  let variavel = null;

  // Simulando um erro se a variável estiver vazia
  if (!variavel) {
    throw new Error("Variável está vazia!");
  }
}

// Chamada da função para simular um erro
simularErro();
