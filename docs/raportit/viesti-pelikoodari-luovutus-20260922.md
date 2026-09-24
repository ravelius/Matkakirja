# Pelikoodarin luovutus 22.9.2026 aamuyö (session nollaus)

Työhakemisto: `/Users/koodaus/Matkakirja-opus` (Fable siirtää nimelle
Matkakirja-pelikoodari). Node 22: `node --test "tests/*.test.mjs"`.
Savukkeet: `PLAYWRIGHT_JS=/Users/samireivinen/Matkakirja-fable/node_modules/playwright/index.js CHROMIUM="" node tools/savukkeet/<x>.mjs`.
Edellinen luovutus: docs/raportit/viesti-pelikoodari-luovutus-20260921-ilta.md.

**Ajo-oppi:** älä vaihda haaraa worktreessä, kun savuke tai mittari on
käynnissä taustalla — palvelin lukee tiedostot levyltä (ablaatioajo
piti uusia erillisestä worktreestä). Kone oli koko yön kuormassa 16–34
(Julkaisijan CI, muiden Chromiumit), joten headless-sulavuusluvut ovat
ylärajoja; oikean laitteen luku on Laitetestaajalta.

## Haarat ja commitit

| Haara | Commit | Tila |
| --- | --- | --- |
| pelikoodari-savukkeet-webkit | 98f5751a | main v2048: nimikyltti vartio 4 karttaskaalaan; laivamatka-tanger, astro-sumu, nostokuva-karuselli, musta-laatta#webkit olivat polton kuormapunaisia (kirjattu sarjat.json) |
| pelikoodari-nimion-koko | bd111931 | main v2026: nimiöiden kokohyppely (rasterin skaala/katto per haku, ei välimuistista), katto 16 → 22 px kertoimilla 2 → 4, savuke-nimion-koko-panorointi |
| pelikoodari-safe-area | 1e8beb96 | main v2041: korttikerrokset ja kuva edellä -kortti turva-alueen sisään, savuke-kortti-turva-alue |
| pelikoodari-glnimiot-vanha-rasteri | dfd6f8016 | Julkaisijalla: MARSEILLE-välkky — nimi pysyy rungolla vanhalla rasterilla kunnes uusi porras valmis (Karttasepän d070ebda0 + noston skaala vanhan portaan mukaan), savuke-marseille-valkkyy 4/4. TARKISTA onko mainissa. |
| pelikoodari-ablaatio | c5681e2d8 | main v2056:n mukana: `?kerrokset=porrasN`, tools/savukkeet/mittaa-ablaatio.mjs, docs/raportit/sulavuus-ablaatio-20260921.md |
| pelikoodari-tyyppimerkit | 9a96e4f5c | main v2039: kuvamerkit kaikille nostoille kertoimesta 4 (z8), ikonin crossfade `#ikoni-vanha`, muiden ikonit sovittelun esteinä (kaupunki ja ykköstaso eivät väistä), savuke-nostojen-tyyppimerkit |
| pelikoodari-ci-punaiset | a8d3eeddd | main v2046: peiton osapäivitys (ei rakennusta joka häivytyskehys), nappula sovittimelta noppa-savukkeessa, kaupunkeja ≥ 264 |
| pelikoodari-nostojen-liikevara | 3053ae344 | main v2056: liikevara (alla), savuke-nostojen-liikevara, raportti docs/raportit/viesti-fable-liikevara-zoomi-20260922.md |
| pelikoodari-glnostot-savuke | 2dd4e86ca | main v2059: glnimiot-nostot lukee laatikot rungon näkyvistä, ruudussa olevista ikoneista |
| pelikoodari-hehkupiste | 158adf4c2 | Fable hyväksyi, Julkaisijalle ilmoitettu mergeen; kaappaukset docs/raportit/kaappaukset/hehkupiste-20260922/ |
| pelikoodari-linssikatalogi-maanosat | 3306ab160 | Sonnet-parvi: mannernapit, tilat tarkistettu (23 seuraava → idea), yö/päivä-kytkin myös kohtaamiskuvat.html; kaappaukset docs/raportit/kaappaukset/linssikatalogi-maanosat-20260921/{tyopoyta,puhelin}-{paiva,yo}.jpg; ODOTTAA OMISTAJAA, ei mergeä |

## GL-kerroksen tila

