# Lavastajan luovutus 6.11.2026 10.41 (seinät aukkoihin) — LUE TÄMÄ KOKONAAN

Pohja: -1021:n, -1004:n, -0939:n, -0920:n ja -0905:n Opetukset ja Työkalut pätevät. Tila ja järjestys korvattu tällä. Työkansio A = /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/muuri/aukot. Loki: muuri/KORJAUS.md (lopussa uusin). Nollaus Postivahdin pyynnöstä. EI VIENTIÄ.

## Vientiehto (ennallaan)
7 seinää + 3 raon tukkoa + 5 friisiä. 2 pätkää ja 7 muuta pois. Kuvalla ennen vientiä: (-144,4), (-133,4), (204,7; 517,0), tuoreet viat (-113,1) ja (-95,2; 345,5). Nämä on nyt kuvattu ja katsottu, tulokset alla.

## Tila
Uusin juuri `koejuuri-aukot12` = aukot10 + 12 korjattua tukkopalaa. Rakennettu 10.34 (rakenna12.log, exit 0). Kuvia ei ole vielä, korjausten vaikutus todistamatta.
kuvat-va, -vb, -u katsottu 2000 px:n koossa, neljä saumaa täysikoossa (404: 5 tuttua, "tarkastelu: alku" kaikissa). Viat aukot11:n tukoissa ja korjaukset (tee_aukot12.py, rakenna8.py):
- Läpinäkyvä rako loivasta suunnasta, (206) kaakko ja (163) lounas: pala 3 cm seinän takana -> etupinta 5 mm seinän eteen, limitys 15 cm.
- Punainen raita sokkelissa: jalka 9 cm sokkelin takana -> jalka sokkelin tasoon.
- Venynyt kivikuvio: UV lähimmästä kolmiosta -> saman tason kolmiosta.
- Tummat kulmat: yksi valo-UV seinän kärjestä -> seinän oma valokenttä korkeuden mukaan.
- Kivilaikku (206): jalka 0,58, seinä alkaa 0,30 -> jalka seinän alareunaan.

Ei korjattu, arvioi kuvista: (163) luode: sokkelin kiila ja punainen tolppa marmorin edessä (jalka nyt kiveä 0,46:een, katso); (204) koillinen ja (163) kaakko: korkea kulmaevä nousee matalamman seinän ja katon yli; L-kulmien ulkoreuna.

## Vientiehdon kohdat
- (-144,4): seinä ehjä kahdesta suunnasta. Sisäkuvassa katon alla kaista taivasta, korkealla, ei tutkittu.
- (-133,4): pelkkä seinä lähietäisyydeltä, ei aukkoa näkyvissä; ympäristö ei näy, heikko todiste.
- (-113,1): kiila näkyy. Alueen V4_lattia, kivireunus, sokkeli ja punainen samat kuin vienti v115 (tarkiste): vanha vika, ei täytteiden. Korjaamatta.
- (-95,2; 345,5): vinot palat näkyvät. V4_lattia 121 kolmiota viennissä, 120 aukot12:ssa; yhteyttä vikaan ei selvitetty. Kuvan oikean reunan säteet eivät osu tausta-lod0:aan, se osa tulee muusta paketista, ei selvitetty. Korjaamatta.
- (204,7; 517,0): kolme kulmaa kuvattu, viat kuten yllä.
PT:lle ei ole vielä kerrottu näitä tuloksia: tee se seuraavan rivin yhteydessä.

## JU:lla, L1, 35140432d, b7
Pyydetty 10.35: aja-aukot12a.zsh, aja-aukot12b.zsh -> kuvat-wa, kuvat-wb, 5 kuvaa kumpaankin, samat kamerat kuin va ja vb. Kuittausta ei ole vielä tullut; tarkista kansiot, jos riviä ei tule.

## Seuraajan järjestys
1. Katso kuvat-wa, -wb 404-rivin jälkeen. Vertaa samoihin kuviin kuvat-va, -vb. Jos vika jää, korjaa tee_aukot12.py, uusi juuri aukot13.
2. Täysikoossa saumat: tukot ja 7 seinää. (-185,9):n yläpäässä takaseinän friisi pilkistää, arvioi.
3. Päätä seinien friisi: yksikään seitsemästä ei saanut. PT:n ehto koskee 5 friisiä (aukot8:n), mutta pelkkä punainen näkyy katon alla.
4. Kun juuri on valmis: rivi PK:lle: hän ajaa kartan ja rajat uudelleen. PK:lle myös: 2 pätkää pois (KK), ja rakennuksilla kolme porttia.
5. -0939:n kohdat 5-6: friisien saumat, paljaan taustan näkyvyys (54,8), (154,7), kaista (-251,8) v115- ja v124-juurissa, pari PT:lle, yksi vienti, PK vahvistaa viittaukset.

## Opetukset
- Täytteen etupinta seinän taakse jättää raon loivassa kulmassa, vaikka limitys on olemassa. Etupinta seinän eteen.
- Sokkeli on 6 cm seinän edessä useimmilla seinillä, ei kaikilla: (204) W ja S -0,01. Mittaa seinäkohtaisesti.
- Valo-UV: eri kolmiot voivat olla eri saarilla, joten näytteet yhdestä kolmiosta.

## Työkalut (A/), uudet
mittaa12.py (seinien päät, tasot, valo), mittaa12b.py (säde kuvapikselistä: kameralista tiedoston alussa), tee_aukot12.py (argumentti `kuiva` tulostaa palat rakentamatta; kirjoittaa rakenna8.py:n), rakenna8.py = rakenna7.py + jalka_kasin ja uv1_jatko, suunnitelma12.json.
