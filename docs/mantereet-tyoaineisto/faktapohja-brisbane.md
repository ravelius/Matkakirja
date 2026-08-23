# Brisbane — faktakoostaja, uusi kaupunkilehti (Oseanian lauta)

Lauta-id `oceania`, kaupunki-id `brisbane`, maa AUS, en-Wikipedia "Brisbane"
(ellei toisin mainita). Kaikki tiedot haettu en-Wikipediasta **23.8.2026**
(`action=raw`, `NODE_USE_ENV_PROXY=1`; #REDIRECT tarkistettu jokaiselle
haetulle otsikolle — "Yuggera" ohjautuu artikkeliin "Jagera people",
"City Botanic Gardens" artikkeliin "Brisbane City Botanic Gardens",
"Mount Coot-tha" artikkeliin "Mount Coot-tha, Queensland"). Malli ja mitat
luettu tiedostoista `docs/aasia-tyoaineisto/lehtityo-resepti.md` (SITOVA)
ja `docs/moduulit/kaupunkilehti.md`, MALLIKSI
`docs/mantereet-tyoaineisto/faktapohja-melbourne.md` (rakenne ja
tarkkuustaso — Melbournen faktapohja oli itsekin Oseanian laudan
ensimmäinen, ja tämä noudattaa samaa jäsentelyä). Lisäksi luin
`docs/mantereet-tyoaineisto/spec-mantereet.md` — se on SITOVA koko
Oseanian laudalle (sama asema kuin spec-asia.md:llä) ja sisältää suoraan
sen kunnioitus-vaatimuksen, jota tehtävänannossa erikseen korostettiin
(turrbalit ja jagerat kuvataan nykyisinä kansoina). Kulttuurivisa
tarkistettu tiedostosta `js/packs/oceania-questions.js` (kohta `brisbane`,
viisi kysymystä: itärannikon sijainti, Gold Coast/Sunshine Coast -rannat,
Brisbane-joen nimi, Queenslandin pääkaupunkiasema, lämmin-kostea ilmasto
ympäri vuoden) — ks. osio 7, huomio 5, miten näiden vastauksia on
vältetty. Tarkistin myös olemassa olevat pakkatiedostot
(`js/packs/oceania-valokuvat.js`, `oceania-saapumiset.js`,
`oceania-countries.js`, `oceania.js`) välttääkseni saman kuvan tai saman
tarinan toiston — Brisbanella on jo saapumiskortti ja kolme valokuvaa
(Queen Street 1900, CityCat, Streets Beach, Story Bridge), mutta EI vielä
`kulttuuri-kategoriat.js`-merkintää, eli koko kaupunkilehti puuttuu.

**Tehtävän erityispiirre:** En kirjoittanut lehtitekstejä, en ladannut
kuvia enkä koskenut js/packs-tiedostoihin — kaikki alla on raaka-ainetta
kirjoittajalle ja riippumattomalle tarkistajalle.

**Sisältölinjaus (spec-mantereet.md, Oseania + Raamattu pilari 3):**
turrbalit ja jagerat (myös yuggerat/yagarat) kuvataan nykyisinä kansoina,
joilla on oma ääni ja oma nykykulttuuri — ei "kadonneen kansan"
romantiikkaa. Meanjin (myös Magandjin) mainitaan keskustan alkuperäisenä
nimenä. Siirtomaahistoria (rangaistussiirtola, maan menetys, "War of
Southern Queensland" -yhteenotot 1843–1855, myöhempi natiivioikeuksien
epääminen 2015/2017) todetaan tapahtumina neutraalisti ilman
yksityiskohtien korostamista tai kummankaan osapuolen
sankarikehystämistä — spec-mantereet.md:n sääntö 2 (isoisä on aikansa
lapsi, mutta piikki kohdistuu herroihin, ei paikallisiin). Rangaistus-
siirtolan ankaruudesta (komendantti Patrick Loganin maine) kerrotaan
maininnan tasolla, ei yksityiskohtina. Sokeriruo'on ja puuvillan
plantaasityövoiman värväys Tyynenmeren saarilta ("blackbirding")
1860-luvulta lähtien mainitaan neutraalisti historiallisena tosiasiana —
osuu suoraan isoisän matkan vuosikymmeneen.

---

## 1. Sivuehdotukset

### Sivu A — id `kaupunki`, nimi "Brisbane"

**Johdanto (n. 252 merkkiä):**

> Yarran sijaan Brisbanea halkoo oma mutkitteleva jokensa, jonka ympärille
> rangaistussiirtola kasvoi 1820-luvulla. Isoisän matkan aikaan kaupunki
> oli juuri tullut tuoreen Queenslandin siirtokunnan pääkaupungiksi ja
> rakensi ensimmäistä parlamenttitaloaan.

### Sivu B — teemasivu, ehdotettu id `historia`, nimi "Historia"

**Perustelu valinnalle:** Brisbanen 1820–1890-luvun aineisto tarjoaa
poikkeuksellisen tarkan 1873-osuman: parlamenttitalon rakennushistoria
(peruskivi 1865, George Streetin julkisivu 1868, pylväskäytävät vasta
1878) asettaa isoisän matkan täsmälleen rakennuksen keskeneräiseen
vaiheeseen, ja Vanha tuulimylly oli isoisän vieraillessa jo puolen
vuosisadan ikäinen signaaliasema aikapalloineen.

**Johdanto (n. 244 merkkiä):**

> Brisbane syntyi rangaistussiirtolana 1820-luvulla ja tuli Queenslandin
> pääkaupungiksi 1859. Isoisän matkan vuosina kaupunki rakensi
> parlamenttitaloaan vielä kesken, ja samat vuosikymmenet toivat
> kaupunkiin sekä tulvia että uutta väkeä kauempaa.

### Sivu C — teemasivu, ehdotettu id `luonto`, nimi "Luonto"

**Perustelu valinnalle:** Vahvin yksittäinen 1873-osuma koko
faktapohjassa on City Botanic Gardensin kuraattori Walter Hill, joka
istutti maailman ensimmäisen viljellyn makadamiapuun 1858 ja oli
edelleen puutarhan johdossa isoisän matkan aikaan (virassa 1855–1881).
Aihe tuo mukaan myös joen turrbal-nimen Maiwar ja Mount Coot-than
merkityksen turrbaleille (kunnioitus-pilari) ilman päällekkäisyyttä
historia-sivun kanssa.

**Johdanto (n. 237 merkkiä):**

> Isoisän matkan aikaan kasvitieteellistä puutarhaa johti yhä sama
> kuraattori, joka oli viisitoista vuotta aiemmin istuttanut maailman
> ensimmäisen viljellyn makadamiapuun. Kaupungin läpi mutkitteleva joki
> kantaa yhä turrbal-nimeään Maiwar.

### Sivu D — teemasivu, ehdotettu id `kaupunkikuva`, nimi "Kaupunkikuva"

**Perustelu valinnalle:** Brisbanen tunnetuimmat maamerkit — Story
Bridge, Tullitalo, Queen Street Mall ja World Expo 88:n perintö South
Bankissa — muodostavat oman, päällekkäisyydettömän kokonaisuutensa
kaupungin 1880–1990-luvun rakennetusta ympäristöstä ja sen muuttumisesta
nykyiseksi kaupunkikuvaksi. Sivu jatkaa luontevasti historia-sivun
jälkeen mutta pysyy selvästi eri aikakaudessa (1880-luvulta 1990-luvulle).

**Johdanto (n. 227 merkkiä):**

> 1880-luvun talousbuumi ja 1980-luvun maailmannäyttely muokkasivat
> Brisbanen kaupunkikuvan uusiksi kahteen otteeseen. Kuparikupolinen
> Tullitalo ja kaupungin läpi kaartuva Story Bridge ovat molemmat
> peruja näistä vuosikymmenistä.

