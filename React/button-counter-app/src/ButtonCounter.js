// src/components/ButtonCounter.js
import React, { useState } from 'react';

const ButtonCounter = () => {
  const [count, setCount] = useState(0);

  const incrementCounter = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <button onClick={incrementCounter}>Clique para contar</button>
      <p>Você clicou {count} vezes</p>
    </div>
  );
};

export default ButtonCounter;
