# Noston vuosirivit: Wien (SK 17.11.2026)

Sama menetelmä ja KK:n linja kuin Lontoossa ja Amsterdamissa (PR 7048, 7049): "n." jos teksti sanoo "noin"; epävarma sana pois selitteestä; 1873-rivit ja yhden lähteen rivit jäävät ja merkitään. KK 17.45: raportti ja data samassa PR:ssä. Data: kenttä `vuodet` 21 nostolle (19 nähtävyysjuttua, 2 kadonnutta: Ringtheater, Kärntnertor-teatteri), luettelosta −19.

Koneluettava lähde: `docs/raportit/noston-vuodet-wien-20261117.json`. Skriptivalidointi: **21 nostoa, 74 riviä, 0 virhettä**; koko `npm test` vihreä. Ei ääntä.

## Tarkistukset (17.11.2026)
- **Riippumaton tarkistaja** (Sonnet, vain tekstit ja rivit): 77 riviä, 2 VIRHE + 6 epätarkkaa → selitteet korjattu: "Schikaneder johtaja" (Schikaneder 1789; "alkaen"), "teatteri avattiin" (Theater an der Wien 1801, ei Freihaus), "muurien purku alkoi" / "purusta ilmoitettiin" (virke koskee muuria, ei porttia), "Euroopan neuvosto" (1972), "esitys kiellettiin" (1785, saksankielinen esitys Wienissä).
- **PT 17.53: kolme selitettä siistimmäksi** (Schikaneder johtaja, teatteri avattiin, purusta ilmoitettiin). PT:n ehdottamat pidemmät muodot (22/22/28 merkkiä) ylittäisivät testin rajan 20 merkkiä, joten käytetty lyhyempiä.
- **Vuosien lähdetarkistus** (Sonnet; Wikipedia = yksi lähde): lähes kaikki OK 2–3 lähdettä. **Poistettu rivit, joita lähteet eivät tue:** Belvedere 1776 (päätös galleriasta 1776, avajaiset 1777, yleisölle 1781; virke "1776 julkinen galleria" ei täsmää), Taikahuilu 1800 "haki lupaa" (lupa myönnetty jo 1786; 1800 rakennustyön alku), Vanha Burgtheater 1741 (en-wiki ja Austria-Forum 1741, WGW avajaiset 1748: lähteet eroavat).
- **Vain yksi lähde, rivi jätetty (KK päättää):** Jättiratas 1920–1985 (en-Wikipedia), Altes Kärntnertor 1858–1859 portti purettiin (Wien Geschichte Wiki). Ohut tuki: Dianabad 1917 (WGW, de-wiki). Epätarkka: Schönbrunn 1696 (WGW 1695/96; rakentamisen alku, Fischerin ensimmäinen suunnitelma jo 1688–90).
- **Tarinan oma vuosi, ei historiaväite:** "isoisän matka/vuosi 1873" (Kärntnertor, Vanha Burgtheater, Heinrichshof, Altes Kärntnertor, Klimt, Saliera, Beethoven, Mozart, Praterin jättiratas, Lipizzanit, Taikahuilu, Tonava kaunoinen); Vuoristovesijohdon oma vuosi 24.10.1873 on historiaväite (OK 3 lähdettä).

## Tekstihuomiot (tekstikorjauslistaan; lisätään kun 7048/7049 on mainissa, ettei lista konfliktoi)
1. **Kärntnertor-teatteri:** WGW antaa purkuvuodeksi 1873/74 (en-wiki 1870): rakennus saattoi seistä vielä 1873; teksti "Talo purettiin myöhemmin" kelpaa, "teatteri oli jo suljettu" kelpaa.
2. **Vanha Burgtheater:** aloitusvuosi 1741 (en-wiki, Austria-Forum) vs WGW 1748 ("Theater nächst der Burg"): valittava lähde.
3. **Belvedere:** "vuonna 1776 siitä tehtiin julkinen taidegalleria" → 1776 päätös siirtää keisarillinen galleria, avajaiset 1777, yleisölle 1781; "Prinssin kuoltua palatsin osti Maria Theresia" (osto 1752, Eugen kuoli 1736) löyhä.
4. **Hofburg:** Wienin kongressilla ei ollut täysistuntoa; neuvottelut Ballhausplatzin kanslian ympäristössä, Hofburg isäntä ja juhlien paikka.
5. **Schönbrunn:** "Fischer aloitti 1696" (WGW 1695/96, uudisrakennus 1696–1701).
6. **Taikahuilu:** "Schikaneder haki vuonna 1800 lupaa uuden teatterin rakentamiseen": lupa myönnetty 1786; 1800 rakennustyön/rakennushakemuksen vuosi.
7. **Lipizzanit:** "hevoset eivät tulleet Piberistä; siirtyivät sinne 1920" hieman epätarkka (Piberin laitos perustettu 1798).
8. **Beethoven:** "konsertti alkoi seitsemältä illalla" ei tarkistettu.
9. **Jättiratas:** "maailman korkein 1920–1985" vain en-wikissä.

