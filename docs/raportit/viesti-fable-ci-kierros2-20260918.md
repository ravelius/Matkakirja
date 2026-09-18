# Viesti Fablelle: PR-portti 6 min → tavoite 3,5 min (kierros 2) — 18.9.2026

Opus-kehitysagentti, haara `claude/bold-ride-vow4ki-ci-kierros2` (pohja: main =
v1943, 3f4c426a). PR:ää EI avattu, versiota EI nostettu, Raamattuun EI koskettu.
Tehtävä: omistajan päätös 18.9.2026 klo 18.25 ja klo 18.35 (Raamattu, AGENTIT
VAIN OPUS JA SONNET, TARKENNUS 11 kohta 24 a–d).

Edellinen kierros: `docs/raportit/viesti-fable-ci-portti-20260918.md`.

---

## Yhteenveto yhdellä silmäyksellä

| Kohta | Tila |
| --- | --- |
| a) jokainen rivi alle 2 min | pariisi-lahizoom jaettu vartiolohkoittain, astro-pallon vartijalohko kolmeen; rivejä 20 → 23; `SAVUKE_RINNAKKAIN` 8 → 12 |
| b) mediaanimittaus kuormaherkissä vartioissa | topografialinssin välähdysvartio mittaa nyt mediaania; sen tunnettu Mac-punainen poistettu |
| c) checkout paikallisesta peilistä | savukkeet.yml:n Mac-reitti jättää `docs/`:n (165 Mt) checkoutin ulkopuolelle |
| d) GPU vs CPU (SwiftShader) | mekanismi valmis (`SAVUKE_CHROMIUM_LIPUT`), EI otettu käyttöön yhdelläkään rivillä — ks. mittaus |

---

## a) Jokainen savukerivi alle 2 minuuttiin

### `savuke-pariisi-lahizoom.mjs` — jako VARTIOLOHKOITTAIN, ei enää ruuduittain

Ruutu oli jo jaettu (`SAVUKE_RUUTU`), eikä sitä voi jakaa pidemmälle. Siksi
savukkeeseen tuli toinen rajausmuuttuja `SAVUKE_LOHKOT`, joka valitsee
vartiolohkot:

| Lohko | Sisältö | Väitteitä (per ruutu) |
| --- | --- | --- |
| `perus` | 1c, 3i2, 5, 8o–8q (saapumisnäkymä), 1, 1b, 2, 3, 3b, 3d–3f, 6, 6b + napautus-/viuhkalohkon ja turisti-infon INFO-rivit | 24 |
| `liuska` | kaupunkiliuskan vartiot 8a–8n | 17 |
| `vastakoe` | 3c ja 3g (INFO, vanhentuneet vastakokeet) | 0 |

**Ilman muuttujaa ajetaan kaikki kolme**, eli paikallinen uusinta ja
`kaikki`-sarja eivät muuttuneet. Yhtään väitettä ei muutettu eikä poistettu:
`liuska`-lohko siirrettiin omaan silmukkaansa sellaisenaan, ja se laskee alussa
itse ne neljä arvoa (`nurkka`, `kerroin`, `liuskassa`, `poltetut`), jotka se
tarvitsi perus-lohkosta.

**`vastakoe` ei ole PR-portin riveillä.** Se avaa TOISEN selainkontekstin
(`?aihemerkit=0`) ja odottaa oman 44 sekunnin saapumisen, mutta tuottaa vain
kaksi INFO-riviä — 3c ja 3g ovat PAATOKSET 34:n jälkeen vanhentuneita
vastakokeita, joissa molemmat luvut ovat nollia, koska Pariisin rykelmää ei ole
enää kartalla. **Tämä on ainoa kohta, jossa portin ajo näyttää vähemmän kuin
ennen, ja se on Fablen/omistajan päätettävissä:** jos rivit halutaan takaisin,
lisää `vastakoe` jommankumman rivin `SAVUKE_LOHKOT`-arvoon sarjat.jsonissa
(hinta noin 60 s siihen riviin).

### `savuke-astro-pallo.mjs` — vartijalohko kahdesta kolmeen

