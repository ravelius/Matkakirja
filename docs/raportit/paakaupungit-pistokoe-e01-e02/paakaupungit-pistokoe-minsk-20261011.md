# Pääkaupunkilehden pistokoe: MINSK (erä e01), 11.10.2026

Tarkistaja: Sonnet-agentti. Aineisto: paakaupungit-pilvi/e01/minsk/ (sisalto.json, faktapohja.md, kuvat.md, tarkistus.md, konteksti.json). Menetelmä: jokainen väite vähintään kahdella itsenäisellä lähteellä (en-Wikipedia + toinen: ESBE/Brockhaus-Efron, Belstat, Britannica-tyyppinen hakuteos, Minskin/Valko-Venäjän matkailu- ja kulttuuriviranomaiset, museo- ja kirjastosivut, Wikipedia-perheen ulkopuoliset venäjänkieliset hakuteokset ja uutissivut). Kun pelkkä en-Wikipedia (tai sen peilit) oli ainoa lähde, väite on merkitty EPÄTARKKAKSI, vaikka se ei olisi todistettavasti väärin. Korjauksia ei ole tehty aineistoon.

Hakutapa-huomiot: euroradio.by ei vastannut (DNS), ru.ruwiki.ru 401, zerkalo.io ja booksite.ru (Brockhaus HEE) 403, demoscope.ru-taulukko ei ollut luettavissa (sekavat merkistöt). Näiden sisältö on merkitty "hakutuloksen kautta". WebSearch-yhteenvedot ovat hakukoneen tiivistelmiä, ei alkuperäislähteitä; ratkaisevissa kohdissa (maailmanpyörän korkeus, metron päivä, Punaisen kirkon vihkimispäivä) avattiin lisäksi alkuperäinen sivu.

## Yhteenveto

Väitteet (26 väitettä/väiteryhmää, joista osa kattaa useita JSON-kohtia; kysymykset Q1-Q5 mukana):

- OIKEIN 16 (V1, V2, V10, V13, V15, V16, V19, V20, V21, V22, V24, V26 sekä kysymykset Q1, Q2, Q3, Q5)
- EPÄTARKKA 14 (V3 [sis. Q4], V4, V5, V6, V7, V8, V9, V11, V12, V14b, V17, V18, V23, V25)
- VIRHE 1 (V14a: Gorki-puiston maailmanpyörä on 54 m, ei 56 m)

Kuvat (17 tarkistettua Commons-tiedostoa; 10 katsottu silmin, 7 vain metatiedoin):
- Olemassaolo, lisenssi, tekijä: OIKEIN 17/17.
- Kuvateksti vs. sisältö: OIKEIN 14 (sis. seitsemän vain metatiedoin tarkistettua), EPÄTARKKA 2 (K1 asema, K4 raatihuonepiirros), VIRHE 1 (maailmanpyörän kuvateksti 56 m).
- Yhtään PD-kuvaa ei ole tekijältä, joka olisi kuollut < 70 v sitten. Tunnistettavia kasvoja, väkivaltaa tai herkkää sisältöä ei ole. Näkyvää tekstiä: K1 (asemakyltti kyrillisin kirjaimin), opas 2 (metroaseman nimi), opas 3 (pyörän "МИРЪ"-kyltti), T3 (kirjan sivu).

Toistuva virhetyyppi (yksi rivi): LUVUT JA TARKAT PÄIVÄMÄÄRÄT kopioitu sellaisenaan yhdestä en-Wikipedia-artikkelista ilman toista lähdettä (pyöristetyt tilastot, "ensimmäinen"-vuodet, metron/kirkon vihkimispäivät, pyörän korkeus), lisäksi pieni määrä valikoivaa poisjättöä (1897 kielijakauma ilman enemmistökieltä).

Pilviagentin oma tarkistus.md löysi 21 asiaa, mutta nämä jäivät läpi (kaikki löytyvät vain kun vertaa Wikipedian ulkopuoliseen lähteeseen): maailmanpyörän 56 m, metron 29./30.6., 1860 väkiluku, 1897 kielijakauma ilman jiddišiä, Punaisen kirkon vihkimispäivä ja peruskivi, Libava–Romny-radan valmistumisvuosi 1874, vesijohto 1872/1874, sodanedeltä "300 000", kirjastojen/elokuvateattereiden lukumäärä, pyöräkysely.

## Taulukko

