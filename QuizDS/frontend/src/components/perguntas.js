const perguntas = ([        {
    pergunta: "Qual é a capital da França?", // Define a primeira pergunta
    opcoes: [ // Define as opções para a primeira pergunta
      { texto: "Nova York", valor: 0 },
      { texto: "Londres", valor: 0 },
      { texto: "Paris", valor: 10 }, // A resposta correta tem um valor de 10
      { texto: "Roma", valor: 0 },
    ],
},
{
    pergunta: "Qual é a capital da Alemanha?", // Define a segunda pergunta
    opcoes: [ // Define as opções para a segunda pergunta
      { texto: "Madrid", valor: 0 },
      { texto: "Berlim", valor: 10 }, // A resposta correta tem um valor de 10
      { texto: "Lisboa", valor: 0 },
      { texto: "Viena", valor: 0 },
    ],
  },
  {
    pergunta: "Qual é a capital do Brasil?", // Define a terceira pergunta
    opcoes: [ // Define as opções para a terceira pergunta
      { texto: "Pequim", valor: 0 },
      { texto: "Barcelona", valor: 0 }, // A resposta correta tem um valor de 10
      { texto: "Sevilha", valor: 0 },
      { texto: "Brasília", valor: 10 },
    ],
  },
  {
    pergunta: "Que dia será ensinado programação no curso SENAI DS?", // Define a quarta pergunta
    opcoes: [ // Define as opções para a quarta pergunta
      { texto: "Segunda", valor: 0 },
      { texto: "Terça", valor: 0 },
      { texto: "Nunca", valor: 10 }, // A resposta correta tem um valor de 10
      { texto: "Quinta", valor: 0 },
    ],
  },
  {
    pergunta: "Qual placa de vídeo devo comprar?", // Define a quinta pergunta
    opcoes: [ // Define as opções para a quinta pergunta
      { texto: "rtx 4080", valor: 0 },
      { texto: "rtx 4090", valor: 0 }, 
      { texto: "rtx 3060", valor: 0 },
      { texto: "rx 6600", valor: 10 }, // A resposta correta tem um valor de 10
    ],
  },
  {
  pergunta: "quando sera aberto o site REDFRIENDS.COM?", // Define a sexta pergunta
    opcoes: [ // Define as opções para a quarta pergunta
      { texto: "Segunda", valor: 0 },
      { texto: "Terça", valor: 0 },
      { texto: "Quarta", valor: 10 }, // A resposta correta tem um valor de 10
      { texto: "Quinta", valor: 0 },
    ],
  },
]);

export default perguntas;