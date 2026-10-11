# Rabat — faktapohja, vaihe A

Kaupunki `rabat`, maa `MAR`, erä `e04`. Koostettu 11.10.2026. Tämä on kirjoittajan lähdeaineisto, ei valmis peliteksti. Luettu AGENTS.md, CODEX.md, PILVIOHJEen luvut 3, 4, 7 ja 13 sekä LISÄSÄÄNTÖ, lehtityöresepti, Nairobi-mallin rakenne ja kaupungin konteksti.json. Pelitiedostoja ei muutettu.

**Lähdekanavan poikkeus:** omistaja hyväksyi 11.10.2026 robots-sallitut tavalliset Wikipedia- ja Commons-lähdesivut estettyjen API-polkujen sijasta. Tässä vaiheessa Wikipedia-artikkelit luettiin sallituista `/wiki/`-osoitteista ja Wikidata sallituista `Special:EntityData/*.json`-osoitteista. Kaikki omat pyynnöt ja uudelleenohjaukset tarkistettiin `sallittu_haku.py`-apurilla ennen hakua. Wikimedian `/w/`, Wikipedian `/api/`, Wikidata SPARQL ja Special:Search/Export jäivät hakematta kieltojen vuoksi. Kuvasivujen/lisenssien tarkistus kuuluu vaiheeseen B; tässä ei ole tehty Commons-hakuja eikä valittu kuvia.

**Lukukuri:** eri Wikipedia-artikkelit eivät automaattisesti ole riippumattomia lähteitä. Alla rakennusvuodet, mitat, lukumäärät ja etäisyydet on tarkoituksella korvattu vuosisadoilla tai jätetty pois, ellei riippumaton vahvistus ole kirjattu. Koordinaatit ovat erikseen ohjeen edellyttämää lähdepaikkatietoa. Hakupäivä, lähdeasiakirjan päiväys ja mallin 1873-kehys eivät ole rakennusvuosiväitteitä. Syyselitys otetaan vain lähteestä, eikä muutoin lisätä.

## 0. Luetut lähteet ja 1873-kehys

Kaikki verkkolähteet haettu ja luettu 11.10.2026. Wikipedia: englanti. UNESCO ja Rabatin suojelusäätiö: englanti. UM: suomi. Wikidata: englanninkieliset nimet sekä nimetyt väitteet ja qualifierit. NAS-raaka-aineistot ja tekstipoiminnat ovat hakemistossa `/Volumes/NAS-Homes/samireivinen/Matkakirja-arkisto/paakaupungit-codex/sessio-72-20261011/valiaikainen/rabat-A/`. Rabatin pää-EntityData on lisäksi ylemmässä hakemistossa `rabat-entity.json`; verkkopyyntöjen loki on `sallitut-haut.jsonl`.

