# Koko pallon reliefi — navat mukaan

Viesti Fablelle/omistajalle 16.9.2026 (Opus-agentti). Tämä on RAPORTTI,
ei ohjedokumentti: se ei vaadi riviä Raamatun ohjedokumenttikartalle
(docs/raportit/ on kartan ulkopuolella, `tests/dokumentit.test.mjs`).

Omistajan kysymys 16.9.2026 klo 11.05 UTC, sanatarkasti: *"onhan
tarkemmassa topografia ajossa myos pohjois ja etelanavat mukana, etta ei
tule tyhjia kohtia niihin?"* — ja päätös kortilla: *"Kyllä, koko pallo
1′-datasta."* (Raamattu, ASTRONAUTIN KAMERA, LISÄYS 5.)

## 1. Miksi navat puuttuivat

Pallon tekstuuri on tähän asti syntynyt KAHDESSA vaiheessa:

1. `tools/tee-reliefikartta.mjs` projisoi korkeusruudukon **pelin laudan
   Milleriin**, joka ulottuu vain 76 °N…58 °S.
2. `tools/tee-pallotopografia.mjs` projisoi sen kuvan takaisin
   tasaväliseksi palloa varten.

Kaikki laudan ulkopuolinen — koko Etelämanner ja pohjoisin Jäämeri — jää
siinä ketjussa **alfaltaan nollaksi**, ja `js/linssit/satelliitti-avaruus.js`
maalaa reikiin generoidun napajään (`JAAN_VARI`, `JAAVYOHYKE` 64…78).
Se on vyöhykeväri, joka ei tiedä pituuspiiristä mitään: Etelämanner on
sillä valkoinen soikio ilman rantaviivaa.

## 2. Uusi työkalu: `tools/tee-pallotopografia-koko.mjs`

Ei käy laudan kautta lainkaan. Lukee saman 1′-korkeusruudukon
(`tools/hae-korkeusruudukko.mjs` → 10°-palat R2:sta) ja maalaa siitä
**suoraan tasavälisen kuvan navasta napaan**, samoilla väriasteikoilla,
samalla varjostuksella ja samoilla merisyvyyksillä kuin juliste.

```bash
# Koko ajo (Macilla; oletukset ovat nämä)
node tools/tee-pallotopografia-koko.mjs \
  --kaariminuutit 1 --leveys 8192 --lohko 512 --laatu 76 --tunniste 20260916

# Pieni koeajo ilman verkkoa (3′ tulee repon omasta aineistosta)
node tools/tee-pallotopografia-koko.mjs \
  --leveys 1024 --korkeus 512 --kaariminuutit 3 --lohko 256 --tunniste koe
```

| Lippu | Oletus | Mitä tekee |
| --- | --- | --- |
| `--leveys` | 8192 | Ison kuvan leveys; korkeus on puolet (`--korkeus` syrjäyttää) |
| `--pieni` | 4096 | Pienennetyn version leveys; `0` jättää sen pois |
| `--kaariminuutit` | 1 | Ruudukon tarkkuus (1 = ETOPO1 natiivi, 3 = repon aineisto ilman verkkoa) |
| `--lohko` | 512 | Kaistaleen korkeus kohderiveinä — muistinsäästö, ei vaikuta tulokseen |
| `--laatu` | 76 | WebP-laatu, sama kuin nykyisellä pallokuvalla |
| `--liioittelu` | 12 | Varjostuksen z-kerroin, sama kuin julisteella |
| `--tunniste` | ajopäivä | Tiedostonimen tunniste (VVVVKKPP) |
| `--ulos` | `pallo-topografia-ulos` | Kohdekansio (.gitignoressa) |
| `--korkeuspalat` | — | Paikallinen 1′-palojen kansio (ei verkkoa) |
| `--koekuva` | — | Lisäksi pieni JPEG (≤ 200 kt) raporttia varten |
| `--kuiva` | — | Laskee ja mittaa, ei kirjoita tiedostoja |

Ulos tulee kaksi tiedostoa:

```
topografia-pallo-koko-<tunniste>.webp      8192 × 4096
topografia-pallo-koko-4k-<tunniste>.webp   4096 × 2048
```

### Navat: korkeus + leveysaste → jäävari

