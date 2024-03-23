<?php
require_once 'conexao.php';

if ($_SERVER["REQUEST_METHOD"] == "DELETE") {
    // Extrair o ID do usuário da URL
    parse_str(file_get_contents("php://input"), $delete_vars);
    $id = $delete_vars['id'];

    // Preparar e executar a consulta SQL para excluir o usuário
    $sql = "DELETE FROM usuarios WHERE id = :id";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':id', $id);
    $stmt->execute();

    // Verificar se o usuário foi excluído com sucesso
    if ($stmt->rowCount() > 0) {
        // Enviar uma resposta de sucesso
        http_response_code(200);
        echo json_encode(array("message" => "Usuário excluído com sucesso."));
    } else {
        // Enviar uma resposta de sucesso com uma mensagem vazia
        http_response_code(200);
        echo json_encode(array("message" => "Nenhum usuário foi excluído."));
    }
} else {
    // Enviar uma resposta de erro
    http_response_code(405);
    echo json_encode(array("message" => "Método não permitido."));
}
?>
