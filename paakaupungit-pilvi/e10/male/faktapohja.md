# Malé — rajattu A-lähdekooste 12.10.2026

Omistus: e10/male. Oikea klooni: sessio-72-20261011/e10 NASilla. Tämä on nopean C-luonnoksen lähdekooste, ei täysi A/B/D/E/F-hyväksyntä. Konteksti.json luettu: ei maalehteä/lähilehtiä; kevyt kuvaus sisältää jo pääsaaren ahtauden, Hulhumalén, kalasataman ja tunnusrakennukset. C syventää käsityötä, vanhaa palatsikaupunkia ja ruokaa. Tarkkoja rakennusvuosia, väestö- ja pinta-alalukuja ei käytetä.

## 0. Luetut lähteet ja hakutodiste
Kaikki alla olevat sivut noudettiin 12.10.2026 yhteisellä sallittu_haku.py-apurilla: robots molemmille agenteille, redirect-tarkistus ja yhteinen hakulukko. HTML sekä paikallinen tekstipoiminta: `valiaikainen/nopea-e10-male/`. Lähteiden SHA ja omat tarkistustapahtumat samassa hakemistossa. Wikipedia-raakatekstin estettyjä /w/-polkuja ei käytetty.

- M1 https://en.wikipedia.org/wiki/Mal%C3%A9 — johdanto, Overview, History, Transport, Port. Palatsikaupunki, muurit/portit, Ibn Battutan kuvaus, kaupallinen satama, naapurisaarten yhteydet.
- M2 https://en.wikipedia.org/wiki/Mal%C3%A9_Friday_Mosque — History, Features, oma koordinaatti. Porites-koralli, märän kiven leikkaus ja kuivatus, liitosmenetelmä, puuosat, edelleen käytössä. Tekstin tarkat vuodet korvattiin vuosisadalla; minareetin vuotta ei valittu.
- M3 https://en.wikipedia.org/wiki/Maldivian_cuisine — Coconut, Fish, Curries, List of dishes. Mas huni/roshi, gulha/hedhika/bajiyaa, garudhiya, rihaakuru, hunigondi, kala kasviscurryissa.
- M4 https://en.wikivoyage.org/wiki/Mal%C3%A9 — Get in, Get around, See, Buy, Eat. Lentoasema Hulhulélla, lautta/bussi/taksi, käveltävä pääsaari, torit, kahvilat, Ramadan. Hintoja, aikatauluja, turvallisuusyleistyksiä ja vanhoja ravintolakohtaisia lupauksia ei kopioitu.
- M5 https://whc.unesco.org/en/tentativelists/5812/ — Description; Malé Friday Mosque; Comparison with other similar properties. Korallikiven pontti-/tappitekniikka, paikallinen käsityö ja Intian valtameren yhteydet. Kyseessä on Malediivien esittämä ehdokasluettelosivu, ei hyväksytty maailmanperintökohde. WP lainaa tätä, joten niitä EI lasketa kahdeksi riippumattomaksi numerolähteeksi.
- Täydentävät noudot https://en.wikipedia.org/wiki/Garudhiya, https://en.wikipedia.org/wiki/Rihaakuru, https://en.wikipedia.org/wiki/Mas_huni. C:n ruokaväitteiden perusta on luettu M3; näistä ei otettu uusia lukuja.

## 1. Perusfaktat ja 1873-kehys
Malé on Malediivien pääkaupunki ja kaupallisen sataman sijaintipaikka (M1). Velanan lentoasema on Hulhulélla; Malé/Hulhulé/Hulhumalé liittyvät maantieverkkoon, ja lauttaliikennettä on (M1, M4). Kaupunkipiste 4.175, 73.5083 kopioitu omasta kontekstista.

Hukuru Miskiy on 1600-luvun rakennus, joka on ollut jatkuvasti käytössä (M2; M5). Näin vuonna 1873 se oli jo olemassa. Katto ja tukirakenteet ovat myöhemmin muuttuneet; nykyulkoasua ei esitetä vuoden 1873 ulkoasuna. Ei isoisän vierailua, reittiä, havaintoja tai puhetta.

Väestö: kontekstin 137238/2022 tarkoittaa pääsaaren neljää ward-aluetta; 211908/2022 suur-Maléa. M1:n johdanto yhdistää hallintoalueen väestön pääsaaren pieneen pinta-alaan. Ei käytetä tätä tiheysväitettä eikä mitään väestölukua C:ssä.

## 2. Kansisivun väitteet
1. Palatsikaupunki: sulttaanien asuinpaikka, muuri/portit/linnakkeet, varustusten purku, katujen levennys, palatsin purku, vanhan moskeijan säilyminen — M1 johdanto/History. Ei tarkkoja vuosia eikä politiikkaa.
2. Korallikivi: Porites merestä, märkä leikkaus/kuivatus, pontit/tapit, kaiverrukset, puun lakkaus, merelliset kulttuuriyhteydet — M2 Features, M5 Description/Comparison. Ei korallin nykyistä keräämistä koskevaa ohjetta.
3. Ibn Battuta: keskiaikainen kuvaus kuningattaren asuinpaikasta, palatsialueen kauppaa varten säilytetyistä kaurikotilon kuorista ja puisista moskeijoista — M1 History. Ei tarkkaa matkavuotta, kuorien määrää tai valuuttaselitystä.
4. Kalatori: kala tuodaan/perataan/myydään paikalliseen käyttöön; paikallistorin atollituotteet (hedelmät, vihannekset, banaanit, jamssi, leipäpuun lastut, savustettu/kuivattu kala); kalatorin yhteydessä välipaloja — M4 Buy/Eat. Ei hygienialeimaa, myyntimääriä tai nimettyjen yritysten nykytilaa.

