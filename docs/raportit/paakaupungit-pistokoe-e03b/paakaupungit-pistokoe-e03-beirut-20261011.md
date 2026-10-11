# Pääkaupunkilehden pistokoe: BEIRUT (erä e03, 11.10.2026)

Tarkistaja: Sonnet-agentti. Aineisto (vain luku): `pk-e03b/paakaupungit-pilvi/e03/beirut/` (sisalto.json, faktapohja.md, kuvat.md, tarkistus.md, konteksti.json). Aineistoon ei ole tehty korjauksia; kaikki "Korjattu lause" -rivit ovat ehdotuksia. Lehti sijoittuu isoisän vuoteen 1873, mutta kertoo nykyajasta, joten väitteet on arvioitu nykytiedon mukaan. Libanonin sisällissotaan ja vuoden 2020 räjähdykseen ei kosketa (ne ovat tarkoituksella pois lehdestä); sanasto tarkistetuissa kohdissa on neutraalia.

Menetelmä: kolme nostoa valittu luku- ja vuositiheyden mukaan: `kaupunkilehti[0].nostot[0]` Kaivojen kaupunki (Amarna-kirjeet, 1300-luku eaa.), `[0].nostot[1]` Lakikoulun kaupunki (64 eaa., 551, 500-luku), `[0].nostot[2]` Silkkiä ja koulu kukkulalla (1832, 1866, 1870-luku, 1800-luvun jälkipuolisko). Lisäksi kaikki viisi `kysymykset[].fact` sekä artikkelin väestöluku (laajuus) ja "yli viisi tuhatta vuotta" -väite. Ilmastolukuja ei tarkistettu. Jokainen väite vähintään kahdella itsenäisellä lähteellä: Wikipedia + Britannica (1911-painos Wikisourcessa; nykyisen Britannican 403-sivut hakutuloksen kautta), AUB:n oma historiasivu (aub.edu.lb), USJ:n oma historia (hakutuloksen kautta), Livius.org, RPC Online / Pepperdine-kolikkokatalogit (hakutuloksen kautta), British Museum (403, hakutuloksen kautta), Solidere (403, hakutuloksen kautta), Libanonin Yhdysvaltain-suurlähetystö (hakutuloksen kautta), EBSCO Research Starters (hakutuloksen kautta), UN World Urbanization Prospects 2025 Worldometerin kautta (hakutuloksen kautta), MIT-väitöskirja Beirutista 1830–1930 (hakutuloksen kautta). Wikipedian kieliversioita ja sen peilisivuja ei ole laskettu itsenäisiksi. Merkintä "hakutuloksen kautta" = sivua ei haettu suoraan (403/404/429/421), vaan tieto on hakutuloksen otteesta; hakukoneen otteiden alkuperäislähteitä ei aina avattu.

Menettelyhuomautus (robots.txt): tarkistin robots.txt-tiedostot jälkikäteen. citypopulation.de kieltää Claude-User-tunnuksen (Disallow: /), ja WebFetch-haku sille tehtiin ennen tarkistusta; Flickrin robots.txt:n käyttäjäagenttilista sisältää myös Claude-User. En käytä näiden kahden suorien hakujen tietoja todisteena: väestöluvut 433 249 / lähde Ministry of Public Health / pakolaishuomautus on vahvistettu erikseen hakutuloksen otteesta (Wikipedia Beirut Governorate + citypopulation-otteet), ja kolikon metalli RPC-katalogin otteesta. Livius, Wikipedia, Wikisource, AUB ja greatruns sallivat haun. Commons-tiedot haettu Commonsin API:sta (extmetadata, yksi pyyntö kerrallaan, tunnistautuen) ja kuvat katsottu 960 px:n esikatselukuvina Read-työkalulla.

## 1. Yhteenveto

Väitteet (24 väitettä tai väiteryhmää): **OIKEIN 16, EPÄTARKKA 8, VIRHE 0.**

Kuvat (5 tarkistettua: kansi 1 ja 2, kolme nostokuvaa): **OIKEIN 4, EPÄTARKKA 1, VIRHE 0.** Kaikki tiedostot ovat Commonsissa, lisenssit (Commonsin tarkka muoto) ja tekijät täsmäävät lähderiveihin. Ei väkivaltaa. Kasvot: vain Hadrianuksen muotokuva kolikossa (ei yksityishenkilö) ja pikkuruiset hahmot kansikuvassa ja College Hall -kuvassa. Tekstiä: kolikon COL BER. PD-kuvan tekijän kuolemasta alle 70 v: yksi huomio (Matson, ks. kuvat).

Kahdeksan löydöstä:

