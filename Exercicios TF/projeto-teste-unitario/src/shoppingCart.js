// Função principal que será executada quando o DOM estiver carregado
function initCartCalculator() {
  // Verifica se os elementos necessários existem no DOM
  const calculateBtn = document.getElementById("calculateBtn");
  const resultElement = document.getElementById("result");

  if (!calculateBtn || !resultElement) {
    console.error("Elementos necessários não encontrados no DOM");
    return;
  }

  // Adiciona o event listener ao botão
  calculateBtn.addEventListener("click", () => {
    const cart = [
      { name: "Produto A", price: 10.99, discount: 0 },
      { name: "Produto B", price: 5.99, discount: 1.0 },
      { name: "Produto C", price: 7.5, discount: 0.5 },
    ];

    try {
      const total = calculateCartTotal(cart);
      resultElement.innerHTML = `
        <p>Total: R$ ${total.toFixed(2)}</p>
        <p>Itens: ${cart.length}</p>
      `;
    } catch (error) {
      resultElement.innerHTML = `<p class="error">Erro: ${error.message}</p>`;
      console.error(error);
    }
  });
}

/**
 * Calcula o valor total de um carrinho de compras
 * @param {Array} cartItems - Array de itens no formato { price: number, discount: number }
 * @returns {number} - Valor total do carrinho
 * @throws {Error} - Se os dados de entrada forem inválidos
 */
function calculateCartTotal(cartItems) {
  // Validação de entrada
  if (!Array.isArray(cartItems)) {
    throw new Error("O carrinho deve ser um array");
  }

  // Cálculo do total
  return cartItems.reduce((total, item) => {
    // Validação do preço
    if (typeof item.price !== "number" || item.price < 0) {
      throw new Error("Preço inválido");
    }

    // Validação do desconto
    const discount = item.discount || 0;
    if (typeof discount !== "number" || discount < 0) {
      throw new Error("Desconto inválido");
    }

    // Soma ao total
    return total + (item.price - discount);
  }, 0);
}

// Exportação para Node.js (testes)
if (typeof module !== "undefined" && module.exports) {
  module.exports = { calculateCartTotal };
} else {
  // Executa a função init quando o DOM estiver carregado (apenas no navegador)
  document.addEventListener("DOMContentLoaded", initCartCalculator);
}
