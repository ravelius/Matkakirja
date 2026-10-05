# Linnan kevennys junaan 143 — mittaukset ja ehdotus (Linnanrakentaja 5.10.2026 04.15)

Päätoimittajan pyyntö 5.10.: junan 143 Volume, tilt-shift ja bloom vievät GPU:ta, eikä fps saa laskea junan 142
tasosta. Mittasin linnan kolmiot ja piirrot näkymittäin ja ehdotan kevennyksiä. **glb:itä ei ole muutettu.**
Aineisto, kuvat ja skriptit: `/Users/Shared/Claude/proto-3d/_valmiit/linna-laatu/kevennys/`.

## 1. Mitä yksi ruutu piirtää nyt (täysi laatu, A17 Pro ja uudemmat; BUILD 141:n koodi)

| Osa | Kolmiot | Piirrot | Huomio |
|---|---|---|---|
| Ulkokuori, huippu | 1 398 447 | 1 | Yksi mesh ja Cull Off. LODGroup vaihtaa kevyeen vasta yli ~1,4 km:ssä, joten huippu piirretään aina. |
| Vesiheijastus (0,5 × resoluutio) | ≈ 1,4 M + tilat + hahmot | ≈ sama kuin pääkuva | Toinen koko näkymän renderöinti, eikä LOD-tasoa pudoteta. |
| Leivotut tilat (7 kpl) | 183 367 | 7 | Kaikki aktiivisina kaikissa näkymissä. |
| Maasto, huippu | 376 330 | 4 | |
| Hahmot 3D (17 esiintymää) | ≈ 154 000 | ≈ 190 | 9–15 osaa ja 6–8 materiaalia per hahmo. Hahmot heittävät varjoa, joten varjokierros tuo noin 190 piirtoa lisää. |

Kuoren kolmioista näkyy oikeasti vain osa (kolmio-ID-renderöinti, iPad 2048 × 1536):

| Näkymä | Ruudussa | Näkyy pikseleinä | Pikseliä per näkyvä kolmio |
|---|---|---|---|
| Yleis 150 m | 1 053 843 | 325 007 (23 %) | 6,8 |
| Lähin zoom 67,5 m | 335 686 | 105 851 (8 %) | 29 |
| Keittiö 16 m | 317 940 | 7 740 (0,6 %) | 406 |

Yleisnäkymässä huipun mediaanikolmio on iPadilla noin 5 px² ja iPhonella noin 3 px². Kolmiot ovat siis
pikseliä pienempiä. Se on raskasta laattarenderöinnille ja myös itse heijastuskierrokselle.

## 2. Ensin kaksi mittausta laitteella (Siirtoseppä, junan 143 tehosteet päällä)

Kolmioiden karsinta auttaa vain, jos geometria on pullonkaula. Volume, tilt-shift ja bloom kuormittavat
pikselitäyttöä, eikä kolmioiden karsinta poista sitä kuormaa. Nämä kaksi mittausta ratkaisevat, kumpi pullonkaula on:

1. `poikki vesi heijastus 0`: GPU-ruutuaika ennen ja jälkeen. Tämä mittaa heijastuskierroksen hinnan.
2. `poikki kuori kevyt` (188 k): GPU-ruutuaika ennen ja jälkeen. Tämä mittaa kuoren geometrian ylärajan.

Jos kumpikaan ei palauta junan 142 ruutuaikaa, säästö on haettava tehosteista, esimerkiksi bloomin
resoluutiosta tai Volumen näytemäärästä, eikä linnasta.

## 3. Ehdotukset hyötyjärjestyksessä

