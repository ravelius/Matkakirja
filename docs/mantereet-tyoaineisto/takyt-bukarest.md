# Täkyehdokkaat: Bukarest ja Romania

Työaineisto Viisaan Pöllön uteliaisuuskoukkuja varten (Raamattu, osio
"Fokusmoodi", kohta TÄKY). Sama malli kuin
docs/mantereet-tyoaineisto/takyt-ateena.md. Kaikki täkyt on tarkistettu
en-Wikipediasta (yhdessä kohdassa ro-Wikipediasta, merkitty erikseen)
hakemalla artikkelin raakateksti curlilla. Ei mitään muistinvaraista.

Tehty omistajan luvalla 25.8.2026 (Raamattu, Fokusmoodi: "SEURAAVAT
FOKUSMAAT ... Sofia, Istanbul, Sarajevo ja Bukarest tehdään YHTÄ
VALMIIKSI KUIN KREIKKA").

**Tila:** kartoitus. EI koodia, EI muutoksia olemassa oleviin
tiedostoihin. Fable valitsee, mitkä viedään peliin ja missä
sanamuodossa.

## Vuoden 1873 Romania — kehys, joka kannattaa pitää mielessä

Isoisän matkavuonna Romania ei ollut vielä itsenäinen. Wallakia ja
Moldavia olivat yhdistyneet 1859, Bukarestista tuli yhteinen pääkaupunki
1862 (en-Wikipedia "Bucharest", johdanto ja osio "History"), ja
maata hallitsi vuodesta 1866 saksalaissyntyinen ruhtinas Carol I —
mutta itsenäisyys tuli vasta vuosien 1877–1878 sodassa ja kuningaskunta
julistettiin 1881. Konkreettisesti tämä tarkoittaa, että 1873:

- Calea Victoriei oli vielä nimeltään **Podul Mogoșoaiei**; nykyinen
  nimi tuli 12.10.1878.
- **Colțean torni** seisoi vielä (purettiin 1888) — se oli ollut yli
  vuosisadan kaupungin korkein rakennus.
- **Dâmbovița-joki** ei ollut vielä kanavassa (kanavointi 1883), joten
  tulvat olivat tavallisia; edellinen suuri tulva oli 1865.
- **Constanța ja Tonavan suisto olivat yhä Ottomaanien valtakuntaa**
  (siirtyivät Romanialle 1878).
- **Peleșin linnan peruskivi laskettiin 22.8.1873** — täsmälleen
  isoisän matkavuonna.

## Tarkistustapa

- Wikipedia-artikkelit haettu komennolla
  `curl -sS -H "User-Agent: ..." "https://en.wikipedia.org/w/api.php?action=query&titles=<ARTIKKELI>&prop=extracts&explaintext=1&format=json&formatversion=2&redirects=1"`.
- Rajapinta vastasi toistuvasti 429:llä ("You are making too many
  requests"). Kaikki haut uusittiin kasvavalla viiveellä (3 s → 12 s →
  27 s → 48 s...) kunnes JSON tuli läpi. Yksikään alla oleva fakta ei
  ole muistista.
- **Koordinaatit** haettu erikseen `prop=coordinates`-rajapinnasta
  (en-Wikipedia), EI arvattu. Kaksi kohdetta jäi ilman rajapinnan
  koordinaattia (Cișmigiu, Szathmarin studio) — ne on merkitty "n." ja
  tarkistettava kartalta ennen käyttöä.
- **Kuvat:** jokaisen ehdotetun Commons-tiedoston olemassaolo, koko,
  lisenssi, tekijä ja päiväys on kysytty Commonsin `imageinfo`-
  rajapinnalta (`iiprop=size|extmetadata`). Ei arvattuja tiedostonimiä.
  Kaikki ehdotetut ovat PD, CC0 tai CC.

## Olemassa oleva Bukarest-sisältö repossa

`grep -ri "bukarest\|romania\|dracula" js/packs/` -katsaus:

- **js/packs/nahtavyysjutut.js** (rivit n. 6291–6580): seitsemän
  nähtävyysjuttua — Romanian ateneum (idea 1865, rahankeräys),
  Cișmigiun puutarha (avattiin 9/1847, Dura-lampi, Carl Meyer,
  sähkövalot 1882, Kirjailijoiden rotunda), Yliopiston aukio (1857),
  Stavropoleoksen kirkko, Vanha ruhtinaanhovi / Curtea Veche
  (rakennettu 1459, Brâncoveanun marmoriportaikko, myyty 1798),
  Parlamenttipalatsi, Antipan museo.
- **js/packs/kulttuuri-kategoriat.js** (rivit n. 13494–13780):
  "Matkailijan Bukarest" — kuusi sektoria, kulkukoirat, vuoden 1977
  maanjäristys, metro, sää; nostot: "Maailman painavin rakennus"
  (Parlamenttipalatsi), "Kirkko työnnettiin pois tieltä"
  (Iordăchescu, Schitul Maicilor 1982), "Makkara, jolta loppui kuori"
  (mititei).
- Avauskuvina Dâmbovița, Yliopiston aukio ja siluetti; yhtenä kuvana
  jo **Carol Szathmarin valokuva** (ilman että hänestä kerrotaan
  mitään — ks. täky 7).

**Johtopäätös:** ateneum, Cișmigiun perushistoria, Curtea Vechen
perustiedot, Parlamenttipalatsi, mititei, kirkkojen siirto ja vuoden
1977 järistys ovat JO KÄYTÖSSÄ. Alla olevat täkyt on valittu
välttämään päällekkäisyys näiden kanssa.

---

## Täkyt: Bukarest

### 1. Kaupunki mainittiin ensimmäisen kerran Draculan omassa asiakirjassa

Bukarest astuu historiaan 20. syyskuuta 1459, kun Wallakian ruhtinas
Vlad III — sama, jonka isänperintönimi Drăculea lainattiin myöhemmin
maailman kuuluisimmalle vampyyrille — kirjoitti slaavinkielisen
asiakirjan ja mainitsi siinä "linnoituksen" Bukarestissa, oman
ruhtinaallisen asuinpaikkansa. Vanhan ruhtinaanhovin rauniot ovat yhä
siinä, keskellä vanhaakaupunkia. Vlad oli antanut jo edellisenä vuonna,
13.6.1458, latinankielisen asiakirjan samalta seudulta.

- **Paikka:** Curtea Veche (Vanha ruhtinaanhovi), vanhakaupunki.
  44,43015°N, 26,10096°E (en-Wikipedia coordinates).
- **Lähde:** en.wikipedia.org/wiki/Curtea_Veche, osio "Voivode's
  Palace"; en.wikipedia.org/wiki/Bucharest, osio "History".
- **Lainaus/perustelu:** "He issued a Latin document on 13 June 1458
  from the area of current Bucharest. Then, on 20 September 1459, he
  issued a document in Slavonic, specifically referring to the
  'fortress' in Bucharest, his 'princely residence'." Bucharest-
  artikkeli: "First mentioned as the 'Citadel of București' in 1459,
  it became the residence of the ruler of Wallachia, Voivode Vlad the
  Impaler."
- **Kuva:** Commons **Vlad Ţepeş, the Impaler, Prince of Wallachia
  (1456-1462) (died 1477).jpg** (3698×4660, public domain,
  1500-luku) — kuuluisa Ambrasin muotokuva. Vaihtoehto paikasta:
  **Curtea Veche 1.jpg** (1800×1200, CC BY-SA 3.0 ro, Nicubunu).
- **Varmuus:** VARMA — suoraan lähteissä. HUOM: peli EI saa väittää,
  että Vlad "perusti" Bukarestin; lähde sanoo vain, että kaupunki
  mainitaan ensi kerran hänen asiakirjassaan ja että se oli hänen
  residenssinsä.

### 2. Katu, joka on nimetty Leipzigin mukaan — ja naapurikadut ammattien

Bukarestin vanhankaupungin pääkatu Lipscani ei ole nimetty
kenenkään mukaan vaan **kaupungin mukaan**: Lipsca oli 1600-luvun
romaniaksi Leipzig, ja *lipscan* tarkoitti kauppiasta, joka toi
tavaransa Länsi-Euroopasta. Ammattikunnilla oli omat katunsa, ja nimet
ovat yhä paikallaan: Blănari = turkkurit, Șelari = satulasepät.

- **Paikka:** Lipscani-katu ja -kortteli, aivan Curtea Vechen vieressä.
  44,43183°N, 26,10165°E.
- **Lähde:** en.wikipedia.org/wiki/Lipscani, osio "History".
- **Lainaus/perustelu:** "It was named after Leipzig (Lipsca in 17th
  century Romanian), as that was the origin of many of the wares that
  could be found on the main street. The word lipscan ... meant trader
  who brought his wares from Western Europe... even nowadays, the
  nearby streets bear the name of a trade (Blănari = Furriers street,
  Șelari = Saddlemakers street, etc.)."
