/* ===== SC-GTRM Explorer — Single-Page Application ===== */

const state = {
  domains: null,
  controls: null,
  evidence: null,
  riskRegister: null,
  methodology: null,
  requirements: {},
  crossRefs: {},
  testingProcedures: null,
  evidenceMap: null,
  route: { view: 'overview' },
};

const cache = new Map();
async function fetchJSON(path) {
  if (cache.has(path)) return cache.get(path);
  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    cache.set(path, data);
    return data;
  } catch (e) {
    console.warn(`Failed to load ${path}:`, e);
    return null;
  }
}

/* ===== ROUTING ===== */
function parseRoute() {
  const hash = location.hash.slice(1) || '';
  if (!hash || hash === 'overview') return { view: 'overview' };
  if (hash.startsWith('search/')) return { view: 'search', query: decodeURIComponent(hash.slice(7)) };
  if (hash === 'controls') return { view: 'controls' };
  if (hash.startsWith('control/')) return { view: 'control-detail', slug: hash.slice(8) };
  if (hash === 'risk') return { view: 'risk' };
  if (hash === 'risk-management') return { view: 'risk' };
  if (hash.startsWith('risk/')) return { view: 'risk', sub: hash.slice(5) };
  if (hash === 'evidence') return { view: 'evidence' };
  if (hash === 'cross-references') return { view: 'cross-references' };
  if (hash === 'requirements') return { view: 'requirements' };
  if (hash === 'workprogram') return { view: 'workprogram' };
  return { view: 'overview' };
}

/* ===== INIT ===== */
async function init() {
  try {
    const [domains, libraryRaw] = await Promise.all([
      fetchJSON('controls/domains.json'),
      fetchJSON('controls/library.json'),
    ]);
    state.domains = domains || {};
    state.controls = libraryRaw ? (libraryRaw.controls || []) : [];
    window.addEventListener('hashchange', render);
    document.addEventListener('click', handleClick);
    document.getElementById('search-input').addEventListener('input', debounce(handleSearch, 300));
    render();
  } catch (err) {
    console.error('Init failed:', err);
    document.getElementById('app').innerHTML = '<div class="error-state"><h2>Failed to load data</h2><p>Please try refreshing the page.</p></div>';
  }
}

function debounce(fn, ms) {
  let t;
  return function(...args) { clearTimeout(t); t = setTimeout(() => fn.apply(this, args), ms); };
}

/* ===== RENDER DISPATCHER ===== */
function render() {
  state.route = parseRoute();
  const app = document.getElementById('app');
  updateNav();
  switch (state.route.view) {
    case 'overview': renderOverview(app); break;
    case 'controls': renderControls(app); break;
    case 'control-detail': renderControlDetail(app, state.route.slug); break;
    case 'risk': renderRiskManagement(app); break;
    case 'evidence': renderEvidence(app); break;
    case 'cross-references': renderCrossReferences(app); break;
    case 'requirements': renderRequirements(app); break;
    case 'workprogram': renderWorkProgram(app); break;
    case 'search': renderSearch(app, state.route.query); break;
    default: renderOverview(app);
  }
  window.scrollTo(0, 0);
}

function updateNav() {
  document.querySelectorAll('.nav-link').forEach(el => {
    const view = el.dataset.view;
    el.classList.toggle('active', view === state.route.view ||
      (view === 'overview' && state.route.view === 'overview') ||
      (view === 'controls' && state.route.view === 'control-detail') ||
      (view === 'workprogram' && state.route.view === 'workprogram')
    );
  });
}

/* ===== HELPERS ===== */
function esc(s) { const el = document.createElement('span'); el.textContent = s || ''; return el.innerHTML; }

function handleClick(e) {
  const accBtn = e.target.closest('[data-accordion]');
  if (accBtn) {
    const item = accBtn.closest('.accordion-item');
    if (item) item.classList.toggle('open');
    return;
  }
  const tabBtn = e.target.closest('.tab-btn');
  if (tabBtn) {
    const parent = tabBtn.closest('.tabs') || tabBtn.parentElement;
    parent.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    tabBtn.classList.add('active');
    const tabId = tabBtn.dataset.tab;
    const container = parent.parentElement;
    container.querySelectorAll('.tab-panel').forEach(p => p.classList.toggle('active', p.dataset.panel === tabId));
    return;
  }
  const riskBtn = e.target.closest('.risk-filter-btn');
  if (riskBtn) {
    const filter = riskBtn.dataset.filter;
    riskBtn.parentElement.querySelectorAll('.risk-filter-btn').forEach(b => b.classList.toggle('active', b === riskBtn));
    filterRisks(filter);
    return;
  }
  const domPill = e.target.closest('.domain-pill');
  if (domPill) {
    domPill.parentElement.querySelectorAll('.domain-pill').forEach(p => p.classList.remove('active'));
    domPill.classList.add('active');
    filterControlsByDomain(domPill.dataset.domain);
    return;
  }
}

function handleSearch(e) {
  const q = e.target.value.trim();
  if (q.length >= 2) {
    location.hash = '#search/' + encodeURIComponent(q);
  } else if (state.route.view === 'search') {
    location.hash = '#';
  }
}

function controlsByDomain() {
  const grouped = {};
  for (const c of state.controls) {
    const d = c.domain || 'uncategorized';
    if (!grouped[d]) grouped[d] = [];
    grouped[d].push(c);
  }
  return grouped;
}

/* ===== OVERVIEW ===== */
function renderOverview(el) {
  const domainCount = Object.keys(state.domains).length;
  const controlCount = state.controls.length;
  const grouped = controlsByDomain();

  el.innerHTML = `
    <div class="disclaimer">
      This database is for educational and indicative purposes only. It does not constitute legal or regulatory advice. The content represents a structured interpretation of the Securities Commission Malaysia's Guidelines on Technology Risk Management (SC-GL/2-2023 (R1-2024)). Always consult the official SC guidelines and qualified regulatory counsel for compliance decisions.
    </div>
    <div class="stats-banner">
      <div class="stat-card"><div class="stat-number">${controlCount}</div><div class="stat-label">Controls</div></div>
      <div class="stat-card"><div class="stat-number">${domainCount}</div><div class="stat-label">Domains</div></div>
      <div class="stat-card"><div class="stat-number">10</div><div class="stat-label">Risk Scenarios</div></div>
      <div class="stat-card"><div class="stat-number">SC</div><div class="stat-label">Regulator</div></div>
    </div>
    <h2 style="font-size:1.125rem;font-weight:600;margin-bottom:1rem;">Browse by Domain</h2>
    <div class="control-grid">
      ${Object.entries(state.domains).map(([slug, dom]) => {
        const count = (grouped[slug] || []).length;
        return `<div class="control-card domain-${esc(slug)}" onclick="location.hash='#controls?domain=${esc(slug)}'" style="cursor:pointer;">
          <div class="control-id">${esc(slug)}</div>
          <h3 class="control-card-title">${esc(dom.name)}</h3>
          <p class="control-card-desc">${esc(dom.description).slice(0, 120)}${dom.description.length > 120 ? '...' : ''}</p>
          <div class="control-card-meta">
            <span class="badge badge-artifacts">${count} controls</span>
          </div>
        </div>`;
      }).join('')}
    </div>
    <div style="margin-top:1.5rem;display:flex;gap:1.5rem;flex-wrap:wrap">
      <a href="#controls" style="font-size:0.875rem">Browse all ${controlCount} controls &#8594;</a>
      <a href="#risk" style="font-size:0.875rem">View Risk Management &#8594;</a>
      <a href="#cross-references" style="font-size:0.875rem">Cross-Reference Mappings &#8594;</a>
    </div>`;
}

