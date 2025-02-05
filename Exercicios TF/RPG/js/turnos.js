// Controle de turno
let turno = 1;

function alternarTurno() {
  if (turno === 1) {
    document.getElementById("player1").classList.remove("disabled");
    document.getElementById("player2").classList.add("disabled");
    turno = 2;
  } else {
    document.getElementById("player1").classList.add("disabled");
    document.getElementById("player2").classList.remove("disabled");
    turno = 1;
  }
}

// Simulação de troca de turno a cada 5 segundos
setInterval(alternarTurno, 5000);
