# Pääkaupunkilehden pistokoe: MANAMA (erä e03, 11.10.2026)

Tarkistaja: Sonnet-agentti. Aineisto (vain luku): `pk-e03b/paakaupungit-pilvi/e03/manama/` (sisalto.json, faktapohja.md, kuvat.md, tarkistus.md, konteksti.json). Aineistoon ei ole tehty korjauksia; kaikki "Korjattu lause" -rivit ovat ehdotuksia. Lehti sijoittuu isoisän vuoteen 1873, mutta kertoo nykyajasta, joten väitteet on arvioitu nykytiedon mukaan ja lisäksi 1873-uskottavuuden kannalta (helmenpyynti, brittiläinen suojeluksenalaisuus 1861 alkaen).

Menetelmä: kolme nostoa valittu luku- ja vuositiheyden mukaan: `kaupunkilehti[0].nostot[1]` (Kaksi kaupunkia kahdella saarella), `kaupunkilehti[0].nostot[2]` (BWTC) ja `kaupunkilehti[1].nostot[2]` (Durand-kivi). Lisäksi kaikki viisi `kysymykset[].fact` ja artikkelin väestöluku (laajuus) sekä kolme artikkelin 1873-ajan väitettä. Jokainen väite on tarkistettu vähintään kahdella itsenäisellä lähteellä, kun sellainen on ollut saatavilla: Wikipedia (en) + Bahrainin kulttuuri- ja muinaisesineviranomainen BACA (culture.gov.bh), Qatar Digital Library (India Office -arkisto ja Bahrainin hallituksen vuosikertomus, hakutuloksen kautta), UNESCO (hakutuloksen kautta), Skyscraper Center/CTBUH, Building-lehti, IET, Gulf Construction, Aramco World, Carlsberg-säätiö/Kuml (Moesgaard), Gulf Labour Markets and Migration (GRC, IGA:n väestölaskenta), Fanack, Bahrain Pearling Path -sivusto. Wikipedian kieliversioita ei ole laskettu itsenäisiksi. Haku vain WebSearch/WebFetch, yksittäisiä sivuja, ei massahakua; robots.txt:ää ei haettu erikseen (työkalut noudattavat sitä). 403/404: Britannica (403), whc.unesco.org (403), qdl.qa (403), qscience.com (403), en.wikipedia.org/wiki/Sheikh_Hamad_Causeway (404) = "hakutuloksen kautta" (tieto hakukoneen otteesta, alkuperäissivua ei avattu). Commons-tiedot haettu Commonsin API:sta (extmetadata, yksi pyyntö kerrallaan, tunnistautuen) ja kuvat katsottu 960 px:n esikatselukuvina Read-työkalulla. Ilmastolukuja ei tarkistettu. Poliittinen sanasto neutraalia; 2011 tai nykypolitiikkaan ei kosketa.

## 1. Yhteenveto

Väitteet (29 väitettä tai väiteryhmää): **OIKEIN 18, EPÄTARKKA 9, VIRHE 2.**

Kuvat (3 tarkistettua: kansi, nosto, yksi muu): **OIKEIN 2, EPÄTARKKA 1, VIRHE 0.** Tiedostot ovat kaikki Commonsissa, lisenssit (CC BY-SA 4.0) ja tekijät (Zairon, Zairon, Droodkin) täsmäävät lähderiveihin. Ei kasvoja (kaukana olevat jalankulkijat ja melojat eivät ole tunnistettavia), ei väkivaltaa, ei PD-kuvaa (ei kuolinvuosiriskiä). Durand-kiven kuvateksti jättää kertomatta, että kuvassa on jäljennös.

Kahdeksan huomionarvoista löydöstä:

