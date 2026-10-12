# Port of Spain — rajattu A-lähdekooste, 12.10.2026

Tila: kirjoitusta tukeva rajattu faktapohja; ei täysi A-hyväksyntä. Omistus e12/portofspain. Luettu oma konteksti, CODEX, PILVIOHJE A/C/13/LISÄSÄÄNTÖ, yhteisresepti, manterespeksi, kaupunkilehtiohje ja Dakar-rakennemalli. Ei peli-/Git-muutoksia.

## 0. Luetut lähteet ja menetelmä

Lähteet haettu yhteisellä `valiaikainen/sallittu_haku.py`:llä: robots.txt, polkutarkistus, redirectit ja yhteinen verkkolukko. HTML ja luettava teksti omassa `valiaikainen/nopea-e12-portofspain/`-kansiossa. Ei Wiki API-/raw-kiertoa. Lähteiden lopulliset SHA:t ja haut `lahdetodisteet.json`-tiedostossa.

- S1 https://en.wikipedia.org/wiki/Port_of_Spain — lead, History, Downtown, Belmont, Demographics, Queen's Park Savannah, Cultural institutions, Transport.
- S2 https://en.wikipedia.org/wiki/Queen%27s_Park_Savannah — History, Surrounding areas, Cultural influence, Recreational activities ja kohteen oma koordinaatti.
- S3 https://en.wikipedia.org/wiki/Royal_Botanic_Gardens,_Trinidad — lead, perustaminen ja puukokoelma, hautapaikka sekä oma koordinaatti.
- S4 https://en.wikipedia.org/wiki/Holy_Trinity_Cathedral,_Port_of_Spain — History, Architecture. Ristiriita kontekstin kanssa; kohdetta ei oteta kartalle tässä rajatussa vaiheessa.
- S5 https://en.wikivoyage.org/wiki/Port_of_Spain — Get in, Get around, See, Eat, Stay safe. Ei hintoja eikä aukioloaikoja sisältöön.

HTTP 404: `Woodford_Square`, `Cathedral_Basilica_of_the_Immaculate_Conception,_Port_of_Spain`, `Magnificent_Seven_(Trinidad_and_Tobago)`. Niitä ei käytetty todisteena. Woodford- ja Seven-maininnat perustuvat kaupungin S1-artikkeliin, eivät epäonnistuneisiin hakuihin. Oikea Immaculate-otsikko palautti HTTP 200, mutta sen tietoja ei tarvita tähän sisältöön. National Trustin puutarha-/katedraalisivujen yritykset palauttivat HTTP 404 eikä niitä käytetä.

## 1. Kaupunki ja 1873-kehys

- Trinidadin ja Tobagon pääkaupunki ja satama Trinidadin luoteisrannikolla Parianlahdella (S1 lead).
- Espanjalainen nimi Puerto España; lähistön Cumucurapo alkuperäisväestön kalastajakylä (S1 History). Ei alkuperäisväestön nimien tai käännösten epävarmoja yhdistämisiä.
- Hallinnon siirto sisämaan San José de Oruñasta 1700-luvulla; Trinidad Britannialle 1700-luvun lopulla (S1 History). Vuoden 1873 kehys: olemassa ollut pääkaupunki Britannian hallitsemalla Trinidadilla. Ei fiktiivistä isoisän käyntiä.
- Savannah puistona 1800-luvun puoliväliin mennessä (S1/S2, sama taustalähde eikä riippumaton vuosilukutodistus); kasvitieteellinen puutarha perustettu 1800-luvun alussa (S3). Nämä olemassa ennen tarinan vuotta 1873. Ei tarkkoja perustamisvuosia tekstiin.
- Väestöluvut jätetään tekstistä pois. Kontekstin luku koskee hallinnollista City-aluetta; taajama ulottuu itään kaupunginrajojen ulkopuolelle (S1 Demographics). Ei kaupungin ja taajaman lukujen sekoittamista.

## 2. Kansisivun faktat, 4 nostoa

1. Savannah: sokeriruokomaa → kaupungin hankinta Peschieriltä → karjalaidun → puisto. Hautapaikka jäi yksityiseksi; avoin alue, hevoskilpailut ja pallopelit (S2 History). Ei superlatiivia "maailman suurin liikenneympyrä".
2. Belmont: ensimmäinen esikaupunki, kapeat mutkittelevat kadut; musta ammattilaisväestö ja sulkeminen St. Clairin/Maravalin vauraampien alueiden ulkopuolelle; lempinimi Black St. Clair; osa suurista kodeista yrityskäytössä, osa perheillä; karnevaalisuunnittelijoita ja bandleadereita (S1 Belmont). Ei nykyisiä väestömääriä eikä luokittelua köyhyyskuvastoksi.
3. Royal Botanic Gardens: Savannahin pohjoispuolella; paikallisia ja eri maista tuotuja puita; entisten kuvernöörien hautapaikka (S3 lead). Ei tarkkoja puu-/pinta-alamääriä eikä maailman vanhin -väitettä.
4. City Gate: South Quay Independence Squaren eteläpuolella; linja-auto- ja yksityisten pikkubussien solmu; paikallisnimi maxi-taxi (S1 Public transport). Laajempi East–West Corridor (S1 Demographics). Portti-mielikuva on kirjoittajan sanaleikki, ei väite historiallisesta kaupunginportista.

## 3. Teemasivu historia, 4 nostoa

