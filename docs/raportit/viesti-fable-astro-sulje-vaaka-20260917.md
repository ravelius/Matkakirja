# Viesti Fablelle: "Sulje linssi palauttaa yläpalkin" -vartio vaakanäkymissä (LISÄYS 12, kohta 35)

17.9.2026, Opus. Haara `claude/bold-ride-vow4ki-astro-sulje-vaaka`
(pohjana `origin/main`, c7219f8 = v1928).
Ei PR:ää, ei versionostoa, ei Raamattu-muutoksia.

**Tulos yhdellä rivillä: peli oli oikeassa, savuke väärässä.**
Astronautin kameran purkuketju palauttaa vaakanäkymässä yläpalkin
täsmälleen siihen tilaan, josta se lähti — vartio vain vaati tilaksi
`visible`, jota vaakaruudulla ei omistajan oman 13.9.2026 linjauksen
mukaan kuulu olla edes ennen linssiä.

---

## 1. Toisto (tehtävä 1)

Ajettu yksi näkymä kerrallaan, `NAKYMAT=<näkymä> node
tools/savukkeet/savuke-satelliittilinssi.mjs`.

| Näkymä | Ruutu | Vartio 12 | Mikä kolmesta petti |
|---|---|---|---|
| `tyopoyta` | 1400 × 900 | vihreä | — |
| `puhelin` | 390 × 844 | vihreä | — |
| `puhelinvaaka` | 844 × 390 | **punainen** | vain yläpalkki |
| `pienivaaka` | 740 × 360 | **punainen** | vain yläpalkki |

Punaisen ajon koko mitattu rivi (identtinen molemmissa vaakanäkymissä):

```json
{"pallolinssi":null,"palkkeja":0,"valikkoja":0,"merkkeja":0,
 "ikkunoita":0,"bodyLuokat":[],
 "topbarNakyvyys":"hidden","topbarKorkeus":61.375,
 "lautaNakyy":true,"liikuNakyy":true,
 "tila":"{\"vaihe\":\"action\",\"paikka\":{\"type\":\"city\",\"city\":\"ateena\"},
          \"rahat\":300,\"paiva\":null,\"aarteet\":0,\"tallennus\":0}"}
```

**Pelitila ja tallennus olivat siis kunnossa** (`tila` === ennen-tiiviste,
`tallennus` 0 molemmissa päissä, `bodyLuokat` tyhjä, merkit ja kehys
poissa). Ainoa poikkeava arvo oli `topbarNakyvyys: "hidden"`, kun vartio
odotti `"visible"`. Palkin korkeus 61,375 px oli jo palautunut.

## 2. Juurisyy (tehtävä 2)

Mittasin erillisellä diagnoosiajolla saman kolmen pisteen sarjan —
**ennen linssiä, linssi auki, linssin jälkeen** — molemmista päistä
(844 × 390):

| | ennen linssiä | linssi auki | suljettu |
|---|---|---|---|
| `.topbar` visibility | **hidden** | hidden | **hidden** |
| `.topbar` korkeus | **61,375 px** | 0 px | **61,375 px** |
| `.topbar` transform | **−61,375 px** | 0 | **−61,375 px** |
| `.ylapalkki-nappi` | näkyy | näkyy | näkyy |
| body-luokat | (ei linssin luokkia) | `aikajana-palkki-auki aikajana-paalla …` | (ei linssin luokkia) |

Pystynäkymissä sama sarja alkaa ja päättyy arvoon `visible`.

**Juurisyy:** vaakaruudulla pelin oma yläpalkki on jo *ennen linssiä*
liu'utettu ruudun ulkopuolelle ja `visibility: hidden` — tämä on
omistajan 13.9.2026 tilaus (`css/styles.css`, `@media (max-height:
520px)`: palkin tilalla on kartan oikean yläkulman väkäsnappi, ja luokka
`ylapalkki-auki` tuo palkin hetkeksi esiin). Linssi piilottaa palkin
omalla luokallaan `aikajana-palkki-auki` (korkeus 0) ja purkuketju
poistaa luokan, jolloin palkki palaa *täsmälleen* siihen tilaan, josta se
lähti: hidden, 61,375 px, −61,375 px, väkäsnappi paikallaan — ja nappi
myös toimii sulkemisen jälkeen (napautus → `visible`, transform 0,
yläreuna 0 px, body saa `ylapalkki-auki`). Vartio sen sijaan vertasi
kirjoitettuun vakioon `'visible'`, joten se mittasi vaakanäkymissä pelin
perusasettelua eikä linssin palautusta. Vika oli siis vartiossa, ei
linssissä eikä missään vaakatilan kotelossa tai safe-areassa.

*Sivuhuomio Fablelle:* koska ero näkyi vain ruudun korkeudessa, sama
sokea piste koskee kaikkia savukkeita, jotka vaativat `.topbar`-palkkia
näkyväksi. Tämä savuke on nyt korjattu; muita en tähän erään koskenut.

