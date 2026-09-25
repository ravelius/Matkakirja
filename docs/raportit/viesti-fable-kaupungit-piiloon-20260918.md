# Viesti Fablelle: PAATOKSET 43 kohdat 8 ja 9 (18.9.2026)

Opus-erä haarassa `claude/bold-ride-vow4ki-kaupungit-piiloon`
(pohja `claude/bold-ride-vow4ki-v1947`, kärki 72e775e9). Versiota EI
nostettu, PR:ää ei avattu.

## Kohta 8 — muiden maiden kaupungit piiloon, kun ei olla liikkumassa

Omistaja sanatarkasti: *"Voiko muiden maiden kaupungit piilottaa
kartalta jos ei olla liikkumassa?"*

### Mitä tehtiin

`js/pallolauta/lauta.js` sai yhden uuden portin, `pelinKaupunkirajaus()`,
joka palauttaa sallittujen kaupunkien joukon tai `null` (ei rajausta):

- **Maa luetaan yhdestä paikasta.** `kohteidenNykyinenIso(ui)` on sama
  luku kuin korostuskehällä, värilaatastolla ja nostotasolla
  (`nostotasot[kohdemaa]`). Jäsenyystaulu on PALLON oman laudan
  `pack.map.cityCountry` — pelin oma pack voi lähtövalinnassa olla
  toinen.
- **Joukko** = kohdemaan kaupungit + pelaajan oma kaupunki +
  siirtovaiheessa nopanheiton tarjolla olevat kohteet (sama sääntö kuin
  `drawTargets`: `phase === 'move'`, ei bottia, ei katselua).
- **Ei rajausta**, kun avauslento, linssi, kehittäjän maailmatila tai
  `ui.maailmanakyma` on päällä — ne näyttävät kaikki kuten ennen.
- **Ei rajausta myöskään silloin, kun kohdemaata ei ole.** Nappulan
  ollessa reitillä (liftaus, saatto) `cityOf` on tyhjä, eli kartta on
  entisellään juuri silloin kun *ollaan* liikkumassa.
- Joukko on avaimella muistissa (`iso|oma|kohteet`), joten sitä ei
  rakenneta uudestaan kehyksittäin.

Portti kytkettiin kahteen paikkaan, molemmat **datassa eikä CSS:ssä**:

1. `pisteNakyy` → pois jäävä kaupunki ei tule `pointsData`-joukkoon.
2. Nimiladonnan `vain`-portti → pois jäävä kaupunki ei ole edes
   ehdokas, joten se ei mittaa tekstiään eikä osallistu
   törmäystestiin. Nimibudjetti EI tule rajauksesta: katto luetaan
   `niukka`sta (lento/lähtövalinta), jotta kohdemaan koko ei ohita
   zoomtason budjettia.

### Mitattu (uusi savuke, Mac Studio, Chromium, 18.9.2026)

`tools/savukkeet/savuke-kaupungit-piiloon.mjs` — **20/20 läpi**.
Fogg Pariisissa, ruudut 390 × 844 dpr 2 ja 1400 × 900 dpr 1.

| | 390 px | 1400 px |
|---|---|---|
| kaupunkipisteet ilman noppaa | `pariisi` | `pariisi, marseille` |
| ladotut nimet ilman noppaa | `Pariisi` | `Pariisi, Marseille` |
| muiden maiden pisteitä / nimiä | 0 / 0 | 0 / 0 |
| ulkomaisia kaupunkeja ennen / jälkeen nopan | 0 → 5 | 0 → 4 |
| maailmatila pisteitä päällä / pois | 261 / 3 | 261 / 5 |

Nopan kohteet olivat `lontoo, edinburgh, amsterdam, marseille, alpit,
venetsia`; jokainen kartalle ilmestynyt ulkomainen kaupunki oli kohde,
eikä yksikään muu kuin kohdemaan tai kohteiden kaupunki ollut kartalla.

