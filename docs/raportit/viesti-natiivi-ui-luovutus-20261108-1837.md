# Natiivi-UI: luovutus 8.11.2026 klo 18.37 (lentoraja-5 JU:lla; UUSI ETUSIJA nähtävyysesittelyn rajaus)

Korvaa luovutuksen -1735 (`git show 831629bcd:docs/raportit/viesti-natiivi-ui-luovutus-20261108-1735.md`); siitä yhä voimassa: FPV-haara
natiivi-ui/fpv-nakyma d1c8a074f/7ddc42970 ja FPV-avoimet (luovutukset -1518/-1552), "TARKISTUS:"-rivi jokaiseen ajopyyntöön, junan 222 kärki 617d6ca2b.
PT local_5df52e10-…, JU local_06f8c680-…, NS local_99130238-…, KK local_37f7c945-…, Postivahti local_afae44f0-….
Työkansio /Users/Shared/Claude/proto-3d/_tyo/natiivi-ui/. Kaikki koe, EI JUNAAN ilman PT:n/KK:n sanaa.

## JONO NYT (järjestyksessä)
a) ETUSIJA – NÄHTÄVYYSESITTELYN RAJAUS (PT 18.4x: OMISTAJAN PÄÄTÖS 18.36 "Kyllä (Suositus)"): nähtävyysesittelyssä KOKO nähtävyys (myös korkea huippu)
   näkyy vapaassa tilassa palkin ja kuvan ALAPUOLELLA kaikilla laitteilla ja suunnilla; kamera rajaa niin, ettei mitään peitetä.
   Syy: iPhone pysty TF 223, palkin kuva peittää Eiffelin yläosan: docs/raportit/kaappaukset/omistaja-20261108/iphone-eiffel-napautus-tf223-1831.png.
   HAARA 617d6ca2b:n päälle (natiivi-backup julkaisija/juna-222 / natiivi-ui/napautus-222-ilman-topo; proto-worktree wt/proto-natiivi-ui-napautus-puhdas?).
   Ei junaan ilman paria KK:lle: iPhone pysty (Eiffel, Notre-Dame) + iPad → kuvat ENSIN PT:lle.
   Lähtökohdat 617d6ca2b:ssä (ei vielä luettu): Assets/Matkakirja/UI/NahtavyysEsittely.cs, Kartta/Valintarajaus.cs, Kartta/Saapumisrajaus.cs,
   Linssit/Unity/TehtavaKohdeNapautus.cs. Muisti: skenaario-lentopiilo-piilottaa-nostot.md (ui lentopiilo ei napautusskenaarioihin).
b) LENTORAJA-5 (PT 18.3x PÄÄTÖS, koe): c1cde1148 natiivi-backup natiivi-ui/merenpohja-pohjapallo-lentoraja (sama c54d3ba0d-pohjalla 81a4639a8
   natiivi-ui/kohokartta-lentoraja; worktreet wt/proto-natiivi-ui-lentoraja ja wt/proto-natiivi-ui-kohokartta-lentoraja). JU:n Mac-ajo pyydetty 18.4x
   (sk-lentoraja-5-mac, lokit proto-3d/lokit/nui-lentoraja-5-c1cde1148); JU ilmoittaa valmiin tähän sessioon.
   Sisältö: (1) kohokarttalento pystyyn: PalloAjo pystyOsuus 0,15 (alku/loppu 15 % pelkkää nousua/laskua; AjoPystyyn/kohtiPistetta ei auttanut,
   koska se seuraa vain alku–loppukorkeuden eroa 6→7 km); (2) painuneen merenpohjan usva: PalloKierto.UsvaPohjaLisaM (×15-pohja Biskajalla −37 km
   jäi usvan lopun taakse → kerma 20–80 km:ssä; EI sama kuin NS:n drone-korjaus 2fa367316, mutta samaa lajia), Aurinko siirtää usvaa
   syvyys/cos(kallistus). Aiemmat: -2 ab1059a74 (Pariisin nosto ilman viivettä, kehysloki "MATKAKIRJA lentoraja:"), -3 9c2d72713 (rako 0,25×etäisyys),
   -4 81a9b12b3 (sama rako Pariisin nostossa). Testit -5: Kartta 716/716, Linssit 2267/2267, unity (sh) 0.
   TEHTÄVÄ: katso video (ffmpeg-arkki 10,2–12,7 s, kehysloki), tarkista mustat alku/loppuruudut (signalstats YAVG; -4:ssä ei mustia, vain
   linssin avauksen 0,45 s himmennys 1,3–1,8 s) → YKSI video PT:lle 3 rivillä + TULOS.md (kuten lentoraja-4/TULOS.md).
c) Merenpohja-3: PT:n vastaus (KK:lle? musta alku/loppu). Maininnat Seine-kaista ja Montmartre ×15.
d) FPV: NS:n A/B-tulos, avoimet PT:lle.

## OPIT
- Mac-videon aika = peliaika (tallenne 50 fps → 30 fps video samassa ajassa); aja-komento lentoraja-skenaariossa ~10,5–11,2 s.
- Kohokartan raster z8 ~600 m/px: matala lento ×15-maaston yllä näyttää "maaston sisältä", vaikka loki näyttää silmän rajan yllä.
- Ruskeat yksittäiset kehykset = varjorinne (126,117,84), ei pohjapallo (e5d0a7).