1. **Papinianus ja Ulpianus "opettivat" Berytuksen koulussa Severusten aikana** (N[1], EPÄTARKKA). Väite on Wikipedian Beirut-artikkelissa, joka viittaa Britannicaan (Britannican Lebanon-artikkeli sanoo saman, hakutuloksen kautta), eli lähteet eivät ole itsenäiset. Wikipedian oma "Law school of Berytus" -artikkeli ei väitä, että he opettivat siellä; se sanoo vain, että kurssi perustui heidän teoksiinsa. Koulun alkuperä on "hämärä" ja ensimmäinen kirjallinen maininta on vuodelta 238–239. Ulpianuksen yhteys Berytukseen on hakutuloksen mukaan tutkimuksessa "Berytus tai todennäköisemmin Rooma".
2. **Amarna-kirjeet "kolmessa kirjeessä"** (N[0], EPÄTARKKA, lievä). Ammunira kirjoitti kolme kirjettä (EA 141–143), mutta Beirut mainitaan myös muissa kirjeissä (Rib-Haddan kirjeet, esim. EA 105 Beirutin kanssa käyty riita), joten "esiintyy jo kolmessa" vääristää.
3. **Saari Beirutjoessa** (N[0], EPÄTARKKA): vain Wikipedia ja sen peilit; Soliderein arkeologiasivu (hakutuloksen kautta) kuvaa tellin ja lahden, EBSCO "kaksi saarta suiston alueella". Ei itsenäistä vahvistusta, ajoitusta ei ole.
4. **Pompeius "valloitti" kaupungin 64 eaa. ja nimi "palautettiin"** (N[1], EPÄTARKKA, lievä). Vuosi 64 eaa. tuki on Syyrian liittäminen Roomaan (Pompeiuksen järjestely), mutta Berytus-artikkeli itse sanoo, että kaupunki "nimettiin Berytukseksi" (viittaus foinikialaiseen kylään), ei että vanha nimi palautettiin; Livius mainitsee vain, että Pompeius käytti kaupunkia laivastotukikohtana merirosvosodassa.
5. **Silkki teki Beirutista suuren sataman** (N[2], EPÄTARKKA, lievä): syy-seuraus on Wikipedian muotoilu; MIT-väitöskirja kuvaa kasvun laajempana transiittikauppana (Euroopan tavaroiden jälleenvienti), ei pelkkänä silkkinä. Teksti pudottaa myös "ja muut vientituotteet" ja lähdeviittauksen.
6. **Corniche "4,8 km"** (kysymykset[2], EPÄTARKKA): luku on vain Wikipedian Corniche-artikkelissa, jossa kappale on merkitty "better source needed", ja sen peilisivuilla. Muut lähteet antavat 3,7 km (Zaitunay Bay–Raouché), noin 5 km ja jopa 7–10 km (al-Manaran Corniche), riippuen mistä mitataan. Kysymyksen "noin viiden kilometrin" kestää, tarkka 4,8 ei.
7. **Väestön laajuus: "suurkaupunkialueella yli kaksi miljoonaa"** (artikkeli.intro, EPÄTARKKA, lievä): kaupungin luku 433 249 on nimetty oikein (Beirutin kuvernementti, ei Suur-Beirut), mutta metroluvun vuosi ja määritelmä puuttuvat. YK:n WUP 2025 antaa taajamalle noin 1,79 milj., Wikipedia (World Bank) Suur-Beirutille 2,4 milj. (2025).
8. **Raouchén nimi "tulee ranskan sanasta rocher"** (kansikuvat[1].selite, EPÄTARKKA): yhden lähteen (Wikipedia-merkintä "single source") väite, jonka rinnalla on arameasta/arabiasta "pää" -selitys; lisäksi nimen etymologia ei näy kuvassa.

**Toistuvan virhetyypin arvio (yksi rivi):** yhden lähteen (pääosin Wikipedia, joka viittaa toiseen hakuteokseen) kiistanalainen tai yksinkertaistettu perinnetieto esitetään varmana (7 kaikista 8 EPÄTARKKA-väitteestä: Papinianus/Ulpianus, saari, "kolme kirjettä", Pompeius, silkki, Corniche, Raouchén nimi) ja yksi laajuus (metroväkiluku); ei yhtään VIRHETTÄ, ei sota-aihevirheitä, kuvateksteissä vain yksi etymologiaylimääräys (ei kuvan sisältöä vastaan).

## 2. Väitetaulukko

Polut ovat sisalto.json:n polkuja. "N" = `kaupunkilehti[0].nostot`, "Q" = `kysymykset`.

