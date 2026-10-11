# Nouakchott — faktapohja, vaihe A

`nouakchott`, `MRT`, `e04`; koostettu 11.10.2026. Ohjeet samat kuin Rabatin A:ssa: PILVIOHJE 3, 4, 7, 13 ja LISÄSÄÄNTÖ, CODEX.md, AGENTS.md, lehtityöresepti ja Nairobi-mallin rakenne. Kaupungin konteksti ja valmis saa.json luettu. Tämä on kirjoittajan lähdeaineisto, ei valmis kaupunki. **Karttakohteiden määrä ja osa kohdekoordinaateista ovat vielä avoinna; niitä ei keksitä.**

Omistajan hyväksymällä lähdekanavan poikkeuksella luettiin robots-sallitut tavalliset Wikipedia-/Wikivoyage-sivut estettyjen API-polkujen sijasta. Pääsessio vahvisti Wikivoyagen kuuluvan tähän poikkeukseen. Wikidata EntityData on sallittu ja käytössä. Kaikki omat lähdepyynnöt ja uudelleenohjaukset tarkistettiin `sallittu_haku.py`:llä; kiellettyjä API-polkuja tai Special:Search/Export/SPARQL-reittejä ei pyydetty. Hakukoneosumat toimivat vain lähdepaikantimina; niiden tietoa ei käytetty tarkistamattomana faktana. Kuvasivut ja lisenssit kuuluvat B:lle.

## 0. Luetut lähteet ja 1873-kehys

Hakupäivä kaikissa 11.10.2026. Tekstit ja alkuperäiset lähdetiedostot: `/Volumes/NAS-Homes/samireivinen/Matkakirja-arkisto/paakaupungit-codex/sessio-72-20261011/valiaikainen/nouakchott-A/`. Verkkoloki: ylemmän `valiaikainen`-hakemiston `sallitut-haut.jsonl`.

