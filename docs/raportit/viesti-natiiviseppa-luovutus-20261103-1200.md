# Natiivisepän luovutus 3.11.2026 klo 12.00 (konteksti 27 %, 7.37)

Vain voimassa oleva tila. Korvaa luovutuksen viesti-natiiviseppa-luovutus-20261103-1035.md (sen lisäys 10.40 käsitelty alla).
Id:t: /Users/Shared/Claude/osoitekirja.md. Ei keskeneräisiä mergejä eikä käynnissä olevia ajoja (L1, L2, iso iPad vapautettu JU:lle).

## TEHTY TÄLLÄ VUOROLLA (haara natiiviseppa/lahto-tulo-218, wt/proto-natiiviseppa-esilataus, peili ok, testit 2225/793/591, tarkista 0)
1. **ca505e175 lähtöbeige osa 1:** striimitauko piirroksen alla alkoi pallon 1 karkealla laatalla (forbidHoles) → nyt tauko vasta,
   kun pallo ComputeLoadProgress ≥ 99 % (enintään 6 s); kohteen valinta (PiirrosKerros.LahtoAlkaa) palauttaa striimin heti ja estää
   tauon 6 s. + **MatkaSeuranta** (PeliOhjain.Esilataus.cs): valinnasta 12 s, 0,25 s välein korkeus, piirros, pallon lataus %,
   laatat, Cesium-pyynnöt tasoittain (Laattapalvelin.ElavaKiireZ). ketju.zsh kirjoittaa matkaseuranta.txt:n.
2. **299b767f4 lähtö pystyyn (PT 11.4x KYLLÄ kokeena):** PalloAjo kohtiPistetta myös loitonnuksessa (sivuliike (h−h0)/(h1−h0));
   Nappula asettaa sen loitontavalle ennakkozoomille (PalloKierto.AjoPystyyn). Testi PalloLiikeTestit.LahtoNouseePystyyn.
   - Simu kylmä: **lähtö ilman beigeä** (lokit/natiiviseppa-esilataus-kylma-299b767f4-20261103-1153/ruudut/lahto-1-3_5.jpg) → PT 11.58.
   - Iso iPad kylmä (lokit/natiiviseppa-fps-lontoo-kylma-299b767f4-ipad-20261103-1149/matkaseuranta.txt): lähtö 50 km lataus 43 %,
     230 km 71 %; tulo terävä vasta 11,4 s (loppu 1,7 km, z16–z17 hidas, pyynnöt ei levyllä). 8d18d7047-vertailua iPadilla ei ole.
   - Mittaukset ja johtopäätökset: proto-3d/_tyo/natiiviseppa/lahto-tulo/MITTAUS-ca505e175.md (simu ca505e175 + 299b767f4 + iPad).
3. PT 11.4x: "9613f5ad7+ca505e175(+pystynousu) junaan, kun iPad-mittaus näyttää ettei mikään huonone" → kysytty PT:ltä 11.58
   (tulolle ei vertailua; muutokset eivät koske tulon latausta). Odottaa vastausta.
4. Cron Unity-beeta luotu uudelleen (sessiokohtainen, "4 9 * * *") → luo uudelleen nollauksen jälkeen.

## JONO
0. PT:n vastaus junasta: KYLLÄ → merge natiiviseppa/lahto-tulo-218 (299b767f4) natiiviseppa/juna-218:aan (wt/proto-natiiviseppa-ehdokas),
   testit, peili peili/proto/natiiviseppa/juna-218, rivi JU:lle (laitekäännös + iso iPad ennen kuin omistaja katsoo Lontoon).
   EI/vertailu ensin → kylmä Lontoo isolla iPadilla 8d18d7047:llä: zsh tyokalut/ipad-lukko.sh kaari natiiviseppa -- zsh
   proto-3d/_tyo/natiiviseppa/lahto-tulo/ipad-kylma.zsh <sha9> (äppi lokit/natiiviseppa-app-210-lahto-<sha9>-laite; runkoäppi
   lokit/julkaisija-laite-218-8d18d7047 käy suoraan: muuta APP-polku). Vain JU:n vuorolla.
1. KK:n palaute lähtöruudukosta (PT välittää). Lähdön iPadin 43 %:n kuoppa 50 km:ssä: jos KK näkee pehmeää, seuraava keino on
   pystyosuuden jatkaminen (sivuliike vasta ~200 km:stä) – PT:n päätös.
2. Kylmän tulon terävyys iPadilla 11,4 s: z16–z17 piirtyy hitaasti (lähinäkymä 351 palaa). Ehdotus PT:lle jos pyytää: lähinäkymän
   z17 vain ruudun keskiosaan ensin. Ei aloitettu.
3. Laitemittaukset 60 fps (Time Profiler, liikeruudut > 34 ms): zsh _tyo/natiiviseppa/fps60/fps218.zsh ipad <.app> (JU:n vuoro).
   iPhone vain PT:n luvalla (xctrace-yhteysvika 09.54).
4. Osa D (20 ms ruutuvahti + muistimittaus isolla iPadilla Lontoo/Pariisi) kun NUI:n A+C rungossa.
5. GC-haara runkoon vasta PT:n luvalla (2856c5cc3, natiiviseppa/gc-mvt-218). Merget (VS/NUI/KS) PT:n kuittausten mukaan.
6. Avoin riski PT:lle: UITK-sumennuksen liuku muissa Kokoruutu-tilanteissa (+1 Gt). Juna 218 jatkuu; lukitus/TF vain "OMISTAJA PYYSI JULKAISUA".
7. Odottavat ennallaan: LAV rakennukset-v95 ei runkoon ennen PK:n eunukkikorjausta + PT:tä; PK bugi 2; NUI:n leikehaara 7280634c4 EI;
   Pariisin vieritys osa 3 EI NYT; Pariisin piirrosta EI optimoida; KS:n tasankoresepti → uusi SileaUrl-kierros; Z11–Z12-välitasoa EI.
8. Jono tyhjä → rivi PT:lle "JONO TYHJÄ: Natiiviseppä".

## TILA
- Juna 218 runko = 8d18d7047 (wt/proto-natiiviseppa-ehdokas, haara natiiviseppa/juna-218; peili natiivi-backup peili/proto/natiiviseppa/juna-218).
  Isossa iPadissa 8d18d7047 (palautettu 11.54). TF 217 testaajilla.
- Simu ketju: LINJA=<n> zsh proto-3d/_tyo/natiiviseppa/lahto-tulo/ketju.zsh <sha9> (oletus L2; tulos myös matkaseuranta.txt).
- Worktreet: ÄLÄ poista ehdokas, -tyokalut, -varjo, -saapuminen, -gcmvt, -esilataus (natiiviseppa/lahto-tulo-218), -introkoe eikä
  T7-kopioita. Luovutusworktreet natiiviseppa-luovutus-20261103-* saa poistaa mergen jälkeen (tools/uusi-worktree.sh --poista <nimi>).
- Testiskriptin "VIKA Pariisin intro ei päättynyt 120 s:ssa" toistuu (video silti ok) – selvitä, jos aikaa.

## JATKOKOMENNOT
- Testit: `EI_PEILIA=1 nice -n 15 zsh /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/juna210/testit210-rinn.sh <työpuu>` (~5 min).
- Release-laitekäännös (L1): `LAITE_KOPIO="/Volumes/T7 4TB/koodaus/proto-natiiviseppa-unity-b6" zsh .../juna210/laite210.sh <sha9> <nimi>`.
- Muistikoe: `zsh .../juna218/muisti-koe218.sh <sha9>`. Pitkät ajot Bash run_in_background lokitiedostoon.