## Rivit nostoittain

### Ringtheater

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – teatteri avattiin 1874 | tammikuuta 1874 | Ringtheater oli wieniläinen teatteri, joka avattiin 17. tammikuuta 1874 Rossinin Sevillan parturilla. |
| – tulipalo 1881 | päivänä 1881 | Joulukuun 8. päivänä 1881 tulipalo syttyi lavan puolella juuri ennen Offenbachin Hoffmannin tarinoiden esitystä ja levisi nopeasti katsomoon. |

### Kärntnertor-teatteri

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – teatteri avattiin 1709 | vuonna 1709 | Kärntnertor-teatterin suunnitteli Antonio Beduzzi, ja se avattiin vuonna 1709. |
| – tulipalo 1761 | sen 1761 | Tulipalo tuhosi sen 1761, ja Nikolaus Pacassi rakensi sen uudelleen 1763. |
| – yhdeksäs sinfonia 1824 | toukokuuta 1824 | Huipentuma oli 7. toukokuuta 1824: Beethovenin yhdeksännen sinfonian kantaesitys. |
| – teatteri suljettiin 1870 | vuonna 1870 | Teatteri suljettiin vuonna 1870, ja uusi hovioopperatalo oli avattu jo 1869. |
| – isoisän matka 1873 | matkavuonna 1873 | Isoisän matkavuonna 1873 teatteri oli jo suljettu. |

### Vanha Burgtheater

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – viimeinen esitys 1888 | lokakuuta 1888 | Viimeinen esitys oli 12. lokakuuta 1888, kun uusi Burgtheater oli valmistunut Ringstraßelle. |
| – isoisän vuosi 1873 | vuonna 1873 | Isoisäsi vuonna 1873 vanha teatteri oli vielä käytössä. |

### Heinrichshof

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – talo avattiin 1863 | vuonna 1863 | Teollisuusmies Heinrich Drasche rakennutti sen arkkitehti Theophil Hansenilla, ja talo avattiin vuonna 1863. |
| – talo paloi 1945 | maaliskuuta 1945 | Liittoutuneiden ilmahyökkäyksessä 12. maaliskuuta 1945 talo paloi pahoin. |
| – isoisän vuosi 1873 | vuonna 1873 | Isoisäsi vuonna 1873 Heinrichshof oli ollut valmis jo kymmenen vuotta. |

### Altes Kärntnertor

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – purusta ilmoitettiin 1857 | vuoden 1857 | Muurien purkamisesta ilmoitettiin vuoden 1857 lopussa, ja purku alkoi vuonna 1858. |
| – muurien purku alkoi 1858 | vuonna 1858 | Muurien purkamisesta ilmoitettiin vuoden 1857 lopussa, ja purku alkoi vuonna 1858. |
| – portti purettiin 1858–1859 | vuosina 1858–1859 | Portti purettiin vuosina 1858–1859. |
| – isoisän vuosi 1873 | vuonna 1873 | Isoisäsi vuonna 1873 porttia ei ollut ollut enää yli kymmeneen vuoteen. |

### Raatihuone

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – rakennettiin 1872–1883 | vuosina 1872–1883 | Wienin komea raatihuone rakennettiin vuosina 1872–1883 arkkitehti Friedrich von Schmidtin suunnitelmien mukaan. |

### Hofburg

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – Wienin kongressi 1814–1815 | Vuosina 1814–1815 | Vuosina 1814–1815 Hofburgissa pidettiin Wienin kongressi, jossa Euroopan valtiot neuvottelivat sodan jälkeisistä rajoista. |

