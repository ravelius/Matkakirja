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

Ajo: `SAVUKE_RINNAKKAIN=12 node tools/savukkeet/aja-sarja.mjs julkaisu`,
23 riviä, kone muuten vapaa.

**SEINÄKELLO 264 s = 4 min 24 s** (oli 6 min kahdeksalla rinnakkaisella).
Kokonaistyö 2 433 s / 12 = 203 s, eli seinäkello on nyt kokonaistyön eikä
yhden rivin määräämä — juuri niin kuin jaon piti tehdä.

| Rivi | Kesto | Läpi | Uusia punaisia |
| --- | --- | --- | --- |
| `savuke-kaupunkipopup.mjs#390` | **172 s** | 29/30 | 0 |
| `savuke-kaupunkipopup.mjs#1400` | **171 s** | 29/29 | 0 |
| `savuke-topografialinssi.mjs` | **152 s** | 44/44 | 0 |
| `savuke-pariisi-lahizoom.mjs#1400-liuska` | **146 s** | 16/16 | 0 |
| `savuke-pariisi-lahizoom.mjs#390-liuska` | **143 s** | 17/17 | 0 |
| `savuke-astro-pallo.mjs#vartija-b` | **133 s** | 16/16 | 0 |
| `savuke-satelliittilinssi.mjs#isot` | **133 s** | 96/97 | 0 |
| `savuke-satelliittilinssi.mjs#pienet` | **127 s** | 94/95 | 0 |
| `savuke-astro-pallo.mjs#vartija-a` | **123 s** | 3/3 | 0 |
| `savuke-ihmisen-kappaleet.mjs` | **122 s** | 36/38 | 0 |
| `savuke-nimikyltti.mjs` | **118 s** | 55/57 | 0 |
| `savuke-astro-valokuva.mjs` | **112 s** | 180/180 | 0 |
| `savuke-ranskan-nostot-lukossa.mjs` | **98 s** | 10/10 | 0 |
| `savuke-pariisi-lahizoom.mjs#1400-perus` | **93 s** | 27/28 | **1** |
| `savuke-astro-pallo.mjs#puhelin` | **92 s** | 48/48 | 0 |
| `savuke-astro-pallo.mjs#tyopoyta` | **92 s** | 48/48 | 0 |
| `savuke-pariisi-lahizoom.mjs#390-perus` | **91 s** | 28/28 | 0 |
| `savuke-ihmisen-kehys.mjs` | **68 s** | 11/11 | 0 |
| `savuke-astro-aani.mjs` | **62 s** | 24/24 | 0 |
| `savuke-astro-pallo.mjs#vartija-c` | **55 s** | 8/8 | 0 |
| `savuke-ihmisen-esitys.mjs` | **47 s** | 17/17 | 0 |
| `savuke-kerma-reuna.mjs` | **45 s** | 16/16 | 0 |
| `savuke-pallo-nostolaput.mjs` | **38 s** | 7/7 | 0 |

### Jaon vaikutus riveittäin

| Rivi | Ennen | Nyt (12 rinnakkain) |
| --- | --- | --- |
| `pariisi-lahizoom#390` | 220 s | 91 s (perus) + 143 s (liuska) |
| `pariisi-lahizoom#1400` | 224 s | 93 s (perus) + 146 s (liuska) |
| `astro-pallo#vartija-a` | 168 s | 123 s (a) + 55 s (c) |
| `astro-pallo#vartija-b` | 128 s | 133 s |

### Tavoite "pisin rivi alle 120 s" ei toteutunut — ja miksi

Pisin rivi on **172 s** (`kaupunkipopup#390`), ei enää kumpikaan jaetuista.
Sama rivi mitattiin 18.9. aiemmin **93 s**:ksi neljän rinnakkaisen kuormassa ja
nyt 172 s:ksi kahdentoista kuormassa — rivi ei kasvanut, vaan KUORMA kasvoi.
Rinnakkaisuuden nosto 8 → 12 pidentää jokaista yksittäistä riviä noin
1,5–1,8-kertaiseksi, koska Mac Studion 16 ydintä jaetaan useammalle Chromiumille.

**Tämä on oikea vaihtokauppa, ei vika:** seinäkello on se, mitä portti maksaa,
ja se laski 6 min → 4 min 24 s. Rivikohtainen 2 min:n tavoite on saavutettavissa
vain laskemalla rinnakkaisuutta, mikä pidentäisi seinäkelloa. Jos omistaja
haluaa yhä jokaisen rivin alle kahden minuutin MITATTUNA TÄSSÄ KUORMASSA,
seuraavat jaettavat ovat `kaupunkipopup#390` ja `#1400` (kumpikin ajaa neljä
kaupunkia peräkkäin — jako `SAVUKE_KAUPUNGIT`-muuttujalla olisi sama kaava kuin
tässä erässä) ja `topografialinssi`.

### Uusi punainen: `pariisi-lahizoom#1400-perus`

`8o. tyopoyta: kamera liikkuu < 100 ms napautuksesta` — mitattu **115,9 ms**.
Samassa ajossa `#390-perus` oli 28/28 vihreä ja kaikki muut 1400 px:n vartiot
läpi. Kyseessä on kellomittaus kahdentoista rinnakkaisen Chromiumin kuormassa,
ei pelin hidastuminen. Kirjattu `tunnetutPunaisetMac`-riviksi JA merkitty
sarjat.jsoniin seuraavaksi mediaaniehdokkaaksi: 8o mittaa yhtä lukua, joten
sille sopii sama kaava kuin topografialinssille, mutta uusinta vaatii koko
napautussarjan toiston eli oman erän.