- **Kuva:** Commons **Strada Lipscani 18-20 București (2023) - img
  06.jpg** (4032×3024, CC BY 4.0, Chainwit., 2023).
- **Varmuus:** VARMA — suoraan lähteessä.

### 3. Kaupungin komein katu oli tehty puusta

Nykyinen Calea Victoriei oli 1873 vielä nimeltään **Podul Mogoșoaiei**,
"Mogoșoaian puusilta": ruhtinas Constantin Brâncoveanu päällysti tien
puulla vuonna 1692, koska Balkanin tiet muuttuivat keväisin ja syksyisin
mudaksi. Puukatu oli aikansa suururakka ja kaupunkilaisten ylpeys —
vuonna 1775 sen varrella oli 35 bojaaritaloa. Se oli myös Bukarestin
ensimmäinen katu, jolla paloi öisin valo: kynttilävalaistus alkoi
heinäkuussa 1814. Nimen Calea Victoriei ("Voitonkatu") katu sai vasta
12. lokakuuta 1878, itsenäisyyssodan voiton jälkeen.

- **Paikka:** Calea Victoriei, 2,7 km Dâmbovițalta pohjoiseen.
  44,44208°N, 26,09405°E.
- **Lähde:** en.wikipedia.org/wiki/Calea_Victoriei, osio "History".
- **Lainaus/perustelu:** "In 1692, ruler Constantin Brâncoveanu paved
  the road with wood... Since 1692 it was known as Podul Mogoșoaiei...
  Most roads in the Balkans at that time became muddy in the spring and
  autumn, and the wood prevented this... 35 boyar houses were located
  on the road itself in 1775. Podul Mogoșoaiei was the first street in
  Bucharest to be illuminated with candles during the night, starting
  July 1814... In 1842 the road was paved with cobblestone... The road
  was renamed 'Calea Victoriei' on October 12, 1878."
- **Kuva:** ei tarkistettua 1800-luvun katukuvaa löytynyt tässä erässä.
  Lähin varmennettu: **Old photo of the intersection of Calea Victoriei
  and Strada Biserica Amzei, Bucharest, Romania.jpg** (1920×1407,
  public domain, 8.4.1925, A. Gh. Ebner) — HUOM: 1925, ei 1873.
- **Varmuus:** VARMA — suoraan lähteessä. Erinomainen 1873-kytkös:
  isoisä käveli kadulla, jolla oli vielä eri nimi.

### 4. Majatalo, jonka salongissa neuvoteltiin kahden imperiumin rauha

Hanul lui Manuc on Bukarestin vanhin yhä toiminnassa oleva
hotellirakennus. Sen rakennutti 1808 varakas ja värikäs armenialainen
liikemies Emanuel Mârzaian, joka tunnetaan paremmin turkkilaisella
nimellään **Manuc Bei**. Talossa käytiin Bukarestin rauhan (1812)
esineuvottelut, jotka päättivät Venäjän ja Ottomaanien sodan.
1800-luvun puolivälissä siellä oli 15 tukkukauppiasta, 23 kauppaa,
107 huonetta ja kapakka; vuonna 1842 se toimi hetken kaupungintalona,
ja noin 1880 sen salissa esitettiin Romanian ensimmäinen operetti.

- **Paikka:** Strada Franceză 62–64, Curtea Vechen vastapäätä.
  44,42944°N, 26,10194°E.
- **Lähde:** en.wikipedia.org/wiki/Manuc%27s_Inn (haettu nimellä
  "Hanul lui Manuc", uudelleenohjaus), osiot "Location" ja "History".
- **Lainaus/perustelu:** "The inn was built in 1808 as a khan, and
  originally owned by a wealthy and flamboyant Armenian entrepreneur,
  Emanuel Mârzaian, better known under his Turkish name Manuc Bei...
  15 wholesalers, 23 retail stores, 107 rooms... The inn was the site
  of the preliminary talks for the Treaty of Bucharest, which put an
  end to the 1806–1812 Russo-Turkish war. In 1842, it briefly housed
  Bucharest's town hall. Around 1880, a hall at the inn was used as a
  theatre, and was the site of the first Romanian operetta performance."
- **Kuva:** Commons **Hanul lui Manuc, 1860.jpg** (2808×1908, public
  domain, 1860, Dieudonné Lancelot) — kolmetoista vuotta ennen isoisän
  matkaa. Vaihtoehto: **Szathmary - Hanul lui Manuc.jpg** (843×720,
  public domain, 1867–1870, Carol Szathmari) — vielä lähempänä 1873:a.
- **Varmuus:** VARMA — suoraan lähteessä.

### 5. Torni, jonka rakensivat Kaarle XII:n sotilaat — ja joka katosi 1888

Colțean torni oli yli vuosisadan ajan Bukarestin korkein rakennus,
arviolta 54 metriä. Sen rakentamisessa 1709–1714 auttoivat **Ruotsin
kuninkaan Kaarle XII:n sotilaat**, jotka olivat paenneet Wallakiaan
Poltavan tappion jälkeen; ruhtinas Constantin Brâncoveanu majoitti
heidät. Sisäänkäynnin molemmin puolin oli maalattuna kaksi ruotsalaista
sotilasta, jalkaväkimies ja ratsumies, kiväärit olalla, ja tornissa oli
myös nyt kadonnut kirjoitus ruotsalaisten muraritöiden muistoksi.
Vuoden 1802 maanjäristys pudotti tornin huipun ja kellon; torni
purettiin kokonaan 1888 — eli **isoisä ehti nähdä sen**. Sen
1 700 kilon kello vietiin Sinaian luostariin.

- **Paikka:** Turnul Colței, Colțean sairaalan ja kirkon vieressä.
  44,43515°N, 26,10298°E.
- **Lähde:** en.wikipedia.org/wiki/Turnul_Col%C8%9Bei, osiot
  "Description" ja "History".