| # | Väite (lyhyt) | Polku sisalto.json:ssa | Tulos |
|---|---|---|---|
| V1 | Asukasluku 1 995 091 (1.1.2026, Belstat), noin viidennes maasta | $.artikkeli.intro | OIKEIN |
| V2 | 1067 / Nemihan taistelu / perustamispäivä 3.3.1067 | $.artikkeli.intro; $.kysymykset[2]; $.kaupunkilehti[0].nostot[1].teksti | OIKEIN |
| V3 | Moskova–Varsova-rata 1871; 1873 "rakennettiin" Romny–Libava; kysymys "1873 valmistuneen radan" | $.artikkeli.intro; $.kysymykset[3]; $.kaupunkilehti[0].nostot[0].teksti | EPÄTARKKA |
| V4 | Kunnallinen vesijohto 1872 | $.artikkeli.intro | EPÄTARKKA |
| V5 | Metro avattiin 30.6.1984, Neuvostoliiton yhdeksäs | $.tiedot[0] | EPÄTARKKA |
| V6 | Ennen sotaa noin 300 000 asukasta; 1944 noin 50 000; 80 % taloista raunioina; 1,5 milj. 1986 | $.artikkeli.intro; $.kaupunkilehti[0].nostot[2].teksti | EPÄTARKKA |
| V7 | 1860 asukkaita 27 000 | $.kaupunkilehti[0].nostot[3].teksti | EPÄTARKKA |
| V8 | Suurpalo 30.5.1835 levisi luostarista koko keskustaan | $.kaupunkilehti[0].nostot[3].teksti; $.nahtavyydet["Pyhän Hengen katedraali"].teksti | EPÄTARKKA |
| V9 | 1897: venäjä 25,5 %, puola 11,4 %, valkovenäjä 9,0 % | $.kaupunkilehti[1].nostot[2].teksti | EPÄTARKKA |
| V10 | Pyhän Hengen katedraali 1633–1642, vihitty 22.10.1870, päätuomiokirkko | $.nahtavyydet["Pyhän Hengen katedraali"] | OIKEIN |
| V11 | Punainen kirkko: vihitty 20.9.1910; peruskivi 1905–1908 | $.nahtavyydet["Punainen kirkko"].teksti ja .kuvat[0].selite | EPÄTARKKA |
| V12 | Kansalliskirjasto 73,6 m, 23 kerrosta (muu OK) | $.kaupunkilehti[1].nostot[1]; $.…matkailu.parasta[3] | EPÄTARKKA (pieni) |
| V13 | Voitonaukion pylväs 38 m, 1954, 3 m ritarikunta, ikuinen tuli 3.7.1961 | $.nahtavyydet.Voitonaukio | OIKEIN |
| V14a | Gorki-puiston maailmanpyörä 56 m | $.tiedot[2]; $.…jaksot[2].teksti ja .kuva.selite; $.nahtavyydet["Gorki-puisto"].teksti ja .kuvat[0].selite | VIRHE |
| V14b | Gorki-puisto "perustettiin 1800" | samat + $.…matkailu.parasta[4] | EPÄTARKKA |
| V15 | Kyynelten saari 1988–1996, vihitty 3.8.1996, 771 / 30 000 | $.nahtavyydet["Kyynelten saari"] | OIKEIN |
| V16 | Neitsyt Marian katedraali 1710, 1951 tornit, 1993 palautus | $.nahtavyydet["Neitsyt Marian arkkikatedraali"] | OIKEIN |
| V17 | "kunnostettu 1700-luvun raatihuone" | sama, viimeinen virke | EPÄTARKKA |
| V18 | Kirjasto 1836, palokunta 1837, lehti 1838, teatteri 1844; tehtävän oikea vastaus 1836 | $.kaupunkilehti[1].tehtava; nostot[0].teksti | EPÄTARKKA |
| V19 | Svislač 327 km, Berezinan sivujoki | $.kysymykset[1].fact; $.valokuva.lyhyt | OIKEIN |
| V20 | Oopperatalo 1939; "säilyi verraten ehjänä" | $.kaupunkilehti[1].nostot[3].teksti | OIKEIN (vuosi), lause varmistamatta |
| V21 | Zaslawyen tekojärvi 1956, ~5 km luoteisreunasta | $.…jaksot[2].teksti | OIKEIN |
| V22 | Lentoasema 1982, 37–42 km | $.…jaksot[0] | OIKEIN |
| V23 | 11 teatteria, 16 museota, 20 elokuvateatteria, 139 kirjastoa | $.kaupunkilehti[1].johdanto; nostot[0].teksti | EPÄTARKKA |
| V24 | Polatsk 980, Liettua 1242, Magdeburg 1499, Venäjä 1793 | $.artikkeli.teksti | OIKEIN (huom.) |
| V25 | 2019 kysely: 811 000 polkupyörää, 770 000 autoa | $.tiedot[1] | EPÄTARKKA |
| V26 | Kolminaisuuden esikaupunki "1100-luvulta" | $.nahtavyydet["Kolminaisuuden esikaupunki"].aika | OIKEIN |
| Q1 | Minsk = Valko-Venäjän pääkaupunki | $.kysymykset[0] | OIKEIN |
| Q2 | Svislač, hintti Yläkaupunki ja Gorki-puisto | $.kysymykset[1] | OIKEIN |
| Q3 | Nemihan taistelu, 1067 | $.kysymykset[2] | OIKEIN |
| Q4 | Romny–Libava "valmistui 1873" | $.kysymykset[3] | EPÄTARKKA (sis. V3) |
| Q5 | Szymon ja Helena; vihitty 1910 | $.kysymykset[4] | OIKEIN |

## Perustelut ja korjatut lauseet

### V1, V2, V10, V13, V15, V16, V19, V20-V22, V24, V26 ja Q1–Q3, Q5: OIKEIN

