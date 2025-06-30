/**
 * Casos de Teste - Sistema de Agendamento
 *
 * Contém todas as suites de teste e funções de teste específicas
 * para validar o sistema de agendamento
 */

// =============================================
// SUITES DE TESTE
// =============================================

const testSuites = [
  {
    name: "Validação de Agendamento",
    description: "Testes para validação de dados de agendamento",
    tests: [
      {
        name: "Deve validar campos obrigatórios",
        description:
          "Verifica se todos os campos obrigatórios são validados corretamente",
        fn: testCamposObrigatorios,
      },
      {
        name: "Deve detectar conflito de horário",
        description:
          "Verifica se o sistema detecta conflitos de agendamento para o mesmo técnico no mesmo turno",
        fn: testConflitoHorario,
      },
      {
        name: "Deve validar formato de data",
        description: "Verifica se o formato da data é validado corretamente",
        fn: testFormatoData,
      },
      {
        name: "Deve validar turnos permitidos",
        description: "Verifica se apenas turnos válidos são aceitos",
        fn: testTurnosValidos,
      },
    ],
  },
  {
    name: "Manipulação de CSV",
    description: "Testes para importação/exportação de arquivos CSV",
    tests: [
      {
        name: "Deve gerar template CSV corretamente",
        description:
          "Verifica se o template CSV é gerado com os campos esperados",
        fn: testGerarTemplateCSV,
      },
      {
        name: "Deve processar arquivo CSV válido",
        description: "Verifica se um CSV válido é processado corretamente",
        fn: testProcessarCSVValido,
      },
      {
        name: "Deve detectar CSV inválido",
        description: "Verifica se o sistema detecta CSVs com campos faltantes",
        fn: testCSVInvalido,
      },
      {
        name: "Deve detectar formato de data inválido no CSV",
        description: "Verifica se datas mal formatadas no CSV são detectadas",
        fn: testCSVDataInvalida,
      },
    ],
  },
  {
    name: "Gerenciamento de Logs",
    description: "Testes para o sistema de registro de logs",
    tests: [
      {
        name: "Deve adicionar logs corretamente",
        description: "Verifica se os logs são registrados corretamente",
        fn: testAdicionarLog,
      },
      {
        name: "Deve exportar logs para CSV",
        description: "Verifica se a exportação de logs funciona corretamente",
        fn: testExportarLogs,
      },
      {
        name: "Deve limitar o número de logs armazenados",
        description:
          "Verifica se o sistema mantém apenas o número máximo de logs definido",
        fn: testLimiteLogs,
      },
    ],
  },
  {
    name: "Persistência de Dados",
    description: "Testes para armazenamento e recuperação de dados",
    tests: [
      {
        name: "Deve salvar agendamentos no localStorage",
        description: "Verifica se os agendamentos são persistidos corretamente",
        fn: testSalvarAgendamentos,
      },
      {
        name: "Deve recuperar agendamentos do localStorage",
        description: "Verifica se os agendamentos são carregados corretamente",
        fn: testCarregarAgendamentos,
      },
    ],
  },
];

// =============================================
// FUNÇÕES DE TESTE - VALIDAÇÃO
// =============================================

async function testCamposObrigatorios() {
  const validData = {
    equipamento: "computador",
    tecnico: "tec1",
    data: "2023-12-31",
    turno: "manha",
  };

  // Teste com todos os campos obrigatórios
  if (!ScheduleManager.validarAgendamento(validData)) {
    throw new Error("Dados válidos foram rejeitados");
  }

  // Teste com cada campo faltando
  const campos = ["equipamento", "tecnico", "data", "turno"];
  for (const campo of campos) {
    const invalidData = { ...validData };
    delete invalidData[campo];

    if (ScheduleManager.validarAgendamento(invalidData)) {
      throw new Error(`Campo obrigatório '${campo}' não foi validado`);
    }
  }
}

async function testConflitoHorario() {
  // Limpa agendamentos para teste
  const agendamentosAnteriores = ScheduleManager.agendamentos;
  ScheduleManager.agendamentos = [];

  try {
    const agendamento1 = {
      equipamento: "computador",
      tecnico: "tec1",
      data: "2023-12-31",
      turno: "manha",
    };

    // Adiciona primeiro agendamento
    ScheduleManager.addAgendamento(agendamento1);

    // Tenta adicionar agendamento conflitante
    const agendamento2 = {
      equipamento: "impressora",
      tecnico: "tec1",
      data: "2023-12-31",
      turno: "manha",
    };

    if (ScheduleManager.validarAgendamento(agendamento2)) {
      throw new Error("Conflito de horário não foi detectado");
    }
  } finally {
    // Restaura agendamentos originais
    ScheduleManager.agendamentos = agendamentosAnteriores;
    ScheduleManager.salvar();
  }
}

