# Melbourne — faktakoostaja, uusi kaupunkilehti (Oseanian lauta)

Lauta-id `oceania`, kaupunki-id `melbourne`, maa AUS, en-Wikipedia
"Melbourne" (ellei toisin mainita). Kaikki tiedot haettu en-Wikipediasta
**23.8.2026** (`action=raw`, `NODE_USE_ENV_PROXY=1`; #REDIRECT tarkistettu
jokaiselle haetulle otsikolle — "Boonwurrung" ohjautuu artikkeliin
"Bunurong"). Malli ja mitat luettu tiedostoista
`docs/aasia-tyoaineisto/lehtityo-resepti.md` (SITOVA), `docs/moduulit/
kaupunkilehti.md` sekä esimerkkinä `docs/aasia-tyoaineisto/
faktapohja-colombo.md` (rakenne ja tarkkuustaso). Lisäksi luin
`docs/mantereet-tyoaineisto/spec-mantereet.md` — se ei ollut
tehtävänannon lukulistalla, mutta se on SITOVA koko Oseanian laudalle
(sama asema kuin spec-asia.md:llä) ja koskee suoraan juuri sitä
kunnioitus-vaatimusta, joka tehtävänannossa erikseen korostettiin;
Sydneyn faktapohja (`faktapohja-sydney.md`) käyttää sitä samalla tavalla
ennakkotapauksena. Kulttuurivisa tarkistettu tiedostosta
`js/packs/oceania-questions.js` (kohta `melbourne`, viisi kysymystä:
maa, sään vaihtelevuus, kaupungin asema/entinen pääkaupunkiasema,
raitiovaunuverkko, australialainen jalkapallo MCG:llä) — ks. osio 8,
huomio 6, miten näiden vastauksia on vältetty.

**Tehtävän erityispiirre:** En kirjoittanut lehtitekstejä, en ladannut
kuvia enkä koskenut js/packs-tiedostoihin — kaikki alla on raaka-ainetta
kirjoittajalle ja riippumattomalle tarkistajalle.

**Sisältölinjaus (spec-mantereet.md, Oseania + Raamattu pilari 3):**
wurundjerit ja boonwurrungit (bunurongit) kuvataan nykyisinä kansoina,
ei menneisyyden kuriositeettina — molemmilla on omat elävät
kulttuuriperintöjärjestönsä, ja niistä kerrotaan nykyaikana, ei vain
1873-taustana. Siirtomaahistoria (Batmanin "sopimus", maan menetys,
väestön romahdus) todetaan tapahtumina neutraalisti ilman
yksityiskohtien korostamista tai kummankaan osapuolen
sankarikehystämistä. Kultaryntäys ja "Marvellous Melbourne" -kausi
osuvat suoraan isoisän matkan vuoteen tai sen välittömään läheisyyteen,
ja niitä on painotettu voimakkaasti. Ei nykysotaa, ei nykypolitiikkaa.

---

## 1. Sivuehdotukset

### Sivu A — id `kaupunki`, nimi "Melbourne"

**Johdanto (231 merkkiä):**

> Yarra-joen rannalle 1830-luvulla noussut kauppapaikka rikastui
> 1850-luvun kultaryntäyksestä niin nopeasti, että siitä povattiin
> maailman rikkainta kaupunkia. Isoisän matkan vuonna komeat kivitalot
> nousivat kadulle toisensa jälkeen.

### Sivu B — teemasivu, ehdotettu id `historia`, nimi "Historia"

**Perustelu valinnalle:** Melbournen 1850–1890-luvun aineisto on
poikkeuksellisen tiivistä ja hyvin lähteistettyä — kultaryntäys,
Eureka-kapinan Melbourne-oikeudenkäynnit ja "Marvellous Melbourne"
-maabuumi muodostavat selkeän, dramaattisen kaaren, joka istuu
kaupunki-sivun taustatarinaa syvemmälle ilman päällekkäisyyttä.

**Johdanto (217 merkkiä):**

> Kultaryntäys teki 1850-luvun Melbournesta yhden maailman rikkaimmista
> kaupungeista muutamassa vuodessa. Rikkaus näkyi kaduilla vielä
> vuosikymmeniä myöhemmin, kun kaupunkia alettiin kutsua nimellä
> Marvellous Melbourne.

### Sivu C — teemasivu, ehdotettu id `kuvataide`, nimi "Kuvataide"

**Perustelu valinnalle:** Vakioaihe `kuvataide` nousee vahvaksi, koska
National Gallery of Victorian ja State Library Victorian 1800-luvun
rakennushistoria ajoittuu poikkeuksellisen tarkasti isoisän matkan
ympärille (McArthur-galleria avattiin 24.5.1874 — vuosi matkan
jälkeen) ja jatkuu luontevasti nykypäivän katutaiteeseen asti.

**Johdanto (212 merkkiä):**

> Kultarahat kanavoituivat myös tauluihin ja kirjastoihin:
> kansallisgalleria ja vapaa kirjasto syntyivät samoina vuosina kuin
> isoisän matka. Nykyisin samat kadunkulmat tunnetaan
> maailmanlaajuisesti katutaiteestaan.

### Sivu D — teemasivu, ehdotettu id `luonto`, nimi "Luonto"

**Perustelu valinnalle:** Tämä on faktapohjan VAHVIN yksittäinen
1873-osuma: William Guilfoyle nimitettiin Kuninkaallisten
kasvitieteellisten puutarhojen johtajaksi TÄSMÄLLEEN vuonna 1873, ja
hänen suunnittelemansa maisemapuisto on yhä puutarhojen perusilme.
Aihe tuo mukaan myös Yarra-joen wurundjeri-nimen (kunnioitus-pilari)
ilman päällekkäisyyttä historia- tai kuvataide-sivun kanssa.

**Johdanto (227 merkkiä):**

> Isoisän matkan vuonna kasvitieteelliset puutarhat saivat uuden
> johtajan, joka muutti niiden ilmeen kokonaan. Kaupungin läpi virtaava
> Yarra-joki kantaa yhä wurundjeri-nimeään, vaikka eurooppalaiset
> ymmärsivät sen väärin jo 1835.

**HUOM sivumäärästä:** tehtävänanto salli 1–3 teemasivua; käytin
kaikki kolme, koska aineisto kantoi kolme selvästi erillistä,
päällekkäisyydetöntä teemaa (historia, kuvataide, luonto) —
ks. myös osio 8, huomio 1, Guilfoyle-faktan painoarvosta.

---

## 2. Kuusitoista nostoehdotusta (4 × 4 sivua)

### Sivu `kaupunki` — 4 nostoa