### Valtionooppera

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – rakennettiin 1861–1869 | vuosina 1861–1869 | Wienin valtionooppera rakennettiin vuosina 1861–1869 uudelle, hienolle Ringstrasse-kehätielle — se oli ensimmäinen suurista rakennuksista, jotka nousivat kadun varrelle. |
| – ooppera avattiin 1869 | toukokuussa 1869 | Talo avattiin toukokuussa 1869 Mozartin oopperalla Don Giovanni, eivätkä kumpikaan rakentaja päässyt sitä koskaan näkemään. |
| – pommitus tuhosi 1945 | vuonna 1945 | Pommitus tuhosi oopperatalon pahoin vuonna 1945, mutta se rakennettiin uudelleen ja avattiin taas 1955. |
| – avattiin taas 1955 | taas 1955 | Pommitus tuhosi oopperatalon pahoin vuonna 1945, mutta se rakennettiin uudelleen ja avattiin taas 1955. |

### Stephansdom

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – historia alkoi 1137 | vuonna 1137 | Stephansdomin historia alkoi jo vuonna 1137, mutta suuri tulipalo tuhosi kirkon vuonna 1258. |
| – suuri tulipalo 1258 | vuonna 1258 | Stephansdomin historia alkoi jo vuonna 1137, mutta suuri tulipalo tuhosi kirkon vuonna 1258. |
| – uusi rakennus alkoi 1359 | vuonna 1359 | Nykyisen goottilaisen kirkon rakentaminen alkoi vuonna 1359, ja eteläinen torni, jota wieniläiset kutsuvat hellästi nimellä Steffl, valmistui vuonna 1433. |
| – etelätorni valmis 1433 | vuonna 1433 | Nykyisen goottilaisen kirkon rakentaminen alkoi vuonna 1359, ja eteläinen torni, jota wieniläiset kutsuvat hellästi nimellä Steffl, valmistui vuonna 1433. |
| – vartiointi vuoteen 1955 | vuoteen 1955 | Tornissa vartioitiin öitäkin myöten aina vuoteen 1955 asti — vartijat tähyilivät ylhäältä tulipaloja ja jopa vihollisjoukkoja. |

### Belvedere

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – rakennettiin 1712–1723 | vuosina 1712–1723 | Belvedere rakennettiin vuosina 1712–1723 kesälinnaksi kuuluisalle sotasankarille, prinssi Eugen Savoyilaiselle. |
| – valtiosopimus 1955 | Vuonna 1955 | Vuonna 1955 Ylä-Belvederessä allekirjoitettiin Itävallan valtiosopimus, joka teki maasta jälleen itsenäisen. |

### Jättiratas

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – ratas valmistui 1897 | vuonna 1897 | Praterin puiston jättiratas valmistui vuonna 1897 juhlistamaan keisari Frans Joosef I:n 50-vuotista hallituskautta. |
| – korkein ratas 1920–1985 | vuosina 1920–1985 | Pyörä oli niin ylivoimainen, että se oli maailman korkein jättiratas peräti 65 vuoden ajan, vuosina 1920–1985. |
| – purkulupa 1916 | vuonna 1916 | Pyörä oli lähellä katoamista jo vuonna 1916, kun sille myönnettiin purkulupa — mutta rahat loppuivat, eikä sitä koskaan purettu. |
| – Kolmas mies 1949 | vuoden 1949 | Jättiratas on myös elokuvatähti: se esiintyy kuuluisassa vuoden 1949 elokuvassa Kolmas mies, jonka ikimuistoisin kohtaus kuvattiin suoraan kopin sisällä pyörän kiertäessä korkealla Wienin yllä. |

### Schönbrunn

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – Fischer aloitti 1696 | vuonna 1696 | Arkkitehti Johann Bernhard Fischer von Erlach aloitti palatsin rakentamisen vuonna 1696, mutta nykyisen asunsa se sai vasta keisarinna Maria Teresian aikana, kun Nicolò Pacassi rakensi siitä 1700-luvun puolivälissä hovin kesäpalatsin. |
| – eläintarha 1752 | Kesällä 1752 | Kesällä 1752 Maria Teresian puoliso Frans Stefan esitteli puutarhassa eläintarhansa, joka toimii yhä — se on maailman vanhin. |
| – Gloriette rakennettu 1775 | rakennettiin 1775 | Puutarhan perällä mäen laella seisoo Gloriette-paviljonki, joka rakennettiin 1775 juhlistamaan Habsburgien mahtia — sen luota avautuu näkymä palatsin yli koko kaupunkiin. |
| – pommitusvauriot 1945 | pahoin 1945 | Pommitukset vaurioittivat palatsia pahoin 1945, mutta se korjattiin, ja vuonna 1996 Schönbrunn puutarhoineen otettiin Unescon maailmanperintöluetteloon. |
| – Unesco-kohde 1996 | vuonna 1996 | Pommitukset vaurioittivat palatsia pahoin 1945, mutta se korjattiin, ja vuonna 1996 Schönbrunn puutarhoineen otettiin Unescon maailmanperintöluetteloon. |

