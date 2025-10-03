var inputTarefa = document.getElementById("novaTarefa");
var botaoAdicionar = document.getElementById("adicionar");
var listaTarefas = document.getElementById("listaTarefas");
var feedback = document.getElementById("feedback");

var tarefas = []; // apenas strings

// Feedback visual
function mostrarFeedback(msg, tipo) {
  var div = document.createElement("div");
  div.className = "feedback-msg feedback-" + tipo;
  div.innerText = msg;
  feedback.appendChild(div);

  setTimeout(function () {
    feedback.removeChild(div);
  }, 2000);
}

// Renderizar tarefas
function renderizarTarefas() {
  listaTarefas.innerHTML = "";

  for (var i = 0; i < tarefas.length; i++) {
    var li = document.createElement("li");
    li.className = "list-group-item";
    li.innerText = tarefas[i];

    var btnContainer = document.createElement("div");
    btnContainer.className = "li-buttons";

    // Botão concluir
    var btnConcluir = document.createElement("button");
    btnConcluir.innerText = "✔";
    btnConcluir.className = "btn btn-success btn-sm";

    // Usar closure para capturar o li correto
    (function (li) {
      btnConcluir.onclick = function () {
        if (li.className.indexOf("concluida") >= 0) {
          li.className = "list-group-item";
          mostrarFeedback("Tarefa marcada como pendente.", "info");
        } else {
          li.className = "list-group-item concluida";
          mostrarFeedback("Tarefa concluída!", "sucesso");
        }
      };
    })(li);

    // Botão excluir
    var btnExcluir = document.createElement("button");
    btnExcluir.innerText = "🗑";
    btnExcluir.className = "btn btn-danger btn-sm";

    (function (index) {
      btnExcluir.onclick = function () {
        tarefas.splice(index, 1);
        renderizarTarefas();
        mostrarFeedback("Tarefa removida.", "erro");
      };
    })(i);

    btnContainer.appendChild(btnConcluir);
    btnContainer.appendChild(btnExcluir);
    li.appendChild(btnContainer);

    listaTarefas.appendChild(li);
  }
}

// Adicionar tarefa
botaoAdicionar.onclick = function () {
  var texto = inputTarefa.value.trim();
  if (texto != "") {
    tarefas.push(texto);
    renderizarTarefas();
    mostrarFeedback("Tarefa adicionada com sucesso!", "sucesso");
    inputTarefa.value = "";
  } else {
    mostrarFeedback("Digite uma tarefa antes de adicionar.", "erro");
  }
};