1. **Durand-kivi "on esillä kansallismuseossa" (VIRHE, kaksi paikkaa).** Bahrainin kulttuuriviranomainen (BACA, 2016) kertoo, että Durand vei kiven Lontooseen, jossa se tuhoutui toisessa maailmansodassa; jäljennökset ovat Bahrainin kansallismuseossa ja British Museumissa. Wikipedia (Insollin ja Belgraven aineiston varassa) ja Commons-kuvaus (kuva on "replica") sanovat samaa. Kuvassa on siis jäljennös.
2. **"Kaupunkien välillä oli puusilta" (VIRHE).** Vain Wikipedia sanoo "old wooden bridge". Qatar Digital Libraryn arkistot (Bahrainin hallituksen vuosikertomus 1941, sotilasreittikirja 1939) kertovat korallikivipengertiestä, jonka työ alkoi 1929–30, ja 1941 valmistuneesta kääntösillasta pengertien aukossa. Ennen sitä ylitettiin veneillä, kahlaamalla tai aaseilla.
3. **"Kauppa toipunut täysin 1873" (EPÄTARKKA, neljä paikkaa).** Pelkkä Wikipedia (lähteetön virke), ei vahvistusta toisesta lähteestä. Toistuu johdannossa, artikkelin johdannossa ja nostossa; lause on näkyvä, koska se sitoo kaupungin isoisän vuoteen.
4. **Pengertie "noin kolme km" (EPÄTARKKA).** Manamaa ja Muharraqia yhdistää kolme pengertietä; Britannica antaa 2,5 km, Wikipedia 2,8 km, Shaikh Isa -pengertie on 2,5 km.
5. **Tuulitunnelikokeet ja "kapea sektori" (EPÄTARKKA, lievä).** Lähteet (Wikipedia, Gulf Construction/Structurae) sanovat: virtaus pysyy lähes kohtisuorassa turbiineihin, kun tuuli tulee enintään 45 asteen kulmassa akselista (Building-lehti: tornien siivet suoristavat jopa 60 asteen kulmasta tulevan tuulen). Se on 90–120 asteen sektori, ei kapea.
6. **"Kaksoiskaupungit muodostuneet 1800-luvulla" (EPÄTARKKA).** Wikipedia sanoo "founded simultaneously in the 1800s", mikä on ristiriidassa saman artikkelin 1345-maininnan kanssa; lause on parafrasoitu eri merkitykseen.
7. **UNESCO-kohteen nimi (EPÄTARKKA).** Maailmanperintökohde on "Pearling, Testimony of an Island Economy" (2012); "Bahrain Pearling Path" on matkailureitin nimi, ja kohde on 17 rakennusta Muharraqissa, kolme osterikenttää ja Qal'at Bu Mahir, ei koko vanhakaupunki.
8. **Durand-kiven päätelmälause (EPÄTARKKA).** Kiven kirjoitus ei mainitse Dilmunia (vain Rimumin, Inzakin palvelijan), joten "savitaulut ja kiveen kirjoitettu nimi kertovat, että Dilmun tunnetaan kirjallisista lähteistä" on päättelyä, ei lähteen sanoja.

**Toistuvan virhetyypin arvio (yksi rivi):** yhden lähteen (Wikipedia) yksityiskohta tai tulkinta toistetaan varmana ilman toista lähdettä (silta, kaksoiskaupungit, "toipunut täysin", Palgrave, "esillä"), ja lisäksi lähteen sanoja on tarkennettu tai yleistetty (kapea sektori, pengertie, Pearling Path); lukuvirheitä on vähän, VIRHEET molemmat ovat "esine tai rakenne, jota ei ole sellaisena kuin teksti väittää".

## 2. Väitetaulukko

Polut ovat sisalto.json:n polkuja. "A" = `kaupunkilehti[0].nostot[1]`, "B" = `kaupunkilehti[0].nostot[2]`, "C" = `kaupunkilehti[1].nostot[2]`.