| # | Väite | Polku | Tulos |
|---|---|---|---|
| 1 | Nimi < foinikian bīʾrōt "kaivot", viittaa pohjaveteen | N[0].teksti; Q[0].fact; artikkeli.intro | OIKEIN |
| 2 | Nimi kolmessa akkadinkielisessä Amarna-kirjeessä 1300-luvulta eaa., kuningas Ammunira Birutasta kirjoittaa faaraolle | N[0].teksti | EPÄTARKKA (lievä) |
| 3 | Kreikkalaiset Bērytós, roomalaiset Berytus | N[0].teksti | OIKEIN |
| 4 | Varhaisin asutus saarella Beirutjoessa, kanava liettyi, saari katosi | N[0].teksti | EPÄTARKKA |
| 5 | Pompeius valloitti kaupungin 64 eaa., nimi Berytus palautettiin | N[1].teksti; artikkeli.teksti | EPÄTARKKA (lievä) |
| 6 | Augustuksen aikana roomalainen siirtokunta | N[1].teksti; artikkeli.teksti | OIKEIN |
| 7 | "Lähteen mukaan" idän provinsseissa erityisen roomalainen kaupunki | N[1].teksti; artikkeli.teksti | OIKEIN (huom.) |
| 8 | Papinianus ja Ulpianus opettivat koulussa Severusten aikana | N[1].teksti | EPÄTARKKA |
| 9 | Justinianus tunnusti koulun 500-luvulla yhdeksi kolmesta virallisesta lakikoulusta | N[1].teksti; artikkeli.teksti | OIKEIN |
| 10 | Maanjäristys 551 raunioitti rannikkoa; opiskelijat siirrettiin Sidoniin; Berytuksessa kuoli "tuhansia" | N[1].teksti; artikkeli.teksti | OIKEIN |
| 11 | Ibrahim Pashan vallattua Akkon 1832 Beirut alkoi elpyä | N[2].teksti; artikkeli.teksti | OIKEIN |
| 12 | Kauppayhteydet Eurooppaan (Ranska); silkki teki Beirutista suuren sataman | N[2].teksti; artikkeli.teksti; johdanto | EPÄTARKKA (lievä) |
| 13 | Syrian Protestant College avattu 1866 | N[2].teksti; artikkeli.teksti | OIKEIN |
| 14 | Kampuksen ensimmäiset rakennukset käyttöön 1870-luvun alussa | N[2].teksti | OIKEIN |
| 15 | Université Saint-Joseph perustettu 1800-luvun jälkipuoliskolla | N[2].teksti; artikkeli.teksti | OIKEIN |
| 16 | Q0: bīʾrōt "kaivot" | Q[0].fact | OIKEIN (sama kuin 1) |
| 17 | Q1: yksi kolmesta virallisesta lakikoulusta; juristien tekstit vaikuttivat Justinianuksen kokoelmaan; hint: koulu siirrettiin Sidoniin 551 | Q[1].fact, .hint | OIKEIN (huom.) |
| 18 | Q2: Corniche 4,8 km, Saint George -lahdelta Raouchén kautta | Q[2].fact | EPÄTARKKA |
| 19 | Q3: Nejmehin kellotornin lahjoitti "libanonilaissyntyinen" siirtolainen Michel Abed; "nelisivuinen kello" | Q[3].fact, .q | EPÄTARKKA (lievä) |
| 20 | Q4: College avasi ovensa 3.12.1866 16 opiskelijalla; hint: opetus aluksi arabiaksi | Q[4].fact, .hint | OIKEIN |
| 21 | Asuttu yli 5 000 vuotta, "yksi maailman vanhimmista" | artikkeli.intro; kaupunkilehti[0].johdanto | OIKEIN (huom.) |
| 22 | Kaupungin asukasluku 433 249 (2017) | artikkeli.intro | OIKEIN (huom.) |
| 23 | Suurkaupunkialueella yli kaksi miljoonaa (laajuus) | artikkeli.intro | EPÄTARKKA (lievä) |
| 24 | Q3 hint: Nejmehin aukion toinen nimi Place de l'Étoile | Q[3].hint | OIKEIN |

## 3. Perustelut lähteineen ja korjatut lauseet

### Epätarkat

**2. Amarna-kirjeet (EPÄTARKKA, lievä).** Wikipedia (Beirut, Etymology): nimi "first attested in the 14th century BC ... three Akkadian cuneiform tablets of the Amarna letters, letters sent by King Ammunira" (EA 141–143, viite Moran 1992). Wikipedia Ammunira: "authored letters EA 141-43" ja "mentioned in several of the Amarna letters". British Museum (hakutuloksen kautta, 403): savitaulu E29809 = Knudtzon 141, Ammunira Beirutista Egyptin kuninkaalle, akkadi. Beirut esiintyy kuitenkin myös muissa kirjeissä (Rib-Hadda: EA 105 Beirutin hallitsijan takavarikoimista aluksista, hakutuloksen kautta; EA 136–138 turvapaikka Ammunirassa). "Esiintyy jo kolmessa kirjeessä" on siis Wikipedian yksinkertaistus. Lähteet: https://en.wikipedia.org/wiki/Beirut ; https://en.wikipedia.org/wiki/Ammunira ; https://www.britishmuseum.org/collection/object/W_1888-1013-80 ; https://en.wikipedia.org/wiki/Rib-Hadda .
- `.kaupunkilehti[0].nostot[0].teksti`. Korjattu lause: "Nimi esiintyy jo 1300-luvun eaa. Amarna-kirjeissä, ja kuningas Ammunira Birutasta kirjoitti Egyptin faaraolle kolme akkadinkielistä kirjettä."