**HUOM sivumäärästä:** tehtävänanto salli 1–3 teemasivua; käytin
kaikki kolme samalla perusteella kuin Melbournen faktapohja (v23.8.2026):
aineisto kantoi kolme selvästi erillistä, päällekkäisyydetöntä teemaa
(historia, luonto, kaupunkikuva) — ks. myös osio 7, huomio 1.

---

## 2. Kuusitoista nostoehdotusta (4 × 4 sivua)

### Sivu `kaupunki` — 4 nostoa

**Nosto K1 — "Rangaistussiirtola joka siirtyi paikasta toiseen" (576 merkkiä)**

> Brisbanen tarina alkoi rangaistussiirtolana: ensimmäinen leiri
> perustettiin Redcliffeen elokuussa 1824, mutta se siirrettiin jo
> seuraavana vuonna nykyisen keskustan kohdalle North Quaylle.
> Komendantti Patrick Loganin aikana asemasta tuli maineeltaan yksi
> Uuden Etelä-Walesin ankarimmista rangaistuslaitoksista. Siirtola
> suljettiin 1842, minkä jälkeen alue avautui vapaalle siirtokunnalle —
> ja vasta tästä alkoi kaupungin varsinainen kasvu. Vankityövoimalla
> rakennettuja rakennuksia, kuten Vanha tuulimylly ja
> Commissariat-varasto, seisoo yhä keskustassa muistuttamassa alusta.

Faktat ja lähteet:
- Ensimmäinen Moreton Bayn siirtolan leiri perustettiin Redcliffeen
  1824, ja se siirrettiin North Quaylle 1825. — en-Wikipedia "Brisbane"
- Komendantti Patrick Loganin aikana asema sai maineen yhtenä NSW:n
  ankarimmista rangaistuslaitoksista. — en-Wikipedia "Brisbane"
- Siirtola suljettiin 1842, minkä jälkeen alue avattiin vapaalle
  siirtokunnalle. — en-Wikipedia "Brisbane"
- Vanha tuulimylly (rakennettu 1824–1828 vankityövoimalla) on
  Queenslandin vanhin säilynyt rakennus; Commissariat-varasto
  (1828, William Street) rakennettiin niin ikään vankityövoimalla
  viljavarastoksi. — en-Wikipedia "The Old Windmill, Brisbane" /
  "Commissariat Store, Brisbane"

**Nosto K2 — "Nimi jonka takana on kuvernööri, ei paikka" (492 merkkiä)**

> Kaupungin nimi ei tule mistään paikallisesta piirteestä vaan
> brittiläisen Uuden Etelä-Walesin kuvernööristä: tutkimusmatkailija
> John Oxley nimesi joen 1823 kuvernööri Thomas Brisbanen mukaan, ja
> siirtokunta peri myöhemmin saman nimen. Alkuperäinen paikannimi on
> silti eri — turrbalit ja jagerat kutsuvat keskustan aluetta nimellä
> Meanjin (myös Magandjin), joka juontuu joko piikkimäisestä muodosta
> tai paikalla kasvaneesta tulppaanipuusta. Molemmat nimet ovat
> käytössä yhä nykyään rinnakkain.

Faktat ja lähteet:
- John Oxley nimesi Brisbane-joen 1823 kuvernööri Thomas Brisbanen
  mukaan; siirtokunta peri myöhemmin saman nimen. — en-Wikipedia
  "Brisbane" (Toponymy)
- Turrbal/Yuggera-nimi keskustan alueelle on Meanjin (myös Magandjin,
  Mianjin ja muita kirjoitusasuja); tulkinnat vaihtelevat "piikkipaikan"
  ja tulppaanipuun (magan) välillä. — en-Wikipedia "Brisbane" (Toponymy)
- Molemmat nimet ovat käytössä nykyään rinnakkain, esimerkiksi
  urheilutapahtumien ja kaupungin oman viestinnän yhteydessä.
  — en-Wikipedia "Brisbane" (Toponymy)

**Nosto K3 — "Kaupunki joka tuli pääkaupungiksi kesken rakennustyömaan" (574 merkkiä)**

> Kesäkuussa 1859 kuningatar Viktoria allekirjoitti kirjeen, joka erotti
> Queenslandin omaksi siirtokunnakseen Uudesta Etelä-Walesista, ja
> pienestä joenrantakaupungista tuli yhtäkkiä kokonaisen siirtokunnan
> hallintokeskus. Uusi asema näkyi heti kaduilla: parlamenttitalon
> peruskivi muurattiin 1865, ja sen ensimmäinen osa — George Streetin
> julkisivu — valmistui 1868, vain muutama vuosi ennen isoisän matkaa.
> Pylväskäytävät saivat valmiiksi vasta 1878, joten isoisä olisi nähnyt
> rakennuksen vielä osittain keskeneräisenä. Talo toimii Queenslandin
> parlamentin kotina yhä tänään.

Faktat ja lähteet:
- Kuningatar Viktoria allekirjoitti 6.6.1859 kirjeen, joka erotti
  Queenslandin omaksi itsehallinnolliseksi siirtokunnakseen Uudesta
  Etelä-Walesista; Brisbane valittiin pääkaupungiksi. — en-Wikipedia
  "Queensland" (History)
- Parlamenttitalon peruskivi muurattiin 14.7.1865; George Streetin
  julkisivu valmistui 1868. — en-Wikipedia "Parliament House, Brisbane"
- George Streetin pylväskäytävät ja holvikaaret valmistuivat vasta
  1878; Alice Streetin siipi vuonna 1889. — en-Wikipedia "Parliament
  House, Brisbane"

**Nosto K4 — "Kansat jotka olivat täällä ennen brittejä ja ovat yhä" (659 merkkiä)**

> Kauan ennen siirtolaa Brisbanen-joen varrella asuivat turrbalit
> pohjoisrannalla ja jagerat (myös yuggerat) eteläisemmillä alueilla —
> tarkkaa rajaa kansojen välillä ei tunneta, ja tutkijat ovat siitä eri
> mieltä yhä nykyään. Molemmat kansat kutsuivat nykyistä keskustaa
> nimellä Meanjin ja käyttivät jokea tärkeimpänä kokoontumis- ja
> ruokapaikkanaan. Vuosina 1998 ja 2011 jätetyt maaoikeusvaatimukset
> yhdistettiin 2013, mutta liittovaltion oikeus hylkäsi ne 2015 ja 2017.
> Kansat elävät ja vaikuttavat kaupungissa yhä — esimerkiksi
> turrbal- ja gubbi gubbi -taustainen oopperalaulaja ja esiintyvä
> taiteilija Maroochy Barambah tunnettiin laajasti kulttuurityöstään.

Faktat ja lähteet:
- Turrbalit asuivat perinteisesti Brisbanen-joen pohjoispuolella ja
  jagerat (yuggerat) eteläpuolella, mutta rajasta ja siitä, ovatko
  kansat erillisiä vai saman kansan osia, ei ole tutkijoiden kesken
  yksimielisyyttä. — en-Wikipedia "Turrbal" / "Jagera people"
- Meanjin/Magandjin oli molempien kansojen käyttämä nimi
  nyk. keskustan alueelle. — en-Wikipedia "Jagera people"
- Turrbalin maaoikeusvaatimus jätettiin 1998 ja Jageran 2011; vaatimukset
  yhdistettiin 2013. Liittovaltion oikeus hylkäsi vaatimukset tammikuussa
  2015 sillä perusteella, ettei yhtäjaksoista perinnettä voitu osoittaa;
  valitus hylättiin 25.7.2017. — en-Wikipedia "Turrbal" / "Jagera people"
  (Native title)
