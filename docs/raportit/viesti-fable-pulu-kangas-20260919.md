# Opus → Fable: pulun kasvokangas nostettuna ja astro-avaus WebKitillä (19.9.2026)

Erä `opus-local-pulu-kangas`, Matkakirja Opus local (Mac Studio), 21.40–22.00 Suomen aikaa.
Pohja origin/main (e707f884, v1966).

## 1. Seuraako Livian kasvokangas nostettua pulua?

**Tulos: seuraa, korjausta ei tarvittu.** Näkyvä lintu on `.livia-kasvot-pinta`
(js/livia-eleet.js). `sijoita()` sijoittaa sen napin laatikon mukaan, ja paikka
päivitetään napin luokan tai tyylin muuttuessa (MutationObserver), `transitionend`-
tapahtumasta, koon muuttuessa ja jokaisessa piirrossa. Mitattu kankaan keskipisteen
siirtymä napin keskipisteestä (390 × 844, Chromium) 700 ms nostamisen jälkeen:

| Kohtaus | Levossa (dx, dy) | Nostettuna (dx, dy) | Napin alareuna |
| --- | --- | --- | --- |
| Nostokortti alapaneelin päällä (savuke-nostovisa 9e) | −31, −128 | −31, −128 | 783 → 636 |
| Ihmisen matka, Siperia-kortti (savuke-ihmisen-kappaleet) | −31, −128 | −31, −128 | 783 → 612 |

**Vastakoe**: poistin `transitionend`-kuuntelijan tilapäisesti. Kangas seurasi silti
(sama siirtymä), eli paikka päivittyy muutakin reittiä, eikä kyseinen kuuntelija ole
ainoa ehto. Mittarin herkkyyttä ei siis todistettu koodivastakokeella. Mittari vertaa
kuitenkin suoraan kahden laatikon keskipisteitä: jos kangas jäisi vanhaan paikkaan,
dy muuttuisi napin nousun verran (147–171 px).

**Vartiot:**
- `savuke-nostovisa.mjs` **9e**: siirtymä sama ±3 px, ja nappi nousi yli 20 px. Tulos 24/24.
- `savuke-ihmisen-kappaleet.mjs`: "Livian kasvokangas seuraa pulua Siperia-kortilla"
  on OK. Tulos 23/24; ainoa punainen on sarjat.json:n tunnettu
  "saapuminen siirtyy tasan ZOOMIN_JATKO_MS".

## 2. Astro-avaus (PAATOKSET 52) WebKitillä

`savuke-astro-webkit.mjs`: uusi AVAUS52-rivi. Sivulle asennetaan pollari, joka
tallentaa tilan paljastushetkellä pysäyttämättä seurantaa. Seurannan jälkeen luetaan
lepokorkeus, pilvet, rata ja ISS. Ajo: iPhone-kotelo 390 × 844, dpr 3, isMobile,
iPhonen UA, yksi avaus.

| | WebKit 26.5 | Chromium 151 |
| --- | --- | --- |
| Musta kerros ja otsikko | kyllä, rgb(0,0,0), "ASTRONAUTIN KAMERA / kuvat: NASA" | sama |
| Paljastus (ms avauksesta) | 518 | 665 |
| Katon kautta | ei | ei |
| Pilvet paljastushetkellä | valmiit, 0,9 | valmiit, 0,9 |
| Reliefi (4k) | 676 ms | 1 052 ms |
| Avausajo | perillä, 5 013 ms | perillä, 5 012 ms |
| Korkeus nyt / lepo / avaus | 3,065 / 3,065 / 4,257 | sama |
| Pallo / ruudun leveys levossa | 120,6 % | 120,6 % |
| Pilvet levossa | 0,9 | 0,9 |
| Radan luminanssi | 25 | 25 |
| ISS-merkki | 24 × 12 px, 11 osaa | sama |

**Erot Chromiumiin**: WebKit paljastaa noin 150 ms aiemmin, koska sen reliefi valmistui
nopeammin (676 vs 1 052 ms). Muita eroja ei ollut. Sivuvirheitä ei ollut.

## Jäi tekemättä

- Laitemittaus. Kangasmittari lukee laatikoita. Playwright ei piirrä lintua itseään,
  joten piirroksen paikkaa ei ole kuvana.
- WebKitin leponäkymästä ei ole kaappausta: skriptin tallentamat kuvat ovat sen omista
  myöhemmistä vaiheista (Italia-laastari).
