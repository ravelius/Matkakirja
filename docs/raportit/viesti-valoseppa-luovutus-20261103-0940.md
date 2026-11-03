# Valosepän luovutus 3.11.2026 klo 09.40

Syy: konteksti (pehmeä raja). Edellinen: viesti-valoseppa-luovutus-20261103-0729.md (pysyvät työtavat -20261101-2124.md,
-2220.md voimassa). Loki: `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md` (B alla = tämä kansio). Python:
`$B/tulivuoret/venv/bin/python -I`. Esikatselu vain JU:n "ESIKATSELU NYT" -viestillä; JU kertoo linjan (L1 tai L2) →
`PROTO_LINJA=<n>`; heti valmistuttua "VAPAA L<n>" JU:lle. zsh: viittaa ref:iin `"haara:polku"` lainausmerkeissä (`$J:A…` laajenee).

## Tehty tässä sessiossa (kaikki JONO.md:ssä, PT kuittasi)
- UMBRA: pim10–11 mittaus (B/pimennys-aito/pim10/mittaus.md): koko oikein, kuvakäyrä väärin. OletusLog 0 (lineaarinen)
  53b918b3a (linssiseppa2/pimennys-aito, natiivi-backup). Juna 218:ssa ei kuvakäyrää lainkaan → ei siirrettävää (PT ok).
  Kaikki ISS-ilmiöt valmiita kokeina (työlista päivitetty).
- VALO 218y: runko pelikoodari/sali-218y cf40ca767 EI sisällä juna-218:n valoa (0ffb7e562: katon ShadowsOnly, salijuova,
  salilampo, seinämaavalo) → aurinko salien sisällä. Koe linssiseppa2/valo-218y **b03eff6ef** = cf40ca767 + juna-218 8d18d7047
  (puhdas yhdistys): salien valo = 2.11. kuitattu. PT KUITTASI. Skenaario B/valo218y/sk-v1.txt (pinnat3: 04 + 9 salia),
  mittari `skriptit-20261031/pinnat-mittari.py <ennen> <nyt> <ulos>`, vertailu esikatselu-20261102-200926 / -20261103-092738.

## SEURAAVAKSI (PT 09.3x): pehmeä kontakti-/sisävarjo hahmolle ja kalusteille, KOE juna-218:n päälle, pari PT:lle
Havainto (PT): salin harmaalla lattialla hahmolla ei MITÄÄN varjoa (kelluu), kalusteiden alla ei kontaktivarjoa. Syy: sali on
katon varjossa (ShadowsOnly) → hahmon aurinkovarjo katoaa katon varjoon; SSAO on pois juoksupelissä (GPU, Jalki.cs:59).
SUUNNITELMA (ei vielä koodia):
1. JuoksuValo.hlsl: uusi `float JuoksuKontakti(float3 p, float3 n)` JuoksuNurkan viereen (rivi ~381), kerrotaan samaan
   kohtaan kuin JuoksuNurkka: JuoksuLattia.shader:540 (`JuoksuNurkka(i.w, n) * peitto`) ja JuoksuMaailma.shader:392 (`ao`).
   - Pallot (hahmot): `float4 _JuoksuKontaktiPallo[4]` (xyz, r), IQ-pallopeitto occ = saturate(dot(n, d)/|d|) · r²/|d|²;
     keisari 2 palloa (lantio y≈0,5 r 0,32, jalat y≈0,15 r 0,22).
   - Laatikot (kalusteet): `float4 _JuoksuKontaktiLaatikko[16]` (keskus x z, puoliskot x z) + `float4 _JuoksuKontaktiKorkeus[16]`
     (yläpinta y, voima): 2D-etäisyys jalanjäljestä e → (1 − smoothstep(0, 0,35 m, e)) · (1 − smoothstep(0, 0,5 m, p.y)),
     jalanjäljen alla täysi.
   - `float4 _JuoksuKontakti` (pallojen määrä, laatikoiden määrä, voima ~0,55, täyttöosuus: vain varjo-/täyttövaloon, auringossa
     × ~0,4, koska elävä varjo hoitaa).
2. CPU: JuoksuV4Maailma.Valo.cs (tai uusi osatiedosto JuoksuV4Maailma.Kontakti.cs, ei LAV:n tiedostoja): maailman latauksen
   jälkeen kalusteehdokkaat = MeshRendererit, joiden bounds.min.y < 0,15, koko y 0,2–2,5 m, max(x, z) < 5 m, ei seinät/pylväät
   (pylväs: x ja z < 0,8 ja y > 2,5 → pois); joka ruutu 16 lähintä keisaria → globaalit. QA `valo kontakti 0|1 [voima]`.
3. Ajo: sk-v1:n salikuvat (pcd, py, pth, pch, pxf) kontakti 0 | 1 samasta kohdasta → pari PT:lle; regressio 04 (piha) ja
   puhki/musta-%. Haara linssiseppa2/kontakti-218 juna-218:sta (worktree uusi wt/proto-linssiseppa2-kontakti218).

## Worktreet
- wt/proto-linssiseppa2-tulivuoret: linssiseppa2/pimennys-aito 53b918b3a (puhdas). valo-218y-haara vain ref (ei worktreeta).