### Vuoristovesijohto

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – vesijohto avattiin 1873 | lokakuuta 1873 | Wienin ensimmäinen vuoristovesijohto avattiin 24. lokakuuta 1873, ja samana päivänä alkoi toimia Hochstrahlbrunnen-suihkulähde Schwarzenbergplatzilla. |

### Klimtin maalaukset

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – maalaukset tilattiin 1894 | maalauksia 1894 | Wienin yliopiston juhlasalin kattoon tilattiin maalauksia 1894, ja tilaajana oli opetusministeriö. |
| – Filosofia nähtiin 1900 | vuonna 1900 | Kun Filosofia nähtiin Secession-näyttelyssä vuonna 1900, joukko yliopiston professoreja vetosi ministeriöön kuvan ripustamista vastaan. |
| – kuvat tuhoutuivat 1945 | toukokuussa 1945 | Maalaukset eivät koskaan päätyneet kattoon: toukokuussa 1945, sodan viime päivinä, Immendorfin linnassa säilytetyt taideteokset paloivat, ja Klimtin tiedekuntakuvat tuhoutuivat. |
| – isoisän matka 1873 | matkavuonna 1873 | Isoisäsi matkavuonna 1873 Gustav Klimt oli vielä lapsi, sillä hän oli syntynyt 14. heinäkuuta 1862. |
| – Klimt syntyi 1862 | heinäkuuta 1862 | Isoisäsi matkavuonna 1873 Gustav Klimt oli vielä lapsi, sillä hän oli syntynyt 14. heinäkuuta 1862. |

### Saliera

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – Cellinin työ 1540–1543 | emalista 1540 ja 1543 | Saliera on suola-astia, jonka Benvenuto Cellini teki kullasta ja emalista 1540 ja 1543 välillä Ranskan kuninkaalle Frans I:lle. |
| – varkaus 2003 | toukokuuta 2003 | Yöllä vasten 11. toukokuuta 2003 varas kiipesi rakennustelineitä pitkin Wienin museoon, jota kunnostettiin. |
| – löytyi 2006 | Tammikuussa 2006 | Tammikuussa 2006 Saliera löytyi laatikosta metsästä lähellä Zwettlin kaupunkia. |
| – isoisän matka 1873 | matkavuonna 1873 | Isoisäsi matkavuonna 1873 Kunsthistorisches Museum ei ollut vielä avattu, sillä se avattiin vasta 1891. |
| – museo avattiin 1891 | vasta 1891 | Isoisäsi matkavuonna 1873 Kunsthistorisches Museum ei ollut vielä avattu, sillä se avattiin vasta 1891. |

### Beethoven 1824

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – kantaesitys 1824 | toukokuuta 1824 | Beethovenin yhdeksäs sinfonia kantaesitettiin Wienissä 7. toukokuuta 1824 Kärntnertor-teatterissa, ja konsertti alkoi seitsemältä illalla. |
| – Euroopan neuvosto 1972 | käyttöön 1972 | Euroopan unionin sivujen mukaan sinfonian ilon sävel on nykyään Euroopan hymni: Euroopan neuvosto otti sen käyttöön 1972 ja EU:n johtajat 1985. |
| – EU:n hymni 1985 | johtajat 1985 | Euroopan unionin sivujen mukaan sinfonian ilon sävel on nykyään Euroopan hymni: Euroopan neuvosto otti sen käyttöön 1972 ja EU:n johtajat 1985. |
| – isoisän matka 1873 | matkavuonna 1873 | Isoisäsi matkavuonna 1873 Kärntnertor-teatteria ei enää käytetty. |

