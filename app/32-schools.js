/* ===================== 🏫 SCHOOLS (superadmin) =====================
   Un solo administrador (profiles.is_superadmin) da de alta colegios, les
   pone logo, nombre y color, y decide qué apps del portal se les encienden.
   Tablas: schools · apps · school_apps (26-sep-2026). El front lee esto sin
   sesión por school_public(); aquí se escribe con la sesión del superadmin y
   las políticas de RLS solo dejan escribir a él. */
async function adminSchools(){
  const main = $('#main');
  if(!(state.profile && state.profile.is_superadmin)){
    main.innerHTML = `<h1>🏫 Schools</h1><p class="muted">Only the platform superadmin can manage schools.</p>`;
    return;
  }
  main.innerHTML = `<h1>🏫 Schools</h1><p class="muted">Loading…</p>`;
  const [sc, ap, sa, pr] = await Promise.all([
    sb.from('schools').select('*').order('name'),
    sb.from('apps').select('*').order('sort'),
    sb.from('school_apps').select('school_id,app_key,enabled'),
    sb.from('profiles').select('school_id,role,is_demo'),
  ]);
  const err = sc.error || ap.error || sa.error || pr.error;
  if(err){ main.innerHTML = `<h1>🏫 Schools</h1><p class="muted">Could not load: ${esc(err.message)}</p>`; return; }
  const schools = sc.data||[], apps = ap.data||[];
  const on = {};  (sa.data||[]).forEach(r=>{ on[r.school_id+'|'+r.app_key] = !!r.enabled; });
  const cnt = {}; (pr.data||[]).forEach(p=>{ const k=p.school_id; cnt[k]=cnt[k]||{s:0,t:0,a:0}; cnt[k][p.role==='student'?'s':p.role==='teacher'?'t':'a']++; });
  const enabled = (sid,key)=> on[sid+'|'+key]===true;

  const cardHTML = s => {
    const c = cnt[s.id]||{s:0,t:0,a:0};
    const appsHTML = apps.map(a=>`<label class="sch-app" title="${esc(a.description||'')}">
        <input type="checkbox" data-sid="${s.id}" data-app="${esc(a.key)}" ${enabled(s.id,a.key)?'checked':''} onchange="window._schoolApp(this)">
        <span>${esc(a.label)}</span></label>`).join('');
    return `<div class="card sch-card" id="sch-${s.id}">
      <div class="sch-head">
        <img src="${esc(s.logo_url||'assets/logo-h.svg')}" alt="" onerror="this.style.visibility='hidden'">
        <div class="sch-title">
          <b>${esc(s.name)}</b>
          <span class="muted">${esc(s.slug)} · ${esc(s.domain||'no domain yet')}
            ${s.is_demo?'<span class="chip">🧪 demo</span>':''}${s.active?'':'<span class="chip">⏸ inactive</span>'}</span>
          <span class="muted">👩‍🎓 ${c.s} students · 👨‍🏫 ${c.t} teachers · 🛡️ ${c.a} admins</span>
        </div>
        <div class="sch-actions">
          <button class="btn small" onclick="location.href='?school=${encodeURIComponent(s.slug)}'">👁 Preview</button>
          <button class="btn small ghost" onclick="window._schoolEdit('${s.id}')">✏️ Edit</button>
        </div>
      </div>
      <details class="sch-edit" id="sch-edit-${s.id}">
        <summary class="muted">Branding</summary>
        <div class="sch-form">
          <label>Name <input data-f="name" value="${esc(s.name)}"></label>
          <label>Short name <input data-f="short_name" value="${esc(s.short_name||'')}"></label>
          <label>Domain <input data-f="domain" value="${esc(s.domain||'')}" placeholder="school.cohasset.pe"></label>
          <label>Accent <input data-f="accent" type="color" value="${esc(s.accent||'#3b5bdb')}"></label>
          <label>Logo (light bg) <input data-f="logo_url" value="${esc(s.logo_url||'')}" placeholder="assets/… or https://…"></label>
          <label>Logo (header) <input data-f="logo_dark_url" value="${esc(s.logo_dark_url||'')}"></label>
          <label class="inline"><input data-f="is_demo" type="checkbox" ${s.is_demo?'checked':''}> Demo school</label>
          <label class="inline"><input data-f="active" type="checkbox" ${s.active?'checked':''}> Active</label>
          <div><button class="btn" onclick="window._schoolSave('${s.id}')">💾 Save</button> <span class="muted" id="sch-msg-${s.id}"></span></div>
        </div>
      </details>
      <div class="sch-apps"><b>Apps</b><div class="sch-grid">${appsHTML}</div></div>
    </div>`;
  };

  main.innerHTML = `<style>
    .sch-card{margin-bottom:16px}
    .sch-head{display:flex;gap:14px;align-items:center;flex-wrap:wrap}
    .sch-head img{height:44px;max-width:180px;object-fit:contain;background:#fff;border-radius:8px;padding:4px}
    .sch-title{display:flex;flex-direction:column;gap:2px;flex:1;min-width:200px}
    .sch-title .chip{margin-left:6px;font-size:.75rem;padding:1px 8px;border-radius:999px;background:var(--accent-soft,#e7ecfd)}
    .sch-actions{display:flex;gap:8px}
    .sch-form{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:10px;margin-top:8px}
    .sch-form label{display:flex;flex-direction:column;gap:4px;font-size:.85rem}
    .sch-form label.inline{flex-direction:row;align-items:center}
    .sch-form input[type=text],.sch-form input:not([type]){padding:6px 8px;border:1px solid var(--line,#d6d9e6);border-radius:8px;background:var(--card,#fff);color:inherit}
    .sch-apps{margin-top:12px}
    .sch-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:6px 14px;margin-top:6px}
    .sch-app{display:flex;gap:8px;align-items:center;font-size:.9rem;cursor:pointer}
    .sch-new summary{cursor:pointer;font-weight:600}
  </style>
  <h1>🏫 Schools</h1>
  <p class="muted" style="margin-top:-6px">Each school is served by this same portal: its logo, name and colour come from here, and only the apps you tick are shown to its students, teachers and admins. Use <b>Preview</b> to see the portal as that school (adds <code>?school=slug</code>; <i>exit preview</i> to come back).</p>
  <details class="card sch-new"><summary>➕ New school</summary>
    <div class="sch-form" id="sch-new">
      <label>Slug (subdomain) <input data-f="slug" placeholder="sanjose" pattern="[a-z0-9-]{2,32}"></label>
      <label>Name <input data-f="name" placeholder="Colegio San José"></label>
      <label>Short name <input data-f="short_name" placeholder="San José"></label>
      <label>Domain <input data-f="domain" placeholder="sanjose.cohasset.pe"></label>
      <label>Accent <input data-f="accent" type="color" value="#3b5bdb"></label>
      <label>Logo (light bg) <input data-f="logo_url" value="assets/school-demo.svg"></label>
      <label>Logo (header) <input data-f="logo_dark_url" value="assets/school-demo-white.svg"></label>
      <label class="inline"><input data-f="is_demo" type="checkbox"> Demo school</label>
      <div><button class="btn" onclick="window._schoolCreate()">Create school</button> <span class="muted" id="sch-msg-new"></span></div>
    </div>
  </details>
  ${schools.map(cardHTML).join('')}`;

  const leer = root => {
    const o = {};
    root.querySelectorAll('[data-f]').forEach(i=>{ o[i.dataset.f] = i.type==='checkbox' ? i.checked : i.value.trim(); });
    ['short_name','domain','logo_url','logo_dark_url'].forEach(k=>{ if(o[k]==='') o[k]=null; });
    if(o.domain) o.domain = o.domain.toLowerCase();
    if(o.slug) o.slug = o.slug.toLowerCase();
    return o;
  };
  window._schoolEdit = id => { const d=$('#sch-edit-'+id); if(d) d.open = !d.open; };
  window._schoolSave = async id => {
    const msg=$('#sch-msg-'+id); msg.textContent='Saving…';
    const o = leer($('#sch-edit-'+id)); o.updated_at = new Date().toISOString();
    const { error } = await sb.from('schools').update(o).eq('id', id);
    msg.textContent = error ? '⚠️ '+error.message : '✓ Saved';
    if(!error) setTimeout(()=>adminSchools(), 600);
  };
  window._schoolCreate = async () => {
    const msg=$('#sch-msg-new'); const o = leer($('#sch-new'));
    if(!/^[a-z0-9-]{2,32}$/.test(o.slug||'')){ msg.textContent='⚠️ Slug: 2-32 lowercase letters, digits or hyphens'; return; }
    if(!o.name){ msg.textContent='⚠️ Name is required'; return; }
    msg.textContent='Creating…';
    const { data, error } = await sb.from('schools').insert(o).select('id').single();
    if(error){ msg.textContent='⚠️ '+error.message; return; }
    // Arranca con lo básico encendido; el resto se marca aquí.
    const base = new Set(['classes','tools','progress']);
    const rows = apps.map(a=>({ school_id:data.id, app_key:a.key, enabled: base.has(a.key) }));
    const r2 = await sb.from('school_apps').insert(rows);
    msg.textContent = r2.error ? '⚠️ '+r2.error.message : '✓ Created';
    setTimeout(()=>adminSchools(), 600);
  };
  window._schoolApp = async cb => {
    const row = { school_id: cb.dataset.sid, app_key: cb.dataset.app, enabled: cb.checked, updated_at: new Date().toISOString() };
    cb.disabled = true;
    const { error } = await sb.from('school_apps').upsert(row, { onConflict:'school_id,app_key' });
    cb.disabled = false;
    if(error){ cb.checked = !cb.checked; alert('Could not save: '+error.message); }
  };
}
