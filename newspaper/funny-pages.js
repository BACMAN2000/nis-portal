/* Original daily comics. Works with editions that predate cartoons. */
(function () {
  'use strict';
  function esc(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function (c) {
      return {'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[c];
    });
  }
  function safeImage(src) {
    return /^img\/[\w/-]+\.(png|jpg|jpeg|webp)$/.test(src || '') ? src : '';
  }
  window.FunnyPages = {
    render: function (host, cartoons, level) {
      var list = (Array.isArray(cartoons) ? cartoons : []).filter(function (c) {
        return Array.isArray(c.levels) && (level === 'All' || c.levels.indexOf(level) !== -1);
      });
      host.hidden = !list.length;
      if (!list.length) { host.innerHTML = ''; return; }
      host.innerHTML = '<header class="funny-heading"><div><h2>The Funny Pages</h2>' +
        '<p>A little laugh. A little English.</p></div><span>Original comics</span></header>' +
        list.map(function (c, i) {
          var src = safeImage(c.image && c.image.src);
          var dialogue = (c.transcript || []).map(function (line) {
            return '<li><strong>' + esc(line.speaker) + ':</strong> ' + esc(line.text) + '</li>';
          }).join('');
          var glossary = (c.glossary || []).map(function (g) {
            return '<div><dt>' + esc(g.w) + '</dt><dd>' + esc(g.def) + '</dd></div>';
          }).join('');
          return '<article class="funny-comic" aria-labelledby="comic-title-' + i + '">' +
            '<header class="funny-title"><div><p class="funny-series">' + esc(c.series) + '</p>' +
            '<h3 id="comic-title-' + i + '">' + esc(c.title) + '</h3></div>' +
            '<span class="funny-level">' + esc(c.levels.join('–')) + '</span></header>' +
            (src ? '<figure><a href="' + esc(src) + '" target="_blank" rel="noopener" aria-label="Open ' + esc(c.title) + ' comic at full size (new tab)">' +
              '<img src="' + esc(src) + '" alt="' + esc(c.image.alt) + '" loading="lazy"></a>' +
              '<figcaption>Tap the comic to open it full size. Original AI-assisted artwork.</figcaption></figure>' : '') +
            '<details class="funny-transcript"><summary>Read the dialogue</summary><ol>' + dialogue + '</ol></details>' +
            '<div class="funny-help"><details><summary>Get the joke</summary><p>' + esc(c.explanation) + '</p>' +
            '<dl>' + glossary + '</dl></details><div><h4>Your turn</h4><p>' + esc(c.prompt) + '</p>' +
            (c.discussion ? '<details><summary>A possible interpretation</summary><p>' + esc(c.discussion) + '</p></details>' : '') +
            '</div></div></article>';
        }).join('');
    }
  };
})();
