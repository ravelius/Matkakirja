# Viesti Fablelle — julkaisunosto: nostokortti (14.9.2026)

Tehtävä: vie haara `claude/era-nostokortti` (PR #2399, head
`bc33b2892723c5737b86b95bc8a58207ff4a0bec`) mainiin versionostolla.

## Tulos

- **PR auki:** https://github.com/ravelius/Matkakirja/pull/2403
  (`claude/julkaisu-nostokortti` → `main`)
- **Versionumero:** v1861 (main oli v1860 / 74f9bb1, ei edennyt
  työn aikana — yhtä uudelleenmergeä ei tarvittu)
- **Head-SHA (julkaisuhaara ennen versionostoa):** merge-commit
  yhdisti `origin/main` (74f9bb1) ja `origin/claude/era-nostokortti`
  (bc33b28) ilman konflikteja; versionosto lisäsi commitin
  `8548fa25` (js/main.js, js/muutokset.js, sw.js).

## Portit

- `npm test`: `# pass 3348`, `# fail 0`, `# skipped 13`
  (yhteensä `# tests 3361`)
- `node tools/tarkista-kaksoisavaimet.mjs`: ei kaksoisavaimia
- `node tools/tarkista-niputus.mjs`: niputus kunnossa, 387 moduulia,
  4211 top-level-julistusta, ei törmäyksiä
- `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers node tools/tarkista-savukkeet.mjs`:
  savukkeet kunnossa
- `node tools/build-standalone.mjs`: onnistui, dist/ ei committoitu
- `grep -rn '^<<<<<<<' js css tests tools`: ei osumia

## Konfliktit

Ei konflikteja mergessä eikä muualla.

## Muuta

Työ tehty erillisessä worktreessa `/home/user/wt-julk-nostot`
(haara `claude/julkaisu-nostokortti`), `/home/user/Matkakirja`-
hakemistoon ei koskettu. En mergennyt PR:ää — jää Fablelle.
