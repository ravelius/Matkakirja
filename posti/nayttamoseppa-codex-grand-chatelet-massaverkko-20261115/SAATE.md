# Grand Châtelet: UUSI MASSAVERKKO (muotopohja) Codexille, NSe 15.11.2026 klo 18.4x

Lähde: haara `kk/hologrammi-tayttyy`, commit **ae77525c3** (= 4dc1a7414 + paviljonki; KK hyväksyi muodon 18.2x). Korvaa vanhan muotopohjan kokonaan.
Tämä on MASSA: pohja, korkeudet, kattojen suunnat ja osien paikat. Pinta, ikkunat ja yksityiskohdat lähdekuvista (tilaus ja lisäykset 1–4), ei tästä.

## Tiedostot (tämä kansio)
- `grand-chatelet-massa.glb`: glTF 2.0 -binääri, 666 kolmiota, yksi verkko, yksi harmaa materiaali (kaksipuolinen). Sama `grand-chatelet-massa.obj`:nä.
- `grand-chatelet-massa-kolmiot.txt`: raakavienti pelin kehyksessä (K-rivit = kolmiot, S = särmät; z päinvastoin kuin GLB:ssä).
- Kuvat mallista: `harmaa-nelja-suuntaa.png`, `harmaa-ylhaalta.png`, `harmaa-piha.png` (piha ja paviljonki), `harmaa-turgot-suunta.png`,
  `arkki-turgot-katot.png` (Turgot 1739 | malli), `arkki-pohjoisjulkisivu.png` (G.4057 | malli | Méryon), `arkki-pohja.png` (Giraud 35 | malli).

## Akselit (GLB ja OBJ; samat kuin tilauksen korjatussa rivissä 16.51)
- Yksikkö metri, mittakaava 1. **+Y ylös, +X itäkaakkoon, pääjulkisivu (Rue Saint-Denis, pohjoiskoillinen) −Z-päässä.** Oikeakätinen, ei peilausta:
  pääjulkisivua pohjoisesta katsoen suuri pyöreä torni on VASEMMALLA (idässä, +X), vino luoteisjulkisivu oikealla (−X).
- Blenderissä tavallisen glTF-tuonnin jälkeen: +Y = läpikulun suunta pohjoiskoilliseen (pääjulkisivu +Y-päässä), +X itäkaakkoon, +Z ylös.
- Origo: maan tasossa (y = 0), mitattu painopiste; EI rajalaatikon keskellä.
- Rajalaatikko GLB:ssä: x −37,40…26,00 (63,4 m), y 0…26,00, z −32,19…24,30 (56,5 m). Itäosan eteläpää (Giraud'n keltainen: puodit ja piha) on leikattu pois kuten ennen.

## Mitat ja paikat (GLB:n koordinaatit; z = pelin z käännettynä)
- Räystäs kaikkialla 15,5 m, ellei toisin sanota. Holvatun läpikulun akseli x −1,8; läpikulku 4,0 m leveä, laki 6,3 m; holvattu osa z −31…−3, siitä etelään avoin kuja itä- ja länsiosan välissä (x −3,75…0,2).
- PÄÄJULKISIVU z −31: porttirakennus x −6,4…2,8, itä–länsi-harja 23,2 m (z −26,4), kattoikkuna kellon yllä (x −2,5…−1,1, 17,6 / 18,4 m).
  Kaarisyvennys portin suulla: ulkokaari 5,6 m leveä (x −4,6…1,0), syvyys 1,5 m, laki 6,5 m; sen takana 4,0 m:n käytävä.
- PORTTITORNIT (2): keskipisteet (−6,4; −31) ja (2,8; −31), säde 1,25 m, ulokkeena 5,5–7,5 m:stä ylös, räystäs 17,8 m, kartion kärki 21,5 m.
- SUURI PYÖREÄ TORNI koillisessa: keskipiste (14,2; −23,9), säde 3,95 m, räystäs 17 m, kartion kärki 25 m.
- PORRASTORNI: keskipiste (6,5; −24,5), säde 1,5 m, nousee katosta 15,5 m:stä, räystäs 18,5 m, kärki 23 m.
- MATALA ETUOSA portin itäpuolella: x 2,75…14,5, z −31,3…−26,45, seinä 9,5 m, lapekatto 12,5 m:iin (nousee taaksepäin).
- ITÄOSA: kaksi ITÄ–LÄNSI-harjaa z −3,0 ja z −18,6, harja 23,2 m, jänne 15,8 m; pohjoislape laskee kadulle (EI päätykolmiota kadulle).
  Harjat päättyvät lännessä porttisiiven harjaan (x −1,8).
- PORTTISIIPI läpikulun päällä: x −6,35…2,75, z −26,4…−3,0, POHJOIS–ETELÄ-harja x −1,8, 23,2 m.
- LÄNSIOSAN KAKSI PITKÄÄ HARJAKATTOA ITÄ–LÄNSI-suunnassa, PÄÄDYT LÄNTEEN, harjat 23,2 m, harjan suunta 6,5° irti X-akselista Giraud 35:n seinien mukaan (tarkka suunta verkosta):
  lounaissiipi 12,3 m leveä (eteläreuna Seinen puolella) ja sen pohjoispuolella 15,0 m leveä; niiden välissä jiiri.
- SISÄPIHA (noin 167 m², avoin, maan tasossa) länsiosassa pitkien kattojen pohjoispuolella, vinon luoteisseinän takana;
  kulmat GLB:ssä noin (−16,5; −4,5), (−6,35; −3,3), (−6,35; −21,85), (−19,25; −14,1).
- PIHAN LÄNSI- JA LUOTEISSIVUN SIIVET: 5,5 m syviä, räystäs 15,5 m, harja 18,9 m, jiiri kulmassa. Luoteissivun siipi on täyskorkea (G.4057 + Méryon), ei matala muuri.
- **UUSI: PAVILJONKI pihan lounaiskulmassa** (Turgot 1739): korkea kapea rakennus TELTTAKATOLLA länsisiiven eteläpäässä, pohjoisemman pitkän katon pohjoissivulla.
  Pohja vinoneliö, sivu noin 5,95 m (seinien väli 5,5 m), kulmat GLB:ssä (−22,4; −5,1), (−16,5; −4,45), (−18,1; −10,2), (−24,0; −10,8);
  räystäs 20,0 m, telttakaton kärki 26,0 m (ARVIO Turgot'sta: räystäs pitkien kattojen räystään yli, kärki harjojen yli; rakennuksen korkein kohta).
- SAVUPIIPPU: x −10,2…−9,0, z −25,7…−24,5, 21,0 m.

## Huomiot
- Verkon sisällä on piilossa olevia seiniä (osat menevät päällekkäin liitoksissa): eivät vikoja, eivät sisätiloja. Yksi umpimassa riittää.
- Pitkien kattojen tarkka kulma ja pihan rajat ovat ARVIO (Giraud 35 näyttää palstat, ei pihan rajoja; Turgot näyttää katot).
- Vastaanotossa tarkistan: suuri torni +X-puolella (ei peilausta), pääjulkisivu −Z, mittakaava (rajalaatikko yllä), portti ja suuri torni kiintopisteinä.
