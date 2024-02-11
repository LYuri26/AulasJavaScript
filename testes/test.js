const { JSDOM } = require('jsdom');
const axeCore = require('axe-core');

let expect;
import('chai').then(chai => {
  expect = chai.expect;

  // Carregar o HTML e o script
  const dom = new JSDOM(`<!DOCTYPE html><html><head></head><body>
    <div class="container">
      <h2>Contador: <span id="count">0</span></h2>
      <button id="incrementButton">Incrementar</button>
    </div>
    <script src="script.js"></script>
  </body></html>`);

  // Configurar o ambiente
  global.window = dom.window;
  global.document = dom.window.document;

  describe('Button Counter', () => {
    it('incrementa corretamente ao clicar no botão', () => {
      const incrementButton = document.getElementById('incrementButton');
      const countElement = document.getElementById('count');
      incrementButton.click();
      expect(countElement.textContent).to.equal('1');
    });

    it('é acessível', async () => {
      const result = await axeCore.run(document);
      expect(result.violations.length).to.equal(0);
    });
  });
});