| # | Väite | Polku | Tulos |
|---|---|---|---|
| A1 | Manama ja Muharraq ovat lähteen mukaan muodostuneet nykyisiksi kaksoiskaupungeiksi 1800-luvulla | A.teksti; artikkeli.intro | EPÄTARKKA |
| A2 | Muharraq oli Bahrainin pääkaupunki ennen Manamaa; Manama oli kauppakaupunki ja portti pääsaarelle | A.teksti; kysymykset[4].fact | OIKEIN |
| A3 | Muharraq nousi etualalle puolustettavan sijaintinsa vuoksi (syy-seuraus) | A.teksti | EPÄTARKKA (lievä) |
| A4 | Kaupunkien välillä oli 1900-luvun alkupuolella puusilta | A.teksti | **VIRHE** |
| A5 | Nykyään niitä yhdistää noin kolmen kilometrin pituinen pengertie | A.teksti | EPÄTARKKA |
| A6 | Lentoasema Muharraqin saarella, noin seitsemän kilometrin päässä Manaman keskustasta | A.teksti; kysymykset[4].fact | EPÄTARKKA (lievä) |
| A7 | Muharraqin vanha kaupunki kuuluu UNESCOn maailmanperintökohteeseen Bahrain Pearling Path | A.teksti | EPÄTARKKA |
| B1 | BWTC:n kaksoistornit yli 200 m, valmistuivat 2000-luvun lopulla | B.teksti | OIKEIN |
| B2 | Lähteen mukaan ensimmäinen pilvenpiirtäjä maailmassa, johon tuuliturbiinit on suunniteltu osaksi rakennetta | B.teksti; kysymykset[1].fact | OIKEIN (huom.) |
| B3 | Tornit yhdistävissä silloissa on tuuliturbiinit | B.teksti, .selite; kysymykset[1] | OIKEIN |
| B4 | Purjeen muotoiset tornit ohjaavat Persianlahden tuulen turbiinien läpi | B.teksti | OIKEIN |
| B5 | Tuulitunnelikokeiden mukaan tuuli pysyy sopivassa kulmassa, kun se tulee kapeasta sektorista keskiakselin suunnasta | B.teksti | EPÄTARKKA (lievä) |
| B6 | Turbiinien odotettiin tuottavan murto-osan tornien sähköstä; rakennus voittanut kestävän rakentamisen palkintoja | B.teksti | OIKEIN |
| C1 | Qal'at al-Bahrainilta kaivauksilla löytynyt kymmeniä savitauluja | C.teksti | OIKEIN (huom.) |
| C2 | Durand-kivi löydettiin 1800-luvulla | C.teksti, .selite | OIKEIN |
| C3 | Kivessä esiintyy Dilmunin kuninkaan Rimumin nimi | C.teksti | OIKEIN (huom.) |
| C4 | Kivi on esillä kansallismuseon Dilmunin salissa | C.teksti, .selite | **VIRHE** |
| C5 | Salissa leimasinsinettejä sekä Barbarin ja Saarin temppelien esineitä | C.teksti | OIKEIN (huom.) |
| C6 | Ensimmäiset kaivaukset Qal'at al-Bahrainilla teki tanskalainen retkikunta 1950-luvulta alkaen | C.teksti | OIKEIN |
| C7 | Savitaulut ja kiveen kirjoitettu nimi kertovat, että Dilmun tunnetaan nimenä kirjallisista lähteistä | C.teksti | EPÄTARKKA |
| Q0 | Manama Bahrainin pääsaaren koillisrannikolla Persianlahdella | kysymykset[0].fact | OIKEIN |
| Q1 | BWTC lähteen mukaan ensimmäinen pilvenpiirtäjä, johon tuuliturbiinit suunniteltu osaksi rakennetta | kysymykset[1].fact | OIKEIN (huom.) |
| Q2 | Nimi mainitaan ensi kerran käsikirjoituksessa, joka ajoitetaan 1300-luvulle (hint: Hormuzin sivuvaltio) | kysymykset[2].fact/.hint; A-nosto `kaupunkilehti[0].nostot[0].teksti` | OIKEIN |
| Q3 | Beit Al Quranin kokoelma kattaa kalligrafiaperinteen ensimmäiseltä hidžran vuosisadalta nykypäivään | kysymykset[3].fact | OIKEIN (huom.) |
| Q4 | Muharraq oli pääkaupunki ennen Manamaa; saarella lentoasema (hint: 1800-luvun helmenpyynnin keskus) | kysymykset[4].fact/.hint | OIKEIN |
| P1 | Manaman kuvernementissa asui 2020 noin 548 000 ihmistä (laajuus) | artikkeli.intro | OIKEIN |
| P2 | Isoisän matkavuonna 1873 Manaman kauppa oli lähteen mukaan toipunut täysin | artikkeli.intro; kaupunkilehti[0].johdanto; kaupunkilehti[0].nostot[0].teksti | EPÄTARKKA |
| P3 | Brittiläinen tutkija kuvasi kaupunkia 1860-luvulla: muutamia raunioituneita kivirakennuksia, kalastajien ja helmenpyytäjien majoja | artikkeli.teksti | EPÄTARKKA (lievä) |
| P4 | Manama pysyi pienenä kauppasatamana, kunnes portugalilaiset valtasivat sen 1500-luvun alussa | artikkeli.intro; kaupunkilehti[0].nostot[0].teksti | OIKEIN (huom.) |

Kuvat:

| # | Kuva | Tulos |
|---|---|---|
| K1 | Kansi: Manama Skyline of West Manama 2.jpg | OIKEIN (huom.) |
| K2 | Nosto B: Manama Bahrain World Trade Centre & Bahrain Financial Harbour 2.jpg | OIKEIN |
| K3 | Nosto C: Durand Stone.jpg | EPÄTARKKA |

## 3. Perustelut lähteineen ja korjatut lauseet

### Virheet

**A4. Puusilta (VIRHE).** Wikipedia (Manama, tieliikennekappale): "a bridge connected Manama to Muharraq since 1929, a new causeway was built in 1941 which replaced the old wooden bridge." Arkistolähteet kertovat muuta. Bahrainin hallituksen vuosikertomus 1360 (1941–42): 1929–30 aloitettiin kivinen pengertie, jonka sivumuurit tehtiin korallikivilohkareista, ja 1941 valmistui Manaman–Muharraqin kääntösilta syvän uoman yli, joka yhdisti pengertien kaksi päätä (qdl.qa, hakutuloksen kautta, 403). Britannian sotilasreittikirja 1939 odotti 130 jaardin aukon yli kääntösiltaa (qdl.qa, hakutuloksen kautta). Brittiarkisto: ennen pengertietä ylitettiin veneillä, kahlaten tai aaseilla. BACA (culture.gov.bh 6.10.2021) kutsuu Shaikh Hamad -pengertietä Bahrainin ensimmäiseksi moderniksi sillaksi, ei mainitse puuta. "Puusilta" on siis yhden lähteen väite, jota arkistot eivät tue. Lähteet: https://en.wikipedia.org/wiki/Manama ; https://qdl.qa/archive/81055/vdc_100024140828.0x000011 ; https://culture.gov.bh/en/mediacenter/news_center/2021/October2021/Name,19813,en.html .
- `.kaupunkilehti[0].nostot[1].teksti`. Korjattu lause: "Kaupunkien välille rakennettiin 1929–1941 korallikivinen pengertie, jonka aukkoon tuli kääntösilta; ennen sitä ylitettiin veneillä, ja nykyään saarten välillä on kolme pengertietä."

