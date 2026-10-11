# Jerevan (jerevan, e03) — riippumaton faktantarkistus

Tulos: VÄÄRIN 15, EPÄVARMA 7. Kaikki muu tarkistettu väite on OK (lueteltu lopussa ryhmittäin).

Lähdekortti: Y = en:Yerevan; EB = en:Erebuni Fortress; RS = en:Republic Square, Yerevan; NA = en:Northern Avenue; CAS = en:Yerevan Cascade; CCA = en:Cafesjian Museum of Art; MAT = en:Matenadaran; BM = en:Blue Mosque, Yerevan; SSC = en:Saint Sarkis Cathedral; ZOR = en:Zoravor Surp Astvatsatsin Church; OPE = en:Yerevan Opera Theatre; FSQ = en:Freedom Square, Yerevan; EP = en:English Park; ABO = en:Khachatur Abovian; MM = en:Mesrop Mashtots; TAM = en:Alexander Tamanian; HY = en:History of Yerevan; MET = en:Yerevan Metro; AC = en:Armenian cuisine; WV = en.wikivoyage Yerevan (action=raw); WVA = en.wikivoyage Armenia. Artikkelit luettu tyokalu.mjs:n tekstiotteesta ja Wikipedian/Wikivoyagen raakatekstistä (Y:n ilmastotaulukko raakatekstistä).

## VÄÄRIN ja EPÄVARMA

