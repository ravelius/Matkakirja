#!/bin/zsh
# Karttaseppä 9.10.: vesi v5 = 16 m -verkko 40 km:n säteelle (PT: pallosta näkyvä saaristo); pienet erilliset vedet pois kuten v4
cd "/Volumes/T7 4TB/Matkakirja-karttaseppa/vesimaski" || exit 1
G=/Volumes/NAS-Homes/koodaus/Claude/Matkakirja-arkisto/dem/copernicus-glo30
MP=(--sisa lahteet/idf/gis_osm_water_a_free_1.shp --lisa lahteet/pariisi-vesirelaatiot.json --glo $G --geoidi lahteet/us_nga_egm08_25.tif --tasokorkeus korkeus/korkeus-pariisi.json --pienet-pois 1)
MT=(--meri lahteet/meri/water-polygons-split-4326/water_polygons.shp --sisa lahteet/ruotsi/gis_osm_water_a_free_1.shp --glo $G --geoidi lahteet/us_nga_egm08_25.tif --geoidi2 lahteet/se_lantmateriet_SWEN17_RH2000.tif --meri-h 0.0 --nimitaso Mälaren=0.7 --pienet-pois 1)
N=(nice -n 10 node --max-old-space-size=12000 vesipinta.mjs)
$N tukholma 59.3299 18.07382 40 16 $MT --ulos tukholma-v5/vesi-16m --dkatto 16 2>&1 | grep -E "ei DEM|merkitty|verkko|valmis|rror"
$N pariisi 48.86122 2.35092 40 16 $MP --ulos pariisi-v4/vesi-16m --dkatto 16 2>&1 | grep -E "ei DEM|merkitty|verkko|valmis|rror"
