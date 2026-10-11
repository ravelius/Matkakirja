# Bamako — A-vaiheen faktapohja

Id `bamako`, maa MLI Mali, erä e05, wiki-ehdotus `Bamako`. Luettu 11.10.2026. **A-ESTE: täydelle kartalle ei ole varmistettu kuutta hyväksyttävää kohdetta ja niiden ohjeen mukaisia koordinaatteja.** Alla oleva on valmis lähdekooste; epävarmoja karttakohteita ei hyväksytä toimitukseen. B–F tekemättä. Ei Commons-kuvahakuja.

## 0. Luetut lähteet ja 1873-kehys

Kaikki alla mainitut lähteet haettu yhteisellä `sallittu_haku.py`-apurilla, robots tarkistettu Claude-Userille ja Matkakirjalle sekä jokaiselle redirectille. Hakupäivä kaikille 11.10.2026. Paikalliset lähteet NAS-tehtäväjuuren `valiaikainen/e05/lahteet/`; yhteinen tarkistusloki `valiaikainen/sallitut-haut.jsonl`.

| tunnus | artikkeli, kieli ja luetut osiot | URL |
|---|---|---|
| B | Bamako, en: johdanto, History, Geography, Communes and neighborhoods, Economy, Culture, Music, Transport, Healthcare | https://en.wikipedia.org/wiki/Bamako |
| H | Timeline of Bamako, en: Before 20th century, 20th century; historia-artikkelin tehtävä | https://en.wikipedia.org/wiki/Timeline_of_Bamako |
| F | Bamako, fr: Histoire, Géographie, Transports, Santé, Architecture | https://fr.wikipedia.org/wiki/Bamako |
| V | Bamako, en-Wikivoyage: Get in, See, Buy, Eat, Stay safe; hinnat ja aukioloajat ohitettu | https://en.wikivoyage.org/wiki/Bamako |
| N | Niger River, en: Geography, Course, Management and development; sisämaan suistoa ei siirretä Bamakoon | https://en.wikipedia.org/wiki/Niger_River |
| C | Sacred Heart Cathedral, Bamako, en: johdanto ja History | https://en.wikipedia.org/wiki/Sacred_Heart_Cathedral,_Bamako |
| M | National Museum of Mali, en: johdanto, History, Collections | https://en.wikipedia.org/wiki/National_Museum_of_Mali |
| A | Modibo Keita International Airport, en: johdanto ja IATA; lentoyhtiölistaa ei käytetä | https://en.wikipedia.org/wiki/Modibo_Keita_International_Airport |
| R | Commons:Copyright rules by territory/Mali: General rules, Public domain and folklore, Freedom of panorama; oikeuslähde, ei kuvahaku | https://commons.wikimedia.org/wiki/Commons:Copyright_rules_by_territory/Mali |
| T | Mali travel advice, FCDO: Warnings and insurance, ajantasaisuus 11 October 2026 | https://www.gov.uk/foreign-travel-advice/mali |
| W | Wikidata Q2942903: P625, P571, P84:n puuttuminen | https://www.wikidata.org/wiki/Special:EntityData/Q2942903.json |

Konteksti on luettu kokonaan. Lisäksi luettiin Bògòlanfini, Seydou Keïta, Malick Sidibé ja African Photography Encounters johdanto-/historiaosiot toistojen tarkistamiseksi; niiden tarinoita ei käytetä tämän lehden nostoihin (URL:t vastaavat en-Wikipedian samannimisiä artikkeleita).

**1873:** Bamako oli olemassa ennen Ranskan hallintokeskusta. B kuvaa paikallisen kafun ja Niaré-, Touré- ja Dravé-suvut; H sijoittaa paikallisen asutuksen ja Mungo Parkin vierailun ennen vuotta 1873. Nykyinen rautatie ja siirtomaakauden hallintorakennukset tulivat myöhemmin. Tarkkaa perustamisvuotta ei kirjoiteta: B, H ja F ovat ristiriitaisia. Ei isoisän käyntiä, reittiä, puhetta tai matkakirjamerkintää. Katedraalin, rautatieaseman ja museon nykyiset rakennukset eivät olleet olemassa 1873 (myöhempi rakennus-/laitoshistoria C/H/M).

## 1. Perusfaktat

