/* Cohasset games core — pure puzzle generators shared by the word-game apps.
 *
 * These are lifted verbatim (behaviour-wise) from vocab-games.html so that any
 * app with a word list can build the same puzzles. Nothing here touches the DOM,
 * localStorage or the backend: give it words, get back a layout.
 *
 *   cohGames.genCrossword([{word,clue}])  -> {width,height,words:[{word,clue,row,col,dir}]} | null
 *   cohGames.genWordSearch([word])        -> {size,grid:[string],words:[{word,cells}]} | null
 *   cohGames.shuffle(array)               -> new shuffled array
 *   cohGames.wordsFromPairs([[l,r]])      -> [{word,clue}] usable in a puzzle
 *
 * NOTE: vocab-games.html still carries its own copy. Point it here when someone
 * next touches that file — no reason to fix a page that works just to dedupe.
 */
window.cohGames = (function () {

  function shuffle(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  /* Turn Games-Lab style [left,right] match pairs into crossword entries.
   * Only single words survive: "He's good at" would otherwise become the
   * nonsense answer HESGOODAT. Accents/hyphens are stripped for the grid but
   * the clue keeps the original text. */
  function wordsFromPairs(pairs, min, max) {
    min = min || 3; max = max || 11;
    var seen = {}, out = [];
    (pairs || []).forEach(function (p) {
      var raw = (p && p[0] ? String(p[0]) : '').trim();
      if (!/^[A-Za-z][A-Za-z'-]*$/.test(raw)) return;      // single word only
      var w = raw.toUpperCase().replace(/[^A-Z]/g, '');
      if (w.length < min || w.length > max) return;
      if (seen[w]) return;
      seen[w] = 1;
      out.push({ word: w, clue: (p[1] ? String(p[1]) : ''), raw: raw });
    });
    return out;
  }

  /* --- Word search --- */
  function genWordSearch(words) {
    words = words.filter(function (w) { return w.length >= 3 && w.length <= 11; });
    var uniq = [], seen = {};
    words.forEach(function (w) { if (!seen[w]) { seen[w] = 1; uniq.push(w); } });
    words = uniq.sort(function (a, b) { return b.length - a.length; }).slice(0, 10);
    if (!words.length) return null;
    var longest = Math.max.apply(null, words.map(function (w) { return w.length; }));
    var size = Math.max(longest, Math.ceil(Math.sqrt(words.join('').length * 1.9)));
    size = Math.min(15, Math.max(9, size));
    var dirs = [[0, 1], [1, 0], [1, 1], [1, -1], [0, -1], [-1, 0], [-1, -1], [-1, 1]];
    var grid = null, placed = null;
    for (var attempt = 0; attempt < 60; attempt++) {
      grid = Array.from({ length: size }, function () { return Array(size).fill(''); });
      placed = []; var okAll = true;
      for (var wi = 0; wi < words.length; wi++) {
        var w = words[wi], ok = false;
        for (var t = 0; t < 300 && !ok; t++) {
          var d = dirs[Math.floor(Math.random() * dirs.length)];
          var r0 = Math.floor(Math.random() * size), c0 = Math.floor(Math.random() * size);
          var rE = r0 + d[0] * (w.length - 1), cE = c0 + d[1] * (w.length - 1);
          if (rE < 0 || rE >= size || cE < 0 || cE >= size) continue;
          var good = true, cells = [];
          for (var i = 0; i < w.length; i++) {
            var r = r0 + d[0] * i, c = c0 + d[1] * i, cur = grid[r][c];
            if (cur && cur !== w[i]) { good = false; break; }
            cells.push([r, c]);
          }
          if (!good) continue;
          for (i = 0; i < w.length; i++) grid[cells[i][0]][cells[i][1]] = w[i];
          placed.push({ word: w, cells: cells }); ok = true;
        }
        if (!ok) { okAll = false; break; }
      }
      if (okAll) break;
    }
    var A = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (var r2 = 0; r2 < size; r2++) for (var c2 = 0; c2 < size; c2++)
      if (!grid[r2][c2]) grid[r2][c2] = A[Math.floor(Math.random() * 26)];
    return { size: size, grid: grid.map(function (row) { return row.join(''); }), words: placed };
  }

  /* --- Crossword --- */
  function genCrossword(entries) {
    entries = entries.filter(function (e) { return e.word.length >= 3; })
      .slice().sort(function (a, b) { return b.word.length - a.word.length; });
    if (!entries.length) return null;
    var grid = {}, placed = [];
    function K(r, c) { return r + ',' + c; }
    function canPlace(word, row, col, dir) {
      var dr = dir === 'down' ? 1 : 0, dc = dir === 'across' ? 1 : 0, touch = false;
      for (var i = 0; i < word.length; i++) {
        var r = row + dr * i, c = col + dc * i, cur = grid[K(r, c)];
        if (cur) { if (cur !== word[i]) return false; touch = true; }
        else {
          if (dir === 'across') { if (grid[K(r - 1, c)] || grid[K(r + 1, c)]) return false; }
          else { if (grid[K(r, c - 1)] || grid[K(r, c + 1)]) return false; }
        }
      }
      if (grid[K(row - dr, col - dc)]) return false;
      if (grid[K(row + dr * word.length, col + dc * word.length)]) return false;
      return touch;
    }
    function put(e, row, col, dir) {
      var dr = dir === 'down' ? 1 : 0, dc = dir === 'across' ? 1 : 0;
      for (var i = 0; i < e.word.length; i++) grid[K(row + dr * i, col + dc * i)] = e.word[i];
      placed.push({ word: e.word, clue: e.clue, row: row, col: col, dir: dir });
    }
    put(entries[0], 0, 0, 'across');
    for (var idx = 1; idx < entries.length; idx++) {
      var e = entries[idx], done = false;
      for (var i2 = 0; i2 < e.word.length && !done; i2++) {
        for (var k in grid) {
          if (grid[k] !== e.word[i2]) continue;
          var parts = k.split(','), r = +parts[0], c = +parts[1];
          if (canPlace(e.word, r, c - i2, 'across')) { put(e, r, c - i2, 'across'); done = true; break; }
          if (canPlace(e.word, r - i2, c, 'down')) { put(e, r - i2, c, 'down'); done = true; break; }
        }
      }
    }
    if (placed.length < 2) return null;
    var minR = 1e9, minC = 1e9, maxR = -1e9, maxC = -1e9;
    placed.forEach(function (p) {
      var dr = p.dir === 'down' ? 1 : 0, dc = p.dir === 'across' ? 1 : 0;
      for (var i = 0; i < p.word.length; i++) {
        var r = p.row + dr * i, c = p.col + dc * i;
        minR = Math.min(minR, r); maxR = Math.max(maxR, r);
        minC = Math.min(minC, c); maxC = Math.max(maxC, c);
      }
    });
    var words = placed.map(function (p) {
      return { word: p.word, clue: p.clue, row: p.row - minR, col: p.col - minC, dir: p.dir };
    });
    return { width: maxC - minC + 1, height: maxR - minR + 1, words: words };
  }

  return {
    shuffle: shuffle,
    wordsFromPairs: wordsFromPairs,
    genWordSearch: genWordSearch,
    genCrossword: genCrossword
  };
})();
