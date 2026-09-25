# Timbuktu — faktakoostaja, uusi kaupunkilehti

Lauta-id `africa`, kaupunki-id `timbuktu`, maa MLI, en-Wikipedia
"Timbuktu". Kaikki tiedot haettu en-Wikipedian raakatekstistä
(`index.php?action=raw`, `NODE_USE_ENV_PROXY=1`, uusinnat kasvavalla
viiveellä) **7.9.2026**. Malli ja mitat luettu tiedostoista
`tools/parvi/agentin-yhteiset-saannot.md`,
`tools/parvi/kaupunkilehti-ohje.md`, `tools/parvi/kohdekartta-ohje.md`,
`docs/aasia-tyoaineisto/lehtityo-resepti.md`,
`docs/moduulit/kaupunkilehti.md`, `docs/tyolista-opukselle.md` ja
`docs/mantereet-tyoaineisto/spec-mantereet.md`. Malli: Fesin ja
Lagosin lehdet (v1670).

Luetut lähdeartikkelit (en-Wikipedia, 7.9.2026): **"Timbuktu"**,
**"History of Timbuktu"**, **"Sankoré Madrasah"**,
**"Djinguereber Mosque"**, **"Sidi Yahya Mosque"**,
**"Timbuktu Manuscripts"**, **"Ahmad Baba al-Timbukti"**,
**"Ahmed Baba Institute"**, **"Mamma Haidara Commemorative Library"**,
**"Mohammed Bagayogo"**, **"Alexander Gordon Laing"**,
**"René Caillié"**, **"Heinrich Barth"**,
**"Ahmad al-Bakkai al-Kunti"**, **"Azalai"**, **"Tarikh al-Sudan"**,
**"Tarikh al-fattash"**.

## 0. Rajaus tälle lehdelle

**Malin maalehti (js/packs/maa-kategoriat.js, MLI) on jo tehty, ja sen
aiheita EI toisteta.** Maalehti kertoo: Sundiata ja Malin
keisarikunta, Kouroukan Fougan ulkoa opeteltu perustuslaki, **Mansa
Musan pyhiinvaellus ja kullan hinnan romahdus**, Songhain tuho
Tondibissa; **Taoudennin suolakylä**, tigadegena, fonio, néré-puu;
chiwara-antilooppi, bogolan-mutakangas, Seydou Keïta ja Malick Sidibé;
kora ja griot-suvut, Salif Keita, **Ali Farka Touré**, viisivuotias
lavalla; jalkapallo ja urheilu.

Karttanostot (`js/packs/maastokohteet-mli.js`: Hombori Tondo, Niger,
Senegal, **Djennén moskeija**, Dogonmaa, Askian hauta, Ségou, Baoulén
mutka, Médinen linnake, Sikasson tata, Bamako) ja skandaalit
(`js/packs/skandaalit.js`, MLI: **"Kirjat, jotka piilotettiin
koteihin"** — Timbuktun käsikirjoitusten evakuointi 2012–2013,
Ahmed Baba -instituutin palo, Abdel Kader Haidara, SAVAMA-DCI,
Mahmud Katin tähdenlennot elokuussa 1583, Platon-käännökset,
28-niteinen sanakirja) on luettu.

**TÄSTÄ SEURAA KOLME KOVAA RAJAUSTA:**

1. **Mansa Musan pyhiinvaellusta EI kerrota** — se on maalehden nosto.
   Mansa Musa mainitaan vain siltä osin kuin Djinguereberin moskeijan
   rakennuttaminen 1327 ja kauppareittien siirtyminen noin 1325 sitä
   vaativat.
2. **Vuosien 2012–2013 tapahtumia EI kerrota lainkaan** — koko
   käsikirjoitusten evakuointi on jo skandaalinostona, eikä peli
   käsittele nykysotia. Myöskään Mahmud Katin tähdenlentomerkintää
   1583, Platon-käännöksiä eikä al-Muhkam-sanakirjaa toisteta, koska
   ne ovat skandaalin omia yksityiskohtia.
3. **Taoudennin suolakylää ei kuvata** (maalehden nosto). Azalaista
   kerrotaan vain se, mikä koskee Timbuktua reitin päätepisteenä.

**Tämä lehti pysyy kaupungissa:** kaupungin synty ja nimi, azalai eli
suolakaravaani Timbuktun päätepisteenä, vuoden 1873 valtatilanne,
kaupungin outo suhde Niger-jokeen — sekä teemasivulla kirja- ja
oppineisuusperinne (Sankoré, käsikirjoitukset, Ahmad Baba, Leo
Africanus ja legenda).

**Kaupungin visat on luettu.** `js/packs/africa-questions.js`
(`timbuktu`, viisi kysymystä: maa Mali, Niger-joki, kuuluisuus
käsikirjoituksista, aavikon eteläreuna, käsikirjoitusten aiheet).
`js/packs/africa-kulttuuri.js` (`timbuktu.kysymys`): "Mistä Timbuktun
kirjastot ovat kuuluisia?" → vanhoista käsikirjoituksista.
**Vastauksen on siis löydyttävä lehdestä** (teemasivun nosto T2), ja
**minitehtävä ei saa kysyä yhtäkään näistä kuudesta**.

Olemassa olevat lohkot on luettu:
- `js/packs/africa-saapumiset.js` (`timbuktu`): **valmis, ei kosketa**
  (matkakirjateksti on omistajan päätöksellä tauolla).
- `js/packs/africa-kulttuuri.js` (`timbuktu`): litteä taulu
  (käsikirjoituskuva `Timbuktu-manuscripts-astronomy-mathematics.jpg`,
  Ali Farka Touré -linkki, suolakaravaanit). **EI kosketa** — sama
  ratkaisu kuin Nairobissa, Dakarissa ja Lagosissa. Kuvatiedosto on
  varattu eikä sitä käytetä lehdessä uudestaan.
- `js/packs/africa-valokuvat.js` (`timbuktu`): **ennen–nyt-pari on
  valmiiksi tarkistettu** (`Timbuktu, 1906.png`, PD, 1906 /
  `Sankore Mosque in Timbuktu.jpg`, upyernoz, CC BY 2.0), lisäkuvina
  `Timbuktu-139071.jpg` ja `Timbuktu-139085.jpg` (UNESCO Bureau of
  Mali). Nämä neljä tiedostonimeä ovat varattuja; ennen–nyt-pari
  kopioidaan lehteen sellaisenaan ja selitteet kirjoitetaan uusiksi
  yhdeksi virkkeeksi (Dakar-malli v1670).
- `js/packs/africa-artikkelit.js` (`Timbuktu`): lyhyt kolmivirkkeinen
  intro ja kolmiosainen artikkeli. **Intro kasvatetaan 7–10
  virkkeeseen** (Dakar- ja Kapkaupunki-malli); `artikkeli`-kenttä jää
  ennalleen.

**1873-KEHYS:** isoisän matkavuonna Timbuktu ei ollut minkään
eurooppalaisen vallan alla eikä oikeastaan minkään yhden vallan alla
lainkaan. Massinan valtakunta hallitsi kaupunkia **1826–1865**,
jolloin **Toucouleur-valtakunta** ajoi sen pois. Sen jälkeen tilanne
on lähteissä kiistanalainen (ks. tarkistus, kohta A): Elias N. Saad
(1983) esittää soninke-wangaroita, vuoden 1924 artikkeli tuaregeja, ja
John Hunwick kieltäytyy nimeämästä yhtä hallitsijaa ja puhuu useista
valtioista, jotka kilpailivat vallasta "varjomaisesti" vuoteen 1893.
Ranska liitti kaupungin itseensä vasta **15.12.1893**. Vuonna 1873
kaupungin merkittävin oma auktoriteetti, kunta-suvun sheikki
**Ahmad al-Bakkai al-Kunti** (1803–1865), oli kuollut kahdeksan
vuotta aiemmin, ja seuraavan eurooppalaisen kävijän (Oskar Lenz 1880)
matkaan oli seitsemän vuotta.

