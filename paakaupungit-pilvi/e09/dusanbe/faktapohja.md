# Dušanbe — rajattu A-lähdekooste, 12.10.2026

Omistus e09/dusanbe, tehtävä 06. Rajattu lähdekooste ennen C:tä, ei täysi A-hyväksyntä. Konteksti.json ja alkuperäinen Dakar-rakennemalli luettu. Ei Git-, kuva-, peli- tai julkaisutoimia.

## 0. Luetut lähteet ja todisteet

Lähteet haettu 12.10.2026 yhteisellä `valiaikainen/sallittu_haku.py`-apurilla: molempien agenttien robots-rajat, ohjaukset ja globaali 1 s lukko. HTML, tekstipoiminnat ja lähde-SHA:t `valiaikainen/nopea-e09-dusanbe/`. Työn alussa luettiin myös samasta sallitusta lähdevarastosta vanhempi Dushanbe-HTML; C:n faktat tarkistettiin sen jälkeen tämän päivän haetusta HTML:stä. Ei estettyjä API- tai /w/-polkuja eikä kuvia.

- D1 https://en.wikipedia.org/wiki/Dushanbe — johdanto, Etymology, History / Before the Soviet Union / Soviet period, Geography / Flora and fauna, Infrastructure / Parks, Culture / Performing arts / Literature, International relations.
- D2 https://en.wikivoyage.org/wiki/Dushanbe — Understand, Get in, Get around, Museums, Eat, Go next. Ei hintoja, aikatauluja, viisumiohjeita tai turvallisuushavaintojen yleistyksiä.
- D3 https://en.wikipedia.org/wiki/Gurminj_Museum — sisältö ohjautuu sivuksi Gurminj Museum of Musical Instruments: History, Collection, Cultural events. Sisältöohjauksen otsikko tarkistettu.
- D4 https://ich.unesco.org/en/RL/shashmaqom-music-00089 — UNESCOn ensikäden perintökuvaus: laulu ja soittimet, runous, kaupunkiperinne, Tadžikistan ja Uzbekistan, nuotinnoksen rajat, mestari–oppilas.
- D5 https://en.wikipedia.org/wiki/Boulder_Dushanbe_teahouse — ohjauksen otsikko Dushanbe Tea House; History, Description. Väärä ison T:n polku Boulder_Dushanbe_Teahouse palautti 404 eikä sitä käytetä.
- D6 https://www.boulderteahouse.com/ ja https://www.boulderteahouse.com/explore-the-teahouse-2 — teehuoneen oma sivu ja Explore the Teahouse / The Boulder Chapter / Hand-Carved and Painted Ceiling. Lahja, valmistus Tadžikistanissa, kuljetus osina, jälleenkokoaminen, puupylväät, maalattu katto, keraamiset pinnat; nykyinen toiminta ravintolana. Sivun oma numerotieto on osin Wikipediasta, joten tätä lähdeparia ei käsitellä itsenäisenä kaksoisvarmennuksena luvuille.

Karttaseulonnassa luetut mutta C-kohteiksi hyväksymättömät:

- https://en.wikipedia.org/wiki/Rudaki_Park — palautettu sisältö on Dushanbe-artikkeli. Oma puiston piste puuttuu; kaupungin pistettä ei lainata.
- https://en.wikipedia.org/wiki/Dushanbe_Zoo — oma WP-piste 38.58500 / 68.77194 ja historia, mutta sivu kertoo siirtosuunnitelmista ja vanhentuvista toiminta- ja hoito-olosuhteista. Nykytilaa ei varmennettu; ei C-kohdetta tai matkaoppaan suositusta.

Epäonnistuneet ensikäden haut: https://www.boulder-dushanbe.org/history (404), https://www.akdn.org/akma/project/gurminj-museum-musical-instruments (robots-haun 301), https://www.boulderteahouse.com/history (404). Näistä ei käytetä väitteitä. Onnistunut teehuoneen oma polku löytyi sen etusivun linkistä. Ei toistuvaa loputonta hakua.

## 1. Perustiedot ja 1873

