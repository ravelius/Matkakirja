# Asunción — faktakoostaja, uusi kaupunkilehti (Etelä-Amerikan lauta)

Lauta-id `southamerica`, kaupunki-id `asuncion`, maa PRY, en-Wikipedia
"Asunción" ellei toisin mainita. Kaikki tiedot haettu en-Wikipediasta
**24.8.2026** (`action=raw`, `NODE_USE_ENV_PROXY=1`; jokainen haettu otsikko
tarkistettu #REDIRECT-rivin ja täsmennyssivun varalta — "Guarani people"
ohjautuu artikkeliin "Guaraní people", muut haetut otsikot osuivat suoraan.
Useat haut osuivat Wikipedian ja Commonsin 429-rajoitukseen; odotin kasvavan
viiveen ja yritin uudelleen resepti-ohjeen mukaisesti). Malli ja mitat luettu
tiedostoista `docs/aasia-tyoaineisto/lehtityo-resepti.md` (SITOVA) ja
`docs/moduulit/kaupunkilehti.md`, sekä mallitiedostona
`docs/mantereet-tyoaineisto/faktapohja-christchurch.md` (rakenne kopioitu
siitä tarkasti). Luin myös `docs/mantereet-tyoaineisto/spec-mantereet.md`
(P-Amerikka-osio ja kaikkia kolmea uutta mannerta koskevat viisi linjausta)
ja `js/packs/southamerica-questions.js` kohta `asuncion` (viisi kysymystä:
Paraguayn pääkaupunki, kaksi virallista kieltä, Paraguayjoki, tereré,
"kaupunkien äiti" -lempinimi) sekä `SOUTHAMERICA_FACTS.asuncion` (kolme
faktaa + isoisän repliikki) — ks. osio 8 siitä, miten päällekkäisyyksiä on
vältetty. Luin lisäksi olemassa olevat `js/packs/southamerica-saapumiset.js`
ja `js/packs/southamerica-valokuvat.js` -rivit kaupungille (arrival-kortti ja
neljä olemassa olevaa kuvaa: 1912-sisällissotakuva, Mercado 4, tereré,
Panteón, sekä uusi Palacio-kuva) välttääkseni saman kuvan tai sanamuodon
toiston — ks. osio 8.

**Tehtävän erityispiirre:** En kirjoittanut lehtitekstejä, en ladannut
kuvia enkä koskenut js/packs-tiedostoihin — kaikki alla on raaka-ainetta
kirjoittajalle ja riippumattomalle tarkistajalle.

**Sisältölinjaus (tehtävänanto + spec-mantereet.md + Raamattu pilari 3):**
Kolmoisliiton sota 1864–1870 on käsitelty PAKOLLISENA aiheena omalla
teemasivullaan, koska isoisän matkan vuosi 1873 osuu suoraan Asunciónin
brasilialaismiehityksen (1869–1876) keskelle — kaksi kaupungin tärkeintä
nykynähtävyyttä, Palacio de los López ja Panteón de los Héroes, olivat
vuonna 1873 kumpikin sodan runtelemia, keskeneräisiä rakennuksia (ks. H3,
H4). Väestötappioluvuista annetaan haarukka useasta tutkimuksesta, ei yhtä
lukua, ja ristiriita kirjoitetaan auki (ks. H1, osio 7). Ei taistelu- eikä
kärsimyskuvauksia. Guaraní esitetään elävänä nykykielenä (yhteensä yli
puolet Paraguayn väestöstä puhuu sitä äidinkielenään maaseudulla, ja se on
espanjan rinnalla perustuslaissa vuodesta 1992 tasavertainen virallinen
kieli) ja Paraguayn alkuperäiskansat nykyisinä, elävinä yhteisöinä omalla
nimellään (K3, osio 5). Ei nykysotaa, ei nykypolitiikkaa — Stroessnerin
diktatuuri (1954–1989) on jätetty kokonaan pois myös silloin, kun
lähdeartikkelit sivuavat sitä (esim. Palacio de los Lópezin ja Museum of
Memoriesin kuvaukset).

---

## 1. Sivuehdotukset

Tehtävänanto salli 1–3 teemasivua. Käytin kaikki kolme: aineisto kantoi
kolme selvästi erillistä, päällekkäisyydetöntä teemaa (kaupungin synty ja
nykyinen elävä kulttuuri, Kolmoisliiton sota ja sen jälkien näkyminen
nykykaupungissa, sekä guaraní-perinnön arkiset ilmentymät), ja
Kolmoisliiton sota on tehtävänannon eksplisiittinen pakollinen aihe, joten
se ansaitsee oman sivunsa yksittäisen noston sijaan.

### Sivu A — id `kaupunki`, nimi "Asunción"

**Johdanto (221 merkkiä):**

> Kaupunkien äiti Paraguayjoen rannalla: linnake vuodelta 1537, josta
> espanjalaiset lähtivät perustamaan kymmeniä muita siirtokuntia. Isoisän
> matkan aikoihin, 1873, kaupunki eli yhä sodanjälkeistä miehitystä.

### Sivu B — teemasivu, ehdotettu id `historia`, nimi "Kolmoisliiton sota ja miehitys"

**Perustelu valinnalle:** Tehtävänanto nimeää Kolmoisliiton sodan aiheeksi,
joka on "PAKKO käsitellä", koska isoisän matkan vuosi 1873 osuu suoraan
Asunciónin brasilialaismiehitykseen (1869–1876). Tällä sivulla sota
kerrotaan tapahtumina ja lukuina toteavasti, ja sitten näytetään miten
sen jäljet näkyvät kahdessa kaupungin tärkeimmässä nykynähtävyydessä
(Palacio de los López, Panteón de los Héroes) — juuri sitä, mitä
kaupungissa on NYT.

**Johdanto (226 merkkiä):**

> Vuosien 1864–1870 sota jätti Paraguayn autioksi ja pääkaupungin
> vieraiden joukkojen haltuun aina vuoteen 1876 asti. Isoisän matka
> vuonna 1873 osuu suoraan tähän miehityksen keskivaiheeseen.

### Sivu C — teemasivu, ehdotettu id `kulttuuri`, nimi "Guaraní-perintö ja arki"

**Perustelu valinnalle:** Tehtävänanto nimeää painopisteeksi mm. tereré-
juoman, ñandutí-pitsin, Costaneran ja Asunciónin lahden — nämä ovat
kaikki NYKYISIÄ, eläviä ilmiöitä eivätkä sodan tai kolonialismin
historiaa, joten ne kantavat oman sivunsa hyvin ja täydentävät pilari
3:n vaatimuksen guaraní-kulttuurin elävyydestä konkreettisin, arkisin
esimerkein (juoma, käsityö) eikä vain kielitilastoina.

**Huomio nimestä:** `kulttuuri` EI ole AIHE_IKONIT-vakioaiheiden listassa
(historia, kuvataide, kirjallisuus, musiikki, ruoka, luonto, tiede,
nykytaide, huumori). Mikään näistä ei osu tarkasti sisältöön (ruoka on
lähinnä, mutta ñandutí ja lahden linnut eivät ole ruokaa) — kirjoittaja
harkitkoon joko `ruoka`-vakioaiheen käyttöä (tereré ja ñandutí siirtyisivät
sen alle, lahti ja Costanera jäisivät kaupunki-sivulle) tai jättäköön
`kulttuuri`-idin ilman `ikoni`-kenttää, jolloin se saa yleiskuvakkeen
(kirjanmerkki, `AIHE_IKONIT.muu`).

**Johdanto (207 merkkiä):**

> Kylmä mate kädestä käteen, hämähäkinseitin nimeä kantava pitsi ja joki
> joka syötti koko naapurimaita — Asunciónin arki kantaa guaraní-perintöä
> yhtä vahvasti kuin sen kadunnimet ja perustuslaki.

---

## 2. Kaksitoista nostoehdotusta (4 × 3 sivua)

### Sivu `kaupunki` — 4 nostoa

**Nosto K1 — "Kaupunki joka synnytti kuusikymmentä muuta" (633 merkkiä)**

