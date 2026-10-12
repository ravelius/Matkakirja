# La Paz — rajattu A-lähdekooste 12.10.2026

Omistus: vain e13/lapaz, tehtävä 23. Tämä on nopean C-kirjoituksen lähdepohja, ei täysi A-hyväksyntä. Lähteet haettu yhteisellä sallittu_haku.py-apurilla: robots ja redirectit tarkistettu, onnistuneet HTTP 200 -sivut ja SHA-todisteet omassa NAS-hakemistossa `valiaikainen/nopea-e13-lapaz/`. Ei kuvahakuja. Pelikonteksti ja sitovat ohjeet luettu.

## 0. Luetut lähteet ja 1873

- L1: https://en.wikipedia.org/wiki/La_Paz — Etymology, History, Geography, Culture, Transportation, Climate. Haettu 12.10.2026.
- L2: https://en.wikivoyage.org/wiki/La_Paz — Understand, Get in/Get around, See/Museums, Eat, Drink. Haettu 12.10.2026. Vanhentuvat hinnat, aikataulut ja yrityssuositukset eivät siirry tekstiin.
- L3: https://en.wikipedia.org/wiki/Mi_Telef%C3%A9rico — pääteksti, Background, Lines, asemien kaksikielisyys. Haettu 12.10.2026.
- L4: https://en.wikipedia.org/wiki/Basilica_of_San_Francisco,_La_Paz — pääteksti, History ja oma koordinaatti. Haettu 12.10.2026.
- L5: https://en.wikipedia.org/wiki/Plaza_Murillo — Names, History ja oma koordinaatti. Haettu 12.10.2026.
- L6: https://ich.unesco.org/en/RL/ritual-journeys-in-la-paz-during-alasita-01182 — UNESCO:n perinteen kuvaus. Haettu 12.10.2026.
- L7: https://ich.unesco.org/en/RL/the-festival-of-the-santisima-trinidad-del-senor-jesus-del-gran-poder-in-the-city-of-la-paz-01389 — UNESCO:n perinteen kuvaus. Haettu 12.10.2026.

Ensimmäiset Calle Jaén- ja Witches’ Market -osoitteet palauttivat 404; niitä ei käytetä. L1:n oikeasta linkistä löytyi myöhemmin L8: https://en.wikipedia.org/wiki/The_Witches%27_Market (haettu 12.10.2026, HTTP 200). Torin nosto päivitettiin sen konkreettisilla faktoilla; wiki-otsikko The Witches' Market. Calle Jaénin yleisfaktat L1:stä, museot L2:sta, wiki La Paz.

1873 on pelin kiinteä matkavuosi, ei paikallinen tapahtumavuosi: kaupunki perustettiin 1500-luvulla (L1), nykyinen San Francisco on 1700-luvulta mutta torni vasta 1800-luvun lopulta (L4). Plaza Murillo kuuluu siirtomaa-ajan ruutukaavaan (L5). Hallinnon asema siirtyi vuosisadan lopulla (L1); tarkkaa vuotta ei käytetä. Köysirata on 2000-luvulta (L3). Ei isoisän tekoja, reittiä tai puhetta.

L9: https://en.wikipedia.org/wiki/Alasitas — haettu 12.10.2026, pääteksti ja Modern celebration; pienoistuotteiden esimerkeissä talot/autot/yliopistodiplomit. C:n talo/auto-esimerkit tästä, ei rahajäljitelmää ilman luettua vahvistusta.

## 1. Perusfaktat

L1: La Paz on Bolivian hallinnon paikka; Sucre perustuslain mukainen pääkaupunki. Kaupunki on Choqueyapu-joen muovaamassa laaksossa Altiplanon reunalla, El Alto sen yläpuolella tasangolla. Illimani lumihuippuinen taustavuori. Joki suurelta osin rakennettu peittoon; pääväylän keskustajakso Prado. Espanjalainen perustaminen ensin Lajassa, siirto Chuquiagon laaksoon; La Paz = rauha espanjaksi, Chuquiago alueen aimarankielinen nimi.

Väestö: kontekstin luku koskee La Pazin municipio-kuntaa ja on kiistetty. Luku jätetään C:stä pois; El Alto ja metropolialue eivät ole sama väestöalue. Pallo vain kontekstista -16.4958, -68.1333.

