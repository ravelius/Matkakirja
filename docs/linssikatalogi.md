# Linssikatalogi — aikajana-, alue- ja virtalinssien aiheluettelo

Päivitetty: 2.9.2026 (Fable). Omistajan linjaus 2.9.2026 ilta: *"kaikkien
suurien uskontojen tapahtumista täytyy myös saada omat kuvansa ja niistä
varmasti tehdään myös samanlainen aikajanalinssi kuin nyt tekniikasta
Euroopassa. hiotaan vain ensin tuo linssi mahdollisimman hyväksi niin sitten
voidaan monistaa samaa logiikkaa muihinkin."*

Tämä on elävä luettelo: aiheita lisätään ja tila päivitetään. Sitovat
linjaukset ovat Raamatussa (js/tyohuone-raamattu.js, Karttalinssit);
tämä dokumentti on työlista. Sama sisältö on julkisena sivuna pelin
osoitteessa https://ravelius.github.io/Matkakirja/linssikatalogi.html
(repon juuren linssikatalogi.html, Pages kopioi sen; näkyy kaikilla
tileillä, osoite on ainoa avain, noindex) sekä artefaktina
https://claude.ai/code/artifact/70aa8279-bf6b-49ce-a6cb-64b5a70c3fae
(vain julkaisijan tilille). Päivitä kaikki kolme yhdessä.

## Malli, jota monistetaan

Keksinnöt Euroopassa 1769–1928 (v1470, js/aikajana.js + js/linssit/keksinnot.js)
on pilotti. Jokainen uusi linssi käyttää samaa moottoria:

| osa | Keksinnöt-pilotissa | monistettaessa |
|---|---|---|
| kello ja pysäkit | 25 pysäkkiä, merkkipaalu 1873 | 15–30 pysäkkiä, merkkipaalu 1873 aina kun kaari ylittää sen |
| kartalla | valo syttyy kaupunkiin ja jää palamaan | sama; reittilinsseissä valo kulkee reittiä pitkin |
| filminauha ja ilmiöpaneeli | keksijän muotokuva (PD) + generoitu ilmiökuva | sama; uskonnoissa ei kasvokuvia perustajista, vaan paikan ja tapahtuman kuva |
| juttu | nähtävyyskortti | sama |
| musiikki | oma raita linssi-keksinnot.mp3 | oma raita per linssi, sama putki (generoi-siirtymamusiikki --laji) |
| kuvat | kuvaputki, fotorealistinen, JPG | sama; historian hetket -tyyppiset lähi + kauko kun kohtaus sen sallii |
| ovi peliin | kehittäjävalikko (pelillinen ovi auki) | päätetään pilotin kanssa |

Tilat: **valmis** · **rakenteilla** · **seuraava** (päätetty, odottaa pilotin hiontaa) · **idea**.

Ryhmät A–G ovat aiheittain (painopiste Euroopassa, missä pelin laudat nyt ovat), ryhmät H–L maanosittain (omistaja 2.9.2026: "lisäksi voisi eritellä muiden maanosien jutut").

## A. Uskonnot ja maailmankatsomukset

| # | linssi | alue | kaari | pysäkkejä (esimerkit) | tila |
|---|---|---|---|---|---|
| A1 | Suuret uskonnot syntyvät | Lähi-itä, Intia, Kiina | 1500 eaa–632 | Veda-hymnit Punjab · Buddhan ensimmäinen saarna Sarnath · Kungfutse Qufu · Toinen temppeli Jerusalem · Jeesus Galilea ja Jerusalem · Muhammad Mekka ja Medina | seuraava |
| A2 | Kristinusko leviää Eurooppaan | Eurooppa | 30–1000 | Paavali Ateena · Nikaian kirkolliskokous 325 · Iona 563 · Canterbury 597 · Kiovan kaste 988 · Uppsala | seuraava |
| A3 | Islamin kultakausi | Bagdad–Córdoba | 750–1258 | Bait al-hikma Bagdad · Córdoban suuri moskeija · al-Azhar Kairo · Samarkandin observatorio · Isfahan · Bagdadin tuho 1258 | seuraava |
| A4 | Uskonpuhdistus | Keski-Eurooppa | 1517–1648 | Wittenberg 1517 · Zürich · Geneve · Trenton kokous · Pyhän Bartolomeuksen yö Pariisi · Westfalenin rauha | seuraava |
| A5 | Buddhalaisuuden tie Aasian halki | Intia–Japani | 250 eaa–800 | Sanchi · Dunhuangin luolat · Nara · Borobudur · Lhasa | idea |
| A6 | Pyhiinvaellusreitit (reittilinssi) | maailma | jatkuva | Santiago de Compostela · Mekan hajj · Varanasi · Shikokun 88 temppeliä · Jerusalem | idea |
| A7 | Luostarit ja kirjat | Eurooppa | 500–1500 | Monte Cassino · Iona · Cluny · Mont-Saint-Michel · Athos | idea |

