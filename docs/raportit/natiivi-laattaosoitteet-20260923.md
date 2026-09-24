# Karttalaatat natiivipelille: osoitteet, projektiot ja syvät tasot

Karttaseppä 23.9.2026, 3D-selvittäjälle (Fablen tilaus: natiiviin siirrytään
mahdollisimman pian, laattapoltot jatkuvat, koska natiivi käyttää samoja
laattoja).

## Yhteenveto

- **Käytä pallon sarjaa.** Se on valmiiksi Web Mercator XYZ -muodossa
  (256 px, jpg, z0–z8, koko maailma), eli suoraan Cesiumin/Unityn
  `UrlTemplateImageryProvider`-tyyppinen lähde.
- **Pyramidi on pelin oma Miller-arkki** (512 px, webp, z0–z8). Sitä ei
  tarvitse lukea natiivissa, ellei tarvita erillisiä kerroksia (nostot,
  ranta, nimiöt) läpinäkyvinä.
- **Lähizoomi yli z8:n vaatii uuden polton** (luku 4). Ranska z9–z10 on
  pieni ajo, mutta reliefi ei tarkennu ilman parempaa korkeusmallia.

## 1. Pallon sarja (Web Mercator XYZ) — natiivin pääkerros

| | |
| --- | --- |
| Osoite | `https://media.matkakirja.app/julisteet/pallo/laatat/<kansio>/{z}/{x}/{y}.jpg` |
| Nykyinen kansio | `2026-09-22c-pohja-20260922c` (js/pallo.js `PALLO_LAATTAKANSIO`) |
| Seuraava | `2026-09-23a-pohja-20260923a` (poltto 23a, julkaistaan yhdessä nostotason kanssa) |
| Luettelo | `<kansio>/laatat.json`: `{ versio, viivat, ranta, nostot, tunniste, tasot: { min, max }, laatta: 256, muoto: 'jpg' }` |
| Projektio | EPSG:3857, XYZ (y alas, OSM-järjestys), 256 px |
| Tasot | 0–8 (`laatat.json` `tasot.max`) |
| Kattavuus | koko maailma; julisteen ulkopuoli (yli 84° N, alle 66° S) merisävyllä, napajää jääsävyllä |
| Sisältö | pohja (reliefi, meri, joet, vesiviivat, isobaatit) ilman rantaviivaa, nimiä ja nostoja — ne ovat pelissä eläviä |
| Välimuisti | `cache-control: public, max-age=31536000, immutable` — kansion nimi vaihtuu joka poltossa, samaan polkuun ei kirjoiteta uutta sisältöä |
| CORS | vastauksessa ei ole `access-control-allow-origin`-otsaketta; natiivisovellus ei tarvitse sitä, selainprototyyppi tarvitsee välityksen |

Tason Z pikselitarkkuus on sama kuin pyramidin tasolla Z − 1 (sarja
lasketaan pyramidista, tools/tee-pallolaatat.mjs `LÄHDETASO`). Z8 on siis
pelin tarkin nykyinen kuva, noin 610 m/px päiväntasaajalla ja noin
420 m/px Ranskassa.

Tyypillinen koko: 6–12 kt/laatta (jpg). Ranskan alue z8:lla noin 120 laattaa.

## 2. Pyramidi (Miller) — pelin oma arkki ja kerrokset

| | |
| --- | --- |
| Luettelo | `https://media.matkakirja.app/julisteet/pyramidi/pyramidi.json` |
| Pohja | `julisteet/pyramidi/<pohjaversio>/z<z>/<sarake>/<rivi>.webp` (nyt `2026-09-22c-pohja`) |
| Viivat | `<viivataso.versio>/viivat/z…` (pallo ei käytä) |
| Ranta | `<rantataso.versio>/ranta/z…` (läpinäkyvä rantaviiva) |
| Nimiöt | `<nimiotaso.versio>/nimiot/z…` (tasot 4–8) |
| Nostot | `<nostotasot[ISO].versio>/nostot/<ISO>/z…` (maittain, tasot 5–8) |
| Väri | `varitasot[ISO]`: `…/vari/<ISO>/z…` (maan värilaatasto) |
| Laatta | 512 px, webp (laatu 0,9) |

**Projektio** (luettelon `projektio` ja `arkki`, js/fokusmitat.js
`teeProjektionKaavat`):

