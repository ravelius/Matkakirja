# Pelikoodarin luovutus 27.9.2026 klo 09.3x (konteksti 81 %, Fablen käsky)

Jatkoa luovutukselle `viesti-pelikoodari-luovutus-20260927.md`. Kaikki alla oleva on pushattu.

## 1. JUNASSA / AUKI (web)
- **#3384 progressiivinen lukijaääni** (v2307, haara `pelikoodari-puhevirta` 7cd5dd5e7), Fable kuitannut, Julkaisijan junassa.
  `js/puhevirta.js` (mp3-kehysjäsennin + segmenttidekooderi, esirulla 3 + jälkirulla 1 kehys → sauma bittitarkka
  Chromium + WebKit), `js/puhe.js` (puhepiiri 24 kHz, pala soi segmentti kerrallaan, käynnissä oleva haku jaetaan,
  alkuvara 0,45 s, `ended` kertalippu). 1. ääni: 2 400 mrk ei ääntä 25 s:ssa → 1,75 s; lehtisivu 6,6 → 1,64 s;
  Pulu 2,26 → 1,72 s. Kuulonäytteet `/Users/Shared/Claude/proto-3d/lokit/puhevirta/`. Versio v2307 törmää #3385:n kanssa.
- **#3380 tukilaattojen hakusilmukka** (v2303, `pelikoodari-tukisilmukka`) junassa ennen #3371:tä.
- **#3378 Z10-raportti** (docs). Suositus hyväksytty: EI zoomikaton nostoa nyt; laattakaton nosto (työpöytä 48→64,
  puhelin 2× z10-alueilla) päätetään kuvaparista myöhemmin. #3371 odottaa #3380:tä + s-pohjan pallosarjaa/versiovahtia.
- **#3385 PIDOSSA — KORJATTAVA** (`pelikoodari-maailma-auki`, Julkaisija pitää): omistaja 08.3x korjasi termin —
  MANNERLENNOT JÄÄVÄT. Palauta `js/game.js` mannerLennot + MANNERLENTO_ILMOITUS-lause, `js/livia.js` mannervihje,
  `tests/rules.test.mjs` mannerlentotesti, `tests/pallolauta.test.mjs` lentonäkymä, `tools/savuke-mannerlento.mjs` 2b,
  kultaiset tiivisteet (`node tools/natiivi-kultaiset/vartija.mjs --paivita`). SÄILYTÄ: löytämisen sumun poisto
  (sumu.js, kytkennät, savuke-sumu, sarjat.json). Laajenna maakuntaerällä (kohta 3).

## 2. NATIIVI (proto)
- `pelikoodari/maailma-auki` 21e79d71 **PIDOSSA** (Natiiviseppä tietää): palauta Kaupat.MannerLennot + Laatat
  MannerlentoIlmoitus + kultaiset kauppa-/kulkutapajäljet + LiikkuminenTestit/PeliApuTestit; SÄILYTÄ NostonMuste.Taysi.
  Natiivisepän nostot-heti 934103a9 on jo tehty. Natiivi-UI:n `natiivi-ui/nostot-taysi` e7e553bf on 21e79d71:n päällä
  (ElavaHerays → m.Taysi, NostotKartalla/Symbolimallit samaa kenttää; kartussi Loydetty) — korjatun haaran jälkeen
  sen pohja vaihtuu (Taysi säilyy, joten sisältö pätee). Mannerlentotekstit (Kaupat.cs:59, PeliOhjain.cs:1344) jäävät
  ennalleen, koska mannerlennot jäävät.
- Merge-pyynnöissä: `pelikoodari/lukija-putki` 478158ea (+ Natiivi-UI f9fa2863), `pelikoodari/kortti-ilman-ajoa`
  c7b475d7, `pelikoodari/uusi-peli-177-avaimet` 04308427.

