# Caracas-faktapohjan riippumaton tarkistus

Tarkistettu 24.8.2026 en-Wikipedian raakatekstistä (`action=raw`, curl +
proxy-CA, uusinnat kasvavalla viiveellä) seuraavista artikkeleista:
**Caracas**, Guaicaipuro, Diego de Losada, 1812 Caracas earthquake,
Caracas Cathedral, Simón Bolívar, Bolívar Square (Caracas), Palacio
Federal Legislativo, National Pantheon of Venezuela, Antonio Guzmán
Blanco, El Ávila National Park, Auyán-tepui, Angel Falls, Catatumbo
lightning, History of the Venezuelan oil industry, Teleférico de
Caracas, Birthplace of Simón Bolívar, Plaza Venezuela, University City
of Caracas. Koordinaatit tarkistettu suoraan artikkeleiden {{coord}}-
malliteista (laskettu käsin desimaaleiksi) ja verrattu faktapohjan
kohdekartta-taulukkoon. Commons-kategoriat tarkistettu MediaWikin
`action=query&titles=`-rajapinnasta jokaiselle 17 kategorialle
erikseen. Merkkimäärät laskettu koneellisesti Python-skriptillä kaikille
15 nostolle/johdannolle.

**Yleisarvio: koostaja on tehnyt poikkeuksellisen huolellista työtä.**
Käytännössä kaikki yksittäiset faktaväitteet (nimet, vuosiluvut,
koordinaatit, Commons-kategoriat, merkkimäärät) osoittautuivat oikeiksi
riippumattomasti tarkistettuina — myös vaikeat kohdat kuten Guzmán
Blancon kausien päällekkäisyys, Panteónin ja Capitolion sisäiset
Wikipedia-ristiriidat ja Bolívarin synnyintalon koordinaattiristiriita
oli jo itse löydetty ja merkitty oikein. Löysin kuitenkin kolme
todellista **sisältövirhettä** (yksi niistä visasääntöä rikkova
lähes-sanatarkka toisto, jonka lukuarvo on lisäksi väärä), yhden
**lähteettömän väitteen**, yhden **sisäisen ristiriidan** faktapohjan
oman kehyskertomuksen kanssa ja yhden **täyttämättömän
sisältötilauksen** (Pilari 3 -esimerkit). Lisäksi muutama pienempi
huomio.

---

## A. VIRHE — K2: lähes sanatarkka toisto visan pääkaupunki-kysymyksestä, ja luku on väärä

**Väite (K2, proosa):** "Caracas makaa kapeassa laaksossa noin 900
metrin korkeudessa, vaikka Karibianmeri on vain reilun kymmenen
kilometrin päässä — välissä kohoaa jyrkkä, lähes 2 200 metriä korkea
rannikkovuoristo."

**Visan kysymyksen 1 fact-kenttä** (`js/packs/southamerica-questions.js`,
`caracas[0]`): "Caracas sijaitsee rannikkovuoriston laaksossa noin 900
metrin korkeudessa, vaikka meri on vain kymmenen kilometrin päässä."

