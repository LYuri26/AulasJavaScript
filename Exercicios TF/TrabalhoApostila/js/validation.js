// Validações específicas
const Validation = {
  validarData: function (data) {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(data)) return false;

    const partes = data.split("-");
    const dia = parseInt(partes[2], 10);
    const mes = parseInt(partes[1], 10) - 1;
    const ano = parseInt(partes[0], 10);

    const dataObj = new Date(ano, mes, dia);
    return (
      dataObj.getFullYear() === ano &&
      dataObj.getMonth() === mes &&
      dataObj.getDate() === dia
    );
  },

  validarTurno: function (turno) {
    return ["manha", "tarde", "noite"].includes(turno);
  },

  validarTecnico: function (tecnico) {
    return ["tec1", "tec2", "tec3"].includes(tecnico);
  },

  validarEquipamento: function (equipamento) {
    return ["computador", "impressora", "servidor", "rede"].includes(
      equipamento
    );
  },
};