- **Lainaus/perustelu:** "The tower was built between 1709 and 1714,
  its construction being assisted by the Swedish soldiers of the army
  of King Charles XII, who had fled to Wallachia after the disastrous
  defeat at the Battle of Poltava... The tower was the highest building
  in the city for more than a century... estimated ... 54 metres...
  Two Swedish soldiers, an infantryman and a cavalryman, holding their
  carbines on the shoulder were painted on each side of the entrance...
  An earthquake on 14 October 1802 ... destroyed the top part of the
  tower, including its clock... In 1888, it was demolished completely...
  its 1,700 kg bell, was moved to the Sinaia Monastery."
- **Kuva:** Commons **Carol Popp de Szathmari - Colţa.jpg**
  (2592×3448, public domain, 1867, Carol Szathmari) — valokuva
  tornista **kuusi vuotta ennen isoisän matkaa**. Vaihtoehdot:
  **Aquarelle, Turnul Colţei.jpg** (2707×1786, PD, 1868, Amedeo
  Preziosi) ja **Photo of Turnul Colței, Bucharest, before the
  demolition...jpg** (2397×3339, PD, 1888).
- **Varmuus:** VARMA — suoraan lähteessä. Vahvin 1873-kytkös koko
  Bukarest-listalla yhdessä täkyjen 3 ja 7 kanssa.

### 6. Ruhtinas matkusti omaan valtakuntaansa väärällä passilla

Kun romanialaiset etsivät 1866 uutta hallitsijaa, valinta osui
preussilaiseen prinssiin Karliin. Ongelma oli, että Preussi ja Itävalta
olivat riidoissa eikä matka ollut turvallinen. Niinpä tuleva Carol I
matkusti **inkognito** junalla Düsseldorfista Sveitsin kautta
Baziașiin, ja sai matkalla sveitsiläiseltä virkamieheltä, perheen
ystävältä, sveitsiläisen passin nimellä **Karl Hettingen**. Baziașista
hän jatkoi laivalla Turnu Severiniin, koska rautatietä Romaniaan ei
ollut. Rajalla häntä vastassa oli poliitikko Ion C. Brătianu, joka
kumarsi ja pyysi häntä vaunuihinsa. Bukarestiin uusi ruhtinas saapui
10. toukokuuta 1866, ja Băneasassa hänelle ojennettiin kaupungin
avaimet.

- **Paikka:** Bukarestin keskusta / Băneasa (avaimet). Kaupungin
  koordinaatti 44,4325°N, 26,10389°E.
- **Lähde:** en.wikipedia.org/wiki/Carol_I_of_Romania, osio "En route
  to Romania".
- **Lainaus/perustelu:** "Karl travelled incognito by railroad from
  Düsseldorf to Baziaș, through Switzerland. He received there a Swiss
  passport from a Swiss public clerk, friend of his family, under the
  name of Karl Hettingen... As he crossed the border onto Romanian
  soil, he was met by Brătianu, who bowed before him... On 10 May 1866
  ... Karl entered the capital of Bucharest... In Băneasa he was given
  the keys to the capital city."
- **Kuva:** Commons **Entering of Carol I in Bucharest, 10 May
  1866.jpg** (794×460, public domain, 1866). Vaihtoehto tasan
  matkavuodelta: **Carol I, Elisabeta and Maria.jpg** (500×729, public
  domain, **1873**) — Carol I, kuningatar Elisabeth ja prinsessa Maria.
- **Varmuus:** VARMA — suoraan lähteessä.

### 7. Maailman ensimmäinen sotavalokuvaaja piti studiota Bukarestissa

Carol Popp de Szathmari (1812–1887) muutti Bukarestiin 18-vuotiaana ja
avasi kaupunkiin kaupallisen valokuvausstudion 1850. Häntä pidetään
romanialaisen valokuvauksen perustajana — ja **maailman ensimmäisenä
sotavalokuvaajana**: hän rakensi vaunuun pimiön märkälevyjen
kehittämistä varten ja kuvasi vuodesta 1853 Tonavan rannoilla sekä
turkkilaisia että venäläisiä joukkoja, komentajia ja linnoituksia
sodassa, joka tunnetaan Krimin sotana. Hänen asiakkainaan Bukarestin
studiossa oli molempien armeijoiden upseereita, ja juuri se avasi hänelle
pääsyn leireihin. Vuonna 1855 hän vei albuminsa Pariisin
maailmannäyttelyyn, sai toisen luokan mitalin, tapasi Napoleon III:n —
ja esitteli heinäkuussa kuvansa **kuningatar Victorialle** Osbornessa,
jolta sai kultamitalin. Vuodesta 1863 hän oli hovin virallinen maalari
ja valokuvaaja.

- **Paikka:** Bukarestin keskusta; studion tarkkaa osoitetta EI ole
  varmennettu. n. 44,4325°N, 26,10389°E (kaupungin koordinaatti).
- **Lähde:** en.wikipedia.org/wiki/Carol_Szathmari, johdanto ja osio
  "Career".
- **Lainaus/perustelu:** "He is seen as the founder of Romanian
  photography. He is also considered the world's first combat
  photographer... By 1850 he had mastered enough of the photographic
  process to open a commercial photographic studio in Bucharest...
  In 1853, using a wagon specially equipped with a dark room for
  processing glass plates with wet collodion, he went to the Danube
  river's banks... In July of the same year, he presented copies of his
  work to Queen Victoria during a private meeting at Osborne Castle,
  Isle of Wight, and she awarded him a gold medal."
- **Kuva:** Commons **Kırım Savaşı, Türk piyadeleri 1854 senesi.jpg**
  (377×503, public domain, 1854, Carol Szathmari) — yksi hänen
  Krimin sodan kuvistaan. Vaihtoehto: **Carol Popp de Szathmari -
  Colţa.jpg** (ks. täky 5).
- **Varmuus:** VARMA — suoraan lähteessä. Sano silti "häntä pidetään
  maailman ensimmäisenä sotavalokuvaajana", ei "hän oli" — lähde itse
  muotoilee asian näin ("is considered").
- **HUOM (halpa toteutus):** pelissä on JO Szathmarin valokuva
  (js/packs/kulttuuri-kategoriat.js, Bukarestin kuvat) ilman että
  hänestä kerrotaan mitään. Tämä täky antaa olemassa olevalle kuvalle
  tarinan.

### 8. Maailman ensimmäinen suuri öljynjalostamo oli tunnin matkan päässä

Ploieștistä 60 kilometriä Bukarestista pohjoiseen tuli 1857 maailman
öljyteollisuuden lähtöruutu: veljekset Mehedințeanu perustivat sinne
maailman ensimmäisen suuren mittakaavan öljynjalostamon, joka oli
täydessä toiminnassa 1856–1857. Kaupunki sai lempinimen "mustan kullan
pääkaupunki", ja ulkomainen pääoma virtasi sinne. Vuonna 1870 samassa
kaupungissa julistettiin lyhytikäinen "Ploieștin tasavalta" — alle
vuorokauden kestänyt liberaalien kapinayritys kuningashuonetta vastaan.

- **Paikka:** Ploiești. 44,94111°N, 26,0225°E.
- **Lähde:** en.wikipedia.org/wiki/Ploie%C8%99ti, johdanto ja osio
  "Industrial revolution and oil boom".
