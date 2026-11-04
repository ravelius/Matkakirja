# Valosepän luovutus 4.11.2026 klo 15.57

Syy: konteksti yli pehmeän rajan (Raamattu 7.37). Edellinen: viesti-valoseppa-luovutus-20261104-1530.md (LISÄYS 1–2; haarat, 15/16-hypoteesi, havainnot); lue se ensin. Loki: /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md.
Kaikki tämän session tulokset: _tyo/linssiseppa2/pariisi-tyyli/striimi/muisti-484adb22f/TULOS.md, mittausskriptit samassa kansiossa mitat/ (g5.py ja g4.py ajetaan `python3`:lla, scipy tarvitaan).

## Tehty tässä sessiossa
- k45 484adb22f: 3781 Mt, 0 varoitusta. p-z10 täysikoossa ehjä. p-z9:stä täysikoossa vain alapalat; muut kallistetut puolikoossa, joten niiden saumoista ei väitettä. p-z11–p-z14 katsomatta.
- UUSI, avoin: h-z13 k45:ssä suora vaakasauma veden yli, rivit 840–844, vesi yllä 192,181,136, alla 177,173,141. Syy mittaamatta. k45-h-z13-sauma-*.png. Mainittu PT:lle.
- 0°:n pari: rajat näkyvät ylhäältä varjon kanssa, eivät pois-tilassa, samoin 7f64cd657:ssa. PT ja KK saivat rivin. PT: "vanha vika ylhäältäkin, ei muistikorjauksesta".
- Taivaanraidat: väriportaat liukuvärissä. iPadilla sinisessä 5 arvoa. Ehdotus 32-bittinen HDR-puskuri, ei todistettu. Ei korjausta. PT:lle lähti.
- PT/KK: veneen reitti lukittu pohjoishaaroihin. Älä muuta.

## Työn alla (PT 15.5x): rajojen syy. Ei korjausta ennen KK:n sanaa. Tulos PT:lle JA KK:lle
PT:n kysymykset ja tila:
1. Ovatko rajat z11- ja z12-palojen reunoja? Välitulos: mittauksen mukaan eivät; oma LISÄYS 2:n arvaus ei saanut tukea. Mikä ne ovat, ei tiedossa. Varaukset TULOS.md:ssä (kalibrointi on sovitus, osa reunoista luettu silmin, z14 ei erotu). Välitulos on PT:llä, KK ei ole saanut sitä.
2. Korjaako pois myös 0°:ssa? Tasolla 9,02 yhdessä kuvassa kyllä. Muut tasot sarjasta.
3. Palaako 28.10.:n vika? Ei vielä vastausta. Vika: tasolla noin 9 Z9 ja Z10 vierekkäin, Z9 sumea neliö (8ac9ac545); tasolla 8,6 pehmeät lohkot alareunassa SSE 8:lla (5767441da). k0-teravyys-pois.png näyttää terävämmän suorakulmaisen keskialueen pois-tilassa (x noin 540 ja 2130), silmin k0-pari-C:ssä en näe sitä.

JU:lle pyydetty 15.56: striimi/sk-rajat-tasot.txt (484adb22f, 11 kuvaa). Kansio tulee JU:n rivinä; rivi tulee tähän sessioon.
Kun sarja tulee:
- Katso kukin varjo/pois-pari täysikoossa, ei terävyyskarttaa yksin. Erityisesti t86-pois alareuna ja t90-pois (28.10.:n vika).
- t90 | t90-sivu: sivusiirto 0,27° on noin 181 px. Pysyvätkö rajat samassa maantieteellisessä paikassa vai vaihtuvatko? Jos vaihtuvat, ne riippuvat kamerasta (palavalinta), jos pysyvät, ne ovat kiinni datassa tai kiinteässä ruudukossa.
- Sitten rivi PT:lle ja KK:lle: mitä rajat ovat, korjaako pois, palaako vika. Ei korjausta.
Jos syy ei ratkea kuvista: seuraava askel on lokitus Cesiumin valituista paloista; sellaista komentoa ei löytynyt koodista, ei tehty.

