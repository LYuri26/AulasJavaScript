<?php
class CalculadoraModel
{

    public function somar($num1, $num2)
    {
        return $num1 + $num2;
    }

    public function subtrair($num1, $num2)
    {
        return $num1 - $num2;
    }

    public function multiplicar($num1, $num2)
    {
        return $num1 * $num2;
    }

    public function dividir($num1, $num2)
    {
        if ($num2 == 0) {
            return 'Erro: Divisão por zero';
        }
        return $num1 / $num2;
    }
}