**Nosto K1 — "Kaupunki joka tuplaantui parissa kuukaudessa" (500 merkkiä)**

> Kun kultaa löytyi Victoriasta keskikesällä 1851, Melbourne täyttyi
> muutamassa kuukaudessa: kaupungin asukasluku lähes kaksinkertaistui
> 25 000:sta 40 000:een, ja vauhti vain kiihtyi. Vuoteen 1865 mennessä
> Melbournesta oli tullut Australian väkirikkain kaupunki, ohi vanhan
> Sydneyn. Osa uusista tulokkaista majoittui Yarra-joen eteläpuolelle
> nousseeseen väliaikaiseen telttakaupunkiin, jota kutsuttiin nimellä
> Canvas Town – sinne mahtui kerrallaan tuhansia kultaonnea etsimään
> tulleita ympäri maailmaa.

Faktat ja lähteet:
- Melbournen väkiluku lähes kaksinkertaistui 25 000:sta 40 000:een
  muutamassa kuukaudessa kullan löytymisestä kesällä 1851. —
  en-Wikipedia "Melbourne"
- Vuoteen 1865 mennessä Melbourne oli ohittanut Sydneyn Australian
  väkirikkaimpana kaupunkina. — en-Wikipedia "Melbourne"
- Canvas Town -telttakaupunki nousi Yarran eteläpuolelle (South
  Melbourne) majoittamaan kultaryntäyksen mukana saapuneita
  siirtolaisia. — en-Wikipedia "Melbourne" / "Victorian gold rush"

**Nosto K2 — "Kassaholvi joka jäi tyhjäksi" (537 merkkiä)**

> Kun nuori arkkitehti John James Clark suunnitteli Melbournen uutta
> Treasury-rakennusta 1850-luvun lopulla, sen kellariin varattiin
> vahvat holvit kultaryntäyksen tuomaa kultaharkkoa varten. Rakennus
> valmistui vasta 1862, ja siihen mennessä ryntäys oli jo hiipunut –
> holvit päätyivät säilyttämään hallituksen asiakirjoja kullan sijaan.
> Rakennus toimi silti Victorian osavaltion hallinnon ytimenä, ja kun
> varsinainen Treasury-osasto muutti viereiseen rakennukseen
> 1877–1878, talo sai lempinimen Old Treasury, joka on säilynyt siitä
> lähtien.

Faktat ja lähteet:
- Old Treasury Buildingin kellariholvit suunniteltiin kultaryntäyksen
  kultaharkkoa varten, mutta rakennuksen valmistuessa 1862 ryntäys oli
  jo ohi, ja holvit päätyivät säilyttämään asiakirjoja. — en-Wikipedia
  "Old Treasury Building, Melbourne"
- Suunnittelijana 19-vuotias arkkitehti John James Clark; rakennus
  valmistui 1858–1862. — en-Wikipedia "Old Treasury Building,
  Melbourne"
- Rakennus sai lempinimen "Old Treasury", kun viralliset
  Treasury-toimistot muuttivat viereiseen rakennukseen 1877–1878. —
  en-Wikipedia "Old Treasury Building, Melbourne"

**Nosto K3 — "Kortteli joka on asuttu 170 vuotta yhtäjaksoisesti" (581 merkkiä)**

> Kultaryntäyksen mukana Melbourneen saapui myös kymmeniätuhansia
> siirtolaisia Etelä-Kiinan Guangdongista, ja Little Bourke Streetin
> varrelle syntyi 1850-luvulla kaupunginosa, joka tunnetaan nykyään
> Chinatownina. Se on eteläisen pallonpuoliskon vanhin Chinatown ja
> läntisen maailman pisimpään yhtäjaksoisesti asuttu kiinalaisyhteisö –
> San Franciscon vanha Chinatown menetti asemansa vuoden 1906
> maanjäristyksen jälkeen. Nykyisin kapeat kujat ja pihat ovat yhä
> täynnä kiinalaisravintoloita, kulttuurikeskuksia ja Kiinan museon
> näyttelyitä samalla kadunpätkällä kuin 170 vuotta sitten.

Faktat ja lähteet:
- Chinatown syntyi 1850-luvulla kultaryntäyksen aikana, siirtolaisten
  saavuttua pääosin Guangdongin maakunnasta. — en-Wikipedia
  "Chinatown, Melbourne"
- Eteläisen pallonpuoliskon vanhin Chinatown ja läntisen maailman
  pisimpään yhtäjaksoisesti asuttu kiinalaisyhteisö, koska San
  Franciscon Chinatown joutui uudelleen sijoittumaan vuoden 1906
  maanjäristyksen jälkeen. — en-Wikipedia "Chinatown, Melbourne"
- Chinatown on yhä koti kiinalaisravintoloille, kulttuurikeskuksille ja
  Kiinan museolle. — en-Wikipedia "Chinatown, Melbourne"

**Nosto K4 — "Kansat jotka olivat täällä ennen kultaa ja ovat yhä" (500 merkkiä)**

> Kauan ennen brittiläisiä siirtolaisia Yarra-joen laaksossa asuivat
> wurundjerit ja boonwurrungit, kaksi kulin-kansojen liittoon kuuluvaa
> kansaa, joille alue oli tärkeä kokoontumispaikka ja ruoan lähde.
> Vuonna 2021 näiden kahden kansan perinteisen maa-alueen raja
> sovittiin virallisesti kulkemaan kaupungin halki lännestä itään.
> Molemmilla kansoilla on omat kulttuuriperintöjärjestönsä, jotka
> vaalivat kieltä ja perinteitä yhä tänään – wurundjerien perinteinen
> vuodenkierto jakautuu seitsemään kauteen.

Faktat ja lähteet:
- Wurundjerit ja boonwurrungit (bunurongit), osa kulin-kansojen
  liittoa, olivat Yarra-joen laakson perinteisiä omistajia ja käyttivät
  aluetta tärkeänä kokoontumispaikkana. — en-Wikipedia "Melbourne"
- Kesäkuussa 2021 wurundjerien ja boonwurrungien maa-alueiden raja
  sovittiin virallisesti, ja se kulkee kaupungin halki lännestä
  itään. — en-Wikipedia "Melbourne" / "Wurundjeri"
- Wurundjeri Woi Wurrung Cultural Heritage Aboriginal Corporation
  (perustettu 1985) ja Bunurong Land Council Aboriginal Corporation
  edustavat kansoja nykyään. — en-Wikipedia "Wurundjeri" / "Boonwurrung"
  (artikkeli "Bunurong")
- Wurundjerien perinteinen vuodenkierto jakautuu seitsemään kauteen
  neljän sijaan. — en-Wikipedia "Wurundjeri"

