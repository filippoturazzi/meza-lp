# Landing page do MEZA: desenho

Data: 16/11/2026 · Entrega acadêmica (Design Gráfico e User Experience, Ibmec Brasília)

## Intenção

A landing page é o elo entre a campanha de rua e o app. Quem vê o cartaz "Sempre cabe mais um." ou o mupi "Puxa uma cadeira, DF." chega pelo celular sem saber o que é o MEZA. Em cerca de um minuto, a página explica o que o MEZA faz e leva a pessoa ao app para se voluntariar.

## Objetivos

- Explicar a proposta: ligar quem quer ajudar (tempo, alimentos ou dinheiro) a organizações que já entregam comida a quem precisa no DF.
- Dar o motivo com os dados reais da pesquisa do grupo.
- Levar ao app com uma chamada clara e repetida.
- Parecer a mesma marca das peças de rua e do app.

## Fora do escopo

- Cadastro, formulário ou qualquer coleta de dados na própria página.
- Back end, analytics, blog, área de imprensa.
- Modo escuro (o app também só tem tema claro).

## O que faria a página falhar

- Inventar números de impacto, depoimentos ou parceiros. Só entram os dados da apresentação, com fonte.
- Dizer "Baixe o app": o app é web. A chamada é "Quero ajudar" ou "Abrir o app".
- Ficar boa só no computador. Quem vem da rua está no celular.

## Restrições

- Mesma base do app: HTML, CSS e JavaScript puros, sem framework e sem etapa de build.
- Mesmos tokens de `meza-app/src/styles.css`: verde `#194B35`, amarelo `#E9B96E`, terracota `#D17C5B`, creme `#F5F1E7`; Outfit (títulos, espaçamento de -5%) e Poppins (texto); faixa xadrez terracota.
- Contraste mínimo de 4,5:1 em todo texto, alvos de toque de 44 px, nada abaixo de 12 px, sem transbordar em 320 px.
- Textos em português do Brasil.

## Abordagens consideradas

1. **Página estática própria em `meza-lp`, publicada à parte (escolhida).** Um `index.html` com `styles.css` e um `script.js` pequeno. Copia os tokens do app. Não mexe no repositório do protótipo, que tem testes e build próprios. Custo: os tokens ficam duplicados em dois lugares.
2. **LP dentro do repositório do app, com o app em `/app`.** Um endereço e uma publicação só. Custo: muda caminhos, build e teste de fumaça de um repositório compartilhado, com risco para o protótipo às vésperas da entrega.
3. **Framework (Astro ou Next).** Não se paga para uma página só e foge do padrão do app.

A 1 foi escolhida por mim (Claude), já que o pedido falava do resultado e não da tecnologia.

## A página

Uma página só, de rolagem, pensada primeiro para o celular.

| # | Seção | Conteúdo |
| --- | --- | --- |
| 0 | Barra | Logotipo "meza" e o botão "Quero ajudar". Fica fixa no topo. |
| 1 | Abertura (verde) | "Puxa uma cadeira, DF.", o mesmo título do mupi, para a pessoa reconhecer de onde veio. Uma frase que explica o MEZA. Botão "Quero ajudar" e link "Como funciona". Faixa xadrez na base. |
| 2 | Por quê | "No DF, a fome cresceu na contramão do país": 27% dos lares com insegurança alimentar em 2024 (eram 23,5% em 2023); 845 mil pessoas; Brasil caiu de 27,6% para 24,2%. Fontes na própria seção. |
| 3 | O que fazemos | A virada do projeto em linguagem simples: já existe quem entrega; o MEZA liga você a elas. Três papéis: quem ajuda, quem entrega, quem recebe. |
| 4 | Três jeitos de ajudar | Seu tempo (cozinhar, montar, servir), Alimentos (item e quantidade, entrega na sede ou ponto de coleta), Dinheiro (Pix, cartão ou em mãos). Mesmos três do cartaz A3. |
| 5 | Como é no app | Três passos com telas reais do protótipo: cadastre-se e diga como quer ajudar; escolha a ação, o posto e o turno; receba a confirmação. Botão "Abrir o app". |
| 6 | Para organizações | "Sua organização já entrega refeições?" Publicar ações e receber voluntários e doações. Link "Cadastrar organização" para o app. |
| 7 | O nome | Mobilização, Empatia, Zelo, Alimentação, com as iniciais em destaque, e "a mesa é de todos." |
| 8 | Fechamento (verde) | "Sempre cabe mais um.", o título do cartaz. Botão "Quero ajudar". |
| 9 | Rodapé | Projeto acadêmico do Ibmec Brasília, autores, fontes dos dados, aviso de que o app é um protótipo. |

## Decisões minhas (Claude), para conferir

- Os botões abrem `https://meza-olive.vercel.app`, o endereço que consta no repositório do app.
- As telas da seção 5 são capturas do protótipo real, tiradas com o Playwright que o app já usa, e não desenhos refeitos.
- O aviso de protótipo acadêmico fica só no rodapé, discreto, para a página se comportar como real na apresentação.
- Movimento mínimo: entrada suave das seções ao rolar, desligada para quem pede menos movimento no sistema.
- Publicação na Vercel como projeto separado fica para depois da página pronta e só com o seu aval.

## O que fica com quem constrói

Redação final dos textos, ícones (Lucide, como no app), proporções e a ordem fina dos elementos dentro de cada seção.
