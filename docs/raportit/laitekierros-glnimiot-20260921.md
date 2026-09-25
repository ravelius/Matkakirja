# Laitekierros: koko GL-pino (nimiöt v2014, nostot+nappula v2017/2018)

21.9.2026 n. klo 20.50–21.05 Suomen aikaa. Laitetestaaja (Sonnet).
Vertailu: oletustila (GL, v2018) vs. `?glnimiot=0` (CSS2D-perääntymistie,
sama lippu ohjaa koko GL-pinoa: nimiöt, nostot ja nappula). Ranska z6 ja
Marseille-alue, lisäksi Biskajanlahti (uusi 2026-09-22-pohja, isobaatit).
Kuvakaappaukset: `docs/raportit/kaappaukset/glnimiot-20260921/`.

## LÖYDÖS: GL-nappula piirtyy väärän värisenä (musta), CSS2D oikein

**Toistettu iPadilla JA iPhonella, molemmilla identtisesti.** Pelaajan
väri (Fogg, `#c9a227`, kultainen) näkyy oikein CSS2D-perääntymistiellä
mutta GL-oletustilassa nappula on musta.

| | GL (oletus) | CSS2D (`?glnimiot=0`) |
| --- | --- | --- |
| iPad Pro 11" (M5) | musta | kulta ✓ |
| iPhone 18 Pro | musta | kulta ✓ |

Kuvat: `ipad-nappula-gl-musta.png` vs `ipad-nappula-css2d-kulta.png`
(lähikuva), `ipad-ranska-gl.png`/`-css2d.png` ja
`iphone-ranska-gl.png`/`-css2d.png` (koko näkymä). Varmistettu pysyväksi
(ei siirtymän aikainen väri) 1,5 s asettumisen jälkeen otetulla toisella
kuvalla.

**Epäilty juurisyy** (ei korjattu, ei varmistettu koodista asti pohjaan):
`js/pallolauta/nimiorasterit.js` `rasteroiNappula` liittää nappulan
tilapäisesti suoraan `kotelo`on ja lukee `getComputedStyle`-arvot
(`fill` mukana `NAPPULAN_TYYLIT`-listassa) ennen rasterointia. Jos
pelaajan väri tulee CSS-muuttujasta, joka on asetettu vain CSS2D-kerroksen
omaan käärelementtiin (ei `kotelo`on itseensä), väri ei periydy tilapäiseen
elementtiin ja raakasvg jää oletusmustaksi. Ilmoitettu Fablelle
suoraan (SendMessage, klo n. 20.50) välitettäväksi Pelikoodarille/
Karttasepälle — tuotannossa (v2018) kaikilla pelaajilla juuri nyt.

## Nimiöt ja nostot: GL vs CSS2D — ei eroa (kuten aiemmin iPadilla)

Lähikuvavertailu (`sips --cropOffset`, ei koko kuvan pienoiskoossa vaan
1:1-leikkeet) Ranskan pohjoisosasta (Chandeleur, Chartresin., Le Mansin,
Chambordin linna, Chenonceau): kuvakkeet, värit ja sijainnit
**pikselintarkasti samat** molemmissa tiloissa. Ensimmäinen visuaalinen
arvioni (pienoiskuvista) epäili väri/kuvake-eroa, mutta 1:1-leikkeet
kumosivat sen — vain kuvan pakkaus/koko harhautti. Sama havainto kuin
edellisen session iPad-Marseille-vertailussa.

## Biskajanlahti, uusi pohja (2026-09-22): isobaatit ja merikoristeet

Pyyhkäisin pallolla Bordeaux'sta länteen kohti "…AJANLAHTI"-merkintää
(Biskajanlahti, teksti osin ruudun reunan takana) sekä Katalonian edustan
saarille (samat syvyysrenkaat). Syvyyskäyrät (isobaatit) piirtyvät
siisteinä samankeskisinä renkaina saarten ja rannikon ympärillä, ei
laattasaumoja, ei repeytymiä, sama jälki GL- ja CSS2D-tilassa (merikerros
ei riipu `glnimiot`-lipusta). En saanut simulaattorilla puhdasta
pinch-zoomia syvälle Biskajaan (ks. alla), joten tarkka lähikuva
puuttuu — nykyinen zoomitaso (koko Ranska näkyvissä) riittää kuitenkin
osoittamaan, ettei uusi pohja tuo näkyviä virheitä.

## Tekniset rajoitteet tällä kierroksella