- **Lainaus/perustelu:** "The local economy shifted fundamentally in
  1857 with the opening of the world's first large-scale oil refinery...
  earning it the nickname 'Capital of Black Gold'... The Mehedințeanu
  brothers established the world's first large-scale oil refinery in the
  city, which became fully operational between 1856 and 1857... In 1870,
  the city became the epicentre of the Republic of Ploiești."
- **Kuva:** EI ehdotusta — tarkistin Ploiești-artikkelin kuvat, mutta
  1800-luvun jalostamosta ei löytynyt varmennettua Commons-tiedostoa
  tässä erässä. Tarkistettava erikseen kuvitusvaiheessa.
- **Varmuus:** VARMA väitteestä "maailman ensimmäinen suuren
  mittakaavan öljynjalostamo" ja vuosiluvusta (suoraan lähteessä).
  HUOM: älä sano "maailman ensimmäinen öljynjalostamo" ilman
  määrettä "suuren mittakaavan" — lähde käyttää tarkoituksella
  ilmausta "large-scale".

### 9. Puisto on nimetty vesipostien vartijan mukaan

Cișmigiun nimi ei tarkoita mitään romaniaksi: se tulee turkin sanasta
*ceșme*, julkinen vesiposti, ja *cișmigiu* oli virkamies, joka rakensi
ja huolsi kaupungin vesiposteja. Nimi jäi elämään yksinkertaisesta
syystä: siihen aikaan Bukarestin vesipostien hoitaja asui juuri tuolla
tontilla, talossa keskuslammen ja Sărindarin korttelin välissä.
Puiston vanhin osa oli viinitarha, joka oli istutettu vesilähteen
ympärille — lähde oli avattu vuoden 1795 ruttoepidemian aikana, kun
ruhtinas Alexander Mourousisin kaksi poikaa pakenivat tälle silloin
lähes asumattomalle alueelle.

- **Paikka:** Cișmigiun puutarha, pääsisäänkäynti Elisabeta-bulevardilta
  kaupungintalon edestä. **Koordinaattia ei saatu rajapinnasta**
  (en-Wikipedian artikkelilla ei ole coordinates-tietoa) — n. 44,436°N,
  26,089°E, tarkistettava kartalta.
- **Lähde:** en.wikipedia.org/wiki/Ci%C8%99migiu_Gardens, osio
  "History".
- **Lainaus/perustelu:** "The word cișmigiu comes from Turkish: a
  Ceșme is a public fountain and a cișmigiu (or cișmegiu) used to be
  the person responsible for building and maintaining public fountains.
  The name replaced older references to Dura, and was coined by the
  public because, at the time, the administrator of Bucharest fountains
  was living on park grounds, in a house located between the central
  lake and Sărindar quarter." Ja: "A part of the present-day gardens was
  occupied by a vineyard, which was planted around a water source: the
  latter had been tapped during the bubonic plague epidemic of 1795,
  when the two sons of Prince Alexander Mourousis took refuge in the
  largely uninhabited zone."
- **Kuva:** Commons **Angerer - Grădina Cişmigiu.jpg** (1200×833,
  public domain, **1856**, Ludwig Angerer) — puisto sellaisena kuin se
  oli 17 vuotta ennen isoisän matkaa, yhdeksän vuotta avaamisen jälkeen.
- **Varmuus:** VARMA — suoraan lähteessä. Täydentää pelissä jo olevaa
  Cișmigiu-juttua toistamatta sitä (pelissä on avausvuosi, Dura-lampi,
  Carl Meyer, sähkövalot ja Kirjailijoiden rotunda; nimen alkuperä ja
  ruttoviinitarha eivät ole pelissä).

### 10. Lasikattoinen kuja haarautuu kahtia, koska yksi hotellinomistaja kieltäytyi myymästä

Pasajul Macca-Vilacrosse on keltaisella lasilla katettu kauppakuja
Calea Victoriein ja Kansallispankin välillä. Sen kaksi haaraa ovat
kahden sisaren perua: kauppias Petros Seraphim osti paikalla olleen
Câmpineanun majatalon ja antoi sen myötäjäisiksi tyttärilleen —
Polixena nai 1843 Bukarestin kaupunginarkkitehdin Xavier Vilacrossen,
Anastasia taas Mihalache Maccan, joka rakensi omalle puolelleen
ylellisiä kauppoja. Kun kaupunki 1880-luvun lopulla halusi rakentaa
paikalle länsimaisen passaasin, keskellä tonttia seisoi Pesth-hotelli,
jonka omistaja **kieltäytyi myymästä** — niinpä arkkitehti Felix
Xenopol rakensi kujan haarukan muotoon hotellin molemmin puolin.
Kuja avattiin 1891, ja siellä toimi Bukarestin ensimmäinen pörssi.

- **Paikka:** Pasajul Macca-Vilacrosse, Calea Victoriein ja
  Lipscanin välissä. 44,43313°N, 26,09860°E.
- **Lähde:** en.wikipedia.org/wiki/Pasajul_Macca-Vilacrosse.
- **Lainaus/perustelu:** "Daughter Polixena married in 1843 Xavier
  Vilacrosse, Chief Architect of Bucharest... Daughter Anastasia
  married Mihalache Macca, who built luxury shops on their part...
  It was designed by architect Felix Xenopol, and opened in 1891.
  Because the central part of the site was occupied by the Pesht Hotel,
  which the owner refused to sell, the passage was executed as a
  two-tined, fork-like shape... Pasajul Macca-Vilacrosse hosted the
  first Stock Exchange House of Bucharest."
- **Kuva:** Commons **Ansamblul arhitectural Pasajul Macca-
  Villacrosse.jpg** (2848×2144, CC BY-SA 3.0 ro, Sanziana Gheorghe,
  2011). Vaihtoehto: **Bucharest - Pasajul Macca-Villacrosse
  (53704290500).jpg** (5012×3341, CC BY 2.0, Jorge Franganillo, 2024).
- **Varmuus:** VARMA — suoraan lähteessä. HUOM 1873: kujaa EI vielä
  ollut (avattiin 1891) — jos tämä nostetaan isoisän ääneen, se on
  pöllön nykypäivän huomio, ei matkakirjan muistiinpano.

### 11. Kaupunki, jonka nimi tarkoittaa iloa — mutta kukaan ei tiedä kenen mukaan

Romanialainen nimi București on alkuperältään todistamaton. Perinne
liittää sen Bucur-nimiseen henkilöön, joka on eri tarinoissa
**ruhtinas, lainsuojaton, kalastaja, paimen tai metsästäjä**. Romanian
sanavartalo *bucurie* tarkoittaa iloa, joten kaupungin nimi
käännetään usein "ilon kaupungiksi". Selityksiä on muitakin: ottomaani-
matkaaja Evliya Çelebi väitti nimen tulevan "Abu-Kariș"-nimisestä
miehestä, itävaltalainen Franz Sulzer johti sen 1781 sanasta *bucuros*
(iloinen), ja eräs 1800-luvun alun Wienissä julkaistu kirja arveli
nimen tulevan pyökkimetsästä ("Bukovie").

- **Paikka:** koko kaupunki. 44,4325°N, 26,10389°E.
- **Lähde:** en.wikipedia.org/wiki/Bucharest, osio "Etymology".
- **Lainaus/perustelu:** "The Romanian name București has an unverified
  origin. Tradition connects the founding of Bucharest with the name of
  Bucur, who was a prince, an outlaw, a fisherman, a shepherd or a
  hunter, according to different legends. In Romanian, the word stem
  bucurie means 'joy' ('happiness'), hence the city Bucharest means
  'city of joy'."
