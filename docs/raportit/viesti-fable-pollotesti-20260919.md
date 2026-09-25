# Opus → Fable: pöllötestin seinäkellorajat CPU-ajaksi (19.9.2026)

Erä `opus-local-pollotesti`, Matkakirja Opus local (Mac Studio), 15.22–15.35 Suomen aikaa.

## Mitä INDEKSI mittaa

`rakennaIndeksi` (js/pollo-haku.js) rakentaa pöllön paikallisen
hakuindeksin koko pelin aineistosta (6 797 merkintää, 408 875 sanaa);
peli tekee sen pöllön ensimmäisellä avauksella. Testin kommentti sanoo
tarkoituksen: ensiavauksen kustannus — "jos tämä lähestyy 200 ms,
indeksointi siirretään taustalle" (omistaja 12.8.2026). Raja 2000 ms oli
siis absoluuttisen nopeuden raja, ja `kesto` on seinäkelloa
(`performance.now()`), joka venyy rinnakkaiskuormassa.

## Juurisyy

Seinäkello mittaa koneen kuormaa. Mittaus samalla Macilla, sama
indeksointi (erillinen skripti, kolme rakennusta per ajo):

| Tilanne | Seinäkello | CPU-aika (user + system) |
| --- | --- | --- |
| yksin | 227 / 246 / 410 ms | 220 / 174 / 180 ms |
| 20 kuormaprosessin rinnalla | 965 / 1101 / 1730 ms | 198 / 152 / 164 ms |

CPU-aika pysyy paikallaan, seinäkello venyy 4–7-kertaiseksi. Sama riski
oli samassa tiedostossa testillä "haku on nopea myös koko aineistolla"
(`kesto < 250`, seinäkello): ensimmäinen haku mittasi yhdessä ajossa jo
254 ms.

## Muutokset (vain tests/pollo.test.mjs)

- Indeksin rakennus kääritään `process.cpuUsage()`-mittaukseen
  (`INDEKSIN_CPU_MS`); raja `< 1000 ms` CPU-aikaa (noin viisinkertainen
  nykyiseen, kaatuu jos indeksointi muuttuu neliölliseksi). Seinäkello
  ja CPU tulostetaan tiedoksi. Kommentti perusteluineen.
- Haun nopeus: sama CPU-mittaus, raja pidetty 250 ms:ssa (mitattu
  26–29 ms CPU).

## Ajot: node --test tests/*.test.mjs

| Ajo | Indeksi seinä / CPU | Haku seinä / CPU | Tulos |
| --- | --- | --- | --- |
| 1 | 968,9 / 237,3 ms | 169,7 / 29,3 ms | pass 3650, fail 0 |
| 2 | 397,8 / 218,9 ms | 23,1 / 26,7 ms | pass 3650, fail 0 |
| 3, rinnalla build-standalone + 12 CPU-silmukkaa | 257,1 / 215,7 ms | 65,8 / 26,1 ms | pass 3650, fail 0 |

Huomio: indeksoinnin CPU-aika on jo 215–237 ms eli omistajan 200 ms:n
"siirrä taustalle" -rajan yli. Testi ei vartioi sitä (raja oli 2000 ms);
kirjaan sen tiedoksi, päätös Fablelle.

## Muut seinäkellorajat tests/-kansiossa (ei korjattu tässä erässä)

Aitoa seinäkelloa (Date.now()-ero) mittaavat:

- `tests/livia-aani.test.mjs:872` — `kulunut < 2500` (ajastin venyy
  puheen mittaan, odotus ~1000 ms); ja `:881` `kulunut < 500` (hiljainen
  kupla, odotus lukuaika). Ajastinpohjaisia, kuormassa venyviä; 500 ms
  on tiukin.
- `tests/sw.test.mjs:722` ja `:735` — `kesto < 3000` (esilataus ja
  asennus jumittuvilla äänihauilla, katkoMs 200). Väljä, mutta
  seinäkello.

Laskennallisia kestoja (EIVÄT mittaa seinäkelloa, ei riskiä):
`tests/etusivupallo.test.mjs:184` (reitti.kesto), `tests/ihmisen-matka-esitys.test.mjs:234`
(esityksen laskettu pituus), `tests/sahketehtava.test.mjs:82, :90`
(aikataulun kesto).

## Jäi tekemättä

- livia-aani- ja sw-testien rajat (lista yllä).
- Indeksoinnin siirto taustalle / nopeutus (200 ms:n raja ylittyy).
