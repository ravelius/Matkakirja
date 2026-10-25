# Reittiajo rungosta 0ef01ab91 (iPad Pro 13, 25.10.2026 klo 11.08–11.20): VIHREÄ

NS asensi 11.08 (a28be3c7e + avoimet-v47); app käynnistyi 11.08.26. Skriptit 60e92b7a7. Aineisto: proto-3d/_tyo/linssiseppa2/varjot-koko/r0ef0-1ja/ ja r0ef0-2reitit/.

- GPU: J 10,00 ms / A 11,82 ms (raja 14); ruutuja > 17,5 ms: J 1 (20,06 ms, ruutu 506/1500, ei ensiruutu), A 0.
- Aukio 180 s: käännösnykäykset 3, alkunykäykset 0, pysähdyksiä 0, kamerahyppyjä 0, nykäyksiä 0 (suurin 22 ms).
- Sisätila 120 s: käännösnykäykset 3, alkunykäykset 0, pysähdyksiä 0, kamerahyppyjä 0, nykäyksiä 0 (suurin 21 ms).
- Alkulennon kamerahyppy: ei (KAMERAHYPPY + hyppysuoja-rivejä 0).
- VENYNYT RUUTU: 6 merkintää (20,1–30,3 ms), kaikki "ei nykäys". 3 GC:n kanssa (20,1 / 20,8 / 22,0 ms, ulkona 12–16 ms); 30,3 ms (t 135,9 s, J/A-vaihe): ulkona 25 ms, ei peliä (kuten a28be:n 29,5 ms); **22,1 ms (t 91,5 s, sisätila): Update 11 ms 376 kt + PreLateUpdate 8 ms 52 kt ruudulla "lähimalli uusi lahikoriste chiwen"** (lähimallin luonti kesken ruudun, ei GC); 21,5 ms (t 53,5 s): "lähimalli uusi v4 lahi kiinankataja" 6 ruutua aiemmin + GC.
- Verrattuna a28be3c7e: J 10,00 → 10,00, A 12,08 → 11,82, käännösnykäykset 3/2 → 3/3.
