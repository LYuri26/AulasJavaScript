function contarVogaisNaString() {
  // String fixa
  const stringFixa = "Olá Mundo";
  const listaDeVogais = ["a", "e", "i", "o", "u"];
  let quantidadeDeVogais = 0;

  // Converte a string para minúsculas e conta as vogais
  for (let indice = 0; indice < stringFixa.length; indice++) {
    let caractereAtual = stringFixa[indice].toLowerCase();
    if (listaDeVogais.includes(caractereAtual)) {
      quantidadeDeVogais++;
    }
  }

  return quantidadeDeVogais;
}

// Exibindo o resultado
console.log(`A string fixa tem ${contarVogaisNaString()} vogais.`); // Saída: 4
