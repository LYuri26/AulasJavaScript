import { multiplicarMatrizes, transformarTextoEmMatriz} from './matriz';

// Função para criptografar o texto
export function criptografar(chave1, chave2, chave3, chave4, texto) {
  // Cria a matriz chave a partir dos quatro números fornecidos
  const matrizChave = [
    [chave1, chave2],
    [chave3, chave4],
  ];

  // Transforma o texto em uma matriz usando a tabela de caracteres
  const matrizTexto = transformarTextoEmMatriz(texto);

  // Multiplica a matriz chave pela matriz do texto para criptografar o texto
  const matrizCriptografada = multiplicarMatrizes(matrizChave, matrizTexto);

  // Retorna a matriz criptografada
  return matrizCriptografada;
}
