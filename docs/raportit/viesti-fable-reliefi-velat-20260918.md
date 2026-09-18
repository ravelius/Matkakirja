# Viesti Fablelle: reliefipyramidin kolme velkaa (18.9.2026, Opus-agentti)

Erä: Raamattu ASTRONAUTIN KAMERA LISAYS 16, kohdat 48–49, TILA 3
"AVOINNA omiksi eriksi". Haara `claude/bold-ride-vow4ki-reliefi-velat`
(pohja `claude/bold-ride-vow4ki` = main v1944 + Raamattu). Versiota EI
nostettu, PR:ää ei avattu.

Ympäristö: Mac Studio, node 22.23.2, Playwright
`node_modules/playwright/index.js`, Chromium
`ms-playwright/chromium-1234`, WebKit `ms-playwright/webkit-2336`,
390 × 844 dpr 2, laatat ämpäristä
(`media.matkakirja.app/matkakirja/reliefipyramidi/20260918/`) Noden
route-välityksellä. Mittari: `tools/savukkeet/savuke-topografialinssi.mjs`
(uusi rajaus `VAIHE=avaus`, uusi lippu `--webkit`).

---

## 1. WEBKIT-LUVUT VS. CHROMIUM

`--webkit`-lippu lisättiin savukkeeseen samalla kaavalla kuin
`savuke-kerma-reuna.mjs`:ssä (`MOOTTORI`). Kaksi asiaa eroaa ja
molemmat ovat moottorin omia: CDP:tä ei ole (kaappaus ja avauksen
kirkkaussarja Playwrightin omalla `page.screenshot`illa, pieni keskiö
tiheään) eikä `performance.memory`:a ole (JS-kasa kirjataan nullina,
ei arvata).

| mitta | Chromium | WebKit |
| --- | --- | --- |
| napautuksesta 1. reliefikehykseen | **64 ms** | **80 ms** |
| 1. reliefilaatta haettu → purettu | 3 → 50 ms | 6 → 65 ms |
| 1. laatta valmis (tekstuuri) | 50 ms | 65 ms |
| seepiapohjan laattapyyntöjä linssin aikana | 0 | 0 |
| avauksen maksimikirkkaus vs. vakiintunut | 114,9 vs. 113,9 (paluu alas 8,7) | 176,0 vs. 93,1 (paluu alas 156,7) |
| paljaan kartan näytteitä avauksessa | 0 / 83 | 0 / 53 |
| laattakerroksen GPU-tavut ennen → jälkeen | 33 554 424 → 33 554 424 | 33 554 424 → 33 554 424 |
| three-tekstuureja ennen → jälkeen | 49 → 49 | 318 → 318 |
| JS-kasa ennen → jälkeen | 258 → 258 Mt | — (ei `performance.memory`) |
| sivuvirheitä | 0 | 0 |
| savuke (VAIHE=avaus) | 11/13 | 10/13 |

**Vikaa WebKitissä ei paljastunut siinä, mitä tehtävä epäili.** Laatat
piirtyvät, ketju on samaa luokkaa kuin Chromiumilla, seepiaa ei haeta,
muisti ei kasva avauksessa eikä OffscreenCanvas-eroa (kerman v1943:n
juurisyy) näy: kontrastimittauksen luvut ovat moottoreilla käytännössä
identtiset (2 620 vs. 2 617 mustepikseliä, mediaanit 4,19/4,74 vs.
4,22/4,74), eli sama kangas kokoaa samat pikselit. `js/reliefipyramidi.js`
ei siis tarvinnut korjausta.

**Yksi WebKit-luku on punainen: välähdysvartio.** Maksimikirkkaus 176,0
vs. vakiintunut 93,1, paluu ylhäältä alas 156,7 (raja 15). Chromiumilla
sama väite on vihreä (8,7). **Tämä on mittarin eikä pelin luku**, ja
sanon sen suoraan, koska rajan siirtäminen ilman perustelua olisi
mittarin sovittamista tulokseen:

