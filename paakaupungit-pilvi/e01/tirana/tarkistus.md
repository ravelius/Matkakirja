# Tirana (tirana, e01) — riippumaton faktantarkistus

Tarkistettu suoraan lähteistä (en-Wikipedia, fi-Wikipedia, Wikivoyage, Wikidata-koordinaatit) 2026-10-10. Faktapohjaa ei luettu. sisalto.json ei muutettu.
Lyhenteet: KL0 = kaupunkilehti[0] (kaupunki), KL1 = kaupunkilehti[1] (nykytaide). Lähde "Tirana" = en:Tirana.

Yhteenveto: VÄÄRIN 9, EPÄVARMA 14.

## A. VÄÄRIN

| JSON-polku | väite | lähde (artikkeli + osio) | tulos | tarkka korvaava teksti |
|---|---|---|---|---|
| artikkeli.teksti (2. kappale) | "Tiranan linnoituksen jäljellä oleva muuri on bysanttilaiskauden jäänne" | en:Fortress of Justinian, johdanto: linnoitus (historia ennen 1300) on bysanttilaiskauden jäänne, mutta "all that is left above ground is a 6-metre Ottoman-era wall" | VÄÄRIN | "Tiranan linnoitus on bysanttilaiskauden jäänne, josta on jäljellä ottomaanien aikainen muuri" |
| KL0.nostot[0].lyhyt | "Tiranan linnoituksen muuri on bysanttilaiskauden jäänne." (sama virhe) | sama | VÄÄRIN | "Tiranan linnoitus on bysanttilaiskauden jäänne, ja sen muuri on ottomaanien ajalta." |
| nahtavyydet.Tiranan linnoitus.kuvat[0].lyhyt | "Tiranan linnoituksen muuri on bysanttilaiskauden jäänne." (sama virhe, ristiriidassa saman kuvan selitteen "ottomaanien aikainen muuri" kanssa) | sama | VÄÄRIN | "Tiranan linnoitus on bysanttilaiskauden jäänne, ja sen muuri on ottomaanien ajalta." |
| KL0.nostot[0].selite | "jossa pääiltä länteen ja pohjoisesta etelään kulkevat tiet risteävät" | en:Fortress of Justinian, johdanto: "main east–west and north–south roads crossed" | VÄÄRIN (kirjoitusvirhe "pääiltä") | "Linnoitus sijaitsi kohdassa, jossa itä–länsi- ja pohjois–etelä-suuntaiset tiet risteävät, ja se muodosti lähteen mukaan Tiranan sydämen." |
| nahtavyydet.Rinian puisto.teksti (4. kappale) | "Kesäjuhlaa eli Dita e Verë" | en:Tirana, Culture: "Dita e Verës" (alb. Dita e Verës = Kesäpäivä); myös Wikivoyage "Summer Day" | VÄÄRIN (albanian taivutus) | "Kesäjuhlaa eli Dita e Verësiä" tai neutraalisti "Kesäpäivää (Dita e Verës)" |
| nahtavyydet.Skanderbeg-aukio.teksti (3. kappale) | "Aukio uudistettiin kesästä 2017 alkaen jalankulkualueeksi" | en:Skanderbeg Square, History/2016: työt alkoivat 2016 ja aukio avattiin yleisölle kesäkuussa 2017; kesä 2017 on avajaiset, ei uudistuksen alku | VÄÄRIN | "Aukio uudistettiin 2016–2017 jalankulkualueeksi 51N4E-toimiston ja Anri Salan suunnitelman mukaan, ja se avattiin yleisölle kesäkuussa 2017." (palkintolause pysyy ennallaan) |
| KL0.matkailijalle.artikkeli.matkailu.parasta[1].selite | "Moskeijan seinämaalaukset ja kellotorni kuuluvat kaupungin vanhimpaan kerrokseen." | en:Tirana, Early development / Et'hem Bey Mosque, History: moskeija 1819/1821, torni 1822/1830; vanhempaa ovat Vanha moskeija 1614, Kokonozi 1750 ja Tabakkien silta (1700-luku). Perustamisvuosi 1614 | VÄÄRIN (perusteeton superlatiivi) | "Moskeijan seinämaalaukset ja kellotorni kuuluvat Tiranan ottomaanien ajan perintöön." |
| nahtavyydet.Kokonozin moskeija.teksti (2. kappale) | "nimensä mukaisesti se kuuluu yhä vanhan basaarin ympäristöön" | en:Kokonozi Mosque, johdanto: tunnetaan nimellä New Bazaar Mosque (Xhamia e Pazarit të Ri). Nimi viittaa uuteen basaariin, ei vanhaan | VÄÄRIN | "Nimensä mukaisesti se kuuluu yhä Uuden basaarin ympäristöön." |
| KL1.tehtava.vaihtoehdot | oikea "Nuorten teknologiakeskukseksi" (29 merkkiä) on pisin; muut 25, 26, 24 merkkiä | PILVIOHJE luku 4 + tehtävän ohje: oikea ei saa olla pisin | VÄÄRIN | vaihtoehdot: ["Nuorten teknologiakeskukseksi", "Kansalliseksi kirjastoksi ja lukusaliksi", "Parlamentin uudeksi istuntosaliksi", "Kaupungin keskusvirastotaloksi"], oikea 0. Huom: johdanto (KL1.johdanto) sanoo vastauksen sanasta sanaan ("pyramidi on nyt nuorten teknologiakeskus"); harkitse sen muotoilua, mutta vastaus löytyy myös nostoista (KL1.nostot[0].lyhyt) kuten säännössä vaaditaan. |

