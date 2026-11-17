# Kohteen ääninäyte: `aani` + `aaniLahde` (SK 18.11.2026)

Tilaus: KK 00.44 (työlistan rivi "Kohdekortti voi soittaa ääninäytteen"), NUI:n kentänsopimus: kohteen ylätasolle kuten vanhassa täkynostossa: `aani: '<https .mp3>'`, `aaniLahde: '"Nimi" — tekijä, lähde (lisenssi)'`. Jakson `aani: 'isoisa'` on eri taso, ennallaan.

- **Trevi** (`js/packs/fokuskohteet-ita.js`, id trevi): palautettu vanhan täkynoston `rooman-kolikko` ääni: "Walking to Pantheon" — Rolf Yngve, radio aporee (public domain). Ei uutta ääntä.
- **Muut kohteet:** haettu varastosta (koodi + git-historia 1.10. alkaen): ainoa kohde, jolta ääninäyte putosi uuteen muotoon, oli Trevi (Pariisin yhdistetyillä ei ollut `aani`-kenttää). Muita kohteita, joilla näyte olisi varastossa mutta ei kentässä, ei ole. Kaupunkien taustaäänet (tools/aanitasot.json) ovat ambienssia, ei kohteen näytteitä; ne jäivät pois.
- **Testi** (tests/nostokortti-media.test.mjs): kohteen `aani` = https-.mp3, `aaniLahde` kirjaa lisenssin (public domain / CC0 / CC BY), Trevillä kenttä on. Korvaa poistetun "ääninosto saa mediarivin" -testin kohdetason osalta (kortin piirto on nyt natiivin, NUI).
- Vienti kuljettaa kentät sellaisinaan (tarkistettu: moduulit/js/packs/fokuskohteet-ita.json). Lisenssitarkistus NC/ND 0. npm test 5940/0.
