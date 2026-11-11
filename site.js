(() => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.getElementById('site-nav');
  if (!toggle || !nav) return;

  const closeMenu = () => {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation menu');
    nav.classList.remove('is-open');
    nav.querySelectorAll('.nav-item.submenu-open').forEach((item) => {
      item.classList.remove('submenu-open');
      const button = item.querySelector('.submenu-toggle');
      if (button) {
        button.setAttribute('aria-expanded', 'false');
        button.setAttribute('aria-label', `Open ${item.querySelector(':scope > a').textContent.trim()} submenu`);
        button.textContent = '+';
      }
    });
  };
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    nav.classList.toggle('is-open', open);
  });
  nav.addEventListener('click', (event) => {
    const submenuButton = event.target.closest('.submenu-toggle');
    if (submenuButton) {
      const item = submenuButton.closest('.nav-item');
      const open = !item.classList.contains('submenu-open');
      item.classList.toggle('submenu-open', open);
      submenuButton.setAttribute('aria-expanded', String(open));
      const name = item.querySelector(':scope > a').textContent.trim().replace('⌄', '').trim();
      submenuButton.setAttribute('aria-label', `${open ? 'Close' : 'Open'} ${name} submenu`);
      submenuButton.textContent = open ? '−' : '+';
      return;
    }
    if (event.target.closest('a')) closeMenu();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMenu();
      toggle.focus();
    }
  });
  document.addEventListener('click', (event) => {
    if (!nav.contains(event.target) && !toggle.contains(event.target)) closeMenu();
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) closeMenu();
  });
})();

