/**
 * Test Runner - Sistema de Agendamento
 *
 * Classe responsável por executar e gerenciar os testes unitários
 * com interface visual para acompanhamento dos resultados
 */

class TestRunner {
  constructor(testSuites) {
    this.testSuites = testSuites;
    this.testResults = [];
    this.executionLogs = [];
    this.incidents = [];

    // Elementos do DOM
    this.domElements = {
      testResultsContainer: document.getElementById("test-results"),
      executionLogsContainer: document.getElementById("execution-logs"),
      incidentsContainer: document.getElementById("incidents-container"),
      totalTestsElement: document.getElementById("total-tests"),
      passedTestsElement: document.getElementById("passed-tests"),
      failedTestsElement: document.getElementById("failed-tests"),
      skippedTestsElement: document.getElementById("skipped-tests"),
      progressPassed: document.getElementById("progress-passed"),
      progressFailed: document.getElementById("progress-failed"),
      progressSkipped: document.getElementById("progress-skipped"),
      runTestsButton: document.getElementById("run-tests"),
      exportResultsButton: document.getElementById("export-results"),
    };

    // Inicialização
    this.initialize();
  }

  /**
   * Inicializa o test runner
   */
  initialize() {
    this.renderTestList();
    this.setupEventListeners();
    this.addLog(
      'Test Runner inicializado. Clique em "Executar Todos os Testes" para começar.',
      "info"
    );
  }

  /**
   * Configura os event listeners
   */
  setupEventListeners() {
    this.domElements.runTestsButton.addEventListener("click", () =>
      this.runAllTests()
    );
    this.domElements.exportResultsButton.addEventListener("click", () =>
      this.exportResults()
    );
  }

  /**
   * Renderiza a lista de testes na interface
   */
  renderTestList() {
    this.domElements.testResultsContainer.innerHTML = "";

    this.testSuites.forEach((suite, suiteIndex) => {
      const suiteElement = this.createSuiteElement(suite, suiteIndex);
      this.domElements.testResultsContainer.appendChild(suiteElement);

      const suiteTestsContainer = document.getElementById(
        `suite-${suiteIndex}`
      );

      suite.tests.forEach((test, testIndex) => {
        const testElement = this.createTestElement(test, suiteIndex, testIndex);
        suiteTestsContainer.appendChild(testElement);

        // Adiciona evento de clique para mostrar detalhes
        testElement
          .querySelector(".test-header")
          .addEventListener("click", () => {
            this.toggleTestDetails(`${suiteIndex}-${testIndex}`);
          });
      });
    });

    this.updateSummary();
  }

  /**
   * Cria elemento HTML para uma suite de testes
   */
  createSuiteElement(suite, index) {
    const element = document.createElement("div");
    element.className = "card mb-4";
    element.innerHTML = `
            <div class="card-header">
                <h5 class="mb-0">${suite.name}</h5>
            </div>
            <div class="card-body" id="suite-${index}">
                <!-- Testes serão inseridos aqui -->
            </div>
        `;
    return element;
  }

  /**
   * Cria elemento HTML para um teste individual
   */
  createTestElement(test, suiteIndex, testIndex) {
    const testId = `test-${suiteIndex}-${testIndex}`;
    const element = document.createElement("div");
    element.className = "card test-card mb-2";
    element.id = testId;
    element.innerHTML = `
            <div class="card-header test-header d-flex justify-content-between align-items-center" data-testid="${testId}">
                <span>${test.name}</span>
                <span class="badge bg-secondary">Não executado</span>
            </div>
            <div class="test-details" id="${testId}-details">
                <div class="test-log"></div>
            </div>
        `;
    return element;
  }

  /**
   * Alterna a exibição dos detalhes do teste
   */
  toggleTestDetails(testId) {
    const details = document.getElementById(`test-${testId}-details`);
    details.style.display = details.style.display === "none" ? "block" : "none";
  }