- Espanjalainen nimi ja alkuperäisväestön aiempi asutus sekä hallintopaikan siirto (S1 History).
- Keskustan ruudukko; tulvivan St. Ann's Riverin uoman siirto itään mahdollisti laajenemisen pohjoiseen/länteen. Syy-yhteys on suoraan lähteessä (S1 History).
- Keskustan mangroveiset vuorovesilietteet; rantatäyttö Laventillen kukkuloilta tuodulla maalla; Marine Square / Independence Square (S1 History ja Squares). Ei arvausta nykyisestä täyttömaan pinta-alasta.
- Suuri tulipalo 1800-luvun alussa, sääntely ja hallintorakennusten tiili; nykyisen arkkitehtuurin puukoristelu ja rautakaiteet (S1 History ja Culture).

## 4. Matkaopas, 5 jaksoa

- Piarcon lentoasema kaupungin itäpuolella; City Gate ja maxi-taksit (S1 Transport, S5 Get in). Ei IATA-/etäisyys-/matka-aikalukuja.
- Woodford Square, Trinity, Red House ja Independence Square (S1 Squares, S5 See). Trinityn vauriot ja korjaus lähteessä S4; nykyinen sisäänpääsy tarkistettava. Ei lupaa sisäkäynnistä.
- Savannah, pohjoispuolen puutarha ja Maraval Roadin Magnificent Seven (S1/S2). Ei suojattujen rakennusten valintaa karttakohteeksi tai kuviksi, käyttötapojen tarkat nykyväitteet pois.
- Doubles: jauhoihin ja kikherneisiin perustuva ruoka (S5 Eat). Savannahin ruokatorin annoksia doubles, corn soup, shawarma/gyros, jerk chicken (S2 Recreational activities). Ei yritysnimiä, hintoja tai tarkkoja kellonaikoja.
- Kuiva/sateinen kausi (S1 Climate), karnevaali ennen paastoa ja majoituksen kysyntä (S5 Do). Ei ilmastolukuja. Tavallinen varautuminen kuuroihin ja sovittuun paluukuljetukseen on matkan suunnitteluohje, ei varmuus matkustusturvallisuudesta. Ajantasainen UM-varmennus avoin; oppaassa kehotus tarkistaa ohjeet, ei vanhan rikostilaston toistoa.

## 5. Kartta ja kohdejutut — partial 2/6

| Kohde | Tyyppi | Oma WP-piste | Lähde | 1873 / oikeusraja |
|---|---|---|---|---|
| Queen's Park Savannah | luonto | 10.669296, -61.514082 → 10.66930, -61.51408 | S2 Coordinates | Puisto oli olemassa; ei rakennusta, patsasta tai valaistusta kohteeksi. |
| Royal Botanic Gardens | luonto | 10.6744, -61.5143 → 10.67440, -61.51430 | S3 Coordinates | Puutarha oli olemassa; ei muistomerkkejä/hautaveistoksia kuvaksi. |

Rajaus lasketaan pisteiden ympärille marginaalilla; ei muiden paikkojen pisteen lainaamista. Kohdejutut käyttävät S2/S3 yllä olevia faktoja, Savannahissa lisäksi Hollowsin vanha vesiallas/koristepensaat sekä eteläpuolen katsomo (S2). Puutarha ja Savannah pysyvät erillisinä nimettyinä kohteina.

Trinityn oma piste löytyi, mutta rakennuksen tekijäketju/nykyinen korjaustilanne jätetään B/D-auditointiin eikä rakennusta oteta tähän partial-karttaan. Woodford Squaren oma WP/WD-piste puuttuu; S5:n pistettä ei lainata. Täyden 6–8 kohteen portti jää auki.

## 6. Sää

`saatiedot:null`. 48/48 primääriauditointia ei varmennettu tässä tehtävässä. Ei saa.json-muutosta, ei omia numeroita, ei vuodenaikojen lämpö-/sadelukuja. Laadullinen kuiva/sateinen jako S1 Climate -osiosta.

## 7. Kysymykset, tiedot ja minitehtävä

Kysymykset: luoteisrannikko S1; Savannahin laidun S2; maxi-taksi S1; joen uoman siirto S1; puutarhan paikalliset/tuodut puut S3. Tasot 1,2,1,3,2. Jokaisessa suora HTTPS-source. Kolme tietoa: yksityinen hautapaikka S2, täyttömaan alkuperä S1, Belmontin lempinimi ja tausta S1. Tehtävä kysyy täyttömaan alkuperää; vastaus löytyy saman historiasivun nostosta, eikä sama kysymys ole kaupungin visassa.

## 8. Kuvatarpeet

Kaikkien kuvien neljä kenttää tyhjiä: 1 matkakirjakuva, 3 kansikuvaa, 8 nosto-, 1 oppaan avaus-, 5 jaksokuvaa ja 2 kohdekuvaa = 20 paikkaa. Kansille laajat kaupunkinäkymät eri puolilta. Ei hakuja, generointia, lisenssioletuksia tai valmiiksi keksittyjä tiedostonimiä. Kuvaputken tulee välttää suojattuja rakennuksia, muistomerkkejä ja lähikasvoja.

## 9. Ristiriidat ja avoimet portit

Kontekstin Holy Trinity Cathedral 1818 vs S4 valmistuminen 1823. Tarkkaa vuotta ei käytetä; kirjataan Päätoimittajalle. S1/S2 eivät ole riippumattomia täsmävuosilähteitä. Tarkat väestö-/pinta-ala-/etäisyys-/puumäärät jätetty pois. A on rajattu, B avoin, C paikallisesti tarkistettava, D/E/F avoin. Myös kartta 2/6, sää, nykyiset vierailukäytännöt ja ajantasainen matkustusturvallisuuden varmennus avoimia. Ei hyväksyntää, pelikytkentää eikä julkaisua.
