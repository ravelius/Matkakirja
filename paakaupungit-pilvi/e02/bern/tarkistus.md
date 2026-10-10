# Bern (e02) — riippumaton faktantarkistus

Tarkistettu 10.10.2026 suoraan lähdetiedostoista (`tyokalu.mjs lahde`): en Bern, Old City (Bern), Bern Minster, Zytglogge, Bärengraben, Federal Palace of Switzerland, Bundesplatz, Nydeggbrücke, Marzili Funicular, Zibelemärit, Einsteinhaus, Zentrum Paul Klee, Museum of Fine Arts Bern, Bern railway station, Bern Airport, History of Bern. Faktapohjaan ei luotettu. Sisalto.json:ia ei muutettu.

Yhteenveto: VÄÄRIN 4, EPÄVARMA 12.

## Virheet ja epävarmat

| JSON-polku | väite | lähde (artikkeli + osio) | tulos | tarkka korvaava teksti |
|---|---|---|---|---|
| $.kaupunkilehti[1].tehtava.vaihtoehdot / oikea | Oikea vaihtoehto "Bernin historiallisessa museossa" (30 mrk) on pisin; muut 28, 23, 19 mrk | Minitehtäväsääntö: oikea ei saa olla pisin. Sisältö OK: Bern Minster, "The Last Judgement" ("the originals are in Bern History Museum") | VÄÄRIN | vaihtoehdot: ["Bernin historiallisessa museossa","Yhä portaalin ympärillä kirkon seinässä","Zürichin Grossmünsterin kirkossa","Ne tuhoutuivat reformaation aikana 1528"], oikea 0 (pituudet 30/38/28/38) |
| $.kaupunkilehti[1].nostot[1].teksti | "Münsterin lasimaalaukset on tehty 1441–1450" ja heti perään kuoleman tanssin ikkuna: kuvaa, että myös kuoleman tanssin ikkuna olisi 1441–1450 | Bern Minster, Stained glass: "Some of the windows date from 1441 to 1450"; sama osio: kuoleman tanssin ikkunan hahmot Niklaus Manuel 1516–1519 | VÄÄRIN | "Osa Münsterin lasimaalauksista on tehty 1441–1450, ja lähteen mukaan ne kuuluvat Sveitsin arvokkaimpiin. Kuoleman tanssin ikkunassa kuolema luurankona tavoittaa ihmisiä kaikista yhteiskuntaluokista; ikkunan hahmot on lähteen mukaan tehnyt Niklaus Manuel 1516–1519. Kuoleman tanssi -näytelmät saivat alkunsa 1300-luvulla Mustan surman aikaan, ja vuoteen 1425 mennessä niiden hahmot olivat Pariisin Pyhien viattomien kirkon hautausmaalla." (loput lauseet ennallaan) |
| $.kaupunkilehti[0].matkailijalle.kuva.selite | Kuvateksti sisältää lähdeviittauksen "lähteen mukaan" | PILVIOHJE luku 4 kohta 11: kuvateksteissä ei lähdeviittauksia lukijalle. Fakta (6 km) OK: Bern, Main sights "6 kilometres (4 miles) of arcades" | VÄÄRIN | "Bernin vanhankaupungin holvikäytäviä on yhteensä kuusi kilometriä, ja ne ovat osa Unescon maailmanperintökohdetta." |
| $.kaupunkilehti[0].matkailijalle.artikkeli.jaksot[0].kuva.selite | Kuvateksti sisältää "lähteen mukaan" | Sama sääntö. Fakta OK: Bern, Transport "second busiest station" | VÄÄRIN | "Bernin päärautatieasema avattiin vaiheittain 1858–1860, ja se on Sveitsin toiseksi vilkkain." |
| $.kysymykset[0].hint | "metsissä elävä suurpeto, jolla on paksu turkki" sopii yhtä hyvin vaihtoehtoon Susi; ei yksiselitteinen eikä auta | Hint-sääntö (ei vihjeen paljastamista, mutta vihjeen pitää olla ratkaiseva ja oikea). Karhulegenda: Bern, Etymology | EPÄVARMA | "Kansantarun mukaan herttua nimesi kaupungin ensimmäisen metsästysretkellään kohtaamansa eläimen mukaan." |
| $.kysymykset[1].q ja $.artikkeli.intro | "koska perustuslaki ei nimeä…" / "joten liittokaupunki on tarkin nimitys": syy-yhteyttä ei ole lähteessä | Bern, johdanto "referred to as the 'federal city'"; Modern history "the constitution doesn't define Bern as official capital … but as the seat of government" | EPÄVARMA | q: "Mitä nimitystä Bernistä käytetään, kun Sveitsin perustuslaki ei nimeä virallista pääkaupunkia?" Intro: "Perustuslaki ei nimeä virallista pääkaupunkia; Bern on hallituksen kotipaikka eli liittokaupunki." |
| $.kaupunkilehti[0].nostot[0].teksti | "1800-luvulla kaupunkia leikillä kutsuttiin Mutzopolisiksi": 1800-luku koskee sanaa Mutz, ei Mutzopolis-nimeä | History of Bern, Heraldic animal: "Mutz … in the 19th century applied to the city or canton … also referred to jestingly as Mutzopolis" | EPÄVARMA | "ja kaupunkia on leikillä kutsuttu myös Mutzopolisiksi, koska Mutz tarkoittaa murteessa karhua." |
| $.kysymykset[4].fact; $.nahtavyydet["Bernin tuomiokirkko"].teksti; $.kaupunkilehti[0].matkailijalle.artikkeli.matkailu.parasta[1].selite | "Sveitsin korkein tuomiokirkon torni": lähde sanoo koko kirkon olevan korkein | Bern Minster, johdanto: "tallest cathedral in Switzerland"; Old City: "Switzerland's tallest minster" | EPÄVARMA | "ja lähteen mukaan se on Sveitsin korkein tuomiokirkko." (parasta: "noin sadan metrin torni, ja lähteen mukaan kirkko on Sveitsin korkein tuomiokirkko.") |
| $.nahtavyydet.Zytglogge.teksti | "samana vuonna valettiin uusi iso tuntikello": lähteen 1405 on iso kello (Bell), kellokoneisto on myöhempi | Zytglogge, History: "the great bell cast in 1405"; Name: "clock was first installed … early 15th century" | EPÄVARMA | "Torni paloi tyhjäksi 1405, ja samana vuonna valettiin uusi suuri kello." |
| $.nahtavyydet.Liittopalatsi.teksti | "Itäsiipi valmistui 1884–1892": rakennustyö alkoi vasta 1888 lopulla | Federal Palace, johdanto "built from 1884 to 1892" mutta History: "Construction … began in late 1888 and was completed in May 1892" | EPÄVARMA | "Itäsiipi valmistui 1892." |
| $.kaupunkilehti[1].nostot[1].selite ja .lyhyt | "Kuoleman tanssin aihe sai alkunsa 1300-luvulla": lähde sanoo näytelmien (plays) syntyneen | Bern Minster, Stained glass: "The first Dance of Death plays originated during the Black Death of the 14th century" | EPÄVARMA | lyhyt: "Kuoleman tanssi -näytelmät saivat alkunsa 1300-luvulla Mustan surman aikaan." selite: "Kuoleman tanssin ikkunassa luurankona kuvattu kuolema tavoittaa ihmisiä kaikista yhteiskuntaluokista; aiheen näytelmät saivat alkunsa 1300-luvulla Mustan surman aikaan." |
| $.kaupunkilehti[1].nostot[0].teksti ja .lyhyt/.selite | "Veistäjänä oli Erhard Küng … patsaat 1460–1501": Küng tuli mestariksi 1483, Oikeus-patsaan veisti Daniel Heintz, "most likely 1460–1480" | Bern Minster, The Last Judgement: "work of one sculptor, Erhard Küng … Justice … signed by Daniel Heintz … carved some time between 1460 and 1501, most likely 1460 and 1480" | EPÄVARMA | "Veistokset teki pääosin Erhard Küng Westfalenin Stadtlohnista, ja ne on lähteen mukaan veistetty 1460–1501 välillä; keskellä seisovan Oikeuden on veistänyt Daniel Heintz." Selite: "…ovat pääosin Erhard Küngin työtä…" |
| $.kaupunkilehti[0].johdanto | "Täällä on kansan hallituksen kotipaikka": ei lähteessä, epäselvä ilmaus | Bern, johdanto: seat of government | EPÄVARMA | "Täällä on liittovaltion hallituksen ja parlamentin kotipaikka, ja kaupungin kilvessä kävelee karhu." |
| $.nahtavyydet["Bernin tuomiokirkko"].teksti ja .kuvat[0].lyhyt | "Suurin kello noin kymmenen tonnia": lähde 10,5 tonnia; kuvatekstin "suurin kello soi päivittäin" ei lähteessä (kellot soivat keskipäivällä ja klo 18) | Bern Minster, Bells: "bourdon … weighs 10.5 tons … rung daily at noon and at 6 p.m." | EPÄVARMA | teksti: "Suurin kello painaa noin 10,5 tonnia, ja kellot soivat päivittäin keskipäivällä ja kello 18." lyhyt: "Münsterin rakentaminen aloitettiin 1421, ja sen kellot soivat päivittäin." |
| $.kaupunkilehti[0].matkailijalle.artikkeli.matkailu.hyvaTietaa[0].teksti | "neljän kansalliskielen maassa": ei Bern-lähteissä | Bern, Demographics mainitsee vain saksan, italian, ranskan ja retoromaanin puhujamäärät | EPÄVARMA | "Valuutta on Sveitsin frangi, ja Bern on saksankielinen kaupunki." (tai lisää lähde: en Switzerland, Languages) |
| $.kaupunkilehti[1].nostot[2].lyhyt | Lyhyt kertoo sivualttareista, mutta kuva ja selite koskevat Münsterplattformia; lyhyt ja selite eri aiheesta | Bern Minster, Altars (43 sivualttaria, esineet Münsterplattformiin) | EPÄVARMA | "Münsterplattformille kaadettiin reformaation aikana 1528 lähes kaikki kirkon sisämaalaukset ja koristeet." |

