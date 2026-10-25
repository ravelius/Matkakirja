# Reittiajo rungosta a28be3c7e (iPad Pro 13, 25.10.2026 klo 09.17–09.29): VIHREÄ

NS asensi 09.17 (VS B12 + B14 laatat, PK korttipuut, tausta-v48, hyppysuoja, GC-varaukset pois); app käynnistyi 09.17.29. Skriptit korjattu SHA 60e92b7a7 (`valo jaady 0` vasta kun "avaus: OhjausPelaajalle"; tässä ajossa rivi 1397, jaady 0 rivillä 1520). Aineisto: proto-3d/_tyo/linssiseppa2/varjot-koko/ra28-1ja/ ja ra28-2reitit/.

- GPU: J 10,00 ms / A 12,08 ms (raja 14); ruutuja > 17,5 ms: J 0, A 0 (ei ensiruutuhuippua).
- Aukio 180 s: käännösnykäykset 3, alkunykäykset 0, pysähdyksiä 0, kamerahyppyjä 0, nykäyksiä 0 (suurin 17 ms).
- Sisätila 120 s: käännösnykäykset 2, alkunykäykset 0, pysähdyksiä 0, kamerahyppyjä 0, nykäyksiä 0 (suurin 17 ms).
- Alkulennon kamerahyppy: EI toistunut. KAMERAHYPPY + hyppysuoja-rivejä 0 (J/A-vaihe ja reitit); skriptikorjaus toimii.
- VENYNYT RUUTU: 3 merkintää (20,0 / 24,8 / 29,5 ms), kaikki "ei nykäys". 29,5 ms (t 149,0 s, sisätilan 2. aukio-ajon reitti 1ja:ssa/aukiolla): "ulkona" 26 ms, Update 2 ms, ei GC:tä eikä soluja → ruutu venyy pelin ulkopuolella (GPU/OS), ei pelikoodista. 24,8 ms: solu esiin + GC edeltävissä ruuduissa; 20,0 ms: GC 1×. Aiemman 406d/d2f9:n 6–7 merkinnästä 3:een.
- Verrattuna d2f94a515: J 10,08 → 10,00, A 11,03 → 12,08, käännösnykäykset 3/3 → 3/2.
