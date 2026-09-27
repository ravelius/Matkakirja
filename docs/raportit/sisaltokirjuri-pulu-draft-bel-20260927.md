# Livian pulu — Belgian 11 maakunnan kysymykset (luonnos)

Sisältökirjuri, 27.9.2026. Tutkittu WebSearch-hauilla, ei toistoa annettujen
"lyhyt"-faktojen kanssa. Kaikki vastaukset alle 400 merkkiä, suomeksi,
kysymykset Livian rennolla "Miksi/Mitä/Kuinka/Mikä"-sävyllä.

Lähteet on merkitty kunkin maakunnan alle omaan huomiolistaan (ei koodiin).

## Valmis JS-lohko (copy-paste)

```js
Antwerp: [
  { q: "Miksi Antwerpenia kutsutaan maailman timanttipääkaupungiksi?", a: "Antwerpenin pieni timanttikorttelin alue käsittelee jopa noin 80–85 % maailman raakatimanteista – kauppa juontaa yli 500 vuoden taakse, Intiasta tuotuihin ensimmäisiin kiviin." },
  { q: "Kuka oli Antwerpenin kuuluisin maalari?", a: "Barokkimestari Peter Paul Rubens asui ja työskenteli Antwerpenissa, ja kaupungin Notre Damen katedraalissa on edelleen useita hänen suurteoksiaan nähtävillä." },
],
Brussels: [
  { q: "Mikä pieni patsas on Brysselin symboli?", a: "Manneken Pis, pissivä poikapatsas, on ollut kaupungin suihkulähteenä 1300-luvulta lähtien; nykyinen pronssiversio on vuodelta 1619, ja sille puetaan tuhansia erilaisia asuja." },
  { q: "Mihin tilaisuuteen Atomium rakennettiin?", a: "Atomium pystytettiin Brysselin maailmannäyttelyyn Expo 58:aan symboloimaan rauta-atomin kidehilaa – siitä tuli pysyvä nähtävyys, joka seisoo edelleen paikallaan." },
],
"Flemish Brabant": [
  { q: "Miksi Leuven on Belgian yliopistokaupunkien kärjessä?", a: "Leuvenin katolinen yliopisto perustettiin vuonna 1425 paavi Martin V:n luvalla, ja se on Alankomaiden historiallisen alueen vanhin yliopisto." },
  { q: "Mistä Stella Artois -olut on kotoisin?", a: "Panimoperinne juontaa Leuvenista, jossa Den Hoornin panimo toimi jo 1360-luvulla; Artois-suku otti panimon haltuunsa 1700-luvun alussa." },
],
Hainaut: [
  { q: "Mikä juhla Monsissa on Unescon listalla?", a: "Monsin Doudou-juhla ja siihen kuuluva lohikäärmetaistelu Lumeçon on merkitty Unescon aineettoman kulttuuriperinnön listalle vuonna 2005, ja perinne juontaa 1300-luvulle." },
  { q: "Miksi Charleroita kutsutaan katutaiteen kaupungiksi?", a: "Entinen kaivos- ja teollisuuskaupunki Charleroi on täynnä suurikokoisia seinämaalauksia; Urban Dream -hanke on tuonut kaupunkiin kymmeniä monumentaalisia freskoja vuodesta 2014." },
],
"East Flanders": [
  { q: "Mikä maalaus tekee Gentin Pyhän Baavon katedraalista kuuluisan?", a: "Van Eyckin veljesten vuonna 1432 valmistunut Gentin alttaritaulu on historian varastetuin taideteos – yksi sen paneeleista on edelleen kadoksissa vuosikymmenten takaa." },
  { q: "Kuinka pitkä Gentin kesäjuhla on?", a: "Gentse Feesten valtaa koko vanhankaupungin heinäkuussa noin kymmeneksi päiväksi ja kerää noin miljoona kävijää – yksi Euroopan suurimmista ilmaisista katujuhlista." },
],
Liege: [
  { q: "Kuka kuuluisa kirjailija syntyi Liègessä?", a: "Komisario Maigret -dekkarien luoja Georges Simenon syntyi Liègessä 1903 ja on yksi maailman luetuimmista belgialaiskirjailijoista, yli 500 miljoonaa myytyä kirjaa." },
  { q: "Mikä on Montagne de Bueren?", a: "374 porrasaskelman rappu Liègen keskustassa nousee jyrkkää rinnettä ylös linnoitukselle; se rakennettiin 1880-luvulla muistoksi kaupunkia 1400-luvulla puolustaneille sotureille." },
],
Limburg: [
  { q: "Mikä on Bokrijk?", a: "Bokrijk on Euroopan suurimpia ulkoilmamuseoita: yli 140 vanhaa flaamilaista rakennusta on siirretty samaan puistoon Genkin lähelle kertomaan maaseudun elämästä ennen teollistumista." },
  { q: "Miksi Hasselt on Belgian katajaviinan kaupunki?", a: "Hasselt on ollut jenever-katajaviinan valmistuksen keskus 1600-luvulta lähtien, ja kaupungin Jenevermuseumissa toimii yhä oikea, käyvä tislaamo." },
],
Luxembourg: [
  { q: "Mitä tapahtui Bastognessa joulun 1944 alla?", a: "Saksalaiset vaativat piiritetyn Bastognen amerikkalaisjoukkoja antautumaan Ardennien hyökkäyksen aikana; kenraali McAuliffe vastasi yhdellä sanalla: 'Nuts!' – suunnilleen 'painukaa hiiteen'." },
  { q: "Mikä pieni kaupunki väittää olevansa maailman pienin?", a: "Durbuy on markkinoinut itseään 'maailman pienimpänä kaupunkina' aina 1300-luvulta asti, vaikka virallisesti tittelin omistaa Belgiassa nykyään Mesen." },
],
"West Flanders": [
  { q: "Miksi Brugge on saanut lisänimen 'Pohjolan Venetsia'?", a: "Bruggen keskiaikaiset kanaalit, kellotorni ja ehjä vanhakaupunki ovat Unescon maailmanperintökohde – kaupunki säilyi lähes koskemattomana, kun kauppareitit siirtyivät muualle 1500-luvulla." },
  { q: "Mikä ikivanha muistoseremonia toistuu Ypresissä joka ilta?", a: "Menin Gate -muistoportilla on soitettu Last Post -iskukutsu joka ilta vuodesta 1928 (saksalaismiehitystä lukuun ottamatta) muistoksi ensimmäisessä maailmansodassa kaatuneista." },
],
Namur: [
  { q: "Mitä Grottes de Han -luolissa pääsee näkemään?", a: "Hanin luolat Namurin maakunnassa ovat Belgian suosituimpia nähtävyyksiä maan alla: Lesse-joki on kaivertanut vuosituhansien saatossa käytäviä ja saleja, joita kierretään opastetulla retkellä." },
  { q: "Kuinka suuri Namurin linnoitus on?", a: "Namurin sitadelli sijaitsee Sambre- ja Meuse-jokien yhtymäkohdassa ja on yksi Euroopan laajimmista linnoituksista – maanalaisia käytäviä siellä on yli 7 kilometriä." },
],
"Walloon Brabant": [
  { q: "Miksi Louvain-la-Neuve on Belgian nuorin kaupunki?", a: "Louvain-la-Neuve rakennettiin tyhjästä 1970-luvulla, kun Leuvenin yliopisto jaettiin kielikiistojen seurauksena – ranskankielinen osa muutti kokonaan uuteen kaupunkiin." },
  { q: "Mikä rauniokohde kertoo alueen luostarihistoriasta?", a: "Villersin luostarin rauniot Villers-la-Villessa ovat yksi Belgian vaikuttavimmista keskiaikaisista kohteista; sistanssilaisluostari perustettiin 1146, ja parhaimmillaan siellä asui noin 400 munkkia." },
],
```

