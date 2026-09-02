# Linssikatalogi — aikajanalinssien aiheluettelo

Päivitetty: 2.9.2026 (Fable). Omistajan linjaus 2.9.2026 ilta: *"kaikkien
suurien uskontojen tapahtumista täytyy myös saada omat kuvansa ja niistä
varmasti tehdään myös samanlainen aikajanalinssi kuin nyt tekniikasta
Euroopassa. hiotaan vain ensin tuo linssi mahdollisimman hyväksi niin sitten
voidaan monistaa samaa logiikkaa muihinkin."*

Tämä on elävä luettelo: aiheita lisätään ja tila päivitetään. Sitovat
linjaukset ovat Raamatussa (js/tyohuone-raamattu.js, Karttalinssit);
tämä dokumentti on työlista. Sama sisältö on artefaktisivuna
omistajalle: https://claude.ai/code/artifact/70aa8279-bf6b-49ce-a6cb-64b5a70c3fae
(päivitetään samaan osoitteeseen Artifact-työkalun `url`-parametrilla).

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

## Järjestys

1. Keksinnöt Euroopassa hiotaan valmiiksi (pelillinen ovi, kuvat kuvaputkelta, musiikki kuunneltu).
2. A1 Suuret uskonnot syntyvät + A4 Uskonpuhdistus (omistajan linjaus; kuvat H4-tilauksena).
3. B2, B3, C1, C2 — pysäkeistä iso osa on jo pelin hetkiä tai kohteita.
4. C5 Maapallon ympäri 80 päivässä — pelin oma tarina, tarvitsee maailmankartan.
5. Loput ideasta seuraavaksi omistajan päätöksellä.
