# Opus → Fable: iOS-laatat (napa, Välimeri) ja vaaleat laatat — mitattu juurisyy (19.9.2026)

Erä `opus-local-webkit-napa`, Matkakirja Opus local (Mac Studio), 17.28–18.05 Suomen aikaa.
Pohja `origin/claude/bold-ride-vow4ki-v1958` (8538051a, reliefi 20260919b).
Korjausta EI tehty (aikakatto): juurisyy ja korjaussuunnitelma alla.

## 1. Tummansiniset suorakaiteet ja navan rengas Astronautin kamerassa

### Juurisyy (mitattu): reliefipyramidin laatoissa on tasaisia MERIVARI-alueita

Omistajan laitekuvat (napa ja Kreetan eteläpuoli, v1957) näyttävät
TASAISIA tummansinisiä, laattarajoja myötäileviä suorakaiteita
batymetrisen meren päällä. Mittaus:

- **Toistuu Chromiumissa ja WebKitissä samalla tavalla**
  (`savuke-astro-webkit.mjs`, iPhone-kotelo 390 × 844 dpr 3,
  `LAASTARIN_NAKYMA=33.5,25.5,0.35`, kuva
  `docs/raportit/kaappaukset/webkit-napa-20260919/laastari-kreeta-webkit-chromium.jpg`).
  Vika ei siis ole WebKit-kohtainen.
- **Suorakaiteet ovat laastarilaatoissa.** Pilvikuori piilotettuna ne
  pysyvät (`laastari-kreeta-pilvet-pois.jpg`). Linssin näyttämössä ei
  ole laattamoottorin laattoja. Näkyvät pinnat ovat 4k-pohja,
  pilvikuori, ilmakehä, pelimerkit ja 15 laattakerroksen z5-laattaa.
  Laattamittarit: reliefi404 0, varalaatat 0, tasavärit 0 ja jumissa 0,
  eli kaikki laatat latautuivat.
- **Tasainen väri on itse laattakuvissa.** Ämpärin
  `matkakirja/reliefipyramidi/20260918/z5/{22,23,24}/10.webp` sisältävät
  tasaista MERIVARIa (38,78,145): 24,7 %, 18,5 % ja 6,0 % pikseleistä
  (`reliefipyramidi-z5-kreeta.jpg`, suorakaiteet Joonianmerellä ja
  Kreetan eteläpuolella). Luettelo selittää syyn: z7:llä on 9 460
  merilaattaa, joita ei polteta. z6:lla 2 046 ja z5:llä 373 on
  merilaattoja, ja alinäytteistetty taso täyttää merilapsen kohdan
  tasaisella MERIVARIlla. Topografialinssissä se on oikein, koska
  laatasto on koko pinta. Astronautin laastari kuitenkin piirtyy 4k-pohjan
  päälle, ja pohjassa on batymetria, joten tasainen alue näkyy
  suorakaiteena.
- **Sama selittää navan.** Jäämeren z5/z6-laatat ovat suurelta osin
  merilapsia, jolloin syntyy porrastettu tummansininen rengas. Harmaa
  kiekko on 4k-pohjaa yli 85 °N:n, johon pyramidi ei ulotu. Grönlanti
  näkyy ruskeana, koska pyramidissa ei ole jääsekoitusta (`jaapaino`
  on vain pallokuvassa). **Korjaan Jäämeri-raporttini väitteen
  "pyramidi ei tarvitse muutosta": laastaritilassa tarvitsee.**
- **Miksi savuke ei nähnyt vikaa**: laastari syttyy kankaan
  pikselikorkeudesta. iPhone dpr 3 sytyttää sen korkeammalla kuin
  savuke-astro-pallon lohko 47 (dpr 2, korkeus 3, laastari false).

### Korjaussuunnitelma (seuraava erä, noin 45 min)

1. `js/pallolaatat.js`, laatan kangas astronauttitilassa
   (`kerrokset.astronautti`): reliefikuva piirretään ensin
   apukankaalle, jolla MERIVARI (±2) muutetaan alfaksi 0. Merilaatalle
   ei maalata `tausta`-väriä. Sen jälkeen piirretään suodatin ja
   valoliuku kuten nyt. Laastarin materiaalista tulee läpinäkyvä
   (`transparent: true`, `depthWrite` harkiten), jotta 4k-pohjan
   batymetria näkyy aukosta. Tämä poistaa sekä Välimeren suorakaiteet
   että navan renkaan.
2. Grönlanti ja muut jääalueet: laastari rajataan astronautille
   leveydelle ±60° (laattakerroksen kartta-alan leveysraja; rajapinta
   on suunniteltu, poistettu tästä erästä, koska sitä ei kytketty), tai
   pyramidi poltetaan jään kanssa.
3. Vartio savuke-astro-pallo:on: laastari päälle dpr 3 -kotelossa
   (esim. Kreeta, korkeus 0,35), laastarilaattojen kankaalla ei ole
   läpinäkymätöntä MERIVARI-aluetta, ja ruudulla ei ole
   laattasaumaa (vaaka- ja pystyhyppy) merellä.

## 2. Vaaleat laatat Euroopan loitonnuksessa (pelilauta, Sonnet kierros 7)

EI TOISTUNUT Playwright-WebKitillä (webkit-2336, 390 × 844 dpr 3,
Pariisi, maailmatila ja kamera 44 N / 15 E korkeuksilla 0,68 ja 1,16;
`vaaleat-laatat-webkit-eurooppa.jpg`). Lepokerros oli taso 3, 29/29
valmiina, jumissa 0 ja kermattomia 0. Pyydetyt sarjat olivat
pyramidi/2026-09-07a z3/z4/z7, vari/FRA z4/z7 ja nostot/FRA z7.
Laitteen ero on tuotanto-origin ja SW-välimuisti. Ehdotus Sonnetille:
yksityinen ikkuna ja `lepokerros().mittarit()` laitteella (lähetetty
Fablelle klo 17.43).

## Muutokset tässä erässä

- `tools/savukkeet/savuke-astro-webkit.mjs`:
  - `LAASTARIN_NAKYMA=lat,lng,korkeus`
  - laastaritilan mittarit (reliefi404, varoja, tasavareja,
    jumissa, valmiita)
  - `LAASTARIN_LAATAT=1`: laattakohtainen z/sarake/rivi, kankaan
    keskiväri ja hajonta; muut näkyvät verkot materiaaleineen; kaappaus
    pilvikuori piilotettuna ja palautettuna
- Kaappaukset `docs/raportit/kaappaukset/webkit-napa-20260919/`.

## Jäi tekemättä

- Korjaus (suunnitelma yllä).
- Nostokortti (erä 2) ja zoomikatto (erä 3). Nostokortista koodihavainto:
  oikea tumma paneeli on seuraava-nuolen 24 %:n osuma-alue
  (`.nostosarja-kuvanuoli`), todennäköisesti iOS:n tahmea :hover tai
  :active. Pulun ja safe-arean päällekkäisyys on mittaamatta.
- Nimiöiden päällekkäisyys (Niilin suisto / Suezin kanava / Kairo
  yöllä) kirjattu, ei korjattu.
