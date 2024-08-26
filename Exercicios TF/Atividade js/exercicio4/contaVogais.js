function contaVogais() {
  // String fixa
  const str = "Olá Mundo";
  const vogais = ["a", "e", "i", "o", "u"];
  let contador = 0;

  // Converte a string para minúsculas e conta as vogais
  for (let char of str.toLowerCase()) {
    if (vogais.includes(char)) {
      contador++;
    }
  }

  return contador;
}

// Exibindo o resultado
console.log(`A string fixa tem ${contaVogais()} vogais.`); // Saída: 4
