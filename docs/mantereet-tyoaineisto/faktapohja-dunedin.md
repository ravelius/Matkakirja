# Dunedin — faktakoostaja, uusi kaupunkilehti (Oseanian lauta)

Lauta-id `oceania`, kaupunki-id `dunedin`, maa NZL, en-Wikipedia "Dunedin" ellei
toisin mainita. Kaikki tiedot haettu en-Wikipediasta **24.8.2026** (`action=raw`,
`NODE_USE_ENV_PROXY=1`; jokainen haettu otsikko tarkistettu #REDIRECT-rivin ja
täsmennyssivun varalta — "Otago Museum" ohjautuu artikkeliin "Tūhura Otago
Museum" ja "The Octagon" on täsmennyssivu, oikea artikkeli on "The Octagon,
Dunedin"; "Royal Albatross Centre" ei ollut oma artikkeli, tieto haettiin
artikkelista "Taiaroa Head" sen sijaan; "Scarfie flat" ei ollut oma artikkeli,
opiskelijalempinimi löytyi pääartikkelista. Useat haut ja Commons-kategoria-
tarkistukset osuivat 429-rajoitukseen; odotin kasvavan viiveen ja yritin
uudelleen resepti-ohjeen mukaisesti). Malli ja mitat luettu tiedostoista
`docs/aasia-tyoaineisto/lehtityo-resepti.md` (SITOVA) ja
`docs/moduulit/kaupunkilehti.md`, sekä mallitiedostona
`docs/mantereet-tyoaineisto/faktapohja-christchurch.md` (sama lauta, sama
maa, sama putki, rakenne kopioitu siitä; luettu myös PÄÄLLEKKÄISYYDEN
VÄLTTÄMISEKSI — ks. osio 8, ei toistoa kāi tahusta, Eteläisistä Alpeista eikä
skotlantilaisperinnöstä). Luin myös `docs/mantereet-tyoaineisto/
spec-mantereet.md` (Oseania-osio ja kaikkia kolmea uutta mannerta koskevat
viisi linjausta) ja `js/packs/oceania-questions.js` (vienti
`OCEANIA_QUESTIONS`, kohta `dunedin`, viisi kysymystä: maa, nimen alkuperä,
perustaja 1848, kultaryntäys 1861, Otagon yliopisto 1869 — ks. osio 8 siitä,
miten päällekkäisyyksiä on vältetty). `OCEANIA_FACTS`-taulussa on jo kolme
dunedin-riviä (nimi/perustaminen, kultaryntäys, Otago Harbour) ja isoisän
repliikki, joita ei ole toistettu tässä faktapohjassa sanasta sanaan — ks.
osio 8.

**Tehtävän erityispiirre:** En kirjoittanut lehtitekstejä, en ladannut kuvia
enkä koskenut js/packs-tiedostoihin — kaikki alla on raaka-ainetta
kirjoittajalle ja riippumattomalle tarkistajalle.

**Sisältölinjaus (tehtävänanto + spec-mantereet.md + Raamattu pilari 3):**
kāi tahu (eteläisessä murteessa ei Ngāi Tahu vaan Kāi Tahu — ng muuttuu
k:ksi) kuvataan nykyisenä, elävänä kansana omalla nimellään; Dunedinin oma
paikallinen hallintoelin on Ōtākou rūnanga Otagon niemimaalla, ERI ELIN kuin
Christchurchin faktapohjan K4-nostossa käsitelty Te Rūnanga o Ngāi Tahu
(koko iwin kattoelin, toimisto Addingtonissa, Christchurch) — ks. osio 8.
Ōtākou-nimen suhde nimeen Otago on oma faktakokonaisuutensa, ei pelkkä
sivuhuomio. Isoisän matkan vuosi 1873 osuu poikkeuksellisen tarkasti kolmeen
erilliseen Dunedin-tapahtumaan samana vuonna (First Churchin vihkiminen,
kahden pankin sulautuminen ja rautatien myynti maakunnalle) — ks. osio 8,
huomio 1, ja K3-nosto. Ei nykysotaa, ei nykypolitiikkaa.

---

## 1. Sivuehdotukset

Tehtävänanto salli 1–3 teemasivua. Käytin kaikki kolme: aineisto kantoi
kolme selvästi erillistä, päällekkäisyydetöntä teemaa (kaupungin
perustaminen ja isoisän-vuoden käänne, Otagon niemimaan luonto ja kāi tahun
Ōtākou, sekä opiskelija- ja musiikkikaupungin nykyilme), ja jokainen
tehtävänannon "mitä kaupungissa on NYT" -listan kohta löytää paikkansa
jommastakummasta teemasivusta tai kaupunkisivulta.

### Sivu A — id `kaupunki`, nimi "Dunedin"

**Johdanto (218 merkkiä):**

> Skotlantilaiset siirtolaiset rakensivat Dunedinin Edinburghin kuvaksi
> maailman toiselle laidalle 1848. Isoisän matkan aikoihin kultaryntäys oli
> juuri tehnyt kaupungista hetkeksi Uuden-Seelannin suurimman ja rikkaimman.

### Sivu B — teemasivu, ehdotettu id `luonto`, nimi "Otagon niemimaa"

**Perustelu valinnalle:** Tehtävänanto nimeää Otagon niemimaan
albatrossi- ja keltasilmäpingviinipesimät omana painopisteenään, ja
niemimaa kantaa myös Larnach Castlen ja kāi tahun Ōtākou-nimen — kaikki
samalla maantieteellisellä kärjellä. Vakioaihe `luonto` sopii tähän
suoraan, ja id säilyy vakioaiheena vaikka näkyvä nimi on täsmällisempi
(sama ratkaisu kuin Christchurchin H-sivulla, joka käyttää id:tä
`historia` näkyvällä nimellä "Maanjäristykset ja jälleenrakennus").

**Johdanto (201 merkkiä):**

> Otagon niemimaa on sammuneen tulivuoren jäänne, jonka kärjessä
> albatrossit pesivät ainoana paikkana maailman mantereilla. Kāi tahulle
> sama kärki on Ōtākou – nimi, josta koko maakunta on saanut nimensä.

### Sivu C — teemasivu, ehdotettu id `musiikki`, nimi "Jyrkkä katu, kova sointi"

**Perustelu valinnalle:** Tehtävänanto nimeää neljä erillistä "nyt"-kohdetta,
jotka eivät sovi luontosivulle eivätkä perustamishistoriaan: rautatieasema,
Baldwin Street, opiskelijakulttuuri ja sarjakuva/indie-musiikkiperintö.
Kaikki neljä ovat saman ilmiön eri puolia — pieni kaupunki, joka tekee
suurista asioista intohimolla omalla tavallaan, olipa kyse kadun
kaltevuudesta tai kitarasoundista. Vakioaihe `musiikki` sopii id:ksi, koska
Dunedin sound on aineiston vahvin yksittäinen lanka; näkyvä nimi kattaa
laajemman kokonaisuuden samalla id-uudelleenkäytön periaatteella kuin
sivulla B.

**Johdanto (202 merkkiä):**

> Maailman jyrkin katu, lähes valokuvatuin rautatieasema ja
> opiskelijakaupunki, joka synnytti oman musiikkilajinsa – Dunedin osaa
> tehdä pienestä suurta, olipa kyse kadun kaltevuudesta tai kitarasoundista.

---

## 2. Kaksitoista nostoehdotusta (4 × 3 sivua)

### Sivu `kaupunki` — 4 nostoa

**Nosto K1 — "Uusi Edinburgh eteläisellä pallonpuoliskolla" (560 merkkiä)**

> Skotlannin vapaakirkon maallikkojärjestö perusti Dunedinin 1848 Otago
> Harbourin perukkaan – nimi Dùn Èideann on gaelinkielinen muoto sanasta
> Edinburgh. Kaupunginmittaaja Charles Kettle sai tehtäväkseen jäljitellä
> emokaupunkia ja piirsi komean, "romanttisen" katuverkon, jonka rakentajat
> sitten taistelivat läpi Dunedinin mäkisen maaston. Maallisena johtajana
> toimi Napoleonin sotien veteraani William Cargill, hengellisenä pastori
> Thomas Burns – runoilija Robert Burnsin veljenpoika. 1850-luvun loppuun
> mennessä kaupunkiin oli muuttanut jo noin 12 000 skottia.

