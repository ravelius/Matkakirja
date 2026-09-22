# Seuraamisvirhe-mittaus: ohje

Mittaa kameran seuraamisvirheen aidolla hiirellä/sormella (ei synteettinen
syöte — CGEvent ja Playwright-dispatch eivät tässä kelpaa, ks. skriptin
oma header ja docs/raportit/seuraamisvirhe-v2106-20260922.md). Käytetään
sulavuuskatsauksen kohdan 13 (syöte kerran per rAF-kehys, ei per tapahtuma)
korjauksen todentamiseen.

## Ajo

```bash
node tools/mittaus/seuraamisvirhe-palvelin.mjs
```

Avaa tulostettu osoite (esim. `http://127.0.0.1:8794/?lauta=pallo&dev=marseille&koe=mittaus&luonnollinen=1`)
oikeassa Safarissa JA oikeassa Chromessa (kaksi erillistä ajoa, sama
palvelin kelpaa molemmille). Vedä hiirellä/sormella kartalla jatkuvasti
tallennuksen ajan — sivu poistaa saapumiskortin ja käynnistää tallennuksen
itsestään noin 8-9 sekunnin kuluttua latauksesta, kesto oletuksena
8 × 2,2 s ≈ 21 s.

Tulokset kirjautuvat suoraan `docs/raportit/data/seuraamisvirhe-<pvm>.jsonl`-
tiedostoon (EI /tmp:hen — ensimmäisen ajon raakadata menetettiin Mac-
kaatumisessa 22.9.2026, koska se oli vielä /tmp:ssä).

## Muut mittauspisteet

Oletus on Ranska/Marseille z6 (`--dev marseille --lat 46.5 --lng 2.5 --alt 0.2`).
Camarguen z8-pisteelle:

```bash
node tools/mittaus/seuraamisvirhe-palvelin.mjs --dev marseille --lat 43.55 --lng 4.5 --alt 0.05
```

## Tarkistus hyväksymisrajaa vasten

```bash
node tools/mittaus/seuraamisvirhe-palvelin.mjs --tarkista docs/raportit/data/<tiedosto>.jsonl
```

Hyväksymisraja (Fable/omistaja 22.9.2026): **p10 > 0,7 JA p90 < 1,4**
jokaisella kierroksella, sekä Safarissa että Chromessa. Perustaso ennen
Pelikoodarin interpolointikorjausta: p10 = 0 kaikissa 16 kierroksessa
kummallakin moottorilla (ks. seuraamisvirhe-v2106-20260922.md) — työkalu
tulostaa PASS/FAIL rivin per kierros ja yhteenvedon.

Omat rajat: `--p10 0.7 --p90 1.4` (samat oletuksena, muutettavissa jos
hyväksymisraja tarkentuu).
