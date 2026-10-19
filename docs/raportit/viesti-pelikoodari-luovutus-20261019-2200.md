# Pelikoodarin luovutus 19.10.2026 klo 22.00 (Postivahdin KOVA RAJA 43 %)

Edellinen: viesti-pelikoodari-luovutus-20261019-2050.md. Rooli: Pelikoodari (Opus, high). Proto-repo paikallinen (ei pushia).
Haara: pelikoodari/juoksupeli-207 (worktree /Users/Shared/Claude/wt/proto-pelikoodari-kerattavat-206) – nimestä huolimatta JUNAN 206 työtä
(omistaja 21.32 avasi 206:n, 21.38 "Viivytetään ennemmin junaa. Sanon sitten kun julkaistaan" → ei takarajaa, tehdään kunnolla).

## KÄYNNISSÄ NOLLAUSHETKELLÄ
- Ei omia ajoja eikä simuja. JU kääntää L2:lla 6b2209e39 → _tyo/julkaisija/runko-206-pk-app (e42cf90dc:n jälkeen), ilmoittaa
  KÄÄNNETTY + SIMU NYT. NS ajaa oman runkosimunsa (e03b192ba = cd7c1d5cb + sisäpiha e42cf90dc) → runko-206b-app PT:lle.

## ENSIN (JUNA 206): simu 6b2209e39:llä → kuvaparit PT + KK, äänitallenne Äänittäjälle → NS liittää 6b2209e39
1. JU:n SIMU NYT:sta (tarkista kaannos.txt): `zsh /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/simu-juoksu-206b/aja.zsh` taustalle
   (oletus-APP runko-206-pk-app), loki …/simu-juoksu-206b/lokit/aja-1.log; iPhone + iPad ~15 min/laite. Skenaario sk-juoksu-206b.txt.
2. Kuvat lokit/todistus-juoksu-206b-{iphone,ipad}-*/ täysikokoisina:
   - J1/Y1 pelinäyttö (vain ☰ + väripalkit), Y2 ☰-valikko (Lopeta), Y3 kiinni-kehote kaistaleella, Y4 loppukortti (aarteet+matka).
     ENNEN = todistus-runko-206-{iphone-20261019-2112,ipad-20261019-2118}/kuvat/T2.png (vanha paneeli).
   - U1–U5 kamera oviaukossa/ulkona (10,5 m / 8,5 m) + sisäpihan rekvisiitta; ENNEN = sama runko-206 U1–U4.
   - H1/H2 hiha (hahmot-v1 ↔ v2), P1–P4 ↔ Q1–Q4 puomi (irti 0 ↔ 1, sama käännös), R1/R2 siemen 1018 sivellin (puu) + sirkka-astia (posliini).
   - aani/juoksu-aanet-v2*.wav (42 s, siemen 1018) → Äänittäjälle (local_726ba209-ff08-43be-a35d-5a60f96f60e1): tasapaino,
     huudot päällimmäisinä. Oleta-rivit: silmukka askel-kivi/askel-puu/tuuli-1, efekti hyppy-/kaistanvaihto-/kyyhky-siivet-1/kolikko-1.
   - Kuvaparit _tyo/pelikoodari/raportit/pari.py:n mallilla (PIL; vaihda kansiot ja kuvat, vasen ENNEN / oikea JÄLKEEN) → _tyo/pelikoodari/raportit/kuvapari-206b-*.png.
3. SIMU VAPAA JU:lle → PT (local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31) + KK (local_8e4fcfed-fc40-464c-854a-1d031b005332) ≤ 3 riviä + polut.
4. PT:n OK:lla NS:lle (local_fcc10552-5810-49bf-b0cf-188456f1231c tai seuraaja): liitä 6b2209e39 (rekvisiitta e42cf90dc on jo NS:n
   e03b192ba:ssa; äänet uutta). merge-tree natiiviseppa/juna-206:een tarkista ennen pyyntöä.

## HAARAN pelikoodari/juoksupeli-207 SISÄLTÖ (620227d37 → 6b2209e39)
- 2fe4a4592 HUD: vain elinvoima + aarteet/matka (206:ssa 36615863b, myöhemmin korvattu 7ace29fea:lla).
- 8de23d083 UV1-tuki (GlbOsa.KuvaUv), e230a9ea9 PuomiIrti (hang_release roikkumisen loppuun + lento), eec5ed1d6 ämpäri hahmot-v2
  (puyi-perus = Codexin puyi-hiha-uv1 6db6bec4; hahmot-v1 ennallaan), cfabbb6a5 `ui juoksupeli irti 0|1`.
