# Natiivisepän luovutus 10.11.2026 klo 09.05

Edellinen: -0820 (e2631b4d0) ja -0800 (282406abb); kaikki niiden avoimet kohdat on käsitelty alla. Syy: kontekstivahti 27 % (7.37).
Sessio Natiiviseppä local_0f7f169f-…, kansio Matkakirja-3d-selvittaja. Älä poista mitään.
Työlista: python3 -I /Users/Shared/Claude/Matkakirja-fable/tools/asemataulu/tyolista.py seuraava NS (NYT: Yksi tarkkuus).
Cron "4 9 * * *" unity-julkaisut.py: LUO UUDELLEEN (session oma; /opt/homebrew/bin/python3.14
/Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/unity-julkaisut.py ILMAN -I:tä; UUSI-rivit → PT "UNITY UUSI: …").

## LEVY: siirto-wt.zsh ajossa (aloitettu 08.52, loki _tyo/natiiviseppa/levy/siirto-wt-0852.log, 09.00 koodikoko224)
Nollaus katkaisee sen → aja uudelleen taustalla: /bin/zsh /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/levy/siirto-wt.zsh >
…/levy/siirto-wt-<hhmm>.log 2>&1 (valmiit "ei kansiota"). Loppuun rivi PT:lle (montako, vapaa tila; 09.03 vapaana 67 Gt).

## TEHTY TÄLLÄ VUOROLLA
- MUSEO-1 91bc37c4b: PT HYVÄKSYI 08.5x. Vastaukset: _tyo/natiiviseppa/museo-1/vastaus-pt-20261110-0855.md (maa puuttui otsikosta
  DNS-jumin takia: maaluettelo valmis vasta t≈330 s; L3 = kuvaushetki, vaihdot samoina hetkinä). Tuotantopaketti
  _valmiit/iso-museo-v1-vienti-20261110 (209 + hakemisto, SHA256SUMS OK) JU:lle → JU vie ennen 224.13-linkkiä, MR haarasta
  natiiviseppa/museo-palvelimelle. IDEA (PT: kirjaa, ei nyt): museon maa kiinteästi (Alankomaat/Ranska), jos maaluettelo ei ole valmis.
- OLENNAISET NIMET 7491ded20 iPad katsottu ja OK (O1 = O2, K1, K2; tilarivit) → JU:n MR2 ajossa (224.12).
- ISS-MUISTI A/B 0fc5b9a73 katsottu: _tyo/natiiviseppa/iss-muisti/tulos-ab-0fc5b9a73.md. Huippu B 4397 (> 4080). BMNG kevyt −100 Mt,
  ei kuvaeroa (PT: saa MR:ään yhdessä seuraavan kanssa, kun iPad-huippu mitattu). A-ajo ei kelvannut (alun komento ei mennyt perille).

## TYÖN ALLA: ISS-MUISTI KOE C (PT 09.0x: ENNEN Yksi tarkkuutta)
- Memoryless ei käy: URP 17.7 pitää kamerapinon välikohteet (A/B + syvyys, 2732×2048 MSAA4x, 276 Mt) staattisina RTHandleina,
  jotka pinon kamerat jakavat. Tilalle Kartta/UrpLiitteet.cs: kun mikään kamera ei piirrä pinona 2 s → kohteet vapautetaan
  kontekstin alussa (reflektio UniversalRenderer.s_RenderGraphCameraColorHandles / s_RenderGraphCameraDepthHandle), URP luo ne itse
  uudelleen pinon palatessa. Loki "MATKAKIRJA urp: kamerapinon kohteet vapautettu …", QA `kartta urpliitteet tila|pois|paalle|vapauta`.
