// ==================================================
// avaliadorLite.js — Versão 8.0 LITE (SEM DEPENDÊNCIAS)
// Avaliação 100% Nativa | Detecção IA | Nota Real
// ==================================================
const fs = require("fs");
const path = require("path");

if (process.argv.length < 3) {
  console.log("Uso: node avaliadorLite.js <arquivo_aluno.js>");
  process.exit(1);
}

const arquivoAluno = process.argv[2];
if (!fs.existsSync(arquivoAluno)) {
  console.log("Arquivo não encontrado:", arquivoAluno);
  process.exit(1);
}

console.log("Avaliando (modo LITE):", arquivoAluno, "\n");

// ==================================================
// CRITÉRIOS (Total = 20 pontos)
// ==================================================
const criterios = [
  { nome: "Vetores", peso: 3 },
  { nome: "Variáveis", peso: 2 },
  { nome: "Funções", peso: 7 },
  { nome: "Comentários", peso: 2 },
  { nome: "Funcionalidades", peso: 4 },
  { nome: "Qualidade", peso: 2 },
];

// ==================================================
// FUNÇÃO DE AVALIAÇÃO (ANÁLISE ESTÁTICA + SIMULAÇÃO)
// ==================================================
function avaliarCodigo(codigo) {
  const linhas = codigo.split("\n").map((l) => l.trim());
  const texto = codigo.toLowerCase().replace(/\s+/g, " ");
  const linhasOriginais = codigo.split("\n");
  let pontos = {};
  criterios.forEach((c) => (pontos[c.nome] = 0));

  let penalidade = 0;
  let motivosPenalidade = [];
  let alertasIA = [];
  let alertasErros = [];
  let saidasSimuladas = [];

  // ==================================================
  // 1. VETOR (declaração + métodos)
  // ==================================================
  const vetoresDecl = (
    codigo.match(/\b(let|var|const)\s+\w+\s*=\s*\[\s*\]/g) || []
  ).length;
  const metodosVetor = (
    codigo.match(
      /\.(push|splice|pop|shift|unshift|indexOf|find|filter|map)\(/g
    ) || []
  ).length;
  if (vetoresDecl >= 6 && metodosVetor >= 8) pontos["Vetores"] = 3;
  else if (vetoresDecl >= 4 || metodosVetor >= 5) pontos["Vetores"] = 2.5;
  else if (vetoresDecl >= 2 || metodosVetor >= 2) pontos["Vetores"] = 1.5;
  else if (vetoresDecl >= 1) pontos["Vetores"] = 1;

  // ==================================================
  // 2. VARIÁVEIS (quantidade única)
  // ==================================================
  const vars = (codigo.match(/\b(let|var|const)\s+(\w+)/g) || []).map(
    (m) => m.split(/\s+/)[1]
  );
  const qtdVar = new Set(vars).size;
  if (qtdVar >= 25) pontos["Variáveis"] = 2;
  else if (qtdVar >= 15) pontos["Variáveis"] = 1.7;
  else if (qtdVar >= 8) pontos["Variáveis"] = 1.2;
  else if (qtdVar >= 3) pontos["Variáveis"] = 0.8;

  // ==================================================
  // 3. FUNÇÕES (busca por nome + corpo)
  // ==================================================
  const funcoesEsperadas = {
    cadastrarInscrito: ["push", "nome", "id", "telefone"],
    cadastrarVideo: ["push", "titulo", "codigo", "visualizac"],
    registrarVisualizacao: ["visualiz", "increment", "views", "+"],
    consultarRegistrosVisualizacoes: ["for", "log", "visualiz", "listar"],
    atualizarInscrito: ["atualiz", "editar", "id", "="],
    removerInscrito: ["splice", "remov", "delet", "excluir"],
    consultarVideoPorCodigo: ["codigo", "find", "filter", "for"],
    consultarMaisPopular: ["popular", "max", "maior", "views"],
    relatorioPorInscrito: ["relat", "inscrit", "visualiz", "for"],
  };

  const regexFuncao = /function\s+([a-zA-Z0-9_]+)\s*\([^)]*\)\s*{([^}]*)}/g;
  const funcoesEncontradas = {};
  let match;
  while ((match = regexFuncao.exec(codigo)) !== null) {
    const nome = match[1];
    const corpo = match[2].toLowerCase();
    funcoesEncontradas[nome] = corpo;
  }

  let somaFunc = 0;
  let relatorioFuncoes = [];

  Object.entries(funcoesEsperadas).forEach(([nomeEsperado, chaves]) => {
    const encontrada = Object.entries(funcoesEncontradas).find(
      ([nome, corpo]) =>
        chaves.some((kw) => corpo.includes(kw)) ||
        nome.toLowerCase().includes(nomeEsperado)
    );

    if (!encontrada) {
      relatorioFuncoes.push(`Ausente: ${nomeEsperado}`);
      return;
    }

    const [nomeReal, corpo] = encontrada;
    const acertos = chaves.filter((kw) => corpo.includes(kw)).length;
    const percentual = acertos / chaves.length;
    somaFunc += percentual;
    relatorioFuncoes.push(`OK ${nomeReal}: ${Math.round(percentual * 100)}%`);
  });

  pontos["Funções"] = (somaFunc / Object.keys(funcoesEsperadas).length) * 7;
  motivosPenalidade.push("\nANÁLISE DE FUNÇÕES:");
  relatorioFuncoes.forEach((r) => motivosPenalidade.push(" • " + r));

  // ==================================================
  // 4. COMENTÁRIOS (quantidade e qualidade)
  // ==================================================
  const comentarios = codigo.match(/\/\/.*|\/\*[\s\S]*?\*\//g) || [];
  const comentariosLongos = comentarios.filter(
    (c) => c.length > 20 && !c.includes("EXERCÍCIO")
  ).length;
  pontos["Comentários"] =
    comentariosLongos >= 6
      ? 2
      : comentariosLongos >= 3
      ? 1.5
      : comentarios.length >= 8
      ? 1
      : 0.5;

  // ==================================================
  // 5. FUNCIONALIDADES (prompt, alert, loops, condicionais)
  // ==================================================
  const entrada = (codigo.match(/\b(prompt|readline)\(/g) || []).length;
  const saida = (codigo.match(/\b(alert|console\.log)\(/g) || []).length;
  const loops = (codigo.match(/\b(for|while)\s*\(/g) || []).length;
  const condicoes = (codigo.match(/\b(if|switch)\s*\(/g) || []).length;

  let funcPts = 0;
  if (entrada >= 6) funcPts += 1.2;
  if (saida >= 8) funcPts += 1.2;
  if (loops >= 4) funcPts += 0.8;
  if (condicoes >= 5) funcPts += 0.8;
  pontos["Funcionalidades"] = Math.min(funcPts, 4);

  // ==================================================
  // 6. QUALIDADE DO CÓDIGO
  // ==================================================
  let qualidade = 2;
  const usoVar = (codigo.match(/\bvar\s+/g) || []).length;
  const usoLetConst = (codigo.match(/\b(let|const)\s+/g) || []).length;
  if (usoVar > usoLetConst * 2) qualidade -= 0.8;

  const duplicatas = linhas.filter((l, i, a) => a.indexOf(l) !== i && l).length;
  if (duplicatas > 3) qualidade -= 0.7;

  const linhasVazias = linhasOriginais.filter((l) => !l.trim()).length;
  if (linhasVazias > linhasOriginais.length * 0.3) qualidade -= 0.5;

  pontos["Qualidade"] = Math.max(qualidade, 0);

  // ==================================================
  // 7. DETECÇÃO DE IA (AVANÇADA)
  // ==================================================
  let scoreIA = 0;
  if (
    texto.includes("async") ||
    texto.includes("await") ||
    texto.includes("=>")
  )
    scoreIA += 1.3;
  if (texto.includes("export") || texto.includes("import")) scoreIA += 1.5;
  const genericos = (
    texto.match(/\b(data|item|obj|array|result|info|value)\b/g) || []
  ).length;
  if (genericos >= 10) scoreIA += 1.1;
  if (
    texto.includes("this function") ||
    texto.includes("returns") ||
    texto.includes("parameters")
  )
    scoreIA += 1.2;

  const indentPerfeita =
    linhasOriginais.filter((l) => /^\s{2,4}[^ ]/.test(l)).length /
    linhasOriginais.filter((l) => l.trim()).length;
  if (indentPerfeita > 0.92) scoreIA += 0.7;

  if (scoreIA >= 3.0) {
    penalidade += Math.min(scoreIA, 7);
    alertasIA.push(`IA DETECTADA (índice: ${scoreIA.toFixed(1)})`);
    motivosPenalidade.push(
      "Padrões de IA: arrow, async, nomes genéricos, formatação perfeita."
    );
  }

  // ==================================================
  // 8. ERROS CRÍTICOS (simulação estática)
  // ==================================================
  if (codigo.includes(".(titulo)") || codigo.includes(".(codigo)")) {
    alertasErros.push("Erro crítico: uso de '.(' em vez de '.push('");
    penalidade += 2;
  }
  if (codigo.includes('while("Índice!")')) {
    alertasErros.push("Loop infinito detectado");
    penalidade += 2;
  }

  // ==================================================
  // SOMA FINAL
  // ==================================================
  let totalBase = Object.values(pontos).reduce((a, b) => a + b, 0);
  let total = Math.max(totalBase - penalidade, 0);
  if (total > 20) total = 20;

  // ==================================================
  // RELATÓRIO FINAL
  // ==================================================
  const relatorio = [];
  relatorio.push("=== AVALIAÇÃO 8.0 LITE — 100% NATIVA ===\n");
  relatorio.push(`Arquivo: ${path.basename(arquivoAluno)}\n`);

  relatorio.push("CRITÉRIOS:");
  Object.entries(pontos).forEach(([k, v]) => {
    const peso = criterios.find((c) => c.nome === k)?.peso || 1;
    const nivel =
      v >= peso * 0.9
        ? "Excelente"
        : v >= peso * 0.6
        ? "Bom"
        : v >= peso * 0.3
        ? "Regular"
        : "Fraco";
    relatorio.push(` • ${k.padEnd(20)}: ${v.toFixed(1).padEnd(4)} → ${nivel}`);
  });

  relatorio.push("\nPENALIZAÇÕES:");
  if (alertasErros.length > 0)
    alertasErros.forEach((e) => relatorio.push(` • ${e}`));
  if (motivosPenalidade.length > 0)
    motivosPenalidade.forEach((m) => relatorio.push(` • ${m}`));
  relatorio.push(`Total penalidades: -${penalidade.toFixed(1)} pts`);

  if (alertasIA.length > 0) {
    relatorio.push("\nIA DETECTADA:");
    alertasIA.forEach((a) => relatorio.push(` • ${a}`));
  }

  relatorio.push("\nSÍNTESE:");
  relatorio.push(` • Nota Base: ${totalBase.toFixed(1)}`);
  relatorio.push(` • Penalidades: -${penalidade.toFixed(1)}`);
  relatorio.push(`\nNOTA FINAL: ${total.toFixed(1)} / 20`);

  const classificacao =
    total >= 18
      ? "A — Excelência"
      : total >= 14
      ? "B — Muito Bom"
      : total >= 10
      ? "C — Regular"
      : total >= 6
      ? "D — Fraco"
      : "F — Insuficiente";
  relatorio.push(`CLASSIFICAÇÃO: ${classificacao}`);

  relatorio.push("\nCONCLUSÃO:");
  if (total >= 18)
    relatorio.push("Código funcional, limpo e autoral. Excelente!");
  else if (total >= 14)
    relatorio.push("Bom trabalho. Pequenos ajustes em estrutura.");
  else if (total >= 10)
    relatorio.push("Funciona, mas com falhas de lógica ou autoria.");
  else relatorio.push("Código com erros graves ou forte indício de IA.");

  if (penalidade > 2 || alertasIA.length > 0) {
    relatorio.push("\nRECOMENDAÇÕES:");
    relatorio.push(" • Use let/const, evite var");
    relatorio.push(" • Corrija erros de sintaxe (.push, não .()");
    relatorio.push(" • Comente o que cada função faz");
    relatorio.push(" • Teste manualmente antes de entregar");
  }

  relatorio.push(
    "\n-----------------------------------------\nAvaliador 8.0 LITE — Lenon Yuri © 2025\nSem dependências | Detecção IA | Nota justa\n"
  );

  return { total, feedback: relatorio.join("\n") };
}

// ==================================================
// EXECUÇÃO
// ==================================================
const codigo = fs.readFileSync(arquivoAluno, "utf-8");
const resultado = avaliarCodigo(codigo);
const nomeFeedback = path.basename(arquivoAluno, ".js") + "_FEEDBACK_LITE.txt";
fs.writeFileSync(nomeFeedback, resultado.feedback, "utf-8");

console.log(`AVALIAÇÃO CONCLUÍDA`);
console.log(`Nota: ${resultado.total.toFixed(1)}/20`);
console.log(`Feedback salvo: ${nomeFeedback}`);
