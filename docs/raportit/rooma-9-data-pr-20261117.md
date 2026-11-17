# Rooman 9 tarinapaikkaa dataan (SK 17.11.2026)

Haara sk/rooma-data (origin/main päällä). KK:n DATA-SANA 17.11. (Rooma Wienin jälkeen); PR ei ole enää luonnos; yhdistämissana tulee KK:lta. Lähde: docs/raportit/rooma-9-tarinapaikkaa-dataluonnos-20261116.md (haara origin/sk/rooma-tarinapaikat-docs). Tekstit on poimittu sieltä koneellisesti (Teksti-lohkot) merkki merkiltä; muutokset luonnokseen ovat KK:n päätösten mukaiset (alla). Mitään faktaa, lukua tai superlatiivia ei lisätty omasta päästä. Kuvia ei ladattu; vain repossa jo olevia kuvia käytetty, kuvatekstit korjattu.

HUOM PR 6895 (Wienin data-PR): sama tiedostoja (data/aanitysjono.tsv, data/kohdekartat-sijainnit.json, js/packs/maakartat.js, nahtavyysjutut.js, historian-hetket.js, kulttuuri-kategoriat.js, tools/paivita-hetkisivut.mjs). Wienin osioihin ei koskettu; konfliktit ratkaistaan yhdistyksen jälkeen rebasella. tools/paivita-hetkisivut.mjs: Rooman Michelangelo-hetken teksti on monikappaleinen, ja testi (hetkisivugeneraattori) vaatii saman yhden rivin korjauksen kuin PR 6895 (`hipsuissa` kirjoittaa rivinvaihdon `\n`-pakona). Rivi on merkki merkiltä sama kuin PR 6895:ssä, joten se yhdistyy ilman konfliktia.

## KK:n lukukierroksen korjaukset (17.11., toinen commit)

1) Torre Argentina: "NPR:n mukaan kissoja itseään ei kuitenkaan voitu häätää." 2) Norsu: "yksi pienimmistä". 3) Nasone: "Ne ovat valurautaisia pylväitä". 4) Kaupallisten ja hakuteossivujen nimet (Walks of Italy, The Collector, EBSCO Research Starters, Discover, CoinsWeekly, Ursula Kampmann) pois leipätekstistä ja kuvateksteistä ("lähteiden mukaan", "arvioiden mukaan", "erään kirjoittajan mukaan"); nimet jäävät lahde-riville. Korjattu kaikkiin toistopaikkoihin (nähtävyysjutut, fokusvirta, hetki, generoitu hetkisivu, lehden nosto). Avoimet: pisteet ja nimiöt KK katsoo kuvasta; Banca Romanalle ei uutta pitkää tekstiä; kissat-symboli 'elain' jää.

## KK:n päätökset (16.–17.11.), toteutus

- a) Banca Romana: piste Palazzo Maffei Marescotti 41,8970 / 12,4775 (maakartat.js, kohdekartat-sijainnit.json, skandaalit.js), nimi 'Banca Romana', aika 1893. Paikka tarkistettava kuvasta.
- b) Meta Sudans mukana: 1873 raunio, purettu 1936; "flaviolaiskeisarien aikana", rakentajaa ei nimetä; piste 41,89008 / 12,49067 (kohdekartat-sijainnit.json sai uuden rivin).
- c) Trevin pääsymaksu ei tekstiin.
- d) Aqua Virgon piste pysyy Trevillä; nimiPuoli/siirto ennallaan.
- e) Nasone: piste Piazza della Rotonda 41,8993 / 12,4768 (Wikidata Q3457157), aika "1870-luku", teksti ei väitä 1873.
- g) merkit: lamppu = tekniikka (Aqua Virgo, Nasone), tiimalasi (Kolikko, Meta Sudans, Torre Argentina, Areenan kellari), lyyra (Michelangelo, Norsu), skandaali (Banca Romana).
- h) Yhden lähteen väitteet pois: dukaatit, home, jättipatsaan osat, harena, merimiehet ja neito-taru. Toista lähdettä ei etsitty (ei aikaa tässä erässä); "Nimi Virgo tarkoittaa neitoa" jäi, koska se on latinan sanan käännös eikä tarun väite.
- i) Korjaukset kaikkiin paikkoihin yhtä aikaa: obeliski "yksi niistä pienimmistä"; Areenan kellari "noin 80 pystykuilua" lähdemaininnalla (Walks of Italy, The Collector; myös kuvateksteissä); Torre Argentinan kaivaus 1926–1929 (jättipatsas pois, ks. h); Aqua Virgo ilman "lähes sata km" ja ilman pudotuslukuja (Aqua Marcia noin 91 km); Michelangelo 1510: ikälukua ei tekstissä (oikein 35), elokuu 1510 / elokuu 1511.
- Isoisän matkavuosi 1873 -kappale jokaisessa tekstissä. Ei ajatusviivoja uusissa teksteissä (vain vuosivälien tavuviivat).

