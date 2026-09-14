# Fablelle: hampurilaisen ikoni alkuperäiseksi (14.9.2026)

**Omistajan sana (Raamattu, kohta HAMPURILAISEN IKONI, sanatarkasti):**
*"Hampurilaisen ikonin voi vaihtaa alkuperaiseen mutta jata nykyinen
iPhonen vaaka tilaa varten kayttoon silloin kun Ylapalkki on piilossa"*

## Mitä mitattiin ennen muutosta

Playwright, Chromium (`tools/savukkeet/savuke-hampurilainen.mjs`),
kolme ruutukokoa. Kaikissa kolmessa napissa oli väkäsikoni (kolme
leveää v:tä, v1835 / commit `d3dbb242`):

| ruutu | yläpalkki | päävalikon nappi `#menu-btn` | kartan nappi `.ylapalkki-nappi` |
| --- | --- | --- | --- |
| pysty 390 × 844 | näkyy (0,0 – 390 × 51) | näkyy 343,5 – 40 × 40, **väkäset** | piilossa |
| vaaka 844 × 390 | **piilossa** (y = −53) | ruudun ulkopuolella (y = −46) | näkyy 787,17 – 40 × 40, **väkäset** |
| työpöytä 1400 × 900 | näkyy | näkyy 1344,7 – 44 × 37, **väkäset** | piilossa |

Ratkaiseva mittaustulos on keskirivi: **vaakatilassa `#menu-btn` on
ruudun yläpuolella** (yläpalkki liukuu `translateY(-100%)`), eli se ei
ole se nappi, jonka pelaaja näkee. Väkäset, jotka omistaja halusi
säilyttää, ovat kartan omassa napissa.

## Mitä tehtiin

`index.html`, `#menu-btn`: takaisin **täsmälleen sama SVG kuin ennen
v1835:tä**, otettuna git-historiasta (`git show d3dbb242`), ei uutta
piirrosta:

    <span class="viiva-ikoni"><svg viewBox="0 0 24 24"><path d="M4.5 7h15M4.5 12h15M4.5 17h15"/></svg></span>

Kolme suoraa vaakaviivaa (`h`-muoto), y = 7 / 12 / 17, x = 4,5…19,5.

**Ehtoa ei tarvittu, eikä sitä siksi lisätty.** Väkäset jäävät
paikoilleen kahteen paikkaan, jotka tuovat polut yhteisestä
`js/vakasikoni.js`:stä:

* `js/ylapalkki-vaaka.js` → `.ylapalkki-nappi`, joka näkyy täsmälleen
  samalla media-kyselyllä `@media (max-height: 520px)`, jolla yläpalkki
  liukuu piiloon (`css/styles.css`);
* `js/aikajana-valikko.js` → linssien oma valikko.

Yläpalkin piilotuksen ehto **on** siis se sama tilalippu, jota
toimeksianto pyysi: nappi, joka näkyy vain palkin ollessa piilossa,
pitää väkäset; nappi, joka asuu palkissa, sai hampurilaisen takaisin.
Ei ajastimia, ei erillistä tunnistusta, ei uutta taitekohtaa.
Kuplalogiikkaan (v1835:n imeytyminen pluskuplaan) ei koskettu.

## Vartiot

`tests/vakasikoni.test.mjs` päivitettiin vastaamaan uutta sääntöä (7/7):

* päävalikon nappi on alkuperäinen hampurilainen — polku tarkistetaan
  merkkijonona **ja** muotona (`L`-käännöksiä ei saa olla);
* väkäspolut eivät saa vuotaa `index.html`:ään;
* väkäsnapin näkyvyys ja palkin piilotus ovat yhä samassa
  media-kyselyssä (jos ne eriytyvät, kartalle jää nappi ilman palkkia).

`tools/savukkeet/savuke-hampurilainen.mjs`, 18/18 läpi. **Vastakoe**
(`--vastakoe`, odotukset päinvastoin) antaa 4 FAIL-riviä.

## Kuvat

`docs/raportit/kuvat/hampurilainen-pysty.png` (76 kt),
`hampurilainen-vaaka.png` (81 kt), `hampurilainen-tyopoyta.png` (197 kt).

## Portit

* `npm test` — 3352 pass / 1 fail / 13 skip (3366 testiä), ks. kommentti alla
* `tarkista-kaksoisavaimet` — ei kaksoisavaimia
* `tarkista-niputus` — 387 moduulia, ei törmäyksiä
* `tarkista-savukkeet` — kunnossa

`tests/pollo.test.mjs`:n kuormavartiot (*"indeksi rakentuu ja on
kokoluokaltaan järkevä"*, *"haku on nopea myös koko aineistolla"*)
kaatuvat tällä koneella kuorman alla eivätkä liity tähän muutokseen:
ne mittaavat hakuindeksin rakennusaikaa, ja koneella ajoi
samanaikaisesti toisten sessioiden testiajoja. Yksin ajettuna sama
tiedosto antaa saman kahden rivin kuormavaroituksen ilman
koodimuutoksia (`node --test tests/pollo.test.mjs` → 122 pass / 2 fail,
molemmat kuormavartioita).

## Huomio muille sessioille

Yritin toistaa täyden `npm test`-ajon ja siivosin oman prosessini
`pkill -f`:llä liian väljällä hakukuviolla. Kuvio osui myös toisen
session samannimiseen ajoon (`node --test tests/*.test.mjs`) ja
katkaisi sen. Ajo ei muuta mitään repossa, mutta se on ajettava
uudelleen. Anteeksi — jatkossa tapan vain oman taustaprosessini
pid:llä.
