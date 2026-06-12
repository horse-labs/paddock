# FRAMEWORK — protocolo de trabalho das sessões

O **ritual mínimo** que mantém o `roadmap/status.md` acurado. Sem ele, o status desatualiza e a memória do
projeto se perde entre sessões. Com ele, qualquer sessão (humana ou agente de IA) sabe o estado real e
deixa rastro do que mexeu.

Cerimônia é **curta de propósito**. O objetivo é **rastreabilidade e acurácia**, não burocracia. Adapte o
peso à fase do seu projeto.

## Ritual de sessão

**Ao abrir (toda sessão que toca trabalho):**
1. Ler `README.md` + `roadmap/status.md` (o bloco "AGORA" no topo é o resumo) **+ `current_sessions/`**
   (o que outras sessões estão fazendo agora — ver *Sessões paralelas* abaixo).
2. Identificar o(s) item(ns) por `ID` que a sessão vai tocar (ex.: `E1`, `H2.1`, `X-03`) — só os
   **não-reservados** por outra sessão ativa.
3. Registrar a sessão: criar `current_sessions/<session-id>.md` (claim do que vai tocar) + abrir branch/worktree.

**Durante:**
- Todo trabalho fica amarrado a um `ID` do roadmap, numa **branch/worktree própria** (nunca direto na
  `main`). Trabalho novo sem ID → criar o item no `status.md` **antes** (ver convenção de IDs abaixo).
- Tarefa nova fora do session-file → `git pull` + reler `current_sessions/` + atualizar o próprio
  session-file antes de avançar.

**Ao fechar (quando mexeu em algo rastreado):**
1. PR da branch → `main` (checks verdes → merge). Atualizar a linha do item em `roadmap/status.md`: novo
   **status** + **evidência** (link de PR/commit/ADR) + nota curta.
2. Atualizar o bloco "AGORA" do topo se a prioridade mudou.
3. Commit/PR com mensagem curta referenciando o ID (ex.: `status: E1 ✅ deployado (#16)`).
4. Débito técnico gerado → registrar na coluna nota (ou linkar pro seu rastreador de débito).
5. Atualizar o session-file com o status final e **arquivá-lo** em `current_sessions/_archive/YYYY-MM/`.

## Taxonomia de status

| Símbolo | Significado |
|---|---|
| ✅ | **feito** — entregue e verificado |
| 🟡 | **parcial** — começado, falta parte (descrever o que falta na nota) |
| 🔵 | **feito-divergente** — entregue, mas diferente do plano original (explicar a divergência) |
| ❌ | **não-iniciado** |
| ⏸ | **adiado** — decisão consciente de não fazer agora |

**Regra de ouro:** status nunca é checkbox solto. Todo ✅/🟡/🔵 tem **evidência** linkada (PR#, commit SHA,
ADR, arquivo). Sem evidência → é alegação, não fato. O `tools/lint-status.sh` reprova linhas sem evidência.

## Ritual de ingest (refinaria) — bruto → estruturado
O Paddock vive numa raiz `~/workspace/` ao lado dos repos e de um dir `_knowledge/` (intake bruto: PDFs,
transcrições, drawio…). Ver [`docs/workspace-setup.md`](docs/workspace-setup.md). Quando entra material novo:
1. Cai em `_knowledge/` (reunião, doc, diagrama, export do Drive).
2. Numa sessão, ler o bruto e **destilar**: decisão → `decisions/`; design → `specs/`; trabalho a fazer →
   item(ns) no `roadmap/status.md` (com ID); contexto durável → onde couber.
3. `_knowledge/` é **entrada**, não memória — pode ser podado depois. O que importa já virou estrutura linkada.

Esse é o on-ramp: **caos do projeto → governança rastreável.** `_knowledge/` nunca é commitado no paddock.

## Definition of Ready (DoR) — antes de puxar um item
Um item só vira 🔵 in-progress quando:
- [ ] tem **critério de aceite** claro (no próprio item se trivial; em `specs/` se não);
- [ ] **dependências** conhecidas (e nenhuma bloqueante aberta — ver `blocked-by`);
- [ ] **cabe numa fatia** (1 sessão / 1 PR); se não cabe, quebrar antes.

Puxar item cru = começar e travar. O DoR é o filtro barato que evita isso.

