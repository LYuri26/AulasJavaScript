// Aplicação principal
document.addEventListener("DOMContentLoaded", function () {
  // Carrega a página de agendamento por padrão
  loadAgendamentoPage();

  // Configura os listeners de navegação
  document
    .getElementById("nav-agendamento")
    .addEventListener("click", loadAgendamentoPage);
  document
    .getElementById("nav-importar")
    .addEventListener("click", loadImportarPage);
  document
    .getElementById("nav-relatorios")
    .addEventListener("click", loadRelatoriosPage);

  // Inicializa os agendamentos
  ScheduleManager.init();
});

function loadAgendamentoPage(e) {
  if (e) e.preventDefault();
  const template = document.getElementById("template-agendamento").innerHTML;
  document.getElementById("main-content").innerHTML = template;

  // Configura o formulário de agendamento
  document
    .getElementById("form-agendamento")
    .addEventListener("submit", handleAgendamentoSubmit);

  // Carrega os agendamentos do dia
  ScheduleManager.loadAgendamentosDoDia();
}

function loadImportarPage(e) {
  if (e) e.preventDefault();
  const template = document.getElementById("template-importar").innerHTML;
  document.getElementById("main-content").innerHTML = template;

  // Configura o formulário de importação
  document
    .getElementById("form-importar")
    .addEventListener("submit", handleImportarSubmit);
  document
    .getElementById("btn-download-template")
    .addEventListener("click", downloadTemplateCSV);
}

function loadRelatoriosPage(e) {
  if (e) e.preventDefault();
  const template = document.getElementById("template-relatorios").innerHTML;
  document.getElementById("main-content").innerHTML = template;

  // Carrega os relatórios
  ScheduleManager.loadRelatorios();
  document
    .getElementById("btn-exportar-logs")
    .addEventListener("click", exportarLogs);
}

function handleAgendamentoSubmit(e) {
  e.preventDefault();
  const formData = {
    equipamento: document.getElementById("equipamento").value,
    tecnico: document.getElementById("tecnico").value,
    data: document.getElementById("data").value,
    turno: document.getElementById("turno").value,
    descricao: document.getElementById("descricao").value,
  };

  if (ScheduleManager.validarAgendamento(formData)) {
    ScheduleManager.addAgendamento(formData); // CORREÇÃO: alterado de adicionarAgendamento para addAgendamento
    this.reset();
    ScheduleManager.loadAgendamentosDoDia();
  }
}

function handleImportarSubmit(e) {
  e.preventDefault();
  const fileInput = document.getElementById("arquivo-csv");
  const file = fileInput.files[0];

  if (file) {
    CSVHandler.processarCSV(file)
      .then((resultado) => {
        const container = document.getElementById("resultado-importacao");
        let html = `<div class="alert alert-success">
                    <h5>Importação concluída</h5>
                    <p>Total de registros: ${resultado.total}</p>
                    <p>Registros importados: ${resultado.sucesso}</p>
                    <p>Erros encontrados: ${resultado.erros.length}</p>
                </div>`;

        if (resultado.erros.length > 0) {
          html += `<div class="alert alert-danger">
                        <h5>Erros encontrados:</h5>
                        <ul>`;
          resultado.erros.forEach((erro) => {
            html += `<li>Linha ${erro.linha}: ${erro.mensagem}</li>`;
          });
          html += `</ul></div>`;
        }

        container.innerHTML = html;
        ScheduleManager.loadAgendamentosDoDia();
      })
      .catch((erro) => {
        document.getElementById("resultado-importacao").innerHTML = `
                    <div class="alert alert-danger">
                        Erro ao processar arquivo: ${erro.message}
                    </div>
                `;
      });
  }
}

function downloadTemplateCSV(e) {
  e.preventDefault();
  CSVHandler.gerarTemplate();
}

function exportarLogs(e) {
  e.preventDefault();
  ScheduleManager.exportarLogs();
}
