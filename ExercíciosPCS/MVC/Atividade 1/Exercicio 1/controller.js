class ControladorTarefa {
  // O construtor é executado quando uma nova instância da classe é criada.
  constructor(modelo, visao) {
    // Atribui o modelo e a visão recebidos como argumentos aos atributos this.modelo e this.visao, respectivamente.
    this.modelo = modelo;
    this.visao = visao;
  }

  // Método para adicionar uma nova tarefa.
  adicionar_tarefa(nome_tarefa) {
    // Chama o método adicionar_tarefa do modelo, passando o nome da tarefa como argumento.
    this.modelo.adicionar_tarefa(nome_tarefa);
    // Após adicionar a tarefa, chama o método exibir_tarefas da visão para atualizar a exibição das tarefas na interface.
    this.visao.exibir_tarefas(this.modelo.tarefas);
  }

  // Método para alternar a conclusão de uma tarefa.
  alternarConclusaoTarefa(indice) {
    // Chama o método alternar_conclusao_tarefa do modelo, passando o índice da tarefa como argumento.
    this.modelo.alternar_conclusao_tarefa(indice);
    // Após alterar a conclusão da tarefa, chama o método exibir_tarefas da visão para atualizar a exibição das tarefas na interface.
    this.visao.exibir_tarefas(this.modelo.tarefas);
  }

  // Método para deletar uma tarefa.
  deletar_tarefa(indice) {
    // Chama o método deletar_tarefa do modelo, passando o índice da tarefa como argumento.
    this.modelo.deletar_tarefa(indice);
    // Após deletar a tarefa, chama o método exibir_tarefas da visão para atualizar a exibição das tarefas na interface.
    this.visao.exibir_tarefas(this.modelo.tarefas);
  }
}

// Instancia um novo objeto ModeloTarefa e atribui à variável modelo.
const modelo = new ModeloTarefa();
// Instancia um novo objeto VisaoTarefa e atribui à variável visao.
const visao = new VisaoTarefa();
// Instancia um novo objeto ControladorTarefa, passando modelo e visao como argumentos.
const controlador = new ControladorTarefa(modelo, visao);
// Vincula o método adicionar_tarefa do controlador como manipulador de evento de adicionar tarefa na visão.
visao.vincular_adicionar_tarefa(controlador.adicionar_tarefa.bind(controlador));
