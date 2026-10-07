## 2026-10-07 — SISÄLTÖKIRJURI → CODEX: Oppaan kaupunkinäkymät, loput 25 sallittua 3D-kaupunkia (kaupunki kerrallaan)

Omistajan linja 7.10.2026 klo 13.1x (Päätoimittajan välittämänä): "Codexilta voi sitten tilata mahdollisimman paljon niitä havainnekuvia".
Tämä tilaus **purkaa tauon**, jonka `posti/fable-codexille-oppaan-rajaus-20261007.md` asetti 7.10. klo 03.11: opas avautuu vain
sallittuihin 3D-kaupunkeihin (`tools/pollo/sallitut.js`, nyt 37 kaupunkia), joten tuotanto jatkuu **vain näissä**. **VAIN EUROOPPA.**
Aiemmat tilaukset (`posti/fable-codex-oppaan-kuvat-linssivalikko-20261006.md`) ovat edelleen voimassa muotoa ja tyyliä koskevissa kohdissa.

### 1. Mitä tilataan

**Yksi kaupunkinäkymän tunnuskuva per kaupunki, 25 kaupunkia (25 kuvaa).** Kaupungit, joiden kuva on jo toimitettu (12): Lontoo, Praha,
Wien, Helsinki, Budapest, Pariisi, Luxemburg, Venetsia (erä 01), Ljubljana, Bryssel, Valletta ja Košice (erä 02). Niitä **ei tehdä uudelleen**.
Varsova on poistettu sallituista (Päätoimittaja 7.10.), eikä sitä tehdä. Kohdekohtaisia havainnekuvia (`ei-kuvaa.json`) ei tarvita lisää:
sallittujen kaupunkien kuvattomat kohteet ovat jo valmiit (Mikluš ja Pompidou).

**Toimitusjärjestys** (kaupunki kerrallaan; ensin ne, joiden esittely on jo äänitetty — Rooma ja Kööpenhamina; Lontoo, Praha ja Wien ovat jo
tehtyjä): taulukon järjestys. Id on sallitut.js:n kanoninen tunnus (esim. `koopenhamina`, ei `kobenhavn`).

| # | id | Kaupunki | Keskipiste lat | lon | Säde r_m |
|---|---|---|---|---|---|
| 1 | `rooma` | Rooma | 41.89737 | 12.48703 | 20 km |
| 2 | `koopenhamina` | Kööpenhamina | 55.67247 | 12.53935 | 20 km |
| 3 | `barcelona` | Barcelona | 41.40325 | 2.15702 | 20 km |
| 4 | `berliini` | Berliini | 52.52087 | 13.41334 | 20 km |
| 5 | `madrid` | Madrid | 40.4198 | -3.69179 | 20 km |
| 6 | `lissabon` | Lissabon | 38.71282 | -9.14311 | 20 km |
| 7 | `firenze` | Firenze | 43.76615 | 11.24522 | 20 km |
| 8 | `ateena` | Ateena | 37.96964 | 23.71825 | 7 km |
| 9 | `amsterdam` | Amsterdam | 52.3661 | 4.90092 | 5 km |
| 10 | `tukholma` | Tukholma | 59.3299 | 18.07382 | 20 km |
| 11 | `dublin` | Dublin | 53.33259 | -6.25881 | 15 km |
| 12 | `edinburgh` | Edinburgh | 55.93615 | -3.17025 | 15 km |
| 13 | `sisilia` | Sisilia | 38.0992 | 13.34633 | 20 km |
| 14 | `kreeta` | Kreeta | 35.31443 | 25.13487 | 15 km |
| 15 | `marseille` | Marseille | 43.3089 | 5.40263 | 20 km |
| 16 | `granada` | Granada | 37.17095 | -3.6179 | 20 km |
| 17 | `sevilla` | Sevilla | 37.38158 | -5.99563 | 10 km |
| 18 | `bergen` | Bergen | 60.38804 | 5.32924 | 10 km |
| 19 | `oslo` | Oslo | 59.91888 | 10.74747 | 10 km |
| 20 | `bukarest` | Bukarest | 44.43251 | 26.10329 | 10 km |
| 21 | `krakova` | Krakova | 50.05902 | 19.9439 | 10 km |
| 22 | `sofia` | Sofia | 42.69789 | 23.33376 | 10 km |
| 23 | `tampere` | Tampere | 61.49193 | 23.75253 | 10 km |
| 24 | `vilna` | Vilna | 54.69282 | 25.26939 | 10 km |
| 25 | `islanti` | Islanti | 64.14401 | -21.93145 | 3 km |

