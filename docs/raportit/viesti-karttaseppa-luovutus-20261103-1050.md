# Karttaseppä: luovutus 3.11.2026 klo 10.50 (KS)
Edellinen: viesti-karttaseppa-luovutus-20261103-1000.md (käsitelty: PR 6116 yhdistetty, Pariisin 13/04/08/12).
Syy: kontekstivahti 30 %. P = `/Users/Shared/Claude/proto-3d/_tyo/codex/pariisi-valmis-runko-20261102/`,
E = `/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/esittelypaikat-20261103/`, N = `…/karttaseppa/tasangot-poltto-20261103/`,
postilaatikon worktree `/Users/Shared/Claude/wt/karttaseppa-postilaatikko`. Venv: "/Volumes/T7 4TB/Matkakirja-karttaseppa/venv-kartta/bin/python".

## TEHTY
1. **PR 6116 yhdistetty** (3136268892); rivi NUI:lle lähetetty (skeema 1.69, `kaupungit.esittelypaikat`).
2. **Pariisi: kaikki 15 palaa hyväksytty, PT kuittasi** (04 2ba469b84; 13 v2 c0be54f7b; 08 v2 eb276590e; 12 5482cb55c).
   `hyvaksytyt.json` = 1–15, kylttisiirrot-palaNN.json + SHA256SUMS päivitetty (vanhat ohjaus*.png-rivit 05/07/10/11
   eivät täsmää – aamun lukitse-ajoja, ei kosketa). Codexille dfcddcffa: sarja valmis, ei uusia paloja.
   Mittari (oma, `scratchpad`-kopio P/tarkistus/…): sauman L-ero / ±40 rivin ympäristö; hyväksytyt ≤ 1,54.
3. **Koko kankaan koonti v2**: `P/tarkistus/koonti/kokoa_pariisi.sh` (zsh, ei suoritusoikeutta → `zsh <polku>`):
   `tarkistus/reunarivi.py` (12 px: Codexin ~10 px vaalea juova lukon vieressä, matalataajuus liu'utetaan) →
   `saumaliukuma.py` 100 → pala05 kaistapaikattu pala09:stä → `kokoa_monta.py` (uusin ensin lock-verification-ajasta)
   → `tarkistus/koonti/viimeistely.py` (sävysovitus piirtäjäalueittain, affiini μ/σ kanavittain, sigma 150;
   saumarivien yksityiskohtapalautus; vasen yläkulma läpinäkyvä 60 px reunalla, PT: EI palaa 16).
   Tulos `pariisi-koko-rgba.png` (5454 × 3634 RGBA), yleiskuva `pariisi-yleis-v2.jpg` lähetetty PT:lle. Limitykset
   pikselilleen identtiset (paitsi 05–09-kaistat). Yksityiskohdat `P/tarkistus/koonti/LUE.md`.
4. **Esittelypaikat, muut 58 kaupunkia**: ryhmät 1–2 tehty uudelleen (Wikipedia/Wikidata; `E/kartta.py`, `E/hae.py`)
   → `E/tulos-1.json`, `tulos-2.json`, `tulos-3.json`; paikattomat 3 (Landwasser ja Syrakusa pelialueen ulkopuolella,
   Vaduzin laaksonäkymä). Ajo käynnissä klo 10.10 alkaen (Overpass hidas, 502:t): 27/173 klo 10.48, loki `E/ajo-muut.log`,
   välimuisti `E/ov-valimuisti`. Haara `karttaseppa/esittelypaikat-muut` (checkout), ajo kirjoittaa `data/esittelypaikat.json`.

## AVOIN (järjestyksessä)
1. **Pariisin koonnin PT-palaute v2:sta.** Jäljellä: keskisarakkeen sävyraja x ≈ 2612 (pala05/09 punertavampi kuin lukittu
   pala06-kaista) ja länsireunan (04/08) punerrus lievenivät, eivät poistuneet; rivillä 870 ohut viiva vielä 1:1:ssä.
   Seuraava keino: palakohtainen sävysovitus ennen koontia (lukon puolen μ/σ → generoitu puoli, D ≈ 400) tai
   Lab-kylläisyyden sovitus. Sitten **tasot** (laaja 12 / väli 6 / kaupunki 2,5 m/px, ruudukko.json `tasot`, uusi
   TasoVersio-kansio, luovutus 20261102-2210 AVOIN 2: siltaleikkeet, Seinen venereitti NUI:lle, kylttisiirrot peliin).
2. **Big Ben (omistaja 10.38, PT 10.4x):** näkyy vain lähizoomilla → nostojen porrastukseen (Lontoo) näkyviin myös
   kauempaa; tarkista samalla muut nostot, joilla sama vika; juna-218:n päälle, rivi PT:lle.
3. **Esittelypaikat-ajo:** jos tausta-ajo kuoli nollauksessa, aja uudelleen (välimuisti jatkaa):
   `node tools/sisalto/esittelypaikat.mjs --vienti /private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-karttaseppa/38767251-991f-46e8-8ea5-482ccf632ffc/scratchpad/vienti2
   --syote E/tulos-1.json --syote E/tulos-2.json --syote E/tulos-3.json --valimuisti E/ov-valimuisti --kirjoita`
   (jos vienti2 poistunut: tee vienti uudelleen `tools/vienti`). Sitten vienti + skeemasopimus (sama kenttä, ei
   versionnostoa) + `tests/vienti.test.mjs tests/sisaltopaketti.test.mjs` → PR → rivi PT:lle.
4. **Tasankopoltto:** N/ketju.sh käynnissä (z8-019 valmis 10.48); ketjun jälkeen N/LUE.md "Ketjun jälkeen" → rivi PT:lle.
5. Vanhat: 27.10. poltto T7-arkistointi vain jos levy < 50 Gi; NUI:n maamerkkien alat.
