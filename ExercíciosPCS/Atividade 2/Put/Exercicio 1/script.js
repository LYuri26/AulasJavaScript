// Definindo a função updateContact no escopo global
async function updateContact(contactId) {
  const newName = prompt("Digite o novo nome:");
  const newEmail = prompt("Digite o novo email:");

  try {
    const response = await fetch(`https://reqres.in/api/users/${contactId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newName,
        email: newEmail,
      }),
    });

    if (!response.ok) {
      throw new Error("Erro ao atualizar contato");
    }

    alert("Contato atualizado com sucesso!");

    // Atualiza o elemento HTML do contato
    const updatedContact = {
      id: contactId,
      first_name: newName,
      email: newEmail,
    };

    displayUpdatedContact(updatedContact);
  } catch (error) {
    console.error(error.message);
    alert("Erro ao atualizar contato");
  }
}

// Função para exibir o contato atualizado na interface do usuário
function displayUpdatedContact(contact) {
  const contactElement = document.querySelector(`#contact-${contact.id}`);

  if (contactElement) {
    contactElement.innerHTML = `
        <p>ID: ${contact.id}</p>
        <p>Nome: ${contact.first_name}</p>
        <p>Email: ${contact.email}</p>
        <button onclick="updateContact(${contact.id})">Editar</button>
      `;
  }
}

// Definindo a função loadContacts no escopo global
async function loadContacts() {
  try {
    const response = await fetch("https://reqres.in/api/users");
    if (!response.ok) {
      throw new Error("Erro ao obter lista de contatos");
    }
    const contacts = await response.json();
    displayContacts(contacts.data);
  } catch (error) {
    console.error(error.message);
  }
}

// Definindo a função displayContacts no escopo global
function displayContacts(contacts) {
  const contactsListElement = document.getElementById("contacts-list");
  contactsListElement.innerHTML = ""; // Limpa a lista antes de adicionar os contatos

  contacts.forEach((contact) => {
    const contactElement = document.createElement("div");
    contactElement.id = `contact-${contact.id}`;
    contactElement.innerHTML = `
        <p>ID: ${contact.id}</p>
        <p>Nome: ${contact.first_name}</p>
        <p>Email: ${contact.email}</p>
        <button onclick="updateContact(${contact.id})">Editar</button>
      `;
    contactsListElement.appendChild(contactElement);
  });
}

// Chamando a função loadContacts para carregar a lista de contatos quando a página é carregada
loadContacts();