  /**
   * Executa todos os testes
   */
  async runAllTests() {
    // Reset dos estados
    this.resetTestRun();

    this.addLog("Iniciando execução de todos os testes...", "info");

    // Executa cada suite e teste
    for (
      let suiteIndex = 0;
      suiteIndex < this.testSuites.length;
      suiteIndex++
    ) {
      const suite = this.testSuites[suiteIndex];
      this.addLog(`Executando suite: ${suite.name}`, "info");

      for (let testIndex = 0; testIndex < suite.tests.length; testIndex++) {
        const test = suite.tests[testIndex];
        await this.executeTest(test, suite, suiteIndex, testIndex);
      }
    }

    this.addLog("Todos os testes foram executados", "info");
    this.updateSummary();
  }

  /**
   * Prepara o ambiente para uma nova execução de testes
   */
  resetTestRun() {
    this.testResults = [];
    this.executionLogs = [];
    this.incidents = [];

    this.domElements.executionLogsContainer.innerHTML = "";
    this.domElements.incidentsContainer.innerHTML = "";
  }

  /**
   * Executa um teste individual
   */
  async executeTest(test, suite, suiteIndex, testIndex) {
    const testId = `test-${suiteIndex}-${testIndex}`;
    const testElement = document.getElementById(testId);
    const testHeader = testElement.querySelector(".test-header");
    const testBadge = testHeader.querySelector(".badge");
    const testLog = testElement.querySelector(".test-log");

    // Prepara a interface para o teste
    this.prepareTestUI(testElement, testHeader, testBadge, testLog, test.name);

    try {
      // Executa o teste e mede o tempo
      const { duration, error } = await this.runTestWithTiming(test.fn);

      if (error) throw error;

      // Teste passou
      this.handleTestPass(
        testElement,
        testHeader,
        testBadge,
        testLog,
        test,
        suite,
        duration
      );
    } catch (error) {
      // Teste falhou
      this.handleTestFailure(
        testElement,
        testHeader,
        testBadge,
        testLog,
        test,
        suite,
        error
      );
    }
  }

  /**
   * Prepara a interface para execução de um teste
   */
  prepareTestUI(testElement, testHeader, testBadge, testLog, testName) {
    testHeader.classList.remove("bg-success", "bg-danger", "bg-warning");
    testBadge.textContent = "Executando...";
    testBadge.className = "badge bg-info";
    testLog.innerHTML = "";
    this.addLog(`Executando teste: ${testName}`, "info");
  }

  /**
   * Executa uma função de teste com medição de tempo
   */
  async runTestWithTiming(testFn) {
    const startTime = performance.now();
    try {
      await testFn();
      const endTime = performance.now();
      const duration = (endTime - startTime).toFixed(2);
      return { duration };
    } catch (error) {
      const endTime = performance.now();
      const duration = (endTime - startTime).toFixed(2);
      return { duration, error };
    }
  }

  /**
   * Processa resultado de teste bem-sucedido
   */
  handleTestPass(
    testElement,
    testHeader,
    testBadge,
    testLog,
    test,
    suite,
    duration
  ) {
    testHeader.classList.add("bg-success");
    testBadge.textContent = "Passou";
    testBadge.className = "badge bg-success";
    testElement.classList.add("test-passed");
    testLog.innerHTML = `<div class="alert alert-success">Teste passou em ${duration}ms</div>`;

    this.testResults.push({
      suite: suite.name,
      name: test.name,
      status: "passed",
      duration: duration,
    });

    this.addLog(`✅ ${test.name} - Passou (${duration}ms)`, "success");
  }

  /**
   * Processa resultado de teste falho
   */
  handleTestFailure(
    testElement,
    testHeader,
    testBadge,
    testLog,
    test,
    suite,
    error
  ) {
    testHeader.classList.add("bg-danger");
    testBadge.textContent = "Falhou";
    testBadge.className = "badge bg-danger";
    testElement.classList.add("test-failed");
    testLog.innerHTML = `
            <div class="alert alert-danger">
                <h6>Teste falhou</h6>
                <p>${error.message}</p>
                <pre class="mt-2">${
                  error.stack || "Nenhum stack trace disponível"
                }</pre>
            </div>
        `;

    this.testResults.push({
      suite: suite.name,
      name: test.name,
      status: "failed",
      error: error.message,
    });

    this.addLog(`❌ ${test.name} - Falhou: ${error.message}`, "error");
    this.addIncident({
      test: test.name,
      suite: suite.name,
      message: error.message,
      details: error.stack || "Nenhum detalhe adicional",
    });
  }

