# Julkaisijan luovutus 21.9.2026 (ympäristönsiirto /Users/Shared/Matkakirja/)

Omistajan päätös: koko kehitystyö siirtyy Macin toiselle käyttäjälle
hakemistoon `/Users/Shared/Matkakirja/`, CI-ajurit sammutetaan siirron
ajaksi. Tämä luovutus kirjoitetaan sen mukaisesti — ei enää julkaisuja
ennen kuin uusi ympäristö on pystyssä.

## v1989:n tila

- PR [#2641](https://github.com/ravelius/Matkakirja/pull/2641) mergetty
  mainiin (87262d5d), sisälsi Pelikoodarin kaksi erää:
  `pelikoodari-liike` (efc2b926, pieni liike kartalle: pulu, pilven
  varjo, kellonajan sävy) + `pelikoodari-pollon-linkit` (ac85b446,
  pöllön Matkakirja-linkit).
- Niputusfiksi tehty samassa PR:ssä: uusi moduuli asui väärin nimellä
  `js/pallolauta/liike.js` (rikkoi perustuslain "PALLOLAUTA EI KUULU
  YHDEN TIEDOSTON VERSIOON" -sääntöä standalone-buildissa) — siirretty
  `js/kartta-liike.js`:ksi, viittaukset päivitetty (main.js, lauta.js,
  sw.js, savuke-kartan-liike.mjs, build-standalone.mjs:n MODULES-lista).
- `node --test tests/*.test.mjs`: 3780/0 fail. `tarkista-niputus.mjs`
  ja `tarkista-kaksoisavaimet.mjs`: puhtaat. `build-standalone.mjs`:
  onnistui.
- `v1973-prep` nollattu ja force-pushattu uuteen mainiin (87262d5d).
- **Tuotannon `matkakirja.app/js/main.js` EI vielä näyttänyt
  v1989:ää** viimeisimmässä tarkistuksessa (cache-bust-parametrilla,
  ~4 min mergen jälkeen) — näytti yhä `2026-08-09.1988`. Ei tiedossa
  johtuuko normaalista Pages-propagointiviiveestä vai CI-ajureiden
  sammutuksesta samaan aikaan. **Vaatii vahvistuksen uudesta
  ympäristöstä.**

## Jono seuraavaan versioon (ei julkaistu, kaikki valmiita/lähes valmiita)

1. **pelikoodari-hiomassa** (6e3eb5af) — hiomassa-linssi ja optikon
   hyvitys, taulu tyhjä. 12/12 + 3785/0 fail (Pelikoodarin oma ilmoitus).
2. **iso-ajo-fra-kuvat-1** (Sisältökirjuri, viimeisin commit e9b9712c) —
   nostoinventaario-työkalun korjaus + FRA:n 18 maalehtinoston
   itsenäiset tekstit + 6 uutta visaa. Sisältää myös Montgolfier-tekstin
   faktakorjauksen (ensimmäinen miehitetty ilmapallolento 21.11.1783,
   ei "seuraavana vuonna"). 3793/0 fail. Fablen hyväksymä.
3. **karttaseppa-sulavuus** (f909d2fd) — Karttasepän sulavuus-E1.
   Fablen ilmoittama valmiiksi seuraavaan versioon.
4. **pelikoodari-nimiot-sulavat** (c1d7b379) — uusi
   `js/pallolauta/sulavuusmittari.js` + `ui.pallolauta.sulavuus` +
   `merkit.datum(el)`, ei pelinäkyviä muutoksia; uusi savuke
   `savuke-nimiot-sulavat.mjs` (headless-vartiot 1–3 tiedoksi,
   tuomio vain `SAVUKE_IKKUNA=1`); testit 3785/0 fail.
5. **pelikoodari-ylapalkki** (6cabce66) — yläpalkki piiloon vain
   vaaka-asennossa (iPhone/iPad), pysty-iPad ennallaan; linssin oma
   yläpalkki (hampurilainen tavallinen, väkäsnappi piilossa linssin
   ajan); `savuke-ylapalkki-vaaka.mjs` 60/60; testit 3781/0 fail.
   Reitittänyt Fable ("omistajan bugi").

Omistajan sitova päätös 21.9. lokissa: **"KARTAN SULAVUUS ENSIN"** —
karttaseppa-sulavuus ja pelikoodari-nimiot-sulavat ajetaan ennen muita
sisältöeriä kun julkaisu jatkuu.

Ei yhtään näistä ole vielä mergetty `v1973-prep`:iin — kaikki odottavat
uutta ympäristöä.

## Codex-toimitukset

Codex jää vanhaan käyttäjään; kansiohaku (`~/Documents/Codex/<pvm>/`)
päättyy toistaiseksi uuden ympäristön osalta. Postilaatikkohaara
(`origin/claude/postilaatikko:posti/`) jatkuu normaalisti — se on
git-pohjainen eikä sidottu käyttäjätiliin. Kirjanpito ajan tasalla
`docs/raportit/codex-toimitukset.md`:ssä viimeisimpään tarkistukseen
asti (20.9.2026 ~19.15 + tämän session yksi rivi -21 merikoristeista/
nostotyyppimerkeistä, jo aiemmin kirjattu).

## Session-only cron-tehtävät (katoavat tämän session mukana)

Kaksi ajastusta oli asetettu tässä sessiossa `CronCreate`-työkalulla:
Codex-toimitusten haku (tunnittain, :12) ja kontekstivahti (tunnittain,
:42). Molemmat päättyvät kun tämä sessio suljetaan siirron yhteydessä —
uuden ympäristön Julkaisija-session on harkittava tarvitseeko
Codex-hakua enää ollenkaan (ks. yllä) ja perustettava kontekstivahti
uudelleen jos halutaan jatkaa.

## Julkaisukaava

Ei muutoksia — ks. `docs/roolitus.md` ("Julkaisusäännöt") ja
edellisen luovutuksen (`viesti-julkaisija-luovutus-20260921.md`)
kertaus. Kaksi huomiota tästä vuorosta:

1. Uuden moduulin lisääminen `js/pallolauta/`-kansioon rikkoo
   standalone-buildin ilman selvää virhettä ennen kuin
   `build-standalone.mjs` ja/tai `tests/pallolauta.test.mjs` /
   `tests/linssikartta.test.mjs` ajetaan — jos Pelikoodari tuo uuden
   tiedoston sinne mutta sitä TARVITAAN `js/main.js`:ssä suoraan
   (ei vain `lauta.js`:n kautta), se ei kuulu pallolauta-kansioon
   lainkaan. Tarkista tämä ennen mergeä jos haaran diffissä on uusi
   `js/pallolauta/*.js`-tiedosto jota main.js tuo top-level-importilla.
2. Sekä `gh pr merge --admin` että `git push --force-with-lease`
   estettiin tässä vuorossa Claude Code -auto-mode-luokittelijan
   toimesta ("Merge Without Review" / "Git Destructive") — omistaja
   hyväksyi molemmat AskUserQuestion-kortilla. Tämä on odotettu käytös
   (ks. edellinen luovutus), ei virhe.

## Worktree

`/Users/samireivinen/Matkakirja-sonnet3`, haara `julkaisija` (mergetty,
voi poistaa) ja `v1973-prep` = origin/main (87262d5d) tämän luovutuksen
kirjoitushetkellä.