Faktat ja lähteet:
- Free Church of Scotland -kirkon Lay Association (Otago Association)
  perusti Dunedinin 1848 Otago Harbourin perukkaan pääkaupungikseen. —
  en-Wikipedia "Dunedin"
- Nimi tulee gaelinkielisestä Dùn Èideann-sanasta, Edinburghin skottilainen
  nimi. — en-Wikipedia "Dunedin"
- Kaupunginmittaaja Charles Kettle sai ohjeeksi jäljitellä Edinburghin
  piirteitä ja tuotti näyttävän, "romanttisen" kaupunkisuunnitelman;
  rakentajat kamppailivat sen toteuttamisessa haastavaa maastoa vasten. —
  en-Wikipedia "Dunedin"
- Kapteeni William Cargill (Napoleonin sotien veteraani) toimi siirtokunnan
  maallisena johtajana, pastori Thomas Burns (runoilija Robert Burnsin
  veljenpoika) hengellisenä johtajana. — en-Wikipedia "Dunedin"
- 1850-luvun loppuun mennessä noin 12 000 skottia oli muuttanut Dunediniin,
  monet teollistuneilta Lowlandsin alueilta. — en-Wikipedia "Dunedin"

**Nosto K2 — "Kulta teki köyhästä siirtokunnasta maan rikkaimman" (526 merkkiä)**

> Vuonna 1861 löytyi kultaa Gabriel's Gullystä lounaassa, ja väki tulvi
> Dunediniin niin nopeasti, että kaupungista tuli 1865 väkiluvultaan
> Uuden-Seelannin ensimmäinen. Kultarahat rakensivat myös pysyvämpää: 1869
> perustettiin Otagon yliopisto, maan ensimmäinen, ja 1875 dunedinilainen
> James Mills perusti Union-laivayhtiön, josta kasvoi eteläisen
> pallonpuoliskon suurin varustamo. Vuoteen 1874 mennessä Dunedin
> lähiöineen oli ohittanut Aucklandin asukasluvultaan – 29 832 vastaan
> 27 840 – ja oli hetken koko maan suurin kaupunki.

Faktat ja lähteet:
- Kullan löytyminen Gabriel's Gullystä 1861 johti nopeaan väestönkasvuun;
  Dunedinistä tuli 1865 Uuden-Seelannin väkirikkain kaupunki. —
  en-Wikipedia "Dunedin"
- Otagon yliopisto perustettiin 1869, maan vanhin yliopisto. —
  en-Wikipedia "Dunedin" / "University of Otago"
- Vuoteen 1874 mennessä Dunedin lähiöineen oli maan väkirikkain kaupunki,
  29 832 asukasta Aucklandin 27 840:tä vastaan. — en-Wikipedia "Dunedin"
  (viittaa: Michael King, The Penguin History of New Zealand, 2003, s. 209)
- Union-laivayhtiö perustettiin Dunedinissa 1875 James Millsin toimesta
  skotlantilaisen laivanrakentaja Peter Dennyn tuella; siitä kasvoi
  eteläisen pallonpuoliskon suurin laivayhtiö. — en-Wikipedia "Dunedin"

**Nosto K3 — "Vuosi, jolloin kaikki valmistui yhtä aikaa" (568 merkkiä)**

> 1873 kolme erillistä Dunedin-hanketta saapui maaliin samana vuonna.
> Marraskuussa vihittiin käyttöön First Church of Otago – viisi vuotta
> perustuskiven laskemisesta, torni kohoaa 56 metriin. Huhtikuussa
> kaupungin oma Bank of Otago sulautui vasta perustettuun National Bank of
> New Zealandiin, jonka pääkonttori niin ikään toimi Dunedinista käsin.
> Ja samana keväänä Dunedin & Port Chalmers -rautatie – kaupungin
> ensimmäinen – myytiin Otagon maakuntaneuvostolle 187 106 punnalla.
> Isoisän matkan vuonna Dunedin ei ollut enää nuori siirtokunta vaan
> vakiintunut suurkaupunki.

Faktat ja lähteet:
- First Church of Otago vihittiin virallisesti käyttöön 23.11.1873;
  perustuskivi laskettiin toukokuussa 1868 Thomas Burnsin toimesta,
  arkkitehtina Robert Lawson; torni ja huippu nousevat 56,4 metriin. —
  en-Wikipedia "First Church of Otago"
- Bank of Otago (avattu 1863, 12 sivukonttoria) sulautui 1873 uuteen
  National Bank of New Zealandiin, joka niin ikään toimi Dunedinista
  käsin ennen laajentumistaan koko maahan. — en-Wikipedia "Dunedin"
- Dunedin & Port Chalmers -rautatie (juhlallinen avaus 31.12.1872) myytiin
  Otagon maakuntaneuvostolle 9.4.1873 hintaan 187 106 puntaa. —
  en-Wikipedia "Dunedin railway station"

**Nosto K4 — "Museo joka perusti itsensä 50-vuotisjuhliin" (492 merkkiä)**

> Kun Dunedin täytti 50 vuotta 1898, perustivat kaupungin varhaiset
> uudisasukkaat oman museonsa juhlan kunniaksi – tuloksena syntyi Toitū
> Otago Settlers Museum, joka on tänään maan vanhin historiamuseo. Alkuun
> se keskittyi vain vuosien 1848–1861 pioneereihin, mutta laajeni
> myöhemmin kattamaan kaikki tulokkaat. Museon kuljetussiipi on entinen
> vuoden 1939 art deco -linja-autoasema, jossa nyt seisovat kaupungin
> vanhat raitiovaunut ja veturit. Dunedinin kaupunki otti museon
> omistukseensa 1991.

Faktat ja lähteet:
- Toitū Otago Settlers Museum perustettiin 1898, Otagon skotlantilaisen
  siirtokunnan 50-vuotisjuhlan kunniaksi, Otago Early Settlers'
  Associationin toimesta; se on Uuden-Seelannin vanhin historiamuseo. —
  en-Wikipedia "Toitū Otago Settlers Museum"
- Museo keskittyi alun perin vain 1848–1861 saapuneisiin pioneereihin,
  laajeni myöhemmin kattamaan myös myöhemmät tulokkaat, jolloin "early"
  poistui nimestä. — en-Wikipedia "Toitū Otago Settlers Museum"
- Kuljetussiipi on entinen New Zealand Railways Road Servicesin
  linja-autoasema, art deco -tyyliä, suunnitellut James Hodge White 1939.
  — en-Wikipedia "Toitū Otago Settlers Museum"
- Dunedinin kaupunginvaltuusto otti museon omistukseensa ja hoitoonsa
  1991. — en-Wikipedia "Toitū Otago Settlers Museum"

### Teemasivu `luonto` (Otagon niemimaa) — 4 nostoa

**Nosto L1 — "Nimi joka kirjoitettiin väärin ja jäi pysyvästi" (639 merkkiä)**

> Ōtākou on kāi tahun oman rūnangan koti tänäkin päivänä – eri hallintoelin
> kuin iwin kattojärjestö Christchurchissä. Ennen maorin kirjoitusasun
> vakiintumista 1840-luvulla nimi kirjoitettiin ääntämyksen mukaan "Otago"
> – ja juuri se muoto jäi koko maakunnan nimeksi, vaikka sitä luullaan
> usein virheellisesti eurooppalaiseksi vääntymäksi. Syynä on eteläinen
> murre: ng-äänne on siinä sulautunut k:hon, joten Ngāi Tahu on siellä Kāi
> Tahu. Paikan eurooppalaishistoria alkoi Weller-veljesten 1831
> perustamasta valaanpyyntiasemasta, hetken yhdestä maan suurimmasta
> siirtokunnasta, kunnes se suljettiin 1840-luvulla valaskantojen
> hupenemisen myötä.

