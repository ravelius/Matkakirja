# Baku (baku, e03) — riippumaton faktantarkistus

Lähteet luettu itse (tyokalu.mjs lahde, hakupäivä 11.10.2026): en-Baku (+ raakawikiteksti, ilmastotaulukko), en-History of Baku, en-Old City (Baku), en-Maiden Tower, en-Palace of the Shirvanshahs, en-Baku Boulevard, en-Juma Mosque, en-Taza Pir Mosque, en-Zeynalabdin Taghiyev, en-Mugham, en-Leyli and Majnun, en-Uzeyir Hajibeyov, en-Alim Qasimov, en-Vagif Mustafazadeh, en-Branobel, en-Villa Petrolea, en-Baku Metro, en-Heydar Aliyev Airport, en-Azerbaijani cuisine, en-Gobustan, en.wikivoyage Baku, Wikidata (P625). Ei jumiutuneita hakuja; en-Wikipedian "International Mugham Center" -artikkelia ei ole, joten keskuksen tiedot tarkistettu en-Mugham-artikkelista.

Yhteenveto: VÄÄRIN 15, EPÄVARMA 6.

## VÄÄRIN ja EPÄVARMA

| JSON-polku | Väite | Lähde (artikkeli + osio) | Tulos | Korvaava teksti |
|---|---|---|---|---|
| kysymykset[0..4].correct: kaikilla correct = 0; kaupunkilehti[1].tehtava.oikea = 0 | Kaikissa 5 kysymyksessä ja minitehtävässä oikea vastaus on ensimmäinen | (rakenne, PILVIOHJE 4) | VÄÄRIN | Järjestä vaihtoehdot: Q1 ["Mustanmeren","Kaspianmeren","Välimeren","Azovinmeren"] correct 1; Q2 ["Georgian","Kazakstanin","Turkmenistanin","Azerbaidžanin"] correct 3; Q3 ["Kaupungin satamassa purjelaivat odottivat tuulta","Nimi tulee vanhoista tuulimyllyistä","Kaupungissa tuulee voimakkaasti ympäri vuoden","Kaupunki on rakennettu korkealle vuoristosolaan"] correct 2; Q4 jää (Öljy, correct 0); Q5 ["12 metriä","28 metriä","47 metriä","85 metriä"] correct 1; tehtava.vaihtoehdot ["Kamancha","Tar","Balaban","Daf"] oikea 2 |
| kysymykset[3].q | "yksi maailman vilkkaimmista teollisuuskaupungeista" | en-Baku, Economy: oil fields "largest in the world" by the beginning of the 20th century; "vilkkaimmista teollisuuskaupungeista" ei ole lähteessä | VÄÄRIN | Mikä raaka-aine teki Bakun öljykentistä 1900-luvun alussa lähteen mukaan maailman suurimmat? |
| kysymykset[3].hint | "Robert ja Ludvig Nobel perustivat kaupunkiin tislaamon 1876." paljastaa vastauksen (tislaamo = öljy) | en-Baku, Discovery of oil; en-Branobel | VÄÄRIN | Arabimatkailija kertoi jo 900-luvulla, että alueella valui maasta luonnostaan sekä valkoista että mustaa nestettä. |
| tiedot[0] | Sama virke kuin kysymyksen 5 fact ja intro (28 m, alin pääkaupunki) | en-Baku, intro (tosi, mutta toisto) | VÄÄRIN | Neitotornia on kuvattu Azerbaidžanin seteleissä ja kolikoissa. (en-Maiden Tower, intro ja History) |
| kaupunkilehti[0].matkailijalle.artikkeli.jaksot[2].teksti | Bulevardi on "Yeni Bulvar- ja White City -osuuksien myötä 2012 jälkeen 3,75 km" | en-Baku Boulevard, Location: Yeni Bulvar 2012 -> 3,75 km; White City Boulevard lisäsi 2015 vielä 2 km Freedom Squaren itäpuolelle | VÄÄRIN | Bakun bulevardi on merenrantapromenadi, joka on Yeni Bulvar -osuuden myötä 2012 jälkeen 3,75 kilometriä pitkä; White City -osuus lisäsi 2015 vielä noin kaksi kilometriä Freedom Squaren itäpuolelle. (loppu virkkeistä ennallaan) |
| kaupunkilehti[0].kansikuvat[1].selite | "nykyään promenadi on 3,75 kilometriä pitkä" | sama kuin yllä (nykyinen pituus > 3,75 km) | VÄÄRIN | Bulevardin istutuksista päätettiin vuonna 1900, ja promenadi oli 2012 jälkeen 3,75 kilometriä pitkä. |
| kaupunkilehti[0].matkailijalle.artikkeli.matkailu.parasta[3].selite | "jonka pituus on 3,75 kilometriä" | sama kuin yllä | VÄÄRIN | Merenrantapromenadi, jonka pituus oli 2012 jälkeen 3,75 kilometriä ja jota White City -osuus pidensi 2015 noin kahdella kilometrillä. |
| kaupunkilehti[0].matkailijalle.kappale | "Tammikuusta 2026 alkaen ... rajat ... suljetut" | en.wikivoyage Baku, Get in: "As of Jan 2026 ... remain closed" (tila tammikuussa 2026, ei alkamispäivä) | VÄÄRIN | Tammikuussa 2026 maan maarajat naapurimaihin olivat edelleen suljetut siviililiikenteeltä, joten maahan pääsee lähinnä kansainvälisten lentokenttien kautta. |
| kaupunkilehti[0].matkailijalle.artikkeli.jaksot[0].teksti (viimeinen virke) | "Tammikuusta 2026 alkaen ... suljetut ..., joten Bakuun tullaan lentäen." | sama | VÄÄRIN | Tammikuussa 2026 maan maarajat naapurimaihin olivat edelleen suljetut siviililiikenteeltä, joten Bakuun tullaan yleensä lentäen. |
| kaupunkilehti[0].matkailijalle.artikkeli.matkailu.hyvaTietaa[2].teksti | "Tammikuusta 2026 alkaen ... suljetut" | sama; Wikivoyage By boat: rajasulku koskee myös meritse tuloa (tämä osa OK) | VÄÄRIN | Tammikuussa 2026 maan maarajat naapurimaihin olivat edelleen suljetut siviililiikenteeltä, eikä meritse saapuminen ole mahdollista. |
| kaupunkilehti[1].nostot[3].teksti (viimeinen kappale) | Hajibeyov julkaisi "1900-luvun alussa" mughamin teoriaa käsittelevän kirjan The Principles of Azerbaijan Folk Music | en-Uzeyir Hajibeyov, Works: kirja julkaistu 1945 (kansanmusiikin periaatteet, ei erikseen mughamin teoria) | VÄÄRIN | Hajibeyov julkaisi 1945 kirjan The Principles of Azerbaijan Folk Music. |
| kaupunkilehti[0].nostot[3].teksti (viimeinen kappale) | "Taghiyev rahoitti Shollar-vesiputken" | en-Zeynalabdin Taghiyev, Philanthropy: "helping to finance", 25 000 ruplaa; valmis 1916 | VÄÄRIN | Zeynalabdin Taghiyev osallistui Shollar-vesiputken rahoitukseen 25 000 ruplalla; putki valmistui 1916 ja johti vettä Kaukasuksen vuorilta Quban läheltä. |
| kaupunkilehti[0].matkailijalle.artikkeli.jaksot[4].teksti | "Vuosien 1991–2020 keskiarvojen mukaan ... heinä–elokuu 26,4 °C, tammi–helmikuu 4,3 °C" | en-Baku, Climate: 26,4 ja 4,3 ovat proosalauseessa, ei 1991–2020-taulukossa. Taulukko (Maştağa, 1991–2020): heinä 26,1, elo 26,5, tammi 4,8, helmi 4,7 | VÄÄRIN | Maştağan mittauspisteen 1991–2020 kuukausikeskiarvojen mukaan heinä–elokuun keskilämpötila on noin 26,3 °C ja tammi–helmikuun noin 4,8 °C. |
| kaupunkilehti[0].matkailijalle.artikkeli.jaksot[1].kuva.lyhyt ja .selite | Kuvana vanhankaupungin kivinen holvikaarinen portaali; teksti kertoo asuinalueista (Gemichiler, Noyutchuler) eikä liity kuvan kohteeseen | en-Old City (Baku), History: quarters (väite itsessään OK); kuvat.md Opas 2 | VÄÄRIN | lyhyt: "Icheri Sheherin muurien sisällä on kapeita kujia, karavaaniseraijeja ja kylpylöitä." selite: "Vanhakaupunki jaettiin aikanaan asuinalueisiin, joista Gemichiler oli laivanrakentajien ja Noyutchuler öljytyöläisten." (kujat: en-Baku, Architecture; karavaaniseraijit ja kylpylät: sama) |
| nahtavyydet.Bakun bulevardi.teksti | "Józef Ploškon suunnittelema Phenomenon" | en-Baku Boulevard, Imperial Russian era: Józef Plośko | VÄÄRIN | Puolalaisen arkkitehdin Józef Plośkon suunnittelema Phenomenon-rakennus |
| artikkeli.intro; kaupunkilehti[0].nostot[2].teksti; nahtavyydet.Širvanšahien palatsi.teksti, .kuvat[0].lyhyt; kaupunkilehti[0].matkailijalle.artikkeli.matkailu.parasta[2].selite | Palatsi on vanhankaupungin "korkeimmalla kohdalla" | en-Palace of the Shirvanshahs, History: vain "the hill where the palace was built"; en.wikivoyage: "walk uphill"; superlatiivia ei lähteessä | EPÄVARMA | Korvaa "vanhankaupungin korkeimmalla kohdalla" muodolla "vanhankaupungin kukkulalla" (intro: "Sen kukkulalla seisoo 1400-luvun Širvanšahien palatsi") |
| kohdekartta.kohteet[5] (Bakun bulevardi 40.36, 49.8371) | Koordinaatti osuu bulevardiin | Wikidata Q2665945 P625 = 40.36, 49.8371 (pyöristetty, tarkkuus 0,0001); en.wikivoyage Baku Boulevard sama arvo. Piste on rannan tuntumassa lahden puolella; osumaa promenadiin ei voitu kartalta varmistaa | EPÄVARMA | Jos osuma ei täyty, käytä Kansainvälisen mugham-keskuksen pistettä bulevardilla: lat 40.3608, lon 49.835 (en.wikivoyage) |
| kaupunkilehti[0].matkailijalle.artikkeli.jaksot[4].teksti | "Sadetta tulee noin 200 millimetriä vuodessa tai vähemmän" samassa kappaleessa Maştağan 1991–2020 -kuukausiarvojen kanssa | en-Baku, Climate: proosa "around or less than 200 mm" koskee Absheronia yleisesti; taulukon kuukausiarvot (32,4+30,3+18,4+16,6+15,1+9,3+3,9+8,2+28,5+32,5+44,3+34,6) summautuvat 273,1 mm:ään | EPÄVARMA | Sadetta tulee Maştağan mittauspisteessä noin 270 millimetriä vuodessa: heinäkuu on kuivin 3,9 millimetrillä ja marraskuu sateisin 44,3 millimetrillä. |
| kaupunkilehti[0].matkailijalle.artikkeli.nosto | "Kesä on kuuma ja kuiva" | en-Baku, Climate: "hot and humid summers" (jaksot[4] sanoo kosteita, ristiriita); heinäkuu on vuoden kuivin | EPÄVARMA | Kesä on kuuma, ja heinäkuu on vuoden kuivin kuukausi. |
| kaupunkilehti[0].matkailijalle.kappale | "maahan pääsee vain kansainvälisten lentokenttien kautta" | en.wikivoyage Baku, Get in: sama sivu sanoo myös, että Tbilisi–Baku-yöjuna on 2026 jälleen käytössä viisumivapaille matkustajille; lähde ristiriitainen | EPÄVARMA | Katso korvaus yllä: "joten maahan pääsee lähinnä kansainvälisten lentokenttien kautta" |
| kaupunkilehti[0].nostot[2].lyhyt | "Širvanšahien palatsin päärakennus aloitettiin 1411." mutta kuvana on sisäpihan pylväikkö (kuvat.md Nosto 3), ei päärakennus | en-Palace, Architecture: pylväät kuuluvat Divan-khanaan/sisäpihaan; päärakennus 1411 OK | EPÄVARMA | Širvanšahien palatsikompleksiin kuuluvat päärakennus, Divan-khana ja hovimoskeija. |

