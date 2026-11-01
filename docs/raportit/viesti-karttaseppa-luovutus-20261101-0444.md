# Karttaseppä: luovutus 1.11.2026 klo 04.44 (KS local_740947d7)
Edellinen luovutus: viesti-karttaseppa-luovutus-20261101-0400.md. Sen kohta 1 on päivitetty alla, ja kohta 2 (työtilat) pätee yhä.
Kaikki työkansiot ovat polun `/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/pariisi-pohja/` alla (= P), ja Codexin kuvat ovat kansiossa
`/Users/Shared/Claude/wt/karttaseppa-postilaatikko/proto-3d/_tyo/codex/`.

## 1. PARIISI 1 m/px: TILA 22/97 POHJAPALAA
- **Lohko 1** (r05–r07 × c06–c08) ja **erä 2** (r01 c05–c10, r02 c04–c10) on hyväksytty. Erän 2 kanavapalat r01-c09 ja r02-c09 uusittiin
  (05541c8ec) ja kuitattiin (57141d823). **Seuraava työ: erän 3 tarkistus** (20 palaa, erat.json), kun Codex toimittaa; sen jälkeen erät 4–6.
- **Vesimaskit v2** (`P/vesimaskit-v2.py`, kansio `P/codex-pseudo3d/vesimaskit-v2/`): v1 pudotti siltojen katkomat kanavat.
  v2 lasketaan koko kankaalta kerralla, ja vesipätkät ryhmitellään 40 px:n säteellä. Kumpikin on postin loput88-kansiossa
  erille 3–6 (afd3613cc). Jos Codex maalasi r03-c08, r03-c09, r04-c01–c03, r04-c08, r05-c01 tai r05-c02 vanhalla maskilla, se maalaa ne uudelleen.
- **Erän tarkistus:** `python3 P/codex-pseudo3d/era-qa.py <palat> <ohje+maski-kansio> r0 r1 c0 c1 <ulos> <nimi>`. Ohje- ja
  maskikansio ovat erillään: tee symlinkkikansio (ohjeet `ohjeet-1m-loput88/ohje-*`, maskit `vesimaskit-v2/*`). Paperi rajataan
  pois katumittarista. Raja on lohko 1 samalla mittarilla: mediaani 1 px, p90 4,0 px, ja tyyli on lohkon 1 haarukassa
  (`tarkistus-1m-era2-95de8159f/vertailu-lohko1/`). Katso 2×-saumat ja vesi silmin. **Vain poikkeamat PT:lle**, kuittaus Codexille aina.

## 2. PÄÄLLYSKERROS, MAAMERKIT JA VÄLIKOOSTE (PT kuittasi tekotavan 05.4x)
- Tekotapa: Codexin pohja pysyy ennallaan. Koodi lisää puut ja elämän (`P/kerros-1m.py`; renderoi-g6 täysi miinus geometria = alfa)
  ja maamerkit niiden päälle. **Kerros on valmis 97/97** (`P/codex-pseudo3d/kerros-1m/`, 159 Mt); sitä ei tarvitse ajaa uudelleen,
  ellei geometria muutu.
- **Kooste:** `python3 P/kooste-1m.py <palat> <ohjekansiot,pilkulla> P/codex-pseudo3d/vesimaskit-v2 P/codex-pseudo3d/kerros-1m
  /Users/Shared/Claude/proto-3d/_tyo/codex/pariisi-spritet <ulos-prefix>` (14 s). Puuttuvat palat näkyvät haaleana ohjeena.
  Välikooste on lähetetty PT:lle (`P/codex-pseudo3d/valikooste-20261101/`), mutta ei vielä KK:lle.
- **Maamerkit:** 9 nykyistä ja kertoimet `kooste-1m.py`:n MAAMERKIT-listassa (PT 05.4x: kertoimet taulukon mukaan).
  **6 uutta on tilattu Codexilta** (7bfc23916: Orsay, Grand Palais, Moulin Rouge, Concorde, Luxembourg ja Pont Alexandre III:n pylväs).
  Kun ne saapuvat, kooste ottaa ne käyttöön automaattisesti, ja Orsayn, Grand Palais'n, Moulin Rougen ja Luxembourgin
  jalanjälki tyhjennetään aukioksi. **Puuttuu:** Pont Alexandre III:n pylvään asettelu sillan neljään kulmaan
  (OSM way 183620685, 63 × 154 m, pohjois-eteläsuunta); tee se, kun kuva tulee. Tarkista uusien aukioiden reunat silmin 1:1.
- Ehdotus ja koekuva: `P/codex-pseudo3d/maamerkit-ehdotus-20261101/EHDOTUS.md`.
- Kun 97/97 on koossa: koko kaupungin kooste G:n rinnalle PT:lle → KK. Sen jälkeen pelikytkentä (laatat natiiviin ja webiin) puuttuu yhä.

## 3. MUUT
- Ranta 2026-09-30 on selvitetty: ei rikki. Delta ilman muuttuneita laattoja ohjaa haut perusversioon 2026-09-27-ranta, joka on pidettävä.
  PT ja JU ovat kuitanneet.
- Luovutus-wt:t 0400, 2325 ja 2210 on poistettu (PT 05.1x, levy). Avoinna yhä: maaston 2026-09-24 → 2026-10-29 -vaihdon pieni PR
  (luovutus 20261031-2325, kohta 4), ja 60 FPS koe D ei mene junaan.
- Levyllä on vapaata 75 Gi (LAV tarvitsee ≥ 82 Gi): **älä tallenna 1x-koko-kaupunkikuvia**; kooste tallentaa vain 1/2, 1/4 ja rajaukset.

## 4. PT:N HAVAINTO VÄLIKOOSTEESTA (PT 05.0x; luovutus OK)
Suunta on hyvä, ja kerros sekä maamerkit istuvat. **Korjattava:** erän 2 yläreunassa näkyy suorakaiteen muotoisia valkoisia
paperialueita (1/4-kuvassa vasemmalla ylhäällä noin x470–620 / y100–200 ja koko yläkaistalla). Syy: `kooste-1m.py` täyttää ei-Codex-palat
tasaisella PAPERI-värillä, ja Codexin palojen oma paperi on eri sävyä ja päättyy palarajaan. Korjaus: häivytä koosteen lopuksi
kaikki **kaupungin rajaa pitkin** yhteiseen paperiin, kuten renderoi-g6 tekee (`tulos/maski-kokonainen.png`, skaalaus res 2:een, sumennus,
composite PAPERI-kankaaseen ja sama kohinamultiplikaatio). Ei palarajoja pitkin.
