# Pelikoodari: luovutus 11.11.2026 klo 09.15 (konteksti 25 %)

Edellinen: viesti-pelikoodari-luovutus-20261111-0735.md (a9fd0e13f + lisäykset 8c9a7212f). TÄMÄ KORVAA SEN JONON.
Natiivityöpuu /Users/Shared/Claude/wt/proto-pelikoodari-juoksu, haara pelikoodari/seinat-taso1, kärki 060fa6ac8 (= v132, junassa 224.60).
Työkansio /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/seinat-taso1/. Kuvat itse katsottaessa sips -Z 1000 scratchpadiin.

## TEHTY
- e7 房子18 kaistalta (JU 07.46, e7/kuvat/e7-idasta|lannesta.png): ovi näkyy kokonaan, kaista kuljettava, EI VIKAA → KK:lle 08.4x.
- LAV:n palauttamat E1/E4/M4/M5/M8/M6 = TAUSTAN v132 KOLMIOITA (mika-kärjet = paketin glb): lav-kohdat/LOYDOKSET.txt, glbhaku.py.
  LAV otti takaisin 08.4x; E1, E4, M1, M6, M8 korjattu LAV:n koejuuri-m1:een (v133-ehdokas). LAV ilmoittaa v133:n junashan.
- B1 bottijumin SYY löytyi: etela/B1-SYY.txt. Vapaassa palatsissa botti ei suunnista maaliin (JuoksuV4.Vapaa.cs:338, seinällä aina
  oikealle / hash) → kiertää aukion kehää. Vain QA-ajoja koskeva.
- Tyyppihaku koko taustasta (lav-kohdat/tyyppihaku.py): 50 M1/E1-tyyppistä ehdokasta (sokkelin kansi yli sokkelin), A-suodatettu.txt.
  LAV:lle sanottu: ÄLÄ ALOITA LISTASTA, PK lähettää vain kuvista vahvistetut.

## JONO (PT 09.0x: kärki Juoksupeli)
1. **P-ajo (PT:n kärki)**: JU:n jonossa pursot/aja-p.zsh (9 kuvaa, v132): M4- ja M5-kamerat (samat kuin LAV:n sk-m) kuvat -0 perus,
   mika M4-levyyn (0.40 0.42 / 0.39 0.33 / 0.41 0.50) ja M5 keskeen; -1 = `tarkastelu piilota pursotukset`; -2 = + `piilota ovet`.
   Kun "P AJETTU": katso pursot/kuvat/m4-0|1|2, m5a-*, m5b-* ja unity.log KOLMIO-rivit (grep -A1 "juoksupeli: mika (").
   - Levy katoaa -1:ssä → osasarjan pursotus (JuoksuSokkeloMaailma.Osasarja.cs / JuoksuOsasarjaKokoaja) → korjaa, pari PT:lle.
   - Katoaa vasta -2:ssa → pelin ovilehti (P1/P1B-työ, "palatsi ovet koe") → korjaa ovi, pari PT:lle.
   - Ei katoa → mika-rivistä malli; kerro PT:lle ja LAV:lle (LAV:n KORJAUS.md 09.1x: levyä ei LAV:n paketeissa; LAV:n oma aja-m.zsh myös JU:lla).
2. **A-ajo**: lav-kohdat/aja-a.zsh (100 kuvaa, a01–a50 -ylla/-vino) JU:n jonossa. "A AJETTU" → katso, vahvistetut LAV:lle
   (E1 löytyi listasta: a09 (-80,8; 294,2); M1/E4-alueen a08 (-117; 495), a11 (-115,8; 493,1), a12 (-106,8; 493,2) tarkista LAV:n
   koejuuri-m1-korjauksia vasten). Tiedosto lav-kohdat/A-suodatettu.txt; rivi n = aNN.
3. **B1-korjaus**: vapaan tilan botti maalia kohti (BFS-etäisyys kulkukartalta Taso1.Maali 6.4,-190.7; ehdotus B1-SYY.txt) +
   Peli-testi (JuoksuReittivalintaTestit.OikeaVerkko-malli; MK_JUURI symlinkeillä: kk-pohja-v1d-pk8, kielletty-rakennukset-v127,
   kielletty-tausta-v132, osamallit791-v10, palatsi-esto-v40 _valmiit-kansioista). Sen jälkeen eteläosan kartoitus botilla uudelleen.
4. **v133 junassa** (LAV ilmoittaa) → kulkukartta_ajo.py ... --vie uudelleen (kuten v132, loki kulkukartta/v1NN.log) + esto:
   M1 raja x −87,3 → −88,7 (z 472,7…489), E4 rajat (B:n itäseinä −89,4/−89,5, z 493,8–496,4; C:n länsiseinä −85,05/−85,3, z 484–492,4).
5. ENNALLAAN: isolla iPadilla aukiovideo (kulkukartta/sk-ipad-aukio-v129d-2.txt, vanha backup osa9-kulku-v129) ja renkaiden uusinta.

Ei uusia lupia. Asemataulu jäädytetty (ei päivitetty).
