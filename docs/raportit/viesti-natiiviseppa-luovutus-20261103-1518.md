# Natiivisepän luovutus 3.11.2026 klo 15.18 (7.37)

Vain voimassa oleva tila. Korvaa luovutuksen viesti-natiiviseppa-luovutus-20261103-1457.md.
Id:t: /Users/Shared/Claude/osoitekirja.md. Ei keskeneräisiä mergejä eikä omia käynnissä olevia ajoja. Cron Unity-beeta luotu tässä
sessiossa (08019abc) – nollauksen jälkeen luo uudelleen ("4 9 * * *", muisti unity67-paivitysseuranta).

## TEHTY TÄLLÄ VUOROLLA
1. **Kohta 1b selvitetty** (raportti /Users/Shared/Claude/proto-3d/lokit/natiiviseppa-selvitys-1b-20261103-1509/raportti.md):
   - Lontoo: alaosan z15-palat EIVÄT olleet levyllä (3973f10b0: 0 levyltä; aiempi "levyllä"-päätelmä koski vain z11–z14). Ne jonottivat
     elavaPiirto-semaforiin valmiiksipiirron perässä (ValmiiksiKiire = kaikki 4 paikkaa) ja piirtyivät kahdesti. Korjaus **c61d28c99**:
     käynnissä oleva piirto jaetaan (z/x/y/maski), näkyvä pyyntö nostaa sen + vektoripalan kiireelliseksi, tausta saa paikan vain kun
     näkyviä ei odota. Uusi lokirivi "MATKAKIRJA elävä vastaus z/x/y N ms (levy/elava/yhteinen)".
   - Pariisin paluu: kaikki levyltä; syy Cesiumin forbidHoles + loadingDescendantLimit 20 (alipuu "potkaistaan" esivanhemmalle).
     Mittauskomento **7d122e1d1** `maasto lataus <jälkeläisraja> <laattoja> <pohjan haut>` (0 = ennallaan, luo tilesetin uudelleen).
   - Haara natiiviseppa/nakyva-ensin-218 (eb2c92eb3:n päällä; peili). JU kokosi: de11fa0c2 = 429b75faf + 7d122e1d1 + NUI a141413c2,
     ja ASTC-revertin jälkeen **eed17074d** = de11fa0c2 − 252c190dc. (Oma 44aa77437 = 429b75faf + 7d122e1d1, ei enää tarpeen.)
2. **ASTC väärinpäin (omistaja 15.14, iso iPad "sekaisin ja väärinpäin")**: ImageIO:n ASTC-kooderi kirjoittaa lohkot ALAreunasta ylös;
   Puran alareunasta alkava taso annettiin sellaisenaan → jokainen 2048²-laatta ylösalaisin. Korjaus **ee278af37** (haara
   natiiviseppa/piirros-astc-218): taso käännetään yläreunasta alkavaksi ennen koodausta. Mac-testi: ennen 8,4 dB oikein päin / 31,5 dB
   käännettynä, nyt 31,5 dB oikein päin. Kuva + testiohjelmat: lokit/natiiviseppa-astc-suunta-20261103/ (alkuperainen-uusi-vanha.jpg).
   Simussa ASTC ei ollut tuettu (PiirrosKerros.Pakkaus 9× = Compress-varapolku) → vika näkyi vain laitteella.
   Laitetodistuksen pohja **6a7af2d9d** (haara natiiviseppa/astc-laite-218 = eed17074d + 252c190dc uudelleen + korjaus; peili).
3. Paluuskripti _tyo/natiiviseppa/lahto-tulo/paluu-pariisi.zsh: LATAUS="64 40 40" → komento ennen peliä, kansio -lataus64-40-40,
   lisäksi ruudukko 5,5–8,5 s 5 fps. yhdistelma-simu.zsh: LATAUS_B="64 40 40" ajaa paluun toisen kerran (A/B).
4. de11fa0c2-simu kuoli heti (rc 144, tuloste tyhjä, ei käännöstä) – syy tuntematon (todennäköisesti keskeytetty JU:n revertin aikaan).

## JONO
0. **ASTC laitetodistus (PT 15.1x, ehto ennen yhdistelmää)**: JU:n laitevuorolla käännä 6a7af2d9d L2:lla isolle iPadille
   (`PROTO_LINJA=2 PROTO_LAITE_KOPIO="/Volumes/T7 4TB/koodaus/proto-natiiviseppa-unity-b6" zsh proto-3d/tyokalut/natiiviseppa-skriptit/laite-sha.sh 6a7af2d9d <lokikansio>`)
   tai JU ajaa; kuvakaappaus Pariisin piirroksesta (laaja + lähi) → PT:lle polku. Lokista varmista, ettei "[PiirrosKerros] ASTC-pakkaus
   ei onnistunut" ja ettei PiirrosKerros.Pakkaus-ruutusyitä (= ASTC-polku oikeasti käytössä). Vasta sitten JU palauttaa yhdistelmään.
   Pyyntö lähetetty JU:lle 15.17 (jonossa).
