// ==================================================
// avaliadorVendasOficial_v4.js — Avaliador Técnico de Lógica Estruturada
// Node.js v18+
// Uso: node avaliadorVendasOficial_v4.js <arquivo_aluno.js>
// ==================================================

const fs = require("fs");
const path = require("path");

// ==============================
// Validação CLI
// ==============================
if (process.argv.length < 3) {
  console.log("Uso: node avaliadorVendasOficial_v4.js <arquivo_aluno.js>");
  process.exit(1);
}

const arquivoAluno = process.argv[2];
if (!fs.existsSync(arquivoAluno)) {
  console.log("Arquivo não encontrado:", arquivoAluno);
  process.exit(1);
}

// ==================================================
// CRITÉRIOS DE AVALIAÇÃO — TOTAL 80 PONTOS
// ==================================================
const criterios = [
  { nome: "Uso de variáveis (var)", peso: 10 },
  { nome: "Uso de funções", peso: 10 },
  { nome: "Comentário da atividade", peso: 10 },
  { nome: "Uso de switch", peso: 10 },
  { nome: "Uso de vetores (arrays)", peso: 10 },
  { nome: "Uso de if/else", peso: 10 },
  { nome: "Uso de for", peso: 10 },
  { nome: "Uso de while", peso: 10 },
];

