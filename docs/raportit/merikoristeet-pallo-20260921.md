# Merikoristeet pallon yleiskuvaan — vedos (Karttaseppä 21.9.2026 ilta)

Omistajan toive 20.9.2026 (Codexin koristeet, "veneitä useampaan paikkaan") ja
Fablen tehtävä 21.9.: Codexin käsin piirretyt laivat ja kompassiruusut
(assets/koristeet/meri) valtamerille niin, että ne näkyvät pallon yleiskuvassa.
Ranskan rannikon kahdeksan koristetta (nimiöt z4–z8) pysyvät ennallaan.

## Mitä tehtiin (haara karttaseppa-merikoristeet)

- **Data** `assets/koristeet/meri/pallo-koristeet.json`: 29 riviä (4 kompassiruusua,
  25 laivaa) valtamerillä, luokka `kuva`, kenttä `tasot`: kompassit ja isot laivat
  (fregatti, höyry) z1–z3, kuunarit ja kalastusveneet z2–z3. Paikat väistävät pohjan
  omia merinimiä (generoi MERET) ja pohjan ruusua (−132, −38).
- **maailmapiirto.js**: `KUVAN_KOKOKERROIN` z1 0,08, z2 0,15, z3 0,21; rivin `tasot`
  rajaa ladonnan (`nimioTasolla`); ilman kenttää nimiö ladotaan vain z ≥ 4 kuten tähän
  asti, joten z1–z3 saa vain nämä rivit.
- **generoi-laattapyramidi.mjs** `--koristeet <json>`: lista liitetään nimistön perään
  (Sisältökirjurin nimistö ja Karttasepän koristeet eri tiedostoissa).
- **polta-paikallisesti.sh** `--koristeet`, `--nimiotasot 1-8` (oletus 4-8),
  `--pallon-nimiot`; ajon tunnus huomioi pallon nimiölipun.
- **tee-pallolaatat.mjs** `--nimiot`: nimiötaso yhdistetään sarjaan vain pyramidin
  tasoilla z ≤ 3 (`NIMIOT_PALLOON_Z`) eli yleiskuvaan, jota lepokerros ei kokoa
  (LEPOKERROS_KORKEUSRAJA 0,6); syvemmät tasot piirtää lepokerros, ei tuplausta.
  laatat.json saa kentät `nimiot` ja `nimiotaso.tasot` (pallon Z = z + 1).

## Vedos (paikallinen koepoltto z1–z3, pohja 2026-09-21 levyltä)

Kansio `docs/raportit/kaappaukset/merikoristeet-20260921/`: `maailma-z1.jpg`,
`maailma-z2.jpg`, `z3-atlantti.jpg`, `z3-intia.jpg`. Ladonta: z1 12 koristetta,
z2 27 (2 pudotettu, ei tilaa), z3 29 (kaikki). Koepoltto 3 s, 52 laattaa, 0,3 Mt.

## Tuotantoon (omistajan hyväksynnän jälkeen, erillinen erä)

1. Nimiöversio `2026-09-22g-nimiot`: aja-2:n nimiöshardi lipuilla
   `--nimiotasot 1-8 --koristeet assets/koristeet/meri/pallo-koristeet.json` (~2 min).
2. Pallon sarja uudella tunnisteella (`20260922b`) `--pallon-nimiot` (2,5 min levyltä).
3. Osoitin-PR: js/pallo.js PALLO_LAATTATUNNISTE, sw.js LAATTAKANSIO; luettelo ämpäriin
   vasta kun osoitin on mainissa.
Ei muutoksia peliin: nimiöt ovat laatoissa, eivät eläviä.