> Espanjalainen Juan de Salazar de Espinosa perusti 15. elokuuta 1537
> linnakkeen Paraguayjoen rannalle ja nimesi sen Nuestra Señora Santa
> María de la Asunciónin mukaan, taivaaseenastumisen juhlapäivän
> mukaisesti. Vuonna 1542, kun alkuperäisväestö tuhosi tuoreen Buenos
> Airesin, sen espanjalaiset pakenivat Asuncióniin, josta tuli koko
> Río de la Platan alueen keskus. Täältä käsin lähetettiin
> retkikuntia perustamaan kymmeniä muita kaupunkeja, muun muassa
> Buenos Airesin toinen perustaminen, Villarrica, Corrientes, Santa
> Fe ja Córdoba – yli seitsemänkymmentä siirtokuntaa kaikkiaan. Siksi
> Asunciónia kutsutaan yhä "kaupunkien äidiksi".

Faktat ja lähteet:
- Espanjalainen konkistadori Juan de Salazar y Espinosa perusti
  linnakkeen elokuussa 1537 ja nimesi sen Nuestra Señora Santa María de
  la Asunciónin mukaan (Neitsyt Marian taivaaseenastumisen juhlapäivä,
  jota katolinen kirkko viettää 15. elokuuta). — en-Wikipedia "Asunción"
  (Early history -osio)
- Vuonna 1542 alkuperäisväestö tuhosi Buenos Airesin, ja sen
  espanjalaiset asukkaat pakenivat Asuncióniin, josta tuli laajan
  siirtokuntaprovinssin keskus (kattoi osia nykyisestä Brasiliasta,
  Paraguaysta ja koillis-Argentiinasta). — en-Wikipedia "Asunción"
  (Early history -osio)
- Asunciónista käsin lähetettiin espanjalaisia siirtomaaretkikuntia
  perustamaan muita kaupunkeja, mukaan lukien Buenos Airesin toinen
  perustaminen sekä Villarrica, Corrientes, Santa Fe, Córdoba, Santa
  Cruz de la Sierra ja 65 muuta — tästä syystä kaupunkia kutsutaan
  "kaupunkien äidiksi" (Madre de Ciudades). — en-Wikipedia "Asunción"
  (johdanto, lähteinä cideu.org ja BBC Mundo)

**Nosto K2 — "Lahden ja seitsemän kukkulan kaupunki" (568 merkkiä)**

> Asunción lepää Paraguayjoen vasemmalla rannalla lähellä kohtaa, jossa
> siihen yhtyy Pilcomayo-joki – Asunciónin lahti erottaa kaupungin
> luoteessa Paraguayn Länsialueesta ja Argentiinasta. Vanha kaupunki on
> rakennettu seitsemälle matalalle kukkulalle, joista perustamispaikka
> Loma Cabará on yksi; korkein kohta ei kuitenkaan ole mikään niistä,
> vaan Nazarethin kaupunginosan Colina Alta -katu, 170 metriä
> merenpinnasta. Lahden vedenkorkeus vaihtelee rajusti vuodenajan
> mukaan: sadekaudella se on suurelta osin veden alla, kuivana kautena
> paljastuu hiekka- ja savirantoja.

Faktat ja lähteet:
- Asunción sijaitsee Paraguayjoen vasemmalla rannalla lähes kohdassa,
  jossa siihen yhtyy Pilcomayo-joki; Asunciónin lahti erottaa
  kaupungin luoteessa Paraguayn Länsialueesta (Occidental Region) ja
  Argentinasta. — en-Wikipedia "Asunción" (johdanto, Geography-osio)
- Vanhan kaupungin epätasainen maasto koostuu "seitsemästä kukkulasta"
  (Loma Cabará, San Jerónimo, Clavel, Cachinga, Mangrullo, Encarnación,
  Piedras de Santa Catalina); Loma Cabará on kaupungin perustamisalue.
  Kaupungin korkein kohta on kuitenkin Nazarethin kaupunginosan Colina
  Alta -katu, 170 m merenpinnasta (tunnetumpi Cerro Lambaré on 160 m).
  — en-Wikipedia "Asunción" (Geography-osio)
- Lahtialue (n. 375 ha, n. 2 km vanhasta kaupungista) vaihtelee
  huomattavasti Paraguayjoen kausivaihtelun mukaan: korkean veden
  aikaan suurelta osin tulvan alla, veden laskiessa paljastuu hiekka-
  ja savirantoja ja lopulta ruohikkoa. — en-Wikipedia "Asunción"
  (Biogeography-osio)

**Nosto K3 — "Kieli joka ei koskaan väistynyt" (589 merkkiä)**

> Kun Paraguay demokratisoitui, uusi perustuslaki nosti vuonna 1992
> guaranin espanjan rinnalle tasavertaiseksi viralliseksi kieleksi –
> ainutlaatuinen tilanne Amerikassa, jossa alkuperäiskielet ovat
> lähes kaikkialla väistyneet siirtomaakielten tieltä. Nykyään
> guarania puhuu enemmistö paraguaylaisista, ja maaseudulla puolet
> väestöstä puhuu vain guarania. Itse pääkaupungissa espanja on
> yleisin ensikieli, mutta yli neljännes asunciónilaisista puhuu
> jokaparáa, guaranin ja espanjan sekakieltä – todiste siitä, että
> guaraníkansan kieli elää yhä, ei vain maaseudulla vaan kaupungin
> kaduillakin.

Faktat ja lähteet:
- Guaraní on yksi Paraguayn kahdesta virallisesta kielestä espanjan
  ohella; sitä puhuu enemmistö väestöstä, ja puolet maaseutuväestöstä
  on yksikielisiä guaraninpuhujia. — en-Wikipedia "Guarani language"
  (johdanto)
- Paraguayn demokratisoitumisen myötä vuonna 1992 uusi perustuslaki
  vahvisti guaranin espanjan kanssa tasavertaiseksi kieleksi. Kielen
  siirtymä eurooppalaisiin siirtomaakieliin on ollut lähes universaali
  ilmiö Amerikassa, mutta Paraguayssa guaraní on säilynyt rinnakkain
  espanjan kanssa. — en-Wikipedia "Guarani language" (Political status
  -osio, johdanto)
- Guaraní on myös yksi Mercosurin kolmesta virallisesta kielestä
  espanjan ja portugalin ohella. — en-Wikipedia "Guarani language"
  (johdanto)
- Asunciónissa itsessään espanja on yleisin ensikieli (56,9 %),
  guaraní 11,2 %, jopará (guaranin ja espanjan sekakieli) 27,4 % ja
  muut kielet 4,5 % — HUOM tämä yksittäinen prosenttijakauma on
  artikkelissa merkitty {{citation needed}} eikä sillä ole erillistä
  lähdettä (ks. osio 7). — en-Wikipedia "Asunción" (Language-osio)

**Nosto K4 — "Talo josta itsenäisyys lähti kävelemään" (490 merkkiä)**

> Kaupungin keskustassa, kadun kulmassa jota kutsutaan yhä 14. toukokuuta
> -kaduksi, seisoo vuonna 1772 rakennettu adobetalo. Sen suojissa
> paraguaylaiset salaliittolaiset kokoontuivat suunnittelemaan
> kapinaa Espanjan vallanpitäjää vastaan, ja yön 14.–15. toukokuuta
> 1811 aikana ryhmä miehiä pakotti kuvernööri Bernardo de Velascon
> antautumaan. Aamulla kirkonkellot soivat merkkinä uuden tasavallan
> synnystä. Talo on nykyään Casa de la Independencia -museo, joka on
> avoinna ollut vuodesta 1965.

Faktat ja lähteet:
- Talo rakennettiin 1772 espanjalaisen siirtolaisen Antonio Martínez
  Sáenzin toimesta, seinät adobea, katto olkea, runko bambua ja
  palmupuuta. — en-Wikipedia "Casa de la Independencia Museum"
  (johdanto, History-osio) — HUOM suuri osa artikkelin
  yksityiskohdista on merkitty {{citation needed}}, ks. osio 7.
- Talon sijainnin ja omistajien vuoksi siitä tuli salaisten
  kokousten paikka, joissa suunniteltiin kapinaa Espanjan
  siirtomaavaltaa vastaan; yön 14.–15. toukokuuta 1811 aikana Pedro
  Juan Caballeron johtama ryhmä miehiä käveli talon vierestä
  kuvernööri Bernardo de Velascon talolle ja pakotti hänet
  antautumaan. — en-Wikipedia "Casa de la Independencia Museum"
  (johdanto, History-osio, Historical Alley -osio)
