# Dodoma — faktapohja 0–9, vaihe A

Erä e07, id `dodoma`, maa TZA. Luettu **11.10.2026**. **A partial:** 4 + 4 aihetta, nykyopas, kysymysaiheet ja kuvatarpeet koottu. Historialliseen ytimeen sopivia 6–8 hyväksyttyä karttakohdetta ei ole: Lion Rockin, vanhan aseman, aukion ja geologisen museon omat WP/WD-pisteet puuttuvat, nykyisten rakennusten tekijä-/osaketjut ovat avoimia ja osa suurista nykypaikoista on keskustan ulkopuolella. Hallinnollista aluepistettä ei korvata kohteen omaksi pisteeksi.

Sääpoiminnan **kausi ja 48 kuukausiarvoa saatiin varmennettua alkuperäislähteistä**, mutta NOAA-asemaotsikon latitude eroaa JMA:n ja lentokentän sijainnista. Ristiriita on ilmoitettu pääsessiolle. `saa.json`:ia ei muokattu. Kuva-/kirjoitus-/Git-operaatioita ei tehty eikä kaupunki tai A-vaihe ole valmis.

## 0. Luetut lähteet, 1873-kehys ja lähderajat

Raakalähteet, luettavat poiminnat, lähdemetat, EntityData ja SHA256-manifesti ovat NAS-kansiossa `valiaikainen/dodoma-A/`. Kuljetus yhteisellä `sallittu_haku.py`:llä, robots ennen uutta verkkotunnusta/polkua/ohjausta ja yhteinen 1 pyyntö/s -lukko/välimuisti. Omistajan hyväksymä sallittujen alkuperäisten `/wiki/`-sivujen poikkeus käytössä; ei `/w/`, `/api/`, estettyjä Special-polkuja tai User-Agent-vaihtoa.

### Wikipedia ja opas

