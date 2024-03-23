<?php
// Incluir o arquivo de conexão com o banco de dados
require_once 'conexao.php';

try {
    // SQL para criar a tabela de usuários
    $sql = "CREATE TABLE IF NOT EXISTS usuarios (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        senha VARCHAR(100) NOT NULL
    )";

    // Executar a query SQL
    $pdo->exec($sql);

    // Mensagem de sucesso
    echo "Tabela de usuários criada com sucesso.";
} catch (PDOException $e) {
    // Em caso de erro, exibir a mensagem de erro
    die("Erro ao criar tabela de usuários: " . $e->getMessage());
}
?>