Faktat ja lähteet:
- Ōtākou on kāi tahun (Ngāi Tahu) Ōtākou-rūnangan nykyinen keskus ja
  perinteinen koti. — en-Wikipedia "Ōtākou"
- Ennen maorin kirjoitusasun vakiintumista 1840-luvulla nimi kirjoitettiin
  "Otago" paikallisen eteläisen murteen ääntämyksen mukaan; tämä
  esistandardoitu muoto omaksuttiin koko Otagon maakunnan nimeksi, ja se
  tulkitaan usein virheellisesti eurooppalaiseksi vääntymäksi Ōtākou-nimestä.
  — en-Wikipedia "Ōtākou"
- Eteläinen murre on menettänyt /ŋ/-äänteen ("ng"), joka on sulautunut
  k:hon esihistoriallisena aikana: Ngāi Tahu → Kāi Tahu; epästandardi
  g-kirjain eteläsaarelaisissa paikannimissä (esim. Otago vs. Ōtākou)
  heijastaa samaa murre-eroa. — en-Wikipedia "Ngāi Tahu"
- Weller-veljekset perustivat valaanpyyntiaseman Otagoon (nyk. Ōtākou) 1831;
  se oli hetken yksi Uuden-Seelannin suurimmista eurooppalaissiirtokunnista,
  mutta suljettiin 1840-luvulla, kun valaskannat oli pyydystetty lähes
  sukupuuttoon. — en-Wikipedia "Dunedin"

**Nosto L2 — "Kärki jonne albatrossit tulevat mantereelle" (499 merkkiä)**

> Taiaroa Head Otagon niemimaan kärjessä on maailman ainoa
> kuninkaanalbatrossien pesimäyhdyskunta, joka sijaitsee asutulla
> mantereella – kaikki muut lajin pesimäpaikat ovat syrjäisillä
> saarilla. Ensimmäinen muna löydettiin täältä 1919, mutta ensimmäisen
> poikasen selviytyminen lentokykyiseksi nähtiin vasta 1938, tutkija Lance
> Richdalen toimesta. Yli sadan linnun kanta on tulosta vuosikymmenten
> tarkkaa hoitotyötä: kissoja, hillereitä, näätiä ja lumikkoja pyydystetään
> jatkuvasti pois pesimäalueelta.

Faktat ja lähteet:
- Taiaroa Head on kotina yli sadan kuninkaanalbatrossin (northern royal
  albatross) yhdyskunnalle, joka perustettiin 1919 – ainoa lajin
  pesimäyhdyskunta asutulla mantereella. — en-Wikipedia "Taiaroa Head"
- Ensimmäinen muna löydettiin 1919, mutta ensimmäinen elävänä
  lentokykyiseksi selvinnyt poikanen nähtiin vasta 1938, ornitologi
  tohtori Lance Richdalen toimesta. — en-Wikipedia "Taiaroa Head"
- Kannan kasvu on seurausta tehostetusta hoidosta: petopyynti kissoille,
  hillereille, näädille ja lumikoille jatkuu edelleen. — en-Wikipedia
  "Taiaroa Head"

**Nosto L3 — "Maailman harvinaisin pingviini vetäytyy niemimaalta" (474 merkkiä)**

> Hoiho eli keltasilmäpingviini on IUCN:n listalla uhanalainen, ja Otagon
> niemimaalla sen kanta on romahtanut 75 prosenttia 1990-luvun
> puolivälistä – kehityssuunta ennakoi lajin katoamista niemimaalta
> kokonaan 20–40 vuoden sisällä. Syitä on useita: meren lämpeneminen,
> 2000-luvun puolivälin tautiepidemia joka tappoi lintuja suoraan, sekä
> kalastuksen ja saastumisen vaikutukset, joiden osuutta tutkijat pitävät
> mahdollisesti yhtä suurena tai suurempana kuin ilmastonmuutoksen.

Faktat ja lähteet:
- Hoiho (yellow-eyed penguin, Megadyptes antipodes) on IUCN:n listalla
  uhanalainen (Endangered). — en-Wikipedia "Yellow-eyed penguin"
- Otagon niemimaalla kanta on pudonnut 75 % 1990-luvun puolivälistä, ja
  väestökehitys ennakoi mahdollista alueellista sukupuuttoa niemimaalta
  seuraavan 20–40 vuoden aikana. — en-Wikipedia "Yellow-eyed penguin"
- 2000-luvun puolivälin tautiepidemia oli merkittävä tekijä laskussa;
  meren lämpenemisen vaikutusta tutkitaan yhä, ja ihmisen toiminta
  (kalastus, saastuminen) saattaa vaikuttaa yhtä paljon tai enemmän. —
  en-Wikipedia "Yellow-eyed penguin"

**Nosto L4 — "Uuden-Seelannin ainoa linna" (586 merkkiä)**

> William Larnach osti maan 1870 ja aloitti rakennustyöt 1871 – sama
> arkkitehti Robert Lawson joka suunnitteli First Churchin loihti tällä
> kertaa goottilaisen linnan Otagon niemimaan harjanteelle. Materiaaleja
> tuotiin ympäri maailmaa: Oamarun kiveä, venetsialaista lasia,
> italialaista marmoria. Paikallislehti ristii sen "linnaksi" joulukuussa
> 1874, pian kun Larnach vaimoineen muutti sisään; 1887 valmistui vielä
> juhlasali tyttären 21-vuotislahjaksi. Larnach teki itsemurhan
> parlamentin talossa 1898, ja perhe myi kartanon 1906 – siitä lähtien
> rakennus on tunnettu myös aavetarinoistaan.

Faktat ja lähteet:
- William Larnach osti maan 1870, rakennustyöt alkoivat 1871; arkkitehtina
  Robert Lawson, tyylinä goottilainen revival. — en-Wikipedia "Larnach
  Castle"
- Materiaaleja tuotiin ympäri maailmaa (mm. Oamarun kivi, 1875 tuotu
  venetsialainen lasi, italialainen marmori); juhlasali (3000 neliöjalkaa)
  valmistui 1887 tyttären Katen 21-vuotislahjaksi. — en-Wikipedia
  "Larnach Castle"
- Paikallislehdistö nimesi rakennuksen "linnaksi" 8.12.1874, muutaman
  päivän kuluttua siitä kun William ja Eliza Larnach muuttivat sisään. —
  en-Wikipedia "Larnach Castle"
- Larnach teki itsemurhan Uuden-Seelannin parlamenttitalossa lokakuussa
  1898; perhe myi kartanon 1906 pitkän testamenttiriidan jälkeen. —
  en-Wikipedia "Larnach Castle"
- Rakennus tunnetaan yhtenä maan aavemaisimmista rakennuksista. —
  en-Wikipedia "Larnach Castle"

### Teemasivu `musiikki` (Jyrkkä katu, kova sointi) — 4 nostoa

**Nosto M1 — "Gingerbread Georgen" asema, joka on jo kertaalleen myyty" (552 merkkiä)**

> Dunedinin komea, flaamilaistyylinen rautatieasema avattiin 1906,
> arkkitehtinaan George Troup – lempinimeltään "Gingerbread George" juuri
> tämän rakennuksen ansiosta. Lattiassa on lähes 750 000 Minton-laattaa, ja
> paikalliset pitävät sitä maan valokuvatuimpana rakennuksena. Mutta
> radalla on pidempi historia: ensimmäinen, vaatimattomampi asema samalla
> paikalla avautui jo 1872, ja koko rata myytiin maakunnalle 1873 – samana
> vuonna kuin First Church vihittiin. Nykyään asemalta lähtee lähinnä
> turistijunia; parhaimmillaan täältä kulki 100 junaa päivässä.

Faktat ja lähteet:
- Nykyinen asemarakennus avattiin 12.11.1906, arkkitehtina George Troup
  flaamilaisrenessanssin tyyliin; rakennus toi Troupille lempinimen
  "Gingerbread George". — en-Wikipedia "Dunedin railway station"