**4. Saari Beirutjoessa (EPÄTARKKA).** Vain Wikipedian Beirut-artikkeli ("earliest settlement ... island in the Beirut River") ja sen peilit; EBSCO Research Starters (hakutuloksen kautta) puhuu "kahdesta saaresta Beirutjoen suistossa" kivikaudella; Solidere (hakutuloksen kautta) ajoittaa Tellin linnoitetun keskuksen noin 2500 eaa. lahden äärelle. Itsenäisiä, ajoitettuja arkeologisia lähteitä saarelle ei löytynyt. Lähteet: https://en.wikipedia.org/wiki/Beirut ; https://www.ebsco.com/research-starters/geography-and-cartography/beirut-lebanon/ ; https://www.solidere.com/city-center/history-and-culture/archeology .
- `.kaupunkilehti[0].nostot[0].teksti`. Korjattu lause: "Lähteen mukaan varhaisin asutus oli saarella Beirutjoen suistossa, mutta saaren ja rannan välinen kanava liettyi umpeen." (tai lause pois.)

**5. Pompeius 64 eaa. (EPÄTARKKA, lievä).** Wikipedia Beirut: "conquered by Pompey in 64 BC and the name Berytus was restored". Wikipedia Berytus: "conquered by the Romans of Pompey in 64 BCE ... renamed Berytus" (viitteet Lonely Planet, DownTownBeirut.com, ICA). Hakutuloksen otteet (NumisWiki, Linda Jones Hall, hakutuloksen kautta): kaupunki tuli Rooman alaisuuteen 64 eaa. Pompeiuksen Syyria-järjestelyn osana. Livius: Pompeius käytti Berytusta laivastotukikohtana; ei vuotta eikä "valloitusta". Nimi ei "palautettu", vaan kaupunki sai uuden nimen Berytus (aiemmin Laodikeia). Lähteet: https://en.wikipedia.org/wiki/Beirut ; https://en.wikipedia.org/wiki/Berytus ; https://www.livius.org/articles/place/berytus-beirut/berytus-2/ ; https://www.forumancientcoins.com/numiswiki/view.asp?key=berytus .
- `.kaupunkilehti[0].nostot[1].teksti` ("Kun Pompeius valloitti kaupungin vuonna 64 eaa., nimi Berytus palautettiin ja kaupunki liitettiin Rooman valtakuntaan"), `.artikkeli.teksti` ("liitettiin Roomaan, kun Pompeius valloitti kaupungin vuonna 64 eaa."). Korjattu lause: "Kaupunki joutui Rooman haltuun vuonna 64 eaa., kun Pompeius järjesteli Syyrian Rooman maakunnaksi, ja se sai nimen Berytus."

**8. Papinianus ja Ulpianus (EPÄTARKKA).** Wikipedia Beirut (raakateksti): "Papinian and Ulpian, were natives of Phoenicia and taught there under the Severan emperors" — viite Britannica. Britannican Lebanon-artikkeli (hakutuloksen kautta, 403) sanoo saman, joten kaksi lähdettä on yksi. Wikipedia "Law school of Berytus" ei väitä opettamista, vaan että *Omnem*-asetuksen mukainen kurssi perustui Gaiuksen, Ulpianuksen, Papinianuksen ja Paulluksen teoksiin ja kolmannen vuoden opiskelijoita sanottiin *Papinianistae*. Koulun perustamisaika on "paljon kiistelty" ja varhaisin kirjallinen maininta 238–239 jaa. (Gregorios Thaumaturgos). Ulpianuksen opintojen paikaksi hakutulos mainitsee "Berytus tai todennäköisemmin Rooma". Lähteet: https://en.wikipedia.org/wiki/Beirut ; https://en.wikipedia.org/wiki/Law_school_of_Berytus ; https://www.britannica.com/place/Lebanon .
- `.kaupunkilehti[0].nostot[1].teksti` ("juristit Papinianus ja Ulpianus opettivat siellä Severusten aikana"). Korjattu lause: "Koulun opetus nojasi muun muassa roomalaisten juristien Papinianuksen ja Ulpianuksen kirjoituksiin."

