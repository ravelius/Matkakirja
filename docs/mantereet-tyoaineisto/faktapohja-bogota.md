# Bogotá — faktakoostaja, uusi kaupunkilehti

Lauta-id `southamerica`, kaupunki-id `bogota`, en-Wikipedia "Bogotá". Kaikki
tiedot haettu en-Wikipediasta 23.8.2026 (action=raw, uusinnat kasvavalla
viiveellä — sekä artikkelihaku että MediaWikin coordinates-rajapinta
antoivat ajoittain 429-vastauksia, uusintayritys korjasi jokaisen haun).
Redirectit seurattu ("Plaza de Bolívar, Bogotá" → "Plaza de Bolívar",
"Botero Museum" → "Museo Botero"). Malli ja mitat luettu tiedostoista
`docs/aasia-tyoaineisto/lehtityo-resepti.md`, `docs/moduulit/
kaupunkilehti.md` sekä esimerkkinä `docs/mantereet-tyoaineisto/
faktapohja-vancouver.md`. Sisältölinjaus (alkuperäiskansat, kolonialismi,
katastrofit) tiedostosta `docs/mantereet-tyoaineisto/spec-mantereet.md`
(E-Amerikan yleiset linjaukset). Kaupungin visa on tarkistettu tiedostosta
`js/packs/southamerica-questions.js` (kohta `bogota`, kuusi kysymystä:
Kolumbian pääkaupunki, smaragdit, El Dorado/Guatavita-tarina, korkeus noin
2 600 m, ciclovía, Zipaquirán suolakatedraali) — neljä näistä aiheista
(korkeus, ciclovía, El Dorado, suolakatedraali) esiintyvät myös tässä
faktapohjassa, koska ne ovat oleellinen osa kaupungin tarinaa, mutta
jokaisessa kohdassa on käytetty tarkempia lukuja tai eri näkökulmaa kuin
visan lyhyt vastaus, jottei mikään nosto anna visan vastausta suoraan (ks.
osio 7, kohta 1). Smaragdi-aihetta EI ole käytetty missään nostossa —
ks. osio 7, kohta 6.

Sisältölinjaus (omistajan tilaus): muiscat kuvataan **nykyisenä ja
elävänä kansana**, ei vain esikolonisaatioajan kuriositeettina — siksi
tälle erälle on oma teemasivu `muisca` pelkän `historia`-sivun sijaan,
samalla periaatteella kuin Vancouverin `alkuperaiskansat`-sivu. Kullan
merkitys kerrotaan muiscojen omasta uskonnollisesta näkökulmasta
(Kultamuseon oma muotoilu: kulta ei ollut monille alkuperäiskansoille
rikkauden mitta vaan symbolisesti ja uskonnollisesti latautunut pyhä
aine) — EI espanjalaisten aarteenetsintänä. Nykypolitiikkaa,
huumekauppaa ja väkivaltaa ei ole käsitelty missään kohdassa (spec-
mantereet.md); 1900-luvun levottomuudet (mm. Bogotazo 1948, Palace of
Justice -piiritys 1985) on jätetty tarkoituksella pois, koska ne eivät
osu peliin sallittuun aikakehykseen eivätkä 1873-painotukseen. Painotus
on muuten 1873-henkisessä aineistossa: La Candelaria, Plaza de Bolívar,
Kansallismuseo (perustettu 1823) ja Monserrate nousevat esiin useassa
kohdassa, ja Kansallismuseon nykyinen rakennus (entinen Panóptico-
vankila) valmistui vuonna 1872 — käytännössä isoisän matka-aikoihin.

---

## 1. Sivuehdotukset

### Sivu A — id `kaupunki`, nimi "Bogotá"

**Johdanto (228 merkkiä):**

> Kahden ja puolen kilometrin korkeudessa makaava Bogotá on maailman
> korkein pääkaupunki. Muiscojen pyhästä maasta kasvoi espanjalaisten
> pikkukaupunki, sitten eristetty vuoristopääkaupunki – ja vasta
> 1900-luvulla miljoonakaupunki.

### Sivu B — teemasivu, ehdotettu id `historia`, nimi "Historia"

**Perustelu valinnalle:** Bogotán aineisto on poikkeuksellisen vahva
juuri 1800-luvun kronologiassa — kaksinkertainen perustaminen, aukion
nimenvaihdokset ja Kansallismuseon oma rakennushistoria (Panóptico 1872)
osuvat suoraan isoisän matka-aikaan. `historia`-sivu jatkaa
kaupunkisivun tarinaa syvemmälle kuin neljä nostoa sallivat.

**Johdanto (223 merkkiä):**

> Bogotán historia on kerroksellinen: muiscojen pyhä kylä,
> siirtomaapääkaupunki ja tasavallan hallintokeskus asuvat samoilla
> kaduilla. Isoisän matka-aikaan 1870-luvulla kaupungin ydin oli jo
> pitkälti se, mikä se on tänäänkin.

### Sivu C — teemasivu, ehdotettu id `muisca`, nimi "Muiscat"

**Perustelu valinnalle:** Ei vakioaihe (`AIHE_IKONIT`-listalla ei ole
sopivaa valmista aihetta), mutta perusteltu poikkeus samalla logiikalla
kuin Vancouverin `alkuperaiskansat`-sivu: muiscat eivät ole vain
`historia`-sivun taustaa, vaan Raamatun pilari 3 edellyttää heidän
kertomistaan asukkaiden omasta, nykyisestä näkökulmasta. Aineisto on
riittävän vahva ja erillinen `historia`-sivusta kantamaan oman sivunsa:
kullan uskonnollinen merkitys, El Doradon todellinen tausta ja viisi
tänäkin päivänä toimivaa muisca-neuvostoa.

**Johdanto (215 merkkiä):**

> Bogotá seisoo muiscojen mailla, ja muiscat elävät yhä – omine
> neuvostoineen, kielineen ja perinteineen. Kulta ei ollut heille
> rikkautta vaan pyhää ainetta, ja juuri tämä usko synnytti Euroopassa
> El Doradon legendan.

---

## 2. Kaksitoista nostoehdotusta (4 + 4 + 4)

### Sivu `kaupunki` — 4 nostoa

**Nosto B1 — "Kaupunki jolla oli kolme nimeä" (476 merkkiä)**

