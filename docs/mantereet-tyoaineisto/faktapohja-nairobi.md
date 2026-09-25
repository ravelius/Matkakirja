# Nairobi — faktakoostaja, uusi kaupunkilehti

Lauta-id `africa`, kaupunki-id `nairobi`, maa KEN, en-Wikipedia
"Nairobi". Kaikki tiedot haettu en-Wikipedian raakatekstistä
(`index.php?action=raw`, `NODE_USE_ENV_PROXY=1`, uusinnat kasvavalla
viiveellä) **6.9.2026**. Malli ja mitat luettu tiedostoista
`docs/aasia-tyoaineisto/lehtityo-resepti.md` (SITOVA),
`docs/moduulit/kaupunkilehti.md`, `docs/mantereet-tyoaineisto/
spec-mantereet.md` ja `docs/tyolista-opukselle.md` (paketti O9).

Luetut lähdeartikkelit (en-Wikipedia, 6.9.2026): **"Nairobi"**,
**"History of Nairobi"**, **"Nairobi National Park"**, **"Uganda
Railway"**, **"Matatu"**, **"Kenyatta International Convention
Centre"**, **"Kenya National Archives"**, **"Nairobi Gallery"**,
**"National Museums of Kenya"**, **"Nairobi Arboretum"**,
**"Jeevanjee Gardens"**, **"Alibhai Mulla Jeevanjee"**,
**"Nairobi Railway Museum"**, "University of Nairobi",
"Parliament Buildings (Kenya)", "Nairobi River".

**RAJAUS TÄLLE LEHDELLE (Fablen ohje 6.9.2026):** Kenian maalehti on
työn alla samaan aikaan. **Tämä lehti pysyy kaupungissa.** Koko maata
koskevat aiheet — Kenian juoksijat, Suuri hautavajoama laajana
ilmiönä, Masai Mara, teen ja kahvin viljely, swahilin kieli maan
kielenä, itsenäistyminen valtiollisena tapahtumana, Mau Mau -kapina
kansallisena liikkeenä — **jätetään maalehdelle**. Nairobin lehti
kertoo vain sen, mikä on tämän kaupungin omaa: paikka ennen
kaupunkia, ratatyömaan leiri, rutto ja jälleenrakennus, matatu-taide,
kaupungin rajalla oleva kansallispuisto, Wangari Maathain kaksi
kaupunkikamppailua ja keskustan kohteet.

Kaupungin visa on luettu tiedostosta `js/packs/africa-questions.js`
(avain `nairobi`, viisi kysymystä: Kenian pääkaupunki,
kansallispuisto kaupungin laidalla, Ugandan rata, korkeus n. 1 700 m,
sanan "safari" alkuperä). Kaikki viisi aihetta esiintyvät tässä
faktapohjassa. **Minitehtävä ei saa kysyä yhtään näistä viidestä.**
Ehdotus osiossa 7.

Olemassa olevat lohkot on luettu ristiriitojen varalta:
- `js/packs/africa-saapumiset.js` (`nairobi`): **HAVAITTU
  ANAKRONISMI.** Merkintä sanoo isoisän tulleen Nairobiin junalla
  ("Hän tuli junalla") ja nuoren Foggin katselevan hänen kiskojaan.
  Nairobia ei ollut olemassa 1873 — rata saapui **30.5.1899**.
  Sama ongelma on `js/packs/africa-questions.js`:n
  `nairobi`-huomiossa (`voice: 'isoisa'`), jossa isoisä puhuu
  rautatieasemasta. Näihin EI kosketa tässä erässä (matkakirjatekstit
  ja kohtaamiset ovat omistajan päätöksellä tauolla); asia raportoidaan
  Fablelle.
- `js/packs/africa-valokuvat.js` (`nairobi`): ennen–nyt-pari on valmis
  (sikhiläiset radanrakentajat 1903 / kirahvi ja Britam Tower) ja
  lisäkuvina höyryveturi rautatiemuseossa sekä kansallispuiston
  maisema. Nämä tiedostonimet ovat varattuja.
- `js/packs/africa-kulttuuri.js` (`nairobi`): kirahvi ja siluetti,
  matatu-taide, Ngũgĩ wa Thiong'o. Lehden nostot eivät saa toistaa
  näitä samoilla kuvatiedostoilla.
- `js/packs/africa-artikkelit.js` (`Nairobi`): lyhyt intro ja
  kolmiosainen artikkeli. **Intro on kasvatettava 7–10 virkkeeseen.**

**1873-KEHYS (omistajan tilaus 6.9.2026):** Nairobia **ei ollut
olemassa** isoisän matkavuonna. Paikka oli suoinen ylängön kohta,
jossa **maasait** paimensivat karjaansa, **akamba**-kauppiaat
kulkivat pitkän matkan reiteillään ja **kikujut** viljelivät
yläpuolisia metsäisiä rinteitä. Nimi tulee maasain ilmauksesta
'viileät vedet'. Ugandan radan rakentaminen alkoi Mombasasta
**1896**, rata saapui paikalle **30.5.1899** ja valmistui Kisumuun
**1901**. Kirjoittaja EI saa panna isoisää Nairobiin junalla; lehden
1873-kulma on nimenomaan se, että kaupunkia ei vielä ollut.

