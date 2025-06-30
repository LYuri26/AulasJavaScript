// Cria um objeto global para a API
window.api = {
  /**
   * Faz uma requisição HTTP GET mockada para a API
   * @param {string} endpoint - Endpoint da API
   * @returns {Promise<Object>} - Resposta da API
   * @throws {Error} - Em caso de falha na requisição
   */
  fetchFromAPI: function (endpoint) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const mockResponses = {
          "/users": {
            status: 200,
            data: [
              { id: 1, name: "João Silva", email: "joao@example.com" },
              { id: 2, name: "Maria Souza", email: "maria@example.com" },
            ],
          },
          "/users/1": {
            status: 200,
            data: { id: 1, name: "João Silva", email: "joao@example.com" },
          },
          "/error": {
            status: 404,
            data: { error: "Recurso não encontrado" },
          },
        };

        const response = mockResponses[endpoint] || {
          status: 404,
          data: { error: "Endpoint não existe" },
        };

        if (response.status >= 400) {
          reject(new Error(`HTTP error! status: ${response.status}`));
        } else {
          resolve(response.data);
        }
      }, 500);
    });
  },

  /**
   * Wrapper para fetch que inclui timeout
   * @param {string} url - URL para requisição
   * @param {number} timeout - Tempo máximo em ms
   * @returns {Promise<Response>}
   */
  fetchWithTimeout: function (url, timeout = 5000) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    return fetch(url, {
      signal: controller.signal,
    })
      .then((response) => {
        clearTimeout(timeoutId);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          throw new Error("Request timeout");
        }
        throw error;
      });
  },
};