- Tadžikistanin pääkaupunki Hisorin laaksossa. Kaupunkipiste kontekstista 38.5731 / 68.7864, Q9365 (D1 johdanto, D2 Understand).
- Dušanbe = maanantai, kylän maanantaimarkkinat (D1 Etymology, D2 Understand; jo kevyessä pisteessä, vain artikkelin tausta, ei oma toistava nosto).
- Markkinakylä ennen 1900-lukua, pääkaupunkikasvu neuvostoaikana, väliaikainen nimi Stalinabad (D1 Before Soviet Union / Soviet period, D2 Understand). Vuosi 1873 asetetaan markkinapaikan vaiheeseen kronologisesti, ei matkana tai erillisenä paikallistapahtumana. Tarkkaa ulkoasua tai isoisän käyntiä ei keksitä.
- D1:n historia mainitsee kankaat, nahat ja karjan kaupan sekä karavaanireittien risteyksen. Ei lukumääriä eikä oletettua päätelmää pääkaupungin valinnan syistä C:hen.
- Kontekstin väestö 2020 koskee laajennettua hallinnollista kaupunkia. D1:n väestötaulukko antaa eri rajauksen/muuttuvan rajan lukuja. Näitä ei rinnasteta eikä C:ssä käytetä väkilukua tai pinta-alaa.
- D2 ajoittaa neuvostotasavallan erottamisen 1930-luvulle, D1 vuoteen 1929; käytetään vain neuvostokautta / 1900-lukua. Ei yksittäisen vuoden valitsemista.

## 2. Artikkeli ja kannen neljä nostoa

- Dušanben lahja Boulderille oli teehuone; käsityöosat tehtiin Tadžikistanissa, kuljetettiin ja koottiin Yhdysvalloissa. Puukaiverretut pylväät, maalattu katto, keramiikka ja ravintolakäyttö (D5 History / Description, D6 Explore / Boulder Chapter / Ceiling). Ei käsityöläisten määrää, laatikoiden määrää, vuosia, kustannuksia, myöhästymisen tarkkaa kestoa tai anekdootteja. Suunnittelijoita ja modernia taidetta ei ehdoteta kuvaksi tai karttakohteeksi.
- Varzob pohjoisesta etelään; asutus pitkään vasemmalla rannalla, myöhemmin toisella rannalla; vuorten välinen Hisorin allas (D1 Geography). Joen laakso retki- ja vapaa-ajan alueineen (D2 Go next). Ei korkeuksia, etäisyyksiä tai väitettä nykyisestä kaupunkikeskustan jokiliikenteestä.
- Rakentaminen poisti vanhaa kasvillisuutta; viheralueet ja kasvitieteellinen puutarha toivat uusia kasveja. Tiedakatemian puutarha 1900-luvulta; varhaiset istutukset säilyneet (D1 Flora and fauna / Parks). Rudaki-kadun plataanit (D2 Other). Ei lajimäärää, puistomäärää, pinta-alaa tai prosentteja.
- Kaupunkieläimistössä ketut, pitkäkorvaiset siilit, lepakot, kyyhkyt ja muuttolinnut; kalat vesissä; gekot/liskot; sammakot/rupikonnat puhtaammissa vesissä (D1 Flora and fauna). Ei lupauksia näkemisestä tai eläinten esiintymistiheydestä. Kuvaan ei pyydetä yleistä Keski-Aasian eläintä kaupungin havaintona.

## 3. Musiikki-teemasivun neljä nostoa

- Näyttelijä ja muusikko Gurminj Zavkibekov keräsi soittimia kotiseudun Badakhšanin matkoilta; museo Dušanbessa, Pamirin ja Badakhšanin perinne, rubab/tanbur/dutor sekä rummut, kulttuuritapahtumat (D3 History / Collection / Cultural events, D2 Museums). Ei tarkkaa perustamis- tai kuolinvuotta eikä kokoelmalukua.
- Shashmaqom kaupungin konserttielämässä (D1 Performing arts ja konserttisalin kuva); perinteen laulu, soittimet, runous, Keski-Aasian kaupunkitausta, yhteinen tadžikkilais-uzbekkilainen perinne ja suullinen mestari–oppilas-opetus (D4). D4 selittää nimen six maqoms, mutta tarkkaa kuutosta ei käytetä C:ssä. Nuotit tallentavat vain peruskehyksen, joten suullinen opetus on keskeinen: syy-yhteys on nimenomaisesti D4:ssä, ei kirjoittajan päätelmä.
- Ayni-teatteri nimetty kirjailija Sadriddin Aynin mukaan; neuvostokauden laitos, Hanifa Mavlianova laulajana, Aleksandr Lensky säveltäjänä ja filharmonian/teatterin johtajana (D1 Performing arts / Literature). Ei ensimmäinen-superlatiiveja tai tarkkoja rakennus-/perustamisvuosia.
- Balettiryhmä, Leningradin koreografisen koulun valmistuneet, Malika Sabirova, varhainen Two Roses -baletti (D1 Performing arts). Two Roses / Kaksi ruusua on teoksen nimi, ei mittaluku; ei lainauksia, käsikirjoituksen sisältöä tai tätä suojattua teosta kuva-aiheeksi. Ooppera ja baletti saman laitoksen osia, esityksiä jatketaan nykyisin (D1 ja D2 Ayni Theatre).

