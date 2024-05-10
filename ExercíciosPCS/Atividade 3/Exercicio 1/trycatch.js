function calcularDivisao(numero1, numero2) {
  try {
    // Verificar se o segundo número é zero
    if (numero2 === 0) {
      throw new Error("Divisão por zero não é permitida.");
    }

    // Realizar a divisão
    return numero1 / numero2;
  } catch (error) {
    // Capturar e lidar com o erro elegantemente
    console.error("Ocorreu um erro:", error.message);
    return null; // Retornar null ou outro valor indicando erro
  }
}

// Exemplos de uso da função
console.log(calcularDivisao(10, 2)); // Saída: 5
console.log(calcularDivisao(8, 0)); // Saída: Ocorreu um erro: Divisão por zero não é permitida. null