## Muutetut tiedostot

- js/packs/maakartat.js: yhdeksän riviä (`tarinapaikka: true`, `merkki`), Banca Romanan ja Nasonen uudet pisteet, Meta Sudans (merkki, tarinapaikka, piste).
- js/packs/nahtavyysjutut.js: yhdeksän jutun teksti, `aika`, `lahde` ("Matkakirjan oma teksti · lähteinä …", korvaa `lahde: 'Wikipedia'`) ja kuvatekstit; kuvat lisätty kolmelle jutulle repossa jo olevista tiedostoista (Banca Romana, Michelangelo, Meta Sudans). Trevin suihkulähde -jutun virke "kolikoita kertyy noin 3 000 euron edestä joka päivä" korjattu (sama virhe, äänitetty).
- js/packs/fokusvirta-rooma.js: syvennys `kissat` (teksti, lähde, visa), täkynosto `kissat` (otsikko, lunastus, lähde; vanhan version temppeli D / laki 281/1991 -väitteet pois), viisi täkynostoa (lunastus, lähde, kysymykset, kuvatekstit, visat, symboli: Kolikko ja Areenan kellari 'historia' ja Nasone 'tekniikka', jotta kortin ylärivi vastaa kartan merkkiä, tests/tarinapaikka-symbolit), NASONE_VISA ja oppitunti (sama virheellinen kolikko-, kilometri- ja neito-aineisto).
- js/packs/skandaalit.js: Banca Romana (`kortti` uusi teksti, `lahde`, kuvateksti, visa, paikka ja piste). Vanha pitkä `teksti` poistettu, koska sen väitteet (135 / 75 milj. liiraa, pääjohtaja 1881, pidätys, Crispi ja Giolitti 1889) eivät täyttäneet kahden lähteen sääntöä; KK päättää, kirjoitetaanko pitkä juttu uusiksi.
- js/packs/historian-hetket.js: Michelangelo 1510 (teksti, kuvatekstit, lehtiJohdanto, lehtiTehtava; ikä 37 ja "15. elokuuta" pois).
- js/packs/kulttuuri-kategoriat.js: generoitu hetkisivu (tools/paivita-hetkisivut.mjs), lehden nosto "Norsu kantaa obeliskia" (teksti, galleriakuvateksti), Torre Argentinan lehtitehtävä (vanha kysymys kysyi poistettua avain-väitettä), nasonen ja Meta Sudansin kuvatekstit.
- js/packs/europe-kulttuuri.js: ei muutettu (Rooman kulttuurivisan `fact` sisältää edelleen "30 senttiä kilometrillä", ks. avoimet).
- data/kohdekartat-sijainnit.json: Banca Romana, Nasone, uusi Meta Sudans.
- tools/paivita-hetkisivut.mjs: yksi rivi (ks. yllä).
- data/aanitysjono.tsv: `--lisaa --siivoa`: +38 riviä, Meta Sudansin vanhat 3 riviä pois (teksti ei enää sisällössä).
- docs/raportit/rooma-9-mediapyynto-20261117.md ja tämä raportti.

## Kohteittain