## 4. Opas — nykytieto ilman lukuja

1. Lentoasema, Rudaki-katu; bussit, johdinautot, maršrutkat ja taksit (D1 Transport, D2 Get in / Get around). Osoitteen ja maamerkin tallentaminen sekä reitin tarkistus toimituksen suosituksia. Ei IATA-koodia varmistamatta.
2. Gurminj ja tapahtumat (D3, D2 Museums). Kansallismuseo ja muinaismuseo eri laitoksia (D1 johdanto). D2:n National Museum -kohdan englanninkielinen nimi ja venäjänkielinen muinaismuseon nimi sekä kerroskuvaus sekoittuvat; niitä ei yhdistetä yhdeksi C-kuvaukseksi, eikä Buddhan sijaintia väitetä tästä lähteestä.
3. Ayni-teatterin ooppera ja baletti, Gurminjin kulttuuritapahtumat (D1 Performing arts, D2 Theatre, D3 Cultural events). Ohjelman ennakkotarkistus suositus, ei lupaus tietystä esityksestä.
4. Plov ja samsa (D2 Eat / Oshi Panchakent), šašlik oopperan ympäristössä (D2 Small Restaurants), kaupungissa myös turkkilainen/intialainen/georgialainen tarjonta (D2 Eat). Ei ravintolan laatu- tai hintaväitteitä.
5. Rudaki-puisto ja kasvitieteellinen puutarha (D1 Parks, D2 Other); Varzobin retkipaikat (D2 Go next). Paluun ja päivän sään tarkistus suosituksia; ei ilmastolukuja.

## 5. Kysymykset, tiedot, minitehtävä

Viisi kysymystä: maan pääkaupunki (D1), museo ja kielisoittimet (D3), teehuone lahjana (D1/D5/D6), Varzobin suunta (D1), shashmaqomin nuottien rajat ja opetus (D4). Tasot 1,2,2,2,3. Shashmaqom-kysymyksen alkuperäislähde UNESCO, mikä aiheuttaa paikallisen tarkistimen Wikipedia-source-varoituksen; väitettä ei siirretä tukemattomaan Wikipedia-linkkiin.

Kolme tietoa: lahjateehuone (D5/D6), istutukset (D1), Stalinabad-nimi (D1). Musiikkisivun minitehtävä kysyy keräilijän kotiseutua Badakhšania; vastaus saman sivun nostossa 1, ei sama kysymys kuin soittimien ryhmä.

## 6. Kartta — partial, ei kohteita

Oman luotettavan pisteen ja muun kohdekelpoisuuden yhdistelmä ei täyty. Rudaki Park palauttaa kaupungin artikkelin; ei puiston omaa pistettä. Gurminjillä oma piste 38.5768/68.7898, mutta museorakennuksen ikä ja tekijäketju tarkistamatta. Eläintarhan piste luettu, mutta muutto-/nykytilaa ei ole varmennettu ja toimintatieto epävarmaa. Hisorin linnoitus on kaupunkikeskustan ulkopuolella eikä täytä keskustan karttatavoitetta. Suojattuja moderneja muistomerkkejä, kirjasto-/museorakennuksia ja niiden patsaita ei täytteeksi.

Kohdekartta: kohteet:[], rajat:null, nahtavyydet:{}; aito puute näkyy alkuperäisessä tarkistimessa. Tavoite 6–8 avoin, ei perustelu kaupungin pienuudella. Ei nähtävyysjuttua ilman hyväksyttyä kohdetta. Teehuone sijaitsee toisessa maassa, lisäksi sen käsityöpinnat suojattuja, joten se ei ole Dušanben karttapiste eikä kuva-aihe.

## 7. Kuvat

B-valintaa ei ole. 18 roolia: valokuva 1, kansi 3, nostot 8, matkailijalle 1, opas 5. Kunkin tiedosto/lyhyt/selite/lahde tyhjiä. Ei kuvia, lisenssejä, keksittyjä tiedostonimiä tai lukijan kuvatekstejä. Modernien käsityöpintojen, balettiteoksen, patsaiden ja julkisivujen suoja säilyy.

## 8. Sää

Saa.json olemassa; 48/48 primäärivarmennus avoin. Saatiedot:null. Ei säähaun lisäkierrosta tai saa.json-numeroiden muutosta. Oppaan retken suunnittelu ei sisällä ilmastolukuja.

## 9. Avoimet portit

A:n täysi kohde- ja tekijäketjuaineisto, nykytilojen varmennus, B, sääauditointi, riippumaton D, E/F, hyväksyntä, pelikytkentä ja julkaisu. Koko kaupunki ei ole valmis.
