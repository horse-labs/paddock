/* Paddock landing (c1-final) — bilingual EN/PT toggle + scroll reveal.
   Vanilla, zero-dependency. Default EN. Honors ?lang=, localStorage, navigator.language.
   Reveal is progressive enhancement only — content is fully visible without JS. */
(function () {
  "use strict";

  /* ─── i18n dictionary ─────────────────────────────────────────
     innerHTML is used on apply() so inline <em>/<strong>/<code> survive.
     Code blocks / commands / the status table stay literal (not keyed). */
  var T = {
    en: {
      "a11y.skip": "Skip to content",

      "nav.problem": "Problem",
      "nav.concept": "Memory bank",
      "nav.topology": "Topology",
      "nav.usage": "Use it",

      "badge.zerodep": "Zero-dependency",
      "badge.crossagent": "Cross-agent",

      "hero.eyebrow": "A HorseLabs open project",
      "hero.title": "<span class=\"reveal\" data-d=\"1\">The memory bank</span><span class=\"reveal\" data-d=\"2\">your <em>agent</em> never</span><span class=\"reveal\" data-d=\"3\">forgets.</span>",
      "hero.lede": "Paddock is the git-native memory bank <span class=\"amp\">+</span> roadmap for AI-assisted teams — <strong>evidence-linked</strong>, multi-repo, with delivery guardrails.",
      "hero.ctaPrimary": "Use this template",
      "hero.ctaSecondary": "View on GitHub ↗",
      "hero.statusCap": "roadmap/status.md — every status carries its proof",

      "problem.kicker": "The problem",
      "problem.title": "Context dies <em>between sessions.</em>",
      "problem.p1": "AI-assisted work generates a tremendous amount of context — the decisions, the roadmap, the <em>why</em> behind every trade-off. Then the session ends, and it evaporates.",
      "problem.p2": "Drive and Notion go stale the moment you close the tab. Worse, the agent can't read or write them natively. So next session opens the same way every time: re-explaining everything you already decided.",
      "problem.punch": "Memory shouldn't live in a human's head, or a doc nobody updates. It should live where the work lives — <span class=\"hl\">in the repo.</span>",

      "concept.kicker": "Memory bank — and beyond",
      "concept.title": "A <em>memory bank</em> at its core. <br class=\"br-d\" />Governance on top.",
      "concept.lede": "The category is the <strong>memory bank</strong> — structured markdown kept in the repo and fed to the agent each session to restore context. Paddock is that, then keeps going, adding the engineering governance real teams actually need.",
      "concept.c1h": "Evidence-linked roadmap",
      "concept.c1p": "What's done, what's pending — and every item linked to a PR, a commit, or an ADR. No status without proof.",
      "concept.c2h": "Delivery guardrails",
      "concept.c2p": "A lightweight session ritual, a Definition of Ready / Done, and trunk-based git. Discipline without ceremony.",
      "concept.c3h": "Multi-repo + refinery",
      "concept.c3p": "Many repos in one workspace, plus a raw <code>_knowledge/</code> intake that's distilled into clean structure.",
      "concept.c4h": "Cross-agent",
      "concept.c4p": "One <code>AGENTS.md</code>, read by Copilot, Cursor, Codex and Claude alike. Write the context once.",

      "topology.kicker": "Topology",
      "topology.title": "One workspace. <br class=\"br-d\" />The agent <em>sees everything.</em>",
      "topology.p1": "Your agent runs from a single workspace root. Code repos sit beside the structured memory, beside the raw intake. Nothing is hidden in a tab the model can't reach.",
      "topology.p2": "Paddock acts as a <strong>refinery</strong>: it distills the unstructured <code>_knowledge/</code> — PDFs, transcripts, diagrams — into specs, decisions and status.",

      "usage.kicker": "How to use it",
      "usage.title": "Four steps to a project <em>with a memory.</em>",
      "usage.s1h": "Use the template",
      "usage.s1p": "Generate your own repository from Paddock — one click, no fork to maintain.",
      "usage.s1link": "Use this template ↗",
      "usage.s2h": "Run setup",
      "usage.s2p": "Clone it, then let the script scaffold your structured memory.",
      "usage.s3h": "Track work with evidence",
      "usage.s3p": "One line in <code>status.md</code> — the proof travels with the status.",
      "usage.s4h": "See the panorama",
      "usage.s4p": "One command prints the whole delivery picture as a status bar.",

      "benefits.kicker": "Why it holds up",
      "benefits.title": "Built to be quietly <em>indispensable.</em>",
      "benefits.b1k": "Traceability",
      "benefits.b1p": "Roadmap ↔ code, every line PR-linked. The audit writes itself.",
      "benefits.b2k": "Persistent context",
      "benefits.b2p": "The agent restores the full picture at the start of each session.",
      "benefits.b3k": "Light governance",
      "benefits.b3p": "Definition of Ready / Done with zero ceremony or overhead.",
      "benefits.b4k": "Cross-agent",
      "benefits.b4p": "One <code>AGENTS.md</code> serves every assistant your team runs.",
      "benefits.b5k": "Cross-OS",
      "benefits.b5p": "Native on Linux &amp; macOS; Windows via Git Bash or WSL.",
      "benefits.b6k": "Zero-dependency",
      "benefits.b6p": "Just markdown and git. Nothing to install, nothing to break.",

      "final.eyebrow": "Start now",
      "final.title": "Give your project <em>a memory.</em>",
      "final.lede": "Generate the template, run one script, and your agent walks in already knowing where things stand.",

      "foot.tag": "Tools for AI-assisted engineering teams.",
      "foot.repo": "Repository ↗",
      "foot.releases": "Releases ↗",
      "foot.template": "Use template ↗",
      "foot.legal": "Apache-2.0 · Free &amp; open source · © 2026 HorseLabs"
    },

    pt: {
      "a11y.skip": "Pular para o conteúdo",

      "nav.problem": "Problema",
      "nav.concept": "Memory bank",
      "nav.topology": "Topologia",
      "nav.usage": "Usar",

      "badge.zerodep": "Zero-dependência",
      "badge.crossagent": "Cross-agent",

      "hero.eyebrow": "Um projeto aberto da HorseLabs",
      "hero.title": "<span class=\"reveal\" data-d=\"1\">O memory bank que</span><span class=\"reveal\" data-d=\"2\">seu <em>agente</em> nunca</span><span class=\"reveal\" data-d=\"3\">esquece.</span>",
      "hero.lede": "Paddock é o memory bank git-native <span class=\"amp\">+</span> roadmap para times com IA — <strong>com evidência ligada ao código</strong>, multi-repo, com guardrails de entrega.",
      "hero.ctaPrimary": "Usar este template",
      "hero.ctaSecondary": "Ver no GitHub ↗",
      "hero.statusCap": "roadmap/status.md — todo status carrega sua prova",

      "problem.kicker": "O problema",
      "problem.title": "O contexto morre <em>entre as sessões.</em>",
      "problem.p1": "Trabalho com IA gera uma quantidade enorme de contexto — as decisões, o roadmap, o <em>porquê</em> por trás de cada trade-off. Aí a sessão acaba, e tudo evapora.",
      "problem.p2": "Drive e Notion desatualizam no instante em que você fecha a aba. Pior: o agente não lê nem escreve neles nativamente. Então toda sessão começa do mesmo jeito: reexplicando tudo que você já decidiu.",
      "problem.punch": "Memória não devia viver na cabeça de alguém, nem num doc que ninguém atualiza. Ela devia viver onde o trabalho vive — <span class=\"hl\">no repositório.</span>",

      "concept.kicker": "Memory bank — e além",
      "concept.title": "Um <em>memory bank</em> no núcleo. <br class=\"br-d\" />Governança por cima.",
      "concept.lede": "A categoria é o <strong>memory bank</strong> — markdown estruturado guardado no repo e alimentado ao agente a cada sessão para restaurar o contexto. Paddock é isso e continua adiante, somando a governança de engenharia que os times realmente precisam.",
      "concept.c1h": "Roadmap com evidência",
      "concept.c1p": "O que está feito, o que está pendente — e cada item ligado a um PR, um commit ou um ADR. Sem status sem prova.",
      "concept.c2h": "Guardrails de entrega",
      "concept.c2p": "Um ritual de sessão leve, uma Definition of Ready / Done e git trunk-based. Disciplina sem cerimônia.",
      "concept.c3h": "Multi-repo + refinaria",
      "concept.c3p": "Vários repos num só workspace, mais um intake bruto <code>_knowledge/</code> que é destilado em estrutura limpa.",
      "concept.c4h": "Cross-agent",
      "concept.c4p": "Um único <code>AGENTS.md</code>, lido por Copilot, Cursor, Codex e Claude igualmente. Escreva o contexto uma vez só.",

      "topology.kicker": "Topologia",
      "topology.title": "Um workspace. <br class=\"br-d\" />O agente <em>enxerga tudo.</em>",
      "topology.p1": "Seu agente roda a partir de uma única raiz de workspace. Os repos de código ficam ao lado da memória estruturada, ao lado do intake bruto. Nada fica escondido numa aba que o modelo não alcança.",
      "topology.p2": "Paddock age como uma <strong>refinaria</strong>: destila o <code>_knowledge/</code> não estruturado — PDFs, transcrições, diagramas — em specs, decisões e status.",

      "usage.kicker": "Como usar",
      "usage.title": "Quatro passos para um projeto <em>com memória.</em>",
      "usage.s1h": "Use o template",
      "usage.s1p": "Gere seu próprio repositório a partir do Paddock — um clique, sem fork para manter.",
      "usage.s1link": "Usar este template ↗",
      "usage.s2h": "Rode o setup",
      "usage.s2p": "Clone e deixe o script montar sua memória estruturada.",
      "usage.s3h": "Rastreie com evidência",
      "usage.s3p": "Uma linha no <code>status.md</code> — a prova viaja junto com o status.",
      "usage.s4h": "Veja o panorama",
      "usage.s4p": "Um comando imprime todo o quadro de entrega como uma barra de status.",

      "benefits.kicker": "Por que se sustenta",
      "benefits.title": "Feito para ser silenciosamente <em>indispensável.</em>",
      "benefits.b1k": "Rastreabilidade",
      "benefits.b1p": "Roadmap ↔ código, cada linha ligada a um PR. A auditoria se escreve sozinha.",
      "benefits.b2k": "Contexto persistente",
      "benefits.b2p": "O agente restaura o quadro completo no início de cada sessão.",
      "benefits.b3k": "Governança leve",
      "benefits.b3p": "Definition of Ready / Done sem cerimônia nem overhead.",
      "benefits.b4k": "Cross-agent",
      "benefits.b4p": "Um único <code>AGENTS.md</code> serve todo assistente que seu time usa.",
      "benefits.b5k": "Cross-OS",
      "benefits.b5p": "Nativo em Linux &amp; macOS; Windows via Git Bash ou WSL.",
      "benefits.b6k": "Zero-dependência",
      "benefits.b6p": "Só markdown e git. Nada para instalar, nada para quebrar.",

      "final.eyebrow": "Comece agora",
      "final.title": "Dê uma <em>memória</em> ao seu projeto.",
      "final.lede": "Gere o template, rode um script, e seu agente entra já sabendo onde as coisas estão.",

      "foot.tag": "Ferramentas para times de engenharia com IA.",
      "foot.repo": "Repositório ↗",
      "foot.releases": "Releases ↗",
      "foot.template": "Usar template ↗",
      "foot.legal": "Apache-2.0 · Livre & código aberto · © 2026 HorseLabs"
    }
  };

  function apply(lang) {
    var dict = T[lang] || T.en;
    document.documentElement.setAttribute("lang", lang);
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var v = dict[el.getAttribute("data-i18n")];
      if (v != null) el.innerHTML = v;
    });
    var btn = document.getElementById("langToggle");
    if (btn) btn.setAttribute("aria-pressed", lang === "pt" ? "true" : "false");
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

  /* ─── scroll reveal (progressive enhancement only) ───────────
     CSS keeps content visible if JS is off. Hero reveals run on
     load via CSS; .reveal-up elements fade up on scroll. */
  var prefersReduced =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var targets = Array.prototype.slice.call(
    document.querySelectorAll(".reveal-up")
  );

  if (prefersReduced || !("IntersectionObserver" in window)) {
    targets.forEach(function (el) {
      el.classList.add("is-in");
      el.style.opacity = "1";
      el.style.transform = "none";
    });
    return;
  }

  var io = new IntersectionObserver(
    function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var siblings = Array.prototype.slice.call(
          el.parentNode.querySelectorAll(":scope > .reveal-up")
        );
        var idx = Math.max(0, siblings.indexOf(el));
        el.style.animationDelay = idx * 70 + "ms";
        el.classList.add("is-in");
        obs.unobserve(el);
      });
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.12 }
  );

  targets.forEach(function (el) {
    io.observe(el);
  });
})();