| Tunnus | Luettu alkuperäislähde | Revisio/kieli | Käytetyt kohdat |
|---|---|---|---|
| S1 | [Dodoma](https://en.wikipedia.org/wiki/Dodoma) | en 1378653712 | johdanto, Geography, History/master plan, Climate/viitteet, Education, Transport, Sports, Places of worship |
| S2 | [Dodoma Region](https://en.wikipedia.org/wiki/Dodoma_Region) | en 1375789234 | alueen ja kaupungin ero, maatalous/luonnonvarat; alueen sääluvut eivät kaupungin sääriviksi |
| S3 | [Tanzanian wine](https://en.wikipedia.org/wiki/Tanzanian_wine) | en 1367779817 | History, Makutupora, Wineries; vuosiriidat/maaluokan superlatiivi pois |
| S4 | [Central Line (Tanzania)](https://en.wikipedia.org/wiki/Central_Line_(Tanzania)) | en 1368436338 | johdanto, History, reitti, vanhan/SGR-radan ero |
| S5 | [Tanzania Standard Gauge Railway](https://en.wikipedia.org/wiki/Tanzania_Standard_Gauge_Railway) | en 1367779841 | reitin/radan uusi tyyppi ja vaiheittaisuus; ei nykyvuoroja vanhasta projektisuunnitelmasta |
| S6 | [Gogo people](https://en.wikipedia.org/wiki/Gogo_people) | en 1375854745 | johdanto, Gogo/Mgogo/Wagogo/Kigogo-nimet, History/Ugogo ja 1800-luvun karavaanireitti; lähteettömät stereotyypit, alistavat aikalaislainaukset ja nykypoliitikot pois |
| S7 | [University of Dodoma](https://en.wikipedia.org/wiki/University_of_Dodoma) | en 1359890174 | instituutio, Chimwaga-sijainti, opetus; ”fastest/largest”-väitteet ja toteutumattomat kapasiteettiluvut pois |
| S8 | [St. John's University of Tanzania](https://en.wikipedia.org/wiki/St._John%27s_University_of_Tanzania) | en 1359871218 | instituutio, omistusyhteys, opintosuunnat, oma campuspiste; ei vanhentunutta johtajaluetteloa |
| S9 | [Geological Survey of Tanzania](https://en.wikipedia.org/wiki/Geological_Survey_of_Tanzania) | en 1368391011 | viraston tehtävä ja Dodoma; organisatoristen perustamisvaiheiden ero |
| S10 | [Makole, Dodoma Municipal Council](https://en.wikipedia.org/wiki/Makole,_Dodoma_Municipal_Council) | en 1376445827 | hallinnollinen alue, Lion Hill -maininta, oma **ward**-piste, ei hill-piste |
| S11 | [Mtumba](https://en.wikipedia.org/wiki/Mtumba) | en 1378585510 | hallinnollinen alue ja sijainti; ei yksittäinen ministeriö/rakennus tai keskustan piste |
| S12 | [Gaddafi Mosque](https://en.wikipedia.org/wiki/Gaddafi_Mosque) | en 1366877024 | sijainti/instituutio, uusi rakennus; rahoittaja ei suunnittelija, ei nyky-/johtajatarinaa |
| S13 | [Jamhuri Stadium (Dodoma)](https://en.wikipedia.org/wiki/Jamhuri_Stadium_(Dodoma)) | en 1372206973 | toiminnallinen urheilupaikka, oma piste, Morogoron samanniminen eri kenttä |
| S14 | [Dodoma Jiji FC](https://en.wikipedia.org/wiki/Dodoma_Jiji_FC) | en 1363080362 | kaupungin seura/kenttä; ei sarjasijoitusta tai yleisömäärää |
| S15 | [Dodoma Airport](https://en.wikipedia.org/wiki/Dodoma_Airport) | en 1363489201 | nimi, IATA DOD, WMO **63862**, kentän sijainti |
| S16 | [Msalato International Airport](https://en.wikipedia.org/wiki/Msalato_International_Airport) | en 1363061354 | hanke erotettu vanhasta DOD-kentästä; ei oletusta valmistumisesta |
| O1 | [Dodoma, Wikivoyage](https://en.wikivoyage.org/wiki/Dodoma) | en 5237752 | Get in/Get around, See/Do, Stay safe; nykyinen ja vanha asema erotettu, hinnat/ajat/junavuorot eivät valmiita lupauksia |
| O2 | [UM: Tansania, matkustustiedote](https://um.fi/matkustustiedote/-/c/TZ) | fi **2.10.2026** | turvallisuustaso, liikenne, nykyiset maahantulo-/vakuutus-/kuvausrajoitukset; ei nykyrikosten/levottomuuksien tarinoita |

### Alkuperäiset muut lähteet

| Tunnus | Lähde | Luettu rooli |
|---|---|---|
| P1 | [UDOM: The University Location](https://www.udom.ac.tz/site/location) | yliopiston **Chimwaga-alue**, noin 8 km keskuksesta itään ja mäkinen alue; ei Lion Rockin oma piste |
| P2 | [GST:n virallinen sivusto](https://www.gst.go.tz/) ja [museon palvelusivu](https://www.gst.go.tz/pages/geological-museum-charges) | viraston toiminta ja geologisen museopalvelun olemassaolo; hinnat eivät peliin |
| P3 | [GST Company Profile (2023), PDF](https://www.gst.go.tz/uploads/documents/sw-1731761146-GST%20-%20CP%20%282023%29.pdf) | **PDF-sivut 5 ja 10 kokonaan luettu/katsottu**: Dodoman päätoimisto, kivi-/mineraalimuseo, kairausnäytteet, kartat/raportit/kirjasto/arkisto; ei julkaisun kuvaa/lisenssiä peliin |
| P4 | [Tanzania Airports Authority: Msalato construction](https://www.taa.go.tz/developments/construction-of-msalato-international-airport-phase-1-lot1-package-1-infrastructure) | hankkeen julkaistu tila **OnProgress**; ei valmis kaupallinen lentokenttä todistetusti |
| P5 | [TRC:n nykyinen virallinen sivusto](https://www.trc.co.tz/) | MGR-/SGR-palvelujen erottaminen ja nykyinen myynti-/reittipalvelu; ei kellonaikoja, hintoja tai henkilökohtaista varausta |
| P6 | [VisitTanzania/Travelindex: Dodoma Town](https://www.visittanzania.org/destinations-in-tanzania/dodoma-town/) | alkuperäinen matkailukustantajan sivu; yleinen karavaani-/rail-/viininviljelytausta, **ei tässä varmennettu valtion matkailuviranomaisen sivuksi** eikä tuore hallinnon tila |

Sääalkuperäislähteet P7–P10 eritelty kohdassa 4/O4 ja 8. GST-PDF luettiin PDF-taito-ohjeen mukaisesti; NAS:lla sivukuvat `gst-page-05.png` ja `gst-page-10.png` sekä tekstipoiminta. Niiden kuvia ei valittu B-aineistoksi.

### Puuttuvat tai näennäiset lähteet

- En-WP `Dodoma railway station`, `Holy Spirit Cathedral, Dodoma`, `Nyerere Square`, `Lion Rock (Dodoma)`, `Iseni Hill`, `Chimwaga Hill`, `Mlimwa Hill`, `Makul(u) …` ja `Msalato Theological College` sekä sw-WP aukio-/Simba Hill -yritykset palauttivat 404. Ei löydetyiksi sivuiksi.
- `Jamhuri Stadium` on **täsmennyssivu**, ei Dodoman rakennusartikkeli; oikea S13 avattiin sen jälkeen.
- Dodoman kaupungin history/root ja alueellisen matkailustrategian PDF-osoite palauttivat 553 tavun **GWF CORE -sovelluskuoren**, ei tekstisisältöä/PDF:ää. Strategiaa ei lasketa luetuksi, vaikka hakukone näyttää katkelmia. Ei kuratoituja ”viranomaisfaktoja” niiden perusteella.
- GST:n kaksi arvattua museum-sivupolkua palauttivat ”Haipatikani / ei löytynyt” -kuoren. Museofaktat P2:n toimivasta palvelusivusta ja aidosta P3-PDF:stä.
- St John's -etusivu on nykyinen SPA; `about/establishment` palautti tässä haussa vain sivun nimen. Sen hakukoneen Mazengo-historiaa **ei** merkitä luetuksi alkuperäiseksi historiatodisteeksi. S8:n luettu instituutiotieto säilyy.
- TRC:n yksittäinen 3.9.2026 uutisosoite päättyi yhteyskatkoon. Sen hakutulos ei ole oma raakatodiste; P5:n toimiva virallinen palvelusivu ja S4/S5 käytössä.

### 1873-kehys

- S1 kertoo Dodoman olleen aluksi **Idodomya-niminen pieni markkinapaikka**; nykyinen kaupunki perustettiin rautatien rakentamisen yhteydessä 1900-luvun alkupuolella. Ei sanota alueen olleen asumaton vuonna 1873.
- Ugogo ja Gogo-asukkaiden aluehistoria sekä karavaanireitti edelsivät nykyistä kaupunkia (S6/S4/P6). Ihmiset olivat paikalla omine yhteisöineen, eivät vasta siirtomaaradan jälkeen.
- Vuonna 1873 nykyistä rautatieasemaa/rataa, uutta pääkaupungin hallintorakentamista, yliopistoja, Gaddafi-moskeijaa tai SGR-asemaa ei ollut. Myöhemmän rakennuksen nykykuva ei todista vuoden 1873 ulkonäköä.
- Tämän lähdekierroksen alkuperäisaineisto ei varmista Idodomya-paikan omaa pistettä, vuoden 1873 tarkkaa toripaikkaa tai rakennusluetteloa. Elefantin uppoamisesta kertovaa nimiperimätietoa ei julkaista tässä varmana luonnon-/historiatapahtumana.
- Ei isoisän matkapäiväkirjamerkintää, vierailua, haastattelua, reittiä tai ääntä.

## 1. Perusfaktat

- Dodoma, Tansanian pääkaupunki maan keskiosassa; maa-/wiki-avain **Dodoma** (S1).
- Kaupunki ja **Dodoma Region** eivät ole sama alue. Kondoa, Hombolo, Bihawana, Makutupora ja alueen kaivos-/luontopaikat eivät automaattisesti ole keskuskaupungin kohteita (S2/S3).
- Kaupungin kehityksessä on vanha markkinapaikka, siirtomaakauden rautatiekaupunki ja myöhempi suunnitellun pääkaupungin vaihe (S1).
- Pääkaupunkihankkeen 1973/1974-erot lähteissä käsitellään **1970-luvulla**. Nykyinen hallinnon yksittäisten toimistojen muutto ei ole nostotarina.
- Väestö vain kontekstista: **846 160**, Dodoma City Councilin **2025 projektio**, NBS:n vuonna 2025 julkaisema 2022-laskentaan perustuva raportti. Pelaajalle tarvittaessa **noin 846 000 kaupungin hallintoalueen asukasta vuoden 2025 arviossa**. Ei vuoden 2025 toteutunut laskenta, pelkkä keskustataajama tai koko maakunta. Kontekstin PDF:ää ei esitetä tässä erikseen luetuksi.
- Kaupungin tuttu lentoasema **Dodoma Airport, DOD** erotetaan Msalaton kansainvälisen kentän hankkeesta (S15/S16/P4).

## 2. Kansi — johdanto ja neljä aihetta

Johdantoehdotus: Dodoma kasvoi vanhan kaupankäyntialueen päälle rautatiekaupungiksi ja myöhemmin pääkaupungiksi. Sen seudulla asukkaiden maa, rypäleet ja oppimisen ympäristöt ovat hallintotaloja vanhempia tai niistä erillisiä asioita.

### K1 — Nuori kaupunki vanhalla kauppareitillä

Wiki **Dodoma**, History, täydentävä **Central Line (Tanzania)** ja S6.

1. S1 nimeää aikaisemman pienen markkinapaikan Idodomyaksi.
2. Nykykaupunki syntyi 1900-luvun alkupuolen rautatierakentamisen yhteydessä.
3. Alue ei syntynyt tyhjästä: Ugogo kuului jo aiempien karavaanireittien maailmaan (S4/S6).
4. Kaupungin siirtomaakauden asemakaava erotti eurooppalaisen korttelin ja paikallisen kylän (S1), neutraali tapahtuma, ei ihannointi.
5. Radan kautta maataloustuotteita vietiin rannikon suuntaan (S4/P6).
6. Myöhempi pääkaupunkisuunnitelma on toinen kehitysvaihe, ei kaupungin ensimmäinen synty.

Ei tarkkaa 1907/1910-perustamisvuotta yhdellä itsenäisellä luetulla todistusketjulla. Ei isoisää 1873 kaupungin kadulle/junaan. H3 käsittelee eri ratojen tekniikkaa ja nykyasemia, ei tätä syntytarinaa uudelleen.

### K2 — Rypäle, jolla on paikallinen nimi

Wiki **Tanzanian wine**, Early history/Makutupora/Wineries.

1. Dodoman seutu on Tansanian viininviljelyn alue.
2. Viljelyn varhaisessa vaiheessa lähetysyhteisöt kasvattivat köynnöksiä omaan käyttöönsä.
3. Viljely laajeni myöhemmin kaupallisiksi tiloiksi ja tuottajayrityksiksi.
4. Makutupora on alueen nimellä tunnettu paikallinen rypälelajike.
5. S3 luettelee myös esimerkiksi Chenin Blanc-, Syrah- ja Cabernet Sauvignon -lajikkeita; yhden kuvan terttua ei tunnisteta niiksi ulkonäöstä.
6. Rypäleiden viljely ja viinin valmistus ovat eri työvaiheita ja voivat sijaita eri paikoissa S3:n historia-/yrityskuvauksissa.

Ei tuotantomääriä, kahden sadon tarkkoja kuukausia, ”toiseksi suurin”-superlatiivia, vankilatarinaa tai alkoholin mainos-/maistelusuositusta. Ei väitettä koko maan kaikkien rypäleiden kasvamisesta vain tässä maakunnassa. Ilmastollinen syy ei tule viiniartikkelista sääriviin.

### K3 — Pääkaupunki, josta suunniteltiin kylien verkkoa

Wiki **Dodoma**, History/master plan.

1. Pääkaupungin siirto nousi 1970-luvulla suunnitteluhankkeeksi.
2. Kaupungin sijainti maan keskiosassa oli hankkeen perusteiden joukossa lähteen mukaan.
3. Suunnitteluratkaisuja pyydettiin kansainvälisiltä toimistoilta.
4. Valittu toimisto oli kanadalainen Project Planning Associates.
5. Suunnittelussa käytettiin ”village in a nation of villages” / kylämäisen pääkaupungin ajatusta, ei samoja suurieleisiä ratkaisuja kuin joidenkin muiden uusien pääkaupunkien suunnitelmissa.
6. Suunnitelman ja lopullisten instituutioiden sijainnit eivät ole sama asia: S1 sanoo parlamentin päätyneen muuhun paikkaan kuin alkuperäisessä suunnitelmassa.

Ei nykyjohtajia, kansanäänestyksen nykykehystä, rahaa tai tavoiteväkilukuja toteutuneiksi. Kaupunkisuunnitelman piirros voi olla suojattu uusi teos: sitä ei valita kuvaksi ilman oikeustarkistusta. Kuvan on oltava oikea kaupunkimaisema, ei Brasília/Abuja/Doxiadis-suunnitelma Dodomana.

### K4 — Mgogo, Wagogo ja Kigogo

Wiki **Gogo people**, johdanto/infolaatikko sekä Ugogo-historia.

1. Gogo/Wagogo on Dodoman alueen asukkaisiin liittyvä kansan nimi.
2. Yhdestä ihmisestä käytetään taulukossa nimitystä **Mgogo**.
3. Ihmisten ryhmästä käytetään nimitystä **Wagogo**.
4. Kielen nimi on **Kigogo**.
5. S6 sijoittaa yhteisöt Ugogon/Dodoman seudulle; nykyinen kaupunki ei tarkoita kaikkien samaa etnistä taustaa.
6. Ugogo oli osa 1800-luvun karavaanireitin aluehistoriaa ennen nykyistä rautatiekaupunkia.
7. S6:n vanha tembe-rakennuksen kuva on **historiallinen kuvalähde-ehdokas**, ei nykyisen perheen talo eikä vuoden 1873 täsmällisen kaupunkikorttelin sijaintitodiste.

Ei vanhaa väestöarviota, maata ”vaikeiksi” leimaavia matkailijakirjoittajien lainauksia, lähteettömiä perhe-/sukulaisuuden yleistyksiä tai nykyisten poliitikkojen listaa. S6:n Hukwe Zawose -soitin-/musiikkihistoria jätetään maan jo valmiille musiikkisivulle. Ei kieliopin/etymologian syy-yhteyttä pelkkien nimeämistaulukon sanojen perusteella.

## 3. Teemasivu — tiede, Kaupungissa opitaan ja tutkitaan

Vakioaihe `tiede`. Johdantoehdotus: Dodomassa samaa seutua voi lähestyä kiven, luokkahuoneen ja kulkureitin kautta. Instituution tehtävä ja sitä varten rakennettu talo ovat eri asioita.

### H1 — Kivi museossa, näyte tutkimuksessa

Taustawiki **Geological Survey of Tanzania**; alkuperäisen P3-PDF:n sivut 5/10.

1. GST:n päätoimisto on Dodomassa.
2. Virasto säilyttää geotieteellistä tietoa ja kansallisia aineistoja.
3. Sen museossa on **kiviä ja mineraaleja**.
4. Virastolla on myös eri puolilta maata kairattuja näyteaineistoja; museo ja näytevarasto eivät ole sama tila.
5. Työhön liittyy geologisia karttoja, raportteja, kirjastoa ja arkistoa.
6. P3 luokittelee museopalvelun osaksi tietokanta-/tietopalveluja; yksittäistä kiveä ei sanota löydetyksi Dodoman kaupungista vain sen näyttelypaikan vuoksi.
7. Museon olemassaolon nykyinen palvelusivu P2 tukee; sen hinnasto ei lupaa tiettyä näyttelyesinettä tai päivittäistä pääsyä.

Ei viraston nykyjohtajaa, koko maan kaivos-/talouspolitiikkaa, erikseen tunnistamattoman jalokiven nimeä tai vulkaanista ikää. Kuvaksi todellinen kivi/mineraali ja tunnistus; ei hiottua tekotaideteosta, suojattua museorakennusta tai kuvan asiantuntijan kasvoja. GST:n kuvia/sivuskannauksia ei ole valittu Commons-aineistoksi.

### H2 — Kaksi yliopistoa eri paikoissa

Wiki **University of Dodoma**, **St. John's University of Tanzania**; P1.

1. UDOM on julkinen yliopisto.
2. St John's on yksityinen yliopisto, jolla on anglikaaninen institutionaalinen yhteys.
3. Molemmat ovat modernin kaupungin korkeakouluja, eivät vuoden 1873 oppilaitoksia.
4. UDOM sijaitsee Chimwaga-alueella keskustan ulkopuolella mäkisessä ympäristössä (P1), ei samassa pisteessä kuin SJUT.
5. UDOM tarjoaa eri alojen, esimerkiksi kasvatustieteen, luonnontieteen ja maantieteen opintoja (S7); ei ohjelmalukuja tai hakukelpoisuuslupausta.
6. SJUT:n luetuissa opintosuunnissa ovat koulutus, hoito-/farmasia-ala ja yhteisökehitys (S8); ei vanhaa opiskelijamäärää tai nykyisen johtajan nimeä.

St John'sin Mazengo-koulun perintö näkyy hakutuloksissa mutta tämän kierroksen SPA-lähde ei tuonut alkuperäistä tekstiä luettavaksi; **ei sitä yksityiskohtaiseksi lehtifaktaksi tässä**. Yliopiston institutionaalinen historia ei vapauta sen uutta rakennusarkkitehtuuria kuvaksi/kohteeksi.

### H3 — Vanha ja uusi rata eivät ole sama asema

Wiki **Central Line (Tanzania)** ja **Tanzania Standard Gauge Railway**; P5 ja O1.

1. Vanha Central Line kulkee rannikon Dar es Salaamista Dodoman kautta sisämaahan.
2. Vanha linja on metriraiteinen; kyse on teknisestä lajista, ei toisen radan kopio.
3. SGR on normaaliraiteinen ja osin rinnakkainen uusi linja.
4. Uudemman linjan rakentaminen on ollut vaiheittaista; kokonaisen maan/laajemman reitin suunnitelma ei ole yhtä aikaa valmistunut matkustajareitti.
5. O1 erottaa Dodoman vanhan keskustaaseman ja uuden pohjoisemman SGR-aseman; **sen pisteet ovat Wikivoyagea, eivät kartan sallittu WP/WD-lähde**.
6. P5:n virallinen palvelu erottaa MGR- ja SGR-palvelut; tämän päivän lähtö-/matka-/hintatietoa ei johdeta vanhasta asemakuvasta.

Maan TAZARA/Vapauden rata -nostoa ei kopioida: se on eri linja. Ei juna-aikataulua tai aseman nykyistä rakennuskuvaa vuodeksi 1873. Vanha kapearaiteinen dieselveturi ei havainnollista SGR:n sähköjunaa ilman oikeaa roolia.

### H4 — Jamhuri on myös muualla

Wiki **Jamhuri Stadium (Dodoma)**, **Dodoma Jiji FC**; S1/S13/S14.

1. Jamhuri Stadium on Dodomassa sijaitseva monikäyttöinen urheilupaikka.
2. S13 kertoo pääkäytön olevan jalkapallo.
3. Morogorossa on samanniminen **eri** stadion; täsmennyssivun nimi ei todista kuvan olevan Dodomasta.
4. Dodoma Jiji FC on kaupungissa toimiva seura.
5. S14 nimeää sen kotikentäksi Dodoman Jamhurin.
6. S13 nimeää myös JKT Ruvu Starsin; kotikentän käyttäjän muuttumista ei päätellä yhden kuvan/päivämäärän perusteella.

Ei kapasiteetti-/yleisö-/sarjasijoituslukuja, omistajapolitiikkaa tai ottelupäivän lupausta. S1:n ”formerly Polisi Dodoma” ja S14:n uusi perustaminen eivät tässä vahvista seurojen täydellistä nimenvaihtohistoriaa. Urheilukentän tavallinen toiminta ei automaattisesti ole taideteos; rakennusosat ja nykyisen stadionin tekijäketju ovat silti avoimia B/D:ssä.

### Minitehtävä

H3: kumpi rata käyttää **normaaliraidetta**: SGR. Vastaus jää H3:een. Alla oleva visa ei kysy samaa rautatietekniikkaa. Ei matka-aikaa/raideleveyden numeroa muistettavaksi.

## 4. Nykyopas — viisi jaksoa ja säälähdeauditointi

### O1 — Vanha keskus ja nykyiset kampukset

S1/O1 auttavat erottamaan keskustan vanhan markkina-/asemaympäristön, pohjoisemman uuden aseman ja Chimwagan yliopistoalueen. Ei kuvasta, ward-pisteestä tai institutionaalisesta nimestä keksittyä sisäänkäyntiä. Kampuksen pääsyä, moskeijan vierailua tai parlamentin kuvaamista ei luvata; O1 varoittaa parlamenttialueen pääsy-/kuvausrajoituksista.

### O2 — Seudun viiniköynnökset ja arki

Dodoman seudun rypäleenkasvatuksen taustaa voi selittää S3:n avulla. Tilan sijainti voi olla kaupungin ulkopuolella, ja viljelmä/winery ovat eri paikkoja. Ei viiniyrityksen hinnastoa, vierailua, tuotemerkin myynninedistämistä tai kuljetuslupausta. Maan chips mayai-/pilau-/mauste-/Forodhani-tarinat eivät tähän uudelleen.

### O3 — Opetus, tutkimus ja kuvat

Geologisen museon kivinäytteet ja korkeakoulut ovat eri instituutioita (S7–S9/P1–P3). Museon varaston pääsyä tai juuri tietyn mineraalin nykyistä näyttelyä ei luvata. Kuvattavan uuden rakennuksen oma suoja-/tekijäketju tarkistetaan, vaikka instituutio on todellinen; kuvaajan CC-lisenssi ei yksin ratkaise sitä.

### O4 — Sää: alkuperäisarvot ja normaali

P7: [NOAA/WMO:n alkuperäinen CSV, DODOMA 63862](https://www.nodc.noaa.gov/archive/arc0216/0253808/1.1/data/0-data/Region-1-WMO-Normals-9120/Tanzania/CSV/DODOMA_63862.csv), otsikko **World Meteorological Organization Climate Normals for 1991–2020**. Station_Name DODOMA, WMO **63862**, WIGOS 0-20000-0-63862. Parametrit 1/3/4 ovat sade, keskimääräinen ylin ja alin; kuukausien pyöristykset vastaavat alkuperäistä `saa.json`:ia.

P8: [JMA, station 63862 Dodoma](https://ds.data.jma.go.jp/gmd/tcc/tcc/products/climate/normal/parts/NrmMonth_e.php?stn=63862). Kaksitoista kuukausikeskilämpöä vastaavat `saa.json`:ia täsmälleen. Sivulla DODOMA/UNITED REPUBLIC OF TANZANIA, latitude **6.17°S**, longitude **35.77°E**, height **1119 m**.

P9: [JMA:n alkuperäinen normaaliselitys](https://ds.data.jma.go.jp/gmd/tcc/tcc/products/climate/explanation/normal.html), myös [nykyinen canonical-osoite](https://www.data.jma.go.jp/tcc/tcc/products/climate/explanation/normal.html). Todellinen peruskausi **1991–2020**, GHCN-kuukausiaineisto ja CLIMAT-raportit; peruskauden puuttuviin havaintoihin liittyvät kelpoisuusehdot. P10: [JMA World Climate](https://ds.data.jma.go.jp/tcc/tcc/products/climate/index.html) vahvistaa saman peruskauden. Tämä on alkuperäinen menetelmäsivu, **ei vain WP-taulukon otsikko**.

**Asemaotsikon ristiriita:** NOAA CSV latitude **06|42|00|S** (−6.70) eroaa JMA:n −6.17:stä, vaikka nimi/WMO-ID ovat samat. S15:n Dodoma Airport nimeää myös WMO 63862 ja sijaitsee −6.17028, 35.74944. S1:n JMA-viitteen 6.17°N on puolestaan tekstivirhe verrattuna todelliseen JMA-sivuun 6.17°S. Koordinaattivirhettä ei korjata hiljaa eikä `saa.json`:ia vaihdeta tämän agentin toimesta. Pääsessio sai tiedon ja päättää, riittääkö alkuperäisillä WMO-ID/kausi/arvoriveillä todistettu identiteetti sääkäyttöön.

Koneellinen todiste `saa-auditointi.json`: kaikki **48 arvoa** vastaavat alkuperäislähteitä/pyöristyksiä. `tausta`: Dodoma, revisio **1378653712**, Climate data for Dodoma (1991–2020); NOAA sade/ylin/alin, JMA keskilämpö. DWD:n 1961–1990-viite liittyy äärilukuihin/kosteuteen, joita `saa.json`:in pelirivissä ei ole. Ei sen vanhan kauden lainaamista nykyiseen keskilämpöön.

**C-ohje:** ennen pääsession asemaotsikkoratkaisua ei ilmastolukuja tai säärivin luonnehdintaa uusiin teksteihin. Jos sarja hyväksytään, vain nykyisen `saa.json`:in arvot, ilman `tausta`-kenttää peliin; ei JMA:n eri sadesarjaa NOAA-sateen tilalle tai käsin sääkauden/sijainnin korjausta. Null on mahdollinen ratkaisu ilman A:n kartta-aukon piilottamista.

### O5 — Varovaisuus ja saapuminen

O2 **2.10.2026**: erityinen varovaisuus, väkijoukkoja ja pimeällä jalankulkua vältetään, paikallisia ohjeita seurataan. Ei nykypolitiikan/rikollisuuden kertomuksia. Nykyiset maahantulo-/terveys-/vakuutusehdot tarkistetaan; UM kertoo pakollisen matkavakuutuksen edellytyksestä lokakuun 2026 alusta, jota ei sekoiteta Sansibarin erilliseen käytäntöön. Ei maksua tai vakuutustuotteen suositusta.

**Dodoma Airport, DOD** on vanha kenttä (S15/O1). **Msalato International Airport** on eri sijainnin hanke: P4:n nykyinen viranomaisjulkaisu sanoo **OnProgress**. Viranomaisen hankelista tai vanha ”aikomus valmistua”-vuosi ei todista sieltä lähteviä lentoja. Ei lentoyhtiö-/lähtö-/junavuorolupausta, reitin aikataulut tarkistetaan ennen matkaa. Uusi SGR-asema ei ole vanha keskustan asema.

**Parasta 5 -aihevara:** rautatiekaupungin historia; rypäleenkasvatuksen seutu; kaupunkisuunnitelman kerrokset; geologinen tutkimus/museon kivinäytteet; Gogo-asukkaiden nimet ja kieli. Ei turvallisen Lion Rock -nousun/kampuskierroksen lupauksia ilman nykyistä paikallista vahvistusta.

**Hyvä tietää 4:** vanha ja uusi asema erotettava; Msalatoa ei oleteta valmiiksi matkustajakentäksi; kuvaus-/pääsyrajoitukset tarkistettava; pakollisen vakuutuksen/maahantulon ajantasaiset ehdot ennen matkaa. Kolme tuoretta opaskuvaa vähintään B:ssä, enintään kaksi kuvatonta jaksoa.

## 5. Kohdekartan rajattu selvitys — portit eivät sulkeudu

Tavoite on Dodoman vanha keskustan markkina-/asemaydin ja välittömät lähiluontopaikat. Kaupunki perustettiin myöhemmin, joten **nykykartalla saa olla nykyisiä kohteita**, mutta niiden vuoden 1873 poissaolo ja suojatun teoksen/paikan ero pitää sanoa rehellisesti. Dodoma City Councilin suuri hallintoalue ei ole ”pieni pääkaupunki” -poikkeuksen peruste. Ei lopullista `rajat`-laatikkoa ennen riittävää hyväksyttyä kohdejoukkoa.

### N1 — Lion Rock / Simba Hill — luonto, oma piste puuttuu

O1 tunnistaa Dodoman pohjoispuolen paikaksi Lion Rock / Simba Hill ja näkymäkohteeksi. S10 mainitsee Makolen alueen korkeimman paikan nimenä Lion Hill. **Makolen oma WP-piste −6.16130, 35.76210 ja WD-piste −6.16452, 35.76266 tarkoittavat hallinnollista ward-aluetta, eivät tätä kukkulaa.** Niitä ei lainata.

Lion Rockin, Isenin, Mlimwan ja Chimwagan en-WP-sivuyritykset sekä sw Simban yritys 404. O1 ei anna tässä omaa hill-pistettä. P1:n Chimwaga-yliopisto itäpuolella ei todista Lion Rockin olevan sama paikka kuin pohjoisen Simba Hill. Graniitti-/korkeus-/kävelyaika-väitteet ovat muissa matkasivukatkelmissa, eivät tässä alkuperäisinä varmennettuja geologisia faktoja. Vuoden 1873 tarkkaa nimeä/reittiä ei tiedetä. **Oma WP/WD-piste ja 6–10 riittävää paikkafaktaa puuttuvat; ei hyväksytty karttakohde.**

### N2 — Vanha Dodoman rautatieasema — rakennus, oma piste/tekijä puuttuu

S1 sijoittaa sen keskustaan/Kikuyu Avenuen yhteyteen, S4:n reitti kulkee Dodoman kautta. O1:n vanhan aseman **−6.1841, 35.7493** on Wikivoyage-piste, ei sallittu WP/WD-paikkatodiste. Oma en-sivu ei löytynyt. Aseman suunnittelija, alkuperäinen runko/nykyiset osat, paikkahistoria ja 6–10 erillistä kohdefaktaa eivät ratkenneet. Ei kaupungin pisteen tai hotellin vastapäisen sijaintikuvauksen lainaamista asemapisteeksi. Vuonna 1873 nykyistä asemaa ei vielä ollut. **N2 partial.**

### N3 — Nyerere-aukio — aukio, oma piste ja kohdehistoria puuttuvat

Hakutuloksissa on valtiollista/matkailullista aineistoa ja patsaskuvaa, mutta varsinainen kaupungin-/maakuntasivun sisältö jäi tämän kierroksen lähdehaussa SPA-kuoreksi. Omat en/sw-aukiosivut eivät löytyneet. **Ei omaa WP/WD-pistettä tai 6–10 luettua paikkafaktaa.** Julkinen aukio ei automaattisesti ole suojattu taideteos, mutta sen patsas/valaistus ja mahdollinen suunnittelu eivät vapaudu aukion nimen avulla. Patsas ei myöskään ole sallittu rakennus/aukio/luonto-tyyppinen kohde tässä. Vuonna 1873 nykyinen nimetty aukio/patsas ei ollut; tarkkaa alueen maankäyttöä ei keksitä. **Ei karttaan nyt.**

### N4 — Gaddafi-moskeija — rakennus, tekijäketju avoin

Oma S12:n WP **−6.17278, 35.74583**; WD Q15221246 **−6.17269, 35.74572**, lähellä samaa kohdetta. Lähdeketju: sijainti Dodoma, toiminnallinen moskeija, nykyinen islamilainen yhteisö/BAKWATA-yhteys, 2000-luvun uusi rakennus, nimen/rakennuttamisen ulkopuolinen rahoitus. Tarkat kapasiteetti-/kustannus-/suuruusluvut pois.

**Raja:** suunnittelijaa/P84:ää ja myöhempien osien tekijäketjua ei löytynyt. Rahoittaja ei arkkitehti; uuden luovan rakennuksen kuva/kohde ei automaattisesti ole vapaa. Nykyjohtajan/rahoittajan poliittinen tarina pois. Ei ollut vuonna 1873. Kuusi kohdefaktaa ja hyväksytty suoja-/tekijäketju puuttuvat. **N4 partial, ei rakennuslupaa B:lle.**

### N5 — Jamhuri Stadium, Dodoma — toiminnallinen urheilurakenne, fakta-/tekijäportti avoin

Oma S13 ja WD **Q6146332**, revisio 2475144458: **−6.17310, 35.74380**. Paikka on monikäyttöinen stadion, pääkäyttö jalkapallo, sama nimi myös Morogoron eri kentällä; S14 liittää Dodoma Jijin tähän ja S13 nimeää toisen kotikäyttäjän. Tavanomainen urheilutoiminto erotetaan mahdollisesta luovasta katsomo-/rakennusarkkitehtuurista.

Oman pisteen portti täyttyy, mutta alkuperäinen rakentamisaika, suunnittelija, nykyiset osat, historian eri käytöt ja 6–10 kohdefaktan kokonaisuus eivät. Kapasiteetin/yleisön tai tämän päivän otteluiden luvut eivät täydentäviä faktoja. Vuoden 1873 nykyistä stadionia ei todisteta olleen. Stadionkenttää ei muuteta aukio-/luonto-tyypiksi vain tekijäketjun välttämiseksi. **N5 partial.**

### N6 — Geologinen museo — instituutio, oma paikkapiste puuttuu

P2/P3 todistavat Dodomassa GST:n museopalvelun, kivi-/mineraaliaineiston ja tutkimus-/kartta-/arkistoyhteyden; H1:ssä seitsemän instituutiofaktaa. **WD Q118904850 on GST-virasto eikä sisällä P625:tä.** Viraston pääkonttori ei ilman omaa museopistettä ole sen sisäänkäynti tai näyttelyrakennus. Oman WP-museoartikkelin/pisteen ja fyysisen tilan nykyisen rakennus/teos-ketjun puute estävät N:n sulkemisen. Ei ollut tässä muodossa 1873, alkuperäisen alueen rakennuksia ei tunneta. **N6 partial.**

### N7 — St John's University — nykyinen institutionaalinen paikka, rakennuskohde avoin

S8:n oma institutionaalinen campuspiste **−6.19889, 35.73111**, WD Q7588856 sama (WD erittäin väljä tarkkuus). Faktat S8: yliopisto Dodomassa, yksityinen, anglikaaninen yhteys, 2000-luvun perustaminen, eri opintosuuntia, campus kaupunkiympäristössä. Nykyistä kampusarkkitehtuuria ei kutsuta vuodelta 1873 säilyneeksi rakennukseksi tai vapaaksi teokseksi.

**Raja:** instituution piste ei tunnista yhtä rakennus-kohdetta/porttia eikä lähde omia nykyisten rakennusosien tekijöitä. Mazengo-/Idodomya-yhteys jäi vailla luettua alkuperäistodistetta; yliopistopiste ei Idodomya-pisteeksi. Tämä on mahdollinen nykyinen paikkarooli, mutta **ei hyväksytty historiallista keskustaa täydentävä N-rakennus**.

### N8 — Chimwaga / University of Dodoma — kohde- ja ydinrajaus ei täyty

S7/WD Q693769 **−6.21472, 35.82472** koskee yliopiston suurta kampus-/instituutioaluetta. P1 sanoo Chimwaga-alueen noin 8 km keskustasta itään ja mäkiseksi. Ei oma hill-/Lion Rock -piste. Yliopiston modernit oppi-/hallintorakennukset eivät ole sama kuin maastonikä, eikä laaja campuksen piste nimeä yhtä rakennusta. Ei vuoden 1873 yliopistoa, suojavapaata rakennusta tai keskustan luontokohdetta. **N8 ei tähän ydinkarttaan.**

### Muut poisjätetyt pistevaihtoehdot

- **Mtumba / Government City:** oma ward-piste −6.14582, 35.94232 kaukana vanhan ytimen itäpuolella. Ei ministeriön sisäänkäynti tai vanha aukio, eikä ward yksi sallituista kohdelajeista.
- **Makole:** ward-piste ei Lion Hillin piste. Koordinaattien viisi desimaalia ei muuta laajaa hallinnollista kohdetta tarkaksi luonnonpaikaksi.
- **Holy Spirit Cathedral / Sunni(Nunge) / Ismaili-temppeli:** S1/O1 olemassaolon mainintoja, mutta omat WP/WD-pisteet, rakennusosat/tekijät ja 6–10 paikkafaktaa eivät valmistuneet. Ei arvattuja pisteitä.
- **Msalato-lentoasema, uuden SGR-aseman piste, Hombolo/Kondoa/Makutupora-retket:** sijainti-/paikkatyypin tai historiallisen ydinrajauksen vuoksi eivät tämän kartan määrätäytteitä. Kondoa Rock Art ei kaupungin keskustan nähtävyys.

## 6. Viisi kysymysaihetta ja kolme tietoa

1. **Taso 1:** missä osassa Tansaniaa Dodoma sijaitsee? Maan keskiosassa (S1).
2. **Taso 1–2:** mitä paikallinen sana Kigogo nimeää? Kielen (S6), ei hedelmälajiketta tai yksittäistä ihmistä.
3. **Taso 2:** mihin tuotantoon Dodoman seudun Makutupora liittyy? Rypälelajikkeeseen/viininviljelyyn (S3); C tekee yksiselitteisen vastausmuodon.
4. **Taso 2–3:** missä työssä GST käyttää kairausnäytteitä/kiviä ja karttoja? Geotieteellisessä tutkimuksessa (S9/P3), ei väärää museoesineen löytöpaikkatietoa.
5. **Taso 3:** millaisen kaupungin ajatusta Dodoman 1970-luvun suunnitelmassa korostettiin? Kylämäinen kaupunki/verkko (S1), ei yksilöidyn arkkitehtuuripiirroksen muistamista.

Neljä uskottavaa vastausta, oikea ei ainoa pitkä. Vihje ei toista ratkaisua. H3:n SGR-normaaliraide ei sama visakysymys. Ei nykyisiä ottelu-/hallintolukuja.

Kolme tiedon aihetta:

- Nykyisen Dodoman rautatiekaupungin alla on vanhempi kaupankäyntialue, ei tyhjää historiaa (S1/S6).
- Sama Jamhuri-nimi kuuluu eri stadioneille Dodomassa ja Morogorossa (S13); kuva pitää tunnistaa.
- Museon kivi voi olla eri puolelta maata kuin museo, ja kairausnäytevarasto on eri asia kuin näyttely (P3).

## 7. Kuvatarpeet — ei valintoja

Vain Commons, PD/CC0/CC BY/CC BY-SA, vähintään 1 200 px, tekijä/lisenssi alkuperäisestä sivusta ja jokainen kuva katsottu B/C/D:ssä. Luettavat kasvot, lisätyt vesileimat/signeeraukset/leimat/kehykset, mainos/pakkauskuvat pois. Sama tiedosto kerran kaupungissa. Kaikki kuvan teos-/rakennusketjut erikseen; instituution olemassaolo tai uusi katu ei automaattisesti tarkoita taideteoksen kuvauslupaa.

| Kohta | Tarve/hakusanat | Rooli |
|---|---|---|
| Kansi 1–3 | Dodoma wide city/rail neighbourhood/landscape | eri puolia laajoina yleiskuvina, ei suojattu yksittäinen uusi rakennus pääteoksena |
| K1 | historical Dodoma street/market/rail town | kuva-aika lähteestä, ei 1900-luvun näkymää vuodeksi 1873 |
| K2 | grape vine Makutupora Dodoma region | terttu ei lajiketunnistus silmämääräisesti, viinipullomainos pois |
| K3 | Dodoma planned streets/wide town | ei suojatun master plan -piirroksen kopio tai toisen pääkaupungin kuva |
| K4 | old tembe depiction / ordinary language-cultural setting | oikea vanha kuvalähde, ei kasvoja/eksotiikkakuvastoa tai kuvan käyttöä täsmä-1873-korttelina |
| H1 | rock/mineral/core sample | oikea tunnistus/provenienssi, ei moderni taideteos tai GST-PDF:n skannaus |
| H2 | learning equipment or lawful campus landscape | yleinen havainne nimettävä; nykyinen rakennus ei automaattisesti kelpaa |
| H3 | actual MGR vs SGR train/track | oikea tekniikka ja linja, ei TAZARA-kuvan uudelleenvalinta |
| H4 | actual Dodoma Jamhuri football field | ei Morogoron kenttää, luettavia kasvot/nykyisiä suojattuja katsomoteoksia |
| Matkailijalle | tuore maltillinen pysty, yksi paikallinen tavallinen/luonnonaihe | suhde 0,60–0,85, ei moskeijan/taideteoksen uusi pääkuva oletettuna vapaaksi |
| Opas | vähintään 3 tuoretta kuvaa | enintään kaksi kuvatonta jaksoa, historialliset kuvat nostoon |
| N-kohteet | vasta hyväksytystä kohteesta oma kuva | tämä A ei hyväksy kuutta N-kohdetta; GPS-/ward-/instituutiopiste ei korvaa lähdepistettä |
| Valokuva | yksi lähteistetty vanha/nykyinen kaupunkinäkymä | oikea aika/paikka, ei generointia |
| Ennen–nyt | vain aidosti 1870-luvun PD-vedos ≥1 200 px | modernia Dodoma-kaupunkia ei ollut vielä, myöhempi postikortti ei matkavuoden kuva |

## 8. Ristiriidat ja ratkaisut

1. **Syntyvuosi:** S1 1907, eri matkatuloksissa 1910; julkaistava **1900-luvun alkupuolella**, tarkkaa vuotta ei kahdella riippumattomalla luetulla lähteellä. Markkinapaikka/alue edelsi modernia kaupunkia.
2. **Pääkaupunkivuosi:** S1 1974, O1 1973, ”official since 1996” S1:ssä citation needed; **1970-luvun pääkaupunkihanke**, nykypääkaupunki erillisenä asemana. Ei nykyhallinnon muuttojen kronologiaa kertomukseksi.
3. **Viiniyritys:** S3 intro hallinto/yritys 1969 vs historian uusi yhtiö 1979. Viljelyn ja kaupallisen organisoinnin eri vaiheita ei yhdistetä yhdeksi täsmävuodeksi. Tuotantosuperlatiivi/eksporttikertoimet pois.
4. **Nimenselitys:** Idodomya/elefantti on perimätieto/paikkatieto eri lähdekatkelmissa; luettu oma S1 vahvistaa vain aikaisemman markkinapaikan nimen. Ei viranomaisen SPA-kuoren tai hakukone-PDF-katkelman varaan rakennettua faktatarinaa.
5. **Gogo:** vanhat colonial writers -sitaatit ovat loukkaavaa aikalaiskehystä, eivät nykyisten asukkaiden ominaisuuksia. S6:n monet sukulaisuus-/puolisomäärä-/puolustusväitteet citation needed, eivät nostoon. Elävä paikallinen nimi/kieli erotetaan stereotyypeistä.
6. **Lion Rock:** Simba Hill, Lion Hill, Iseni/Mlimwa/Chimwaga eivät tässä kaikki todistettuja synonyymejä. Makole-ward ja UDOM-campuspiste eivät kukkulapisteitä. Kuusi kohdetta ei täytetä lainaamalla niitä.
7. **Jamhuri ja seura:** nimi on myös Morogorossa. S13/S14 luettelevat eri kotikenttäkäyttäjiä, S1:n Polisi-nimihistoria ei sulkeudu uudelleen nimetyksi samaksi seuraksi. Ei sarjasijoitusta/kapasiteettia tai tämänpäiväistä peliä.
8. **Uudet institutionaaliset paikat:** yliopiston ja viraston todellinen olemassaolo ei ratkaise yksittäisen rakennusteoksen tekijää, sisäänkäyntiä tai historiallisen ytimen roolia. P84 puuttuu monista WD-tiedoista, ei merkitse suojaa päättyneeksi.
9. **Sää:** 1991–2020-kausi todellinen P7/P9/P10, JMA:n kaikki 12 keskilämpöä ja NOAA:n kaikki 36 pyöristystä täsmäävät. NOAA latitude 06|42|00|S vs JMA 6.17°S vs sama WMO-ID 63862 kuitenkin ristiriita. Asia pääsessiolle, ei omaa saa.json-muutosta. DWD:n vanhan kauden äärilukujen/kosteuden olemassaolo ei ole näiden valittujen parametrien normaalikausi.
10. **Sateet eri lähteissä:** JMA-sivun oma sadesarja poikkeaa NOAA:n sarjasta. Alkuperäinen työkalu käyttää WP-taulukon NOAA-sadetta, jota ei korvata JMA-sateella keskilämpöjen vuoksi. JMA:n menetelmä käyttää GHCN/CLIMAT-aineistoa ja kelpoisuusehtoja; saman kauden lähteet eivät merkitse samoja havaintomääriä joka kuukaudessa.
11. **Nykyliikenne:** vanha keskustaasema, uusi pohjoinen SGR-asema ja lentoasemat eri paikkoja. Projektin aikataulu tai kaupungin general-koordinaatti ei niiden toimintalupa/sijaintitodiste.
12. **Msalato:** S16 under construction ja P4 OnProgress, ei valmis uusi lentoasema todistetusti; Dodoma Airport DOD erillinen. Ei nimeä/lippua toisen kentän sijaintiin.
13. **Tarkat luvut:** rakennus-/perustamisvuodet, korkeudet, etäisyydet, kapasiteetit, raha ja sadon määrät yleistä/pois ilman kahta riippumatonta lähdettä. Säärivi on nimenomaan alkuperäisen säätyökalun poiminta, jonka lähdeauditointi erikseen dokumentoitu, ei muistinvarainen luku.

## 9. Poisjätöt ja valmiiksi tulemisen ehdot

- Nykyinen hallintojohtajapolitiikka, 2025–2026 levottomuudet, vaalit, nykyiset rikokset ja vankilahistoria eivät lehtitarinoiksi. UM:n olennaiset nykyiset varovaisuus-/maahantulo-/vakuutusohjeet pysyvät lyhyessä oppaassa.
- Tansanian maalehden historia/TAZARA, luonto/apinat/tulivuoret, ruoka/mausteet/chips mayai/Forodhani, kuvat/Tinga Tinga/Makonde/ovet/kanga ja musiikki/taarab/Hukwe Zawose eivät uudelleen näihin nostoihin.
- Suojattu moderni rakennus, patsas, valaistus tai teos ei tule kuvaksi/kohteeksi Commons-kuvaajaluvan tai institutionaalisen nimen kautta. Tavallista funktionaalista toimintoa ja luontopaikkaa ei myöskään kielletä vain moderniudesta: tarkka kohde, paikkatyyppi ja teosketju arvioidaan, puutteet jäävät avoimiksi.
- Ei kuvitteellista vuoden 1873 katu-/kortteli-/katedraali-/yliopistokuvaa tai isoisän matkareittiä. Hallinnollinen ward-keskipiste ei Lion Hill-/museo-/asemapiste.
- Viranomaissivun 200-status, SPA-kuori, hakutulos tai PDF-niminen HTML ei ole luettu alkuperäistodiste. A:n lähdetaulukossa epäonnistuneet yritykset erotettu oikeista.

**A partial:** vaaditaan 6–8 oikeaa historiallisen ytimen kohdetta omilla WP/WD-pisteillä, 6–10 kohdefaktaa sekä tekijä-/osarajat. Sääasemaotsikon ristiriidan jatkoratkaisu pääsessiolle; tästä A:sta ei silti tule valmis kartta. Lähdepaketti käyttökelpoinen B/C-valmisteluun, aukkoja ei lasketa valmiiksi vaiheeksi.
