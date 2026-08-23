# Montreal-faktapohjan riippumaton tarkistus

Tarkistettu 23.8.2026 en-Wikipedian raakatekstistä (`action=raw`, curl suoraan
— proxy toimi läpinäkyvästi, NODE_USE_ENV_PROXY-kiertoa ei tarvittu)
seuraavista artikkeleista: **Montreal**, Notre-Dame Basilica (Montreal),
Victoria Bridge (Montreal), Port of Montreal, Beaver Club, Mount Royal, Old
Montreal, McGill University, Underground City, Montreal, Place
Jacques-Cartier, Bonsecours Market, Jean-Drapeau Park, Golden Square Mile,
François Dollier de Casson, Stephenson's Rocket, Expo 67. Koordinaatit
haettu MediaWikin `action=query&prop=coordinates`-rajapinnasta kaikille
kymmenelle kohdekartan pisteelle, ja kaikki etäisyydet/suunnat laskettu
itse uudelleen Python-skriptillä samalla kaavalla kuin faktapohja ilmoittaa
käyttäneensä (asteet × 111 km, pituusasteille × cos(45,51°) ≈ 0,701).
Visa tarkistettu tiedostosta `js/packs/northamerica-questions.js` kohdasta
`montreal` (5 kysymystä + facts-taulukon rivi).

**Yleisarvio: faktapohja on erittäin huolellisesti koostettu.** Käytin
tunteja tarkistaen käytännössä jokaisen vuosiluvun, nimen, sitaatin ja
koordinaatin, ja valtaosa — arvioilta 60–70 yksittäistä väitettä — täsmää
lähteisiin sanasta sanaan tai käytännössä sanasta sanaan. Löysin kuitenkin
**yhden todellisen faktavirheen proseteksissä** (sama virhemalli kuin
Astanan tarkistuksessa: prosetesti sanoo eri asiaa kuin koostajan oma
lähdelaatikko), yhden **todennäköisesti väärän vuosiluvun** (1665),
yhden **lähteestä varmistamattoman vuosiluvun** (1763), yhden **karttarajauksen
mittavirheen**, yhden pienen **suuntavirheen**, yhden **virheellisen
redirect-väitteen** (joka ei vaikuta mihinkään nostoon) ja yhden
**sisältölinjauksen riskikohdan** (jakson ja visan tekstien liiallinen
samankaltaisuus). Lisäksi ratkaisin tehtävänannon pyytämän EPÄVARMA-kohdan
(1859, -42 °C).

---

## A. VIRHE proseteessa — MTL2, kuka rakensi Rocket-veturin

**Väite (MTL2, nostoteksti):** "Insinööri Robert Stephenson – höyryveturi
Rocketin rakentajan poika – suunnitteli Victoria-sillan..."

**Ongelma:** Suomennos kääntää lähteen merkityksen päälaelleen. Lähde
(Victoria Bridge -artikkeli) sanoo: "designed by Robert Stephenson (son of
George Stephenson and the builder of the famed Stephenson's Rocket
locomotive)" — molemmat määreet ("Georgen poika" JA "Rocketin rakentaja")
kuvaavat **Robert Stephensonia itseään**. Tarkistin myös "Stephenson's
Rocket" -artikkelin: "''Rocket'' was designed and built by [[Robert
Stephenson]] in 1829" — Robert rakensi Rocketin itse, isä George ei.

Faktapohjan oma lähdelaatikko samalle nostolle sanoo tämän OIKEIN: "Robert
Stephenson (George Stephensonin poika ja Rocket-veturin rakentaja)" — mutta
lopullinen suomenkielinen nostoteksti "höyryveturi Rocketin rakentajan
poika" väittää Robertin olevan jonkun MUUN (siis implisiittisesti isänsä)
rakentaman Rocketin poika, ei itse rakentajaa. Täsmälleen sama
virhekaava kuin Astanan tarkistuksen kohdassa B: koostaja on laskenut/
tarkistanut oikean tiedon lähdelaatikkoon mutta kirjoittanut lopulliseen
tekstiin eri asian.

**Korjaus:** "Insinööri Robert Stephenson – itse Rocket-höyryveturin
rakentaja ja George Stephensonin poika – suunnitteli..." tai vastaava
muotoilu, joka ei käännä isä–poika-suhdetta väärinpäin.

---

## B. Todennäköisesti väärä vuosiluku — H4, katulinjojen vetäminen 1665