Kuvatilaus (H4-ehdotus kuvaputkelle, kun H3 on hyväksytty): A1:n ja A4:n
pysäkit historian hetkinä, lähi + kauko, fotorealistinen. Kuvissa ei
esitetä profeettoja kasvoista tunnistettavina; paikka, ihmiset ja hetki.

## B. Tiede ja tekniikka

| # | linssi | alue | kaari | pysäkkejä | tila |
|---|---|---|---|---|---|
| B1 | Keksinnöt Euroopassa | Eurooppa | 1769–1928 | Watt · Stephenson · Daguerre · Siemens · Benz · Marconi · Fleming | valmis (pilotti, hiotaan) |
| B2 | Tiede ennen höyryä | Eurooppa | 1543–1760 | Kopernikus Frombork · Tycho Ven · Galileo Padova · Kepler Praha · Newton Cambridge · Linné Uppsala | seuraava |
| B3 | Lääketieteen läpimurrot | Eurooppa | 1796–1928 | Jenner · Semmelweis Wien · Snow Lontoo 1854 · Pasteur · Koch Berliini · Röntgen Würzburg · Fleming | seuraava (H3-kuvat) |
| B4 | Sähkö ja viestintä | Eurooppa–Atlantti | 1800–1901 | Volta Pavia · Ørsted Kööpenhamina · Faraday Lontoo · Morse · Atlantin kaapeli 1866 · Marconi Poldhu 1901 | idea |
| B5 | Kartografia ja mittaaminen | Eurooppa | 1569–1884 | Mercator Duisburg · Cassini Pariisi · Struven ketju Hammerfest–Izmail · Greenwichin nollameridiaani 1884 | idea |
| B6 | Tähtitieteen observatoriot | maailma | 1576–1900 | Uraniborg · Greenwich · Pulkova · Lick · Ulugh Beg Samarkand | idea |

## C. Löytöretket ja liikkuminen

| # | linssi | alue | kaari | pysäkkejä | tila |
|---|---|---|---|---|---|
| C1 | Suuret löytöretket | Atlantti–Intian valtameri | 1415–1522 | Sagres · Dias 1488 · Kolumbus 1492 · da Gama 1497 · Magalhães 1519 (H1/H2-hetket) | seuraava |
| C2 | Napa-alueiden valloitus | Arktis, Antarktis | 1845–1912 | Franklin · Nordenskiöld Koillisväylä 1878 · Nansen Fram 1893 · Amundsen 1911 · Scott 1912 | seuraava |
| C3 | Rautatiet valloittavat maanosat | maailma | 1825–1916 | Stockton–Darlington · Liverpool–Manchester · Pacific Railroad 1869 · Siperian rata · Orient Express · Berliini–Bagdad | idea |
| C4 | Höyrylaivat ja kanavat | maailma | 1807–1914 | Clermont · Great Eastern · Suez 1869 · Kielin kanava · Panama 1914 · Titanic | idea |
| C5 | Maapallon ympäri 80 päivässä | maailma | 1872 | Foggin reitti Lontoo–Suez–Bombay–Kalkutta–Hongkong–Yokohama–San Francisco–New York–Lontoo (isoisän matka 1873 rinnalla) | seuraava (pelin oma tarina) |
| C6 | Ilmailun synty | Eurooppa–USA | 1783–1927 | Montgolfier Annonay · Lilienthal Berliini · Wrightit Kitty Hawk · Blériot kanaali 1909 · Lindbergh 1927 | idea |

## D. Kaupungit, valtakunnat, aatteet

