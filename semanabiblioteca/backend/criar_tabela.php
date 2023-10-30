<?php

include 'conexao.php'; // Incluindo o arquivo de conexão

$sql = "CREATE TABLE IF NOT EXISTS jogadores (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    pontuacao INT(6) NOT NULL,
    posicao INT(6) UNSIGNED
)";

if ($conn->query($sql) === TRUE) {
    echo "Tabela criada com sucesso ou já existente!";
} else {
    echo "Erro ao criar tabela: " . $conn->error;
}

$conn->close();

?>
