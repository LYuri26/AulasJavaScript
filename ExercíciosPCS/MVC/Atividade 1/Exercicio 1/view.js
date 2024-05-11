class VisaoTarefa {
  constructor() {
    this.lista_tarefas = document.getElementById("lista-tarefas"); // Obtém a referência ao elemento HTML que exibirá a lista de tarefas.
  }

  exibir_tarefas(tarefas) {
    this.lista_tarefas.innerHTML = ""; // Limpa o conteúdo atual da lista de tarefas.
    tarefas.forEach((tarefa, indice) => {
      // Itera sobre cada tarefa na lista fornecida.
      const li = document.createElement("li"); // Cria um elemento <li> para representar a tarefa.
      const checkbox = document.createElement("input"); // Cria um elemento <input> para representar a checkbox de conclusão da tarefa.
      checkbox.type = "checkbox"; // Define o tipo da checkbox como "checkbox".
      checkbox.checked = tarefa.concluida; // Define o estado de conclusão da checkbox com base no estado da tarefa.
      checkbox.addEventListener("change", () => {
        // Adiciona um ouvinte de evento para detectar mudanças na checkbox.
        controller.alternarConclusaoTarefa(indice); // Chama o método alternarConclusaoTarefa do controlador quando a checkbox é alterada.
      });
      li.appendChild(checkbox); // Adiciona a checkbox como filho do elemento <li>.
      li.appendChild(document.createTextNode(tarefa.nome)); // Adiciona o nome da tarefa como texto dentro do elemento <li>.
      this.lista_tarefas.appendChild(li); // Adiciona o elemento <li> à lista de tarefas.
    });
  }

  vincular_adicionar_tarefa(handler) {
    const botao_adicionar = document.getElementById("botao-adicionar"); // Obtém a referência ao botão de adicionar tarefa.
    const input_tarefa = document.getElementById("input-tarefa"); // Obtém a referência ao campo de entrada de texto para o nome da tarefa.
    botao_adicionar.addEventListener("click", () => {
      // Adiciona um ouvinte de evento para o clique no botão de adicionar tarefa.
      const nome_tarefa = input_tarefa.value.trim(); // Obtém o valor do campo de entrada de texto e remove espaços em branco extras.
      if (nome_tarefa !== "") {
        // Verifica se o nome da tarefa não está vazio.
        handler(nome_tarefa); // Chama o manipulador fornecido, passando o nome da tarefa como argumento.
        input_tarefa.value = ""; // Limpa o campo de entrada de texto após adicionar a tarefa.
      }
    });
  }
}