**C4. Durand-kivi on esillä (VIRHE).** BACA (kulttuuriministeriön uutinen marraskuu 2016): Durand löysi kiven 1879 Bilad al-Qadimin moskeijan seinästä, vei sen Lontooseen, "where it was destroyed in World War II", ja jäljennökset ovat Bahrainin kansallismuseossa ja British Museumissa. Wikipedia (Durand Stone, viittaa Insollin 2013 kirjaan, Belgraven tietoihin): alkuperäinen tuhoutui toisessa maailmansodassa, jäljennös museossa. Commons-kuvaus `Durand Stone.jpg`: "photograph of a replica … original was said to be destroyed during World War II". BACA:n Dilmun-salisivu ei mainitse kiveä lainkaan (nimeää leimasinsinetit, Barbarin temppelin aarteet, Saarin asuinpaikan löydöt, keramiikan). Lähteet: https://culture.gov.bh:443/en/mediacenter/news_center/2016/November2016/Name,13962,en.html ; https://en.wikipedia.org/wiki/Durand_Stone ; https://commons.wikimedia.org/wiki/File:Durand_Stone.jpg .
- `.kaupunkilehti[1].nostot[2].teksti` ("Kivi on esillä Bahrainin kansallismuseon Dilmunin salissa, …") ja `.selite` ("Durand-kivi löydettiin 1800-luvulla, ja se on esillä Bahrainin kansallismuseossa."). Korjattu teksti: "Durand-kivi löydettiin 1800-luvulla Bilad al-Qadimin moskeijan seinästä; alkuperäisen kerrotaan tuhoutuneen toisessa maailmansodassa, ja Bahrainin kansallismuseossa on jäljennös." Korjattu selite: "Jäljennös Durand-kivestä Bahrainin kansallismuseossa; alkuperäinen löytyi 1800-luvulla."

### Epätarkat

**A1. Kaksoiskaupungit 1800-luvulla (EPÄTARKKA).** Wikipedia (Manama, johdanto): "the current twin cities of Manama and Muharraq appear to have been founded simultaneously in the 1800s." Sama artikkeli kertoo Manaman nimen 1345 ja Muharraqin Nestoriaaniluostarin (Al Dair) 400-luvulta, joten "perustettu" ei kestä. Tekstin "muodostuneet nykyisiksi kaksoiskaupungeiksi" on muotoilu, jota lähde ei sano. Fuccaro (Cambridge, 2009, kirja-arvio reviews.history.ac.uk) tukee vain sitä, että saaret muodostavat nykyään yhtenäisen kaupunkialueen ja Muharraq oli 1800-luvun pääkaupunki. Toista lähdettä "1800-luvun muodostumiselle" ei löytynyt. Lähteet: https://en.wikipedia.org/wiki/Manama ; https://reviews.history.ac.uk/print/review/872 .
- `.kaupunkilehti[0].nostot[1].teksti`, `.artikkeli.intro` ("kaupungit ovat lähteen mukaan muodostuneet nykyisiksi kaksoiskaupungeiksi 1800-luvulla"). Korjattu lause: "Manama ja Muharraq ovat vierekkäisiä kaupunkeja kahdella saarella, ja nykyään ne muodostavat yhtenäisen kaupunkialueen; 1800-luvulla Muharraq oli Bahrainin pääkaupunki ja helmenpyynnin keskus, Manama kauppakaupunki."

**A3. Muharraq nousi puolustettavan sijaintinsa vuoksi (EPÄTARKKA, lievä).** Syy-seuraus on vain Wikipedian ("took prominence due to its defensive location"). Britannica (Muharraq, hakutuloksen kautta) antaa muita syitä: hallitsijan asuinpaikka suurimman osan vuotta ja helmenpyynnin satama; matkailusivu mainitsee luonnonsuojan. Pelkkä "lähteen mukaan" ensimmäisessä virkkeessä ei kata tätä syy-seurausta. Lähteet: https://en.wikipedia.org/wiki/Manama ; https://www.britannica.com/place/al-Muharraq (403, hakutuloksen kautta).
- `.kaupunkilehti[0].nostot[1].teksti`. Korjattu lause: "Muharraq oli Bahrainin pääkaupunki ennen Manamaa, ja sen saari oli helmenpyynnin keskus, kun taas Manama oli kauppakaupunki ja portti pääsaarelle."

