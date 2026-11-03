# Valosepän luovutus 3.11.2026 klo 16.26

Syy: TILINVAIHTO (PT 16.26, omistaja). Edellinen: viesti-valoseppa-luovutus-20261103-1430.md (pysyvät työtavat -20261101-2124.md,
-2220.md voimassa). Loki: `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md` (B alla = tämä kansio). Python:
`$B/tulivuoret/venv/bin/python -I`. Esikatselu ja laitekäännös vain JU:n "ESIKATSELU NYT L<n>" -viestillä; heti ajon jälkeen
"VAPAA L<n>" JU:lle. Ison iPadin palautusrunko 1420265d7 (varmista JU:lta ennen ajoa).

## Tehty: ISS-ilmiöt junaan 218 (PT 16.1x KUITATTU)
- Haara **linssiseppa2/iss-218 = f21b6baa8** (natiivi-backup, wt/proto-linssiseppa2-iss218): 1420265d7 + pimennys-aito 53b918b3a
  (tulivuoret, salamat sal9, hurrikaani hur3, pimennys lineaarinen, tähdenlennot tl6-b) + f21b6baa8 salamat `_Aito` oletukseksi.
  PT ilmoittaa JU:lle junaan vientiä varten; minulta ei toimia.
- Pari1 (juna | iss, 5 ilmiötä): B/iss-218/pari1/pari-*.jpg, TULOS.md. Kääntyy puhtaasti.
- Kontaktivarjo k6 d68385bac (linssiseppa2/kontakti-218) kuitattu jo 14.28, JU vie.

## TYÖN ALLA: b) salamoiden keijun saumat + sivureuna (PT 16.1x: sal10 ei kuitattu)
- Haara **linssiseppa2/keiju-sivu** (iss-218:n päällä, sama worktree wt/proto-linssiseppa2-iss218 – nyt tällä haaralla):
  f464a9c08 (sal10: sivuikkuna) → **769cb9ea6** (sal11: yläosan kova raja y = hh ja lonkeroiden katkos pehmeiksi = saumaruudukon
  syy; sivuikkunan rajat aaltoilevat korkeuden mukaan). Säädin `_KeijuSivu` 1 (oletus) | 0 = sal9.
- **sal11 JU:n jonossa** (L1 PK 218ag:n jälkeen tai L2 jos vapautuu ensin): `zsh $B/salamat-aito/sal11/ajo.zsh <linja>`,
  ~3 min. Skenaario toistaa siirron ennen jokaista kuvaa (s0 | s1 | s0b = sama rajaus; s0b varmistaa toistuvuuden).
- SEURAAVAKSI: kun ESIKATSELU NYT → aja, VAPAA L<n> heti, lähipari (s0 | s1, keiju rajattuna; esim. sal10/rajaa.py-malli) PT:lle
  ≤ 3 rivillä. Jos saumat jäävät: tarkista myös ristikkäisten tasojen (pylväät 9 km välein, leveys 7–11 km) päällekkäiset reunat.
  Junaan vasta PT:n kuittauksella (keiju-sivu on iss-218:n päällä → JU voi viedä sen jatkona).

## Muuta
- Sade (linssiseppa2/sade-218, 5ed5f95e2) odottaa äänen laitetarkistusta.
- Työlistan ISS-rivi päivitetty 16.2x ("Junassa 218: iss-218 kuitattu …, keijun korjaus kokeena").
