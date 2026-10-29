# Natiivisepän luovutus 27.10.2026 klo 21.55 (konteksti 31 %; juna 213 runko f632e43bb)

Vain voimassa oleva tila. Historia: /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/juna213/jono-213.txt (loppu = uusin;
212:n historia juna212/jono-212.txt). Id:t: /Users/Shared/Claude/osoitekirja.md. PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31,
JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd, PK local_d3bb1f78-e2ea-4089-8bae-d106bb1f9ff7, VS local_5ebb0658-96f6-434d-8a38-b122eb53032f,
LR local_f12c9179-a76b-4ce8-a1fe-1e0f2c8f251e, NUI local_4b84cd90-123f-46c5-bc07-75760ed4c80b.

## TILA
- **Juna 212 JULKAISTU**: lukittu 80b1ea539e51262848d3b15055770bc31148a315 (OMISTAJAN PÄÄTÖS 18.52 "Julkaise juna … Ei testejä"; ehto 18.51
  ei huohotusta → PK 46b3f424c poimittu vain huohotuksen osalta). iOS TF ulkona 20.16, Mac 212 (juna212/mac212.sh) Mac-TF 20.38. Muutosloki PR 5378.
- **Juna 213 runko natiiviseppa/juna-213 = f632e43bb** (wt/proto-natiiviseppa-ehdokas, puhdas; peili natiivi-backup
  peili/proto/natiiviseppa/juna-213). Testit VIHREÄT 2213/761/563, tarkista 0; METAL 442/0, PIPELINE 434/0 (ef70e678c, viimeinen shader-muutos).
  Sisältö 80b1ea539:n päälle: PK jetsam-213 3b0b4402f, PK eunukit-213 0ecf2a1c2 (hahmot-v4 ämpärissä), LR tausta-v60 9805ef7c5 (ämpärissä),
  VS seinat-211 3985a20cf → a1d79e26e → 1158e9df0, PK nre-213 f632e43bb.
- **213:n JULKAISUEHTO**: `taivas-paiva-codex-v2/` ämpäriin (JU, PT:n kautta) ennen TF:ää; muuten päivätaivas proseduraalinen (ei kaadu).
- Ei lukitusta ennen PT:n/omistajan pyyntöä. Lukitus = peili + SHA JU:lle ja PT:lle + muutosloki-PR (plumbing, kuten 5378) + Mac-app (macNNN.sh).

## OLAVINLINNA (Codex) – NS tarkistaa, PT kuittaa rakenteen, Lavastaja kokoaa
- 3a, 3b, palatsi: valmiit (Lavastajalla). **3c valmis**: muurikäytävä, harja, komero V2 #1174 (a889917af), pako-v2 (7a34cce22). **3d valmis**: tyrma-e101-v2.glb (f0154991f).
- **Hahmot kokki + portinvartija** (184e0fdc9, speech-review-v1; GLB:t T7:llä `…/output/olavinlinna-tripo-pilotti-10041005-20261026/speech-review-v1/hahmot/`):
  SHA ok, codex-3d-tarkistus 0, 6 muotoa (jawOpen, mouthClose, mouthFunnel, mouthPucker, eyeBlinkLeft/Right) kaikissa 3 primitiivissä.
  Kasvoarkit OK (Sonnet; O-suu litteä, havainto puhekokeeseen); tekninen vastaanotto postissa. AUKI: puhekoe Unityssä sovitulla
  6 säätimen ohjaimella keittiövalossa + Lavastajan vierekkäisvertailu MetaHumaniin → palaute Codexille (SHA + arvot + kuvapari).
- Aarteet J3/J4: Codex tekee seuraavaksi, sitten kujakivet 1191–1194 (PK:n tilaus).
- Tarkistuskaava ennallaan: `zsh natiiviseppa-skriptit/pura-posti.sh <repo> <posti/kansio> <scratch>` → `shasum -a 256 -c SHA256SUMS[-v2]` →
  `node tools/codex-3d-tarkistus.mjs <kansio>` (V2: vain SHA256SUMS-v2:n tiedostot omaan kansioon) → kuvat Sonnetille → kuittaus `posti.sh` → rivi PT:lle.

## TYÖTAPA (muutokset)
- Merge-testit: `EI_PEILIA=1 nice -n 15 zsh juna210/testit210-rinn.sh <wt>`; shader-muutoksissa sen jälkeen `cd <wt>; zsh tyokalut/metal-tarkistus.sh <ulos>`
  + `git checkout -- Assets/Settings/UniversalRenderPipelineGlobalSettings.asset; git clean -fdq`. Peili vasta vihreällä.
- Punainen testi tekijän koodissa → tekijä korjaa omaan haaraansa; runko rakennetaan uudelleen edellisestä vihreästä (reset, koska peiliä ei pushattu).
  Toistuvat Metal-sääntötestit: BooliFloatVertailuistaMetalille (if-rivillä &&/|| + (float)x.w) ja EiIntTernaariaMetalille (`? 4 : 1`).
- Riippuvuusparit (PT): VS:n mallia vaativat erät vain yhdessä LR:n osoittimen kanssa, ja osoitin vasta JU:n ämpärivahvistuksen jälkeen.
- zsh: `$C:refs/...` tulkitaan muuntimeksi → käytä `${C}:refs/...`.
- Levy ~24 Gi: -ehdokas on runko (ÄLÄ POISTA ennen 213:n lukitusta), -tyokalut ÄLÄ POISTA. Scratchpadin METAL-tulosteet (~100 Mt/kpl) siivotaan.
- Cronit (session omat): Unity-beeta "4 9 * * *", postilaatikkovahti "17,47 * * * *".
