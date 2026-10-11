# Kampala — faktapohja 0–9, vaihe A

Erä e07, id `kampala`, maa UGA. Lähteet luettu **11.10.2026**. **A:n lähdepaketti valmis:** 4 + 4 aihetta, nykyopas ja seitsemän nimettyä keskustan kukkulakohdetta omine WP/WD-pisteineen ja kohdefaktoineen. Kartan kohteet ovat **fyysisiä kukkuloita**, eivät niiden päällä olevia palatseja, kirkkoja, moskeijoita, museota tai rakennusten sisäänkäyntejä. N-lista ei hyväksy yksittäisiä suojattuja rakennus- tai taideteoksia.

Kuvien valinta, kuvaan liittyvät oikeusketjut ja nykyiset rakennusosat jäävät B/C/D:n henkilökohtaiseen tarkistukseen. Tässä ei ole `sisalto.json`:ia, kuvavalintoja, Git-operaatioita tai julkaisua. Sää **null**: aiempi poiminta hylättiin yhtenäisen Makerere-aseman normaalikauden/lähteen puuttuessa. Ei aste-/sadelukuja tästä sarjasta.

## 0. Luetut lähteet, rajat ja 1873-kehys

Raakalähteet, tekstipoiminnat, metatiedot ja linkit ovat NAS-kansiossa `valiaikainen/kampala-A/`. Lähdeosoitteet, revisiot ja SHA256-tiivisteet kootaan `lahteet.json`:iin. Kuljetuksena yhteinen `sallittu_haku.py`: robots.txt ennen uutta verkkotunnusta/polkua ja ohjausta, sekä yhteinen 1 pyyntö/s -lukko/välimuisti. Omistajan hyväksymän lähdesivupoikkeuksen mukaisesti sallittuja alkuperäisiä `/wiki/`-sivuja estettyjen rajapintojen sijasta; ei `/w/`-/`/api/`-kiertoa tai User-Agent-vaihtoa.

### Wikipedia ja opas

