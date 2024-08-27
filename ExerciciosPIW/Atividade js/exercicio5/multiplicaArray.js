function multiplicaVetor() {
  // vetor e multiplicador fixos
  const vetor = [1, 2, 3, 4];
  const multiplicacao = 3;

  // Usa map para multiplicar cada elemento do vetor por multiplicacao
  return vetor.map((numeroVetor) => numeroVetor * multiplicacao);
}

// Exibindo o resultado
console.log(`vetor original: [1, 2, 3, 4], Resultado: ${multiplicaVetor()}`); // Saída: [3, 6, 9, 12]
