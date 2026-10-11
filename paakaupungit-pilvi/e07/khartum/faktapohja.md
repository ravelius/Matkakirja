# Khartum — faktapohja, vaihe A

`khartum`, SDN, e07. Koostettu 11.10.2026. Kirjoitusalue vain tämä faktapohja; lähdevastaukset omassa NAS-kansiossa `valiaikainen/khartum-A`. Ei Commons-kuvahakuja, Git-operaatioita, sää-/kontekstimuutoksia, pelitiedostoja tai sisältö-JSONia. Tämä on kirjoitusaineisto, ei kuvitus-, integraatio- tai julkaisuhyväksyntä. **Kuudelle paikkavaihtoehdolle on lähdekoordinaatti ja faktajoukko, mutta museoalueen/vanhan katedraalin pääaiherajaus ja Valkoisen Niilin suupisteen geometrinen ristiriita jäävät porttiin. A:n kohdekarttaa ei väitetä lopullisesti hyväksytyksi.**

## 0. Luetut lähteet ja 1873-kehys

AGENTS.md, CODEX.md, PILVIOHJE 3/4/7/13 ja LISÄSÄÄNTÖ sekä lehtityöresepti luettu tässä e07-kloonissa. Rakenteessa aiemmin luetun Nairobi-mallin 0–9-osioajatus. Konteksti.json ja valmis saa.json luettu, sääajon lokissa Khartumin rivi. Omistajan sallima lähdesivukanava: robots-sallitut tavalliset Wikipedia-/Wikivoyage-sivut estettyjen API-reittien sijaan; Wikidata Special:EntityData sallittu. Kaikki pyynnöt/redirectit `sallittu_haku.py`-apurilla, yhteinen robots/ratecache ja `sallitut-haut.jsonl` säilyttävät polun/URL:n/tarkistusjäljen. Hakukoneosumat vain otsikko-/Q-paikantimina; niistä ei kopioitu tarkistamattomia väitteitä. Commons-sivuja ei avattu A:ssa.

Tarkat julkaistavat historialliset vuodet/lukumäärät vaativat kaksi riippumatonta lähdettä. Wikipedia, sen kieliversio ja sama taustakirjan viite eivät itsenäisiä kolmella tavalla. Käytetään vuosisatoja/noin/poistoa. Koordinaatit ja lähde-/revisio-/normaalikausitunnisteet ovat tarkistusmetadataa. Syy–seuraus vain lähteen ilmoittamana. Vanhaa matkailuneuvoa ei nykyiseksi toimintalupaukseksi.