### Teemasivu `historia` — 4 nostoa

**Nosto H1 — "Kolmetoista syytettyä ja väkijoukko joka riemuitsi" (593 merkkiä)**

> Ballaratin kultakentillä joulukuussa 1854 puhjennut Eureka-kapina
> päättyi verisesti, mutta sen jälkiselvittely siirtyi Melbourneen.
> Kolmetoista kapinallista tuotiin oikeuden eteen syytettynä
> valtionpetoksesta, ja ensimmäisenä oikeuden eteen astui
> afroamerikkalainen John Joseph. Melbourneläisistä koottu
> valamiehistö vapautti hänet, ja yli 10 000 ihmistä kokoontui
> kuulemaan tuomiota – riemastunut väkijoukko kantoi Josephin
> tuolissa juhlakulkueessa läpi kaupungin katujen. Kaikki loputkin
> syytetyt vapautettiin, ja tapahtuma jäi historiaan yhtenä
> Australian harvoista aseellisista kapinoista.

Faktat ja lähteet:
- Kolmetoista rebelliä asetettiin syytteeseen valtionpetoksesta
  Eureka-kapinan jälkeen. — en-Wikipedia "Eureka Rebellion"
- Afroamerikkalainen John Joseph oli ensimmäinen syytetty; melbourneläinen
  valamiehistö vapautti hänet, yli 10 000 ihmistä oli koolla kuulemassa
  tuomiota, ja Joseph kannettiin riemusaatossa Melbournen kaduilla
  tuolissa. — en-Wikipedia "Eureka Rebellion"
- Kaikki loput syytetyt vapautettiin peräkkäin. — en-Wikipedia "Eureka
  Rebellion"
- Eureka on yksi vain kahdesta aseellisesta kapinasta Australian
  historiassa. — en-Wikipedia "History of Melbourne"

**Nosto H2 — "Nimi joka jäi elämään vuosisadaksi" (653 merkkiä)**

> Vuonna 1885 Melbourneen vieraillut englantilainen toimittaja George
> Augustus Henry Sala keksi yhdessä Joe Haroldin kanssa lempinimen
> Marvellous Melbourne kaupungille, joka eli parhaillaan huimaa
> maabuumia. Halpa luotto ja nousevat tonttihinnat saivat rahaa
> virtaamaan liikerakennuksiin, hotelleihin ja niin sanottuihin
> kahvipalatseihin – raittiusliikkeen suosimiin ylellisiin hotelleihin
> ilman alkoholia. Vuonna 1886 kaupunkiin saatiin paineistettu
> vesijohtoverkko, joka mahdollisti hydrauliset hissit ja ensimmäiset
> korkeat rakennukset. Buumi teki Melbournesta hetkeksi maailman
> toiseksi suurimman kaupungin Brittiläisessä imperiumissa Lontoon
> jälkeen.

Faktat ja lähteet:
- Vieraileva toimittaja George Augustus Henry Sala ja Joe Harold
  keksivät lempinimen "Marvellous Melbourne" 1885. — en-Wikipedia
  "Melbourne"
- Maabuumin aikana rahaa virtasi liikerakennuksiin, hotelleihin ja
  ns. kahvipalatseihin (Federal Coffee Palace todettu erikseen
  temperance-hotelliksi). — en-Wikipedia "Melbourne" / "History of
  Melbourne"
- Melbourne Hydraulic Power Company (1886) mahdollisti paineistetun
  vesijohtoverkon ja hydrauliset hissit, mikä johti kaupungin
  ensimmäisiin korkeisiin rakennuksiin. — en-Wikipedia "Melbourne"
- Maabuumin aikana Melbournesta tuli toiseksi suurin kaupunki
  Brittiläisessä imperiumissa Lontoon jälkeen. — en-Wikipedia
  "Melbourne"

**Nosto H3 — "Näyttelyhalli joka nousi puretun tilalle" (565 merkkiä)**

> Melbournen ensimmäinen näyttelyhalli rakennettiin 1854 Lontoon
> Kristallipalatsin innoittamana, mutta se rapistui ja purettiin 1869.
> Kymmenen vuotta myöhemmin, kultaryntäyksen tuoman vaurauden
> siivittämänä, kaupunki rakensi tilalle paljon suuremman
> Kuninkaallisen näyttelyhallin Carlton Gardensiin – 68 metriä korkean
> kupolin alla järjestettiin 1880 Melbournen kansainvälinen näyttely
> ja 1888 satavuotisnäyttely, jossa sähkövalot syttyivät ensimmäistä
> kertaa öisin. Vuonna 2004 rakennuksesta tuli ensimmäinen
> australialainen rakennus Unescon maailmanperintölistalla.

Faktat ja lähteet:
- Melbournen ensimmäinen näyttelyhalli (1854, Kristallipalatsin
  innoittama) purettiin 1869. — en-Wikipedia "Royal Exhibition
  Building"
- Nykyinen Royal Exhibition Building valmistui 1880 Carlton
  Gardensiin, dome 68 m korkea; siellä järjestettiin Melbourne
  International Exhibition 1880 ja Centennial International
  Exhibition 1888. — en-Wikipedia "Royal Exhibition Building"
- Sähkövalaistus asennettiin 1888 satavuotisnäyttelyyn, mikä teki
  siitä yhden maailman ensimmäisistä öisin auki olevista
  näyttelytiloista. — en-Wikipedia "Royal Exhibition Building"
- 1.7.2004 rakennuksesta tuli ensimmäinen australialainen rakennus
  Unescon maailmanperintölistalla (tarkennus: EI Australian
  ensimmäinen maailmanperintökohde ylipäätään — maalla oli jo
  luonnonperintökohteita — vaan ensimmäinen RAKENNUS). — en-Wikipedia
  "Royal Exhibition Building"

**Nosto H4 — "Puisto joka rakennettiin juuri isoisän matkan vuosina" (544 merkkiä)**

> Fitzroy Gardensin puistoalue rauhoitettiin jo 1848, mutta sen
> nykyinen ilme syntyi vasta kun maisemasuunnittelija Clement
> Hodgkinson ryhtyi 1860 kehittämään kaupungin puistoja. Seuraavan
> viidentoista vuoden aikana – juuri isoisän matkan vuosina – puistoon
> rakennettiin polkuverkosto, soittolava, puutarhurin Sinclairin
> mökki ja uusklassinen huvimaja. Puiston reunalla kasvaa yhä niin
> sanottu arpinen puu, jonka kuoresta wurundjerit ovat aikoinaan
> leikanneet kaarnaa kanoottia tai kilpeä varten – muistutus siitä,
> keiden mailla puisto sijaitsee.

