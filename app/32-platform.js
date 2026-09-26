/* ===================== ☁️ COHASSET SCHOOLS · consola del superadmin =====================
   Un solo dueño (profiles.is_superadmin) maneja todos los colegios que usan
   la plataforma: alta desde un modelo (NIS es el primero), marca y apps de
   cada uno, estado comercial, cobros mensuales, contactos y bitácora.
   Tablas: schools · apps · school_apps · school_contacts · school_payments ·
   school_interactions (migraciones 2026-09-26_01 y _02). Solo el superadmin
   pasa las políticas de RLS; un admin de colegio no ve nada de esto. */

const PLATFORM_TABS = [
  {key:'platform', label:'☁️ Overview'},
  {key:'schools',  label:'🏫 Schools'},
  {key:'payments', label:'💳 Payments'},
  {key:'contacts', label:'📇 Contacts'},
];
const _PL_STATUS = {trial:'🧪 trial', active:'✅ active', suspended:'⏸ suspended', churned:'✖ churned'};
const _PL_KIND   = {call:'📞 Call', whatsapp:'💬 WhatsApp', email:'✉️ Email', meeting:'🤝 Meeting', visit:'🏫 Visit', note:'📝 Note'};
const _plMoney = (n,c)=> (c==='USD'?'US$ ':'S/ ') + Number(n||0).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});
const _plDate  = d => d ? String(d).slice(0,10) : '—';
const _plToday = () => new Date().toISOString().slice(0,10);
const _plCSS = `<style>
  .pl-kpis{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:12px;margin:10px 0 18px}
  .pl-kpi{padding:14px 16px}.pl-kpi b{display:block;font-size:1.6rem;line-height:1.1}.pl-kpi span{font-size:.85rem}
  .pl-tabs{display:flex;gap:8px;flex-wrap:wrap;margin:-4px 0 14px}
  .pl-tabs a{padding:6px 12px;border-radius:999px;background:var(--card,#fff);border:1px solid var(--line,#d6d9e6);text-decoration:none;color:inherit;font-weight:600;cursor:pointer}
  .pl-tabs a.on{background:var(--accent,#3b5bdb);color:#fff;border-color:transparent}
  table.pl{width:100%;border-collapse:collapse;font-size:.9rem}
  table.pl th,table.pl td{padding:7px 8px;border-bottom:1px solid var(--line,#e5e7f0);text-align:left;vertical-align:top}
  table.pl th{font-size:.78rem;letter-spacing:.04em;text-transform:uppercase;opacity:.7}
  .pl-form{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:10px;margin-top:8px}
  .pl-form label{display:flex;flex-direction:column;gap:4px;font-size:.85rem}
  .pl-form label.inline{flex-direction:row;align-items:center;gap:8px}
  .pl-form input:not([type=checkbox]),.pl-form select,.pl-form textarea{padding:6px 8px;border:1px solid var(--line,#d6d9e6);border-radius:8px;background:var(--card,#fff);color:inherit;font:inherit}
  .pl-form .wide{grid-column:1/-1}
  .chip{font-size:.75rem;padding:1px 8px;border-radius:999px;background:var(--accent-soft,#e7ecfd);white-space:nowrap}
  .chip.bad{background:#fee2e2;color:#991b1b}.chip.ok{background:#dcfce7;color:#166534}.chip.warn{background:#fef3c7;color:#92400e}
  .sch-card{margin-bottom:16px}.sch-head{display:flex;gap:14px;align-items:center;flex-wrap:wrap}
  .sch-head img{height:44px;max-width:180px;object-fit:contain;background:#fff;border-radius:8px;padding:4px}
  .sch-title{display:flex;flex-direction:column;gap:2px;flex:1;min-width:200px}
  .sch-actions{display:flex;gap:8px;flex-wrap:wrap}
  .sch-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:6px 14px;margin-top:6px}
  .sch-app{display:flex;gap:8px;align-items:center;font-size:.9rem;cursor:pointer}
  details.card>summary{cursor:pointer;font-weight:600}
  .muted.small{font-size:.8rem}
</style>`;

