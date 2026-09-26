

/* ===================== AUTH ===================== */
function renderAuth(mode='login'){
  document.body.innerHTML = `<div class="auth-wrap"><div class="auth-card">
    <img class="logo" src="${schoolLogo()}" alt="${esc(schoolName())}">
    <h1>${esc(schoolShort())} Portal</h1>
    <p class="sub">${mode==='login'?'Sign in to your account':'Create your student account'}</p>
    <p class="muted" style="margin:-6px 0 12px;font-size:.85rem">${esc(schoolName())} · students, teachers and staff</p>
    <div id="msg"></div>
    <!-- Un <form> de verdad: es lo que hace que el gestor de contrasenas del
         navegador ofrezca guardar y rellenar, y que el Enter envie solo. -->
    <form id="form" novalidate></form>
    <div class="auth-switch">${mode==='login'
        ? `Don’t have an account? <a id="toSignup">Sign up</a>`
        : `Already have an account? <a id="toLogin">Sign in</a>`}</div>
    <p class="muted" style="margin:14px 0 0;font-size:.82rem">Can’t sign in? ${NIS_SCHOOL.slug==='nis' ? 'Ask your English teacher or write to <a href="mailto:pbaca@nordic-school.edu.pe">pbaca@nordic-school.edu.pe</a>.' : 'Ask your English teacher or your school administrator.'}</p>
  </div></div>`;
  $('#form').innerHTML = mode==='login' ? loginForm() : signupForm();
  if(mode==='login'){
    $('#toSignup').onclick=()=>renderAuth('signup');
    if($('#forgotPw')) $('#forgotPw').onclick=(e)=>{ e.preventDefault(); renderForgotPassword(); };
    // El boton es type=submit, asi que esto cubre el clic y el Enter a la vez.
    $('#form').addEventListener('submit', e=>{ e.preventDefault(); doLogin(); });
    // Si ya recordamos el correo, salta directo a la contraseña.
    const fe = ($('#li_email') && $('#li_email').value) ? $('#li_pw') : $('#li_email'); if(fe) fe.focus();
  } else {
    $('#toLogin').onclick=()=>renderAuth('login');
    $('#form').addEventListener('submit', e=>{ e.preventDefault(); doSignup(); });
  }
}
function loginForm(){
  let savedEmail=''; try{ savedEmail=localStorage.getItem('nis_remember_email')||''; }catch(_){}
  return `<label for="li_email">Email</label><input id="li_email" name="email" type="email" autocomplete="username" placeholder="${NIS_SCHOOL.slug==='nis' ? 'youremail@nordic-school.edu.pe' : 'your email'}" value="${esc(savedEmail)}">
    <label for="li_pw">Password</label>
    <div style="position:relative">
      <input id="li_pw" name="password" type="password" autocomplete="current-password" placeholder="••••••••" style="width:100%;padding-right:42px">
      <button type="button" id="li_eye" onclick="window._toggleLoginPw()" title="Show password" aria-label="Show password" aria-pressed="false"
        style="position:absolute;right:10px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;font-size:1.15rem;line-height:1;padding:0;color:var(--muted)">👁</button>
    </div>
    <div style="text-align:right;margin-top:8px"><a id="forgotPw" href="#" style="font-size:.9rem">Forgot your password?</a></div>
    <label style="display:flex;align-items:center;gap:8px;margin-top:10px;font-weight:400;cursor:pointer">
      <input type="checkbox" id="li_remember" ${savedEmail?'checked':''} style="width:auto;margin:0;accent-color:var(--blue,#4987c6)"> Remember my email
    </label>
    <div style="margin-top:16px"><button class="btn" type="submit" id="loginBtn" style="width:100%">Sign in</button></div>`;
}
window._toggleLoginPw=()=>{
  const inp=$('#li_pw'), btn=$('#li_eye'); if(!inp) return;
  const hidden = inp.type==='password';
  inp.type = hidden ? 'text' : 'password';
  if(btn){ btn.textContent = hidden ? '🙈' : '👁';   // 🙈 = visible (clic para ocultar)
    btn.title = hidden ? 'Hide password' : 'Show password'; btn.setAttribute('aria-label', btn.title); btn.setAttribute('aria-pressed', hidden ? 'true' : 'false'); }
  inp.focus();
};
function renderForgotPassword(){
  document.body.innerHTML = `<div class="auth-wrap"><div class="auth-card">
    <img class="logo" src="${schoolLogo()}" alt="${esc(schoolName())}">
    <h1>Reset password</h1>
    <p class="sub">We will send you a secure link to create a new password.</p>
    <div id="msg"></div>
    <label>Email</label>
    <input id="fp_email" type="email" autocomplete="email" placeholder="${NIS_SCHOOL.slug==='nis' ? 'youremail@nordic-school.edu.pe' : 'your email'}">
    <div style="margin-top:16px"><button class="btn" id="fp_btn" style="width:100%">Send link</button></div>
    <div class="auth-switch"><a id="fp_back">← Back to sign in</a></div>
  </div></div>`;
  const saved=(()=>{ try{return localStorage.getItem('nis_remember_email')||'';}catch(_){return '';} })();
  if($('#fp_email')) $('#fp_email').value=saved;
  $('#fp_back').onclick=()=>renderAuth('login');
  $('#fp_btn').onclick=sendPasswordResetEmail;
  $('#fp_email').addEventListener('keydown',e=>{ if(e.key==='Enter'){ e.preventDefault(); sendPasswordResetEmail(); } });
  $('#fp_email').focus();
}

