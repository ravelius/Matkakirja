# Toronto-faktapohjan riippumaton tarkistus

Tarkistettu 23.8.2026 en-Wikipedian raakatekstistä (`action=raw`,
`NODE_USE_ENV_PROXY=1`, uusinnat kasvavalla viiveellä — sama 429-ilmiö kuin
faktapohja mainitsee, korjaantui jokaisella haulla) seuraavista artikkeleista:
**Toronto**, York, Upper Canada, St. Lawrence Hall, St. Lawrence Market,
Distillery District, CN Tower, Fort York, Toronto Purchase, Mississaugas of
the Credit First Nation, **Wabakinine**, **Peter Jones (missionary)**,
**Harry LaForme** (kolme viimeistä eivät ole faktapohjan omalla
lähdelistalla, mutta suoraan A4-noston aiheita ja helposti löydettävissä),
Great Fire of Toronto (1904), Old City Hall (Toronto), Casa Loma, Toronto
Islands, Toronto subway. Koordinaatit haettu itse MediaWiki-rajapinnasta
(`prop=coordinates`, redirects=1); Distillery Districtin koordinaatti
vahvistettu suoraan Wikidatasta (Q934422, P625). Etäisyydet ja
ilmansuunnat laskettu itse (haversine + bearing, Node).

**Yleisarvio: koostaja on tehnyt huolellista työtä, ja valtaosa numeroista,
päivämääristä ja koordinaateista täsmää lähteisiin sanatarkasti** — kaikki
kymmenen kohdekartan koordinaattia, väestönlaskennan luvut (56 092 / 1871 ja
86 415 / 1881), koko säätaulukko, merkkimäärät kaikissa 15 tekstissä
(johdannot + 12 nostoa) sekä lähes kaikki Toronto Purchase- ja
MCFN-yksityiskohdat. Löysin kuitenkin **kaksi todellista pakollista
virhettä** — molemmat juuri sitä tyyppiä, jota tehtävänanto erikseen
varoitti: nosto sanoo eri asian kuin mitä lähde (tai jopa nosto itse
laskettuna) tukee. Lisäksi kaksi **suositeltavaa korjausta** A4-nostoon
liittyen (Harry LaForme, Wabakinine) ja muutama pienempi tarkennus.
Alkuperäiskansat-sivuehdotus arvioitiin erikseen lopussa (kohta F).

---

## A. PAKOLLINEN VIRHE — Jakso 3: "1850-luvun tulipalo" vs. oma fact-box "vuoden 1849 suurpalo"

**Väite (Jakso 3, proosa):** "St. Lawrence Marketin juuret ulottuvat
vuoteen 1803... Toinen pysyvä markkinarakennus nousi 1831, ja nykyinen
eteläinen markkinahalli seurasi **1850-luvun tulipalon** jälkeen."

**Faktapohja sanoo (sama jakson oma fact-box, kaksi riviä alempana):**
"Toinen pysyvä markkinarakennus valmistui 1831; **vuoden 1849 suurpalon**
jälkeen alueelle rakennettiin uusi markkinahalli Front Streetin varrelle,
ensimmäinen virallisesti St. Lawrence Market -nimeä kantanut rakennus."

**Lähde sanoo:** "The Great Fire of Toronto in **1849** caused the
northern portions of this building to be pulled down, leading to the
building of the current St. Lawrence Market in 1850 a block south..." —
en-Wikipedia "St. Lawrence Market" (History). Tulipalo oli siis 1849 —
1840-lukua, ei 1850-lukua. Tämä on juuri sitä tehtävänannon varoittamaa
virhettä: sama fakta on kirjoitettu kahdella tavalla parin rivin sisällä,
proosa ja sen oma laatikko ovat ristiriidassa keskenään, ja vain toinen
niistä (laatikko) on oikein.

**Korjaus:** "1850-luvun tulipalon jälkeen" → "vuoden 1849 suurpalon
jälkeen" (tai "1840-luvun lopun tulipalon jälkeen"). Merkkimäärä
tarkistettava korjauksen jälkeen.

