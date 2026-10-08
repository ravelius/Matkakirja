# Vesipinta (Karttaseppä 8.10.2026)

Oma vesipinta pallon kaupunkinäkymään Googlen 3D-laattojen päälle (omistaja 8.10. 20.2x, linja "B";
ehdot: docs/raportit/vesimaski-google-ehdot-20261008.md). Varjostin: Linssiseppä 2.

## Ajo

Riippuvuudet `geotiff` ja `pngjs` (eivät repon package.jsonissa; peli on riippuvuudeton).
Aja kansiossa, jossa ne ovat (Mac Studiolla T7:llä `/Volumes/T7 4TB/Matkakirja-karttaseppa/vesimaski/`,
node_modules linkkinä kausimosaiikin kansioon), tai `npm i --no-save geotiff pngjs`.

    node --max-old-space-size=8000 vesipinta.mjs tukholma 59.3293 18.0686 15 6 \
      --meri lahteet/meri/water-polygons-split-4326/water_polygons.shp \
      --sisa lahteet/ruotsi/gis_osm_water_a_free_1.shp \
      --glo /Volumes/NAS-Homes/koodaus/Claude/Matkakirja-arkisto/dem/copernicus-glo30 \
      --geoidi lahteet/us_nga_egm08_25.tif --ulos koe-vesi-6 [--dkatto 8]

Noin 10 s ja 2 Gt muistia per kaupunki (15 km, 6 m).

## Lähteet

| Aineisto | Mistä | Lisenssi |
|---|---|---|
| Meri | osmdata.openstreetmap.de `water-polygons-split-4326.zip` | ODbL (© OpenStreetMap contributors) |
| Sisävedet | Geofabrik `<maa>-latest-free.shp.zip`, `gis_osm_water_a_free_1` (fclass water, reservoir, river, dock) | ODbL |
| Täydennys | ESA WorldCover 2021 v200, luokka 80 (AWS `esa-worldcover`), komponentti ≥ 5000 m² ilman OSM-vettä | CC BY 4.0 |
| Järvien taso | Copernicus GLO-30 (10 %:n persentiili sisäruuduista: alakantti) | Copernicus DEM -lisenssi |
| Geoidi | NGA EGM2008 2,5′ (PROJ `us_nga_egm08_25.tif`) | julkinen |

Overpass API:a ei käytetä (robots.txt kieltää /api/). Googlen laatoista ei mitata mitään.

Krediitti (☰ › Lähteet): "Vesi: © OpenStreetMap contributors (ODbL), ESA WorldCover 2021 (CC BY 4.0)".

## Tulos

`vesi-<nimi>.bytes` + `.json`: kolmioverkko paikallisessa ENU:ssa (origo keskusta, ellipsoidikorkeus 0) 1 km:n paloina.
Kärki on float32 x itä, y pohjoinen, z ylös ja d rantaetäisyys (m). Indeksit ovat uint32 ja palan sisäisiä. Kolmiot ovat CCW ylhäältä katsottuna.
Rannat: marching squares (4 × 4 -alinäytteistetty peitto) ja satulatapaukset kahtena palana. Avovesi: nelipuu enintään 64 ruutua.
z on vesitaso ilman nostoa; nosto (suositus 0,4 m) tehdään ajossa.

## Navigointimaski (--maski)

`vesi-<nimi>-maski.png` + `.json`: 8-bit harmaa ruutukoossa, 0 = maa, 1–255 = etäisyys rantaan m. Veneiden ja lokkien simulaatioon (Linssiseppä).

## Reitit ja kohteet (elävä kaupunki, omistaja 8.10. 20.4x)

- `reitit.mjs <nimi> <lat> <lon> [säde] --osm <Geofabrik free-shp -kansio> --ulos <kansio>` → `reitit-<nimi>.json`: kadut, jalankulku,
  raitiotiet, rautatiet, metro (maan päällä), köysiradat, vesiväylät, puistot, aukiot (pisteet), satamat (laiturit, venesatamat,
  telakka-altaat), pysäkit. Tunnelit pois, Douglas–Peucker 0,5 m. Tukholma 15,6 Mt, noin 20 s.
- `pbf-kohteet.mjs <nimi> <lat> <lon> [säde] --pbf <maa-latest.osm.pbf> --ulos <kansio>` → `kohteet-<nimi>.json`: lautat (route=ferry),
  piiput, maailmanpyörät, aukiot alueina, suihkulähteet ja nimetyt vesialueet. Oma PBF-lukija ilman riippuvuuksia. Ruotsi noin 60 s.
- Koordinaatit ENU-metreinä samasta origosta kuin vesi. Korkeutta ei anneta, koska Googlen laatoista ei saa mitata.
- Krediitti: "© OpenStreetMap contributors (ODbL)". Tiedostot ovat ODbL-johdannaistietokantoja (teko-ohje tässä).

## Korkeus (pallon kehystys ja törmäys ilman Googlen laattoja, PT 8.10.)

- `korkeus.mjs <kaupunki-id> --lahde ign|glo --geoidi <tif> [--glo <kansio>] [--rakennukset rakennukset-<id>.json] --ulos <kansio>`
  → `korkeus-<id>-kauko.png` (+ `-lahi.png`): 16-bit, ellipsoidikorkeus = pohja_m + arvo/10. Origo ja pysähdykset `pallo-37-kaupunkia.json`.
  `ign` = IGN LiDAR HD MNS (data.geopf.fr WMS-R, Etalab 2.0) + RAF20; `glo` = Copernicus GLO-30 + EGM2008.
- `rakennukset.mjs <kaupunki-id> --pbf <maa.osm.pbf>` → OSM-rakennukset korkeuksineen lähiruudun rasterointiin.
- Raportti: docs/raportit/pallo-korkeusdata-20261008.md.

## Pariisi (8.10.): relaatiot ja liukuva jokitaso

- `vesirelaatiot.mjs <maa.osm.pbf> <ulos.json> <lon0> <lat0> <lon1> <lat1>`: OSM-vesien monikulmiorelaatiot (Seine, Marne), jotka Geofabrikin
  aluepaketin free-shp pudottaa rajalla. Syötetään `vesipinta.mjs --lisa <json>`.
- Jokien taso (OSM river, ESA) on liukuva: 1 km:n lohkojen persentiili, tasoitus 3 × 3 ja bilineaarinen interpolointi (sulut eivät tee portaita).
- `--tasokorkeus korkeus-<id>.json`: vesitasot lähiruudun pintamallista (Pariisi: IGN LiDAR HD, 20 %:n persentiili; vedestä heijastuneet pulssit).
  Tarkistus: LiDAR − vesi sisävesillä p10 0,02 m, p25 0,29 m.