## OK (tarkistettu lähteestä)

| JSON-polku | Väite | Lähde | Tulos |
|---|---|---|---|
| artikkeli.intro | pääkaupunki, lähteen mukaan Kaukasuksen ja Kaspianmeren suurin; Absheronin eteläreuna, Bakunlahti; 28 m alle merenpinnan | en-Baku, intro | OK |
| artikkeli.intro | khazri ja gilavar ympäri vuoden; Icheri Sheher UNESCOssa 2000; muurien ulkopuolelle levittäytyminen 1800-luvun alussa | en-Baku, Climate; en-Old City, History | OK |
| artikkeli.intro | 1873 lääninpääkaupunki (1859), 13 000 asukasta 1860-luvulla, Nobelit 1873, huutokauppa 1872, yli 3 000 kaivoa 1900 | en-Baku, History, Demographics, Economy; en-History of Baku | OK |
| artikkeli.intro | 2 344 900 (1.1.2024) | js/packs/paakaupungit.js asukkaat (Azerbaidžanin tilastokomitea 2024); sallittu PILVIOHJE 4.4 | OK |
| artikkeli.teksti | Baguan/Bagavan, baga = jumala; Bâd-kube 1800-luvun kansanetymologia; kivikausi, Bayilin pronssikausi | en-Baku, Etymology, Antiquity | OK |
| artikkeli.teksti | hovi Bakuun maanjäristysten jälkeen (1100-luku tai 1400-luvun alku: lähteet 1191 / 15. vuosisata), 1411, 1501, 1578, 1723, 1806 | en-Baku; en-Palace, History; en-Maiden Tower | OK (varovaisesti muotoiltu) |
| artikkeli.teksti | 1859 läänin pääkaupunki; lennätin Tiflisiin 1868; rata 8.5.1883; muurit 1865, 44 000 ruplaa | en-History of Baku, 19th century; en-Old City, History | OK |
| kysymykset[0], [1], [2], [4] | Kaspianmeri; Azerbaidžan; Tuulten kaupunki; 28 m; vihjeet eivät paljasta vastausta; oikea ei pisin | en-Baku | OK (vihjeet: Q1 "länsirannalla" ei nimeä meren, Q5 ei nimeä lukua) |
| kysymykset[3].fact | 1846 Bibi-Heybat, Nobelit 1873, yli 3 000 kaivoa | en-Baku, Economy | OK |
| tiedot[1] | Villa Petrolean multa Lankaranista, makea vesi Volgalta painolastina | en-Villa Petrolea | OK |
| tiedot[2] | laskuvarjotorni 1936, kunnostettu 2008 | en-Baku Boulevard | OK |
| valokuva | Ulsky, 1861; lääninpääkaupunki; sisä- ja ulkopuolinen kaupunki erottuivat | en-Old City, History (Inner/Outer City) | OK |
| kaupunkilehti[0].nostot[0] | Marudee 900-luvulla, 1837 Balaxani, 1846, 1872 huutokauppa, Nobelit 1873, Rothschildit 1882, Branobel 1876, Musta kaupunki, yli 3 000 kaivoa | en-Baku, Economy/Discovery of oil; en-Branobel | OK |
| kaupunkilehti[0].nostot[1] | Neitotorni 29,5 m, 16,5 m, 8 kerrosta, kallio, 1962–63, 14 m puupalkit, kufi-kirjoitus 14 m, ikä kiistanalainen, museo, katolta näkymä, seinät 5 m, seteli ja kolikot | en-Maiden Tower | OK |
| kaupunkilehti[0].nostot[2] | 1411, 52 huonetta, 3 kierreporrasta, kompleksin osat, 1501, 1578, tyhjillään 1600-luvulta, 1723, sotilasosasto, 1964, 2000 | en-Palace | OK |
| kaupunkilehti[0].nostot[3] | khazri 144 km/h, gilavar, 200 mm, 2 300 mm Mustallamerellä, Shollar 1916, Quba | en-Baku, Climate; en-Taghiyev | OK (ks. Shollar yllä) |
| kaupunkilehti[0].matkailijalle.artikkeli.jaksot[0] | GYD 25 km, Bina, T1 Koroglun kautta, N16 Samed Vurgun -puistoon, metro 6.11.1967, 3 linjaa ja 27 asemaa, 6–24, valokuvauskielto asemilla | en.wikivoyage Get in/By metro; en-Baku Metro, intro (en-Baku sanoo 25 asemaa, Metro-artikkeli 27) | OK |
| jaksot[1] | kaksi karavaaniseraijia, kylpylät, Juma, yksi päivä, 3 000 asukasta 2007 | en-Baku, Architecture; en-Old City; wikivoyage | OK |
| jaksot[2] (muu) | huvipuisto, jachtiklubi, musiikkisuihkulähde, patsaat, laskuvarjotorni 1936, Flame Towers | en-Baku Boulevard; en-Baku | OK |
| jaksot[3] | kolme osaa, plov, sampi vartaassa + narsharab, musta tee aterian jälkeen ja tervetuliaisjuoma hillon kanssa, nard/domino teehuoneissa, pakhlava, shaki halva; plov yli 200 lajia | en-Azerbaijani cuisine; wikivoyage Tea houses | OK |
| jaksot[4] (muu) | BSk, toukokuu 18,0, lokakuu 16,7, heinäkuu 3,9 mm, marraskuu 44,3 mm, lumimyrskyt satunnaisia ja lumi sulaa päivissä | en-Baku, Climate-taulukko ja proosa | OK |
| matkailu.parasta, hyvaTietaa[0], [1], [3] | Gobustan ~70 km lounaaseen, yli 6 000 piirrosta; liikenne, turvatarkastukset, khazri | en-Gobustan; wikivoyage Stay safe | OK |
| kaupunkilehti[1].nostot[0] | seitsemän pääasteikkoa, Rast/Shur/Segah, tunteja, mystinen rakkaus, UNESCO 2003 ja 2008, balaban Voyagerilla | en-Mugham | OK |
| kaupunkilehti[1].nostot[1] | kirjoitettu 1907, kantaesitys 25.1.1908 Taghiyevin teatterissa, ensimmäinen muslimi-idän ooppera, libretto, Fuzuli, Arablinski, viulu, yli 2 000 esitystä | en-Leyli and Majnun | OK |
| kaupunkilehti[1].nostot[2] | kenkätekijän poika, muurari -> urakoitsija 18-vuotiaana, lukutaidoton, stipendit, teatteri 1883, palo 1909, 1911, tyttökoulu 1898–1900, palokunta 1886 | en-Taghiyev | OK |
| kaupunkilehti[1].nostot[3] (muu) | keskus 2005, peruskivi 8/2005, avattu 27.12.2008, 7 500 m2, 350 hlöä, studio; Mustafazadeh; Buckley 1995 Ranskassa | en-Mugham; en-Alim Qasimov; en-Vagif Mustafazadeh | OK |
| kohdekartta.esittely | kivikausi (lähteen mukaan), Shirvanshahien rakennukset, muurit, 1900-luvun alun bulevardi | en-Baku; en-Maiden Tower | OK |
| nahtavyydet.Neitotorni | 1873-kappale (muurit 1806, meri vetäytynyt, maakaista), 20 legendaa | en-Maiden Tower | OK |
| nahtavyydet.Širvanšahien palatsi | 16 huonetta nyt, Khalilullah I, Kei-Kubad paloi 1918, 1932–1934, 1964, 1992 | en-Palace | OK |
| nahtavyydet.Juma-moskeija | 709 AH, minaretti 1437, nykyinen 1899, zarathustralaisen temppelin jäljet, kilimimuseo, 1990-luku, 2008; 1873 vanha moskeija | en-Juma Mosque | OK |
| nahtavyydet.Vanhankaupungin muurit | 1100–1300-luvun linnoitukset, Synyg Gala 1000-luku, 1806, 1807–1811, kaksi porttia, 1865/44 000 ruplaa, suihkulähteet 1867, Taghiyevin portti 1877, vaaralista 2009 asti | en-Old City; en-Baku | OK |
| nahtavyydet.Taza Pirin moskeija | 1905–1914, Ashurbeyova, Skibiński, Abu Seyid Abdulla, valkoinen kivi, 1 400 m2 (wikivoyage), Taghiyev, Balkanin sota 1911, 1917, 1943, 2006–2009; 1873 vain hauta | en-Taza Pir; wikivoyage | OK |
| nahtavyydet.Bakun bulevardi (muu) | 1900 komissio, Skurewicz 20 m, multa tuotiin, 1909 Hajinski 60 000 ruplaa, Zvezda, 1911, Phenomenon 1912 -> nukketeatteri, 1936, 2008, kansallispuisto 1999, 1865/1867 | en-Baku Boulevard; en-Old City. "60 000 ruplaa" tukee lähde sanasta sanaan | OK |
| kuvatekstit (kaikki muut) | lyhyt <= 100 mrk, yksi virke, piste; selite 1–2 virkettä; kerrotaan kohteesta, ei kuvan visuaalisesta sisällöstä | tarkistettu skriptillä ja kuvat.md:stä | OK |
| epäillyt kuvatekstit | Nosto 3 palatsi: ks. EPÄVARMA; Opas 2 portaali: ks. VÄÄRIN; Kohde 1 Neitotorni (lyhyt/selite UNESCO-yhteys) vastaa kohdetta | en-Maiden Tower; en-Palace | Kohde 1 OK |
| kohdekartta.kohteet[0..4] | Neitotorni 40.3661/49.8372 (wikivoyage 40.36625/49.83735), palatsi 40.36615/49.83344 (wikivoyage 40.36666/49.83299), Juma 40.3653/49.8356, Shemakhan portti 40.36853/49.83632, Taza Pir 40.37194/49.83139 | en.wikivoyage Baku | OK (alle ~80 m) |
| kaupunkilehti[1].tehtava | vastaus nostossa; ei toista kaupungin kysymyksiä; fakta ei ole nostovirke sanasta sanaan (lähes rinnakkainen, mutta eri virke); ei mainitse palkkiota | en-Mugham | OK (vastausindeksi ks. VÄÄRIN) |
| 1873-väitteet | Neitotorni, palatsi, Juma (ei vielä), muurit, bulevardi (ei vielä), Taza Pir (vain hauta), lääninpääkaupunki, Nobelit | edellä | OK |
| nykypolitiikka ja sota | Ei sotaa tai vaaleja; Heydar Aliyev -keskus jätetty pois; rajasulku esitetty asiallisesti, ks. VÄÄRIN/EPÄVARMA muotoilu | PILVIOHJE 4.6, 4.8 | OK |
| sääjakso (ehdotukset.huomiot[0]) | ajanjakso 1991–2020, mittauspiste Maştağa oikein; keskilämpötilat 26,4 ja 4,3 ovat proosasta, eivät 1991–2020-taulukosta | en-Baku, Climate | ajanjakso ja mittauspiste OK; lämpötilahuomio sisältyy jaksot[4]-riviin (ei lasketa erikseen) |

