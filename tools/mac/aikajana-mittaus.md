# Macin Safarin Web Inspector -aikajana: ohje (Laitetestaaja 22.9.2026)

Ei STP, ei iPhone — sama Mac, sama GPU-prosessi jota omistaja käyttää.
Tarkoitus: nähdä kehysten jako skripti/asettelu/maalaus/komposiittori/tyhjä
oikean vedon aikana, kun `?koe=`-mittarit eivät riitä (Kehykset-näkymä).

## Todettu tässä sessiossa

- **CGEvent-veto (leftMouseDown/Dragged/Up) EI liikuta karttaa**, vaikka
  klikkaus ja hover TOIMIVAT (tooltip ilmestyy, napit reagoivat). Kokeiltu
  hidas mouseMoved-sarja ennen mousedownia (Fablen ehdotus) — silti
  `ui.pallonSyote.loki` ja passiivinen pointer-kuuntelija näkivät NOLLA
  tapahtumaa koko vedon ajan, vaikka pikselit ruudulla näyttivät hieman
  muuttuvan (todettu harhaksi — todennäköisesti nimiöiden/kompassin
  asettelu, ei kameran liike). **Aito veto vaatii siis oikean käden.**
- **Web Inspectorin avaus ja aikajanatallennus onnistuvat kokonaan
  Kehitys-valikon komennoilla**, ei tarvitse osua pieniin nappeihin:
  - `Kehitys → Aloita aikajanatallennus` avaa Web Inspectorin, siirtyy
    Aikajanat-välilehdelle JA käynnistää tallennuksen yhdellä komennolla.
  - Sama kohta muuttuu tallennuksen aikana muotoon
    `Kehitys → Lopeta aikajanatallennus`.
  - Näitä voi ajaa System Eventsillä luotettavasti (accessibility-klikkaus
    valikkoon, ei CGEvent-koordinaattiklikkaus).
- **Kehykset-alavälilehden klikkaus EI onnistunut CGEventillä** (pieni
  toggle "Tapahtumat | Kehykset" heti Aikajanat-välilehden alla,
  ikkunan koosta riippuvassa kohdassa — tässä ajossa n. x=130, y=898
  ikkunan ollessa täysleveä ilman sivupalkkia). Tämä yksi klikkaus jää
  ihmiselle.

## Kulku

1. Avaa sivu Macin OMASSA Safarissa (ei STP): tuotanto-osoite tai
   `tools/mittaus/seuraamisvirhe-palvelin.mjs`. VARMISTA `?luonnollinen=1`
   EI ole päällä (tämä ohje ei tarvitse sitä eikä sen automaattista
   tallennusta — pelkkä pelisivu riittää).
2. Aja tämä yhdellä osascript-komennolla (avaa inspector + aloittaa
   tallennuksen samalla):
   ```bash
   osascript -e 'tell application "Safari" to activate
   delay 0.3
   tell application "System Events"
     tell process "Safari"
       click menu item "Aloita aikajanatallennus" of menu 1 of menu bar item "Kehitys" of menu bar 1
     end tell
   end tell'
   ```
3. **Ihminen klikkaa "Kehykset"** (Frames) -sanaa "Tapahtumat"-sanan
   vieressä, heti Aikajanat-välilehden alapuolella. Käytä screenshotia
   tarkistamaan tarkka kohta ennen klikkausta, koska ikkunan koko ja
   sivupalkin tila siirtävät sitä.
4. **Ihminen sulkee "Näyttökuvat"-aikajanan** (rivi listassa "Käytössä
   olevat aikajanat", punainen ympyräkuvake) klikkaamalla sen
   valintaruutua pois — kuvakaappaukset lämmittävät laitetta turhaan.
5. **Ihminen vetää kartalla oikealla hiirellä/trackpadilla ~10 sekuntia**
   (sama liike jota omistaja on kuvannut tökkiväksi).
6. Pysäytä tallennus:
   ```bash
   osascript -e 'tell application "Safari" to activate
   delay 0.3
   tell application "System Events"
     tell process "Safari"
       click menu item "Lopeta aikajanatallennus" of menu 1 of menu bar item "Kehitys" of menu bar 1
     end tell
   end tell'
   ```
7. Kaappaa Kehykset-palkit Macin ruudulta (vienti ei tarvita):
   ```bash
   screencapture -x /tmp/aikajana-kehykset.png
   ```
   Lue kuva `Read`-työkalulla ja katso palkkien värijako (skripti=
   keltainen, asettelu=violetti, maalaus=vihreä, komposiitti=turkoosi,
   tyhjä=harmaa — Safarin oma väritys, tarkista legenda kuvasta).

## Avoin

Vaihe 3 ja 4 (kaksi pientä klikkausta) ovat ainoat, joita en saanut
CGEventillä toimimaan tässä sessiossa — sama ilmiö kuin STP:n Timelines-
kokeilussa aiemmin tänään pienten kontrollien kanssa (ison valikkokomennon
klikkaus toimii, pienen napin ei). Jos joku muu istunto saa CGEventin
toimimaan myös pienille kontrolleille, ilmoita — automaatio olisi
tällöin täydellinen.