### Mozart 1786

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – Figaron ensi-ilta 1786 | toukokuuta 1786. | Mozartin ooppera Figaron häät sai ensi-iltansa Wienin Burgtheaterissa 1. toukokuuta 1786. |
| – esitys kiellettiin 1785 | kiellettiin 1785 | Ooppera perustuu Beaumarchais'n näytelmään, jonka saksankielinen esitys Wienissä kiellettiin 1785 keisari Joosef II:n käskystä poliittisen taustansa vuoksi. |
| – Prahan matka 1787 | Tammikuussa 1787 | Tammikuussa 1787 Mozart matkusti Prahaan, jossa ooppera esitettiin hänen läsnä ollessaan. |
| – isoisän matka 1873 | matkavuonna 1873 | Isoisäsi matkavuonna 1873 sama Burgtheater Michaelerplatzilla oli yhä käytössä. |
| – teatteri suljettiin 1888 | vasta 1888 | Se suljettiin vasta 1888, kun uusi Burgtheater avattiin Ringillä. |

### Praterin jättiratas

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – ratas valmistui 1897 | valmistui 1897 | Praterin jättiratas valmistui 1897, ja se rakennettiin keisari Frans Joosefin 50-vuotishallitsijajuhlan kunniaksi. |
| – ratas paloi 1944 | Vuonna 1944 | Vuonna 1944 ratas paloi pahoin, ja vaunut tuhoutuivat. |
| – avattiin uudelleen 1947 | uudelleen 1947 | Kun ratas avattiin uudelleen 1947, vaunuja ripustettiin takaisin 15. |
| – vaunut uusittiin 2016 | Vuonna 2016 | Vuonna 2016 vaunut uusittiin alkuperäisten piirustusten mukaan, ja jokaisen sivulla on kuusi ikkunaa, kuten ennen paloa. |
| – isoisän matka 1873 | matkavuonna 1873 | Isoisäsi matkavuonna 1873 jättiratasta ei vielä ollut, sillä se valmistui vasta 1897. |

### Lipizzanit

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – sali rakennettiin 1729–1735 | rakennettiin 1729 ja 1735 | Espanjalainen ratsastuskoulu toimii Hofburgin palatsissa Wienissä salissa, joka rakennettiin 1729 ja 1735 välillä keisari Kaarle VI:n aikana. |
| – isoisän matka 1873 | matkavuonna 1873 | Isoisäsi matkavuonna 1873 koulu toimi hovin ratsastuskouluna samassa salissa, mutta hevoset eivät vielä tulleet Piberistä: lipizzanit siirtyivät sinne vasta 1920. |
| – siirto Piberiin 1920 | vasta 1920 | Isoisäsi matkavuonna 1873 koulu toimi hovin ratsastuskouluna samassa salissa, mutta hevoset eivät vielä tulleet Piberistä: lipizzanit siirtyivät sinne vasta 1920. |

### Taikahuilu

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – ensi-ilta 1791 | syyskuuta 1791 | Taikahuilu sai ensi-iltansa 30. syyskuuta 1791 Freihaustheaterissa Wiedenin esikaupungissa. |
| – Schikaneder johtaja 1789 | teatteria 1789 | Emanuel Schikaneder johti teatteria 1789 alkaen, kirjoitti oopperan sanat ja esitti itse linnustaja Papagenoa. |
| – teatteri avattiin 1801 | kesäkuuta 1801 | Schikaneder haki vuonna 1800 lupaa uuden teatterin rakentamiseen, ja Theater an der Wien avattiin 13. kesäkuuta 1801. |
| – isoisän matka 1873 | matkavuonna 1873 | Isoisäsi matkavuonna 1873 Taikahuilun teatteri ei ollut enää käytössä, sillä Freihaustheaterin viimeinen esitys oli ollut 1801. |

### Tonava kaunoinen

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – kantaesitys 1867 | helmikuuta 1867 | Johann Strauss nuoremman valssi Tonava kaunoinen kantaesitettiin Wienissä 15. helmikuuta 1867 Dianabadissa. |
| – Dianabad purettiin 1913 | purettiin 1913 | Alkuperäinen Dianabad on kadonnut: rakennus purettiin 1913, ja uusi Dianabad valmistui 1917. |
| – uusi valmistui 1917 | valmistui 1917 | Alkuperäinen Dianabad on kadonnut: rakennus purettiin 1913, ja uusi Dianabad valmistui 1917. |
| – isoisän matka 1873 | matkavuonna 1873 | Isoisäsi matkavuonna 1873 valssi oli ollut maailmalla jo kuusi vuotta, ja vanha Dianabad seisoi vielä paikallaan. |