| Tunnus | Lähde, kieli ja luetut osiot |
| --- | --- |
| N1 | [Nouakchott](https://en.wikipedia.org/wiki/Nouakchott), en: johdanto, History, Geography, Economy, Transport, Tourism. Climate luettiin ristiriidan löytämiseksi, mutta luvut otetaan vain saa.json:sta. |
| N2 | [Timeline of Nouakchott](https://en.wikipedia.org/wiki/Timeline_of_Nouakchott), en: kronologia. Ei pidetä itsenäisenä toisena lähteenä samoille Wikipedia-luvuille. |
| N3 | [Nouakchott, Wikivoyage](https://en.wikivoyage.org/wiki/Nouakchott), en: History, Get in, Get around, See, Do, Buy, Eat. Hinnat, aikataulut, alkoholiohjeet ja vanhat väestöluvut pois. |
| N4 | [Fish market (Nouakchott)](https://en.wikipedia.org/wiki/Fish_market_(Nouakchott)), en: johdanto, Description ja koordinaatti. Hygieniaväitteitä ei muuteta nykyiseksi yleiseksi ruoan turvallisuusarvioksi. |
| N5 | [Marocaine market](https://en.wikipedia.org/wiki/Marocaine_market), en: koko lyhyt artikkeli ja koordinaatti; lähde on niukka, ei kuutta itsenäistä kohdefaktaa. |
| N6 | [National Museum of Mauritania](https://en.wikipedia.org/wiki/National_Museum_of_Mauritania), en: johdanto, Building, Collections. Vanhoista kokoelmaesineistä voi kertoa; modernin museotalon arkkitehtuuria ei otettu kohteeksi. |
| N7 | [Friendship Port of Nouakchott](https://en.wikipedia.org/wiki/Friendship_Port_of_Nouakchott), en: johdanto, History ja Capacity and facilities. Erotetaan teollinen satama kalastajarannasta; luvut ja vanhat laajennussuunnitelmat pois. |
| N8 | [Nouakchott–Oumtounsy International Airport](https://en.wikipedia.org/wiki/Nouakchott%E2%80%93Oumtounsy_International_Airport), en: johdanto, infolaatikko ja History. Opas tarvitsee vain nykyisen lentoaseman nimen/IATA:n ja sijainnin kaupungin pohjoispuolella. |
| N9 | [Mauritanian cuisine](https://en.wikipedia.org/wiki/Mauritanian_cuisine), en: johdanto, Dishes, Beverages. Ruokatausta nimetään maan perinteeksi, ei Nouakchottin yksinoikeudeksi. |
| N10 | [Pirogue](https://en.wikipedia.org/wiki/Pirogue), en: johdanto ja Description. Yleinen venetyyppi, ei todistus jokaisen Nouakchottin veneen rakennustavasta. |
| N11 | [Meteorite](https://en.wikipedia.org/wiki/Meteorite), en: johdanto, Fall phenomena, The Sahara. Yleistä geologiaa Nouakchottin kauppafaktan taustaksi, ei yksittäisen myyntikiven aitoustodistus. |
| N12 | [Dromedary](https://en.wikipedia.org/wiki/Dromedary), en: johdanto, Etymology, Characteristics / Adaptations. Eläinmarkkinan lajitausta; ei lukumäärä-, paino- tai vedenkulutuslukuja. |
| N13 | [Nouakchott, Wikivoyage](https://de.wikivoyage.org/wiki/Nouakchott), de: Stadtteile, Anreise ja Aktivitäten; ennen kaikkea täsmällinen Kamelmarkt-listaus ja sen koordinaatti. Saksankielinen täydentävä kanava kirjataan poikkeamana; tarkat matkustusajat/hinnat pois. |
| N14 | [FAO: Support to the rehabilitation and extension of the Nouakchott green belt](https://www.fao.org/dryland-forestry/projects/detail/support-to-the-rehabilitation-and-extension-of-the-nouakchott-green-belt-%28mauritania/en), en: Background, project, Objectives, Activities. Virallinen ensisijainen täydentävä lähde kaupungin omaan vihervyöhykkeeseen. |
| N15 | [FAO: Fighting sand encroachment — Lessons from Mauritania](https://www.fao.org/4/i1488e/i1488e.pdf), Charles Jacques Berte, 2010, en: luku 2 Understanding sand encroachment (painetut sivut 3–5), luku 3 Sand dune fixation techniques (13–16), luku 4 An experience in sand dune fixation: rehabilitating and extending the Nouakchott Green Belt (19, 26–31). PDF säilyy alkuperäisenä; paikallinen tekstipoiminta `fao-manual.txt`. Tekniikkaa sovelletaan vain tämän dokumentoidun hankkeen kuvaukseen, ei luvata nykyisen jokaisen dyynin suojausta. |
| N16 | [FAO/Unasylva: Urban and peri-urban forests in sub-Saharan Africa: The Sahel](https://www.fao.org/4/u9300e/u9300e09.htm), en: sand and dust protection, green belts. Täydentävä historiallinen tausta; ei ajantasainen aluekartta. |
| N17 | [FAO/Unasylva: Rehabilitation of degraded sites](https://www.fao.org/4/y2795e/y2795e07.htm), en: Techniques for stabilizing dunes and protecting roads, Nouakchott–Boutilimit. Historiallinen tiekoe, ei matkailukohteen koordinaattilähde. |
| N18 | [FCDO: Mauritania travel advice](https://www.gov.uk/foreign-travel-advice/mauritania), en: Warnings and insurance; sivu ilmoittaa current at 11 October 2026, updated 24 March 2026. [Regional risks](https://www.gov.uk/foreign-travel-advice/mauritania/regional-risks) ja [Safety and security](https://www.gov.uk/foreign-travel-advice/mauritania/safety-and-security): alueellinen rajaus, liikkuminen, raha ja kuvauskäytännöt. Vain oppaan käytännön tieto, ei politiikkaa/rikostapauksia peliin. |
| WD1 | [Nouakchott Q3688 EntityData](https://www.wikidata.org/wiki/Special:EntityData/Q3688.json): P17, P1376, P206, P625, P1082 ja sitelinkit. |
| WD2 | [Ksar Q3200125 EntityData](https://www.wikidata.org/wiki/Special:EntityData/Q3200125.json) ja [Sebkha Q891950 EntityData](https://www.wikidata.org/wiki/Special:EntityData/Q891950.json): P625:n qualifierit tarkistettiin; kummankin piste **koskee kaupungintaloa**, ei torin tai vanhan kylän koordinaattia. Qualifierin Q9022797 EntityData vahvistaa nimityksen mairie. |

**UM-puute:** `https://um.fi/matkustustiedote/-/c/MR` haettiin sallitusti mutta palautti UM:n navigaation ilman Mauritanian maakohtaista tiedotetta. Maakohtaista UM-tasoa ei löytynyt eikä sitä arvata. Nykyoppaan varovaisuus tarkistettiin siksi vaihtoehtoisesta virallisesta FCDO-lähteestä (N18). Tämä poikkeama kirjataan RAPORTTI.md:hen.

Myös Canary Current -artikkeli sekä ranskan- ja saksankielinen Wikivoyage luettiin lähdevaihtoehtojen etsimiseksi. Merivirran artikkelissa oli niukkoja kohdistettuja viitteitä eikä siitä oteta Nouakchottin kalamääriä tai ilmaston syyselityksiä. Ranskan Wikivoyage ei tuonut uusia kelvollisia kohdekoordinaatteja.

### 1873-kehys

**Nykyistä suunniteltua pääkaupunkia ei ollut vielä vuonna 1873.** Nouakchottin laajentaminen pääkaupungiksi kuuluu 1900-luvun puoliväliin, ennen Mauritanian itsenäistymistä. Paikalla oli sitä ennen rannikon linnoitettu kalastajakylä, ksar, myös ennen Ranskan siirtomaa-aikaa (N1 History; N3 History). Ei ”kaupunkia ei ollut, vain tyhjä autiomaa” -väitettä: se poistaisi aiemman paikallisyhteisön.

Lähteet eivät kuvaa kylän tarkkaa asukasmäärää, rakennuksia tai yhtä vuoden 1873 näkymää. Siksi lehden aikavertailu sanoo vain, että suurkaupunki syntyi myöhemmin ja paikalla oli vanhempi kylä. Se ei keksi isoisän käyntiä, reittiä, havaintoa tai lausetta. Nykyisen kalamarkkinan, torirakenteiden, museon, vihervyöhykkeen tai eläinmarkkinan ulkoasua ei siirretä matkavuoteen.

## 1. Perusfaktat

- **Nimi:** Nouakchott; kontekstin arabiankielinen nimi نواكشوط. WD1:n fiwiki- ja enwiki-otsikko on Nouakchott. Nimen merkitystä ei lähdeaineisto vahvistanut riittävästi; ”tuulten paikka” tai muu mieleen tuleva selitys pois.
- **Asema:** Mauritanian pääkaupunki (N1 johdanto; WD1 P1376/Q1025).
- **Paikka:** Mauritanian länsiosassa, Saharan Atlantin rannikolla (N1 Geography; WD1 P206/Q97). Kaupunkia ei kuvata kokonaan rantaan ulottuvaksi tiiviiksi satamaksi: rakennettu keskusta ja kalastajaranta ovat eri alueita.
- **Synty:** linnoitetusta rannikkokylästä suunnitelmallisesti laajennettu pääkaupunki 1900-luvun puolivälissä (N1 History). Tarkka rakentamisen aloitusvuosi ei tule pelaajatekstiin ilman riippumatonta vahvistusta.
- **Kasvu:** toistuvat kuivuudet ja aavikoituminen vauhdittivat muuttoa kaupunkiin myöhemmällä 1900-luvulla; tämä syyselitys on N1:n History/johdannon oma, ei päättely ilmastotaulukosta. Asukkaat kuvataan omiksi toimijoikseen, ei kurjuuskokoelmaksi.
- **Asukkaat:** kontekstin laskenta on **Nouakchott-Ouest-, Nouakchott-Nord- ja Nouakchott-Sud-alueiden yhteenlaskettu väestö**, ANSADE/RGPH-5, vuoden 2023 laskenta. Lähtöluku on 1 446 761. N1/WD1 sama luku saattaa olla saman laskennan toisto, joten pelaajalle **”noin 1,4 miljoonaa asukasta Nouakchottin kolmella hallintoalueella (2023)”** tai luku pois. Ei yhden kunnan, yhden kaupunginosan tai erikseen rajatun taajaman lukuna.
- **Pallo:** konteksti sellaisenaan 18.0858, −15.9785. Se ei korvaa nähtävyyden koordinaattia.
- **Ambience-ehdotus:** `aavikko`; kaupunki sijaitsee meren ja Saharan rajalla, mutta koko kaupunkia ei väitetä autioksi.
- **Wikiavain:** `Nouakchott`.

## 2. Kansi ja neljä nostoaihetta

**Johdantoehdotus:** Nouakchottissa Saharan laidalle suunniteltu pääkaupunki on kasvanut toreista ja työpaikoista eläväksi suurkaupungiksi. Atlantin kalastajaranta näyttää, että autiomaan kaupungilla on myös merellinen arki. (N1 History / Economy; N3 See; N4.)

Artikkeli-intro rakentuu pääkaupunkiasemasta, vanhemmasta kylästä, myöhemmästä kaupunkisuunnitelmasta, kuivuuden vauhdittamasta muutosta, Atlantista, kalastajarannan työstä, torikaupasta ja hiekan sitomisesta. Ei tarkkoja perustamis-, kasvun alku- tai satamavuosia.

### K1 — Ruudukko täyttyi kaupasta

Wiki `Nouakchott`; N1 History / Economy, N3 History (sama historiatieto, ei itsenäinen numerovahvistus).

1. Uuden keskustan katuverkko suunniteltiin leveäksi ja ruutumaiseksi.
2. Alkuperäissuunnitelmassa kaupungin päätehtävä oli hallinto; lähde kertoo, ettei kaupalle ja muille elinkeinoille odotettu merkittävää roolia.
3. Keskustan läheinen Cinquième Quartier muuttui sekä asuinalueeksi että suuren ulkoilmamarkkinan paikaksi.
4. Uudet kaupunginosat kasvoivat vanhan ksarin ohi merkitykseltään.
5. Nykyinen keskusta sisältää yritysten ja pankkien toimintoja sekä ulkoilmamarkkinoita.
6. Kaupungin nykyistä arkea ei voi johtaa yksin alkuperäisestä suunnitelmasta; tämän toimituksellisen havainnon perustana ovat N1:n suunnitelma- ja markkinakuvaukset.

Kuvan pääaihe katutila/torielämä, ei moderni nimetty suojattu monumentti. Ei tarkkoja suunniteltuja asukasmääriä tai kauppatilastoja.

### K2 — Saalis vaihtaa kulkuneuvoa rannassa

Wiki `Fish market (Nouakchott)`; N3 See, N4 johdanto / Description, N10 Description.

1. Kalastajaranta toimii pienen mittakaavan kalastuksen maihintuontipaikkana.
2. Saalista tuodaan rannalle puuveneillä; N3 kuvaa maalattuja merikanootteja.
3. Saalista myydään paikalla ja kuljetetaan edelleen kaupunkiin.
4. Kalatorin alueella toimii sekä jälleenmyyjiä että kalankäsittelijöitä.
5. Osa tuotteista jatkaa myös käsittelyyn, pakkaamiseen ja vientiin.
6. Rantautumispaikka ja kaupungin teollinen syväsatama ovat eri kohteita (N1 Transport; N7).
7. Pirogue on yleisnimitys pienille veneille; se ei yksin tarkoita yhtä puusta koverrettua venettä. N10 kuvaa länsiafrikkalaisia käsintehtyjä pitkänomaisia kalastusveneitä.

Ei luvata saaliin saapumista täsmälleen tiettyyn kellonaikaan, nimetä jokaisen veneen rakennustapaa tai päätellä yksittäistä kalalajia kuvasta. Työ kuvataan kunnioittavasti, ei eksotiikkanäytöksenä.

### K3 — Avaruuskivi kauppatiskillä

Wiki `Nouakchott`, tieteellinen tausta `Meteorite`; N1 Tourism, N3 Buy, N11 johdanto / The Sahara.

1. Nouakchottissa myydään Saharan alueen meteoriitteja (N1; N3). ”Suurin/pääasiallinen meteoriittimarkkina” -superlatiivia ei käytetä.
2. Meteoriitti on avaruudesta peräisin oleva kappale, joka on päätynyt maanpinnalle.
3. Taivaalla nähtävä valoilmiö on meteori; maahan päätynyt kappale on meteoriitti.
4. Meteoriitti voi olla kivinen, rautapitoinen tai näiden yhdistelmä.
5. Saharan paljailla kivitasangoilla tumma meteoriitti voi erottua vaaleammasta maaperästä; tämä ei koske kaikkia aavikon pintoja tai kaikkia meteoriitteja.
6. Kauppa voi erottaa kappaleen tarkasta löytöpaikasta: N11 huomauttaa, että monen myydyn Luoteis-Afrikan meteoriitin löytötiedot puuttuvat.

Ei väitetä kaikkia markkinakiviä aidoiksi, paikallisesti pudonneiksi tai kuusta peräisin oleviksi. Ei hintoja tai ostosuositusta. Luontokappale ei ole karttakohde.

### K4 — Teen vaahto on tarkoituksella tehty

Wiki `Mauritanian cuisine`; N9 johdanto / Beverages, N3 Stay safe -osion maininta teestä kaupassa (vain tämä käytännön havainto).

1. Minttuteetä juodaan yleisesti Mauritaniassa.
2. Tee kaadetaan korkealta, jolloin pinnalle muodostuu vaahtoa; N9 kertoo tämän tarkoituksen.
3. Aterioita nautitaan myös yhteisesti, ei vain yksittäisinä ravintola-annoksina.
4. N3 kertoo vierailijalle tarjottavan joskus teetä kaupassa: se on mahdollinen kohtaaminen, ei jokaisen kaupan lupaus.
5. Maan keittiöön on vaikuttanut sekä pohjoisesta että etelästä tullut ruokaperinne.
6. Nouakchottin ruokapaikoissa tarjotaan myös arkisia voileipiä ja muita nykykaupungin ruokia; kaikkea syömistä ei kuvata ”muinaiseksi paimentolaisperinteeksi” (N3 Eat).

Ei kolmen teelasillisen nimeämisrituaalia, tuntemattomasta anekdootista saatua symboliikkaa tai vertailua teen vahvuudesta. Kuvassa tee ja lasit, ei moderni pakkaus/mainos tai luettavat lähikasvot.

## 3. Teemasivu: luonto

Vakioaihe `luonto`, nimi **”Hiekka ei pysy paikallaan”**.

**Johdantoehdotus:** Nouakchottin reunalla tuuli voi siirtää hiekkaa teille ja asuinalueille. Dyynien sitomisessa on käytetty sekä oksa-aitoja että eläviä kasveja. (N1 Geography; N14; N15 luvut 2–4.)

Nämä ovat dokumentoitua kaupungin ja lähiseudun kunnostustyötä, eivät nykyinen sääennuste, yleispätevä istutusohje tai väite kaikkien dyynien torjunnasta. N15 on historiallinen tapauskuvaus: kirjoitetaan ”työssä on käytetty”, ei ”kaikki nykyiset istutukset tehdään näin”.

### L1 — Hiekanjyvä voi kulkea hyppimällä

Wiki `Nouakchott`, tekniikan ensisijainen lähde N15 luku 2, painetut sivut 3–5; paikkayhteys N1 Geography.

1. Hiekka kulkeutuu tuulessa ja kasautuu.
2. Suuret jyvät vierivät/liukuvat maata pitkin.
3. Toiset jyvät etenevät hypyin, saltationa.
4. Hieno pöly voi jäädä ilmaan pidemmäksi aikaa.
5. Kasvillisuus auttaa pitämään maanpintaa koossa.
6. Nouakchottiin voi kulkeutua hiekkaa itäpuolen dyyneiltä (N1).

Ei jyväkokoja, nopeuksia tai dyynin vuosittaista etenemismäärää ilman riippumatonta vahvistusta. N1:n nykyisiä ongelmia ei päätellä pelkästä aavikkokuvasta.

### L2 — Aita, jonka kuuluu päästää tuulta läpi

N15 luku 3 Primary fixation ja luku 4 Mechanical dune stabilization, painetut sivut 13–14 ja 26–28; N17 Nouakchott–Boutilimit.

1. Oksa-aita hidastaa tuulta ja saa hiekkaa kertymään.
2. Sen pitää olla läpäisevä, ei täysin umpinainen seinä.
3. Aitoja voidaan sijoittaa ruudukoksi.
4. Verkostoa korotetaan hiekan kertyessä.
5. Nouakchottin hankkeessa käytettiin oksamateriaalia.
6. Tekniikka edelsi kasvien istuttamista vakaammalle pinnalle.

Ei tarkkoja aitakorkeuksia, ruutuvälejä, prosentteja tai työtuntimääriä. Kuvaksi todellinen kyseisen hankkeen tai kaupungin dokumentoitu oksa-aita; yleinen aita toisesta maasta ei todista Nouakchottin kohdetta.

### L3 — Kaupungin elävä vihervyö

N14 Background / Activities; N16 sand and dust protection; N15 luku 4 Biological dune fixation / Protection of reforested areas.

1. Nouakchottin ympärillä on toteutettu vihervyöhykkeen istutuksia.
2. Tavoitteena oli suojata kaupunkia hiekan kertymiseltä.
3. Aiempi istutusvyöhyke joutui kasvavan kaupungin ja maankäytön paineeseen (N14:n nimenomainen syyselitys).
4. Hankkeessa kunnostettiin ja laajennettiin istutuksia.
5. Mekaanisen vakauttamisen jälkeen alueille istutettiin ruoho- ja puuvartisia kasveja.
6. Nuoret istutukset tarvitsivat myös suojaa laidunnukselta.
7. Työhön kuului asukkaiden ja paikallisten toimijoiden osallistuminen (N14 Activities; N15 Protection).

Ei istutuspinta-aloja, taimimääriä, onnistumisprosenttia tai lupauksia, että vihervyöhyke ympäröi nyt katkeamattomana koko kaupunkia. Ei yhden puulajin yleistä ihannointia: raportti kuvaa tietyn hankkeen menetelmiä.

### L4 — Rannikon kasvin täytyy kestää suolaa

N15 luku 3 On coastal dunes ja luku 4 Biological dune fixation, painetut sivut 16 ja 29; N14 Activities.

1. Rannikkodyynien istutuksissa tarvitaan suolaisuutta kestäviä kasveja.
2. Nouakchottin hankkeen rannikkoistutuksissa käytettiin esimerkiksi Nitraria retusaa ja tamariskeja.
3. Sisämaan ja rannikon kasvupaikoille ei valittu automaattisesti samoja lajeja.
4. Lajivalinta liittyi kasvupaikan ominaisuuksiin, lähteen mukaan.
5. Istutusta ajoitettiin maaperän kostumiseen.
6. Taimia kasteltiin tarvittaessa ja suojattiin kuljetuksessa kuivattavalta auringolta/tuulelta.

Kasvilaji kuvatekstiin vain jos B:n kuva ja lajin tunnistus sitä tukevat. ”Suolaa kestävä kasvillisuus” ei saa olla selite tunnistamattoman yksittäisen puun kuvalle.

**Minitehtävä:** miksi hiekan sitomisessa käytettävää oksa-aitaa ei tehdä aivan umpinaiseksi? Oikea ajatus: se hidastaa tuulta ja saa hiekkaa kertymään. Vaihtoehdot lopulliseen tehtävään: hidastamaan tuulta / päästämään kalastusveneitä / varastoimaan juomavettä / suojaamaan meteoriitteja. Vastaus L2:ssa; visa ei kysy tätä.

## 4. Matkaopas

### Jakso 1 — Perille ja liikkeelle

- Nykyinen lentoasema on **Nouakchott–Oumtounsy International Airport (NKC)** kaupungin pohjoispuolella (N8). Se korvasi vanhan kaupunginsisäisen lentoaseman 2000-luvulla. Ei lentoyhtiö- tai aikataululupauksia.
- Kaupungissa liikutaan myös jaetuilla takseilla (N3 Get around). Kulkuehdoista sovitaan ennen lähtöä; hinnat ja vanhan/uuden ouguiyan numerot eivät tule oppaaseen.
- Pitkille kaupungin ulkopuolisille retkille tarvitaan huolellinen suunnittelu ja paikallista osaamista; N18 neuvoo oppaan käyttöä kaupunkialueiden ulkopuolella. Nouakchottin lehti ei ole aavikkoretken reittiopas.

### Jakso 2 — Kalastajarannan työpäivä

- Port de Pêche / Plage des Pêcheurs on kalastuksen rantautumis- ja kaupankäyntialuetta, ei sama satama kuin Friendship Port (N3 See; N4; N7).
- Veneiden purkamista ja kauppaa voi nähdä rannassa; ajankohta riippuu toiminnasta, joten tarkkaa saapumisaikaa ei luvata.
- Työalueella annetaan tilaa veneille, saaliille ja työntekijöille; käytännön neuvo, ei tilastoväite.
- Ranta ei ole automaattisesti turvallinen uintipaikka: N3 See varoittaa voimakkaista virtauksista. Ei uimakelpoisuuslausetta kalatuotteiden tutkimuksesta.

### Jakso 3 — Torit ja vanhat kokoelmat

- Kaupungin toreja ovat Marché Capitale, Marché Sixième ja Marocaine market (N3 Buy; N5; N1 Tourism). Näiden nimiä tai sijainteja ei sekoiteta toisiinsa.
- Kansallismuseossa on arkeologisia ja etnografisia kokoelmia, kuten kivityökaluja, saviastian sirpaleita, nuolenkärkiä ja pukeutumiseen liittyvää aineistoa (N6 Collections).
- Museon vanhat esineet eivät tarkoita, että itse museotalo olisi muinainen: talo on 1900-luvun jälkipuoliskolta (N6 Building).
- Vierailua tai tiettyä näyttelyä ei luvata aukiolo-/remonttitarkistuksen puuttuessa. Modernia suojattua museotaloa ei kuvata tämän lehden arkkitehtuurikohteena.

### Jakso 4 — Kala, riisi ja tee

- Mauritanialaisessa keittiössä kala-riisiruoka thieboudienne kuuluu rannikon ruokaperinteeseen (N9 Dishes). Ei väitetä sitä yksin Nouakchottissa keksityksi.
- Nouakchottin ravintoloissa on myös kalaa ja mereneläviä sekä arkisia voileipiä ja muita kaupunkiruokia (N3 Eat).
- Minttutee on yhteisen hetken juoma (N9); kaataminen korkealta muodostaa vaahtoa.
- Kalatorin tietyn tutkimusotoksen laatutulos ei oikeuta lupaamaan kaikkien nykyisten myyntikalojen turvallisuutta. Oppaassa ei tehdä terveysväitettä.

### Jakso 5 — Milloin kannattaa tulla

**Säätausta:** valmis `paakaupungit-pilvi/e04/nouakchott/saa.json` luettu, ei muutettu.

- Pääsession alkuperäisen `tyokalu.mjs saa` -ajon tulos hyväksytyllä lähdesivusovituksella; A ei tehnyt käsin taulukkoa.
- Artikkeli **Nouakchott**, Wikipedia-revisio **1376939788**, luettu **11.10.2026**.
- Taulukko **Climate data for Nouakchott (Oumtounsy Airport) (1991–2020, extremes 1934–present)**. Normaalikausi **1991–2020**, ei ääriarvojen kausi.
- Lähderivi **Source: Deutscher Wetterdienst**; `lahde.nimi` on en-Wikipedia, ilmastotaulukko.
- `keskilampo`: **Daily mean °C (°F)**, ei ylä- ja alalämpötilan keskiarvolla täytetty arvio. `sade`: **Average precipitation mm (inches)**. Vuosisade taustassa **113 mm**, ja tiedoston kuukausirivien summa sama.
- Tiedoston lat/lon 18.09/−15.98 ovat kaupungille tallennetut koordinaatit. Niitä ei nimetä pohjoisemman lentoaseman täsmälliseksi mittauspisteeksi. Taulukon lentoasemanimi ja historiallinen kausi kirjataan sellaisinaan, eikä A päättele lentoaseman toimineen nykyisessä muodossaan koko kauden.
- Kaikki ilmastoluvut tulevat vain tästä saa.json:sta, pyöristettyinä. Ei Wikivoyagen erilaista ilmastokaaviota, N1:n vanhempaa johdantovuosisadetta, ennusteita tai ennätyslukuja. Tekstissä ei lähdemainintaa ilmastolauseessa.

**Lukujen sallima kuvaus:** loppuvuoden ja alkuvuoden yön alimmat normaalit ovat noin 15–16 astetta, kun taas syys–lokakuun päivän ylimmät noin 35–36 astetta. Sateet painottuvat loppukesään ja alkusyksyyn; vuoden muu osa on vähäsateinen. Mukavampi lämpökausi on toimituksellinen arvio näistä luvuista, ei yleinen turvallisuus- tai säätakuu.

### Parasta (5)

1. **Kalastajaranta (3 tähteä):** pienveneiden saalis siirtyy suoraan rantakauppaan (N3; N4).
2. **Torielämä (2):** keskustan ja kaupunginosien markkinoissa näkyy nykykaupungin työ ja arki (N1 Economy; N3 Buy).
3. **Kansallismuseon vanhat kokoelmat (2):** arkeologia esittelee pääkaupunkia vanhempaa historiaa (N6); ei nykyisten aukioloaikojen lupausta.
4. **Eläinmarkkina (2):** kaupungin itälaidan markkinoilla kaupataan dromedaareja ja muita kotieläimiä (N13 Aktivitäten). Ei teurastuksen kuvailua tai kuvia.
5. **Teehetki (1):** minttutee kuuluu maan sosiaalisiin tapoihin (N9); ei lupaus vieraanvaraisuudesta jokaisessa liikkeessä.

Tähdet ovat toimituksellisia, eivät lähteen arvosanoja. Atlantin rantaa ei nosteta uimakohteeksi.

### Hyvä tietää (4)

1. **Liikkuminen:** järjestä kuljetus etukäteen ja suosi valoisaan aikaan tehtäviä siirtymiä; N18 korostaa liikenneoloja ja yöllisen maantieliikenteen välttämistä.
2. **Raha:** käteinen on tärkeä maksutapa; korttien hyväksymistä ei voi olettaa kaikkialla (N18 Accessing money). Valuutta kontekstista uusi ouguiya, MRU; ei vaihtokurssia tai pankkiautomaatin toimintalupausta.
3. **Ranta:** voimakkaat virtaukset ja syrjäisten rantojen olot edellyttävät varovaisuutta; oppaassa ei suositella yksin tehtyjä pimeän rantaretkiä (N3 See; N18 Safety).
4. **Kuvaaminen:** kysy ihmisiltä lupa ja noudata kuvauskieltoja; hallinto-/sotilaskohteiden kuvaamista ei neuvota (N18 Using cameras).

**Turvallisuustila:** FCDO:n 11.10.2026 ajantasaisessa aluejaossa useille Mauritanian alueille annetaan välttämiskehotuksia, mutta Nouakchott ei kuulu nimettyihin yleisesti vältettäviin alueisiin. Tämä ei ole ”turvalliseksi vahvistettu” -leima. Oppaassa sanotaan lyhyesti, että matkustaminen edellyttää valmistautumista ja paikallisten ohjeiden seuraamista; kaupungin ulkopuolisiin retkiin liittyy aluekohtaisia rajoituksia. Ei koko maan kuvitteellista matkustuskieltoa, UM-tasoa, politiikan tai rikosten esittelyä.

## 5. Kohdekartta: avoin kohdemäärä, tarkat paikat erotettu ehdotuksista

**6–8 kelvollista kohdetta ei vielä ole.** Nuoresta kaupungista löytyi kaksi Wikipedia-koordinaatillista arkista paikkaa ja kolmas Wikivoyage-koordinaatillinen markkinaehdotus. Modernit suojatut monumentit eivät täytä määrää. Ohjeen pienten pääkaupunkien 1–5-poikkeus ei väestön puolesta automaattisesti koske Nouakchottia; tästä tarvitaan toimituksen poikkeamaratkaisu. Kaupunkia ei viedä valmiiksi eikä puuttuvia pisteitä päätellä karttakuvasta, hotellista tai EXIFistä.

| Tila | Nimi | Tyyppiehdotus | lat | lon | Tarkka lähde |
| --- | --- | --- | --- | --- | --- |
| Paikkatieto lähteistetty | Kalastajaranta | luonto | 18.10333 | -16.02611 | N4 `Fish market (Nouakchott)` koordinaattirivi: 18°6′12″N 16°1′34″W. Piste edustaa rantautumis-/kalamarkkina-aluetta, ei teollista satamaa. |
| Paikkatieto lähteistetty, faktoja niukasti | Marocaine-tori | aukio (toripaikka) | 18.07667 | -15.97917 | N5 `Marocaine market` koordinaattirivi: 18°4′36″N 15°58′45″W. Läheinen moderni moskeija ei ole kuvakohde. |
| Ehdotus, koordinaattilähteen poikkeus ratkaistava | Eläinmarkkina | aukio (avoin markkinapaikka) | 18.05682 | -15.85058 | N13 Aktivitäten / Kamelmarkt-listaus: 18.056815, −15.850576. Ei WP/WD-P625-vahvistusta; ei hyväksytty oletussäännön täyttäväksi koordinaatiksi. |

**Rajausehdotus vasta kohdemäärän ratkaisun jälkeen.** Jos nämä kolme sallitaan: pohjoinen 18.10603, etelä 18.05412, länsi −16.02895, itä −15.84774, johdettu noin 300 metrin marginaalilla. Eläinmarkkina levittää karttaa itään merkittävästi. Tämä ei ole lopullinen kartta eikä esitys maantieteellisesti pienestä vanhastakaupungista.

**Esittelyaihe:** nykyisen kaupungin työn paikat rannalla ja toreilla. Pääkaupunkivuoden vanhaa näkymää ei luvata kohteista. Esittely kirjoitetaan lopullisen kohdelistan vasta varmistuttua.

### 1 — Kalastajaranta

Lähteet N3 See / Buy, N4 johdanto / Description, N1 Tourism. Aika `nykykaupunki`; tarkkaa perustamisvuotta ei vahvistettu.

1. Rantautumispaikka kaupungin länsipuolen Atlantin rannalla.
2. Alueelle tuodaan pienimuotoisen kalastuksen saalista.
3. Puuveneet nostetaan/vedetään rannalle; ei väitetä kaikkia yhdestä rungosta koverretuiksi.
4. Saalista myydään rannassa ja siirretään kaupungin myyntipaikkoihin.
5. Alueella on jälleenmyyjien ja kalanperkaajien työtiloja.
6. Tuotteita säilytetään ja osa käsitellään/pakataan vientiin.
7. Kalamarkkina ei ole kaupungin Friendship Port -syväsatama.
8. **1873:** nykyisen markkina-alueen ikää ei tunneta näistä lähteistä; sen nykyisiä rakennuksia tai venejonoa ei sijoiteta isoisän matkavuoteen. Vanhasta rannikkokylästä voi kertoa erikseen.

Kuva: ranta, veneet ja työtoiminta etäältä ilman tunnistettavia lähikasvoja. Ei nykyistä suojattua taidetta tai modernia nimettyä suunnittelurakennusta päämotiiviksi.

### 2 — Marocaine-tori

N5 johdanto / koordinaatti, N1 Tourism. **Kohdejuttuun ei vielä ole ohjeen vaatimaa kuutta–kymmentä itsenäistä paikkafaktaa.**

Vahvistetut asiat:

- Kaupungissa on Marocaine market -niminen toripaikka.
- Se sijaitsee Marocaine-moskeijan itäpuolella.
- N5:n koordinaatti on yllä. Kyseessä ei ole N3:n Marché Capitale tai Marché Sixième vain nimen perusteella.
- **1873:** perustamisaikaa tai saman paikan historiallista toimintaa ei vahvistettu. Ei väitetä vanhaksi karavaanitoriksi.

Täydennettävä ennen C:n kohdejuttua: paikan nykyinen luonne ja kaupankäynti, dokumentoitu synty/historia, kuvassa näkyvän torin tarkka identiteetti. Ei käytetä vieressä olevaa suojattua moskeijaa torikuvan korvikkeena.

### 3 — Eläinmarkkina, ehdotus

N3 Buy (kaupungin ulkolaidalla, Boutilimitin tien suunnassa), N13 Aktivitäten (tarkka listing ja lajitausta), N12 (dromedaarin biologia). Koordinaattilähdepoikkeus ratkaistava.

1. Markkinapaikka sijaitsee kaupungin itäisellä ulkolaidalla.
2. Lähteissä sitä kutsutaan Camel Market / marché aux chameaux / Kamelmarkt -nimillä.
3. N13 täsmentää, että myytävät ”kamelit” ovat dromedaareja.
4. Paikalla myydään myös vuohia ja muita kotieläimiä.
5. Dromedaarin kyttyrä on rasvavarasto, ei vesitankki (N12 johdanto / Characteristics).
6. Dromedaari syö aavikon kasvillisuutta; eläimen käyttäytymistä ei yleistetä kaikille markkinayksilöille (N12).
7. Eläinmarkkinan ”Länsi-Afrikan suurin” -väite on N13:ssa varauksellinen eikä saa riippumatonta tukea; jätetään pois.
8. **1873:** nykyisen markkinapaikan perustamisajasta ei ole vahvistusta. Maan pitkä karjanhoitoperinne ei todista tämän markkinan sijaintia matkavuonna.

Ei teurastuskuvia, veitset/lähikasvot pääaiheena, eläinten myyntihintoja, ostosuositusta, täsmällisiä ruumiinmittoja tai kansallisia karjatilastoja.

### Muut tutkitut ehdotukset, ei kartalle vielä

- **Marché Capitale ja Marché Sixième:** N3 vahvistaa olemassaolon ja torikaupan, mutta ei täsmällistä kohdekoordinaattia. Tietoa ei korvata Sebkhan kaupungintalopisteellä.
- **Ksar:** N1 kertoo vanhasta kylästä, mutta nykyisen Ksar-kunnan/kaupunginosan Wikipedia-piste tai WD2:n mairie-piste ei varmista vanhan linnoitetun kylän tarkkaa sijaintia. Ei sijoiteta keksittyä raunioita nykyiseen hallintotaloon.
- **Luonnonranta tai vihervyöhykkeen käyntipaikka:** aiheille on faktalähteet mutta ei nimettyä, tarkasti lähdekoordinaatein vahvistettua vierailupaikkaa. Ei hotellin koordinaattia rantakohteeksi.
- **Kansallismuseo:** kohde ja koordinaatti tiedossa, mutta modernin museotalon arkkitehtuuri ei tämän tilauksen kuvakohteeksi. Vanhoista esineistä voi kertoa oppaassa asianmukaisesti lähteistettynä.
- **Friendship Port:** faktalähde olemassa, mutta erillinen teollinen satama historiallisesta nykykeskustasta etäällä; ei kalastajarannan korvike, ei toistaiseksi kartan monumentti-/vierailupaikka.

## 6. Viisi kysymysaihetta ja kolme tietoa

| Taso | Kysymysaihe | Oikea ajatus | Lähde |
| --- | --- | --- | --- |
| 1 | Minkä maan pääkaupunki Nouakchott on? | Mauritanian | N1 johdanto; WD1 P1376 |
| 1 | Minkä valtameren rannikkoon kaupungin kalastajaranta liittyy? | Atlantin | N1 Geography; WD1 P206 |
| 2 | Mikä paikan asutus edelsi suunniteltua suurkaupunkia? | Linnoitettu rannikon kalastajakylä | N1 History; ei tarkkaa asukasmäärää |
| 2 | Mikä on kalastajarannan keskeinen tehtävä? | Saaliin maihintuonti ja kauppa | N4 johdanto; N3 See |
| 3 | Mikä avaruuskappaleen nimi koskee maahan asti päätynyttä kiveä? | Meteoriitti | N11 johdanto; Nouakchott-kytkös N1 Tourism |

Väärät vastaukset samanmittaisia, oikea mielellään indeksissä 0. Ei rakennusvuosien arvaamista tai oikeaksi vastaukseksi toisen pelikaupungin nimeä. Minitehtävän oksa-aita-asia ei toistu visassa.

Kolme tiesitkö-aihetta ilman isoisää:

1. Nouakchottissa on kaupunkia vanhempi kalastajakylän tausta; nykyinen suurkaupunki suunniteltiin vasta myöhemmin (N1 History).
2. Kalastajaranta ja tavaralaivojen syväsatama ovat eri paikkoja, vaikka kumpikin liittyy kaupungin merelliseen talouteen (N4; N7).
3. Nouakchottin kaupassa voi tavata myös Saharasta löydettyjä meteoriitteja, mutta löytöpaikka ja kappaleen alkuperä eivät ole sama asia (N1 Tourism; N11 The Sahara).

## 7. Kuvatarpeet vaiheelle B

Ei valittuja kuvia eikä Commons-tarkistusta tässä A:ssa. #74: kuvausmaan kaupallinen panorama-vapaus täsmälliselle teostyypille tarkistetaan; moderni suojattu teos ei tämän tilauksen kohteeksi. Luonnonranta, funktionaaliset kalastusveneet, kasvit ja luonnonkappaleet antavat aiheet ilman modernien monumenttien valintaa.

| Kohta | Aihe / hakusanat | Rajaus ja varaus |
| --- | --- | --- |
| Kansi 1 | Nouakchott wide city view / street panorama | Laaja katutila/kattonäkymä ilman nimettyä modernia suojattua maamerkkiä päämotiivina. |
| Kansi 2 | Nouakchott fish market / Port de Pêche panorama | Laaja kalastajaranta ja merimaisema, ei tunnistettavia lähikasvoja. |
| Kansi 3 | Nouakchott coast / sandy beach panorama | Laaja luonnonranta/dyynireuna; ei hotellin arkkitehtuuria päämotiiviksi. |
| K1 | Nouakchott market street / Cinquième | Nykyinen toritila tai katu, oikea kaupunginosa jos nimi kuvatekstissä. |
| K2 | Nouakchott pirogues landing / fish market | Vene ja ranta, työtoiminta etäältä; ei väärää kalalajiselitettä. |
| K3 | Saharan meteorite / Northwest Africa meteorite | Varmennettu luonnonkappale; tunnus ja löytöalue vain kuvasivun tukemana. Ei väitetä kuvan kiven olleen Nouakchottin torilla. |
| K4 | Mauritanian mint tea / tea glasses | Tee, vaahto ja lasit; ei pakkausta, mainosta tai lähikasvoja. |
| L1 | Nouakchott sand dunes / sand encroachment | Kaupungin/lähialueen dokumentoitu hiekka- tai dyynikuva. Muu Sahara-kuva vain yleisilmiön kuvana, jos selite ei väitä kaupunkia. |
| L2 | Nouakchott dune fixation fences / Leptadenia barriers | Aita/ruudukko oikeassa dokumentoidussa kohteessa; FAO:n kirjan kuvat eivät ole automaattisesti Commons-PD/CC-kuvia. |
| L3 | Nouakchott green belt / Toujounine plantation | Dokumentoitu istutusalue; ei valokuvan perusteella arvattua puulajia tai nykyistä pinta-alaa. |
| L4 | Nitraria retusa / Tamarix aphylla coastal dunes | Varmennettu lajikuva voi olla yleinen lajikuva; kuvateksti erottaa yleisen lajin ja Nouakchottin dokumentoidun istutushankkeen. |
| Matkailijalle | Nouakchott beach pirogue vertical | Tuore maltillinen pysty, w/h 0,60–0,85; ei lähikasvoja eikä modernia taidetta. |
| Opas 1 | Nouakchott road / shared taxi | Tuore katu/kulkuneuvo, ei lentokentän suojattua arkkitehtuuria pääkohteeksi. |
| Opas 2 | Nouakchott fish landing | Tuore rantatoiminta, eri kuva kuin K2 ja kansi. |
| Opas 3 | Nouakchott market / ancient Mauritanian lithic artifact | Tori tai varmistettu muinainen kivityökalu; ei moderni museoarkkitehtuuri tai nykytaideteos. |
| Opas 4 | Mauritanian fish rice / thieboudienne | Oikea ruokalaji, ei oletus pelkän riisiannoksen perusteella. |
| Opas 5 | Sää | Voi olla kuvaton; ei numerotietoa kuvasta. |
| Kalastajarannan kohdejuttu | Nouakchott fish market coast | Eri tiedosto kuin muissa kohdissa; työalue ja Atlantin ranta. |
| Marocaine-torin ehdotus | Marocaine market Nouakchott | Torin identiteetti varmistettava, moderni moskeija ei torikuvaksi. Kohdejuttu vielä faktavajeinen. |
| Eläinmarkkinan ehdotus | Nouakchott camel market / dromedary market | Dromedaarit etäältä, ei teurastusta/lähikasvoja. Koordinaattilähdepoikkeus auki. |
| Valokuva | Nouakchott historic settlement photo / coast | Ennen vuotta 1900 oleva paikkavarmennettu PD-kuva voi olla epätodennäköinen; mitään toisen kaupungin kylää ei nimetty Nouakchottiksi. Muuten eri nykykuva, ei ennen–nyt-paria. |

Jokainen valittu kuva katsotaan, lisenssi/Artist tarkistetaan sallitulta lähdesivulta, leveys vähintään 1200 px. Tarkka tiedosto vain kerran, paitsi ohjeen erikseen sallima valokuvan/ennen–nyt-parin poikkeus. Samasta kalastajarannasta useita eri aihekuvia tarvitaan; aihetoisto perustellaan raportissa.

## 8. Ristiriidat, avoimet asiat ja kirjoittajan rajat

1. **Kartta:** vain kaksi Wikipedia-koordinaatillista sopivaa arkista paikkaa. Kolmannelle on täsmällinen saksankielinen Wikivoyage-listaus, mutta se ei täytä suoraan WP/WD-P625-oletusvaatimusta. 6–8-paikkainen lista on avoin; ei kuviteltuja pisteitä tai hyväksynnän väittämistä.
2. **Marocaine-tori:** artikkeli on hyvin lyhyt ja siinä on lähdepuute-merkintä. Kohdejuttua ei venytetä kuuteen faktaan kaupunkia yleisesti koskevilla lauseilla tai moskeijan tarinalla. Kuvan ja kaupankäynnin tarkempi kohdelähde tarvitaan.
3. **Ksar/Sebkha:** WD2:n koordinaatin `applies to part` on mairie. Lähde ei paikanna vanhaa kylää, toripaikkaa tai suola-allasta. Wikipedia-kunnan koordinaatti ei myöskään todista tietyn historiallisen talon paikkaa.
4. **Väestö:** kontekstin 2023 laskennan laajuus ovat kolme wilayaa yhteensä. N3:n johdannon vanhempi luku on eri vuoden arvio; sitä ei käytetä ristiriidan ratkaisemiseksi. Tarkka luku pysyy lähtötiedossa, pelaajalle pyöristys ja nimetty laajuus.
5. **Kylän koko:** N1:n johdanto kutsuu edeltäjää keskikokoiseksi rannikkokyläksi, History pieneksi kalastajakyläksi. Käytetään ”rannikkokylä/linnoitettu kalastajakylä”, ei tarkkaa väkilukua tai ”tyhjä paikka”.
6. **Alkuperäissuunnitelma:** rakentamisen aloitusta ja Mauritanian itsenäistymistä koskevia täsmällisiä vuosia näkyy N1/N2/N3:ssa, mutta wiki-toisto ei ole kaksi riippumatonta lähdettä. Vuosisadan puoliväli riittää.
7. **Sää:** N1:n Climate-leipätekstissä on vanhempi vuosisade, joka poikkeaa normaalitaulukosta. N3:n kaavio on myös eri arvoilla. Kaikki ilmastoteksti vain valmiista saa.json:sta, 1991–2020 ja revisio 1376939788.
8. **Lentoasema:** vanha keskustan kenttä ja uusi pohjoisempi kenttä sekoittuvat vanhoissa opas-/katuohjeissa. Käytetään nykyistä Oumtounsy/NKC-nimeä ja kaupungin pohjoispuolista sijaintia, ei tarkkaa kilometrimäärää: N8 ja N3 antavat eri etäisyydet.
9. **Kalan laatu:** N4 kertoo eri vuosien rajatuista tutkimuksista, joilla on erilaisia laatuhavaintoja. Niistä ei tehdä nykyistä koko kalatorin ”turvallinen/epähygieeninen” -leimaa eikä ruokaturvallisuussuositusta.
10. **Teollinen satama:** Friendship Port ei ole Port de Pêche. Niiden rakennusvaiheet, kapasiteetti ja kohdekuvat pidetään erillisinä; vanhoja kapasiteettilaajennuksia ei kuvata tuleviksi nykyhankkeiksi.
11. **Suojaistutukset:** FAO-aineisto on historiallisen hankkeen menetelmäkuvaus. Ei johdeta nykyistä yhtenäistä viherrengasta, kaikkien istutusalueiden lajistoa tai aina onnistuvaa reseptiä. Menetelmien syyselitykset vain lähteestä.
12. **Turvallisuus:** UM:sta ei löytynyt maakohtaista tiedotetta. FCDO:n vaihtoehtoinen virallinen kanava ja päivämäärä on kirjattu. Wikivoyagen alkoholiohje ei vastaa nykyistä FCDO:n lakitietoa; sitä ei käytetä eikä alkoholin hankkimista neuvota oppaassa. Ei poliittisten tai rikollisuuteen liittyvien aiheiden pelitekstiä.
13. **Meteoriitit:** kaupunkisivun myyntitieto ei vahvista yksittäisen kuvan kivelle Nouakchott-taustaa, löytöpaikkaa tai alkuperäplaneettaa. Tarkka kappaletunnus vain tarkistetusta kuvasivusta ja tieteellisestä taustasta.
14. **Kamelimarkkina:** ”suurin Länsi-Afrikassa” on varauksellinen lähdeväite, ei riippumattomasti tarkistettu; jätetty pois. Nykyisen markkinan historiaa ei täytetä maan yleisellä karavaanitarinalla.

## 9. Poisjätetyt aiheet ja toimituksen ratkaistavat asiat

- Kontekstissa ei ole maalehden nostoja eikä lähikaupunkien nostoja. Maan perustietojen kieli-/valuutta-/itsenäistymisesittelyä ei kirjoiteta uudelleen kaupungin nostoiksi. Kevyen pisteen kalastuskylä-/kuivuuskuvaus toimii intron taustana, mutta nostot syventävät eri arkisia mekanismeja, eivät toista sitä neljästi.
- Saudi Mosque, Ibn Abbas -moskeija, modernit hallintorakennukset, nimetyt uudet monumentit ja Oumtounsyn terminaali: ei suojattujen teosten arkkitehtuurikohteiksi tai pääkuvien aiheiksi. Modernin talon iästä ei yksin päätellä oikeuksien päättyneen.
- Museotalo on moderni. Muinaiset kokoelmaesineet ja museon institutionaalinen tarkoitus voidaan käsitellä oppaassa; rakennusta ei kierrätetä karttamonumentiksi.
- Nykyiset poliittiset henkilöt, vaalit, länsisaharan kiista, sotilas- ja konfliktitapahtumat, rikostapaukset: tehtävän rajaus. Historiallinen kaupunginsuunnittelu käsitellään neutraalisti ilman sankarikehystä.
- Banc d'Arguin ja muut kaukana sijaitsevat suuret suojelualueet: eivät tämän kaupungin ytimessä, laajoina luontoaiheina kuuluvat maalehteen, eivät koordinaattivajeen täytteeksi.
- Tarkat määrät, vuosiluvut, välimatkat, torin myynti-/kalalajimäärät ja teknisten aitamitoitusten numerot: ilman kahta riippumatonta tukea pois tai vuosisata/pyöristys. Lähdeasiakirjan päiväys ja säätaulukon metatiedot säilytetään jäljitettävyyttä varten.
- **Päätoimittajalle:** ratkaise, voiko nuorelle suurkaupungille sallia perustellusti pienemmän kohdekartan ja Wikivoyagen täsmällisen markkinakoordinaatin, vai täydennetäänkö kohdemäärä muulla hyväksytyllä reitillä. Marocaine-torin lisäfaktat puuttuvat joka tapauksessa. Kaupunki ei ole tämän A-tiedoston perusteella valmis C–F-vaiheiden lopputarkistukseen.
- Kuvat, lisenssit, kuvaselitteet, lopullinen sisalto.json ja sen nollavirheinen validointi: myöhemmät B–F-vaiheet; mitään kuvaa ei hyväksytty tässä A:ssa.