## B. EPÄVARMA

| JSON-polku | väite | lähde | tulos | tarkka korvaava teksti |
|---|---|---|---|---|
| nahtavyydet.Tabakkien silta.teksti (1. kappale) | "sen pääkaari on selkämäinen" | en:Tanners' Bridge: ei mainintaa kaaresta; fi/en-lähteistä ei löydy | EPÄVARMA | poista: "Se sijaitsee Tabakkien moskeijan lähellä." |
| KL0.nostot[3].selite | "Edward Lear kuvasi sillan ympäristöä vuonna 1848" | en:Tanners' Bridge ei mainitse Learia; tunnistus on vain Commons-tiedoston nimestä (ehdotukset sanoo saman) | EPÄVARMA | "Kaupunki pitää siltaa todisteena Tiranan 1700-luvun kaupunkikehityksestä." (Lear-lause pois tai "Commonsin mukaan Edward Lear kuvasi aluetta 1848") |
| KL1.nostot[2].selite | "Julkisivujen maalaus jatkui lähteen mukaan vuodesta 2000 vuoteen 2011" | en:Tirana, Contemporary: pormestarikausi 2000–2011, jonka aikana julkisivujen maalaus aloitettiin; ei sano maalauksen kestäneen koko kauden | EPÄVARMA | "Julkisivujen maalaus kuului lähteen mukaan kaupungin uudistuksiin 2000-luvun alussa, ja Anri Salan Dammi i colori käsittelee kaupungin muutosta värien kautta." |
| KL0.matkailijalle.artikkeli.jaksot[1].teksti | "kansalliskirjastolle, jonka kokoelmaan kuuluu lähteen mukaan runsaasti nidettä" | en:National Library of Albania: "1,169.767 books, periodicals, maps, atlases, microfilms and other library materials" (luku epäselvä); en:Tirana: "more than a million books, periodicals, maps..." | EPÄVARMA (epämääräinen ja "nide" väärä yksikkö) | "kansalliskirjastolle, jonka kokoelmassa on lähteen mukaan yli miljoona kirjaa, lehteä, karttaa ja muuta aineistoa" |
| KL0.matkailijalle.artikkeli.jaksot[4].teksti ja saatiedot.luonnehdinta | "Sateisimmat kuukaudet ovat lokakuu (152 mm) ja maaliskuu (134 mm), kuivin heinäkuu"; tammikuu 5,1 ja vuosisumma 982 mm | en:Tirana, Climate: sateet marras–maaliskuussa, vuosisumma 1 266 mm, tammikuu 6,7 °C. Wikivoyage-taulukko: marras 172, tammi 143 mm. Pilviajon saa.json (982 mm, loka 152, tammi 58) ei täsmää lähteisiin | EPÄVARMA | kirjoita hedgellä: "Sateet osuvat lähteen mukaan pääosin marraskuusta maaliskuuhun; vuosisumma on noin 1 000–1 300 mm lähteestä riippuen, ja tammikuun keskilämpötila on noin 5–7 astetta." Poista tarkat kuukausisijoitukset tai perustele saa-aineiston lähde |
| KL0.matkailijalle.artikkeli.jaksot[4].kuva.selite | "Tammikuun keskilämpötila on noin 5 astetta, ja sateet osuvat lähteen mukaan pääosin marraskuusta maaliskuuhun" | sama kuin yllä (en:Tirana 6,7 °C) | EPÄVARMA | "Tammikuun keskilämpötila on noin 5–7 astetta, ja sateet osuvat lähteen mukaan pääosin marraskuusta maaliskuuhun." |
| KL0.nostot[3].tiedosto / lyhyt / selite (KL1.nostot[3]) | Kuvassa Bunk'Art 2; selite "Näyttelyt yhdistävät Albanian uudemman historian nykytaiteen teoksiin" | Wikivoyage: Bunk'Art 1 yhdistää historian ja taiteen; Bunk'Art 2 keskittyy poliisin ja turvallisuuspalvelujen rooliin. Kuvateksti kuvaa eri museota kuin kuva | EPÄVARMA | selite: "Bunk'Artin näyttelyt kertovat Albanian 1900-luvun historiasta, ja yhdessä kohteessa on myös nykytaidetta." tai vaihda kuva Bunk'Art 1:n kuvaan |
| KL1.nostot[1].lyhyt ja teksti | "Skanderbeg-aukio uudistettiin 2017 jalankulkualueeksi, jonka kivet tuotiin eri puolilta Albaniaa" (lyhyt, ilman "lähteen mukaan") | en:Skanderbeg Square, Projects/2016: kivimateriaali oli suunnitelmassa tuotavaksi kaikkialta Albaniasta ja albaanien asuttamilta mailta; puutarhojen kasvillisuus samoin "would be represented" (suunnitelmamuoto) | EPÄVARMA | lyhyt: "Skanderbeg-aukio avattiin 2017 jalankulkualueena, jonka suunnitelmaan kuului kiveä eri puolilta Albaniaa." teksti: "Suunnitelman mukaan kivimateriaali tuotiin ..." |
| tiedot[2] | "sen jälkeen päivä päätettiin järjestää joka kuukausi" | en:Tirana, Urbanism: initiative "encouraging the Municipality to organise a vehicle-free day every month" (kannustus, ei päätös) | EPÄVARMA | "Tiranassa pidettiin ensimmäinen autoton päivä syyskuussa 2015, ja lähteen mukaan se kannusti kuntaa järjestämään autottoman päivän joka kuukausi." |
| KL0.johdanto | "Pääkaupungiksi se julistettiin vasta 1920" | en:Tirana, Modern development: 8.2.1920 väliaikaisena, pysyvästi 31.12.1925 (ehdotukset tunnistaa riskin) | EPÄVARMA (epätäydellinen) | "Pääkaupungiksi se julistettiin väliaikaisesti vasta 1920 ja pysyvästi 1925" |
| kohdekartta.esittely | "samoilla muutamalla sadalla metrillä" | koordinaateista: Skanderbeg-aukio – Tabakkien silta noin 680 m, Kokonozi noin 590 m | EPÄVARMA | "samalla noin kilometrin säteellä" |
| kohdekartta.kohteet[Tiranan kellotorni] (41.32772, 19.81965) | koordinaatti | Wikidata Q2474224: ei koordinaatteja; Wikivoyage antaa vain Et'hem Beyn moskeijalle 41.3278, 19.81933. Kellotorni on moskeijan vieressä (~30 m), joten osuma on uskottava, mutta lähdettä ei ole | EPÄVARMA (matala riski) | säilytä, tai käytä Et'hem Beyn koordinaatteja + dokumentoi arvio faktapohjaan |
| KL0.matkailijalle.artikkeli.jaksot[0].teksti | "vuonna 2020 kaupunkilinjoja oli 16 ja esikaupunkilinjoja 14" | en:Tirana, Bus: 16 + 14 linjaa; vuosi 2020 koskee erillisiä bussikaistoja ja pysäkkejä (451), ei linjamäärää | EPÄVARMA | "kaupunkilinjoja on lähteen mukaan 16 ja esikaupunkilinjoja 14" |
| KL0.matkailijalle.artikkeli.matkailu.parasta[4].selite | "uudistettu basaari" | en:Fortress of Justinian, Traditional bazaar: joulukuussa 2018 avattu uusi perinteinen basaari (ei vanhan uudistus) | EPÄVARMA | "Vanha muuri ja linnoituksen alueelle 2018 avattu basaari ovat aivan keskustan tuntumassa." |
| kysymykset[1].hint | "Vuosi ajoittuu aikaan, jolloin nykyisen kaupungin muoto alkoi hahmottua." | Johdanto sanoo "muotonsa 1600-luvun alussa"; ainoa 1600-luvun vaihtoehto on 1614, joten vihje yhdessä sivun kanssa paljastaa vastauksen | EPÄVARMA (vihje liian paljastava) | "Vuosi on ottomaanien ajalta, ja rakentaja oli paikallinen ylimys, ei sulttaani." |