1. **1b-simu + A/B** JU:n KÄÄNNÖS NYT -vuorolla: `cd /Users/Shared/Claude/proto-3d && SIMU_ODOTA=3600 LINJA=2 LATAUS_B="64 40 40" zsh _tyo/natiiviseppa/lahto-tulo/yhdistelma-simu.zsh <uusin JU:n sha, nyt eed17074d>`.
   Arvioi: kylmä Lontoo (ruudut/tulo-6_5-9.jpg, "elävä vastaus"-rivit: kiire-palojen ms, "yhteinen"-määrä) ja Pariisin paluu A vs B
   (ruudut/paluu-5_5-8_5-5fps.jpg). PT 15.1x: valitse parempi latausraja OLETUKSEKSI itse mittauksen perusteella → Pallo.unity
   (_loadingDescendantLimit, tilesetin ja pohjan _maximumSimultaneousTileLoads rivit ~1043–1085) → commit → seuraava asennus. Tulos PT:lle ≤ 3 riviä, VAPAA JU:lle.
2. Vieritysmittaus isolla iPadilla VASTA korjatulla ASTC:llä (PT 15.1x); JU ajaa, tulos NS:lle → PT ≤ 3 riviä (0,27 s Compress-nykäys poissa?).
3. **Pariisin pohjoiset rakennuslaatat** (PT 14.5x, KS:n kuva lokit/karttaseppa-pariisi-bigben-0c103c3a9-20261103/p1-pohjoinen.jpg):
   ElavaTyyli: rakennusten vähimmäistaso / häivytys tasorajalla. Ei tähän yhdistelmään.
4. Jos Lontoo yhä sumea > 1 s isolla iPadilla: z17-kohtainen SS 4 → 3 (näkyvä → kuvapari PT:lle).
5. Osa D (20 ms ruutuvahti + muistimittaus isolla iPadilla) kun NUI:n A+C rungossa. iPhone vain PT:n luvalla.
6. GC-haara runkoon vasta PT:n luvalla (2856c5cc3, natiiviseppa/gc-mvt-218). Merget PT:n kuittausten mukaan.
7. Odottavat ennallaan: UITK-sumennuksen liuku (+1 Gt) PT:llä; LAV rakennukset-v95 ei runkoon ennen PK:n korjausta; NUI:n leikehaara
   7280634c4 EI; Pariisin piirrosta EI optimoida ilman lupaa; KS:n tasankoresepti; Z11–Z12-välitasoa EI.
8. Jono tyhjä → rivi PT:lle "JONO TYHJÄ: Natiiviseppä".

## TILA
- Asennettu iPadeille (PT/KK 14.59): 429b75faf → JU:n cb1b5d9fc (= 429b75faf − 252c190dc). Seuraava yhdistelmä eed17074d (JU).
- Omat haarat (proto): nakyva-ensin-218 (7d122e1d1), piirros-astc-218 (ee278af37), astc-laite-218 (6a7af2d9d), yhdistelma-1b-218 (44aa77437,
  vanhentunut), saapuminen-ruutu-218 (a15dd7dfc; 7f715f5fb revertoitu), loppurajaus-218 (a9a04972c), lontoo-z15-218, astc-mittaus-1420265d7.
- Uudet worktreet: wt/proto-natiiviseppa-nakyva (nakyva-ensin-218), wt/proto-natiiviseppa-astc (astc-laite-218). Älä poista.
  Juna 218 runko = 1420265d7 (wt/proto-natiiviseppa-ehdokas, haara natiiviseppa/juna-218).
- iPad-lukko: proto-3d/Matkakirja-proto-esikatselu/tyokalut/ipad-lukko.sh; simu-lukko.sh on proto-3d/tyokalut/. Molemmat 75, jos varattu.
- Laatta-/tekstuurimuutokset tarkistetaan JATKOSSA oikealla iPadilla, ei vain simussa (PT 15.1x; simu voi ajaa eri polun).
- Testit yksi kerrallaan: `EI_PEILIA=1 nice -n 15 zsh /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/juna210/testit210-rinn.sh <työpuu>`;
  Kartta-testit `sh Kartta-testit/kaanna.sh`; tarkistus `zsh tyokalut/tarkista.sh` (zsh!).
- Worktreet: ÄLÄ poista ehdokas, -tyokalut, -varjo, -saapuminen, -gcmvt, -esilataus, -introkoe, -nakyva, -astc eikä T7-kopioita.
  natiiviseppa-luovutus-20261103-1310, -1350, -1457 ja -1518 saa poistaa mergen jälkeen (tools/uusi-worktree.sh --poista <nimi>).