---

## B. PAKOLLINEN VIRHE — A4: "Sata vuotta myöhemmin Peter Jones" on väärä väli

**Väite (A4, proosa):** "Päällikkö Wabakinine kuoli vuonna 1796...
**Sata vuotta myöhemmin** Peter Jones (Kahkewāquonāby), päällikkö ja
metodistipappi, toimi kansansa puolestapuhujana..."

**Faktapohja sanoo (oma fact-box):** Fact-box ei toista "sata vuotta"
-väitettä lainkaan — se vain kertoo, että "Peter Jones (Kahkewāquonāby)
oli päällikkö ja metodistipappi", ilman ajallista suhdetta Wabakinineen.
Väite on siis proosan oma lisäys, jota edes koostajan oma laatikko ei tue.

**Lähde sanoo:** Peter Jones syntyi 1.1.1802 ja kuoli 29.6.1856
(en-Wikipedia "Peter Jones (missionary)", infobox). Hän kääntyi
metodistiksi ja aloitti saarnaajan uransa 1823, ja hänet valittiin
Credit-lähetysaseman päälliköksi 1829. Wabakinine kuoli elokuussa 1796.
Vuosien 1796 ja Jonesin uran alun (1823) välissä on siis noin **27
vuotta**, ja Wabakininen kuoleman ja Jonesin oman kuoleman (1856) välissä
noin **60 vuotta** — ei missään laskutavassa "sata vuotta".

**Korjaus:** "Sata vuotta myöhemmin" → esim. "Reilut kolme vuosikymmentä
myöhemmin" (osuu Jonesin kääntymykseen 1823) tai poista aikamääre
kokonaan ja korvaa esim. "Seuraavan sukupolven aikana". Merkkimäärä
tarkistettava korjauksen jälkeen.

---

## C. Suositeltava korjaus — A4: Harry LaForme "johti" TRC:tä vain n. neljä kuukautta ennen eroaan

**Väite (A4, proosa ja fact-box, sama muotoilu molemmissa):** "Harry
LaForme, joka toimi muutoksenhakutuomarina ja **johti** Kanadan totuus- ja
sovintokomissiota (Truth and Reconciliation Commission of Canada)."

