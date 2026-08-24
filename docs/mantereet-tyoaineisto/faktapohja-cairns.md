# Cairns — faktakoostaja, uusi kaupunkilehti (Oseanian lauta)

Lauta-id `oceania`, kaupunki-id `cairns`, maa AUS (Australia), en-Wikipedia
"Cairns" ellei toisin mainita. Kaikki tiedot haettu en-Wikipediasta
**24.8.2026** (`action=raw`; `NODE_USE_ENV_PROXY=1`; 429-vastauksia tuli
useasti Wikipedian ja Commonsin rajapinnoista, ja niihin vastattiin
kasvavalla uusintaviiveellä 2 s, 4 s, 8 s… resepti-ohjeen mukaisesti —
yksikään haku ei jäänyt HTTP 200 -runkoon piiloutuneen virhesivun taakse,
kaikki tarkistettiin sisällöstä). Jokainen haettu otsikko tarkistettu
#REDIRECT-rivin ja täsmennyssivun varalta — **"Yidinji" on täsmennysansa**:
sillä nimellä ei ole yhtä artikkelia, vaan täsmennyssivu ohjaa kolmeen eri
kohteeseen. Oikeat artikkelit ovat "Yidiny people" (kansa, EI "Yidinji
people" — se on pelkkä #REDIRECT) ja "Yidiny language" (kieli).

Luin ennen työtä `js/tyohuone-raamattu.js` (Perustuslaki, erityisesti
pilarit 3 ja 4), `docs/aasia-tyoaineisto/lehtityo-resepti.md` (SITOVA),
`docs/moduulit/kaupunkilehti.md`, mallitiedostona
`docs/mantereet-tyoaineisto/faktapohja-suva.md` (rakenne kopioitu siitä
osio osiolta — Suva on lähin ennakkotapaus: sama "kaupunkia ei vielä ollut
1873" -kehys) ja `docs/mantereet-tyoaineisto/spec-mantereet.md` (Oseania-
osio ja kaikkia kolmea uutta mannerta koskevat viisi linjausta). Luin myös
`js/packs/oceania-questions.js` kohdan `cairns` (viisi kysymystä: Iso
valliriutta nimeltä, valkaistumisen syy, riutan pituus, Daintreen
sademetsä, riuttaveneet) sekä `js/packs/oceania-saapumiset.js` ja
`js/packs/oceania-valokuvat.js` kohdat `cairns` — ks. osio 8 siitä, miten
päällekkäisyyksiä on vältetty.

**Tehtävän erityispiirre:** En kirjoittanut lehtitekstejä, en ladannut
kuvia enkä koskenut js/packs-tiedostoihin — kaikki alla on raaka-ainetta
kirjoittajalle ja riippumattomalle tarkistajalle.

**Sisältölinjaus (tehtävänanto + spec-mantereet.md + Raamattu pilari 3):**
Cairnsin seudun alkuperäiskansa, gimuy-walubarra-yidinjit, kuvataan
elävänä nykypäivän toimijana — heidän oma nimensä alueelle (Gimuy) ja oma
kansannimensä (Yidinji/Yidiny) tulevat ennen siirtomaanimiä, ja seutu on
edelleen neljän tunnustetun alkuperäiskansaryhmän kotimaata. Siirtomaa-
historian väkivaltaiset kohdat (1872 Battle Camp -yhteenotto,
Dalrymplen retkikunnan 1873 kohtaamiset rannikolla) kerrotaan tapahtumina
ilman julmuuksien yksityiskohtia, piikki suunnataan retkikunnan
eurooppalaisiin itseensä, ei paikallisiin — ks. osio 7 huomio 1
tarkemmasta käsittelyohjeesta. Ei nykysotaa eikä nykypolitiikkaa.

**Isoisän matkan vuosi 1873 (poikkeuksellisen vahva osuma, ks. osio 7
huomio 1):** Cairnsia EI OLLUT OLEMASSA vuonna 1873 — kaupunki
perustettiin vasta 1876. Mutta juuri vuonna 1873 tutkimusretkeilijä
George Elphinstone Dalrymple leiriytyi retkikuntineen täsmälleen sillä
paikalla Trinity Bayn rannalla, josta myöhemmin tuli Cairnsin kaupunki —
Wikipedian oma sanamuoto on suoraan "Dalrymple camped on a site that
later became the city of Cairns". Tämä on jopa Suva-ennakkotapausta
konkreettisempi "kaupunkia ei vielä ole" -kulma: isoisän ikäinen
retkeilijä nukkui täsmälleen sillä paikalla, missä lukija myöhemmin
kävelee, kolme vuotta ennen kuin sinne rakennettiin mitään.

---

## 1. Sivuehdotukset

Tehtävänanto salli 1–3 teemasivua. Käytin kaksi, samaan tapaan kuin
Suva-mallissa: aineisto kantoi selvästi kaksi erillistä teemaa (luonto:
riutta + sademetsä + rautatie; historia: alkuperäiskansat + siirtomaa-
aika + siirtolaisuus + sota), ja kaupunkisivu kokoaa yleiskuvan sekä
signaatti-1873-faktan.

### Sivu A — id `kaupunki`, nimi "Cairns"

**Johdanto (219 merkkiä):**

> Cairns nukkui vielä maapalana, kun retkeilijä leiriytyi sen tulevalle
> paikalle 1873 – kaupunki syntyi vasta kolme vuotta myöhemmin
> kultakenttien satamaksi. Tänään se on Australian portti kahteen
> maailmanperintökohteeseen: riuttaan ja sademetsään.

### Sivu B — teemasivu, ehdotettu id `luonto`, nimi "Riutta ja sademetsä"

**Perustelu valinnalle:** Vakioaihe `luonto` sopii suoraan tehtävänannon
nimeämiin painopisteisiin (Iso valliriutta, Daintreen sademetsä, Kuranda-
rata) ja kattaa kaikki viisi kulttuurivisan kysymystä eri kulmista kuin
maalehden AUS-osaston "Luonto"-aiheen oma riutta-nosto (ks. osio 8 —
päällekkäisyys tarkistettu ja vältetty tietoisesti).

**Johdanto (213 merkkiä):**

> Kaksi maailman ihmettä kohtaa Cairnsin edustalla samalla rannalla:
> maailman suurin koralliriutta ja yksi sen vanhimmista sademetsistä.
> Kumpikaan ei ole muuttumaton – toinen lämpenee, toinen palautettiin
> juuri asukkailleen.

### Sivu C — teemasivu, ehdotettu id `historia`, nimi "Ennen kuin kaupunkia oli"

**Perustelu valinnalle:** Sivu kantaa Cairnsin ihmishistorian pitkän
kaaren: gimuy-walubarra-yidinjien elämä seudulla ennen siirtomaa-aikaa,
1872 yhteenotto, kiinalaisten siirtolaisten agraarinen pioneerityö ja
kaupungin rooli toisessa maailmansodassa. Täydentää kaupunkisivun K1-
nostoa (Dalrymple) ilman että sama tarina toistuu — H1–H4 käsittelevät
kaikki ERI tapahtumia.

**Johdanto (211 merkkiä):**

> Ennen brittejä täällä asuivat gimuy-walubarra-yidinjit, joiden mukaan
> koko seutu on yhä nimeltään Gimuy. Sitten tulivat kalastajat, kultaa
> etsivät retkeilijät, kiinalaiset viljelijät ja lopulta sota
> Korallimerellä.

---

## 2. Kaksitoista nostoehdotusta (4 × 3 sivua)

### Sivu `kaupunki` — 4 nostoa

**Nosto K1 — "Kaupunki joka ei ollut vielä olemassa" (589 merkkiä,
signaatti-1873-nosto)**

> Syyskuun lopulla 1873 tutkimusretkeilijä George Elphinstone Dalrymple
> leiriytyi Trinity Bayn rannalle – paikkaan, josta tulisi kolmen vuoden
> kuluttua Cairnsin kaupunki. Silloin siellä ei ollut vielä mitään: vain
> gimuy-walubarra-yidinjien asuttamaa rantaa, jota kansa itse kutsui
> nimellä Gimuy. Dalrymplen retkikunta etsi kahdella kaljaasilla, Flying
> Fishillä ja Coquettella, maata sokeriviljelylle Cardwellin
> pohjoispuolelta. Kaupunki syntyi vasta 1876, kun Hodgkinsonin
> kultakenttien malmi tarvitsi lähisataman: paikka nimettiin silloisen
> Queenslandin kuvernöörin William Cairnsin mukaan.

Faktat ja lähteet:
- Dalrymple lähti 29.9.1873 Cardwellin läheltä mukanaan mm. kasvitieteen
  puutarhan kuraattori Walter Hill ja 13 alkuperäispoliisin sotilasta,
  aluksina kaljaasit Flying Fish ja Coquette; retken tarkoitus oli
  kartoittaa siirtomaahallitukselle Cardwellin pohjoispuolisia
  rannikkoalueita sokerinviljelyä varten. — en-Wikipedia "George
  Elphinstone Dalrymple"
- "Dalrymple camped on a site that later became the city of Cairns" –
  retkikunta saapui Trinity Bayhin, jossa asui runsaasti paikallisia
  yidinjejä, jotka olivat tunnettuja suurista, koristelluista
  ulokekanooteistaan. — en-Wikipedia "George Elphinstone Dalrymple"
- Kaupunki perustettiin 1876 nimellä Cairns, nimettynä silloisen
  Queenslandin kuvernöörin Sir William Wellington Cairnsin mukaan, sen
  jälkeen kun Hodgkinsonin kultakenttien malmin vientiin tarvittiin
  satamaa. — en-Wikipedia "Cairns"
- Alue tunnettiin briteille pelkkänä Trinity Bayna vuodesta 1770 aina
  1870-luvun alkuun asti; ensimmäinen eurooppalainen läsnäolo alueella
  olivat 1860-luvun lopulla saapuneet merikurkkukalastajat. — en-
  Wikipedia "Cairns"

**Nosto K2 — "Portti kahteen maailmanperintökohteeseen" (488 merkkiä)**

> Cairns on Australian matkailun neljänneksi suosituin kohde ulkomaisille
> matkailijoille Sydneyn, Melbournen ja Brisbanen jälkeen – silti se on
> ainoa niistä, josta pääsee samana päivänä sekä maailman suurimmalle
> koralliriutalle että yhdelle maailman vanhimmista sademetsistä.
> Kaupungin oma rantaviiva ei sovellu uintiin: luonnollinen ranta on
> laajaa liejuista vuorovesitasankoa, joten kaupunki rakensi 4 800
> neliömetrin suolavesialtaan, Esplanadin laguunin, joka avattiin
> maaliskuussa 2003.

Faktat ja lähteet:
- Tourism Australian mukaan Cairnsin seutu on ulkomaisten matkailijoiden
  neljänneksi suosituin kohde Australiassa Sydneyn, Melbournen ja
  Brisbanen jälkeen; kaupunki tunnetaan Ison valliriutan porttina. — en-
  Wikipedia "Cairns"
- Cairnsin esplanadin 4 800 neliömetrin suolavesiallas (Cairns Esplanade
  Lagoon) avattiin maaliskuussa 2003 kaupungin keskustan rannalle. — en-
  Wikipedia "Cairns"
  (HUOM: syytä sille, miksi allas tarvittiin — luonnollinen liejuinen
  ranta — ei ollut suoraan Cairns-artikkelissa; se on kuitenkin jo
  peliaineistossa, ks. osio 8.)

**Nosto K3 — "Rautatie joka kiipesi vuorenrinteen" (508 merkkiä)**

> Rautatie Cairnsista Athertonin ylängölle rakennettiin 1886–1891
> pelastamaan seudun kultakenttien liikennettä – reitti nousee
> merenpinnasta 328 metriin Macalisterin vuoriston läpi viidessätoista
> käsin louhitussa tunnelissa ja 37 sillalla, ja maata kaivettiin kolme
> miljoonaa kuutiometriä. Monta työntekijää kuoli rakennustöissä.
> Junaliikenne matkustajille alkoi 25. kesäkuuta 1891, ja ensimmäinen
> varsinainen matkailujuna ajoi reitin jo 1936 – rata on nykyään
> perintökohteena suojeltu ja yhä samassa käytössä.

Faktat ja lähteet:
- Radan rakentaminen alkoi 1886 ja se valmistui Kurandaan asti 1891;
  matkustajaliikenne alkoi 25.6.1891. Rata nousee merenpinnasta 328
  metriin Macalisterin vuoriston läpi, ja sen rakentamiseen tarvittiin 15
  käsin louhittua tunnelia ja 37 siltaa; maata kaivettiin kolme
  miljoonaa kuutiometriä, ja monta työntekijää kuoli. — en-Wikipedia
  "Kuranda Scenic Railway"
- Ensimmäinen matkailujuna Cairnsista Kurandaan ajoi 1936. Rata on
  perintölistattu (heritage-listed). — en-Wikipedia "Kuranda Scenic
  Railway" / "Cairns" (Heritage listings -osio)

**Nosto K4 — "Trooppinen kaupunki jolla on vain kaksi vuodenaikaa" (457
merkkiä)**

> Cairnsissa on trooppinen monsuunilmasto: sadekausi marraskuusta
> toukokuuhun ja kuivempi kausi kesä-lokakuussa, joskin kevyitä
> sadekuuroja tulee silloinkin. Vuotuinen sademäärä on lähes 2 000
> millimetriä, mutta vaihtelu on suurta – tammikuussa 1981 satoi yli 1
> 400 millimetriä kuukaudessa, kun taas kuivana vuonna 2002 koko vuoden
> kertymä jäi 721 millimetriin. Lämpötila pysyy ympäri vuoden lämpimänä,
> heinäkuun keskimäärin 26 ja tammikuun 32 asteen välillä.

Faktat ja lähteet:
- Cairnsilla on trooppinen monsuuni-ilmasto (Köppen Am): sadekausi
  marraskuusta toukokuuhun, kuivempi kausi kesä-lokakuussa (kevyitä
  sadekuuroja silti). Vuotuinen keskisademäärä on hieman alle 2 000 mm;
  suurin kuukausisademäärä kirjattiin tammikuussa 1981 (yli 1 417,4 mm),
  kuivin kalenterivuosi oli 2002 (721 mm). Keskimääräinen ylin lämpötila
  vaihtelee 26,2 °C:sta (heinäkuu) 31,7 °C:seen (tammikuu). — en-
  Wikipedia "Cairns" (Climate-osio)

### Teemasivu `luonto` — 4 nostoa

**Nosto L1 — "Riutta joka syntyi jääkauden jälkeen" (451 merkkiä)**

> Vaikka Iso valliriutta on ikivanha muodostuma, nykyinen elävä
> riuttarakenne on paljon nuorempi: se alkoi kasvaa nykyisen kaltaisena
> vasta 6 000–9 000 vuotta sitten, kun merenpinta oli viimeisen jääkauden
> huipulla 120 metriä nykyistä alempana ja nousi sitten vähitellen.
> Riutta nimettiin maailmanperintökohteeksi 1981, ja pelkkä matkailu tuo
> alueelle yli kolme miljardia Australian dollaria vuodessa – valtaosa
> retkistä lähtee juuri Cairnsin satamasta.

Faktat ja lähteet:
- Great Barrier Reef Marine Park Authorityn mukaan nykyisen elävän
  riuttarakenteen kasvu alkoi vanhemman alustan päällä noin 9 000 vuotta
  sitten; CRC Reef Research Centre arvioi iäksi 6 000–8 000 vuotta.
  Viimeisen jääkauden huipulla merenpinta oli noin 120 m nykyistä
  alempana. — en-Wikipedia "Great Barrier Reef" (Geology and geography
  -osio)
- Iso valliriutta valittiin maailmanperintökohteeksi 1981. Matkailu tuo
  alueelle yli 3 miljardia Australian dollaria vuodessa, ja se on
  erityisen suosittu Whitsunday-saarilla ja Cairnsin seudulla. — en-
  Wikipedia "Great Barrier Reef"
  (HUOM: 2900 riuttaa / 900 saarta / 2300 km / Cook 1770 / Flinders-
  nimeäminen 1802 -faktat ovat JO KÄYTÖSSÄ maalehden AUS-osaston
  Luonto-aiheessa ["Suurin elävien rakentama rakennelma"] — TARKOITUKSELLA
  EI TOISTETTU tässä, ks. osio 8.)

**Nosto L2 — "Väri joka katoaa kun meri kuumenee" (510 merkkiä)**

> Kun merivesi lämpenee liikaa, koralli karkottaa sisällään elävät väriä
> antavat levät ja muuttuu valkoiseksi – ilmiötä kutsutaan
> valkaistumiseksi, ja lyhyeksi jäävästä lämpöjaksosta koralli voi vielä
> toipua. Laajoja valkaistumisia on koettu Isolla valliriutalla kesinä
> 1998, 2002, 2006, 2016, 2017, 2020 ja 2022, ja riutta on menettänyt
> tutkimusten mukaan yli puolet korallipeitteestään vuosien 1995 ja 2017
> välillä. Vuonna 2022 pohjois- ja keskiosien korallipeite oli kuitenkin
> runsainta koko seurannan aikana.

Faktat ja lähteet:
- Koralli elää symbioosissa mikroskooppisten levien (tsooksantellien)
  kanssa, jotka antavat sille värin ja ravintoa yhteyttämällä. Kun
  lämpötila nousee liikaa, koralli karkottaa levät ja muuttuu
  valkoiseksi ("valkaistuminen"); jos stressi jää lyhytaikaiseksi,
  koralli voi toipua. — en-Wikipedia "Coral bleaching"
- Laajoja lämpöaaltojen aiheuttamia joukkovalkaistumisia Isolla
  valliriutalla on koettu kesinä 1998, 2002, 2006, 2016, 2017, 2020 ja
  vahvistettu myös maaliskuussa 2022. — en-Wikipedia "Great Barrier
  Reef" (Climate change -osio)
- 2020 julkaistun tutkimuksen mukaan riutta on menettänyt yli puolet
  korallipeitteestään vuosien 1995 ja 2017 välillä; toinen 2012
  tutkimus arvioi puolet menetetyn jo vuodesta 1985. Australian Institute
  of Marine Sciencen 2022-raportti kirjasi kuitenkin pohjois- ja
  keskiosien korallipeitteen suurimmaksi 36 vuoden seurantahistoriassa,
  pääosin nopeakasvuisen Acropora-korallin elpymisen ansiosta. — en-
  Wikipedia "Great Barrier Reef"

**Nosto L3 — "Metsä joka on vanhempi kuin dinosaurukset" (491 merkkiä)**

> Daintreen sademetsä on osa Australian mantereen kerran peittäneen
> valtavan metsän jäännettä, ja se on säilynyt lähes yhtäjaksoisena noin
> 180 miljoonaa vuotta – kymmenen miljoonaa vuotta kauemmin kuin
> Amazonin sademetsä. Noin 1 200 neliökilometrin alueella kasvaa lähes 3
> 000 kasvilajia, ja siellä elää 30 prosenttia Australian sammakko-,
> matelija- ja pussieläinlajeista sekä 90 prosenttia lepakko- ja
> perhoslajeista – kaikki alueella, joka on vain 0,12 prosenttia
> Australian maapinta-alasta.

Faktat ja lähteet:
- Daintreen sademetsä on noin 1 200 km² alue Cairnsista noin 105 km
  pohjoiseen; se on osa Australian itärannikon ikivanhinta yhtäjaksoista
  sademetsäaluetta (Wet Tropics of Queensland), joka on säilynyt noin
  180 miljoonaa vuotta — noin 10 miljoonaa vuotta kauemmin kuin Etelä-
  Amerikan Amazonin sademetsä. — en-Wikipedia "Daintree Rainforest"
- Alueella kasvaa noin 3 000 kasvilajia lähes 210 kasviheimosta ja yli
  900 puulajia; se on 30 % Australian sammakko-, matelija- ja
  pussieläinlajeista, 90 % lepakko- ja perhoslajeista, 7 % lintulajeista
  ja yli 12 000 hyönteislajia kotina, vaikka alue on vain 0,12 %
  Australian maapinta-alasta. — en-Wikipedia "Daintree Rainforest"
  (Wet Tropics Management Authority -lähde artikkelissa)
- Uhanalainen kasuaari (southern cassowary) ja Bennettin puukenguru
  ovat alueen tunnetuimpia uhanalaisia asukkaita. — en-Wikipedia
  "Daintree Rainforest"

**Nosto L4 — "Sademetsä joka palautettiin sen asukkaille" (515 merkkiä)**

> Idän kuku yalanjit hakivat oikeutta esi-isiensä maahan yli
> neljännesvuosisadan – ensimmäinen maaoikeusvaade jätettiin 1995, ja
> osittainen tunnustus saatiin 2007. Syyskuussa 2021 Queenslandin
> osavaltion hallitus luovutti heille lopulta 160 213 hehtaaria maata,
> mukaan lukien Daintreen kansallispuisto sekä kolme muuta suojelualuetta
> – yksi Australian historian suurimmista maanpalautuksista
> alkuperäiskansalle. Kuku yalanjit hallinnoivat aluetta nyt yhdessä
> Queenslandin puisto- ja luonnonsuojeluviranomaisen kanssa.

Faktat ja lähteet:
- Idän kuku yalanjit rekisteröivät ensimmäisen maaoikeusvaateensa
  toukokuussa 1995; huhtikuussa 2007 heidät tunnustettiin 15
  maankäyttösopimuksella (ILUA) yli 230 000 hehtaarin alueen
  perinteisiksi omistajiksi Mossmanin ja Cooktownin välillä, ja
  joulukuussa 2007 liittovaltion tuomioistuin tunnusti heille yksin-
  oikeutetun maaoikeuden 30 300 hehtaariin. — en-Wikipedia "Kuku
  Yalanji" (Native title -osio)
- 29.9.2021 idän kuku yalanjit saivat takaisin 160 213 (yhden lähteen
  mukaan 160 108) hehtaaria maata, mukaan lukien maailmanperintökohde
  Daintreen sademetsä sekä Ngalba Bulalin, Kalkajakan ja Hope Islandsin
  kansallispuistot; sopimus tehtiin Queenslandin osavaltion hallituksen
  kanssa aiemman maaoikeuspäätöksen lisäksi. — en-Wikipedia "Daintree
  Rainforest" / "Kuku Yalanji"
  (HUOM: pieni lukuero 160 213 ha vs. 160 108 ha kahden artikkelin
  välillä — molemmat viittaavat samaan 29.9.2021 sopimukseen, ero
  ilmeisesti pyöristys- tai mittaustapaero. Kirjoittajan kannattaa
  käyttää jompaakumpaa johdonmukaisesti, ks. osio 7 huomio 3.)

### Teemasivu `historia` — 4 nostoa

**Nosto H1 — "Kaivo jonka luona syttyi taistelu" (516 merkkiä)**

> Brittiläiset tunsivat Trinity Bayn rannikon jo 1770-luvulta lähtien,
> mutta ensimmäiset eurooppalaiset asettuivat sinne vasta 1860-luvun
> lopulla merikurkkua pyytävinä kalastajina. He käyttivät nykyisen
> Cairnsin rantaviivan kohdalla ollutta suurta alkuperäisasukkaiden
> kaivoa – ja 1872 kaivon käytöstä syttyi väkivaltainen yhteenotto
> paikallisten yidinjien ja kalastaja Phillip Garlandin välillä.
> Tapahtuman jälkeen aluetta alettiin kutsua nimellä Battle Camp, ja nimi
> säilyi käytössä vielä vuosikymmeniä myöhemminkin.

Faktat ja lähteet:
- Trinity Bay tunnettiin briteille nimellä vuodesta 1770; ensimmäinen
  eurooppalainen läsnäolo alueella olivat 1860-luvun lopulla saapuneet
  merikurkkukalastajat, jotka käyttivät nykyisen Cairnsin rantaviivan
  kohdalla ollutta suurta alkuperäisasukkaiden kaivoa. Vuonna 1872
  paikallisten yidinjien ja kalastaja Phillip Garlandin välillä syttyi
  väkivaltainen yhteenotto kaivon käytöstä, minkä jälkeen aluetta
  kutsuttiin nimellä Battle Camp. — en-Wikipedia "Cairns" (History-osio)

**Nosto H2 — "Neljä kansaa jotka omistavat seudun tänään" (552 merkkiä)**

> Ennen siirtomaa-aikaa Cairnsin seutua asuttivat gimuy-walubarra-
> yidinjit, joiden mukaan koko alue tunnetaan yidinyinkielisellä nimellä
> Gimuy. Kieltä on tutkinut perusteellisesti kielitieteilijä R. M. W.
> Dixon, ja seutu on edelleen neljän alkuperäiskansaryhmän kotimaata:
> yidinjiklaanien lisäksi Dawul Wurun (yirrganydjit), djabugayn ja
> gunggandjin kansat pitävät omistus- ja käyttöoikeuksia eri puolilla
> nykyistä Cairnsin aluetta. Alkuperäiskansojen jäsenet ovat 9,7
> prosenttia koko kaupungin väestöstä – selvästi enemmän kuin
> Australiassa keskimäärin.

Faktat ja lähteet:
- Ennen brittiläistä asutusta Cairnsin seutua asuttivat gimuy-walubarra-
  yidinjit, jotka vaativat yhä alkuperäisiä maaoikeuksiaan. Alue tunnetaan
  yidinynkielellä nimellä Gimuy. Kieltä on tutkinut perusteellisesti
  kielitieteilijä R. M. W. Dixon (mm. teos "A Grammar of Yidiny", 1977).
  — en-Wikipedia "Cairns" (History-osio) / "Yidiny people"
- Cairnsin seudulla on nykyään neljä tunnustettua alkuperäiskansojen
  perinteisten omistajien ryhmää: Dawul Wuru (yirrganydjit) Cairnsin ja
  Port Douglasin välillä, djabugayt (maaoikeus Barron Gorgen
  kansallispuistossa Kurandan lähellä), gunggandjit (yli 7 500 ha
  Yarrabahin niemimaalla) sekä yidinjiklaanit (gimuy-walubarra-yidinjit,
  dulabed malanbarra -yidinjit, mandingalbay-yidinjit ja wadjanbarra-
  tableland-yidinjit). — en-Wikipedia "Cairns" (Indigenous languages and
  representation -osio) / "Yidiny people"
- Vuoden 2021 väestönlaskennassa alkuperäiskansojen (Aboriginal ja
  Torres Strait Islander) osuus Cairnsin väestöstä oli 9,7 %. — en-
  Wikipedia "Cairns" (Demographics-osio)

**Nosto H3 — "Katukauppiaista suurimmaksi kiinalaisyhteisöksi Brisbanen
ulkopuolella" (550 merkkiä)**

> Pian Cairnsin perustamisen jälkeen kiinalaiset siirtolaiset alkoivat
> viljellä puuvillaa, tupakkaa, kahvia, riisiä, sokeria ja banaania
> seudulla – vuonna 1886 kiinalaiset olivat 60 prosenttia kaikista
> viljelijöistä ja 90 prosenttia puutarhureista. Grafton Streetin
> Chinatownista kasvoi 1880-luvulta 1940-luvun puoliväliin suurin
> kiinalaisyhteisö Brisbanen ulkopuolella Queenslandissa. "Valkoinen
> Australia" -politiikka ja maatalouden muutokset kutistivat yhteisön
> noin 1 450 asukkaasta vuoden 1901 tienoilla enää 450 asukkaaseen
> vuoteen 1909 mennessä.

Faktat ja lähteet:
- Pian Cairnsin perustamisen jälkeen kiinalaiset siirtolaiset alkoivat
  kokeilla puuvillan, tupakan, kahvin, riisin, sokerin ja banaanin
  viljelyä; vuonna 1886 kiinalaiset olivat 60 % kaikista viljelijöistä ja
  90 % puutarhureista alueella (795 viljelijää/puutarhuria). — en-
  Wikipedia "Cairns" (History-osio, lähteenä Cairns Chinatown -
  historiaselvitys)
- Grafton Street oli Cairnsin Chinatownin historiallinen sydän — suurin
  ja pisimpään toiminut kiinalaisyhteisö Brisbanen ulkopuolella
  Queenslandissa 1880-luvulta 1940-luvun puoliväliin. — en-Wikipedia
  "Cairns"
- Poliisin väestönlaskenta kirjasi Cairnsin kiinalaisväestöksi 450
  henkeä 1909, noin 1 000 vähemmän kuin 1901 (eli noin 1 450). Väheneminen
  liittyi maatalouden muutoksiin ja "Valkoinen Australia" -politiikkaan.
  — en-Wikipedia "Cairns"

**Nosto H4 — "Kaupunki joka puolusti Korallimerta" (540 merkkiä)**

> Toisen maailmansodan aikana liittoutuneet käyttivät Cairnsia
> tukikohtana Tyynenmeren operaatioihin: kaupungista lensi taistelu-
> lentoja Korallimeren taistelun tueksi 1942, ja alueelle rakennettiin
> yhdysvaltalaisten ja australialaisten ilma- ja merivoimien tukikohtia,
> muun muassa lentoveneiden tukikohta Trinity Inletiin. Mooroobolin
> kukkulalla toimi lisäksi salainen erikoisjoukkojen koulutuskeskus,
> epävirallisesti "Talo kukkulalla". Sodan jälkeen Cairns kehittyi
> vähitellen matkailukaupungiksi, ja kansainvälinen lentokenttä avattiin
> 1984.

Faktat ja lähteet:
- Toisen maailmansodan aikana liittoutuneet käyttivät Cairnsia
  tukikohtana Tyynenmeren operaatioihin: alueelle rakennettiin
  yhdysvaltalaisten ja australialaisten ilmavoimien tukikohtia (nykyinen
  lentokenttä), merivoimien lentoveneiden tukikohta (Naval Base Cairns)
  Trinity Inletiin sekä yhdysvaltalais- ja australialaisia laivasto-
  tukikohtia. Taistelulentoja lennettiin Cairnsista Korallimeren
  taistelun (1942) tueksi. — en-Wikipedia "Cairns"
- Mooroobolin "Fairview"-tilalla toimi erikoisjoukkojen koulutuskeskus,
  virallisesti Z Experimental Station, epävirallisesti "The House on the
  Hill" ("Talo kukkulalla"). — en-Wikipedia "Cairns"
- Sodan jälkeen Cairns kehittyi vähitellen matkailukeskukseksi;
  kansainvälinen lentokenttä avattiin 1984, mikä vahvisti kaupungin
  asemaa erityisesti Japanin markkinoilla. — en-Wikipedia "Cairns"

---

## 3. Viisi jaksoehdotusta matkaoppaaseen

Faktat on valittu niin, etteivät ne toista osion 2 nostoja tai
kulttuurivisan vastauksia sanasta sanaan.

**Jakso 1 — "Vesi jota ei koske ilman suojaa"**

Pohjois-Queenslandin rannikkovesissä elää maailman myrkyllisimpiin
eläimiin kuuluva laatikkomeduusa Chironex fleckeri sekä peukalonkokoinen
irukandji-meduusa, joka on saanut nimensä Cairnsin pohjoispuolella
asuvasta irukandji-kansasta. Pistoja vastaan rannoille on pingotettu
meduusaverkkoja ja pystytetty etikkapisteitä, ja täysipeittävä uimapuku
suojaa tehokkaasti. Cairnsin kaupungin oma ranta on joka tapauksessa
liejuinen vuorovesitasanko, joten paikalliset uivat mieluummin kaupungin
rakentamassa Esplanadin laguunissa.

Faktat ja lähteet:
- Chironex fleckeri -laatikkomeduusa on yksi maailman myrkyllisimmistä
  eläimistä; se on aiheuttanut Australiassa vähintään 79 kuolemaa
  ensimmäisestä raportista (1883) lähtien, vaikka useimmat pistot
  jäävät lieviksi. Ennaltaehkäisynä käytetään rantaverkkoja ja
  etikka-asemia; täysipeittävät sukelluspuvut/trikoot suojaavat
  tehokkaasti. — en-Wikipedia "Box jellyfish"
- Irukandji-oireyhtymä on nimetty irukandji-kansan mukaan, jonka alue
  ulottuu rannikkokaistaletta pitkin Cairnsin pohjoispuolelle; irukandji-
  meduusat ovat noin kuutiosentin kokoisia mutta erittäin myrkyllisiä. —
  en-Wikipedia "Irukandji jellyfish"
- Cairnsin kaupungin oma ranta on liejuinen vuorovesitasanko; kaupunki
  rakensi tästä syystä Esplanadin laguunin (avattu 2003). — ks. osio 8,
  jo peliaineistossa (`js/packs/oceania-valokuvat.js`, kohta cairns).

**Jakso 2 — "Vihreä saari riutan portilla"**

Lähin tapa nähdä Iso valliriutta ilman sukelluskurssia on lauttamatka
Green Islandille, pienelle koralli-saarelle ulompana lahdella – matkalla
liikkuu lasipohjaisia veneitä ja pieniä sukellusveneen tapaisia aluksia,
joista riuttaa näkee kastumatta. Saarelta löytyy myös pelastus-
helikopterin tukikohta, joka palvelee koko ulkoriutan aluetta. Retki on
tyypillinen päiväretki Cairnsin satamasta, ja monet muutkin riuttaveneet
tekevät samantyyppisen kierroksen ulkoriutan pontonien välillä.

Faktat ja lähteet:
- Cairnsin Gallery-osiossa (kuvatekstit) Green Island mainitaan
  toistuvasti "outer Cairns" -riuttakohteena, jonne kulkee lasipohjaisia
  veneitä ja pienoissukellusveneen kaltaisia aluksia sekä lauttoja, ja
  jolla on oma pelastushelikopterin tukikohta. — en-Wikipedia "Cairns"
  (Gallery-osion kuvatekstit)
  (HUOM: tämä on ainoa kohta koko haussa, jossa lähde on kuvateksti eikä
  leipäteksti — Green Islandista ei löytynyt omaa erillistä lisätietoa
  tässä haussa; kirjoittajan kannattaa tarkistaa saaren oma artikkeli
  "Green Island (Queensland)" tarkemmin ennen käyttöä, ks. osio 7 huomio 4.)

**Jakso 3 — "Sykloni joka tulee joka vuosi"**

Cairnsin seutua uhkaavat trooppiset syklonit tavallisesti marraskuusta
toukokuuhun, samaan aikaan sadekauden kanssa. Joulukuussa 2023 sykloni
Jasper aiheutti Barron-joen ennätystulvan, pahimman Cairnsissa sitten
mittausten alkamisen 1915 – aiemmat merkittävät myrskyt olivat muun
muassa syklonit Yasi (2011), Larry (2006) ja Abigail (2001). Matkan
ajoittaminen kuivempaan kauteen kesä-lokakuulle vähentää riskiä joutua
myrskyn tai tulvan yllättämäksi, vaikka kevyitä sadekuurojakin voi
silloinkin tulla.

Faktat ja lähteet:
- Cairns on altis trooppisille sykloneille, jotka muodostuvat
  tavallisesti marraskuun ja toukokuun välillä. Alueeseen vaikuttaneita
  myrskyjä: Jasper (2023), Yasi (2011), Larry (2006), Abigail (2001),
  Steve (2000), Rona (1999), Justin (1997). — en-Wikipedia "Cairns"
  (Tropical cyclones -osio)
- Sykloni Jasper aiheutti joulukuussa 2023 ennätystulvan: Barron-joki
  ylitti maaliskuun 1977 ennätyksen (3,8 m), mikä teki tulvasta pahimman
  Cairnsissa sitten mittausten alkamisen 1915. — en-Wikipedia "Cairns"

**Jakso 4 — "Makuja jotka tulivat muualta"**

Cairnsin ruokakulttuuri kantaa yhä siirtolaishistoriansa jälkiä:
sokeriruoko kasvaa edelleen kaupungin liepeillä Gordonvalen Mulgrave-
sokeritehtaan ympärillä, ja trooppinen ilmasto tuo toreille hedelmiä,
joita ei kasva Australian eteläosissa – mangoa, papaijaa, ananasta ja
vesimelonia. Perinne juontuu 1800-luvun kiinalaisviljelijöistä, jotka
toivat seudulle ensimmäisinä juuri näitä kasveja tuotantoon, kun muu
maatalous ei vielä osannut hyödyntää trooppista ilmastoa.

Faktat ja lähteet:
- Merkittävä osa Cairnsin ympäristöä on yhä sokeriruokoviljelyksiä;
  Mulgrave-sokeritehdas sijaitsee Gordonvalessa. — en-Wikipedia "Cairns"
  (Industry and agriculture -osio)
- Kiinalaiset siirtolaiset kokeilivat ensimmäisinä puuvillan, tupakan,
  kahvin, riisin, sokerin ja banaanin viljelyä Cairnsin perustamisen
  jälkeen; markkinapuutarhurit tuottivat kaivostyöläisille tarvittavia
  hedelmiä ja vihanneksia. — en-Wikipedia "Cairns"
  (HUOM: Rusty's Marketsin nykyinen tropiikkihedelmävalikoima — mango,
  papaija, ananas, vesimeloni — on JO KÄYTÖSSÄ peliaineistossa
  `js/packs/oceania-valokuvat.js`:n cairns-kohdassa; tässä jaksossa
  sama ilmiö selitetään historiallisen alkuperän kautta eikä toisteta
  kuvatekstin sanamuotoa, ks. osio 8.)

**Jakso 5 — "Matka pilvimetsään"**

Kurandan-juna kulkee Cairnsista Athertonin ylängölle nykyään
turistijunana lähes kaksi tuntia suuntaansa, ja matkalla avautuvat
näkymät Barron Gorgeen ja Barron Fallsin putouksille. Kurandan kylässä
perillä on eläintarha, toreja, taidegallerioita sekä alkuperäiskansojen
käsityötä myyviä liikkeitä – lyhyen kävelymatkan päässä asemalta. Reitti
on yksi kaupungin suosituimmista päiväretkistä, ja monet matkailijat
palaavat alas toista reittiä.

Faktat ja lähteet:
- Yhdensuuntainen matka kestää nykyään noin 1 h 55 min; reitti kulkee
  Barron Gorgen kansallispuiston läpi ja tarjoaa näkymät Barron Fallsille
  ja pienemmille Stoney Creek Fallsille. — en-Wikipedia "Kuranda Scenic
  Railway"
- Kurandan asema sijaitsee lähellä trooppisia puutarhoja, ja lyhyen
  kävelymatkan päässä on eläintarha, toreja, taidegallerioita ja
  alkuperäiskansojen käsitöitä myyviä liikkeitä. — en-Wikipedia "Kuranda
  Scenic Railway"

---

## 4. Kahdeksan kohdekartan kohdetta + vertailupiste

Koordinaatit poimittu Commonsin/Wikipedian `action=query&prop=coordinates`
-rajapinnasta suoraan artikkeleiden infoboxeista. Etäisyydet ja suunnat
OMIA LASKELMIANI koordinaattieroista (asteet × 111 km, pituusasteille
kerrottu cos(16,927°) ≈ 0,9569), tarkistettu Node-skriptillä — sama
menetelmä kuin faktapohja-suva.md:ssä ja faktapohja-christchurch.md:ssä.

**Vertailupiste on Cairns Wharf Complex** (spec-mantereet.md sääntö 4:
kartan keskusta valitaan historiallisen ytimen mukaan, ei hallinnollisen
koordinaattipisteen). Perustelu: Cairnsin infobox-koordinaatti (16,92°S
145,78°I, tyyppi "town centre") osoittaa laajaan hallinnolliseen
alueeseen, kun taas kaupungin historiallinen ydin — se paikka, josta koko
kaupunki kasvoi 1876 satamana Trinity Inletin varrella — on juuri Wharf
Streetin laituri- ja varastoalue, joka on nykyään perintölistattu Cairns
Wharf Complex. Sama päättelytapa kuin Suva-, San Francisco- ja
Christchurch-ennakkotapauksissa: satama/ydin ennen hallinnollista pistettä.

| # | Nimi | Koordinaatit (desimaali) | Lähdeartikkeli | Etäisyys/suunta vertailupisteestä |
|---|---|---|---|---|
| 1 | Cairns Wharf Complex (vertailupiste) | 16,9273°S 145,78°I | "Cairns Wharf Complex" | (vertailupiste) |
| 2 | Barrier Reef Hotel | 16,9249°S 145,7795°I | "Barrier Reef Hotel" | ~0,27 km pohjoiseen |
| 3 | Cairns Customs House (ent.) | 16,9235°S 145,7791°I | "Cairns Customs House" | ~0,43 km pohjoiseen |
| 4 | Cairns Court House Complex / Regional Gallery | 16,9213°S 145,7777°I | "Cairns Court House Complex" | ~0,71 km pohjoiseen |
| 5 | Cairns Chinatown Building | 16,9236°S 145,7748°I | "Cairns Chinatown Building" | ~0,69 km luoteeseen |
| 6 | Cairns School of Arts (nyk. Cairns Museum) | 16,922°S 145,7753°I | "Cairns School of Arts" | ~0,77 km luoteeseen |
| 7 | Cairns City Council Chambers | 16,9204°S 145,7752°I | "Cairns City Council Chambers" | ~0,92 km luoteeseen |
| 8 | Cairns War Memorial | 16,9172°S 145,7752°I | "Cairns War Memorial" | ~1,23 km luoteeseen |

Kahdeksan kohdetta täyttää pyydetyn 8–10 kohteen välin. Kaikki kahdeksan
klusteroituvat tiiviisti (0,27–1,23 km) Cairnsin historialliseen
keskustaan Wharf Streetiltä Esplanadille — tiiviimpi kaari kuin
Suva-mallissa, koska Cairnsin koko vanha CBD on hyvin pieni.

**Kolme kauempana olevaa kohdetta, koordinaatit talteen mutta EI
taulukossa** (liian kaukana ydinklusterista mutta kytkeytyvät suoraan
nosto- ja jaksoehdotuksiin):

- **Barron Falls** (K3/J5-nostot), 16,8331°S 145,6430°I — n. 17,9 km
  luoteeseen vertailupisteestä. Kurandan radan reitin varrella.
- **Kuranda** (K3/J5-nostot), 16,8197°S 145,6369°I — n. 19,3 km
  luoteeseen vertailupisteestä. Radan pääteasema.
- **Iso valliriutta** (yleiskoordinaatti, L1/L2-nostot), 16,4°S 145,8°I —
  n. 58,6 km pohjoiseen vertailupisteestä; tämä on koko riuttajärjestelmän
  laskennallinen keskipiste, ei mikään yksittäinen kohde. Yksittäisiä
  lähempiä riuttakohteita (esim. Green Island) EI ehditty tarkistaa
  koordinaateilla tässä haussa, ks. osio 7 huomio 4.

**Daintreen sademetsä** (L3/L4-nostot) EI sovi kohdekartalle lainkaan:
sen artikkelin yleiskoordinaatti (16,2°S 145,4°I) on n. 90 km
vertailupisteestä, koska kyseessä on koko n. 1 200 km² alue eikä yksi
piste — kirjoittajan kannattaa hakea alueen sisäänkäynnin (esim. Daintree
Rainforest Discovery Centren) tarkempi koordinaatti erikseen, jos
Daintree halutaan omaksi merkinnäkseen jollekin toiselle kartalle.

---

## 5. Kuva-aiheet (Commons-kategoriat)

Kategoriat tarkistettu OLEMASSA OLEVIKSI ja niiden kuvamäärät mitattu
Commonsin `action=query&prop=categoryinfo`-rajapinnalla 24.8.2026 —
pelkkä olemassaolo- ja määrätarkistus, SISÄLTÖÄ EI ole silmäilty (se on
kirjoittajan työ kuvasääntöjen mukaisesti). Commons-haku osui 429-
rajoitukseen toistuvasti — odotin ja yritin uudelleen resepti-ohjeen
mukaisesti.

**TÄRKEÄ SUDENKUOPPA: `Category:Cairns` EI ole oikea yleiskategoria**
(tarkistettu — olemassa mutta TYHJÄ: 0 tiedostoa, 0 alakategoriaa,
puhdas kontti). Oikea, sisällöllinen kategoria on **`Category:Cairns,
Queensland`** (432 tiedostoa, 43 alakategoriaa) — täsmälleen se
sudenkuoppa, josta Suva-mallin raportti varoitti kolmesta muusta
kaupungista, ja sama ilmiö toistuu tässä kaupungissa neljäntenä.

**Avauskuvat (3):**
1. `Category:Cairns, Queensland` (432 tiedostoa) — laaja yleiskuva
   kaupungista, esim. Trinity Inletin tai esplanadin siluetti.
2. `Category:Esplanade, Cairns` (42 tiedostoa) — rantabulevardin ja
   laguunin yleisnäkymä.
3. `Category:Great Barrier Reef` (103 tiedostoa) — ilmakuva riutasta.

**Kansikuvat (3, LAAJOJA YLEISKUVIA — ei yksityiskohtia):**
1. `Category:Cairns, Queensland` — kaupungin tai Trinity Inletin
   laaja näkymä.
2. `Category:Daintree Rainforest` (62 tiedostoa) — sademetsän
   laaja panoraama.
3. `Category:Kuranda, Queensland` (170 tiedostoa, 19 alakategoriaa) —
   ylängön tai radan maisemakuva.

**Nosto-/jaksokuvat, sivuittain (kategorioiden kuvamäärät suluissa):**

*Kaupunki:*
- K1: Ei omaa kategoriaa Dalrymplen retkelle tai varhaiselle Trinity
  Baylle löytynyt tässä haussa; `Category:Cairns, Queensland` (432
  tiedostoa) sisältää todennäköisesti vanhoja karttoja tai
  historiallisia kuvia — kirjoittajan kannattaa hakea myös
  "George Elphinstone Dalrymple" -artikkelin omia kuvia erikseen.
- K2: `Category:Esplanade, Cairns` (42) — laguuni tai rantabulevardi.
- K3: `Category:Kuranda Scenic Railway` (149 tiedostoa, 144 kuvaa, 5
  alakategoriaa) — runsas, hyvä valikoima juna- ja ratakuvia.
- K4: `Category:Cairns, Queensland` — sadekuva tai trooppinen maisema,
  TARKISTA erikseen.

*Luonto:*
- L1/L2: `Category:Great Barrier Reef` (103 tiedostoa, 21 alakategoriaa)
  — runsas valikoima riuttakuvia.
- L3: `Category:Daintree Rainforest` (62 tiedostoa) — hyvä valikoima
  sademetsäkuvia.
- L4: Ei omaa Commons-kategoriaa löytynyt idän kuku yalanjeille tässä
  haussa (`Category:Kuku Yalanji` EI OLE OLEMASSA, tarkistettu,
  "missing") — kirjoittajan kannattaa käyttää `Category:Daintree
  Rainforest`-kuvaa (esim. maisema tai kylttiteksti maanpalautuksesta)
  tai etsiä erikseen ajankohtaisempaa uutiskuvaa.

*Historia:*
- H1: Ei omaa kategoriaa Battle Camp -tapahtumalle löytynyt; kirjoittajan
  TARKISTETTAVA erikseen, esim. `Category:Cairns, Queensland` vanhoista
  kuvista tai kartoista.
- H2: `Category:Aboriginal Australians` (544 tiedostoa, 37 alakategoriaa)
  on olemassa oleva LAAJA yleiskategoria — HUOM: arvatut tarkemmat nimet
  `Category:Yidinji people`, `Category:Aboriginal peoples of Queensland`,
  `Category:Indigenous peoples of Queensland`, `Category:Aboriginal
  Australians of Queensland` ja `Category:Djabugay` EIVÄT OLE OLEMASSA
  (kaikki tarkistettu, "missing"). Kirjoittajan on etsittävä laajasta
  `Aboriginal Australians`-kategoriasta alaluokka, joka koskee nimen-
  omaan Far North Queenslandia tai nykyaikaa (ei seremoniaklišeitä,
  spec-mantereet.md:n kuvalinjan mukaisesti).
- H3: Ei omaa kategoriaa Cairnsin kiinalaisyhteisölle tai Chinatownille
  löytynyt (`Category:Chinatown, Cairns` EI OLE OLEMASSA, "missing").
  `Category:Cairns Chinatown Building` (1 tiedosto — hyvin niukka) on
  ainoa suoraan liittyvä. Kirjoittajan kannattaa hakea myös
  Queensland State Archivesin tai State Library of Queenslandin
  vanhoja PD-kuvia erikseen.
- H4: Ei omaa kategoriaa Cairnsin sotahistorialle löytynyt tässä
  haussa; TARKISTA erikseen esim. `Category:World War II in Queensland`
  -tyyppisiä nimiä.

*Kohdekartta (täydentäviksi, ei nostoa varten):*
- `Category:Cairns Customs House` (4 tiedostoa)
- `Category:Cairns Wharf Complex` (4 tiedostoa)
- `Category:Cairns City Council Chambers` (11 tiedostoa, 10 kuvaa)
- `Category:Cairns War Memorial` (17 tiedostoa)
- `Category:Cairns School of Arts` (3 tiedostoa — niukka)
- `Category:Cairns Court House Complex` (2 alakategoriaa, 0 tiedostoa
  suoraan — TARKISTA alakategoriat, todennäköisesti Cairns Regional
  Galleryn oma kategoria)

**REHELLINEN RAPORTTI KATEGORIOIDEN NIUKKUUDESTA:** Yhteensä 18
kategoriaa mitattiin tässä koosteessa. Suurin osa (`Cairns, Queensland`
432, `Aboriginal Australians` 544, `Kuranda Scenic Railway` 149,
`Kuranda, Queensland` 170, `Great Barrier Reef` 103) on runsaita, mutta
useat kaupunkikohteiden kategoriat ovat pieniä (2–17 tiedostoa) tai
puuttuvat kokonaan — erityisesti historia-teemasivun H1, H3 ja H4
-nostoille EI löytynyt yhtään suoraan osuvaa Commons-kategoriaa tässä
haussa, ja L4:lle (Kuku Yalanji -maanpalautus) vain epäsuora vaihtoehto.
KUUSI ARVATTUA KATEGORIANIMEÄ EIVÄT OLLEET OLEMASSA (`Category:Cairns`
[väärä, ks. yllä], `Category:Yidinji people`, `Category:Kuku Yalanji`,
`Category:Djabugay`, `Category:Chinatown, Cairns`, `Category:Aboriginal
peoples/Indigenous peoples/Aboriginal Australians of Queensland`) — sama
sudenkuoppa josta Suva-mallin raportti varoitti. Kirjoittajan on
ehdottomasti tehtävä lisähakuja erityisesti historia-sivun kuville ennen
julkaisua.

---

## 6. Säätiedot

en-Wikipedian Cairns-artikkelin Climate-osiossa on valmis 1991–2020-
normaalitaulukko (Bureau of Meteorology, asema "Cairns Aero AWS",
16°52'12"S 145°45'00"I, 2 m merenpinnasta) — samat luvut kuin osion 2
K4-nostossa ja osion 3 jaksossa 3 käytetyt yleisluvut, mutta itse
kuukausinormaalit (min/keski/maks per kuukausi) ERA5 1991–2020
-aineistosta on silti haettava kirjoitusvaiheessa
`tools/hae-saanormaalit.mjs`-työkalulla lehtityö-reseptin ohjeen
mukaisesti — `js/packs/saatiedot.js`:ssä ei ole vielä riviä `cairns`.
Vaihteluvyöhykkeen `ylin`/`alin`-kentät haetaan `tools/hae-
saanormaalit.mjs`:llä erikseen.

---

## 7. Ristiriidat, epävarmuudet ja huomiot

1. **Dalrymplen 1873-retken alkuperäistekstissä on ajan siirtomaa-
   asenteen mukaista kieltä, jota EI OLE TARKOITUS toistaa.** Wikipedian
   artikkeli "George Elphinstone Dalrymple" lainaa suoraan Dalrymplen
   omia sanoja alkuperäisasukkaista ("savage cannibals", tarve
   "copious effusion of blood") ja kuvaa yksityiskohtaisesti
   ammuskelua, joilla alkuperäisasukkaita "hajotettiin" leireistä.
   Olen TARKOITUKSELLA jättänyt nämä yksityiskohdat pois K1-nostosta ja
   tiivistänyt tapahtuman neutraaliksi ("leiriytyi", "kohtasivat
   paikallisia") Raamatun pilarin 4 ja spec-mantereet.md:n Oseania-
   linjauksen 2 mukaisesti ("piikki herroihin itseensä, ei koskaan
   paikallisille"). Jos kirjoittaja haluaa laajentaa K1-nostoa tai H1-
   nostoa retken yksityiskohtiin, alkuperäistekstiin kannattaa suhtautua
   samalla varauksella kuin Suva-mallin Kai Colo -sotaan: tapahtumat
   kyllä, mutta ei ajan rasistista kieltä eikä väkivallan yksityis-
   kohtia.
2. **1872 Battle Camp -yhteenotto (H1) on kerrottu Wikipediassa hyvin
   lyhyesti** — vain yksi virke ilman yksityiskohtia siitä, kumpi osapuoli
   aloitti tai miten yhteenotto päättyi. Tämä sopii hyvin ikäsopivuus-
   linjaukseen sellaisenaan (ei tarvitse tiivistää enempää, koska lähde
   itse on jo niukka), mutta kirjoittajan kannattaa TIETÄÄ, ettei tarkkoja
   lisätietoja ole tässä haussa saatavilla.
3. **Kuku Yalanji -maanpalautuksen (L4) hehtaariluvussa on pieni
   ristiriita kahden artikkelin välillä**: "Daintree Rainforest" antaa
   160 213 ha, "Kuku Yalanji" antaa 160 108 ha samalle 29.9.2021
   tapahtumalle. Ero on pieni (105 ha, alle 0,1 %) ja ilmeisesti
   pyöristys- tai mittaustapaero eri uutislähteiden välillä — molemmat
   artikkelit viittaavat samaan tapahtumaan samalla päivämäärällä.
   Suosittelen käyttämään jompaakumpaa lukua johdonmukaisesti eikä
   valitsemaan molempia eri kohdissa lehteä.
4. **Green Islandista (Jakso 2) ei löytynyt omaa erillistä leipätekstiä
   tässä haussa** — ainoa lähde on Cairns-artikkelin Gallery-osion
   kuvatekstit, jotka mainitsevat saaren "outer Cairns" -riuttakohteena
   lasipohjaisine veneineen ja pelastushelikopterin tukikohtineen. Tämä
   on poikkeuksellisen ohut lähdepohja verrattuna muihin faktoihin tässä
   koosteessa; kirjoittajan KANNATTAA hakea "Green Island (Queensland)"
   -artikkeli erikseen ja tarkistaa fakta ennen käyttöä, tai jättää Jakso
   2 kokonaan pois jos parempaa lähdettä ei löydy.
5. **Irukandji-kansan ja Cairnsin suhde (Jakso 1) on maantieteellisesti
   epäsuora.** Irukandji-kieli/-kansa sijoittuu Wikipedian mukaan
   rannikkokaistaleelle Cairnsin POHJOISPUOLELLE (Macalister/Kuranda-
   alueelta pohjoiseen), ei suoraan itse kaupunkiin — sama alue jonka
   Cairns.txt:n "Indigenous languages and representation" -osio nimeää
   Irukandji-kielen alueeksi. Jaksossa 1 tämä on kirjoitettu täsmällisesti
   ("Cairnsin pohjoispuolella asuvasta"), mutta kirjoittajan kannattaa
   säilyttää tämä täsmällisyys eikä esittää irukandjeja Cairnsin omana
   kaupunkikansana.
6. **Palmer River -kultaryntäys (kesäkuu 1873) on ERI tapahtuma kuin
   Cairnsin synnyn taustalla oleva Hodgkinsonin kultakenttä**, vaikka
   molemmat ovat Far North Queenslandin 1870-luvun kultaryntäyksiä ja
   ajallisesti lähellä toisiaan. Palmer River johti Cooktownin
   perustamiseen (Dalrymplen oman 1873-retken loppupuolella, ks. K1-
   lähteet), Hodgkinson taas Cairnsin perustamiseen 1876. En sisällyttänyt
   Palmer Riveriä varsinaiseen faktapohjaan, koska se ei suoraan liity
   Cairnsiin — mainitsen sen tässä siltä varalta, että kirjoittaja
   kohtaa sen lähteissä ja pohtii yhteyttä.
7. **`docs/mantereet-tyoaineisto/spec-mantereet.md`:n Oseania-osion
   erityismaininta** ("Tyynenmeren saaret: ydinkoehistoria ja toisen
   maailmansodan taistelut ovat perushistoriaa") koskee nimetysti
   `suva, portvila, honiara, noumea` -kaupunkeja, ei Cairnsia — Cairns on
   Australian kaupunki, ei Tyynenmeren saarivaltion kaupunki, joten sen
   sijasta sovelsin Australia-osion omaa linjausta ("alkuperäiskansat
   elävinä, historia mm. sukupolvien erottaminen kerrotaan hienotunteisesti").
   Cairnsin oma sotahistoria (H4) on kuitenkin aidosti relevantti — se on
   perushistoriaa siinä missä muidenkin kaupunkien sotahistoria, joten
   se on mukana normaalisti ilman erityiskäsittelyä.
8. **Vain en-Wikipediaa ja sen raakatekstiä (action=raw) käytetty
   kaikkiin varsinaisiin faktoihin**, paitsi Commons-kategorioiden
   olemassaolo- ja määrätarkistukseen (osio 5) ja kohdekartan pisteiden
   koordinaattihakuun (osio 4), jotka käyttivät `action=query`-
   rajapintoja vain teknisten metatietojen hakemiseen — EI sisällön
   tarkistamiseen.

---

## 8. Päällekkäisyyksien välttäminen

**`js/packs/oceania-questions.js`, kohta `cairns` (viisi kysymystä):**

1. Mikä maailman suurin koralliriutta on Cairnsin edustalla? (Iso
   valliriutta, taso 1; fact-kenttä: ~2 900 erillistä riuttaa, satoja
   saaria, maailman suurin elävien rakentama muodostuma) — SAMAT luvut
   (2 900 riuttaa, 900 saarta) ovat JO KÄYTÖSSÄ maalehden AUS-osaston
   "Luonto"-aiheen nostossa "Suurin elävien rakentama rakennelma", joka
   kuuluu samaan Cairnsin lehteen (maa omana osastonaan). Tästä syystä
   osion 2 L1-nostoni käyttää TARKOITUKSELLA eri lukuja (nykyisen elävän
   riutan ikä 6 000–9 000 v, maailmanperintöstatus 1981, matkailun
   3 mrd AUD/v) eikä toista 2 900/900/2 300 km -lukuja.
2. Mikä uhkaa koralliriuttoja eniten nykyään? (lämpeneminen ja
   valkaistuminen, taso 2; fact-kenttä: laajoja vaalentumisia 2000-
   luvulla, koralli voi toipua lyhyestä lämpöjaksosta) — L2-nostoni
   KÄYTTÄÄ SAMAA ILMIÖTÄ mutta laajentaa sitä uusilla tiedoilla
   (tsooksantellien symbioosimekanismi, tarkat vuodet 1998–2022,
   prosenttiluvut korallikadosta) — visan vastaus löytyy siis lehden
   tekstistä, muttei ole pelkkä toisto.
3. Kuinka pitkä Iso valliriutta on? (yli 2 000 km, taso 3) — TÄMÄ luku
   on myös maalehden AUS-osastolla ("yli 2 300 kilometrin matkalle"),
   joten vastaus löytyy Cairnsin lehdestä sitäkin kautta; en toistanut
   lukua omissa nostoissani.
4. Mikä sademetsäalue ulottuu Cairnsin lähellä merenrantaan? (Daintreen
   sademetsä, ei taso; fact-kenttä: yksi maailman vanhimmista
   yhtäjaksoisista sademetsistä, rajautuu suoraan riuttaan, kaksi
   maailmanperintökohdetta kohtaa rannalla) — L3-nostoni TOISTAA
   väistämättä "vanhin yhtäjaksoinen sademetsä" -ydinajatuksen (se on
   Daintreen keskeisin fakta), mutta käyttää eri konkreettisia lukuja
   (180 milj. v muotoillaan "10 milj. v vanhempi kuin Amazon", 3 000
   kasvilajia, 30%/90%-eläinluvut) kuin visan fact-kenttä, joka ei
   sisällä yhtään numeroa.
5. Mitä varten Cairnsin satamasta lähtee päivittäin veneitä?
   (riutalle sukeltamaan/snorklaamaan, taso 1; fact-kenttä: matkailu on
   kaupungin tärkein elinkeino, veneet vievät kävijöitä riutalle
   päivittäin) — Jakso 2:ni (Green Island) ja K2-nostoni (matkailu-
   tilasto) käsittelevät SAMAA ilmiötä TARKOITUKSELLA eri kulmasta:
   K2 antaa kansallisen matkailutilaston (neljänneksi suosituin kohde),
   Jakso 2 antaa konkreettisen esimerkkikohteen (Green Island, veneet,
   lasipohjaveneet) — kumpikaan ei toista visan fact-kentän sanamuotoa.

**`js/packs/oceania-saapumiset.js`, kohta `cairns` (saapumiskortin
kuvaus ja isoisän nosto):**

- Saapumiskortin kuvaus kertoo sukelluskokemuksesta riutalla
  ("korallipuutarhoja, sinisiä tähtiä, kilpikonna") ja mainii riutan
  näkyvän avaruuteen asti / olevan maailman suurin elävän rakentama
  rakennelma — SAMA fakta kuin maalehden AUS-Luonto-nostossa. En
  toistanut tätä faktapohjassani.
- Isoisän nosto vertaa isoisän aikaista laivurin pelkoa riutasta
  ("laivurin painajainen") nykyiseen ihmettelyyn — TUNNELMALLINEN
  vastapari, ei faktapohja. Osion 2 L1–L2-nostoni ovat asiapitoisia
  eivätkä toista tätä kehystä.

**`js/packs/oceania-valokuvat.js`, kohta `cairns` (olemassa olevat
valokuvavalinnat):**

- Tiedostot "Bicycles piled up outside a picture theatre in Cairns, ca.
  1937", "Rusty's Markets, Cairns...", "Esplanade Lagoon, Cairns, 2025",
  "Great Barrier Reef off Cairns coast...", "Esplanade, Cairns, 2015" ovat
  JO VALITTUJA kuvia tässä pelin osiossa (ei kulttuuri-kategoriat.js:ssä,
  vaan erillisessä valokuvataulussa) — kirjoittajan kannattaa VÄLTTÄÄ
  samojen tiedostojen käyttöä nostoissa jos mahdollista, koska "yksi
  tiedostonimi esiintyy kaupungissa vain kerran" -sääntö koskee koko
  kaupunkia, ei vain yhtä pakettia.
- Rusty's Marketsin selite ("tropiikin hedelmävalikoima, mango, papaija,
  ananas, vesimeloni") mainitsee SAMAN ilmiön kuin osion 3 Jakso 4:ni —
  jaksoni selittää ilmiön historiallisen alkuperän (1800-luvun
  kiinalaisviljelijät) kautta eikä toista valokuvatekstin sanamuotoa
  hedelmävalikoimasta, mutta kirjoittajan kannattaa TIETÄÄ päällekkäisyys
  ja tarkistaa lopullinen sanamuoto.
- Esplanade Lagoonin selite ("suolavesiallas tehtiin, koska merenranta on
  laajaa liejuista vuorovesitasankoa") on SAMA fakta kuin K2-nostoni ja
  Jakso 1:ni käyttävät — tämä on jo peliaineistossa oleva, hyvin
  dokumentoitu Cairns-fakta, joten toisto kolmessa eri kohdassa (kuva-
  paketti, K2, Jakso 1) on odotettavissa; kirjoittajan kannattaa
  varmistaa, ettei sanamuoto ole identtinen millekään kolmesta.

**Ei erillistä `OCEANIA_FACTS`-taulua tälle kaupungille löytynyt** —
tarkistin `js/packs/oceania-questions.js`:n rakenteen kokonaan, eikä
siellä ole Suva-mallin kaltaista erillistä `OCEANIA_FACTS`-objektia;
saapumiskortin teksti ja isoisän-repliikki tulevat sen sijaan
`oceania-saapumiset.js`:stä (käsitelty yllä).