**Ongelma:** Nämä kaksi lausetta ovat rakenteellisesti ja sanastollisesti
lähes identtiset — sama lauserakenne ("[Caracas sijaitsee/makaa] ...
laaksossa noin 900 metrin korkeudessa, vaikka [meri/Karibianmeri] on
vain [kymmenen/reilun kymmenen] kilometrin päässä"), sama kaksi lukua.
Tämä on juuri sitä visasäännön rikkomista, jota koostaja itse pyrki
osiossa 7 kohdassa 1 välttämään — mutta oma vertailutaulukko ei
huomannut ongelmaa, koska se vertasi K2:ta vain visan kysymykseen 4
(Karibianmeri), ei kysymykseen 1 (pääkaupunki), jonka fact-kenttä
sisältää saman 900 m / 10 km -parin.

**Lisäksi luku on väärä.** En-Wikipedian "Caracas"-artikkeli sanoo
johdannossa: "separated from the Caribbean coast by a roughly 15 km
expanse of El Ávila National Park" — siis noin **15 kilometriä**, ei
"reilu kymmenen". Tämä on myös K2:n OMA lähdeviittaus faktapohjassa
("Karibianmeren rannikko on n. 15 km päässä... — en-Wikipedia 'Caracas'
(johdanto, Geography)") — eli lähteet-kohta on oikein, mutta itse
julkaistavaksi tarkoitettu proosateksti käyttää eri (ja visan lukua
muistuttavaa) lukua. Poikkeama todellisesta luvusta on lähes 50 %.

**Suositus:** Kirjoita K2:n avausvirke uusiksi sekä etäisyyden numeron
(15 km, ei "reilu kymmenen") että lauserakenteen osalta niin, ettei se
enää muistuta visan kysymyksen 1 fact-kenttää. Tarkista myös osion 7
kohdan 1 taulukko: K2 pitäisi merkitä koskettavan MYÖS visan kysymystä 1,
ei vain kysymystä 4.

---

## B. VIRHE — L1: julkaistava teksti ristiriidassa faktapohjan omien lähteiden kanssa

**Väite (L1, proosa):** "Rinteillä elää yli 500 lintulajia, lähes 1 800
kasvilajia ja satoja perhoslajeja."

**L1:n oma lähteet-kohta:** "Puistossa on dokumentoitu yli 500
lintulajia (36 % Venezuelan linnustosta), n. 1 800 kasvilajia ja **yli
100 perhoslajia**." — ja en-Wikipedian "El Ávila National Park"
(Biodiversity) sanoo täsmälleen: "More than 100 butterfly species...
**More than 1,800** plant species..."

**Ongelma — kaksi erillistä virhettä samassa virkkeessä:**
1. "satoja perhoslajeja" (satoja = vähintään parisataa) ei vastaa
   lähdettä eikä faktapohjan omaa lähdeviittausta, jossa lukee "yli 100"
   — "reilu 100" on jotain aivan muuta kuin "satoja".
2. "lähes 1 800 kasvilajia" (lähes = hieman alle 1 800) on suunnaltaan
   päinvastainen kuin lähde: Wikipedia sanoo "**more than** 1,800", ei
   "lähes 1 800". Faktapohjan oma lähteet-kohta sanoo oikein "n. 1 800",
   mutta proosateksti kääntää sen virheellisesti "lähes" (alle) -muotoon.

**Suositus:** Korjaa proosa muotoon, joka vastaa lähteitä, esim. "yli
500 lintulajia, yli 1 800 kasvilajia ja runsaasti (yli sata)
perhoslajeja." Tarkista merkkimäärä korjauksen jälkeen (nykyinen 449
merkkiä voi muuttua hieman).

---

## C. VIRHE — Jakso 1: lähteetön vuosiluku (Teleféricon uudelleenavaus 2002)

**Väite (Jakso 1, proosa):** "Teleférico de Caracas avattiin ensin
1955, suljettiin 1970-luvun lopulla ja avattiin mittavan kunnostuksen
jälkeen uudelleen 2002."

**Ongelma:** Vuosilukua 2002 ei löydy lainkaan viitatusta artikkelista
("Teleférico de Caracas", History-osio) — tarkistin koko artikkelin,
eikä merkkijonoa "2002" esiinny siinä kertaakaan. Artikkeli kertoo, että
konsessio kunnostukseen myönnettiin vuonna 2000 ja että "the
reconstruction... began [2000]... and the cable cars are now
operating" — mutta tarkkaa uudelleenavausvuotta ei mainita. 3,5 km:n
matka ja 15 minuutin kesto TÄSMÄÄVÄT lähteeseen, mutta vuosi 2002 on
lähteetön lisäys.

**Suositus:** Poista vuosiluku 2002 tai etsi sille erillinen, luotettava
lähde ennen julkaisua (esim. "avattiin uudelleen 2000-luvun alussa
laajan kunnostuksen jälkeen" ilman täsmävuotta, tai tarkista asia
espanjankielisestä lähteestä).

---

## D. Sisäinen ristiriita — H4: "viisitoista vuotta kestänyt kausi" vs. sivun oma 7-vuotinen kehys

**Väite (H4, proosa):** "Viisitoista vuotta kestäneen kautensa aikana
kansakoulujen määrä nelinkertaistui lähes kahteen tuhanteen..."

**Ongelma:** Koko `historia`-teemasivu on rakennettu sen perustelun
varaan, että isoisän matkavuosi 1873 osuu Guzmán Blancon
**ensimmäiseen, seitsemän vuotta kestäneeseen kauteen (1870–1877)**
("Guzmanato"/"El Septenio") — tämä todetaan eksplisiittisesti
faktapohjan johdannossa (rivit 39–42) ja Sivu B:n perustelussa. H4:n
"viisitoista vuotta kestänyt kautensa" viittaa kuitenkin Wikipedian
lauseeseen "In 15 years from 1870, the number of primary schools
quadrupled..." — joka Guzmán Blancon oman artikkelin mukaan kattaa
todellisuudessa **kolme erillistä, ei-yhtäjaksoista kautta**
(1870–1877, 1879–1884, 1886–1887), ei yhtä 15-vuotista presidenttikautta.
Ilmaisu "hänen kautensa" (yksikkö) antaa virheellisen kuvan
yhtäjaksoisesta 15-vuotiskaudesta ja on ristiriidassa sivun oman
pääväitteen (7-vuotinen ensimmäinen kausi) kanssa.

**Suositus:** Muotoile uudelleen esim. "Guzmán Blancon presidenttikausien
aikana [1870-luvulta alkaen] kansakoulujen määrä nelinkertaistui..." tai
poista tarkka vuosimäärä kokonaan ja käytä pelkkää ilmausta "hänen
valtakautenaan", jottei synny ristiriitaa sivun 7-vuotisen kehyksen
kanssa.

---

## E. Huomio — Metro-linjojen määrä: mahdollinen Wikipedia-sisäinen ristiriita, jota faktapohja ei huomannut

**Väite (Jakso 1, lähteet):** "Caracasin metro avattiin 27.3.1983 ja
sillä on nykyään neljä linjaa ja 47 asemaa. — en-Wikipedia 'Caracas'
(Transportation, Caracas Metro)"

**Ongelma:** "Caracas"-artikkelin Transportation-osion johdantolause
sanoo todella "four lines, 47 stations" — mutta SAMAN otsikon (`===
Caracas Metro ===`) alaosiossa lukee: "The system inaugurated in 1983
is 71 km long and **has five lines**, being one of the longest in Latin
America." Tämä on artikkelin sisäinen ristiriita (neljä vs. viisi
linjaa), jota faktapohja ei ole huomannut eikä merkinnyt EPÄVARMAKSI —
toisin kuin muut vastaavat löydetyt ristiriidat (esim. kohta 5,
Capitolion valmistumisvuosi). 71 km:n pituutta ei myöskään mainita
faktapohjassa lainkaan.