- Maroochy Barambah, turrbal- ja gubbi gubbi -taustainen oopperalaulaja
  ja esiintyvä taiteilija; hänen elämäntyötään kulttuurin ja taiteen
  parissa muisteltiin laajasti tammikuussa 2026. — en-Wikipedia
  "Turrbal" (Notable people)

### Teemasivu `historia` — 4 nostoa

**Nosto H1 — "Torni joka jauhoi viljaa ja vahti sitten satamaa" (606 merkkiä)**

> Wickham Terracella seisova Vanha tuulimylly on Queenslandin vanhin
> säilynyt rakennus: vankityövoima rakensi sen 1824–1828 jauhamaan
> siirtolan viljaa, ja torniin liitetty polkukone toimi paitsi
> voimanlähteenä tuulettomina päivinä myös vankien rangaistusvälineenä.
> Mylly lakkasi jauhamasta 1845, mutta sai uuden tehtävän vuodesta
> 1855: siitä tuli satamaan saapuvia laivoja tarkkaileva
> signaaliasema. Vuoden 1861 kunnostuksessa torniin asennettiin
> aikapallo kellojen tahdistamiseksi — juuri sellaisena isoisä olisi
> sen matkallaan nähnyt, kymmenisen vuotta ennen kuin signaalimiehen
> mökki pystytettiin viereen.

Faktat ja lähteet:
- Vanha tuulimylly rakennettiin 1824–1828 vankityövoimalla
  Wickham Terracelle; se on Queenslandin vanhin säilynyt rakennus.
  Siinä oli polkukone (treadmill) sekä voimanlähteenä että vankien
  rangaistusvälineenä. — en-Wikipedia "The Old Windmill, Brisbane"
- Mylly lakkasi jauhamasta viljaa 1845; vuodesta 1855 tornia
  käytettiin signaaliasemana laivaliikenteen tarkkailuun. — en-Wikipedia
  "The Old Windmill, Brisbane"
- Vuoden 1861 kunnostuksessa asennettiin aikapallo kellojen
  tahdistamiseksi; signaalimiehen mökki rakennettiin noin 20 vuotta
  myöhemmin (n. 1881). — en-Wikipedia "The Old Windmill, Brisbane"

**Nosto H2 — "Parlamentti joka rakentui vaiheittain isoisän ympärillä" (565 merkkiä)**

> Kun Queenslandista tuli oma siirtokunta 1859, sillä ei ollut vielä
> kunnollista parlamenttitaloa — kansanedustajat kokoontuivat entisessä
> vankibarakissa. Uuden rakennuksen peruskivi muurattiin heinäkuussa
> 1865, ja arkkitehti Charles Tiffinin suunnittelema George Streetin
> julkisivu valmistui 1868. Isoisän matkan aikaan 1873 rakennus oli
> siis jo käytössä, mutta yhä kesken: pylväskäytävät valmistuivat vasta
> 1878, ja Alice Streetin siipi vasta 1889. Hiekkakivet louhittiin
> rakentaja Joshua Jeaysin omista louhoksista, ja lasimaalaukset
> tilattiin Birminghamista asti.

Faktat ja lähteet:
- Parlamentti kokoontui 1860 alkaen entisessä vankibarakissa, koska
  uutta rakennusta ei vielä ollut. — en-Wikipedia "Parliament House,
  Brisbane"
- Peruskivi muurattiin 14.7.1865; arkkitehti Charles Tiffinin suunnitelma
  valittiin kilpailun jälkeen; George Streetin julkisivu valmistui 1868
  ranskalais-renessanssityyliin. — en-Wikipedia "Parliament House,
  Brisbane"
- Pylväskäytävät ja holvikaaret George Streetillä valmistuivat 1878;
  Alice Streetin siipi 1889. — en-Wikipedia "Parliament House, Brisbane"
- Rakentaja Joshua Jeays käytti omien louhostensa hiekkakiveä; kuninkaita
  esittävät lasimaalaukset tuotiin Birminghamista. — en-Wikipedia
  "Parliament House, Brisbane"

**Nosto H3 — "Tulva joka vei sillan mukanaan" (538 merkkiä)**

> Vuoden 1893 suurtulva jäi 1800-luvun Brisbanen historian
> merkittävimmäksi: se peitti laajoja alueita kaupungista ja vei
> mukanaan ensimmäisen Victoria Bridgen kokonaan. Sillan tilalle
> järjestettiin väliaikainen lauttayhteys, mutta se päättyi
> tragediaan vain kolme vuotta myöhemmin, kun Pearl-lautta kaatui
> helmikuussa 1896 — arviolta puolet kyydissä olleista 80–100
> ihmisestä hukkui. Tulvat eivät jääneet historiaan: kaupunki koki
> uudet suurtulvat 1974, 2011 ja 2022, ja jokainen niistä on
> muokannut sitä, miten Brisbane varautuu jokeensa.

Faktat ja lähteet:
- Vuoden 1893 suurtulva (helmikuu) inundoi laajoja alueita Brisbanesta
  ja vei mukanaan ensimmäisen Victoria Bridgen; yksi kaupungin
  historian merkittävimmistä tulvista. — en-Wikipedia "Brisbane"
  (History, 19th century)