- Mali, maan pääkaupunki ja hallintokeskus; lounainen sijainti Nigerjoen varressa. B/johdanto, Geography.
- Kaupunki on jokitasangolla, pohjoispuolella kallioinen ylänköreuna; alkuperäinen kaupunki kasvoi pohjoisrannalla. B/Geography.
- Paikalliseen syntyhistoriaan kuuluvat Niaré-suku ja kafu eli paikallinen hallinnollinen yhteisö; Touré- ja Dravé-suvut olivat kauppiaita ja uskonnollisia toimijoita. B/History; H/Before 20th century.
- Niaréla on vanhimpia kaupunginosia. B/Communes and neighborhoods; F/hallintoalueet. Ei yksittäistä aukio- tai rakennuskoordinaattia koko kaupunginosan koordinaatiksi.
- Siirtomaakauden pääkaupunkiasema vahvistui 1900-luvun alussa; pääkaupunkiasema nykyisessä Malissa seurasi itsenäistymistä. B/H. Tarkat vuosiluvut jätetään pois kahden riippumattoman vahvistuksen puuttuessa.
- Asukkaat **4 227 569, vuosi 2022, District de Bamako eli pääkaupunkipiiri**, vain konteksti.json:n `kevytSisalto.asukkaat`: INSTAT RGPH5, taulukko 2.3 ja Résultats globaux. Taajama- tai metropolialueen luvuksi ei muuteta. Väestöluku on kontekstissa valmiiksi tarkistettu; tässä ei tehty uutta väestötutkimusta.
- Nimen tarkkaa etymologiaa ei käytetä: F esittää useita selityksiä. Ambience-ehdotus `kaupunki`; pallo kontekstista lat 12.6458, lon −7.9922, ei kohdekartan ankkurina.

## 2. Kansi: johdanto ja neljä nostoaihetta

Johdannon suunta: Nigerin tasangon kaupunki, jonka paikallinen historia on rautatietä ja siirtomaahallintoa vanhempi. Arki näkyy jokirannassa, markkinoilla ja pikkubussien äärellä. Lähteet B/H/F/V.

### K1 — Kaupunki ennen hallintopääkaupunkia (`Bamako`)
1. Paikallista hallintoyhteisöä kutsuttiin kafuksi. 2. Niaré-suku kuuluu perustamistraditioon. 3. Touré- ja Dravé-suvut olivat merkittäviä kauppias- ja uskonnollisia sukuja. 4. Kafu oli suhteessa Ségoun valtakuntaan. 5. Niaréla kuuluu vanhimpaan kaupunkiin. 6. Ranskalainen linnoitus tuli 1800-luvun lopulla. B/History, Communes; H/Before 20th century. Perustamislukua ei valita ristiriitaisista lähteistä.

### K2 — Rautatie tulee vanhaan kaupunkiin (`Bamako`)
1. Rautatie yhdisti kaupungin Kayesin suuntaan. 2. Dakar-yhteys syntyi myöhemmin. 3. Dakar–Niger-rata on nimetty yhteys Bamakosta länteen. 4. Lähde luettelee Katin, Négalan, Kitan ja Kayesin reitin varrelta. 5. Rautatie ja hallintopääkaupungin asema kuuluvat 1900-luvun alun kasvuun. 6. Nykyinen asema on siirtomaakauden rakennus V:n mukaan. B/History, Transport; H/20th century; V/Get in. Ei väitettä nykyisin toimivasta matkustajajunasta eikä aikataulua.

### K3 — Markkinoilla tehdään ja korjataan (`Bamako`)
1. Bamako-Couran käsityömarkkinoilla myydään hopeakoruja. 2. Myynnissä on nahkatöitä. 3. Soittimet ja puuesineet kuuluvat valikoimaan. 4. Kaupunkiin kuuluu keskustan suuri tori ja pienempiä toreja. 5. Marché Rose on siirtomaa-ajalta periytyvä markkinapaikka. 6. Sen rakennus on palon jälkeen jälleenrakennettu, joten ikä ei todista nykyjulkisivun oikeusvapautta. V/Buy, Grocery shopping; F/Architecture. Kuvaksi käsityön arkinen tekeminen ilman suojattuja teoksia tai tunnistettavia kasvoja; ei maalehden bogolan-tarinaa.

