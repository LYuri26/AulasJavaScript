// Código corrigido
function resgateDigital(heroi) {
    console.log("Iniciando missão de resgate digital para o herói " + heroi);

    let senha = "batman123";
    let tentativas = 3;

    while (tentativas > 0) {
        if (tentativas === 1) {
            console.log("Última tentativa restante...");
        }
        
        console.log("Tentativa de acesso ao servidor...");

        if (senha === "batman123") {
            console.log("Acesso concedido!");
            break;
        } else {
            console.log("Senha incorreta. Tentativas restantes: " + tentativas);
        }

        tentativas--;
    }

    if (tentativas === 0) {
        console.error("Tentativas esgotadas. Abortando missão.");
    } else {
        console.log("Resgate digital bem-sucedido!");
    }
}

// Chamada da função para resgate digital do Batman
resgateDigital("Batman");