**12. Silkki ja satama (EPÄTARKKA, lievä).** Wikipedia Beirut: "silk exports to Europe came to dominate the local economy", lähteen mukaan eurooppalainen kiinnostus Libanonin silkkiin ja muihin vientituotteisiin muutti kaupungin satamaksi. MIT-väitöskirja "The last Levantine City: Beirut, 1830–1930" (hakutuloksen kautta): kaupunki muuttui paikallisesta markkinasta eurooppalaisten tavaroiden jälleenvientiin keskittyväksi transiittikaupungiksi; ranskalaiset investoivat ensin silkkiteollisuuteen ja myöhemmin julkisiin töihin. Britannica 1911 (Wikisource) ei mainitse silkkiä. Syy-seuraus esitetään tekstissä ilman lähdettä ja yksinkertaistettuna. Lähteet: https://en.wikipedia.org/wiki/Beirut ; https://dspace.mit.edu/handle/1721.1/99273 ; https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Beirut .
- `.kaupunkilehti[0].nostot[2].teksti`, `.artikkeli.teksti`. Korjattu lause: "Lähteen mukaan eurooppalainen kiinnostus libanonilaiseen silkkiin ja muihin vientituotteisiin muutti Beirutin merkittäväksi satamaksi ja kauppakeskukseksi."

**18. Corniche 4,8 km (EPÄTARKKA).** Wikipedia Corniche Beirut: 4,8 km (3,0 mi), Saint George Bay → Place Rafic Hariri → Avenue de Paris → Raouché → Avenue de Gaulle; kappale on merkitty "better source needed". Muut: greatruns.com (sallittu): reitti Zaitunay Bay–Raouché 3,7 km, "koko reitti" Coral Beachille 7 km; hakutuloksen mukaan matkailusivut "lähes 5 km" ja blogi "10 km al-Manara Corniche". Itsenäistä lähdettä juuri 4,8 km:lle ei löytynyt (expatlife.ai toistaa saman luvun). Lähteet: https://en.wikipedia.org/wiki/Corniche_Beirut ; https://greatruns.com/the-corniche/ ; https://www.kupi.com/en-ae/explore/lebanon/beirut/corniche-el-manara .
- `.kysymykset[2].fact`. Korjattu lause: "Corniche on noin viiden kilometrin pituinen kävelybulevardi, joka kiertää niemen Saint George -lahdelta Raouchén kautta." (Muiden paikkojen "noin viiden kilometrin" kestää; tarkka "4,8" pois.)

**19. Nejmehin kellotorni (EPÄTARKKA, lievä).** Wikipedia Nejmeh Square: "gift from Lebanese-Brazilian émigré Michel Abed", 1930-luku, "four-faced Rolex clock". Hakutuloksen otteet: Solidere (403): Lebanese-Brazilian émigré, lahjoitus Libanonin hallitukselle; Lonely Planet: "Lebanese-Mexican"; Archnet (429): 1933, lahjoitus uudelle keskustalle. Siirtolaisuus ja lahjoittaja täsmäävät; "libanonilaissyntyinen" (syntymämaa) ei ole missään lähteessä (lähteet sanovat "émigré" ja kansalaisuus vaihtelee: Brasilia/Meksiko); "nelisivuinen kello" on vain Wikipedian (ja sen peilien) tieto. Lähteet: https://en.wikipedia.org/wiki/Nejmeh_Square ; https://solidere.com/node/288 ; https://archnet.org/sites/18747 ; https://www.lonelyplanet.com/points-of-interest/place-de-letoile/1591924 .
- `.kysymykset[3].fact` ja `.q`. Korjattu lause (fact): "Aukion 1930-luvun kellotornin lahjoitti libanonilaistaustainen siirtolainen Michel Abed." Kysymys: "... seisoo siirtolaisen lahjoittama kellotorni?" (ilman "jossa on nelisivuinen kello").

**23. Metroväkiluku (EPÄTARKKA, lievä).** Kaupungin luku: Wikipedia Beirut Governorate / citypopulation-ote: 433 249 (31.12.2017, Ministry of Public Health, sisältää rekisteröidyt syyrialaispakolaiset, ala 19,8 km²; Libanonissa ei ole pidetty väestönlaskentaa vuoden 1932 jälkeen). Suur-Beirut: Wikipedia (viite World Bank) 2,4 milj. (2025); YK:n WUP 2025 (Worldometerin kautta, hakutuloksen kautta): taajama 1 794 019 (2025), Macrotrends 2,38 milj. (2025), Demographia 1,92 milj. Teksti sanoo vain "yli kaksi miljoonaa" ilman vuotta; YK:n taajamamäärittelyllä luku jää alle kahden. Lähteet: https://en.wikipedia.org/wiki/Beirut_Governorate ; https://en.wikipedia.org/wiki/Beirut ; https://www.worldometers.info/population/largest-cities-in-lebanon/ ; https://www.macrotrends.net/global-metrics/cities/21773/beirut/population .
- `.artikkeli.intro` (viimeinen virke). Korjattu lause: "Asukkaita kaupungissa (Beirutin kuvernementti) on arvion mukaan 433 249 (31.12.2017, luku sisältää rekisteröidyt syyrialaispakolaiset), ja suurkaupunkialueella määritelmästä riippuen noin 1,8–2,4 miljoonaa."

