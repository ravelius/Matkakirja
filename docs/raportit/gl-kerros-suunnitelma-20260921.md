# GL-kerros: nimiöt ja merkit pallon omaan WebGL-piirtoon (Karttaseppä + Pelikoodari, 21.9.2026)

Omistajan päätös 21.9.: tuntumatestin jälkeen GL-kerros otetaan työn alle joka tapauksessa. Tavoite:
nimiöt ja merkit liikkuvat bitilleen laattojen mukana samassa renderissä — ei DOM-layoutia, ei CSS2D-
transformeja, ei kerrosten välistä laahausta (E4b:n ennuste jää tarpeettomaksi). Mitta: Google Earthin pehmeys.

## Työnjako
- **Karttaseppä**: piirto ja kamera — GL-kerroksen runko (js/pallonimiot-gl.js), tekstuuriatlas
  ja sen sivutus, instanssoitu piirto (yksi drawcall / atlas), kamera→ruutu samassa
  kehyksessä laattojen kanssa (kytkePallonKehys, pinnanRuutupiste), syvyys ja horisontti,
  kohteiden vaihtuvat koot (kuoren kerroin uniformina), mittarit ja savukkeet.
- **Pelikoodari**: ulkoasu (rasterit tekstuureiksi: fontit, halo, muste, kuvamerkit),
  napautus (osumalaatikot datumista, ei DOMista), sovittelu (ladonta, lukot, kylkivaihdon
  crossfade opacity-attribuuttina), elävän ja poltetun kerroksen tasot ja tyylit.

## Vaiheet
1. **Päivä 1 — runko ja mitta** (K): GL-kerros piirtää N testinimiötä sprite-tekstuureina laattojen
   päälle; savuke mittaa nimiön ja maapisteen eron (0 px) ja kehysajan; kytkin `?glnimiot=1`, CSS2D rinnalla.
2. **Päivä 1–2 — rasterit** (P): nimiön ja merkin rasterointi offscreen-kankaalle nykyisillä tyyleillä
   (fontti, halo, muste, kuvamerkit, kuoren skaala); atlas päivittyy vain kun teksti/koko/tyyli muuttuu;
   retina dpr-kertoimella, piirto pikselitarkasti (ei mipmap-sumua).
3. **Päivä 2 — ladonta ja sovittelu** (P): nykyinen ladonta antaa paikan ja kyljen datumina;
   kylkivaihto ja piilotus crossfadena (opacity-attribuutti), ei tweeniä paikassa.
4. **Päivä 2–3 — napautus** (P + K): osumalaatikot samasta datumista kuin piirto (pinnanRuutupiste);
   savukkeet nimikyltti ja nostolaput GL-tilassa.
5. **Päivä 3 — vaihto ja siivous** (K + P): htmlElementsData tyhjäksi GL-tilassa, Laitetestaajan
   iPad/iPhone-kierros, oletus GL kun mittarit täyttyvät; CSS2D perääntymistie (`?glnimiot=0`) yhden version.

## Mittarit hyväksymiseen (mittaa-sulavuus.mjs + sulavuusmittari)
- Nimiön siirtymä maapisteestä liikkeessä: mediaani 0 px, p95 ≤ 0,5 px (CSS2D nyt 0,13 / 0,33 + laahaus).
- Kehysaika 4×: nimiökerros < 1 ms/kehys (nyt ladoLevossa + CSS2DRenderer 1–3 ms + layoutin pakotus).
- Muisti: atlas ≤ 2 × 2048² (~32 Mt), ei kasvua panoroinnissa. Ulkoasu: kuvavertailu CSS2D vs. GL
  levossa ≤ 1 px, sama halo/muste (omistaja). Napautus: nimikyltti/nostolaput/linssimerkit vihreinä.

## Riskit
- **SDF vs. sprite**: SDF skaalautuu terävänä mutta vaatii fonttien esikäsittelyn ja tekee halosta työtä;
  sprite on täsmälleen nykyinen ulkoasu, mutta atlas rasteroidaan uudestaan koon vaihtuessa. Valinta:
  sprite + skaalaus ±25 % uniformilla, rasteri uudestaan vain portaan vaihtuessa (E2:n kuoren portaat).
- **Retina** (rasteri dpr:llä, atlas täyttyy → sivutus ja LRU); **fontit** (rasteri vasta fonts.ready,
  sitä ennen CSS2D); **syvyys** (horisontin takana pois, reunalla häive); **osumat** (DOM-osumat katoavat
  → kaikki napautus omalla osumatestillä, Pelikoodari).

## Mitä nykyisestä CSS2D-ladonnasta säilyy
Ladonta (väistö, kyljet, lukot; nimet.js, nostot.js, sovittelu.js), nostoladonnan sopimus,
rasterifunktiot (fokusnosto-symbolit.js piirtää jo kankaalle) ja E2/E3:n kuoren kertoimet.
Vaihtuu vain esitystapa: DOM-elementti → atlas-sprite, paikka kerran per kehys laattojen koukusta.

## Pelikoodarin täsmennykset (ulkoasu, napautus, sovittelu)
- **Rasterit**: nostot ovat jo rastereita (asetaRasteri: avain resepti|porras, välimuisti) — atlas syö
  saman avaimen ja kuvan, ikoni ja nimiö erillisinä spriteinä (erillinenNimio). Kaupunkien nimet
  rasteroidaan canvasille KARTTANIMI_FONTILLA ja halolla (strokeText+fillText), avain
  teksti|koko|tyylitys|dpr; vasta `document.fonts.ready`; portaat 25 %.
- **Kuoren skaala**: `--nimiokerroin` → uniform joka kehys (ladonnanMitta/liukuvaNimiokerroin,
  ennustetusta korkeudesta E4b), katto per sprite attribuutteina a/b (= --nimio-a/-b), lukon dx/dy/koko samalla.
- **Napautus**: nimet.js `osuma(p)` ja nostot `nostonLaatikko`/musteosat tulevat jo datumista — lahinMerkki
  ja musteeseenOsunut pysyvät; DOM-luennat (merkit.laatikot('peli'), kyltinPiirretty) → datumilaatikot
  pinnanRuutupisteestä. Linssimerkit (kellot, liput, parvet, aikajana) jäävät CSS2D:hen vaiheissa 1–3.
- **Sovittelu**: lukot ja hystereesi ennallaan; kylkivaihto ja piilotus = kaksi spriteä, opacity 1→0 / 0→1
  180 ms per-instanssi attribuuttina (aika uniformina), ei tweeniä paikassa; poistuva häipyy 250 ms.
- **Hyväksyntä lisäksi**: nimiot-vakaat, nimiot-sulavat (ennustevirhe 0), pallo-nostolaput,
  ranskan-nostot-lukossa ja hiomassa-linssi vihreinä GL-tilassa.
