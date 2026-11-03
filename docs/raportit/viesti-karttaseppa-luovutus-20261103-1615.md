# Karttaseppä: luovutus 3.11.2026 klo 16.15 (KS)
Edellinen: viesti-karttaseppa-luovutus-20261103-1410.md (käsitelty: AVOIN 1 simukuvat tehty, AVOIN 2 jatkuu alla). Syy: kontekstivahti 27 %.
P = `/Users/Shared/Claude/proto-3d/_tyo/codex/pariisi-valmis-runko-20261102/`, E = `/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/esittelypaikat-20261103/`,
N = `/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/tasangot-poltto-20261103/`. Proto-worktree `/Users/Shared/Claude/wt/proto-karttaseppa-bigben-218`
(paikallinen repo, ei pushia; nyt haarassa karttaseppa/kyltit-mittakaava-218).

## TEHTY
1. **Simukuvat Pariisi v5 + Big Ben** (b39c1bc9a, 14.44): `lokit/karttaseppa-pariisi-bigben-0c103c3a9-20261103/TULOS.md` + koonti-8.jpg.
   PT: Montparnasse/Pompidou piirrokseen maalattuja → ei muutosta; pohjoisen rakennuslaatat → NS.
2. **Westminsterin nimi 60 m etelään kuvakkeen alle: proto 713986b6d** (Nimikerros.MaanKylttisiirrot, testi MaanKylttisiirrot).
   Simussa todettu (`lokit/karttaseppa-westminster-713986b6d-20261103/pari-westminster.jpg`), PT kuittasi, mukana 429b75faf:ssa.
3. **Kohta A (omistaja 15.40 "nimikyltit aivan liian isot … näkyvät kunnolla vasta lähizoomissa"; suunnitelma
   Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261103-pariisin-piirros-zoom-ja-reunat.md):** haara karttaseppa/kyltit-mittakaava-218
   (429b75faf:n päällä): **9d1ce79e5** IsoisaLahinLeveys 1,05 → 0,525 (~1,75 km; NS poisti omansa, A on KS:n) + KyltinTaysiPt 22 → 14;
   **e735de8ab** koko (lähin/korkeus)^0,5 (z14:ssä kyltit katosivat); **804706bc3** ≥ 6,5 pt keskizoomiin asti (lineaarinen ≥ 0,1),
   laaja häipyy (PT 16.2x). Kaaret JU:n kokeessa: lähin ~0,01 → 14 pt, 0,015 ~11,5, z14 0,04 7, keski 0,06 6,5, laaja 0,16 pois.
   6e84217af = hylätty välivaihe (ei käytetä). NS:n B = 3ab522752 (yhdistyy ristiriidatta).
4. **Kohta C: pala16 (luoteiskulma) Codexille, OMISTAJAN PÄÄTÖS 16.05 → tilaus lähetetty postilaatikko 5f8d4e13e** (1 otto).
   P/TILAUS-pala16.md, P/palat/pala16/ (runko, ohjaus, maski; lukittu pala01/04/05), palajako.json nro 16, LUE.md "Pala16",
   SHA256SUMS päivitetty. Runko: `_tyo/karttaseppa/isoisan-kartta-20261102/runko/piirra.py pala16` (uusi haara).

## AVOIN (järjestyksessä)
1. **JU:n KOE (62f262ed3 = 6da58f32b + NS 70071fea2 + e735de8ab; pyydetty lisäämään 804706bc3)**: isolla 3 zoomia + z14 + pyydetty
   "aja 48.8584 2.2945 0.01 3" (uusi lähin). Tarkista kuvista kylttikoot (14 / 7 / 6,5 pt / laaja pois) → PT. JU:n 459 ms ETC-ruutu
   (170×50, 150×40 tekstuurit): ei KS:n vakioista; epäily pikkukuvat/lajimerkit (pikkukuvat skaalautuvat KyltinMitalla, NostotKartalla ~1982).
2. **Pala16-toimitus** `P/_review-pala16/` → `tarkista_ala.py`, `tarkistus/saumaliukuma.py 16 …`, koonti (`tarkistus/koonti/kokoa_pariisi.sh`
   tukee vain palat 0–15: lisää 16), uusi TasoVersio-kansio, tasot.json-alueet yhdeksi suorakaiteeksi → kuvapari PT:lle.
3. **Esittelypaikat 58 kaupunkia:** `zsh E/silmukka.zsh` käynnissä (pid 39189 node; 12 kierrosta, 2 min tauko Overpass-kaatumisen jälkeen;
   loki E/silmukka.log, ajo E/ajo-muut.log, 93 ok 16.15). Kuoli/valmis → `pgrep -f esittelypaikat.mjs` tyhjä: E/silmukka.log "VALMIS" →
   **ensin E/MUISTA.txt** (Sacré-Cœur käsin) → worktree `/Users/Shared/Claude/wt/karttaseppa-esittelypaikat` `git diff --stat
   data/esittelypaikat.json` → vienti + skeemasopimus + `node --test tests/vienti.test.mjs tests/sisaltopaketti.test.mjs` → PR → rivi PT:lle.
   Jos silmukka itse kuoli: `zsh E/silmukka.zsh` taustalle uudelleen.
4. Tasankopoltto: ketju (zsh N/ketju.sh) odottaa joutilasta Macia (ketju.out 12.18, ei ketju.valmis). Valmis → N/LUE.md "Ketjun jälkeen".
   Levyä 32 Gi.
5. Vanhat: turisti-info/lehtikioski-leikkeet vanhaa tyyliä (jää); 27.10. poltto T7-arkistointi vain PT:n luvalla.
