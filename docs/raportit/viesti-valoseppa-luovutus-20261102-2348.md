# Valoseppä handover 2.11.2026 at 23.48

Reason: context soft limit (multiple runs and images). Previous handover: viesti-valoseppa-luovutus-20261102-2318.md (Etna background
-2250 still applies; standing ways of working -20261101-2124.md and -2220.md). Log: `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md`
(02.11. 23.18–23.45). Python: `_tyo/linssiseppa2/tulivuoret/venv/bin/python` (cv2, numpy, PIL).

## DONE: RAIN FROM THE DRAGON HEADS, PT 23.16 order items 1–4 (test, NOT in the train)
Branch **linssiseppa2/sade-218 = ac27f5b03** (worktree wt/proto-linssiseppa2-seinat218, pushed to natiivi-backup).
PT acked sade4 (b65dbc092) as a test at 23.3x; **sade-pari 3** (`_tyo/linssiseppa2/sade1/sade6-pari.jpg`) sent to PT at 23.45, **ack pending**.
- fdf676925 jets: JuoksuSuihku.shader _Suihku (2.9 m/s, 0.11→0.38 m), _Kaari (mouth 10° upward, minimum width 0.0028 m/m by distance,
  foam 0.4); ValoKohteet.JuoksuSadeSuihkuAlfa 0.85. 269af9fd7 bottom end breaks up and goes translucent (PT 23.3x).
- 4abf71b13 wall and Taihemen heads: osasarja-v6 part "vesisylkija" (78 + 100) → Sade.cs LisaaSuihkut(s, sm, tasot), drop to the ground (0).
- b65dbc092 wet stone: JuoksuValo.hlsl _JuoksuMarka / JuoksuMarkaK(n) (horizontal 0.6, vertical 0.82; ValoKohteet.JuoksuSadeMarka*),
  applied in the JuoksuLattia (602/620/622/853) and JuoksuMaailma (412) lit outputs.
- 8993e6175 sound: JuoksuAanet "sade-kivi" = media .../seikkailu/olavinlinna/aanet-saa-v3/aani/sade-kivi.mp3 (CC0), level 0.5 × rain strength,
  indoors 0.3, crickets go quiet in rain (JuoksupeliNakyma sadeSoitin). **Not verified**: the preview (esikatselu) starts no loops at all
  (no tuuli-1 either) → simu/device check.
- ac27f5b03 weather hook (PK 23.3x OK): JuoksupeliNakyma.SaaSateeksi on open + Saatila.Muuttui: Saa Sade|Ukkonen → rain 1, else 0.
  Log "sää Pois → sade 0" confirmed. QA `ui juoksupeli sade` overrides until the next weather change.
- Camera positions (`valo sijoita x z suunta lattia`): t1 58 -60 270 3.1; Taihemen 20 -250 0 0; wall platform -95 -40 180 0 and -138 -58 90 0.
  Bad: -109 -63 (inside a roof), 8 -252 (behind the vase pedestal).

## QUEUE
1. PT's answer to sade6-pari. Known: the light paving on top of the wall platform (mu3b, -125 -58 180 2.0) doesn't darken
   (different surface/shader, not investigated). To the train only on PT's say-so (with PK).
2. **Etna close-range board 19022** (PT: next after the rain) + fix the dark red alpha dots on the plume edge at zoom 2 (handover -2250).
- Known (Sarytšev): thin pale line under the board, not investigated.

## Worktrees (proto)
- wt/proto-linssiseppa2-seinat218: linssiseppa2/sade-218 ac27f5b03.
- wt/proto-linssiseppa2-tulivuoret: linssiseppa2/tulivuoret-sarja 182fbf7de (Etna).
