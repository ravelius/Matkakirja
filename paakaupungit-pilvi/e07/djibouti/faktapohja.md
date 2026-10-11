# Djibouti — vaihe A, faktapohja 0–9

Erä e07, id `djibouti`, maa DJI. Luettu **11.10.2026**. **A on keskeneräinen:** 4 + 4 nostoaiheen lähdeaineisto ja opas ovat koossa, mutta kuudesta kahdeksaan hyväksyttyä historiallisen keskustan karttakohdetta ei ole. Hamoudin moskeijalle ja vanhalle satamalle löytyivät omat WP/WD-pisteet; moskeijan tekijäketju ja satamakohteen rakennus/luonto-tyyppi ovat vielä avoinna. Aukioiden omat WP/WD-koordinaatit puuttuvat. Kaupungin suuren asukasluvun vuoksi pienen pääkaupungin 1–5 kohteen poikkeusta ei oleteta sovellettavaksi.

Tämä on lähdepaketti, ei kirjoitettu `sisalto.json`, kuvavalinta, valmis kaupunki eikä pelijulkaisu. Numeroista ja vuosista käytetään alla määriteltyjä yleistyksiä; lähdemuistiinpanojen tarkat luvut eivät sellaisinaan ole lupa julkaista niitä.

## 0. Luetut lähteet ja 1873-kehys

Verkkolähteet haettiin yhteisellä `sallittu_haku.py`-kuljetuksella: robots.txt ennen uutta verkkotunnusta ja polun/ohjauksen tarkistus ennen sivua, yhteinen 1 pyyntö/s -lukko ja välimuisti. Omistajan hyväksymän poikkeuksen mukaisesti käytettiin sallittuja alkuperäisiä `/wiki/`-lähdesivuja estettyjen rajapintojen sijasta. Ei `/w/`, `/api/`, estettyjä Special-polkuja eikä User-Agent-kierrätystä. Raakalähteet, tekstipoiminnat, metatiedot ja linkit ovat NAS:n kansiossa `valiaikainen/djibouti-A/`; niiden SHA-tiedot ovat `lahteet.json`-manifestissa ja yhteisessä `sallitut-haut.jsonl`-lokissa.

### Wikipedia ja Wikisource

