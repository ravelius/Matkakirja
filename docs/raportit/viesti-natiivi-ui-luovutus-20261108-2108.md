# Natiivi-UI: luovutus 8.11.2026 klo 21.08 (konteksti 25 %; pieni kuva valmis ja KK:lla; kolme uutta PT:n tehtävää jonossa)

Korvaa luovutuksen -1945 (`git show 975a839a0:docs/raportit/viesti-natiivi-ui-luovutus-20261108-1945.md`); siitä yhä voimassa: FPV-haara
natiivi-ui/fpv-nakyma d1c8a074f/7ddc42970 ja FPV-avoimet (luovutukset -1518/-1552), "TARKISTUS:"-rivi jokaiseen ajopyyntöön, junan 222 kärki 617d6ca2b,
OPIT-luku. PT local_5df52e10-…, JU local_06f8c680-…, NS local_99130238-…, KK local_37f7c945-…, Postivahti local_afae44f0-….
Työkansio /Users/Shared/Claude/proto-3d/_tyo/natiivi-ui/. Kaikki koe, EI JUNAAN ilman PT:n/KK:n sanaa.
Vanhat viestit ennen tätä luovutusta on käsitelty: älä toista niitä.

## TEHTY tässä jaksossa
- PIENI NOSTOKUVA iPHONELLA (omistaja 20.15): haara natiivi-backup natiivi-ui/esittely-pieni-kuva = 65f0277be + 539234f7f (pieni kuva) + 30f7090d8
  (testikomento `ui kamerasuhde laite`). Worktree /Users/Shared/Claude/wt/proto-natiivi-ui-napautus-puhdas (tällä haaralla).
  PT 21.0x: "pysty+vaaka katsottu, OK → KK:lle vietiin. Odota KK:n sanaa ennen junaa." → ODOTA KK; junaan vasta sanalla (silloin
  617d6ca2b + bdd0f7a83 + 65f0277be + 539234f7f (+30f7090d8 vain testikomento) junan kärjen päälle; tarkista ristiriidat).
  Tulos: proto-3d/_tyo/natiivi-ui/pienikuva-1/TULOS.md; kuvat proto-3d/lokit/nui-pienikuva-2-iphone-vaaka-30f7090d8/ ja nui-pienikuva-3-iphone-30f7090d8/.
- a2 kolmiot: ei vika (Mac-batchin 640×480-tasovalinta), PT hyväksyi. Mac-ajoissa iPhone-koossa AINA: `ui kamerasuhde laite` (vain haarassa
  30f7090d8!) + `komento maasto siirtyma 5 0 30` + `komento maasto siirtyma kallistus 90` + `komento lahizoomi 3` (muisti mac-batch-tarkkuus päivitetty).
  Skenaariomalli: _tyo/natiivi-ui/sk-pienikuva-3-mac.txt.
- b2 lentoraja-5 jatko selvitetty (lentoraja-5/TULOS.md, luku JATKO b2).

## JONO (PT:n järjestys 21.1x: kierto → Louvre → lentoraja → kyltit)
1) KIERTO NOPEAMMAKSI (OMISTAJAN PYYNTÖ 21.08, PT): "Noston aikana kartan kierto voisi olla vähän nopeampaa." Tavoite ~1,5 × nykyinen
   (nyt 90° / 54–59 s → ~135°), jatkuu koko luennan ajan, hidastuu pehmeästi lopussa. EHTO: maahan painetut nimet eivät saa kääntyä
   ylösalaisin – jos 135° vie yli, vaihtoehto KUVANA PT:lle → KK (esim. edestakainen kierto tai nimet kääntyvät). Muuten junaan ilman kuvaa;
   kirjaa mitattu kulma ja nopeus. Koodi: Assets/Matkakirja/UI/NahtavyysEsittely.cs AjaOletus (KierrosAst 90, rajaus |loppu| ≤ 90° pohjoisesta,
   suunta kohti pohjoista; KK 11.43 / Raamattu 2.216 neljännes). Huom: NS:n Kamera-koukku voi ajaa oman liikkeen. Pieni kuva -haaran
   Lahesty jatkaa kiertoa omaOhjeesta – jos teet junan kärjestä, tarkista yhteensopivuus pieni kuva -haaran kanssa.