## Definition of Done (DoD) — o que "✅ feito" exige
Não marque ✅ sem:
- [ ] implementado **e verificado** (teste/observação real, não "deve funcionar");
- [ ] **revisado** (PR ou auto-revisão honesta);
- [ ] **evidência linkada** (PR#/commit/ADR) — `lint-status.sh` reprova sem link;
- [ ] **integrado/no ar** se aplicável (mergeado/deployado), não só em branch;
- [ ] débito gerado **registrado** na nota.

✅ é um **fato verificável**, não um desejo. 🟡 é honesto quando falta parte — use sem culpa.

## Convenção de IDs

Use prefixos que façam sentido pro seu projeto. Sugestão de base:
- **Épicos/histórias herdadas de um roadmap:** mantêm o ID original (ex.: `E1..E6`, `H1.1`, `H2.1`).
- **Item novo** (não previsto no roadmap): prefixo `X-` + sequencial (ex.: `X-01`), com nota da origem.
- **Item de fase posterior** (ex.: pós-lançamento, escala): prefixo próprio (ex.: `PM-01`), specs em `post-mvp/` ou similar.

O ponto não são os prefixos exatos — é que **todo item tenha um ID estável** pra amarrar trabalho↔status↔código.

## Formato de `roadmap/status.md`

- Topo: bloco **"AGORA / próximas 2 semanas"** — 5-10 linhas do foco atual (o que se lê primeiro).
- Corpo: tabela `ID | título | status | evidência | nota`, agrupada por sprint/épico/frente.
- **Mantenha as linhas enxutas** — 1 linha por item, detalhe gordo mora no PR/spec linkado, não inline.
  (O status incha rápido se virar ensaio; resista.) Sprints 100% concluídos → arquivar (ver convenções).

## Anti-fragmentação: linkar, não duplicar

A "verdade" do projeto tende a se espalhar. Concentre **status** aqui; o resto vive onde já mora e é
**linkado**:

| Fonte | Papel | Mora em |
|---|---|---|
| `roadmap/status.md` | **canônico** de status | este repo |
| decisões arquiteturais (ADRs) | porquê das escolhas | `decisions/` (ou linkado de onde vivem) |
| specs / plans | design de features | `specs/` · `plans/` |
| débito técnico | dívida de infra/código | seu rastreador — referenciado na nota |
| código | a implementação | repos de código — linkados por PR# na evidência |

## Linkando PR ↔ item

Na coluna evidência, referencie o PR/commit do repo de código (ex.: `#16`, `api#42`, ou o SHA quando não
houve PR). Isso dá a trilha auditável **do roadmap até o código** — o coração do Paddock.

## Git — versionamento & branches (simples de propósito)
Modelo **trunk-based**, não gitflow:
- **`main` sempre verde/deployável.** Trabalho em **branch curto** por item (`feat/<id>-slug`,
  `fix/<id>-slug`); vida de horas/dias, não semanas.
- **PR pra entrar em `main`** (auto-revisão honesta conta em time solo). Squash-merge ≈ 1 unidade rastreável.
- **Tag o ID no commit/PR de código** (`feat(api): ... [E1]`) → fecha a trilha roadmap↔código. (Sem isso o
  histórico vira não-rastreável — é o guardrail de rastreabilidade mais barato que existe.)
- **Sem commit direto na `main`:** todo trabalho entra por **branch → PR**. Force isso por mecanismo —
  branch protection no servidor (grátis em repo público; pago em privado) **ou** o git hook
  `tools/install-guard.sh` (fallback local). Ver *Sessões paralelas* abaixo.
- **Sessões paralelas (vários agentes/devs):** uma **branch/worktree por sessão** + claim em
  `current_sessions/` (ver seção dedicada) — pra não atropelar edições, principalmente no `status.md`.
- **Versão do produto (opcional):** quando publicar releases, use **semver + tag + CHANGELOG.md**. Não antes —
  pré-release não precisa de cerimônia de versão.

Evite: gitflow completo (develop/release/hotfix), branches longos, merge sem PR. Trunk-based cobre 95% dos casos sem o peso.

## Sessões paralelas (multi-agente / multi-dev)

Quando N sessões (devs e/ou agentes de IA) trabalham juntas, o ritual single-thread não basta — o
`status.md` vira ponto de colisão. Dois planos resolvem:

- **`current_sessions/`** — estado **vivo**: **1 arquivo por sessão** ativa (dono único → zero colisão).
  Quem faz o quê **agora**. Ver [`current_sessions/README.md`](current_sessions/README.md).
- **`roadmap/status.md`** — registro **durável**: o que foi entregue + evidência. Escrito **1× no fechamento**
  da sessão e **lido sempre junto** com `current_sessions/`.

Regras: **worktree por sessão** (sem git destrutivo em clone compartilhado) · **1 branch → 1 PR**
(auto-delete on merge) · registrar a sessão em `current_sessions/` **antes** de trabalhar · `main` só por PR
(branch protection server-side onde der; senão o hook `tools/install-guard.sh`).

Protocolo completo (lifecycle + enforcement): [`docs/parallel-sessions.md`](docs/parallel-sessions.md).

## Status report visual

Quando pedirem "panorama / relatório visual", use [`roadmap/status-report-template.md`](roadmap/status-report-template.md)
(ou rode `bash tools/report.sh`). Mesmo formato sempre. Dado vem do `status.md`; o template é só apresentação.

## Adapter Claude Code (opcional)

O core é agnóstico (markdown + git). Se você usa **Claude Code**, vale apontar o `CLAUDE.md` do seu projeto
pra este repo como "hub de status" e instruir o agente a seguir este ritual no início/fim de cada sessão.
O mesmo vale pra Cursor/Aider/etc — qualquer agente que leia/escreva arquivos do repo.
