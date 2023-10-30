<?php
header("Access-Control-Allow-Origin: *"); // Permite todas as origens (não recomendado para produção)
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include 'conexao.php'; // Incluindo o arquivo de conexão

// Verifica se os dados foram recebidos por POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtém os dados do formulário
    $nome = $_POST["nome"];
    $pontuacao = $_POST["pontuacao"];

    // Prepara e executa a declaração de inserção
    $stmt = $conn->prepare("INSERT INTO jogadores (nome, pontuacao) VALUES (?, ?)");
    $stmt->bind_param("si", $nome, $pontuacao);

    if ($stmt->execute() === TRUE) {
        echo "Dados inseridos com sucesso!";
    } else {
        echo "Erro ao inserir dados: " . $stmt->error;
    }

    $stmt->close();
} else {
    echo "Requisição inválida!";
}

$conn->close();

?>