- Runko (Karttaseppä) + nimet + nostot (ikoni + nimiö) + nappula
  rungolla oletuksena; CSS2D:hen jäävät kohteet (halo), linssimerkit,
  ankkurit, liuskat, luonnokset, pisteet. `?glnimiot=0` perääntymistie.
- Sovitin `js/pallolauta/glnimiot-sovitin.js`: `viimeSpritet` (portaan
  vaihto vanhalla rasterilla), `#nimio-vanha`/`#ikoni-vanha` crossfade,
  `alkuLadonta()/loppuLadonta()` (rakennus kerran per ladonta),
  rasterin valmistuminen ei jaa liikkeessä (`tila().lykattyja`),
  `nostotRungolla()` (ruutumitat savukkeille), `syke(false)` kuvavertailuun.
- Rasterilähde `nimiorasterit.js`: skaala/katto per haku (ei
  välimuistista), rasterointi jonoon liikkeessä ≤ 1/kehys (`liikkeessa`).
- Runko `js/pallonimiot-gl.js`: `peitto()` osapäivitys, `syke`-attribuutti
  ja uniform (hehkupiste).
- Lauta: liikkeessä ladonta vain kun kamera siirtynyt > ½ liikevarasta
  tai zoomi ≥ 1,35× (`ladontaTarpeen`, `ladonnat()`), liike = ele TAI
  kameran muutos < 120 ms (`liikkeessaNyt`).
- Nostot: `NOSTOJEN_LIIKEVARA_OSUUS` 0,5 (nimillä sama `nimet.js lado
  liikevara`), `tyyppimerkitKaytossa(kerroin)`, katto
  `nostosymNimionKattoPx(kerroin)`; sovittelu: `l.reuna`/`l.sisareuna`
  (liikevaran lappu ei puoliksi ruudussa), lukittu näkyvä ennen tulokasta,
  ikonit esteinä, piilotuksen `este`-syy mittareille.

## Sulavuus (avoin)

- Laitetestaajan iPhone (docs/raportit/sulavuus-liikevara-iphone-20260922.md):
  panorointi korjautui (Camargue porras 4: 38/79 → 4/209 kehystä > 50 ms;
  portaat 3–4 p95 < 25 ms). **Ranska z6 zoomi yhä p95 50 (sama mainissa)**:
  pisimmät kehykset "piirto" ilman laskurimuutosta, ei ladontaa →
  seuraava tutkimus laattatekstuurien lataus/GPU zoomissa Karttasepän
  kanssa (Karttaseppä teki laattojen aloituksen 2/kehys #2699 ja
  zoomiennakon). Ehdotus: mittaa renderer.info.memory.textures ja
  texImage2D-ajat kehyksittäin porras 1:llä (pelkät laatat) iPhonella.
- Headless WebKit Ranska zoomi p95 49 → 28–38 (kuormassa).

## Savukkeiden tila

- Uudet julkaisusarjassa: nimion-koko-panorointi, kortti-turva-alue,
  marseille-valkkyy, nostojen-tyyppimerkit, nostojen-liikevara, hehkupiste.
- Punaiset/häilyvät: nimiot-sulavat vartiot 1/2 (p95 ennustetusta 2,3–4,5 px)
  CI:ssä punaisia v2041:llä, paikallisesti vihreitä — syy tutkimatta
  (#2699 tai v2039); nimiot-vakaat vartio 2 kuormaherkkä (lepoladonta
  260 ms:n viiveellä osuu hitaan kehyksen väliin); pariisi-lahizoom
  1400-perus 8p2/8r/8s/8t punaisia paikallisesti (myös v2014), CI vihreä
  → ajoympäristöero; 390-liuska 16/17 vanha.

## Seuraavat (Fable)

1. Linssikatalogin yötila ja omistajan palaute (parvi, haara yllä).
2. GL vaihe 5: kohteet (sykkivä halo) ja linssimerkit rungolle jos halo
   toteutettavissa GL:ssä (syke-uniform on nyt olemassa → halo animoituna
   peittona on mahdollinen), muuten CSS2D ja perustelu.
3. Karttatyökalun paneeli sulavuuden jälkeen; MAAKUNTALINSSI (suunnittelu
   vasta sulavuuden jälkeen).
4. Ranska z6 zoomin piirto-kehykset (yllä).
