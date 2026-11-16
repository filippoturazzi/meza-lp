# meza · landing page

“a mesa é de todos.”

Página que recebe quem viu a campanha de rua do MEZA (o cartaz “Sempre cabe mais um.” e o mupi “Puxa uma cadeira, DF.”), explica o que o projeto faz e leva ao app, em https://meza-olive.vercel.app.

Projeto acadêmico do Ibmec Brasília. O protótipo do app fica na pasta vizinha `meza-app`.

## Abrir

Dê dois cliques em `index.html`. É HTML e CSS puros, sem etapa de build e sem JavaScript.

## Estrutura

| Caminho | Conteúdo |
| --- | --- |
| `index.html` | A página inteira, com os textos |
| `src/styles.css` | Estilos. Os tokens de cor e fonte no `:root` são os mesmos de `meza-app/src/styles.css` |
| `assets/` | Telas do protótipo usadas na seção “Do cadastro à vaga reservada” |
| `scripts/capturas.mjs` | Refaz as telas de `assets/` a partir de `../meza-app` |
| `tests/smoke.mjs` | Confere seções, botões, dados, imagens, tamanhos mínimos e rolagem horizontal |
| `docs/superpowers/` | Desenho e plano da página |

## Desenvolvimento

```bash
npm install
npx playwright install chromium   # só na primeira vez
npm test                          # confere a página
npm run capturas                  # refaz as telas do app, se o protótipo mudar
```

Para trocar o endereço do app, substitua `https://meza-olive.vercel.app` em `index.html` e em `tests/smoke.mjs`.
