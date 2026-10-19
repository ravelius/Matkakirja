# Pelikoodarin luovutus 19.10.2026 klo 12.40 (Postivahdin KOVA RAJA 39 %)

Edellinen: viesti-pelikoodari-luovutus-20261019-1110.md. Rooli: Pelikoodari (Opus, high), id osoitekirjassa. Proto-repo
/Users/Shared/Claude/proto-3d/Matkakirja-proto (paikallinen, ei pushia). EI käynnissä olevia käännöksiä, simuja eikä pitkiä ajoja
(oma simu pelikoodari-iPad13 kiinni, Mac-app kiinni). JU:lle viimeksi SIMU VAPAA 12.36.

## ENSIN (järjestys)
1. **Huudot erä 2 (omistaja 12.23 "Pitää testata pelissä ensin nämä")**, haara pelikoodari/juoksupeli-huudot-204
   (wt/proto-pelikoodari-juoksupeli-huudot-204), kärki 1e141a9c5:
   a. **O1/O2 uudelleen KK:n sidonnalla** (korvaa 1e141a9c5:n oletuksen kanakuppi-ming/kello, PT 12.3x): poista
      `kanakuppi-ming.versio.2.huuto` ja `kello.versio.2.huuto`; lisää O1 "Auts! Siinä meni miljoonien Ming!" =
      `sinivalkoinen-maljakko-ming.versio.2` (kupla: Ming-maljakko korokkeella valoisassa salissa, tyyppi 2), O2 "Noin! Tämä oli
      herttuan lahja isälle!" = linnunhäkki (#44, tarkista id tekstit.fi.json:sta) `.versio.2` (kupla: eurooppalainen herttua ojentaa
      Puyin isälle kullatun häkin, jossa mekaaninen laululintu, tyyppi 4). Parseri lukee vain .kupla/.huuto.
   b. **17 ottoa**: /Users/Shared/Claude/proto-3d/_tyo/puyi-koeaanet-20261019/ulos-era2-kavya/01–17 (Kavya). EIVÄT ole ämpärissä
      (puyi-huudot-v2 = 404). Pyydä Äänittäjää viemään ne ämpäriin (esim. juoksupeli/puyi-huudot-v2/) tai kysy PT:ltä vienti;
      sitten lisää PuyiHuudot.Kaikki-tauluun (Assets/Matkakirja/Peli/Juoksupeli/PuyiHuudot.cs) 17 riviä (polku, teksti ilman tageja,
      kesto ffprobella). Järjestys = generointilistan jarjestys 1–17 (main docs/raportit/juoksupeli-huudot-generointilista-20261019.json):
      kello, kirjoittava-kellopeli, ruyi-valtikka, sivellin, bianqing-kivikellot, O1, O2, kanakuppi-ming, sinivalkoinen-maljakko-ming,
      lohikaarmekulho-ming, kaaretaulu v1, kaaretaulu v2, famille-rose-maljakko, doucai-kuppi, gaiwan-kansikuppi, yixing-teekannu,
      dayazhai-posliini. Kartta toimii tekstistä (Avain()), joten versio-huudot löytävät äänensä itsestään; laajenna
      PuyiHuudotTestit.KaikkiKahdeksantoistaKaytossa (35) ja Juuri per huuto (v1/v2 eri kansiot → taulun polku täydeksi tai oma juuri).
   c. **LEVEÄ HÄIVYTYS (omistaja 12.32)**: muistokuplan soikion häivytys alkaa 0,45 säteestä (keskeltä, reuna 1,0), smoothstep reunaan;
      kuviin ei häivytystä. Malli /Users/Shared/Claude/Matkakirja-fable/scratchpad/paatoimittaja/muistokuplat-v4-20261019/leveampi-haivytys-arkki.png
      (rivit 2–3). Koodi: MuistokuplaSoikio (Peli/Juoksupeli/MuistokuplaAjoitus.cs-naapuri) + varjostin; kuvapari PT:lle.
   d. tarkista.sh + Peli-testit → JU:lta käännös + SIMU NYT → loppuajo: skenaario
      /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/simu-204-huudot/sk-huudot-204-ipad.txt, MUTTA `aani 45` heti `ui juoksupeli v4`:n
      jälkeen (ei oleta ennen; 12.3x kaappaus alkoi huudon jälkeen) ja videoon ääni ffmpegillä → video PT:lle omistajan pelitestiin.
      Sitten NS:lle merge-pyyntö junaan 204 (PT: juna odottaa omistajan korjauksia, ei lähde).
