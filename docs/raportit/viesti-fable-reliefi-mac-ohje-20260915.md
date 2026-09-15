# Reliefikartan tarkempi renderöinti omistajan Macilla

Viesti Fablelle/omistajalle 15.9.2026 (Sonnet-agentti, ASTRONAUTIN KAMERA
-tehtävän osa 4). Tämä on RAPORTTI, ei ohjedokumentti — se ei siis vaadi
riviä Raamatun ohjedokumenttikartalle (docs/raportit/ on kartan
ulkopuolella, tests/dokumentit.test.mjs).

Omistajan pyyntö 15.9.2026 klo 11.30 UTC, sanatarkasti: *"Taman
topografialinssin voisi renderoida paremmalle tarkkuudelle. Sen varmaan
saa tehtya minun Macilla, niin ei vie tokeneita."*

## 1. Mitä ollaan parantamassa — kaksi kuvaa, yksi lasku

| Kuva | Työkalu | Käyttö | Nykyinen koko |
| --- | --- | --- | --- |
| `assets/linssit/topografia.webp` | `tools/tee-reliefikartta.mjs` | Litteän kartan Topografia-linssi (Miller-projektio, koko lauta) | 3600 px leveä, ~1019 kt |
| `assets/linssit/topografia-pallo.webp` | `tools/tee-pallotopografia.mjs` | Astronautin kamera -linssin karttapallon tekstuuri (uudelleenprojisoitu edellisestä) | 4096 px leveä |

**Jälkimmäinen on riippuvainen edellisestä.** `tee-pallotopografia.mjs`
ottaa lähteekseen `topografia.webp`:n ja projisoi sen uudelleen tasaväliseksi
(equirectangular) palloa varten. Sen omassa lähdekoodissa on suoraan
sanottu, miksi isompi `--leveys` ei tällä hetkellä auttaisi:

> "Lähtökuva on 3600 pikseliä leveä kokonaiselle kierrokselle, joten 4096
> ei lisää tietoa."

Eli: **jos halutaan terävämpi pallo, litteä kartta on tehtävä uudelleen
ENSIN paremmalla tarkkuudella**, ja vasta sen jälkeen pallo-kuva
uudelleenprojisoidaan siitä.

## 2. Nykyinen lähde: ETOPO1, mutta vain osittain käytössä

`tools/hae-korkeusruudukko.mjs` hakee **NOAA NGDC ETOPO1 Global Relief
Model** -aineiston (public domain), joka on natiivisti **1
kaariminuutin** (1′ ≈ 1,85 km päiväntasaajalla) tarkkuudella. Työkalun
oma OLETUS on kuitenkin `ruutu: 0.05°` (3′) — eli reliefikartta on tähän
asti renderoitu KOLMASOSALLA siitä tarkkuudesta, joka samasta datasta on
jo saatavilla ILMAN yhtään koodimuutosta tai uutta latausta.

**Tämä on siis ensimmäinen ja halvin parannus**: lippu
`--kaariminuutit 1` (tai `--ruutu 0.016667`) hakee saman ETOPO1-aineiston
natiivilla tarkkuudella. Työkalu tukee tätä valmiiksi
(`tools/hae-korkeusruudukko.mjs`, ks. `--kaariminuutit 1|3`).

### Jos halutaan mennä ETOPO1:tä tarkemmaksi

Kaksi vaihtoehtoa, jotka omistaja mainitsi:

- **ETOPO 2022 15 kaarisekuntia** (0,25′, 4× ETOPO1:tä tarkempi).
  NOAA:n uudempi malli, ladattavissa NOAA:n omalta NCEI-palvelimelta
  (Bedrock- ja Ice Surface -versiot, GeoTIFF- tai NetCDF-ruudukkoina,
  alueittain tai koko maailmana).
- **GEBCO 2024** (15 kaarisekuntia, painottuu merenpohjaan mutta
  kattaa maan pinnan myös): yksi ~7 Gt:n NetCDF-tiedosto GEBCOn omalta
  sivustolta, tai alueittaiset palat.

**Näitä EI tueta `hae-korkeusruudukko.mjs`:ssä nyt.** `LAHTEET`-vakio
kuvaa vain ETOPO1:n, ja hakufunktio (ERDDAP-osoite, netCDF-jäsennys)
on kirjoitettu juuri sille rajapinnalle. Muutos EI ole pieni — se
vaatisi:

1. uuden latausosoitteen ja -muodon (ERDDAP-taulukko vs. suora
   GeoTIFF/NetCDF-tiedosto — eri palvelut, eri rajapinta),