`tools/reliefivarit.mjs` (uusi, yhteinen tiedosto julisteen ja pallon
kesken) sisältää värit ja jäälaskun. Sekoitus tehdään **väriin ennen
varjon kertolaskua**, joten jäätiköiden korkeuserot, Transantarktiset
vuoret ja rannikon jäätikköreuna säilyvät muotoina.

- Mannerjää: liuku 62°…70°, katto 0,88 (lähes puhdasta jäätä).
- Merijää: liuku 66°…78°, katto 0,72 — **osittainen tarkoituksella**,
  jotta Etelämantereen rantaviiva erottuu jäästä eikä katoa siihen.
- Jään sävy on SAMA `[236, 240, 244]` kuin linssin generoidulla
  napajäällä; yksikkötesti vartioi, etteivät ne lähde eri teille.

### Muisti: maailma kaistaleina

1′-hila on 21601 × 10801 = 233 miljoonaa solua eli **467 Mt Int16:na ja
933 Mt Float32:na**. Työkalu hakee, varjostaa ja kirjoittaa maailman
`--lohko` kohderiviä kerrallaan; muistissa on kerrallaan yksi kaistale.
Jokaiseen kaistaleeseen lainataan yksi ylimääräinen hilarivi molempiin
päihin, koska varjo lasketaan 3 × 3 -naapurustosta — ilman sitä
kaistaleen rajalle tulisi vaakaviiva, joka näkyisi pallolla renkaana.

**Mitattu:** sama ajo `--lohko 512`, `--lohko 256` ja `--lohko 64`
tuottaa **tavulleen saman tiedoston** (md5 `bece81ba…`). Kaistalejako on
siis näkymätön.

## 3. Koeajon mittaukset (kontti, 3′, 1024 × 512)

```
node tools/tee-pallotopografia-koko.mjs --leveys 1024 --korkeus 512 \
  --kaariminuutit 3 --lohko 256 --tunniste koe
```

| Mitta | Tulos | Vaatimus |
| --- | --- | --- |
| Läpinäkyviä pikseleitä | ei yhtään; tiedosto on RGB-WebP, alfa 255…255 ladattuna | 0 |
| Riviä/pikseliä ilman näytettä | 0 | 0 |
| Maata alueella lat < −70° | **85,9 %** pikseleistä | > 60 % |
| Etelämantereen erottuvuus | keskikirkkaus maalla 223, merellä 181 (**ero 42**) | rantaviiva näkyy |
| Pohjoinen (lat > 70°) | maata 18,4 %, kirkkaus 212 / 204 | — |

Koettimet (sijoittelun tarkistus, kaikki `ok`):

```
Amazonin alanko        rgb( 76,121, 68)  maa
Kongon allas           rgb(141,167, 81)  maa
Tiibetin ylänkö        rgb(163,141,128)  maa
Tyynenmeren keskiosa   rgb( 37, 74,140)  meri
Intian valtameri       rgb( 33, 66,129)  meri
Etelämantereen sisäosa rgb(229,226,224)  jää
Grönlannin jäätikkö    rgb(227,224,223)  jää
Pohjoisnapa (Jäämeri)  rgb(179,193,214)  jää
```

Koekuva: `docs/raportit/kuvat/pallo-navat-koe-1024-20260916.jpg`
(120 kt). Etelämanner on siinä valkoinen mutta **rantaviivallinen**, ja
jäähyllyjen reunat sekä sisämaan korkeuserot näkyvät varjostuksesta.

## 4. Mac-ajo: työnkulun syötteet

`.github/workflows/renderoi-reliefi-macilla.yml` → *Run workflow*:

| Syöte | Arvo |
| --- | --- |
| `kaariminuutit` | **1** |
| `leveys` | 10800 (litteä kartta, ennallaan) |
| `katto` | 12000 |
| `pallo_leveys` | 4096 (vanha pallokuva, ennallaan) |
| `pallo_laatu` | 76 |
| `tunniste` | esim. **20260916** (tyhjä = ajopäivä) |
| **`koko_pallo`** | **true** |
| `koko_leveys` | 8192 |
| `koko_lohko` | 512 (pienennä, jos Macin muisti on tiukalla) |
| `kuiva` | false |

