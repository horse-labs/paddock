# Workspace setup — o modelo mental (leia primeiro)

Paddock **não é uma ilha**. Ele vive numa **raiz de trabalho** ao lado dos repos de código e do material
bruto do projeto. É essa co-locação que dá poder ao agente de IA: de um único lugar ele cruza
**memória estruturada** (paddock) + **implementação** (os repos) + **matéria-prima** (o entulho do projeto).

## Topologia
```
  ~/workspace/                 ← raiz; seu agente (Claude Code/Cursor/…) roda DAQUI
  ├── paddock/                 ← MEMÓRIA estruturada do projeto (este framework)
  ├── repo-a/                  ← repo de código do projeto
  ├── repo-b/                  ← outro repo de código
  └── _knowledge/              ← INTAKE bruto: pdf, .md, transcrições de reunião, drawio, prints…
```
**1 `~/workspace` = 1 projeto.** Tudo do projeto mora sob a mesma raiz.

## Por que assim
- **Co-locação = contexto.** O agente lê `paddock/` (o que foi decidido/feito), os repos (o código real)
  e `_knowledge/` (o porquê bruto) no mesmo passe. Sem isso, o contexto fica fragmentado.
- **Evidência cross-repo funciona.** Na coluna evidência do `status.md`, `repo-a#42` faz sentido — o repo
  está ali do lado.
- **Paddock vira refinaria.** O entulho desestruturado em `_knowledge/` é **destilado** em estrutura
  (`specs/`, `decisions/`, `status.md`). Da bagunça → governança (ver "Ritual de ingest" abaixo).

## Setup (uma vez)
```bash
mkdir -p ~/workspace && cd ~/workspace

# 1. a memória (este framework) — via template no GitHub ou clone
gh repo create sua-org/projeto-workbench --private --template horse-labs/paddock
git clone <sua-org/projeto-workbench> paddock && (cd paddock && bash setup.sh "Meu Projeto")

# 2. os repos de código do projeto
git clone <repo-a> repo-a
git clone <repo-b> repo-b

# 3. o intake bruto (NÃO é repo git — é dump local privado)
mkdir _knowledge   # jogue aqui pdf/transcrições/drawio/exports do Drive…

# 4. config do agente na raiz — o setup.sh JÁ gera ~/workspace/AGENTS.md automaticamente.
#    (pra Claude Code, copie como CLAUDE.md; pra Copilot por-repo, .github/copilot-instructions.md)
```

## `_knowledge/` — regras
- **Bruto e privado.** Transcrições, PDFs, prints — possivelmente sensível.
- **Nunca commitado no `paddock/`.** É dir-**irmão**, não fica dentro do framework. É intake efêmero,
  não memória curada. (Se quiser versionar, use um store privado separado — não o paddock.)
- É **entrada**, não saída. A saída curada vive no `paddock/` (specs/decisions/status).

## Ritual de ingest (refinaria) — bruto → estruturado
1. Material novo cai em `_knowledge/` (reunião, doc, diagrama).
2. Numa sessão, o agente **lê o bruto** e **destila**: decisão → `decisions/`; design → `specs/`;
   trabalho a fazer → item(ns) no `roadmap/status.md` (com ID); contexto durável → onde couber.
3. O `_knowledge/` pode ser podado depois — o que importa já virou memória estruturada e linkada.

Esse é o on-ramp do Paddock: **transforma o caos do projeto em governança rastreável.**

## Config do agente (funciona com qualquer um)
O agente precisa saber a topologia. O `setup.sh` gera **`~/workspace/AGENTS.md`** automaticamente a partir
de [`workspace-AGENTS.md.example`](./workspace-AGENTS.md.example) (não sobrescreve se já existir).
`AGENTS.md` é a lingua franca lida por vários agentes. Mapa por ferramenta:

| Ferramenta | Onde o adapter mora | Nota |
|---|---|---|
| **GitHub Copilot** (CLI / VS Code agent) | `AGENTS.md` na raiz (cwd) | + por-repo: `<repo>/.github/copilot-instructions.md` |
| **Claude Code** | `CLAUDE.md` na raiz | copie o `AGENTS.md` p/ `CLAUDE.md` |
| **Cursor** | `.cursorrules` ou `AGENTS.md` | — |
| **Codex / outros** | `AGENTS.md` | padrão emergente |
| **qualquer** | — | o core é markdown+git; o agente lê os arquivos de qualquer jeito |

⚠️ O **agente de coding hospedado do Copilot** (autônomo em issue/PR) é **escopado a 1 repo** — não vê os
repos-irmãos nem `_knowledge/`. A co-locação multi-repo brilha nas superfícies **locais** (Copilot CLI/VS Code,
Claude Code, Cursor). Pro agente hospedado, ponha um `.github/copilot-instructions.md` no repo apontando o
essencial do status.
