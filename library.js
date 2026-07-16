(() => {
  const filters = document.querySelector('.library-filters');
  const grid = document.querySelector('.library-grid');
  const dialog = document.querySelector('#modal');
  const dialogContent = document.querySelector('#modal-content');

  const entries = [
    { category: '画质代码', kind: 'DOWNLOADS', title: '1.5 战斗画质代码', count: '8 个文本文件', description: '基础代码、四套预设、参数解释、畸变专用、进服动画与黑色 UI 设置。', action: 'open', assets: [
      ['1.5 画质代码 01', 'downloads/ark-1.5-quality-01.txt', 'TXT'], ['1.5 画质代码 02', 'downloads/quality-15/preset-02.txt', 'TXT'], ['1.5 画质代码 03', 'downloads/quality-15/preset-03.txt', 'TXT'], ['1.5 画质代码 04', 'downloads/quality-15/preset-04.txt', 'TXT'], ['参数英文解释', 'downloads/ark-1.5-parameter-guide.txt', 'TXT'], ['畸变专用画质', 'downloads/ark-1.5-aberration.txt', 'TXT'], ['进服动画删除', 'downloads/quality-15/remove-intro.txt', 'TXT'], ['黑色 UI 设置', 'downloads/quality-15/black-ui.txt', 'TXT']
    ]},
    { category: '画质代码', kind: 'FEISHU DOCS', title: '1.0 战斗画质文档', count: '8 篇外部文档', description: '除树、原画战斗、人物视角、除水面、战斗画质及画质目录等。', action: 'open', assets: [
      ['A 镜除树画质', 'https://www.feishu.cn/docx/KnGidV7e9od7W6xuVHgcP1q2ndE', '飞书文档'], ['Zou 直播用原画战斗', 'https://www.feishu.cn/docx/L9T6d7IFuost9nxmV7ncEMN1nBd', '飞书文档'], ['人物视角设置', 'https://www.feishu.cn/docx/UCEzdQNsNoAUNXxuBbccAl5anzk', '飞书文档'], ['单除水面', 'https://www.feishu.cn/docx/VHtzdyGm5obDGLxofOvcQGM9nig', '飞书文档'], ['战斗画质 2', 'https://www.feishu.cn/docx/N7mndG95Yoq4VuxqdXNcKO5Wn4b', '飞书文档'], ['无特效画质', 'https://www.feishu.cn/docx/F7yZdk6wZoHCyyxSmVFcF8j3nDe', '飞书文档'], ['炮塔 / 盾牌 / 变色方法', 'https://www.feishu.cn/docx/LxLSd8pr9otGsXxlMBGclVGjnig', '飞书文档'], ['画质更改目录', 'https://www.feishu.cn/docx/QaZRd86SyodHVJx5RZ4cSqyEnZd', '飞书文档']
    ]},
    { category: '游戏设置', kind: 'IMAGE GUIDE', title: '1.0 游戏设置图', count: '3 张设置图', description: '画面与键盘设置截图。按图对照修改前，建议先保存自己的当前配置。', action: 'gallery', gallery: ['assets/settings-10/1.png', 'assets/settings-10/2.png', 'assets/settings-10/keyboard-settings.png'] },
    { category: '游戏设置', kind: 'IMAGE GUIDE', title: '1.5 游戏设置图', count: '7 张设置图', description: '1.5 素材画质与游戏设置截图，适合逐项对照。', action: 'gallery', gallery: ['assets/settings-15/1.png', 'assets/settings-15/2.png', 'assets/settings-15/3.png', 'assets/settings-15/4.png', 'assets/settings-15/5.png', 'assets/settings-15/6.png', 'assets/settings-15/7.png'] },
    { category: '教学', kind: 'GUIDE + VIDEO', title: '飞雷神实战教学', count: '文字 + 现场视频', description: '抓狗定位、右键时机、自爆切换与接触目标的操作流程。', action: 'open', assets: [['飞雷神教学文字版', './downloads/ark-teleport-guide.txt', 'TXT'], ['现场录制教学视频', './videos/ark-teleport-guide.mp4', '620MB · MP4 下载']] },
    { category: '教学', kind: 'INSTALL GUIDE', title: '1.0 双语汉化教学', count: '安装说明 + 补丁', description: '提供补丁文件的放置位置说明；二进制补丁不在网站直接分发。', action: 'open', protected: true, assets: [['双语汉化安装说明', 'downloads/ark-bilingual-install.txt', 'TXT'], ['ShooterGame-Windows_Z6.1 物品双语补丁', '', 'PAK · 不公开下载']] },
    { category: '滤镜与回放', kind: 'FEISHU DOCS', title: 'N 卡滤镜与及时回放', count: '2 篇外部文档', description: 'N 卡及时回放及滤镜参数调整，重点关注色调、强度、温度和亮丽。', action: 'open', assets: [['N 卡及时回放', 'https://www.feishu.cn/docx/TQuXdtjNyoVtPgxOawZcBETAn7c', '飞书文档'], ['N 卡滤镜参数说明', 'https://www.feishu.cn/docx/Qxifd4YMpoGAFdxh1XJcMHrynJb', '飞书文档']] },
    { category: '修复工具', kind: 'LOCAL TOOL', title: '白框 4096 / 658 报错修复', count: '1 个 EXE 工具', description: '用于方舟反复白框问题排查。下载前请确认来源、杀毒软件提示和游戏版本。', action: 'open', protected: true, assets: [['下载修复工具', 'downloads/tools/ark-whitebox-fix.exe', 'EXE · 276KB'], ['使用提醒', '', '先备份游戏文件']] },
    { category: '外部资料', kind: 'EXTERNAL DOC', title: '网络与外部访问资料', count: '1 篇飞书文档', description: '资料包中的网络相关内容保留为外部文档入口，不在本站重新托管工具。', action: 'open', protected: true, assets: [['免费和付费 VPN 下载使用', 'https://www.feishu.cn/docx/ChladXlYsoaOTmx8xHTcDG1hnqg', '飞书文档 · 外部打开']] },
    { category: 'Zou 工具箱', kind: 'WINDOWS APP', title: 'Zou 连点器', count: 'Windows AutoHotkey', description: '左键、右键、C 键连点，间隔设置、长按设置与自定义快捷键。VX：Hiizou。', action: 'open', protected: true, assets: [['下载 Zou 连点器脚本', './tools/Zou连点器.ahk', 'AHK v2'], ['使用说明', './tools/README.txt', 'TXT']] },
    { category: 'Zou 工具箱', kind: 'WINDOWS APP', title: 'Zou 准星工具', count: 'Windows EXE 工具', description: '屏幕中心准星覆盖工具，可选择显示器、形状、颜色、尺寸与偏移；适合无边框全屏或窗口化全屏。VX：Hiizou。', action: 'open', protected: true, assets: [['下载 Zou 准星工具', './tools/ZouCrosshair.exe', 'EXE · 2.8MB'], ['使用说明', './tools/ZouCrosshair-README.txt', 'TXT']] }
  ];

  const categories = ['全部', ...new Set(entries.map(entry => entry.category))];
  let active = '全部';

  function assetList(items) {
    return `<ul class="asset-list">${items.map(([name, href, note]) => `<li>${href ? `<a href="${href}" ${href.startsWith('http') ? 'target="_blank" rel="noreferrer"' : 'download'}>${name} ↗</a>` : `<strong>${name}</strong>`}<span>${note}</span></li>`).join('')}</ul>`;
  }

  function show(entry) {
    let body = `<h3>${entry.title}</h3><p>${entry.description}</p>`;
    if (entry.assets?.some(([, href]) => href.endsWith('.exe'))) body += '<p class="download-warning"><b>下载前确认：</b>这是可执行文件，建议先扫描文件、保留备份，并确认自己需要该工具。</p>';
    if (entry.assets?.some(([, href]) => href.endsWith('.mp4'))) body += '<p class="download-note">视频文件较大，首次播放需要等待浏览器读取片段；如果当前设备无法在线播放，可以使用下方 MP4 下载链接。</p>';
    if (entry.gallery) body += `<div class="gallery">${entry.gallery.map(src => `<a href="${encodeURI(src)}" target="_blank" rel="noreferrer"><img src="${encodeURI(src)}" alt="${entry.title}" loading="lazy" /></a>`).join('')}</div>`;
    const video = entry.assets?.find(([, href]) => href.endsWith('.mp4'));
    const onlineVideoUrl = window.ZOU_VIDEO_URL || '';
    const playableVideo = location.protocol === 'file:' ? video?.[1] : onlineVideoUrl;
    if (playableVideo) body += `<video class="resource-video" controls playsinline preload="none" poster="./assets/forest-survivor-hero.png"><source src="${playableVideo}" type="video/mp4" /><p>当前浏览器不支持 MP4 播放，请使用下方下载链接。</p></video>`;
    else if (video) body += '<div class="video-pending"><b>线上视频待接入</b><span>本地打开网站可直接播放；上线播放需要把 620MB 视频放到对象存储或提供 B 站视频链接。</span></div>';
    // 620MB 本地教学视频不随网页发布，线上隐藏它的下载入口，避免玩家点到失效链接。
    // 本地打开时仍可保留视频文件入口与播放器。
    const visibleAssets = entry.assets?.filter(([, href]) => location.protocol === 'file:' || !href.endsWith('.mp4'));
    if (visibleAssets) body += assetList(visibleAssets);
    if (entry.action === 'notice') body += '<p><b>安全说明：</b>此资料已在资源目录中登记，但不会由网站直接提供下载或跳转。</p>';
    dialogContent.innerHTML = body;
    dialog.classList.add('resource-dialog');
    dialog.showModal();
  }

  function render() {
    filters.innerHTML = categories.map(category => `<button class="library-filter ${category === active ? 'active' : ''}" data-category="${category}">${category}</button>`).join('');
    const visible = entries.filter(entry => active === '全部' || entry.category === active);
    grid.innerHTML = visible.map((entry, index) => `<article class="library-card ${entry.protected ? 'is-protected' : ''}"><div class="library-card-top"><span class="kind">${entry.kind}</span><span class="count">${entry.count}</span></div><h4>${String(index + 1).padStart(2, '0')} · ${entry.title}</h4><p>${entry.description}</p><div class="library-card-footer"><button type="button" data-entry="${entries.indexOf(entry)}">查看资料</button><span class="state">${entry.protected ? '安全限制' : '已整理'}</span></div></article>`).join('');
    filters.querySelectorAll('button').forEach(button => button.addEventListener('click', () => { active = button.dataset.category; render(); }));
    grid.querySelectorAll('[data-entry]').forEach(button => button.addEventListener('click', () => show(entries[Number(button.dataset.entry)])));
  }

  render();
})();