- 7ace29fea yläpalkki pois (omistaja 21.31): ☰ (OHJAUSNAPPI + LINSSIN VALIKKO, Lopeta, juoksu pysähtyy), väripalkit keskellä, kehotteet
  kaistaleelle, `ui juoksupeli valikko|kehitys 1`. → 206:ssa (NS 49cabfeb2).
- da42ac7da kamera (omistaja 21.34): DroneNosto.UlkoEtaisyys/UlkoKorkeus 10,5 / 8,5, Eteen() 6 + 0,8·v ulkona; DroneNostoTestit 0 osumaa.
  → NS cd7c1d5cb (PT OK).
- e42cf90dc sisäpihan rekvisiitta (omistaja 21.38): ämpäri maailma-v4/avoimet-v2/rekvisiitta.glb (4a03b204…), JuoksuV4Maailma.Lisaosat;
  työkalut _tyo/pelikoodari/sisapiha-rekvisiitta/{tee_rekvisiitta.py,pohjakuva.py,pohjakuva.png}. Muutos = uusi nimi (rekvisiitta-2), ei ylikirjoitusta.
  → NS e03b192ba.
- 6b2209e39 äänet v2 (omistaja 21.40, PT 21.5x): JuoksuAanet (AaniHetki, Hetki, Askeleet pinnan mukaan, Lepatus, TaustaSoi, Taso,
  Vaimennus 0,45 huudon ajan) + JuoksupeliNakyma (huohotus-, lepatus-, tuuli-, sirkat-lähteet AaniPohjan kautta). 39 osoitetta 200.
- Testit kärjessä: Peli 646/646, Linssit 2112/2112, tarkista.sh 0.

## PÄÄTÖKSET TÄLLÄ VUOROLLA
- R3-puute: tason 1 reitillä vain 2 väistöestettä → 3. törmäys oli skenaariovirhe; posliini todistetaan siemenellä 1018.
- Codexin sisapiha.fbx = sama kuin pelin sisäpiha → ei tuotu; PT: rekvisiitta olemassa olevilla malleilla (tehty).
- Tasolla 1 näkyy perusmalli (viitaton) → hiha-uv1 näkyy suoraan; viittamallin hihakorjaus Codexille (PT lähetti postin).

## 207 (vasta 206:n jälkeen)
- Codexin viittakainalon osakorjaus T7 output/juoksupeli-puyi-viittakorjaus-20261019/puyi-viitta-kainalo-osakorjaus-v1.zip
  (13 vertexin painot; riski Hips-juuren ero ~0,28 m hang_loopissa → retarget, maa- ja tankokontaktit). Posti 76c52e9e1.
- Hiha-uv1:n loput (kainalopatch-ehdokas c7d85b1a vasta lähikuvavertailun jälkeen).

## MUUT AVOIMET (ennallaan)
- Rakettivideo Mac-tallenteena yöllä (_tyo/pelikoodari/mac-rakettivideo/aja.zsh); raketti-auto 8eb6e1945 käännetty c8494c7db
  (_tyo/julkaisija/raketti-auto-204-app), simu 206-lukituksen jälkeen; lähteet-nimet 2c9c676a2 merge-pyyntö puuttuu; Mac WASD 4814ab2d1.

## LISÄYS 22.0x (JU): 6b2209e39 on NS:n 206-rungossa 728abcacf (PT OK) → oma käännös runko-206-pk-app PERUTTU
NS ajaa yhden runkosimun kaikille kohdille (runko-206b-app) ja lähettää kuvaparit; NS:lle annettu skenaario
`simu-juoksu-206b/aja.zsh <runko-206b-app>` ja ENNEN-kuvien polut, äänitallenne Äänittäjälle. Seuraaja: ENSIN tarkista NS:n
simun tulos (todistus-juoksu-206b-*) täysikokoisena ja korjaa PUUTE-rivit; oma ajo vain pyytämällä JU:lta. Sitten 207.