### K4 — Sotraman kyydissä (`Bamako`)
1. Sotrama on kaupungin joukkoliikenteessä käytetty pakettiauto/pikkubussi. 2. Ajoneuvoja on yksityisessä omistuksessa. 3. Kaupunki jakautuu joen molemmille rannoille. 4. Siltojen kautta yhdistyvät pohjoinen ja etelä. 5. Maantieyhteyksiä on mm. Katiin, Koulikoroon, Ségouhun ja Sikassoon. 6. Jokiliikenteen navigoitava yhteys alkaa lähteen mukaan Koulikorosta Moptiin ja Gaoon; ei väitettä suorasta nykyisestä turistilaivasta Bamakossa. B/Transport, Geography. Siltavuodet ja määrät pois tarkkojen lukujen säännön vuoksi.

## 3. Teemasivu: luonto — Joen ja kallioiden välissä

Johdantoehdotus: Tasainen jokilaakso ja pohjoinen kallioinen reuna antavat Bamakolle erilaiset maisemat. Puutarhoissa ja jokirannassa näkyy, miten luonto kuuluu kaupungin arkeen. B/F/V.

### L1 — Tulvatasangon kaupunki (`Bamako`)
1. Bamako on Nigerin tulvatasangolla. 2. Joen sivuhaarat kuuluvat kaupunkimaisemaan. 3. Lähde sanoo tulvatasangon vaikeuttavan rakentamista jokirannassa. 4. Kaupunki on pääosin tasainen. 5. Pohjoisessa maasto nousee jyrkemmin. 6. Alkuperäinen kasvu tapahtui pohjoisrannalla. B/Geography. Ei koko Nigerin tai sisämaan suiston tulvakalenteria Bamakon kalenteriksi.

### L2 — Point G:n maisema (`Bamako`)
1. Point G on kaupungin yläpuolinen kukkula. 2. Kukkulalta on näkymä kaupunkiin. 3. Paikalla on luolia. 4. Lähteet mainitsevat kalliomaalauksia. 5. Luolat ovat kasvitieteellisen puutarhan ja eläintarhan yläpuolisella ylänköalueella V:n mukaan. 6. Sairaalan historiallinen paikka on kaupungin yläpuolella. B/Culture, Healthcare; V/See. Maalausten ikä ja kansa tuntemattomat: niitä ei ajoiteta eikä käytetä suojattavana kuvakohteena. Sairaala ei ole nostoaiheen kuvan kohde.

### L3 — Kaupungin kasvit (`Bamako`)
1. Bamakossa on kasvitieteellinen puutarha. 2. Se on kansallismuseon lähellä. 3. F sanoo puutarhan esittelevän maan tyypillisiä kasvilajeja. 4. Vieressä on eläintarha. 5. V käsittelee puutarhaa osana laajempaa vihreää puistoaluetta. 6. V mainitsee puiston polkuverkoston. B/Culture; F/Architecture; V/See. Ei lajimääriä, pinta-alaa eikä modernien puistorakennusten kuvia.

### L4 — Kalastusta kaupungin joella (`Bamako`)
1. Nigerissä harjoitetaan Bamakon kohdalla kaupallista kalastusta. 2. Kaupunkiin kuuluu jokirannan pieniä viljelypalstoja. 3. Rannassa on veneiden vesillelaskupaikkoja. 4. Capitaine-kalaa tarjotaan oppaan mukaan paikallisissa ruokapaikoissa. 5. V mainitsee grillatun kalan. 6. N käsittelee Nigerin valuma-alueen elinkeinoina kalastusta, viljelyä ja laidunnusta; teksti pysyy Bamakossa B:n ja V:n varmistamilla väitteillä. B/johdanto, Architecture; V/Eat; N/Geography.

Minitehtävä: Mikä kaupungin maastonmuoto vaikeuttaa jokirannan rakentamista? Oikea: tulvatasanko. Vastaus L1:ssä; kysymyksen fakta kirjoitetaan omin sanoin. Ei toista osion 6 kysymyksiä.

## 4. Opas: viisi jaksoa ja rinnakkaislistat

