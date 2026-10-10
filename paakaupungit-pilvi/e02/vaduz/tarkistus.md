# Vaduz (vaduz, e02) — riippumaton faktantarkistus

Lähteet luettu itse (`tyokalu.mjs lahde`, haettu 2026-10-10): en Vaduz, Vaduz Castle, Vaduz Cathedral, Schalun Castle, Liechtenstein National Museum, Kunstmuseum Liechtenstein, History of Liechtenstein, Liechtenstein; fi Vaduz, Liechtensteinin taidemuseo; lisäksi en Josef Johann Adam, Ida Ospelt-Amann (API-ote) ja OSM/Commons-koordinaatit. Faktapohjaan ei luotettu.

Yhteenveto: VÄÄRIN 9, EPÄVARMA 8.

## A. VÄÄRIN ja EPÄVARMA (korjattava)

| JSON-polku | Väite | Lähde (artikkeli + osio) | Tila | Korvaava teksti |
|---|---|---|---|---|
| kaupunkilehti[1].nostot[0].lyhyt (Nosto T1, + kuvat.md:n huomio "T1 ... hankki Vaduzin 1712") | "Josef Johann Adam von Liechtenstein oli ruhtinas, jonka aikana suku osti Vaduzin kreivikunnan." | en History of Liechtenstein, Early modern: Vaduz osti 1712 ruhtinas Johann Adam Andreas (myös fi Vaduz, Historia). en Josef Johann Adam: ruhtinas vasta 1721–1732, syntyi 1690. Kuvan mies ei ole ostaja. | VÄÄRIN | "Josef Johann Adam von Liechtenstein (1690–1732) oli ruhtinas 1721–1732, ruhtinaskunnan perustamisen jälkeen." Selite: "Vaduzin kreivikunta ostettiin vuonna 1712, ja ruhtinaskunta sai nimensä seitsemän vuotta myöhemmin." jää (OK). Korjaa myös kuvat.md-huomio (T1 ei hankkinut Vaduzia; ostaja oli Johann Adam Andreas) ja ehdotukset.huomiot-rivi ratkaistuksi. |
| kaupunkilehti[1].tehtava.fakta | "Armeija lakkautettiin 12.2.1868 rahoitussyistä, ja maa julisti samalla pysyvän puolueettomuuden." | Sama virke on sanasta sanaan nostossa kaupunkilehti[1].nostot[2].teksti ("Armeija lakkautettiin 12.2.1868 rahoitussyistä."). Sääntö 12: fakta ei saa olla nostovirke. Lisäksi "rahoitussyistä" on yksinkertaistus (ks. alla). | VÄÄRIN | "Liechtenstein ei liittynyt vuonna 1871 perustettuun Saksan keisarikuntaan eikä Itävaltaan, vaan julisti pysyvän puolueettomuuden." (en History of Liechtenstein, Constitution and latter century). Vastaus 80 löytyy nostosta (armeijan 80 miestä), joten säilyy. |
| kysymykset[3].hint | "Toinen materiaaleista on tulivuorikiveä." | Vihje paljastaa vastauksen: vain oikea vaihtoehto sisältää basaltin (tulivuorikiven). en Kunstmuseum Liechtenstein, Architecture, itse väite OK. | VÄÄRIN | "Rakennus on ulkopuolelta lähes musta." |
| kysymykset[4].hint | "Sana tulee latinasta, ja se liittyy veden kuljettamiseen." | Vihje sanoo vastauksen (vesijohto = veden kuljettaminen). en Vaduz, Etymology: auadutg 'aqueduct' < aquaeductus, väite OK. | VÄÄRIN | "Nimi on romaanista alkuperää, ei saksalaista." |
| kaupunkilehti[0].nostot[1].selite (Nosto K2) | "... ja se sai paikkansa keisarikunnan valtiopäivillä 1719." | en Vaduz, History / History of Liechtenstein: 23.1.1719 Liechtensteinista tuli keisarikunnan suvereeni jäsen ja ruhtinaskunta; lähteet kertovat vain, että suku tavoitteli paikkaa valtiopäivillä, eivät että se saatiin 1719. | VÄÄRIN | "Ruhtinaskunta sai nimensä Liechtensteinin suvulta, ei kaupungilta, ja siitä tuli keisarikunnan suvereeni jäsen 1719." |
| nahtavyydet.Vaduzin linna.kuvat[0].lyhyt | "Vaduzin linnan pyöreä torni on rakennettu karkeasta kivestä." | Kuvateksti kuvailee kuvan näkymää (sääntö 11), ei kohdetta. Kuvan pyöreä torni on eri kuin 1100-luvun päätorni: fi Vaduz, Vaduzin linna: "Pyöreää tornia rakennettiin vuodesta 1529 vuoteen 1532". | VÄÄRIN | lyhyt: "Vaduzin linnan pyöreä torni rakennettiin vuosina 1529–1532." selite: "Linnan tornit ja siivet ovat syntyneet eri vuosisatoina, ja vanhin osa on 1100-luvun itätorni." |
| kaupunkilehti[1].nostot[3].selite (Nosto T4) | "Kuva on vuodelta 1931, ja se on vanhin löytynyt kuva maapäivistä." | "Vanhin löytynyt" on metatekstiä hausta (kuvat.md), ei fakta kohteesta; sääntö 10 ja 11. | VÄÄRIN | "Maapäivät eli Landtag on Liechtensteinin parlamentti, ja kuva on vuodelta 1931." |
| tiedot[2] | "Runoilija Ida Ospelt-Amann (1899–1996) kirjoitti Vaduzin alemannisella murteella, ja hän julkaisi teoksensa yksinomaan sillä." | en Vaduz, Notable people: "wrote and performed in the Vaduz Alemannic dialect"; en Ida Ospelt-Amann: "wrote in the Alemannic dialect ... most important of her country's dialect poets". "Yksinomaan" ei ole lähteessä. Vuodet OK. | VÄÄRIN | "Runoilija Ida Ospelt-Amann (1899–1996) kirjoitti Vaduzin alemannisella murteella, ja lähteen mukaan häntä pidettiin maan tärkeimpänä murderunoilijana." |
| kaupunkilehti[0].matkailijalle.artikkeli.jaksot[4].teksti | "Wikipedian ilmasto-osio antaa heinäkuun keskimaksimiksi 25 astetta ..." | Sääntö 10: ei metatekstiä ("Wikipedian mukaan"). Luvut OK (en Vaduz, Climate: heinä-max 25, tammi-max 3, ~900 mm). | VÄÄRIN | "Lähteen ilmastotietojen mukaan heinäkuun keskimaksimi on 25 astetta, tammikuun 3 astetta ja vuosisade noin 900 millimetriä, joten mittauspisteen sademääriä kannattaa pitää suuntaa-antavina." |
| kaupunkilehti[1].nostot[2].teksti (+ tehtava.fakta) | "Armeija lakkautettiin 12.2.1868 rahoitussyistä." | en History of Liechtenstein: lakkautettiin 12.2.1868 (OK), syinä liiton hajoaminen 1866, sodan epäsuosio ja kohoavat ylläpitokustannukset, ei pelkästään rahoitus. | EPÄVARMA | "Armeija lakkautettiin 12.2.1868, kun Saksan liitto oli hajonnut ja ylläpito oli käynyt kalliiksi." |
| kaupunkilehti[1].nostot[3].teksti | "kansankokous pidettiin 22.3.1848" | en History of Liechtenstein: 22.3.1848 "people's committee" (kansankomitea) nimesi kolmihenkisen johtokunnan. Kansankokouksesta lähde ei puhu. | EPÄVARMA | "kansankomitea asetti 22.3.1848 kolmihenkisen johtokunnan" |
| kaupunkilehti[1].nostot[3].teksti | "Se perustui Vorarlbergin perustuslakiin" | en History of Liechtenstein: "heavily inspired by the constitution of Vorarlberg" (vahva esikuva, ei perustunut). | EPÄVARMA | "Sen esikuvana oli lähteen mukaan pitkälti Vorarlbergin perustuslaki" |
| kaupunkilehti[1].nostot[1].teksti | "ja kylä rakentui uudelleen linnan juurelle. Tästä ajasta Vaduzissa muistuttavat linnan paksut kiviseinät, jotka ovat peräisin eri vuosisadoilta." | Lähteissä ei ole uudelleenrakentumista eikä seinien yhteyttä 1499-polttoon (en Vaduz Castle: vain tornin seinät jopa 4 m, 1100-luku; poltto 1499). Kuvateksti (kaupunkilehti[1].nostot[1].selite) toistaa saman. | EPÄVARMA | Poista kaksi viimeistä virkettä. Selite: "Linnan vanhimmat osat ovat 1100-luvulta, ja tornin seinät ovat maan tasolla jopa neljä metriä paksut." |
| nahtavyydet.Liechtensteinin kansallismuseo.kuvat[0].selite | "Museon kolme rakennusta ovat yhteensä 2 000 neliömetrin näyttelytilat." | en Liechtenstein National Museum: 2 000 m2 koko museolla, joka on neljä osaa; "three buildings" koskee pääosaa/huoneita. Ristiriidassa saman sivun tekstin "neljä osaa" kanssa. | EPÄVARMA | "Museon näyttelytilaa on yhteensä 2 000 neliömetriä ja 42 huonetta." |
| kaupunkilehti[0].kansikuvat[2].lyhyt/selite | "Rein muodostaa Liechtensteinin rajan Sveitsiin." Kuva (kuvat.md): ylhäältä katsottu laakso, katot, viinitarhat, vuorijono; Reiniä ei näy. | Väite OK (en Liechtenstein, Rivers: Rein ~27 km, luonnollinen raja). Kuvateksti ei kuitenkaan kerro siitä, mitä kuvassa on (kohde). | EPÄVARMA | lyhyt: "Vaduzin takana kohoavat Alpit, ja Rein kulkee laakson länsireunalla." selite: "Rein on 27 kilometriä pitkä raja Sveitsin kanssa." |
| saatiedot (sade, luonnehdinta) ja matkailijalle-jakso | Sade 49/155/.../101 mm, vuosisumma 1 724 mm | en Vaduz, Climate: noin 900 mm/vuosi. Summa laskettu: 1 724 (täsmää). Tammi 49 vs helmi 155 on epäuskottava hyppy. Ristiriita on kirjattu oppaaseen (sääntö 3 täyttyy), mutta lukuja ei voi vahvistaa lähteestä. | EPÄVARMA | Harkitse vain lämpötilojen näyttämistä tai sateen kuvaajan poistoa; muuten jää tekstin varoituksen varaan. |