**A5. Pengertie noin 3 km (EPÄTARKKA).** Wikipedia: pengertie "stretching over 2.8 km"; Britannica (Muharraq): pengertie noin 1,5 mailia (2,5 km); Shaikh Isa -pengertien pituus 2,5 km (Wikipedia, Gulf Construction). Lisäksi saaria yhdistää kolme pengertietä (Wikipedia, Muharraq Island), joten yksikkömuoto on harhaanjohtava ja "noin kolme" on pyöristetty ylöspäin. Lähteet: https://en.wikipedia.org/wiki/Manama ; https://en.wikipedia.org/wiki/Shaikh_Isa_Causeway ; https://en.wikipedia.org/wiki/Muharraq_Island ; Britannica (403, hakutuloksen kautta).
- `.kaupunkilehti[0].nostot[1].teksti`. Korjattu lause: "Nykyään saaria yhdistää kolme pengertietä, joista Shaikh Isa -pengertie on noin 2,5 kilometrin pituinen."

**A6. Lentoasema noin 7 km (EPÄTARKKA, lievä).** Wikipedia antaa 7 km Manaman liikekeskustasta. Matkailu- ja lentosivut antavat 6–10 km mittauspisteestä riippuen (6, 6,2, 7–8, 9, 10 km). Itsenäistä tarkkaa lähdettä ei löytynyt. Lähteet: https://en.wikipedia.org/wiki/Manama ; hakutulokset (trip.com, flypgs.com, cleartrip.com).
- `.kaupunkilehti[0].nostot[1].teksti` (myös matkailijalle-jakso 1, jota ei tarkistettu). Korjattu lause: "Bahrainin lentoasema on Muharraqin saarella, muutaman kilometrin päässä Manaman keskustasta."

**A7. UNESCO "Bahrain Pearling Path" (EPÄTARKKA).** UNESCO (kohde 1364, hakutuloksen kautta, whc 403): "Pearling, Testimony of an Island Economy", kirjattu 2012; 17 rakennusta Muharraqin kaupungissa, kolme osterikenttää, osa rannikkoa ja Qal'at Bu Mahir. "Pearling Path" on reitin ja median käyttämä nimi (Bahrain Authority/Pearling Path -sivusto). Muharraqin vanha kaupunki ei siis kuulu kokonaan kohteeseen. Lähteet: https://whc.unesco.org/en/list/1364 (hakutuloksen kautta) ; https://pearlingpath.bh/en/the-pearling-path-in-detail/ ; https://en.wikipedia.org/wiki/Bahrain_Pearling_Trail .
- `.kaupunkilehti[0].nostot[1].teksti`. Korjattu lause: "Muharraqin vanhassa kaupungissa on osa UNESCOn maailmanperintökohdetta Pearling, Testimony of an Island Economy (2012), jonka reitti tunnetaan nimellä Pearling Path."

**B5. Tuulitunnelikokeet ja "kapea sektori" (EPÄTARKKA, lievä).** Wikipedia: tuulitunnelikokeet osoittivat S-muotoisen virtauksen, joka pitää tuulen kohtisuorassa turbiineihin, kun tuuli tulee enintään 45 asteen kulmassa ("within a 45° angle to either side of the central axis"). Gulf Construction (Atkins puts smart design into BWTC) / Structurae: "nearly perpendicular to the turbine within a 45-degree wind azimuth". Building (10/2008): tornien siivet suoristavat jopa 60 asteen kulmasta tulevan tuulen; noin 70 % Persianlahden tuulesta tulee rannikolle suoraan tai enintään 60 asteen kulmasta. 45 asteen molemmin puolin on 90 asteen sektori; "kapea" on kirjoittajan luonnehdinta. Lähteet: https://en.wikipedia.org/wiki/Bahrain_World_Trade_Center ; https://gulfconstructiononline.com/Article/7209/Atkins_puts_smart_design_into_BWTC ; https://building.co.uk/focus/harnessing-the-wind-bahrain-world-trade-centre/3123951.article .
- `.kaupunkilehti[0].nostot[2].teksti`. Korjattu lause: "Tuulitunnelikokeiden mukaan virtaus pysyy lähes kohtisuorassa turbiineihin nähden, kun tuuli tulee enintään noin 45 asteen kulmasta tornien keskiakseliin nähden."

**C7. Päätelmälause (EPÄTARKKA).** Durand-kiven kirjoitus: "Rimumin palatsi, Inzakin palvelija, Agarumin mies" (Rawlinson); se ei nimeä Dilmunia. Qal'at al-Bahrainin taulut ovat kassiittiajan hallintotekstejä (Wikipedia) ja ranskalaisen retkikunnan akkadinkieliset taulut (BACA 2017), ei Dilmun-nimen todiste sellaisenaan. Dilmun-nimi tunnetaan sumerilaisista Urukin Inanna-temppelin tauluista 3. vuosituhannen lopulta (Wikipedia, Dilmun). "Kertovat, että" on kirjoittajan päättelyä. Lähteet: https://en.wikipedia.org/wiki/Durand_Stone ; https://en.wikipedia.org/wiki/Dilmun ; https://culture.gov.bh/en/mediacenter/news_center/2017/March/Name,14450,en.html .
- `.kaupunkilehti[1].nostot[2].teksti`. Korjattu lause: "Durand-kiven kirjoitus mainitsee Rimumin, Inzak-jumalan palvelijan, ja kuninkaan nimi tunnetaan myös Qal'at al-Bahrainin ja A'alin löydöistä."