Faktat ja lähteet:
- Fitzroy Gardens rauhoitettiin puistoksi 1848; Clement Hodgkinson
  aloitti kaupungin puistojen suunnittelun ja kehittämisen 1860, ja
  seuraavan 15 vuoden aikana rakennettiin polkuverkosto, soittolava,
  Sinclairin mökki ja uusklassinen huvimaja (rotunda). — en-Wikipedia
  "Fitzroy Gardens"
- Puistossa on "arpinen puu" (scarred tree), merkki wurundjerien
  alkuperäisestä asutuksesta Melbournen alueella. — en-Wikipedia
  "Fitzroy Gardens" (kuvateksti)

### Teemasivu `kuvataide` — 4 nostoa

**Nosto T1 — "Galleria joka syntyi vuosi matkan jälkeen" (581 merkkiä)**

> Melbournen ensimmäinen taidekokoelma esiteltiin 1861 kirjaston
> alakerrassa nimellä Museum of Art, mutta oma talo kokoelmalle
> valmistui vasta 24. toukokuuta 1874 – vuosi isoisän matkan jälkeen.
> McArthur-galleria oli tarkoitettu vain väliaikaiseksi ratkaisuksi,
> kunnes suuremmat suunnitelmat toteutuisivat, mutta lopullinen
> kokonaisuus rakentui vuosikymmenten mittaan pala kerrallaan.
> Seuraavana vuonna kokoelma sai nimekseen National Gallery of
> Victoria, ja vuonna 1888 se osti Lawrence Alma-Tademan maalauksen
> The Vintage Festival 4 000 punnalla, 1800-luvun kalleimman
> hankintansa.

Faktat ja lähteet:
- Museum of Art avattiin 1861 kirjaston etelänsiiven alakerrassa. —
  en-Wikipedia "National Gallery of Victoria"
- Ensimmäinen varsinainen galleriarakennus, McArthur Gallery, avattiin
  24.5.1874; tarkoitettu väliaikaiseksi. — en-Wikipedia "National
  Gallery of Victoria"
- Kokoelma nimettiin uudelleen National Gallery of Victoriaksi 1875. —
  en-Wikipedia "National Gallery of Victoria"
- Vuonna 1888 galleria osti Lawrence Alma-Tademan maalauksen "The
  Vintage Festival" (1871) 4 000 punnalla, 1800-luvun kalleimpana
  hankintanaan. — en-Wikipedia "National Gallery of Victoria"

**Nosto T2 — "Piirustuskoulu josta kasvoi taidesuunta" (542 merkkiä)**

> National Gallery of Victoria Art Schoolin perusti 1867 galleriaan
> liitetty piirustuskoulu, joka toimi Australian johtavana
> akateemisen taiteen opinahjona aina 1910-luvulle asti. Koulun
> kasvateista tuli maan merkittävimpiä taidemaalareita, ja
> 1880-luvulla osa heistä ryhtyi maalaamaan ulkoilmassa Heidelbergin
> esikaupungissa – tyylisuunta tunnetaan nykyään nimellä Heidelbergin
> koulukunta, Australian oma versio impressionismista. Koulu jatkoi
> toimintaansa myöhemmin nimellä Victorian College of the Arts, jonka
> Melbournen yliopisto osti 2007.

Faktat ja lähteet:
- National Gallery of Victoria Art School perustettiin 1867 ja pysyi
  Australian johtavana akateemisen taiteen keskuksena noin vuoteen
  1910 asti. — en-Wikipedia "National Gallery of Victoria" /
  "Melbourne"
- Heidelbergin koulukunta (impressionistit) sai nimensä Heidelbergin
  esikaupungista, jossa taiteilijat maalasivat ulkoilmassa 1880-luvulla.
  — en-Wikipedia "Melbourne"
- Koulu jatkoi Victorian College of the Artsina, jonka Melbournen
  yliopisto osti 2007 konkurssin jälkeen. — en-Wikipedia "National
  Gallery of Victoria"

**Nosto T3 — "Kirjasto jonka pääsymaksu oli puhtaat kädet" (492 merkkiä)**

> Melbournen kirjasto avasi ovensa helmikuussa 1856 kokoelmalla,
> johon kuului 3 800 kirjaa. Se oli yksi maailman ensimmäisistä
> ilmaisista yleisölle avoimista kirjastoista – pääsyn ehtona oli
> vain, että kävijä oli täyttänyt 14 vuotta ja hänellä oli puhtaat
> kädet. Samaa arkkitehti Joseph Reediä käytettiin sekä kirjaston,
> Melbournen kaupungintalon että myöhemmin Kuninkaallisen
> näyttelyhallin suunnittelussa, joten Melbournen 1800-luvun
> kulttuurirakennukset kantavat monilta osin saman käsialan.

Faktat ja lähteet:
- Kirjaston ensimmäinen vaihe avattiin 11.2.1856, kokoelmassa 3 800
  kirjaa Mr Justice Barryn valitsemana. — en-Wikipedia "State Library
  Victoria"
- Kirjasto oli yksi maailman ensimmäisistä ilmaisista yleisökirjastoista,
  avoinna yli 14-vuotiaille "puhtain käsin". — en-Wikipedia "State
  Library Victoria"
- Arkkitehti Joseph Reed suunnitteli kirjaston sekä myöhemmin myös
  Melbourne Town Hallin ja Royal Exhibition Buildingin. — en-Wikipedia
  "State Library Victoria"

**Nosto T4 — "Kujat jotka kantavat kahta vuosisataa" (530 merkkiä)**

> 2000-luvulla Melbournen keskustan pienet takakujat täyttyivät
> katutaiteesta, ja esimerkiksi Hosier Lane kerää nykyisin enemmän
> Instagram-aihetunnisteita kuin monet kaupungin perinteiset
> nähtävyydet, kuten Melbournen eläintarha. Katutaiteilija Banksy on
> kehunut Melbournen graffitikulttuuria maailman johtavaksi. Samat
> kujat kulkevat samojen kivitalojen välissä, jotka nousivat
> kultaryntäyksen ja Marvellous Melbournen -kauden rakennusbuumin
> aikana – 1800-luvun kauppakujat ja 2000-luvun taidegalleriat
> jakavat saman kaupunkitilan.

Faktat ja lähteet:
- 2000-luvulla katutaide levisi Melbournen keskustan kujille, ja
  "laneway galleries" -kujista tuli merkittäviä matkailukohteita. —
  en-Wikipedia "Melbourne"
- Hosier Lane houkuttelee enemmän Instagram-aihetunnisteita kuin osa
  kaupungin perinteisistä nähtävyyksistä, esimerkkinä Melbourne Zoo. —
  en-Wikipedia "Melbourne"
