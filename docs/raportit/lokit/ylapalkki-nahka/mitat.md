# Yläpalkin nahka — mitat (iPhone, ≤560 px)

Haara `pelikoodari-ylapalkki-nahka`, kaikki mitat Chromiumilla (Google
Chrome for Testing, `--use-gl=angle --use-angle=swiftshader`) pelin
OIKEASSA pelitilassa (pilleri täytettynä: "1840 £ · Päivä 1, aamu"),
ei tyhjällä aloitusruudulla — tyhjä pilleri näyttäisi virheellisesti
pienemmän palkin korkeuden.

## Palkin korkeus

| Leveys | .topbar-korkeus |
|---|---|
| 393 px | 52,6 px (≈ 53 px) |
| 360 px | 52,6 px (≈ 53 px) |
| iPad 834 px (ei nahkaa) | 57 px, ennallaan |

Sama kuin ENNEN nahkaa (mitattu commit `7d3a63070`, origin/pelikoodari-
pillerivalikko, sama pelitila): 52,6 px. Nahka ei siis kasvata palkkia.

## Nahka (assets/ylapalkki/nahka.jpg)

- Lähde: Codexin `nahka-tile.png`, 1290 × 300 px (3×, saumaton vaakaan).
- Tallennettu: **683 × 159 px**, JPEG-laatu 82, ~26 kt. 159 = 53 × 3
  (retinaterävä palkin todelliselle ~53 px:n korkeudelle).