async function adminPlatform(tab='platform'){
  const main = $('#main');
  if(!(state.profile && state.profile.is_superadmin)){
    main.innerHTML = `<h1>☁️ Cohasset Schools</h1><p class="muted">Only the platform superadmin can open this console.</p>`;
    return;
  }
  main.innerHTML = `<h1>☁️ Cohasset Schools</h1><p class="muted">Loading…</p>`;
  const q = await Promise.all([
    sb.from('schools').select('*').order('name'),
    sb.from('apps').select('*').order('sort'),
    sb.from('school_apps').select('school_id,app_key,enabled'),
    sb.from('profiles').select('school_id,role,is_demo'),
    sb.from('school_payments').select('*').order('due_date',{ascending:false}),
    sb.from('school_contacts').select('*').order('is_primary',{ascending:false}).order('name'),
    sb.from('school_interactions').select('*').order('happened_at',{ascending:false}),
  ]);
  const err = q.find(r=>r.error);
  if(err){ main.innerHTML = `<h1>☁️ Cohasset Schools</h1><p class="muted">Could not load: ${esc(err.error.message)}</p>`; return; }
  const D = { schools:q[0].data||[], apps:q[1].data||[], sapps:q[2].data||[], profiles:q[3].data||[],
              payments:q[4].data||[], contacts:q[5].data||[], inter:q[6].data||[] };
  D.on = {}; D.sapps.forEach(r=>{ D.on[r.school_id+'|'+r.app_key] = !!r.enabled; });
  D.cnt = {}; D.profiles.forEach(p=>{ const k=p.school_id; D.cnt[k]=D.cnt[k]||{s:0,t:0,a:0,demo:0}; if(p.is_demo) D.cnt[k].demo++; D.cnt[k][p.role==='student'?'s':p.role==='teacher'?'t':'a']++; });
  D.byId = Object.fromEntries(D.schools.map(s=>[s.id,s]));
  window._PL = D;

  window._plTab = tab;   // el admin navega por el menú lateral (bindNav → renderAdmin), no por el hash
  const tabs = PLATFORM_TABS.map(t=>`<a class="${t.key===tab?'on':''}" onclick="renderAdmin('${t.key}')">${t.label}</a>`).join('');
  const body = tab==='schools' ? _plSchools(D) : tab==='payments' ? _plPayments(D) : tab==='contacts' ? _plContacts(D) : _plOverview(D);
  main.innerHTML = `${_plCSS}<h1>☁️ Cohasset Schools</h1>
    <p class="muted" style="margin-top:-6px">Platform console · every school that runs on this portal, in one place.</p>
    <div class="pl-tabs">${tabs}</div>${body}`;
}

