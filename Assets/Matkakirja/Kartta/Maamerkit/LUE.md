# Maamerkit — kaupunkien 3D-tunnusrakennukset

Omistajan kortti 24.9.2026: jokaisella kaupungilla on yksi matalapolyinen 3D-tunnusrakennus
(2–5k kolmiota). Se seisoo kaupungin koordinaatissa maaston päällä ja on skaalattu niin, että se
erottuu kaukaa lähdössä ja laskeutuessa. Kokonaisia kaupunkeja, Cesium ionin OSM-rakennuksia tai
ladattuja malleja ei käytetä: kaikki geometria on omaa, Blender-skriptillä tuotettua.

| id | sisältö | kolmioita | korkeus |
|---|---|---|---|
| `lontoo` | Elizabeth Tower (Big Ben) + parlamenttitalon siipi + Tower Bridge Thamesin yllä, jalustalla | 1 778 | 97,2 m |
| `ateena` | Akropolis: kallio, Parthenon (temppelit liioiteltu 1,7×), Erekhtheion, Propylaia, Athena Nike, oliivipuita | 2 778 | 101,7 m |

## Tiedostot

- `<id>.fbx`: yksi verkko, yksi materiaalipaikka. Yksikkö on metri. Origo on jalassa maan tasossa
  kaupunkipisteen kohdalla, +Z pohjoinen, +X itä ja +Y ylös (Unityssä).
- `Tekstuurit/<id>_vari.png`: 1024 × 1024 sRGB-atlas, jossa albedo ja AO on leivottu yhteen. Ei alfakanavaa.
- `Lahde~/`: Unity ei tuo tätä kansiota.
  - `maamerkit.py` on ajuri.
  - `mm_kirjasto.py` sisältää verkonrakentajan, UV-atlaksen, leivonnan, maalausapurit, PNG-kirjoittimen,
    esikatselun ja FBX-viennin.
  - `kaupungit/<id>.py` sisältää yhden kaupungin.
  - `esikatselu/<id>-{etuviisto,ylaviisto,kaukaa}.png`: kaukaa-kuva on pieni (320 × 200), ja siitä
    arvioidaan siluettia.
- Unity: `Kartta/Maamerkit.cs` ja kytkentä kohtaukseen `Editor/Rakennus.cs` (`LuoPallo` → `MaamerkkiMalli`).

## Rakentaminen (VAIN taustatilassa ja CPU:lla)

```sh
cd Assets/Matkakirja/Kartta/Maamerkit/Lahde~
/Applications/Blender.app/Contents/MacOS/Blender -b --factory-startup -P maamerkit.py -- lontoo
#   valinnaiset: --ulos <kansio> --esikatselu <kansio | -> --koko 1024 --saikeet 8
```

Yksi kaupunki vie noin 15 s. `mm_kirjasto.alusta()` asettaa Cycles-laitteeksi CPU:n
(`compute_device_type = 'NONE'`) ja enintään 8 säiettä. Cycles Metal kaatoi Blender 5.2.1:n
taustatilassa ja avasi ikkunan (24.9.2026). EEVEE ja Workbench tarvitsevat GPU-kontekstin, joten
esikatselut piirretään Cyclesillä CPU:lla (24 näytettä, OIDN). Aja yksi Blender kerrallaan.
Ajo on deterministinen: samat satunnaissiemenet tuottavat saman tuloksen.

## Uuden kaupungin lisääminen (monistuskaava)