- Museo avattiin 14.5.1965 ja esittelee Paraguayn itsenäisyyshistoriaa
  huoneittain (toimisto, ruokasali, olohuone, makuuhuone, oratorio,
  piha, Cabildon istuntosalin replika). — en-Wikipedia "Casa de la
  Independencia Museum" (Infobox, Rooms-osio)

### Teemasivu `historia` (Kolmoisliiton sota ja miehitys) — 4 nostoa

**Nosto H1 — "Sota joka tyhjensi maan" (639 merkkiä)**

> Vuosien 1864–1870 Kolmoisliiton sodassa Paraguay taisteli yksin
> Brasiliaa, Argentiinaa ja Uruguayta vastaan – ja hävisi tuhoisasti.
> Väestötappioista tutkijat eivät ole päässeet yksimielisyyteen: yksi
> matala arvio päätyy noin 21 000 kuolleeseen eli 7 prosenttiin
> sodanaikaisesta väestöstä, kun taas 1990-luvun tarkin
> väestöntutkimus päätyy 60–70 prosenttiin – jopa 69 prosenttiin
> koko sodanedellisestä väestöstä. Sodan jälkeisessä väestönlaskennassa
> 1871 maassa oli enää 221 079 asukasta, joista vain 28 746 oli
> miehiä. Asunción itse antautui Brasilian joukoille 1. tammikuuta
> 1869, kolmetoista kuukautta ennen sodan virallista päättymistä.

Faktat ja lähteet:
- Kolmoisliiton sota (1864–1870): Paraguay taisteli Brasilian,
  Argentiinan ja Uruguayn liittoumaa vastaan Francisco Solano Lópezin
  johdolla; Asunción antautui brasilialaisjoukoille kenraali João de
  Souza da Fonseca Costan johdolla 1.1.1869. — en-Wikipedia
  "Asunción" (Post-independence period -osio) / "Paraguayan War"
  (Fall of Asunción -osio)
- Väestötappioarviot vaihtelevat huomattavasti eri tutkimuksissa: matala
  arvio noin 21 000 kuollutta (7 % väestöstä, Reber 1988) aina 60–70
  prosenttiin väestöstä (Whigham & Potthast 1999, joka arvioi
  sodanedellisen väestön 420 000–450 000:ksi ja sodanjälkeisen
  eloonjääneen väestön 150 000–160 000:ksi, joista vain 28 000
  aikuista miestä); vanhemmat, tukemattomat arviot puhuvat jopa 90
  prosentista miesväestöstä. Tutkijat itse kutsuvat lukuja
  "kiistanalaisiksi" ja toteavat tarkkojen lukujen olevan
  mahdollisesti mahdottomia selvittää. — en-Wikipedia "Paraguayan War"
  (Casualties of the war -osio)
- Vuoden 1871 väestönlaskenta kirjasi 221 079 asukasta: 106 254 naista,
  28 746 miestä ja 86 079 lasta. — en-Wikipedia "Paraguayan War"
  (Casualties of the war -osio)

**Nosto H2 — "Kaupunki jota vieraat sotilaat asuttivat" (643 merkkiä)**

> Kaksi päivää ennen valtausta koko Asunción evakuoitiin tyhjäksi.
> Brasilialaisjoukot ryöstivät sitten järjestelmällisesti
> aatelisperheiden palatsit, hallituksen ministeriöt, kongressitalon
> ja presidentti López-perheen huonekalut – saaliiksi lähtivät jopa
> Venetsian peilit ja pianot. Kaupunkiin asettui pian 30 000
> brasilialaista, 4 000 argentiinalaista ja 200 uruguaylaista
> sotilasta sekä 800 paraguaylaista legioonalaista: Asunción oli
> vieraan armeijan kaupunki. Osa ryöstösaaliista – kuten Paraguayn
> kansallisarkisto – palautettiin vasta 1980-luvulla; iso osa ei
> koskaan. Miehitys kesti vuoteen 1876 asti, kolme vuotta isoisän
> matkan jälkeen.

Faktat ja lähteet:
- Asunción evakuoitiin asukkaista kaksi päivää ennen kaupungin
  valtausta 1.1.1869; brasilialaisjoukot ryöstivät aatelisperheiden
  palatseja, hallituksen ministeriöitä, kongressitaloa sekä López-
  perheen ja Eliza Lynchin huonekaluja (Venetsian peilit, pianot,
  kulta- ja hopea-astiat); saalis lastattiin laivoihin Buenos Airesiin
  ja Rio de Janeiroon. — en-Wikipedia "Sacking of Asunción" (johdanto)
- Kaupunkiin asettui n. 30 000 brasilialaista, 4 000 argentiinalaista
  ja 200 uruguaylaista sotilasta sekä n. 800 Paraguayn legioonan
  sotilasta ja upseeria. — en-Wikipedia "Sacking of Asunción"
  (johdanto) / "Paraguayan War" (Fall of Asunción -osio)
- Argentiina palautti "sodan trofeensa" 1970-luvulla ja Uruguay jo
  1880-luvulla, mutta suurin osa Asunciónin ryöstösaaliista ei
  koskaan palautunut. Paraguayn kansallisarkisto, jonka Brasilian
  ministeri José da Silva Paranhos vei Rio de Janeiron
  kansalliskirjastoon, restauroitiin ja luetteloitiin takaisin
  Asunciónin arkistoon vasta 1980-luvulla. — en-Wikipedia "Sacking of
  Asunción" (johdanto, Paraguayan National Archive -osio)
- Asunción pysyi brasilialaisjoukkojen miehittämänä vuoteen 1876 asti.
  — en-Wikipedia "Sacking of Asunción" / "Asunción" (Post-independence
  period -osio)

**Nosto H3 — "Presidentin palatsi jossa ei asunut presidenttiä" (659 merkkiä)**

> Carlos Antonio López tilasi vuonna 1857 palatsin, jonka piti tulla
> hänen poikansa ja seuraajansa Francisco Solano Lópezin kodiksi –
> mutta poika ei ehtinyt koskaan asua siellä. Sota keskeytti
> rakennustyöt, ja tammikuussa 1869 brasilialais-argentiinalaiset
> joukot ryöstivät koristeet ja huonekalut ja majoittuivat palatsiin
> koko seitsenvuotisen miehityksensä ajaksi – vuoteen 1876 mennessä
> rakennus oli täysin rappeutunut. Vasta presidentti Juan Bautista
> Egusquiza sai palatsin valmiiksi 1894, kolmekymmentä vuotta
> suunnitellun aikataulun jälkeen. Nykyään se on yhä hallituksen
> istuin: presidentti Santiago Peña vannoi virkavalansa sen
> edustalla elokuussa 2023.

Faktat ja lähteet:
- Palacio de los Lópezin rakentaminen alkoi 1857 presidentti Carlos
  Antonio Lópezin tilauksesta englantilaisen arkkitehti Alonso
  Taylorin johdolla; rakennus oli tarkoitettu Lópezin pojalle ja
  nimetylle seuraajalle, kenraali Francisco Solano Lópezille, mutta
  tämä ei koskaan asunut siellä. Rakennus oli olennaisesti valmis
  1867. — en-Wikipedia "Palacio de los López" (johdanto)
- Kolmoisliiton sota pakotti Solano Lópezin pakenemaan; brasilialais-
  argentiinalaiset joukot ryöstivät tammikuussa 1869 palatsin
  julkisivun vaurioita aiheuttaen ja koristeet ja huonekalut
  varastaen. Liittoutuneet majoittivat sotilaita rakennukseen koko
  seitsenvuotisen miehityksen ajan, ja vuoteen 1876 mennessä rakennus
  oli hylätty ja rappeutunut. — en-Wikipedia "Palacio de los López"
  (History-osio)
- Presidentti Juan Gualberto González yritti kunnostaa palatsin
  1890, mutta vallankaappaus keskeytti työn; Juan Bautista Egusquiza
  sai työn valmiiksi 1894 ja oli ensimmäinen presidentti, joka
  asettui sinne asumaan ja hallitsemaan. — en-Wikipedia "Palacio de
  los López" (History-osio)
