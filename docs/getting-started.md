# Getting started

Adotar o Paddock em ~10 minutos.

> **Antes:** entenda a topologia do workspace (`~/workspace/` com paddock + repos + `_knowledge/`) em
> [`workspace-setup.md`](workspace-setup.md). É o modelo mental que faz tudo funcionar.

## 1. Criar seu repo a partir do template
- No GitHub: botão **"Use this template"** → `seu-org/seu-projeto-workbench` (privado).
- Ou: `gh repo create seu-org/seu-projeto-workbench --private --template horse-labs/paddock`.

## 2. Rodar o setup
```bash
git clone <seu-repo> && cd <seu-repo>
bash setup.sh
```
O `setup.sh`:
- troca os `{PLACEHOLDERS}` (nome do projeto) pelos seus;
- limpa as linhas de exemplo do `status.md`;
- roda um check anti-vazamento (garante que você não herdou conteúdo de outra instância);
- valida o esqueleto com `tools/lint-status.sh`.

## 3. Semear o status
Abra `roadmap/status.md`:
- preencha o bloco **"AGORA"** com seu foco atual;
- crie as primeiras linhas (1 por item) com `ID | título | status | evidência | nota`.
- IDs: ver [`conventions.md`](conventions.md).

## 4. Adotar o ritual
A cada sessão de trabalho, siga [`../FRAMEWORK.md`](../FRAMEWORK.md): ler status ao abrir, amarrar trabalho
a um ID, atualizar status + evidência ao fechar. Se usa um agente de IA (Claude Code/Cursor/Aider),
aponte a config dele pra este repo como "hub de status" (ver [`session-ritual.md`](session-ritual.md)).

## 5. Ver o panorama
```bash
bash tools/report.sh        # panorama visual (ASCII) do status atual
bash tools/lint-status.sh   # checa integridade (marcador↔nota, evidência)
```

Pronto. A partir daqui o `status.md` é sua memória viva — versionada, auditável, lida e escrita por
humanos e agentes.
