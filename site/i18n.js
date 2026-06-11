/* Paddock landing — bilingual toggle (EN/PT), vanilla, zero-dep. */
(function () {
  var T = {
    en: {
      "nav.how": "How it works", "nav.use": "Use it", "nav.why": "Benefits",
      "hero.eyebrow": "Memory bank + roadmap · for AI-assisted teams",
      "hero.lede": "A <em>git-native memory bank</em> that's also a roadmap — evidence-linked to your code, across a multi-repo workspace, with delivery guardrails. So humans and AI agents share the same map, every session.",
      "hero.ctaPrimary": "Use this template", "hero.ctaSecondary": "Read the repo ↗",
      "prob.h": "Context dies between sessions.",
      "prob.p": "AI-assisted work generates a lot of context that evaporates: decisions, the roadmap, the <em>why</em>. Drive and Notion go stale, and the agent can't read or write them natively. Next session, you re-explain everything — or the agent guesses.",
      "mb.h1": "Memory bank", "mb.h2": "— and beyond",
      "mb.p": "The category has a name: <strong>memory bank</strong> — markdown kept in the repo, fed to the agent at the start of every session to restore context. Paddock is that at its core. But it goes further, adding the <em>engineering-governance</em> layer most memory banks lack:",
      "mb.c1h": "Evidence-linked roadmap",
      "mb.c1p": "Not just \"what the project is\" — what's <em>done / pending</em>, each item linked to a PR/commit/ADR. The memory bank becomes the source of truth for progress.",
      "mb.c2h": "Delivery guardrails",
      "mb.c2p": "A short session ritual + Definition of Ready / Done + a trunk-based git stance. Not only context — <em>process</em>.",
      "mb.c3h": "Multi-repo + refinery",
      "mb.c3p": "Many repos under one workspace, plus a raw <code>_knowledge/</code> intake distilled into structure. Most memory banks are single-repo and context-only.",
      "mb.c4h": "Cross-agent",
      "mb.c4p": "<code>AGENTS.md</code> read by Copilot, Cursor, Codex and Claude. Not tied to one tool — the core is markdown + git.",
      "topo.h": "One workspace. The agent sees everything.",
      "topo.p": "Paddock isn't an island — it lives at the root of your workspace, next to the code repos and the raw project material. The agent runs from the root and cross-references memory + code + raw input at once.",
      "topo.refinery": "Paddock acts as a <strong>refinery</strong>: it distills the raw pile in <code>_knowledge/</code> into structure — specs, decisions, status. From chaos to traceable governance.",
      "use.h": "Adopt it in minutes.",
      "use.s1h": "Use the template", "use.s1p": "Click <em>Use this template</em> on GitHub (or the button below). You get the whole scaffold.",
      "use.s2h": "Run setup", "use.s2p": "Applies your project name, generates the cross-agent <code>AGENTS.md</code>, validates the skeleton. (Windows: Git Bash/WSL.)",
      "use.s3h": "Track work with evidence", "use.s3p": "One line per item in <code>status.md</code>. Every ✅/🟡 carries a link — no evidence, no status.",
      "use.s4h": "See the panorama", "use.s4p": "A visual status report on demand — and an integrity lint that fails on stale markers.",
      "why.h": "Why teams adopt it.",
      "why.b1k": "Traceability", "why.b1p": "roadmap ↔ code, every item linked to a PR/commit.",
      "why.b2k": "Persistent context", "why.b2p": "the agent restores the project each session — no re-explaining.",
      "why.b3k": "Light governance", "why.b3p": "DoR/DoD + ritual that deliver, without ceremony.",
      "why.b4k": "Cross-agent", "why.b4p": "Copilot, Cursor, Codex, Claude — one AGENTS.md.",
      "why.b5k": "Cross-OS", "why.b5p": "Linux/macOS native; Windows via Git Bash/WSL.",
      "why.b6k": "Zero-dependency", "why.b6p": "markdown + git. No SSG, no runtime, no lock-in.",
      "cta.h": "Give your project a memory.", "cta.repo": "View on GitHub ↗"
    },
    pt: {
      "nav.how": "Como funciona", "nav.use": "Usar", "nav.why": "Benefícios",
      "hero.eyebrow": "Memory bank + roadmap · para times com IA",
      "hero.lede": "Um <em>memory bank git-native</em> que também é roadmap — com evidência ligada ao seu código, num workspace multi-repo, com guardrails de entrega. Humano e agente de IA no mesmo mapa, a cada sessão.",
      "hero.ctaPrimary": "Usar este template", "hero.ctaSecondary": "Ver o repositório ↗",
      "prob.h": "O contexto morre entre as sessões.",
      "prob.p": "Trabalho com IA gera muito contexto que evapora: decisões, roadmap, o <em>porquê</em>. Drive e Notion desatualizam, e o agente não lê nem escreve neles. Na próxima sessão, você reexplica tudo — ou o agente chuta.",
      "mb.h1": "Memory bank", "mb.h2": "— e além",
      "mb.p": "A categoria tem nome: <strong>memory bank</strong> — markdown no repo, alimentado ao agente no início de cada sessão pra restaurar o contexto. Paddock é isso no core. Mas vai além, somando a camada de <em>governança de engenharia</em> que falta na maioria:",
      "mb.c1h": "Roadmap com evidência",
      "mb.c1p": "Não só \"o que o projeto é\" — o que está <em>feito / pendente</em>, cada item ligado a PR/commit/ADR. O memory bank vira a fonte de verdade do progresso.",
      "mb.c2h": "Guardrails de entrega",
      "mb.c2p": "Ritual de sessão curto + Definition of Ready / Done + git trunk-based. Não só contexto — <em>processo</em>.",
      "mb.c3h": "Multi-repo + refinaria",
      "mb.c3p": "Vários repos num workspace, mais um intake bruto <code>_knowledge/</code> destilado em estrutura. A maioria dos memory banks é single-repo e só-contexto.",
      "mb.c4h": "Cross-agent",
      "mb.c4p": "<code>AGENTS.md</code> lido por Copilot, Cursor, Codex e Claude. Não amarra a uma ferramenta — o core é markdown + git.",
      "topo.h": "Um workspace. O agente enxerga tudo.",
      "topo.p": "Paddock não é ilha — vive na raiz do seu workspace, ao lado dos repos de código e do material bruto. O agente roda da raiz e cruza memória + código + matéria-prima de uma vez.",
      "topo.refinery": "Paddock age como <strong>refinaria</strong>: destila o entulho de <code>_knowledge/</code> em estrutura — specs, decisões, status. Do caos à governança rastreável.",
      "use.h": "Adote em minutos.",
      "use.s1h": "Use o template", "use.s1p": "Clique em <em>Use this template</em> no GitHub (ou no botão abaixo). Você ganha o scaffold inteiro.",
      "use.s2h": "Rode o setup", "use.s2p": "Aplica o nome do projeto, gera o <code>AGENTS.md</code> cross-agent, valida o esqueleto. (Windows: Git Bash/WSL.)",
      "use.s3h": "Rastreie com evidência", "use.s3p": "Uma linha por item no <code>status.md</code>. Todo ✅/🟡 carrega um link — sem evidência, sem status.",
      "use.s4h": "Veja o panorama", "use.s4p": "Relatório visual de status sob demanda — e um lint de integridade que reprova marcador stale.",
      "why.h": "Por que times adotam.",
      "why.b1k": "Rastreabilidade", "why.b1p": "roadmap ↔ código, cada item ligado a um PR/commit.",
      "why.b2k": "Contexto persistente", "why.b2p": "o agente restaura o projeto a cada sessão — sem reexplicar.",
      "why.b3k": "Governança leve", "why.b3p": "DoR/DoD + ritual que entregam, sem cerimônia.",
      "why.b4k": "Cross-agent", "why.b4p": "Copilot, Cursor, Codex, Claude — um AGENTS.md.",
      "why.b5k": "Cross-OS", "why.b5p": "Linux/macOS nativo; Windows via Git Bash/WSL.",
      "why.b6k": "Zero-dependência", "why.b6p": "markdown + git. Sem SSG, sem runtime, sem lock-in.",
      "cta.h": "Dê uma memória ao seu projeto.", "cta.repo": "Ver no GitHub ↗"
    }
  };

  function apply(lang) {
    var dict = T[lang] || T.en;
    document.documentElement.setAttribute("lang", lang);
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var v = dict[el.getAttribute("data-i18n")];
      if (v != null) el.innerHTML = v;
    });
    try { localStorage.setItem("paddock-lang", lang); } catch (e) {}
  }

  var saved = null;
  try { saved = localStorage.getItem("paddock-lang"); } catch (e) {}
  var q = (new URLSearchParams(location.search).get("lang") || "").slice(0, 2);
  var initial = (q === "pt" || q === "en") ? q
    : saved || ((navigator.language || "en").slice(0, 2) === "pt" ? "pt" : "en");
  apply(initial);

  var btn = document.getElementById("langToggle");
  if (btn) btn.addEventListener("click", function () {
    apply(document.documentElement.getAttribute("lang") === "pt" ? "en" : "pt");
  });
})();