async function sendPasswordResetEmail(){
  const email=(($('#fp_email')||{}).value||'').trim();
  const btn=$('#fp_btn');
  if(!email) return msg('err','Enter your email.');
  if(btn){ btn.disabled=true; btn.textContent='Sending…'; }
  try{
    const redirectTo = `${location.origin}${location.pathname}?recovery=1`;
    const { error } = await withTimeout(
      sb.auth.resetPasswordForEmail(email,{ redirectTo }),
      STARTUP_TIMEOUT_MS,
      'PASSWORD_RESET_EMAIL_TIMEOUT'
    );
    if(error) throw error;
    msg('ok','If that email is registered, you will receive a link to create a new password. Also check Spam or Junk mail.');
  }catch(e){
    const text=(e&&e.message)?e.message:'The recovery email could not be sent.';
    msg('err',text);
  }finally{
    if(btn){ btn.disabled=false; btn.textContent='Send link'; }
  }
}

function renderRecoveryPassword(){
  document.body.innerHTML = `<div class="auth-wrap"><div class="auth-card">
    <img class="logo" src="${schoolLogo()}" alt="${esc(schoolName())}">
    <h1>New password</h1>
    <p class="sub">Create a password you can remember.</p>
    <div id="msg"></div>
    <label>New password</label>
    <input id="rp_pw1" type="password" autocomplete="new-password" placeholder="Minimum 8 characters">
    <label>Repeat the new password</label>
    <input id="rp_pw2" type="password" autocomplete="new-password" placeholder="Repeat the password">
    <div style="margin-top:16px"><button class="btn" id="rp_btn" style="width:100%">Save new password</button></div>
  </div></div>`;
  $('#rp_btn').onclick=saveRecoveredPassword;
  ['rp_pw1','rp_pw2'].forEach(id=>$('#'+id).addEventListener('keydown',e=>{ if(e.key==='Enter'){ e.preventDefault(); saveRecoveredPassword(); } }));
  $('#rp_pw1').focus();
}

async function saveRecoveredPassword(){
  const pw1=(($('#rp_pw1')||{}).value||'').trim();
  const pw2=(($('#rp_pw2')||{}).value||'').trim();
  const btn=$('#rp_btn');
  if(pw1.length<8) return msg('err','The password must be at least 8 characters long.');
  if(pw1!==pw2) return msg('err','The passwords do not match.');
  if(btn){ btn.disabled=true; btn.textContent='Saving…'; }
  try{
    const { error } = await withTimeout(sb.auth.updateUser({password:pw1}), STARTUP_TIMEOUT_MS, 'PASSWORD_RECOVERY_UPDATE_TIMEOUT');
    if(error) throw error;
    try{ history.replaceState(null,'',location.pathname); }catch(_){ }
    msg('ok','Password updated successfully. You can now sign in with your new password.');
    const card=document.querySelector('.auth-card');
    if(card){
      const go=document.createElement('button');
      go.className='btn ghost'; go.style.width='100%'; go.style.marginTop='10px'; go.textContent='Go to sign in';
      go.onclick=()=>cerrarSesion();
      card.appendChild(go);
    }
  }catch(e){
    const text=(e&&e.message)?e.message:'The password could not be updated.';
    msg('err',text);
    if(btn){ btn.disabled=false; btn.textContent='Save new password'; }
  }
}