- natiivi-backup natiiviseppa/iss-muisti 630e6bc31 (wt /Users/Shared/Claude/wt/proto-natiiviseppa-kartanpurku), unity-tarkistus sh 0.
- JU:lla: _tyo/natiiviseppa/iss-muisti/sk-iss-muisti-c.txt → lokit/natiiviseppa-iss-muisti-c-630e6bc31 (I1, I2, K1 paluu kaupunkiin).
  KUN VALMIS: urp-vapautusrivi lokissa (kerta, Mt), huippu vs B 4397 (tavoite < 4080), R-rivillä ei enää 2732×2048 MSAA4x Cupolassa,
  K1 kaupunki ehjä täysikoossa (kohteet luotu uudelleen), ei VIKAa. Sitten rivi + pari PT:lle; alle 4080 → MR (BMNG kevyt + UrpLiitteet)
  haara junan päälle. Jos yhä yli: seuraava vipu S2 kevyempi = näkyvä → KK:n kortti (tulos-ab-tiedoston kohta 3).
- Huom: pinon tunnistus = peruskamera, jolla aktiivinen päällyskamera, tai päällyskamera piirtää. Jos jossain näkymässä pino
  vuorottelee (2 s:n välein), uudelleenluonti nykii: katso lokin "kerta"-luku.

## SEURAAVA: "Yksi tarkkuus koko näkymään, Pariisi terävänä" (työlista NYT, omistajan kortti 08.00, koe) – pohja luettu (agentti):
- Pohja natiiviseppa/yksi-taso 83d48ba80 (b221a28a1 → 7f02b9152 → 46b7cf417 → d2ba2f540 → 83d48ba80; kanta 5488bdd8b).
  YksiTaso.cs (205 r., piirtämätön lapsikamera Cesiumin additionalCameras, useMainCamera false, Update joka kehys) ja
  LiikeLaatatPaatos.YksiTasoLaske (rivi 131): taakse = (K−1)·d, K = 8 (KallistusK oletus 8), kartio 32 reunasäteestä usvan loppuun ×1,15,
  hillintä = min(1, sqrt(PalaRaja·paaN/omaN)) palamallista (64×8 sädettä) – EI kovaa kattoa; korkeus px = näyttö·kerroin·hillintä·K·tanVv/ta.
  Tilesetin asetuksiin ei kosketa. Ei hystereesiä tason vaihdolle (vain LiikeNyt 0,35 s → kerroin ×0,5).
- Testit Kartta-testit/Testit/LiikeLaatatPaatosTestit.cs (YksiTasoKehysSuoraanAlas, YksiTasoKartioKattaaMaan, YksiTasoKallistettunaLahesYksiTaso);
  hillintää ja muistia ei testata.
- tulos.md: Mac pyynnöt ×6,5 (85°: z15 165 → 3474, z17 16 → 3470); iPad 80° kaatui 5120 Mt (pallo 1676 vs 858 Mt), ~87 pyyntöä/s, ~40 palaa/s;
  40°/60° eivät keventyneet; hyppy: koko näkymä vaihtaa tasoa kerran per nipistys.
- Valmiit säätöpaikat: KarttaKerrokset.cs:132–135 (loadingDescendantLimit, maximumSimultaneousTileLoads pallolle), :2313–2321
  (maximumCachedBytes kyydissä); Valmius.cs:164: Cesium 1.25.1:n asettimet lataavat tilesetin uudelleen → älä aseta joka kehys.
  Pallo.unity: maximumSimultaneousTileLoads 40, maximumCachedBytes 512 Mt, loadingDescendantLimit 64, preloadAncestors/Siblings 1.
- Linja: kova palakatto YksiTasoLaskeen (ennuste palamäärästä → K ja kartion leveys rajataan niin, ettei pyyntöjä/muistia ylitetä;
  takaisinkytkentä todellisesta palamäärästä), kartio ei usvan loppuun 80°:ssa, tason vaihto hystereesillä/levossa. Haara
  natiiviseppa/yksi-tarkkuus juna-224:n päälle. Kaksi yritystä; jos ei ratkea, rivi PT:lle.
