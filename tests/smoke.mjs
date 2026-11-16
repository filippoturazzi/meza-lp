// Teste de fumaça da landing page do MEZA.
// Uso: node tests/smoke.mjs
import { chromium } from 'playwright';
import { resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import assert from 'node:assert/strict';

const APP = 'https://meza-olive.vercel.app';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const url = pathToFileURL(resolve(root, 'index.html')).href;

const browser = await chromium.launch();
const erros = [];
let ok = 0;
const passo = async (nome, fn) => { await fn(); ok++; console.log(`ok  ${nome}`); };

try {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  page.on('pageerror', e => erros.push(e.message));
  await page.goto(url);
  await page.evaluate(() => document.fonts.ready);

  await passo('as seções do desenho existem', async () => {
    for (const id of ['por-que', 'o-que-fazemos', 'como-ajudar', 'no-app', 'organizacoes', 'nome'])
      assert.equal(await page.locator(`#${id}`).count(), 1, `falta a seção #${id}`);
    assert.equal(await page.locator('h1').count(), 1);
  });

  await passo('todo botão leva ao app', async () => {
    const hrefs = await page.locator('a.btn').evaluateAll(els => els.map(a => a.getAttribute('href')));
    assert.ok(hrefs.length >= 4, 'esperava pelo menos quatro chamadas para o app');
    for (const h of hrefs) assert.ok(h.startsWith(APP), `botão aponta para ${h}`);
  });

  await passo('o texto não manda baixar o app e traz os dados da pesquisa', async () => {
    const t = await page.locator('body').innerText();
    assert.doesNotMatch(t, /baixe o app/i);
    for (const dado of ['27%', '23,5%', '845 mil', '24,2%', '27,6%', 'IBGE'])
      assert.ok(t.includes(dado), `falta o dado "${dado}"`);
  });

  await passo('as imagens carregam e têm texto alternativo', async () => {
    await page.evaluate(async () => { for (const i of document.images) { i.loading = 'eager'; if (!i.complete) await new Promise(r => { i.onload = i.onerror = r; }); } });
    const imgs = await page.locator('img').evaluateAll(els => els.map(i => ({ src: i.getAttribute('src'), alt: i.getAttribute('alt'), w: i.naturalWidth })));
    assert.ok(imgs.length >= 3);
    for (const i of imgs) { assert.ok(i.w > 0, `${i.src} não carregou`); assert.ok(i.alt && i.alt.length > 10, `${i.src} sem texto alternativo`); }
  });

  await passo('nada abaixo de 12 px e botões com 44 px de altura', async () => {
    const pequenos = await page.evaluate(() => [...document.querySelectorAll('body *')]
      .filter(el => [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim()) && !el.closest('svg') && parseFloat(getComputedStyle(el).fontSize) < 12)
      .map(el => el.tagName + '.' + el.className));
    assert.deepEqual(pequenos, []);
    const baixos = await page.locator('a.btn').evaluateAll(els => els.filter(a => a.getBoundingClientRect().height < 44).map(a => a.textContent.trim()));
    assert.deepEqual(baixos, []);
  });

  for (const w of [320, 390, 768, 1280]) {
    await passo(`sem rolagem horizontal em ${w} px`, async () => {
      await page.setViewportSize({ width: w, height: 800 });
      const d = await page.evaluate(() => ({ s: document.documentElement.scrollWidth, c: document.documentElement.clientWidth }));
      assert.ok(d.s <= d.c, `conteúdo com ${d.s} px numa janela de ${d.c} px`);
    });
  }

  assert.deepEqual(erros, [], 'erros de JavaScript na página');
  console.log(`\n${ok} verificações passaram.`);
} catch (e) {
  console.error(`\nFALHOU: ${e.message}`);
  process.exitCode = 1;
} finally {
  await browser.close();
}
