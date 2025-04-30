<?php
include_once '../model/CalculadoraModel.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $numero1 = $_POST['numero1'];
    $numero2 = $_POST['numero2'];
    $operacao = $_POST['operacao'];

    $calculadora = new CalculadoraModel();

    switch ($operacao) {
        case 'somar':
            $resultado = $calculadora->somar($numero1, $numero2);
            break;
        case 'subtrair':
            $resultado = $calculadora->subtrair($numero1, $numero2);
            break;
        case 'multiplicar':
            $resultado = $calculadora->multiplicar($numero1, $numero2);
            break;
        case 'dividir':
            $resultado = $calculadora->dividir($numero1, $numero2);
            break;
        default:
            $resultado = 'Operação inválida';
            break;
    }

    header("Location: ../view/index.php?resultado=" . urlencode($resultado));
}