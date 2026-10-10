# Chișinău (chisinau), erä e01 — riippumaton faktantarkistus

Lähteet haettu `tyokalu.mjs lahde` -työkalulla (en/fi-Wikipedia, Wikivoyage-tiedosto wv-chisinau); faktapohjaa ei luettu. Lyhenteet: EN = en:Chișinău, HIST = en:History of Chișinău, ARCH = en:Triumphal Arch, Chișinău, KAT = en:Nativity Cathedral, PARK = en:Stephen the Great Central Park, MUS = en:National History Museum of Moldova, CIU = en:Ciuflea Monastery, MAZ = en:Măzărache Church, WV = en.wikivoyage Chișinău, AIR = en:Chișinău International Airport.

Yhteenveto: VÄÄRIN 8, EPÄVARMA 8. Kaikki muut rivit OK.

## VÄÄRIN ja EPÄVARMA (korjattavat)

| JSON-polku | väite | lähde (artikkeli + osio) | tila | tarkka korvaava teksti |
|---|---|---|---|---|
| kaupunki.wiki | wiki-otsikko "Chișinău (Kišinjov)" | tyokalu lahde en/fi: "EI LÖYDY"; oikea otsikko en/fi "Chișinău" | VÄÄRIN | `"wiki": "Chișinău"` |
| kysymykset[4].options | oikea vastaus ei saa olla pisin; "Cornești" (8 merkkiä) on pisin (Orhei 5, Bălți 5, Soroca 6) | sääntö (tehtävänanto); EN History, Russian Imperial period (1873 Cornești) | VÄÄRIN | options: ["Cornești", "Bălți ja Soroca", "Orhei ja Rezina", "Iași (Romania)"], correct 0 (kaikki muut väärin 1873: Iași-yhteys avattiin 1.6.1875, muille ei yhteyttä lähteessä). Vaihtoehtoisesti pidä neljä paikannimeä ja tee kaikista vähintään 8 merkkiä pitkiä. |
| kaupunkilehti[0].nostot[0].lyhyt | kuvatekstissä "lähteen mukaan" | PILVIOHJE luku 4 kohta 11 (kuvateksteissä ei lähdeviittauksia lukijalle); MAZ Overview ("is considered to be the oldest") | VÄÄRIN | "Măzărache-kirkko rakennettiin vuonna 1752, ja sitä pidetään kaupungin vanhimpana." |
| kaupunkilehti[0].matkailijalle.artikkeli.jaksot[0].kuva.lyhyt | "lähteen mukaan 22 linjaa" kuvatekstissä | kohta 11; EN Trolleybuses (22 lines) | VÄÄRIN | "Chișinăussa on laaja trolleybussiverkko, johon kuuluu 22 linjaa." |
| nahtavyydet.Măzărache-kirkko.kuvat[0].lyhyt | "on lähteen mukaan ... vanhimmaksi katsottu" kuvatekstissä | kohta 11; MAZ Overview | VÄÄRIN | "Măzărache-kirkkoa pidetään Chișinăun vanhimpana kirkkona." |
| kaupunkilehti[0].kansikuvat[2].selite | "lähteiden mukaan" kuvatekstissä | kohta 11; EN Intro, HIST (Bernardazzi City Hall 1901) | VÄÄRIN | "Italialaista goottia edustavan rakennuksen suunnitteli arkkitehti Alexander Bernardazzi." |
| nahtavyydet.Măzărache-kirkko.teksti (3. kappale) | "Aivan lähellä on Râșcani-kirkko vuodelta 1777" | HIST Foundation of the town: Râșcani-kirkko "stands top of the hill overlooking the Bâc River"; sijaintia Măzăracheen nähden ei kerrota | VÄÄRIN | "Isoisän matkavuonna 1873 kirkko oli seissyt jo 121 vuotta. Toinen vanha kirkko on Râșcani-kirkko vuodelta 1777, jonka rakennutti bojaari Constantin Râșcanu ja joka seisoo Bîc-joen yläpuolisella kukkulalla." |
| kaupunkilehti[0].matkailijalle.kappale | "Romania on virallinen kieli" (maan nimi kielen sijaan, ja kappaleen "mutta venäjää ymmärtää moni" -vastakohta on epäselvä) | en:Moldova Languages (virallinen kieli romania); WV Cope (most people know Russian and Romanian) | VÄÄRIN | "Virallinen kieli on romania, mutta venäjää ymmärtää moni." |
| kaupunkilehti[0].nostot[0].teksti | "Tapani III kirjasi lahjoituksen sedälleen Vlaicullle" vuonna 1436 | HIST Foundation of the town sanoo näin, mutta Tapani III (Suuri) syntyi n. 1433 ja hallitsi 1457–1504, joten ajoitus on anakronismi lähteessäkin | EPÄVARMA | "Ensimmäinen asiakirjamaininta on vuodelta 1436, jolloin Moldavian ruhtinaat Ilie ja Tapani luovuttivat kyliä ja lahjoitus kirjattiin Vlaicullle, josta tuli Chișinău-kylän omistaja." |
| kaupunkilehti[0].nostot[3].teksti | "magnitudiksi arvioidaan lähteestä riippuen noin 7,3–7,4" | EN World War II: "7.4 (or 7.7, according to other sources)"; HIST World War II: 7.3; fi:Chișinău Historia: 7,3 | EPÄVARMA | "Marraskuun 10. päivän 1940 maanjäristyksen magnitudiksi arvioidaan lähteestä riippuen 7,3–7,7." |
| nahtavyydet.Măzărache-kirkko.kuvat[0] / nostot[0].selite | "Kirkko on saanut nimensä rakennuttajansa Vasile Măzărachen mukaan" | MAZ Overview kertoo vain: "erected by Vasile Măzărache in 1752"; nimeämistä ei sanota | EPÄVARMA | nostot[0].selite: "Kirkon rakennutti Vasile Măzărache, ja se edustaa perinteistä moldavialaista kirkkoarkkitehtuuria." |
| kaupunkilehti[0].matkailijalle.artikkeli.jaksot[3].kuva.lyhyt | "kaupungin keskustori, jonka juustohalleista on tunnettu" | WV Buy/Eat: juustohalleja on, "tunnettu"-väitettä ei | EPÄVARMA | "Piața Centrală on kaupungin keskustori, jossa on juustohalleja ja marinoitujen ruokien tiskejä." |
| kaupunkilehti[0].matkailijalle.artikkeli.jaksot[1].teksti | "Măzărache-kirkko ja Ciuflea-luostari kuuluvat kaupungin vanhimpiin rakennuksiin" | MAZ: Măzărache vanhin kirkko (1752); CIU: Ciuflea vihitty 1858, EN Architecture: "19th-century buildings" | EPÄVARMA | "Măzărache-kirkkoa pidetään kaupungin vanhimpana kirkkona, ja Ciuflea-luostari on 1800-luvun puolivälin rakennus." |
| kaupunkilehti[0].matkailijalle.matkailu.hyvaTietaa[0].teksti | "Valuutta on Moldovan leu" | WV mainitsee hinnat "lei"-yksikössä; "Moldovan leu" ei ole haetuissa teksteissä (en:Moldova, WV) | EPÄVARMA | "Hinnat ilmoitetaan Moldovan leissä (lei)." |
| kaupunkilehti[1].johdanto | "Isoisän aikaan Chișinăussa oli asunut venäläinen runoilija" | EN, WV Pushkin Museum: Puškin maanpaossa 1820–1823, eli noin 50 vuotta ennen vuotta 1873 | EPÄVARMA | "Chișinăussa oli 1820-luvulla asunut venäläinen runoilija, ja myöhemmin kaupunki sai kokonaisen kujan kirjailijoiden rintakuvia." |
| kaupunkilehti[0].matkailijalle.matkailu.hyvaTietaa[2].teksti | "ne kannattaa väistää rauhallisesti" | WV Stay safe: "Take caution while walking in the city to avoid this hazard"; rauhallinen väistäminen ei lähteessä | EPÄVARMA | "Kulkukoirat voivat lähteen mukaan olla ongelma, joten kävellessä kannattaa olla tarkkana." |

