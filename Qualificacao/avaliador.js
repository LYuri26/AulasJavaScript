// ==================================================
// avaliadorUnico.js — Versão 6.9 Profissional com Detecção Avançada de IA
// ==================================================
const fs = require("fs");
const path = require("path");

if (process.argv.length < 3) {
  console.log("Uso: node avaliadorUnico.js <arquivo_aluno.js>");
  process.exit(1);
}

const arquivoAluno = process.argv[2];
if (!fs.existsSync(arquivoAluno)) {
  console.log("Arquivo não encontrado:", arquivoAluno);
  process.exit(1);
}

console.log("📊 Avaliando:", arquivoAluno, "\n");

// ==================================================
// CRITÉRIOS (Total = 20 pontos)
// ==================================================
const criterios = [
  { nome: "Vetores", peso: 3 },
  { nome: "Variáveis", peso: 3 },
  { nome: "Funções", peso: 8 },
  { nome: "Comentários", peso: 2 },
  { nome: "Inserção e Funcionalidades", peso: 4 },
];

// ==================================================
// FUNÇÃO DE AVALIAÇÃO
// ==================================================
function avaliarCodigo(codigo) {
  const texto = codigo.toLowerCase().replace(/\s+/g, " ");
  let pontos = {};
  criterios.forEach((c) => (pontos[c.nome] = 0));

  let penalidade = 0;
  let motivosPenalidade = [];
  let alertasIA = [];

  // ==================================================
  // 1️⃣ Vetores
  // ==================================================
  const vetores = codigo.match(/\b(let|var|const)\s+\w+\s*=\s*\[.*?\]/g) || [];
  const usoVetores =
    codigo.match(/\w+\.(push|splice|pop|shift|unshift)\(/g) || [];

  if (vetores.length >= 6 && usoVetores.length >= 6) pontos["Vetores"] = 3;
  else if (vetores.length >= 3) pontos["Vetores"] = 2;
  else pontos["Vetores"] = 1;

  // ==================================================
  // 2️⃣ Variáveis
  // ==================================================
  const vars = codigo.match(/\b(let|var|const)\s+\w+\s*=/g) || [];
  const qtdVar = new Set(vars.map((v) => v.split(/\s+/)[1])).size;
  if (qtdVar >= 15) pontos["Variáveis"] = 3;
  else if (qtdVar >= 8) pontos["Variáveis"] = 2;
  else pontos["Variáveis"] = 1;

  // ==================================================
  // 3️⃣ Funções
  // ==================================================
  const funcoes = codigo.match(/function\s+\w+\s*\(/g) || [];
  const qtdFuncoes = funcoes.length;
  const semParametros = (codigo.match(/function\s+\w+\s*\(\s*\)/g) || [])
    .length;
  const repeticaoUI =
    (codigo.match(/alert\(/g) || []).length +
    (codigo.match(/prompt\(/g) || []).length;

  let pontFunc = 0;
  if (qtdFuncoes >= 9 && semParametros < 3) pontFunc = 8;
  else if (qtdFuncoes >= 7) pontFunc = 6;
  else if (qtdFuncoes >= 5) pontFunc = 4.5;
  else if (qtdFuncoes >= 3) pontFunc = 3;
  else pontFunc = 1.5;

  if (semParametros > qtdFuncoes * 0.6) pontFunc -= 0.8;
  if (repeticaoUI > 20) pontFunc -= 0.5;
  if (texto.includes("while (opcao") && texto.includes("switch"))
    pontFunc -= 1.2;
  if (pontFunc < 0) pontFunc = 0;
  pontos["Funções"] = pontFunc;

  // ==================================================
  // 4️⃣ Comentários
  // ==================================================
  const comentarios = (codigo.match(/\/\/|\/\*/g) || []).length;
  pontos["Comentários"] = comentarios >= 10 ? 2 : comentarios >= 5 ? 1 : 0;

  // ==================================================
  // 5️⃣ Inserção e Funcionalidades
  // ==================================================
  const entradaSaida = codigo.match(/\b(prompt|alert|console\.log)\(/g) || [];
  const loops = codigo.match(/\b(for|while)\s*\(/g) || [];
  const condicoes = codigo.match(/\b(if|switch)\s*\(/g) || [];

  let pontosFunc = 0;
  if (entradaSaida.length >= 8) pontosFunc += 1.5;
  if (loops.length >= 3) pontosFunc += 1.5;
  if (condicoes.length >= 3) pontosFunc += 1;
  pontos["Inserção e Funcionalidades"] = pontosFunc;

  // ==================================================
  // 6️⃣ COMPLETUDE E PENALIZAÇÕES
  // ==================================================
  const funcoesEsperadas = [
    "cadastrarInscrito",
    "cadastrarVideo",
    "registrarVisualizacao",
    "consultarRegistrosVisualizacoes",
    "atualizarInscrito",
    "removerInscrito",
    "consultarVideoPorCodigo",
    "consultarMaisPopular",
    "relatorioPorInscrito",
  ];

  const funcoesPresentes = funcoesEsperadas.filter((f) =>
    codigo.includes(`function ${f}`)
  ).length;
  const faltando = funcoesEsperadas.length - funcoesPresentes;

  if (faltando > 0) {
    penalidade += faltando * 0.8;
    motivosPenalidade.push(
      `Trabalho incompleto: ${faltando} função(ões) obrigatória(s) ausente(s).`
    );
  }

  // ==================================================
  // 7️⃣ DETECÇÃO AVANÇADA DE USO DE IA
  // ==================================================
  let scoreIA = 0;

  // Sintaxe moderna suspeita em contexto básico
  if (texto.includes("async function") || texto.includes("=>")) scoreIA += 1;
  if (texto.includes("export default") || texto.includes("import"))
    scoreIA += 1.5;

  // Estruturas de nomes genéricos demais
  const nomesGerais = (
    codigo.match(/\b(data|info|item|obj|array|result)\b/gi) || []
  ).length;
  if (nomesGerais >= 10) scoreIA += 1;

  // Comentários padronizados de IA
  if (
    texto.includes("this function") ||
    texto.includes("returns") ||
    texto.includes("parameters")
  )
    scoreIA += 1.2;

  // Padrão de formatação extremamente regular
  const linhas = codigo.split("\n");
  const identacoesUniformes =
    linhas.filter((l) => l.startsWith("  ")).length / linhas.length;
  if (identacoesUniformes > 0.8) scoreIA += 0.5;

  // IA detectada
  if (scoreIA >= 2) {
    penalidade += scoreIA;
    alertasIA.push(
      `Suspeita de uso de IA detectada (grau ${scoreIA.toFixed(1)}).`
    );
    motivosPenalidade.push(
      "Padrões de código indicam possível geração automatizada (uso de IA)."
    );
  }

  // ==================================================
  // SOMA FINAL
  // ==================================================
  let total = Object.values(pontos).reduce((a, b) => a + b, 0) - penalidade;
  if (total < 0) total = 0;
  if (total > 20) total = 20;

  // ==================================================
  // RELATÓRIO FINAL PROFISSIONAL
  // ==================================================
  const relatorio = [];
  relatorio.push(
    "=== RELATÓRIO DE AVALIAÇÃO TÉCNICA — MODO PROFISSIONAL ===\n"
  );
  relatorio.push("📄 Arquivo avaliado: " + arquivoAluno + "\n");

  relatorio.push("\n🔍 ANÁLISE TÉCNICA POR CRITÉRIO:");
  Object.entries(pontos).forEach(([k, v]) => {
    const peso = criterios.find((c) => c.nome === k)?.peso || 1;
    let nivel =
      v >= peso * 0.9
        ? "Excelente"
        : v >= peso * 0.6
        ? "Bom"
        : v >= peso * 0.3
        ? "Regular"
        : "Fraco";
    relatorio.push(` - ${k}: ${v.toFixed(1)} pts → ${nivel}`);
  });

  relatorio.push("\n⚠ PENALIZAÇÕES:");
  if (motivosPenalidade.length > 0) {
    motivosPenalidade.forEach((m) => relatorio.push(" - " + m));
    relatorio.push(`Total de penalizações: -${penalidade.toFixed(1)} pts`);
  } else relatorio.push(" - Nenhuma penalização detectada.");

  if (alertasIA.length > 0) {
    relatorio.push("\n🤖 ANÁLISE DE USO DE IA:");
    alertasIA.forEach((a) => relatorio.push(" - " + a));
  }

  relatorio.push("\n📊 SÍNTESE FINAL:");
  relatorio.push(
    ` - Nota Base: ${Object.values(pontos)
      .reduce((a, b) => a + b, 0)
      .toFixed(1)} pts`
  );
  relatorio.push(` - Penalizações: -${penalidade.toFixed(1)} pts`);
  relatorio.push(`\n⭐ TOTAL FINAL: ${total.toFixed(1)}/20 pts`);

  let classificacao =
    total >= 18
      ? "A — Excelência Técnica"
      : total >= 13
      ? "B — Bom Desempenho"
      : total >= 8
      ? "C — Regular / Precisa Evoluir"
      : "D — Insuficiente";

  relatorio.push(`🏅 Classificação: ${classificacao}`);

  relatorio.push("\n📈 CONCLUSÃO INTERPRETATIVA:");
  if (total >= 18)
    relatorio.push(
      "💯 Excelente domínio técnico e estrutura lógica consistente. O aluno demonstra autonomia real na escrita do código."
    );
  else if (total >= 13)
    relatorio.push(
      "👍 Bom desempenho. Código funcional e coerente, mas com margem para aperfeiçoamento técnico e refinamento lógico."
    );
  else if (total >= 8)
    relatorio.push(
      "⚠ Trabalho regular. Estruturas presentes, mas incompletas ou copiadas parcialmente. Necessário revisar práticas de autoria e modularização."
    );
  else
    relatorio.push(
      "❌ Desempenho insuficiente. O código apresenta falhas graves e indícios de produção automatizada ou incompreensão dos fundamentos."
    );

  if (alertasIA.length > 0) {
    relatorio.push("\n📎 RECOMENDAÇÕES ESPECÍFICAS:");
    relatorio.push(" - Reescrever trechos suspeitos com autoria comprovada.");
    relatorio.push(" - Comentar cada função explicando propósito e lógica.");
    relatorio.push(
      " - Evitar padrões de IA (async, arrow functions, nomenclaturas genéricas)."
    );
  }

  relatorio.push(
    "\n-----------------------------------------\nGerado automaticamente pelo Instrutor Lenon Yuri\nVersão 6.9 — Avaliação Profissional com Detecção Avançada de IA e Relatório Explicativo Completo\n"
  );

  return { total, feedback: relatorio.join("\n") };
}

// ==================================================
// EXECUÇÃO
// ==================================================
const codigo = fs.readFileSync(arquivoAluno, "utf-8");
const resultado = avaliarCodigo(codigo);

const nomeFeedback = path.basename(arquivoAluno, ".js") + "_feedback.txt";
fs.writeFileSync(nomeFeedback, resultado.feedback, "utf-8");

console.log(`✅ Avaliação concluída. Feedback salvo em: ${nomeFeedback}`);