## 2. Kansi — neljä omaa aihetta

1. Kaupunki kulhon sisällä: L1 Geography — joen laakso, rinteet, El Alton ylätasanko, Illimani; ei korkeuden superlatiivia eikä tarkkaa mittalukua. Wiki La Paz.
2. Työmatka kattojen yläpuolella: L3 — Mi Teleférico = minun köysiratani, joukkoliikenne, kaupunginosat/El Alto, värilinjat, kaksikieliset asemat, 2000-luvun rakentaminen; ei linja-/asemamääriä eikä matka-aikoja. Wiki Mi Teleférico.
3. Lumi kaatoi edellisen kirkon: L4 — aiempi kirkko sortui runsaan lumen jälkeen 1600-luvun alussa, nykyinen Andien barokkikirkko 1700-luvulta, Franciscus Assisilainen, samanniminen aukio, torni 1800-luvun lopulta. Museo/luostari L4 + L2. Wiki Basilica of San Francisco, La Paz.
4. Vanha katu, monta aikakautta: L1 Culture + L2 See/Museums — Calle Jaénin säilyneet siirtomaa-ajan rakennukset, museot, esikolumbiaanisen kullan/hopean kokoelma, soittimet Boliviasta ja muualta. Ei museomääriä eikä puuttuvaa katukoordinaattia. Wiki La Paz.

## 3. Teemasivu — historia: Käsityöt ja elävät perinteet

1. Alasita: L6 + L1 Festivals — toiveita edustavat pienoisesineet, Ekeko, rituaalinen pyhittäminen tai katolinen siunaaminen, perheiden sukupolvien välinen välitys; lapsi kulkee vanhemman mukana. Käsityötä kannustetaan myös kilpailuilla. Ei tarkkaa päivää, kestoa tai UNESCO-vuotta. Wiki Alasitas (yleinen aihe; varsinaiset faktat L6).
2. Gran Poder: L7 — Pyhän Kolminaisuuden päivä, Andien katolisuus, kulkue/tanssi/laulu, veljeskuntien ohjelmiston valmistelu vuoden läpi, kirjonta ja korunteko perheissä. Ei osallistuja-/muusikko-/ryhmämääriä eikä nykyistä tapahtumakalenteria. Wiki Fiesta del Gran Poder.
3. Mercado de Brujas: L1 Museums ja L8 — Linares ja lähikadut, yrtit/rohdokset/rituaaliainekset, monet myyjät aimaranaisia (chifreras), yatiri-rituaaliasiantuntijat, uhrilahjat Pachamamalle. Kulttuurinen merkitys, ei terveysvaikutusväitteitä, eläinraatojen kuvausta eikä eksotisointia. Wiki The Witches' Market. L8:n Cerro Cumbre -sijaintiväite ristiriidassa lähteen oman Linares-kadun ja L1-keskustatiedon kanssa: ei käytetä, ei karttapistettä.
4. Soitinmuseo: L2 Museums — Calle Jaén, perustaja charangomestari ja keksijä Ernesto Cavour, ääntä tuottavat laitteet Boliviasta ja muualta, osaa voi kokeilla, monirunkoiset kitarat hänen keksintöjään. Museon aihe poikkeaa maanlehden yhtyesoittimien historiasta. Ei teoskuvaa eikä kohdepistettä Cavourin suojatuille keksinnöille. Wiki La Paz; riippumaton D varmentaa WV:n yksin tukeman kokoelmatiedon.

Minitehtävä: toiveiden suhde Alasitan pienoisesineisiin. Vastaus saman sivun nostossa; ei toista viittä visakysymystä.

## 4. Opas

5 jaksoa: (1) L1/L2 lentoasema El Altossa, tieyhteys, L2 bussit/minibussit/trufit, L3 köysirata; (2) L1/L2 San Francisco, Calle Jaénin museot, Plaza Murillo; (3) L3 värilinjat ja kaksikielisyys, L6/L7 juhlat; (4) L2 Eat/Drink pienet almuerzo-lounaskeittiöt, toriruoka, avokadovoileivät, maissista tehty lämmin makea api; (5) L1 laadullinen sateisempi eteläisen pallonpuoliskon kesä/kuivempi talvi, L7 liikkuva kirkollinen juhlapäivä, L2 korkeuserot. Ei lämpötila-/sademäärälukuja, aikatauluja tai hintoja. Ei väitetä WV:n virheellisesti Cochabamban pique machoa La Pazin omaksi ruoaksi.

