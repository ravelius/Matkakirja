# Valosepän luovutus 1.11.2026 klo 22.20

Syy: konteksti 25 % (pehmeä raja). Edellinen: viesti-valoseppa-luovutus-20261101-2124.md (pysyvät työtavat siellä, voimassa).
LISÄYS TYÖTAPOIHIN: QA `valo savy …` jää päälle kohdasta toiseen (sijoita/testikamera eivät palauta sitä) → skenaariossa
palauta savy jokaisen kohdan lopussa. Kevyt koe = `tyokalut/esikatselu.sh <sha> <skenaario> ipad --batch` (ESIKATSELU_LAATU=Ultra);
mittarit `_tyo/linssiseppa2/skriptit-20261031/`: varjovari.py (lattian varjo/aurinko rgb + sävy), ilma07-mittari.py, k15-koonti.py.
Loki: `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md`.

## RUNGOSSA
- **203ce44b2** (valovahti 0: puukortin luminanssipainot Valopohjan kautta `_JuoksuPuukorttiLuma`, ei poikkeusta) → runko 216 d062430f5.
- **096f5fd11** (07 ilmakuvan kivi: ev −0,35 vain kameralle > 30 m, täysi 120 m; KuvausKamera kuten kaukopuut, koska QA-testikamera
  on vain piirron ajan) → runko 217 c6cfe5e47 (ei TF 216:ssa). 07 kivi 219 → 193 (havainne 188), kate 202 → 179 (193).

## PT:LLÄ KUITTAUKSESSA (lähetetty 22.20)
- **1fe307e5a** (proto linssiseppa2/varjosavy-216, 096f5fd11:n päällä): lattiavarjot sinertäviksi. `_JuoksuVarjoSavy` = täytön kerroin
  .5/.87/1.7 vain varjossa (leivottu tai elävä) ja vain n.y-painolla (punaiset seinät eivät haalistu); QA `valo savy varjo r g b w`.
  Varjo 01 122/105/98 → 107/100/119 (havainne 113/105/118), 02 → 109/104/123 (112/108/126), 05 → 113/109/125 (117/114/136);
  aurinko ja seinät pikselilleen ennallaan, 07 ennallaan. HUOM: kumoaa osin PT 25.10. lämpimät varjot → PT päättää.
  Kuvat KK:lle: esikatselu-20261101-220848/varjosavy-koonti.jpg, havainne-editori-20261101-221422/koonti.png.
  Kuittauksen jälkeen: pyyntö NS:lle (merge runkoon 217), tarkista ancestry.

## SEURAAVAT EROT (oma arvio koonnista 221422)
- Punaiset seinät havainnetta haaleammat (varjossa kyll 0,61 vs 0,77, auringossa 02 0,61 vs 0,72) → rappauksen sävy/kylläisyys.
- 07: etukulmien kirkkaanvihreä nurmi, valkoinen taivas (kamera), puut yhä vaaleammat (mittarin maski).
- Lattia 01/02 mediaani tummempi = varjon kattavuus (auringon suunta, PT: yksi aurinko) → ei valotyötä.

## Worktreet (proto-3d)
- wt/proto-linssiseppa2-vahti216: haara linssiseppa2/varjosavy-216 (1fe307e5a). Haarat ilmakivi-216, vahti-216 rungossa.
- wt/proto-linssiseppa2-varjo216: linssiseppa2/ilma07-216 (12c5ceca5 kokeilu, korvattu 096f5fd11:llä) → poistettavissa.
- wt/proto-linssiseppa2-k17 jää (3 committia ei rungossa).
