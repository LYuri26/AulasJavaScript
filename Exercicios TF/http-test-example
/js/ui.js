document.addEventListener("DOMContentLoaded", () => {
  const fetchBtn = document.getElementById("fetchBtn");
  const endpointSelect = document.getElementById("endpointSelect");
  const loadingIndicator = document.getElementById("loadingIndicator");
  const resultContainer = document.getElementById("resultContainer");

  fetchBtn.addEventListener("click", async () => {
    loadingIndicator.classList.remove("d-none");
    resultContainer.innerHTML = "";

    try {
      const endpoint = endpointSelect.value;
      // Usa a função do objeto global api
      const data = await api.fetchFromAPI(endpoint);

      resultContainer.innerHTML = `
        <div class="alert alert-success">
          <h5>Resposta da API (${endpoint})</h5>
          <pre>${JSON.stringify(data, null, 2)}</pre>
        </div>
      `;
    } catch (error) {
      resultContainer.innerHTML = `
        <div class="alert alert-danger">
          <h5>Erro na requisição</h5>
          <p class="error-message">${error.message}</p>
        </div>
      `;
    } finally {
      loadingIndicator.classList.add("d-none");
    }
  });
});