**Suositus:** Tarkista kirjoitusvaiheessa kumpi luku (4 vai 5) on
ajantasaisempi (esim. Caracas Metro -omasta artikkelista), ja merkitse
ristiriita samaan tapaan kuin osion 7 muut Wikipedia-sisäiset
epäjohdonmukaisuudet, jos asiaa ei saada ratkaistua.

---

## F. Huomio — Pilari 3 -sisältötilaus jäänyt osin täyttämättä

Faktapohjan johdannossa (rivit 29–38) luvataan omistajan nimenomaisena
tilauksena, että Venezuela kuvataan "elävänä ja nykyaikaisena valtiona"
**esimerkiksi** Simón Bolívar -sinfoniaorkesterin ja El Sistema
-musiikkiohjelman sekä Ávilan kansallispuiston nykyisen
virkistyskäytön kautta. Kävin läpi kaikki 12 nostoa, 5 jaksoa ja 3
johdantoa: hakusanat "orkester", "musiikk" ja "El Sistema" eivät esiinny
missään niistä — vain UCV:n UNESCO-status ja moderni arkkitehtuuri
(Jakso 4) toteuttaa lupauksen. Ávilan kuvataan L1:ssä biologisen
monimuotoisuuden ja Pacheco-legendan kautta, ei nimenomaisesti
kaupunkilaisten nykyisenä virkistysalueena (vrt. Jakso 1:n
Teleférico/Hotel Humboldt -kohta, joka sivuaa asiaa matkailun
näkökulmasta muttei virkistyksen).

**Suositus:** Jos El Sistema / sinfoniaorkesteri -esimerkki halutaan
pitää voimassa, sille kannattaa varata oma nosto tai jakso ennen
julkaisua — nyt se on mainittu vain kehyskertomuksessa muttei toteutunut
sisällössä.

---

## G. Huomiot — visan sanamuotokolauksia kahdessa muussa nostossa (lievempiä kuin kohta A)

- **L3 vs. visan Catatumbo-kysymys:** proosa sanoo "Merenkulkijat
  käyttivät ilmiötä vuosisatoja majakkana", visan fact-kenttä sanoo
  "Merimiehet käyttivät sitä majakkana." Suurin osa L3:sta (Humboldt
  1826, Codazzi 1841 -sitaatit) eroaa visasta selvästi, mutta
  avausväite on lähes sama ydinilmaus.