- Palatsi on yhä Paraguayn hallituksen istuin (presidentti ei
  kuitenkaan asu siellä); nykyinen presidentti Santiago Peña vannoi
  virkavalansa palatsin alueella elokuussa 2023. — en-Wikipedia
  "Palacio de los López" (History-osio)

**Nosto H4 — "Kappeli joka odotti seitsemänkymmentä vuotta" (628 merkkiä)**

> Lokakuussa 1863 Francisco Solano López tilasi italialaiselta
> arkkitehti Alejandro Ravizzalta kappelin Neitsyt Marian kunniaksi.
> Kolmoisliiton sota keskeytti työt, ja rakennus jäi telineiden
> ympäröimäksi rauniona yli seitsemäksikymmeneksi vuodeksi – isoisä
> olisi nähnyt sen keskeneräisenä vuonna 1873, kymmenen vuotta
> rakentamisen alkamisesta. Vasta toisen sodan, Chacon sodan, jälkeen
> kappeli valmistui ja vihittiin Kansalliseksi Sankaripanteoniksi
> lokakuussa 1936. Nykyään sinne on haudattu muun muassa molemmat
> López-presidentit ja Acosta Ñun taistelun lapsisotilaat, ja
> kunniavartiosto vaihtuu edessä useita kertoja päivässä.

Faktat ja lähteet:
- Presidentti Francisco Solano López tilasi lokakuussa 1863 kappelin
  Neitsyt Marian kunniaksi; sen suunnitteli italialainen arkkitehti
  Alejandro Ravizza yhdessä rakennuttaja Giacomo Colombinon kanssa.
  — en-Wikipedia "National Pantheon of the Heroes" (johdanto)
- Kolmoisliiton sodan jälkeen rakennus jäi keskeneräiseksi ja
  telineiden ympäröimäksi yli seitsemäksikymmeneksi vuodeksi; se
  valmistui ja vihittiin presidentin asetuksella Kansalliseksi
  Sankaripanteoniksi vasta Chacon sodan (1932–1935) jälkeen,
  12.10.1936. — en-Wikipedia "National Pantheon of the Heroes"
  (johdanto)
- Panteoniin on haudattu mm. Carlos Antonio López (ensimmäinen
  perustuslaillinen presidentti), Francisco Solano López, kenraali
  José Félix Estigarribia puolisoineen (Chacon sodan sankari) sekä
  Acosta Ñun taistelun lapsisotilaat ja kaksi tuntematonta sotilasta;
  julkisivussa lukee latinaksi "Fides et Patria". — en-Wikipedia
  "National Pantheon of the Heroes" (johdanto)
- Kunniavartiosto vaihtuu rakennuksen edessä useita kertoja päivässä.
  — en-Wikipedia "National Pantheon of the Heroes" (johdanto)

### Teemasivu `kulttuuri` (Guaraní-perintö ja arki) — 4 nostoa

**Nosto L1 — "Kuppi joka kiertää tuntemattomallekin" (519 merkkiä)**

> Tereré on jääkylmää yerba matea, johon lisätään pohã ñana –
> lääkinnällisiä ja virkistäviä yrttejä – ja jota juodaan yhteisestä
> sarviastiasta metallipilliä myöten kädestä käteen: samasta pillistä
> juo koko seurue. Perinne juontaa esikolumbiaanisesta ajasta ja
> vakiintui jesuiittalähetysten aikana. Joulukuussa 2020 Unesco julisti
> teréren ja sen valmistustaidon aineettomaksi kulttuuriperinnöksi.
> Paraguayssa se on virallinen kansallisjuoma, ja sille on omistettu
> oma päivä, joka vietetään helmikuun viimeisenä lauantaina.

Faktat ja lähteet:
- Tereré on guaraníalkuperäinen jääkylmä yerba mate -uute, johon
  lisätään pohã ñana -lääkinnällisiä ja virkistäviä yrttejä; sitä
  juodaan yhteisestä guampa-astiasta bombilla-pillillä, joka kiertää
  seurueessa kädestä käteen. Juomatapa juontaa esikolumbiaaniselta
  ajalta ja vakiintui perinteeksi siirtomaakaudella; sitä levittivät
  jesuiittalähetysten muuttajat. — en-Wikipedia "Tereré" (johdanto,
  History-osio)
- Unesco julisti teréren ja sen valmistuskäytännöt (pohã ñana)
  aineettomaksi kulttuuriperinnöksi 17.12.2020. — en-Wikipedia
  "Tereré" (johdanto)
- Tereré on julistettu Paraguayn viralliseksi juomaksi ja kansalliseksi
  kulttuuriperinnöksi (asetus 219/2019); "kansallista tereré-päivää"
  vietetään joka vuoden helmikuun viimeisenä lauantaina. — en-Wikipedia
  "Tereré" (johdanto)

**Nosto L2 — "Pitsi joka kantaa hämähäkin nimeä" (481 merkkiä)**

> Ñandutí tarkoittaa guaraniksi hämähäkinseittiä, ja pitsi tehdään
> juuri sen näköiseksi: säteittäin kehykseen pingotetuista puuvilla-
> tai silkkilangoista syntyy pyöreitä, seittimäisiä kuvioita, joihin
> voi kertyä satakaksikymmentä sädettä yhtä kiekkoa kohti. Tekijä
> käyttää työssään vain kolmea välinettä – lyijykynää kuvion
> piirtämiseen, neulaa kudontaan ja saksia, joilla valmis kuvio
> lopuksi irrotetaan alustakankaasta. Ñandutí on yhä yksi Paraguayn
> tunnetuimmista käsityölajeista.

Faktat ja lähteet:
- Ñandutí tarkoittaa "hämähäkinseittiä" guaranin kielellä, Paraguayn
  virallisella alkuperäiskielellä; pitsi tehdään pingottamalla kangas
  kehykseen ja luomalla säteittäisiä, seitin näköisiä kuvioita
  puuvilla- tai silkkilangasta. — en-Wikipedia "Ñandutí" (johdanto)
- Yksittäiseen kiekkoon (motiiviin) venytetään tyypillisesti 120–150
  sädelankaa; tekniikka etenee kolmessa vaiheessa, joita tekijä
  kutsuu välineensä mukaan: lyijykynävaihe (kuvion piirto), neulavaihe
  (kudonta ja motiivien tekeminen) ja saksivaihe (valmiin kuvion
  irrotus alustakankaasta). — en-Wikipedia "Ñandutí" (Technique-osio)

**Nosto L3 — "Rantabulevardi joka syntyi juhlavuodesta" (463 merkkiä)**

> Kun Paraguay vietti itsenäisyytensä kaksisataavuotisjuhlaa
> toukokuussa 2011, Asunción avasi samalla uuden rantapuiston, joka
> yhdistää kaupungin vanhat rakennukset toisiinsa: Palacio de los
> López, Cabildo ja katedraali ovat nyt kävelymatkan päässä joen
> rannalta. Toinen rakennusvaihe, joka valmistui vuodesta 2019
> alkaen, toi lisää pyöräkaistoja, siltoja ja liikuntapaikkoja.
> Osalle hankkeen tieltä siirtyneistä perheistä rakennettiin 144
> uutta asuntoa lähistölle.

Faktat ja lähteet:
- Noin 13 hehtaarin rantapuisto (Coastal Linear Park / Parque
  Lineal Costanera) yhdistää kaupungin vanhoja rakennuksia, kuten
  Palacio de los Lópezin, Cabildon ja katedraalin; se avattiin
  toukokuussa 2011 osana Paraguayn itsenäisyyden kaksisataavuotis-
  juhlallisuuksia. — en-Wikipedia "Asunción" (Coastal Linear Park
  -osio)
- Hankkeen toinen vaihe (rakennustyöt alkoivat 2019) lisäsi
  pyöräkaistoja, pysäköintiä, siltoja, urheilukenttiä ja muita
  virkistysalueita. — en-Wikipedia "Asunción" (Coastal Linear Park
  -osio)
- Hankkeen tieltä siirtyneille perheille rakennettiin 144 uutta
  asuntoa uuteen naapurustoon Avenida Costanera Norten ja Parque
  Bicentenarion rakennusprojektien yhteydessä. — en-Wikipedia
  "Asunción" (Social housing -osio)

