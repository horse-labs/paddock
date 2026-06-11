# Status Report — template visual (terminal)

Formato canônico do **panorama gráfico** do roadmap, pra plotar no terminal quando alguém pede "relatório
visual / panorama / status report" (em vez de ler o `status.md` corrido). Derivado do `status.md`
(fonte canônica) — este arquivo é só o **molde de apresentação**, não dado.

## Como gerar
1. Atualizar/ler [`status.md`](./status.md).
2. Contar marcadores p/ as barras:
   ```bash
   grep -oE "\| (✅|🟡|🔵|❌|⏸) \|" roadmap/status.md | sort | uniq -c
   ```
3. Listar pendentes (❌) e gargalos (🟡):
   ```bash
   grep -oE "^\| [A-Za-z0-9./-]+ \| [^|]+\| ❌ \|" roadmap/status.md
   ```
4. Preencher os `{placeholders}` abaixo. Emitir cada bloco em **code block** (monospace alinha as caixas).

## Regras de render
- Largura ~68 colunas (cabe em terminal padrão).
- Barra de progresso = 18–20 células: `█` cheio · `░` vazio. `%` = feito/total da seção.
- Legenda de status: **✅** feito · **🟡** parcial · **🔵** divergente-ok · **❌** pendente · **⏸** pós-MVP · **◑** spike/decisão.
- Caixas com `╔═╗`/`╠═╣`/`╚═╝` (banner) e `┌─┐`/`└─┘` (sub-blocos). Régua de seção = `─`.
- Tom: mínimo de prosa. Fechar com 1–2 linhas "leitura rápida" + "maior alavanca" + pergunta de próximo passo.

---

## Esqueleto (copiar e preencher)

```
╔══════════════════════════════════════════════════════════════════╗
║   {ORG} · {PRODUTO} — PANORAMA DO ROADMAP   {AAAA-MM-DD}          ║
╠══════════════════════════════════════════════════════════════════╣
║  {subtítulo: fase / ambiente / proposta}                          ║
╚══════════════════════════════════════════════════════════════════╝

  STATUS GERAL ({N} itens rastreados)
  ✅ feito ........ {n}  {████░░░░ barra}  {p}%
  🟡 parcial ...... {n}  {barra}          {p}%
  ❌ pendente ..... {n}  {barra}          {p}%
  ⏸  pós-MVP ......  {n}  {barra}          {p}%
  🔵 divergente ...  {n}                   (ok)
```

```
  SPRINTS / FRENTES                          progresso
  ─────────────────────────────────────────────────────────────────
  {Sprint/frente}   {ícones dos itens}      {barra} {p}%
  ...
  ★ {marco entregue}              ✅ NO AR   {barra cheia} 100%
```

```
  ★ ÉPICO {ID} — {NOME}                        {ESTADO}
  ─────────────────────────────────────────────────────────────────
  {GRUPO}      {item ID + status} ...
  ...
  entregue {barra}  ~{x} de ~{y} pts ({p}%)
  PRs: {refs} · {estado de deploy}
```

```
  ❌ PENDENTES (fora do que já tá no ar)
  ─────────────────────────────────────────────────────────────────
  {categoria}   {❌/🟡 item} · {item} ...
  ...
```

```
  GO / NO-GO ({critério})              VELOCITY
  ──────────────────────────────      ─────────────────────────
  {critério} ... {✅/🟡/❌}            baseline ~{v} pts/semana
  ...                                  backlog restante ~{p} pts
  ──────────────────────────────      ┌──────────────────────┐
  GATE: {x}✅ · {y}🟡 · {z}❌          │ {bloco}  ~{pts} │ ~{sem}
                                       └──────────────────────┘
```

```
  ⏸ PÓS-MVP (designs prontos, parados até {gatilho})
  ─────────────────────────────────────────────────────────────────
  {PM-NN / X-NN itens} ...
  🟦 PARALELO ATIVO (se houver): {frente concorrente}
```

> **Leitura rápida:** {1 frase do estado}. **Buracos reais:** {gargalos}. **Maior alavanca:** {recomendação + esforço}.
> {pergunta de próximo passo}

---

## Exemplo preenchido
Gere um com `bash tools/report.sh` sobre o seu `roadmap/status.md` preenchido. O script lê os marcadores
e emite os blocos acima já populados.
