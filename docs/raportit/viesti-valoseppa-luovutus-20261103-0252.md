# Valosepän luovutus 3.11.2026 klo 02.52

Syy: konteksti 25 % (pehmeä raja, kontekstivahti). Edellinen: viesti-valoseppa-luovutus-20261103-0205.md (jono ja pysyvät
työtavat -20261101-2124.md, -2220.md voimassa). Loki: `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md`.
Python: `_tyo/linssiseppa2/tulivuoret/venv/bin/python`. Esikatselu vain JU:n "ESIKATSELU NYT" -viestillä (JU: local_06f8c680…),
ajossa `PROTO_LINJA=<JU:n antama linja>`, valmiina "VAPAA" JU:lle. JU 02.3x: saman kokeen peräkkäiset ajot pyydetään SARJANA
yhdellä viestillä ("sarja salN–salM, enintään K ajoa"), JU antaa vuoron koko sarjalle.

## Jono 1 salamat aidoista ISS-kuvista: KUITATTU kokeena (PT, sal8 630610caf, ei junaan)
- Proto `linssiseppa2/salamat-aito` (wt/proto-linssiseppa2-tulivuoret, natiivi-backupissa). sal1–sal4 "levyt eivät näy" oli
  testikuvan rajaus: zoom 25 osoitti myrskyn ohi (tila-rivin vp laskettiin ilman zoomia). Korjaus 5f36b3100 `salamat kohdista 1`
  (zoomattu kamera välähdysten keskipisteeseen, Tulivuoret.KohdistaKohde).
- PT 03.3x korjaukset f35c89a88 + 630610caf: keijun hehkulevy pehmeä, sininen suihku huippu + 14 km / säde 0,3–1,6 km,
  aito-tilassa kentälle hehku _AitoHalo 0,06 ja yön hämy _AitoYovalo 0,012 (alla merta, kuu ei noussut 8.9.2015 19.30 UTC).
- Diagnostiikkaa jäi koodiin (AitoRivi, SalamaAito _AitoTesti/_AitoZTest, _AitoKoe-kuutiot): harmittomia, oletus pois.

## KESKEN: PT 04.1x kysymys oranssista pylväästä
- Se on oma keiju (punainen sprite, tasot 42–92 km; yläpään häntä ~5 % 92 km:ssä → terävä vino reuna).
  **e90183d39** häivyttää 80–92 km. **sal9 valmiina** (`salamat-aito/sal9/ajo.zsh`, sama rajaus kuin sal8: a0 | a1 z15),
  vuoropyyntö JU:lle lähetetty 02.50. Kun ajettu: pari sal8 a0 | sal9 a0 (yläpää) → PT 3 riviä.

## SEURAAVAKSI: jono 2 hurrikaani (SUUNNITELMA-ISS-ILMIOT-20261103.md kohta 2)
- Nykyinen proseduraalinen Hurrikaani.cs (Florence 12.9.2018 15 UTC, 29,8 N 71,3 W, Gerst kuvasi). Tavoite kuten Sarytšev:
  aito ISS-sarja laudaksi + parallaksi + kansi.
- Haku aloitettu: `_tyo/linssiseppa2/hurrikaani-aito/haku/`. `Technical.pl?feat=Florence&SearchFeatCB=on&SearchCaptionCB=on`
  palauttaa uudelleenohjaussivun → hae `ShowQueryResults-TextTable.pl?results=<id>` (id sivulta). Vaihtoehdot: Dorian 2019.

## JONO 3) pimennys (PT päättänyt: 2024/2017-kuva, sijainti laskennasta) 4) tähdenlennot.
