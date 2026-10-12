# Maseru — rajattu A-lähdekooste C-tekstiluonnokselle

Luettu 12.10.2026. Omistus vain e08/maseru. Rajattu lähdekooste, ei täyden A-kartan/kuvatyön hyväksyntä. Konteksti: `konteksti.json`; maalehteä, lähikaupunkilehtiä tai lähinostoja ei ole. Kevyen esittelyn mainitsemia kohteita syvennetään eri näkökulmista.

## 0. Lähteet ja 1873-kehys

Kaikki haut yhteisellä `valiaikainen/sallittu_haku.py`:llä, robots- ja redirect-tarkistus sekä yhteinen yhden sekunnin verkkolukko. Tallennettu HTML, tekstipoiminta ja hakumetadata: `valiaikainen/nopea-e08-maseru/`. Ei /w/- tai /api/-hakua eikä PDF-kiertoa.

| Tunnus | Lähde / luetut osiot | Käyttö |
|---|---|---|
| M1 | [Maseru, en-Wikipedia](https://en.wikipedia.org/wiki/Maseru), alku, History, Geography, Climate, Transport, Economy, Architecture | kaupunki, sijainti, hallintokehys, katu/kauppa, tehtaat, raide, laadullinen sää |
| M2 | [Maseru, Britannica](https://www.britannica.com/place/Maseru), koko lyhyt teksti | riippumaton joki/raide/perustamisvuosi; perustajasta ristiriita |
| M3 | [Maseru, Wikivoyage](https://en.wikivoyage.org/wiki/Maseru), Get in, Get around, Buy/Crafts, Eat | liikkuminen, käsityökauppa, lounasruoka; hinnat ja vanhat lentoyhtiöväitteet hylätty |
| M4 | [Lesotho, Wikivoyage](https://en.wikivoyage.org/wiki/Lesotho), Buy | peitteiden myynti Maserussa; yleistäviä kansanluonnehdintoja ei käytetä |
| M5 | [Thaba Bosiu, en-Wikipedia](https://en.wikipedia.org/wiki/Thaba_Bosiu), alku, Moshoeshoe, Physical description, National monument | vanha basothojen keskus, tasanne, ruokaa/suojaa, historiallinen paikka vs kulttuurikylä, opaskierros |
| M6 | [Mokorotlo, en-Wikipedia](https://en.wikipedia.org/wiki/Mokorotlo), alku, History, Symbolism | kartiomainen olkihattu, kansallinen tunnus, lippu/rekisterikilpi, Qiloane-perinne; alkuperäepävarmuus |
| M7 | [Rail transport in Lesotho, en-Wikipedia](https://en.wikipedia.org/wiki/Rail_transport_in_Lesotho), alku, Overview, History | Maserun pääteasema, lyhyt yhteys Etelä-Afrikkaan, rata 1900-luvun alussa |
| M8 | [Basotho blanket, en-Wikipedia](https://en.wikipedia.org/wiki/Basotho_blanket), alku, History, Ceremonial use | hartioilla käytettävä vaate, kudottu kangas, arki/elämänvaiheet; materiaali ja peitetyypit vaihtelevat |
| M9 | [Moshoeshoe I International Airport, en-Wikipedia](https://en.wikipedia.org/wiki/Moshoeshoe_I_International_Airport), alku ja infobox | nimi, Mazenod, IATA MSU; ei etäisyyttä, aikataulua tai lentoyhtiöväitettä |
| M10 | [Maserun kaupunkitalous, UNECA](https://www.uneca.org/stories/new-report-reveals-maseru-generates-half-of-lesotho%E2%80%99s-gdp), uutinen | palvelut ja valmistava teollisuus kaupunkitalouden osina; osuuksia, GDP-lukuja tai oletettua elintasoa ei käytetä |
| M11 | [Pap (food) → Ugali, en-Wikipedia](https://en.wikipedia.org/wiki/Pap_(food)), alku / Names | papa/maissista tehty puuro; onnistunut sivu ohjaa otsikkoon Ugali, alku ja Names vahvistavat |

Vuonna 1873 Maseru oli jo poliisileirin ympärille kasvanut pieni kaupunki; Basutomaan hallinto oli Kapsiirtomaan yhteydessä (M1 History). Rataa ei ollut: se syntyi vasta 1900-luvun alussa (M1 Transport, M7 Overview/History). Thaba Bosiu oli vanhempi basothojen keskus (M5). Ei isoisän reittiä, tekemisiä, lainausta eikä tarkkaa vuoden 1873 rakennusilmettä.

## 1. Perusfaktat

- Pääkaupunki; Mohokare/Caledon erottaa Lesothon Etelä-Afrikasta; Maseru Bridge ylittää joen; tie Ladybrandin suuntaan (M1 alku/Geography/Transport, M2).
- Matala laakso, Maloti-vuoriston reuna; nimi viittaa punaisiin hiekkakiviin (M1 alku/Geography). Korkeus- ja pinta-alaluvut poistettu.
- Pallo vain kontekstista: -29.3167, 27.4833. Tämä on kaupunkipiste, ei nähtävyyskoordinaatti.
- Väestöä ei käytetä luonnoksessa. Kontekstin 343 541 (2016) koskee Urban and Peri-Urban -luokitusta, ei automaattisesti kaupunkikuntaa/piirikuntaa. M1:n 330 760 eroaa; PDF:ää ei haettu eikä erotusta ratkaistu.
- Perustamisvuosi 1869 on M1/M2:ssa, mutta M2 nimeää perustajaksi Moshoeshoen ja M1 britit/poliisileirin. Luonnoksessa ei tarkkaa perustamisvuotta tai perustajahenkilöä.

## 2. Kansi ja neljä nostoa

Johdanto: rajakaupunki, kauppakatu ja työelämä. Artikkelin perustiedot samoista lähteistä kuin nostot.

| Nosto | Tarkistetut faktat | Lähde / wiki |
|---|---|---|
| Joella on kaksi nimeä | Mohokare = Caledon; rajajoki; silta/tie yhdistää; Ladybrandin suunta; laakso/Malotin reuna; pääkaupunki valtionsa laidassa | M1 Geography/Transport, M2 / Maseru |
| Kauppa vaihtaa mittakaavaa | Kingswayn ympärillä vierekkäiset liikekeskukset; lännessä toimistoja/pankkeja/tavarataloja; idässä pieniä yrityksiä/toreja/katukauppaa; työpaikkoja/palveluja | M1 Economy / Maseru |
| T-paidan kaupunki | Thetsane etelässä; tekstiili/jalkineteollisuus; Moshoeshoe Roadin myllyt; myös palvelut; ei tuotemerkkejä, työntekijämääriä tai nykykauppapolitiikkaa | M1 Economy, M10 / Maseru |
| Hattu, joka antaa muodon | kartiomainen olkihattu; kansallinen tunnus; lippu ja rekisterikilpi; Basotho Hat -kauppa Kingswaylla; paikalliset käsityöt; Qiloane-yhteys perinteenä, ei varmana syntyhistoriana | M6 alku, M3 Buy/Crafts, M2 kuvateksti / Mokorotlo |

## 3. Teemasivu: historia — Leiristä pääkaupungiksi

| Nosto | Tarkistetut faktat | Lähde / wiki |
|---|---|---|
| Kaupunki vuonna 1873 | pieni poliisileirin ympärille syntynyt kaupunki; Kapsiirtomaan hallintoyhteys; myöhempi pääkaupunkiasema; asema säilyi Lesothon itsenäistyessä | M1 History / Maseru |
| Pääkaupunki tasanteella | Thaba Bosiu ennen Maserua; Moshoeshoe I ja väki 1800-luvun alkupuolella; tasanne/jyrkät reunat; karja ja muona; ruokaa ja suojaa tulijoille; yhteisön muodostuminen | M5 alku/Moshoeshoe/Physical description / Thaba_Bosiu |
| Kiskot tulivat myöhemmin | pääteasema; sillan yli Etelä-Afrikan verkkoon; lyhyt Lesothon osuus; 1900-luvun alku; tavaraliikenne ilman matkustajia; ei isoisän junaa | M1 Transport, M7 / Rail_transport_in_Lesotho |
| Peite on myös vaate | hartioilla kannettava vaate; arki/elämänvaiheet; nahkaviitan rinnalle kudottu tekstiili; myynti Maserussa; mallit ja materiaalit vaihtelevat | M8 alku/History/Ceremonial use, M4 Buy / Basotho_blanket |

Minitehtävä kysyy peitteestä elämänvaiheiden vaatteena. Vastaus on teemasivun neljännessä nostossa. Se ei toista viittä kaupunkikysymystä eikä sen fakta ole noston virke sellaisenaan.

## 4. Opas

1. Perille/liikkeelle: Moshoeshoe I -lentoasema Mazenodissa (M9), rajasilta/tie (M1/M3), minibussit/taksit (M3), ei matkustajarataa (M1). Kuljettajalle tehtävä määränpään varmistus on matkasuunnittelun neuvo, ei aikataulu- tai saatavuuslupaus.
2. Kingsway/käsityöt: liikekeskusten erot (M1), Basotho Hat paikalliset käsityöt (M3), mokorotlo (M6), peitteet (M4/M8). Materiaalien/tekijöiden kysyminen neuvo.
3. Thaba Bosiu: erillinen retki idässä, historiallinen tasanne eri kuin kulttuurikylä; kävelykierroksia/opastiedustelu; Moshoeshoe I:n hauta (M5 National monument). Ei matka-aikaa tai etäisyyslukua.
4. Ruoka: kana, sianliha, riisi ja papa Kingswayn lounasannoksissa; toimistotyöntekijät (M3 Eat). Papan määritelmä M11. Ei ravintolan nykyolemassaololupausta/hintoja.
5. Ajankohta: lämmin/sateinen kesä, viileä/kuivempi talvi ja pakkanen (M1 Climate). Ei numeroita. Vuoristoretkelle erillinen ennuste ja vaatetus ovat neuvoja.

Parasta: Kingsway, Basotho Hat, Thaba Bosiu retkenä, peitteet, lounasannokset. Tähdet toimituksellisia kiinnostavuusarvioita, eivät kävijätutkimus. Hyvä tietää: rajamuodollisuuksien tarkistus, ei matkustajarataa, vuoriston oma sää/kuljetus. Matkustusturvallisuusauditointi nykyisestä UM-lähteestä avoin; ei väitettä matkailun vaarattomuudesta eikä vanhojen WV-riskiohjeiden siirtoa. Lentoyhtiöt/reitit jätetty pois vanhentuvina.

## 5. Kohdekartta — partial

Hyväksytyt kohteet 0, jutut 0. Vanhalle keskustalle ei tässä rajatussa lähdehaussa saatu kelpoisia kohteen omia WP/WD-pisteitä ja riittäviä paikkafaktoja. Kaupunkipistettä ei lainata nähtävyydelle. Alustava rajaus -29.29/-29.34/27.45/27.51 on kontekstin ympärille tehty toimituksellinen ehdotus, ei hyväksytty kartta.

Thaba Bosiulla on oma WP-piste -29.35030, 27.67130 (M5), mutta se on kaupungin ydinkartan ulkopuolinen retki eikä täytä historiallista kaupunkikeskustaa. Ei lisätä vain lukumäärän vuoksi. Mokorotlo/Basotho Hat -rakennuksen arkkitehdin oikeusketju selvittämättä; ei karttakohdetta eikä kuvatilausta rakennuksesta. Katedraalin tarkkaa vuosilukua, arkkitehtia ja sijaintia ei varmennettu.

## 6. Kysymykset ja tiedot

Q1 rajanaapuri (M1); Q2 Mohokare/Caledon (M1); Q3 Thetsane/tekstiilit (M1); Q4 mokorotlo/olkihattu (M6); Q5 radan tavaraliikenne (M1). Tasot 1,2,3,1,2; lähteet jokaisessa JSON-oliosta. Vihjeet eivät anna vastaussanaa.

T1 nimi/punaiset hiekkakivet (M1); T2 tasanne vs kulttuurikylä (M5); T3 peite arkisena/juhlavana vaatteena (M8, M4). Ei isoisän ääntä.

## 7. Kuvatarpeet

18 tyhjää kuvaroolia: valokuva 1, kansi 3, nostot 8, matkailijalle 1 pysty, opasjaksot 5. Kaikki neljä kenttää tyhjiä; ei kuvanimiä, tekijöitä, lisenssejä tai kuvatekstejä. Kuvaputken aiheet: kaupunki laaksossa/joen ympärillä, Kingswayn liikekeskukset, Thetsanen työympäristö, perinteinen hattu esineenä, vanhan Maserun historiallinen ympäristö lähteen mukaan, Thaba Bosiun luontotasanne, tavaraliikenteen rata, peite käyttöesineenä, opasliikkuminen, käsityöt, retki, lounas, sää/maisema. Suojattuja rakennuksia, taideteoksia ja modernien peitekuvioiden oikeuksia ei oleteta vapaiksi. Ei Commons-hakua tai generointia tässä työssä.

## 8. Ristiriidat ja avoimet asiat

- Perustaja M1/M2: henkilö pois, ei hiljaista valintaa.
- Väkiluvut eri laajuuksista: pois luonnoksesta.
- M4 väittää ettei maassa ole rataa, mutta M1/M7 selvästi kuvaavat Maserun rataosuuden. Käytetään M1/M7; M4:n liikennetietoa ei käytetä.
- M3:n lentoasema/yhtiöt/hinnat ja Museoesittely sisältävät vanhoja/epäselviä tietoja: pois. Ei museolupausta.
- M8:n varhainen peitehistoria sisältää ristiriitaisia täsmävuosia/kuninkaita; niitä ei käytetä, vain vaate- ja käyttötapafaktat.
- Sääaineistossa ei tämän työn 48/48 primäärivarmennusta: saatiedot null, saa.json koskematon, ei lämpö-/sademääriä.
- Thaba Bosiun UNESCO-viite 5392 palautti HTML 200 ilman kohteen kuvausta; ei todiste. Matkailusivujen ja Airlinkin DNS epäonnistui; Aranda-osoite 404; ei todisteita. Makoanyane Square 404, ei karttakohdetta.
- Nykyinen turvallisuuslähde, kartta ja kuvien oikeudet avoimet. D/E/F tekemättä.

## 9. Poisjätöt

Ei vaali-/kauppapolitiikkaa, nykyrikollisuutta, konfliktiosapuolia, brändiväitteitä tai isoisän toimintaa. Kaupunkiin rajattu pääsisältö; Thaba Bosiu nimenomaisena vanhana keskuksena/retkenä, peite kaupungin kaupoissa. Ei koko Lesothon turistireittiluetteloa, summittaisia historiallisia rakennusilmeitä tai kartan täytekohteita.
