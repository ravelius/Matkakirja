# Reittiajo rungosta 406d88bb6 (iPad Pro 13, 25.10.2026 klo 07.02–07.14): VIHREÄ

NS asensi 07.02 (VS B8 materiaalit + PK VENYNYT RUUTU -loki); app käynnistyi 07.02.58. Aineisto: proto-3d/_tyo/linssiseppa2/varjot-koko/r406d-1ja/ ja r406d-2reitit/.

- GPU: J 9,85 ms / A 11,52 ms (raja 14); J ja A: 0 ruutua > 17,5 ms.
- Aukio 180 s: käännösnykäykset 3, alkunykäykset 0, pysähdyksiä 0, kamerahyppyjä 0, nykäyksiä 0.
- Sisätila 120 s: käännösnykäykset 3, alkunykäykset 0, pysähdyksiä 0, kamerahyppyjä 0, nykäyksiä 0.
- Uusi VENYNYT RUUTU -loki ("ei nykäys"): 7 merkintää (aukio 2, sisätila 5), 21,2–24,8 ms. 5/7:ssä viime ruudulla GC (1), "ulkona" 13–17 ms (ei pelikoodia: Update 1–4 ms); 1 merkinnässä Update 15 ms (t 77,7 s, KaupunkiMerkit 1 ms). Eivät lasketa nykäyksiksi (suurin ruutu 25/23 ms, raja ei ylity).
- Ensiruutu: pelireiteillä ei yli 20 ms:n ensiruutua; "pitkä ruutu" -rivit vain karttavaiheessa.
- Verrattuna 0fef31c8f: J 9,94 → 9,85, A 11,95 → 11,52, käännösnykäykset 3/2 → 3/3.