## OK-rivit (lähteestä todennettu)

| JSON-polku | väite | lähde (artikkeli + osio) | tulos |
|---|---|---|---|
| artikkeli.intro / teksti | liittokaupunki; 28.11.1848 valinta Zürichin ja Luzernin edelle; Unesco 1983; 1405 suurpalo; holvikäytävät 6 km; vuosiluvut 1857 ja 1893 | Bern, Modern history, Main sights; Old City, Great Fire of 1405 | OK |
| artikkeli.intro | 1191 Berchtold V, Zähringen (kronikan mukaan) | Bern, Early history ("According to 14th-century historiography … 1191") | OK |
| artikkeli.teksti | 20 km Bernin Alppien pohjoispuolella; kelttiläinen nimi todennäköisempi; tuomiokirkko 1421, tauko 1575 jälkeen; parlamenttirakennus 1894–1902 | Bern, Topography, Etymology; Bern Minster, History; Federal Palace | OK |
| kysymykset[0] | karhu vaakunassa ainakin 1220-luvulta | Bern, Etymology | OK |
| kysymykset[2] | Zytglogge "aikakello", nimi kirjattu 1413, rakennettu noin 1218–1220 läntisen muurin porttitorniksi | Zytglogge, History ja Name | OK |
| kysymykset[3] | 1405 tulipalo, sen jälkeen hiekkakivi, puutalojen tilalle ristikkotaloja | Bern, Old Swiss Confederacy; Old City, Great Fire | OK |
| kysymykset[4] | torni 1893, rakennus alkoi 1421, noin 100 m | Bern Minster, johdanto (100,6 m) | OK (ks. EPÄVARMA "korkein") |
| kysymykset (kaikki) | oikea ei ole pisin: Q1 lyhin, Q2 14 vs 15 mrk, Q3 10 vs 14, Q4 8 vs 12; Q5 yhtä pitkiä | pituudet laskettu | OK |
| tiedot[0] | holvikäytäviä 6 km, yksi Euroopan pisimmistä katetuista ostoskaduista | Bern, Main sights | OK |
| tiedot[1] | Marzilibahn 105 m, vesikäyttö alussa | Marzili Funicular (huom. Bern-artikkeli sanoo 106 m ja "toiseksi lyhin"; teksti ei väitä lyhintä) | OK |
| tiedot[2] | Nydeggbrücke keskikaari 46 m, Euroopan suurin 1890-luvulle | Nydeggbrücke, Bridge construction | OK |
| valokuva.selite | neljäs kuoppa 1857, muutto 27.5.1857 Aaren yli | Bärengraben, History; Old City, 1857 | OK |
| nostot[0] (kaupunkilehti 0) | Berchtold-legenda, Verona, Brenodor, sinkkitaulu 1980-luvulla, vaakuna 1220-luvulta | Bern, Etymology, Early history | OK (Mutzopolis ks. yllä) |
| nostot[1] | holvikäytävät 1400-luvulla yläkerroista; Unescon perustelu | Old City, Great Fire of 1405 | OK |
| nostot[2] | 28.11.1848; syyt Zürich/Luzern/Sonderbund; 1852–1857 kaupungin kustannuksella; 5.6.1857; 16 vuotta 1873 | Bern, Modern history; Federal Palace, History; Old City | OK |
| nostot[3] | Anshelm 1513 Novara; 1400-luvun puolivälin maininta (1440s); 1857; BärenPark 2009; tunneli; Bärenbähnli 2015 | Bärengraben, History; Bern, Etymology | OK |
| matkailijalle.kappale | Bernin kantonin pääkaupunki; saksa enemmistö; 60 m; Unesco 1983; lentokentät alle 2 h junalla | Bern, Demographics, Topography, Airport | OK |
| jaksot[0] | 164 800 matkustajaa 2022; 1858–1860; valmistuminen 2029; kattoterassi; Libero, vyöhyke 100 | Bern, Public transport; Bern railway station | OK |
| jaksot[1] | 11 patsasta, valtaosa Hans Gieng; Zytglogge 3 min ennen tasatuntia; Matten kolme kanavaa ja myllyä | Bern, Main sights; Old City, Matte | OK |
| jaksot[2] | Bundeshaus yli 300 m, kupoli 64 m, 26 vesisuihkua, Marzilibahn, Ruusutarha 1913 | Federal Palace, Dome; Old City; Bern, Main sights | OK |
| jaksot[3] | Zibelemärit neljäs maanantai, kello 6–18, konfettitaistelu, 1405-legenda vs 1800-luvun puoliväli | Zibelemärit | OK |
| jaksot[4], saatiedot | tammikuu -0,5, heinäkuu 19,5, sade min 32 (tammi) max 144 (elo), summa 1150; shnit lokakuun alussa | saa.json: laskettu summa 1150; Bern, Film festivals | OK |
| matkailu.hyvaTietaa | Rail City auki pyhäpäivinä; lentoasema yleisilmailu ja charter | Bern railway station; Bern, Airport | OK |
| kuvataide nostot[3] | Zentrum Paul Klee 2005, Piano, 40 %, 1997, lähes 690 teosta, kolme kukkulaa; Kunstmuseum 1879, Picasso, Hodler | Zentrum Paul Klee; Museum of Fine Arts Bern | OK |
| kuvataide nostot[2] | 43 sivualttaria, kiistakeskustelu 6.–26.1.1528, kuoripenkit 1522–1525 ja 1863–64, terassi arkeologisesti rikas | Bern Minster, Altars, Choir stalls; History of Bern; Old City, Cathedral | OK |
| kuvataide nostot[0] | 47 patsasta jäljennöksiä, alkuperäiset historiallisessa museossa, ainoat säilyneet | Bern Minster, The Last Judgement | OK |
| kuvataide nostot[1] | ikkunat 2,92 x 13,15 m, raekuuro 1520 / 1868, Pariisi 1425 | Bern Minster, Stained glass | OK |
| nahtavyydet.Zytglogge | porttitorni, korotus 1270–1275, naisvankila 1344–1346, 1413, Brunner 1527–30, 1930 Kronos, 1770–71, 1981–83; 1873: yli 600 v | Zytglogge | OK |
| nahtavyydet.Liittopalatsi | Studer 1852–1857, Auer 1894–1902, 64 m, 30 kivilajia / 13 kantonia, 38 taiteilijaa, 7,2 milj. frangia | Federal Palace | OK |
| nahtavyydet.Bundesplatz | 1765 Hebler, Parlamentplatz 1909, kilpailu 1991, 31.7./1.8.2004, AIA 2006, kasino 1821 | Bundesplatz; Federal Palace | OK |
| nahtavyydet.Bärengraben | 1857, 1925, 1994–1996, Dählhölzli, tunneli, 2015, Mary Plain, Bond | Bärengraben | OK |
| nahtavyydet.Einsteinhaus | Kramgasse 49, 1903–1905, Mileva, Hans, museo | Einsteinhaus | OK |

