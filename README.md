# meza · landing page

“a mesa é de todos.”

Página que recebe quem viu a campanha de rua do MEZA (o cartaz “Sempre cabe mais um.” e o mupi “Puxa uma cadeira, DF.”), explica o que o projeto faz e leva ao app, em https://meza-olive.vercel.app.

Projeto acadêmico do Ibmec Brasília. O protótipo do app fica na pasta vizinha `meza-app`.

## Abrir

Dê dois cliques em `index.html`. É HTML e CSS puros, sem etapa de build. O único JavaScript é o que abre o menu no celular.

O desenho da página está no pen.dev (`meza-lp.pen`), nos frames “MEZA — Desktop”, “MEZA — Mobile” e “MEZA — Mobile Menu aberto”. Abaixo de 960 px de largura vale o desenho de celular.

## Estrutura

| Caminho | Conteúdo |
| --- | --- |
| `index.html` | A página inteira, com os textos, os ícones (Lucide, num sprite SVG) e as telas ilustradas do app |
| `src/styles.css` | Estilos. Os tokens de cor no `:root` têm os mesmos nomes das variáveis do desenho |
| `src/menu.js` | Abre e fecha o menu de tela cheia do celular |
| `assets/` | Capturas do protótipo. A página não as usa mais: as telas da seção “Do cadastro à vaga reservada” agora são desenhadas em HTML |
| `scripts/capturas.mjs` | Refaz as capturas de `assets/` a partir de `../meza-app` |
| `tests/smoke.mjs` | Confere seções, botões, dados, ilustrações, menu, tamanhos mínimos e rolagem horizontal |
| `docs/superpowers/` | Desenho e plano da página |

## Desenvolvimento

```bash
npm install
npx playwright install chromium   # só na primeira vez
npm test                          # confere a página
npm run capturas                  # refaz as telas do app, se o protótipo mudar
```

Para trocar o endereço do app, substitua `https://meza-olive.vercel.app` em `index.html` e em `tests/smoke.mjs`.
