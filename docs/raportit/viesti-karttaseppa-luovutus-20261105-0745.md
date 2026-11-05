# Karttaseppä: luovutus 5.11.2026 klo 07.45 (KS)
Syy: konteksti 26 % ja Mac-ajon odotus (7.37). Korvaa -0728:n jonon; sen ja -2256:n "Opit" sekä "Pohjan jatko" pätevät. Python: /opt/homebrew/opt/python@3.14/bin/python3 ilman -I:tä. A = /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/pariisi-alueet-20261104. C = /Users/Shared/Claude/proto-3d/_tyo/codex. Worktree /Users/Shared/Claude/wt/proto-karttaseppa-nd-kaanto-219, haara karttaseppa/nahtavyydet-219 (natiivi-backup), kärki 6b9788c79.

## ENSIN
1. **Vahti kuolee nollauksessa: käynnistä Monitor** (fetch origin claude/postilaatikko 60 s välein, /Users/Shared/Claude/wt/karttaseppa-postilaatikko). Käsitelty 0a96f9596 asti. Detached HEAD: ennen uutta postia `git checkout --detach FETCH_HEAD`.
2. Tarkista, onko Mac-ajo valmis: `lokit/julkaisija-louvre-otto2-6b9788c79` (proto-3d/lokit). JU kuittaa viestillä.
3. KK:lle lähti 07.4x arvio (jonossa, ei vielä luettu). Hänen vastauksensa voi muuttaa jonoa.

## KK 5.11. (viesti 07.3x, sitova; KK:n päätös omistajan puolesta)
Katsoi v1b:n neljästä suunnasta ja näyttää sen omistajalle viat mukana.
1. **UUSI OTTO KYLLÄ** (otto 2; jos ei korjaa, omistajalle ennen kolmatta). Kokemus: Louvren tunnistaa joka suunnasta ensin sinisestä pyramidista, neljä sivua näyttävät samalta rakennukselta. Kehä neljästä julkisivusta, pohjoissivulle ikkunat ja sama tumma katto kuin etelässä. Katto yksinkertainen, kattoikkunoita ei tavoitella (omistaja 21.24), piikit pois. Pyramidit erillisinä omalla materiaalilla. Korkeus sovitetaan pelissä ennen tilausta (omistaja: "saa olla suuri"). Jos korkeus ei yksin riitä, keskipaviljonkia saa madaltaa tai pyramidia siirtää: kerro kumpi + pelikuva KK:lle. Sininen kohti G:n 128/168/194, ei voimakkaampi (omistaja 21.49). **Uudet tilauskuvat KK:lle ennen Tripoa.**
2. **KYLTTI KYLLÄ.** Varmista syy lokista, sitten mallin oma nimi mallin viereen, kokonaan näkyvissä neljästä suunnasta. Koskee Notre-Damea, Louvrea, Sainte-Chapellea; muut nimet ennallaan. Pelikuvat KK:lle.
3. **Etelärannan rivit:** jätä, katsotaan uuden mallin kanssa.
4. **Pohjan laikka** erottuu ylhäältä (l-nd-ylhaalta): uuden mallin jälkeen yksi suositus ja pari KK:lle.
5. **Raja:** selvitä Mac vai laite; seuraava kuvasarja isolta iPadilta.

## Tehty (6b9788c79, kääntämättä, syntaksi tarkistettu csc:llä)
- **Oma nimi:** Nahtavyysalue.OmaNimenPaikka: mallin eteen kameran puolelle (sivu 0), sivuille, jos toinen malli tai ruudun reuna; ei mahdu → piiloon (syy "oma ei mahdu"). Nimikerros: r.oma ohittaa nosto- ja Peittaa-säännöt, Pakko, seuraa kameraa joka kuva. Malli.Qid: ND Q2981, Louvre Q19675, SC Q193193. Sivuriveistä vain paikka 0.
- **Syy:** koodissa kaksi estettä, Nimikerros.cs:605 (nosto) ja :674 (Peittaa). `komento nimet oma 0` kytkee uuden pois, joten sk:n `nimet etsi` -rivit näyttävät todellisen syyn. **Lue ne unity.logista ja kerro KK:lle.**
- **Pyramidit:** Malli.Pyramidit (koodiverkko, oma materiaali, kuva PyramidiKuva). `komento pyramidi korkeus x z puoli [paviljonki]`, `komento pyramidi vari r g b`. Paikallinen koordinaatisto (z = −glb z). PihaPois poistaa v1b:n leivotut pyramidit vain tässä kokeessa, joten pihassa voi näkyä reikiä; paviljongin madallus on vain kärkien leikkaus. Väri 115/157/192 on laskettu tavoittelemaan G:tä: mittaa kuvasta, korjaa komennolla.
- **Mitat v1b:** x ±430, z ±180, keskipaviljongit 240 (|x| < 60, |z| > 100), siiven harja 190, sisäpiha noin ±100, iso pyramidi (0, glb z −35), huippu 110. 45°:ssa paviljonki peittää keskeltä alle noin 110 m. Mittaus scratchpadissa: logiikka on korkeuskartta 40 m:n ruuduin.
- **Sainte-Chapelle 22c:** asennettu (A/louvre-21c-v1/asenna-malli.py <glb> <wt> <nimi>), C/pariisi-sainte-chapelle-20261104/sainte-chapelle-3d-v1/sainte-chapelle-3d-v1/. SHA ja UV ok (0 kolmiota pisteeseen (0,1), 49 pientä, 107 m²). Kaikki 7 kuvaa katsottu täysikoossa. Hyvä malli; KK:lle mainittu leveä vaalea harja ja katon juovaisuus. Skaala 0,59, Suunta 22 (itä +X → akseli 112°), paikka 475,502, Savy 1,2/1,35/1,3 (kirkon tasolle laskettu). **Tripolle ei vielä kuittausta: se tulee KK:n jälkeen.**