---

## 1. Sivuehdotukset

### Sivu A — id `kaupunki`, nimi "Nairobi"

**Johdanto (ehdotus, n. 240 merkkiä):**

> Nairobi on nuorin Afrikan suurkaupungeista: isoisän matkavuonna
> 1873 täällä oli vain viileä puro ja karjalaidun. Kaupunki alkoi
> ratatyömaan varikkona 1899 ja on nyt ainoa pääkaupunki, jonka
> rajalla on kansallispuisto.

### Sivu B — teemasivu, ehdotettu id `luonto`, nimi "Puisto kaupungin rajalla"

**Perustelu:** `luonto` on vakioaihe (`AIHE_IKONIT`, js/ui-apurit.js).
Aihe kantaa oman sivunsa: Nairobin kansallispuisto, Kitengelan
muuttokäytävä, sarvikuonojen suojelu, norsunluun poltto ja Wangari
Maathain kaksi kaupunkikamppailua (Uhuru Park ja Karuran metsä).

---

## 2. Kaupunkisivun nostot (4 kpl, 440–660 merkkiä)

### N1 — Enkare Nyirobi, viileät vedet

- Nairobin paikka oli alun perin **suomaata**, jolla asui
  paimentolaiskansa **maasait**, pitkän matkan kauppiasyhteisö
  **akamba** ja maanviljelijäkansa **kikujut** ("Nairobi", Early
  years; "History of Nairobi").
- Nimi tulee maasain ilmauksesta, joka tarkoittaa **'viileitä
  vesiä'** ja viittaa alueen läpi virranneeseen kylmään puroon.
  "Nairobi"-artikkeli antaa muodon **Enkare Nyirobi**, "place of
  cool waters"; "History of Nairobi" antaa muodon **Ewaso Nyirobi**.
  → RISTIRIITA, ks. tarkistus.
- Athin tasangoilla nykyisen kaupungin itä- ja eteläpuolella oli
  runsaasti riistaeläimiä. **Maasait elivät ja paimensivat karjaansa
  eläinten keskellä; kikujut viljelivät Nairobin yläpuolisia
  metsäisiä ylänköjä** ("Nairobi National Park", History).
- Kaupungin kasvaessa maasait siirrettiin väkisin, jotta valkoiset
  karjatilalliset saivat maan käyttöönsä ("History of Nairobi",
  Pre-independence). Kaupungin laajeneminen etelään suututti
  maasaita, ja kikujut vaativat maita takaisin.
