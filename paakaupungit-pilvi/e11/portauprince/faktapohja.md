# Port-au-Prince – rajattu A-lähdekooste / C-tekstityö

Luettu 12.10.2026. Oma tehtävä 16, vain e11/portauprince ja myöhemmin e11/kingston. Tämä on rajattu tekstifaktapohja, ei täysi A-hyväksyntä. Kaikki tarkat perustamis-, rakennus-, väestö- ja ilmastoluvut jätetään C:stä pois, ellei kahden riippumattoman lähteen portti täyty. Vakiokehys 1873 säilyy ilman isoisälle keksittyä tapahtumaa.

## 0. Luetut lähteet ja 1873-kehys

HTML, luettava tekstipoiminta, lopullinen URL ja SHA tallennetaan omaan NAS-kansioon `valiaikainen/nopea-e11-portauprince/`. Yhteinen `sallittu_haku.py` tarkistaa robots-säännöt ja redirectit sekä käyttää yhteistä verkkolukkoa. Hakujen lopputulos on `hakutodisteet.json`; epäonnistunut haku ei ole lähde.

- P1: [Port-au-Prince](https://en.wikipedia.org/wiki/Port-au-Prince), en-Wikipedia, alku, History, Economy, Culture, Climate, Airports.
- P2: [Port-au-Prince](https://en.wikivoyage.org/wiki/Port-au-Prince), en-Wikivoyage, Get around, See, Buy, Eat. Vain yleiset paikannimet ja liikenneperinteen tausta; vanhentuneet hinnat, rajanylitysohjeet, hotellit ja turvallisuusväitteet jätetty pois.
- P3: [Marché en Fer](https://en.wikipedia.org/wiki/Iron_Market), en-Wikipedia, alku ja History. Iron Market ohjautuu artikkelissa Marché en Fer -otsikkoon.
- P4: [Gingerbread house (architecture)](https://en.wikipedia.org/wiki/Gingerbread_house_(architecture)), en-Wikipedia, In Haiti / History / Characteristics.
- P5: [Tap tap](https://en.wikipedia.org/wiki/Tap_tap), en-Wikipedia, alku, Decoration, Travel warnings.
- P6: [Fritay](https://en.wikipedia.org/wiki/Fritay), en-Wikipedia, alku, History, Main / Sides.
- P7: [Pikliz](https://en.wikipedia.org/wiki/Pikliz), en-Wikipedia, alku, Variations.
- P8: [Griot (food)](https://en.wikipedia.org/wiki/Griot_(food)), en-Wikipedia, alku, Preparation.
- P9: [Joumou soup](https://ich.unesco.org/en/RL/joumou-soup-01853), UNESCO, Description. Keiton ainekset, juhla, sunnuntaiaamiainen, orjanomistajien aiemmin varaama ruoka sekä perheen ja yhteisön työnjako.
- P10: [Haiti travel advice](https://www.gov.uk/foreign-travel-advice/haiti), FCDO, Warnings and insurance. Sivun Still current at on 12 October 2026; ohje vastustaa kaikkea matkustamista Haitiin epävakaan turvallisuustilanteen vuoksi. UM:n ensimmäinen osoite palautti 404:n ja toinen vain yleisen sivupohjan ilman Haitin tiedotetta; niitä ei käytetä.
- P11: [Toussaint Louverture International Airport](https://en.wikipedia.org/wiki/Toussaint_Louverture_International_Airport), en-Wikipedia, alku ja infobox. Nimi, sijainti Tabarressa sekä PAP-koodi luettu onnistuneesta hausta.
- WMF:n Gingerbread Houses of Haiti -osoite palautti 404:n; sitä ei käytetä. Taloperinne jää P4:n varaan ja D:n tarkistettavaksi.

1873: P1:n perustaminen 1700-luvulla ja pääkaupunkiasema Haitin itsenäistymisen jälkeen osoittavat, että kaupunki oli pääkaupunki isoisän matkavuonna. P3:n torin myöhempi rakennusaika osoittaa, ettei nykyistä historiallista rautarakennusta silloin vielä ollut. C käyttää vuosisatoja, ei yksittäisiä perustamis- tai rakennusvuosia. Isoisän käyntiä, reittiä tai havaintoja ei väitetä.

## 1. Perusfaktat

- Haitin pääkaupunki Gonâvenlahdella; kauppa-alueita veden tuntumassa ja asuinalueita kukkuloilla (P1, alku).
- Kaupunki syntyi Ranskan siirtomaavallan aikana 1700-luvulla; siirtomaan pääkaupunkiasema ja itsenäisen Haitin pääkaupunkiasema ovat eri vaiheita (P1, History).
- Pallo kopioidaan kontekstista: 18.5469, -72.3403. Ei lainata sitä yhdellekään nähtävyydelle.
- Kontekstin 987310 / 2015 koskee Port-au-Princen kuntaa. Koko seudun arvio on toinen laajuus. Kumpaakaan lukua ei käytetä C:ssä.
- Haitinkreoli, ranska ja gourde tulevat omasta nykyisestä kontekstista; ei uusia kieli-/valuuttaväitteitä.

## 2. Kansi ja neljä nostoaihetta

1. Pääkaupunki ennen isoisän matkaa: synty siirtomaakaudella; Cap-Français’n korvaaminen; itsenäistymisen jälkeinen pääkaupunkiasema; kaupan, hallinnon ja kulttuurin keskus. P1 / History, alku. Wiki: Port-au-Prince.
2. Aseman ainekset päätyivät toriksi: metallirakennus valmistettiin Pariisissa; alkuperäinen Kairon asemasuunnitelma peruuntui; rakennus ostettiin Haitiin; torihallit, tornillinen portti ja kello; korjaustöissä käytettiin maanjäristyksen vaurioittamista rakennuksista talteen otettuja tiiliä. P3 / History. Wiki: Marché en Fer. Kairo-kertomukselle ei tässä ole riippumatonta uudelleenlukua: D:n tarkistettava nimetty ydinfakta; ei tarkkaa vuosilukua.
3. Piparkakku ei ole tässä leivonnainen: Pacot, Turgeau, Bois-Verna; haitilaiset rakentajat ja ulkomaiset vaikutteet; puiset kuviot; suuret ovet, korkeat huoneet, syvät verannat; säleikkunat ja ilmankierto. P4 / In Haiti, Characteristics. Ei nimetä yksittäistä taloa käyntikohteeksi.
4. Yhteiskyydillä on oma ilme: yksityiset yhteiskyydit; busseja ja katettuja lava-autoja; määrätyt reitit; maalatut henkilöhahmot, nimet ja tunnuslauseet; puiset tai metalliset ikkunasuojat. P5 / alku, Decoration. Perinne erotetaan turvallisesta matkustamisesta.

## 3. Teemasivu: ruoka / Rapea, tulinen ja yhteinen pöytä

1. Fritay: useiden ruokien joukko, ei yksittäinen annos; paistettu liha, kana, taikinapalat, keittobanaani; torit, juhlat, festivaalit; makea ja vihreä keittobanaani; pikliz lisukkeena. P6 / alku, Main, Sides; P7. Wiki: Fritay.
2. Pikliz: kaali, porkkana, sipuli, paprika, valkosipuli ja Scotch bonnet; etikka tai sitrusmehu; griot, naudanliha, keittobanaani sekä riisi ja pavut; kotivalmistus ja teollinen valmistus; reseptivaihtelu. P7 / alku, Variations. Wiki: Pikliz.
3. Griot: sianliha; sitrus ja epis-mausteet; kypsentäminen ja paistaminen; pikliz, riisi/pavut, keittobanaani; juhlaruoka. P8 / Preparation, P6 / Griot. Fèt Gede -yhteys P6:ssa; juhlinnan perusmerkitys P1 / Celebrations. Ei väitetä kiistattomaksi kansallisruoaksi. Wiki: Griot (food).
4. Joumou: kurpitsa, vihannekset, liha, pasta, mausteet; aiemmin orjanomistajille varattu; itsenäistymisen jälkeen vapauden ja ihmisarvon symboli; itsenäisyyspäivä ja sunnuntaiaamiainen; perhe ja yhteisö mukana valmistuksessa. P9 / Description. Wiki: Soup joumou.

Minitehtävä koskee joumoun yhteyttä itsenäisyyspäivään. Se ei ole yksi kaupungin viidestä kysymyksestä, ja vastaus kerrotaan teemasivun neljännessä nostossa eri sanoin.

## 4. Opas

Viisi jaksoa: perille ja liikkeelle (P11, P5, P10); rakennusperintö (P4); tori ja kulttuurin muisti (P3, P1 / Culture); ruoka (P6–P9); sää ja matkustusajankohta (P1 / Climate, P10). Trooppinen ilmasto mainitaan ilman kuukausi-, sade- tai lämpötilalukuja. Lentoaseman nimeä ja PAP-koodia käytetään vain onnistuneen P11-haun jälkeen.

Parasta-listan viisi riviä ovat kulttuurin tutustumisaiheita. Turvallisuustilanteen vuoksi ne eivät ole lupaus käyntimahdollisuuksista. Hyvä tietää: matkustustilanne, vanhan kohdetiedon riittämättömyys, kielet/raha.

## 5. Kohdekartta: partial

Ei hyväksyttyjä karttakohteita eikä nähtävyysjuttuja. Rautatorin oma WP-piste näkyy P3:ssa, mutta jälleenrakennukseen osallistui nykyarkkitehti John McAslan: vanhan rungon ja uusien suunnitelmien oikeusrajaa ei ole selvitetty. Piste yksin ei hyväksy kohdetta. Yksittäisten piparkakkutalojen nykytila ja tekijäketjut ovat auki; Oloffson ja Villa Miramar eivät ole ajantasaisia automaattisia käyntikohteita. MUPANAHin teoksia ei valita kuvaksi. Kaupungin pisteitä ei lainata millekään kohteelle. `rajat:null`, `kohteet:[]`, `nahtavyydet:{}` ilmaisevat todellisen puutteen; tarkistin saa raportoida sen.

## 6. Kysymykset ja tiedot

Viisi kysymystä: pääkaupunkimaa (P1); Rautatorin runkomateriaali (P3); tap-tapien käyttötapa (P5); korkeat huoneet/säleikkunat (P4); pikliz (P7). Tasot 1, 2 ja 3 mukana. Kolme tietoa: kaupan ja asuinalueiden sijainti (P1); piparkakkutalon piirteet (P4); MUPANAHin nimi ja aihe (P1 / Culture).

## 7. Kuvatarpeet

Kuvaputkelle myöhemmin: kolme kaupungin eri osien laajaa yleiskuvaa; kahdeksan noston aiheet; matkailijalle-pysty; viisi oppaan jaksokuvaa; yksi matkakirjakuva. Kaikki 18 nykyistä kuvaroolia jätetään neljän kentän osalta tyhjiksi. Rakennus- ja taideaiheista erillinen oikeusauditointi; tap-tapien maalauksiin voi liittyä suojattuja kuvia. Ei Commons-hakuja, kuvagenerointia tai oletettuja tiedostonimiä.

## 8. Epävarmuudet ja tarkat luvut

Kairosta Haitiin päätyneen rakennuksen kertomukselle ja yksittäisten rakennusten tekijäketjuille tarvitaan D-varmennus. Rakennusvuodet korvattu vuosisadoilla. Väestöluku jätetty pois laajuusongelmien välttämiseksi. Säätaulukon primäärivarmennus on avoinna: `saatiedot:null`; olemassa olevaan `saa.json`:iin ei kosketa. Oppaan nykyinen turvallisuusteksti vahvistettiin P10:stä ennen C-tallennusta.

## 9. Poisjätöt

Ei nykyväkivallan, nykypolitiikan tai konfliktien kertomuksia. Ei vaurioiden uhrilukuja, kansallisia superlatiiveja, hotellihintoja tai aukioloaikoja. Kevyen pisteen yleiskuvaa laajennetaan rakennus- ja ruokakulttuurin yksityiskohdilla; ei toisteta sen maanjäristyskappaletta. Maan introon jo kuuluva itsenäistymishistoria ei saa omaa pitkää yleishistoriakatsausta: joumou käsitellään valmistus- ja ateriaperinteenä. Ei keksittyä isoisän matkakokemusta.
