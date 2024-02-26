<?php
// Configurações do banco de dados
$host = "localhost"; // Host do MySQL
$username = "root"; // Nome de usuário do MySQL
$password = ""; // Senha do MySQL
$database = "fullstackfotos"; // Nome do banco de dados

try {
    // Conexão com o banco de dados usando PDO
    $conn = new PDO("mysql:host=$host;dbname=$database", $username, $password);
    
    // Configurar o modo de erro do PDO para exceções
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Exibe mensagem de sucesso
    // echo "<script>console.log('Conexão bem-sucedida ao banco de dados!');</script>";
    
    // Exibindo informações sobre a versão do MySQL
    // $stmt = $conn->query('SELECT version()');
    // $row = $stmt->fetch();
    // echo "<script>console.log('Versão do MySQL: " . $row[0] . "');</script>";
} catch(PDOException $e) {
    // Exibe mensagem de erro caso ocorra um problema na conexão
    echo "<script>console.error('Erro de conexão: " . $e->getMessage() . "');</script>";
    exit(); // Encerra o script se houver erro de conexão
}
?>