* Chromium kaappaa kompositorin kehykset (`Page.startScreencast`) eli
  sen, mikä ruudulla oikeasti on. WebKitiltä kaapataan
  `page.screenshot`illa, joka jonottaa sivun oman työn taakse ja antaa
  avauksen alusta muutaman kehyksen ennen linssin kerrosten riisumista
  — kirkas pelikartta ehtii sarjaan, vaikka pelaaja ei sitä näkisi.
* Kehyksiä on WebKitillä 31 (kattavuus 96 %) vs. Chromiumin 61, eli
  sarja on harva ja huippu osuu yhteen näytteeseen.
* Sama väite mittaa samaa asiaa oikein Chromiumilla, ja muut WebKitin
  kolme avausväitettä (paljas kartta 0/53, jäänteet 0, ei sivuvirheitä)
  ovat vihreitä.

Ehdotus Fablelle: joko a) WebKitillä kirkkausväite kirjataan INFOna ja
vartijaksi jää paljas kartta + jäänteet, tai b) WebKitin kehyssarja
otetaan sivun omasta piirtokoukusta (`gl.readPixels`,
`preserveDrawingBuffer`) eikä kaappauksesta. Kumpikaan ei mahtunut
tähän erään.

## 2. NIMIÖN KONTRASTI (WCAG 1.4.3, tavoite 4,5:1)

Mitta on uusi ja se on savukkeessa (`KONTRASTI`). Se kokoaa pelin
OMISTA laatoista ja pelin OMILLA vakioilla (`NIMION_HALO`,
`NIMION_HALO_PX`, `NIMION_HALO_VETOJA` viedään nyt
`js/pallolaatat.js`:stä, ei kopioituja lukuja) saman kompositiotuloksen
kuin laattakone: reliefilaatta, kolme–neljä halovetoa, nimiölaatta.
Taso valitaan sieltä, missä on sekä reliefi- että nostotaso (z7),
kahdeksan laattaa. Jokaisesta mustepikselistä katsotaan sen ympäristön
vaalein tausta 3 px:n säteellä — eli se reunus, jota vasten kirjain
luetaan — ja reliefin oma kirkkaus lajittelee pikselit kolmanneksiin.

| | ennen (0,92 × 3 vetoa) | jälkeen (täysi × 4 vetoa) |
| --- | --- | --- |
| tummin kolmannes, mediaani | 3,62 | **4,19** |
| vaalein kolmannes, mediaani | 4,41 | **4,74** |
| otos | 1 314 px | 2 620 px |

Muutos: `NIMION_HALO` `rgba(247,241,224,0.92)` → `rgb(247,241,224)` ja
`NIMION_HALO_VETOJA` 3 → 4. Sävy pysyy pergamenttina (valkoinen
reunus lumirajalla olisi näkymätön), leveys pysyy 3 px:ssä.

**TILA: vaalein kolmannes läpi (4,74 ≥ 4,5), tummin EI (4,19 < 4,5).**
Savukkeen väite jää siis punaiseksi tummimmalle reliefille. En jatkanut
säätöä, koska aikakatto tuli vastaan ja koska seuraava askel on valinta,
joka kuuluu Fablelle: leveämpi reunus (`NIMION_HALO_PX` 3 → 4–5, joka
alkaa näkyä laatikkona pienessä kirjasimessa) vai nostotason
UUSINTAPOLTTO vaaleammalla musteella (oikea korjaus, mutta oma eränsä).
Suositus: uusintapoltto.

Kaksi huomiota mitasta, jotta luku luetaan oikein:

