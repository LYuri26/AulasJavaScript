// Função para alternar o estado de "concluído" da tarefa
function toggleTask(taskId) {
  // Obtém o elemento da tarefa (o <label>)
  var taskLabel = document.querySelector(`label[for=${taskId}]`);

  // Se a caixa de seleção estiver marcada, risca a tarefa
  if (document.getElementById(taskId).checked) {
    taskLabel.classList.add("completed");
  } else {
    taskLabel.classList.remove("completed");
  }
}
