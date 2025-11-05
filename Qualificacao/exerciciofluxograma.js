let mesas = false;
let pagamento = false;

while (mesas === false && pagamento === false) {
  if (mesas === false) {
    console.log("Mesa indisponivel");
    mesas = true; // Simulando que a mesa foi encontrada
  }
  if (mesas === true) {
    console.log("Mesa Encontrada");
  }
  if (pagamento === false) {
    console.log("Alterar pagamento");
    pagamento = true; // Simulando que o pagamento foi realizado
  }
  if (pagamento === true) {
    console.log("Pagamento realizado");
  }
}

if (mesas === true && pagamento === true) {
  console.log("Fazer pedido");
}

return 0;
