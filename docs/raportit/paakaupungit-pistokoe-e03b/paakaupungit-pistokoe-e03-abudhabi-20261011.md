# Pääkaupunkilehden pistokoe: ABU DHABI (erä e03, id abudhabi, 11.10.2026)

Tarkistaja: Sonnet-agentti. Aineisto (vain luku): `pk-e03b/paakaupungit-pilvi/e03/abudhabi/` (sisalto.json, faktapohja.md, kuvat.md, tarkistus.md, konteksti.json). Muodon esikuva: paakaupungit-pistokoe-e03-baku-20261011.md. Aineistoon ei ole tehty korjauksia; kaikki "Korjattu lause" -rivit ovat ehdotuksia. Lehti sijoittuu isoisän vuoteen 1873, mutta kertoo nykyajasta, joten väitteet on arvioitu nykytiedon mukaan. Ilmastolukuja ei tarkistettu (ohjeen mukaan).

Menetelmä: kolme nostoa valittu luku- ja vuositiheyden mukaan: `kaupunkilehti[0].nostot[1]` (Saari, joka kasvoi sillan jälkeen), `kaupunkilehti[0].nostot[3]` (Moskeija, joka kokosi aineet kaikkialta) ja `kaupunkilehti[1].nostot[2]` (Muotokuva, joka riippuu kaapeleissa; Founder's Memorial). Mukana lisäksi kaikki viisi `kysymykset[].fact`, `kaupunkilehti[1].tehtava.fakta`, artikkelin väestöluvun laajuus ja 1873-ajan uskottavuus (intro). Yhteensä 25 väitettä tai väiteryhmää. Jokainen väite tarkistettu vähintään kahdella itsenäisellä lähteellä (Wikipedian kieliversioita ei lasketa itsenäisiksi): Wikipedia + viranomainen, museo, kaupunkikirjallisuus tai uutismedia (SGMC eli Sheikh Zayed Grand Mosque Centre szgmc.gov.ae, Qasr Al Hosn -museon historiasivu, Visit Abu Dhabi, Helmickin studio, UAE:n ulkoministeriö mofa.gov.ae, SCAD:n väestösivu census.scad.gov.ae, The National, Gulf News, Arab News, Transsolar, Metropolis, Saadiyat-saaren virallinen sivu, Rendel/BESIX-hankesivut). Haku vain WebSearch/WebFetch, ei massahakua. Merkintä "hakutuloksen kautta" = sivua ei haettu suoraan: Britannica (403) ja Dezeen (403) tulivat vain hakutuloksen otteena; szgmc.gov.ae/en/the-mosque (404) korvattiin sivuilla about/the-mosque-and-the-founder ja islamic-architecture/overview; scad.gov.ae (yhteys evätty) korvattiin census.scad.gov.ae- ja citypopulation.de-sivuilla. Commons-tiedot haettu Commonsin API:sta (yksi pyyntö per tiedosto, tunnistautuen) ja kuvat katsottu 960 px:n esikatselukuvina Read-työkalulla. Poliittinen sanasto: neutraalia, nykypolitiikkaan ei kosketa; Etihad Towers -sotavauriota ei ole tekstissä.

## 1. Yhteenveto

Väitteet (25 väitettä tai väiteryhmää): **OIKEIN 21, EPÄTARKKA 4, VIRHE 0.**

Kuvat (4 tarkistettua: kansi, kaksi nostoa, yksi muu nosto): **OIKEIN 3, EPÄTARKKA 1, VIRHE 0.** Kaikki tiedostot ovat Commonsissa, lisenssit (ei maapäätteitä) ja tekijät täsmäävät lähderiveihin. Ei väkivaltaa. Kasvot: vain Founder's Memorial -kuvassa Zayedin profiilimuotokuva on abstrakti pistekuvio (ei tunnistettava valokuva). Teksti: moskeijakuvassa ei tekstiä; muistomerkkikuvassa ei luettavaa tekstiä. PD-tekijän kuolinvuosi < 70 v: ei riskiä, koska kaikki kuvat ovat elävien valokuvaajien CC-kuvia (Robert Haandrikman, Francesco Bini, Olivier Teyssandier, Валерий Дед).

Neljä huomionarvoista löydöstä:

1. **Väestöluvun laajuus ei ole nimetty** (`artikkeli.intro`): "Abu Dhabin alueella asuu ... 2 823 340 (2024)". Luku on SCAD:n Abu Dhabi Region -hallintoalueen (osaemiirikunta, jonka suurimpia kaupunginosia ovat Musaffah, Al Danah ja Mohamed Bin Zayed City, siis saaren lisäksi mantereen esikaupunkeja), ei saarikaupungin eikä koko emiirikunnan (4 135 985). Wikipedian omat luvut ovat keskenään ristiriitaiset (kaupunkialue 2,5 milj. 2023; infolaatikko 2 189 860). Uusi pääsääntö 1 ei täyty.
2. **"Alle 250 metrin päässä mantereesta"** (neljässä paikassa) on vain Wikipedian luku; kiinteistösivut toistavat samaa tekstiä, eikä itsenäistä lähdettä löytynyt. Lisäsäännön (kaksi riippumatonta lähdettä tarkoille luvuille) mukaan luku pyöristetään tai jätetään pois.
3. **"Satojentuhansien asukkaiden kaupungiksi"** (silta-nosto): Wikipedia sanoo kahdessa kohdassa eri asian (suunnitelma 1967 "initially for a population of 40,000"; 1960-70-luvuilla "ennustettu enimmäisväkiluku 600 000"). Itsenäiset lähteet (ArchDaily, The National) tukevat vain lukua 40 000 (osa niistä sanoo sen olleen kaupungin silloinen asukasluku, ei tavoite). Nosto jättää alkuperäisen 40 000:n pois ja esittää yhden lähteen "satojatuhansia" varmana.
4. **Moskeijakuvan kuvateksti ei kuvaa kuvaa**: kuvassa on kaksi kullattua palmunlehtiaiheista koristetta valkoisessa marmoriseinässä, teksti kertoo materiaalien ja tekijöiden tulosta monista maista (sääntö 2).

**Toistuvan virhetyypin arvio (yksi rivi):** LUKU/LAAJUUS yhden lähteen (Wikipedia) varassa (250 m, 600 000 -suunnitteluluku, 2 823 340 ilman laajuutta, moskeijan 40 000 hengen kapasiteetti vs. virallinen 50 000) ja yksi kuvateksti, joka kertoo muusta kuin kuvasta; ei yhtään VIRHETTÄ, ja syy-seuraus-väitteet ovat lähteen sanoin ("lähteen mukaan") kunnossa.

## 2. Väitetaulukko

Polut ovat sisalto.json:n polkuja. "N0[i]" = `kaupunkilehti[0].nostot[i]`, "N1[i]" = `kaupunkilehti[1].nostot[i]`. Täydet perustelut luvussa 3.

| # | Väite | Polku | Tulos |
|---|---|---|---|
| A1 | Saari on alle 250 m mantereesta | N0[1].teksti; artikkeli.intro; tiedot[1]; matkailijalle.artikkeli.jaksot[0].kuva.selite | EPÄTARKKA |
| A2 | Ensimmäinen silta saarelta rakennettiin 1960-luvun lopulla aiemmin pieneen kalastajakylään | N0[1].teksti | OIKEIN (huom.) |
| A3 | Kaupunkisuunnitelma 1960- ja 1970-luvuilla, mitoitettu satojentuhansien asukkaiden kaupungiksi | N0[1].teksti | EPÄTARKKA |
| A4 | Zaha Hadidin suunnittelema Sheikh Zayed -silta avattiin 2010 | N0[1].teksti; N0[1].selite | OIKEIN |
| B1 | Moskeija on lähteen mukaan maan suurin | N0[3].teksti; kansikuvat[2].selite | OIKEIN (huom.) |
| B2 | Rakennustyö aloitettiin 1990-luvulla | N0[3].teksti | OIKEIN |
| B3 | Rukoussalit otettiin käyttöön joulukuussa 2007 | N0[3].teksti; kansikuvat[2].selite ("valmistui joulukuussa 2007") | OIKEIN (huom.) |
| B4 | Mukana tuhansia työntekijöitä | N0[3].teksti | OIKEIN |
| B5 | Materiaaleja ja tekijöitä Italiasta, Saksasta, Intiasta, Turkista, Iranista, Kiinasta, Britanniasta, Uudesta-Seelannista | N0[3].teksti | OIKEIN |
| B6 | 82 kupolia | N0[3].teksti; matkailu.parasta[0].selite | OIKEIN |
| B7 | Mahtuu noin 40 000 rukoilijaa | N0[3].teksti | EPÄTARKKA (lievä) |
| B8 | Pihan kukkakuvioista marmorimosaiikkia pidetään lähteen mukaan maailman suurimpana | N0[3].teksti; matkailu.parasta[0].selite | OIKEIN (huom.) |
| C1 | Founder's Memorial on muistomerkki ja kävijäkeskus Zayedille, joka oli ensimmäinen presidentti ja kuoli 2004 | N1[2].teksti | OIKEIN |
| C2 | Sanctuary Gardenin keskellä kuutiomainen paviljonki, jossa The Constellation | N1[2].teksti | OIKEIN (huom.) |
| C3 | Ralph Helmickin suunnittelema 3D-muotokuva, yli tuhatta kappaletta | N1[2].teksti; tehtava.fakta | OIKEIN |
| C4 | Kappaleet riippuvat kaapeleissa | N1[2].teksti | OIKEIN |
| C5 | Kappaleet ovat viittä eri Platonin kappaletta (tehtava.oikea = 2, "säännöllisistä monitahokkaista") | N1[2].teksti; tehtava | OIKEIN |
| C6 | Teos valaistaan öisin; sitä ympäröi korotettu kävelysilta | N1[2].teksti | OIKEIN |
| Q0 | Nimi: "abu" = isä, "dhabi" = gaselli; kertomus gasellia seuranneista metsästäjistä | kysymykset[0].fact/.hint; N0[0].teksti | OIKEIN (huom.) |
| Q1 | Helmenpyynti oli avainelinkeino ennen öljyä (kukoisti 1800-luvun lopulta) | kysymykset[1].fact/.hint | OIKEIN |
| Q2 | Louvre Abu Dhabi on Saadiyat-saarella; saaren nimi = onnen saari | kysymykset[2].fact/.hint | OIKEIN |
| Q3 | Zayed presidenttinä 2.12.1971 kuolemaansa 2004 asti, yli 30 vuotta | kysymykset[3].fact/.hint; N0[2].teksti | OIKEIN |
| Q4 | Nouvelin kupolin on tarkoitus muistuttaa auringonsäteitä, jotka suodattuvat palmunlehvien läpi keitaalla | kysymykset[4].fact; N1[0].teksti | OIKEIN |
| P | "Abu Dhabin alueella asuu ... 2 823 340 ihmistä (2024)" (laajuus) | artikkeli.intro | EPÄTARKKA |
| T | 1873: rannikolla asutus linnakkeineen, helmenpyynti keskeinen elinkeino; öljy ja silta myöhemmin | artikkeli.intro; kaupunkilehti[0].johdanto | OIKEIN |

Lisähuomio (ei arvioitu väitteenä): `tiedot[0]`, Corniche "noin kahdeksan kilometriä". Wikipedian Corniche-artikkeli ja useimmat matkasivut sanovat 8 km, mutta en-Wikipedian Abu Dhabi-artikkeli sanoo toisessa kohdassa "about 10 kilometres". Luku on toistettu viidessä kohdassa; kannattaa pyöristää ("kahdeksan kilometrin") vain jos kaksi lähdettä sen tukee, tai sanoa "useita kilometrejä".

## 3. Perustelut lähteineen ja korjatut lauseet

### Epätarkat

**A1. "Alle 250 metriä mantereesta" (EPÄTARKKA).** Wikipedia (en: Abu Dhabi): "on an island less than 250 metres (820 ft) from the mainland". Sama lause toistuu kiinteistösivuilla (Bayut-listaukset) ja matkasivuilla, jotka ovat selvästi Wikipedia-peilejä. Itsenäistä lähdettä, joka antaisi salmen leveyden metreinä, ei löytynyt (The National, Gulf News ja Rough Guides kertovat vain, että Maqta-kanava erottaa saaren mantereesta ja että yli pääsi aiemmin vuoroveden mukaan). Lisäsäännön mukaan tarkka luku vaatii kaksi riippumatonta lähdettä. Lähteet: https://en.wikipedia.org/wiki/Abu_Dhabi ; https://gulfnews.com/uae/how-abu-dhabis-historic-al-maqtaa-bridge-is-getting-refurbished-1.93581281 ; https://www.thenationalnews.com/business/property/abu-dhabi-bridges-gaps-1.523039 ; https://m.roughguides.com/united-arab-emirates/abu-dhabi/ .
- Polut: `.kaupunkilehti[0].nostot[1].teksti`; `.artikkeli.intro`; `.tiedot[1]`; `.kaupunkilehti[0].matkailijalle.artikkeli.jaksot[0].kuva.selite`.
- Korjattu lause (N0[1].teksti): "Abu Dhabin saari on vain kapean salmen päässä mantereesta." Intro: "Kaupunki seisoo **saarella Persianlahden rannalla**, aivan mantereen vieressä." tiedot[1]: "Abu Dhabi on saarella aivan mantereen vieressä, ja sinne pääsee silloilla." Kuvateksti jaksot[0]: "Siltayhteydet liittävät saarikaupungin mantereeseen." (Jos halutaan säilyttää luku: "Wikipedian mukaan alle 250 metrin päässä".)

**A3. Kaupunkisuunnitelma "satojentuhansien asukkaiden kaupungiksi" (EPÄTARKKA).** Wikipedia (en: Abu Dhabi / Architecture): suunnitelma tehtiin Sheikh Zayedin ohjauksessa japanilaisen Katsuhiko Takahashin toimesta 1967 "initially for a population of 40,000" ja toisessa kohdassa "in the 1960s and 70s was planned for a predicted topmost population of 600,000". Itsenäiset lähteet: ArchDaily-kaupunkiopas sanoo Takahashin 1967 yleissuunnitelman tavoiteasukasluvuksi 40 000; The National (Building a city from the sands) sanoo vain, että kaupungissa oli 1967 noin 40 000 asukasta ja Takahashi vastasi asemakaavasta; Archnet/tutkimusartikkelit sanovat toteutuneen eronneen ehdotetusta. Lukua 600 000 ei löytynyt mistään muualta kuin Wikipediasta. Nosto jättää 40 000:n pois ja esittää vain yhden lähteen "satojatuhansia". Lähteet: https://en.wikipedia.org/wiki/Abu_Dhabi ; https://en.wikipedia.org/wiki/Architecture_of_Abu_Dhabi ; https://www.archdaily.com (Abu Dhabi city guide, hakutuloksen kautta) ; https://www.thenationalnews.com/uae/building-a-city-from-the-sands-1.534085/ ; https://s3.amazonaws.com/media.archnet.org/system/publications/contents/13083/original/DTP105467.pdf (hakutuloksen kautta).
- Polku: `.kaupunkilehti[0].nostot[1].teksti`.
- Korjattu lause: "Kaupunkisuunnitelma tehtiin 1960-luvun lopulla, ja kaupunki kasvoi pian suunnitelmia suuremmaksi." (Tarkempi, jos halutaan: "lähteiden mukaan suunnitelma tehtiin aluksi noin 40 000 asukkaalle".)

**B7. Moskeijaan mahtuu "noin neljäkymmentä tuhatta rukoilijaa" (EPÄTARKKA, lievä).** Wikipedia: "over 40,100"; infolaatikko 41 000+. Arab News: "40 960". Khaleej Times ja ACC Group: "yli 40 000". Mutta moskeijan virallinen sivusto (SGMC) antaa kaksi eri lukua: "maximum capacity is approximately 50,000" (about/the-mosque-and-the-founder) ja "about 55,000 worshippers" (islamic-architecture/overview); pääsalin luku on virallisesti noin 7 800 (Wikipedia: yli 7 000) ja sisäpihan 31 000. Tarkka luku ei siis ole yksiselitteinen. Lähteet: https://en.wikipedia.org/wiki/Sheikh_Zayed_Grand_Mosque ; https://www.arabnews.com/node/367756 ; https://szgmc.gov.ae/en/about/the-mosque-and-the-founder ; https://szgmc.gov.ae/en/islamic-architecture/overview ; https://khaleejtimes.com/article/mosques-of-uae-sheikh-zayed-grand-mosque (hakutuloksen kautta).
- Polku: `.kaupunkilehti[0].nostot[3].teksti`.
- Korjattu lause: "Moskeijassa on 82 kupolia, ja siihen mahtuu kymmeniä tuhansia rukoilijoita."

**P. Väestöluvun laajuus (EPÄTARKKA).** Luku 2 823 340 (2024) on SCAD:n Abu Dhabi Region -hallintoalueen (census.scad.gov.ae/PReport; sama luku citypopulation.de:ssä); Al Ain -alue 986 910 ja Al Dhafra -alue 325 735, yhteensä emiirikunta 4 135 985. SCAD ei määrittele alueen rajoja, mutta nimeää alueen suurimmiksi kaupunginosiksi Musaffahin, Al Danahin ja Mohamed Bin Zayed Cityn eli luku kattaa saaren lisäksi mantereen esikaupungit. Faktapohja (rivi 419) varoittaa itse, ettei Wikipedian lukua pidä käyttää, mutta artikkelin lause "Abu Dhabin alueella" ei kerro laajuutta lukijalle (pääsääntö 1). Lähteet: https://census.scad.gov.ae/home/PReport?lang=en ; https://citypopulation.de/en/uae/abudhabi/admin ; https://www.wam.ae/en/article/bkg4o8s-abu-dhabi-population-2024-grows-75-reach-414 ; https://en.wikipedia.org/wiki/Abu_Dhabi (kaupunkialue 2,5 milj. 2023, ei ristiriidaton).
- Polku: `.artikkeli.intro`.
- Korjattu lause: "Abu Dhabin hallinnollisella alueella (Abu Dhabi Region, johon kuuluvat saarikaupungin lisäksi mantereen esikaupungit, mutta ei koko emiirikuntaa) asuu Abu Dhabin tilastokeskuksen mukaan 2 823 340 ihmistä (2024); koko emiirikunnassa asukkaita on noin 4,1 miljoonaa."

### Oikein, huomautuksin

**A2. Ensimmäinen silta 1960-luvun lopulla.** Wikipedia: Al Maqta Bridge "built in 1968 as the first connection to the previously small fishing village on the island". Gulf News/The National: ensimmäinen pysyvä tiesilta, vihki Zayed 6.8.1968 (yksi lähde); The National -kuvateksti sanoo 1967, Rough Guides 1966. "1960-luvun lopulla" kestää 1967–68, ja ennen siltaa oli vuorovesi- ja pengertiet (1949/1950-luku), joten "ensimmäinen silta" pitää, mutta "aiemmin pieneen kalastajakylään" on Wikipedian muotoilu. Lähteet: https://en.wikipedia.org/wiki/Abu_Dhabi ; https://gulfnews.com/uae/how-abu-dhabis-historic-al-maqtaa-bridge-is-getting-refurbished-1.93581281 ; https://thenationalnews.com/uae/comment/time-frame-tales-of-tarmac-and-wet-feet-1.156450 ; https://m.roughguides.com/united-arab-emirates/abu-dhabi/ . Ei korjausta.

**A4. Sheikh Zayed -silta 2010, Zaha Hadid.** Wikipedia: "designed by Zaha Hadid, opened in late 2010". Rendel (hankesivu): avattiin liikenteelle 25.11.2010; Gulf News ja The National: virallinen avajainen marraskuun lopussa 2010; Arabian Business. Lähteet: https://en.wikipedia.org/wiki/Abu_Dhabi ; https://www.rendel-ltd.com/?p=129 ; https://www.thenationalnews.com/uae/transport/sheikh-zayed-bridge-officially-opens-1.524113 (hakutuloksen kautta). OIKEIN.

**B1. Maan suurin moskeija.** Wikipedia ("the country's largest mosque", ilman viitettä); useat matkasivut ja Gulf Newsin Places-sivu toistavat; SGMC:n oma sivusto sanoo vain "one of the largest mosques in the world". Teksti on varovasti muotoiltu ("lähteen mukaan"), ja kansikuvan selite ("on maan suurin") on varmempi kuin lähde. Lähteet: https://en.wikipedia.org/wiki/Sheikh_Zayed_Grand_Mosque ; https://gulfnews.com/places/sheikh-zayed-grand-mosque (hakutuloksen kautta) ; https://szgmc.gov.ae/en/about/the-mosque-and-the-founder . Valinnainen tarkennus kansikuvat[2].selite: "...ja on lähteen mukaan maan suurin moskeija."

**B2–B3. Rakennustyö 1990-luvulla; rukoussalit joulukuussa 2007.** SGMC: "construction began on November 5, 1996" ja "the inner prayer halls were initially opened for worship of Eid Al Adha in 2007" (Eid al-Adha 2007 oli 20.12.). The National: avattiin yleisölle 20.12.2007 (hakutuloksen kautta). Wikipedia: "constructed between 1994 and 2007", "inaugurated in December 2007". Teksti "rukoussalit otettiin käyttöön joulukuussa 2007" on oikein; kansikuvat[2].selite sanoo "valmistui joulukuussa 2007", mikä on hieman vahvempi (sisäiset rukoussalit avattiin, koko kompleksin valmistuminen ei ole lähteissä yksiselitteinen). Lähteet: https://szgmc.gov.ae/en/about/the-mosque-and-the-founder ; https://en.wikipedia.org/wiki/Sheikh_Zayed_Grand_Mosque . Valinnainen: kansikuvat[2].selite "...avattiin joulukuussa 2007...".

**B4. Tuhansia työntekijöitä.** SGMC: "More than 3,000 workers and 38 contracting companies"; Wikipedia ja Arab News samoin. OIKEIN.

**B5. Materiaalien ja tekijöiden maat.** SGMC (islamic-architecture/overview): Italia, Saksa, Marokko, Intia, Turkki, Kiina, Britannia, Uusi-Seelanti, Kreikka, UAE; Wikipedia lisää mm. Iranin, Pakistanin, Malesian; Arab News listaa Iranin. Jokainen tekstin maa tuetaan vähintään kahdella lähteellä (Iran: Wikipedia + Arab News; muut: SGMC + Wikipedia). Lista ei ole tyhjentävä, ja "muun muassa" kattaa sen. OIKEIN.

**B6. 82 kupolia.** Wikipedia ("It features 82 domes"), Arab News ("82 domes of Moroccan design"); SGMC:n sivut eivät mainitse lukua. OIKEIN.

**B8. Pihan marmorimosaiikki "pidetään maailman suurimpana".** Wikipedia: "is considered to be the largest example of marble mosaic in the world"; SGMC: "may well be the largest marble mosaic artwork in the world"; suunnittelija britti Kevin Dean (SGMC). Lähteen oma muotoilu on varovaisempi kuin "pidetään". Lähteet: https://szgmc.gov.ae/en/courtyard ; https://en.wikipedia.org/wiki/Sheikh_Zayed_Grand_Mosque . Valinnainen: "Lähteen mukaan pihan kukkakuvioinen marmorimosaiikki voi olla maailman suurin."

**C1–C6. Founder's Memorial.** Wikipedia: "a monument and visitor centre ... memorial to Zayed", "Sanctuary Garden", "cubic pavilion housing The Constellation", "Designed by artist Ralph Helmick", 1 327 muotoa 1 110 kaapelissa, "five different types of regular, convex polyhedrons known as 'platonic solids'", "lit at night", "surrounded by an elevated walkway". Helmickin oma studio: 1 327 muotoa 1 110 kaapelissa, viisi Platonin kappaletta, 753 alasuuntaista ja 1 203 ylöspäin suunnattua valaisinta; Gulf News: "shine like stars at night". Visit Abu Dhabi: korotettu kävelysilta ja Welcome Centre. Zayedin kuolema 2004: UAE:n ulkoministeriö (mofa.gov.ae: presidentti 2.12.1971, kuoli 2004) ja Wikipedia. Huom. C2: Helmick kuvaa paviljonkia sanalla "prismatic 30 m-high Pavilion"; "kuutiomainen" on Wikipedian "cubic" ja sopii kuvaan (kuvassa laatikkomainen rakennelma), eli ei korjausta. Teksti käyttää tarkkaa lukua vain muodossa "yli tuhannesta", mikä on turvallinen. Ralph Helmick on yhdysvaltalainen (Wikipedia: Ralph Helmick; Helmickin studio). Lähteet: https://en.wikipedia.org/wiki/The_Founder%27s_Memorial ; https://helmicksculpture.com/work/the-constellation ; https://visitabudhabi.ae/en/what-to-see/historical-and-cultural-attractions/the-founders-memorial ; https://gulfnews.com/uae/government/founders-memorial-opens-to-public-on-april-22-1.2203435 ; https://www.mofa.gov.ae/en/the-uae/the-founder ; https://en.wikipedia.org/wiki/Ralph_Helmick . OIKEIN.

**Q0. Nimen merkitys.** Wikipedia: "Father of the gazelle", legenda gasellia seuranneista metsästäjistä; The National (UAE:n emiirikuntien nimet): "father of the gazelle", kertomus Visit Abu Dhabi -lähteestä, mutta huomauttaa, että "abu" voi olla assosiatiivinen sana eikä kirjaimellinen "isä". Vihje sanoo oikein "suosittu kertomus". `.fact` esittää etymologian varmana ("tarkoittaa"); muotoilu "Nimi tarkoittaa perinteisen selityksen mukaan gasellin isää" olisi tarkempi. Lähteet: https://en.wikipedia.org/wiki/Abu_Dhabi ; https://www.thenationalnews.com/arts-culture/2025/08/15/how-the-uaes-seven-emirates-got-their-names-and-what-they-mean . OIKEIN (huom.). Valinnainen korjaus kysymykset[0].fact: "Nimen selitetään tarkoittavan gasellin isää: ”abu” on isä ja ”dhabi” gaselli."

**Q1. Helmenpyynti.** Wikipedia: "a key industry prior to the discovery of oil reserves", buumi 1800-luvun lopulta 1910-luvulle; Qasr Al Hosn -museon historiasivu: 1800-luvun lopulla yli 400 helmiveneen laivasto, Persianlahden suurin; Gulf News (pearl diving history): vauraus 1800-luvun lopusta 1910-luvulle. https://qasralhosn.ae/history/ ; https://gulfnews.com/uae/year-of-the-50th/year-of-the-50th-a-look-at-uaes-pearl-diving-history-1.1625588554243 (hakutuloksen kautta). OIKEIN.

**Q2. Louvre Abu Dhabi Saadiyat-saarella; Saadiyat = onnen saari.** Wikipedia: "located on Saadiyat Island"; Domus ja UAE:n Washingtonin-suurlähetystö (hakutuloksen kautta): Saadiyatin kulttuurialue, jossa Louvre; Gulf News ja saadiyat.ae: "Island of Happiness". OIKEIN.

**Q3. Zayed presidenttinä 1971–2004.** UAE:n ulkoministeriö: ensimmäinen presidentti, virassa unionin perustamisesta 2.12.1971; kuoli 2004; WAM (ensimmäinen kuolinvuosipäivä 2.11.2005). Wikipedia samoin. "Yli kolmekymmentä vuotta" (33) pitää. https://www.mofa.gov.ae/en/the-uae/the-founder ; https://www.wam.ae/en/article/hsyifwpl-zayed-039father-the-nation039 ; https://en.wikipedia.org/wiki/The_Founder%27s_Memorial . OIKEIN.

**Q4. Kupoli.** Wikipedia: "rays of sunlight passing through date palm fronds in an oasis", 7 850 alumiinitähteä kahdeksassa kerroksessa; Transsolar: Nouvelin "Rain of Light" sai alkunsa palmunlehtien läpi suodattuvasta auringonvalosta keitaalla; Metropolis ja Design Curial samoin; Gulf News: peitteen suunnittelu perustui päällekkäisiin palmunlehtiin. Kaikki ovat arkkitehtien ja kriitikoiden tulkintaa, ei Nouvelin suoraa lainausta, joten "lähteen mukaan" on oikea muotoilu. Lähteet: https://en.wikipedia.org/wiki/Louvre_Abu_Dhabi ; https://transsolar.com/projects/louvre-abu-dhabi ; https://metropolismag.com/projects/louvre-abu-dhabi/ ; https://gulfnews.com/uae/government/dome-cladding-of-abu-dhabi-louvre-progresses-1.1475880 (kaikki kolme viimeistä hakutuloksen kautta). OIKEIN.

**T. 1873-ajan uskottavuus.** Asutus ja linnake: Qasr Al Hosn -museon sivu: alkuperäinen vartiotorni 1760-luvulla, vallan keskus siirtyi saarelle 1795; Zayed Suuri hallitsi 1855–1909 ja laajensi linnaketta helmipyynnin tuloilla; Wikipedia: asutus 1761 (Bani Yas, Al Bu Falah). Helmenpyynti: Qasr Al Hosn -sivun mukaan 1800-luvun lopulla yli 400 venettä; Wikipedia ja Gulf News samoin. Öljy: ensimmäinen konsessio 1939 (Qasr Al Hosn), tuotanto vasta 1900-luvun jälkipuoliskolla; ensimmäinen silta 1968. Intro on uskottava Trucial-rannikolle 1873 ("rannikolla asutus linnakkeineen" on vaatimaton ilmaus). Ei korjausta. Lisähuomio: Qasr Al Hosnin ikä ("1700-luvulta") ja nimi "Valkoinen linnake" on faktapohjassa itse merkitty ristiriitaiseksi; ei kuulu tähän pistokokeeseen.

Lisähuomio (tekstin ulkopuolinen sivuhuomio N0[2]): "Pääkaupunki, joka ei ollut ensimmäinen suunnitelma" tarkistettiin sivuhuomautuksena. Perustuslain (1971, artikla 9) mukaan uusi kaupunki Al Karama rakennettaisiin Dubain ja Abu Dhabin rajalle seitsemässä vuodessa, ja Abu Dhabi nimettiin "väliaikaiseksi" pääkaupungiksi; "väliaikainen" poistettiin vuoden 1996 muutoksessa (Wikipedia: Al Karama; UAE:n perustuslain teksti u.ae / elaws.moj.gov.ae). Zayedin ja Rashidin periaatesopimus 18.2.1968 (Wikipedia: Argoub Al Sedirah; Gulf News/UAE National Archives). Nosto on lähteen sanoin ja oikein.

## 4. Kuvat

Kaikilta kuvilta tarkistettu Commons-sivu (API: extmetadata), lisenssin lyhytnimi, tekijä, kuvaus ja esikatselukuva.

| # | Kohta | Tiedosto | Commons | Lisenssi (Commons) / tekijä | Kuvateksti vs. kuva | Tulos |
|---|---|---|---|---|---|---|
| K1 | Kansi 1 (kaupunkilehti[0].kansikuvat[0]) | Skyline of Abu Dhabi at sunset.jpg | olemassa, 6720x3270, otettu 2016-12-19 | CC BY 2.0; Robert Haandrikman (täsmää) | Kuvassa kallioinen ranta, tyyni lahti, torneja ja Emirates Palace oikealla; teksti "länsiranta ... rantakadun eteläpäässä Emirates Palace -hotelli" sopii (Wikipedia: "at the southern end of the corniche"; rantakatua ei kuvassa nähdä, mutta hotelli tunnistuu). Ei kasvoja, ei tekstiä, ei väkivaltaa. | OIKEIN (huom.) |
| K2 | Nosto N0[1] | Abu Dhabi 2013 - panoramio.jpg | olemassa, 1280x685, 25.2.2013 | CC BY 3.0; Валерий Дед (täsmää) | Ilmakuvassa näkyy kaksi siltaa: yläpuolella Zaha Hadidin aaltomainen Sheikh Zayed -silta ja alempana valkoinen kaarisilta (Maqta). Teksti nimeää vain Sheikh Zayed -sillan; kuvaa vastaava ("avattiin 2010, suunnitteli Hadid" on tekstin taustatieto, ei kuvassa näkyvä, mutta kohde on kuvassa). Ei kasvoja, ei tekstiä. | OIKEIN (huom.) |
| K3 | Nosto N0[3] | Abu dhabi, Moschea dello Sceicco Zayed, loggiati, pilastri, capitelli dorati 01 a palmizio.jpg | olemassa, 5436x4394, 14.11.2023 | CC BY-SA 4.0; Francesco Bini (Sailko; täsmää) | **Ei täsmää:** kuvassa on kaksi kullanväristä palmunlehtiaiheista pylväänpäätä valkoisessa marmoriseinässä (lähikuva). Kuvateksti "tuotiin materiaaleja ja tekijöitä monista eri maista" ei näy kuvassa (sääntö 2). Ei kasvoja, ei tekstiä. | EPÄTARKKA |
| K4 | Nosto N1[2] (lisätarkistus) | Abu Dhabi, Founder's Memorial.jpg | olemassa, 4928x3264, 26.3.2019 | CC BY-SA 4.0; Olivier Teyssandier (täsmää) | Kuvassa yöllä valaistu laatikkomainen paviljonki, jonka sisällä riippuvista kappaleista muodostuu profiilihahmo, taustalla tornit. Teksti "muistomerkki Arabiemiirikuntien ensimmäiselle presidentille" sopii (Commons-kuvaus: "The Founder's Memorial (The Constellation) in Abu Dhabi, by night"). Hahmo on abstrakti pistekuvio. | OIKEIN |

PD-tekijöiden kuolinvuosi (< 70 v): ei tapauksia (kaikki CC-lisensoituja, tekijät elossa). Lisenssin maapäätteitä ei esiinny.

- K3 polku: `.kaupunkilehti[0].nostot[3].selite`. Korjattu kuvateksti: "Sheikh Zayedin suurmoskeijan valkoisessa marmoriseinässä on kullanvärisiä palmunlehtiaiheisia koristeita." (Materiaalitieto kuuluu leipätekstiin, jossa se jo on.)
- K1 valinnainen: `.kaupunkilehti[0].kansikuvat[0].selite` kunnossa; Corniche ei näy kuvassa, mutta sen mainitseminen sijaintina on hyväksyttävää.

## 5. Korjausten lista (ehdotukset, ei tehty)

1. `.artikkeli.intro`: väestön laajuus (Abu Dhabi Region + emiirikunnan luku) ja "alle 250 metrin" pois (A1).
2. `.kaupunkilehti[0].nostot[1].teksti`: "alle 250 metrin" pois; "satojentuhansien asukkaiden" pois tai kerro 40 000 (A1, A3).
3. `.tiedot[1]`; `.kaupunkilehti[0].matkailijalle.artikkeli.jaksot[0].kuva.selite`: "alle 250 metrin" pois (A1).
4. `.kaupunkilehti[0].nostot[3].teksti`: "noin neljäkymmentä tuhatta" -> "kymmeniä tuhansia" (B7); valinnainen "voi olla maailman suurin" (B8).
5. `.kaupunkilehti[0].nostot[3].selite`: kuvateksti kuvaa vastaavaksi (K3).
6. Valinnaiset: `.kysymykset[0].fact` (etymologian varauksellisuus), `.kaupunkilehti[0].kansikuvat[2].selite` ("avattiin joulukuussa 2007", "lähteen mukaan maan suurin"), Corniche-pituuden pyöristys (`tiedot[0]` ym.).