> Kaupungin nimi on vaihtunut kolmesti. Muiscojen zipa asui kylässä
> nimeltä Bacatá lähellä nykyistä Funzaa, ja siitä espanjalaiset
> vääntivät nimen Bogotá. Perustaja Gonzalo Jiménez de Quesada nimesi
> paikan aluksi Nuestra Señora de la Esperanzaksi 1538, mutta keisari
> Kaarle V muutti nimen Santa Féksi 1540 kotikaupunkinsa mukaan. Vasta
> kun Simón Bolívar saapui voittajana 1819, hän kastoi kaupungin
> uudelleen Bogotáksi kunnioittaakseen muiscoja ja korostaakseen eroa
> Espanjasta.

Faktat ja lähteet:
- Muiscojen zipan bohío sijaitsi kylässä Bacatá lähellä nykyistä
  Funzaa; espanjalaiset vääntivät nimestä Bogotá. — en-Wikipedia
  "Bogotá" (Toponymy, Gonzalo Jiménez de Quesada expedition and Spanish
  conquest)
- Quesada nimesi perustamansa kaupungin Nuestra Señora de la
  Esperanzaksi 6.8.1538. — en-Wikipedia "Bogotá" (Gonzalo Jiménez de
  Quesada expedition and Spanish conquest)
- Kaarle V:n asetus 27.7.1540 muutti nimen Santa Féksi Espanjan
  Granadan lähellä sijaitsevan kaupungin mukaan, jossa Quesada oli
  kasvanut. — en-Wikipedia "Bogotá" (Gonzalo Jiménez de Quesada
  expedition and Spanish conquest)
- Simón Bolívar nimesi kaupungin uudelleen Bogotáksi saavuttuaan
  voittajana 10.8.1819 kunnioittaakseen muiscoja ja korostaakseen eroa
  Espanjasta. — en-Wikipedia "Bogotá" (Nineteenth century)

**Nosto B2 — "Korkein suuri kaupunki maailmassa" (472 merkkiä)**

> Bogotá sijaitsee Andien ylätasangolla keskimäärin 2 640 metrin
> korkeudessa – yhtään muuta yhtä suurta ja yhtä korkealla sijaitsevaa
> kaupunkia ei maailmassa ole. Korkeus pitää lämpötilan tasaisena ympäri
> vuoden, keskimäärin 14,5 astetta, eikä kaupungissa ole varsinaisia
> vuodenaikoja lainkaan – vain kuivempia ja sateisempia kuukausia.
> Aamuisin kaupunkia peittää usva lähes 220 päivänä vuodessa, ja
> rankkasateisiin liittyvät raekuurot iskevät keskimäärin kolmesti
> vuodessa.

Faktat ja lähteet:
- Bogotán keskikorkeus on 2 640 m; kaupunki on suurin kaupunki
  maailmassa omalla korkeudellaan, eikä yhtään korkeampaa ja
  väkirikkaampaa kaupunkia ole. — en-Wikipedia "Bogotá" (Geography)
- Keskilämpötila on 14,5 °C, ilmastoluokka subtrooppinen
  ylänköilmasto (Köppen: Cfb, tasainen sademäärä). — en-Wikipedia
  "Bogotá" (Climate)
- Usva on tavallista lähes 220 päivänä vuodessa. — en-Wikipedia
  "Bogotá" (Climate)
- Raekuuroja esiintyy keskimäärin kolmesti vuodessa; vuosina 1939–2008
  kirjattiin 231 tapausta. — en-Wikipedia "Bogotá" (Climate)

**Nosto B3 — "Pyöräkatu joka valloitti maailman" (526 merkkiä)**

> Joka sunnuntai ja pyhäpäivä kello 7–14 yli 120 kilometriä Bogotán
> pääkatuja suljetaan autoilta: kadut täyttyvät juoksijoista,
> luistelijoista ja pyöräilijöistä, ja puistoihin nousee lavoja jumppa-
> ja joogaohjaajille. Ilmiötä kutsutaan ciclovíaksi, ja sitä käyttää
> viikoittain noin kaksi miljoonaa ihmistä – noin viidennes koko
> kaupungin väestöstä. Idea syntyi Bogotássa, ja siitä on sittemmin
> tullut malli kymmenille kaupungeille ympäri maailmaa. Vuodesta 1995
> tapahtumaa on hallinnoinut kaupungin liikunta- ja virkistyslaitos.

Faktat ja lähteet:
- Ciclovía sulkee sunnuntaisin ja pyhäpäivinä klo 7–14 yli 120 km
  pääkatuja autoilta juoksijoiden, luistelijoiden ja pyöräilijöiden
  käyttöön; puistoihin nousee jumppa- ja joogalavoja. — en-Wikipedia
  "Ciclovía" (Origins in Colombia)
- Tapahtumaa käyttää viikoittain n. 2 miljoonaa ihmistä, n. 20 %
  kaupungin väestöstä. — en-Wikipedia "Ciclovía" (Origins in Colombia)
- Idea sai alkunsa Bogotásta ja on inspiroinut vastaavia tapahtumia
  muualla maailmassa. — en-Wikipedia "Ciclovía" (Origins in Colombia)
- Vuodesta 1995 hallinnosta on vastannut Instituto Distrital de
  Recreación y Deporte. — en-Wikipedia "Ciclovía" (Schedule)

**Nosto B4 — "Pääkaupunki joka eli eristyksissä" (477 merkkiä)**

> Vielä 1870-luvulla Bogotá oli suhteellisen eristyksissä muusta
> maailmasta: kunnollinen yhteys Magdalena-jokea pitkin Karibialle
> syntyi vasta vuosisadan lopulla rautateiden ja teiden myötä. Silti
> juuri 1870-luvulla kaupunki alkoi muuttua – väestö kasvoi nopeasti
> itäisiltä ylängöiltä muuttaneiden myötä, ja vuosina 1870–1883
> kaupunkiin avattiin neljä ensimmäistä pankkia. Vuonna 1793
> kaupungissa asui noin 20 000 ihmistä; vuoteen 1912 mennessä luku oli
> kasvanut yli 117 000:een.

Faktat ja lähteet:
- Bogotá oli 1800-luvulla suhteellisen eristyksissä vähäisten
  yhteyksien takia; eristys väheni vasta vuosisadan lopulla rautatien
  ja Magdalena-joelle vievien teiden myötä. — en-Wikipedia "History of
  Bogotá" (Cultural life in the city)
- Väestönkasvu kiihtyi 1870-luvulta lähtien pääosin itäisiltä
  ylängöiltä suuntautuneen muuton ansiosta. — en-Wikipedia "Bogotá"
  (Regeneration)
- Vuosina 1870–1883 kaupunkiin avattiin neljä ensimmäistä pankkia
  (Bogotá, Colombia, Popular ja Mortgage Credit). — en-Wikipedia
  "Bogotá" (Twentieth century, artisan-tuotannon kappale)
