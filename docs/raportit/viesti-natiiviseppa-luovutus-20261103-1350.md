# Natiivisepän luovutus 3.11.2026 klo 13.50 (7.37)

Vain voimassa oleva tila. Korvaa luovutuksen viesti-natiiviseppa-luovutus-20261103-1310.md (sen jonon kohta 0 tehty, kohta 2 tehty).
Id:t: /Users/Shared/Claude/osoitekirja.md. Ei keskeneräisiä mergejä eikä omia käynnissä olevia ajoja. Cron Unity-beeta luotu tässä
sessiossa (71adf750) – nollauksen jälkeen luo uudelleen ("4 9 * * *", muisti unity67-paivitysseuranta).

## TEHTY TÄLLÄ VUOROLLA
1. **Simu c660bbc50** (JU:n yhdistelmä 221739243 + NUI + KS + 8e855c8d9, L2): kylmä Lontoo "kartta terävä 1596 ms zoomauksesta",
   paluu Pariisiin 1016 ms. Lokit proto-3d/lokit/natiiviseppa-esilataus-kylma-c660bbc50-20261103-1336/ ja
   natiiviseppa-paluu-pariisi-c660bbc50-20261103-1340/. Uudet skriptit: _tyo/natiiviseppa/lahto-tulo/paluu-pariisi.zsh (NUI:n skenaario
   ilman käännöstä) ja yhdistelma-simu.zsh <sha9> (ketju.zsh + paluu; SIMU_ODOTA=3600, jos lukko varattu).
2. **Haara natiiviseppa/loppurajaus-218** (wt/proto-natiiviseppa-esilataus, pohja 0c103c3a9 = c660bbc50 + NUI 8afe28dfa;
   peili natiivi-backup peili/proto/natiiviseppa/loppurajaus-218 = a9a04972c). Testit 2225/793/596, tarkista 0. JU:lle 13.48
   yhdistelmään b39c1bc9a:n päälle + simu.
   - 5c88d5b58 (= a0fad2fa3 haarassa lahto-tulo-218): LiikeLaatat varjokameran kerroin rajattu SystemInfo.maxTextureSizeen (simun
     8256×11008 RenderTexture -virhe). maxRenderTextureSize ei käänny tarkista.sh:n viitekirjastolla.
   - f36aec2d2: NUI:n loppurajaus nosti Lontoon lopun 7,8 km:iin → esilataus haki koko ruudun z11–z17 (~2 000 palaa), Cesium pyysi
     z14–z15 eikä ne ehtineet ("kartta ei terävä 3000 ms"). ElavaEsilataus.LoppuTaso(korkeus, lähitaso): jokainen kaksinkertaistus
     yksi taso karkeammaksi (Lontoo z15); KarttaKerrokset.Lahinakyma palauttaa z:n; edistys (LahinakymaValmis) lopun tasolla.
   - a9a04972c: Pariisin paluussa piirros näkyi neliönä 11 km:ssä (häivytys 25–60 km, striimi ympärillä sumea). PiirrosKerros
     .PeittaaNakyman: saapumisajon aikana (ennakko, kamera liikkeessä) tavoite 0, kunnes näkymä on piirroksen rajojen sisällä.
3. **Vieritysmittaus Iso iPad 1420265d7** (PT 13.2x): liikkeessä myöhässä kauko 2,0 / keski 0,2 / lähin 0 / zoom 3,5 % (1.11.: 4/3/0/3,9).
   Ainoa iso nykäys zoomissa 0,27 s = PiirrosKerros.PuraTaustalla → Texture2D.Compress (ETC2 2048²) pääsäikeessä (Pariisin vieritys
   osa 3: valmiiksi pakatut laatat – luovutuksissa "EI NYT", kysytty PT:ltä 13.48). Muut 18–32 ms: GC-viipale + Nimikerros.
   Kirjattu proto-3d/_tyo/natiiviseppa/fps60/LOYDOS.md; loki lokit/natiiviseppa-fps-vieritys-1420265d7-ipad-20261103-1323.
   Uusi skripti fps60/vieritys-ipad.zsh [sha9] (rungon laiteäppi, ipad-lukko IPAD_ODOTA=3600).

