document.addEventListener("DOMContentLoaded", () => {
  const formRegister = document.getElementById("form-register");
  const messageElement = document.getElementById("message");

  formRegister.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch("https://reqres.in/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        messageElement.textContent = `Usuário ${name} registrado com sucesso!`;
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error("Erro ao realizar inscrição", error.message);
      messageElement.textContent =
        "Erro ao realizar inscrição: " + error.message;
    }
  });
});
