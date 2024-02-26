<?php
session_start();
include './connect.php';

header('Content-Type: application/json');

// Verifica se a solicitação é do tipo POST e se o usuário está logado
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_SESSION['logged_in']) && $_SESSION['logged_in'] === true) {
    // Verifica se os parâmetros necessários foram enviados
    if (isset($_POST['postId'], $_POST['action'])) {
        $postId = $_POST['postId'];
        $action = $_POST['action'];
        $userId = $_SESSION['user_id'];

        // Processa a ação de "like" ou "unlike"
        if ($action === "like" || $action === "unlike") {
            // Verifica se a ação é válida
            if ($action === "like") {
                // Verifica se o usuário já curtiu esta postagem
                $stmt = $conn->prepare("SELECT * FROM curtidas WHERE id_usuario = ? AND id_postagem = ?");
                $stmt->bindParam(1, $userId);
                $stmt->bindParam(2, $postId);
                $stmt->execute();
                $result = $stmt->fetch(PDO::FETCH_ASSOC);

                if (!$result) {
                    // Adiciona um novo like
                    $stmt = $conn->prepare("INSERT INTO curtidas (id_usuario, id_postagem) VALUES (?, ?)");
                    $stmt->bindParam(1, $userId);
                    $stmt->bindParam(2, $postId);
                    $stmt->execute();

                    // Incrementa o número de curtidas na postagem
                    $stmt = $conn->prepare("UPDATE postagens SET curtidas = curtidas + 1 WHERE id = ?");
                    $stmt->bindParam(1, $postId);
                    $stmt->execute();

                    // Retorna o número atualizado de curtidas
                    $stmt = $conn->prepare("SELECT curtidas FROM postagens WHERE id = ?");
                    $stmt->bindParam(1, $postId);
                    $stmt->execute();
                    $result = $stmt->fetch(PDO::FETCH_ASSOC);
                    $newLikes = intval($result['curtidas']);

                    // Responde com sucesso e os novos likes
                    $response = array("success" => true, "likes" => $newLikes);
                    echo json_encode($response);
                    exit; // Termina o script após enviar a resposta JSON
                } else {
                    // O usuário já curtiu esta postagem
                    $response = array("success" => false, "message" => "Você já curtiu esta postagem.");
                    echo json_encode($response);
                    exit; // Termina o script após enviar a resposta JSON
                }
            } else { // Se a ação for "unlike"
                // Remove o like
                $stmt = $conn->prepare("DELETE FROM curtidas WHERE id_usuario = ? AND id_postagem = ?");
                $stmt->bindParam(1, $userId);
                $stmt->bindParam(2, $postId);
                $stmt->execute();

                // Decrementa o número de curtidas na postagem
                $stmt = $conn->prepare("UPDATE postagens SET curtidas = curtidas - 1 WHERE id = ?");
                $stmt->bindParam(1, $postId);
                $stmt->execute();

                // Retorna o número atualizado de curtidas
                $stmt = $conn->prepare("SELECT curtidas FROM postagens WHERE id = ?");
                $stmt->bindParam(1, $postId);
                $stmt->execute();
                $result = $stmt->fetch(PDO::FETCH_ASSOC);
                $newLikes = intval($result['curtidas']);

                // Responde com sucesso e os novos likes
                $response = array("success" => true, "likes" => $newLikes);
                echo json_encode($response);
                exit; // Termina o script após enviar a resposta JSON
            }
        } else {
            // Ação inválida
            $response = array("success" => false, "message" => "Ação inválida.");
            echo json_encode($response);
            exit; // Termina o script após enviar a resposta JSON
        }
    } else {
        // Parâmetros ausentes
        $response = array("success" => false, "message" => "Parâmetros ausentes.");
        echo json_encode($response);
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

// Obtém o número total de curtidas de todas as postagens
$stmt = $conn->prepare("SELECT SUM(curtidas) AS total_likes FROM postagens");
$stmt->execute();
$result = $stmt->fetch(PDO::FETCH_ASSOC);

if ($result) {
    $totalLikes = intval($result['total_likes']);
    // Responde com sucesso e o total de likes
    echo json_encode(array("success" => true, "likes" => $totalLikes));
} else {
    // Erro ao obter os likes
    echo json_encode(array("success" => false, "message" => "Erro ao obter os likes."));
}

?>
