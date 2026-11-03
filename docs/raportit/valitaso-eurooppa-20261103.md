# Välitaso Z9–Z10: Euroopan tiet ja joet pohjaan (Karttaseppä 3.11.2026 klo 04.55)

PT 02.4x / 03.1x / 04.5x: pohjan Z9–Z10 oli tyhjä (ei teitä, Thames 1 px) saapumiszoomauksen välitasoilla ennen elävää karttaa (Z11).
Lontoon koepala kuitattiin 03.1x; tämä on koko Euroopan sarja ehdoin (1) saumaton, (2) Z9 harva, (3) ei hyppyä Z11:een.

## Tulos

- Uusi sarja `julisteet/pallo/laatat/2026-11-03-pohja-valitaso/` (kopio 2026-10-26-pohja-20261027 + muutetut laatat).
  Paikallisesti: `/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/valitaso-20261103/julkaisu/2026-11-03-pohja-valitaso/`
  (324 938 laattaa, vanhat kovalinkkeinä; laatat.json päivitetty, kenttä `valitaso`).
- Pelkät muuttuneet laatat: `…/valitaso-20261103/sarja/` (28 212 laattaa, 665 Mt: Z9 5 846, Z10 22 366).
  Vienti JU:lle: joko koko kansio tai palvelinpuolen kopio vanhasta sarjasta + muuttuneet päälle.
- Parit (vasen vanha | oikea uusi, sama rajaus): `…/valitaso-20261103/parit/` lontoo-z9, lontoo-z10, pariisi-z9, pariisi-z10.

## Sisältö

| Taso | Tiet | Vesi |
|---|---|---|
| Z9 (koko Eurooppa) | motorway, trunk (leveys puolet Z10:stä = sama maastossa) | leveät joet alueina (water=river / waterway=riverbank), palat < 15 px² pois |
| Z10 kaupunkien ±1° (pallo-z10.json, 4 314 laattaa Euroopassa) | + primary | + waterway=river -viivat |
| Z10 laatikon ulkopuolella (pohjasarjan muut Z10-laatat) | kuten Z9 | kuten Z9 |

- Saumattomuus: geometria koko alueelta (ei hakurajausta); primary ja jokiviivat häivytetään laatikon reunaan 1,5 laatan
  matkalla. Laatikon ulkopuolinen Z10 on piirretty Z9:n sisällöllä, joten tulos on sama, haki natiivi Z10:n sieltä tai
  suurensi Z9:n.
- Tyyli kuten Lontoon koepalassa (PT kuittasi): tiet ruskeat 2,2/1,8/1,2 px (Z10), vesi pohjan vesisävy + tummempi reuna.
- Rajaus: lon −32…50, lat 25…72. Itäraja 50° E näkyy suorana reunana Venäjällä ja Iranissa Z9:llä (pelialueen ulkopuolella).

## Lähde ja ketju

OSM-planeetta 26.10.2026 peilistä ftp.fau.de (robots.txt sallii; Overpass oli ruuhkassa ja Geofabrikin robots.txt kieltää
pbf-haut, Raamattu 2.183). © OpenStreetMap contributors, ODbL: attribuutio ☰ › Lähteet (OSM on jo listalla vesirajoista).
Planeetta (96 Gt) ja välitiedostot: T7 `Matkakirja-karttaseppa/valitaso-osm/`.

Skriptit `tools/valitaso/`: `suodata.py` (pyosmium, planeetta → 3,7 Gt, 53 min), `pura.py` (Eurooppa → npz, 15 min),
`piirra2.py` (rinnakkainen piirto, ~2 min), `kokoa.py` (julkaisukansio), `pari.py`, `aja.zsh` (ketju). Python:
T7 `venv-kartta` (pyosmium 4.3, scipy). Aineisto: motorway 360 k, trunk 597 k, primary 1,78 M, joet 509 k, jokialueet 273 k.

## Opit

- pyosmiumin flex_mem kasvoi suodatetulla planeetalla 10 Gt:hen koneen ollessa swapilla: pura.py käyttää nyt
  sparse_file_array-indeksiä T7:llä ja EntityFilteriä (solmut eivät Pythoniin).
- Z9:llä osittain kartoitettujen jokien riverbank-palat näkyivät katkoviivana → pinta-alaraja 15 px².

## Jatko

NS: SileaUrl (KarttaKerrokset.cs) uuteen kansioon ja offline.json kaupunkiRasteri samaan sarjaan; lepokuvat-valitaso.sh
kaaret 1,5/0,8/0,4 laitteelta (simuvuoro JU:lta); laiteparit PT:lle. Sama aukko oli kaikissa kaupungeissa (pohja on
sama kaikkialla); tämä sarja korjaa sen koko Euroopassa.