/* ---------- Overview ---------- */
function _plOverview(D){
  const today=_plToday(), soon=new Date(Date.now()+7*864e5).toISOString().slice(0,10);
  const by = s=>D.schools.filter(x=>x.status===s).length;
  const students = D.profiles.filter(p=>p.role==='student' && !p.is_demo).length;
  const mrr = {}; D.schools.filter(s=>s.status==='active').forEach(s=>{ mrr[s.currency]=(mrr[s.currency]||0)+Number(s.monthly_fee||0); });
  const overdue = D.payments.filter(p=>p.status==='overdue' || (p.status==='pending' && p.due_date<today));
  const pending = D.payments.filter(p=>p.status==='pending' && p.due_date>=today);
  const actions = D.inter.filter(i=>i.next_action && !i.done).sort((a,b)=>String(a.next_action_at||'9').localeCompare(String(b.next_action_at||'9')));
  const kpi = (b,s,cls='')=>`<div class="card pl-kpi"><b class="${cls}">${b}</b><span class="muted">${s}</span></div>`;
  const row = p=>{ const s=D.byId[p.school_id]||{}; return `<tr><td>${esc(s.name||'?')}</td><td>${_plDate(p.period_start).slice(0,7)}</td><td>${_plMoney(p.amount,p.currency)}</td><td>${_plDate(p.due_date)}</td><td><span class="chip ${p.status==='overdue'||p.due_date<today?'bad':'warn'}">${p.status}</span></td></tr>`; };
  const act = i=>{ const s=D.byId[i.school_id]||{}; const late=i.next_action_at && i.next_action_at<today; return `<tr><td>${_plDate(i.next_action_at)} ${late?'<span class="chip bad">late</span>':i.next_action_at&&i.next_action_at<=soon?'<span class="chip warn">this week</span>':''}</td><td>${esc(s.name||'?')}</td><td>${esc(i.next_action)}</td><td><button class="btn small ghost" onclick="window._plDone('${i.id}')">✓ Done</button></td></tr>`; };
  return `<div class="pl-kpis">
      ${kpi(D.schools.length,'schools')}${kpi(by('active'),'active')}${kpi(by('trial'),'in trial')}
      ${kpi(students,'real students')}
      ${Object.keys(mrr).length ? Object.entries(mrr).map(([c,v])=>kpi(_plMoney(v,c),'monthly recurring')).join('') : kpi('—','monthly recurring')}
      ${kpi(overdue.length,'overdue payments', overdue.length?'bad':'')}
    </div>
    <div class="card"><h3 style="margin-top:0">📌 Next actions</h3>
      ${actions.length ? `<table class="pl"><tr><th>When</th><th>School</th><th>Action</th><th></th></tr>${actions.map(act).join('')}</table>` : '<p class="muted">Nothing pending. Log a call or meeting in 📇 Contacts to plan the next step.</p>'}
    </div>
    <div class="card"><h3 style="margin-top:0">💳 Payments to watch</h3>
      ${(overdue.length||pending.length) ? `<table class="pl"><tr><th>School</th><th>Period</th><th>Amount</th><th>Due</th><th>Status</th></tr>${overdue.concat(pending).map(row).join('')}</table>` : '<p class="muted">No pending or overdue payments.</p>'}
    </div>
    <div class="card"><h3 style="margin-top:0">🏫 Schools at a glance</h3>
      <table class="pl"><tr><th>School</th><th>Address</th><th>Status</th><th>Plan</th><th>Fee</th><th>Students</th><th>Teachers</th></tr>
      ${D.schools.map(s=>{ const c=D.cnt[s.id]||{s:0,t:0,a:0}; return `<tr><td><b>${esc(s.name)}</b> ${s.is_demo?'<span class="chip">demo</span>':''}</td><td><a href="https://${esc(s.domain||s.slug+'.cohasset.pe')}" target="_blank" rel="noopener">${esc(s.domain||s.slug+'.cohasset.pe')}</a></td><td>${_PL_STATUS[s.status]||s.status}</td><td>${esc(s.plan||'')}</td><td>${s.monthly_fee>0?_plMoney(s.monthly_fee,s.currency):'—'}</td><td>${c.s}${s.students_cap?' / '+s.students_cap:''}</td><td>${c.t}</td></tr>`; }).join('')}
      </table></div>`;
}