| JSON-polku | väite | lähde (artikkeli + osio) | tulos | tarkka korvaava teksti |
|---|---|---|---|---|
| kysymykset[0].hint | "Nooan arkin kerrotaan laskeutuneen sen rinteelle." | (vihjesääntö) | VÄÄRIN: vihje paljastaa vastauksen käytännössä suoraan (Nooan arkki = Ararat) | "Vuori on kuvattuna myös kaupungin sinetin kilvessä." (Y, Symbols: sinetin kilvessä on Araratin kuva) |
| kysymykset[1].hint | "Linnoitus perustettiin 700-luvulla ennen ajanlaskun alkua." | (vihjesääntö) | VÄÄRIN: vain yksi vaihtoehto (782 eaa.) on 700-luvulla, joten vihje paljastaa vastauksen | "Perustamiskirjoituksessa kuningas kertoo rakentaneensa linnoituksen jumala Khaldin suuruuden nimissä." (EB, History) |
| kysymykset[2].options | oikea vastaus "Alexander Tamanian" (18 merkkiä) on vaihtoehdoista pisin (Sargis Gurzadyan 16, Boris Mehrabyan 15, Mark Grigorian 14) | (kysymyssääntö: oikea ei saa olla pisin) | VÄÄRIN | options: ["Alexander Tamanian", "Sargis Gurzadyan", "Varazdat Arevshatyan", "Boris Mehrabyan"], correct 0 pysyy (Arevshatyan on RS:n Surrounding buildings -osiossa mainittu arkkitehti, 20 merkkiä) |
| kaupunkilehti[0].matkailijalle.artikkeli.jaksot[2].teksti | "lähteen mukaan se [Erebuni] on Armenian parhaiten säilynyt urartulainen linnake" | WV, See, Erebuni Fortress: "Fairly well- (and maybe the best-) preserved fortress of Urartian Period in Armenia" | VÄÄRIN: lähde sanoo vain "ehkä parhaiten", superlatiivi liioiteltu | "ja lähteen mukaan se on yksi Armenian parhaiten säilyneistä urartulaisista linnakkeista." |
| kaupunkilehti[0].matkailijalle.artikkeli.jaksot[0].teksti | "Metro on yksilinjainen: se on 12,1 kilometriä pitkä, siinä on kymmenen asemaa ja se on palvellut vuodesta 1981." | Y, Underground: 12,1 km; MET (alku): 13,4 km (2025); WV: "covering 12 km" | VÄÄRIN: lähteet ovat ristiriidassa, yksi luku valittu hiljaa (sääntö 4.3) | "Metro on yksilinjainen: lähteiden mukaan se on noin 12–13 kilometriä pitkä, siinä on kymmenen asemaa ja se on palvellut vuodesta 1981." |
| kaupunkilehti[1].tehtava.kysymys | "…Matenadaranin mukaan vanhin säilynyt täydellinen armenialainen käsikirjoitus?" | MAT, Notable manuscripts: väite on Wikipedia-artikkelin oma ("probably dates to the 7th century and is, thus, the oldest complete extant Armenian manuscript"), ei Matenadaranin ilmoittama | VÄÄRIN: väärä attribuutio (vastaus Vehamor-evankeliumi on sinänsä oikein) | "Mikä käsikirjoitus on lähteen mukaan vanhin säilynyt täydellinen armenialainen käsikirjoitus?" |
| kaupunkilehti[1].nostot[1].teksti | "Vehamor-evankeliumi on Matenadaranin mukaan todennäköisesti 600-luvulta…" | MAT, Notable manuscripts (sama) | VÄÄRIN: väärä attribuutio | "Vehamor-evankeliumi on lähteen mukaan todennäköisesti 600-luvulta ja siten vanhin säilynyt täydellinen armenialainen käsikirjoitus." |
| kaupunkilehti[1].nostot[0].teksti | "Matenadaranin mukaan kokoelmassa on noin 23 000 käsikirjoitusta ja käärettä katkelmineen." | MAT, Collection: "some 23,000 manuscripts and scrolls—including fragments"; Y, Libraries: "17,000 ancient manuscripts" | VÄÄRIN: väärä attribuutio, ja lähteiden luvut eroavat (23 000 / 17 000) | "Lähteen mukaan kokoelmassa on noin 23 000 käsikirjoitusta ja käärettä katkelmineen." (tai ristiriidan sanoen: "lähteiden mukaan 17 000–23 000 käsikirjoitusta") |
| valokuva.selite; kaupunkilehti[0].matkailijalle.artikkeli.jaksot[2].kuva.lyhyt; nahtavyydet["Sininen moskeija"].teksti | "kaupungin pääpiirimoskeijaksi" / "pääpiirin moskeijaksi" | BM, Early history: "as the city's main Friday mosque" | VÄÄRIN: käännösvirhe, "pääpiiri" ei ole lähteessä; kyse on perjantaimoskeijasta | valokuva.selite: "Moskeija rakennettiin noin 1765–66 Erivanin kaanikunnan hallitsijan tilauksesta kaupungin pääasialliseksi perjantaimoskeijaksi. Vedoksen tekijä on ranskalainen Germain Bapst." jakso[2].kuva.lyhyt: "Sininen moskeija rakennettiin noin 1765–66 Erivanin kaanin tilauksesta perjantaimoskeijaksi." nahtavyydet: "…hallitsijan Hoseyn Ali Khanin tilauksesta kaupungin pääasialliseksi perjantaimoskeijaksi." |
| artikkeli.intro | "Nykyinen keskusta rakennettiin vaaleanpunaisesta ja keltaisesta **tuffikivestä**" | RS (alku, Architecture): vain Tasavallan aukion viisi rakennusta ovat vaaleanpunaista ja keltaista tuffia; Y, Architecture ei väitä keskustasta; CAS: maidonvalkoista tuffia; MAT: harmaata basalttia | VÄÄRIN: yleistys koko keskustaan ei ole lähteessä | "Tasavallan aukion ympärillä olevat uusklassiset rakennukset on tehty vaaleanpunaisesta ja keltaisesta **tuffikivestä**, ja aukio, Kaskadi ja Matenadaran ovat Tamanianin suunnitelman ja sen jatkojen tunnetuimpia kohteita." |
| kaupunkilehti[0].matkailijalle.kappale | "suuri osa sen rakennuksista on vaaleanpunaista tuffikiveä" | RS (sama); WV Understand ei sano tätä | VÄÄRIN: sama yleistys | "Keskustassa Tasavallan aukion rakennukset ovat vaaleanpunaista ja keltaista tuffikiveä." |
| kaupunkilehti[1].nostot[2].lyhyt | "Khachatur Abovianin patsas Jerevanissa, kirjailijan syntymäkaupungissa lähellä Kanakeria." | ABO, Early life: syntyi 1809 Kanakerin kylässä, joka on nykyisin Jerevanin kaupunginosa | VÄÄRIN: syntymäpaikka oli Kanakerin kylä, ei kaupunki "lähellä Kanakeria" | "Khachatur Abovianin patsas Jerevanissa, kirjailijan syntymäkylän Kanakerin kaupunginosassa." (tai ilman paikkaa: "Khachatur Abovianin patsas Jerevanissa.") |
| nahtavyydet["Zoravorin kirkko"].kuvat[0].selite | "…ja sen kellotorni kohoaa vanhan Shaharin kaupunginosan yllä." | ZOR: kellotornia ei mainita; väite on kuvan visuaalista sisältöä (kuvat.md), ei lähteistä | VÄÄRIN: ei lähdettä, visuaalinen kuvaus (sääntö 4.11) | "Kirkon ulkoseinillä on 1600-luvun khachkar-ristikiviä, ja kirkko sijaitsee Shaharin vanhassa kaupunginosassa." (ZOR, History + alku) |
| kaupunkilehti[0].nostot[3].selite | "…Jaume Plesnan, Lynn Chadwickin…" | CAS, Sculpture: "Jaume Plensa" | VÄÄRIN: nimi väärin kirjoitettu | "Veistospuutarhassa on muun muassa Fernando Boteron, Jaume Plensan, Lynn Chadwickin ja Barry Flanaganin töitä." |
| kaupunkilehti[0].nostot[2].teksti | "Tasavallan aukion viisi pääraikennusta" | (kirjoitusvirhe) | VÄÄRIN | "Tasavallan aukion viisi päärakennusta" |
| kaupunkilehti[0].nostot[2].lyhyt | "Hallituksen talo … oli aukion ensimmäinen valmistunut rakennus." | RS, History: rakentaminen alkoi 1926 hallituksen talolla; RS (rakennustaulukko): hallituksen talon luoteisosa 1926–29, koko rakennus 1941; hotelli 1958, kansallisgalleria 1977. "Ensimmäinen valmistunut" ei ole lähteessä | EPÄVARMA | "Hallituksen talon rakennustyöt aloittivat Tasavallan aukion rakentamisen 1926." |
| kaupunkilehti[1].nostot[1].lyhyt/tiedosto | "Tabrizista peräisin oleva kuvitettu armenialainen käsikirjoitus" | Päättely vain tiedostonimestä "…from Tabriz at Matenadaran…"; Commons-kuvauksen tarkistus ei onnistunut (rajapinta ei vastannut); MAT ei mainitse Tabrizia | EPÄVARMA | Varmista Commons-kuvauksesta; muuten: "Kuvitettu armenialainen käsikirjoitus Matenadaranin kokoelmassa." |
| nahtavyydet["Kaskadi"].teksti | "Rakentaminen alkoi lähteen mukaan 1980" | CAS, History: 1980; CCA, Architecture: "beginning of the construction … dates back to 1971 … first phase completed in 1980" | EPÄVARMA: lähteet ristiriidassa, toinen valittu hiljaa | "Rakentaminen alkoi lähteiden mukaan 1970-luvun alussa tai 1980, ja se keskeytyi 1980-luvun lopulla" |
| valokuva.vuosi | "1800-luku" | kuvat.md: Commonsin päiväys "between 18..", Bapstin retkikunnan tarkka vuosi tarkistamatta | EPÄVARMA: laaja ajoitus todennäköisesti turvallinen (Bapst 1853–1921, päiväys 18..), mutta tarkkaa vuotta ei vahvistettu | Pidä "1800-luku" tai tarkenna vasta Commons-päiväyksen jälkeen |
| kaupunkilehti[0].matkailijalle.kuva.selite; jaksot[3].teksti; jaksot[3].kuva.selite | "Lavashia syödään mezejen ja grillilihan kanssa" | AC: lavash tarjoillaan alkupaloina (appetizer) juustojen ja kastikkeiden kanssa ja lula-kebabin kanssa; sanaa "meze" lähde ei käytä | EPÄVARMA: sisällöllisesti lähellä, sanavalinta ei lähteestä | "Lavashia syödään alkupalojen, juustojen ja grillilihan kanssa." |
| kaupunkilehti[0].nostot[3].teksti | "Gerard L. Cafesjianin kokoelmaan, jossa on lähteen mukaan yli 5 000 teosta" | CCA (alku): "more than 5,000 works" (lasikokoelma); CAS, Museum: "over 500 works from the collection of the museum founder" | EPÄVARMA: lähteet eroavat kertaluokalla, ristiriitaa ei kerrota | "…kokoelmaan, jossa on lähteen mukaan yli 5 000 teosta (Kaskadin museo esittelee niistä yli 500)." tai jätä luku pois |
| kysymykset[0..3].correct, kaupunkilehti[1].tehtava.oikea | oikea vastaus on kaikissa viidessä paikassa indeksi 0 | (ei lähdekysymys) | EPÄVARMA: jos peli ei sekoita vaihtoehtoja ajossa, järjestys on arvattavissa | Sekoita oikean vastauksen paikka (esim. correct 2, 0, 3, 1; tehtava.oikea 2) tai varmista, että peli sekoittaa |

