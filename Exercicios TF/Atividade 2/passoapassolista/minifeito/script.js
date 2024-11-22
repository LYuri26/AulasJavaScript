// Função para adicionar nova tarefa à lista
function addTask() {
  // Obtém o valor do input
  var taskInput = document.getElementById("taskInput");
  var taskText = taskInput.value.trim();

  // Verifica se o campo não está vazio
  if (taskText !== "") {
    // Cria um novo item da lista
    var taskList = document.getElementById("taskList");

    // Limpa a lista antes de adicionar uma nova tarefa
    taskList.innerHTML = "";

    var li = document.createElement("li");

    // Cria o checkbox para a tarefa
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", function () {
      toggleTask(checkbox, li);
    });

    // Cria o label para a tarefa
    var label = document.createElement("label");
    label.textContent = taskText;

    // Adiciona a checkbox e o label no <li>
    li.appendChild(checkbox);
    li.appendChild(label);

    // Adiciona o item na lista
    taskList.appendChild(li);

    // Limpa o campo de entrada
    taskInput.value = "";
  }
}

// Função para alternar o estado de "concluído" da tarefa
function toggleTask(checkbox, li) {
  // Se a caixa de seleção estiver marcada, risca a tarefa
  if (checkbox.checked) {
    li.classList.add("completed");
  } else {
    li.classList.remove("completed");
  }
}
