# Karttaseppä: luovutus 1.11.2026 klo 10.35 (KS local_740947d7)
Edellinen: viesti-karttaseppa-luovutus-20261101-0830.md (sen kohdat A ja B on käsitelty; reitti vaihtui). Syy: konteksti 25 %.
C = `/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/pariisi-pohja/codex-pseudo3d/`. Jokaisessa kansiossa on MUISTIO.md.

## LINJA (omistaja 08.5x, 09.3x, 09.5x, 10.28; PT)
Lukitun pohjan reitti (kooste-97, yleistetty ohjekuva, 0,5 m/px) on pois. Codex piirtää vapaasti G-tyyliin porrastetusti:
**laaja 12 m/px (1 kuva) → välitaso 3,5 m/px (12 palaa 4×3) → lähitaso ~1 m/px.** Zoomissa tasot ristihäivytetään, eikä
lähitasoa liitetä laajaan (PT 10.3x). Merkit ja nimet ankkuroidaan piirroksen kohteisiin. Sävy G:n mukaan (`C/savyta-g.py`).
**Pääkohteet yhtä liioiteltuja kuin G:ssä metreinä kaikilla tasoilla** (omistaja 10.28): Louvre 870 m, Notre-Dame 575,
Sainte-Chapelle 140, Eiffel 500, Panthéon 440, Garnier 390, Sacré-Cœur 340, Invalidit 240, Riemukaari 180.

## TEHTY
- G 2×2 (`C/g-2x2-koepala-20261101/`): Codex fad33f1bd, koottu ja sävytetty (koottu-v1-savy.jpg) = **hyväksytty lähin taso** (omistaja 09.5x).
- Laaja v1 3cf603ec3 ja v2 6bd1ed940 (`C/laaja-g-20261101/`): v2 = ääriviiva ja Seine oikein; omistajan kolmikko
  kolmikko-omistajalle-v2.jpg on PT:n kautta KK:lla. Välitason suunnitelma VALITASO-SUUNNITELMA.md (PT hyväksyi).
- Kuittaukset Codexille: 21eb27157 (2×2), 1eb23ee9b (v1), 658fa8eb1 (v2). Vanha yleistyskoepala a4815ad14 on suljettu.
- LEVY (PT 10.2x): 9 worktreetä poistettu (~20 Gt), postilaatikko-wt mukaan lukien; tasangot-213 pusketty omaan etähaaraansa 43621e3f5.
- GC-korjaus NS:lle: proto karttaseppa/tuileries-lahitaso-216 4613582d5 (PeittoRuutu ilman taulukkoa), NS:llä.

## AVOIN (järjestyksessä)
1. **Laaja v3** tilattu, postilaatikko d2d1386c1 (`posti/karttaseppa-codex-pariisi-laaja-g-v3-20261101.md`), toimitus
   `proto-3d/_tyo/codex/pariisi-laaja/pariisi-laaja-g-v3.png`. Kun tulee: SHA → pari **G:n rajauksella ja mittakaavalla**
   (G-alue laajassa x 612–838, y 451–595; vrt. pari-tyyli `C/laaja-g-20261101/pari.py` / liita-v2.py:n sauma-crop) +
   **kohdemittataulukko G vs v3 metreinä** (mittaa leveydet px × 12 m) → PT. Kuittaus Codexille.
2. **Välitason erä 1** (r2c2 + r2c3) tilattu 8f9c17356 + lisäys samassa d2d1386c1 (liioittelu metreinä, 3,5 m/px).
   Kun tulee: `python3 C/valitaso-20261101/kokoa.py <kansio> v1 r2c2 r2c3` → pari, sauma, G-alueen kohdistus → PT.
   **Muut 10 palaa vasta, kun omistaja on nähnyt v3:n** (PT 10.3x).
3. Postilaatikko ilman worktreetä: haku `git fetch origin claude/postilaatikko` + `git show origin/claude/postilaatikko:<polku> > tiedosto`;
   kuittaukset plumbingilla (GIT_INDEX_FILE=tmp read-tree + update-index --cacheinfo + write-tree + commit-tree,
   push `"${c}:refs/heads/claude/postilaatikko"` – zsh: lainausmerkit, muuten `$c:r` syö merkkejä).
4. Siivottavissa (ei kiire): `C/../_muokkaa_*.py`, `*.ennen-*.py`, kooste-1m.py:n KOOSTE_KOEPALA (vanhan reitin jäänne).