  /**
   * Atualiza o resumo dos testes na interface
   */
  updateSummary() {
    const total = this.testResults.length;
    const passed = this.testResults.filter((t) => t.status === "passed").length;
    const failed = this.testResults.filter((t) => t.status === "failed").length;
    const skipped =
      this.testSuites.reduce((sum, suite) => sum + suite.tests.length, 0) -
      total;

    // Atualiza contadores
    this.domElements.totalTestsElement.textContent = this.testSuites.reduce(
      (sum, suite) => sum + suite.tests.length,
      0
    );
    this.domElements.passedTestsElement.textContent = passed;
    this.domElements.failedTestsElement.textContent = failed;
    this.domElements.skippedTestsElement.textContent = skipped;

    // Atualiza barras de progresso
    const totalTests = this.testSuites.reduce(
      (sum, suite) => sum + suite.tests.length,
      0
    );
    const passedPercent = (passed / totalTests) * 100;
    const failedPercent = (failed / totalTests) * 100;
    const skippedPercent = (skipped / totalTests) * 100;

    this.domElements.progressPassed.style.width = `${passedPercent}%`;
    this.domElements.progressFailed.style.width = `${failedPercent}%`;
    this.domElements.progressSkipped.style.width = `${skippedPercent}%`;
  }

  /**
   * Adiciona uma mensagem ao log de execução
   */
  addLog(message, type = "info") {
    const timestamp = new Date().toLocaleTimeString();
    this.executionLogs.push({ timestamp, message, type });

    const logElement = document.createElement("div");
    logElement.className = `log-entry log-${type}`;
    logElement.innerHTML = `<strong>[${timestamp}]</strong> ${message}`;

    this.domElements.executionLogsContainer.appendChild(logElement);
    this.domElements.executionLogsContainer.scrollTop =
      this.domElements.executionLogsContainer.scrollHeight;
  }

  /**
   * Adiciona um incidente à lista
   */
  addIncident(incident) {
    this.incidents.push(incident);

    const incidentElement = document.createElement("div");
    incidentElement.className = "card incident-card mb-2";
    incidentElement.innerHTML = `
            <div class="card-header">
                <h6 class="mb-0">${incident.test}</h6>
            </div>
            <div class="card-body">
                <p class="card-text">${incident.message}</p>
                <small class="text-muted">Suite: ${incident.suite}</small>
                <details class="mt-2">
                    <summary>Detalhes</summary>
                    <pre class="mt-2 p-2 bg-light">${incident.details}</pre>
                </details>
            </div>
        `;

    this.domElements.incidentsContainer.appendChild(incidentElement);
  }

  /**
   * Exporta os resultados dos testes
   */
  exportResults() {
    const data = {
      timestamp: new Date().toISOString(),
      totalTests: this.testSuites.reduce(
        (sum, suite) => sum + suite.tests.length,
        0
      ),
      testsRun: this.testResults.length,
      passed: this.testResults.filter((t) => t.status === "passed").length,
      failed: this.testResults.filter((t) => t.status === "failed").length,
      skipped:
        this.testSuites.reduce((sum, suite) => sum + suite.tests.length, 0) -
        this.testResults.length,
      testResults: this.testResults,
      incidents: this.incidents,
      logs: this.executionLogs,
    };

    this.createDownload(
      `test-results-${new Date().toISOString().split("T")[0]}.json`,
      JSON.stringify(data, null, 2),
      "application/json"
    );

    this.addLog("Resultados dos testes exportados", "success");
  }

  /**
   * Cria um download de arquivo
   */
  createDownload(filename, content, type) {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}

// Inicialização quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", function () {
  // Certifique-se que ScheduleManager está disponível
  if (typeof ScheduleManager !== "undefined") {
    ScheduleManager.init();
  }

  // Verifique se testSuites está definido antes de criar o TestRunner
  if (typeof testSuites !== "undefined") {
    new TestRunner(testSuites);
  } else {
    console.error(
      "testSuites não está definido. Verifique a ordem de carregamento dos scripts."
    );
  }
});