/* ===== CONTROLS ===== */
function renderControls(el) {
  const grouped = controlsByDomain();
  const domainEntries = Object.entries(state.domains);

  el.innerHTML = `
    <nav class="breadcrumbs">
      <a href="#">Home</a><span class="sep">/</span>
      <span class="current">Controls</span>
    </nav>
    <h2 style="font-size:1.25rem;margin-bottom:0.5rem">Controls Library</h2>
    <p style="font-size:0.875rem;color:var(--text-secondary);margin-bottom:1rem">
      ${state.controls.length} controls across ${domainEntries.length} domains for capital market technology risk management.
    </p>
    <div class="domain-filter">
      <button class="domain-pill active" data-domain="all">All</button>
      ${domainEntries.map(([slug, dom]) => `<button class="domain-pill" data-domain="${esc(slug)}">${esc(dom.name)}</button>`).join('')}
    </div>
    <div id="controls-list">
      ${domainEntries.map(([slug, dom]) => {
        const ctrls = grouped[slug] || [];
        if (!ctrls.length) return '';
        return `
          <div class="accordion-item open domain-section" data-domain="${esc(slug)}">
            <button class="accordion-trigger" data-accordion>
              <span>${esc(dom.name)} (${ctrls.length})</span>
              <span class="chevron">&#9654;</span>
            </button>
            <div class="accordion-content">
              ${ctrls.map(c => `
                <a href="#control/${c.slug}" class="provision-link" style="margin-bottom:0.5rem;">
                  <span class="provision-id">${esc(c.slug)}</span>
                  <span class="provision-title">${esc(c.name)}</span>
                  <span class="badge badge-type-${c.controlType}">${esc(c.controlType)}</span>
                </a>
              `).join('')}
            </div>
          </div>`;
      }).join('')}
    </div>`;
}

function filterControlsByDomain(domain) {
  document.querySelectorAll('.domain-section').forEach(sec => {
    sec.style.display = (domain === 'all' || sec.dataset.domain === domain) ? '' : 'none';
  });
}

/* ===== CONTROL DETAIL ===== */
function renderControlDetail(el, slug) {
  const ctrl = state.controls.find(c => c.slug === slug);
  if (!ctrl) {
    el.innerHTML = '<div class="error-state"><h2>Control not found</h2><a href="#controls">Back to controls</a></div>';
    return;
  }
  const dom = state.domains[ctrl.domain];

  el.innerHTML = `
    <nav class="breadcrumbs">
      <a href="#">Home</a><span class="sep">/</span>
      <a href="#controls">Controls</a><span class="sep">/</span>
      <span class="current">${esc(ctrl.name)}</span>
    </nav>
    <div class="control-detail">
      <div class="control-detail-header">
        <div class="control-detail-id-row">
          <span class="badge badge-domain">${esc(dom ? dom.name : ctrl.domain)}</span>
          <span class="badge badge-type-${ctrl.controlType}">${esc(ctrl.controlType)}</span>
          <span class="badge badge-category">${esc(ctrl.frequency)}</span>
        </div>
        <h2 class="control-detail-title">${esc(ctrl.name)}</h2>
        <p class="control-detail-desc">${esc(ctrl.description)}</p>
      </div>

      <div class="detail-section">
        <h3 class="detail-section-title">Key Activities</h3>
        <ul class="activity-list">
          ${(ctrl.keyActivities || []).map(a => `<li>${esc(a)}</li>`).join('')}
        </ul>
      </div>

      ${ctrl.maturity ? `
      <div class="detail-section">
        <h3 class="detail-section-title">Maturity Levels</h3>
        <div class="maturity-grid">
          <div class="maturity-card maturity-basic"><div class="maturity-label">Basic</div><p>${esc(ctrl.maturity.basic)}</p></div>
          <div class="maturity-card maturity-mature"><div class="maturity-label">Mature</div><p>${esc(ctrl.maturity.mature)}</p></div>
          <div class="maturity-card maturity-advanced"><div class="maturity-label">Advanced</div><p>${esc(ctrl.maturity.advanced)}</p></div>
        </div>
      </div>` : ''}

      <div class="detail-section">
        <h3 class="detail-section-title">Metadata</h3>
        <div class="fw-mappings">
          <div class="fw-mapping-row"><span class="fw-label">Owner</span><span>${esc(ctrl.owner)}</span></div>
          <div class="fw-mapping-row"><span class="fw-label">Frequency</span><span>${esc(ctrl.frequency)}</span></div>
        </div>
      </div>
    </div>`;
}

/* ===== RISK MANAGEMENT ===== */
async function renderRiskManagement(el) {
  if (!state.riskRegister) state.riskRegister = await fetchJSON('risk-management/risk-register.json');
  if (!state.methodology) state.methodology = await fetchJSON('risk-management/methodology.json');
  const reg = state.riskRegister;
  const meth = state.methodology;
  if (!reg) { el.innerHTML = '<div class="error-state"><h2>Failed to load risk data</h2></div>'; return; }

  const risks = reg.risks || [];
  const categories = reg.categories || [];

  el.innerHTML = `
    <nav class="breadcrumbs">
      <a href="#">Home</a><span class="sep">/</span>
      <span class="current">Risk Management</span>
    </nav>
    <h2 style="font-size:1.25rem;margin-bottom:0.5rem">Capital Market Technology Risk Management</h2>
    <p style="font-size:0.875rem;color:var(--text-secondary);margin-bottom:1.5rem">
      ${risks.length} capital market-specific risks across ${categories.length} categories.
    </p>
    <div class="tabs">
      <button class="tab-btn active" data-tab="register">Risk Register</button>
      <button class="tab-btn" data-tab="matrix">Risk Matrix</button>
      <button class="tab-btn" data-tab="methodology">Methodology</button>
    </div>
    <div class="tab-panel active" data-panel="register">
      <div style="display:flex;gap:0.5rem;flex-wrap:wrap;margin-bottom:1rem;">
        <button class="risk-filter-btn active" data-filter="all">All (${risks.length})</button>
        ${categories.map(cat => {
          const count = risks.filter(r => r.category === cat).length;
          return `<button class="risk-filter-btn" data-filter="${esc(cat)}">${esc(cat)} (${count})</button>`;
        }).join('')}
      </div>
      <div id="risk-list">
        ${risks.map(r => renderRiskRow(r)).join('')}
      </div>
    </div>
    <div class="tab-panel" data-panel="matrix">${renderRiskMatrix(meth)}</div>
    <div class="tab-panel" data-panel="methodology">${renderMethodology(meth)}</div>`;
}

