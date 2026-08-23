# Lima-faktapohjan riippumaton tarkistus

Tarkistettu 23.8.2026 en-Wikipedian raakatekstistä (`action=raw`, curl + proxy-CA,
uusinnat kasvavalla viiveellä — samat 429-vastaukset kuin useissa aiemmissa
mantereiden tarkistuksissa, korjaantuivat aina muutaman sekunnin odotuksella)
seuraavista artikkeleista: **Lima**, Huaca Pucllana, Chinese Peruvians, Guano,
Ferrocarril Central Andino, **1746 Lima–Callao earthquake**, Barranco District,
Miraflores District (Lima), Callao, Battle of Callao, Causa limeña, Henry Meiggs,
Historic Centre of Lima (sivutuotteena, ks. kohta F). Koordinaatit haettu itse
MediaWiki-rajapinnasta (`prop=coordinates`, redirects=1) kaikille yhdeksälle
kohdekartan kohteelle sekä Jorge Chávezin lentokentälle; etäisyydet ja
kompassisuunnat laskettu itse (haversine + bearing, Python).

**Yleisarvio: koostaja on tehnyt hyvin huolellista työtä, ja kaikki kolme
erityistarkistuspyynnön kohdetta (muurin purku 1872, Andien radan
rakennusvaiheet, 1746-maanjäristyksen uhriluvut) osoittautuivat täysin
oikeiksi lähteisiin verrattuna** — myös maanjäristyksen kiistanalainen
Khlebnikov-sitaatti ("4 000 hukkunutta Callaossa") löytyi sanatarkasti.
Löysin kuitenkin yhden todellisen **sisältövirheen** (K2:n väite Meiggsin
katukorjauksista, joka on ristiriidassa koostajan oman epävarmuusmerkinnän
kanssa), kaksi **lähdeviittausvirhettä** (fakta on oikein mutta viitattu
väärään artikkeliin) ja muutaman pienemmän tarkennuksen kompassisuunnista ja
proosa/faktalaatikko-yhtenäisyydestä.

---

## A. VIRHE — K2: Meiggsin väitetyt katukorjaukset ristiriidassa koostajan oman huomion kanssa

**Väite (K2, proosa):** "Samaan aikaan Meiggs kunnosti puretun muurin
ympäristöä ja katuja."

**Ongelma:** Tätä väitettä ei löydy mistään tarkistamastani lähteestä — ei
"Lima"-artikkelin Republican era -osiosta (joka kertoo muurin purkamisesta
1872 ja Arco del Puenten tulipalosta 1879, mutta ei mainitse mitään
katujen kunnostamisesta), eikä "Henry Meiggs" -artikkelista. K2:n oma
fact-laatikko ei myöskään sisällä tätä väitettä lähteineen — laatikossa on
vain neljä kohtaa (muurin rakentaminen, purku, Arco del Puenten tuho, ja
EPÄVARMA-merkintä "seitsemän mailin puistosta"). Katukorjaus-lause on siis
sekä lähteetön että puuttuu kokonaan omasta fact-laatikosta.

