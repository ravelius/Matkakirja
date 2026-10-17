# V1: keksintöjen riippumaton faktantarkistus (paperi, kompassi, ruuti, kirjapaino)

Tarkistettu 17.10.2026. Repoa ei muokattu. Verkkohaut omilla WebFetch/WebSearch-työkaluilla.

## robots.txt ja käyttö

| Sivusto | robots.txt | Käyttö |
|---|---|---|
| en.wikipedia.org | `*`: /w/, /api/, /wiki/Special: kielletty; artikkelit sallittu | Haettu vain /wiki/-artikkelisivuja, ei rajapintaa |
| zh.wikipedia.org | sama | 1 /wiki/-sivu (畢昇) |
| plato.stanford.edu | sallittu (crawl-delay 5) | Tarkistettu, mutta aiheesta ei SEP-merkintää; ei haettu |
| archive.aramcoworld.com | `Allow: /` | Haettu 1 sivu (paperin historia) |
| www.newadvent.org | vain /cgi-bin/ ja /tmp/ kielletty | Haettu 1 sivu (Neckam) |
| www.loc.gov ja blogs.loc.gov | sallittu (crawl-delay 5; blogs: vain /wp-admin/) | Haettu 2 sivua + 1 blogi |
| airandspace.si.edu | /stories/ sallittu | Haettu 1 sivu (ruuti) |
| www.worldhistory.org | /search ym. kielletty, ei tekoälyestoa | Haettu Cai Lun -sivu: ei sisältöä aiheeseen (vain kuvateksti 105) |
| www.bl.uk | `Allow: /` | Haettu 2 sivua: palautti vain indeksin (kyberhyökkäyksen jälkeen rajoitettu sisältö). http://www.bl.uk/onlinegallery/... antoi 403: EI KÄYTETTY |
| ctext.org | robots sallii, mutta sivu ilmoittaa ettei automaattinen haku ole sallittu | EI KÄYTETTY (Hou Hanshu -alkuteksti jäi lukematta) |
| www.lrb.co.uk | estää ClaudeBotin ja muut tekoälybotit (/blog/ ym.) | EI KÄYTETTY |
| idp.bl.uk | robots 403 (aiemmin todettu) | EI haettu; vain hakutiivistelmä näkyi |
| historyofinformation.com | ei `*`-ryhmää, mutta sivu palautti vain otsikon (JS) | Haettu 2 sivua, sisältö ei näkynyt; vain hakutiivistelmä |
| www.cabinet.ox.ac.uk | verkkotunnusta ei löydy (ENOTFOUND) | Ei haettu; vain hakutiivistelmä |
| Britannica, DANS, UNESCO | ohjeen mukaan | EI käytetty |

Huomio: Wikipedian lisäksi oikeasti luettuja sivuja on vähän (Aramco World, New Advent, LOC x2, Smithsonian). Ensisijaiset tutkijat (Needham/Tsien, Kreutz, Sawyer) jäivät lukematta.

---

## 1. PAPERI

**Arvio: OK (pienin tarkennuksin) ja yksi KORJAA: Xàtivan 1056.**