function renderRiskRow(r) {
  const color = r.inherentRisk >= 17 ? '#DC2626' : r.inherentRisk >= 10 ? '#EA580C' : r.inherentRisk >= 5 ? '#D97706' : '#16A34A';
  const resColor = r.residualRisk >= 17 ? '#DC2626' : r.residualRisk >= 10 ? '#EA580C' : r.residualRisk >= 5 ? '#D97706' : '#16A34A';
  return `
    <div class="accordion-item risk-item" data-category="${esc(r.category)}" style="margin-bottom:0.5rem;">
      <button class="accordion-trigger" data-accordion>
        <span style="display:flex;align-items:center;gap:0.75rem;flex-wrap:wrap;">
          <span class="risk-score-badge" style="background:${color}20;color:${color}">${r.id} &middot; ${r.inherentRisk}</span>
          <span>${esc(r.title)}</span>
          <span class="badge badge-category">${esc(r.category)}</span>
        </span>
        <span class="chevron">&#9654;</span>
      </button>
      <div class="accordion-content" style="padding:1rem;">
        <p style="color:var(--text-secondary);margin-bottom:1rem;">${esc(r.description)}</p>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1rem;">
          <div>
            <strong style="font-size:var(--font-size-xs);color:var(--text-muted);text-transform:uppercase;">Inherent Risk</strong>
            <div>L:${r.likelihood} x I:${r.impact} = <span class="risk-score-badge" style="background:${color}20;color:${color}">${r.inherentRisk}</span></div>
          </div>
          <div>
            <strong style="font-size:var(--font-size-xs);color:var(--text-muted);text-transform:uppercase;">Residual Risk</strong>
            <div>L:${r.residualLikelihood} x I:${r.residualImpact} = <span class="risk-score-badge" style="background:${resColor}20;color:${resColor}">${r.residualRisk}</span></div>
          </div>
        </div>
        <div style="margin-bottom:0.75rem;">
          <strong style="font-size:var(--font-size-xs);color:var(--text-muted);text-transform:uppercase;">Existing Controls</strong>
          <ul style="list-style:disc;padding-left:1.25rem;font-size:var(--font-size-sm);color:var(--text-secondary);">
            ${(r.existingControls || []).map(c => `<li>${esc(c)}</li>`).join('')}
          </ul>
        </div>
        <div style="margin-bottom:0.75rem;">
          <strong style="font-size:var(--font-size-xs);color:var(--text-muted);text-transform:uppercase;">Treatment (${esc(r.treatment)})</strong>
          <p style="font-size:var(--font-size-sm);color:var(--text-secondary);">${esc(r.treatmentPlan)}</p>
        </div>
        <div style="display:flex;gap:1rem;font-size:var(--font-size-xs);color:var(--text-muted);">
          <span>Owner: <strong style="color:var(--text-secondary)">${esc(r.owner)}</strong></span>
          <span>Review: <strong style="color:var(--text-secondary)">${esc(r.reviewDate)}</strong></span>
        </div>
      </div>
    </div>`;
}

function filterRisks(filter) {
  document.querySelectorAll('.risk-item').forEach(item => {
    item.style.display = (filter === 'all' || item.dataset.category === filter) ? '' : 'none';
  });
}

function renderRiskMatrix(meth) {
  if (!meth) return '<p>Methodology data not available.</p>';
  const labels = ['Rare', 'Unlikely', 'Possible', 'Likely', 'Almost Certain'];
  const impacts = ['Insignificant', 'Minor', 'Moderate', 'Major', 'Catastrophic'];
  const getColor = (s) => s >= 17 ? '#DC2626' : s >= 10 ? '#EA580C' : s >= 5 ? '#D97706' : '#16A34A';
  const getBg = (s) => s >= 17 ? '#FEE2E2' : s >= 10 ? '#FFF7ED' : s >= 5 ? '#FEF3C7' : '#DCFCE7';

  let html = '<div style="overflow-x:auto;"><table class="risk-matrix-table"><thead><tr>';
  html += '<td class="risk-matrix-corner">L \\ I</td>';
  impacts.forEach(i => { html += `<th class="risk-matrix-header">${i}</th>`; });
  html += '</tr></thead><tbody>';
  for (let l = 5; l >= 1; l--) {
    html += `<tr><td class="risk-matrix-row-label">${labels[l-1]} (${l})</td>`;
    for (let i = 1; i <= 5; i++) {
      const s = l * i;
      html += `<td class="risk-matrix-cell" style="background:${getBg(s)};color:${getColor(s)};font-weight:700;">${s}</td>`;
    }
    html += '</tr>';
  }
  html += '</tbody></table></div>';
  html += '<div style="display:flex;gap:1rem;flex-wrap:wrap;margin-top:1rem;">';
  [{ label: 'Low (1-4)', color: '#16A34A', bg: '#DCFCE7' },
   { label: 'Medium (5-9)', color: '#D97706', bg: '#FEF3C7' },
   { label: 'High (10-16)', color: '#EA580C', bg: '#FFF7ED' },
   { label: 'Critical (17-25)', color: '#DC2626', bg: '#FEE2E2' }].forEach(r => {
    html += `<span style="display:flex;align-items:center;gap:0.375rem;font-size:var(--font-size-xs);"><span style="width:12px;height:12px;border-radius:2px;background:${r.bg};border:1px solid ${r.color};"></span>${r.label}</span>`;
  });
  html += '</div>';
  return html;
}