/* ---------- Schools ---------- */
function _plSchools(D){
  const card = s => {
    const c = D.cnt[s.id]||{s:0,t:0,a:0};
    const appsHTML = D.apps.map(a=>`<label class="sch-app" title="${esc(a.description||'')}">
        <input type="checkbox" data-sid="${s.id}" data-app="${esc(a.key)}" ${D.on[s.id+'|'+a.key]?'checked':''} onchange="window._plApp(this)">
        <span>${esc(a.label)}</span></label>`).join('');
    const tpl = s.template_of ? (D.byId[s.template_of]||{}).name : null;
    return `<div class="card sch-card" id="sch-${s.id}">
      <div class="sch-head">
        <img src="${esc(s.logo_url||'assets/cohasset-school.svg')}" alt="" onerror="this.style.visibility='hidden'">
        <div class="sch-title">
          <b>${esc(s.name)} <span class="chip">${_PL_STATUS[s.status]||s.status}</span> ${s.is_demo?'<span class="chip">🧪 demo</span>':''}</b>
          <span class="muted">${esc(s.slug)} · <a href="https://${esc(s.domain||s.slug+'.cohasset.pe')}" target="_blank" rel="noopener">${esc(s.domain||s.slug+'.cohasset.pe')}</a>${tpl?' · from model: '+esc(tpl):''}</span>
          <span class="muted">👩‍🎓 ${c.s} students · 👨‍🏫 ${c.t} teachers · 🛡️ ${c.a} admins · ${esc(s.plan||'')} · ${s.monthly_fee>0?_plMoney(s.monthly_fee,s.currency)+'/month':'no fee'}</span>
        </div>
        <div class="sch-actions">
          <button class="btn small" onclick="location.href='?school=${encodeURIComponent(s.slug)}'">👁 Preview</button>
          <button class="btn small ghost" onclick="window._plToggle('sch-edit-${s.id}')">✏️ Edit</button>
        </div>
      </div>
      <details class="sch-edit" id="sch-edit-${s.id}">
        <summary class="muted">Branding · plan · billing</summary>
        <div class="pl-form">
          <label>Name <input data-f="name" value="${esc(s.name)}"></label>
          <label>Short name <input data-f="short_name" value="${esc(s.short_name||'')}"></label>
          <label>Domain <input data-f="domain" value="${esc(s.domain||'')}" placeholder="school.cohasset.pe"></label>
          <label>Accent <input data-f="accent" type="color" value="${esc(s.accent||'#2563EB')}"></label>
          <label>Logo (light bg) <input data-f="logo_url" value="${esc(s.logo_url||'')}"></label>
          <label>Logo (header) <input data-f="logo_dark_url" value="${esc(s.logo_dark_url||'')}"></label>
          <label>Status <select data-f="status">${Object.keys(_PL_STATUS).map(k=>`<option value="${k}" ${s.status===k?'selected':''}>${_PL_STATUS[k]}</option>`).join('')}</select></label>
          <label>Plan <input data-f="plan" value="${esc(s.plan||'')}" placeholder="school · demo · pilot"></label>
          <label>Monthly fee <input data-f="monthly_fee" type="number" step="0.01" min="0" value="${esc(s.monthly_fee||0)}"></label>
          <label>Currency <select data-f="currency"><option ${s.currency==='PEN'?'selected':''}>PEN</option><option ${s.currency==='USD'?'selected':''}>USD</option></select></label>
          <label>Billing day <input data-f="billing_day" type="number" min="1" max="28" value="${esc(s.billing_day||1)}"></label>
          <label>Students cap <input data-f="students_cap" type="number" min="0" value="${esc(s.students_cap||'')}"></label>
          <label>Trial ends <input data-f="trial_ends_at" type="date" value="${esc(s.trial_ends_at||'')}"></label>
          <label class="inline"><input data-f="is_demo" type="checkbox" ${s.is_demo?'checked':''}> Demo school</label>
          <label class="wide">Notes <textarea data-f="notes" rows="2">${esc(s.notes||'')}</textarea></label>
          <div class="wide"><button class="btn" onclick="window._plSaveSchool('${s.id}')">💾 Save</button> <span class="muted" id="sch-msg-${s.id}"></span></div>
        </div>
      </details>
      <div style="margin-top:12px"><b>Apps</b><div class="sch-grid">${appsHTML}</div></div>
    </div>`;
  };
  const models = D.schools.filter(s=>!s.is_demo).map(s=>`<option value="${s.id}" ${s.slug==='nis'?'selected':''}>${esc(s.name)}</option>`).join('');
  return `<details class="card" open><summary>➕ New school from a model</summary>
    <p class="muted small">The new school copies the model's apps, plan and settings (grades, sections, year). It starts in <b>trial</b> with the neutral Cohasset Schools branding until you upload its own logo. Its address <code>slug.cohasset.pe</code> works immediately.</p>
    <div class="pl-form" id="sch-new">
      <label>Model <select data-f="template">${models}</select></label>
      <label>Slug (subdomain) <input data-f="slug" placeholder="sanjose"></label>
      <label>Name <input data-f="name" placeholder="Colegio San José"></label>
      <label>Short name <input data-f="short_name" placeholder="San José"></label>
      <label>Domain (optional) <input data-f="domain" placeholder="sanjose.cohasset.pe"></label>
      <div class="wide"><button class="btn" onclick="window._plCreate()">Create school</button> <span class="muted" id="sch-msg-new"></span></div>
    </div></details>
    ${D.schools.map(card).join('')}`;
}

