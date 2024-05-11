class ModeloTarefa {
  constructor() {
    this.tarefas = []; // Inicializa uma lista vazia para armazenar as tarefas.
  }

  adicionar_tarefa(nome_tarefa) {
    this.tarefas.push({ nome: nome_tarefa, concluida: false }); // Adiciona uma nova tarefa à lista de tarefas com o nome fornecido e define o estado de conclusão como falso.
  }

  alternar_conclusao_tarefa(indice) {
    this.tarefas[indice].concluida = !this.tarefas[indice].concluida; // Alterna o estado de conclusão da tarefa no índice especificado. Se for verdadeira, torna-se falsa e vice-versa.
  }

  deletar_tarefa(indice) {
    this.tarefas.splice(indice, 1); // Remove a tarefa no índice especificado da lista de tarefas.
  }
}
