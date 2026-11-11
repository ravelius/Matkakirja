# Pelikoodari: luovutus 11.11.2026 klo 11.27 (konteksti 25 %)

Edellinen: viesti-pelikoodari-luovutus-20261111-1000.md (c504db1c7). TÄMÄ KORVAA SEN JONON.
Seinätyön työkansio /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/seinat-taso1/. B1-kärki bcf32314c (pelikoodari/seinat-taso1, natiivityöpuu
/Users/Shared/Claude/wt/proto-pelikoodari-juoksu; natiivirepolla ei originia, älä pushaa).

## PT 11.09 (omistajan päätös PT:n välittämänä): juoksupelin peruskorjaus
Kesken olevat loppuun (v133:n kulkukartta, seinäkartoitukset). EI uusia juoksupelin ominaisuuksia eikä kamera- tai dronetöitä ilman KK:n määrittelyä.

## TEHTY tällä vuorolla (kaikki raportoitu)
- V (koejuuri-m1 vs. v132): kansilaatta poissa 12/16 kohdasta → m1-varmistus/V-TULOS.txt (+ LAV:n vastaus lopussa). LAV tekee tee_a2.py:n
  (a22/a34/a35), a36 = kivireunus (ei vika), a41/a20 mika-rivit LAV:n aja-a2.zsh:ään. PUUT ei vika (lahipuut v15 vs. v17).
- ETELA2: B1-botti pääsi maalikujalle 121 s:ssa (vapaassa palatsissa ei ole maaliviivaa, BottiPerillaM 15 m → heiluu, suunniteltua).
  etela2/LISTA3.txt: F1–F3 LAV:lle (otettu v133:een, mika-rivit aja-a2:ssa), F4 pois. HUOM: paikka-rivi tulee 3–7 m kuvan jälkeen;
  lokin "suunta" on x-peilattu pohjakoordinaatteihin nähden (kerrottu LAV:lle).
- P11d2 osa 8 iso iPad: tekninen ok, kynnysviestejä 0 → lokit/pk-osa8-ovet-3eb33531c-ipad-3/PK-TULOS.txt. PT kuittasi osan 8.
- Aukioajo v133 valmisteltu: _tyo/pelikoodari/kulkukartta/sk-ipad-aukio-v133.txt (= v129d-2 + osa 8: konsolissa 0 riviä
  "juoksupeli: kynnysviesti", kuvissa a4/a5 ei huutoa; PT pyysi tämän kohdan kulkukarttaajoon).

## JONO
1. **KAMERALAITE PALA 1** (PT 11.2x, KK:n tehtävänanto; sitova rajaus, lue kokonaan):
   /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261111-kameralaite-pala1-tehtavananto.md
   (tausta: -kameralaite-maarittely.md luvut 1–5 ja 9b). Worktree LUOTU: /Users/Shared/Claude/wt/proto-pelikoodari-kameralaite,
   haara kameralaite/pala-1 (a61a98089 = julkaisija/juna-224). Ei muutoksia vielä.
   **ODOTTAA KK:n vastausta** kolmeen kysymykseen (lähetetty 11.2x KK:lle local_d5f31591…):
   (1) testi 1:n raja 6 × PaikkaS ei täyty: kaksoisseuranta (kumpikin PaikkaS/2, w = 1/τ) asettuu 1 cm / 1 cm/s ajassa 7,5 × ilman
       rajaa, 8,0 × tanh-rajalla → ehdotus raja 8,5 ×; (2) tanh hidastaa myös alle rajan (14·tanh(10/14) = 8,6) → ehdotus
       u/(1+(|u|/V)^4)^(1/4); (3) testi 9 tarvitsee kiihtyvyys- ja nykäysrajan → ehdotus KameraTyyliin tarkastusarvot
       KiihtyvyysMax/NykaysMax (PELI 25 / 160, MUSEO 3 / 12). Simulaatio: _tyo/pelikoodari/kameralaite-sim.py
       (PELI 10 m: vmax 8,6, amax 18,9, jmax 122; MUSEO: 2,0 / 1,6 / 7,4).
   Toteutuksen suunnitelma (luettu koodi): KameraAsento/Kulmat/V3 (Kamerajohtaja.cs, Dioraama/V3.cs: yaw 0 = −Z, 90 = +X, pitch + ylös,
   roll + = myötäpäivään = oikea olka alas = kaarre oikealle, kuten Lentokaari.Kallistuskulma ja KameraKirjoittaja AngleAxis(−roll, forward)).
   - Aika: kiinteä ruudukko 1/120 s + kertymä, tulos interpoloidaan kahden viimeisen ruudukkotilan välillä (rata riippuu vain ajasta).
   - Paikka: vaihe 1 sisäinen nopeus u (jousi kohti tavoitetta), s etenee kyllästetyllä nopeudella; vaihe 2 jousi p → s + tyonto(p).
     Nykäys analyyttisesti: w²(v_s − v_p) − 2w a_p.
   - Katse: katsepiste samalla kaksoisseurannalla (KatseS/2 per vaihe); yaw/pitch Kulmat.Yaw/Pitch(K − P); alle 5 cm → edellinen suunta.
   - Rulla: yksi Jousi (Liikepohja.Jousi), τ = RullaS kun |tavoite| > |rulla|, muuten RullaPalautusS. Kuvakulma: yksi Jousi FovS.
   - Kameratarkastus.cs: KameraRajat + Nykays, Rulla (oletus ∞ → vanhat testit ennallaan), KameraRaportti + MaxNykays, MaxRulla.
   - Testit: Linssit-testit/kaanna.sh KameralaiteTestit (kehys [Testi], Oleta.Tosi/Sama; Ajuri.cs). Testi 4: katse kameran korkeudella.
   Valmis = testit vihreinä (komento + tulos), git diff --stat, commit-sha KK:lle ja PT:lle. EI junaan.
2. **v133 junassa** (LAV ilmoittaa) → kulkukartta_ajo.py … --vie uudelleen (kuten v132, loki kulkukartta/v1NN.log) + esto:
   M1 raja x −87,3 → −88,7 (z 472,7…489), E4 rajat (B:n itäseinä −89,4/−89,5, z 493,8–496,4; C:n länsiseinä −85,05/−85,3, z 484–492,4).
   Sitten aukioajo sk-ipad-aukio-v133.txt isolla iPadilla JU:n vuorolla.
3. LAV:n aja-a2.zsh (JU) valmis → vertaa m1-varmistus-kuviin kuten V (a22/a34/a35/a41/a20 + F1–F3:n mika-osumat LAV:lle).
4. B1-korjaus (bcf32314c, vain QA-botti) junaan vain PT:n päätöksellä.

Ei uusia lupia. Asemataulu jäädytetty.
