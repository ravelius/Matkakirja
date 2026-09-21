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

## Päivitys — zoomi mitattu (n. klo 14.05), kaatumisbugi korjattu

Pelikoodari korjasi laitepalvelimen (commit `32837f8d`: ämpärin
virran virhe ei enää kaada koko prosessia, vain sen pyynnön) ja
ehdotti kahta jatkoa: (a) kamera-ajolla mitattu zoomi, sama menetelmä
kuin `savuke-nimiot-sulavat.mjs`, ja (b) tarkennettu kaksisormiveto
(sormet ≥ 40 px erillään, symmetrinen liike kotelon keskipisteen
ympäri, 1,5 s, 8 pistettä) sen selvittämiseksi, onko aiempi
nollatulos simulaattorin injektio-ongelma vai pelin oma
eletunnistus.

### Zoomi kamera-ajolla — TOIMII, luvut lähellä Macia

```json
{"kehyksia":67,"fps":37,
 "siirtyma":{"mediaani":0.13,"p95":0.33,"n":2435,
   "pahin":{"avain":"hahmotelma-beaune","ero":34.73,"t":1784}},
 "koko":{"liikkui":59,"liikkuiJaKokoMuuttui":51,"osuus":0.86,
   "lepoaskel":0,"liikeaskel":0}}
```

Pelikoodarin Mac-vertailuluvut olivat mediaani 0,1–0,2 px, p95
0,33 px, koon osuus 0,97, liikeaskel 0. **iPadin p95 (0,33 px) osuu
täsmälleen Macin lukuun**, mediaani (0,13 px) on samaa
suuruusluokkaa, ja liikeaskel on 0 molemmilla — ainoa selvä ero on
koon osuus (0,86 vs. 0,97), eli iPadilla n. 86 % liikkeen kehyksistä
muutti nimiön kokoa portaattomasti Macin 97 %:iin verrattuna. fps
(37) on matalampi kuin panorointi (52–56), koska kamera-ajo pitää
GPU:n kiireisenä koko 1,5 s:n ajan. Yksi poikkeava piikki
(`hahmotelma-beaune`, 34,73 px, t=1784 ms — ajon lopussa) nostaa
"pahin"-lukua, mutta ei vaikuta mediaaniin/p95:een.

### Kaksisormiveto tarkennetulla parametrilla — EDELLEEN 0

`koko.liikkui: 0` jälleen, vaikka sormet erosivat 60 px:stä 300
px:iin symmetrisesti 8 pisteellä 1,5 s:n aikana. **Vahvistaa
Pelikoodarin epäilyn: simulaattorin kaksisormi-injektio ei tuota
OrbitControlsin odottamia samanaikaisia touch-tapahtumia** — kyse ei
ole pelin koodista. Oikea nipistys jää siis testaamattomaksi tällä
työkalulla; kamera-ajo on ainoa toimiva tapa mitata zoomin
sulavuutta simulaattorilla.

### Ympäristö (päivitys)

- Laitepalvelin päivitetty korjattuun versioon (`32837f8d`) ennen
  tätä kierrosta, ei kaatunut.
- Tilapäinen apuskripti `js/laitetestaaja-harness5.js` (+ yksi
  `<script>`-rivi) poistettu, EI committoitu.

## Seuraavaksi

1. iPhone-vertailu samalla menetelmällä (panorointi sormivedolla,
   zoomi kamera-ajolla) — molemmat mittarit ovat nyt toimivia.
2. Kaksisormi-injektion rajoite kannattaa kirjata Raamattuun/
   opetuksiin (sama perhe kuin aiemmat "kuollut nappi" -löydökset),
   jottei sitä selvitetä uudelleen.
3. Sen jälkeen kierros 22 loppuun (löytämisen sumu, kartuschan
   tap-through, uusi pyramidi).