function signupForm(){
  return `
    <div class="field-2">
      <div><label>First name(s)</label><input id="su_first"></div>
      <div><label>Last name(s)</label><input id="su_last"></div>
    </div>
    <div class="field-2">
      <div><label>ID document (DNI)</label><input id="su_doc"></div>
      <div><label>Date of birth</label><input id="su_bd" type="date"></div>
    </div>
    <label>Email</label><input id="su_email" type="email">
    <div class="field-2">
      <div><label>Grade</label><select id="su_grade">${GRADES.map(g=>`<option value="${g.id}">${g.name}</option>`).join('')}</select></div>
      <div><label>Section</label><input id="su_section" placeholder="A / B / C"></div>
    </div>
    <div class="field-2">
      <div><label>Cambridge level</label><select id="su_level"><option value="">— not assigned —</option>${LEVELS.map(l=>`<option>${l}</option>`).join('')}</select></div>
      <div><label>Phone</label><input id="su_phone"></div>
    </div>
    <div class="field-2">
      <div><label>Guardian</label><input id="su_guard"></div>
      <div><label>Guardian phone</label><input id="su_gphone"></div>
    </div>
    <div class="field-2">
      <div><label>Password</label><input id="su_pw" type="password"></div>
      <div><label>Repeat password</label><input id="su_pw2" type="password"></div>
    </div>
    <div style="margin-top:16px"><button class="btn" id="signupBtn" style="width:100%">Create account</button></div>`;
}
function msg(kind, text){ $('#msg').innerHTML = `<div class="note ${kind}">${esc(text)}</div>`; }
let _loginEnCurso=false;
async function doLogin(){
  /* Un login por vez: con la sesion colgada (Safari, ver config.js) el alumno
     pulsaba Enter sin parar y salian cinco logins por segundo. */
  if(_loginEnCurso) return;
  const email=$('#li_email').value.trim(), pw=$('#li_pw').value;
  if(!email||!pw) return msg('err','Enter your email and password.');
  _loginEnCurso=true; const _b=$('#loginBtn'); if(_b){ _b.disabled=true; _b.textContent='Signing in…'; }
  setTimeout(()=>{ _loginEnCurso=false; const b=$('#loginBtn'); if(b){ b.disabled=false; b.textContent='Sign in'; } }, 6000);
  // Recordar (o olvidar) el correo según la casilla.
  try{
    if($('#li_remember') && $('#li_remember').checked) localStorage.setItem('nis_remember_email', email);
    else localStorage.removeItem('nis_remember_email');
  }catch(_){}
  const { error } = await sb.auth.signInWithPassword({ email, password:pw });
  if(error){ _loginEnCurso=false; const b=$('#loginBtn'); if(b){ b.disabled=false; b.textContent='Sign in'; } }
  if(error) return msg('err', error.message.includes('Email not confirmed')?'Your email is not confirmed yet. (The admin can disable email confirmation in Supabase.)':error.message);
}
async function doSignup(){
  const v=id=>$('#'+id).value.trim();
  const email=v('su_email'), pw=$('#su_pw').value, pw2=$('#su_pw2').value;
  if(!v('su_first')||!v('su_last')||!email||!pw) return msg('err','Complete first name, last name, email and password.');
  if(pw!==pw2) return msg('err','The passwords do not match.');
  if(pw.length<8) return msg('err','The password must be at least 8 characters long.');
  const meta={ first_name:v('su_first'), last_name:v('su_last'), full_name:v('su_first')+' '+v('su_last'),
    document_id:v('su_doc'), birthdate:v('su_bd'), phone:v('su_phone'),
    guardian_name:v('su_guard'), guardian_phone:v('su_gphone'),
    grade_id:$('#su_grade').value, section:v('su_section'), cefr_level:$('#su_level').value };
  const { data, error } = await sb.auth.signUp({ email, password:pw, options:{ data:meta } });
  if(error) return msg('err', error.message);
  if(data.session){ msg('ok','Account created! Signing in…'); }
  else { msg('ok','Account created! Check your email to confirm, or ask the admin to activate access. Then sign in.'); }
}
function renderPending(){
  document.body.innerHTML = `<div class="auth-wrap"><div class="auth-card center">
    <img class="logo" src="${schoolLogo()}" alt="${esc(schoolName())}">
    <h1>Almost ready</h1>
    <p class="sub">Your account exists but does not have a profile/role yet. Ask the administrator to activate you.</p>
    <button class="btn ghost" onclick="logout()">Sign out</button>
  </div></div>`;
}
function renderSuspended(){
  document.body.innerHTML = `<div class="auth-wrap"><div class="auth-card center">
    <img class="logo" src="${schoolLogo()}" alt="${esc(schoolName())}">
    <h1>Account suspended</h1>
    <p class="sub">Your access to the ${esc(schoolShort())} Portal is temporarily suspended. Contact the school administrator to reactivate it.</p>
    <button class="btn ghost" onclick="logout()">Sign out</button>
  </div></div>`;
}