```
tyyppi miller, leveys L = 12000 laudan yksikköä = 360°, lon0 = −175°, pohjoinen = 76°
skaala s = L / (2π)
millerY(φ) = −1,25 · ln(tan(π/4 + 0,4 · φ))
x(λ) = ((λ − lon0) rad mod 2π) · s
y(φ) = (millerY(φ) − millerY(76°)) · s
arkki: x0 = 0, y0 = −1046,3149255312064, w = 12000, h = 7307,715927310571
taso z: pikseliä laudan yksikköä kohti = 0,05625 · 2^z
laatan (sarake c, rivi r) vasen yläkulma laudalla:
  x = c · 512 / ppu,   y = arkki.y0 + r · 512 / ppu
```

| z | leveys px | sarakkeet × rivit |
| --- | --- | --- |
| 6 | 43 200 | 85 × 52 |
| 7 | 86 400 | 169 × 103 |
| 8 | 172 800 | 338 × 206 |

Tyypillinen koko z8:lla 40–45 kt/laatta (webp). Jokaisen tason laatasto
(`tasot[z].laatasto`, base64-bittikartta) kertoo, mitkä laatat ovat
olemassa. Umpimeren laatat puuttuvat (404), joten niiden kohdalle
piirretään luettelon `meriSavy`.

## 3. Maalaudat

Maakohtaiset laudat (`FOKUS_LAUTAPROJEKTIOT`, esim. js/packs/fokus-grc.js)
ovat tasakulmaisia (`lonA`, `lonB`, `latA`, `latB`) ja kuuluvat pelin
vanhaan tasokarttaan. Niillä ei ole omaa laattapyramidia. Selvitän
erikseen (Fablen kohta 2), tarvitseeko natiivi niistä mitään; pallon
sarja kattaa saman alueen samalla tarkkuudella.

## 4. Tuleva poltto: Ranska z9–z10 (lähizoomi natiiviin)

Pyramidi syvenee kahdella tasolla vain Ranskan laatikossa
(lon −5,5…9,8, lat 41…51,5), ja pallon sarja saa tasot Z9–Z10 samalta
alueelta. Laskettu nykyisestä projektiosta:

| Taso | Laatat (Ranska) | Koko (arvio) |
| --- | --- | --- |
| pyramidi z9 | 30 × 26 = 780 | noin 35 Mt |
| pyramidi z10 | 59 × 51 = 3 009 | noin 130 Mt |
| pallo Z9 (lähde z8) | 22 × 22 = 484 | noin 5 Mt |
| pallo Z10 (lähde z9) | 44 × 44 = 1 936 | noin 20 Mt |

**Aika:** 22c-poltto tuotti noin 25 laattaa/s kaikilla ytimillä, joten
pyramidin z9–z10 (noin 3 800 laattaa) vie 3–5 min ja pallon sarjan
Z9–Z10 noin 10 min (noudot tahditettuna). Kokonaisuus polttoskriptin
`--alue`-paikkausajona: alle puoli tuntia CI-taukoa.

**Rajoitus: reliefin tarkkuus.** Pyramidin maasto tulee
1′-korkeusaineistosta (noin 1,85 km). z10 on noin 30 m/px, joten reliefi
näyttäisi 60-kertaisesti suurennetulta. Aito lähizoomi vaatii tarkemman
korkeusmallin myös reliefiin. Sama Copernicus GLO-30 (30 m), jota
valmistelen Cesiumin maastolle (Fablen kohta 3), kelpaa tähän, joten
järkevä järjestys on: DEM ensin, sitten z9–z10-poltto sen varjostuksella.
Rannikko- ja vesiviiva-aineisto (GSHHG full, noin 100 m) riittää z10:lle.

**Nostot ja nimet** ovat natiivissa eläviä, joten z9–z10 tarvitsee vain
pohjan (ja halutessa rantatason).

## 5. Pallon sarjan napa

3D-selvittäjän havainto 23.9.: sarjan ylimmät rivit (noin 83–85° N) näkyvät
tummana renkaana ja syvyyskäyrät kiertävät napaa. Syy on julisteen
yläreuna (76° N:n arkki + merisävytäyttö). Proton kalotti häivytettynä
84–82,5°:n välillä on oikea ratkaisu nyt. Sarjan polttoon voidaan lisätä
navan merisävyinen täyttö ilman käyriä, jos natiivi haluaa kaventaa
häivytystä — kerro, niin otan sen seuraavaan sarjan polttoon.
