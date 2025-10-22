// Manipulador de arquivos CSV
const CSVHandler = {
  gerarTemplate: function () {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "equipamento,tecnico,data,turno,descricao\n" +
      "computador,tec1,31/12/2023,manha,Manutenção preventiva\n" +
      "impressora,tec2,31/12/2023,tarde,Troca de toner\n" +
      "servidor,tec3,31/12/2023,noite,Atualização de sistema";

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "template_agendamentos.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    ScheduleManager.addLog("Template CSV baixado", "info");
  },

  processarCSV: function (file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = function (e) {
        try {
          const content = e.target.result;
          const linhas = content.split("\n");
          const cabecalho = linhas[0]
            .split(",")
            .map((c) => c.trim().toLowerCase());

          // Valida cabeçalho
          const camposObrigatorios = [
            "equipamento",
            "tecnico",
            "data",
            "turno",
          ];
          const camposFaltantes = camposObrigatorios.filter(
            (campo) => !cabecalho.includes(campo)
          );

          if (camposFaltantes.length > 0) {
            throw new Error(
              `Campos obrigatórios faltando: ${camposFaltantes.join(", ")}`
            );
          }

          const resultado = {
            total: linhas.length - 1,
            sucesso: 0,
            erros: [],
          };

          // Processa cada linha
          for (let i = 1; i < linhas.length; i++) {
            if (!linhas[i].trim()) continue;

            const valores = linhas[i].split(",");
            const registro = {};

            cabecalho.forEach((campo, index) => {
              registro[campo] = valores[index] ? valores[index].trim() : "";
            });

            try {
              // Validação básica
              if (
                !registro.equipamento ||
                !registro.tecnico ||
                !registro.data ||
                !registro.turno
              ) {
                throw new Error("Campos obrigatórios faltando");
              }

              // Valida formato da data
              const partesData = registro.data.split("/");
              if (partesData.length !== 3 || partesData.some((p) => isNaN(p))) {
                throw new Error("Formato de data inválido (use DD/MM/AAAA)");
              }

              // Valida turno
              if (!["manha", "tarde", "noite"].includes(registro.turno)) {
                throw new Error("Turno inválido (use manha, tarde ou noite)");
              }

              // Converte data para formato YYYY-MM-DD
              const dataFormatada = `${partesData[2]}-${partesData[1].padStart(
                2,
                "0"
              )}-${partesData[0].padStart(2, "0")}`;

              // Cria agendamento
              ScheduleManager.addAgendamento({
                equipamento: registro.equipamento,
                tecnico: registro.tecnico,
                data: dataFormatada,
                turno: registro.turno,
                descricao: registro.descricao || "",
              });

              resultado.sucesso++;
            } catch (erro) {
              resultado.erros.push({
                linha: i + 1,
                mensagem: erro.message,
              });
            }
          }

          resolve(resultado);
        } catch (erro) {
          reject(erro);
        }
      };

      reader.onerror = function () {
        reject(new Error("Erro ao ler o arquivo"));
      };

      reader.readAsText(file);
    });
  },
};
