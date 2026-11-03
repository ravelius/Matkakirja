# Karttaseppä: luovutus 3.11.2026 klo 06.10 (KS)
Edellinen: viesti-karttaseppa-luovutus-20261103-0237.md (+ lisäys 03.1x; käsitelty: AVOIN 1 valmis ja viety, AVOIN 2–3 jatkuvat alla).
Syy: kontekstivahti 25 %. V = `/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/valitaso-20261103/`.

## TEHTY
1. **Euroopan välitaso Z9–Z10, PT KUITTASI 05.xx**: tiet ja joet pohjaan OSM-planeetasta. Z9 koko Eurooppa (motorway, trunk,
   leveät joet alueina ≥ 15 px²); Z10 kaupunkien ±1° laatikoissa lisäksi primary ja jokiviivat häivytettynä laatikon reunaan
   (1,5 laattaa); laatikon ulkopuolinen Z10 piirretty Z9:n sisällöllä → saumaton. Sarja `julisteet/pallo/laatat/2026-11-03-pohja-valitaso/`
   (324 939 tiedostoa, 28 212 muuttunutta) JU VEI 06.08, CDN tarkistettu. PR 6079 mainissa (278afa13a): tools/valitaso/ +
   raportti docs/raportit/valitaso-eurooppa-20261103.md. Parit V/parit/ (Lontoo, Pariisi; PT kuittasi).
   Aineisto: planeetta (96 Gt) ja välitiedostot T7 `Matkakirja-karttaseppa/valitaso-osm/` (eurooppa.npz 770 Mt: uusinta
   piirtoon ~2 min: `TASOT=9,10 … piirra2.py eurooppa.npz <pohja> <ulos> V/pallo-z10.json`).
2. **VS:n ISS-sauma (Maine/Québec, a5000-k-pois.png) selvitetty → VS:lle 05.4x**: ei laattasauma; z6-rivin raja 48,92° N, jonka
   takana näkymä käyttää BMNG:tä (huhtikuu, lunta) S2-kesämediaanin sijaan, vaikka S2 on olemassa → renderöinnin kerrosvalinta
   (VS/NS). Tarjottu: kevään S2-mosaiikki, jos PT haluaa (ei tilattu).

## AVOIN (järjestyksessä)
1. **Välitason loppu**: NS vaihtaa SileaUrl + offline.json kaupunkiRasteri uuteen kansioon (viesti NS:lle 06.0x, jonossa), sitten
   saapumisvideo JU:n simuvuorolla. PT: tarkista NS:n kanssa videosta, ettei tyhjää välitasoa näy → rivi PT:lle. Jos NS kysyy
   pallo-z10.json:n sarjaa: tiedosto on ennallaan (laattajoukko sama), vain URL vaihtuu.
   **LISÄYS 06.1x: NS vaihtoi SileaUrlin (runko juna-218 f1264eea9; offline.json ei muutu).** Jäljellä vain saapumisvideo +
   lepokuvat JU:n simuvuorolla; NS lähettää polun → katso ja rivi PT:lle.
2. **Pariisin palat 1–15**: tilaus Codexille 10a39d6b9, ei vielä generointeja. Seuraa postia; tarkistus `tarkista_ala.py`,
   kokoaminen kuten luovutuksessa 20261102-2210 AVOIN 2.
3. **G (KS + NUI)** ja vanhat kohdat kuten luovutuksessa 20261103-0025 (AVOIN 3–4).

## Opit
- Overpass on yöllä täynnä (502/504 kaikilla kolmella) ja kehottaa raskaita käyttäjiä omaan instanssiin; Geofabrikin robots.txt
  kieltää *.osm.pbf. Planeetta peileiltä ftp.fau.de / ftp5.gwdg.de (robots sallii, ~35–55 Mt/s) + pyosmium (T7 venv-kartta).
- pyosmium: flex_mem planeetan suodatuksella → 10 Gt ja swap täyteen; käytä sparse_file_array T7:llä ja EntityFilteriä.
- Ketjun grep lokiin puskuroi (ei --line-buffered) → edistyminen näkyy vasta lopussa; seuraa tiedostomääriä.
- Pohjasarjassa on Z10-laattoja kaupunkilaatikoiden ulkopuolellakin (228 k): välitason kaltaiset muutokset myös niihin.