- Väliaikainen lauttayhteys korvasi sillan; Pearl-lautan kaatuminen
  helmikuussa 1896 vaati arviolta puolet kyydissä olleista 80–100
  ihmisestä. — en-Wikipedia "Brisbane" (viittaa "Capsize of the ferry
  Pearl" -artikkeliin)
- Myöhemmät suurtulvat 1974 (osin hurrikaani Wandan seurausta), 2011
  ja 2022 uudistivat kaupungin tulvavarautumista. — en-Wikipedia
  "Brisbane" (History, 20th–21st century; Climate)

**Nosto H4 — "Satama joka välitti työvoimaa saarilta" (618 merkkiä)**

> 1860-luvulta lähtien Brisbanesta tuli tärkeä satama Tyynenmeren
> saarilta värvätylle työvoimalle, jota kuljetettiin Queenslandin
> plantaaseille sokeriruo'on ja puuvillan pariin. Työtä hoidettiin
> muodollisesti sopimustyön järjestelmällä, mutta rekrytointi oli
> usein harhaanjohtavaa ja liikkumisvapautta rajoitettiin —
> nykyhistorioitsijat pitävät käytäntöä orjuuden kaltaisena
> pakkotyönä. Sama vuosikymmen toi kaupunkiin myös saksalaisia
> maanviljelijöitä, skotlantilaisia ja irlantilaisia siirtolaisia
> sekä kiinalaisen kauppiasyhteisön — 1800-luvun lopun Brisbanesta
> tuli kokoaan suurempi, monikulttuurinen satamakaupunki.

Faktat ja lähteet:
- 1860-luvulta Brisbane oli keskeinen satama Tyynenmeren
  ("blackbirded") sopimustyöläisten kuljetuksessa Queenslandin
  plantaasitalouteen. — en-Wikipedia "Brisbane" (History, 19th century)
- Vaikka järjestelmä oli muodollisesti sopimustyötä, monet
  historioitsijat pitävät sitä harhaanjohtavan rekrytoinnin ja
  liikkumisrajoitusten vuoksi orjuuden kaltaisena pakkotyönä.
  — en-Wikipedia "Brisbane" (History, 19th century)
- 1800-luvun lopulla Brisbaneen muutti saksalaisia, skotlantilaisia
  ja irlantilaisia siirtolaisia sekä syntyi kiinalainen kauppiasyhteisö
  Frog's Hollow'hun. — en-Wikipedia "Brisbane" (History, 19th century)

### Teemasivu `luonto` — 4 nostoa

**Nosto L1 — "Puutarha joka ruokki vangit ja kasvatti maailman ensimmäisen makadamian" (594 merkkiä)**

> City Botanic Gardens perustettiin 1825 ruokkimaan rangaistussiirtolan
> väkeä, ja 1828 paikka valittiin virallisesti julkiseksi puutarhaksi.
> Vuodesta 1855 puutarhaa johti kuraattori Walter Hill aina vuoteen
> 1881 asti — hän oli siis yhä vastuussa paikasta koko isoisän matkan
> ajan. Hill istutti 1858 maailman ensimmäisen viljellyn
> makadamiapähkinäpuun, ja hänen tukemanaan Queenslandin ensimmäinen
> sokerierä valmistui huhtikuussa 1862. Puutarha on tulvinut yhdeksän
> kertaa vuosina 1870–2011, minkä vuoksi kaupunki perusti 1970-luvulla
> toisen kasvitieteellisen puutarhan kauemmas Mount Coot-thalle.

Faktat ja lähteet:
- City Botanic Gardens perustettiin 1825 vankisiirtolan
  ruokaviljelmäksi; 1828 alue valittiin julkiseksi puutarhaksi.
  — en-Wikipedia "Brisbane City Botanic Gardens"
- Walter Hill nimitettiin kuraattoriksi 1855 ja toimi tehtävässä
  1881 asti. — en-Wikipedia "Brisbane City Botanic Gardens"
- Maailman ensimmäinen viljelty makadamiapähkinäpuu istutettiin 1858
  Hillin toimesta; Queenslandin ensimmäinen granuloitu sokerierä
  valmistui huhtikuussa 1862 Hillin tukemana. — en-Wikipedia
  "Brisbane City Botanic Gardens"
- Puutarha on tulvinut yhdeksän kertaa vuosina 1870–2011; Brisbane City
  Council perusti korvaavan Mount Coot-than kasvitieteellisen puutarhan,
  joka avattiin 1970-luvun puolivälissä. — en-Wikipedia "Brisbane City
  Botanic Gardens"

**Nosto L2 — "Joki jota kutsutaan Ruskeaksi käärmeeksi" (533 merkkiä)**

> Turrbalit kutsuivat kaupungin läpi virtaavaa jokea nimellä Maiwar, ja
> se oli vuosituhansien ajan tärkein kokoontumis- ja ruokapaikka. John
> Oxley nimesi sen uudelleen 1823 kuvernööri Thomas Brisbanen mukaan.
> Joki on 344 kilometriä pitkä ja niin mutkitteleva, että paikalliset
> kutsuvat sitä leikkisästi Ruskeaksi käärmeeksi — nimi viittaa sekä
> sameaan veteen että pitkään, kiemurtelevaan uomaan. Suulta suistoon
> asti vesi on suolaista aina Mount Crosbyn padolle saakka, ja joessa
> elää muun muassa Queenslandin keuhkokala ja härkähaita.

Faktat ja lähteet:
- Joen turrbal-nimi on Maiwar; se oli kansan tärkein kulttuurisen,
  taloudellisen ja seremoniallisen elämän keskus. — en-Wikipedia
  "Brisbane River" / "Brisbane" (Indigenous prehistory)
- John Oxley nimesi joen 1823 kuvernööri Thomas Brisbanen mukaan.
  — en-Wikipedia "Brisbane River"
- Joki on 344 km pitkä; se on jokisuulta Mount Crosbyn padolle asti
  suolapitoinen (tidal estuary). Paikalliset kutsuvat jokea
  lempinimellä "Brown Snake" sen sameuden ja mutkittelevan uoman
  vuoksi. — en-Wikipedia "Brisbane River"
- Joessa elää mm. Queenslandin keuhkokala ja härkähaita.
  — en-Wikipedia "Brisbane River"

**Nosto L3 — "Kalliot joista louhittiin kaupunki ja joilla nyt kiivetään" (521 merkkiä)**

> Kangaroo Pointin jyrkät kalliot olivat turrbalien asuinaluetta jo
> ennen siirtolaa, ja 1800-luvulla niistä louhittiin kiveä kaupungin
> rakennuksiin. Rannan teollisuusalueet — laivastovarastot ja telakat —
> toimivat kalliojyrkänteen juurella aina 1980-luvulle asti, kunnes
> alue muutettiin vähitellen asuin- ja virkistysalueeksi. Nykyisin
> samat louhitut kalliot ovat Brisbanen suosituin kiipeily- ja
> laskeutumispaikka keskustan kupeessa — entiset laivastovarastojen
> rakennukset toimivat nykyään seikkailuyrityksen tukikohtana.

Faktat ja lähteet:
- Kangaroo Point oli turrbalien asuttamaa aluetta ennen brittiläistä
  siirtokuntaa; kalliosta louhittiin kiveä rakennusmateriaaliksi.
  — en-Wikipedia "Kangaroo Point, Queensland"
- Kuninkaallisen laivaston päävarasto sijaitsi kalliojyrkänteen
  juurella; Australian armeija käytti tiloja 1959–1984 asti.
  — en-Wikipedia "Kangaroo Point, Queensland"
- Heritage-listatut laivastovarastojen rakennukset ovat nykyään
  seikkailuyrityksen käytössä jokitoimintaa ja kalliokiipeilyä varten.
  — en-Wikipedia "Kangaroo Point, Queensland"

**Nosto L4 — "Vuori joka ei olekaan korkein huippunsa" (564 merkkiä)**

> Mount Coot-tha on turrbaleille pyhä paikka — ku-ta tarkoittaa
> hunajaa, ja mäki on mehiläisunelmoinnin paikka, jonne kuljettiin
> muun muassa nykyistä Waterworks Roadia pitkin kulkevaa polkua.
> Nimestään huolimatta 226-metrinen Mount Coot-tha ei ole edes
> alueensa korkein kohta: sekä Constitution Hill (263 m) että The
> Summit (287 m) kohoavat sitä korkeammalle. Silti juuri
> Mount Coot-thalta avautuu esteetön näköala yli koko Brisbanen,
> minkä vuoksi nimi on jäänyt käyttöön näköalapaikkana — siellä
> sijaitsevat myös kaupungin kasvitieteellinen puutarha ja planetaario.

Faktat ja lähteet:
- Turrbalit pitivät Mount Coot-thaa (ku-ta = hunaja) mehiläisten
  keräyspaikkana ja "honey-bee dreaming" -kohteena; nykyinen
  Waterworks Road Ashgrovesta seuraa vanhaa turrbal-polkua sinne.
  — en-Wikipedia "Turrbal"
- Mount Coot-tha itse on 226 m, mutta Constitution Hill (263 m) ja
  The Summit (287 m) ovat molemmat korkeampia — "korkein kohta
  Brisbanessa" on siis harhaanjohtava, vaikkakin yleisesti toistettu
  väite. — en-Wikipedia "Mount Coot-tha, Queensland"
- Mount Coot-thalta on esteetön näköala, jota naapurihuiput eivät
  tarjoa; alueella sijaitsevat myös Brisbanen kasvitieteellinen
  puutarha (Mount Coot-tha) ja Sir Thomas Brisbane -planetaario.
  — en-Wikipedia "Mount Coot-tha, Queensland"

### Teemasivu `kaupunkikuva` — 4 nostoa

**Nosto T1 — "Silta joka rakennettiin paineen alla" (615 merkkiä)**

> Story Bridge on Australian pisin ulokepalkkisilta, ja sen suunnittelu
> nojasi suoraan Montrealin Jacques Cartier -siltaan. Rakentajat
> kohtasivat ison haasteen eteläisen rannan perustuksissa, jotka piti
> kaivaa 40 metriä maan alle — vesi olisi täyttänyt kuilun heti ilman
> paineistettua kaisuunitekniikkaa, jossa miehet työskentelivät
> nelinkertaisessa ilmanpaineessa ja tarvitsivat lähes kahden tunnin
> dekompression jokaisen työvuoron jälkeen. Sillassa on 1,25 miljoonaa
> niittiä, ja sen rakentaminen vaati kolme ihmishenkeä ennen avajaisia
> heinäkuussa 1940. Nykyisin sillan yli voi kiivetä opastetulla
> kiipeilyreitillä.

Faktat ja lähteet:
- Story Bridge on Australian pisin ulokepalkkisilta (cantilever
  bridge); suunnittelu perustui Montrealin Jacques Cartier -siltaan
  (valm. 1930). — en-Wikipedia "Story Bridge"
- Eteläisen rannan perustukset kaivettiin 40 m maan alle
  paineistetulla kaisuunitekniikalla; työntekijät tarvitsivat lähes
  2 tunnin dekompression jokaisen vuoron jälkeen, ja 65 painetauti-
  tapausta hoidettiin paikan päällä. — en-Wikipedia "Story Bridge"
- Sillassa on 1,25 miljoonaa niittiä; kolme rakentajaa kuoli
  rakennustyön aikana. — en-Wikipedia "Story Bridge"
- Silta avattiin 6.7.1940; siltakiipeilyt (bridge climbs) alkoivat
  2005 ja ovat suosittu matkailuvetonaula. — en-Wikipedia "Story
  Bridge"

**Nosto T2 — "Tullitalo jonka kupolin alla käsiteltiin nousukautta" (568 merkkiä)**

> Kuparikupolinen Tullitalo valmistui 1889 keskelle Queenslandin
> 1880-luvun talousbuumia, samaan aikaan kun myös Treasury-rakennuksen
> ensimmäinen vaihe nousi kaupunkiin. Julkisivussa on kotkan ja
> kengurun väliin sijoitettu kilpi, vaikka Australialla ei vielä
> siihen aikaan ollut virallista vaakunaa — ja sisäänrakennettu kaide
> tuotiin Englannista asti, koristeenaan kuningatar Viktorian
> nimikirjaimet VR. Paikallislehti ylisti tuolloin rakennuksen
> komeutta ja ennusti siitä tulevan yksi kaupungin tunnusmerkeistä;
> ennustus piti paikkansa — kupoli näkyy yhä joelta kauas.

Faktat ja lähteet:
- Tullitalo rakennettiin 1886–1889 arkkitehti Charles McLayn
  suunnitelmien mukaan; se avattiin 2.9.1889 osana Queenslandin
  1880-luvun rakennusbuumia (samalla vuosikymmenellä myös Treasury
  Buildingin ensimmäinen vaihe). — en-Wikipedia "Customs House,
  Brisbane"
- Julkisivussa on kilpi kotkan ja kengurun välissä, vaikka maalla ei
  vielä ollut virallista vaakunaa; kaide tuotiin Englannista
  kuningatar Viktorian VR-nimikirjaimin koristeltuna. — en-Wikipedia
  "Customs House, Brisbane"
- Brisbane Courier -lehti kuvasi 7.9.1889 rakennuksen "komeaksi ja
  vaikuttavaksi" ja ennusti siitä kaupungin maamerkkiä. — en-Wikipedia
  "Customs House, Brisbane"

**Nosto T3 — "Katu josta kuningatar teki kävelykadun" (520 merkkiä)**

> Queen Street suljettiin autoliikenteeltä 1981, ja kuningatar
> Elisabet II avasi uuden kävelykadun virallisesti elokuussa 1982 —
> ajoitus ei ollut sattumaa, sillä samana vuonna Brisbane isännöi
> Kansainyhteisön kisoja. Katu on noin 500 metriä pitkä, ja siltä
> löytyy yli 700 liikettä kuudessa kauppakeskuksessa. Vuonna 1988
> aluetta laajennettiin vielä kerran, tällä kertaa maailmannäyttely
> Expo 88:n tahdissa. Kadun alla kulkee nykyisin maanalainen
> bussiasema, joten kävelykatu lepää kirjaimellisesti
> joukkoliikenteen päällä.

Faktat ja lähteet:
- Queen Street suljettiin liikenteeltä 1981; kuningatar Elisabet II
  avasi kävelykadun 9.8.1982 ajoitettuna 1982 Kansainyhteisön kisoihin.
  — en-Wikipedia "Queen Street Mall"
- Kävelykatu on n. 500 m pitkä, yli 700 liikettä ja kuusi
  kauppakeskusta 40 000 m² vähittäiskaupan tilassa. — en-Wikipedia
  "Queen Street Mall"
- Aluetta laajennettiin 1988 Expo '88:n aikatauluun sovitettuna.
  Katu sijaitsee maanalaisen Queen Street -bussiaseman päällä.
  — en-Wikipedia "Queen Street Mall"

**Nosto T4 — "Maailmannäyttely joka muuttui rantapuistoksi" (587 merkkiä)**

> Vuoden 1988 World Expo 88 houkutteli Brisbaneen yli 15,7 miljoonaa
> kävijää kuuden kuukauden aikana — Australian 200-vuotisjuhlien
> suurin yksittäinen tapahtuma. Kansalaisliike esti alueen muuttamisen
> kaupalliseksi rakennusmaaksi näyttelyn jälkeen, ja South Bank
> Parklands avattiin yleisölle kesäkuussa 1992 entisen näyttelyalueen
> paikalle. Puiston keinotekoinen Streets Beach -laguuni on 2000
> neliömetriä betonia ja 2000 kuutiometriä hiekkaa, jota tuodaan
> vuosittain lisää noin 70 tonnia Moreton Bayn Rous-kanavalta — lähes
> puolet laguunista lepää täytemaalla, joka oli aiemmin osa jokea.

Faktat ja lähteet:
- World Expo 88 järjestettiin 30.4.–30.10.1988; teema "Leisure in the
  Age of Technology", A$625 miljoonan tapahtuma, Australian
  200-vuotisjuhlien suurin yksittäinen tapahtuma. — en-Wikipedia
  "World Expo 88"
- Kävijämäärästä ks. osio 7, huomio 2 (Wikipedian sisäinen ristiriita)
  — käytetty tarkempi, lipputuloihin sidottu luku "yli 15,7 miljoonaa".
  — en-Wikipedia "World Expo 88"
- Kansalaisliike lobbasi alueen muuttamista puistoksi kaupallisen
  rakentamisen sijaan; South Bank Corporation perustettiin 1989 ja
  South Bank Parklands avattiin 20.6.1992. — en-Wikipedia "South Bank
  Parklands"
- Streets Beach -laguuni: 2000 m² betonia, 2000 m³ hiekkaa
  (lisätään n. 70 t/vuosi Rous-kanavalta); lähes puolet laguunista on
  täytemaalla, joka oli aiemmin osa jokea. — en-Wikipedia "South Bank
  Parklands"

---

## 3. Viisi jaksoehdotusta matkaoppaaseen

Faktat on valittu niin, etteivät ne toista osion 2 nostoja tai
kulttuurivisan vastauksia.

**Jakso 1 — "Perille ja liikkeelle"**

Brisbanen julkinen liikenne kulkee junalla, bussilla ja lautalla, ja
kaikkea koordinoi Translink yhtenäisellä go card -maksujärjestelmällä.
Keskustan asemat Roma Street, Central ja Fortitude Valley toimivat
koko verkoston solmukohtina. Yksityisautoilu on Australian tapaan
suosituin kulkumuoto, mutta keskustassa pärjää hyvin ilman autoa.

Faktat ja lähteet:
- Julkinen liikenne (juna, bussi, lautta) on TransLinkin koordinoimaa;
  yhtenäinen go card -maksujärjestelmä kattaa koko South East
  Queenslandin. — en-Wikipedia "Brisbane" (Transport)
- Keskustan pääasemat ovat Roma Street, Central ja Fortitude Valley
  (juna) sekä King George Square, Queen Street ja Roma Street
  (bussi). — en-Wikipedia "Brisbane" (Transport)
- Yksityisauto on suosituin kulkumuoto kuten muuallakin Australiassa.
  — en-Wikipedia "Brisbane" (Transport)

**Jakso 2 — Alueen rakenne**

Brisbanen keskusta sijaitsee joen niemekkeellä, jota turrbalit ja
jagerat kutsuivat Meanjiniksi — nimen yksi tulkinta on juuri
"piikinmuotoinen paikka", koska joki kaartaa niemekkeen ympäri lähes
täyden ympyrän. Silloilla on siksi ratkaiseva rooli: Story Bridge,
Captain Cook -silta ja Victoria Bridge yhdistävät niemekkeen
molemmin puolin sijaitsevat kaupunginosat.

Faktat ja lähteet:
- Meanjin/Magandjin-nimen yksi tulkinta on "piikinmuotoinen paikka",
  viitaten joen mutkan muotoon keskustan kohdalla. — en-Wikipedia
  "Brisbane" (Toponymy)
- Joki kiertää keskustan niemekkeen ympäri; sillat (mm. Story Bridge,
  Captain Cook Bridge) yhdistävät alueita. — en-Wikipedia "Kangaroo
  Point, Queensland" / "Brisbane River"

**Jakso 3 — Arjen ilmiö: CityCat-vesibussit**

Brisbanelaisten arkiliikenteeseen kuuluvat CityCat-katamaraanit, jotka
kulkevat jokea pitkin useiden laitureiden välillä osana samaa
TransLink-lippujärjestelmää kuin bussit ja junat. Joki mutkittelee
niin paljon, että vesibussi on usein nopein tapa siirtyä
kaupunginosasta toiseen — isoisän aikaan sama matka olisi taittunut
soutuveneellä tai höyrylaivalla huomattavasti hitaammin.

Faktat ja lähteet:
- CityCat-katamaraanit ovat osa TransLinkin joukkoliikennettä ja
  kulkevat Brisbane-joella useiden laitureiden välillä.
  — en-Wikipedia "Brisbane" (Transport)
- Joen mutkittelu tekee vesiliikenteestä usein nopeimman tavan
  siirtyä rannalta toiselle. — en-Wikipedia "Brisbane River"
  (yleinen maantieteellinen konteksti, "Brown Snake" -kuvaus)

**Jakso 4 — Historian käännekohta: Fitzgeraldin tutkintakomission jälkeen**

Vuosikymmeniä kestäneen Joh Bjelke-Petersenin hallintokauden
tiukkojen kokoontumisrajoitusten jälkeen 1980-luvun lopun
Fitzgerald-tutkintakomissio uudisti poliisitoimintaa ja hallintoa
Queenslandissa. Uudistukset avasivat tietä kulttuurilaitosten
laajentumiselle, perinnönsuojelulle ja kaupunkiuudistukselle — samaan
aikaan kun Expo 88 muutti South Brisbanen rantaviivan pysyvästi.

Faktat ja lähteet:
- Bjelke-Petersenin hallintokaudella kokoontumisvapautta rajoitettiin
  voimakkaasti (mm. katumielenosoitusten tosiasiallinen kielto).
  — en-Wikipedia "Brisbane" (History, 20th century)
- Fitzgerald-tutkintakomission uudistukset (Bjelke-Petersenin kauden
  jälkeen) muokkasivat poliisitointa ja hallintoa sekä tukivat
  kulttuurilaitosten ja perinnönsuojelun laajentumista. — en-Wikipedia
  "Brisbane" (History, 20th century)

**Jakso 5 — Milloin kannattaa tulla**

Brisbanen ilmasto luokitellaan lämpimäksi ja kosteaksi
subtrooppiseksi (Köppen: Cfa), ja se on Australian pääkaupungeista
Darwinin jälkeen toiseksi kuumin. Korkein koskaan mitattu lämpötila,
43,2 astetta, kirjattiin Australia Day -päivänä 1940; alhaisin,
-0,1 astetta, mitattiin heinäkuussa 2007 — ensimmäistä kertaa
mittaushistoriassa pakkasen puolella. Vuorokauden sademäärä-ennätys,
465 mm tammikuussa 1887, on yhä korkein minkään Australian
pääkaupungin joukossa mitattu vuorokausisade.

Faktat ja lähteet:
- Köppen-luokka Cfa (lämmin ja kostea subtrooppinen); vuosittainen
  keskimäärin alin 16,6 °C ja ylin 26,6 °C, tehden Brisbanesta
  Australian toiseksi kuumimman pääkaupungin Darwinin jälkeen.
  — en-Wikipedia "Brisbane" (Climate)
- Korkein mitattu lämpötila 43,2 °C (26.1.1940, Australia Day);
  alhaisin -0,1 °C (19.7.2007, ensimmäinen kerta pakkasen puolella
  mittaushistoriassa). — en-Wikipedia "Brisbane" (Climate)
- Korkein vuorokausisademäärä 465 mm (21.1.1887) — korkein minkään
  Australian pääkaupungin mittaushistoriassa. — en-Wikipedia
  "Brisbane" (Climate)
- **HUOM:** samoin kuin Melbournen faktapohjassa, yllä olevat luvut
  ovat en-Wikipedian Climate-osiosta EIVÄTKÄ ole sama asia kuin pelin
  `saatiedot.js`-riville tarvittava ERA5 1991–2020 -normaali. Tarkat
  kuukausinormaalit haetaan kirjoitusvaiheessa
  `tools/hae-saanormaalit.mjs`-työkalulla. En myöskään käyttänyt
  visan fact-kentän ("lämmin ja kostea ympäri vuoden", "talvella
  yli 20 astetta") tarkkaa muotoilua tässä tekstissä — ks. osio 7,
  huomio 5.

---

## 4. Yhdeksän kohdekartan kohdetta

Koordinaatit poimittu en-Wikipedian raakatekstin `{{Coord|...}}`- tai
`{{coord|...}}`-malliparametreista suoraan kunkin artikkelin
infobox-osiosta (ei API-hakua tarvittu). Etäisyydet ja suunnat OMIA
LASKELMIANI koordinaattieroista (asteet × 111 km, pituusasteille
kerrottu cos(27,47°) ≈ 0,887), tarkistettu Node-skriptillä — sama
menetelmä kuin faktapohja-melbourne.md:ssä.

**Vertailupiste on vuoden 1825 siirtolan ydinalue, ei Wikipedian
hallinnollinen kaupunkipiste** (spec-mantereet.md sääntö 4: kartan
keskusta valitaan historiallisen ytimen mukaan). Käytin
Commissariat-varaston (William Street, rakennettu 1828 vankityövoimalla
juuri alkuperäisen North Quayn siirtolan kupeeseen) koordinaattia
ydinpisteenä, koska se on ainoa alkuperäisen siirtolan ajalta
säilynyt, tarkasti koordinoitu rakennus aivan North Quayn vieressä.
Wikipedian oma "Brisbane"-artikkelin hallinnollinen kaupunkipiste osuu
n. 0,71 km koilliseen tästä ytimestä.

| # | Nimi | Koordinaatit (desimaali) | Lähdeartikkeli | Etäisyys/suunta ydinpisteestä |
|---|---|---|---|---|
| 1 | Commissariat Store, 1825/1828 siirtolan ydin (vertailupiste) | 27,4732°S 153,0242°I | "Commissariat Store, Brisbane" | (vertailupiste) |
| 2 | Brisbane (Wikipedian hallinnollinen piste, vertailuksi) | 27,46778°S 153,02806°I | "Brisbane" | ~0,71 km koilliseen |
| 3 | Parliament House | 27,475356°S 153,02703°I | "Parliament House, Brisbane" | ~0,37 km koilliseen |
| 4 | City Botanic Gardens | 27,4747°S 153,0301°I | "Brisbane City Botanic Gardens" | ~0,60 km itään |
| 5 | The Old Windmill (Wickham Terrace) | 27,465256°S 153,022867°I | "The Old Windmill, Brisbane" | ~0,89 km pohjoiseen |
| 6 | Customs House | 27,4654°S 153,0311°I | "Customs House, Brisbane" | ~1,10 km koilliseen |
| 7 | Queen Street Mall | 27,4696°S 153,0252°I | "Queen Street Mall" | ~0,41 km pohjoiseen |
| 8 | South Bank Parklands | 27,4787°S 153,0229°I | "South Bank Parklands" | ~0,62 km etelään |
| 9 | Kangaroo Point (keskus) | 27,4747°S 153,0386°I | "Kangaroo Point, Queensland" | ~1,43 km itään |
| 10 | Queensland Art Gallery / GOMA | 27,472733°S 153,018453°I | "Queensland Art Gallery" | ~0,57 km länteen |

**Rajausehdotus:** kaikki kymmenen kohdetta mahtuvat n. 1,5 km:n
säteelle ydinpisteestä — TIIVIIMPI klusteri kuin Melbournen 2,4 km tai
Sydneyn 1,4 km, koska myös isoisän ajan Brisbane oli vielä pieni
joenmutkan sisään mahtuva siirtokunta.

**Yhdestoista ehdokas jätetty pois taulukosta tilan vuoksi, koordinaatti
kuitenkin talteen:** Story Bridge, 27,4635°S 153,0358°I
("Story Bridge"), n. 1,57 km koilliseen ydinpisteestä — silta ei ollut
vielä olemassa isoisän matkan aikaan (valmistui 1940), joten jätin sen
pois yhdeksän ensisijaisen kohteen listalta, mutta kirjoittaja voi
lisätä sen kymmenenneksi pisteeksi suoraan tästä koordinaatista, koska
se on yksi kaupungin tunnetuimmista maamerkeistä ja esiintyy
useammassa nostossa (T1). Mount Coot-tha jätettiin kokonaan pois
klusterista, koska sen suburbin keskipiste on n. 7,2 km ydinpisteestä
länteen — selvästi klusterin ulkopuolella (vrt. Melbournen
Separation Tree -tarkkuustaso 2,4 km:n rajalla; Mount Coot-tha ylittää
tämän kolminkertaisesti eikä siksi kuulu tiiviiseen kohdekarttaan).

---

## 5. Kuva-aiheet (Commons-kategoriat, ei hakusanoja)

Kaikki kategoriat alla on nyt tarkistettu OLEMASSA OLEVIKSI Commonsin
`action=query&titles=Category:...`-kutsulla 23.8.2026 (pelkkä
olemassaolotarkistus — SISÄLTÖÄ EI ole silmäilty, se on kirjoittajan
työ kuvasääntöjen mukaisesti), paitsi turrbal/jagera-kulttuurikuvat
(K4), joille EI löytynyt olemassa olevaa Commons-kategoriaa suoralla
haulla eikä hakusanahaulla ("Turrbal", "Aboriginal Queenslanders",
"Aboriginal/Indigenous Australians of Queensland" -kaikki
tyhjiä/olemattomia) — Commonsin rajapinta myös rajoitti pyyntöjä
voimakkaasti kesken työn ("too many requests"). Kirjoittajan pitää
etsiä K4:n kuva manuaalisesti (esim. Commonsin
"Category:Indigenous Australians"-yläkategoriapuun kautta tai
hakusanalla "Turrbal" suoraan tiedostohaussa, ei kategoriahaussa).
Alkuperäiskansakuvissa sama arki- ja ylpeyskuvasto kuin muuallakin
pelissä (spec-mantereet.md, Kuvalinjat) — ei kurjuuskuvastoa, ei
pelkkiä seremoniaklišeitä.

**Avauskuvat (3):**
1. `Category:The Old Windmill, Brisbane` (VARMISTETTU) — vanhin
   säilynyt rakennus, symboloi siirtolan alkua.
2. `Category:Brisbane City Botanic Gardens` (VARMISTETTU) — laaja
   maisemakuva puutarhoista jokinäkymän kanssa.
3. `Category:Story Bridge, Brisbane` (VARMISTETTU, oikea kategorianimi
   sisältää pilkun ja kaupungin — pelkkä "Category:Story Bridge" EI ole
   olemassa) — kaupungin tunnetuin siluettikuva.

**Kansikuvat (3, LAAJOJA YLEISKUVIA — ei yksityiskohtia):**
1. `Category:Story Bridge, Brisbane` — sillan koko siluetti joen
   yllä, kuvattuna kaupungin puolelta.
2. `Category:Brisbane River` (VARMISTETTU) — jokinäkymä keskustan
   niemekkeen ympäri, laaja maisemakuva.
3. `Category:South Bank Parklands` (VARMISTETTU) — puiston ja
   keskustan siluetin yhdistävä yleiskuva.

**Nosto-/jaksokuvat, sivuittain:**

*Kaupunki:*
- `Category:The Old Windmill, Brisbane` (K1)
- `Category:Brisbane` yleiskategoria tai `Category:Historical images
  of Brisbane` (K1/K2 — tarkistettava, en löytänyt varmaa vanhaa
  arkistokuvakategoriaa; ks. huomio alla)
- `Category:Parliament House, Brisbane` (VARMISTETTU) (K3)
- EI VARMISTETTUA KATEGORIAA (K4) — `Category:Turrbal`,
  `Category:Aboriginal Queenslanders` ja
  `Category:Indigenous/Aboriginal Australians of Queensland` eivät ole
  olemassa Commonsissa (tarkistettu suoraan ja hakusanahaulla).
  Kirjoittajan etsittävä nykykulttuuria esittävä kuva manuaalisesti
  (esim. "Category:Indigenous Australians" -yläkategoriapuusta tai
  suoralla tiedostohaulla "Turrbal") — EI seremoniaklišeitä.

*Historia:*
- `Category:The Old Windmill, Brisbane` (H1)
- `Category:Parliament House, Brisbane` (H2)
- `Category:1893 Brisbane flood` (VARMISTETTU) (H3)
- `Category:History of Brisbane` (VARMISTETTU) (H4)

*Luonto:*
- `Category:Brisbane City Botanic Gardens` (L1)
- `Category:Brisbane River` (L2)
- `Category:Kangaroo Point Cliffs` (VARMISTETTU) (L3)
- `Category:Mount Coot-tha` (VARMISTETTU) (L4)

*Kaupunkikuva:*
- `Category:Story Bridge, Brisbane` (T1)
- `Category:Customs House, Brisbane` (VARMISTETTU) (T2)
- `Category:Queen Street Mall, Brisbane` (VARMISTETTU) (T3)
- `Category:South Bank Parklands` (T4, myös
  `Category:Streets Beach`, VARMISTETTU)

*Kohdekartta (täydentäviksi, ei nostoa varten):*
- `Category:Queensland Art Gallery` (VARMISTETTU)
- `Category:Kangaroo Point, Queensland` (VARMISTETTU)

---

## 6. Säätiedot

Ks. osio 3, Jakso 5 — samat luvut, sama lähde (en-Wikipedian
Climate-osio, EI ERA5).

---

## 7. Ristiriidat, epävarmuudet ja huomiot

1. **Vahvin löytämäni yksittäinen 1873-osuma on parlamenttitalon
   rakennusvaihe** (K3, H2): rakennus oli isoisän matkan aikaan juuri
   avattu (1868) mutta yhä kesken (pylväskäytävät valmistuivat vasta
   1878) — poikkeuksellisen tarkka "isoisä näki tämän juuri tällaisena"
   -osuma. Lähes yhtä vahva on City Botanic Gardensin kuraattori
   Walter Hill, joka oli virassaan koko isoisän matkan ajan
   (1855–1881) ja oli istuttanut maailman ensimmäisen viljellyn
   makadamiapuun jo 1858 (L1). Näiden kahden vuoksi valitsin `historia`-
   ja `luonto`-teemasivut varmoiksi; kolmas `kaupunkikuva`-sivu on
   selvästi heikompi 1873-osumiltaan (kaikki neljä nostoa 1880-luvulta
   tai myöhemmältä), mutta perustelin sen silti mukaan, koska aineisto
   on vahvaa ja päällekkäisyydetöntä — jos kirjoittaja haluaa vain
   kaksi teemasivua, suosittelen pudottamaan juuri `kaupunkikuva`-sivun.
2. **World Expo 88:n kävijämäärässä on Wikipedian SISÄINEN RISTIRIITA.**
   Artikkelin infobox ilmoittaa 18 574 476 kävijää, mutta leipäteksti
   sanoo "yli 15 760 000 kävijää, jotka ostivat lippuja 175 miljoonalla
   Australian dollarilla" (viitattu lähteeseen "Brisbane 150 Stories").
   Käytin nostossa T4 tarkempaa, lipputuloihin sidottua leipätekstin
   lukua ("yli 15,7 miljoonaa") ja jätin infoboxin tarkan luvun pois —
   sama ratkaisutapa kuin faktakuri-ohjeen ennakkotapauksissa
   (koordinaatit/tarkempi lähde voittaa). Kirjoittajan kannattaa
   tarkistaa tämä uudestaan ennen julkaisua, jos parempi lähde löytyy.
3. **Queenslandin osavaltiotason "frontier wars" -tilastot (mm.
   66 680 kuollutta, joista 65 180 alkuperäiskansaa, 644
   yhteenottoa) LÖYSIN mutta JÄTIN TIETOISESTI POIS.** Nämä ovat
   Queensland-artikkelin osavaltiotason lukuja koko siirtomaakauden
   ajalta, eivät Brisbanen kaupungin omaa historiaa, ja ne ovat
   selvästi yksityiskohtaisempia ja raskaampia kuin spec-mantereet.md:n
   sääntö 1 sallii ("historia kerrotaan suoraan mutta ilman
   julmuuksien yksityiskohtia") ja Oseania-osion erityisohje
   ("ilman yksityiskohtaista kärsimyskuvausta"). Brisbanen oma,
   paikallinen konflikti — "War of Southern Queensland" 1843–1855,
   jossa turrbalit ja jagerat vastustivat siirtokuntaa — on sen sijaan
   mukana K4-nostossa yhden neutraalin virkkeen tasolla ilman
   uhrilukuja.
4. **Kangaroo Pointin artikkelissa mainitaan myös alueen maine
   "väkivaltaisten ja meluisien katujengien" pesäpaikkana n. 1900-luvun
   alussa** — jätin tämän pois L3-nostosta, koska se ei liity
   1873-aikakauteen eikä tuo mitään olennaista lisää louhinta/
   kiipeily-tarinaan; mainitsen sen tässä siltä varalta, että
   kirjoittaja haluaa käyttää sitä muualla.
5. **Kulttuurivisan (`oceania-questions.js`, kohta `brisbane`)
   vastauksia on vältetty tietoisesti nostoissa ja jaksoissa:** en
   tehnyt nostoa suoraan Australian itärannikon sijainnista (kysymys 1)
   enkä Gold Coast/Sunshine Coast -rannoista niiden 50 km:n
   yhtenäisestä hiekasta (kysymys 2, fact-kentän ydin) — nämä eivät
   edes osu 1873-aikakauteen. Brisbane-joen nimestä kerrotaan (K2, L2),
   mutta EN käyttänyt visan fact-kentän muotoilua "joki mutkittelee niin
   että kaupunginosat ovat usein veden eri puolilla, jokilaivat osa
   joukkoliikennettä" — kirjoitin saman ilmiön uudella kulmalla
   (Ruskea käärme -lempinimi, CityCat-jakso). Queenslandin
   pääkaupunkiasemasta kerrotaan (K3) eri painotuksella kuin visan
   fact-kentässä (joka puhuu Suuresta valliriutasta ja hiekkarannoista).
   En käyttänyt visan ilmastofact-kentän tarkkaa muotoilua
   ("talvellakin yli 20 astetta", "uima-altaat ja verannat kuuluvat
   asumiseen") jaksossa 5, vaikka aihe on sama (Köppen Cfa) — luvut ja
   kulma (lämpötilaennätykset, sadeennätys) ovat eri.
6. **Commissariat Store valittiin vertailupisteeksi Old Windmillin
   sijaan**, vaikka Old Windmill on tunnetumpi ja mainostetumpi
   maamerkki: Commissariat Store sijaitsee välittömästi North Quayn
   vieressä eli tarkalleen siinä kohtaa, johon siirtola 1825 relokoitiin
   Redcliffeltä, kun taas Old Windmill on hieman kauempana ylärinteessä
   (Wickham Terrace, Spring Hill). Kirjoittaja voi halutessaan vaihtaa
   vertailupisteen Old Windmilliin — ero on vain n. 0,9 km, joten
   kohdekartan tiiviys ei muutu merkittävästi.
7. **`docs/mantereet-tyoaineisto/spec-mantereet.md` luettiin
   omatoimisesti**, koska se on SITOVA koko Oseanian laudalle eikä
   sen lukematta jättäminen olisi ollut turvallista annetun
   kunnioitus-vaatimuksen kannalta — sama perustelu kuin
   faktapohja-melbourne.md:ssä.
8. **Vain en-Wikipediaa ja sen raakatekstiä (action=raw) käytetty
   kaikkiin faktoihin**, paitsi Commonsin kategorioiden
   olemassaolotarkistukseen (osio 5), joka käytti Commonsin
   `action=query`-rajapintaa vain kategorianimien vahvistamiseen (osa
   tarkistuksista jäi rajapinnan pyyntörajoituksen vuoksi kesken, ks.
   osio 5 alkutekstit) — EI kuvasisällön tarkistamiseen. Ei
   ulkopuolisia hakuja tämän faktapohjan sisältöön.
9. **Kaikki nostot ja jaksot on kirjoitettu valmiiksi suomenkieliseksi
   tekstiksi** merkkimäärävaatimusten mukaan (johdannot 227–252
   merkkiä, nostot 492–659 merkkiä) ja tarkistettu koneellisesti
   Python-skriptillä lainausmerkkien sisältä.
10. **Blackbirding/Tyynenmeren sopimustyö (H4) kerrottu neutraalisti**
    spec-mantereet.md:n säännön 2 mukaisesti: totean käytännön
    olemassaolon, sen muodollisen luonteen sopimustyönä ja
    nykyhistorioitsijoiden arvion siitä orjuuden kaltaisena
    pakkotyönä — ilman yksittäisten uhrien tarinoita tai
    yksityiskohtaista kärsimyskuvausta.