## OK (tarkistettu lähteestä, ei muutosta)

Ryhmittäin, polut sisalto.jsonissa.

**artikkeli.intro ja teksti.** Pääkaupunki ja suurin kaupunki, Hrazdan, Araratin tasangon koillisreuna, Ararat pääsymboli ja näkyy joka osasta (Y, alku, Symbols, Geography). 782 eaa., Argishti I, nimen juuri Erebunista (Y, Etymology; EB). 1873: Erivan, Erivanin kuvernementin keskus, kaupunkistatus 1.10.1879 Aleksanteri II:n asetuksella (Y, Russian rule; HY). Tamanianin suunnitelma hyväksyttiin 1924, säteittäis-kehämäinen, päällekkäin vanhan katuverkon kanssa, purkuja (Y, Soviet era; TAM). Kirjapääkaupunki 2012 (Y, Libraries). Pääkaupunki vuodesta 1918 ja 21.9.1991 alkaen, ei maakunta (Y, Capital, Geography, Modern independence). 1968 2 750-vuotisjuhla (Y; EB). Linnoitus 1582–83, valtaus lokakuussa 1827 (HY; Y). Lipun 12 kolmiota (Y, Symbols). Asukasluku 1 147 600 (konteksti.json, kevytSisalto, vuosi mukana).

**kysymykset.** Q1: Ararat OK. Q2: 782 eaa., Argishti I, Arin Berd, perustamiskirjoitus syksyllä 1950 (EB, History). Q3: Tamanian, 1924, Tasavallan aukio ja oopperatalo (TAM; RS; OPE); Gurzadyan on Kaskadin arkkitehti (CAS), Mehrabyan 1906–11 suunnitelma (RS), joten väärät vaihtoehdot ovat uskottavia ja väärin. Q4: Gök Jami, Lynch ja Villari, 'sky blue' (BM, Names). Q5: Erivan, palautettu Jerevaniksi 1936 (Y, Etymology). Tiedot: lippu (Y, Symbols), Vardavar 98 päivää pääsiäisestä ja Joutsenjärvi suosituin paikka (Y, Festivals), keskikorkeus 990 m ja "among the fifty highest cities … over 1 million" (Y, Topography).

**tehtava (Matenadaran-minitehtävä).** Vastaus Vehamor löytyy saman sivun nostosta [1]; ei toista kaupungin kysymyksiä; fakta (lahjoitus 1975, 600-luku, MAT) ei ole nostovirke sanasta sanaan (lisää 1975-lahjoituksen); ei palkkiota. Vaihtoehdot Lazarian (887), Echmiadzin (989), Mughni ovat MAT:ssa; oikea ei ole pisin. Vain attribuutio korjattava, ks. yllä.