---

## 1. Nimi ja perustaminen

- Timbuktu on Malissa, **20 km Niger-joesta pohjoiseen** (johdanto;
  Geography-osio sanoo 15 km joen pääuomasta — ks. tarkistus, kohta B).
  Se on Tombouctoun hallintoalueen pääkaupunki; alueella oli vuoden
  2022 laskennassa noin miljoona asukasta.
- Kaupunki alkoi **kausiluonteisena leiripaikkana** ja muuttui
  pysyväksi **1100-luvun alussa**. Kaupan reittien siirryttyä,
  erityisesti **Mansa Musan käynnin jälkeen noin 1325**, Timbuktu
  kukoisti suolan, kullan ja norsunluun kaupalla.
- **Maghsharan-tuaregeja pidetään kaupungin perustajina** (Hunwick
  2003).
- **Nimen alkuperästä on ainakin neljä selitystä**, eikä yksimielisyyttä
  ole:
  1. *Songhai*: Leo Africanus ja Heinrich Barth johtivat nimen
     songhaista. Africanus: *tin* (muuri) + *butu* → "Butun muuri";
     hän ei selittänyt, mitä Butu tarkoittaa. Barth: "kaupunki
     nimettiin luultavasti siksi, että se rakennettiin alun perin
     hiekkakumpujen väliseen kuoppaan. *Tùmbutu* tarkoittaa
     songhaiksi koloa tai kohtua"; Barth torjuu tulkinnan "Buktun
     kaivo" sanoen, ettei *tin* liity kaivoon mitenkään.
  2. *Berberi*: malilainen historioitsija Sekene Cissoko: *tin*
     (paikka) + *bouctou* (pieni dyyni) → "pienten dyynien peittämä
     paikka".
  3. *Tarikh al-Sudan* (1600-luku, Abd al-Sadi): tuaregit tekivät
     paikasta tavaravarastonsa, ja se kasvoi tulijoiden ja
     lähtijöiden risteykseksi. Tavaroita vartioi heidän orjanaisensa
     nimeltä **Tinbuktu**, joka heidän kielellään tarkoittaa kyhmyä;
     siunattu leiripaikka nimettiin hänen mukaansa.
  4. *Zenaga* (René Basset): juuri *b-k-t* "olla kaukana" tai
     "piilossa" + feminiinipartikkeli *tin*.
- **Arkeologia ei ratkaise kysymystä**: vielä vuonna 2000 kaupungin
  rajojen sisältä ei ollut löytynyt 1000–1100-luvun jäännöksiä, koska
  kaivaminen metrien hiekkakerrosten läpi on vaikeaa. Kaupungin
  ulkopuolelta on löytynyt rautakautisia asuinpaikkoja: **9 km
  kaakkoon**, Wadi el-Ahmarin varrella, kaivettiin 2008–2010
  rautakautinen tell-kompleksi (Yalen yliopisto ja Mission Culturelle
  de Tombouctou). Paikka asutettiin **500-luvulla eaa.**, se kukoisti
  ensimmäisen vuosituhannen jälkipuoliskolla ja romahti 900-luvun
  lopulla tai 1000-luvun alussa. Susan ja Roderick McIntosh
  tunnistivat rautakautisia kohteita el-Ahmarin varrelta jo 1984.
- Kirjoitusasu on vaihdellut suuresti: *Tenbuch* Katalonian atlaksessa
  (1375), Antonio Malfanten *Thambet* (kirje 1447), Barthin *Timbúktu*.
  Ranska käyttää yhä muotoa *Tombouctou*; Caillién muunnos oli
  *Temboctou*.
- **"Täältä Timbuktuun ja takaisin"**: nimeä on pitkään käytetty
  vertauskuvana paikasta keskellä ei-mitään (Pelizzo 2001, artikkelin
  alaviite).

## 2. Vallanpitäjät

- Kulta-aika Malin keisarikunnan alla 1200- ja 1300-luvuilla.
  **Tuaregit** ottivat kaupungin lyhyeksi aikaa 1400-luvun
  ensimmäisellä puoliskolla, kunnes laajeneva **Songhai** liitti sen
  itseensä **1468**. Vuosina 1468–1469 monet oppineet lähtivät
  Walataan, kun Sunni Alin Songhai valtasi kaupungin.
- **1591**: marokkolainen armeija voitti Songhain Tondibin
  taistelussa ja teki Timbuktusta pääkaupunkinsa. Kaupunki vallattiin
  **30.5.1591**; retkikuntaa johti espanjalaissyntyinen muslimi
  **Judar Pasha**, ja sen lähetti Saadi-hallitsija **Ahmad
  I al-Mansur** kultakaivoksia etsimään. Valloittajat perustivat uuden
  hallitsevan luokan, **arma**-väen, joka **vuoden 1612 jälkeen** oli
  käytännössä riippumaton Marokosta.
- **1593** al-Mansur vetosi "epälojaaliuteen" ja pidätytti, tapatti
  tai karkotti suuren osan kaupungin oppineista.
- Rappio jatkui, kun Atlantin yli kulkevat kauppareitit veivät
  Timbuktulta aseman kaupan ja oppineisuuden keskuksena.
- 1700-luvulla valta vaihtui tiuhaan: tuaregit ottivat kaupungin
  tilapäisesti **1737**, ja loppuvuosisadan aikana eri tuaregiheimot,
  bambarat ja kunta-suku vuorotellen miehittivät tai piirittivät
  kaupunkia. Pashojen vaikutus ei kuitenkaan koskaan kokonaan
  kadonnut; he olivat avioliittojen kautta sekoittuneet songhaihin.
- **1826–1865 Massinan valtakunta**, sitten **Toucouleur-valtakunta**.
  Kuka hallitsi ranskalaisten tullessa, on lähteissä eri (ks. 0 ja
  tarkistus A).
- **15.12.1893** pieni ranskalaisjoukko luutnantti **Gaston Boiteux'n**
  johdolla liitti kaupungin. Timbuktusta tuli osa Ranskan Sudania.
- Väkiluku on laskenut voimakkaasti keskiajan arvioidusta
  huipusta, joka oli noin **100 000**.

## 3. Suola, kulta ja azalai

- Kaupungin vauraus ja koko olemassaolo perustui siihen, että se oli
  tärkeän Saharan-kauppareitin **eteläinen päätepiste**.
- Nykyään ainoa tavara, jota aavikon yli säännöllisesti kuljetetaan,
  ovat **kivisuolalaatat Taoudennin kaivoksilta**, jotka ovat
  **664 km Timbuktusta pohjoiseen**.
- 1900-luvun jälkipuoliskolle asti laatat kuljetettiin suurina
  suolakaravaaneina eli **azalai**na: yksi lähti Timbuktusta
  **marraskuun alussa**, toinen **maaliskuun lopussa**.
- Karavaanissa oli **useita tuhansia kameleja**, ja matka kesti
  **kolme viikkoa suuntaansa**. Menomatkalla vietiin ruokaa
  kaivosmiehille, paluumatkalla jokainen kameli kantoi **neljä tai
  viisi 30 kilon laattaa**.
