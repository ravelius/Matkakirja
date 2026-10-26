# Pallon korkeusdata ilman Googlen laattoja (Karttaseppä, 8.10.2026)

## Löydös

Pallon kehystys ja vapaan lennon törmäystarkistus luvat maan korkeuden Googlen Photorealistic 3D Tiles -laatoista
(Cesium `SampleHeightMostDetailed`). Googlen mukaan korkeuksien ja mittojen ohjelmallinen lukeminen 3D-laatoista on
johdannaista ja kiellettyä (Maps Platform -blogin Q&A; ks. docs/raportit/vesimaski-google-ehdot-20261008.md, kohta 4).
**Korjaus:** oma korkeusdata kaikille 37 pallokaupungille (alla). LS1 vaihtaa lukijan junaan 169/170. Sen jälkeen
Googlen laatoista ei lueta korkeutta mihinkään.

## Toimitus (LS1:n kanssa sovittu muoto)

Kansio: `/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/korkeus-20261008/` (59 Mt). Kaupungit ja origot ovat LS1:n listasta
`pallo-37-kaupunkia.json`, ja samaa ENU-origoa käyttävät vesi ja reitit.

| Tiedosto | Sisältö |
|---|---|
| `korkeus-<id>.json` | origo, osat (ruutu, koko, kulma ENU:ssa, pohja_m, min, max), lähde, tarkkuus, krediitti |
| `korkeus-<id>-kauko.png` | 16-bit harmaa, ellipsoidikorkeus = pohja_m + arvo/10 (dm), 0 = ei dataa. Ylin rivi pohjoisin. Alue 30 km × 30 km keskustan ympäri ∪ pysähdykset + 1 km |
| `korkeus-<id>-lahi.png` | sama muoto, 2 m ruutu, pysähdysten rajauslaatikko + 1 km (vain Pariisi ja Tukholma) |

Korkeudet ovat **WGS84-ellipsoidikorkeuksia**, samassa koordinaatistossa kuin Googlen laatat. Tyyppi on **pintamalli**
(rakennukset ja puut mukana), koska kehystys ja törmäys tarvitsevat pinnan.

## Lähteet, lisenssit, tarkkuus ja koko

| Kaupungit | Lähde | Lisenssi | Ruutu | Tarkkuus | Koko |
|---|---|---|---|---|---|
| **Pariisi** (lähi) | IGN LiDAR HD MNS (data.geopf.fr WMS-R, raakakorkeus float32), NGF-IGN69 → ellipsoidi RAF20-geoidilla | Licence Ouverte Etalab 2.0 | 2 m, 3093 × 2926 | korkeus noin ±0,1–0,3 m. Eiffel-torni 368,8 m ellipsoidi (= huippu) | 7,6 Mt |
| Pariisi (kauko) | sama, aukot (0,25 %) GLO-30:lla | sama | 10 m, 3000² | sama | 10,6 Mt |
| **Tukholma** (lähi) | GLO-30 + OSM-rakennukset korkeuksineen (height tai building:levels × 3 m + 1 m), 25 217 rakennusta | Copernicus + ODbL | 2 m, 7465 × 4206 | GLO ±2–4 m, rakennukset ±3 m. Karkea: korkeus vain osalla rakennuksista. Kaknästornet 205 m oikein | 11,8 Mt |
| Muut 35 + Tukholma (kauko) | Copernicus GLO-30 DSM, EGM2008 → ellipsoidi EGM2008-geoidilla | Copernicus DEM -lisenssi (vapaa, maininta) | 30 m, 1000² | ±2–4 m absoluuttinen, rakennukset ja puut osittain mukana | 0,3–1,2 Mt / kaupunki |

**Krediitit (☰ › Lähteet):**
- "Korkeus: © IGN – LiDAR HD (Licence Ouverte Etalab 2.0)"
- "Korkeus: Copernicus GLO-30 © DLR e.V. 2010–2014 ja © Airbus Defence and Space GmbH 2014–2018"
- Tukholma lisäksi: "Rakennukset: © OpenStreetMap contributors (ODbL)"

Kaikki tekstit ovat myös jsoneissa.

## Huomiot

- **Tukholman tarkka malli** vaatii Lantmäterietin Geotorget-tunnuksen (Markhöjdmodell grid 1+ tai Ytmodell). Tunnuksen voi
  luoda vain omistaja; tekoäly ei luo tilejä. Tunnuksen jälkeen Tukholma saadaan Pariisin tasolle (1 m laserkeilaus).
- **Sevillan** kaukoruudussa on aito −115 m:n kuoppa (Cobre Las Cruces -kaivos 9 km luoteeseen). Se ei ole virhe.
- **Pariisin** kaukoruudussa on yksittäisiä matalia pikseleitä (min −24 m), jotka ovat GLO-30-täytön reunoja. Ne eivät vaikuta törmäykseen.
- **Pysähdysalueet:** 13 kaupungissa pysähdykset ovat yli 4 km keskustasta. Kaukoruutu kattaa ne kaikissa, ja lähiruutu
  Pariisissa ja Tukholmassa (rajauslaatikko + 1 km).
- **Vapaa lento muualla** (kaupunkien ulkopuolella): oma maastomme (quantized-mesh, GLO-30, z12) on Cesium-tileset. Siitä saa
  lukea, koska se on oma. Huom: sen korkeudet ovat EGM2008-korkeuksia ilman geoidia (merenpinta = ellipsoidi), joten
  Googlen koordinaatistoon pitää lisätä geoidi N (Euroopassa 20–55 m). Pieni geoidiruutu toimitetaan pyydettäessä.

## Työkalut

T7 `/Volumes/T7 4TB/Matkakirja-karttaseppa/vesimaski/`:
- `korkeus.mjs <id> --lahde ign|glo [--rakennukset <json>]`, ajo noin 1 s (GLO) ja 30–70 s (IGN)
- `rakennukset.mjs <id> --pbf <maa.osm.pbf>`
- geoidit `lahteet/` (EGM2008 2,5′, RAF20, SWEN17)

Työkalut viedään repoon tools/vesipinta/ -PR:n jatkona.
