function somaNumeros() {
  // Array fixo de números
  const numeros = [1, 2, 3, 4, 5];

  // Usa reduce para somar todos os elementos do array
  const soma = numeros.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  return soma;
}

// Exibindo o resultado
console.log(somaNumeros()); // Saída: 15
