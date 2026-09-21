# Pelikoodari → Fable: luovutus ennen siirtoa /Users/Shared/Matkakirja/ (21.9.2026)

Omistajan päätös 21.9.2026: kehitys siirtyy Macin toiselle käyttäjälle.
Tämä on Pelikoodari (Opus) -session luovutus. Worktree oli
`/Users/samireivinen/Matkakirja-opus`; kaikki haarat ovat pushattuina
`origin`iin ja pohjautuvat `origin/v1973-prep`iin (yksi erä = yksi haara).

## Haarat ja commitit (kaikki pushattu)

| Haara | Commit | Tila |
| --- | --- | --- |
| `pelikoodari-sumu` | 8c7d896e | Julkaisijalla (v1988): löytämisen sumu julkaisuun — sisäsumu 50 %, luonnosraita, merentakaiset pois, päällä kaikille; savuke-sumu julkaisusarjassa |
| `pelikoodari-liike` | efc2b926 | Fable hyväksyi → v1989: pulu, pilven varjo, kellonajan sävy, kytkin hampurilaisessa (Kartta → Pieni liike); savuke-kartan-liike |
| `pelikoodari-pollon-linkit` | ac85b446 | Fable hyväksyi → v1989: Matkakirja-linkit vastauksen loppuun (≤ 2), tekstissä vain käsitelinkit; savuke-pollo päivitetty |
| `pelikoodari-hiomassa` | 6e3eb5af | VALMIS, Fable ilmoittaa Julkaisijalle v1989:n jälkeiseen versioon (ks. alla) |
| `pelikoodari-nimiot-sulavat` | c1d7b379 | VALMIS (E1 mittari), ilmoitettu Julkaisijalle seuraavaan versioon |
| `pelikoodari-ylapalkki` | 6cabce66 | VALMIS, ilmoitettu Julkaisijalle seuraavaan versioon (ks. alla) |
| `pelikoodari-luovutus-siirto` | tämä dokumentti | |

