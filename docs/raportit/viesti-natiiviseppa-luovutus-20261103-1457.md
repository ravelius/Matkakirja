# Natiivisepän luovutus 3.11.2026 klo 14.57 (7.37)

Vain voimassa oleva tila. Korvaa luovutuksen viesti-natiiviseppa-luovutus-20261103-1350.md.
Id:t: /Users/Shared/Claude/osoitekirja.md. Ei keskeneräisiä mergejä eikä omia käynnissä olevia ajoja. Cron Unity-beeta luotu tässä
sessiossa (4fd43322) – nollauksen jälkeen luo uudelleen ("4 9 * * *", muisti unity67-paivitysseuranta).

## TEHTY TÄLLÄ VUOROLLA
1. **Simu eb2c92eb3** (JU:n yhdistelmä): kylmä Lontoo terävä 999 ms zoomista, ennen 1. trailerikuvaa; paluu Pariisi ilman piirrosneliötä.
   PT/KK: Lontoon ruudun alaosa sumea 7–8,5 s (kohta 1b), Pariisin paluussa terävä suorakaide 6,75–7,3 s. Yhteinen NUI-skenaario
   (pallot, reitit, noppa, Bryssel, KS:n p1–p8, Big Ben l1–l2): lokit/natiiviseppa-yhteinen-eb2c92eb3-20261103/.
2. **Osa 3 (PT KYLLÄ): 252c190dc** (haara natiiviseppa/piirros-astc-218, a9a04972c:n päällä; peili natiivi-backup). Pariisin
   piirroslaatta pakataan taustasäikeessä: MatkakirjaPurku.mm MatkakirjaKuvat_PuraAstc (ImageIO:n astcenc, ASTC 4×4, mipit,
   arvo 0x44 koska vakio vasta iOS 19:ssä), PiirrosKerros.Purku.cs lataa LoadRawTextureData(ASTC_4x4); vanha polku, jos ASTC ei käy.
   Mac: 47–123 ms / 2048²-laatta taustalla, PSNR 33,5 dB (8×8: 23 dB, hylätty). 029f984c8 = 1420265d7 + sama (mittaus, ei enää käytössä).
   JU: mukana yhdistelmässä 3973f10b0; vieritysmittaus isolla iPadilla 3973f10b0:lla JU:n vuorolla (JU ajaa, tulos NS:lle).
3. **a15dd7dfc** (haara natiiviseppa/saapuminen-ruutu-218, eb2c92eb3:n päällä; peili): 7f715f5fb LoppuTaso ottaa myös ruudun koon
   (ElavaEsilataus.RuudunTaso, 12 palaa lyhyellä sivulla → Lontoo z15, 214 palaa) ja a15dd7dfc piirroskaupunki saa saapumisen
   välitasot (PeliOhjain.Esilataus: SaapumisKeskusta/-KorkeusM ei enää null Pariisille; Pariisi 220 palaa z15).
4. **Simu 3973f10b0** (= eb2c92eb3 + NUI e010ce48b/438c6c22b + 252c190dc + a15dd7dfc): EI KORJAANTUNUT. Lontoo alaosa terävä vasta
   ~9,4 s (eb2c92eb3: ~8,25 s, ~1 s huonompi), yhä ennen trailerikuvaa ~10,5 s. Pariisin suorakaide yhä. DIAGNOOSI OLI VÄÄRÄ: matkaseurannan
   "pyynnöt z13 28/27" = pyydetty / levyltä, eli palat OLIVAT levyllä jo eb2c92eb3:ssa → vika ei ole esilatauksessa vaan siinä, miten
   nopeasti Cesium näyttää levyltä luetut palat (lataus, purku, GPU) tai mitä tasoa se pyytää. Kerrottu PT:lle (14.5x) ja ehdotettu, että
   7f715f5fb voi jäädä pois asennuksesta. Lokit: lokit/natiiviseppa-esilataus-kylma-3973f10b0-20261103-1448/ (ruudut/tulo-6_5-9.jpg, tulo-9-13.jpg),
   natiiviseppa-paluu-pariisi-3973f10b0-20261103-1451/ (paluu-5_75-7_75.jpg).
5. **Intro-odotus** (omistaja 14.36: simut seisovat): peli kirjoittaa "<kaupunki> nykyintro loppui", ei "aloitusintro … Paattyi".
   Korjattu grep "aloitusintro [a-z]* Paattyi\|[a-z]* nykyintro loppui", enintään 60 s: tyokalut/natiiviseppa-skriptit/juna218/
   esilataus-video218.sh, valitaso-video218.sh, _tyo/natiiviseppa/lahto-tulo/paluu-pariisi.zsh. NUI ja JU ilmoitettu (NUI korjasi omansa).
