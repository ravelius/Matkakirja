# Viesti Fablelle: rahavisat seitsemään EU-pakkaan (erä sonnet-nostot-visa)

19.9.2026 klo 18.18 Suomen aikaa, Sonnet-sisältösessio "Matkakirja Sonnet nostot", haara `sonnet-nostot-visa`
(pohja origin/main 5e02e295, v1959). Versiota ei nostettu, PR:ää ei avattu, ämpäriin ei viety, Raamattuun ei koskettu.
Alankomaiden omat 10 visaa ovat haarassa `sonnet-nostot-nld` (ei tässä erässä).

**Tulos: 70 visaa (10 / maa: FRA, ESP, ITA, DEU, PRT, GRC, AUT)** tiedostoihin `js/packs/hahmotelma-<iso>.js`, kenttä `visa: { kysymys, vaihtoehdot: [4], oikea, fakta }`
noston viimeisenä kenttänä (`lahde`-rivin jälkeen), muoto kuten NLD:ssä ja fokusvirta-*.js:ssä.

## Menetelmä

- Seitsemän Sonnet-agenttia (yksi per maa) kirjoitti ehdotukset; minä luin kaikki 70, tarkistin oikeat vastaukset noston tekstiä vasten ja korjasin seitsemän kohtaa (alla).
- Valinta: ~10 noston joukosta eri tyyppejä ({"vuori":7,"joki":1,"kulttuuri":9,"merenkulku":1,"meri":3,"historia":16,"ruoka":7,"tekniikka":9,"jarvi":7,"kauppa":6,"saari":4}).
- Oikea-indeksit tasaisesti (maittain kierretty sekvenssi): indeksit 0/1/2/3 = 17/18/18/17 (seitsemän maan 70 visassa); jokaisessa maassa jokainen indeksi 2–3 kertaa.
- Vastaus löytyy noston omasta tekstistä; `fakta` on joko saman tekstin muu tieto tai saman Wikipedia-artikkelin tieto (FRA-agentti ja ESP/GRC-agentit hakivat osan rajapinnasta; muut käyttivät noston tekstiä).

## Koneellinen tarkistus

| Mittari | Tulos |
| --- | --- |
| Visoja | 70 (10 × 7) |
| 4 vaihtoehtoa, kaikki eri | 70/70 |
| `oikea` kokonaisluku 0–3 | 70/70 |
| Kysymys päättyy ?-merkkiin, `fakta` ≥ 20 merkkiä | 70/70 |
| Oikea vastaus ei ole selvästi (yli 1,6 ×) pisin | 70/70 (viisi tapausta korjattu: DEU Lüneburger Heide, DEU Bernkastel, PRT Berlengas, PRT Ponte de Lima, AUT Hall in Tirol; ITA Alba uusittu) |
| Oikean vastauksen ja kysymyksen avainsanat tekstissä | tarkistettu ohjelmallisesti (juurihaku) ja kaikki 70 oikeaa vastausta käsin noston tekstiä vasten |
| `node --test tests/*.test.mjs` | # tests 3667, # pass 3654, # fail 0, # skipped 13 |
| `node tools/tarkista-kaksoisavaimet.mjs` | ei kaksoisavaimia |
| `tests/visajakauma.test.mjs` | ei kata hahmotelmapakkoja (ei rajoja); jakauma silti tasainen |

## Korjaukset käsin (agenttien ehdotuksiin)

1. ESP Tordesillas: "Kumpi osapuoli" → "Kuka sai" (neljä vaihtoehtoa).
2. ITA Alba: alkuperäinen kysymys ("mitä Ferrero valmistaa", teksti sanoo vain "konditoriakonserni") oli triviaali → kysymys tryffelistä (teksti: valkoinen tryffeli).
3. DEU Bernkastel ja Lüneburger Heide, PRT Berlengas ja Ponte de Lima, AUT Hall in Tirol: oikea oli selvästi pisin → vaihtoehtojen pituudet tasattu.
4. Tyypit: visa on nostossa, jonka tyyppi vaihtelee (ei vain kulttuuri/historia); GRC Metsovo (tyyppi ruoka) kysyy aromanialaisista, koska juustokysymys olisi ollut triviaali.

## Visat (nosto / kysymys / oikea vastaus (indeksi))