// ==================================================
// FUNÇÃO DE AVALIAÇÃO
// ==================================================
function avaliarCodigo(codigo) {
  let pontos = {};
  let feedback = [];
  criterios.forEach((c) => (pontos[c.nome] = 0));

  // --- 1. Variáveis ---
  const vars = codigo.match(/\bvar\s+\w+/g) || [];
  pontos["Uso de variáveis (var)"] =
    vars.length >= 8 ? 10 : (vars.length / 8) * 10;
  feedback.push(
    `✔ Variáveis declaradas: ${vars.length} (${pontos[
      "Uso de variáveis (var)"
    ].toFixed(1)} pts)`
  );

  // --- 2. Funções ---
  const funcoes = codigo.match(/function\s+\w+\s*\(/g) || [];
  pontos["Uso de funções"] =
    funcoes.length >= 5 ? 10 : (funcoes.length / 5) * 10;
  feedback.push(
    `✔ Funções detectadas: ${funcoes.length} (${pontos[
      "Uso de funções"
    ].toFixed(1)} pts)`
  );

  // --- 3. Comentários ---
  const comentarios =
    (codigo.match(/\/\//g) || []).length +
    (codigo.match(/\/\*[\s\S]*?\*\//g) || []).length;
  if (comentarios === 0) {
    pontos["Comentário da atividade"] = 0;
    feedback.push("✖ Nenhum comentário encontrado (0 pts)");
  } else if (comentarios > 40) {
    pontos["Comentário da atividade"] = 5; // Excesso suspeito (IA)
    feedback.push(
      `⚠ Comentários excessivos (${comentarios}) — padrão IA suspeito (5 pts)`
    );
  } else {
    pontos["Comentário da atividade"] =
      comentarios >= 8 ? 10 : (comentarios / 8) * 10;
    feedback.push(
      `✔ Comentários encontrados: ${comentarios} (${pontos[
        "Comentário da atividade"
      ].toFixed(1)} pts)`
    );
  }

  // --- 4. Switch ---
  pontos["Uso de switch"] = /\bswitch\s*\(.*\)/.test(codigo) ? 10 : 0;
  feedback.push(
    pontos["Uso de switch"]
      ? "✔ Estrutura switch detectada"
      : "✖ Nenhum switch encontrado (0 pts)"
  );

  // --- 5. Vetores ---
  const arrays = codigo.match(/\[\s*\]/g) || [];
  pontos["Uso de vetores (arrays)"] =
    arrays.length >= 4 ? 10 : (arrays.length / 4) * 10;
  feedback.push(
    `✔ Vetores detectados: ${arrays.length} (${pontos[
      "Uso de vetores (arrays)"
    ].toFixed(1)} pts)`
  );

  // --- 6. If/Else (independentes) ---
  const ifs = (codigo.match(/\bif\s*\(/g) || []).length;
  const elses = (codigo.match(/\belse\b/g) || []).length;
  pontos["Uso de if/else"] = Math.min((ifs + elses) * 5, 10);
  feedback.push(
    `✔ Estruturas condicionais detectadas: if(${ifs}) else(${elses}) → ${pontos[
      "Uso de if/else"
    ].toFixed(1)} pts`
  );

  // --- 7. For ---
  const fors = (codigo.match(/\bfor\s*\(/g) || []).length;
  pontos["Uso de for"] = fors > 0 ? 10 : 0;
  feedback.push(
    fors > 0 ? "✔ Estrutura for detectada" : "✖ Nenhum for encontrado (0 pts)"
  );

  // --- 8. While ---
  const whiles = (codigo.match(/\bwhile\s*\(/g) || []).length;
  pontos["Uso de while"] = whiles > 0 ? 10 : 0;
  feedback.push(
    whiles > 0
      ? "✔ Estrutura while detectada"
      : "✖ Nenhum while encontrado (0 pts)"
  );

  // ==================================================
  // TESTES DE EXECUÇÃO (inserção/recuperação de dados)
  // ==================================================
  const entrada = /(prompt\s*\(|push\s*\(|parseInt\s*\(|parseFloat\s*\()/g;
  const saida = /(alert\s*\(|splice\s*\(|console\.log\s*\()/g;
  const entradas = (codigo.match(entrada) || []).length;
  const saidas = (codigo.match(saida) || []).length;

  if (entradas > 0 && saidas > 0) {
    feedback.push("✔ Teste simulado: inserção e exibição de dados detectadas");
  } else if (entradas > 0 || saidas > 0) {
    feedback.push(
      "⚠ Teste parcial: detectado apenas inserção ou exibição de dados"
    );
    for (let k in pontos) pontos[k] *= 0.9;
  } else {
    feedback.push(
      "✖ Nenhuma simulação de entrada/saída detectada → penalização -15%"
    );
    for (let k in pontos) pontos[k] *= 0.85;
  }

  // ==================================================
  // DETECÇÃO DE USO DE IA OU CÓDIGO FORA DO ESCOPO
  // ==================================================
  const proibidos = [
    { regex: /=>/, desc: "Arrow functions (não ensinadas)" },
    {
      regex: /\b(forEach|map|filter|reduce|find|sort)\s*\(/,
      desc: "Métodos modernos de array",
    },
    { regex: /\bclass\s+\w+/, desc: "Classes ES6" },
    { regex: /\bimport\s+|export\s+/, desc: "Módulos import/export" },
    { regex: /\basync\s+|await\s+|Promise\b/, desc: "Assincronismo moderno" },
    { regex: /\bconst\b/, desc: "Uso de const (fora da apostila)" },
    { regex: /\blet\b/, desc: "Uso de let (fora da apostila)" },
    { regex: /\btry\s*{/, desc: "Bloco try/catch avançado" },
    {
      regex: /ChatGPT|OpenAI|Gemini|Claude|copilot/i,
      desc: "Marcas explícitas de IA",
    },
  ];

  const violacoes = proibidos.filter((p) => p.regex.test(codigo));
  const linhas = codigo.split("\n").length;
  const mediaComprimento = codigo.length / linhas;
  const formatoIA = mediaComprimento > 130;
  let penalIA = 1;

  if (violacoes.length > 0 || formatoIA || comentarios > 40) {
    feedback.push(
      "\n⚠ SUSPEITA DE USO DE IA OU CÓDIGO ACIMA DO NÍVEL ENSINADO:"
    );
    violacoes.forEach((v) => feedback.push(`   - ${v.desc}`));
    if (formatoIA) feedback.push("   - Código muito compacto (padrão IA)");
    if (comentarios > 40)
      feedback.push("   - Excesso de comentários automáticos");
    penalIA = violacoes.length >= 3 ? 0.5 : 0.7;
    feedback.push(
      `   → Penalização aplicada: -${Math.round((1 - penalIA) * 100)}%`
    );
    for (let k in pontos) pontos[k] *= penalIA;
  } else {
    feedback.push(
      "\n✔ Nenhum indício de IA detectado. Código autêntico e compatível com o conteúdo."
    );
  }

  // ==================================================
  // TRABALHO INCOMPLETO
  // ==================================================
  const faltantes = Object.values(pontos).filter((p) => p === 0).length;
  if (faltantes >= 3) {
    feedback.push(
      `⚠ Trabalho incompleto (${faltantes} critérios zerados) → penalização adicional de 15%.`
    );
    for (let k in pontos) pontos[k] *= 0.85;
  }

  // ==================================================
  // TOTALIZAÇÃO FINAL
  // ==================================================
  let total = Object.values(pontos).reduce((a, b) => a + b, 0);
  if (total > 80) total = 80;
  if (total < 0) total = 0;

  let conceito =
    total >= 70
      ? "EXCELENTE"
      : total >= 55
      ? "BOM"
      : total >= 40
      ? "REGULAR"
      : "INSUFICIENTE";

  feedback.push(
    `\n=== TOTAL FINAL: ${total.toFixed(1)}/80 pts — ${conceito} ===`
  );

  // ==================================================
  // RELATÓRIO FINAL EXPLICATIVO
  // ==================================================
  feedback.push("\n📋 RELATÓRIO TÉCNICO:");
  if (penalIA < 1)
    feedback.push(
      " - Redução aplicada por possível uso de IA ou código acima do nível do curso."
    );
  if (faltantes >= 3)
    feedback.push(" - Trabalho incompleto: estruturas obrigatórias ausentes.");
  if (entradas === 0 && saidas === 0)
    feedback.push(" - Nenhum teste prático de entrada/saída detectado.");
  feedback.push(
    " - Avaliação considera clareza, estrutura, autenticidade e completude lógica."
  );

  return { feedback: feedback.join("\n"), total: total.toFixed(1), conceito };
}

// ==================================================
// EXECUÇÃO
// ==================================================
const codigo = fs.readFileSync(arquivoAluno, "utf-8");
const resultado = avaliarCodigo(codigo);

const nomeFeedback = path.basename(arquivoAluno, ".js") + "_feedback.txt";
fs.writeFileSync(
  nomeFeedback,
  `=== FEEDBACK DETALHADO: ${arquivoAluno} ===\n\n${resultado.feedback}\n`,
  "utf-8"
);

console.log(`✅ Avaliação concluída! Feedback salvo em: ${nomeFeedback}`);