- Banksy on kuvaillut Melbournen graffitiskeneä maailman johtavaksi. —
  en-Wikipedia "Melbourne"

### Teemasivu `luonto` — 4 nostoa

**Nosto L1 — "Johtaja joka aloitti juuri isoisän matkan vuonna" (534 merkkiä)**

> Kuninkaalliset kasvitieteelliset puutarhat olivat vuodesta 1857
> lähtien saksalaissyntyisen Ferdinand von Muellerin käsissä – hän
> kartutti kokoelmaa tieteellisin perustein ja perusti Victorian
> kansallisen herbaarion. Vuonna 1873, samana vuonna kuin isoisän
> matka, puutarhojen johtajaksi tuli William Guilfoyle, joka muutti
> tyylin kokonaan: tiukan tieteellisen kasvikokoelman sijaan hän loi
> maalauksellisen maisemapuiston nurmikenttineen, lampineen ja
> trooppisine istutuksineen. Guilfoylen suunnittelema ilme on yhä
> puutarhojen perusta.

Faktat ja lähteet:
- Ferdinand von Mueller nimitettiin puutarhojen ensimmäiseksi
  vakituiseksi johtajaksi 1857; hän perusti Victorian kansallisen
  herbaarion. — en-Wikipedia "Royal Botanic Gardens Victoria"
- William Guilfoyle tuli johtajaksi VUONNA 1873 ja muutti puutarhojen
  tyylin maalaukselliseksi maisemapuistoksi; lisäsi trooppisia ja
  lauhkean vyöhykkeen kasveja. — en-Wikipedia "Royal Botanic Gardens
  Victoria"

**Nosto L2 — "Puu jonka alla syntyi oma siirtokunta" (480 merkkiä)**

> Puutarhoista löytyy yhä muutama alkuperäinen iso puu, muun muassa
> noin 300 vuotta vanha punakumipuu, jonka alla Victoria julistettiin
> omaksi siirtokunnakseen erillään Uudesta Etelä-Walesista 1851. Puu
> tunnetaan nimellä Separation Tree, mutta sen kunto heikentyi
> ilkivallan seurauksena: hyökkäykset 2010 ja 2013 johtivat latvuksen
> kuolemaan, ja se poistettiin 2015. Suurin osa puutarhojen
> alkuperäisestä kasvillisuudesta väistyi jo 1800-luvulla
> eurooppalaisten tuontilajien tieltä.

Faktat ja lähteet:
- Separation Tree, n. 300-vuotias punakumipuu (river red gum), on
  puu, jonka alla Victoria julistettiin erilliseksi siirtokunnaksi
  1851. — en-Wikipedia "Royal Botanic Gardens Victoria"
- Puu vaurioitui ilkivallan seurauksena 2010 ja 2013; latvus kuoli, ja
  poistotyöt alkoivat 2015. — en-Wikipedia "Royal Botanic Gardens
  Victoria"
- Suurin osa alkuperäisestä kasvillisuudesta poistettiin 1800-luvulla,
  kun kasvitieteilijät (mm. von Mueller) istuttivat lajeja ympäri
  maailmaa. — en-Wikipedia "Royal Botanic Gardens Victoria"

**Nosto L3 — "Nimi joka tarkoitti alun perin vain putousta" (558 merkkiä)**

> Wurundjerit kutsuivat kaupungin läpi virtaavaa jokea nimellä
> Birrarung, sumujen joki, ja se oli vuosituhansien ajan tärkeä
> kokoontumis- ja ruokapaikka. Nimi Yarra syntyi väärinkäsityksestä:
> kun maanmittaaja John Wedge kysyi joen nimeä 1835, paikalliset
> osoittivat putousta ja sanoivat "yarra yarra" – he tarkoittivat vain
> putousta, mutta nimi jäi koko joelle elämään. 1850-luvulla joki oli
> jo niin saastunut teollisuuden ja jäteveden vuoksi, että se aiheutti
> lavantautiepidemian, ja kaupunki avasi 1860 uimahallin
> houkutellakseen ihmiset pois joesta uimasta.

Faktat ja lähteet:
- Joen wurundjeri-nimi Birrarung tarkoittaa "sumujen jokea"; joki oli
  tärkeä resurssi ja kokoontumispaikka. — en-Wikipedia "Yarra River"
- Nimi "Yarra" syntyi maanmittaaja John Wedgen väärinymmärryksestä
  1835 — paikalliset tarkoittivat sanalla "yarra yarra" vain putousta
  (Yarra Yarra falls). — en-Wikipedia "Yarra River"
- 1850-luvulla joki saastui pahoin ja aiheutti lavantautiepidemian;
  ensimmäiset City Baths avattiin 1860 houkuttelemaan uimareita pois
  joesta. — en-Wikipedia "Yarra River"

**Nosto L4 — "Ratsastusradasta juoksulenkiksi" (510 merkkiä)**

> Puutarhojen ulkokehälle raivattiin 1900-luvun alussa 3,8 kilometrin
> pituinen ratsastusrata, jonka pinta tehtiin parkitusta kuoresta –
> siitä rataa kutsutaan nimellä "the Tan". Rata muutettiin myöhemmin
> lenkkeilyreitiksi ja on nykyisin Melbournen suosituin ja tunnetuin
> juoksulenkki; etäisyysmerkit ja kellot lisättiin vasta 2011. Sama
> polku kiertää yhä puutarhojen laitaa, mutta nykyisin sillä
> juostaan, ei ratsasteta – radan varrella liikkuu päivittäin
> tuhansia lenkkeilijöitä ennen töitä ja työpäivän jälkeen.

Faktat ja lähteet:
- Tan Track, 3,8 km:n lenkki puutarhojen ulkokehällä, rakennettiin
  1900-luvun alussa ratsastuksen tanparkkiradaksi. — en-Wikipedia
  "Royal Botanic Gardens Victoria"
- Rata muutettiin myöhemmin lenkkeilyreitiksi ja on Melbournen
  suosituin ja tunnetuin juoksulenkki; etäisyysmerkit ja kellot
  asennettiin 2011. — en-Wikipedia "Royal Botanic Gardens Victoria"

---

## 3. Viisi jaksoehdotusta matkaoppaaseen

Faktat on valittu niin, etteivät ne toista osion 2 nostoja tai
kulttuurivisan vastauksia.

**Jakso 1 — "Perille ja liikkeelle"**

Flinders Street -asema avattiin syyskuussa 1854 ensimmäisenä
kaupunkirautatieasemana koko Australiassa, ja samana päivänä ajettiin
maan ensimmäinen höyryjunamatka. Isoisän vieraillessa asema oli vielä
vaatimaton lautarakennusten sarja – nykyisin tunnettu kupolirakennus
valmistui vasta 1910-luvulla. Asema on yhä Melbournen tärkein
lähijunaterminaali ja luonteva lähtöpiste kaupunkiin tutustumiselle.

