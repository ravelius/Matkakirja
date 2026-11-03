# Karttaseppä: luovutus 3.11.2026 klo 18.15 (KS)
Edellinen: viesti-karttaseppa-luovutus-20261103-1655.md (PR 6187; käsitelty, sen AVOIN 1 tehty, 2–5 jatkuvat alla). Syy: konteksti 25 % (7.37).
P = `/Users/Shared/Claude/proto-3d/_tyo/codex/pariisi-valmis-runko-20261102/`, proto = `/Users/Shared/Claude/wt/proto-karttaseppa-ruutu-218`
(haara karttaseppa/ruutu-laatat-218, pohja JU:n koe 9b9695a7d; EI vielä yhdistetty, JU ottaa kärjen).

## TEHTY tässä sessiossa (16.58–18.15)
1. **Pitkät ruudut:** kärjessä myös 6cd9cf100 (Nimikerros: oma nimiö takaisin poolista, ei t.text-uudelleenasetusta; testit 599/599). PT:lle kerrottu.
2. **Pariisin koealue striimikartan päälle, osa A** (omistaja 16.51, PT:n suunnitelma
   Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261103-pariisi-striimikartan-paalle.md):
   - Rajaus 2.3290–2.3630 / 48.8485–48.8640 (2,49 × 1,71 km). Esinepaikat `_tyo/karttaseppa/pariisi-koealue-20261103/esinepaikat.json`
     + puut.json (skripti esinepaikat.py välimuistin OSM:stä; pohjat.py = nähtävyyksien OSM-pohjakuvat). 8 nähtävyyttä, 73 aukiota,
     1 liikenneympyrä, 61 puistoa, 18 suihkulähdettä, 5 143 puuta.
   - Codex-tilaus **ab78cb4c0** (postilaatikko): 20 kuvaa, 1 otto/kuva (8 pintaa, 5 nähtävyyttä, 3 aukiota, 4 puuta);
     aineisto `_tyo/codex/pariisi-koealue-20261103/` (TILAUS.md, pohjat/, tyylimalli). Toimitus `_review-koealue/`.
   - Esinepaikat ja tyylimalli lähetetty VS:lle (B, local_5ebb0658) ja NUI:lle (C, local_4b84cd90).
3. **Pala16 + pala17 → v7** (PT 18.2x/18.3x; pala16 b472ad7f5, pala17 b5e66b8d7; lukot pikselilleen):
   - v6 = v5 + pala16 (proto 9756c287f, isoisa2 – KORVATTU, ei vientiä), v7 = v6 + pala17 (`tarkistus/koonti/v6.py` molemmille).
   - Proto **04b14e82d**: TasoVersio isoisa3-20261103, lähitasolla yksi alue, SiltaVersio leikkeet-sillat-isoisa3-20261103 (17 siltaa
     taulukossa), ReittiX/Y = `P/tasot-v7/reitti-v7-liitos.json` (v5-reitti + laatikko v7:stä; reitti-liitos.py), Kylttisiirrot uusiksi.
   - `P/tasot-v5/kylttisiirrot-peliin.py`: korjauspalan uudelleen piirretyt (nahtavyydet-piirretty.json) korvaavat vanhat siirrot;
     Austerlitz/Lariboisière ja Jeu de Paume pois skriptissä. `P/kylttisiirrot-pala17.json` (Rodin, Clotilde, Matignon).
   - Ämpäripaketti **`proto-3d/_valmiit/pariisi-tasot-isoisa3-20261103-vienti-20261103`** (40 tiedostoa, SHA256SUMS) → JU vie ennen käännöstä.
   - Kuvat `proto-3d/lokit/karttaseppa-v7-pala17-20261103/` (pari-v6-v7-orsay, reitti-sillat, jaannos-ylareuna-petit-palais) → PT:lle.
4. **LEVY:** worktree karttaseppa-tasangot-maet EI poistettu: tasankoketju (pid 26125) ajaa koodin siitä. PT: "poista ketjun jälkeen,
   ei siirtoa" → rivi PT:lle kun tehty.

5. **Jälkilisäys 18.15 (PT 18.4x):** jäännös paikattu itse → v8 = v7 + `tarkistus/koonti/v8-paikkaus.py` (kaista x 2260–2500, y 1560–1598 v6:sta)
   → TasoVersio **isoisa4-20261103**, proto **7e640edc4**; paketti **`_valmiit/pariisi-tasot-isoisa4-20261103-vienti-20261103`** (korvaa
   isoisa3:n, KORVATTU.txt). Siltaleikkeet isoisa3 ja venereitti ennallaan. Pari lokit/karttaseppa-v7-pala17-20261103/pari-v7-v8-ylareuna.png.

## AVOIN (järjestyksessä)
1. **v8 (isoisa4) iso-pari:** JU:n vuorolla kuvapari isolla iPadilla (sama rajaus kuin JU:n pari-zoom-2-keski, proto-3d/lokit/julkaisija-koe-pari-6da58f32b/)
   → PT (jäännös korjattu isoisa4:ssä).
2. **Koealueen Codex-toimitus** `_tyo/codex/pariisi-koealue-20261103/_review-koealue/`: tarkista SHA256SUMS, koot, alfa, saumattomuus
   (pinta 2 × 2), esineet.json ankkurit → pinnat VS:lle, esineet NUI:lle, rivi PT:lle.
3. **Pitkät ruudut jatko:** seuraavan mittauksen Nimikerros-syyriveistä (Elavat/Lado/Piirra) suurin pois; tavoite < 33 ms.
4. **Esittelypaikat** (ennallaan): silmukka pid 26124, Overpass 502. Valmis = E/silmukka.log "VALMIS" → E/MUISTA.txt → worktree
   /Users/Shared/Claude/wt/karttaseppa-esittelypaikat → vienti + testit → PR → PT.
5. **Tasankopoltto** (ennallaan): ketju pid 26125 odottaa joutilasta Macia (ei 16.30–18.00). Kun ketju.valmis: tarkista, poista worktree
   /Users/Shared/Claude/wt/karttaseppa-tasangot-maet (PR 6089 squash-merged), rivi PT:lle.
6. Vanhat: turisti-info/lehtikioski vanhaa tyyliä (jää); 27.10. poltto T7-arkistointi vain PT:n luvalla.