async function testFormatoData() {
  const validData = {
    equipamento: "computador",
    tecnico: "tec1",
    data: "2023-12-31",
    turno: "manha",
  };

  // Teste com formato válido
  if (!ScheduleManager.validarAgendamento(validData)) {
    throw new Error("Data válida foi rejeitada");
  }

  // Teste com formato inválido
  const invalidData = { ...validData, data: "31/12/2023" };
  if (ScheduleManager.validarAgendamento(invalidData)) {
    throw new Error("Data com formato inválido foi aceita");
  }

  // Teste com data vazia
  const emptyDateData = { ...validData, data: "" };
  if (ScheduleManager.validarAgendamento(emptyDateData)) {
    throw new Error("Data vazia foi aceita");
  }
}

async function testTurnosValidos() {
  const validData = {
    equipamento: "computador",
    tecnico: "tec1",
    data: "2023-12-31",
    turno: "manha",
  };

  // Teste com turnos válidos
  const turnosValidos = ["manha", "tarde", "noite"];
  for (const turno of turnosValidos) {
    const testData = { ...validData, turno };
    if (!ScheduleManager.validarAgendamento(testData)) {
      throw new Error(`Turno válido '${turno}' foi rejeitado`);
    }
  }

  // Teste com turno inválido
  const invalidTurnoData = { ...validData, turno: "madrugada" };
  if (ScheduleManager.validarAgendamento(invalidTurnoData)) {
    throw new Error("Turno inválido foi aceito");
  }
}

// =============================================
// FUNÇÕES DE TESTE - CSV
// =============================================

async function testGerarTemplateCSV() {
  const originalConsoleLog = console.log;
  let downloadTriggered = false;

  // Mock da função de download
  console.log = function (message) {
    if (message.includes("Template CSV baixado")) {
      downloadTriggered = true;
    }
    originalConsoleLog.apply(console, arguments);
  };

  // Executa a função
  CSVHandler.gerarTemplate();

  // Restaura console.log
  console.log = originalConsoleLog;

  if (!downloadTriggered) {
    throw new Error("Download do template CSV não foi acionado");
  }
}

async function testProcessarCSVValido() {
  // Cria um arquivo CSV mock
  const csvContent = `equipamento,tecnico,data,turno,descricao
computador,tec1,31/12/2023,manha,Manutenção preventiva
impressora,tec2,31/12/2023,tarde,Troca de toner`;

  const file = new Blob([csvContent], { type: "text/csv" });
  file.name = "test.csv";

  const agendamentosAnteriores = ScheduleManager.agendamentos;
  ScheduleManager.agendamentos = [];

  try {
    const result = await CSVHandler.processarCSV(file);

    if (result.sucesso !== 2) {
      throw new Error(
        `Esperava 2 registros processados, mas obteve ${result.sucesso}`
      );
    }

    if (ScheduleManager.agendamentos.length !== 2) {
      throw new Error(
        `Esperava 2 agendamentos adicionados, mas obteve ${ScheduleManager.agendamentos.length}`
      );
    }
  } finally {
    ScheduleManager.agendamentos = agendamentosAnteriores;
    ScheduleManager.salvar();
  }
}

async function testCSVInvalido() {
  // CSV sem cabeçalho obrigatório
  const csvContent = `equipamento,data,turno
computador,31/12/2023,manha`;

  const file = new Blob([csvContent], { type: "text/csv" });
  file.name = "test-invalid.csv";

  try {
    await CSVHandler.processarCSV(file);
    throw new Error("CSV inválido foi processado sem erro");
  } catch (error) {
    if (!error.message.includes("Campos obrigatórios faltando")) {
      throw new Error("Mensagem de erro inesperada: " + error.message);
    }
  }
}

async function testCSVDataInvalida() {
  // CSV com data inválida
  const csvContent = `equipamento,tecnico,data,turno
computador,tec1,31-12-2023,manha`;

  const file = new Blob([csvContent], { type: "text/csv" });
  file.name = "test-invalid-date.csv";

  const result = await CSVHandler.processarCSV(file);

  if (
    result.erros.length === 0 ||
    !result.erros[0].mensagem.includes("Formato de data inválido")
  ) {
    throw new Error("Data inválida no CSV não foi detectada");
  }
}

// =============================================
// FUNÇÕES DE TESTE - LOGS
// =============================================

