class CalculadoraModelo {
  // O construtor é executado quando uma nova instância da classe é criada.
  constructor() {
    // Método privado para inicializar os atributos da calculadora.
    this._limpar();
  }

  // Método privado para limpar os valores dos operandos e operação.
  _limpar() {
    this._operandoAtual = ""; // Inicializa o operando atual como uma string vazia.
    this._operandoAnterior = ""; // Inicializa o operando anterior como uma string vazia.
    this._operacao = undefined; // Inicializa a operação como indefinida.
  }

  // Método para adicionar um número ao operando atual.
  adicionarNumero(numero) {
    // Verifica se o número é um ponto decimal e se o operando atual já contém um ponto decimal.
    // Se sim, retorna sem adicionar o ponto decimal novamente.
    if (numero === "." && this._operandoAtual.includes(".")) return;
    // Concatena o número convertido para string ao operando atual.
    this._operandoAtual += numero.toString();
  }

  // Método para escolher a operação a ser realizada.
  escolherOperacao(operacao) {
    // Verifica se o operando atual está vazio, se sim, retorna sem realizar nenhuma operação.
    if (this._operandoAtual === "") return;
    // Verifica se há um operando anterior, se sim, realiza o cálculo antes de escolher a nova operação.
    if (this._operandoAnterior !== "") {
      this._calcular();
    }
    // Atribui a operação escolhida ao atributo _operacao.
    this._operacao = operacao;
    // Atribui o valor atual do operando ao operando anterior e limpa o operando atual para começar uma nova entrada.
    this._operandoAnterior = this._operandoAtual;
    this._operandoAtual = "";
  }

  // Método privado para realizar o cálculo com os operandos e a operação escolhida.
  _calcular() {
    let resultado; // Variável para armazenar o resultado do cálculo.
    const anterior = parseFloat(this._operandoAnterior); // Converte o operando anterior para um número de ponto flutuante.
    const atual = parseFloat(this._operandoAtual); // Converte o operando atual para um número de ponto flutuante.
    // Verifica se algum dos operandos não é um número válido, se sim, retorna sem realizar o cálculo.
    if (isNaN(anterior) || isNaN(atual)) return;
    // Realiza a operação de acordo com a operação escolhida.
    switch (this._operacao) {
      case "+":
        resultado = anterior + atual;
        break;
      case "-":
        resultado = anterior - atual;
        break;
      case "*":
        resultado = anterior * atual;
        break;
      case "/":
        resultado = anterior / atual;
        break;
      default:
        return;
    }
    // Atribui o resultado ao operando atual e limpa os operandos e a operação.
    this._operandoAtual = resultado;
    this._operacao = undefined;
    this._operandoAnterior = "";
  }

  // Método para obter o resultado formatado como string.
  getResultado() {
    // Converte o operando atual para um número de ponto flutuante.
    const numeroFlutuante = parseFloat(this._operandoAtual);
    // Verifica se o número flutuante é um valor numérico válido, se não for, retorna uma string vazia.
    if (isNaN(numeroFlutuante)) return "";
    // Formata o número flutuante como string usando a formatação de número local para o Brasil (pt-BR) e retorna.
    return numeroFlutuante.toLocaleString("pt-BR");
  }
}
