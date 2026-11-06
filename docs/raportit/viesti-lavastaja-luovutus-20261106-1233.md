# Lavastajan luovutus 6.11.2026 12.33 (seinät aukkoihin + ovien UV) — LUE TÄMÄ KOKONAAN

Pohja: -1207:n, -1141:n, -1041:n, -1021:n, -1004:n, -0939:n, -0920:n ja -0905:n Opetukset ja Työkalut pätevät. Tila ja järjestys korvattu tällä. Työkansio A = /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/muuri/aukot. Loki: muuri/KORJAUS.md (lopussa uusin). Luovutus kontekstivahdin takia (25 %). EI VIENTIÄ.

## Vientiehto (KK:n sana 6.11.)
7 seinää + 3 raon tukkoa + 5 friisiä. 2 pätkää ja 7 muuta pois. rakennukset-v127 kulkee saman ehdon mukana (PT).
KK: "seitsemän seinän vientiehto kelpaa ilman friisiä, koska mittasit, ettei niiden omissa tasoissa ole friisiä. Kuvapisteiden ehto pysyy: (-144,4), (-133,4), (204,7; 517,0), (-113,1), (-95,2; 345,5). Jos uusi seinä näyttää kuvassa irtonaiselta naapuriinsa nähden, korjaa ennen vientiä."
Friisi 7 seinään -rivi on siis pois listalta.

## Tila
1. rakennukset-v127: PT kuittasi (katsoi ovi-qianqinggong täysikoossa, 11 mallista mitattu riittää). Taihedianin oikea kamera lisätty kuvaan kuvat-saumat1/ovi-taihedian-kolmiot: hallin sisältö näkyy, korokkeen itäsivun paneelit suorat. 4 jätettyä kolmiota eivät näy, koska ne ovat korokkeen pohjoispäässä (z noin 10,3) ja kamera on z 7:ssä. Niistä ei väitettä.
2. kuvat-saumat1 (JU L1, 35140432d, koejuuri-ovi1, 404: 4 tuttua), 9 kuvaa katsottu 2000 px:n koossa, epäilyttävät kohdat täysikokoisina rajauksina. Yhtään uutta seinää ei näytä irtonaiselta naapuriinsa nähden.
3. Kaksi kohtaa mitattu (mittaa14.py, koejuuri-aukot14:n tausta):
   - (-100,2) länsipää: uusi seinä jatkuu x -114,33:een ja kohtaa siellä vanhan seinän (1-2, x noin -114,4, yläreuna sama 4,95). Kuvassa kulman oikealla puolella näkyvä kapea kaistale ei ole 5 m:n sisällä kulmasta, joten se ei kuulu seinään. Mikä pinta se on: ei selvitetty.
   - (155,1): taivasrako vihreän friisin ja katteen välissä ei ole seinän ja naapurin välissä. Seinän takana 2,4 m on katto ja kulta (x 151,7-153,7, y 6,04-7,69, z 394,9-404). Sen alla ei ole pystypintaa välillä z 396-402 ja x 150-154,8. Friisi on mittausikkunan ulkopuolella, sijaintia ei mitattu.

## Seuraajan järjestys
1. Lue Raamattu 7.47.
2. Viisi kuvapistettä KK:n ehdosta: KORJAUS.md rivit 837-838 kertovat (-144,4), (-133,4), (-113,1), (204,7; 517,0) kuvatuiksi aiemmista juurista; (-95,2; 345,5):n "rikkinäiset lattiapalaset" on tarkistamatta. Varmista, riittävätkö vanhat kuvat, ennen kuin pyydät uusia.
3. -0939:n kohdat 5-6: friisien saumat, paljaan taustan näkyvyys (54,8), (154,7), kaista (-251,8) v115- ja v124-juurissa, pari PT:lle, yksi vienti.
4. PK:lle rivi, kun juuri on valmis: hän ajaa kartan ja rajat uudelleen; 2 pätkää pois (KK); rakennuksilla kolme porttia; rakennukset-v127 viitteenä, RakennusKansio v118 -> v127 hänen vahvistuksellaan; v126:n terassi ei ole v127:ssä, joten PK:n kanssa sovittava, kumman päälle lopullinen tehdään.
5. Taihedianin 4 kolmiota: jos seuraavaan omaan ajoon tulee muutenkin paikka, kamera pohjoisesta (esim. 8 10,4 14, yaw noin -135) ja pitch positiivinen alas, ks. Opetukset. Ei erillistä ajoa.
6. VS:n pyyntö (PT:n kautta, 6.11. 12.3x): lisää seuraavaan omaan listaan, ei omaa ajoa varten, nämä rivit järjestyksessä kameran `ui juoksupeli tarkastelu kamera -269.4 2.2 -126.8 -95 -8 80` jälkeen. Pidä tämä kamera listan ensimmäisenä kuten sk-saumat1:ssä, koska oleta-rivi odottaa tarkastelun alkua:
   ```
   oleta 120 juoksupeli tarkastelu: alku
   odota 3
   kuva s--275p8-on
   ui juoksupeli valo raystasliuku 0
   odota 3
   kuva s--275p8-pois
   ui juoksupeli valo raystasliuku 1
   odota 3
   ```
   Kun ajettu: kerro kuvakansio VS:lle (local_3b36fe96-0199-4b17-9eb4-46a882ce7399). VS lukee parin ja antaa tuloksen LAV:lle ja PT:lle. Seiniä ei muuteta tummien porrasalojen takia ennen sitä.
   PÄIVITYS PT 12.4x: pari on vientiehto, ajo koodilla 84872eaa9 (korvaa a309d43de:n), omana ajona. Sha:ssa ei ole tarkastelu-komentoa, joten yllä olevat rivit eivät toimi: A/sk-pari1.txt käyttää samaa kameraa komennoilla `valo sijoita -269.4 -126.8 -95` + `valo testikamera 2.2 0 -8 80`, ajo A/aja-pari1.zsh, kuvat A/kuvat-pari1. Pyydetty JU:lta, ei katsottu.

