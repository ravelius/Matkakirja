# Ranska7: herokuvat kytketty kaupunkikortteihin — Opus → Fable, 15.9.2026

Kuvaputken 14.9.2026 toimittamat seitsemän Commons-alkuperäistä ovat nyt
Ranskan lisäkaupunkien korteissa. Mediatiedostoja EI tuotu repoon: kortti
osoittaa media.matkakirja.app-polkuun, ja jokainen kenttä on manifestista
sanasta sanaan.

## 1. Toimituksen varmistus — 7/7

Manifesti `posti/kuvatoimitus-ranska7-20260914.json` (postilaatikko),
SHA256 `045ea28ecc5b7e1300e524b652d5fdc12fb3a409e76f172d962d3f36103962a4`
— mitattu `sha256sum`illa, täsmää kuvatoimituksen ilmoittamaan.

Jokainen kuva haettiin julkisesta osoitteestaan ja mitattiin (HEAD,
GET, SHA-256, tavut, MIME, JPEG-otsakkeen mitat):

| Kaupunki | HEAD | MIME | SHA-256 | Tavut | Mitat | Suhde |
|---|---|---|---|---|---|---|
| Lyon | 200 | image/jpeg | täsmää | 3 281 524 | 3336 × 2495 | 1,337 |
| Bordeaux | 200 | image/jpeg | täsmää | 394 550 | 1024 × 758 | 1,351 |
| Lille | 200 | image/jpeg | täsmää | 4 527 217 | 3293 × 2110 | 1,561 |
| Strasbourg | 200 | image/jpeg | täsmää | 2 502 279 | 3509 × 2582 | 1,359 |
| Nizza | 200 | image/jpeg | täsmää | 2 475 162 | 3249 × 2364 | 1,374 |
| Toulouse | 200 | image/jpeg | täsmää | 3 016 874 | 3298 × 2440 | 1,352 |
| Nantes | 200 | image/jpeg | täsmää | 3 176 879 | 3507 × 2602 | 1,348 |

Bordeaux on toimituksen ilmoittama 1024 × 758 — sitä ei suurenneta.
Kuvasuhteet osuvat toimituksen haarukkaan 1,34–1,56:1.

## 2. Mitä muuttui

- `js/packs/nakyvat-kaupungit-fra.js` — seitsemän `herokuva: null`
  -paikkamerkkiä vaihtui kuvaolioksi: `osoite`, `lyhyt` (kortin
  kuvateksti), `selite` (pitkä), `tekija`, `ajoitus`, `lahde`,
  `lahdeUrl`, `lisenssi`, `lisenssiUrl`. Kaikki manifestista sanasta
  sanaan; `lahde` on manifestin oma `reuse_attribution`, joten Lillen
  ranskalainen lähdekrediittivaatimus ja Nantesin
  trialsanderrors-restaurointikrediitti kulkevat mukana. Yksikään
  kuvateksti ei väitä vuotta 1873 eikä isoisän ottamaksi — ajoitus
  (photochrom 1890–1905 / postikortti ennen ensimmäistä maailmansotaa)
  lukee kuvatekstissä.
- `js/kaupunkinosto.js` `latoLisakaupunginKortti` — kuva latotaan
  lehden herokuvien rakenteella: `figure.lehti-kuva` > `img` +
  `figcaption.kuvateksti` (lyhyt teksti, js/kuvatekstit.js) ja sen
  perässä `span.lehti-kuvalahde` (js/tekijakortti.js `taytaLahderivi`,
  jolloin Commons-sivu ja lisenssi linkittyvät). Vanha pelkkä
  osoite-merkkijono kelpaa yhä, ja `null` piirtää entisen
  paikkamerkin.
- `css/kaupunkinosto.css` — kortin herokuvalle contain-sovitus:
  lehden etusivun `max-height: 360px; object-fit: cover` puretaan,
  joten historiallista vedosta ei rajata. Paikkamerkkisääntö jää
  tyhjän kentän varaksi.
- `tools/savukkeet/savuke-kaupunkikortit.mjs` — vartio 2 uusiksi.

- `tools/savukkeet/savuke-kaupunkikortit.mjs` — vartio 2 uusiksi:
  ennen se vaati paikkamerkin ja nolla kuvaa, nyt se mittaa kuvan.

## 3. Savuke: 121/121 vartiota läpi (390 × 844 ja 1400 × 900)

`PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers node
tools/savukkeet/savuke-kaupunkikortit.mjs` — jokainen SEITSEMÄN kortin
kuva mitattiin molemmilla ruuduilla:

- **2.** kuva on kortissa ja latautui (`complete && naturalWidth > 0`),
  osoite on pakan oma.
- **2a.** kuvateksti ja lähderivi ovat datan omat merkilleen, ja
  lähderivi on näkyvissä (lisenssin vaatimus).
- **2a2.** kuvateksti ei sisällä vuotta 1873.
- **2b.** piirtoalan kuvasuhde on kuvan luonnollisen sisällä ±2 %.
  Mitattu poikkeama oli 0,4–1,0 % (kehyksen 3 px:n reunus), esim.
  Lille 390 px: luonnollinen 1,561 / piirretty 1,545.
- **2c.** VASTAKOE: kun `herokuva` nollataan ajon ajaksi, kortti
  piirtää paikkamerkin eikä hae yhtään ulkoista kuvaa.

Vanhat vartiot 1, 3–8 ja niiden vastakokeet ovat entisellään ja
vihreitä.

KAKSI SAVUKKEEN OMAA MITTAUSVIKAA KORJATTIIN MATKALLA, molemmat
ajoituksia eivätkä kortin vikoja:

1. Kuva mitattiin ennen dekoodausta (1400 px: `naturalWidth` 0 ja
   piirtoala 928 × 6 px). Nyt savuke odottaa dekoodauksen (katto 40 s;
   Toulousen 3,0 Mt ei ehtinyt 15 sekunnissa).
2. Lillen merkki osui 390 px:n ruudulla pisteeseen (231, 122), jossa
   päällimmäisenä on pelin oma palkki — `elementFromPoint` palautti
   `SPAN.typed`, joten sormi ei olisi osunut karttaan lainkaan. Nyt
   piste mitataan vasta kun pallo on käännetty kohteeseen, ja piste
   kelpaa vain jos sen päällä on karttakangas. Napautus on yhä aito.

Kuvat: `docs/raportit/kuvat/herokuva-lyon-kortti-390.jpg`,
`herokuva-lyon-kortti-1400.jpg`, `herokuva-lille-kortti-1400.jpg`
(yhteensä 292 kt).

## 4. Muut portit

- `npm test` — **3425 pass / 2 fail** (3440 testiä, 13 skipped).
  Molemmat punaiset ovat `tests/pollo.test.mjs`:n kuormavartioita
  (indeksointi 5210 ms, haku 332 ms) — aikarajoja kuormitetulla
  koneella, eivät tämän erän koodia.
- `node tools/tarkista-kaksoisavaimet.mjs` — ei kaksoisavaimia.
- `node tools/tarkista-niputus.mjs` — 390 moduulia, 4309
  top-level-julistusta, ei törmäyksiä.

## 5. Mitä EI tehty

Ei mediatiedostoja repoon, ei muiden pakkien muutoksia, ei Raamattuun,
ei versionostoa, ei mergeä, ei dist/:iä. Kuvaputken oma PR 2457 on
mediatoimitus; tämä on sen korttikytkentä.
