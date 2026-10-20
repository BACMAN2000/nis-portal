# The Funny Pages — editorial memory

Approved by the user on 19 October 2026. A permanent addition to The Nordic Times,
every school-branded edition and The Cohasset Times. The newspaper remains in English.

- Publish TWO original Byte & Bea strips per daily edition, in addition to the eight articles:
  one for A2–B1 and one for B2–C1. Three or four panels each.
- Bea: curly dark hair, teal sweater; Byte: rounded mustard robot, antenna, expressive eyes.
  Keep their appearance consistent. Warm cream paper, hand-inked dark lines, teal/mustard accents.
- A2–B1: concrete everyday situations, accessible expressions and visual humor.
- B2–C1: richer language, irony, inference or double meanings; age-appropriate for 8–17 and adults.
  Do not label basic vocabulary as advanced merely by changing the badge.
- Include an English transcript, a concealed Get the joke explanation, short glossary and Your turn prompt.
  B2–C1 also includes a concealed possible interpretation. Avoid spoiling the joke in the headline.
- Original fictional humor, clearly distinct from verified news. No copied syndicated comic strips,
  copyrighted characters or artists' imitated signature styles. Disclose AI-assisted artwork.
- Generate only the bordered strip in the image: no newspaper masthead, level badge or educational UI
  baked into it. Live headings inherit each site's branding; transcripts keep dialogue accessible.
- Current preview reference: Byte interprets “a piece of cake” literally. Advanced launch:
  an anti-distraction app interrupts its user to announce how focused they are.
- Store cartoons in the issue JSON's optional top-level cartoons array; older editions omit it.
  Required fields per cartoon: id, series, title, levels (two CEFR strings), image {src, alt},
  transcript [{speaker, text}], explanation, glossary [{w, def}], prompt;
  optional discussion for an interpretation. Assets live in newspaper/img/YYYY-MM-DD/.
- Keep article counts unchanged. Cartoons follow the news grid, respect the level filter, and remain
  separate from news section filters and Cambridge scoring. They appear only on the front page.
- newspaper/index.html loads funny-pages.js and funny-pages.css. Edit only NIS source;
  tools/news_cohasset.py generates the Cohasset mirror, including these two files.
- Generate fresh scripts daily and avoid repeating the last five editions' jokes. Validate lettering,
  speaker tails, character consistency, image paths, transcript accuracy and both site mirrors.
