import React, { useState } from "react";

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [newItemText, setNewItemText] = useState("");

  const handleAddItem = () => {
    if (newItemText.trim() !== "") {
      setItems([...items, newItemText]);
      setNewItemText("");
    }
  };

  return (
    <div>
      <h1>Lista de Itens</h1>
      <ul>
        {items.map((item, index) => (  
          <li key={item}>{item}</li>  
        ))}
      </ul>
      <input
        type="text"
        placeholder="Digite o nome do item" 
        value={newItemText}
        onChange={(e) => setNewItemText(e.target.value)}
      />
      <button onClick={handleAddItem}>Adicionar Item</button>
    </div>
  );
};

export default ItemList;