| # | linssi | alue | kaari | pysäkkejä | tila |
|---|---|---|---|---|---|
| D1 | Antiikin kaupungit | Välimeri, Lähi-itä | 3500 eaa–476 | Uruk · Memfis · Babylon · Ateena · Aleksandria · Rooma · Konstantinopoli | idea |
| D2 | Silkkitie (reittilinssi) | Aasia–Eurooppa | 130 eaa–1453 | Chang'an · Dunhuang · Samarkand · Bagdad · Konstantinopoli · Venetsia | idea |
| D3 | Hansa | Itämeri, Pohjanmeri | 1150–1669 | Lyypekki · Visby · Bergen · Novgorod · Brygge · Lontoo Steelyard | idea |
| D4 | Vallankumousten Eurooppa | Eurooppa | 1789–1849 | Bastilji · Wien 1848 · Frankfurtin parlamentti · Rooman tasavalta 1849 | idea |
| D5 | Kansallisvaltiot syntyvät | Eurooppa | 1830–1918 | Belgia 1830 · Italia 1861 · Saksa 1871 · Bulgaria 1878 · Norja 1905 · Suomi 1917 | idea |
| D6 | Imperiumit ja siirtomaat | maailma | 1600–1914 | VOC Amsterdam · Kalkutta · Kap · Berliinin konferenssi 1884 | idea |

## E. Taide ja kulttuuri

| # | linssi | alue | kaari | pysäkkejä | tila |
|---|---|---|---|---|---|
| E1 | Renessanssi | Italia | 1400–1600 | Firenze Brunelleschi · Rooma Sikstus · Venetsia Tizian · Milano Leonardo | idea |
| E2 | Säveltäjien Eurooppa | Eurooppa | 1685–1900 | Eisenach Bach · Salzburg Mozart · Wien Beethoven · Leipzig · Bayreuth · Pietari Tšaikovski · Helsinki Sibelius | idea |
| E3 | Kirjallisuuden kaupungit | Eurooppa | 1600–1900 | Lontoo Shakespeare · Weimar Goethe · Pietari Dostojevski · Dublin · Pariisi Hugo | idea |
| E4 | Maailmannäyttelyt | maailma | 1851–1900 | Lontoo Crystal Palace · Pariisi 1889 Eiffel · Chicago 1893 · Pariisi 1900 | idea |
| E5 | Arkkitehtuurin ihmeet (ihmesarjan jatko) | maailma | 2560 eaa–1889 | Giza · Pantheon · Hagia Sofia · Alhambra · Kölnin tuomiokirkko · Eiffel | idea |
| E6 | Museot ja kirjastot syntyvät | Eurooppa | 1683–1900 | Ashmolean · British Museum · Louvre 1793 · Eremitaasi · Ateneum | idea |

## F. Luonto ja ympäristö

