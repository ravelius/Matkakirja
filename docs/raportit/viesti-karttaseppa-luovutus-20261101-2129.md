# Karttaseppä: luovutus 1.11.2026 klo 21.29 (KS local_740947d7)
Edellinen: viesti-karttaseppa-luovutus-20261101-2102.md (käsitelty). Syy: kontekstivahti 25 %.
C = `/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/pariisi-pohja/codex-pseudo3d/`, L = `C/lahitaso-20261101/`, K = `…/pariisi-pohja/kokoelma/`.
Koko kulku: `L/MUISTIO.md` (merkintä 21.22).

## TEHTY (21.05–21.29)
1. Reunan tyhjä paperi (PT, vain luku): syy horisonttiusva (Aurinko.cs:316–323) loogisesta silmästä vs. linssissä ~5,9×
   kauempana oleva todellinen kamera; ei Laattapalvelin.Elava. NUI korjasi (2f14194f5 usva, a2f14064e Nimikerroksen alapiste).
   Todistettu: reunakuvassa striimi näkyy (käännös a2f14064).
2. Värit (omistaja 21.1x "siniset ja vihreät liian saturoituneita") + tasot pienentämällä (omistaja 21.18, loki PR 5897):
   - `C/tasot-pienennys.py`: välitaso lähitasosta (lähitason alueella), laaja välitasosta; Gauss 0,45 + Lanczos. ND:n vali-0-1 korvautui.
   - `C/hillitse-savyt.py` KV=0.6 VS=-6 KS=0.4 (CIELAB: vihreät kroma × 0,6 ja −6°, siniset × 0,4; muut ennallaan).
   - **Viennin ehdokas: `K/G-tasot-66-hill/natiivi/`** (54 tiedostoa; tasot.json ja maskit ennallaan). Välivaihe `K/G-tasot-66/`.
   - Kuvat KK:lla omistajalle: `L/savy-66/` (1 välitaso, 2 lähin, 3 reuna; piirros | striimi, `C/savy-pari.py`).
   - Simuajot: proto-3d/lokit/todistus-ks-savy-{piirros-…2122,striimi-…2125} (iPad11, JU:n vuoro, VAPAA lähetetty).
3. Piirto-ohje seuraaville kaupungeille kirjattu `L/MUISTIO.md` 21.22 (vain lähitaso keskustaan + välitaso muualle; muut pienentämällä).

## AVOIN
1. Omistajan OK väreihin → PT pyytää JU:lta viennin `K/G-tasot-66-hill/natiivi/` (koko Pariisi-sarja). Jos värit liian voimakkaat
   tai harmaat: ajetaan `hillitse-savyt.py K/G-tasot-66 K/G-tasot-66-hill` uusin KV/KS/VS-arvoin + `savy-pari.py` (skenaario ja
   ajo: `L/savy-66/savy-pari.txt` + `ajo-pari.zsh`, MATKAKIRJA_PIIRROS = laatat / tyhjä `K/tyhja-piirros/natiivi/`; simuvuoro JU:lta).
2. Huomio omistajalle tarvittaessa: välitasossa näkyy pehmeä raja, jossa lähitasosta pienennetty keskusta vaihtuu vanhaan välitasoon.
3. Vanhat: NUI:n vastaus maamerkkien alojen muotoon; muut kaupungit vasta tilauksesta (nyt uuden ohjeen mukaan); L:n siivous.
