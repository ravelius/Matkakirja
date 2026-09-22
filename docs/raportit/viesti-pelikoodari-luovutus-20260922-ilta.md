# Pelikoodarin luovutus 22.9.2026 (päivä, session nollaus)

Työhakemisto `/Users/samireivinen/Matkakirja-pelikoodari` (worktree; haarat
pohjalta origin/main). Node 22: `node --test "tests/*.test.mjs"`. Savukkeet:
`PLAYWRIGHT_JS=/Users/samireivinen/Matkakirja-fable/node_modules/playwright/index.js CHROMIUM="" node tools/savukkeet/<x>.mjs`
— savuke-pallolauta, savuke-tasoitus-pallo ja savuke-pallo-kehystahti EIVÄT
lähde paikallisesti (kovakoodattu /opt/node22-polku), ne ajaa CI.
Edellinen luovutus: docs/raportit/viesti-pelikoodari-luovutus-20260922.md.
Tilapäiset worktreet vain /Users/koodaus/wt-*-polkuihin (parvi a/b/c poistettu).

**Ajo-oppi:** koneen kuorma on 8–40 (Julkaisijan rinnakkainen savukesarja +
kaikkien Chromiumit); headless-mittaukset eivät erota ±10 ms:n eroja, ja
iPhone-simulaattorin luvut tarvitsevat Julkaisijan kanssa sovitun CI-tauon.
Pitkät kehykset on nimettävä profiililla (kehysprofiili), ei p95:llä.

## Haarat

| Haara | Commit | Tila |
| --- | --- | --- |
| pelikoodari-savukkeet-reuna | 3be174d16 | main v2062 |
| pelikoodari-nimiot-vakaat-kuorma | a7c6178aa | main v2069 |
| pelikoodari-zoomi-piirto | 52d826123 | main v2078: kehysprofiili, ?koe-liput, valmistelun/viennin väistö, Pulun leijunnan paikkaus |
| pelikoodari-tasaisuus | f473ef0f8 | main v2080: tasaisuusmittari, laatta ei näy ennen kermaa (kangaspolku), tukivara 0,75 |
| pelikoodari-kermashader | 8a37d454c | Julkaisijalla (Fable kuittasi): kerma laatan shaderissa, js/laattakerma-shader.js |
| pelikoodari-pilvi-pois | 0c9a4ede4 | Julkaisijalla: omistajan "pitkä varjo" = .pallolauta-liike-pilvi, poistettu |
| pelikoodari-karttaselite | 7419303d8 | Julkaisijalla (omistaja hyväksyi): paneeli Nostot \| Maakunnat, tyyppimerkit, peukalolevy linssillä, ihmeet-laskuri |
| pelikoodari-esilataus-suunnitelma | (dok.) | Julkaisijalla: docs/raportit/esilataus-suunnitelma-20260922.md |
| pelikoodari-dpr-koe | f4a919af7 | mittauslippu `?koe=dpr2`; Laitetestaaja ajaa perus vs dpr2 iPhonella |
| pelikoodari-karttatyokalu-suunnitelma | e51eb010f | dokumentit (paneelin suunnitelma, GL vaihe 5 -arvio) — osin vanhentunut (paneeli tehty) |
| **pelikoodari-kermashader-pohja** | 3d8288c1f | **WIP, RIKKI** — ks. alla |

## Pohjapallon laatat kerma-shaderiin (vaihe 2) — tila

Tavoite: sama kerma myös kirjaston laattamoottorin pallonkappaleisiin, jotta
huntu on paikallaan myös panoroinnin aukoissa. Tehty 3d8288c1f:ssä:
- `asennaKermaShader(materiaali, { jaettu, pohja: true })`: lauta-paikka
  lasketaan kärjessä (mesh-paikka → lat/lon three-globen kaavalla → Miller,
  `kermaLauta`-uniform = lon0, skaala, yPohjoinen, säde; `laudanMiller()`
  js/fokusmitat.js), varying `vKermaLauta`; jaettu `kermaKaytossa` (0 ilman
  tasoitusta / maailmanäkymässä).
- `pallolaatat.js kermaPohjalle()` asentaa shaderin moottorin lapsille joka
  `suorita`-kutsulla (uudet laatat ilman `kermaUniformit`); `kerros.kermanJaetut()`.