* **Mitta on mediaani eikä pienin**, ja se on mitattu valinta.
  Pienin arvo on molemmilla moottoreilla 1,04, eikä se tule nimiöstä
  lainkaan vaan VIIVAMERKKIEN umpinaisista sisuksista: sama muste latoo
  nostotasolle sekä kirjaimet että pienen vuori- ja tassumerkin, ja
  paksun merkin sisällä lähin ei-mustepikseli on itsekin mustetta.
  Reunus ei voi eikä sen pidä loistaa merkin sisään, ja WCAG 1.4.3
  koskee tekstiä. `pienin` jää lokiin.
* **Musteen raja on alfa ≥ 200 eikä täysi peittävyys.** Kokeilin
  alfa ≥ 250:tä: koko z7-otokseen jäi VIISI pikseliä, koska poltettu
  kursiivi on siellä hiusviivaa. Viisi pikseliä ei ole mitta.

## 3. LINSSIKETJU — EI 700 ms VAAN 64 ms

Ketjulle tehtiin oma loki (`js/reliefipyramidi.js`
`aloitaLinssiketju` / `merkitseLinssiketju` / `linssiketjunLoki`),
koska avaus kulkee kolmen moduulin läpi eikä yksikään näe muiden
osuutta. Kello käynnistyy NAPAUTUKSESTA (`js/ui.js valitseLinssi`) eikä
siitä, milloin `sytytaLinssi` pääsee ajoon. Loki on myös kentällä:
`window.matkakirja.ui.linssiketju()`.

Profiili (Chromium, 390 px, luenta käynnissä, Ateena):

```
sytyta 0 → linssit-ladattu 0 → lataa 0 → kokoa-ennen 1 → laatta-haku 3
→ kokoa 4 → peite 5 → pallolle 5 → laatta-kuvat 50 → laatta-valmis 50
→ laatta-ruudulla 64
```

WebKit: `… laatta-haku 6 → kokoa 7 → peite 7 → pallolle 7 →
laatta-kuvat 65 → laatta-valmis 65 → laatta-ruudulla 80`.

**Tavoite < 400 ms täyttyy ilman yhtään muutosta ketjuun, ja
Raamatun kohta 49:n "< 300 ms" täyttyy myös WebKitillä.** Koko
await-ketju napautuksesta laattakerroksen herätykseen (`kokoa`) on
4–7 ms; tumma peite on ruudulla 5 ms:n kohdalla eli ennen kuin mitään
ehtii välähtää; loput 45–60 ms on laatan nouto + `createImageBitmap`,
ja viimeiset 7–15 ms on vientijonon yksi rAF-kehys
(`LAATTAKERROS_TEKSTUUREJA_PER_KEHYS = 1`).

Eli **erän 3 raportoima ~700 ms ei toistu enää tällä koodilla.** Se oli
mitattavissa ennen erän 4 korjauksia: silloin `lataa()` purki 52
megapikselin Miller-kuvan ennen kuin `pallolle()` pääsi ajoon (nyt
`if (pallolla && reliefipyramidiPaalla()) return;`) ja laattakerros
odotti kameran liikettä (nyt `lauta.lepokerros().kokoa()`). Ketjuun ei
siis koskettu, eikä muiden linssien (satelliitti, ihmisen matka,
astronautti) koodipolkua muutettu millään tavalla — lisätyt merkinnät
ovat `void`-kutsuja, jotka eivät palauta eivätkä odota mitään.

**Yksi varaus, joka kuuluu kirjata.** Savuke ajaa `await
ui.lataaLinssit()` ennen napautusta, joten `linssit-ladattu 0` mittaa
LÄMPIMÄN moduulin. Kylmässä pelissä (laukku avataan ensimmäistä kertaa)
tuo vaihe on linssimoduulien dynaaminen tuonti, eikä sitä mitattu tässä
erässä. Jos omistajan kokemus on yhä hidas, se on se vaihe, jota
seuraavaksi mitataan — ja loki kertoo sen nyt itse.

---

## MUUTETUT TIEDOSTOT

* `js/reliefipyramidi.js` — linssiketjun loki (uusi osio tiedoston
  loppuun). Ei muutoksia laataston omaan logiikkaan.
