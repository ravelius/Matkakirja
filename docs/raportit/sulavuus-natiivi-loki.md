# Natiivin sulavuusloki (pysyvä portti)

Ajetaan jokaisen VP:n jälkeen samalla vakiokierroksella (kaupunki Pariisi, veto, heitto, nipistys, kamera-ajo), 3D-selvittäjän KehysMittari.cs:n raakadatasta. Kynnykset 120 Hz -laitteelle: pieni tökkäys > 12,5 ms, iso > 33 ms. Ensimmäinen vertailu ja menetelmä: docs/raportit/sulavuus-natiivi-vs-web-20260923.md.

| Pvm | Proto-commit | Kehyksiä | p50 (ms) | p95 (ms) | p99 (ms) | max (ms) | Pieniä tökk. (>12,5ms) | Isoja tökk. (>33ms) |
|---|---|---:|---:|---:|---:|---:|---:|---:|
| 2026-09-23 | c7b2f60 | 901 | 8.33 | 8.68 | 8.84 | 9.45 | 0 % | 0 % |
