<?php
require_once 'conexao.php';

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    // Preparar e executar a consulta SQL para selecionar todos os usuários
    $sql = "SELECT * FROM usuarios";
    $stmt = $pdo->query($sql);

    // Verificar se há usuários
    if ($stmt->rowCount() > 0) {
        // Exibir os usuários como JSON
        http_response_code(200);
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    } else {
        // Enviar uma resposta de sucesso com uma mensagem vazia
        http_response_code(200);
        echo json_encode(array());
    }
} else {
    // Enviar uma resposta de erro
    http_response_code(405);
    echo json_encode(array("message" => "Método não permitido."));
}
?>
