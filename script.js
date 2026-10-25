'use strict';
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
$('#year').textContent = new Date().getFullYear();
const features = [
  ['A little context changes everything.', 'Is an app working hard, or is your Mac just warming up? Follow processor activity, memory pressure and network traffic without leaving what you’re doing.', 'LIVE READINGS · MENU BAR WIDGETS · AT-A-GLANCE INSIGHTS'],
  ['The details behind your everyday tools.', 'Find open ports and Docker containers alongside CPU, memory and network activity. Keep a little more context close while you build, test and create.', 'OPEN PORTS · DOCKER CONTAINERS · CUSTOMIZABLE MODULES'],
  ['Your information has a home. Your Mac.', 'Mac Gauge does not collect telemetry or analytics. The direct build checks GitHub for updates, and the App Store build receives its updates through Apple.', 'NO APP TELEMETRY · NO ANALYTICS · NATIVE MAC APP']
];
function wireTabs(selector, activate) {
  const buttons = $$(selector);
  buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
      buttons.forEach(other => {
        other.setAttribute('aria-selected', String(other === button));
        other.tabIndex = other === button ? 0 : -1;
      });
      activate(button);
    });
    button.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % buttons.length;
      if (event.key === 'ArrowLeft') next = (index - 1 + buttons.length) % buttons.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = buttons.length - 1;
      if (next !== undefined) {
        event.preventDefault();
        buttons[next].focus();
        buttons[next].click();
      }
    });
  });
}
wireTabs('[data-appearance]', button => {
  const theme = button.dataset.appearance === 'dark' ? 'dark' : 'light';
  const title = theme === 'dark' ? 'Dark' : 'Light';
  const source = `assets/app-overview-${theme}.webp`;
  $('#appearance-image').src = source;
  $('#appearance-image').alt = `${title} appearance design illustration of Mac Gauge, showing CPU, memory and GPU gauges, a usage chart, top processes, system readings and a compact memory panel. Sample readings are illustrative.`;
  $('#appearance-image-link').href = source;
  $('#appearance-image-link').setAttribute('aria-label', `Open the ${theme} appearance illustration at full size in a new tab`);
  $('#appearance-full-size').href = source;
  $('#appearance-caption').textContent = `${title} appearance · Design illustration with sample readings`;
  $('#appearance-panel').setAttribute('aria-labelledby', button.id);
});
wireTabs('[data-feature]', button => {
  const [title, copy, detail] = features[Number(button.dataset.feature)];
  $('#feature-title').textContent = title;
  $('#feature-copy').textContent = copy;
  $('#feature-detail').textContent = detail;
  $('#feature-panel').setAttribute('aria-labelledby', button.id);
});
const profiles = {
  everyday: { label: 'Everyday work', cpu: 12, memory: 8.2, gpu: 6, disk: 42, network: 2.4, sensors: 46 },
  creative: { label: 'Creative work', cpu: 68, memory: 12.8, gpu: 79, disk: 46, network: 1.2, sensors: 72 },
  download: { label: 'Downloading files', cpu: 21, memory: 9.1, gpu: 9, disk: 44, network: 48.6, sensors: 51 }
};
const modules = {
  cpu: { kicker:'PROCESSOR ACTIVITY', title:'Room to breathe.', unit:'%', description:'of your CPU in use', max:100, label:'CPU USAGE', insight:'Busy doesn’t have to mean slow.', copy:'A short spike is part of everyday work. Watch the pattern to see what your apps are doing.', rows:[['Safari','5.1%'],['WindowServer','2.8%'],['Xcode','2.4%'],['Mac Gauge','0.6%']] },
  memory: { kicker:'MEMORY IN FOCUS', title:'Space for the next idea.', unit:'GB', description:'of 16 GB in use', max:16, label:'MEMORY', insight:'A little pressure. A clearer picture.', copy:'Used memory is only part of the story. In the app, memory pressure adds context to how your Mac is managing its RAM.', rows:[['Safari','2.1 GB'],['Xcode','1.8 GB'],['WindowServer','684 MB'],['Mac Gauge','42 MB']] },
  gpu: { kicker:'GRAPHICS ACTIVITY', title:'Behind every little detail.', unit:'%', description:'GPU utilization', max:100, label:'GPU ACTIVITY', insight:'See the work behind the pixels.', copy:'Creative tools, video and everyday animations all put your GPU to work. The app shows available readings for your hardware.', rows:[['Rendering','4.2%'],['Video processing','1.1%'],['Display activity','0.7%']] },
  disk: { kicker:'STORAGE AT A GLANCE', title:'A little room to grow.', unit:'%', description:'of 512 GB used', max:100, label:'SPACE USED', insight:'Make room for what comes next.', copy:'Keep an eye on storage usage and disk activity. Readings in this demo are illustrative, rather than a scan of your files.', rows:[['Applications','62 GB'],['Documents','83 GB'],['System and other','70 GB'],['Available','297 GB']] },
  network: { kicker:'NETWORK ACTIVITY', title:'Keep things moving.', unit:'MB/s', description:'download speed', max:60, label:'TRAFFIC', insight:'The flow behind your workflow.', copy:'Uploads and downloads don’t have to be a mystery. Follow network throughput while your work stays front and center.', rows:[['Download','2.4 MB/s'],['Upload','128 KB/s'],['Interface','Wi-Fi · en0'],['Connection','Sample network']] },
  sensors: { kicker:'A LITTLE TEMPERATURE CHECK', title:'Know what’s warming up.', unit:'°C', description:'sample CPU temperature', max:100, label:'READING', insight:'Context for the warmth.', copy:'Sensor availability varies by Mac, permissions and distribution. The sandboxed build may have different access from the direct build.', rows:[['CPU average','46°C'],['GPU average','42°C'],['Battery','32°C'],['Fan speed','1,200 RPM']] },
  ports: { kicker:'THE WORK BEHIND THE WORK', title:'Find what’s listening.', unit:'open', description:'sample local ports', max:10, label:'LISTENING ON', insight:'A little clarity for your local stack.', copy:'A development server, database or container? Keep open ports close to the rest of your system’s story. This list is fictional.', rows:[] }
};
const portRows = [
  {name:'node',detail:'Local frontend',port:3000},
  {name:'postgres',detail:'Docker · sample-db',port:5432},
  {name:'redis',detail:'Docker · sample-cache',port:6379},
  {name:'python',detail:'Local preview',port:8000}
];
let activeModule = 'cpu';
let workload = 'everyday';
let paused = false;
let tick = 0;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const canvas = $('#activity-chart');
const context = canvas.getContext('2d');
function metricValue(key) { return key === 'ports' ? 4 : profiles[workload][key]; }
function renderRows() {
  const spec = modules[activeModule];
  const list = $('#process-list');
  list.replaceChildren();
  let rows;
  if (activeModule === 'ports') {
    const query = $('#ports-search').value.trim().toLowerCase();
    rows = portRows.filter(row => `${row.name} ${row.detail} ${row.port}`.toLowerCase().includes(query)).map(row => [row.name, `:${row.port}`, row.detail]);
  } else {
    rows = spec.rows.map(row => [...row]);
    if (activeModule === 'cpu' && workload === 'creative') rows = [['Final Cut Pro','42.3%'],['Xcode','16.8%'],['WindowServer','7.2%'],['Mac Gauge','0.7%']];
    if (activeModule === 'memory' && workload === 'creative') rows = [['Final Cut Pro','5.2 GB'],['Xcode','3.1 GB'],['Safari','2.3 GB'],['Mac Gauge','43 MB']];
    if (activeModule === 'gpu' && workload === 'creative') rows = [['Rendering','61.2%'],['Video processing','14.8%'],['Display activity','3.0%']];
    if (activeModule === 'network') rows[0][1] = `${profiles[workload].network} MB/s`;
    if (activeModule === 'sensors') {
      rows[0][1] = `${profiles[workload].sensors}°C`;
      rows[1][1] = `${profiles[workload].sensors - 4}°C`;
      rows[3][1] = workload === 'creative' ? '3,400 RPM' : '1,200 RPM';
    }
    if (activeModule === 'disk') {
      const used = Math.round(512 * profiles[workload].disk / 100);
      rows = [['Applications','62 GB'],['Documents',`${used-132} GB`],['System and other','70 GB'],['Available',`${512-used} GB`]];
    }
  }
  if (!rows.length) {
    const empty = document.createElement('p');
    empty.className = 'empty-state';
    empty.textContent = 'No sample ports match. Try “Docker”, “node” or “5432”.';
    list.append(empty);
  }
  rows.forEach(([name, value, detail]) => {
    const row = document.createElement('div'); row.className = 'process-row';
    const label = document.createElement('span');
    const dot = document.createElement('i'); dot.className = 'process-dot'; dot.setAttribute('aria-hidden','true');
    label.append(dot,document.createTextNode(name));
    if (detail) { const small = document.createElement('small'); small.textContent = detail; label.append(small); }
    const number = document.createElement('span'); number.className = 'process-value'; number.textContent = value;
    row.append(label,number); list.append(row);
  });
}
function drawChart() {
  if (activeModule === 'ports' || !context) return;
  const box = canvas.getBoundingClientRect();
  if (!box.width) return;
  const scale = window.devicePixelRatio || 1;
  canvas.width = Math.round(box.width * scale); canvas.height = Math.round(box.height * scale);
  context.setTransform(scale,0,0,scale,0,0);
  const width = box.width, height = box.height;
  context.clearRect(0,0,width,height);
  context.strokeStyle = '#e9eee5'; context.lineWidth = 1;
  [1, height / 2, height-1].forEach(y => { context.beginPath();context.moveTo(0,y);context.lineTo(width,y);context.stroke(); });
  const spec = modules[activeModule];
  const base = metricValue(activeModule) / spec.max;
  const stable = ['memory','disk','sensors'].includes(activeModule);
  const points = Array.from({length:61},(_,i) => {
    const wave = Math.sin((i+tick)*.54) * Math.cos((i+tick)*.21) * (stable ? .018 : .065);
    const spike = !stable && ((i+tick)%23 > 18) ? .14 : 0;
    return [i*width/60, height - Math.max(.03,Math.min(.95,base + wave + spike))*height];
  });
  context.beginPath();context.moveTo(0,height);points.forEach(([x,y])=>context.lineTo(x,y));context.lineTo(width,height);context.closePath();context.fillStyle='#edf4e9';context.fill();
  context.beginPath();points.forEach(([x,y],i)=> i ? context.lineTo(x,y) : context.moveTo(x,y));context.strokeStyle='#6d9873';context.lineWidth=1.7;context.lineJoin='round';context.stroke();
}
function renderDemo() {
  const spec = modules[activeModule];
  $('#metric-kicker').textContent = spec.kicker;
  $('#metric-title').textContent = spec.title;
  $('#metric-value').textContent = metricValue(activeModule);
  $('#metric-unit').textContent = spec.unit;
  $('#metric-description').textContent = spec.description;
  $('#metric-badge').textContent = profiles[workload].label;
  $('#insight-title').textContent = spec.insight;
  $('#insight-copy').textContent = spec.copy;
  $('#table-title').textContent = activeModule === 'ports' ? 'SAMPLE PROCESSES & CONTAINERS' : 'A FEW THINGS AT WORK';
  $('#table-unit').textContent = spec.label;
  $('#gauge-panel').setAttribute('aria-labelledby', `gauge-${activeModule}`);
  $$('[data-value]').forEach(element => {
    const key=element.dataset.value;
    element.textContent = `${metricValue(key)}${key === 'ports' ? ' open' : key === 'memory' ? ' GB' : key === 'network' ? ' MB/s' : key === 'sensors' ? '°C' : '%'}`;
  });
  const ports = activeModule === 'ports';
  $('#chart-area').hidden = ports;
  $('.chart-times').hidden = ports;
  $('#ports-search-wrap').hidden = !ports;
  $('#chart-max').textContent = `${spec.max}${activeModule === 'memory' ? ' GB' : activeModule === 'network' ? ' MB/s' : activeModule === 'sensors' ? '°C' : '%'}`;
  $('#chart-mid').textContent = `${spec.max/2}${activeModule === 'memory' ? ' GB' : activeModule === 'network' ? ' MB/s' : activeModule === 'sensors' ? '°C' : '%'}`;
  canvas.setAttribute('aria-label', `Simulated ${activeModule} activity over the last 60 seconds. Current reading: ${metricValue(activeModule)} ${spec.unit}.`);
  renderRows();drawChart();
}
wireTabs('[data-module]', button => { activeModule = button.dataset.module; tick=0; renderDemo(); });
$('#scenario').addEventListener('change', event => { workload = event.target.value; tick=0; renderDemo(); });
$('#ports-search').addEventListener('input', renderRows);
$('#pause-demo').addEventListener('click', () => {
  paused = !paused;
  $('#pause-demo').textContent = paused ? 'Resume' : 'Pause';
  $('#pause-demo').setAttribute('aria-pressed', String(paused));
  $('#chart-status').textContent = paused ? 'Simulated · Paused' : 'Simulated · Updating';
});
if (reduceMotion) $('#pause-demo').click();
new ResizeObserver(drawChart).observe(canvas);
setInterval(() => { if (!paused && !document.hidden) {tick++;drawChart();} }, 1600);
renderDemo();
$('#copy').addEventListener('click', async () => {
  const status = $('#copy-status');
  try {
    await navigator.clipboard.writeText('brew tap solvePao/tap\nbrew install --cask mac-gauge');
    status.textContent = 'Copied. Your next step is in Terminal.';
    $('#copy').textContent = 'Copied';
  } catch { status.textContent = 'Select and copy the two commands above.'; }
});
// Keep a useful release-page fallback when no production DMG is published.
fetch('https://api.github.com/repos/harshityadav95/Mac-Gauge-App/releases/latest', {signal:AbortSignal.timeout(8000)})
  .then(response => {if (!response.ok) throw new Error('No stable release');return response.json();})
  .then(release => {
    const dmg = release.assets?.find(asset => asset.name === 'Mac-Gauge.dmg');
    if (!dmg?.browser_download_url?.startsWith('https://github.com/harshityadav95/Mac-Gauge-App/releases/download/')) return;
    $('#dmg-link').href = dmg.browser_download_url;
    $('#dmg-link').replaceChildren(document.createTextNode('Download for Mac '));
    const arrow=document.createElement('span');arrow.textContent='↗';arrow.setAttribute('aria-hidden','true');$('#dmg-link').append(arrow);
    $('#release-status').textContent = `${release.name || release.tag_name} · Direct download for Apple Silicon.`;
  }).catch(() => {});