## Huomioita ja lähteet per maakunta

- **Antwerp** — Antwerpenin timanttikortteli n. 80–85 % maailman raakatimanteista
  (BAUNAT, Antwerp diamond district -Wikipedia); Rubens Antwerpenissä (yleistieto,
  vahvistettu hausta). Ei päällekkäisyyttä sataman/väkiluvun kanssa.
- **Brussels** — Manneken Pis (Wikipedia, visit.brussels): patsas 1300-luvulta,
  pronssiversio 1619. Atomium Expo 58:aan (yleistieto). Ei päällekkäisyyttä
  EU/NATO/sarjakuvapääkaupungin kanssa.
- **Flemish Brabant** — KU Leuven perustettu 1425 paavi Martin V:n luvalla,
  vanhin yliopisto Alankomaissa (KU Leuven Stories, Wikipedia). Stella Artois /
  Den Hoornin panimo Leuvenissa 1360-luvulta, Artois-suku 1700-luvulla
  (Stella Artois -Wikipedia). Ei päällekkäisyyttä Zaventem-lentokentän/
  Brysselin kehän kanssa.
- **Hainaut** — Monsin Doudou/Lumeçon Unescon listalla 2005 (Wikipedia,
  visitmons.be). Charleroi katutaiteen kaupunkina, Urban Dream -hanke 2014
  (danishculture.com, streetartcities.com). Ei päällekkäisyyttä Tournain kanssa
  (Tournai on annettu "lyhyt"-faktana).
