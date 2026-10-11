# Banjul — faktapohja, vaihe A

`banjul`, `GMB`, `e04`; koottu 11.10.2026. Konteksti ja valmis saa.json luettu. Sovelletaan samoja ohjeita kuin Rabatin/Nouakchottin/Praian A:ssa: AGENTS.md, CODEX.md, PILVIOHJE 3, 4, 7, 13 ja LISÄSÄÄNTÖ, lehtityöresepti ja Nairobi-mallin rakenne. Ei git-, pelitiedosto-, Commons-haku- tai muistityötä. Tämä on kirjoittajan lähdeaineisto, ei valmis kaupunki tai kuvan oikeushyväksyntä.

Omistajan hyväksymä lähdekanavapoikkeus: robots-sallitut tavalliset Wikipedia-/Wikivoyage-sivut estettyjen API-polkujen sijasta. Wikidata EntityData sallittu. Kaikki omat pyynnöt ja uudelleenohjaukset tarkistettiin `sallittu_haku.py`:llä. Tarkat vuodet, mitat, määrät ja välimatkat joko kahdesta riippumattomasta lähteestä tai pois/pyöristys/vuosisata. Koordinaatit, lähdeasiakirjan päiväykset ja säätaulukon metatiedot säilyvät jäljitettävyyttä varten.

## 0. Luetut lähteet ja 1873-kehys

Hakupäivä kaikissa 11.10.2026. Alkuperäiset sivut, EntityData ja tekstipoiminnat: `/Volumes/NAS-Homes/samireivinen/Matkakirja-arkisto/paakaupungit-codex/sessio-72-20261011/valiaikainen/banjul-A/`. Verkkoloki ylemmän `valiaikainen`-hakemiston `sallitut-haut.jsonl`.

