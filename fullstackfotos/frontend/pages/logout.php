<?php
// Iniciar a sessão se ainda não estiver iniciada
session_start();

// Encerrar a sessão
session_unset();
session_destroy();

// Redirecionar para a página inicial
header("Location: ./inicio.php");
exit;
?>