Parasta 5: San Francisco, Calle Jaén, Mi Teleférico, Plaza Murillo, soitinmuseo. Hyvä tietää 3: lentoasema naapurikaupungissa, rinteet, Gran Poderin liikkuva ajankohta. Lentoasema El Alto International Airport (LPB), L1/L2. Ei ajankohtaista turvallisuusluokitusta; ei vaarallisuuden vahvistamatonta väitettä.

## 5. Kartta — partial 2/6

- San Franciscon basilika: rakennus, L4 oma koordinaatti -16.49650, -68.13730. Historiallinen 1700-luvun kirkkorakennus; myöhemmät taideteokset eivät kohteita. Juttu L4 ja L2.
- Plaza Murillo: aukio, L5 oma koordinaatti -16.49580, -68.13360. Siirtomaa-ajan ruutukaava, Plaza Mayor / Plaza de Armas, Pedro Domingo Murilloon viittaava nimi; nykyinen katedraali ja hallintoaukio L1/L5. Ei monumenttia tai suojattua uudisrakennusta kohteena.
- Rajaus pisteiden ympärille noin 300 m marginaalilla: pohjoinen -16.4928, etelä -16.4995, länsi -68.1404, itä -68.1305.

Auki: 6–8 kohteen portti; Calle Jaén, kirkolliset/vanhat rakennukset tai luonnonkohteet edellyttävät omia WP/WD-paikkapisteitä ja tekijäketjun tarkistusta. Kaupungin pistettä ei lainata. Köysiradan verkoston koordinaattia ei naamioida aseman pisteeksi. Taideteokset eivät karttakohteita.

## 6. Viisi kysymystä ja kolme tietoa

Visa: hallinnon asema L1; joen nimi L1; köysiradan kulkutapa L3; San Franciscon lumisortuma L4; lentoaseman sijainti El Altossa L1/L2. Tasot 1, 2 ja 3; eri vaihtoehdot, vihjeet eivät sisällä vastausta.

Tiedot: kaksikieliset köysirata-asemat L3; lentoasema naapurikaupungin ylätasangolla L1/L2; Cavourin monirunkoiset kitarat L2. Ei isoisän ääntä.

## 7. Kuvat

Kaikki neljä kuvakenttää tyhjiä. Tarpeet: valokuva 1, kansi 3 (kaupungin laakso, historiallinen keskusta, ylätasangon suunta), nostot 8 (aiheesta yllä, suojattuja keksintöjä/rituaaliteoksia ei kuvata ilman oikeusketjua), matkailijalle 1 pysty, opas 5, kohdejutut 2. B-valintaa ei ole. Ei kuvanimeä, creditia, selitettä tai kuvalupausta keksitty.

## 8. Ristiriidat ja avoimet portit

L1 antaa hallinnon siirtymävuodeksi yhdessä kohdassa 1898; kontekstin/yleisen aineiston 1899 ei ratkaista yhdestä lähteestä. C käyttää 1800-luvun loppua. San Franciscon lähteiden tarkat rakentamis-/valmistumisvuodet vaihtelevat ja infobox 1885 sisältää tornivaiheen; C käyttää rakennusosittain vuosisataa. Plaza Murillon nimenvaihdon päivämäärä/nimiketju epäselvä L5:ssä; ei tarkkaa vuotta. WV:n museot/käytännöt jäävät riippumattomaan D-auditointiin. Täysi A:n 6–8 kohdeaineisto ja kuvaoikeudet puuttuvat. Saatiedot null: primäärivarmennusta 48/48 ei ole, olemassa olevaa saa.jsonia ei muuteta.

## 9. Poisjätöt

Ei Bolivian maanlehden piiritystä, nimeämiskokousta, merivoimia, salteñaa, perunan pakastekuivausta tai yhtyesoittimien yhteistä historiaa. Ei Titicacan järvilaivoja, Tiwanakua tai ruokosaarten tarinoita. Ei nykyvaltaa, rikoksia tai lähellä olevaa kokaiinikaappausnostoa. Ei nykypolitiikkaa, uusia suojattuja teoksia, väestö-/korkeus-/matka-/kävijämääriä tai keksittyä isoisäkohtausta.