/* ---------- Payments ---------- */
function _plPayments(D){
  const today=_plToday();
  const rows = D.payments.map(p=>{ const s=D.byId[p.school_id]||{}; const late=p.status==='overdue'||(p.status==='pending'&&p.due_date<today);
    return `<tr><td><b>${esc(s.name||'?')}</b></td><td>${_plDate(p.period_start).slice(0,7)}</td><td>${_plMoney(p.amount,p.currency)}</td><td>${_plDate(p.due_date)}</td>
      <td><span class="chip ${p.status==='paid'?'ok':late?'bad':p.status==='void'?'':'warn'}">${p.status}</span>${p.paid_at?` <span class="muted small">${_plDate(p.paid_at)}${p.method?' · '+esc(p.method):''}${p.reference?' · '+esc(p.reference):''}</span>`:''}</td>
      <td>${p.status==='paid'||p.status==='void' ? '' : `<button class="btn small" onclick="window._plPaid('${p.id}')">✓ Mark paid</button> <button class="btn small ghost" onclick="window._plVoid('${p.id}')">Void</button>`}</td></tr>`; }).join('');
  const schools = D.schools.map(s=>`<option value="${s.id}">${esc(s.name)}</option>`).join('');
  const m = new Date(); const period = `${m.getFullYear()}-${String(m.getMonth()+1).padStart(2,'0')}-01`;
  return `<div class="card"><div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center">
      <button class="btn" onclick="window._plGenerate()">🧾 Generate this month's invoices</button>
      <span class="muted small">One pending row per <b>active</b> school with a monthly fee, due on its billing day. Pending rows past their due date turn <b>overdue</b>. Safe to run again.</span>
      <span class="muted" id="pay-msg"></span></div></div>
    <details class="card"><summary>➕ Add a payment by hand</summary>
      <div class="pl-form" id="pay-new">
        <label>School <select data-f="school_id">${schools}</select></label>
        <label>Period start <input data-f="period_start" type="date" value="${period}"></label>
        <label>Amount <input data-f="amount" type="number" step="0.01" min="0"></label>
        <label>Currency <select data-f="currency"><option>PEN</option><option>USD</option></select></label>
        <label>Due date <input data-f="due_date" type="date" value="${today}"></label>
        <label>Status <select data-f="status"><option>pending</option><option>paid</option></select></label>
        <label>Method <input data-f="method" placeholder="transfer · Yape · card"></label>
        <label>Reference <input data-f="reference" placeholder="operation / invoice no."></label>
        <label class="wide">Notes <input data-f="notes"></label>
        <div class="wide"><button class="btn" onclick="window._plAddPayment()">Add</button> <span class="muted" id="pay-msg-new"></span></div>
      </div></details>
    <div class="card">${rows ? `<table class="pl"><tr><th>School</th><th>Period</th><th>Amount</th><th>Due</th><th>Status</th><th></th></tr>${rows}</table>` : '<p class="muted">No payments yet. Set a monthly fee on each school and generate the month.</p>'}</div>`;
}