| Väite | Arvio | Perustelu |
|---|---|---|
| Cai Lun esitteli parannetun paperinvalmistuksen keisarille vuonna 105 | OK | Hou Hanshun mukaan "Yuanxingin 1. vuonna [105]" (Wikipedia Cai Lun, tarkka viite Hou Hanshu 78/68:2513-14). Nykytulkinta: kehitti ja vakiinnutti, ei keksinyt (Wilkinson 2018; Tsien: "zào yì" = aloittaa ajatus). Lähde kirjoitettu lähes 300 v. myöhemmin. |
| ... Luoyangissa | EPÄVARMA (tarkennus) | Wikipedian Cai Lun -artikkeli EI sano suoraan, että esittely tapahtui Luoyangissa; se sijoittaa Cai Lunin hoviin Luoyangiin suurimmaksi osaksi aikuisiän ajaksi. Luoyang oli Itä-Hanin pääkaupunki 25-190 (Wikipedia Luoyang), joten päätelmä on perusteltu, mutta se on päätelmä. Hou Hanshun alkutekstiä ei saatu (ctext ei käytetty). |
| Paperi on vanhempaa kuin Cai Lun (Fangmatan) | OK | Fangmatan, hauta 5, Tianshui, Gansu: kartan paperipalanen 5,6 x 2,6 cm, "179-141 eaa." / 2. vuosisadan alku eaa.; vanhin säilynyt paperi, jossa piirros. Wikipedia: erilaisia papereita jo 3. vuosisadalta eaa. (Barrett 2011, Kern 2001). Fangmatan 34.4, 106.1 (Wikipedia). Kuidut hamppua (hakutiivistelmä). |
| Luoyang 34.620, 112.454 | OK | Wikipedia: 34.6197 N, 112.4539 E. |
| Bagdad 790-luvulla | OK | Wikipedia History of paper: "by 793"; paperimyllyjä Bagdadissa 794-795. Vuosi vaihtelee 793/794 lähteittäin. Talas 751 -tarina (al-Tha'alibi, 1000-luku) on myöhäinen; paperi oli Keski-Aasiassa jo ennen (Aramco, hakutiivistelmä). Aramco ei anna 790-lukua, vaan Harun al-Rashidin (786-809) ajan. |
| Xàtiva 1056 vs ~1150 | KORJAA | Älä käytä 1056:ta varmana. Aramco World toistaa "dokumentoitu 1056", ja Wikipedia History of paper sanoo "ensimmäinen kirjattu paperimylly Xàtivassa 1056", MUTTA hakutiivistelmän mukaan 1056 perustuu legendaan ja Sarthoun 1942 väitteeseen; Ventura ja Valls: ei asiakirjatodistetta. Idrisi kuvaa Xàtivan paperin ~1150. Varma vesivoimamylly: Pietari III:n määräys 1282 (Wikipedia Paper mill). Burns epäilee varhaisia vesimyllyjä. Turvallinen muoto: "Xàtivassa tehtiin paperia viimeistään 1100-luvun puolivälissä". |
| Fabriano 1200-luvun lopulla | OK (hajota) | Wikipedia Fabriano: 1276 yksi Euroopan varhaisimpia paperipaikkoja; Aramco: "1276 jälkeen". Wikipedia Paper mill kuitenkin sanoo, että Fabrianon varhaisten vesimyllyjen tunnistus 1276/1278 asiakirjoista on "täysin todistamaton" (asiakirjat eivät mainitse paperinvalmistusta). Kirjoita "1200-luvun lopulla", älä "1276 ensimmäinen". |
| Nürnberg 1390 | OK | Ulman Stromerin mylly "viimeistään 1390", ensimmäinen pysyvä paperimylly Alppien pohjoispuolella (Wikipedia History of paper ja Paper mill). Aramco: "1300-luvun lopulla". |
| Välitys islamilaisen maailman kautta | OK | Kaikki lähteet yhtä mieltä: Keski-Aasia (Samarkand), Bagdad, Egypti/Espanja/Sisilia, Italia. |

**Lähteet:**
1. https://en.wikipedia.org/wiki/Cai_Lun (haettu; Luoyang-paikka ei suoraan)
2. https://en.wikipedia.org/wiki/History_of_paper (haettu osittain, 100 000 merkkiä 151 826:sta) ja https://en.wikipedia.org/wiki/Paper_mill (haettu)
3. https://archive.aramcoworld.com/issue/199903/revolution.by.the.ream-a.history.of.paper.htm (haettu; ei-Wikipedia)
4. https://en.wikipedia.org/wiki/Fangmatan, https://en.wikipedia.org/wiki/Luoyang, https://en.wikipedia.org/wiki/Fabriano (haettu)
Hakutiivistelmä (ei sivua): valenciabonita.es "La verdad sobre el origen de la primera fábrica de papel de Europa: Xàtiva" ja revistes.iec.cat (Xàtiva 1056 -kritiikki).

**Heikoin kohta:** Xàtivan 1056 ja Luoyang esittelypaikkana.

**William-ehdotus (19 sanaa):** "Vuonna 105 hovivirkamies Cai Lun esitteli Hanin keisarille parannetun paperinvalmistuksen; paperia oli kuitenkin tehty jo satoja vuosia aiemmin."
(Ei väitä Luoyangia esittelypaikaksi. Jos paikka halutaan: "Hanin pääkaupungissa Luoyangissa vuonna 105 hovivirkamies Cai Lun esitteli parannetun tavan valmistaa paperia." Paikka silloin pääkaupunkina.)

---

## 2. KOMPASSI

**Arvio: OK, kaksi tarkennusta (Zhu Yun vuodet, Neckamin teos).**

| Väite | Arvio | Perustelu |
|---|---|---|
| Shen Kuo, Mengxi bitan, 1088: vanhin kiistaton kuvaus magnetoidusta neulasta, deklinaatio | OK | Wikipedia History of the compass: "ensimmäinen kiistaton viittaus magnetoituun neulaan"; hierotaan magneettikivellä, ripustetaan silkkilangalla; neula osoittaa hieman itään etelästä (Wikipedia Shen Kuo). Vuosi 1088 on Wikipedian "valmistui"-vuosi; hakutiivistelmässä yksi lähde sanoo kirjoitetun 1086; teos syntyi todennäköisesti usean vuoden aikana. Käytä "vuoden 1088 tienoilla". |
| Kirjoitettu Zhenjiangissa (32.188, 119.424) | OK (kaupungin lähellä) | Wikipedia Zhenjiang: kirjoitettu "eläkkeellä puutarhatilalla kaupungin laitamilla"; Shen Kuo kuoli Runzhoussa 1095 (nyk. Zhenjiang). Koordinaatti 32.188 N, 119.424 E on kaupungin, ei tilan koordinaatti. Mengxi-nimeä ei vahvistettu Zhenjiangin sivulta, mutta Shen Kuo -sivu sanoo tilan nimeksi Dream Brook (Mengxi). |
| Merenkulkukompassi Zhu Yu, Pingzhou ketan (~1117-1119) | OK, tarkenna | Wikipedia History of the compass: kirjoitettu 1111-1117, EI 1119; muut lähteet (hakutiivistelmä): kirjoitettu 1111-1117, julkaistu 1119. Sisältö: luotsit seuraavat öisin tähtiä, päivisin aurinkoa, pimeällä "etelään osoittavaa neulaa". Zhu Fu (isä) Guangzhoun kauppalaivaston valvoja 1094-1099, sitten kuvernööri 1102 asti. Käytä "1100-luvun alussa". |
| Neckam ~1190 | OK, tarkenna | Wikipedia: De naturis rerum (1190) ja De utensilibus; teokset ajoitettu 1187-1202. New Advent (Catholic Encyclopedia): "Neckam is the first European author to mention the mariners' compass." Hakutiivistelmä: muiden lähteiden mukaan viite on pikemmin De utensilibus -teoksessa ("perhaps earliest"), joten älä väitä tiettyä teosta. Käytä "noin 1190" tai "1100-luvun lopulla". |
| Reitti Eurooppaan kiistanalainen | OK | Wikipedia: arabit, Intian valtameri, ristiretket tai itsenäinen eurooppalainen keksintö; Kreutz: kiinalainen merikäyttö ~150 v. ennen ensimmäistä eurooppalaista mainintaa. Ensimmäinen kirjattu käyttö islamilaisessa maailmassa 1232 (hakutiivistelmä, heikko lähde). |
| (lisä) Han-lusikka ei todiste | OK (varoitus) | Lunheng 70-80: "etelään osoittava lusikka", magnetismia ei suoraan mainita. Ei arkeologista esinettä (Wikipedia). Älä väitä Han-kompassia. |

**Lähteet:**
1. https://en.wikipedia.org/wiki/History_of_the_compass (haettu)
2. https://en.wikipedia.org/wiki/Shen_Kuo (haettu osittain) ja https://en.wikipedia.org/wiki/Zhenjiang (haettu osittain; koordinaatti)
3. https://www.newadvent.org/cathen/10734a.htm (haettu; ei-Wikipedia; vain yksi lause Neckamista)
Hakutiivistelmä (ei sivua): https://en.wikipedia.org/wiki/Zhu_Yu_(author); https://historyofinformation.com/detail.php?id=222 (sivu palautti vain otsikon).

**Heikoin kohta:** täsmällinen kirjoitusvuosi ja -paikka (1088/Zhenjiang) ja Zhu Yun "1117-1119" (käytä 1100-luvun alku); ei yhtään painettua tutkijalähdettä luettu.

**William-ehdotus (19 sanaa):** "Kiinalainen oppinut Shen Kuo kuvasi magneettineulan jo noin vuonna 1088 Zhenjiangin lähellä; Euroopassa se mainitaan vasta noin 1190."

---

## 3. RUUTI

**Arvio: OK, kaksi tarkennusta (808-teoksen ajoitus ja Wujing Zongyaon "sytyttävä vs. räjähtävä"), yksi KORJAA (Bacon).**

| Väite | Arvio | Perustelu |
|---|---|---|
| Wujing Zongyao 1044: vanhimmat tunnetut ruutireseptit | OK | Koottu 1040-1044 keisari Renzongin johdolla (esipuhe keisarin), ylitoimittaja Zeng Gongliang (Wikipedia Wujing Zongyao). Vanhin täydellinen säilynyt painos 1510 (alkuperäinen tuhoutui 1126, Jurchenit). |
| ... sytyttäviä, ei räjähtäviä | EPÄVARMA | Wikipedia Gunpowder ja History of gunpowder: salpietaria enintään ~50 %, sytyttäviä (shokkivaikutus). MUTTA Wikipedia Wujing Zongyao luettelee kolme reseptiä, joista ensimmäinen on "räjähtävä" heittokoneella ammuttava pommi, ja History of gunpowder mainitsee "pilipao"-ukkonenpommin. Lähteet ovat keskenään ristiriitaiset; ensisijaista tekstiä/Needhamia ei luettu. Älä kirjoita, että reseptit olivat varmasti vain sytyttäviä. Kirjoita "vanhimmat tunnetut kirjatut reseptit". |
| 808 vanhin maininta | EPÄVARMA | Wikipedia: Taishang shengzu jindan mijue 808 (rikki 6, salpietari 6, yksi osa syyläkasvia). Ajoitusepäilyjä sivuilla ei käsitelty; älä esitä varmana, käytä "800-luvulla". Seuraava: Zhenyuan miaodao yaolüe noin 850. 904: ensimmäinen sotilaskäyttö (sytyttävät). |
| Kaifeng 34.795, 114.345 | OK | Wikipedia Kaifeng: 34.795 N, 114.345 E; Pohjois-Songin pääkaupunki (Dongjing) 960-1127. Wikipedia Wujing Zongyao EI sano kokoamispaikkaa; käsikirjoitus säilytettiin keisarillisessa kirjastossa, joten Kaifeng on päätelmä. |
| Roger Bacon ~1267 | KORJAA (sanamuoto) | Opus Majus ja Opus Tertium (1267) kuvaavat "lasten leluna" tunnettua ukkosta kovempaa pamausta; ei varmaa reseptiä. Kryptogrammi-resepti (De secretis operibus) on kiistetty/väärennös (Wikipedia Roger Bacon; Needham ym.). Kirjoita "ensimmäiset länsimaiset kuvaukset", älä "resepti". |
| Tykkimaininnat Euroopassa 1320-luvulta | OK | Walter de Milemeten käsikirjoitus 1326/1327 (vanhin kuva); Firenzen määräys 1326 (vanhin kirjallinen todiste tykistä); Wikipedia Gunpowder: 1326 Milemete. |
| Reitti Eurooppaan | OK | Wikipedia Gunpowder: "ei selvää reittiä"; mongolit mahdollinen välittäjä, ei konkreettista näyttöä. |
| Taolaiset alkemistit, vahingossa | OK | Smithsonian (National Air and Space Museum): "Taoist alchemists, probably searching for a longevity elixir ... accidentally". |

**Lähteet:**
1. https://en.wikipedia.org/wiki/Gunpowder ja https://en.wikipedia.org/wiki/History_of_gunpowder (haettu osittain)
2. https://en.wikipedia.org/wiki/Wujing_Zongyao, https://en.wikipedia.org/wiki/Kaifeng, https://en.wikipedia.org/wiki/Roger_Bacon (haettu)
3. https://airandspace.si.edu/stories/editorial/first-fireworks-origins-rocket (haettu; ei-Wikipedia; vain yleinen alkemisti-väite, ei vuosilukuja)
Hakutiivistelmä (ei sivua): Oxford Museum of the History of Science -sivu "Firearms: the earliest European image, 1326-7" (cabinet.ox.ac.uk/node/7215), Wikipedia Walter de Milemete.

**Heikoin kohta:** Wujing Zongyaon "sytyttäviä, ei räjähtäviä" (lähteet ristiriidassa) ja 808-ajoitus.

**William-ehdotus (19 sanaa):** "Ruutia kokeilivat Kiinassa taolaiset alkemistit; vanhimmat tunnetut kirjatut reseptit ovat Songin hovin sotakirjasta 1040-luvulta."
(Sopii, jos paikkaa ei väitetä; Kaifeng hovin sijaintina vain päätelmä.)

---

## 4. KIRJAPAINO

**Arvio: OK, kolme tarkennusta (Yingshan-koordinaatti, Bi Shengin kotipaikka kiistelty, Gutenbergin vuosi).**

| Väite | Arvio | Perustelu |
|---|---|---|
| Timanttisuutra 11.5.868 vanhin päivätty painettu kirja | OK | Wikipedia Diamond Sutra: kolofoni "Xiantongin 9. vuoden 4. kuun 15. päivä" = 11.5.868; "yleisesti vanhin säilynyt painettu kirja"; ei ole vanhin puupainanta, vaan vanhin päivätty. Hakutiivistelmä (BL/IDP): "earliest dated printed book", "BL huomauttaa, että on vanhempia painatteita". Wang Jie rahoitti, ei itse valmistanut. |
| Löytöpaikka Mogao 40.037, 94.804 | OK | Wikipedia Mogao Caves: 40.03722 N, 94.80417 E (koko luolasto); Library Cave (luola 17) löydetty 1900 (Wang Yuanlu), muurattu umpeen 1000-luvun alussa. Stein osti 1907. Hakutiivistelmä (IDP): "Mogao Cave 17". Painopaikka ei lähteissä; älä väitä. |
| Bi Sheng savikirjasimet 1040-luvulla (Shen Kuo) | OK | Wikipedia Bi Sheng: Qingli-kausi 1041-1048; Shen Kuo on ainoa lähde. LOC (blogs.loc.gov, ei-Wikipedia): "Bi Sheng (972-1051) 1041-1048 keramiikkakirjasimin; ei laajassa käytössä Kiinassa". Elinvuodet vaihtelevat (972/990-1051). Säilyneitä kirjasimia ei lähteissä. |
| Bi Shengin hautakivi Yingshan, Hubei (30.735, 115.681) | OK, KOORDINAATTI TARKENNA | Wikipedia zh: hautakivi löydettiin 1990 kylästä Wuguidun (五桂墩村), Caopandin kaupunki (草盘地镇), Yingshan (英山县). 30.735 N, 115.681 E on Yingshanin PIIRIKUNNAN keskus (Wikipedia Yingshan County), ei hautakiven löytöpaikka. Wikipedia en ei mainitse Yingshania, vain Hubein. Hautakiven identifiointi Bi Shengiksi on tutkimuksessa tulkinta; zh-Wikipedia mainitsee vaihtoehtoisen kertomuksen: Hangzhou. Älä väitä Hangzhoua; käytä "Yingshanin seutu, Hubei". |
| Gutenberg Mainz ~1450, yhteys Kiinaan todistamaton | OK | LOC: Gutenberg Raamattu valmistui "noin 1455" Mainzissa, ensimmäinen suuri kirja liikuteltavin metallikirjasimin Länsi-Euroopassa; "ei ensimmäinen painettu kirja". Wikipedia Movable type: Gutenbergin metallinvalutyö 1436-1450, Raamattu 1455; McDermott: ei tekstiä ennen 1450, joka osoittaisi tiedon aasialaisesta liikkuvasta kirjasimesta; Gutenbergin menetelmä teknisesti erilainen. LOC: "miten painaminen kulki länteen on edelleen kiistanalaista"; Tsien: mongolit mahdollinen reitti. Jikji (Korea 1377) vanhin säilynyt metallikirjasinkirja; 1230-luvun korealainen tyyppi väitetty. Käytä "noin 1450-luvulla". |

**Lähteet:**
1. https://en.wikipedia.org/wiki/Diamond_Sutra, https://en.wikipedia.org/wiki/Bi_Sheng, https://en.wikipedia.org/wiki/Mogao_Caves, https://en.wikipedia.org/wiki/Movable_type, https://en.wikipedia.org/wiki/Yingshan_County,_Hubei, https://zh.wikipedia.org/wiki/畢昇 (kaikki haettu)
2. https://blogs.loc.gov/international-collections/2021/06/the-history-of-printing-in-asia-according-to-library-of-congress-asian-collections-part-1/ (haettu; ei-Wikipedia) ja https://www.loc.gov/exhibits/bibles/interactives/gutenberg/index.html (haettu; ei-Wikipedia)
Hakutiivistelmä (ei sivua): idp.bl.uk Diamond Sutra -sivut, bl.uk/onlinegallery (403), https://blogs.loc.gov/preservation/2023/05/jikji-gutenberg/.

**Heikoin kohta:** Bi Shengin hautakiven koordinaatti ja identiteetti (piirikunnan keskus, ei löytöpaikka; kylä Wuguidun jäi ilman koordinaattia) sekä se, että Bi Sheng tunnetaan vain Shen Kuon kautta.

**William-ehdotus (19 sanaa):** "Vanhin päivätty painettu kirja on vuodelta 868, löytyi Dunhuangin luolasta; savikirjasimet kuvattiin 1040-luvulla, Gutenberg painoi Mainzissa noin 1450-luvulla."
(Ei väitä painopaikkaa, ei Gutenbergin yhteyttä Kiinaan.)

---

## Mitä en pystynyt varmistamaan

1. Hou Hanshun alkuteksti (Cai Lun, Luoyang-sijainti): ctext ei käytetty (automaattinen haku kielletty).
2. Cai Lunin esittely nimenomaan Luoyangissa: vain päätelmä pääkaupungista.
3. Xàtivan 1056: ristiriitaiset lähteet (legenda vs. "dokumentoitu"); alkuperäistä asiakirjaa ei nähty.
4. Fabrianon tarkka perustamisvuosi: 1276 on yleinen luku, mutta asiakirjapohjaa epäillään.
5. Shen Kuon Mengxi bitanin tarkka kirjoitusvuosi (1086/1088/valmistui) ja tarkka kirjoituspaikka (tilan koordinaatti).
6. Zhu Yun teoksen kirjoitus- vs. julkaisuvuosi (1111-1117 / 1119) ja Neckamin tarkka teos (De naturis rerum vai De utensilibus).
7. Wujing Zongyaon reseptien tarkat suhteet ja se, olivatko ne vain sytyttäviä (lähteet ristiriitaiset; Needham/Partington lukematta).
8. 808-teoksen (Taishang shengzu jindan mijue) ajoituskiista.
9. Bi Shengin hautakiven tarkka löytöpaikan koordinaatti (Wuguidun, Caopandi) ja hautakiven identifiointi; kuolema/syntymäpaikka (Yingshan vs. Hangzhou).
10. Timanttisuutran painopaikka (tuntematon) ja BL:n oma sivu (403 / ei sisältöä): vahvistus vain hakutiivistelmästä.
11. Painettuja tutkijalähteitä (Needham/Tsien, Kreutz, Sawyer, Andrade) ei luettu; kaikki varmennus on Wikipedian, LOC:n, Aramco Worldin, New Adventin ja Smithsonianin varassa.
