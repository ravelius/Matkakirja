# Opus → Fable: maajään rajaus todellisiin jäätiköihin — suunnitelma (19.9.2026)

Erä `opus-local-maajaa`, Matkakirja Opus local (Mac Studio), 16.25–16.40 Suomen aikaa.
Pelkkä suunnitelma, ei koodimuutoksia.

## Ongelma

`tools/reliefivarit.mjs` `jaapaino`: maalle `JAA.maa [62, 70]`,
`maaKatto 0,88` eli KAIKKI yli 70°:n maa sekoitetaan 88-prosenttisesti
jään väriin, myös Siperian, Taimyrin ja Kanadan mantereen tundra.
Astronautin kameran navalla se näkyy vaaleana renkaana 70–80°:ssa, ja se
on jäljellä olevien 21 %:n levypikselien syy (viesti-fable-jaameri-20260919.md).

## Aineisto: Natural Earth 10m "Glaciated areas" (suositus)

- `https://naciscdn.org/naturalearth/10m/physical/ne_10m_glaciated_areas.zip`
  (1,6 Mt, 1 886 muotoa, 239 371 pistettä) ja tarvittaessa
  `ne_10m_antarctic_ice_shelves_polys.zip` (160 kt, 159 muotoa).
  Kumpikin vastasi 200 tänään. **Public domain** (Natural Earth),
  sama lähde ja sama noutoreitti kuin `tools/hae-vedet.mjs`:ssä
  (naciscdn, zip + shp-lukija `lueZip`/`lueShp` on jo repossa).
- Kattavuus tarkistettu renkaiden alkupisteistä: Grönlanti 750 rengasta,
  Kanadan arktinen saaristo 474, Huippuvuoret 90, Severnaja Zemlja 14,
  Alpit 25, Etelämanner 180. Taimyr ja Siperian rannikko (70–77° N,
  60–180° E) 9, eli pelkät pienet vuoristojäätiköt eikä tundraa.
  Juuri tämä ero tarvitaan.
- Tarkkuus riittää: 1:10M-aineisto vastaa noin 2–5 km:n reunaa, ja 8k-kuvan
  pikseli on päiväntasaajalla 4,9 km.
- Hylätyt vaihtoehdot:
  - RGI 7.0 / GLIMS (CC BY 4.0): tarkempi, mutta gigatavuja, ja
    8k-kuvassa ei tarkkuutta, joka sitä hyödyntäisi.
  - ETOPO1 Bedrock vs. Ice Surface -erotus (jään paksuus): tyylikäs, mutta
    Bedrock-paloja ei ole ämpärissä. Se vaatisi uuden palaviennin
    (sadoista megatavuista gigatavuun), ja se löytää vain paksun jään eli
    lähinnä Grönlannin ja Etelämantereen, ei Huippuvuorten jäätiköitä.

## Toteutus (yksi Opus-erä, arvio 45 min)

1. `tools/jaatikkomaski.mjs` (uusi, noin 120 riviä): nouto ja välimuisti
   (kuten `hae-vedet.mjs`), polygonit rasteriksi 1′-hilaan
   kaistaleittain (scanline-täyttö parillisuussäännöllä, reiät mukana),
   ja reunan pehmennys noin 3′:n laatikkosumennuksella, jottei rajalle
   synny terävää viivaa. Palauttaa kaistaleelle `Float32Array` 0…1.
2. `tools/reliefivarit.mjs`: `jaapaino(lat, korkeusM, maski)`. Maalle
   `maaKatto × maski` pohjoisessa (lat > 0); etelässä nykyinen
   leveysastesääntö säilyy, koska Etelämanner on käytännössä kokonaan
   jäätä eikä Natural Earthin 180 renkaan kattavuutta pääjäätikölle ole
   varmistettu. Merelle ennallaan (Jäämeri 0,40 [72, 84]).
3. `tools/tee-pallotopografia-koko.mjs`: maski kaistaleelle samaan
   silmukkaan (yksi luku per solu lisää). Polttoaika nousee arviolta
   12 s:sta noin 20–30 s:iin (rasterointi 21 601 × 10 801 kerran,
   välimuistiin).
4. Testit: `jaapaino` maskin kanssa ja ilman (0 → ei jäätä
   pohjoisessa, 1 → `maaKatto`), ja rasterointi pienellä tunnetulla
   polygonilla (neliö ja reikä).
5. Mittaus: koeala 64–90° N (kuten Jäämeri-erässä) ennen ja jälkeen,
   täysi poltto uudella tunnisteella, lohko 47 paikallisella ämpärillä
   (`SAVUKE_AMPARI_PAIKALLINEN`), työpöytä 49/49 ja astro-sumu 8/8.
   Tavoite: levypikselit alle 10 % ja kirkkausero alle 8.

## Päätös tarvitaan ennen toteutusta (Fable)

**Mikä tundran sävy on?** Ilman leveysastesääntöä yli 70°:n maa saa
suoraan korkeusasteikon värin eli matalalla VIHREÄN, kuten Tanskan
rannikko. Arktinen tundra ei ole vihreää metsää. Kaksi vaihtoehtoa:

- **a)** Kevyt tundrasävy: leveysasteliuku 64–76° kohti harmaanruskeaa
  (esim. 150,145,125), katto noin 0,35. Ei jäätä, mutta ei myöskään
  metsänvihreää. **Suositus.** Se on yksi vakio lisää `reliefivarit.mjs`:ään
  ja mahtuu samaan erään.
- **b)** Korkeusasteikko sellaisenaan (vihreä tundra). Yksinkertaisin,
  mutta Taimyr ja Kanadan mantereen pohjoisosa näyttävät
  lauhkealta vyöhykkeeltä.

Lisäksi: kun sisältö muuttuu, 4k- ja 8k-kuva poltetaan uudelleen ja
viedään ämpäriin (Fable), tunniste vaihtuu, ja julkaisu on oma versionsa.
Pyramidia (topografialinssi) muutos ei koske, koska `jaapaino` ei ole
siellä käytössä.