- **Kuva:** ei omaa kuvaa; käytä kaupunkikuvaa (pelissä on jo
  avauskuvat).
- **Varmuus:** VARMA siitä, että selitykset ovat näitä ja että alkuperä
  on todistamaton. Lähde sanoo tämän itse — täkyn koukku ON se, ettei
  kukaan tiedä.

### 12. Tulipalo söi kolmanneksen kaupungista — ja joki tulvi, kunnes se pakotettiin kanavaan

23. maaliskuuta 1847 Bukarestissa syttyi palo, joka nieli noin 2 000
rakennusta ja tuhosi kolmanneksen kaupungista. Isoisän matkatessa 1873
kaupunki oli siis vasta reilun 25 vuoden ikäisessä jälleenrakennuksessa
— ja lisäksi märkä: Dâmbovița-joki tulvi säännöllisesti (edellinen
suuri tulva 1865), ja se kanavoitiin vasta 1883. Samalla vuosisadan
jälkipuoliskolla kaupunkiin tulivat kaasuvalaistus, hevosraitiovaunut ja
ensimmäinen sähkö — ja tästä ylellisyydestä syntyi lempinimi "Idän
Pariisi", jonka Champs-Élysées oli Calea Victoriei.

- **Paikka:** koko kaupunki; Dâmbovița virtaa keskustan läpi.
  44,4325°N, 26,10389°E.
- **Lähde:** en.wikipedia.org/wiki/Bucharest, osio "History".
- **Lainaus/perustelu:** "On 23 March 1847, a fire consumed about 2,000
  buildings, destroying a third of the city." Ja: "During this period,
  gas lighting, horse-drawn trams, and limited electrification were
  introduced. The Dâmbovița River was also massively channelled in
  1883, thus putting a stop to previously endemic floods like the 1865
  flooding of Bucharest... won Bucharest the nickname of 'Paris of the
  East' (Parisul Estului), with the Calea Victoriei as its
  Champs-Élysées."
- **Kuva:** ei erillistä ehdotusta; pelissä on jo Dâmbovița-avauskuva.
- **Varmuus:** VARMA — suoraan lähteessä.

### 13. Asema kantoi väärää nimeä kaksikymmentä vuotta

Bukarestin päärautatieasema rakennettiin 1868–1872 ja peruskivi
laskettiin 10.9.1868 Carol I:n läsnä ollessa (tämä osa on jo pelissä).
Uusi tieto: ensimmäiset radat Roman–Galați–Bukarest–Pitești otettiin
käyttöön **13. syyskuuta 1872**, eli vain vuotta ennen isoisän matkaa —
ja asema oli silloin nimeltään **Gara Târgoviștei** viereisen
Calea Târgoviștei -tien mukaan. Nykyisen nimensä Gara de Nord se sai
vasta 1888.

- **Paikka:** Gara de Nord. 44,44637°N, 26,07421°E.
- **Lähde:** en.wikipedia.org/wiki/Bucharest_North_railway_station,
  osio "History".
- **Lainaus/perustelu:** "The original North railway station was built
  between 1868—1872. The foundation stone was placed on 10 September
  1868... The first railways between Roman – Galați – Bucharest –
  Pitești were put into service on 13 September 1872... The station was
  initially named Gara Târgoviștei, after the road nearby, Calea
  Târgoviștei (now Calea Griviței), and took its current name in 1888."
- **Kuva:** Commons **Bucharest - Gara de Nord (2023) - img 02.jpg**
  (3753×2815, CC BY 4.0, Chainwit., 2023). Historiallista kuvaa ei
  varmennettu tässä erässä.
- **Varmuus:** VARMA — suoraan lähteessä. Osittain päällekkäinen pelissä
  jo olevan tiedon kanssa (peruskivi 1868, nimenmuutos 1888); uutta on
  1872-käyttöönotto ja vanha nimi.

### 14. Hautausmaa, jossa kansallisrunoilija ja häntä pilkannut näytelmäkirjailija makaavat vierekkäin

Bellun hautausmaa on Bukarestin suurin ja tunnetuin, 28 hehtaaria,
käytössä vuodesta 1858. Sen synnystä kerrotaan yleisesti, että paroni
Barbu Bellu lahjoitti maan kaupungille — mutta **asiakirjat osoittavat
tarinan vääräksi**: maa myytiin kirkolle 1840, yli kymmenen vuotta
ennen kuin puistotöitä edes aloitettiin. Alue tunnettiin nimellä
"la Bellu" ("Bellulla"), koska paronin suvun puutarha oli suosittu
juhlapaikka. Samalla hautausmaalla lepäävät sekä Mihai Eminescu että
Ion Luca Caragiale.

- **Paikka:** Șerban Vodă / Bellun hautausmaa. 44,40389°N, 26,1°E.
- **Lähde:** en.wikipedia.org/wiki/Bellu_Cemetery, osio "Background"
  ja lista "Notable interments".
- **Lainaus/perustelu:** "A widespread myth is that Baron Bellu had
  donated the plot to the city council for building the cemetery, but
  documents show the land had been sold to the Church in 1840, more
  than a decade before landscaping work began. The cemetery has been in
  use since 1858... 28 hectares." Eminescu ja Caragiale ovat molemmat
  artikkelin haudattujen listalla.
- **Kuva:** Commons **Caragiale+Eminescu graves.jpg** (2592×1944,
  CC BY-SA 3.0, Joe Mabel, 2006) — juuri nuo kaksi hautaa.
  Vaihtoehto: **RO B Bellu cemetery entrance.jpg** (3648×2736,
  CC BY-SA 3.0 ro, Andrei Stroe).
- **Varmuus:** VARMA — suoraan lähteessä. HUOM: peli EI saa kertoa
  Eminescun ja Caragialen keskinäisistä väleistä mitään tämän lähteen
  perusteella; varmennettu on vain, että molemmat on haudattu sinne.
  Otsikko kannattaa siis muotoilla varovaisemmin, esim. "Hautausmaa,
  jonka syntytarina on väärä".

### 15. Synagoga, joka on tarkka kopio wieniläisestä

Bukarestin Kuorotemppeli (Templul Coral) rakennettiin 1864–1866, eli
se oli isoisän matkatessa seitsemän vuoden ikäinen. Se on hyvin tarkka
kopio Wienin Leopoldstadt-Tempelgassen suursynagogasta, joka oli
valmistunut 1855–1858. Tyyli on maurilaisuutta jäljittelevä
"Moorish Revival". Rakennus tuhottiin pahoin tammikuussa 1941, mutta
kunnostettiin 1945, ja päähalli avattiin uudelleen 2015.

- **Paikka:** Sf. Vineri 9–11. 44,43106°N, 26,1067°E.
- **Lähde:** en.wikipedia.org/wiki/Choral_Temple_(Bucharest),
  johdanto ja osio "History".
- **Lainaus/perustelu:** "Designed by Enderle and Freiwald and built
  between 1864 and 1866, it is a very close copy of Vienna's
  Leopoldstadt-Tempelgasse Great Synagogue, which had been built in
  1855–1858."
- **Kuva:** Commons **Templul Coral 01.jpg** (1536×2048, public
  domain, 2006, MM).