## 3. Korjaus (tehtävä 3)

Minimaalinen ja vartiossa: vertailukohta **mitataan** ennen linssiä
vakion sijaan.

- `tools/savukkeet/savuke-satelliittilinssi.mjs`: vanha `topbarEnnen`
  (pelkkä korkeus) laajeni `palkkiEnnen`-mitaksi, joka lukee palkin
  korkeuden, näkyvyyden ja väkäsnapin olemassaolon. Vartio 12 vaatii
  nyt, että sulkemisen jälkeen **näkyvyys on sama kuin ennen linssiä**,
  korkeus sama ± 0,5 px (ja yhä > 20 px) ja väkäsnappi samassa tilassa.
  Vartio ei siis löystynyt: pystynäkymissä se vaatii yhä `visible`, ja
  vaakanäkymissä se vartioi nyt myös reittiä palkkiin.

Vihreä kaikissa neljässä näkymässä (yksi ajo kerrallaan):

| Näkymä | Vartion 12 arvot sulkemisen jälkeen | Savuke |
|---|---|---|
| `tyopoyta` | `visible` / 57,375 px, nappi ei käytössä | 34/34 |
| `puhelin` | `visible` / 56,594 px, nappi ei käytössä | 31/31 |
| `puhelinvaaka` | `hidden` / 61,375 px, nappi näkyy | 32/32 |
| `pienivaaka` | `hidden` / 61,375 px, nappi näkyy | 32/32 |

Naapurisavukkeet ennallaan: `savuke-astro-valokuva.mjs` 390 × 844
(`NAKYMAT=puhelin`) **45/45** ja 844 × 390 (`NAKYMAT=vaaka`) **45/45**,
`savuke-astro-pallo.mjs` `NAKYMAT=puhelin` **37/37**. Tunnetut häilyvät
väitteet eivät osuneet tähän erään.

## 4. Vastakoe

Kaksi vastakoetta, molemmat pyydettyä muotoa "korjaus pois → sama
punainen luku".

1. **Savuke.** Palautin vartion vertailun vakioksi `'visible'` ja ajoin
   `NAKYMAT=puhelinvaaka` uudelleen: **31/32 läpi**, sama vartio
   punaisena, samat arvot (`topbarNakyvyys":"hidden","topbarKorkeus":
   61.375`, `palkkiEnnen` hidden / 61,375). Korjaus takaisin → 32/32.
2. **Yksikkötesti.** Lisäsin purkuketjuun tilapäisesti
   `'ylapalkki-auki'`-luokan poiston: uusi testi meni punaiseksi
   (`not ok 7 — purku sotki matalan ruudun yläpalkkitilan`, 57/58).
   Poisto pois → 58/58.

## 5. Yksikkötestit (tehtävä 4)

- `tests/satelliitti.test.mjs` **58/58** (uusi testi mukana),
  `tests/satelliitti-avaruus.test.mjs` + `tests/pallolinssit.test.mjs`
  yhdessä ajossa ennen lisäystä **137/137**, `tests/dokumentit.test.mjs`
  **3/3**.
- Uusi puhdas testi purkuketjulle: *"purkuketju ei koske matalan ruudun
  yläpalkkitilaan"*. Se rakentaa linssikehyksen tynkä-DOM:iin, jossa
  bodylla on jo `ylapalkki-auki` ja `pallolauta-paalla`, ajaa `pura()`:n
  ja vaatii molempien säilyvän; lisäksi se lukitsee purkulistan kolmeen
  omaan luokkaan, kieltää linssiltä `ylapalkki-auki`-luokan ja palkin
  tyylien kirjoittamisen, ja tarkistaa että matalan ruudun sääntö
  (`max-height: 520px`) ei ole vuotanut `css/satelliitti.css`:ään.

## 6. Muuttuneet tiedostot

| Tiedosto | Muutos |
|---|---|
| `tools/savukkeet/savuke-satelliittilinssi.mjs` | `palkkiEnnen`-mitta ennen linssiä; vartio 12 vertaa siihen; väkäsnappi mukaan mittaan; otsikkokommentti |
| `tests/satelliitti.test.mjs` | uusi testi purkuketjun ja matalan ruudun yläpalkkitilan rajasta |

Pelin koodiin (`js/linssit/satelliitti.js`, `js/ui.js`, `css/`) **ei
koskettu** — mittaus osoitti, ettei siellä ollut vikaa.

## 7. Kesto

Noin 55 min: riippuvuudet ja lukeminen ~10 min, toisto ja diagnoosiajot
~20 min, korjaus ja neljä vahvistusajoa + naapurisavukkeet ~20 min,
vastakokeet ja raportti ~5 min. Savukkeet ajettiin etualalla yksi
kerrallaan; koko `npm test` -ajoa ei tehty.