| # | Kohde | Merkki | Tyyppi | aika | Piste | Huom. |
|---|---|---|---|---|---|---|
| 1 | Banca Romana | skandaali | henkilo (ennallaan, ei sovi pankille) | 1893 | 41,8970 / 12,4775 (Palazzo Maffei Marescotti) | siirtyi noin 440 m; 1873-kappale kehystää |
| 2 | Michelangelo 1510 | lyyra | henkilo | 1508–1512 | ennallaan | ikä pois; hetkikortti ja kaikki kopiot yhtä aikaa |
| 3 | Kolikko olan yli | tiimalasi | henkilo | 1762 | ennallaan (Trevi) | Kampmann: kolikkotavan ikä jää epäselväksi |
| 4 | Aqua Virgo | lamppu | esine | 19 eaa. | ennallaan (Trevi, päätepiste) | sama piste kuin Kolikolla |
| 5 | Meta Sudans | tiimalasi | ei tyyppiä | 1. vuosisata–1936 | 41,89008 / 12,49067 | kadonnut kohde; purku 1936 |
| 6 | Torre Argentina | tiimalasi | ennallaan | 1926–1929 | ennallaan | kaksi nostoa samassa pisteessä |
| 7 | Areenan kellari | tiimalasi | esine | 1874 | ennallaan | "noin 80 pystykuilua" lähdemaininnalla |
| 8 | Norsu ja obeliski | lyyra | ei tyyppiä | 1667 | ennallaan | "yksi pienimmistä" |
| 9 | Nasone | lamppu | esine | 1870-luku | 41,8993 / 12,4768 (Piazza della Rotonda) | 1873 ei väitetä |

## Avoimet asiat

### Kuvat ja media
- Uusia Commons-kuvia ei viitattu. Suositellut tiedostot ja lisenssit: docs/raportit/rooma-9-mediapyynto-20261117.md. Kaikilla yhdeksällä kohteella on nyt vähintään yksi repossa jo oleva kuva (varatäplää ei tarvita); aikalaiskuva 1873:sta puuttuu Areenan kellarilta ja Nasonelta.
- Banca Romanan juttukuva on Tanlongo 1894 (aikalainen skandaalista, ei 1873-kuva). Meta Sudansin kuva on LOC noin 1890.

### Koordinaatit ja nimiöt
- Banca Romana (41,8970 / 12,4775) on noin 110 m Norsu ja obeliski -pisteestä (numeroympyrät 62 % päällekkäin, tools/tarkista-karttapisteet.mjs rooma); Nasone (41,8993 / 12,4768) on noin 80 m Pantheonin kartan pisteestä pohjoiseen. nimiPuoli/siirto tarkistettava kuvasta; ennallaan (Nasone vasen, Norsu oikea; Banca Romanalla ei ole).
- Palazzo Maffei Marescottin sijainti 2 lähdettä, mutta että Banca Romana oli siellä, vain Turismo Roma (1 lähde); paikka tarkistettava kuvasta (KK a).
- Meta Sudans: Wikidata ja OSM voivat olla yhtä alkuperää; tarkistettava kuvasta. Purkuvuosi 1936 (Marlowe + Turismo Roma) vs 1933 (hakutiiviste).
- Nasone: sijoitus tarkistettava kuvasta; vuosi 1872 / 1874 eroaa lähteissä (teksti kertoo molemmat).

### Tekstit, jotka vaativat KK:n silmäyksen
- Torre Argentinan täkynoston otsikko on uusi ("Kissat asuvat paikassa, jossa Caesarin uskotaan tulleen murhatuksi"); lunastus on sama teksti kuin syvennyksessä. Symboli jäi 'elain' (täkynosto ei ole tarinapaikkatestissä, koska piste kantaa kahta nostoa).
- Kolikon teksti sisältää CoinsWeeklyn Kampmannin lähdemaininnan kolikkotavan iästä (yksi lähde, ristiriidassa ANSA:n kanssa; luonnoksen mukainen, ei KK:n h-listalla).
- Torre Argentinan "yli 200 kissaa" (vain Discover) ja Michelangelon "Getty / EBSCO" ovat luonnoksen mukaiset lähdemaininnat.
- Banca Romanan tyyppi 'henkilo' ei sovi pankille; ennallaan.

### Sääntö 11: samat virheet muualla (ei kosketettu)
- js/packs/europe-kulttuuri.js Rooman kulttuurivisan `fact` ("kaltevuus oli paikoin vain 30 senttiä kilometrillä"); testit vaativat vain sanat kalte/laske/kaar, joten korjaus on mahdollinen mutta kulttuurivisat ovat oma kokonaisuutensa.
- js/packs/fokusvirta-rooma.js oppitunti ja Trevin suihkulähde -juttu (nahtavyysjutut.js): "Aqua Virgo 22 kilometriä maan alla", Salvin aloitusvuosi 1732 (lähteissä 1730 / 1732) ja Klemens XII / XIII; ei tarkistettu.
- pulu-esigenerointi/KAUMAA/vienti/pulu/vastaukset/v1/ITA.json: vanhat vastaukset (mm. Rooman kolikko ja nasone).
- kulttuuri-kategoriat.js, "Ilmainen Rooma" -osio: "yli kaksituhatta pientä juomavesihanaa" ja "osa vedestä kulkee yhä antiikin akveduktien reittejä" (ei kahden lähteen tukea); lehden historia-osion pitkä kommentti (rivit ~14595) kuvaa vanhan tekstin väitteitä.
- tools/miniatyyri-mitat.json, sw.js ja tools/vienti/mediakuvat.json: ennallaan (nimet eivät vaihtuneet).