## OK-rivit

| JSON-polku | väite | lähde (artikkeli + osio) | tila |
|---|---|---|---|
| artikkeli.intro | Moldovan pääkaupunki ja suurin kaupunki, Bîc-joen varrella maan keskiosassa | EN Intro, Geography | OK |
| artikkeli.intro | ensimmäinen maininta 1436 luostarikylänä Moldavian ruhtinaskunnassa | EN History Moldavian period; HIST Foundation | OK |
| artikkeli.intro | nimi chișla + nouă, "uusi lähde", kylä lähteen ympärille | EN Etymology | OK |
| artikkeli.intro | 1812 Moldavian itäosa Venäjälle, Bessarabia, Chișinău sen keskus | EN Russian Imperial period | OK |
| artikkeli.intro | 1873: puistot suunniteltu 1800-luvun alussa (kehitysuunnitelma 1834 mennessä, keskuspuisto 1818); katedraali (1836) ja riemukaari (1840) valmiit; rautatie 1871 | EN Russian Imperial period; HIST Industrial age | OK |
| artikkeli.intro | 720 128 asukasta (2024) Chișinăun kunnassa; teollisuus- ja kauppakeskus; suurin liikenteen solmukohta | EN Intro, Municipal administration | OK |
| artikkeli.teksti | nimi: Pușkin- ja Albișoara-katujen kulma; venäjäksi Kišinjov, unkariksi Kisjenő, saksaksi Kischinau | EN Etymology | OK |
| artikkeli.teksti | palot 1739 ja 1788 Venäjän–Turkin sotien aikana | HIST Foundation | OK |
| artikkeli.teksti | 7 000 -> 18 000 vuosina 1812–1818; asema virallistettiin 1818; keskuspuisto 1818 | HIST Foundation | OK |
| artikkeli.teksti | katedraali 1830–1836; riemukaari noin 1840 | EN Russian Imperial period; ARCH | OK |
| artikkeli.teksti | 1856 viidenneksi suurin (Pietari, Moskova, Odessa, Riika edellä) | HIST Foundation | OK |
| artikkeli.teksti | suunnitelma asteittaiseen jälleenrakennukseen 1940-luvun lopulla; 1700- ja 1800-lukujen kirkkoja ja puistoja | EN Soviet period (Shchusev 1947–1949), Architecture | OK |
| kysymykset[0] | Bîc; kaupunki lähes yhtä kaukana Romanian (58 km) ja Ukrainan (54 km) rajasta; Bîc laskee Dnestriin; Prut, Dnestr, Tonava väärin; vihje ei paljasta | EN Intro, Geography | OK |
| kysymykset[1] | 1436; 1389, 1502, 1578 väärin; vihje ok | EN History; HIST | OK |
| kysymykset[2] | riemukaari Venäjän voiton muistoksi 1828–1829; väärät vaihtoehdot (1812, 1815, 1436) väärin; oikea ei pisin; vihje ok | ARCH History | OK |
| kysymykset[3] | RMO 18.1.2024 (KIV:stä); MDA, CHS, KSH väärin; 13 km kaakkoon; vihje ok | AIR Intro; fi:Chișinău Liikenne | OK |
| kysymykset[4] (sisältö) | 28.8.1871 Tiraspol, 1873 Cornești, 1.6.1875 Iași Unghenin kautta; Orhei, Bălți, Soroca eivät ole lähteessä 1873-yhteyksiä; vihje ok (pituusongelma yllä) | EN Russian Imperial period; HIST Industrial age | OK |
| tiedot[0] | mulperit ja akaasiat 130–180-vuotiaita | PARK Intro | OK |
| tiedot[1] | kello osmanilta vallattujen tykkien kuparista, noin 6 400 kg | ARCH History | OK |
| tiedot[2] | nimi "uusi lähde"; kivi Măzărache-kirkon mäen juurella | MAZ Overview; HIST Foundation | OK |
| valokuva | riemukaari noin 1840, Venäjän voitto Turkin sodassa; Zaushkevich; 13 m, kaksikerroksinen; kuvauksen (suoraan edestä, Hallituksen talo) kanssa yhteensopiva | ARCH; kuvat.md Valokuva | OK |
| kansikuvat[0] | riemukaari keskustan akselilla (katedraali, aukio, Hallituksen talo); noin 1840 | ARCH History | OK |
| kansikuvat[1] | katedraali 1836, Avraam Melnikov; 1830–1836; kuusi doorilaista pylvästä | KAT Design; EN Russian Imperial period | OK |
| kansikuvat[2] | kaupungintalo 1901 kaupunginduumalle; italialainen goottilainen; Bernardazzi | City Hall Intro; HIST Industrial age | OK |
| nostot[0] | 1436, toinen maininta 1466, 1739/1788, 7 000 asukasta, kivilohkare, Măzărache 1752 | HIST Foundation; MAZ | OK |
| nostot[1] | 1806–1812 sota, Bessarabia, keskus 1812, 1818, 7 000 -> 18 000, katedraali Melnikov, riemukaari, 1856 viides suurin | HIST Foundation; EN Russian Imperial period | OK |
| nostot[1].lyhyt/selite | kellotorni purettu 1962, uudelleen 1997; näyttelykeskus; käyttö palasi 1989 | KAT intro, History | OK |
| nostot[2] | rautatie 1871/1873/1875; sota 1877–1878 pääkokoontumisalue; Carol Schmidt 1877–1903; 92 000 (1862), 125 787 (1900); kaupungintalo 1901; 1873-väite | EN Russian Imperial period; HIST Industrial age | OK |
| nostot[2].lyhyt/selite | kansainvälinen pääte; rata 1871, Iași 1875 | EN Rail; Russian Imperial period | OK |
| nostot[3] | 10.11.1940, 78 kuollutta, 2 795 vaurioitunutta, 172 tuhoutunutta; Shchusev 1947–1949; 4.3.1977; historiamuseo 1980–1987 vanhan julkisivun mukaan | EN World War II, Soviet period; MUS The edifice | OK (magnitudi: ks. yllä) |
| matkailijalle.kuva | 13 m, kaksikerroksinen; kello 6 400 kg, paikallaan vuoteen 2011 | ARCH History | OK |
| jaksot[0] | RMO 13 km kaakossa, lähteen mukaan ainoa säännöllinen matkustajaliikenne; KIV -> RMO tammikuussa 2024; trolleybussi 30 pysäkki heti saapumisaulan ulkopuolella; mittari; kolme bussiasemaa (Gara Centrală, de Nord, de Sud); Odessa n. 5 h; trolleybussit, bussit, rutiera | AIR Intro; EN Airport, Road, Public transport; WV Get in | OK |
| jaksot[1] | katedraali, riemukaari, keskuspuisto lähellä toisiaan; Klassikoiden puistokuja; mauri-tyylinen julkisivu; Deinotherium-luuranko | WV See; EN Education; PARK | OK |
| jaksot[2] | Valea Morilor, 2,5 km reitti; Ruusulaakso 9 ha, kolme järveä, polkuveneitä; kasvitieteellinen puutarha lähteen mukaan suurin puisto | WV See/Do | OK |
| jaksot[3] | Piața Centrală yli kaksi korttelia; brînza, caș; oaie = lammas; langos; marinoidut vihannekset | WV Buy/Eat | OK |
| jaksot[4] | hot-summer humid continental; harvoin alle −10 °C; tammi −2,3, elo 23,5, touko 14,8, syys 17,4 °C; kesäkuu sateisin 86 mm; viinipäivä lokakuun ensimmäisenä viikonloppuna | EN Climate, Events and festivals; saa.json / saatiedot | OK |
| matkailu.parasta | kohteet ja tähdet, perustelut (2,5 km reitti, Deinotherium, juustot, marinoidut vihannekset) | WV See/Eat | OK |
| hyvaTietaa[0..1,3] | englantia puhuu noin 30 % (WV Cope); jalankulkijan varovaisuus ja taskulamppu; passin kopio | WV Stay safe, Cope | OK |
| kaupunkilehti[1].tehtava | Puškin, 1885, puisto; Lermontov, Tjutšev, Fet väärin; vastaus nostossa nostot[0]; ei toista kaupungin kysymyksiä; fakta ei ole nostovirke sanasta sanaan; ei palkkiota | PARK History; HIST Industrial age | OK |
| kirjallisuus.nostot[0] | Puškin 1820–1823, Anton Pann 19, Aleksanteri I; Opekushin 1885; toinen Moskovan jälkeen; 1 000 kultarupla; Rodina-elokuvateatteri; muistomerkki siirretty Klassikoiden puistokujalle | WV Museums; PARK History | OK |
| kirjallisuus.nostot[1] | puistokuja 1958; pronssiset rintakuvat punaisilla graniittijalustoilla; marmoriset leijonat; kahdeksan mainittua nimeä; Moldovan vanhin puisto, 7 ha, 50 puulajia | PARK Intro, History | OK |
| kirjallisuus.nostot[2] | Basarabia 1906–1907; Cuvânt moldovenesc kesäkuu 1914; Viața Basarabiei 1932; kirjailijayhdistys 1920 (Sadoveanu, Ciobanu, Pamfile); Radio Basarabia 8.10.1939; yhdistys 1940 | HIST Pogrom and pre-revolution, WWI, Interwar; EN Media | OK |
| kirjallisuus.nostot[3] | Olga Vrabie 1902–1928, Ana Lupan 1922–1998, Meniuc, Luscalov 1927–2004, Nicolescu; kansalliskirjasto; Eminescu-teatteri; kirjastopäärakennus "Vasile Alecsandri" | EN Natives, Education; en:National Library of Moldova (central headquarters "Vasile Alecsandri"); WV Eminescu Theatre | OK |
| kohdekartta.pallo / rajat | pallo 47.023, 28.835 keskustassa (EN koordinaatti 47.02278, 28.83528); kaikki kohteet rajojen sisällä | Wikidata Q21197 | OK |
| kohdekartta.kohteet | katedraali 47.02606/28.83453, riemukaari 47.02472/28.8325, puisto 47.025/28.828, kaupungintalo 47.023/28.8343, Măzărache 47.02083/28.83028, Ciuflea 47.01263/28.84691, historiamuseo 47.0225/28.82806: täsmäävät artikkelien Wikidata-koordinaatteihin (tyokalu lahde); sijainnit ovat keskustassa kohteiden kohdalla (puisto Ștefan cel Mare -bulevardin länsipuolella, museo 31 Augusti 1989 -kadun varrella). Kaupungintalon koordinaatti on vain kolmen desimaalin tarkkuudella (~100 m) | Wikidata Q5813126, Q5102676, Q8082598, Q4274472, Q19315589, Q12736098; ARCH | OK |
| kohdekartta.esittely | akseli, keskuspuisto 1818, vanhin kirkko 1752, Ciuflea itäisin (lon 28.84691 suurin) | ARCH, PARK, MAZ | OK |
| nahtavyydet.Kristuksen syntymän katedraali | Voroncov, Bănulescu-Bodoni; 26.5.1830–13.10.1836; Melnikov; kuusi doorilaista pylvästä; Bolhrad; yli 35 v 1873; pommitus; torni 1962/1997; näyttelykeskus, 1989; kunnostus 1996; sinkkikupoli 1997; kolikko 2016 | KAT; EN Russian Imperial period | OK |
| nahtavyydet.Riemukaari | 13 m, kaksikerroksinen, neliöpohja, korinttilaiset; Zaushkevich; 1828–1829; 1840/1841; 6 400 kg kello 2011 asti; Odessa 1842, tuuli 1849, Itävalta 1881; 1941, 1973; yöllä valaistu, ei lyö | ARCH; WV See (1841) | OK |
| nahtavyydet.Tapani Suuren keskuspuisto | 1818 sotilasinsinöörit; vanhin; 7 ha, 50 lajia, 130–180 v; Eitner; pajuaita; 1863 Bernardazzi, Odessa, 460 ketjua, 5 400 kg; patsas 1927/29.4.1928, Plămădeală; Puškin; 1958; neljä suihkulähdettä; Rakastavaisten puisto; 1873: yli 50 v | PARK; en:Stephen the Great Monument; EN Romanian period | OK |
| nahtavyydet.Kaupungintalo | italialainen gootti, 1901, duuma; Bernardazzi (lähteiden mukaan); Teodora de la Sihla 1895; duuma ja pormestari 1817, Anghel Nour 1817–1821; Schmidt 1877–1903; 1837 talo -> 1842 lukio; lähes tuhoutui, jälleenrakennettu | City Hall; HIST | OK |
| nahtavyydet.Măzărache-kirkko | vanhin, Vasile Măzărache 1752; moldavialainen arkkitehtuuri 1400–1500-luvuilta; osmanien tuhoaman linnoituksen paikalle; kivi; chisla noua; palot 1739/1788; 121 v 1873 | MAZ; HIST (Râșcani-rivi: ks. yllä) | OK |
| nahtavyydet.Ciuflea-luostari | Pyhä Teodor Amaseialainen; Anastase Ciufli, Teodor; aromunikauppiaat 1821; lupa 1854, vihkiminen 6.6.1858; kuolinvuosi 1869/1870; 15 v 1873; 1962; 2002 | CIU | OK |
| nahtavyydet.Kansallinen historiamuseo | 1837 valmistunut talo, duuma, 1842 lukio nro 1; 1977 maanjäristys; purettu, 1980–1987 vanhan julkisivun mukaan eklektiseen tyyliin; perustettu 21.12.1983; naaraasusi; 31 Augusti 1989 -katu 121A; 1873 lukio | MUS; HIST | OK |
| saatiedot | 12 kuukauden lämpö- ja sadearvot täsmäävät saa.json:iin; kylmin tammikuu −2,3, lämpimin elokuu 23,5, sateisin kesäkuu 86 mm, toukokuu 70 mm, vähiten tammikuu 14 mm; yksiköt °C ja mm; sama teksti jaksot[4]:ssä | saa.json | OK |
| nostot/kuvat vs kuvat.md | kaikkien kuvien teksti sopii kuvat.md:n "mitä näkyy" -kuvaukseen ja kertoo kohteesta (katedraalin sisäkuvan K2 teksti koskee katedraalia yleisesti, K4 Hallituksen talon kuva sopii jälleenrakennusaiheeseen) | kuvat.md | OK |
| nostot[].wiki, nahtavyydet.lahde | "Chișinău", "History of Chișinău", "Alexander Pushkin", "Stephen the Great Central Park" ovat olemassa en-Wikipediassa (Pushkin myös fi-ohjauksena) | tyokalu lahde | OK |
| nykypolitiikka ja sota | ei nykysotaa, vaaleja, Transnistriaa tai poliittisia kiistoja; sota-aiheet historiallisia ja neutraaleja | koko sisalto.json | OK |
