# Noston vuosirivit: Pariisi (SK 17.11.2026)

Tehtävä: PT/KK 16.50 (omistaja P-261117-70–72), suunnitelma `suunnitelmat/20261117-noston-vuosiluvut.md` luku 6 kohta 3 ja "Ei tehdä" -lista. **Vain luonnos: ei dataa, ei ääntä.** Seuraavaksi riippumaton tarkistaja → KK lukee → data-PR (kenttä `vuodet`, kun PK:n skeema ja testi ovat valmiit).

Koneluettava lähde: `docs/raportit/noston-vuodet-pariisi-20261117.json` (jokainen rivi: kohta, vuosi, selite). Kohta on sanatarkka pätkä luettavasta tekstistä (`teksti`, main 0dbe383cff), ja se esiintyy tekstissä tasan kerran ja sisältää vuoden. Ruudulla rivi on "– selite vuosi".

## Säännöt, joilla rivit tehtiin
- Selite 1–3 sanaa, enintään 20 merkkiä, sanoo saman kuin virke; ei uutta tietoa eikä tulkintaa (vain tekstin omat sanat, taivutus kevennetty).
- Yksi rivi per vuosi tai väli; järjestys = tekstin järjestys; enintään 5 riviä (valinta: vuosi, joka kantaa tarinaa).
- Ei rivejä: vuosisadat ja vuosikymmenet (1100-luvulla, 1860-luvulla), vuosia kuvateksteistä, lainauksista tai Pulun kysymyksistä; ei uusia faktoja.
- Tarkistettu skriptillä: kohta tasan kerran, vuosi kohdassa, selite ≤ 20 merkkiä ja ≤ 3 sanaa, ≤ 5 riviä, järjestys, ei kaksoisvuosia: **44 nostoa, 133 riviä, 0 virhettä.**