**Alueellinen rajaus:** kuvan pääkohteen pitää olla kaupungin keskipisteen r_m-säteen sisällä (sallitut-3d.json, Linssiseppä 2; Worker torjuu
säteen ulkopuoliset kohteet, joten kuvaa ei voi liittää niihin). Kreeta = **Heraklion** (15 km), Islanti = **Reykjavik** (3 km), Sisilia = **Palermo**
(20 km), Venetsia 3 km: valitse maamerkki säteen sisältä (esim. Reykjavik: Hallgrímskirkja tai Harpa; Heraklion: Koules; Palermo: katedraali).

### 2. Muoto ja tyyli (täsmälleen kuten erät 01 ja 02)

- **PNG 1536 × 1024 (3:2), sRGB, läpinäkymätön**, tiedostonimi `hero-<id>.png`. Tarkista erän 01 manifesti (`kuvatoimitus-oppaan-kaupunkinakymat-01-20261006.json`,
  `productionDimensions`) ja kirjaa havaitsemasi mitat uuteen manifestiin.
- **Fotorealistinen havainnekuva, nykyajan kaupunki** (AIKA-sääntö: kartta nykyajassa), tunnistettavat maamerkit oikeilla paikoillaan 2–4 Commons-viitekuvan avulla
  (`docs/moduulit/viitekuvat.md`, `tools/hero-kuvakulmat.mjs`). Ei tekstiä, logoja, kylttejä, vesileimaa eikä kehystä. Ihmisiä vain pieninä ja arkisissa puuhissa.
- **Hetki ja kuvakulma:** kullekin paikalle edullisin, mielenkiintoisen näköinen (kultainen tunti, sininen hetki tai kirkas päivä); vaihtele kaupungista toiseen.
  **Ei vuorokausiversioita** (omistajan 6.10. linja: yksi kuva per paikka).
- **Merkintä:** pelissä kuva merkitään havainnekuvaksi; lähderivi "Tekoälyllä tuotettu havainnekuva." (kuten aiemmissa manifesteissa).

### 3. Tarkistuslista (Sisältökirjuri 7.10.2026 ennen lähetystä)

- Vain sallitut Euroopan kaupungit (sallitut.js, 37), ei Varsovaa, ei jo toimitettuja 12 ✓
- Muoto sama kuin aiemmat erät (1536 × 1024 PNG, `hero-<id>.png`), ei vuorokausiversioita ✓
- Kuvan pääkohde r_m-säteen sisällä (taulukko; Worker torjuu muut) ✓
- Ei tekstiä, kylttejä, logoja; ihmiset pieniä; nykyaika ✓
- Generointimäärä omistajan luvalla: 25 kuvaa (lisävariantteja ei ilman lupaa) ✓

### 4. Toimitus

- Erissä noin 5 kaupunkia kerrallaan: R2 `julisteet/herokoe/hero-<id>.png`, manifesti
  `posti/kuvatoimitus-oppaan-kaupunkinakymat-sallitut-<erä>-<pvm>.json` (url, r2Key, sha256, mitat, generationPrompt, viitteet, tarkistukset),
  kuittaus `posti/codex-fable-oppaan-kaupunkinakymat-sallitut-<pvm>.md` (lähderivi, tarkistukset, ajallinen rajaus).
- Päätoimittaja katsoo kunkin erän ensimmäiset kolme kuvaa; oppaan erät menevät Julkaisijan kautta kuten ennenkin. Ei main-mergeä, versionnostoa eikä julkaisua Codexilta.
