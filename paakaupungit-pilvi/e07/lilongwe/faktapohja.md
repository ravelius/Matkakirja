# Lilongwe — faktapohja 0–9, vaihe A

Erä e07, id `lilongwe`, maa MWI. Luettu **11.–12.10.2026**. **A partial:** 4 + 4 aihetta, viisi nykyopasjaksoa ja kuvatarpeet koottu. Kuudesta kahdeksaan historialliseen ytimeen sopivaa hyväksyttyä karttakohdetta ei löytynyt rajatulla lähdekierroksella. Metsä-/eläinkeskukselle, Maulalle ja Civolle on omat WP/WD-pisteet, mutta muiden paikkojen pisteet/paikkafaktat ja yksittäisten rakennusten tekijäketjut ovat avoimia.

**Sääpoiminnassa kausiristiriita:** otsikko 1991–2020, mutta valitun sateen lähde on WP:n mukaan DWD:n 1961–1990-aineisto Kamuzun lentoasemalta. Ristiriita ilmoitettu pääsessiolle; `saa.json`:ia ei muutettu. Tästä sarjasta ei ilmastolukuja uusiin teksteihin ennen pääsession ratkaisua.

Ei kuvia valittu, ei `sisalto.json`:ia, Git-operaatioita tai julkaisua. Alla olevat tekijä-/kuvarajat eivät ole myönnettyjä kuvalupia.

## 0. Luetut lähteet, toistot ja 1873-kehys

Raakalähteet, tekstipoiminnat, lähdemetat, PDF:t ja lähde-SHA:t NAS-kansiossa `valiaikainen/lilongwe-A/`, koonti `lahteet.json`. Yhteinen `sallittu_haku.py`, robots ennen uutta verkkotunnusta/polkua/ohjausta ja 1 pyyntö/s -lukko/välimuisti. Omistajan hyväksymät sallitut alkuperäiset `/wiki/`-sivut estettyjen rajapintojen sijasta; ei `/w/`-/`/api/`-kiertoa tai User-Agent-vaihtoa.

### Wikipedia ja nykyopas