2. mahdollisesti eri koordinaattijärjestyksen tai ruudukon
   suunnan (ETOPO1:n lukija olettaa tietyn rivi/sarake-järjestyksen),
3. uuden `LAHTEET`-merkinnän (tekijä, lisenssi, haettu-päivä) ja
   testien päivityksen.

**Suositus: ÄLÄ tee tätä ensin.** ETOPO1 1′ natiivina on jo kolme
kertaa tarkempi kuin nykyinen tuotos, ja se onnistuu olemassa olevalla
komennolla. Jos 1′ ei riitä silmämääräisesti (esim. Alppien tai
Andien lähikuvassa), GEBCO/ETOPO2022-tuki kannattaa tehdä omana
tehtävänään — ei osana tätä renderöintiajoa.

## 3. Suositeltu leveys: 10800 px (ei 8192)

`tee-reliefikartta.mjs`:n oma kommentti selittää nykyisen 3600 px:n
valinnan: 0,05° ruudukolla (silloinen oletus) osuu noin **4 ruutua per
kuvapikseli**, eli kuva on jo nyt keskiarvoistettu, ei terävämpi kuin
data sallii. Isompi leveys SAMALLA datalla ei tuo lisätietoa — se vain
suurentaa tiedostoa.

Kun ruudukko haetaan `--kaariminuutit 1` (3× tarkempi kuin 0,05°),
sama "~4 ruutua per pikseli" -suhde säilyy, kun leveys skaalataan
samassa suhteessa:

```
3600 px × (0,05° / (1/60)°) = 3600 × 3 = 10800 px
```

**10800 px on siis matemaattisesti perusteltu**, ei arvaus — se pitää
täsmälleen saman keskiarvoistussuhteen kuin nykyinen kuva, mutta uudella
kolme kertaa tarkemmalla datalla. 8192 px (owner mainitsi
vaihtoehtona) olisi hieman terävämpi per pikseli (~2,25 ruutua/pikseli)
mutta ei GPU:n kahden potenssiin osu tälle kuvalle mitenkään
merkityksellisesti (se ei ole tekstuuri kolmiulotteiselle pinnalle
tässä kohdassa — se on litteä webp), niin 10800 on suositus.

**Pallon oma tekstuuri (`topografia-pallo.webp`) pysyy 4096 px:ssä.**
`js/linssit/satelliitti-avaruus.js` on jo mitannut tarkasti (12.9.2026,
puhelimen lähin zoomaus), että 4096 px on pikselintarkka pallon
suurimmalle näytetylle halkaisijalle (1518 px, kehä ≈ 4770 px 360°:lle,
venymä 1,16×). Isompi lähdekuva (10800 px flat) antaa
`tee-pallotopografia.mjs`:lle enemmän AITOA tietoa uudelleenprojisoitavaksi
(vähemmän pehmentymistä), mutta LOPPUTULOKSEN kokoa ei kannata kasvattaa
4096:sta — se ei näkyisi missään näytössä.

## 4. Odotettu tiedostokoko

Nykyinen 3600 px, katto 1200 kt → 1019 kt toteutui. Pikselimäärä
kasvaa 10800/3600 = 3× leveydessä → 9× pinta-alassa. WebP-koko ei
kasva täysin lineaarisesti pikselimäärän kanssa (tasaiset alueet
pakkautuvat tehokkaammin), mutta varovainen arvio on **6–10 Mt**.

**Aseta `--katto` reilusti ylös** (esim. `--katto 12000` = 12 Mt) ja
katso ajon lopussa tulostuva toteutunut koko ja laatu — työkalu hakee
parhaan laadun, joka mahtuu kattoon (binäärihaku, `PYTHON`-lohko
tiedostossa). Jos toteutunut koko on omistajan mielestä liian suuri
pelin lataukseen (sw.js esilataa tämän), --katto voi pienentää sitä
tinkimällä laadusta — kokeile 8000 → 6000 jne.

## 5. Esivalmistelut Macilla

```bash
# Node 22 (samat versiot kuin CI:ssä)
node --version   # varmista v22.x

# Riippuvuudet
npm ci
```

**HUOMIO — puuttuva riippuvuus löytyi tätä ohjetta kirjoittaessa:**
`tools/tee-pallotopografia.mjs` tuo npm-paketin `sharp`, mutta se EI
ole `package.json`:ssa eikä `package-lock.json`:ssa. `npm ci` EI siis
asenna sitä, ja komento kaatuu `Cannot find module 'sharp'`. Asenna se
erikseen kerran:

```bash
npm install sharp
```

