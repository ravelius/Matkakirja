# Pelikoodarin luovutus 29.9.2026 klo 16.1x (tilinvaihto, viikkokiintiö 94 %)

Jatkoa luovutukselle `-20260928-b`. Päätoimittaja = "Päätoimittaja (Opus, xhigh)", session id
local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31. Roolit NIMELLÄ: Julkaisija (Opus), Natiivi-UI (Opus), Linssiseppä 2 (Opus, high),
Siirtoseppä (Opus), Sisältökirjuri (Sonnet), Linnanrakentaja (Opus, max), Postivahti (Sonnet).

**UUSI TYÖTAPA (omistaja 28.9. klo 23.3x, Raamattu "SONNET RAJATTUIHIN TEHTÄVIIN"):** rooli pysyy Opuksella, jokainen
rajattu tehtävä (bugiselvitys, testikorjaus, aineistoerä, äänet) annetaan Agent-työkalulla Sonnet-ali-agentille
(model sonnet); rooli todentaa (lue diff, katso kuvat, aja savukkeet) ja julkaisee (PR + viesti Julkaisijalle).
Ali-agentti ei käytä simulaattoreita, käännöspalvelua eikä tuotannon workeria.

## 0. KÄRKI: webin matkalaukkunahka iPhone-yläpalkkiin (omistaja hyväksyi: "Hyväksyn, madalletaan")

- Worktree `/Users/Shared/Claude/wt/pelikoodari-ylapalkki-nahka`, haara `pelikoodari-ylapalkki-nahka`, pushattu, kärki
  **df49af37d = WIP** (agentti pysäytettiin tilinvaihdossa kesken korjauskierroksen). Varsinainen työ 7922ecd48 + v2408 0081da8a6:
  assets/ylapalkki/ (nahka.jpg 683×159, keski-varjo, logo-emboss, pilleri-emboss 9-slice, ~45 kt), css/styles.css
  `@media (max-width:560px)` -lohko, sw.js SHELL, js/lahteet.js-rivi, savuke-pillerivalikko 393/360-väitteet. Palkin korkeus
  ennallaan (≈53 px), pillerin kontrasti 14:1.
- **JÄLJELLÄ (kesken WIP:ssä):**
  1. Keskivyöhykeväitteet (Codexin 385–905/1290) EIVÄT koske webiä — webin palkki on saaren alapuolella (juuren
     padding-top env(safe-area-inset-top)). Korvaa: logo ja pilleri eivät leikkaa, rako ≥ 8 px, mahtuvat 393/360. WIP-commit
     aloitti tämän (css + savuke) — tarkista diff `git show df49af37d` ja viimeistele. Pillerin tekstiä EI lyhennetä (sovittu natiivin kanssa).
  2. Kuvat uusiksi: nykyiset `/Users/Shared/Claude/proto-3d/lokit/ylapalkki-nahka/` kelpaamattomia (palkki himmennyksen alla,
     karttapallo kaatui). Ota kuten `/Users/Shared/Claude/proto-3d/lokit/pillerivalikko/pillerivalikko-kooste.png`: tasokartta,
     relay-kaava (savuke-avauskortti.mjs), game.actionPickStart(), ei peittoja; + palkin 3× lähikuvarajaus. Codex | peli, ennen |
     jälkeen, valikko auki, 360 px → Päätoimittajalle omistajaa varten.
  3. #3624 mainissa → `git merge origin/main` + `node tools/uusi-versio.mjs` (yksi rivi), build-standalone + niputus,
     npm test (tests/sisaltopaketti.test.mjs jumittui kuormassa — aja rauhallisemmin), savukkeet pillerivalikko/hampurilainen/
     ylapalkki-vaaka → PR Julkaisijan junaan.
- Codexin paketti: `/Users/samireivinen/Documents/Codex/2026-09-29/ylapalkki-matkalaukku/` (manifest: nahka-tile repeat-x,
  keski-varjo, logo- ja pilleri-kohopainatus 9-slice, keskivyöhyke 385–905/1290). Nykyinen palkin korkeus, vain puhelin
  (≤ 560 px pysty), iPad ennallaan. Assetit `assets/ylapalkki/`, lisenssi oma tuotanto.
