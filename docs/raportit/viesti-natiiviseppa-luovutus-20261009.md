# Natiiviseppä: luovutus 9.10.2026 13.5x (nollaus PT:n pyynnöstä, konteksti täynnä)

Rooli: Natiiviseppä (Opus, high). Junat, BUILD-merget proto masteriin, simukäännökset vain Julkaisijan NYT:llä, Mac TF -odottaja,
juna/b13. Vanhempi historia: `docs/raportit/viesti-natiiviseppa-luovutus-20261007-tauko.md` (TILA-osiot, uusin ylimpänä).

## TILA 9.10. 19.2x — runko 24ae74fea, Unity 6.7 raportti

- + NUI 3e53e0f82 (linnan latauskuva) + 7b8fe62ce (Kysy vaaka 45 %). Linssit 1248, Peli 442, Kartta 453, unity 0, tarkista 0.
  ODOTTAA PT:tä: NUI yo-otsikko ebcb70046.
- Unity 6.7: docs/raportit/unity67-tuonti-20261009.md. Simulaattorikäännös 6000.7.0b4:llä onnistui 7 rivin korjauksilla (proto
  natiiviseppa/unity-67 931920957, T7). Suositus: ei vaihdeta ennen LTS:ää ja Cesiumin 6.7-tukea.

## TILA 9.10. 19.0x — runko 69756d35a

- + LS1 64f94e591 (Vasa, korvaa c3dee6f41:n) + Siirtoseppä historia ae435c1b7 (⊇ 4792cf9e4; 1c51f8aeb katse kasvoilla + v46j
  52825516ed687fd3, manifest 200). Kuittauksen ae435c1b7:lle ilmoitti Siirtoseppä, ja commitissa lukee "PT kuittasi". PT:n oma
  rivi puuttuu, joten jos kuittausta ei ole, palautetaan runkoon 887b42e92.
- Testit: Linssit 1248, Peli 442, Kartta 453, unity 0, tarkista 0, .metat ok.
- ODOTTAA PT:tä: NUI yo-otsikko ebcb70046 (1 USS-rivi). Siirtosepältä mahdollisesti voudin 3/4-otoksen kamerakorjaus.
- Data: uusin-3 → v6h ~19.05 (Julkaisija; omistaja hyväksyi KL + Riddarholmen).

## TILA 9.10. 18.5x — runko e0fc13d4a

- + LS2 vesi-v5 f7d6156d2 (index-v5 200) ja varjot-173 9acc8d4a7 (oletus pois; PT: oletus päälle vasta iPad Pro 13 -mittauksen
  jälkeen, raja +1,5 ms). Linssit 1247, Peli 442, Kartta 453, unity 0, tarkista 0, .metat ok.
- VIESTIT: Desktopin istuntoviestit ovat tauolla 10 viestin rajan takia (myös mcp__ccd_session_mgmt__send_message kulkee saman
  tauon läpi). Taukoa ei kierretä. Tila kirjataan tänne, kunnes omistaja kirjoittaa Natiivisepän sessioon.

## TILA 9.10. 18.3x — runko 779bd8e6b

- + NUI kielierä 6 7d1bf4a63 (PT kuittasi; viimeinen UI-erä). Yhdistelmävika: Pelikoodarin ValmisluennatManifestiTestit haki
  `ElevenAanet = new[]`, ja NUI muutti sen muotoon `=> new[]`. Korjaus 779bd8e6b (regex `=>?`). Linssit 1246, Peli 442, Kartta 453, unity 0, tarkista 0.
- Omien mallien varjojen kustannusarvio PT:lle: docs/raportit/varjot-kustannus-natiiviseppa-20261009.md (d0b937eec). Atlas ei kerrannu
  kaskadeilla: Ultra 32 Mt, PC 8 Mt. Mobile pois, oletus pois junaan.