| # | Ehdotus | Säästö per ruutu (yleis, iPad) | Kuka / mitä muuttuu | Kuvamuutos |
|---|---|---|---|---|
| A | Heijastuskierros kevyellä kuorella: `QualitySettings.lodBias` pieneksi `SubmitRenderRequest`in ajaksi ja sen jälkeen takaisin. Tilat pois heijastuskameran `cullingMask`ista (laituria lukuun ottamatta). | ≈ −1,2 M kuoren kolmiota ja −0,15 M tilojen kolmiota heijastuksesta | Siirtoseppä, natiivi. glb ei muutu. | Hyvin pieni: heijastus on puolella resoluutiolla ja vesinormaalien vääristämä. |
| B | Kolmas LOD-taso täyden laadun laitteille: huippu, kun kamera on alle noin 100 m:ssä; normaali (478 k), kun kamera on kauempana, esimerkiksi yleisnäkymän oletuksessa 150 m:ssä. | −0,92 M (1,40 → 0,48 M) yleisnäkymässä | Siirtoseppä, natiivi (LODGroup 3 tasoa). normaali.glb on jo paketissa. Ladattavaa tulee +33,6 Mt, ja mesh vie muistia arviolta +15 Mt. | **Hylätty 5.10.** B-stillit/ (100–150 m, iPadin pikselit): normaalissa räystäiden repeämiä, muurinharjan saumaviivoja ja kattojiirin halkeama. |
| C | Yleisnäkymässä tilat pois näkyvistä, kun kuori peittää ne lähes kokonaan: keskushalli, fatabuuri ja keittiö sekä niiden 9 hahmoa. | −87 k kolmiota ja noin −100 piirtoa, varjokierroksen kanssa noin −200 | Siirtoseppä, natiivi (tilat aktiivisiksi vasta saapuessa) | Ei näkyvää muutosta. 164 yleiskameran otoksessa keskushallista näkyi enintään 4 px, fatabuurista 3 450 px ja keittiöstä 4 000 px kuoren raoista. |
| D | Hahmojen osat yhdeksi meshiksi ja yhdeksi materiaaliksi (atlas), ja varjo pois yleisnäkymässä, jossa hahmo on noin 30 px korkea. | noin −170 piirtoa ja varjokierroksesta noin −190 | Hahmojen tekijä (glb-muutos) + Siirtoseppä | Ei näkyvää muutosta |
| E | Kuori 6 × 4 lohkoon, jolloin näkökartion karsinta toimii. | Lähin zoom 1,40 → 0,97 M (−30 %), keittiö 1,40 → 1,05 M (−25 %), yleis 0 | Linnanrakentaja (glb) + Siirtoseppä (Kokoa ei yhdistä lohkoja) | Ei näkyvää muutosta. +23 piirtoa samalla materiaalilla (SRP Batcher). |
| F | Kuoren piilopinnat pois. 900 sallitun kameran otoksessa (yleis vaaka/pysty 360°, 8–70°, 0,45–1,8 ×; 7 tilakameraa ±55°, 6–65°, 0,55–1,6 ×) jäi näkemättä vain 89 459 kolmiota (6,4 %), kun kaksi naapurirengasta on laajennettu ja tilojen leikkauslaatikoille on jätetty 10 m:n suoja. | −6 % kaikissa näkymissä | Linnanrakentaja (glb) | Ei näkyvää muutosta. Punaiset alueet: piilo-*.png. |

**Suositus: A ja C ensin**, jos laitemittaus 2.1 näyttää, että heijastus maksaa. Ne ovat pelkkiä natiivimuutoksia,
eivät muuta kuvaa eivätkä pakettia, ja ne vievät yleisnäkymästä noin 1,4 M kolmiota ja noin 200 piirtoa.
B hylättiin stillien perusteella 5.10. Jos kuori-mittaus 2.2 näyttää geometrian maksavan vielä A:n ja C:n jälkeen,
tilalle tehdään uusi välitaso (~0,8 M), jonka harvennus säilyttää reunat ja UV-saumat (glb-työ junan 143 jälkeen).
Päätoimittaja hyväksyi A:n ja C:n 5.10. Siirtosepän toteutettaviksi, kun laitemittaukset ovat osoittaneet tarpeen. D, E ja F ovat pienempiä ja vaativat glb-muutoksen, joten ne jäävät junan 143 jälkeen.

## 4. Menetelmä

- Kuoren näkyvyys: `nakyvyys.py` renderöi jokaiselle kolmiolle oman värin (Cycles, 1 näyte, Cull Off kuten
  DioraamaKuori.shader) ja laskee kuvassa näkyvät kolmiot. Kamerat on muunnettu pelin kaavalla
  (rakennus.json kohde/atsimuutti/korkeus/etäisyys/fov; rajat DioraamaData.Kierto.OletusYleis/OletusTila).
- Piilopinnat: `piilo.py`, joka käyttää näkyvien yhdistettä, kahta naapurirengasta ja leikkauslaatikoiden suojaa.
- Lohkot ja LOD: `lohkot.py`, karkein taso jonka mediaanikolmio on enintään 16 px² laitteen ruudulla.
- Tilojen peitto: `objektit.py`, tasaväri-ID per glb.
- Natiivin piirtojoukko luettiin BUILD 141:n koodista (Proto 5a0b9add): DioraamaUlkokuori, DioraamaRakennus,
  DioraamaYmparisto ja DioraamaHahmot3D.