**Nosto L4 — "Lahti joka on tärkeämpi linnuille kuin ihmisille" (534 merkkiä)**

> Asunciónin lahti kaupungin luoteispuolella ei näytä paljolta – matala,
> kausittain tulvivaa ruovikkoa ja mutarantaa – mutta linnuille se on
> yksi Etelä-Amerikan tärkeimmistä pysähdyspaikoista. Alueelta on
> laskettu 258 lintulajia, joista seitsemän on maailmanlaajuisesti
> uhanalaisia ja 28 pesii Pohjois-Amerikassa ja muuttaa talveksi
> tänne saakka. Yli kolme prosenttia koko maailman kanelisirriäisten
> kannasta lepää lahdella muuttomatkallaan – riittävästi, jotta lahti
> on virallisesti luokiteltu kansainvälisesti tärkeäksi lintualueeksi.

Faktat ja lähteet:
- Asunciónin lahti sijaitsee kaupungin luoteispuolella, ja sen
  elinympäristöt vaihtelevat huomattavasti Paraguayjoen kausittaisen
  vedenkorkeuden mukaan (tulva-alueesta hiekka- ja savirantoihin ja
  ruohikkoon). — en-Wikipedia "Asunción" (Biogeography-osio)
- Alueelta on kirjattu yhteensä 258 lintulajia, joista 7 on
  maailmanlaajuisesti uhanalaisia ja 28 pesii Pohjois-Amerikassa ja
  muuttaa talveksi Etelä-Amerikkaan. — en-Wikipedia "Asunción"
  (Biogeography-osio)
- Yli 3 % koko maailman kanelisirriäiskannasta (Tryngites
  subruficollis) kulkee lahden kautta muuttomatkallaan, minkä
  ansiosta Asunciónin lahti on luokiteltu kansainvälisesti tärkeäksi
  lintualueeksi (Important Bird Area, IBA). — en-Wikipedia "Asunción"
  (Biogeography-osio)

---

## 3. Viisi jaksoehdotusta matkaoppaaseen

Faktat on valittu niin, etteivät ne toista osion 2 nostoja tai
kulttuurivisan vastauksia sanasta sanaan.

**Jakso 1 — "Risteysasema Mercosurin sydämessä"**

Asunción sijaitsee strategisesti Mercosur-kauppaliiton keskellä,
lähellä Buenos Airesia, Montevideota, Córdobaa, São Pauloa ja Porto
Alegrea, ja on lähes yhtä kaukana Tyynestä- kuin Atlantin valtamerestä.
Kaupunki isännöi 2031 Pan-Amerikan kisoja, ja sen pörssi (BVPASA)
listaa maan yrityksiä. Rio de la Platan altaan vanhimpana yhtäjaksoisesti
asuttuna alueena kaupunki on toiminut satama- ja kauppapaikkana yli
neljäsataa vuotta.

Faktat ja lähteet:
- Asunción sijaitsee strategisesti Mercosurin kannalta, Eteläisen
  kartion pohjois-keskiosassa, lähellä Buenos Airesia, Montevideota,
  Córdobaa, Rosariota, Curitibaa, São Pauloa, Porto Alegrea ja Santa
  Cruz de la Sierraa; se on n. 1300 km Tyynestämerestä ja n. 1000 km
  Atlantilta. — en-Wikipedia "Asunción" (johdanto)
- Asunción isännöi vuoden 2031 Pan-Amerikan kisoja. — en-Wikipedia
  "Asunción" (johdanto)
- Asunción on yksi Río de la Platan altaan pisimpään yhtäjaksoisesti
  asutuista alueista Etelä-Amerikassa. — en-Wikipedia "Asunción"
  (johdanto)

**Jakso 2 — "Halvin ja turvallisin"**

Asunción on toistuvasti listattu maailman edullisimpien pääkaupunkien
joukkoon matkailijalle, ja InSight Crime -järjestön mukaan se on
Latinalaisen Amerikan kolmanneksi turvallisin pääkaupunki Buenos
Airesin ja Santiagon jälkeen. Vuosina 2010–2015 kaupunki sai
Iberoamerikan "vihreän pääkaupungin" arvonimen ympäristöindikaattoreiden
perusteella, ja metropolialueen bruttokansantuote on nyt lähes 70
miljardia dollaria – noin 70 prosenttia koko maan tuotannosta.

Faktat ja lähteet:
- Asunción on toistuvasti listattu yhdeksi maailman edullisimmista
  kaupungeista ulkomaalaiselle matkailijalle, ja InSight Crimen mukaan
  Latinalaisen Amerikan kolmanneksi turvallisin pääkaupunki Buenos
  Airesin ja Santiagon jälkeen. — en-Wikipedia "Asunción" (johdanto)
- Vuosina 2010–2015 (intendantti Arnaldo Samaniegon kaudella) Asunción
  julistettiin "Iberoamerikan vihreäksi pääkaupungiksi" Lissabonissa
  UCCI-kokouksessa seitsemän ympäristö- ja kaupunkisuunnitteluindikaattorin
  perusteella. — en-Wikipedia "Asunción" (Green capital -osio)
- Metropolialueen BKT (PPP) vuodelle 2026 on arvioitu 69,386 miljardiksi
  dollariksi; kaupunki tuottaa n. 70 % koko Paraguayn BKT:stä.
  — en-Wikipedia "Asunción" (Infobox, johdanto)

**Jakso 3 — Arjen ilmiö: raitiovaunu joka kulki jo isoisän aikaan**

Asunciónissa kulki raitiovaunu jo vuodesta 1871 – kaksi vuotta ennen
isoisän matkaa – ensin hevosvetoisena ja höyryvoimaisena, sähköistettynä
vasta 1913. Verkosto ajoi lähes 130 vuotta ja suljettiin lopullisesti
marraskuussa 1997: liikennemuoto, jonka isoisä olisi juuri ehtinyt
nähdä syntyvän, katosi kaupungista kokonaan ennen 2000-lukua.

Faktat ja lähteet:
- Raitiotie Asunciónissa avattiin 1871, aluksi hevosvetoisena ja
  höyryvetoisena; sähköraitiovaunut otettiin käyttöön 1913. Viimeinen
  reitti lakkautettiin n. 1995, virallinen sulkeminen marraskuussa
  1997. — en-Wikipedia "Asunción" (Post-independence period -osio)
- HUOM: lähdeartikkelissa on kuva vuodelta 1986 kuvatekstillä "A tram
  in the city centre in 1986. The tram system closed in the late
  1990s" — tämä vahvistaa saman aikajanan (raitiovaunu ajoi vielä
  1986, suljettiin 1990-luvun lopulla) toisesta kohdasta artikkelia.
  Kirjoittajan kannattaa tarkistaa oma "Trams in Asunción" -artikkeli
  erikseen, jos jaksoon halutaan enemmän yksityiskohtia (kalusto,
  linjat) — sitä ei ole luettu tähän faktapohjaan.

**Jakso 4 — Historian käännekohta: kaupunki joka synnytti Mercosurin**

Maaliskuussa 1991, kaksi vuotta demokratisoitumisen jälkeen, Asunciónissa
allekirjoitettiin Argentiinan, Brasilian, Uruguayn ja Paraguayn
presidenttien kanssa Asunciónin sopimus, joka perusti Etelän yhteismarkkinat
eli Mercosurin. Nimi Asunción on siitä lähtien kytkeytynyt koko
Etelä-Amerikan talousintegraatioon – ja kaupungin lentokentän vieressä
sijaitseva Luque isännöi nykyään Etelä-Amerikan jalkapalloliittoa
CONMEBOLia.

Faktat ja lähteet:
- Maaliskuussa 1991 allekirjoitettiin Asunciónin sopimus Argentiinan,
  Brasilian, Uruguayn ja Paraguayn presidenttien kesken; se perusti
  Etelän yhteismarkkinat (Mercosur), alueellisen integraatio-
  organisaation. — en-Wikipedia "Asunción" (20th century to the
  present -osio) — HUOM lähdeteksti mainitsee sopimuksen ajoittuvan
  "kaksi vuotta [Stroessnerin] vallankaappauksen jälkeen"; olen
  jättänyt diktaattorin nimen ja vallankaappauksen pois Raamatun
  nykypolitiikkarajauksen mukaisesti ja käyttänyt neutraalia
  "demokratisoitumisen" ilmausta, ks. osio 7.
