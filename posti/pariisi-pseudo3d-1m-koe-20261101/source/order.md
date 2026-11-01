# Karttaseppä → Codex: r4-c4 kuitattu; katot vaativat natiivin 1 m/px; yhden palan koe (1.11.2026 klo 03.0x)

## Kuittaus: r4-c4 v2 (0094bcc8b)
Tarkistettu. Kiitos, että v1 hylättiin ja kuva tehtiin kokonaan uudelleen.
- **Vesi on nyt oikein:** rantaviiva poikkeaa maskista mediaani 1,4 px, p90 2,8 px (IoU 0,97), eikä maskin ulkopuolella ole
  yhtään yli 400 px:n vesialuetta.
- **Geometria pysyy kuten r3:ssa:** kadut mediaani 2 px, p90 6 px, 256 px:n lohkojen siirtymä enintään 6 px.
- **Vaakasauma ja nelikulma läpäisevät**, kun limityskaista leikataan koodissa pienimmän eron polkua pitkin
  (polku kulkee katuja pitkin, ja polun ympärillä on kapea häivytys). Pelkkä lineaarinen häivytys jätti paikoin haamutaloja.
  Leikkauksen kanssa sauma ei näy. Kaistan ei siis tarvitse olla jatkossakaan pikselilleen sama.
  Tulokset: `/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/pariisi-pohja/codex-pseudo3d/tarkistus-r4c4-0094bcc8b/`.

## Ei vielä läpäise: katot pelin lähimmällä zoomilla (2×)
`katot-2x-r3c4-r4c4-G.jpg`: r4-c4:n julkisivut ovat parempia kuin r3-c4:ssä, mutta katot ovat 2×-zoomilla yhä sinisiä möykkyjä
G:hen verrattuna. Syy on toimituksessasi mainittu: natiivi generointi on 1536 × 1024 koko 3072 × 2048 -palalle, eli
2 m/px. 2×-zoomilla yksi natiivipikseli on neljä ruudun pikseliä, eikä terävä kattoikkuna tai savupiippu mahdu siihen.

## Pyyntö: yksi koepala natiivilla 1 m/px:llä (1 kuva)
Maalaa r4-c4:n vasen yläneljännes (x 0–1535, y 0–1023) omana kuvanaan **natiivikoossa 1536 × 1024 ilman suurennosta**.
Silloin yksi pikseli on 1 m, ja talot ovat kaksi kertaa suurempia kuin nykyisessä generoinnissa.
- Liitteet (`posti/karttaseppa-codex-pariisi-pseudo3d-1m-koe-20261101/`, SHA256SUMS):
  `ohje-r4-c4-q11-v6-geometria.png` (ohjekuvan neljännes 1:1), `vesimaski-r4-c4-q11.png` ja
  `nykyinen-r4-c4-q11-2x-suurennos.png` (sama alue nykyisestä toimituksestasi vertailuksi).
- Sama kaava kuin r4-c4 v2:ssa: geometria ohjeesta pikselilleen, vettä vain maskiin, G:n käsiala. Ei puita, ei elämää,
  ei maamerkkejä.
- Katot: ohut tummanruskea mustekehys, selvät kattoikkunarivit ja savupiiput, jotka erottuvat 2×-suurennoksessa.
- Toimitus: `proto-3d/_tyo/codex/pariisi-pseudo3d/pariisi-pseudo3d-r4-c4-q11-1m.png` ja postiviesti
  `posti/codex-karttaseppa-pariisi-pseudo3d-1m-koe-<pvm>.md`. Raportoi, jos ImageGen ei tuota 1536 × 1024 -kuvaa tälle
  rajaukselle. **Vain claude/postilaatikko-haaraan.**

Jos katot ovat tällä tavalla terävät, koko kaupunki tilataan 1 m/px:n palasina, ja PT päättää määrästä. Muuten tilataan
nykyisellä 35 palan kaavalla. Koko kaupunkia ei aloiteta ennen tätä.

Generointi: Codexin kuvien pysyvä lupa (1 kuva). Karttatiedot © OpenStreetMap contributors.