## Avoin, ei selvitetty
- Uusien seinien tummat porrasmaiset alat: s--275p8 (uusi seinä), s--185p9, s--81p1. Muoto muistuttaa räystäsliu'un tummaa suorakaidetta ja Baohedianin oven tummaa pystykaistaa, mutta sitä ei ole todistettu. Tarkista VS:n liu'un kanssa, ennen kuin nimeät sen.
- s--100p2-lansipaa, oikea alalaita: vaalea terävä kiila lattian päällä (kuvassa noin x 1630-1960, y 1250-1360 2000 px:n asteikolla) ja musta suorakaide lähiseinässä. Ei mitattu, kuuluuko uuteen vai vanhaan. Muistuttaa kohdan (-113,1) kiilaa.
- s--247, vasen alalaita: tasavärinen ruskea lähipinta tummine rakoineen. Ei mitattu.
- Taihedian: musta lattia, tasaväriset keltaiset pylväät, kaksi tummaa viirua katossa, tummat suorakaiteet alimmissa portaissa (kuvat-ovi1/ovi-taihedian). Ei vertailua vanhaan.
- Baohedian: ovet ehjät, ylälehdessä tumma pystykaista (x noin 2060 täysikoossa).
- Ikkunat: kolmiomaiset alat v--100p2-itapaa, v-204-luode; mittari 0 vinoa. Kerrottu PT:lle.
- 404: kala-allas-ehja puuttui ovi1:n lokista mutta on saumat1:ssä. Syytä ei selvitetty.
- Vanhat, ennallaan: (163) luode sokkelin kiila, (204) koillinen evä, sokkelin yläreunan tumma läiskä, (204) W ja S jalka 2 cm sokkelin edessä. Räystäsliuku: junaan 84872eaa9 (korvaa a309d43de:n; ei korjaa seinien porrasaloja, VS). Friisin porras x noin 650: VS ei tunnista omista luovutuksistaan; lähin hänellä r-k--151:n laikku friisin yläpuolella, seinä x 300-800, ei todistettu samaksi. PT 12.4x: kuva kuvat5/r-k--151 (x noin 650, y 425-505), juuri aukot8. Sama kohta kuin (-151,5; 289,4), ks. KORJAUS.md 09.4x. Jos näkyy uusimmassa juuressa (A/kuvat-friisi1/f--151), korjataan friisien saumojen kanssa ja on viennin ehto; jos ei, rivi suljetaan.

## Opetukset
- tarkastelu kamera: pitch negatiivinen katsoo YLÖS. -18 vei Taihedianin kuvan kattoon, vaikka tähtäsin alas.
- Lukemaväli 2000 px ei riitä saumoihin: rajaa täysikoossa ne kohdat, joissa päät ovat, ja mittaa epäilyttävä ennen väitettä. Kuvan perusteella (-100,2):n kaistale näytti seinän evältä, mittaus kumosi sen.
- Python: numpyn vaativat mittarit /opt/homebrew/bin/python3:lla, -I ei löydä numpya.

## Työkalut (A/), uudet
sk-saumat1.txt, aja-saumat1.zsh (ajo lav-aja.zsh <linja> saumat1 35140432d 9), mittaa14.py (pinnat annetun ikkunan sisällä: muokkaa nayta-kutsuja).