**Lähde sanoo:** LaForme nimitettiin komission ensimmäiseksi
puheenjohtajaksi keväällä/kesällä 2008, mutta **erosi 20.10.2008**
vedoten muiden komissaarien "insubordinaatioon" — ennen kuin komissio oli
pitänyt yhtään kuulemistilaisuutta. ("...as the Chair of the Royal
Commission on Aboriginal Land Claims; and – until his resignation in
October 2008 – as head of the Indian Residential Schools Truth and
Reconciliation Commission." — en-Wikipedia "Harry LaForme".) Komission
tunnettu työ — vuosien kuulemiset ja 94 toimenpidesuositusta — tehtiin
vasta 2009–2015 tuomari **Murray Sinclairin** johdolla, ei LaFormen.

**Ongelma:** Väite ei ole teknisesti väärä (LaForme todella oli komission
ensimmäinen puheenjohtaja), mutta ilman eroamismainintaa se antaa
harhaanjohtavan kuvan siitä, että LaForme olisi johtanut sen tunnetun,
vuosia kestäneen työn. MCFN:n oma Wikipedia-artikkeli toistaa saman
lyhennetyn muotoilun ("served as head of the Truth and Reconciliation
Commission of Canada") ilman erohuomautusta, joten kyse on
Wikipedia-artikkelien välisestä epätarkkuudesta, ei koostajan omasta
virheestä — mutta koostaja ei tarkistanut LaFormen omaa
elämäkerta-artikkelia, joka kertoo asian täsmällisemmin.

**Miksi tämä on tärkeä juuri tässä faktapohjassa:** Raamatun pilari 3
("nykyiset itsehallinnolliset kansat, ei romantisointia eikä liioittelua")
koskee myös sitä, ettei kansan jäsenten todellisia saavutuksia liioitella
tai vääristetä — LaFormen kunnia kuuluu oikeasti sille, että hän oli
ensimmäinen alkuperäiskansataustainen valitustuomari Kanadassa, ei
sovintokomission työlle, josta hän vetäytyi ennen sen alkua.

**Suositus:** Joko lisää eromaininta ("...ensimmäisenä puheenjohtajana
totuus- ja sovintokomissiossa, josta hän erosi jo muutaman kuukauden
kuluttua) tai korosta hänen kiistatonta ensimmäisyyttään
(muutoksenhakutuomarina) ja jätä TRC-maininta pois/lyhyemmäksi.

---

## D. Suositeltava tarkennus — A4: Wabakinine kuoli Yorkissa, ei "matkalla Yorkista"

**Väite (A4, proosa ja fact-box):** "Päällikkö Wabakinine kuoli vuonna
1796 **matkalla Yorkista** suojellessaan sisartaan..."

**Lähde (oma nimikkoartikkeli) sanoo:** Wabakinine oli matkalla **Yorkiin**
myymään lohta ("travelling to York, Upper Canada, to sell salmon"),
leiriytyi joukkoineen niemekkeelle, ja isku tapahtui yöllä leirissä —
kuolinpaikka oli lähellä nykyistä St. Lawrence Marketia, siis Yorkin
alueella, ei matkalla pois sieltä. — en-Wikipedia "Wabakinine"

**Ongelma:** Faktapohjan lähteenä käytetty MCFN-artikkelin
tiivistelmälause ("died en route from York, Upper Canada... protecting
his sister") on epätarkka verrattuna Wabakininen omaan, yksityiskohtaisempaan
elämäkerta-artikkeliin, joka perustuu Dictionary of Canadian Biography
-lähteeseen. Tämä on Wikipedia-sisäinen ristiriita kahden artikkelin
välillä; tarkempi lähde on luotettavampi.

**Suositus:** "matkalla Yorkista" → esim. "matkallaan Yorkiin lohta
myymään" tai yksinkertaisesti "Yorkissa".

---

## E. Pienemmät tarkennukset (ei pakollisia)

1. **Jakso 1 — subway 1954 -väitteen lähdeviite ei osu kohdalleen.**
   Fact-box viittaa "en-Wikipedia 'Toronto' (Incorporation and
   development)" -osioon, mutta tuo osio ei mainitse vuotta 1954 eikä
   sanaa "ensimmäinen" lainkaan. 1954-avaus ja "Canada's first subway"
   löytyvät artikkelista "Toronto subway", ei "Toronto"-artikkelin
   Incorporation-osiosta. Lisäksi "Pohjois-Amerikan kolmanneksi
   vilkkaimmin käytetty kaupunkiliikennejärjestelmä" koskee
   "Toronto"-artikkelissa koko TTC:tä (bussit + raitiovaunut + metro
   yhteensä), kun taas "Toronto subway" -artikkeli sanoo pelkän metron
   olevan "busiest rapid transit system **in Canada**" — eri väite, eri
   mittakaava. Jakson lause yhdistää nämä kaksi lähdettä yhdeksi
   virheellisesti metroon kohdistetuksi väitteeksi. Itse tosiasiat (1954,
   ensimmäinen Kanadassa) ovat oikein, vain lähdeviite ja tarkka kohde
   ovat epätarkkoja — suositellaan uudelleenlähteistystä artikkeliin
   "Toronto subway", jos tekstiä käytetään sellaisenaan.
2. **H3:n ruutivarasto-yksityiskohta on oikein mutta väärässä
   lähdeosiossa.** Fact-box viittaa "Toronto" (Town of York 1793–1834)
   -osioon väitteelle "brittijoukot räjäyttivät perääntyessään
   ruutivarastonsa" — tämä osio ei mainitse ruutivarastoa lainkaan (vain
   parlamenttirakennusten polton ja Washingtonin poltolla vastaamisen).
   Yksityiskohta on kyllä totta ja tarkistettu artikkelista "Fort York"
   ("...to rig the fort's gunpowder magazine to explode to prevent its
   capture" — komentaja Sheaffen käsky), mutta oikea lähdeviite olisi
   "Fort York" tai "Battle of York", ei "Toronto" (Town of York
   -osio).
3. **Osion 7 kohta 1 on itsensä kanssa ristiriidassa "yli 30 vuotta"
   -sanamuodosta.** Faktapohja väittää: "T4... eikä toista visan lukuja
   (yli 500 m, yli 30 vuotta) sellaisenaan." Tämä ei pidä paikkaansa: T4
   päättyy juuri sanoihin "...ja piti ennätystä **yli 30 vuotta** ennen
   kuin Burj Khalifa ohitti sen 2007" — sama sanamuoto kuin visan
   fact-tekstissä ("...oli maailman korkein vapaasti seisova rakennelma
   **yli 30 vuotta**"). Kyse ei ole visan kysymyksen suorasta annosta
   (T4 ei käsittele torn ia maamerkkinä eikä lasilattiaa), mutta
   itsearviointi osiossa 7 on tosiasiallisesti virheellinen tältä osin.
   Suositus: joko muotoile T4:n loppu toisin (esim. "yli 30 vuotta"  →
   "aina vuoteen 2007 asti") tai korjaa osion 7 huomio vastaamaan
   todellisuutta.
4. **Kohdekartan ilmansuunnat: kolme yhdeksästä on pyöristetty yhden
   pykälän verran karkeammaksi.** Laskin itse kaikki yhdeksän etäisyyttä
   ja suuntaa (keskipisteenä Old City Hall / Toronto, 43,6525°N
   79,38167°W):

   | Kohde | Koostajan luku | Oma laskelma | Ilmansuunta (oma) |
   |---|---|---|---|
   | Fort York | ~2,3 km lounaaseen | 2,33 km | SW (täsmää) |
   | St. Lawrence Hall | ~0,8 km itään | 0,80 km | **ESE**, ei E |
   | St. Lawrence Market South | ~0,9 km kaakkoon | 0,90 km | **ESE**, ei SE |
   | Union Station (1858) | ~0,9 km etelään | 0,88 km | S (täsmää) |
   | CN Tower | ~1,2 km etelään | 1,19 km | **SSW**, ei S |
   | Distillery District | ~1,8 km itään | 1,78 km | E (täsmää) |
   | Toronto Islands | ~3,5 km etelään | 3,53 km | S (täsmää) |
   | Casa Loma | ~3,6 km luoteeseen | 3,62 km | NW (täsmää) |
   | MCFN (New Credit 40A) | ~92,4 km lounaaseen | 92,78 km | SW (täsmää) |

   Kaikki etäisyydet täsmäävät alle 400 metrin tarkkuudella (koostajan
   yksinkertaistettu asteet×111 km -menetelmä on luotettava). Ei vaadi
   korjausta, mutta jos ilmansuuntia käytetään sanallisesti kartan
   legendassa, tarkemmat muodot (itäkaakko, itäkaakko, etelälounas)
   olisivat täsmällisempiä.
5. **T3: "Vuonna 2001 uudet omistajat muuttivat... kortteliksi" telescopoi
   kaksi eri vuotta yhdeksi.** Alue ostettiin 2001, mutta
   jalankulkualueeksi muutettu, yleisölle avattu kokonaisuus valmistui
   ja avattiin vasta 22.5.2003 — tämän oma fact-box kertoo oikein.
   Proosan "vuonna 2001... muuttivat" on lievä yksinkertaistus, ei
   suoranainen virhe (osto ja muutosprosessi todella alkoivat 2001),
   mutta lukija voisi ymmärtää koko muutoksen valmistuneen jo silloin.

---

## F. Muut tarkistetut ja VAHVISTETUT faktat (ei virheitä)

- **T1:** Simcoe perusti Yorkin 1793, siirsi pääkaupungin Newarkista
  (Niagara-on-the-Lake), koska paikka oli helpommin puolustettavissa;
  Fort Yorkin varuskunta sataman suulla; asutus Parliament/Front-kadun
  risteyksen tienoilla; mohawkinkielinen tkaronto ("puita seisoo
  vedessä"), alun perin Lake Simcoen/Couchichingin kapeikko — kaikki
  täsmää sanatarkasti "Toronto"- ja "York, Upper Canada" -artikkeleihin.
- **T2:** 19.4.1904 tulipalo, yli 100 rakennusta, ~10 387 000 CAD
  vahingot, ainoa uhri John Croft; 1849 suurpalo edelsi St. Lawrence
  Hallia — täsmää sanatarkasti. "70 vuotta" (1834→1904) laskettu oikein.
- **T3:** Gooderham and Worts perustettu 1832, kivirakennus 1859–1861,
  maan suurin viskitehdas, vienti pääosin maailmanmarkkinoille sataman
  kautta; tuotanto päättyi 1990; ostettu 2001, avattu 22.5.2003; 13
  eekkeriä, yli 40 rakennusta, Pohjois-Amerikan laajin säilynyt
  viktoriaaninen teollisuusarkkitehtuurikokonaisuus, NHS-status 1988 —
  kaikki täsmää.
- **T4 (tarkistettu erityisen huolella):** rakentaminen alkoi 6.2.1973,
  553,3 m (arkkitehtoninen korkeus), ennätys 31.3.1975 kesken
  rakennustyön, ennätys Burj Khalifaan asti 2007 — kaikki täsmää
  sanatarkasti "CN Tower" -artikkeliin.
- **H1:** wendat-kansa, Haudenosaunee 1648–1650, kaksi kylää 1660-luvulla
  (Ganatsekwyagon/Bead Hill Rouge-joella, Teiaiagon Humber-joella),
  mississaugat syrjäyttivät haudenosauneet vuoteen 1701 mennessä (Beaver
  Wars), Fort Rouillé 1750–1759 — kaikki täsmää.
- **H2/A2 (Toronto Purchase, tarkistettu erityisen huolella):** syyskuu
  1787, 250 808 eekkeriä, 2 000 piikiveä, 24 messinkikattilaa, 120
  peiliä, 24 (nauhoitettua) hattua, kangaspakka, 96 gallonaa rommia;
  1805 indenture, ei yksikään alkuperäisistä päälliköistä elossa; 2010
  sovinto 145 milj. CAD, ~1 700 jäsentä, 20 000 CAD/jäsen — täsmää
  sanatarkasti.
- **H3:** Yorkin taistelu 1813, Yhdysvaltain joukot valtasivat ja
  ryöstivät kaupungin, parlamenttirakennusten polttaminen, myöhempi
  Washingtonin poltto kostona; York → City of Toronto 6.3.1834;
  William Lyon Mackenzie ensimmäinen pormestari, johti 1837 kapinan —
  kaikki täsmää (ks. kohta E.2 lähdeviitteestä).
- **H4:** 1849 suurpalo, St. Lawrence Hall 1850–51, arkkitehti William
  Thomas, tuhannen istumapaikan juhlasali ("thousand-seat ballroom"),
  John A. Macdonald ja George Brown puhuivat siellä, 1870-luvulla
  merkitys väheni, entisöitiin täysin 1967 Kanadan satavuotisjuhlaan,
  National Historic Site samana vuonna — täsmää sanatarkasti.
- **A1:** MCFN, ojibwenkielinen nimi Mazina'iga-ziibing
  Misi-zaagiwininiwag, New Credit 40A (2 392,6 ha) Hagersvillen
  lähellä Six Nations of the Grand Riverin naapurissa — täsmää.
- **A3:** nimenmuutos 8.1.2019, maaliskuu 2025: 30 milj. CAD ennakko
  (Treaties 22/23, 1820, ~4 427 ha), samaan aikaan 183,4 milj. CAD
  sovintoesitys Rouge River Valley Tractista (~52 082 ha),
  neuvottelut alkaneet 2015 — täsmää sanatarkasti.
- **Amalgamaatio (Jakso 4):** 1.1.1998, kuusi kuntaa (East York,
  Etobicoke, North York, Scarborough, York, entinen Toronto) →
  yksi kaupunki, pääministeri Mike Harris, maaliskuun 1997
  kansanäänestyksessä yli 3/4 vastusti, ei sitova — täsmää sanatarkasti.
- **Jakso 2 (topografia):** 76,5 m (rantaviiva) – 209 m (York University,
  Keele/Steeles), Toronto ravine system, Don- ja Humber-joet, Glacial
  Lake Iroquois, Scarborough Bluffs — täsmää sanatarkasti.
- **Jakso 3 (St. Lawrence Market, pl. kohta A):** julkinen tori 1803,
  toinen pysyvä rakennus 1831 — täsmää.
- **Jakso 5 / Säätiedot (tarkistettu erityisen huolella):** Köppen Dfa
  (oli lähempänä Dfb:tä ennen 1900-lukua kaupungin lämpösaarekkeen
  vuoksi), sademäärä 822,7 mm/v (oma summaus kuukausiarvoista: 822,8 mm
  — täsmää pyöristysvirheen sisällä), lumi 121,5 cm/v, auringonpaiste
  2 066 h eli 45 % (28 % joulukuu – 60 % heinäkuu), ennätyskuumin
  40,6 °C (8.–10.7.1936), ennätyskylmin −32,8 °C (10.1.1859),
  kasvillisuusvyöhyke 7a — **jokainen luku täsmää lähteeseen
  desimaalin tarkkuudella.**
- **Väestö:** 1871 = 56 092, 1881 = 86 415 — täsmää täsmälleen
  "Toronto"-artikkelin Historical populations -taulukkoon.
- **Kaikki kymmenen kohdekartan koordinaattia** (mukaan lukien
  Distillery Districtin Wikidata-koordinaatti Q934422/P625 ja MCFN:n
  New Credit 40A) **täsmäävät MediaWiki-rajapintaan/Wikidataan
  sanatarkasti** — ei yhtään virhettä.
- **Merkkimäärät:** tarkistin Python-skriptillä kaikki kolme johdantoa
  ja kaikki kaksitoista nostoa merkki merkiltä — **kaikki 15 tekstiä
  täsmäävät koostajan ilmoittamiin lukuihin täsmälleen** (esim. T1 =
  569, H2 = 625, A4 = 541 merkkiä). Koneellinen tarkistus on siis
  luotettava.
- **Tekninen perustelu `alkuperaiskansat`-sivulle vahvistettu:**
  `js/ui-apurit.js`:n `AIHE_IKONIT`-taulussa ei ole `alkuperaiskansat`-
  aihetta (piirtyisi yleiskuvakkeella "muu", kuten koostaja väittää), ja
  `js/packs/maa-kategoriat.js`:ssä sivu-id `alkuperaiskansat` on jo
  käytössä (Australia, rivi 26002) — ei ennenkuulumaton ratkaisu.
- **Visan suora anto:** neljä nostoa (T4/CN Tower, H1–H3 historia) eivät
  anna minkään viiden visakysymyksen (väkirikkain kaupunki, Niagara, CN
  Tower, 150+ kieltä, laivaväylä) vastausta suoraan – vahvistettu, pl.
  kohta E.3:n "yli 30 vuotta" -sanamuotohuomautus.

---

## Yhteenveto korjattavista kohdista

1. **[PAKOLLINEN] Jakso 3:** "1850-luvun tulipalon" → "vuoden 1849
   suurpalon" — proosa ja oma fact-box ovat suoraan ristiriidassa, ja
   fact-box on oikeassa. Tarkista merkkimäärä korjauksen jälkeen.
2. **[PAKOLLINEN] A4:** "Sata vuotta myöhemmin Peter Jones..." on väärä
   aikaväli — Wabakininen kuolemasta (1796) Jonesin uran alkuun (1823)
   on ~27 vuotta, kuolemaan (1856) ~60 vuotta, ei koskaan sata. Väitettä
   ei tue edes koostajan oma fact-box. Korjaa aikamääre. Tarkista
   merkkimäärä.
3. **[Suositellaan] A4:** Harry LaFormen TRC-johtajuus kaipaa
   eromaininnan (erosi 20.10.2008 ennen kuulemisia) — muuten
   harhaanjohtava pilari 3:n hengessä.
4. **[Suositellaan] A4:** "matkalla Yorkista" → Wabakinine oli matkalla
   *Yorkiin* (myymässä lohta) ja kuoli siellä, ei matkalla pois
   sieltä — koostajan oma nimikkoartikkeli täsmentää MCFN-artikkelin
   epätarkan tiivistelmän.
5. **[Tarkennus] Jakso 1:** subway-1954-väitteen lähdeviite osoittaa
   väärään "Toronto"-artikkelin osioon; oikea lähde on "Toronto
   subway" -artikkeli, ja "kolmanneksi vilkkain NA:ssa" koskee koko
   TTC:tä, ei pelkkää metroa.
6. **[Tarkennus] H3:** ruutivarasto-yksityiskohta on oikein mutta väärin
   lähdeviitattu ("Toronto" Town of York -osio ei mainitse sitä;
   oikea lähde "Fort York").
7. **[Tarkennus] Osio 7 kohta 1:** väittää virheellisesti, ettei T4
   toista visan "yli 30 vuotta" -sanamuotoa — T4:n oma loppulause
   käyttää juuri sitä sanamuotoa.
8. **[Tarkennus] Kohdekartta:** kolme yhdeksästä ilmansuunnasta (St.
   Lawrence Hall, St. Lawrence Market South, CN Tower) pyöristetty yhden
   pykälän verran karkeammaksi kuin laskettu suunta; etäisyydet kaikki
   oikein.
9. **[Tarkennus] T3:** "Vuonna 2001... muuttivat kortteliksi" telescopoi
   2001 (osto) ja 2003 (avaus yleisölle) yhdeksi vuodeksi; oma fact-box
   on täsmällinen.

## Vahvistettu erityisen huolella (tehtävänannon painotukset)

- **Toronto Purchase / 1805 indenture (H2/A2):** kaikki luvut ja
  esineluettelo täsmäävät sanatarkasti — ei virheitä.
- **CN Tower -aikajana (T4):** kaikki neljä päivämäärää/lukua täsmäävät
  täydellisesti — ei virheitä.
- **1904 ja 1849 suurpalot (T2, Jakso 3, H4):** päivämäärät, vahingot ja
  uhriluku oikein; ainoa virhe on Jakso 3:n "1850-luku"-kirjoitusvirhe
  (kohta A).
- **Alkuperäiskansat-sivuehdotus:** tekninen perustelu (AIHE_IKONIT,
  sivu-idn precedent) vahvistettu koodista; sisältö on pääosin vahvasti
  pilarin 3 mukainen (nykyinen itsehallinto, aktiiviset maanvaatimukset,
  kansan oma näkökulma korostuu A1–A3:ssa) — mutta A4:n kaksi
  yksityiskohtaa (LaForme, Wabakinine) kaipaavat tarkennusta, koska ne
  koskettavat juuri sitä, mistä pilari 3 varoittaa: kansan jäsenten
  todellisten saavutusten ja tapahtumien tarkkaa, ei liioiteltua
  esittämistä.
- **Visan suora anto:** ei yhtään täyttä osumaa; yksi lievä
  sanamuotoläheisyys (T4:n "yli 30 vuotta", kohta E.3) on mainitsemisen
  arvoinen mutta ei vakava, ja se ristiriidassa vain koostajan oman
  itsearvioinnin kanssa, ei sinänsä visan kanssa.
- **Koordinaatit ja etäisyydet:** kaikki kymmenen koordinaattia ja kaikki
  yhdeksän etäisyyttä täsmäävät — ainoa huomautus koskee kolmea
  pyöristettyä ilmansuuntaa (kohta E.4), ei etäisyyksiä itsessään.
