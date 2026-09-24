# Seuraamisvirhe v2106: kamera vs. osoitin, aito hiiri (22.9.2026)

Jatkoa docs/raportit/mac-mittaus-v2106-webkit-20260922.md:lle. Fablen pyynnöstä
Playwright-synteettisen mittauksen jälkeen omistaja teki AIDOT hiiri/sormi-
vedot työpöydällä (ei dispatchEvent, ei CGEvent — oikea Safari.app ja Chrome.app,
oikea käyttöjärjestelmätason syöte), kahdella kierroksella: ensin kuormitetulla
koneella (Pelikoodarin headless-savukesarja käynnissä, hylätty kohinaisena),
sitten Julkaisijan pysäyttämällä rauhallisella koneella (tämän raportin data).

**HUOM (Mac kaatui klo ~16.24 22.9.2026, käynnistyi uudestaan):**
`/tmp/laitetestaaja-mittaus-desktop.jsonl` (raaka per-kehys-data) EI säilynyt
uudelleenkäynnistyksessä — /tmp tyhjenee rebootissa. Tämän raportin luvut on
palautettu Fablelle ja Pelikoodarille lähetetyistä viesteistä (kirjoitettu
ennen kaatumista); yksittäisten kehysten koko sarja on siis MENETETTY, vain
kierroskohtaiset koosteet ja kaksi esimerkki-alku10:tä säilyivät. Jos täysi
raakasarja tarvitaan uudestaan, ajo pitää toistaa (harnessi ei ollut
committoitu — ks. Menetelmä).

## Menetelmä

Tilapäinen (ei committoitu) inline-harnessi `index.html`:iin +
`tools/laitepalvelin.mjs` paikallispalvelimeen (lähiverkko/localhost,
`/__mittaus`-POST-endpoint kirjoittaa `/tmp/laitetestaaja-mittaus-desktop.jsonl`:ään).
Osoite `http://127.0.0.1:8794/?lauta=pallo&dev=marseille&koe=mittaus&luonnollinen=1`.

- Kuunnellaan (EI dispatchata) oikeat `pointerdown/move/up`-tapahtumat
  `.pallo-kotelo`-elementiltä aikaleimoineen (`event.timeStamp`, `clientX/Y`).
- Joka rAF-kehykselle luetaan kameran ruutukoordinaatti kiinteästä
  lat/lng-pisteestä (`getScreenCoords`) ja lasketaan siirtymä edelliseen
  kehykseen.
- Jokaiselle kehykselle etsitään lähin osoitinnäyte samasta ajanhetkestä ja
  lasketaan osoittimen siirtymä samassa ikkunassa.
- **Suhde** = kameran siirtymä / osoittimen siirtymä (ihanne 1,0 = täydellinen
  1:1-seuranta ilman viivettä). Laskettu vain kehyksille joissa osoitin liikkui
  yli 0,5 px (muuten jako nollalla).
- **Pysähdys** = osoitin liikkui >2 px mutta kamera <0,25 px samassa kehyksessä.
- 8 kierrosta á 2,2 s per selain, sivu poistaa saapumiskortin/verhon
  automaattisesti ja tallennus käynnistyy itsestään ~8–9 s latauksesta —
  omistaja veti jatkuvasti koko ~21 s ikkunan ajan.
- Kaksi ajoa: ensin kuormitetulla koneella (Pelikoodarin savukesarja käynnissä,
  load 47–70) — HYLÄTTY, liikaa kohinaa. Sitten Julkaisijan pysäyttämällä
  rauhallisella koneella — TÄMÄN RAPORTIN DATA.

## Tulokset (rauhallinen kone, 8+8 kierrosta)

| moottori | kierros | px/ms-vaihtelu | pysähdyksiä (tasaisuusmittari) | suhde med | p10 | p90 | pysähdyksiä (seuranta) | osoitinnäytteitä |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Chromium | 1 | 122 % | 56/129 | 0,98 | 0 | 1 | 2/131 | 103 |
| Chromium | 2 | 124 % | 28/129 | 0,99 | 0 | 1 | 13/131 | 84 |
| Chromium | 3 | 101 % | 49/128 | 0,97 | 0 | 1,17 | 29/130 | 127 |
| Chromium | 4 | 76 % | 26/130 | 0,88 | 0 | 3,65 | 16/132 | 137 |
| Chromium | 5 | 111 % | 29/129 | 0,98 | 0 | 13,66 | 14/131 | 78 |
| Chromium | 6 | 182 % | 30/129 | 1,00 | 0 | 10,98 | 16/131 | 114 |
| Chromium | 7 | 139 % | 29/130 | 0,09 | 0 | 1,21 | 19/132 | 70 |
| Chromium | 8 | 182 % | 87/130 | 0,00 | 0 | 1,03 | 36/132 | 121 |
| WebKit | 1 | 165 % | 70/130 | 0,78 | 0 | 1,35 | 6/132 | 182 |
| WebKit | 2 | 137 % | 25/112 | 1,08 | 0 | 7,36 | 18/114 | 134 |
| WebKit | 3 | 130 % | 21/130 | 1,20 | 0 | 4,20 | 7/132 | 187 |
| WebKit | 4 | 159 % | 50/112 | 0,01 | 0 | 2,91 | 19/114 | 59 |
| WebKit | 5 | 174 % | 28/121 | 0,74 | 0 | 3,43 | 17/123 | 153 |
| WebKit | 6 | 107 % | 5/119 | 1,35 | 0,19 | 8,35 | 4/121 | 145 |
| WebKit | 7 | 208 % | 35/118 | 0,20 | 0 | 1,23 | 20/120 | 124 |
| WebKit | 8 | 198 % | 50/130 | 0,70 | 0 | 11,03 | 42/132 | 159 |