**Väite (H4, nostoteksti ja faktalaatikko):** "Ranskalaisen siirtomaa-ajan
seigneurit, sulpitiaanimunkit, vetivät 1665 kaupungin ensimmäiset
katulinjat... Sulpitiaanit toimivat Montrealin saaren seigneureina 1663
alkaen; François Dollier Casson veti saarelle ensimmäisen katuverkon..."

**Ongelma:** "Old Montreal" -artikkelin virke, josta vuosiluku 1665 on
ilmeisesti poimittu, kuuluu: "In 1665, Louis XIV sent 1,200 men from the
Régiment de Carignan-Salières. The Sulpicians organized seigneuries at the
centre of the island. François Dollier Casson established the first grid
of streets in the colony..." — vuosi 1665 on liitetty **Carignan-Salières-
rykmentin saapumiseen**, ei eksplisiittisesti Dollier Cassonin
katulinjoihin; ne mainitaan vasta seuraavassa virkkeessä ilman omaa
vuosilukua. Tarkistin myös erillisen "François Dollier de Casson"
-artikkelin: hän saapui Uuteen Ranskaan vasta **1666**, tuli sulpitiaanien
esimieheksi **1671**, ja artikkelin oma kuvateksti päivää katusuunnitelman
nimenomaisesti: "de Casson's street plan of Montreal, **1672**." Vuonna
1665 Dollier Casson ei siis vielä ollut edes saapunut siirtokuntaan — hän
ei ole voinut vetää katulinjoja sinä vuonna.

**Korjaus:** Vaihda "1665" vuoteen "1672" (tai käytä epätarkempaa
ilmausta, esim. "1670-luvun alussa"), koska 1672 on Wikipedian oma,
eksplisiittinen päiväys katusuunnitelmalle.

---

## C. Lähteestä varmistamaton vuosiluku — H2, luovutus Britannialle 1763

**Väite (H2, faktalaatikko):** "Montreal antautui brittihyökkäykselle 1760
Seitsenvuotisen sodan aikana; siirtomaa luovutettiin virallisesti
Britannialle 1763. — en-Wikipedia 'Montreal'"

**Ongelma:** Haku "Montreal"-artikkelin koko raakatekstistä vuodelle 1763
(myös hakusanoilla "Treaty of Paris" ja "ceded") **ei löytänyt yhtään
osumaa**. Artikkelin ainoa virke aiheesta on: "The Canadian territory was
ruled as a French colony until 1760, when Montreal fell to a British
offensive during the Seven Years' War. The colony then surrendered to
Great Britain." — ei mainitse vuotta 1763 lainkaan. Vuosi 1763 (Pariisin
rauha) on historiallisesti oikea, mutta sitä EI löydy väitetystä
lähteestä. Tämä ei ole sisällöllinen virhe (fakta pitää historiallisesti
paikkansa), mutta viittaus on virheellinen — koostaja on ilmeisesti
täydentänyt yleistiedolla ilman että lähde tukee tarkkaa vuotta.

**Suositus:** Joko poista tarkka vuosiluku 1763 tai vaihda lähdeviite
toiseen artikkeliin (esim. "Articles of Capitulation of Montreal" tai
"Treaty of Paris (1763)"), jos halutaan säilyttää tarkka vuosi.

---

## D. Kohdekartan rajaus — mittavirhe (4 km × 5 km vs. laskettu 4,8 km × 6,1 km)

Laskin bounding boxin kaikista kymmenestä faktapohjan omasta koordinaatista
(samat luvut, jotka jo täsmäävät MediaWiki-rajapintaan, ks. kohta F).
Pohjois–etelä-suunnan ääripäät ovat Montrealin satama (45,5470°N,
pohjoisin) ja Victoria-silta (45,4917°N, eteläisin): ero **6,14 km**, ei
"n. 4–5 km". Itä–länsi-suunnan ääripäät ovat Mont Royal (73,5889°W,
läntisin) ja Jean-Drapeau-puisto (73,5274°W, itäisin): ero **4,78 km**.

Faktapohjan oma väite "Kaikki kymmenen kohdetta mahtuvat n. 4 km × 5 km
alueeseen" pitää siis suuruusluokaltaan paikkansa itä–länsi-suunnassa (4,8
km ≈ 5 km) mutta **aliarvioi pohjois–etelä-suunnan** selvästi (6,1 km, ei
4 km). Syynä on, että Montrealin satama (pohjoisin) ja Victoria-silta
(kaakko) venyttävät aluetta pohjois-etelä-suunnassa enemmän kuin
faktapohja on huomioinut.