2. **Mac-näppäinlento** (omistaja 11.27): haara pelikoodari/nappainlento-204 kärki **4814ab2d1** (wt/proto-pelikoodari-nappainlento-204),
   Mac-käännös valmis (proto-3d/Matkakirja-proto-mac → T7 proto-mac-kopio/Build/mac/Matkakirja.app, kaannos.txt StreamingAssets).
   Ajo `zsh /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/mac-nappainlento-204/aja.zsh` VAIN kun PT ilmoittaa vapaan hetken: appi
   vaatii etualan (runInBackground 0, Input System poistaa näppäimistön taustalla). 12.36 ajo katkesi, appi ilmestyi omistajan ruudulle
   ja suljettiin (Activity Monitor). Skripti korjattu (PID symlinkin takaa, uusi Player.log, mykistys 90 s, trap sulkee appin).
   Tulos → PT (3 riviä) → NS junaan.
3. **Kysy-8 worker-PR ravelius/Matkakirja#4945** (pelikoodari-opas-kysy-8, kärki 40960de48, wt/pelikoodari-opas-kysy-8): EI mergeä
   (PT: worker-julkaisu = junan web-merge, omistaja pysäytti junan 204). Pidä vihreänä; SK:n uudet listat → `node tools/pollo/tee-opas-kysy.mjs`.
   Mergen jälkeen ilmoitus PT + Linssiseppä (natiivin raja 5 → 8).

## TEHTY TÄSSÄ SESSIOSSA
- e5016f4ce (juoksupeli-kamera-204) simu + kuvapari OK, PT hyväksyi → NS:lle merge-pyyntö lähetetty 11.54. Todistus
  proto-3d/lokit/todistus-tekstitys204-ipad-20261019-1146/ (kuvapari/, videot v4 + Rata 1).
- nappainlento-204: fe772f95a NappainTapit (Ydin, Linssit-testit 5/5) + OpasTapit (kippi/vapaa lento, WASD = vasen, nuolet = oikea,
  Kosketaan myös näppäimillä, ei tekstikentässä); acd06efb9 SeikkailuPelaaja (nuolet = katse, ei enää liike), vene, MuseoSovitin
  (SeikkailuTapit.NappainLiike/-Katse); 4814ab2d1 QA `ui nappain pito <w,a,s,d,ylos,alas,vasen,oikea> [s]` (NappainTesti, Input System
  -jono). Linssit 2123/2123, tarkista.sh rc 0. ISS-ohjaamon joystickiin ei näppäimiä (ei pyydetty).
- juoksupeli-huudot-204: a63f2e589 PuyiHuudot (18 ääntä puyi-huudot-v1, kartta tekstistä, oma 2D-soitin Voima.Repliikit,
  kaistale äänen ajan), 719d8299b SK:n avainpaketti 224c25b58 (105 avainta, versiot korvaavat huuto.1–4; tekstitys = ääni: posliinimaljakko
  Noin!, jadesinetti Katos vaan!, kalakulho Auts! – SK päivitti samat mainiin ed1ce5c04, peli = paketti, 0 eroa), 1e141a9c5 O1/O2 oletus
  (KORVATTAVA, ks. ENSIN 1a). Simu 4cca852b OK: huuto ääni alut/katos-vaan 1,7 s taso 0,75, 0 virhettä
  (proto-3d/lokit/todistus-huudot204-ipad-20261019-1229/).
- PR #4945 (worker /opas/kysymykset → SK:n 8 kysymystä, opas-kysy.js generoitu, tests/opas-kysy.test.mjs).

## MUUTA
- Worktreet: proto-pelikoodari-{juoksupeli-kamera-204, nappainlento-204, juoksupeli-huudot-204}, pelikoodari-opas-kysy-8; ei poistettavaa
  ennen junan 204 mergeä. juoksupeli-202 = vanha videohaara.
- Codex: kattoreitti, esteiden mallit, Puyin tarttumisleikkeet, muistokuplakuvat (versioille esineet/<id>-<n>.png) ennallaan odottamassa.
