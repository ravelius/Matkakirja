# Valoseppä: luovutus 25.10.2026 klo 05.10 (kova raja 38 %, Postivahti)

Tili vvi＠vvi.fi. PT: local_5df52e10-10e4-4b72-9554-0049db300dfe, NS: local_8254cd90-9a85-4d61-8a06-085e7562f05f,
PK: local_4b3286ad-3ff4-4ca0-9d8f-feab0680bef6. Päiväkirja `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md`
(rivit 25.10. 05.07). Lue tämä kokonaan ennen jatkoa.

## 1. METAL (PT:n KIIRE): VALMIS, NS:llä junassa 210

- Haara `linssiseppa2/grafiikka-211` (wt `/Users/Shared/Claude/wt/proto-linssiseppa2-grafiikka`), Metal-osa 00d7bc984 → **2923706a4**.
  NS yhdisti runkoon **029bb8aa1** (+ PK c18a8a0b5) ja ajaa testit + laitekäännöksen; asentaa isoon iPadiin ~05.20 (PAKOTA=1).
  PT kirjasi Raamattu 9.1 (PR #5219): Metal-varianttitarkistus ennen vihreää runkoa.
- Kaksi vikaa, molemmat korjattu:
  1. HLSLcc `as_type<half>(int)` (Lattia, leivottu variantti): juuri **kaikki half → float** juoksupelin 7 varjostimessa + 3 hlsl:ssä
     (c07f197e9; testi `EiHalfJuoksupelissa`; 10 värivakiota sai `valopoikkeus:`-merkinnän, koska h-pääte piilotti ne valovahdilta).
  2. **Applen GPU-kääntäjän kaatuminen** `XPC_ERROR_CONNECTION_INTERRUPTED` Lattian `_MAIN_LIGHT_SHADOWS_CASCADE` + clip -varianteissa
     (HAIVYTYS/JOKI/SEINA). Vanha vika (näkyi lokeissa ~02.59 alkaen). Syy MSL-puolituksella: liikaa ruutuderivaattoja haaroissa
     clipin jälkeen. Korjaus: sijainnin derivaatat kerran fragin alussa (`juoksuDwx/Dwy`, 2923706a4), 942b-kohokuvio kahdesta
     lisänäytteestä (f5ed9abd1), varjonäytteet yhdeksi silmukaksi (a953acee7, 119 → 7 näytekutsua, tulos ennallaan).
- Varmistus: paikallisesti 440 MSL-ohjelmaa 0 virhettä + 432/432 GPU-pipelineä; simulla A9 ce597be9e (= 868455f0a + samat) ja
  B5 68bc567b0 (pari 10c): as_type 0, pipeline 0, `valo lammita` kaikki 7.
- **Työkalu `tyokalut/metal-tarkistus.sh`** (+ metal_pilko.py, metal_parit.py, metal_pipeline.swift, editori MetalTarkistus.cs):
  projektissa `zsh tyokalut/metal-tarkistus.sh [ulos]` → kaikki variantit Metaliksi, xcrun metal -c, render-pipeline Macin GPU:lla
  (sama kääntäjä kuin simu). Paluu 0/1/2, 35–90 s. Oma kääre linjalle 2 (lukko + checkout): `zsh /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/metal-tarkistus.zsh <sha>`.
  QA `ui juoksupeli valo lammita` kääntää simulla/laitteella kaikki 7 varjostinta (ShaderWarmup).

## 2. AVOIN: RUUTUAIKA half → float ISOLLA iPADILLA (PT 05.0x, ehto: yli 20 ms:n ruutu = vika)

- Odottaa NS:n asennusta (~05.20, runko 029bb8aa1). Kysyin NS:ltä LT:n mittaustavan polun (23.10. "J 17,13 ms sisäpihalla"),
  jotta luku on vertailukelpoinen; vastaus tulee NS:ltä. Mittaa sisäpiha + kujat; ilmoita PT:lle J p50/p95 ja yli 20 ms -ruudut.
- Jos punainen: ensimmäinen epäilty on Lattian float-rekisteripaine (half → float) – kevennys vain Lattiaan (esim. half takaisin
  vain värilaskuun ilman booleja/vertailuja), varmistus aina `metal-tarkistus.sh`:lla ennen simua.

## 3. AVOIN: VALO (B5 pari 10c, PT: sitten B5:n valo)

- Mittaus B5 (omistaja23-68bc567b0, alueet-810.py): lattia aurinko 02 **241**, 03 kauko **248 puhki** (havainne 203/214); varjo 03 lähi
  126, 05 lattia 134 (havainne 194/204); 05 varjoseinä 73 (137). 01 186/9 % varjoa (206/31 %). Täyttö 0,35 (t35) ei muuttanut mitään.
  → kontrasti liian suuri: aurinko alas, ympäristö ylös.
- **Viritysajo käynnissä**: ketju `kierros2/ketju-omistaja28.zsh` (B6 **f288dd40d** = pari 10c + Metal + QA `valo aurinkovoima x`,
  grafiikka-211 kärki), skenaario `sk-omistaja16.txt` (tee-sk16.py): va 1,55/1,45/ev 0,45 (nyk.), vb 1,25/2,0, vc 1,1/2,4,
  vd 1,25/2,4/ev 0,30 (aurinkovoima / k17 ambientK / ev). Parit `kierros2/omistaja24-f288dd40d/raaka-v?-*.png`.
  Loki `kierros2/ketju-omistaja28.log`. Jos ajoa ei ole (nollaus), aja ketju uudelleen.
- Seuraavaksi: mittaa `alueet-810.py` (03: lahi=0.2,0.6,0.8,0.95, kauko=0.25,0.3,0.75,0.45:0.25,0.2,0.75,0.35; 05: lattia=0.3,0.7,0.7,0.95,
  seina=0.02,0.3,0.15,0.6; 01/02 kuten aja-omistaja22:n lattiat-rivit) → paras yhdistelmä ValoKohteet.cs:ään (JuoksuK20AurinkoVoima,
  JuoksuK17AmbientK, JuoksuK17Ev) → simupari → **kuittaa PK:lle 03A/B-uusinta** ja 3 riviä PT:lle (PT 25.10. ohje).
- Huom: aiemmat parit ennen 2923706a4:ää näyttivät kaskadivarianttien kohdalla eri valoa (ne kaatuivat) → vertaa vain B5:n jälkeisiin.

## 4. JONOSSA

1. Rakettivideo (haara linssiseppa2/rakettivideo-210 fc40d1ae7): kohta 1, horisonttiraita 40–41 s (pallo kaukolaatan reunan takana
   kirkkaampi) auki; sitten lyhyt pysty äänellä → itsetarkistus → PT. valovahti/liikevahti-ylitykset (RakettiMalli/Video/Savu) ennen junaa.
2. levyvahti.zsh pyörii (alle 60 Gi → omat jonot seis); käynnistä uudelleen, jos sammunut.

## Opit

- xcrun metal -c ei tavoita GPU-vaihetta: simun "XPC_ERROR_CONNECTION_INTERRUPTED" toistuu Macilla vain oikealla render-pipelinellä
  (metal_pipeline.swift, ~0,4–0,8 s/variantti). MSL-puolitus (#define dfdx(x) ((x)*0.0) jne.) löytää syyn minuuteissa.
- `(float)`-muunnos half-arvosta taittuu FXC:ssä takaisin min16-vertailuksi; kohta kohdalta korjaus ei riitä → koko varjostinjoukko floatiksi.
- Simuajo kattaa vain käytetyt variantit; `valo lammita` (ShaderWarmup) + paikallinen tarkistus kattavat kaikki.