| # | linssi | alue | kaari | pysäkkejä | tila |
|---|---|---|---|---|---|
| F1 | Suuret tulivuorenpurkaukset | maailma | 1600 eaa–1883 | Thera · Vesuvius 79 · Laki 1783 · Tambora 1815 (vuosi ilman kesää) · Krakatau 1883 | idea |
| F2 | Eläinten muuttoreitit (jatkuva animaatio) | maailma | vuodenkierto | kurjet · valaat · gnut · monarkkiperhoset · lohet | idea (M7+-linssialusta, tehtävä #71) |
| F3 | Kasvien matkat | maailma | 1492–1900 | peruna · kahvi · tee · sokeri · kumi · kaneli | idea |
| F4 | Maanjäristykset ja kaupungit | maailma | 1755–1908 | Lissabon 1755 · Messina 1908 · San Francisco 1906 | idea |

## G. Arki ja yhteiskunta

| # | linssi | alue | kaari | pysäkkejä | tila |
|---|---|---|---|---|---|
| G1 | Taudit ja rokotukset | Eurooppa | 1347–1918 | Musta surma Messina 1347 · Lontoon kolera 1854 · Jenner · Pasteur · espanjantauti 1918 | idea (osin B3) |
| G2 | Raha ja pankit | Eurooppa | 1252–1873 | Firenzen floriini · Amsterdamin pörssi 1602 · Bank of England 1694 · kultakanta 1873 | idea |
| G3 | Ruoan ja juoman historia | Eurooppa | 1500–1900 | Pilsen 1842 · Champagne · Lyonin keittiö · Wienin kahvilat · Milanon risotto | idea |
| G4 | Urheilun synty | Eurooppa | 1857–1903 | Sheffield FC 1857 · Wimbledon 1877 · Ateena 1896 · Tour de France 1903 | idea |
| G5 | Naisten oikeudet | maailma | 1791–1918 | Olympe de Gouges · Seneca Falls · Uusi-Seelanti 1893 · Suomi 1906 · Britannia 1918 | idea |
| G6 | Posti ja sähkösanoma | Eurooppa | 1840–1901 | Penny Black · Morse Washington 1844 · Reuters Aachen · Atlantin kaapeli · Marconi | idea (sopii pelin sähkeisiin) |

## H. Aasia

| # | linssi | alue | kaari | pysäkkejä | tila |
|---|---|---|---|---|---|
| H1 | Kiinan keksinnöt | Kiina | 105–1450 | paperi Luoyang 105 · kompassi · ruuti · kirjapaino Kaifeng · Suuri kanava · Zheng Hen laivasto Nanjing 1405 | seuraava |
| H2 | Intian valtakunnat ja tiede | Intia | 2600 eaa–1653 | Mohenjo-daro · Ashoka Pataliputra · Nalandan yliopisto · Aryabhata · Taj Mahal Agra 1653 | idea |
| H3 | Japanin aikakaudet | Japani | 710–1868 | Nara · Heian-Kioto · Kamakura · Edo · Meiji 1868 (Yokohama isoisän reitillä) | seuraava |
| H4 | Mongolien maailma | Aasia | 1206–1405 | Karakorum · Peking Kublai · Bagdad 1258 · Samarkand Timur | idea |
| H5 | Kaakkois-Aasian temppelit | Kaakkois-Aasia | 800–1431 | Borobudur · Bagan · Angkor · Ayutthaya | idea |
| H6 | Maustereitit (reittilinssi) | Intian valtameri | 1000–1700 | Malabar · Malakka · Molukit · Batavia · Lissabon | idea |

## I. Lähi-itä ja Pohjois-Afrikka

| # | linssi | alue | kaari | pysäkkejä | tila |
|---|---|---|---|---|---|
| I1 | Sivilisaation synty | Mesopotamia, Persia | 3500 eaa–330 eaa | Uruk · Ur · Babylon · Niniven kirjasto · Persepolis | idea |
| I2 | Egyptin dynastiat | Egypti | 2650 eaa–30 eaa | Sakkara · Giza · Theba ja Luxor · Amarna · Aleksandria | idea |
| I3 | Osmanien valtakunta | Turkki, Balkan, Levantti | 1299–1923 | Bursa · Konstantinopoli 1453 · Wienin piiritys 1683 · Kairo · Suez 1869 · Ankara 1923 | seuraava (Bulgaria 1878 pelissä) |
| I4 | Persian puutarhat ja kaupungit | Iran | 550 eaa–1722 | Pasargadae · Persepolis · Isfahan · Shiraz | idea |

## J. Saharan eteläpuolinen Afrikka

| # | linssi | alue | kaari | pysäkkejä | tila |
|---|---|---|---|---|---|
| J1 | Kultavaltakunnat | Länsi-Afrikka | 700–1591 | Ghana · Timbuktu · Mansa Musan hajj 1324 · Djenné · Songhai · Kano | seuraava |
| J2 | Swahilirannikko ja Suuri Zimbabwe | Itä- ja Etelä-Afrikka | 1000–1500 | Kilwa · Sansibar · Mombasa · Suuri Zimbabwe · Sofala | idea |
| J3 | Etiopia | Etiopia | 100–1700 | Aksum · Lalibela · Gondar | idea |
| J4 | Tutkimusmatkat Afrikassa | Afrikka | 1795–1877 | Mungo Park Niger · Livingstone Victorian putoukset 1855 · Burton ja Speke · Stanley ja Livingstone Ujiji 1871 · Stanley Kongo 1877 | seuraava |
| J5 | Siirtomaajako ja rautatiet | Afrikka | 1869–1914 | Suez · Berliinin konferenssi 1884 · Kap–Kairo-hanke · Uganda-rata | idea |

## K. Amerikat

| # | linssi | alue | kaari | pysäkkejä | tila |
|---|---|---|---|---|---|
| K1 | Mesoamerikka ja Andit | Meksiko, Peru | 200–1532 | Teotihuacán · Tikal · Chichén Itzá · Tenochtitlán · Cusco · Machu Picchu | seuraava |
| K2 | Valloitus ja hopea | Latinalainen Amerikka | 1492–1600 | Hispaniola · Tenochtitlán 1521 · Cajamarca 1532 · Potosí · Lima | idea |
| K3 | Yhdysvaltain synty ja länsi | USA | 1776–1869 | Philadelphia 1776 · Lewis ja Clark · Oregon Trail · kultaryntäys 1849 · Pacific Railroad 1869 | seuraava (Foggin reitti) |
| K4 | Latinalaisen Amerikan itsenäistyminen | Etelä-Amerikka | 1810–1825 | Caracas Bolívar · Buenos Aires San Martín · Chacabuco · Ayacucho 1824 | idea |
| K5 | Amerikan keksinnöt | USA | 1793–1903 | Whitney · Morse 1844 · Bell 1876 · Edison Menlo Park · Wrightit 1903 | idea (Keksinnöt-linssin sisar) |
| K6 | Pohjoinen: viikingeistä rautatiehen | Grönlanti, Kanada | 1000–1885 | L'Anse aux Meadows · Hudsonin lahti · Luoteisväylä · Kanadan rata 1885 | idea |

## L. Oseania ja Tyynimeri

| # | linssi | alue | kaari | pysäkkejä | tila |
|---|---|---|---|---|---|
| L1 | Polynesialaisten merenkulku (reittilinssi) | Tyynimeri | 1000 eaa–1250 | Samoa · Tahiti · Havaiji · Rapa Nui · Aotearoa noin 1250 | idea |
| L2 | Cook ja Tyynimeri | Tyynimeri | 1768–1779 | Plymouth 1768 (hetki) · Tahiti · Uusi-Seelanti · Botany Bay · Havaiji 1779 | seuraava (H1-hetki) |
| L3 | Australia | Australia | 1788–1901 | Sydney 1788 · Ballaratin kultaryntäys 1851 · Burke ja Wills 1860 · liitto 1901 | idea |
| L4 | Evoluution saaret | Galápagos, Malaijisaaristo | 1835–1862 | Darwin Galápagos 1835 (hetki) · Wallace Ternate 1858 · Alfred Wallacen linja | idea |

# Osa 2: Aluelinssit (toinen moottori)

Omistaja 2.9.2026 ilta: *"Kiinan dynastiat olisi kiva näyttää (ehkä
yksinkertaistetulla) karttapohjalla niin, että eri dynastiat olisivat eri
väreillä ja ne muovaisivat rajoja vuosien vieriessä. Samaa voisi soveltaa
maailmansotiin… napoleon, rooma."* Kello ja filminauha ovat samat kuin
aikajanalinssissä, mutta kartalle ei sytytetä pisteitä vaan piirretään
värialueita, joiden rajat liukuvat avainvuodesta toiseen.