## TILA 9.10. 18.0x — JUNA 173 AUKI (omistaja 17.4x: kerätään kunnes omistaja sanoo julkaisun hetken)

- **Runko** `natiiviseppa/juna-173` **806283a20**. Testit Linssit 1246, Peli 442, Kartta 453, unity 0, tarkista 0. Simukäännös 30dadb2e0 17.27 OK.
  16.2x:n jälkeen: Siirtoseppä historia 4792cf9e4 (v46i, manifest 200); NUI f0f2e436f (⊇ 773d7e09e), d2e46ee50, 174cd9b73, fa777a580;
  Pelikoodari 970355d5d; LS1 c3dee6f41 (⊇ eb983f45a, a4331c7d2). PT ohitti NUI d00e429f8 (tähtien iso v3 pysyy).
- BUILD 173 -mergeä masteriin EI tehty (lukitus peruttu). Muutosloki kirjoitetaan uudelleen juuri ennen julkaisua (PT tarkistaa).
  Edellinen PT:n kuittaama luonnos: "Pariisi alkaa nykyajan introlla, ja Pariisissa ja Tukholmassa kuuluvat kirkonkellot, suihkulähteet,
  kahvilat ja satamavesi. Olavinlinnan historiassa kivilinna rakentuu vuosi vuodelta, ja linnassa on uudet äänet. Varustekuvat ovat
  valokuvamaisia, ja ISS-kyydissä näkyy talvi." (lisättävä: kielisiirto ei näy pelaajalle).
- Kuittaukset (lisäysversio): vesi index-v5 (ehdot LS2:lle; 3fefc21d3 odottaa testiä + PT), LS2 omat mallit v6g (+2,4 Mt GPU; vienti
  omistajan hyväksynnällä), Karttaseppä kaukomaa/yo-v1 (RGBA8 → yöllä +30–60 Mt; peite vain yötilassa, LS2 mittaa).
- Osoittimet: uusin-3.json → v6e (Julkaisija), uusin-2 v6b.
- VIESTIT: Clauden istuntoviestit pysähtyivät 18.0x 10 viestin rajaan, ja tauko jatkuu omistajan seuraavaan viestiin tässä sessiossa.
  PT lukee tilan täältä.

## TILA 9.10. 16.2x

- **Juna 173 runko** `natiiviseppa/juna-173` 26ab381a2 (lähtee 10.10., PT: päivän TF-raja täynnä). Lisäksi 14.1x:n jälkeen: NUI c3270b673,
  38ec50e9f, f6af5f0a8, a2ae61457, 064b5a7f7, b08c47595 (⊇ foto-v3 9de8361f9; nyt-rivi myös poimintana 0138b057d); Pelikoodari intro
  2ae1b0e1a (⊇ 35393b309 ⊇ cc22e018f ⊇ 20e55df36); LS1 2b9ba3189, bf0017f1b (nykyintro), eb983f45a (⊇ f5088ce94 ⊇ 5fe96a74d ⊇ 034505648);
  LS2 a72f1ee21 (osoitin uusin-3.json, 200); Siirtoseppä Sonniss v4 848021bae (puhdas cherry-pick; 4f831e6e3 toi kuittaamattoman historian →
  palautettu ennen pushia). Linssit 1243, Peli 438, Kartta 453, unity 0, tarkista 0. Simukäännös 7aadc9501 14.27 OK: Steam Audio pois
  simulaattorista (6 liitännäistä, ei ipl-symboleja). Linssit-ajo antoi kerran 1210/1211 (satunnainen, uusinta läpi).
- ODOTTAA: Siirtosepän historia (ff65c5d0f / juna173-historia) vasta arvio 7:n jälkeen (illalla). EI kivilinnaa 7fbca9c90 ilman kuittausta.
- **Juna 174 jono:** NUI kieli-pallo-174-2 773d7e09e (korvaa PT:n kuittaaman fbb5b29cb:n; vahvista PT:ltä).
- Unity 6.7: Library-tuonti illalla, kun ei käännöksiä/simuja (swap + vapaa > 20 Gt). Raporttiin PT:n pyyntö: suositus odotetaanko
  Cesiumin 6.7-tukea.

