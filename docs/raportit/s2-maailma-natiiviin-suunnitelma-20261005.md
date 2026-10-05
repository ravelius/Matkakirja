# S2-maailma v2 natiiviin — suunnitelma (Linssiseppä 2, 5.10.2026)

Päätoimittaja 18.0x: juna 145, järjestys GIBS-pilvet → tämä → euromosaiikin korjaussarja. Kuvapari ennen merge-pyyntöä:
kolme aluetta Euroopan ulkopuolelta, nyt vs. v2 (Cupola + ISS-kuva).

## Aineisto (Karttaseppä)
- `linssit/astronautin-kamera/s2-maailma/v2/{z}/{x}/{y}.jpg`, absoluuttinen XYZ, z6–z10, y pohjoisesta, 256 px JPEG, 80 m.
- `laatat.json`: `saatavuus[z]` base64-bittikartta (bitti i = rivi · 2^z + sarake; tavu i >> 3, bitti i & 7), alueet,
  lukumäärät. Avomerellä ei laattoja → oma meri. Tulossa `v2-korjaus/` + `korjaus.json` (sama bittikartta, 1 = korjaussarjasta).
- Eurooppa erikseen: `s2-eurooppa/v1/` rajatulla jaolla (taso = z − 6, x − 27·2^t, y − 13·2^t; z6-lohko 27–39 × 13–25).

## Toteutus
1. **Yksi maailman S2-kerros Cupolaan** (AstronauttiKerros.PaivitaS2): Euroopan rajatun jaon tilalle koko maailman Web
   Mercator -jako (juuri z6, 64 × 64), sama paikka 2. Mallin polku `s2-maailma/v2/{z}/{x}/{reverseY}.jpg`.
2. **Laattapalvelin ohjaa** (uusi `S2Ohjaus`, VariOhjaus/KattavuusOhjaus-mallilla): Euroopan lohkon laatta → `s2-eurooppa/v1`
   suhteellisella polulla (sama sävy kuin nyt); muualla bittikartta 1 → `s2-maailma/v2`, 0 → läpinäkyvä heti (BMNG alla).
   Korjaussarja myöhemmin samaan ohjaukseen.
3. **ISS-kuvan kaukoalue** (KuvanTyosto.Mosaiikki / MosaiikinLaatta / MosaiikinPolku): z ≤ 11 -lehti mosaiikista koko
   maailmassa, kun laatta on saatavilla (Eurooppa v1, muualla v2); muuten COG kuten nyt.
4. **Cupolan ennakko** (CupolanSarjat): S2-sarja koko maailmaan (bittikartalla rajattu).
5. **Reuna ja sävy**: `_s2Reuna` (Euroopan suorakulmio) pois, kun maailma on päällä; S2-sävy (Kyytipino) arvioidaan kuvaparista.
6. laatat.json haetaan kerran istunnossa (välimuisti Documentsiin, versioitu), bittikartat puretaan taustasäikeessä.

## Riskit ja kuittaukset
- Natiiviseppä: kattavuus kasvaa (lisäysversio-sääntö) — muisti ja välimuisti samat rajat (S2ValimuistiMt 384 / kevyt 192),
  laattoja haetaan vain näkymästä. Kuittaus ennen merge-pyyntöä.
- Saumat Euroopan ja maailman rajalla (v1 ↔ v2 sävy): mitataan kuvaparissa.