| osa | aluelinssissä |
|---|---|
| pohja | yksinkertaistettu maakartta (rannat, suuret joet, ei nykyrajoja), pelin patina |
| alueet | avainvuosien monikulmiot (10–20 per linssi), rajat interpoloidaan välillä; väri per dynastia/valtio, selite reunassa |
| pysäkit | taistelut, rauhat, kruunaukset filminauhaan kuten aikajanassa |
| aineisto | historialliset rajat avoimista lähteistä (PD/CC BY -GeoJSON; lisenssi tarkistetaan ennen käyttöä), yksinkertaistetaan käsin — suurin työ |
| musiikki ja kuvat | sama putki kuin aikajanalinssissä |

## M. Valtakunnat ja dynastiat

| # | linssi | alue | kaari | pysäkkejä | tila |
|---|---|---|---|---|---|
| M1 | Kiinan dynastiat | Kiina | 221 eaa–1912 | Qin · Han · Kolme kuningaskuntaa · Tang · Song · Yuan · Ming · Qing · tasavalta 1912 | seuraava (omistajan esimerkki, ensimmäinen aluelinssi) |
| M2 | Rooman nousu ja tuho | Välimeri | 509 eaa–476 | tasavalta · puunilaissodat · Caesar Gallia · Augustus · Trajanus 117 · jako 395 · 476 | seuraava |
| M3 | Aleksanteri Suuri | Kreikka–Intia | 336–301 eaa | Makedonia · Issos · Egypti · Gaugamela · Persepolis · Hydaspes · diadokit | idea |
| M4 | Islamin leviäminen | Lähi-itä–Espanja | 622–750 | Medina · Jerusalem 638 · Persia · Pohjois-Afrikka · Iberia 711 · Poitiers 732 | idea |
| M5 | Mongolien imperiumi | Aasia–Eurooppa | 1206–1368 | Tšingis-kaani · Kiova 1240 · Bagdad 1258 · Kublai · kaanikunnat · Yuan kaatuu | idea |
| M6 | Bysantti | itäinen Välimeri | 395–1453 | Justinianus 555 · arabit · Basileios II · 1204 · 1453 | idea |
| M7 | Osmanien nousu ja lasku | Turkki, Balkan, Lähi-itä | 1299–1923 | Bursa · 1453 · Suleiman 1566 · Wien 1683 · Bulgaria 1878 · 1923 | seuraava (Bulgaria pelissä) |
| M8 | Reconquista | Iberia | 711–1492 | Covadonga · Toledo 1085 · Las Navas 1212 · Granada 1492 | idea |
| M9 | Viikinkien maailma | Pohjois-Eurooppa–Atlantti | 793–1066 | Lindisfarne · Danelaw · Normandia 911 · Islanti · Grönlanti · Vinland · 1066 | idea |
| M10 | Ruotsin suurvalta ja Suomi | Itämeri | 1561–1809 | Tallinna 1561 · Kustaa II Aadolf · Westfalen 1648 · Poltava 1709 · Uusikaupunki 1721 · Hamina 1809 | idea (Suomen rajat 1323–1947 jatkona) |
| M11 | Inkat ja atsteekit | Andit, Meksiko | 1325–1572 | Tenochtitlán 1325 · Pachacuti · Huayna Capac · Cortés 1521 · Cajamarca 1532 · Vilcabamba 1572 | idea |