- V1: Belstat, Minsk 1 995 091 (1.1.2026; edellisvuonna 1 996 730) vahvistettu Belstatin taulukosta, Nasha Nivan Belstat-pohjaisesta listasta ja Reform.newsista (hakutuloksen kautta); koko maa 9 056 080 -> 22 %, "noin viidennes" kelpaa.
- V2: en-Wikipedia (Minsk, Timeline of Minsk): ensimmäinen maininta 1067, "3.3.1067" kaupungin virallinen perustamispäivä; Brockhausin ja Efronin hakuteos (ESBE, ru.wikisource) antaa vanhemman laskennan 1066, mikä ei ole virhe (kronikan vuosi 6575 muunnettu).
- V10: en-Wikipedia (1633–1642, 1687, 1741, 30.5.1835, 1852, 1860, 22.10.1870, ikoni 1500, 1961); azbyka.ru (hakutuloksen ja haun kautta): 1633–1642, 1741, 1860 ortodoksiseksi, päävalaistus 22.10.1870 ja "главный храм белорусского экзархата" (päätuomiokirkko). Vain 1961 on yhden lähteen varassa (azbyka: "kun Pietarin ja Paavalin katedraali suljettiin").
- V13: sb.by (Belorusian valtion lehti): "38 metriä jalustasta ritarikuntaan, 41 metriä ritarikunnan kanssa", pystytetty 1954, ikuinen tuli 1961; PDF-luettelo "Pamiatniki Velikoj Otechestvennoj vojny v Belarusi" (bgam.by, hakutuloksen kautta): ikuinen tuli 3.7.1961 monumentin juurella. Huom.: matkaoppaat antavat 32, 38 ja 40 m; sb.by:n 38 m + 3 m ritarikunta täsmää tekstiin. Soikea muoto: en-Wikipedia 1984, sb.by "1985" (virhe ei välttämätön, mutta ks. yleinen vaihtelu).
- V15: cyclowiki / znanierussia / sputnik8 (hakutuloksen kautta): rakennus alkoi 1988, avajaiset 3.8.1996, projekti kuvanveistäjä Juri Pavlovin ryhmä (arkkitehti on siis ryhmässä, J. Pavlov on kuvanveistäjä, ei arkkitehti: lause "kuvanveistäjä J. Pavlovin johdolla" on oikein); 771 nimeä kappelin tauluissa ja yli 30 000 osallistujaa; yksi lähde antaa 789 kuollutta, joten luku on laskentatavasta riippuva.
- V16: en-Wikipedia + Jesuit College in Minsk + Minsk Churches & Their Stories + my-places.by (hakutuloksen kautta): 1710 (rakennusaika 1700–1710), 1797 palo, 1934 sulku, tornit 1951, palautus 1993. Yksi lähde mainitsee tornit vasta 1732; ei vaikuta tekstiin.
- V19: en-Wikipedia (Svislach (Berezina)): 327 km, Berezinan oikeanpuoleinen sivujoki; booksite.ru:n neuvostoaikainen hakuteos (hakutuloksen kautta) vahvistaa "Berezinan oikea sivujoki"; pituus 327 km vahvistuu OSM:n Belarus-jokitaulukon ja ruwikin kautta hakutuloksessa. Lause on turvallinen (ei Mustameri-väitettä).
- V20: oopperatalo avattiin 1939 (10.3.1939 ensi-ilta; tripster ja inyourpocket hakutuloksen kautta, en-Wikipedia). Lause "säilyi verraten ehjänä" on kuitenkin varmistamaton: yksi hakutulos väitti, että pommi osui katsomoon ja talo ryöstettiin miehityksen aikana (ei vahvistettu toisella haulla), en-Wikipedia ei kerro sodan tuhoista. Korjaus ehdotettu lopussa (valinnainen).
- V21: en-Wikipedia (Zaslawskaye reservoir): rakennettu 1956, "vain 5 km kaupungin luoteisreunasta"; Diplomacy Journal (hakutuloksen kautta) 5 km keskustasta; oppaat antavat 10 km. Nykyinen sanamuoto "noin viiden kilometrin päässä kaupungin luoteisreunasta" on oikein.
- V22: en-Wikipedia: Minsk National Airport 42 km itään, aloitti 1982; kupi.com ja oppaat 1982; lentohaku antaa 45 km. Nykyinen "noin 40 km" ja haarukka 37–42 on kohtuullinen.
- V24: Magdeburg 1499, venäläiseksi 1793: en-Wikipedia + ESBE ("В 1499 г. Казимир даровал городу магдебургское право"; "В 1793 г. М. отошел к России") + Timeline of Minsk. Polatskin 980 ja Liettua 1242 ovat vain Wikipediassa ja 1242 on historiankirjoituksessa perinteinen mutta kiistanalainen ajoitus; suositus: "Liettuan suuriruhtinaskuntaan 1200-luvun puolivälissä (perinteisesti 1242)". Ei pakollinen.
- V26: arkeologian mukaan alue asutettu 1100–1200-luvulla (my-places.by, inyourpocket, en-Wikipedia Tatarskaja Slabada hakutuloksen kautta); 1390 on vain kirkon perustamisvuosi; 1428 koskee viereistä Tatarskaja Slabadaa. Nykyinen "1100-luvulta" kelpaa; sisaltotekstin Tatarskaja Slabada 1428 -lause on oikein.
- Q1–Q3, Q5: kysymykset ja väärät vaihtoehdot oikein; vihjeet eivät paljasta; Q5: Szymon ja Helena (en-Wikipedia + msj.by: poika Simon 12-vuotiaana, tytär Helena 19-vuotiaana kuoli).

### V3: Rautatiet 1871 / 1873: EPÄTARKKA (+ Q4)

Lähteet: en-Wikipedia "Libava–Romny Railway": suunnittelu 1869, hyväksyntä 15.12.1871, rakennus osissa 1871–74; Naujoji Vilnia–Minsk avattiin tammikuussa 1873 (26.1.), Minsk–Bobruisk syyskuussa 1873, Bakhmach–Romny viimeisenä 27.7.1874. ESBE (Brockhaus-Efron): kaupunki "Moskova–Brest- ja Libava–Romny-rautateiden varrella". En-Wikipedia (Minsk railway station): asema rakennettu 1873 nimellä Vilenski vakzal (infoboksissa 1871), puurakennus purettu 1890.

Ongelmat: (a) "1873 rakennettiin rata Romnysta Libavaan" ja Q4 "1873 valmistuneen radan" ovat väärin, koska koko rata valmistui 1874 ja Minskin kohdan avasivat tammikuussa 1873; (b) Moskovan–Minskin–Brestin radan nimi oli Moskova–Brest (ESBE; en-Wikipedia Minsk sanoo "Moscow–Warsaw", mikä viittaa jatkoyhteyteen Varsovaan).

Korjattu lause ($.artikkeli.intro): "Moskova–Brest-rata kulki kaupungin kautta vuodesta 1871, ja tammikuussa 1873 avattiin Libava–Romny-radan Vilnan ja Minskin välinen osa; koko rata Romnyyn valmistui 1874."
Korjattu lause ($.kaupunkilehti[0].nostot[0].teksti): "Isoisän matkavuonna 1873 Minskistä oli tulossa ratasolmu. Moskova–Brest-rata kulki kaupungin kautta jo vuodesta 1871, ja tammikuussa 1873 avattiin uuden Libava–Romny-radan Vilnan ja Minskin välinen osa; rata Itämeren rannalla sijaitsevasta Libavasta eli nykyisestä Liepājasta Romnyyn valmistui kokonaan 1874."
Korjattu Q4 ($.kysymykset[3]): q: "Moskova–Brest-radan (1871) lisäksi Minskin kautta kulki 1870-luvulla rakennettu toinen rata, jonka Minskin osuus avattiin 1873. Mitkä kaksi kaupunkia tämä rata yhdisti?" fact: "Libava–Romny-rata rakennettiin 1871–1874; Minskin kohdan avattiin tammikuussa 1873, ja se risteää Moskova–Brest-radan kanssa Minskin asemalla."