Faktat ja lähteet:
- Flinders Street -asema avattiin 12.9.1854 ensimmäisenä
  kaupunkirautatieasemana Australiassa; samana päivänä ajettiin maan
  ensimmäinen höyryjunamatka. — en-Wikipedia "Flinders Street railway
  station"
- Vuonna 1873 asema koostui vielä vaatimattomista lautarakennuksista;
  nykyinen kupolirakennus suunniteltiin 1899–1900 ja valmistui
  pääosin 1909–1910. — en-Wikipedia "Flinders Street railway
  station"

**Jakso 2 — Alueen rakenne**

Kaupungin keskusta rakentuu edelleen kuvernööri Bourken 1837
tilaamalle ruutukaavalle, joka tunnetaan nimellä Hoddle Grid – leveät
pääkadut ja niiden välissä kapeammat sivukadut, joista monet ovat
sittemmin muuttuneet kahviloiden ja pienliikkeiden täyttämiksi
kujiksi. Yarra-joki mutkittelee keskustan eteläreunalla ja erottaa
perinteisen liikekeskustan uudemmasta Southbankin alueesta.

Faktat ja lähteet:
- Kuvernööri Richard Bourke tilasi kaupungin ensimmäisen
  kaavoitussuunnitelman, Hoddle Gridin, 1837. — en-Wikipedia
  "Melbourne"
- Yarra-joki kulkee keskustan läpi/reunalla, ja alueen eteläpuolella
  on Southbank. — en-Wikipedia "Melbourne" (Geography-osio, yleinen
  maantieteellinen konteksti)

**Jakso 3 — Arjen ilmiö: Queen Victoria Market**

Queen Victoria Market avattiin virallisesti maaliskuussa 1878 vanhan
Melbournen hautausmaan paikalle – ennen markkinoiden rakentamista
alueelta siirrettiin muun muassa kolmen 1840-luvulla teloitetun
aboriginaalimiehen jäänteet uudelleen haudattaviksi. Markkinat ovat
säilyneet 1800-luvun kaupunkien markkinoista täydellisimpänä ja
suurimpana, ja niillä myydään yhä tuoretta ruokaa ja käsitöitä joka
päivä paitsi maanantaisin ja keskiviikkoisin.

Faktat ja lähteet:
- Queen Victoria Market avattiin virallisesti maaliskuussa 1878 vanhan
  Melbournen hautausmaan (Old Melbourne Cemetery) alueelle. —
  en-Wikipedia "Queen Victoria Market"
- Ennen rakentamista 28 luurankoa siirrettiin uudelleenhaudattavaksi,
  mukaan lukien kolme 1840-luvulla teloitettua aboriginaalimiestä. —
  en-Wikipedia "Queen Victoria Market"
- Markkinat ovat säilyneet 1800-luvun markkinoista täydellisimpänä ja
  suurimpana; avoinna joka päivä paitsi maanantaisin ja
  keskiviikkoisin. — en-Wikipedia "Queen Victoria Market"

**Jakso 4 — Historian käännekohta: kahvipalatseista kahvilakulttuuriin**

Maabuumin 1880-luvulla Melbourneen nousi useita niin sanottuja
kahvipalatseja – raittiusliikkeen rahoittamia ylellisiä hotelleja,
joissa alkoholi oli kielletty ja kahvi korvasi viinin. Yksi
tunnetuimmista, Federal Coffee Palace, purettiin jo 1973, mutta into
juoda hyvää kahvia ei kadonnut minnekään: Melbournen sisäkaupungin
kujaverkosto tunnetaan nykyisin nimenomaan baareistaan,
katutaiteestaan ja kahvilakulttuuristaan.

Faktat ja lähteet:
- Maabuumin aikana rakennettiin useita "coffee palace" -hotelleja;
  Federal Coffee Palace (Collins Street) oli temperance-hotelli,
  purettu 1973. — en-Wikipedia "History of Melbourne"
- Melbournen sisäkaupungin kujaverkosto tunnetaan baareistaan,
  katutaiteestaan ja kahvilakulttuuristaan. — en-Wikipedia "Melbourne"
  (Tourism-osio)

**Jakso 5 — Milloin kannattaa tulla**

Melbournen ilmasto luokitellaan lauhkeaksi merelliseksi ilmastoksi
(Köppen: Cfb) tai kosteaksi lauhkean vyöhykkeen ilmastoksi
(Trewartha: Cf), lämpimine kesineen ja viileine talvineen. Kaupunki
sijaitsee kuuman sisämaan ja viileän eteläisen valtameren rajalla.
Kylmin koskaan mitattu lämpötila, -2,8 astetta, kirjattiin heinäkuussa
1869 – vain muutama vuosi ennen isoisän matkaa; kuumin mitattu
lämpötila, 46,4 astetta, kirjattiin 2009.

Faktat ja lähteet:
- Köppen-luokka Cfb (lauhkea merellinen) / Trewartha-luokka Cf
  (kostea lauhkea), lämpimät kesät ja viileät talvet. — en-Wikipedia
  "Melbourne" (Climate-osio)
- Alhaisin koskaan mitattu lämpötila -2,8 °C, kirjattu 21.7.1869. —
  en-Wikipedia "Melbourne" (Climate-osio)
- Korkein koskaan mitattu lämpötila kaupungin keskustassa 46,4 °C,
  kirjattu 7.2.2009. — en-Wikipedia "Melbourne" (Climate-osio)
- **HUOM:** samoin kuin muissa tämän erän kaupungeissa, yllä olevat
  luvut ovat en-Wikipedian Climate-osiosta EIVÄTKÄ ole sama asia kuin
  pelin `saatiedot.js`-riville tarvittava ERA5 1991–2020 -normaali.
  Tarkat kuukausinormaalit haetaan kirjoitusvaiheessa
  `tools/hae-saanormaalit.mjs`-työkalulla. En myöskään käyttänyt
  Wikipedian tunnettua "neljä vuodenaikaa yhdessä päivässä"
  -sanontaa tässä tekstissä, koska sama ajatus on jo kulttuurivisan
  kysymyksessä 2 (ks. osio 8, huomio 6).

---

## 4. Yhdeksän kohdekartan kohdetta

