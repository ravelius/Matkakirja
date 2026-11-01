# Karttaseppä: luovutus 1.11.2026 klo 12.10 (KS local_740947d7)
Edellinen: viesti-karttaseppa-luovutus-20261101-1035.md (käsitelty). Syy: konteksti 25 %.
C = `/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/pariisi-pohja/codex-pseudo3d/`. Jokaisessa kansiossa on MUISTIO.md tai raportti.

## LINJA (omistaja 10.28, PT 10.3x–12.1x)
Pariisi porrastetusti: **laaja 12 m/px → välitaso 3,5 m/px (12 palaa 4×3) → lähitaso ~1 m/px (G 2×2)**, zoomissa
ristihäivytys, ei liitoksia. Pääkohteet G:n liioittelulla metreinä (Louvre 870, ND 575, S-C 140, Eiffel 500, Panthéon 440,
Garnier 390, Sacré-Cœur 340, Invalidit 240, Riemukaari 180).

## TEHTY
- Laaja v3 (08d9ff181, kuittaus 3bd8531fe) → mittaus `C/laaja-g-20261101/v3/MITTAUS-V3.md`: Louvre tiivis 600 m → v4 tilattu 9b2bd8ea7.
- **Laaja v4** (b5b817add, kuittaus 78f91a392): `C/laaja-g-20261101/v4/MITTAUS-V4.md`, pari-G-v4.jpg, zoompari-louvre-v4.jpg.
  Louvre G:n pitkä muoto ~950 m (+9 %), Riemukaari 240 m (+33 %), muut ±5 %. **PT hyväksyi 12.0x → KK omistajalle.**
- **Välitaso erä 1** r2c2+r2c3 (08d9ff181): `C/valitaso-20261101/` *-v1.jpg, sauma ei näy, G-alue = lähitaso.
  OPPI: Codexin mitat tarkistetaan itse (Codexin Louvre 370 px sisälsi Rivolin talot; oikea ~250 px = 870 m).
- **Pelin kerrokset (PT 12.1x, odotuksen erä):** proto `karttaseppa/pariisi-tasot-216` **77f63eb25** (juna-216 eddff7063 päällä,
  worktree /Users/Shared/Claude/wt/proto-karttaseppa-lahitaso): PiirrosKerros.cs `Tasot` laaja/vali/lahig, häivytys ruudun
  m/px:n mukaan, `PorrastettuPelissa = false`; Kartta-testit `./kaanna.sh Piirros` 4/4. PiirrosKerros.cs:ää ei voi kääntää
  ilman Unityä (NS kääntää). Laatat `pariisi-pohja/kokoelma/G-tasot/natiivi/` (`C/tasot-20261101/tee-tasot.py <ulos>`).
  **NS-lista `C/tasot-20261101/NS-LISTA.md`** (rajat, häivytys, PiirrosPeitot v4:n karikatyyreille, Kyyhkyposti ND:n alla).
  **EI NS:lle ennen omistajan hyväksyntää (PT).**

## AVOIN (järjestyksessä)
1. Odota omistajan päätöstä (KK) laajasta v4:stä ja välitason muista 10 palasta. Hyväksynnän jälkeen: tilaa loput 10
   (VALITASO-SUUNNITELMA.md; ohjeet `C/valitaso-20261101/ohjeet.py`, erä 1:n tilaus 8f9c17356 + d2d1386c1 mallina, liioittelu
   metreinä; Louvre-malli `C/louvre-uusinta-20261101/`), tarkista mitat itse (`C/laaja-g-20261101/v3/viivain.py`).
2. Kun välitaso 12/12: `kokoa.py` + tee-tasot.py (RAJ-taulukko kaikille paloille; kankaan koko ja rajat → PiirrosKerros.cs
   Tasot[1]) → PT → omistajan hyväksyttyä NS:lle NS-LISTA ja flag true. Avoin omistajalle: lähin zoom (NS-LISTA).
3. Postilaatikko: `git fetch origin claude/postilaatikko` + `git show …:<polku>`; kuittaukset plumbingilla
   (skriptimalli scratchpadissa ei säily → ks. 1035-luovutus kohta 3).
4. Siivottavissa (ei kiire): `pariisi-pohja/_muokkaa_*.py`, `*.ennen-*.py`, kooste-1m.py:n KOOSTE_KOEPALA.

## LISÄYS 12.2x (PT, sitova: ei väliaikaisia poikkeamia)
Lähin zoom EI muutu. `PorrastettuPelissa` true vasta, kun **koko kaupungilla on lähitaso** samalla lähimmällä zoomilla kuin nyt
(0,75 km tarkkuusalue säilyy); siihen asti pelissä nykyiset 1 m/px- ja 0,5 m/px -laatat. Proto 990659ede (ehto koodin
kommenttiin), NS-LISTA päivitetty. Avoimen kohdan 2 kääntö siis vasta lähitasojen jälkeen (määrä ja tilaus PT:ltä).