### V4: Vesijohto 1872: EPÄTARKKA

en-Wikipedia (Minsk, Timeline of Minsk): 1872. Venäjänkielinen Minskin yleiskuvaus (hakutuloksen kautta, citymurmansk.ru-docx): "водопровод (1874)". Lähteet ristiriidassa kahdella vuodella; kolmatta lähdettä ei löytynyt.
Korjattu lause ($.artikkeli.intro): "Kunnallinen vesijohto otettiin käyttöön lähteiden mukaan 1870-luvun alkupuolella (1872 tai 1874)." (Tai poista maininta; 1873-ajan uskottavuutta se ei tarvitse.)

### V5: Metro 30.6.1984: EPÄTARKKA

en-Wikipedia: johdannossa 29.6.1984, historiaosiossa 30.6. Nasha Niva (hakutuloksen kautta): juhlallinen avaus ja ilmainen ajo pe 29.6. Lenin-aukiolla; säännöllinen maksullinen liikenne alkoi 30.6.; Valko-Venäjän viestintäministeriön postimerkkiselite (hakutuloksen kautta) sanoo samaa. Structurae ja kartta- ja matkasivut käyttävät 29. ja 30. kumpaakin. "Yhdeksäs metro Neuvostoliitossa": en-Wikipedia ja Structurae vahvistavat; TMH:n yritysteksti myös (ei itsenäinen).
Korjattu lause ($.tiedot[0]): "Minskin metro avattiin kesäkuun lopussa 1984 (juhlallinen avaus 29.6., säännöllinen liikenne 30.6.), ja se oli Neuvostoliiton yhdeksäs metro."

### V6: Sodan luvut: EPÄTARKKA

en-Wikipedia (Minsk): ennen sotaa "noin 300 000", mutta saman artikkelin taulukossa 1939: 238 948 (muiden lähteiden mukaan 238 772). Hakutuloksen kautta: 1940 noin 250 000, tammikuu 1941 noin 300 000; vapautuksen aikaan 40 000–50 000 (lähteet 30 000–50 000). "80 % taloista": en-Wikipedia ja CIA Reading Room toistavat; Valko-Venäjän lähde (belarusdigest, hakutuloksen kautta) kertoo luvun olevan neuvostoaikainen virallinen arvio, ja riippumaton historioitsija esittää saksalaiseen karttaan perustuen 30–40 %. Lisäksi "1,5 miljoonaa 1986" ei löytynyt kolmannesta lähteestä (1980: 1,3; 1990: 1,6); "miljoona 1972" kyllä (myfin.by ja muut hakutuloksessa).
Korjattu lause ($.kaupunkilehti[0].nostot[2].teksti): "Vuoden 1939 väestönlaskennassa Minskissä oli 238 772 asukasta, ja vuonna 1941 asukkaita oli arviolta noin 300 000. Kaupunki vapautettiin 3.7.1944, ja silloin tehtaat, kunnalliset rakennukset, voimalaitokset, sillat ja useimmat tiet olivat raunioina; neuvostoaikaisen arvion mukaan noin 80 % taloista oli tuhoutunut. Asukkaita oli jäljellä arviolta 40 000–50 000. … Väkiluku ylitti miljoonan 1972." (poista "ja 1,5 miljoonaa 1986")
Korjattu lause ($.artikkeli.intro): "vapautuksen aikaan asukkaita oli arviolta 40 000–50 000, ja suuri osa taloista oli raunioina."

### V7: 1860 asukasluku: EPÄTARKKA

en-Wikipedia (Minsk, Timeline): noin 27 000. ESBE (ru.wikisource; luettu): "В 1860 г. в нем было 30 тыс. жителей". Lähteet eroavat.
Korjattu lause ($.kaupunkilehti[0].nostot[3].teksti): "Kaupunki kasvoi, ja 1860 asukkaita oli lähteistä riippuen 27 000–30 000."

### V8: Palo 30.5.1835: EPÄTARKKA

en-Wikipedia (Holy Spirit Cathedral): "most destructive fire on May 30, 1835". Itsenäiset hakutulokset (inyourpocket, my-places.by, tripster): palo 1835 tuhosi Pietarin ja Paavalin edeltävän kirkon keskustassa ja vaurioitti bernardiiniluostaria; päivää 30.5. tai "levisi koko keskustaan" ei vahvista kukaan muu. ESBE ei mainitse 1835 vaan 1881 (noin 1 000 taloa).
Korjattu lause: "Pahin niistä riehui 1835 ja tuhosi osan keskustan rakennuksista." ($.kaupunkilehti[0].nostot[3].teksti); "suurpalo 1835 vaurioitti myös luostarirakennuksia" ($.nahtavyydet["Pyhän Hengen katedraali"].teksti).

### V9: 1897 kieliluvut: EPÄTARKKA (harhaanjohtava poisjättö)