**Erityisen huomionarvoista:** koostaja on itse kirjoittanut saman noston
loppuun EPÄVARMA/HUOM-merkinnän, jossa todetaan täsmälleen tästä aiheesta:
"Henry Meiggsin oma artikkeli mainitsee hänen rakennuttaneen 'seitsemän
mailin puiston' muurien paikalle mutta ei ajoita tätä täsmällisesti eikä
nimeä puistoa; en löytänyt tälle erillistä vahvistusta, **joten en
käyttänyt yksityiskohtaa leipätekstissä**." Tämä on suoraan ristiriidassa
sen kanssa, että leipäteksti (proosa) SISÄLTÄÄ lähes saman väitteen
lievemmässä muodossa ("kunnosti... katuja" vs. "rakensi seitsemän mailin
puiston"). Koostaja on siis luullut poistaneensa epävarman yksityiskohdan,
mutta ei tehnyt niin täysin — puolikas versio jäi proosaan.

**Suositus:** Poista virke "Samaan aikaan Meiggs kunnosti puretun muurin
ympäristöä ja katuja" kokonaan, tai korvaa se maininnalla, joka on
suoraan lähteistetty (esim. Republican era -osion tieto vaurauden
epätasaisesta jakautumisesta samalta ajalta, jos tilaa jää). Tarkista
merkkimäärä uudelleen poiston jälkeen (nykyinen 588 merkkiä pienenee).

---

## B. Lähdeviittausvirhe — Jakso 3: Miraflores-väite viitattu väärään artikkeliin

**Väite (Jakso 3, fakta ja lähde):** "Miraflores District sijaitsee Liman
rannikolla kalliojyrkänteillä, joilla kulkee suosittu Malecón-
rantabulevardi; alueella sijaitsee myös Huaca Pucllana. — en-Wikipedia
'Miraflores District, Lima'"

**Ongelma:** Luin koko "Miraflores District, Lima" -artikkelin raakatekstin
läpi eikä siinä mainita sanaakaan kallioista (cliff), Malecónista tai
rantabulevardista missään muodossa — vain Huaca Pucllana -maininta täsmää.
Sen sijaan kalliot ja niillä sijaitseva Larcomar-ostoskeskus mainitaan
**"Lima"-artikkelissa** (Society and culture -osiossa: "Larcomar, a
shopping mall and entertainment center built on cliffs overlooking the
Pacific Ocean... is also located in this district [Miraflores]") sekä
Architecture-osiossa Larcomarin yhteydessä. Itse "Malecón"-nimi esiintyy
Lima-artikkelissakin vain yhden kuvatiedoston tiedostonimessä
("Malecon de Armendariz"), ei leipätekstissä — liitovarjoilu sen sijaan
vahvistuu Lima-artikkelin kuvatekstistä "Paragliding in Miraflores".

**Suositus:** Vaihda lähdeviite "en-Wikipedia 'Miraflores District, Lima'"
muotoon "en-Wikipedia 'Lima' (Society and culture / Architecture)", tai
tarkista Malecón-nimi ja liitovarjoilu-yksityiskohta vielä erikseen ennen
julkaisua, koska ne eivät ole sanatarkasti minkään lukemani artikkelin
leipätekstissä vahvistettuja — vain rakennus (Larcomar) ja kalliot ovat.

---

## C. Lähdeviittausvirhe — Osio 5: Jorge Chávezin lentokentän koordinaatit väärässä artikkelissa

**Väite (osio 5):** "Keskustan/lentokentän koordinaatit: 12,0219°S,
77,1144°W (Jorge Chávez -lentokenttä, korkeus 13 m). — en-Wikipedia
'Lima' (Climate)"

**Tarkistus:** Luku itsessään on **täysin oikein** — hain
"Jorge Chávez International Airport" -artikkelin koordinaatit itse
MediaWiki-rajapinnasta ja sain 12,02194°S / 77,11444°W, joka täsmää
koostajan lukuun desimaalin tarkkuudella. Korkeus 13 m täsmää myös
"Lima"-artikkelin säätaulukon location-riviin.

**Ongelma:** "Lima"-artikkelin Climate-osiossa EI kuitenkaan ole tätä
koordinaattiparia missään — artikkelin ainoa koordinaatti on infoboxin
kaupunkikoordinaatti 12°03'36"S 77°02'15"W (Plaza Mayorin tienoilla, eri
paikka). Lentokentän koordinaatit ovat peräisin erillisestä "Jorge Chávez
International Airport" -artikkelista, ei "Lima"-artikkelista kuten
lähdemerkintä väittää.

**Suositus:** Vaihda lähdeviite muotoon "en-Wikipedia 'Jorge Chávez
International Airport'" koordinaattien osalta; korkeus (13 m) voi jäädä
Lima-viittaukselle, koska se todella on säätaulukon location-rivillä.

---

## D. Tarkennus — kompassisuunnat osiossa 4 (etäisyydet oikein, kaksi suuntaa harhaanjohtavia)

Laskin itse kaikki kahdeksan etäisyyttä ja kompassisuuntaa Plaza Mayorista
(haversine + bearing, samat koordinaatit kuin koostaja, kaikki koordinaatit
myös erikseen vahvistettu MediaWiki-rajapinnasta — täsmäävät koostajan
taulukkoon desimaalin tarkkuudella jokaisen yhdeksän kohteen osalta):

| Kohde | Koostajan suunta | Oma laskelma (bearing) | Arvio |
|---|---|---|---|
| Government Palace | (Plaza Mayorin laidalla) | 38° (NE) | ok, ei suuntaväitettä |
| San Franciscon luostari | itään | 84,5° (lähes itä) | täsmää |
| Torre Tagle | etelään | 157° (SSE) | riittävän lähellä |
| Desamparados-asema | pohjoiseen | **54,4° (NE, ei N)** | **harhaanjohtava** |
| Barrio Chino | itään | **137,9° (SE, ei E)** | **selvästi harhaanjohtava** |
| Huaca Pucllana | etelään | 182,8° (S) | täsmää |
| Barranco | eteläkaakkoon | 171,9° (lähes S) | riittävän lähellä |
| Real Felipe | länteen | 261,6° (lähes W) | täsmää |

Kaikki etäisyydet (km-luvut) täsmäävät koostajan omiin lukuihin alle 20
metrin tarkkuudella — ainoastaan kaksi sanallista suuntamerkintää ovat
harhaanjohtavia. Desamparados-asema on itse asiassa lähes yhtä paljon
itään kuin pohjoiseen Plaza Mayorista (koillinen olisi tarkempi), ja Barrio
Chino on selvästi enemmän etelään kuin itään (kaakko olisi tarkempi — ero
todelliseen itäsuuntaan on lähes 48 astetta). Rajausehdotuksen pääväite
("kuusi ensimmäistä kohdetta mahtuvat alle kilometrin säteelle") pitää
silti paikkansa: laskin myös suurimman parivälisen etäisyyden näiden kuuden
kohteen välillä (Government Palace–Barrio Chino, 0,815 km) — mahtuu
selvästi alle kilometrin halkaisijaan asti, ei vain säteeseen.

**Suositus:** Jos kartan legenda tai teksti käyttää sanallisia
ilmansuuntia, korjaa Desamparados "pohjoiseen" → "koilliseen" ja Barrio
Chino "itään" → "kaakkoon". Ei vaadi korjausta pelkkänä
etäisyystaulukkona.

---

## E. Tarkennus — H3:n proosa ja fact-laatikko nimeävät eri neljännen rakennuksen

**Väite (H3, proosa):** "...suurin osa rahoitti 1850–1870-luvuilla Liman
suuria julkisia rakennuksia – keskustorin, teurastamon, mielisairaalan ja
**vankilan**."

**Väite (H3, fact-laatikko):** "Guanotulot rahoittivat 1850–1870-luvuilla
mm. keskustorin, teurastamon, mielisairaalan ja **Dos de Mayo -sairaalan**
rakentamisen..."

**Tarkistus:** "Lima"-artikkeli (Republican era) listaa itse asiassa VIISI
rakennusta: "the Central Market, the General Slaughterhouse, the Mental
Asylum, the Penitentiary and the Hospital Dos de Mayo." Sekä proosan
"vankila" (Penitentiary) että fact-laatikon "Dos de Mayo -sairaala" ovat
siis erikseen täysin oikeita ja lähteen mukaisia — mutta proosa ja
fact-laatikko nimeävät NELJÄNNEN rakennuksen eri tavalla, mikä on juuri
sitä proosan ja faktalaatikon välistä ristiriitaa, jota tehtävänanto
pyysi tarkistamaan kahteen kertaan lukemalla.

**Suositus:** Ei kiireellinen (molemmat versiot ovat totta), mutta
yhtenäistä sanamuoto ennen julkaisua — esim. valitse jompikumpi
neljänneksi kohteeksi molempiin, tai mainitse molemmat ("...ja
vankilan sekä Dos de Mayo -sairaalan").

---

## F. Tarkennus — Jakso 4: Espanjan laivaston "korjauskelvottomuus" ei ole lähteen mukainen, ja väite puuttuu fact-laatikosta

**Väite (Jakso 4, proosa):** "Espanjan laivasto perääntyi lopulta
korjauskelvottomana."

**Tarkistus:** Haetun "Battle of Callao" -erikoisartikkelin mukaan
taistelun lopputulos on virallisesti merkitty **"Inconclusive"**
(molemmat osapuolet väittivät voittoa: Espanjan mielestä lähes kaikki
rannikkopatterit vaiennettiin, Perun/Yhdysvaltain lähteiden mukaan
kaupunkiin ei tullut mainittavaa vahinkoa). Espanjan laivasto todella
kärsi raskaita vaurioita ja perääntyi ("having sustained heavy damage...
retreated from the battlefield"), mutta laivat jäivät San Lorenzon
saarelle **nimenomaan korjaamaan itseään** ("taking care of their wounded
and their repairs") — eli ne EIVÄT olleet korjauskelvottomia, vaan
korjattavissa ja korjattiin. "Korjauskelvottomana" on siis lähteeseen
nähden liioitteleva sanavalinta. Lisäksi tämä väite puuttuu kokonaan
Jakso 4:n omasta fact-laatikosta (joka mainitsee vain taistelun
osapuolet, Gálvezin kuoleman ja Chincha Islands War -kontekstin).

**Suositus:** Muotoile uudelleen esim. "Espanjan laivasto kärsi raskaita
vaurioita ja vetäytyi lopulta taistelukentältä" — ja lisää lause
fact-laatikkoon lähteineen, tai poista se, koska taistelun lopputulos on
kiistanalainen eikä yksiselitteinen Espanjan tappio.

---

## G. Huomio (ei virhe) — Sivu A:n johdanto lähellä visan vastausta

Faktapohjan osio 7, kohta 1 arvioi K1-noston etäisyyttä visan
"Perun pääkaupunki" -vastauksesta, mutta ei käsittele **Sivu A:n
johdantoa** (osio 1), joka on itse asiassa lähempänä visan sanamuotoa
kuin mikään nosto:

- Visan fact: "Francisco Pizarro perusti Liman 1535, ja siitä tuli
  Espanjan Etelä-Amerikan hallinnon **keskus**."
- Faktapohjan Sivu A -johdanto: "Francisco Pizarro perusti Liman 1535
  Rímac-joen aavikkolaaksoon, ja siitä kasvoi Espanjan Etelä-Amerikan
  hallinnon **pääkaupunki**."

Rakenne ja sisältö ovat lähes identtiset (sama subjekti, sama vuosiluku,
sama syy-seuraus-rakenne "ja siitä ~ Espanjan Etelä-Amerikan hallinnon
X"), vain loppusana vaihtuu ("keskus" vs. "pääkaupunki"). Tämä ei ole
sama asia kuin nosto (johdanto ei ehkä päädy sellaisenaan peliin), mutta
koska visa listaa saman lauseen sanatarkasti fact-kentässään, suosittelen
kirjoittajaa muotoilemaan Sivu A:n johdannon uudelleen etäämmäs
tästä rakenteesta ennen julkaisua.

---

## H. Sisältölinjaus (Perustuslaki) — arvio

Tarkistin erikseen esi-inkakulttuurien ja kiinalaisten sopimustyöläisten
kerronnan tehtävänannon mukaisesti (neutraali historia, ei julmuuksien
korostusta, ei köyhyyden estetisointia):

- **Esi-inkakulttuurit (Ichma, Lima-kulttuuri, Wari, Pachacamac):** H1 ja
  K4 kuvaavat näitä omana hallinnollis-uskonnollisena
  korkeakulttuurinaan (provinssi, pyhäkkö, kuraakka-hallinto,
  arkkitehtuuri) — ei "kadonneen kansan" kehystä. K4:n kuvavinkki (osio 6)
  jopa erikseen ohjeistaa näyttämään Huaca Pucllanan nykykaupungin
  taustaa vasten "muinaisraunio"-kehyksen sijaan, mikä on juuri pilarin
  hengen mukaista. Ei löytynyt huomautettavaa.
- **Kiinalaiset sopimustyöläiset (H4, R3):** Nostot itse eivät mainitse
  kärsimystä tai kuolinlukuja lainkaan — vain työn, myöhemmän
  yrittäjyyden (chifat) ja rautatietyön. Osio 7:n kohta 5 osoittaa, että
  koostaja on tietoisesti valinnut sanamuodon "puolet menehtyi ennen
  sopimuskauden loppua" jos/kun kirjoittaja tarvitsee tarkempaa
  kuvausta, eikä ole toistanut lähteen yksityiskohtaisempaa listaa
  ("abuse, exhaustion and suicide"). Tämä on tarkistettu
  "Chinese Peruvians" -artikkelista sanatarkasti oikeaksi. Kuvaohjeistus
  (osio 6) kieltää eksplisiittisesti kärsimyksen korostamisen kuvissa.
  Linjaus vastaa hyvin Raamatun periaatteita.
- **Köyhyyden estetisointi (H3):** "vaurauden epätasainen jakautuminen
  kasvatti köyhien ja rikkaiden välistä kuilua" -toteamus on neutraali
  ja lähteen ("producing widespread social unrest") mukainen, ei
  kurjuuskuvastoa. Ei huomautettavaa.

---

## I. Muut tarkistetut ja VAHVISTETUT faktat (ei virheitä)

Näiden täsmäävyys tarkistettiin sanatarkasti alkuperäisartikkeleista:

- **Erityistarkistuspyynnön kolme kohdetta — kaikki täysin oikein:**
  - Muurin purku: Walls of Lima 1684–1687, Henry Meiggs puri muurin 1872
    Perun hallituksen sopimuksella "in anticipation of further urban
    growth" — täsmää sanatarkasti. Arco del Puente tuhoutui
    katukauppiaiden sytyttämässä tulipalossa 1879 — täsmää.
  - Andien rautatie: Malinowski 1851 -ehdotus Jaujan laaksoon, Meiggs
    1868, sopimus 23.12.1869, rakennus alkoi tammikuussa 1870 Monserraten
    asemalla, avautui Chiclaan 1878, Galera-tunneli 4783 m (maailman
    toiseksi korkein Qingzang-radan jälkeen, ~69 tunnelia ja 58 siltaa),
    80 000–100 000 kiinalaista 1849–1874, kolmas ryhmä nimenomaan
    Lima–La Oroya–Huancayo-radalla, Meiggsin llama-sitaatti itse
    Wikipediassa "citation needed" — kaikki täsmää täydellisesti.
  - 1746-maanjäristys: 28.10.1746 klo 22:30, Mw 8,6–8,8, ~90 km Limasta
    (artikkeli tarkentaa: luoteeseen, faktapohja ei mainitse suuntaa —
    ei virhe, vain jätetty pois), 3000 talosta 25 säilyi, 74 kirkkoa
    vaurioitui, 1141/60 000 kuoli Limassa, tsunami puoli tuntia
    myöhemmin, 24 m hyökyaalto, 23 alusta tuhoutui, 5000–6000/alle 200
    Callaossa — kaikki täsmää. NGDC:n 5941-luku vahvistui infoboxista;
    Khlebnikovin 1817-muistelman sitaatti sisältää sanatarkasti "the
    4 000 inhabitants of the town" — koostajan "n. 4000 hukkuneesta"
    on siis täysin oikein, ei arvailtu.
- **K1 (perustaminen):** Pizarro 6.1.1535, Ciudad de los Reyes,
  loppiainen, Plaza Mayorin mittaus Riberan/Agüeron/Quinteron kanssa,
  tuomiokirkon peruskivi, nimietymologia (limaq "puhuja" TAI
  aimaran lima-limaq "keltainen kukka" — jälkimmäinen vahvistui vasta
  "Historic Centre of Lima" -artikkelista, huomasin samalla että kyseinen
  artikkeli antaa perustamispäiväksi virheellisesti 18.1. eikä 6.1. —
  Wikipedia-sisäinen ristiriita, mutta koostaja käytti oikeaa päivämäärää
  "Lima"-artikkelista), Taulichusco ja hallituksen palatsi — kaikki
  täsmää.
- **K3 (ilmasto):** kolmanneksi suurin aavikkokaupunki Karachin ja
  Kairon jälkeen, BWh, Humboldtin virta + eteläisen Tyynenmeren
  antisykloni, garúa kesä–lokakuu/syyskuu, rannikko 10–30 mm / sisämaa
  10–60 mm, "cielo de brujas" n. klo 19, lämpötila harvoin alle 12 tai
  yli 30 °C — kaikki täsmää sanatarkasti.
- **K4/Huaca Pucllana:** seitsemän porrastettua tasannetta, Lima-kulttuuri
  200–700, Wari-kulttuurin (500–1000) "Señor de los Unkus" -hauta kolmen
  aikuisen ja uhratun lapsen jäännöksineen, nimietymologia (wak'a +
  pukllana TAI esi-inkapäällikkö), museo avattu 1984 — kaikki täsmää.
- **H1 (esiespanjalainen aika):** Ichman herruus, Maranga- ja
  Lima-kulttuurit, Pachacamacin provinssi 3.–15. vuosisata, Taulichusco
  Mama Vilon entisenä yanana, hallituksen palatsi ja tuomiokirkko
  entisillä paikoilla — kaikki täsmää.
- **H3 (guano):** Quirós 1840, valtion yksinoikeus, suurin tulonlähde,
  vienti huipussaan 1870 yli 700 000 tonnia, yli 25 000 orjan vapautus
  ja henkiveron poisto — kaikki täsmää (neljännen rakennuksen
  epäjohdonmukaisuus ks. kohta E).
- **R1/R4 (ruoka):** Central 2023 ja Maido 2025 World's 50 Best -ykkösinä,
  APEGA 2007, Mistura 2008, kävijämäärä 30 000 → 600 000 (2014), Perun
  kahvi ja suklaa kansainväliset palkinnot — kaikki täsmää.
- **R2 (ceviche):** ainekset (suola, valkosipuli, sipuli, chili, kala,
  lime), alueelliset variaatiot (musta-osteri/äyriäinen pohjoisessa,
  taimen/kana Andeilla) — täsmää sanatarkasti. Causa limeñan kolme
  kilpailevaa etymologiaa (kawsay, San Martín 1821, War of the Pacific
  1879) — täsmää. Sitrushedelmän alkuperä Aasiasta täsmää, joskin
  lähdeteksti käyttää sanaa "lemon" eikä "lime" — todennäköisesti
  perulaisen espanjan "limón" tarkoittaa käytännössä limeä, joten
  koostajan käännösvalinta on perusteltu, ei virhe.
- **R3 (chifa):** chifa < kantonin "syödä riisiä" (hek3 faan6), Calle
  Capón/Barrio Chino yksi läntisen pallonpuoliskon varhaisimmista
  kiinalaiskortteleista, patruunan sukunimen omaksuminen, osallistuminen
  rautatietyöhön ja myöhemmin kumin/riisin/kullan tuotantoon Amazonilla
  — kaikki täsmää sanatarkasti.
- **Jakso 1 (lentokenttä/metro):** uusi terminaali 1.6.2025, ~40 M
  matkustajaa/v vuoteen 2030, Metro-linja 1 valmistui 2010 1970-/
  1990-luvun keskeytysten jälkeen, El Metropolitano 2007 — täsmää.
- **Jakso 2 (maantiede):** Metropolitan Lima 2672,28 km² (825,88 km²/31 %
  kaupunkia, 1846,40 km²/69 % laita-alueita), korkeus merestä jopa
  1550 m, Rímac-joki juomavesi/vesivoima — täsmää sanatarkasti.
- **Jakso 3 (Barranco/Miraflores):** Barranco 1800-luvulla varakkaiden
  kesänviettopaikka (lähde ei erikseen täsmennä "loppupuolella", mutta
  ei ristiriidassa sen kanssa, koska Barranco/San José de Surco
  perustettiin muodollisesti vasta 1874); Miraflores-osan lähdeviite
  virheellinen, ks. kohta B.
- **Jakso 4 (taistelu):** 2.5.1866, Casto Méndez Núñez, Mariano Ignacio
  Prado, José Gálvez Egúsquiza (kuoli, muistetaan sankarina),
  Chincha Islands War 1865–1871 — täsmää (laivaston kohtalo ks. kohta F).
- **Jakso 5 / säätiedot:** 1284 aurinkotuntia/v, elokuu 27,9 h, huhtikuu
  183 h, Lontoo 1653 h, Moskova 1731 h, ennätys 33,4 °C (maalis) — kaikki
  täsmää desimaalin tarkkuudella (koordinaattien lähdeviite ks. kohta C).
- **Osio 4 / kohdekartta:** kaikki yhdeksän koordinaattia täsmäävät
  MediaWiki-rajapintaan desimaalin tarkkuudella; kaikki etäisyydet
  (km-luvut) täsmäävät alle 20 metrin tarkkuudella (kompassisuunnat ks.
  kohta D); "alle kilometrin säteelle" -väite pitää paikkansa myös
  parivälisenä etäisyytenä tarkistettuna (max 0,815 km).
- **Merkkimäärät:** pistokoe kolmelle nostolle (K1, K2, H2) Python-
  skriptillä merkki merkiltä — kaikki täsmäsivät koostajan ilmoittamiin
  lukuihin täsmälleen (655, 588, 656 merkkiä). Koneellinen tarkistus on
  siis luotettava, joskin K2:n merkkimäärä muuttuu kohdan A korjauksen
  myötä.

---

## Yhteenveto korjattavista kohdista

1. **[PAKOLLINEN, virhe] K2:** Poista tai korvaa lähteetön väite
   "Samaan aikaan Meiggs kunnosti puretun muurin ympäristöä ja katuja" —
   ristiriidassa koostajan oman EPÄVARMA-merkinnän kanssa, ei löydy
   mistään lähteestä. Ks. kohta A.
2. **[PAKOLLINEN, lähdevirhe] Jakso 3:** Miraflores-kallioiden ja
   Malecónin lähdeviite "Miraflores District, Lima" on väärä — fakta on
   (ainakin osin) oikein, mutta löytyy "Lima"-artikkelista, ei
   viitatusta artikkelista. Ks. kohta B.
3. **[Tarkennus, lähdevirhe] Osio 5:** Jorge Chávezin koordinaattien
   lähdeviite "Lima (Climate)" on väärä — luku on oikein mutta peräisin
   "Jorge Chávez International Airport" -artikkelista. Ks. kohta C.
4. **[Tarkennus] Osio 4:** Desamparados-asema on todellisuudessa
   koilliseen (ei pohjoiseen) ja Barrio Chino kaakkoon (ei itään) Plaza
   Mayorista — etäisyydet oikein, vain sanalliset suunnat harhaanjohtavia
   kahdessa kohteessa yhdeksästä. Ks. kohta D.
5. **[Tarkennus] H3:** proosa ja fact-laatikko nimeävät neljänneksi
   guano-rahoitteiseksi rakennukseksi eri kohteen (vankila vs. Dos de
   Mayo -sairaala) — molemmat totta, mutta yhtenäistä ennen julkaisua.
   Ks. kohta E.
6. **[Tarkennus] Jakso 4:** "korjauskelvottomana" liioittelee Espanjan
   laivaston kohtaloa — taistelu oli lähteen mukaan ratkaisematon, ja
   laivat korjattiin (eivät olleet korjauskelvottomia). Ks. kohta F.
7. **[Huomio] Sivu A:n johdanto:** rakenteeltaan ja sisällöltään hyvin
   lähellä visan "Pizarro perusti Liman 1535..." -faktaa; ei nosto,
   mutta kannattaa muotoilla etäämmäs ennen julkaisua. Ks. kohta G.

## Vahvistettu erityisen huolella (tehtävänannon painotukset)

- **Kaupunginmuurin purku 1872:** täysin oikein, ei virheitä.
- **Andien radan rakennusvaiheet (1851/1868/1869/1870/1878):** täysin
  oikein joka kohdasta, mukaan lukien kiinalaisten sopimustyöläisten
  kolmas ryhmä nimenomaan tällä radalla.
- **1746-maanjäristyksen uhriluvut:** täysin oikein, mukaan lukien
  koostajan oma RISTIRIITA-merkintä NGDC:n (5941) ja Khlebnikovin
  aikalaistilin (n. 4000 Callaossa) välillä — molemmat luvut vahvistuivat
  sanatarkasti alkuperäislähteistä.
- **Kiinalaiset sopimustyöläiset ja esi-inkakulttuurit:** sanamuodot
  vastaavat hyvin Raamatun Perustuslakia — neutraali historia, ei
  julmuuksien korostusta eikä "kadonneen kansan" -kehystä. Ks. kohta H.
- **Visan suora anto:** neljä/viisi nostoa kiertää visan sanamuodot
  onnistuneesti (ks. faktapohjan oma osio 7.1), mutta Sivu A:n johdanto
  jäi tässä tarkistuksessa lähimmäksi visan sanamuotoa — ks. kohta G.
