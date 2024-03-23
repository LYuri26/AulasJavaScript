<?php
// Configurações do banco de dados
$host = 'localhost'; // Host do banco de dados (geralmente localhost)
$dbname = 'restdb'; // Nome do banco de dados
$username = 'root'; // Nome de usuário do banco de dados
$password = ''; // Senha do banco de dados (deixe vazio se não tiver senha)

try {
    // Conexão com o banco de dados utilizando PDO
    $pdo = new PDO("mysql:host=$host", $username, $password);

    // Configura o PDO para lançar exceções em caso de erros
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Verificar se o banco de dados já existe
    $stmt = $pdo->query("SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = '$dbname'");
    $databaseExists = $stmt->fetchColumn();

    // Se o banco de dados não existir, executa o script.sql
    if (!$databaseExists) {
        // Ler e executar o script.sql apenas uma vez
        $scriptFile = 'script.sql';
        if (file_exists($scriptFile)) {
            $scriptContent = file_get_contents($scriptFile);
            $pdo->exec($scriptContent);
            //echo "Script SQL executado com sucesso.";
        } else {
            die("Erro: O arquivo $scriptFile não foi encontrado.");
        }
    }

    // Conexão com o banco de dados especificado
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);

    // Configura o charset para UTF-8
    $pdo->exec("set names utf8");

    // Mensagem de sucesso
    //echo "Conexão com o banco de dados estabelecida com sucesso.";
} catch (PDOException $e) {
    // Em caso de erro, exibe a mensagem de erro
    die("Erro ao conectar ao banco de dados: " . $e->getMessage());
}
?>