## 3. Teemasivu ruoka: Satamasta teepöytään
- Mas huni: kala, kookosraaste, sipuli ja chili; roshi; kookoksen muut muodot — M3 Fish/Coconut.
- Hedhika/gulha/bajiyaa: kalaa sisältävät välipalat, gulhan täyte ja kuuma tee, bajiyaa samosan paikallinen vastine; kaupunkikahviloiden konteksti M4 — M3 Fish/List of dishes, M4 Buy.
- Garudhiya vs rihaakuru: kalaliemi vs paksu ruskea kastike, miedolla lämmöllä tiivistyminen/haihtuminen — M3 List of dishes.
- Hunigondi: matala pitkä istuin, sahalaitaterä, raasteesta liottamalla/puristamalla maitoa; mas riha tonnikalasta; kasviscurryissa voidaan käyttää kuivattua kalaa — M3 Coconut/Curries.
Minitehtävä rihaakurun tiivistymisestä on saman sivun kolmannessa nostossa. Visa kysyy kaupungin sijaintia, rakennusmateriaalia, lentoasemasaarta, kuorivarastoa ja rakennusliitosta, joten minitehtävä ei toista sitä.

## 4. Matkailuopas
Viisi jaksoa: perille/liikkeelle (M1, M4), korallimoskeija (M2, M5; hautapaikan perimätieto M1/M4), torit/kahvilat (M4), ruoka (M3), ajankohta/rytmi (M1 Climate vain trooppinen monsuuni-ilmasto ja ympäri vuoden korkea lämpö; M4 Get around/Eat sadebussit ja Ramadan). Ei sääkuukausia, asteita, sademääriä, hintoja tai aukioloaikoja. Villimalén rauhallisuus M4 See. Ennen matkaa tehtävä palvelujen tarkistus on ohje, ei väite nykyisestä palvelutasosta. Erillinen matkustusturvallisuusauditointi avoin.

## 5. Kartta partial ja nähtävyys
Ainoa piste: Hukuru Miskiy, vanha perjantaimoskeija. M2:n oma koordinaatti 4.17806, 73.51250; M5:n oma DMS-piste on lähes sama. Sijaintia ei lainattu kaupungilta eikä Wikivoyagesta. Rajaus geometrisesti tämän pisteen ympärille. Kohteen alkuperäinen 1600-luvun käsityö on selvästi yli suojarajan; kuvia ei vielä valittu. Nykykorjausten ja mahdollisten uusien yksityiskohtien rajaus jää kuvaputkelle.
Nähtävyysjutun faktat: M2 History/Features, M5 Malé Friday Mosque. Katon myöhemmät muutokset, rakennusmateriaalit, liitokset, paikalliset puusepät, minareetti/hautausmaa, jatkuva käyttö. Vain vuosisata, ei tarkkoja rakennus- tai korjausvuosia. Muiden 5–7 karttapisteen oma WP/WD-sijainti sekä suojaraja ja lähdefaktat ovat avoimia.

## 6. Kysymykset ja tiedot
Viisi kysymystä lähdeosoitteineen JSONissa: M1 pääkaupunki/Hulhulé/Ibn Battuta; M2 koralli/liitos. Kolme tietoa: M2/M5 liitos, M1 kuorivarasto, M3 hunigondi. Ei isoisän ääntä. Tarkat koordinaatit ovat paikan omasta sijaintilähteestä; proseessa ei tarkkoja määrälukuja tai rakennusvuosia.

## 7. Kuvat
Ei B-valintaa. Kaikkien 19 roolin tiedosto/lahde/lyhyt/selite tyhjiä. Kuvaehdotusten aiheet: pääsaaren yleiskuvat 3, valokuva 1, neljä kansiaihetta, neljä ruokateemaa, matkailijalle pystykuva, viisi opaskuvaa ja yksi Hukuru Miskiy -juttukuva. Ei kuvahakuja/generointia, ei keksittyjä nimiä tai creditejä.

## 8. Avoimet portit
Täysi A minimi/karttakohteet; B kuva-aineisto ja katselu; sää 48/48 primäärivarmennus; nykyopastiedon auditointi; riippumattomat D/E/F. saatiedot:null, saa.json jätetty koskematta. Nykyarkkitehtuuria, suojattuja teoksia, palatsin rekonstruointia ja poliittista tapahtumakerrontaa ei valittu kohteiksi.

## 9. Poisjätöt ja lähderajat
Ei nimeämismyyttiä (M1 citation needed), ei tarkkoja tiheys-/väestölukuja, minareettivuotta tai maailmanperintöväitettä. Ei nykyhallinnon puolueita, protesteja, turvallisuusväitteitä, nykypolitiikkaa tai hintoja. Tuotteiden ja tekniikan kuvaukset kirjoitettu omin sanoin; suoria lähdesitaatteja ei käytetä.
