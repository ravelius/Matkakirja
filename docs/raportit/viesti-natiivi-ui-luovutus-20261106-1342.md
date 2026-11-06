# Natiivi-UI: luovutus 6.11.2026 klo 13.42 (pehmeä kontekstiraja, 7.37)

Korvaa -1331:n työlistan. -1306:n kohdat E, Havainnot ja Ei todennettu sekä -1150:n ja -1140:n avoimet ovat voimassa. Lukulista 7.47: lue itse. Raamatun luvut 4 ja 6 jäivät tältä vuorolta lukematta (Postivahdin aloitusviesti).

## Lue ensin
proto-3d/lokit/nui-ui-87b01563a/tulos-nui.md

## Tila
Worktree /Users/Shared/Claude/wt/proto-natiivi-ui-vesinimi, haara natiivi-ui/ui-sarja-219, kärki ec788abdf (peilissä natiivi-backup), ei muutoksia. Kääntämättä, ajamatta. Ei junaan ennen PT:n kuittausta. Ei omaa ajoa.
Korjaus: PiiloVartija kirjoittaa poistaessaan tyhjän listan Nullin sijaan, ja Palauta palauttaa vain, jos arvo on yhä tyhjä lista. Omistajan Null ja uusi suodin jäävät voimaan.
PT 13.4x, sellaisenaan: "saa korjata. Omaan haaraan, ei junaan ilman kuittausta. Pieni muutos vartijaan, ja tyhjän listan käytös UITK 6.3:ssa todennetaan lokista. Yksi pysty JU:lta (JU:n seuraajalta), lisäksi oma koe: lautapeli auki yli 2 s ja sulku, kuva yläpalkista ennen ja jälkeen, koska oikean pelin vika on vasta koodista päätelty. Tulos yhdellä rivillä; radiosta erikseen, jos jää."

## JU:n ajot (13.4x, JU lähettää rivit tähän sessioon)
1. Pysty x1 ec788abdf L1:llä ajossa: lokit/nui-ui-ec788abdf/pysty-keskitys-1.txt.
2. Lautapelikoe 87b01563a (ei korjausta), iPhone, L2: lokit/nui-lauta-87b01563a. KS 17:n ja NS Mac-7:n jälkeen.
3. Sama koe ec788abdf, L2: lokit/nui-lauta-ec788abdf.
Skenaario: lokit/nui-ui-ec788abdf/sk-lautapeli.txt; kuvat 1-ennen ja 2-jalkeen.

## Kun ajot ovat valmiit
1. Pystyn Unity-lokista: `grep piilovartija`. Odotus: "suodin ei palautettu, omistaja muutti", tai "suodin palautettu" arvolla "tyhjän listan laskettu 0". Kaatuminen RenderTreeCompositorissa tai laskettu 1 = tyhjä lista ei kelpaa, kerro PT:lle.
2. Kuvat täysikoossa: luento ja maakortti Ranska, kerroksen 15 pitää olla terävä. VIKA-rivit: ennuste 3 VIKAA pois, ei todistettu. Terävästä Ohita aiemmin dy +0,17.
3. Lautapelikoe: 87b01563a:ssa kuva 2 sumea = oikean pelin vika todistettu. Jos terävä, koodista päätelty vaikutus oli väärä, korjaa se PT:lle. ec788abdf:ssä kuva 2 terävä. Tarkista molemmista oleta-rivi (vartija ehti poistaa), muuten koe ei todista mitään. Kuvassa 1 pitää näkyä yläpalkki; `ui tavli valinta` ja `ui tavli sulje` luettu koodista, ajamatta.
4. Tulos PT:lle yhdellä rivillä; radiosta erikseen, jos jää 0 mitattuun (aito puute, -1306; rajaa 0,06 ei lasketa). Pysty x3 ja täysi 15 varauksen sarja vasta vakaan pystyn jälkeen.

## Todistui
Kerros 15 jää sumeaksi lautapelin jälkeen: Unity-loki -133057 rivit 2214/2227 (tavli), 2063/2076 (mylly); testissä tavli on juuri ennen maakorttia. Kuvissa kerros 15 sumea, Pulu ja ☰ terävät. Lokin "sumennus Ei: ei ehtoa" on tosi: rivi ei näe näitä suotimia. -1331:n oletus "suodin jää PaivitaKarttaUiSumennus:ssa" oli väärä.

## Notre-Damen nimi (PT 13.4x), vastattu PT:lle
Syy "nosto" (Nimikerros.cs:604): Q2981 on Pariisin kohdenostoissa, sijainnit.json; konsoli.txt:357 qid 11. Ei liity 3D:hen. Koodista ja lokista; "nimet etsi" ajamatta. Nostomerkkiä ei näy kuvassa, ajossa oli `ui lentopiilo`; että se selittää puuttumisen, on todentamatta.

## Ei todennettu
Vaikutus oikeaan peliin ja tyhjän listan käytös UITK 6.3:ssa (ajot edellä). Shakin polku lokista. Palaute-kuva: Lähetä ehdotus muste 0,00. Ohita y 116 / y 241.

## Muuta
Remote Control ei päällä: Postivahti pyysi, mutta työkalu vaatii omistajan oman pyynnön. Sama koskee seuraajaa.
Työlistan rivit ilman tuoretta tilannetta (hook): Nimet häipyvät horisontissa, Uusien 3D-kohteiden vaaleat kyltit, Palatsin sisätilat. En tiedä tilaa, en päivittänyt; tarkista, mitkä ovat NUI:n.

## Odottaa, aloittamatta
Tappien lasku vaakapuhelimelle kokeena omaan committiin, kun UI-sarjan pysty on vakaa (-1306, PT 13.1x): OpasValikko.cs:1836, tavoite tappi y noin 287-351; oikean tilan ajo vasta PT:n vuorolla Pariisin ja juoksupelin jälkeen; kuva KK:lle; kortti vain, jos vipua pitäisi siirtää.