1. **Skripti** `Lahde~/kaupungit/<id>.py`. Kopioi pohjaksi `lontoo.py` tai `ateena.py`. Moduulissa on:
   - `NIMI` (verkon nimi) ja osien tunnukset kokonaislukuina (`KIVI, KATTO, … = range(1, n)`)
   - `PAINOT = {osa: paino}`: tekselitiheys atlaksessa. Esimerkiksi kellotaulu saa 10, maan alle
     jäävä helma 0,02.
   - `AO_ETAISYYS` (m) ja `NAKYMAT`: esikatselun kamerat karttakehyksessä, jossa X on itä ja Y pohjoinen.
   - `rakenna(v)`: geometria `mk.Verkko`-primitiiveillä (`prisma`, `laatikko`, `lierio`, `pyramidi`,
     `harja`, `kiekko`, `palkki`) karttakehyksessä metreinä. Normaalit korjataan automaattisesti
     ulospäin. Pohjan pitää ulottua maaston alle (helma noin −25…−30 m), koska maasto ei ole tasainen.
     Kaiken näkyvän pitää olla korkeudella z > 0: maasto peittää sen, mikä jää alle.
   - `maalaa(g)`: palauttaa lineaarisen albedon (K, K, 3). Taulukot `g["P"]` (sijainti),
     `g["N"]` (normaali), `g["OSA"]`, `g["PAR"]` (kulmakohtainen param, esim. kellotaulun
     koordinaatit tai pylvään kulma) ja `g["AO"]`. Apurit: `mk.fbm`, `mk.kohina`, `mk.jakso`,
     `mk.viiva`, `mk.peitto`, `mk.pinta_u`, `mk.kaari_ikkuna`, `mk.sekoita`, `mk.hexa`.
   - Kolmiobudjetti on 2–5k (ajuri tulostaa määrän osittain). Siluetin pitää olla selkeä ja tunnistettava.
     Mittasuhteita saa liioitella, kunhan sen kertoo moduulin otsikossa.
2. **Aja** skripti yllä olevalla komennolla ja tarkista esikatselukuvat.
3. **Taulukkorivi** `Kartta/Maamerkit.cs`:n `Oletustaulukko()`:
   `id, kaupunki, lat, lon, korkeusM` (maaston korkeus jalan kohdalla), `suunta` (°) ja `korkeus`
   (mallin korkeus ajurin VALMIS-rivistä). `Rakennus.LuoPallo` hakee mallin ja atlaksen id:n
   perusteella, joten muuta koodia ei tarvita.
4. **Lisenssi**: oma työ, CC0. Jos kaupunki käyttää jotain muuta kuin omaa geometriaa ja
   proseduraalista maalausta, se kirjataan tähän.

## Rajapinta (Natiiviseppä kytkee Nappula.Lentoon)

```csharp
maamerkit.Nayta(new[] { lahtoKaupunki, kohdeKaupunki });   // muut painuvat maahan
maamerkit.Piilota();
bool on = maamerkit.OnMaamerkki("lontoo");
maamerkit.AsetaTaulukko(rivit);                            // esim. sisältöpaketista
```

Mitoitus: malli on ruudulla vähintään `minPt` (40) pistettä korkea, mutta kerroin on enintään
`maxKerroin` (60 × todellinen). Jos malli jäisi suurimmallakin kertoimella alle `piiloPt` (6 pt)
korkeaksi, se painuu maahan. Kerroin pehmennetään log-asteikolla (`pehmennysS` 0,25 s). Malli
ilmestyy kasvamalla maasta (`kasvuS` 0,6 s), joten läpinäkyvyyttä ei tarvita (URP Lit, opaakki).
Varjot ovat pois.

Esimerkki: pallon saapumisnäkymässä (kaari 18,6°) kamera on niin kaukana, että 60-kertainenkin
malli olisi alle 6 pt, joten maamerkki näkyy vasta lähempänä, esimerkiksi lennon lähtö- ja
laskuvaiheessa.

## Ehdotus sisältöpaketille (Siirtoseppä)

Kokoelma `maamerkit`, jossa yksi rivi maamerkkiä kohti (sama muoto kuin `Maamerkit.Rivi`):

```json
{ "alkiot": [
  { "id": "lontoo", "kaupunki": "lontoo", "lat": 51.5051, "lon": -0.115, "korkeusM": 10,
    "suunta": 0, "korkeus": 97.2, "lisenssi": "CC0-1.0", "tekija": "Matkakirja (oma työ)" }
] }
```

Mallit ja atlakset pysyvät sovelluksen mukana (FBX:t kääntyvät Unityssä). Paketti voi siirtää
tai kiertää maamerkkiä ja ottaa sen pois käytöstä poistamalla rivin. Kaupungin oma
`kaupungit.maamerkki`-kenttä (id tai null) riittää myöhemmin, jos sijainti ja kierto tulevat
aina kaupungista.

## Lisenssi

CC0 1.0 (public domain). Tekijä: Matkakirja-projekti (Natiiviseppä, 24.9.2026). Geometria, UV,
leivonta ja maalaus tehdään kokonaan skripteillä `Lahde~/` Blender 5.2:lla. Työssä ei ole
ulkopuolisia malleja, tekstuureja, kuvia eikä fontteja.
