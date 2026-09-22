# Lepopiirto-strobovälkkeen todennus iPhone-simulaattorilla

22.9.2026 n. klo 14.26–14.32. Haara `pelikoodari-lepopiirto-webkit`
(dd67641fc). iPhone 18 Pro -simulaattori, laitepalvelimen kautta.
Pelikoodarin pyyntö: todenna korjaus (kirjaston silmukka pysähtyy
kokonaan levossa pauseAnimation/resumeAnimation-parilla).

## TÄRKEÄ RAJOITE ENNEN TULOKSIA

**Automaattinen kaappaus (kuvakaappaus ja `simctl io recordVideo`) ei
todennäköisesti näe tätä bugia lainkaan.** Testasin molempia
menetelmiä sekä uudella korjauksella että `?koe=levovanha`
(vanha, tunnetusti vilkkuva käytös) vertailuksi:

- 8 kuvakaappausta 2 s välein (16 s levossa): tiedostokoot vakaat
  (~3,69 MB kaikki, ei mustia/tyhjiä kehyksiä) MOLEMMILLA asetuksilla.
- Videotallenne (`recordVideo`, ~15–16 s) MOLEMMILLA asetuksilla:
  `ffmpeg blackdetect`-suodin ei löytänyt yhtään mustaa kehystä
  kummastakaan. Kehyskohtainen keskikirkkaus (YAVG) pysyi lähes
  vakiona koko ajan (suurin kehysten välinen muutos 0,26/255 —
  käytännössä nolla) MYÖS `levovanha`-tilassa, jonka pitäisi
  Pelikoodarin oman mittauksen mukaan (24,0× kokoero WebKitin
  sommittelija-kaappauksilla) vilkkua selvästi.

**Tulkinta**: sekä `simctl screenshot` että `simctl recordVideo`
kulkevat todennäköisesti oman sommittelu-/lukupolkunsa kautta, joka ei
altistu samalle ilmiölle kuin näytön oma jatkuva skannaus (sama syy
kuin `preserveDrawingBuffer` EI korjannut ongelmaa Pelikoodarin
mittauksessa — kyse on nimenomaan siitä hetkestä, jolloin WebKit
päättää mitä näyttää, ei siitä mitä puskurissa on jälkikäteen
luettavissa). **En siis voi vahvistaa TAI kumota strobovälkettä tällä
menetelmällä** — tarvitaan joko oikea silmä livenä (simulaattorin oma
ikkuna, ei kaappaus) tai oikea laite.

## Mitä sain silti mitattua

- **Ei visuaalista poikkeamaa** 16 s levon aikana kummallakaan
  asetuksella kuvakaappauksissa eikä videossa (yllä oleva rajoite
  huomioiden — tämä EI ole todiste sulavuudesta, vain ettei mikään
  räikeä poikkeama näy tällä menetelmällä).
- **`pallo.__piirto.tila()` 15 s levon jälkeen, uusi korjaus**:
  piirtoja/3 s = 97 (~32,3 fps levossa) — huomattavasti korkeampi kuin
  Pelikoodarin arvioima 4–15 fps. `syyt.pakko` kasvoi täsmälleen saman
  verran kuin piirrot (506→603), eli lähes kaikki piirrot tulivat
  pakotettuina, ei kamera/tarve-syistä. Epäilen selittäjäksi
  hehkupisteen sykkeen (`pallo.__piirto.tarvitaan()`-kutsu joka
  kehyksessä animaation ajan) — Marseillen näkymässä on aktiivinen
  hehkupiste. Ei tarkistettu näkymässä, jossa hehkupistettä ei ole.
- **Ele (pan)**: yksi sormiveto, kartta siirtyi oikein ja pysyi
  kokonaan näkyvissä välittömästi vedon jälkeen otetussa
  kuvakaappauksessa — ei kartan katoamista havaittavissa tällä
  karkealla tarkkuudella. Zoomia ei testattu (simulaattorin
  kaksisormi-injektio ei rekisteröidy, aiemmin dokumentoitu rajoite).

## Suositus Pelikoodarille

Tätä nimenomaista bugia ei voi luotettavasti todentaa simulaattorin
automaattisella kaappauksella. Vaihtoehdot: a) omistajan oma
tuntumatesti oikealla laitteella (kuten alun perin suunniteltu), b)
jos simulaattoria halutaan käyttää, joku katsoo simulaattorin OMAA
ikkunaa suoraan (ei kaappausta) — tätä en voi tehdä itse, koska
minulla ei ole GUI-katselutyökalua. `__piirto.tila()`-luku (32 fps,
pääosin pakko-syistä) on ainoa aito uusi tieto, joka tästä kierroksesta
saatiin.

## Ympäristö

iPhone 18 Pro -simulaattori, käynnistetty/sammutettu, Julkaisijalle
ilmoitettu. Mac Studion kaiuttimet käytössä, palautettu Scarlett Solo
USB:hen. Harness ja `tools/laitepalvelin.mjs`: EI committoitu,
poistettu. Testihaara `laitetestaaja-lepopiirto` poistettu
paikallisesti. Videot ja kuvakaappaukset `/tmp`:ssä, ei siirretty
kansioon (suuria tiedostoja, ei sisältöarvoa ilman kontekstia).
