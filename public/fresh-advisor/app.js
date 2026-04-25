/* Fresh Advisor — app.js */

document.addEventListener('DOMContentLoaded', () => {
  renderHeader();
  renderWasteHero();
  renderAlerts();
  renderRecommendations();
  renderShipments();
  renderSuppliers();
  renderInventory();
  renderMarket();
  renderStores();
  animateWasteCounter();
});

/* ── Header ── */
function renderHeader() {
  const { retailer, departments } = DATA;

  document.getElementById('retailerName').textContent = retailer.name;
  document.getElementById('headerUser').textContent = `${retailer.buyer} · ${retailer.buyerTitle}`;
  document.getElementById('headerDate').textContent = retailer.reportDate;

  const nav = document.getElementById('deptSwitcher');
  departments.forEach(dept => {
    const btn = document.createElement('button');
    btn.className = 'dept-btn' +
      (dept.active ? ' dept-btn--active' : ' dept-btn--inactive');
    btn.textContent = dept.label;
    if (!dept.active) btn.title = 'Coming soon';
    nav.appendChild(btn);
  });
}

/* ── Waste Hero ── */
function renderWasteHero() {
  const { waste, salesVsPlan, stockouts, supplierIssues } = DATA.kpis;

  // Target + pill
  document.getElementById('wasteTarget').textContent = waste.target.toFixed(1) + '%';

  const over = waste.actual > waste.target;
  const diff = Math.abs(waste.actual - waste.target).toFixed(1);
  const pill = document.getElementById('wasteStatusPill');
  pill.textContent = over ? `▲ OVER TARGET +${diff}pts` : `▼ UNDER TARGET −${diff}pts`;
  pill.className = 'waste-status-pill ' + (over ? 'waste-status-pill--over' : 'waste-status-pill--under');

  // Secondary stats
  const container = document.getElementById('secondaryStats');

  const secondaries = [
    {
      val: salesVsPlan.actual.toFixed(1) + '%',
      label: 'Sales vs Plan',
      trend: salesVsPlan.trend,
      cls: salesVsPlan.actual >= 99 ? 'ok' : salesVsPlan.actual >= 95 ? 'warn' : 'bad',
    },
    {
      val: stockouts.actual,
      label: 'Stockout Events',
      trend: stockouts.trend,
      cls: stockouts.actual === 0 ? 'ok' : stockouts.actual <= 2 ? 'warn' : 'bad',
    },
    {
      val: supplierIssues.actual,
      label: 'Supplier Issues',
      trend: supplierIssues.trend,
      cls: supplierIssues.actual === 0 ? 'ok' : supplierIssues.actual <= 1 ? 'warn' : 'bad',
    },
  ];

  secondaries.forEach(s => {
    const div = document.createElement('div');
    div.className = 'secondary-stat';
    div.innerHTML = `
      <div class="secondary-stat-val secondary-stat-val--${s.cls}">${s.val}</div>
      <div class="secondary-stat-label">${s.label}</div>
      <div class="secondary-stat-trend">${s.trend}</div>
    `;
    container.appendChild(div);
  });

  // Teaser line
  const recos = DATA.recommendations;
  const wasteRecos = recos.filter(r => r.wasteImpact !== null);
  const totalRecovery = wasteRecos.reduce((sum, r) => sum + Math.abs(r.wasteImpact), 0).toFixed(1);
  document.getElementById('recoTeaser').innerHTML =
    `<span class="waste-hero-sub-icon">✦</span>
     <span><strong>${recos.length} AI recommendations</strong> identified — acting on all could recover up to <strong>${totalRecovery}pts</strong> of waste this week.</span>`;
}

