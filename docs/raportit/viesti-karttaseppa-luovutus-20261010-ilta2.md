# Karttasepän luovutus 10.10.2026 ilta 2 (noin 19.xx, PT:n nollausraja 50 %)

Edellinen luovutus: `viesti-karttaseppa-luovutus-20261010-paiva.md`. Tilamuisti `karttaseppa-tila-20261010-ilta`.

## 1. Valmista tänään (kaikki mergetty)

- **KAIKKI MAAT JA PÄÄKAUPUNGIT** valmis: #4344 Eurooppa, #4349 Kaukasus + Lähi-itä, #4354 Aasia + Afrikka,
  #4361 Amerikat + Oseania + pääkaupunkien kuvat (skeema 1.61, 336 kuvaa 168 maalle). Laudalla 199 maata ja
  118 pääkaupunkipistettä. Työkalu `tools/tee-paakaupungit.mjs <SK:n json…> --kuvat=<kuvat-hyvaksytyt.json>`.
  Uusien maiden kaava on tilamuistissa.
- **#4362:** testi `tests/kaupungit-maissa.test.mjs` (kaupungin pallopiste oman maansa sisällä) + Islannin
  countryShape NE:stä (`maat-lisaa-maailmankartalle.mjs --korvaa=ISO`).
- **Laudan x/y EI muutu** (PT 7.9.2026). Pallo ja vienti käyttävät Wikidatan pallopisteitä
  (`js/packs/maailmankartta-pallopisteet.js`). Siirtoehdotus peruttiin.
- **Pekingin vesiväri** ämpärissä (Julkaisija korvasi `vesi/vari-v1/vesivari-kaudet.json`, SHA 0dd206f9).
- **pyramidi-poltto** siirretty NAS:lle `Matkakirja-arkisto/karttaseppa/` (tarkistettu, lähde poistettu). GSHHG-meri
  T7:ltä: `pyramidi-poltto-arkisto/gshhs-data-j27/ne_10m_ocean.geojson`.

## 2. Oma suositus -erä: KAUPUNKIEN PUUT (valmis, odottaa vientiä ja kytkentää)

- **Kansio** `proto-3d/_tyo/karttaseppa/puut-20261010/` (LUEMINUT.md, tarkistuskuvat, `raaka/`, `osm/`, `peli/`).
- **Pelitiedostot** `peli/puut-<kohde>.bytes` + meta `.json` (PUU1: 250 m:n ruudut, 8 tavua per puu):
  - Pariisi 506 000 (8 km)
  - Tukholma 1,05 milj. (8 km)
  - Olavinlinna 110 000 (3 km)
  - Peking 67 000 (3 km, LR:n origo)
- **Lähteet:** OSM (T7 `vesimaski/puut.mjs`) + Meta/WRI 1 m latvuskorkeusmalli, CC BY 4.0. Latvusmallin laatat ovat
  T7 `latvus-chm/lahteet/` ja työkalut `latvus-chm/chm-puut.py` ja `pakkaa-puut.py` (`venv-kartta` + tifffile).
  opendata.paris.fr on kielletty robots.txt:ssä, joten sitä ei käytetty.
- **Tila:**
  - LS1 kuittasi muodon. Kytkentä tehdään PT:n erällä museon jälkeen.
  - LR sai Olavinlinnan ja Pekingin tiedostot; vastausta ei vielä tullut. Pekingin muurilinjoilla voi olla vääriä
    puita, ja karsinta tehdään LR:n rakennuspohjilla, jos hän pyytää.
  - **ÄMPÄRISSÄ** `kartta/puut/v1/` (Julkaisija 19.xx, 8 tiedostoa, 0 virhettä; paketti `_valmiit/puut-vienti-20261010/`).
- **Seuraava askel:**
  1. LR:n palaute Pekingin vääristä puista.
  2. Jos LS1 haluaa: puulajikohtaiset korttiluokat. Pariisin OSM-suvut ovat metassa (216 sukua). Tukholman suvut
     puuttuvat, joten jos tarvitaan, lehti/havu-arvio Sentinel-2:n talvikuvasta (NDVI talvi vs. kesä).

## 3. Muut voimassa olevat

- Tukholman maanpinta 1 m (Lantmäteriet) odottaa yhä Geotorget-tunnusta. Avaintiedostossa sitä ei ole. Ei kysytä omistajalta.
- Työkopiot: vain `wt/karttaseppa-pallopisteet-isl`, joka on mergetty ja poistettavissa.
- Ei GPU-ajoja. ComfyUI (PID 12915) on joutilaana.
