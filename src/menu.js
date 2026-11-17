// Menu de tela cheia do celular: abre e fecha o <dialog id="menu">.
const menu = document.getElementById('menu');
const abrir = document.querySelector('[data-menu-abrir]');

if (menu && abrir && typeof menu.showModal === 'function') {
  const estado = aberto => {
    abrir.setAttribute('aria-expanded', String(aberto));
    document.documentElement.classList.toggle('menu-aberto', aberto);
  };

  estado(false);
  abrir.addEventListener('click', () => { menu.showModal(); estado(true); });
  menu.addEventListener('close', () => estado(false));
  menu.addEventListener('click', e => {
    if (e.target.closest('[data-menu-fechar], a[href^="#"]')) menu.close();
  });

  // Se a janela crescer até o desenho de desktop com o menu aberto, ele se fecha.
  matchMedia('(min-width: 960px)').addEventListener('change', e => { if (e.matches && menu.open) menu.close(); });
}
