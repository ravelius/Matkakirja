# Liikevara ja zoomin sulavuus (Pelikoodari 22.9.2026)

Haara `pelikoodari-nostojen-liikevara` (pohja main v2041, sisältää
`pelikoodari-ablaatio`n lipun `?kerrokset=porrasN`). Omistajan löydös
(työpöytä v2026): *"panoroitaessa uudelle alueelle nostot tupsahtavat
näytölle jälkikäteen"*; Fablen hyväksymä jatko ablaatiotikkaan
ehdotuksesta (docs/raportit/sulavuus-ablaatio-20260921.md).

## Mitä muuttui

1. **Liikevara** (`js/pallolauta/nostot.js` LIIKEVARA, `NOSTOJEN_LIIKEVARA_OSUUS`
   0,5): levossa nostot ladotaan ruutua suuremmalle alueelle — puolet
   ruudun suuremmasta sivusta joka suuntaan (puhelin 390 × 844: 422 px,
   työpöytä 1400 × 900: 700 px). Ruudun ulkopuolinen lappu sovitellaan
   laajennettua reunaa vasten (`sovittelu.js` `l.reuna`), ruudussa oleva
   ruudun reunaa vasten kuten ennen. Katto kasvaa alan mukana
   ((1 + 2 × 0,5)² = 4×; `liikevaranKatto`). Pisteet (CSS2D-DOM) vain
   ruudussa. Sama nimille (`nimet.js lado liikevara`, `karttanimet.js`
   reunavyöt siirtyvät ulos). Vastakoe `?liikevara=0`.
2. **Ruudussa oleva voittaa tulokkaan** (`sovittelu.js`): lappu, jolla on
   näkyvä lukittu asento, sovitellaan ennen lukotonta tulokasta — liike-
   varasta ruutuun tuleva nimiö väistää, ei se, joka oli jo silmissä.
3. **Liikkeessä ei täyttä ladontaa** (`lauta.js` LIIKKEESSÄ EI TÄYTTÄ
   LADONTAA): kameran muutos ajaa ladonnan vain, kun kamera on siirtynyt
   yli puolet liikevarasta tai mittakaava on muuttunut ≥ 1,35× viime
   ladonnasta; muuten liikkeen kehys vain siirtää (runko lat/lng:stä,
   CSS2D omistaan, E2-kuori kantaa koon). Mittari `pallolauta.ladonnat()`.
4. **Rasteroinnit jonoon liikkeessä** (`nimiorasterit.js`): liikkeessä
   (ele TAI kameran tuore muutos, `LIIKKEEN_IKKUNA_MS` 120) enintään yksi
   uusi rasteri kehystä kohti; valmistunut rasteri ei jaa liikkeessä
   (`glnimiot-sovitin.js`, `tila().lykattyja`) — vanha rasteri tai CSS2D
   pysyy seuraavaan ladontaan.
5. **Rungon rakennus kerran per ladonta** (`glnimiot-sovitin.js`
   `alkuLadonta`/`loppuLadonta`): kolme jakoa → yksi `asetaKaikki`.
6. **Peiton osapäivitys** (`pallonimiot-gl.js` `peitto`): häivytys
   kirjoittaa neljä lukua attribuuttiin eikä rakenna puskureita — tämä
   oli myös CI:n "rakennuksia liikkeessä" -punaisen syy (v2046).

## Mittaus (headless WebKit 390 × 844 dpr 3, Ranska z6, tuotanto)

| | pan med / p95 / max | >50 | zoomi med / p95 / max | >50 |
| --- | --- | --- | --- | --- |
| main v2041 (ablaatio porras 6) | 17 / 36 / 51 | 1 | 20 / 49 / 73 | 7 |
| liikevara-haara | 17 / 30 / 57 | 1 | 21 / 38 / 55 | 1 |

Zoomin pisimmissä kehyksissä on nyt laattapyyntöjä ja -purkuja (8–17 /
kehys) ja tekstuurien luonti; ladonta (3 jakoa) enää muutamassa. Mittaus
tehtiin kuormassa 9–17 (Julkaisijan CI samalla koneella), joten luvut
ovat ylärajoja; oikean iPhonen luku Laitetestaajalta.

## Savukkeet

- `savuke-nostojen-liikevara.mjs` (uusi, julkaisusarja): työpöytä + puhelin,
  Ranska z7, veto 400 / 234 px — jokainen vedon jälkeen ruudussa oleva
  nosto oli rungolla jo ennen, koko ja paikka samat ruudussa pysyneillä
  (reunavyö pois: reunasääntö saa vaihtaa kylkeä), eleen aikana instanssi
  ei katoa: 10/10; vastakoe `LIIKEVARA=0` 5/10.
- Vihreitä: nostojen-tyyppimerkit 10/10, glnimiot-nostot 9/9,
  glnimiot-nimet 7/7, nimion-koko-panorointi 13/13, marseille-valkkyy 4/4,
  nostot-nakyviin, nimikyltti 48/48.
- `savuke-nimiot-vakaat`: reunaylitys luetaan nyt vain ruudussa osittain
  olevista (liikevaran laput ovat ruudun ulkopuolella tarkoituksella);
  vartio 2 (kylki ei vaihdu zoomiportaan aikana) häilyi kuormassa 22 —
  ajetaan uudestaan hiljaisella koneella ennen Julkaisijaa.
