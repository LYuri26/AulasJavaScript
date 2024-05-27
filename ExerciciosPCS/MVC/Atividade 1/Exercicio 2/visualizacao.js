class CalculadoraVisualizacao {
  // O construtor é executado quando uma nova instância da classe é criada.
  constructor() {
    // Atribui o elemento HTML com o id 'tela' à variável this._tela.
    this._tela = document.getElementById("tela");
    // Atribui uma lista de todos os elementos <button> dentro de um elemento com a classe 'botoes' à variável this._botoes.
    this._botoes = document.querySelectorAll(".botoes button");
  }

  // Método para atualizar o conteúdo da tela da calculadora.
  atualizarTela(valor) {
    // Define o valor do atributo 'value' do elemento HTML da tela para o valor passado como parâmetro.
    this._tela.value = valor;
  }

  // Método para vincular um manipulador de evento de clique a todos os botões da calculadora.
  vincularCliqueBotao(handler) {
    // Itera sobre todos os botões da calculadora.
    this._botoes.forEach((botao) => {
      // Adiciona um ouvinte de evento de clique a cada botão.
      botao.addEventListener("click", () => {
        // Quando o botão é clicado, o manipulador de evento passado como parâmetro é chamado com o valor do botão como argumento.
        handler(botao.value);
      });
    });
  }
}
