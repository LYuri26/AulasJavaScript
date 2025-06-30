// Gerenciador de agendamentos
const ScheduleManager = {
  agendamentos: [],
  logs: [],

  init: function () {
    // Carrega dados salvos no localStorage
    const saved = localStorage.getItem("agendamentos");
    if (saved) {
      this.agendamentos = JSON.parse(saved);
    }

    // Carrega logs
    const savedLogs = localStorage.getItem("logs");
    if (savedLogs) {
      this.logs = JSON.parse(savedLogs);
    } else {
      // Logs iniciais
      this.addLog("Sistema iniciado", "info");
    }
  },

  addAgendamento: function (data) {
    const agendamento = {
      id: Date.now(),
      equipamento: data.equipamento,
      tecnico: data.tecnico,
      data: data.data,
      turno: data.turno,
      descricao: data.descricao || "",
      status: "agendado",
      criadoEm: new Date().toISOString(),
    };

    this.agendamentos.push(agendamento);
    this.salvar();
    this.addLog(
      `Novo agendamento criado: ${agendamento.equipamento} para ${agendamento.tecnico}`,
      "success"
    );
  },

  validarAgendamento: function (data) {
    // Valida campos obrigatórios
    if (!data.equipamento || !data.tecnico || !data.data || !data.turno) {
      this.addLog(
        "Tentativa de agendamento com campos obrigatórios faltando",
        "warning"
      );
      alert("Preencha todos os campos obrigatórios");
      return false;
    }

    // Valida sobreposição de horário
    const conflito = this.agendamentos.find((ag) => {
      return (
        ag.data === data.data &&
        ag.turno === data.turno &&
        ag.tecnico === data.tecnico
      );
    });

    if (conflito) {
      this.addLog(
        `Conflito de agendamento detectado para ${data.tecnico} no turno ${data.turno}`,
        "warning"
      );
      alert("Já existe um agendamento para este técnico no mesmo turno");
      return false;
    }

    return true;
  },

  loadAgendamentosDoDia: function () {
    const hoje = new Date().toISOString().split("T")[0];
    const tabela = document.getElementById("tabela-agendamentos");

    if (tabela) {
      const tbody = tabela.querySelector("tbody");
      tbody.innerHTML = "";

      const agendamentosHoje = this.agendamentos.filter(
        (ag) => ag.data === hoje
      );

      if (agendamentosHoje.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="text-center text-muted">Nenhum agendamento para hoje</td></tr>`;
        return;
      }

      agendamentosHoje.forEach((ag) => {
        const tr = document.createElement("tr");

        // Mapeia valores para exibição
        const equipamentoMap = {
          computador: "Computador",
          impressora: "Impressora",
          servidor: "Servidor",
          rede: "Equip. de Rede",
        };

        const tecnicoMap = {
          tec1: "João Silva",
          tec2: "Maria Souza",
          tec3: "Carlos Oliveira",
        };

        const turnoMap = {
          manha: "Manhã",
          tarde: "Tarde",
          noite: "Noite",
        };

        const statusMap = {
          agendado: '<span class="badge bg-primary">Agendado</span>',
          concluido: '<span class="badge bg-success">Concluído</span>',
          cancelado: '<span class="badge bg-secondary">Cancelado</span>',
        };

        tr.innerHTML = `
                    <td>${equipamentoMap[ag.equipamento]}</td>
                    <td>${tecnicoMap[ag.tecnico]}</td>
                    <td><span class="badge badge-turno badge-${ag.turno}">${
          turnoMap[ag.turno]
        }</span></td>
                    <td>${statusMap[ag.status]}</td>
                    <td>
                        <button class="btn btn-sm btn-outline-success concluir-btn" data-id="${
                          ag.id
                        }">Concluir</button>
                        <button class="btn btn-sm btn-outline-danger cancelar-btn" data-id="${
                          ag.id
                        }">Cancelar</button>
                    </td>
                `;

        tbody.appendChild(tr);
      });

      // Adiciona listeners aos botões
      document.querySelectorAll(".concluir-btn").forEach((btn) => {
        btn.addEventListener("click", () =>
          this.atualizarStatus(btn.dataset.id, "concluido")
        );
      });

      document.querySelectorAll(".cancelar-btn").forEach((btn) => {
        btn.addEventListener("click", () =>
          this.atualizarStatus(btn.dataset.id, "cancelado")
        );
      });
    }
  },

  atualizarStatus: function (id, status) {
    id = parseInt(id);
    const index = this.agendamentos.findIndex((ag) => ag.id === id);

    if (index !== -1) {
      this.agendamentos[index].status = status;
      this.salvar();
      this.addLog(
        `Agendamento ${id} atualizado para status: ${status}`,
        "info"
      );
      this.loadAgendamentosDoDia();
    }
  },

  loadRelatorios: function () {
    // Carrega gráficos (simulado)
    const graficoTecnicos = document.getElementById("grafico-tecnicos");
    const graficoEquipamentos = document.getElementById("grafico-equipamentos");

    if (graficoTecnicos) {
      graficoTecnicos.innerHTML =
        '<div class="p-4 text-center bg-light">Gráfico de agendamentos por técnico</div>';
    }

    if (graficoEquipamentos) {
      graficoEquipamentos.innerHTML =
        '<div class="p-4 text-center bg-light">Gráfico de agendamentos por equipamento</div>';
    }

    // Carrega logs
    const tabelaLogs = document.getElementById("tabela-logs");
    if (tabelaLogs) {
      const tbody = tabelaLogs.querySelector("tbody");
      tbody.innerHTML = "";

      // Mostra apenas os últimos 50 logs
      const logsRecentes = [...this.logs].reverse().slice(0, 50);

      if (logsRecentes.length === 0) {
        tbody.innerHTML =
          '<tr><td colspan="3" class="text-center text-muted">Nenhum log disponível</td></tr>';
        return;
      }

      logsRecentes.forEach((log) => {
        const tr = document.createElement("tr");
        tr.className = `log-${log.tipo}`;

        const data = new Date(log.timestamp);
        const dataFormatada = data.toLocaleString();

        tr.innerHTML = `
                    <td>${dataFormatada}</td>
                    <td><span class="badge bg-${this.getBadgeClass(
                      log.tipo
                    )}">${log.tipo.toUpperCase()}</span></td>
                    <td>${log.mensagem}</td>
                `;

        tbody.appendChild(tr);
      });
    }
  },

  getBadgeClass: function (tipo) {
    const map = {
      error: "danger",
      warning: "warning",
      success: "success",
      info: "info",
    };
    return map[tipo] || "secondary";
  },

  addLog: function (mensagem, tipo = "info") {
    this.logs.push({
      timestamp: new Date().toISOString(),
      mensagem,
      tipo,
    });

    // Mantém apenas os últimos 1000 logs
    if (this.logs.length > 1000) {
      this.logs.shift();
    }

    this.salvar();
  },

  exportarLogs: function () {
    const logsCSV = this.logs
      .map((log) => {
        return `${log.timestamp},${log.tipo},"${log.mensagem.replace(
          /"/g,
          '""'
        )}"`;
      })
      .join("\n");

    const csvContent =
      "data:text/csv;charset=utf-8,Data/Hora,Tipo,Mensagem\n" + logsCSV;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `logs_agendamento_${new Date().toISOString().split("T")[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    this.addLog("Logs exportados para CSV", "info");
  },

  salvar: function () {
    localStorage.setItem("agendamentos", JSON.stringify(this.agendamentos));
    localStorage.setItem("logs", JSON.stringify(this.logs));
  },
};