| Tunnus | Artikkeli/lähde ja luetut osiot |
| --- | --- |
| R1 | [Rabat](https://en.wikipedia.org/wiki/Rabat): johdanto, Etymology, History (Ancient Sala, Medieval Islamic period, Corsair republic, 'Alawi rule, French colonial rule), Museums and parks, Historic monuments, Transportation. Ilmastolukuja ei kopioitu tästä käsin. |
| R2 | [Timeline of Rabat](https://en.wikipedia.org/wiki/Timeline_of_Rabat): Prior to 20th century, 20th century. Historiallisten päivämäärien ristiriitojen vertailu; tämän artikkelin lukuja ei käytetä lisävahvistuksena automaattisesti. |
| R3 | [Kasbah of the Udayas](https://en.wikipedia.org/wiki/Kasbah_of_the_Udayas): Name, History, Major structures and monuments (Great Gate, Old Mosque, Pavilion, Andalusian Garden), Current status. |
| R4 | [Bab Oudaya](https://en.wikipedia.org/wiki/Bab_Oudaya): johdanto, Historical background, Architecture. |
| R5 | [Bab er-Rouah](https://en.wikipedia.org/wiki/Bab_er-Rouah): johdanto, History, Architecture. |
| R6 | [Chellah](https://en.wikipedia.org/wiki/Chellah): johdanto, History (Phoenician, Mauretanian ja Roman Sala, Marinid period, Post-Marinid period), The Roman remains, The Marinid necropolis. |
| R7 | [Andalusian wall of Rabat](https://en.wikipedia.org/wiki/Andalusian_wall_of_Rabat): johdanto, Background, Gates, Bastions. Katso virheelliset mitat/ajoitukset osiossa 8. |
| R8 | [Borj Sidi Makhlouf](https://en.wikipedia.org/wiki/Borj_Sidi_Makhlouf): johdanto ja infolaatikko. Lyhyttä artikkelia täydennettiin R7:n Bastions-osiolla. |
| R9 | [Moulay Slimane Mosque](https://en.wikipedia.org/wiki/Moulay_Slimane_Mosque): johdanto ja infolaatikko. |
| R10 | [Bou Regreg](https://en.wikipedia.org/wiki/Bou_Regreg): johdanto, Physical characteristics, History. Vedenlaatulukuja tai uimakelpoisuutta ei päätelty. |
| R11 | [Rabat–Salé Airport](https://en.wikipedia.org/wiki/Rabat%E2%80%93Sal%C3%A9_Airport): johdanto ja infolaatikko; lentoyhtiöt, aikataulut, hinnat ja historia eivät tule oppaaseen. |
| R12 | [Rabat–Salé tramway](https://en.wikipedia.org/wiki/Rabat%E2%80%93Sal%C3%A9_tramway): johdanto, Network, History. Vanhentuneita laajennusennusteita ei käytetä. |
| R13 | [Moroccan cuisine](https://en.wikipedia.org/wiki/Moroccan_cuisine): Ingredients, Structure of meals, Main dishes, Drinks. Vain oppaan yleinen ateria- ja minttuteetausta; ei Rabatin omaksi perinteeksi väittämistä. |
| R14 | [UNESCO: Rabat, Modern Capital and Historic City: a Shared Heritage](https://whc.unesco.org/en/list/1401/): englanninkielinen kuvaus, Outstanding Universal Value, Integrity, Date of Inscription. |
| R15 | [Foundation for the safeguarding of cultural heritage of Rabat: The Ramparts and the Almohad gates](https://fspcrabat.ma/en/rabat-world-heritage/the-ramparts-and-the-almohad-gates/): koko lyhyt kohdekuvaus. Ei sen mittoja, joiden laajuus on epäselvä. |
| R16 | [Ulkoministeriö: Marokko, matkustustiedote](https://um.fi/matkustustiedote/-/c/MA): sivun päiväys 9.10.2026, Turvallisuustaso, Liikenne, Luonnonolot, Maan lait ja käytännöt. Oppaaseen vain käytännön varovaisuus, moskeijoiden pääsyrajoitus ja rannat; ei politiikkaa/rikollisuutta. |
| R17 | [Great Mosque, Rabat](https://en.wikipedia.org/wiki/Great_Mosque,_Rabat) ja [As-Sunna Mosque (Rabat)](https://en.wikipedia.org/wiki/As-Sunna_Mosque_(Rabat)): luettu poisjätön arvioimiseksi; katso 8–9. |
| WD1 | [Rabat Q3551 EntityData](https://www.wikidata.org/wiki/Special:EntityData/Q3551.json): P17, P1376, P206, P625, P1082, P571, P1435 ja sitelinkit. |
| WD2 | [Kasbah Q2569036 EntityData](https://www.wikidata.org/wiki/Special:EntityData/Q2569036.json): P625, P206, P131, P571. |
| WD3 | [Chellah Q2314811 EntityData](https://www.wikidata.org/wiki/Special:EntityData/Q2314811.json): P625, P31, P131, P2596. |
| WD4 | [Bou Regreg Q894940 EntityData](https://www.wikidata.org/wiki/Special:EntityData/Q894940.json): P625, P403, P131. |
| WD5 | [Borj Sidi Makhlouf Q58897404 EntityData](https://www.wikidata.org/wiki/Special:EntityData/Q58897404.json): P625, P31, P131. |

Myös seuraavat EntityData-oliot luettiin kohteiden paikantamiseksi ja virheiden tarkistamiseksi: Q58897235 (Bab Lakbir), Q579331 (Hassan Tower), Q65926576 (UNESCO-osa), Q65926560 (UNESCO-kokonaisuus), Q65926578 (Hassan Mosque -UNESCO-osa), Q25390520 (Botanical Garden), Q17164860 (Medina of Rabat), Q124161663 (Ramparts and Almohad gates), Q124161648 (uusi kaupunginosa), Q18394460 (timeline), Q1028 (Morocco) ja Q720077 (Imperial cities). Niiden raakafaktat eivät kaikki ole kelvollisia julkaistaviksi; erityisesti P571 ja medinan koordinaatti sisältävät ongelmia (8).

### 1873

Rabat **oli olemassa** isoisän matkavuonna 1873. Sen kasbah ja ulompi almohadimuuri ovat keskiaikaisia, Andalusialainen muuri on 1600-luvulta, Moulay Slimanen moskeija 1800-luvun alusta ja Dar al-Makhzenin rakentaminen oli alkanut jo 1700-luvulla (R1 History / 'Alawi rule; R3 History; R5 History; R7 Background; R9). Nämä ovat lähteiden ajoituksista tehtyjä ajallisia päätelmiä, eivät lähteessä kuvattuja tapahtumia juuri vuodelta 1873.

Rabat ei ollut vielä nykyisen kaltainen hallinnollinen pääkaupunki: nykyinen uusi kaupunginosa suunniteltiin Ranskan protektoraatin aikana vasta 1900-luvulla (R1 French colonial rule; R14 kuvaus). Kasbahin nykyistä Andalusialaista puutarhaa tai paviljongin museokäyttöä ei vielä ollut; puutarha ja museo ovat 1900-luvun alun hankkeita (R3 Pavilion / Andalusian Garden). Chellahin marinidien rauniot olivat jo paikalla; nyt avoimena näkyvää roomalaista korttelia ei saa kuvata samanlaiseksi vuonna 1873, sillä sitä kaivettiin näkyviin myöhemmin (R6 Post-Marinid period). Nykyinen raitiotie kuuluu 2000-luvulle (R12).

Ei isoisän tekemisiä, reittiä, havaintoja, päiväkirjamerkintöjä eikä hänen sanomakseen tehtyjä lainauksia.

## 1. Perusfaktat

- **Nimi:** Rabat; arabiaksi الرباط (Ar-Ribāṭ), pelin konteksti. R1 Etymology johtaa nimen arabian sanaan `ribāṭ`, linnoitettu tukikohta, ja pidempään nimeen Ribāṭ al-Fatḥ. Käyttökelpoinen suomennos on ”linnoitettu tukikohta”; ”voiton linnoitus” koskee pidempää nimeä, ei yksin Rabat-sanaa.
- **Asema:** Marokon pääkaupunki (R1 johdanto; WD1 P1376/Q1028). Ei nykypoliittisia henkilöitä tai vaaleja.
- **Sijainti:** Marokon Atlantin rannikolla, Bou Regreg -joen suulla. Rabat on etelärannalla, Salé vastapäätä pohjoisrannalla (R1 johdanto; R10 johdanto ja Physical characteristics; WD1 P206/Q894940 sekä Q97).
- **Synty:** nykykaupungin kasbah ja almohadien laaja kaupunkihanke muotoutuivat 1100-luvulla (R1 Medieval Islamic period; R3 History; R14 kuvaus). Muinaisen Salan/Chellahin historia on tätä vanhempi; sitä ei sekoiteta samaan perustamisvuoteen.
- **Asukkaat:** lähteen laajuus on **Rabatin prefektuuri**, ei Rabat–Salén taajama eikä metropolialue. Kontekstin HCP:n vuoden 2024 väestölaskennan hyväksytty lähtöluku on 515 619; sama luku näkyy WD1:n vuoden 2024 suositussa P1082-väitteessä. WD1:n viite ja konteksti voivat nojata samaan HCP-lähteeseen, joten tämä ei vielä ole kaksi riippumatonta lähdettä. **Pelaajatekstiin ”noin puoli miljoonaa asukasta Rabatin prefektuurissa (2024)” tai väkiluku pois**, ei tarkkaa numeroa. Taajaman/metropolin lukuja ei oteta R1:stä.
- **Pallo:** konteksti.json sellaisenaan: lat 34.0211, lon −6.8414. Tämä ei määritä kohdekartan keskusta.
- **Wikiavain:** `Rabat`, konteksti ja WD1 fiwiki/enwiki-sitelinkit.
- **Äänimaisemaehdotus:** `basaari`, pilviohjeen Pohjois-Afrikan ohje. Ei faktaväite kaupungin ainoasta äänimaisemasta.

## 2. Kansi: johdanto ja neljä nostoaihetta

**Johdantoehdotus:** Rabatissa Atlantti kohtaa joen ja keskiaikaiset muurit elävän asuinalueen. Joen vastarannalla on Salé, joten kaupungin tarinaa kannattaa lukea molemmilta rannoilta. (R1 johdanto; R3 Current status; R10.)

Artikkeli-introon sopivat perusfaktat ovat pääkaupunkiasema, Atlantti ja Bou Regreg, 1100-luvun kasbah, medinan myöhempi asuttaminen, Chellahin antiikin ja marinidien kerrokset, vanhan kaupungin rinnalle rakennettu uusi kaupunginosa sekä nykyinen raitiotie. Kirjoittaja tekee niistä ohjeen mittaisen 7–10 virkkeen tekstin; ei tarkkoja perustamisvuosia.

### K1 — Linnoituksen kujilla asutaan yhä

Wiki: `Kasbah of the Udayas`. Lähde R3, johdanto, Major structures, Current status; R1 Historic monuments.

1. Kasbah on linnoitettu kaupunginosa kukkulalla Bou Regreg -joen suulla.
2. Se on Rabatin medinan vieressä ja Salé näkyy joen toisella puolella.
3. Nykyään kasbah on ennen kaikkea asuinalue, ei pelkkä museoalue.
4. Asuintalojen ulkopinnat tunnetaan valkoisesta ja sinisestä maalauksesta.
5. Pohjoisosan pääkatu Rue Jamaa kulkee suuren portin ja jokinäkymään avautuvan merkinantoalustan välillä.
6. Katu kulkee vanhan moskeijan ohi.
7. Kasbahin pohjoisosa liittyy almohadien keskiaikaiseen linnoitukseen; eteläosan laajennukset ovat myöhempiä.

**Kulma:** nähtävyytenä pidetty paikka on samalla ihmisten koti. Ei värien selitystä (hyönteiset, viilennys, uskonnollinen symboliikka): lähde ei tue niitä.

### K2 — Salé vanha, Salé uusi

Wiki: `Rabat`. Lähde R1, Corsair republic ja 'Alawi rule; R3 History; R10 johdanto.

1. Rabat ja Salé sijaitsevat Bou Regreg -joen vastakkaisilla rannoilla.
2. 1600-luvulla nykyisen Rabatin puoli tunnettiin nimellä ”New Salé”, pohjoisrannan kaupunki ”Old Salé”.
3. Espanjasta karkotetut morisko- ja andalusialaistaustaiset pakolaiset asettuivat etelärannan kasbahiin ja sen alapuolelle.
4. Etelärannan asuttu alue kasvoi; sitä rajattiin uudella Andalusialaisella muurilla.
5. Nykyinen Rue des Consuls oli tärkeä liikenneväylä jo tuolloin.
6. Näiden yhteisöjen historia näkyy nykyisen medinan rakenteessa; ei väitetä heidän rakentaneen kaikkia nykyisiä taloja.

**Kulma:** joki erottaa kaupungit, mutta nimet paljastavat yhteisen historian. Merirosvot vain neutraalina taustana, jos tarpeen; ei orjakauppakuvausta eikä hurjistelua.

### K3 — Sulttaanin paviljongista korumuseoksi

Wiki: `Kasbah of the Udayas`. Lähde R3, Pavilion of Moulay Ismail (National Jewellery Museum); R1 Museums and parks. Tuoreempi museokohtainen R3-teksti voittaa R1:n vanhentuneen remonttitilan.

1. Kasbahin eteläosassa on Moulay Ismailin 1600-luvun lopulla rakennuttama paviljonki/palatsiasunto.
2. Sen keskellä on sisäpiha; ulkoasua luonnehtii torni.
3. Rakennusta käytettiin myös madrasana eli uskonnollisena oppilaitoksena.
4. Rakennus muutettiin museoksi 1900-luvun alkupuolella.
5. Varhaisia kokoelmia kartutettiin yksityisillä lahjoituksilla.
6. Kokoelmissa on ollut koruja, soittimia, keramiikkaa, käsikirjoituksia, asuja ja mattoja eri puolilta Marokkoa.
7. Myöhemmin museon painopisteeksi tuli marokkolaisen koru- ja pukeutumisperinnön historia.
8. R3:n nykyinen teksti kertoo museon avautuneen uudelleen remontin jälkeen; R1:n väite remontista ei ole nykytilan kuvaus.

**Kulma:** rakennuksen käyttö muuttui, vanha sisäpiha säilyi. Kuvaksi vanha paviljonki, ei tunnistamatonta nykytaidetta tai tekijänoikeudeltaan varmistamatonta näyttelyesinettä. Ei täsmällisiä avajaisvuosia.

### K4 — Raitiovaunu vie joen yli

Wiki: `Rabat–Salé tramway`. Lähde R12 johdanto ja Network; R1 Transportation.

1. Nykyinen raitiotiejärjestelmä palvelee Rabatin ja Salén muodostamaa kaupunkialuetta.
2. Se kulkee Bou Regreg -joen yli.
3. Vaunuilla pääsee myös Rabat-Villen aseman läheltä.
4. Järjestelmässä käytetään moderneja nivellettyjä Alstom Citadis -raitiovaunuja.
5. Nykyinen verkko aloitti liikennöinnin 2000-luvulla; älä käytä tarkkaa aloituspäivää ilman riippumatonta vahvistusta.
6. Rabatissa oli myös varhaisempi raitiotie 1900-luvun alkupuolella, mutta nykyjärjestelmää ei saa kuvata saman linjan katkeamattomaksi jatkoksi.

**Kulma:** käytännön yhteys vastarannan kaupunkiin. Ei linjojen tai pysäkkien lukumäärää, vuoroväliä, lippuhintaa tai vanhentuneita laajennusennusteita. Kuvan pääaihe vaunu, ei modernin sillan suojattu arkkitehtuuri.

## 3. Teemasivu

Vakioaihe `historia`, nimi **”Kaupunki muurien sisällä”**.

**Johdantoehdotus:** Rabatin muurit ovat eri ajoilta ja eri tarkoituksiin tehtyjä. Portti saattoi sekä pysäyttää kulkijan että näyttää hallitsijan voiman. (R5 Architecture; R7 Background; R4 Architecture.)

### H1 — Portti, jonka läpi ei pääse suoraan

Wiki `Bab er-Rouah`. R5 History / Architecture; R15.

1. Bab er-Rouah on almohadien kaupunginmuurin monumentaalinen portti.
2. Se rakennettiin Ya'qub al-Mansurin laajan pääkaupunkihankkeen osaksi 1100-luvun lopulla.
3. Sen ulompaa sisäänkäyntiä reunustavat puolustustornit.
4. Sisäreitti kulkee peräkkäisten kammioiden kautta ja tekee useita suorakulmaisia mutkia; vältä kammioiden täsmällistä lukumäärää.
5. Lähde kuvaa tällaista mutkittelevaa sisäänkäyntiä almohadien sotilasarkkitehtuurille tyypilliseksi.
6. Portin ulkosivua koristavat kiveen veistetyt kaarikuviot, kasviaiheiset arabeskit ja suorakulmainen kehys.
7. Bab er-Rouah tarkoittaa ”Tuulten porttia”. Nimen yhteyttä merituuleen R5 pitää todennäköisenä, ei varmana.
8. Portin vanhoissa sisätiloissa toimii nykyään taidegalleria (R5; R15). Kuvissa ei nykyisiä näyttelyteoksia.

### H2 — Muuri vanhemman muurin sisällä

Wiki `Andalusian wall of Rabat`. R7 Background / Gates; R1 Corsair republic.

1. Andalusialainen muuri rakennettiin 1600-luvun alkupuolella.
2. Se rajoittaa nykyisen medinan eteläreunaa.
3. Sen rajaama asutus syntyi almohadien aiemmin suunnitteleman laajemman kaupunkialueen sisään.
4. Sinne asettui moriskopakolaisia Espanjasta.
5. Vanhemman laajan almohadialueen kaikki osat eivät olleet aiemmin tiheästi asuttuja; siellä oli myös avoimia alueita.
6. Muurissa on portteja, joista Bab Chellah on muita monumentaalisempi.
7. Bab Chellahin nykyinen muoto on 1800-luvun alun uudelleenrakennuksesta; täsmällistä vuotta ei käytetä.
8. Bab Mellah liittyy vanhaan juutalaiskortteliin. Bab Teben/Bab Jdid on osittain purettu; vanhat kuvat eivät kerro sellaisenaan nykytilaa.

### H3 — Kaksi kaupunkia samassa rauniossa

Wiki `Chellah`. R6 johdanto, Roman Sala Colonia, Marinid period, The Roman remains.

1. Chellahissa ovat sekä antiikin Salan että myöhemmän marinidien uskonnollisen ja hautausmaakompleksin jäännökset.
2. Roomalaiset rakensivat siellä vanhempien mauretanialaisten rakenteiden päälle.
3. Antiikin kaupungissa oli pääkatuja, forum ja julkisia rakennuksia.
4. Kaupunki rakennettiin rinteeseen keinotekoisille tasanteille.
5. Marinidit ottivat alueen käyttöön dynastiansa hautausmaana keskiajan lopulla.
6. He rakensivat alueelle omat muurinsa, moskeijan ja uskonnollisen oppilaitoksen.
7. Marinidien aitaus on pienempi kuin sitä edeltänyt roomalainen kaupunki.
8. Roomalaiskorttelin nykyinen näkyvyys on myöhempien arkeologisten kaivausten tulosta, ei samanlainen näkymä vuodelta 1873.

### H4 — Minareetti, jonka huipulla pesitään

Wiki `Chellah`. R6 Post-Marinid period and modern era / The Marinid necropolis.

1. Chellahissa elää haikarayhdyskunta.
2. Linnut pesivät puissa ja raunioituneen zawiyan minareetissa.
3. Näkyvä minareetti liittyy marinidien oppilaitos-/zawiyakompleksiin, ei Hassan-torniin.
4. Minareetin pohja on neliömäinen.
5. Sen pintoja koristavat sebka-verkkomaiset kuviot ja vanha zellij-laatoitus.
6. Alue on sekä arkeologinen kohde että puutarhamainen käyntipaikka.
7. Lähde ei anna luvan perustella linnun valintaa ”suojalla” tai ”hyvällä tähystysasemalla”: näitä syitä ei lisätä.

**Minitehtävä:** kumpi Chellahin rakennelma toimii haikaroiden pesäpaikkana, minareetti vai maanalainen kylpylä? Oikea: minareetti. Vaihtoehdot lopulliseen neljän vaihtoehdon tehtävään: minareetti / kylpylän allas / roomalainen forum / hautakammion sisätila. Vastaus löytyy H4:stä; kaupungin viisaan ei laiteta samaa asiaa.

## 4. Opas: nykytieto

### Jakso 1 — Perille ja liikkeelle

- Lentoasema **Rabat–Salé Airport (RBA)** on Salén puolella ja palvelee myös Rabatia (R11 johdanto/infolaatikko). Ei tarkkaa etäisyyttä tai lentoyhtiölistaa.
- Kaupungin rautatieliikenne kuuluu ONCF-verkkoon. Rabat-Ville ja Rabat-Agdal ovat kaupunkia palvelevia asemia (R1 Transportation). Ei väitetä niitä ainoiksi asemiksi; pääartikkelissa on uusi Rabat Riad -asema.
- Raitiovaunu yhdistää Rabatin ja Salén ja kulkee Rabat-Villen läheltä (R12 Network).
- Rautatieasema tai moderni silta ei ole lehden kohdekartan arkkitehtuurikohde.

### Jakso 2 — Vanhakaupunki ja kasbah

- Medinassa on vanhoja asuinkatuja, moskeijoita ja portteja; kasbah on erillinen linnoitettu asuinalue kukkulalla (R1 Historic monuments; R3).
- Kasbahin Rue Jamaa yhdistää portin ja jokinäkymän merkinantopaikan (R3 Major structures).
- Kasbahin asuintaloja katsellaan kunnioittavasti ulkopuolelta; ”asuinalue” perustuu R3 Current status -osioon.
- UM:n tiedote kertoo ei-islamilaisten pääsystä moskeijoihin olevan rajoituksia (R16 Maan lait ja käytännöt). **Oppaassa älä lupaa pääsyä Rabatin moskeijoiden sisään**. Rehellinen neuvo: moskeijoiden arkkitehtuuria voi tarkastella ulkoa.

### Jakso 3 — Chellah ja joen suu

- Chellah on muurein rajattu raunioalue kaupungin historiallisen ytimen eteläpuolella (R6; R1 Historic monuments).
- Siellä näkyy antiikin ja marinidien eri kerroksia; haikarapesiä voi olla puissa ja minareetissa (R6). Lintujen näkemistä ei luvata jokaisella käynnillä.
- Kasbahista näkyvät Bou Regreg, Salé ja Atlantti (R3 Current status).
- Rantojen uintiolosuhteita ei päätellä kuvasta tai jokisivusta. UM varoittaa merivirroista ja neuvoo pitäytymään merkityillä uimarannoilla (R16 Luonnonolot).

### Jakso 4 — Leipä ja minttutee

- Yleinen marokkolainen ruokatausta, **ei väite Rabatin yksinoikeudesta** (R13 Ingredients, Structure of meals, Main dishes, Drinks).
- Leipä eli khobz kuuluu päivittäiseen ateriaan, ja leipomoita on maan kaupungeissa.
- Ateriassa voi olla lämpimiä ja kylmiä salaatteja sekä tagine-pataa.
- Couscousin kanssa käytetään lihaa ja vihanneksia.
- Minttutee on tavallinen seurustelujuoma; sitä tarjotaan pienistä laseista ja se makeutetaan usein sokerilla.
- Älä nimeä Rabatin erityisruokaa ilman kaupungin omaa lähdettä. Ei maalehden arganöljy-, pastilla-, ras el hanout- tai harira-tarinoiden uusintaa.

### Jakso 5 — Milloin kannattaa tulla

**Säätausta valmistunut 11.10.2026.** Pääsessio teki alkuperäisellä `tyokalu.mjs saa` -komennolla kaupungin `saa.json`:n käyttäen omistajan hyväksymää, robots-sallittuun Wikipedia-lähdesivuun sovitettua verkkohakua. Alkuperäisen työkalun taulukonlukutapa ja aineisto säilyivät; A ei muuttanut säädataa eikä kopioinut taulukkoa käsin.

- Artikkeli **Rabat**, englanti, Wikipedia-revisio **1379365345**, luettu **11.10.2026**.
- Taulukko **Climate data for Rabat (Rabat–Salé Airport) 1991–2020, extremes 1943–present**. Mittauspaikka on taulukon nimeämä Rabat–Salén lentoasema. Tiedoston lat/lon ovat työkalun kaupungille tallentamat koordinaatit; niitä ei esitetä erikseen varmennettuina lentoaseman mittauspisteen koordinaatteina.
- Normaalikausi **1991–2020**. Otsikon äärilämpötilakausi **1943–present**, lähderivin auringonpaistekausi **1961–1990** ja kosteuden kausi **1973–1993** eivät ole tämän normaalirivin kausi.
- `lahde.nimi`: **en-Wikipedia, ilmastotaulukko**. Taulukon lähderivi: **Source 1: NOAA (sun 1961–1990) | Source 2: Deutscher Wetterdienst (humidity 1973–1993, record highs and lows), Meteo Climat (record highs and lows) Infoclimat**.
- Menetelmä: `keskilampo` on taulukon **Daily mean °C (°F)** -rivi. Se ei ole `(ylin + alin) / 2` -arvio. `sade` on **Average precipitation mm (inches)** -rivi; `ylin` ja `alin` ovat työkalun kyseisestä normaalitaulukosta tuottamat kuukausirivit. Tiedoston tausta ilmoittaa vuosisateeksi **523 mm**. A ei laskenut toista normaalisarjaa.
- Pelin `saatiedot` saa `saa.json`:n kentät ilman `tausta`-kenttää. Tämä tekstiosio säilyttää jäljitettävän taustan. Kaikki ilmastoluvut oppaassa, nostoissa, tiedoissa ja kuvateksteissä tulevat **vain tästä tiedostosta**, kohtuullisesti pyöristettyinä. Otsikon extrema- tai sunshine/humidity-rivejä ei käytetä näiden lukujen korvikkeena; ei ennusteita eikä havaintopäivän säätä. Leipätekstiin ei lähteen mainintaa ilmastolauseessa.
- Luvuista tuettu kausikuvaus: **kesä on kuiva, sateet painottuvat myöhäissyksyyn ja talveen; heinä–elokuun päivän ylimpien normaalit ovat noin 27–28 astetta ja tammikuun yön alin noin 7 astetta**. Nämä ovat tiedoston kuukausiriveistä, eivät satunnaisen vuoden havaintoja. Vältä väitettä ”paras matkakuukausi”, jos sen muita ehtoja ei ole perusteltu.

Oppaan käytännön huomiona voi lisäksi mainita UM:n kehotuksen seurata paikallisia sää- ja viranomaisohjeita (R16 Luonnonolot). Se ei korvaa sääasemadataa.

### Parasta (5)

1. **Udayan kasbah (3 tähteä):** vanhat muurit, elävä asuinalue ja jokinäkymä samassa kaupunginosassa (R3).
2. **Chellah (3):** antiikin Salan ja marinidien yhteinen raunioalue (R6).
3. **Bab er-Rouah (2):** kiveen veistetty portti ja mutkitteleva vanha sisäänkäynti (R5).
4. **Medina ja Andalusialainen muuri (2):** vanhakaupunki rajautuu muuriin vanhemman kaupunginmuurin sisällä (R7).
5. **Bou Regreg -joen suu (2):** kasbahista avautuva näkymä Salén puolelle ja Atlantille (R3; R10).

Tähdet ovat toimituksellinen suositus, eivät lähteen ranking tai kävijäluvut.

### Hyvä tietää (4)

1. **Asuintalo ei ole näyttely:** kasbah on asuinalue; anna asukkaiden arjelle tilaa (R3 Current status; neuvo toimituksellinen).
2. **Moskeijoita katsotaan ulkoa:** älä lupaa sisäänpääsyä Rabatin rukoustiloihin (R16).
3. **Liikenteessä tarkkana:** UM:n matkustustiedote painottaa erityisesti jalankulkijan varovaisuutta liikenteessä (R16 Liikenne).
4. **Ranta ei tarkoita uimapaikkaa:** uimista suositellaan merkityillä uimarannoilla, sillä merivirrat ja aallot voivat olla vaarallisia (R16 Luonnonolot).

**Turvallisuus:** Marokon UM-taso 9.10.2026 on ”Noudata tavanomaista varovaisuutta”. Ei Rabatin matkailun yleiskieltoa tai väitettä poikkeuksellisesta vaarallisuudesta. Oppaaseen riittävät yllä olevat käytännön huomiot. Ei nykyrikollisuutta tai poliittisia aiheita.

## 5. Kohdekartta: seitsemän kohdetta

Historiallisesta ytimestä Chellahiin ja jokisuuhun. Hallinnollinen pallo-piste ei ole kartan keskus. Bou Regreg on tyypiltään `luonto`, muissa oletus rakennus/paikka. Jokipiste edustaa joen suistoaluetta, ei sisäänkäyntiä tai uimarantaa. Taideteoksia, esineitä eikä henkilöitä karttakohteiksi.

| # | Nimi täsmälleen | Tyyppi | lat | lon | Koordinaattilähde | Aika |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Udayan kasbah | rakennus | 34.03056 | -6.83556 | WD2 P625, yhtyy R3:n koordinaattiin | 1100-luku, myöhemmät laajennukset |
| 2 | Bou Regreg -joen suisto | luonto | 34.03190 | -6.83083 | WD4 P625, yhtyy R10:n koordinaattiin | luontokohde |
| 3 | Andalusialainen muuri | rakennus | 34.02414 | -6.83311 | R7 sivun koordinaattirivi | 1600-luku |
| 4 | Moulay Slimanen moskeija | rakennus | 34.02344 | -6.83733 | R9 sivun koordinaattirivi | 1800-luvun alku |
| 5 | Bab er-Rouah -portti | rakennus | 34.01281 | -6.83764 | R5 sivun koordinaattirivi | 1100-luvun loppu |
| 6 | Chellahin raunioalue | rakennus | 34.00667 | -6.82028 | WD3 P625, yhtyy R6:n koordinaattiin | antiikki ja keskiaika |
| 7 | Borj Sidi Makhlouf -linnake | rakennus | 34.02656 | -6.82621 | WD5 P625 | 1600–1700-lukujen vaiheita |

**Ehdotettu rajaus:** pohjoinen 34.03460, etelä 34.00397, länsi −6.84089, itä −6.81703. Johdettu kohteiden minimi-/maksimikoordinaateista ja noin 300 metrin marginaalista (ei lähteen ilmoittama kaupunkiraja). Lähin pari on laskennallisesti Andalusialainen muuri–Moulay Slimanen moskeija, noin 400 metriä, joten erilliset kohteet eivät pinoudu samaan pisteeseen. Laskettu haversinella lähdekoordinaateista; ei matkaoppaaseen kulkumatkana.

**Esittelyehdotus:** Rabatin vanhassa ytimessä kuljetaan kasbahin, myöhempien muurien ja joen rannan välillä. Chellahissa antiikin kaupunki ja keskiajan hautausmaa ovat saman aitauksen sisällä. (R3; R6; R7; R10.)

### 1 — Udayan kasbah

R3 johdanto, History, Major structures, Current status; WD2 P625.

1. Kukkulalla Bou Regreg -joen suulla sijaitseva kasbah eli linnoitettu kaupunginosa.
2. Viereinen medina ja vastarannan Salé ovat erillisiä alueita, joita ei nimetä samaksi kasbahiksi.
3. Almohadit rakensivat kasbahin 1100-luvulla aiempien tukikohtien paikalle.
4. Varhaisempien ribātien tarkka sijainti ei kaikilta osin ole varma; älä sano kaikkia samalla paikalla varmasti olleiksi.
5. Abd al-Mu'minin hanke sisälsi palatsin ja moskeijan sekä vesilähteen suunnasta tuodun maanalaisen kanavan (syy-yhteys asuttamisen mahdollistamiseen sanotaan R3:ssa).
6. Kasbahin suuri portti on Ya'qub al-Mansurin myöhäisemmästä hankkeesta; sitä ei kartoiteta erillisenä lähekkäisenä pisteenä.
7. Eteläosaan tuli myöhempinä vuosisatoina Moulay Ismailin paviljonki.
8. Nykyinen kasbah on sinivalkoisine taloineen asuttu kaupunginosa.
9. **1873:** kasbah, vanha portti ja paviljonki olivat jo olemassa; nykyinen puutarha ja museokäyttö tulivat myöhemmin. Ei nykyvärejä varmasti vuoteen 1873.

### 2 — Bou Regreg -joen suisto

R10 johdanto / Physical characteristics / History; R3 Current status; WD4 P625 ja P403.

1. Bou Regreg on läntisen Marokon joki.
2. Joki laskee Atlantin valtamereen Rabatin ja Salén välissä.
3. Rabat on suiston eteläpuolella ja Salé pohjoispuolella.
4. Suistoa kutsutaan myös nimellä Wadi Sala.
5. Vuorovesi vaikuttaa joen suistoalueeseen; R10 mainitsee suolaveden tunkeutumisen jokiveteen.
6. Joen latvat ovat Keski-Atlaksella. Ei korkeutta, kokonaispituutta tai suiston pituutta.
7. Chellahin muinaisen kaupungin sijainti liittyi Bou Regregin rantaan ja satamaan; R10:n väite foinikialaisasutuksesta on liian varma suhteessa R6:een, joten sitä ei käytetä.
8. Kasbahista avautuu näkymä joelle, Saléen ja Atlantille (R3).
9. **1873:** joki ja historialliset vastarannan kaupungit olivat olemassa; älä sijoita nykyistä siltaa, marina-alueita tai raitiovaunua siihen maisemaan.

### 3 — Andalusialainen muuri

R7 Background / Gates / Bastions; R1 Corsair republic; koordinaatti R7.

1. Muuri rajaa medinan eteläreunaa, ei kaikkia Rabatin kaupunginosia.
2. Se on 1600-luvun alkupuolelta.
3. Se sijoitettiin laajemman keskiaikaisen almohadikaupungin sisään.
4. Muurin sisälle asettui Espanjasta karkotettuja moriskoja.
5. Muuri kertoo asutuksen myöhemmästä keskittymisestä vanhan suuren kaupunkihankkeen yhteen osaan.
6. Bab Chellah on muurin monumentaalisempi portti ja nykyasultaan 1800-luvun alun uudelleenrakennuksesta.
7. Bab Mellah johti vanhaan juutalaiskortteliin.
8. Bab Teben/Bab Jdid on säilynyt vain osittain; Bab Diouana on muutettu moskeijan sisäänkäynniksi.
9. **1873:** muuri ja Bab Chellahin 1800-luvun alkuun ajoittuva asu olivat jo olemassa. Muuri ei ole ”isoisän aikaan vielä rakentamaton”.

### 4 — Moulay Slimanen moskeija

R9 koko lyhyt artikkeli ja koordinaatti; R1 'Alawi rule.

1. Moskeija sijaitsee Rabatin medinassa, Andalusialaisen muurin pohjoispuolella.
2. Se on 1800-luvun alkupuolella sulttaani Moulay Slimanen rakennuttama.
3. Nimi tulee rakennuttajasta.
4. Paikka on Souika Streetin ja Sidi Fateh Streetin risteyksessä.
5. Lähellä on Bab Bouiba -portti.
6. Sisällä on perinteinen avoin piha, sahn.
7. Rukoussalissa on pylväiden/kaarien jakama hypostyylihalli.
8. Moskeijaan kuuluu minareetti. Sen tarkkaa korkeutta tai moskeijan pinta-alaa ei käytetä.
9. **1873:** rakennus oli jo olemassa. Oppaassa käsitellään ulkoarkkitehtuurina, ei luvata sisäkäyntiä (R16).

Ei ”medinan toiseksi suurin” -superlatiivia: se olisi oppaan kannalta tarpeeton ja lähteen mitoille ei ole riippumatonta vahvistusta.

### 5 — Bab er-Rouah -portti

R5 History / Architecture; R15; koordinaatti R5.

1. Kaupungin almohadiaikaisen muurin portti 1100-luvun lopulta.
2. Kuului Ya'qub al-Mansurin pääkaupunkihankkeeseen.
3. Arabialainen nimi merkitsee ”Tuulten porttia”; merituuliyhteys vain lähteen todennäköisenä selityksenä.
4. Puolustustornit reunustavat ulompaa julkisivua.
5. Sisäänkäynti kulkee mutkittelevan kammioreitin läpi.
6. Alkuperäistä sisäänkäyntikaarta pienennettiin myöhemmällä kivimuurauksella 1700-luvulla.
7. Kiveen veistetyt moniliuskaiset kaariaiheet, kasviaiheet ja suorakulmainen alfiz-kehys kuuluvat ulkojulkisivuun.
8. Sisempi julkisivu on ulompaa pelkistetympi.
9. Nykyinen käyttö on taidegalleria vanhan portin tiloissa; ei nykyisten näyttelyteosten kuvia.
10. **1873:** portti ja sen 1700-luvulla pienennetty kulkuaukko olivat jo olemassa. Nykyistä galleriatoimintaa ei siirretä siihen vuoteen.

### 6 — Chellahin raunioalue

R6 History / The Roman remains / The Marinid necropolis; WD3 P625.

1. Muurein rajattu raunioalue Bou Regregin eteläpuolella.
2. Roomalainen Sala Colonia rakennettiin aiempien mauretanialaisten rakenteiden päälle.
3. Roomalaisessa kaupungissa oli forum, pääkatuja, temppeleitä, kylpylä ja riemukaaren jäännökset.
4. Kaupungin rinteen rakentamisessa käytettiin keinotekoisia tasanteita.
5. Marinidien hallitsijasuku otti alueen käyttöön hautausmaana keskiajan lopulla.
6. Keskiaikaisessa uskonnollisessa kompleksissa oli moskeija, hautakammioita ja oppilaitos-/zawiyarakennus.
7. Keskiaikainen aitaus on muinaista roomalaiskaupunkia pienempi.
8. Alueen vanhoja rakenteita vaurioittivat myöhemmät maanjäristykset ja ryöstely; ei lisätä joka raunion oletettua yksittäistä tuhoutumissyytä.
9. Haikaroita pesii puissa ja säilyneessä minareetissa.
10. **1873:** marinidien rauniot olivat paikalla, mutta roomalaiskorttelin nykyinen avoin näkymä syntyi myöhemmistä kaivauksista. Siksi juttu erottaa vanhan raunioalueen nykyisestä kaivauskohteesta.

### 7 — Borj Sidi Makhlouf -linnake

R8 johdanto ja infolaatikko; R7 Bastions; WD5 P625 ja P31.

1. Rabatin Bou Regreg -joen puoleinen linnake/bastioni.
2. Se sijaitsee medinan itäreunassa, Andalusialaisen muurin jokipäässä.
3. R7 sanoo sen rakennetun suojaamaan läheistä satamaa; tämä tarkoitus ei ole oma päätelmä.
4. Rakenteella on pyöristetty profiili; ei kirjoiteta koko Rabatin ”ainoaksi” pyöreäksi linnakkeeksi.
5. Nimi viittaa paikalliseen Sidi Makhloufiin, jonka hauta on linnakkeen yhteydessä; R7 luonnehtii häntä juutalaistaustaiseksi paikalliseksi maraboutiksi.
6. R8 ajoittaa ensimmäisen linnakkeen 1600-luvulle; R7:n nykyisen vaiheen ajoitus viittaa 1700-lukuun. **Käytetään ”1600–1700-lukujen vaiheita”, ei yksittäistä perustamisvuotta.**
7. R8 mainitsee varhaisen vaurioitumisen ja muodon säilymisen; tarkkaa pommitusvuotta ei julkaista ilman riippumatonta vahvistusta.
8. **1873:** kummankin lähteen ajoitus sijoittaa linnakkeen ennen matkavuotta. Nykyisten ympäröivien teiden, hotellien tai muiden uusien rakennusten historiaa ei lisätä.

## 6. Viisi kysymysaihetta ja kolme tietoa

Kysymykset ovat aiheita, eivät vielä lopulliset nelivaihtoehtoiset JSON-oliot. Kaikkien vastaus esitellään lehtitekstissä; minitehtävän haikara-asiaa ei toisteta visassa.

| Taso | Kysymysaihe | Oikea vastaus | Lähde |
| --- | --- | --- | --- |
| 1 | Minkä valtameren rannalla Rabat on? | Atlantin | R1 johdanto; R10 Pääteksti; WD1 P206 |
| 1 | Mikä joki virtaa Rabatin ja Salén välissä? | Bou Regreg | R10 johdanto; R1 johdanto |
| 2 | Mikä Udayan kasbah on nykyään? | Asuttu linnoitettu kaupunginosa | R3 Current status |
| 2 | Mihin Rabatin ja Salén raitiovaunu liittyy kaupungin maantieteessä? | Se yhdistää joen vastarannat | R12 Network |
| 3 | Mikä muinainen kaupunki oli Chellahin paikalla ennen marinidien hautausmaata? | Sala Colonia | R6 Roman Sala Colonia / Marinid period |

Oikea vastaus ei ole toisen **pelikaupungin** nimi: tässä muinainen Sala Colonia on arkeologinen kaupunki, ei nykyinen Salé eikä pelin kaupunkirivi. Väärien vaihtoehtojen tulee olla samanmittaisia; ei tarkkoja vuosikysymyksiä.

Kolme tiesitkö-ehdotusta, nuoren matkaajan havaintoina ilman isoisää:

1. Kasbahin sinivalkoisilla kujilla ihmiset myös asuvat: vanha linnoitus on yhä kaupunginosa. (R3 Current status.)
2. Chellahin alla ja sisällä on kaksi eri kerrosta: antiikin Sala ja marinidien hautausmaa. (R6.)
3. Rabatissa on muuri muurin sisällä: Andalusialainen muuri rajaa medinan vanhemman almohadikaupungin alueelta. (R7 Background; R1 Corsair republic.)

## 7. Kuvatarpeet vaiheelle B

**#74 ja omistajan raja:** kaupallisen käytön panorama-vapaus tarkistetaan kuvausmaan ja teostyypin mukaan. Uusia suojattuja rakennuksia/teoksia ei tehdä kohteiksi. Pelkkä kuvan CC-lisenssi ei ratkaise kuvatun teoksen oikeuksia. Tässä vanhoiksi ehdotetut kohteet eivät vielä ole lisenssiltään hyväksyttyjä kuvia. B tarkistaa tarkan tiedoston, resoluution, lisenssin ja tekijän sekä katsoo kuvan. Modernia lisäystä ei saa valita vanhan kohteen nimellä. Ei luettavia lähikasvoja, vesileimoja, lisämerkintöjä tai pakkauksia.

| Kohta | Aiheet ja hakusanat/kategoria | Rajaus |
| --- | --- | --- |
| Kansi 1 | Kasbah of the Udayas, River Bou Regreg | Laaja linnoitus ja jokisuu ympäristöineen; ei portin yksityiskohta. |
| Kansi 2 | Medina of Rabat | Laaja vanhan kaupunginosan/kattojen yleiskuva; ei modernia suojattua rakennusta pääaiheeksi. |
| Kansi 3 | Chellah panorama / Roman ruins Chellah | Laaja raunioalue, jossa rakennelmat eivät ole tunnistamatonta modernia taidetta. |
| K1 | Kasbah of the Udayas street / white blue | Sinivalkoinen asuinkuja. Ei sama tiedosto kuin kansi tai opas. |
| K2 | Salé medina river / Bou Regreg opposite bank | Salén vanha ranta Rabatin puolelta; rajaa moderni teatteri ja silta pois päämotiivista. |
| K3 | Moulay Ismail pavilion / Oudayas Museum courtyard | Historiallinen paviljonki tai sisäpiha, ei suojattua nykyistä näyttelyesinettä. |
| K4 | Tramway Rabat-Salé | Raitiovaunu liikenteessä; pääaihe vaunu, ei modernin sillan arkkitehtuuri. |
| H1 | Bab Rouah / Bab er-Rouah facade | Vanhan portin julkisivu; gallerian nykyteokset eivät kuvassa. |
| H2 | Andalusian wall of Rabat / Bab Chellah | Näkyvä muuri, mieluiten erottaa sen medinan reunaksi; modernit mainokset eivät pääaihe. |
| H3 | Chellah Roman ruins forum | Roomalainen kerros, ei väärän kohteen minareetti-kuva selitteellä forumista. |
| H4 | Chellah storks minaret | Haikara tai pesä ja oikea Chellahin minareetti näkyvät; pelkkä kasvin/torniyksityiskohdan kuva ei käy. |
| Matkailijalle | Kasbah of the Udayas street | Tuore maltillinen pysty, w/h 0,60–0,85. |
| Opas 1 | Rabat Salé tram vehicle | Tuore, eri tiedosto kuin K4. Jos ei löydy, jakso voi olla kuvaton. |
| Opas 2 | Medina Rabat street / Souika | Tuore asuinkatu/markkinakatu, ei lähikasvoja tai suojattua modernia taidetta. |
| Opas 3 | Chellah ruins / Bou Regreg river | Tuore näkymä raunioihin tai luonnolliseen rantaan; eri tiedosto kuin muualla. |
| Opas 4 | Moroccan mint tea / khobz bread | Ei tunnistettavaa pakkausta, mainosta, selvästi luettavia kasvoja tai maalehden toistettua ruokatarinaa. |
| Opas 5 | Sää | Voi olla kuvaton. Sääfaktaa ei kirjoiteta valokuvan perusteella. |
| Kohde 1 | Kasbah of the Udayas historic walls | Historiallinen kasbah, eri tiedosto kuin kansi; ei kuvatekstiä museosta jos paviljonki ei näy. |
| Kohde 2 | River Bou Regreg estuary | Joki/suisto näkyy; moderni teatteri ei päämotiivi. |
| Kohde 3 | Andalusian wall of Rabat | Todellinen sisempi muuri, ei ulompi almohadimuuri. |
| Kohde 4 | Moulay Slimane Mosque | Ulkopuoli, tarkka Rabatin moskeija. Ei samannimisen yliopiston tai toisen moskeijan kuvaa. |
| Kohde 5 | Bab Rouah | Portti, eri tiedosto kuin H1. |
| Kohde 6 | Chellah gate / necropolis | Vanha raunioalue, eri tiedosto kuin H3/H4/kansi. |
| Kohde 7 | Borj Sidi Makhlouf | Linnake, ei Borj Lalla Qadiya tai moderni hotelli. |
| Valokuva | Rabat historical medina / Kasbah des Oudaias | Jos PD-vedos enintään vuodelta 1900 ja leveys vähintään 1200 px löytyy, ennen–nyt-pari; muuten eri nykykuva. Arkistoleima/vesileima hylätään. |

Samaa kohdetta voidaan käsitellä kohdejutussa ja nostossa eri näkökulmista; B kirjaa aihetoiston perustelun. Sama tiedosto vain kerran, paitsi ohjeen nimenomainen valokuvan ja ennen–nyt-parin poikkeus. Ennen–nyt-kuva ei ole lähde isoisän käynnille tai tarkalle 1873-väritykselle.

## 8. Ristiriidat ja epävarmat asiat

1. **Hassan-tornin aloitusvuosi:** kontekstin lähinosto käyttää vuotta 1191, UNESCO R14 antaa Hassan-moskeijan aloitukseksi 1184 ja WD:n torniväite on 1190-luvun tarkkuudella. Nämä eivät välttämättä ole sama rakennusvaihe. Ei valita yhtä hiljaa; Hassan-tornin tarkka rakennusvuosi ja valmis toistotarina jäävät lehden ulkopuolelle. Käytetään tarvittaessa ”1100-luvun lopun hanke”.
2. **Kasbahin nimihistoria:** R1:n 'Alawi rule ja R3 History kertovat Moulay Ismailin sijoittaneen Udayoja kasbahiin aiemmin, mutta R3 Name ja R4 sanovat nimen vakiintuneen 1800-luvulla Fezistä saapuneen ryhmän jälkeen. Älä väitä Udayojen ensimmäisen saapumisen ja nimen syntymisen olleen sama tapahtuma. Nimen etymologia voidaan jättää nostosta pois.
3. **Bab Lakbir WD P571 on selvä ongelma:** Q58897235 antaa vuoden 12 jKr. (precision 9); R4 ajoittaa portin 1100-luvun loppuun. WD:n vuotta ei käytetä. Kasbahin Q2569036 P571 on eri tarkkuuden aikaväite, eikä sitäkään kopioida muuntamatta.
4. **Medinan WD-koordinaatti:** Q17164860:n P625 osuu käytännössä Hassan-tornin pisteeseen, ei medinan ytimeen. Tätä ei käytetä karttapisteenä. Kohteet valittiin oikeiden erillisten paikkojen lähdekoordinaateista.
5. **Andalusialaisen muurin perustamisympäristö:** R7:n Background väittää almohadien kaupunkisuunnitelmaa 1200-luvun lopun hankkeeksi, mutta R1, R3, R5 ja UNESCO R14 ajoittavat sen 1100-luvun loppuun. R7:n vuosisata hylätään. Muurin pinta-alaväite on myös epäilyttävä: samantyyppinen laajuus liittyy R1:ssä myöhempään suurempaan kaupunkilaajennukseen. Ei mitään muurin pituus-, torni-, pinta-ala- tai porttimäärälukuja.
6. **Borj Sidi Makhlouf:** R8 antaa ensimmäiseksi vaiheeksi 1600-luvun; R7 puhuu 1700-luvun bastionista mutta liittää korjaamisen aiempaan vaurioitumiseen. Käytetään laajaa 1600–1700-lukujen ajoitusta ja jätetään täsmällinen tuhoutumisvuosi pois. Muodon säilyminen ja nykyinen paikka eivät ole sama asia kuin koko nykyisen muurauksen alkuperäisyys.
7. **Foinikialainen Sala:** R6 ja R1 käsittelevät asutuksen olemassaoloa arkeologisesti kiistanalaisena; R10 kertoo sen varmana. Käytetään vahvistettua mauretanialaista ja roomalaista kerrosta, ei varmaa foinikialaista perustamista.
8. **Chellahin temppeli:** R6:n forum-temppelin ajoitus ennen roomalaista aikaa tai roomalaisajalle on kiistanalainen; samoin curia/basilica-tulkinta. Ei täsmällistä temppelin rakentamisvuotta tai varmaa käyttötarkoitusta epävarmalle rauniorakenteelle.
9. **Museon nykytila:** R1 Museums and parks puhuu museon remontista vanhan tiedon varassa, R3 Pavilion kertoo myöhemmän uudelleenavautumisen. Ei väitetä museota nyt suljetuksi; ei myöskään luvata tiettyjä nykyisiä näyttelyitä tai aukioloa.
10. **Väestö:** kontekstin ja WD1:n nykyinen 515 619-luku voi nojata samaan HCP-lähteeseen. WD1 sisältää myös toisen vuoden 2024 luvun, jonka rank on deprecated. Käytetään kontekstin nimettyä prefektuurilaajuutta ja pyöristystä; ei sekoiteta kuntaa/taajamaa/metropolia.
11. **Raitiotie:** R12:n tulevaksi kuvattu laajennus on merkitty päivitystä tarvitsevaksi. Ei tulevia linjoja, pysäkkimääriä tai valmistumislupauksia.
12. **Suojatut nykyosat:** As-Sunna-moskeijan minareetti siirrettiin/uudelleenrakennettiin 1900-luvulla ja Great Mosque -kohteen nykyinen minareetti on 1900-luvulta (R17). Koko vanhan moskeijan nimellä ei kierretä nykyisen kuvatun teoksen oikeuksia; näitä ei valittu kartalle. Vanhan kohteenkin kuva tarkistetaan siltä varalta, että moderni teos on pääaihe.
13. **Sää:** pääsession `saa.json` ja sen tausta luettiin 11.10.2026; jakso 4 / Milloin kannattaa tulla sisältää normaalikauden, revision, taulukon, menetelmän ja käyttörajat. Ilmastoluvut vain tästä tiedostosta. A ei muuttanut `saa.json`:a.

## 9. Poisjätetyt aiheet ja rajat

- Hassan-tornin keskeneräisen moskeijan tarina: kontekstissa jo lähinostona, täsmällisessä aloitusvuodessa ristiriita. Ei nosto eikä erillinen karttakohde tässä lehdessä; taustalla saa näkyä vain jos kuvaoikeus ja aihetoiston perustelu on kunnossa.
- Marokon maalehden aiheet: prinssi/valtion synty, al-Qarawiyyinin perustaminen, kolmen kuninkaan taistelu, Niger-retki, arganöljy, pastilla, ras el hanout, harira, värjäysaltaat, zellij-tekeminen, vanha vesikello, keramiikkakaupunki, maan musiikkilajit ja laajat luontotarina-aiheet. Näitä ei kirjoiteta uudestaan Rabatin nostoihin. Chellahin vanhan laatoituksen maininta on kohteen materiaalikuvausta, ei zellij-valmistustarinan uusinta.
- Nykyhallitsijat, puolueet, vaalit, diplomaattiset kiistat, rikostarinat ja nykykonfliktit: tehtävän rajaus.
- Mohammed V:n mausoleumi, Grand Theatre / Royal Theatre, modernit sillat ja nykytaidemuseo: moderni suojattu arkkitehtuuri/teokset eivät kohteiksi tai kuvan pääaiheiksi. Näille ei tilata kuvia.
- Great Mosque, Rabat ja As-Sunna Mosque: luettu mutta jätetty pois karttakohteista nykyisten uudelleenrakennettujen minareettien oikeusepävarmuuden ja riittävän vanhan vaihtoehtolistan vuoksi.
- Rabatin eläintarha ja atlasleijonien polveutumistarina: Marokon maalehden leijonatarinan lähellä, lähteiden varmuusero, ei tarvita tähän kaupunkilehteen.
- Botanical Garden / Jardin d'Essais: ei otettu kohteeksi; lähdeaineisto niukka ja kauemmaksi levittävä lisäkohde ei ole tarpeen seitsemän kohteen kokonaisuudessa.
- Tarkat rakennusvuodet, tornikorkeudet, pinta-alat, kävijä-/linja-/pysäkkimäärät, jokipituudet ja kulkuajat: ilman kahta riippumatonta vahvistusta joko vuosisata tai pois. Historiallista vuotta ei kopioida Wikipedian infolaatikosta tarkkana vain siksi, että sama tieto näkyy toisessa wikiartikkelissa.
- Turvallisuusoppaan rikollisuus- ja poliittiset yksityiskohdat: rajauksen mukaisesti pois; varovaisuus liikenteessä, pääsyrajoitus ja rantaohje riittävät.
- Kuvien, kuvatekstien ja tekijätietojen hyväksyntä sekä lopullinen `sisalto.json`: myöhemmät B–F-vaiheet. Tämä A-tiedosto ei merkitse kaupunkia valmiiksi.