| Tunnus | Alkuperäinen sivu | Kieli, revisio | Luetut osiot |
|---|---|---|---|
| S1 | [Djibouti City](https://en.wikipedia.org/wiki/Djibouti_City) | en, 1376655946 | johdanto, History, Climate ja taulukon viitteet, Local government, Architecture, Main sights, Tourism, Transport |
| S2 | [Djibouti (ville)](https://fr.wikipedia.org/wiki/Djibouti_(ville)) | fr, 237193477 | johdanto, Histoire, Géographie, Transport |
| S3 | [Timeline of Djibouti City](https://en.wikipedia.org/wiki/Timeline_of_Djibouti_City) | en, 1365499211 | varhaiset kaupungin ja radan vuosimerkinnät; ristiriidat S1:n kanssa |
| S4 | [Hamoudi Mosque](https://en.wikipedia.org/wiki/Hamoudi_Mosque) | en, 1366941182 | johdanto, Overview, vuosiriidan Notes, omat koordinaatit |
| S5 | [Al Sada Mosque](https://en.wikipedia.org/wiki/Al_Sada_Mosque) | en, 1366921820 | johdanto, infolaatikko, Capacity; ei omaa koordinaattia |
| S6 | [Port of Djibouti](https://en.wikipedia.org/wiki/Port_of_Djibouti) | en, 1373709292 | johdanto, Ethiopian trade, History, omat koordinaatit; nykykiistat jätetty pois |
| S7 | [Ethio-Djibouti Railways](https://en.wikipedia.org/wiki/Ethio-Djibouti_Railways) | en, 1358413843 | johdanto, Railway, Stations, History/Construction; vanha asema erotettu Nagadista |
| S8 | [Ambouli](https://en.wikipedia.org/wiki/Ambouli) | en, 1378460213 | johdanto, Overview, Transportation, kylän oma piste |
| S9 | [Moucha Island](https://en.wikipedia.org/wiki/Moucha_Island) | en, 1364052964 | johdanto, History, Physical geography, omat koordinaatit; lukujen sisäiset ristiriidat |
| S10 | [Maskali Islands](https://en.wikipedia.org/wiki/Maskali_Islands) | en, 1364050410 | johdanto, omat koordinaatit, UNESCO-viite |
| S11 | [Gulf of Tadjoura](https://en.wikipedia.org/wiki/Gulf_of_Tadjoura) | en, 1366021170 | johdanto, Geography, Islands, Transport; ei turistiosion prosenttilukuja/superlatiiveja |
| S12 | [Djiboutian cuisine](https://en.wikipedia.org/wiki/Djiboutian_cuisine) | en, 1356759255 | johdanto, Breakfast, Lunch and dinner, Snacks and sweets; lähteettömät tarkat annosmäärät pois |
| S13 | [Djibouti–Ambouli International Airport](https://en.wikipedia.org/wiki/Djibouti%E2%80%93Ambouli_International_Airport) | en, 1375698027 | johdanto ja infolaatikon nykyinen nimi/IATA; ei lentoaikatauluja eikä sotilastoimintaa |
| S14 | [Nagad railway station](https://en.wikipedia.org/wiki/Nagad_railway_station) | en, 1369942127 | johdanto, Overview ja nykyaseman ero vanhaan; vanhentunut liikennekommentti huomioitu |
| S15 | [1911 Encyclopædia Britannica/Jibuti](https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Jibuti) | en, 4790277 | koko lyhyt aikalaisartikkeli, erityisesti niemimaa, satama, kauppapaikka, rakennukset ja synty |

### Alkuperäiset muut lähteet ja opas

| Tunnus | Alkuperäinen lähde | Päiväys/luettu kohta |
|---|---|---|
| P1 | [IRCICA: Hamoudi Mosque](https://www.islamicarchitecturalheritage.com/listings/hamoudi-mosque) | inventaario: Historic Period, Year of Construction, Architect **Unknown**, Significance; omaa päivityspäivää ei ilmoiteta, luettu 11.10.2026 |
| P2 | [Samson A. Bezabeh: Djibouti and the Death of Hamoudi Ahmed](https://journals.openedition.org/etudesafricaines/34699) | Cahiers d’études africaines 243 (2021), 511–531; erityisesti johdanto ja kappaleet 8–12, arkistotutkimus kaupungin jemeniittikauppiaista ja moskeijan perustajasta |
| P3 | [Port de Djibouti: Port History](https://www.portdedjibouti.com/port-history/) | koko historiaosio; radan, suojaisan ankkuripaikan, laivojen polttoainehuollon ja konttien kehitys; päivää ei ilmoiteta, nykykiistoihin ei tukeuduta |
| P4 | [Djiboutin kansallinen matkailuvirasto ANT: Djibouti, la Capitale](https://guide.visitdjibouti.dj/djibouti/) | kaupungin alku, Place du 27 Juin, vanha Ménélik-nimi, Mahamoud/Mahmoud Harbi ja torikorttelit; ei hintoja eikä aukioloaikoja |
| P5 | [eJO: Arrêté n° 78-0634/MI](https://www.journalofficiel.dj/texte-juridique/arrete-n78-0634-mi-portant-fixation-du-nom-de-voies-et-immeubles-du-domaine-public/) | alkuperäinen nimipäätös, artiklat 1–2: Ménélik → place du 27-Juin-1977; Rimbaud → place Mahamoud Harbi; nimenvaihto 1970-luvulla, tarkkaa päätösvuotta ei tarvita leipätekstiin |
| P6 | [Moucha ja Maskali: UNESCO:n aieluettelo, nro 5960](https://whc.unesco.org/en/tentativelists/5960/) | Djiboutin valtion toimittama Description ja Integrity; korallisaaret, mangrove, merilinnut, suojelu. **Aieluettelo, ei maailmanperintökohde.** Ilmoitettu sijaintipiste on ristiriitainen, sitä ei käytetä |
| P7 | [Ville de Djibouti: Place Mahmoud Harbin katujärjestelyt](https://villededjibouti.dj/actualite2.php?id=342) | kunnan tiedote 11.8.2026, aukion ja kauppakatujen nykyinen olemassaolo sekä muuttuvat kulkujärjestelyt; ei hallintotoimista lehtinostoa |
| O1 | [Djibouti (city), Wikivoyage](https://en.wikivoyage.org/wiki/Djibouti_(city)) | en, revisio 5385385, Understand, Get in/Get around, See, Eat, Stay safe. Hintojen, hotellien, väkimäärän ja aikataulujen julkaiseminen pois; ruokapaikan uunikuvaus päivitetty 7/2025, Nagad-merkintä 6/2019 |
| O2 | [UM: Djibouti, matkustustiedote](https://um.fi/matkustustiedote/-/c/DJ) | **21.8.2026**, luettu 11.10.2026: erityinen varovaisuus, Eritrean raja-alueen rajoitus, pimeällä ajon välttäminen kaupungin ulkopuolella, vesi, pukeutuminen ja kuvausrajoitukset |

WFP/LCA:n hakutulososoite `https://lca.logcluster.org/221-djibouti-ambouli-international-airport` palautti **0 tavua**, joten sitä ei käytetä todisteena. Djibouti.ch-suurlähetystön sivun varmennus pysähtyi TLS-isäntänimivirheeseen; ei tietoja mukaan eikä varmennuksen ohitusta.

### Wikidata, oman pisteen tarkistus

EntityData-lähteet luettiin sallitusta `/wiki/Special:EntityData/Q….json`-polusta, tallenteet saman A-väliaikaiskansion Q-tiedostoissa.

| Kohde | Entiteetti, revisio | P625 / huomio |
|---|---|---|
| Hamoudin moskeija | Q10856947, 2474755527 | 11.592361111111112, 43.14608333333333, sama kuin oma en-WP; P84-arkkitehtia ei ole |
| Vanha satama | Q7231129, 2515951077 | 11.6053, 43.1392, sama kuin oma en-WP |
| Ambouli | Q4741683, 2324669932 | 11.59000, 43.12250: **kaupunginosan/kylän piste**, ei puutarhan tai joen piste |
| Al Sada | Q16148632, 2418926863 | **ei P625:tä** eikä P84-arkkitehtia |
| Moucha | Q258363, 2506096960 | 11.72444444, 43.19166666; ero omaan WP-pisteeseen 11.717, 43.183; ei keskustakarttaan |
| Maskali | Q6783390, 2506107829 | kaksi keskenään ristiriitaista P625:tä 11.425265, 43.093175 ja 11.71639, 43.20611; en-WP 11.70914, 43.16459; ei hiljaista valintaa |
| Nagad | Q28532741, 2419607187 | 11.52333333, 43.12750; erittäin väljä WD-tarkkuusarvo, oman WP:n piste myös 11.52333, 43.12750; opastieto, ei keskustakohde |

### 1873-kehys

- Djiboutin **nykyistä kaupunkia ei vielä ollut isoisän matkavuonna 1873**. S15 sijoittaa kaupungin synnyn 1880-luvun lopulle ja P4 rakentumisen 1800-luvun viimeisiin vuosikymmeniin. Näillä toisistaan erillisillä lähteillä voidaan erottaa 1873 ja myöhempi kaupunki ilman tarkkaa perustamisvuotta.
- Ei sanota, että koko seutu olisi ollut tyhjä. S1 kertoo **Amboulin kylästä ennen ranskalaisen kaupungin perustamista** ja lähialueen viljelystä; S8 toistaa historiallisen paikannimen tulkintaa, joka jätetään epävarmana pois.
- Rautatie, nykyiset aukiot ja keskustamoskeijat eivät kuulu vuoden 1873 kaupunkikuvaan: S7 ja P1 sijoittavat ne myöhempään aikaan. Isoisää ei panna junaan, moskeijaan tai Ménélik-aukiolle.
- S15:n 1900-luvun alun kuvauksessa kaupungilla on kivitaloja, verantoja, satama, tullirakennus ja rata-asema. Tämä on **myöhempi aikalaiskuva**, ei 1873-todiste talokohtaisesta ulkonäöstä.

## 1. Perusfaktat

- Suomenkielinen nimi Djibouti, maan pääkaupunki ja satamakaupunki. Wiki-avain tarkistetaan fi/en-kuljetuksesta C-vaiheessa; en-otsikko on **Djibouti City**. Kontekstin nimi `Djibouti (kaupunki)` on ehdotus, ei tässä erikseen luettu fi-sivu.
- Kaupunki on Tadjouran lahden etelärannalla Adeninlahden yhteydessä Afrikan sarvessa (S1, S11, S15). Ei kutsuta koko lahtea Punaiseksimereksi.
- S1 ja S15 kuvaavat kaupunkikeskuksen niemimaalla; vanha ydin ja satama ovat kartan lähtökohta. Kontekstin hallinnollista pistettä ei lainata jokaisen kohteen pisteeksi.
- Kaupungin kasvu kytkeytyi satamaan ja Etiopiaan johtaneeseen rautatiehen (S1, S7, P3). Syy-yhteys on lähteissä, ei tästä itse päätelty taloushistoria.
- Nimen etymologia ei saanut luetusta aineistosta riittävää tukea: ei kansantarinaa nimen alkuperästä.
- Asukasluku vain `konteksti.json`: 2024 kaupungin kolmelle kunnalle (Balbala, Boulaos, Ras Dika) yhteensä 767 250. Lähdeketju kontekstissa INSTAD/RGPH-3 → citypopulation.de. Itse citypopulation-sivua ei haettu eikä siitä väitetä uutta riippumatonta tarkistusta. Pelaajatekstiin tarvittaessa **noin 770 000 asukasta kaupungin kolmessa kunnassa vuonna 2024**; tarkkaa summaa ei esitetä uutena kahdesta lähteestä vahvistettuna faktana.
- Nykyinen kaupungin hallintoalue/kunta, taajama ja sataman vaikutusalue eivät ole sama väestö- tai pinta-alamääritelmä. S1:n noin 780 000, sen toinen noin 777 000, S2:n vanhempi noin 600 000 sekä O1:n noin 400 000 eivät korvaa kontekstia.

## 2. Kansi — johdanto ja neljä nostoaihetta

Johdantoehdotus: Djiboutin vanhassa keskustassa torikujat yhdistävät kahta eri tavoin toimivaa aukiota. Lahden toisella puolella odottavat korallisaaret; kaupungin historia puolestaan seuraa satamaa ja Etiopiaan johtanutta rataa.

### K1 — Aukio, joka vaihtoi nimeä

Wiki-tausta **Djibouti City**, Architecture; P4/P5 ovat tarkemmat paikkalähteet.

1. Place du 27 Juin on vanhan keskustan aukio (S1, P4).
2. Sen aikaisempi nimi oli Place Ménélik (P4, P5); ei väitetä nimenvaihdon tapahtuneen itse itsenäisyyspäivänä.
3. Nykyinen pitkä virallinen nimi sisältää **27-Juin-1977**, mutta nimipäätös ja sen voimaantulo ovat myöhemmät (P5; nimi saa näkyä erisnimenä).
4. Aukion yhteydessä on kahviloiden terasseja ja matkamuistokauppaa (P4).
5. S1 erottaa sen maurilaisvaikutteiset arkadit muusta kaupungin arkkitehtuurista. Yksittäisen julkisivun valmistumisvuotta ei oleteta.
6. Torikujat yhdistävät sen Mahamoud Harbin aukioon (P4).

Kuva: aukion laaja yleiskuva tai vanha varmennettu PD-vedos; rakennusten nykyiset osat ja kuvaan osuvat suojatut teokset tarkistetaan B:ssä. Ei käytetä naapuribaarin hyökkäysartikkelin koordinaattia aukion omana pisteenä.

### K2 — Torin kujat ja korit

Wiki-tausta **Djibouti City**, Architecture/Main sights; paikallinen tarkennus P4/P5/P7.

1. Mahamoud Harbin aukio tunnettiin aikaisemmin Place Rimbaud -nimellä (P4, P5).
2. Aukiota ympäröivillä kujilla on kauppoja ja ulkoilmabasaareja (P4).
3. P4 mainitsee paikallisina käsityötuotteina **punotut korit**, laukut ja helmikorut; ei nimetä tuntematonta esinettä tekijältään tai etniseltä ryhmältään.
4. Aukion yläpuolella näkyy suuren moskeijan minareetti (P4); tarkka moskeijakuvan kohde varmennetaan B:ssä eikä pelkän kuvatekstin perusteella.
5. Vanhan keskuksen basaareja on kapeilla kaduilla (S1, Architecture).
6. P7 vahvistaa aukion ja Rue du Cadi-Shamsanin nykyisen käytön mutta kertoo kulkujärjestelyjen muuttamisesta: ei luvata juuri tietyn kojun pysyvää sijaintia tai tiettyä esteetöntä reittiä.

Kuva: paikallisen korin valmistus/esine tai aukion yleisnäkymä ilman luettavia kasvoja. Nykykäsityön tekijänoikeudet tarkistetaan erikseen; moderni veistos ei kelpaa korin sijaiskuvaksi. Jos paikallinen esinekuva puuttuu, aihe muutetaan B/C-yhteistyössä lähteistetyksi torikujien käytöksi, ei väärän maan koriin.

### K3 — Kala jemeniittiläisessä uunissa

Wiki-otsikko **Djiboutian cuisine**, johdanto; paikallinen ruokapaikkatieto O1/Eat.

1. Djiboutin ruokaperinteessä on somalialaisia, afarilaisia, jemeniittiläisiä ja ranskalaisia vaikutteita (S12).
2. Kala valmistetaan paikallisessa jemeniittiläisessä perinteessä avattuna ja paahdettuna (S12).
3. S12 mainitsee uunityypin tandoori-tyyliseksi; tästä ei päätellä tarkkaa alkuperäistä intialaista reseptiä.
4. O1 kuvaa kaupungin Ambouli-kadulla toimivan ruokapaikan käyttävän perinteistä jemeniittiläistä saviuunia ja akaasiapuuta; tämä **yhden ruokapaikan tieto**, ei väite kaikkien kaupungin ravintoloiden menetelmästä.
5. O1:n tämän ravintolan ruokamerkintä on päivitetty heinäkuussa 2025. Ei hintoja, aukioloaikoja, pöytävarausta tai yrityksen suosittelua peliin.
6. S12:n erillinen aamiaiskuvaselitys: lahoh on pannukakkua muistuttava leipä, jota voidaan syödä keiton tai padan kanssa. Ei lähteetöntä kolmen leivän määrää eikä väitettä, että kuvan kala-annoksessa olisi juuri lahohia.

Kuva: paahdettu kala/uunin toimintaperiaate; jos kuva on muualla kuvattu, kuvateksti nimeää ruoan yleiseksi eikä väitä kuvassa olevan Djiboutin tietyn ravintolan annosta. Ei pakkauksia/mainoskuvia eikä syöjän kasvoja.

### K4 — Saaria korallin päällä

Wiki-tausta **Moucha Island** ja **Maskali Islands**; paikallisen luonnon ensisijainen alkuperäislähde P6, Description.

1. Moucha ja Maskali sijaitsevat Tadjouran lahden suulla (S9, S10, P6).
2. Ne ovat kohonneita koralliriuttoja ja korallisaarekkeita (P6).
3. Saarilla on mangrovekasvillisuutta ja palétuvier-puita (P6).
4. Vedenalaisessa ympäristössä on koralleja ja levää (P6).
5. P6 mainitsee muun muassa riuttahaikaran ja valkoisen kapustahaikaran, merikilpikonnia ja sinitäplärauskun; ei lupauksia eläinten näkemisestä retkellä eikä jokaisen P6:n lajin paikallista endeemisyyttä.
6. Korallien ja simpukankuorien keräämistä sekä vedenalaista metsästystä on suojelussa rajoitettu/kielletty (P6). Kuva tai opas ei rohkaise keräämiseen.
7. Saarille päästään meritse (P6). Kyse on **kaupungista tehtävästä saariretkestä**, ei kaupungin keskustan puistosta.
8. P6 on valtion UNESCOlle toimittama **aieluetteloesitys**; saaria ei sanota hyväksytyksi maailmanperintökohteeksi.

Kuva: oikea Moucha/Maskali-mangrove tai koralliranta; ei väärän lahden rantaa eikä pelkkää hotelliuima-allasta. Koordinaattiristiriidoista ei saada lupaa siirtää saaria keskustakarttaan.

## 3. Teemasivu — historia, Kaupunki merireitin varrella

Vakioaihe `historia`. Johdantoehdotus: Amboulin kylä on satamakaupunkia vanhempi. Djiboutin kasvu seurasi ensin niemimaan suojaisaa ankkuripaikkaa ja myöhemmin rataa Etiopian sisämaahan.

### H1 — Nuori kaupunki vanhalla rannikolla

Wiki **Djibouti City**, History; S15 ja P4 erillisinä lähteinä.

1. Nykyinen kaupunki syntyi 1800-luvun loppupuolella (S1, S15, P4), ei ennen vuotta 1873.
2. Keskus rakennettiin niemimaalle; S15 kuvaa sen hevosenkengän kaltaiseksi ja osittain matalaksi rannaksi.
3. Kaupungin synty ei tarkoita koko seudun asutuksen syntyä: Amboulin kylä oli vanhempi (S1).
4. S1 kuvaa somalialaisten ja afarilaisten asukkaiden rakentavan keskustan taloja ja työskentelevän satamassa; paikalliset ovat kaupungin rakentajia, eivät pelkkä kolonialismin tausta.
5. Jemeniittiläisiä kauppiaita tuli merireitin molemmin puolin (S1, P2).
6. S15:n myöhemmässä aikalaiskuvassa kivitaloihin kuuluivat tasakatot ja verannat; ei kaikkien nykyjulkisivujen rakennusvuoden yleistystä.

Ei lähdetekstin vanhentuneita etnisiä nimityksiä, sivistyshierarkiaa tai perustajasta sankarikertomusta.

### H2 — Amboulin kylä ja puutarhat

Wiki **Ambouli** sekä **Djibouti City**, History.

1. Ambouli on kaupungin eteläinen osa ja historiallinen kylä (S8, S1).
2. S1 toteaa kylän olleen olemassa ennen ranskalaisen kaupungin syntyä.
3. S1:n historiallisessa kaupunkikuvauksessa alueella viljeltiin taatelipalmuja.
4. Samassa kuvauksessa mainitaan hedelmätarhoja; ei väitetä kaikkien nykyisten tarhojen säilyneen tuosta ajasta.
5. Nykyinen lentoasema on Amboulin alueella (S8, S13), mutta sitä ei esitetä kylän 1873-kohteena.

S8:n al-Idrisin paikannimen Canbala/Cambaleh tulkinta jätetään pois: kyse on tutkijan identifikaatiosta, eikä tarkka keskiaikainen paikannimistö saanut toista riippumatonta tukea. Kuvan pitää olla Amboulin puutarha/vanha kylä tai selvästi nimetty yleinen taatelipalmu; kyläpistettä ei käytetä tietyn tarhan pisteenä.

### H3 — Rata meren ja sisämaan välillä

Wiki **Ethio-Djibouti Railways**, Railway/Stations/History.

1. Vanha rata yhdisti Djiboutin sataman Etiopian pääkaupunkiin Addis Abebaan (S7, P3).
2. Rakentaminen ajoittui 1800-luvun lopulta 1900-luvun alkuun (S7); ei vuosiin 1873 tai varhaisemmaksi.
3. Vanha rata oli metriraiteinen (S7; tekninen nimitys, ei kiistanalainen historiallinen määräluku).
4. Reitti tarjosi Etiopialle raideyhteyden merisatamaan (S7, P3).
5. Keskustan vanha asema ei ole nykyinen Nagadin matkustaja-asema (S14, S1).
6. Uusi rata on eri, sähköistetty normaaliraiteinen linja; se ei muuttanut vanhaa keskustan asemaa uudeksi matkustajaterminaaliksi (S7, S14).

Kuvassa vanha asema/vanha veturi oikeine paikkatietoineen; ei Nagadin rakennusta vuonna 1873 eikä Etio-Djiboutin rautatien tilalla mielivaltaista naapurimaan junaa. Aseman oma karttakoordinaatti puuttuu.

### H4 — Höyrylaivojen hiilestä kontteihin

Wiki **Port of Djibouti**, History; P3 ja S15.

1. S15:n aikalaisartikkeli kuvaa sataman suojaisaksi ja valtamerihöyrylaivoille sopivaksi.
2. Satamassa huollettiin Messageries Maritimesin höyrylaivoja ja täydennettiin hiiltä (S15).
3. Yhteys Etiopian sisämaahan oli sataman kaupalle tärkeä (S15, P3).
4. P3 sanoo radan valmistumisen kasvattaneen sataman toimintaa; tämä syy-yhteys voidaan käyttää ilman omia laskelmia.
5. P3 kuvaa polttoainetäydennysten voimakkaan kasvun 1900-luvun puolivälissä; tarkat tonni- ja nelinkertaistumisluvut jätetään pois.
6. Konttiliikenne toi satamaan uuden toimintavaiheen 1900-luvun loppupuolella (P3, S6); tarkkaa avauskuukautta ei paineta ilman toista itsenäistä lähdettä.
7. Nykyinen Doralehin satama/radan tavaraterminaali ja vanha Djiboutin satama ovat eri paikkoja (S6, S14). Ei nimeämätöntä satamakuvaa vanhan laiturin varmaksi kuvaksi.

Fontainebleau-hylyn laituritarina on S1:ssä, mutta tässä ei saatu erillistä alkuperäistodistetta sen yksityiskohdille: **ei nostoon**. Historiallinen hiilihöyrylaiva ja nykykontti tarvitsevat eri kuvatiedostot, jos aihe kuvitetaan kahdesti.

### Minitehtäväehdotus

Kysytään H4:stä, **mitä polttoainetta satamassa täydennettiin varhaisiin valtamerihöyrylaivoihin**: hiiltä. Vastauksen on jäätävä H4-tekstiin. Alla oleva visa ei kysy samaa asiaa. Ei vuosi-/tonnimäärän muistamista.

## 4. Nykyopas — viisi jaksoa

### O1 — Keskustan kaksi aukiota

P4:n lähde kertoo Place du 27 Juinista, Mahamoud Harbin aukiosta ja niiden välisistä kauppakujista. O1 mainitsee vihreät taksit; ei hintaa eikä väitettä niiden täydellisestä saatavuudesta. P7:n nykyinen katutyö-/järjestelytieto estää kiinteän kojureitin lupaamisen. Moskeijan sisäänpääsyä tai avoimia aikoja ei ole varmennettu, joten sitä ei luvata.

### O2 — Ruokapöydässä

S12:n kala, mausteet ja lahoh sekä O1:n kaupungin jemeniittiläinen saviuuni käyvät paikallisen ruokakulttuurin selitykseksi. Ei hintatasoa, alkoholi-/ravintolasuosituksia, lähteettömiä annosmääriä eikä takuita nykyisestä ruokalistasta. O2 neuvoo hillittyä pukeutumista julkisilla paikoilla.

### O3 — Merelle kaupungista

Moucha/Maskali on erillinen saariretki (S1, P6), ei keskustan kävelyretki. Keräämisen ja vedenalaisen metsästyksen rajoitukset huomioidaan (P6). Saarille menon, opastuksen ja mahdollisen sukelluksen nykyiset ehdot selvitetään järjestäjältä; ei taattuja valashaihavaintoja, päivittäistä lähtöä tai veneajan lukua. Viranomaisen sivu antaa alueelle suojelutilan mutta ei tämän päivän yksittäisen retken lupaa.

### O4 — Kuumuus, vesi ja turvallisuus

**Säätiedot null.** Aiempi `saa.json` hylättiin normaalikauden lähderistiriidan vuoksi (kohta 8); tästä sarjasta ei lämpöasteita, sadelukuja, kuukausivertailuja tai luonnehdintaa. Käytännön ohje O2:n luonto- ja terveysosioista: varaa vettä mukaan, erityisesti kaupungin ulkopuolelle; kuumuus on huomioitava. Nykyinen turvallisuustaso 21.8.2026 on **erityinen varovaisuus**. Pelaajatekstiin lyhyesti: matkalla tarvitaan tavallista enemmän varovaisuutta, Eritrean raja-alueelle ei matkusteta eikä tukikohta-alueiden lähistölle mennä. Ei konfliktin, terrorismin tai rikollisuuden lehtitarinaa.

### O5 — Saapuminen ja kuvaaminen

Nykyinen lentoasema on **Djibouti–Ambouli International Airport, IATA JIB** (S13, O1; ANT:n nykyisessä yhteystieto-osassa myös Ambouli). Matkustajajunien asema on **Nagad**, keskustan vanha asema on eri kohde (S14/S1). Aikataulut ja saatavuus tarkistetaan ennen matkaa: S14:ssa on edelleen vuonna 2017 pysähtynyt palvelukommentti, O1:n junamerkintä on 2019, joten tämän päivän liikennevuoroja ei luvata. O2 neuvoo välttämään pimeällä ajoa pääkaupungin ulkopuolella. Sataman, lentoaseman ja sotilaskohteiden kuvaamiseen voi liittyä kieltoja; opas neuvoo tarkistamaan paikalliset rajoitukset, ei lupaa kuvauslupaa CC-valokuvan perusteella.

**Parasta 5:** vanhan keskustan aukiot; kauppakujat; lahden kaupunkirannat (O1/See, ei nimettömän kuvan nimeämistä Héroniksi); paikallinen kalakeittiö; erikseen järjestetty koralli-/mangrovesaariretki.

**Hyvä tietää 4:** vettä mukaan; pukeutuminen hillitysti; kuvausrajoitukset tarkistettava; Nagad erotettava keskustan vanhasta asemasta. Hinnat, aukioloajat, nykyisten lentojen luettelot ja pysyvä venevuorokalenteri pois.

## 5. Kohdekartan rajattu selvitys — ei vielä hyväksyttyä 6–8 kohteen karttaa

Kartan tavoite on **vanha niemimaan keskusta**, aukioiden ja vanhan sataman ympäristö. Ei koko Djiboutin hallintoaluetta, lentokenttää, Doralehin uutta terminaalia tai ulompia saaria. Lopullisia `rajat`-numeroita ei anneta ennen riittävää hyväksyttyä kohdejoukkoa; satama–Hamoudi-pisteiden suorakulmio jättäisi aukioita/puistoja pois eikä korvaisi kohteiden omia pisteitä.

### N1 — 27. kesäkuuta -aukio / Place du 27 Juin — aukio, piste puuttuu

Todetut faktat (S1/Architecture, P4, P5): (1) vanhan keskustan aukio; (2) aikaisempi nimi Ménélik; (3) nimipäätös vaihtoi sen pitkään 27-Juin-1977-muotoon; (4) kahvilaterasseja; (5) matkamuistokauppaa; (6) arkadivaikutteinen ympäristö; (7) kujayhteys Mahamoud Harbille. Paikka kuuluu myöhemmin syntyneeseen kaupunkiin, joten ei nykyaukion ulkonäköä vuonna 1873. Alueen funktionaalinen aukio ei automaattisesti ole suojattu teos, mutta yksittäiset suojatut julkisivut/teokset eivät saa muuttua karttakohteeksi tämän avulla.

**Puute:** omat en/fr-WP-artikkeliyritykset `Place du 27 Juin` palauttivat 404 eikä omaa WD P625:tä löytynyt rajatussa haussa. Naapuribaarin tai väkivaltatapahtuman artikkelin koordinaattia **ei lainata**.

### N2 — Mahamoud Harbin aukio — aukio, piste puuttuu

Todetut faktat (P4, P5, P7, S1/Architecture): (1) aikaisempi nimi Place Rimbaud; (2) nykyinen virallinen kirjoitusasu P5:ssä **Mahamoud Harbi**; (3) matkailuviraston tekstissä myös Mahmoud-Harbi; (4) vanhan keskuksen toriseutu; (5) ympärillä kauppakujia; (6) P4:n mainitsemia koreja/laukkuja/helmikoruja myydään seudulla; (7) suuri minareetti on sen yhteydessä; (8) kunnan nykyisessä katujärjestelytiedotteessa on sama aukio. Historiallinen syntyaika on kaupungin synnyn jälkeinen; 1873-ulkonäköä ei tiedetä eikä nimi silloin ollut nykyinen.

**Puute:** kohteen oma WP/WD-koordinaatti ei löytynyt. Hakukoneen OSM/Mapcarta-naapurustopiste ei kelpaa WP/WD-pisteeksi eikä sitä käytetä. Hamoudin moskeijan pistettä ei lainata aukiolle. Ei minibusaseman nykyvuoroja P4:n perusteella.

### N3 — Hamoudin moskeija — rakennus, oikeusehdollinen

Oma piste **11.59236, 43.14608**, S4:n omat koordinaatit ja WD Q10856947 P625 sama. IRCICA:n oma piste on hieman eri: 11°35’32.63″N, 43°8’46.18″E; kartan sallittu piste otetaan WP/WD:stä, ei keskiarvoa.

Todetut faktat (S4, P1, P2): (1) aktiivinen moskeija Djiboutin kaupungissa; (2) toinen nimi **Gami al-Nur**; (3) nimetty rakennuttajansa Hamoudi Ahmedin/Haji Hamoudin mukaan; (4) tämä oli Jemenistä tullut kauppias, P2:n mukaan Hodeidahista; (5) rakennus kuuluu 1900-luvun alkuun; (6) IRCICA luokittelee tyylin Abbasidiksi; (7) P1:n alkuperäinen ja nykyinen käyttö moskeijana; (8) P1 ilmoittaa arkkitehdin **Unknown**. Vuonna 1873 tätä moskeijaa ei vielä ollut.

**Puute/raja:** P1:n 1906-vuosi ja S4:n 1906 / 1913–1920 -riita eivät oikeuta tarkkaan rakennusvuoteen. Rakennuttaja ei ole automaattisesti arkkitehti. P2 kertoo Hamoudin kuolleen 1930, mutta tämä **ei todista tuntemattoman suunnittelijan kuolinvuotta** eikä nykyisten osien oikeuksia. Ei hyväksyttyä suojatun rakennusteoksen kohdetta/kuvaa ennen B/D-oikeustarkistusta; FOP-täsmennys on Päätoimittajalla, ei oletettua poikkeusta.

### N4 — Vanha Djiboutin satama — kohdeluokitus avoin

Oma satama-artikkelin piste **11.60530, 43.13920**, S6 ja WD Q7231129. Se osoittaa satama-alueelle, **ei nimettyyn kävelysisäänkäyntiin, museoon tai yhteen historialliseen laituriin**.

Todetut faktat (S6/History, P3, S15): (1) kaupungin vanha merisatama; (2) suojainen ankkuripaikka oli sataman syntyyn liittyvä tekijä P3:ssa; (3) laivat täydensivät hiiltä S15:n aikalaiskuvassa; (4) satama palveli Etiopian sisämaan kauppaa; (5) vanha raideyhteys kulki satamakaupunkiin; (6) konttiliikenne tuli myöhemmässä kehitysvaiheessa; (7) Doraleh on eri terminaalipaikka; (8) nykyiset rakennukset ja laiturit eivät ole aikalaisartikkelin yksittäisiä vuoden 1873 rakennuksia. Vuonna 1873 tätä kaupungin rakennettua satamakokonaisuutta ei vielä ollut.

**Puute/raja:** `rakennus`-tyypin pitäisi nimetä aito rakennus/kohde; koko satama ei sellaisenaan ole yksi rakennus, eikä rakennettua konttialuetta naamioida luonto-tyypiksi. Pelkkä teknisen sataman nykyisyys ei tee siitä suojattua taideteosta, mutta kuvassa mahdollisesti näkyvät suojatut rakennukset/teokset tarkistetaan erikseen. Nykyistä kävijäpääsyä tai kuvauslupaa ei ole varmennettu. Ei vielä hyväksytty N-kohde.

### N5 — Lagarde-puisto — luonto, koordinaatit ja paikkafaktat puuttuvat

S1/Parks mainitsee julkisen puiston nimeltä Lagarde Park ja kutsuu sitä suurimmaksi. Superlatiivia ei paineta vain tällä yhdellä tuella. Oma en-WP-artikkeliyritys `Lagarde Park` 404; omaa P625:tä ei löydetty. Rakentamisaika, 1873-tilanne, istutusten historia ja 6–10 erillistä kohdefaktaa puuttuvat. **Ei karttaan tässä paketissa.**

### N6 — Amboulin puutarhat — luonto, kohteen oma piste puuttuu

S1/History kertoo alueen vanhoista taateliviljelmistä ja hedelmätarhoista. Tästä ei seuraa yhtä nykyistä yleisölle avointa puutarhaa, sen sisäänkäyntiä, nykyisten tarhojen ikää tai täsmällistä 1873-istutusluetteloa. Amboulin kylän **11.59000, 43.12250** ei kelpaa puutarhan pisteeksi. Myös `Ambouli River`-artikkeliyritys 404; joen/alueen sijaintia ei lainata puutarhalle. **Ei karttaan ilman nimettyä kohdetta, omia WP/WD-koordinaatteja ja kohdekohtaisia faktoja.**

### N7 — Vanha Djiboutin rautatieasema — rakennus, piste ja tekijä puuttuvat

S7/Stations erottaa kaupungin vanhan metriraideaseman Dire Dawasta ja Addis Abebasta; S14 kertoo vanhan aseman poistumisesta nykyisen matkustajaliikenteen käytöstä. Asema oli olemassa myöhemmässä S15:n aikalaiskaupungissa. Tarkkaa valmistumisvuotta ei paineta yhdellä S7-todisteella. Oma artikkeliyritys `Djibouti City railway station` ja fr `Gare de Djibouti` 404; lähteen oma asemapiste, suunnittelija, nykyiset osat, kävijäpääsy ja 6–10 kohdefaktaa puuttuvat. Nagadin pistettä ei käytetä vanhalle asemalle. **Ei vielä karttaan.**

### N8 — Al Sadan moskeija — rakennus, piste ja tekijä puuttuvat

S5 todistaa moskeijan olemassaolon kaupungissa, muslimien rukouspaikan käyttötarkoituksen ja infolaatikon Abbasid-tyyliluokituksen. Artikkelin 1912-vuosi ja 1 500 hengen luku saivat vain yhden lähdeketjun, joten ne eivät siirry pelaajatekstiin. WD Q16148632:ssa **ei P625:tä/P84:ää**, eikä omassa WP-artikkelissa ole koordinaattia. Tarkka 1873-kehys voidaan sanoa vain, että kuvattu rakennus sijoitetaan lähteessä myöhempään kaupunkiin; nykyisten osien ikä ja tekijäketju avoimia. 6–10 kohdefaktaa ei löytynyt. **Ei karttaan tässä vaiheessa.**

### Keskustakartasta rajatut luontoretket

- **Moucha**: oma WP-piste 11.71700, 43.18300, WD 11.72444, 43.19167; omien lähteiden ero kirjattu. P6:n koralli/mangrove/suojelufaktat sopivat K4:ään mutta saari on vanhan keskustan ulkopuolella. Ei numerosta valittua keskuspistettä karttaan.
- **Maskali**: oma WP-piste 11.70914, 43.16459, WD:n kaksi ristiriitaista pistettä yllä. Ei WP/WD/UNESCO-pisteiden sekoitusta. Saariretki, ei keskustakohde.
- **Tadjouran lahti**: WP-keskipiste 11.70000, 43.00000 koskee laajaa lahtea, ei Héronin/Siestan rantaa eikä kaupungin venelaituria. Ei laajaa vesialuepistettä keinotekoisesti keskustaan.
- **Héronin ranta**: nimi esiintyy kaupunkia koskevissa hakutuloksissa ja kuvakategorioissa, mutta omaa `Heron Beach`-artikkelia ei löytynyt (404). Tässä ei haettu Commons-kuvia. Koordinaatti, tarkka rajaus ja paikkafaktat puuttuvat; nykyisen hotellin rakennusta ei korvata luonnonrantakohteeksi.

## 6. Kysymysaiheet ja kolme tietoa

Viisi kysymysaihetta; C muotoilee neljä uskottavaa vaihtoehtoa, ei vastausta pisimmäksi eikä muita pelikaupunkeja vaihtoehdoiksi. Vihje ei saa toistaa ratkaisua.

1. **Taso 1:** minkä lahden etelärannalla kaupunki sijaitsee? Tadjouran lahti (S1/S11/S15).
2. **Taso 1–2:** mitä O1/S12:n jemeniittiläisessä ruokaperinteessä paahdetaan saviuunissa? Kalaa. Ei väitettä kaikkien ravintoloiden uunista.
3. **Taso 2:** mitä K4:n Moucha/Maskali-saarten kasvuympäristöä kuvataan korallien lisäksi? Mangrovea (P6, S1/Tourism).
4. **Taso 3:** mitä kauppareittiyhteyttä vanha Ethio-Djibouti-rata muodosti? Etiopian sisämaan yhteyden merisatamaan (S7/P3). Ei tarkkaa kilometrimäärää tai junan nykyvuoroja.
5. **Taso 2–3:** mikä nimivaihdos liittyy Mahamoud Harbin aukioon? Aikaisempi nimi Place Rimbaud (P4/P5). Ei nimettyä poliitikkoa elävän politiikan nostoksi.

Kolme tiedon aihetta:

- Djiboutin satamakaupunki on isoisän matkavuotta nuorempi, mutta lähellä ollut Amboulin kylä vanhempi (S1/S15/P4).
- Place du 27 Juin ja Mahamoud Harbin aukio tunnettiin aikaisemmin eri nimillä; nimipäätös erottaa molemmat aukiot (P4/P5).
- Nykyinen Nagadin matkustaja-asema ja keskustan vanha metriraideasema ovat eri kohteita (S14/S7); ei ajantasaisuutta lupaavaa aikataulutietoa.

## 7. Kuvatarpeet B:lle

**Ei valittu yhtään kuvaa eikä tehty Commons-hakuja.** B valitsee vain PD/CC0/CC BY/CC BY-SA, vähintään 1 200 px leveät kuvat alkuperäislähteen tekijä- ja lisenssitiedoin. Jokainen kuva katsotaan B/C/D:ssä. Täysi resepti: luettavat kasvot, lisätyt vesileimat/signeeraukset/leimat/kehykset, mainos/pakkauskuvat hylätään. Yksi tiedosto kerran kaupungissa.

| Paikka | Tarve / hakusanat | Sisältöraja |
|---|---|---|
| C1 | Djiboutin niemi/lahti, `Djibouti City panorama peninsula` | laaja kaupunkikuva; ei Doralehin kuvaa vanhan sataman varmaksi kuvaksi |
| C2 | vanhan keskustan laaja aukio, `Place du 27 Juin Menelik` | aukiotunnistus; yksittäinen suojattu julkisivu ei pääaiheeksi |
| C3 | kaupunkiranta, `Djibouti waterfront beach` | oikea ranta; ei nimeä Héron/Siesta ilman alkuperäistä paikkatodistetta |
| K1 | Place du 27 Juin vanha/nykyinen | nykyisten rakennusosien oikeudet B:ssä, eikä kuvaa vuodelta 1873 |
| K2 | torikujat / paikallinen kori, `Djibouti market basket` | ei luettavia kasvoja; käsityön tekijä ja suojattu teos erikseen; ei väärän maan esinettä |
| K3 | paahdettu kala tai saviuuni, `Djiboutian cuisine Yemeni fish` | kuvateksti vain oikeasta ruoasta; yleinen kuva erotettava Djiboutissa kuvatusta |
| K4 | Moucha/Maskali-mangrove tai korallisaari | alkuperäinen saaripaikka tunnistettava, ei hotellin allasta |
| H1 | varhainen Djiboutin kaupunkikuva / vanha kaupunkikartta | historiallinen päiväys; ei käsitellä myöhempää kuvaa 1873-kuvana |
| H2 | Amboulin tarha / taatelipalmu | jos yleinen lajihavainne, sano se; ei kyläpisteen lainaa tarhan sijainniksi |
| H3 | vanha asema / metriraiteinen paikallinen rata | ei Nagadin uutta rakennusta vanhana; suunnittelijan oikeusketju B:ssä |
| H4 | vanha satama, höyrylaiva / hiilihuolto | kuva voi havainnollistaa toimintoja vain oikealla paikalla ja aikakaudella |
| Matkailijalle | tuore maltillinen pysty, luonnonranta/mangrove tai ruokailun esine | suhde 0,60–0,85, yksi paikallinen aihe; ei luettavia kasvoja/suojattua pääteosta |
| O1–O5 | vähintään kolme tuoretta kuvaa: luonto, ruoka, käytännön paikallinen ympäristö | korkeintaan kaksi kuvatonta jaksoa; ei historiallista kuvaa nykyoppaaseen |
| N1–N8 | vasta hyväksytylle kohteelle oma kuva | tämä A ei vielä hyväksy N-listaa; puuttuvaa karttapistettä ei korvata kuvan GPS:llä |
| Valokuva | yksi lähteistetty vanha/nykyinen kaupunkinäkymä | kuvaa vastaava kysymys, oikea vuosikehys ja paikka |
| Ennen–nyt | vain jos todellinen isoisän ajan PD-vedos ≥1 200 px löytyy | nykykaupunkia ei ollut 1873; myöhempi siirtomaapostikortti ei ole isoisän aikainen |

Hamoudi/Al Sada -rakennuskuvia ei varata ennen oikeusketjun selvitystä. Julkisen aukion historia voi olla aiheena ilman että tuntemattoman suojatun rakennuksen kuva oletetaan sallituksi. Commons-lisenssi kuvaajalta ei yksin todista kuvassa olevan teoksen suoja-ajan päättymistä.

## 8. Ristiriidat, epävarmat ja ratkaisut

1. **Kaupungin perustaminen:** S1/S2/S15 sanovat 1888, P4 laajemmin rakentuneen noin 1886–1900. S1 viittaa S15:een, joten niitä ei lasketa kahdeksi itsenäiseksi perustamisvuoden todisteeksi. Julkaistava muoto **1800-luvun lopulla / 1880-luvun lopulla**, 1873: kaupunkia ei vielä ollut.
2. **Pääkaupungin siirto:** S1/S2/S15 1896, S3 1892, O1 perustamisesta kolme vuotta myöhemmin. Ei valita yhtä hiljaa. Käytetään **1890-luvulla**, nykyinen asema pääkaupunkina erillisenä tosiasiana.
3. **Hamoudi:** IRCICA 1906, WP huomauttaa myös 1913–1920-versioista ja luotettavan tarkan vuoden puutteesta. Julkaistava **1900-luvun alkupuolella**. IRCICA:n arkkitehti Unknown; kauppias/rakennuttajan kuolinvuosi ei ole suunnittelijan kuolinvuosi.
4. **Satamaluvut:** S1/Economy sanoo 2 500 laivaa päivässä, S6 sanoo vuosittain. Molemmat jätetään pois, samoin vanhojen kauppaosuuksien prosentit ja kustannusluvut.
5. **Sääkausi — hylätty:** S1:n 1991–2020-taulukon Source 1 nimeää HKO:n lämpö-/sadeviitteeksi, mutta sama sivu kertoo HKO-lähteen olleen arkistoitu 17.5.2014 ja luettu 15.10.2012. NOAA-viite on nimeltään **Djibouti Climate Normals 1961–1990**, luettu 13.1.2015. Source 2 DWD koskee sadepäiviä 1968–1986 ja kosteutta 1953–1970. Ennen 2014 arkistoitu lähde ei vahvista loppuvuoteen 2020 ulottuvaa valmista normaalisarjaa. Pääsessio tarkisti alkuperäisen HTML:n ja siirsi aiemman `saa.json`-tiedoston pois käytöstä, byte-exact-arkistoon `valiaikainen/e07/saa-lahdehylatty/djibouti/`. **C:ssä null, ei vanhan poiminnan asteita/mm-lukuja.** Tämä ei muuta alkuperäisen työkalun algoritmia eikä keksi oikeaa kautta.
6. **Sääprovenienssin täsmätodiste:** `valiaikainen/djibouti-A/city.html`, revisio 1376655946; sen `city.txt`-poiminnassa otsikko rivi 329, Source-rivit 470–471, HKO-viite 692, NOAA 694. S2:n fr-sivun eri 1953–2021-taulukkoa ei käsin kopioida uudeksi sääksi.
7. **Moucha/Maskali:** WP, WD ja UNESCO antavat eri pisteitä; UNESCO:n N11 13 00 -piste poikkeaa myös selvästi saarten pohjoisemmasta sijainnista. Saaria ei lisätä keskuskarttaan eikä lasketa alueen keskipisteitä omiksi kohdepisteiksi. S9:n saaripituusluvut ovat keskenään ristiriitaisia, tarkat mitat pois.
8. **Nimet:** P5:n virallinen Mahamoud Harbi vs P4:n Mahmoud-Harbi/P7:n Mahmoud Harbi. Pelaajalle voidaan käyttää **Mahamoud Harbin aukio**, alias taustaan; sama paikka tunnistetaan alkuperäisellä nimenvaihdolla. Place du 27 Juin -nimen 1977 ei yksin todista nimipäätöksen ajankohtaa.
9. **Väestö/laajuus:** kontekstin kolmelle kunnalle annettu vuoden 2024 summa erotetaan Wikipedian muista vuosista/taajamasta. Ei tarkkaa uutta väestöväitettä ilman erillistä nykyistä alkuperäistarkistusta.
10. **Karttakohteiden vähimmäismäärä:** kahdelle paikkapisteelle löytyi WP/WD-tuki, mutta mikään ei vielä täytä kaikkia kohdeportteja. Kuuteen päästään vain arvatuilla pisteillä, väärällä kohdeluokalla tai keskustan ulkopuolisilla saarilla; näin ei tehdä. Pieni kaupunki -poikkeusta ei sovelleta tähän suurkaupunkiin.
11. **Ruokaväitteet:** S12 sisältää useita citation needed -kohtia. Tarkat annosmäärät, kansallisruokasuperlatiivi ja kaikkia asukkaita koskeva ateriarutiini pois. Jemeniittiläinen saviuuni saatiin kaupungin konkreettisesta O1-ruokapaikkamerkinnästä, mutta yrityksen tämänhetkistä ruokalistaa ei luvata.
12. **Nykyjuna:** S14:n palvelukommentti pysähtyy vuoteen 2017 ja O1:n junatieto on vuodelta 2019. Käytetään aseman nimeä/vanhan ja uuden eroa, ei lipunmyyntiä, lähtötiheyttä tai matka-aikaa ajantasaisena palveluna.

## 9. Poisjätetyt aiheet ja valmistumisen puutteet

- Nykyisten tukikohtien kilpailu, sataman oikeuskiista, maan nykyjohto, vaalit, terrorismi ja nykyrikollisuuden kertomukset pois. Opas säilyttää O2:n välttämättömät nykyiset rajoitukset lyhyesti.
- Hamoudin perintöriidan rikos-/orjakauppayksityiskohdat ja kolonialistiset henkilöhierarkiat pois tästä lehdestä; rakennuttajaa ei esitetä sankarina eikä hänen vaurauttaan päätellä ansaituksi.
- People’s Palace, uusi Abdülhamid II -moskeija, uudet korkeatalot ja hotellien arkkitehtuuri eivät toimi tämän kartan historiallisina suojavapaina rakennuskohteina. Tekijöiden suoja-aikoja ei saatu valmiiksi. **Modernius yksin ei ole kielto**, vaan suojattu teos/tekijäketju on erillinen tarkistus; tuntemattomia ketjuja ei hyväksytä.
- Hamoudi/Al Sada eivät ole tässä valmiiksi hyväksyttyjä rakennuskohteita; arkkitehdin tietoa ei arvata rakennuttajasta.
- Doraleh, Nagad ja lentoasema sopivat nykyiseen kulkuoppaaseen, mutta eivät vanhan keskustan kartan määrätäytteiksi. Lentoaseman sotilastoiminta pois.
- Assal-järvi, Day-metsä ja koko maan geologia eivät kuulu keskustakarttaan; paikallisen saariretken K4 on rajattu erikseen.
- Rimbaudin oma Djibouti-vierailu ei seuraa aukion vanhasta nimestä; ei sellaista vierailutarinaa ilman lähteitä.
- Kalenteri-/lento-/juna-/veneajat, hinnat ja aukioloajat pois. Kuvat eivät ole tilauksia kuvageneraattorille.
- Konteksti: `maalehti: null`, `lahiKaupungit: []`, `lahiNostot: []`. Kevyen kuvauksen nykyiset 27 Juin, Hamoudi, Ryad ja Doraleh tunnetaan; uusi paketti ei toista sitä sanasta sanaan, vaan nostoissa ovat nimenvaihto, torin toiminta, kalakeittiö, saariluonto ja historian eri vaiheet.

**A:n sulkemisehdot:** hyväksyttävät historiallisen ytimen WP/WD-pisteet ja kohdefaktat 6–8 kohteelle; rakennusaiheiden oikeusketju; sataman kohdeluokka/nimetty rakennus; mahdollisten puutarhojen nimen/pisteen varmistus. Sää voi jäädä nulliksi. Tämä lähdepaketti on käyttökelpoinen B/C-valmisteluun, mutta **A partial** eikä edistymislaskennan valmis A-vaihe.
