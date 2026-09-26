# Luovutus: Sisältökirjuri — 26.9.2026 aamu (viikkokiintiö 90 %, tilinvaihto lähestyy)

Edellinen luovutus: `viesti-sisaltokirjuri-luovutus-20260925-c.md`. Tämä vuoro (25.9. ilta – 26.9. aamu):
maakuntien lyhyt-luonnehdinnat valmistuivat KAIKILLE 138 maalle, elävän kartan sisältötyöt alkoivat
(kokoluokitus, maakuntasalaisuudet GRC), löydös 149 (288 puuttuvaa nostokuvaa) ratkaistiin ja
Codexin miniatyyrien värikorjaus (504/503) on käsitelty erä kerrallaan.

## 1. Valmista ja mainissa

- **Maakuntien luonnehdinnat (lyhyt): 138/138 maata** — erät 1–10 + KOR (PR:t #3226, #3241, #3242,
  #3245, #3251, #3257, #3261, #3284, #3290). Maakunta-PR:ejä viedään YKSI KERRALLAAN mainin päälle
  (Fablen sääntö 26.9.: pinotut PR:t #3234/#3236/#3238 jäivät junasta pois). Agentit kirjoittavat
  etukäteen, PR vasta kun edellinen on mainissa.
- **Nostojen kokoluokitus GRC** (`js/packs/nostojen-kokoluokat.js`, NOSTOJEN_KOKOLUOKAT.GRC, 12 pääkohdetta /
  31 kohdetta / 19 pientä = 62) + vartija; **maakuntasalaisuudet GRC** (14 maakuntaa, Athos mukana:
  `js/packs/maakuntasalaisuudet.js` + `maakuntasalaisuudet-grc.js`, kenttä `nimio` ≤ 18 merkkiä) — PR:t #3263, #3286.
  Fable hyväksyi sisällön; muille maille salaisuudet vasta kun elävän kartan video on hyväksytty.
- **Löydös 149:** 288 karttanostot-kuvaa (20260921) puuttui ämpäristä; Julkaisija vei ne (ajo 36207702414),
  vartija `tests/nostokuvat-ampari.test.mjs` (#3283; NOSTOKUVAT_VERKKO=1 → HEAD kaikille osoitteille) — 0 puuttuu.
- **Codexin värikorjaus:** 63 (sekatyyli) + 504-sarjan erät 1–9 + 503-erät 10–11 ovat mainissa; erä 12 (#3293) odottaa
  Siirtosepän #3269:n jälkeen. Kaava per erä: R2-kuvat ladataan → SHA-256 + tavumäärä → kontaktilehti silmin →
  `js/packs/miniatyyrit.js` id → `<id>-vari2` (myös repo-webp-polut → tunnus) → vartijat → PR → kuittaus postiin
  (`posti/sisaltokirjuri-codex-miniatyyrien-varit-<sarja>-era<N>-kuittaus-*.md`, worktree
  `tools/uusi-worktree.sh sisaltokirjuri posti<N> origin/claude/postilaatikko`, TARKISTA että worktree syntyi — polku
  tulostuu) → Julkaisijalle ja Fablen lokiin yksi rivi per PR (Fablen ohje: jatkuvat erät ilman välikäskyä).

## 2. Kesken / odottaa

1. **Codex-erä 13 (36 kuvaa, viimeiset 503:sta):** postilaatikossa commit 4eb49ebb0
   (`posti/kuvatoimitus-miniatyyrien-varit-503-era13-20260926.json`) — EI vielä käsitelty. Käsittele kaavalla yllä.
2. **PR #3293** (värit erä 12) odottaa Julkaisijan junaa.
3. **spawn_task-chipit (nimidatan virheet, `js/packs/maakunnat-nimet.js`):** yhdeksän chipiä
   (task_d39c606c, 5581d296, 31a68e68, 35a30285, 115eaf2f, 4187ecd3, 29f163b6, 389b4a3b, ca68521c) — kaikki samasta
   tiedostosta; suositus: yksi sessio tekee ne yhdessä PR:ssä.
4. **Salaisuudet muille maille** (isoisän reitin maat) — vasta videon hyväksynnän jälkeen. Kokoluokitus muille
   maille samoin (lisää samaan tiedostoon `nostojen-kokoluokat.js` + ANKKURIT-rivi testiin `tests/nostojen-kokoluokat.test.mjs`).
5. **Maakuntien pitka/pulu** kaikille maille (nyt vain GRC + alkuperäiset 7): jatkuva tehtävä, ei aloitettu.
6. **Pikkukuvat (löydös 115)** maakunnille: Codexin tilaus postilaatikossa, ei toimitettu.

## 3. Opit tältä vuorolta

- **Isoisän 1873-reittiä ei ole kaanonissa** (Fablen päätös): maakunnat syttyvät saapumiskaupungista ulospäin
  etäisyysjärjestyksessä; älä kirjoita reittiä.
- **Uusi js/packs-tiedosto ilman selaintuojaa** → `tests/sw.test.mjs` NIPUTTAMATTOMAT-lista + sw.js SHELL, EI
  build-standalonen MODULES-listalle (Julkaisija korjasi #3277:llä).
- **Kaksi kertaa sama virhe cherry-pickissä:** `resolve.py`-tyyppinen automaattinen konfliktiratkaisu rikkoi js-tiedoston
  (`/*`-rivi kahdesti). Turvallisin tapa maakuntaerälle: ota tiedosto mainista ja LISÄÄ agentin lohko ennen
  viimeistä `};` (lohko alkaa riviltä `  /*` ennen `   * <ISO>` -kommenttia), päivitä testit käsin (ODOTETUT_MAARAT +
  ERASSA_1), aja `node --test tests/maakunnat-*.test.mjs tests/karttatyokalu-maakunnat.test.mjs
  tests/maakuntavektorit.test.mjs tests/lisenssit.test.mjs tests/sisaltopaketti.test.mjs`.
- **Tarkista `origin/main` ennen KOR-tyyppistä PR:ää**: avasin PR:n liian aikaisin kun edellinen juna oli vielä auki.
- **zsh ei jaa sanoja muuttujasta** (`for i in $ids`): käytä suoraan luetteloa; `git worktree remove` ei poista
  `.DS_Store`-jäänteitä.
- **Kuvien haku levyltä:** `/Users/samireivinen/Matkakirja-nostot-kuvat/<maa>/kuvat/` — hae `find`illa, ei yhden tason globilla.
- **Levy:** poistin 21 agenttiworktreetä (`Matkakirja-fable/.claude/worktrees/agent-*`); tee samoin kun erä on pushattu.
