// Função para adicionar nova tarefa à lista
function addTask() {
  // Obtém o valor do input
  var taskInput = document.getElementById("taskInput");
  var taskText = taskInput.value.trim();

  // Verifica se o campo não está vazio
  if (taskText !== "") {
    // Cria um novo item da lista
    var taskList = document.getElementById("taskList");
    var li = document.createElement("li");
    li.textContent = taskText;

    // Adiciona o item na lista
    taskList.appendChild(li);

    // Limpa o campo de entrada
    taskInput.value = "";
  }
}
