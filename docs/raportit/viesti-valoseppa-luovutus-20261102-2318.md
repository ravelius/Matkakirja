# Valoseppä handover 2.11.2026 at 23.18

Reason: context 31% (soft limit, context monitor). Previous handover: viesti-valoseppa-luovutus-20261102-2250.md (standing ways of working
-20261101-2124.md and -2220.md still apply). Log: `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md` (02.11. 22.53–23.15).
Python: `_tyo/linssiseppa2/tulivuoret/venv/bin/python` (cv2, numpy, PIL), not the system python3.

## DONE IN THIS SESSION: RAIN FROM THE DRAGON HEADS (owner 21.17, PT's priority 22.5x)
Test branch **linssiseppa2/sade-218 = 9aa4a113a** (trunk 8d9951aa7 + 5b7cd6454 + 9aa4a113a; worktree wt/proto-linssiseppa2-seinat218;
pushed to natiivi-backup; NOT in the train). PT has the pair (23.16), **ack pending**.
- Dragon heads already exist: LAV/Codex C2 model **1064-c2-vesisylkija** (0.45 m, mouth at the tip), c2-sijoitukset.json r2 (g-jalusta) 1460
  pieces on three tiers (y 2.77 / 4.97 / 7.8). r0/r1 (wall, Taihemen) heads are paths of kielletty-osasarja-v3 → no jets yet.
- Valopohja.AsetaJuoksuSade(0..1) + ValoKohteet.JuoksuSade* (first estimate): sun ×0.32, shadow ×0.3, ambient/horizon/zenith/
  haze grey, paving gloss ×2.2 roughness 0.2. PeliValo saves the base (SadePohja) → rain persists across the light QA.
  JuoksuTaivas.shader: JuoksuSade.hlsl JuoksuSadeTaivas (cloud deck, also over the panorama).
- JuoksuSokkeloMaailma.Sade.cs: per head a matrix T(mouth)·R(out)·S(1, drop, 1); levels = heights with ≥ 40 baluster
  posts 1061 (0/3.1/5.3/8.1; the stair posts gave the 0.3 m drops in sade1). Drawn in PaivitaSarja in the heads' near tiles
  (Muurikate.cs: InstSarja.sylkija, InstRuutu.suihkut*). JuoksuSuihku.shader (projectile motion, ribbon + splash),
  JuoksuSadeViivat.shader (2400 streaks around the camera, wrapping in world space). QA `ui juoksupeli sade <0..1> | suu <y> <z> | tila`.
- Runs: sade1 (esikatselu-20261102-230448, 5b7cd6454) and sade2 (-231035, 9aa4a113a); scenarios and pair `_tyo/linssiseppa2/sade1/`
  (sk-sade1.txt, sk-sade2.txt, ajo.zsh/ajo2.zsh, **sade-pari.jpg**). `valo sijoita x z suunta [lattia]`: 40 -98 0 = in front of the terrace, 58 -60 270 3.1 =
  the east end of terrace 1 (best jet view); e/i/k positions got a camera pointing down at the ground (pick better ones).

## QUEUE (the next one picks up here)
1. PT's answer to sade-pari.jpg. Open: jets thin/glassy (real ones are a whiter, more powerful arc: _Suihku widths, alpha 0.75),
   wall and Taihemen heads (osasarja-v3 paths, Osasarja.cs) without jets, wet stone darker (albedo), rain sound (AaniPohja
   sade-kivi loops exist, SeikkailuSade.cs as the model) and **hooking into the weather system together with PK** (when it rains; now QA only).
   valovahti ok. To the train only after PT's ack (with PK).
2. Then the Etna close-range board from 19022 (PT 22.5x: also fix the dark red alpha dots on the plume edge at zoom 2), earlier handover -2250.
- Known (Sarytšev): thin pale line under the board, not investigated.

## Worktrees (proto)
- wt/proto-linssiseppa2-seinat218: now linssiseppa2/sade-218 9aa4a113a (previously the c3-218 test branches; those are in natiivi-backup).
- wt/proto-linssiseppa2-tulivuoret: linssiseppa2/tulivuoret-sarja 182fbf7de.
