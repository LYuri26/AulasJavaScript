import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [carros, setCarros] = useState([]);
  const [modelo, setModelo] = useState('');
  const [marca, setMarca] = useState('');
  const [ano, setAno] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/carros')
      .then(response => setCarros(response.data))
      .catch(error => console.error('Erro ao buscar carros:', error));
  }, []);

  const cadastrarCarro = () => {
    axios.post('http://localhost:3001/carros', { modelo, marca, ano })
      .then(() => {
        setModelo('');
        setMarca('');
        setAno('');
        alert('Carro cadastrado com sucesso');
      })
      .catch(error => console.error('Erro ao cadastrar carro:', error));
  };

  return (
    <div>
      <h1>Cadastro de Carros</h1>
      <div>
        <input type="text" placeholder="Modelo" value={modelo} onChange={e => setModelo(e.target.value)} />
        <input type="text" placeholder="Marca" value={marca} onChange={e => setMarca(e.target.value)} />
        <input type="text" placeholder="Ano" value={ano} onChange={e => setAno(e.target.value)} />
        <button onClick={cadastrarCarro}>Cadastrar</button>
      </div>
      <h2>Lista de Carros</h2>
      <ul>
        {carros.map(carro => (
          <li key={carro.id}>{carro.modelo} - {carro.marca} ({carro.ano})</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