## Äänitetyt kappaleet, jotka muuttuivat

Ennen tätä PR:ää kaikki Rooman nähtävyysjuttujen, skandaalin, hetken ja nostojen kappaleet paitsi Meta Sudansin kolme olivat äänitettyjä (manifesti v21). Vanhan (origin/main) ja uuden sisällön viennin vertailu (tools/aanitysjono/tarkista.mjs kappalejako) antaa: äänitetyistä muuttui 42 kappalepaikkaa (30 eri tekstiä, koska sama teksti on jutussa, täkynostossa ja fokusvirrassa); uusia äänittämättömiä kappalepaikkoja syntyi 77 ja jonoon lisättiin 38 riviä (sama teksti jakaa avaimen), Meta Sudansin vanhat 3 riviä siivottiin. Äänitystä ei tehty; KK:n hyväksyntä ja riippumaton tarkistus ennen ääntä (lahteet-ja-tarkistus 10). Lista alla: kappaleen alku (vanha, äänitetty teksti), paikat ja syy.

### Banca Romana
Syy: Banca Romana: "numerot loppuvat kesken" (keksitty selitys), "Italian keskuspankki" (anakronismi, 1893 yksi kolmesta setelipankista), "sivutuotteena", "kaatoi hallituksen" (nyt Giolitti erosi 1893 lopulla) ja vanhan pitkän tekstin luvut (135/75 milj., 1881, pidätys, Crispi) eivät täyttäneet kahden lähteen sääntöä; 1873-kappale lisätty.
- "Banca Romana. Kun setelipainossa loppuvat numerot kesken, voi tietysti painaa samat numerot kahdesti — näin ajateltiin Banca Romanassa. Skandaali kaatoi hallituksen ja synnytti sivutuotteena Italian keskuspankin. Harva pankkikr …"
  avain 4957bc55; paikat: nahtavyysjutut / Banca Romana pala 1
- "Banca Romanan skandaali. Kun setelipainossa loppuvat numerot kesken, voi tietysti painaa samat numerot kahdesti — näin ajateltiin Banca Romanassa. Skandaali kaatoi hallituksen ja synnytti sivutuotteena Italian keskuspankin. Har …"
  avain 16fc1ec8; paikat: skandaalit / banca-romana-1893 pala 1
- "Italiassa oli kuusi setelinanto-oikeuden saanutta pankkia, ja Banca Romana oli niistä yksi. Sen pääjohtajaksi tuli 1881 Bernardo Tanlongo, entinen maatyöläinen, jota Corriere della Sera kuvasi puolilukutaitoiseksi mutta nerokka …"
  avain 9a599f65; paikat: skandaalit / banca-romana-1893 pala 2
- "Kesäkuussa 1889 valtion tarkastus löysi, että 91 prosenttia pankin varoista oli kiinni epälikvideissä kohteissa ja että pankki oli painattanut seteleitä samoilla sarjanumeroilla kahdesti. Pääministeri Francesco Crispi ja valtio …"
  avain e59c13e6; paikat: skandaalit / banca-romana-1893 pala 3
- "Kansanedustaja Napoleone Colajanni luki raportista otteita parlamentissa 20. joulukuuta 1892. Asiantuntijakomission raportti 18. tammikuuta 1893 vahvisti luvut: liikkeessä oli 135 miljoonaa liiraa seteleitä, kun laki salli 75 m …"
  avain c9d05471; paikat: skandaalit / banca-romana-1893 pala 4
- "Tanlongo pidätettiin seuraavana päivänä ja vapautettiin syytteistä heinäkuussa 1894 perusteella, jonka mukaan varsinaiset rikolliset olivat muualla. Giolitti oli eronnut jo marraskuussa 1893. Elokuun 1893 pankkilaki purki Banca …"
  avain 2415f681; paikat: skandaalit / banca-romana-1893 pala 5