(Tämä kannattaisi lisätä `package.json`:iin jonain toisena kertana —
tässä raportissa se on vain kirjattu, ei korjattu, koska se ei kuulu
tämän tehtävän piiriin ja rinnakkaiset agentit muokkaavat
`package.json`:ia todennäköisesti muualtakin käsin juuri nyt.)

`tools/tee-reliefikartta.mjs` pakkaa lopputuloksen WebPiksi Pythonin
Pillow'lla (Node ei osaa kirjoittaa WebPiä). Tarvitaan:

```bash
python3 --version   # macOS: yleensä valmiina
python3 -m pip install --user numpy pillow
```

**Verkko:** Macilla ei tarvita `NODE_USE_ENV_PROXY=1` (se on vain
konttiympäristön HTTPS_PROXY-kierrossa) — Macilla Noden oma `fetch`
toimii suoraan.

## 6. Ajokomennot

```bash
cd matkakirja   # repon juuri

# 1. Litteä kartta (Topografia-linssi), ETOPO1 natiivilla 1' tarkkuudella,
#    leveys 10800, katto 12 Mt. Ensimmäinen ajo lataa korkeusruudukon
#    verkosta (voi kestää muutaman minuutin) ja tallentaa sen
#    tmp-välimuistiin — toistoajo on nopea.
node tools/tee-reliefikartta.mjs --kaariminuutit 1 --leveys 10800 --katto 12000

# Tarkista tulostus: leveys, ruudukon tarkkuus, toteutunut koko ja laatu
# tulostuvat ajon lopuksi. Kuva kirjoittuu assets/linssit/topografia.webp
# JA js/packs/linssi-topografia-kuva.js päivittyy koneellisesti (lähde,
# haettu-päivä, koko).

# 2. Pallon tekstuuri UUDESTAAN edellisestä (sama 4096, ei muutu —
#    perustelu kohdassa 3), jotta se saa hyödyn tarkemmasta lähteestä.
node tools/tee-pallotopografia.mjs --leveys 4096 --laatu 76

# --kuiva testaa molemmat kirjoittamatta mitään levylle, jos haluat
# nähdä luvut ensin:
node tools/tee-reliefikartta.mjs --kaariminuutit 1 --leveys 10800 --katto 12000 --kuiva
```

Katso lopuksi molemmat kuvat silmämääräisesti (esim. `open
assets/linssit/topografia.webp` ja Topografia-linssi pelissä,
Astronautin kamera -linssin karttapallo) ennen vientiä eteenpäin.

## 7. Media EI mene repoon — R2:een

CLAUDE.md-sääntö: kuvat ja media eivät kuulu repoon (historia
paisuisi). **Molemmat uudet tiedostot viedään R2:een reposta
poistamisen sijaan** — nykyiset tiedostot `assets/linssit/*.webp` OVAT
tällä hetkellä repossa (vanha käytäntö tälle yhdelle linssiparille), ja
niiden siirto pois repossa olevasta R2-osoitteeseen on juuri se, mitä
tämä tehtävä pyytää.

Kohdeosoite (omistajan antama):

```
https://media.matkakirja.app/matkakirja/linssit/topografia-<pvm>.webp
```

jossa `<pvm>` on ajopäivä muodossa `VVVVKKPP`, esim.
`topografia-20260915.webp`. Vie sekä litteä kartta (`topografia.webp`)
että pallon tekstuuri (`topografia-pallo.webp`) omilla nimillään saman
kaavan mukaan, esim. `topografia-pallo-20260915.webp`.

**Vientitapa** (samat R2-tunnukset kuin muualla projektissa —
`R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET`,
`R2_ACCOUNT_ID`; ks. docs/moduulit/laattapyramidi.md luku 10b):

```bash
aws s3 cp assets/linssit/topografia.webp \
  s3://$R2_BUCKET/matkakirja/linssit/topografia-20260915.webp \
  --endpoint-url https://$R2_ACCOUNT_ID.r2.cloudflarestorage.com \
  --content-type image/webp

aws s3 cp assets/linssit/topografia-pallo.webp \
  s3://$R2_BUCKET/matkakirja/linssit/topografia-pallo-20260915.webp \
  --endpoint-url https://$R2_ACCOUNT_ID.r2.cloudflarestorage.com \
  --content-type image/webp
```

(Jos Macilla on käytössä Wrangler CLI R2-tunnusten sijaan:
`wrangler r2 object put <bucket>/matkakirja/linssit/topografia-20260915.webp --file=assets/linssit/topografia.webp` toimii yhtä hyvin.)

## 8. Osoitteiden vaihto koodissa