- **L4 vs. visan öljy-kysymys:** proosan päättävä virke "nykyään
  Venezuelalla arvioidaan olevan maailman suurimmat todetut öljyvarat"
  muistuttaa visan fact-kenttää "Maalla on maailman suurimpia todettuja
  öljyvarantoja." Nostosta 4/5 (mene, keisari Kaarle V) on aidosti
  toisenlainen näkökulma, mutta loppulause palaa lähelle visan
  sanamuotoa.

Kumpikaan ei ole yhtä vakava kuin kohta A, koska suurin osa tekstistä
poikkeaa visasta selvästi — mutta molemmat kannattaa muotoilla hieman
etäämmäs ennen julkaisua.

---

## H. Muita huomioita (ei korjaustarvetta faktapohjaan)

- **Visan oma Catatumbo-fact-kenttä** ("ukkostaa noin 250 yönä
  vuodessa") sekoittanee kaksi eri lukua: todellinen yöfrekvenssi on
  140–160 yötä/vuosi, ja 250/km²/vuosi on salamatiheys, ei öiden määrä.
  Tämä ei ole faktapohjan virhe — faktapohja käyttää oikein molempia
  lukuja erillisinä — mutta jos visaa joskus päivitetään, kannattaa
  tietää sekaannuksen lähde.
- **Visan oma Bolívar-fact-kenttä** väittää hänen johtaneen "viiden
  maan itsenäistymistä" — Simón Bolívar -artikkelin mukaan kyse on
  kuudesta maasta (Bolivia, Kolumbia, Ecuador, Panama, Peru,
  Venezuela). Ei vaikuta faktapohjan sisältöön.
- **Jakso 5:n "kuivin kausi on joulu-maaliskuu"** on hieman epätarkka:
  säälaatikon lukujen mukaan joulukuu (107,4 mm) on selvästi sateisempi
  kuin tammi-huhtikuu (56,1/42,5/20,7/48,1 mm) ja muistuttaa enemmän
  marraskuuta (130,0 mm). Tarkempi olisi esim. "tammi-huhtikuu", tai
  mainita siirtymän olevan asteittainen.
- **Caracas Cathedral -haku palautti kerran väärän artikkelin**
  (ChristChurch Cathedral, Uusi-Seelanti) tismalleen samanpituisena
  tiedostona (13 886 tavua) kuin oikea artikkeli — paljastui vasta
  sisältöä lukemalla, ei tiedostokoon tai HTTP-statuksen perusteella.
  Uusintahaku palautti oikean artikkelin, ja kaikki siitä tarkistetut
  K3/K4-faktat osoittautuivat oikeiksi. Varoitus tuleville
  tarkistuksille: älä luota tiedostokokoon merkkinä oikeasta sisällöstä.
- Palacio Federal Legislativon sijaintisuunnasta on pieni lisäero
  artikkelin sisällä (johdanto: "southwest", Features-osio: "west"),
  jota kohta 5 ei mainitse — faktapohjan "lounaaseen" ja käytetty
  koordinaatti ovat kuitenkin keskenään johdonmukaiset, joten ei vaadi
  korjausta.

---

## Yhteenveto korjattavista kohdista

### PAKOLLISET KORJAUKSET

1. **[VIRHE, visasääntö + lukuvirhe] K2:** avausvirke on lähes
   sanatarkka toisto visan kysymyksen 1 fact-kentästä, ja etäisyysluku
   ("reilu kymmenen kilometriä") on väärä — oikea luku on n. 15 km
   (myös faktapohjan omassa lähteet-kohdassa). Kirjoita virke uusiksi ja
   päivitä osion 7 taulukko. Ks. kohta A.
2. **[VIRHE] L1:** "satoja perhoslajeja" ja "lähes 1 800 kasvilajia"
   ovat ristiriidassa faktapohjan omien lähteiden kanssa (yli 100
   perhoslajia; yli/n. 1 800 kasvilajia). Ks. kohta B.
3. **[VIRHE, lähteetön] Jakso 1:** Teleféricon uudelleenavausvuotta
   2002 ei löydy viitatusta lähteestä. Ks. kohta C.
4. **[Sisäinen ristiriita] H4:** "viisitoista vuotta kestänyt kautensa"
   on ristiriidassa sivun oman 7-vuotisen (1870–1877) kehyksen kanssa —
   Wikipedian 15 vuoden luku kattaa kolme erillistä kautta. Ks. kohta D.

### HUOMIOT

5. **[Huomio] Jakso 1:** metrolinjojen määrä (4 vai 5) on Wikipedian
   artikkelin sisällä ristiriitainen; faktapohja ei ole huomannut tätä.
   Ks. kohta E.
6. **[Huomio] Pilari 3 -tilaus:** El Sistema / sinfoniaorkesteri ja
   Ávilan nykyinen virkistyskäyttö on luvattu johdannossa muttei
   toteutettu missään nostossa/jaksossa. Ks. kohta F.
7. **[Huomio] L3 ja L4:** lievempiä visa-sanamuotokolauksia
   yksittäisissä virkkeissä. Ks. kohta G.
8. **[Huomio] Jakso 5, visan omat fact-kentät, hakuvarmuus:** ks. kohta
   H (ei vaadi muutosta faktapohjaan).

---

## Vahvistettu erityisen huolella (tehtävänannon painotukset)

- **Guzmán Blancon ensimmäinen kausi (1870–1877) ja 1873:** vahvistettu
  täsmälleen oikein Guzmán Blancon omasta infoboksista (term_start2 =
  27 April 1870, term_end2 = 27 February 1877) — 1873 osuu keskelle
  kautta.
- **Kaikki 12 nostoa käyty läpi faktalähteineen** (Guaicaipuro, Diego de
  Losada, 1812 Caracas earthquake, Caracas Cathedral, Simón Bolívar,
  Bolívar Square, Palacio Federal Legislativo, National Pantheon,
  Antonio Guzmán Blanco, El Ávila National Park, Auyán-tepui, Angel
  Falls, Catatumbo lightning, History of the Venezuelan oil industry) —
  kaikki vuosiluvut, nimet ja sitaatit täsmäsivät paitsi kohdissa A–C.
- **Kaikki koostajan itse löytämät sisäiset Wikipedia-ristiriidat**
  (Capitolion 1873 vs. 1877, koulu-uudistuksen 1870 vs. 1880, 1812
  maanjäristyksen magnitudi 7,7 vs. Mw 7,4/7,1, Bolívarin synnyintalon
  koordinaatti vs. "korttelin päässä idässä" -väite, Angelin putouksen
  ennätyskiista Tugela Fallsin kanssa) **vahvistettiin kaikki todellisiksi
  ja oikein kuvatuiksi** riippumattomasti tarkistettuina.
- **Koordinaatit:** kaikki 10 kohdekartan koordinaattia laskettu itse
  {{coord}}-malliteista (Plaza Bolívar, katedraali, Capitolio, Panteón,
  Casa Natal, Plaza Venezuela, UCV, Teleférico, Ávila, Angel Falls) —
  jokainen täsmäsi faktapohjan taulukkoon desimaalin tarkkuudella.
- **Commons-kategoriat:** kaikki 17 listattua kategoriaa tarkistettu
  MediaWikin hakurajapinnasta yksitellen — kaikki olemassa olevat
  kategoriat vahvistettu olemassa oleviksi, ja molemmat koostajan HUOM-
  merkinnät vääristä arvatuista nimistä ("El Ávila National Park",
  "Palacio Federal Legislativo", "Auyán-tepui") vahvistettiin todella
  puuttuviksi — oikeat korvaavat nimet (Avila National Park, Federal
  Legislative Palace, Auyantepuy) olemassa.
- **Merkkimäärät:** kaikki 15 nostoa/johdantoa mitattu koneellisesti
  Python-skriptillä — kaikki 15 lukua täsmäsivät koostajan ilmoittamiin
  lukuihin täsmälleen (230, 207, 208, 511, 481, 494, 480, 465, 459, 560,
  552, 449, 525, 455, 500 merkkiä), ja kaikki osuvat vaadittuihin
  vaihteluväleihin (johdannot 154–232, nostot 440–660).
- **Pilari 4 (ei nykypolitiikkaa/väkivaltaa):** haettu koko faktapohjan
  tekstistä hakusanoilla Chávez/Maduro/kriisi/väkivalta/rikollisuus/
  huume/siirtolai — kaikki osumat ovat vain osion 7 metakeskustelussa
  siitä, mitä on tietoisesti jätetty pois, eivät varsinaisessa
  julkaistavaksi tarkoitetussa sisällössä. Sääntöä on noudatettu.
