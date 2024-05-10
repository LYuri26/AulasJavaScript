async function resgateDigital() {
  try {
    const resposta = await enviarRequisicaoHTTP();
    console.log("Dados resgatados com sucesso:", resposta);
  } catch (error) {
    console.error("Erro durante a missão de resgate:", error.message);
  }
}

function enviarRequisicaoHTTP() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const chanceDeErro = Math.random();
      if (chanceDeErro < 0.3) {
        reject(
          new Error(
            "Falha na comunicação com o servidor. Tente novamente mais tarde."
          )
        );
      } else {
        resolve("Dados confidenciais resgatados!");
      }
    }, 2000);
  });
}

resgateDigital();
