# Natiivi-UI: luovutus 8.11.2026 klo 19.45 (rajaus Mac-ajo 2 PT:llä; odota PT:n vastaus vaakaruudusta)

Korvaa luovutuksen -1837 (`git show 4f50902e9:docs/raportit/viesti-natiivi-ui-luovutus-20261108-1837.md`); siitä yhä voimassa: FPV-haara
natiivi-ui/fpv-nakyma d1c8a074f/7ddc42970 ja FPV-avoimet (luovutukset -1518/-1552), "TARKISTUS:"-rivi jokaiseen ajopyyntöön, junan 222 kärki 617d6ca2b.
PT local_5df52e10-…, JU local_06f8c680-…, NS local_99130238-…, KK local_37f7c945-…, Postivahti local_afae44f0-….
Työkansio /Users/Shared/Claude/proto-3d/_tyo/natiivi-ui/. Kaikki koe, EI JUNAAN ilman PT:n/KK:n sanaa.

## JONO NYT (järjestyksessä)
a) NÄHTÄVYYSESITTELYN RAJAUS (OMISTAJAN PÄÄTÖS 18.36) – TEHTY, PT:LLÄ 19.42: haara natiivi-backup natiivi-ui/esittely-rajaus, kärki 65f0277be
   (617d6ca2b + bdd0f7a83 + 65f0277be), worktree /Users/Shared/Claude/wt/proto-natiivi-ui-napautus-puhdas (haara vaihdettu). Tulos ja tekotapa:
   proto-3d/_tyo/natiivi-ui/nahtavyysrajaus-2/TULOS.md; kuvat proto-3d/lokit/nui-nahtavyysrajaus-2-{iphone,iphone-vaaka,ipad}-65f0277be/.
   iPhone pysty + iPad OK. ODOTA PT: (1) saako iPhonen VAAKARUUDUSSA sijoittaa palkin viereen (vasen puolisko vapaa, ~2,5× isompi) – nykyinen
   päätös "alapuolella"; toteutus: NahtavyysEsittely.VapaaAlue + Linssisiirto dx (NahtavyysRajaus.Dy:n vaakavastine); (2) laitepari KK:lle
   (iPhone pysty Eiffel + ND, iPad) vasta PT:n sanalla → iPad-ajo JU:lta, skenaarion pohja sk-nahtavyysrajaus-2-mac.txt (iPadilla: odota 3
   komentojen väliin ja "komento kuva X"; kosketusreitti `ui kohdenostot napauta` toimii iPadilla, iPhonen Mac-batchissa vain
   `ui nahtavyysesittely napauta <malli>`). Avoin sivuhavainto: iPhone-vaaka Mac-kuvassa beigejä kolmiopiikkejä reunoilla (ei rajauksesta).
b) [TEHTY 18.4x: katsottu, PT:lle raportoitu; proto-3d/_tyo/natiivi-ui/lentoraja-5/TULOS.md – pystylähtö toimii, ei kermaa, ei mustia; odota PT:n jatko] LENTORAJA-5 (PT 18.3x PÄÄTÖS, koe): c1cde1148 natiivi-backup natiivi-ui/merenpohja-pohjapallo-lentoraja (sama c54d3ba0d-pohjalla 81a4639a8
   natiivi-ui/kohokartta-lentoraja; worktreet wt/proto-natiivi-ui-lentoraja ja wt/proto-natiivi-ui-kohokartta-lentoraja). JU:n Mac-ajo pyydetty 18.4x
   (sk-lentoraja-5-mac, lokit proto-3d/lokit/nui-lentoraja-5-c1cde1148); JU ilmoittaa valmiin tähän sessioon.
   Sisältö: (1) kohokarttalento pystyyn: PalloAjo pystyOsuus 0,15 (alku/loppu 15 % pelkkää nousua/laskua; AjoPystyyn/kohtiPistetta ei auttanut,
   koska se seuraa vain alku–loppukorkeuden eroa 6→7 km); (2) painuneen merenpohjan usva: PalloKierto.UsvaPohjaLisaM (×15-pohja Biskajalla −37 km
   jäi usvan lopun taakse → kerma 20–80 km:ssä; EI sama kuin NS:n drone-korjaus 2fa367316, mutta samaa lajia), Aurinko siirtää usvaa
   syvyys/cos(kallistus). Aiemmat: -2 ab1059a74 (Pariisin nosto ilman viivettä, kehysloki "MATKAKIRJA lentoraja:"), -3 9c2d72713 (rako 0,25×etäisyys),
   -4 81a9b12b3 (sama rako Pariisin nostossa). Testit -5: Kartta 716/716, Linssit 2267/2267, unity (sh) 0.
   TEHTÄVÄ: katso video (ffmpeg-arkki 10,2–12,7 s, kehysloki), tarkista mustat alku/loppuruudut (signalstats YAVG; -4:ssä ei mustia, vain
   linssin avauksen 0,45 s himmennys 1,3–1,8 s) → YKSI video PT:lle 3 rivillä + TULOS.md (kuten lentoraja-4/TULOS.md).
b2) LENTORAJA-5 JATKO (PT 18.4x: EI vielä KK:lle; tee RAJAUKSEN (a) JÄLKEEN): (1) s. 12,33 Bretagnen laattojen reunoilla venyneet pystyraidat
   + siniset neliöt (laatta/reunahelma latautumatta?), PT:n kehys /private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-fable/a3d5ff02-2c36-47df-8563-c0641b22c81c/scratchpad/lr5-1233.jpg
   ja lentoraja-5/s12.33-sininen-nelio.jpg; (2) s. ~18 koko ruutu tasaista beigeä (kamera maassa vai laatta puuttuu?). Vihje: skenaariossa
   "linssi linssi pois" ~8 s aja-komennon jälkeen (kohokartta → tavallinen kartta Puerto Ricossa) – tarkista ajoitus lokista ensin.
c) Merenpohja-3: PT:n vastaus (KK:lle? musta alku/loppu). Maininnat Seine-kaista ja Montmartre ×15.
d) FPV: NS:n A/B-tulos, avoimet PT:lle.

## OPIT
- Mac-esikatselu tallentaa kuvan vain riviltä `kuva X`; `komento kuva X` on iPad-muoto (JU 8.11. 19.2x; muistissa).
- Mallien mitat ovat havainteen liioittelemia (Eiffel huippu 885 m, ND 710 m ellipsoidista): rajaus käyttää piirrettyä mallia.
- Linssisiirto (PalloKierto.Linssisiirto) on staattinen ja pysyy: palauta aina, kun oma tila päättyy.
- Mac-videon aika = peliaika (tallenne 50 fps → 30 fps video samassa ajassa); aja-komento lentoraja-skenaariossa ~10,5–11,2 s.
- Kohokartan raster z8 ~600 m/px: matala lento ×15-maaston yllä näyttää "maaston sisältä", vaikka loki näyttää silmän rajan yllä.
- Ruskeat yksittäiset kehykset = varjorinne (126,117,84), ei pohjapallo (e5d0a7).