**p10 = 0 kaikissa 16 kierroksessa, molemmilla moottoreilla** — vähintään joka
kymmenes kehys jokaisessa vedossa on täysi pysähdys (kamera ei liiku vaikka
osoitin liikkuu).

**p90 nousee ajoittain 3–14:ään** (Chromium 5/8 kierrosta: 4, 5, 6, 8 lievemmin;
WebKit 6/8) — pysähdystä seuraa ylikorjaava piikki, ei tasainen jälkeenjääminen.

Kokonaispysähdysosuus (seuranta-sarake / rivitaKpl) samaa luokkaa molemmilla:
Chromium ka. ~14 % kehyksistä, WebKit ka. ~13 % — ero on siis PIIKKIEN
VOIMAKKUUDESSA, ei niiden MÄÄRÄSSÄ.

## Alku10 (ensimmäiset kehykset pointerdown-hetkestä)

Havainnollistaa juuri omistajan kuvaaman "tahmea lähtö, sitten kiihtyy":

**WebKit kierros 2** (selvin esimerkki):
```
t=13051  camD=0     ptrD=40.03  suhde=0    pysähdys=TOSI
t=13075  camD=0     ptrD=0      suhde=—
t=13087  camD=0     ptrD=90.74  suhde=0    pysähdys=TOSI
t=13104  camD=103.64 ptrD=27.28 suhde=3.80  <- ylikorjaus
t=13118  camD=56.48  ptrD=58.10 suhde=0.97
t=13135  camD=46.04  ptrD=47.70 suhde=0.97
```
Kaksi kehystä (~36 ms) kamera pysyy paikallaan vaikka osoitin ehtii liikkua
yhteensä ~130 px, sitten yksi kehys korjaa 104 px kerralla (suhde 3,8), minkä
jälkeen seuranta tasoittuu suhteeseen ~0,97.

**Chromium kierros 2** (siisti esimerkki, ei stallia):
```
t=12179  camD=0     ptrD=1.38  suhde=0
t=12209  camD=7.46  ptrD=7.54  suhde=0.99
t=12226  camD=7.05  ptrD=7.11  suhde=0.99
t=12242  camD=9.23  ptrD=9.32  suhde=0.99
t=12260  camD=16.64 ptrD=16.81 suhde=0.99
```
Suhde pysyy 0,97–0,99 heti ensimmäisestä liikkeestä — ei stallia eikä
ylikorjausta. **Chromium kierros 1** näytti saman ilmiön lievempänä (suhde
0,46–0,55 muutaman kehyksen ajan lähdössä, ei täyttä nollaa).

## Tulkinta

Molemmat moottorit kärsivät samasta perimmäisestä ilmiöstä eri voimakkuudella:
kamera ei päivity joka piirretyllä kehyksellä, vaan tapahtumakohtaisesti —
kehys jossa mikään syötetapahtuma ei ehtinyt ennen piirtoa on pysähdys, ja
kehys joka saa useamman kertyneen tapahtuman kerralla on ylikorjaava piikki.
Tämä on suora mittanäyttö sulavuuskatsauksen (docs/raportit/sulavuus-katsaus-20260922.md)
kohdasta 13: **kamera pitäisi kirjoittaa kerran per rAF-kehys, ei per
syötetapahtuma.** Korjaus selittäisi ja korjaisi sekä pysähdykset että piikit
molemmilla moottoreilla — ei ole pelkkä WebKit-erityisongelma, vaikka WebKitin
yksittäiset pysähdys+piikki-parit olivat rajumpia kuin Chromiumin.

## Avoin

Raaka per-kehys-JSONL menetettiin Mac-kaatumisessa (ks. yllä) — jos
tarkempaa jakaumaa tai lisää alku10-esimerkkejä tarvitaan, mittaus pitää
toistaa (harnessi ei committoitu, kirjoitettavissa uudelleen tästä
raportista Menetelmä-osion mukaan).