| Tunnus | Luettu alkuperäislähde | Revisio/kieli | Käytetyt osiot |
|---|---|---|---|
| S1 | [Kampala](https://en.wikipedia.org/wiki/Kampala) | en 1379266629 | Etymology, History, Geography/Topography/Hills, Transport, Culture; ei politiikkaa/iskuja |
| S2 | [Kampala Hill](https://en.wikipedia.org/wiki/Kampala_Hill) | en 1376273945 | Location, Overview, History, Points of interest, oma kukkulapiste |
| S3 | [Mengo, Uganda](https://en.wikipedia.org/wiki/Mengo,_Uganda) | en 1377752267 | Location, Overview, Landmarks; kukkulan ja palatsin ero, WD-ristiriita |
| S4 | [Nakasero](https://en.wikipedia.org/wiki/Nakasero) | en 1377781309 | Location, Overview, Landmarks; kukkulan ja torin ero |
| S5 | [Namirembe Hill](https://en.wikipedia.org/wiki/Namirembe_Hill) | en 1377782051 | nimi, Location, Cathedral, Overview; hill-piste ja kirkkopiste erotettu |
| S6 | [Lubaga](https://en.wikipedia.org/wiki/Lubaga) | en 1376760669 | nimi, Location, History, Overview, Points of interest |
| S7 | [Nsambya](https://en.wikipedia.org/wiki/Nsambya) | en 1377793678 | Location, Overview, Points of interest, vanha lähetys-/opetus-/hoitokeskus |
| S8 | [Kibuli](https://en.wikipedia.org/wiki/Kibuli) | en 1378278345 | Location, Overview, Points of interest; kukkulan lahjoitettu maa ja oppilaitokset |
| S9 | [Makerere](https://en.wikipedia.org/wiki/Makerere) | en 1376445613 | Location, Overview, Landmarks; kukkula/naapurusto/kampus erotettu |
| S10 | [Nakasero Market](https://en.wikipedia.org/wiki/Nakasero_Market) | en 1377781312 | History, Structure, Products; ei nykyhallinnon vanhentunutta väitettä |
| S11 | [Uganda Museum](https://en.wikipedia.org/wiki/Uganda_Museum) | en 1363947940 | History, Galleries, Collections, Repatriated artefacts, Education service; nykyisen rakennuksen Ernst May -tekijä |
| S12 | [Makerere University](https://en.wikipedia.org/wiki/Makerere_University) | en 1377851216 | History/Founding of the technical school, University; ei lakkoja/poliitikkoja |
| S13 | [Namirembe Cathedral](https://en.wikipedia.org/wiki/Namirembe_Cathedral) | en 1367352772 | Location, History; urut/korjaajat ja nykytapahtumat eivät ole uusi lehtitarina |
| S14 | [Lubaga Cathedral](https://en.wikipedia.org/wiki/Lubaga_Cathedral) | en 1367352700 | Rubaga Cathedral -osoite ohjautui tähän; Location, Overview; palatsinsiirtoriita |
| S15 | [Kibuli Mosque](https://en.wikipedia.org/wiki/Kibuli_Mosque) | en 1366906655 | luettu kriittisesti; sivu ilmoittaa mahdollisesta kielimallitekstistä ja useista lähteettömistä väitteistä, ei niiden varaan N- tai H-faktoja |
| S16 | [Entebbe International Airport](https://en.wikipedia.org/wiki/Entebbe_International_Airport) | en 1376814929 | johdanto/nimi/IATA EBB/sijainti, ei kaappaus- tai nykykiistakertomusta |
| S17 | [Nsambya Hospital](https://en.wikipedia.org/wiki/St._Francis_Hospital_Nsambya) | en 1357992938 | History, nykyisen toiminnallisen sairaalan ja hoitokoulutuksen tausta; ei henkilökohtaista terveysneuvoa |
| S18 | [Mengo Hospital](https://en.wikipedia.org/wiki/Mengo_Hospital) | en 1330376476 | Location/History, sairaala Namiremben alueella; ei Mengo Hill -pistettä sairaalan sisäänkäynniksi |
| S19 | [Ernst May](https://en.wikipedia.org/wiki/Ernst_May) | en 1375346011 | tekijän kuolema 1970; museon rakennusta ei hyväksytä suojavapaaksi |
| S20 | [Uganda Railway](https://en.wikipedia.org/wiki/Uganda_Railway) | en 1373962798 | historiallisen yhteyden yleistausta; ei nykyjunavuorojen todiste |
| O1 | [Kampala, Wikivoyage](https://en.wikivoyage.org/wiki/Kampala) | en 5384297 | Understand, Get in/Get around, See, Stay safe; ei hinnat, aukioloajat tai palvelulupaukset |
| O2 | [UM: Uganda, matkustustiedote](https://um.fi/matkustustiedote/-/c/UG) | fi **9.10.2026** | turvallisuustaso, yleinen tilanne, liikenne, luonnonolot, terveys, maahantulo |

### Alkuperäiset täydentävät lähteet

| Tunnus | Lähde | Luettu/rooli |
|---|---|---|
| P1 | [Makerere University, virallinen etusivu](https://www.mak.ac.ug/) | Humble beginnings: tekninen koulu, carpentry/building/mechanics; nykyinen yliopisto tutkimus-/koulutusinstituutiona |
| P2 | [Makerere University: History](https://www.mak.ac.ug/about/history) | oikea historiapolku löytyi etusivun linkistä, alkuperäinen kehitys; edeltävä `/about/history-and-background` oli 404 |
| P3 | [Makerere 100, yliopiston oma historiakokonaisuus](https://100.mak.ac.ug/) | tekninen alku ja yliopiston kehitys; ei kansainvälisiä paremmuus-/opiskelijamäärä-superlatiiveja |
| P4 | [KCCA: Nakasero market](https://www.kcca.go.ug/news/645/nakasero-market-embraces-the-market-change-policy) | 25.11.2022; vahvistaa torin toiminnan ja kertoo hallintomuutoksesta; politiikka ei nostoksi, S10:n hallintoväite vanhentunut |
| P5 | [KCCA: About the Authority](https://www.kcca.go.ug/about-the-authority) | kaupungin hallinto/alue; ei vanhan kukkulan tarkaksi rakennuspaikaksi |
| P6 | [KCCA: Strategic plan launch remarks](https://www.kcca.go.ug/news/425/kampala-capital-city-strategic-plan-launch-executive-remarks) | kukkulakaupungin kuvaus; puheen vanhat päiväväestö- ja kansamäärät eivät uuteen leipätekstiin |
| P7 | [Cambridgen MAA: Repositioning the Uganda Museum](https://maa.cam.ac.uk/news/repositioning-the-uganda-museum) | päivitys Kampala 13.6.2024; esineet pitkäaikaislainaan Ugandan museoon, valintatutkimus, eri esineprovenienssit |
| P8 | [Namiremben katedraalin oma sivusto](https://namirembecathedral.org/) ja [About us](https://namirembecathedral.org/about-us/) | nykyisen instituution olemassaolo ja pukeutumisohje; ei maksua/aukioloaikataulua, mahdollinen historia varmistettu |
| P9 | [Ugandan ilmailuviranomainen: Entebbe International Airport](https://caa.go.ug/entebbe-international-airport/) | nykyisen kentän nimi ja sijainti; ei mainossisältöä tai lentoyhtiölistaa |

KCCA:n `/about-kampala` palautti HTTP 200 -kuoren, jonka sisältö sanoo **Error 404**, joten se ei ole historiallisen kaupungin lähde. `ugandamuseums.or.ug/` palautti 404. KCCA:n Kabaka's Lake -sivu aikakatkaistiin. En-WP:n `Kabaka's Lake` ja `Kabaka Lake` palauttivat 404, vaikka hakukoneessa on vanhaa sisältöä; niitä ei esitetä luettuina nykyisinä en-sivuina. Lugandankielinen **Akayanja ka Kabaka.**, revisio 71626, luettiin rajatusti paikan olemassaolon tarkistukseen, mutta siitä ei tehdä epävarmaa käännöstä teksteihin.

### Wikidata ja koordinaattiroolit

Sallitun EntityData-polun tallenteet `valiaikainen/kampala-A/Q….json`.

| Kohde | Entiteetti/revisio | Oma paikkapiste / rooli |
|---|---|---|
| Old Kampala / Kampala Hill | Q6359102 / 1449816013 | 0.31527778, 32.56861111, vastaa oman S2:n pistettä |
| Mengo | Q6817018 / 2550893259 | WD **0.346667, 32.6056**, eri kaupunginosa kuin S3:n kukkula **0.301667, 32.566111**; jätetty N-listasta pois |
| Nakasero | Q16895628 / 2415733278 | WD 0.3244, 32.5788, väljä tarkkuus; käytetään S4:n nimettyä **Nakasero Hill** -pistettä 0.323334, 32.578890, ero kirjattu |
| Namirembe Hill | Q15260890 / 2489657276 | 0.315, 32.55944444, vastaa S5:n omaa hill-pistettä |
| Lubaga | Q6695057 / 2520550631 | 0.30305556, 32.55305556, vastaa S6:n omaa kukkulapistettä |
| Nsambya | Q7067544 / 2120011818 | 0.29916667, 32.58805556, vastaa S7:n hill-pistettä |
| Kibuli | Q6404080 / 1449874040 | 0.31000, 32.59500, vastaa S8:n hill-pistettä |
| Makerere | Q6739281 / 2306792697 | 0.33500, 32.57000, vastaa S9:n hill-pistettä, **ei rakennus/portti** |
| Kabaka's Lake | Q106991171 / 2550357744 | kaksi lähellä toisiaan olevaa järvipistettä 0.29754534, 32.56160778 ja 0.29750, 32.56166667; ei oteta N-kohteeksi puutteellisen nykyisen en-lähdepohjan vuoksi |

Viisi desimaalia on toimitusmuoto, ei väite metrin mittatarkkuudesta. Nakasero Hillin ja Nakasero Marketin sekä Namirembe Hillin ja Namirembe Cathedralin omat pisteet ovat eri tietoja.

### 1873-kehys

- Vuoden 1873 **nykyisen Kampalan seutu oli Bugandan kuningaskunnan ydinaluetta**, mutta nykyistä brittiläisestä linnakekaupungista kasvanutta Kampalaa ei vielä ollut (S1/History ja S2/History).
- Bugandan *kibuga* eli hallintokeskus saattoi siirtyä kuninkaan mukana kukkulalta toiselle. S1:n kuvaukset 1860- ja 1870-luvuilta eivät oikeuta sanomaan kaikkia nykyisiä palatseja vuoden 1873 rakennuksiksi.
- Lubagalla oli kuninkaallinen palatsikeskus 1800-luvulla (S1/S6). Tarkkaa palatsin sijaintia/ulkonäköä nimenomaan 1873 ei saada näistä lähteistä; historian kukkula voi silti olla nykykartalla.
- Old Kampalan linnake, myöhemmät lähetysasemat, nykyiset katedraalirakennukset, sairaalat ja Makereren korkeakoulu syntyivät myöhemmin (S1/S2/S7/S12/S13/S17). Niitä ei panna isoisän vuoden 1873 maisemaan.
- N-kohteiden vuoden 1873 selitys koskee **fyysistä kukkulaa ja lähteistä tiedettyä aluehistoriaa**. Ei väitetä tarkkoja sen aikaisia taloja, kasvillisuutta, villieläimiä, kaivettuja teitä tai sisäänkäyntejä ilman kohdekohtaista todistetta.
- Ei isoisän matkareittiä, puhetta, muistiinpanoa, kuninkaalle tapaamista tai muuta kaanonia.

### Olemassa olevien aiheiden toiston tarkistus

Konteksti ja `maa-kategoriat.js` Ugandan historia sekä `maastokohteet-uga.js` Kasubi luettiin. ”Kymmenen kilometriä kaivantoa” on **Bigo bya Mugenyi**, ei Kabakan järvi; otsikosta ei päätelty väärää toistoa. Maalehden kuningaskunnan nimen/perimyksen, Kabalegan, marttyyrien, lintujen, ruokien, kahvin, musiikin ja klaanien/tuohikankaan tarinat eivät uusiin nostoihin. Kasubin valmis haudat/palmunlehtirenkaat/tuohikangas/palo/restaurointi -tarina pois.

Viktoria Nyanzan lehti käsittelee Spekeä, Riponin putouksia, Stanleyta, järven kolmea maata/saaria/kalastusta, kalojen evoluutiota/vieraslajeja/kalasääskeä/papyrusta. Ei näitä uudelleen. K4 koskee museon tutkimus-/lainatyötä, ei kansallisen musiikkisivun samoja soitintarinoita.

## 1. Perusfaktat

- Kaupungin nimi/wiki **Kampala**. Ugandan pääkaupunki lähellä Victoria-järveä, kukkuloilla ja niiden välisissä laaksoissa (S1).
- Bugandan paikallinen hallintokeskus ja myöhempi siirtomaakaupunki ovat eri historiallisia kerroksia (S1/S2). Nimeä ei johdeta varmasti ”1890-luvulla rakennetusta linnakkeesta”: lähteiden nimiselitys liittyy vanhan kukkulan impalaan, kohta 8.
- Kaupunki on laajentunut vanhaa kukkulajoukkoa suuremmaksi. ”Seitsemän kukkulan kaupunki” on historiallinen kuvaus, **ei nykyisen kaupungin kaikkien kukkuloiden lukumäärä** (S1/S7/S9-ero).
- Kontekstin väestö: **1 797 722**, UBOS:n 2024 laskenta, **Kampala City -kaupunkialue**, City Populationin ja WD:n välityksellä. Ei metropolialue, päiväkävijämäärä tai kaiken Kampalan seudun väestö. Pelaajalle tarvittaessa **noin 1,8 miljoonaa Kampalan kaupunkialueen asukasta vuonna 2024**. Ei väitettä itse haetusta alkuperäisestä UBOS-taulukosta tai uudesta kahden riippumattoman lähteen tarkistuksesta.
- Päivä-/yöväestön vanhat arviot ja metropolin kasvuluvut jätetään pois; niiden laajuus ja vertailukaudet eivät ole sama asia.
- Nykyinen saapumiskenttä on **Entebbe International Airport, EBB**, Entebbessä, ei hill-pisteessä Kampalan keskustassa (S16/P9/O1).

## 2. Kansi — johdanto ja neljä nostoaihetta

Johdantoehdotus: Kampalan historiaa voi seurata kukkulan nimestä torille, oppilaitoksen työpajaan ja museon kokoelmiin. Kaupungin eri mäet yhdistävät maaston asukkaiden, opetuksen ja kaupan arkeen.

### K1 — Kukkulan nimi levisi kaupungiksi

Wiki **Kampala Hill**, History; S1/Etymology.

1. Kampala-nimi tarkoitti ensin nykyistä Old Kampala -kukkulaa.
2. Lähteiden nimiselitys yhdistää sen impala-antilooppiin ja Bugandan kuninkaan metsästysalueeseen.
3. Lugandankielinen ilmaus *Akasozi k'empala* on lähteissä ”impalakukkulan” selitys; nimenselitystä ei kuvata aukottomaksi kielihistoriaksi.
4. Kukkulalle rakennettiin myöhemmin Fort Lugard.
5. Kaupungin levittäytyessä muille kukkuloille alkuperäistä aluetta alettiin kutsua Old Kampalaksi.
6. Nykyinen alue on asuin- ja kaupankäyntikaupunkia, ei säilynyt villieläinpuisto.

Täsmällinen linnakkeen rakentamisvuosi, impalan nimen zuluperä ja metsästyseläinten määrät pois. Impalalajikuva saa olla yleinen eläinhavainne, mutta sitä ei sanota Old Kampalassa nyt eläväksi eläimeksi.

### K2 — Torilla on kaksi eri puolta

Wiki **Nakasero Market**, Structure/Products/History.

1. Tori on Nakasero-kukkulan juurella.
2. Sen avoin, osittain katettu alue painottuu tuoreisiin elintarvikkeisiin.
3. Rakennuksen suljetummassa osassa myydään muun muassa vaatteita ja tarvikkeita.
4. Tuotejoukkoon kuuluvat hedelmät, vihannekset, liha, mausteet ja tekstiilit; ei määrällistä valikoima-/saatavuuslupausta.
5. Torin sijainti muuttui sen historian aikana palatsialueelta kaupungin muihin paikkoihin; täsmävuodet jätetään yhden luetun ketjun vuoksi pois.
6. Kaupankäyntipaikka tuo yhteen myyjiä, kauppiaita ja palveluntarjoajia.

S10:n hallintoyhtiöväite ei ole ajantasainen palvelutieto: P4 kuvaa myöhempää hallintomuutosta. Politiikka, työpaikkaluvut, hinnat ja ”vanhin/suurin” pois. Ei maalehden matoken, rolexin, luwombon tai kahvin reseptitarinaa.

### K3 — Puusepästä korkeakouluun

Wiki **Makerere University**, Founding of the technical school; P1/P2/P3.

1. Makereren alku oli tekninen koulu 1900-luvun alkupuolella.
2. Varhaisiin aineisiin kuuluivat puusepäntyö, rakentaminen ja mekaniikka (S12/P1).
3. Opetus laajeni myöhemmin muun muassa koulutukseen, maatalouteen ja lääketieteeseen (S12).
4. Ammatillisen koulutuksen osa erotettiin myöhemmässä kehityksessä omaksi tekniseksi kouluksi.
5. Korkeakoulun diplomit ja myöhempi yliopistokoulutus ovat eri vaiheita.
6. Makerere toimii nykyisin yliopistona ja sen pääkampus on Makerere-kukkulalla (S9/S12/P1).

1921/1922 käynnistämisen ero kirjattu, ei täsmävuosivisaa. Ei poliitikkojen alumnilistoja, lakkoja, nykyistä opiskelijamäärää tai paremmuussuperlatiivia. Kuvassa voi olla puusepäntyön työväline havainnollisesti, mutta ei väitetä sen olevan alkuperäinen Makereren esine.

### K4 — Museoesine palaa tutkimukseen

Wiki **Uganda Museum**, Collections/Repatriated artefacts; P7.

1. Ugandan museo toimii Kampalassa ja säilyttää kulttuurisia sekä luonnonhistoriallisia kokoelmia (S11).
2. Cambridgen MAA:n kokoelmista tuotiin esineitä Ugandan museoon 2020-luvulla (S11/P7).
3. Kyseessä oli **pitkäaikaislaina**, ei kaikkien esineiden lopullisen omistuksen palautus (P7).
4. Ugandan museon ammattilaiset valitsivat aineistoa tutkimuskäynnillä (P7).
5. Esineiden alkuperästä ja merkityksestä tehdään tutkimusta sekä yhteisöjen kanssa keskustelua (P7).
6. Esineet ovat päätyneet aiempiin kokoelmiin eri tavoin; niitä ei kaikkia sanota lahjoiksi tai kaikkia varastetuiksi (P7).
7. Museon opetustyö on myös esineiden ja näytteiden käyttöä oppimisen tukena (S11/Education service), ei vain rakennuksen katsomista.

Ei esinemäärää, tutkimusapurahaa, modernia teosta tai väärää löytöpaikkaa. **Nykyinen museorakennus Ernst Mayn työ (kuollut 1970) jää rakennuskuvana/karttakohteena pois** tämän sopimuksen vuoksi. Nimetty institutionaalinen historia ei anna lupaa kuvata sen suojattua rakennusta tai modernia esinettä pääkohteena.

## 3. Teemasivu — historia, Kukkula vaihtaa tehtävää

Vakioaihe `historia`. Johdantoehdotus: Kaupunkikukkula on paikka, johon eri sukupolvet tuovat eri tehtäviä. Kampalan mäillä historia jatkuu nimen, opetuksen, hoidon ja uskonnollisen yhteisön käytössä.

### H1 — Mengo ja jauhinkiven nimi

Wiki **Mengo, Uganda**, Overview/Location/Landmarks.

1. Mengo on fyysinen kukkula ja sen mukaan nimetty kaupunginosa.
2. Lähde yhdistää lugandan *mengo*-sanan jauhinkiviin.
3. Perimätieto kertoo kivien käytöstä ruoan jauhamiseen; tätä ei kirjoiteta arkeologisesti todistetuksi muuttoliikehistoriaksi.
4. Kukkula tunnetaan Bugandan palatsialueen sijaintina; nykyinen rakennus erotetaan instituution historiasta.
5. Viereisellä Namirembellä on eri instituutioita, muun muassa Bulange ja Mengo Hospital (ei Mengo Hillin pisteessä).
6. Kabakan järvi on eri paikkakohde palatsin lähellä; S3:n järven pieni pinta-alaväite ei siirry tekstiin.

Ei maalehden kuningaskunnan nimeämis-/perimyssääntöjä, kasubilaisten hautatarinoita tai nykyhallinnon tehtäviä. Mengo jää N-listasta koordinaattiriidan vuoksi pois; nostoa voi kirjoittaa ilman uuden karttamerkin keksimistä. Nykyisen palatsin valokuvaa ei varata automaattisesti.

### H2 — Rakennus on kukkulaa nuorempi

Wiki **Namirembe Cathedral**, History; Namirembe Hill S5 ja P8.

1. Namiremben kukkula on paikannimenä vanhempi kuin nykyinen katedraalirakennus.
2. Ensimmäinen kirkon paikka oli alempana kostealla alueella, ja rakennus jäi kasvavalle seurakunnalle pieneksi.
3. Myöhemmän rakennuksen katto vaurioitui myrskyssä.
4. Perinteisistä aineista rakennettu kirkko hylättiin termiittituhojen pelon vuoksi; toteutunutta tuhoa ei väitetä.
5. Toisen, olkikattoisen rakennuksen katto paloi salamaniskun seurauksena.
6. Nykyisen 1900-luvun alkuun sijoittuvan rakennuksen materiaaleihin kuuluvat tiilet ja tiilikatto (S13).
7. Nimi Namirembe liittyy lugandan *mirembe*, rauha -sanaan (S5); rauhanjuhlien perimätietoa ei todisteta historialliseksi tapahtumaksi.

Ei kirkkojen/tuhansien yleisön/tarkkojen päivien määriä yhdellä ketjulla. Tämä ei ole jo maalehdessä oleva Namugongon marttyyrien tarina. Nykyisen katedraalin suunnittelija/korjaukset eivät ratkenneet tässä; rakennuskuva B:ssä ehdollinen, kartalla **kukkula**.

### H3 — Lubaga ja Rubaga ovat sama kukkula

Wiki **Lubaga**, History/Overview; **Lubaga Cathedral** S14.

1. Luetut lähteet käyttävät samasta paikasta Lubaga- ja Rubaga-asua.
2. Kukkula sijaitsee vanhan keskustan länsipuolella, Mengo lähellä idässä.
3. Siellä oli Bugandan kuninkaan palatsialue ennen myöhempää katolista rakennusvaihetta (S6).
4. Katolinen lähetysyhteisö sai myöhemmin maata kukkulalta.
5. Katedraali rakennettiin 1900-luvun alkupuolella (S6/S14).
6. Kukkulalla on myös hoito- ja koulutustoimintaa, kuten sairaala ja hoitajakoulu (S6).

Palatsin palon ja muuton yksityiskohdissa S6/S14 eroavat, joten sitä ei ratkaista kertomalla yksi täsmävuosi ja siirtokohde. Ei kuolleiden kuninkaiden hautatarinaa, pyhimyksen patsaskuvaa tai kolmea lugandasta ”puuttuvaa kirjainta” kielitieteellisenä varmuutena.

### H4 — Nsambya, opetuksen ja hoidon mäki

Wiki **Nsambya**, Overview/Points of interest; **Nsambya Hospital**, History.

1. Nsambya on kukkula ja sen rinteiden kaupunginosa keskustan eteläisemmässä osassa.
2. Mill Hill -lähetysyhteisö aloitti toimintaansa kukkulalla 1800-luvun lopulla (S7).
3. Seudulle tuli kirkon ohella kouluja ja hoitotoimintaa (S7).
4. St. Francis -instituutio alkoi lääke-/hoitopaikkana 1900-luvun alkupuolella ja kasvoi sairaalaksi (S17).
5. Sairaalan yhteydessä kehittyi hoitajien koulutusta (S17).
6. Nykyinen Nsambya Hospital on voittoa tavoittelematon opetus-/yhteisösairaala, ei vain historiallinen rakennus (S7/S17).

Ei vuodepaikkamäärää, ensisijaisuutta koskevaa superlatiivia tai nykyisen hoidon saatavuus-/laatulupausta. Sairaalan oma piste on eri kuin kukkulan piste. Nykyisen sairaalarakennuksen kuvaoikeuksia ei oleteta instituution iästä.

### Minitehtävä

Kysytään H2:n selityksestä: **minkä pienen eläimen aiheuttamaa tuhoa Namiremben kirkossa pelättiin?** Termiitin. Vastaus jätetään H2:een; kaupungin visa ei kysy samaa. Ei määriä tai päivämääriä muistettavaksi.

## 4. Nykyopas — viisi jaksoa

### O1 — Kukkuloilta toiselle

S1/S2/S4–S9 ja O1 auttavat hahmottamaan keskustan maaston. N-piste on kukkulan paikkapiste; kävijä etsii todellisen kulkureitin ja julkisen pääsyn erikseen. Ei palatsialueen, yliopiston, sairaalan tai kirkon sisäänpääsyä kukkulapisteestä. Kaupungin liikenne kulkee mäkien ja laaksojen kautta; tarkkaa kävelyaikaa tai reittiä ei luvata.

### O2 — Tori ja arki

Nakasero Marketin tuoretavara- ja suljettu osa esitellään S10:n mukaan. Ei hintaa, tiettyä kojua tai joka päivä saatavaa tuotetta. Nykyiset palvelutiedot tarkistetaan paikan päällä; P4 osoittaa myös hallintotietojen muuttuneen. Ugandan maalehden ruokareseptejä ei kirjoiteta uudelleen oppaan täytteeksi.

### O3 — Opetus ja kulttuuri

Makerere on korkeakoulu, Uganda Museum kokoelmia säilyttävä ja tutkiva instituutio (S11/S12/P1/P7). Kampuksen/vitriinien nykyistä palvelua tai näyttelyaikoja ei luvata. Kirkoissa noudatetaan paikan pukeutumiskäytäntöjä (P8), mutta kuvattavan nykyisen rakennuksen tekijäoikeus ei ratkea kävijälle annetusta tervetulosta. Kasubin ja maalehden valmis kulttuuritarina ei tähän uudestaan.

### O4 — Varovaisuus, liikenne ja sää

O2 **9.10.2026**: erityinen varovaisuus. Vältä suuria väkijoukkoja, varaudu turvatarkastuksiin ja seuraa paikallisia ohjeita; ei hyökkäysten/politiikan tarinaa. Pimeällä liikkumista ja yömaantieliikennettä vältetään. **Boda-boda-moottoripyörätaksien käyttöä tulee välttää** merkittävän liikenneonnettomuusriskin vuoksi (O2), vaikka O1 luettelee niitä kaupungin kulkutapoina. Ei turvalliseksi luvattua sovellus-/taksiyritystä.

Sää **null**. Aiempi poiminta sekoitti Climate-Data.org-keskilämpöä Makerere/WMO-taustaan ilman todennettua yhteistä kautta ja asemaa. Ei aste-/mm-/sadekausi-/kuukausivertailuja näistä luvuista. O2 neuvoo seuraamaan paikallisia ennusteita; nopeasti muuttuva sää voi vaikuttaa liikkumiseen. Tämä on nykyinen käytännön ohje, ei ilmastonormaali.

### O5 — Saapuminen ja ajantasaiset asiat

**Entebbe International Airport, EBB** (S16/P9/O1) palvelee Kampalaa Entebbessä. Etäisyydestä käytetään tarvittaessa ”Kampalan ulkopuolella”, ei yhden tielaskurin lukua kahden riippumattoman vahvistuksen sijasta. Ei tämän päivän lentovuoroja, lippuhintoja tai junalupausta. O2: maahantulo-/viisumiehdot ja terveystilanne tarkistetaan ennen matkaa, mahdollisiin poikkeusjärjestelyihin varataan aikaa. Sairaaloiden historiakappale ei ole matkailijan hoitotakuu.

**Parasta 5 -aihevara:** keskustan kukkulamaisema; Nakasero-torin eri tuotteet; Makereren koulutushistoria; museon kokoelmien tutkimus; paikannimien eri kerrokset. Ei lupaa päästä kaikkiin yksityisiin pihoihin tai kuvata suojattuja rakennuksia.

**Hyvä tietää 4:** hill-piste ei ole sisäänkäynti; boda-bodoja vältetään; nykyiset pääsy-/pukeutumisehdot tarkistetaan; lentoasema on Entebbessä. Kolme tuoretta opaskuvaa tarvitaan B:ssä, enintään kaksi jaksoa kuvatta; vanhat arkistokuvat jäävät nostoihin.

## 5. Kohdekartta — seitsemän oikeaa kaupunkikukkulaa

**Tyyppi jokaiselle `luonto`: kohde on lähteessä nimenomaisesti kukkula, nykyinen maastonpaikka, johon liittyy alue- ja kulttuurihistoriaa.** Sama nimi voi tarkoittaa myös naapurustoa; artikkelin kukkulaksi nimetty oma piste valitaan. Kohteeksi ei piiloteta suojattua kirkkoa/palatsia/moskeijaa tai niiden nykyistä arkkitehtuuria nimeämällä se kukkulaksi. Jutun ja kuvan pitää käsitellä kukkulaa/maisemaa oikeassa roolissa. Jos B löytää vain kiellettyjä rakennuskuvia, kuva puuttuu — A ei myönnä rakennuspoikkeusta.

Ydinrajaus: Old Kampala, Namirembe/Lubaga lännessä, Nakasero idempänä, Nsambya/Kibuli etelä-/itälaidalla ja vanha koulutuskukkula Makerere pohjoisessa. Ei koko Kampala City -hallintoaluetta, Entebbeä, Namugongoa, Victoria-järven laajaa retkialuetta tai kaukaisia suo-/luontokohteita.

**Rajausehdotus** tästä seitsemän oman pisteen joukosta ja noin 300 m marginaalista: länsi **32.5503**, itä **32.5978**, etelä **0.2964**, pohjoinen **0.3378**. Kyse toimitusta varten lasketusta rajauslaatikosta, ei lähteen mittaamasta kaupunginosarajasta. Kartan piirtäminen ei kuulu A:lle.

### N1 — Vanhan Kampalan kukkula / Old Kampala — luonto

**0.31528, 32.56861**, oma S2 Location ja WD Q6359102 P625 sama.

Faktat S2/S1: (1) nimi Kampala Hill/Old Kampala; (2) fyysinen kukkula keskustassa; (3) Kampala-nimi tarkoitti ensin tätä paikkaa; (4) lähteiden nimenselitys yhdistää sen impalojen metsästysalueeseen; (5) brittiläinen linnake sijoitettiin myöhemmin kukkulalle; (6) kaupungin kasvaessa muille mäille Old Kampala -nimi erotti vanhan alueen; (7) nykyinen naapurusto on asuin- ja kaupallista aluetta; (8) Makerere on pohjoisessa ja Namirembe lännessä, Nakasero idempänä.

**1873:** seutu oli Bugandaa; myöhempää Fort Lugardia ja nykyistä kansallismoskeijaa ei ollut. Ei väitettä lähteettömästä vuoden 1873 eläinmäärästä. Piste ei ole moskeijan/siirretyn linnakerakennuksen portti. **Gaddafi-moskeija ja sen tekijät eivät ole N-kohde**, eikä modernin moskeijan pääaihekuva vapaudu hill-nimellä.

### N2 — Namiremben kukkula — luonto

**0.31500, 32.55944**, oma S5 Location ja WD Q15260890. Katedraalin oma piste S13 **0.31500, 32.55972** on eri tieto.

Faktat S5/S13/S18: (1) kukkula vanhan kaupungin länsiosassa; (2) mirembe-sana liittyy rauhaan; (3) Namirembe on myös henkilöiden nimi, mutta kaikki nimenkantajat eivät ole paikan asukkaita; (4) Old Kampala idässä, Lubaga lounaassa ja Mengo kaakossa; (5) anglikaaninen instituutio tuli kukkulalle 1800-luvun loppupuolella; (6) nykyistä katedraalirakennusta edelsi useampi erilainen kirkko; (7) Mengo Hospital sijaitsee tällä alueella nimestään huolimatta; (8) läheinen Bulange on eri rakennuskohde.

**1873:** fyysinen kukkula kuuluu alueen maastoon; myöhempää anglikaanista keskusta/nykyistä kirkkoa ei siirretä tähän aikaan. Rauhan/voiton kokoontumisperinne sanotaan perimätiedoksi, ei ajoitetuksi varmaksi tapahtumaksi. Ei Kasubin jo valmista haudat/rengaskatto-tarinaa eikä hill-pistettä katedraalin sisäänkäynniksi.

### N3 — Lubagan kukkula — luonto

**0.30306, 32.55306**, oma S6 Location ja WD Q6695057. Katedraalin oma piste S14 **0.30250, 32.55222** on eri.

Faktat S6/S14: (1) tunnetaan myös Rubaga-nimellä; (2) fyysinen kukkula ja samanniminen naapurusto; (3) Mengo idässä ja Namirembe koillisessa; (4) Bugandan palatsipaikka oli kukkulalla ennen nykyistä katedraalia; (5) katolinen lähetysyhteisö sai myöhemmin maata; (6) St. Mary’s -instituutio sijoittui kukkulalle; (7) alueella kehittyi myös sairaala-/hoitajakoulutusta; (8) kukkula on osa kaupungin vanhaa länsiydintä.

**1873:** alue oli Bugandan palatsikeskuksen maisemaa; nykyinen katedraali rakennettiin myöhemmin 1900-luvun alkupuolella. Ei täsmämuutto-/palovuotta tai valmista luetteloa vuoden 1873 taloista. N3 ei ole katedraalin rakennus, patsas tai kirkon piha tekijänoikeuspoikkeuksella.

### N4 — Nakasero-kukkula — luonto

**0.32333, 32.57889**, oman S4:n nimenomaan **Nakasero Hill** -piste. WD Q16895628 **0.3244, 32.5788** on hieman eri ja väljä; käytetään omaa WP-paikkapistettä, ei keskiarvoa. Nakasero Market S10 **0.31176, 32.57954** on selvästi eri sijainti.

Faktat S4/S1/S10: (1) keskustan kukkula ja naapurusto; (2) sen alemmilla länsi-/etelärinteillä on kaupan ja liikkumisen toimintaa; (3) ylemmälle alueelle sijoittui myöhemmin hallinto-/instituutioita; (4) toripaikka on alempana, ei kukkulan huipun pisteessä; (5) Old Kampala lännessä, Makerere luoteessa ja Kololo idässä; (6) alueelle tuli myöhemmin linnake, joka liittyi brittiläiseen siirtomaakaupungin vaiheeseen; (7) historiallinen sairaalapaikka on muuttunut myöhempään analyysilaboratoriokäyttöön S1:n kuvauksessa; (8) vanha kaupungin maasto on laajempi kuin nykyinen liike-/hallintokortteli.

**1873:** itse maastonpaikka ja myöhemmät linnake-/hallintorakennukset erotetaan. Tarkkaa vuonna 1873 huipulla sijainnutta rakennusta ei keksitä. Piste ei ole torin, parlamentin tai hotellin sisäänkäynti eikä nykyinen suojattu rakennus N-kohde.

### N5 — Kibulin kukkula — luonto

**0.31000, 32.59500**, oma S8 Location ja WD Q6404080 sama.

Faktat S8/S1: (1) fyysinen kukkula keskisessä Kampalassa; (2) nimi koskee myös kaupallisia/asuinalueita rinteillä; (3) Nsambya lounaassa ja Namuwongo itäpuolella; (4) kukkula liittyy muslimiyhteisön kaupungissa käyttämiin alueisiin; (5) Prince Nuhu Mbogo lahjoitti ensimmäiseen moskeijaan liittyvää maata, tekijää ei samasteta lahjoittajaan; (6) myöhempää lahjoitettua maata käytettiin myös koulu-/hoitotoimintaan; (7) Kibuli Secondary School ja Teacher Training College kuuluvat alueen nykyiseen opetusympäristöön; (8) kukkulan alapuolen Namuwongo on eri naapurusto.

**1873:** fyysistä kukkulaa ei esitetä nykyisen moskeijan rakennuksena. Alueen tässä luetut nimetyt lahjoitus-/instituutiovaiheet ovat myöhempiä; tarkkaa vuoden 1873 maankäyttöä ei väitetä. S15:n tekoäly-/lähteettömät arkkitehtuurikuvaukset eivät ole N5:n lähde. Nykyinen Kibuli Mosque ei vapaudu luonnonkohteen nimellä kuvattavaksi pääteokseksi.

### N6 — Nsambyan kukkula — luonto

**0.29917, 32.58806**, oma S7 Location ja WD Q7067544 sama. S17:n sairaalapiste **0.30167, 32.58500** eri, ei vaihto hill-pisteeseen.

Faktat S7/S17/S1: (1) keskustan eteläisempi kukkula; (2) nimi ulottuu myös sen rinteiden naapurustoihin; (3) se sijaitsee Kampalan Ggaba-suunnan liikenneakselilla; (4) alue kuuluu kaupungin vanhojen kukkuloiden joukkoon; (5) Mill Hill -lähetysyhteisö aloitti toimintaa 1800-luvun lopulla; (6) sen toimintoihin kuuluivat kirkko ja koulut; (7) alueen hoitopaikasta kasvoi St. Francis -sairaala; (8) hoitajien ja lääkärien opetus on myöhempi kerrostuma, eri kuin kukkulan maaston ikä.

**1873:** kukkulan myöhempi Mill Hill-/sairaalakerrostuma ei vielä kuulu matkavuoteen. Ei sairaalaan pääsyä tai hoidon saatavuutta matkailijalle. Kukkapiste ei sairaalan, kirkon tai lääketieteellisen koulun sisäänkäynti; nykyiset rakennukset ja henkilöt jäävät kuva-/oikeustarkistukseen.

### N7 — Makereren kukkula — luonto

**0.33500, 32.57000**, oma S9 Location ja WD Q6739281 sama. Piste on kukkula/naapurusto, ei yliopiston portti, kirjasto tai uudelleen rakennettu päärakennus.

Faktat S9/S12/P1/P2: (1) fyysinen kukkula ja saman niminen kaupunginosa; (2) Old Kampala etelässä, Wandegeya kaakossa ja Mulago idässä; (3) yliopiston pääkampus sijoittuu kukkulalle; (4) sen taustalla oli tekninen koulutus; (5) ammattiopinnot laajenivat korkeakoulutukseksi 1900-luvulla; (6) kampuksen lisäksi alueella on muita oppilaitoksia, kuten Makerere College School ja Law Development Centre; (7) opiskelija-asumista on myös kampusrajan ulkopuolella; (8) nykyinen kaupunginosan rakennusjoukko ei ole yksi alkuperäinen yliopistorakennus.

**1873:** myöhempää Makereren koulua/yliopistoa ei ollut. Jutussa voi kuvata fyysisen kukkulan ja sen myöhemmän opetusroolin, mutta ei nimetä vuoden 1873 taloja tai vanhaa campusporttia. S9:n ”one of original seven” eroaa S1:n seitsemän luettelosta; tästä ei tehdä täsmämääräväitettä. Makerere on kaupungin vanhan koulutusympäristön pohjoinen osa, ei kaukainen retkikohde.

### Muiden kohteiden poisjättö N-listasta

- **Mengo:** oma WP-kukkulapiste ja WD ovat selvästi eri alueilla. Ei hiljaista toisen pisteen käyttöä toimituksen määrän täyttämiseksi; N-listassa seitsemän muuta soveltuvaa kukkulaa.
- **Kasubi:** paikkatarina jo kokonaan pelissä, ei samaa uutta hautakohdetta eri kuvalla.
- **Uganda Museum -rakennus:** Ernst May, kuollut 1970 (S11/S19), alle 70 vuotta. Institutionaalinen K4 sallii historiatiedon, ei tätä rakennusta kohteeksi/kuvaksi.
- **Kabakan järvi:** luettu nykyinen en-artikkeli ei löytynyt; S3:n pieni pinta-alaväite vs vanhoissa hakutuloksissa paljon suurempi järvi, KCCA:n sivu aikakatkaistu. Käyttökelpoiset WD-pisteet eivät yksin tuota kuudesta kymmeneen luettua kohdefaktaa. Ei tähän N-joukkoon.
- **Nykyiset katedraalit, moskeijat, palatsi, Bulange, muistomerkit ja klaaniveistokset:** paikkahistorian rinnalla niiden omat tekijä-/korjausketjut jäävät avoimiksi. Ei hyväksymistä iästä/Commons-lisenssistä päättelemällä. Hill-joukko ei ole lupa näyttää rakennusta luonnon kuvana.
- **Entebbe, Namugongo, laajat suot ja Victoria-järven retket:** tämän keskustakartan ulkopuolella ja osa jo olemassa olevista maa-/Viktoria-aiheista; ei määrätäytteitä.

## 6. Viisi kysymysaihetta ja kolme tietoa

1. **Taso 1:** missä Kampalaa palveleva kansainvälinen kenttä sijaitsee? Entebbessä (S16/P9); ei muihin pelikaupunkeihin perustuvia vaihtoehtoja.
2. **Taso 1–2:** mikä eläin liittyy vanhan kukkulan nimen yleiseen selitykseen? Impala (S1/S2). Kysymys sanoo ”nimen selityksen mukaan”, ei varmaa alkuperäistä eläintarinaa.
3. **Taso 2:** mitä Makereressa opetettiin sen teknisessä alkuvaiheessa? Puusepäntyötä, rakentamista ja mekaniikkaa (S12/P1); C valitsee yhden selkeän kysymysmuodon.
4. **Taso 2–3:** missä Nakasero-torin osassa myydään tuoreita elintarvikkeita? Avoimessa/osittain katetussa osassa (S10).
5. **Taso 3:** millaisella järjestelyllä Cambridgesta tuodut museoesineet saapuivat Uganda Museumin hoitoon? Pitkäaikaislainana (P7), ei varmana lopullisena omistuksen siirtona.

Neljä uskottavaa vastausta, oikea ei ainoa pitkä; vihje ei anna vastausta. H2:n termiitti-minitehtävä ei toistu visassa.

Kolme tietoaihetta:

- Namirembe Hill ja Namirembe Cathedral ovat eri paikkarooli/piste; fyysinen kukkula on nykyistä rakennusta vanhempi (S5/S13).
- Makereren korkeakoulu alkoi teknisistä taidoista, ei valmiina suurena yliopistona (S12/P1).
- Museoesineen tutkimus ja omistusjärjestely ovat eri asioita: pitkäaikaislaina ei ole sama kuin lopullinen palautus (P7).

## 7. Kuvatarpeet B:lle

**Ei Commons-hakuja tai valittuja kuvia.** Vain PD/CC0/CC BY/CC BY-SA, vähintään 1 200 px leveys, todellinen alkuperäislähteen tekijä/lisenssi. Joka kuva katsotaan B/C/D:ssä. Täyden reseptin mukaan luettavat kasvot, lisätyt merkit/leimat/signeeraukset/kehykset sekä mainos- ja pakkauskuvat hylätään. Yksi tiedosto kerran kaupungissa.

| Kohta | Tarve/hakusanat | Rooli ja kielto |
|---|---|---|
| Kansi 1 | Kampala hill cityscape wide | laaja maisema, ei yksittäinen suojattu uusi rakennus pääkohteena |
| Kansi 2 | Kampala market street panorama | laaja kaupunkikuva, ei hedelmälähikuva kannessa tai luettavat kasvot |
| Kansi 3 | Kampala trees ridges skyline | eri kaupunginpuoli; paikka/tekokohteet varmennettava |
| K1 | impala / Old Kampala landscape | yleinen eläinhavainne ei todiste nykyisestä Kampalan impalasta; moderni moskeija ei eläin-/kukkulajutun pääkuvaksi |
| K2 | Nakasero market produce | hedelmät/tuotteet tai oikea tori; ei vaatteen/vitriinin mainospakkaus tai kasvot |
| K3 | Makerere historical training / carpentry tools | työn välinehavainne nimettävä yleiseksi, ei lainattu esine Makereren alkuperäisesineeksi |
| K4 | Uganda Museum specimen/object research | esineen identiteetti, tekijä/ikä ja provenienssi varmistetaan; Ernst Mayn rakennus ja moderni taideteos pois |
| H1 | Mengo grinding stone / natural landscape | yleinen jauhinväline ei nimetyn SSese-perinteen arkeologinen esine ilman todistetta; nykyinen palatsi ei automaattisesti kelpaa |
| H2 | Namirembe old church / termites | arkistokuva oikeine osineen tai yleinen termiittihavainne, ei termiittikuva tietyn kirkon vaurion todisteeksi |
| H3 | Lubaga old landscape | kukkula/maisema; nykyinen katedraali tai patsas vaatii erillisen hyväksytyn ketjun |
| H4 | Nsambya education/health historical object | tavallinen opetus-/hoitoväline selkeästi nimettynä; ei potilaiden kasvoja tai nykyistä sairaalarakennusta oletettuna suojavapaana |
| Matkailijalle | tuore maltillinen pysty, yksi paikallinen luonnon-/arki-aihe | suhde 0,60–0,85; ei kasvoja, ääripitkää tornikuvaa tai tunnistettua suojattua pääteosta |
| Opas | kolme tuoretta kuvaa vähintään | enintään kaksi kuvatonta jaksoa; arkisto ei nykyoppaaseen |
| N1–N7 | kullekin nimetylle kukkulalle yksi maisemakuva | hill näkyy tai näkymä/paikkarooli todistetaan; kuvan modernia pääteosta ei nimitetä luonnoksi, ei yleiskuva väärälle kukkulalle |
| Valokuva | yksi todellinen Kampala-kuva | paikkarooli ja kuvausajankohta; ei Kasubin jo käytettyä kuvaa uudelleen |
| Ennen–nyt | vain aidosti 1870-luvulla ajoitettu PD-vedos | myöhempi kolonialistinen postikortti ei vuoden 1873 kuva |

Suojattu kuvaan osuva teos ja kuvaajan oma CC-lupa tarkistetaan erikseen. Hill-kohteen olemassaolo ratkaisee A:n paikkatyypin, ei B:n jokaisen mahdollisen maisemakuvan kaupallista käyttöä. Jos hill-kuva puuttuu, aukko jää näkyviin eikä yksittäistä kiellettyä rakennusta valita paikkamäärän vuoksi.

## 8. Ristiriidat ja ratkaisut

1. **Nimi:** kontekstin kuvaus sanoo nimen tulevan brittiläisestä linnakkeesta; S1/S2 yhdistävät nimen sitä edeltäneeseen hill/impala-selitykseen. Käytetään lähteistettyä varovaista muotoa **nimi liittyy vanhan kukkulan nimenselitykseen**; linnake on kaupunkihistorian myöhempi vaihe. Ei hiljaista kontekstitiedoston editointia.
2. **1873 ja kibuga:** S1:n 1862/1875 palatsivierailut eivät varmista samaa palatsia täsmälleen 1873. Julkaistava alue oli Bugandan ytimessä, nykyinen siirtomaakaupunki ja myöhemmät rakennukset nuorempia. Ei fiktiivistä isoisän linnake-/kirkko-/yliopistovierailua.
3. **Mengo:** oma S3 hill 0.301667, 32.566111 vs WD 0.346667, 32.6056; WD viittaa eri alueelle ja on hyvin väljä. Ei hiljaista valintaa N-kohteeksi; seitsemän muuta todellista hill-kohdetta riittää. Tämän ristiriidan vuoksi itse nimen historia voi olla nostona mutta uusi karttamerkki ei.
4. **Nakasero:** oma hill-kohta 0.323334, 32.578890 vs WD 0.3244, 32.5788. Pieni paikallista hill/naapurustoa koskeva ero, ei eri rakennusten samastus. Valitaan **oma WP:n nimenomaan hill-piste**, lähde ja ero taustaan. Tori paljon alempana eri pisteessä.
5. **Seitsemän kukkulaa:** S1/S7 listarunko sisältää Nsambyan mutta ei Makererea; S9 kutsuu Makererea yhdeksi alkuperäisestä seitsemästä. N-lista on toimituksen **seitsemän nimettyä kukkulapaikkaa**, ei uusi alkuperäisen seitsemän lista. Makerere relevantti vanhaan koulutusympäristöön. Ei numeerista superlatiivia.
6. **Makereren alku:** S12:n ensimmäiset tunnit 1921, virallinen P1 ”starting in 1922”; koulutuksen käynnistyminen ja instituution perustaminen eivät aina ole sama tapahtuma. **1900-luvun alkupuoli**, ei täsmäperustamisvuosivisaa yhden ketjun varassa.
7. **Lubagan palatsin muutto:** S6 kuvaa muuttoa Kasubiin, S14 Mengoon. Ei valita paikkaa hiljaa; palatsialue oli ennen nykyistä katedraalia, tarkka palo-/siirtovuosi ja -paikka pois. Ei toisteta Kasubin valmisjuonta.
8. **Kibuli Mosque:** S15 itse varoittaa mahdollisesta kielimallin tekstistä ja lähteettömistä sommittelu-/rauhallisuus-/toimintaväitteistä. N5/H-kuvaukset perustuvat **kukkulan S8:aan ja yleiseen S1:een**, eivät S15:n uuden arkkitehtuurin väitteisiin. Ei nykyisen moskeijarakennuksen hyväksyntää.
9. **Museorakennus:** S11 nimeää Ernst Mayn, S19 kuolema 1970. Tekijän kuolemasta alle 70 vuotta, rakennus jätetään pääkohdekuvana/karttakohteena pois. Museon vanha instituutio tai sen kokoelmat eivät ohita tätä.
10. **Museolaina:** P7 pitkäaikaislaina/research; ”repatriated” voi otsikkona näyttää lopulliselta siirrolta, mutta omistusratkaisua ei väitetä valmiiksi. Esineiden hankintatapojen erot säilytetään, eivät kaikki kuulu samaan selitykseen.
11. **Nakasero-torin hallinto:** S10 mainitsee vanhan kauppiasyhdistyksen, P4 uuden hallintotilanteen. Ei vanhentunutta hallintotietoa nykyoppaaseen, ei politiikkajuttua. Tuotteiden / alueiden funktionaalinen kuvaus erillinen.
12. **Sää:** keskilämpöpoiminnan Climate-Data.org-viite ja Makerere/WMO-tausta eivät olleet yksi varmennettu normaaliasema/kausi. **Null**, ei sarjan palautusta, laskentaa ylin/alin-keskiarvolla tai käsin kauden vaihtoa.
13. **Turvallisuus/transport:** O1 kulkumuotoluettelo ei syrjäytä O2:n **9.10.2026** kehotusta välttää boda-bodoja ja yöliikennettä. Ei tämänhetkisten levottomuuksien tarinoita, mutta käytännön rajoitukset suoraan oppaaseen.
14. **Tarkat luvut/vuodet:** historialliset perustamis-/rakennusvuodet, kapasiteetit, korkeudet, matka-ajat/etäisyydet, raha ja superlatiivit eivät julkaistuina perustu kahteen riippumattomaan lähteeseen tässä. Käytetään vuosisataa/aikakautta tai jätetään pois. Koordinaatit ovat nimenomaan sallittu paikkalähde, niiden toimitusmuoto ei mittaustarkkuuden lupaus.

## 9. Poisjätöt ja jatkotoimet

- Nykypolitiikka, terrori-iskut, rikostarinat, poliitikkojen alumniluettelot ja hallinnon puheet eivät nostoksi. O2:n olennaiset nykyiset liikkumis-/matkustusohjeet säilyvät lyhyinä.
- Maalehden 20 aihetta, Kasubi ja Viktoria Nyanzan tarinat eivät uudelleen eri kuvan kanssa. Kansallisruoan, tuohikankaan tai entenga-rummun alkuperäinen tarina ei museojutun täytteeksi.
- N-kohteeksi ei nimettyä nykyistä suojattua rakennusta, patsasta, klaanikoristetta, valaistusta tai teosta. Fyysinen kukkula on eri kohde kuin sille rakennettu teos; nykyisten kuva-aiheiden oikeusketju kuitenkin B/D:ssä.
- Hill-pistettä ei kutsuta portiksi, huipulla olevaksi rakennuspisteeksi, museon sisäänkäynniksi tai määrämittaiseksi luontoreitiksi. Kartan nykyhetki ei todista vuoden 1873 yksityiskohtia.
- Valokuvaajan Commons-lisenssi ei anna automaattista hyväksyntää kuvaan osuvaan uuteen rakennukseen tai taideteokseen. Instituution perustaja ei ole sen nykyisen rakennuksen arkkitehti.
- Ei palvelujen/hintojen/aukioloaikojen, lentojen/junien tai hoidon saatavuuden lupauksia. Nykyiset pääsy- ja terveys-/viisumiehdot tarkistetaan.

**A valmis lähdepakettina seitsemän hill-kohteen rajauksella.** Jäljellä olevat kuva- ja myöhempien rakennusosien portit kuuluvat B/C/D:lle, eivät ole A:ssa hyväksyttyjä. Mengo, museorakennus, järvi ja muut ehdolliset vaihtoehdot jäävät N-joukon ulkopuolelle. `saatiedot: null` on tarkoituksellinen hyväksytty lähdepuuteratkaisu, ei kuviteltu säärivi.
