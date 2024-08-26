function inverteString() {
  // String fixa
  const str = "Olá mundo";

  // Separa a string em palavras
  let palavras = str.split(" ");

  // Inverte cada palavra individualmente e depois inverte a ordem das palavras na frase
  let palavrasInvertidas = palavras.map((palavra) =>
    palavra.split("").reverse().join("")
  );
  let fraseInvertida = palavrasInvertidas.reverse().join(" ");

  return fraseInvertida;
}

// Exibindo o resultado
console.log(inverteString()); // Saída: "odnum álO"