- Suolakuljetusta hallitsivat suurelta osin arabiankieliset
  **berabich**-paimentolaiset. Teitä ei ole, mutta nykyään laatat
  tuodaan Taoudennista yleensä kuorma-autolla. Timbuktusta suola
  jatkaa veneellä muihin Malin kaupunkeihin.
- "Azalai"-artikkeli: reitti on tuaregikauppiaiden puolivuosittainen
  suolakaravaanireitti Timbuktun ja Taoudennin välillä, ja se on yksi
  Saharan viimeisistä yhä käytössä olevista karavaanireiteistä;
  kuorma-autot ovat suurelta osin korvanneet sen. **1940-luvulle asti**
  Taoudennin karavaaneissa oli tuhansia kameleja, ja ne lähtivät
  Timbuktusta viileän kauden alussa marraskuussa; pienempi karavaani
  lähti kuuman kauden alussa maaliskuussa.
- Aikoinaan reitti jatkui Taoudennin kautta **Taghazaan** ja siitä
  Saharan pohjoispuolelle Välimerelle. Karavaaneissa saattoi olla
  **jopa 10 000 kamelia**, ja ne veivät pohjoiseen kultaa ja orjia ja
  toivat etelään käsityötuotteita ja suolaa.
- Leo Africanus 1500-luvulla: "Asukkaat ovat hyvin rikkaita … Mutta
  suolasta on kova pula, koska se tuodaan tänne Tegazasta, noin 500
  mailin päästä Timbuktusta. Sattumalta olin kaupungissa aikaan,
  jolloin suolakuorma myytiin kahdeksallakymmenellä dukaatilla."

## 4. Joki, satama ja hiekka

- Timbuktu on **Saharan eteläreunalla, 15 km Nigerin pääuomasta
  pohjoiseen**. Kaupunkia ympäröivät hiekkadyynit ja kadut ovat
  hiekan peitossa.
- Satama **Kabara** on **8 km etelään**, ja se on yhteydessä joen
  haaraan **3 km:n kanavalla**. Kanava oli pahoin liettynyt, mutta se
  ruopattiin 2007 libyalaisrahoitteisessa hankkeessa.
- **Nigerin vuotuinen tulva** johtuu Nigerin ja Banin latvavesien
  rankkasateista Guineassa ja Norsunluurannikon pohjoisosassa. Sade on
  runsainta elokuussa, mutta tulvavesi kulkee hitaasti sisädeltan
  läpi: Koulikorossa (60 km Bamakosta alavirtaan) huippu on
  syyskuussa, **Timbuktussa tulva kestää pidempään ja on yleensä
  korkeimmillaan joulukuun lopussa**.
- Tulva-alue oli ennen laajempi: sateisina vuosina tulvavesi ulottui
  kaupungin länsilaidalle asti. Pieni purjehduskelpoinen puro
  kaupungin länsipuolella näkyy Heinrich Barthin 1857 ja Félix
  Dubois'n 1896 julkaisemissa kartoissa.
- Ranskalaiset kaivattivat **1917–1921** siirtomaakaudella kapean
  kanavan Timbuktusta Kabaraan orjatyövoimalla. Kanava liettyi ja
  täyttyi hiekalla, ja se kaivettiin uudestaan 2007, joten Nigerin
  tulviessa Timbuktu on taas yhteydessä Kabaraan.
- Kabara toimii satamana vain **joulu- ja tammikuussa**, kun joki on
  täydessä tulvassa. Muulloin veneet rantautuvat **Korioumé**hen,
  josta on **18 km** päällystettyä tietä Timbuktuun.
- **Maatalous**: sadetta ei ole tarpeeksi, joten viljelys kastellaan
  Niger-joesta. Päätuote on riisi. Perinteinen **kelluva riisi**
  (*Oryza glaberrima*) kylvetään sadekauden alussa (kesä–heinäkuu),
  jolloin kasvit ovat **30–40 cm** korkeita, kun tulva saapuu. Kasvi
  venyy jopa **kolmen metrin** korkuiseksi veden noustessa, ja riisi
  **korjataan kanootilla joulukuussa**. Sato on pieni ja työ hankalaa,
  mutta menetelmä ei vaadi pääomaa. Tulvaveden tuloa voidaan
  rajoitetusti ohjata pienillä savipenkereillä, jotka jäävät veden
  alle sen noustessa.
- Suurin osa riisistä kasvatetaan nykyään kolmella kastellulla
  alueella kaupungin eteläpuolella: **Daye (392 ha), Koriomé (550 ha)
  ja Hamadja (623 ha)**. Vesi pumpataan joesta **kymmenellä suurella
  arkhimedeen ruuvilla**, jotka asennettiin 1990-luvulla. Alueita
  hoidetaan osuuskuntina, ja noin **2 100 perhettä** viljelee pieniä
  palstoja; lähes kaikki riisi menee perheiden omaan käyttöön.
- **Ilmasto** on kuuma aavikkoilmasto (BWh). Kuumimpien kuukausien —
  huhti-, touko- ja kesäkuun — keskiylin ylittää 40 °C; keskiylin ei
  laske alle 30 °C yhtenäkään kuukautena. Weather box (WMO 1950–2000,
  ääriarvot Meteo Climat 1897–): tammikuun keskiylin **30,0** ja
  keskialin **13,0**; toukokuun keskiylin **42,2** ja keskialin
  **26,0**; vuoden keskiylin **36,8** ja keskialin **21,0**. Mitatut
  ääriarvot **49,0 °C** ja **1,7 °C**.
- Talvikuukausina puhaltaa kuiva ja pölyinen **harmattan** Saharan
  Tibestistä kohti Guineanlahtea; pöly rajoittaa näkyvyyttä
  ("Harmattan Haze"), ja laskeutuessaan se kasaa hiekkaa kaupunkiin.
- **Liikenne**: Malissa ei ole rautateitä Koulikoroon asti ulottuvaa
  Dakar–Niger-rataa lukuun ottamatta, joten Timbuktuun pääsee
  maanteitse, veneellä tai — vuodesta **1961** — lentäen. Kun vesi on
  korkealla elo–joulukuussa, COMANAV liikennöi matkustajalautalla
  Koulikoron ja Gaon välillä noin viikoittain; lisäksi kulkevat
  *pinassit* eli suuret moottoroidut ruuhet. Tieyhteydet
  naapurikaupunkeihin ovat hiekkateitä; uutta päällystettyä tietä
  rakennetaan Nionosta Timbuktuun (565 km). Timbuktun lentoaseman
  kiitorata on **2 110 m**, valaistu ja päällystetty.
- **Matkailu**: eniten kävijöitä marraskuun ja helmikuun välillä,
  kun ilma on viileämpi. 1980-luvulla majoitusta tarjosivat Hendrina
  Khan, Bouctou ja Azalaï; vuoteen 2006 mennessä pieniä hotelleja ja
  vierastaloja oli seitsemän. Kaupunki hyötyi 5 000 XOF:n
  matkailuverosta, käsityön myynnistä ja opastyöstä.

## 5. Oppineisuus ja Sankoré

- Timbuktu oli islamilaisen oppineisuuden maailmankeskus
  **1200-luvulta 1600-luvulle**, erityisesti Malin keisarikunnan ja
  Askia Mohammad I:n aikana.
- Kaupungin nopea kasvu 1200- ja 1300-luvuilla veti oppineita
  läheisestä **Walatasta**; kulta-aika oli 1400- ja 1500-luvuilla.
  **Timbuktulaisille lukutaito ja kirjat olivat vaurauden, vallan ja
  siunauksen merkkejä**, ja kirjojen hankkimisesta tuli oppineiden
  päähuolenaihe. Vilkas kirjakauppa Timbuktun ja muun islamilaisen
  maailman välillä sekä Askia Mohammedin vahva tuki johtivat tuhansien
  käsikirjoitusten kirjoittamiseen.
