# Landing page do MEZA: plano de implementação

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Uma página estática que explica o MEZA a quem vem da campanha de rua e leva ao app.

**Architecture:** `index.html` + `src/styles.css` + `src/script.js`, sem framework e sem build. Os tokens de design são copiados de `meza-app/src/styles.css`. Um teste de fumaça em Playwright confere a página; um script à parte captura as telas do protótipo.

**Tech Stack:** HTML, CSS, JavaScript puros; Google Fonts (Outfit, Poppins); Playwright 1.63.0 só para teste e capturas.

**Spec:** `docs/superpowers/specs/2026-11-16-landing-page-design.md`

## Global Constraints

- Endereço do app em todos os botões: `https://meza-olive.vercel.app`
- Nunca "Baixe o app"; os botões dizem "Quero ajudar", "Abrir o app" ou "Cadastrar organização".
- Só os dados da apresentação: 27% (2024), 23,5% (2023), 845 mil, 24,2% e 27,6% (Brasil), com fonte.
- Contraste mínimo de 4,5:1, alvos de toque de 44 px, nada abaixo de 12 px, sem rolagem horizontal em 320 px.
- Tema claro apenas. Textos em português do Brasil.

## Review Focus

- Tela de 320 px: nenhum elemento pode transbordar.
- JavaScript desligado ou com erro: todo o conteúdo continua visível (a animação de entrada não pode esconder nada).
- "Reduzir movimento" ligado no sistema: sem animações.
- Fontes do Google não carregam: a página continua legível com as fontes de reserva.
- Imagens das telas não carregam: o texto alternativo descreve cada passo.

---

### Task 1: Teste de fumaça e esqueleto

**Files:** Create `package.json`, `tests/smoke.mjs`, `index.html`, `src/favicon.svg`

- [ ] `tests/smoke.mjs` abre `index.html` em 390 × 844 e confere: nenhum erro de JavaScript; existem `#por-que`, `#o-que-fazemos`, `#como-ajudar`, `#no-app`, `#organizacoes`, `#nome`; todo `a.btn` aponta para `https://meza-olive.vercel.app`; o texto não contém "Baixe o app"; em 320 px `scrollWidth <= clientWidth`; com JavaScript desligado nenhuma seção fica com opacidade 0; toda `img` tem `alt` e carregou.
- [ ] Rodar `npm test`: falha, porque a página ainda não existe.

### Task 2: Capturas do protótipo

**Files:** Create `scripts/capturas.mjs`, `assets/tela-cadastro.png`, `assets/tela-acao.png`, `assets/tela-confirmada.png`

- [ ] O script abre `../meza-app/index.html` em 390 × 844 (escala 2), percorre cadastro → detalhe da ação com posto e turno escolhidos → "Vaga reservada!" e salva as três telas.

### Task 3: A página

**Files:** Create `src/styles.css`, `src/script.js`; modify `index.html`

- [ ] As dez partes da tabela "A página" do desenho, na ordem.
- [ ] `script.js`: só a entrada das seções ao rolar, ligada por uma classe `js` no `<html>`.
- [ ] Rodar `npm test`: passa.

### Task 4: Conferência visual

- [ ] Capturar a página inteira em 390 px e 1280 px, olhar e corrigir o que estiver errado.
- [ ] `README.md` com como abrir e como testar.