- **Varmuus:** VARMA — suoraan lähteessä.
- **IKÄSOPIVUUS:** artikkeli mainitsee myös tuhon tammikuussa 1941
  (Legionäärien kapina ja Bukarestin pogromi). Se on tosi ja
  13+-yleisölle kerrottavissa, mutta se EI kuulu kevyeen täkyyn —
  jos sitä käytetään, se kuuluu lehden vakavaan osioon, ei
  uteliaisuuskoukkuun.

---

## Eläintäkyt: koko Romania

Lisätty omistajan täydennysohjeen mukaan (25.8.2026): eläinjuttuja
tarvitaan, ne ovat kohdeyleisölle tärkeitä. Nämä eivät ole
Bukarest-täkyjä vaan koko maan, joten ne sopivat sekä pöllön
täkyvalikoimaan että fokuskohteiden pop-up-teksteihin
(erityisesti Tonavan suisto ja Karpaatit).

### E1. Yli 6 000 karhua — ja karhuille tehty metsä, jonne pääsee vain oppaan kanssa

Romaniassa elää yli 6 000 ruskeakarhua, yksi Euroopan suurimmista
keskittymistä. Zărneștin kaupungin laidalla, Piatra Craiului
-kansallispuiston kupeessa, on **Libearty-karhusanktuaari**: 69
hehtaarin metsäalue, jossa asuu yli sata karhua, jotka on pelastettu
vankeudesta tai kelvottomista oloista. Sinne pääsee vain opastetuille
kierroksille, tiistaista sunnuntaihin, eikä alle 5-vuotiaita päästetä
sisään.

- **Paikka:** Zărnești, Brașovin lääni (karhusanktuaari); karhukanta
  koko Karpaateilla. Zărneștin koordinaattia ei haettu tässä erässä —
  **tarkistettava ennen kartalle vientiä**.
- **Lähde:** en.wikipedia.org/wiki/Wildlife_of_Romania, osio
  "Carnivores" (karhuluku); **ro**.wikipedia.org/wiki/Zărnești
  (sanktuaarin tiedot).
- **Lainaus/perustelu:** en-Wikipedia: "There are over 6,000 brown
  bears living in Romania, in one of the largest concentrations in
  Europe." ro-Wikipedia: "Sanctuarul de urși Libearty, situat la
  marginea orașului Zărnești, este cel mai mare sanctuar de urși bruni
  din Europa. Acesta se întinde pe o suprafață de 69 de hectare și
  adăpostește peste 100 de urși salvați din captivitate sau condiții
  improprii. Vizitarea sanctuarului se face exclusiv în tururi ghidate,
  disponibile de marți până duminică, cu interdicție pentru copiii sub
  5 ani."
- **Kuva:** Commons **Carpathian Brown Bear (232367505).jpeg**
  (2048×1536, **CC0**, Costin Costan, 1.9.2017) — lähikuva
  karpaattilaisesta ruskeakarhusta metsässä. Sanktuaarista itsestään
  EI löytynyt Commons-kuvia (haku palautti tyhjän).
- **Varmuus:** VARMA karhuluvun osalta (en-Wikipedia).
  **EPÄVARMA/RISTIRIITA sanktuaarin superlatiivissa:** ro-Wikipedia
  sanoo **"Euroopan suurin ruskeakarhusanktuaari"**, ei maailman
  suurinta; en-Wikipediassa ei ole aiheesta artikkelia lainkaan
  (haku "Libearty Bear Sanctuary Zărnești" palautti "missing", ja
  en-Wikipedian "List of bear sanctuaries" ei mainitse sitä).
  **Peli saa sanoa korkeintaan "Euroopan suurin", ei "maailman
  suurin"**, ellei parempaa lähdettä löydy.
- **Ristiriita luvuissa (merkittävä):** en-Wikipedian "Brown bear"
  -artikkeli antaa Romanialle 5 000–6 000 karhua (vuoden 2010 tiedot),
  kun taas "Wildlife of Romania" sanoo "yli 6 000". Turvallisin
  muotoilu on **"noin kuusituhatta"** tai "5 000–6 000".
- **HUOM (raskaampi tausta, ei täkyyn):** sama artikkeli kertoo, että
  Romanian hallitus ilmoitti 2018 suunnitelmasta poistaa noin 2 000
  karhua, koska kanta ylittää arvioidun "optimikoon" (n. 4 000) ja
  kohtaamiset asutuksen kanssa ovat lisääntyneet; luonnonsuojelujärjestöt
  ja yleisö vastustivat. Tämä EI kuulu kevyeen eläintäkyyn, mutta
  Fablen on hyvä tietää se, ettei peli maalaa kuvaa ongelmattomasta
  idyllistä.

### E2. Joka toinen Euroopan pelikaani pesii samassa suistossa

Yli puolet Euraasian pelikaaneista (*Pelecanus onocrotalus*) pesii
Tonavan suistossa Romaniassa. Linnut saapuvat maaliskuun lopulla tai
huhtikuun alussa ja lähtevät pesinnän jälkeen syyskuun ja marraskuun
välillä. Suistossa on kesäisin yli 320 lintulajia, ja talvella siellä
talvehtii yli miljoona lintuyksilöä. Pelikaania mainitaan romanialaisessa
mediassa toisinaan maan kansallislintuna — mutta virallista päätöstä
siitä ei ole koskaan tehty.

- **Paikka:** Tonavan suisto. 45,2°N, 29,5°E.
- **Lähde:** en.wikipedia.org/wiki/Great_white_pelican (levinneisyys ja
  muuttoajat); en.wikipedia.org/wiki/Danube_Delta, osio "Main
  ecosystems" (lintumäärät); en.wikipedia.org/wiki/Wildlife_of_Romania,
  osio "Birds" (kansallislintuväite).
- **Lainaus/perustelu:** "More than 50% of Eurasian great white
  pelicans breed in the Danube Delta in Romania... The pelicans arrive
  in the Danube in late March or early April and depart after breeding
  from September to late November." Delta: "There are over 320 species
  of birds found in the delta during summer... Over one million
  individual birds ... winter here." Wildlife: "The great white pelican
  is sometimes mentioned in the media as being the national bird of
  Romania, despite the lack of any official decision in this regard."
- **Kuva:** Commons **Danube Delta 2024-09-25 - 47 - flock of Great
  white pelicans.jpg** (6000×4000, CC BY-SA 4.0, Joe Mabel, 2024) —
  parvi. Vaihtoehdot: **Lake Furtuna - 11 - pelican.jpg** (1144×742,
  CC BY-SA 4.0, Joe Mabel) yksittäisestä linnusta ja **Danube Delta
  pelican flying.jpg** (5184×3456, CC BY-SA 4.0, Diószegi Zoltán).
- **Varmuus:** VARMA — kaikki kolme väitettä suoraan lähteissä.
  Kansallislintuväite on lähteessä nimenomaan epävirallisena; kerro se
  juuri niin ("sanotaan, mutta ei ole virallisesti").

### E3. Neljätuhatta villihevosta oli määrä ampua — lehtijutut pelastivat ne

