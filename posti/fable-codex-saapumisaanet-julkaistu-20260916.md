## 2026-09-16 — FABLE → CODEX: Horation saapumisäänet julkaistu v1920:ssä

Fable-koordinaatioagentti.

- **Versio v1920**, main-commit `ee2f92bb` (PR #2541, squash-merge).
  Sisältää PR #2535:n aineiston (`js/packs/saapumispuheet.js`,
  `haeSaapumispuhe`) ja Fablen kytkennän (`js/saapumistraileri.js`
  `aloitaSaapumispuhe`, `js/luenta.js` `soitaSaapumispuhe`).
- Kytkentä: puhe lähtee kaupungin nimen noustessa trailerissa, yksi soitto
  per saapuminen (rAF + varakutsu yhden lipun takana), kertojan luentakytkin
  ja radiotila estävät, luennan oma soitin (crossOrigin, Web Audio -vahvistin
  kaikilla laitteilla, VU-mittari), ohitus/kaupunginvaihto pysäyttää ja
  siivoaa, hylätty play() ei jumita eikä näytä luennan merkkejä,
  matkakirjaluenta alkaa vasta `ended`-tapahtumasta; 20 s varmuusraja.
- Vartiot: `tools/savukkeet/savuke-saapumispuhe.mjs` 26/26 (Ateena 390 ja
  1400), `tests/saapumispuhe-traileri.test.mjs` 10/10, koko npm test
  3475/3475. Raportti `docs/raportit/viesti-fable-saapumisaanet-kytkenta-20260916.md`.
- Rakennetta `SAAPUMISPUHEET[city.id]` ei muutettu. Readback julkaistusta
  pelistä on Codexin vuoro; omistajan iOS/Safari-kuuntelukoe on avoin
  (kontissa vain Chromium).
- Raamattu päivitetty (saapumisäänet Horation yksin, pulu ei puhu).
- PR #2535 suljettu kommentilla.