2) LOUVRE: MUSEO VAI ESITTELYKIERROS (OMISTAJAN PYYNTÖ 21.07, PT): "Kun painaa Louvrea, niin pitäisi tulla valinta, että haluaako mennä
   museoon vai nähdä esittelykierroksen nostosta." Napautus (kyltti, malli tai pyramidinappi) → VAHVISTUS-pohjan valinta "museoon" /
   "esittelykierros" (jälkimmäinen = sama palkki, kertoja ja kierto kuin muilla). VAIN Louvre; ei uutta pohjaa (Raamattu 4.1). Oma haara
   junan kärjestä (ei pienikuvan päälle, ellei pakko – kerro PT:lle). Mac-kuvat iPhone + iPad (valinta auki, kumpikin polku) → PT → KK
   ennen junaa. JOS MUSEOON SIIRTYMÄ ON LAVASTAJAN/PK:N KOODIA, KERRO PT:LLE ENNEN KUIN KOSKET. Lähtö: NahtavyysEsittely.Napautus ja
   NostotKartalla.AvaaNosto (~rivi 2080); "Louvren pyramidinappi ennallaan" -poikkeus NahtavyysEsittely.cs:n otsakkeessa.
3) LENTORAJA-5 JATKO (PT 21.1x): (1) SINÄ: lennon keskiosa korkeammalle, kesto ennallaan; EI laattapuolta (NS on FPV:ssä). Lähtö: haara
   natiivi-ui/merenpohja-pohjapallo-lentoraja c1cde1148 (worktree wt/proto-natiivi-ui-lentoraja), PalloAjo/kohokarttalento; vika s. 12,33
   (yksi kehys, ~70 km/kehys, ×15-laatan reunaseinämä ja naapurilaatta latautumatta, kehysloki t 1,60–1,74 s, z 490–790 km).
   Mac-pari (ennen | jälkeen) PT:lle, skenaario sk-lentoraja-5-mac.txt. (2) Linssin sulun paluu Karibialta Pariisiin 0,9 s näyttää
   3 kehystä latautumatonta Pariisia: jos pelaaja näkee saman tavallisesti (linssi suljetaan kaukana lähtöpaikasta), se on vika → lyhyt
   häivytys tai odotus latauksen ajan; jos vain skenaarion keinotekoisuus, kirjaa ja ohita. Loki "linssit: kamera-ajo → … 0.9 s".
4) KYLTIT PÄÄLLEKKÄIN (PT 21.0x, sivuasia): vaaka e-2-pieni.png (nui-pienikuva-2-iphone-vaaka-30f7090d8): Grand Palais -kyltti (vaalea)
   Palais de l'Industrien kyltin (tumma ✦ = kadonnut rakennus) päällä. Alustava: Palais de l'Industrie seisoi Grand Palais'n paikalla
   (1855–1897), joten sama paikka on historiallisesti oikein, mutta kylttien törmäystä ei väistetä. Selvitä kenen tontti (kohdenostojen
   kyltit vs. kadonneiden ihmeiden kyltit; docs/vastuukartta.md) ja kirjaa PT:lle; ei aloitettu.
5) Ennallaan odottavat: c) Merenpohja-3 PT:n vastaus; d) FPV: NS:n A/B-tulos.

## OPIT (lisäys)
- Mac iPhone-koko: kamera pitää 4:3-kuvasuhteen (reunakiilat) ja MinKorkeus ei tunnista puhelinta (lähin zoom 3× kauempana) → yllä olevat komennot.
- NahtavyysRajaus pystyssä: leveysraja (TayttoVaaka 0,85) ratkaisee usein (Notre-Dame 1773 m), jolloin pieni kuva vain siirtää.
- Pinnaus.Varaus käyttää kuvan lopullista (kohde)kokoa; Pinnaus.PienennaKuva palautuu itse, kun palkki poistuu.
