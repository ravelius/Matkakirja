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

## 18.55 LISÄYS: omistajan palaute 18.28–18.39 (PT:n erät)
- Haara **pelikoodari/palaute-208 = c909a692a** (2d832a656:n päällä; väliversio 231c425d1). PT:lle ja NUI:lle kerrottu.
- 18.28: drone edestä/kaarto taakse, mikserin konteksti "pelit" (kartan musiikki pidossa koko juoksun; ennen palasi 0,3 s:ssa),
  käännösikkuna 6,5–9,8 m + avoimen puolen pyyhkäisy aina käännös, Puyi/takaa-ajaja maan pintaan (JuoksuKorkeusKartta.Maa),
  kompastus hidastaa 0,35 × 1 s ja eunukki kirii (kiinni vasta saavuttaessa).
- 18.35–18.39: alku keskeltä (PalatsiAlku "keski", JuoksuAvaus.PuyiAlku 4,6/−128 pohjassa) etelään; drone maailman avaimilla
  ulkoa Meridiaaniportin keskiaukon läpi (x 10,7–15,8, holvi 8,5 m, z −397…−366), nousu, Taihemenin yli (≤ 23,6 m), aukiolle;
  sekoitus Puyin kehykseen 10,9–11,8 s; ohjaus 15,5 s. Törmäystesti Peli-testit/Kultaiset/avauslento-esteet.bin.gz (LOD0 tausta-v6 +
  rakennukset-v12; uusi tausta/malli → proto-3d/_tyo/pelikoodari/avauslento-208/geom.py + ruudukko.py, lento.py = radan viritys).
- Huudot 3D (JuoksupeliNakyma.Eunukit3D/PaivitaEunukit, JuoksuV4Maailma.EunukkienPaikka + Kaiut), v3 05/06-pitkä porrastettuna 0,7 s.
- Ohita: JuoksupeliNakyma.OhitaAvaus() / AvausKaynnissa (NUI tekee napin).
- AVOIN: lennon ulkonäkö, kallistuksen suunta ja huutojen tasot laitteella näkemättä; Puyi-botti voi kääntyä avauksen aikana
  risteyksessä (kamera seuraa, ei törmäysriskiä aukiolla). P7–P9 edelleen LT:n kierroksen 6 jälkeen.