Kaksi vakiota osoittavat nyt repon omaan polkuun ja on vaihdettava
R2-osoitteeseen:

```js
// js/packs/linssi-topografia-kuva.js — TÄMÄ TIEDOSTO ON KONEEN
// KIRJOITTAMA (tools/tee-reliefikartta.mjs). Jos ajat työkalun
// uudelleen R2-osoitteella (ei ole tuettu suoraan — työkalu kirjoittaa
// aina repo-suhteellisen polun), muokkaa rivi käsin ajon JÄLKEEN:
export const SUHTEELLINEN = 'https://media.matkakirja.app/matkakirja/linssit/topografia-20260915.webp';
```

```js
// js/linssit/satelliitti-avaruus.js
export const RELIEFIN_OSOITE = 'https://media.matkakirja.app/matkakirja/linssit/topografia-pallo-20260915.webp';
```

Tarkista myös `tools/tee-pallotopografia.mjs`:n oma `KOHDE`-vakio (se
kirjoittaa aina paikalliseen `assets/linssit/topografia-pallo.webp`
-tiedostoon ajossa) — pallo-osoite vaihdetaan `satelliitti-avaruus.js`:ään
käsin ajon jälkeen samalla tavalla kuin yllä, EI työkalun sisällä.

**Kun molemmat osoittavat R2:een, poista paikalliset tiedostot
repository:sta** (`git rm assets/linssit/topografia.webp
assets/linssit/topografia-pallo.webp`) — CLAUDE.md:n säännön mukaan
media ei kuulu repoon, ja tämä on juuri se korjaus.

## 9. sw.js:n välimuistilista

`sw.js` esilataa nämä tiedostot tällä hetkellä repo-suhteellisina
poluina (rivit sisältävät `./assets/linssit/topografia.webp` ja
`./assets/linssit/topografia-pallo.webp`, tarkistettu `grep -n
topografia sw.js`). Kun osoitteet vaihtuvat R2:een:

1. **Poista molemmat rivit** `SHELL`-listalta (paikallista tiedostoa ei
   enää ole, service worker ei voi esilatailla sitä repo-polusta).
2. **R2-kuvia EI lisätä SHELL-listalle sellaisenaan** — service worker
   esilataa vain SAMAN ORIGINin tiedostot listalla ilman erillistä
   `fetch`-käsittelyä; ulkoinen origin (media.matkakirja.app) tarvitsee
   oman `fetch`-käsittelijän reitityksen (sw.js:ssä on tähän jo malli
   muille R2-kuville — etsi `event.request.url.includes(...)` tai
   vastaava lohko ja lisää polku sen listalle, JOS sitä ei jo ole
   yleisenä sääntönä `media.matkakirja.app`-alkuisille pyynnöille).
3. Tarkista `tests/*.test.mjs`-tiedostoista, vaatiiko jokin testi
   näiden polkujen olemassaoloa SHELL-listalla (esim.
   `tests/satelliitti.test.mjs` ei testaa `topografia.webp`:tä, mutta
   `tests/topografia.test.mjs` tai vastaava voi) — päivitä ne samalla.

## 10. Yhteenveto — komennot peräkkäin

```bash
npm ci
npm install sharp        # puuttuu package.json:sta, ks. kohta 5
python3 -m pip install --user numpy pillow

node tools/tee-reliefikartta.mjs --kaariminuutit 1 --leveys 10800 --katto 12000
node tools/tee-pallotopografia.mjs --leveys 4096 --laatu 76

# katso tulokset silmin, sitten:
aws s3 cp assets/linssit/topografia.webp \
  s3://$R2_BUCKET/matkakirja/linssit/topografia-20260915.webp \
  --endpoint-url https://$R2_ACCOUNT_ID.r2.cloudflarestorage.com --content-type image/webp
aws s3 cp assets/linssit/topografia-pallo.webp \
  s3://$R2_BUCKET/matkakirja/linssit/topografia-pallo-20260915.webp \
  --endpoint-url https://$R2_ACCOUNT_ID.r2.cloudflarestorage.com --content-type image/webp

# käsin: päivitä js/packs/linssi-topografia-kuva.js SUHTEELLINEN
# käsin: päivitä js/linssit/satelliitti-avaruus.js RELIEFIN_OSOITE
git rm assets/linssit/topografia.webp assets/linssit/topografia-pallo.webp
# käsin: poista molemmat rivit sw.js:n SHELL-listalta, lisää R2-reititys
```

— Sonnet-agentti (session
https://claude.ai/code/session_01TehnTdSkC74DnzEqcXkynA)
