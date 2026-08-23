# Vancouver-faktapohjan riippumaton tarkistus

Tarkistettu 23.8.2026 en-Wikipedian raakatekstistä (`action=raw`, `NODE_USE_ENV_PROXY=1`,
uusinnat kasvavalla viiveellä — sama 429-ilmiö kuin faktapohja mainitsee, korjaantui
jokaisella haulla) seuraavista artikkeleista: **Vancouver**, Hastings Mill, Gastown,
**Great Vancouver Fire**, Canadian Pacific Railway, Granville Island, Port of Vancouver,
Musqueam First Nation, Squamish Nation, Tsleil-Waututh First Nation, Canada Line,
SkyTrain (Vancouver), Vancouver Stock Exchange, **Vancouver Fire and Rescue Services**
(ei faktapohjan omalla lähdelistalla — löytyi tarkistuksen sivutuotteena, ks. kohta A).
Koordinaatit haettu itse MediaWiki-rajapinnasta (`prop=coordinates`, redirects=1) ja
etäisyydet/suunnat laskettu itse (haversine + bearing, Node). "MST Development
Corporation" -haku vahvistettiin 404:ksi uudestaan.

**Yleisarvio: koostaja on tehnyt erittäin huolellista työtä.** Lähes kaikki numerot,
päivämäärät, nimet ja koordinaatit täsmäävät lähteisiin sanatarkasti — mukaan lukien
kaikki yhdeksän kohdekartan koordinaattia, koko säätaulukko ja Musqueam/Squamish-osion
oikeusprosessikuvaukset. Löysin kuitenkin yhden todellisen **asiavirheen**
(palokunnan perustamisajankohta, jota myös faktapohjan oma lähdelaatikko toistaa
väärin), yhden selvän **laskuvirheen** (suurpalon ja kaupungin perustamisen väli) ja
muutaman pienemmän tarkennuksen. Alkuperäiskansat-sivuehdotus arvioitiin erikseen
lopussa (kohta E) — se on linjassa Raamatun pilarin 3 kanssa.

---

## A. VIRHE — VC2: "Kaupunki perusti heti oman palokunnan" palon jälkeen

**Väite (VC2, nosto ja fact-laatikko):** "Kaupunki perusti heti oman palokunnan ja
rakensi tuhkasta uudelleen, tällä kertaa tiilestä." Fact-laatikko: "Palon jälkeen
perustettiin kaupungin ensimmäinen palokunta, ja ensimmäiset tiilirakennukset
nousivat pian tuhon jälkeen. — en-Wikipedia 'Great Vancouver Fire'"

**Ongelma:** Palokunta EI syntynyt palon jälkeen — se oli olemassa jo ENNEN paloa.
"Great Vancouver Fire" -artikkeli itse sanoo: "The inaugural meeting of the Vancouver
Volunteer Hose Company No.1 was held May 28, 1886" — siis 16 päivää ennen 13.6.1886
paloa. Sama artikkeli listaa palon JÄLKEISET toimet erikseen: "The city's first police
force was set up, its first brick buildings were built, and its first fire engine was
brought in from the nearby larger town of New Westminster" — tässä listassa on
poliisilaitos ja palo­ **kalusto** (yksi ruisku), ei palokunnan perustaminen.

Kolmas artikkeli, "Vancouver Fire and Rescue Services" (ei faktapohjan lähdelistalla,
mutta suoraan aiheeseen liittyvä ja helposti löydettävissä Vancouver-artikkelin
sisäisestä linkistä), vahvistaa tämän eksplisiittisesti: "The Vancouver Volunteer Fire
Brigade was established in 1886 with one volunteer hose-wagon company... **and within
16 days of its existence, the city of Vancouver burned to the ground.** A week after
the fire the city purchased its first fire engine from Ontario, the item arrived in
August of that year..."

