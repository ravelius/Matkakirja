# Karttaseppä: luovutus 2.11.2026 klo 08.36 (KS local_740947d7)
Edellinen: viesti-karttaseppa-luovutus-20261101-2129.md (käsitelty). Syy: kontekstivahti 25 %.
C = `/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/pariisi-pohja/codex-pseudo3d/`, CX = `/Users/Shared/Claude/proto-3d/_tyo/codex/`.
Koko kulku: `C/lahitaso-20261101/MUISTIO.md` (merkinnät 2.11.).

## TEHTY (1.11. 21.32 – 2.11. 08.36)
1. Hillityt värit VIETY (omistajan OK 21.35): JU 21.39, 54/54 `…/piirroskartta/pariisi/` + NS:n versiokansio `pariisi/hill-20261101/`
   (TasoVersio, runko b1909a35b). Laitteet välimuistittavat laatat nimen mukaan → jokainen laattamuutos UUTEEN kansioon + TasoVersio.
2. Piirros 0°:lle (omistaja 06.49): ei uusia laattoja; NUI teki koodissa PiirroksenLat = 48.859 + (lat − 48.859)·0,85
   (manifestin projektio), nimet ja nostot samalla kaavalla (natiivi-ui/piirros-suora-218 7455c79ea). `C/nolla-20261102/` EI käyttöön.
3. Seinen veneet (omistaja 08.17 "Kyllä, veneillä"): kansio `C/veneet-20261102/`.
   - `seine-reitti.json` (201 pistettä ~40 m, 8,7 km Eiffel → Austerlitz, eteläinen haara; kuvan lat/lon → PiirroksenLat) NUI:lla.
   - Codex-tilaus postilaatikko **7ad1059b5**: 8 rajausta ilman veneitä (`CX/pariisi-seine-veneet/tilaus-20261102/`) + 4 venettä + vanavesi.
4. Kadonneet ihmeet karikatyyrikartalle (omistaja 08.31, loki 9f5ceb12d): kansio `C/ihmeet-20261102/` (tilaus.py, arkki-paikat.jpg).
   - 9 kohdetta (maakartat.js + fokuskohteet-fra kadonnut: true): Grand Châtelet, Temple-torni, Palais d'Orsay, Palais de l'Industrie,
     Trocadéro, Galerie des Machines, Les Halles, Tuileries'n palatsi, Bastilji. Paikat valittu PIIRROKSESTA (geopisteet osuvat
     karikatyyrissä maamerkkien päälle; esim. Châtelet → Notre-Dame).
   - Codex-tilaus postilaatikko **2b04d2ebb** (`CX/pariisi-kadonneet-ihmeet/tilaus-20261102/`, paikat.json): leike-<t>.png (RGBA) +
     kartalla-<t>.png (vertailukuva) + leikkeen vasen yläkulma ympäristökuvassa.

## AVOIN (järjestyksessä)
1. **Veneet, kun Codex toimittaa** (`CX/pariisi-seine-veneet/_review-20261102/`): tarkista SHA ja että vain vesi muuttui
   (`python3 C/veneet-20261102/liita.py <review> koottu-66v.png` tulostaa eron joen ulkopuolella, pitää olla ~0) →
   `LAHI=koottu-66v.png:3585,2860 VALI=C/valitaso-20261101/koottu-v2-ndg.png python3 C/tasot-20261101/tee-tasot.py <G-tasot-67v>` →
   `tasot-pienennys.py` → `KV=0.6 VS=-6 KS=0.4 hillitse-savyt.py` → pari ennen | jälkeen PT:lle → uusi TasoVersio NS/NUI:lta →
   paketti `_valmiit/` kohteeseen `kohtaamiset/piirroskartta/pariisi/<versio>/` → JU. Venekuvat (RGBA) NUI:lle. Kuittaus Codexille postilaatikkoon.
   Ensin kannattaa varmistaa, että tee-tasot + pienennys + hillintä koottu-65:llä tuottaa G-tasot-66-hill:n (JPEG-ero).
2. **Ihmeet, kun Codex toimittaa** (`CX/pariisi-kadonneet-ihmeet/_review-20261102/`): kartalla-<t>.png → PT (→ KK omistajalle).
   Paikka NUI:lle: kangas x = rajaus_x0 + vasen + leveys/2 jne. (paikat.json), lat_kuva = 48.896857 − 0.071176·y/6744,
   lon = 2.272929 + 0.134148·x/9901, koko metreinä = px (1 m/px). Leikkeet ämpäriin uuteen kansioon (NUI/NS päättää polun).
3. Vanhat: NUI:n vastaus maamerkkien alojen muotoon; muut kaupungit vasta tilauksesta; L:n siivous.
Postilaatikon worktree: `/Users/Shared/Claude/wt/karttaseppa-postilaatikko-veneet` (claude/postilaatikko); poista, kun tilaukset kuitattu.

## LISÄYS 08.4x (PT)
Vertailukuviin (kartalla-<t>.png → PT → KK) **näkyviin ja merkittyinä kohdat, joissa leike peittää nykyisen maamerkin**:
Palais d'Orsay ↔ Musée d'Orsay, Palais de l'Industrie ↔ Grand/Petit Palais, Trocadéron palatsi ↔ Palais de Chaillot,
Les Hallesin hallit ↔ Forum des Halles. Tee jokaisesta pari: kartta ilman leikettä | leikkeen kanssa, sama rajaus, peitetty
nykymaamerkki rajattuna. Omistaja päättää niiden perusteella kadonneet-kytkimen oletuksen (suurennuslasi › Kartta).