## C. OK (tarkistetut väitteet)

| JSON-polku | väite | lähde (artikkeli + osio) | tulos |
|---|---|---|---|
| artikkeli.intro | pääkaupunki ja suurin kaupunki; Tiranan tasanko, Dajti itäpuolella | en:Tirana, johdanto; Geography | OK |
| artikkeli.intro | esihistoriallinen asutus; venetsialaiset asiakirjat 1350-luvulla | en:Tirana, Early development | OK |
| artikkeli.intro, kysymykset[1], KL0.nostot[0] | Sulejman Bargjini 1614: moskeija, pieni kauppakeskus, hammam; basaari ja vesimyllyt jo ennen (Hahn) | en:Tirana, Early development (huom. Wikivoyage: "mosque, bakery, hamam"; ristiriita, en-lause valittu oikein) | OK |
| artikkeli.intro, KL0.johdanto, nahtavyydet | 1873: ottomaanien aikainen basaarikaupunki; Et'hem Beyn moskeija (valmis 1819/1821) ja kellotorni (1822/1830) seisoivat | en:Et'hem Bey Mosque, History; en:Tirana Clock Tower, History (1820-luvulla Tirana jo merkittävä kaupunki, ~13 000 as.) | OK |
| artikkeli.intro | väliaikainen pääkaupunki 1920, pysyvä 1925; itävaltalaiset ja italialaiset suunnitelmat | en:Tirana, Modern development | OK |
| artikkeli.intro, saatiedot | 598 176 asukasta, 2023 väestölaskenta | en:Tirana, Demographics; fi:Tirana, Väestö | OK |
| artikkeli.intro, KL1.tehtava, nahtavyydet.Tiranan pyramidi | avattiin 1988 museona; nyt nuorten teknologiakeskus TUMO Tirana; MVRDV; portaat auki toukokuussa 2023; 1,7 ha; suunnittelijat; "kallein" lähteen mukaan; 6 000 allekirjoitusta; 2017 kunnostus; 2001 lähetyskeskus | en:Pyramid of Tirana, Background / Post-Communism / Renovation | OK |
| artikkeli.teksti | aukion ympäristö; 51N4E ja Anri Sala; avattu kesäkuussa 2017 | en:Skanderbeg Square, Projects/2016 | OK |
| artikkeli.teksti, nahtavyydet.Kokonozin moskeija | Kokonozin moskeija 1750; suljettu 1966, ruokavarasto ja tupakkakauppa; avattu helmikuussa 1991; "ehjänä" (Wikivoyage: intact) | en:Kokonozi Mosque; Wikivoyage Tirana, See | OK |
| artikkeli.teksti, nahtavyydet.Tabakkien silta | 1700-luvun silta; Debar-tie; Lanë ohjattiin 1930-luvulla; kunnostus 1990-luvulla; perustukset paljastuivat | en:Tanners' Bridge, johdanto + History | OK |
| artikkeli.teksti, KL0.nostot[1], nahtavyydet.Et'hem Beyn moskeija | avattu uskonnolliseen käyttöön 1991 (18.1.1991, ~10 000 ihmistä lippujen kanssa); suljettu kommunistiaikana; kunnostus 1960-luvun lopulla ja 1970-luvun alussa | en:Et'hem Bey Mosque, johdanto + History | OK |
| artikkeli.teksti, KL0.matkailijalle.jaksot[2], nahtavyydet | Dajti ~1 600 m (huippu Maja e Dajtit 1 613 m); luonnonparveke; kansallispuisto 1966; 26 km itään; köysirata 4,7 km, 15 min; bussi 15–20 min; Llarkan tasanko; karhu, susi, villikissa | en:Dajti; en:Dajti Mountain National Park | OK |
| artikkeli.teksti, nahtavyydet.Rinian puisto | Rinia 1950; Taivani-keskus länsireunalla; keilarata kellarissa; ironinen "Taiwan"; ~130 rakennusta purettu 2000; 2,98 ha; ~500 m aukiolta; 14.3. juhla, Elbasan, sirkus | en:Rinia Park; en:Tirana, Architecture | OK |
| kysymykset[0] | Skanderbeg-aukio nimetty kansallissankarin mukaan; monumentti hallitsee | en:Skanderbeg Square, johdanto. Huom: sivun omat tekstit sanovat "Skanderbeg-aukio", joten kysymys on triviaali, mutta ei virhe; oikea (10 merk.) ei ole pisin | OK |
| kysymykset[2] | Dajti, luonnonparveke; Maja e Dajtit 1 613 m; puisto 1966; vääriä vaihtoehtoja korkeampia vuoria; oikea ei pisin | en:Dajti; en:Dajti Mountain National Park, Geology ("Balcony of Tirana") | OK |
| kysymykset[3] | kello valettiin Accerboni-veljesten valimossa Triestessä 29.7.1838; halkaisija 0,74 m; vihje ei paljasta kaupunkia; oikea ei pisin | en:Tirana Clock Tower, History | OK |
| kysymykset[4] | tabakë = nahkurit; suvut Xheleti ja Kuka; Lanë; lihakauppiaat ja nahkurit; oikea ei pisin; vihje ei paljasta | en:Tanners' Bridge, johdanto + History | OK |
| tiedot[0] | 2016 Albania ohitti Espanjan; 654 kahvilaa / 100 000 as. | en:Tirana, Cuisine | OK |
| tiedot[1] | "Taiwan" ironisesti; Taivani-keskus; kahvilat, ravintolat, keilarata | en:Rinia Park, History + Taivani | OK |
| tiedot[2] (ensimmäinen autoton päivä syyskuussa 2015) | ensimmäinen osa | en:Tirana, Urbanism | OK (jälkiosa EPÄVARMA ylhäällä) |
| valokuva, KL0.kansikuvat | kuvatekstit kertovat kohteesta; molemmat rakennukset seisoivat 1873; keskikorkeus ~110 m; Dajti itäpuolella; "rakennuskokonaisuus" | en:Tirana, Geography; en:Et'hem Bey Mosque, johdanto | OK; kuvaukset täsmäävät kuvat.md:hen |
| KL0.nostot[0].teksti | Pëllumbasin luola paleoliittinen; Venetsia 1350-luvulla ja 1418; 1431–32: 60 asuttua aluetta, 7 300 asukasta | en:Tirana, Early development | OK |
| KL0.nostot[1].teksti | rakentaminen 1791/1794 Molla Bey; valmis 1819/1821; seinämaalaukset (puut, vesiputoukset, sillat; useimmat kuvitteellisia); torni 1822/1830; Tufina vuoteen 1973 | en:Et'hem Bey Mosque; en:Tirana Clock Tower | OK |
| KL0.nostot[1].selite | Lear syyskuussa 1848 (28.9.), varhaisin kuvadokumentti | en:Tirana Clock Tower, History | OK |
| KL0.nostot[2] | Lushnjë 1920, 1925; kartta elokuussa 1916 (itävaltalais-unkarilaiset); 1923 suunnitelma; Di Fausto, Brasini; bulevardi 1930; palatsi Zogu I:lle; nimi "prikaati otti italialaisilta" | en:Tirana, Modern development + Architecture; en:Presidential Palace, Tirana | OK |
| KL0.nostot[3].teksti | tie Debariin, maanviljelijät, karja; Lanë-puro; 1930-luku; 1990-luku; jalankulku | en:Tanners' Bridge | OK |
| KL0.matkailijalle.kappale, jaksot | bussiverkko, ei metroa; Lanë ja Dëshmorët e Kombit jakavat keskustan neljään osaan; kadunnimet; jalkakäytävät | Wikivoyage Tirana, Get around / Walking | OK |
| KL0.matkailijalle.jaksot[0] | lentoasema luoteessa Krujën kunnassa, 11–17 km (en 11 km, Wikivoyage 17 km); ainoa säännöllinen lentoasema; bussit Tiranaan, Durrësiin, Shkodëriin, Fieriin; rautatieasema Kashariin 2013; Google Maps | en:Tirana International Airport; Wikivoyage Tirana, Get in | OK |
| KL0.matkailijalle.jaksot[1] | linnoituksen basaari joulukuussa 2018; Pyramidin portaat huipulle (Wikivoyage); museo remontissa 2028 (en:National History Museum) | en:Fortress of Justinian; Wikivoyage Tirana, See | OK |
| KL0.matkailijalle.jaksot[3] | fërgesë paprikasta tai maksasta; tavë dheu; pizza ja pasta; juusto, oliivit, viini | en:Tirana, Cuisine; Wikivoyage Eat | OK |
| KL0.matkailijalle.matkailu.hyvaTietaa | kengät pois, ei vierailua rukouksen aikana | en:Et'hem Bey Mosque, johdanto | OK |
| KL1.nostot[1].teksti | 51N4E ja Anri Sala; kesäkuu 2017; palkinnot 2018 ja 2019 (EU:n 2. palkinto); "Balkanin suurin jalankulkualue" (lähteen mukaan) | en:Skanderbeg Square, History | OK |
| KL1.nostot[2].teksti | Anri Sala s. 1974, video; opinnot 1992–1996, Pariisi, Tourcoing; Dammi i colori Tate Modernissa; Ranska Venetsian biennaalissa 2013; Vincent-palkinto 2014 | en:Anri Sala | OK |
| KL1.nostot[3].teksti | Bunk'Art kaksi bunkkeria, Hoxhan käskystä; WWII ja kylmä sota; ~3 000 m² (suuri), 1970-luku, salainen; Taidegalleria ~4 500 teosta | en:Tirana, Museums; Wikivoyage Tirana, See (Bunk'Art) | OK |
| nahtavyydet.Skanderbeg-aukio | ~4 ha; Odhise Paskali; itävaltalaiset 1917; Brasini 1925, Di Fausto, Bosio 1939; 1928–1939 liikenneympyrä ja suihkulähde; palkinto 2018; rakennuslista | en:Skanderbeg Square; en:Skanderbeg Monument | OK |
| nahtavyydet.Tiranan kellotorni | tunnistettu lokakuussa 1948; Et'hem Bey minareetin jälkeen; kronogrammi; ~33 m (32,5 m); Priskë; 1928 remontti; reliefit pohjaseinällä; Tufina 1973; Lear 1848; kunnostus helmikuu 2010; mahya | en:Tirana Clock Tower | OK |
| nahtavyydet.Tiranan linnoitus | ennen 1300; Tirkan; kolme tornia; 6 m ottomaanien aikainen muuri; Murat Toptan; 1. luokan monumentti kesäkuussa 1973; basaari joulukuu 2018 | en:Fortress of Justinian; en:Tirana, Early development | OK |
| nahtavyydet.Et'hem Beyn moskeija | sunnalainen; portiikki pohjoispuolella; basaari edessä; Sulejman Pashan moskeija 1614 tuhoutui WWII:ssa | en:Et'hem Bey Mosque | OK |
| ei nykypolitiikkaa/sotaa | Sisältö on historiaa neutraalisti: ei vaaleja, ei nykysotaa, ei pormestarien nimiä; Bunk'Art ja Prikaatien palatsi historiana | tarkistettu koko sisalto.json | OK |
| 1873-väitteet | Kokonozi (>100 v), moskeija (>50 v), kellotorni, silta, linnoituksen muuri olivat; aukio (1917), pyramidi (1988), Rinia (1950) eivät | em. lähteet | OK |