### Oikeat (huomautuksin)

**1, 16 Nimi "kaivot".** Wikipedia (bīʾrōt); Britannica (hakutuloksen kautta): kanaanilainen be'erot "kaivot", viittaa pohjavesipintaan; CIA World Factbook (hakutuloksen kautta): "ber'ot". Vokaalit vaihtelevat lähteissä (rekonstruktioita). OIKEIN.

**3 Bērytós / Berytus.** Wikipedia; Livius (Berytus-nimi); Britannica 1911. OIKEIN.

**6 Augustuksen siirtokunta.** Wikipedia Berytus: Colonia Iulia Augusta Felix Berytus, 14 eaa.; Livius: Augustuksen aikana V Macedonican ja VIII Augustan veteraaneja, "ensimmäinen colonia Lähi-idässä". Vuotta ei tekstissä; OIKEIN.

**7 "Erityisen roomalainen".** Vain Wikipedia (viite Morgan) toteaa; teksti on lähdemuotoinen ("Lähteen mukaan"), ei tarkkaa lukua: kelvollinen. OIKEIN (huom.: itsenäistä toista lähdettä ei löytynyt; Livius tukee silti "ensimmäinen colonia Lähi-idässä").

**9 Justinianus 533.** Wikipedia Law school of Berytus (*Omnem*: Rooma, Konstantinopoli, Beirut) ja Britannica 1911 ("one of three official law schools" 533). Tekstissä vain "500-luvulla". OIKEIN.

**10 Maanjäristys 551.** Wikipedia (Law school; Sbeinati ym. 2005): 9.7.551, noin 30 000 kuoli (arvio); Livius: "thirty thousand reportedly"; Britannica 1911: opiskelijat siirrettiin Sidoniin. "Tuhansia" on varovaisempi kuin lähteet. OIKEIN.

**11 Ibrahim Pasha 1832.** Wikipedia Beirut; Britannica 1911 (hakutuloksen kautta ja Wikisource): "took Acre in 1832", jolloin pitkä kiistanalainen kausi päättyi. OIKEIN.

**13 SPC 1866.** AUB:n oma historiasivu: peruskirja 24.4.1863, ensimmäinen luokka 16 opiskelijaa 3.12.1866; Wikipedia AUB; Britannica (hakutuloksen kautta): luokat alkoivat 1866. OIKEIN.

**14 Ensimmäiset rakennukset 1870-luvun alussa.** AUB:n historiasivu: College Hallin kulmakivi 7.12.1871, College Hall ja ensimmäinen lääketieteen rakennus valmiit ja käytössä 1873; Wikipedia AUB: "put to use in 1873". Faktapohjassa "[Y]", mutta nyt kaksi lähdettä. OIKEIN.

**15 USJ.** USJ:n oma historia (hakutuloksen kautta): seminaari ja koulu siirrettiin Beirutiin 30.10.1875, rakennukset vihittiin 3.11.1875; Wikipedia USJ: siirto Beirutiin 1875, Ghazir 1855; Wikipedia Timeline of Beirut: 1875. Teksti "1800-luvun jälkipuoliskolla" kestää. OIKEIN.

**17 Q1.** Britannica 1911 ja Wikipedia Law school: kolme virallista lakikoulua; Berytuksen professorit (Dorotheos, Patricius) osallistuivat Digestan ja Institutionesin laatimiseen; Britannica Lebanon (hakutuloksen kautta): Papinianuksen ja Ulpianuksen lausunnot muodostavat yli kolmanneksen Digestasta. "Juristien tekstit" on juristien eikä opettajien, mutta virke kestää. Huom.: kysymyksen vastaus "Lakikoulusta" ei paljastu vihjeestä. OIKEIN (huom.).

**20 Q4.** AUB:n sivu ja Wikipedia AUB: 3.12.1866, 16 opiskelijaa, aluksi arabia (Wikipedia: "In the beginning Arabic was used"; AUB-kirjasto/Bliss-elämäkerta hakutuloksen kautta: arabia aluksi). Englantiin siirtymisvuosi vaihtelee (1879/1882/1887), vihjeessä ei mainita, joten kunnossa. OIKEIN.

**21 "Yli 5 000 vuotta".** Wikipedia (viite NYT 1997); Libanonin suurlähetystö (hakutuloksen kautta): "more than 5,000 years"; EBSCO: "at least five thousand years". Solidere ajoittaa kaupungin noin 2500 eaa. (n. 4 500 v), joten luku on pyöristetty ja lähteet toistavat toisiaan; teksti on varovainen ("lähteiden mukaan yksi vanhimmista"). OIKEIN (huom.).

