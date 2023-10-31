<?php
// Criar um script php para inserir dados no banco de mysql 
// Tabela: usuarios
// Campos: id, nome, pontuacao, posicao

// 1 - Conectar no banco de dados - DONE
// 2 - Criar uma query para inserir dados - WORKING...
// 3 - Executar a query - WORKING...
// 999 - Fechar a conexão - WORKING...

// 1 - Conectar no banco de dados
    try {
        $pdo = new PDO('mysql:host=localhost;dbname=biblioteca', 'root', '');
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch (PDOException $e) {
        echo 'Error: ' . $e->getMessage();
        die();
    }
    
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $botaoResposta = $_POST['botaoResposta'];
    $stmt->bindValue(':botaoResposta', $botaoResposta);
    // 2 - Criar uma query para inserir dados
    $stmt = $pdo->prepare('INSERT INTO jogadores VALUES (null, João, botaoResposta, 1)');

    // 3 - Executar a query
    $stmt->execute();
    $stmt->setFetchMode(PDO::FETCH_ASSOC);

    // 5 - Redirecionar para a página de listagem de usuários
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $stmt = $pdo->prepare('SELECT * FROM jogadores');
    $stmt->execute();
    $stmt->setFetchMode(PDO::FETCH_ASSOC);
    }
// 999 - Fechar a conexão
$pdo = null;
?>