- **East Flanders** — Gentin alttaritaulu (Van Eyck, 1432), historian
  varastetuin taideteos, yksi paneeli kadoksissa (thecollector.com,
  Wikipedia-viittaukset hakutuloksissa). Gentse Feesten n. 10 päivää heinäkuussa,
  n. miljoona kävijää (Wikipedia, visit.gent.be). Ei päällekkäisyyttä
  Scheldt/Lys-yhtymäkohdan tai yliopisto-opiskelijoiden kanssa.
- **Liege** — Georges Simenon syntyi Liègessä 1903, Maigret-kirjojen luoja,
  yli 500 miljoonaa myytyä kirjaa (encyclopedia.com, discoveringbelgium.com).
  Montagne de Bueren, 374 askelmaa, rakennettu 1881 muistoksi 1400-luvun
  puolustajille (kupi.com, Wikipedia). Ei päällekkäisyyttä kolmen maan rajan/
  saksankielisen alueen kanssa.
- **Limburg** — Bokrijk-ulkoilmamuseo, yli 140 rakennusta, perustettu
  1950-luvulla (bokrijk.be, Wikipedia). Hasselt jenever-katajaviinan
  keskuksena 1600-luvulta, Nationaal Jenevermuseum toimivana tislaamona
  (jenevermuseum.be, kupi.com). Ei päällekkäisyyttä Tongerenin/roomalaisajan
  kanssa.
- **Luxembourg (maakunta)** — Bastognen "Nuts!"-vastaus joulukuussa 1944
  (army.mil, Wikipedia: Anthony McAuliffe). Durbuy markkinoi itseään maailman
  pienimpänä kaupunkina 1300-luvulta, virallinen titteli nykyään Mesenillä
  (livetheworld.com). Ei päällekkäisyyttä Ardennien metsäpinta-alan/
  väkimäärän kanssa.
- **West Flanders** — Brugge, Unescon maailmanperintö, kanaalit ja kellotorni,
  säilyi koskemattomana kauppareittien siirtyessä 1500-luvulla (yleistieto,
  Unesco-status vakiintunut). Menin Gate / Last Post joka ilta vuodesta 1928
  (paitsi Saksan miehityksen 1940–44 aikana) (greatwar.co.uk, ww100.govt.nz).
  Ei päällekkäisyyttä rantatramin kanssa.
- **Namur** — Grottes de Han / Hanin luolat, Lesse-joen muodostamat luolastot
  (Wikipedia, showcaves.com). Namurin sitadelli Sambre/Meuse-yhtymäkohdassa,
  yksi Euroopan laajimmista linnoituksista, yli 7 km maanalaisia käytäviä
  (exploremeuse.be, Wikipedia). Ei päällekkäisyyttä Dinantin/Adolphe Saxin
  kanssa.
- **Walloon Brabant** — Louvain-la-Neuve rakennettu 1970-luvulla Leuvenin
  yliopiston kielijaon seurauksena (Wikipedia: Split of the Catholic
  University of Leuven, UCLouvain). Villersin luostarin rauniot, perustettu
  1146, parhaimmillaan n. 400 munkkia (Villers Abbey -Wikipedia,
  visitwallonia.com). Ei päällekkäisyyttä Waterloon taistelun tai
  "rikkain maakunta" -faktan kanssa.

## Luottamus

- **Vahvimmat (useampi riippumaton lähde, tarkka vuosiluku/luku):**
  Flemish Brabant (KU Leuven 1425), Liege (Simenon, Montagne de Bueren 374
  askelmaa), Luxembourg-maakunta (Bastognen "Nuts!"), West Flanders
  (Menin Gate 1928), East Flanders (Gentin alttaritaulu 1432), Namur
  (sitadelli, Han-luolat), Walloon Brabant (Louvain-la-Neuve, Villers 1146).
- **Hyvät, mutta yksi luku vaihtelee lähteestä riippuen:** Antwerp
  (timanttiosuus 80 vs. 84–85 %, käytetty haarukkaa "80–85 %" turvaksi),
  Hainaut (Charleroin katutaide on vakiintunut mutta ei yhtä tarkkarajainen
  fakta kuin muut), Limburg (Bokrijkin perustamisvuosi vaihteli lähteissä
  1938/1953/1958 – vastauksessa vältetty tarkkaa vuotta, kerrottu vain
  "1950-luvulla perustettu").
- **Ei fabrikoituja lukuja:** kaikki numerot (374 askelmaa, 1425, 1432, 1146,
  n. 80–85 %, n. 10 päivää/miljoona kävijää, 7 km käytäviä) on suoraan
  hakutuloksista, ei arvattu.
