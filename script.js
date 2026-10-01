document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('copy').addEventListener('click', async () => {
  const status = document.getElementById('copy-status');
  try { await navigator.clipboard.writeText('brew tap solvePao/tap\nbrew install --cask mac-gauge'); status.textContent = 'Copied to clipboard.'; }
  catch { status.textContent = 'Select and copy the commands above.'; }
});
fetch('https://api.github.com/repos/harshityadav95/Mac-Gauge-App/releases/latest')
  .then(response => { if (!response.ok) throw new Error('No stable release'); return response.json(); })
  .then(release => {
    const dmg = release.assets.find(asset => asset.name === 'Mac-Gauge.dmg');
    if (!dmg) return;
    const link = document.getElementById('dmg-link');
    link.href = dmg.browser_download_url; link.textContent = 'Download for Mac ↗';
    document.getElementById('release-status').textContent = `${release.name || release.tag_name} · Signed and notarized for macOS.`;
  }).catch(() => {});
