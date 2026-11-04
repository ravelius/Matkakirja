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