- Väkiluku kasvoi n. 20 000:sta (1793) n. 117 000:een (1912).
  — en-Wikipedia "Bogotá" (Regeneration)

### Teemasivu `historia` — 4 nostoa

**Nosto H1 — "Kaksi perustamista saman kesän aikana" (572 merkkiä)**

> Espanjalaiset perustivat kaupungin käytännössä kahdesti. Ensin
> Gonzalo Jiménez de Quesada leiriytyi elokuussa 1538 paikkaan, jota
> muiscat olivat käyttäneet zipa-hallitsijansa levähdyspaikkana ja joka
> tunnetaan nykyään Chorro de Quevedona; hän pystytti kaksitoista
> ruokomajaa apostolien muistoksi. Virallinen perustaminen
> kaupunginhallintoineen tapahtui vasta huhtikuussa 1539 nykyisellä
> Plaza de Bolívarilla, ja samana vuonna paikalle saapuivat myös kaksi
> muuta espanjalaista retkikuntaa idästä ja etelästä – kaikki kolme
> löysivät saman ylätasangon toisistaan riippumatta.

Faktat ja lähteet:
- Quesada leiriytyi elokuussa 1538 paikkaan, joka tunnettiin muiscojen
  levähdyspaikkana ja tunnetaan nykyään Chorro de Quevedona; hän
  rakennutti kaksitoista ruokomajaa kahdentoista apostolin muistoksi.
  — en-Wikipedia "Bogotá" (Gonzalo Jiménez de Quesada expedition and
  Spanish conquest), "La Candelaria, Bogotá" (History)
- Virallinen perustaminen kaupunginhallintoineen tapahtui 27.4.1539
  nykyisen Plaza de Bolívarin paikalla. — en-Wikipedia "Bogotá"
  (Gonzalo Jiménez de Quesada expedition and Spanish conquest)
- Nikolaus Federmannin ja Sebastián de Belalcázarin retkikunnat
  saapuivat vastaperustettuun kaupunkiin 1539 idästä ja etelästä. —
  en-Wikipedia "Bogotá" (Spanish colonization), "Plaza de Bolívar"
  (Colonial history)

**Nosto H2 — "Aukio joka sai patsaansa vasta vuosikymmeniä myöhemmin" (549 merkkiä)**

> Kaupungin pääaukio on kantanut montaa nimeä. Siirtomaa-ajalla se oli
> yksinkertaisesti Plaza Mayor, itsenäistymisen jälkeen 1821 Plaza de
> la Constitución – ja vasta 1846, kun aukiolle pystytettiin Simón
> Bolívarin patsas, siitä tuli Plaza de Bolívar. Aukion itälaidalla
> kohoava katedraali on lähes yhtä nuori: nykyinen uusklassinen
> rakennus aloitettiin 1807 munkki Domingo de Petrésin suunnittelemana
> ja vihittiin käyttöön vasta 1823, joten isoisän matka-aikaan
> 1870-luvulla sekä patsas että katedraali olivat vielä suhteellisen
> tuoreita nähtävyyksiä.

Faktat ja lähteet:
- Aukio tunnettiin siirtomaa-ajalla nimellä Plaza Mayor, vuodesta 1821
  Plaza de la Constitución -nimellä, ja siitä tuli Plaza de Bolívar
  vasta 1846, kun Simón Bolívarin patsas pystytettiin. — en-Wikipedia
  "Plaza de Bolívar" (Republican period)
- Nykyisen katedraalin rakentaminen aloitettiin 11.2.1807 munkki
  Domingo de Petrésin suunnitelmilla ja saatiin päätökseen 19.4.1823;
  vihkiminen tapahtui samana vuonna. — en-Wikipedia "Primatial
  Cathedral of Bogotá" (History), "Plaza de Bolívar" (Colonial
  history)

**Nosto H3 — "Museo joka syntyi ennen taloaan" (629 merkkiä)**

> Kansallismuseo on yksi Amerikan mantereen vanhimmista museoista:
> kongressi perusti sen heinäkuussa 1823 samalla päätöksellä kuin
> kaivosopiston, ja Simón Bolívarin Pariisiin lähettämä tiedekunta –
> muun muassa perulainen mineralogi Mariano Eduardo de Rivero ja
> ranskalainen kemisti Jean-Baptiste Boussingault – johti alkuvuosia.
> Museon nykyinen rakennus ei kuitenkaan ole yhtä vanha kuin kokoelma:
> tanskalaisen arkkitehdin Thomas Reedin suunnittelema Panóptico-
> vankila valmistui vasta 1872, siis juuri isoisän matka-aikoihin, ja
> toimi Kolumbian suurimpana vankilana aina vuoteen 1946 asti. Museoksi
> rakennus muutettiin vasta 1948.

Faktat ja lähteet:
- Kongressi perusti Kansallismuseon asetuksella 28.7.1823; se on
  maan vanhin museo ja yksi Amerikan mantereen vanhimmista. Sama laki
  perusti myös kaivosopiston. — en-Wikipedia "National Museum of
  Colombia" (History)
- Simón Bolívar käynnisti 1822 eurooppalaisen tiedekunnan
  rekrytoinnin Pariisin kautta; ryhmää johti perulainen mineralogi
  Mariano Eduardo de Rivero y Ustáriz, mukana mm. ranskalainen kemisti
  Jean-Baptiste Boussingault. — en-Wikipedia "National Museum of
  Colombia" (History)
- Museon nykyinen rakennus (Panóptico) suunniteltiin 1850
  (arkkitehti Thomas Reed) mutta rakennettiin vasta 1872; se oli
  Kolumbian suurin ja tärkein vankila vuoteen 1946 asti, jolloin se
  korvattiin La Picota -vankilalla. — en-Wikipedia "National Museum
  of Colombia" (Building)
- Rakennus avattiin museona yleisölle 2.5.1948 kahden vuoden
  kunnostuksen jälkeen. — en-Wikipedia "National Museum of Colombia"
  (Building)

**Nosto H4 — "Kaupunki jossa suklaa tarjoiltiin joka ilta" (587 merkkiä)**

> Vaikka Bogotá oli 1800-luvulla suhteellisen eristyksissä, sen
> seurapiirielämä kukoisti. Illanistujaisissa tarjottiin lähes
> poikkeuksetta suklaata kotitekoisten keksien kanssa, ja
> ajiaco-keitosta tuli kaupungin tunnusruoka. Illanvietoissa joku soitti
> pianolla paikallisten säveltäjien musiikkia, ja väki tanssi
> pasillo-nimistä nopeaa valssia lyhyin askelin. 1870-luvulla
> kirjailijat kokoontuivat Mosaico-lehden ympärille kirjoittamaan
> ensimmäistä yhtenäistä esitystä Kolumbian kirjallisuuden historiasta –
> yritys vahvistaa maan kulttuurista identiteettiä keskellä toistuvia
> sisällissotia.

