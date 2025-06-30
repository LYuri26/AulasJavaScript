// Configuração do ambiente de teste
const TEST_ENV = {
  assertions: 0,
  passed: 0,
  failed: 0,
};

// Funções de assertiva
function assert(condition, message) {
  TEST_ENV.assertions++;
  const resultElement = document.getElementById("testResults");

  const card = document.createElement("div");
  card.className = `card test-card ${condition ? "test-pass" : "test-fail"}`;

  card.innerHTML = `
    <div class="card-body">
      <div class="test-title">${message}</div>
      <span class="badge ${condition ? "bg-success" : "bg-danger"} test-badge">
        ${condition ? "✓ PASSOU" : "✗ FALHOU"}
      </span>
    </div>
  `;

  resultElement.appendChild(card);

  if (condition) {
    TEST_ENV.passed++;
  } else {
    TEST_ENV.failed++;
  }

  return condition;
}

async function assertRejects(promise, errorMessage, testMessage) {
  try {
    await promise;
    return assert(false, `${testMessage} (Deveria ter falhado)`);
  } catch (error) {
    return assert(
      error.message.includes(errorMessage),
      `${testMessage} (Erro: ${error.message})`
    );
  }
}

// Suíte de testes
async function runHTTPTests() {
  const testResults = document.getElementById("testResults");
  testResults.innerHTML = `
    <h4 class="mb-3">Testes de Chamadas HTTP</h4>
    <div class="d-flex gap-2 mb-3">
      <span class="badge bg-primary">Total: <span id="totalTests">0</span></span>
      <span class="badge bg-success">Passaram: <span id="passedTests">0</span></span>
      <span class="badge bg-danger">Falharam: <span id="failedTests">0</span></span>
    </div>
    <div id="testsContainer"></div>
  `;

  // Redireciona a saída dos testes
  const testsContainer = document.getElementById("testsContainer");
  const originalAppend = testResults.appendChild;
  testResults.appendChild = function (element) {
    testsContainer.appendChild(element);
    document.getElementById("totalTests").textContent = TEST_ENV.assertions;
    document.getElementById("passedTests").textContent = TEST_ENV.passed;
    document.getElementById("failedTests").textContent = TEST_ENV.failed;
    return element;
  };

  // 1. Teste: Requisição bem-sucedida para lista de usuários
  try {
    const users = await api.fetchFromAPI("/users");
    assert(
      Array.isArray(users) && users.length > 0,
      "GET /users deve retornar um array de usuários"
    );
  } catch (error) {
    assert(false, `GET /users falhou: ${error.message}`);
  }

  // 2. Teste: Requisição bem-sucedida para um usuário específico
  try {
    const user = await api.fetchFromAPI("/users/1");
    assert(
      user && user.id === 1,
      "GET /users/1 deve retornar um usuário com ID 1"
    );
  } catch (error) {
    assert(false, `GET /users/1 falhou: ${error.message}`);
  }

  // 3. Teste: Requisição com erro 404
  await assertRejects(
    api.fetchFromAPI("/error"),
    "HTTP error! status: 404",
    "GET /error deve rejeitar com status 404"
  );

  // 4. Teste: Endpoint não existente
  await assertRejects(
    api.fetchFromAPI("/invalid"),
    "Endpoint não existe",
    "GET /invalid deve rejeitar com mensagem de endpoint inválido"
  );

  // 5. Teste: Timeout na requisição (simulado)
  await assertRejects(
    api.fetchWithTimeout("https://httpbin.org/delay/3", 1000),
    "Request timeout",
    "Requisição com timeout deve rejeitar após 1 segundo"
  );

  // Restaura a função original
  testResults.appendChild = originalAppend;
}

// Configura o botão de testes
document.addEventListener("DOMContentLoaded", () => {
  const runTestsBtn = document.getElementById("runTestsBtn");
  if (runTestsBtn) {
    runTestsBtn.addEventListener("click", runHTTPTests);
  }
});
