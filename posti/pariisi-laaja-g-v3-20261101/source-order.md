# Karttaseppä → Codex: Pariisin laaja G v3: pääkohteet yhtä liioiteltuina kuin G:ssä, keskustan kehys pois (1 kuva; 1.11.2026)

**Omistajan päätös 1.11. klo 10.28 (KK, PT 10.3x), sanatarkasti:** "pääkohteet pitää olla yhtä liioiteltu kuin g versiossa".
v2 (6bd1ed940) on muuten hyvä pohja: ääriviiva, Seine ja mittasuhteet säilyvät. Muutetaan vain alla oleva.

## Aineisto (kansio `posti/karttaseppa-codex-pariisi-laaja-g-v3-20261101/`, SHA256SUMS)
- `ohje-laaja-v3-pohja-v2.png`: oma v2:si. **Piirrä v3 tämän pohjalta.**
- `kaupunkimaski-laaja.png`: ääriviiva kuten v2:ssa.
- `G-referenssi-owner-style-G-confirmed.jpg`: liioittelun mittari. G:n kehys on noin 2,7 km / 1280 px, eli 2,12 m/px.

## Pääkohteiden koko metreinä (leveys kartalla; laaja 12 m/px)
G:stä mitattu: Notre-Dame noin 575 m (todellinen 134 m, ×4,3), Sainte-Chapelle noin 140 m (40 m, ×3,5) ja Louvre
noin 870 m (709 m, ×1,2; iso kohde liioitellaan vähemmän). G:stä puuttuvat tehdään samalla periaatteella (pienet ×4):

| kohde | leveys m | laajassa px |
|---|---|---|
| Louvre (pyramidi näkyvä) | 870 | 72 |
| Notre-Dame | 575 | 48 |
| Sainte-Chapelle | 140 | 12 |
| Eiffel-torni (jalustan leveys, korkeus suhteessa) | 500 | 42 |
| Panthéon | 440 | 37 |
| Opéra Garnier | 390 | 33 |
| Sacré-Cœur | 340 | 28 |
| Invalidit (kupoli) | 240 | 20 |
| Riemukaari | 180 | 15 |

Muut maamerkit (Grand Palais, Orsay, Luxembourg, Concorde) pidetään v2:n kokoisina tai korkeintaan ×2.
Kohde pysyy paikallaan: sen jalusta on oikeassa kohdassa, ja liioiteltu rakennus peittää ympäristöään kuten G:ssä.

## Lisäksi
- **Keskustan valkoinen suorakulmakehys pois** (v2:ssa G-alueen länsi- ja eteläreunan suorat valkoiset "kadut").
  Korttelit jatkuvat sen yli.
- Tyyli, sävy ja kaikki muu kuten v2:ssa. **Pois:** tekstit, lentokoneet ja linnut.

## Toimitus
`proto-3d/_tyo/codex/pariisi-laaja/pariisi-laaja-g-v3.png` (1536 × 1024 RGB) ja postiviesti
`posti/codex-karttaseppa-pariisi-laaja-g-v3-<pvm>.md`, jossa ovat SHA256 ja **toteutuneet leveydet px:inä** kohteittain.
Teen parin G:n rajauksella ja mittataulukon PT:lle. **Vain claude/postilaatikko-haaraan.**

Generointi: Codexin kuvien pysyvä lupa (1 kuva). Karttatiedot © OpenStreetMap contributors.
