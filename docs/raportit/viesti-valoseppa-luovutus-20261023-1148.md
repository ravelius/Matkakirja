# Valoseppä: luovutus 23.10.2026 klo 11.48 (kova raja 37 %, Postivahti)

Tili vvi＠vvi.fi (23.10. alkaen). PT: local_5df52e10-10e4-4b72-9554-0049db300dfe. Päiväkirja `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md`.
Muistio junan 210 korjauksista: `side-session-notes/local_5df52e10…/valoseppa-juna210-20261023.md`.

## Jono (PT 23.10.)

1. **Junan 210 korjaukset – LUOVUTETTU NS:lle.** Haara `linssiseppa2/juoksu-210` (proto, e51c33e0f:n päällä), kärki 9b06795e2,
   worktree `/Users/Shared/Claude/wt/proto-linssiseppa2-tulivuoret`. Peli 716/716, unity-tarkistus 0. NS ottaa runkoon (yhdistää
   KameraKirjoittajan ristiriidan omaan ruutusyy-210:ään) → LT mittaa.
   - b56b79380 profiilin sivuhyppy: U-muotoinen `avoin 791-aukion-reunasiipi aukio-galleria-aukio` -reitti siirsi Puyita 67 m
     ruudussa (s 613, osa 59) → käännösnykäykset 9/9 + kamerahypyt 2/2. Bottitesti oikealla palatsilla 383 → 0 hyppyä.
   - 51f99685f kartan saapumislento: KaupunkiPalloKuva ReadPixels → AsyncGPUReadback, oppaan latauskuva levossa, pitkän ruudun
     riville "; lokissa: …".
   - 8a38c9e3f häivytetty katto palaa vasta, kun ei peitä keisaria (sisätilan ovijaksot).
   - 9b06795e2 PIILOSSA-riville keisarin oma katto.
   - AVOIN: ulkotilojen piilojaksot (este 9 m 36–40 ja 108–111 ruutua, kaide 25, Taihemenin keskijänne 218 ruutua, kamera 30 m:iin)
     → LT:n seuraavan kierroksen uusista lokiriveistä. Palatsidata testeille: `_tyo/linssiseppa2/juoksu-210/data`.
2. **Rakettivideo (omistaja 11.43 PT:n kautta: päivälläkin, kun omistaja ei käytä Macia; kokeilu 10 s + 3 s) – KESKEN.**
   Haara `linssiseppa2/rakettivideo-210` 374620957 (raketti-video-204 BUILD 209:n päälle; tauko + videokello yhdessä,
   Andøyan lokit videokelloon), worktree `/Users/Shared/Claude/wt/proto-linssiseppa2-rakettivideo`, unity-tarkistus 0.
   - JU kääntää Mac L2:lla NS:n laitekäännöksen jälkeen → `/Users/Shared/Claude/proto-3d/_tyo/julkaisija/rakettivideo-mac-app/Matkakirja.app`
     (loki julkaisija-tyokalut/vs-rakettivideo-mac-kaanna.log; JU ilmoittaa LUKKO VAPAA).
   - Ajo VASTA kun NS ilmoittaa "210 laitteella" JA LT ilmoittaa mittausketjun valmiiksi (~12.40):
     `zsh /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/rakettivideo/aja-mac.zsh 374620957 pysty` (valas 3 s + laukaisu 10 s,
     1179×2556, 60 fps × 8 alikuvaa; HEVC-koonti + 4 ruutua kansioon `rakettivideo/ajo-*`). Ajamatta: tarkista ensimmäisellä ajolla
     komentojen lokirivit (videolaatu päällä, lataus valmis, valas hyppy nyt, videotallennin: aloitus) ja että Camera.main on
     raketin kamera. Näyte PT:lle (KK näyttää omistajalle).
3. **A taide.md – PR [ravelius/Matkakirja#5186](https://github.com/ravelius/Matkakirja/pull/5186)** (worktree
   `/Users/Shared/Claude/wt/valoseppa-suunta-taide`), mergeable. PT lisää Raamatun karttariville 13.5x. Valon taulukko luonnos
   (omistajan kortit).

## Muut avoimet (21.10. luovutuksesta)

- k2-haara (`linssiseppa2/kierros2-paiva` 6a95e2973) runkoon LT:n värinämittauksen jälkeen; Rijks-päivänvalo-210 NS:llä.
- Hutong-tripo simupari, tulivuorten kansi, hurrikaani: seuraavat kierrokset.
