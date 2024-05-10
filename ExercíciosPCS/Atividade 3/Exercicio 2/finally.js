function simularAlocacaoDeRecursos() {
    let recurso = null;

    try {
        console.log("Simulando alocação de recursos...");
        // Simulação de alocação de recursos
        recurso = "servidor";
        if (recurso === null) {
            throw new Error("Erro durante a alocação de recursos.");
        }
    } catch (error) {
        console.error("Ocorreu um erro durante a alocação:", error.message);
    } finally {
        console.log("Liberando recursos...");
        if (recurso !== null) {
            console.log("Recurso liberado:", recurso);
        } else {
            console.log("Nenhum recurso a ser liberado.");
        }
    }
}

// Chamada da função para simular a alocação de recursos
simularAlocacaoDeRecursos();
