<?php
// Inicie ou retome a sessão
session_start();

// Incluir o arquivo de conexão com o banco de dados
include './connect.php';

// Verificar o tipo de solicitação
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_SESSION['logged_in']) && $_SESSION['logged_in'] === true) {
    // Verificar se os parâmetros necessários foram enviados
    if (isset($_POST['postId'], $_POST['action'], $_SESSION['user_id'])) {
        $postId = $_POST['postId'];
        $action = $_POST['action'];
        $userId = $_SESSION['user_id'];

        // Verificar se a postagem existe
        $stmt = $conn->prepare("SELECT * FROM postagens WHERE id = ?");
        $stmt->bindParam(1, $postId);
        $stmt->execute();
        $post = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($post) {
            // Verificar se o usuário já curtiu a postagem
            $stmt = $conn->prepare("SELECT * FROM curtidas WHERE id_usuario = ? AND id_postagem = ?");
            $stmt->bindParam(1, $userId);
            $stmt->bindParam(2, $postId);
            $stmt->execute();
            $existingLike = $stmt->fetch(PDO::FETCH_ASSOC);

            // Processar a ação de "like" ou "unlike"
            if ($action === "like" && !$existingLike) {
                // Adicionar um novo like
                $stmt = $conn->prepare("INSERT INTO curtidas (id_usuario, id_postagem) VALUES (?, ?)");
            } elseif ($action === "unlike" && $existingLike) {
                // Remover o like existente
                $stmt = $conn->prepare("DELETE FROM curtidas WHERE id_usuario = ? AND id_postagem = ?");
            }

            $stmt->bindParam(1, $userId);
            $stmt->bindParam(2, $postId);
            $stmt->execute();

            // Obter o número atualizado de curtidas
            $stmt = $conn->prepare("SELECT curtidas FROM postagens WHERE id = ?");
            $stmt->bindParam(1, $postId);
            $stmt->execute();
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            $newLikes = intval($result['curtidas']);

            // Responder com sucesso e os novos likes
            echo json_encode(array("success" => true, "likes" => $newLikes));
            exit; // Termina o script após enviar a resposta JSON
        } else {
            // Postagem não encontrada
            echo json_encode(array("success" => false, "message" => "Postagem não encontrada."));
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
    error_log("Não autorizado ou método de solicitação inválido ao processar o like.");
    echo json_encode(array("success" => false, "message" => "Não autorizado ou método de solicitação inválido."));
    exit; // Termina o script após enviar a resposta JSON
}
?>