## TILA 9.10. 14.1x (seuraaja)

- Mac TF 171 OK (37902594763). TF 172 iOS 37919863047 OK; Mac TF 172 -odottaja käynnisti 37921284135 klo 14.02 (loki `lokit/natiiviseppa-mac-tf-172.log`).
- **Juna 173 runko** `natiiviseppa/juna-173` d64905fa2 (worktree `/Users/Shared/Claude/wt/proto-natiiviseppa-j173`): 1c2ecbe32 + Steam Audio
  palautettu (revertien revertit b2073d7ad, efd57e008) + NUI 80625b5c2 + simukorjaus 8f6725cca (MATKAKIRJA_EI_STEAMAUDIO, asmdef-rajaus,
  SteamAudioKoe-tynkä, Binaries/iOS pois simulaattorista, unity-tarkistus ios-sim) + Siirtoseppä 77c46e2d6 + NUI 8e7b0a8bb + Pelikoodari
  90edb9c44 + LS1 79dd01c90, 6c3e385b6 + LS2 86bd795f1 (⊇ 2f641e53c), b64cb3b75. Linssit 1211, Peli 431, Kartta 453, unity 0, tarkista 0.
  Simukäännös (linkityksen todennus) odottaa Julkaisijan NYT:tä. Siirtosepän kivilinna 7fbca9c90 vasta arvio 4:n jälkeen.
- **Unity 6.7:** 6000.7.0b4 + iOS + Mac IL2CPP asennettu T7:lle `/Volumes/T7 4TB/koodaus/Unity/` (PT: ei päälevylle; Hubin asennuspolku
  palautettu). Selvityskopio `natiiviseppa/unity-67` T7:llä `/Volumes/T7 4TB/koodaus/proto-natiiviseppa-unity67` (symlinkki wt:hen).
  Library-tuonti odottaa muistia (> 20 Gt vapaata + swap). Juna- ja käännöspalvelukopiot pysyvät 6000.3.24f1:ssä.
  Verkkoselvitys: 6.7 LTS Q4/2026; URP 17.6–17.7: Surface Cache GI (diffuusi, Metal compute), SSR (oma HLSL kutsuu
  SampleScreenSpaceReflection), fast build -shaderit; 6.4 poisti Compatibility Moden (meillä RenderGraph jo), iOS UnityRuntime.framework
  -polku muuttui 6.4:ssä, 6.5 InstanceID → EntityId (meillä 6 kutsua), 6.6 dynaaminen batchaus pois (meillä jo pois). Cesium 1.26.0
  (1.10.) virallisesti vain 6.5:een asti; Steam Audio 4.8.1 yhä uusin, ei simulaattorikirjastoja.

## Heti tehtävä (seuraaja)

1. **TF 172:** Julkaisija lähettää iOS-ajon id:n ja alkuajan. Käynnistä Mac TF -odottaja ajo-id:llä (4. argumentti, ks. alla):
   `perl -e 'use POSIX; exit if fork; setsid; open STDOUT, ">>", "/Users/Shared/Claude/proto-3d/lokit/natiiviseppa-mac-tf-172.log"; open STDERR, ">&STDOUT"; exec "zsh", "/Users/Shared/Claude/proto-3d/lokit/natiiviseppa-skriptit/mac-tf-odottaja.sh", "1c2ecbe3", "172", "<ISO-alku>", "<ajo-id>"'`
   (juna/b13 on jo siirretty 936c84e6:een 13.45, juna.log kirjattu.)
2. **Mac TF 171** -odottaja ajo-id:llä 37899933691 käynnistettiin 10.41 (loki `lokit/natiiviseppa-mac-tf-171.log`, vahti `lokit/natiiviseppa-mac-tf-vahti.txt`). Tarkista, että Mac 171 meni läpi.