async function testAdicionarLog() {
  const initialLogCount = ScheduleManager.logs.length;

  ScheduleManager.addLog("Teste de log", "info");

  if (ScheduleManager.logs.length !== initialLogCount + 1) {
    throw new Error("Log não foi adicionado corretamente");
  }

  const lastLog = ScheduleManager.logs[ScheduleManager.logs.length - 1];
  if (lastLog.mensagem !== "Teste de log" || lastLog.tipo !== "info") {
    throw new Error("Log adicionado com informações incorretas");
  }
}

async function testExportarLogs() {
  const originalConsoleLog = console.log;
  let exportTriggered = false;

  // Mock da função de download
  console.log = function (message) {
    if (message.includes("Logs exportados para CSV")) {
      exportTriggered = true;
    }
    originalConsoleLog.apply(console, arguments);
  };

  // Adiciona alguns logs para teste
  const initialLogs = ScheduleManager.logs;
  ScheduleManager.logs = [
    { timestamp: new Date().toISOString(), mensagem: "Log 1", tipo: "info" },
    { timestamp: new Date().toISOString(), mensagem: "Log 2", tipo: "error" },
  ];

  try {
    // Executa a função
    ScheduleManager.exportarLogs();

    if (!exportTriggered) {
      throw new Error("Exportação de logs não foi acionada");
    }
  } finally {
    // Restaura logs originais
    ScheduleManager.logs = initialLogs;
    ScheduleManager.salvar();
  }
}

async function testLimiteLogs() {
  const initialLogs = ScheduleManager.logs;

  try {
    // Configura limite baixo para teste
    const MAX_LOGS = 5;
    ScheduleManager.logs = [];

    // Adiciona mais logs que o limite
    for (let i = 0; i < MAX_LOGS + 3; i++) {
      ScheduleManager.addLog(`Log ${i}`, "info");
    }

    if (ScheduleManager.logs.length > MAX_LOGS) {
      throw new Error(
        `Sistema armazenou ${ScheduleManager.logs.length} logs, mas o máximo é ${MAX_LOGS}`
      );
    }
  } finally {
    ScheduleManager.logs = initialLogs;
    ScheduleManager.salvar();
  }
}

// =============================================
// FUNÇÕES DE TESTE - PERSISTÊNCIA
// =============================================

async function testSalvarAgendamentos() {
  const initialAgendamentos = ScheduleManager.agendamentos;

  try {
    // Prepara dados de teste
    ScheduleManager.agendamentos = [
      {
        id: 1,
        equipamento: "computador",
        tecnico: "tec1",
        data: "2023-12-31",
        turno: "manha",
        status: "agendado",
        criadoEm: new Date().toISOString(),
      },
    ];

    // Executa a função de salvar
    ScheduleManager.salvar();

    // Verifica se os dados foram salvos no localStorage
    const savedData = localStorage.getItem("agendamentos");
    if (!savedData) {
      throw new Error("Nenhum dado foi salvo no localStorage");
    }

    const parsedData = JSON.parse(savedData);
    if (parsedData.length !== 1 || parsedData[0].equipamento !== "computador") {
      throw new Error(
        "Dados salvos no localStorage não correspondem aos esperados"
      );
    }
  } finally {
    // Restaura estado original
    ScheduleManager.agendamentos = initialAgendamentos;
    ScheduleManager.salvar();
  }
}

async function testCarregarAgendamentos() {
  const initialAgendamentos = ScheduleManager.agendamentos;

  try {
    // Prepara dados de teste no localStorage
    const testData = [
      {
        id: 1,
        equipamento: "servidor",
        tecnico: "tec2",
        data: "2023-12-31",
        turno: "tarde",
        status: "agendado",
        criadoEm: new Date().toISOString(),
      },
    ];
    localStorage.setItem("agendamentos", JSON.stringify(testData));

    // Executa a função de carregar
    ScheduleManager.init();

    // Verifica se os dados foram carregados corretamente
    if (
      ScheduleManager.agendamentos.length !== 1 ||
      ScheduleManager.agendamentos[0].equipamento !== "servidor"
    ) {
      throw new Error(
        "Dados carregados do localStorage não correspondem aos esperados"
      );
    }
  } finally {
    // Restaura estado original
    ScheduleManager.agendamentos = initialAgendamentos;
    ScheduleManager.salvar();
  }
}

// =============================================
// INICIALIZAÇÃO (OPCIONAL)
// =============================================

// Esta parte só será executada se o arquivo for carregado diretamente no navegador
// (útil para testes manuais dos casos de teste)
if (typeof window !== "undefined" && typeof ScheduleManager !== "undefined") {
  document.addEventListener("DOMContentLoaded", function () {
    ScheduleManager.init();

    if (typeof TestRunner !== "undefined") {
      new TestRunner(testSuites);
    } else {
      console.error(
        "TestRunner não está disponível. Verifique se appteste.js foi carregado."
      );
    }
  });
}