## N. Sodat ja rintamat

| # | linssi | alue | kaari | pysäkkejä | tila |
|---|---|---|---|---|---|
| N1 | Napoleonin Eurooppa | Eurooppa | 1796–1815 | Italia 1796 · Egypti · Austerlitz 1805 · Jena · Tilsit · Espanja · Moskova 1812 · Leipzig · Waterloo | seuraava (omistajan esimerkki) |
| N2 | Ensimmäinen maailmansota | Eurooppa, Lähi-itä | 1914–1918 | Sarajevo · Marne · Gallipoli · Verdun · Somme · Brest-Litovsk · 11.11.1918 | seuraava (omistajan esimerkki) |
| N3 | Toinen maailmansota | Eurooppa, Tyynimeri | 1939–1945 | Puola · Ranska 1940 · Barbarossa · Pearl Harbor · Stalingrad · Normandia · Berliini · Hiroshima | seuraava (pelin aikakauden ulkopuolella, linssi katsoo eteenpäin) |
| N4 | Kolmikymmenvuotinen sota | Keski-Eurooppa | 1618–1648 | Prahan ikkuna · Breitenfeld · Lützen 1632 · Westfalen | idea |
| N5 | Krimin sota | Musta meri, Itämeri | 1853–1856 | Sinope · Sevastopol · Bomarsund · Pariisin rauha | idea (isoisän aikalaisten sota) |
| N6 | Yhdysvaltain sisällissota | USA | 1861–1865 | Fort Sumter · Antietam · Gettysburg · Sherman · Appomattox | idea |
| N7 | Balkanin sodat | Balkan | 1877–1913 | Pleven 1877 · San Stefano · Berliini 1878 · 1912 · 1913 | idea (Bulgarian lauta) |

## O. Imperiumit, siirtomaat ja kartan uusjako

