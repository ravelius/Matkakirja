# Lavastajan luovutus 19.10.2026 klo 10.5x (Opus, medium) – Postivahti: kova raja 36 %

Edellinen: `viesti-lavastaja-luovutus-20261019-aamu.md` (3e8eab034). Viestit send_messagella session id:llä (`/Users/Shared/Claude/osoitekirja.md`),
PT:lle enintään 3 riviä, absoluuttiset polut. **Ei käynnissä olevia käännöksiä, simuja eikä Blender-ajoja.**

## Rooli
LAVASTAJA (PT: OMISTAJAN PÄÄTÖS 08.48): Codexin mallien kokoaminen kohtauksiksi (Louvre valmis, Olavinlinnan huoneet), museon kehysten pinnat.
Malleja ei tehdä itse (omistaja 08.28); omat asettelumallit ja ohjekuvat Codexille kyllä.
**PT 10.4x: komennot ilman lupaikkunaa** (skriptit tiedostosta, ei shell -c/eval, ei rm, ei cd && -ketjuja, rajatut haut; lupa → JUMI PT:lle).

## Tehty tämän luovutuksen jälkeen
- **Louvre valmis:** sali-v2q 3c8b4c195 PT hyväksyi → merge-pyyntö NS:lle junaan 204 (viesti jonossa NS:llä). kehykset-v11b-204 EI mergetä.
- **Olavinlinnan huoneet 6–10 + tyrmä, harmaa asettelumalli Codexille:** `/Users/Shared/Claude/proto-3d/_valmiit/olavinlinna-asettelu-6-10-v1/`
  (OHJE-CODEXILLE.md: selite, huone → osa → avainmerkit Projektisepän vahvistamana, mitat, kerrokset, säännöt; 5 × asettelu-<osa>.glb merkit solmuina;
  13 pohjaleikkausta + 10 pystyleikkausta; SHA256SUMS; tyokalu/asettelu.py). Polku PT:lle 10.4x → PT tilaa Codexilta lopullisen geometrian.
  Uudet osat sovittu Projektisepän kanssa: muurikaytava (pisteet 80–87), **harja** (88–92), **komero** (93), **pako** (94); muut nimet ennallaan.
  Generaattori `/Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/olavinlinna-asettelu/asettelu.py`
  (`Blender -b --factory-startup -P asettelu.py -- <v44/kavely> <ulos> <osa,...>`).
  Tunnettu puute: kirkkotorni-portaat-pohja-3-y+9,5.png:ssä tumma kiekko kappelin kohdalla (syy selvittämättä; luultavasti vaakapinta luokittuu seinäksi).
- **Codex-3D-portti** PR https://github.com/ravelius/Matkakirja/pull/4895 (491f8d5cb), siirtyy Työkalusepälle mergen jälkeen.

## Avoimet (seuraava sessio)
1. **Kehysten kartoitus (Rijksmuseum):** skenaario `proto-3d/tyokalut/linnanrakentaja-ajot/sk-kehykset-kartoitus-204.txt`, ajo
   `zsh .../ajo-kehykset-kartoitus-204.zsh /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/sali-v2q-204-app/Matkakirja3D.app` (~6 min, iPhone BD64C8E4).
   Olin JU:n jonossa LS:n jälkeen; vuoro vapautettu luovutuksen takia → pyydä uusi "VALMIS SIMUUN" JU:lta. Kuvista PT:lle kehyserän ehdotus.
2. Tripo-hahmot (kokki, portinvartija) Codexilta → kokoa keittiöön MetaHuman-kokin viereen (rajat x −24,6…−14,8, |z| 10,8…17,2; partio −17,5/−22,6, y −2,65, z 11,6).
3. Codexin huonegeometria (kun tulee): portti `node tools/codex-3d-tarkistus.mjs <kansio>` → kokoa merkkeihin.
4. Siivous: `wt/proto-linnanrakentaja-kehykset` pois kun v2q junassa; `wt/linnanrakentaja-codex-3d` pois kun #4895 mergetty; `_tyo/linnanrakentaja/kehykset-v11b-204-app` pois.

## Opit
- Törmäysverkko on irrallisia tasoja: pohjakuvaan pystypinnat + solidify, ei bisect-täyttöä (holvit muuttuvat kiekoiksi); glTF-materiaalit pois (Workbench-läpinäkyvyys); FLAT-valo pohjiin.
- Vastaa simuvuoroon heti tai kerro, ettei ehdi: vuoro 09.21 meni ohi, kun tein muuta.