- Metropolialueen Luquen kaupunginosa on Etelä-Amerikan
  jalkapalloliiton (CONMEBOL) päämaja. — en-Wikipedia "Asunción"
  (johdanto)

**Jakso 5 — Milloin kannattaa tulla**

Asunciónin ilmasto on kostea subtrooppinen: kesät (joulu–helmikuu)
ovat hyvin kuumia ja kosteita, tammikuun keskilämpötila on noin 28
astetta, kun taas talvet (kesä–elokuu) ovat leudompia, heinäkuun
keskilämpötila noin 17 astetta, joskin pakkasöitäkin esiintyy.
Sademäärä on suurimmillaan huhtikuussa, pienimmillään heinäkuussa.
Ennätyskuumin päivä mitattiin lokakuussa 2023 (43,0 °C), ennätyskylmin
kesäkuussa 2011 (−1,2 °C).

Faktat ja lähteet:
- Köppen-luokka Cfa (kostea subtrooppinen ilmasto): erittäin kuumat,
  kosteat kesät (tammikuun keskilämpötila n. 28 °C) ja leudot talvet
  (heinäkuun keskilämpötila n. 17 °C); vuoden keskilämpötila n. 23 °C.
  — en-Wikipedia "Asunción" (Climate-osio)
- WMO:n 1991–2020-normaalien mukaan sademäärältään sadeisin kuukausi
  on huhtikuu (166 mm) ja kuivin heinäkuu (39 mm; koko vuoden
  sademäärä n. 1462 mm, 83 sadepäivää). — en-Wikipedia "Asunción"
  (Climate-osio, Weather box)
- Ennätyskuumin mitattu lämpötila 43,0 °C (17.10.2023), ennätyskylmin
  −1,2 °C (27.6.2011). — en-Wikipedia "Asunción" (Climate-osio)
- **HUOM:** yllä olevat luvut ovat en-Wikipedian Climate-osion WMO
  1991–2020-normaaleja (Weather box -taulukko), EIVÄTKÄ ole sama asia
  kuin pelin `saatiedot.js`-riville tarvittava ERA5 1991–2020
  -normaali — nämä ovat lähempänä toisiaan kuin useimmissa aiemmissa
  faktapohjissa, mutta tarkat kuukausinormaalit haetaan silti
  kirjoitusvaiheessa `tools/hae-saanormaalit.mjs`-työkalulla.

---

## 4. Kahdeksan kohdekartan kohdetta (+ vertailupiste)

Koordinaatit poimittu Wikipedian `action=query&prop=coordinates`
-rajapinnasta kullekin kohdeartikkelille erikseen. Etäisyydet ja
suunnat OMIA LASKELMIANI koordinaattieroista (asteet × 111 km,
pituusasteille kerrottu cos(25,286°) ≈ 0,904), tarkistettu
Node-skriptillä — sama menetelmä kuin faktapohja-christchurch.md:ssä.

**Vertailupiste on La Catedral, Asunciónin vanhan kaupungin
historiallinen ydinkaupunginosa** (spec-mantereet.md sääntö 4: kartan
keskusta valitaan historiallisen ytimen mukaan, ei hallinnollisen
koordinaattipisteen — San Franciscon ennakkotapaus, jossa Wikipedia-piste
on ~2 km ytimestä). Asunciónissa tämä ei ole ongelma samalla tavalla:
Wikipedian oma infobox-koordinaatti kaupungille (25°16'48"S 57°38'4"W
≈ 25,2800°S 57,6344°W) osuu jo alle 100 metrin päähän tästä
historiallisesta ytimestä, koska kaupunki ei ole koskaan siirtänyt
keskustaansa. La Catedral -kaupunginosan oma Wikipedia-artikkeli
kuvaa aluetta nimenomaan muuttumattomana ytimenä 1543 suurpalosta asti
ja luettelee juuri ne nähtävyydet (Cabildo, Independencia-aukio,
siirtomaa-ajan postitalo, Panteón, Casa de la Independencia, Uruguayn
aukio), jotka muodostavat luontevan kohdekartan ytimen.

| # | Nimi | Koordinaatit (desimaali) | Lähdeartikkeli | Etäisyys/suunta vertailupisteestä |
|---|---|---|---|---|
| 1 | La Catedral, kaupunginosan keskipiste (vertailupiste) | 25,286°S 57,634°W | "Catedral (Asunción)" | (vertailupiste) |
| 2 | National Pantheon of the Heroes | 25,2822°S 57,6352°W | "National Pantheon of the Heroes" | ~0,44 km luoteeseen |
| 3 | Asunción Cathedral | 25,2816°S 57,6324°W | "Asunción Cathedral" | ~0,51 km koilliseen |
| 4 | Casa de la Independencia Museum | 25,2806°S 57,6362°W | "Casa de la Independencia Museum" | ~0,64 km luoteeseen |
| 5 | Cultural Center of the Republic (Cabildo) | 25,2798°S 57,6337°W | "Cultural Center of the Republic" | ~0,69 km koilliseen |
| 6 | Palacio de los López | 25,27764°S 57,63757°W | "Palacio de los López" | ~1,00 km luoteeseen |
| 7 | Estadio Defensores del Chaco | 25,29207°S 57,65738°W | "Estadio Defensores del Chaco" | ~2,44 km lounaaseen |
| 8 | Mburuvicha Róga (presidentin nykyinen asuinpaikka) | 25,2931°S 57,6011°W | "Mburuvicha Róga" | ~3,39 km kaakkoon |
| 9 | Botanical Garden and Zoo of Asunción | 25,24877°S 57,57308°W | "Botanical Garden and Zoo of Asunción" | ~7,38 km koilliseen |

Kahdeksan varsinaista kohdetta (rivit 2–9) + vertailupiste (rivi 1)
täyttävät pyydetyn 8–10 kohteen välin. Rivi 9 (Jardín Botánico) on
selvästi kauempana kuin muut — kirjoittaja voi harkintansa mukaan
jättää sen pois tiiviistä kohdekartasta tai näyttää sen omana,
erillisenä pisteenään "Vihreä pääkaupunki" -teeman kera (ks. jakso 2).

**Kaksi kohdetta, joille EI löytynyt Wikipedian koordinaattia** (ks.
myös osio 7): Costanera-rantabulevardi (osio 2, L3) ei ole oma
Wikipedia-artikkeli eikä sillä siksi ole `{{coord}}`-tagia — se
kulkee juuri Palacio de los Lópezin ja Cabildon editse, joten
kirjoittaja voi käyttää jompaakumpaa näistä pisteistä approksimaationa
tai hakea tarkan koordinaatin OpenStreetMapista. Sama koskee
Asunciónin lahtea (osio 2, L4) ja Mercado 4:ää (ks. osio 7 ja 8) —
kummallakaan ei ole omaa en-Wikipedia-artikkelia koordinaatteineen.

---

## 5. Kuva-aiheet (Commons-kategoriat)

Kategoriat tarkistettu OLEMASSA OLEVIKSI JA SISÄLTÄVÄN KUVIA Commonsin
`action=query&titles=Category:...&prop=categoryinfo`-kutsulla 24.8.2026
(kuvamäärä tarkistettu jokaiselle, ei vain olemassaolo) — SISÄLTÖÄ EI
ole silmäilty, se on kirjoittajan työ kuvasääntöjen mukaisesti.
Kolmelle arvatulle nimelle (`Category:Ñandutí`, `Category:Costanera de
Asunción`, `Category:National Pantheon of the Heroes, Asunción`)
ensimmäinen arvaus EI osunut — oikeat nimet löytyivät `list=search`-haulla,
tismalleen sen varoituksen mukaisesti, että arvattu kategorianimi on
tässä projektissa kaatunut aiemmin. Commons-haku osui 429-rajoitukseen
useaan kertaan; odotin ja yritin uudelleen resepti-ohjeen mukaisesti.

**Avauskuvat (3):**
1. `Category:Asunción` (208 kuvaa) — laaja katunäkymä tai ilmakuva
   keskustasta / joen suuntaan.