1. **Perille ja liikkeelle:** Modibo Keita International Airport, IATA BKO (A/johdanto, V/Get in). Vanhassa nimessä Bamako–Sénou. Sotrama-pikkubussit, tiet ja joen ylittävät sillat B/Transport. Ei lento-, juna- tai bussivuoroja, lippuhintoja tai minuuttiarvioita.
2. **Joki ja maisema:** Nigerin ranta, Point G:n ylänkö ja puutarhat B/Geography, Culture ja V/See. Käyntikohteet esitellään kulttuuritietona; turvallisuusrajaus alla koskee koko opasta.
3. **Markkinat ja kokoelmat:** Bamako-Couran käsityöt V/Buy; Malin kansallismuseon arkeologiset ja etnografiset kokoelmat, soittimet ja vaatteet M/johdanto, Collections. Modernia museorakennusta tai suojattuja näyttelyesineitä ei tilata kuvaksi.
4. **Mitä täällä syödään:** riisi ja maapähkinäkastike, grillattu kala, katukioskien papu-, paistettu banaani- ja munaruoka V/Eat. Ei lähteen arvottavaa kansallisuus-/köyhyyskuvastoa eikä ravintolasuosituksia/hintoja.
5. **Milloin ja millä varauksilla:** sääluvut vasta pääsession alkuperäisellä `saa`-työkalulla tuotetusta `saa.json`:sta. B/Climate lukee savanni-ilmaston ja sateisemman/kuivemman jakson; sääjaksoon ei vielä yhtään lukua. **Matkailu Maliin ei ole tällä hetkellä turvallista** (T, koko maata koskeva matkustusvaroitus; tarkistettu 11.10.2026). Ei uutis- tai konfliktiselostusta. V:n vanha Stay safe -teksti ei ole nykytilan varmistus.

**Parasta 5:** Nigerin jokimaisema (B); Point G:n luonto ja näkymät (B/V); puutarhojen kasvit (F/V); käsityömarkkinoiden arki (V); museon kulttuurikokoelmien sisältö (M, kuvaoikeudet erikseen). Nämä eivät ole suositus matkustaa nykytilassa.

**Hyvä tietää 4:** turvallisuus estää tavallisen lomaoppaan tulkinnan (T); juna-aikatauluja ei ole tässä vahvistettu (V/B); puistojen ja luolien käytännön pääsyä ei luvata (V:n vanha päivitys); sääluvut odottavat pääsession sääriviä.

## 5. Kohdekartta: varmennuseste ja kohdeaineisto

Täyttä 6–8 pisteen karttaa ei voi hyväksyä tämän lähdeaineiston perusteella. Ohje vaatii Wikipedian koordinaatit tai Wikidata P625:n sekä vapaan historiallisen/luontokohteen. Kahden luontokohteen paikalliset koordinaatit löytyvät vain Wikivoyagesta; ne ovat **tutkimuskoordinaatteja, eivät hyväksyttyä poikkeusta**. Puuttuvia koordinaatteja ei korvata kaupungin tai joen globaalilla pisteellä. Rajaus tehdään vasta hyväksyttyjen kohteiden vahvistuttua; näiden kahden luonnospisteen ympärillä suunta on pohjoinen 12.67400, etelä 12.65840, länsi −8.01370, itä −7.99510.

### Luontokohdeaineisto (jatkovarmennettava)

**Point G:n kukkula**, tyyppi luonto, tutkimuskoordinaatti 12.67107, −8.01069, V/See. Aika: luonnonmuodostuma; luolamaalauksia ei ajoiteta. Faktat: kukkula Bamakossa; kaupungin yläpuolella; näköala kaupunkiin; luolia; lähde mainitsee kalliomaalauksia; V sijoittaa paikan kasvitieteellisen puutarhan ja eläintarhan yläpuolelle; pohjoinen ylänköreuna erottaa paikan tasaisesta jokikaupungista. B/Geography, Culture ja V/See. Ei nykysairaalaa, taidetta tai hallintorakennusta kuvakohteeksi.

**Bamakon kasvitieteellinen puutarha**, luonto, tutkimuskoordinaatti 12.66146, −7.99812, V/See. Aika: perustamisajankohta vahvistamatta. Faktat: Bamakon puutarha; kansallismuseon lähellä; esittelee Malille tyypillisiä kasveja F:n mukaan; eläintarhan vieressä; osa V:n kuvaamaa puistoaluetta; Koulouban ylänköreunan alapuolella; puistokokonaisuudessa polkuja. B/Culture; F/Architecture; V/See. Modernit puistosuunnitelmat/rakennukset rajataan kuvasta pois.

### Tarkistetut mutta kartasta pois jätetyt ehdokkaat

