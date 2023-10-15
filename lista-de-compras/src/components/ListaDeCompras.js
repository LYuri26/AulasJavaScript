import React, { useState } from 'react';
import '../App.css'; 


const ListaDeCompras = () => {
  const [itens, setItens] = useState([]);
  const [novoItem, setNovoItem] = useState('');

  const adicionarItem = () => {
    if (novoItem.trim() !== '') {
      setItens([...itens, novoItem]);
      setNovoItem('');
    }
  };

  return (
    <div>
      <h2>Lista de Compras</h2>
      <ul>
        {itens.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <input
        type="text"
        value={novoItem}
        onChange={(e) => setNovoItem(e.target.value)}
      />
      <button onClick={adicionarItem}>Adicionar</button>
    </div>
  );
};

export default ListaDeCompras;
