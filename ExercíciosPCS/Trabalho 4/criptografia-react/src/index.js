import ReactDOM from "react-dom"; // Importa a biblioteca ReactDOM do pacote react-dom, que é usada para renderizar componentes React em um ambiente de navegador.
import App from "./App"; // Importa o componente App do arquivo App.js, que será renderizado na página.

// Cria uma raiz de renderização usando ReactDOM.createRoot. Isso é uma parte da nova API de renderização introduzida no React 18.
// O método createRoot recebe como argumento o elemento DOM onde o aplicativo React será renderizado, identificado pelo ID "root".
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
// Renderiza o componente App dentro da raiz de renderização criada anteriormente usando o método render.
// O componente App será renderizado dentro do elemento DOM com o ID "root" no documento HTML.
// O operador JSX <App /> é usado para representar o componente App como um elemento React.