## Muut tarkistukset

| kohta | tulos |
|---|---|
| Asukasluku 146 867 (31.12.2025) | OK: konteksti.json `kevytSisalto.asukkaat` (arvo 146867); Bern-lähde antaa vain "noin 146 000 (2024)". |
| 1873-väitteet (intro, Zytglogge, Münster, Liittopalatsi, Bundesplatz, Bärengraben, Einsteinhaus, N3) | OK: laskelmat 25 v, 16 v, 600+ v täsmäävät; ei keksittyjä isoisän tekemisiä. |
| Nykypolitiikka, sota | OK: ei vaaleja, ei nykypolitiikkaa; Sonderbund ja 1848 neutraalisti historiana. |
| Metateksti | OK: ei "Wikipedian mukaan" leipätekstissä; "lähteen mukaan" vain leipätekstissä ja faktoissa. Kuvateksteissä kaksi poikkeusta, ks. VÄÄRIN. |
| lyhyt-kentät | OK: kaikki ≤ 100 mrk (max 92), yksi virke; selitteet 1 virke. |
| Kuvatekstit vs kuvat.md | OK: kaikki kertovat kohteesta, eivät näkymästä, ja ovat sopusoinnussa "mitä kuvassa näkyy" -kuvausten kanssa (N3 litografia, N4 BärenPark, Zytglogge, Münster, kupoli, aukio jne.). Poikkeus: L3 lyhyt (ks. EPÄVARMA). |
| Koordinaatit | OK: Zytglogge 46.94806/7.44778, Münster 46.94722/7.45139, Liittopalatsi 46.94667/7.44417, Bundesplatz 46.94701/7.44412, Bärengraben 46.94802/7.45963, Einsteinhaus 46.94767/7.44997 vastaavat Wikipedia/Wikidata-koordinaatteja; kaikki rajojen sisällä; kohteiden etäisyys alle 2 km. |
| Kysymysten vihjeet | Q1 ks. EPÄVARMA; Q2–Q5 eivät paljasta vastausta. |
| Minitehtävä | Vastaus löytyy saman sivun nostosta L1; ei toista kaupungin kysymyksiä; fakta ei ole nostovirke sanasta sanaan; ei palkkiota. Ainoa virhe: oikea vaihtoehto pisin (VÄÄRIN yllä). |
| Faktapohjan ristiriidat | Marzilibahn 105 m (Marzili Funicular) vs 106 m (Bern); sisältö käyttää 105 m ilman "lyhin"-väitettä, hyväksyttävä. |

## Korjattu

- Minitehtävä: vaihtoehdot pidennetty ("Yhä portaalin ympärillä kirkon seinässä", "Zürichin Grossmünsterin kirkossa", "Ne tuhoutuivat reformaation aikana 1528"), oikea ei enää pisin.
- L2 nosto 2: "osa lasimaalauksista" 1441–1450; kuoleman tanssin ikkunan hahmot Niklaus Manuel 1516–1519; näytelmät 1300-luvulta (lyhyt ja selite vastaavasti); Pariisi-lause ja ikkunamitat tiivistetty pituuden vuoksi (2,92 × 13,15 m).
- Kuvatekstien "lähteen mukaan" poistettu (matkailijalle.kuva, jaksot[0].kuva).
- Q1 vihje, Q2 kysymys ja intro, Mutzopolis, "korkein tuomiokirkko" (fact, nähtävyys, parasta), Zytglogge "suuri kello", Liittopalatsi itäsiipi 1892, Küng/Heintz-muotoilu, kaupunkilehden johdanto, kello 10,5 t ja lyhyt "kellot soivat päivittäin", "neljän kansalliskielen maassa" poistettu, L3 lyhyt Münsterplattformista.
