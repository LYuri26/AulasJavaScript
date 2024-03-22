<?php
// Inicie ou retome a sessão
session_start();

// Incluir o arquivo de conexão com o banco de dados
include './connect.php';

// Verificar o tipo de solicitação
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_SESSION['logged_in']) && $_SESSION['logged_in'] === true) {
    // Verificar se os parâmetros necessários foram enviados
    if (isset($_POST['postId'], $_POST['commentText'])) {
        $postId = intval($_POST['postId']); // Convertendo para inteiro
        $commentText = htmlspecialchars($_POST['commentText']); // Sanitizar texto do comentário
        $userId = intval($_SESSION['user_id']); // Convertendo para inteiro (ID do usuário)

        // Inserir o comentário no banco de dados
        try {
            $stmt = $conn->prepare("INSERT INTO comentarios (id_postagem, id_usuario, texto) VALUES (?, ?, ?)");
            $stmt->execute([$postId, $userId, $commentText]);

            // Responder com sucesso
            echo json_encode(array("success" => true, "message" => "Comentário enviado com sucesso."));
            exit; // Termina o script após enviar a resposta JSON
        } catch (PDOException $e) {
            // Em caso de erro, responder com mensagem de erro
            http_response_code(500); // Código de status 500 - Erro interno do servidor
            echo json_encode(array("success" => false, "message" => "Erro ao enviar o comentário. Por favor, tente novamente mais tarde."));
            exit; // Termina o script após enviar a resposta JSON
        }
    } else {
        // Parâmetros ausentes
        echo json_encode(array("success" => false, "message" => "Parâmetros ausentes."));
        exit; // Termina o script após enviar a resposta JSON
    }
} else {
    // Usuário não autorizado ou método de solicitação inválido
    http_response_code(403);
    // Registra o erro no log
    error_log("Não autorizado ou método de solicitação inválido ao processar o comentário.");
    echo json_encode(array("success" => false, "message" => "Não autorizado ou método de solicitação inválido."));
    exit; // Termina o script após enviar a resposta JSON
}