## JONO
0. **SIMU (JU:n vuoro)**: JU yhdistää a9a04972c:n b39c1bc9a:n päälle → KÄÄNNÖS NYT -viestillä
   `cd /Users/Shared/Claude/proto-3d && SIMU_ODOTA=3600 LINJA=2 zsh _tyo/natiiviseppa/lahto-tulo/yhdistelma-simu.zsh <yhdistelmän sha9>`
   (Bash run_in_background). Tarkista: Lontoo "kartta terävä" < 3 s ja ennen 1. trailerikuvaa, ei keskellä tarkempaa suorakaidetta eikä
   beigeä 6,6–7,8 s (KK 13.5x, ruudukko ruudut/tulo-6_5-9.jpg); valmiiksipiirron lokirivissä "… km z15"; Pariisin paluussa ei neliötä
   (ffmpeg -ss 5.75 -t 2 paluu-pariisi.mp4 fps=4 tile=4x2). Tulos PT:lle ensin (≤ 3 riviä), JU:lle VALMIS.
1. PT:n vastaus vierityksen osaan 3 (Pariisin laattojen pakkaus pois pääsäikeestä) – tee vain luvalla.
2. Jos Lontoo yhä sumea > 1 s isolla iPadilla yhdistelmän jälkeen: z17-kohtainen SS 4 → 3 (näkyvä → kuvapari PT:lle).
3. Osa D (20 ms ruutuvahti + muistimittaus isolla iPadilla) kun NUI:n A+C rungossa. iPhone vain PT:n luvalla (9.54-ajo epäonnistui:
   iPhone ei yhdistetty, xctrace rc=2).
4. GC-haara runkoon vasta PT:n luvalla (2856c5cc3, natiiviseppa/gc-mvt-218). Merget PT:n kuittausten mukaan.
5. Odottavat ennallaan: UITK-sumennuksen liuku (+1 Gt) PT:llä; LAV rakennukset-v95 ei runkoon ennen PK:n korjausta; NUI:n leikehaara
   7280634c4 EI; Pariisin piirrosta EI optimoida ilman lupaa; KS:n tasankoresepti; Z11–Z12-välitasoa EI.
6. Jono tyhjä → rivi PT:lle "JONO TYHJÄ: Natiiviseppä".

## TILA
- Juna 218 runko = 1420265d7 (wt/proto-natiiviseppa-ehdokas, haara natiiviseppa/juna-218). Isossa iPadissa 1420265d7 (vieritysmittaus
  asensi saman). TF 217 testaajilla.
- wt/proto-natiiviseppa-esilataus on nyt haarassa natiiviseppa/loppurajaus-218 (ei lahto-tulo-218; se = a0fad2fa3, peilissä).
- iPad-lukko: proto-3d/Matkakirja-proto-esikatselu/tyokalut/ipad-lukko.sh (ei proto-3d/tyokalut/). simu-lukko.sh on proto-3d/tyokalut/.
  Molemmat palauttavat 75, jos varattu → IPAD_ODOTA / SIMU_ODOTA sekunteina.
- Laitekäännös L2: `PROTO_LINJA=2 PROTO_LAITE_KOPIO="/Volumes/T7 4TB/koodaus/proto-natiiviseppa-unity-b6" zsh proto-3d/tyokalut/natiiviseppa-skriptit/laite-sha.sh <sha9> <lokikansio>`.
- Testit AINA yksi kerrallaan: `EI_PEILIA=1 nice -n 15 zsh /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/juna210/testit210-rinn.sh <työpuu>` (~5 min).
  Pelkät Kartta-testit nopeasti: `sh Kartta-testit/kaanna.sh` työpuussa.
- Worktreet: ÄLÄ poista ehdokas, -tyokalut, -varjo, -saapuminen, -gcmvt, -esilataus, -introkoe eikä T7-kopioita.
  natiiviseppa-luovutus-20261103-1310 ja -1350 saa poistaa mergen jälkeen (tools/uusi-worktree.sh --poista <nimi>).
- Testiskriptin "huom: Pariisin aloitusintron loppua ei näkynyt 120 s:ssa" toistuu (video silti ok) – selvitä, jos aikaa.
