import React from 'react';
import './App.css';
import Tabuleiro from './components/Tabuleiro';
import logo from './assets/Senai.png';

function App() {
  return (
    <div data-testid="app-component">
      <div className="App">
        <header className="App-header">
          <img src={logo} alt="Logo SENAI" className="logo-senai" />
          <h1>Jogo da Velha</h1>
        </header>
        <Tabuleiro />
        <footer className="App-footer">
          Jogo desenvolvido pelo curso de Desenvolvimento de Sistemas.<br />
          Instrutor: Lenon Yuri
        </footer>
      </div>
    </div >
  );
}

export default App;