### Michelangelo 1510
Syy: Michelangelo: "pakotti", dukaatit (yksi lähde, KK:n sääntö), giornata ja "hakataan pois", home, "syyskuussa 1510" (nyt elokuu 1510), "Nooan juopumuksesta Eevan luomiseen", Bologna/telineet, "15. elokuuta", "yli 300 hahmoa" ja ikä 37 (oikein 35, ei tekstissä) eivät täyttäneet sääntöä; 1873-kappale lisätty.
- "Michelangelo 1510. Niska ei enää suoristu illalla, ja maali tippuu silmille. Michelangelo Buonarroti seisoo — ei makaa, vaikka niin kerrotaan — telineellä pää taaksepäin taivutettuna ja maalaa Sikstuksen kappelin holvia. Paavi  …"
  avain c8e422a8; paikat: nahtavyysjutut / Michelangelo 1510 pala 1
- "Michelangelo 1510 — Sikstuksen katto. Niska ei enää suoristu illalla, ja maali tippuu silmille. Michelangelo Buonarroti seisoo — ei makaa, vaikka niin kerrotaan — telineellä pää taaksepäin taivutettuna ja maalaa Sikstuksen kapp …"
  avain 252c219a; paikat: historianHetket / michelangelo-sikstus-1510 pala 1
- "Rappauksen kosteus tuo homeen, ja ensimmäiset kuukaudet joudutaan tekemään uudelleen. Syyskuussa 1510 holvin ensimmäinen puolisko, Nooan juopumuksesta Eevan luomiseen, on valmis, ja työ katkeaa: paavi on lähtenyt sotaan Bologna …"
  avain 4da36b4b; paikat: historianHetket / michelangelo-sikstus-1510 pala 2

### Kolikko olan yli
Syy: Kolikko olan yli: "oikealla kädellä vasemman olan yli", "3 000 euroa joka päivä", "ruoka-apu" ja noukkimiskielto eivät täyttäneet sääntöä; nyt vuoden 2022 summa ja Caritas; Trevin suihkulähde -jutun vastaava virke (K2) korjattu samalla.
- "Perinteen mukaan olan yli lähteeseen heitetty kolikko takaa paluun Roomaan. Kolikoita kertyy joka päivä noin 3 000 euron edestä, ja kaikki rahat lahjoitetaan hyväntekeväisyysjärjestölle, joka auttaa vähävaraisia. Lähde on nähty …"
  avain 14f290cc; paikat: nahtavyysjutut / Trevin suihkulähde pala 3
- "Kolikko olan yli. Trevin lähteeseen heitetään kolikko oikealla kädellä vasemman olan yli: tarinan mukaan se takaa paluun Roomaan. Kolikoita putoaa veteen noin kolmentuhannen euron edestä joka päivä, ja ne kerätään pohjasta talt …"
  avain 4245ac0d; paikat: nahtavyysjutut / Kolikko olan yli pala 1
- "Kolikko olan yli. Trevin lähteeseen heitetään kolikko oikealla kädellä vasemman olan yli: tarinan mukaan se takaa paluun Roomaan. Kolikoita putoaa veteen noin kolmentuhannen euron edestä joka päivä, ja ne kerätään pohjasta talt …"
  avain 83f40a4a; paikat: takynostot / rooman-kolikko pala 1; fokusvirta-takynostot / rooman-kolikko pala 1
- "Rahat lahjoitetaan Caritakselle hyväntekeväisyyteen — ruoka-apuun kaupungin vähävaraisille. Omaa kolikkoa ei saa noukkia takaisin: se on kiellettyä, ja yrittäjiä jää säännöllisesti kiinni."
  avain 006f1325; paikat: takynostot / rooman-kolikko pala 2; fokusvirta-takynostot / rooman-kolikko pala 2

### Aqua Virgo
Syy: Aqua Virgo: "lähes sadan km", "vuorilta", 30 cm/km, "neljä metriä / 20 km", "melkein koko matkansa maan alla" ilman lähdettä ja neito-taru (yksi lähde) pois; "jopa yksitoista"; 1873-kappale lisätty.
- "Aqua Virgo. Roomaan rakennettiin yksitoista akveduktia, jotka toivat vuorilta vettä lähes sadan kilometrin päästä. Ne toimivat pelkällä painovoimalla: kaltevuus oli paikoin vain kolmekymmentä senttiä kilometriä kohti. Yksi niis …"
  avain 3b9e8caf; paikat: nahtavyysjutut / Aqua Virgo pala 1
