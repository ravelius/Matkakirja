# Valosepän luovutus 1.11.2026 klo 16.19

Syy: konteksti 25 % (pehmeä raja). Edellinen: viesti-valoseppa-luovutus-20261101-1505.md (PYSYVÄT TYÖTAVAT 1 ja 2 voimassa:
pitkä Unity-ajo Monitorilla valmis + kuolema; jokainen valmis kuva-ajo HETI omistajalle SendUserFilella + polku PT:lle).
Loki: `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md` (rivit 15.13–16.1x). Skriptit: `_tyo/linssiseppa2/skriptit-20261031/`.

## TEHTY
- Nopeutus (PT 15.1x): pysyvä taustaeditori EI käyttöön (säästö 10–45 s/ajo) → `_tyo/linssiseppa2/nopeutus-tulos.md`.
  PT 15.2x: ehdotukset 1 + 3 käyttöön: proto **29fbc5ecf** (k17-haara; runkoon 82c1d9f3d) editori.sh kohtakohtainen `odota-maailma 90 1`
  (ehto atlakset 0 + häivytys 0 + vakaa 3 s); useampi kohta per ajo. Ei toista linjakopiota (levy).
- Eteläsuu suu-216c (lokit/esikatselu-20261101-151221/suu-koonti.jpg): keskiovi kiinni → PT: ei enempää suukuvia (PK tarkistaa kaaren).
- 06: v06 + v06b (esikatselu-20261101-154237 ja -155122): siipien elävät varjot TOIMIVAT (leivheitto 1 vs 0 yläkuvassa); pelin Wumenin
  U-piha leveämpi kuin havainteen kapea käytävä → geometria, LAV:lle kirjattu. PT: ei enempää 06-kameraiterointia.
- Taantuma rungossa 65ceff743 (NS:n koonti 154506 valkoiset lattiat): syy = pelin oletus vertailuvalo (JuoksuVertailuValo true) + PK:n kivi
  1,06 viritetty leivotussa valossa. PK korjasi ehdolliseksi **cc8b5ad92** (kivi-216b). PT 16.0x: **leivottu valo oletukseksi** →
  proto `linssiseppa2/oletus-leivottu-216` **89280ca51** (65ceff743 + JuoksuVertailuValo = false), NS:lle runkoon cc8b5ad92:n kanssa.
  Worktree `wt/proto-linssiseppa2-varjo216` on nyt tällä haaralla.
- Koonti 65ceff743 leivotussa valossa (ESIKOM valo vertailu 0): `lokit/havainne-editori-20261101-155802/koonti.png` → omistaja + PT.
  Lattiat ok (02 229/202/183, 05 234/206/188); varjot 03/03b näkyvät; 01/02 kujat, 04 pylväät, 05 ilman varjoja (havainteessa vahvat).
- Mittausskripti lattian kirkkaudelle: `/opt/homebrew/bin/python3` (numpy vain siinä) + skripti kopioitu `skriptit-20261031/lattia.py`.

## AVOIN (järjestys)
1. **Simukuva 03 vain varjojen laitetarkistukseksi** (PT 16.0x; EI hinta-ms:ää, EI 2 ms rajaa – omistaja 31.10. 18.31). Rungolla, jossa
   89280ca51 + cc8b5ad92 (odota NS:n runkoilmoitus), simu-lukko.sh:lla (Raamattu 12.17), kuva omistajalle + PT.
2. Puuttuvat varjot 01/02/04/05 koonnissa 155802: selvitä (vrt. 03 korjaus 814844b18). NS:n vihje: `JuoksuSokkeloMaailma.Muurikate.cs:613`
   PiirraInst antaa leivotuille osasarjan instansseille (mats != null) aina ShadowCastingMode.Off ohi LeivotutHeittavat-kytkimen, ja
   JuoksuLattia.shaderin ShadowCaster-passista puuttuu multi_compile_instancing → kujien (01/02) julkisivut ovat osasarjan instansseja.
   Kysy PT:ltä ennen isoa erää.
3. Työkalu 6fad3642c (editori.sh 06 TESTIKAMERA) ei rungossa → NS:lle tiedotettu; ilman sitä 06 katsoo lattiaan.
4. Vanhat: läikät 03/04, 07 usva + taivassauma.