- **Pyhän sydämen katedraali**, rakennus, 12.64350, −7.99964, W/P625 (lähteen tarkkuus 0.01 astetta; viiden desimaalin muoto ei lisää mittatarkkuutta). Aika 1900-luvun alkupuoli. C kertoo: katolinen katedraali; Bamakon arkkihiippakunnan kirkko; Katin lähetys hankki kaupungista maata; sitä ennen papit kävivät kaupungissa Katista; kappeli edelsi katedraalia; rakentaminen, käyttöönotto ja valmistuminen ovat eri vaiheita; ei nykyistä katedraalia 1873. **Pois:** suunnittelijan henkilöllisyys ja oikeusvapautuminen vahvistamatta, Mali ei tarjoa kaupalliselle kohdekuvalle yleistä FOP:ia R:n mukaan.
- **Malin kansallismuseo**, rakennus, koordinaattia ei hyväksytty tähän karttaan. M kertoo arkeologia-/etnografiakokoelmat; esihistoriaa; soittimia; vaatteita; rituaaliesineitä; IFAN-tausta; nimi vaihtui itsenäistymisen jälkeen; vaihtuvia näyttelyitä. **Pois:** nykyiset rakennukset Pivin/Martin Saint-Léon, suojatut; B/M ja F ristiriidassa rakennushistoriassa. Ei korvata rakennuskohdetta museoesineellä.
- **Marché Rose**, historiallinen tori, koordinaatti puuttuu hyväksytystä lähteestä. F kertoo sijainnin keskustassa, siirtomaa-ajan alkuperän, tulipalon ja jälleenrakennuksen; aineisto ei anna 6–10 itsenäistä kohdefaktaa. **Pois:** nykyjulkisivun oikeudet ja koordinaatti vahvistamatta; nykyinen rakennus ei automaattisesti ole vanha teos.
- **Sotuban pengertie**, rakennus, koordinaatti puuttuu hyväksytystä lähteestä. B/F/H kertovat Nigerin ylityksen; Sotuban/Misabugun yhteyden; siirtomaakauden taustan; veden alle jäävän rakenteen; käyttömahdollisuuden matalan veden aikana; myöhemmän sillan lähialueella. **Pois:** oikeusasema ja tarkka rakennuspiste vahvistamatta; jokea/koskia ei merkitä pengertien koordinaatiksi.

## 6. Kysymysaiheet ja tiedot

| taso | aihe ja vastaus | lähde |
|---|---|---|
| 1 | Minkä maan pääkaupunki? Mali | B/johdanto |
| 1 | Kaupungin joki? Niger | B/Geography |
| 2 | Sotraman käyttötarkoitus? joukkoliikenne | B/Transport |
| 2 | Vanhan paikallisen hallintoyhteisön nimitys? kafu | B/History |
| 3 | Mikä perustamistraditioon kuuluva suku liittyy vanhaan Niarélan kaupunginosaan? Niaré | B/History, Communes; F/Histoire |

Tietoaiheet: 1) kaupunki kasvoi ensin joen pohjoisrannalla (B/Geography); 2) rannan pienet viljelypalstat ja veneiden vesillelaskupaikat (B/Architecture); 3) pääkaupungin rautatie oli myöhempi kuin paikallinen kaupunki (B/H). Ei isoisän ääntä eikä tarkkoja vuosia.

## 7. Kuvatarpeet — sanallinen tilaus, ei kuvahakuja

| paikka | tarvittava aihe |
|---|---|
| kansi 1–3 | Nigerin rannan laaja kaupunkimaisema; yleiskuva vanhan keskustan katujen ympäristöstä; pohjoisen kukkuloiden ja kaupungin laaja näkymä. Ei suojattua rakennusta kuvan pääaiheeksi. |
| K1–K4 | vanhan asutuksen katuympäristö; rautatiehistoriasta oikeusvapaa vanha valokuva/kalusto; käsityön arkinen työvaihe; sotrama yleisenä kulkuvälineenä ilman suojattua mainoskuvitusta. |
| L1–L4 | jokitasanko; Point G:n kallio/luola ilman maalausta; puutarhan kasvit ilman moderneja rakennuksia; kalastuksen arkinen vene-/verkkonäkymä. |
| matkailijalle | maltillinen pysty 0.60–0.85, Nigerin rantaluonto tai puutarhan kasvillisuus; nykyinen, turvallisuusrajaus tekstissä. |
| opas 3–5 | tavallinen kulkuväline; jokimaisema; käsityön työväline; valmis paikallinen ruoka; korkeintaan kaksi kuvatonta jaksoa. |
| kohteet | yksi luontoaiheinen kuva hyväksyttyä kohdetta kohti vasta kartan esteen ratkettua. |
| valokuva | yksi laaja oikeusvarmistettu nykymaisema; ennen–nyt vain jos ≤1900 oikeusvapaa riittävän leveä kuva löytyy. Tällaista kuvaa ei ole etsitty. |