`#vartija-a` oli 168 s (yli tavoitteen), `#vartija-b` 128 s. Lohko jaettiin
kokeiden rajalta:

| Rivi | Kokeet |
| --- | --- |
| `#vartija-a` | vastakoe ilman estoa, kirjasto estetty |
| `#vartija-c` (UUSI) | pinta estetty, Mac-kotelon vastakoe |
| `#vartija-b` | Safarin rajat, kehykset poikki, musta pinta, kolme avausta |

`NAKYMAT=vartija` ajaa yhä kaikki kuusi koetta.

### Rinnakkaisuus

`.github/workflows/savukkeet.yml`: `SAVUKE_RINNAKKAIN` 8 → 12.

### MITATUT KESTOT (Mac Studio, 18.9.2026, `SAVUKE_RINNAKKAIN=12`)

TAULUKKO_TAHAN

---

## b) Mediaanimittaus kuormaherkissä vartioissa

### Tehty: `savuke-topografialinssi.mjs`

Vartio *"avauksessa ei ole välähdystä suhteessa linssin lopputilaan"* mittasi
yhden avauksen. Kuormassa kehyksiä putoaa, ja yksi pudonnut kehys näytti
kirkkauden "paluulta alas" (19,4 vs raja 15; yksin ajettuna 4,0).

Vartio ottaa nyt **kolme näytettä ja käyttää niiden mediaania** — mutta vain jos
ensimmäinen näyte on punainen. Perustelu on kirjoitettu savukkeeseen: kuormahäily
tekee mittauksesta PUNAISEN, ei vihreää, joten vihreä kertakäynti ei voi olla
häilyn tulosta. Näin vartio maksaa kaksi lisäavausta vain silloin, kun se muuten
olisi ollut punainen. **Rajat (8 kehystä, 60 % kattavuus, VALAHDYSVARA 15) ovat
täsmälleen ennallaan — vartio ei löystynyt, vain sen otos kasvoi.**

`tunnetutPunaisetMac`-merkintä poistettiin `sarjat.json`:sta.

### EI tehty tässä erässä (perustelu)