| Tunnus | Lähde ja luettu käyttö |
| --- | --- |
| S1 | [Khartoum, en-Wikipedia](https://en.wikipedia.org/wiki/Khartoum): johdanto, Etymology, History, Geography, Transportation, Architecture, Culture. Historia erotettu nykyisistä tapahtumista; nykyinen politiikka/sota/rikollisuus ei kirjoitusaihe. Climate luettu taustaristiriidan löytämiseksi, numeroille vain saa.json. |
| S2 | [Timeline of Khartoum](https://en.wikipedia.org/wiki/Timeline_of_Khartoum): 1800-luvun ja 1900-luvun alun kaupungin vaiheita, college, sillat, katedraali, museo. Aikajanan koordinaatti yleinen kaupunkipiste, ei nähtävyys. Perustaja-/vuosivaiheet osin ristiriitaisia S1:n kanssa. |
| S3 | [Tuti Island](https://en.wikipedia.org/wiki/Tuti_Island): saaren sijainti, kylä, maatalous, vihannes-/sitrusviljely ja aiemmat vesiyhteydet. Lähteen ennen nykytilannetta dokumentoitu maisema ei vuoden 2026 viljely-/asukasmäärä-/lauttaliikennetakuu. |
| S4 | [National Museum of Sudan](https://en.wikipedia.org/wiki/National_Museum_of_Sudan): History, Collection, museum garden / relocated temples, inscriptions ja Tabo-tausta. Arkeologiset kerrokset historiallisesti dokumentoituna kokoelmana; nykyistä avoinnaoloa, kokoelmien säilymistä ja esineiden näkemistä ei luvata. Farasin maalaukset eivät uusi nosto, koska maalehdessä jo aihe. |
| S5 | [Sudan National Botanical Garden](https://en.wikipedia.org/wiki/Sudan_National_Botanical_Garden): Location, yksiköt, tasks/objectives. Elävät kasvit, herbaario, siemenet, geneettisten resurssien säilyttäminen ja tutkimus. Viitepuutemerkintä; aukiolot/maailmansuperlatiivit/ala pois. |
| S6 | [St. Matthew’s Cathedral, Khartoum](https://en.wikipedia.org/wiki/St._Matthew%27s_Cathedral,_Khartoum): historia ja rakennusvaiheet. Ristiriitainen 1908/1932–1933-ajoitus ja Pietro Laffranchi -tekijäketju; ei kartalle tai kuvapääteokseksi. |
| S7 | [Republican Palace Museum, Khartoum](https://en.wikipedia.org/wiki/Republican_Palace_Museum,_Khartoum): entinen All Saints -katedraali, rakennuksen käyttömuutokset ja oma koordinaatti. Kokoelmapolitiikka, nykyiset valtionjohtajat, autonlahjoittajat/aseet ja aukiolot eivät sisältöä. Vanha katedraalirakenne erotetaan uudesta palatsista ja nykyosista. |
| S8 | [Khalifa House Museum](https://en.wikipedia.org/wiki/Khalifa_House_Museum): vanha asuin-/hallintotalo, mutatiili, pihat, museovaihe, entisöinti/digitointi. Oma WP/WD-koordinaatti ristiriitainen oman Omdurman-sijaintikuvauksen kanssa; kartalta pois. |
| S9 | [Souq al Arabi](https://en.wikipedia.org/wiki/Souq_al_Arabi): markkinapaikka, sijainti, korttelit, tuoteryhmät ja oma koordinaatti. Ei “suurin”-superlatiivia julkaisuun. |
| S10 | [White Nile](https://en.wikipedia.org/wiki/White_Nile): johdanto ja Sudan-osuus, päättyminen Siniseen Niiliin Khartumissa. Uganda-/Victorianjärvi-/joen pituustarina ei toistu lähinostosta. Joen leipätekstin yleis-/lähdekoordinaatti ei paikallinen suu. |
| S11 | [Architecture of Sudan](https://en.wikipedia.org/wiki/Architecture_of_Sudan): Khartumin 1800-luvun/siirtomaa-ajan rakentaminen, kaupunkisuunnitelma, 1900-luvun alku ja myöhempien arkkitehtien nimetyt teokset. Modernit suojatut arkkitehtuuriteokset pois; vanhan instituution nimi ei kaikkien kampusrakennusten ikä. |
| S12 | [Gordon Memorial College](https://en.wikipedia.org/wiki/Gordon_Memorial_College): alku, opetusalat, yliopistovaihe ja kirjasto. Oma rakennuskoordinaatti ei löytynyt; ei nykyisen yliopiston yleispistettä varhaisen college-rakennuksen paikaksi. |
| S13 | [Blue Nile Road & Railway Bridge](https://en.wikipedia.org/wiki/Blue_Nile_Road_%26_Railway_Bridge): vanha tekninen silta, oma koordinaatti, bascule-tyyppi, rakentaja/suunnittelija. Ei kartan kuudenneksi määrästä päätettynä; faktoja niukasti, nykyisten osien oikeusketju ja pääaihe erikseen. |
| S14 | [Omdurman Bridge](https://en.wikipedia.org/wiki/Omdurman_Bridge): vanha White Nile -teräsristikkosilta, oma WP-piste/WD-piste eroavat. Ei yleinen jokisuun koordinaatti. Määrämitat ja tarkat rakentamisvuodet pois julkaisutekstistä. |
| S15 | [Cooper Bridge](https://en.wikipedia.org/wiki/Cooper_Bridge): ohjautui Kober-siltaan, moderniin 2014 avattuun siltaan. Nimi ei vanhan rautatiesillan synonymi; ei kartalle. |
| V1 | [Khartoum, en-Wikivoyage](https://en.wikivoyage.org/wiki/Khartoum): Understand, See, Buy, Eat ja Nile Avenue / Tuti. Useat listaukset 2011/2012/2019/2022: vanha matkailutausta, ei nykypalveluita, lentoreittejä, hintoja, aukioloaikoja tai turvallista kävely-/lauttareittiä. Koordinaatit vain ristiriitavertailun taustana, eivät WP/WD-vaatimuksen korvikkeita. |
| A1 | [متحف بيت الخليفة, ar-Wikipedia](https://ar.wikipedia.org/wiki/%D9%85%D8%AA%D8%AD%D9%81_%D8%A8%D9%8A%D8%AA_%D8%A7%D9%84%D8%AE%D9%84%D9%8A%D9%81%D8%A9): täydennyshaku Khalifan talon koordinaatti-/rakennusvaihe-ongelmaan. Toistaa virheellisen etäisen WP/WD-pisteen, historialliset vuodet ristiriitaisia myös sisäisesti; ei korjaukseksi. |
| T1 | [Sudan: matkustustiedote, UM](https://um.fi/matkustustiedote/-/c/SD): päiväys 18.9.2026, tarkistettu 11.10.2026. Turvallisuustaso “Poistu välittömästi maasta”; vältetään kaikkea matkustamista Sudaniin. KRT-kentän sulku, viestintäkatkot, kuvausrajat ja rajalliset terveyspalvelut. Ei nykyisten tapahtumien/osapuolten tarinaa lehtitekstiin. FCDO-varalähdettä ei tarvittu, koska maakohtainen UM löytyi. |
| WD1 | [Khartoum Q1963](https://www.wikidata.org/wiki/Special:EntityData/Q1963.json): kaupunki/yleispiste, kontekstin lat/lon säilyvät. |
| WD2 | [Tuti Island Q1703518](https://www.wikidata.org/wiki/Special:EntityData/Q1703518.json): oma saaren P625 15.619176, 32.505495. |
| WD3 | [Sudan National Botanical Garden Q85870573](https://www.wikidata.org/wiki/Special:EntityData/Q85870573.json): oma puutarhan P625 15.601911, 32.509125; WP-piste eroaa hieman. |
| WD4 | [National Museum of Sudan Q643453](https://www.wikidata.org/wiki/Special:EntityData/Q643453.json): koko museoalueen oma P625 15.606, 32.508. Ei kunkin temppelirakennuksen tarkka erillispiste. |
| WD5 | [Souq al Arabi Q104866545](https://www.wikidata.org/wiki/Special:EntityData/Q104866545.json): oma markkinapaikan P625 15.601, 32.525, precision 0.001. |
| WD6 | [White Nile Q4814791](https://www.wikidata.org/wiki/Special:EntityData/Q4814791.json): P625:n lähde- ja suuqualifierit erotettu. Paikallinen suu 15.623611111111, 32.501944444444, `P518: Q1233637` river mouth. Lähdepiste Ugandassa ei käytössä. |
| WD7 | [Nile Q3392](https://www.wikidata.org/wiki/Special:EntityData/Q3392.json): P625 15.640138888888888, 32.5055 on `river source`, Välimeren piste `river mouth`. Niistä ei Al-Mogran-puiston/laiturin pisteitä. |
| WD8 | [Khalifa House Museum Q16878222](https://www.wikidata.org/wiki/Special:EntityData/Q16878222.json): etäinen 15.383, 32.29, ei korjaa Omdurman-ristiriitaa. |
| WD9 | [Republican Palace Q435348](https://www.wikidata.org/wiki/Special:EntityData/Q435348.json): artikkeliketjusta löytynyt tunniste on labeliltaan palatsi, ei itsenäinen toinen vanhan museokatedraalin lähde. Kartassa käytetään S7:n omaa rakennuskoordinaattia. |
| WD10 | [Blue Nile bridge Q482349](https://www.wikidata.org/wiki/Special:EntityData/Q482349.json) ja [Omdurman Bridge Q436067](https://www.wikidata.org/wiki/Special:EntityData/Q436067.json): omat teknisten siltapaikkojen pisteet; ei jokisuu tai yleinen jokipiste. |
| WD11 | [Gordon Memorial College Q5585565](https://www.wikidata.org/wiki/Special:EntityData/Q5585565.json): institutionaalinen tunniste ilman P625:tä; ei kartalle keksityllä yliopistopisteellä. |

Qualifierit [Q1233637 river mouth](https://www.wikidata.org/wiki/Special:EntityData/Q1233637.json) ja [Q7376362 river source](https://www.wikidata.org/wiki/Special:EntityData/Q7376362.json) luettu EntityData-vastauksista, ei arvattu numeroista. Khartoum Botanical Garden ja Al-Mogran -kokeillut en-otsikot 404; oikea puutarha löytyi S5-otsikolla. `Tea lady` -otsikko osoittautui brittiläiseksi työpaikka-ammatiksi, ei Sudanin katumyyjäksi; sen tietoja ei käytetä.

### 1873-kehys

- Khartum oli olemassa 1873: moderni kaupunki syntyi 1800-luvun alussa Egyptin vallan ajan tukikohdasta ja hallinto-/kauppapaikasta (S1 History). Perustajanimet ja hallinnon siirron vuodet eivät kaikissa lähteissä samat; käytetään vaiheita/vuosisataa.
- Joet ja saari eivät ole kaupungin perustamisessa luotuja. Tutin kylästä ja viljelyhistoriasta voidaan kertoa kaupungin rinnalla, mutta nykyisiä peltojen määriä, kylän tarkkaa asukaslukua tai vuoden 1873 taloa ei päätellä nykykuvasta (S3).
- 1800-luvun keskivaiheen tulva-/rakennustapojen muutokset ja kauppareitit kuuluvat jo historialliseen kehykseen (S1). Niitä ei kuvata yhdellä lähteellä julkaistavin tarkoin päivin eikä nykyisen matkan tulvaennusteena.
- Gordon Memorial College, kansallinen kasvitieteellinen puutarha, nykyinen museoalue ja entinen All Saints -katedraali ovat myöhempiä paikkoja/instituutioita. Ne eivät vuoden 1873 vierailukohteita (S5; S7; S12).
- Museon puutarhan temppelit olivat 1873 muualla alkuperäisillä Nubian paikoillaan. Muinaisen rakennuksen vanhuus ei tee sen nykyisestä Khartumin sijainnista muinaista (S4).
- Khartumin/Omdurmanin muutos 1800-luvun lopulla käsitellään neutraalina tapahtuma- ja kaupunkihistoriana, ei sotaretken tai johtajan sankarikuvana. Nykyiset tapahtumat eivät aihe.
- Isoisän käynnit, reitti, havainto, valokuva, tuttu tai lainaus eivät lähdefaktoja. A ei keksi niitä.

## 1. Perusfaktat

| Kenttä | Vahvistettu aineisto / raja |
| --- | --- |
| Nimi | Khartum; kontekstin al-Kharṭūm / الخرطوم, wikiavain Khartum. En-lähde Khartoum tunnistettu. |
| Rooli | Sudanin pääkaupunki; ei päätelmä nykyisistä hallinnon henkilöistä (S1; WD1). |
| Sijainti | Valkoisen ja Sinisen Niilin kohtaamisalueella; yhteinen kaupunkiseutu Khartum, Omdurman ja Bahri/Khartoum North (S1). |
| Kaupunkipallo | Kontekstin 15.603, 32.527. Ei kohdepiste tai sääaseman uusi koordinaatti. |
| Väestö | Kontekstin 2008 laskenta: Khartumin kaupunki noin 1,4 miljoonaa. Vuosi ja kaupungin laajuus aina mukana, tai vanha luku pois nykykuvauksesta. |
| Väestömetadata | Kontekstissa kaupunki 1 410 858 / 2008, kolmen kaupungin kaupunkialue 4 272 728 ja osavaltio 5 274 321 / 2008. Osavaltion 2018 projektio eri asia. S1:n tuoreet ulkoiset arvio-/metropoliluvut eivät luotettava uusi paikallinen laskenta. |
| Historia | 1800-luvun alun tukikohdasta hallinto- ja kauppakaupunki, myöhemmin uudelleen rakennettu ja laajentunut (S1; S2). |
| Kaupunkirakenne | Joet erottavat kolmen kaupungin osia; Khartum proper ei kaikki Omdurman tai Bahri. Siltayhteydet eri aikakausilta (S1; V1). |
| Ambience | `kaupunki`, mahdollinen `basaari` toimituksen äänimaisemaratkaisuna; joen pituus/lähdematka ei uusi nosto. |
| Nykyopas | Matkailu ei tällä hetkellä turvallista; kaikkea Sudaniin matkustamista vältetään, maassa olevan poistuttava välittömästi (T1). Ei matkanvaraussuositusta. |

Kontekstin maalehden historia-, ruoka-, musiikki-, kuvataide- ja luontoaiheet luettu. Lähinosto Niilistä on olemassa. Suualue ja joet voivat olla perusmaantietoa/kartan paikkoja, mutta niiden sekoittumisen/pisimmän joen ja Ugandan lähdeketjun tarinoita ei uutena nostona. Haboob, karakade, papujen pitkä haudutus, kisran paisto, Farasin maalaukset, nubialainen holvi ja kirjoituksen tulkinta eivät uusien nostojen aiheita.

## 2. Kansi ja neljä nostoaihetta

Kansikuvat B:lle laajasta paikallisesta kaupunki-/jokimaisemasta, Tutin luonnon/vanhan kaupunkitilan suhteesta sekä keskustan katutilasta. Ei Corinthia/Al-Fateh-, GNPOC-, uusi palatsi-, Friendship Hall- tai moderni siltateos päämotiiviksi. Tuoreen kuvan on vastattava nykyistä ilmettä; A ei ehdota uuden kuvan ottamista vaarallisessa paikassa. Historiallisia kuvia ei naamioida nykyoppaan kuviksi.

### Kansi-introa varten

Khartumin erityisyys on kaupunkiseudun ja veden yhteinen rakenne: joet erottavat Khartumin, Omdurmanin ja Bahrin, mutta vanhat yhteydet sitovat ne yhteen. 1800-luvun kaupungin kauppa ja hallinto, Tutin maatalous, markkinoiden tuoteryhmät sekä tutkimuksen/oppilaitosten kerrokset antavat eri näkökulmat. Johdannossa voi sanoa kaupungin syntyneen 1800-luvun alussa, mutta ei synnyn olleen koko seudun historian alku. Väestöluku vain vanhana rajattuna laskentana. Nykyoppaassa matkustusrajoitus suoraan. Intro ei lupaa tämän päivän avointa museota, viljelysaarta, lauttaa tai kulttuuritapahtumaa.

### K1 — Kolme kaupunkia saman veden ympärillä

1. Khartumin kaupunkiseutu koostuu Khartumista, Omdurmanista ja Bahrista/Khartoum Northista (S1).
2. Omdurman on Valkoisen Niilin länsipuolella, Bahri Sinisen Niilin pohjoispuolella (S1 johdanto/Transportation; V1).
3. Varsinainen Khartum sijaitsee näiden jokien välisessä kaupunkitilassa (S1).
4. Joet ovat erottavia alueita ja kulkuyhteyksien rajoja; sillat ylittävät eri jokia eri suuntiin (S1 Transportation).
5. Khartumin vanha keskustaverkko suunniteltiin uudelleen 1800-luvun lopulla (S1 History; S11).
6. Omdurman säilytti omassa kehityksessään erilaisen katu-/kaupparakenteen (S1 History; V1:n vanha kaupunkikuvaus).
7. Khartum Northin historiallisessa kehityksessä telakka ja rautatie olivat merkittäviä (S1 History).

**Havainto:** “Khartum” voi tarkoittaa yhtä kaupunkia tai koko kolmen kaupungin seutua. Tämä tekee väestöluvusta ja kartan paikoista ymmärrettäviä ilman joen maailmapituuden tarinaa. Ei nykyistä liikennöinti-/teollisuustuotantotakuuta eikä tarkkoja korttelin rakentamisvuosia. Sillat eivät automaattisesti tämän noston modernit suojatut kuvapääteokset.

### K2 — Viljelysaari keskellä kaupunkiseutua

1. Tuti on jokisaari kolmen kaupungin välissä (S3).
2. Saarella on dokumentoitu kaupungin syntyä vanhempi kylä (S3; tarkka 1400-luvun lopun ajoitus ei julkaistava exact-fakta yksin artikkelista).
3. Viljely on ollut keskeinen maankäyttö (S3).
4. Peltoja ja kasvitarhoja kuvataan saaren eri osissa (S3).
5. Sitrus-/limettipuut kuuluvat dokumentoituun viljelymaisemaan (S3).
6. S3 kuvaa hedelmien ja vihannesten toimittamista kaupunkiseudulle; “suurin osa nykyisestä ruoasta” -lukua ei anneta.
7. Aiemmat kulkuyhteydet olivat lautta-/vesiyhteyksiä ennen modernia siltaa (S3; S1).

**Aikataso:** kuvaus on lähteiden aiemmin dokumentoima maatalous- ja kylähistoria. Ei tämän päivän asukas-/toimintatilannetta tai kuvaa tyhjästä “koskemattomasta” saaresta. Ei luvattua iltakävelyä, lauttaa tai uuden turistikeskuksen toteutumista. Nostoon ei jokiveden kahden värin sekoittumistarinaa, joka on maalehdessä jo olemassa.

### K3 — Tavara määrää torin suunnan

1. Souq al Arabi on Khartumin keskustan ulkoilmamarkkina (S9).
2. Markkina levittäytyy usealle korttelille (S9).
3. Paikka kuvataan suuren moskeijan ja minibussiaseman eteläpuolelle (S9); niiden rakennukset eivät torin päämotiivi.
4. Myyjät sijoittuvat tuoteryhmittäisiin osiin (S9).
5. V1 kuvaa kultaan keskittyvän myyntiosan (V1 Buy; vanha opastieto, ei nykyinen kauppalupa).
6. Omdurmanin markkina ja Bahrin Saad Gishra ovat eri markkinapaikkoja, vaikka ne kuuluvat samaan kaupunkiseutuun (V1 Buy).
7. V1:n kuvaamat kaupunkimarkkinat sisältävät sekä arjen tavaroita että käsityötuotteita; yhden myyjän tavaraa ei päätellä yleislistauksesta.

**Havainto:** tavararyhmät ovat yksi torin paikkamuistin tapa. Ei hinnaston, nykyisten myyjien, “Afrikan suurin” -superlatiivin tai turvallisen ostospäivän lupausta. Nykyinen liiketoiminta tai funktionaalinen markkina ei automaattisesti suojattu arkkitehtuuriteos; kuvan pääaihe silti katutila/kojut hyväksyttävästi, ei uusi nimetty suunnitteluhalli, logo tai lähikasvot.

### K4 — Mittaaja ja opettaja aloittivat samassa collegessa

1. Gordon Memorial College oli Khartumin 1900-luvun alun oppilaitos, nykyisen yliopiston edeltäjä (S12).
2. Varhaiseen opetukseen kuului alkeisopetus (S12).
3. Myöhemmin lisättiin teknistä opetusta tuleville apulaisinsinööreille ja maanmittaajille (S12).
4. Opettajien koulutus oli oma osa koulutuskehitystä (S12).
5. Myöhemmät ammatilliset alat sisälsivät kirjanpidon, toimistotyön ja tieteen opetusta (S12).
6. Kursseilla oli yhteys työtehtäviin hallinnossa; tätä kuvataan aikakauden koulutusrakenteena, ei siirtomaajärjestelmän kehumisena (S12).
7. College ja lääketieteen koulu yhdistyivät myöhemmin yliopistocollegeksi, josta syntyi University of Khartoum (S12).

**1873:** tätä collegea ei vielä ollut. Institutionaalinen historia ei nykyisten kampusrakennusten PD-lupa; uusien luentosalien ja muiden nimettyjen modernien arkkitehtuuriteosten pääkuvia ei käytetä. Opetus-/kirjastohistoriaa voi havainnollistaa oikeusketjultaan varmennetulla varhaisella paikkakuvalla tai jättää kuvan avoimeksi. Ei nykyisten opiskelijoiden määrää tai nykyisten hallinnon henkilöiden listaa.

## 3. Teemasivu: historia

Työnimi “Rakennusten ja kokoelmien toinen elämä”. Neljä erillistä aihetta, ei maalehden Faras-maalauksia, muotitta muurattua holvia tai haudan mustavalkoisia kivikerroksia. Minitehtävä: miksi museon vanhat temppelit ovat nykyään eri paikkakunnalla kuin alun perin? Vastaus H3:ssa; vihje/vaihtoehdot eivät kopioi sen virkettä sanasta sanaan. Ei sama kuin kaupungin visa.

### H1 — Tulva muutti rakennusaineita

1. Khartum syntyi 1800-luvun alun sotilaallisesta/hallinnollisesta tukikohdasta (S1).
2. Hallinnon paikka siirtyi Wad Madanista Khartumiin varhaisessa vaiheessa (S1).
3. Kauppa ja karavaanireittien levähdyspaikka kasvoivat osaksi kaupunkia (S1).
4. S1 kuvaa 1800-luvun keskivaiheen tulvia ja jälleenrakentamista (S1 History; historiallinen tapahtuma, ei ilmastotilasto).
5. Sen kuvauksessa olki-/ruokorakenteita korvattiin muta-/kivirakentamisella (S1).
6. Eurooppalaisia konsulaatteja ja uskonnollisia laitoksia perustettiin kaupunkiin 1800-luvulla (S1; S2).
7. 1800-luvun lopun uudelleenrakentaminen tuotti myöhemmin uuden katuverkon (S1; S11), ei sama kuin vuoden 1873 kaupunki.

**Raja:** asutus-/kauppahistoriaa ei valkoiseksi tyhjäksi kartaksi eikä valloitussankariksi. Kaupungin varhaiseen kauppaan liittyi myös orjakauppaa; neutraali lyhyt historiallinen fakta tarvittaessa (S1), ei väkivallan yksityiskohtia tai nykyinen rinnastus. Tarkat tulvavuodet, talomäärät ja uudet samasta tulvasta päätellyt rakennukset pois. Maalehden haboob-ilmiö ei tämä tulvakertomus. Ei nykyisiä ilmastotrendejä tai tulvaennustetta.

### H2 — Elävän kasvin rinnalla on arkistokasvi

1. Kansallinen kasvitieteellinen puutarha on Mogranin alueella (S5).
2. Puutarha on 1900-luvun laitos (S5), ei 1873 puutarha.
3. Se yhdistää elävien kasvien kokoelman herbaarioon (S5).
4. Siementen keruu ja säilytys kuuluvat kuvattuihin tehtäviin (S5).
5. Kasvien luokittelu ja tutkimuksen tietoaineisto ovat omia toimintamuotoja (S5).
6. Kasvien geneettisten resurssien säilyttäminen on tavoite (S5).
7. Vaihto tutkimuslaitosten/puutarhojen kanssa ja koulutus sisältyvät kuvattuun organisaatioon (S5).
8. Taloudellisesti tärkeät kasvit kuuluvat sen tehtäväalueeseen, ei vain koristekukinta (S5).

**Havainto:** elävä kasvi ja herbaarionäyte ovat eri tapoja säilyttää kasvista tietoa. Herbaarion valmistuksen kemia/kuivausmenetelmä ei tässä lähteessä: ei muistista täydennystä. Ei nykyinen kasvilajimäärä, vuotuinen näyttely, pääsymaksu, aukiolo tai “Afrikan vanhin” -väite. Kuvassa kasvit ja tunnistettu paikka, modernit puutarharakennukset/veistokset eivät automaattisesti vapaita.

### H3 — Temppeli on vanha, sijainti uudempi

1. Kansallismuseon puutarhaan siirrettiin muinaisia rakennuksia Nubian alueelta (S4).
2. Taustalla oli Niilin padotuksen muodostaman järven alle jäävien paikkojen pelastushanke (S4).
3. Buhenin temppeli kuuluu siirrettyihin rakennuksiin (S4).
4. Akshan, Kumman ja Semnan rakennusosia kuvataan samassa museoalueen historiallisessa aineistossa (S4).
5. Rakennukset pystytettiin uudelleen alkuperäisten suuntiensa mukaisesti (S4).
6. Puutarhan keinotekoinen vesiuoma viittasi Niiliin (S4); tämä myöhempi puutarhasuunnitelma ei muinainen jokiuoma.
7. Muinaisten seinien/reliefien ikä ja Khartumiin siirtämisen aika ovat eri tietoja (S4).
8. Museon vanha kuvaus kertoo näistä rakennuksista, mutta nykyisiä säilymis-/pääsytietoja ei tueta sillä (S4; T1).

**1873:** rakennukset olivat alkuperäisillä Nubian paikoillaan. Ei yksittäisen temppelin alkuperäistä P625:tä siirrettyjen seinien nykykoordinaatiksi eikä museoalueen samaa yleispistettä neljäksi erilliseksi karttakohteeksi. Farasin seinämaalausten pelastus on maalehdessä; se jätetään tästä nostosta pois. B kuvaa vain tunnistettua muinaista hyväksyttävää rakennetta, ei nykyistä museotaloa tai modernia puutarhataidetta pääteoksena. Tarkat pelastuksen/rakennusten määrät ja faaraoiden vuodet pois ilman riippumatonta tukea.

### H4 — Katedraali vaihtoi tehtävää

1. Republican Palace Museumin rakennus oli All Saints -anglikaanikatedraali (S7).
2. Se valmistui 1900-luvun alkupuolella (S7; S11).
3. Katedraalin alkuperäinen kirkollinen käyttö päättyi myöhemmin 1900-luvulla (S7).
4. Korvaava kirkkopaikka perustettiin Al-Amaratiin; vanha rakennus jäi välivaiheessa käyttämättä (S7).
5. Vanhan rakennuksen kellotorni poistettiin ennen museomuunnosta (S7).
6. Rakennuksesta tuli myöhemmin museopaikka; kokoelmatehtävä ei sama kuin vanhan katedraalin rakennusvaihe (S7).
7. Sitä ei samasteta kompleksin vanhaan/new Republican Palace -päärakennukseen (S7 Location).

**Raja:** museoalueen nykyinen politiikka, valtionjohtajien kuvat, aseet ja autonlahjoittajien tarinat pois. Lasimaalauksissa artikkeli erottaa Mabel Esplinin ja Joan Fulleyloven; osien tekijät/oikeudet eivät yhden rakennusvuoden perusteella kaikki samat. Suojatut myöhemmät lasimaalaukset/teokset eivät kuviin tai uudeksi kohdeteemaksi. Historiallinen vanha rakennus voi olla pääaihe vain B:n rakenne-/oikeustunnistuksen jälkeen. **1873:** tätä katedraalia/museokäyttöä ei vielä ollut.

## 4. Opas

Nykyoppaan lähtövirke pelaajalle, ilman lähdemetatekstiä: **“Matkailu Khartumiin ei ole tällä hetkellä turvallista. Kaikkea Sudaniin matkustamista on vältettävä, ja maassa olevan tulee poistua välittömästi.”** T1, 18.9.2026, tarkistettu 11.10.2026. Tämä ei matkailijoille suositeltava viiden vierailun reitti. Kaupungin tuntemista voi kuvata virtuaalisesti ja historiallisesti; käytännön matkustusneuvoja ei kirjoiteta vanhoista Wv-listauksista.

### Jakso 1 — Perille ja liikkeelle

- Khartoum International Airport (KRT) on kaupungin tunnettu lentoasema, mutta T1:n mukaan se on suljettu eikä käytössä. Ei lentoja, lentoyhtiöitä tai yhteysaikoja varattaviksi.
- Uuden lentoaseman suunnitelma S1/V1 ei vahvistettu toimiva vaihtoehto. Ei tähän A:han uutta kenttää tai maa-/rajareittiä poistumisohjeeksi.
- Joet, sillat, linja-autot ja kaupunkiosat auttavat ymmärtämään karttaa (S1), mutta liikennöinnin tämänhetkinen saatavuus/turvallisuus ei varmistettu.
- T1 kertoo viestintäkatkoista; puhelin ja internet eivät luotettava paikallisen matkasuunnitelman perusta. Nykyisen maassa olevan tilanteessa viranomaisten ajantasaiset poistumisohjeet, ei A:n keksimää reittiä.
- Oppaan tietoalueellinen varaus ei vaadi nykyisten konfliktitapahtumien tai osapuolten kertomusta peliin.

### Jakso 2 — Historiallinen keskusta ja toripaikka

- Varsinainen Khartum, Omdurman ja Bahri ovat eri osia samaa seutua (S1; V1).
- Souq al Arabi on dokumentoitu keskustan markkinapaikka omine kortteleineen ja tuoteryhmineen (S9). Nykyistä avointa kaupankäyntiä ei luvata.
- Nile Street / al-Nil on historiallisten rakennusten ja joen yhteinen katuympäristö (S1; V1). Vanhasta Wv-neuvosta ei nyt kävelykierrosta.
- Entinen All Saints -katedraali ja nykyinen palatsikokonaisuus erotetaan. Valtion rakennuksille ei luvata pääsyä tai kuvausoikeutta (S7; T1).
- V1:n vanhat päivät/ajat ja vartijan ohitukset eivät nykyohje. Suojatut modernit hotellit/monumentit eivät lehden pääkohteita.

### Jakso 3 — Saari, kasvit ja arkeologinen muisti

- Tutin dokumentoitu maataloushistoria antaa toisen näkökulman kaupunkiseutuun (S3). Ei nykyistä saarikävelyä tai lauttaa.
- Kasvitieteellinen puutarha yhdistää kasvit ja tutkimuksen tietovarannot (S5). Nykyistä pääsyä/kasvikokoelmaa ei luvata.
- Museoalueen arkeologinen historia ja siirretyt muinaiset rakennukset ovat dokumentoitua aineistoa (S4); kirjoitetaan aiemmin kuvattuina kokoelmina/rakenteina, ei nykyinen näyttelyluettelo.
- Niilin paikallinen suualue ja Tutin saari ovat eri karttakohde-identiteettejä. Siltapiste tai joen lähdepiste ei puiston tai laiturin paikka.
- Museopääsy, jokiretki, puutarha ja veneily eivät nyt tämän oppaan toimintaehdotuksia. Myös hyväksyttävä arkistokuva erotetaan matkailukelpoisuudesta.

### Jakso 4 — Ruokaperinne ilman vanhaa ravintolalupausta

- V1 kuvaa gurasaa paksuna vehnäpohjaisena leipänä/lättynä, jota tarjotaan kastikkeen kanssa.
- Sen paikallisessa ruokakuvauksessa kastike voi liittyä okraan ja lihaan; ei uusi maalehden kisra-paiston, karakaden tai pitkään haudutettujen papujen tarina.
- Khartumin vanhat ravintolalistaukset kuvaavat kansainvälisiäkin ruokaperinteitä (V1 Eat). Niitä ei tämän päivän aukiolo-, turvallisuus- tai menutakuiksi.
- Tutiin liittyvä aiempi hedelmä-/vihannesviljely on dokumentoitua maataloushistoriaa (S3), ei varmistettu nykyinen ruokatoimitusketju.
- Ruokakuvassa vain kuvasivun tunnistama annos; geneerinen leipä tai kastike ei gurasaa ilman tunnistusta. V1:n vanhat hinnat, verot ja alkoholinhankintaohjeet pois. T1:n kuvaama terveyspalvelujen rajallisuus ei tekstistä keksitty ruokakohtainen tautiluokitus.

### Jakso 5 — Lämpö ja sadekausi ovat taustatietoa

Ilmastotekstin kaikki luvut vain valmiista saa.json:sta. Marras–helmikuun normaaleissa lämpötilat ovat vuoden kuumimpia kuukausia matalammat, mutta päivät ovat yhä lämpimiä. Tammi-/joulukuun keskilämpö on noin 24–25 astetta; touko–kesäkuun noin 35 astetta. Huhti–kesäkuun keskimääräiset päivittäiset yläarvot ovat noin 41–42 astetta. Sadetta on vähän, noin 120 millimetriä vuodessa, ja pääosa tiedoston kuukausisateesta keskittyy heinä–syyskuulle. Elokuu on normaalisarjan sateisin kuukausi. Tiedoston pyöristetty nolla ei “ei koskaan sadetta”. Ilmasto ei muuta nykyistä matkustusrajoitusta eikä ole tietyn päivän ennuste.

**Säätausta:**

- Valmis tiedosto `paakaupungit-pilvi/e07/khartum/saa.json`, alkuperäisen `tyokalu.mjs saa`-ajon tulos hyväksytyllä lähdesivusovituksella. Ajoloki `valiaikainen/e07/saa/alkuperainen-saa-ajo.txt`; Khartumin rivi luettu. A ei muuttanut säätä.
- Lähde en-Wikipedia, Khartoum-artikkelin ilmastotaulukko, revisio `1378835098`, luettu `2026-10-11`.
- Taulukko `Climate data for Khartoum (1991–2020)`, normaalikausi `1991–2020`.
- Taulukon lähdeketju: World Meteorological Organisation; NOAA (`extremes and humidity 1961–1990`); Deutscher Wetterdienst (`sun, 1961–1990`). Jälkimmäiset kaudet koskevat taulukon muita muuttujia, eivät sääfileen perussarjan kauden vaihto. Raakadataa ei luettu kolmelta palvelulta erikseen; tämä on taulukon lähdeketju.
- `keskilampo`: `Daily mean °C (°F)` -rivi. Ei käsin laskettu `(ylin + alin) / 2`.
- `ylin`/`alin`: keskimääräiset päivittäiset ylä-/alalämpötilat työkalun pyöristyksin; eivät ennätykset.
- `sade`: `Average precipitation mm (inches)`; kokonaisprecipitation-rivi, ei Monrovian tapainen erillinen rainfall-only-varaus. Tiedoston `tausta.huomiot` tyhjä.
- `vuosisade: 120`, työkalun valmis arvo. Painettu taulukkovuosirivi 120.4 mm pyöristyy hieman eri tarkkuudelle; A ei laske/kopioi kuukausia käsin.
- Tallennetut `lat: 15.6`, `lon: 32.53` ovat sääfileen paikannus. Taulukon otsikko ei nimeä erillistä lentokenttää/asemakoodia, joten sitä ei keksitä. Ei Monrovian Roberts Airport -etäisyysvarauksen siirtämistä Khartumiin.
- S1:n Climate-leipätekstin vuosisade ja kuukausiarvot sekä V1:n kaavio eivät julkaisutekstin numerolähteitä. T1:n kesäkuumuuden tarkkaa lämpötilalukua ei kopioida; tämän kaupungin kaikki ilmastonumerot saa.json:sta.
- Ei maailman kuumin/sateisin -vertailua, current-year trendiä, nykyistä hiekkamyrskyennustetta tai sadekausivierailun suositusta.

### Parasta (5)

Alla kaupungin tuntemisen aiheet, **eivät tällä hetkellä suositeltava fyysinen reitti**. Tähtiä ei liitetä matkaturvallisuuden arvioon.

1. Kolmen kaupungin jokimaantieteen ymmärtäminen (S1).
2. Tutin aiemman viljelymaiseman suhde ympäröivään kaupunkiseutuun (S3).
3. Souq al Arabin dokumentoitu tuoteryhmittäinen kauppapaikka (S9).
4. Museoalueen siirrettyjen muinaisten rakennusten ja uusien sijaintien ero (S4).
5. Kasvitieteellisen tiedon ja oppilaitosten historia kaupungissa (S5; S12).

### Hyvä tietää (4)

1. **Matkustus:** matkailu ei nyt turvallista, kaikkea matkustamista vältetään; maassa olevan poistuttava välittömästi. T1, 18.9.2026 / luettu 11.10.2026.
2. **Liikkuminen ja yhteydet:** KRT on T1:n mukaan suljettu, viestintäkatkoja esiintyy. Ei keksittyä korvaavaa lento-/maareittiä tai vanhoja Wv-bussihintoja.
3. **Kuvaaminen:** T1:n mukaan arkaluontoisia kohteita, julkisia rakennuksia, siltoja ja lentokenttiä ei saa kuvata; henkilöiden kuvaamiseen lupa. Tämä ei uuden kenttäkuvauksen kehotus eikä Commons-lisenssin poistaminen, vaan käytännön kuvausraja.
4. **Pääsy ja terveys:** terveyspalvelut puutteellisia ja paikkojen nykyinen avoinnaolo/pääsy ei varmennettu. Vanhat museo-/puutarha-/ravintolalistaukset eivät nykyretken lupaus. Ei terveysohjetta tai epidemioiden tarinaa.

## 5. Kohdekartta: kuusi lähdekoordinoitua paikkavaihtoehtoa, portit avoinna

Historiallisen Khartumin paikallinen ydin, Tuti ja suualue: Omdurmanin keskustan ristiriitainen Khalifan talopiste, etäinen Soba tai kaukainen linnoitus eivät täytettä. Khartum on suuri; pienen kaupungin 1–5-poikkeusta ei käytetä. Kuusi lähdepaikkaa ei vielä tarkoita kuuden täysin hyväksytyn kohteen joukkoa. B:n teoskohtainen raja ja suupisteen geometrinen ero voivat edellyttää korvaavaa paikkaa tai toimituksen erillistä ratkaisua. Mitään suojattua nykytaidetta, henkilöä tai tapahtumaa ei karttapisteeksi.

| Kohde/tila | lat | lon | Oma lähde ja tarkkuusraja |
| --- | ---: | ---: | --- |
| Tutin saari | 15.61918 | 32.50550 | WD2 P625, oma saari. Ei Tuti-sillan pääteos/laituri tai kylän yhden talon piste. |
| Kansallinen kasvitieteellinen puutarha | 15.60191 | 32.50913 | WD3 P625, oma puutarha. S5 WP 15.6017, 32.5091 hieman eri aluepiste; ei yhdistetty keskiarvoksi. |
| Souq al Arabi | 15.60100 | 32.52500 | S9 oma koordinaatti ja WD5 P625, precision 0.001. Markkina-alue, ei yhden kaupan ovi. |
| Sudanin kansallismuseon museoalue, ehdollinen | 15.60600 | 32.50800 | S4 ja WD4 sama oma museoaluepiste. Ei museoalueen yleispistettä kuudeksi eri temppeliksi eikä suojattua modernia museotaloa pääkohteeksi. |
| Entinen All Saints -katedraalipaikka, ehdollinen | 15.60806 | 32.52889 | S7 oma rakennuskoordinaatti. WD9:n palatsilabel ei toinen riippumaton rakennuslähde; uutta palatsia ei vanhaksi katedraaliksi. |
| Valkoisen Niilin suualue, geometria tarkistettava | 15.62361 | 32.50194 | WD6 P625 + P518 river mouth, lähde tuotu ru-Wikipediasta. **Ei yleinen jokipiste.** V1:n Al-Mogran-listaus 15.614938, 32.492122 ja WD7:n pää-Niilin source-piste eroavat; suupisteen nykyistä tarkkaa suhdetta nimettyyn Al-Mogran-kärkeen ei ratkaistu. |

Viisi desimaalia on pyöristetty esitystapa, ei lähdetarkkuuden parantuminen. Lopullinen rajaus vasta kelvollisen kohdelistan/joen paikannuksen ratkaisun jälkeen; ei suupisteen, lähdepisteen tai puistopisteen keskiarvoa. Esittelyaihe kaupungin paikallisista luonnon-/kulttuuripaikoista, ei turvallisen kuuden käynnin päiväohjelma. Luonnon-/torikohteet `luonto`/`aukio`; vanha katedraalirakenne ja museoalueen paikkajuttu eivät modernin suojatun teoksen kiertotie.

### 1 — Tutin saari

1. Saari sijaitsee Khartumin/Omdurmanin/Bahrin kaupunkiseudun jokien välissä (S3).
2. Se on oma jokisaaripaikka, ei kaupungin tai sillan yleispiste (S3; WD2).
3. Saaren kylähistoria edeltää modernia Khartumia (S3).
4. Viljely ja kasvitarhat ovat dokumentoitu pääkäyttö (S3).
5. Sitrus-/limettipuut ja vihannespellot kuuluvat aiempaan paikkakuvaukseen (S3).
6. Hedelmä-/vihannesviljely liitti saaren kaupunkiseudun ruoantuotantoon (S3).
7. Vesikuljetus oli yhteyden tapa ennen modernia siltaa (S3; S1).
8. Kyläympäristö, pellot ja kaupunkitausta ovat eri osia samasta saaresta (S3), eivät lupaus samasta nykymaisemasta.

**1873:** saari ja vanha kylä olivat aiemmassa historiassa olemassa; nykyinen silta, nimetyt pellot/talot ja saman yksittäisen sitruspuun olemassaolo tuolloin eivät vahvistettuja. Ei nykyinen turistikeskus, asukas-/toimintatilanne, “vain pieni kylä” nykylukuna tai iltakävely/veneily. B:ssä saaren luonnon/vanhan paikallisen maatalousmaiseman paikkatunnistus, uusi silta ei pääteokseksi.

### 2 — Kansallinen kasvitieteellinen puutarha

1. Puutarha on Khartumin Mogran-alueella (S5).
2. Elävien kasvien kokoelma on osa sen kuvattua toimintaa (S5).
3. Herbaario tuo talletetun kasviaineiston rinnalle (S5).
4. Siemenkeruu/säilytys kuuluu tehtäviin (S5).
5. Kasvien luokittelu ja tieto-/dokumentointityö kuuluvat toimintaan (S5).
6. Geneettisten kasviresurssien säilyttäminen on ilmoitettu tavoite (S5).
7. Kasvitieteellinen tutkimus, koulutus ja vaihto muiden tutkimuslaitosten/puutarhojen kanssa on kuvattu (S5).
8. Mukana myös taloudellisesti tärkeitä kasveja, ei pelkkä koristekukinta (S5).

**1873:** 1900-luvun puutarhainstituutiota ei vielä ollut. Ei aukioloa, kukkanäyttelypäivää, tiettyjen nykyisten kasvien määrää/lajia, nykyistä kasvihuonetta tai Afrikka-superlatiivia. S5:n viitepuute merkitään: organisaatiotehtävien tausta hyödyllinen, mutta niitä ei tämän päivän toteutuneeksi tapahtumaksi. Funktionaalinen kasvikokoelma ei automaattisesti suojattu taideteos; B tunnistaa päämotiivin kasvit/vanhan hyväksyttävän paikan eikä suojattu uusi rakennus/veistos.

### 3 — Souq al Arabi

1. Nimellä on oma Khartumin markkina-alue (S9; WD5).
2. Se on dokumentoitu ulkoilmamarkkina keskustassa (S9).
3. Markkina levittäytyy usealle korttelille (S9).
4. S9 paikantaa sen suuren moskeijan eteläpuolelle (S9).
5. Myös minibussiasema kuuluu lähteen sijaintikuvaukseen, ei kohteen alkuperäinen nimi tai ikä (S9).
6. Myyjät järjestäytyvät tuoteryhmittäisiin osiin (S9).
7. V1 kuvaa kulta-/korutavaran myyntiin liittyvän osan (V1 Buy).
8. V1 erottaa tämän markkinan Omdurmanin ja Bahrin muista kauppapaikoista (V1 Buy).

**1873:** näistä lähteistä ei saman nykyisen markkinan perustamis-/käyttöaikaa. Kaupungin aiempi kauppa ei todistus tämän saman torikorttelin tuolloisesta muodosta. Historiallisesti dokumentoitu paikka, ei nykymyyjien toiminnan tai pääsyn lupaus. B:ssä hyväksyttävä toritila ilman suojattua nimettyä modernia hallia, mainosta tai lähikasvoja. Ei nykyistä hintavertailua/suurin-superlatiivia tai naapurimoskeijan kuva torikuvana.

### 4 — Sudanin kansallismuseon museoalue, ehdollinen

**Pääaiherajaus:** paikallinen museoalue ja muinaisten rakennusten siirretty sijainti. **Nykyisen 1900-luvun museotalon suojattua arkkitehtuuria ei kohteeksi.** Kohteeksi valitaan paikka, ei yksittäinen patsas/taideteos; kuvat tarkoin vanhasta rakennusaineistosta B-portissa. Saman paikan piste vain kerran.

1. Museoalue sijaitsee al-Mugranissa Nile Avenuella (S4).
2. Paikan tunnettu kokoelma käsitti Sudanin eri arkeologisia aikakausia (S4, historiallinen kokoelmakuvaus).
3. Puutarhassa oli uudelleen pystytettyjä muinaisten temppelien/tombien osia (S4).
4. Rakennuksia siirrettiin padotusjärven vaikutusalueelta (S4).
5. Buhen ja Semna kuuluvat dokumentoituun siirrettyjen rakennusten joukkoon (S4).
6. Myös Akshan ja Kumman rakennusaineistoa kuvataan (S4).
7. Uudelleen pystytyksessä säilytettiin rakennusten alkuperäisten paikkojen suuntaa (S4).
8. Keinotekoinen vesiuoma kuvasi Niiliä museoalueen myöhemmässä maisemassa (S4); se ei muinainen ympäristö tai yleinen kuvaoikeus.

**1873:** muinaiset rakennukset olivat alkuperäisillä Nubian paikoillaan. Nykyistä museotaloa/-aluetta tai niitä nykyisessä puutarhassa ei ollut. S4:n nykyinen artikkeli ei tue avoinnaoloa/kokoelman aiemman laajuuden säilymistä; kuvaus kirjoitetaan historiallisesti, ei virheelliseksi nykyvierailuksi. B:n rakennuksen alkuperäinen vanha rakenne, siirtotyön nykyosat ja kuvan lisenssi tarkistettava. Jos kuva/tyyppi edellyttää modernin museotalon suojattua pääteosta, paikka jää pois ja korvaava kohde puuttuu. A ei hyväksy epämääräistä museon “kaikki PD” -väitettä.

### 5 — Entinen All Saints -katedraalipaikka, ehdollinen

**Pääaiherajaus:** rakennuksen historiallinen kirkollinen vaihe ja tehtävän muutos. Ei presidentinpalatsi, uusi palatsi, nykyinen johtaja, museon moderni muotokuvataide tai politiikkakokoelma.

1. Nykyisen museopaikan rakennus oli anglikaanikatedraali All Saints (S7).
2. Se valmistui 1900-luvun alussa (S7).
3. Kirkkokäyttö päättyi myöhemmin ja korvaava kirkko sijoittui Al-Amaratiin (S7).
4. Rakennus jäi käytöstä välivaiheeseen (S7).
5. Kellotorni poistettiin ennen museomuunnosta (S7).
6. Paikasta tuli myöhemmin museopaikka (S7).
7. Se sijaitsee palatsikompleksissa mutta ei sama rakenne kuin palatsien päärakennukset (S7 Location).
8. Lasimaalauksia suunnitteli enemmän kuin yksi tekijä; yksittäisten myöhempien osien oikeudet eivät rakennusvuoden automaattinen tulos (S7, vain toimituksellinen raja).

**1873:** tätä katedraalirakennusta ei vielä ollut. S11 sanoo tyylistä eri tavalla kuin S7:n Byzantine-luokitus: pelkkää tyylinimeä ei julkaisufaktaksi ilman tarkempaa varmennusta. B tunnistaa alkuperäisen hyväksyttävän rakennusosan/arkistokuvan, myöhemmät muutokset ja suojatut lasimaalaukset. T1:n julkisten rakennusten kuvausraja ja matkarajoitus: ei sisäänpääsy-/ulkokuvauksen neuvoa. Jos rakennusketju ei anna hyväksyttävää vanhaa pääaihetta, kohde pois; A ei päättele arkkitehdin kuolinvuotta iästä.

### 6 — Valkoisen Niilin suualue, paikannusportti avoin

**Tyyppi:** luonnonpaikka. P625:n qualifier on nimenomaan suu, joten kyse ei koko pitkän joen summittaisesta pallosta. Pisteen geometrinen suhde Al-Mogranin nimettyyn kärkeen/saarten ympärillä kulkeviin haaroihin on silti ristiriitainen lähdeketjujen välillä. Tässä käytetään nimeä **suualue**, ei Al-Mogran-puiston/laiturin/niemenkärjen tarkka sijainti.

1. Valkoinen Niili saapuu Khartumiin etelän suunnasta (S10 Sudan-osuus).
2. Se päättyy Khartumin alueella Sinisen Niilin yhtymään (S10; S1).
3. Se on tässä nimetty Niilin sivujoki, ei pää-Niilin Välimeren suu (S10; WD6/WD7).
4. Khartumin/Omdurmanin kaupunkiosia erottaa sen paikallinen vesireitti (S1 Transportation).
5. Tuti kuuluu samaan jokien/saaren maantieteelliseen kokonaisuuteen (S3), mutta oma saaren piste eri paikka.
6. Omdurmanin vanha White Nile -silta ylittää joen, ei ole suu itse (S14).
7. Suun ja pää-Niilin alun paikantavat qualifierit ovat eri tietoja kuin kaupunkipallo tai nähtävyyspuiston portti (WD6; WD7; toimituksellinen paikannusraja).

**1873:** jokien maantieteellinen suhde kuuluu kehykseen, mutta tämän päivän rannansuun/saaren haaran, sillan, puiston tai laiturin tarkkaa muotoa ei vuoteen 1873. Maalehden kahden vesivärin sekoittumiskertomus ja lähinoston Ugandasta alkava pituusmatka pois uusista nostoista/visasta. Ei veneilyä, sillalta valokuvausta, uimista tai nykyistä vedenlaatusuositusta. **Puute:** ennen lopullista karttaa vahvistettava, miten WD6:n 15.62361, 32.50194 vastaa nykyistä nimettyä suualueen kohtaa suhteessa V1:n Al-Mogran-paikannukseen. Ei niiden hiljainen valinta/keskiarvo eikä kahta nimeä samalle arvattuna kuudenneksi pisteeksi. Jos tarkistus ei ratkea, hyväksyttävä kuudes kohde puuttuu.

### Tutkitut vaihtoehdot, eivät kartan täytettä

- **Khalifan talo:** S8/A1/WD8 15.383, 32.29 on ristiriidassa oman Omdurman-sijaintikuvauksen kanssa; V1:n 15.639008, 32.488503 olisi oikean kaupungin ympäristöä, mutta Wv ei oletuskoordinaattilähde. Ei siirretä pistettä käsin/EXIFistä tai käytetä naapurin Mahdi-haudan pistettä talolle.
- **St. Matthew:** artikkeli kertoo varhaisen 1900-luvun valmistumisesta ja samalla 1930-luvun Laffranchi-rakennusketjusta. Tekijän ilmoitettu kuolema 1961 alittaa tilauksen 70 vuoden rajan. Ristiriidan selvittämiseen asti pois suojattuna/epävarmana pääteoksena; alkuperäinen 1800-luvun pieni kirkko ei nykyisen fyysisen katedraalin ikä.
- **Gordon College:** instituution historiasta aineisto, oma vanhan rakennuksen WP/WD-piste puuttuu. Nykyinen yliopisto sisältää suojattuja moderneja arkkitehtuuriteoksia; yleispiste ei varhainen rakennus.
- **Blue Nile Road/Railway Bridge ja Omdurman Bridge:** omat pisteet, mutta lyhyet artikkelit ja nykyisen rakenteen/teosketjun raja. Funktionaalinen tekninen silta ei automaattisesti suojattu taideteos, mutta myöhempää suojattua suunnittelurakennetta ei oteta määrän täytteeksi. Ajantasainen pääsy/kuvaus myös T1:n rajoittamaa. Ei niitä jokisuun sijaintina.
- **Omdurmanin/Saad Gishran markkinat, etnografinen museo:** historiallinen/vanha opastieto on olemassa, mutta tässä haussa ei omaa WP/WD-kohdepistettä ja täyttä lähdeketjua nykyosien rajaukseen. Wv-listing ei suoraan oletussääntöä.
- **Soba ja Umm Marrahi:** historiallisia paikkoja, mutta etäällä paikallisesta keskustaytimestä. Ei ne suurkaupungin vajaan kohdejoukon täytteeksi.
- **Al-Mogran Development Project / Family Park:** moderni kehityshanke, puisto/rides ja luonnon yhtymäkohta eri asioita. Nimen samankaltaisuus ei hankepisteestä joensuupistettä eikä puistosta vapautuneen teoksen lupaa.

## 6. Viisi kysymysaihetta ja kolme tietoa

| Taso | Kysymysaihe | Oikea ajatus | Lähde |
| --- | --- | --- | --- |
| 1 | Minkä maan pääkaupunki Khartum on? | Sudanin | S1; WD1 |
| 1 | Minkä paikallisen saaripaikan dokumentoitu elinkeino liittyi hedelmiin ja vihanneksiin? | Tutin saaren | S3 |
| 2 | Minkä mukaan Souq al Arabin myyjien osat järjestyvät? | Tuoteryhmän | S9 |
| 2 | Mikä tietovaranto täydentää puutarhan elävien kasvien kokoelmaa? | Herbaario | S5 |
| 3 | Miksi collegen historia ei todista yliopiston jokaisen nykyisen talon ikää? | Laitos ja sen rakennusvaiheet ovat eri asioita | S12; S11 |

Vihje ei nimeä oikeaa maata/saarta tai “herbaario”-/tuoteryhmäsanaa sellaisenaan. Väärät uskottavia ja samanmittaisia. Ei toisen pelikaupungin nimeä oikeaksi, tarkkojen vuotta/pituutta arvaamista tai nykyistä johtajaa. Temppelinsiirron minitehtävä H3:ssa ei sama kuin tämä visa. Kysymys ei lupaa paikallista käyntiä.

Kolme tiedot-aihetta ilman isoisää:

1. Khartum voi tarkoittaa yhtä kaupunkia tai kolmen kaupungin yhteistä seutua; rajaus muuttaa väestöluvun merkityksen (S1; konteksti).
2. Tutin saaren viljelyhistoria kertoo paikallisesta ruoantuotannosta keskellä kaupunkiseutua (S3; historialliseksi kirjoitettuna).
3. Museon muinaisilla rakennuksilla on paljon myöhempi nykyinen sijainti (S4), ilman Farasin maalausnoston uusintaa.

## 7. Kuvatarpeet B:lle

A ei valinnut/hyväksynyt kuvia. Sudanissa kuvatun vanhan/nykyisen teoksen FOP/PD, mahdollinen erikseen osoitettava lisäehto ja käytännön pääsy/kuvaus ovat eri kerroksia. Naapurimaan PD-maksusääntöä ei Sudanin faktaa. Kaupallisen FOPin puute ei palauta päättynyttä suojaa, mutta vanha laitoksen nimi tai muinainen kokoelmaesine ei vapauta nykyistä taloa/lasimaalausta. Tilauksen alle 70 vuotta kuolleet tekijät rajataan pois suojattuina teoksina. Kuvaajan CC-lupa ei kata automaattisesti kuvattua suojattua teosta. Ei NC/ND/Fair use.

| Kohta | Aihe/hakusanat | Raja |
| --- | --- | --- |
| Kansi 1 | Khartoum Nile wide city landscape | Paikallinen laaja luonnon-/kaupunkinäkymä, ei moderni nimetty hotelli/torni/palatsi pääteokseksi. |
| Kansi 2 | Tuti Island fields river city panorama | Aito saari, kuvan aikataso tosi; moderni silta ei päämotiivi. |
| Kansi 3 | Khartoum old downtown street panorama | Laaja tila eri tiedostossa, ei mainos/lähikasvot tai yksittäinen suojattu nykyteos. |
| K1 | Khartoum Omdurman Bahri wide river geography | Kolmen kaupungin seutu, ei toisen joen suu tai väärä saari. |
| K2 | Tuti Island citrus vegetable fields | Dokumentoitu saari/viljelymaisema. Kuvan päiväys ja nykytilanne erotetaan; ei näkemällä arvattua lajia. |
| K3 | Souq al Arabi Khartoum market open space | Oikea markkina, ei Omdurman/Saad Gishra nimen korvikkeena. Lähikasvot/logot pois. |
| K4 | Gordon Memorial College historical original building | Varmennettu vanha rakennus/arkistokuva, ei moderni luentosali tai kampusyleispisteen perusteella nimetty väärä talo. |
| H1 | Khartoum nineteenth century town historical view | Luvallinen vanha kaupunkikuva, ei vuoden 1873 näkymäksi nimetty 1900-luvun katu. Tulva-aihe ei haboob-kuva. |
| H2 | Sudan National Botanical Garden plants herbarium | Oikea puutarha tai avoimesti yleinen herbaariomenetelmän havainnollistus; ei väärän puutarhan paikkanimi. |
| H3 | Sudan museum garden ancient relocated temple walls | Vain muinainen tunnistettu hyväksyttävä rakenne, ei nykyisen museotalon suojattu arkkitehtuuri tai maalehden Faras-maalaus. Moderni siirtotyö/kuvaajan oikeudet erikseen. |
| H4 | Former All Saints Cathedral Khartoum historical exterior | Tunnistettu vanha rakennus/arkistokuva. Ei suojattu myöhempi lasimaalaus, uusi palatsi tai nykyisen johtajan muotokuva. |
| Matkailijalle | Khartoum current river vegetation broad vertical | Tuore maltillinen pysty w/h 0,60–0,85 vain jos löytyy. Ei vanha kuva nykyilmeenä; ei uuden vaarallisen kenttäkuvauksen tilaus. |
| Opas 1 | Current Khartoum general transport context | Ei suljettua kenttää matkailulupauksena, ei moderni terminaali/silta suojattuna pääteoksena. Jos sopivaa tuoretta ei ole, kuvaton perusteltu. |
| Opas 2 | Current Khartoum urban space | Päiväys vastaa nykyilmettä; ei “tästä kävelet nyt turvallisesti” -kuvaselitystä. |
| Opas 3 | Current local river nature or verified ancient structure | Vain saatavilla oleva paikkatodennettu kuva; ei museon kokoelman nykyistä säilymistä koskevaa oletusta. |
| Opas 4 | Gurasa Sudan plate | Kuvasivun tunnistama ruoka; geneerinen leipä ei sama annos, ei ravintolan mainos/pakkaus. |
| Opas 5 | Sää | Kuva voi puuttua; kaikki luvut saa.json. |
| Kohde 1 | Tuti Island separate water land view | Saaripaikka, ei siltaa pääteoksena tai yksittäisen talon rakennusikä. |
| Kohde 2 | Sudan National Botanical Garden separate plants | Eri tiedosto, oikea paikka, ei arvattua lajia tai suojattua puutarhataidetta. |
| Kohde 3 | Souq al Arabi separate view | Oikea markkina-alue, ei lähikasvoja/mainoksia tai viereisen moskeijan pääteos. |
| Kohde 4 | Museum ancient temple structure separate view | Ehdollinen, teoskohtainen vanha rakenne ja nykyinen siirtotyö/lisenssi tarkistettava; kartalla yksi museoalue. |
| Kohde 5 | All Saints old exterior separate view | Ehdollinen rakennusvaihe/oikeusketju; modernit osat ja palatsi erillään. |
| Kohde 6 | White Nile mouth area landscape | Tarkka paikannus ratkaistava ennen kuvaselitystä; Al-Mogran-listing, joen source ja suupiste eivät yksi sama kamerapaikka. |
| Valokuva | Khartoum pre1900 historic photograph | Varmennettu PD-valokuva enintään 1900, leveys vähintään 1200 px. Kaiverrus ei valokuva. Muuten eri nykyinen paikkakuva, ei ennen–nyt-paria. |

Sama tiedosto kerran, paitsi valokuvan/ennen–nyt-nimenomainen poikkeus. B/C/D katsovat kuvat ja täsmällinen Artist/lisenssi sallitulta kuvasivulta. Ei vesileimaa/arkistoleimaa/mainoksia/lähikasvoja. Nykyopas tarvitsee tuoreen kuvan, vanhat kuvat nostojen/historian yhteyteen. Jos 5 jakson enintään 2 kuvattoman vaatimus ei tuoreilla sallituilla paikallisilla kuvilla täyty, kirjataan B/C-poikkeama; sitä ei ratkaista vanhaa kuvaa nykyiseksi nimeten. Historialliset kuvat ja suojatun teoksen raja eivät poista nykyistä matkustus-/kuvausrajoitusta.

## 8. Ristiriidat ja avoimet asiat

1. **Väestö:** kontekstin 2008 kaupunki, kolmen kaupungin kaupunkialue ja osavaltio eri laajuuksia. S1:n infolaatikko/leipäteksti/vanha taulukko antavat eri vuosien ja arvioiden lukuja; ne eivät uudempi virallinen kaupunkilaskenta. Pelaajalle vanha laskenta nimettynä/pyöristettynä tai luku pois.
2. **Perustaja/vuosi:** S1 johdanto Muhammad Ali, History Isma’il Kamil, S2 Ibrahim Pasha; tukikohdan, hallinnon siirron ja pääkaupunkivaiheen vuodet eri. Ei yhtä tarkkaa perustajapäivää ilman riippumatonta varmennusta. 1800-luvun alku ja Egyptin vallan vaihe riittävät.
3. **Nimen etymologia:** S1 antaa useita folk-/tutkijaehdotuksia, kuten kärsä, saflori ja muut kieliketjut. Nimen merkitys ei varma yhden tarinan perusteella, jätetty pois.
4. **1873 kaupunki:** ei nykyisen Union Jack -katuverkon, modernin sillan, collegen, puutarhan tai museon tilanne. Isoisän tekoja/tuttuja/reittiä ei lähteistä.
5. **Tuti:** lähde kertoo vanhan kylän/viljelyn sekä huomattavasti muuttuneen nykytilanteen. Ei nykyinen “pieni rauhallinen kylä”, väestö, vihannesten toimitusprosentti tai ferry timetable. Varhaisen asutuksen tarkka vuosi ja väestö eivät julkaisulukuja.
6. **Puutarha:** S5 WP 15.6017, 32.5091, WD3 15.601911, 32.509125. WD:n oma puutarhapiste käytössä, ero kirjattu; ei lisättyä rakennuspistettä. Lähdepuutemerkintä ja vanhat organisaation tehtävät eivät nykyinen tapahtumaohjelma.
7. **Tori:** WP/WD markkina-alue 15.601, 32.525, V1 listaa hieman eri kohtaa. WP/WD:n oma aluepiste; ei yksittäisen liikkeen ovi, Gold Marketin tarkka paikka tai naapurimoskeija. Nykyistä myyntiä ei luvata.
8. **Museo:** vanha laaja kokoelmakuvaus ja nykyiset säilymis-/pääsytiedot eroavat. Kirjoitetaan historiallisesti dokumentoituna aineistona; ei “nykyään kaikki nämä nähtävillä”. Ei maalehden Faras-maalausnoston uusintaa.
9. **Temppelin koordinaatti:** alkuperäisen Nubian temppelin P625 usein vanha paikka, ei Khartumin nykyinen. Museoalueen oma piste käytetään kerran ehdolliselle paikkajutulle, ei neljäksi yksittäiseksi siirretyksi rakennukseksi. Nykyisen puutarhan sommitelman/siirtotyön suojatilaa ei muinaisen reliefin iästä.
10. **Museoalueen kohderajaus:** vanha rakennusaineisto tai instituution historiallinen tehtävä voidaan erottaa nykyisen museotalon suojatusta arkkitehtuurista. B-toimiva vanha rakenne/lisenssi ja paikannettu pääaihe tarvitaan; ehdollinen A-paikka ei kiertolupa modernille teokselle.
11. **All Saints -museopaikka:** S7:n oma koordinaatti, WD9:n tunniste palatsilabelilla. S7 ja S11 antavat tyylille eri nimitykset. Katedraali, poistettu kellotorni, museomuunnos ja uusi palatsi eri asioita; ei nykypolitiikkaa/palatsia kuvan oikeutusketjuun.
12. **Lasimaalaukset:** S7 nimeää Esplinin ja Fulleyloven eri työt. Jokaisen työn tekijä/suoja-aika erikseen, ei vain “1912 kaikki PD”. Suojattu myöhempi osa jää pois; A ei varmennettu copyright-lausunto.
13. **St. Matthew:** varhainen valmistumisvuosi 1908 sekä myöhemmän Laffranchi-tekijän 1932/1933-ketju ristiriidassa. Artikkelin 1961-kuolematieto ei tilauksen 70 vuoden päättymisen peruste, vaikka paikallislaissa voisi olla eri aikaraja. Pois kartalta/kuvapääteoksista tässä vaiheessa; vanha 1800-luvun kirkko ei nykyinen talo.
14. **Khalifan talo:** S8/A1/WD8 15.383, 32.29 ei vastaa omaa Omdurman-kuvausta tai V1:n paikkaa. WD toistaa samaa väärää ketjua, ei riippumatonta korjausta. Rakennusvuosissa/kerrosvaiheissa lisäksi ristiriita. Ei arvattu lat/lon, Mahdi-haudan piste tai Wv naamioituna WP-lähteeksi.
15. **Suualue:** WD6 river mouth -qualifier varmistaa tarkoituksen, mutta piste 15.62361, 32.50194 eroaa V1:n Al-Mogran-kohdasta 15.614938, 32.492122 ja WD7:n Nile-source 15.64014, 32.50550. Saarten ympärillä olevien haarojen nimeämistä/geometriaa ei ratkaistu. Nimeksi suualue, ei täsmällinen Al-Mogran-puiston portti. Lopullinen kuudes kohde jää porttiin.
16. **Sillat:** Cooper-nimi viittasi moderniin Kober-siltaan. Vanhan Blue Nile -sillan ja Omdurman-sillan WP/WD-pisteet omia rakenteita, eivät joensuita. Rakennusvuosi ei nykyisten korjattujen osien tekijän kuolinvuosi; funktionaalisuus ei myöskään automaattinen art-teosleima.
17. **College:** S12 avaus 1902, S1/S2 1903; avaus/ensimmäiset opiskelijat eri vaiheita. Vuosisadan alku. WD11 ilman omaa P625:tä; nykyisen yliopiston piste ei varhaisen rakennuksen tarkka paikka/oikeusketju.
18. **Matkustus:** UM löytyi ja nykyrajoitus kirjattu, ei FCDO-poikkeamaa. Vanha Wv:n kutsuva kieli/ajat/hinnat/venekyydin neuvo ei nykyopas. KRT suljettu T1:n mukaan; ei uutta poistumisreittiä päätellen.
19. **Nykyopas ja kuvat:** ei vanhaa kaupunkikuvaa tuoreeksi tai nyt rauhalliseksi retkipaikaksi. T1:n kuvausrajat ja vaarallisuus eivät A:n lisenssivalinta, mutta käytännön ohjeen on vastattava niitä. B ratkaisee tuoreiden kuvien saatavuuden ja mahdollisen kuvattoman jakson määrän poikkeaman.
20. **Sää:** perusrivit normaalikausi 1991–2020, taulukon muiden muuttujien viitteissä myös 1961–1990. Ei perussarjan kauden muuttamista vanhemmaksi tai käsin tehtyä ylä/ala-keskiarvoa. S1:n teksti/V1/T1:n ilmastoluvut eivät julkaisutekstin numerolähteitä.

## 9. Poisjätöt ja toimituksen portit

- Maalehden rauhansopimus, Amanirenas-/kirjoitus-/aavikkokansatarinat, kisra-paisto, gum arabic, karakade, pitkä papuhaudutus, musiikkilajit/lyyra/rukousrummut, Faras-maalaukset, holvitekniikka, nykyisen kuvataidekoulun ja haudan kivet eivät uusia nostoja.
- Maalehden haboob, koralliriutta, kuiva keltainen Niili ja kahden Niilin sekoittumistarinat sekä lähinoston Ugandan lähdeketju/pituus eivät uusi historia/luonto-essee. Paikallinen maantieto ja suualueen karttatunniste voivat olla mukana ilman tarinan uusintaa.
- Nykysota, nykypolitiikka, vaalit, osapuolet, rikostapaukset/aseet, nykyisten johtajien muotokuvat ja nykyiset väkivaltatapahtumat eivät lehtisisältöä. Matkustusrajoitus ja nykyinen pääsyn puute kerrotaan asiallisesti oppaassa.
- St. Matthew epäselvällä alle 70 vuoden tekijäketjulla, uusi Republican Palace, modernit hotellit/tornit, Al-Nilin Mosque, National Assembly, modernit yliopistoteokset, modernit sillat ja nykytaide eivät pääkohteiksi/kuvapääteoksiksi. Vanhan paikan ikä ei niiden lupa.
- Khalifan talon etäinen väärä piste, kaupungin/aikajanan pallo, joen lähdepiste, väärä sillan nimi, alkuperäisen Nubian temppelin vanha koordinaatti ja Wv-listing WP/WD:n nimellä pois. Koordinaatteja ei arvata/keskiarvoteta.
- A:n kuuden paikan aineisto on ehdollinen: museoalue/All Saints tarvitsee tarkoin hyväksyttävän vanhan pääaiheen; suupisteen geometria ratkaistava. Jos nämä jäävät pois, 6–8 kelvollisen paikan määrä ei täyty. Ei automaattista pienen kaupungin poikkeusta tai A:n loppuhyväksyntää.
- Tarkat historialliset luvut/vuodet, vanhat kauppa-/opiskelija-/asukasmäärät, temppelien määrämitat, puutarha-ala, globaalit superlatiivit ilman riippumatonta tukea pois. Sääluvut vain valmis työkaluajo, lähde-/koordinaattimetadata tarkkoina.
- RAPORTTI.md:hen nykyinen UM-rajoitus/päiväys, KRT-sulku, väestön 2008 laajuus, sääkausi/poiminta, nykyisten kohteiden ajantasaisuusraja, rakennus-/koordinaattiristiriidat ja kuuden kohteen ehdollisuus. B/C/D/E/F, kuvaselitteet, sisältö-JSONin tarkistus ja pelitoimitus eivät A:ssa tehtyjä.
