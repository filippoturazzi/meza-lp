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

  await passo('as ilustrações têm texto alternativo', async () => {
    const figs = await page.locator('[role="img"]').evaluateAll(els => els.map(e => ({ c: e.getAttribute('class'), l: e.getAttribute('aria-label'), w: e.getBoundingClientRect().width })));
    assert.ok(figs.filter(f => f.c === 'tela').length === 3, 'esperava as três telas do app');
    for (const f of figs) { assert.ok(f.w > 0, `${f.c} não aparece`); assert.ok(f.l && f.l.length > 10, `${f.c} sem texto alternativo`); }
  });

  await passo('nada abaixo de 12 px e botões com 44 px de altura', async () => {
    // As telas do app são ilustração (a figure tem o rótulo), então o texto miúdo delas não conta.
    const pequenos = await page.evaluate(() => [...document.querySelectorAll('body *')]
      .filter(el => [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim()) && !el.closest('svg, .tela, dialog:not([open])') && parseFloat(getComputedStyle(el).fontSize) < 12)
      .map(el => el.tagName + '.' + el.className));
    assert.deepEqual(pequenos, []);
    const baixos = await page.locator('a.btn:visible').evaluateAll(els => els.filter(a => a.getBoundingClientRect().height < 44).map(a => a.textContent.trim()));
    assert.deepEqual(baixos, []);
  });

  await passo('o menu do celular abre, leva à seção e fecha', async () => {
    const menu = page.locator('#menu');
    assert.equal(await menu.isVisible(), false);
    await page.locator('[data-menu-abrir]').click();
    assert.equal(await menu.isVisible(), true);
    assert.equal(await page.locator('#menu .menu-links a').count(), 5);
    const baixos = await page.locator('#menu a.btn').evaluateAll(els => els.filter(a => a.getBoundingClientRect().height < 44).length);
    assert.equal(baixos, 0);
    await page.locator('#menu a[href="#no-app"]').click();
    assert.equal(await menu.isVisible(), false);
    assert.ok(page.url().endsWith('#no-app'));
    await page.locator('[data-menu-abrir]').click();
    await page.locator('[data-menu-fechar]').click();
    assert.equal(await menu.isVisible(), false);
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