`savuke-satelliittilinssi` ("uusi napautus avaa selitteen takaisin", "kohteen
nimi ja selite lukevat kuvan päällä", "pienoiskuvat kelluvat…"),
`savuke-astro-valokuva` (minipulun ele ja selitteen avaus) ja
`savuke-ihmisen-esitys` / `savuke-ihmisen-kappaleet` jäivät ennalleen.

Syy on kirjattava rehellisesti: nämä vartiot eivät mittaa YHTÄ lukua, jolle
mediaani olisi määritelty, vaan tapahtuman toteutumista (avautuiko selite,
reagoiko minipulu). Oikea korjaus niihin ei ole mediaani vaan **tilan odotus
vakiintumiseen** — sama kaava, jolla `savuke-astro-pallo`:n varjovartiot
korjattiin 17.9. (odota, kunnes kaksi peräkkäistä lukemaa ovat samat). Se on
savuke kerrallaan tehtävä erä, eikä se mahtunut tähän aikakattoon. Suositus
Fablelle: oma erä "kuormaodotukset", yksi savuke kerrallaan, kaksi peräkkäistä
vihreää kuormassa ennen kuin merkintä poistetaan.

---

## c) Checkout: `docs/` pois Mac-reitin checkoutista

`--reference`-peiliä EI otettu käyttöön. Perustelu: `actions/checkout@v4`:llä ei
ole `--reference`-syötettä, joten se olisi vaatinut oman `git clone`-askeleen,
joka osoittaa `alternates`-tiedostolla omistajan päähakemistoon
`/Users/samireivinen/Matkakirja-fable/.git`. Silloin runnerin työhakemisto jäisi
riippumaan siitä, ettei pääkloonissa koskaan ajeta `git gc`:tä, joka voisi
poistaa objekteja runnerin alta — kesken PR-ajon tuleva "object missing" olisi
pahempi vika kuin 36 sekuntia.

Tilalle mitattavissa oleva, riskitön syy samaan säästöön:

- repon työhakemisto on noin **640 Mt**, josta `docs/` on **165 Mt** ja
  `docs/raportit` yksin **146 Mt**
- juuri raportit muuttuvat JOKAISESSA sessiossa, joten runnerin pysyvä
  `_work`-klooni noutaa ja kirjoittaa niitä joka ajolla
- **yksikään savuke ei lue `docs/`-kansiota**: `grep -l "docs/"
  tools/savukkeet/*.mjs` antaa vain lähdeviitteitä alkukommenteissa, eikä peli
  (index.html, js/, css/, sw.js) avaa docs-polkuja ajossa

Muutos savukkeet.yml:n Mac-reitille:

```yaml
- uses: actions/checkout@v4
  with:
    ref: ${{ github.event.inputs.ref || github.ref }}
    fetch-depth: 1
    filter: blob:none
    sparse-checkout-cone-mode: false
    sparse-checkout: |
      /*
      !/docs/
```

`filter: blob:none` yhdessä sparse-checkoutin kanssa jättää poisrajatun kansion
blobit noutamatta kokonaan. `fetch-depth: 1` on actions/checkoutin oletus,
mutta kirjoitettu näkyviin, ettei se vahingossa muutu syvemmäksi.

**Arvio:** 36 s → noin 10–15 s tyypillisessä PR:ssä, jossa docs on muuttunut;
docs-muutoksettomassa PR:ssä säästö on pienempi. **Mittaus kuuluu Fablelle:**
katso PR-ajon `Set up job` → `actions/checkout`-askeleen kesto ja vertaa mainin
edelliseen ajoon. Jos säästöä ei tule, syy on muualla kuin blobien noudossa
(esim. runnerin oma `_work`-siivous), ja se on oma erä.

**testit.yml:ään EI koskettu:** `tests/dokumentit.test.mjs` lukee docs-kansiota,
joten sama rajaus kaataisi testit.

---

## d) GPU vai CPU? (omistajan kysymys 18.9.2026 klo 18.35)

### Mekanismi on valmis

`tools/savukkeet/chromium-liput.mjs` (uusi) + `aja-sarja.mjs`. Rivikohtainen
ympäristömuuttuja `SAVUKE_CHROMIUM_LIPUT` (sarjat.jsonin `env`-lohkossa) lisää
Chromiumin käynnistykseen halutut liput. Savukkeita on yli 150 eikä yhteistä
käynnistysapuria ole, joten liput lisätään Noden `--import`illa ladattavalla
kääreellä, joka kietoo Playwrightin `chromium.launch`in — **yhtään savuketta ei
tarvinnut muuttaa**. Ilman muuttujaa kääre ei lataudu lainkaan.

### Mitattu: mitä Chromium 1234 tekee Mac Studiolla

TULOS_D_TAHAN

---

## Muutetut tiedostot

- `.github/workflows/savukkeet.yml` — `SAVUKE_RINNAKKAIN` 8 → 12, Mac-reitin
  checkout ilman `docs/`:ää
- `tools/savukkeet/sarjat.json` — julkaisusarja 20 → 23 riviä, uudet rivit
  `#390-perus` / `#1400-perus` / `#390-liuska` / `#1400-liuska` /
  `#vartija-c`, topografialinssin tunnettu Mac-punainen pois
- `tools/savukkeet/savuke-pariisi-lahizoom.mjs` — `SAVUKE_LOHKOT`, liuskalohko
  omaan silmukkaansa
- `tools/savukkeet/savuke-astro-pallo.mjs` — `vartija-c`
- `tools/savukkeet/savuke-topografialinssi.mjs` — välähdysvartion mediaani
- `tools/savukkeet/aja-sarja.mjs` — `SAVUKE_CHROMIUM_LIPUT`
- `tools/savukkeet/chromium-liput.mjs` — UUSI

Tarkistukset: `node tools/tarkista-savukkeet.mjs` (kunnossa),
`node --test tests/*.test.mjs` (3623 läpi, 0 punaista),
`node tools/savukkeet/rakenna-matriisi.mjs julkaisu` (23 riviä).