2. `Category:Bay of Asunción` (5 kuvaa) — lahtinäkymä, kytkeytyy
   L4-nostoon ja "Asunciónin lahti" -painopisteeseen.
3. `Category:Palacio de los López` (40 kuvaa) — palatsin
   kokonaisnäkymä ulkoa, joen suunnasta jos mahdollista.

**Kansikuvat (3, LAAJOJA YLEISKUVIA — ei yksityiskohtia):**
1. `Category:Asunción` — kaupungin siluetti tai joen suuntainen
   näkymä keskustaan.
2. `Category:Palacio de los López` — koko rakennus ulkoa, ei
   sisäkuvia.
3. `Category:Panteón Nacional de los Héroes` (22 kuvaa) — koko
   rakennus ulkoa (huom: nimi eri kirjoitusasussa kuin Wikipedia-
   artikkeli, tarkista molemmat: `Category:Panteón Nacional de los
   Héroes` toimi haussa).

**Nosto-/jaksokuvat, sivuittain:**

*Kaupunki:*
- `Category:Cabildo of Asunción` (16 kuvaa; K1, siirtomaa-ajan
  keskusta)
- `Category:Bay of Asunción` (K2)
- `Category:Guaraní` (235 kuvaa) tai `Category:Indigenous peoples of
  Paraguay` (27 kuvaa, tarkempi) — K3, nykyinen elävä guaraníkulttuuri;
  TARKISTA ettei kuvissa ole tunnistettavia kasvoja ilman lupaa eikä
  kurjuuskuvastoa (spec-mantereet.md Oseania-linjaus sovelletaan
  samalla periaatteella)
- `Category:Casa de la Independencia, Asunción` (13 kuvaa; K4)

*Kolmoisliiton sota ja miehitys:*
- `Category:War of the Triple Alliance` (205 kuvaa, laaja — sisältää
  taistelukuvia, JOTKA EIVÄT SOVI raamattuun; valitse vain
  kaupunkikuvia/muotokuvia/karttoja) tai tarkemmin `Category:Battles
  of the Paraguayan War` (H1)