| # | linssi | alue | kaari | pysäkkejä | tila |
|---|---|---|---|---|---|
| O1 | Espanja ja Portugali maailmalla | maailma | 1494–1825 | Tordesillas 1494 · Filippiinit · Brasilia · itsenäistymiset 1810–1825 | idea |
| O2 | Britannian imperiumi | maailma | 1600–1922 | Itä-Intian kauppakomppania · Plassey 1757 · Kanada · Australia · Intia 1858 · Egypti 1882 · 1922 | idea |
| O3 | Afrikan jako | Afrikka | 1870–1914 | Suez · Berliini 1884 · Kongo · Fashoda 1898 · buurisota · 1914 | seuraava |
| O4 | Venäjä laajenee Siperiaan | Venäjä–Tyynimeri | 1582–1867 | Jermak 1582 · Jakutsk 1632 · Ohotsk · Kamtšatka · Alaska 1867 | idea (Siperian laudat pelissä) |
| O5 | Yhdysvallat laajenee | Pohjois-Amerikka | 1783–1912 | 1783 · Louisiana 1803 · Texas 1845 · Oregon · Meksiko 1848 · Alaska 1867 · 1912 | idea |
| O6 | Euroopan kartta uusiksi | Eurooppa | 1815–1923 | Wien 1815 · Italia 1861 · Saksa 1871 · Berliini 1878 · Versailles 1919 · Lausanne 1923 | seuraava (isoisän Eurooppa 1873 keskellä) |

## P. Leviämiset

| # | linssi | alue | kaari | pysäkkejä | tila |
|---|---|---|---|---|---|
| P1 | Uskontojen levinneisyys | maailma | 500 eaa–1900 | buddhalaisuus · kristinusko · islam · uskonpuhdistus · lähetystyö | seuraava (uskontojen aikajanalinssien pari) |
| P2 | Musta surma | Eurooppa | 1347–1353 | Kaffa · Messina 1347 · Marseille · Pariisi 1348 · Lontoo · Bergen 1349 · Moskova 1353 | idea |
| P3 | Indoeurooppalaiset kielet | Euraasia | 3500 eaa–1500 | arot · Anatolia · Kreikka · Italia · germaanit · slaavit · Intia | idea |
| P4 | Rautatieverkon kasvu | Eurooppa | 1825–1900 | Britannia · Belgia 1835 · Saksa · Ranska · Venäjä · Suomi 1862 | idea (verkko piirtyy vuosi vuodelta) |
| P5 | Kirjapainon leviäminen | Eurooppa | 1450–1500 | Mainz · Venetsia · Pariisi · Lontoo 1476 · Tukholma 1483 | idea |

## Osa 3: Virtalinssit (kolmas moottori)

Omistaja 2.9.2026 ilta: *"visuaalisesti voimakkain linssi jonka pohjana olisi
koko maailmankartta ja aiheena siirtomaat … salamanisku merireittiä pitkin
valloittajamaista siirtomaihin … sen jälkeen merireitille piirtyisi pieniä
veneitä jotka kuljettaisivat banaania, teetä, yms. … ääniefektit ja
kuulutukset megafonista."*

Moottori: kello ja filminauha samat, mutta kartalla liikkuu jatkuvasti satoja
hiukkasia reittikäyrillä → Canvas-kerros (M7+-linssialusta), ei DOM. Isku =
salama emämaasta alueelle ensimmäisen alistuksen vuonna, alue saa emämaan
värin; virta = laivoja, joiden määrä ja lasti seuraavat vuosia ja loppuvat
kaupan tai siirtomaavallan loppuun. Ääni: satama-ambienssi, torvi, kuulutus
megafonista pysäkeillä, generoidaan lukijaäänellä etukäteen. Orjat kuulutetaan
kuten muu lasti ("laiva on lastattu orjilla"), koska niin heihin silloin
suhtauduttiin; orjalaivat vetävät mustaa viivaa, Pulu tulee väliin ja selittää,
ja tyhjälle merelle projisoidaan generoituja aikalaiskuvia orjien oloista ja
siirtomaavaltojen arjesta (13+, mutta asia kerrotaan niin kuin se oli).