- "Vesi kulkee yhä. Roomaan rakennettiin yksitoista akveduktia, jotka toivat vuorilta vettä lähes sadan kilometrin päästä. Ne toimivat pelkällä painovoimalla: kaltevuus oli paikoin vain kolmekymmentä senttiä kilometriä kohti. Yksi …"
  avain 21be9aad; paikat: takynostot / aqua-virgo pala 1; fokusvirta-takynostot / aqua-virgo pala 1
- "Se syöttää yhä Trevin lähdettä. Nimi tarkoittaa neitoa: tarun mukaan nuori tyttö näytti janoisille sotilaille lähteen, josta vesi otettiin."
  avain d803ec4a; paikat: takynostot / aqua-virgo pala 2; fokusvirta-takynostot / aqua-virgo pala 2

### Torre Argentina
Syy: Torre Argentina: "vuonna 1927" (oikein 1926–1929), "Italian yhdistymisen jälkeen", jättipatsaan pää ja käsivarret (yksi lähde, KK:n sääntö), "pala Pompeiuksen teatteria", "temppeli D:n kohdalla", avain ja 1950-luku, "virallinen tappamaton suoja", "30 000 nimeä", "kissat jäivät" sekä täkynoston temppeli D / laki 281/1991 -väitteet eivät täyttäneet sääntöä; 1873-kappale lisätty.
- "Torre Argentina. Kun Roomaa rakennettiin uusiksi Italian yhdistymisen jälkeen ja korttelia purettiin vuonna 1927, maasta tuli esiin jättiläispatsaan pää ja käsivarret. Alta löytyi neljä tasavallan ajan temppeliä ja pala Pompeiu …"
  avain b0766a6e; paikat: nahtavyysjutut / Torre Argentina pala 1
- "Rooman kuuluisin kissalauma asuu temppelissä, joka luvattiin merenkulkijoiden jumalille kesken meritaistelua. Kissasuoja ei ole raunion vieressä vaan raunion sisällä. Se toimii temppeli D:n kohdalla — Largo di Torre Argentinan  …"
  avain 9895b0cd; paikat: takynostot / kissat pala 1; fokusvirta-takynostot / kissat pala 1
- "Kissojen oikeus jäädä ei ole tunneasia vaan lakikysymys. Italian parlamentti sääti vuonna 1991 lain numero 281, joka antoi kulkukissoille oikeuden elää vapaana ja turvassa ja teki niiden hoitajista virallisen instituution. Suoj …"
  avain 7983a824; paikat: takynostot / kissat pala 2; fokusvirta-takynostot / kissat pala 2
- "Largo di Torre Argentinan kissapyhäkkö. Kun Roomaa rakennettiin uusiksi Italian yhdistymisen jälkeen ja korttelia purettiin vuonna 1927, maasta tuli esiin jättiläispatsaan pää ja käsivarret. Alta löytyi neljä tasavallan ajan te …"
  avain 2faeb2aa; paikat: fokusvirta-takyt / kissat pala 1
- "Ne asuvat siellä yhä: temppeli D:n kohdalla toimii kissasuoja, jota on 1950-luvulta lähtien pidetty yllä avaimella, joka on kulkenut näyttelijältä toiselle — mukana muun muassa Anna Magnani. Vuodesta 1993 se on ollut virallinen …"
  avain 0ee80e2e; paikat: fokusvirta-takyt / kissat pala 2

### Areenan kellari
Syy: Areenan kellari: "kahdeksankymmentä pystykuilua" nyt "noin 80" lähdemaininnalla (Walks of Italy, The Collector; luvut 28/60 nostimille ristiriidassa), harena ja sotalaivaston merimiehet (yksi lähde) pois; 1873-kappale lisätty.
- "Areenan kellari. Colosseumin areena oli puulattia, jonka päälle levitettiin hiekkaa — latinan hiekkaa tarkoittavasta sanasta harena tulee sana areena. Lattian alla oli kaksikerroksinen kellari: käytäviä, häkkejä ja kahdeksankym …"
  avain 34112983; paikat: nahtavyysjutut / Areenan kellari pala 1
