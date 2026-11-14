# Työkalu 2: vienti talojen alueelta + venytysraja + vie.py (KK 15.11. 00.16 kohdat 1–3), Valoseppä 15.11.

## Kohta 2: venytysraja 0,6–1,6 (tyypitys.py SOVITUS venytys_min / venytys_max)
- Pohja-sovituksen instanssimalleille (kirkot ja kupolikirkko; MALLIMITAT): sx = pituus / L, sz = leveys / W. Ulkopuolella `ei_sovi` "venytys (x .., z ..)",
  perustalo jää. Kirkon koko valitaan ensin pienimmän venytyksen mukaan (max |ln s|), ellei koko tule nimilistalta tai käsikorjauksesta;
  koon vaihtuessa tornin oletus vaihtuu (käsikorjauksen torni säilyy). Luonnollinen sovitus (mittakaava 0,7–1,2) ei muutu.
- Palatsi, asema ja pylvästemppeli rakennetaan pohjan mitoista (parametrinen), joten niillä ei ole venytystä.
- Talojen alueella (kohta 1): Pariisi 300 → 230 (putoaa 70: kirkot 69 + Val-de-Grâce z 1,69), Lontoo 446 → 334 (putoaa 112).
  Syy: pohja liian lyhyt (x < 0,6) P 52 / L 119 tai liian leveä (z > 1,6) P 47 / L 113 (koko kaupunki). Koko vaihtui pienimmän venytyksen mukaan P 42, L 74.
- Venytys mallissa nyt: P sx 0,60–1,41 (mediaani 0,81), sz 0,60–1,60 (1,16); L sx 0,60–1,43 (0,77), sz 0,62–1,60 (1,23).
- Arkki: venytys-1.jpg (kirkko keski 0,6 | 1,0 | 1,6 x:ssä ja z:ssa; venytys-kuva.py Blenderillä + arkki-venytys.py).

## Kohta 1 ja 3: vie.py → merkit-<k>-kartta.bytes + tulos/vienti-<k>.json (poisOsm samasta listasta)
- Muoto MK01 vie.py:n otsakkeessa (otsake 32 t + malli 24 t + merkki 24 t). Origo = pelin kaupungit.json "puut" (P 48.86122 2.35092, L 51.49754 −0.12574).
- Pariisi 230 merkkiä, 21 mallia, 6 056 t, ei maata (kartta tasainen: peli laskee kuten puut). Lontoo 334 merkkiä, 3 mallia, 8 120 t,
  maa maasto.py z12 pohjan matalimmasta pisteestä (1,75–46,25 m; sama välimuisti kuin tee_elava_kartta.py, puuttuvia 0).
- poisOsm: tulos/vienti-<k>.json 'poisOsm' (P 230, L 334). KS:ltä ajo vasta, kun lista on lopullinen.
