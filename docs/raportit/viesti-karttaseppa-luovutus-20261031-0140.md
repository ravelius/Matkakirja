# Karttaseppä: luovutus 31.10.2026 klo 01.40

Edellinen luovutus: viesti-karttaseppa-luovutus-20261031-0000.md. Nollaus Postivahdin pyynnöstä (kova raja 35 %).
Kaikki 60 fps -työn yksityiskohdat, taulukot ja tulkinnat: `/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/fps-216/LUE.md`.

## Valmiit tässä vuorossa (60 fps, OMISTAJAN PYYNTÖ 30.10. 23.01)
1. **iPad-mittaus 00.11** (äppi a821ccbad, vain liikekehykset " L"): yli 25 ms kauko 2 %, keski 6 %, lähin 0 %, zoom 2 % (yht. 3 %).
   Pääsyy roskankeruu; IL2CPP:llä varausluvut (kt) koko keon muutoksia, eivät säiekohtaisia (epäluotettavia).
2. **A+B+C** proto-haarassa `karttaseppa/piirrokset-216` (wt `/Users/Shared/Claude/wt/proto-karttaseppa-piirrokset-216`):
   e03f352dd A (Nimikerros), 3a65368cb alivaihemittari, d590fd43c B (laattojen purku/suurennus, NostoKerros), 84c47e29c C
   (taustaesilataus tauolla liikkeessä). NS:n koehaara c895e6940, mitattu 01.27: **ei mitattavaa hyötyä** (3 → 4 %, GC 43 → 46).
   **PT 01.4x: A+B+C EIVÄT mene junaan, pysyvät koehaarassa.**
3. Alivaihemittari kohdisti EarlyUpdaten: **UnityWebRequestUpdate 9–72 ms** ja **ExecuteMainThreadJobs 10–45 ms** (Cesiumin
   laattahakujen valmistuminen pääsäikeessä), ei taustaesilataus.
4. **Koe D** (PT: "D kokeena kyllä"): haara `karttaseppa/fps-d-216` **57fabae3e** (wt `/Users/Shared/Claude/wt/proto-karttaseppa-fps-d-216`):
   Laattapalvelin antaa pallon liikkuessa enintään 3 vastausta/ruutu (Cesiumin maximumSimultaneousTileLoads-asetin luo tilesetin
   uudelleen → ei käytettävissä). Komennot `laattavuoro n` (0 = ei rajaa) ja `kuvasarja nimi n väli`. Ei A/B/C:tä.
   NS:n koehaara `natiiviseppa/ks-fps-d-216` 51415e442 (juna 216 1c380e352 + D).
5. Levy: 14 mergettyä proto-worktreetä poistettu (~6,9 G). `editori-tk.sh` talteen `_tyo/karttaseppa/talteen/`.

## Käynnissä luovutushetkellä
- **NS kääntää koe D -mittausäpin** vasta palatsimuistiajon (NS+LT, PT:n ykkösvika) jälkeen →
  `/Users/Shared/Claude/proto-3d/lokit/natiiviseppa-app-216-ks-fps-d/Matkakirja3D.app`; NS ilmoittaa polun.
- A+B+C-mittausäppi (ks-mittarit3) on jo mitattu; ei käynnissä olevia ajoja.

## SEURAAVA
1. Kun NS ilmoittaa äpin: kysy LT:ltä iPad vapaa → `xcrun devicectl device install app --device 00008103-001819421413401E <app>` →
   `zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/fps-216/ajo-laite-d.zsh ipad sk-d.txt` (taustalla, ~9 min) → "iPad vapaa" LT:lle.
2. Analyysi: `python3 -I fps-216/analyysi.py <lokikansio>`; vertaa 00.11- ja 01.27-ajoihin (LUE.md). Kuvasarjat
   `kuvasarja-a-ilman-rajaa-0..7.png` (Bastille, raja 0) ja `kuvasarja-b-raja3-0..7.png` (Trocadéro, raja 3) lokikansiossa:
   PT:n pitää nähdä tyhjät laatat ennen junaa. PT:lle ≤ 3 riviä: luvut + kuvien polku. Kirjaa odottaneet vastaukset
   ("laattavastauksia odotti vuoroaan") konsolista.
3. Jos D ei auta: seuraavat kohteet LUE.md:ssä (B2 taustasäikeiden 192 kt:n taulukot / ElavaTyyli.Piirra, NostoKerros.Paivita CPU).
4. iPhone (UDID 00008150-000A212E1407801C) mitattava, kun kytketty. Portti 06 (PR 5623) odottaa PT/KK:n kuittausta.

## Muuta
- Web PR 5690 (Metroasema) EI mergetä ennen junan 216 julkaisua; PR 5692 (edellinen luovutus) ja 5517 (vie-delta) auki.
- Haarat `karttaseppa-luovutus-20261029-1841` ja `karttaseppa-tasangot-213` mergeämättä (tarkista tarve ennen poistoa).
- devicectl-komennon lähetys epäonnistuu ajoittain yhden komennon osalta (ajo.log "LÄHETYS EPÄONNISTUI"); huomioi kehysmäärissä.