Kaappaukset: `tools/savukkeet/kaappaukset/kaupungit-piiloon/`
(`ranska-ennen-390.png`, `ranska-jalkeen-390.png` ja samat 1400:lle).
1400 px:n jälkeen-kuvassa näkyy Venetsia kohdemerkkinä Italiassa —
juuri se, mitä päätös lupaa.

### KOLME ASIAA FABLELLE (en korjannut, kustannuskuri kohta 1)

1. **Tehtävänannon mittarissa oli luku, jota data ei tue.** Ohje sanoi
   "kohdemaan kaupungit ≥ 5". Pallon laudassa
   (`js/packs/maailmankartta.js`) Ranskassa on NELJÄ kaupunkia
   (`pariisi, marseille, cayenne, noumea`, joista kaksi jälkimmäistä
   ovat merentakaisia eivätkä osu Ranskan näkymään). Suurin osa maista
   on 1–2 kaupungin kokoisia; yli viiden kaupungin maita on vain
   AUS 20, USA 18, BRA 14, CAN 11, RUS 10, CHL 7, CHN 6. Savuke
   vaatii siksi "jokainen piste kuuluu kohdemaahan" eikä
   kappalemäärää. **Jos omistaja tarkoitti, että kartalla pitää näkyä
   enemmän kuin pari nimeä, päätös tarvitsee tarkennuksen** — esim.
   naapurimaiden kaupungit mukaan tai rajaus vain ruudun ulkopuolisiin.
   Nyt Ranskan pelinäkymässä on 1–2 elävää kaupunkinimeä; loput kartan
   nimistä ovat laattaan poltettuja (PAATOKSET 37), eli kartta ei ole
   tyhjä, mutta elävä kerros on hyvin niukka.
2. **savuke-pallolauta vartio 12b menetti nimibudjetin mittauksen.**
   Se vaati ENNEN "koko pallo: nimiä 10–40 (ehdokkaita > 40)" Fogg
   Ateenassa; Kreikassa on kaksi kaupunkia, joten ehto mittaisi nyt
   väärää asiaa. Laskin alarajan 1:een ja poistin ehdokasehdon, ja
   kirjasin syyn savukkeeseen. **Budjetin oma vartio kuuluu
   maailmatilaan** (jossa rajausta ei ole) — se on oma pieni eränsä,
   enkä tehnyt sitä tässä. En myöskään ajanut savuke-pallolautaa
   uudelleen (pitkä ajo, ämpäririippuvainen).
3. **Muut savukkeet tarkistettiin** (`grep kaupunkipiste|laji !==
   'helmi'` koko `tools/savukkeet/`): `savuke-ranskan-nostot-lukossa`
   laskee NOSTOKERROKSEN kaupunkimerkkejä (`nakyva-kaupunki-*`,
   js/nostoladonta.js), jotka ovat jo ennestään vain kohdemaasta —
   ei muutosta. `savuke-linssivika`, `savuke-topografialinssi`,
   `savuke-reittihelmet`, `savuke-pallo-merkit-lukossa` ja
   `savuke-pariisi-lahizoom` lukevat oman kaupungin tai yhden
   mielivaltaisen pisteen — ei muutosta. Vain 12b vaati korjauksen.

## Kohta 9 — yläpalkki piiloon myös iPadilla

Omistaja sanatarkasti: *"Ylapalkin voisi piilottaa myos ipadilla niin
kuin iphonella on."*

### Raja ja sen perustelu

Sääntölohko on yhä yksi (`css/styles.css`, osio YLÄPALKKI PIILOON
VAAKAPUHELIMELLA), ja siihen lisättiin toinen ehto:

```css
@media (max-height: 520px),
  (pointer: coarse) and (min-width: 700px) and (max-width: 1366px) {
```

- `pointer: coarse` — sormi, ei hiiri. **Mitattu Chromiumilla:**
  iPad 1024 × 1366 ja 1366 × 1024 `hasTouch`illa → `coarse: true`;
  työpöytä 1400 × 900 hiirellä → `fine: true, coarse: false`. Työpöytä
  ei siis osu sääntöön missään ikkunakoossa.