| Tunnus | Otsikko, kieli ja luetut osiot |
| --- | --- |
| B1 | [Banjul](https://en.wikipedia.org/wiki/Banjul), en: johdanto, Etymology, History, Economy, Transport, Attractions. Climate vain taustan vertailuun, luvut saa.json:sta. Nykyhallinto-/vallankaappaussisältö pois. |
| B2 | [Albert Market](https://en.wikipedia.org/wiki/Albert_Market), en: koko lyhyt kohdekuvaus ja koordinaatti. Artikkelin lähde-/notability-varoitukset huomioidaan; ei keksittyjä myyntitilastoja. |
| B3 | [Gambia National Museum](https://en.wikipedia.org/wiki/Gambia_National_Museum), en: History, Museum Description ja Administration. Ei nykytaidetta/henkilöitä, määrät ja rankingit pois. |
| B4 | [Tanbi Wetland Complex](https://en.wikipedia.org/wiki/Tanbi_Wetland_Complex), en: Geography, Flora and habitat, Fauna, Human activities. Climate change -ennusteluvut eivät tähän lehtisisältöön. |
| B5 | [Ramsar Sites Information Service: Tanbi Wetlands Complex](https://rsis.ramsar.org/ris/1657), en: virallinen Overview ja paikkametadata. Viimeisin RIS-tieto sivulla vuodelta 2006, julkaisu 2.2.2007; historiallinen aluekuvaus, ei nykyhetken käyntipalvelu- tai lajilaskentalupaus. |
| B6 | [Gambia River](https://en.wikipedia.org/wiki/Gambia_River), en: johdanto, Geography, Crossings ja Bolongs sekä infolaatikon **Mouth**-koordinaatti. Lähdepiste Fouta Djallonissa on eri asia. |
| B7 | [Banjul, Wikivoyage](https://en.wikivoyage.org/wiki/Banjul), en: Understand, Get in, Get around, See, Eat ja Go next / Barra. Monet ravintola-/resortit ovat muualla Suur-Banjulissa, eivät saarikaupungissa. Ei hintoja, aikatauluja tai nykyisiä pikkutarkkoja lauttalupauksia. |
| B8 | [National Centre for Arts and Culture: Cultural heritage](https://ncac.gm/cultural-heritage/), en: National Museums. Virallinen täydentävä ensisijainen lähde rakennuksen vanhoihin käyttötapoihin ja museon tarkoitukseen. |
| B9 | [National Centre for Arts and Culture: Oral Archives — Research and Documentation](https://ncac.gm/oralarchieve/), en: A brief history ja kokoelman kuvaus. Ensisijainen lähde arkistointinostoon; ei julkaisuoikeutta tallenteisiin. |
| B10 | [Gambian cuisine](https://en.wikipedia.org/wiki/Gambian_cuisine), en: johdanto, Dishes ja Beverages. Oppaan maatausta, ei Banjulin omiksi keksinnöiksi. |
| B11 | [Banjul International Airport](https://en.wikipedia.org/wiki/Banjul_International_Airport), en: johdanto ja infolaatikon IATA. Sijainti Yundumissa erotetaan Banjulin saarikaupungista. |
| B12 | [UM: Gambia, matkustustiedote](https://um.fi/matkustustiedote/-/c/GM), fi: päiväys 24.8.2026, turvallisuustaso, liikenne ja käytännön varovaisuus. Ei terveyslukuja, poliittisia aiheita tai rikostapauksia pelitekstiin. |
| WD1 | [Banjul Q3726 EntityData](https://www.wikidata.org/wiki/Special:EntityData/Q3726.json): P625, P17, pääkaupunkiasema ja sitelinkit. |
| WD2 | [Albert Market Q325000 EntityData](https://www.wikidata.org/wiki/Special:EntityData/Q325000.json): torin oma P625. |
| WD3 | [Tanbi Wetland Complex Q1253433 EntityData](https://www.wikidata.org/wiki/Special:EntityData/Q1253433.json): kosteikkoalueen P625. |
| WD4 | [Gambia River Q160819 EntityData](https://www.wikidata.org/wiki/Special:EntityData/Q160819.json): P625:n kaksi kohdistusta, P403. Valittu joen suun qualifier Q1233637; sen EntityData vahvistaa nimen **river mouth**. Yläjuoksun lähdepistettä ei käytetä. |

BirdLifen sallittu Tanbi-factsheet-sivu haettiin, mutta staattinen sivu jäi latauspohjaksi ilman varsinaisia paikka-/lajitietoja. Sitä ei käytetä ajantasaisena lajivahvistuksena. B4:n linnustotieto säilyy artikkelin lähdeviitteineen, ilman tarkkoja määriä tai uhanalaisuusluokan kopiointia.

### Olemassa olevan aineiston tarkistus

Kontekstissa ei ole Gambian maalehden nostoja. Maan perustiedoissa jo kuvattu maantiede, itsenäistyminen, kielet ja maapähkinät ovat tausta, eivät uudet kaupungin nostotarinoiden aiheet. Kontekstin nykyistä politiikkaa ei siirretä tähän lehteen.

Lähinosto **Saloumin suisto** on eri paikka: sen puisto-/biosfääri-/maailmanperintö- ja pinta-alatarinaa ei toisteta Tanbin nimellä. Tässä Tanbi rajataan Banjulin rantaan, vuorovesikanaviin, rantaa tasaaviin tehtäviin ja paikalliseen työhön.

Read-only-haussa `js`/`docs` löytyi Banjulin kevyen pisteen lisäksi vanha viiden kohteen karttapohja (`js/packs/maakartat.js`). Sen Arch 22 ja moderni kansalliskokous eivät kelpaa tämän tilauksen uusiksi teos-/kuvakohteiksi. Vanhan kartan OpenStreetMap-pisteitä ei käytetä uusina WP/WD-todisteina. Radio Syd / Radio Gambia -tarinaa ei tässä checkoutin js/docs-haussa löytynyt; radiosisältöä ei kirjoiteta uuteen lehteen. B9:n suullisen perinteen arkisto ei ole radiolähetin- tai merirosvoradiotarina.

### 1873

Banjul **oli olemassa** isoisän matkavuonna 1873. Nykyisen kaupunkiasutuksen brittiläinen kauppa-/vartioasemavaihe on 1800-luvun alkupuolelta, ja paikan tuolloinen kaupunkinimi oli **Bathurst** (B1 History). Kaupungin katuja järjestettiin ruutumaisen kaavan pohjalta, ja alueelle muutti ihmisiä eri taustoista. Siirtomaa-aika tapahtumana, ei brittiläinen sankarikehys.

Albertin tori perustuu 1800-luvun puolivälin rakennus-/torivaiheeseen, joten se oli jo ennen matkavuotta (B2). Jokisuu ja mangroverannat ovat luonnollista ympäristöä, mutta nykyisiä laitureita, lauttoja, suojelualueen rajoja tai käyntipalveluja ei sijoiteta automaattisesti vuoteen 1873. Banjulin kansallismuseota ja suullisen perinteen arkistoa ei vielä ollut; museotalon rakennusvaihe suhteessa vuoteen 1873 jäi vahvistamatta (B3; B8; B9).

Kaupungin nykyinen nimi ja nykyiset Arch 22-/kansalliskokousrakenteet ovat myöhempiä. Ei isoisän reittiä, merimatkaa, ostosta, päiväkirjamerkintää tai sitaattia.

## 1. Perusfaktat

- **Nimi:** Banjul; vanha kaupunkinimi Bathurst, käytössä siirtomaa-aikana (B1). Vaihdon täsmällinen vuosi ei pelaajatekstiin ilman riippumatonta vahvistusta.
- **Etymologia:** B1 antaa useita selityksiä: henkilöön liittyvä perinnetarina ja mandinkan köysikuitua tarkoittavaan ilmaukseen liittyvä teoria. Ei yhtä varmana esitettyä selitystä.
- **Asema:** Gambian pääkaupunki (B1; WD1).
- **Sijainti:** St Mary's Island / Banjul Island Gambia-joen suulla Atlantin äärellä (B1 johdanto; B6 Mouth). Ei sekoiteta yläjuoksun saarille tai koko Suur-Banjulin rantalomakeskusten alueeseen.
- **Kaupungin ja metropolialueen ero:** saarikaupunki Banjul ja Kanifingin kunta yhdessä kuuluvat Suur-Banjuliin, mutta kaupungin väkiluku on eri asia kuin tämän kokonaisuuden väkiluku (B1; konteksti).
- **Väestö:** kontekstin **26 461 vuonna 2024** tarkoittaa Banjulin kaupunkia/LGA:ta. Pelaajalle **”noin 26 000 asukasta Banjulin kaupungissa (2024)”** tai väestö pois. Suur-Banjulin luku ei tämän saarikaupungin väestö. Wiki ja konteksti voivat nojata samaan laskentaan, joten sama tarkka luku ei vielä ole kaksi riippumatonta lähdettä.
- **Meren/joen yhteydet:** sillat yhdistävät saarta länsipuolen mantereeseen, lautta ylittää jokisuuta pohjoisrannan Barraan (B1; B6 Crossings; B7 Go next).
- **Pallo:** konteksti sellaisenaan 13.4531, −16.5775.
- **Wikiavain:** `Banjul`.
- **Ambience-ehdotus:** `satama`, kaupungin merellisen kaupankäynnin ja lauttaliikenteen perusteella.

## 2. Kansi ja neljä nostoaihetta

**Johdantoehdotus:** Banjul on pieni saarikaupunki suuren jokisuun äärellä. Torikadut, museon muistitieto ja joen ylittävä lautta kertovat paikasta, joka on sekä pääkaupunki että yhteyksien risteys. (B1; B2; B6; B8–B9.)

Artikkeli-intro muodostuu pääkaupunkiasemasta, St Mary's -saaresta, Gambia-joen ja Atlantin kohtaamisesta, 1800-luvun kaupunkikehityksestä, Bathurst-nimestä, kaupungin ja Suur-Banjulin erosta sekä torista ja rannan luonnosta. Ei tarkkoja perustamis-/nimenvaihtovuosia tai Saloumin suistotarinaa.

### K1 — Albertin nimi, paikallinen arki

Wiki `Albert Market`; B2 koko kohdekuvaus, B7 Understand / See.

1. Albert Market on Banjulin katutori.
2. Se sijaitsee Liberation Avenuella.
3. Vanha virallinen nimi oli Royal Albert Market.
4. Torivaihe ajoittuu 1800-luvun puoliväliin.
5. Nimi tulee kuningatar Victorian puolisosta prinssi Albertista.
6. Torin tiheä käytävä-/kojuverkosto kuuluu saarikaupungin kaupankäynnin arkeen, B7:n kuvauksen mukaan.
7. Historiallinen nimi ei kerro kojunpitäjien nykyisestä taustasta tai tavaravalikoiman jokaisen osan iästä.

Ei ”Afrikan suurin”, päivittäisiä asiakas-/kojumääriä, tarkkaa rakennusvuotta tai väitettä kaikkien nykyisten katosten alkuperäisyydestä. Kuvassa oikea Albert Market eikä moderni mainos/teos tai tunnistettava lähikasvo.

### K2 — Pääkaupunki on pienempi kuin sen nimi kartalla

Wiki `Banjul`; B1 johdanto, B6 Crossings, B7 Understand.

1. Varsinainen Banjul on St Mary's -saarella.
2. Suur-Banjuliin sisältyy myös Kanifingin kunta mantereella.
3. Banjulin kaupungin ja laajemman taajaman/alueen väestöluvut eivät ole sama mittari.
4. Saari kytkeytyy länteen siltojen kautta.
5. Moni matkailijan majoitusalue sijaitsee mantereella, ei pienessä saarikaupungissa (B7).
6. Pääkaupungin Albertin tori ja hallinnollinen ydin kuuluvat saarikaupunkiin.

Kulma on maantieteellisen arkikuvan selventäminen, ei uutta hallinnollista laskentalukua tai maalehden koko Gambian muototarinaa. Ei resortia nimettynä Banjulin historiallisen ytimen kohteeksi.

### K3 — Lautta vaihtaa joen rantaa

Wiki `Gambia River`; B1 johdanto, B6 Crossings, B7 Go next / Barra.

1. Banjulin ja Barran välillä on jokisuun lauttayhteys.
2. Lautta kuljettaa matkustajia ja ajoneuvoja.
3. Barra sijaitsee joen toisella rannalla.
4. Pohjoisrannan kautta jatkuu maantieyhteyksiä Senegalin suuntaan.
5. Ylitys on joen suun alueella, ei samalla kuin yläjuoksun Senegambia Bridge.
6. Laivaliikenne, pienveneet ja lautta ovat erilaisia joen käytön muotoja.

Ei vuoroväliä, matka-aikaa, nykyisen lautan nimeä/kapasiteettia, hinnastoa tai varmaa jokapäiväistä aikataululupausta. Modernin sillan suojattu arkkitehtuuri ei nosto-/kuvakohteeksi.

### K4 — Muisti ei ole vain paperia

Wiki-tausta `Gambia National Museum`; ensisijainen B9 A brief history / kokoelman kuvaus, B8.

1. NCAC:n suullisen perinteen arkisto kokoaa haastatteluja ja muita ääni-/kuvatallenteita.
2. Arkistointityö käynnistyi myöhäisellä 1900-luvulla.
3. Aineisto käsittelee Gambian lisäksi laajempaa Senegambiaa.
4. Vanhojen taitajien kertomuksia ja perinteitä pyrittiin säilyttämään, koska niitä ei voi säilyttää pelkkien kirjallisten tekstien tavoin.
5. Kokoelmissa on historiaa, laulua, seremonioita ja paikallisten yhteisöjen tietoa.
6. Arkisto ja museo liittyvät saman kulttuuriperintöorganisaation toimintaan.
7. Talteen ottaminen ei anna meille lupaa soittaa tai jäljentää suojattua tallennetta.

Ei Radio Syd -tarinaa, radiosignaalin kattavuutta, tallenteiden tarkkaa määrää, muusikon suojattua kappaletta tai nykyistä poliittista haastattelua. Kuvaksi dokumentoitu arkistointi/yleinen tekninen väline selitteellä, joka ei väitä sen olevan NCAC:n alkuperäinen laite.

## 3. Teemasivu: luonto

Vakioaihe `luonto`, nimi **”Vuoroveden reunalla”**.

**Johdantoehdotus:** Banjulin länsi- ja etelärannoille levittäytyy Tanbin kosteikko. Vuorovesikanavat, mangrovet ja paikallinen työ muodostavat rannan, jonka merkitys näkyy myös kaupungin vedenliikkeessä. (B4 Geography / Flora / Human activities; B5 Overview.)

### L1 — Metsän välissä kulkee vettä

Wiki `Tanbi Wetland Complex`; B4 Geography / Flora and habitat, B5 Overview.

1. Tanbi kuuluu Gambia-joen suun vuorovesivaikutteisiin kosteikkoihin.
2. Se ulottuu St Mary's -saaren länsipuolisille rannoille ja Banjulin lounaispuolelle.
3. Mangrovekasvillisuus on alueen hallitseva luontotyyppi.
4. Metsän lomassa on vuorovesikanavia, paikallisesti bolongs.
5. Alueeseen kuuluu myös laguuneja, suolamarskeja ja liejuisia estuaaripintoja.
6. Kuivemmilla reunoilla kasvillisuus muuttuu erilaiseksi kuin vesivaikutteisella mangroverannalla.

Ei ”vuorovesi kahdesti päivässä” -lukuväitettä, mangrovien prosenttia tai Saloumin suiston biosfäärilukua. Laji kuvatekstiin vain tunnistettuna.

### L2 — Rantametsä tasaamassa vettä

B5 Overview ensisijaisesti, B4 Flora and habitat.

1. Tanbi vastaanottaa virtaavaa vettä ja sadetta.
2. Alue osallistuu rannan vakauttamiseen.
3. Kosteikko pidättää/siirtää sedimenttejä ja ravinteita.
4. Se liittyy pohjaveden täydentymiseen ja tulvaveden hallintaan.
5. Ramsar-kuvaus kutsuu sitä Banjulin hydrologiseksi puskurialueeksi.
6. Mangrovien varjostama vesi on myös katkarapujen lisääntymisympäristöä.

Tehtävät ovat lähteen sanoittamia, eivät omia syyselityksiä. Ei lupausta täydellisestä tulvasuojasta tai arviota tulevasta vedenkorkeudesta. Ei katkarapujen tarkkaa määrää eikä nykyistä taksonin nimeä varmennuksetta.

### L3 — Osterit kuuluvat myös työpäivään

B4 Human activities, B5 Overview; B10 johdanto ruokataustana.

1. Tanbin perinteisiin elinkeinoihin kuuluu pienimuotoista kalastusta.
2. Alueelta kerätään myös ostereita.
3. B4 kertoo Jola-naisten keräävän, paahtavan ja myyvän ostereita.
4. Kosteikon reunoilla harjoitetaan myös puutarhaviljelyä ja riisinviljelyä.
5. Metsää, vettä ja elinkeinoja ei kuvata toisistaan erillisiksi maailmoiksi.
6. Paikalliset kerääjät ovat oman työnsä toimijoita; ei eksoottista tai kurjuutta korostavaa kuvastoa.

B5 on historiallinen RIS-kuvaus: ei väitetä jokaista työvaihetta nykyhetken päivittäiseksi luvuksi. Ei teoreettista korjuumäärää, kaikkia sukupuolia koskevaa yleistystä, tuntemattoman kuvan osterilajia tai ruokaturvallisuuslupausta.

### L4 — Lintu käyttää muutakin kuin maan rajoja

B4 Fauna, jonka lähdeviitteenä BirdLife/IBA; B5 tukee alueen luonnollista arvoa. BirdLifen nykyinen tietosivu ei paljastanut lajitaulukkoa, joten tarkat nykyiset määrät/tilaluokat pois.

1. Tanbissa tavataan kosteikkojen ja mangroverantojen lintuja.
2. Osa on alueella paikallisesti pesivää linnustoa.
3. Pohjoisen talven aikana alueella tavataan myös palearktisia muuttolintuja.
4. B4 mainitsee esimerkiksi sääksen ja mustapyrstökuirin tällaisina muuttolintuina.
5. Linnut käyttävät samaa vesien ja rantakasvillisuuden kokonaisuutta kuin muu kosteikkoluonto.
6. Kohde on tunnistettu tärkeäksi lintujen alueeksi, mutta ei anneta tarkkaa lajimäärää tai ”maailman paras” -väitettä.

Kuvan sääksi/mustapyrstökuiri täytyy tunnistaa. Muussa maassa otettu lajikuva voi havainnollistaa lajia, mutta selite ei väitä valokuvaa Tanbissa otetuksi. Käyntipäivän lajihavaintoa ei luvata.

**Minitehtävä:** miten paikallisesti kutsutaan Tanbin vuorovesikanavia? Oikea: bolongs. Vaihtoehdot: bolongs / griotit / dromedaarit / lazaretot. Vastaus L1:stä; ei kaupungin viisaan samaa kysymystä.

## 4. Opas

### Jakso 1 — Perille ja liikkeelle

- Lentoasema **Banjul International Airport / Yundum International (BJL)** sijaitsee Yundumin alueella, ei vanhan saarikaupungin keskellä (B11).
- Lentokentän nimi ei tarkoita, että kaikki majoitusalueet olisivat Banjulissa: monet rannikkohotellit ovat mantereella (B7).
- Kaupungissa on takseja ja muuta paikallisliikennettä. UM suosittelee erityistä varovaisuutta liikenteessä; opas ei suosittele halvinta minibussivaihtoehtoa eikä kopioi Wv:n hinnastoa (B12 Liikenne).
- Banjul–Barra-lautta on joen ylitystapa (B6; B7), mutta aikataulut ja kulkujärjestelyt tarkistetaan matkaa varten erikseen.

### Jakso 2 — Torikadut

- Albert Market sijaitsee Liberation Avenuella (B2).
- Tiheä koju-/käytäväverkosto on nykyistä asiointitilaa, ei pelkkä nähtävyyslavaste (B7).
- Toriin liittyvä prinssi Albertin nimi kuuluu siirtomaa-ajan historiaan, nykyinen kaupankäynti paikalliseen arkeen.
- Pidä tarpeettomat arvoesineet poissa esillä ja hoida kuljetus pimeän varalta (B12). Ei rikostapauksia tai ihmisten leimaamista oppaaseen.

### Jakso 3 — Museo ja rannan luonto

- Kansallismuseo ja NCAC säilyttävät esineellistä ja suullista kulttuuriperintöä (B3; B8–B9).
- Talon aiempiin käyttötapoihin kuuluvat Bathurst Club, British Council, lainsäädäntökokouksen tilat ja kirjasto, eri aikoina (B8). Rakennuksen tarkka valmistumisaika ei selvinnyt.
- Tanbi kuuluu Banjulin rannan laajempaan kosteikkoluontoon; tällä aineistolla ei osoiteta yksittäistä vierailuporttia tai retkien palveluntarjoajaa (B4; B5).
- Jokisuun ja rantojen virtaukset voivat olla voimakkaita; B7 ei tue vapaan uintipaikan lupausta. Vene-/luontokäynnin käytännön olot tarkistetaan paikallisesti.

### Jakso 4 — Kalaa ja riisiä

- Kalalla, riisillä ja maapähkinällä on paikka gambialaisessa ruokaperinteessä (B10).
- Benachin on eri aineksia yhdistävä riisiateria; domoda maapähkinätahnaan pohjaava ruoka, johon voi kuulua lihaa tai kalaa (B10 Dishes).
- Banjulin opaslähde kuvaa kalaa ja mereneläviä kaupungin ruokatarjonnassa (B7 Eat).
- Ostereita kerätään Gambian jokialueilta ja Tanbista, mutta yksittäisen annoksen alkuperää tai turvallisuutta ei päätellä siitä (B4; B10).
- Tämä on maan ruokatausta, ei Banjulissa keksityn kansallisruoan väite. Maapähkinöiden tuotanto-/vientitarinaa ei uusita maataustasta.

### Jakso 5 — Milloin kannattaa tulla

Valmis `paakaupungit-pilvi/e04/banjul/saa.json` luettu, ei muutettu. Pääsession alkuperäinen `tyokalu.mjs saa` -ajo käytti hyväksyttyä sallitun lähdesivun verkkosovitusta; A ei tehnyt omaa ilmastoriviä.

- Artikkeli **Banjul**, revisio **1377725086**, luettu **11.10.2026**.
- Taulukko **Climate data for Banjul (1991-2020)**; normaalikausi **1991–2020**.
- Lähderivi **Source 1: World Meteorological Organization | Source 2: Deutscher Wetterdienst (humidity and sun)**. Kosteus-/auringonpaisterivi ei korvaa lämpötila-/saderiviä.
- `keskilampo`: **Daily mean °C (°F)**, ei ylä-/alarivistä käsin laskettu keskiarvo. `sade`: **Average precipitation mm (inches)**. Taustan vuosisade **910 mm**.
- Kaupungille tallennettu lat/lon 13.45/−16.58 ei ole erikseen varmennettu lentoaseman mittauspiste. Taulukon nimi säilytetään, eikä A päättele station historiaa muista taulukoista.
- Kaikki ilmastoluvut vain tästä saa.json:sta, pyöristettyinä, ilman `tausta`a pelin sääolioon. Ei UM:n yleisiä maan ilmastolukuja, Wv-kaaviota, ennusteita tai vuoden 2100 skenaariota. Leipätekstin ilmastolauseessa ei lähdemainintaa.

**Luvuista tuettu kuvaus:** päivän ylimpien normaalit pysyvät noin 32–34 asteessa vuoden mittaan; alkuvuoden yön alimmat ovat noin 18–20 astetta. Sateet painottuvat kesä–lokakuuhun, ja elo–syyskuu on normaalirivillä erityisen sateinen. Kuivempi vuodenaika on toimituksellinen matkailuarvio, ei turvallisuus- tai säävarmuuslupaus.

### Parasta (5)

1. **Albertin tori (3 tähteä):** paikallinen katukauppa ja historiallinen paikka (B2; B7).
2. **Gambian kansallismuseo (2):** esineiden ja dokumenttien kulttuuriperintö (B3; B8), ei tiettyjen näyttelyiden aukiololupaus.
3. **Jokisuun näkymä (2):** Gambia-joen ja Atlantin kohtaaminen saarikaupungin reunalla (B1; B6), ei uimapaikka.
4. **Tanbin rannikkoluonto (2):** mangrove- ja vuorovesikokonaisuus Banjulin vierellä (B4; B5), ei yksittäisen portin tai kierroksen lupaus.
5. **Paikallinen ateria (1):** kalan, riisin ja muiden aineksien yhdistelmät (B10; B7).

Tähdet toimituksellinen suositus; valittujen karttakohteiden määrä ja nämä suositukset eivät sama lista.

### Hyvä tietää (4)

1. **Paikannimet:** Banjul, Suur-Banjul ja Serrekundan/Kololin resortialueet eivät ole sama paikka (B1; B7).
2. **Liikenne:** UM painottaa liikenteen riskejä; järjestä kuljetus huolellisesti ja vältä yksin liikkumista pimeässä (B12).
3. **Ranta:** jokisuun virrat voivat olla voimakkaita; älä oleta joka rantaa valvotuksi uimapaikaksi (B7).
4. **Torit ja arvoesineet:** pidä mukana vain tarpeellinen, älä jätä tavaroita valvomatta ja suosi paikallisia ohjeita (B12, käytännön neuvo ilman rikostarinan kuvausta).

**Turvallisuustaso:** UM:n Gambia-tiedote 24.8.2026 on **”Noudata erityistä varovaisuutta”**. Banjuliin ei siitä päätellä yleistä matkustuskieltoa. Oppaan asiallinen käytännön huomio: matka ja kuljetukset on syytä suunnitella huolellisesti, erityisesti liikenne ja pimeän ajan liikkuminen. Ei nykypolitiikkaa, konfliktiosapuolia, nimettyjä rikoksia tai lääkintä-/rokotusohjelmaa peliin.

## 5. Kohdekartta: kolme paikkaa pienelle saarikaupungille

**1–5-kohteen poikkeus perustellaan:** Banjulin oma kaupunki on pieni, ja modernit Arch 22-/kansalliskokousteokset jätetään pois. Historiallinen tori sekä jokisuun ja kaupungin vierellä olevan kosteikon luonto muodostavat kolmelle paikkajutulle perustellun kokonaisuuden. Museon institutionaaliset faktat valmistuivat, mutta rakennusikä/tekijä/oikeusketju ei ratkaise arkkitehtuuripääkuvaa; museo jätetään oppaaseen. Ei kuuden pisteen täytettä hotellikoordinaateilla, toisen kaupungin luontokohteilla tai modernilla monumentilla.

| # | Nimi täsmälleen | Tyyppi | lat | lon | Koordinaattilähde | Aika |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Albertin tori | aukio | 13.45430 | -16.57195 | WD2 P625: 13.45430451, −16.57194549, torin oma piste; B2:n koordinaatti hieman eri kohta samassa torissa | 1800-luvun puoliväli, nykyinen tori |
| 2 | Gambia-joen suu | luonto | 13.46670 | -16.56670 | WD4 P625 **applies to part river mouth Q1233637**; ei lähdepiste Guineassa | luonnonpaikka |
| 3 | Tanbin kosteikko | luonto | 13.41667 | -16.61667 | WD3 P625, sama aluepiste kuin B4. Edustaa laajaa kosteikkoa, ei sisäänkäyntiä tai veneen lähtöpaikkaa | luonnonpaikka, myöhempi suojelualue |

**Rajaus:** pohjoinen 13.46940, etelä 13.41397, länsi −16.61945, itä −16.56392, johdettu lähdekoordinaateista noin 300 metrin marginaalilla. Tanbin aluepiste on noin kuusi kilometriä historiallisesta ytimestä, ei koko laajan kosteikon rajojen esitys; se kuuluu Banjulin lähirantaan. Lähdepisteiden desimaaliformaatti ei lisää niiden mittaustarkkuutta. Kaikki kohdepisteet alle ohjeen 12 km etäisyysrajan kaupungin pallo-pisteestä.

**Esittelyehdotus:** Banjulin torikaduilta avautuu yhteys Gambia-joen suulle. Saaren länsi- ja etelärannan Tanbi näyttää, miten kaupunki ja vuorovesikosteikko liittyvät toisiinsa. (B1; B2; B4; B5; B6.)

### 1 — Albertin tori

B2 koko artikkeli, B7 Understand / See; koordinaatti WD2.

1. Banjulin katutori, ei sama kuin Serrekundan markkinat.
2. Sijainti Liberation Avenuella.
3. Aikaisempi virallinen nimi Royal Albert Market.
4. Historiallinen torivaihe 1800-luvun puolivälistä.
5. Nimetty prinssi Albertille, Victorian puolisolle.
6. Nykyisin tiheää torikäytävien ja kojujen ympäristöä.
7. Torin alkuperä ei todista kaikkien nykyisten katosten tai kylttien alkuperäisyyttä.
8. **1873:** tori oli jo olemassa lähteen keskivuosisadan ajoituksen perusteella. Ei isoisän ostosta, nykyistä kylttiä tai tuntemattoman kojun myyntiä matkavuoteen.

Juttu käsittelee paikan historian ja nykyisen käytön, ei hintoja tai kojumääriä. B:n kuva-/teosoikeus, henkilökasvot ja mainospinnat tarkistetaan erikseen.

### 2 — Gambia-joen suu

B6 johdanto / Geography / Crossings / Bolongs, B1 johdanto; koordinaatti WD4:n oikea kohdistus.

1. Gambia-joki laskee Atlanttiin Banjulin kohdalla.
2. Banjul sijaitsee St Mary's -saarella jokisuun reunassa.
3. Joki levenee rannikon suulla laajaksi estuaariksi.
4. Jokisuun vastarannalla on Barra.
5. Banjul–Barra-lautta ylittää tätä suualuetta.
6. Jokisuun lauttayhteys on eri paikassa kuin yläjuoksun sillat.
7. Alajuoksun pienempiä vesihaaroja kutsutaan myös bolongeiksi; ei kirjata yhtä nimettyä haaraa väärään pisteeseen.
8. **1873:** luonnollinen jokisuu ja kaupunkiasutus olivat jo olemassa. Nykyinen lautta, laiturit ja modernit rakennukset eivät matkavuoden näkymää.

Ei joen kokonaispituutta, suun leveyttä, virtausnopeutta tai navigointikelpoista kilometrimäärää. Ei yläjuoksun kansallispuistokuvaa selitteellä Banjulin suusta. Paikkapiste on vesialueella, ei vierailijaa ohjaava katuosoite.

### 3 — Tanbin kosteikko

B4 Geography / Flora / Fauna / Human activities; ensisijainen B5 Overview; koordinaatti WD3.

1. Gambia-joen suun eteläisen väylän rannikkokosteikko.
2. Ulottuu Banjulin/St Mary's -saaren länsirannalle ja lounaispuolelle.
3. Mangrove, vuorovesikanavat, laguunit ja liejupinnat muodostavat kokonaisuuden.
4. Eri mangrovekasveja kasvaa vesivaikutteisilla alueilla, kuivemmalla reunalla luonto muuttuu.
5. Kosteikko toimii vedenliikkeen ja tulvien hydrologisena puskurina, Ramsar-kuvauksen mukaan.
6. Alueella elää rantakosteikon lintuja ja muita eläimiä; lajeja ei luvata jokaiselle käyntipäivälle.
7. Kalastus, osterin keruu ja reuna-alueiden viljely liittyvät paikalliseen työhön.
8. Se on Ramsar-kohde; statuksen tarkkaa nimitysvuotta tai pinta-alaa ei julkaista vain yhdestä lähteestä.
9. **1873:** vuoden 1873 täsmällistä kasvillisuuden tai kanavien tilaa ei tästä aineistosta vahvistettu. Nykyisiä suojelurajoja, palveluja ja tämänhetkistä metsän laajuutta ei sijoiteta matkavuoteen; juttu erottaa luonnollisen rannikkoympäristön myöhemmästä suojelustatuksesta.

Aluepiste ei ole vierailuportti. Nähtävyysjuttu voi kuvata paikan merkitystä, muttei neuvo kulkemaan suoraan vesipisteeseen. Kuvassa todellinen Tanbi tai selkeä yleinen lajikuva asianmukaisella rajauksella.

## 6. Viisi kysymysaihetta ja kolme tietoa

| Taso | Kysymysaihe | Oikea ajatus | Lähde |
| --- | --- | --- | --- |
| 1 | Minkä maan pääkaupunki Banjul on? | Gambian | B1; WD1 |
| 1 | Minkä joen suulla Banjul sijaitsee? | Gambia-joen | B1; B6 |
| 2 | Mikä ero Banjulin ja Suur-Banjulin välillä on? | Suur-Banjuliin kuuluu myös Kanifingin alue mantereella | B1 johdanto; konteksti |
| 2 | Millaista muistitietoa NCAC:n arkisto kerää? | Suullista perinnettä ja tallennettuja kertomuksia | B9 |
| 3 | Mihin Albert Marketin nimi viittaa? | Kuningatar Victorian puolisoon prinssi Albertiin | B2 |

Vihje ohjaa miettimään aiheen, ei sano vastauksessa olevaa joen/maan/prinssin nimeä. Väärät vaihtoehdot uskottavia ja samanmittaisia; ei toisen pelikaupungin nimeä oikeaksi vastaukseksi. Minitehtävän bolongs-asia ei toistu visassa. Ei tarkkoja vuosia tai väestömääriä.

Kolme tiesitkö-aihetta ilman isoisää:

1. Pienen saarikaupungin Banjulin väkiluku ja laajan Suur-Banjulin väkiluku ovat eri asia (B1; konteksti).
2. Kulttuuriperinnettä säilytetään Banjulissa myös ääni-/kuvatallenteina, ei vain esineinä ja kirjoina (B9).
3. Tanbin mangroveranta toimii Banjulin ympäristössä myös vedenliikkeen puskurina (B5), ei vain eläinten maisemana.

## 7. Kuvatarpeet B:lle

Ei valittuja kuvia tai Commons-hakuja tässä A:ssa. GMB:n kaupallinen FOP ja kuvattavan teoksen oikeudet tarkistetaan B:ssä. Arch 22 ja modernit suojatut monumentit eivät tähän tilaukseen. Luonnonpaikat/veneet tarjoavat ei-teosaiheita; historiallisten talojen ikä ei yksin ole PD-todiste. Tallenteen arkistointi ei ole käyttölupa musiikkiin tai dokumenttikuvaan.

| Kohta | Aihe/hakusanat | Rajaus |
| --- | --- | --- |
| Kansi 1 | Banjul city street panorama / Albert Market wide | Laaja kaupunkikuva, ei Arch 22 tai moderni kansalliskokous pääteoksena. |
| Kansi 2 | Banjul Gambia river mouth / ferry coast panorama | Laaja jokisuu kaupungin reunassa; ei yläjuoksun kuva. |
| Kansi 3 | Tanbi wetland mangrove panorama | Todellinen lähirannan mangrovemaisema, ei Saloumin suiston kuva Banjulin nimellä. |
| K1 | Albert Market Banjul streets stalls | Oikea tori, ei luettavia lähikasvoja/mainos-/pakkauspääaihetta. |
| K2 | Banjul island overview / city mainland coast | Saarikaupungin yleiskuva, ei pelkkä Kololi-resortti nimettynä Banjuliksi; suojattu silta ei pääteos. |
| K3 | Banjul Barra ferry / boats estuary | Lautta/vene vesillä, ihmisiä etäältä; ei vanhentunutta kalustonimi-/kapasiteettilausetta. |
| K4 | oral archive recording device / museum documentation | Dokumentoitu arkistointikuva tai yleinen tekninen väline, ei väärää laitetta NCAC:n nimellä. Tallenteen/teoksen tekijä ja kasvojen näkyvyys tarkistetaan. |
| L1 | Tanbi mangroves tidal channels | Todellinen kanaaliverkko tai mangroveranta, selite vain näkyvästä kohteesta. |
| L2 | Tanbi mangrove roots shore | Mangroven/rannan luonnonkuva. Yleisessä muualla otetussa lajikuvassa ei väärää Tanbi-paikkaväitettä. |
| L3 | Tanbi oyster harvest / Gambia mangrove oysters | Työ etäältä tai varmennettu luonnonosterikuva. Ei lähikasvoja tai oletettua lajia. |
| L4 | Tanbi osprey / black-tailed godwit | Tunnistettu laji; muualla otettu lajikuva esitetään lajikuvana, ei Banjulin havaintokuvana. |
| Matkailijalle | Banjul coast boat vertical / market lane vertical | Tuore maltillinen pysty, w/h 0,60–0,85. Ei moderni taideteos/lähikasvot. |
| Opas 1 | Banjul transport street / ferry | Tuore katutila/vene/kulkuneuvo, ei terminaalin/modernin portin suojattua arkkitehtuuria pääaiheeksi. |
| Opas 2 | Albert Market another stall street | Eri kuva kuin K1 ja kansi; paikallinen tori tunnistettava. |
| Opas 3 | Tanbi mangrove / historic cultural artifact | Tuore luonto tai varmistettu vanha esine, ei nykytaidetta/tekijän oikeutta ohitettuna. |
| Opas 4 | benachin / domoda Gambia | Oikea ruoka ja nimi kuvasivun kanssa. Ei mainos-/pakkauskuvaa. |
| Opas 5 | Sää | Voi kuvaton. Luvut eivät tule kuvasta. |
| Kohde 1 | Albert Market general exterior | Eri tiedosto kuin muut torikuvat. |
| Kohde 2 | Banjul river mouth Atlantic view | Joen suun alue, ei Fouta Djallon tai Saloum. |
| Kohde 3 | Tanbi Wetland Complex | Todellinen suojelualue/luontopaikka. Ei tunnettuun vierailuporttiin viittaavaa selitettä vahvistamattomasti. |
| Valokuva | Bathurst Gambia historical photo / 1800s | Jos PD-vedos enintään vuodelta 1900, leveys vähintään 1200 px ja käyttöketju sallittu, ennen–nyt-pari. Muuten eri nykyinen yleiskuva. Bathurst Australia ei sama kaupunki. |

Kaikki kuvat katsotaan B:ssä ja uudelleen C/D:ssä. Leveys vähintään 1200 px, tekijä täsmälleen sallitulta lähdesivulta, PD/CC0/CC BY/CC BY-SA; ei vesileimaa, arkistoleimaa, lähikasvoja tai väärän kohteen selitettä. Sama tiedosto vain kerran paitsi nimenomainen valokuva/ennen–nyt-poikkeus. Torin/joen/mangroven aihetoistot perustellaan eri rooleilla.

## 8. Ristiriidat ja epävarmat

1. **Väestö:** B1:n infolaatikossa on vanhempi laskenta, johdannossa uudempi. Kontekstin 2024 kaupunki/LGA-luku on lähtökohta, mutta tarkkana vain riippumattomalla vahvistuksella; pelaajalle noin 26 000. Suur-Banjulin suurempaa lukua ei anneta saarikaupungille.
2. **Etymologia:** henkilöperinne ja köysikuituteoria ovat eri selityksiä. Ei valita yhtä varmana tai rakenneta sen päälle keksittyä kauppatarinaa.
3. **Bathurst/perustaminen:** paikka ja saari ovat vanhempia kuin brittiläinen kauppa-/vartioasemavaihe. Ei ”ennen brittejä tyhjä saari” -väitettä. Katujen rakentaminen, kaupunkiasutus, pääkaupunkiasema ja myöhempi nimenvaihto eivät yksi perustamispäivä.
4. **Albert Market:** artikkelissa lähde-/notability-varoituksia. Historiallinen karkea ajoitus ja nimitys voidaan käyttää lähteistettyinä; ei tarkkaa vuotta, kojumäärää, roolia koko Länsi-Afrikan kaupalle tai nykyisen katoksen rakennusikää.
5. **Toripiste:** WD2 ja B2 antavat hieman eri pisteen saman torin alueella. Valittiin täsmällisempi WD2 P625, ei keskiarvo eikä vanhan OSM-karttapohjan koordinaatti.
6. **Joen pisteet:** WD4:n ensimmäinen P625 on lähde Guineassa. Kartalle valittu suun P625 oikealla Q1233637-kohdistuksella. Raaka ensimmäinen osuma olisi väärä kaupunki/maa.
7. **Tanbin piste/rajat:** WP/WD-aluepiste ja Ramsarin virallinen metadata käyttävät saman laajan alueen eri edustuspisteitä. Piste ei ole luontokeskus tai retkien lähtöpaikka. Ramsar hallinnollisesti liittyy Banjulin lisäksi Kanifingiin ja Brikamaan.
8. **Tanbin pinta-ala:** B4:n infolaatikko, leipäteksti ja B5:n virallinen lukuarvo eroavat. Pinta-alaa tai mangroven prosenttia ei julkaista; tarkka laajuus selvitettäisiin erikseen, jos tarvitaan. Ei valita sopivaa lukua hiljaa.
9. **Ramsarin aikataso:** B5:n viimeisin RIS on vanha. Se tukee luonnollisten toimintojen/historiallisen käytön kuvausta, ei vuoden 2026 palvelu-, keruusaalis- tai lajilaskentatilannetta. BirdLifen nykyinen staattinen sivu ei paljastanut dataa.
10. **Museotalo:** B8 vahvistaa vanhan siirtomaatalon käyttöä jo 1920-luvulla, mutta ei sen valmistumispäivää tai tekijää. Siitä ei johdeta olemassaoloa vuonna 1873 tai PD-oikeutta. Nykyiset näyttelyteokset vielä erillisiä.
11. **Suullisen arkiston historia:** B9:n kronologiassa on yksi ilmeisesti virheellinen vuosiväli. Ei kopioida sitä tai tallenteiden täsmällistä määrää. Yleinen myöhäisen 1900-luvun arkistointivaihe ja dokumentoidut aineistotyypit riittävät.
12. **Tämä arkisto ei radio:** Radio Syd-/Radio Gambia -sisältöä ei löytynyt tarkistetusta nykycheckoutin js/docs-aineistosta, eikä sitä uusita varmuuden vuoksi. Suullisen perinteen keruu ja radiolähettäminen ovat eri asioita.
13. **Sää:** taulukko on 1991–2020, saa.json-revisio 1377725086. UM:n maan yleiset lämpötila-/kosteusluvut ja Wv:n kaavio eivät korvaa sitä. Ei tulevaisuuden merenpinta-/ilmastoskenaariolukuja tähän oppaaseen.
14. **Matkustusalue:** B7 sisältää resortit/ravintolat Bakau-/Kololi-/Serrekunda-alueilta. Ei nimetä niitä Banjulin vanhan ytimen paikoiksi tai museo-/toripisteiksi. Lentokenttä on Yundumissa.
15. **Turvallisuus:** nykyinen UM-taso on erityinen varovaisuus, ei tavanomainen. Ei yleistä Banjulin matkustuskieltoa tai poliittista/rikollisuussisältöä. Käytännön huomio liikenteestä/pimeän ajan liikkumisesta.
16. **Mangrove/elinkeinot:** lähteen hydrologiset tehtävät eivät lupaa täyttä suojaa tulvilta. Osterin kerääjän sukupuolta/etnisyyttä ei tunnisteta valokuvasta, eikä jokaisen myyntiannoksen turvallisuutta päätellä ekologiasta.

## 9. Poisjätöt

- Arch 22, moderni kansalliskokousrakennus, modernit taidemonumentit ja tekijältään alle 70 vuoden kuolema-ajan teokset: eivät kuviksi tai kohteiksi. Pääkaupunkia koskeva nykyinen vallankaappaus-/presidenttitieto myös pois.
- Vanhan karttapohjan viisi pistettä eivät hyväksy uusia suojattuja kohteita; vain lukutarkistus, ei pelitiedostomuutoksia.
- Kansallismuseon rakennus jää oppaaseen/arkistointitekstiin, ei oikeuksiltaan epävarmaksi arkkitehtuurikarttakohteeksi. Historiallinen käyttötapa ei itsessään ratkaise tekijän kuolinaikaa.
- Saloumin suiston jo olemassa oleva nosto, laajat maapähkinä-/valtion muoto-/kieli-/itsenäistymistarinat, nykyiset puolueet/presidentit ja Radio Syd -tarina eivät uutta kaupunkisisältöä.
- Bakau/Kachikally, Kololi, Senegambia Strip, kaukana sijaitseva Kunta Kinteh Island tai sisämaan kivikehät eivät lähellä sijaitsevan historiallisytimen kohdemäärän täytettä.
- Tarkat vuosiluvut, pinta-alat, lajimäärät, lauttakapasiteetit, kulkuajat, hinnat ja arkistotallenteiden määrät ilman kahta riippumatonta lähdettä pois. Paikkapisteiden ja lähdeasiakirjojen metatiedot säilyvät tarkistusta varten.
- Rokotus-/lääkintäohjeet, nimettyihin rikoksiin perustuvat tarinat ja kansainvälisen politiikan tapahtumat pois; matkailijan käytännön varovaisuus säilyy.
- RAPORTTI.md:hen kolmen paikan pieni saarikaupunki -perustelu, vanhan kartan poisjätöt, Tanbin rajaus-/piste-/pinta-alapoikkeamat, museotalon ikä-/oikeusepävarmuus ja BirdLife-datan puuttuminen staattisesta sivusta. Kuvat ja lopullinen sisalto.json eivät ole tämän A:n valmistumisen perusteella hyväksyttyjä.
