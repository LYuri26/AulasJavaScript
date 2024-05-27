document.addEventListener("DOMContentLoaded", async () => {
  const notesListElement = document.getElementById("notes-list");

  // Função para carregar a lista de notas
  const loadNotes = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      if (!response.ok) {
        throw new Error("Erro ao obter lista de notas");
      }
      const notes = await response.json();
      displayNotes(notes);
    } catch (error) {
      console.error(error.message);
    }
  };

  // Função para exibir a lista de notas na interface do usuário
  const displayNotes = (notes) => {
    notesListElement.innerHTML = ""; // Limpa a lista antes de adicionar as notas

    notes.forEach((note) => {
      const noteElement = createNoteElement(note);
      notesListElement.appendChild(noteElement);
    });
  };

  // Função para criar o elemento HTML de uma nota
  const createNoteElement = (note) => {
    const noteElement = document.createElement("div");
    noteElement.id = `note-${note.id}`;
    noteElement.innerHTML = `
              <p>ID: ${note.id}</p>
              <p>Nome: ${note.title}</p>
              <p>Nota: ${note.body}</p>
              <button onclick="editNote(${note.id})">Editar</button>
          `;
    return noteElement;
  };

  // Função para editar uma nota
  window.editNote = async (noteId) => {
    const newTitle = prompt("Digite o novo nome:");
    const newBody = prompt("Digite a nova nota:");

    try {
      // Verificar se o elemento da nota existe antes de tentar atualizá-lo
      const noteElement = document.querySelector(`#note-${noteId}`);
      if (!noteElement) {
        throw new Error("Elemento da nota não encontrado");
      }

      // Atualizar o conteúdo da nota na interface sem fazer a chamada para a API
      noteElement.querySelector(
        "p:nth-child(2)"
      ).innerText = `Nome: ${newTitle}`;
      noteElement.querySelector(
        "p:nth-child(3)"
      ).innerText = `Nota: ${newBody}`;

      alert("Nota atualizada com sucesso!");
    } catch (error) {
      console.error(error.message);
      alert("Erro ao atualizar nota");
    }
  };
  // Carrega a lista de notas quando a página é carregada
  await loadNotes();
});
