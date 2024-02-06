import React, { useState, useEffect } from 'react';

const UseEffectComponent = () => {
  // Define um estado para armazenar a hora atual
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  // Utiliza o useEffect para atualizar a hora a cada segundo
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    // Retorna uma função de limpeza para parar o intervalo quando o componente for desmontado
    return () => clearInterval(interval);
  }, []); // Passa um array vazio para garantir que o efeito seja executado apenas uma vez

  return (
    <div>
      <h2>Exemplo de useEffect</h2>
      <p>A hora atual é: {time}</p>
    </div>
  );
};

export default UseEffectComponent;
