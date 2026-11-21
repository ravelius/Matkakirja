# Valosepän luovutus 3.11.2026 klo 18.11

Syy: kontekstiraja (26–28 %, Raamattu 7.37), luonteva tauko: k2-esikatselu JU:n jonossa Tripo-tauon (18.10–19.10) jälkeen.
Edellinen: viesti-valoseppa-luovutus-20261103-1626.md (pysyvät työtavat -20261101-2124.md, -2220.md voimassa). Loki:
`/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md` (B alla = tämä kansio). Python: `$B/tulivuoret/venv/bin/python -I`.
Esikatselu vain JU:n vuorolla (JU ajaa itse ja ilmoittaa hakemiston; JU:n uusi id local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd).

## Tehty tässä sessiossa
- sal11 769cb9ea6 (keijun saumat) PT KUITTASI junaan 218 (JU yhdistää). ISS-erä kokonaan junassa; työlistan ISS-rivi päivitetty.
- Levysiivous (PT 17.0x): simu03/03b/03c-app → T7 `Matkakirja-arkisto/linssiseppa2-app/` symlinkein; wt vahti216 ja varjo216 poistettu
  (haarat originissa). Jäljellä wt: iss218 (keiju-sivu), kontakti218, seinat218 (sade), tulivuoret, k17 (= nyt pariisi-tyyli).
- Rakettivideo TAUOLLA (PT 16.5x), työlistan rivi tauolla.

## TYÖN ALLA: Pariisin koealue striimikartan päälle, OSA B (PT 17.1x, OMISTAJAN PÄÄTÖS 16.51)
Suunnitelma (lue kokonaan): `/Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261103-pariisi-striimikartan-paalle.md`.
Mittari: hyväksytty tyyli `_tyo/codex/pariisi-koealue-20261103/tyylimalli-hyvaksytty-2029.png` (sinkki- ja tiilikatot, kermanväriset
pihat ja kadut, harmaanvihreä Seine, kellanvihreät puistot). KS: esinepaikat `_tyo/karttaseppa/pariisi-koealue-20261103/esinepaikat.json`;
Codex-pinnat (4 kattoa, vesi, nurmi, paperi, 1024²) KS:n tilauksesta ab78cb4c0 → KS välittää tarkistettuina.
- Haara **linssiseppa2/pariisi-tyyli** (natiivi-backup), wt `/Users/Shared/Claude/wt/proto-linssiseppa2-k17`, pohja juna-218 1420265d7:
  91ae73cac (k1) → **8e8b0f25b** (k2). Tiedostot: uusi `Kartta/ElavaPariisi.cs` (koealue + 0,0012° häivytys, pinnat mip-tasoin
  maailman koordinaateista, KattoLaji, Heilu = käsivärinä), `ElavaTyyli.cs` (pa-haara PiirraVuokralla + PariisiKoostus),
  `Laattapalvelin.Elava.cs` (välimuistipääte -p1 vain koealueen laatoille), `Laattapalvelin.cs` (Alusta), `Komennot.cs`
  (`elavakartta pariisi 1|0`, oletus POIS). Pinnat raaka-RGB `Assets/StreamingAssets/ElavaPariisi/{paperi,vesi,nurmi,katto1-4}.rgb`
  (väliaikaiset: `$B/pariisi-tyyli/pinnat.py <kansio>`; Codexin PNG:t muunnetaan samoiksi .rgb-nimiksi, koko 2:n potenssi).
- k1 (`lokit/esikatselu-20261103-180359`, n|s|p × lahi/keski/laaja, kolmikot `$B/pariisi-tyyli/k1/kolme-*.jpg`): toimii, kääntyy.
  Viat → k2: reunapaloista puuttuivat tavalliset talot (nyt piirretään, kun pala ei ole kokonaan koealueella), maanalaiset radat
  näkyivät (brunnel=tunnel pois), katot liian tummat ja nurmi liian keltainen (vaalennettu).
- **k2 JU:n jonossa** (L1 Tripo-tauon jälkeen ~19.10): `zsh $B/pariisi-tyyli/k2/ajo.zsh <linja>`, vain p-kuvat (n ja s k1:stä samoista
  rajauksista). SEURAAVAKSI: tarkista 2× (katot vs. mittari, reunahäivytys, kadut), kuvapari nykyinen (k1 n-*) | koealue (k2 p-*)
  kolmella zoomilla → PT ≤ 3 riviä. Tunnettu: Cité ja rannat vihertävät (landcover grass) → harkitse nurmi vain park-tasosta ja
  isoista grass-alueista. Codexin pinnat vaihdetaan heti, kun KS välittää. Sitten laattojen piirtoaika isolla iPadilla (JU:n vuoro).
- NS omistaa ElavaMvt:n (kaatumiskorjaus, ei häiritä); kerrottu, mihin tiedostoihin kosken.

## Muuta
- Sade (linssiseppa2/sade-218, 5ed5f95e2) odottaa äänen laitetarkistusta.