Faktat ja lähteet:
- Illanistujaisissa tarjottiin lähes poikkeuksetta suklaata
  kotitekoisten keksien kanssa; ajiaco vakiintui tunnusruoaksi. —
  en-Wikipedia "History of Bogotá" (Cultural life in the city)
- Illanvietoissa soitettiin pianolla paikallisten säveltäjien
  musiikkia ja tanssittiin pasilloa, nopeaa lyhytaskelista valssia. —
  en-Wikipedia "History of Bogotá" (Cultural life in the city)
- 1870-luvulla kirjailijat kokoontuivat José María Vergara y
  Vergaran perustaman Mosaico-lehden ympärille kirjoittamaan yhtä
  ensimmäisistä yhtenäisistä esityksistä Kolumbian kirjallisuuden
  historiasta osana kansallisen kulttuuri-identiteetin rakentamista. —
  en-Wikipedia "History of Bogotá" (Cultural life in the city)

### Teemasivu `muisca` — 4 nostoa

**Nosto M1 — "Kansa joka nimesi kaupungin ilman tietämättään" (598 merkkiä)**

> Kun espanjalaiset saapuivat 1530-luvulla, Bogotán ylätasangolla ja
> sitä ympäröivällä alueella asui arviolta puoli miljoonaa muiscaa,
> koko konfederaatiossa jopa kaksi miljoonaa. He viljelivät maissia
> kohotetuilla, kastelluilla penkereillä, kävivät kauppaa
> naapurikansojen kanssa, ja soturieliitti sai käyttää papukaijan ja
> aran höyhenistä tehtyjä kruunuja. Sana muisca tarkoittaa kielessä
> yksinkertaisesti ”ihmistä” tai ”kansaa” – kansa siis nimesi itsensä
> vain ihmisiksi, eikä osannut aavistaa, että espanjalaiset päätyisivät
> myöhemmin nimeämään koko pääkaupungin heidän hallitsijansa kylän
> mukaan.

Faktat ja lähteet:
- Espanjalaisten saapuessa muiscojen väestöksi arvioitiin puoli
  miljoonaa Bogotán ylätasangolla, koko Muisca-konfederaatiossa jopa
  kaksi miljoonaa. — en-Wikipedia "Bogotá" (Pre-Columbian era)
- Maissia viljeltiin kohotetuilla, kastelluilla penkereillä; kauppa
  naapurikansojen kanssa oli muiscojen tärkein taloudellinen toiminta,
  ja soturieliitti sai käyttää papukaijan ja aran höyhenistä tehtyjä
  kruunuja. — en-Wikipedia "Bogotá" (Pre-Columbian era)
- Sana "muisca" tarkoittaa "ihmistä" tai "kansaa" — nimitys "muisca-
  kansa" on siis tautologia. — en-Wikipedia "Bogotá" (Pre-Columbian
  era)

**Nosto M2 — "Kulta ei ollut rahaa vaan pyhää ainetta" (526 merkkiä)**

> Bogotán Kultamuseo ei ole vain aarrekammio: monille alkuperäiskansoille
> kulta ei ollut rikkauden mitta lainkaan, vaan symbolisesti ja
> uskonnollisesti latautunut pyhä aine. Museon 55 000 esineen
> kokoelmassa keskeisin on Pascasta vuonna 1969 löydetty pieni
> kultavene, joka kuvaa uuden zipan valtaanastujaisia: hallitsija seisoo
> lautan keskellä kultaan ja höyheniin puettujen päälliköiden
> ympäröimänä. Sama tarina toistuu museon Uhrihuoneessa – ei rikkauden
> esittelynä, vaan kuvauksena siitä, miten muiscat lähestyivät
> jumaliaan.

Faktat ja lähteet:
- Museon oma muotoilu: monet alkuperäiskansat eivät pitäneet kultaa
  rikkauden lähteenä vaan symbolisesti ja uskonnollisesti latautuneena
  pyhänä aineena. — en-Wikipedia "Gold Museum, Bogotá" (johdanto)
- Museon kokoelmassa on 55 000 esinettä, joista 6 000 esillä
  laajennetussa rakennuksessa. — en-Wikipedia "Gold Museum, Bogotá"
  (Description)
- Pascasta 1969 löydetty kultainen lautta kuvaa uuden zipan
  valtaanastujaisia: hallitsija lautan keskellä, ympärillään kultaan
  ja höyheniin puetut päälliköt. — en-Wikipedia "Gold Museum, Bogotá"
  (History)

**Nosto M3 — "Järvi jossa hallitsija kylpi kultapölyssä" (575 merkkiä)**

> Guatavita-järvi, noin 57 kilometriä Bogotásta koilliseen 3 000 metrin
> korkeudessa, oli muiscoille pyhä paikka, ei aarrearkku. Uuden zipan
> astuessa valtaan hän peitti vartalonsa kultapölyllä, souti lautalla
> järven keskelle ja pesi kultapölyn pois vedessä samalla kun heitti
> kulta-esineitä uhrilahjoina jumalatar Guatavitalle. Tapa tunnettiin
> kaukana konfederaation ulkopuolellakin, aina Karibialle asti. Kaksi
> pientä kultaista uhrilauttaa on löydetty järven pohjalta – ensimmäinen
> 1856 (tuhoutui myöhemmin tulipalossa) ja toinen 1969, joka on
> nähtävissä Bogotán Kultamuseossa.

Faktat ja lähteet:
- Lake Guatavita sijaitsee n. 57 km koilliseen Bogotásta, n. 3 000 m
  korkeudessa. — en-Wikipedia "Lake Guatavita" (johdanto, infobox)
- Uuden zipan valtaanastujaisissa hän peitti itsensä kultapölyllä ja
  pesi sen pois järvessä heittäen samalla kulta-esineitä uhrilahjoina
  jumalatar Guatavitalle; tapa tunnettiin konfederaation ulkopuolella
  aina Karibialle asti. — en-Wikipedia "Muisca" (El Dorado)
- Kaksi pientä kultaista uhrilauttaa löydettiin järven pohjalta,
  ensimmäinen 1856 (tuhoutui myöhemmin tulipalossa) ja toinen 1969
  (esillä Bogotán Kultamuseossa). — en-Wikipedia "Muisca" (El Dorado)

**Nosto M4 — "Kansa joka on yhä olemassa" (648 merkkiä)**

