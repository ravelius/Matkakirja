# Natiivisepän luovutus 31.10.2026 klo 22.05 (viikkokäyttö 90 %, PT)

Vain voimassa oleva tila. Historia: /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/juna214/jono-214.txt (loppu = uusin).
Id:t: /Users/Shared/Claude/osoitekirja.md. Yksi Unity kerrallaan linjalla (lukot). Ei keskeneräisiä ajoja eikä agentteja.

## JONO
1. **VS:n pyynnöt koekohtauksessa piha 06** (omistaja 18.31: Macin Unityssä niin hienoksi kuin mahdollista, ei laiteajoja; VS vetää).
   - Koehaara **natiiviseppa/koe67-piha06 = 5a51c8181** (peilissä), worktree /Users/Shared/Claude/wt/proto-natiiviseppa-koe67 (ÄLÄ poista).
     EI junaan 216 ilman PT:tä.
   - Tämän session muutokset: c946cb53b SSR vain juoksukameralle + GI-magenta pois; b7718d358 verkot vapautetaan Raw-puskureilla
     (JuoksuV4Maailma.VapautaRaakana; GI:n GeometryPool "index buffer is null"); 5a51c8181 SSR:n kiiltävyyden häivytysväli 0,02–0,6
     (URP:n oletus 0,05–0,1 antoi täyden heijastuksen jo kiillosta 0,1) + QA `valo ssr <voima 0–1>`, `valo ssr haivytys <alku> <loppu>`.
   - VS ajaa 5a51c8181:llä kiiltokokeen; odota VS:n tulosta. Jos kiilto ei vieläkään vaikuta: tarkista, että KaytaKoe67 ajetaan
     QA-komennon jälkeen (Valo.cs r. ~316 → Koe67Komento) ja että DepthNormals-alfa (JuoksuNormaalit.hlsl) on _SmoothnessTexture.
   - Tulokset: a–d lokit/esikatselu-20261031-192025, d2–h -194135, GI-uusinta -200640. Koonti ja havainnot
     proto-3d/_tyo/natiiviseppa/koe67/k06-koonti-2000.png + k06-havainnot-2000.md (VS:llä).
   - Avoinna: 1× GI-virhe kk-tausta-1-0 lod1 = DATAvirhe (kielletty-tausta-v81/kk-tausta-1-0-lod1.glb: primitiivi 545 kärkeä, 0 indeksiä)
     → LAV:lle ilmoitettu. VALOVAHTI "volyymi 2 > lähtötaso 0" ja 2 half-testiä (JuoksuNormaalit.hlsl) = koehaaran tunnetut poikkeukset.
   - Skenaariot: proto-3d/_tyo/natiiviseppa/koe67/koe67-06.txt (a–h), -eh.txt, -f.txt. Ajo: `cd wt/proto-natiiviseppa-koe67;
     zsh tyokalut/esikatselu.sh natiiviseppa/koe67-piha06 <skenaario> ipad` (linja 2).
2. **PK:n taustan LOD -erä junaan 216:** pelikoodari/tausta-lod-216 (06fed34e2, 8d0ce1dec), mittaus m1 tehty (PK:n luovutus
   viesti-pelikoodari-luovutus-20261031-2155.md, kohta 4). Merge vasta kun PT kuittaa mittauksen/kuvaparin ("kun muistimittaus on ok").
3. Muut merge-pyynnöt junaan 216 (PT OK → merge, testit, SHA PT:lle ≤ 3 riviä).

## TILA
- **Juna 216 = ec0554ca8** (peilissä natiivi-backup peili/proto/natiiviseppa/juna-216), testit 2223/782/575, tarkista 0.
  Sisältää: 9b7308099 + d41ae2a47 (omat mallit uusin-5.json → v6k28 vain 216+:lle, varana uusin-4/-3) + PK valo-k1-216 8bcfebdf2
  (leivottu valo, kerroin 1; paketit R2:ssa JU 20.45). Viimeisin oma laitekäännös 9fb2d0b52 → seuraava laitekäännös rungosta ennen TF:ää.
- R2: uusin-5.json → v6k28 (JU 19.57); uusin-4 → v6k26 ja uusin-3 → v6h3 ENNALLAAN (julkaistut TF 214/215, PT: älä vaihda).
- Pariisin piirroskerros: PT PERUI minulta, KS tekee (NUI napin). KS:lle annettu kameran/maanpinnan rajapinta:
  proto-3d/_tyo/natiiviseppa/piirros-kamera-rajapinta.md. Väliaikainen v0-manifesti _tyo/natiiviseppa/piirros-pariisi-v0/ (ei käytössä).
- Cron Unity-beeta "4 9 * * *" (python3 proto-3d/tyokalut/natiiviseppa-skriptit/unity-julkaisut.py) → luo uudelleen uudessa sessiossa.

## JATKOKOMENNOT
- Merge: wt/proto-natiiviseppa-ehdokas: `git merge --no-ff <sha>` (paikallinen haara tai `git fetch -q natiivi-backup
  refs/heads/peili/proto/<rooli>/<haara>`) → testit → `git push -q natiivi-backup HEAD:refs/heads/peili/proto/natiiviseppa/juna-216` → SHA PT:lle.
- Testit: `EI_PEILIA=1 nice -n 15 zsh /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/juna210/testit210-rinn.sh <työpuu>`
- Laitekäännös: `PROTO_LAITE_KOPIO="/Volumes/T7 4TB/koodaus/proto-natiiviseppa-unity-b7" zsh /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/laite-sha.sh <sha> <lokikansio>`
- ÄLÄ poista wt/proto-natiiviseppa-ehdokas, -muisti, -tyokalut, -koe67 eikä T7-kopioita.
