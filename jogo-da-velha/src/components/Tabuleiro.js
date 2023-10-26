import React, { useState, useEffect } from 'react';
import Quadrado from './Quadrado';

function Tabuleiro() {
    const [quadrados, setQuadrados] = useState(Array(9).fill(null));
    const [xVez, setXVez] = useState(true);
    const [vencedor, setVencedor] = useState(null);
    const [vitoriasX, setVitoriasX] = useState(0);
    const [vitoriasO, setVitoriasO] = useState(0);
    const [jogador, setJogador] = useState('X');
    const [jogarContraIA, setJogarContraIA] = useState(true);

    useEffect(() => {
        if (jogarContraIA && !xVez) {
            setTimeout(() => {
                jogadaIA();
            }, 1000);
        }
    }, [xVez, jogarContraIA]);

    const fazerJogada = (i) => {
        if (vencedor || quadrados[i]) {
            return;
        }
        const novosQuadrados = quadrados.slice();
        novosQuadrados[i] = xVez ? 'X' : 'O';
        setQuadrados(novosQuadrados);
        setXVez(!xVez);
        setJogador(xVez ? 'O' : 'X');
        const novoVencedor = verificarVencedor(novosQuadrados);
        if (novoVencedor) {
            if (novoVencedor === 'X') {
                setVitoriasX(vitoriasX + 1);
            } else if (novoVencedor === 'O') {
                setVitoriasO(vitoriasO + 1);
            }
        }
        setVencedor(novoVencedor);
    }

    const jogadaIA = () => {
        const quadradosVazios = quadrados.map((quadrado, index) => quadrado === null ? index : null).filter(index => index !== null);

        for (let i = 0; i < quadradosVazios.length; i++) {
            const quadradosTeste = quadrados.slice();
            quadradosTeste[quadradosVazios[i]] = 'O';
            if (verificarVencedor(quadradosTeste) === 'O') {
                fazerJogada(quadradosVazios[i]);
                return;
            }
        }

        for (let i = 0; i < quadradosVazios.length; i++) {
            const quadradosTeste = quadrados.slice();
            quadradosTeste[quadradosVazios[i]] = 'X';
            if (verificarVencedor(quadradosTeste) === 'X') {
                fazerJogada(quadradosVazios[i]);
                return;
            }
        }

        const indiceAleatorio = Math.floor(Math.random() * quadradosVazios.length);
        fazerJogada(quadradosVazios[indiceAleatorio]);
    }

    const reiniciarJogo = () => {
        setQuadrados(Array(9).fill(null));
        setXVez(true);
        setVencedor(null);
    }

    const renderizarQuadrado = (i) => {
        return <Quadrado valor={quadrados[i]} onClick={() => fazerJogada(i)} />;
    }

    let status;
    if (vencedor) {
        status = 'Vencedor: ' + vencedor;
    } else if (quadrados.every(quadrado => quadrado)) {
        status = 'Empate!';
    } else {
        status = 'Próximo jogador: ' + jogador;
    }

    return (
        <div>
            <div className="status">{status}</div>
            <div className="board-row">
                {renderizarQuadrado(0)}
                {renderizarQuadrado(1)}
                {renderizarQuadrado(2)}
            </div>
            <div className="board-row">
                {renderizarQuadrado(3)}
                {renderizarQuadrado(4)}
                {renderizarQuadrado(5)}
            </div>
            <div className="board-row">
                {renderizarQuadrado(6)}
                {renderizarQuadrado(7)}
                {renderizarQuadrado(8)}
            </div>
            <button className="button" onClick={reiniciarJogo}>Reiniciar</button>
            <div className="vitorias">
                <p>Vitórias de X: {vitoriasX}</p>
                <p>Vitórias de O: {vitoriasO}</p>
            </div>
            <div className="escolher-jogador">
                <label>
                    Escolha o jogador (X ou O):
                    <select
                        value={jogador}
                        onChange={(e) => setJogador(e.target.value)}
                    >
                        <option value="X">X</option>
                        <option value="O">O</option>
                    </select>
                </label>
            </div>
            <div className="jogar-contra-ia">
                <label>
                    Jogar contra a IA?
                    <input
                        type="checkbox"
                        checked={jogarContraIA}
                        onChange={() => setJogarContraIA(!jogarContraIA)}
                    />
                </label>
            </div>
        </div>
    );
}

export default Tabuleiro;

function verificarVencedor(quadrados) {
    const linhas = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < linhas.length; i++) {
        const [a, b, c] = linhas[i];
        if (quadrados[a] && quadrados[a] === quadrados[b] && quadrados[a] === quadrados[c]) {
            return quadrados[a];
        }
    }
    return null;
}