**22 433 249.** Ks. kohta 23: luku ja vuosi oikein, laajuus nimetty (Beirutin kuvernementti vastaa kaupunkia), lähde Ministry of Public Health molempien lähteiden pohjalla, joten lähteet eivät ole täysin itsenäisiä. OIKEIN (huom.).

**24 Place de l'Étoile.** Wikipedia, Archnet, Lonely Planet. OIKEIN.

## 4. Kuvat

Commons-tiedot haettu API:sta; esikatselukuvat (960 px) katsottu. Alla lisenssi (Commonsin tarkka muoto) ja tekijä, kuvateksti kuvaa vasten.

**K1. Kansikuva 1 (`kaupunkilehti[0].kansikuvat[0]`): OIKEIN.** Tiedosto `Mohammad Al-Amin Mosque and Saint George Maronite Cathedral – Beirut, Lebanon.jpg` on Commonsissa; CC BY-SA 4.0; tekijä Habibhelou (own work, 22.3.2025); täsmää lähderiviin. Kuvassa: ilmakuva, sininen kupoli ja neljä minarettia, Libanonin lippu etualalla, takana katedraalin kellotorni ja kerrostaloja, oikealla kaivausalue. Kuvateksti "moskeija ja katedraali seisovat keskustassa aivan vierekkäin" täsmää (katedraalista näkyy kellotorni; Commonsin kuvaus sama). Kasvoja ei tunnistettavasti, ei tekstiä, ei väkivaltaa.

**K2. Kansikuva 2 (`kansikuvat[1]`, Raouché): EPÄTARKKA.** `Pigeon Rocks of Beirut, Rock of Raouche, Beirut, Lebanon.jpg` on olemassa; CC BY 4.0; tekijä Vyacheslav Argenberg (own work, 31.8.2008); täsmää. Kuvassa kaksi kalliota, toisessa luonnonkaari, kimaltava meri vastavalossa: kuvateksti "koostuu kahdesta kalliosta" täsmää. Mutta selitteen "kaupunginosan nimi tulee ranskan sanasta rocher" on yksi lähde (Wikipedia, "single source") ja kiistanalainen (arameasta/arabiasta "pää" -selitys), eikä se näy kuvassa. Korjattu lause: "Raouchén edustalla oleva luonnonmuodostelma koostuu kahdesta kalliosta, joita kutsutaan Kyyhkyskallioiksi." Polku: `.kaupunkilehti[0].kansikuvat[1].selite`.

**N1. Nosto K1 (kolikko, `nostot[0]`): OIKEIN.** `Phoenicia, Berytus. Mint AD 117-138 (50958306408).jpg` on olemassa; CC BY-SA 2.0; tekijä Carole Raddato from FRANKFURT, Germany (Flickr-lähde); täsmää. Kuvassa Hadrianuksen laakeriseppeleinen parrakas muotokuva (etupuoli, IMP CAES TRAI HADRIANVS AVG P) ja takapuoli: kaksi legioonan kotkaa seppeleessä, COL BER. Kuvateksti "Roomalaisen Berytuksen lyömä pronssikolikko" sopii: RPC III 3856 (hakutuloksen kautta) kuvaa tyypin kuparipohjaiseksi (bronssi), Pepperdinen kolikkokatalogit "bronze". Selite "Antiikin Berytus oli roomalainen siirtokunta, ja siellä lyötiin omia kolikoita" sopii (COL BER = colonia Berytus). Kasvot: keisarin muotokuva kolikossa, ei yksityishenkilö. Ei väkivaltaa. Huom.: RPC antaa kolikolle ajoituksen 128/38 (Commonsin 117–138 on keisarin hallituskausi); kuvatekstissä ei vuotta.

**N2. Nosto K2 (roomalaiset kylpylät, `nostot[1]`): OIKEIN (huom.).** `BeirutRomanBaths.jpg` on olemassa; CC BY-SA 3.0; tekijä Elgaard (own work, 22.8.2012); täsmää. Kuvassa kaivausmonttu: hypokaustin pienet pylväät, kaarikäytäviä, tukimuurit ja nykyiset rakennukset reunalla, penkkejä ja puita ylhäällä. Kohde täsmää. Selitteen tiedot "Serail-kukkulan itärinteeltä" ja "ympärille on rakennettu puisto" eivät näy kuvassa; Wikipedia Beirut Central District sanoo kylpylöiden olevan "eastern slope of the Serail Hill" ja löydetyn 1968–69, Gillespies (hakutuloksen kautta) kuvaa puutarhan Soliderelle ja Lonely Planet "at the base of Serail Hill", eli sijainti on lähteistä kunnossa mutta puiston "rakentaminen ympärille" on Wikipedian suora väite ilman tukea ("The page does not say the garden was built around the ruins"). Ehdotus: lyhennä "Roomalaisen Berytuksen kylpylöiden rauniot ovat Serail-kukkulan rinteellä keskustassa; kuvassa näkyvät lämmitysjärjestelmän pienet pylväät." Ei kasvoja, ei väkivaltaa.