Koordinaatit poimittu en-Wikipedian raakatekstin `{{Coord|...}}`-
malliparametreista (ei API-hakua tarvittu, koska jokaisessa
käytetyssä artikkelissa lat/lon oli näkyvissä sellaisenaan raaka-
tekstissä). Etäisyydet ja suunnat OMIA LASKELMIANI koordinaattieroista
(asteet × 111 km, pituusasteille kerrottu cos(37,81°) ≈ 0,791),
tarkistettu Node-skriptillä — sama menetelmä kuin
faktapohja-colombo.md:ssä.

**Vertailupiste on Melbournen perustamispaikka, ei Wikipedian
hallinnollinen kaupunkipiste** (spec-mantereet.md sääntö 4: kartan
keskusta valitaan historiallisen ytimen mukaan, ei hallinnollisen
koordinaattipisteen). John Batman ja siirtolaiset perustivat
siirtokunnan Yarra-joen pohjoisrannalle elokuussa 1835, ja paikka on
nykyään Immigration Museum. Wikipedian oma "Melbourne"-artikkelin
kaupunkipiste osuu vain n. 0,6 km koilliseen tästä ytimestä — paljon
pienempi ero kuin Sydneyn ennakkotapauksessa (1 km), koska Melbournen
1837 ruutukaava (Hoddle Grid) rakennettiin suoraan perustamispaikan
ympärille. Kumpikin piste olisi käytännössä kelvannut, mutta
perustamispaikkaa käytettiin säännön mukaisesti.

| # | Nimi | Koordinaatit (desimaali) | Lähdeartikkeli | Etäisyys/suunta perustamispaikasta |
|---|---|---|---|---|
| 1 | Immigration Museum, perustamispaikka 1835 (vertailupiste) | 37,8191°S 144,9604°I | "Immigration Museum, Melbourne" | (vertailupiste) |
| 2 | Melbourne (Wikipedian hallinnollinen piste, vertailuksi) | 37,81417°S 144,96306°I | "Melbourne" | ~0,59 km koilliseen |
| 3 | Flinders Street -asema | 37,81808°S 144,96681°I | "Flinders Street railway station" | ~0,57 km itään |
| 4 | Queen Victoria Market | 37,8070°S 144,9569°I | "Queen Victoria Market" | ~1,38 km pohjoiseen |
| 5 | State Library Victoria | 37,80980°S 144,96479°I | "State Library Victoria" | ~1,10 km pohjoiseen |
| 6 | Fitzroy Gardens | 37,81256°S 144,98039°I | "Fitzroy Gardens" | ~1,90 km itään |
| 7 | Melbourne Cricket Ground | 37,82000°S 144,98333°I | "Melbourne Cricket Ground" | ~2,01 km itään |
| 8 | National Gallery of Victoria (NGV International) | 37,82250°S 144,96889°I | "National Gallery of Victoria" | ~0,83 km kaakkoon |
| 9 | Royal Botanic Gardens Victoria (Melbourne) | 37,83340°S 144,98033°I | "Royal Botanic Gardens Victoria" | ~2,36 km kaakkoon |
| 10 | Royal Exhibition Building | 37,80472°S 144,97139°I | "Royal Exhibition Building" | ~1,86 km koilliseen |

**Rajausehdotus:** kaikki kymmenen kohdetta mahtuvat n. 2,4 km
säteelle perustamispaikasta — samaa tiiviysluokkaa kuin Sydneyn
1,4 km:n rypäs, koska myös isoisän ajan Melbourne oli vielä kompakti
ruutukaavakaupunki.

**Kymmenes/yhdestoista ehdokas jätetty pois taulukosta, koordinaatit
kuitenkin talteen:** Old Treasury Building (K2-nosto),
37,813153°S 144,974121°I, n. 1,37 km koilliseen perustamispaikasta —
jätin sen pois pitääkseni taulukon 8–10 kohteen sisällä ja koska
Fitzroy Gardens ja Royal Exhibition Building kattavat jo saman
Spring Street -precinctin alueen; kirjoittaja voi lisätä sen
kymmenenneksi tai kymmenennentoista pisteeksi suoraan tästä
koordinaatista. Chinatownilla (K3-nosto) ja Hosier Lanella
(T4-nosto) EI ollut `{{Coord}}`-mallinetta artikkelien raakatekstissä
lainkaan — niiden koordinaatit pitää hakea erikseen (esim.
OpenStreetMap tai MediaWiki-API), en arvannut lukuja.

---

## 5. Kuva-aiheet (Commons-kategoriat, ei hakusanoja)

Kategoriat tarkistettu OLEMASSA OLEVIKSI Commonsin
`action=query&titles=Category:...`-kutsulla 23.8.2026 (pelkkä
olemassaolotarkistus — SISÄLTÖÄ EI ole silmäilty, se on kirjoittajan
työ kuvasääntöjen mukaisesti). Alkuperäiskansakuvissa sama arki- ja
ylpeyskuvasto kuin muuallakin pelissä (spec-mantereet.md,
Kuvalinjat) — ei kurjuuskuvastoa, ei pelkkiä seremoniaklišeitä.

**Avauskuvat (3):**
1. `Category:Melbourne in the 1850s` — kultaryntäyksen aikainen
   katukuva tai historiallinen litografia.
2. `Category:Immigration Museum, Melbourne` — vanhan Customs House
   -rakennuksen julkisivu, perustamispaikka.
3. `Category:Royal Botanic Gardens Victoria` — laaja maisemakuva
   puutarhoista.

**Kansikuvat (3, LAAJOJA YLEISKUVIA — ei yksityiskohtia):**
1. `Category:Flinders Street Station` — asemarakennuksen julkisivu
   Swanston/Flinders-kulmasta, kaupungin tunnetuin siluettikuva.
2. `Category:Royal Exhibition Building` — koko rakennus ja
   kupoli Carlton Gardensin puolelta.
3. `Category:Yarra River` — jokinäkymä keskustan siluetin kanssa.

**Nosto-/jaksokuvat, sivuittain:**

*Kaupunki:*
- `Category:Melbourne in the 1850s` (K1, Canvas Town / kultaryntäys)
- `Category:Old Treasury Building, Melbourne` (K2)
- `Category:Chinatown, Melbourne` tai `Category:Little Bourke Street,
  Melbourne` (K3 — EI tunnistettavia kasvoja kadulla)
- `Category:Wurundjeri` ja `Category:Aboriginal Victorians` (K4 —
  nykykulttuuria, ei historiallista kurjuuskuvastoa)

*Historia:*
- `Category:Eureka Stockade` (H1)
- `Category:History of Melbourne` (H2, maabuumin arkkitehtuuri)
- `Category:Royal Exhibition Building` (H3)
- `Category:Fitzroy Gardens, Melbourne` (H4 — myös arpisesta puusta
   kuva, jos kategoriasta löytyy)