- **VIKA**: tämän jälkeen sekä pohjan että LAATTAKERROKSEN laatat piirtyvät
  tasaisen harmaina (savuke-kerma-reuna V5 σ 0; ei shader-virhettä konsolissa).
  Ennen refaktorointia (8a37d454c) kerroksen laatat olivat oikein (kuva
  docs/raportit/kaappaukset/…/kerma). Epäily: fragmentin refaktorointi
  (`KERMA_LAUDALLA`-korvaus tai `kermaPaalla * kermaKaytossa`), EI
  pohja-variantti. **Bisektoi**: palauta laattakerroksen variantti täsmälleen
  8a37d454c:n fragmentiksi ja lisää pohja-variantti erillisenä runkona; testaa
  `tools/savukkeet/savuke-kerma-reuna.mjs` (V5 σ > 0) ja scratch-kaappaus
  Ranska z6. Konvention tarkistus pohjalle: France-reikä kohdallaan
  `?lauta=pallo` altitude 0,6 -kuvassa; jos peilikuva, lon-merkki
  (`radians(90.0) - atan(z, x)`) väärin.
- Kun toimii: vaihda `LAATTA EI NÄY ENNEN KERMAA` -odotus (v2080) pois
  shaderipolulta (jo ehdollinen `!shaderKerma`), ja harkitse värilaatan
  (kerrostasot[i].vari) haun poistoa — rengaspolulla kuvaa ei piirretä.

## Sulavuus — mitä tiedetään

- iPhone (Laitetestaaja, docs/raportit/zoomi-valmistelu-vaisto-iphone-20260922.md,
  zoomi-piirto-kierros3-iphone-20260922.md, laitetestaaja-haara): väistö
  −23 % p95; DOM-kerrokset ja laattojen GPU-kevennys eivät erotu →
  loppuosa on WebKitin renderöinti/luovutus. **dpr on lukittu 3:een**
  laattakerroksen kanssa (pallo.js: LAATU_PIKSELISUHDE_LEPO, kirjaston
  sääntö olisi 2 liikkeessä) — `?koe=dpr2` mittaa; omistaja päättää.
- Tasaisuusmittari (main v2080): `?kerrokset=porras6` tai `?koe=…` →
  `const v = await __kehysprofiili.veto({ kesto: 3000, nopeusPx: 80 })`,
  `__kehysprofiili.vetoTeksti(v)` (siirtymä/kehys, hajonta/ka, px/ms-vaihtelu,
  pysähdykset). Headless WebKit: px/ms-vaihtelu 37 % ilman pitkiä kehyksiä →
  syöttöputki (OrbitControls soveltaa deltat tapahtumakohtaisesti). Deltojen
  soveltaminen rAF:iin aikaleimalla: EI aloitettu, Fable hyväksyi jos laite
  näyttää > 15 %.
- Fable tekee kokonaiskatsauksen sulavuuskoodiin (pallo.js, pallolaatat.js,
  laattapyramidi.js, kartta-liike.js, sw.js) — ei uusia sulavuusmuutoksia
  ennen sen valmistumista, paitsi pohjapallon shader.

## Avoimet punaiset / huomiot

- savuke-linssilaatat "tauolla" punainen kuormassa > 20 (myös mainissa 3/3).
- savuke-kerma-reuna V4 (kanavaero 7) tunnettu punainen ennestään; V7 tieto.
- savuke-pallolauta päivitetty karttaselitteen uuteen rakenteeseen — ajettu vain CI:ssä.
- Karttaseppä #2753 (tekstuurit 2/kehys, VALMISTELU_BUDJETTI_MS) — mahdollinen
  pieni konflikti kermashaderin kanssa pallolaatat.js:ssä (eri kohdat).
- Esilataus: erä 1 (SW `esilataa`-viesti, KUVACACHE-katto, tallennusraja)
  Pelikoodarin; laatat Karttasepän (älä laajenna `esilataa-pallolaatat`-viestiä eri sopimuksella).

## Uusi sessio tekee ensin

1. Korjaa pelikoodari-kermashader-pohja (bisektointi yllä), varmista
   kerma-reuna V1/V2/V5 + kaappaus, Julkaisijalle.
2. Laitetestaajan dpr2- ja tasaisuusluvut → jos px/ms-vaihtelu > 15 %,
   deltojen soveltaminen rAF:iin (pallo.js, OrbitControlsin pointermove →
   kootut deltat kehyksen alussa); dpr-päätös omistajalta Fablen kautta.
3. Esilataus erä 1; GL vaihe 5 (docs/raportit/gl-vaihe5-kohteet-arvio-20260922.md).