- Tieto koottiin samaan tapaan kuin varhaisessa, epävirallisessa
  eurooppalaisessa keskiaikaisessa yliopistossa. Opetus tapahtui
  epävirallisissa medresoissa. Nykyään "Timbuktun yliopistoksi"
  kutsuttuina kolme medresaa — **Djinguereber, Sidi Yahya ja
  Sankoré** — palvelivat 25 000 opiskelijaa.
- Toisin kuin Euroopassa, jossa yliopistot alkoivat opiskelijoiden ja
  opettajien yhdistyksinä, **länsiafrikkalaista opetusta rahoittivat
  suvut**; Timbuktussa merkittävimpiä olivat **Aqit**- ja
  **Bunu al-Qadi al-Hajj** -suvut, jotka myös majoittivat
  opiskelijoita omiin taloihinsa.
- Järjestelmä säilyi 1800-luvun loppuun. 1700-luvulla syntyi
  kiertävä koraanikoulu yleissivistävänä muotona: oppineet
  matkustivat oppilaineen alueella ja kerjäsivät ruokaa osan päivästä.
- **Sankoré-medresa** (myös Sankorén moskeija):
  - Perustettu **1300- tai 1400-luvulla** aghlal-heimoon kuuluneen
    **tuaregnaisen rahoituksella**. Sudano-saheliläinen tyyli
    poikkeaa Pohjois-Afrikan ja Andalusian moskeijoista.
  - Sijaitsi Sankorén kaupunginosassa, jossa asui suurin osa
    kaupungin berbereistä ja arabeista. Nimi tarkoittaa songhaiksi
    "valkoisia mestareita" tai "valkoisia ylimyksiä"
    (*san-koré*) — "valkoinen" viittaa vaaleaihoisiin
    sanhaja-berbereihin ja vastaa arabian sanaa *bidan*. Octave
    Houdas ja Maurice Delafosse (Tarikh al-fattashin kääntäjät):
    "ylimysten kaupunginosa".
  - Ibn Battuta kävi Timbuktussa **1352** ja totesi, että suurin osa
    asukkaista kuului sanhaja-berbereiden **massufa**-heimoon, mutta
    ei sanonut islamilaisesta oppineisuudesta mitään. Vuosisataa
    myöhemmin massufan **Aqit**-suku muutti Timbuktuun ja toi mukanaan
    syvän oppineisuusperinteen erityisesti islamilaisessa laissa.
  - **Kunnostettiin 1578–1582** Timbuktun ylituomarin, imaami
    **Al-Aqib ibn Mahmud ibn Umarin** toimesta: hän purki pyhäkön ja
    rakennutti sen uudelleen **Mekan Kaaban mitoilla**.
  - **Ei keskushallintoa, ei opiskelijaluetteloita, eikä määrättyä
    opinto-ohjelmaa.** Koulu koostui yksittäisistä oppineista
    (sheikeistä eli ulamasta), joilla kullakin oli omat yksityiset
    oppilaansa. Useimmat opiskelivat koko koulutuksensa ajan yhden
    opettajan johdolla, ja se saattoi kestää **kymmenen vuotta**.
    Opetus tapahtui joko moskeijassa tai opettajan kotona.
    **Opiskelijat rahoittivat opintonsa itse** rahalla tai
    vaihtotavaralla — toisin kuin muualla islamilaisessa maailmassa,
    jossa medresoja ylläpidettiin waqf-lahjoituksilla.
  - **1500-luvulla Timbuktussa oli 150–180 koraanikoulua** ja niissä
    arviolta **4 000–9 000 oppilasta**; varakkaista suvuista noin
    **200–300** pääsi jatkamaan medresaan ja saavutti ulaman aseman.
  - Sankorén pihaa käytettiin luokkahuoneena; rakennus oli savea ja
    puupalkkeja, ja se oli pienempi ja koristelultaan vaatimattomampi
    kuin Djennén suuri moskeija.
  - Nykytutkimus **torjuu** väitteen, että andalusialainen al-Sahili
    olisi rakentanut moskeijan; Länsi-Afrikan moskeijatyyli juontuu
    Saharan moskeijoista ja paikallisesta rakennusperinteestä, ja
    al-Sahilin vaikutusta pidetään myyttinä.
  - Sankorén oppineita pidettiin korkeatasoisina: Félix Dubois'n
    mukaan he "hämmästyttivät islamin oppineimmatkin miehet".
  - Kwame Nkrumah Ghanan yliopiston avajaisissa 1961: "Jos Sankorén
    yliopisto … olisi selvinnyt vieraiden hyökkäysten tuhoista,
    Afrikan akateeminen ja kulttuurihistoria olisi voinut olla toinen
    kuin se tänään on."
  - HUOM: "asteiden" ja turbaanien järjestelmä on artikkelissa
    merkitty *citation needed* -merkinnällä eikä sitä käytetä
    lehdessä (ks. tarkistus, kohta C).

## 6. Käsikirjoitukset ja kirjastot

- Vuosisatojen aikana Timbuktuun koottiin **satojatuhansia
  käsikirjoituksia**. Osa kirjoitettiin kaupungissa, osa — mukaan
  lukien varakkaiden sukujen omat Koraanin kappaleet — tuotiin
  vilkkaan kirjakaupan kautta.
- Käsikirjoituksia **piilotettiin kellareihin, haudattiin maahan ja
  kätkettiin moskeijan savimuureihin**, ja suojelijansa varjelemina
  monet selvisivät kaupungin rappion yli.
- Kokoelmissa oli **jopa 700 000 käsikirjoitusta vuonna 2003**
  (National Geographic News). Suurimmat kirjastot ovat Ahmed Baba
  -instituutti, Mamma Haidara, Fondo Kati, al-Wangari, Mohamed
  Tahar, Maigala, Boularaf ja Al Kounti. Näiden lisäksi arvioidaan
  olevan kaikkiaan **jopa 60 yksityistä tai julkista kirjastoa**,
  joista osa on vain hyllyrivi tai kirja-arkku. Kuivassakin
  ilmastossa käsikirjoitukset ovat alttiita vaurioille ja varkauksille.
- Jean-Michel Djian (The New Yorker): "suuri enemmistö
  käsikirjoituksista, noin viisikymmentätuhatta, on itse asiassa
  kolmessakymmenessäkahdessa **333 pyhimyksen kaupungin**
  sukukirjastossa."
- Paikalliset ovat *Time*-lehden haastattelussa sanoneet varjelleensa
  kolmeasataatuhatta käsikirjoitusta sukupolvien ajan; monet
  asiakirjat ovat yhä asukkaiden hallussa, eikä niitä haluta luovuttaa
  valtion ylläpitämälle instituutille, jossa on vain 10 %
  käsikirjoituksista.
- **Alexandra Huddleston** vietti 2007 Fulbright-apurahalla vuoden
  Timbuktussa valokuvaamassa perinteisen islamilaisen oppineisuuden
  perintöä. Kuvat ovat Yhdysvaltain kongressin kirjaston pysyvässä
  kokoelmassa, ja työstä on tehty elokuva *333 Saints: A Life of
  Scholarship in Timbuktu*.