- "Leijona nousi lattian alta. Colosseumin areena oli puulattia, jonka päälle levitettiin hiekkaa — latinan hiekkaa tarkoittavasta sanasta harena tulee sana areena. Lattian alla oli kaksikerroksinen kellari: käytäviä, häkkejä ja k …"
  avain 9d7df8cc; paikat: takynostot / colosseumin-kellari pala 1; fokusvirta-takynostot / colosseumin-kellari pala 1
- "Vinssi nosti häkin kuilua pitkin lattian tasalle, luukku aukesi, ja eläin ilmestyi keskelle areenaa kuin tyhjästä. Katsomon yllä oli kangaskatto auringolta, ja sitä kelasivat auki sotalaivaston merimiehet."
  avain 6f008e3b; paikat: takynostot / colosseumin-kellari pala 2; fokusvirta-takynostot / colosseumin-kellari pala 2

### Norsu ja obeliski
Syy: Norsu ja obeliski: "marmorinen", "pienin" (virhe, nyt "yksi pienimmistä"), "enemmän obeliskeja kuin missään" (yksi lähde) ja lempinimen selitys (pulcino ei tarkoittanut possua) korjattu; 1873-kappale lisätty.
- "Norsu ja obeliski. Piazza della Minervan aukiolla seisoo marmorinen norsu, jonka selässä nousee punagraniittinen obeliski. Sen suunnitteli Gian Lorenzo Bernini, veisti hänen apulaisensa Ercole Ferrata, ja se paljastettiin vuonn …"
  avain 3c63877b; paikat: nahtavyysjutut / Norsu ja obeliski pala 1
- "Norsu kantaa obeliskia. Piazza della Minervan aukiolla seisoo marmorinen norsu, jonka selässä nousee punagraniittinen obeliski. Sen suunnitteli Gian Lorenzo Bernini, veisti hänen apulaisensa Ercole Ferrata, ja se paljastettiin  …"
  avain 9d84d96a; paikat: takynostot / minervan-norsu pala 1; fokusvirta-takynostot / minervan-norsu pala 1
- "Roomalaiset antoivat patsaalle lempinimen pulcino, tipu, vaikka sana tarkoitti tuolloin possua: norsu oli heidän mielestään pieni ja pyöreä."
  avain 0bce55cb; paikat: takynostot / minervan-norsu pala 2; fokusvirta-takynostot / minervan-norsu pala 2

### Nasone
Syy: Nasone: "valurautaisia" (alun perin), "yötä päivää" (yleensä), "ristivät nasoneiksi 1870-luvulla" (nimi tuli vasta myöhemmästä mallista), "vanhimpia yhä toimivia" ja "kotihanoissa" ilman lähdemainintaa korjattu; 1873-kappale lisätty.
- "Nasone. Rooman kaduilla seisoo valurautaisia pylväitä, joiden koukkuputkesta juoksee vettä yötä päivää. Ensimmäiset pystytettiin 1870-luvulla, ja roomalaiset ristivät ne nasoneiksi eli isoiksi neniksi. Niitä on kaupungissa yhä  …"
  avain 037985f1; paikat: nahtavyysjutut / Nasone pala 1
- "Iso nenä joka kulmassa. Rooman kaduilla seisoo valurautaisia pylväitä, joiden koukkuputkesta juoksee vettä yötä päivää. Ensimmäiset pystytettiin 1870-luvulla, ja roomalaiset ristivät ne nasoneiksi eli isoiksi neniksi. Niitä on  …"
  avain ff9d6589; paikat: takynostot / rooman-nasone pala 1; fokusvirta-takynostot / rooman-nasone pala 1
- "Putken päällä on pieni reikä: kun putken suun tukkii sormella, vesi suihkuaa reiästä ylöspäin ja janoinen juo kumartumatta. Vanhimpia yhä toimivia seisoo Pantheonin vieressä Piazza della Rotondalla."
  avain ffd3e2fc; paikat: takynostot / rooman-nasone pala 2; fokusvirta-takynostot / rooman-nasone pala 2

## Testit

- Rebasen jälkeen (origin/main 771e31d9c2, Wienin PR 6895 mukana) koko `node --test "tests/*.test.mjs"`: 5909 testiä, 5894 läpi, 0 kaatui, 15 ohitettu.
- `node tools/aanitysjono/tarkista.mjs --lisaa --siivoa`: ÄÄNITYSJONO OK (puuttuvat 212, kaikki jonossa; Rooma 31 + ITA 2).
- Äänitetyistä muuttuu 42 kappalepaikkaa (30 eri tekstiä), lista yllä.