- Tarkista ennen PR:ää: `node tools/build-standalone.mjs` (uudet moduulit MODULES-listaan) + `node tools/tarkista-niputus.mjs`
  (nimitörmäykset — #3624 kaatui junassa molempiin), npm test 0 fail, kuvapari Päätoimittajalle omistajaa varten.

## 1. PR-tilat tilinvaihtohetkellä (klo 16.3x)

- #3622 pariteetti web (saapumiskuva ilman kehystä, yksi lappu kerrallaan) MERGETTY v2406.
- #3624 yläpalkki (logo, pillerivalikko, Linssit/Aarteet) MERGETTY.

- https://github.com/ravelius/Matkakirja/pull/3627 (v2408) Liiku läpinäkyväksi (omistaja: PAATOKSET 28 kohta 3) ja iPadilla
  Pulun reunaan. Julkaisijan junassa. Worktree `/Users/Shared/Claude/wt/pelikoodari-pariteetti-web` (haara
  `pelikoodari-liiku-lapinakyva` c6b725d8e) → poista mergen jälkeen. Päätoimittajalle kerrottu: kulmassa Liiku on vaikea
  huomata; vaihtoehdot (a) isompi teksti samassa paikassa, (b) keskelle + Karttasepän nimiösiirto — odottaa omistajaa.
- https://github.com/ravelius/Matkakirja/pull/3611 = Sisältökirjurin linssien `LINSSI.esittely` (ylätason merkkijono;
  `LINSSI.aikajana.esittely` on eri polku, `selite` on karttaselitteen funktio). Pillerivalikon Linssit-esikatselu lukee sen.

## 2. Tänään mainiin (tiedoksi)

#3580 Sonnet 5.5 Pulu (between_tools), #3581/#3585 Pulun v4-repertuaari + [softly]/[whispers] pois (vahti `PULU_KIELLETYT_TAGIT`),
#3590 Astronautin kameran Pulu-taulu, #3606 savukkeet, #3609 tervetulon selite, #3622 pariteetti web, #3623 hotfix
`paivitaPelaajanakymaNappi`-tuonti, #3624 yläpalkki (logo, pillerivalikko, Linssit/Aarteet `js/kokoelmanakyma.js`,
#passport-dialog poistettu, `ui.openPassport()` avaa valikon Linssit-näkymään).

## 3. Toimitetut ääniaineistot (ei PR:ää, kansioissa)

- Radiolinssi: `/Users/Shared/Claude/proto-3d/lokit/radio-aanet/` (lukittuminen = vanha v1, omistajan päätös) → Linssiseppä 2.
- Olavinlinnan keittiö: `/Users/Shared/Claude/proto-3d/lokit/linna-keittio-aanet/` (31 ääntä) → Linnanrakentaja.
- Avaruuskävely: `/Users/Shared/Claude/proto-3d/lokit/avaruuskavely-aanet/` → Linssiseppä 2 kytki (proto 96b264cb).
- Gemini 3.8 Flash TTS -koe: `/Users/Shared/Claude/proto-3d/lokit/pulu-gemini-koe/tulokset.md` (Leda; 1. pala 1,12 s; ~$0,0075/300 mrk).
- Mallit äänitöille: scratchpadin skriptit ovat väliaikaisia — kuvaukset `radio-aanet.json`, `aanet.json` kansioissa.

## 4. Avoimet / seuraavaksi

- Natiivi-UI tekee pillerivalikon natiiviin (mitat `/Users/Shared/Claude/proto-3d/lokit/pillerivalikko/mitat.md`); sovittu:
  pilleri = laukku + rahat + "Päivä N, aika" (N/80 pois), natiivin omat rivit (Offline, Asetukset, Retkikunta, Ehdota)
  Kartta-osion jälkeen, Kuljettu reitti jää natiiviin, ei Kallistusta.
- Havainnekuvat: ei tilata nyt (varustekuva esikatselussa riittää, Päätoimittaja).
- Spawn-chip "Korjaa savukkeiden kovakoodatut selainpolut" (task_e4edc4ff) odottaa omistajaa.
- Savukkeiden ympäristö Macilla: `CHROMIUM=…/chromium-1234/…/Google Chrome for Testing`, `SAVUKE_CHROMIUM_LIPUT="--use-gl=angle
  --use-angle=swiftshader"`, `PLAYWRIGHT_JS=/Users/Shared/Claude/Matkakirja-fable/node_modules/playwright/index.js`.