## 3. MAAKUNTAERÄ (seuraava, korjattu määrittely, omistaja 08.3x) — web + natiivi
Pois:
1. Maakuntien vaiheittainen herääminen: kaikki kohdemaan maakunnat heränneinä heti. Minun osani: Peli/KarttaMuste.cs
   (heräämissääntö + laskuri), Scripts/Peli/PeliOhjain.Muste.cs (MaakuntaHeraa) + web js. Rivit muille:
   Natiiviseppä Kartta/MaaKartta.cs Heraannyt/Herata; Natiivi-UI UI/Kartuscha.cs + Kartuscha.Muste.cs,
   UI/MaakuntanimetKartalla.cs, UI/Pulu/Pulu.cs; Linssiseppä Linssit/Unity/ElavaKartta.cs, ElavaHerays.cs,
   Linssit/Ydin/Elava/Herays.cs.
2. Maakuntasalaisuudet pois: näkyvät heti kuten muut nostot; pelkät palkintoefektit poistetaan kokonaan ja listataan
   Fablelle (data js/packs/maakuntasalaisuudet*.js, vienti tools/vienti/elava-kartta.mjs, KarttaMuste.LisaaSalaisuus).
3. Maakunnan alkuanimaatiosta jää VAIN pohjavärin täyttyminen (nimi, rajan hehku/kierto, nostojen vaiheittainen
   syttyminen, kortit/tekstit pois). Kartoita ensin vaiheet nimeltä rivillä Fablelle.
4. Löytämättömien nostojen himmennys/nimettömyys pois natiivissa (NostonMuste.Taysi, maailma-auki-haara) ja webin
   löytösumu pois (#3385).
Ennen toteutusta rivi Fablelle: missä maakuntaeteneminen on web js:ssä (natiivin kartoitus yllä).

## 4. MUUT JONOSSA
- **Raja-PR (ei aloitettu)**: `tools/pollo/rajat.js` / wrangler.jsonc PUHE_PAIVARAJA 60 000 → esim. 400 000 mrk/IP/vrk
  (Fable päättää) + PUHE_KUUKAUSIRAJA; asiakas: 429/5xx ei saa ohittaa striimin virkettä äänettä — pysähdy ja näytä
  workerin viesti kerran. Julkaisija ottaa jonon kärkeen: sano numero.
- **Striimipuhe ilman äänikytkimiä** (omistaja 09.2x, SITOVA): `js/lukija.js lueVirtana` aanetPaalla()-portti pois
  (ja vastaava puhe.js/pollo.js-polku); vain Pulun kaiutinvipu ohjaa. Speksi Natiivi-UI:lle natiiviin.
- **Natiivin progressiivinen soitto** (Puhe.cs on Pelikoodarin): Unity `DownloadHandlerAudioClip(url, AudioType.MPEG)
  { streamAudio = true }` POST-pyynnöllä (klippi soi ennen latauksen loppua) ja tallennus tiedostoon rinnalla, tai
  PCM-virta AudioClip.Create + PCMReaderCallback. Mittaa 1. ääni ennen/jälkeen simulaattorilla. Speksi Natiivi-UI:lle
  (lukijat eivät muutu, jos Puhe.Lue hoitaa virran).
- 1.0.28-mittaus natiivin lukijataukoon (Fable välittää SHA:n).

## 5. OPIT
- **Puhemittaus kuluttaa workerin IP-päivärajan** (60 000 mrk koko verkolle — omistajan laitteet saivat 429 tänään).
  Mittaa kehittäjäkoodilla (pyydä Julkaisijaa viemään POLLO_KEHITTAJAKOODI Macin avaintiedostoon, ei repoon) tai
  lohkollisilla toistoilla (R2-osuma ei kuluta). Muisti: puhemittaus-paivaraja.md.
- Mittausvaljaat scratchpadissa (lukija/mittaa.mjs, tallenna.mjs, z10/mittaa-z10.mjs) — tallenna.mjs:n AnalyserNode-
  tasokäyrä paljasti mykistyksen, jota lähteiden ajoitus ei näyttänyt.
- Web-pallon laattakerroksen versiovahti: pallosarjan laatat.json versio = pyramidi.json versio, muuten kerros purettu.
