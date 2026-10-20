# Pelikoodarin luovutus 20.10.2026 klo 18.25 (päätili)

Edellinen: viesti-pelikoodari-luovutus-20261020-1805.md (historia). Rooli: Pelikoodari (Opus, high).
Proto-worktree /Users/Shared/Claude/wt/proto-pelikoodari-kerattavat-206 (paikallinen, ei pushia).

## TEHTY
- **Laatat / tausta-v6:** haara **pelikoodari/tausta-v6-208 = 2d832a656** (b4e384537:n päällä): TaustaKansio = kielletty-tausta-v6/,
  esto palatsi-esto-v3 jää (vaakamaa ei vaikuta leivontaan). v6 ämpärissä 18.19 (64/64 tiedostoa 200). Peitto LOD0 (YMAX 40, ruutu 1 m):
  v4 25 605 m² aukkoja → v6 pelialueella ~0 (jäljellä vain laattojen reunoilla, länsireuna x −480…−475 ja kulmat, pelialueen ulkopuolella).
  unity-tarkistus 0 virhettä, pohja-/valo-/liike-/kameravahti ok, kameratesti läpi, kielivahti ok. MaanTayte (177560643) jää varmistukseksi.
- **Esto-v3 LAHTEET.md:** läpäisee vie-paketti --kuiva; palatsi-esto-v3/esto.bin ämpärissä (200). Ei toimia.
- **"Majesteetti!"-uusinta:** jo kytketty (JuoksuAvausHuudot: avaus-puhe-v2/03, runko 37d8e8507). Ei toimia.

## AVOIMET
- 2d832a656 NS:lle (local_a9af6995) PT:n OK:lla runkoon 208.
- P7–P9 (valo liike kamera / sumea 0 / mv 0, täysi res + msaa 4) LT:n jonossa kierroksen 6 jälkeen. Kun tulos: jos P7 tai P9 ≤ 14 ms →
  oletukseksi (Jalki.cs Valopohja.JuoksuLiikeKappaleet = false tai mv-asetus) + kuvapari P0/P7 (vyoero.py) ennen päätöstä.
- GPU ≤ 14 ms isolla iPadilla on Valosepän (VS 0,8 + MSAA 2, kierros 6).
