// Funções de assertiva
function assertEquals(actual, expected, message) {
  const pass = actual === expected;
  const resultElement = document.getElementById("testResults");

  const card = document.createElement("div");
  card.className = `card test-card ${pass ? "test-pass" : "test-fail"}`;

  card.innerHTML = `
        <div class="card-body">
            <h5 class="card-title">${message}</h5>
            <div class="row">
                <div class="col-md-6">
                    <p class="card-text"><strong>Esperado:</strong> ${expected}</p>
                </div>
                <div class="col-md-6">
                    <p class="card-text"><strong>Obtido:</strong> ${actual}</p>
                </div>
            </div>
            <div class="mt-2 text-end">
                <span class="badge ${pass ? "bg-success" : "bg-danger"}">
                    ${pass ? "✓ PASSOU" : "✗ FALHOU"}
                </span>
            </div>
        </div>
    `;

  resultElement.appendChild(card);
  return pass;
}

function assertThrows(func, errorMessage, testMessage) {
  const resultElement = document.getElementById("testResults");
  let threw = false;
  let actualMessage = "";

  try {
    func();
  } catch (error) {
    threw = true;
    actualMessage = error.message;
  }

  const pass = threw && (!errorMessage || actualMessage.includes(errorMessage));
  const expectedText = errorMessage
    ? `Esperado: lançar erro contendo "${errorMessage}"`
    : "Esperado: lançar erro";

  const card = document.createElement("div");
  card.className = `card test-card ${pass ? "test-pass" : "test-fail"}`;

  card.innerHTML = `
        <div class="card-body">
            <h5 class="card-title">${testMessage}</h5>
            <p class="card-text"><strong>${expectedText}</strong></p>
            <p class="card-text"><strong>Obtido:</strong> ${
              threw ? `Erro: "${actualMessage}"` : "Nenhum erro lançado"
            }</p>
            <div class="mt-2 text-end">
                <span class="badge ${pass ? "bg-success" : "bg-danger"}">
                    ${pass ? "✓ PASSOU" : "✗ FALHOU"}
                </span>
            </div>
        </div>
    `;

  resultElement.appendChild(card);
  return pass;
}

// Suíte de testes
function runTestSuite() {
  const testResults = document.getElementById("testResults");
  testResults.innerHTML = `
        <h4 class="mb-4">Resultados dos Testes</h4>
        <div class="mb-3">
            <span class="badge bg-primary">Total: 10</span>
            <span class="badge bg-success ms-2">Passaram: <span id="passedCount">0</span></span>
            <span class="badge bg-danger ms-2">Falharam: <span id="failedCount">0</span></span>
        </div>
        <div id="testsContainer"></div>
    `;

  const testsContainer = document.getElementById("testsContainer");
  let passed = 0;
  let failed = 0;

  // Redireciona a saída dos testes para o container
  const originalAppend = testResults.appendChild;
  testResults.appendChild = function (element) {
    testsContainer.appendChild(element);

    // Atualiza contadores
    if (element.className.includes("test-pass")) passed++;
    if (element.className.includes("test-fail")) failed++;

    document.getElementById("passedCount").textContent = passed;
    document.getElementById("failedCount").textContent = failed;

    return element;
  };

  // 1. Teste: Carrinho vazio
  assertEquals(calculateCartTotal([]), 0, "Carrinho vazio deve retornar 0");

  // 2. Teste: Item sem desconto
  assertEquals(
    calculateCartTotal([{ price: 10, discount: 0 }]),
    10,
    "Item sem desconto deve retornar o preço total"
  );

  // 3. Teste: Item com desconto
  assertEquals(
    calculateCartTotal([{ price: 10, discount: 2 }]),
    8,
    "Item com desconto deve retornar preço menos desconto"
  );

  // 4. Teste: Múltiplos itens
  assertEquals(
    calculateCartTotal([
      { price: 10, discount: 1 },
      { price: 20, discount: 2 },
      { price: 30, discount: 3 },
    ]),
    54,
    "Múltiplos itens devem somar corretamente"
  );

  // 5. Teste: Desconto ausente
  assertEquals(
    calculateCartTotal([{ price: 10 }]),
    10,
    "Item sem propriedade discount deve ser tratado como desconto zero"
  );

  // 6. Teste: Parâmetro não é array
  assertThrows(
    () => calculateCartTotal("não é um array"),
    "O carrinho deve ser um array",
    "Deve lançar erro quando parâmetro não é array"
  );

  // 7. Teste: Preço não é número
  assertThrows(
    () => calculateCartTotal([{ price: "dez", discount: 0 }]),
    "Preço inválido",
    "Deve lançar erro quando preço não é número"
  );

  // 8. Teste: Preço negativo
  assertThrows(
    () => calculateCartTotal([{ price: -10, discount: 0 }]),
    "Preço inválido",
    "Deve lançar erro quando preço é negativo"
  );

  // 9. Teste: Desconto não é número
  assertThrows(
    () => calculateCartTotal([{ price: 10, discount: "um" }]),
    "Desconto inválido",
    "Deve lançar erro quando desconto não é número"
  );

  // 10. Teste: Desconto negativo
  assertThrows(
    () => calculateCartTotal([{ price: 10, discount: -1 }]),
    "Desconto inválido",
    "Deve lançar erro quando desconto é negativo"
  );

  // Restaura a função original
  testResults.appendChild = originalAppend;
}

// Configura o botão de testes
document.addEventListener("DOMContentLoaded", () => {
  const runTestsBtn = document.getElementById("runTestsBtn");
  if (runTestsBtn) {
    runTestsBtn.addEventListener("click", runTestSuite);
  }
});