Eli: palokunta on 16 päivää VANHEMPI kuin suurpalo, ei sen seurausta. Se mitä
tapahtui palon jälkeen, oli poliisilaitoksen perustaminen ja ensimmäisen palokaluston
(yhden ruiskun) hankinta — ei itse palokunnan synty. Tämä on nimenomaan sitä väärää
syy-seuraussuhdetta, jota koostaja itse ei huomannut, koska sekä nostoteksti ETTÄ
sen oma fact-laatikko toistavat saman virheen (ei siis pelkkä proosa-vs-laatikko-
ristiriita kuten Astana-mallissa, vaan koostaja on lukenut lähteen liian nopeasti
molempiin paikkoihin).

**Lisähuomio — Wikipedia-sisäinen ristiriita ensimmäisen palokaluston alkuperästä:**
"Great Vancouver Fire" väittää ruiskun tulleen New Westminsteristä; "Vancouver Fire
and Rescue Services" väittää sen ostetun Ontariosta (saapui elokuussa 1886). Näitä ei
voi molempia käyttää faktana — jos kirjoittaja haluaa mainita palokaluston alkuperän,
suosittelen jättämään sen mainitsematta tai merkitsemään epävarmaksi, koska kaksi
Wikipedia-artikkelia ovat suoraan ristiriidassa.

**Suositus:** Muotoile VC2:n viimeinen virke uudelleen, esim. "Kaupungin vasta
kaksi viikkoa aiemmin perustettu vapaaehtoispalokunta sai tulikokeensa heti, ja
kaupunki rakensi tuhkasta uudelleen, tällä kertaa tiilestä." — tai pudota
palokunta-maininta kokonaan, jos tarkka muotoilu ei mahdu merkkimäärään.

---

## B. VIRHE — H3: "Suurpalo tuhosi kaupungin jo kuuden viikon kuluttua"

**Väite (H3):** "Granvillen kaupunki sai 6. huhtikuuta 1886 nimen Vancouver ja
itsehallinnon... Suurpalo tuhosi kaupungin jo kuuden viikon kuluttua..."

**Ongelma:** 6.4.1886 → 13.6.1886 on **68 päivää**, ei kuutta viikkoa (42 päivää).
68 päivää on lähes **kymmenen viikkoa** (68/7 ≈ 9,7 viikkoa), eli suurpalo tapahtui
noin kaksi ja puoli kuukautta kaupungin perustamisen jälkeen. Molemmat päivämäärät
(6.4. ja 13.6.) ovat itsessään oikein ja lähteiden mukaisia — kyse on koostajan
välilaskusta, joka on mennyt pieleen samaan tapaan kuin Astana-tarkistuksessa
löytyneet B-kohdan luku-lipsahdukset.