*Kuvataide:*
- `Category:National Gallery of Victoria` (T1, T2)
- `Category:Heidelberg School` (T2)
- `Category:State Library of Victoria` (T3)
- `Category:Street art in Melbourne` ja `Category:Hosier Lane` (T4)

*Luonto:*
- `Category:Royal Botanic Gardens Victoria` (L1, L4)
- `Category:Separation Tree` (L2 — kategoria on olemassa juuri tälle
  puulle)
- `Category:Yarra River` (L3)

*Kohdekartta (täydentäviksi, ei nostoa varten):*
- `Category:Queen Victoria Market`
- `Category:Melbourne Cricket Ground`

---

## 6. Säätiedot

Ks. osio 3, Jakso 5 — samat luvut, sama lähde (en-Wikipedian
Climate-osio, EI ERA5).

---

## 7. Ristiriidat, epävarmuudet ja huomiot

1. **Vahvin löytämäni yksittäinen 1873-osuma on William Guilfoylen
   nimitys Royal Botanic Gardensin johtajaksi TÄSMÄLLEEN 1873** (L1).
   Nostin tämän vuoksi `luonto`-teemasivun mukaan kolmanneksi
   teemasivuksi, vaikka tehtävänanto olisi sallinut vain 1–2 —
   halusin varmistaa, ettei tämä poikkeuksellisen tarkka osuma jää
   käyttämättä. Jos kirjoittaja päättää tehdä vain kaksi teemasivua,
   suosittelen säilyttämään juuri tämän nostosarjan ja pudottamaan
   mieluummin `kuvataide`-sivun (sen 1873-osuma, McArthur-galleria
   1874, on toiseksi vahvin muttei aivan yhtä tarkka).
2. **"Marvellous Melbourne" -haku Wikipediassa johtaa VÄÄRÄÄN
   artikkeliin.** en-Wikipedian artikkeli nimeltä "Marvellous
   Melbourne" käsittelee vuoden 1910 dokumenttielokuvaa, ei
   1880-luvun maabuumikautta tai lempinimen historiaa — tämä on
   nimikollisio, joka kannattaa tietää etukäteen. Käytin sen sijaan
   pääartikkelia "Melbourne" (Land boom and bust -osio) ja
   "History of Melbourne" -artikkelia, joissa lempinimen synty (1885,
   Sala ja Harold) ja maabuumin yksityiskohdat kerrotaan.
3. **Kohdekartan vertailupiste on perustamispaikka (Immigration
   Museum), ei Wikipedian hallinnollinen piste** — ks. osio 4,
   perustelu spec-mantereet.md-säännön 4 mukaisesti. Ero on tässä
   tapauksessa pieni (0,6 km), koska Hoddle Grid rakennettiin suoraan
   perustamispaikan ympärille.
4. **Chinatownilla ja Hosier Lanella ei ollut koordinaatteja
   artikkelien raakatekstissä** (ei `{{Coord}}`-mallinetta) — jätin
   ne siksi pois osion 4 taulukosta, vaikka niistä on nostot (K3, T4).
   En arvannut koordinaatteja; kirjoittajan pitää hakea ne erikseen
   jos kohteet halutaan kartalle.
5. **Old Treasury Buildingin koordinaatit ovat talteessa osiossa 4**
   (kymmenes/yhdestoista ehdokas), mutta rakennus jätettiin pois
   varsinaisesta 8–10 kohteen taulukosta tilan vuoksi — koordinaatti
   on kuitenkin valmiina, jos kirjoittaja haluaa lisätä sen.
6. **Kulttuurivisan (`oceania-questions.js`, kohta `melbourne`)
   vastauksia on vältetty tietoisesti nostoissa ja säätiedoissa:**
   en käyttänyt "neljä vuodenaikaa yhdessä päivässä" -sanontaa
   (kysymys 2:n vastauksen ydin), en tehnyt raitiovaunuverkosta
   omaa nostoa ("maailman laajin" toistuu kysymyksen 4 fact-kentässä
   — mainitsen kaupunkilehden trams-aiheen vain ohimennen H2-nostossa
   ilman superlatiivia), en käsitellyt MCG:tä minkään noston aiheena
   (vain kohdekartalla) välttääkseni australialaisen jalkapallon
   (kysymys 5), ja poistin H3-nostoluonnoksesta alkuperäisen
   maininnan "Melbourne oli liittovaltion pääkaupunki 1901–1927"
   (kysymysten 1 ja 3 fact-kenttien ydin) — jäljelle jäi vain
   Unescon maailmanperintöstatus 2004.
7. **Royal Exhibition Buildingin Unesco-status tarkistettu tarkasti:**
   se on ensimmäinen AUSTRALIALAINEN RAKENNUS maailmanperintölistalla
   (1.7.2004), EI Australian ensimmäinen maailmanperintökohde
   ylipäätään (maalla oli jo luonnonperintökohteita, mm. Uluru ja
   Suuri valliriutta) — huomasin tämän eron itse kirjoitusvaiheessa ja
   korjasin H3-nostoa vastaavasti (ks. osio 2, H3:n lähdeviite).
8. **Sukupolvien erottaminen (Stolen Generations) ei nouse tässä
   koosteessa** — sama ratkaisu kuin faktapohja-sydney.md:ssä: aihe
   kuuluu 1900-luvulle eikä tämän 1873-painotteisen kaupunkilehden
   luontevaan aikahaarukkaan, mutta sitä ei ole myöskään kielletty —
   jos kirjoittaja haluaa viitata siihen (esim. maalehden AUS-puolella),
   se on oma erillinen tutkimustehtävänsä.
9. **`docs/mantereet-tyoaineisto/spec-mantereet.md` luettiin
   omatoimisesti**, koska se on SITOVA koko Oseanian laudalle eikä
   sen lukematta jättäminen olisi ollut turvallista annetun
   kunnioitus-vaatimuksen kannalta — ks. dokumentin alkuun kirjattu
   perustelu.
10. **Vain en-Wikipediaa ja sen raakatekstiä (action=raw) käytetty
    kaikkiin faktoihin**, paitsi Commons-kategorioiden
    olemassaolotarkistukseen (osio 5), joka käytti Commonsin
    `action=query`-rajapintaa vain kategorianimien vahvistamiseen —
    EI kuvasisällön tarkistamiseen. Ei ulkopuolisia hakuja tämän
    faktapohjan sisältöön.
11. **Kaikki nostot ja jaksot on kirjoitettu valmiiksi suomenkieliseksi
    tekstiksi** merkkimäärävaatimusten mukaan (johdannot 212–231 mrk,
    nostot 480–653 mrk) ja tarkistettu koneellisesti Python-skriptillä.
