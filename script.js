const modal = document.querySelector('#modal');
const content = document.querySelector('#modal-content');
const notes = {
  preset: ['1.5 战斗优化方案', '<p>这是用于展示的第一版说明。正式发布前，将补充：适用游戏版本、导入位置、每条命令的效果和恢复默认的方法。</p><p><b>使用前请备份配置文件。</b> 不同服务器规则与游戏版本可能使部分命令失效。</p>'],
  classic: ['1.0 方案目录', '<p>已整理的方向包括：原画战斗、纯战斗、泰克头资源显示，以及特定地图的除水设置。</p><p>后续会为每套方案制作独立页面，而不是让玩家直接下载或复制未知内容。</p>'],
  ini: ['进阶配置注意事项', '<ul><li>先备份原始 INI 文件。</li><li>一次只改一组设置，并记录改动。</li><li>游戏更新后检查文件是否被覆盖。</li><li>不确定的参数不要照搬到正式账号环境。</li></ul>'],
  server: ['提交或推荐服务器', '<p>第一版暂不开放自动提交。后续建议提交内容包含：服务器名称、玩法、地图、倍率、开服时间、管理规则、联系渠道和是否为合作推广。</p>'],
  promo: ['合作推广说明', '<p>合作服务器会与普通整理内容明确区分，并保留规则透明度、稳定性和玩家反馈等审核标准。具体展示形式和价格在网站正式运营后再确定。</p>'],
  quality: ['1.5 战斗画质代码', '<p>包含基础战斗画质代码、参数解释和畸变专用方案。使用前请备份原文件；游戏更新或服务器规则可能导致部分参数无效。</p><ul><li><a href="downloads/ark-1.5-quality-01.txt" download>下载 1.5 画质代码 01</a></li><li><a href="downloads/ark-1.5-parameter-guide.txt" download>下载参数解释</a></li><li><a href="downloads/ark-1.5-aberration.txt" download>下载畸变专用方案</a></li></ul>'],
  settings: ['1.0 / 1.5 游戏设置', '<p>资料包内含按图设置的 1.0 与 1.5 游戏画面、键盘设置截图。下一步会将这些截图做成逐项图文页，避免玩家盲目照搬。</p>'],
  teleport: ['飞雷神实战教学', '<p>流程包括抓狗定位、右键时机、切换自爆武器与接触目标后的操作。该内容适合熟悉相关玩法、并遵守服务器规则的玩家。</p><p><a href="downloads/ark-teleport-guide.txt" download>下载飞雷神教学文字版</a></p>'],
  translate: ['1.0 双语汉化安装', '<p>安装说明：将补丁文件放入 <code>ARK Survival Ascended\\ShooterGame\\Content\\Paks</code>，无需改名。</p><p>为避免分发来源不明的游戏文件，本站只提供安装说明，不直接提供补丁下载。</p><p><a href="downloads/ark-bilingual-install.txt" download>下载安装说明</a></p>']
};
document.querySelectorAll('[data-modal]').forEach(button => button.addEventListener('click', () => { const [title, body] = notes[button.dataset.modal]; content.innerHTML = `<h3>${title}</h3>${body}`; modal.showModal(); }));
document.querySelector('.close').addEventListener('click', () => modal.close());
modal.addEventListener('click', event => { if (event.target === modal) modal.close(); });
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
toggle.addEventListener('click', () => { const open = nav.classList.toggle('open'); toggle.setAttribute('aria-expanded', open); });
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); }));

// 方案卡片文案：保留原始资料内容，仅在页面上补充更明确的使用提示。
const presetCards = document.querySelectorAll('.preset');
if (presetCards.length >= 3) {
  presetCards[0].querySelector('ul').innerHTML = '<li>适合：对战 / 资源搜集</li><li>包含控制台命令说明</li><li>应用时注意保留原画质</li>';
  presetCards[1].querySelector('ul').innerHTML = '<li>原画战斗（Zou走走用）</li><li>资源淡化</li><li>冰宫除水等场景方案</li>';
  presetCards[2].querySelector('ul').innerHTML = '<li>1.5 开启画质（命令台粘贴）</li><li>GameUserSettings（个性化修改）</li><li>DeviceProfiles（画质目录坐标）</li><li>问题排查指引</li>';
}
const resourcesHeading = document.querySelector('#resources .section-heading h2');
if (resourcesHeading) resourcesHeading.textContent = '方舟官服地图';
const intro = document.querySelector('.hero-copy .intro');
if (intro) intro.textContent = '我是方舟 UP 主 Zou走走，持续整理战斗画质、实用设置、官服地图和值得体验的服务器。所有内容会标注适用版本与更新时间。';
const metricNote = document.querySelector('.status-card small');
if (metricNote) metricNote.innerHTML = '截至 2024 年 12 月 · 主机与 PC，非实时在线人数<br>历史 Steam 同时在线峰值：24.8 万人';
const quickResource = document.querySelector('.quick-grid a:nth-child(2)');
if (quickResource) {
  const title = quickResource.querySelector('b');
  const subtitle = quickResource.querySelector('small');
  if (title) title.textContent = '官服部落地图';
  if (subtitle) subtitle.textContent = '部落关系、势力范围与地图参考';
}
const quickCombat = document.querySelector('.quick-grid a:first-child b');
if (quickCombat) quickCombat.textContent = '战斗画质大纲';

const messageForm = document.querySelector('#message-form');
const messageList = document.querySelector('#message-list');
if (messageForm && messageList) {
  const demoMessages = [
    { name: 'Zou走走', body: '欢迎来到方舟俱乐部，留言板正在本地演示。', time: '演示留言' },
    { name: '独狼玩家', body: '希望增加更多 1.5 画质和服务器设置。', time: '演示留言' }
  ];
  let messages = JSON.parse(localStorage.getItem('zou_messages') || 'null') || demoMessages;
  const renderMessages = () => { messageList.innerHTML = messages.slice().reverse().map(message => `<article class="message"><b>${escapeHtml(message.name)}</b><time>${escapeHtml(message.time)}</time><p>${escapeHtml(message.body)}</p></article>`).join(''); };
  const escapeHtml = value => value.replace(/[&<>'"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
  renderMessages();
  messageForm.addEventListener('submit', event => { event.preventDefault(); const name = document.querySelector('#message-name').value.trim(); const body = document.querySelector('#message-body').value.trim(); if (!name || !body) return; messages.push({ name, body, time: new Date().toLocaleString('zh-CN', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' }) }); localStorage.setItem('zou_messages', JSON.stringify(messages)); messageForm.reset(); renderMessages(); });
}
