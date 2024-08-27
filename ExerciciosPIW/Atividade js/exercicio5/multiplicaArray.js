function multiplicaArray() {
  // Array e multiplicador fixos
  const array = [1, 2, 3, 4];
  const n = 3;

  // Usa map para multiplicar cada elemento do array por n
  return array.map((num) => num * n);
}

// Exibindo o resultado
console.log(`Array original: [1, 2, 3, 4], Resultado: ${multiplicaArray()}`); // Saída: [3, 6, 9, 12]