> Muiscat eivät ole kadonnut kansa: viisi nykyistä muisca-neuvostoa –
> Suba, Bosa, Cota, Chía ja Sesquilé – toimivat yhä, ja syyskuussa 2002
> ne perustivat yhteisen Cabildo Mayor del Pueblo Muiscan Bosassa
> pidetyssä ensimmäisessä muiscojen yleiskongressissa. Cotan yhteisö on
> elvyttänyt kvinoan viljelyä ja käy edelleen tuotteillaan vaihtokauppaa,
> ja Suban muiscat ovat puolustaneet Juan Amarillon kosteikkoa
> kaupungistumista vastaan. Perinteinen maissiolut chicha kiellettiin
> 1948 kulttuurin iskuksi, mutta kielto kumottiin 1991, ja siitä
> lähtien Bogotán La Perseverancia -korttelissa on juhlittu vuosittain
> chicha-, maissi-, elämä- ja ilofestivaalia.

Faktat ja lähteet:
- Viisi nykyistä muisca-neuvostoa toimii: Suba, Bosa, Cota, Chía ja
  Sesquilé. — en-Wikipedia "Muisca" (21st century)
- Neuvostot perustivat yhteisen Cabildo Mayor del Pueblo Muiscan
  ensimmäisessä muiscojen yleiskongressissa Bosassa 20.–22.9.2002. —
  en-Wikipedia "Muisca" (21st century)
- Cotan yhteisö on elvyttänyt kvinoan viljelyä ja käy säännöllisesti
  vaihtokauppaa tuotteillaan; Suban muiscat vastustivat Tibabuyes-
  kosteikon kuivattamista ja tavoittelivat Juan Amarillo -kosteikon
  palauttamista. — en-Wikipedia "Muisca" (21st century)
- Chicha-oluen valmistus kiellettiin 1948 (isku muiscojen kulttuurille
  ja taloudelle), kielto kumottiin 1991, minkä jälkeen Bogotán La
  Perseverancia -korttelissa on juhlittu vuosittain "chichan, maissin,
  elämän ja ilon festivaalia". — en-Wikipedia "Muisca" (20th century)

---

## 3. Viisi jaksoehdotusta matkaoppaaseen

Faktat on valittu niin, etteivät ne toista osion 2 nostoja.

**Jakso 1 — "Perille ja liikkeelle"**

Nykyisin Bogotán lentokentän nimi kertoo tarinan, joka sai alkunsa
muiscojen mailla: kun kenttä valmistui 1959, sille etsittiin lyhyt ja
paikallista alkuperäiskulttuuria muistuttava nimi, ja valinnaksi tuli
El Dorado – sama legenda, joka houkutteli espanjalaisia turhaan kultaa
etsimään vuosisatoja aiemmin. Kaupungissa liikutaan nykyään pääosin
TransMilenio-pikabussijärjestelmällä, joka avattiin vuonna 2000 ja
kuljettaa arkisin noin kaksi miljoonaa matkustajaa. Vuoteen 2022
mennessä kaupunki oli koonnut yhden maailman suurimmista
sähköbussikalustoista Kiinan ulkopuolella, lähes 1 500 sähköbussia.

Faktat ja lähteet:
- Lentokentälle etsittiin vuoden 1959 valmistuessa lyhyttä, paikallista
  alkuperäiskulttuuria muistuttavaa nimeä, ja valittiin El Dorado;
  kenttä valmistui 28.10.1959. — en-Wikipedia "El Dorado International
  Airport" (History)
- TransMilenion ensimmäinen vaihe avattiin joulukuussa 2000. —
  en-Wikipedia "TransMilenio" (Construction and opening)
- Arkipäivän matkustajamäärä on n. 2 miljoonaa (2025); infoboxin
  mukaan järjestelmässä on 143 asemaa – HUOM: leipätekstissä (osio
  "Infrastructure") lukemaksi annetaan 152 asemaa 12 linjalla, eri
  kuin infobox; kirjoittajan kannattaa tarkistaa tuorein luku
  julkaisuhetkellä. — en-Wikipedia "TransMilenio" (infobox,
  Infrastructure)
- Vuonna 2022 Bogotá voitti toisen kestävän liikenteen palkintonsa;
  kaupungilla on 1 485 sähköbussin kalusto, yksi kolmesta suurimmasta
  Kiinan ulkopuolella. — en-Wikipedia "TransMilenio" (History)

**Jakso 2 — Alueen rakenne**

Bogotá makaa laakealla ylätasangolla, jota reunustavat idässä Andien
Itäinen Kordilleeri ja sen jyrkät Itäkukkulat – niiden rinteillä
kohoavat Monserrate ja Guadalupe. Kaupungin eteläpuolella, Sumapaz-
alueella, sijaitsee maailman laajin yhtenäinen páramo-ekosysteemi,
ainutlaatuinen korkean vuoriston kosteikkoluonto. Bogotá-joki halkoo
ylätasankoa koillisesta lounaaseen ja muodostaa kaupungin eteläpuolella
Tequendaman putoukset.

Faktat ja lähteet:
- Itäkukkulat reunustavat kaupunkia idässä ja rajoittavat sen kasvua;
  niillä kohoavat Guadalupe- ja Monserrate-vuoret. — en-Wikipedia
  "Bogotá" (Geography)
- Sumapaz-alueella sijaitsee maailman laajin yhtenäinen páramo-
  ekosysteemi (Sumapaz Páramo). — en-Wikipedia "Bogotá" (Geography)
- Bogotá-joki virtaa koillisesta lounaaseen halki ylätasangon ja
  muodostaa Tequendaman putoukset kaupungin eteläpuolella. —
  en-Wikipedia "Bogotá" (Geography)

**Jakso 3 — Arjen ilmiö: La Puerta Falsa**

Aivan presidentinpalatsin vieressä La Candelariassa toimii La Puerta
Falsa, yli 200 vuotta täyttänyt puoti, joka on erikoistunut
suklaajuomaan ja tamaleihin – sama arkinen herkkupari, jota
bogotalaiset ovat tarjonneet toisilleen sukupolvien ajan.

Faktat ja lähteet:
- La Puerta Falsa on yli 200-vuotias, suklaajuomaan ja tamaleihin
  erikoistunut puoti presidentinpalatsin vieressä La Candelariassa. —
  en-Wikipedia "La Candelaria, Bogotá" (Attractions)

**Jakso 4 — Historian käännekohta: Zipaquirán suolakatedraali**