- Lattiassa on lähes 750 000 Minton-laattaa; paikalliset pitävät asemaa
  Uuden-Seelannin valokuvatuimpana ja eteläisen pallonpuoliskon toiseksi
  valokuvatuimpana rakennuksena Sydneyn oopperatalon jälkeen. —
  en-Wikipedia "Dunedin railway station"
- Ensimmäinen asema samalla radalla avattiin 1872 Port Chalmersin linjalle;
  koko rata myytiin Otagon maakuntaneuvostolle 9.4.1873. — en-Wikipedia
  "Dunedin railway station"
- Parhaimmillaan asemalla kulki jopa 100 junaa päivässä; nykyään
  säännöllistä henkilöliikennettä ei ole, vain turistijunia. —
  en-Wikipedia "Dunedin railway station"

**Nosto M2 — "Katu joka menetti ja voitti maailmanennätyksensä" (530 merkkiä)**

> Baldwin Street tunnustettiin maailman jyrkimmäksi kaduksi jo 1987,
> lähetystoimittaja Jim Mora kaksivuotisen kampanjan tuloksena. Heinäkuussa
> 2019 titteli siirtyi hetkeksi walesilaiselle Ffordd Pen Llechille – kunnes
> Guinness huhtikuussa 2020 muutti mittaustapaa keskilinjan mukaiseksi ja
> palautti tittelin Dunedinille. Kadun jyrkin kohta nousee suhteessa 1:2,86.
> Kesäisin kadulla juostaan vuodesta 1988 asti Gutbuster-nimistä
> kuntoilutapahtumaa, ja vuodesta 2002 kadulta on vieritetty alamäkeen yli
> 30 000 hyväntekeväisyysjaffaa.

Faktat ja lähteet:
- Baldwin Street tunnustettiin maailman jyrkimmäksi kaduksi 1987 Guinness
  Book of Recordsin toimesta, lähetystoimittaja Jim Mora (en-Wikipedia
  "Jim Mora (broadcaster)") kaksivuotisen
  kampanjan jälkeen; kadun jyrkin kohta on suhteessa 1:2,86 (35 %). —
  en-Wikipedia "Baldwin Street"
- 16.7.2019 titteli siirtyi walesilaiselle Ffordd Pen Llechille; 8.4.2020
  Guinness muutti mittaustavan keskilinjan kaltevuuteen perustuvaksi, mikä
  palautti tittelin Baldwin Streetille (34,8 % vs. 28,6 %). — en-Wikipedia
  "Baldwin Street"
- Vuosittainen Baldwin Street Gutbuster -juoksutapahtuma on järjestetty
  joka kesä vuodesta 1988. — en-Wikipedia "Baldwin Street"
- Vuodesta 2002 kadulta on hyväntekeväisyystapahtumana vieritetty
  alamäkeen yli 30 000 jaffaa. — en-Wikipedia "Baldwin Street"

**Nosto M3 — "Opiskelijakaupunki jonka UNESCO nimesi kirjallisuudelle" (548 merkkiä)**

> Joka viides dunedinilainen on 15–24-vuotias – 21,6 prosenttia
> väestöstä vuoden 2006 väestönlaskennassa, kun koko maan keskiarvo oli
> 14,2 prosenttia. Paikalliset kutsuvat Otagon yliopiston opiskelijoita
> "Scarfieiksi", ja opiskelijaelämä muovaa kaupungin katukuvaa yliopiston
> perustamisvuodesta 1869 asti. Vuonna 2014 UNESCO nimesi Dunedinin
> kirjallisuuden luovaksi kaupungiksi – ensimmäisenä Uuden-Seelannin
> kaupunkina koko maailmanlaajuisessa Creative Cities -verkostossa, joka
> tunnustaa myös musiikin, muotoilun ja elokuvan kaltaisia luovia aloja.

Faktat ja lähteet:
- 21,6 % Dunedinin väestöstä oli 15–24-vuotiaita vuoden 2006
  väestönlaskennassa, kun koko maan keskiarvo oli 14,2 %. — en-Wikipedia
  "Dunedin"
- Ei-opiskelijat kutsuvat opiskelijoita nimellä "Scarfies". — en-Wikipedia
  "Dunedin"
- Dunedin nimettiin UNESCOn kirjallisuuden luovaksi kaupungiksi (City of
  Literature) 2014, ensimmäisenä Uuden-Seelannin kaupunkina verkostossa. —
  en-Wikipedia "Dunedin"

**Nosto M4 — "Bändi joka nauhoitti itsensä indie-rockin kartalle" (594 merkkiä)**

> 1980-luvun alussa pieni Dunedin synnytti oman musiikkilajinsa: Flying Nun
> -levy-yhtiön ympärille kasvoi "Dunedin sound", jonka helisevä kitarasointi
> vaikutti myöhemmin sekä grungeen että indie-rockiin maailmanlaajuisesti.
> Muusikko Chris Knox nauhoitti suurimman osan Flying Nunin varhaisista
> singleistä omalla 4-raitanauhurillaan – ja oli samalla ammatiltaan myös
> sarjakuvapiirtäjä. Sarjakuvaperintö ulottuu paljon pidemmälle: kaupungissa
> syntyi 1891 David Low, josta kasvoi aikansa kuuluisin poliittinen
> pilapiirtäjä, tunnettu Lontoon-lehdissä julkaistuista Hitler- ja
> Mussolini-pilakuvistaan.

Faktat ja lähteet:
- "Dunedin sound" syntyi 1980-luvun alussa Flying Nun Recordsin ympärille;
  liikkeen katsotaan olleen mukana perustamassa indie rock -genreä, ja se
  vaikutti myöhemmin grungeen, indieen ja moderniin vaihtoehtorockiin. —
  en-Wikipedia "Dunedin" / "Dunedin sound"
- Chris Knox nauhoitti 4-raitanauhurillaan suurimman osan Flying Nun
  -levy-yhtiön varhaisista singleistä; hän oli ammatiltaan muusikko,
  sarjakuvapiirtäjä ja elokuva-arvostelija. — en-Wikipedia "Chris Knox"
- David Low syntyi Dunedinissä 1891, julkaisi ensimmäisen pilakuvansa jo
  11-vuotiaana 1902, ja työskenteli myöhemmin Lontoossa poliittisena
  pilapiirtäjänä, joka satirisoi mm. Hitleriä, Mussolinia ja Stalinia. —
  en-Wikipedia "David Low (cartoonist)"

---

## 3. Viisi jaksoehdotusta matkaoppaaseen

Faktat on valittu niin, etteivät ne toista osion 2 nostoja tai
kulttuurivisan vastauksia sanasta sanaan.

**Jakso 1 — "Perille ja liikkeelle"**

Dunedin Airport sijaitsee Momonan kylässä noin puolen tunnin ajomatkan
päässä keskustasta ja avattiin 1962; se palveli lähes 904 000 matkustajaa
2024. Rautateitse kaupunkiin ei enää pääse säännöllisillä
henkilöjunilla – ainoastaan turistijunilla – mutta kaupungin mäkinen
maasto tuntuu heti asemalta kävellessä: melkein joka suuntaan Octagonilta
nousee jyrkkä katu.

Faktat ja lähteet:
- Dunedin Airport sijaitsee Momonassa, avattiin 1962; matkustajamäärä 2024
  oli 903 396. — en-Wikipedia "Dunedin Airport"
- Säännöllistä henkilöjunaliikennettä ei enää ole; asemalla toimivat vain
  Dunedin Railwaysin turistijunat. — en-Wikipedia "Dunedin railway
  station"

**Jakso 2 — Alueen rakenne**

Koko Dunedin lepää sammuneen tulivuoren päällä: 16–10 miljoonaa vuotta
sitten purkautunut kilpitulivuori ulottui alun perin kaupungista aina
Aramoanaan asti, ja Otago Harbour täyttää nyt tulivuoren vanhimman,
eniten kuluneen osan. Kaupunkia ympäröivä kukkularengas – Mount Cargill,
Flagstaff, Saddle Hill, Signal Hill – ja koko Otagon niemimaa ovat kaikki
saman tulivuoren jäänteitä.

