# Natiivisepän luovutus 31.10.2026 klo 19.40 (konteksti 35 %)

Vain voimassa oleva tila. Historia: /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/juna214/jono-214.txt (loppu = uusin).
Id:t: /Users/Shared/Claude/osoitekirja.md. Levyä ~60 Gi (aamulla 104). Yksi Unity kerrallaan linjalla (lukot).

## JONO
1. **Koekohtaus piha 06** (omistaja 18.28/18.31 PT:n kautta: Macin Unityssä niin hienoksi kuin mahdollista, suorituskyvystä
   välittämättä, EI laiteajoja; VS vetää, NS = Unity 6.7 -piirteet + merget koehaaraan). EI junaan 216 ilman PT:tä.
   - Haara **natiiviseppa/koe67-piha06 = eea644ee0** (peili natiivi-backup peili/proto/natiiviseppa/koe67-piha06), worktree
     /Users/Shared/Claude/wt/proto-natiiviseppa-koe67 (ÄLÄ poista). Sisältää: juna 216 76b1894ed + STP oletuksena + CAS-terävöitys
     (URP 17.7:n STP ei terävöitä itse), Koe67.cs (volumetrinen sumu, GTAO, SSR, Surface Cache GI ajonaikaisina piirteinä + volyymi),
     DepthNormals-passi juoksuvarjostimiin (JuoksuNormaalit.hlsl, alfa = kiiltävyys), JuoksuGi (JuoksuValo.hlsl),
     Editor/Koe67GiAsetukset.cs, ProjectSettings VOLUMETRIC_FOG (iPhone + Standalone), VS:n piha06-aurinko f4df529a6 ja piha06-pari abd09ac0b.
   - QA: `valo stp|terava|sumu 0|1|<tiheys>|ssao|ssr|gi 0|<voima>|kiilto seina|lattia|halli|vesi <0–1>`. AgX HYLÄTTY (PT). APV ei (juoksumaailma syntyy ajossa).
   - Editoriskenaario: proto-3d/_tyo/natiiviseppa/koe67/koe67-06.txt (a perus, b stp, c gtao, d sumu, e ssr, f gi, g kaikki, h kaikki ilman GTAO).
     Ajo: `cd wt/proto-natiiviseppa-koe67; zsh tyokalut/esikatselu.sh natiiviseppa/koe67-piha06 <skenaario> ipad` (linja 2, ~10 min).
   - Tulokset 3dd03016d (lokit/esikatselu-20261031-190918, koonti _tyo/natiiviseppa/koe67/k06-koonti-1910.png): STP ok; sumu = tasainen
     hälvennys ilman keiloja (aurinko kameran takana – kokeile vastavaloon tai pienempää tiheyttä); GTAO ei näkyvää eroa; SSR kaatui
     (NullRef cameraColor) → korjattu c946cb53b:ssä (vain juoksukamera); GI magenta (_ScreenSpaceIrradiance kahdesti) → korjattu c946cb53b.
   - **KESKEN:** uusinta c946cb53b:llä ajettiin 19.3x → katso uusin proto-3d/lokit/esikatselu-20261031-19* : grep unity.log
     "POIKKEUS|Shader error|koe 6.7", tee koonti (python PIL 4×2) → kuvat ja havainnot VS:lle (local_3b36fe96-…). Jos SSR kaatuu yhä
     juoksukamerassa: cameraColor puuttuu → kokeile afterOpaque=false tai temporalFiltering=false.
   - Avoinna: VALOVAHTI "volyymi 2 > lähtötaso 0" Koe67.cs:ssä (koehaaran poikkeus, ei junaan).
2. Merge-pyynnöt junaan 216 (PT OK → merge, testit, SHA PT:lle).

## TILA
- **Juna 216 runko natiiviseppa/juna-216 = 9b7308099** (PK reitti-216 ffd491927), testit VIHREÄT 2223/781/575, tarkista 0, peilissä.
  (PK:n 338b06286 ehti junaan 3878328ad ja peruttiin → palautus 76b1894ed, peili -f.) Viimeisin oma laitekäännös 9fb2d0b52;
  seuraava laitekäännös rungosta ennen TF:ää.
- Cron Unity-beeta "4 9 * * *" luotu tässä sessiossa → luo uudelleen uudessa sessiossa.

## JATKOKOMENNOT
- Merge: wt/proto-natiiviseppa-ehdokas: `git fetch -q natiivi-backup refs/heads/peili/proto/<rooli>/<haara>` → `git merge --no-ff`
  → `git push -q natiivi-backup HEAD:refs/heads/peili/proto/natiiviseppa/juna-216` → testit → SHA PT:lle (≤ 3 riviä).
- Testit: `EI_PEILIA=1 nice -n 15 zsh /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/juna210/testit210-rinn.sh <työpuu>`
- Laitekäännös: `PROTO_LAITE_KOPIO="/Volumes/T7 4TB/koodaus/proto-natiiviseppa-unity-b7" zsh /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/laite-sha.sh <sha> <lokikansio>`
- tarkista.sh: unity-tarkistus näkee UnityEditor-tyypit kahdesti (CS0433) Assembly-CSharpissa → editorikoodi Editor-kansioon tai heijastuksella.
- ÄLÄ poista wt/proto-natiiviseppa-ehdokas, -muisti, -tyokalut, -koe67 eikä T7-kopioita.