**N3. Nosto K3 (College Hall, `nostot[2]`): OIKEIN (huom.).** `American University. Beirut, (A.U.B.). College Hall LOC matpc.02836.jpg` on olemassa; Commonsin lisenssi "Public domain" ({{PD-Matson}}, {{PD-old-70-1923}}); tekijä Matson Collection (LOC, "No known restrictions on publication"); täsmää lähderiviin "Matson Collection ... (PD)". Kuvassa: mustavalkoinen kolmikerroksinen kiviset rakennus, yksi kellotorni kelloineen, kaarikäytävä, palmu ja tenniskenttä, yksi kävelijä (kaukana). Kuvateksti "College Hall kuuluu AUB:n kampukseen, joka kasvoi SPC:n pohjalta" sopii. Huomiot: (1) PD-tekijän kuolinvuosi: G. Eric Matson k. 1977, eli alle 70 vuotta; PD-asema perustuu Commonsin merkintään PD-Matson (lahjoitus LOC:lle, "ei tunnettuja rajoituksia") ja päiväykseen 1920 (PD-old-70-1923 -merkintä on epäilyttävä, koska tekijä ei ole kuollut yli 70 v sitten); riski pieni, mutta jos kaikkien PD-kuvien raja pidetään tiukkana (kuolema alle 70 v), tämä on merkittävä. (2) Kuva on 1920-luvulta (Commons: 1920), nosto kertoo 1873; kuvateksti ei väitä muuta, mutta kuvan ikä voisi mainita. (3) kuvat.md kuvaa "kellotorneineen" monikossa; kuvassa on yksi torni.

Kasvot, teksti ja väkivalta yhteenvetona: ei väkivaltaa yhdessäkään; kasvot vain kolikon muotokuvassa.

## 5. Korjausten lista (polku → korjattu lause)

1. `kaupunkilehti[0].nostot[0].teksti` (Amarna): "Nimi esiintyy jo 1300-luvun eaa. Amarna-kirjeissä, ja kuningas Ammunira Birutasta kirjoitti Egyptin faaraolle kolme akkadinkielistä kirjettä."
2. `kaupunkilehti[0].nostot[0].teksti` (saari): "Lähteen mukaan varhaisin asutus oli saarella Beirutjoen suistossa, mutta saaren ja rannan välinen kanava liettyi umpeen." (tai pois)
3. `kaupunkilehti[0].nostot[1].teksti` ja `artikkeli.teksti` (Pompeius): "Kaupunki joutui Rooman haltuun vuonna 64 eaa., kun Pompeius järjesteli Syyrian Rooman maakunnaksi, ja se sai nimen Berytus."
4. `kaupunkilehti[0].nostot[1].teksti` (Papinianus, Ulpianus): "Koulun opetus nojasi muun muassa roomalaisten juristien Papinianuksen ja Ulpianuksen kirjoituksiin."
5. `kaupunkilehti[0].nostot[2].teksti`, `artikkeli.teksti` (silkki): "Lähteen mukaan eurooppalainen kiinnostus libanonilaiseen silkkiin ja muihin vientituotteisiin muutti Beirutin merkittäväksi satamaksi ja kauppakeskukseksi."
6. `kysymykset[2].fact`: "Corniche on noin viiden kilometrin pituinen kävelybulevardi, joka kiertää niemen Saint George -lahdelta Raouchén kautta."
7. `kysymykset[3].fact` ja `.q`: fact "Aukion 1930-luvun kellotornin lahjoitti libanonilaistaustainen siirtolainen Michel Abed."; q "Minkä Beirutin keskustan aukion laidalla seisoo siirtolaisen lahjoittama kellotorni?"
8. `artikkeli.intro` (väkiluku): "Asukkaita kaupungissa (Beirutin kuvernementti) on arvion mukaan 433 249 (31.12.2017, luku sisältää rekisteröidyt syyrialaispakolaiset), ja suurkaupunkialueella määritelmästä riippuen noin 1,8–2,4 miljoonaa."
9. `kaupunkilehti[0].kansikuvat[1].selite` (Raouché): "Raouchén edustalla oleva luonnonmuodostelma koostuu kahdesta kalliosta, joita kutsutaan Kyyhkyskallioiksi."
10. (valinnainen) `kaupunkilehti[0].nostot[1].selite` (kylpylät): "Roomalaisen Berytuksen kylpylöiden rauniot ovat Serail-kukkulan rinteellä keskustassa; kuvassa näkyvät lämmitysjärjestelmän pienet pylväät."
11. (huomio, ei korjausta) PD-kuva `American University. Beirut, (A.U.B.). College Hall LOC matpc.02836.jpg`: tekijä Matson k. 1977; PD-peruste PD-Matson, merkitse riskiksi.
