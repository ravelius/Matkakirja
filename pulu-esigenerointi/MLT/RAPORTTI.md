# Pulu MLT (Malta) – pilviajon raportti 10.10.2026

- **Vastaukset:** vaihe 1: 140 (28 kohtaa × 5), vaihe 2: 262 linkkivastausta. Yhteensä 402.
- **Kesto:** noin 25 minuuttia (vaihe 0 ja 10 Sonnet-agenttia, effort low, enintään 2 rinnakkain).
- **Agenttien tokenit yhteensä:** noin 1 260 000 (vaihe 1: 6 erää, noin 571 000; vaihe 2: 4 erää, noin 689 000).
- **Tarkistukset:**
  - `tarkista-era.mjs vaihe1`: 140 vastausta, 0 virhettä. Agentit korjasivat omissa ajoissaan noin 30 virhettä, lähes kaikki liian vähiä [[käsite]]-merkintöjä (erä 5: 17, erä 4: 5, erä 2: 4, erä 6: 2, erä 1: 1, erä 3: muutama).
  - `tarkista-era.mjs vaihe2`: 262 vastausta, 0 virhettä. Agentit korjasivat omissa ajoissaan alle kaksi käsitettä ja kysymyssanan linkitysvirheitä.
  - `tarkista-valmis.mjs`: 0 virhettä, 5 varoitusta ("Egypti"), kaikki hyväksyttäviä: pyramidivertailu Ġgantijan yhteydessä ja Napoleonin Egyptin-retki.
  - Käsin korjattu: erän 1-5 kohta 25.5 ("toinen asutettu päätyyppinen saari" → "toiseksi suurin asuttu saari").
- **Ei tehty:** faktojen 30 vastauksen pistokoe jäi tekemättä (muistinvaraiset faktat lukijan tarkistettavaksi). Agentit mainitsivat varmistamattomia väitteitä: Filflan käyttö ammuntakohteena, Cynomorium coccineum, Ċirkewwa–Mġarr-lautta, ftiran täytteet, johanniittojen Malta-kausi.
- **Huomio datasta:** `lataa-data.sh` viittaa versioon v625, joka ei enää ole saatavilla (404); ajo tehtiin versiolla v651 (skriptiä ei muutettu repossa). `fokuskohteet-mlt` ja `maastokohteet-mlt` puuttuvat ämpäristä, joten syötteessä ei ole niitä.
- **Paketti:** `pulu-esigenerointi/MLT/MLT.json` (28 kohtaa, 140 kysymysvastausta, 262 linkkivastausta). `pulu-esigenerointi/maat.json` päivittyi (MLT-rivi).