- `Category:War of the Triple Alliance` (H2 — ei omaa "Sacking of
  Asunción" -kategoriaa Commonsissa, ks. osio 7)
- `Category:Palacio de los López` (H3)
- `Category:Panteón Nacional de los Héroes` (H4)

*Guaraní-perintö ja arki:*
- `Category:People with tererés` (14 kuvaa; L1 — huom epätavallinen
  kategorianimi, tarkistettu olemassa olevaksi)
- `Category:Crafts of Paraguay` (47 kuvaa; L2, ñandutí-kuvat löytyvät
  täältä, ei omasta ñandutí-kategoriasta)
- `Category:Avenida Costanera, Asunción` (5 kuvaa; L3)
- `Category:Bay of Asunción` (L4)

*Kohdekartta (täydentäviksi, ei nostoa varten):*
- `Category:Estadio Defensores del Chaco` (17 kuvaa)
- `Category:Botanical Garden and Zoo of Asunción` (35 kuvaa)

---

## 6. Säätiedot

Ks. osio 3, Jakso 5 — samat luvut, sama lähde (en-Wikipedian
Climate-osion WMO 1991–2020 Weather box).

---

## 7. Ristiriidat, epävarmuudet ja huomiot

1. **Vahvin löytämäni "isoisän matkan vuosi 1873" -kulma on
   kaksinkertainen** (H3, H4): sekä Palacio de los López että Panteón
   de los Héroes olivat vuonna 1873 sodan runtelemia, keskeneräisiä
   tai rappeutuvia rakennuksia — Palacio oli juuri ryöstetty ja
   liittoutuneiden joukkojen majoituskäytössä, Panteón oli ollut
   telineiden ympäröimänä jo kymmenen vuotta eikä valmistunut vielä
   68 vuoteen. Molemmat ovat nyt kaupungin tärkeimpiä nähtävyyksiä.
   Suosittelen pitämään tämän kaksoiskulman historia-sivun ytimenä.
2. **Väestötappioluvut ovat poikkeuksellisen kiistanalaisia, enemmän
   kuin useimmissa aiemmissa faktapohjissa.** En-Wikipedian
   "Paraguayan War" -artikkeli itse toteaa, ettei tarkkoja lukuja
   ehkä koskaan saada selville, ja esittää haarukan noin 21 000:sta
   (7 %, Reber 1988) aina 60–70 prosenttiin (Whigham & Potthast 1999)
   — ja mainitsee myös vanhempia, tukemattomia 90 %:n arvioita.
   Kirjoitin H1-nostoon kaksi ääripäätä (matalin ja Whigham-Potthastin
   arvio) SEKÄ 1871 väestönlaskennan konkreettisen luvun, jotta
   lukijalle välittyy sekä haarukan laajuus että yksi kova fakta.
   Vältin tarkoituksella "jopa 90 %" -väitettä, koska artikkeli
   itse sanoo sen olevan "ilman tukea" (without support).
3. **Kolmoisliiton sodan nimi vaihtelee lähteissä**: en-Wikipedian
   pääartikkeli on nimeltään "Paraguayan War" mutta viittaa itseensä
   toistuvasti myös "War of the Triple Alliance" -nimellä, ja
   Commons-kategoriakin on tällä toisella nimellä. Käytin suomeksi
   vakiintunutta "Kolmoisliiton sota" -nimeä (sama kuin tehtävänannossa)
   koko ajan.
4. **Asunciónin kielitilasto (Language-osio: espanja 56,9 %, guaraní
   11,2 %, jopará 27,4 %, muut 4,5 %) on artikkelissa merkitty
   {{citation needed}} ilman viitettä ja vuodelta 2012.** Käytin sitä
   K3-nostossa varovaisesti kaupungin (ei koko maan) tason kontrastina
   maan yleiseen "guaraní on enemmistön kieli" -faktaan, joka SEN
   SIJAAN on kunnolla lähdetetty "Guarani language" -artikkelissa.
   Kirjoittajan kannattaa harkita, ottaako epävarman kaupunkitason
   luvun mukaan vai jättääkö sen pois.
5. **Casa de la Independencia -museon artikkeli on poikkeuksellisen
   heikosti lähdetetty** — lähes joka kappale on merkitty
   {{citation needed}}. Käytin siitä vain rakennuksen ikään,
   rakennusmateriaaleihin ja 14.–15.5.1811 tapahtumien pääpiirteisiin
   liittyviä faktoja, jotka toistuvat myös muissa Asunción-artikkelin
   kohdissa (Early history -osio mainitsee saman tapahtuman
   itsenäisesti), ja jätin pois yksityiskohtaisemmat, vain tässä
   yhdessä lähteessä esiintyvät väitteet (esim. yksittäisten
   huonekalujen alkuperä).
6. **"Guarania opetetaan 12 maassa" -väitettä (Guarani people
   -artikkelin lähde) EN käyttänyt** — lähde on Paraguayn
   kieliviraston oma tiedote (spl.gov.py) ja vaikuttaa
   ylitulkitulta/promotionaaliselta muihin lähteisiin verrattuna.
   Käytin sen sijaan vahvempia, riippumattomampia faktoja (perustus-
   laki 1992, sensuslukuja, Mercosur-asema).
7. **Jakso 4:n lähdeteksti mainitsee eksplisiittisesti Alfredo
   Stroessnerin vallankaappauksen** ("just two years after the coup
   d'état against the government of Alfredo Stroessner") ajoituksena
   Mercosurin perustamiselle. Raamatun rajaus ("Stroessnerin
   diktatuuri 1954–1989 on nykypolitiikkaa — jätä pois") koskee
   ilmeisesti ITSE Stroessnerin kautta aiheena, ei sitä, että
   myöhempi, siitä riippumaton tapahtuma (Mercosurin synty) sattuu
   ajallisesti sen jälkeen — mutta olen silti tarkoituksella
   pehmentänyt Jakso 4:n muotoilun "demokratisoitumisen" -sanaan
   enkä mainitse diktaattorin nimeä, koska en ollut varma rajauksen
   tarkasta ulottuvuudesta. Kirjoittajan/Fablen kannattaa vahvistaa
   tämä tulkinta.
8. **Mercado 4:lle (Nelostori) EI löytynyt en-Wikipedia-artikkelia
   lainkaan** haku- eikä suorayrityksellä, eikä Commonsista löytynyt
   sille omaa kategoriaa. Tori on kuitenkin jo pelin arrival-kortissa
   (js/packs/southamerica-valokuvat.js, ks. osio 8) omalla, tarkistetulla
   Commons-kuvallaan (David Ramalleira, CC BY 2.0) — kirjoittaja voi
   käyttää sitä sellaisenaan, mutta uusia FAKTOJA (perustamisvuosi,
   kauppiasmäärä yms.) Mercado 4:stä ei voi tässä faktapohjassa
   vahvistaa en-Wikipediasta.
9. **Costanera-rantabulevardilla ja Asunciónin lahdella ei ole omaa
   Wikipedia-koordinaattia** (ks. osio 4) — molemmat kuvataan vain
   pääartikkelin "Asunción" tekstissä ilman `{{coord}}`-tagia.
   Kirjoittajan on haettava tarkat pisteet muualta (esim. OpenStreetMap)
   jos ne halutaan omina pisteinään kohdekartalle.
10. **Vain en-Wikipediaa ja sen raakatekstiä (action=raw) käytetty
    kaikkiin faktoihin**, paitsi Commons-kategorioiden olemassaolo- ja
    kuvamäärätarkistukseen (osio 5), joka käytti Commonsin
    `action=query`- ja `list=search`-rajapintoja. Ei ulkopuolisia
    hakuja tämän faktapohjan sisältöön.
11. **`docs/mantereet-tyoaineisto/spec-mantereet.md` oli tehtävänannon
    lukulistalla** ja sen P-Amerikka-osio sekä kaikkia kolmea uutta
    mannerta koskevat viisi linjausta (mm. sääntö 4 kohdekartan
    ytimestä, sääntö 5 katastrofien käsittelystä) on sovellettu
    suoraan tähän faktapohjaan — Paraguayn erityisosio spec-
    mantereet.md:ssä ei mainitse Asunciónia nimeltä, mutta yleissääntö
    5 ("katastrofit ovat perushistoriaa... uhriluvun ristiriita
    kirjoitetaan auki lähteineen, ei valita yhtä lukua") sopii
    suoraan Kolmoisliiton sotaan, vaikka se ei ole luonnonkatastrofi.

---

## 8. Päällekkäisyyksien välttäminen (kysymykset + FACTS-taulu)

**`southamerica-questions.js`, kohta `asuncion` (5 kysymystä):**

1. Paraguayn pääkaupunki -kysymys, fact: "Asunción on Paraguayn
   pääkaupunki ja Etelä-Amerikan vanhimpia kaupunkeja — se perustettiin
   jo 1537." — TOISTUU osittain K1-nostossani (perustamisvuosi 1537),
   mutta K1 lisää UUTTA: perustajan nimen, tarkan päivämäärän,
   nimen alkuperän ja "kaupunkien äiti" -taustan (yli 70 siirtokuntaa,
   Buenos Airesin toinen perustaminen). Tarkistin, ettei sanamuoto
   toista visan fact-kenttää.
2. Kaksi virallista kieltä -kysymys, fact: "Paraguay on ainoita
   Amerikan maita, joissa alkuperäiskansan kieli on koko kansan
   arkikieltä espanjan rinnalla." — Vastaus löytyy K3-nostostani, joka
   SYVENTÄÄ tätä uusilla yksityiskohdilla (1992 perustuslaki, Mercosur-
   asema, kaupungin oma kielijakauma) toistamatta itse fact-kentän
   sanamuotoa.
3. Paraguayjoki-kysymys, fact: "Paraguayjoki yhdistää sisämaan
   pääkaupungin mereen — laivat kulkevat sitä pitkin Buenos Airesiin
   asti." — Oma K2-nostoni käsittelee jokea MAANTIETEELLISESTÄ
   näkökulmasta (sijainti, lahti, kukkulat) eikä toista laivaliikenne-
   faktaa; Jakso 1 mainitsee joen vain ohimennen osana Mercosur-
   sijaintia.
4. Tereré-kysymys, fact: "Tereré on jääkylmää matea, jota juodaan
   yhteisestä kupista metallipillillä — se on Paraguayn kansallisjuoma."
   — L1-nostoni SYVENTÄÄ tätä (pohã ñana -yrtit, Unesco-status 2020,
   kansallinen tereré-päivä) ja käyttää eri sanamuotoja ("guampa" ja
   "bombilla" nimillä, ei vain "kuppi" ja "pilli") — tarkistin ettei
   toista visan fact-kenttää sanasta sanaan.
5. "Kaupunkien äiti" -kysymys, fact: "Asunciónista käsin perustettiin
   1500-luvulla monta kaupunkia, muun muassa Buenos Aires toiseen
   kertaan." — TÄMÄ ON LÄHES SAMA FAKTA kuin K1-nostoni viimeinen
   virke. Kirjoittajan ON PAKKO kirjoittaa K1:n vastaava kohta uusin
   sanoin (esim. lukumäärä "yli 70 siirtokuntaa" ja yksittäiset
   kaupunginnimet Villarrica/Corrientes/Santa Fe/Córdoba, joita visan
   fact-kenttä ei mainitse) EIKÄ saa kopioida visan sanamuotoa
   "Asunciónista käsin perustettiin... monta kaupunkia" suoraan.
   Merkitsen tämän erityisen tarkistettavaksi kohdaksi tarkistajalle.

**`SOUTHAMERICA_FACTS.asuncion` (kolme faktaa + isoisän repliikki):**

- "Asunción on Etelä-Amerikan vanhimpia pääkaupunkeja, ja sitä
  kutsutaan kaupunkien äidiksi..." — sama huomio kuin kysymys 5 yllä.
- "Paraguayssa puhutaan kahta virallista kieltä, espanjaa ja guarania.
  Guarani on alkuperäiskansan kieli, jota puhuu lähes koko kansa." —
  sama huomio kuin kysymys 2 yllä; K3-nosto syventää.
- "Kaupungissa juodaan tereréä eli jääkylmää matea, jota kaadetaan
  termoksesta kiertävään kuppiin — se on seurustelujuoma, ei
  janojuoma." — sama huomio kuin kysymys 4 yllä; L1-nosto syventää.
- Isoisän repliikki: "Jokilaiva puski virtaa vastaan monta päivää
  Buenos Airesista. Kaupunki toipuu raskaasta sodasta, mutta torilla
  myydään pitsiä ja appelsiineja, ja joka pihalla kasvaa hedelmäpuu."
  — Tämä on JO OLEMASSA OLEVA, päätoimittajan kaanonteksti (ei
  muuteta), mutta se vahvistaa H-teemasivuni keskeisen kulman:
  isoisä itse toteaa vuonna 1873 kaupungin olevan yhä "sodasta
  toipumassa" — täsmälleen sama ajallinen kohta jota H2- ja
  H3-nostoni käsittelevät yksityiskohtaisemmin. "Pitsiä" viittaa
  todennäköisesti ñandutíin (L2-nostoni aihe) mutta eri
  näkökulmasta (isoisän havainto torilla vs. käsityötekniikka).

**Olemassa olevat kuvat (`southamerica-valokuvat.js`):** kaupungilla on
jo neljä tarkistettua kuvaa (1912 sisällissota-aiheinen kärrykuva,
Mercado 4, tereré-infuusio, National Pantheon of the Heroes, sekä
"uusi"-kentässä Gran Palacio Nacional de Paraguay eli Palacio de los
López). Ehdotan, että L1 (tereré) JA H4 (Panteón) voivat käyttää joko
näitä olemassa olevia, jo tarkistettuja kuvia UUDELLEEN samaan tapaan
kuin kaupunkilehti.md:n "Vasa-laiva"-ennakkotapaus sallii, TAI hakea
uuden, eri kuvan samasta kategoriasta — kirjoittaja päättää. Palacio-
kuva ("uusi"-kenttä) ja H3-nostoni käsittelevät samaa rakennusta eri
näkökulmista (nykytila vs. 1873-historiaa) eivätkä siksi ole
päällekkäisiä sisällöltään, vain kuvaltaan mahdollisesti.