## Junat

| Juna | Master | Runko | Käännös | Tila |
|---|---|---|---|---|
| 169 | 5b91b1a2c | e9802f2d1 | 2ee9aea8e | TF tehty |
| 170 | 4a140064e | d213127c1 | b508936fb | iOS TF tehty; Mac TF 170 jäi (vanha odottaja luki perutun yöajon), Julkaisija: 171 riittää |
| 171 | d338b8c8f | e13868971 | 024035e6f | omistajan pyynnöstä heti: kaatumiskorjaus pallon tauolla; TF 37899933691 |
| **172** | **1c2ecbe32ebef7a85b937ad240765e72be3242e7** | **936c84e66** | **105df6483** (13.45, 0 virhettä, CFBundleDisplayName "Matkakirja" todennettu) | **lukittu 13.45, TF Julkaisijalla** |

Junan 172 muutosloki (PT, 268 merkkiä / 274 tavua): "Olavinlinna: historia elokuvana, uusia esineitä, aukeavat ovet ja äänet. Pallo:
sadekuurot, märät kadut, salamat, iltaikkunat, Pariisin jokilaivat ja saapumismusiikki, tarkemmat Notre-Dame ja Kuninkaanlinna. Uudet
varustekuvat, iPhone pystyssä. Nimi on nyt Matkakirja." Osoitin v6b julkaisussa (PT); ND/KL v9 vasta omistajan kuvahyväksynnän jälkeen.

Junan 172 sisältö (omistaja: junat 172–175 yhtenä): Siirtoseppä 553edcdc4, NUI e7c7474d2 + cd4553c8d, LS1 11408f46f + 219ce1cd3,
LS2 51799391e + 657676845 + 2996980aa, Pelikoodari ade5ad9f3 + 049e4ce21 + cf0a1547d, omat 86a016ed5 (näyttönimi "Matkakirja": iOS
PostProcessBuild 190, Mac `MacNayttonimi` plutil `Rakennus.MacOS`:ssa; productName "Matkakirja 3D" ja bundle-tunnus ennallaan),
9781342ed (STP-skaalain, kaupunki.Ajallinen yhä 0), a1b13e5ee (ENABLE_BITCODE NO). **Steam Audio poistettu** (revertit a090dbc25, fb79756d9).

## Junan 173 jono (kokoa BUILD 172:n päälle uuteen worktreehen)

- **Steam Audio** LS1 4869a5dc9 + a13a6bac8 (kytkin oletuksena pois). ESTE: iOS-kirjastot (phonon, audioplugin_phonon, mysofa, pffft) ovat
  vain laitteen arm64:ää → simulaattorikäännös kaatuu linkitykseen ("building for iOS-simulator, but linking … built for iOS").
  Suunniteltu korjaus: `Rakennus.IosSimulaattori` asettaa määritteen MATKAKIRJA_EI_STEAMAUDIO ja poistaa
  `Assets/Plugins/SteamAudio/Binaries/iOS/*` iOS-yhteensopivuudesta (PluginImporter, palautus finallyssä — huom. `Kaanna` kutsuu
  EditorApplication.Exit(1) virheessä, joten palautus ei aina aja; käännöskopio resetoidaan gitillä joka kerta), SteamAudioUnity- ja
  Editor-asmdefeihin `defineConstraints: ["!MATKAKIRJA_EI_STEAMAUDIO"]`, SteamAudioKoe.cs:lle `#else`-tynkä samalla API:lla (Rekisteroi,
  Paivita, Komento, Tila, Asetus, Paalla, Pakko, AsetusAvain). SteamAudioPoisTestit lukee lähdetekstiä: Liita/Kaynnista vain
  SteamAudioKoe.cs:ssä. PT: todennetaan uudelleen Unity 6.7:llä. Mac: proto3d-mac-testflight allekirjoittaa .bundlet jo.