**P2. "Kauppa toipunut täysin 1873" (EPÄTARKKA).** Wikipedia (Manama, lähteetön virke): "Trading recovered fully by 1873 and … pearl exports increased by sevenfold between 1873 and 1900." Itsenäistä vahvistusta ei löytynyt. Bahrain Pearling Path -sivusto antaa helmiviennin kuusinkertaistumisen 1900–1912 ja helmien 75 %:n osuuden viennistä 1877; Lorimerin luvut (toissijaisesti) kertovat helmiteollisuuden arvon 1873/74 ja 1904/05, ei viennin. "Toipunut täysin" tarkoittaa 1860-luvun levottomuuksia (Wikipedia), mutta tästäkin on vain yksi lähde. Faktapohja merkitsi sen [Y]. Lause toistuu kolmessa paikassa. Lähteet: https://en.wikipedia.org/wiki/Manama ; https://pearlingpath.bh/en/history-of-pearling/ .
- `.artikkeli.intro` ("Isoisän matkavuonna 1873 Manaman kauppa oli lähteen mukaan toipunut täysin."), `.kaupunkilehti[0].johdanto`, `.kaupunkilehti[0].nostot[0].teksti`. Korjattu lause: "Isoisän matkavuonna 1873 Manama oli pieni helmenpyynnin ja kaupan satamakaupunki, joka oli ollut Britannian suojeluksessa vuodesta 1861." (Britannian 1861 sopimus on Wikipediassa; lisäväite tarvitsee toisen lähteen ennen käyttöä, esim. Aitchisonin sopimuskokoelma.)

**P3. Palgrave 1860-luvulla (EPÄTARKKA, lievä).** Wikipedia: "English scholar William Gifford Palgrave, on a visit to Manama in 1862, described the town as having a few ruined stone buildings, with … huts of poor fishermen and pearl-divers." Palgraven teoksen tekstiä ei löytynyt, joten kuvausta ei voitu verrata; kirjakauppa-/tutkimuslähteet huomauttavat, että teos sisältää kuvitteellisia kohtia, ja matka on 1862–63. Tekstissä ei ole "lähteen mukaan" eikä nimeä. Lähteet: https://en.wikipedia.org/wiki/Manama ; https://qnl.qa/en/blogs/11129 ; Ain Shams -yliopiston artikkeli (aafu.journals.ekb.eg/article_156350.html, vain tiivistelmä).
- `.artikkeli.teksti`. Korjattu lause: "Englantilaisen matkailijan William Gifford Palgraven mukaan Manamassa oli 1860-luvun alussa vain muutamia raunioituneita kivirakennuksia, ja maisemaa hallitsivat kalastajien ja helmenpyytäjien majat."

### Oikein (huomautuksin)

**A2.** Muharraq pääkaupunki ennen Manamaa: Wikipedia (Manama: 1923; Muharraq: 1932), QDL Bahrain-profiili (1923, hakutuloksen kautta), Fuccaro-kirja-arvio (Muharraq 1800-luvun pääkaupunki). Vuotta ei kirjata tekstiin, hyvä. Manama kauppakaupunki: Britannica ja Wikipedia, UNESCO (Muharraq helmenpyynnin pääkaupunki).

**B1.** 240 m (arkkitehtoninen korkeus) ja valmistuminen 2008: Wikipedia, Skyscraper Center (CTBUH), IET. 50 kerrosta on yleinen luku, CTBUH:n standardoitu luku 45; tekstissä ei kerroslukua, hyvä.

**B2 / Q1.** "Ensimmäinen pilvenpiirtäjä, johon tuuliturbiinit suunniteltu osaksi rakennetta": Wikipedia, IET ("first skyscraper on the planet to incorporate wind turbines"). Kapeampia muotoja käyttävät muut: Building ("one of the first"; "world's first building to sport large integrated wind turbines"), Arabian Business ja Atkins-uutinen ("first commercial building"). "Lähteen mukaan" on säilytettävä. Ei muutosta.

**B3 / B4.** Kolme turbiinia kolmessa sillassa, halkaisija 29 m, teho 225 kW kpl: Wikipedia, Skyscraper Center, IET, Building. Purjetornit kanavoivat Persianlahden merituulen: Gulf Construction (aerofoil-muoto), Wikipedia.