Faktat ja lähteet:
- Dunedin Volcano oli monipurkauspaikkainen kilpitulivuori, aktiivinen
  16–10 miljoonaa vuotta sitten; ulottui alun perin nykyisestä Dunedinista
  Aramoanaan asti, noin 25 km. — en-Wikipedia "Dunedin Volcano"
- Otago Harbour täyttää tulivuoren vanhimmat, eniten eroosion kuluttamat
  osat; Mount Cargill, Flagstaff, Saddle Hill, Signal Hill ja Otagon
  niemimaa ovat tulivuoren jäänteitä. — en-Wikipedia "Dunedin Volcano" /
  "Dunedin"

**Jakso 3 — Arjen ilmiö: puutarha nimeltä Lan Yuan**

Keskustan reunalla, Toitū-museon ja rautatieaseman kupeessa, kukoistaa Lan
Yuan – Uuden-Seelannin ainoa aito kiinalainen puutarha ja yksi vain
kolmesta koko Kiinan ulkopuolella (Portlandin ja Vancouverin ohella).
Puutarha esivalmistettiin Shanghaissa ja purettiin sitten uudelleen
koottavaksi Dunediniin 2008. Se on kunnianosoitus kaupungin
kiinalaisyhteisölle, joka juontaa juurensa jo 1860-luvun kultaryntäykseen
ja on maan vanhin.

Faktat ja lähteet:
- Dunedin Chinese Garden (Lan Yuan) on Uuden-Seelannin ainoa aito
  kiinalainen puutarha ja yksi vain kolmesta koko Kiinan ulkopuolella
  (Portland, USA ja Vancouver, Kanada mukaan lukien). — en-Wikipedia
  "Dunedin Chinese Garden"
- Puutarha suunniteltiin ja esivalmistettiin Shanghaissa, purettiin ja
  koottiin uudelleen Dunedinissa shanghailaisten käsityöläisten avulla;
  avattiin 2008 (rakentaminen alkoi 1998, kustannus 7 miljoonaa NZD). —
  en-Wikipedia "Dunedin Chinese Garden"
- Kantonilaisia asettui Dunediniin jo 1860-luvun kultaryntäyksen aikaan,
  noin 15 vuotta kaupungin perustamisen jälkeen; Dunedinissä on maan
  vanhin kiinalaisyhteisö, ja yli 2 % väestöstä on kiinalaista syntyperää.
  — en-Wikipedia "Dunedin Chinese Garden" / "Dunedin"

**Jakso 4 — Historian käännekohta: "the drift north"**

Vuoteen 1900 mennessä Dunedin ei enää ollut maan suurin kaupunki –
vaikutusvalta ja kasvu olivat siirtyneet pohjoisemmas, ilmiö jota
kutsuttiin "the drift northiksi". Kaupunki putosi lopulta neljänneksi
pääkeskukseksi Aucklandin, Wellingtonin ja Christchurchin jälkeen. Vasta
1990-luvulla Dunedin keksi itsensä uudelleen "perintökaupunkina" ja
kunnosti viktoriaanistyyliset pääkatunsa entiseen loistoonsa.

Faktat ja lähteet:
- Vuoteen 1900 mennessä Dunedin ei enää ollut maan suurin kaupunki;
  vaikutusvalta ja toiminta siirtyivät pohjoisemmas ("the drift north"),
  suuntaus joka jatkui suuren osan 1900-lukua. — en-Wikipedia "Dunedin"
- 1990-luvulla väestökato tasaantui ja Dunedin loi itselleen uuden
  "perintökaupungin" identiteetin, pääkatujen tultua kunnostetuiksi
  viktoriaanistyyliin. — en-Wikipedia "Dunedin"

**Jakso 5 — Milloin kannattaa tulla**

Dunedinillä on lauhkea merellinen ilmasto, jossa kesät ovat leudot ja
talvet viileät mutta harvoin ankarat – pakkasöitä on keskimäärin 49
vuodessa, selvästi vähemmän kuin muualla Eteläsaarella. Sadetta on
vähän suhteessa muihin Uuden-Seelannin kaupunkeihin, mutta se tulee usein
tihkuna: kaupunki on yksi maan pilvisimmistä, silti aurinkoa paistaa noin
1 850 tuntia vuodessa. Ajoittainen luoteinen föhntuuli voi tuoda äkillisiä
lämpöpiikkejä keskelle muuten viileää säätä.

Faktat ja lähteet:
- Köppen-luokka: mereinen ilmasto (oceanic climate); leudot kesät, viileät
  talvet; noin 49 pakkasyötä vuodessa, vähemmän kuin useimmilla muilla
  Eteläsaaren paikkakunnilla. — en-Wikipedia "Dunedin" (Climate-osio)
- Sademäärä 600–750 mm vuodessa, suhteellisen vähän muihin Uuden-Seelannin
  kaupunkeihin verrattuna, mutta sade on usein tihkua; noin 1 850
  aurinkotuntia vuodessa, yksi maan pilvisimmistä suurista keskuksista. —
  en-Wikipedia "Dunedin" (Climate-osio)
- Ajoittainen lämmin ja kuiva luoteistuuli (föhn-ilmiö) tuo äkillisiä
  lämpöpiikkejä. — en-Wikipedia "Dunedin" (Climate-osio)
- **HUOM:** samoin kuin muissa tämän sarjan kaupungeissa, yllä olevat
  luvut ovat en-Wikipedian Climate-osiosta EIVÄTKÄ ole sama asia kuin
  pelin `saatiedot.js`-riville tarvittava ERA5 1991–2020 -normaali (vaikka
  Wikipedian taulukko itsekin ilmoittaa olevansa "1991–2020 normals").
  Tarkat kuukausinormaalit haetaan kirjoitusvaiheessa
  `tools/hae-saanormaalit.mjs`-työkalulla.

---

## 4. Kahdeksan kohdekartan kohdetta (+ vertailupiste)

