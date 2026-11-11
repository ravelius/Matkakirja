# Overture-mittaus: Pariisi (KS 11.11.2026 klo 12.28)

Lähde: Overture Maps Foundation (overturemaps.org), buildings release 2026-10-21.0. Lisenssi ODbL (OSM-johdannainen).
Käyttö vain mittaukseen (PT:n lupa 11.11. 09.2x): ei peliin eikä ämpäriin.
Vertailu: talokoneen syötteet `_tyo/natiiviseppa/pariisi-talot` (osm.json + IGN BD TOPO, korkeusjärjestys oma IGN > height > levels > oletus).
Skripti ja tulos: `_tyo/karttaseppa/overture/mittaa-pariisi.py` → `mittaus-pariisi.json`. Rajaus = IGN-haun ala (lat 48.815–48.902, lon 2.245–2.425).

## Tulos: Overture ei tuo Pariisiin mitään, mitä talokoneella ei jo ole

| | rakennuksia | height | num_floors | roof_shape |
|---|---|---|---|---|
| Overture, lähde OSM | 156 513 (98,7 %) | 8 785 | 71 727 | 5 402 |
| Overture, lähde Microsoft ML | 2 042 (1,3 %, ala 0,5 %) | 1 042 | 0 | 0 |
| Talokoneen osm.json | 170 926 | 1 401 | 73 830 (building:levels) | 6 009 |
| IGN BD TOPO (talokone) | 188 402 korkeudellista | kaikilla | – | – |

1. Pariisissa Overture on käytännössä OSM. Muita lähteitä (Google, Esri) ei ole; Microsoftin koneoppimispohjia on 2 042, keskimäärin noin 100 m².
2. Kerrosluvut ja kattomuodot ovat samat OSM-tagit, jotka talokone jo lukee (num_floors = building:levels, roof_shape = roof:shape).
3. Korkeus: IGN on parempi. Kun samalle talolle on sekä Overturen height että IGN:n hauteur, ero on mediaanina 2,6 m ja 90 %:lla alle 9,8 m.
   Vain 55 % osuu 3 metrin sisään (ML-lähteellä 1,9 m / 6,3 m / 67 %, mutta vain 171 taloa).
4. IGN-aukot: 33 238 Overture-taloa, joiden keskipiste ei osu IGN-taloon (talokone antaa niille lähimmän IGN-korkeuden, kerrokset tai oletuksen).
   Näistä vain 1 947:llä (6 %) on Overturen height. Luku on yläraja: sisäpihallisen korttelitalon keskipiste osuu usein pihalle.
   Talokoneen oma mittari (palat-v13): ign-lähin 10 887, levels 751, oletus 1 388.

## Suositus
Pariisin talot jatkavat nykyisellä OSM + IGN -yhdistelmällä; Overturea ei oteta käyttöön. Siitä voi olla hyötyä vain kaupungissa, jossa ei ole
IGN:n kaltaista virallista korkeusaineistoa ja jossa Overturella on muitakin lähteitä kuin OSM. Se mitataan erikseen, kun kaupunki on työn alla
(Lontoossa todennäköisesti myös lähes pelkkä OSM).
