# Karttaseppä: luovutus 3.11.2026 klo 16.30 (KS)
Edellinen: viesti-karttaseppa-luovutus-20261103-1615.md (käsitelty; sen AVOIN 1–5 jatkuvat alla). Syy: TILINVAIHTO (PT 16.26).
P = `/Users/Shared/Claude/proto-3d/_tyo/codex/pariisi-valmis-runko-20261102/`, E = `/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/esittelypaikat-20261103/`,
N = `/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/tasangot-poltto-20261103/`.

## TEHTY tässä sessiossa (16.18–16.30)
1. **Esittelypaikkojen silmukka** oli kuollut edellisen session mukana (silmukka.log puuttui, ajo-muut.log 93 ok 16.13). Käynnistetty
   uudelleen 16.27 IRRALLISENA (`nohup … &`, PPID 1, selviää nollauksesta): pid 26124 zsh E/silmukka.zsh → node esittelypaikat.mjs.
2. **Tasankopolton ketju** (PT 16.2x: 17.00–18.00 Tripo/Codex-Blender-jakso): N/ketju.sh:n joutilasehtoon lisätty `Blender` pgrepiin ja
   ei alkua 16.30–18.00. Ketju oli yhä odotussilmukassa (ei aloittanut), uudelleen irrallisena pid 26125 (PPID 1), loki N/ketju.out.
3. **Palasauma (PT 16.3x, kuva /Users/Shared/Claude/proto-3d/lokit/julkaisija-koe-pari-6da58f32b/pari-zoom-2-keski.jpg):** syy =
   pala05:n piirroksen väärä Seine-mutka etelään Palais Bourbonin kohdalla (ei rungossa), päättyy umpikärkeen y 1894 (pala09 jatkaa
   kortteleina) + pala09:n oma tyyli vs limitys x 2612 (sumea tuplaraita). Korjaus = **korjauspala17 Codexille, postilaatikko 74fd75f34**
   (Codexin kuvat pysyvällä luvalla): P/TILAUS-pala17.md, P/palat/pala17/ (runko, ohjaus, maski), palajako.json nro 17
   (kangas_px 1752,1388,3288,2412, `avattu_px` 508,172,1048,862 = kangas 2260–2800 × 1560–2250, `korjauspala: true`),
   uusi P/lukitse-korjaus.py (ohjaus = v5-koonti + avattu laatikko rungosta), LUE.md "Pala17", SHA256SUMS (96 riviä, OK).
   Runko: isoisan-kartta-20261102/runko/piirra.py uusi haara `pala17`. Syykuvat P/tarkistus/pala17/. PT:lle rivi (jonossa).

## AVOIN (järjestyksessä)
1. **JU:n KOE 2212b570e** (= 693cf437f + KS 9d1ce79e5 + e735de8ab + 804706bc3 + NS 3ab522752 + 70071fea2; wt julkaisija-koe-218):
   JU mittaa ja lähettää parit PT + KS + NS. Tarkista kylttikoot (lähin ~0,01 → 14 pt, z14 0,04 → 7, keski 0,06 → 6,5, laaja 0,16 pois) → PT.
2. **Pala16 + pala17 -toimitukset** (`P/_review-pala16/`, `P/_review-pala17/`; postilaatikko 5f8d4e13e ja 74fd75f34):
   - pala16: `tarkista_ala.py`, `tarkistus/saumaliukuma.py` lukon reunaan, koonti (`tarkistus/koonti/kokoa_pariisi.sh` tukee vain
     0–15: lisää 16), tasot.json-alueet yhdeksi suorakaiteeksi.
   - pala17: VAIN avattu laatikko liitetään v5-koontiin (pariisi-koko-rgba-v5.png) saumaliukumalla laatikon reunaan (ei koko
     ketjua uudelleen); `tarkista_ala.py` laatikon merkeille 3, 32, 82, 55, 42 → kylttisiirrot uusiksi (Palais Bourbon nyt 214 m,
     tasot-v5/kylttisiirrot-peliin.py).
   - Molemmat samaan UUTEEN TasoVersio-kansioon (piirroslaatat versioituina) → kuvapari PT:lle (sama rajaus kuin JU:n pari-zoom-2-keski).
3. **Esittelypaikat 58 kaupunkia:** silmukka pid 26124 (12 kierrosta, 2 min tauko Overpass-kaatumisen jälkeen; loki E/silmukka.log,
   ajo E/ajo-muut.log). Valmis = `pgrep -f esittelypaikat.mjs` tyhjä ja E/silmukka.log "VALMIS" → **ensin E/MUISTA.txt**
   (Sacré-Cœur käsin) → worktree `/Users/Shared/Claude/wt/karttaseppa-esittelypaikat` `git diff --stat data/esittelypaikat.json` →
   vienti + skeemasopimus + `node --test tests/vienti.test.mjs tests/sisaltopaketti.test.mjs` → PR → rivi PT:lle.
   Jos silmukka kuoli ilman VALMIS/LUOVUTUS-riviä: `nohup zsh E/silmukka.zsh >/dev/null 2>&1 &` (irrallisena!).
   HUOM: silmukka käyttää vientikansiota vanhan session scratchpadissa
   (/private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-karttaseppa/38767251-…/scratchpad/vienti2): säilyy niin kauan kuin /private/tmp.
4. **Tasankopoltto:** ketju pid 26125 odottaa joutilasta Macia (≥ 10 min, ei Unity/xcodebuild/Blender, ei alkua 16.30–18.00).
   Valmis (N/ketju.valmis) → N/LUE.md "Ketjun jälkeen". Virhe → N/ketju.virhe. Levyä ~32 Gi.
5. Vanhat: turisti-info/lehtikioski-leikkeet vanhaa tyyliä (jää); 27.10. poltto T7-arkistointi vain PT:n luvalla.