Koordinaatit poimittu Wikipedian `action=query&prop=coordinates`
-rajapinnasta. Etäisyydet ja suunnat OMIA LASKELMIANI koordinaattieroista
(asteet × 111 km, pituusasteille kerrottu cos(45,874°) ≈ 0,696),
tarkistettu Node-skriptillä — sama menetelmä kuin
faktapohja-christchurch.md:ssä ja faktapohja-adelaide.md:ssä. **HUOM
kirjoittajalle:** ensimmäisellä yrityksellä skriptini pohjoinen/etelä-suunta
oli väärinpäin merkkivirheen takia (tarkistin sen First Churchin kohdalla,
jonka Wikipedia-artikkeli sanoo suoraan sijaitsevan "100 metriä
kaupunkikeskuksesta etelään" — ensimmäinen laskelmani väitti pohjoista).
Alla olevat suunnat on korjattu ja tarkistettu tätä ankkuria vasten.

**Vertailupiste on The Octagon, Dunedinin kaupunkisuunnitelman
historiallinen keskus** (spec-mantereet.md sääntö 4: kartan keskusta
valitaan historiallisen ytimen mukaan, ei hallinnollisen
koordinaattipisteen). Octagon on Dunedinissä erityisen selkeä valinta:
kahdeksankulmainen aukio on koko Charles Kettlen 1846 kaupunkisuunnitelman
risteyskohta, josta pääkadut George Street ja Princes Street haarautuvat,
ja se on Wikipedian oma karttamerkintä "City Centre" kaupungin
infobox-kartassa.

| # | Nimi | Koordinaatit (desimaali) | Lähdeartikkeli | Etäisyys/suunta vertailupisteestä |
|---|---|---|---|---|
| 1 | The Octagon (vertailupiste) | 45,87417°S 170,50361°I | "The Octagon, Dunedin" | (vertailupiste) |
| 2 | Dunedin railway station | 45,87528°S 170,50889°I | "Dunedin railway station" | ~0,43 km itään |
| 3 | First Church of Otago | 45,87602°S 170,50475°I | "First Church of Otago" | ~0,22 km kaakkoon |
| 4 | Toitū Otago Settlers Museum | 45,87752°S 170,50580°I | "Toitū Otago Settlers Museum" | ~0,41 km kaakkoon |
| 5 | Speight's Brewery | 45,87637°S 170,49996°I | "Speight's" | ~0,37 km lounaaseen |
| 6 | University of Otago (Registry Building / Clocktower) | 45,86556°S 170,51389°I | "University of Otago" | ~1,24 km koilliseen |
| 7 | Baldwin Street | 45,84944°S 170,53472°I | "Baldwin Street" | ~3,65 km koilliseen |
| 8 | Larnach Castle | 45,86166°S 170,62721°I | "Larnach Castle" | ~9,65 km itään |
| 9 | Taiaroa Head (Royal Albatross Centre) | 45,77500°S 170,72778°I | "Taiaroa Head" | ~20,53 km koilliseen |

Kahdeksan varsinaista kohdetta (rivit 2–9) täyttää pyydetyn määrän
vertailupisteen (rivi 1) lisäksi.

**Huomio kartoittajalle: kohteet hajaantuvat paljon enemmän kuin
Christchurchissä.** Christchurchin faktapohjan kahdeksan kohdetta olivat
0,05–3,14 km säteellä keskustasta. Dunedinissä viisi kohdetta klusteroituu
tiiviisti keskustaan (0,22–1,24 km), mutta loput kolme – Baldwin Street,
Larnach Castle ja Taiaroa Head – ovat todellisia etäisyyksiä Otagon
niemimaalla ja North East Valleyssa, eivät valintavirheitä: nämä KOLME
kohdetta ovat samalla tehtävänannon eksplisiittisesti nimeämiä
painopisteitä (Baldwin Street, Larnach Castle, Otagon niemimaan
albatrossi/pingviinipesimät), joten niitä ei voi jättää pois
täyttämättä tehtävänantoa. Kaupunkilehti.md sallii kartan olevan
zoomattava ja kohteita "entistä enemmän per kaupunki" — suosittelen
kirjoittajalle/kartoittajalle harkitsemaan, tarvitseeko Otagon niemimaan
kolme kaukaisinta kohdetta oman zoomatun osa-alueensa kartalla vai
riittääkö laajempi peruskuva. Sama ratkaisu tehtiin konseptina jo
Christchurchin faktapohjassa Lytteltonin/Ōnukun kohdalla, joskin siellä ne
jätettiin PÄÄTAULUKON ULKOPUOLELLE — tässä ne ovat taulukossa SISÄLLÄ, koska
tehtävänanto nimeää ne eksplisiittisesti kartalle kuuluviksi painopisteiksi
eikä vain mainittaviksi taustatiedoiksi.

---

## 5. Kuva-aiheet (Commons-kategoriat)

Kategoriat tarkistettu OLEMASSA OLEVIKSI JA KUVIA SISÄLTÄVIKSI Commonsin
`action=query&prop=categoryinfo`-kutsulla (ja `list=search`-haulla niille,
joiden ensimmäinen arvattu nimi ei osunut) 24.8.2026 — pelkkä
olemassaolo- ja kuvamäärätarkistus, SISÄLTÖÄ EI ole silmäilty, se on
kirjoittajan työ kuvasääntöjen mukaisesti. Commons-haku osui
429-rajoitukseen useaan kertaan; odotin ja yritin uudelleen resepti
mukaisesti. **Kolme arvattua kategorianimeä ei osunut suoraan** (ks. alla
kussakin kohdassa) — resepti varoittaa juuri tästä, ja tarkistus kannatti:
"Category:Dunedin railway station" piti korjata muotoon "Category:Dunedin
Railway Station" (isot alkukirjaimet), "Category:Toitu Otago Settlers
Museum" tarvitsi pitkän ū-kirjaimen, ja "Category:Speights Brewery"
tarvitsi heittomerkin (Speight's).

**Avauskuvat (3):**
1. `Category:Dunedin` (34 kuvaa) — yleinen kaupunkikuva tai siluetti.
2. `Category:The Octagon, Dunedin` (37 kuvaa) — kaupungin ydin, Town Hall
   ja katedraali.
3. `Category:Otago Harbour` (103 kuvaa) — satama ja niemimaa.

**Kansikuvat (3, LAAJOJA YLEISKUVIA — ei yksityiskohtia):**
1. `Category:Dunedin` — kaupungin siluetti tai laaja näkymä kukkulalta
   (esim. Signal Hill -tyyppinen kuvakulma; erillistä
   "Category:Signal Hill (New Zealand)" -kategoriaa EI ole olemassa,
   TARKISTETTU — kuva pitää hakea `Category:Dunedin`-yleiskategoriasta
   kuvatekstin perusteella).
2. `Category:Dunedin Railway Station` (154 kuvaa, isot alkukirjaimet
   TARKISTETTU) — rakennuksen ulkoasu laajana kuvana.
3. `Category:Otago Peninsula` (119 kuvaa) — niemimaan maisema.

**Nosto-/jaksokuvat, sivuittain:**

*Kaupunki:*
- `Category:The Octagon, Dunedin` tai `Category:Statue of Robert Burns,
  Dunedin` (17 kuvaa) (K1 — perustaminen)
- `Category:University of Otago Registry Building` (39 kuvaa, TARKISTA:
  "Category:University of Otago Clocktower Building" EI ole olemassa
  tällä nimellä) (K2 — kultaryntäys/yliopisto)
- `Category:First Church of Otago` (37 kuvaa) + `Category:Dunedin
  Railway Station` (K3 — 1873-nosto, kaksi rakennusta samassa nostossa)
- `Category:Toitū Otago Settlers Museum` (44 kuvaa) (K4)

*Otagon niemimaa (luonto):*
- `Category:Otakou` (5 kuvaa — pieni kategoria, TARKISTA riittääkö vai
  tarvitaanko Flickr-täydennystä) (L1 — Ōtākou)
- `Category:Taiaroa Head` (21 kuvaa) tai `Category:Diomedea sanfordi`
  (kuninkaanalbatrossin tieteellinen nimi, 21 kuvaa) (L2 — albatrossi)
- `Category:Megadyptes antipodes` (79 kuvaa, hoihon tieteellinen nimi —
  HUOM: EI "Category:Yellow-eyed penguin", se ei ole olemassa suoraan
  tällä nimellä) (L3 — pingviini)
- `Category:Larnach Castle` (73 kuvaa) (L4)

*Jyrkkä katu, kova sointi (musiikki):*
- `Category:Dunedin Railway Station` (M1)
- `Category:Baldwin Street, Dunedin` (43 kuvaa, HUOM pilkku nimessä —
  pelkkä "Category:Baldwin Street" EI ole olemassa) (M2)
- `Category:University of Otago` (92 kuvaa) tai `Category:The Octagon,
  Dunedin` (opiskelija-/kahvilakulttuuri) (M3)
- `Category:The Chills` (9 kuvaa) (yhtye) ja `Category:David Low`
  (10 kuvaa, EI "Category:David Low (cartoonist)" — se on olemassa mutta
  tyhjä) (M4 — HUOM: `Category:Dunedin Sound` ja `Category:Flying Nun
  Records` ovat OLEMASSA MUTTA TYHJIÄ (0 kuvaa) — kirjoittajan on
  käytettävä joko yhtyekohtaisia kategorioita kuten The Chills, tai
  haettava täydentävästi Flickristä reseptin ohjeen mukaisesti; Chris
  Knoxille en löytänyt omaa Commons-kategoriaa lainkaan)

*Kohdekartta (täydentäviksi, ei nostoa varten):*
- `Category:Speight's Brewery` (16 kuvaa)
- `Category:Dunedin Chinese Garden` (51 kuvaa) — jos kirjoittaja haluaa
  lisätä sen kohdekarttaan yhdeksänneksi/kymmenenneksi pisteeksi (ks.
  osio 4 huomio zoomattavuudesta)

*Matkaoppaan jaksot:*
- `Category:Dunedin Chinese Garden` (jakso 3)
- `Category:Dunedin Volcano` (3 kuvaa, mm. "File:Organ pipes columnar
  joints Dunedin.jpg" — tulivuoren basalttipatsaat, osuvin jakso 2:n
  geologiatekstiin; tarkistettu categoryinfo + categorymembers 24.8.2026)
- `Category:Dunedin Botanic Garden` (74 kuvaa) — täydentäväksi, jos jakso
  2 kaipaa toista kuvaa
- `Category:St Clair, New Zealand` (28 kuvaa) — rantamaisema, jos jakso 5
  kaipaa kuvaa

---

## 6. Säätiedot

Ks. osio 3, Jakso 5 — samat luvut, sama lähde (en-Wikipedian Climate-osio,
EI ERA5).

---

## 7. Ristiriidat, epävarmuudet ja huomiot

1. **1873 on Dunedinille poikkeuksellisen vahva vuosi — kolme erillistä
   tapahtumaa, ei vain yksi.** First Church of Otago vihittiin käyttöön
   23.11.1873, Bank of Otago sulautui National Bank of New Zealandiin
   samana vuonna, ja Dunedin & Port Chalmers -rautatie myytiin Otagon
   maakuntaneuvostolle 9.4.1873. Tämä on vahvempi "isoisän matkan vuosi"
   -ankkuri kuin Christchurchin vastaava (yksittäinen katedraalin
   rakennustyön uudelleenkäynnistys) — tässä on kolme riippumatonta lähdettä
   samalle vuodelle samassa kaupungissa. Suosittelen K3-noston pitämistä
   kaupunkisivun vahvimpana nostona.
2. **Larnach Castlen "valmistumisvuosi" on epäselvä käsite.**
   Infobox-kentässä lukee "completion_date = 1874 (additions until 1887)",
   mutta leipäteksti kertoo, että rakennus sai "linna"-nimensä joulukuussa
   1874 heti kun perhe muutti sisään, ja isoin lisäys (juhlasali) valmistui
   vasta 1887. Käytin L4-nostossa muotoilua joka mainitsee molemmat
   vuodet erikseen sen sijaan että väittäisin rakennuksen olleen
   "valmis" kummassakaan vuodessa.
3. **Otago-nimen etymologia on kaksi kilpailevaa selitystä, joista valitsin
   vahvemmin lähteistetyn.** Kāi tahun oma Kā Huru Manu -kulttuurikartta
   selittää Ōtākou-nimen kanavana Otago Harbourin itäpuolella; toinen,
   heikommin lähteistetty selitys yhdistää nimen "tākou"-sanaan (punainen
   okra). Käytin L1-nostossa vain esistandardoidun kirjoitusasun ja
   Otago-nimen suoraa yhteyttä, joka on riippumaton kummastakin
   etymologiateoriasta ja siten turvallisempi valinta.
4. **Ōtākou-rūnanga ≠ Christchurchin Te Rūnanga o Ngāi Tahu.** Tämä ei ole
   ristiriita vaan tarkoituksellinen erottelu, koska ne ovat helposti
   sekoitettavissa: Ōtākou-rūnanga on Dunedinin PAIKALLINEN hallintoelin
   Otagon niemimaalla, kun taas Te Rūnanga o Ngāi Tahu (TRoNT), jonka
   Christchurchin faktapohjan K4-nosto käsittelee, on koko iwin
   KATTOJÄRJESTÖ toimistoineen Addingtonissa, Christchurchissä. Kirjoittajan
   kannattaa pitää nämä selvästi erillään.
5. **Baldwin Streetin ennätystilanne muuttui kahdesti viiden vuoden
   sisällä, ja tehtävänanto pyysi nimenomaan tarkistamaan nykytilanteen.**
   Titteli siirtyi Walesiin 16.7.2019 ja palasi Dunedinille 8.4.2020
   mittaustavan muutoksen myötä. Nykytilanne (24.8.2026 tarkistettuna) on
   siis: Baldwin Street ON TÄLLÄ HETKELLÄ maailman jyrkin katu Guinnessin
   kirjaamana. M2-nosto kertoo koko kaaren, ei vain lopputulosta, koska
   tarina itsessään on kiinnostava eikä pelkkä nykytila.
6. **Yellow-eyed penguin -kategoria ei ole olemassa Commonsissa suoralla
   nimellä**, vaikka artikkeli on olemassa tällä nimellä. Kuvakategoria on
   sen sijaan tieteellisellä nimellä `Category:Megadyptes antipodes`.
   Vastaava koskee albatrossia (artikkeli mainitsee "northern royal
   albatross", kuvakategoria on `Category:Diomedea sanfordi`). Kirjattu
   osioon 5 selvyyden vuoksi, koska arvattu kategorianimi on tässä
   projektissa kaatunut jo kolme kertaa aiemmin (tehtävänannon oma huomio).
7. **Dunedin Sound- ja Flying Nun Records -kuvakategoriat ovat olemassa
   mutta täysin tyhjiä (0 kuvaa).** Tämä on todennäköisesti tekijänoikeus-
   syistä johtuvaa (bändivalokuvat, levynkannet) — musiikkigenrestä itsestään
   ei yksinkertaisesti ole vapaasti lisensoitua kuvamateriaalia Commonsissa.
   M4-noston kuvaksi suosittelen joko `Category:The Chills`-kategoriaa
   (ainoa yhtyekohtainen kategoria jossa on kuvia) tai vaihtoehtoisesti
   pelkästään David Low -pilapiirtäjän kuvaa/pilakuvaa, koska niistä on
   kategoria kuvineen.
8. **Ensimmäinen koordinaattilaskelmani antoi väärät ilmansuunnat
   merkkivirheen takia** (pohjoinen/etelä-akseli oli käännetty). Tarkistin
   virheen First Churchin artikkelin suoralla väitteellä ("100 metres to
   the south of the city centre") ja korjasin koko laskentaskriptin ennen
   taulukon (osio 4) kirjoittamista — ks. osion 4 alkuhuomio. Kirjoittajan
   kannattaa silti pistokoetarkistaa suunnat kartalta ennen julkaisua, koska
   en löytänyt vastaavaa "virallista" tekstiankkuria muille kuin First
   Churchille.
9. **Kaikki nostot ja jaksot on kirjoitettu valmiiksi suomenkieliseksi
   tekstiksi** merkkimäärävaatimusten mukaan (johdannot 201–218 mrk,
   nostot 474–639 mrk — kaikki reseptin 440–660 mrk -haarukassa).
10. **`docs/mantereet-tyoaineisto/spec-mantereet.md` oli tehtävänannon
    lukulistalla**, ja sen Oseania-osio ("Uusi-Seelanti: maorikulttuuri ja
    Waitangin sopimus (1840) perushistoriana; te reo -nimet (Aotearoa) saa
    mainita") sekä kaikkia kolmea uutta mannerta koskevat viisi linjausta
    (mm. sääntö 4 kohdekartan ytimestä, sääntö 1 alkuperäiskansojen
    kunnioittavasta ja elävästä kuvauksesta) on sovellettu suoraan tähän
    faktapohjaan.
11. **Vain en-Wikipediaa ja sen raakatekstiä (action=raw) käytetty
    kaikkiin faktoihin**, paitsi Commons-kategorioiden olemassaolo- ja
    kuvamäärätarkistukseen (osio 5), joka käytti Commonsin
    `action=query`- ja `list=search`-rajapintoja vain kategorianimien ja
    kuvamäärien vahvistamiseen — EI kuvasisällön tarkistamiseen. Ei
    ulkopuolisia hakuja tämän faktapohjan sisältöön.

---

## 8. Päällekkäisyyksien välttäminen

**`js/packs/oceania-questions.js`, kohta `dunedin` (5 kysymystä):**

1. Minkä maan kaupunki Dunedin on? (Uusi-Seelanti; fact: Eteläsaaren
   kaakkoisosa, ~134 100 asukasta 2020)
2. Minkä kaupungin mukaan Dunedin on saanut nimensä? (Edinburgh; fact:
   maorinkielinen nimi Ōtepoti)
3. Kuka perusti Dunedinin 1848? (Skotlannin vapaakirkon maallikkojärjestö;
   fact: Otago Harbourista kehittyi 1830-luvun loppuun mennessä merkittävä
   valaanpyyntisatama)
4. Mikä muutti Dunedinin nopeasti suurkaupungiksi 1861 alkaen? (Otagon
   kultaryntäys; fact: kaupunki oli hetkellisesti maan suurin,
   kaupunginoikeudet 1865)
5. Mikä yliopisto perustettiin Dunediniin 1869? (Otagon yliopisto; fact:
   kaupungista tuli kultaryntäyksen jälkeen Eteläsaaren villateollisuuden
   johtonimi)

**Miten vältin päällekkäisyyden:** Kysymykset 3–5 kattavat jo tarkasti
perustamisvuoden 1848, kultaryntäyksen 1861 ja yliopiston 1869 —
peruskronologian. Faktapohjani K1- ja K2-nostot KÄSITTELEVÄT samat
tapahtumat mutta EIVÄT TOISTA samoja yksityiskohtia: K1 tuo uusia nimiä ja
lukuja jotka eivät ole kysymyksissä (Charles Kettle, William Cargill,
Thomas Burns/Robert Burns-yhteys, 12 000 skottia), K2 tuo täysin uusia
lukuja (1874 väestövertailu Aucklandiin, Union-laivayhtiö) joita
kysymyksissä ei mainita lainkaan. K3-nosto (1873-vuosi) on kokonaan uusi
kulma, jota kysymyksissä ei sivuta ollenkaan. Maorinkielinen nimi Ōtepoti
(kysymys 2:n fact-kenttä) EI esiinny missään omassa faktapohjassani —
tarkistin tämän erikseen, koska Ōtākou (jota käsittelen laajasti L1-nostossa)
ja Ōtepoti ovat KAKSI ERI nimeä: Ōtepoti on Dunedinin keskustan oma
maorinkielinen nimi, Ōtākou on niemimaan kärjen/harbourin nimi josta
"Otago" juontuu. Tarkistin tämän eron en-Wikipediasta ("There was a
settlement in what is now central Dunedin (Ōtepoti)..." — eri virke kuin
Ōtākou-osio) enkä sekoittanut niitä.

**`OCEANIA_FACTS.dunedin`-rivit (kolme faktaa + isoisän repliikki):**

- "Dunedin perustettiin vuonna 1848, ja sen nimi on gaelinkielinen muoto
  Skotlannin pääkaupungin nimestä: Dùn Èideann eli Edinburgh." — Sama
  perusfakta kuin K1-nostossani, mutta K1 EI toista tätä lausetta: se
  laajentaa perustamistarinaa aivan eri yksityiskohdilla (mittaaja,
  johtajat, siirtolaismäärä). Nimen alkuperä mainitaan K1:ssä sivulauseena
  koska se on pakko todeta konteksti, mutta ei selitetä uudelleen.
- "Heinäkuussa 1861 alkanut Otagon kultaryntäys nosti asukasluvun 1 700:sta
  lähes 15 000:een, ja kaupunki oli hetken Uuden-Seelannin suurin." —
  K2-nostossani EN toista näitä täsmällisiä lukuja (1 700 → 15 000); käytän
  sen sijaan 1874-vuoden vertailulukua Aucklandiin (29 832 vs. 27 840),
  joka on eri tilastopiste samasta ilmiöstä.
- "Kaupungin keskusta on 23 kilometriä pitkän Otago Harbour -lahden
  kärjessä, ja lahden suulla on Port Chalmersin satama." — Tämä
  maantieteellinen perusfakta EI esiinny missään omassa nostossani
  sellaisenaan; mainitsen Otago Harbourin vain geologisena ilmiönä
  (Jakso 2, tulivuoren jäänteenä) ja etnohistoriallisena nimenä (L1,
  Ōtākou), eri näkökulmista kuin faktarivin maantiedettä.
- Isoisän repliikki ("Kaksitoista vuotta sitten täällä asui vajaat kaksi
  tuhatta sielua; kulta toi loput. Yliopisto on neljä vuotta vanha...")
  vahvistaa saman ajoituksen jota K3-nostoni käyttää (isoisä on
  Dunedinissä 1873, 12 vuotta kultaryntäyksen jälkeen, yliopisto 4 vuotta
  vanha) — K3 EI toista repliikin sanamuotoa, vaan tuo kokonaan uuden,
  repliikin mainitsemattoman kolmikon (First Church, pankkisulautuma,
  rautatien myynti) samalle vuodelle. Tämä itse asiassa VAHVISTAA
  repliikin ajoitusta lisäfaktoilla sen sijaan että toistaisi sitä.

**Christchurchin faktapohja (`faktapohja-christchurch.md`), sama lauta,
sama maa:**

- Christchurchin K2-nosto käsittelee kāi tahua/waitahaa/kāti māmoeta
  yleishistoriallisesti Cantyn tasangolla; omassa L1-nostossani kāi tahu
  käsitellään ERI KULMASTA — nimenomaan Ōtākoun paikallisen rūnangan ja
  Otago-nimen etymologian kautta, joka on Dunedinille ainutlaatuinen eikä
  esiinny Christchurchin tekstissä lainkaan.
- Christchurchin K4-nosto käsittelee Te Rūnanga o Ngāi Tahua (koko iwin
  kattojärjestö, 1998 Claims Settlement Act, Jenny Shipleyn anteeksipyyntö)
  — omassa L1-nostossani EN toista tätä sopimuslakia tai anteeksipyyntöä
  lainkaan, vaan käsittelen paikallisen Ōtākou-rūnangan ja nimietymologian,
  ks. myös osio 7 huomio 4.
- Christchurch käsittelee "Eteläiset Alpit" -vuoristoa ja "Canterburyn
  tasankoa" laajasti matkaoppaan jaksossa 2; oma Jakso 2:ni käsittelee
  KOKONAAN ERI maantieteellisen ilmiön — Dunedin Volcanon, paikallisen
  sammuneen tulivuoren — eikä mainitse Eteläisiä Alppeja tai Canterburyn
  tasankoa kertaakaan.
- Christchurch käsittelee skotlantilaisperintöä EI lainkaan (Christchurch
  on anglikaaninen/englantilainen siirtokunta, ei skotlantilainen) — tämä
  on siis Dunedinille ainutlaatuinen teema eikä päällekkäisyysriskiä ole.
- Kummallakin kaupungilla on oma 1800-luvun kirkkonsa jonka rakennushistoria
  osuu isoisän matkan vuoteen: Christchurchin H3-nosto käsittelee
  ChristChurch-katedraalin rakennustyön UUDELLEENKÄYNNISTYSTÄ 1873
  (arkkitehti Mountfort), oma K3-nostoni käsittelee First Churchin
  VIHKIÄISIÄ samana vuonna (arkkitehti Lawson) — samankaltainen ilmiö
  (isoisän-vuosi -sattuma) mutta eri rakennus, eri kaupunki, eri
  yksityiskohdat; tämä ei ole päällekkäisyys vaan rinnakkainen, erikseen
  kummallekin kaupungille aito löytö.

## Korjaushistoria 24.8.2026 (tarkistus-dunedin.md:n jälkeen, Fable)

1. M2: "Jim Moran" → "Jim Mora" (proosa ja lähteet; en-Wikipedia "Jim Mora (broadcaster)").
2. Osio 5: väärä "ei ole olemassa, TARKISTETTU" -väite poistettu — `Category:Dunedin Volcano` on olemassa (3 kuvaa) ja lisätty jakso 2:n ensisijaiseksi kuvalähteeksi (basalttipatsaskuva osuvin).