## Mac-ajon kuvat (sk-louvre-otto2.txt, A/louvre-21c-v1/sk-louvre-otto2-sovitus.txt)
p1 korkeus 220 keskellä; p2 130 + paviljonki 190; p3 130 siirto 150 länteen (x −150); p4 170 + paviljonki 200. Suunnat 0 ja 180, p2 ja p3 myös 90 ja 270. nd-sc-{0,90,180,270}, rinnan-{0,180}, ylhaalta.
**Kun tulee:** kuvat täysikoossa, syy lokista, yksi pyramidisuositus (arvio etukäteen: p2 tai p3; p1 neulamainen) ja pelikuvat KK:lle. Kerro kumpi, madallus vai siirto.

## Sitten: tilaus
Codex: uudet neljä julkisivua ja yläkuva, pohjoissivu ikkunoineen, tumma katto, EI pyramideja kuvissa, keskipaviljonki suosituksen mukaan. Kuvat KK:lle ennen Tripoa. Tripo: kehä ilman pyramideja, malli C/pariisi-louvre-20261104/TILAUS-21c-tripo.md, mukaan UV-oppi ja sahalaita. Kun malli tulee, PihaPois pois ja Louvren Savy uudelleen: täysi tasaus 0,52 × oletus harmaannutti aiemmin pyramidin, nyt pyramidi on erillään, joten kivi voidaan tasata kirkon tasolle. Sitten laikka ja eteläranta (KK 3–4).

## Raja: tulos (KK:lla)
Sama sha 8be6819db, sama k-013: Macilla raja ja karkea kartta (lokit/julkaisija-nd-puut-8be6819db/k-013-puut.png), iPadilla ei (julkaisija-nd-ipad-8be6819db/k-013.png). Syy: laattatarkkuus seuraa pikselikorkeutta (LiikeLaatatPaatos.cs), Mac 480, iPad 2048; ei mitattu erikseen. 0,06-näkymä iPadilta puuttuu: sama sk iPadilla pyydetty JU:lta "kun mahdollista" (rinnan-0). JU:n iPad oli "Ei nyt".

## Avoin
- Pont Neufin pohjan liitos (12 m:n porras, -2256) katsomatta täysikoossa.
- SC:n pohja: oma paikka ND:n pohjaan, kun koko nähty pelissä.
- Merkki/rengas s-090:ssä tarkistamatta.

## Jono ja odottavat (ennallaan)
Seis ilman sanaa: tasankopoltto (PT); nimet 79186922b ja ed711573d kääntämättä (tässä haarassa ei ole "kokonaan ruudulla" -sääntöä); Karsi, Vincennes, Boulogne, minor-nimet ja puut 43ba52fe7 odottavat pelikuvia. D iPad JU:lta. Eiffel oma kortti (2.92). Muistilukuja ei (2.207).

## Opit
- Macin kuvat antavat 480 px:n laattatarkkuuden: raja ja karkea kaukokartta eivät ole vika, vertaa iPadiin ennen selvitystä.
- Korkeutta sovitettaessa laske ensin peittävän osan korkeus kameran kulmasta ja pihan syvyydestä: se paljasti, ettei korkeus yksin riitä.
- Mallin nimi piiloutuu aina omaan ruutulaatikkoonsa, jos paikka on mallin keskellä.