/* ---------- Contacts & log ---------- */
function _plContacts(D){
  const today=_plToday();
  const block = s => {
    const cs = D.contacts.filter(c=>c.school_id===s.id);
    const is = D.inter.filter(i=>i.school_id===s.id);
    const cRows = cs.map(c=>`<tr><td><b>${esc(c.name)}</b>${c.is_primary?' <span class="chip">primary</span>':''}<br><span class="muted small">${esc(c.position||'')}</span></td>
        <td>${c.email?`<a href="mailto:${esc(c.email)}">${esc(c.email)}</a>`:''}<br>${c.phone?esc(c.phone):''}${c.whatsapp?` · <a href="https://wa.me/${esc(String(c.whatsapp).replace(/\\D/g,''))}" target="_blank" rel="noopener">WhatsApp</a>`:''}</td>
        <td class="muted small">${esc(c.notes||'')}</td><td><button class="btn small ghost" onclick="window._plDelContact('${c.id}')">🗑</button></td></tr>`).join('');
    const iRows = is.map(i=>{ const c=cs.find(x=>x.id===i.contact_id); return `<tr><td>${_plDate(i.happened_at)}<br><span class="muted small">${_PL_KIND[i.kind]||i.kind}${c?' · '+esc(c.name):''}</span></td><td>${esc(i.summary)}</td>
        <td>${i.next_action?`${esc(i.next_action)}<br><span class="chip ${i.done?'ok':i.next_action_at&&i.next_action_at<today?'bad':'warn'}">${i.done?'done':_plDate(i.next_action_at)}</span>${i.done?'':` <button class="btn small ghost" onclick="window._plDone('${i.id}')">✓</button>`}`:''}</td></tr>`; }).join('');
    const cOpts = `<option value="">—</option>`+cs.map(c=>`<option value="${c.id}">${esc(c.name)}</option>`).join('');
    return `<div class="card sch-card"><div class="sch-head"><div class="sch-title"><b>${esc(s.name)} <span class="chip">${_PL_STATUS[s.status]||s.status}</span></b>
        <span class="muted">${cs.length} contacts · ${is.length} interactions</span></div></div>
      <h4 style="margin:12px 0 4px">📇 Contacts</h4>
      ${cRows?`<table class="pl">${cRows}</table>`:'<p class="muted small">No contacts yet.</p>'}
      <details><summary class="muted small">➕ Add contact</summary><div class="pl-form" id="ct-new-${s.id}">
        <label>Name <input data-f="name"></label><label>Position <input data-f="position" placeholder="Principal · English coordinator · IT"></label>
        <label>Email <input data-f="email" type="email"></label><label>Phone <input data-f="phone"></label><label>WhatsApp <input data-f="whatsapp" placeholder="51 9xx xxx xxx"></label>
        <label class="inline"><input data-f="is_primary" type="checkbox"> Primary contact</label>
        <label class="wide">Notes <input data-f="notes"></label>
        <div class="wide"><button class="btn small" onclick="window._plAddContact('${s.id}')">Add</button> <span class="muted" id="ct-msg-${s.id}"></span></div></div></details>
      <h4 style="margin:14px 0 4px">🗒️ Log</h4>
      ${iRows?`<table class="pl"><tr><th>When</th><th>What happened</th><th>Next action</th></tr>${iRows}</table>`:'<p class="muted small">Nothing logged yet.</p>'}
      <details><summary class="muted small">➕ Log an interaction</summary><div class="pl-form" id="in-new-${s.id}">
        <label>Kind <select data-f="kind">${Object.entries(_PL_KIND).map(([k,v])=>`<option value="${k}">${v}</option>`).join('')}</select></label>
        <label>Contact <select data-f="contact_id">${cOpts}</select></label>
        <label>When <input data-f="happened_at" type="date" value="${today}"></label>
        <label class="wide">Summary <textarea data-f="summary" rows="2"></textarea></label>
        <label>Next action <input data-f="next_action" placeholder="Send proposal · Call back · Demo with teachers"></label>
        <label>By <input data-f="next_action_at" type="date"></label>
        <div class="wide"><button class="btn small" onclick="window._plAddInter('${s.id}')">Save</button> <span class="muted" id="in-msg-${s.id}"></span></div></div></details>
    </div>`;
  };
  return D.schools.map(block).join('');
}