- Sopimukset **1904 ja 1911** pakottivat maasait luopumaan kaikista
  pohjoisista laidunmaistaan Laikipian jyrkänteellä Kenia-vuoren
  lähellä; osa siirrettiin **Kitengelan** alueelle ("Nairobi
  National Park", Conservation).
- Nykyään Nairobia sanotaan epävirallisesti nimillä **"Green City in
  the Sun"** ja **"Safari Capital of the World"**.

### N2 — Rautakäärme ja mailin 327 leiri

- Ennen rataa oli **Mackinnon–Sclater-tie**, 600 mailin härkäkärrypolku
  Mombasasta Busiaan; sen rakentaminen alkoi **1890**.
- **Joulukuussa 1890** ulkoministeriön kirje valtiovarainministeriölle
  ehdotti radan rakentamista Mombasasta Ugandaan, jotta
  **orjakuljetukset** sisämaasta rannikolle katkeaisivat (Brysselin
  yleissopimus, heinäkuu 1890).
- **Elokuussa 1895** Westminsterissä säädettiin laki radan
  rakentamisesta. Pääinsinööri oli **George Whitehouse** (1895–1903).
  Rakentaminen alkoi Mombasasta **1896** ja päättyi Kisumuun
  Victoriajärven itärannalla **1901**. Alkuperäisen radan pituus oli
  **660 mailia**, ja se kulki kokonaan nykyisen Kenian alueella,
  vaikka nimi on Ugandan rata. Raideleveys oli metri.
- **Aineistot tuotiin Intiasta:** 200 000 kolmenkymmenen jalan
  kiskoa, 1,2 miljoonaa ratapölkkyä, 200 000 sidekiskoa, 400 000
  pulttia ja 4,8 miljoonaa teräskiilaa.
- **Työvoima:** yli **30 000** työntekijää värvättiin Brittiläisestä
  Intiasta, enimmäkseen Punjabista ja Gujaratista, erityisesti
  sikhejä ja gujaratilaisia. Värväys johdettiin Karachista, Lahore
  oli päävärväyskeskus. Sopimus lupasi 12 rupiaa kuussa, ruoan,
  sairaanhoidon ja paluumatkan. Historioitsijat korostavat oloja:
  *"deplorable living conditions, low wages, and hazardous working
  conditions"* (Aselmeyer). Sairaudet, maanvyörymät, räjähdykset ja
  putoamiset veivät **arviolta useita tuhansia** intialaisia
  työntekijöitä. Monet jäivät sopimuksen jälkeen alueelle kauppiaiksi,
  käsityöläisiksi ja konttoristeiksi — siitä syntyi Itä-Afrikan
  pysyvä intialaisyhteisö.
- Radan työjärjestys loi rodullisen hierarkian: eurooppalaiset
  johtoon ja tekniikkaan, intialaiset konttoristeiksi, käsityöläisiksi
  ja työnjohtajiksi, afrikkalaiset raskaimpiin ja huonoimmin
  palkattuihin töihin.
- **Nandi-kansan vastarinta** hidasti rakentamista vuosisadan
  vaihteessa; johtaja oli **Koitalel Arap Samoei**.
  Vanha nandi-ennustus (orkoiyot Kimnyolei): *"An iron snake will
  cross from the lake of salt to the lands of the Great Lake to
  quench its thirst"* — siitä radan nimitys **rautakäärme**.
- Rataa haukuttiin parlamentissa **"Lunatic Line"** -nimellä;
  Henry Labouchère kutsui sitä nimellä *"gigantic folly"*.
  Kustannusarviot: **3 miljoonaa puntaa** vuoden 1894 rahassa
  (yli 170 milj. puntaa vuoden 2005 rahassa) tai **5,5 miljoonaa**
  (650 milj. puntaa 2016).
- **Paikan valinta:** Whitehouse valitsi paikan varikoksi,
  vaihtoratapihaksi ja intialaisten työntekijöiden leirialueeksi.
  Perusteet: korkeus, leuto ilmasto, riittävä vesi ja sijainti juuri
  ennen Limurun jyrkkää nousua. Suojelushallinnon virkamiehet
  arvostelivat valintaa: paikka oli heidän mielestään liian tasainen,
  huonosti kuivatettu ja verrattain karu.
- **1898 Arthur Church** suunnitteli varikon ensimmäisen
  kaavan: **kaksi katua** (Victoria Street ja Station Street),
  **kymmenen puistokatua**, henkilökunnan asunnot ja intialainen
  kauppa-alue. **Rata saapui Nairobiin 30.5.1899.**

### N3 — Leiristä pääkaupungiksi

- Whitehouse ennusti radan saavuttua: *"Nairobi itself will in the
  course of the next two years become a large and flourishing place
  and already there are many applications for sites for hotels, shops
  and houses."*
- Alkuvuosia vaivasi **malaria**, ja kaupunkia yritettiin ainakin
  kerran siirtää muualle.
- **1900-luvun alussa** koko alkuperäinen kaupunki poltettiin
  **ruttoepidemian** jälkeen, ja **Bazaar Street** rakennettiin
  kokonaan uudelleen — se on nykyinen **Biashara Street**.
- **1902–1910** väkiluku nousi **5 000:sta 16 000:een**. Kasvu
  perustui hallintoon ja matkailuun, aluksi suurriistan metsästykseen.
- **1907** Nairobista tuli Mombasan tilalle **Itä-Afrikan
  protektoraatin pääkaupunki**. **1919** Nairobista tehtiin
  kunta (municipality). **1921** asukkaita oli 24 000, joista noin
  12 000 afrikkalaisia; seuraavalla vuosikymmenellä afrikkalaisista
  tuli ensi kertaa enemmistö.
- **A. M. Jeevanjee** (1856–1936), Karachissa syntynyt kauppias, sai
  **1895** urakan hankkia työvoimaa Ugandan radan rakentamiseen.
  Ensimmäisessä ryhmässä oli **350 miestä**, ja kuudessa vuodessa määrä
  kasvoi **31 895:een**. Vuosisadan vaihteessa hän oli sekä Nairobin
  että Mombasan suurin kiinteistönomistaja; hän omisti suurimman osan
  Nairobista. **1901** hän osti Nairobin intialaisen basaarin ja
  **1904** rakensi pysyvän Jeevanjee-markkinapaikan. Hän perusti
  viikkolehden **African Standard**, joka myytiin 1905 ja nimettiin
  **East African Standardiksi**.
- **Nykyään:** Nairobi on Itä-Afrikan tärkein rahoitus- ja
  talouskeskus, ja siellä toimivat **YK:n ympäristöohjelma (UNEP)**
  ja **YK:n Nairobin toimisto (UNON)** Gigirin kaupunginosassa.
  **Nairobin arvopaperipörssi** on Afrikan vanhimpia (mantereen
  toiseksi vanhin) ja neljänneksi suurin kaupankäyntivolyymiltaan.
  Kaupunki luokitellaan **Beta World City** -tason globaaliksi
  kaupungiksi (GaWC 2024).

### N4 — Matatu ja nganya

- **Matatu** (sheng-kielellä *mathree*) on yksityisomistuksessa oleva
  pikkubussi, joka toimii jaettuna taksina. **Yli 70 % työmatkoista**
  tehdään matatulla Nairobin kaltaisissa kaupungeissa.
- Nimi tulee swahilin tai kikujun puhekielen sanasta 'kolme'.
  Selitys 1: **kolme kymmenen sentin kolikkoa** oli tyypillinen 30
  sentin maksu 1970-luvulla. Selitys 2: kikujun ilmaus **mang'otore
  matatu**, '30 senttiä'. Lähde sanoo, ettei yksimielisyyttä ole.
- Juuret ovat **1960-luvulla**; kasvu **1980- ja 1990-luvulla**.
  Matatu-kulttuuri syntyi amerikkalaisen hiphop-musiikin ja
  -kulttuurin vaikutuksesta 1980-luvulla. Vuosituhannen alussa
  perusmuoto oli koristeltu japanilainen pikkupaketti; noin **2015**
  alkaen käyttöön tulivat myös bussikokoiset ajoneuvot.
- Matatut ajavat vakioreittejä, ja **reitti on maalattu keltaisena
  raitana kylkeen**; reiteillä on numerot. Kuljettajan lisäksi
  mukana on rahastaja, jota kutsutaan nimellä **makanga**,
  **manamba** tai **donda**.
- **Nganya** on sheng-sana kaikkein koristellummille matatuille:
  maalauksia ja graffiteja jalkapalloilijoista, muusikoista ja
  supersankareista, useita videonäyttöjä, tummennetut ikkunat,
  LED-valot ja voimakkaat äänentoistolaitteet — NPR:n toimittaja
  kuvasi niitä nimellä *"mobile sound systems"*. Nganya-kulttuuri on
  kaupunkinuorten luovuuden, musiikin ja identiteetin ilmaisu.
- Sääntely: matatut säädettiin laillisiksi **1973**, mutta
  ensimmäinen luvitus- ja katsastuskehikko tuli vasta **1984**.
  Turvavyöt ja nopeudenrajoittimet ovat pakollisia. **Räikeät
  maalaukset kiellettiin, mutta kielto poistettiin 2015**, ja siitä
  lähtien maalauksiin on käytetty jopa yli 2 000 dollaria per auto.
  Jokaisen matatun on kuuluttava johonkin yli **600 rekisteröidystä
  SACCO-osuuskunnasta**.
- Nairobin liikennettä on 2010-luvulta lähtien pyritty siirtämään
  suurempiin busseihin; uusia pikkubusseja ei enää rekisteröidä
  kaupunkiin. **Green Park -bussiterminaali** aloitti toimintansa
  2021 ja **Nairobi Expressway** valmistui 2022.

---

## 3. Teemasivun nostot (4 kpl) — Puisto kaupungin rajalla

### L1 — Ainoa pääkaupunki, jolla on kansallispuisto

- **Nairobin kansallispuisto** perustettiin **1946** noin **7 km**
  Nairobin keskustasta etelään. Se on **117,21 km²** ja aidattu
  kolmelta sivulta; eteläinen raja, **Mbagathi-joki**, on avoin
  Kitengelan suojelualueelle ja Athi–Kapitin tasangoille.
- Puisto on **Kenian ensimmäinen kansallispuisto**. ("History of
  Nairobi" sanoo sitä Itä-Afrikan ensimmäiseksi — ks. tarkistus.)
- Nairobi on lähteen mukaan **maailman ainoa pääkaupunki, jonka
  rajojen sisällä on kansallispuisto**.
- Puiston korkeus vaihtelee **1 533 metristä** ylöspäin. Se on
  Athi–Kapitin ekosysteemin ainoa suojeltu osa ja alle 10 %
  koko ekosysteemistä.
- Lajisto: leijona, leopardi, afrikanpuhveli, **mustasarvikuono**,
  kirahvi, virtahepo, täplähyeena, afrikannorsu, gnuu, seepra,
  gepardi, thomsoningaselli, granti­ngaselli, eland, impala,
  hartebeest, vesikauris, pahkasika, oliivipaviaani, mustaselkäsakaali,
  strutsi ja niilinkrokotiili. Lintulajeja on jopa **500**.
- **Perustaminen maksoi maasaipaimentolaisille kotimaan:** *"Maasai
  pastoralists were removed from their lands when the park was
  created."* Tämä on kerrottava suoraan.
- Puiston perustamisen ajoi **Mervyn Cowie**, Nairobissa syntynyt
  luonnonsuojelija, joka palasi Keniaan 1932 ja huolestui riistan
  vähenemisestä. Hän toimi puiston johtajana **1946–1966**.

### L2 — Kitengelan käytävä ja sarvikuonot

- Kasvinsyöjät, gnuut ja seeprat, käyttävät **Kitengelan
  suojelualuetta ja muuttokäytävää** päästäkseen Athi–Kapitin
  tasangoille. Sadekaudella ne hajaantuvat tasangoille ja kuivalla
  kaudella palaavat puistoon, jossa Mbagathi-joen padot pitävät
  veden saatavilla.
- **Ennen kaupunkia** laumat seurasivat sateita ja liikkuivat
  tasangoilla **Kilimanjarolta Kenia-vuorelle** — muutto oli yhtä
  suuri kuin Serengetillä. Kaupungin kasvaessa puistosta tuli muuton
  **pohjoisin raja**.
- Puisto on **yksi Kenian onnistuneimmista mustasarvikuonon
  turvapaikoista** ja yksi harvoista paikoista, joissa kävijä näkee
  mustasarvikuonon luonnossa varmasti. Puistoa kutsutaan joskus
  nimellä **Kifaru Ark**, 'sarvikuonon arkki'.
- **David Sheldrick Trustin** turvakoti puiston pääportin lähellä
  hoitaa orpoja norsun- ja sarvikuononpoikasia ja palauttaa ne
  myöhemmin suojelualueille. Se avattiin **1963**; perustaja oli
  **Daphne Sheldrick**.
- **Vuodesta 2005** alue on luokiteltu leijonien suojeluyksiköksi
  (Lion Conservation Unit).
- Väestönkasvu painaa puistoa: **1948** Nairobissa asui 188 976
  ihmistä, **1997** jo 1,5 miljoonaa. Kitengelan entiset maasaiden
  ryhmätilat on yksityistetty ja osa myyty viljelijöille. Monet
  maasai-maanomistajat ovat perustaneet **Kitengela Landowners
  Associationin**, joka toimii Kenian riistaviranomaisen kanssa sekä
  eläinten suojelemiseksi että paikallisten hyötyjen löytämiseksi.

### L3 — Norsunluun poltto

- **1989** presidentti **Daniel arap Moi poltti kaksitoista tonnia
  norsunluuta** puiston alueella olevalla paikalla. Tapahtuma
  paransi Kenian mainetta luonnon- ja eläinsuojelijana ("Nairobi
  National Park", History).
- Polttopaikan muistomerkki (**Ivory Burning Site Monument**) on yksi
  puiston nähtävyyksistä yhdessä gnuun ja seepran muuton
  (heinä–elokuu), Nairobi Safari Walkin ja eläinorpokodin kanssa.
- Puiston **Wildlife Conservation Education Centre** pitää luentoja
  ja opastuksia; tuhannet kenialaiset koululaiset käyvät puistossa
  joka viikko. Nairobin asukkaat käyvät puistossa itse.
- Puisto on Nairobin tärkein matkailukohde.
- **Uhat** kerrotaan suoraan: ihmis- ja karjamäärän kasvu,
  maankäytön muutos ja salametsästys. Puiston pohjoisrajalla
  sijaitsevien tehtaiden jätevedet ja teollisuusjäte saastuttavat
  puiston pinta- ja pohjavesiä.

### L4 — Wangari Maathain kaksi kaupunkikamppailua

- **Uhuru Park** ("uhuru" = vapaus swahiliksi) rajoittuu
  liikekeskustaan ja Upper Hilliin. Se on ulkoilmapuheiden,
  jumalanpalvelusten ja kokoontumisten paikka.
- Presidentti **Daniel arap Moi** aikoi rakentaa puistoon puolueensa
  **62-kerroksisen** päämajan. Puisto säilyi **Nobelin
  rauhanpalkinnon saaneen Wangari Maathain** kampanjan ansiosta
  ("Nairobi", Parks and gardens).
- Maathai kamppaili myös **Karuran metsän** puolesta Nairobin
  pohjoisosassa, kun sitä uhkasi korvaaminen asuntorakentamisella ja
  muulla infrastruktuurilla ("Nairobi", Geography).
- **Karuran metsä** on kaupungin sisällä oleva luonnonsuojelualue:
  luontopolkuja, piknikpaikkoja, luolia ja vesiputouksia. Alueella on
  havaittu yli **200 lintulajia**, ja poluilla voi nähdä apinoita ja
  pensasantilooppeja.
- Muut kaupungin viheralueet: **Central Park** Uhuru Parkin vieressä;
  **John Michuki Memorial Park** Nairobi-joen varrella Globe Cinema
  -liikenneympyrästä Museum Bridgelle, avattu uudelleen elokuussa
  2020 Nairobi-joen kunnostuksen jälkeen; **Nairobi City Park**
  (yli 60 ha), joka säilyttää yhden viimeisistä alkuperäisen metsän
  laikuista ja jossa elää sykesinapinoita.
- **Uhka julkisille tiloille:** kaupunkia ohjaa yhä siirtomaa-ajan
  **vuoden 1948 yleiskaava**, joka laadittiin 250 000 asukkaalle ja
  varasi 28 % maasta julkiseksi tilaksi. City Park oli alun perin
  150 eekkeriä ja on menettänyt noin 50 eekkeriä yksityiselle
  rakentamiselle 1980-luvulta alkaen.

---

## 4. Kohdekartta

**Rajausehdotus:** pohjoinen −1,2700, etelä −1,2975, länsi 36,8080,
itä 36,8320 → n. **3,1 × 2,7 km**. Museum Hilliltä rautatiealueelle.

**Kahdeksan kohdetta (koordinaatit en-Wikipedian
`prop=coordinates&redirects=1` -rajapinnasta 6.9.2026), pohjoisesta
etelään:**

| # | Kohde | lat | lon |
|---|-------|-----|-----|
| 1 | Nairobin arboretum | −1,274300 | 36,813100 |
| 2 | Kenian kansallismuseo | −1,273889 | 36,815000 |
| 3 | Nairobin yliopisto | −1,279722 | 36,816667 |
| 4 | Jeevanjeen puutarha | −1,281014 | 36,819476 |
| 5 | Kenian kansallisarkisto | −1,284900 | 36,825900 |
| 6 | Nairobi Gallery | −1,286789 | 36,817833 |
| 7 | Kenyattan kongressikeskus | −1,288611 | 36,823056 |
| 8 | Nairobin rautatiemuseo | −1,293725 | 36,822194 |

Pienin väli on **arboretum – kansallismuseo 216 m**, eli niukasti yli
200 metrin säännön; kohteet ovat Museum Hillin eri puolilla ja eri
juttujen aiheita.

**Kohteiden faktat:**

1. **Nairobin arboretum.** State House Roadin varrella Kilimanin
   alueella. Perustettu **1907**; perustaja oli **Batiscombe**, ja
   tarkoitus oli **kokeilla uusia metsäpuulajeja**. Julistettiin
   luonnonsuojelualueeksi **1932**; omistuskirja siirtyi valtiolle
   **1996**. **30 hehtaaria**, yli **350 puulajia**; toimii sekä
   virkistys- että tutkimusalueena, ja se on State Housen lähellä
   ("Nairobi Arboretum"; "Nairobi", Parks and gardens).
2. **Kenian kansallismuseo (Nairobi National Museum).** Kansallisen
   museo-organisaation (National Museums of Kenya) päämaja
   **Museum Hillillä**. Juuret ovat **1910–11** perustetussa
   **East Africa and Uganda Natural History Societyssa**, jonka
   jäseniin kuuluivat mm. pastori Harry Leakey (Louis Leakeyn isä) ja
   pastori Kenneth St. Aubyn Rogers. **1911** seura perusti
   luonnonhistoriallisen museon ja kirjaston; **Aladina Visram**
   rahoitti yksikerroksisen kaksihuoneisen rakennuksen. **1914**
   palkattiin ensimmäinen palkattu intendentti, herpetologi
   **Arthur Loveridge**. Museo muutti myöhemmin uuteen rakennukseen
   Government Roadin ja Kirk Roadin kulmaan. Kuvernööri **Sir Robert
   Coryndon** kuoli yllättäen **1925**, ja lady Coryndon perusti
   muistorahaston paremman museon rakentamiseksi; valtio antoi
   vastinrahoituksen ja rakentaminen alkoi **1928**. Rakennus
   valmistui **1929**, mutta siinä ei ollut työ- eikä varastotiloja,
   joten seura kieltäytyi muuttamasta; valtio osti vanhan museon, ja
   rahalla rakennettiin kolme huonetta lisää. Museo avattiin
   virallisesti **22.9.1930** nimellä **Coryndon Museum**.
   Organisaatio toimii nykyään **vuoden 2006 National Museums and
   Heritage Act** -lain nojalla, hallinnoi yli **22 aluemuseota** ja
   useita Unescon maailmanperintökohteita (Fort Jesus, Lamun
   vanhakaupunki, mijikendojen pyhät kaya-metsät). **East African
   Herbarium** on yksi Afrikan suurimmista biologisista kokoelmista,
   yli **7,5 miljoonaa näytettä**. Museo tunnetaan
   ihmisen alkuperän tutkimuksesta **Louis ja Richard Leakeyn**
   johdolla. Museon alueella on myös **Nairobi Botanical Gardens**,
   jonka teemaosastoja ovat mm. lasten puutarha, heinäpuutarha,
   yrttipuutarha, mehikasvipuutarha ja entisestä louhoksesta tehty
   Quarry Garden.
3. **Nairobin yliopisto.** Kaupungin päälaitos; kampus on
   keskustan pohjoislaidalla. Pihalla on **Fountain of Knowledge**
   -suihkulähde. (Artikkelista "University of Nairobi" käytetään vain
   ne tiedot, jotka on tarkistettu — ks. tarkistus, kohta E.)
4. **Jeevanjeen puutarha (Jeevanjee Gardens).** Avoin puutarha
   liikekeskustassa. Perustaja **A. M. Jeevanjee**, Karachissa
   syntynyt kauppias ja hyväntekijä. **Ainoa puisto kaupungissa, joka
   on suoraan kansan omistuksessa**: se oli yksityistä maata ja on
   lahjoitettu Nairobin asukkaille lepopaikaksi ja pidetään heidän
   hyväkseen. "Nairobi"-artikkeli sanoo puiston olevan yksi Nairobin
   **historiallisimmista ja vanhimmista julkisista viheralueista** ja
   perustetun **1900-luvun alussa**.
5. **Kenian kansallisarkisto (KNADS).** Liikekeskustan laidalla
   Moi Avenuen varrella Ambassadeur-hotellin vieressä; takana Tom
   Mboya Street. Perustettu **1965** Kenian parlamentin säätämällä
   lailla rakennukseen, jossa oli aiemmin toiminut Kenya Commercial
   Bank. Kokoelmassa on **40 000 nidettä**. Rakennuksen pohjakerroksessa
   on **Murumbi-galleria**, joka on nimetty Kenian toisen
   varapresidentin **Joseph Murumbin** mukaan ja on **Afrikan suurin
   panafrikkalainen taidegalleria**. Arkiston ensimmäinen musta
   johtaja **tri Maina David Kagombe** julkaisi maaliskuussa **1976**
   asetusilmoituksen, joka esti ketään — myös Murumbia itseään —
   myymästä ulkomaille esineitä, jotka johtaja katsoi kansallisesti
   arvokkaiksi antiikkiesineiksi. Murumbi myi kokoelmansa ja
   Muthaigan-kotinsa Kenian valtiolle; hän oli aiemmin torjunut
   useita suuria ulkomaisia ostotarjouksia.
6. **Nairobi Gallery** (swahiliksi *Nyumba ya sanaa ya Nairobi*).
   Taidegalleria keskustan laidalla, keskittyy afrikkalaiseen
   taiteeseen. Rakennuksen suunnitteli **C. Rand Ovary**, ja se
   valmistui **1913** siirtomaa-ajan **Ministry of Native Affairsin**
   käyttöön: siellä rekisteröitiin avioliitot, syntymät ja kuolemat.
   **1963–1984** rakennus oli maakuntakomissaarin toimisto,
   **1997** asti KANUn Nairobin piiritoimisto. Julistettiin
   kansallismonumentiksi **1995**; siirtyi National Museums of
   Kenyan omistukseen **1997**; peruskorjaus alkoi **1999** ja
   valmistui **2005**, jolloin galleria avattiin. **2019** kokoelma
   digitoitiin yhteistyössä Googlen kanssa. Kokoelmassa on
   **panafrikkalainen postimerkkikokoelma**, Joseph Murumbin valokuvia,
   Lamu-sohva ja Sansibar-kaappi "Joseph ja Sheila Murumbin
   huoneessa", turkana-koruja, afrikkalaisia jakkaroita, nubialaisia
   koreja, puuveistoksia sekä kanga-tekstiilejä.
7. **Kenyattan kongressikeskus (KICC).** **32-kerroksinen**
   rakennus Nairobin City Squarella. Presidentti **Jomo Kenyatta**
   tilasi sen **1967**; suunnittelijat olivat norjalainen
   **Karl Henrik Nøstvik** ja kenialainen **David Mutiso**; urakoitsija
   Solel Boneh & Factah. Rakennettiin kolmessa vaiheessa (jalusta,
   torni, täysistuntosali) ja valmistui **1973**; avajaiset
   **syyskuussa 1973** presidentti Kenyattan johdolla. Korkeus runsaat
   **105 metriä**; oli Kenian korkein rakennus 26 vuotta, kunnes
   Teleposta Tower ohitti sen. Tornissa on **pyörivä ravintola**, joka
   kiertää 360° **76 minuutissa** ja jossa on 148 paikkaa.
   Vaalea terrakottajulkisivu ja yksinkertaiset perusmuodot viittaavat
   perinteiseen afrikkalaiseen rakentamiseen: kuutiot muodostavat
   täysistuntosalin, torni on useista kuutioista koottu lieriö, ja
   amfiteatteri ja helikopterikenttä ovat kartioita. Torni on
   rakennettu betoniytimen ympärille, eikä siinä ole seiniä vaan
   lasi-ikkunat. **Ainoa rakennus kaupungissa, jonka
   helikopterikenttä on avoinna yleisölle.** Amfiteatteriin mahtuu
   800 henkeä kolmelle parvelle; Tsavo-juhlasaliin 5 000.
   Nimi muutettiin **syyskuussa 2013** 40-vuotisjuhlan yhteydessä
   muotoon Kenyatta International Convention Centre. 1970-luvun
   rakennuksista KICC oli ympäristöystävällisin: runko tehtiin
   paikallisista aineista (sora, hiekka, sementti, puu) ja avarat
   tilat mahdollistivat luonnollisen tuuletuksen ja valaistuksen.
   Pihalla on **James Butlerin veistämä Kenyattan patsas (1971)**.
8. **Nairobin rautatiemuseo.** Nairobin rautatieaseman vieressä;
   avattiin **1971**, ja sitä ylläpitää Kenya Railways. Kokoelmassa on
   lakkautetun **East African Railwaysin** esineistöä. Museolla on yhä
   **oma raideyhteys**, joten kalustoa voi siirtää huoltoon ja uusia
   esineitä tuoda kokoelmaan. Kolme toimintakuntoista höyryveturia
   säilytetään suojassa pääkonepajassa, ja niitä pääsee katsomaan
   sopimuksesta. Yksi näyttelyvetureista, **301 (2301)**, esiintyi
   vuoden **1985** elokuvassa *Out of Africa*. Kokoelmassa on myös
   varhaisia dieselvetureita ja matkustajavaunuja. **Tammikuussa 2011**
   museoon asennettiin toimiva **pienoisrautatie**, jota oli aiemmin
   käytetty Kenya Railwaysin markkinointiin mm. Nairobi Show'ssa:
   bensiinimoottorinen veturi ja puiset vaunut.

---

## 5. Matkaopas (nykytietoa)

- **Perille:** Jomo Kenyatta International Airport; terminaali
  valmistui **14.3.1978** ja presidentti Kenyatta avasi sen alle viisi
  kuukautta ennen kuolemaansa; kenttä nimettiin hänen mukaansa.
  Vuoden 1972 Maailmanpankin rahoittama laajennus maksoi yli
  **29 miljoonaa dollaria**. **Standard Gauge Railway** Mombasaan
  avattiin **toukokuussa 2017**. **Thika Superhighway** (50,4 km,
  neljästä kaistasta kahdeksaan) avattiin **marraskuussa 2012**.
- **Liikkuminen:** matatut ovat yleisin joukkoliikenteen muoto;
  reitti näkyy keltaisena raitana kyljessä ja reiteillä on numerot.
  Green Park -terminaali avattiin 2021.
- **Puistot:** kansallispuisto **7 km** keskustasta; **Karuran metsä**
  luontopolkuineen, luolineen ja vesiputouksineen; **Nairobin
  arboretum** (30 ha, yli 350 puulajia); **Nairobi City Park**
  (yli 60 ha); **Oloolua Nature Trail** Karenin alueella, jossa on
  **37 metriä syvä** luonnonluola, vesiputous Mbagathi-jokeen,
  bamburinne ja papyrussuo; **Ngong Road Forest Sanctuary**
  kävely-, juoksu- ja pyöräpolkuineen.
- **Ruoka:** **nyama choma** ('paistettu liha') on kaupungin oma
  klassikko. Kahvilat (Artcaffe, Nairobi Java House, Dormans) ovat
  yleistyneet, ja perinteisiä ruokapaikkoja kuten K'osewe ja Amaica
  löytyy keskustasta. Tammi–helmikuussa on **Nairobi Restaurant
  Week**.
- **Kirjallisuus ja elokuva:** **Kwani?** on Kenian ensimmäinen
  kirjallisuuslehti ja sen perustivat Nairobissa asuvat kirjailijat.
  Nairobin kustantamot ovat julkaisseet mm. **Ngũgĩ wa Thiong'on** ja
  **Meja Mwangin** teoksia. **Karen Blixen** asui Nairobin seudulla
  **1917–1931**, ja kaupunginosa **Karen** on nimetty hänen mukaansa;
  *Out of Africa* filmatisoitiin 1985 (ohjaus Sydney Pollack) ja
  elokuvan suosio johti **Karen Blixen -museon** avaamiseen.
  **Lupita Nyong'o** on tunnetuin Nairobiin samastuva kenialainen
  näyttelijä.
- **Musiikki:** **benga** kehittyi Nairobissa jazzin ja luo-musiikin
  yhdistelmänä. **1970-luvulla** Nairobista tuli
  **soukous**-musiikin keskus, kun kongolaiset artistit (mm.
  Orchestra Super Mazembe) muuttivat kaupunkiin; Virgin Records
  huomasi tyylin suosion ja teki levytyssopimuksia. Nykyään Nairobi
  on Kenian hiphopin keskus.
- **Sää:** subtrooppinen ylänköilmasto (Köppen **Cwb**),
  **1 795 m** merenpinnasta. Illat voivat olla viileitä erityisesti
  kesä–heinäkuussa, jolloin lämpötila voi laskea **9 asteeseen**.
  Aurinkoisin ja lämpimin jakso on **joulu–maaliskuu**, jolloin
  päivälämpötilat ovat lähellä kolmeakymmentä ja keskimääräinen
  ylin on **28 °C**. Sadekausia on kaksi, mutta sade on kohtalaista;
  pilvisin jakso on heti ensimmäisen sadekauden jälkeen, jolloin
  syyskuuhun asti on usein pilvistä ja tihkuttaa. Päiväntasaajan
  läheisyyden takia vuodenaikojen erot ovat pienet ja auringonnousun
  ja -laskun ajat vaihtelevat vähän.
- **Sanasto:** *safari* on swahilia ja tarkoittaa matkaa
  (`africa-questions.js`, nairobi, kysymys 5); *uhuru* tarkoittaa
  vapautta; *nyama choma* paistettua lihaa; *matatu* kolmea.

---

## 6. Säärivi

Open-Meteon arkisto ei ollut käytettävissä tämän erän aikana
(vuorokausikiintiö). **Säärivi jätetään pois** (Samarkand-malli v965),
ja oppaan sääjakso nojaa en-Wikipedian Climate-osioon ja sanoo sen
ääneen.

---

## 7. Minitehtävä (teemasivu)

Visa kysyy jo Kenian pääkaupungin, kansallispuiston erikoisuuden,
Ugandan radan, kaupungin korkeuden ja sanan "safari". Minitehtävä ei
saa toistaa niitä. **Ehdotus:**

> Mitä presidentti Daniel arap Moi poltti Nairobin kansallispuistossa
> vuonna 1989? — oikea: kaksitoista tonnia norsunluuta.

Vastaus löytyy teemasivun nostosta L3.

---

## 8. Avoimet kysymykset kirjoittajalle

1. Enkare Nyirobi vai Ewaso Nyirobi? (ks. tarkistus A)
2. Korkeus 1 795 m vai 1 661 m? (ks. tarkistus B)
3. "Green City in the Sun" vai "under the Sun"? (ks. tarkistus C)
4. Kenian vai Itä-Afrikan ensimmäinen kansallispuisto? (ks. tarkistus D)
5. KICC 28 vai 32 kerrosta? (ks. tarkistus E)