/* ── Animated Waste Counter ── */
function animateWasteCounter() {
  const target = DATA.kpis.waste.actual;
  const el = document.getElementById('wasteNumber');
  const duration = 1400;
  const start = performance.now();

  function tick(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = (eased * target).toFixed(1);
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

/* ── Alerts ── */
function renderAlerts() {
  const strip = document.getElementById('alertsStrip');
  DATA.alerts.forEach((alert, i) => {
    const chip = document.createElement('div');
    chip.className = `alert-chip alert-chip--${alert.severity} fade-up fade-up-${Math.min(i+1,6)}`;
    chip.innerHTML = `
      <span class="alert-chip-icon">${alert.icon}</span>
      <div class="alert-chip-body">
        <div class="alert-chip-title">${alert.title}</div>
        <div class="alert-chip-detail">${alert.detail}</div>
      </div>
    `;
    strip.appendChild(chip);
  });
}

/* ── Recommendations ── */
function renderRecommendations() {
  const wasteRecos = DATA.recommendations.filter(r => r.wasteImpact !== null);
  const totalWaste = wasteRecos.reduce((s, r) => s + Math.abs(r.wasteImpact), 0).toFixed(1);
  const totalRev = DATA.recommendations.reduce((s, r) => s + (r.revenueImpact || 0), 0);

  document.getElementById('recoSubtitle').textContent =
    `Up to ${totalWaste}pts waste recovery · $${(totalRev/1000).toFixed(0)}k revenue opportunity`;

  const grid = document.getElementById('recommendationsGrid');
  DATA.recommendations.forEach((reco, i) => {
    const card = document.createElement('div');
    card.className = `reco-card reco-card--${reco.priority} fade-up fade-up-${Math.min(i+1,6)}`;

    const wasteVal = reco.wasteImpact !== null
      ? `−${Math.abs(reco.wasteImpact).toFixed(1)}pts waste`
      : '—';
    const wasteClass = reco.wasteImpact !== null ? 'waste' : 'na';

    const revVal = reco.revenueImpact !== null
      ? `+$${reco.revenueImpact.toLocaleString()}`
      : '—';
    const revClass = reco.revenueImpact !== null ? 'rev' : 'na';

    const signalsHtml = reco.signals
      .map(s => `<div class="reco-signal">${s}</div>`)
      .join('');

    const actionsHtml = reco.actions
      .map(a => `<div class="reco-action"><div class="reco-action-check"></div><span>${a}</span></div>`)
      .join('');

    card.innerHTML = `
      <div class="reco-card-top">
        <div class="reco-card-header">
          <span class="reco-priority-badge reco-priority-badge--${reco.priority}">${reco.priority}</span>
          <span class="reco-confidence">
            <span class="reco-confidence-dot"></span>
            ${reco.confidence} confidence
          </span>
        </div>
        <div class="reco-title">${reco.title}</div>
        <div class="reco-summary">${reco.summary}</div>
      </div>
      <div class="reco-metrics">
        <div class="reco-metric">
          <div class="reco-metric-val reco-metric-val--${wasteClass}">${wasteVal}</div>
          <div class="reco-metric-label">Waste impact</div>
        </div>
        <div class="reco-metric">
          <div class="reco-metric-val reco-metric-val--${revClass}">${revVal}</div>
          <div class="reco-metric-label">Revenue impact</div>
        </div>
      </div>
      <button class="reco-expand-btn" onclick="toggleReco('${reco.id}')">
        <span>View reasoning & actions</span>
        <span class="reco-chevron" id="chevron-${reco.id}">▼</span>
      </button>
      <div class="reco-details" id="details-${reco.id}">
        <div class="reco-reasoning">${reco.reasoning}</div>
        <div>
          <div class="reco-signals-label">Data signals</div>
          <div class="reco-signals-list">${signalsHtml}</div>
        </div>
        <div>
          <div class="reco-actions-label">Recommended actions</div>
          <div class="reco-actions-list">${actionsHtml}</div>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

function toggleReco(id) {
  const details = document.getElementById(`details-${id}`);
  const chevron = document.getElementById(`chevron-${id}`);
  const open = details.classList.toggle('reco-details--open');
  chevron.style.transform = open ? 'rotate(180deg)' : '';
}

/* ── Shipments ── */
function renderShipments() {
  const list = document.getElementById('shipmentsList');
  DATA.shipments.forEach(sh => {
    const row = document.createElement('div');
    row.className = 'shipment-row';
    const noteHtml = sh.note
      ? `<div class="shipment-note shipment-note--${sh.status}">${sh.note}</div>`
      : '';
    row.innerHTML = `
      <div class="shipment-status-dot shipment-status-dot--${sh.status}"></div>
      <div class="shipment-body">
        <div class="shipment-top">
          <span class="shipment-item">${sh.items}</span>
          <span class="shipment-cases">${sh.cases} cases</span>
        </div>
        <div class="shipment-meta">
          <span class="shipment-supplier">${sh.supplier}</span>
          <span class="shipment-eta">· ${sh.arriving}</span>
        </div>
        ${noteHtml}
      </div>
    `;
    list.appendChild(row);
  });
}

/* ── Suppliers ── */
function renderSuppliers() {
  const list = document.getElementById('suppliersList');
  DATA.suppliers.forEach(sup => {
    const card = document.createElement('div');
    card.className = 'supplier-card';

    const issueHtml = sup.openIssues > 0
      ? `<span class="supplier-issues">${sup.openIssues} open issue${sup.openIssues > 1 ? 's' : ''}</span>`
      : '';

    const onTimeColor = sup.onTime >= 95 ? '#2de87e' : sup.onTime >= 85 ? '#ffb547' : '#ff4f5e';
    const qualityColor = sup.quality >= 95 ? '#2de87e' : sup.quality >= 85 ? '#ffb547' : '#ff4f5e';

    card.innerHTML = `
      <div class="supplier-top">
        <div class="supplier-name-wrap">
          <span class="supplier-name">${sup.name}</span>
          <span class="supplier-badge supplier-badge--${sup.status}">${sup.status}</span>
        </div>
        ${issueHtml}
      </div>
      <div class="supplier-cats">${sup.categories.join(' · ')}</div>
      <div class="supplier-scores">
        <div class="supplier-score">
          <div class="supplier-score-label">On-time</div>
          <div class="supplier-score-bar-track">
            <div class="supplier-score-bar-fill" style="width:${sup.onTime}%; background:${onTimeColor}"></div>
          </div>
          <div class="supplier-score-val">${sup.onTime}%</div>
        </div>
        <div class="supplier-score">
          <div class="supplier-score-label">Quality</div>
          <div class="supplier-score-bar-track">
            <div class="supplier-score-bar-fill" style="width:${sup.quality}%; background:${qualityColor}"></div>
          </div>
          <div class="supplier-score-val">${sup.quality}%</div>
        </div>
      </div>
    `;
    list.appendChild(card);
  });
}

/* ── Inventory / Days of Supply ── */
function renderInventory() {
  const table = document.getElementById('inventoryTable');

  // Header
  const hdr = document.createElement('div');
  hdr.className = 'inventory-header-row';
  hdr.innerHTML = `
    <span class="inv-hdr" style="flex:1">SKU</span>
    <span class="inv-hdr" style="width:100px">Days of supply</span>
    <span class="inv-hdr" style="width:44px;text-align:right">Days</span>
    <span class="inv-hdr" style="width:72px;text-align:right">Velocity</span>
  `;
  table.appendChild(hdr);

  DATA.inventory.forEach(item => {
    const pct = Math.min((item.dos / item.shelfLife) * 100, 100);
    const row = document.createElement('div');
    row.className = 'inventory-row';
    row.innerHTML = `
      <div class="inventory-sku">
        <div class="inventory-sku-name">${item.sku}</div>
        <div class="inventory-sku-cat">${item.category}</div>
      </div>
      <div class="inventory-bar-col">
        <div class="inventory-bar-track">
          <div class="inventory-bar-fill inventory-bar-fill--${item.status}" style="width:${pct}%"></div>
        </div>
      </div>
      <div class="inventory-dos inventory-dos--${item.status}">${item.dos.toFixed(1)}d</div>
      <div class="inventory-velocity">${item.velocity}</div>
    `;
    table.appendChild(row);
  });
}

/* ── Market ── */
function renderMarket() {
  const grid = document.getElementById('marketGrid');
  DATA.market.forEach((item, i) => {
    const card = document.createElement('div');
    card.className = `market-card market-card--${item.severity} fade-up fade-up-${Math.min(i+1,6)}`;
    card.innerHTML = `
      <div class="market-icon">${item.icon}</div>
      <div class="market-title">${item.title}</div>
      <div class="market-detail">${item.detail}</div>
      <div class="market-impact">${item.impact}</div>
      <div class="market-source">${item.source}</div>
    `;
    grid.appendChild(card);
  });
}

/* ── Stores ── */
function renderStores() {
  const grid = document.getElementById('storesGrid');
  const maxWaste = Math.max(...DATA.stores.map(s => s.waste));

  DATA.stores.forEach(store => {
    const over = store.waste > store.target;
    const at = Math.abs(store.waste - store.target) < 0.1;
    const cls = at ? 'at' : over ? 'over' : 'under';
    const barPct = (store.waste / maxWaste) * 100;

    const trendLabel = store.trend === 'up' ? '↑ trending up' :
                       store.trend === 'down' ? '↓ improving' : '→ steady';

    const card = document.createElement('div');
    card.className = `store-card store-card--${over ? 'over' : 'under'}`;
    card.innerHTML = `
      <div class="store-top">
        <span class="store-name">Store #${store.id} · ${store.name}</span>
      </div>
      <div class="store-waste store-waste--${cls}">${store.waste.toFixed(1)}%</div>
      <div class="store-bar-track">
        <div class="store-bar-fill store-bar-fill--${cls}" style="width:${barPct}%"></div>
      </div>
      <div class="store-trend store-trend--${store.trend}">${trendLabel}</div>
    `;
    grid.appendChild(card);
  });
}
