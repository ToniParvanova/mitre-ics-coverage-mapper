const allControls   = [...new Set(TECHNIQUES.flatMap(t => t.Controls))];
const allDetections = [...new Set(TECHNIQUES.flatMap(t => t.Detections))];
let activeControls   = new Set(allControls);
let activeDetections = new Set(allDetections);
let sortKey = 'Risk Score', sortDir = -1;

allControls.forEach(c => {
  document.getElementById('controls-list').innerHTML +=
    `<label><input type="checkbox" checked onchange="toggle('c','${c}',this.checked)"> ${c}</label>`;
});
allDetections.forEach(d => {
  document.getElementById('detections-list').innerHTML +=
    `<label><input type="checkbox" checked onchange="toggle('d','${d}',this.checked)"> ${d}</label>`;
});
[...new Set(TECHNIQUES.map(t => t.Tactic))].forEach(t => {
  document.getElementById('fTactic').innerHTML += `<option value="${t}">${t}</option>`;
});

function toggle(type, name, checked) {
  const set = type === 'c' ? activeControls : activeDetections;
  checked ? set.add(name) : set.delete(name);
  render();
}

function status(t) {
  const c = t.Controls.some(x => activeControls.has(x));
  const d = t.Detections.some(x => activeDetections.has(x));
  return c && d ? 'FULL' : c || d ? 'PARTIAL' : 'GAP';
}

function risk(t, s) {
  return ({Critical:3,High:2,Medium:1}[t.Impact]||1) * ({GAP:3,PARTIAL:1,FULL:0}[s]);
}

function computed() {
  return TECHNIQUES.map(t => { const s = status(t); return {...t, Status: s, 'Risk Score': risk(t,s)}; });
}

function render() {
  const all = computed();
  const full = all.filter(t => t.Status==='FULL').length;
  const part = all.filter(t => t.Status==='PARTIAL').length;
  const gap  = all.filter(t => t.Status==='GAP').length;
  const scr  = Math.round((full + part*0.5) / all.length * 100);

  document.getElementById('c-full').textContent    = full;
  document.getElementById('c-partial').textContent = part;
  document.getElementById('c-gap').textContent     = gap;
  document.getElementById('c-score').textContent   = scr + '%';

  const search = document.getElementById('search').value.toLowerCase();
  const fs = document.getElementById('fStatus').value;
  const ft = document.getElementById('fTactic').value;
  const fi = document.getElementById('fImpact').value;

  const filtered = all
    .filter(t =>
      (!search || t.Technique.toLowerCase().includes(search) || t.ID.toLowerCase().includes(search)) &&
      (!fs || t.Status === fs) &&
      (!ft || t.Tactic === ft) &&
      (!fi || t.Impact === fi))
    .sort((a,b) => a[sortKey] > b[sortKey] ? sortDir : -sortDir);

  document.getElementById('tableBody').innerHTML = filtered.map(t => `
      <tr>
      <td><strong>${t.ID}</strong></td>
      <td>${t.Technique}</td>
      <td>${t.Impact}</td>
      <td>${t.Controls.filter(c => activeControls.has(c)).join(', ') || '-'}</td>
      <td>${t.Detections.filter(d => activeDetections.has(d)).join(', ') || '-'}</td>
      <td><span class="badge ${t.Status}">${t.Status}</span></td>
      <td>${t['Risk Score']}</td>
      </tr>`).join('');

  document.getElementById('gapsSection').innerHTML = all.filter(t => t.Status==='GAP').map(t => `
    <div class="gap-card">
    <strong>${t.ID} - ${t.Technique}</strong>
    <p>Impact: ${t.Impact} | Tactic: ${t.Tactic}</p>
    <p>No active control or detection covers this technique.</p>
    </div>`).join('') || '<p style="color:#aaa;font-size:0.85rem">No gaps detected.</p>';

  pie.data.datasets[0].data = [full, part, gap];
  pie.update();
  bar.data.labels = all.map(t => t.ID);
  bar.data.datasets[0].data = all.map(t => t['Risk Score']);
  bar.data.datasets[0].backgroundColor = all.map(t => t.Status==='GAP'?'#9b2226':t.Status==='PARTIAL'?'#b5770d':'#2d6a4f');
  bar.update();
}

function sortBy(key) {
sortKey === key ? sortDir *= -1 : (sortKey = key, sortDir = -1);
render();
}

const pie = new Chart(document.getElementById('pieChart'), {
type: 'doughnut',
data: { labels: ['Full','Partial','GAP'], datasets: [{ data: [0,0,0], backgroundColor: ['#2d6a4f','#b5770d','#9b2226'], borderWidth: 0 }] },
options: { plugins: { legend: { position: 'bottom', labels: { font: { size: 11 } } } }, cutout: '60%' }
});

const bar = new Chart(document.getElementById('barChart'), {
type: 'bar',
data: { labels: [], datasets: [{ data: [], backgroundColor: [], borderRadius: 4 }] },
options: { plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } } }
});

render();