| Tunnus | Luettu alkuperäislähde | Revisio/kieli | Kohdat ja rooli |
|---|---|---|---|
| S1 | [Lilongwe](https://en.wikipedia.org/wiki/Lilongwe) | en 1378621524 | History, Planning history, Geography/Divisions/Areas, Climate/viitteet, Transport, Sport; tulevien kaavojen tavoitteet eivät toteutuneita nykyfaktoja |
| S2 | [Timeline of Lilongwe](https://en.wikipedia.org/wiki/Timeline_of_Lilongwe) | en 1371878010 | varhainen hallinto-/kauppapaikka, pääkaupungin vaihe; ei nykyisiä poliittisia skandaaleja |
| S3 | [Lilongwe City Centre](https://en.wikipedia.org/wiki/Lilongwe_City_Centre) | en 1376609030 | **luettu ristiriitatodisteena, ei luotettavana paikka-/väestö-/muodostumislähteenä**: väärä maakunta, koko kaupungin historian laina ja eri pisteet |
| S4 | [Lilongwe Wildlife Centre](https://en.wikipedia.org/wiki/Lilongwe_Wildlife_Centre) | en 1362982754 | Aims, Wildlife rescue and rehabilitation, oma piste; eturistiriita-/mainosvaroitukset, nykyinen pääsy varmennettu alkuperäiseltä ylläpitäjältä |
| S5 | [Lilongwe River](https://en.wikipedia.org/wiki/Lilongwe_River) | en 1367593189 | joki kaupungissa, lähtöalue ja laaja joen/muun virtaaman rooli; oma piste lähellä kaukaista suuta, ei keskustan rantapaikaksi |
| S6 | [Maula Cathedral](https://en.wikipedia.org/wiki/Maula_Cathedral) | en 1363808839 | nimi, instituutio, Civo/M1-sijainti; oma WP-piste ei löytynyt, WD erikseen |
| S7 | [Civo Stadium](https://en.wikipedia.org/wiki/Civo_Stadium) | en 1372573895 | toiminnallinen paikka, nimi, oma piste, korjausvaihe; ei kapasiteettia/nykyotteluja |
| S8 | [Bingu National Stadium](https://en.wikipedia.org/wiki/Bingu_National_Stadium) | en 1372573746 | uusi rakennus, sijainti, tekijä-/rakennusketju avoin; ei vanhan ydinkaupungin kohteeksi oletuksena |
| S9 | [Kamuzu International Airport](https://en.wikipedia.org/wiki/Kamuzu_International_Airport) | en 1379284805 | nimi/LLW, sijainti ja vanhan/nykyisen kentän aikakehys; ei lento- tai turvallisuuslupausta |
| S10 | [Malawian cuisine](https://en.wikipedia.org/wiki/Malawian_cuisine) | en 1338627147 | nsima ja lisukkeet; ei ravitsemus-/terveysväitteitä tai kalalajin tunnistusta satunnaisesta kuvasta |
| S11 | [Ugali](https://en.wikipedia.org/wiki/Nsima) | en 1374870951 | `Nsima` ohjautui oikeaan otsikkoon **Ugali**; Malawi-osuus, valmistustapa; ei koko Afrikan lajikkeita paikallisiksi ruoiksi |
| S12 | [Combretum molle](https://en.wikipedia.org/wiki/Combretum_molle) | en 1114476009 | puulaji/suku/levinneisyys ja ravintokasvi; lääke-/laboratorioväitteet pois |
| S13 | [Vervet monkey](https://en.wikipedia.org/wiki/Vervet_monkey) | en 1376327653 | identiteetti, ravinto, laumat, varoitusäänet, turkinhoito; ei tutkimuseläinten sairaus-/alkoholiväitteitä |
| S14 | [Hamerkop](https://en.wikipedia.org/wiki/Hamerkop) | en 1363093966 | johdanto, ruokailu, pesän rakentaminen; tarkat koko/materiaali-/nopeusluvut pois |
| S15 | [Canopy](https://en.wikipedia.org/wiki/Canopy_(biology)) | en 1351178485 | ohjaus Canopy-otsikkoon, latvuksen elinympäristö ja varjostus; ei muiden maiden latvuskuvaa Lilongweksi |
| S16 | [Riparian zone](https://en.wikipedia.org/wiki/Riparian_zone) | en 1375814106 | rantavyöhykkeen yleinen käsite; ei Lilongwen paikalliseksi virtaus-/suodatusmittaukseksi |
| O1 | [Lilongwe, Wikivoyage](https://en.wikivoyage.org/wiki/Lilongwe) | en 5241762 | Orientation, Get in/Get around, See/Buy/Eat, Stay safe; hinnat/aukioloajat/palvelulupaukset pois |
| O2 | [UM: Malawi, matkustustiedote](https://um.fi/matkustustiedote/-/c/MW) | fi **18.9.2026** | turvallisuustaso, liikenne, pimeällä liikkuminen, konsuliapu, terveys/maahantulo/kuvaus |

### Alkuperäislähteet

| Tunnus | Alkuperäinen lähde | Luettu osuus |
|---|---|---|
| P1 | [Lilongwe Wildlife Trust: Visit](https://lilongwewildlife.org/visit/) | nykyinen julkinen metsä-/vierailualue, **eläinsanctuary closed to public**, Lingadzi River, Acacia/Combretum-metsä ja pääsyroolit |
| P2 | [LWT: Our work](https://lilongwewildlife.org/our-work/) sekä [ympäristökasvatus](https://lilongwewildlife.org/our-work/environmental-education/) | pelastaminen, kuntoutus, ympäristökasvatus; rikostorjunta-/politiikkaosiot pois |
| P3 | [LWC Visitor Guide, PDF](https://lilongwewildlife.org/wp-content/uploads/2024/04/LWC-Visitor-Guide-1.pdf) | **PDF-sivut 1–2 kokonaan luettu/katsottu**: paikalliset metsäneläimet, Lingadzi River, latvus, siipimäiset hedelmät, nykyiset veistostekijät; PDF:n vanhat päivittäiset ajat eivät nykyoppaaseen |
| P4 | [Lilongwe City Council: Detailed Diagnostic Studies Report, October 2020 V2, PDF](https://lcc.mw/wp-content/uploads/2020/10/Main-Document_Detailed-Diagnostic-Report_V2_OCT-2020.pdf) | kansi, **sivut 24, 29 ja 56**, sivut 24/56 katsottu kuvina: Old Town/City Centre eri sektorit, maataloustuotteiden kaupunki; rasterikartan koordinaatteja ei oteta WP/WD-pisteiksi |
| P5 | [LCC: Market Fee Collection](https://lcc.mw/lcc-automates-market-fee-collection/) | julkaisu 3.9.2020, toritoimintojen erottelu ja sähköinen keräys; ei hinnastoa/nykyrikollisuusjuttua |
| P6 | [LCC: Home](https://lcc.mw/) ja [About us](https://lcc.mw/about-us/) | kaupungin nykyinen hallinto/paikat; ei poliitikkojen nykyrooleja nostoon |
| P7 | [UNESCO: Nsima, culinary tradition of Malawi](https://ich.unesco.org/en/RL/nsima-culinary-tradition-of-malawi-01292) | kulinaarinen käytäntö, maissijauho, valmistus/ruoan valinta, yhteinen ateria ja taitojen siirtyminen; ei gender-normin yleistystä tai listausvuosivisaa |
| P8 | [Malawin sääpalvelu: Our cities climate](https://www.metmalawi.gov.mw/our-cities-climate/) | nykyinen sääpalvelun portaali, ei näkyvää yhtenäisen normaalikauden todistetta tässä haussa; ei lukujen käsin palautusta |

PDF:t luettiin PDF-taito-ohjeen mukaan NAS:lla. Kaksi aidosti luettua PDF:ää ovat `LWC-visitor-guide.pdf` ja `LCC-diagnostic-2020.pdf`. Kuvia/sivuskannauksia ei valita peliin; alkuperäislähteiden kartat eivät korvaa WP/WD-kohdepisteitä eikä kuvan alkuperäisoikeutta.

### Epäonnistuneet ja epäkelvot lähderoolit

- En-WP `Lingadzi River`, `Lingadzi-Namilomba Forest Reserve`, `Lilongwe Nature Sanctuary`, `Lilongwe Old Town`, `Lilongwe Market`, `St. Peter's Cathedral, Lilongwe` ja `National Herbarium and Botanic Gardens of Malawi` palauttivat 404. Ei väitetä näitä löydetyiksi artikkeleiksi.
- DWD:n `ak_675860_kt.pdf` robots.txt **kieltää**, joten PDF:ää ei haettu, kuvattu tai luettu. Sääkauden ristiriidan suora todistus tässä on luetun alkuperäisen WP-sivun Source/viitetieto, ei itse DWD-PDF:n sisältö.
- SANBI:n Combretum molle -sivuyritys palautti 403; ei tekstiä siitä faktoihin. Wikipedia ja aito paikallinen vierailuopas ovat puulajin lähteet.
- Arvattu ilmailuviranomaisen sivupolku `www.mca.gov.mw/…` ei ratkennut DNS:ssä. LLW-nimen lähde on S9/O1, ei haettu viranomaisvahvistus.
- Kaupallinen **lilongwe.org** (hakutulokset) sekoittaa rantajokea ja antaa eläinkuntoutusvierailun lupauksia. Sen markkinointitekstiä ei käytetä alkuperäisen nykyisen ylläpitäjän P1:n vastaisesti.

### Wikidata

| Kohde | Entiteetti/revisio | P625 / rooli |
|---|---|---|
| Wildlife Centre | Q23808334 / 2516883715 | −13.97221, 33.78386; oma WP −13.97222, 33.78389, sama alue. **Aluepiste, ei eläinhoitolan/portin sisäänkäynti** |
| Lilongwe River | Q1825272 / 2541727490 | −13.78333333, 34.41666667, hyvin karkea **kaukaisen suualueen/joen piste**, ei keskustan uusi rantapaikka |
| Maula Cathedral | Q23928773 / 2432980518 | −13.979589, 33.762483; P84 puuttuu |
| Civo Stadium | Q5124788 / 2480573021 | −13.97825, 33.758611; oman WP:n kaksi hyvin läheistä koordinaattimuotoa kirjattu N2:ssa |
| Bingu Stadium | Q28457050 / 2319886890 | −13.943828, 33.753175; P84 Q30947660 on yritys, ei yksittäisen tekijän kuolinvuosi |
| City Centre | Q134301759 / 2344118108 | −13.98333333, 33.78333333; liian karkea ja ristiriidassa S3:n oman toisen pisteen kanssa, ei rakennusten/torin piste |

### 1873-kehys

- S1/S2 sijoittavat **nykyisen taajaman hallinto-/kauppakehityksen 1900-luvun alkuun**. Nykyistä suunniteltua pääkaupunkikeskustaa, luonnonhoitokeskusta tai nimettyjä moderneja rakennuksia ei ollut vuonna 1873.
- Lähteet eivät tässä kerro nykyisen vanhan torin tarkkaa paikkaa, rakennuksia, jokea ylittävää siltaa tai asutuksen rajaa juuri 1873. Ei päätelmää, että alue oli asumaton tai tiettyyn luontolajiin kuuluva metsä silloin.
- Nykyinen Lilongwe-joen varren sijainti ei tarkoita, että vuoden 1873 kauppakaupunki olisi näyttänyt nykyiseltä Old Townilta. Sana ”Old” suhteessa uuteen pääkaupunkialueeseen ei tee joka kadusta 1800-luvun kohdetta.
- Yksittäistä LWC:n puuta, luontokeskuksen rajoja, latvuspolkua tai eläintä ei päivätä vuoteen 1873.
- Ei isoisän vierailua, keskustelua, reittiä, muistiinpanoa tai ääntä.

### Toisto

Kontekstissa `maalehti: null`, `lahiKaupungit: []`, `lahiNostot: []`. Kevyt kaupunkikuvaus ja tunnusrakennukset on luettu. Kansi ei kopioi niitä sanasta sanaan: uudet aiheet ovat paikkaroolit ja aluenimet, ruokakulttuuri, torin yhteys ympäröivään maatalouteen sekä ihmiskontaktin raja eläinten kuntoutuksessa. Teemasivu käsittelee paikallisen metsän biologisia ilmiöitä.

## 1. Perusfaktat

- Lilongwe, Malawin pääkaupunki **Central Regionissa** Lilongwe-joen varrella (S1/S5). Ei S3:n virheellistä Southern Region -luokitusta.
- Kaupungin nimi tulee joesta (S1/S2), ei LWC:n Lingadzi-joesta.
- Vanha kaupallinen Old Town ja myöhempi hallinto-/liikekeskus City Centre ovat eri kaupunginosakokonaisuuksia (S1/P4), eivät sama pieni tori tai rakennus.
- Pääkaupunkivaihe **1970-luvulla**; S1/S2 1975, O1:n eri tulkinta-/tausta ei täydellinen itsenäinen vuosivarmennus. Nykyinen asema pääkaupunkina selkeä, täsmäsiirtopäivää ei julkaista.
- Asukasluku vain kontekstista: **989 318 vuonna 2018, Lilongwe City -kaupunkipiiri**, NSO. Ei ympäröivä Lilongwe District, uusi 2026-laskenta tai metropolialue. Pelaajalle tarvittaessa **noin 989 000 kaupunkipiirin asukasta vuonna 2018**. Kontekstin API-PDF-linkkiä ei haettu, eikä luvulle väitetä uutta kahta riippumatonta vahvistusta.
- Kamuzu International Airport / Lilongwe International Airport, **LLW**, on erillinen pohjoisempi lentokenttä (S9), ei kaupungin ydinkarttakohde.

## 2. Kansi — johdanto ja neljä aihetta

Johdantoehdotus: Lilongwen kartalla kaupunginosalla voi olla numero ja keskustalla kaksi eri roolia. Torikauppa, maissista valmistuva ateria ja kaupungin metsäalue tuovat arkisen Lilongwen hallintorakennuksia lähemmäs.

### K1 — Kaupunginosan nimi voi olla numero

Wiki **Lilongwe**, Areas/Planning history; P4 sivut 24/29.

1. Lilongwen kaupunginosia nimetään Area-numeroilla (S1).
2. Old Town ja City Centre ovat eri painopisteet, eivät kumpikin sama ”alkuperäinen kylä” (P4).
3. Vanhassa keskustassa on kaupankäyntiä ja liikkumisen palveluja (S1/P4).
4. Uusi City Centre/Capital Hill liittyy myöhempiin hallinto-/toimisto-/hotellialueisiin (P4).
5. Kaupungin suunnittelussa oli eri sektoreita, joiden kasvu ei toteutunut täysin samanlaisena (P4).
6. P4 erottaa todellisen maankäytön tulevista suunnitelmista; kaavakarttaan merkitty tavoitealue ei ole valmiin vuoden 2026 kaupunginosan todistus.

S1:n numeroinnin ”chronologically, not geographically” -selitystä ei kasvateta varmasti tiedetyksi yksittäisen kadun iäksi tai perustamisvuodeksi. Aluenimi ei anna rakennuksen tarkkaa sijaintipistettä.

### K2 — Nsima syntyy ennen lautaselle pääsyä

Wiki **Malawian cuisine**, **Ugali** (Nsima-ohjaus); P7.

1. Nsima on maissijauhosta valmistettu paksu ruoka (S10/P7).
2. P7:n perinne käsittää myös viljelyn, varastoinnin ja maissin käsittelyn, ei vain valmiin annoksen nimen.
3. Valmistuksessa tarvitaan osaamista jauhamisesta lisukkeiden valintaan ja tarjoiluun (P7).
4. S10 mainitsee lisukkeina lihaa, papuja ja vihanneksia; yhden kuvan lisuketta ei arvata kalalajiksi.
5. Yhteinen ateria ja taitojen siirtyminen ovat perinteen osa (P7).
6. Nsima-nimi voi viitata sekä ruokalajiin että laajempaan kulinaariseen käytäntöön (P7).

Ei väitettä, että jokainen lilongwelainen söisi samalla tavalla, ei tarkkaa UNESCO-listausvuotta tai sukupuoliroolien normatiivista yleistystä. Kuvassa oma ruokalaji, ei kenialainen ugali-annos nimettynä tietyn Lilongwen ravintolan ateriaksi. Jos havainne on yleinen, se sanotaan.

### K3 — Torikaupunki ja sen ympärillä olevat pellot

Wiki **Lilongwe**, History/Divisions; P4 sivu 56, P5.

1. P4 kuvaa Lilongwea ympäröivistä alueista tulevien viljelytuotteiden ja eläinten markkinapaikaksi.
2. Kaupungin asukkaiden ruokaostokset ja raaka-aineiden jatkokäsittely ovat eri kulutus-/työrooleja (P4).
3. Kaupungin kaupankäynnissä on myös tuotteiden käsittelyä ja kuljetusta (P4); ei kaikki kaupankäynti samaa toria.
4. Old Town on vanhempi kaupallinen ydin (S1/P4).
5. P5 kertoo kunnallisten toripaikkojen myyntipaikkamaksujen sähköisestä kirjaamisesta 2020-luvulla; ei nykyistä maksua tai vieraan maksuvelvollisuutta.
6. Toria ei sekoiteta suojattuun yksittäiseen kaupparakennukseen tai uuden hallintokeskustan koordinaattiin.

Ei väestön köyhyys-/syrjintäkehystä, kansallista talous-/rahalukua, työpaikkamäärää, korruptiotarinaa tai yritys-/tuotesuositusta. Syy-yhteyksiä käytetään vain P4:n sanoissa, ei omaa talousmallia. Vaatteen/vihanneksen kuvasta ei päätellä tietyn kojuston omistajaa.

### K4 — Kuntoutuksessa eläin ei opi ihmisestä liikaa

Wiki **Lilongwe Wildlife Centre**, Wildlife rescue; P1/P2.

1. Keskus kuntouttaa avun tarpeessa olevia villieläimiä (S4/P2).
2. Kuntoutuksen tavoitteena on mahdollisuuksien mukaan palautuminen suojelluille alueille hallitusti (S4).
3. Eläimille on tärkeää säilyttää villi käyttäytyminen (P1).
4. Ihmiskontaktia rajoitetaan tämän vuoksi (P1:n suora perustelu).
5. **Sanctuary/kuntoutusalue on yleisöltä suljettu** (P1).
6. Muu metsä-/vierailualue on erillinen, ja siellä elää myös luonnonvaraisia eläimiä (P1/P3).
7. Ympäristökasvatus on LWT:n toiminnan osa (P2), ei lupa päästä hoitamaan eläimiä ilman sovittua järjestelyä.

Ei nykyisen villieläinrikollisuuden tarinaa, nimettyjen eläinten murheellista elämäkertaa, jatkuvan vapautuksen määrää tai yleistä eläintarhakierrosta. P1:n nykyinen rooli voittaa vanhat markkinointikuvaukset eläinten tapaamisista.

## 3. Teemasivu — luonto, Metsä kaupungin keskellä

Vakioaihe `luonto`. Johdantoehdotus: Lilongwen metsäalueella sama paikka tarjoaa elintilaa puissa, maassa ja joen varrella. Puiden hedelmät, apinoiden äänet ja lintujen pesät kertovat eri puolista metsää.

### H1 — Siipimäinen hedelmä kertoo puusta

Wiki **Combretum molle**; P3 sivu 2 ja P1.

1. LWC:n metsää kuvataan Acacia/Combretum-ympäristöksi (P1/P3).
2. Paikallinen opas tunnistaa **Combretum molle** -puun, englanniksi velvet bushwillow (P3/S12).
3. Sen hedelmässä on siipimäisiä osia (P3); tarkka neljän siiven määrä jätetään tässä leipätekstistä pois ilman toista riippumatonta luettua morfologialähdettä.
4. Puulaji ei ole vain Lilongwen endeeminen: S12 sijoittaa sen länsi-, itä- ja eteläiseen Afrikkaan.
5. S12 nimeää puun ravintokasviksi eräille perhosen toukille; ei kaikille paikallisille toukille samaa lajia.
6. Kuvassa laji tunnistetaan alkuperäisellä kasvitiedolla; tavallinen siipimäinen hedelmäkuva ei yksin todista puun olevan kuvattu Lilongwessa.

Lääke-/antimikrobi-/kardiovaskulaariväitteet ja käyttöohjeet pois. SANBI-sivun 403 ei ole luettu todiste. Ei väitettä tietyn puuyksilön kasvamisesta paikalla vuonna 1873.

### H2 — Varoitusääni ja turkinhoito

Wiki **Vervet monkey**, Communication/Diet/Social behaviour; P3 sivu 1.

1. LWC:n metsällä on luonnonvaraisia vervet-ryhmiä; ne eivät kaikki ole kuntoutuseläimiä (P3).
2. Opas kertoo niiden liikkuvan päivällä ja nukkuvan puissa yöllä (P3).
3. Turkinhoidossa poistetaan likaa ja loisia toisten turkista (P3/S13).
4. S13 kuvaa erilaisia varoitusääniä eri tilanteissa; ei ihmiskielen kokoista sanastoa tai täsmääänten määrää.
5. Kasviravintoon kuuluvat muun muassa lehdet, hedelmät ja siemenet, mutta ruokavalio ei rajoitu niihin (S13).
6. Metsässä eläimille annetaan tilaa ja niitä ei ruokita (P3/P1:n kävijäsäännöt).

Ei laumakokoja tai body-length-lukuja, kliinisiä vertauksia ihmisiin, alkoholi-/sairaustarinaa tai keksittyä tietyn Lilongwen lauman dramaattista tapausta. Vervet-termi voi viitata laajempaankin sukuun; B vahvistaa kuvan lajin/roolin, ei nimeä yksilöä ulkonäöstä.

### H3 — Vesilinnun pesässä on katto

Wiki **Hamerkop**; P3 sivu 1 paikallista esiintymistä varten.

1. LWC:n opas mainitsee hamerkopit Lingadzi-joen lintuihin kuuluvina (P3), ei joka käynnillä nähtävänä takuuna.
2. Laji on ruskea vesilintu; englannin hamerkop-nimi viittaa pään/nokan ja töyhdön muotoon (S14).
3. Se etsii ruokaa matalasta vedestä (S14).
4. Kalat ja sammakkoeläimet kuuluvat sen ravintoon (S14).
5. Lintu rakentaa suuren risupesän, jossa on kupolimainen katto (S14).
6. Molemmat parin linnut osallistuvat rakentamiseen (S14).
7. Muiden eläinten käyttö on pesissä mahdollista lajia koskevan yleisen tutkimuksen mukaan; ei nimeä juuri Lilongwen pesän asukasta ilman havaintoa (S14).

Ei pesän tarkkaa kokoa/materiaali-/munamäärää tai ihmisen painoa, nopeuksia tai paikallisia kuolema-/salamanmyyttejä. P3:n ”kingfishers fish blind” -mainoslause ei tule tähän, eikä eri kuningaskalastaja lajin sijaiskuvaksi.

### H4 — Metsää on myös pään yläpuolella

Wiki **Canopy**, latvuksen elinympäristö; P3 sivu 2.

1. Puulatvukset muodostavat metsän ylemmän kerroksen (S15).
2. Latvuksessa elää lintuja, hyönteisiä ja muita eliöitä (P3/S15).
3. Puut tuottavat varjoa alemmille kasvustoille (S15); ei mitattua paikallista lämpö-/valomäärää.
4. LWC:n opas esittelee ylempää metsää havainnollistavan latvuspolun (P3).
5. Opas kertoo käytetyn myös kierrätettyä muovia; kyse toiminnallisesta kulkurakenteesta, ei sama kuin sen vierellä oleva taideteos (P3).
6. Luonnon katselu ja ympäristökasvatus ovat vierailualueen tehtäviä (P2/P3), ei eläinkuntoutusalueeseen pääsyä.

Latvuspolun tai kuvan nykyinen rakennustyö tarkistetaan B:ssä, kuvalupaa ei anneta tässä. Metsän modernit eläinveistokset ovat eri kohteita ja jäävät pois; puulajien/metrien/siltarakenteen mittoja ei arvata kuvasta.

### Minitehtävä

H3: **mikä rakenne hamerkopin risupesässä on sen lattian ja seinien lisäksi?** Katto. Vastaus jätetään H3:een. Alla olevassa visassa ei kysytä samaa pesärakennetta. Ei tarkkaa materiaalimäärää.

## 4. Nykyopas — viisi jaksoa

### O1 — Vanha ja uusi keskusta

S1/P4 erottavat Old Townin kaupankäynnin ja City Centren hallinto-/toimistomaailman. O1:n aluenimet/palvelutyypit ovat suuntaa antavia, eivät vuoden 1873 reitti. Ei tietystä Area-numerosta pääteltyä kadun ikää tai vapaata rakennuksen pääsyä. Numeroiduilla alueilla tarvitaan paikan todellinen osoite/kulkureitti.

### O2 — Torikauppa ja ruoka

Nsima ja lisukkeet kuvaavat paikallisen aterian kulttuuria (S10/P7). Lilongwe toimii ympäröivän maatalousalueen tuotteiden markkinana (P4 sivu 56); kauppaa on sekä torilla että muualla. Ei hintoja, tiettyä kojua/ravintolaa, annoskokoa tai juuri tämän päivän valikoimaa. Oman kuvan ruoka/laji/provenienssi tarkistetaan, ei tuontikuvaa tietyn paikallisen ravintolan annokseksi.

### O3 — Julkinen metsä ja suljettu kuntoutus

**P1:n nykyinen sääntö:** eläinsanctuary on yleisöltä suljettu; metsä-/vierailualue on erillinen. Opas ei lupaa pelastettujen eläinten näkemistä tai vapautusta. Julkisilla reiteillä annetaan eläimille tilaa, niitä ei ruokita eikä mennä No entry -alueille (P3/P1). Lingadzi on tämän metsäkohteen joki; ei Lilongwe-joen kaukaisen suupisteen reitti. Todelliset pääsy-/aukioloehdot tarkistetaan ylläpitäjältä; ei aukioloaikoja tai maksuja leipätekstiin.

### O4 — Liikenne, varovaisuus ja sää

UM **18.9.2026**: tavanomainen varovaisuus, liikenne merkittävin käytännön riski. Pimeällä ja yksin liikkumista vältetään, matkustamiseen valitaan luotettava järjestely; pakettiauton lavakyytien turvallisuutta ei luvata. Vasemmanpuoleinen liikenne (O2). Ei pikkurikosten kertomusta tai turistin kasvojen kuvitusta.

**Sääpoiminta on lähderistiriitainen:** S1:n 1991–2020-otsikko vs sateen DWD 1961–1990-viite. Alkuperäinen `saa.json` on luettu, sitä ei palauteta/hylätä tämän agentin toimesta. Ennen pääsession ratkaisua **ei sarjan aste-/mm-/kuukausivertailuja tai sen luonnehdintaa teksteihin**. O2:n käytännön ennusteen/vesi-/sähkökatkojen ohje ei ole uusi ilmastonormaali.

### O5 — Saapuminen ja palvelujen ajantasaisuus

**Kamuzu International Airport / Lilongwe International Airport, LLW** (S9/O1), pohjoisempi erillinen kenttä, ei vanhan torin koordinaatissa. Ei lentoyhtiö-/lähtölista-/hintalupausta. S1 mainitsee rail service, mutta O2:n nykyinen ohje sanoo ”junaliikennettä ei ole”; tämä opas ei tarjoa henkilöjunareittiä. Historiallinen rata ja nykyinen matkustajapalvelu ovat eri väitteitä, tavaraliikennettä ei päätellä olemattomaksi yhden oppaan perusteella.

Terveys-/viisumi-/vakuutusehdot tarkistetaan ennen matkaa (O2), ei yleinen lupaus viisumivapaudesta tai hoidon saatavuudesta. UM kertoo Norjan Lilongwen-suurlähetystön avustavan myös suomalaisia; ei arvattua osoitetta tai henkilöä. Kuvausrajoitukset, erityisesti viranomais-/lentokenttäkohteissa, tarkistetaan (O2).

**Parasta 5 -aihevara:** kaupunginosien eri kerrokset; Old Townin arkinen kaupankäynti; nsima-perinne; julkiset metsäpolut ylläpitäjän ehdoin; metsän puiden/lintujen tarkkailu. Ei suljettua eläinhoitolaa tai modernia veistosta suojavapaana nähtävyytenä.

**Hyvä tietää 4:** tavanomainen varovaisuus/liikenne; kuntoutus ja julkinen metsä eri; Lingadzi ja Lilongwe eri jokirooleja; lentokenttä ja keskustan aluepiste eri. Vähintään kolme tuoretta opaskuvaa B:ssä, enintään kaksi kuvatonta jaksoa.

## 5. Kartan rajattu selvitys — 6–8 hyväksytyn paikan joukko puuttuu

Ydin on vanha kaupankäyntialue ja sen välitön luonnonympäristö. Uutta Capital Hill -aluetta, lentokenttää, jokisuuta tai koko joen/City Centre -kaupunginosan yleispistettä ei oteta yksittäisen rakennuksen/aukion/rantapaikan pisteeksi. Kaupunki on suuri; pienen pääkaupungin poikkeusta ei oleteta. Ei lopullista `rajat`-laatikkoa yhdestä varmuudella lähteistetystä luontopaikasta.

### N1 — Lilongwe Wildlife Centren metsäalue — luonto, lähteistetty paikkarooli

**−13.97221, 33.78386**, WD Q23808334; oma S4:n WP **−13.97222, 33.78389** sama alue. Ei vastaanotto/portti/kuntoutusrakennuksen tarkka piste.

Faktat S4/P1–P3: (1) keskuksen metsäalue Lilongwessa; (2) se sijaitsee Old Townin ja City Centren välissä; (3) julkinen pääsyrooli Kenyatta Roadin kautta eri kuin hoitoalue; (4) Acacia/Combretum-metsä; (5) Lingadzi-joki halkoo vierailu-/metsäympäristöä; (6) luonnonvaraiset vervet-ryhmät erillisiä kuntoutuseläimistä; (7) rantaympäristön lintulajeja, myös hamerkopit; (8) ympäristökasvatus/kävelyreitit; (9) eläinhoitolan suljettu osa ja taideteokset eivät sisälly ”vapaa luonnonkohde” -väitteeseen.

**1873:** nykyistä kuntoutus-/vierailukeskusta ei ollut; metsän yksittäisen puun, polun, lajilistan tai nykyisten rajojen säilymistä tuosta ajasta ei väitetä. Metsä on sallittava fyysinen luontopaikka, ei uuden rakennetun monumentin kiertotapa. **N1:n aluekohtainen lähdeportti täyttyy, kuva ja nykyiset toiminnalliset rakennus-/taideteokset tarkistetaan B/D:ssä.** S4:n ”part of Lilongwe National Park” ei vahvistettu viralliseksi kansallispuistoluokitukseksi, joten se ei peliin.

### N2 — Civo Stadium — toiminnallinen urheilupaikka, historia-/tekijäportti avoin

WD **−13.97825, 33.75861**, Q5124788. Oma S7:n WP-infolaatikko **−13.97821, 33.75864**, footer **−13.97825, 33.75861**; pieni julkaistu paikkavariaatio, ei keskiarvoa. Paikka Lilongwessa, aiempi Stade des Jeunes -nimi, urheilustadion, CIVO-seuran kenttäyhteys, myöhempää korjausrakentamista ja suurten otteluiden käyttöä.

Tarkka kapasiteetti, katsomoiden/korjausten suunnittelijat, alkuperäisen rakentamisen historia ja nykyisten osien ketju puuttuvat. **6–10 riittävää historiallisen paikan faktaa ei muodostu pelkästä kapasiteetista/kotikenttälistasta.** Tavanomainen urheilutoiminto ei automaattisesti ole teos, mutta luovaa katsomoarkkitehtuuria ei hyväksytä ilman arviointia. Vuoden 1873 stadionia ei keksitä. **N2 partial.**

### N3 — Maula-katedraali — rakennus, tekijä-/historiaportti avoin

WD Q23928773 **−13.97959, 33.76248**, oma P625. S6 ei esitä omaa WP-pistettä. Luetut faktat: Maula / Our Lady of Africa / Cathedral of Lilongwe -nimet, katolinen kirkko, arkkihiippakunnan instituutio, Central Region, M1/Civo lähellä. Nykyinen johtaja- ja papiston nimiluettelo ei kohdefaktaksi tai historiallisen ulkonäön todisteeksi.

Oma piste löytyy, mutta rakennusaika, suunnittelija, nykyiset alkuperäiset/korjatut osat ja 6–10 historiapohja puuttuvat. Instituution ikä ei rakennusteoksen kuolin-/suoja-ajan todiste. Ei automaattista kuvalupaa tai vuoden 1873 kirkko-/vierailuväitettä. **N3 partial.**

### N4 — Vanhan kaupungin tori — rakennus/aukiorooli vielä täsmennettävä

S1/P4 todistavat vanhan kaupankäyntikeskuksen ja kunnallisen raportin Lilongwe Main Market -nimen. **Oma WP/WD-torin piste ei löytynyt.** Old Townin/City Centren yleispiste, bussiaseman O1-piste, jokisuun piste tai rakennuksen julkisivukuva eivät sama asia. Torin tarkka fyysinen nimetty rakennus/aukio, perustamishistoria ja 6–10 kohdefaktaa eivät valmistuneet. En-WP `Lilongwe Market` 404.

Vuoden 1873 samaa toripaikkaa/kiveystä/katua ei tunneta. Moderneja toria vasten olevia suojattuja rakennuksia ei tehdä kohteeksi torin nimellä. **N4 partial.**

### N5 — Lilongwe-joen paikallinen rantapaikka — luonto, ei karkeaa suupistettä

S5 sanoo joen virtaavan Lilongwen kautta ja nimeää Dzalanyaman lähtöalueen. Oma WP/WD **−13.78333, 34.41667** koskee kaukaista joen suu-/aluepistettä, ei keskustan uutta rantapaikkaa. Ei nimettyä tarkkaa puistoa/rantapolkua omine WP/WD-pisteineen ja 6–10 paikallisfaktoineen.

LWC:n joen nimi on **Lingadzi** P1/P3:ssa. Sen luontopolkua ei siirretä Lilongwe-joelle vain kaupungin nimen perusteella. Ei vuoden 1873 siltaa tai jokivarsirakennusta arvaamalla. **N5 ei karttaan tällä yleispisteellä.**

### N6 — Old Town Hall / vanha hallintotalo — rakennus, tunnistus puuttuu

Nimi esiintyy S3:n epävarmassa listassa/hakukatkelmissa, mutta tässä ei saatu luettua omaa WP/WD-kohdetta, rakennus-/tekijäketjua tai 6–10 paikkafaktaa. Kaupungin nykyinen LCC-osoite on City Centre, ei todiste nimetystä vanhasta rakennuksesta. **Ei N-kohde tässä paketissa**, eikä vuodesta 1902 päätellä tietyn nykyisen rakennuksen ikää.

### N7 — Bingu National Stadium — nykyinen rakennus, tekijä-/ydinrajaus avoin

Oma S8/WD Q28457050 **−13.94383, 33.75318**. Uusi urheilurakennus vanhan keskustan pohjoispuolella. P84:ssa on yritys Q30947660, ei yksittäisten suunnittelijoiden kuolin-/suoja-aika. Vanhan paikan historia, luovien osien ketju ja historiallisen ydinkartan perustelu puuttuvat.

Modernius ei yksin tee tavallisesta toiminnosta kiellettyä, mutta modernin katsomon/arkkitehtuurin lupaa ei päätellä urheilutapahtumasta tai yritysnimestä. Ei tämän rakennuksen kuvaa/kohdetta 1873 tai suojavapaana. **N7 ei hyväksytty keskustakohde.**

### N8 — Luonnonsuojelualueen ja metsävarannon nimi — alias/rajat avoin

Lilongwe Nature Sanctuary / Lingadzi-Namilomba Forest Reserve esiintyy taustoissa, mutta omat en-WP-sivut 404. O1 puhuu myös vanhasta sanctuary-alueesta tien vastakkaisella puolella; P1/P3 esittävät nykyisen vierailu-/hoitoalueen yhtenä karttana. **Niitä ei lasketa varmuudella kahdeksi erilliseksi karttakohteeksi** tai samoiksi juridisiksi suojelurajoiksi. Ei omaa uuden erillisen kohteen WP/WD-pistettä ja faktapakettia. Metsä-/keskuksen N1-rooli riittää tähän rajattuun näyttöön.

### Muut poisjätöt kartalta

- **City Centre**: kaupunginosa/township, ei yksi rakennus/aukio/luontopaikka. S3:n piste-/maakuva-/historiaerot tekevät käytöstä epävarmaa; ei pistettä parlamentin, torin, pankin tai mausoleumin sijaan.
- **Kamuzu-mausoleumi, Banda-patsas, maailmansodan muistotorni, uusi parlamentti, modernit eläinveistokset**: institutionaalinen nimi tai kuvassa oleva tunnistettu teos ei ohita tekijä-/suoja-ajan ja kohdelajin porttia. Patsaat eivät kohdelajeja tässä. Ei täytepisteitä.
- **Bunda, Dzalanyama, laaja joen lähtö-/suualue ja lentokenttä**: keskustan historiallisen ytimen ulkopuolista retki-/liikennegeografiaa; ei kartan vähimmäismäärän täyttämiseksi.
- **Herbarium/botanic gardens**: oma tässä luettu Lilongwen haarakohde/piste ei löytynyt; ei muun kaupungin päätoimiston koordinaattia Lilongwen puutarhaan.

## 6. Viisi kysymysaihetta ja kolme tietoa

1. **Taso 1:** mikä on Lilongwen aluetta kuvaava nimeämistapa? Area ja numero (S1), ei tarkkaa numeron perustamisvuotta.
2. **Taso 1–2:** mistä nsima tavallisesti valmistetaan? Maissijauhosta (S10/P7), kuva ei tekstillä anna vastausta.
3. **Taso 2:** miksi kuntoutuksen sanctuary ei ole yleisöeläintarha? Eläimille halutaan säilyttää villi käyttäytyminen ja ihmiskontaktia rajoitetaan (P1).
4. **Taso 2–3:** mitä vervet-ryhmän turkinhoidossa poistetaan? Likaa ja loisia (P3/S13).
5. **Taso 3:** mikä osa puustosta muodostaa latvuskerroksen? Puulatvukset (S15/P3).

C tekee neljä uskottavaa vaihtoehtoa, oikea ei ainoa pitkä; vihje ei paljasta ratkaisua. H3:n katon minitehtävä ei sama visakysymys. Ei nopeuksien/pesämateriaalin/tree-countin ulkolukua.

Tietoaiheita:

- Samalla metsäalueella on luonnonvaraisia eläimiä ja erillinen suljettu kuntoutusosa (P1/P3).
- Nsima voi nimetä sekä ruoan että laajemman kulinaarisen perinteen (P7).
- Vanhalla torialueella ja uudella pääkaupunkikeskuksella on eri kasvuhistoria; kaikkia vanhoja kaupungin nimiä ei siirretä uuteen keskustaan (P4/S1).

## 7. Kuvatarpeet, ei valintoja

Commons PD/CC0/CC BY/CC BY-SA, vähintään 1 200 px, todellinen alkuperäinen tekijä/lisenssi ja jokainen kuva katsottu B/C/D. Luettavat **ihmiskasvot**, lisätyt merkit/leimat/signeeraukset/kehykset ja mainos/pakkauskuvat pois. Eläinkasvot eivät ihmisten kasvosääntö, mutta laji ja paikka pitää tunnistaa. Sama tiedosto kerran kaupungissa.

| Kohta | Tarve/hakusanat | Roolin tarkistus |
|---|---|---|
| Kansi 1 | Old Town Lilongwe wide street | oikea kauppaydin, ei väärä City Centre -kuva |
| Kansi 2 | Lilongwe public woodland wide | laaja luontokaupunkinäkymä, ei moderni veistos metsän sijasta |
| Kansi 3 | Lilongwe city landscape | eri puoli, ei yksittäisen suojatun rakennuksen pääkuva automaattisesti |
| K1 | numbered neighbourhood street / wide urban view | ei piirtämätön numerosta laskettu karttapiste tai 2030-kaava nykykaupunkina |
| K2 | nsima meal | ruoka tunnistettu, ei tietyn Lilongwen ravintolan väite yleiskuvasta |
| K3 | produce market or agricultural produce | todellinen kaupunki/rooli tai selvästi yleinen havainne, ei faces/mainos |
| K4 | rehabilitation species / lawful forest photo | ei suljetun hoitolan kierroksen lupaus tai vieraita kesytettyjen eläinten kanssa |
| H1 | Combretum molle fruit/leaves | lajin tunnistus, ei lääkevalmiste tai eri puulaji |
| H2 | wild vervet / grooming | oikea eläin/rooli, ei nimetty paikallinen yksilö arvaamalla |
| H3 | hamerkop or roofed stick nest | lajipesä tunnistettu, ei kuningaskalastaja tai keinotekoinen veistos |
| H4 | canopy / leafy natural habitat | oikea latvus, ei toisen maan kuva nimettynä LWC:n paikaksi |
| Matkailijalle | tuore yksi luonnon-/arki-aihe maltillisena pystynä | suhde 0,60–0,85; ei sculpture/tornikuvaa oletetulla poikkeuksella |
| Opas | vähintään 3 tuoretta kuvaa | enintään 2 kuvatonta jaksoa, historialliset eivät nykyoppaaseen |
| N-kohteet | vasta hyväksytyt kohteet | N1:n metsäkuva ei automaattisesti N2–N8:n kuva tai paikkatodiste |
| Valokuva | yksi kaupunki-/metsä-/ruokakuva oikealla roolilla | kuvaa vastaava kysymys, ei field-map väärälle paikalle |
| Ennen–nyt | vain todellinen 1870-luvun PD-vedos ≥1 200 px | myöhempi pääkaupunkikuva ei vuoden 1873 kuva |

**P3:n modernit taideteokset:** Samuel Ndalema (romumetalli) ja Chisomo Lifa (kierrätetty muovi). Työkohtainen/suoja-/lisenssiketju ei ole hyväksytty, joten niitä ei valita luontokohteen pääkuviksi tai omiksi kohteiksi. Latvuspolku on toiminnallinen kulkurakenne, mutta kuvaan osuva teos/rakennus arvioidaan B:ssä, A ei myönnä kuvalupaa. PDF:n kartta/valokuvat/sivut eivät Commons-valintoja.

## 8. Ristiriidat ja ratkaisut

1. **Vanha ja uusi ydin:** S1/P4 erottavat Old Townin ja uuden City Centre/Capital Hillin. S3 lainaa koko kaupungin 1902-kertomuksen City Centren syntyyn; sen erilliset prosentti-/väestö-/rotutaulukot eivät tässä lähteistettyjä. P4:n alkuperäiskaava voittaa kaupunkirakenteen roolissa.
2. **S3:n väärä maakunta/pisteet:** infolaatikko Southern Region vs S1:n Central Region; header/WD −13.983, 33.783 vs body −13.9629, 33.7704. Ei hiljaista valintaa yksittäisille rakennuksille; koko S3:n epävarma alue-data pois.
3. **1873:** boma-/hallintokeskuksen 1900-luvun alun aineisto ei määritä sitä edeltävän alueen täydellistä asutusta tai samaa toria. Ei tyhjästä perustettua maailmaa tai nykyistä ”old” rakennusta matkavuoteen.
4. **Sääkausi:** S1 otsikko **1991–2020**, Source 2 kuitenkin DWD **precipitation/precipitation days/humidity/daily sun**, viite **Baseline climate means 1961–1990, Lilongwe Int. Flugh. Kamuzu**. Sadetta ei hyväksytä yhtenäiseksi 1991–2020-normaaliksi tämän perusteella.
5. **Sääviitteen todistus:** `city.html`, revisio 1378621524; luettavassa `city.txt` otsikko rivillä 458, Source-rivit 613–614, MeteoClimat-viite 673, DWD-viite 677. DWD-PDF robots-kielletty, ei väitettä sen lukemisesta. Source 1:n MeteoClimat-tittelissä 1991–2020 mutta retrieved 15 Oct 2017: vanha viitepäivä ei yksin todista nykyisen dynaamisen datan virhettä, mutta ei myöskään ole nykyisen peruskauden alkuperäisvarmennus. Ei korjausta/varmistusta sääpalvelun periodittomasta portaalista.
6. **Säälukujen scope:** S1:n DWD-lähde Kamuzun kansainvälinen lentokenttä, S9:n kenttä pohjoisempana −13.78917,33.78083 kuin kaupungin yleispiste −13.99,33.77. Täsmäasema/kausi pitää nimetä; kaupungin koordinaatti ei automaattisesti mittausasema. Pääsessiolle, ei oman agentin saa.json-editointia.
7. **Eläimiin pääsy:** P1 yleisöltä suljettu sanctuary; vanhat/copy-markkinoinnin eläinretkilupaukset eivät ajantasaisia. Julkinen metsä ja luonnonvaraiset eläimet erillinen käyntirooli.
8. **P3:n ajat:** vanha PDF sanoo daily, nykyinen P1 erottaa päivien/palvelujen ehdot; **ei aukioloaikoja peliin**. Käyntiehdot ylläpitäjältä ennen matkaa.
9. **Joen nimi:** P1/P3 **Lingadzi**, S5 **Lilongwe River**, joiden eri rooleja ei sekoiteta. Lilongwe-joen kaukainen mouth-piste ei metsä-/kaupunkiranta eikä N1:n uusi piste.
10. **Lintulaji ja virheherkkä opas:** P3:n tarkka duiker 96 km/h ja kuningaskalastajan ”fishing blind” eivät uuteen tekstiin ilman riippumatonta biologista tukea. Hamerkop-lajijuttu S14:n yleisfaktoista, paikallinen esiintyminen P3:sta. Kuvan lintu ei ”hamerkop” vain yhteisen river-otsikon vuoksi.
11. **Tree count/hedelmäsiivet:** P3:n tarkat puu-/lintulajimäärät ja neljä siipeä eivät kaksi riippumatonta paikkamittausta. Luonnon monimuotoisuus voidaan kertoa ilman uusia laskentaväitteitä; siipimäinen hedelmä ilman määrää. Ei lääkkeen reseptiä.
12. **Luontokeskus/national park:** S4:n promotional/conflict-of-interest-luonne ja ”Lilongwe National Park” eivät virallinen suojelualuestatus. P1/P3 varmentavat fyysisen metsän/vierailu-/hoitoroolin, juridista puisto-/sanctuary-rajaa tai rinnakkaisten alueiden määrää ei keksiä.
13. **Civo:** kaksi omaa läheistä WP-pistettä ja WD, ei uusi sisäänkäynti keskiarvolla. Kotiseuran vanhaa nimeä, korjausvuotta/kapasiteettia ei nykyiseksi service/suojavapaudeksi. Rakennus/paikkahistoria vähäinen.
14. **Maula ja modernit rakennukset:** instituution arkkihiippakuntarooli ei rakennuksen tekijän kuolin-/suoja-aika; P84 puuttuu, ei vapaus. Yritys P84:ssa ei yksittäisen suunnittelijan kuolema. Metsä-/aukion nimi ei modernin teoksen poikkeus.
15. **Rata:** S1 rail service vs O2 ”junaliikennettä ei ole”; nykyistä henkilöjunaa ei luvata, historiallisen raiteen ja tavaraliikenteen tarkka tila erillinen. Ei vanha kartta lippulupaukseksi.

## 9. Poisjätöt ja jatkotoimet

- Nykypolitiikka, Cashgate, rikos-/metsästys-/laittoman kaupan kertomukset ja nykyisten poliitikkojen elämäkerrat pois. Eläinten welfare/kuntoutuksen käytännöt voidaan selittää ilman rikostapausta.
- Ei epävarmaa rotu-/kieli-/väestöprosenttitaulukkoa S3:sta tai vailla omaa lähdettä olevaa Lilongwe National Museum -kohdetta. Kortteli-/sektori ei yksi N-paikka.
- Suojatun teoksen, uuden arkkitehtuurin, persoonan kuvan ja tavallisen toiminnallisen rakenteen/luonnonpaikan erot säilyvät. Modernius ei yksin estä luontoa tai kaupankäyntiä; yksittäinen moderni taideteos ei vapaudu sillä.
- Ei yö-/lava-/junalupauksia, hintaa, maksuohjetta, ravintolamainosta, aukioloaikaa tai terveystakuuta. Nykyiset maahantulo- ja pääsyehdot ennen matkaa.
- Kartan vähimmäismäärää ei täytetä joen suupisteellä, kaupungin hallinto-/uuskeskustan pisteellä, maatilan retkellä tai saman metsäalueen aliasnimillä. Ei luotua 1873-siltaa/kadunnimeä/asukasta.

**A partial:** N1:n luontopaikan lähdepaketti käyttökelpoinen, mutta 6–8 hyväksyttyä historiallisen ytimen kohdetta omine WP/WD-pisteineen ja historiapohjineen puuttuu. Sääkauden ristiriita pääsessiolle, kuva-/rakennusketjut B/D:lle. Tämän hyödyllisen lähdepaketin olemassaolo ei ole valmis A-vaihe tai pelitoimitus.
