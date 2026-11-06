# Lavastajan luovutus 6.11.2026 10.21 (seinät aukkoihin) — LUE TÄMÄ KOKONAAN

Pohja: -1004:n (c7acff05c), -0939:n, -0920:n ja -0905:n Opetukset ja Työkalut pätevät. Tila ja järjestys korvattu tällä. Työkansio A = /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/muuri/aukot. Loki: muuri/KORJAUS.md (lopussa VIENTIEHTO ja 10.2x). Luovutus kontekstirajan takia (31 %). EI VIENTIÄ.

## Vientiehto (KK PT:n kautta 10.1x, kirjattu lokiin)
7 seinää + 3 raon tukkoa + 5 friisiä. 2 pätkää ja 7 muuta pois. Ennen vientiä kuvalla: (-144,4), (-133,4), (204,7; 517,0), tuoreet viat (-113,1) ja (-95,2; 345,5).

## Tila
Uusin juuri `koejuuri-aukot11` = aukot10 + tukot. `koejuuri-aukot10` = aukot9 + 7 seinää.
- 7 seinää rakennettu, kuvat-sa ja -sb katsottu 2000 px:n koossa: kaikki sulkevat linjan. Saumoja EI katsottu täysikoossa. (-100,2):n päät eivät ole kuvassa. Friisiä ei yhdessäkään.
- Korkeudet käsin, koska suunnitelman automaatti oli väärä: (-120,8) 4,3 (sokkeli 1,1), (-81,1) 14,9 (varakorkeus 3,8), (-100,2) 4,95, (155,1) 4,1-5,05. (-81,1) ja (-100,2) siirretty naapurin tasoon -0,215.
- TUKOT: portteja ei ollut yksi vaan KOLME per rakennus: seinät loppuvat noin 1-1,4 m ennen toista seinää. (206): lounas, kaakko, koillinen. (163): luode, lounas, kaakko. (204): luode, kaakko, koillinen. Nähty kuvissa 6; (206) koillinen, (163) luode, (204) luode vain mittauksesta (mittaa11.py). aukot11:ssä 12 jatkopalaa (seinä jatkuu omassa tasossaan kulmaan). Friisi 6:ssa, 6:ssa ei, koska seinälläkään ei ollut. KUVIA EI KATSOTTU.

## JU:lla, L1, 35140432d, b7 (viesti lähetetty, kuittaus tulee sinulle tai Postivahdin kautta)
- aja-aukot10u: kuvat-u, vientiehdon tarkistukset: u--144p4-sisalta, -pohjoinen, u--133p4, u--113p1-vika, u--95p2-vika. Kamerat käsin arkista.
- aja-aukot11a: kuvat-va (5 tukkoa). aja-aukot11b: kuvat-vb (3 näkemätöntä kulmaa, (204) kaakko, (-100,2) itäsauma).

## Seuraajan järjestys
1. Katso kuvat-va, -vb, -u. Tarkista 404-rivi (5 tuttua) ja "tarkastelu: alku". Jos kulma on väärin tai yläreuna jää auki, korjaa tee_aukot11.py:n JATKOT tai korkeus, uusi juuri aukot12.
2. Täysikoossa saumat: 7 seinää ja tukot. (-185,9):n yläpäässä kuvassa takaseinän friisi pilkistää seinän takaa, arvioi.
3. Päätä seinien friisi: yksikään seitsemästä ei saanut. PT:n ehto koskee 5 friisiä (aukot8:n), mutta pelkkä punainen näkyy katon alla.
4. Kun juuri on valmis: rivi PK:lle: hän ajaa kartan ja rajat uudelleen. PK:lle myös: 2 pätkää pois (KK), ja rakennuksilla kolme porttia.
5. -0939:n kohdat 5-6: friisien saumat, paljaan taustan näkyvyys (54,8), (154,7), kaista (-251,8) v115- ja v124-juurissa, pari PT:lle, yksi vienti, PK vahvistaa viittaukset.

## Opetukset
- Suunnitelman `yla` = ensimmäinen osuma ylöspäin tai varakorkeus lattia + 3,58. Se ei kerro seinän korkeutta. Säteet eivät näe kattoa kaikkialla: katso naapurin yläreuna.
- Kartan portti ei kerro rakojen määrää. Seinien päät tasoittain (mittaa11.py) kertovat suoraan.

## Työkalut (A/), uudet
mittaa10.py, 10b, 10c (korkeudet, kattosäteet), mittaa11.py (seinätasot ja päät), tee_aukot10.py, tee_aukot11.py (argumentti `kuiva` tulostaa palat rakentamatta), tee_sk10t.py, tee_sk10u.py, kirjaa_v.py. rakenna7.py sai lipun `yla_kasin` (ohittaa tasauksen; vanhoihin suunnitelmiin ei vaikuta).