Zipaquirán suolavuori on ollut arvokas jo ennen espanjalaisia: muiscat
louhivat halitiittia siellä jo 400-luvulla eaa., ja luonnontieteilijä
Alexander von Humboldt kuvaili kaivosta vieraillessaan paikalla 1801 –
hänen mukaansa se oli suurempi kuin mikään tuolloisista Euroopan
suolakaivoksista. 1930-luvulla kaivosmiehet veistivät käytäviin oman
rukoushuoneensa, ja siitä kasvoi 1954 vihitty ensimmäinen
suolakatedraali. Rakennelma jouduttiin sulkemaan turvallisuussyistä
1992, ja nykyinen, syvemmälle louhittu katedraali vihittiin käyttöön
1995.

Faktat ja lähteet:
- Muiscat louhivat halitiittia Zipaquirássa jo 5. vuosisadalta eaa.
  lähtien. — en-Wikipedia "Salt Cathedral of Zipaquirá" (History)
- Alexander von Humboldt kuvaili kaivosta 1801 vierailullaan ja piti
  sitä suurempana kuin ajan Espanjan, Sveitsin, Puolan tai Tirolin
  suolakaivoksia; suositteli avolouhinnan sijaan käytävälouhintaa. —
  en-Wikipedia "Salt Cathedral of Zipaquirá" (History)
- Kaivosmiehet veistivät käytäviin rukoushuoneen n. 1932; ensimmäinen
  suolakatedraali vihittiin 15.8.1954. — en-Wikipedia "Salt Cathedral
  of Zipaquirá" (Old cathedral)
- Rakennelma suljettiin turvallisuussyistä syyskuussa 1992
  rakenteellisten ongelmien takia; uusi, 200 jalkaa syvemmälle
  louhittu katedraali vihittiin 16.12.1995. — en-Wikipedia "Salt
  Cathedral of Zipaquirá" (Old cathedral, New cathedral)

**Jakso 5 — Milloin kannattaa tulla**

Bogotán sää pysyy lähes samana ympäri vuoden, joten sopivaa matka-
ajankohtaa kannattaa miettiä sateen, ei lämpötilan mukaan. Kuivimmat
kuukaudet ovat joulukuu, tammikuu, heinäkuu ja elokuu, sateisimmat
huhti-toukokuu ja syys-marraskuu. Kaupungin keskustassa (Kansallisessa
meteorologisessa observatoriossa mitattuna) sadetta kertyy vuodessa
noin 1 012 millimetriä, lentokentällä hieman vähemmän – ero syntyy
siitä, että mittauspisteet ovat eri puolilla ylätasankoa suhteessa
itäisiin vuoriin.

Faktat ja lähteet: ks. osio 5 (Säätiedot) — samat luvut, samat
lähteet.

---

## 4. Kymmenen kohdekartan kohdetta

**HUOM (spec-mantereet.md kohta 4 — kohdekartan keskusta valitaan
historiallisen ytimen mukaan, ei hallinnollisen koordinaattipisteen):**
Bogotán en-Wikipedian infobox-koordinaatti (4°42′40″N 74°4′20″W,
4,71111°N 74,07222°W) on kaupungin nykyisen hallinnollisen keskipisteen
piste, joka on n. 12,5 km POHJOISEEN historiallisesta ytimestä (Plaza de
Bolívar / La Candelaria) — Vancouverin ja San Franciscon ennakkotapausten
mukaisesti kartan ankkuriksi on valittu historiallinen ydin (Plaza de
Bolívar), EI infobox-koordinaattia. Etäisyydet alla ovat OMIA
LASKELMIANI koordinaattieroista (asteet × 111 km, pituusasteille
kerrottu cos(4,6°) ≈ 0,9968), tarkistettu Node-skriptillä; kaksi kauimmaista
kohdetta (Guatavita, Zipaquirá) ovat päiväretkikohteita eivätkä mahdu
samalle tiiviille zoomaustasolle kuin loput kahdeksan.

| # | Nimi suomeksi | Koordinaatit (desimaali) | Lähdeartikkeli | Etäisyys/suunta ankkurista (Plaza de Bolívar) |
|---|---|---|---|---|
| 1 | Plaza de Bolívar (historiallinen ydin, ankkuripiste) | 4,59806°N 74,07611°W | "Plaza de Bolívar" | (ankkuripiste) |
| 2 | Chorro de Quevedo (perustamispaikka 1538) | 4,59778°N 74,06972°W | "Chorro de Quevedo" | ~0,7 km itään |
| 3 | La Candelaria / Calle del Embudo | 4,59172°N 74,07413°W | "La Candelaria, Bogotá" | ~0,7 km etelään |
| 4 | Museo Botero | 4,59665°N 74,07323°W | "Museo Botero" | ~0,4 km kaakkoon |
| 5 | Museo del Oro (Kultamuseo) | 4,60192°N 74,07200°W | "Gold Museum, Bogotá" | ~0,6 km koilliseen |
| 6 | Museo Nacional (Kansallismuseo) | 4,61553°N 74,06901°W | "National Museum of Colombia" | ~2,1 km koilliseen |
| 7 | Monserrate | 4,60583°N 74,05639°W | "Monserrate" | ~2,3 km koilliseen |
| 8 | Parque Simón Bolívar | 4,65806°N 74,09389°W | "Simón Bolívar Park" | ~6,9 km luoteeseen |
| 9 | Laguna de Guatavita (päiväretki) | 4,97764°N 73,77500°W | "Lake Guatavita" | ~53,7 km koilliseen (Wikipedia itse ilmoittaa 57 km, ks. osio 7 kohta 5) |
| 10 | Zipaquirán suolakatedraali (päiväretki) | 5,01876°N 74,00930°W | "Salt Cathedral of Zipaquirá" | ~47,3 km pohjoiseen (Wikipedia ilmoittaa 49 km Bogotán yleispisteestä) |

**Rajausehdotus:** Kohteet 1–8 mahtuvat n. 3 km × 7 km alueeseen La
Candelarian ja Parque Simón Bolívarin välillä (tiiviimpi kuin
Vancouverin malli). Kohteet 9 ja 10 ovat n. 50 km päässä ja kannattaa
näyttää joko omalla zoomaustasollaan tai selkeästi merkittyinä
päiväretkikohteina — molemmat ovat kuitenkin olennainen osa `muisca`-
ja `historia`-sivujen nostoja (M3, jakso 4) eikä niitä pidä jättää
kartalta pois vain etäisyyden vuoksi.

---

## 5. Säätiedot

- **Historiallisen ytimen (Plaza de Bolívar) koordinaatit:**
  4,59806°N, 74,07611°W. — en-Wikipedia "Plaza de Bolívar"