function renderMethodology(meth) {
  if (!meth) return '<p>Methodology data not available.</p>';
  let html = `<h3 style="font-size:1rem;margin-bottom:0.75rem;">${esc(meth.title)}</h3>
    <p style="color:var(--text-secondary);margin-bottom:1.5rem;">${esc(meth.description)}</p>`;

  html += '<h4 style="font-size:0.875rem;margin-bottom:0.5rem;">Likelihood Scale</h4><div style="margin-bottom:1.5rem;">';
  (meth.likelihoodScale.levels || []).forEach(lev => {
    html += `<div style="padding:0.5rem 0;border-bottom:1px solid var(--border);display:flex;gap:1rem;align-items:baseline;">
      <span class="risk-score-badge" style="background:var(--accent-light);color:var(--accent);min-width:2rem;justify-content:center;">${lev.level}</span>
      <div><strong>${esc(lev.label)}</strong><span style="font-size:var(--font-size-sm);color:var(--text-muted);margin-left:0.5rem;">${esc(lev.frequency)}</span>
      <div style="font-size:var(--font-size-sm);color:var(--text-secondary);">${esc(lev.description)}</div></div>
    </div>`;
  });
  html += '</div>';

  html += '<h4 style="font-size:0.875rem;margin-bottom:0.5rem;">Impact Scale</h4><div style="margin-bottom:1.5rem;">';
  (meth.impactScale.levels || []).forEach(lev => {
    html += `<div style="padding:0.5rem 0;border-bottom:1px solid var(--border);display:flex;gap:1rem;align-items:baseline;">
      <span class="risk-score-badge" style="background:var(--accent-light);color:var(--accent);min-width:2rem;justify-content:center;">${lev.level}</span>
      <div><strong>${esc(lev.label)}</strong><span style="font-size:var(--font-size-sm);color:var(--text-muted);margin-left:0.5rem;">${esc(lev.financialImpact)}</span>
      <div style="font-size:var(--font-size-sm);color:var(--text-secondary);">${esc(lev.description)}</div></div>
    </div>`;
  });
  html += '</div>';

  if (meth.assessmentDimensions) {
    html += '<h4 style="font-size:0.875rem;margin-bottom:0.5rem;">Assessment Dimensions</h4><div class="control-grid" style="margin-bottom:1.5rem;">';
    meth.assessmentDimensions.forEach(dim => {
      html += `<div class="control-card" style="cursor:default;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.25rem;">
          <strong>${esc(dim.dimension)}</strong>
          <span class="badge badge-artifacts">${(dim.weight * 100).toFixed(0)}%</span>
        </div>
        <p class="control-card-desc">${esc(dim.description)}</p>
      </div>`;
    });
    html += '</div>';
  }
  return html;
}