## Korjattu

- Kaikki 15 VÄÄRIN-kohtaa korjattu sanatarkasti: vastausindeksit sekoitettu (correct 1,3,2,0,1; minitehtävä oikea 2), Q4:n q ja hint, tiedot[0], bulevardin 3,75 km (3 kohtaa), rajasulku (3 kohtaa), Hajibeyovin kirja 1945, Shollar, Maştağan lämpötilat, Opas 2 -kuvateksti, Plośko.
- EPÄVARMA pehmennetty: "kukkulalla" (5 kohtaa), sademäärä noin 270 mm (Maştağa), kesä-nosto, palatsin nosto-lyhyt, "lähinnä" lentokenttien kautta; bulevardin kohdekartan piste vaihdettu mugham-keskuksen pisteeseen 40.3608/49.835. Nosto 4:stä poistettu yksi virke pituuskiintiön vuoksi.
- Kuvia ei vaihdettu (kuvat.md ennallaan). tarkista --verkko: 0 virhettä.

## Lukupassi

Päätoimittajan LISÄSÄÄNTÖ 11.10.2026 (PILVIOHJE-paakaupungit.md rivit 1013-1016): tarkka luku/vuosi saa jäädä vain, jos kaksi riippumatonta lähdettä tukee sitä. Lähteet haettu 11.10.2026 (en-Wikipedia, fi-Wikipedia, toisen artikkelin teksti, en.wikivoyage = WV). Lyhenteet: B = en Baku, HB = en History of Baku, OC = en Old City (Baku), MT = en Maiden Tower, PS = en Palace of the Shirvanshahs, JM = en Juma Mosque, TP = en Taza Pir Mosque, BB = en Baku Boulevard, TZ = en Taghiyev, MU = en Mugham, LM = en Leyli and Majnun, UH = en Hajibeyov, GR = en Gobustan, BM = en Baku Metro, AP = en Heydar Aliyev Airport, QA = en Alim Qasimov, OT = en Azerbaijan State Opera and Ballet Theater, fiB = fi Baku.