- **Köppen-luokka:** Cfb (subtrooppinen ylänköilmasto, tasainen
  sademäärä ympäri vuoden). — en-Wikipedia "Bogotá" (Climate)
- **Lämpötila:** vuoden keskiarvo 14,5 °C (Kansallinen meteorologinen
  observatorio, 1971–2000: keskimääräinen päivän ylin 19,6 °C, ylin
  ja alin keskiarvo 9,0 °C); El Dorado -lentokentällä (1991–2020)
  hieman viileämpää, keskiarvo 13,9 °C. — en-Wikipedia "Bogotá"
  (Climate, molemmat säälaatikot)
- **Ennätykset:** virallinen korkein mitattu lämpötila 30,0 °C, alin
  −7,1 °C, molemmat Guaymaralin lentokentällä. — en-Wikipedia "Bogotá"
  (Climate)
- **Sademäärä:** Kansallisessa meteorologisessa observatoriossa
  (1971–2000) n. 1 012 mm/vuosi; El Dorado -lentokentällä (1991–2020)
  n. 877 mm/vuosi — ero johtuu siitä, että mittauspisteet sijaitsevat
  eri puolilla ylätasankoa suhteessa itäisiin vuoriin, jotka vaikuttavat
  sademäärään paikallisesti (sama ilmiö kuin Vancouverin
  ennakkotapauksessa). — en-Wikipedia "Bogotá" (Climate, molemmat
  säälaatikot)
- **Kuivimmat kuukaudet:** joulukuu, tammikuu, heinäkuu, elokuu.
  **Sateisimmat:** huhti-toukokuu ja syys-marraskuu. — en-Wikipedia
  "Bogotá" (Climate)
- **Usva:** tavallista lähes 220 päivänä vuodessa aamuisin. —
  en-Wikipedia "Bogotá" (Climate)
- **Raekuurot:** keskimäärin 3 kertaa vuodessa; 231 tapausta kirjattu
  1939–2008. — en-Wikipedia "Bogotá" (Climate)
- **HUOM:** samoin kuin muissa erän kaupungeissa, yllä olevat luvut
  ovat en-Wikipedian Climate-osiosta EIVÄTKÄ ole sama asia kuin pelin
  `saatiedot.js`-riville tarvittava ERA5 1991–2020 -normaali. Tarkat
  kuukausinormaalit haetaan kirjoitusvaiheessa
  `tools/hae-saanormaalit.mjs`-työkalulla.

---

## 6. Kuva-aiheet ja Commons-kategoriavinkit

Erityishuomio: Plaza de Bolívarin ja La Candelarian katukuvat ovat
usein täynnä ihmisiä ja turisteja — valitse kuvakulma joka näyttää
arkkitehtuurin tai toiminnan, ei yksilöityjä kasvoja. Muisca-aiheisissa
kuvissa vältä kaikkea, mikä esittää kansan vain historiallisena
kuriositeettina (esim. pelkkiä 1800-luvun kaiverruksia tai
etnografisia "tyyppikuvia") — tasapainota nykyaikaisilla kuvilla
neuvostojen toiminnasta, Cotan kvinoaviljelmistä tai chicha-
festivaalista, jos sellaisia löytyy Commonsista lisenssiehdot
täyttävinä.

**Avauskuvat (3), ehdotus:**
1. Plaza de Bolívar laajana yleiskuvana, katedraali ja Capitolio
   Nacional näkyvissä.
2. Monserrate kaupungin siluetin yllä, mieluiten kaukaa otettuna
   yleiskuvana.
3. La Candelarian värikkäät kadut (esim. Calle del Embudo) laajana
   katukuvana ilman tunnistettavia kasvoja.

**Kansikuvat (3), ehdotus:**
1. Bogotán siluetti Monserraten suunnasta tai kaukaa etelästä.
2. Plaza de Bolívar ilta- tai aamuvalossa.
3. Itäkukkulat ja kaupunki yhdessä kuvassa, esim. Guadalupen tai
   Monserraten suunnasta.

**Commons-kategoriat kuvahakuun (tarkistettu olemassaolo 23.8.2026
Commonsin hakurajapinnasta, srnamespace=14 — kategorioiden sisältö
pitää silti aina tarkistaa silmin lisenssisääntöjen mukaisesti):**
- `Category:Plaza de Bolívar` — Plaza de Bolívar, ympäröivät
  rakennukset
- `Category:La Candelaria` — La Candelaria, kadut, kolonial-
  arkkitehtuuri
- `Category:Chorro de Quevedo` — perustamispaikka
- `Category:Bogotá in the 19th century` — 1800-luvun historiallinen
  kuvasto, hyvä lähde isoisän aikakauden materiaalille
- `Category:Museo del Oro, Bogotá` — Kultamuseo, sisä- ja ulkokuvat
- `Category:Muisca raft` — kultainen uhrilautta (Kultamuseon
  näyttelyesine)
- `Category:Muisca` ja `Category:History of the Muisca` — yleiset
  muisca-aiheiset kategoriat
- `Category:Laguna de Guatavita` — Guatavita-järvi
- `Category:Museo Nacional de Colombia` — Kansallismuseo, myös
  `Category:Fachada del Museo Nacional de Colombia` julkisivukuviin
- `Category:Catedral de Sal` — Zipaquirán suolakatedraali
- `Category:Ciclovía en Bogotá` ja `Category:Bikeways in Bogotá` —
  ciclovía-tapahtuma ja pyöräkaistaverkosto
- `Category:Primate Cathedral of Bogota` — katedraali Plaza de
  Bolívarilla
- `Category:TransMilenio` — nykyinen joukkoliikenne

**Nosto-/jaksokuvat, aihe-ehdotuksia (ei tiedostonimiä):**
1. Historiallinen kuva tai piirros Plaza de Bolívarista 1800-luvulta
   (Primatial Cathedral -artikkelin galleriassa mainitaan mm. José
   Santos Figueroan maalaus vuodelta 1840 ja Santiago Castillo
   Escallónin maalaus 1844 — nämä ovat ajallisesti isoisän aikakautta
   edeltäviä, mutta samasta paikasta ja tunnelmasta; tarkista
   kummankin lisenssi ja alkuperäinen Commons-tiedosto erikseen).
2. Kansallismuseon rakennus (Panóptico) ulkoa tai sisältä.
3. Kultainen Muisca-lautta Kultamuseon näyttelyssä.
4. Guatavita-järvi ylhäältä tai rannalta kuvattuna.
5. Zipaquirán suolakatedraalin sisätila (veistetyt käytävät, risti).
6. Nykyaikainen kuva muisca-yhteisön toiminnasta (esim. Cotan
   kvinoaviljelmä tai neuvoston tilaisuus), jos Commonsista löytyy
   lisenssiehdot täyttävä kuva — muuten kirjoittajan kannattaa etsiä
   täydentävää kuvaa Flickristä (ks. kaupunkilehti.md, Flickr
   täydentävänä lähteenä -osio).
