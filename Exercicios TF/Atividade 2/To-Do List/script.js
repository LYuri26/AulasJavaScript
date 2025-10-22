document.addEventListener("DOMContentLoaded", function () {
  loadTasksFromLocalStorage();
});

function addTask() {
  var input = document.getElementById("taskInput");
  var taskText = input.value.trim();

  if (taskText !== "") {
    var taskList = document.getElementById("taskList");
    var li = document.createElement("li");
    li.textContent = taskText;
    li.addEventListener("click", toggleTask);

    var removeButton = document.createElement("button");
    removeButton.textContent = "X";
    removeButton.addEventListener("click", removeTask);

    li.appendChild(removeButton);
    taskList.appendChild(li);

    input.value = "";

    saveTasksToLocalStorage();
  }
}

function toggleTask() {
  this.classList.toggle("completed");
  saveTasksToLocalStorage();
}

function removeTask(event) {
  var li = event.target.parentElement;
  li.parentElement.removeChild(li);
  saveTasksToLocalStorage();
}

function saveTasksToLocalStorage() {
  var tasks = [];
  var taskElements = document.querySelectorAll("#taskList li");
  taskElements.forEach(function (task) {
    tasks.push({
      text: task.textContent,
      completed: task.classList.contains("completed"),
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
  var tasks = JSON.parse(localStorage.getItem("tasks"));
  if (tasks) {
    tasks.forEach(function (task) {
      var li = document.createElement("li");
      li.textContent = task.text;
      if (task.completed) {
        li.classList.add("completed");
      }
      li.addEventListener("click", toggleTask);

      var removeButton = document.createElement("button");
      removeButton.textContent = "X";
      removeButton.addEventListener("click", removeTask);

      li.appendChild(removeButton);
      document.getElementById("taskList").appendChild(li);
    });
  }
}
