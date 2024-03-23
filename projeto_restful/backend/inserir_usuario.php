<?php
require_once 'conexao.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Extrair os dados do formulário
    $data = json_decode(file_get_contents("php://input"), true);
    $nome = $data['nome'];
    $email = $data['email'];
    $senha = $data['senha'];

    // Preparar e executar a consulta SQL para inserir o usuário
    $sql = "INSERT INTO usuarios (nome, email, senha) VALUES (:nome, :email, :senha)";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':nome', $nome);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':senha', $senha);
    $stmt->execute();

    // Enviar uma resposta de sucesso
    http_response_code(201);
    echo json_encode(array("message" => "Usuário criado com sucesso."));
} else {
    // Enviar uma resposta de erro
    http_response_code(405);
    echo json_encode(array("message" => "Método não permitido."));
}
?>
