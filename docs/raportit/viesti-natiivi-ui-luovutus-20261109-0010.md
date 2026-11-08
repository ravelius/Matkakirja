# Natiivi-UI: luovutus 9.11.2026 klo 00.10 (kontekstivahti 25 %; korvaa -2339:n tilan)

Pohjat taustaksi: -2339 (`git show e168205bd:docs/raportit/viesti-natiivi-ui-luovutus-20261108-2339.md`) ja -2325 (ba3d7e1e9).
PT local_5df52e10-10e4-4b72-9554-0049db300dfe, JU local_06f8c680-4618-42bd-a730-9b6a3e17e0b7. Kaikki koe, EI JUNAAN ilman PT:n/KK:n sanaa.
Parit: python3 -I scratchpad-skripti (PIL, kuvat vierekkäin 3600 px, otsikkokaista) – kirjoita uudelleen (10 riviä). Käännöstarkistus: `sh Peli-testit/unity-tarkistus.sh` worktreessä.

## Valmiit ja PT:lle raportoidut (ei enää NUI:n työtä, odottavat KK:ta)
- IPAD70-4 a7866450f: Eiffel/ND 0,69–0,71 kerronnan aikana; parit lokit/nui-ipad70-4-ipad-a7866450f/pari-{eiffel,nd}-3-vs-4.jpg → PT → KK.
- PARIISIPALLO-2 5fa61ed04: A ja C ok; parit lokit/nui-pariisipallo-2-{iphone,ipad}-5fa61ed04/pari-*.jpg → PT vei KK:lle.
- ★-KYLTIT 0f62c5656: iPad ok (pari lokit/nui-tahtikyltit-1-ipad-0f62c5656/pari-g1.jpg → PT); iPhone-vaakana Palais de l'Industrie törmää ja piilossa (kuten ennen).

## JU:N AJOT KESKEN → katso kuvat → pari PT:lle
1) PARIISIPALLO-4 2233e740c (natiivi-backup natiivi-ui/pariisi-pallo-kuvat, wt/proto-natiivi-ui-pallo), JU ketju S (pid 41541), iphone,
   sk-pariisipallo-4.txt, lokit nui-pariisipallo-4-iphone-2233e740c. PT pyysi: kori/köydet eivät "Concorden aukio" -kyltin päällä.
   -3 a41325c95 (pallo 2.3290) ei riittänyt: Concorden kiinteä kyltti (NostotKartalla.PiirrosKyljet "oikea") ulottuu puiston yli; itään Louvren malli.
   -4: pallo takaisin 48.8646 2.3268; NostotKartalla.PalloAlueet (UiNakymat.KartanPallot) → KylttienTormays: kiinteä kohdekyltti häipyy pallon alta.
   Tarkista l-1: "Concorden aukio" -kyltti EI näy, pallo kuten -2; lokin "kohdenostot kyltti Concorden aukio … törmää True". iPhone-pari (-2 vs -4 l-1) → PT.
2) KUVATEKSTI-3 836ded6c6 (natiivi-backup natiivi-ui/nosto-kuvat-koko, wt/proto-natiivi-ui-nostokuvat), JU ketju Q2 (pid 21710), iphone + ipad,
   sk-kuvateksti-3.txt, lokit nui-kuvateksti-3-{iphone,ipad}-836ded6c6. Sisältää: cd99695f8 tabletin kuvateksti kuvan leveyden mukaan
   (SaapumisKuvat.SuhteutaKuvaan, ×1–2, viite 240 pt) + 836ded6c6 nimen raja tabletille kuvatekstin kanssa (Saapumistraileri nimiYla,
   SaapumisKuvat.KuvatekstinKorkeus). PT 23.5x: "otsikko ei saa osua kuvatekstiin missään koossa". Tarkista k-1/k-2/k-5: PARIISI ei osu
   kuvatekstiin iPhone/iPad; iPadin kuva ylempänä (lepo y ~ -170, oli -64), koko ≥ 0,9×; lokissa "ui kuvateksti: tabletti … ×2.00".
   ENNEN = lokit/nui-nostokuvat-1-kuvateksti-{iphone,ipad}-10845cd24. Parit iphone + ipad → PT.
   Huom: 3× skaala hylätty (teksti ~200 pt ei mahdu ilman kuvan ~18 % pienennystä) – kerrottu PT:lle.
3) KUVATEKSTI-2 b2a7046da iphone (ketjun L viimeinen): korvautuu -3:lla; katso vain, jos -3 viivästyy.
4) TARINA-1b 10845cd24 (ketju O; sk-nostokuvat-1b-tarina.txt, lokit nui-nostokuvat-1b-tarina-{iphone,ipad}-10845cd24): katso j-1..j-5
   (lehti vierii `ui nostonappi vierita`, kuvat vuorotellen, loppu ja lähteet) → parit PT:lle. HUOM `komento veto` on kartan ele.

## Sitten
- LENTORAJA-6 vain PT:n sanalla (ks. -2325).
