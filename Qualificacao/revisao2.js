let usuario;
let senha;
let idade;
function login(usuario, senha) {
  let validacao = false;
  if (usuario === "admin" && senha === "12345") {
    console.log("Usuário autorizado.");
    validacao = true;
  } else {
    console.log("Usuário não autorizado.");
  }
  return validacao;
}
function verificaIdade(idade) {
  if (idade < 13) {
    return "Criança.";
  } else if (idade >= 13 && idade <= 59) {
    return "Adulto.";
  } else {
    return "Idoso.";
  }
}
usuario = prompt("Digite o usuario:");
senha = prompt("Digite a senha:");
const autorizacao = login(usuario, senha);

if (autorizacao === true) {
  for (let i = 1; i <= 5; i++) {
    idade = parseInt(prompt("Digite a " + i + "º idade:"));
    if (idade < 0 || idade > 120) {
      console.log("Valor inválido");
    } else {
      const exibicaoIdade = verificaIdade(idade);
      console.log("Você é: " + exibicaoIdade);
    }
  }
} else {
  console.log("Você não pode digitar idade");
}