Aiemmat, jo mainissa/prepissä: nostokortti 2, camargue, v1984-kaupunkipopup
(PR #2636), huntu-liike + kameraloki, nostotasot, nimiöt vakaat (ca24dc14),
kartuscha (085ea1cf).

## Yläpalkkibugi (pelikoodari-ylapalkki 6cabce66) — VALMIS

Omistajan sääntö (loki "BUGI: IPADIN YLAPALKKI POISSA MYOS
PYSTYASENNOSSA; HAMPURILAINEN VS VAKASET"):

- css/styles.css: media-kysely on orientaatio —
  `(orientation: landscape) and (max-height: 520px)` TAI
  `(orientation: landscape) and (pointer: coarse) and (max-width: 1366px)`.
  Pysty-iPad (834 × 1194) ja pystypuhelin: palkki näkyy, ei väkäsnappia;
  vaaka-iPhone/-iPad: palkki piiloon, kelluva väkäsnappi. Työpöytä
  (`pointer: fine`) ennallaan. Lohkon kommentti kirjaa muutoksen
  omistajan sanoin; "raja on korkeus eikä orientaatio" ei enää päde.
- Linssin oma yläpalkki (aikajana) on yläpalkki: sen valikon kuvake on
  tavallinen hampurilainen (js/aikajana-valikko.js; js/vakasikoni.js
  `HAMPURILAISEN_POLKU`, sama polku kuin index.html #menu-btn), ja
  kelluva väkäsnappi piilotetaan linssin ajaksi
  (`body.aikajana-palkki-auki .ylapalkki-nappi`). Tämä oli se "yläpalkki,
  jossa on väkäset": vaaka-asennossa näkyi linssin palkki JA väkäsnappi.
- savuke-ylapalkki-vaaka.mjs 60/60 (iPhone 390 × 844 / 844 × 390, iPad
  834 × 1194 / 1194 × 834, iPad Pro 1366 × 1024, työpöytä; lehti ja
  keksintölinssi auki), testit 3781/0. Kaappaukset
  docs/raportit/kaappaukset/ylapalkki-20260921/.

## Hiomassa-linssi (pelikoodari-hiomassa 6e3eb5af) — VALMIS

- js/linssit/aarteet.js: `LINSSIAARTEET` (kaupunki → tunnus) on
  tuotannossa TYHJÄ (Fablen rajaus: omistaja päättää linssien määrän ja
  tyylin; Fable antaa sisällön yhtenä listana kaupunki → tunnus → nimi →
  ikoni). `linssiAarteesta(cityId, type)`: vain iso paikallisaarre.
- rekisteri.js: rivi `{ tunnus, manner, tila: 'hiomassa', nimi, ikoni }`
  ilman `tuo`-tuontia; kun linssi valmistuu, rivi vaihdetaan tavalliseksi
  ja omistus (player.linssit + passileima) herättää sen itsestään.
- omistus.js: `hiomassa`, `hiomassaNimi`, `OPTIKON_HYVITYS = 500`,
  `hyvitaHiomassa` (kerran per linssi, passi `hyvitys:<tunnus>`, ei tp),
  `hiomassaOlevat`, `valmistuneet` + `merkitseNahdyksi` (passi
  `nahty:<tunnus>`); kehittäjätila ei myönnä hiomassa-linssejä.
- game.js `linssiAarteenKylkiaisena`: aarteen raha pysyy, linssi lisäksi;
  hiomassa → hyvitys + aid-kupla "Linssi hiomassa" (Optikko hioo vielä…);
  `game.linssiAarteet` testeille.
- ui.js laukku: harmaa hiomassa-rivi (rekisterin ikoni tai
  assets/linssit/hiomassa.svg), selite ilman Aktivoi-nappia; valmistunut
  linssi saa valmistui-merkin kunnes napautettu. Livia: lämmin tunne.
- tests/linssi-hiomassa.test.mjs (5), savuke-hiomassa-linssi.mjs 12/12
  julkaisusarjassa; kaappaukset docs/raportit/kaappaukset/hiomassa-20260921/.

## Nimiöiden sulavuus — E1 valmis, E2/E3 suunnitelma

Omistaja: "KARTAN SULAVUUS ENSIN". Diagnoosi ja eräjako Fablen
hyväksymät (loki). Työnjako: Pelikoodari = nimiöt, Karttaseppä = kamera,
laatat ja piirtosilmukka, Laitetestaaja = iPad-luku.

### E1 (c1d7b379) — mittari

- js/pallolauta/sulavuusmittari.js: joka kehyksessä nimiön keskipiste −
  maapisteen ruutukohta (koolla normalisoituna: zoomissa etäisyys kasvaa
  koon mukana, se on geometriaa) ja koko. Puhtaat laskennat
  `siirtymanMuutokset`, `koonLiukuvuus`, `kehysnopeus` testattu.
- lauta.js `ui.pallolauta.sulavuus` (aloita / lopeta / yhteenveto) —
  Laitetestaajalle annettu ohje: `aloita()` → ele → `yhteenveto()`
  (JSON konsoliin); `merkit.datum(el)`.
- savuke-nimiot-sulavat.mjs julkaisusarjassa: headless (2–6 fps) ei kelpaa
  tuomariksi → vartiot 1–3 vain ≥ 20 fps (SAVUKE_IKKUNA=1 ikkunallinen
  Chromium, Mac 60 fps). Zoomi ajetaan `kamera.ajaKamera({x, y,
  leveys/2.5}, {kesto:1500})` (kirjaston pointOfView-tween EI ole ele →
  ladonta ajaisi joka kehys; Playwrightin rulla ei zoomaa headlessissä).
- LÄHTÖTASO (Mac, 60 fps, 390 dpr 2 ja 1400): panorointi 0 px; zoomi
  0,03 / 0,3 px; koko muuttuu 77 %:ssa liikkeen kehyksistä ja yhden
  kehyksen porras 15–17 % → vartio 3 punainen odotetusti.

### Juurisyyt (mitattu)

1. Ladonta kulkee liikkeessä 200 ms:n tahdissa (lauta.js
   `LADONNAN_TAHTI_MS`, `ladonnanAjoitus`): nostojen mitta ja
   kaupunkinimien font-size päivittyvät 5×/s; `.pallolauta-nosto-siirto`
   200 ms CSS-siirtymä liukuu perässä, nimet hyppäävät (ei siirtymää).
2. CSS2D-kerros asemoi samassa kehyksessä kuin kangas: paikka 0 px
   Macilla. iPadin "jälkeen jääminen" on kehysbudjetin ylitys laitteella
   (Karttasepän profiili: nipistyksen jälkeen levossa kehykset 42–50 ms,
   josta ladonta levossa yhtenä tehtävänä; getClientRects 1,2 s +
   querySelectorAll 0,7 s 34 s:n ajosta).
3. Eleen lopun lepoladonnan kylkivaihdot (sovittelu) ovat 20–60 px:n
   hyppyjä — päätöksiä, ei jälkeen jäämistä → häivytys (E3).

### E2 — liukuva koko (seuraava)

- Kerroksen CSS-muuttuja (esim. `--nimiokerroin` kotelossa) = kameran
  mittakaava / ladonnan hetken mittakaava, kirjoitetaan JOKA KEHYS pallon
  kehyskoukusta (js/pallo.js `kytkePallonKehys`, sama koukku kuin
  `pisteetKehyksessa` lauta.js:ssä) — yksi tyylikirjoitus/kehys, nolla
  per elementti.
- nostot.js asetteleNosto: `transform: translate(calc(dx·var),
  calc(dy·var)) scale(calc(mitta·var))`; nimet.js asetteleNimi:
  `font-size: calc(koko·var)` (CSS font-size SVG-tekstille, ei
  attribuutti). Ladonnassa mitta ja kerroin nollataan samalla hetkellä
  (mitta_new = mitta_old·k) → ei hyppyä.
- 200 ms:n tahti jää sovittelulle; `.pallolauta-nosto-siirto`-siirtymä
  pois eleen ajaksi (tai kokonaan).
- Mittari: savuke-nimiot-sulavat vartio 3 vihreäksi (koko muuttuu ≥ 90 %
  liikkeen kehyksistä, porras < 5 %).

### E3 — paikka ja kylkivaihdon häivytys

- htmlTransitionDuration 0 eleen ajaksi (merkit.js), lukittu ankkuri
  ilman tweeniä; DOM-kirjoitukset vain muuttuneille.
- Kylkivaihto: nimiö vaihtaa kylkeä opacity-häivytyksellä (vanha kylki
  häipyy, uusi tulee), ei liu'u — Fable hyväksyi.
- Kehyksessä vain siirto, ei mittoja: getBoundingClientRect/
  getClientRects vain ladonnassa; ladonta levossa paloissa ≤ 4 ms/kehys
  (Karttasepän ehdotus, sama malli kuin pallolaatat.js `ajaValmistelu`).

### E4 — nimiöt GL-kerrokseen (päätös vasta E3:n iPad-mittauksen jälkeen)

Karttasepän rajapintaehdotus (21.9.2026, haara karttaseppa-sulavuus,
mittari tools/savukkeet/mittaa-sulavuus.mjs, GPU-headless
`--use-angle=metal`):

1. Nimiöt lukevat kameran samasta kehyskoukusta kuin vektorit ja laatat
   (`kytkePallonKehys` → { kamera, W, H, suhde } kehyksen alussa) — yksi
   totuus per kehys, ei pointOfView()-kutsuja pointermovesta.
2. Kehyksessä vain siirto (transform), ei mittoja.
3. Skaalaus liukuvana kameran korkeudesta; Karttaseppä lisää koukkuun
   valmiiksi lasketun px/aste-tiheyden, jota laatat ja vektorit jo
   käyttävät.

Pelikoodarin puoli (ei vielä vastattu Karttasepälle — seuraava sessio
vastaa): rajapinta kelpaa sellaisenaan; E2 käyttää koukun mittakaavaa
(`--nimiokerroin` lasketaan koukun px/aste-tiheydestä), E4:ssä nostot
antavat rasterinsa (nostosym-rasterit ovat jo kuvia) tekstuureina
sprite-kerrokselle ja sovittelun tulos (kylki, dx, dy, näkyvyys) on
sama datum kuin nyt.

## Sudenkuopat seuraavalle sessiolle

- Worktree-säännöt: haarat `pelikoodari-<aihe>` origin/v1973-prepistä,
  commit `-F <tiedosto>` (lainausmerkit `-m`:ssä rikkovat), ei julkaisua,
  ei Raamattua; savukkeet
  `PLAYWRIGHT_JS=<repo>/node_modules/playwright/index.js CHROMIUM="" node
  tools/savukkeet/<x>.mjs`. Uudet moduulit sw.js SHELL-listaan.
- Headless Chromium piirtää pallon ohjelmallisesti (2–6 fps): 2 s:n
  CSS-siirtymää ei voi kaapata keskeltä; venytä (esim. liike.js
  `lennata(kestoMs)`) tai aja ikkunallisena.
- Pöllön haku: tuntematon sana kysymyksessä on ainoa avainsana → 0
  osumaa; koesanat indeksin sanoista. tools/savuke-pollo.mjs:llä on
  prep-pohjalla pysyviä punaisia (alanappirivi, paneelin reunavälit,
  vihjekupla, kaatuminen ~3641) — vertaa baselineen ennen syyttämistä.
- Muisti: ~/.claude/projects/-Users-samireivinen-Matkakirja-fable/memory/
  pelikoodari-tila-20260921.md (haarat, CI-kuormavikojen juurisyyt).