## B. Tarkistettu ja OK

| JSON-polku | Väite | Lähde | Tila |
|---|---|---|---|
| artikkeli.intro | Pääkaupunki, Reinin itäranta, Alppien juuri, linna, Schaan suurempi | en Vaduz lead; fi Vaduz (itäranta) | OK |
| artikkeli.intro | 6 109 asukasta (2025) | konteksti.json asukkaat (sallittu lähde, ennakkotieto) | OK |
| artikkeli.intro | Nimi romaaninen, vesijohto; merkinnät 1100-luvulta | en Vaduz, Etymology + History | OK |
| artikkeli.intro/teksti | 1712 Vaduzin kreivikunta; 1719 ruhtinaskunta (Kaarle VI) | en Vaduz, History | OK |
| artikkeli.intro | Armeija lakkautettu 1868; rautatie 1872, asema Schaanissa; Euroopan neljänneksi pienin | en History of Liechtenstein; en Vaduz, Economy; en Liechtenstein lead ("fourth-smallest country") | OK |
| artikkeli.teksti | Kreivikunta 1342 Werdenbergin osana; 1499 poltto; 1592 markkinaoikeudet; 1699 Schellenberg; 1862 perustuslaki; 1864 kunnallislaki; 1872 rautatie; 1890 kansallismuseo; 2000 Kunstmuseum | en History of Liechtenstein; en Vaduz; fi Vaduz; National Museum; Kunstmuseum | OK |
| kysymykset[0] | Rein, itäranta, 27 km raja | en Vaduz; en Liechtenstein, Rivers and lakes | OK (vihje lievästi vihjaava: vain Rein rajaa Sveitsiä, hyväksyttävä) |
| kysymykset[1] | Vaduzin linna, vakituinen asuinpaikka 1938 | en Vaduz Castle, Today | OK |
| kysymykset[2] | Sveitsin frangi, tulli- ja rahaliitto | en Liechtenstein, Economy | OK (vihje "naapurinsa" jättää Itävallan auki, hyväksyttävä) |
| kysymykset[3].fact | Värjätty betoni, musta basaltti, jokikivet | en Kunstmuseum, Architecture | OK |
| kysymykset[4].fact | auadutg < aquaeductus | en Vaduz, Etymology | OK |
| kysymykset (kaikki) | Oikea ei pisin; oikea indeksissä 0 sallittu (peli sekoittaa, PILVIOHJE rivi 212) | — | OK |
| kysymykset / tehtava | Ei toista toisiaan; tehtävän vastaus 80 löytyy nostosta | — | OK |
| tiedot[0], tiedot[1] | Ei lentokenttää, Zürich; Gampriner Seelein ainoa luonnonjärvi, syntyi 1927 Reinin tulvassa | en Vaduz, Economy; en Liechtenstein, Rivers and lakes | OK |
| valokuva.* | Vanhimmat osat 1100-luku, vakituinen asuinpaikka 1938 | en Vaduz Castle | OK |
| kohdekartta.kohteet | Linna 47.13944, 9.52444 (en/OSM 47.13957, 9.52452); katedraali 47.1362, 9.5227 (OSM 47.13621, 9.52286); kansallismuseo 47.13811, 9.52267 (OSM 47.13818, 9.52274); Schalun 47.1509, 9.5336 (OSM 47.15084, 9.53344) | en-artikkelit + Nominatim | OK |
| kohdekartta.kohteet[3] Kunstmuseum | 47.13944, 9.5225 — sama leveysaste kuin linnalla | Epäilty, mutta oikea: OSM Kunstmuseum Liechtenstein, Städtle 32: 47.13950, 9.52211; Commons-kuva 47.13963, 9.52243. Museo on Städtlen pohjoispäässä linnan kanssa samalla leveysasteella, linna vain 0,002° idempänä rinteellä. Ero ~30 m. | OK |
| kohdekartta.rajat, esittely | Kaikki 5 kohdetta rajojen sisällä; Schalun koillisessa (OSM-etäisyys keskustasta ~1,4 km, lähde sanoo "roughly 1 km") | en Schalun Castle | OK |
| nahtavyydet.Vaduzin linna | Torni 12 × 13 m, seinät 4 m, sisäänkäynti 11 m, Werdenberg-Sargans, 1499, 1613–1640, 1712, Anna-kappeli, 1938, ei avoin; 1322 maininta | en Vaduz Castle; en Vaduz, History | OK |
| nahtavyydet.Vaduzin linna (1873) | Linna suvun omaisuutta yli 150 vuotta (1712→1873 = 161), ruhtinas ei asunut maassa | en History of Liechtenstein: ruhtinas asui Wienissä, 1. suvereenin vierailu 1842; fi Vaduz 1938 | OK |
| nahtavyydet.St. Florinin katedraali | Uusgoottilainen, F. von Schmidt, 1874, Florinus 800-luvun pyhimys, arkkihiippakunta 2.12.1997, seremonia 12.12.1997, hautakappeli 1.11., Franz Joseph II (1989), Alois (1869–1955); 1873 hedge | en Vaduz Cathedral | OK |
| nahtavyydet.Liechtensteinin kansallismuseo | 1438 / n. 1500, Kaspar 1637, Goethe 1.–2.7.1788, 1865–1905, kellarit vankila, 1890, 1972, 1992, 28.11.2003, 4 osaa, aarrekammio 2015, 2 000 m², 42 huonetta | en National Museum; fi Vaduz, Kansallismuseo | OK |
| nahtavyydet.Kunstmuseum Liechtenstein | Rakentajat, marraskuu 2000, 6 tilaa, 2 porrasta, elokuu 2000 lahjoitus, 12.11.2000 avajaiset, Hilti 2015, 1967/1968 | en Kunstmuseum | OK |
| nahtavyydet.Schalunin linnanraunio | 1100-luvun loppu, 1237, Wildschloss, ~1 km koilliseen, 1700-luku ruhtinas, 1933 kunta, sali ja vartiotorni | en Schalun Castle | OK |
| kaupunkilehti[0].nostot[0] | Linna-nosto (1100-luku, mitat, 1499, 1613–1640, 1712, 1938, ei avoin) | en Vaduz Castle | OK |
| kaupunkilehti[0].nostot[1].teksti | 1699/1712 Hohenemsin suvulta, 1342, 1592, ensivierailu 1842, 1938 | en Vaduz; en History of Liechtenstein | OK |
| kaupunkilehti[0].nostot[1].lyhyt | Anton Florian, jonka kunniaksi nimi | en Vaduz, History | OK |
| kaupunkilehti[0].nostot[2] | Kunstmuseum-nosto | en Kunstmuseum | OK |
| kaupunkilehti[0].nostot[3] | Kansallismuseo-nosto | en National Museum; fi Vaduz | OK (selite 28.11.2003 OK) |
| kaupunkilehti[0].matkailijalle + artikkeli | Ei lentokenttää, Schaan-Vaduz, frangi, hautakappeli; A13/A14, bussivälit 20–40 min, Malbun; ruoka (vehnä, ohra, maissi, peruna, maito, karja, viini); museot; katedraalin kuvat | en Vaduz, Economy; en Liechtenstein, Economy; Sports | OK |
| kaupunkilehti[1].nostot[0].teksti | 23.1.1719, Anton Florian, rajat vuodesta 1434, Rein 27 km | en Vaduz; en History of Liechtenstein | OK |
| kaupunkilehti[1].nostot[2] | 1866 sota, Stilfser Joch, Rheinberger, 20 miehen reservi, 22.7., 80/81, Kieber 1844–1939 (94 v.) | en History of Liechtenstein | OK (lyhyt ja selite OK) |
| kaupunkilehti[1].nostot[3] | Schädler, 26.9.1862, Landtag, 27.7.1848, 20.7.1852, kunnallislaki 1864; 1873-lause | en History of Liechtenstein; en Vaduz, Politics | OK (paitsi A-osan rivit) |
| ehdotukset.huomiot | Kunstmuseum-koordinaatti (vahvistettu OK), T1-kysymys (ks. A) | — | Rivi T1 ratkaistu: kuvateksti oli väärin |

## Muut huomiot

- 1873-väitteet: ei keksittyjä isoisän tekemisiä; kaikki lähteen tai päättelyn varassa ja merkitty varovaisesti. Katedraali "valmistumassa tai vielä valmistumatta" on hyväksyttävä varaus.
- Nykypolitiikka/sota: ei ongelmia (1866 sota historiaa, neutraalisti).
- Kuvat vs kuvat.md: kaikki muut kuvatekstit kertovat kohteesta ja sopivat "mitä kuvassa näkyy" -kuvaukseen; poikkeukset A-osassa (linna 0007, Schlossweg 0014, T1).
- Fi/en ristiriita linnan iästä (fi: rakennettu n. 1300, vanhimmat osat 1100-luvulla; en: torni 1100-luvulta) on teksteissä ratkaistu en-linjalla; ei virhe.