## Rajaus ja päätettävää KK:lle
1. **Määrä on 45, ei 41.** Suunnitelman luvut ovat klo 07.41 tilanteesta; mainissa on sen jälkeen tullut Tour Saint-Jacques, Saint-Eustache, Pompidou-keskus ja Kaulanauha 1785 sekä kaksi lisäkorttia (Tornin nimet 2026, Notre-Dame 2019; jakavat nosto-tunnuksen pistekorttinsa kanssa). Kaikki on tehty; jos jokin kuuluu pois, poistetaan sen lohko.
2. **Tuileries'n palatsi on jätetty pois:** sen tarina uusitaan (Tuileries-koe), eikä vanhaa tekstiä ole enää kortissa. Rivit tehdään vasta kun uusi teksti on lopullinen.
3. **Palais Garnier: 5 riviä, ei 3.** Suunnitelman koe (luku 5) käyttää kolmea riviä (1860, 1861, 1989); tekstissä on myös 1862 (peruskivi) ja 1875 (avajaiset). Koe voi käyttää samoja kolmea, loput kaksi tulevat mukaan datassa.
4. **Ei vuosia:** Vrain-Lucas (#31), ei riviä.
5. Ylimääräisiä vuosia jätetty pois, kun niitä oli yli viisi (esim. Panthéon 1995, Notre-Dame 1944, Piaf 1947, Palais d'Orsay 1840 ja 1842).
6. Suunnitelman sivuhavainto 1 (Riemukaaren 1920/1921, Orsayn 1939) on jo korjattu mainissa tekstiin, ja rivit noudattavat korjattua tekstiä. Sivuhavainto 6 (Trocadéro: "vuosina 1876–1878" vs "marraskuusta 1876 kesäkuuhun 1878") on edelleen auki; rivi on tehty varman vuoden mukaan (1878, "maailmannäyttely"), ei 1876–1878.

## Tarkistukset (17.11.2026)
- **Riippumaton tarkistaja** (Sonnet, sai vain rivit ja tekstit) vertasi kaikki rivit virkkeisiin: 24 selitettä korjattiin (esim. "purku alkoi" eikä "purettiin", "matka alkoi" eikä "matka Pariisiin", "maksullinen näytös" → "Lumièren näytös"; ei väitä kruunuksi, löydöksi tai valmiiksi hauta-paikaksi sellaista, mitä virke ei sano).
- **Vuosien lähdetarkistus** (kaksi Sonnet-hakijaa, 142 riviä verkkolähteistä; Wikipedia en+fr = yksi lähde): pääosa OK 2 lähdettä. **Poistettu rivit, joiden vuotta lähteet eivät tue:** Saint-Eustache 1846–1854 (korjausvuodet eroavat), Piaf "La Vie en rose" 1946 ja 1947 (levytys 1946, single 1947, ei ensiesitystä), Pompidou 1970–1971 (alkuvuosi 1970 ei vahvistunut), Lavoisier 1780 (ei dateerausta), Monet 1872 (yksi lähde), Bastilji 1417 ja 1659 (vain en.wiki; Britannica kertoo toisin), Panthéon 1758 (virallinen CMN: peruskivi 1764), Trocadéro 1876–1878 (alkuvuosi vain wikeissä; tilalla 1878).
- **Vain yksi lähde, rivi jätetty (KK päättää):** Riemukaari 1920 (fr.wiki), Saint-Eustache 1637 (wikit), Tour Saint-Jacques 1891 (paris.fr), Bizet 1874 johtaja erosi (en.wiki), Kaulanauha 1870 tuomio (en.wiki), Les Halles 1183 (osa lähteistä 1181), Grand Palais 2024 ja Panthéon-tyyppiset yleistiedot (yksi lähde riittää: katso lähteet-ja-tarkistus).
- **Tarinan oma vuosi, ei historiaväite:** Palais d'Orsay 1873 ja Palais de l'Industrie 1873 ("isoisä näki / isoisän käynti").
- **Lähteissä eroaa tekstistä (vaikuttaa tekstiin, ei riveihin; KK:lle):** Kaulanauha: kauppasumma teksti 1,6 milj. livreä vs en.wiki 2 milj.; Metro: teksti "jäljellä 88" vs Cercle Guimard 88 jäljellä, joista 86 suojeltu / en.wiki 86; Piaf: teksti "syntyi Bellevillessä", syntymätodistus Hôpital Tenon; Lumière: "ensimmäinen maksullinen" (Skladanowsky Berliinissä 1.11.1895); Panthéon "perustukset 1758" vs CMN peruskivi 1764; Orsay: Napoleon.org "1808" päätös, rakentaminen 1810.
- Notre-Dame ja Eiffel-torni jakavat nosto-tunnuksen lisäkortin kanssa (`nosto-notre-damen-kukko`, `nosto-pariisin-72-nimea`): jos nosto lukee molemmat kortit, 2019 esiintyy kahdesti; datamalli ratkaisee (yksi rivi per nosto-tunnus).

## Rivit nostoittain

### Grand Châtelet

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – muurityö alkoi 1190 | kaupungin muuria 1190 | Kun Philippe Auguste alkoi rakennuttaa kaupungin muuria 1190, linnake menetti puolustustehtävänsä, ja siitä tuli Pariisin prévôtin oikeudenkäytön ja poliisin pääpaikka. |
| – tuomioistuin loppui 1790 | lakkautettiin 1790 | Châtelet'n tuomioistuin lakkautettiin 1790, ja linnakkeen purku alkoi 1802. |
| – purku alkoi 1802 | purku alkoi 1802 | Châtelet'n tuomioistuin lakkautettiin 1790, ja linnakkeen purku alkoi 1802. |
| – teatterin rakennus 1860–1862 | 1860–1862 | Aukion vierellä seisoo Théâtre du Châtelet, jonka Gabriel Davioud rakensi 1860–1862. |

### Temple-torni

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – ritarikunta loppui 1312 | lakkautettiin 1312 | Temppeliritarikunta lakkautettiin 1312. |
| – perhe Templeen 1792 | päivänä 1792 | päivänä 1792 Pariisin kommuuni vei kuningasperheen Templeen; Ludvig XVI lähti sieltä giljotiinille 21. |
| – matka giljotiinille 1793 | tammikuuta 1793 | tammikuuta 1793. |
| – Ludvig XVII kuoli 1795 | kesäkuuta 1795 | kesäkuuta 1795 kymmenvuotiaana. |
| – purkumääräys 1808 | purettavaksi 1808 | Napoleon määräsi tornin purettavaksi 1808 estääkseen rojalistien pyhiinvaellukset. |

### Palais d'Orsay

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – palatsi aloitettiin 1810 | aloitti 1810 | alais d'Orsay oli Seinen rannalla Quai d'Orsay'lla seissyt hallintopalatsi, jonka Napoleon I aloitti 1810 ja joka valmistui vasta noin kolmenkymmenen vuoden päästä. |
| – palatsi paloi 1871 | toukokuuta 1871 | toukokuuta 1871. |
| – isoisä näki rauniot 1873 | näki ne 1873 | Rauniot jäivät keskelle Pariisia, ja isoisä näki ne 1873. |
| – purku alkoi 1898 | vuodesta 1898 | Rauniot purettiin vuodesta 1898, ja paikalle rakennettiin Gare d'Orsay vuoden 1900 maailmannäyttelyä varten. |
| – maailmannäyttely 1900 | vuoden 1900 | Rauniot purettiin vuodesta 1898, ja paikalle rakennettiin Gare d'Orsay vuoden 1900 maailmannäyttelyä varten. |

### Palais de l'Industrie

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – halli avattiin 1855 | toukokuussa 1855 | Arkkitehti Jean-Marie-Victor Vielin ja insinööri Alexis Barrault'n suunnittelema halli avattiin toukokuussa 1855. |
| – sähkönäyttely 1881 | ja 1881 | Siellä pidettiin Pariisin virallinen taidenäyttely Salon, ja 1881 kansainvälinen sähkönäyttely. |
| – isoisän käynti 1873 | käydessä 1873 | Isoisän käydessä 1873 halli oli käytössä. |

### Trocadéron palatsi

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – maailmannäyttely 1878 | vuoden 1878 | rocadéron palatsi rakennettiin vuoden 1878 Pariisin maailmannäyttelyä varten Seinen pohjoisrannalle, ja sen suunnittelivat Gabriel Davioud ja Jules Bourdais. |
| – keskisali purettiin 1935 | Vuonna 1935 | Vuonna 1935 keskisali ja tornit purettiin vuoden 1937 näyttelyn tieltä, ja siivet jäivät uuden Chaillot'n palatsin osiksi. |
| – näyttely 1937 | vuoden 1937 | Vuonna 1935 keskisali ja tornit purettiin vuoden 1937 näyttelyn tieltä, ja siivet jäivät uuden Chaillot'n palatsin osiksi. |

### Galerie des Machines

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – maailmannäyttely 1889 | vuoden 1889 | alerie des Machines oli vuoden 1889 Pariisin maailmannäyttelyn konehalli Champ-de-Marsilla, samalla kentällä kuin Eiffel-torni. |

### Les Hallesin hallit

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – markkina siirrettiin 1183 | sinne 1183 | es Halles oli Pariisin keskeinen ruokatori, jonka historia ulottuu 1100-luvulle; Philippe Auguste siirsi sinne 1183 toisen markkinan ja rakennutti torille ensimmäiset katetut hallit. |
| – Zolan romaani 1873 | romaanissaan (1873) | Émile Zola kutsui halleja Pariisin vatsaksi samannimisessä romaanissaan (1873). |
| – kauppa Rungisiin 1969 | Rungisiin 1969 | Tukkukauppa muutti Rungisiin 1969, ja hallit purettiin 1970-luvun alussa. |
| – Forum avattiin 1979 | paikalle 1979 | Yksi paviljonki pystytettiin uudelleen Nogent-sur-Marneen, ja Forum des Halles avattiin paikalle 1979. |

### Eiffel-torni (`nosto-pariisin-72-nimea`)

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – maailmannäyttely 1889 | vuonna 1889 | un Pariisiin rakennettiin maailmannäyttelyä varten vuonna 1889, insinööri Gustave Eiffelin toimisto pystytti Champ de Mars -puistoon noin 300 metriä korkean rautatornin vain reilussa kahdessa vuodessa. |
| – piti purkaa 1909 | jo vuonna 1909 | Torni oli tarkoitus purkaa jo vuonna 1909, mutta se pelastui, koska siitä tuli tärkeä radiolähetysasema. |

### Riemukaari

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – Napoleonin käsky 1806 | vuonna 1806 | eisari Napoleon käski rakentaa valtavan riemukaaren vuonna 1806 juhlistamaan Austerlitzin taistelun voittoa. |
| – valmistui 1836 | vasta vuonna 1836 | Napoleon ei koskaan nähnyt valmista kaarta, sillä se saatiin valmiiksi vasta vuonna 1836. |
| – sotilas tuotiin 1920 | marraskuuta 1920 | marraskuuta 1920 nimetön ranskalaissotilas muistoksi kaikista sodissa kadonneista ja haudattiin 28. |
| – haudattiin 1921 | tammikuuta 1921 | tammikuuta 1921. |
| – lento kaaren läpi 1919 | Vuonna 1919 | Vuonna 1919 lentäjä Charles Godefroy lensi kaksitasokoneellaan kaaren läpi — uskomaton temppu, sillä aukko on vain reilut 14 metriä leveä. |

### Concorden aukio

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – obeliski lahjaksi 1830 | marraskuussa 1830 | Aukion keskellä kohoaa 23-metrinen, yli 3 300 vuotta vanha Luxorin obeliski, jonka Egyptin hallitsija lahjoitti Ranskalle marraskuussa 1830. |
| – obeliski pystyyn 1836 | vuonna 1836 | Kivijättiläinen tuotiin laivalla Niililtä asti ja pystytettiin aukiolle vuonna 1836 valtavan väkijoukon seuratessa. |

### Louvre

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – museo avattiin 1793 | elokuussa 1793 | Vuosisatojen kuluessa siitä tehtiin kuninkaallinen palatsi, kunnes Ranskan vallankumouksen jälkeen se avattiin kaikille kansalaisille museona elokuussa 1793. |
| – lasipyramidi 1989 | Vuonna 1989 | Vuonna 1989 palatsin sisäpihalle nousi yllättävä uutuus: arkkitehti I. |

### Luxembourgin puisto

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – Henrik IV murhattiin 1610 | murhattiin 1610 | un kuningas Henrik IV murhattiin 1610, hänen leskensä Maria de’ Medici jäi hallitsemaan Ranskaa poikansa puolesta — eikä viihtynyt Louvressa. |
| – kartano ostettiin 1612 | vuonna 1612 | Hän osti vuonna 1612 Luxembourgin kartanon ja rakennutti sen viereen palatsin, joka jäljitteli hänen kotikaupunkinsa Firenzen Palazzo Pittiä. |
| – nukketeatteri alkoi 1933 | vuodesta 1933 | Kahdeksankulmaisella altaalla lapset uittavat purjeveneitä, nukketeatteri on toiminut puistossa vuodesta 1933, ja patsaita on toista sataa — niiden joukossa kaksikymmentä Ranskan kuningatarta ja jäljennös Bartholdin pienoismallista Vapaudenpatsaasta (alkuperäinen siirrettiin Musée d'Orsayhin 2012). |
| – patsas Orsayhin 2012 | 2012 | Kahdeksankulmaisella altaalla lapset uittavat purjeveneitä, nukketeatteri on toiminut puistossa vuodesta 1933, ja patsaita on toista sataa — niiden joukossa kaksikymmentä Ranskan kuningatarta ja jäljennös Bartholdin pienoismallista Vapaudenpatsaasta (alkuperäinen siirrettiin Musée d'Orsayhin 2012). |

### Sacré-Cœur

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – sodan häviö 1870 | vuonna 1870 | asilika Sacré-Cœur eli Pyhän sydämen kirkko rakennettiin Montmartren kukkulan huipulle sen jälkeen, kun Ranska oli hävinnyt sodan Preussille vuonna 1870. |

### Panthéon

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – kuningas sairastui 1744 | sotaretkellä 1744 | uningas Ludvig XV sairastui vakavasti sotaretkellä 1744 ja lupasi, että jos hän toipuu, Pariisin suojeluspyhimys Geneviève saa rappeutuneen kirkkonsa tilalle uuden. |
| – valmistui 1790 | vasta 1790 | Rahapula venytti työtä vuosikymmeniä: Soufflot kuoli 1780, ja hänen oppilaansa Jean-Baptiste Rondelet sai rakennuksen valmiiksi vasta 1790. |
| – suurmiesten hauta 1791 | 1791 kansalliskokous | Kirkko valmistui juuri kun vallankumous oli alkanut, ja 1791 kansalliskokous määräsi sen suurmiesten hautapaikaksi. |
| – Foucaultin heiluri 1851 | Vuonna 1851 | Vuonna 1851 fyysikko Léon Foucault ripusti kupolista 67 metriä pitkän heilurin ja näytti yleisölle, ettei heilahdustaso käänny vaan maa kääntyy sen alla. |

### Notre-Dame (`nosto-notre-damen-kukko`)

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – rakennus alkoi 1163 | vuonna 1163 | otre-Damen katedraalin rakentaminen kesti uskomattomat 182 vuotta — työ alkoi vuonna 1163 ja valmistui vasta 1345. |
| – valmistui 1345 | vasta 1345 | otre-Damen katedraalin rakentaminen kesti uskomattomat 182 vuotta — työ alkoi vuonna 1163 ja valmistui vasta 1345. |
| – Napoleonin kruunaus 1804 | vuonna 1804 | Katedraalissa on tapahtunut historian suuria hetkiä: vuonna 1804 Napoleon kruunasi itsensä keisariksi kirkon alttarilla, ja vuonna 1944 kenraali de Gaulle kiitti Jumalaa Pariisin vapautumisesta samassa kirkossa. |
| – tulipalo 2019 | Huhtikuussa 2019 | Huhtikuussa 2019 katedraalin vintillä syttyi tulipalo, joka tuhosi vanhan puukaton ja tornihuipun. |
| – avattiin uudelleen 2024 | joulukuussa 2024 | Katedraali korjattiin ennätysajassa, ja se avattiin yleisölle uudelleen joulukuussa 2024. |

### Orsayn taidemuseo

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – asema valmistui 1900 | valmistui vuonna 1900 | Victor Laloux'n suunnittelema Gare d'Orsay valmistui vuonna 1900 maailmannäyttelyyn, ja sinne johtava rata kulki useita kilometrejä tunnelissa Seinen eteläpuolisten rantakatujen alla. |
| – kaukojunat loppuivat 1939 | jo 1939 | Kaukojunat lakkasivat kulkemasta asemalle jo 1939, ja rakennus jäi vuosikymmeniksi vähälle käytölle. |
| – museo avattiin 1986 | joulukuussa 1986 | Museoksi se avattiin joulukuussa 1986 italialaisen Gae Aulentin suunnitelmien mukaan, ja muut Pariisin museot — Louvre ja Pompidou-keskus muiden muassa — siirsivät sinne kokoelmiaan. |

### Palais Garnier

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – suunnittelukilpailu 1860 | joulukuussa 1860 | uden oopperatalon suunnittelukilpailu julkistettiin joulukuussa 1860, ja siihen osallistui 171 kilpailijaa. |
| – Garnier voitti 1861 | toukokuussa 1861 | Voittajaksi julistettiin toukokuussa 1861 yksimielisesti nuori Charles Garnier, joka ei ollut vielä vakiinnuttanut asemaansa — viimeinen sana valinnassa oli keisari Napoleon III:lla. |
| – peruskivi 1862 | muurattiin vuonna 1862 | Peruskivi muurattiin vuonna 1862, ja talo avattiin vuonna 1875. |
| – talo avattiin 1875 | avattiin vuonna 1875 | Peruskivi muurattiin vuonna 1862, ja talo avattiin vuonna 1875. |
| – nimi vaihtui 1989 | vasta 1989 | Nimi vaihtui arkkitehdin mukaan vasta 1989, kun Opéra Bastille valmistui; nykyään Palais Garnier on Pariisin oopperan baletin koti. |

### Place des Vosges

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – vihkiäiset 1612 | vietettiin 1612 | Se rakennettiin kuningas Henrik IV:n määräyksestä hovielämän julkiseksi keskukseksi, mutta valmistui vasta kuninkaan kuoleman jälkeen — vihkiäisiä vietettiin 1612 Ludvig XIII:n ja Anna Itävaltalaisen häiden yhteydessä, eikä kuningaspari koskaan asunut siellä. |
| – nimi vaihtui 1800 | vuoteen 1800 | Nimi oli Place Royale vuoteen 1800, jolloin se vaihdettiin Vosgesin departementin mukaan. |

### Invalidit

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – kuningas määräsi 1670 | Vuonna 1670 | Vuonna 1670 kuningas määräsi rakennettavaksi heille kodin, ja Libéral Bruantin suunnittelemaan taloon muuttivat ensimmäiset asukkaat jo 1674. |
| – ensimmäiset asukkaat 1674 | jo 1674 | Vuonna 1670 kuningas määräsi rakennettavaksi heille kodin, ja Libéral Bruantin suunnittelemaan taloon muuttivat ensimmäiset asukkaat jo 1674. |
| – kiväärit viety 1789 | päivän aamuna 1789 | päivän aamuna 1789 kansanjoukko tunkeutui Invalideihin ja vei asevarastosta lähes 30 000 kivääriä. |
| – jäännökset tuotiin 1840 | Vuonna 1840 | Vuonna 1840 Napoleonin jäännökset tuotiin Saint Helenan saarelta, ja kupolin alle kaivettiin avoin krypta. |
| – keisari siirrettiin 1861 | siihen 1861 | Sarkofagi veistettiin punaisesta kvartsiitista, joka louhittiin Äänisjärven rannalta Karjalasta; keisari siirrettiin siihen 1861. |

### Sainte-Chapelle

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – jäännös ostettiin 1239 | vuonna 1239 | uningas Ludvig IX osti vuonna 1239 Konstantinopolin keisarilta Baldwin II:lta pyhäinjäännöksen, jota pidettiin Kristuksen orjantappurakruununa. |
| – kappeli vihittiin 1248 | huhtikuussa 1248 | Kappeli nousi Île de la Citén kuninkaanpalatsin pihalle muutamassa vuodessa ja vihittiin huhtikuussa 1248. |

### Grand Palais

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – maailmannäyttely 1900 | vuoden 1900 maailmannäyttelyyn | rand Palais rakennettiin vuoden 1900 maailmannäyttelyyn, ja sen tieltä purettiin vuoden 1855 näyttelyn Palais de l’Industrie. |
| – automessut 1901 | vuodesta 1901 | Hallissa pidettiin hevosnäyttelyitä, taidesalonkeja ja vuodesta 1901 automessuja, ja vuonna 1909 siellä esiteltiin lentokoneita ensimmäisessä kansainvälisessä ilmailunäyttelyssä. |
| – ilmailunäyttely 1909 | vuonna 1909 | Hallissa pidettiin hevosnäyttelyitä, taidesalonkeja ja vuodesta 1901 automessuja, ja vuonna 1909 siellä esiteltiin lentokoneita ensimmäisessä kansainvälisessä ilmailunäyttelyssä. |
| – niitti putosi 1993 | vuonna 1993 | Lasikatto ruostui ja vuoti vuosikymmeniä, ja kun katosta putosi niitti vuonna 1993, halli suljettiin yleisöltä yli kymmeneksi vuodeksi. |
| – olympialaiset 2024 | vuoden 2024 | Korjausten jälkeen se avattiin uudelleen, ja vuoden 2024 olympialaisissa lasikaton alla miekkailtiin. |

### Petit Palais

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – työ alkoi 1897 | lokakuuta 1897 | lokakuuta 1897, ja rakennus valmistui huhtikuussa 1900. |
| – valmistui 1900 | huhtikuussa 1900 | lokakuuta 1897, ja rakennus valmistui huhtikuussa 1900. |
| – kaupungin museo 1902 | Vuonna 1902 | Vuonna 1902 siitä tuli Pariisin kaupungin kuvataidemuseo. |
| – koristetyöt 1903–1925 | vuosina 1903–1925 | Koristemaalaukset ja -veistokset valmistuivat vasta vuosina 1903–1925, ja rakennus on ollut suojeltu historiallinen monumentti vuodesta 1975. |
| – suojeltu 1975 | vuodesta 1975 | Koristemaalaukset ja -veistokset valmistuivat vasta vuosina 1903–1925, ja rakennus on ollut suojeltu historiallinen monumentti vuodesta 1975. |

### Tour Saint-Jacques

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – rakennettiin 1509–1523 | 1509–1523 | our Saint-Jacques rakennettiin 1509–1523, ja se on ainoa jäljelle jäänyt osa keskiaikaisesta Saint-Jacques-de-la-Boucherien kirkosta. |
| – kaupunki osti 1836 | Vuonna 1836 | Vuonna 1836 Pariisin kaupunki osti tornin, ja 1850-luvulla sen ympärille tehtiin puisto, kun Haussmannin työt avasivat Rue de Rivolin ja Boulevard de Sébastopolin juuri tornin eteen. |
| – sääasema 1891 | vasta 1891 | Sääasema perustettiin torniin vasta 1891. |

### Saint-Eustache

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – rakennus alkoi 1532 | vuonna 1532 | aint-Eustachea alettiin rakentaa vuonna 1532, ja kirkko vihittiin vuonna 1637. |
| – vihittiin 1637 | vuonna 1637 | aint-Eustachea alettiin rakentaa vuonna 1532, ja kirkko vihittiin vuonna 1637. |
| – julkisivutyö alkoi 1754 | vuonna 1754 | Länsijulkisivu on myöhempi: sitä alettiin rakentaa uudelleen vuonna 1754. |
| – kappeli 1213 | vuodelta 1213 | Kirkon paikalla oli ennen vaatimaton kappeli vuodelta 1213, mutta seurakunta kasvoi ja kappeli kävi pieneksi. |

### Pompidou-keskus

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – rakennus alkoi 1972 | vuonna 1972 | ompidou-keskuksen rakennustyöt alkoivat vuonna 1972, ja keskus avattiin vuonna 1977. |
| – avattiin 1977 | vuonna 1977 | ompidou-keskuksen rakennustyöt alkoivat vuonna 1972, ja keskus avattiin vuonna 1977. |
| – peruskorjaus valmis 2000 | vuonna 2000 | Ensimmäinen peruskorjaus päättyi vuonna 2000. |
| – suunniteltu avaus 2030 | vuonna 2030 | Nykyään talo on suljettu uuteen peruskorjaukseen, ja sen on määrä avautua uudelleen vuonna 2030. |

### Tour Montparnasse

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – veturi seinän läpi 1895 | Lokakuussa 1895 | Lokakuussa 1895 Granvillestä tullut juna ei pysähtynyt ajoissa: veturi syöksyi raiteiden päästä aseman seinän läpi ja jäi roikkumaan nokka alaspäin kadulle. |
| – rakennettiin 1969–1973 | 1969–1973 | Tilalle nousi vuosina 1969–1973 Tour Montparnasse, 210 metriä ja 59 kerrosta. |
| – korkein vuoteen 2011 | vuoteen 2011 | Se oli Ranskan korkein rakennus vuoteen 2011 asti. |

### Bizet 1875 (`nosto-carmenin-ensi-ilta`)

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – säveltäminen alkoi 1873 | tienoilla 1873 | eorges Bizet aloitti Carmenin säveltämisen tammikuun tienoilla 1873, ja ensimmäinen näytös oli valmis siihen kesään mennessä, jona isoisäsi oli matkalla. |
| – johtaja erosi 1874 | alkuvuodesta 1874 | Lupaukset eivät riittäneet, ja de Leuven erosi teatterista alkuvuodesta 1874. |
| – ensi-ilta 1875 | maaliskuuta 1875 | maaliskuuta 1875, ja salissa istui puoli musiikki-Pariisia — Massenet, Offenbach, Delibes, Gounod. |
| – ooppera palasi 1883 | vasta 1883 | Maine tuli muualta: ensin Wien 1875, Bryssel 1876, Lontoo ja New York 1878 — Pariisiin ooppera palasi vasta 1883. |
| – sali paloi 1887 | paloi 1887 | Sekin sali paloi 1887; paikalla seisoo nyt kolmas samanniminen teatteri. |

### Kirahvi 1827 (`nosto-kirahvin-kavelymatka`)

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – kirahvi Marseilleen 1826 | lokakuuta 1826 | lokakuuta 1826 — kannessa oli sahattu reikä, josta kaula mahtui ulos. |
| – matka alkoi 1827 | toukokuussa 1827 | Kirahvi talvehti Marseillessa, ja matkaan lähdettiin toukokuussa 1827. |

### Bukinistit 1859 (`nosto-pariisin-bukinistit`)

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – kiinteät paikat 1859 | Vuonna 1859 | Vuonna 1859 kauppiaat saivat kaupungilta kiinteät myyntipaikat rantakaiteen varrelta, mutta laatikot piti silti kantaa pois joka ilta. |
| – laatikot kaiteeseen 1891 | vasta vuonna 1891 | Kaiteeseen ne sai jättää vasta vuonna 1891. |

### Lustig 1925 (`nosto-lustig-eiffel`)

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – Lustig luki jutun 1925 | Pariisissa 1925 | uijari Victor Lustig luki Pariisissa 1925 lehtijutun siitä, kuinka kallista Eiffel-tornin kunnossapito on. |

### Monet 1874 (`syvennys-pariisi-impressionistit`)

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – näyttelyanomus 1867 | turhaan 1867 | Omaa näyttelyä hylätyille oli anottu turhaan 1867 ja uudelleen 1872. |
| – yhdistys perustettu 1873 | Joulukuussa 1873 | Joulukuussa 1873 — kaksi kuukautta isoisäsi käynnin jälkeen — Monet, Renoir, Pissarro, Sisley, Berthe Morisot, Degas ja joukko muita perustivat oman yhdistyksen esittääkseen työnsä itse, ja jäseniltä odotettiin Salonista luopumista. |
| – ensimmäinen näyttely 1874 | huhtikuussa 1874 | Ensimmäinen näyttely pidettiin huhtikuussa 1874 valokuvaaja Nadarin ateljeessa, ja mukana oli kolmekymmentä taiteilijaa. |

### Piiritys 1870 (`syvennys-pariisi-kyyhkyposti`)

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – Pariisi suljettiin 1870 | syyskuussa 1870 | Kun preussilaiset sulkivat Pariisin syyskuussa 1870, viimeiset lennätinlangat katkaistiin 19. |
| – mikrofilmipatentti 1859 | vuodesta 1859 | Kyyhkyt vietiin ulos ilmapalloilla, ja valokuvaaja René Dagron — mikrofilmin patentin haltija vuodesta 1859 — tarjoutui pienentämään viestit. |

### Bastilji (`bastilji`)

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – työt käynnissä 1357 | jo 1357 | Se rakennettiin satavuotisen sodan aikana suojaamaan kaupungin itäistä sisääntuloa, Porte Saint-Antoinea: työt olivat käynnissä jo 1357 ja pääosa nousi vuodesta 1370 alkaen kahdeksantornisena kivimuurina. |
| – pääosa alkoi nousta 1370 | vuodesta 1370 | Se rakennettiin satavuotisen sodan aikana suojaamaan kaupungin itäistä sisääntuloa, Porte Saint-Antoinea: työt olivat käynnissä jo 1357 ja pääosa nousi vuodesta 1370 alkaen kahdeksantornisena kivimuurina. |
| – valtaus 1789 | päivänä 1789 | päivänä 1789 väkijoukko valtasi linnoituksen, jonka selleissä oli tuolloin enää seitsemän vankia. |

### Curie 1898 (`hetki-marie-curie-hangaari-1898`)

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – löytö ilmoitettiin 1898 | ilmoittavat vuonna 1898 | ariisissa Marie ja Pierre Curie ilmoittavat vuonna 1898 löytäneensä kaksi uutta alkuainetta, poloniumin ja radiumin, ja todistavat sen sitten vuosia vuotavassa vajassa keittämällä tonneittain kaivosjätettä. |
| – radiumkloridi 1902 | vuoteen 1902 | Työ vie vuoteen 1902, jolloin tonnista malmia on eristetty kymmenesosagramma radiumkloridia. |
| – fysiikan Nobel 1903 | Vuonna 1903 | Vuonna 1903 hän jakaa fysiikan Nobelin Pierren ja Henri Becquerelin kanssa, ensimmäisenä naisena, ja vuonna 1911 saa kemian palkinnon yksin. |
| – kemian Nobel 1911 | vuonna 1911 | Vuonna 1903 hän jakaa fysiikan Nobelin Pierren ja Henri Becquerelin kanssa, ensimmäisenä naisena, ja vuonna 1911 saa kemian palkinnon yksin. |

### Lavoisier 1780 (`hetki-lavoisier-laboratorio-1780`)

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – oppikirja 1789 | Vuonna 1789 | Vuonna 1789 ilmestyy ensimmäinen moderni kemian oppikirja, jossa on kolmetoista Marie-Annen piirrosta. |
| – Lavoisier mestattiin 1794 | toukokuuta 1794 | toukokuuta 1794, vallankumous mestaa Lavoisierin, koska hän on rikastunut veronkantajana. |

### Pasteur 1862 (`hetki-pasteur-pullot-1862`)

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – voitti kiistan 1862 | vuonna 1862 | ouis Pasteur osoittaa Pariisissa joutsenkaulapulloillaan, ettei elämä synny itsestään mätänevästä aineesta vaan näkymätön elämä tulee ulkoa, ja voittaa kiistan ratkaisijalle luvatun palkinnon vuonna 1862. |
| – pastörointipatentti 1865 | vuonna 1865 | Samaan aikaan hän on osoittanut, että käyminen on elävien mikrobien työtä, ja vuonna 1865 hän patentoi viinin kuumennuksen, jota nyt kutsutaan pastöroinniksi. |

### Eiffel-torni 1888 (`hetki-eiffel-torni-1888`)

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – torni nousee 1888 | elokuussa 1888 | ariisin Champ de Marsilla kootaan elokuussa 1888 Eiffel-tornia vuoden 1889 maailmannäyttelyyn: toinen kerros on valmis, ja kolmisensataa rakentajaa niittaa rautaristikkoa yhä ylemmäs. |
| – torni valmis 1889 | maaliskuuta 1889 | maaliskuuta 1889 maailmannäyttelyyn — ja jää, koska sen huipulle sopii radioantenni. |

### Bastilji 1789 (`hetki-ranskan-vallankumous-bastilji-1789`)

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – valtaus 1789 | heinäkuuta 1789 | heinäkuuta 1789 Bastiljin linnoitukseen hakemaan sinne siirrettyä ruutia, ja illalla kuvernööri de Launay antautuu. |

### Lumière 1895 (`hetki-lumiere-elokuva-1895`)

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – Lumièren näytös 1895 | joulukuuta 1895 | joulukuuta 1895 Pariisin Grand Cafén kellarisalissa ensimmäisen maksullisen elokuvanäytöksen, ja muutama kymmenen katsojaa näkee kankaalla liikkuvan kuvan. |

### Metro 1900 (`nosto-guimardin-metro`)

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – metro avattiin 1900 | heinäkuuta 1900 | heinäkuuta 1900. |
| – valtaosa suojeltiin 1978 | vuonna 1978 | Jäljellä on 88, ja valtaosa niistä suojeltiin vuonna 1978. |

### Piaf ja Django (`nosto-pariisi-soi`)

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – Piaf syntyi 1915 | joulukuussa 1915 | dith Piaf syntyi Bellevillessä joulukuussa 1915. |
| – Piaf löydettiin 1935 | kadulta vuonna 1935 | Yökerhon omistaja Louis Leplée kuuli hänet kadulta vuonna 1935 ja antoi lempinimen la Môme Piaf — piaf on pariisilaista puhekieltä ja tarkoittaa varpusta. |
| – Djangon vaunu paloi 1928 | yönä 1928 | päivän yönä 1928 vaunussa syttyi tulipalo: kynttilä kaatui selluloidikukkien päälle. |
| – Hot Club syntyi 1934 | Vuonna 1934 | Vuonna 1934 hän perusti Pariisissa yhtyeen Quintette du Hot Club de France. |

### Patonki 1994 (`nosto-pariisin-patonki`)

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – kilpailun alku 1994 | vuodesta 1994 | aupunki on järjestänyt vuodesta 1994 kilpailun parhaasta perinteisestä patongista, ja säännöt ovat tarkat: leivän pituudelle ja painolle on omat rajansa. |

### Kaulanauha 1785 (`nosto-pariisin-vuosisadat`)

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – nauha ostettiin 1785 | vaihteessa 1785 | Rohan osti nauhan tammi–helmikuun vaihteessa 1785 hintaan 1,6 miljoonaa livreä ja luovutti sen huijarin lähetille; kivet pilkottiin ja myytiin Lontoossa ja Pariisissa. |
| – Rohan vapautettiin 1786 | Rohanin 1786 | Oikeus vapautti Rohanin 1786, mutta kuningattaren maine ei toipunut. |
| – kirjeet akatemialle 1867 | esitteli 1867 | Chasles maksoi kokoelmasta noin 140 000 frangia ja esitteli 1867 tiedeakatemialle kirjeitä, joiden mukaan Blaise Pascal olisi keksinyt painovoimalain ennen Isaac Newtonia. |
| – väärentäjän tuomio 1870 | helmikuussa 1870 | Chasles piti kokoelmastaan kiinni vuosia, mutta väärentäjä tuomittiin helmikuussa 1870 kahdeksi vuodeksi vankeuteen. |

### Tornin nimet 2026 (`nosto-pariisin-72-nimea`) — lisäkortti

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – naisten lista julki 2026 | tammikuussa 2026 | Siksi tammikuussa 2026 julkistettiin toinen 72 nimen lista, pelkkiä naistutkijoita, jotka on tarkoitus kaivertaa miesten nimien yläpuolelle, kunhan kolme akatemiaa on antanut lausuntonsa. |

## Kortit ilman riviä
- Vrain-Lucas
- Tuileries'n palatsi
- Notre-Dame 2019

## KK:n päätökset 17.10 ja data-PR (SK 17.11.2026)
KK luki kaikki rivit ja hyväksyi ne datavaiheeseen näillä muutoksilla, jotka on tehty:
1. Kolme selitettä selvemmäksi: Eiffel 1909 "piti purkaa", Luxembourgin puisto 2012 "patsas Orsayhin", Piaf ja Django 1928 "Djangon vaunu paloi".
2. Yhden lähteen rivit jäävät (Riemukaari 1920, Saint-Eustache 1637, Saint-Jacques 1891, Bizet 1874, Kaulanauha 1870, Les Halles 1183, Grand Palais 2024); isoisän 1873-rivit jäävät; 11 poistettua pysyvät poissa.
3. Mukana 45 nostoa, Garnier viisi riviä; Tuileries ja Vrain-Lucas ilman rivejä.
4. Jaettu nosto-tunnus: Notre-Dame 2019 -lisäkortille ei laiteta rivejä (vuosi 2019 on jo Notre-Damen rivissä "tulipalo"), jotta sama vuosi ei esiinny kahdesti; Eiffel-torni (1889, 1909) ja Tornin nimet 2026 (2026) kantavat omat eri vuotensa. **Muoto sovittava PK:n kanssa**, jos nosto lukee molemmat kortit samaan lappuun: jokaisella kortilla on oma lista, ja kokonaisuus pysyy ≤ 5 riviä ja sama vuosi vain kerran.
5. Tekstierot eivät estä rivejä; korjauslista seuraavaan tekstikierrokseen (ei äänityksiä nyt): Lumière "ensimmäinen maksullinen" (Skladanowsky 1.11.1895) ja Piaf "syntyi Bellevillessä" (Hôpital Tenon) korjattava; Lavoisier 1780 (ei dateerausta: mitä teksti väittää vuodesta?); Trocadéro 1876–1878 (rivi on 1878). Kaulanauha 1,6 milj., Metro 88 ja Panthéon 1758 saavat jäädä.

**Data-PR:** kenttä `vuodet` lisätty tekstin perään tiedostoihin `js/packs/nahtavyysjutut.js` (Pariisi), `monumentit-eurooppa.js` (7 kadonnutta) ja `historian-hetket.js` (6 hetkeä; samat rivit myös nahtavyysjutut-kopiossa). Muita kenttiä ei muutettu (diffissä vain lisättyjä rivejä). Tarkistus: `node tools/sisalto/vuosiehdokkaat.mjs --tarkista` kaikki kunnossa; `--karsi-luettelo` poisti luettelosta 43 nostoa; koko `npm test` 5944 ok, 0 fail.