- `min-width: 700px` — pelin oma puhelinraja on `max-width: 699px`
  (osio IPHONE: ISOISÄN JA PULUN TEKSTIT PIILOON). Pystypuhelin jää
  ennalleen; vaakapuhelin osuu yhä korkeusehtoon.
- `max-width: 1366px` — iPad Pro 12,9" on vaakasuunnassa laajin iPad.
  Rajan sisään osuvat myös iPad mini (744 × 1133 / 1133 × 744) ja
  iPad 10,9" (820 × 1180 / 1180 × 820).

Nappi, sen paikka, karttaselitteen väistö (`right: 2.95rem`) ja
sulkusääntö tulevat samasta lohkosta, joten toista taitekohtaa ei
synny. `js/ylapalkki-vaaka.js` ei mittaa ruutua eikä sisällä yhtään
mittalukua (yksikkötesti valvoo tätä).

**Kartan oikean yläkulman elementit:** ainoa naapuri pelinäkymässä on
karttaselite, ja se väistyy samalla säännöllä kuin puhelimella
(mitattu: rako ≥ 0 molemmissa suunnissa, kumpikin mahtuu ruudulle).
`.maa-pilleri` ei enää synny pelinäkymässä (js/ui.js paivitaMaaPilleri,
30.8.2026), eikä kartalla ole muita `right: 0.4rem` -kalusteita.

### Mitattu

`tools/savukkeet/savuke-ylapalkki-vaaka.mjs` laajennettiin iPadin
molempiin suuntiin ja työpöytään — **37/37 läpi** (ennen 16/16):

- iPad 1024 × 1366 ja 1366 × 1024 (kosketus): sääntö osuu
  KOSKETUSEHDOSTA eikä matalasta ruudusta, yläpalkki piilossa,
  väkäsnappi näkyy, karttaselite väistyy vasemmalle, nappi avaa palkin
  sisällön päälle ja napautus palkin ulkopuolelta sulkee sen.
- Työpöytä 1400 × 900 hiirellä: kumpikaan ehto ei osu, palkki näkyy,
  väkäsnappi piilossa, karttaselite oikeassa reunassa.
- Vaaka- ja pystypuhelin ennallaan.

Kaappaukset: `tools/savukkeet/kaappaukset/ylapalkki-ipad/`
(`ylapalkki-ipad-pysty-{auki,kiinni}.png`,
`ylapalkki-ipad-vaaka-{auki,kiinni}.png`).

## Testit ja build

- `node --test tests/*.test.mjs` → **# pass 3628, # fail 0** (skipped 13).
  Kolme lähdemuotoa valvovaa väitettä päivitettiin uuteen koodiin
  (`tests/pallonimet.test.mjs`, `tests/aloitus-pallolla.test.mjs`,
  `tests/vakasikoni.test.mjs`) ja uudet väitteet lisättiin rajaukselle
  ja iPadin medialle.
- `node tools/build-standalone.mjs` → dist/matkakirja.html 32759 kt, ok.

## Muutetut tiedostot

| tiedosto | mitä |
|---|---|
| `js/pallolauta/lauta.js` | `pelinKaupunkirajaus`, `pisteNakyy`-portti, nimiladonnan `vain`/`niukka` |
| `css/styles.css` | iPad-ehto yläpalkkilohkoon + perustelu |
| `js/ylapalkki-vaaka.js` | kommentti: raja on CSS:ssä, kaksi ehtoa |
| `tools/savukkeet/savuke-kaupungit-piiloon.mjs` | UUSI savuke (kohta 8) |
| `tools/savukkeet/savuke-ylapalkki-vaaka.mjs` | iPad- ja työpöytälohkot, kuvakansio, Mac-polut |
| `tools/savukkeet/savuke-pallolauta.mjs` | vartio 12b kalibroitu (ks. kohta 2 yllä) |
| `tools/savukkeet/sarjat.json`, `README.md` | uusi savuke julkaisusarjaan + rivit |
| `tests/pallonimet.test.mjs`, `tests/aloitus-pallolla.test.mjs`, `tests/vakasikoni.test.mjs`, `tests/ylapalkki-vaaka.test.mjs` | väitteet uuteen koodiin |