**Korjaus:** "n. 5 km × 6 km alueeseen" (itä-länsi × pohjois-etelä), tai
harkitse satamaa/Victoria-siltaa erillisenä laajennuksena samaan tapaan
kuin faktapohja jo käsittelee kohteita 9–10 mahdollisena pudotuksena
(vrt. Astanan tarkistuksen kohta G, jossa vastaava mittavirhe löytyi).

---

## E. Pieni suuntavirhe — kohdekartan taulukko, Notre-Dame-basilika

**Väite (osio 4, taulukko):** "Notre-Dame-basilika | ... | ~0,5 km
lounaaseen"

**Tarkistus:** Laskin bearingin faktapohjan omalla kaavalla (keskipiste
45,5089°N 73,5542°W → basilika 45,5044°N 73,5561°W): etäisyys 0,52 km,
suuntakulma 197° pohjoisesta myötäpäivään. Kahdeksan ilmansuunnan
järjestelmässä (kukin sektori 45°) 197° kuuluu **etelä**-sektoriin
(157,5°–202,5°), ei lounas-sektoriin (202,5°–247,5°) — 197° on 17° etelän
puolella, 28° lounaan puolella. Muut yhdeksän kohteen suuntaa täsmäsivät
kaikki oikein pyöristettynä lähimpään kahdeksasosaan.

**Korjaus:** "~0,5 km etelään" (tai tarkemmalla 16-suunnan asteikolla
"SSW/etelälounaaseen", jos sellaista käytetään). Erittäin pieni virhe eikä
harhaanjohtava kartalla, mutta koska muut yhdeksän täsmäsivät tarkasti,
tämä poikkeaa joukosta.

---

## F. Virheellinen redirect-väite — ei vaikuta mihinkään nostoon

**Väite (faktapohjan johdanto, rivi 4–6):** "kaikki tiedot haettu
en-Wikipediasta... #REDIRECT tarkistettu jokaiselle haetulle otsikolle —
'Underground city' ohjasi sivulle 'Underground City, Montreal'"

**Tarkistus:** Haettuna MediaWikin API:sta `redirects=1`-parametrilla,
"Underground City" (isolla C:llä) ohjautuu artikkeliin **"Underground
city"** (pieni c) — mutta tämä on eri, YLEINEN artikkeli maanalaisten
kaupunkien käsitteestä maailmanlaajuisesti (Fukuokan Tenjin-kuva
avausrivillä), **ei** Montrealin RÉSO:sta kertova "Underground City,
Montreal" -artikkeli. Nämä ovat kaksi eri artikkelia; mitään redirectiä
niiden välillä ei ole. Koostaja on ilmeisesti hakenut Montrealin
maanalaista verkostoa koskevat faktat suoraan oikealla artikkelinimellä
"Underground City, Montreal" (tarkistin: tämä on todellinen, itsenäinen
artikkeli, sisältö täsmää faktapohjan MTL/Jakso 1 -väitteisiin
täydellisesti, ks. kohta F alla) — joten itse nostojen sisältöön tällä ei
ole vaikutusta. Kyse on vain metodologiakuvauksen epätarkkuudesta.

**Suositus:** Poista tai korjaa tämä yksi rivi johdannosta; ei vaadi
muutoksia mihinkään nostoon.

---

## G. Sisältölinjaus — jakson 1 ja visan tekstin liiallinen samankaltaisuus

Faktapohjan osio 7.5 perustelee tietoisesti, miksi RÉSO/maanalainen
kaupunki on siirretty matkaoppaan Jaksoon 1 eikä nostoksi (koska visan
neljäs kysymys koskee samaa aihetta). Perustelu itsessään on järkevä,
mutta vertasin lopullisia tekstejä sanatarkasti:

- **Visan `fact`-kenttä (montreal, kysymys 4):** "Kymmenien kilometrien
  käytäväverkosto yhdistää kauppoja, asemia ja toimistoja. Talvipakkasilla
  keskustassa voi liikkua ulos menemättä."
- **Jakso 1 (matkaopas):** "...kymmeniä kilometrejä lämmitettyjä
  käytäviä, jotka yhdistävät metroasemia, kauppoja ja toimistoja –
  käytännöllinen apu pitkän talven yli."

