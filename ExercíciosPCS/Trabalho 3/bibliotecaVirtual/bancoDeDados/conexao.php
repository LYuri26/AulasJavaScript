<?php

// Dados de conexão com o banco de dados
$host = 'localhost'; // Endereço do servidor MySQL (geralmente localhost)
$dbname = 'bibliotecaVirtualDB'; // Nome do banco de dados
$username = 'root'; // Nome de usuário do MySQL
$password = ''; // Senha do MySQL

try {
    // Conexão com o banco de dados usando PDO
    $conexao = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    
    // Define o modo de erro do PDO para exceções
    $conexao->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Define o charset para UTF-8 para garantir a compatibilidade com caracteres especiais
    $conexao->exec("SET NAMES utf8");
    
    // Mensagem de sucesso
    //echo "Conexão com o banco de dados estabelecida com sucesso.";
} catch (PDOException $e) {
    // Em caso de erro na conexão, exibe a mensagem de erro
    die("Erro na conexão com o banco de dados: " . $e->getMessage());
}

?>