## Odottaa JU:ta (järjestys JU:lla)
- striimi-vesi 5c870d62a: vesi/reitti2/sk-vesi-reitti.txt. Koe, ei junaan. TULOS.md:n rivi PT:lle.
- ui-kerros 8fa059097: sk-ui-kerros.txt. Mac-lokin rivit "kerros ...", sitten 15/16-vastaus KK:lle (luovutus -1530, kohta 15/16). ÄLÄ poista peitettä ilman KK:n sanaa.

## Avoimet havainnot, joita ei ole pyydetty
- Vaalea puolisuunnikas p-z9:n oikeassa alakulmassa myös 45°:ssa. Syy mittaamatta.
- Violetit pisteet taivaalla myös 45°:ssa; korjausehdotus KS:lle kirjattu, en ole lähettänyt KS:lle mitään.
- Taivas on iPadilla noin 7 tasoa Macia kirkkaampi (sininen 220 / 213); liittyy mahdollisesti 15/16:een, kerroin tässä noin 0,967, ei 0,9375. Ei selvitetty.

## Jono rajojen jälkeen
PT:n järjestys pysyy: väri ja läiskät vasta muistin ja sauman jälkeen. Läiskien terävä reuna: luovutus -1217 LISÄYS 3, 6. sk-striimi-loput.txt muistin jälkeen.

## LISÄYS 1 (15.59; KK:n sana, korvaa "Työn alla" -kohdan suunnan)
Oma virhe: "pois-tilassa ei rajoja" ja "eivät osu ruudukkoon" olivat väärin. Korjaus TULOS.md:n lopussa. Rajat osuvat 0,1758°:n ruudukkoon eli maaston geometriapalojen reunoihin (KK:n malli, mitat/g6.py; 5/9 x ja 3/3 y; x 50, 1041, 1889, 2116 selittämättä). Kuvataso seuraa geometriapalaa (KarttaKerrokset.cs:107). Kuvatasoja ei mitattu lokista. Älä käytä mitat/g5.py:n kalibrointia. KK:n kuvat ja ruudukko.py: /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/kuvat/k0-20261104/ (mittaa terävyyssuhteen ruudukon viivan molemmin puolin).
KK 15.58, tiivistettynä:
- TAVOITE: tasoilla 8,5–10,5 pelaaja ei näe suoria rajoja eikä kartan vaihtumista kerralla. Yksi kartta joka kulmassa on ensisijainen.
- SANA: tee tasoista vierekkäin samannäköiset. Metsät ja läiskät tulevat esiin vähitellen usean tason yli (12.2x:n sana pienistä ruoho- ja pensasalueista pysyy). Tiet lähentyvät väriltään ja leveydeltään z10–z12 (k55:n heikkous 6). Rinnevarjon terävyysero pienenee. Tekotapa on Valosepän. LISÄYS 2:n z11-muutos ja uusi tyyliversio sallittu. z14–z16 ei muutu. Muistikorjaus 484adb22f ei muutu.
- k60:n "ei neliöitä" on samassa tilassa kuin pois: tarkista myös terävyys- ja tienväriportaista.
- NÄYTTÖ: ensin Macilta k55:n kaista z10–z14 ennen | jälkeen KK:lle. Sitten iPad-vuoro PT:n järjestyksessä: varjo / pois p-z10:ssä ja tasoilla noin 8,6, 9,5 ja 10,4, kulmat 0°, 19° ja 21°, sama rajaus, koko kuvat täysikoossa, ruudukkomitta mukaan.
- Lopuksi yksi suositus: pidetäänkö alle 20° varjo vai pois. Jos pois riittää, se poistaa vaihdon kokonaan.
JU:n sarja sk-rajat-tasot.txt on nyt "ennen"-mitta tasoilta; aja sille KK:n ruudukkomitta, katso koko kuvat täysikoossa molemmista tiloista.
