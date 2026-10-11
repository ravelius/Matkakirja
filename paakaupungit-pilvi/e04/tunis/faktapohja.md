# Tunis — faktapohja A, kevyt kaupunkirajaus

`tunis`, `TUN`, `e04`; koottu 11.10.2026. Kaupunkipaketti rajataan medinaan, sen kauppakujiin ja vanhoihin pihapalatseihin. Karthago, Tunisian maalehden suuret historiat sekä maan ruoka-, taide-, musiikki- ja merinostot eivät tule uudestaan tähän lehteen. Tämä on vaiheen A lähdeaineisto, ei sisalto.json, kuvahyväksyntä tai valmiin kaupungin kuittaus.

Sama toimitussopimus kuin e04:n A-työssä: AGENTS.md, CODEX.md, PILVIOHJE 3/4/7/8A/13 ja LISÄSÄÄNTÖ, lehtityo-reseptin faktakuri/mitat, kaupunkilehden mitat ja kuvavirheet, spec-mantereiden yhteiset linjaukset sekä Nairobi-mallin rakenne luettu. Tunis/konteksti.json ja saa.json luettu. Kirjoitettu vain tämä faktapohja; apuaineisto omassa NAS-kansiossa `valiaikainen/tunis-A/`. Ei git-toimia, agentteja, Commons-hakuja, kuvia, pelitiedostomuutoksia tai säädatan muutoksia.

## 0. Luetut lähteet ja vuosi 1873

Kaikki haut yhteisellä `valiaikainen/sallittu_haku.py`-apurilla: robots ensin Claude-Userille ja Matkakirja-agentille, myös ohjauksissa; yhteinen välimuisti ja yhden sekunnin hakuväli. Omistajan sallimat tavalliset `/wiki/`-sivut käytössä kiellettyjen `/w/`-/API-reittien sijaan; Wikidata sallituilla Special:EntityData-osoitteilla. Raaka-HTML, tekstipoiminnat ja lukuskripti NAS-kansiossa `valiaikainen/tunis-A/`; URL, aika, HTTP-tulos, robots-tarkistukset ja tiiviste yhteisessä `valiaikainen/sallitut-haut.jsonl`:ssä. Päivä kaikissa alla 11.10.2026, kellonajat EEST.