Jokaisen kuvan tiedostolisenssi, tekijä, leveys, kaupallinen teosoikeus ja näkyvä sisältö ovat B/C/D:n avoimia tarkistuksia. R:n Mali-FOP ei oikeuta arvausta. Kasvot, vesileimat ja lisätyt tekstit poissuljetaan. Nostoihin ei valita maalehden kuvia uudelleen.

## 8. Ristiriidat, epävarmat ja ratkaisut

- Perustaminen: B noin 1600-luvun puoliväli, H noin 1700 ja F myös 1500-luku sekä suullisia perinteitä. **Ratkaisu:** paikallinen kaupunki oli olemassa ennen 1800-luvun loppua; ei perustamisvuotta.
- Rautatien valmistuminen: kaupungin sisäiset aikajanat sekoittavat eri rataosuuksia. **Ratkaisu:** Kayes-yhteys ja Dakar-yhteys erillisinä, 1900-luvun alku ilman tarkkaa vuotta.
- Katedraali: V tiivistää rakennuksen 1920-luvulle, C erottaa aloituksen, käyttöönoton ja 1930-luvun valmistumisen, H merkitsee käyttöönoton rakennusvuodeksi. **Ratkaisu:** ei täsmävuotta; ei kohdekuvaa ennen oikeusvarmistusta.
- Museo: B/M antaa Pivinin rakennukselle 1950-luvun vuoden; F kuvaa Pivin/Martin Saint-Léonin 1970-luvun rakennusta. **Ratkaisu:** kokoelmista saa kertoa, nykyistä rakennusta ei hyväksytä eikä historian virhettä kopioida.
- Hallintoalueiden määrä: B:n johdanto ja Transport sekä F kertovat eri määriä. **Ratkaisu:** piiri nimetään, kuntamäärä pois.
- UM:n kokeillut tavalliset tiedotepolut palauttivat yleisen sivun tai 404:n, eivät Malin tiedotetta. Niitä ei käytetä turvallisuustodisteena. **Kirjattu lähdepoikkeus:** FCDO:n ensisijainen viranomaislähde T, robots sallittu.
- Luontopisteiden Wiki/Wikidata-koordinaatit ja kuuden karttakohteen määrä ovat ratkaisematta. Wikivoyagen koordinaatit on erotettu tutkimustiedoiksi. Wikipedia-haut nimillä Bamako railway station, National Park of Mali, Parc national du Mali, Gare de Bamako, Sotuba ja Marché rose de Bamako eivät antaneet luettavaa kohdeartikkelia; hakutulosta ei keksitty. Wikidata Special:Search estettiin apurissa ennen sivuhakua.
- Tarkat rakennusvuodet ja muut määrät eivät tässä täytä kahden riippumattoman lähteen ehtoa. Kahden Wikipedia-artikkelin tai kielen yhtenevää lukua ei merkitä itsenäisesti varmennetuksi.

## 9. Poisjätetyt toistot ja aiheet

Kontekstin maalehti varaa Sundiatan, suullisen perustuslain, Mansa Musan, Songhain, suola-/fonio-/maustetarinoiden, bogolanin, Seydou Keïtan, Malick Sidibén, koran, Salif Keïtan ja Ali Farka Tourén tarinat. Niitä ei tehdä kaupungin uusiksi nostoiksi. Bamako-fokusnoston väestö/perustaminen/joki jää johdannon välttämättömäksi taustaksi, ei samaksi uudeksi nostoksi. Ei läheistä pelikaupunki-lehteä kontekstissa.

Nykypolitiikka, vaalit, konfliktit, rikollisuus ja lentokenttähyökkäykset pois. Grand Mosque, BCEAO-torni, itsenäisyys-/rauhanmuistomerkit, moderni kulttuuripalatsi ja museon nykyarkkitehtuuri pois suojattuina/epävarmoina teoskohteina. Nykyinen lääketieteellinen `Point G`-artikkeli käsittelee G-pistettä eikä Bamakon kukkulaa: sitä ei käytetä. Parkin yleistietoon ohjannut AKDN-linkki ei ollut puiston kohdesivu eikä todista sen rakennushistoriaa.

**A:n jatkoportti:** kuuden hyväksyttävän paikallisen karttakohteen lähdeaineisto ja koordinaatit on ratkaistava tai päätoimittajan on hyväksyttävä dokumentoitu pienempi kartta. Tämä tiedosto ei ole C-, D-, F- tai julkaisuhyväksyntä.