Työnkulku ajaa uuden askeleen *"Koko pallon reliefi (navat mukaan)"*,
listaa tiedostojen koot, mitat ja sha256:t, vie molemmat tiedostot
polkuun `matkakirja/linssit/` (`aws s3 cp`, `cache-control: public,
max-age=31536000, immutable`), tarkistaa HEADilla että osoitteet
vastaavat 200 ja kirjoittaa osoitteet ajon yhteenvetoon. Salaisuuksia ei
tulostu lokiin.

**Odotettavissa** (arvio 3′-koeajosta skaalaamalla; tarkat luvut tulevat
ajon kuitista):

| Tiedosto | Mitat | Arvioitu koko |
| --- | --- | --- |
| `topografia-pallo-koko-<tunniste>.webp` | 8192 × 4096 | ~3–6 Mt |
| `topografia-pallo-koko-4k-<tunniste>.webp` | 4096 × 2048 | ~0,9–1,6 Mt |

Ajoaika: 1′-palat (648 kpl) latautuvat ensimmäisellä kerralla R2:sta,
sen jälkeen varjostus + väritys 233 miljoonalle solulle. Varaa
puolisen tuntia; työnkulun aikakatto on 120 min.

## 5. Kytkentä peliin — VASTA AJON JÄLKEEN

Pelin puoli on valmis mutta **kytkin on pois päältä**
(`js/linssit/satelliitti-avaruus.js`):

```js
export const RELIEFI_KOKO_PALLO = false;   // ← tämä käännetään
export const RELIEFIN_KOKO      = { osoite: '…topografia-pallo-koko-20260916.webp',    leveys: 8192, korkeus: 4096 };
export const RELIEFIN_KOKO_4K   = { osoite: '…topografia-pallo-koko-4k-20260916.webp', leveys: 4096, korkeus: 2048 };
export function valitseReliefi({ kokoPallo = RELIEFI_KOKO_PALLO, tarkka = false }) { … }
```

Kytkentä-PR:ssä (oma pieni PR, versionosto mukana):

1. Tarkista ajon kuitista **tunniste** ja päivitä se molempiin
   osoitteisiin, jos se ei ole `20260916`.
2. Käännä `RELIEFI_KOKO_PALLO = true`.
3. Päivitä testi *"koko pallon reliefi on VALMIS mutta EI vielä
   kytketty"* vastaamaan uutta tilaa
   (`tests/satelliitti-avaruus.test.mjs`).
4. Katso pallo 390 px:n ja 1400 px:n leveydellä: Etelämantereen
   reunaviivan on erotuttava.

Kun kytkin on tosi, `reliefiTekstuuri` **ohittaa napojen häivytyksen**
(`napaLiuku`) — jää tulee kuvasta, ja häivytys söisi juuri sen
rantaviivan, jonka takia kuva tehtiin. Generoitu Maa jää yhä pohjalle
vakuudeksi, mutta koko pallon kuva peittää sen kokonaan. Valon
vastakaava (`VALON_KOMPENSAATIO`) toimii ennallaan molemmilla kuvilla.

Peli lataa oletuksena **4k-version**: 8192 × 4096 olisi kankaana 134 Mt
RGBA:na eikä puhelin sitä kestä. Iso jää työpöydän varaan, jos zoomia
joskus jatketaan (`valitseReliefi({ kokoPallo: true, tarkka: true })`).

## 6. Muut muutokset tässä PR:ssä

- **`tools/reliefivarit.mjs` (uusi)**: hypsometriset asteikot, meren
  syvyysasteikko, metrin hakutaulu, varjokalvon kertoimet ja napajää
  yhdessä paikassa. `tools/tee-reliefikartta.mjs` tuo ne nyt täältä
  (luvut eivät muuttuneet — koeajon koettimet antavat tavulleen samat
  värit kuin ennen siirtoa).
- **`tools/varjostus.mjs`**: uusi valinnainen asetus `lat0` (oletus
  −90), jotta kaistaleen voi varjostaa omana ruudukkonaan oikeilla
  leveyspiireillä. Koko maailman ajot eivät muutu.
- **`.gitignore`**: `pallo-topografia-ulos/` — megatavujen kuvat eivät
  kuulu repoon.

Ei versionostoa: peliin ei tullut käytössä olevaa muutosta, vain työkalu
ja työnkulku. Versio nostetaan kytkentä-PR:ssä.