7. Ciclovía-tapahtuma sunnuntaiaamuna, laaja katukuva.
8. Monserrate köysiradalta tai huipulta kuvattuna, kaupunki alla.

---

## 7. Ristiriidat, epävarmuudet ja huomiot

1. **Neljä nostoa/jaksoa liikkuu lähellä visan aiheita, mutta ei anna
   vastausta suoraan.** Visa kysyy (a) korkeudesta n. 2 600 m, (b)
   ciclovíasta, (c) El Doradosta/Guatavitasta, (d) Zipaquirán
   suolakatedraalista. Nosto B2 käyttää täsmällistä korkeuslukua
   (2 640 m) ja lisää "suurin kaupunki maailmassa omalla
   korkeudellaan" -näkökulman, jota visa ei mainitse; nosto B3 antaa
   ciclovían täsmälliset luvut (120+ km, 2 miljoonaa käyttäjää, vuoden
   1995 hallintopäätös) visan ympäripyöreän kuvauksen sijaan; nostot
   M2–M3 käsittelevät El Doradoa muiscojen oman uskonnollisen
   näkökulman kautta (kullan pyhyys, kaksi löydettyä uhrilauttaa),
   eivät visan tapaan tarinana joka "sai eurooppalaiset kuolemaan
   sademetsässä"; jakso 4 käsittelee suolakatedraalia paljon
   visaa syvemmin (Muisca-louhinta 400-luvulta eaa., Humboldtin
   kuvaus 1801, kahden katedraalin historia).
2. **Kolumbian pääkaupunki-aihetta (visan ensimmäinen kysymys) ei ole
   käsitelty erillisenä nostona** — se on liian yleisluontoinen
   omaksi nostokseen ja tulee sivuutetuksi luontevasti johdannoissa.
3. **Smaragdiaihetta (visan toinen kysymys) EI ole käytetty
   yhdessäkään nostossa tai jaksossa.** Aihe on tarkistettu
   en-Wikipedian "Emerald"-artikkelista (Colombia on historiallisesti
   maailman suurin smaragdintuottaja; Muzo, Coscuez ja Chivor ovat
   kolme päälouhintapaikkaa; ns. trapiche-smaragdit ovat ainutlaatuisia
   Kolumbialle; 858 karaatin Gachalá-smaragdi löytyi 1967 ja on nyt
   Smithsonianissa) — jos kirjoittaja haluaa käsitellä aihetta, tämä
   materiaali on valmiina mutta ei ole vielä muotoiltu nostoksi eikä
   sijoitettu millekään ehdotetulle sivulle.
4. **Kansallismuseon rakennuksen (Panóptico) ajoitus on tarkistettu
   kahdesti**: suunniteltiin 1850, mutta rakennettiin vasta 1872 —
   tämä on peräisin suoraan "National Museum of Colombia" -artikkelin
   Building-osiosta eikä ole ristiriidassa muun aineiston kanssa,
   mutta luku kannattaa tarkistaa vielä kerran kirjoitusvaiheessa,
   koska se on koko `historia`-sivun vahvin 1873-kytkös.
5. **Guatavita-järven etäisyys Bogotásta vaihtelee lähteen mukaan.**
   "Lake Guatavita" -artikkeli ilmoittaa etäisyydeksi 57 km Bogotásta
   koilliseen; oma laskelmani historiallisesta ankkuripisteestä
   (Plaza de Bolívar) antaa n. 53,7 km. Ero selittyy todennäköisesti
   sillä, että Wikipedian luku on mitattu Bogotán yleispisteestä eikä
   La Candelariasta — molemmat luvut on kirjattu osioon 4, ei valittu
   vain toista.
6. **Zipaquirán suolakatedraalin etäisyys**: "Salt Cathedral of
   Zipaquirá" -artikkeli ilmoittaa 49 km Bogotásta pohjoiseen; oma
   laskelmani ankkuripisteestä antaa n. 47,3 km — sama pieni,
   selitettävissä oleva ero kuin Guatavitan kohdalla.
7. **TransMilenion asemamäärä ristiriitainen artikkelin sisällä**:
   infobox ilmoittaa 143 asemaa, mutta Infrastructure-osion
   leipäteksti puhuu 152 asemasta 12 linjalla. Käytetty infobox-lukua
   (143) jaksossa 1, ristiriita mainittu siinä kohtaa; kirjoittajan
   kannattaa tarkistaa tuorein luku ennen julkaisua, koska TransMilenio
   laajenee jatkuvasti.
8. **MST-tyyppistä epäselvyyttä ei tässä erässä ollut** — kaikki
   päivämäärät (Cabildo Mayor del Pueblo Muisca 2002, chicha-kielto
   1948–1991, pankit 1870–1883) tulivat yhdestä lähteestä ilman
   sisäistä ristiriitaa.
9. **Coordinates-rajapinta ja artikkelihaku vastasivat ajoittain
   429:llä** (sama ilmiö kuin Aasian- ja Vancouver-erissä) —
   uusintayritys kasvavalla viiveellä korjasi jokaisen haun, eikä
   yksikään koordinaatti tai artikkeli jäänyt puuttumaan.
10. **Vain en-Wikipediaa ja sen MediaWiki-rajapintaa sekä Wikimedia
    Commonsin hakurajapintaa (kategorioiden olemassaolon tarkistukseen)
    on käytetty.** Ei ulkopuolisia hakuja tämän faktapohjan sisältöön.
11. **Ei nykypolitiikkaa, huumekauppaa eikä väkivaltaa käsitelty.**
    1900-luvun levottomuudet (Bogotazo 1948, La Violencia, Palace of
    Justice -piiritys 1985) ja nykyaikaisemmat rikollisuus- ja
    politiikka-aiheet löytyvät en-Wikipedian "Bogotá"-artikkelin
    20th century- ja 21st century -osioista, mutta niitä ei ole
    nostettu tähän faktapohjaan tarkoituksella — ne eivät osu
    1873-painotukseen eivätkä spec-mantereet.md:n sisältölinjaukseen.
12. **Kaikki nostot ja jaksot on kirjoitettu valmiiksi suomenkieliseksi
    tekstiksi** merkkimäärävaatimusten mukaan (johdannot 215–228,
    nostot 472–648) ja tarkistettu koneellisesti Node-skriptillä.
