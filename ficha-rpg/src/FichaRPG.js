import React, { useState } from "react";
import "./App.css";

function FichaRPG() {
  const [raca, setRaca] = useState("");
  const [classe, setClasse] = useState("");
  const [habilidades, setHabilidades] = useState("");
  const [pontos, setPontos] = useState(0);
  const [pericias, setPericias] = useState("");
  const [especializacoes, setEspecializacoes] = useState("");
  const [detalhes, setDetalhes] = useState("");

  const [d20, setD20] = useState(null);
  const [d4, setD4] = useState(null);
  const [d6, setD6] = useState(null);
  const [d12, setD12] = useState(null);
  const [d10, setD10] = useState(null);

  const gerarDados = () => {
    setD20(Math.floor(Math.random() * 20) + 1);
    setD4(Math.floor(Math.random() * 4) + 1);
    setD6(Math.floor(Math.random() * 6) + 1);
    setD12(Math.floor(Math.random() * 12) + 1);
    setD10(Math.floor(Math.random() * 10) + 1);
  };

  return (
    <div className="FichaRPG">
      <h2>Ficha de Personagem</h2>
      <div>
        <label className="label">Raça:</label>
        <input
          className="inputField"
          type="text"
          value={raca}
          onChange={(e) => setRaca(e.target.value)}
        />
      </div>
      <div>
        <label className="label">Classe:</label>
        <input
          className="inputField"
          type="text"
          value={classe}
          onChange={(e) => setClasse(e.target.value)}
        />
      </div>
      <div>
        <label className="label">Habilidades:</label>
        <input
          className="inputField"
          type="text"
          value={habilidades}
          onChange={(e) => setHabilidades(e.target.value)}
        />
      </div>
      <div>
        <label className="label">Pontos:</label>
        <input
          className="inputField"
          type="number"
          value={pontos}
          onChange={(e) => setPontos(e.target.value)}
        />
      </div>
      <div>
        <label className="label">Perícias:</label>
        <input
          className="inputField"
          type="text"
          value={pericias}
          onChange={(e) => setPericias(e.target.value)}
        />
      </div>
      <div>
        <label className="label">Especializações:</label>
        <input
          className="inputField"
          type="text"
          value={especializacoes}
          onChange={(e) => setEspecializacoes(e.target.value)}
        />
      </div>
      <div>
        <label className="label">Detalhes Finais:</label>
        <input
          className="inputField"
          type="text"
          value={detalhes}
          onChange={(e) => setDetalhes(e.target.value)}
        />
      </div>
      <button className="button" onClick={gerarDados}>
        Gerar Dados
      </button>
      <div>
        <p>D20: {d20}</p>
        <p>D4: {d4}</p>
        <p>D6: {d6}</p>
        <p>D12: {d12}</p>
        <p>D10: {d10}</p>
      </div>
    </div>
  );
}

export default FichaRPG;