- CSS: `background-repeat: repeat-x; background-position: left bottom;
  background-size: auto 100%` — koko kuva skaalataan palkin korkeuteen,
  ei erikseen rajata tiedostotasolla. Koska tikkausreuna on Codexin
  kuvassa alimmalla ~15 %:lla (generointiohje: "bottom 15 percent of
  the frame"), se säilyy samalla suhteellisella paikalla skaalauksen
  jälkeenkin ja näkyy palkin alareunassa.
- Yksi toistuva laatta on CSS-leveydeltään ≈ 683/159 × 53 ≈ 228 px.

## Keskitummennus (assets/ylapalkki/keski-varjo.png)

- Lähde: 1290 × 300 px. Tallennettu 600 × 140 px PNG (alfa), ~1,2 kt.
- CSS: `background-size: 100% 100%` (venytys sekä leveyteen että
  korkeuteen, background-image-listassa ENSIN eli nahkan päällä).

## Logo (assets/ylapalkki/logo-emboss.png)

- Lähde: Codexin `logo-kohopainatus.png`, 326 × 95 px.
- Tallennettu: 288 × 84 px, indeksoitu PNG (128 väriä, Floyd–Steinberg),
  ~8,7 kt.
- CSS: `.brand-kuva { content: url(...) }` korvaa `assets/logo.png`:n
  VAIN puhelimella (≤560 px). Korkeus ennallaan (`1.75rem` = 28 px,
  sama sääntö kuin ennen) — leveys seuraa uuden kuvan kuvasuhdetta
  (288:84 = 3,43:1) → **≈ 96 px** (ennen 115 px, litteä logo.png).
- Sijainti mitattuna: x = 7,2 px (topbarin oma `padding: 0.3rem`),
  y keskitetty (`.topbar { align-items: center }`). Oikea reuna siis
  x ≈ 103 px riippumatta ruudun leveydestä (logo on kiinteän kokoinen).

## Pilleri (assets/ylapalkki/pilleri-emboss.png)

- Codexin natiivikoko säilytetty sellaisenaan: 302 × 104 px PNG, ~8,9 kt
  — jotta `manifest.json`:n 9-slice-luvut (left/right 53, top/bottom 47)
  käyvät suoraan `border-image-slice`-arvoina ilman uudelleenlaskentaa.
- CSS: `.turn-pill::before` (position: absolute; inset: 0; box-sizing:
  border-box — täysin poissa asettelusta, ei voi kasvattaa pilleriä).
  `border-width: 10px 14px`, `border-image-slice: 47 53 fill`,
  `border-image-repeat: stretch`, `border-radius: 999px` (sama pyöreä
  muoto kuin ennen — rajaa lopputuloksen aina pyöreäksi riippumatta
  border-widthin tarkkuudesta).
- Pillerin oma koko on SISÄLTÖLÄHTÖINEN (raha + päivä + aika), ei
  sidottu kuvan kokoon: mitattu 393 px:llä leveys 179,3 px, korkeus
  42 px (sisältölaatikko; koko elementin korkeus samat 42–46 px kuin
  ennen nahkaa, ei muutosta).

## Keskivyöhyke — EI KOSKE WEBIÄ (koordinaattorin korjaus, toinen kierros)

Codexin manifest.json:n centerSafeAreaPx (385–905 / 1290 eli
29,85–70,15 % leveydestä) on mitoitettu NATIIVIN Dynamic Islandille,
joka nousee palkin PÄÄLLE/lävitse. **Web on eri tilanne**: PWA:n
`.app`-juuri saa yläpaddinginsa `env(safe-area-inset-top)`:sta, joten
koko `.topbar` piirtyy VASTA saaren alapuolelle — saari ei koskaan
peitä eikä leikkaa webin yläpalkkia, ja siksi keskivyöhykkeellä ei ole
webissä sitä merkitystä, joka sillä on natiivin päällekkäispiirrossa.
Alkuperäinen (ensimmäisen kierroksen) testi vaati silti pillerin
pysyvän vyöhykkeen ulkopuolella — vaatimus EI KOSKAAN olisi voinut
toteutua pillerin nykyisellä, natiivin kanssa sovitulla sisällöllä
(kuvake + rahat + "Päivä N, vuorokaudenaika"), eikä sitä lyhennetä
tämän linjauksen mukaan.

Testi (tools/savukkeet/savuke-pillerivalikko.mjs) tarkistaa nyt kolme
web-relevanttia asiaa sen sijaan:

| Leveys | Logo–pilleri-väli | Logo ruudulla | Pilleri ruudulla |
|---|---|---|---|
| 393 px | ≥ 8 px vaadittu, mitattu ~103 px | kyllä | *ks. alla* |
| 360 px | ≥ 8 px vaadittu, mitattu ~69 px | kyllä | *ks. alla* |

Logo ja pilleri eivät koskaan mene päällekkäin (pilleri on aina logon
oikealla puolella, `order: 5`), ja väli on reilusti yli 8 px:n
vähimmäisvaatimuksen molemmilla leveyksillä.

**PILLERIN RUUDULLE MAHTUMINEN ON PERIYTYVÄ, TUNNETTU ONGELMA — EI
NAHKATYÖN AIHEUTTAMA.** Mitattu suoraan commitista `7d3a63070`
(origin/pelikoodari-pillerivalikko HUIPPU ENNEN nahkaa, sama
Chromium, sama avaaPeli-kaava jossa `game.revealToken` antaa
satunnaisen löytörahan): pillerin oikea reuna oli jo TUOLLOIN yli
ruudun reunan 360 px:n leveydellä (mitattu 364,7 px eli 4,7 px
ylivuoto rahasummalla "4170 £"). Pillerin leveys on kokonaan
sisältölähtöinen (kuvake + rahasumma + "Päivä N, vuorokaudenaika"),
eikä sillä ole omaa max-widthiä tai pakotettua lyhennystä — kun
`revealToken` antaa suuren satunnaisen rahasumman (esim. nelinumeroinen
"4230 £"), pilleri voi ylittää ruudun oikean reunan muutamalla
pikselillä sisällöstä riippuen. Tämä on PR #3624:n pillerin
alkuperäistä leveyslogiikkaa, joka on olemassa aivan riippumatta
nahasta — nahka ei muuta `.turn-pill`:n leveyttä laskevaa CSS:ää
mitenkään (padding, fontti, border-width ennallaan; vain
border-COLOR muuttuu läpinäkyväksi ja ::before piirtää kohokuvan
täysin poissa asettelusta). Natiivitiimille: jos pillerin pitää AINA
mahtua ruudulle myös suurilla rahasummilla, korjaus kuuluu pillerin
leveyslaskentaan (esim. max-width tai tiukempi lyhennys), ei
yläpalkin nahkatyöhön.

## Pillerin tekstin kontrasti (mitattu renderöidystä pikselistä)

Tausta näytteistetty pillerin keskialueelta (25–75 % leveydestä,
35–65 % korkeudesta, teksti väliaikaisesti piilotettuna), teksti
`getComputedStyle(.kassa).color`:

| Leveys | Tausta (rgb) | Teksti (rgb) | Kontrasti |
|---|---|---|---|
| 393 px | 29, 23, 18 | 243, 230, 208 | **14,35 : 1** |
| 360 px | 29, 23, 18 | 243, 230, 208 | **14,37 : 1** |

Vaadittu ≥ 4,5:1 — reilusti yli (pillerin kohokuva on tumma joka
kohdasta, ei tarvinnut säätää tekstin väriä).

## Assettien koot yhteensä

| Tiedosto | Koko | Muoto |
|---|---|---|
| nahka.jpg | 26 kt | JPEG (ei alfaa, opaakki) |
| keski-varjo.png | 1,2 kt | PNG (alfa) |
| logo-emboss.png | 8,7 kt | PNG indeksoitu (alfa) |
| pilleri-emboss.png | 8,9 kt | PNG (alfa) |
| **Yhteensä** | **≈ 45 kt** | tavoite < 250 kt ✓ |
