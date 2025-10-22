// Versão compatível com AMD e CommonJS
(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    // AMD
    define([], factory);
  } else if (typeof module === "object" && module.exports) {
    // CommonJS
    module.exports = factory();
  } else {
    // Navegador global
    root.shoppingCart = factory();
  }
})(this, function () {
  /**
   * Calcula o valor total de um carrinho de compras
   * @param {Array} cartItems - Array de itens no formato { price: number, discount?: number }
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

      // Validação do desconto (default 0 se não existir)
      const discount = typeof item.discount === "number" ? item.discount : 0;
      if (discount < 0) {
        throw new Error("Desconto inválido");
      }

      // Soma ao total
      return total + (item.price - discount);
    }, 0);
  }

  // API pública
  return {
    calculateCartTotal: calculateCartTotal,
  };
});