- **Ahmed Baba -instituutti** (Ahmed Baba Institute of Higher
  Learning and Islamic Research):
  - Perustettu **1973**, rahoitus pääosin **Kuwaitista**. Nimetty
    1600-luvun timbuktulaisen oppineen mukaan.
  - Nykyisen rakennuksen suunnitteli **eteläafrikkalainen arkkitehti**;
    se valmistui **2009**, maksoi noin **5,8 miljoonaa euroa** ja on
    **4 600 m²**. Siinä on ilmastointi käsikirjoitusten säilytystä
    varten ja automaattinen sammutusjärjestelmä. Se korvasi
    40 vuotta vanhan rapistuneen rakennuksen.
  - Keskuksessa on noin **20 000 käsikirjoitusta**, muun muassa
    *Tarikh al-Sudan*. Suurin osa on 1300–1500-luvuilta ja arabiaksi,
    mutta joukossa on songhaita, tamashekia ja bamanankania sekä
    **yksi turkinkielinen ja yksi hepreankielinen**. Aiheina
    lääketiede, tähtitiede, runous, kirjallisuus ja islamilainen laki.
  - Kokoelmassa on 1800-luvun akrostinen runo *Tadkirat al-gāfilin…*
    ("Muistutus niille, jotka eivät huomaa uskovien erimielisyydestä
    aiheutuvia vahinkoja"), joka käsittelee rauhan saavuttamista
    Sokoton kalifaatin ja Bornun välillä; **Unesco liitti sen
    Maailman muisti -rekisteriin 2017**.
  - Digitointiohjelmaa on hoidettu Norjan ja Luxemburgin rahoituksella
    Unescon valvonnassa.
  - Ahmad Baban artikkelin mukaan instituutti on Timbuktun ainoa
    julkinen kirjasto ja siellä on **yli 18 000 käsikirjoitusta**
    (ks. tarkistus, kohta D: luku on eri kuin instituutin oman
    artikkelin 20 000).
- **Mamma Haidara -muistokirjasto**: yksityinen käsikirjoituskirjasto,
  jonka **Abdel Kader Haidara perusti 2000** isänsä muistoksi; noin
  **22 000 nidettä**. Kokoelman perusti 1500-luvulla **Mohamed El
  Mawlud**, ja hänen jälkeläisensä Haidara-suvussa säilyttivät
  käsikirjoitukset kotonaan vuoden 1591 marokkolaisvalloituksen
  jälkeen — kuten muutkin kaupungin oppineet suvut.
  (Kirjastoa EI oteta kohdekartalle: sille ei löytynyt sijaintia
  Wikipediasta, Overpassista eikä Nominatimista.)
- **al-Wangarin kirjasto**: nimetty oppinut **Mohammed Bagayogo
  Es Sudane Al Wangari Al Timbuktin** (1523–1593) mukaan.
  - Syntyi **Djennéssä 1523** kadi Mahmud Bagayogon poikana ja kuului
    **juula**-kansaan, mande-ryhmään, jossa oli kauppiaita ja
    oppineita.
  - Kun **Askia Daoud** pyysi häntä Djennén kadiksi kuten hänen
    isänsä oli ollut, hän kieltäytyi — kuten isänsä oli kieltäytynyt
    Askia Ishaq I:lle — ja piileskeli veljensä kanssa moskeijassa
    useita kuukausia ennen kuin pakeni opettajansa kanssa Timbuktuun.
  - Hänestä tuli **Ahmad Baban sheikki ja opettaja** Sankoré-medresassa.
  - **Vuoteen 1583 mennessä** hän oli niin merkittävä, että toimi
    Timbuktun **tosiasiallisena kadina** al-Qadi Aqib ibn Mahmud ibn
    Umarin kuoleman jälkeen ja antoi tuomioita **Sidi Yahyan moskeijan
    edessä**.
  - Kuoli **7.7.1593** Timbuktun vanhassakaupungissa. Hänet muistetaan
    oppineisuutensa lisäksi siitä, että hän kieltäytyi taipumasta
    marokkolaisille valloittajille. Merkittävä osa hänen
    kirjoituksistaan on säilynyt käsikirjoituksina Ahmed Baba
    -instituutissa; osa päätyi ranskalaisiin museoihin.
  - Kirjaston nimi ja olemassaolo: Mukhtar bin Yahya al-Wangarin
    artikkeli "Shaykh Baghayogho al-Wangari and the Wangari Library in
    Timbuktu" (teoksessa *The Meanings of Timbuktu*, 2010) on
    Bagayogon artikkelin lähdeluettelossa; "Timbuktu"-artikkeli
    luettelee al-Wangarin kirjaston kaupungin suurten kirjastojen
    joukossa ja linkittää sen juuri Bagayogoon.

## 7. Ahmad Baba al-Timbukti (1556–1627)

- Syntyi **26.10.1556 Araouanessa** sanhaja-berberien **Aqit**-sukuun.
  Muutti Timbuktuun nuorena ja opiskeli isänsä Ahmad ibn al-Hajj
  Ahmadin sekä oppineen **Mohammed Bagayogon** johdolla.
- Kirjoitti **yli 40 kirjaa**. Häntä pidetään kaupungin suurimpana
  oppineena ja vuosisatansa *mujaddidina* (uskonnon uudistajana). Hän
  oli Sankoré-medresan viimeinen kansleri.
- **Yksi ensimmäisistä kaupunkilaisista, jotka vastustivat Marokon
  valloitusta 1591.** Hänet karkotettiin **1594** Marokkoon
  syytettynä kapinoinnista, ja hän jäi **Fesiin** al-Mansurin
  kuolemaan asti. Seuraaja **Zaydan an-Nasser** salli maanpakolaisten
  palata. Ahmad Baba saapui takaisin Timbuktuun **22.4.1608** ja
  kuoli siellä **1627**.
- Karkotuksessa hän menetti **1 600 kirjan** yksityiskokoelmansa,
  joka oli yksi aikansa rikkaimmista kirjastoista.
- Suuri osa hänen tunnetuimmasta tuotannostaan syntyi Marokossa,
  muun muassa oppineen ja lakimiehen **Muhammad al-Maghilin**
  elämäkerta; M. A. Cherbonneau käänsi elämäkerrallisen muistiinpanon
  **1855**, ja siitä tuli yksi Länsi-Sudanin oikeushistorian
  päälähteistä. Hänen säilyneet teoksensa ovat yhä parhaat lähteet
  al-Maghilin ja häntä seuranneen sukupolven tutkimukseen.
- **1615** hän osallistui muiden muslimioppineiden kanssa keskusteluun
  orjuudesta ja pyrki suojaamaan muslimeja orjuutukselta. Hän
  arvosteli mustien afrikkalaisten samastamista orjiin ja erityisesti
  Haamin kirouksen käyttöä perusteluna.
  **RAJAUS:** Ahmad Baba ei kuitenkaan vastustanut orjakauppaa
  yleisesti. Lehdessä kerrotaan vain, että hän kirjoitti aiheesta ja
  mitä hän arvosteli; orjuuden oikeutusta koskevaa argumentointia ei
  käsitellä (Kunnioitus-pilari).
- Ahmed Baba -instituutti on nimetty hänen mukaansa (ks. 6), ja
  Merkuriuksen kraatteri kantaa hänen nimeään.

## 8. Kaupungin omat kronikat

- ***Tarikh al-Sudan*** (Sudanin historia), 1600-luvun kronikka, jonka
  kirjoitti timbuktulainen **Abd al-Sadi**. Se on yksi tärkeimmistä
  lähteistä Songhain valtakunnan ja Timbuktun historiaan; nimen
  neljäs etymologia ja orjanainen Tinbuktu ovat siitä. Yksi
  kappaleista on Ahmed Baba -instituutissa.
- ***Tarikh al-fattash*** on toinen suuri Timbuktun kronikka; Octave
  Houdas ja Maurice Delafosse käänsivät sen ranskaksi, ja heidän
  käännöksensä on lähteenä Sankorén nimen selitykselle.
  (Kronikan tekijyydestä ja kokoonpanosta on tutkimuksessa eri
  näkemyksiä — ks. tarkistus, kohta E; lehti ei ota kantaa
  tekijyyteen.)

## 9. Leo Africanus, Shabeni ja legenda

- **Leo Africanus** (s. El Hasan ben Muhammed el-Wazzan-ez-Zayyati,
  **Granadassa 1485**). Suku kuului tuhansiin muslimeihin, jotka
  Ferdinand ja Isabella karkottivat **1492**. He asettuivat
  **Marokkoon**, jossa hän opiskeli **Fesissä** ja seurasi setäänsä
  diplomaattimatkoilla ympäri Pohjois-Afrikkaa. Näillä matkoilla hän
  kävi Timbuktussa.
- Nuorena miehenä **merirosvot ottivat hänet vangiksi** ja esittelivät
  poikkeuksellisen oppineena orjana **paavi Leo X:lle**, joka vapautti
  hänet, kastoi hänet nimellä **Johannis Leo de Medici** ja tilasi
  häneltä italiaksi yksityiskohtaisen kuvauksen Afrikasta. Se oli
  eurooppalaisten pääasiallinen tiedonlähde maanosasta seuraavat
  vuosisadat.
- Hänen kuvauksensa Songhain huipulta: "Tombuton rikkaalla
  kuninkaalla on monta kultalautasta ja -valtikkaa, joista jotkin
  painavat 1 300 naulaa. … Hänellä on aina 3 000 ratsumiestä …
  ja suuri joukko oppineita, tuomareita, pappeja ja muita sivistyneitä
  miehiä, joita ylläpidetään runsaskätisesti kuninkaan kustannuksella."
- Africanuksen mukaan paikallista viljaa, karjaa, maitoa ja voita oli
  runsaasti, mutta kaupungin ympärillä ei ollut puutarhoja eikä
  hedelmätarhoja. Hän kuvasi myös arkisempia asioita, esimerkiksi
  "liidusta rakennettuja ja oljella katettuja mökkejä" — mutta niihin
  ei Euroopassa kiinnitetty huomiota.
- **Shabeni** (Asseed El Hage Abd Salam Shabeeny), tetuanilainen, tuli
  Timbuktuun 14-vuotiaana isänsä mukana hausojen hallitessa kaupunkia
  1700-luvun lopulla. Hän asui kaupungissa **kolme vuotta**, muutti
  Housaan, palasi ja asui vielä **seitsemän vuotta**. Hänen
  kertomuksensa kirjattiin Englannissa; James Grey Jacksonin
  *An Account of Timbuctoo and Hausa* (1820): "Timbuctoon kaupungin
  alkuperäisväestön voi laskea 40 000:ksi orjia ja ulkomaalaisia
  lukuun ottamatta." Hän kuvasi myös metsäistä ympäristöä, toisin kuin
  nykyinen kuiva maisema. Väkiluku oli silloin, vuosisatoja huipun
  jälkeen, kaksinkertainen 2000-luvun kaupunkiin verrattuna.
- **Maine muuttui rikkaasta salaperäiseksi**, ja tarinat Timbuktun
  upeasta rikkaudesta vauhdittivat Euroopan tutkimusmatkoja
  Afrikan länsirannikolle.

## 10. Eurooppalaiset tulijat (kohdekartan aineisto)

- **1788** joukko englantilaisia perusti **African Associationin**
  tavoitteenaan löytää kaupunki ja kartoittaa Niger. Ensimmäinen sen
  rahoittama matkaaja oli **Mungo Park** (lähti 1795 ja 1805); hänen
  uskotaan päässeen kaupunkiin, mutta hän kuoli nykyisen Nigerian
  alueella eikä ehtinyt kertoa havainnoistaan.
- **1824** pariisilainen **Société de Géographie** lupasi **9 000
  frangin** palkinnon ensimmäiselle ei-muslimille, joka pääsisi
  kaupunkiin ja palaisi tiedon kanssa. (Caillién artikkeli tarkentaa:
  palkinnossa oli mukana jäsenten lahjoituksia ja sen kokonaisarvo
  oli 9 025 frangia.)
- **Alexander Gordon Laing** (27.12.1794 – 26.9.1826), skotti, majuri:
  - Uskoi löytäneensä Nigerin lähteen ja ehdotti matkaa jokea pitkin
    sen suistoon. African Associationin puheenjohtaja **Joseph Banks**
    kannatti hanketta, ja siirtomaaministeri **Bathurst** määräsi
    Laingin matkaamaan Tripolin ja Timbuktun kautta.
  - Lähti Englannista helmikuussa **1825**; **14.7.1825** hän avioitui
    Tripolissa Britannian konsulin tyttären **Emma Warringtonin**
    kanssa ja lähti kaksi päivää myöhemmin Saharan yli.
  - Ghadames lokakuussa 1825, In Salah joulukuussa Tuatin alueella.
    **10.1.1826** hän lähti Tuatista kohti Timbuktua Tanezrouftin
    aavikon poikki.
  - Touko- ja heinäkuun kirjeissä hän kertoi kuumeesta ja siitä, että
    toinen tuaregiryhmä oli ryöstänyt karavaanin; hän kuvaa saaneensa
    **24 haavaa** taistelussa ja menettäneensä oikean kätensä. Hän
    liittyi toiseen karavaaniin ja pääsi Timbuktuun — **ensimmäisenä
    uuden ajan eurooppalaisena, joka ylitti Saharan pohjoisesta
    etelään**.
  - **21.9.1826** päivätty kirje kertoi hänen saapuneen kaupunkiin
    **18.8.1826** ja hänen asemansa olevan turvaton. Hän lähti
    kaupungista suunnittelemansa mukaisesti kolmen päivän kuluttua ja
    kuoli heti lähdön jälkeen. Papereita ei koskaan löydetty; appi
    **Hanmer Warrington** syytti ranskalaisia niiden hankkimisesta,
    mutta näyttöä ei ole koskaan ollut.
  - **Ranskan hallitus asetti 1903 laatan** taloon, jossa Laing
    Timbuktussa asui; laatassa on hänen nimensä ja käyntinsä päiväys.
    Talo on **Djingareiberin kaupunginosassa** vanhassakaupungissa, ja
    se julistettiin kansalliseksi kulttuuriperinnöksi asetuksella
    **18.12.1992**. Laing asui kaupungissa **38 päivää**.
  - Laing ja Caillié saivat kumpikin Société de Géographien kultamitalin
    vuodelta 1830.
- **René Caillié** (19.11.1799 – 17.5.1838), ranskalainen:
  - Halusi välttää aiempien retkikuntien vaikeudet ja matkusti
    yksin muslimiksi pukeutuneena. Hän vietti **kahdeksan kuukautta**
    Braknan paimentolaisten parissa nykyisen Mauritanian eteläosassa
    oppien arabiaa ja islamin tapoja. Kun rahoitusta ei tullut
    Ranskan eikä Britannian hallitukselta, hän teki töitä Sierra
    Leonessa ja rahoitti matkan itse.
  - Sairaus pidätti häntä Tiémén kylässä (nykyinen Norsunluurannikko)
    viisi kuukautta **3.8.1827–9.1.1828**. Djennéssä hän oli
    **11.–23.3.1828**.
  - Ensivaikutelma Timbuktusta: "Olin muodostanut aivan toisenlaisen
    käsityksen Timbuktun mahtavuudesta ja rikkaudesta. Kaupunki ei
    ensi näkemältä ollut muuta kuin joukko rumannäköisiä, savesta
    rakennettuja taloja."
  - Vietti kaupungissa **kaksi viikkoa** ja lähti **4.5.1828**
    karavaanin mukana, jossa oli noin **600 kamelia** (kirjan
    itinerary-osa sanoo 700–800 — ks. tarkistus, kohta F).
  - Palasi elävänä, sai **9 000 frangin palkinnon**, Kunnialegioonan
    ritariksi **10.12.1828** ja Société de Géographien kultamitalin
    **1830**. Matkakertomus *Journal d'un voyage à Temboctou et à
    Jenné* julkaistiin kolmena niteenä valtion kustannuksella 1830,
    toimittajana Edme-François Jomard.
  - Caillié on huomionarvoinen tapansa vuoksi: aikana, jolloin normi
    olivat sotilaiden tukemat suuret retkikunnat, hän opetteli vuosia
    arabiaa ja islamin tavat ja matkusti lopulta yksin paikallisten
    tavoin. Hänen käsityksensä Timbuktusta oli päinvastainen kuin
    Laingin: pieni, merkityksetön ja köyhä kaupunki ilman häivääkään
    siitä maineesta, joka sitä edelsi.
  - Talo, jossa Caillié Timbuktussa asui, on merkitty vuoden 1896
    Timbuktu-karttaan Djinguereberin ja Sidi Yahyan moskeijoiden
    väliin, ja Edmond Fortier julkaisi siitä postikortin 1905–06.
- **Heinrich Barth** (saksalainen), saapui Timbuktuun **7.9.1853**:
  - Richardsonin (maaliskuu 1851) ja Overwegin (syyskuu 1852) kuoltua
    Barth jatkoi tieteellistä tehtävää yksin. Palatessaan Tripoliin
    syyskuussa 1855 hänen matkansa oli ulottunut 24 leveys- ja 20
    pituusasteen yli, Tripolista Adamawaan ja Kamerunista Tšad-järvelle
    ja Timbuktuun — yli 12 000 mailia. Hän tutki tarkasti maastoa,
    historiaa, sivilisaatioita, kieliä ja luonnonvaroja.
  - Hän puhui sujuvasti arabiaa sekä fulania, hausaa ja kanuria ja
    tutki erityisesti Songhain historiaa. **Timbuktussa hänen
    ystävyytensä Ahmad al-Bakkai al-Kuntin kanssa johti siihen, että
    hän asui tämän talossa**; al-Kunti myös suojeli häntä
    kaappausyritykseltä.
  - **Ahmad al-Bakkai al-Kunti** (1803 Azawadissa – **1865
    Timbuktussa**) oli yksi viimeisistä kunta-suvun sheikeistä ja
    esikoloniaalisen Länsi-Sudanin viimeisiä merkittäviä
    sovittelevan linjan puolustajia suhteessa kristittyyn
    Eurooppaan. Hän kirjoitti Massinan hallitsijalle **Amadu III:lle**
    fatwan muotoisen kirjeen, jossa kiisti tämän oikeuden pidättää
    tai surmata Barth ja takavarikoida tämän omaisuus: kristitty ei
    ollut *dhimmi* eikä islamin vihollinen vaan ystävällismielisen
    maan (Britannian) kansalainen. Hänen laaja kirjeenvaihtonsa on
    harvinainen ikkuna 1800-luvun Länsi-Afrikan poliittiseen ja
    uskonnolliseen ajatteluun.
  - Barth arvosteli Caillién kuvaa Timbuktusta, jossa talot ovat
    erillään: "todellisuudessa kadut ovat kokonaan suljettuja, sillä
    asunnot muodostavat yhtenäisiä, katkeamattomia rivejä."
  - Barthin Timbuktun talosta on valokuva **vuodelta 1908, ennen sen
    sortumista** (Frobenius 1911).
- **Kolme eurooppalaista pääsi kaupunkiin ennen vuotta 1890**:
  Heinrich Barth 1853 sekä saksalainen **Oskar Lenz** ja espanjalainen
  **Cristobal Benítez 1880**. Yhdysvaltalainen merimies **Robert
  Adams** väitti käyneensä 1812, mutta uudempi tutkimus pitää
  epätodennäköisenä, että hän olisi koskaan käynyt kaupungissa.

## 11. Moskeijat (kohdekartan aineisto)

- **Djinguereber** (koyra chiinin *jiŋgar-ey beer*, "suuri
  moskeija"), myös Djingareyber:
  - **Rakennettu 1327** Mansa Musan aikana; artikkelin History-osio
    ajoittaa luomisen vuoteen 1325 (ks. tarkistus, kohta G).
  - Suunnittelu ja rakentaminen on perinteisesti luettu
    andalusialaisen oppineen **Abu Ishaq al-Sahilin** ansioksi; Ibn
    Khaldunin mukaan hän sai työstä **12 000 mithkalia kultahiekkaa**.
    Uudempi tutkimus torjuu tämän: al-Sahili on arabialaisissa
    lähteissä varmuudella vain Malin kaupungin kuninkaallisen
    audienssisalin suunnittelija, ja hänen roolinsa näyttää olleen
    organisoiva eikä rakenteellinen.
  - Pohjoisjulkisivun pieni osa vahvistettiin 1960-luvulla
    kalkkikivestä (*alhore*, jota käytetään laajalti muuallakin
    kaupungissa), ja minareetti on niin ikään kalkkikiveä
    savirappauksella. Muuten moskeija on kokonaan maata sekä
    orgaanisia aineita: kuitua, olkea ja puuta. Siinä on **kolme
    sisäpihaa, kaksi minareettia ja 25 pilaririviä** itä–länsi-
    suunnassa sekä rukoustila **2 000 hengelle**.
  - **Askia Daudin aikana Timbuktun kadi Aqib ibn Mahmud kunnosti
    moskeijan alkaen 1570**. Työ aiheutti kiistan askian ja kadin
    välillä, koska kadi paheksui kunnostetun moskeijan yhteyttä
    maalliseen valtaan.
  - Moskeija oli YK:n vaarantuneiden maailmanperintökohteiden
    listalla 1990 hiekan etenemisen takia. **Aga Khan Trust for
    Culture** aloitti nelivuotisen kunnostushankkeen kesäkuussa
    2006; ensimmäisessä vaiheessa (marraskuu 2006 – heinäkuu 2007)
    tehtiin kuivatus ja päällystys moskeijan ympärille, rapattiin
    seiniä uudelleen ja vaihdettiin noin puolet palkeista.
    **Alkuperäisiä puupalkkeja varten kasvaneet puut ovat kadonneet
    ilmastonmuutoksen myötä, joten palkkipuu on tuotava Ghanasta.**
    Katon korkeus on yhä metrin matalampi kuin 1952.
  - Runsaat sateet 1999, 2001 ja 2003 kaatoivat monia perinteisesti
    rakennettuja savirakennuksia; ilmastonmuutoksen odotetaan
    pahentavan uhkaa.
- **Sidi Yahyan moskeija** (myös Muhammad-n-Allahin moskeija):
  - Rakentaminen alkoi **1400** sheikki **el-Mokhtar Hamallan**
    johdolla ja valmistui **1440** — työ kesti 40 vuotta.
  - Kun tuaregit johtajanaan **Akil** ottivat Timbuktun **1433**,
    he antoivat päällikkyyden **Mohammed Naddille**, chinguettiläiselle
    sanhajalle, joka tilasi moskeijan.
  - **1441** kaupungin kuvernööri Mohamed Naddah nimitti läheisen
    ystävänsä **Sidi Yahya al-Tadelsin** sen ensimmäiseksi
    imaamiksi; hänet julistettiin myöhemmin pyhimykseksi ja hänen
    hautansa on moskeijassa. Se on vetänyt puoleensa kävijöitä,
    myös Ahmad Babaa.
  - Vuosista 1468–1583 tiedetään vain, että kadi el-Aqib kunnosti
    moskeijan 1569. **Moskeija rakennettiin olennaisesti uudelleen
    1939**, ja siitä on peräisin sen nykyinen ulkoasu.
  - **Matalat, koristeelliset ovet** kertovat marokkolaisesta
    vaikutuksesta ajalta, jolloin kaupunki oli maghsharan-tuaregien
    hallussa (noin 1400–1468). Rakennuksessa on katettu rukoussali,
    sisäpihoja, puuovia ja kaariaukkoja. **Yksi minareetti** nousee
    moskeijan ja pääpihan yli, mutta se ei yllä kaupungin kahden
    muun suuren moskeijan korkeuteen. Piha oli aikanaan hautausmaa,
    joka ei enää ole käytössä. **Moskeijan imaamit on haudattu
    rakennuksen pohjoispuolelle maan alle**, ja siellä luetaan ilta-
    ja aamurukoukset. Rakennuksessa on myös asunto moskeijan
    vartijalle, ja pienempää ulkopihaa käytetään lukutilana
    Muhammadin syntymäjuhlan aikaan.
  - Yhteisö on pitänyt Sidi Yahyaa paremmassa kunnossa kuin kahta
    muuta päämoskeijaa, mutta vuosien kuluminen, perustusten
    rapautuminen ja huono kuivatus ovat uhanneet rakennetta.
  - Prussin Labellen mukaan Sidi Yahyan arkkitehtuuri poikkeaa
    islamilaisen rakennustaiteen tavallisesta kosmologiapainotuksesta:
    savi, muta ja kivi korostavat maanläheisyyttä ja yhteyttä eläviin
    ja kuolleisiin esivanhempiin, joiden ruumiit lepäävät moskeijan
    sisällä.
- **Sankoré**: ks. luku 5.
- Kaikki kolme moskeijaa ovat Unescon **maailmanperintökohteita
  vuodesta 1988** (nro 119, kriteerit ii, iv, v). Joulukuun 1988
  istunnossa vanhastakaupungista valittiin **kolme moskeijaa ja
  16 mausoleumia tai hautausmaata**; valinnan mukana tuli vaatimus
  rakennusten suojelusta, uudisrakentamisen kiellosta kohteiden
  lähellä ja toimista etenevää hiekkaa vastaan. Aiempi ehdotus 1979
  kaatui rajauksen puutteeseen, koska Malin hallitus esitti koko
  kaupunkia. Kohde oli vaarantuneiden listalla **1990–2005**.

## 12. Kulttuuritapahtumat ja kieli

- Tunnetuin kulttuuritapahtuma on **Festival au Désert**. Kun
  tuaregikapina päättyi **1996** Konarén hallinnon aikana, poltettiin
  seremoniassa 3 000 asetta ("Rauhan liekki"), ja seremonian muistoksi
  rakennettiin monumentti. (Artikkelin päiväys tälle seremonialle on
  ristiriitainen — ks. tarkistus, kohta H; lehti ei käytä päivämäärää.)
- **Mawloud**-viikko pidetään joka tammikuu ja se juhlii Muhammadin
  syntymää: kaupungin "rakastetuimmat käsikirjoitukset luetaan
  julkisesti", ja se on juhlan keskeinen osa. Juhla oli alun perin
  shiialainen ja tuli Persiasta Timbuktuun noin **1600**. Se on
  "Timbuktun kalenterin iloisin tilaisuus" ja yhdistää sufilaisen
  islamin rituaalit kaupungin kirjallisen perinteen juhlintaan:
  "juhlimista, laulua ja tanssia … Se huipentui tuhansien ihmisten
  iltakokoontumiseen Sankorén moskeijan edessä olevalla suurella
  hiekka-aukiolla ja kaupungin arvostetuimpien käsikirjoitusten
  julkiseen lukemiseen."
- Kieli: bambara on Malin lingua franca, mutta Timbuktun asukkaiden
  suuri enemmistö puhuu **koyra chiiniä**, songhaikieltä, joka toimii
  myös kaupungin lingua francana. Ennen vuosien 1990–1994 kapinaa
  hassaniya-arabia ja tamashek olivat kumpikin noin 10 % ja koyra
  chiini 80 %. **Arabia tuli islamin mukana 1000-luvulla** ja on
  ollut lähinnä oppineiden ja uskonnon kieli — verrattavissa
  latinaan läntisessä kristikunnassa.

## 13. Kohdekartan kahdeksan kohdetta

Koordinaatit en-Wikipedian coordinates-rajapinnasta (Djinguereber,
Sidi Yahya, Sankoré, Ahmed Baba -instituutti) ja Overpassista
(kolme tutkimusmatkailijan taloa ja al-Wangarin kirjasto)
**7.9.2026**. Numerointi lännestä itään ja lopuksi pohjoiseen.

| # | kohde | lat | lon | koordinaatin lähde |
| --- | --- | --- | --- | --- |
| 1 | Djinguereberin moskeija | 16.77139 | −3.01000 | Wikipedia |
| 2 | Gordon Laingin talo | 16.77244 | −3.00873 | Overpass (monument) |
| 3 | René Cailliéen talo | 16.77233 | −3.00779 | Overpass (monument) |
| 4 | Sidi Yahyan moskeija | 16.77224 | −3.00713 | Wikipedia |
| 5 | al-Wangarin kirjasto | 16.77272 | −3.00659 | Overpass (library) |
| 6 | Heinrich Barthin talo | 16.77255 | −3.00625 | Overpass (museum) |
| 7 | Sankorén moskeija | 16.77589 | −3.00564 | Wikipedia |
| 8 | Ahmed Baba -instituutti | 16.77639 | −3.00528 | Wikipedia |

**HYLÄTYT EHDOKKAAT:** *Grand Marché* (Nominatim 16.77437,
−3.00710) — kaupungin päätorilla ei ole katetta en-Wikipedian
Timbuktu-artikkelissa, joten siitä ei kirjoiteta nähtävyysjuttua.
*Mamma Haidara -muistokirjasto* — artikkeli on olemassa, mutta
sijaintia ei löytynyt Wikipediasta, Overpassista eikä Nominatimista.
*Bibliothèque Fondo Kati* (Overpass 16.76885, −3.00163) — mainitaan
kirjastoluettelossa, mutta siitä ei ole kerrottavaa aineistoa.
*Musée d'Archéologie*, *Museum Almansur*, *Musée Manuscrit*,
*Monument des Martyrs*, *Flamme de la Paix* — ei katetta.

**Rajaus:** pohjoinen 16.7791, etelä 16.7693, länsi −3.0128, itä
−3.0026 → noin **1,09 × 1,09 km**. Reunoille jää joka suuntaan
210–320 metriä. Tiivis rajaus on tarkoituksellinen: vanhankaupungin
kohteet ovat 40–180 metrin päässä toisistaan, ja väljemmässä
ruudussa numeroympyrät menisivät päällekkäin (sama ratkaisu kuin
Fesissä v1670).