Tonavan suistossa, Letean metsässä ja sen ympärillä, elää hevoslauma,
joka on ollut siellä satoja vuosia ja joka on mahdollisesti Euroopan
viimeinen merkittävän kokoinen villihevoskanta. Kun kolhoosit
lakkautettiin 1990-luvulla, vapautetut hevoset liittyivät laumaan, ja
2000-luvun alkuun mennessä niitä oli noin 4 000 — niin paljon, että ne
uhkasivat suojeltua kasvillisuutta. Viranomaisten alkuperäinen
suunnitelma oli tappaa hevoset. Vuoden 2011 mediakohu ja yleisön
raivo saivat heidät perääntymään, ja kantaa säädellään nyt
ehkäisyrokotteilla.

- **Paikka:** Letean metsä, Tonavan suisto, Tulcean lääni. Suiston
  koordinaatti 45,2°N, 29,5°E; Letean tarkkaa pistettä ei haettu.
- **Lähde:** en.wikipedia.org/wiki/Wildlife_of_Romania, osio
  "Herbivores and omnivores".
- **Lainaus/perustelu:** "Romania is also home to the Danube Delta
  horses, a population of feral horses that has lived for hundreds of
  years in and around Letea Forest in the Danube Delta and is possibly
  the last sizable population of wild horses in Europe... it increased
  to around 4,000 individuals, turning them into a threat to the
  protected flora of the region. Following media and public outrage in
  2011, authorities walked back on the initial plan of killing the
  horses and the population is now controlled through birth-control
  vaccines."
- **Kuva:** Commons **Pădurea Letea Nature Reserve 021.jpg**
  (5908×3833, CC BY-SA 4.0, Joe Mabel, 26.9.2024) — neljä hevosta
  juoksemassa Letean luonnonsuojelualueella. Vaihtoehto:
  **Pădurea Letea Nature Reserve 003.jpg** (6000×4000, CC BY-SA 4.0,
  Joe Mabel) — laiduntava lauma.
- **Varmuus:** VARMA — suoraan lähteessä. Sano "mahdollisesti Euroopan
  viimeinen" ("possibly"), älä "Euroopan viimeinen".

### E4. Kaksituhatta ilvestä — ja Euroopan suurin yhtenäinen kanta

Romaniassa elää yli 2 000 eurooppalaista ilvestä, ja siihen sisältyy
suurin osa koko Karpaattien kannasta. Karpaateilla ilveksiä on noin
2 800, jaettuna kuuden maan kesken (Tšekki, Puola, Romania, Slovakia,
Ukraina ja Unkari) — se on **suurin yhtenäinen ilveskanta Venäjän rajan
länsipuolella**.

- **Paikka:** Karpaatit, koko Romania. Karpaattien vertailupiste:
  Moldoveanu 45,6°N, 24,73778°E.
- **Lähde:** en.wikipedia.org/wiki/Eurasian_lynx, osiot "Carpathian
  Mountains" ja "Romania".
- **Lainaus/perustelu:** "Carpathian Mountains: About 2,800 Eurasian
  lynx live in the mountain range, split between the Czech Republic,
  Poland, Romania, Slovakia, Ukraine and Hungary. It is the largest
  contiguous Eurasian lynx population west of the Russian border."
  Ja: "Romania: over 2,000 Eurasian lynx live in Romania, including
  most of the Carpathian population."
- **Kuva:** Commons **Radio tracking a Lynx lynx in Romanian
  Carpathians!.JPG** (3648×2736, CC BY-SA 3.0, Mylco, 2013) — orvoksi
  jäänyt ja kaksivuotiaaksi hoidettu ilves, joka vapautettiin
  radiopannalla varustettuna (kuvatekstin oma kuvaus).
- **Varmuus:** VARMA luvuista, MUTTA lähde itse varaa: "some experts
  consider these official population numbers to be overestimated".
  Kerro siis "virallisten arvioiden mukaan yli 2 000" ja mainitse, että
  osa tutkijoista pitää lukua liian suurena.

### E5 (varalla). Euroopan suurin lepakkokolonia asuu romanialaisessa luolassa

Romaniassa on 32 lepakkolajia. Huda lui Papară -luolassa Trascăun
vuoristossa on **Euroopan suurin tunnettu lepakkokolonia**, ja
Topolnițan luolassa Mehedințissä maanosan suurin isohevosenkenkäyökön
kolonia. Joissakin luolissa elää samassa systeemissä jopa 20 lajia.
Romaniassa elää myös jättiläisiltayökkö, Euroopan suurin ja
vähiten tutkittu lepakko — ainoa lepakkolaji, jonka tiedetään
säännöllisesti saalistavan lintuja.

- **Lähde:** en.wikipedia.org/wiki/Wildlife_of_Romania, osio "Small
  mammals".
- **Lainaus/perustelu:** "The bat population in Romania is particularly
  plentiful with 32 species present in the country. The Huda lui Papară
  cave in the Trascău Mountains is home to the largest known bat colony
  in Europe... Romania is also home to the greater noctule bat
  (Nyctalus lasiopterus), a rare species that is Europe's largest and
  least studied bat... it was also found to consume 'large numbers of
  migratory passerines', making it the sole bat species known to
  regularly prey on birds."
- **Kuva:** ei tarkistettua Commons-kuvaa tästä luolasta — tarkistettava
  erikseen, jos täky otetaan käyttöön.
- **Varmuus:** VARMA — suoraan lähteessä. "Suurin **tunnettu**"
  ("largest known") on lähteen oma varaus, pidä se mukana.

### E6 (varalla). Visentti hävisi 1700-luvulla — ja tuli takaisin

Euroopan visentti, maanosan suurin maanisäkäs, kuoli Romanian alueelta
sukupuuttoon 1700-luvulla. Vuonna 1958 Romania aloitti sen palautuksen
luonnonsuojelualueilleen ja 2000-luvulla myös vapaaseen luontoon —
yhdeksäntenä maana koko Euroopan yhteisessä ponnistuksessa, joka on
kasvattanut Euroopan visenttikannan **54 vankeudessa eläneestä
yksilöstä vuonna 1927 yli 7 000:een vuonna 2018**. Vuonna 2022
Romaniassa eli yli 200 visenttiä villeillä tai puolivilleillä alueilla.

- **Lähde:** en.wikipedia.org/wiki/Wildlife_of_Romania, osio
  "Herbivores and omnivores".
- **Lainaus/perustelu:** "The European bison, the largest European land
  mammal, became extinct in the region in the 18th century, However, in
  1958, Romania began the reintroduction of the bison into its nature
  reserves... the ninth country to do so as part of a continent-wide
  effort that saw the total number of bison in Europe go from 54
  captive individuals in 1927 to more than 7000 in 2018. In 2022, there
  were over 200 bison living in wild or semi-wild areas."
- **Kuva:** ei tarkistettua romanialaista visenttikuvaa tässä erässä.
- **Varmuus:** VARMA — suoraan lähteessä.

---

## LIVE-KAMERA: yksi ehdokas, EI vahvistettu toimivaksi

Omistaja pyysi merkitsemään, jos löytyy toimiva julkinen live-kamera
eläimistä. Tulos:

- **Ehdokas:** `https://explore.org/livecams/romania/bear-sanctuary`
- **Mitä tarkistin (25.8.2026):** osoite vastaa HTTP 200, ja sivun
  `<title>` on **"Bear Sanctuary | Romania | Live Cams | Explore.org"**
  ja meta-kuvaus "Watch Bear Sanctuary live cam at Romania on
  Explore.org." Sivu on siis olemassa explore.org-palvelun
  Romania-ryhmässä.
