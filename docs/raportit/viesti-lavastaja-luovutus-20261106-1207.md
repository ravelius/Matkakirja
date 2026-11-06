# Lavastajan luovutus 6.11.2026 12.07 (seinät aukkoihin + ovien UV) — LUE TÄMÄ KOKONAAN

Pohja: -1141:n, -1041:n, -1021:n, -1004:n, -0939:n, -0920:n ja -0905:n Opetukset ja Työkalut pätevät. Tila ja järjestys korvattu tällä. Työkansio A = /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/muuri/aukot. Loki: muuri/KORJAUS.md (lopussa uusin). Luovutus kontekstivahdin takia (29 %). EI VIENTIÄ.

## Vientiehto
7 seinää + 3 raon tukkoa + 5 friisiä. 2 pätkää ja 7 muuta pois. Lisäksi rakennukset-v127 (ovien UV) kulkee saman vientiehdon mukana (PT 12.0x): ei vientiä erikseen, PK vahvistaa viittaukset ennen vientiä.

## Tila
1. koejuuri-aukot14: kuvat-ya, -yb katsottu (JU, 35140432d, 404: 4 tuttua). Neljä korjausta poissa täysikokoisissa pareissa: (206) lounas, (206) koillinen, (204) kaakko, (163) kaakko. Kaikki 10 kuvaa katsottu 2000 px:n koossa. Täysikoossa vain nämä neljä rajausta; 7 seinän saumoja ei ole katsottu täysikoossa.
2. Ovien UV (PT:n pyyntö): rakennukset-v127 tehty, _valmiit/juoksupeli-kk-lavastaja-rakennukset-v127-vienti-20261106. v118 + 11 glb:n UV-tavut, 626 tiedostoa, SHA tarkistettu. EI viety. Pohja v118, ei sisällä v126:n terassimuutoksia.
3. koejuuri-ovi1 = aukot14, jossa v118:n nimellä v127. JU:lle pyydetty 12.06: lav-aja.zsh <linja> ovi1 35140432d 3 -> kuvat-ovi1 (ovi-qianqinggong, ovi-taihedian, ovi-baohedian). Kuittaus tulee sinulle. Tarkista kansio, jos riviä ei tule.
Vaikutus pelissä todistamatta.

## Seuraajan järjestys
1. Lue Raamattu 7.47.
2. kuvat-ovi1: 404-rivi ensin (odotus 4 tuttua). ovi-qianqinggong täysikoossa vs. proto-3d/_tyo/linssiseppa2/raystas/kuvat6/rs-korkea-halli.png (sama kamera, x 340-700 ja 1480-1830, y 620-1060). Taihedianin ja Baohedianin kamerat on arvattu mallin koordinaateista: jos kuva ei näytä kohdetta, sano se, älä päättele siitä mitään. PT:n raja: enintään 3 kuvaa.
3. Tulosrivi PT:lle: v127, kuvien polku, Taihedianin 4 jätettyä kolmiota, friisipäätös ja kuvat-ya/yb:n tulos. PT:lle EI ole vielä kerrottu aukot14:n tulosta eikä friisi 7 seinään -päätöstä EI (mittaa13.py, peruste -1141:ssä).
4. Täysikoossa 7 seinän saumat. Tee uudet kuvat vain, jos on syytä.
5. PK:lle rivi, kun juuri on valmis: hän ajaa kartan ja rajat uudelleen; 2 pätkää pois (KK); rakennuksilla kolme porttia; rakennukset-v127 viitteenä, RakennusKansio v118 -> v127 hänen vahvistuksellaan; v126:n terassi ei ole v127:ssä, joten PK:n kanssa sovittava, kumman päälle lopullinen tehdään.
6. -0939:n kohdat 5-6: friisien saumat, paljaan taustan näkyvyys (54,8), (154,7), kaista (-251,8) v115- ja v124-juurissa, pari PT:lle, yksi vienti.

## Ovien UV lyhyesti
Vika: V4_wood, kuva 1070-ristikko-pariovi, ovinelikulmion toisen kolmion UV väärin (vinot kolmiot). Vika jo viedyssä v118:ssa, ei täytteiden.
Korjatut kolmiot: b-portti 5, c-kukkaportti 3, d-kukkaportti 3, g-baohedian 4, g-taihedian lod0 ja lod1 29 + 29, g-zhonghedian 2, l-palatsi 14, m-puutarha 8, n-halli 4, u-jingshan 5.
Taihedianin osumat eivät ole ovia, vaan pieniä portaikkomaisia kaistoja hallin sisällä (y 8,95-9,81). 4 kolmiota (12,8 m2) ilman lävistäjäparia jätetty koskematta lod0:ssa ja lod1:ssä.

## Avoin, ei selvitetty
- Ikkunat: kuvissa v--100p2-itapaa ja v-204-luode ikkunassa pystypuita, ristikkoa ja vaakapuita kolmiomaisina aloina. UV-mittari antaa 0 vinoa kuville ikkunaristikko ja 1071-ristikkoikkuna, eli ei samaa vikaa tällä mittarilla. Syy auki, ei omaa vikaluokkaa todistettu. Kerro PT:lle rivillä.
- Vanhat, ei täytteiden, ennallaan: (163) luode sokkelin kiila, (204) koillinen evä, sokkelin yläreunan tumma läiskä. Pieni: (204) W ja S jalka 2 cm sokkelin edessä.
- Räystäsliuku: junaan kelpaa a309d43de (-1141:n lisäys). Friisin porras x noin 650 on listallasi; paikka kysyttävä VS:ltä.

## Opetukset
- Parin ehto: jaetun reunan on oltava lävistäjä. Ensimmäinen ajo hyväksyi pystyreunan jakavan naapurin ja olisi korjannut Taihedianin väärin. PT:n "käy muut osumat läpi" löysi tämän.
- Mittarin osuma ei kerro kohdetta: Taihedianin 33 osumaa eivät olleet ovia. Katso koordinaatit ennen kuin nimeät.
- shasum -c vaatii ajon paketin kansiosta; muuten kaikki rivit näyttävät virheiltä.

## Työkalut (A/), uudet
ovi_uv.py ja ovi_uv_kaikki.py (mittari), ovi_uv_luokat2.py (tiukka luokitus), ovi_uv_korjaa.py (korjaus paikallaan), tee_rakennukset_v127.py (uusinta palauttaa 11 mallia v118:sta), tee_koejuuri_ovi1.py, sk-ovi1.txt, aja-ovi1.zsh.