| maa | nosto | tyyppi | kysymys | oikea |
| --- | --- | --- | --- | --- |
| FRA | canigou | vuori | Miksi Canigoua pidettiin 1700-luvulle asti Pyreneiden korkeimpana vuorena? | Jyrkät rinteet ja sijainti lähellä merta (1) |
| FRA | verdon | joki | Mistä Verdon-joki on saanut nimensä? | Veden turkoosinvihreästä väristä (3) |
| FRA | chenonceau | kulttuuri | Minkä vanhan rakennuksen perustuksille nykyinen Chenonceaun linna rakennettiin? | Vanhan myllyn (0) |
| FRA | saint-malo | merenkulku | Miten Saint-Malon muurien ympäröimä vanhakaupunki oli alun perin yhteydessä mantereeseen? | Vain kapealla hiekkakannaksella (2) |
| FRA | pointe-du-raz | meri | Mitä sana raz tarkoittaa Pointe du Raz'n nimessä? | Voimakasta vesivirtaa (3) |
| FRA | rouen | kulttuuri | Miksi Rouenin tuomiokirkon kolme tornia ovat kaikki eri tyyliä? | Kirkkoa rakennettiin ja uusittiin yli 800 vuoden ajan (1) |
| FRA | rocamadour | historia | Miten pyhiinvaeltajat perinteisesti nousivat Rocamadourin monumentaalista portaikkoa pyhäköille? | Nousemalla ne polvillaan (0) |
| FRA | saint-emilion | ruoka | Miksi Saint-Émilion ympäristöineen otettiin Unescon maailmanperintöluetteloon? | Pitkän ja yhä elävän viininviljelyhistoriansa vuoksi (2) |
| FRA | vichy | historia | Mikä asema Vichyllä oli Ranskassa vuosina 1940–1944? | Ranskan valtion tosiasiallinen hallintopääkaupunki (1) |
| FRA | canal-du-midi | tekniikka | Mikä oli Canal du Midin rakentamisen vaikein tehtävä? | Johtaa vettä vuorilta kanavan korkeimpaan kohtaan (0) |
| ESP | cabo-de-finisterre | meri | Mitä latinankielinen nimi finis terrae tarkoittaa? | Maan pää (2) |
| ESP | bardenas-reales | vuori | Mistä Bardenas Realesin Valkoinen Bardena on saanut nimensä? | Pinnalla näkyvästä valkoisesta suolasta (0) |
| ESP | tablas-de-daimiel | jarvi | Mikä on Tablas de Daimielin asema Espanjan viidentoista kansallispuiston joukossa? | Se on kansallispuistoista pienin (1) |
| ESP | numancia | historia | Miten suurin osa Numancian asukkaista päätti toimia Rooman pitkän saarron aikana? | Kuolla mieluummin kuin joutua orjiksi (3) |
| ESP | campo-de-criptana | kulttuuri | Minkä kirjallisen teoksen kahdeksannen luvun alussa mainitaan kolmekymmentä tai neljäkymmentä tuulimyllyä tasangolla? | Don Quijote (1) |
| ESP | la-tomatina | ruoka | Miten La Tomatina sai alkunsa Buñolissa? | Kulkueen aikaisesta yhteenotosta, joka kaatoi vihanneskojun (2) |
| ESP | riotinto | tekniikka | Kuka osti Riotinton kaivosesiintymät Espanjan ensimmäisen tasavallan hallitukselta vuonna 1873? | Rothschildien pankkiirisuku (1) |
| ESP | almaden | kauppa | Miksi Almadénin kaivos suljettiin vuonna 2002? | EU kielsi elohopean louhinnan (3) |
| ESP | vizcayan-silta | tekniikka | Miten autot ylittävät Vizcayan sillan Nervión-joen yli? | Korkealle ripustetussa gondolissa, joka liikkuu joen yli (2) |
| ESP | tordesillas | historia | Kuka sai Tordesillasin sopimuksessa Euroopan ulkopuoliset maat meridiaanin länsipuolelta? | Kastilian kruunu (0) |
| ITA | garda | jarvi | Mistä Gardajärven nykyinen nimi on peräisin? | Germaanisesta sanasta, joka tarkoittaa vartiopaikkaa (3) |
| ITA | stromboli | vuori | Miksi Strombolin saarta kutsutaan Välimeren majakaksi? | Tulivuori purkautuu lähes jatkuvasti lievin purkauksin (1) |
| ITA | elba | saari | Mistä Elban saari oli tunnettu jo antiikin aikana? | Rautavaroistaan ja arvostetuista kaivoksistaan (2) |
| ITA | castel-del-monte | historia | Mikä seikka viittaa siihen, ettei Castel del Monte ehkä ollut tavallinen puolustuslinna? | Siinä ei ole vallihautaa eikä nostosiltaa (0) |
| ITA | monte-cassino | historia | Ketkä ryöstivät Monte Cassinon ensimmäisen luostarin noin vuonna 570? | Langobardit (2) |
| ITA | alba | ruoka | Minkä ruoka-aineen tuotannosta Alba on erityisen kuuluisa? | Valkoisesta tryffelistä (1) |
| ITA | cremona | kulttuuri | Mihin tarkoitukseen roomalaiset perustivat Cremonan? | Ensimmäiseksi tukikohdakseen Po-joen pohjoispuolelle (3) |
| ITA | carrara | kauppa | Mihin Carraran motto Fortitudo mea in rota eli voimani on pyörässä viittaa? | Marmorin kuljetukseen roomalaisajoista lähtien (2) |
| ITA | larderello | tekniikka | Mihin Larderellon maasta purkautuvaa kuumaa höyryä käytettiin 1800-luvulla? | Boorihapon erottamiseen mudasta (0) |
| ITA | solferino | historia | Mikä Solferinon taistelun jälkeen kirjoitettu teos johti Punaisen Ristin perustamiseen? | Henry Dunantin kirja Muisto Solferinosta (3) |
| DEU | saechsische-schweiz | vuori | Miksi Elben hiekkakivivuoristoa alettiin kutsua Saksilaiseksi Sveitsiksi? | Sveitsiläiset taiteilijat näkivät maisemassa kotimaansa Juran (0) |
| DEU | helgoland | saari | Mikä tunnettu teksti kirjoitettiin Helgolandin saarella vuonna 1841? | Saksan kansallislaulun sanat (2) |
| DEU | lueneburger-heide | kulttuuri | Miten Lüneburgin nummen keltaiset kanervanummet pidetään avoimina? | Laiduntamalla nummilampaita eli heidschnuckeja (3) |
| DEU | spreewald | jarvi | Minkä vähemmistökansan asuinaluetta Spreewald on? | Sorbien (1) |
| DEU | externsteine | historia | Mitä aihetta esittää Externsteinen kallioon keskiajalla veistetty reliefi? | Kristuksen ottamista alas ristiltä (2) |
| DEU | bernkastel | ruoka | Minkä muinaisen rakennuksen paikalla Bernkastelin yläpuolisen Landshutin linnan rauniot mahdollisesti ovat? | Roomalaisen castellumin (0) |
| DEU | hameln | kulttuuri | Mistä Hamelnin kaupunki sai alkunsa? | Luostarista, jonka ympärille kasvoi kylä (0) |
| DEU | voelklingen | tekniikka | Kuka osti Julius Buchin Saar-joen rannalle rakennuttaman terästehtaan, kun se oli toiminut vain muutaman vuoden? | Karl Röchling (3) |
| DEU | meissen | kauppa | Kuka perusti Euroopan ensimmäisen posliinitehtaan Meissenin Albrechtsburgin linnaan? | Saksin vaaliruhtinas Augustus II Väkevä (1) |
| DEU | muengsten | tekniikka | Kenen mukaan Müngstenin silta nimettiin alun perin? | Keisari Wilhelm I:n (3) |
| PRT | peneda-geres | vuori | Mistä Peneda-Gerêsin kansallispuiston nimi tulee? | Kahdesta graniittimassiivista (1) |
| PRT | ria-formosa | meri | Miten Ria Formosan laguunin kuudes salmi eroaa muista salmista? | Se on tekoväylä, joka helpottaa pääsyä Faron satamaan (3) |
| PRT | berlengas | saari | Miksi Pyhän Hieronymuksen munkit perustivat yhteisön Berlengasin saarelle vuonna 1513? | Auttaakseen merenkulkijoita ja haaksirikkoutuneita (0) |
| PRT | foz-coa | historia | Miksi Côa-laaksoon suunniteltu padon rakennushanke lopulta peruttiin? | Yleisö vaati kalliopiirrosten suojelua ja uusi hallitus perui hankkeen (2) |
| PRT | ponte-de-lima | ruoka | Minkä ruokien ja juomien mukaan Ponte de Lima tunnetaan koko maassa? | Punaisen Vinho Verde -viinin ja sarrabulho-riisin (3) |
| PRT | amarante | kulttuuri | Minkä alan kaupunkina Amarante kuuluu UNESCOn luovien kaupunkien verkostoon vuodesta 2017? | Musiikkikaupunkina (1) |
| PRT | sao-domingos | tekniikka | Minkä uuden asian São Domingosin kaivosalue sai ensimmäisenä paikkana Portugalissa? | Sähkövalon (0) |
| PRT | castro-marim | jarvi | Mitkä linnut kuoriutuivat Castro Marimin suoalueella kevättalvella 2021 ensimmäistä kertaa Portugalissa? | Flamingot (2) |
| PRT | estremoz | kauppa | Mihin rakennushankkeeseen Estremozin marmorin ensimmäisten vientierien uskotaan menneen antiikin aikana? | Emerita Augustan Circus Maximuksen rakentamiseen (1) |
| PRT | almeida | historia | Mikä tuhosi suurimman osan Almeidan kaupungista niemimaasodan vuoden 1810 piirityksessä? | Sattumalta osunut kranaatti sytytti pääruutivaraston, joka räjähti (0) |
| GRC | samaria | vuori | Mitä varten Samarian rotkon kansallispuisto perustettiin erityisesti? | Harvinaisen kri-kri-vuohen turvapaikaksi (2) |
| GRC | kerkini | jarvi | Mitä Kerkinijärven paikalla oli ennen kuin siitä tehtiin tekojärvi? | Laaja suoalue ja epäsäännöllisiä suojärviä (0) |
| GRC | milos | saari | Mihin Milosin obsidiaania käytettiin ennen maanviljelyn alkua? | Siitä tehtiin erittäin teräviä kivityökaluja (1) |
| GRC | vergina | historia | Mitä Aigain teatterissa tapahtui vuonna 336 eaa.? | Makedonian kuningas Filippos II murhattiin (3) |
| GRC | meteora | kulttuuri | Minkä paikan sanotaan ortodoksisessa maailmassa olevan Meteoraa tärkeämpi? | Athos-vuori (0) |
| GRC | metsovo | ruoka | Minkä kansan elämän suurin keskus Kreikassa Metsovo on? | Aromanialaisten eli vlahien kansan (2) |
| GRC | lavrio | kauppa | Mihin Themistokles sai ateenalaiset käyttämään Lavrion hopeasuonen tuotot noin vuonna 483 eaa.? | Ateenan sotalaivaston laajentamiseen (1) |
| GRC | kalavryta | tekniikka | Mitä piispa Germanos III teki Agia Lavran luostarissa 21. maaliskuuta 1821? | Nosti kapinan lipun ottomaaneja vastaan (3) |
| GRC | thermopylae | historia | Mitä Simonideen epitafi kehottaa ohikulkijaa tekemään? | Kertomaan spartalaisille, että he kaatuivat lakeja noudattaen (2) |
| GRC | navarino | historia | Miksi Navarinon taistelu on merkittävä meritaisteluiden historiassa? | Se oli viimeinen suuri meritaistelu pelkillä purjelaivoilla (1) |
| AUT | traunsee | jarvi | Mikä olento paikallisen legendan mukaan asuu Traunjärvessä? | Järvessä asuva vesihevonen (3) |
| AUT | millstatt | jarvi | Miksi Millstätter Seen vesi voi lämmetä kesällä jopa 25 asteeseen? | Pohjoiset vuoret suojaavat sitä kylmiltä tuulilta (2) |
| AUT | grossvenediger | vuori | Mihin vuoren nimen Großvenediger eli suuri venetsialainen uskotaan todennäköisimmin viittaavan? | Solia ylittäneisiin venetsialaisiin kauppiaisiin (1) |
| AUT | kremsmuenster | historia | Minkä tapahtuman perimätieto kertoo sattuneen paikalla, jolle Kremsmünsterin luostari perustettiin? | Villisika haavoitti herttuan pojan kuolettavasti (2) |
| AUT | kreuzenstein | historia | Millä rahoilla kreivi Wilczek rahoitti Burg Kreuzensteinin jälleenrakennuksen? | Sleesian hiilikaivostensa tuotoilla (0) |
| AUT | piber | ruoka | Mitä varten Piberin valtion talli perustettiin vuonna 1798? | Sotahevosten kasvattamiseksi armeijan tarpeisiin (1) |
| AUT | steyr | tekniikka | Millaisen yrityksen seppä Leopold Werndl perusti Steyriin vuonna 1830? | Asetehtaan (3) |
| AUT | hall-in-tirol | kauppa | Miten suolavesi johdettiin Absamin suolakaivoksesta Hallin haihdutusaltaalle? | Noin kymmenen kilometrin pituista putkea pitkin (2) |
| AUT | st-anton | kulttuuri | Miten St. Antonin hiihtoperinne levisi 1930-luvulla ulkomaille? | Paikalliset hiihtoopettajat muuttivat Yhdysvaltoihin opettamaan lajia (0) |
| AUT | oberndorf | historia | Miksi Oberndorf kuuluu Itävaltaan, vaikka joen toisella puolella oleva Laufen on Baijerissa? | Salzburgin arkkipiispakunta jaettiin Baijerin ja Itävallan kesken (3) |

## Mitä jäi tekemättä

- Visojen semanttinen oikeellisuus on tarkistettu käsin ja avainsanahaulla, ei koneellisesti täydellä tavalla (vaatisi tekstin ymmärtämistä).
- Fakta-riveistä osa toistaa noston tekstin tietoa (ei uutta artikkelista); ne ovat silti totta ja tukevat kysymystä. Voin hakea tuoreempia faktoja rajapinnasta pyynnöstä.
- Peliä ei avattu selaimessa; `nostonVisa` (js/fokusnosto.js) lukee samaa kenttää kuin fokusvirtojen visat.
