/* English Games Lab — shared engine.
 *
 * The same file ships on cohasset.pe and nis.cohasset.pe. Each site provides
 * only its own HTML shell + CSS; everything below is identical on both, so
 * syncing the two sites means copying this file and coh-games-core.js.
 *
 * The shell must:
 *   1. define window.GAMES_LAB_CONFIG before loading this file
 *   2. load coh-games-core.js and games-lab-data.js first
 *   3. provide these ids:
 *        levels, cats, grid, empty, scoreChip, cg-sel (optional),
 *        teach, gamebtns, gameTitle, gameProg, gameBar, gameBody, resultBody
 *        and sections s-browse / s-ficha / s-game / s-result with class "screen"
 *
 * GAMES_LAB_CONFIG:
 *   progKey  localStorage key for stars (KEEP the site's existing one —
 *            NIS students already have progress under 'nisGamesLab')
 *   gate     true to filter levels through window.cohGate (cohasset only)
 *   report   true to mirror results to the Cohasset backend when logged in
 */
var GL = (function () {
  'use strict';

  var CFG = window.GAMES_LAB_CONFIG || {};
  var PROG_KEY = CFG.progKey || 'glab_p';
  var USE_GATE = !!CFG.gate && !!window.cohGate;
  var USE_REPORT = !!CFG.report;

  var $ = function (id) { return document.getElementById(id); };
  var DATA = (window.GAMES_DATA || []);
  var LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1'];
  var CATS = [['grammar', '📘 Grammar'], ['vocabulary', '🧠 Vocabulary'],
              ['phrasal', '🔗 Phrasal Verbs'], ['idioms', '💬 Idioms']];
  var ALL_GAMES = ['quiz', 'gap', 'match', 'crossword', 'wordsearch', 'invaders', 'timeattack'];

  var curLevel = 'A2', curCat = 'grammar', CURRENT = null;
  var G = {};             // active game state
  var timer = null;       // any running interval
  var teardown = [];      // listeners to unbind when leaving a game

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
  function shuffle(a) { return window.cohGames.shuffle(a); }

  /* Every game registers whatever it attached outside its own markup, so a
     long session doesn't pile up document-level listeners on dead DOM. */
  function onDoc(ev, fn) {
    document.addEventListener(ev, fn);
    teardown.push(function () { document.removeEventListener(ev, fn); });
  }
  function cleanup() {
    if (timer) { clearInterval(timer); timer = null; }
    while (teardown.length) { try { teardown.pop()(); } catch (e) {} }
  }

  /* ---------- progress ---------- */
  function prog() { try { return JSON.parse(localStorage.getItem(PROG_KEY) || '{}'); } catch (e) { return {}; } }
  function saveStars(topicId, game, stars) {
    var p = prog(), k = topicId + ':' + game;
    if (!p[k] || p[k] < stars) p[k] = stars;
    try { localStorage.setItem(PROG_KEY, JSON.stringify(p)); } catch (e) {}
    reportAttempt(topicId, game, stars);
    paintScore();
  }
  function topicStars(topicId) {
    var p = prog(), s = 0, n = 0;
    ALL_GAMES.forEach(function (g) { if (p[topicId + ':' + g] !== undefined) { s += p[topicId + ':' + g]; n++; } });
    return { s: s, n: n };
  }
  function paintScore() {
    var chip = $('scoreChip');
    if (!chip) return;
    var p = prog(), played = {}, c = 0;
    Object.keys(p).forEach(function (k) { var t = k.split(':')[0]; if (!played[t]) { played[t] = 1; c++; } });
    chip.innerHTML = '⭐ ' + c + '/' + DATA.length + ' topics';
  }

  /* Silent backend mirror — same shape as vocab-games / grammar-arcade.
     No token (not logged in) means the lab stays purely local. */
  function apiBase() {
    var h = location.hostname;
    if (h === 'localhost' || h === '127.0.0.1' || h === '') return 'http://localhost:8000';
    try { return (localStorage.getItem('bm_url') || '/api').replace(/\/$/, ''); } catch (e) { return '/api'; }
  }
  function reportAttempt(topicId, game, stars) {
    if (!USE_REPORT) return;
    try {
      var tok = localStorage.getItem('cohasset_token') || localStorage.getItem('bm_token') || '';
      if (!tok) return;
      var t = DATA.filter(function (x) { return x.id === topicId; })[0] || {};
      fetch(apiBase() + '/attempts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + tok },
        body: JSON.stringify({
          app: 'games-lab', game: game, level: t.level || '', unit: t.title || topicId,
          score: stars, total: 3, percent: Math.round(stars / 3 * 100)
        })
      }).catch(function () {});
    } catch (e) {}
  }

  /* ---------- what can this topic play? ---------- */
  function puzzleWords(t) { return window.cohGames.wordsFromPairs(t.match || []); }
  function available(t) {
    var out = [];
    if (t.quiz && t.quiz.length) out.push('quiz');
    if (t.gap && t.gap.length) out.push('gap');
    if (t.match && t.match.length >= 3) out.push('match');
    // The puzzle games need real single words: "He's good at" would otherwise
    // become the answer HESGOODAT. Topics that don't qualify just don't show them.
    var pw = puzzleWords(t);
    if (pw.length >= 4) { out.push('crossword'); out.push('wordsearch'); out.push('invaders'); }
    if ((t.quiz || []).length + (t.gap || []).length >= 6) out.push('timeattack');
    return out;
  }

  /* ---------- header / browse ---------- */
  function visibleLevels() {
    if (!USE_GATE) return LEVELS.slice();
    return LEVELS.filter(function (l) { return window.cohGate.allowed(window.cohGate.bandOf(l)); });
  }
  function renderChrome() {
    if (USE_GATE && $('cg-sel')) $('cg-sel').innerHTML = window.cohGate.selectorHTML();
    var vis = visibleLevels();
    if (vis.indexOf(curLevel) < 0) curLevel = vis[0] || 'A1';
    $('levels').innerHTML = vis.map(function (l) {
      var n = DATA.filter(function (t) { return t.level === l; }).length;
      return '<button class="lvbtn ' + (l === curLevel ? 'act' : '') + '" onclick="GL.setLevel(\'' + l + '\')">' +
        l + ' <span class="lvn">' + n + '</span></button>';
    }).join('');
    $('cats').innerHTML = CATS.map(function (c) {
      var n = DATA.filter(function (t) { return t.level === curLevel && t.cat === c[0]; }).length;
      return '<button class="cat ' + (c[0] === curCat ? 'act' : '') + '"' + (n ? '' : ' data-empty="1"') +
        ' onclick="GL.setCat(\'' + c[0] + '\')">' + c[1] + ' <span class="lvn">' + n + '</span></button>';
    }).join('');
    paintScore();
  }
  function renderGrid() {
    var items = DATA.filter(function (t) { return t.level === curLevel && t.cat === curCat; });
    $('empty').style.display = items.length ? 'none' : 'block';
    $('grid').innerHTML = items.map(function (t) {
      var st = topicStars(t.id), n = available(t).length;
      var avg = st.n ? Math.round(st.s / st.n) : 0;
      var starStr = st.n ? ('★'.repeat(avg) + '☆'.repeat(3 - avg)) : '';
      return '<button class="ficha" onclick="GL.open(\'' + t.id + '\')">' +
        '<div class="ico">' + (t.icon || '🎮') + '</div>' +
        '<span class="badge ' + t.level + '">' + t.level + '</span>' +
        '<div class="t">' + esc(t.title) + '</div>' +
        '<div class="meta"><span>🎯 ' + n + ' game' + (n !== 1 ? 's' : '') + '</span>' +
        (starStr ? '<span class="stars">' + starStr + '</span>' : '') + '</div></button>';
    }).join('');
  }
  function show(id) {
    cleanup();
    var ss = document.querySelectorAll('.screen');
    for (var i = 0; i < ss.length; i++) ss[i].classList.toggle('on', ss[i].id === id);
    window.scrollTo(0, 0);
  }
  function browse() { renderChrome(); renderGrid(); show('s-browse'); }

  /* ---------- topic detail ---------- */
  var DEFS = {
    quiz:       ['q', '🎯', 'Quiz', 'Choose the right answer'],
    gap:        ['g', '✏️', 'Gap-fill', 'Complete the sentence'],
    match:      ['m', '🔗', 'Match', 'Pair them up'],
    crossword:  ['x', '📝', 'Crossword', 'Fill the grid from the clues'],
    wordsearch: ['w', '🔍', 'Word Search', 'Find every hidden word'],
    invaders:   ['i', '👾', 'Word Invaders', 'Type it before it lands'],
    timeattack: ['t', '⚡', 'Time Attack', '60 seconds, mixed questions']
  };
  function open(id) {
    var t = null;
    for (var i = 0; i < DATA.length; i++) if (DATA[i].id === id) { t = DATA[i]; break; }
    if (!t) return;
    CURRENT = t;
    $('teach').innerHTML = '<span class="badge ' + t.level + '">' + t.level + ' · ' + esc(t.cat) + '</span>' +
      '<h2>' + (t.icon || '') + ' ' + esc(t.title) + '</h2>' +
      '<div class="rule">' + (t.rule || '') + '</div>' +
      (t.examples && t.examples.length ? '<ul>' + t.examples.map(function (e) { return '<li>' + e + '</li>'; }).join('') + '</ul>' : '');
    var av = available(t), p = prog();
    $('gamebtns').innerHTML = av.map(function (k) {
      var d = DEFS[k], st = p[t.id + ':' + k];
      var stars = st !== undefined ? '<small class="gstars">' + '★'.repeat(st) + '☆'.repeat(3 - st) + '</small>' : '';
      return '<button class="gbtn ' + d[0] + '" onclick="GL.play(\'' + k + '\')">' +
        '<span class="gi">' + d[1] + '</span>' + d[2] + '<small>' + d[3] + '</small>' + stars + '</button>';
    }).join('') || '<div class="empty">Games for this topic are coming soon.</div>';
    show('s-ficha');
  }
  function reopen() { if (CURRENT) open(CURRENT.id); else browse(); }

  /* ---------- shared game chrome ---------- */
  function head(title, prg) {
    $('gameTitle').textContent = CURRENT.title + ' · ' + title;
    $('gameProg').textContent = prg || '';
    $('gameProg').className = 'progpill';
  }
  function setBar(pct) { $('gameBar').style.width = Math.max(0, Math.min(100, pct)) + '%'; }

  /* Puzzle cell size that fits the phone it's on. Without this a 15-wide word
     search is ~480px and scrolls the whole page sideways on a 375px screen.
     The .grid-scroll wrapper is the backstop for the extreme cases. */
  function cellSize(cols, deskMax, min) {
    var body = $('gameBody');
    var avail = Math.max(240, (body && body.clientWidth ? body.clientWidth : deskMax) - 52);
    return Math.max(min, Math.min(40, Math.floor(Math.min(deskMax, avail) / cols)));
  }

  function play(type) {
    if (!CURRENT) return browse();   // no topic open (e.g. a stale deep link)
    show('s-game');                  // show() runs cleanup() for the previous game
    G = { type: type, items: [], idx: 0, score: 0 };
    if (type === 'quiz') return startQA('quiz');
    if (type === 'gap') return startQA('gap');
    if (type === 'match') return startMatch();
    if (type === 'crossword') return startCrossword();
    if (type === 'wordsearch') return startWordSearch();
    if (type === 'invaders') return startInvaders();
    if (type === 'timeattack') return startTimeAttack();
  }

  /* ---------- quiz / gap ---------- */
  function qaItems(kind) {
    if (kind === 'quiz') {
      return (CURRENT.quiz || []).map(function (r) {
        return { q: r[0], opts: r[1], ci: r[2], ex: r[3] || '' };
      });
    }
    return (CURRENT.gap || []).map(function (r) {
      var opts = shuffle([r[1]].concat(r[2] || []));
      return { q: String(r[0]).replace(/___/, '_____'), opts: opts, ci: opts.indexOf(r[1]), ex: r[3] || '' };
    });
  }
  function startQA(kind) {
    G.items = shuffle(qaItems(kind)).slice(0, 10);
    head(kind === 'quiz' ? 'Quiz' : 'Gap-fill');
    renderQ();
  }
  function renderQ() {
    var it = G.items[G.idx];
    $('gameProg').textContent = (G.idx + 1) + ' / ' + G.items.length;
    setBar(G.idx / G.items.length * 100);
    $('gameBody').innerHTML = '<div class="gamecard">' +
      '<div class="qtext">' + it.q + '</div>' +
      '<div class="opts" id="opts">' + it.opts.map(function (o, i) {
        return '<button class="opt" data-i="' + i + '" onclick="GL.answer(' + i + ')">' + o + '</button>';
      }).join('') + '</div>' +
      '<div class="expl" id="expl">' + (it.ex || '') + '</div>' +
      '<button class="next" id="next" onclick="GL.nextQ()">' +
        (G.idx + 1 >= G.items.length ? 'See results →' : 'Next →') + '</button></div>';
  }
  function answer(i) {
    var it = G.items[G.idx], btns = document.querySelectorAll('#opts .opt');
    for (var b = 0; b < btns.length; b++) {
      btns[b].disabled = true;
      var bi = +btns[b].dataset.i;
      if (bi === it.ci) btns[b].classList.add('correct');
      if (bi === i && i !== it.ci) btns[b].classList.add('wrong');
    }
    if (i === it.ci) G.score++;
    if (it.ex) $('expl').classList.add('show');
    $('next').classList.add('show');
  }
  function nextQ() {
    G.idx++;
    if (G.idx >= G.items.length) {
      var pct = G.score / G.items.length;
      var stars = pct >= .9 ? 3 : pct >= .6 ? 2 : pct > 0 ? 1 : 0;
      saveStars(CURRENT.id, G.type, stars);
      result(G.score, G.items.length, stars);
    } else renderQ();
  }

  /* ---------- match ---------- */
  var M = {};
  function startMatch() {
    G.items = shuffle(CURRENT.match).slice(0, 6);
    M = { sel: null, done: 0, moves: 0 };
    head('Match', '0 / ' + G.items.length);
    setBar(0);
    var left = G.items.map(function (p, i) { return { t: p[0], id: i }; });
    var right = shuffle(G.items.map(function (p, i) { return { t: p[1], id: i }; }));
    var col = function (arr, side) {
      return '<div class="mcol">' + arr.map(function (x) {
        return '<button class="mcard" data-side="' + side + '" data-id="' + x.id + '" onclick="GL.pick(this)">' + esc(x.t) + '</button>';
      }).join('') + '</div>';
    };
    $('gameBody').innerHTML = '<div class="gamecard"><div class="matchcols">' + col(left, 'L') + col(right, 'R') + '</div></div>';
  }
  function pick(el) {
    if (el.classList.contains('done')) return;
    if (!M.sel) { M.sel = el; el.classList.add('sel'); return; }
    if (M.sel === el) { el.classList.remove('sel'); M.sel = null; return; }
    if (M.sel.dataset.side === el.dataset.side) { M.sel.classList.remove('sel'); M.sel = el; el.classList.add('sel'); return; }
    M.moves++;
    if (M.sel.dataset.id === el.dataset.id) {
      M.sel.classList.remove('sel'); M.sel.classList.add('done'); el.classList.add('done');
      M.sel = null; M.done++;
      $('gameProg').textContent = M.done + ' / ' + G.items.length;
      setBar(M.done / G.items.length * 100);
      if (M.done >= G.items.length) {
        var stars = M.moves <= G.items.length + 1 ? 3 : M.moves <= G.items.length + 3 ? 2 : 1;
        saveStars(CURRENT.id, 'match', stars);
        setTimeout(function () { result(G.items.length, G.items.length, stars, 'pairs matched'); }, 400);
      }
    } else {
      var a = M.sel, b = el;
      a.classList.add('shake'); b.classList.add('shake'); a.classList.remove('sel'); M.sel = null;
      setTimeout(function () { a.classList.remove('shake'); b.classList.remove('shake'); }, 350);
    }
  }

  /* ---------- crossword ---------- */
  function startCrossword() {
    var pool = shuffle(puzzleWords(CURRENT)).slice(0, 12);
    var data = window.cohGames.genCrossword(pool.map(function (x) { return { word: x.word, clue: x.clue }; }));
    if (!data) {
      head('Crossword');
      $('gameBody').innerHTML = '<div class="empty">These words don’t interlock into a grid. Try Word Search or another topic.</div>';
      return;
    }
    head('Crossword', '0 / ' + data.words.length);
    setBar(0);

    var cellMap = {}, startNo = {}, num = 0, starts = [];
    data.words.forEach(function (w) { starts.push(w.row + ',' + w.col); });
    var uniq = [], seenS = {};
    starts.forEach(function (s) { if (!seenS[s]) { seenS[s] = 1; uniq.push(s.split(',').map(Number)); } });
    uniq.sort(function (a, b) { return a[0] - b[0] || a[1] - b[1]; });
    uniq.forEach(function (rc) { startNo[rc[0] + ',' + rc[1]] = ++num; });

    var across = [], down = [];
    data.words.forEach(function (w) {
      var dr = w.dir === 'down' ? 1 : 0, dc = w.dir === 'across' ? 1 : 0, cells = [];
      for (var i = 0; i < w.word.length; i++) {
        var r = w.row + dr * i, c = w.col + dc * i;
        cellMap[r + ',' + c] = { sol: w.word[i] };
        cells.push([r, c]);
      }
      (w.dir === 'across' ? across : down).push({ no: startNo[w.row + ',' + w.col], clue: w.clue, cells: cells, word: w.word });
    });
    across.sort(function (a, b) { return a.no - b.no; });
    down.sort(function (a, b) { return a.no - b.no; });

    var cs = cellSize(Math.max(data.width, data.height), 420, 20);
    var gh = '';
    for (var r = 0; r < data.height; r++) for (var c = 0; c < data.width; c++) {
      var cell = cellMap[r + ',' + c];
      if (!cell) { gh += '<div class="xw-cell blk"></div>'; continue; }
      var n = startNo[r + ',' + c];
      gh += '<div class="xw-cell" data-r="' + r + '" data-c="' + c + '">' + (n ? '<span class="num">' + n + '</span>' : '') +
        '<input maxlength="1" inputmode="latin" autocomplete="off" data-r="' + r + '" data-c="' + c + '"></div>';
    }
    var clueHtml = function (arr) {
      return arr.map(function (e) {
        return '<div class="xw-clue" data-no="' + e.no + '" data-w="' + e.word + '"><b>' + e.no + '.</b>' +
          '<span>' + (e.clue ? esc(e.clue) : '<i>word from the topic</i>') + ' <span class="len">(' + e.word.length + ')</span></span></div>';
      }).join('');
    };
    $('gameBody').innerHTML = '<div class="gamecard">' +
      '<div class="hud"><span class="chip" id="xwCount">0/' + data.words.length + ' words</span>' +
      '<div class="hud-r">' +
      '<button class="btn gold" id="xwHint">💡 Hint</button>' +
      '<button class="btn ghost" id="xwNew">🔀 New grid</button></div></div>' +
      '<div class="xw-wrap"><div class="grid-scroll"><div class="xw-grid" style="grid-template-columns:repeat(' + data.width + ',var(--cs));--cs:' + cs + 'px">' + gh + '</div></div>' +
      '<div class="xw-clues"><div class="xw-h">Across</div>' + clueHtml(across) +
      '<div class="xw-h">Down</div>' + clueHtml(down) + '</div></div>' +
      '<div class="banner" id="xwBan"></div>' +
      '<div class="help">Type a letter in each square. Correct words turn green on their own.</div></div>';

    var host = $('gameBody');
    var inputs = host.querySelectorAll('.xw-cell input');
    var solvedWords = {}, hints = 0;
    var at = function (r, c) { return host.querySelector('.xw-cell input[data-r="' + r + '"][data-c="' + c + '"]'); };

    function checkAll() {
      var all = across.concat(down), n = 0;
      all.forEach(function (e) {
        var got = e.cells.map(function (rc) { var el = at(rc[0], rc[1]); return (el && el.value || '').toUpperCase(); }).join('');
        var ok = got === e.word;
        if (ok) n++;
        if (ok && !solvedWords[e.no + e.word]) {
          solvedWords[e.no + e.word] = 1;
          e.cells.forEach(function (rc) { var el = at(rc[0], rc[1]); if (el) el.parentNode.classList.add('ok'); });
          var cl = host.querySelector('.xw-clue[data-no="' + e.no + '"][data-w="' + e.word + '"]');
          if (cl) cl.classList.add('done');
        }
      });
      $('xwCount').textContent = n + '/' + all.length + ' words';
      $('gameProg').textContent = n + ' / ' + all.length;
      setBar(n / all.length * 100);
      if (n === all.length) {
        var ban = $('xwBan'); ban.className = 'banner show'; ban.textContent = '🎉 Grid complete!';
        var stars = hints === 0 ? 3 : hints <= 2 ? 2 : 1;
        saveStars(CURRENT.id, 'crossword', stars);
        setTimeout(function () { result(all.length, all.length, stars, 'words'); }, 700);
      }
    }
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].addEventListener('input', function (ev) {
        ev.target.value = (ev.target.value || '').toUpperCase().replace(/[^A-Z]/g, '');
        if (ev.target.value) {
          var r = +ev.target.dataset.r, c = +ev.target.dataset.c;
          var nx = at(r, c + 1) || at(r + 1, c);
          if (nx) nx.focus();
        }
        checkAll();
      });
    }
    $('xwNew').onclick = function () { play('crossword'); };
    $('xwHint').onclick = function () {
      var all = across.concat(down);
      for (var a = 0; a < all.length; a++) {
        var e = all[a];
        for (var i2 = 0; i2 < e.cells.length; i2++) {
          var el = at(e.cells[i2][0], e.cells[i2][1]);
          if (el && !el.value) { el.value = e.word[i2]; hints++; checkAll(); return; }
        }
      }
    };
  }

  /* ---------- word search ---------- */
  function startWordSearch() {
    var pool = shuffle(puzzleWords(CURRENT)).slice(0, 10);
    var byWord = {};
    pool.forEach(function (x) { byWord[x.word] = x.clue; });
    var data = window.cohGames.genWordSearch(pool.map(function (x) { return x.word; }));
    if (!data) {
      head('Word Search');
      $('gameBody').innerHTML = '<div class="empty">Not enough words for a grid in this topic.</div>';
      return;
    }
    head('Word Search', '0 / ' + data.words.length);
    setBar(0);
    var cs = cellSize(data.size, 440, 18);
    var gh = '';
    for (var r = 0; r < data.size; r++) for (var c = 0; c < data.size; c++)
      gh += '<div class="ws-cell" data-r="' + r + '" data-c="' + c + '" style="width:' + cs + 'px;height:' + cs + 'px;font-size:' + Math.floor(cs * .5) + 'px">' + data.grid[r][c] + '</div>';
    $('gameBody').innerHTML = '<div class="gamecard">' +
      '<div class="hud"><span class="chip" id="wsCount">0/' + data.words.length + ' found</span>' +
      '<div class="hud-r"><button class="btn ghost" id="wsNew">🔀 New grid</button></div></div>' +
      '<div class="ws-layout"><div class="grid-scroll"><div class="ws-grid" id="wsGrid" style="grid-template-columns:repeat(' + data.size + ',' + cs + 'px)">' + gh + '</div></div>' +
      '<div class="ws-words" id="wsWords">' + data.words.map(function (w) {
        return '<span class="ws-word" data-w="' + w.word + '" title="' + esc(byWord[w.word] || '') + '">' + w.word + '</span>';
      }).join('') + '</div></div>' +
      '<div class="banner" id="wsBan"></div>' +
      '<div class="help">Drag across letters &mdash; horizontal, vertical or diagonal, forwards or backwards. Hover a word to see its meaning.</div></div>';

    var host = $('gameBody'), grid = $('wsGrid');
    var PAL = ['#A7F3D0', '#BAE6FD', '#FDE68A', '#FBCFE8', '#DDD6FE', '#C7F9CC', '#FED7AA', '#99F6E4'];
    var found = {}, start = null, selCells = [];
    var cellEl = function (r, c) { return grid.querySelector('.ws-cell[data-r="' + r + '"][data-c="' + c + '"]'); };
    function cellFromPoint(x, y) {
      var el = document.elementFromPoint(x, y);
      if (el && el.classList.contains('ws-cell')) return [+el.dataset.r, +el.dataset.c];
      return null;
    }
    function lineCells(a, b) {
      var dr = Math.sign(b[0] - a[0]), dc = Math.sign(b[1] - a[1]);
      var len = Math.max(Math.abs(b[0] - a[0]), Math.abs(b[1] - a[1])) + 1;
      if (dr !== 0 && dc !== 0 && Math.abs(b[0] - a[0]) !== Math.abs(b[1] - a[1])) return null;
      var out = [];
      for (var i = 0; i < len; i++) out.push([a[0] + dr * i, a[1] + dc * i]);
      return out;
    }
    function clearSel() {
      selCells.forEach(function (rc) { var e = cellEl(rc[0], rc[1]); if (e && !e.classList.contains('found')) e.classList.remove('sel'); });
      selCells = [];
    }
    function paintSel(cells) { clearSel(); selCells = cells; cells.forEach(function (rc) { var e = cellEl(rc[0], rc[1]); if (e) e.classList.add('sel'); }); }
    function endSel() {
      if (!selCells.length) { start = null; return; }
      var s = selCells.map(function (rc) { return data.grid[rc[0]][rc[1]]; }).join('');
      var rev = s.split('').reverse().join('');
      for (var i = 0; i < data.words.length; i++) {
        var w = data.words[i];
        if (found[w.word]) continue;
        if (s === w.word || rev === w.word) {
          found[w.word] = true;
          var col = PAL[i % PAL.length];
          selCells.forEach(function (rc) {
            var e = cellEl(rc[0], rc[1]);
            if (e) { e.classList.remove('sel'); e.classList.add('found'); e.style.background = col; }
          });
          var tag = host.querySelector('.ws-word[data-w="' + w.word + '"]');
          if (tag) tag.classList.add('found');
          var n = Object.keys(found).length;
          $('wsCount').textContent = n + '/' + data.words.length + ' found';
          $('gameProg').textContent = n + ' / ' + data.words.length;
          setBar(n / data.words.length * 100);
          if (n === data.words.length) {
            var ban = $('wsBan'); ban.className = 'banner show'; ban.textContent = '🎉 All words found!';
            saveStars(CURRENT.id, 'wordsearch', 3);
            setTimeout(function () { result(n, data.words.length, 3, 'words found'); }, 700);
          }
          selCells = []; start = null; return;
        }
      }
      clearSel(); start = null;
    }
    function down(x, y) { var p = cellFromPoint(x, y); if (p) { start = p; paintSel([p]); } }
    function move(x, y) { if (!start) return; var p = cellFromPoint(x, y); if (!p) return; var l = lineCells(start, p); if (l) paintSel(l); }
    grid.addEventListener('mousedown', function (e) { e.preventDefault(); down(e.clientX, e.clientY); });
    grid.addEventListener('mousemove', function (e) { if (start) move(e.clientX, e.clientY); });
    onDoc('mouseup', endSel);   // unbound by cleanup() when the game is left
    grid.addEventListener('touchstart', function (e) { var t = e.touches[0]; down(t.clientX, t.clientY); e.preventDefault(); }, { passive: false });
    grid.addEventListener('touchmove', function (e) { var t = e.touches[0]; move(t.clientX, t.clientY); e.preventDefault(); }, { passive: false });
    grid.addEventListener('touchend', function (e) { endSel(); e.preventDefault(); }, { passive: false });
    $('wsNew').onclick = function () { play('wordsearch'); };
  }

  /* ---------- word invaders ---------- */
  function startInvaders() {
    var pool = shuffle(puzzleWords(CURRENT));
    G.items = pool.slice(0, 10);
    G.idx = 0; G.score = 0; G.lives = 3; G.over = false;
    head('Word Invaders', '❤️ 3');
    setBar(0);
    $('gameBody').innerHTML = '<div class="gamecard">' +
      '<div class="hud"><span class="chip" id="invScore">0 typed</span><span class="chip" id="invLeft">' + G.items.length + ' left</span></div>' +
      '<div class="inv-sky" id="invSky"><div class="inv-drop" id="invDrop"></div><div class="inv-ground"></div></div>' +
      '<div class="inv-in"><input id="invInput" placeholder="Type the word…" autocomplete="off" autocapitalize="characters" spellcheck="false">' +
      '<button class="btn" id="invSkip">⏭ Skip</button></div>' +
      '<div class="banner" id="invBan"></div>' +
      '<div class="help">Read the meaning and type the word before it reaches the ground. 3 misses and the round is over.</div></div>';

    var drop = $('invDrop'), input = $('invInput');
    var y = 0, SPEED = 0.55;   // % of sky height per 40ms tick -> ~6.5s to fall

    function spawn() {
      if (timer) { clearInterval(timer); timer = null; }
      if (G.idx >= G.items.length || G.lives <= 0) return finish();
      var it = G.items[G.idx];
      drop.textContent = it.clue || ('… ' + it.word.length + ' letters');
      drop.style.display = 'block';
      y = 0; drop.style.top = '0%';
      $('invLeft').textContent = (G.items.length - G.idx) + ' left';
      input.value = ''; input.focus();
      timer = setInterval(function () {
        y += SPEED;
        drop.style.top = y + '%';
        if (y >= 88) miss();
      }, 40);
    }
    function flash(msg, good) {
      var b = $('invBan');
      if (!b) return;
      b.className = 'banner show ' + (good ? 'good' : 'bad');
      b.textContent = msg;
      setTimeout(function () { b.className = 'banner'; }, 900);
    }
    function hit() {
      G.score++; G.idx++;
      $('invScore').textContent = G.score + ' typed';
      setBar(G.idx / G.items.length * 100);
      flash('✅ ' + G.items[G.idx - 1].word, true);
      spawn();
    }
    function miss() {
      if (timer) { clearInterval(timer); timer = null; }
      G.lives--; G.idx++;
      $('gameProg').textContent = '❤️ ' + Math.max(0, G.lives);
      $('gameProg').className = 'progpill' + (G.lives <= 1 ? ' warn' : '');
      setBar(G.idx / G.items.length * 100);
      flash('❌ ' + G.items[G.idx - 1].word, false);
      spawn();
    }
    function finish() {
      if (G.over) return;
      G.over = true;
      if (timer) { clearInterval(timer); timer = null; }
      drop.style.display = 'none';
      var pct = G.score / G.items.length;
      var stars = pct >= .9 ? 3 : pct >= .6 ? 2 : pct > 0 ? 1 : 0;
      saveStars(CURRENT.id, 'invaders', stars);
      result(G.score, G.items.length, stars, 'words typed');
    }
    input.addEventListener('input', function () {
      if (G.over || G.idx >= G.items.length) return;   // round already finished
      var v = (input.value || '').toUpperCase().replace(/[^A-Z]/g, '');
      input.value = v;
      if (v === G.items[G.idx].word) hit();
    });
    input.addEventListener('keydown', function (e) { if (e.key === 'Enter') e.preventDefault(); });
    $('invSkip').onclick = function () { if (!G.over) miss(); };
    spawn();
  }

  /* ---------- time attack ---------- */
  function startTimeAttack() {
    G.items = shuffle(qaItems('quiz').concat(qaItems('gap')));
    G.idx = 0; G.score = 0; G.wrong = 0;
    var left = 60, over = false;
    head('Time Attack', '⏱ 60s');
    setBar(100);
    function paintTime() {
      $('gameProg').textContent = '⏱ ' + left + 's';
      $('gameProg').className = 'progpill' + (left <= 10 ? ' warn' : '');
      setBar(left / 60 * 100);
    }
    function draw() {
      var it = G.items[G.idx % G.items.length];
      $('gameBody').innerHTML = '<div class="gamecard">' +
        '<div class="hud"><span class="chip">✅ ' + G.score + '</span><span class="chip">❌ ' + G.wrong + '</span></div>' +
        '<div class="qtext">' + it.q + '</div>' +
        '<div class="opts" id="opts">' + it.opts.map(function (o, i) {
          return '<button class="opt" data-i="' + i + '" onclick="GL.taAnswer(' + i + ')">' + o + '</button>';
        }).join('') + '</div></div>';
    }
    G.taAnswer = function (i) {
      if (over) return;
      var it = G.items[G.idx % G.items.length];
      if (i === it.ci) G.score++; else G.wrong++;
      G.idx++;
      draw();
    };
    paintTime(); draw();
    timer = setInterval(function () {
      left--;
      paintTime();
      if (left <= 0) {
        over = true;
        if (timer) { clearInterval(timer); timer = null; }
        var stars = G.score >= 15 ? 3 : G.score >= 9 ? 2 : G.score > 0 ? 1 : 0;
        saveStars(CURRENT.id, 'timeattack', stars);
        result(G.score, G.score + G.wrong, stars, 'answered in 60s');
      }
    }, 1000);
  }
  function taAnswer(i) { if (G.taAnswer) G.taAnswer(i); }

  /* ---------- result ---------- */
  function result(score, total, stars, unit) {
    var msgs = ['Keep practising!', 'Nice work!', 'Great job!', 'Perfect! 🏆'];
    var ems = ['💪', '👍', '🎉', '🏆'];
    var type = G.type;
    $('resultBody').innerHTML = '<div class="em">' + ems[stars] + '</div>' +
      '<h2>' + msgs[stars] + '</h2>' +
      '<div class="bigstars">' + '★'.repeat(stars) + '☆'.repeat(3 - stars) + '</div>' +
      '<div class="sc">' + score + ' / ' + total + ' ' + (unit || 'correct') + '</div>' +
      '<div class="actions">' +
      '<button class="btn" onclick="GL.play(\'' + type + '\')">🔁 Play again</button>' +
      '<button class="btn ghost" onclick="GL.reopen()">← Topic</button>' +
      '<button class="btn ghost" onclick="GL.browse()">All topics</button></div>';
    show('s-result');
  }

  /* ---------- init ---------- */
  if (USE_GATE) window.cohGate.init(function () { browse(); });
  var api = {
    setLevel: function (l) { curLevel = l; renderChrome(); renderGrid(); show('s-browse'); },
    setCat: function (c) { curCat = c; renderChrome(); renderGrid(); show('s-browse'); },
    browse: browse, open: open, reopen: reopen, play: play,
    answer: answer, nextQ: nextQ, pick: pick, taAnswer: taAnswer
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', browse);
  else browse();
  return api;
})();
