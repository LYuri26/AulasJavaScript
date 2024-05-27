// Função para carregar e exibir a lista de tarefas
const carregarListaTarefas = async () => {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/todos");
      if (!response.ok) {
        throw new Error("Erro ao obter lista de tarefas");
      }
      const tarefas = await response.json();
      exibirListaTarefas(tarefas);
    } catch (error) {
      console.error(error.message);
    }
  };
  
  // Função para exibir a lista de tarefas na interface do usuário
  const exibirListaTarefas = (tarefas) => {
    const listaTarefasElement = document.getElementById("lista-tarefas");
    listaTarefasElement.innerHTML = ""; // Limpa a lista antes de adicionar as tarefas
  
    tarefas.forEach((tarefa) => {
      const li = document.createElement("li");
      li.textContent = tarefa.title;
  
      const button = document.createElement("button");
      button.textContent = "Excluir";
      button.addEventListener("click", async () => {
        await removerTarefa(tarefa.id);
        li.remove(); // Remove o elemento <li> correspondente da lista
      });
  
      li.appendChild(button);
      listaTarefasElement.appendChild(li);
    });
  };
  
  const removerTarefa = async (idTarefa) => {
    try {
      console.log("Tentando remover tarefa com ID:", idTarefa);
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${idTarefa}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Erro ao remover tarefa");
      }
  
      // Atualiza dinamicamente a lista de tarefas na interface do usuário
      console.log("Tarefa removida com sucesso");
    } catch (error) {
      console.error(error.message);
    }
  };
  
  // Carrega a lista de tarefas quando a página é carregada
  carregarListaTarefas();
  