| Sijainti | Arvo | Lähteet | Päätös |
|---|---|---|---|
| artikkeli.intro, kysymys 5, johdanto, nosto | 28 m merenpinnan alapuolella | B; fiB; WV | säilytetty |
| artikkeli.intro, kuvateksti, matkailu | UNESCO-perintö 2000 | OC; PS; fiB | säilytetty |
| artikkeli.intro, teksti, kysymys 4, nosto 1 | Nobelit Bakuun 1873 | B; HB | säilytetty |
| artikkeli.intro | asukasluku 1860-luvulla noin 13 000 | vain B (7 000 / 13 000) | poistettu ("vielä pieni kaupunki") |
| artikkeli.intro | nykyinen asukasluku 2 344 900 (1.1.2024) | tilastokomitea (konteksti.json) + B "yli kaksi miljoonaa" | pyöristetty ("yli kaksi miljoonaa"); tarkka luku vain yhdessä lähteessä |
| artikkeli.intro, nosto 1 | öljynetsintä alkoi 1872 | B; HB antaa 1873 (ristiriita) | pyöristetty ("1870-luvun alussa") |
| artikkeli.intro, kysymys 4, nosto 1 | yli 3 000 öljykaivoa vuoteen 1900 | vain B | pyöristetty ("tuhansia", "1800-luvun lopulla") |
| artikkeli.teksti | Shirvanshahien palatsin päärakennus 1411 | PS; WV | säilytetty |
| artikkeli.teksti, nosto 3, nähtävyys | safavidit 1501, osmanit 1578, Pietari Suuren piiritys 1723 | PS; B; HB; fiB | säilytetty |
| artikkeli.teksti, nähtävyydet | muurien vahvistus 1806 | MT; OC; B; fiB | säilytetty |
| artikkeli.teksti | lääninpääkaupunki 1859 | B; HB | säilytetty |
| artikkeli.teksti | lennätin Tiflisiin 1868 | vain HB | pyöristetty (vuosi poistettu, "oli jo olemassa") |
| artikkeli.teksti | rata Tiflisiin 8.5.1883 | vain HB | pyöristetty ("1880-luvulla") |
| artikkeli.teksti, nähtävyydet, bulevardi | muurien purku 1865, 44 000 ruplaa, suihkulähteet 1867 | vain OC | pyöristetty (1800-luvun puoliväli, 1860-luku); rahasumma poistettu |
| kysymys 4 fact, nosto 1 | ensimmäinen kaivo Bibi-Heybatissa 1846 | B; HB; fiB | säilytetty |
| valokuva | vuosi 1861, Ulsky (1837–1868) | Commons-tiedoston nimi ja tekijätiedot | säilytetty (kuvan metatieto, ei väite) |
| tiedot[2], nähtävyys, Opas 3 | laskuvarjotorni 1936, kunnostus 2008 | vain BB | pyöristetty (1930-luku, 2000-luvun loppu) |
| kansikuva 2, nähtävyys, Opas 3, matkailu | bulevardin pituus 3,75 km (2012), White City +2 km (2015) | vain BB | pyöristetty (noin neljä km, pari km); vuodet poistettu |
| kansikuva 2, Opas 3, nähtävyys | bulevardin istutuspäätös 1900, kansallispuisto 1999 | vain BB | pyöristetty (1900-luvun alku, 1990-luvun loppu) |
| nähtävyys bulevardi | 20 m leveä penger, Hajinski 1909 ja 60 000 ruplaa, valmistuminen 1911, Phenomenon 1912 | vain BB (Phenomenon 1912 WV-rivi epävarma) | leveys ja rahasumma poistettu; vuodet pyöristetty (1910-luku) |
| nähtävyys bulevardi, aika-kenttä | "1900–1911" | vain BB | pyöristetty ("1900-luvun alku") |
| nosto 1 | jalostamo Balaxaniin 1837 | vain B | pyöristetty (1800-luvun alkupuolisko) |
| nosto 1 | Rothschildit 1882 | B 1882; HB 1883 (ristiriita) | poistettu (nostosta, pituuskiintiö) |
| nosto 1, lyhyt | Nobelin tislaamo 1876 | vain Branobel | pyöristetty (1870-luku) |
| nosto 1 | Musta kaupunki 1880-luvun alkuun mennessä | vain B | pyöristetty (1800-luvun loppu) |
| nosto 1 | Marudee 900-luvulla | B (vuosisata) | säilytetty vuosisatana, "lähteen mukaan" |
| nosto 2, nähtävyys | Neitotorni 29,5 m, 16,5 m, kahdeksan kerrosta | MT; WV | säilytetty |
| nosto 2, nähtävyys, lyhyt | seinät 5 m paksut | vain MT | pyöristetty ("useita metrejä") |
| nosto 2, nähtävyys | kaivaukset 1962–63, puupalkit 14 m, kufi-kirjoitus 14 m korkeudella | vain MT | pyöristetty (1960-luku) / poistettu (14 m) |
| nähtävyys Neitotorni | jopa 20 legendaa | vain MT | pyöristetty ("useita") |
| nosto 3, nähtävyys | 52 huonetta, kolme kierreporrasta, nykyään 16 huonetta | vain PS | pyöristetty ("useita kymmeniä", "kapeita portaita"); 16 poistettu |
| nosto 3, nähtävyys | museo-suojelualue 1964 | vain PS (HB/OC eri asia) | pyöristetty (1960-luku) |
| nähtävyys palatsi | Kei-Kubad paloi 1918, kunnostus 1932–1934, restaurointi 1992 | vain PS | pyöristetty (1900-luvun alku, neuvostoaika, 1990-luku) |
| nosto 3, nähtävyys, kuvateksti | maailmanperintö 2000 | PS; OC; fiB | säilytetty |
| nosto 4 | khazri 144 km/h | vain B | pyöristetty ("yli sata km/h") |
| nosto 4, kuvateksti | sadetta noin 200 mm vuodessa | B; WV ("Baku averages 200 mm") | säilytetty |
| nosto 4 | Mustallamerellä 2 300 mm | vain B | poistettu ("moninkertaisesti enemmän") |
| nosto 4 | Shollar: 25 000 ruplaa, valmistui 1916 | vain TZ | rahasumma poistettu; vuosi pyöristetty (1910-luku) |
| Opas, matkailijalle | lentoasema noin 25 km | fiB 25 km; AP 20 km koillisessa (ristiriita) | pyöristetty ("parinkymmenen km") |
| Opas, matkailijalle | maarajat suljettu, tammikuu 2026 | vain WV | pyöristetty (päivämäärä poistettu); huomiot[1] päivitetty |
| Opas | metro kello 6–24 | vain WV | pyöristetty ("aamusta keskiyöhön") |
| Opas | metro avattu 6.11.1967, kolme linjaa | BM; B (marraskuu 1967, 3 linjaa) | säilytetty vuosi ja kuukausi (päivä pyöristetty pois); kolme linjaa säilytetty |
| Opas | 27 asemaa | BM 27; B 25 (ristiriita) | pyöristetty ("yli kaksikymmentä") |
| Opas | vanhakaupunki 3 000 asukasta (2007) | vain OC | pyöristetty ("muutama tuhat") |
| Opas | ateria kolmeen osaan | vain AC | pyöristetty (luku poistettu) |
| Opas, kuvateksti | plovia yli 200 lajia | vain Azerbaijani cuisine | pyöristetty ("satoja") |
| Opas, ilmasto | lämpötilat 26,3 / 4,8 / 18,0 / 16,7 °C | Maştağa-taulukko (B); ei toista riippumatonta | pyöristetty (26, 5, 18, 17 °C) |
| Opas, ilmasto | sade 270 mm | B Maştağa; WV 200 mm (ristiriita) | pyöristetty ("parista sadasta kolmeen sataan") |
| Opas | heinäkuu 3,9 mm, marraskuu 44,3 mm | B-taulukko; WV-ilmastotaulukko | säilytetty |
| Opas, ilmasto | ajanjakso 1991–2020 | B; WV | säilytetty |
| matkailu.parasta | Gobustan 70 km, yli 6 000 piirrosta | vain GR | pyöristetty ("alle sata km", "tuhansia") |
| musiikki.johdanto, nosto 2 | ooppera kantaesitettiin 1908 | LM; UH | säilytetty |
| nosto 2 | ooppera kirjoitettu 1907, kantaesitys 25.1.1908 | LM 1907; UH 1908 (ristiriita); päivä vain LM | 1907 ja päivä poistettu |
| nosto 2 | yli 2 000 esitystä | vain LM | pyöristetty ("yli tuhat") |
| nosto 2, 3 | Fuzuli 1400-luvun runoilija | LM; UH | säilytetty (vuosisata) |
| nosto 3, selite | Taghiyev kattoi 1911 rakennuksen kulut | TZ; OT | säilytetty |
| nosto 3 | 18-vuotiaana, teatteri 1883, palo 1909, tyttökoulu 1898–1900, palokunta 1886 | vain TZ | pyöristetty ("nuorena", 1800-luvun loppu) / vuosi poistettu |
| nosto 4 | mugham UNESCO 2003 ja 2008 | MU (2008 vain MU) | pyöristetty (2000-luku) |
| nosto 1 (mugham) | seitsemän pääasteikkoa | vain MU | pyöristetty ("useita") |
| nosto 4, lyhyt, selite | keskus 2005, avattu 27.12.2008, 7 500 m2, 350 paikkaa | vain MU | pyöristetty (2000-luku) / poistettu (ala, paikat) |
| nosto 4 | Buckley-duetti 1995 | vain QA | pyöristetty (1990-luku) |
| nosto 4 | Hajibeyovin kirja 1945 | UH 1945; MU ilman vuotta | pyöristetty (1940-luku) |
| nähtävyys Juma | 709 AH / 1309–1310, minaretti 1437, nykyinen moskeija 1899 | JM; WV (1899 myös HB) | säilytetty |
| nähtävyys Juma | 1990-luvun käyttöpaluu, restaurointi 2008 | vain JM | pyöristetty ("sen jälkeen", 2000-luku) |
| nähtävyys muurit | muurit vahvistettu 1806; korjaus 1807–1811 | 1806: MT/OC/B; 1807–1811 vain OC | 1806 säilytetty; 1807–1811 pyöristetty ("pian sen jälkeen") |
| nähtävyys muurit | Taghiyevin portti 1877, vaaralista 2009 asti | vain OC | pyöristetty (1800-luvun loppu; "2000-luvulla jonkin aikaa") |
| nähtävyys Taza Pir | 1905–1914, 1 400 m2 | TP; WV (1905/1914 myös HB) | säilytetty |
| nähtävyys Taza Pir | Balkanin sota 1911, sulku 1917, moskeija 1943, restaurointi 2006–2009 | vain TP | vuodet poistettu / pyöristetty (1900-luvun puoliväli, 2000-luku) |
| kohdekartta, rajat | koordinaatit | en-Wikipedia + WV (tarkistettu aiemmin, alle ~80 m) | säilytetty |
| vuosisata- ja vuosikymmenilmaukset (1000–1100-luku, 1100–1300-luku, 1400-luku, 1800-luku jne.) | ajoitukset vuosisatatasolla | PS; MT; OC; JM; TP; B | säilytetty (ei tarkkoja lukuja) |

Yhteenveto: säilytetty 21, pyöristetty 44, poistettu 4 (rivit, joissa yhdellä rivillä useita lukuja, on laskettu päätöksen pääasian mukaan). Nostojen pituudet 440–660 merkkiä tarkistettu.