**Nostot, kaupunkilehti[0].** Erebuni: 65 m, syksy 1950, Konstantin Hovhannisyan, Khaldi, palatsi, kokoushalli, temppeli, yli sata huonetta, ei hylätty, museo 1968, 'ottaa, vallata' (EB; Y). Erivan: kuvernementti, Shahar/Ghantar/Kond/Dzoragyugh/Nork/Shentagh, savitalot tasakattoineen, kirjapaino 1874, teatteri 1879 (Y; HY). Tuffikaupunki: ensimmäinen neuvostokaupunki yleissuunnitelmalla, uusklassismi + tuffi, basalttijalusta, 1926 ja 1977 (Y; RS). Kaskadi: idea 1920-luvulla, rahoituksen puute, 1970-luvun alku, keskeytys 1980-luvun lopulla, 2002 päätös, avaus marraskuussa 2009 (17.11.), yli 550 askelmaa, liukuportaat, viisi terassia (CAS; CCA).

**Nostot, kaupunkilehti[1].** Matenadaran: sana matean+daran, perustettu 3.3.1959, nimetty 1962, 1828/1 809 ja 1913/4 660, UNESCO 1997 (MAT, Name, History). Mashtots 362–440, aakkoset noin 405, 'ratkaiseva askel identiteetille' (MM). Lazarian 887, Echmiadzin 989 ja norsunluukansi 500-luvulta, Urbatagirk 1512, kartta 1695 (MAT). Kansalliskirjasto 1832 / Teryan 1939, kirjapaino 1874 Gevorkian, yleinen kirjasto 1902 (Y, Libraries, Russian rule). Abovian: 1809 Kanaker, romaani 1841/1858, ensimmäinen moderni armenian romaani, Jerevanin murre, ensimmäinen lastenkirjailija (ABO). UNESCO: nimetty 6.6.2010 vuodelle 2012, valintaperuste (Y, Libraries); Khnko Aper 1933, Isahakjan 1935, musiikkikirjasto 1965; Tumanyan- ja Khachaturian-talomuseot; Charents-museo 1921 (Y, Libraries, Museums).

**Opas.** Zvartnots 12–15 km länteen, ei kotimaanlentoja "as the country is too small" (WV Get in; ZV), raitiotie lakkautettu tammikuussa 2004, johdinautot 1949 ja linjat T1–T5, käteismaksu poistui tammikuussa 2025 (Y, City buses…), gg ja Yandex, Uber/Bolt eivät toimi (WV Taxi), EU 180 päivää viisumitta (WVA Get in). Pohjoinen puistokatu 450 × 27 m, avattu 16.11.2007, Abovyanin katu – Vapaudenaukio (NA). Musiikkisuihkulähteet syyskuu 2007 ja "most evenings April–Oct" (RS; WV See). Metro 10 asemaa, 1981, kattokruunut (Y; MET). Vernissage Aram- ja Buzand-kaduilla (Vernissage-artikkeli; WV). Konjakki "konyak", Jerevan tuotantokeskus 1890–1900 (AC, Brandy). Tan, armenialainen kahvi kardemummalla, granaattiomenamehu (AC). Khorovats, lahmajoun (AC; WV). Sää: Köppen BSk, elokuu 40 astetta, tammikuu −15 tai kylmempi, ennätys 43,7 °C 12.7.2018 (Y, Climate); tammikuu −3,5, heinäkuu 26,8, lokakuu 14,0, vuosi 363 mm, elo- ja syyskuu 10 mm, jakso 1991–2020 (Y:n Weather box, raakateksti). Huomio: Y:n proosa antaa 318 mm, taulukko 363 mm; JSON käyttää taulukkoa ja ajanjakso on oikea, joten OK. Metro-, taksi- ja käteisväitteet OK paitsi metron pituus (ylhäällä).

**nahtavyydet.** Tasavallan aukio: soikea + puolisuunnikas, matto, viisi rakennusta, 1924 / 1926 / 1977, Leninin aukio → 1.11.1990, 2003 kaivaukset (1700–1800-lukujen kellarit; vesiputket 800–1000-luvuilta) (RS). Sininen moskeija: 1765–66, Hoseyn Ali Khan, suurin kahdeksasta 1827, minaretti 24 m, madrasa, Haxthausen 1840-luvulla ~30 poikaa, Gök Jami, laatoitus 1887–88, 1907–1910, 1920-luvun puoliväli, teehuone ja vierailijat, 1994–1998, 1996, kirjasto lokakuussa 2014 (BM). Sargis: 1835–42, Araratin hiippakunta, Dzoragyugh, 1679, Nahabet 1691–1705, Israyelian 1972, Anin tuffi, kellotorni 2000, Kurkjian (SSC). Zoravor: kupoliton kolminaavinen basilika, Shahar, Zoravor-Raamattu 1200-luvulta, Movses Syunetsi / Pilipos 1632–35, 1679, 1693–94 Khoja Panos, khachkarit, kappeli 1889, palautettu kirkolle 1970-luvulla (ZOR). Oopperatalo: perustuskivi 28.11.1930, avattu 20.1.1933 Almast, salit 1 300 / 1 070, Joutsenlampi 1935, Happiness → Gayane, Anoush 1935, sali 1939 ja talo 1953 (OPE); Vapaudenaukio, 1957-patsaat, Joutsenjärvi 1960-luvun alussa (FSQ). Kaskadi: viisi terassia, 302 m, khachkar-aiheet, maidonvalkoinen tuffi ja travertiini, kolme arkkitehtia, 2002 ja marraskuu 2009, Khanjyan-galleria ja Hovsepyanin reliefit, konsertit kevät–alkusyksy (CAS; CCA). Matenadaran: 22,4 m, basaltti, 1945–57/58, Ani-esikuva, patsaat, Van Khachaturin mosaiikki 1960 ja seinämaalaus 1959, Meschian 20.9.2011, 132 600 kävijää 2019 (MAT). Englantilainen puisto: 5,5 ha, Italian katu, 1856 / 1860-luku (Y, Russian rule; EP), 1910, jalkapallo-ottelu 1920, 2 800-vuotispuisto, Sundukyan, suihkulähteet hääkuvauspaikka (EP).