**B6.** 11–15 % (Wikipedia, Gulf Construction), 10–15 % (Building), "enintään 15 %" (IET, Skyscraper Center): "murto-osa" kestää. Palkinnot: LEAF Award 2006 (Best Use of Technology within a Large Scheme), Arab Construction World Sustainable Design Award, EDIE-palkinto 2007 (Wikipedia, World Construction Network, Structurae). "Kestävän rakentamisen palkintoja" kestää.

**C1.** Wikipedia (Qal'at al-Bahrain): "about 50 tablets uncovered", kolme kassiittikuningas Agumin ajalta (saman artikkelin toisessa kohdassa "a few"); BACA 2017: ranskalainen retkikunta löysi noin 100 akkadinkielistä savitaulua. "Kymmeniä" kestää; tarkka luku (noin 50) vain yhdellä lähteellä, joten "kymmeniä" on oikea pyöristys.

**C2.** Durand-kivi: BACA (löytö 1879 Bilad al-Qadimin moskeijan seinästä), Wikipedia (hankittu 1878, raportti 1879/1880). "1800-luvulla" kestää. Huom.: teksti ei sano missä kivi löytyi, mutta virkkeen asettelu ("Qal'at al-Bahrainilta … lisäksi … taulut. Durand-kivi löydettiin …") voi antaa kuvan, että se löytyi Qal'atilta; löytöpaikka oli moskeija Bilad al-Qadimissa.

**C3.** "Rimum, Dilmunin kuningas": BACA 2016 ("son of King Rīmum", A'alin hautakummun kirjoitus), Wikipedia (Dilmun: Rimum yksi kahdesta tunnetusta Dilmunin kuninkaasta n. 1780 eaa.). Itse kiven kirjoitus nimeää hänet vain Inzakin palvelijaksi; kuninkaan arvo tulee A'alin löydöistä. Ehdotus: "kiven kirjoituksessa on Rimumin nimi; Rimum tunnetaan Dilmunin kuninkaana".

**C5.** Dilmun-salin esillepano: BACA ("stamp-seals, Barbar temple treasures, Saar settlement finds, pottery"), Wikipedia (Barbarin ja Saarin temppelien esineet). BACA sanoo Saarista "asuinpaikka", Wikipedia "temppeli"; molemmat ovat Saarin kohteessa. Ei muutosta, mutta turvallisempi: "Barbarin temppelin ja Saarin löytöjä".

**C6.** Tanskalainen retkikunta (P. V. Glob, Moesgaard/Aarhus) saapui Manamaan 5.12.1953 ja kaivoi Qal'at al-Bahrainilla 1954 alkaen (Kuml/tidsskrift.dk; JSTOR-sarja; Carlsberg-säätiö: kaivaukset 1955 alkaen; Wikipedia: Bibbyn johdolla 1954–1972). "1950-luvulta alkaen" kestää.

**Q0.** Persianlahden koillisrannikko: Wikipedia ("northeastern coast of Bahrain Island"), Britannica ("northeastern tip", hakutuloksen kautta). Vihje "Irak ja Kuwait pohjukassa" on oikein.

**Q2.** Nimi mainittu käsikirjoituksessa 1345: Wikipedia ja Britannica ("Islamic chronicles about 1345", hakutuloksen kautta); nimi kirjattu myös noin 1330 (730 AH). 1300-luku kestää. Vihje (Hormuzin sivuvaltio 1330): Wikipedia ja Fanack (jarwanidit kukistettiin 1330 Hormuzin joukkojen toimesta).

**Q3.** Wikipedia: kokoelma "from the first Hijri century (622–722 AD)" nykypäivään. Aramco World (2000): käsikirjoituksia "koko islamin historiasta", varhaisimmat koraanit 7. ja 8. vuosisadalta; Bahrain Confidential: vanhimmat 7. vuosisadalta. Täsmälleen "ensimmäinen hidžran vuosisata" on vain Wikipedian sanamuoto, mutta toiset lähteet ovat yhteensopivia. Ehdotus varmuuden vuoksi: "kalligrafiaperinteen varhaisimmilta vuosisadoilta nykypäivään".

**Q4.** Muharraq pääkaupunki: ks. A2. Lentoasema Muharraqin saarella: Wikipedia, Wikivoyage, Britannica-haun yhteydessä useat matkasivut. Hint (helmenpyynti 1800-luvulla): Britannica ja UNESCO.

**P1.** Capital Governorate 2020: 548 345 (IGA:n väestölaskenta; Gulf Labour Markets and Migration -taulukko ja Wikipedian kuvernementtiartikkeli, jossa pinta-ala 78,71 km²). Laajuus on nimetty oikein (kuvernementti), ja luku on rekisteripohjainen ja kattaa myös ulkomaalaiset (379 153 eli noin 69 %). Manaman kaupungin oma luku on pienempi (Wikipedia: noin 200 000 vuonna 2020; 329 510 vuonna 2010, ei vertailukelpoisia); tekstiä ei tarvitse korjata.

**P4.** Portugalin valtaus 1521: Wikipedia, Britannica (hakutuloksen kautta). "Pysyi pienenä kauppasatamana, kunnes" on Wikipedian johdannon muotoilu (toinen lähde antaa vain vuosiluvut); sama artikkeli sanoo Manaman tulleen alueelliseksi kauppa- ja helmenpyyntikeskukseksi vasta Safavidien jälkeen 1602. Ehdotus: "Portugalilaiset valtasivat Bahrainin 1521".

## 4. Kuvat

Kaikki kolme tiedostoa ovat Commonsissa; lisenssi `CC BY-SA 4.0` (Commonsin LicenseShortName; UsageTerms "Creative Commons Attribution-Share Alike 4.0"; ei maapäätettä) täsmää lähderiveihin; tekijät täsmäävät (Zairon, Zairon, Droodkin; "Own work"). Esikatselu 960 px.

**K1. Kansi: Manama Skyline of West Manama 2.jpg (OIKEIN, huom.).** Commons: tekijä Zairon, 23.2.2020, kuvaus "Skyline of West Manama", kategoriat mm. Qal'at al-Bahrain ja Skylines of Manama. Kuvassa: tornitalojen siluetti horisontissa, edessä Qal'at al-Bahrainin hiekkainen kaivausalue ja kivimuuri; pieniä jalankulkijoita kaukana (ei tunnistettavia kasvoja), ei tekstiä, ei väkivaltaa. Kuvateksti "Manama on Bahrainin pääkaupunki ja maan suurin kaupunki." ei ole ristiriidassa kuvan kanssa, mutta ei kerro kuvan sisällöstä. Ehdotus: "Manaman siluetti Qal'at al-Bahrainin kaivausalueelta nähtynä." (kuvat.md kuvaa saman).

**K2. Nosto B: Manama Bahrain World Trade Centre & Bahrain Financial Harbour 2.jpg (OIKEIN).** Commons: Zairon, 22.2.2020, kategoria "Incidental views of Bahrain World Trade Center". Kuvassa: BWTC:n kaksi purjemaista tornia ja sillat, joissa turbiinit erottuvat vaaleina lapoina, oikealla BFH:n kaksi kaareutuvaa tornia, edessä turkoosi vesi, pieni vene ja kaukana kolme melojaa (ei tunnistettavia). Kuvateksti "tornien välisissä silloissa on tuuliturbiinit" vastaa kuvaa.

**K3. Nosto C: Durand Stone.jpg (EPÄTARKKA).** Commons: Droodkin, 7.7.2013, kuvaus: "photograph of a replica of the Durand Stone at the Bahrain National Museum … original … said to be destroyed during World War II." Kuvassa: musta kivi lasivitriinissä, kiilakirjoitusrivistö ja palmunoksan merkki; viereisen selitystaulun teksti koskee eri esinettä (steatiittimaljan katkelman kirjoitus "Palace of Iak(...), servant of the god … (Inzak?)"). Ei kasvoja, ei väkivaltaa. Kuvateksti "Durand-kivi löydettiin 1800-luvulla, ja se on esillä Bahrainin kansallismuseossa." on harhaanjohtava (ks. C4: jäljennös). kuvat.md ei maininnut jäljennöstä, vaikka Commons-kuvaus sanoo sen. Korjattu selite: "Jäljennös Durand-kivestä Bahrainin kansallismuseossa; alkuperäinen löytyi 1800-luvulla."

## 5. Muut huomiot

- **1873-uskottavuus.** Tekstit eivät esitä anakronismeja: helmenpyynti on mukana (Muharraq, kysymys 4, artikkeli), tornit ja museot esitetään nykyajan kohteina. Britannian 1861-sopimus ja suojeluksessa olo puuttuvat tekstistä kokonaan; jos mukaan halutaan, tarvitaan toinen lähde (ks. P2).
- **Laajuus.** Ainoa asukasluku on kuvernementin, ja laajuus on nimetty. Muissa paikoissa ei ole pinta-alaa tai muita laajuusriippuvaisia lukuja tarkistetuissa kohdissa.
- **Lähdelauseet.** "Lähteen mukaan" on käytetty hyvin johdonmukaisesti (BWTC, 1873, kaksoiskaupungit); virheet ovat niissä lauseissa, joissa se puuttuu (A3 syy-seuraus, P3 Palgrave, A4 silta, C4 "esillä") tai joissa lähteen sanoja on tarkennettu (B5 "kapea", A5 "yksi pengertie").
- **Ei tarkistettu.** `tiedot[0]` ("kaksi samanlaista minareettia"; faktapohja huomautti, että minareetit rakennettiin eri aikoina), matkailijalle-oppaan luvut (7 km, 2020-luvun terminaali jne.), ilmastoluvut, kysymysten vastausjärjestys.
