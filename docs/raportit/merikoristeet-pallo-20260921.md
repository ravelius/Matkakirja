# Merikoristeet pallon yleiskuvaan — vedos (Karttaseppä 21.9.2026 ilta)

Omistajan toive 20.9.2026 (Codexin koristeet, "veneitä useampaan paikkaan") ja
Fablen tehtävä 21.9.: Codexin käsin piirretyt laivat ja kompassiruusut
(assets/koristeet/meri) valtamerille niin, että ne näkyvät pallon yleiskuvassa.
Ranskan rannikon kahdeksan koristetta (nimiöt z4–z8) pysyvät ennallaan.

## Mitä tehtiin (haara karttaseppa-merikoristeet, 2. versio: POHJAAN)

Ensimmäinen versio (nimiötaso z1–z3 + pallon sarjaan yhdistettynä) ei näkynyt pelissä:
retina-työpöytä lukee maailmankuvaan pallon tasot Z5–Z6 eli pyramidin z4–z5, ja
lepokerros (korkeus < 0,6) ei koskaan piirrä sarjaa. Siksi koristeet ovat nyt POHJAN
KALUSTEITA merten nimien ja pohjan ruusun rinnalla (maailmapiirto.js piirraMaailma
osio 9): pohja on ainoa kerros, jonka pallo näyttää joka tilassa.

- **Data** `assets/koristeet/meri/pallo-koristeet.json`: 29 riviä (4 kompassiruusua,
  25 laivaa), `{ kuva, lon, lat, kokoPx, kierto, tasot }`. KOKO ON LAATAN PIKSELEITÄ
  (vakio ruutukoko kaikilla laitteilla, kuten nostonimiöillä): ruusut 150/125, fregatti 96,
  höyry 92, kuunari 78, kalastusvene 60. Ruusut ja isot laivat z1–z6, pienet z2–z6.
- **maailmapiirto.js** osio 9: `tyyli.koristeet` + esiladatut kuvat (`asetukset.kuvat`),
  laivat vesirajalla (piirraLaivaVedessa); rivin `tasot` (nimioTasolla) myös nimiötasolle.
- **generoi-laattapyramidi.mjs** `--koristeet <json>` (pohjalippu): TYYLI.koristeet,
  kuvat sivulle ja esilataus, umpimeren karsinnan kohta 5 säästää koristeen laatat.
- Ei muutoksia peliin, polttoskriptiin eikä pallon sarjaan: lippu kulkee `--pohjaliput`-
  jonossa, sarja kokoaa pohjan kuten ennen.

## Vedos (paikallinen koepoltto z1–z5 + pallon sarja Z0–6, pelin kaappaukset)

Kansio `docs/raportit/kaappaukset/merikoristeet-20260921/`: `pallo-maailma.jpg`,
`pallo-atlantti.jpg`, `pallo-tyynimeri.jpg` (pelin pallo, 1600×1000 dpr 2; kehittäjän
maailmatila zoomirajan ohi). `maailma-z1/z2.jpg` ja `z3-*.jpg` ovat vedostyökalun tasoesitys
pyramidin laatoista (Miller-arkki kehyksineen) — sellaista näkymää ei ole pelissä.

## Tuotantoon

Pohjapolton 2026-09-22-pohja pohjalippuihin `--koristeet assets/koristeet/meri/
pallo-koristeet.json` (Fable 21.9. ilta: samaan ajoon). Ei erillistä nimiö- tai pallosarja-
erää.