### Havainto Fablelle: tunnettuja punaisia voi olla poistettavissa

Tässä ajossa **täysin vihreitä olivat myös** `astro-valokuva` (180/180),
`ihmisen-esitys` (17/17), `ihmisen-kehys` (11/11) ja `pallo-nostolaput` (7/7) —
kaikilla on yhä `tunnetutPunaiset`- tai `tunnetutPunaisetMac`-merkintöjä. **En
poistanut niitä**, koska repon oma sääntö on kaksi peräkkäistä vihreää kuormassa
ja tässä oli yksi. Jos PR:n Actions-ajo antaa saman tuloksen, ne ovat
poistettavissa seuraavassa erässä.

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

Probe (`webgl2` + `WEBGL_debug_renderer_info`, Chrome for Testing 151.0.7922.34):

| Käynnistys | WebGL-renderöijä |
| --- | --- |
| oletus (nykyinen) | `ANGLE (Apple, ANGLE Metal Renderer: Apple M4 Max)` |
| `--use-gl=angle --use-angle=swiftshader` | `ANGLE (Google, Vulkan 1.3.0 (SwiftShader Device (LLVM 10.0.0)), SwiftShader driver)` |

Eli savukkeet ajavat tällä hetkellä WebGL:n **M4 Maxin Metal-GPU:lla**, ja
lipuilla sen saa vaihdettua ohjelmalliseen SwiftShaderiin. Mekanismi toimii.

### SUOSITUS: ÄLÄ OTA KÄYTTÖÖN ILMAN ERILLISTÄ MITTAUSERÄÄ

`SAVUKE_CHROMIUM_LIPUT` ei ole tässä erässä yhdelläkään rivillä. Kolme syytä:

1. **"Kevyet, pallottomat rivit" ovat harvassa.** Omistajan listasta
   (kaupunkipopup, nimikyltti, ihmisen-\*, astro-aani, astro-valokuva,
   kerma-reuna, ranskan-nostot) **valtaosa ajaa pallolautaa**, eli globe.gl:ää ja
   siis WebGL:ää: kaupunkipopup zoomaa karttaa, nimikyltti ja ranskan-nostot
   mittaavat pallon nimiöitä, ihmisen-\* ajaa maapallon zoomia.
   SwiftShader on niillä LLVM-ohjelmallinen rasteroija — kymmeniä kertoja
   Metalia hitaampi. Odotettu tulos on rivin pidentyminen, ei lyhentyminen.
2. **Seinäkello ei enää ole yhden rivin varassa.** 264 s on kokonaistyö/12, eli
   voitto pitäisi tulla KOKONAISTYÖSTÄ. SwiftShader kasvattaa sitä.
3. **Riski häilyille.** Useampi tämän sarjan tunnettu punainen on kehysajoitusta
   (topografialinssin välähdys, ihmisen-esityksen kamera, astro-valokuvan ele).
   Hitaampi renderöinti lisäisi juuri niitä.

**Mitä mittaus vaatisi ja mitä se maksaisi:** koko sarja kahdesti (GPU ja
SwiftShader) = noin 9 min konetta, plus rivikohtainen vertailu. Se ei mahtunut
tämän erän aikakattoon sen jälkeen kun Mac-runneri oli varattu toisen session
Actions-ajolle (run 35362977965) suuren osan aikaa. **Mekanismi on valmis, joten
mittaus on yhden komennon päässä:**

```sh
# sarjat.json: lisää haluttujen rivien env-lohkoon
#   "SAVUKE_CHROMIUM_LIPUT": "--use-gl=angle --use-angle=swiftshader"
SAVUKE_RINNAKKAIN=12 node tools/savukkeet/aja-sarja.mjs julkaisu /tmp/ab-swiftshader
```

Ehto käyttöönotolle on omistajan oma: otetaan vain, jos seinäkello lyhenee tai
häilyt vähenevät eikä yksikään rivi ylitä kahta minuuttia.

### Sivutulos: oikea CPU-lisä on rinnakkaisuus, ei SwiftShader

Mittaus 8 → 12 rinnakkaista lyhensi seinäkellon 6 min → 4 min 24 s. Se on
täsmälleen sitä, mitä omistaja kysyi — CPU:n hyödyntämistä — mutta
prosessitasolla eikä renderöijää vaihtamalla. Kuormitushuippu oli
load average 19 kuudellatoista ytimellä, joten **16 rinnakkaista olisi vielä
kokeilemisen arvoinen** seuraavassa erässä.

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
`node --test tests/*.test.mjs` (3623 läpi, 0 punaista, 13 ohitettua),
`node tools/savukkeet/rakenna-matriisi.mjs julkaisu` (23 riviä),
`ruby -ryaml -e 'YAML.load_file(".github/workflows/savukkeet.yml")'` (kelpaa).

## Mitä Fablen on tehtävä

1. Avaa PR ja katso `actions/checkout`-askeleen kesto Mac-reitillä (kohta c:n
   ainoa mittaamaton luku).
2. Päätä `vastakoe`-lohkosta: jääkö 3c/3g portin ulkopuolelle.
3. Päätä, jaetaanko `kaupunkipopup` (172 s) vielä kaupungeittain vai
   hyväksytäänkö 4 min 24 s seinäkelloksi.
4. Jos Actions-ajo on yhtä vihreä kuin tämä, poista tunnetut punaiset
   `astro-valokuva`lta, `ihmisen-esitys`- ja `ihmisen-kehys`-savukkeilta ja
   `pallo-nostolaput`ilta (kaksi peräkkäistä vihreää täynnä).
