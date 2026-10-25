# Reittiajo rungosta d2f94a515 (iPad Pro 13, 25.10.2026 klo 08.27–08.39): reitit VIHREÄT, J/A-vaiheessa 1 kamerahyppy alkulennossa

NS asensi 08.26 (VS vesi + valoarvot + B9, PK tausta-v47 + lahipuut-v6); app käynnistyi 08.27.18. Aineisto: proto-3d/_tyo/linssiseppa2/varjot-koko/rd2f9-1ja/ ja rd2f9-2reitit/.

- GPU: J 10,08 ms / A 11,03 ms (raja 14). Ruutuja > 20 ms: A:ssa 1 (ensimmäinen mittausruutu 21,46 ms, ei toistunut edellisissä ajoissa), J:ssä 1 (24,9 ms, ruutu 1330/1500).
- Aukio 180 s: käännösnykäykset 3, alkunykäykset 0, pysähdyksiä 0, kamerahyppyjä 0, nykäyksiä 0 (suurin 22 ms).
- Sisätila 120 s: käännösnykäykset 3, alkunykäykset 0, pysähdyksiä 0, kamerahyppyjä 0, nykäyksiä 0 (suurin 22 ms).
- **UUSI: J/A-vaiheen konsolissa (rd2f9-1ja/konsoli.txt rivi 1319) 1 KAMERAHYPPY 0,58 m / 0,0° (t 60,2 s, avaus 27,12 s, avausW 0,00) ja 109 "hyppysuoja pehmensi kameran hypyn" -riviä (ruudut ~106–108 avaus 27,07–27,10).** Edellisissä ajoissa (8e5b, 0fef, 406d) 0 kumpaakin; reiteillä (rd2f9-2reitit) 0. Epäily: alkulennon kamera (PK tausta-v47 / lahipuut-v6); varmistus alku.zsh-alkulennolla.
- VENYNYT RUUTU -loki: 6 merkintää 20,0–25,1 ms, kaikki "ei nykäys". Pitkät ruudut vain karttavaiheessa.
- Verrattuna 406d88bb6: J 9,85 → 10,08, A 11,52 → 11,03, käännösnykäykset 3/3 → 3/3.