1. **Ei fps/muisti-lukuja iPadilta/iPhonelta.** `ui.pallolauta.sulavuus`
   ja `tila()` vaativat JS-konsolin (aiemmin luettu ilmeisesti Mac Safarin
   Web Inspectorilla simulaattoriin kytkettynä); tämän session
   `mcp__Claude_Code_iOS_Simulator__control`-työkalussa ei ole
   JS-suoritusta, vain kosketus + kuvakaappaus. En toistanut menetelmää,
   koska en löytänyt luotettavaa konsolinlukutietä ilman GUI-Safaria.
   Edellisen session GL-nimiöt-vertailun luvut (iPad: pan 0 px, zoom p95
   0,33 px; iPhone: 60 fps molemmissa tiloissa) ovat siis ainoat
   olemassa olevat — en oleta niiden pätevän sellaisenaan nostoille/
   nappulalle, koska niitä ei ole mitattu erikseen.
2. **Pinch-zoom ei rekisteröidy simulaattorilla** (`touch2_path`),
   sama tunnettu simulaattorin kaksisormi-injektio-rajoite kuin
   21.9.2026 aiemmin dokumentoitu. En siis saanut tarkkaa "Marseille z8"
   -tason lähikuvaa kummallakaan laitteella tällä kierroksella —
   käytin sen sijaan sormivedolla (`swipe`) saavutettavaa zoomitasoa.
3. **Chromium-työpöytä jäi tekemättä.** Browser-paneeli pysyi koko
   session ajan "hidden"-tilassa (`tabs_context`), jolloin
   `requestAnimationFrame` ei suorita lainkaan (todettu jo edellisessä
   sessiossa taustavälilehden kohdalla, nyt sama koko paneelin tasolla).
   Pyysin omistajaa tuomaan paneelin esiin (Cmd+Shift+B) — ei vastausta
   tämän kierroksen aikana. `tools/laitepalvelin.mjs` (lainattu
   Pelikoodarin haarasta `pelikoodari-laitepalvelin`, EI committoitu,
   poistettu työhakemistosta session lopussa) toimi paikallisesti koko
   ajan (portti 8791), joten tekninen valmius on olemassa seuraavalle
   yritykselle.
4. **`mcp__Claude_Code_iOS_Simulator__control`-työkalun `open_url` ja
   ensimmäiset `screenshot`/`inspect`-kutsut epäonnistuivat** heti
   session alussa ("Unable to lookup in current state: Shutdown"),
   vaikka `xcrun simctl` näki laitteen Booted-tilassa. Korjaantui
   `detach`+`attach`-kierroksella; sen jälkeen `screenshot`/`swipe`/
   `touch2_path` toimivat normaalisti. `inspect` ei ollut käytettävissä
   koko session aikana ("Use 'screenshot' instead"). `open_url` jäi
   rikki koko session ajan — käytin `xcrun simctl openurl` suoraan
   Bashista korvaavana reittinä (toimi luotettavasti).

## Ympäristö

- iPad Pro 11" (M5) UDID `503000D1-…`, iPhone 18 Pro UDID
  `1572C658-…`: molemmat käynnistetty ja sammutettu tässä sessiossa,
  Julkaisijalle ilmoitettu päällä/pois.
- Mac Studion kaiuttimet käytössä koko kierroksen ajan
  (`SwitchAudioSource -s "Mac Studio-kaiuttimet"`), palautettu
  Scarlett Solo USB:hen session lopussa.
- Työkansio `laitetestaaja-glnimiot`-testihaarassa (`origin/main`
  v2018 asti, cba7e2f5), ei pushattu — vain paikallinen testaushaara.
  `tools/laitepalvelin.mjs` poistettu, työhakemisto muuten puhdas
  paitsi uusi `docs/raportit/kaappaukset/glnimiot-20260921/`.

## Seuraavalle

1. Pelikoodari/Karttaseppä: korjaa GL-nappulan väri (ks. epäilty
   juurisyy yllä) — tuotantobugi, näkyy kaikilla pelaajilla.
2. Chromium-työpöytämittaus yhä kesken — vaatii Browser-paneelin
   esiin tuonnin (omistaja) tai vaihtoehtoisen mittaustavan.
3. Jos fps/muisti-luvut GL-nostoille/nappulalle halutaan tarkasti,
   tarvitaan joko Mac Safarin Web Inspector kytkettynä simulaattoriin
   (ei tämän session työkaluilla) tai Chromium-reitti.