**1873-väitteet.** Kaikki OK: Matenadarania, oopperataloa, Kaskadia ja Tasavallan aukiota ei ollut; käsikirjoitukset Etchmiadzinissa; moskeija toiminnassa; Sargis valmis (1842); Zoravorin kappeli vasta 1889; Englantilainen puisto "todennäköisesti jo olemassa" (1856 / 1860-luku, varovainen muotoilu hyväksyttävä). Isoisän tekemisiä ei keksitä.

**Nykypolitiikka ja sota.** Ei kansanmurha-, Karabah- tai Turkki-kehystä JSON:issa. Historia (ottomaanit, venäläiset, Neuvostoliitto) on neutraalia, Iranin-yhteys mainitaan vain "Persian kielen kirjastona". Kuvien alla ei politiikkaa. OK.

**Kuvatekstit.** `lyhyt` ≤ 100 merkkiä, yksi virke, päättyy pisteeseen kaikissa 30 kuvassa (mitattu 60–94); `selite` 1–2 virkettä kaikissa. Kertovat kohteesta, eivät kuvan sisällöstä (poikkeus Zoravor, yllä). Vastaavuus kuvat.md:hen OK kaikissa (K1–K4, L1–L4, kannet, jaksot, kohteet, valokuva), kun huomioidaan edellä listatut EPÄVARMA-kohdat.

**Koordinaatit.** pallo 40.1814, 44.5144 (Jerevanin keskusta). Tasavallan aukio 40.17753, 44.51257 (WD/WV 40.177525, 44.512572), Sininen moskeija 40.1781, 44.5056 (WV), Sargis 40.17698, 44.50215 (WV), Zoravor 40.18610, 44.50950 (en 40.186079, 44.509606), Oopperatalo 40.1858, 44.515 (WV), Kaskadi 40.19138, 44.51552 (WV 40.191375, 44.515522), Matenadaran 40.19207, 44.52113 (WV), Englantilainen puisto 40.17417, 44.50806 (WV 40.174167, 44.508056). Kaikki osuvat kohteeseen; rajat sisältävät kaikki kohteet. Erebuni 4,6 km kaakkoon Tasavallan aukiolta laskettu WV:n koordinaatista (40.1406, 44.5379): noin 4,6 km, OK.

**Kysymysten vihjeet.** Q3 ja Q4 ja Q5 vihjeet eivät paljasta vastausta (Q4 "väri" on lievä mutta ei nimeä vastausta). Q1 ja Q2 korjattava, ks. yllä.

## Korjattu

- Kaikki VÄÄRIN-korjaukset tehty sanatarkasti: kysymysten 1–2 vihjeet, kysymyksen 3 vaihtoehdot (Varazdat Arevshatyan), Erebunin superlatiivi, metron pituus (noin 12–13 km), Matenadaran-attribuutiot ("lähteen mukaan"), perjantaimoskeija (valokuva.selite, jakso 3 lyhyt, Sininen moskeija), tuffiyleistykset (intro, matkailijalle), Abovianin Kanaker, Zoravorin kellotorni pois, Plensa, päärakennusta.
- EPÄVARMA pehmennetty: hallituksen talon lyhyt, Tabriz poistettu, Kaskadin rakennusajankohta, lavash (alkupalat), Cafesjianin 5 000 / 500, valokuva.vuosi "1800-luku" ennallaan.
- Oikeiden vastausten indeksit sekoitettu: correct 2, 0, 3, 1, 2; tehtava.oikea 2.
- Kuvia ei vaihdettu, kuvat.md ennallaan. tarkista --verkko: 0 virhettä.


## Lukupassi (11.10.2026, Päätoimittajan lisäsääntö: tarkka luku vain kahdella riippumattomalla lähteellä)

Lähteet: en-Wikipedian artikkelit (Yerevan, History of Yerevan, Erebuni Fortress, Blue Mosque, Matenadaran, Yerevan Cascade, Cafesjian Museum of Art, Republic Square, Alexander Tamanian, Saint Sarkis, Zoravor, Opera Theatre, English Park, Northern Avenue, Yerevan Metro, Khachatur Abovian, Mesrop Mashtots, Zvartnots, World Book Capital) sekä fi-Wikipedia (Jerevan, Tasavallan aukio). fi-Wikipedian Matenadaran-, Kaskadi- ja Tamanian-artikkelit eivät sisältäneet lukuja eikä Wikidata/Wikivoyage-hakuja saatu läpi, joten yhden artikkelin varassa olleet luvut pyöristettiin tai poistettiin. Vuosikymmen- ja vuosisatatason ilmaisut ('1800-luvun lopulla') eivät ole tarkkoja lukuja eivätkä vaadi kahta lähdettä. Päätös: S = säilytetty, P = pyöristetty, R = poistettu.