/* ===== EVIDENCE ===== */
async function renderEvidence(el) {
  if (!state.evidence) state.evidence = await fetchJSON('evidence/index.json');
  const ev = state.evidence;
  if (!ev || !ev.domains) { el.innerHTML = '<div class="error-state"><h2>Failed to load evidence data</h2></div>'; return; }

  el.innerHTML = `
    <nav class="breadcrumbs"><a href="#">Home</a><span class="sep">/</span><span class="current">Evidence</span></nav>
    <h2 style="font-size:1.25rem;margin-bottom:0.5rem">Evidence Guide</h2>
    <p style="font-size:0.875rem;color:var(--text-secondary);margin-bottom:1.5rem">Evidence items and audit expectations for each technology risk domain.</p>
    ${Object.entries(ev.domains).map(([domSlug, dom]) => `
      <div class="accordion-item open" style="margin-bottom:0.75rem;">
        <button class="accordion-trigger" data-accordion>
          <span>${esc(dom.domainName)} (${dom.evidenceItems.length} items)</span>
          <span class="chevron">&#9654;</span>
        </button>
        <div class="accordion-content">
          <div style="background:var(--warning-light);border-left:4px solid var(--warning);padding:0.75rem 1rem;border-radius:0 var(--radius) var(--radius) 0;margin-bottom:1rem;font-size:var(--font-size-sm);color:var(--warning);">
            <strong style="display:block;margin-bottom:0.25rem;">Auditor Focus</strong>${esc(dom.auditorFocus)}
          </div>
          ${dom.evidenceItems.map(item => `
            <div class="evidence-item">
              <div class="evidence-item-header">
                <span class="evidence-id">${esc(item.id)}</span>
                <span class="evidence-item-name">${esc(item.name)}</span>
              </div>
              <p class="evidence-item-desc">${esc(item.description)}</p>
              <div class="evidence-detail-grid">
                <div class="evidence-block evidence-good">
                  <div class="evidence-block-label">What Good Looks Like</div>
                  <ul>${(item.whatGoodLooksLike || []).map(w => `<li>${esc(w)}</li>`).join('')}</ul>
                </div>
                <div class="evidence-block evidence-gap">
                  <div class="evidence-block-label">Common Gaps</div>
                  <ul>${(item.commonGaps || []).map(g => `<li>${esc(g)}</li>`).join('')}</ul>
                </div>
              </div>
              <div class="evidence-item-meta">
                <span>Format: <strong>${esc(item.format)}</strong></span>
                <span>Retention: <strong>${esc(item.retentionPeriod)}</strong></span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('')}`;
}

/* ===== CROSS-REFERENCES ===== */
async function renderCrossReferences(el) {
  const [rmit, nist] = await Promise.all([
    fetchJSON('cross-references/rmit-mapping.json'),
    fetchJSON('cross-references/nist-mapping.json'),
  ]);

  el.innerHTML = `
    <nav class="breadcrumbs"><a href="#">Home</a><span class="sep">/</span><span class="current">Cross-References</span></nav>
    <h2 style="font-size:1.25rem;margin-bottom:0.5rem">Cross-Reference Mappings</h2>
    <p style="font-size:0.875rem;color:var(--text-secondary);margin-bottom:1.5rem">Mappings between SC-GTRM controls and related frameworks.</p>
    <div class="tabs">
      <button class="tab-btn active" data-tab="rmit">BNM RMiT</button>
      <button class="tab-btn" data-tab="nist">NIST CSF 2.0</button>
    </div>
    <div class="tab-panel active" data-panel="rmit">
      ${rmit ? renderMappingTable(rmit, 'rmitClause', 'rmitTitle') : '<p>No RMiT mapping data available.</p>'}
    </div>
    <div class="tab-panel" data-panel="nist">
      ${nist ? renderNistTable(nist) : '<p>No NIST mapping data available.</p>'}
    </div>`;
}

function renderMappingTable(data, refKey, titleKey) {
  const mappings = data.mappings || [];
  let html = `<p style="font-size:var(--font-size-sm);color:var(--text-secondary);margin-bottom:1rem;">${esc(data.description)}</p><div>`;
  mappings.forEach(m => {
    const simClass = m.similarity === 'high' ? 'badge-similarity-high' : m.similarity === 'medium' ? 'badge-similarity-medium' : 'badge-similarity-low';
    html += `<div class="xref-card">
      <div>
        <span class="xref-source">${esc(m.controlName)}</span>
        <span style="color:var(--text-muted);margin:0 0.5rem;">&#8594;</span>
        <span class="fw-codes">${esc(m[refKey] || 'N/A')}</span>
        <span class="xref-target"> ${esc(m[titleKey])}</span>
      </div>
      <span class="badge ${simClass}">${esc(m.similarity)}</span>
    </div>`;
  });
  html += '</div>';
  return html;
}

function renderNistTable(data) {
  const mappings = data.mappings || [];
  let html = `<p style="font-size:var(--font-size-sm);color:var(--text-secondary);margin-bottom:1rem;">${esc(data.description)}</p><div>`;
  mappings.forEach(m => {
    const simClass = m.similarity === 'high' ? 'badge-similarity-high' : m.similarity === 'medium' ? 'badge-similarity-medium' : 'badge-similarity-low';
    html += `<div class="xref-card">
      <div>
        <span class="xref-source">${esc(m.controlName)}</span>
        <span style="color:var(--text-muted);margin:0 0.5rem;">&#8594;</span>
        <span class="fw-codes">${esc(m.nistFunction)} / ${esc(m.nistCategory)}</span>
        <span class="xref-target"> ${esc(m.nistName)}</span>
      </div>
      <span class="badge ${simClass}">${esc(m.similarity)}</span>
    </div>`;
  });
  html += '</div>';
  return html;
}

/* ===== REQUIREMENTS ===== */
async function renderRequirements(el) {
  const domainSlugs = Object.keys(state.domains);
  const promises = domainSlugs.map(slug =>
    fetchJSON(`requirements/by-domain/${slug}.json`).then(data => ({ slug, data }))
  );
  const results = await Promise.all(promises);

  el.innerHTML = `
    <nav class="breadcrumbs"><a href="#">Home</a><span class="sep">/</span><span class="current">Requirements</span></nav>
    <h2 style="font-size:1.25rem;margin-bottom:0.5rem">Requirements</h2>
    <p style="font-size:0.875rem;color:var(--text-secondary);margin-bottom:1.5rem">SC-GL/2-2023 (R1-2024) requirements organised by domain.</p>
    ${results.map(({ slug, data }) => {
      if (!data || !data.requirements) return '';
      const dom = state.domains[slug];
      return `
        <div class="accordion-item open" style="margin-bottom:0.75rem;">
          <button class="accordion-trigger" data-accordion>
            <span>${esc(dom ? dom.name : slug)} (${data.requirements.length})</span>
            <span class="chevron">&#9654;</span>
          </button>
          <div class="accordion-content">
            ${data.requirements.map(req => `
              <div style="padding:0.75rem 0;border-bottom:1px solid var(--border);">
                <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.25rem;">
                  <span style="font-family:var(--font-mono);font-size:var(--font-size-xs);color:var(--accent);font-weight:600;">${esc(req.id)}</span>
                  <span class="badge badge-${req.priority === 'High' ? 'mandatory' : 'optional'}">${esc(req.priority)}</span>
                </div>
                <p style="font-size:var(--font-size-base);color:var(--text-primary);margin-bottom:0.25rem;">${esc(req.requirement)}</p>
                <p style="font-size:var(--font-size-sm);color:var(--text-muted);">${esc(req.rationale)}</p>
                <div style="font-size:var(--font-size-xs);color:var(--text-muted);margin-top:0.25rem;">
                  Owner: ${esc(req.owner)} &middot; Frequency: ${esc(req.frequency)}
                </div>
              </div>
            `).join('')}
          </div>
        </div>`;
    }).join('')}`;
}

/* ===== SEARCH ===== */
function renderSearch(el, query) {
  if (!query) { renderOverview(el); return; }
  const q = query.toLowerCase();
  const results = [];

  state.controls.forEach(c => {
    if ((c.name + ' ' + c.description + ' ' + c.slug + ' ' + (c.keyActivities || []).join(' ')).toLowerCase().includes(q)) {
      results.push({ type: 'control', item: c });
    }
  });

  Object.entries(state.domains).forEach(([slug, dom]) => {
    if ((dom.name + ' ' + dom.description).toLowerCase().includes(q)) {
      results.push({ type: 'domain', slug, item: dom });
    }
  });

  el.innerHTML = `
    <nav class="breadcrumbs"><a href="#">Home</a><span class="sep">/</span><span class="current">Search: "${esc(query)}"</span></nav>
    <p style="font-size:var(--font-size-sm);color:var(--text-muted);margin-bottom:1rem;">${results.length} result${results.length !== 1 ? 's' : ''}</p>
    ${results.length === 0 ? '<div class="empty-state"><div class="empty-state-text">No results found.</div></div>' :
      results.map(r => {
        if (r.type === 'control') {
          const c = r.item;
          return `<a href="#control/${c.slug}" class="provision-link" style="margin-bottom:0.5rem;">
            <span class="badge badge-type-${c.controlType}">${esc(c.controlType)}</span>
            <span class="provision-id">${esc(c.slug)}</span>
            <span class="provision-title">${esc(c.name)}</span>
          </a>`;
        }
        return `<div class="control-card" style="margin-bottom:0.5rem;cursor:pointer;" onclick="location.hash='#controls?domain=${esc(r.slug)}'">
          <h3 class="control-card-title">${esc(r.item.name)}</h3>
          <p class="control-card-desc">${esc(r.item.description).slice(0, 120)}...</p>
        </div>`;
      }).join('')}`;
}

/* ===== WORK PROGRAM ===== */
async function renderWorkProgram(el) {
  if (!state.testingProcedures) {
    const tp = await fetchJSON('workprogram/testing-procedures.json');
    state.testingProcedures = tp ? (tp.testingProcedures || []) : [];
  }
  if (!state.evidenceMap) {
    const em = await fetchJSON('workprogram/evidence-map.json');
    state.evidenceMap = em ? (em.evidenceItems || []) : [];
  }

  const procCount = state.testingProcedures.length;
  const evCount = state.evidenceMap.length;
  const domainCount = Object.keys(state.domains).length;

  el.innerHTML = `
    <nav class="breadcrumbs">
      <a href="#">Home</a><span class="sep">/</span>
      <span class="current">Work Program</span>
    </nav>
    <h2 style="font-size:1.25rem;margin-bottom:0.5rem">Assessor Work Program</h2>
    <p style="font-size:0.875rem;color:var(--text-secondary);margin-bottom:1.5rem">
      SC-GL/2-2023 (R1-2024) control review work program for capital market intermediary assessments.
    </p>
    <div class="stats-banner">
      <div class="stat-card"><div class="stat-number">${procCount}</div><div class="stat-label">Test Procedures</div></div>
      <div class="stat-card"><div class="stat-number">${evCount}</div><div class="stat-label">Evidence Items</div></div>
      <div class="stat-card"><div class="stat-number">${domainCount}</div><div class="stat-label">Domains</div></div>
      <div class="stat-card"><div class="stat-number">4</div><div class="stat-label">Maturity Levels</div></div>
    </div>
    <div class="tabs">
      <button class="tab-btn active" data-tab="wp-testing">Testing Procedures</button>
      <button class="tab-btn" data-tab="wp-evidence">Evidence Map</button>
      <button class="tab-btn" data-tab="wp-request">Document Request</button>
      <button class="tab-btn" data-tab="wp-scoring">Maturity Scoring</button>
      <button class="tab-btn" data-tab="wp-findings">Findings Template</button>
    </div>
    <div class="tab-panel active" data-panel="wp-testing">${renderWPTesting()}</div>
    <div class="tab-panel" data-panel="wp-evidence">${renderWPEvidence()}</div>
    <div class="tab-panel" data-panel="wp-request">${renderWPDocumentRequest()}</div>
    <div class="tab-panel" data-panel="wp-scoring">${renderWPScoring()}</div>
    <div class="tab-panel" data-panel="wp-findings">${renderWPFindings()}</div>`;
}

function wpGroupByDomain(items, domainKey) {
  const grouped = {};
  for (const item of items) {
    const d = item[domainKey] || 'uncategorized';
    if (!grouped[d]) grouped[d] = [];
    grouped[d].push(item);
  }
  return grouped;
}

/* --- Tab 1: Testing Procedures --- */
function renderWPTesting() {
  const grouped = wpGroupByDomain(state.testingProcedures, 'domain');
  const domainEntries = Object.entries(state.domains);
  let html = '';

  domainEntries.forEach(([slug, dom]) => {
    const procs = grouped[slug];
    if (!procs || !procs.length) return;
    html += `
      <div class="accordion-item open domain-${esc(slug)}" style="margin-bottom:0.75rem;">
        <button class="accordion-trigger" data-accordion>
          <span>${esc(dom.name)} (${procs.length} procedures)</span>
          <span class="chevron">&#9654;</span>
        </button>
        <div class="accordion-content">
          ${procs.map(proc => renderWPProcedure(proc, dom)).join('')}
        </div>
      </div>`;
  });

  return html;
}

function renderWPProcedure(proc, dom) {
  const methodBadge = (m) => `<span class="wp-method-badge wp-method-${esc(m)}">${esc(m)}</span>`;

  return `
    <div style="padding:1rem 0;border-bottom:1px solid var(--border);">
      <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.5rem;flex-wrap:wrap;">
        <strong style="font-size:var(--font-size-base);">${esc(proc.controlName)}</strong>
        <span class="badge badge-domain">${esc(dom.name)}</span>
      </div>
      <p style="font-size:var(--font-size-sm);color:var(--text-secondary);margin-bottom:1rem;">${esc(proc.objective)}</p>

      <table class="wp-test-table">
        <thead>
          <tr><th>#</th><th>Action</th><th>Method</th><th>Evidence Ref</th></tr>
        </thead>
        <tbody>
          ${proc.testSteps.map(ts => `
            <tr>
              <td>${ts.step}</td>
              <td>${esc(ts.action)}</td>
              <td>${methodBadge(ts.method)}</td>
              <td><span class="wp-evidence-ref">${esc(ts.evidenceRef)}</span></td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <div style="font-size:var(--font-size-sm);color:var(--text-muted);margin:0.75rem 0 0.5rem;">
        <strong>Sample Size:</strong> ${esc(proc.sampleSize)}
      </div>

      <div style="margin-bottom:0.75rem;">
        <strong style="font-size:var(--font-size-xs);text-transform:uppercase;color:var(--text-muted);display:block;margin-bottom:0.25rem;">Key Questions</strong>
        <ul class="wp-key-question">
          ${proc.keyQuestions.map(q => `<li>${esc(q)}</li>`).join('')}
        </ul>
      </div>

      <div style="margin-bottom:0.75rem;">
        <strong style="font-size:var(--font-size-xs);text-transform:uppercase;color:var(--text-muted);display:block;margin-bottom:0.25rem;">Red Flags</strong>
        <ul style="list-style:none;padding:0;margin:0;">
          ${proc.redFlags.map(rf => `<li class="wp-red-flag">${esc(rf)}</li>`).join('')}
        </ul>
      </div>

      <div class="maturity-grid">
        <div class="maturity-card maturity-basic"><div class="maturity-label">Basic</div><p>${esc(proc.maturityIndicators.basic)}</p></div>
        <div class="maturity-card maturity-mature"><div class="maturity-label">Mature</div><p>${esc(proc.maturityIndicators.mature)}</p></div>
        <div class="maturity-card maturity-advanced"><div class="maturity-label">Advanced</div><p>${esc(proc.maturityIndicators.advanced)}</p></div>
      </div>
    </div>`;
}

/* --- Tab 2: Evidence Map --- */
function renderWPEvidence() {
  const grouped = wpGroupByDomain(state.evidenceMap, 'domain');
  const domainEntries = Object.entries(state.domains);
  let html = '';

  domainEntries.forEach(([slug, dom]) => {
    const items = grouped[slug];
    if (!items || !items.length) return;
    html += `
      <div class="accordion-item open domain-${esc(slug)}" style="margin-bottom:0.75rem;">
        <button class="accordion-trigger" data-accordion>
          <span>${esc(dom.name)} (${items.length} items)</span>
          <span class="chevron">&#9654;</span>
        </button>
        <div class="accordion-content">
          ${items.map(item => renderWPEvidenceItem(item)).join('')}
        </div>
      </div>`;
  });

  return html;
}

function renderWPEvidenceItem(item) {
  const priorityClass = item.requestPriority === 'essential' ? 'wp-priority-essential'
    : item.requestPriority === 'important' ? 'wp-priority-important'
    : 'wp-priority-supporting';

  return `
    <div class="evidence-item">
      <div class="evidence-item-header">
        <span class="evidence-id">${esc(item.id)}</span>
        <span class="evidence-item-name">${esc(item.name)}</span>
        <span class="badge ${priorityClass}">${esc(item.requestPriority)}</span>
      </div>
      <p class="evidence-item-desc">${esc(item.description)}</p>
      <div class="evidence-detail-grid">
        <div class="evidence-block evidence-good">
          <div class="evidence-block-label">What Good Looks Like</div>
          <ul>${(item.whatGoodLooksLike || []).map(w => `<li>${esc(w)}</li>`).join('')}</ul>
        </div>
        <div class="evidence-block evidence-gap">
          <div class="evidence-block-label">Common Gaps</div>
          <ul>${(item.commonGaps || []).map(g => `<li>${esc(g)}</li>`).join('')}</ul>
        </div>
      </div>
      <div style="margin-bottom:0.5rem;">
        <strong style="font-size:var(--font-size-xs);text-transform:uppercase;color:var(--text-muted);">Linked Controls</strong>
        <div style="display:flex;gap:0.5rem;flex-wrap:wrap;margin-top:0.25rem;">
          ${(item.controlSlugs || []).map(cs => `<a href="#control/${esc(cs)}" class="provision-link" style="display:inline;padding:0.125rem 0.5rem;font-size:var(--font-size-xs);">${esc(cs)}</a>`).join('')}
        </div>
      </div>
      <div class="evidence-item-meta">
        <span>Format: <strong>${esc(item.format)}</strong></span>
        <span>Retention: <strong>${esc(item.retentionPeriod)}</strong></span>
        <span>Sources: <strong>${esc((item.suggestedSources || []).join(', '))}</strong></span>
      </div>
    </div>`;
}

/* --- Tab 3: Document Request --- */
function renderWPDocumentRequest() {
  const grouped = wpGroupByDomain(state.evidenceMap, 'domain');
  const domainEntries = Object.entries(state.domains);
  let html = `
    <div class="disclaimer" style="margin-bottom:1.5rem;">
      Send this list to the client team before the assessment. Remove N/A items based on scoping.
    </div>`;

  let itemNum = 0;
  domainEntries.forEach(([slug, dom]) => {
    const items = grouped[slug];
    if (!items || !items.length) return;
    html += `
      <h3 style="font-size:1rem;font-weight:600;margin:1.5rem 0 0.75rem;">${esc(dom.name)}</h3>
      <table class="wp-request-table">
        <thead>
          <tr><th>#</th><th>Document</th><th>Description</th><th>Priority</th><th>Suggested Source</th></tr>
        </thead>
        <tbody>
          ${items.map(item => {
            itemNum++;
            const priorityClass = item.requestPriority === 'essential' ? 'wp-priority-essential'
              : item.requestPriority === 'important' ? 'wp-priority-important'
              : 'wp-priority-supporting';
            return `<tr>
              <td>${itemNum}</td>
              <td><strong>${esc(item.name)}</strong></td>
              <td>${esc(item.description).slice(0, 150)}${item.description.length > 150 ? '...' : ''}</td>
              <td><span class="badge ${priorityClass}">${esc(item.requestPriority)}</span></td>
              <td>${esc((item.suggestedSources || []).join(', '))}</td>
            </tr>`;
          }).join('')}
        </tbody>
      </table>`;
  });

  return html;
}

/* --- Tab 4: Maturity Scoring --- */
function renderWPScoring() {
  const grouped = controlsByDomain();
  const domainEntries = Object.entries(state.domains);
  let html = '';

  domainEntries.forEach(([slug, dom]) => {
    const ctrls = grouped[slug];
    if (!ctrls || !ctrls.length) return;
    html += `
      <div style="margin-bottom:2rem;">
        <h3 style="font-size:1rem;font-weight:600;margin-bottom:0.75rem;padding-bottom:0.5rem;border-bottom:2px solid var(--border);">${esc(dom.name)}</h3>
        ${ctrls.map(c => {
          const mat = c.maturity || {};
          return `
            <div style="padding:0.75rem 0;border-bottom:1px solid var(--border);">
              <strong style="font-size:var(--font-size-base);display:block;margin-bottom:0.5rem;">${esc(c.name)}</strong>
              <div class="maturity-grid" style="margin-bottom:0.5rem;">
                <div class="maturity-card maturity-basic"><div class="maturity-label">Basic (1)</div><p>${esc(mat.basic || 'Not defined')}</p></div>
                <div class="maturity-card maturity-mature"><div class="maturity-label">Mature (2)</div><p>${esc(mat.mature || 'Not defined')}</p></div>
                <div class="maturity-card maturity-advanced"><div class="maturity-label">Advanced (3)</div><p>${esc(mat.advanced || 'Not defined')}</p></div>
              </div>
              <div class="wp-score-scale">
                <span class="wp-score-level wp-score-0">0 = Not Implemented</span>
                <span class="wp-score-level wp-score-1">1 = Basic</span>
                <span class="wp-score-level wp-score-2">2 = Mature</span>
                <span class="wp-score-level wp-score-3">3 = Advanced</span>
                <span class="wp-score-level wp-score-na">N/A</span>
              </div>
            </div>`;
        }).join('')}
      </div>`;
  });

  html += `
    <div style="background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:1.25rem;margin-top:1.5rem;">
      <h3 style="font-size:1rem;font-weight:600;margin-bottom:0.75rem;">Interpretation Guide</h3>
      <table class="wp-request-table">
        <thead><tr><th>Score Range</th><th>Rating</th><th>Interpretation</th></tr></thead>
        <tbody>
          <tr><td><strong>0 &ndash; 1.0</strong></td><td><span class="badge" style="background:#FEE2E2;color:#DC2626;">Significant Gaps</span></td><td>Significant gaps requiring urgent attention</td></tr>
          <tr><td><strong>1.0 &ndash; 2.0</strong></td><td><span class="badge" style="background:#FEF3C7;color:#D97706;">Developing</span></td><td>Developing &mdash; key controls need strengthening</td></tr>
          <tr><td><strong>2.0 &ndash; 2.5</strong></td><td><span class="badge" style="background:#DCFCE7;color:#16A34A;">Mature</span></td><td>Mature &mdash; meets expectations</td></tr>
          <tr><td><strong>2.5 &ndash; 3.0</strong></td><td><span class="badge" style="background:#DBEAFE;color:#2563EB;">Advanced</span></td><td>Advanced &mdash; exceeds expectations</td></tr>
        </tbody>
      </table>
    </div>`;

  return html;
}

/* --- Tab 5: Findings Template --- */
function renderWPFindings() {
  let html = '';

  /* Finding template structure */
  html += `
    <h3 style="font-size:1rem;font-weight:600;margin-bottom:0.75rem;">Finding Template Structure</h3>
    <div class="wp-finding-card wp-severity-info" style="margin-bottom:2rem;">
      <div class="wp-template-field"><span class="wp-template-label">Finding ID</span><span class="wp-template-value">[Sequential ID, e.g., F-001]</span></div>
      <div class="wp-template-field"><span class="wp-template-label">Title</span><span class="wp-template-value">[Concise finding title]</span></div>
      <div class="wp-template-field"><span class="wp-template-label">Domain</span><span class="wp-template-value">[SC-GTRM domain]</span></div>
      <div class="wp-template-field"><span class="wp-template-label">Control Reference</span><span class="wp-template-value">[Control slug]</span></div>
      <div class="wp-template-field"><span class="wp-template-label">Severity</span><span class="wp-template-value">[Critical / High / Medium / Low / Informational]</span></div>
      <div class="wp-template-field"><span class="wp-template-label">Description</span><span class="wp-template-value">[Detailed description of the finding]</span></div>
      <div class="wp-template-field"><span class="wp-template-label">Criteria</span><span class="wp-template-value">[SC-GL/2-2023 (R1-2024) requirement or expected practice]</span></div>
      <div class="wp-template-field"><span class="wp-template-label">Risk / Impact</span><span class="wp-template-value">[Business and regulatory impact]</span></div>
      <div class="wp-template-field"><span class="wp-template-label">Recommendation</span><span class="wp-template-value">[Specific remediation steps]</span></div>
      <div class="wp-template-field"><span class="wp-template-label">Management Response</span><span class="wp-template-value">[To be completed by client]</span></div>
      <div class="wp-template-field"><span class="wp-template-label">Target Date</span><span class="wp-template-value">[To be completed by client]</span></div>
      <div class="wp-template-field"><span class="wp-template-label">Status</span><span class="wp-template-value">[Open / In Progress / Closed]</span></div>
    </div>`;

  /* Severity guide */
  html += `
    <h3 style="font-size:1rem;font-weight:600;margin-bottom:0.75rem;">Severity Guide</h3>
    <table class="wp-request-table" style="margin-bottom:2rem;">
      <thead><tr><th>Severity</th><th>Description</th><th>Expected Response</th></tr></thead>
      <tbody>
        <tr><td><span class="badge wp-severity-critical">Critical</span></td>
          <td>Fundamental control failure with immediate regulatory or business impact. Systemic weakness affecting core capital market operations.</td>
          <td>Immediate remediation required; escalate to board</td></tr>
        <tr><td><span class="badge wp-severity-high">High</span></td>
          <td>Significant control gap creating material risk to operations, data, or regulatory compliance.</td>
          <td>Remediation within 30 days; senior management oversight</td></tr>
        <tr><td><span class="badge wp-severity-medium">Medium</span></td>
          <td>Control weakness that could lead to issues if not addressed. Does not meet SC-GL/2-2023 (R1-2024) expectations fully.</td>
          <td>Remediation within 90 days; management action plan</td></tr>
        <tr><td><span class="badge wp-severity-low">Low</span></td>
          <td>Minor control gap or enhancement opportunity. Limited direct risk impact.</td>
          <td>Remediation within 180 days; tracked in action log</td></tr>
        <tr><td><span class="badge wp-severity-info">Informational</span></td>
          <td>Observation or good practice recommendation. No compliance gap identified.</td>
          <td>For management consideration; no mandatory action</td></tr>
      </tbody>
    </table>`;

  /* Example findings */
  html += `
    <h3 style="font-size:1rem;font-weight:600;margin-bottom:0.75rem;">Example Findings</h3>`;

  const examples = [
    {
      id: 'F-001',
      title: 'No Documented Incident Response Plan',
      domain: 'Incident Management',
      control: 'incident-response-plan',
      severity: 'critical',
      description: 'The entity does not have a documented incident response plan for technology incidents affecting capital market operations. When queried, staff indicated they follow ad-hoc procedures that are not formalised or tested.',
      criteria: 'SC-GL/2-2023 (R1-2024) requires capital market intermediaries to maintain documented and tested incident response procedures covering detection, containment, eradication, recovery, and post-incident review.',
      riskImpact: 'Without a documented plan, response to cyber incidents or system failures will be uncoordinated, increasing downtime, data loss, and potential market disruption. Regulatory sanctions for non-compliance with SC expectations.',
      recommendation: 'Develop and implement a comprehensive incident response plan covering all phases. Assign response team roles, define escalation procedures, establish communication protocols, and schedule quarterly tabletop exercises.'
    },
    {
      id: 'F-002',
      title: 'DR Testing Does Not Cover All Critical Systems',
      domain: 'Business Continuity',
      control: 'dr-testing-programme',
      severity: 'medium',
      description: 'Disaster recovery testing is performed annually but only covers the core trading platform. Market data feeds, client portal, and settlement reconciliation systems are excluded from DR test scope.',
      criteria: 'SC-GL/2-2023 (R1-2024) expects DR testing to cover all critical systems supporting capital market operations, with recovery validated against defined RTOs and RPOs.',
      riskImpact: 'Untested recovery procedures for market data and settlement systems may fail during an actual disaster, causing prolonged outage of critical market services and potential settlement failures.',
      recommendation: 'Expand DR test scope to include all systems classified as critical in the BIA. Validate recovery of market data feeds, client portal, and settlement systems against defined RTOs. Document results and remediate gaps.'
    },
    {
      id: 'F-003',
      title: 'Technology Risk Policies Overdue for Review',
      domain: 'Governance & Oversight',
      control: 'technology-risk-policy-suite',
      severity: 'low',
      description: 'Three of the seven technology risk policies (Cloud Security Policy, Data Classification Policy, and Third-Party Risk Policy) have not been reviewed within the 12-month cycle. Last review dates are between 14-18 months ago.',
      criteria: 'SC-GL/2-2023 (R1-2024) requires technology risk policies to be reviewed at least annually and approved by the board to ensure alignment with the evolving threat landscape and regulatory expectations.',
      riskImpact: 'Stale policies may not reflect current risks, SC guidance updates, or changes in the entity\'s technology environment. Limited impact as core policies (cybersecurity, BCP, incident management) are current.',
      recommendation: 'Prioritise review and board approval of the three overdue policies. Implement a policy review calendar with automated reminders to prevent future lapses. Consider aligning all policy review dates to a single annual cycle.'
    }
  ];

  examples.forEach(ex => {
    html += `
      <div class="wp-finding-card wp-severity-${ex.severity}" style="margin-bottom:1rem;">
        <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:0.75rem;flex-wrap:wrap;">
          <span style="font-family:var(--mono);font-weight:600;font-size:var(--font-size-sm);">${esc(ex.id)}</span>
          <span class="badge wp-severity-${ex.severity}">${esc(ex.severity)}</span>
          <span class="badge badge-domain">${esc(ex.domain)}</span>
        </div>
        <h4 style="font-size:var(--font-size-base);font-weight:600;margin-bottom:0.75rem;">${esc(ex.title)}</h4>
        <div class="wp-template-field"><span class="wp-template-label">Control</span><a href="#control/${esc(ex.control)}">${esc(ex.control)}</a></div>
        <div class="wp-template-field"><span class="wp-template-label">Description</span><span>${esc(ex.description)}</span></div>
        <div class="wp-template-field"><span class="wp-template-label">Criteria</span><span>${esc(ex.criteria)}</span></div>
        <div class="wp-template-field"><span class="wp-template-label">Risk / Impact</span><span>${esc(ex.riskImpact)}</span></div>
        <div class="wp-template-field"><span class="wp-template-label">Recommendation</span><span>${esc(ex.recommendation)}</span></div>
        <div class="wp-template-field"><span class="wp-template-label">Management Response</span><span style="color:var(--text-muted);font-style:italic;">[To be completed]</span></div>
        <div class="wp-template-field"><span class="wp-template-label">Target Date</span><span style="color:var(--text-muted);font-style:italic;">[To be completed]</span></div>
        <div class="wp-template-field"><span class="wp-template-label">Status</span><span class="badge badge-category">Open</span></div>
      </div>`;
  });

  return html;
}

/* ===== EXPORT ===== */
function exportToPDF() { window.print(); }

function exportToCSV() {
  const rows = [['Slug', 'Name', 'Domain', 'Type', 'Owner', 'Frequency', 'Description']];
  state.controls.forEach(c => {
    rows.push([c.slug, c.name, c.domain, c.controlType, c.owner, c.frequency, c.description.replace(/"/g, '""')]);
  });
  const csv = rows.map(r => r.map(f => `"${f}"`).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'sc-gtrm-controls.csv';
  a.click();
  URL.revokeObjectURL(url);
}

/* ===== BOOT ===== */
document.addEventListener('DOMContentLoaded', init);
