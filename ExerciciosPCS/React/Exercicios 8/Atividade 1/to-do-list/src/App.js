// App.js

import React from "react";
import "./App.css"; // Importando estilos opcionais
import TodoList from "./TodoList"; // Importando o componente TodoList

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Todo List</h1>
      </header>
      <main>
        <TodoList /> {/* Renderizando o componente TodoList */}
      </main>
    </div>
  );
}

export default App;
