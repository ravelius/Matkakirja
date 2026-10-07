# Pelikoodarin luovutus 7.10.2026 (päivitetty klo 05.3x)

Uusi Pelikoodari: lue tämä, sitten docs/raportit/viesti-pelikoodari-aloitus.md. Edellinen: viesti-pelikoodari-luovutus-20261006.md.

## Julki / mergetty 7.10. yöllä
#4081 tiet-v2, #4082 pidempi kerronta, #4089 vuosiluvut numeroina → puheeseen sanoina (korvasi #4085), #4086 lyhin reitti
(+ Liikun kierros-kenttä, LS1 junassa 156), #4084 äänikartan laskin, #4090 Pariisin äänikartta indeksiin.
Ämpärissä: aanet/aanikartta-v1/pariisi.json, aanet/aanimaisema-v1/<kerros>-01.mp3 (14 silmukkaa; CC BY -tekijät krediitteihin,
Siirtoseppä vie). Siirtoseppä ajaa todistustallenteen (mp3-sauma: tee ogg/wav, jos katko kuuluu).

## Auki
- #4088 Opus-kytkin (ei päälle; omistaja: kertoja pysyy Sonnet 5.5). #4092 sallitut 3D-kaupungit (36, LS2): kenttä heti, esto
  OPAS_SALLITUT_ESTO=1 vasta kun juna 157 TF:ssä.
- ESIGENEROITU ESITTELY (omistaja 00.4x): haara pelikoodari-esittely (ei vielä PR): tools/opas/ (pohja, tarkistin, kooste, äänet,
  kuuntelu, siltalauseet-v2), tools/pollo/opas-esittely.js + worker tarjoaa valmiin tekstin (valmis: true), aineistot esittely: [].
  Pilotti Pariisi/Praha/Wien: tekstit _tyo/opas-esittely/korjattu/ (Päätoimittaja kuittasi), äänet R2:ssa + kuuntelukoosteet
  _tyo/opas-esittely/aanet/kuuntelu/ → OMISTAJA KUUNTELEE AAMULLA. Sen jälkeen: vienti opas/esittely-v1/<id>.json (vie-paketti),
  esittely-indeksi auki, PR. Muut 31 kaupunkia: omistajan pilvisessio esittely-tyo/OHJE-pilvi.md (haara pelikoodari-esittely-pilvi).
  Isoisä vain julkaistusta merkinnästä (fokusvirta-*.js), "Kun tulet paikalle" ≤ 1/kaupunki.
- Siltalauseet "ei-sallittu" (4 kpl, Päätoimittaja hyväksyi tekstit): tools/opas/tee-siltalauseet-v2.mjs valmis, EI ajeta ennen
  omistajan lupaa; sitten LS1 lukee siltalauseet-v2-polun.
- Äänikartat Venetsia + Kööpenhamina ajossa (_valmiit/aanimaisema-vienti-20261007b) → tarkistuskuva, LAHTEET, SHA, vienti, indeksi.
- Yövalojen tiet 29 sallittuun kaupunkiin (säde min(r_m, 6 km), ≥ 3 km) — odottaa LS1:n kuittausta.
- Kuvalista: tee-opas-kuvat.mjs ottaa puuttuvat kaupunkikoordinaatit pallopisteistä (esittely-haarassa) → kuvat-v3.

## Opit
Agent isolation "remote" ajoi paikallisesti Matkakirja-fable/.claude/worktrees (11 Gt) → pysäytetty, siivottu (muisti).

## Päivitys 05.3x
- Mergetty: #4092 sallitut (esto pois, OPAS_SALLITUT_ESTO=1 vasta juna 157 TF:ssä), #4102 äänikartat Venetsia + Kööpenhamina.
  Ämpärissä myös tuuli-01/sade-01 (Siirtoseppä). Lisää äänikarttakaupunkeja vasta Pariisin todistustallenteen + PT-kuittauksen jälkeen.
- Auki: #4098 sallitut 38 (Varsova, Sisilia; islanti nimellä Reykjavík), #4103 kuvalista → kuvat-v4 (merge vasta kun
  kuvat-v4/kuvat.json 200). Vientijono Julkaisijalla: opas-kuvat-vienti-20261007 (v3) → -20261007b (v4) → kartta-tiet-vienti-20261007
  (31 sallittua; sen jälkeen indeksi-PR: tiet-listaan 31 id:tä, kartta/tiet-v1/<id>.json).
- Pilotin äänet valmiit (71 kpl, R2 + kuuntelukoosteet _tyo/opas-esittely/aanet/kuuntelu/) → omistaja kuuntelee aamulla.
- Pilvihaara pelikoodari-esittely-pilvi: 35 kaupunkia, OHJE-pilvi.md (omistajan claude.ai/code-sessio).
- Siltalauseet v2 (ei-sallittu) ja muut äänet: ei maksullisia generointeja ennen omistajan kuuntelua.
- tee-tiet.mjs välimuistiavaimeen keskipiste (esittely-haarassa) – Kreeta ajettiin ensin vanhan pisteen datalla.