| Tunnus | Luettu lähde | Luetut osiot | Hakuaika / revisio |
|---|---|---|---|
| E | [Tunis, en-Wikipedia](https://en.wikipedia.org/wiki/Tunis) | johdanto, Etymology, History, Geography, Medina, Souks, Walls and gates, uskonto, palatsit, liikenne; säätaulukon otsikko | 21.21.53 / 1379639654 |
| M | [Medina of Tunis, en-Wikipedia](https://en.wikipedia.org/wiki/Medina_of_Tunis) | johdanto, History, muurit/portit, moskeijat, palatsit | 21.22.12 / 1374114180 |
| H | [Timeline of Tunis, en-Wikipedia](https://en.wikipedia.org/wiki/Timeline_of_Tunis) | kaupungin kronologia, erityisesti keskiaika–1800-luku | 21.22.16 / 1340141795 |
| U | [Medina of Tunis, UNESCO](https://whc.unesco.org/en/list/36/) | Description, Brief synthesis, Criteria, Integrity, Authenticity, Date of inscription | 21.22.27 |
| B | [Bab el Bhar, en-Wikipedia](https://en.wikipedia.org/wiki/Bab_el_Bhar) | koko lyhyt artikkeli, portin nimi ja koordinaatti | 21.22.17 / 1350416918 |
| Z | [Al-Zaytuna Mosque, en-Wikipedia](https://en.wikipedia.org/wiki/Al-Zaytuna_Mosque) | johdanto, Foundation, Aghlabid reconstruction, Later history, Scholarship, Architecture | 21.22.18 / 1374434769 |
| K | [Kasbah Mosque, Tunis, en-Wikipedia](https://en.wikipedia.org/wiki/Kasbah_Mosque,_Tunis) | johdanto, History, Architecture ja koordinaatit | 21.23.17 / 1366856717 |
| S | [Souks of Tunis, en-Wikipedia](https://en.wikipedia.org/wiki/Souks_of_Tunis) | johdanto ja nimettyjen kauppakujien luettelo | 21.22.23 / 1363683989 |
| AT | [Souk El Attarine, en-Wikipedia](https://en.wikipedia.org/wiki/Souk_El_Attarine) | History, Locations, nimisivun muiden kaupunkien maininnat erotettu Tunis-kohdasta | 21.23.30 / 1353474020 |
| L | [Dar Lasram, en-Wikipedia](https://en.wikipedia.org/wiki/Dar_Lasram) | johdanto, History, Architecture, koordinaatti | 21.23.22 / 1351347809 |
| O | [Dar Othman, en-Wikipedia](https://en.wikipedia.org/wiki/Dar_Othman) | johdanto, History, Description, koordinaatti | 21.23.27 / 1351343539 |
| D | [Dar Ben Abdallah, en-Wikipedia](https://en.wikipedia.org/wiki/Dar_Ben_Abdallah) | johdanto, Localization, History, Museum | 21.22.21 / 1351343502 |
| DF | [Dar Ben Abdallah, fr-Wikipedia](https://fr.wikipedia.org/wiki/Dar_Ben_Abdallah) | sijainti, historia, Architecture, koordinaatit | 21.25.06 / 213792276 |
| Y | [Dar Hussein, en-Wikipedia](https://en.wikipedia.org/wiki/Dar_Hussein) | johdanto, Localization, History, Etymology | 21.25.08 / 1372005308 |
| YF | [Dar Hussein, fr-Wikipedia](https://fr.wikipedia.org/wiki/Dar_Hussein) | johdanto, Histoire, palatsin materiaalit ja nykyinen instituutio | 21.25.41 / 239615557 |
| V | [Tunis, en-Wikivoyage](https://en.wikivoyage.org/wiki/Tunis) | Orientation, By plane, Get around, Medina, Eat, Cafes; vanhat sisäänpääsy- ja liikennetiedot erotettu | 21.22.25 / 5367138 |
| A | [Tunis–Carthage International Airport, en-Wikipedia](https://en.wikipedia.org/wiki/Tunis%E2%80%93Carthage_International_Airport) | johdanto, nimi/IATA; lentolistaa ja tilastoja ei käytetty | 21.24.05 / 1365358910 |
| UM | [Tunisia: matkustustiedote, UM](https://um.fi/matkustustiedote/-/c/TN) | koko maakohtainen tiedote, turvallisuustaso, liikenne, kuvaaminen; nykypolitiikka/rikostapahtumat pois sisällöstä | 21.22.26; tiedotteen päivä 4.8.2026 |

Kasbah Mosque -yleisotsikko avattiin ensin 21.22.20, revisio 1151074289: se oli täsmennyssivu, **ei** Tunis-moskeijan faktalähde. Oikea K-sivu luettiin erikseen. Kafteji-otsikkoa en/fr sekä Bab el Bahr (Tunis) fr -otsikkoa ei löytynyt (404); niistä ei käytetty faktoja.

Luetut Wikidata-JSONit: [Tunis Q3572](https://www.wikidata.org/wiki/Special:EntityData/Q3572.json) 21.23.33; [Bab el Bhar Q3033800](https://www.wikidata.org/wiki/Special:EntityData/Q3033800.json) 21.23.57; [Zitouna Q1291779](https://www.wikidata.org/wiki/Special:EntityData/Q1291779.json) 21.23.58; [Kasbah Q3324927](https://www.wikidata.org/wiki/Special:EntityData/Q3324927.json) 21.24.00; [Dar Ben Abdallah Q3015922](https://www.wikidata.org/wiki/Special:EntityData/Q3015922.json) 21.24.01; [Dar Lasram Q3015946](https://www.wikidata.org/wiki/Special:EntityData/Q3015946.json) 21.24.03; [Dar Othman Q3015950](https://www.wikidata.org/wiki/Special:EntityData/Q3015950.json) 21.24.04; [Dar Hussein Q3015945](https://www.wikidata.org/wiki/Special:EntityData/Q3015945.json) 21.25.49. P625:t, rankit, qualifierit ja viitteet luettiin. Wiki-tuonti ei ole itsenäinen toinen varmennus rakennusvuodelle.

**Pelin toistorajaus tarkistettu omasta NAS-kloonista:** `js/packs/maa-kategoriat.js`, TUN-osio noin riveillä 44786–45290; `js/packs/africa-artikkelit.js`, Tunisia noin rivillä 1975; Karthagon kaupunkisisältö `js/packs/kulttuuri-kategoriat.js` noin riviltä 115627. TUN-osiossa ei ole erillistä kaupunki-kansisivua: ensimmäinen Historia-sivu kattaa Didon, Rooman viljahuollon, aghlabidien Sisilian-retken ja perustuslain. Konteksti.json:n muut neljä osastoa sekä Karthagon ja lähipisteiden aiheet otettiin poisjättölistan pohjaksi. Sisäisiä pelitekstejä käytetään rajauksen lähteenä, ei uusien ulkoisten faktaväitteiden todisteena.

### 1873-kehys

- Tunis ja sen medina olivat olemassa kauan ennen vuotta 1873. M/U/Z/K kuvaavat keskiajan kaupungin sekä myöhemmät mutta 1800-lukua edeltävät kerrostumat. Turvallinen kehys: **”Isoisän matkavuonna 1873 medina oli jo vanha kaupunki.”** Ei väitettä ukin käynnistä tai tietystä reitistä.
- E/M/H kertovat kaupunginmuurien purkamisesta 1800-luvun jälkipuoliskolla. E/M ajoittavat alun 1865:een, H:n kronologia 1860:een. Kirjoitetaan ”muureja purettiin 1800-luvulla”; 1873 ei ole kokonaan koskemattoman muurikaupungin tilannekuva.
- Zitouna oli vanha moskeija ja oppimisen keskus. Sen nykyinen minareetti on Z:n mukaan 1800-luvun loppupuolen jälleenrakennus: **nykyistä minareettia ei sijoiteta vuoteen 1873**.
- Kasbah-moskeija on K:n keskiaikainen rakennus; Dar Lasram oli rakennettu 1800-luvun alkupuolella, Dar Othman aiemmin ja Dar Hussein oli käytössä 1800-luvun puolivälissä. Nämä ovat olemassaoloa koskevia lähteistettyjä aikarajoja, eivät lupauksia kaikkien nykyisten pintojen alkuperäisyydestä vuonna 1873.
- Dar Ben Abdallah oli 1800-luvulla palatsi, ei nykyinen kansanperinnemuseo. Museoksi siirtyminen on 1900-luvun asia. [D/DF]
- Ranskan protektoraatti on H/E:n mukaan matkavuoden jälkeistä historiaa. Bardon sopimuksen aihe on jo lähipelin skandaalinostossa: siihen ei kirjoiteta uutta selittävää nostoartikkelia.

## 1. Perusfaktat ja artikkelin suunta

- Tunis on Tunisian pääkaupunki sekä maan hallinnon, talouden ja kulttuurin keskus. [E, johdanto]
- Keskusta on Tunisinjärven takana, Välimeren rannikon tuntumassa; La Goulette on merenpuoleinen satama. Ei rinnasteta järven rantaa avoimen meren rantaan. [E, johdanto/Geography]
- Kaupungin historiallinen ydin on medina. Sen itäpuolella Bab el Bhar erottaa vanhan kaupungin uudemmasta Ville Nouvelle -kaupunkialueesta. [E/B]
- Medina on Unescon maailmanperintökohde. UNESCO korostaa yksittäisten monumenttien lisäksi yhtenäistä kaupunkirakennetta, asuinkortteleita, soukeja ja portteja. [U, Brief synthesis/Integrity]
- Medinan syntykerrostuma on varhaisislamilainen, mutta tarkat founding-vuodet vaihtelevat lähteissä. Käytetään ”varhaiskeskiajalla kehittynyt medina”, ei yksi tarkka perustamispäivä. [M/E/Z/U; kohta 8]
- Tunis-nimen etymologiasta on kilpailevia tulkintoja. E käsittelee berberikielistä yöpyä-/levätä-juurta ja myös Tanit-tulkinnan ongelmia. Ei varmaa nimenselitystä lehteen tai visaan. [E, Etymology]
- **Asukasluku vain kontekstista:** **1 075 306 asukasta vuonna 2024, Tunisin kuvernementissä (gouvernorat de Tunis)**. Laskenta 6.11.2024, INS/RGPH2024. Tämä ei ole medinan, Tunis-kunnan eikä Grand Tunis -metropolialueen väkiluku. Kontekstin INS-linkkiä ei ole tässä käytetty uutena ulkoisena varmennuksena.
- Pallo säilyy kontekstin arvona **36.8065 / 10.1815**, wiki `Tunis`, ambience-ehdotus `basaari`. Nyt noudettu Q3572 P625 **36.800833… / 10.180000** poikkeaa kontekstipisteestä; se kirjataan eroksi eikä kontekstia muuteta. Nähtävyyskartta perustuu medinan omiin paikkoihin.

**Artikkelin johdatusaihio:** pääkaupunki järven ja rannikon tuntumassa; medina kaupungin ytimenä; Bab el Bhar kynnyksenä uuteen kaupunginosaan; soukit ja Zitouna arjen/oppimisen rinnakkaisina tiloina; vanhat palatsit ulkopuolelta sulkeutuneina mutta sisällä pihoihin avautuvina rakennuksina; 1873 vanhan kaupungin ajallisena viitepisteenä. Lähteet E/B/Z/U/S/L/O/DF. Pihapalatsien toimintaperiaate kuvataan kohdekohtaisista arkkitehtuuritiedoista, ei kaikkia Tunisin koteja koskevana väitteenä.

Kirjoittajan mitat säilyvät: artikkelin intro 7–10 virkettä, 700–1100 merkkiä, 2–3 kappaletta, 1–3 lihavointia; Lue lisää -teksti 3 kappaletta ja 600–1100 merkkiä. Kevyt tarkoittaa kaupunkirajausta ja aiheen suppeutta, ei puuttuvia pakollisia osioita.

## 2. Kansi — Tunis

**Johdantoehdotus:** ”Tunisissa vanha kaupunki alkaa portilta, mutta ei lopu yksittäiseen monumenttiin. Sen kujilla kauppa, moskeijat ja pihapalatsit muodostavat oman kaupunkinsa kaupungin sisään.” [B/U/E; toimituksellinen kielikuva, ei hallinnollinen erilliskaupunki]

Neljä nostoaihetta, lopullinen nosto 440–660 merkkiä. Kansikuvat kolme laajaa nykyistä ympäristökuvaa eri suunnista, eivät sisätilaa tai detaljia.

### N1. Kujat ovat osa perintöä

Wiki `Medina of Tunis`.

1. Medina on Tunisin historiallinen ydin. [E/M]
2. Unescon suojeltuun kokonaisuuteen kuuluvat monumenttien lisäksi kaupunkirakenne, asuinkorttelit, soukit ja portit. [U, Brief synthesis/Integrity]
3. Rakennustyyppeihin kuuluu moskeijoita, palatseja, madrasoja ja suihkulähteitä. [U, Description]
4. Kokonaisuus sisältää keskisen medinan sekä pohjois- ja eteläpuoliset vanhat esikaupungit. [U, Brief synthesis]
5. E:n Medina-osio kuvaa katuverkkoa, joka ei perustu säännölliseen ruudukkoon. [E]
6. Useat palatsikerrostumat ovat 1600–1800-luvuilta, keskiaikaisen rakenteen rinnalla. [E, Medina; U, Brief synthesis]

Ei ”700 monumenttia”-, pinta-ala-, tiheys- tai vanhin-superlatiivia. Ei päätelmää, että kadut olisivat satunnaisesti syntyneet tai kaupunki olisi muuttumaton.

### N2. Merenportti jäi kaupungin kynnykseksi

Wiki `Bab el Bhar`.

1. Bab el Bhar on medinan itäpuolinen portti. [B]
2. Nimi tarkoittaa Merenporttia. [B, johdanto]
3. Toinen nimi on Porte de France. [B]
4. Portti erottaa medinan uudemmasta kaupungista. [B/E]
5. Nykyinen muoto on kaari, jonka yläpuolella on sakarareunainen parapetti. [B]
6. Artikkeli sanoo portin muuttuneen elinkaarensa aikana. [B]
7. E kertoo portin yhteydestä kristittyjen kauppiaiden funduq-rakennuksiin. Tämä on historiallinen paikkafakta, ei yleinen uskonnollinen vastakkainasettelu. [E, Walls and gates]

Portin tarkka alku-/uudelleenrakennusvuosi ei ole tämän aineiston kahdella riippumattomalla lähteellä varmennettu. Ei väitettä, että sen nykyinen kaari olisi varmasti 1873:n ulkoasu. ”Merenportti” ei tarkoita portin nykyistä sijaintia merenrantaviivalla.

### N3. Oliivimoskeija oli myös koulu

Wiki `Al-Zaytuna Mosque`.

1. Zitouna sijaitsee medinan keskuksessa. [Z, johdanto]
2. Nimi on Oliivimoskeija. [Z, johdanto; ei nimitarun tapahtumaa faktaksi]
3. Perustamisen ajoitus vaihtelee 600-luvun lopun ja 700-luvun alun välillä. [Z, Foundation]
4. Nykyisen kokonaisuuden keskeinen kerrostuma on 800-luvun uudelleenrakennus. [Z, Aghlabid reconstruction]
5. Moskeijaan liittyi pitkään korkeamman oppimisen perinne. [Z, Scholarship]
6. Opetuksessa oli uskonnollisten aineiden ohella esimerkiksi arabian kielioppia, historiaa, tiedettä ja lääketiedettä. [Z, Scholarship]
7. Nykyinen minareetti on myöhempi, 1800-luvun lopun jälleenrakennus. [Z, Later history/Courtyard]

Ei antiikin Karthagon pylväiden omaa tarinaa, yliopiston maailmanennätystä, pylväs-/sisäänkäyntimäärää tai minareetin tarkkaa korkeutta. Nimi ei todista pihalla kasvaneen juuri tiettyä oliivipuuta.

### N4. Tuoksujen kauppakuja

Wiki `Souk El Attarine`.

1. Souk El Attarine on yksi medinan soukeista. [AT, Locations]
2. Se sijaitsee Zitounan pohjoisen julkisivun puolella. [AT]
3. Sen erikoisalaksi lähde nimeää hajusteet ja kauneustuotteet. [AT]
4. Lähde mainitsee jasmiinin, ruusuveden, meripihkan ja hennan kauppatavaroina. [AT; ei väitettä kaikkien valmistuksesta samalla kujalla]
5. Tunisin soukit ovat kauppojen ja käsityöläisten reunustamia, usein katettuja katuja. [E, Souks; S]
6. Erikoistumista on myös kankaiden, villan, nahkan ja kuparituotteiden ympärillä. [E, Souks; S]
7. AT liittää soukin hafsidien aikaan, E:n Souks-osio antaa ristiriitaisesti 1700-luvun. Ajoitus jätetään pois nostoista. [AT/E; kohta 8]

Nosto kertoo paikallisesta kauppapaikasta, ei Tunisian maalehden harissa-, oliiviöljy- tai ruokahistoriaa. Ei meripihkan raaka-aineketjun omaa selitystä tai ”tuoksut määräsivät kaupunkisuunnittelun” -syy-yhteyttä.

## 3. Teemasivu — `historia`: Pihan puolella

**Johdantoehdotus:** ”Medinan palatsien ja moskeijoiden sisällä kaupunki avautuu pihoiksi, holviksi ja arkadeiksi. Rakennusten kerrostumat kertovat sekä perheen tiloista että siitä, kuinka vanhat talot ovat saaneet uusia tehtäviä.” [K/L/O/D/Y]

### T1. Kasbahin kivinen torni

Wiki `Kasbah Mosque, Tunis`.

1. Kasbah-moskeija on medinan Kasbah-kaupunginosassa. [K, johdanto]
2. Se rakennettiin hafsidihallitsija Abu Zakariya Yahyan toimeksiannosta keskiajalla. [K, History]
3. Moskeija liittyi Kasbahin linnoitus- ja hallintoympäristöön. [K]
4. Alkuun se palveli Kasbahissa asuneita hallitsijoita; myöhemmin siitä tuli julkinen perjantaimoskeija. [K]
5. Rukoussalin kaaria tukevat marmoripylväät; sali on pitkittäissuunnassa syvä. [K, Architecture]
6. Minareetin rakenne ja koristelu ovat kiveä, julkisivuissa on vinoneliömäistä sebka-koristelua. [K]
7. Artikkeli mainitsee muqarnas-koristellun kupolin mihrabin edessä. [K]

Ei nykyisiä hallinnon tapahtumia, aukion modernia muistomerkkiä tai ”ainoa”-superlatiivia. Tarkka rakennus-/minareetin valmistumisvuosi pois.

### T2. Dar Lasram jakoi talon tehtäviin

Wiki `Dar Lasram`.

1. Palatsi sijaitsee medinassa Tribunal-kadulla. [L, johdanto]
2. Sen rakennuttaja oli Hamouda Lasram, varakas maanomistaja ja hallinnollinen kirjuri. [L, History]
3. Tontti koottiin hankkimalla ja purkamalla viereisiä rakennuksia. Tämä on lähteen nimenomainen tapahtumakuvaus. [L]
4. Rakentaminen ajoittuu 1800-luvun alkupuolelle. [L; tarkka 1812–1819-väli jää pois leipätekstistä]
5. L:n Architecture erottaa varasto-/palvelutilat, perheen tilat ja vieraille tarkoitetun ylemmän kerroksen. [L]
6. Palatsi on artikkelin mukaan medinan suojeluyhdistyksen ja Tahar Haddad -klubin käytössä. [L; ei aukiolo-/yleisötilapromisea]
7. Sisäpihan kaaret, pylväät, stukkokoristelu ja maalatut katot on dokumentoitu artikkelissa. [L, Architecture/kuvatekstit]

Maan musiikkilehden Rachidiaa, nawba-sarjoja tai paroni Erlangeria ei lisätä tähän palatsin tarinaksi.

### T3. Palatsi, jonka arki päätyi museoon

Wiki `Dar Ben Abdallah`.

1. Dar Ben Abdallah on 1700-luvun palatsi medinan eteläisessä osassa. [D/DF]
2. Se on Tourbet El Beyn naapurustossa. [D, Localization; DF]
3. Rakennus sai nimensä myöhemmältä omistajalta, silkkikauppias Mohamed Tahar Ben Abdallahilta. [D/DF]
4. Rakennukseen liittyy ylellisiä vastaanottotiloja ja piha, jonka ympärillä on arkadeja. [DF, Architecture]
5. Sisäänkäynnin peräkkäiset mutkat suojasivat lähteen mukaan pihan yksityisyyttä. Syy-yhteys vain näin rajattuna. [DF]
6. Rakennus muuttui 1900-luvulla kansanperinnettä esitteleväksi museoksi. [D/DF; 1964/1978-vaihe-ero kohta 8]
7. Museokuvauksen aiheet ovat perhe-elämä ja kaupungin julkinen elämä, muun muassa soukit, moskeijat ja kahvilat. [D, Museum]
8. Vanhojen näyttelyiden esineistöä ja nykyistä pääsyä ei luvata samaksi vuonna 2026. [V:n museo-osan päivitys 2018; D:n kuvaus ei ajantasainen palvelutiedote]

Palatsi jää nosto/opas-aiheeksi eikä saa tämän työn karttapistettä: WP/WD ja V antavat eri paikannuksen, jota ei ratkaista arvaamalla. Kohta 8 kertoo myös fr-Wikipedian tukevan WD-pistettä; WD:tä ei julisteta vääräksi.

### T4. Dar Othman muuttui varastoksi

Wiki `Dar Othman`.

1. Dar Othman on medinan eteläosan palatsi. [O]
2. Se rakennettiin Othman Deyn toimesta 1500-luvun lopulla. [O, History; E:n ”early 17th century” -ero kohdassa 8]
3. Palatsi muutettiin 1800-luvun alkupuolella sotilaiden tarvikkeiden säilytyspaikaksi. [O, History]
4. Tähän käyttöön liittyy nimi Dar al-Oula, tarvikkeiden talo. [O]
5. Sisäänkäynti johtaa driba-nimiseen eteistilaan. [O, Description]
6. Eteistä reunustavat kivipenkit; katossa on stukkokoristelua. [O]
7. Pihan yhteydessä on T-muotoisia huoneita ja alkoveja. [O; tarkat lukumäärät pois]
8. Rakennus on myöhemmin ollut perinnön suojeluun liittyvässä käytössä. [O, History; ei nykyistä avoimuuslupausta]

**Minitehtävä:** ”Minkä palatsin myöhempi nimi liittyi sotilaiden tarvikkeiden varastointiin?” Vaihtoehdot Dar Othman / Dar Lasram / Dar Ben Abdallah / Dar Hussein; oikea 0. Faktaehdotus: ”Asuinkäyttö vaihtui Dar Othmanissa varaston tehtävään, mistä tuli rakennuksen toinen nimi Dar al-Oula.” [O, History]. Saman sivun T4 antaa vastauksen. Kaupungin viisa ei kysy tätä; faktaa ei kopioida nostovirkeestä sanatarkasti, eikä palkkiota mainita.

## 4. Opas — viisi jaksoa

Oppaassa korkeintaan yksinkertainen kaupungin oma reitti ja käytäntötieto. V:n monissa kohdissa päivitys 2018/2025; ei hinnastoa, aukioloaikoja, lentovuoroja, bussinumeroita, tämän päivän junareittiä tai sovelluslupausta. Uskonnollisen paikan pääsy ja pukukoodi tarkistetaan paikan omista ajantasaisista ohjeista; V:n ristiriitaista Zitouna-sisäänpääsytekstiä ei muuteta varmaksi ohjeeksi.

### O1. Perille ja liikkeelle

- Lentoasema: **Tunis–Carthage International Airport (TUN)**, ranskaksi Aéroport de Tunis-Carthage. Nimi ja IATA A:n johdannosta; V tukee.
- V kuvaa kevyen metron, bussien ja taksien järjestelmää. Medinan kohteet ovat kävelymatkan mittakaavassa toisiinsa nähden, mutta katuverkon kautta kuljettavaa tarkkaa aikaa ei anneta. [V, Get around; kohdekoordinaatit]
- V suosittelee sopimaan taksimatkan mittarin käytöstä. Ei hintaa, saatavuusminuutteja tai puhelinsovellusta. [V, By taxi]
- UM nostaa liikenteen maan suurimmaksi turvallisuusriskiksi; oppaassa varovaisuus katuja ylittäessä ja ajoneuvossa. [UM, Liikenne]
- TGM:n ratahistoria on jo Karthagon oppaassa. Se ei ole Tunisin uusi nostotarina, ja V kertoo korjaustöistä: reittien toimivuus tarkistetaan ennen matkaa.

### O2. Portilta medinan kujille

- Bab el Bhar on vanhan ja uudemman kaupungin kynnys. [B/E]
- Zitouna on medinan keskuksessa; Souk El Attarine sen pohjoispuolella. [Z/AT]
- Kujilla on erikoistunutta kauppaa ja käsityötuotteita. [E/S]
- Kasbah-moskeija on läntisessä Kasbah-ympäristössä. [K; koordinaatti]
- Moskeijat ovat uskonnollisia paikkoja. Ei luvata muille kuin muslimeille pääsyä rukoussaliin tai yleistä turistiaukioloa. [V:n See-teksti epävarma; Z/K:n uskonnollinen käyttö]

### O3. Pihapalatsit

- Dar Lasram, Dar Othman ja Dar Hussein ovat medinan palatseja; niiden oma historia on kohdassa 5. [L/O/Y]
- Dar Ben Abdallah esittelee lähdekuvauksissa perhe-elämän ja kaupungin elämän perinnettä. [D]
- Rakennuksissa on sisäpihoja, arkadeja, koristeellisia kattoja ja vastaanottotiloja. Ominaisuus liitetään oikeaan palatsiin, ei kaikkia koteja koskevaksi yleistykseksi. [L/O/DF/YF]
- Suojeluinstituution toimisto ei automaattisesti ole vapaasti kuljettava nähtävyys: käyntimahdollisuus varmistetaan erikseen. Tämä on toimituksellinen varaus, ei sulkemisväite.

### O4. Kahvitauko kaupungissa

- V:n Eat kertoo kahviloista, kahvista, muista juomista ja ranskalaistyylisistä leivonnaisista. [V]
- Samassa osiossa mainitaan voileipäkauppoja. [V]
- V:n Cafes erottaa medinan kahviloita uudemman kaupungin avenue-kahviloista. [V]
- Ramadan voi muuttaa päiväsaikaan avoinna olevien ruokapaikkojen saatavuutta. [V, Eat; ei tämän vuoden päivämäärää tai kaikkia paikkoja koskevaa sulkemislupausta]
- Harissa, oliiviöljy, brik ja muotonsa mukaan nimetty leivos ovat jo maalehden nostot. Niiden historiaa/valmistusta ei toisteta oppaassa; kahvitauko pysyy käytäntötasolla.

### O5. Milloin kannattaa tulla

Kaikki ilmastoluvut vain Tunis/saa.json, jonka asema on **Tunis–Carthage International Airport**, ei eri rantakohde tai koko Tunisian ilmasto.

- Vuorokauden keskilämpö on tammikuussa 12,3 °C, elokuussa 28,7 °C. Oppaaseen esimerkiksi ”talven keskilämpö on noin 12–14 astetta, keskikesän noin 28–29”.
- Päivän ylin normaali on heinäkuussa 34 ja elokuussa 35 °C. Käytetään ”kesäpäivinä on kuumaa”; ei UM:n koko maata koskevaa 40 astetta tähän ilmastolauseeseen.
- Taulukossa heinäkuun sade on 4 mm, tammikuun 59 ja joulukuun 68 mm. Kesä on selvästi talvea kuivempi.
- Kevät ja syksy ovat taulukossa keskikesää viileämpiä. ”Kevät tai syksy sopii kävelypainotteiseen retkeen” on näihin lukuihin perustuva toimituksellinen suositus, ei lähteen matkailuranking.
- Ilmastolauseisiin ei lähdeviittausta. Ei koko Välimeren/Tunisian sääsuperlatiivia tai ennätyslämpöä.

### Parasta — viisi riviä

| Mitä | Tähdet ehdotus | Selityksen fakta |
|---|---:|---|
| Medinan kävely | 3 | Historiallinen katuverkko, kauppa ja asuinkorttelit ovat samaa kokonaisuutta. U/E. |
| Bab el Bhar | 2 | Portti erottaa medinan uudemmasta kaupungista. B. |
| Zitounan ympäristö | 3 | Moskeija on vanhan ytimen keskus ja historiallinen oppimispaikka. Z. |
| Souk El Attarine | 2 | Hajusteisiin ja kauneustuotteisiin erikoistunut kauppakuja. AT. |
| Pihapalatsien arkkitehtuuri | 2 | Lasramin, Othmanin ja Husseinin pihat ja vanha rakennushistoria. L/O/YF; käyntimahdollisuusvaraus. |

Tähdet ovat toimituksellisia arvioita, eivät turvallisuusluokituksia.

### Hyvä tietää — neljä riviä

1. **Liikenne:** katujen ylityksessä ja ajoneuvossa tarvitaan erityistä varovaisuutta. [UM, Liikenne]
2. **Pääsy:** moskeijoiden ja palatsien vierailukäytäntö tarkistetaan paikan omista ohjeista. V:n vanha Zitouna-teksti ei lupaa sisäänpääsyä.
3. **Kuvaaminen:** eräiden julkisten rakennusten kuvaaminen on kiellettyä, ja UM suosittelee kysymään luvan julkisten rakennusten kuvaamiseen. Ei päätelmää, että kaikki vanha arkkitehtuuri tai katukuva olisi samalla perusteella kiellettyä. [UM, Paikalliset lait ja käytännöt]
4. **Turvallisuus:** noudata erityistä varovaisuutta ja vältä mielenosoituksia ja niitä ympäröiviä väkijoukkoja. [UM, turvallisuustaso/Yleinen turvallisuustilanne; poliittinen selitys ei tule peliin]

**Matkustusturvallisuus ajantasaisesti:** UM:n 4.8.2026 päivätty Tunisia-tiedote avattu 11.10.2026; taso ”Noudata erityistä varovaisuutta”. Rajaseutujen välttämisohjetta ei esitetä Tunisin keskustan matkustuskielloksi. Oppaan lyhyt viranomaisviittaukseton varaus: ”Liikenteessä tarvitaan erityistä varovaisuutta. Vältä mielenosoituksia ja tarkista kuvaamis- sekä vierailukäytännöt etukäteen.” Ei uutisia, nykypolitiikkaa tai rikollisuuskertomusta.

### Säätausta

Saa.json säilytetään muuttamatta: lat 36.81 / lon 10.18; lähde `en-Wikipedia, ilmastotaulukko`, kausi **1991–2020**. Tausta: artikkeli **Tunis**, revisio **1379639654**; taulukko **Climate data for Tunis (Tunis–Carthage International Airport) 1991–2020, extremes 1943—present**. Keskilämpö on **Daily mean °C (°F)**, sade **Average precipitation mm (inches)**.

Tausta.lahteet sanatietona: Source 1: Institut National de la Météorologie (humidity 1961-1990, sun 1981–2010) | Source 2: NOAA (humidity/daily sun 1961–1990), Meteo Climat (record highs and lows) and Weather Atlas (UV index). Taulukon äärilämpöjen 1943—present ei ole kuukausinormaalien kausi. Sade[12]-summa ja tausta.vuosisade **486 mm**. Työkalun keskilampo/ylin/alin/sade-sarjat kopioidaan sisalto.json:iin sellaisinaan; tausta-kenttä jää faktapohjaan. Kaikki ilmastoluvut kaikissa osioissa vain tästä tiedostosta, ei UM:n maakohtaisesta kuumuuslauseesta, V:stä tai toisesta säätaulukosta.

## 5. Kohdekartta — kuusi paikkaa medinan historiallisesta ytimestä

Kartan lähikohteet pysyvät medinassa. Ei Karthagon satamia, rauniokohteita, Bardo-museota, Sidi Bou Saidin kylää tai uusia moderneja muistomerkkejä. Kaikki kohteet ovat rakennuspaikkoja: JSONiin ei oletustyypin `rakennus`-kenttää. Bab el Bhar on portti, ei virheellisesti aukion keskikohta; moskeijoiden kohdalla rakennus, ei viereinen aukio tai taideteos.

**Esittelyehdotus (≤400 merkkiä):** ”Medinan portti, moskeijat ja palatsit ovat eri kerroksia samassa kaupungissa. Zitounan ympäriltä reitti voi jatkua Kasbahiin ja vanhojen pihapalatsien suuntaan; rakennusten nykyiset vierailukäytännöt tarkistetaan erikseen.” [B/Z/K/L/O/Y; ei mitattua kävelyaikaa]

**Rajausehdotus:** pohjoinen **36.80500**, etelä **36.79200**, länsi **10.16430**, itä **10.17920**. Kattaa kaikki kuusi omaa pistettä noin 300 m reunavaralla. Esittelyn medina ei saa väärää yleisartikkelin pohjoiseen osuvaa keskipistettä. Lopullinen karttapiirto tarkistaa rakennusten ääriviivat ja marginaalin.

| # | Suomenkielinen nimi | lat | lon | Lähde / aika / pisteen kohde |
|---:|---|---:|---:|---|
| 1 | Bab el Bhar – Merenportti | 36.79917 | 10.17562 | Q3033800 P625 36.799165/10.175618, normal, ei qualifieria/viitettä; B:n rakennuskoordinaatti sama. 11.10. 21.23.57. |
| 2 | Zitouna-moskeija | 36.79722 | 10.17111 | Q1291779 P625 36.797222…/10.171111…, normal; viite it-Wikipedia. Z:n koordinaatti sama rakennus. 21.23.58. |
| 3 | Kasbah-moskeija | 36.79667 | 10.16778 | Q3324927 P625 36.79666667/10.16777778, normal; viite en-Wikipedia. K:n oma koordinaatti sama. 21.24.00. |
| 4 | Dar Lasram | 36.80207 | 10.16812 | Q3015946 P625, normal; viite Commons-tuontiin. L:n lopun 36.8021/10.1681 tukee rakennuksen omaa pistettä. 21.24.03. |
| 5 | Dar Othman | 36.79498 | 10.17431 | Q3015950 P625, normal; viite Commons-tuontiin. O:n 36.7950/10.1743 tukee rakennuspaikkaa. 21.24.04. |
| 6 | Dar Hussein | 36.79563 | 10.17057 | Q3015945 P625, normal, Commons-tuontiviite; Y/YF paikantavat rakennuksen Bab Menaraan, Place du Château -osoitteeseen. 21.25.49. |

Yhdessäkään valitussa P625:ssa ei ole paikka-/ajankohtaqualifieria tai vaihtoehtoista samaa normal-rank-pistettä. Viisi desimaalia on tiedostomuoto, ei lupaus sisäänkäynnin senttimetritarkkuudesta. Dar Husseinin P625 on palatsin oma entity, **ei** kaupungin kunnantalo toiselle nähtävyydelle nimettynä: samassa rakennuksessa toiminut historiallinen kunnallisneuvosto kuuluu sen historiaan.

### 5.1 Bab el Bhar – Merenportti

**Aika:** vanha kaupunginportti, eri aikojen muutoksia; tarkkaa rakennusvuotta ei varmennettu.

1. Medinan itäpuolinen portti. [B]
2. Nimi tarkoittaa Merenporttia. [B]
3. Toinen nimi Porte de France. [B]
4. Erottaa medinaa uudemmasta kaupungista. [B/E]
5. Nykyinen kaari ja sakarareunainen parapetti. [B]
6. Portti on muuttunut historiansa aikana. [B]
7. Kuuluu UNESCO-sivun nimettyihin medinan monumentteihin. [U, Brief synthesis]
8. E mainitsee yhteyden kauppiaiden funduq-rakennuksiin. [E, Walls and gates]

**1873:** vanhan portin paikkahistoria ei ole näyttö nykyisen kaaren täsmälleen samasta ulkoasusta. Älä kuvaa nykytilannetta ukin havaintona. **Kuva:** portti kaupunkitilassaan, B tarkistaa vanhan kohteen ja mahdolliset modernit teososat.

### 5.2 Zitouna-moskeija

**Aika:** varhaiskeskiaikainen perusta; 800-luvun jälleenrakennus ja myöhemmät lisäykset, nykyminareetti 1800-luvun lopulta.

1. Moskeija on medinan keskuksessa. [Z]
2. Nimi tarkoittaa Oliivimoskeijaa. [Z]
3. Perustamisen tarkasta ajasta on historiallisia eri tulkintoja. [Z, Foundation]
4. Nykyisen päämuodon tärkeä kerrostuma on 800-luvulta. [Z, Aghlabid reconstruction]
5. Rakennuskokonaisuus on kiinni ympäröivässä kaupunkirakenteessa; idässä on ulkoinen arkadijulkisivu. [Z, General layout]
6. Sisäpihaa reunustavat kaarigalleriat. [Z, Courtyard]
7. Rukoussalia jäsentävät pylväsrivit ja hevosenkenkäkaaret. [Z, Prayer hall]
8. Oppimisen perinne liittyi moskeijaan; opetuksessa oli muutakin kuin uskonnollisia aineita. [Z, Scholarship]
9. Nykyminareetti jäljittelee Kasbah-moskeijan tornin tyylikehystä. Syy-/vaikutusyhteys on Z:n nimenomainen arkkitehtuurikuvaus. [Z, Courtyard]

**1873:** moskeija ja koulutuksen perinne olivat vanhoja, mutta nykyinen minareetti ei vielä ollut nykyisessä muodossaan. Rakennus-/restaurointivuosien yksityiskohtia ei siirretä tarkkoina ilman riippumatonta toista varmennusta. **Kuva:** historiallinen arkkitehtuuri tai yleisympäristö; uudet pinnat/osat ja kuvaajan oikeudet erikseen. Pylväiden antiikkialkuperä ei muodosta uutta Karthago-nostoa.

### 5.3 Kasbah-moskeija

**Aika:** keskiaika, hafsidivaihe; rakennustöiden lähdehaarukka 1200-luvulla.

1. Moskeija on Kasbah-kaupunginosassa. [K]
2. Toimeksiantaja oli hafsidihallitsija Abu Zakariya Yahya. [K, History]
3. Lähde nimeää arkkitehdiksi Ali ibn Muhammad ibn Qasimin. [K]
4. Alkuperäinen tarkoitus oli palvella Kasbahin hallitsijoita. [K]
5. Käyttö laajeni myöhemmin julkiseksi perjantaimoskeijaksi. [K]
6. Rukoussalissa on marmoripylväiden tukemia hevosenkenkäkaaria. [K, Architecture]
7. Mihrabin edessä on muqarnas-koristeltu kupoli. [K]
8. Minareetin rakenne ja ornamentiikka ovat kiveä; julkisivut käyttävät sebka-aihetta. [K]
9. Myöhemmät Tunisin minareetit ottivat siitä tyylivaikutteita. [K; lähteen nimenomainen vaikutusväite, ei oma päätelmä]

**1873:** keskiaikainen moskeija oli jo olemassa. Nykyistä aukiota, sen tapahtumia tai modernia muistomerkkiä ei liitetä tuohon aikaan. **Kuva:** itse vanha moskeija/minareetti, ei Kasbahin moderni muistomerkki tai viranomaisjulkisivu sen korvikkeeksi.

### 5.4 Dar Lasram

**Aika:** 1800-luvun alkupuoli.

1. Yksi medinan palatseista. [L]
2. Sijaitsee Tribunal-kadulla. [L]
3. Rakennuttaja Hamouda Lasram oli maanomistaja ja kirjuri. [L, History]
4. Rakennuspaikka koottiin viereisistä kiinteistöistä. [L]
5. Rakentaminen ajoittuu ennen vuotta 1873. [L, History; H tukee valmistumisen sijoittumista 1800-luvun alkuun]
6. Pohjakerros oli varasto- ja palvelualuetta. [L, Architecture]
7. Perheen ja vieraiden tilat olivat erillisiä kerroksia. [L]
8. Pihan kaaret, pylväät, stukko ja maalatut katot näkyvät lähdeartikkelin arkkitehtuurikuvauksessa. [L]
9. Palatsi on myöhemmässä suojeluyhdistyksen ja kulttuuriklubin käytössä. [L; ei ajantasaista pääsylupausta]

**1873:** palatsi oli jo rakennettu, mutta nykyiset instituutiot ovat myöhempiä. **Kuva:** rakennuksen historiallinen tila tai piha; moderni näyttelyteos ei pääaiheeksi.

### 5.5 Dar Othman

**Aika:** 1500-luvun loppu / 1600-luvun alku; tarkka 1594/1595-vuosi pois.

1. Palatsi medinan eteläosassa El Mebazaâ -kadulla. [O]
2. Rakennuttaja Othman Dey. [O, History]
3. Käyttö vaihtui 1800-luvun alkupuolella tarvikkeiden varastointiin. [O]
4. Dar al-Oula -nimi liittyy tähän käyttöön. [O]
5. Julkisivussa on hevosenkenkäkaari, puisia rakenteita ja pylväitä. [O, Description]
6. Sisäänkäynti johtaa driba-eteiseen. [O]
7. Eteisen kivipenkit ja stukkokatto ovat arkkitehtuurikuvauksen yksityiskohtia. [O]
8. Eteinen johtaa pihaan, jonka arkadiratkaisu poikkeaa lähteen kuvaamasta palatsien tavallisesta neljän sivun mallista. Tarkat määrät pois; ei väitettä jokaisesta medinan talosta. [O]
9. Pihan ympärillä on T-muotoisia huoneita alkoveineen. [O]
10. Myöhempi käyttö liittyy medinan perinnön suojeluun. [O, History]

**1873:** palatsi ja tarviketalon vaihe olivat jo alkaneet; sisustuksen nykyinen tila ja instituutio eivät ole tästä seuraava aikakausiväite. **Kuva:** historiallinen julkisivu tai rakennustila, ei kuvassa mahdollisesti olevia uusia teoksia.

### 5.6 Dar Hussein

**Aika:** vanha palatsi, huomattavia laajennus- ja koristeluvaiheita ennen ja aikana 1800-luvun; ei yhtä varmennettua perustamisvuotta.

1. Palatsi medinassa. [Y/YF]
2. Sijaitsee Bab Menaran kaupunginosassa, Place du Château -osoitteessa. [Y/YF]
3. Eri omistajat laajensivat ja koristelivat sitä ajan mittaan. [Y/YF, History]
4. YF nimeää Youssef Saheb Ettabaân 1800-luvun koristeluvaiheen toimijaksi. [YF, Histoire]
5. Pihassa on valkoista marmoria, pylväitä ja uuskorinttilaisia kapiteeleja. [YF]
6. Koristeluun kuuluvat Qallaline-kaakelit, stukko ja maalattu puu. [YF]
7. Rakennuksessa toimi kunnallinen neuvosto 1800-luvun puolivälissä. [Y/YF; tarkka vuosi/jäsenmäärä pois]
8. Nimi liittyy kenraali Husseiniin, entiseen omistajaan. [Y, Etymology]
9. Myöhempi instituutiokäyttö liittyy kansalliseen kulttuuriperinnön hallintaan. [Y/YF; ei tämän päivän vierailupalvelujen lupausta]

**1873:** palatsi ja aiempi kunnallinen käyttö olivat olemassa; 1800-luvun myöhemmät sotilaalliset vaiheet eivät tule nostoiksi, samoin nykyisen instituution tarkka perustamisvuosi pois. **Kuva:** itse historiallinen rakennus/piha, ei nykyistä hallintotoimintaa tai modernia teosta.

Nähtävyysjutut C:ssä kukin 700–1400 merkkiä, 2–3 kappaletta: paikka, historia, 1873-raja. Aikakenttä vuosisatana tai kerrostumina. Koordinaatit eivät väitä nykyisen sisäänkäynnin sijaintia; ovikäytäntö/esteettömyys varmistettava erikseen.

## 6. Kysymykset 5 ja tiedot 3

Oikea vastaus indeksissä 0. Taso 1 ja 3 mukana. Vastaukset tarkoitettu kaupungin teksteihin, eivät maalehden historiavisasta kopioituja.

| Taso | Kysymys ja vaihtoehdot | Vihjeaihio | Faktatuki / source |
|---:|---|---|---|
| 1 | Mitä Bab el Bharin nimi tarkoittaa? **Merenporttia** / Puutarhaporttia / Vuortenporttia / Aavikkoporttia | Portin nimi kertoo kaupungin yhteydestä veden suuntaan. | B, johdanto; https://en.wikipedia.org/wiki/Bab_el_Bhar |
| 2 | Mihin kauppaan Souk El Attarine Tunisin medinassa erikoistuu? **Hajusteisiin** / Kupariastioihin / Villakankaisiin / Nahkatavaroihin | Kauppakujan esimerkkeihin kuuluvat jasmiini ja ruusuvesi. | AT, Locations; https://en.wikipedia.org/wiki/Souk_El_Attarine |
| 2 | Mitä perhe-elämän historiaa esittelevässä Dar Ben Abdallahissa aiemmin oli? **Palatsi** / Satamavarasto / Koulukasarmi / Rautatieasema | Rakennuksessa on ollut varakkaiden asukkaiden vastaanottotiloja ja piha. | D/DF; https://en.wikipedia.org/wiki/Dar_Ben_Abdallah |
| 3 | Mistä päämateriaalista Kasbah-moskeijan minareetin rakenne ja koristelu on tehty? **Kivestä** / Tiilestä / Puusta / Teräksestä | Torni sai tyylivaikutteita läntisestä Pohjois-Afrikasta, mutta rakentamistavassa on paikallinen ero. | K, Architecture; https://en.wikipedia.org/wiki/Kasbah_Mosque,_Tunis |
| 3 | Mikä tila driba on Dar Othmanissa? **Eteistila** / Vesiallas / Kattoterassi / Rukoussyvennys | Se tulee vastaan sisäänkäynnin jälkeen, ennen pihaa. | O, Description; https://en.wikipedia.org/wiki/Dar_Othman |

Q4 rajataan minareetin rakenteeseen ja julkisivukoristeluun, ei esimerkiksi moskeijan koko huonekaluston materiaaliin. K:n arkkitehtuurivertailu koskee almohadiperinnettä; pelkän tyylivaikutteen vuoksi ei väitetä, että rakennus olisi tehty kokonaan samoilla materiaaleilla kuin vertailukohde.

**Tiedot, nuoren matkaajan havaintoa ilman isoisän ääntä:**

1. ”Bab el Bhar erottaa vanhan medinan uudemmasta Tunisista. Merenportin toinen nimi on Porte de France.” [B; source https://en.wikipedia.org/wiki/Bab_el_Bhar]
2. ”Zitouna on ollut moskeijan lisäksi oppimisen paikka. Siellä opetettiin uskonnollisten aineiden rinnalla muun muassa kielioppia ja historiaa.” [Z, Scholarship; source https://en.wikipedia.org/wiki/Al-Zaytuna_Mosque]
3. ”Dar Lasramissa perheen ja vieraiden tiloilla oli eri kerroksensa. Rakennus kertoo myös palvelu- ja varastotilojen paikoista.” [L, Architecture; source https://en.wikipedia.org/wiki/Dar_Lasram]

Minitehtävä T4 koskee **tarviketaloksi muuttunutta palatsia**; visa kysyy portinnimeä, soukin erikoisalaa, museon aiempaa rakennustyyppiä, minareetin materiaalia ja dribaa. Ei sama kysymys kahdesti, vaikka O tukee sekä huonetermivisaa että eri aiheista käyttöhistoriaa.

## 7. Kuvatarpeet sanallisesti B:lle

**24 paikkaa** (3 kansi + 8 nostot + 1 pysty + 5 opas + 6 kohde + 1 valokuva). O4 tai O5 voi olla kuvaton, jos tiukempi noin 22 kuvan määrä palvelee tätä kevyttä lehteä; oppaassa enintään kaksi kuvatonta jaksoa. Yksi tiedosto vain kerran; sama kohde eri käyttötarkoituksessa eri kuvalla ja aihetoiston perustelulla. Ei avauskuvia, uusia generointeja tai Commons-hakuja A:ssa.

| Kohta | Kuvan aihe | Hakusanat B:lle |
|---|---|---|
| Kansi 1 | Medinan laaja katu-/kaupunkimaisema, ei yhden oven detalji | Tunis medina panorama street |
| Kansi 2 | Bab el Bhar ympäröivässä kaupunkitilassa | Bab el Bhar Tunis wide view |
| Kansi 3 | Zitounan vanha ympäristö tai medina eri suunnasta | Tunis medina Zitouna roof panorama |
| N1 | Historiallinen katutila ja rakennuskokonaisuus | Medina Tunis streets historical |
| N2 | Merenportti eri tiedostosta kuin kansi | Bab el Bhar Porte de France |
| N3 | Zitouna historiallisena oppimisen/uskonnon rakennuksena | Al-Zaytuna mosque old courtyard |
| N4 | Souk El Attarinen tunnistettava kauppakuja, ei pakkaus/mainos lähikuvana | Souk El Attarine Tunis |
| T1 | Kasbah-moskeijan vanha kiviminareetti | Kasbah Mosque Tunis minaret |
| T2 | Dar Lasramin historiallinen piha/arkadit | Dar Lasram Tunis courtyard |
| T3 | Dar Ben Abdallahin rakennuspiha tai vanha rakennustila | Dar Ben Abdallah Tunis palace patio |
| T4 | Dar Othmanin historiallinen sisäänkäynti/eteinen | Dar Othman Tunis facade driba |
| Matkailijalle | Tuore maltillinen pysty, paikallinen vanha rakennustila/kuja | Tunis medina vertical architecture |
| O1 | Tavallinen keskustan liikkumisympäristö, ei suojattu moderni teos pääaiheeksi | Tunis street light metro transport |
| O2 | Medinan kauppakuja eri tiedostona | Tunis medina souk street |
| O3 | Historiallinen palatsipiha eri tiedostona | Dar Lasram Dar Hussein patio |
| O4 | Kahvi ja yksinkertainen kahvilaympäristö, ei tuotepakkaus/mainos | Tunis coffee cafe cup |
| O5 | Medinan tavallinen katutila / varjoisa arkadi | Tunis medina arcade street |
| Kohde 1 | Juuri Bab el Bharin portti | Bab el Bhar gate Tunis |
| Kohde 2 | Juuri Zitouna, ei toinen moskeija tai uusi minareetti vääränä 1873-kuvana | Zitouna Mosque Tunis |
| Kohde 3 | Juuri Tunisin Kasbah-moskeija, ei Marrakeshin/tangerin samanniminen moskeija | Kasbah Mosque Tunis |
| Kohde 4 | Dar Lasram tunnistettavasti | Dar Lasram palace |
| Kohde 5 | Dar Othman tunnistettavasti | Dar Othman palace |
| Kohde 6 | Dar Hussein tunnistettavasti | Dar Hussein Tunis palace |
| Valokuva | Nykyinen medinan paikka tai aidosti ≤1900 ajoitettu PD-vedos | Tunis medina historical photograph 19th century |

Ennen–nyt-pari vain, jos ≤1900 ja ≥1200 px kelvollinen PD-vedos löytyy ja B katsoo sen. Z:n artikkelissa on 1800-luvun kuvaviitteitä, mutta niitä ei tässä ole haettu Commonsista, lisensoitu tai valittu. Muuten valokuva on nykykuva ilman uusi-kenttää/ennenNyt-paria.

**Oikeusraja:** vanha rakennus tai rakennuksen sijaintipaikka ei automaattisesti ole moderni suojattu teos. FOP-puutteen vuoksi ei hylätä kaikkea 1200-/1500-/1800-luvun arkkitehtuuria vailla kohdeanalyysiä. Rakennusvuosi ei toisaalta yksin vapauta modernia uudelleenrakennettua osaa, museon näyttelyteoksia tai erillistä veistosta. B tarkistaa valokuvan kaupallisen PD/CC-lisenssin, kuvatun kohteen oikeudet/teososat, tekijän ja koon sekä esikatselun. Tunnistettavat kasvolähikuvat, vesileimat, kuvan päälle lisätyt tekstit, mainokset/pakkaukset eivät kelpaa. UM:n julkisten rakennusten kuvaamisrajoitus on eri portti kuin tekijänoikeus eikä suojeluluokitus itsessään ole teosoikeus.

Pois valinnoista modernit Kasbahin muistomerkit, uudet taideteokset, mausoleumin nykyinen teoskoristelu, kellotorni, suojatut teatteri-/katedraaliosat sekä Karthagon/Tunisian jo käytetyt kuvat. Tässä ei väitetä jokaisen viimeksi mainitun rakennuksen automaattisesti olevan moderni suojattu teos: ne jäävät tämän rajatun lehden ulkopuolelle, kun kohdekohtainen näyttö puuttuu tai aihe kuuluu toiseen lehteen.

## 8. Ristiriidat ja epävarmat

| Asia | Luettu näyttö | Ratkaisu |
|---|---|---|
| Väestön laajuus | Konteksti: Tunisin kuvernementti, 2024. E:n päätekstissä Grand Tunis -metropoli ja eri vuosien kaupungin luvut. | Vain kontekstin 1 075 306, vuosi ja **kuvernementti**. Ei metropoliksi/kaupungiksi nimeämistä, asukastiheyttä tai pinta-alaa. |
| Kaupunkipallo | Konteksti 36.8065/10.1815; nykyinen Q3572 P625 36.800833…/10.18. | Pallo kontekstista sellaisenaan; ero ehdotuksiin/raporttiin. Nähtävyydet omista entiteeteistä. |
| Medinan yleispiste | M käyttää 36.817/10.167, karkea ja historiallisen ydinkohteen pohjoispuolella. | Ei kartan keskukseksi tai Bab/Zitouna-pisteeksi. Kuusi erillistä paikkapistettä. |
| Medina/Zitouna-perusta | E/M esittävät mm. 698, E:n eri kohdissa myös 723/689/732; Z avaa eri historiankirjoittajien tulkinnat 600-luvun lopusta 700-luvun alkupuolelle. | ”Varhaiskeskiaika”; tarkka perustamisvuosi pois. Z:n lähdekriittinen osio ensisijainen yksilauseisen kaupungin pääartikkeliväitteen sijaan. |
| Maailmanperintövuosi | U:n rekisteri 1979; E/M toistavat sitä. Rekisterin kopio ei ole kaksi riippumatonta alkuperäislähdettä. | Maailmanperintöasema riittää; vuosi säilyy lähdemetatietona ja kontekstissa, ei uusien nostojen numeerisena faktana. |
| Muurien purku | E/M 1865, H 1860. | ”1800-luvulla muureja purettiin”; ei tarkkaa vuositilannetta tai kaikkien porttien samanaikaisuutta. |
| Bab el Bharin ikä | B kuvaa useita muutoksia, ei yksiselitteistä kaaren alku-/rakennusvuotta. | Portti ja muutoshistoria; nykyisen ulkoasun 1873-identtisyys varmentamatta. Ei keksittyä vuosisataa kaarelle. |
| Zitounan torni | Z:n nykyinen minareetti jälleenrakennettu 1894; 1873:ssa aiempi torni. | Tarkka 1894 ei leipätekstiin ilman kahta riippumatonta lähdettä, mutta **1800-luvun lopun nykyminareetti** erotetaan 1873:sta. Vanhassa kuvassa voi olla eri torni. |
| Kasbah-moskeijan vuodet | K: aloitus 1230/1231, minareetti 1233; M: rakennus 1231–1235; E: perustettu 1230; H: 1230 built. | Keskiaika/1200-luku; tarkka alkamis-/valmistumisvuosi ja ”built”-vaihe pois. |
| Souk El Attarinen ajoitus | AT hafsidien 1240; E:n Souks-osio 1700-luvun alku. | ”Vanha hajusteiden kauppakuja”, ei tarkkaa vuotta eikä ristiriidan yli yhtä vuosisataa. |
| Dar Lasram | L:n infolaatikko 1812; History 1812–1819; H 1819. | 1800-luvun alkupuoli. Infolaatikon yksi vuosi ei koko rakentamisen yksiselitteinen valmistumisvuosi. |
| Dar Othman | O:n infolaatikko 1594, History noin 1595; E kuvaa varhaista 1600-lukua. | 1500-luvun loppu / 1600-luvun alku, ei täsmällistä vuotta. |
| Dar Ben Abdallah museo | D/DF hankinta/museovaihe 1964; D:n Museum-osio mainitsee muuntamisen 1978. V:n näyttelytiedot vuodelta 2018. | 1900-luvun museokäyttö; erilaisten toimien mahdollista eroa ei ratkaista omalla päättelyllä. Ei nykyisiä aukioloaikoja/näyttelymäärää. |
| Dar Ben Abdallah koordinaatti | WD 36.7942876/10.1716075; DF 36°47′39″N 10°10′18″E tukee samaa. V:n museo 36.7942/10.17418 poikkeaa noin parinsadan metrin verran. | Ei julisteta WD:tä vääräksi: fr-artikkeli tukee sitä. Tässä kevyt kartta käyttää Dar Husseinia, Dar Ben jää tekstiaiheeksi. D voi varmistaa rakennuksen paikannuksen erikseen ennen mahdollista palautusta. Ei V-pisteen nimeämistä WP/WD-pisteeksi eikä omatekoista keskiarvoa. |
| Dar Hussein | Y/YF historia- ja paikkatieto, mutta lisäviitteiden puute varoituksena; eri vuosia 1881/1882 miehitysvaiheelle. | Vanha palatsi/1800-luvun kerrostumat ja materiaalit. Miehitysvaihetta ei nostoihin, tarkka perustamis-/käyttövuosi ja kymmenen jäsenen luku pois. |
| Palatsit avoinna nyt | L/O/Y kuvaavat suojeluinstituutioita; V:n D-kohta vanha. | Käyntimahdollisuusvaraus, ei sulkemisväite eikä vapaa sisäänpääsy. |
| Zitouna-sisäänpääsy | V antaa vanhan katselutasanne-/hintaohjeen ja samassa kohdassa sulkemisen turisteilta vallankumouksen jälkeen. | Ei kummastakaan varmaa 2026-ohjetta. Pääsy/pukeutuminen paikan nykyisistä ohjeista. |
| TGM ja liikenne | V mainitsee korjaustöitä 2025; Karthagon oppaassa jo ratahistoria. | Ei palvelulupausta, linjastoa, hintaa tai toistettua ratatarinaa. |
| Ilmastokaudet | Saa.json:n normaalit 1991–2020 lentoasemalta; äärilämpöjen aikaväli ja kosteuden/auringon eri kaudet näkyvät taustassa. UM:n 40 °C on koko maan riskikuvaus. | Kaikki oppaan ilmastoluvut annetusta saa.json:sta; vain normaalien kausi ja oikea asema. Ei UM:n lukua kaupungin kuukausinormaaliksi. |
| Oikeudet | A ei ole todentanut kuvalisenssejä, suojatun modernin teososan vapautta tai nykyisiä kuvauslupia. | Sanalliset tarpeet B:lle; kuvaoikeus ja paikallinen kuvaamisrajoitus erotetaan, ei automaattista vanhan arkkitehtuurin kieltoa tai CC:n yleisvapautusta. |

Tarkat luvut/vuodet yllä ovat ristiriidan dokumentointia, eivät siirrettäviä väitteitä. Uusia rakennusvuosia ei tässä hyväksytä yhden alkuperäislähteen tai sen wiki-kopion perusteella. Vuosisata/noin/poisto on ratkaisu. Koordinaatit ovat sopimuksen mukaista WP/WD-paikkadataa; väestö on tilauksen kontekstia ja ilmasto työkalun saa.json-dataa.

## 9. Poisjätetyt aiheet

- Karthagon rauniot, Antoninuksen kylpylät, puunilaiskortteli, satamat, mosaiikit, Byrsan katedraali, suuri basilika, Hannibal, Didon härännahka ja akvedukti: jo lähikaupungin sisältöä. Myös Bardon mosaiikit, purppuraväri ja sotanorsut on maalehden työnjakokommentissa varattu Karthagolle.
- Tunisia-lehden ensimmäisen Historia-sivun Didon tarina, Rooman vilja, aghlabidien Sisilian-retki ja ensimmäinen perustuslaki eivät ole Tunisin uusia kansinostoja. Protektoraatin Bardon sopimus on jo lähipiste.
- Harissan amerikkalainen alkuperä, oliiviöljyn vienti, brik ja muodon mukaan nimetty leivos eivät tule uudeksi ruokateemaksi. Opas jää kahvitauon arkiseksi kuvaukseksi; ei vapaata koko maan ruokahistoriaa.
- Klee/Macke, Tunisin koulukunta, Safia Farhat ja Sidi Bou Said ovat maalehden kuvataidesivun aiheet. Modernit suojatut taideteokset eivät ole kartta- tai kuva-aiheita.
- Maluf/nawba-sarjat, Erlangerin kirjasarja, mezoued ja luuttu ovat maalehden musiikkia; Dar Lasramiin ei lisätä samaa tarinaa eri rakennuskuvalla.
- Ichkeul, charfia, Gabèsin vuorovesi ja Djerban Odysseus ovat maan merisivu. Tunisinjärvestä ei kirjoiteta näiden avulla uutta ekologista tarinaa. Rannikon yleissijainti saa olla perusfakta.
- Sidi Bou Saidin sinivalkoinen kylä ja TGM:n historiallinen rata jäävät omiin jo kirjoitettuihin kokonaisuuksiinsa. Opas ei ole niiden uusi esittelykierros.
- Bardo-museo, moderni kellotorni, uusi teatteri, Kasbahin muistomerkit ja muut suojatut modernit teokset eivät täytä tämän medina-kartan paikkamäärää. Poisjättö ei ole väite kaiken vanhan arkkitehtuurin kuvauskiellosta.
- Nykypolitiikka, vaalit, arabikevät, sota ja nykyrikollisuus pois. UM:stä vain ajantasainen turvallisuus-/liikenne-/kuvaamiskäytäntö, ilman nykyisten tapahtumien kertomusta.
- Ei ukin liikkeitä, päiväkirjamerkintää, repliikkejä, isoisän junamatkaa tai tarinakaaren muutoksia. 1873-kehys on aikaraja.
- Pois jätetty Dar Ben Abdallahin piste ei jää kartan piilopisteeksi. Medinan karkea yleispiste tai kaupungin nykyinen hallintopiste ei korvaa omia kohteita.

**A:n tila:** osiot 0–9 kirjoitettu; pääartikkeli, historiakronologia ja kaikki kuusi karttapaikka-artikkelia luettu; kuudelle paikalle oma WP/WD-piste ja 6–10 faktaa; kansi 4 ja historia 4 nostoa, opas 5 jaksoa, parasta 5, hyvä tietää 4, visa 5 ja tiedot 3, 24 kuvatarvetta (oppaasta voidaan jättää 1–2 kuvatonta). Aidot jatkoportit: B:n kaupalliset kuvat ja esikatselut; C:n tekstit/mitat; D:n riippumaton varmistus, erityisesti vanhojen rakennusten kerrostumat, Dar Ben Abdallahin paikkaristiriita ja palatsien nykyinen pääsy. Kaupunkipallon ero raportoitava. Kokonainen kaupunki ei ole tämän faktapohjan perusteella vielä valmis.