**Suositus:** "kuuden viikon" → "noin kymmenen viikon" (tai "parin ja puolen
kuukauden"). Kannattaa tarkistaa merkkimäärä uudelleen muutoksen jälkeen.

---

## C. Tarkennus — kohdekartan osio 4: itsestään ristiriitainen rajausvirke

**Väite (osio 4, rajausehdotus):** "Kahdeksan ensimmäistä kohdetta mahtuvat n. 3,5 km
× 5 km alueeseen keskustan ja Gastownin ympärillä... mutta kohde 8 (Musqueamin varaus
2, Fraser-joen suulla) on n. 8 km länteen..."

**Ongelma:** Kohde 8 taulukossa ON juuri Musqueamin varaus 2 — se ei siis voi
samaan aikaan kuulua "kahdeksaan ensimmäiseen", jotka mahtuvat tiiviiseen alueeseen,
JA olla 8 km päässä erillään. Tarkistin laskemalla itse bounding boxin kohteille
1–7 ja 9 (eli kaikki PAITSI Musqueam): pohjois-eteläsuunnassa n. 4,35 km,
itä-länsisuunnassa n. 3,26 km — lähellä koostajan lukuja, mutta näihin kuuluu kohde
9 (Port of Vancouver), ei kohde 8.

**Suositus:** Muotoile esim. "Seitsemän ensimmäistä kohdetta ja kohde 9 mahtuvat..."
tai "Kahdeksan yhdeksästä kohteesta (kaikki paitsi kohde 8, Musqueamin varaus 2)
mahtuvat...". Itse etäisyys- ja pinta-ala-arviot ovat oikein, kyse on vain siitä,
mitkä kohteet numero viittaa.

---

## D. Tarkennus — kompassisuunnat osiossa 4 (etäisyydet oikein, suunnat pyöristetty)

Laskin itse kaikki yhdeksän etäisyyttä ja kompassisuuntaa (haversine + bearing,
samat koordinaatit kuin koostaja):

| Kohde | Koostajan luku | Oma laskelma | Kompassisuunta (oma) |
|---|---|---|---|
| Gastown | ~2,7 km pohjoiseen | 2,66 km | N (täsmää) |
| Hastings Mill | ~3,1 km koilliseen | 3,12 km | **NNE**, ei NE |
| Suurpalon paikka | ~2,5 km pohjoiseen | 2,49 km | N (täsmää) |
| Canada Place | ~3,1 km pohjoiseen | 3,10 km | N (täsmää) |
| Granville Island | ~1,8 km luoteeseen | 1,84 km | NW (täsmää) |
| Stanley Park | ~4,7 km luoteeseen | 4,75 km | **NNW**, ei NW |
| Musqueamin varaus 2 | ~8,0 km länteen | 8,06 km | **WSW**, ei W |
| Port of Vancouver | ~3,0 km pohjoiseen | 3,02 km | N (täsmää) |

Kaikki etäisyydet täsmäävät alle 100 metrin tarkkuudella — koostajan yksinkertaistettu
menetelmä (asteet × 111 km, pituusasteille × cos 49,26° ≈ 0,6537) on luotettava.
Kolme kompassisuuntaa (Hastings Mill, Stanley Park, Musqueamin varaus 2) on
kuitenkin pyöristetty yhden pykälän verran karkeammaksi kuin todellinen suunta —
ei harhaanjohtavaa kartalla, mutta ei myöskään tarkkaa. Ei vaadi korjausta, mutta
jos kartan legenda tai teksti mainitsee ilmansuunnat sanallisesti, kannattaa
käyttää tarkempia muotoja (koillinen → pohjoiskoillinen, luode → pohjoisluode,
länsi → lounaisempi länsi/WSW).

**Musqueamin varaus 2:n koordinaatti vahvistettu:** faktapohja siteeraa "Musqueam
First Nation" -artikkelia, mutta artikkelin MediaWiki-rajapinta (prop=coordinates)
EI palauta koordinaattia tälle sivulle — koska kyseessä ei ole artikkelin
ensisijainen (infobox-)koordinaatti vaan leipätekstin sisällä oleva erillinen
`{{coord}}`-malline: `{{coord|49|14|00|N|123|13|00|W|name=Musqueam Indian Reserve
2}}` (rivi 116 raakatekstissä). 49°14′00″N = 49,2333°, 123°13′00″W = 123,2167° —
täsmää koostajan lukuun täydellisesti. Ei virhe, mutta hyvä tietää miksi
rajapintahaku ei suoraan löytänyt sitä.

---

## E. Alkuperäiskansat-sivuehdotus ja Raamatun pilari 3 — arvio

Sivu C (`alkuperaiskansat`) ja sen neljä nostoa (A1–A4) arvioitiin erikseen pilarin 3
("nykyiset itsehallinnolliset kansat, ei menneisyyden kuriositeetti; ei romantisointia
eikä säälittelyä") kannalta.

**Tekninen perustelu vahvistettu:** Tarkistin `js/ui-apurit.js`:n `AIHE_IKONIT`-taulun
— siinä on 11 valmista aihetta (historia, kuvataide, kirjallisuus, musiikki, ruoka,
luonto, tiede, nykytaide, huumori, elama, muu), eikä `alkuperaiskansat` ole niiden
joukossa, joten se piirtyisi todella yleiskuvakkeella "muu" kuten koostaja väittää.
Lisäksi `js/packs/maa-kategoriat.js`:n Oseania-osiosta löytyy maininta, että
`alkuperaiskansat`-sivu-id on jo käytössä toisella mantereella (Australia) — sivu-idn
uudelleenkäyttö ei siis ole ennenkuulumaton ratkaisu.

**Sisältöarvio — pilari 3 täyttyy hyvin:**
- A1 (nimistö) käsittelee kieltä ja nimeämistä neutraalisti ja kunnioittavasti, ei
  eksotisoiden.
- A2 (Musqueam) painottaa NYKYISTÄ hallintoa (bändineuvosto, päällikkö Wayne Sparrow),
  taloudellista valtaa (Musqueam Capital Corporation, kiinteistöomistus) ja UBC:n
  nykyistä tunnustusta (54 katukylttiä 2018) — ei pelkkää menneisyyttä, ei säälittelyä.
- A3 (Sen̓áḵw) mainitsee historiallisen vääryyden (1913 pakkomyynti) rehellisesti
  mutta kehystää sen AKTIIVISENA oikeustaisteluna, joka päättyi kansan voittoon
  (maan palautus) — juuri pilarin edellyttämä toimijuuden näkökulma, ei uhrikertomus.
- A4 (2010-olympialaiset) esittää neljä kansaa tasavertaisina isäntinä VANOCin rinnalla
  ja nykyistä yritystoimintaa (Takaya Tours) — vahvistaa nykyisyyttä.

En löytänyt yhtäkään kohtaa, joka romantisoisi tai säälittelisi. Sisältölinjaus
(osio "Sisältölinjaus" faktapohjan alussa ja johdanto) on sanamuodoiltaan täsmällinen:
"omat hallintonsa, omat maansa ja oma osuutensa kaupungin nykyisyydestä, eivät vain
sen menneisyydestä" — tämä on juuri pilarin 3 hengen mukainen muotoilu, ei tarvitse
korjata.

**Yksi pieni tarkennusehdotus (ei virhe):** A3:n nostoteksti sanoo "pitkä
oikeusprosessi päättyi sovintoon" — tarkistin Squamish Nation -artikkelista: "This led
to court rulings AND a landmark settlement" — eli kyseessä oli sekä oikeuden
päätöksiä ETTÄ lopullinen sovinto, ei pelkkä sovinto. Koostajan muotoilu on
riittävän tarkka tälle mahdolle, mutta jos kirjoittaja haluaa täsmällisemmän
sanan valita, "oikeusprosessi johti tuomioihin ja lopulta sovintoon" olisi
täsmällisempi.

---

## F. Muut tarkistetut ja VAHVISTETUT faktat (ei virheitä)

Näiden täsmäävyys tarkistettiin suoraan lähdeartikkeleista sanatarkasti tai
käytännössä sanatarkasti:

- **VC1:** Edward Stamp, Hastings Mill 1867, epäonnistunut Brockton Point -yritys
  (virtaukset ja karikko); "Gassy" Jack Deighton, Yorkshiren merikapteeni, tavernaa
  1867; Moodyville (1863) "dry town" -status ja sen miehistöjen viihdehaku
  Gastownista — kaikki täsmää sanatarkasti "Gastown"-artikkelin muotoiluun asti.
- **VC3 (rautatien aikajana, tarkistettu erityisen huolella):** 1884 Granvillen
  valinta päätepisteeksi Port Moodyn/New Westminsterin/Victorian sijaan — täsmää.
  6.4.1886 Granvillen liittäminen kaupungiksi nimellä Vancouver, nimen antoi Van
  Horne George Vancouverin kunniaksi — täsmää. 4.7.1886 ensimmäinen mannertenvälinen
  juna Port Moodyhin keskipäivällä — täsmää ("Canadian Pacific Railway" -artikkeli).
  23.5.1887 ensimmäinen virallinen juna Vancouveriin, rata ollut käytössä jo kolme
  kuukautta — täsmää sanatarkasti. **Koko rautatien aikajana on siis oikein**, eikä
  ristiriitaa VC3:n omien lähteiden välillä ole, toisin kuin faktapohjan osio 7.4
  varovaisesti epäilee — kaksi lähdettä (Vancouver/Early growth ja Canadian Pacific
  Railway) täydentävät toisiaan, eivät ole ristiriidassa.
- **Suurpalo 13.6.1886 (tarkistettu erityisen huolella):** kaksi maanraivaustulta
  (veturitalli + kaupunkilaajennus), kuiva sää + mereltä puhaltava tuuli, 600–1000
  rakennusta, ≥21 kuollutta, useimmat pakenivat Burrard Inletin/False Creekin
  rantaan — kaikki täsmää sanatarkasti. (Palokunta-kohta ks. yllä, kohta A.)
- **VC4/Port of Vancouver:** 141 miljoonaa tonnia, 3,5 miljoonaa TEU-konttia, yli 170
  taloutta, Kanadan suurin ja Pohjois-Amerikan neljänneksi suurin satama tonnimäärässä
  — täsmää infoboksin lukuihin ja leipätekstiin sanatarkasti. Vancouver Fraser Port
  Authority 2008, kolmen viranomaisen (Port of Vancouver, North Fraser Port
  Authority, Fraser River Port Authority) yhdistyminen — täsmää. "Jäätön ympäri
  vuoden" -väite: en löytänyt tälle mitään Wikipedia-lähdettä missään
  tarkistamassani artikkelissa — koostajan oma epävarmuusmerkintä on siis
  perusteltu, ei liioiteltu varovaisuus.
- **H1:** 8000–10 000 vuotta, Squamish/Musqueam/Tsleil-Waututh-kylät Stanley
  Parkissa/False Creekillä/Kitsilanossa/Point Greyssä/Fraser-joen suulla, Narváez
  1791, George Vancouver 1792 (Burrard Inlet, brittiläiset nimet), Simon Fraser 1808
  — kaikki täsmää. (George Vancouver 1792 -lause on tarkalleen ottaen "Etymology"-
  osiossa, ei "Before 1850" -osiossa kuten fact-laatikko merkitsee — pieni
  osioviittausvirhe, ei sisältövirhe.)
- **H2:** Fraser-kultaryntäys 1858, 25 000+ miestä, New Westminster perustettu
  14.2.1859, McCleeryn tila 1862 (nykyinen Marpole, Musqueam-kylän itäpuolella),
  Moodyville 1863, Hastings Mill 1867, Granville-nimi 1870 lordi Granvillen mukaan
  — kaikki täsmää.
- **H3:** 6.4.1886 nimeäminen ja itsehallinto samana vuonna kuin ensimmäinen
  mannertenvälinen juna; 3.5.1886 ensimmäinen kaupunginvaltuuston vaali, Malcolm
  MacLean pormestariksi; väkiluku 1000 (1881) → 20 000+ (vuosisadan vaihde) →
  100 000 (1911) — kaikki täsmää sanatarkasti. (Kuuden viikon virhe ks. kohta B.)
- **H4:** CPR:n talousvalta ja suurin maanomistaja/rakennuttaja; kaupallinen
  liikenne kaupungin suurin elinkeinosektori 1930-luvulla; Vancouver Stock
  Exchange kyseenalaisesta maineestaan, Forbes 1989 "scam capital of the world",
  sulautuminen Alberta Stock Exchangeen 1999 — kaikki täsmää sanatarkasti (viimeinen
  kohta on itse asiassa "20th century" -osiossa, ei "Urban planning" -osiossa kuten
  fact-laatikko merkitsee — jälleen vain osioviittausvirhe, ei sisältövirhe).
  Puukylästä (Hastings Mill 1867) pörssikaupungiksi (VSE perustettu 1906) on 39
  vuotta — "alle neljässäkymmenessä vuodessa" täsmää tarkalleen.
- **A1:** K'emk'emeláy̓ ("paikka jossa kasvaa paljon vaahteroita"), Sea to Sky
  Highwayn kyltit; hən̓q̓əmin̓əm̓-kielessä ei yhtä nimeä koko kaupungille — täsmää
  sanatarkasti "Vancouver"-artikkelin Etymology-osioon.
- **A2:** Musqueam vähintään 4000 vuotta, Marpolen kuoppakeko; Musqueam-julistus
  10.6.1976, rajat Howe Soundista Fraser-joen etelähaaraan; nykyinen päällikkö
  Wayne Sparrow, Musqueam Capital Corporation; UBC:n 54 katukylttiä 2018 — kaikki
  täsmää sanatarkasti.
- **A3:** Squamish Nation heinäkuu 1923, Indian Act § 17; Sen̓áḵw-oikeustaistelu
  vuodesta 1977, 1913 pakkomyynti, ~11,7 eekkeriä palautettiin — täsmää sanatarkasti.
  **MST Development Corporationin ristiriitainen vuosi vahvistettu:** Musqueam-
  artikkeli sanoo 2016, Squamish-artikkeli sanoo 2017 — koostajan "2010-luvun
  puolivälissä" on juuri oikea ratkaisu tähän. "MST Development Corporation"
  -artikkelin puuttuminen (404) vahvistettu uudestaan.
- **A4:** Squamish, Musqueam, Tsleil-Waututh, Lil'wat "Four Host First Nations",
  VANOC, 14/20 lajia pääosin Whistlerissä — täsmää. Chief Dan George, näyttelijä ja
  alkuperäiskansojen oikeuksien puolestapuhuja, TWN:n tunnetuin jäsen — täsmää.
  Takaya Tours, TWN:n melontamatkailu — täsmää.
- **Jakso 1 (Canada Line/SkyTrain):** suunnitteluvaatimus enintään 25 min
  Waterfrontista lentokentälle (RFP-vaiheessa 24 min) — täsmää molemmat luvut
  tarkalleen. SkyTrain Kanadan pisin pikaraitiotiejärjestelmä 2016 alkaen, ja
  tuolloin myös maailman pisin automaattinen — täsmää, samoin maininta ennätyksen
  siirtymisestä muualle (Shanghai ym.) myöhemmin.
- **Jakso 2 (maantiede):** Burrard Peninsula, Burrard Inlet pohjoisessa, Fraser-joki
  etelässä, Georgian salmi lännessä Vancouver Islandin suojaamana; North Shore
  Mountains, Mount Baker näkyvissä kaakossa kirkkaalla säällä — täsmää sanatarkasti.
- **Jakso 3 (Granville Island):** 1915 ruoppaustäyttö, alkuperäisnimi Industrial
  Island; liittovaltion (CMHC) hallintaan 1972; Public Market 1979, vanha
  konepajarakennus muunnettu — täsmää sanatarkasti.
- **Jakso 4 (Canada Place/Expo 86):** Canada Place alun perin Kanadan paviljonki
  Expo 86:een, sisältää Convention Centren, Pan Pacific -hotellin, risteilyterminaalin
  — täsmää. "SkyTrain"-nimi syntyi Expo 86:n aikana kohoradan vuoksi — täsmää.
- **Jakso 5 / säätiedot:** Köppen Cfb (rajautuen Csb:hen), sademäärät 1588 mm
  (keskusta) / 1189 mm (lentokenttä/Richmond) / 2044 mm (Pohjois-Vancouver),
  heinä-elokuun päivälämpö n. 22 °C (30 °C harvoin), sataa vain joka viidentenä
  päivänä heinä-elokuussa, ennätyskuumin 35,0 °C **kaupungin sisällä**
  (31.7.1965/8.8.1981/29.5.1983 — erillään lentokentän 34,4 °C:n [30.7.2009]
  ennätyksestä, jota koostaja ei virheellisesti sekoittanut näihin), ennätyskylmin
  −17,8 °C (14.1.1950 ja 29.12.1968), lumi 9 pv/vuosi (3 pv ≥5 cm), keskimäärin
  38,1 cm/vuosi — **jokainen luku täsmää lähteeseen desimaalin tarkkuudella.**
- **Merkkimäärät:** tarkistin Python-skriptillä kaikki johdannot ja pistokokeena
  puolet nostoista (VC1–4, H3) merkki merkiltä — kaikki täsmäävät koostajan
  ilmoittamiin lukuihin täsmälleen (esim. VC1 = 509, VC3 = 555, H3 = 455 merkkiä).
  Koneellinen tarkistus on siis luotettava.

---

## Yhteenveto korjattavista kohdista

1. **[Virhe] VC2:** "Kaupunki perusti heti oman palokunnan" palon jälkeen on väärin
   — palokunta (Vancouver Volunteer Hose Company No. 1) perustettiin 28.5.1886, 16
   päivää ENNEN 13.6.1886 paloa. Palon jälkeen kaupunki sai poliisilaitoksen ja
   ensimmäisen palokaluston (ei uutta palokuntaa). Koostajan oma fact-laatikko
   toistaa saman virheen — ei ole huomattu proosan ja laatikon välillä, vaan koko
   käsitys palon ja palokunnan järjestyksestä on väärä. Korjaa nosto.
2. **[Virhe] H3:** "kuuden viikon kuluttua" → oikea väli 6.4.–13.6.1886 on 68 päivää
   eli noin **kymmenen viikkoa**, ei kuusi. Korjaa luku ja tarkista merkkimäärä
   uudelleen.
3. **[Tarkennus] Osio 4, rajausvirke:** "kahdeksan ensimmäistä" -ilmaus on
   itsestään ristiriitainen, koska kohde 8 on juuri se Musqueam-kohde joka
   mainitaan poikkeuksena. Täsmennä sanamuoto (ks. kohta C).
4. **[Tarkennus] Osio 4, kompassisuunnat:** kolme suuntaa (Hastings Mill NNE,
   Stanley Park NNW, Musqueamin varaus 2 WSW) on pyöristetty karkeammiksi kuin
   todellinen laskettu suunta — etäisyydet itsessään ovat kaikki oikein.
5. **[Tarkennus] H1 ja H4 fact-laatikoiden osioviittaukset:** George Vancouver
   1792 -tieto on Etymology-osiossa, ei Before 1850 -osiossa; Forbes/pörssi-tieto on
   20th century -osiossa, ei Urban planning -osiossa. Sisältö on molemmissa oikein,
   vain osion nimi on väärä — ei kiireellinen, mutta helppo korjata jos lähde­
   viitteitä käytetään sellaisenaan julkaisussa.
6. **[Ei virhe, huomio] VC4:n läheisyys visan vastaukseen:** "Kanadan suurimpana...
   satamana" on lähellä visan "maan vilkkain satama" -vastausta ydinväitteeltään
   (vaikka sanavalinta ja tarkat luvut eroavatkin). Ei suoraa lainausta, mutta
   kirjoittaja voi halutessaan etäännyttää sanamuotoa vielä hieman, esim. korostamalla
   enemmän numeroita (141 Mt, 3,5 M konttia) kuin sanaa "suurin".

## Vahvistettu erityisen huolella (tehtävänannon painotukset)

- **Rautatien aikajana (1884/1886/1887):** kaikki neljä päivämäärää (1884 päätös,
  6.4.1886 nimeäminen, 4.7.1886 ensimmäinen mannertenvälinen juna Port Moodyhin,
  23.5.1887 ensimmäinen juna Vancouveriin) täsmäävät lähteisiin täydellisesti — **ei
  virheitä**, eikä lähteiden välillä ole todellista ristiriitaa.
- **Vuoden 1886 suurpalo:** päivämäärä, syyt, tuhon laajuus (600–1000 rakennusta,
  ≥21 kuollutta) täsmäävät kaikki — **ainoa virhe on palokunnan ajoitus** (kohta A).
- **Alkuperäiskansat-sivuehdotus:** vahvasti pilarin 3 mukainen, ei romantisointia
  eikä säälittelyä; tekninen perustelu (AIHE_IKONIT, sivu-idn precedent) vahvistettu
  koodista.
- **Visan suora anto:** neljä nostoa aiheista (satama, vuoret, olympialaiset)
  välttävät visan sanamuodon onnistuneesti; sademetsä-aihetta ei käytetty ollenkaan,
  kuten koostaja itse totesi. Yksi lievä läheisyys (satama, kohta 6 yllä) on
  mainitsemisen arvoinen mutta ei vakava.