| Sijainti | Arvo | Lähteet | Päätös | Uusi muoto |
|---|---|---|---|---|
| artikkeli.intro, teksti | 782 eaa. (Erebuni) | en Yerevan; en Erebuni Fortress; en History of Yerevan; fi Jerevan (700-luku eaa.) | S |  |
| artikkeli, kysymys 2, nostot, johdanto | 782 eaa. (kysymysvaihtoehdot 882/682/582 väärinä) | kuten yllä | S |  |
| artikkeli.teksti | pääkaupunki vuodesta 1918 | en Yerevan; fi Jerevan (1918 jälkeen) | S |  |
| artikkeli.teksti | 21.9.1991 -> vuosi 1991 | en Yerevan (päivä); fi Jerevan (vuosi) | P | vain vuosi 1991 (fi tukee vuotta) |
| artikkeli.teksti, nosto 1 | Erivanin linnoitus 1582–83 | en Yerevan; en History of Yerevan | S |  |
| artikkeli.teksti, nosto 1, nähtävyydet | valtaus lokakuussa 1827 | en Yerevan; en History of Yerevan; fi Jerevan (1827) | S | kuukausi lokakuu, ei päivää (lähteet 1.10. / 2.10.) |
| nosto 1 | siirtyminen Venäjälle 1827–28 | en Yerevan (1827, 1828); fi Jerevan (1826–27) | S |  |
| artikkeli.teksti, kuvatekstit | 2 750-vuotisjuhla 1968 | en Yerevan; en Erebuni Fortress; en Republic Square; fi Tasavallan aukio | S |  |
| artikkeli.teksti, nosto 2, nähtävyydet | Tamanianin suunnitelma 1924 | en Yerevan; en Blue Mosque; fi Tasavallan aukio | S |  |
| nosto 2, nähtävyydet, kansikuva | Tasavallan aukio alkoi 1926 | en Republic Square; fi Tasavallan aukio | S |  |
| nosto 2, nähtävyydet, kansikuva | kansallisgalleria valmis 1977 | en Republic Square; fi Tasavallan aukio | S |  |
| intro, johdanto, kirjallisuus | UNESCO kirjapääkaupunki 2012 | en Yerevan; en World Book Capital | S |  |
| kirjallisuus nosto 0 | Matenadaran perustettu 1959 | en Matenadaran; en Yerevan | S | päivä 3.3. poistettu (P) |
| kirjallisuus nosto 2 | Armenian haavat julkaistu 1858 | en Khachatur Abovian; en Matenadaran | S |  |
| nähtävyydet, oopperatalo | avattu 1933 | en Yerevan; en Opera Theatre; fi Jerevan | S | päivä 20.1. poistettu (P) |
| nähtävyydet, oopperatalo | sali 1939 | en Yerevan; en Opera Theatre | S |  |
| nähtävyydet, oopperatalo | koko rakennus 1953 | en Opera Theatre; en Tamanian | S |  |
| opas, nähtävyydet, kuvateksti | Pohjoinen puistokatu 450 m | en Yerevan; en Northern Avenue; fi Tasavallan aukio | S |  |
| opas jakso 0 | lentoasema 12–15 km | en Zvartnots (15 km); fi Jerevan (12 km) | S |  |
| opas jakso 0 | metro noin 12–13 km | en Yerevan (12,1); en Yerevan Metro (13,4) | S | haarukka kattaa molemmat |
| opas jakso 0, nosto | metro 10 asemaa | en Yerevan; en Yerevan Metro | S |  |
| opas jakso 0 | metro vuodesta 1981 | en Yerevan; en Yerevan Metro | S |  |
| nähtävyydet, Sargis | 1835–1842 | en Yerevan; en Saint Sarkis | S |  |
| nähtävyydet, Sargis ja Zoravor | maanjäristys 1679 | en Yerevan; en History of Yerevan; en Sargis; en Zoravor | S |  |
| nähtävyydet, Zoravor | 1693–94 | en Yerevan; en Zoravor | S |  |
| nähtävyydet, Sininen moskeija | suurin kahdeksasta moskeijasta | en Blue Mosque; en Yerevan (kahdeksan moskeijaa 1800-luvun puolivälissä) | S |  |
| nähtävyydet, Tasavallan aukio | viisi rakennusta | en Republic Square; fi Tasavallan aukio | S |  |
| artikkeli.intro, matkailijalle | asukasluku 1 147 600 (1.1.2026) | vain konteksti.json; en Yerevan 1 086 677 ja fi 1 060 138 (2011) eivät tue tarkkaa lukua | P | noin 1,1 miljoonaa |
| artikkeli.intro, teksti, nosto 1 | kaupunkistatus 1.10.1879 | vain en Yerevan | P | 1870-luvun lopulla |
| nosto 1 | kirjapaino 1874 | vain en Yerevan | P | 1870-luvulla |
| nosto 1 | teatteri 1879 | vain en Yerevan | P | 1870-luvulla |
| kysymys 5 | nimi palautettu 1936 | vain en Yerevan | P | Neuvostoliiton aikana |
| kysymys 1 / tiedot | 990 m keskikorkeus | vain en Yerevan | P | noin tuhannen metrin korkeudessa |
| tiedot | 98 päivää pääsiäisen jälkeen (Vardavar) | vain en Yerevan | R | 'pääsiäisen jälkeen' |
| tiedot, artikkeli.teksti | 12 kolmiota lipussa | vain en Yerevan | R | 'pieniä kolmioita' |
| tiedot | 'viidenkymmenen korkeimman miljoonakaupungin joukossa' | vain en Yerevan | R | 'korkeimmalla olevien miljoonakaupunkien joukossa' |
| kysymys 2 fact, nosto 0 | perustamiskirjoitus syksyllä 1950 | vain en Erebuni Fortress | P | 1950-luvun alussa |
| nosto 0 | Arin Berd 65 m | vain en Erebuni Fortress | R |  |
| nosto 0 | yli sata huonetta | vain en Erebuni Fortress | P | lukuisia huoneita |
| nosto 0 | Erebunin museo 1968 | vain en Erebuni Fortress | P | '2 750-vuotisjuhlan aikoihin 1968' (S-vuosi tuettu) |
| nosto 3, nähtävyydet | Kaskadin päätös 2002 | vain en Yerevan Cascade | P | 2000-luvun alussa |
| nosto 3, nähtävyydet | avaus marraskuussa 2009 | en Cafesjian Museum of Art (17.11.); en Yerevan Cascade (2009) | P | vain 2009 |
| nosto 3 | yli 550 askelmaa | vain en Yerevan Cascade (555–572) | P | satoja askelmia |
| nähtävyydet, Kaskadi | 302 m | vain en Yerevan Cascade | P | noin 300 metrin matkalla |
| nosto 3, kuvatekstit, nähtävyydet | viisi terassia | vain en Yerevan Cascade | R | 'terasseja' |
| nosto 3 | Cafesjianin kokoelma yli 5 000 / yli 500 | vain en Cafesjian Museum of Art | P | tuhansia teoksia; 500 poistettu |
| nähtävyydet, Kaskadi | rakentaminen 1970-luvun alussa tai 1980 | vain en Yerevan Cascade | P | 1970- tai 1980-luvulla |
| kirjallisuus nosto 0 | nimetty 1962 | vain en Matenadaran | P | 1960-luvun alussa |
| kirjallisuus nosto 0 | 3.3.1959 päivä | vain en Matenadaran | P | vain 1959 (S) |
| kirjallisuus nosto 0 | 1828: 1 809 ja 1913: 4 660 käsikirjoitusta | vain en Matenadaran | R | 'tuhansiin käsikirjoituksiin' |
| kirjallisuus nosto 0 | noin 23 000 käsikirjoitusta | vain en Matenadaran | P | kymmeniä tuhansia |
| kirjallisuus nosto 0 | UNESCO Muisti maailmasta 1997 | vain en Matenadaran | R | vuosi poistettu |
| kirjallisuus nosto 1, johdanto | Mashtotsin aakkoset noin 405 | vain en Mesrop Mashtots | P | 400-luvun alussa |
| kirjallisuus nosto 1 | Mashtots 362–440 | vain en Mesrop Mashtots | P | 300- ja 400-luvuilla |
| kirjallisuus nosto 1 | Lazarian 887 | vain en Matenadaran | P | 800-luvulta |
| kirjallisuus nosto 1 | Echmiadzin 989 | vain en Matenadaran | P | 900-luvulta |
| kirjallisuus nosto 1 | norsunluukansi 500-luvulta | vain en Matenadaran | R | vuosisata poistettu |
| kirjallisuus nosto 1 | Urbatagirk 1512, Venetsia | vain en Matenadaran | P | 1500-luku |
| kirjallisuus nosto 1 | kartta 1695, Amsterdam | vain en Matenadaran | P | 1600-luku |
| tehtävä fakta | Vehamor-lahjoitus 1975 | vain en Matenadaran | R | vuosi poistettu; 600-luku säilyi (vuosisata) |
| kirjallisuus nosto 2, kuvateksti | kansalliskirjasto 1832 | vain en Yerevan | P | 1800-luvulla |
| kirjallisuus nosto 2, kuvateksti | nykyinen rakennus vuodesta 1939 | vain en Yerevan | P | 1900-luvun alkupuoliskolta |
| kirjallisuus nosto 2 | kirjapaino 1874 (Gevorkian) | vain en Yerevan | P | 1870-luvulla |
| kirjallisuus nosto 2 | yleinen kirjasto 1902 | vain en Yerevan | P | 1900-luvun alussa |
| kirjallisuus nosto 2 | Abovian syntyi 1809 | vain en Khachatur Abovian | P | 1800-luvun alussa |
| kirjallisuus nosto 2 | romaani kirjoitettu 1841 | vain en Khachatur Abovian | P | 1840-luvulla |
| kirjallisuus nosto 3 | valinta julkistettu 6.6.2010 | vain en Yerevan | R | poistettu |
| kirjallisuus nosto 3 | Khnko Aper 1933, Isahakjan 1935, musiikkikirjasto 1965 | vain en Yerevan | P | 1900-luvulla perustettuja |
| kirjallisuus nosto 3 | Charents-museo 1921 | vain en Yerevan | P | 1900-luvun alussa |
| opas jakso 0 | raitiotie lakkautettu tammikuussa 2004 | vain en Yerevan | P | 2000-luvun alussa |
| opas jakso 0 | käteismaksu lakkautettu tammikuussa 2025 | vain en Yerevan (marras 2024 / tammi 2025) | P | 'on lakkautettu' |
| opas jakso 0, kuvateksti | johdinautot 1949 | vain en Yerevan | R | 'vuosikymmenien ajan' |
| opas jakso 0, kuvateksti | viisi johdinautolinjaa | vain en Yerevan | R | tunnukset T1–T5 säilyivät, määrä poistettu |
| opas jakso 1, nähtävyydet, kuvateksti | musiikkisuihkulähteet syyskuussa 2007 | vain en Republic Square / Yerevan | P | 2000-luvun lopulla |
| opas jakso 1 | Pohjoinen puistokatu avattu 16.11.2007 | vain en Northern Avenue | P | 2000-luvun lopulla |
| opas jakso 1, kuvateksti | Pohjoinen puistokatu 27 m leveä | vain en Northern Avenue | R |  |
| opas jakso 2, matkailu | Erebuni noin 4,6 km Tasavallan aukiolta | laskettu koordinaateista; ei kahta tekstilähdettä | P | muutaman kilometrin päässä |
| opas jakso 3 | konjakin tuotanto 1890–1900-luvuilla | en Yerevan (1887 tehdas)  | P | 1800-luvun lopulta alkaen |
| opas jakso 4 | tammikuu −3,5 / heinäkuu 26,8 / lokakuu 14 | vain en Yerevan (ilmastotaulukko) | P | 'pakkasen puolella', 'lähes 30 astetta'; lokakuun luku poistettu |
| opas jakso 4 | sadanta 363 mm; elo- ja syyskuu 10 mm | vain en Yerevan (taulukko 363, proosa 318) | P | alle 400 mm; kuukausiluku poistettu |
| opas jakso 4 | elokuussa 40 astetta; tammikuussa −15 | vain en Yerevan | P | 'lähelle 40 astetta'; pakkasluku poistettu |
| opas jakso 4 | ennätys 43,7 °C 12.7.2018 | vain en Yerevan | R |  |
| opas, hyvä tietää | viisumiton 180 päivää | vain Wikivoyage (ei toista lähdettä) | R | 'rajoitetun ajan' |
| nähtävyydet, Sininen moskeija | rakennettu noin 1765–66 | vain en Blue Mosque | P | 1700-luvun lopulla |
| nähtävyydet, Sininen moskeija | minaretti 24 m | vain en Blue Mosque | R |  |
| nähtävyydet, Sininen moskeija | noin 30 poikaa (Haxthausen) | vain en Blue Mosque | R | 'joukko poikia' |
| nähtävyydet, Sininen moskeija | laatoitus 1887–88 | vain en Blue Mosque | P | 1800-luvun lopulla |
| nähtävyydet, Sininen moskeija | uudistus 1907–1910 | vain en Blue Mosque | P | 1900-luvun alussa |
| nähtävyydet, Sininen moskeija | restaurointi 1994–98, käyttö 1996 | vain en Blue Mosque | P | 1990-luvulla |
| nähtävyydet, Sininen moskeija | Persian kielen kirjasto 2014 | vain en Blue Mosque | P | 2010-luvulla |
| nähtävyydet, Tasavallan aukio | nimenmuutos 1.11.1990 | vain en Republic Square | P | 1990-luvun taitteessa |
| nähtävyydet, Tasavallan aukio | kaivaukset 2003 | vain en Republic Square | P | 2000-luvun alun kunnostuksessa |
| nähtävyydet, Sargis | Nahabet 1691–1705 | vain en Sargis | P | 1600-luvun lopulla |
| nähtävyydet, Sargis | suunnitelma 1972 | vain en Sargis | P | 1970-luvulla |
| nähtävyydet, Sargis | kellotorni 2000 | vain en Sargis | P | 2000-luvun vaihteessa |
| nähtävyydet, Zoravor | Pilipos 1632–35 | vain en Zoravor | R | vuodet poistettu |
| nähtävyydet, Zoravor | kappeli 1889 | vain en Zoravor | P | 1800-luvun lopulla |
| nähtävyydet, oopperatalo | perustuskivi 28.11.1930 | vain en Opera Theatre | P | 1930-luvun alussa |
| nähtävyydet, oopperatalo | salit 1 300 / 1 070 paikkaa | vain en Opera Theatre | P | yli tuhat paikkaa |
| nähtävyydet, oopperatalo | Joutsenlampi 1935, Anoush 1935 | vain en Opera Theatre | R | vuodet poistettu |
| nähtävyydet, oopperatalo | patsaat 1957 | vain Freedom Square -lähde | R | vuosi poistettu |
| nähtävyydet, Matenadaran | korkeus 22,4 m | vain en Matenadaran | R |  |
| nähtävyydet, Matenadaran | rakentaminen 1945–57/58 | vain en Matenadaran | P | 1900-luvun puolivälissä useita vuosia; 'aika' 1900-luvun puoliväli |
| nähtävyydet, Matenadaran | mosaiikki 1960, seinämaalaus 1959, Avarayr 451 | vain en Matenadaran | R | vuodet poistettu |
| nähtävyydet, Matenadaran | uusi rakennus 20.9.2011 | vain en Matenadaran | P | 2010-luvun alussa |
| nähtävyydet, Matenadaran | 132 600 kävijää 2019 | vain en Matenadaran | P | yli satatuhatta, 2010-luvun lopulla |
| nähtävyydet, Matenadaran, nosto 0 | kuusi oppineen patsasta | vain en Matenadaran | R | 'keskiaikaisten oppineiden patsaat' |
| nähtävyydet, Englantilainen puisto | 1856 / 1860-luku | en Yerevan (1856) ja en English Park (1860-luku) ristiriidassa | P | 1800-luvun puoliväli |
| nähtävyydet, Englantilainen puisto | 5,5 ha | vain en English Park | R |  |
| nähtävyydet, Englantilainen puisto | kunnostus 1910, jalkapallo 1920 | vain en English Park | P | 1900-luvun alussa; 1920-luvun alussa |
| nähtävyydet, Englantilainen puisto | 2 800-vuotispuisto | vain en English Park | R | 'erilliseksi puistoksi' |

Yhteensä: säilytetty 26, pyöristetty 60, poistettu 25. Kysymysten fact-kentät ja oikeat vastaukset ovat loogisesti eheät (Q2 782 eaa. säilyi; Q5 fact ilman vuotta; tehtävän fakta ilman lahjoitusvuotta). tarkista e03 jerevan --verkko: 0 virhettä.
