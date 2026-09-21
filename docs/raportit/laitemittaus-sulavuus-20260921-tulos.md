# Sulavuusmittaus — ensimmäinen onnistunut tulos (iPad Pro 11" M5)

21.9.2026 n. klo 13.55–14.00 Suomen aikaa. Jatkoa kierroksille 1–5
(`docs/raportit/laitemittaus-sulavuus-20260921.md` ja `-e2.md`).
Pelikoodarin `tools/laitepalvelin.mjs` (haara
`pelikoodari-laitepalvelin`, commit `f3f3a426`, yhdistetty
`pelikoodari-nimiot-sulavat-e3`-haaraan omaan työhaaraani
`laitetestaaja-laitepalvelin`) korjasi CORS-esteen — **pallo näkyy
ensimmäistä kertaa oikealla laitteella, ja mittari tuottaa oikean
tuloksen**.

## Vahvistus

`tila()`: `pallonJuuri: {nakyva:true, lapsia:15, skaala:1}`,
`domissa: {nimet:2, nostot:63}`, `elementit: {datumeja:66, luotu:66,
liitetty:66}`, `css2d: {loytyi:true, lapsia:66}` — kaikki 66
elementtiä liittyivät DOMiin. Kuvakaappaus suoralla `simctl io
screenshot`illa vahvistaa: Ranskan kartta relief-kuvineen, joki-
viivoineen, maakuntanimineen (PICARDIE, NORMANDIA, BURGUNDI…),
PARIISI-nimiö ja Marseille-nappula näkyvät oikein.

## Mittaus: panorointi (oikea sormiveto simulaattorilla)

Kaksi ajoa, molemmat n. 2 s vetoa (`touch_path`, viisi pistettä):

| Ajo | kehyksiä | fps | siirtymä mediaani | siirtymä p95 | n | pahin |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | 259 | 55,7 | 0 px | 0 px | 12 126 | 0 px (nakyva-kaupunki-lyon, t=140 ms) |
| 2 | 227 | 52,1 | 0 px | 0 px | 12 882 | 0 px (kaupunki:marseille, t=50 ms) |

**Nimiöt pysyvät täydellisesti kiinni maapisteissään koko
panoroinnin ajan — mediaani ja p95 ovat 0 px, pahin yksittäinen
poikkeama on myös 0 px.** Tämä on parempi kuin Pelikoodarin
Chromium-vertailuluku (mediaani 0,1–0,2 px) — todennäköisesti koska
tämä pallolauta pysyi lähes paikallaan (Ranskan sisäinen pieni veto)
eikä isossa panoroinnissa, mutta luku on silti aito ensimmäinen
mittaus oikealta laitteelta.

## Mittaus: zoomi/nipistys — EI REKISTEROITUNUT

Kokeilin kahdesti `touch2_path`-kaksisormieletta (nipistys ulos,
1,5 s, keskitetty kotelon keskelle) välittömästi panoroinnin
jälkeen. Molemmilla kerroilla `koko.liikkui: 0` — **kameran skaala ei
muuttunut lainkaan koko mittausikkunan aikana**, vaikka panorointi
samassa ikkunassa rekisteröityi täydellisesti. Sivu ei siis reagoinut
kaksisormiseleeseen ollenkaan (tai kamera ei tulkinnut sitä
zoomiksi). En ehtinyt selvittää, onko kyse simulaattorin
kaksisormi-injektiosta (samantyyppinen tunnettu rajoite kuin
aiemmin dokumentoidut "kuollut nappi" -tapaukset) vai pelin omasta
eletunnistuksesta. Koon liukuvuutta (E2, `--nimiokerroin`) ei siis
saatu mitattua tällä kierroksella.

## Sivuhavainto: laitepalvelin kaatui kerran

`tools/laitepalvelin.mjs` kaatui kesken toisen ajon
tulkitsemattomalla `fetch`-virheellä (`ERR_HTTP2_STREAM_ERROR` /
"terminated" ämpärin proxy-kutsussa) — prosessi lopetti kokonaan
(Node `Unhandled 'error' event`), sivu näytti Safarissa "Sivua ei
voida näyttää". Uudelleenkäynnistys korjasi tilanteen välittömästi.
Pelikoodarille kannattaa lisätä `try/catch` (tai `fetch`-kutsun oma
virheenkäsittely) ämpärin proxy-reitille, jotta yksittäinen
epäonnistunut HTTP/2-pyyntö ei kaada koko palvelinta.

## Ympäristö

- iPad Pro 11" (M5), UDID `503000D1-34AC-4C42-BDF8-7E36753A87CD`,
  käynnistetty ja sammutettu tässä sessiossa, Julkaisijalle
  ilmoitettu.
- `node tools/laitepalvelin.mjs --portti 8791` ajettuna repon
  juuresta haarassa `laitetestaaja-laitepalvelin` (`pelikoodari-
  nimiot-sulavat-e3` + `pelikoodari-laitepalvelin` yhdistettynä),
  URL `http://127.0.0.1:8791/index.html?lauta=pallo&dev=marseille`.
- Tilapäinen apuskripti (`js/laitetestaaja-harness4.js` + yksi
  `<script>`-rivi `index.html`:ään) poistettu työhakemistosta, EI
  committoitu.

## Seuraavaksi

1. Pelikoodari: korjaa laitepalvelimen kaatumisbugi (fetch-virheen
   käsittely).
2. Selvitä miksi kaksisormiveto ei rekisteröidy zoomiksi — kokeile
   ehkä pidempää/eri tahtista pistejoukkoa, tai vahvista onko kyse
   simulaattorin tunnetusta kosketusrajoitteesta.
3. iPhone-vertailu samalla menetelmällä, kun zoomi saadaan
   mitattua molemmilla.
4. Sen jälkeen kierros 22 loppuun (löytämisen sumu, kartuschan
   tap-through, uusi pyramidi).