en-Wikipedia (Minsk, Demographics): venäjä 25,5 %, puola 11,4 %, valkovenäjä 9,0 %; samassa osiossa juutalaisia 52 % (47 562 / 90 912). En-Wikipedian ulkopuolelta: JewishGen/Haifa Dolgin Center -hakutulokset: 47 562 juutalaista = 52,3 % (väestönlaskennassa "juutalainen" oli kieliluokka); ESBE 1896: 43 658 / 83 880 = 52 %. Itsenäistä kolmen prosenttiluvun vahvistusta ei löytynyt (demoscope-taulukko ei auennut). Kappale "Monta kieltä samoilla kaduilla" jättää kuitenkin kaupungin enemmistökielen (jiddiš) kokonaan pois, mikä antaa väärän kuvan.
Korjattu lause ($.kaupunkilehti[1].nostot[2].teksti): "Vuoden 1897 väestönlaskennassa noin puolet asukkaista (52 %) oli juutalaisia, ja jiddiš oli kaupungin yleisimpiä kieliä; venäjän äidinkielekseen ilmoitti 25,5 prosenttia, puolan 11,4 ja valkovenäjän 9,0 prosenttia (lähteenä en-Wikipedia)." Varmempi vaihtoehto: poista prosenttiluvut ja jätä virke "Vuoden 1897 väestönlaskennassa noin puolet minskiläisistä oli juutalaisia."

### V11: Punainen kirkko: EPÄTARKKA

