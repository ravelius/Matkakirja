# Natiivisepän luovutus 31.10.2026 klo 17.55 (Postivahti)

Vain voimassa oleva tila. Historia: /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/juna214/jono-214.txt (loppu = uusin).
Id:t: /Users/Shared/Claude/osoitekirja.md. Levy ~104 Gi; yksi Unity kerrallaan linjalla (lukot), VS ajaa linjalla 2.

## JONO
- **Tyhjä.** Odota merge-pyyntöjä junaan 216 (PT OK tai omistajan hyväksyntä viestissä → merge, testit, SHA PT:lle).

## TILA
- **Juna 216 runko natiiviseppa/juna-216 = 76b1894ed**, testit VIHREÄT 2223/777/575, tarkista 0, peilissä
  (natiivi-backup peili/proto/natiiviseppa/juna-216). Viimeisin oma laitekäännös: 9fb2d0b52 (METAL 444/0, PIPELINE 436/0)
  → lokit/natiiviseppa-app-216-kori. Sen jälkeen tulleet NUI:n piirros-, piirroskoko- ja kierroserä sekä PK pk8 ja VS pinnat-yulu:
  Unity-käännös vain tekijöiden omissa ajoissa (NUI:n todistukset) → seuraava laitekäännös rungosta ennen TF:ää.
- Junaan 216 tänään: valopakkaus be9b9b96a, LOD2-purku a045ae1d9, KS kartan kuvat 9287cb95e (iPad-huippu 3559/3575 Mt, marginaali ~1,5 Gt),
  NUI ihmetähti b216a5c10 + kevyt 5def5841b, VS kori-vaaleampi d63d3dcc4, NUI piirros-kontrasti e3238b20f + e854881a4 + 24426a0a0,
  PK pk8 0df9eb01f (pk8 mediassa JU 12.39), VS pinnat-yulu 781354bc4, NUI kierros-vaaka 20a6e0311 (omistaja 17.34).
- **Notre-Damen leikkaus: valmis, ei toimia.** v6k27-ehdokas (kapea leikkaus, ei omaa maata) HYLÄTTY (paljasti Googlen restaurointityömaan);
  leveä leikkaus pysyy. Maan ja sakariston tekstuuri → LAV valotöiden jälkeen (PT 17.5x). NS:lle vain vienti, jos LAV pyytää.
  Aineisto: proto-3d/_tyo/natiiviseppa/nd-leikkaus/ (pari-K1-notre-dame.png). Havainto: 5 muulla Pariisin mallilla sama oma maa koko
  leikkausalueella (Louvrella pieni). Karsintatyökalu: natiiviseppa-skriptit/omat-mallit-karsi.py (GLB:n solmujen poisto + tiivistys).
- Koe D -äppi 51415e442 → KS:llä (lokit/natiiviseppa-app-216-ks-fps-d). LT:n kuja02-uusintakuva KL:stä ei tullut; PT kuittasi ilman.

## JATKOKOMENNOT
- Merge: wt/proto-natiiviseppa-ehdokas: `git fetch -q natiivi-backup refs/heads/peili/proto/<rooli>/<haara>` → `git merge --no-ff`
  → `git push -q natiivi-backup HEAD:refs/heads/peili/proto/natiiviseppa/juna-216` → testit → SHA PT:lle (≤ 3 riviä).
- Testit: `EI_PEILIA=1 nice -n 15 zsh /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/juna210/testit210-rinn.sh /Users/Shared/Claude/wt/proto-natiiviseppa-ehdokas`
- Laitekäännös: `PROTO_LAITE_KOPIO="/Volumes/T7 4TB/koodaus/proto-natiiviseppa-unity-b7" zsh /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/laite-sha.sh <sha> <lokikansio>`
- Editorin batch-esikatselu ei piirrä Cesium-kaupunkia (vain UI) → kaupunkikuvat NUI:n simulla (todistusajo `--doc omat-mallit-osoitin.txt=file:///…/mallit.json`).
- Cron Unity-beeta "4 9 * * *" (unity-julkaisut.py) luodaan uudelleen. ÄLÄ poista wt/proto-natiiviseppa-ehdokas, -muisti, -tyokalut eikä T7-kopioita.
