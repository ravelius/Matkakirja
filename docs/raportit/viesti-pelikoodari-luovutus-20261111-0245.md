# Pelikoodari: luovutus 11.11.2026 klo 02.45 (konteksti 25 %, pehmeä raja)

Edellinen: viesti-pelikoodari-luovutus-20261110-2356.md (haara pelikoodari-luovutus-20261111-0025, d87a2beb7). TÄMÄ KORVAA SEN JONON.
Natiivityöpuu /Users/Shared/Claude/wt/proto-pelikoodari-juoksu, haara **pelikoodari/seinat-taso1**, kärki **77128fef8** (ei originia, ei junaan):
- 3199b079a P1 kivijalkaovi (KK:n linjaus 10.11. 23.3x) – odottaa KK:n paria.
- d63a93686 = 2ca2f17b7:n poiminta: lahipuut-v16 + juoksun reittikerros. PT kuittasi sen 3.11. junaan 218, mutta se ei koskaan päätynyt junaan.
- 77128fef8 lahipuut-v17 (LAV 11.11.: v16 + 31 puuta P2:n paljaille rungoille). Testit 912/912, unity 0. Media v17 viety (JU 02.38, sha tarkistettu).
  PT kuittasi 02.5x: "myös v16:n +793 puuta mukana – mainitse se KK:n parissa".

## ESTO: juoksupelin Mac-esikatselut (PT 02.3x: EI AJOJA ennen JU:n välimuistikorjausta)
Jokainen esikatselu alkaa tyhjällä välimuistilla (esikatselu.sh: TMPDIR → temporaryCachePath/juoksupeli-mallit) ja lataa leivottu-v3:n
(1054 tiedostoa) + palatsin verkosta; pelin lataus oli 0,01–0,58 Mt/s + yhteysvirheitä → palatsi puuttuu (vain ovet ja portaat tasangolla).
Kuvaus: proto-3d/_tyo/pelikoodari/seinat-taso1/VERKKOJUMI-20261111.txt. PT antoi välimuistikorjauksen JU:lle 224.54:n jälkeen; JU ILMOITTAA.
Hyvän ajon tunnus lokissa: "osamalleja 30, ovia 92" (huonossa "osamalleja 0/1, ovia 0/20" tai "pohja.json puuttuu").
02.41 pysäytin PT:n käskystä P1:n 6. ajon (L2 vapaaksi JU:n käännöksille).

## JONO (kun JU ilmoittaa välimuistikorjauksen)
1. P1-PARI: pyydä JU:lta `zsh /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/seinat-taso1/p1/aja-p1.zsh 2 3199b079a`.
   Tarkista lokista hyvän ajon tunnus + "ovet koe: 245 ovea"; kuvat sips -Z 1000; pari k2 + a2 ennen|jälkeen → KK:lle (näkyvä työ), kopio PT:lle,
   + P1-TOTEUTUS.txt; sitten pt-ok-pyyntö PT:lle (3199b079a). Skenaario sk-p1.txt on korjattu (alla).
2. V17-PARI: `zsh .../seinat-taso1/p2/aja-v17.zsh 2` (ennen 3199b079a = v15, jälkeen 77128fef8 = v17). Kuvat p2-e, p2-i, p2-i-lahi, e3-e, p2-ylla,
   yleis-p → KK:lle (mainitse v16:n +793 puuta ja reittikerros), kopio PT:lle. Junaan vasta KK:n katsottua → pt-ok-pyyntö 77128fef8.
3. B1 bottijumi (−85; 500) ja eteläosan kartoitus (ennallaan, vaatii Mac-ajon).
4. Isolla iPadilla: aukiovideo, renkaiden uusinta (ennallaan aiemmista luovutuksista).

## TEHTY TÄLLÄ VUOROLLA
- Skenaariokorjaukset (sk-p1.txt, p2/sk-*.txt): `ui juoksupeli palatsi verkko latausraja 900` ennen v4-avausta (oletus 120 s katkaisi palatsin;
  HUOM komento on palatsi-alikomento – ilman "palatsi" Esikatselu.cs:n tarkistus kaataa ajon), `oleta 1200 latauksen ositus`,
  `ui juoksupeli elinvoima 1000` latauksen jälkeen. aja-*.zsh: ESIKATSELU_HILJAA_S=1500, ESIKATSELU_AIKARAJA_MIN=45.
  Lähipuut pois QA:lla: `ui juoksupeli palatsi lahipuut 0`.
- PENGER (KK:n toive M7:n viereen): lähde = taustapaketti kk-tausta-0-4 lod0, V4_marmori (−279,1; 528,6)→(−250,1; 530,1), y 0,07–1,03.
  LAV otti jonoon seuraavaan taustaversioon; neuvottu: materiaali V4_kivireunus (= pelin _Laji 18) + metrinen UV kuten kivireunuksessa.
- P2 PAljaat rungot: taustan puu = V4_wood-runko + V4_puukortti-latvus; peli piilottaa kortit 40 m:ssä (LahipuuRaja), runko jää. 31 taustapuulla
  ei lähipuuta → PT:n päätös: LAV lisää lähipuihin (v17) → kytketty 77128fef8. Lista ja työkalu: seinat-taso1/p2/P2-LAHDE.txt, rungot.py.
- glb-työkalut (scratchpad, kopio p2/rungot.py): accessor-laatikot eivät auta (taustapala = yksi verkko), kolmiotason haku toimii.
