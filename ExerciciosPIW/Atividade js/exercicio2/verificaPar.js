function verificaPar() {
  // Número fixo
  const numero = 4;

  // Verifica se o número é par
  if (numero % 2 === 0) {
    return `${numero} é par.`;
  } else {
    return `${numero} é ímpar.`;
  }
}

// Exibindo o resultado
console.log(verificaPar()); // Saída: "4 é par."