| # | linssi | alue | kaari | pysäkkejä | tila |
|---|---|---|---|---|---|
| S1 | Siirtomaat | maailma | 1415–1960 | Ceuta 1415 · Goa 1510 · Hispaniola · Batavia 1619 · Kalkutta · Kap 1652 · Sydney 1788 · Algeria 1830 · Kongo 1885 · Intia 1947 · Afrikka 1960 | seuraava (omistajan kolmas linssi) |
| S2 | Kolmiokauppa | Atlantti | 1500–1867 | Elmina · Liverpool · Nantes · Karibia · Bahia · Charleston · kielto 1807 · 1867 | seuraava |
| S3 | Maustereitit ja teekauppa | Intian valtameri–Eurooppa | 1500–1900 | Molukit · Malakka · Kanton · Kalkutta · Suez 1869 · teekilpalaivat 1866 | idea |
| S4 | Hopea ja kulta | Amerikat–Eurooppa–Aasia | 1545–1900 | Potosí · Manilan galeonit · Sevilla · kultaryntäykset 1849, 1851, 1886 | idea |
| S5 | Turkikset ja valaat | pohjoinen | 1600–1900 | Hudsonin lahti · Siperia · Huippuvuoret · Nantucket · Beringinmeri | idea |
| S6 | Luonnonvarat valuvat | maailma | 1850–2000 | guano Chincha 1840 · kumi Kongo ja Amazon · kupari Chile · timantit Kimberley 1867 · öljy Baku ja Pennsylvania 1859, Persia 1908 · harvinaiset maametallit | seuraava (louhintamaa värilänttinä, joka valuu maailmalle; raaka-aine omalla värillään) |
| S7 | Lähi-itä ja musta kulta | Lähi-itä | 1908–1973 | Masjed Soleyman 1908 · Sykes–Picot 1916 · mandaatit 1920 · Kirkuk 1927 · Bahrain 1932 · Dammam 1938 · Iran 1951 · Suez 1956 · OPEC 1960 · 1973 | seuraava (omistaja 2.9.: Lähi-itäkin oli aluksi siirtomaa ja alistettu; salama ja mandaatin väri, sitten öljy valuu ulos, Pulu kertoo kenelle tuotto meni) |
| T1 | Siirtolaisuus Amerikkaan | Eurooppa–Amerikat | 1840–1914 | Irlanti 1845 · Bremen · Liverpool · Ellis Island 1892 · Hanko–New York | seuraava |
| T2 | Pyhiinvaellukset | maailma | vuodenkierto | Santiago · Mekka · Varanasi · Jerusalem | idea |
| T3 | Siperian karkotukset ja asutus | Venäjä | 1590–1917 | Tobolsk · Irkutsk · Sahalin · rata 1891 | idea |
| U1 | Sähkösanomakaapelit | maailma | 1851–1902 | Dover–Calais 1851 · Atlantti 1866 · Intia 1870 · Australia 1872 · Tyynimeri 1902 | seuraava (pelin sähkeet) |
| U2 | Postireitit ja höyrylinjat | maailma | 1840–1914 | P&O · Cunard · Suez · Fogg 1872 | idea |
| U3 | Muuttolinnut | maailma | vuodenkierto | kurjet · haarapääskyt · valaat | idea (= F2) |

## Järjestys

1. Keksinnöt Euroopassa hiotaan valmiiksi (pelillinen ovi, kuvat kuvaputkelta, musiikki kuunneltu).
2. A1 Suuret uskonnot syntyvät + A4 Uskonpuhdistus (omistajan linjaus; kuvat H4-tilauksena).
3. B2, B3, C1, C2 — pysäkeistä iso osa on jo pelin hetkiä tai kohteita.
4. C5 Maapallon ympäri 80 päivässä — pelin oma tarina, tarvitsee maailmankartan.
5. Maanosat: H1 Kiinan keksinnöt, H3 Japani, I3 Osmanit, J1 Kultavaltakunnat, J4 Afrikan tutkimusmatkat, K1 Mesoamerikka ja Andit, K3 Yhdysvallat, L2 Cook — järjestys sen mukaan, mille laudalle peli laajenee seuraavaksi.
6. Aluelinssit (toinen moottori) aloitetaan M1 Kiinan dynastioista, kun aikajanamoottori on hiottu: pohjakartan ja rajojen aineistotyö ensin, sitten N1 Napoleon, N2 maailmansota, M2 Rooma.
7. Loput ideasta seuraavaksi omistajan päätöksellä.