/* ---------- acciones ---------- */
function _plRead(root){
  const o={}; root.querySelectorAll('[data-f]').forEach(i=>{ o[i.dataset.f] = i.type==='checkbox' ? i.checked : i.value.trim(); });
  Object.keys(o).forEach(k=>{ if(o[k]==='') o[k]=null; });
  return o;
}
function _plMsg(id, t){ const e=$('#'+id); if(e) e.textContent=t; }
function _plRefresh(delay=600){ setTimeout(()=>adminPlatform(window._plTab||'platform'), delay); }
window._plToggle = id => { const d=$('#'+id); if(d) d.open=!d.open; };
window._plSaveSchool = async id => {
  _plMsg('sch-msg-'+id,'Saving…');
  const o=_plRead($('#sch-edit-'+id));
  ['monthly_fee','billing_day','students_cap'].forEach(k=>{ if(o[k]!=null) o[k]=Number(o[k]); });
  if(o.domain) o.domain=o.domain.toLowerCase();
  const { error } = await sb.from('schools').update(o).eq('id',id);
  _plMsg('sch-msg-'+id, error?'⚠️ '+error.message:'✓ Saved'); if(!error) _plRefresh();
};
window._plCreate = async () => {
  const o=_plRead($('#sch-new'));
  if(!/^[a-z0-9-]{2,32}$/.test((o.slug||'').toLowerCase())){ _plMsg('sch-msg-new','⚠️ Slug: 2-32 lowercase letters, digits or hyphens'); return; }
  if(!o.name){ _plMsg('sch-msg-new','⚠️ Name is required'); return; }
  _plMsg('sch-msg-new','Creating…');
  const { error } = await sb.rpc('school_create_from_template',{ p_slug:o.slug.toLowerCase(), p_name:o.name, p_short:o.short_name, p_domain:o.domain, p_template:o.template });
  _plMsg('sch-msg-new', error?'⚠️ '+error.message:'✓ Created'); if(!error) _plRefresh();
};
window._plApp = async cb => {
  cb.disabled=true;
  const { error } = await sb.from('school_apps').upsert({ school_id:cb.dataset.sid, app_key:cb.dataset.app, enabled:cb.checked, updated_at:new Date().toISOString() },{ onConflict:'school_id,app_key' });
  cb.disabled=false; if(error){ cb.checked=!cb.checked; alert('Could not save: '+error.message); }
};
window._plGenerate = async () => {
  _plMsg('pay-msg','Generating…');
  const { data, error } = await sb.rpc('school_payments_generate');
  _plMsg('pay-msg', error?'⚠️ '+error.message:`✓ ${data} new invoice(s)`); if(!error) _plRefresh();
};
window._plAddPayment = async () => {
  const o=_plRead($('#pay-new'));
  if(!o.school_id||!o.amount||!o.period_start||!o.due_date){ _plMsg('pay-msg-new','⚠️ School, period, amount and due date are required'); return; }
  const ps=new Date(o.period_start+'T00:00:00'); const pe=new Date(ps.getFullYear(),ps.getMonth()+1,0);
  o.period_end = pe.toISOString().slice(0,10); o.amount=Number(o.amount); if(o.status==='paid') o.paid_at=_plToday();
  o.created_by = state.profile.id;
  const { error } = await sb.from('school_payments').insert(o);
  _plMsg('pay-msg-new', error?'⚠️ '+error.message:'✓ Added'); if(!error) _plRefresh();
};
window._plPaid = async id => {
  const method = prompt('Payment method (transfer · Yape · card):','transfer'); if(method===null) return;
  const reference = prompt('Reference (operation / invoice number), optional:','')||null;
  const { error } = await sb.from('school_payments').update({ status:'paid', paid_at:_plToday(), method, reference, updated_at:new Date().toISOString() }).eq('id',id);
  if(error) alert('Could not save: '+error.message); else _plRefresh(0);
};
window._plVoid = async id => {
  if(!confirm('Void this payment row?')) return;
  const { error } = await sb.from('school_payments').update({ status:'void', updated_at:new Date().toISOString() }).eq('id',id);
  if(error) alert('Could not save: '+error.message); else _plRefresh(0);
};
window._plAddContact = async sid => {
  const o=_plRead($('#ct-new-'+sid)); if(!o.name){ _plMsg('ct-msg-'+sid,'⚠️ Name is required'); return; }
  o.school_id=sid; const { error } = await sb.from('school_contacts').insert(o);
  _plMsg('ct-msg-'+sid, error?'⚠️ '+error.message:'✓ Added'); if(!error) _plRefresh();
};
window._plDelContact = async id => {
  if(!confirm('Delete this contact?')) return;
  const { error } = await sb.from('school_contacts').delete().eq('id',id);
  if(error) alert('Could not delete: '+error.message); else _plRefresh(0);
};
window._plAddInter = async sid => {
  const o=_plRead($('#in-new-'+sid)); if(!o.summary){ _plMsg('in-msg-'+sid,'⚠️ Write what happened'); return; }
  o.school_id=sid; o.created_by=state.profile.id; if(o.happened_at) o.happened_at=o.happened_at+'T12:00:00';
  const { error } = await sb.from('school_interactions').insert(o);
  _plMsg('in-msg-'+sid, error?'⚠️ '+error.message:'✓ Saved'); if(!error) _plRefresh();
};
window._plDone = async id => {
  const { error } = await sb.from('school_interactions').update({ done:true }).eq('id',id);
  if(error) alert('Could not save: '+error.message); else _plRefresh(0);
};
