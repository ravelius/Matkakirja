# GL-kerros: nimiöt ja merkit pallon omaan WebGL-piirtoon (Karttaseppä + Pelikoodari, 21.9.2026)

Omistajan päätös 21.9.: tuntumatestin jälkeen GL-kerros otetaan työn alle joka tapauksessa.
Tavoite: nimiöt ja merkit liikkuvat bitilleen laattojen mukana samassa renderissä — ei
DOM-layoutia, ei CSS2D-transformeja, ei kerrosten välistä laahausta (E4b:n ennuste jää
tarpeettomaksi). Yhteinen mitta on Google Earthin pehmeys.

## Työnjako
- **Karttaseppä**: piirto ja kamera — GL-kerroksen runko (js/pallonimiot-gl.js), tekstuuriatlas
  ja sen sivutus, instanssoitu piirto (yksi drawcall / atlas), kamera→ruutu samassa
  kehyksessä laattojen kanssa (kytkePallonKehys, pinnanRuutupiste), syvyys ja horisontti,
  kohteiden vaihtuvat koot (kuoren kerroin uniformina), mittarit ja savukkeet.
- **Pelikoodari**: ulkoasu (rasterit tekstuureiksi: fontit, halo, muste, kuvamerkit),
  napautus (osumalaatikot datumista, ei DOMista), sovittelu (ladonta, lukot, kylkivaihdon
  crossfade opacity-attribuuttina), elävän ja poltetun kerroksen tasot ja tyylit.

## Vaiheet
1. **Päivä 1 — runko ja mitta** (K): GL-kerros piirtää N testinimiötä sprite-tekstuureina
   laattojen päälle; savuke mittaa nimiön ja maapisteen eron (0 px vaatimus) ja
   kehysajan; kytkin `?glnimiot=1`, CSS2D ennallaan rinnalla.
2. **Päivä 1–2 — rasterit** (P): nimiön ja merkin rasterointi offscreen-kankaalle
   nykyisillä tyyleillä (sama fontti, halo, muste, kuvamerkit, kuoren skaala), atlas
   päivittyy vain kun teksti/koko/tyyli muuttuu; retina: rasteri dpr-kertoimella,
   piirto pikselitarkasti (ei mipmap-sumua).
3. **Päivä 2 — ladonta ja sovittelu** (P): nykyinen ladonta (kylki, väistö, lukot)
   antaa GL-kerrokselle paikan ja kyljen datumina; kylkivaihto ja piilotus crossfadena
   (opacity-attribuutti), ei tweeniä paikassa.
4. **Päivä 2–3 — napautus** (P + K): osumalaatikot samasta datumista kuin piirto
   (pinnanRuutupiste), kaupunki/nosto/linssimerkki; savukkeet nimikyltti ja nostolaput
   ajetaan GL-tilassa.
5. **Päivä 3 — vaihto ja siivous** (K + P): htmlElementsData tyhjäksi GL-tilassa,
   Laitetestaajan iPad/iPhone-kierros, oletus GL kun mittarit täyttyvät; CSS2D jää
   perääntymistieksi (`?glnimiot=0`) yhden version ajan.

## Mittarit hyväksymiseen (tools/savukkeet/mittaa-sulavuus.mjs + Pelikoodarin sulavuusmittari)
- Nimiön siirtymä maapisteestä liikkeessä: mediaani 0 px, p95 ≤ 0,5 px (nyt CSS2D 0,13 / 0,33
  levossa, liikkeessä kehyksen laahaus).
- Kehysaika 4×: nimiökerroksen osuus < 1 ms/kehys (nyt ladoLevossa + CSS2DRenderer 1–3 ms
  ja layoutin pakotus), ei > 30 ms kehyksiä nimiöistä.
- Muisti: atlas ≤ 2 × 2048² tekstuuria (~32 Mt), ei kasvua panoroinnissa.
- Ulkoasu: kuvavertailu CSS2D vs. GL levossa, ero ≤ 1 px ja sama halo/muste (omistaja).
- Napautus: savukkeet nimikyltti/nostolaput/linssimerkit vihreinä GL-tilassa.

## Riskit
- **SDF vs. sprite**: SDF (msdf) skaalautuu terävänä joka zoomilla mutta vaatii fonttien
  esikäsittelyn ja tekee halosta/kursiivista työtä; sprite (rasteri per nimiö ja koko)
  on täsmälleen nykyinen ulkoasu mutta atlas on rasteroitava uudestaan koon vaihtuessa
  (kuoren kerroin zoomissa). Valinta: sprite + skaalaus ±25 % uniformilla, rasteri
  uudestaan vain portaan vaihtuessa (E2:n kuoren portaat).
- **Retina**: rasteri dpr:llä (2–3×), atlas täyttyy nopeammin → sivutus ja LRU.
- **Fontit**: canvas-rasteri käyttää samoja web-fontteja; fontin latausviive → rasteri
  vasta `document.fonts.ready` jälkeen, sitä ennen CSS2D.
- **Syvyys**: nimiö horisontin takana pois (sama testi kuin laatoilla), reunalla häive.
- **Osumat**: DOM-osumat katoavat → kaikki napautus omalla osumatestillä (Pelikoodari).

## Mitä nykyisestä CSS2D-ladonnasta säilyy
Ladonta-algoritmi (js/fokuskohteet.js väistö, kyljet, lukot, poltetun ja elävän
työnjako), nostoladonnan sopimus ja tiivisteet (js/nostoladonta.js), nimiöiden tyylit ja
rasterifunktiot (js/fokusnosto-symbolit.js piirtää jo kankaalle), sovittelun tila ja
Pelikoodarin E2/E3-kuoren kertoimet. Vaihtuu vain esitystapa: DOM-elementti → atlas-
sprite, ja paikka lasketaan kerran per kehys samassa koukussa kuin laatat.