- Pelikoodari valmisluentojen varareitti 90edb9c44 (masterin d338b8c8f päällä; Puhe.cs, Valmisluennat.cs).
- NUI Pulu: pulu-valmiit 80625b5c2 (⊇ e7c7474d2), odottaa PT:n kuittausta.
- LS2: OmaMallin normaalikartat (tulossa). Codexin loput fotot (NUI). Saari v2c / v46e (Siirtoseppä/LR) jos ei ehtinyt 172:een.

## Unity 6.7 (omistaja 13.3x)

Junan 172 JÄLKEEN erillinen haara: Cesium 1.25.1 tai 6.7-yhteensopiva, Steam Audio, OmaMalli- ja DioraamaValaistu-varjostimet, URP-asetukset,
iOS- ja Mac-käännös, testit → raportti PT:lle (mitä rikkoutuu ja mitä korjataan; URP reaaliaikainen GI, SSR, Fast Build Profile) →
päähaaraan vasta LTS:n (loka–joulu) ja raportin jälkeen.

## Työkalut ja polut

- Worktreet: vain `/Users/Shared/Claude/wt/proto-natiiviseppa-j172` (proto-repon `git worktree`; `tools/uusi-worktree.sh --poista` koskee vain
  Matkakirja-fablea). Luo 173: `git -C /Users/Shared/Claude/proto-3d/Matkakirja-proto worktree add -b natiiviseppa/juna-173 /Users/Shared/Claude/wt/proto-natiiviseppa-j173 1c2ecbe32`.
- Testit rungossa: `./Kartta-testit/kaanna.sh`, `./Peli-testit/kaanna.sh`, `./Linssit-testit/kaanna.sh`, `./Linssit-testit/unity-tarkistus.sh`,
  `./Peli-testit/unity-tarkistus.sh`, `./tyokalut/tarkista.sh`; .meta-tarkistus uusille Assets-tiedostoille (.bundle-sisällöt eivät tarvitse).
- Käännös (vain NYT:llä): `PROTO_APP_KOPIO=/Users/Shared/Claude/proto-3d/lokit/natiiviseppa-app-<juna>-<runko> zsh /Users/Shared/Claude/proto-3d/tyokalut/proto-kaanna.sh <runko>`
  (loki `lokit/kaannospalvelu/<aika>-<runko>.log`; "ld:" grep osuu myös "xcodebuild"-riviin → tarkista rivit).
- BUILD-merge: proto masterissa `git merge --no-ff <runko> -F <viesti>`; tarkista `git diff --quiet HEAD <runko>`.
- Mac TF -odottaja `lokit/natiiviseppa-skriptit/mac-tf-odottaja.sh <sha8> <build> <ISO-alku> [ajo-id]` (korjattu 9.10.: ajo-id tai
  `--event workflow_dispatch`; varmuuskopio `.ennen-ajoid`).
- Hätätoisto (taukokaatuminen): scratchpadin `hata-ajo.sh <app-kansio> <tunniste>` kirjoittaa `Documents/kaupunki-vapaa-muisti.txt` = 0.5
  30 s tauon jälkeen (VapaaMuisti lukee sen 2 s välein) → MUISTIHÄTÄ; skenaario `proto-3d/tyokalut/natiiviseppa-ajot/sk-hata-tukholma.txt`.
  Todennus 171:llä: näkymä pysyy (LS2 9e15ec414: karkea laattavalinta, ei SSE-vaihtoa, koska Cesiumin SSE/välimuistiasettimet kutsuvat
  RecreateTileset():iä, Cesium3DTileset.cs:255/366).
- Skenaariot `proto-3d/tyokalut/natiiviseppa-ajot/`: sk-yo170-*, sk-yopaiva170-tukholma, sk-filmi170-*, filmi-arkki.py (vaaka-arkki raakakuvista).
