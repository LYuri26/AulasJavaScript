<?php
// Incluir o arquivo de conexão com o banco de dados
include 'connect.php';

try {
    // Prepara a consulta SQL para selecionar o ID e a quantidade de comentários para cada postagem
    $sql = "SELECT id, comentarios FROM postagens";

    // Prepara a declaração SQL
    $stmt = $conn->prepare($sql);

    // Executa a declaração SQL
    $stmt->execute();

    // Obtém os resultados da consulta
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Array para armazenar a quantidade de comentários para cada postagem
    $comments = array();

    // Verifica se há resultados
    if ($result) {
        // Loop através dos resultados e armazena a quantidade de comentários para cada postagem
        foreach ($result as $row) {
            // Converte o ID para um número inteiro
            $postId = (int) $row['id'];
            $comments[$postId] = $row['comentarios'];
        }
    }

    // Retorna os resultados como JSON
    echo json_encode(array("success" => true, "comments" => $comments));
} catch (PDOException $e) {
    // Se ocorrer um erro, retorna uma mensagem de erro
    echo json_encode(array("success" => false, "message" => "Erro: " . $e->getMessage()));
}
?>