6. 5122df397 kaatui LIIKEVAHTIIN (NUI:n e010ce48b TraileriLiike.cs) → NUI korjasi 438c6c22b, JU kokosi 3973f10b0.
7. HUOM: tyokalut/tarkista.sh on zsh-skripti – aja `zsh tyokalut/tarkista.sh` (sh antaa rc 1 riviltä 31 "print: command not found").

## JONO
0. **Lontoon alaosa + Pariisin suorakaide (PT/KK kohta 1b)**: selvitä pyyntölokista ("MATKAKIRJA elävä pyyntö z/x/y [levyllä]",
   ElavaPyynnotLokiin päällä zoomin ajan): mitkä palat alaosassa pyydetään ja milloin, ja kuinka kauan levyltä luettu pala näkyy
   (Laattapalvelin.ElavaPala → Cesium). Vertaa eb2c92eb3 vs 3973f10b0 (konsoli-video.txt molemmissa). Simu vain uusimmalla
   yhdistelmällä ja JU:n KÄÄNNÖS NYT -vuorolla: `cd /Users/Shared/Claude/proto-3d && SIMU_ODOTA=3600 LINJA=2 zsh _tyo/natiiviseppa/lahto-tulo/yhdistelma-simu.zsh <sha9>`.
1. Vieritysmittauksen 3973f10b0 tulos JU:lta (iso iPad): onko 0,27 s Compress-nykäys poissa (PiirrosKerros.Purku-ruudut, ei
   PiirrosKerros.Pakkaus). Tulos PT:lle ≤ 3 riviä.
2. **Pariisin pohjoiset rakennuslaatat** (PT 14.5x, KS:n kuva lokit/karttaseppa-pariisi-bigben-0c103c3a9-20261103/p1-pohjoinen.jpg):
   laajassa näkymässä (aja 48.858 2.335 12) kaksi palaa rakennuksineen, naapurit karkeammalla tasolla ilman → terävä raja. Ei pieni,
   ei tähän yhdistelmään (JU kuitattu). Selvitä ElavaTyyli: rakennusten vähimmäistaso / häivytys tasorajalla. HUOM: yhteisen skenaarion
   "aja … 12" ei zoomannut eb2c92eb3-ajossa (p1-laaja.png = Ranska), joten oma toisto tarvitsee toisen komennon.
3. Jos Lontoo yhä sumea > 1 s isolla iPadilla: z17-kohtainen SS 4 → 3 (näkyvä → kuvapari PT:lle).
4. Osa D (20 ms ruutuvahti + muistimittaus isolla iPadilla) kun NUI:n A+C rungossa. iPhone vain PT:n luvalla.
5. GC-haara runkoon vasta PT:n luvalla (2856c5cc3, natiiviseppa/gc-mvt-218). Merget PT:n kuittausten mukaan.
6. Odottavat ennallaan: UITK-sumennuksen liuku (+1 Gt) PT:llä; LAV rakennukset-v95 ei runkoon ennen PK:n korjausta; NUI:n leikehaara
   7280634c4 EI; Pariisin piirrosta EI optimoida ilman lupaa; KS:n tasankoresepti; Z11–Z12-välitasoa EI.
7. Jono tyhjä → rivi PT:lle "JONO TYHJÄ: Natiiviseppä".

## TILA
- Juna 218 runko = 1420265d7 (wt/proto-natiiviseppa-ehdokas, haara natiiviseppa/juna-218). Uusin yhdistelmä 3973f10b0 (JU).
- wt/proto-natiiviseppa-esilataus on haarassa natiiviseppa/saapuminen-ruutu-218 (a15dd7dfc). Muut omat haarat: loppurajaus-218
  (a9a04972c), piirros-astc-218 (252c190dc), lontoo-z15-218 (72edd2dc5 = 7f715f5fb a9a04972c:n päällä), astc-mittaus-1420265d7 (029f984c8).
- iPad-lukko: proto-3d/Matkakirja-proto-esikatselu/tyokalut/ipad-lukko.sh; simu-lukko.sh on proto-3d/tyokalut/. Molemmat 75, jos varattu.
- Laitekäännös L2: `PROTO_LINJA=2 PROTO_LAITE_KOPIO="/Volumes/T7 4TB/koodaus/proto-natiiviseppa-unity-b6" zsh proto-3d/tyokalut/natiiviseppa-skriptit/laite-sha.sh <sha9> <lokikansio>` (vain JU:n vuorolla).
- Testit yksi kerrallaan: `EI_PEILIA=1 nice -n 15 zsh /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/juna210/testit210-rinn.sh <työpuu>`;
  Kartta-testit `sh Kartta-testit/kaanna.sh` (596/596); tarkistus `zsh tyokalut/tarkista.sh`.
- Worktreet: ÄLÄ poista ehdokas, -tyokalut, -varjo, -saapuminen, -gcmvt, -esilataus, -introkoe eikä T7-kopioita.
  natiiviseppa-luovutus-20261103-1310, -1350 ja -1457 saa poistaa mergen jälkeen (tools/uusi-worktree.sh --poista <nimi>).