* `js/ui.js` — ketjun kello `valitseLinssi`ssä, vaihemerkinnät
  `sytytaLinssi`ssä, `ui.linssiketju()`.
* `js/linssit/topografia.js` — vaihemerkinnät (`peite`, `kokoa`).
* `js/laattapyramidi.js` — `pyramidinLinssiketju` (sama ovi kuin
  luettelolla ja osoitteilla; pallo ei tuo `reliefipyramidi.js`:ää itse).
* `js/pallolaatat.js` — vaihemerkinnät laatan noudossa ja viennissä;
  halovakiot vietäväksi; **NIMION_HALO 0,92 → täysi, VETOJA 3 → 4**.
* `tools/savukkeet/savuke-topografialinssi.mjs` — `--webkit`,
  `VAIHE`-rajaus, CDP:n varareitit, linssiketjun tuloste + väite
  (< 400 ms), muistin luenta ennen/jälkeen, kontrastimittaus + kaksi
  väitettä.
* `tests/pallolaatat.test.mjs` — kaksi lähdevartiota tuoreeseen muotoon
  (tuontilista ja vientihaaran lohko). Ei uusia testejä.

## SAVUKKEEN TILA

`VAIHE=avaus` (kaksi istuntoa, avaus + vastakoe):

* Chromium **11/13** — punaisena vain kontrasti tummimmalla ja
  vaaleimmalla; viimeisin ajo oli ennen mitan vaihtoa mediaaniin, jonka
  jälkeen vaalein menee läpi ja tummin jää (4,19 < 4,5).
* WebKit **10/13** — sama kontrasti + välähdysvartio (ks. kohta 1).

Koko savuketta (`VAIHE` pois, neljä lisäistuntoa: kaksi ruutua +
vastakokeet) EI ajettu tässä erässä aikakaton takia. Ne väitteet
koskevat tarkkuutta ja vanhaa varapolkua, joihin ei koskettu.

`node --test tests/*.test.mjs`: **# pass 3625 / # fail 0** (13 skipped).
`node tools/build-standalone.mjs`: ok (32 652 kt).

## VIEREISET HAVAINNOT (EI KORJATTU)

1. `tools/savukkeet/mittaa-reliefipyramidi.mjs` ei osaa ajaa laattoja
   ÄMPÄRISTÄ: jos `RELIEFIPYRAMIDI_KANSIO` on tyhjä, route vastaa
   jokaiseen reliefilaattaan 404:llä ("avomeri"), eikä mittari siis
   toimi lainkaan viennin jälkeisessä maailmassa. Yhden rivin ehto
   (`if (KANSIO && …)`) korjaisi sen.
2. `LAATTAKERROS_TEKSTUUREJA_PER_KEHYS = 1` maksaa avauksessa
   7–15 ms ensimmäiselle laatalle ja noin 12 kehystä koko näkyvälle
   ikkunalle. Perustelu (yksi `initTexture` = 3,0 ms p50) on mitattu ja
   pätevä, mutta linssin AVAUKSESSA ruutu on tumman peitteen alla eikä
   kehysbudjettia ole — avaukselle voisi sallia suuremman erän.
3. Nostotason muste on poltettu seepiaa varten; halo on laastari.
   Uusintapoltto vaaleammalla musteella olisi oikea korjaus kohtaan 2.

## MITÄ JÄI (UUSI ERÄ)

* Nimiön kontrasti tummimmalla reliefillä 4,19 → ≥ 4,5 (leveämpi reunus
  tai nostotason uusintapoltto — Fablen valinta).
* WebKitin välähdysvartio: kehyssarja sivun omasta piirtokoukusta tai
  väite INFOksi WebKitillä.
* Kylmän session `lataaLinssit`-vaihe mittaamatta.
* Koko savuke (kaikki kuusi istuntoa) ajamatta molemmilla moottoreilla.
