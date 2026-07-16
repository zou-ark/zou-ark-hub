(() => {
  const config = window.ZOU_ONLINE || {};
  const dialog = document.querySelector('#admin-login-dialog');
  const open = document.querySelector('#admin-login-open');
  const close = document.querySelector('#admin-login-close');
  const form = document.querySelector('#admin-login-form');
  const panel = document.querySelector('#admin-panel');
  const logout = document.querySelector('#admin-logout');
  if (!dialog || !open) return;
  open.addEventListener('click', () => dialog.showModal());
  close.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!config.enabled) {
      dialog.close();
      panel.hidden = false;
      panel.querySelector('p').textContent = '当前是本地演示版；接入 Supabase 后，这里会启用真实管理员验证。';
      return;
    }
    dialog.close();
  });
  logout.addEventListener('click', () => { panel.hidden = true; });
})();
