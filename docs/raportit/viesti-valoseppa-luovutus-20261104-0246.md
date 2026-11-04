# Valosepän luovutus 4.11.2026 klo 02.46

Syy: konteksti yli 25 % (pehmeä raja), luonteva tauko: k29 JU:lla. Edellinen: viesti-valoseppa-luovutus-20261104-0218.md (työkalut). Loki: /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md.

## Tila
- **k29 1a8f03720** (linssiseppa2/pariisi-k29-ns, wt /Users/Shared/Claude/wt/proto-linssiseppa2-k29, natiivi-backup, p29z, 611/611) = k28 + KK 02.38 kohdat 1–5. Lue pariisi-tyyli/k29/TULOS.md. Parit k29/pari-a-z15, pari-a-z13 (2029 | k29 | k28), rajaukset.jpg. Viety 02.45 PT:lle, KK:lle (jonossa) ja JU:lle (k29/ajo.zsh + sk-k29.txt).
- **k28 984342737** (linssiseppa2/pariisi-k28-ns, wt proto-linssiseppa2-koko17): JU ajaa L2:lla, ALKOI noin 02.34. ÄLÄ koske wt:hen proto-linssiseppa2-koko17 ennen JU:n riviä. k28 sisältää materiaalin, kadut, puistot, NS b70ee175a. Aamun varaversio, jos k29 ei käänny tai ehdi (PT 02.39). k26-varasuunta peruttu (KK 02.38).
- Linja KK 02.22 ja 02.38: KORJAUSLISTA.md kaksi viimeistä VS-osiota. Pintaa ei ole hyväksytty, ei junaan. Älä muuta katujen leveyksiä, materiaalia tai väriä k29-kierroksella. Talorivit ja kaupunginosat odottavat KS:n ja Codexin kolmea materiaaliarkkia; z13:n pehmeys ja tasoraja z15 | z16 katsotaan isolta iPadilta.

## Seuraavaksi
1. JU:n rivi: kuvat ja kääntövirheet VS:lle + PT:lle. Unity-käännös k23–k29 todistamatta. Katso kuvat ennen valmis-riviä; k-laaja 0,08 on KK:n vertailu, b-e NS:n häivytys.
2. Varmista ajosta (koealue tila + pyyntöloki, jos NS:ltä saa), millä tasolla peli näyttää 0,08:n: parit olettavat z15 ja z13.
3. NS: pystyreuna 2,4609, korjaus tulossa ehkä; pyysin SHA:n VS:lle ja PT:lle, jos JU ei ole aloittanut.
4. Avoin luovutuksesta 02.18: z12-ratapihojen kerma (Noisy-le-Sec, lon 2,4609). k28/k29:ssä z11–12 tulevat materiaalista, joten voi olla ratkennut tai muuttunut: katso e-0-13 JU:n ajosta.
5. Avoin: juovan L-ero KK:n mittarilla mittaamatta; isojen kattojen tiheys/km² mittaamatta; z13:lla Luxembourgin reikä yhä materiaalia (ei talodataa); muisti laitteella mittaamatta (materiaali 3,1 Mt + mipit).

## Työkalut
- Paikallinen: zsh k29/aja.zsh <tunnus> 15 13 [14 17]; parit: /Users/Shared/Claude/proto-3d/_tyo/venv-rembg/bin/python -I k29/parit.py <tunnus> (tässä venvissä scipy). Testit: sh Kartta-testit/kaanna.sh wt:stä.
- Materiaali: k28/tee-materiaali.py <2029.png> <ulos.rgb> <ulos.png> 1024; pelissä Assets/StreamingAssets/ElavaKoealue/pariisi/materiaali-2029.rgb. Koodi: ElavaTyyli.cs Materiaalista, KorttelinRajat, Juova, PalatsinPiha, PuistonLaidalla; ElavaKoealue.Pinta.Lue.
- Parit k28/k29 ovat KK:n kokeen mittakaavassa. Vanha k26/parit.py käyttää mallia, jossa 2029 on noin 2× suurennettu (ND-leveys, silmämääräinen): älä käytä.
- k27 1995696e2 ja de880e071 ovat välivaiheita, ei ajoon.

## LISÄYS 02.52 (OHITTAA ylemmän, jos ristiriita)
Linja nyt (PT): k28 aamuajon pinta, JU ajaa iPadilla k28; k29 Mac-esikatselu jonossa vertailuun, iPad vain jos KK pitää selvästi parempana. Kohta 3 (pystyreuna) vanhentui: oli Mac-harha.
**TEE, KUN TOTEUTUU:**
1. **PT:n rivi (KK:n valinta k28/k29 + NS:n iPad-todiste, noin 03.32, puhdas):** lähetä heti JU:lle ja PT:lle SHA + sk, viimeistään 03.45, aloitus viim. 04.00. k28 + NS f5c1f14b0 = 4d2c01ba1 (k30/ajo-k28.zsh, sk-k28.txt, p30a); k29 + NS = 542e5cbf6 (k30/ajo-k29.zsh, sk-k29.txt, p30b). wt /Users/Shared/Claude/wt/proto-linssiseppa2-k30. 612/612, Unityssä ajamatta. Ei väriä oletuksena.
2. **k28:n iPad-kuvat noin 03.20 (JU, L2):** mittaa katot samalla tavalla kuin Macista (rajaus 500–2300 × 300–1800, L < 175, mediaani, k28/TULOS.md) ja rivi PT:lle. Mac: 178–184/144–149/103–108, 2029 170/139/106. Väri valmiina: pariisi-k31-k28 78b3b4a31, pariisi-k31-k29 e90373a28 (materiaali × 0,93/0,96/1,03, k30/vari.py); päivitä kerroin iPad-mittauksen mukaan. KK päättää, oletus EI aamuun.
3. **Seuraava kierros (KORJAUSLISTA osio k24):** k32 e8ec53782 (pariisi-k32-k29) ratapihat vaaleammiksi; z15 katsottu, gdn-z17 katsomatta, L-mediaani 155–161 ja hajonta 41 mittaamatta. Länsiraja lon 2,223: ehdotin NS:lle (viesti jonossa) vyö 1 200 → 2 500 m, VS tekee, ellei NS toisin sano; ei tehty. Yhdistä väriratkaisu ja NS:n uudet SHA:t tähän.
wt-tila: koko17 vapaa (k28), k29 odottaa JU:n ajoa (ei saa koskea), k30 on haaralla pariisi-k32-k29.
