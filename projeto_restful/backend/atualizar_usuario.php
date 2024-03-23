<?php
require_once 'conexao.php';

if ($_SERVER["REQUEST_METHOD"] == "PUT") {
    // Extrair o ID do usuário da URL
    parse_str(file_get_contents("php://input"), $put_vars);
    $id = $put_vars['id'];

    // Extrair os dados do formulário
    $nome = $put_vars['nome'];
    $email = $put_vars['email'];
    $senha = $put_vars['senha'];

    // Preparar e executar a consulta SQL para atualizar o usuário
    $sql = "UPDATE usuarios SET nome = :nome, email = :email, senha = :senha WHERE id = :id";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':nome', $nome);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':senha', $senha);
    $stmt->bindParam(':id', $id);
    $stmt->execute();

    // Enviar uma resposta de sucesso
    http_response_code(200);
    echo json_encode(array("message" => "Usuário atualizado com sucesso."));
} else {
    // Enviar uma resposta de erro
    http_response_code(405);
    echo json_encode(array("message" => "Método não permitido."));
}
?>