Vahvistettu: arkkitehdit Tomasz Pajzderski ja Władysław Marconi (en-Wikipedia, structurae; msj.by lisää Henryk Gaj'n apulaisena), tiilet Częstochowasta ja kattotiilet Włocławekista (en-Wikipedia, intercity.pl), rahoittaja Woyniłłowicz ja lapset Szymon ja Helena (kaikki), kirkko suljettiin 1932 ja palautettiin 1990 (en-Wikipedia).
Ongelmat: (a) Vihkimispäivä: en-Wikipedia ja Structurae 20.9.1910 (avattu yleisölle 21.12.1910), mutta msj.by (alkuperäinen sivu luettu): 20.9.1910 vahvistettiin seurakunta, kirkon vihkimisjuhla oli 21.11.1910. (b) Peruskivi: en-Wikipedia 1905; msj.by 25.9.1906; muut lähteet rakennusajaksi 1906–10 ja 1908–10. "1905–1908" ei saa tukea kolmannesta lähteestä.
Korjattu lause ($.nahtavyydet["Punainen kirkko"].teksti): "…peruskivi muurattiin lähteistä riippuen 1905 tai 1906, ja kirkko vihittiin 1910." Kuvateksti ($.nahtavyydet["Punainen kirkko"].kuvat[0].selite): "Punainen kirkko vihittiin 1910 Pyhien Simeonin ja Helenan kirkkona." ($.…aika "1905–1910" voi jäädä.)

### V12: Kansalliskirjasto: EPÄTARKKA (pieni)

Vahvistettu useasta lähteestä (en-Wikipedia; NLB-lehdistöaineisto ja Structurae hakutuloksen kautta): avattu 16.6.2006, rakennettu marraskuu 2002 – tammikuu 2006, arkkitehdit Michail Vinahradau ja Viktar Kramarenka, rombikuboktaedri, noin 2 000 lukijapaikkaa ja 500-paikkainen sali. Korkeus ja kerrokset: Wikipedia 73,6 m ja 23 krs; Skyscraper Center 73,7 m ja 22 tasoa (Atlas Obscura, Architectuul: 22 / 72 m); kokoelma 8–10 milj. nimekettä.
Korjattu lause: "Päärakennus on rombikuboktaedrin muotoinen monitahokas, jonka korkeus on noin 73 metriä." (Kerrosten määrä poistetaan tai kirjoitetaan "22–23 kerrosta"; näköalatasanteen "ylimmässä kerroksessa".) Polut: $.kaupunkilehti[1].nostot[1].teksti ja .selite; $.…matkailu.parasta[3].selite.

### V14: Gorki-puisto

V14a VIRHE: "56 metriä korkea maailmanpyörä" on vain en-Wikipediassa. Kaikki muut luetut tai haetut lähteet antavat 54 m: sputnik8 ("колесо обозрения высотой 54 метра", luettu), hata.by ("Высота колеса обозрения составляет 54 м", luettu), kupibilet, tuda-suda, findit.city, vedaj.by (hakutuloksen kautta); halkaisija 51 m, asennettu 2003/2004 (20-vuotisjuhla 2024, mail.ru luettu).
Korjattu lause: "56 metriä korkea" -> "54 metriä korkea" kaikissa neljässä kohdassa: $.tiedot[2] ("Gorki-puiston maailmanpyörä on 54 metriä korkea…"); $.kaupunkilehti[0].matkailijalle.artikkeli.jaksot[2].teksti ja .kuva.selite; $.nahtavyydet["Gorki-puisto"].teksti ja .kuvat[0].selite.
V14b EPÄTARKKA: planetabelarus.by (luettu): "заложен в 1800 году и через пять лет открыт" (avattu 1.5.1805, sputnik8 luettu ja zerkalo), kupibilet 1801. En-Wikipedia sanoo "established 1800".
Korjattu lause: "Gorki-puisto laadittiin 1800 ja avattiin 1805 nimellä Kuvernöörin puutarha." ($.nahtavyydet["Gorki-puisto"].teksti); $.…matkailu.parasta[4].selite: "Vuosina 1800–1805 perustettu puisto, jossa on maailmanpyörä." ($.…aika "1800" -> "1800–1805"; lause "se oli olemassa isoisän matkavuonna 1873" pysyy oikeana.)

### V17: "kunnostettu 1700-luvun raatihuone": EPÄTARKKA

Commons (Zedlik): "Rebuilt in 2004"; en-Wikipedia (Minsk) kuvateksti: "Old Town Hall (rebuilt in 2003)". Vanha raatihuone hävitettiin keisarikunnan aikana (fi-Wikipedia, per tarkistus.md), joten nykyinen on uudelleenrakennus eikä kunnostus.
Korjattu lause ($.nahtavyydet["Neitsyt Marian arkkikatedraali"].teksti): "Siitä näkee uudelleen rakennetulle vanhalle raatihuoneelle."

### V18: Kirjasto 1836 ja kysymys: EPÄTARKKA

en-Wikipedia (Minsk, Timeline of Minsk): kirjasto 1836, palokunta 1837, lehti 1838, teatteri 1844. Itsenäinen tuki: lehti 1838 ja teatteri 1844 (kaksi hakutulosta, tosin yksi on Wikipedia-peili; lisäksi yleishistoria: kuvernementtilehdet perustettiin keisarin määräyksellä 1837 ja ilmestyivät 1838); kirjastolle löytyi inyourpocketista vain "yleinen kirjasto perustettiin kuvernöörin kansliaan asukkaiden anomuksesta" ilman vuotta. Kysymyksen oikea vastaus 1836 on siis yhden lähteen varassa.
Suositus: vaihda tehtävä ($.kaupunkilehti[1].tehtava) lehteen: kysymys "Minä vuonna Minskissä ilmestyi ensimmäinen paikallinen sanomalehti Minskije gubernskije vedomosti?", oikea "1838", väärät 1796, 1873, 1892; fakta "Lehti ilmestyi 1838, ja kaupungin ensimmäinen teatteri perustettiin 1844." Nostoteksti ($.kaupunkilehti[1].nostot[0].teksti): "Minskin ensimmäinen julkinen kirjasto avattiin lähteen mukaan 1836" ja "Isoisän matkavuonna 1873 nämä laitokset oli jo perustettu" pysyvät.

### V20: Oopperatalon sotalause (valinnainen)

Korjattu lause ($.kaupunkilehti[1].nostot[3].teksti): poista "Talo säilyi toisessa maailmansodassa verraten ehjänä, kun suuri osa kaupungista tuhoutui." ja jätä "Ooppera ja baletti sijaitsee Kolminaisuuden esikaupungissa, ja sen oopperatalo valmistui 1939."

### V23: Kulttuuri- ja kirjastoluvut: EPÄTARKKA

Minskin kulttuuriverkkoa kuvaava asiakirja (Łódźin ystävyyskaupunkiaineisto, hakutuloksen kautta): 11 ammattiteatteria ja 16 museota (täsmää), mutta 134 kirjastoa ja 17 elokuvateatteria (sisalto: 139 ja 20). Belstatin kaupunkitason lukuja ei löytynyt.
Korjattu lause ($.kaupunkilehti[1].johdanto): "…lähteen mukaan kaupungissa on nykyään 11 teatteria ja 16 museota sekä yli sata kirjastoa." ($.kaupunkilehti[1].nostot[0].teksti: sama; poista "20 elokuvateatteria ja 139 kirjastoa".)

### V25: Pyöräkysely: EPÄTARKKA

811 000 aikuisten polkupyörää ja 770 000 henkilöautoa löytyy vain en-Wikipediasta. Hakutulokset: 2017 sosiologinen tutkimus: 40 % aikuisista omistaa polkupyörän; arvio 400 000 pyöräilijästä (rovar.info/euprojects.by); lukuja 811 000 / 770 000 ei vahvistettu. Henkilöautojen tilastoa (Belstat/Mintrans) ei haettu erikseen.
Korjattu lause ($.tiedot[1]): vaihda varmistettuun faktaan, esim. "Gorki-puiston maailmanpyörä on 54 metriä korkea" on jo $.tiedot[2]; $.tiedot[1] kannattaa korvata toisella (esim. "Svislač on 327 kilometriä pitkä Berezinan sivujoki") tai poistaa.

## 1873-ajan uskottavuus

- Kuvernementin keskus 1873: OIKEIN (kuvernementti 1796; ESBE: guberniya-kaupunki).
- Rata-aikaväitteet 1871/1873: lähes OIKEIN, ks. V3 (Libava–Romny valmistui 1874; Minskin osa tammikuussa 1873).
- Katedraali "vasta kolmen vuoden ikäinen uudelleen vihitty kirkko": OIKEIN (vihkiminen 22.10.1870).
- Punainen kirkko, Kyynelten saari, Voitonaukion pylväs "ei vielä ollut olemassa 1873": OIKEIN (valmistuneet 1910, 1996, 1954).
- Gorki-puisto olemassa 1873: OIKEIN (1800/1805).
- Tataariasutus 1428 "vanha jo 1873": OIKEIN; huom. 1428 koskee Tatarskaja Slabadaa.
- Kirjasto/palokunta/lehti/teatteri "oli jo perustettu 1873": uskottava, mutta kirjaston vuosi vain yhdellä lähteellä (V18).
- Vesijohto 1872/1874 ("oli otettu käyttöön" intro-tekstissä): sijoittuu epävarmasti 1873-ajan ympärille (V4).

## Kuvaosio (katsottu Commons-sivuilta ja thumbnail-latauksesta)

Tarkistus: commons.wikimedia.org API:n extmetadata (tekijä, lisenssi, päiväys, kuvaus, kategoriat) + Special:FilePath-esikatselu (900 px) 10 kuvasta. Kaikki 17 tiedostoa ovat olemassa; lisenssit ja tekijät täsmäävät sisalto.json:iin ja kuvat.md:hen.

| Kohta | Tiedosto | Lisenssi / tekijä | Sisältö vs. kuvateksti | Tulos |
|---|---|---|---|---|
| kansi 1 | Holy Spirit Cathedral in Minsk.jpg | CC BY-SA 3.0, Insider, own work 8.3.2013 | Valkoiset kellotornit, sininen taivas, pieniä ihmisiä (ei tunnistettavia). "Valmistui 1642, Yläkaupungin barokkikirkko" täsmää (V10). | OIKEIN |
| kansi 2 | Svislach River in Minsk Belarus.jpg | CC BY 3.0, Tim Adams, 27.8.2019 | Vain metatiedot; selite "Voitonaukiolta ulottuu puisto joelle ja Gorki-puistoon" nojaa en-Wikipediaan (Victory Square) | OIKEIN (huom.: sisältöä ei katsottu) |
| kansi 3 | Independence Avenue, Minsk 2019-08-24.jpg | CC BY-SA 4.0, Alexey Komarov, 24.8.2019 | Vain metatiedot | OIKEIN |
| nosto K1 | Minsk railroad station 2.jpg | PD-self, Redline, 29.4.2006 | Kuva näyttää nykyisen (2002) aseman, kylttinä "ЧЫГУНАЧНЫ ВАКЗАЛ" (näkyvää tekstiä). Selite "jonka ensimmäinen rakennus valmistui 1873" oikein, mutta kuva ei esitä sitä. | EPÄTARKKA |
| nosto K2 | Minsk. A view of the Svislach river and Upper Town.jpg | CC BY-SA 4.0, Vadim Sazanovich, 26.8.2015 | Vain metatiedot (kategoriat Upper Town, Svislač, Trajeckaje pradmiescie); selite Yläkaupungin 1800-luvun taloista sopii | OIKEIN |
| nosto K3 | Miensk - Ratuša.jpg | CC BY-SA 3.0, Zedlik, 8.10.2009 | Commons: "Rebuilt in 2004", tornit taustalla; selite "rakennettu keskustaan uudelleen" oikein | OIKEIN |
| nosto K4 | Mienskaja ratuša. Менская ратуша (1835) (2).jpg | PD, tekijä tuntematon ("Unknown authorUnknown author", Commonsin kentän kaksoistoisto); kuva skannattu Denisov 1985:stä; Commons: "Ратуша, праект" | Julkisivupiirros (pylväät, kolmio-otsikko, pieni torni), ei valokuva; Commons kuvaa sen hankkeeksi (projekti) 1835. Selite "vanha raatihuone, jonka julkisivupiirros on vuodelta 1835" ei mainitse, että kyse on suunnitelmasta; piirros ei esitä tulipaloa (nostossa palo 1835). Tekijän lähderivi: "Unknown author Unknown author" kannattaa vaihtaa "Tuntematon tekijä". | EPÄTARKKA |
| nosto T1 | Mienskaja ratuša (H. Hierasimovič, 1839).jpg | PD, H. Herasimovič (Commons: PD-vanha, tekijä kuollut yli 100 v sitten); lähde Kowalewska 1912 | Maalaus: raatihuoneen kulma, poppeleita, aita, ihmishahmoja kaukaa; selite sopii | OIKEIN |
| nosto T2 | 2024.04.11 National Library of Belarus Building Minsk.jpg | CC BY-SA 4.0, Agbarto | Vain metatiedot | OIKEIN |
| nosto T3 | 1517 Printed Volume of Bible by Francisk Skoryna ….jpg | CC BY-SA 2.0, Adam Jones (Flickr, FlickreviewR) | Avoin kirja: kyrillinen teksti, "Светого Иова" -sivun puupiirros. Selite "Vuodelta 1517 peräisin oleva painettu kirja" seuraa tiedoston nimeä; Skaryna painoi Jobin 1517 Prahassa (ei Minskissä; tekstissä ei väitetä muuta). | OIKEIN (huom.) |
| nosto T4 | Belarus-Minsk-Opera and Ballet Theatre-1.jpg | CC BY-SA 3.0, Hanna Zelenko (VRTS-lupa), 31.8.2005 | Vain metatiedot | OIKEIN |
| matkailijalle | Belarus-Minsk-Church of Simon and Helena-30.jpg | CC BY-SA 4.0, Eugene Zelenko, 14.5.2026 | Tiilinen päätyseinä, ruusuikkuna, tornit; ei ihmisiä. Selite "vihittiin 1910, nimetty kahden kuolleen lapsen mukaan" oikein | OIKEIN |
| opas 2 | Plošča Pieramohi (Minsk Metro station) 2020 05.jpg | CC BY-SA 4.0, DPKdpk10, 3.11.2020 | Marmoriseinä, kultakirjaimet "ПЛОЩАДЬ ПОБЕДЫ", linjakartta (näkyvää tekstiä, venäjä ja valkovenäjä); selite "Voitonaukion metroasema" täsmää | OIKEIN |
| opas 3 | Минск.Парк Горького.Колесо обозрения. - panoramio.jpg | CC BY 3.0, botfor (Panoramio-tuonti), 1.8.2010 | Maailmanpyörä alhaalta, keskellä kyltti "МИРЪ" (näkyvää tekstiä). Selite "56 metriä" VÄÄRIN, oikea 54 m (V14a) | VIRHE (kuvateksti) |
| opas 4 | 20260915 Vasilki Minsk mushroom soup.jpg | CC BY 4.0, Sergey A. Demidov, Exif 15.9.2026 | Sienikeitto, tilli, puolikas kananmuna (kuvat.md oikein; Commons-kuvauksessa "smetana", joka ei näy). Selite yleinen ja täsmää. Ei tekstiä eikä kasvoja. | OIKEIN |
| opas 5 | Minsk after snow and freezing fog (8217148748) (2).jpg | CC BY-SA 2.0, David Brewer, 25.11.2012 | Kyynelten saaren muistokappeli ja silta lumihuurteisen, sumuisen veden yllä (Commons-kategoria Island of Tears); päiväys marraskuun loppu eli syksy, joten selite "sumu yleinen syksyllä ja keväällä" ei ole ristiriidassa (tarkistus.md: "talvinen" oli liioittelua). Muistomerkki on neutraali (ei väkivaltaa). | OIKEIN |
| kohde 7 | Victory square, Minsk 01.jpg | CC BY-SA 3.0, User:Redline, 17.2.2007 | Vain metatiedot; autoja, talvi; selite 38 m ja 1954 oikein | OIKEIN |
| valokuva | Svislach river in Minsk.jpg | CC BY-SA 4.0, Viktar Palstsiuk, 14.4.2018 | Vuosi 2018 oikein (sisalto.json korjattu) | OIKEIN |

Huomioita:
- PD-kuvat: K4 (tekijä tuntematon, 1835, yli 100 v) ja T1 (Herasimovič, 1839) ovat selvästi PD; K1 on tekijän oma PD-julkaisu. Yhdenkään PD-kuvan tekijä ei ole kuollut < 70 v sitten.
- Tunnistettavia kasvoja ei ole yhdessäkään katsotussa kuvassa.
- Väkivaltaa tai herkkiä merkkejä ei ole. Opas 5 (Kyynelten saaren muistokappeli) kuvaa Afganistanin sodan muistomerkkiä neutraalisti.

## Korjausten lista (tiivis)

Pakolliset (virhe tai harhaanjohtava):
1. V14a: $.tiedot[2]; $.…jaksot[2].teksti ja .kuva.selite; $.nahtavyydet["Gorki-puisto"].teksti ja .kuvat[0].selite: 56 -> 54 metriä.
2. V3/Q4: $.artikkeli.intro; $.kysymykset[3]; $.kaupunkilehti[0].nostot[0].teksti: Libava–Romny-rata 1871–1874, Minskin osa tammikuussa 1873; "Moskova–Brest".
3. V5: $.tiedot[0]: metro kesäkuun lopussa 1984 (29./30.6.).
4. V9: $.kaupunkilehti[1].nostot[2].teksti: lisää juutalaisten 52 % tai poista prosenttiluvut.
5. V18: $.kaupunkilehti[1].tehtava: vaihda lehteen 1838 (kirjaston 1836 vain yhdessä lähteessä).
6. V11: $.nahtavyydet["Punainen kirkko"].teksti ja .kuvat[0].selite: poista tarkka vihkimispäivä ja "1905–1908".
7. V7: $.kaupunkilehti[0].nostot[3].teksti: 1860 "27 000–30 000".
8. V6: $.kaupunkilehti[0].nostot[2].teksti ja $.artikkeli.intro: 1939 238 772, "300 000" vain 1941 arvio, 80 % neuvostoarvio, poista 1,5 milj. 1986.
9. V25: $.tiedot[1]: korvaa tai poista.
10. V23: $.kaupunkilehti[1].johdanto ja nostot[0].teksti: 11 teatteria, 16 museota, "yli sata kirjastoa"; poista 20 elokuvateatteria ja 139 kirjastoa.

Pehmennykset (valinnaisia):
11. V4: vesijohto 1872/1874.
12. V8: palo 1835 ilman päivää ja "koko keskusta".
13. V12: kirjaston korkeus "noin 73 m", kerrosluku pois.
14. V14b: Gorki-puisto "1800–1805".
15. V17: "uudelleen rakennettu raatihuone".
16. V20: oopperatalon sotalause pois.
17. Kuvat: K1 selite ("nykyinen rakennus 2002; ensimmäinen asemarakennus 1873"), K4 selite ("julkisivupiirros (hanke) 1835") ja lähderivi ("Tuntematon tekijä").

## Lähteet (pääosa)

- https://en.wikipedia.org/wiki/Minsk ; https://en.wikipedia.org/wiki/Timeline_of_Minsk ; https://en.wikipedia.org/wiki/Libava%E2%80%93Romny_Railway ; https://en.wikipedia.org/wiki/Minsk_railway_station ; https://en.wikipedia.org/wiki/Minsk_Metro
- https://ru.wikisource.org/wiki/ЭСБЕ/Минск,_губернский_город (ESBE, luettu: 1499, 1793, 1860 30 000, 1896 väkiluku, Moskova–Brest ja Libava–Romny, palo 1881)
- https://en.wikipedia.org/wiki/Holy_Spirit_Cathedral,_Minsk ; https://azbyka.ru/palomnik/Свято-Духов_кафедральный_собор_(Минск) ; https://www.inyourpocket.com/minsk-russian/kafedralynyy-sobor-v-chesty-svyatogo-duha_85262v
- https://en.wikipedia.org/wiki/Church_of_Saints_Simon_and_Helena ; https://msj.by/?p=98 ; https://structurae.net/structures/20034019 ; https://www.minsktourism.by/en/object/dostoprimechatelnosti/kostel-svyatykh-simeona-i-eleny/
- https://en.wikipedia.org/wiki/National_Library_of_Belarus ; https://www.skyscrapercenter.com/building/the-national-library-of-belarus/9548 ; https://architectuul.com/architecture/national-library-of-belarus ; https://press.nlb.by/ (hakutuloksen kautta)
- https://en.wikipedia.org/wiki/Victory_Square,_Minsk ; https://www.sb.by/articles/simvol-vsenarodnoy-pamyati-ploshchad-pobedy.html ; https://bgam.by/wp-content/uploads/2022/01/Demo_Pamiatniki_Velikoy_Otechestvennoy_voiny_v_Belarusi.pdf (hakutuloksen kautta)
- https://en.wikipedia.org/wiki/Gorky_Park_(Minsk) ; https://www.sputnik8.com/ru/minsk/sights/park-gorkogo/info ; https://www.hata.by/articles/park_gorkogo-9079/ ; https://planetabelarus.by/publications/vladenie-vankovichey-i-podarok-gubernatora-istorii-samykh-starykh-parkov-minska/ ; https://news.mail.ru/society/65861401/
- https://en.wikipedia.org/wiki/Svislach_(Berezina) ; https://en.wikipedia.org/wiki/Trinity_Suburb ; https://en.wikipedia.org/wiki/Zaslawskaye_reservoir (hakutuloksen kautta) ; https://en.wikipedia.org/wiki/National_Academic_Bolshoi_Opera_and_Ballet_Theatre_of_the_Republic_of_Belarus
- Nasha Niva https://nashaniva.com/ru/232995 (metron avajaiset 29.6., hakutuloksen kautta); https://belarusdigest.com/ (sodan tuhot, hakutuloksen kautta); https://belstat.gov.by/ (väkiluku 2026, hakutuloksen kautta)
- Commons API: https://commons.wikimedia.org/w/api.php (imageinfo, extmetadata) ja Special:FilePath-esikatselut
