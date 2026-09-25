# Astronautin kamera: hehku valaisee karttaa, pallo tummempi (LISÄYS 16)

Opus-agentti Fablelle 18.9.2026 klo 01.55 Suomen aikaa.
Haara `claude/bold-ride-vow4ki-avaruus-hehku2` (origin/main 3d243c9b, v1934).
**Vaatii versionoston** (pelikoodi muuttuu). Uutta versiota ei ajettu, PR:ää
ei avattu (AGENTIT TARKENNUS 8 — Fable kokoaa julkaisu-PR:n).

Päätös: Raamattu ASTRONAUTIN KAMERA **LISÄYS 16**, kohdat 45–46.

## Mitä tehtiin

**45 HEHKU NÄKYVÄKSI.** Juurisyy omistajan havaintoon (*"Pisteet eivät näytä
hehkulta vaan tasaisilta ympyröiltä"*) on kokoero: 8 px:n liu'ussa ydin
täytti kiekon lähes reunaan asti, joten silmä luki sen tasaisena ympyränä.
Merkki on nyt kaksi kerrosta, joiden mittasuhde tekee hehkun:

* **terävä ydin 5 px** (`.satelliitti-ydin`, ennen 8 px): sama liuku
  #eafff3 → #5dffa8 → läpinäkyvä, mutta tiiviimpi (vihreä vasta 55 %:ssa).
* **valaiseva sädekehä 28 px** (`.satelliitti-sadekeha`, uusi): yksi
  radial-gradient, alfa 0,26 keskellä → 0,13 → 0,05 → 0 reunalla,
  `mix-blend-mode: screen`. Ei reunaviivaa, ei `box-shadow`ia — box-shadow’n
  pehmennys oli se, joka aikanaan teki lähekkäisistä kohteista rypäleitä.

Sädekehä on merkin ENSIMMÄINEN lapsi, joten terävä ydin jää sen päälle.
Vanhat luokat `satelliitti-hehku` ja `satelliitti-rengas` (kolmikerroksisen
merkin jäänteet) pysyvät kiellettyinä lukossa.

**46 PALLO TUMMEMPI.** `PALLON_SAVY` 0xbfbfbf (0,75) → **0x999999 (0,60)**.
Sävy tulee yhdestä paikasta, joten avaus, sävyvahti, varapolku ja sulun
palautus saavat saman arvon automaattisesti (mitattu: kolme peräkkäistä
avausta lukevat materiaalista `999999`). Pinta-musta-vartijan kynnys (12)
pysyy ennallaan.

**Osuma-ala 36 px → 44 px.** Sama mitta kuin pallon pinnasta laskettu
napautussäde (`js/pallolauta/lauta.js lahinLinssimerkki`). Ala on yhä
läpinäkyvä ja `pointer-events: none` — se ei ota napautuksia, vaan pitää
merkin ruutualan sormen kokoisena ja mitattavana.

Pistemittari ennallaan: **kohteita 64, domissa 64** joka ajossa.
Selitteen nimet, nimikynnys ja avausajo koskemattomia.

## Mittaus (Playwright, yksi ajo: työpöytä 1400×900 + puhelin 390×844)

`tools/savukkeet/savuke-astro-pallo.mjs` **122/122 läpi** (aiemmin 112;
uudet väitteet 45, 45a, 45b, 45c sekä molemmat näkymät).

| Väite (puhelin 390×844) | Tulos |
| --- | --- |
| 45 sädekehä ytimen ympärillä ja valaisee | 28 px, `screen`, liuku nollaan, ydin 5 px |
| 45a ytimen kirkkaus > sädekehän reuna | **220,4** vs. 52,2 (13 px) |
| 45b pinta 10 px:n päässä > pinta 40 px:n päässä | 56,3 vs. 33,1 (**ero 23,2**, vaadittu ≥ 5) |
| 45c valaisu tulee sädekehästä eikä maastosta | sädekehä nostaa 10 px:n kehää **+6,3**; 40 px:n kehä ±0,0 |
| 41 ytimen keskusta > reuna (ennallaan) | 226,5 vs. 81,8 |
| 42 halkaisija sama kahdella zoomilla | 5 px → 5 px (alt 4,26 → 1,49) |
| 43/46 pinta tummeni mutta ei mustunut | valkoisella 115 → **sävyllä 66** (ennen 79; kynnys 12) |
| pinnan keskikirkkaus (`pinnanKirkkaus`) | **90** (v1934:ssä 108–123) |
| pallon keskipiste ei ole musta | 33,4 (kynnys 20) |

Pinnan keskikirkkaus siis **laskee** 0,75:n arvoista noin 0,8-kertaiseksi ja
pysyy silti moninkertaisesti mustan kynnyksen yläpuolella.

**45c on se väite, joka todistaa valaisun.** Sama 10 px:n kehä mitataan
kolmesti: normaalisti, `mix-blend-mode: normal` pakotettuna ja sädekehä
`display: none` -piilotettuna. Piilotus kertoo, paljonko sädekehä nostaa
pintaa (+6,3), ja 40 px:n verrokkikehä varmistaa, ettei nousu ole maaston
vaihtelua (±0,0).

### WebKit-tarkistus (Playwright webkit 26.5, iPhone 390×844 dpr 3)

Sama väite ajettiin kertaalleen oikealla WebKitillä (ämpäri välitetään
Noden fetchin kautta kuten `savuke-astro-webkit.mjs`:ssä; skripti
`/private/tmp/claude-501/-Users-samireivinen-Matkakirja-fable/1de1d7f9-1349-4671-ad36-3323aaf75d0f/scratchpad/webkit-hehku.mjs`).

| | WebKit 26.5 | Chromium 151 (sama skripti) |
| --- | --- | --- |
| sädekehän `mix-blend-mode` | `screen` | `screen` |
| ydin / sädekehän reuna | 234,6 / 54,6 | 224,5 / 54,6 |
| **valaisu** (10 px kehän nousu sädekehästä) | **+6,3** | **+6,6** |
| `screen`-sekoituksen lisä `normal`-tilaan | **−0,4** | **+0,3** |
| pallon sävy / pinnan kirkkaus | `#999999` / 95 | `#999999` / 90 |

**Toimiiko sekoitus WebKitissä? Kyllä ja ei — ja se on kunnossa.**
WebKit *tukee* `mix-blend-mode: screen`iä CSS2D-elementissä (laskettu arvo
on `screen`, ei `normal`), mutta **sekoitus ei kohdistu WebGL-kankaaseen
kummassakaan selaimessa**: ero `screen`- ja `normal`-tilan välillä on
−0,4 (WebKit) ja +0,3 (Chromium) eli mittausmelua. Syy on rakenteessa:
globe.gl:n CSS2D-kerros on oma div, ja jokainen merkki saa
CSS2DRendereriltä `transform`in, joka muodostaa eristetyn sekoitusryhmän —
sädekehän taustana on siis läpinäkyvä tyhjyys, ei kangas.

Valaisu syntyy silti: **+6,3 yksikköä molemmissa selaimissa**. Matala-alfainen
kirkas liuku vaalean vihreää tummalla pinnalla nostaa luminanssia myös
tavallisella alfa-yhdistelyllä. Mitattu ero on selvästi yli vaaditun
kynnyksen (≥ 5), ja omistajan pyyntö (*"valaista karttaa ympärillään
hieman"*) täyttyy mitattuna.

**Siksi globe.gl-kerrosta (customLayerData-sprite tai additiivinen
pointsData) EI rakennettu tässä erässä.** Se olisi iso muutos —
kohdepisteet siirtyisivät CSS2D:stä WebGL:ään, mikä veisi mukanaan
vakiokoon ruutupikseleinä (LISÄYS 15 kohta 42), nimikyltit ja
pistemittarin (kohteita 64 = domissa 64) — ja mitattu hyöty olisi
korkeintaan muutama luminanssiyksikkö. `screen` jätettiin tyyliin, koska
se ei voi tummentaa ja astuu voimaan sellaisenaan, jos kerroksen eristys
joskus purkautuu. Jos omistaja haluaa voimakkaamman valaisun, halvin
seuraava askel on nostaa sädekehän alfaa (0,26 → 0,35) tai kokoa
(28 → 32 px) — molemmat ovat yhden CSS-muuttujan mittaisia, ja lukot
sallivat haarukan.

## Kaappaukset

* Puhelin, WebKit, koko näkymä:
  `/private/tmp/claude-501/-Users-samireivinen-Matkakirja-fable/1de1d7f9-1349-4671-ad36-3323aaf75d0f/scratchpad/kaappaukset2/astro-hehku-webkit-390-20260918.png`
* Puhelin, WebKit, lähizoomi pisteineen (120 × 120 px pisteen ympäriltä):
  `/private/tmp/claude-501/-Users-samireivinen-Matkakirja-fable/1de1d7f9-1349-4671-ad36-3323aaf75d0f/scratchpad/kaappaukset2/astro-hehku-webkit-lahizoomi-390-20260918.png`
* Puhelin, Chromium, koko näkymä:
  `/private/tmp/claude-501/-Users-samireivinen-Matkakirja-fable/1de1d7f9-1349-4671-ad36-3323aaf75d0f/scratchpad/kaappaukset2/astro-hehku-chromium-390-20260918.png`
* Puhelin, Chromium, lähizoomi pisteineen:
  `/private/tmp/claude-501/-Users-samireivinen-Matkakirja-fable/1de1d7f9-1349-4671-ad36-3323aaf75d0f/scratchpad/kaappaukset2/astro-hehku-chromium-lahizoomi-390-20260918.png`

## Lukot

`node --test tests/*.test.mjs`: **3585 väitettä, kaikki läpi.**
Kaksi lähdetekstilukkoa päivitetty perusteluineen:

* `tests/satelliitti.test.mjs` — `satelliitti-sadekeha` vaaditaan tyylistä
  (radial-gradient, `screen`/`lighten`, alfa ≤ 0,35, liuku nollaan, koko
  24–32 px, ydin ≤ neljäsosa sädekehästä, ei varjoa eikä reunaa) ja
  osuma-alan alaraja 32 px → 44 px. Vanhojen `satelliitti-hehku`- ja
  `satelliitti-rengas`-luokkien kielto säilyy sanatarkkoine perusteluineen.
* `tests/satelliitti-avaruus.test.mjs` — sävyn haarukan alaraja 0xa0 →
  0x90, jotta 0,60 mahtuu; etäisyys mustan kynnyksestä (harmaa >
  kynnys × 4) ja neutraalin harmaan vaatimus ennallaan.

`node tools/build-standalone.mjs` ajettu: `dist/matkakirja.html` (32 556 kt)
syntyy virheittä. Uusia moduuleja ei tullut (muutokset ovat CSS:ssä ja
kahdessa olemassa olevassa moduulissa), joten MODULES-listaan ja sw.js:n
SHELLiin ei tarvinnut koskea. `dist/` ei ole commitissa.

## Oletukset (päätetty itse, ei kysytty)

1. **Sädekehän mitat 28 px / alfa 0,26.** Raamattu antoi haarukan 24–32 px
   ja "matala alfa". 28 px valaisee näkyvästi mutta ei yllä
   naapurikohteeseen; alfa 0,26 nostaa pintaa +6,3 yksikköä eikä lue omana
   kiekkonaan. Lukko sallii koko haarukan, joten säätö on yhden luvun työ.
2. **Ydin 8 px → 5 px.** Hehku on kokoero; jos ydin jäisi 8 px:iin,
   28 px:n sädekehä näyttäisi vain leveämmältä samalta kiekolta. 5 px on
   LISÄYS 15:n vakiokokovaatimuksen sisällä (ruutupikseleitä, ei JS-laskentaa).
3. **Osuma-ala 36 px → 44 px.** Tehtävänannon "osuma-ala ≥ 44 px" luettiin
   kirjaimellisesti. Ala on läpinäkyvä eikä ota napautuksia, joten muutos
   ei vaikuta pelin osumalogiikkaan — se vain yhtenäistää mitan pallon
   pinnasta laskettuun 44 px:n säteeseen.
4. **Globe.gl-kerrosta ei rakennettu** (perustelut yllä): mitattu hyöty
   muutama luminanssiyksikkö, hinta koko merkkiarkkitehtuurin siirto.
   Jos Fable haluaa sen silti, se on oma eränsä.
5. **Vastakoetta ei ajettu** (tehtävänannon rajaus). Uudet väitteet 45a–45c
   ovat kuitenkin rakenteeltaan itse itsensä vastakokeita: sama kehä
   mitataan sädekehä päällä, `normal`-tilassa ja piilotettuna, joten
   mittari näyttäisi punaista, jos sädekehä ei vaikuttaisi mihinkään.

## Ei koskettu

Raamattu, `sarjat.json`, `js/linssit/satelliitti.js`:n chatti,
`js/pallolauta/nostot*.js`, versionumero. Uusia .md-tiedostoja ei syntynyt
muualle kuin `docs/raportit/`.