## D. Koordinaatit

| kohde | sisalto.json | lähde | tulos |
|---|---|---|---|
| Skanderbeg-aukio | 41.32833, 19.81833 | Wikidata Q609528 (sama) | OK |
| Et'hem Beyn moskeija | 41.32778, 19.81917 | Wikidata Q798610 (sama); Wikivoyage 41.3278, 19.81933 | OK |
| Tiranan kellotorni | 41.32772, 19.81965 | ei lähdekoordinaattia | EPÄVARMA (ks. B) |
| Tiranan linnoitus | 41.32639, 19.82194 | Wikidata Q1106373 (sama); Wikivoyage 41.326389, 19.821944 | OK |
| Tabakkien silta | 41.32642, 19.82605 | vain Wikivoyage 41.326420, 19.826052 (Wikidata Q1630016 antaa karkean 41.33, 19.82, ~800 m pielessä). Sijainti on johdonmukainen: Tabakkien moskeija (Wikidata/Wikivoyage 41.3267, 19.8281) on noin 190 m itään, ja lähde sanoo sillan olevan moskeijan lähellä | OK |
| Kokonozin moskeija | 41.3301, 19.825 | Wikidata Q13047909 41.33014, 19.82500 ja Wikivoyage 41.3301, 19.825 (Rruga Thimi Mitko, Uuden basaarin alue) — siis myös Wikipedia-sivun koordinaatti | OK |
| Tiranan pyramidi | 41.32306, 19.82139 | Wikidata Q177335 (sama) | OK |
| Rinian puisto | 41.32472, 19.81806 | Wikidata Q195228 (sama); ~400 m Skanderbeg-aukiolta, lähde sanoo ~500 m | OK |
| kohdekartta.rajat | N 41.3328 / S 41.3204 / W 19.8145 / E 19.8297 | kaikki kahdeksan kohdetta rajojen sisällä | OK |
