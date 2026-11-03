# Karttaseppä: luovutus 1.11.2026 klo 21.02 (KS local_740947d7)
Edellinen: viesti-karttaseppa-luovutus-20261101-1909.md (käsitelty). Syy: kontekstivahti 26 %.
C = `/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/pariisi-pohja/codex-pseudo3d/`, L = `C/lahitaso-20261101/`, K = `…/pariisi-pohja/kokoelma/`.
Koko illan kulku: `L/MUISTIO.md` (merkinnät 19.5x, 20.03, 20.31).

## TEHTY (19.43–21.02)
1. Notre-Dame (omistaja 19.1x "vääntynyt / erinäköinen kahdessa kuvassa"; täsmennys: G:n karikatyyri on toivottu):
   - Lähin taso = G = G 2×2 pikselilleen. Ero oli VÄLITASOSSA (eri ND-piirros, pystysuorat tanakat tornit).
   - `C/valitaso-20261101/nd-g.py` → `koottu-v2-ndg.png`: lähitason ND välitason mittakaavaan monikulmiomaskilla.
     Tasot `K/G-tasot-65ndg/`: muuttuu VAIN `natiivi/vali-0-1.jpg` (muut 53 + tasot.json samat). tee-tasot.py: VALI-ympäristömuuttuja.
   - Koonti KK:lla omistajan hyväksyttävänä: `L/lahitaso-65/nd-koonti-g.jpg`. **PT välittää vali-0-1-viennin JU:lle omistajan OK:n
     jälkeen – älä vie itse.**
   - PERUTTU: suoristus `L/nd-suorista.py`, `koottu-65-nd.png`, `K/G-tasot-65nd/`, `nd-pari-1500.jpg` – EI käyttöön.
   - Eiffel ja Sacré-Cœur: samat molemmilla tasoilla, ei korjattavaa.
2. Vääntymä (omistaja 20.28 "rakennukset vääntyvät väärin verrattuna g kuvaan"): `L/kallistus-koonti.py` → `L/lahitaso-65/kallistus-koonti.jpg`
   (G | peli 31,8°/50° | 0° | 31,8° + 8°). Syy perspektiivikamera; 0° EI = G (laatat venytetty 1/cos 31,8° = 1,18 P–E, tornit +18 %);
   31,8° + kapea kuvakulma = G. Omistaja 20.31: piirros vain suorana (PT: = Suorista 31,8°, pohjoinen), muuten striimi.
   **PT valitsi (a): laatat ENNALLAAN, ei litistystä, ei lat-muunnosta.** NUI toteutti piirroslinssin (aa50ebaca, kuvakulma ~9°).
3. NUI:n reunakuva (todistus-piirros-suora-aa50ebaca-…/kuvat/5-reuna-valitaso.png): piirroksen länsipuolella tyhjä paperi + tiheät
   katunimet. UUSI (ei 18.53-kuvissa). Arvio PT:lle 21.0x: jokin maapohjan kerros (elävä kartta / Laattapalvelin / KarttaKerrokset)
   valitsee tason tai häivyttää todellisen kameran etäisyyden mukaan (kamera ~5,9× kauempana); nimet lukevat LogiikanFovin.
   Ehdotus: pohjat loogiseen korkeuteen; varakeino katunimet piiloon piirroksen ulkopuolella. Ei vahvistettu koodista.

## AVOIN
1. vali-0-1-vienti (PT → JU omistajan OK:n jälkeen). Jos omistaja haluaa ND:n muotoa tai maskia säätää: nd-g.py (MK, RE).
2. Reunan tyhjä striimi: NUI/PT; Karttaseppä auttaa, jos PT pyytää (pelikameran emulointi: L/terayspari.py nakyma, TILT/VFOV).
3. Vanhat avoimet (luovutus 19.09): NUI:n vastaus maamerkkien alojen muotoon; muut kaupungit vasta tilauksesta; L:n siivous.
