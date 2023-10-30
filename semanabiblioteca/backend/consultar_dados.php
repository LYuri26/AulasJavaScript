<?php
include 'conexao.php'; // Incluindo o arquivo de conexão

// Consulta SQL para obter os dados dos jogadores
$sql = "SELECT * FROM jogadores";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Se houver resultados, converte os dados em um array associativo
    $dados = array();
    while($row = $result->fetch_assoc()) {
        $dados[] = $row;
    }
    // Retorna os dados como JSON
    echo json_encode($dados);
} else {
    echo "Nenhum jogador encontrado";
}

$conn->close();

?>
