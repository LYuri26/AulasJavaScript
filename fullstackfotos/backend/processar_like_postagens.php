<?php
// Inicie ou retome a sessão
session_start();

// Incluir o arquivo de conexão com o banco de dados
include './connect.php';

// Verificar o tipo de solicitação
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    // Função para carregar curtidas ao carregar a página
    $likes = array();

    // Consultar o banco de dados para obter o número de curtidas de cada postagem
    $stmt = $conn->prepare("SELECT id, curtidas FROM postagens");
    $stmt->execute();
    $posts = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Adicionar o número de curtidas de cada postagem ao array de likes
    foreach ($posts as $post) {
        $likes[$post['id']] = intval($post['curtidas']);
    }

    // Retornar os likes no formato JSON
    echo json_encode(array("success" => true, "likes" => $likes));
    exit; // Termina o script após enviar a resposta JSON
} else {
    // Usuário não autorizado ou método de solicitação inválido
    http_response_code(403);
    // Registra o erro no log
    error_log("Não autorizado ou método de solicitação inválido ao processar o like.");
    echo json_encode(array("success" => false, "message" => "Não autorizado ou método de solicitação inválido."));
    exit; // Termina o script após enviar a resposta JSON
}
?>
