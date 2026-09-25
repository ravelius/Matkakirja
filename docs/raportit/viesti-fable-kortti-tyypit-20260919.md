# Opus → Fable: kohdekortin tyyppinimike ja pulu vieritetyssä kortissa (19.9.2026)

Erä `opus-local-kortti-tyypit`, Matkakirja Opus local (Mac Studio), 21.20–21.45 Suomen aikaa.
Pohja origin/main (39f1a2ee, v1965). Lähde: Sonnet 1 kierros 13 (v1964, iPhone-simulaattori,
`docs/raportit/kaappaukset/kierros13-20260919/`).

## 1. Tyyppinimike "KAUPPA" tekniikalle ja merenkululle

**Juurisyy:** `piirraKohdeYlarivi` (js/fokuskohteet.js) luki kortin ylärivin kartan
merkistä (`kohteenSymboli` → `karttavaloKarkisymboli`). Kartalla on omistajan
31.8.2026 päätöksen mukaan vain seliteryhmän kärkisymboli, ja ryhmän "Kauppa ja
tekniikka" kärki on kauppa. Siksi tekniikka (42 hahmotelmanostoa) ja merenkulku (12)
näkyivät kortissa "KAUPPA". Samasta syystä ruoka näkyi "Kulttuuri".

Hahmotelmien tyypit (grep `tyyppi:`): historia 189, kulttuuri 111, vuori 59,
tekniikka 42, ruoka 31, jarvi 30, kauppa 26, saari 24, joki 14, meri 13, merenkulku 12.

**Korjaus:** uusi `kohteenYlarivinNimike(kohde)`. Kortin ylärivin merkki ja nimi tulevat
kohteen TARKASTA kategoriasta (`kohteenKategoria`), eivät kartan ryhmästä. Tekniikka saa
veturin ja nimen "Tekniikka", merenkulku ankkurin ja "Merenkulku", ruoka maljan ja
"Ruoka ja juoma". Luonnon viidellä tyypillä on yksi luontomerkki, ja nimi tarkennetaan:
"Luonto · vuori / meri / saari / joki / järvi". Kartan merkit eivät muuttuneet.

Huom: tämä purkaa tietoisesti omistajan 26.8.2026 linjauksen "kortti ja merkki kertovat
samaa" ylärivin osalta (Fablen tilaus 21.20). Kartan merkki on yhä ryhmän merkki.

**Vartio:** `tests/kohdekortin-tyyppi.test.mjs` (3 testiä):

- jokaisella 14 tyypillä on oma nimike
- jokaisella aineiston tyypillä on nimike, eikä mikään muu kuin kauppa ole "Kauppa"
- Karlskoga, Fiskars ja Kalavryta ovat "Tekniikka" ja Cobh "Merenkulku" (ennen: kaikki
  "Kauppa")

## 2. Pulu kohdekortin LISÄÄ-tilan alalaidassa

**Juurisyy (mitattu):** `js/pulu-paneelin-ylla.js` piilotti pulun NAPIN oikein
(`opacity 0`, luokka `pulu-paneelin-alla-piilossa`) sekä Chromiumissa että WebKitissä,
myös Cobhin kortti LISÄÄ-tilassa alas vieritettynä. Näkyvä lintu ei kuitenkaan ole
nappi: Livian kasvokangas (`.livia-kasvot-pinta`, js/livia-eleet.js) piirtää pulun
omalle kankaalleen napin kohdalle, ja napin oma ikoni on piilossa. Kankaan näkyvyys
(`pinta.hidden = !nappiNakyy()`) tarkisti vain `display`- ja `visibility`-arvon, ei
vahdin luokkaa. Nappi väistyi, mutta kangas piirsi linnun kortin lähderivin päälle.
Sama koskee kaikkia kortteja ("kaikissa korteissa", Sonnet).

Mittari (Cobh, 390 × 844, Chromium; WebKit sama):

| | Nappi | Kasvokangas |
| --- | --- | --- |
| Ennen, kortti ylhäällä / alas vieritettynä | piilossa (opacity 0) | **näkyvissä** (`hidden: false`) |
| Jälkeen | piilossa | piilossa (`hidden: true`) |

**Korjaus:**

- `nappiNakyy` (js/livia-eleet.js) palauttaa falsen, kun napilla on vahdin luokka.
  Kankaan MutationObserver seuraa jo `class`-attribuuttia, joten piilotus ja paluu
  tapahtuvat heti.
- Luokan nimi on vakio `PULU_PANEELIN_ALLA_PIILOSSA` (js/pulu-paneelin-ylla.js).
- `tools/build-standalone.mjs`: pulu-paneelin-ylla.js siirtyi ennen livia-eleet.js:ää
  (tarkista-niputus).

**Vartio (`tools/savukkeet/savuke-nostovisa.mjs`):**

- Peittomittari (väitteet 9, 9c ja 10) vaatii piilotetulta pululta, että myös
  kasvokangas on piilossa (`pintaNakyy`).
- Uusi **10b**: kun kohdekortti suljetaan, nappi ja kangas palaavat.
- Playwright ei piirrä lintua kankaalle (päätön ajo), joten vartio lukee kankaan tilan.

| Ajo | Tulos |
| --- | --- |
| Vastakoe (vanha livia-eleet.js) | 20/24: 9, 9c ja 10 FAIL (`pintaNakyy: true`) |
| Korjattu | **24/24** |

Muut: `node --test` pass 3697, fail 0; `tarkista-niputus` ja `tarkista-savukkeet` kunnossa.

## Jäi tekemättä

- Laitemittaus (simulaattori): korjaus on luokka- ja DOM-tason, joten sen voi todentaa
  v1966:n jälkeen samasta Cobh-kuvasta.
- Kun pulu on NOSTETTU paneelin yläpuolelle (`pulu-paneelin-ylla`, CSS-siirtymä 0,28 s),
  en mitannut, seuraako kasvokangas napin uutta paikkaa.
- Sonnetin havainto 2 ("VIISAALTA PÖLLÖLTÄ" yliviivattuna) on tarkoituksellinen
  nimilappuvitsi (omistaja 27.8./31.8.2026), joten en koskenut siihen.