Näiden kahden virkkeen sanavalinnat ja jopa listausjärjestys ("kauppoja,
[metro]asemia ja toimistoja") ovat lähes identtiset. Vaikka Jakso 1
tekninen sijainti (matkaopas, ei nosto) täyttää kirjaimellisesti
tehtävänannon kiellon ("nosto ei saa antaa visavastausta suoraan"), pelaaja
joka lukee sekä matkaoppaan että pelaa visan, kokee todennäköisesti
saaneensa vastauksen etukäteen lähes samoin sanoin. Tämä ei ole
faktavirhe, vaan sisältölinjausriski samaan tapaan kuin H3:n Central
Park -päätös, jonka koostaja onnistuneesti vältti.

**Suositus:** Muotoile Jakso 1:n käytäväverkosto-lause uudelleen niin,
että se käyttää eri yksityiskohtia (esim. rakennusvuosi 1962 tai
laajuusluku, joita visa ei mainitse) sen sijaan, että toistaa saman
kolmen sanan listan ("kaupat, asemat, toimistot") samassa
järjestyksessä.

---

## H. EPÄVARMA-kohdan ratkaisu — 1859, -42 °C

Tehtävänanto pyysi ratkaisemaan faktapohjan itse merkitsemän
epävarmuuden (osio 7 kohta 6). **Tarkistin ja vahvistin: väite on
suoraan ja tarkasti lainattu Wikipedian omasta tekstistä, jolla on
todellinen, tarkka lähdeviite.**

"Montreal"-artikkelin Climate-osio sanoo sanasta sanaan: "Before modern
weather record keeping (which dates back to 1871 for McGill), a minimum
temperature almost 5 degrees lower was recorded at 7 a.m. on January 10,
1859, where it registered at −42 °C." Lähdeviite on Christopher C. Burt,
''Extreme Weather: A Guide & Record Book'' (W. W. Norton & Company, 2007),
sivu 61 — siis oikea, yksilöity kirjalähde, ei tekoälyn generoima
tekaistu luku. Virallinen Environment Canada -ennätys -37,8 °C (15.1.1957)
on myös vahvistettu samasta osiosta.

**Suositus: PIDÄ luku mukana**, ei tarvitse jättää pois. Faktapohjan oma
muotoilu ("EPÄVARMA historiallinen yksityiskohta") on jo asianmukaisen
varovainen ja erottaa selvästi virallisen ennätyksen (-37,8 °C) ja
tämän vanhemman, ei-virallisen lukeman (-42 °C) toisistaan — tarkkuus on
riittävä eikä lisävarauksia tarvita.

---

## I. Muut tarkistetut ja VAHVISTETUT faktat (ei virheitä)

Näiden ~50 yksittäisen väitteen täsmäsivät lähteisiin sanasta sanaan tai
käytännössä sanasta sanaan:

- **Notre-Dame-basilika (MTL1):** O'Donnell 1824, tavoite 10 000 hengen
  seurakunta, peruskivi 1.9.1824, pyhäkkö 1830, tornit 1841/1843,
  "suurin Pohjois-Amerikassa yli 50 vuotta", julkisivu 1865 kolmine
  patsaineen kuvanveistäjä Henri Bouriché ("ranskalainen kuvanveistäjä" —
  täsmää), Victor Bourgeau + pastori Victor Rousselot 1872–1879,
  Sainte-Chapelle-esikuva — kaikki täsmäävät.
- **Victoria-silta (MTL2, ei koske kohtaa A):** rakennettu 1854–1859,
  Alexander McKenzie Ross, 6 höyrylaivaa, 72 proomua, 3 040 miestä,
  maailman pisin silta valmistuessaan, ensimmäinen koko Saint Lawrencen
  ylittävä, rahtijuna 12.12.1859, matkustajajuna 17.12.1859, Walesin
  prinssi vihki 25.8.1860 kuningatar Viktorian sijaisena, alkuperäinen
  putkirakenne Englannista laivattua takorautaa — kaikki täsmäävät.
- **Montrealin satama (MTL3):** Harbour Commission 1830, Lachine-kanava
  1825, arkistomerkintä 28.5.1872: 70 alusta / 21 valtamerihöyrylaivaa /
  n. 53 769 tonnia, n. 1 600 km sisämaassa Atlantilta, lyhyin suora reitti
  Keskilännestä Eurooppaan — kaikki täsmäävät.
- **Beaver-klubi (MTL4):** perustettu 1785 skotlantilaisten
  turkkikauppiaiden toimesta, illalliset klo 16, ruffelit ja kultanauha,
  koskenlaskun jäljittely hiilihangoilla/lattialla, Kultaisen neliömailin
  rakentaminen alkoi 1850-luvulta (täsmää sekä Beaver Club- että
  Montreal-artikkeliin) — täsmää.
- **H1 (Ville-Marien perustaminen):** Maisonneuve 17.5.1642, Jeanne Mance
  sairaala, irokeesihyökkäykset 1643, väkiluku alle 50 ennen syksyn 1653
  100 uutta siirtolaista, 1685 mennessä 600 asukasta ja turkkikaupan
  keskus — kaikki täsmäävät sanasta sanaan.
- **H2 (hallitsijanvaihdos):** antautuminen 1760 Seitsenvuotisessa sodassa
  (vuosi 1763 ks. kohta C), kaupunkistatus 1832, Lachine-kanava + Victoria-
  silta rautatiesolmuna, "vuoteen 1860 mennessä Brittiläisen
  Pohjois-Amerikan suurin kaupunki" — täsmää.
- **H3 (Mont Royal Park):** puistotoive vuodesta 1857, ensimmäinen
  sitoumus maan ostoon 1868, Olmsted-suunnittelu, avajaiset 24.5.1876,
  Panic of 1873 -lama söi rahoituksen, ajotie hätäisesti ilman
  kasvillisuussuunnitelmaa — täsmää. Central Park -vertaus on aidosti
  artikkelissa ja tietoisesti jätetty pois — vahvistettu perusteltu
  ratkaisu.
- **H4 (kaupungintalo, ks. myös kohdat A ja B):** François Dollier Casson
  veti Rue Notre-Dame/Saint-Paul/Saint-Jacques -kadut, kaupungintalo
  jesuiittapuutarhan paikalla 1873, viereen jäi Place Vauquelin — perusfaktat
  täsmäävät (ks. kohta B tarkasta vuosiluvusta).
- **Jakso 1 (maanalainen kaupunki):** RÉSO alkoi 1962 Place Ville Marien
  yhteydessä, maailman laajimpia jalankulkijaverkostoja (Guinness),
  metro avattiin 1966, kumipyöräiset junat hiljaisempia — täsmää (ks.
  kuitenkin kohta G sisältölinjauksesta).
- **Jakso 2 (Vanha Montreal):** yksi Pohjois-Amerikan vanhimmista
  kaupunkialueista, 1600-luvun rakennuksia, historiallinen alue 1964,
  kohouotie/moottoritiehanke torjuttiin 1960-luvun alussa (huom: "1900-
  luvun puolivälissä" faktapohjan Jakso 2 -proseteessa on hieman löysä
  ilmaus — lähteen mukaan liikenneongelma oli "mid-20th century" mutta
  itse pelastusaloite ja hankkeen torjunta ajoittuvat nimenomaan "early
  1960s"; ei nostettu omaksi virhekohdakseen, koska kyse on vain
  epätarkasta ajanmääreestä, ei väärästä faktasta).
- **McGill-yliopisto (Jakso 4):** peruskirja 31.3.1821 kuningas Yrjö
  IV:ltä, James McGillin testamenttilahjoitus (Burnside-tila + £10 000),
  Ranska Montrealin peruskirjan mukainen virallinen kieli, 85,7 %
  sujuvasti ranskaa puhuvia, 58,5 % kaksikielisiä — kaikki täsmäävät.
- **Sää (osio 5):** heinäkuun keskilämpö 26–27 °C, tammikuu -10,5…-9 °C,
  lumisade n. 210 cm marras–maaliskuu, sademäärä n. 1000 mm,
  aurinkotunnit n. 2050 h/v, Köppen Dfa/Dfb, virallinen pakkasennätys
  -37,8 °C (15.1.1957), kesäennätys 37,6 °C (1.8.1975) — kaikki
  täsmäävät (ks. kohta H epävirallisesta 1859-lukemasta).
- **Väestönlaskenta 1871:** 130 022 asukasta — täsmää tarkalleen.
- **Redirect-tarkistukset:** "Parc Jean-Drapeau" → "Jean-Drapeau Park"
  vahvistettu MediaWiki-rajapinnasta; "Notre-Dame Street (Montreal)"
  palauttaa todella 404:n (vahvistin curlilla) — molemmat faktapohjan
  väitteet pitävät paikkansa (ks. kuitenkin kohta F "Underground city"
  -redirect-väitteestä, joka EI pidä paikkaansa).
- **Osio 7 taustatiedot (ei käytetty nostoissa, mutta tarkistin silti):**
  Expo 67 -rakentaminen alkoi 13.8.1963 elokuun 13. päivänä ("Construction
  started on August 13, 1963"), 10–12 % täytöstä metron kaivuumailta, De
  Gaullen "Vive le Québec Libre" -puhe 24.7.1967 Montrealin
  kaupungintalolla — kaikki täsmäävät.

---

## J. Kohdekartan koordinaatit ja etäisyydet — itse laskettuna

Haettiin MediaWikin `action=query&prop=coordinates&redirects=1`
-rajapinnasta kaikki kymmenen kohdetta suoraan (ei Wikidatan kautta).
Kaikki koordinaatit täsmäävät faktapohjan taulukkoon neljän desimaalin
tarkkuudella:

| # | Kohde | Faktapohja | API (`prop=coordinates`) | Täsmää? |
|---|---|---|---|---|
| 1 | Montreal (keskipiste) | 45,5089°N 73,5542°W | 45,5089°N 73,5542°W | Kyllä |
| 2 | Notre-Dame-basilika | 45,5044°N 73,5561°W | 45,5044°N 73,5561°W | Kyllä |
| 3 | Place Jacques-Cartier | 45,5079°N 73,5530°W | 45,5079°N 73,5530°W | Kyllä |
| 4 | Bonsecours-markkinahalli | 45,5089°N 73,5514°W | 45,5089°N 73,5514°W | Kyllä |
| 5 | Victoria-silta | 45,4917°N 73,5291°W | 45,4917°N 73,5291°W | Kyllä |
| 6 | Mont Royal | 45,5064°N 73,5889°W | 45,5064°N 73,5889°W | Kyllä |
| 7 | Montrealin satama | 45,5470°N 73,5300°W | 45,5470°N 73,5300°W | Kyllä |
| 8 | McGillin yliopisto | 45,5050°N 73,5775°W | 45,5050°N 73,5775°W | Kyllä |
| 9 | Place Ville Marie | 45,5015°N 73,5684°W | 45,5015°N 73,5684°W | Kyllä |
| 10 | Jean-Drapeau-puisto | 45,5095°N 73,5274°W | 45,5095°N 73,5274°W | Kyllä (redirect vahvistettu) |

Etäisyydet (oma haversine/tasokoordinaattilasku samalla kaavalla kuin
faktapohja): kaikki täsmäävät ±0,05 km faktapohjan lukuihin. Suunnat
täsmäävät yhdeksässä kohteessa kymmenestä (ks. kohta E poikkeamasta
Notre-Dame-basilikan kohdalla).

---

## Yhteenveto korjattavaksi ennen julkaisua

1. **A-kohta (Rocket-veturin rakentaja, MTL2 proseteksti) — korjattava.**
   Selvä faktavirhe pelaajalle näkyvässä tekstissä.
2. **B-kohta (1665 → 1672, H4) — suositellaan korjattavaksi.**
   Todennäköisesti väärä vuosiluku, hyvin perusteltu korjausehdotus.
3. **C-kohta (1763, H2) — suositellaan poistettavaksi tai
   uudelleenlähteistettäväksi.** Ei löydy väitetystä lähteestä, vaikka
   fakta on historiallisesti oikea.
4. **D-kohta (kartan rajaus 4×5 km → 5×6 km) — korjattava** ennen kuin
   kuvakäsikirjoitus lukitaan kartan mittasuhteisiin.
5. **E-kohta (Notre-Dame-suunta lounas → etelä) — pieni korjaus,** ei
   kiireellinen.
6. **F-kohta (Underground city -redirect-väite) — poista yksi
   virkkeenosa johdannosta,** ei vaikuta sisältöön.
7. **G-kohta (Jakso 1 vs. visa -samankaltaisuus) — suositellaan
   uudelleenmuotoilua** kirjoitusvaiheessa.
8. **H-kohta (1859, -42 °C) — EI tarvitse muuttaa,** vahvistettu
   luotettavaksi lähteestä.

Kaikki muu (kohta I, yli 50 erillistä väitettä) on vahvistettu oikeaksi.