- **Mitä EN saanut vahvistettua:** sivun sisältö renderöityy
  selaimessa (Next.js), joten komentoriviltä ei näy, (a) onko
  videovirta juuri nyt päällä, (b) mikä sanktuaari on kyseessä — sanoja
  "Zărnești" tai "Libearty" EI esiinny sivun HTML:ssä lainkaan.
  explore.org:n julkinen API-osoite ei vastannut (404 /
  virhesivu).
- **Suositus:** kirjaa tämä ehdokkaaksi, ÄLÄ luvattavaksi ominaisuudeksi.
  Ennen käyttöä joku katsoo sivun selaimella (Chromium on polussa
  /opt/pw-browsers/chromium) ja varmistaa, että virta pyörii ja mikä
  paikka on kyseessä.
- **Tekninen upotus selvitetään erikseen** — tähän aineistoon ei kuulu
  arvio siitä, saako virran upotettua peliin (CSP, iframe-oikeudet,
  palvelun käyttöehdot).
- Muita eläinkameroita Romaniasta EI löytynyt tässä erässä. Erityisesti:
  Libearty-sanktuaarin omilta sivuilta (ampbears.ro, millionsoffriends.org
  — molemmat vastasivat HTTP 200) EN tarkistanut kameran olemassaoloa,
  koska sivujen sisältöä ei ehditty käydä läpi.

---

## Hylätyt ehdokkaat

- **"Bukarest oli maailman ensimmäinen kaupunki, joka valaistiin
  petrolilampuilla (1857)."** Laajalti toistettu väite. Tarkistin
  en-Wikipedian artikkelit "Bucharest" (koko teksti) ja "Ploiești" —
  kummastakaan EI löydy tätä väitettä. Varmennettu on vain, että
  maailman ensimmäinen suuren mittakaavan jalostamo avattiin
  Ploieștissä 1856–57 (täky 8). **Ei käyttöön ilman uutta lähdettä.**
- **Bukarest–Giurgiu-rata ja sen brittiläinen rakentaja.** Radan
  avausvuosi 1869 vahvistui ("The station was opened in 1869 as part of
  the Bucharest-Giurgiu railway", en-Wikipedia "Giurgiu railway
  station"), mutta rakentajan nimeä (usein mainittu John Trevor
  Barkley) EI löytynyt tarkistetuista artikkeleista. Käytä
  korkeintaan avausvuotta, älä rakentajaa.
- **Arcul de Triumf.** Varmentui hyvin (ensimmäinen kaari rakennettiin
  kiireellä puusta itsenäistymisen jälkeen 1878, jotta voittoisat
  joukot voisivat marssia sen ali; nykyinen kivikaari vihittiin
  1.12.1936, korkeus 27 m; en-Wikipedia "Arcul de Triumf"). Jätetty
  varapenkille, koska se on 1873-kehyksen ULKOPUOLELLA eikä tuo yhtä
  vahvaa koukkua kuin täkyt 3, 5 ja 7 — mutta on täysin kelvollinen,
  jos Bukarestin sisältöä laajennetaan.
- **Stavropoleoksen kirkko.** Jo pelissä (nahtavyysjutut.js).
- **Parlamenttipalatsin paino ja Ceaușescun purkutyöt.** Jo pelissä
  kahdessa paikassa (nahtavyysjutut.js ja kulttuuri-kategoriat.js).
- **Vuoden 1977 maanjäristys, kulkukoirat, mititei, kirkkojen siirto
  kiskoilla.** Kaikki jo pelissä.
- **Vlad Seivästäjän julmuudet yksityiskohtineen.** Lähde
  (en-Wikipedia "Vlad the Impaler") kuvaa ne suoraan, mutta ne
  rajataan pois Perustuslain ikäsopivuuskohdan mukaisesti samalla
  periaatteella kuin Ali-pashan julmuudet
  fokuskohteet-kreikka.md:ssä. Vladista käytetään vain: ensimmäinen
  maininta Bukarestista hänen asiakirjassaan (täky 1), nimen alkuperä
  ja Dracula-kytkös (takynostot-romania.md). Commonsin kuva
  "Impaled.gif" (1499) on nimenomaan pois suljettu.
- **Elena Ceaușescun väitetty tekaistu kemiantohtorius.** En hakenut
  artikkelia loppuun asti tässä erässä enkä siksi väitä siitä mitään.
  Aihe on lisäksi poliittisesti raskas ja lähellä nykypolitiikkaa —
  Fablen harkittava erikseen, jos se halutaan.

---

## Yhteenveto

**19 täkyä: 15 Bukarestista + 4 eläintäkyä (+2 varalla).**
Kaikki on tarkistettu lähteestä. Kolmessa kohdassa lähde itse varaa
sanansa (Szathmarin "considered", ilveskantojen mahdollinen
yliarviointi, Letean hevosten "possibly") — merkitty kohdittain.
Yksi kohta jäi kokonaan vahvistamatta ja on hylätyissä (petrolivalaistus
1857). Yksi superlatiivi on ristiriidassa omistajan taustaoletuksen
kanssa (Libearty: **Euroopan**, ei maailman suurin).

**Kolme parasta ehdotustani:**

1. **#5 — Torni, jonka rakensivat Kaarle XII:n sotilaat, ja joka
   katosi 1888.** Täydellinen fokusmoodin täky: konkreettinen,
   yllättävä ja **isoisä ehti nähdä sen, pelaaja ei koskaan voi**.
   Lisäksi siitä on olemassa Szathmarin valokuva vuodelta **1867** —
   kuusi vuotta ennen matkaa. Pohjoismainen kytkös (Poltava, Kaarle
   XII, ruotsalaiset muurarit maalattuna oveen) tekee siitä
   suomalaiselle pelaajalle poikkeuksellisen tarttuvan.
2. **#7 — Maailman ensimmäinen sotavalokuvaaja piti studiota
   Bukarestissa.** Halvin toteuttaa: pelissä on JO Szathmarin kuva
   ilman tarinaa, joten tämä täky antaa olemassa olevalle aineistolle
   sisällön ilman uutta kuvatyötä. Sisältää kaiken mitä täky tarvitsee:
   ammatti, jota ei vielä ollut olemassa, vaunuun rakennettu pimiö,
   molempien armeijoiden leirit — ja kultamitali kuningatar
   Victorialta, mikä sitoo tarinan suoraan brittipäähenkilön
   kotimaahan.
3. **#E3 — Neljätuhatta villihevosta oli määrä ampua, ja lehtijutut
   pelastivat ne.** Paras eläintäky: söpö aihe, mutta oikea tarina
   käänteineen (kolhoosit → 4 000 hevosta → tappopäätös → mediakohu →
   ehkäisyrokote), ja siitä on **CC BY-SA 4.0 -kuva juoksevista
   hevosista Letean metsässä**. Toimii sekä Tonavan suiston
   fokuskohteen pop-upissa että pöllön täkynä.

Kunniamaininnat: **#3 (puusta tehty pääkatu, jolla oli 1873 eri nimi)**
on paras puhtaasti 1873-kehykseen; **#10 (haarautuva lasikuja, koska
hotellinomistaja ei myynyt)** on lyhin ja iskevin; **#E1 (karhut)** on
tunnetuin ja siksi helpoin myydä pelaajalle — mutta sen superlatiivi on
korjattava "Euroopan suurimmaksi".
