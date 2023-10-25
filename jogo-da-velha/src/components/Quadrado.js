import React from 'react';

function Quadrado({ valor, onClick }) {
    return (
      <button className={`quadrado ${valor}`} onClick={onClick}>
        {valor}
      </button>
    );
  }
export default Quadrado;