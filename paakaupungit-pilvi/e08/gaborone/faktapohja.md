# Gaborone — rajattu A-lähdekooste C-tekstiluonnokselle

Luettu 12.10.2026. Omistus vain e08/gaborone. Lähdekooste tukee koko tekstirunkoa, mutta 6–8 kohteen karttaportti sekä kuvat/sää eivät ole valmiit. Konteksti `konteksti.json`: ei maalehteä, lähikaupungin lehtiä tai lähinostoja. Lyhyen esittelyn suunnitelmallista syntyä laajennetaan katujen, nimien, vesihuollon ja seudun vanhemman asutuksen kautta.

## 0. Luetut lähteet ja 1873-kehys

Tallennus `valiaikainen/nopea-e08-gaborone/`: HTML, tekstipoiminnat, fetch-log.jsonl, myöhemmin mitta/SHA- ja tarkistintodisteet. Yhteinen `sallittu_haku.py`, robots molemmille agenteille, redirect-tarkistus ja globaali yhden sekunnin verkkolukko. Vain tavalliset sallitut /wiki/-sivut, ei estettyjä API- tai PDF-reittejä.

| Tunnus | Lähde ja osio | Käyttö |
|---|---|---|
| G1 | [Gaborone, en-Wikipedia](https://en.wikipedia.org/wiki/Gaborone): alku, History, Geography, Climate, Arts and culture, Gaborone Game Reserve (Activities/Flora/Fauna), Architecture, Airports | kaupungin synty/nimi, vanha asutus, keskustasuunnitelma, eläimet, museo/puutarha, lentoaseman nimi/koodi, laadullinen sää |
| G2 | [Gaborone, Wikivoyage](https://en.wikivoyage.org/wiki/Gaborone): Get around, See, Game reserves, Buy, Eat | combi/reittitaksi/yksityiskyyti, plot-numero, kävelykatu, puisto, ruokailun moninaisuus; hinnat, aikataulut ja rikosanekdootit pois |
| G3 | [Kgale Hill, en-Wikipedia](https://en.wikipedia.org/wiki/Kgale_Hill): alku, Climbing and recreation, Cultural references | oma koordinaatti, nimi/lempinimi, kävelyreitit/paviaanit, tv-toistin, televisiosarjan kuvauspaikka juurella |
| G4 | [Gaborone Dam, en-Wikipedia](https://en.wikipedia.org/wiki/Gaborone_Dam): infobox, alku, Location, Description, Issues, Reservoir use | oma koordinaatti, Notwane, veden saanti, valuma-alueen joet, rakenne/korotus, kulutus/sateet, virkistys |
| G5 | [National Botanical Garden (Botswana), en-Wikipedia](https://en.wikipedia.org/wiki/National_Botanical_Garden_(Botswana)): infobox, alku, Layout | oma koordinaatti, Okwa Road/The Village, Notwane, museon luonnonhistorian yksikkö, alkuperäiskasvit, ekologiset alueet |
| G6 | [Botswana National Museum, en-Wikipedia](https://en.wikipedia.org/wiki/Botswana_National_Museum): alku | käsityöt/paikallisten taiteilijoiden työ, kasvitieteellinen puutarha; ei suojattuja teoksia karttakohteiksi tai kuviin |
| G7 | [Botswana cuisine, en-Wikipedia](https://en.wikipedia.org/wiki/Botswana_cuisine): alku, Food, National dishes | seswaa, hitaasti kypsennetty/nuijittu liha, bogobe durrasta/hirssistä/maissista; ei yksittäisen ravintolan saatavuuslupausta |

Nykyinen suunniteltu pääkaupunki syntyi 1960-luvulla, joten sitä ei ollut vuonna 1873. Notwanen seutu oli kuitenkin ollut asuttu vuosisatoja (G1 History). Ei väitetä aluetta tyhjäksi, nimetä vuoden 1873 paikallista päällikköä, keksitä rakennusilmettä tai isoisän reittiä. G3 kukkula on luonnonpaikka, mutta nykyinen kaupunkinäkymä on myöhempi. G4 nykyinen pato/allaskokonaisuus 1960-luvulta ja G5 puutarha 2000-luvulta: niitä ei ollut 1873. Vuosikymmenet yhden lähteen tarkkojen vuosien sijaan.

## 1. Perusfaktat

- Botswanan pääkaupunki kaakossa Notwanen seudulla (G1 alku/Geography).
- Nimi päällikkö Gaboronelta, tlokwa-yhteisö; Tlokweng joen toisella puolella, Gaberones vanha nimimuoto; GC = Government Camp (G1 History).
- Uuden pääkaupungin valinnassa vesilähde ja rata kuuluivat perusteisiin; rakennus 1960-luvulla itsenäistymisen yhteydessä (G1 History). Ei omin päin syy-yhteyttä tai tarkkaa perustamisvuotta.
- Asukasluku jätetään pois. Kontekstin 246 325 (2022) koskee Gaborone Cityn de facto -väestöä, ei seutua; toista riippumatonta väestölähdettä ei haettu, PDF ei kierretä.
- Pallo vain kontekstista -24.6569, 25.9086. Ei nähtävyyskoordinaatti.

## 2. Kansisivu ja neljä nostoa

Johdanto: kävelykeskus, vesihuolto ja lähiluonto; lähteet alla sekä G6.

| Nosto | Varmennetut faktat | Lähde / wiki |
|---|---|---|
| Mall ilman kattoa | Main Mall pitkä kauppa/kävelyalue; autoton; hallintokeskus sen yhteydessä; kävelyreitit/avoimet tilat alkuperäisessä suunnitelmassa; ei ristiriitaista itä/länsi-sijoitusta | G1 alku/History/Architecture, G2 Buy / Gaborone |
| Vedellä on työ | eteläpuolen pato Notwanessa; Gaboronen ja Lobatsen vesihuolto; rakennus pääkaupungin suunnittelun aikana; myöhempi korotus; kuivuus ja kulutuksen kasvu; myös virkistys | G4 Location/Description/Issues/Reservoir use / Gaborone_Dam |
| Nukkuva jättiläinen | Kgale = kuivuneeseen paikkaan viittaava nimi; Sleeping Giant lempinimi; kaupunkinäkymä; useita reittejä; paviaaneja; tv-toistin menneessä käytössä | G3 alku/Climbing / Kgale_Hill |
| Riistapuisto työpäivän lähellä | itäpuoli/Notwane; pensaikko/savanni/ruohosto; impala/kudu/seepra; vesipaikat ja linnut; sadeajan tilapäiset lammikot; puiston teillä liikkuminen | G1 Gaborone Game Reserve/Activities/Flora/Fauna, G2 Game reserves / Gaborone |

Viimeisen noston otsikko on toimituksellinen kaupunginläheisyyden näkökulma, ei väite työmatkareitistä tai mitatusta etäisyydestä. Ei kävijärankingia, eläinmäärää, petotakuuta tai suurinta/ainoaa koskevaa superlatiivia.

## 3. Teemasivu: historia — Pääkaupunki suunnitelmasta

| Nosto | Varmennetut faktat | Lähde / wiki |
|---|---|---|
| Seutu ennen suunnitelmaa | 1873 ei nykyistä pääkaupunkia; Notwanen vanhempi asutus vuosisatoja; 1960-luvun suunniteltu kaupunki; vanha Gaberones osana uutta The Village -alueena | G1 History / Gaborone |
| Nimi kulki joen yli | päällikkö/yhteisö; Tlokweng joen toisella puolella hallintoleiriä; Gaberones lyhenne Gaboronen kylästä; GC/Government Camp | G1 History / Gaborone |
| Kaupunki jalankulkijalle | puutarhakaupungin periaatteet; jalankulkureitit ja avoimet tilat; pitkä Main Mall; hallinnon oma kokonaisuus; kaupunki sittemmin laajentui | G1 History/Architecture / Gaborone |
| Vesi ja rata samassa valinnassa | vesilähde/rata valinnan perusteita; aiempi hallintokeskus Mafekingissa; oma keskus maan itsenäistyessä; pato suunnittelun aikana | G1 History, G4 Description / Gaborone |

Minitehtävä koskee veden saannin käytännön merkitystä kaupungin suunnittelussa. Vastaus teemasivun neljännessä nostossa, ei sama asia kuin kaupunkivisan joen nimen kysymys. Ei nostovirke sellaisenaan tai palkkiota.

## 4. Matkaopas

1. Perille/liikkeelle: Sir Seretse Khama International Airport (GBE), nimi/koodi G1 Airports; combit, reittitaksit ja yksityiskyyti, tunnistettava paikka/plot-numero G2 Get around. Ei lentoreittiä, etäisyyslukua, hintaa tai aikataulua.
2. Keskusta/museo/puutarha: Main Mall G1/G2; museon kulttuuri/käsityöt/taiteilijat G6; museon puutarha ja alkuperäiskasvit G5. Nykyinen pääsy varmistettava; ei vanhaa näyttelyluetteloa ohjelmalupaukseksi.
3. Luontokohteet: Kgale G3; riistapuiston päiväkäyttö/omat tiet G1 Activities; pato vesihuolto/virkistys G4. Eläimille tilan antaminen ja sää/kuntovalinta ovat matkasuunnittelun neuvoja. Ei matkustusturvallisuuden takausta.
4. Ruoka: ravintoloiden moninaisuus G2 Eat; seswaa/bogobe G7. Eri keittiöt eivät edellytä yhden ravintolan nykyolemassaoloväitettä.
5. Ajankohta: kesä kuuma, suurin osa sateista kesällä; talvipäivä lämmin/yö kylmä, sateiden vaihtelu G1 Climate. Ei kuukausi-/aste-/sademäärälukuja tai lähdeviittausta lukijalle.

Parasta: Main Mall, museo, puutarha, Kgale, riistapuisto. Tähdet kirjoittajan kiinnostavuusarvio. Hyvä tietää: reittiauton määränpää, plot-numero, erilliset retkisiirtymät, museon nykyvierailun tarkistus. UM-turvallisuusauditointi avoin, ei väitettä koko matkailun turvallisuudesta. Ei WV:n vanhojen rikos- tai terveysanekdoottien siirtoa.

## 5. Kohdekartta — partial 3/6–8

Koordinaatit nimenomaan kohteen omasta artikkelista, ei kaupungin tai Wikivoyagen kaupungin listauspisteestä. Koordinaatit ovat oman WP-pisteen esitystä, eivät maantieteellisiä mittaväitteitä. Paikan geometria tarkistetaan vielä D/F:ssä.

| Kohde | Tyyppi / oma piste (lat, lon) | Aika ja paikkafaktat |
|---|---|---|
| Kgale Hill | luonto; -24.69570, 25.86780; G3 infobox/Coordinates | luontokohde; nimi/lempinimi; kävelyreitit; kaupunkinäkymä; paviaanit; mennyt tv-toistin; juurella No. 1 Ladies' Detective Agency -sarjan kuvaukset. Kuvataan vain luonnonkukkulaa, ei kuvauslavasteita. Nykyinen Gaborone ei 1873. |
| Gaboronen pato | rakennus/infrastruktuuri; -24.70016, 25.92638; G4 infobox (alkuperäinen -24.700161, 25.926381 pyöristetty 5 desimaaliin) | 1960-luku, korotus 1980-luvulla; Notwane; Gaborone/Lobatse-vesihuolto; Taung, Metsemaswaane, Nywane valuma-alueella; maaytiminen täyttörakenne; kulutus/haihtuminen/sateet vaikuttaneet; virkistys lintuharrastus/purjehdus/kalastus. Oma nimi, ei uudelleennimetty luontopaikka. Ei ollut 1873. |
| Kansallinen kasvitieteellinen puutarha | luonto; -24.66679, 25.94488; G5 infobox/Coordinates | 2000-luku; Okwa Road, The Village, Notwanen ympäristö; museon Natural History Division; alkuperäiskasvien suojeleminen; maan ekologiset alueet; Choben kasvisto/Okavangon palmut/mopanemetsät/lounaisen Kalaharin ruoho ja Hoodia. Ei ollut 1873. |

Jutut 3, jokainen 3 kappaletta, tyhjä kuvaolio. Rajaus pohjoinen -24.65390, etelä -24.70316, länsi 25.86450, itä 25.94818 kattaa kaikki sekä kontekstin kaupunkipisteen noin 300 m ulkoreunamarginaalilla. Historiallisen keskustaytimen kohdepisteet ja 6–8-kohteen portti avoimet; tätä ei kutsuta täydeksi kaupunkikartaksi. Lisäkohteita ei keksitä lukumäärän vuoksi.

Riistapuiston erillinen artikkeli palautti 404. Sen faktat saatiin G1:n osioista, mutta kaupungin koordinaattia tai WV-listauspistettä ei lainata: ei karttakohdetta/juttua. Museo ei karttakohde, koska rakennuksen/taideteosten oikeus- ja kohderajaus tekemättä. Kolmen dikgosi-päällikön muistomerkki, Seretse Khaman patsas ja modernit suojatut kohteet eivät kartalle/kuviin.

## 6. Visa ja kolme tietoa

Q1 Botswanan pääkaupunki (G1), Q2 nimi tlokwa-päälliköstä (G1), Q3 padon Notwane (G4), Q4 Main Mall autoton kauppa/kävelyalue (G1/G2), Q5 GC = Government Camp (G1). Tasot 1,3,2,1,3. Neljä vaihtoehtoa, vihjeet eivät anna vastausta, lähde jokaisessa oliossa. T1 GC (G1), T2 museo/puutarha (G5/G6), T3 tv-toistin (G3). Ei isoisän ääntä.

## 7. Kuvaputken tarpeet

21 tyhjää kuvaroolia: valokuva 1, kansi 3, nostot 8, matkailijalle 1 pysty, opas 5, kohdejutut 3. Kaikki neljä kenttää tyhjiä, ei tiedostonimiä, lisenssejä, tekijöitä tai valittujen kuvien selitteitä. Aiheet: keskustan kävelytila ilman suojattuja teoksia, yleiskuva kaupungin ja lähiluonnon suhteesta, Notwanen pato/vesi, Kgale luonnonkukkulana, riistapuiston luonto, Notwanen vanhempi seutu lähdeperusteisena yleisaiheena, nimien kylä/joen suhde, avoimet kävelyreitit, vesihuollon yhteys, liikkuminen, puutarhan kasvit, ruoka, vuodenaikojen maisema. Ei vanhaa kaupunkiasua rekonstruoivaa arvailua, suojattuja patsaita/museoteoksia, lavasteita tai modernien rakennusten oikeusoletuksia. Kuvaputki valitsee B/asset-liitteen erikseen.

## 8. Epävarmuudet ja ratkaisut

- G1:n alku sijoittaa hallinnon Main Mallista itään, myöhemmät Geography/Architecture länteen: compass-suunta jätetty pois, rakenneyhteys säilyy.
- G1:n ilmasto sisältää keskenään erilaisia ennätyslukuja; ei täsmälukuja. `saatiedot:null`, saa.json säilytetty; 48/48 primäärivarmennus avoin.
- G5:n puutarha 7 ha, G1:n 3,6 ha; ei pinta-alaa. Ei ensimmäinen/suurin/ranking-superlatiivia.
- Tarkat vuosiluvut, rakennusvuodet, etäisyydet, väkiluku ja määrät pois tai vuosikymmeniksi yhden lähteen tarkkuudesta. Poikkeus: ohjeen nimenomainen 1873-kehys ja kohteen omat koordinaatit.
- BTO:n Gaborone-sivu https://www.botswanatourism.co.bw/explore/gaborone palautti HTTP 500; CAAB:n https://www.caab.co.bw/sir-seretse-khama-international-airport/ HTTP 503. Ei todisteita. Viranomais-/alkuperäislähteitä tavoiteltiin rajatusti; niitä ei korvattu 404/500/503:n sisällöllä.
- Nykyinen turvallisuuslähde/museopääsy, 6–8-kohteen karttaportti, B-kuvat ja sääauditointi avoimet. D/E/F tekemättä.

## 9. Poisjätetyt aiheet

Nykyinen hallintokiista/puoluepolitiikka, rikos- ja konfliktianekdootit, modernien muistomerkkien oikeusepäselvät teokset, maiden elintasoranking, kauppojen/safarikohteiden hinta/aukiololuettelot, petojen silittäminen, koko Botswanan matkailureitit. Museon ihmisjäänteiden yksityiskohtainen historia ei kuulu tämän kaupungin kevyen kulttuurioppaan näkökulmaan. Ei isoisän kohtauksia eikä tyhjän seudun kehystä.
