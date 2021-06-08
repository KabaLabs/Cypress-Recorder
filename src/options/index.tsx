const defaultConfig = { pattern: 'css selectors' }; // 默认配置
chrome.storage.local.get(defaultConfig, (items) => {
  (document.getElementById('pattern') as HTMLSelectElement).value = items.pattern;
});

document.getElementById('save').addEventListener('click', () => {
  const pattern = (document.getElementById('pattern') as HTMLSelectElement).value;
  chrome.storage.local.set({ pattern }, () => {
    document.getElementById('status').textContent = 'Save successfully!';
    setTimeout(() => { document.getElementById('status').textContent = ''; }, 800);
  });
});
