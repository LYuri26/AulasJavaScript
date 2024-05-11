class CalculadoraControle {
  // O construtor é executado quando uma nova instância da classe é criada.
  constructor(modelo, visualizacao) {
    // Atribui o modelo e a visualização recebidos como argumentos aos atributos _modelo e _visualizacao, respectivamente.
    this._modelo = modelo;
    this._visualizacao = visualizacao;

    // Vincula o método _manipularCliqueBotao como manipulador de evento de clique aos botões da calculadora na visualização.
    // Usando bind(this), garante que dentro de _manipularCliqueBotao, "this" se refere à instância atual de CalculadoraControle.
    this._visualizacao.vincularCliqueBotao(
      this._manipularCliqueBotao.bind(this)
    );

    // Chama o método _atualizarTela para atualizar a tela da calculadora com o resultado inicial.
    this._atualizarTela();
  }

  // Método privado para manipular o clique em um botão da calculadora.
  _manipularCliqueBotao(valor) {
    // Verifica qual botão foi clicado com base no valor passado como argumento.
    if (valor === "C") {
      // Se o botão 'C' foi clicado, chama o método _limpar do modelo para limpar a calculadora.
      this._modelo._limpar();
    } else if (valor === "=") {
      // Se o botão '=' foi clicado, chama o método _calcular do modelo para realizar o cálculo.
      this._modelo._calcular();
    } else if (["+", "-", "*", "/"].includes(valor)) {
      // Se o botão clicado for um operador, chama o método escolherOperacao do modelo com o operador clicado como argumento.
      this._modelo.escolherOperacao(valor);
    } else {
      // Se o botão clicado for um número, chama o método adicionarNumero do modelo com o número clicado como argumento.
      this._modelo.adicionarNumero(valor);
    }
    // Após manipular o clique do botão, chama o método _atualizarTela para atualizar a tela com o resultado atualizado.
    this._atualizarTela();
  }

  // Método privado para atualizar a tela da calculadora com o resultado do modelo.
  _atualizarTela() {
    // Chama o método atualizarTela da visualização com o resultado obtido do modelo.
    this._visualizacao.atualizarTela(this._modelo.getResultado());
  }
}

// Instancia um novo objeto CalculadoraModelo e atribui à variável modelo.
const modelo = new CalculadoraModelo();
// Instancia um novo objeto CalculadoraVisualizacao e atribui à variável visualizacao.
const visualizacao = new CalculadoraVisualizacao();
// Instancia um novo objeto CalculadoraControle, passando modelo e visualizacao como argumentos.
const controle = new CalculadoraControle(modelo, visualizacao);
