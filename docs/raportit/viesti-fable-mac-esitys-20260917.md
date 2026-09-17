# Viesti Fablelle: savuke-ihmisen-esitys kuormassa (17.9.2026 klo 21.30)

## Juurisyy

Mainin Mac-ajossa (Actions 35237332631, SAVUKE_RINNAKKAIN=6) viisi punaista
olivat kaikki sama vika: **kamera ei koskaan noussut avaruuteen**. Mitattu
lukema oli korkeus 0,179 / 0,417 odotetun 300 (AVARUUDEN_KORKEUS) sijaan —
0,143 on juuri Ateenan `maanZoomiraja`, eli pelaajan oma zoomikatto.

Syy oli savukkeessa, ei pelissä: käynnistys odotti **seinäkelloa**
(`waitForTimeout` 2500 + 2500 + 1200 + 1500 + 200 ms). Rinnakkaiskuormassa
peli ei ehtinyt niiden sisällä yhtä pitkälle, ja Käynnistä-nappia
painettiin ennen kuin `ui.pallonInstanssi` oli pystyssä. Silloin esityksen
`avaaKaukaisuus` palaa hiljaa epätotena (js/linssit/ihmisen-matka-esitys.js),
avaus alkaa mustasta ja kertoja lukee normaalisti, mutta kameraa ei viedä
avaruuteen. Kaikki viisi punaista (MUSTA ALKU, TÄHDET, AFRIKKA-SANA, TAUKO,
ZOOMI) mittaavat juuri sitä korkeutta. "kulunut 8673 vs hetki 14186" oli siis
oikein — luenta eteni ennallaan; vain kamera puuttui.

**Peliä ei muutettu.** Aito pelaaja painaa nappia vasta kun pallo on ruudulla,
joten tilanne on savukkeen oma kilpajuoksu. (Havainto Fablelle: `avaaKaukaisuus`
palauttaa `false` hiljaa — jos halutaan varmistus myös pelissä, se olisi oma
työnsä ja vaatisi versionoston.)

## Korjaus (vain tools/savukkeet/savuke-ihmisen-esitys.mjs)

- Jokainen käynnistysodotus on nyt **ehto pelin omasta tilasta**: Aloita-nappi
  olemassa → `game.pack` ladattu → `ui.pallolauta` → ja uutena vartio
  `ui.pallonInstanssi.pointOfView` + `controls()` + `pallolauta.zoomirajat`
  ennen Käynnistä-painallusta.
- MUSTA ALKU: 200 ms:n odotus pois. Nappi painetaan `evaluate`-kutsussa, joka
  lukee kameran korkeuden **samassa vuorossa** (avaus on synkroninen), ja
  esitys pysäytetään esityksen omaan tilaan `mustaPaalla === true`
  (`odotaJaPysayta`). Väite lisää ehdot `korkeusHeti > 25` ja `palloValmis`,
  joten juurisyy näkyy suoraan FAIL-rivillä.
- TAUKO/JATKA: kiinteä 3 s:n odotus korvattu odotuksella, joka päättyy kun
  luenta on edennyt JA korkeus laskenut (katto 20 s).
- PORTTI luetaan ympäristöstä (oletus 8747) kuten savuke-topografialinssissa,
  jotta rinnakkaisajo onnistuu.

## Mittaus

Kuorman alla (`savuke-astro-valokuva` 180/180 ja `savuke-topografialinssi`
PORTTI=8822 38/38 samaan aikaan taustalla), PORTTI=8820, Mac Studio:

- Koko esitys: **20/23 läpi**. Kaikki viisi entistä punaista vihreinä
  (korkeus 300 mustassa, tähdissä ja zoomin lähdössä; zoomi 299,997 → 32,9).
- Sarjan oma portti `VAIN_AVAUS=1` (sarjat.json): **13/13 läpi**.
- `node --test tests/*.test.mjs`: **# pass 3572, # fail 0** (3585 testiä).

Kolme punaista koko ajossa ovat avausosan **ulkopuolella** eivätkä kuulu
sarjan porttiin (VAIN_AVAUS=1): PULU (`puluja 0`), LOPPU (kameran leveys 2026,
`esitysLuokka false`) ja KÄRKI KUVASSA (osuus 0,38). Näitä ei ole tässä
haarassa kalibroitu — jos ne halutaan mukaan, ne ovat oma tehtävänsä.

## Oletukset

- Sarjat.jsonia ja Raamattua ei koskettu (ohje).
- Kuormaksi valittiin astro-valokuva ja topografialinssi, koska ne ovat
  pallopohjaisia ja raskaita; ne ajettiin loppuun eikä jätetty käyntiin.
