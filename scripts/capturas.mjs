// Captura três telas do protótipo (../meza-app) para a seção "Como é no app".
// Uso: node scripts/capturas.mjs
import { chromium } from 'playwright';
import { resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const app = pathToFileURL(resolve(root, '..', 'meza-app', 'index.html')).href;
const foto = (page, nome) => page.screenshot({ path: resolve(root, 'assets', nome), animations: 'disabled' });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
await page.goto(app);
await page.evaluate(() => document.fonts.ready);

await page.click('[data-a="start-vol"]');
await page.click('[data-a="fill-vol1"]');
await page.click('[data-a="vol-next"]');
await page.click('[data-a="fill-vol2"]');
// rola até a pergunta "Como você quer ajudar?", que é o assunto do primeiro passo
await page.getByText(/^Como voc. quer ajudar\?$/).first().evaluate(alvo => {
  const sc = alvo.closest('.scroll');
  sc.lastElementChild.style.paddingBottom = '600px'; // folga para a pergunta poder subir até o topo
  sc.scrollTop += alvo.getBoundingClientRect().top - sc.getBoundingClientRect().top - 20;
});
await page.waitForTimeout(400);
await foto(page, 'tela-cadastro.png');

await page.click('[data-a="vol-finish"]');
await page.click('[data-a="vol-explore"]');
await page.click('.tab:has-text("Ações")');
await page.click('.evr >> nth=0');
await page.click('.rrow[data-p$=".posto"]:not([disabled]) >> nth=0');
await page.click('.rrow[data-p$=".turno"] >> nth=0');
await page.waitForTimeout(400);
await foto(page, 'tela-acao.png');

await page.click('[data-a="inscrever"]');
await page.waitForTimeout(400);
await foto(page, 'tela-confirmada.png');

await browser.close();
console.log('Telas salvas em assets/.');
