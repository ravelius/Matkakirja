# Lima — faktakoostaja, uusi kaupunkilehti (E-Amerikan lauta)

Lauta-id `southamerica`, kaupunki-id `lima`, maa PER, en-Wikipedia "Lima"
(ellei toisin mainita). Kaikki tiedot haettu en-Wikipediasta **23.8.2026**
(`action=raw` + `action=query&prop=coordinates`-API, NODE_USE_ENV_PROXY=1),
ei yhtään 429-vastausta koosteen tekohetkellä. Malli ja mitat luettu
tiedostoista `docs/aasia-tyoaineisto/lehtityo-resepti.md` (SITOVA
yleisresepti), `docs/mantereet-tyoaineisto/spec-mantereet.md` (SITOVA
E-Amerikan erityisohje) ja `docs/moduulit/kaupunkilehti.md`, sekä
esimerkkinä Vancouverin faktapohjasta
(`docs/mantereet-tyoaineisto/faktapohja-vancouver.md`). Kaupungin
kulttuurivisa on tarkistettu tiedostosta `js/packs/southamerica-questions.js`
(kohta `lima`, viisi kysymystä: Peru pääkaupunkina, garúa-sumuilmasto,
Tyynimeri, ceviche, kylmän merivirran ja Andien selitys sateettomuudelle) —
näistä kolme aihetta (Peru/pääkaupunki, sumuilmasto, ceviche) koskettavat
myös tätä faktapohjaa, mutta jokainen nosto käyttää tarkempia lukuja tai
toista näkökulmaa kuin visan lyhyt vastaus (ks. osio 7, kohta 1). En
kirjoittanut lehtitekstejä valmiiksi peliin, en ladannut kuvia enkä
koskenut js/packs-tiedostoihin — kaikki alla on raaka-ainetta
kirjoittajalle ja riippumattomalle tarkistajalle.

**Sisältölinjaus** (spec-mantereet.md + Raamattu, Perustuslaki): siirtomaa-
aika kerrotaan neutraalina historiana — ei hallinnon oikeutuksena eikä sen
vastustuksena. Inka- ja esi-inkakulttuurit (Ichma, Lima-kulttuuri, Wari,
Pachacamacin pyhäkkö, Huaca Pucllana) kuvataan kunnioittavasti omana
korkeakulttuurinaan, ei "kadonneen kansan" kehyksessä. Isoisän 1873-
vierailun aikaan Lima eli kolmea samanaikaista murrosta, jotka kaikki
näkyvät alla: **guanobuumin** loppuvaiheessa kertynyt julkinen varallisuus,
**Andien-rautatien** rakennustyömaa (louhinta ja raiteenlasku käynnissä
juuri 1873), ja **vanhankaupungin** arkkitehtuuri, joka oli suurelta osin
1746 maanjäristyksen jälkeistä jälleenrakennusta. Vuosina 1849–1874 Peruun
tuotujen kiinalaisten sopimustyöläisten kohtalo (ks. osio 2, H4) kerrotaan
suoraan lähteen mukaisesti, mutta ilman yksityiskohtien korostusta — sama
periaate kuin orjuuden kerronnassa muualla pelissä (esim. Rion
faktapohjassa). Köyhyyttä ei estetisoida: 1870-luvun vaurauden epätasainen
jakautuminen todetaan tosiasiana (H3) ilman kurjuuskuvastoa. War of the
Pacific (1879–1883) ja sitä seuranneet tapahtumat (mm. Chilen miehitys,
myöhemmät kiinalaisvastaiset väkivaltaisuudet 1880-luvulla) rajautuvat
tietoisesti tämän koosteen ulkopuolelle: ne tapahtuivat isoisän matkan
jälkeen eivätkä siksi kuulu 1873-painotukseen — ks. osio 7, kohta 6.

---

## 1. Sivuehdotukset

### Sivu A — id `kaupunki`, nimi "Lima"

**Johdanto (222 merkkiä):**

> Francisco Pizarro perusti Liman 1535 Rímac-joen aavikkolaaksoon, ja
> siitä kasvoi Espanjan Etelä-Amerikan hallinnon pääkaupunki. Sumuinen,
> sateeton ilmasto ja vuosisatojen kerrostumat tekevät siitä
> kerroksellisen kaupungin.

### Sivu B — teemasivu, ehdotettu id `historia`, nimi "Historia"

**Perustelu valinnalle:** Lima on ainoa E-Amerikan pilottikaupunkien
joukossa, jonka aineisto tarjoaa suoran, kolmiosaisen 1873-kulman
(guanotalous, rautatierakennus, siirtomaa-arkkitehtuurin jälleen-
rakennus) yhden ja saman kaupungin sisällä — Rio käsittelee orjuutta,
Buenos Aires siirtolaisuutta, mutta Limassa isoisän matkavuosi osuu
kirjaimellisesti keskelle käynnissä olevaa rautatietyömaata. `historia`-
sivu kantaa tämän kronologian kaupunkisivun neljää nostoa syvemmälle.

**Johdanto (203 merkkiä):**

> Liman historia alkoi kauan ennen espanjalaisia. Ciudad de los Reyes
> koki maanjäristyksiä, guanobuumin ja isoisän matka-aikaan käynnissä
> olleen rautatierakennuksen, joka ulotti radan Andien vuorille asti.

### Sivu C — teemasivu, ehdotettu id `ruoka`, nimi "Ruoka"

**Perustelu valinnalle:** `ruoka` on vakioaihe (AIHE_IKONIT), ja Lima on
poikkeuksellisen vahva kohde sille — kaupunki tunnetaan nykyään koko
Amerikan mantereen gastronomisena pääkaupunkina, ja aineisto kytkeytyy
suoraan historiasivun kiinalaisiin sopimustyöläisiin (chifa-keittiö)
sekä isoisän aikakauden siirtolaisuuteen ilman että sisältö toistuu.

**Johdanto (201 merkkiä):**

> Lima tunnetaan nykyään Amerikan mantereen gastronomisena
> pääkaupunkina, mutta ruokakulttuurin juuret ulottuvat siirtomaa-ajan
> sekoittumiseen ja 1800-luvun kiinalaisten sopimustyöläisten
> perintöön asti.

---

## 2. Kaksitoista nostoehdotusta (4 + 4 + 4)

### Sivu `kaupunki` — 4 nostoa

**Nosto K1 — "Loppiaisen kaupunki" (655 merkkiä)**

> Francisco Pizarro perusti kaupungin Rímac-joen laaksoon 6. tammikuuta
> 1535 ja nimesi sen loppiaisen kunniaksi Ciudad de los Reyes,
> "Kuninkaiden kaupungiksi". Pizarro mittasi omin käsin Plaza Mayorin ja
> koko ruutukaavan avustajineen ja laski itse tuomiokirkon peruskiven.
> Espanjalainen nimi jäi virallisiin asiakirjoihin, mutta arkikielessä
> kaupunki tunnettiin pian nimellä Lima – nimi juontuu joko ketšuan
> sanasta limaq, "puhuja", viitaten laakson kuuluisaan oraakkeliin, tai
> aimaran sanoista lima-limaq, "keltainen kukka". Kaupunki rakennettiin
> Taulichuscon, paikallisen kuraakan, mailla; tämän palatsin paikalla
> seisoo nykyään Perun hallituksen palatsi.

Faktat ja lähteet:
- Pizarro perusti kaupungin Rímac-joen laaksoon 6.1.1535 nimellä Ciudad
  de los Reyes (Kuninkaiden kaupunki), koska perustamispäätös osui
  loppiaiseen. — en-Wikipedia "Lima" (Etymology, Founding)
- Pizarro mittasi Nicolás de Riberan, Diego de Agüeron ja Francisco
  Quinteron kanssa Plaza Mayorin ja kaupungin ruutukaavan itse sekä
  laski tuomiokirkon peruskiven omin käsin. — en-Wikipedia "Lima"
  (Founding)
- Nimen "Lima" alkuperästä on kaksi kilpailevaa selitystä: ketšuan
  limaq ("puhuja", Rímac-laakson oraakkelin nimi) tai aimaran
  lima-limaq ("keltainen kukka"). — en-Wikipedia "Lima" (Etymology),
  "Historic Centre of Lima" (History)
- Kaupunki perustettiin paikallisen kuraakan Taulichuscon maille; tämän
  palatsin paikalla on nykyinen Government Palace of Peru, ja Puma Inti
  -temppelin paikalla nykyinen tuomiokirkko. — en-Wikipedia "Lima"
  (Precolonial)

**Nosto K2 — "Muuri joka kaatui rautatien tieltä" (588 merkkiä)**

> Merirosvojen ja korsaarien uhka sai siirtomaahallinnon rakentamaan
> Liman ympärille puolustusmuurin vuosina 1684–1687. Muuri ympäröi
> kaupunkia lähes kaksi vuosisataa, kunnes yhdysvaltalainen
> rautatieurakoitsija Henry Meiggs puri sen maan tasalle vuonna 1872 –
> vain vuosi ennen isoisän matkaa – väistämättömän kasvun tieltä.
> Samaan aikaan Meiggs kunnosti puretun muurin ympäristöä ja katuja.
> Muurin porteista tunnetuin, Arco del Puente, tuhoutui lopulta
> katukauppiaiden sytyttämässä tulipalossa vuonna 1879 – muurista
> itsestään ei ole enää juuri mitään näkyvissä nykypäivän
> kaupunkikuvassa.

Faktat ja lähteet:
- Liman puolustusmuuri (Walls of Lima) rakennettiin 1684–1687
  merirosvojen ja korsaarien varalta. — en-Wikipedia "Lima" (Colonial
  period)
- Yhdysvaltalainen rautatieurakoitsija Henry Meiggs purki muurin 1872
  Perun hallituksen sopimuksella ennakoiden kaupungin tulevaa kasvua.
  — en-Wikipedia "Lima" (Republican era)
- Arco del Puente, muurin tunnetuin portti, tuhoutui katukauppiaiden
  sytyttämässä tulipalossa 1879. — en-Wikipedia "Lima" (Republican
  era)
- **EPÄVARMA/HUOM:** Henry Meiggsin oma artikkeli mainitsee hänen
  rakennuttaneen "seitsemän mailin puiston" muurien paikalle mutta ei
  ajoita tätä täsmällisesti eikä nimeä puistoa; en löytänyt tälle
  erillistä vahvistusta, joten en käyttänyt yksityiskohtaa
  leipätekstissä. — en-Wikipedia "Henry Meiggs" (Railroads)

**Nosto K3 — "Aavikko joka ei koskaan sada" (612 merkkiä)**

> Lima on maailman kolmanneksi suurin aavikkokaupunki Karachin ja
> Kairon jälkeen, mutta siellä ei ole helle- eikä hiekka-aavikon
> tunnetta: kylmä Humboldtin merivirta jäähdyttää ilman niin, ettei
> kosteus koskaan tiivisty kunnolliseksi sateeksi. Talvikuukausina
> kesä–lokakuussa kaupungin ylle laskeutuu harmaa sumuvaippa, garúa,
> joka voi peittää auringon viikkokausiksi; rannikkoalueille sataa
> silti vain 10–30 millimetriä vuodessa. Kesäisin taivas kirkastuu ja
> iltaruskot värjäytyvät oranssiksi ja punaiseksi – paikalliset
> kutsuvat sitä "noitien taivaaksi". Lämpötila pysyttelee harvoin alle
> 12 tai yli 30 asteessa.

Faktat ja lähteet:
- Lima on maailman kolmanneksi suurin aavikkokaupunki Karachin ja
  Kairon jälkeen; ilmastoluokka Köppenin mukaan BWh (aavikkoilmasto
  subtrooppisilla lämpötiloilla). — en-Wikipedia "Lima" (Geography,
  Climate)
- Kylmä Humboldtin merivirta ja Tyynenmeren eteläisen antisyklonin
  lämmin yläilma tekevät sateesta harvinaista voimakkaasta
  ilmakehän vakaudesta huolimatta. — en-Wikipedia "Lima" (Climate)
- Talvella (kesä–lokakuu) esiintyy pitkäkestoista garúa/llovizna/
  camanchaca-tihkusadetta; rannikkopiirit saavat 10–30 mm ja
  sisämaan piirit 10–60 mm sadetta vuodessa. — en-Wikipedia "Lima"
  (Climate)
- Kesän auringonlaskuja kutsutaan paikallisesti nimellä "cielo de
  brujas" ("noitien taivas") taivaan värjäytyessä oranssiksi,
  vaaleanpunaiseksi ja punaiseksi. Lämpötila laskee harvoin alle 12 °C
  tai nousee yli 30 °C:n. — en-Wikipedia "Lima" (Climate)

**Nosto K4 — "Piilotettu pyramidi keskustan sydämessä" (620 merkkiä)**

> Mirafloresin vilkkaan asuinalueen keskellä kohoaa seitsemästä
> porrastetusta tasanteesta koottu savitiilipyramidi Huaca Pucllana,
> jonka Liman kulttuuri rakensi uskonnollis-hallinnolliseksi
> keskuksekseen vuosina 200–700. Pyramidin luota on löydetty myös
> myöhemmän Wari-kulttuurin hautoja, muun muassa "Unkujen herran"
> hauta, jossa kolme aikuista ja uhrattu lapsi lepäävät yhä
> paikoillaan. Huaca-nimi juontuu ketšuan sanoista wak'a (pyhäkkö) ja
> pukllana (leikkipaikka). Kohde avattiin museona 1984, ja tänään sen
> ympärillä kohoaa nykykaupungin pilvenpiirtäjiä – 1500 vuotta vanha
> rakennus ja moderni Lima samassa näkymässä.

Faktat ja lähteet:
- Huaca Pucllana on seitsemästä porrastetusta tasanteesta koottu
  savitiilipyramidi Mirafloresin kaupunginosassa; se rakennettiin
  Lima-kulttuurin (200–700) uskonnollis-hallinnolliseksi keskukseksi.
  — en-Wikipedia "Huaca Pucllana"
- Kohteesta on löytynyt myös Wari-kulttuurin (500–1000) jäänteitä,
  muun muassa "Señor de los Unkusin" hauta kolmen aikuisen ja uhratun
  lapsen jäännöksineen. — en-Wikipedia "Huaca Pucllana"
- Nimi juontuu mahdollisesti ketšuan sanoista wak'a (pyhäkkö/pyhä
  paikka) ja pukllana (leikki), tai vaihtoehtoisesti alueen
  esi-inkakauden päälliköstä. — en-Wikipedia "Huaca Pucllana" (Name)
- Kohteen museo avattiin 1984. — en-Wikipedia "Huaca Pucllana"

### Teemasivu `historia` — 4 nostoa

**Nosto H1 — "Kolme kansaa ennen espanjalaisia" (634 merkkiä)**

> Ennen espanjalaisten tuloa Rímac-joen laaksossa asui vuosisatojen
> ajan Ichman herruuden kansoja, joiden identiteetin loivat Marangan ja
> Liman kulttuurit. Alue kuului inkavallan aikana Pachacamacin
> provinssiin, jonka pyhäkkö oli koko Perun rannikon tärkein
> pyhiinvaelluskohde 300-luvulta 1400-luvulle. Espanjalaisten
> saapuessa laaksoa hallitsi paikallinen kuraakka Taulichusco, joka oli
> aiemmin palvellut inkakeisari Huayna Capacin vaimoa Mama Viloa.
> Pizarron kaupunki rakennettiin suoraan intiaaniyhteisön päälle:
> Taulichuscon palatsin paikalla seisoo nykyinen hallituksen palatsi,
> ja Puma Inti -temppelin paikalle nousi tuomiokirkko.

Faktat ja lähteet:
- Rímac-, Chillón- ja Lurín-jokien laaksoja asuttivat pre-inka-
  yhteisöt, jotka ryhmittyivät Ichman herruuden alle; Marangan ja
  Liman kulttuurit loivat alueen identiteetin. — en-Wikipedia "Lima"
  (Precolonial)
- Inkavallan aikana laakso oli Pachacamacin provinssi (huamani);
  Pachacámacin pyhäkkö oli tärkein pyhiinvaelluskohde 3.–15.
  vuosisadalla. — en-Wikipedia "Lima" (Precolonial)
- Kuraakka Taulichusco, entinen palvelija (yana) keisari Huayna
  Capacin vaimolle Mama Vilolle, hallitsi laaksoa espanjalaisten
  saapuessa. — en-Wikipedia "Lima" (Precolonial)
- Taulichuscon palatsin paikalla on nykyinen Government Palace of
  Peru; Puma Inti -temppelin paikalla nykyinen Metropolitan Cathedral
  of Lima. — en-Wikipedia "Lima" (Precolonial)

**Nosto H2 — "Kaupunki joka tuhoutui muutamassa minuutissa" (656 merkkiä)**

> 28. lokakuuta 1746 kello puoli yksitoista illalla noin 90 kilometrin
> päässä Limasta puhjennut, voimakkuudeltaan 8,6–8,8 ollut
> maanjäristys tuhosi kaupungin muutamassa minuutissa: 3000 talosta
> pystyssä säilyi vain 25, ja kaikki 74 kirkkoa vaurioituivat. Limassa
> 60 000 asukkaasta kuoli 1141, mutta satamakaupunki Callao koki
> pahemman kohtalon – puoli tuntia myöhemmin saapunut jopa 24 metriä
> korkea hyökyaalto tuhosi kaikki 23 satamassa olleet alukset ja jätti
> 5000–6000 asukkaasta henkiin alle 200. Varakuningas José Antonio
> Manso de Velasco johti jälleenrakennuksen, josta periytyy suuri osa
> keskustan nykyisestä siirtomaa-ajan katukuvasta ja balkoneista.

Faktat ja lähteet:
- 1746 Lima–Callao-maanjäristys (Mw 8,6–8,8) tapahtui 28.10.1746 klo
  22.30, noin 90 km Limasta; 3000 talosta säilyi vain 25 ja kaikki 74
  kirkkoa vaurioituivat tai tuhoutuivat. — en-Wikipedia "1746
  Lima–Callao earthquake"
- Limassa kuoli järistyksessä 1141/60 000 asukasta; Callaossa
  puoli tuntia myöhemmin saapunut, jopa 24 metriä korkea hyökyaalto
  tuhosi kaikki 23 satamassa olleet alukset ja jätti 5000–6000
  asukkaasta henkiin alle 200. — en-Wikipedia "1746 Lima–Callao
  earthquake" (Damage)
- Varakuningas José Antonio Manso de Velasco johti mittavan
  jälleenrakennuksen ranskalaisen matemaatikko Louis Godinin avulla.
  — en-Wikipedia "1746 Lima–Callao earthquake" (Aftermath), "Lima"
  (Colonial period)
- Historiallisessa keskustassa on yli 1600 balkonia siirtomaa- ja
  tasavaltakaudelta; balkoniperinteen tunnetuimpia esimerkkejä on
  Palacio de Torre Tagle (valmistunut 1735, säilyi/rakennettiin
  uudelleen järistysten jälkeen). — en-Wikipedia "Lima" (Architecture)
- **RISTIRIITA:** kokonaisuhriluku vaihtelee lähteen mukaan: NGDC
  antaa 5941, silminnäkijätilit (mm. Khlebnikovin 1817 muistelmat)
  puhuvat n. 4000 hukkuneesta Callaossa yksinään — käytetty
  varovaisempaa haarukkaa "5000–6000 asukkaasta selvisi alle 200".
  — en-Wikipedia "1746 Lima–Callao earthquake"

**Nosto H3 — "Lintujen lannasta valtion tärkein tulo" (609 merkkiä)**

> 1840-luvulta lähtien Perun valtio kansallisti guanon – rannikkosaarten
> lintujen ulosteista koostuvan, typpipitoisen lannoitteen – ja
> tuotteesta tuli maan suurin tulonlähde. Vienti huipentui 1870,
> jolloin Perusta lähti Eurooppaan ja Yhdysvaltoihin yli 700 000 tonnia
> guanoa. Osa tuloista käytettiin 1854 vapauttamaan yli 25 000 orjaa ja
> poistamaan alkuperäisväestöltä peritty henkivero; suurin osa rahoitti
> 1850–1870-luvuilla Liman suuria julkisia rakennuksia – keskustorin,
> teurastamon, mielisairaalan ja vankilan. Samaan aikaan vaurauden
> epätasainen jakautuminen kasvatti köyhien ja rikkaiden välistä
> kuilua.

Faktat ja lähteet:
- Perulainen poliitikko Francisco Quirós y Ampudia neuvotteli 1840
  sopimuksen, joka teki guanosta valtion yksinoikeudella hallitseman
  vientituotteen; siitä tuli maan suurin tulonlähde. — en-Wikipedia
  "Guano" (The Guano Age)
- Perun guanovienti huipentui 1870 yli 700 000 tonniin (yli 700 000
  short tonnia), vaikka tuottavin esiintymä Chincha-saarilla oli jo
  ehtymässä. — en-Wikipedia "Guano" (The Guano Age)
- Osa guanotuloista käytettiin vapauttamaan yli 25 000 orjaa ja
  poistamaan alkuperäisväestön henkivero. — en-Wikipedia "Guano"
  (The Guano Age)
- Guanotulot rahoittivat 1850–1870-luvuilla mm. keskustorin,
  teurastamon, mielisairaalan ja Dos de Mayo -sairaalan rakentamisen;
  vaurauden epätasainen jakautuminen kasvatti samaan aikaan
  yhteiskunnallista levottomuutta. — en-Wikipedia "Lima" (Republican
  era)

**Nosto H4 — "Rautatie sinne missä laamat kävelevät" (635 merkkiä)**

> Puolalaissyntyinen insinööri Ernest Malinowski oli ehdottanut jo 1851
> radan jatkamista Limasta Andeille, mutta hanke käynnistyi vasta, kun
> yhdysvaltalainen urakoitsija Henry Meiggs otti sen hoitaakseen 1868.
> Sopimus allekirjoitettiin joulukuussa 1869, ja rakentaminen alkoi
> tammikuussa 1870 juhlallisin menoin Liman Monserraten asemalla.
> Radasta tuli lopulta maailman toiseksi korkein: Galera-tunneli kohoaa
> 4783 metriin merenpinnasta. Vuonna 1873 louhinta ja raiteenlasku
> olivat täydessä käynnissä Rímacin rotkossa, ja työmaalla raatoi myös
> osa niistä 80 000–100 000 kiinalaisesta sopimustyöläisestä, jotka
> saapuivat Peruun 1849–1874.

Faktat ja lähteet:
- Ernest Malinowski ehdotti 1851 radan jatkamista Limasta Jaujan
  laaksoon; hanke käynnistyi vasta, kun Henry Meiggs otti urakan
  hoitaakseen 1868 ja sopimus allekirjoitettiin 23.12.1869.
  — en-Wikipedia "Ferrocarril Central Andino" (History)
- Rakentaminen alkoi tammikuussa 1870 juhlallisin menoin Monserraten
  aseman peruskiven laskulla Limassa; rata avautui Chiclaan 1878.
  — en-Wikipedia "Ferrocarril Central Andino" (History)
- Rata on maailman toiseksi korkein (Qingzang-radan jälkeen);
  Galera-huipputunneli kohoaa 4783 metriin ja sisältää n. 69 tunnelia
  ja 58 siltaa. — en-Wikipedia "Ferrocarril Central Andino" (History)
- 80 000–100 000 kiinalaista sopimustyöläistä tuotiin Peruun
  1849–1874; kolmas ryhmä heistä työskenteli nimenomaisesti
  Lima–La Oroya–Huancayo-radan rakennustyömaalla. — en-Wikipedia
  "Chinese Peruvians" (§ 19th century / coolie trade)
- **EPÄVARMA/LÄHTEETÖN SITAATTI:** Meiggsin on toistuvasti siteerattu
  sanoneen hallitukselle "I will place rails there, where the llamas
  walk" – Ferrocarril Central Andino -artikkeli toistaa sitaatin mutta
  merkitsee sen itse "citation needed"; käytä vain jos toinen lähde
  vahvistaa. — en-Wikipedia "Ferrocarril Central Andino" (History)

### Teemasivu `ruoka` — 4 nostoa

**Nosto R1 — "Amerikan gastronomian pääkaupunki" (587 merkkiä)**

> Lima tunnetaan nykyään koko Amerikan gastronomisena pääkaupunkina.
> Siirtomaakaudella espanjalaisten mukanaan tuomat ruokaperinteet
> sekoittuivat alkuperäisväestön raaka-aineisiin, ja myöhemmät
> maahanmuuttoaallot – afrikkalaiset, kiinalaiset, japanilaiset ja
> eurooppalaiset – toivat mukanaan omat makunsa. 2000-luvulla
> limalaiset ravintolat ovat nousseet kansainväliseen kärkeen: World's
> 50 Best -listalla Central oli maailman paras ravintola 2023 ja Maido
> 2025. Vuonna 2007 perustettu APEGA-järjestö loi seuraavana vuonna
> Mistura-ruokafestivaalin, josta tuli Latinalaisen Amerikan suurin.

Faktat ja lähteet:
- Lima tunnetaan Amerikan gastronomisena pääkaupunkina; ruokakulttuuri
  syntyi siirtomaa-ajan espanjalaisten ja alkuperäisväestön sekä
  myöhempien afrikkalaisten, kiinalaisten, japanilaisten ja
  eurooppalaisten maahanmuuttoaaltojen sekoituksesta. — en-Wikipedia
  "Lima" (Food)
- Central palkittiin World's 50 Best Restaurants -listalla maailman
  parhaaksi ravintolaksi 2023, Maido 2025. — en-Wikipedia "Lima"
  (Food)
- APEGA (Peruvian Society for Gastronomy) perustettiin 2007 ja loi
  2008 Mistura-ruokafestivaalin, josta tuli Latinalaisen Amerikan
  suurin ruokatapahtuma. — en-Wikipedia "Lima" (Food)

**Nosto R2 — "Kansallisruoka joka kypsyy limellä" (532 merkkiä)**

> Ceviche, Perun kansallisruoka, valmistetaan tuoreesta kalasta, joka
> "kypsyy" ilman lämpöä limemehun happamuudessa yhdessä suolan,
> valkosipulin, sipulin ja chilin kanssa. Pohjois-Perussa tunnetaan
> musta-osteri- ja äyriäisceviche, Andeilla taas taimen- ja jopa
> kanaceviche. Ruoan happamuus juontuu limestä, jonka espanjalaiset
> toivat siirtomaakaudella Aasiasta – ilman sitä koko ruokalaji olisi
> mahdoton nykymuodossaan. Nimen alkuperästä on useita kilpailevia
> selityksiä, eikä yhtäkään niistä ole voitu todistaa lopullisesti
> oikeaksi.

Faktat ja lähteet:
- Ceviche on Perun kansallisruoka: raakaa kalaa marinoidaan
  limemehussa suolan, valkosipulin, sipulin ja chilin kanssa; alueesta
  riippuen käytetään myös osteria, äyriäisiä, taimenta tai kanaa.
  — en-Wikipedia "Lima" (Food)
- Sitrushedelmät (mm. lime) ovat peräisin Aasiasta ja tulivat Peruun
  espanjalaisten mukana siirtomaakaudella. — en-Wikipedia "Causa
  limeña" (History, sitrushedelmien alkuperä koskien samaa
  siirtomaakauden tuontia)
- Causa limeñan (perulaisen perunaruokalajin) nimen alkuperästä
  kilpailee useita selityksiä (ketšuan kawsay, San Martínin
  itsenäisyyssota 1821, tai Tyynenmeren sota 1879) — yhtään ei ole
  voitu vahvistaa. — en-Wikipedia "Causa limeña" (Etymology)

**Nosto R3 — "Riisiä syömässä" (597 merkkiä)**

> Vuosina 1849–1874 Peruun saapuneet kiinalaiset sopimustyöläiset
> toivat mukanaan ruokakulttuurinsa, ja sopimuskauden päätyttyä monet
> perustivat pieniä ravintoloita, chifoja – nimi juontuu kantonin
> sanoista "syödä riisiä". Liman Calle Capónista, nykyisestä Barrio
> Chinosta, kasvoi yksi läntisen pallonpuoliskon varhaisimmista
> kiinalaiskortteleista. Monet vapautuneet työläiset ottivat
> isäntiensä espanjankieliset sukunimet – siksi moni perulainen, jolla
> on kiinalaisia juuria, kantaa tänään täysin espanjalaiselta
> kuulostavaa nimeä. Kiinalais-perulaiset osallistuivat myös
> rautateiden rakentamiseen.

Faktat ja lähteet:
- Sopimuskauden päätyttyä monet vapautuneet kiinalaiset sopimus-
  työläiset perustivat chifoja (kiinalais-perulaisia ravintoloita);
  nimi juontuu kantonin sanoista "syödä riisiä"/"aterioida" (hek3
  faan6). — en-Wikipedia "Chinese Peruvians" (Chifas)
- Calle Capón, Liman Barrio Chino, on yksi läntisen pallonpuoliskon
  varhaisimmista kiinalaiskortteleista. — en-Wikipedia "Chinese
  Peruvians"
- Monet vapautuneet sopimustyöläiset ottivat patruunansa
  espanjankielisen sukunimen, mikä selittää miksi moni kiinalais-
  taustainen perulainen kantaa espanjalaista sukunimeä.
  — en-Wikipedia "Chinese Peruvians"
- Kiinalais-perulaiset osallistuivat myös rautateiden rakentamiseen ja
  myöhemmin Amazonin kumin, riisin ja kullan tuotantoon.
  — en-Wikipedia "Chinese Peruvians"

**Nosto R4 — "600 000 ihmistä kymmenessä päivässä" (579 merkkiä)**

> Vuonna 2008 järjestetty ensimmäinen Mistura-ruokafestivaali kokosi
> limalaisia ravintoloita, katukauppiaita, leipureita ja
> ruokatuottajia kymmeneksi päiväksi syyskuussa. Kävijämäärä kasvoi 30
> 000:sta vuonna 2008 yli 600 000:een vuoteen 2014 mennessä, mikä teki
> siitä Latinalaisen Amerikan suurimman ruokatapahtuman. Festivaalin
> taustalla oleva APEGA-järjestö kokosi yhteen kokkeja,
> ravintoloitsijoita, tutkijoita ja käsityöläiskalastajia edistämään
> perulaista ruokaa osana kansallista identiteettiä. Perulainen kahvi
> ja suklaa ovat niin ikään voittaneet kansainvälisiä palkintoja.

Faktat ja lähteet:
- Mistura-ruokafestivaali järjestettiin ensimmäisen kerran 2008;
  kävijämäärä kasvoi 30 000:sta yli 600 000:een vuoteen 2014 mennessä.
  — en-Wikipedia "Lima" (Food)
- APEGA (perustettu 2007) kokosi kokkeja, ravintolanomistajia,
  ravitsemustieteilijöitä, tutkijoita, käsityöläiskalastajia ja
  toriruokamyyjiä edistämään perulaista gastronomiaa ja kansallista
  identiteettiä. — en-Wikipedia "Lima" (Food)
- Perulainen kahvi ja suklaa ovat voittaneet kansainvälisiä palkintoja.
  — en-Wikipedia "Lima" (Food)

---

## 3. Viisi jaksoehdotusta matkaoppaaseen

Faktat on valittu niin, etteivät ne toista osion 2 nostoja.

**Jakso 1 — "Perille ja liikkeelle"**

Nykyään Limaan saavutaan yleensä Jorge Chávez -kansainvälisen lentokentän
kautta, joka avasi uuden terminaalinsa kesäkuussa 2025 ja jonka on
tarkoitus palvella noin 40 miljoonaa matkustajaa vuodessa vuoteen 2030
mennessä. Kaupungin ensimmäinen metrolinja valmistui vasta 2010 useiden
1970- ja 1990-luvun keskeytysten jälkeen — Lima on monilta osin
autoliikenteen ehdoilla kasvanut kaupunki.

Faktat ja lähteet:
- Jorge Chávez International Airportin uusi terminaali avattiin
  1.6.2025; sen odotetaan palvelevan n. 40 miljoonaa matkustajaa
  vuosittain vuoteen 2030 mennessä. — en-Wikipedia "Lima" (21st
  century)
- Lima and Callao Metro Linja 1 valmistui 2010 lukuisten 1970- ja
  1990-lukujen keskeytysten jälkeen; El Metropolitano-pikabussijärjestelmä
  käynnistyi 2007. — en-Wikipedia "Lima" (21st century)

**Jakso 2 — Alueen rakenne**

Metropolitan Lima kattaa yli 2670 neliökilometriä, joista vain noin
kolmannes on varsinaista kaupunkia ja loput laita-alueita. Kaupunki
laskeutuu loivasti Tyynenmeren rannalta jopa 1550 metrin korkeuteen
kohoaviin laaksoihin ja vuorenrinteisiin; keskustan halki virtaava
Rímac-joki tuo juomaveden ja käyttövoiman vesivoimaloille Andeilta asti.

Faktat ja lähteet:
- Metropolitan Lima kattaa 2672,28 km², josta 825,88 km² (31 %) on
  varsinaista kaupunkia ja 1846,40 km² (69 %) laita-alueita. Kaupunki
  ulottuu n. 60 km pohjoisesta etelään ja n. 30 km lännestä itään.
  — en-Wikipedia "Lima" (Geography)
- Kaupunki laskeutuu loivasti rannikolta laaksoihin ja vuorenrinteisiin
  jopa 1550 metrin korkeuteen; Rímac-joki tuo juomaveden ja
  vesivoiman Andeilta. — en-Wikipedia "Lima" (Geography)

**Jakso 3 — Arjen ilmiö: Barranco ja Miraflores**

Barranco ja Miraflores, kaksi Liman rannikkokaupunginosaa, olivat vielä
isoisän aikaan omia pikkukaupunkejaan Liman ulkopuolella. Nykyään ne ovat
osa metropolialuetta: Barrancosta tuli 1800-luvun lopulla varakkaiden
kesänviettopaikka merenrannalla, kun taas Mirafloresin jyrkät hiekka-
kalliot Malecón-rantabulevardin varrella houkuttelevat nykyisin
liitovarjoilijoita ja iltakävelijöitä.

Faktat ja lähteet:
- Miraflores District sijaitsee Liman rannikolla kalliojyrkänteillä,
  joilla kulkee suosittu Malecón-rantabulevardi; alueella sijaitsee
  myös Huaca Pucllana. — en-Wikipedia "Miraflores District, Lima"
- Barranco District oli alun perin oma kalastajakylänsä ja myöhemmin
  1800-luvun lopulla varakkaan väestön kesänviettopaikka merenrannalla
  ennen liittymistään Liman metropolialueeseen. — en-Wikipedia
  "Barranco District" (History)

**Jakso 4 — Historian käännekohta: taistelu joka teki sankarin**

2. toukokuuta 1866, vain seitsemän vuotta ennen isoisän matkaa, Espanjan
laivasto pommitti Callaon satamaa osana Chincha-saarten sotaa Perua
vastaan. Puolustuksen johtanut sodanministeri José Gálvez Egúsquiza
kuoli taistelussa ja hänestä tuli kansallissankari — päivämäärä on yhä
Perun kalenterin merkkipäivä. Espanjan laivasto perääntyi lopulta
korjauskelvottomana.

Faktat ja lähteet:
- Battle of Callao käytiin 2.5.1866 Espanjan amiraali Casto Méndez
  Núñezin ja Perun eversti Mariano Ignacio Pradon sekä sodanministeri
  José Gálvez Egúsquizan joukkojen välillä; Gálvez kuoli taistelussa ja
  hänet muistetaan sankarina. — en-Wikipedia "Callao" (Spanish period)
- Taistelu liittyi laajempaan Chincha Islands War -konfliktiin
  (1865–1871) Espanjan ja Perun/liittolaisten välillä. — en-Wikipedia
  "Callao" (Spanish period)

**Jakso 5 — Milloin kannattaa tulla**

Limaan kannattaa suunnata joulu–huhtikuun aurinkoisena "kesänä", jolloin
sää on lämmin ja pilvetön; kesä–lokakuun "talvi" hukuttaa kaupungin
kuukausiksi harmaaseen garúa-sumuun ilman että lämpötila silti laskee
kylmäksi. Molempina vuodenaikoina sadetakki on tarpeeton — Lima on yksi
maailman sateettomimmista suurkaupungeista.

Faktat ja lähteet: ks. osio 5 (Säätiedot) ja nosto K3 — samat luvut,
samat lähteet.

---

## 4. Yhdeksän kohdekartan kohdetta

Koordinaatit haettu en-Wikipedian MediaWiki-rajapinnasta
(`action=query&prop=coordinates`, redirects=1) 23.8.2026, ei
429-vastauksia. Etäisyydet ovat OMIA LASKELMIANI koordinaattieroista
(asteet × 111 km, pituusasteille kerrottu cos(12,05°) ≈ 0,9781),
tarkistettu Node-skriptillä.

| # | Nimi suomeksi | Koordinaatit (desimaali) | Lähdeartikkeli | Etäisyys/suunta keskustasta (oma laskelma) |
|---|---|---|---|---|
| 1 | Plaza Mayor, Liman keskusta | 12,0458°S 77,0306°W | "Plaza Mayor, Lima" | (keskipiste) |
| 2 | Government Palace (Casa de Pizarro) | 12,0448°S 77,0298°W | "Government Palace, Peru" | ~0,14 km (Plaza Mayorin laidalla) |
| 3 | San Franciscon luostari ja katakombit | 12,0455°S 77,0274°W | "Basilica and Convent of San Francisco, Lima" | ~0,35 km itään |
| 4 | Palacio de Torre Tagle (balkonit) | 12,0488°S 77,0293°W | "Palacio de Torre Tagle" | ~0,36 km etelään |
| 5 | Desamparados-rautatieasema | 12,0444°S 77,0286°W | "Desamparados station" | ~0,27 km pohjoiseen |
| 6 | Barrio Chino / Calle Capón (Chinatown) | 12,0510°S 77,0258°W | "Barrio Chino (Lima)" | ~0,77 km itään |
| 7 | Huaca Pucllana, Miraflores | 12,1111°S 77,0339°W | "Huaca Pucllana" | ~7,3 km etelään |
| 8 | Barrancon rantakaupunginosa | 12,1417°S 77,0167°W | "Barranco District" | ~10,7 km eteläkaakkoon |
| 9 | Real Felipe -linnoitus, Callao | 12,0628°S 77,1492°W | "Real Felipe Fortress" | ~13,0 km länteen |

**Rajausehdotus:** Kuusi ensimmäistä kohdetta mahtuvat alle kilometrin
säteelle Plaza Mayorin ympärille (tiiviimpi kuin Vancouver-mallissa),
mutta kohteet 7–9 (Huaca Pucllana, Barranco, Callao) ovat 7–13 km
päässä keskustasta. Sama tilanne kuin Vancouverin Musqueam-kohteessa:
nämä kannattaa näyttää joko omalla zoomaustasollaan tai hyväksyä kartan
selvästi väljempi rajaus, koska Huaca Pucllana on olennainen osa
kaupunkisivun K4-nostoa ja Callao Historia-sivun H2- ja
matkaopasjakson 4 tapahtumapaikka.

---

## 5. Säätiedot

- **Keskustan/lentokentän koordinaatit:** 12,0219°S, 77,1144°W (Jorge
  Chávez -lentokenttä, korkeus 13 m). — en-Wikipedia "Lima" (Climate)
- **Köppen-luokka:** BWh (aavikkoilmasto, subtrooppiset lämpötilat),
  meren läheisyys tekee ilmastosta poikkeuksellisen leudon
  aavikkokaupungiksi. — en-Wikipedia "Lima" (Climate)
- **Sademäärä:** rannikkopiirit 10–30 mm/vuosi, sisämaan piirit
  10–60 mm/vuosi; sade tulee lähes yksinomaan talven (kesä–lokakuu)
  garúa-tihkusateena. — en-Wikipedia "Lima" (Climate)
- **Lämpötila:** kesä (joulu–huhtikuu) päivälämpötilat 25–30 °C, talvi
  (kesä–lokakuu/marraskuu) 16–19 °C; harvoin alle 12 °C tai yli 30 °C.
  — en-Wikipedia "Lima" (Climate)
- **Ennätykset (1960–nykyhetki):** korkein mitattu vuosiennätys 33,4 °C
  (maalis); kuukausikohtaiset ennätykset vaihtelevat 28,0–33,4 °C:n
  välillä ympäri vuoden. — en-Wikipedia "Lima" (Weather box,
  1991–2020-normaalit/1960–nykyhetki-ennätykset)
- **Aurinko:** vain 1284 auringonpaistetuntia vuodessa (elokuussa
  27,9 h, huhtikuussa 183 h) — poikkeuksellisen vähän leveysasteeseen
  nähden; vertailuksi Lontoo 1653 h, Moskova 1731 h. — en-Wikipedia
  "Lima" (Climate)
- **HUOM:** samoin kuin muissa E-Amerikan faktapohjissa, yllä olevat
  luvut ovat en-Wikipedian Climate-osiosta EIVÄTKÄ ole sama asia kuin
  pelin `saatiedot.js`-riville tarvittava ERA5 1991–2020-normaali.
  Tarkat kuukausinormaalit haetaan kirjoitusvaiheessa
  `tools/hae-saanormaalit.mjs`-työkalulla.

---

## 6. Kuva-aiheet ja Commons-kategoriavinkit

Erityishuomio: Liman keskustan ja Barrio Chinon katukuvat ovat usein
täynnä ihmisiä ja liikennettä — valitse kuvakulma joka näyttää
arkkitehtuurin tai toiminnan, ei yksilöityjä kasvoja. Huaca Pucllanan
kuvissa vältä pelkkää "muinaisraunio"-kehystä: näytä myös nykykaupunki
taustalla, koska juuri se kontrasti on osa kohteen tarinaa (nosto K4).
Kiinalaissyntyperäisiä sopimustyöläisiä koskevissa kuvavalinnoissa vältä
kärsimyksen korostamista kuvateksteissä ja -valinnoissa — kerro
tapahtuma neutraalisti tekstissä (kuten H4-nostossa), älä hae kuvaa joka
dramatisoi sitä.

**Avauskuvat (3), ehdotus:**
1. Plaza Mayor ja tuomiokirkko iltavalossa, siirtomaa-ajan julkisivut
   näkyvissä.
2. Liman balkonirivistö (esim. Torre Tagle -palatsin edusta).
3. Huaca Pucllana pilvenpiirtäjätaustaa vasten.

**Kansikuvat (3), ehdotus:**
1. Liman siluetti tai Plaza Mayor ilmakuvana/laajana yleiskuvana.
2. Mirafloresin Malecón-rantabulevardi kalliojyrkänteineen ja merineen.
3. Callaon satama tai Real Felipe -linnoitus mereltä kuvattuna.

**Commons-kategoriat kuvahakuun (ei hakusanoja, kategorioiden sisältö
pitää silti aina tarkistaa silmin lisenssisääntöjen mukaisesti):**
- `Category:Plaza Mayor de Lima` — Plaza Mayor, tuomiokirkko, hallituksen
  palatsi
- `Category:Historic Centre of Lima` — laaja yläkategoria siirtomaa-ajan
  arkkitehtuurille
- `Category:Balconies of Lima` — balkoniperinne (jos kategoria on
  olemassa hakuhetkellä — tarkista, korvaa tarvittaessa laajemmalla
  arkkitehtuurikategorialla)
- `Category:Torre Tagle Palace` — Palacio de Torre Tagle, balkonit
- `Category:Huaca Pucllana` — pyramidi, kaivaukset, museo
- `Category:Barrio Chino, Lima` tai `Category:Chinatown, Lima` — Calle
  Capón, chifa-ravintolat (tarkista tarkka kategorianimi hakuhetkellä)
- `Category:Callao` ja `Category:Real Felipe Fortress` — satama, linnoitus
- `Category:Miraflores District, Lima` — Malecón, kalliojyrkänteet
- `Category:Barranco District` — puistokadut, sillat, rantakaupunginosa
- `Category:Peruvian cuisine` ja `Category:Ceviche` — ruokakuvat (huomioi
  osio "Ruokakuvien laatukriteerit" kaupunkilehti.md:ssä: luonnonvalo,
  läheltä kuvattu, tekeminen pääosassa)
- `Category:Mistura (food festival)` — nykyinen ruokafestivaali, jos
  kategoria on olemassa

**Nosto-/jaksokuvat, aihe-ehdotuksia (ei tiedostonimiä):**
1. Historiallinen litografia tai valokuva Liman muurista ennen 1872
   purkua, tai Henry Meiggsin muotokuva.
2. Ferrocarril Central Andinon rakennustyömaa tai Galera-tunneli
   1870-luvulta, tai nykyinen rata Andien maisemassa.
3. 1746 maanjäristystä kuvaava aikalaispiirros tai -kartta Limasta.
4. Nykyinen chifa-ravintola tai Barrio Chinon katukuva.
5. Ceviche tai causa limeña lähikuvana valmistuksen aikana
   (ruokakuvien laatukriteerit huomioiden).
6. Huaca Pucllanan kaivauslöytö tai pyramidin porrastasanteet.
7. Callaon satama tai Real Felipe -linnoitus.
8. Mistura-festivaalin väkijoukko tai ruokatori (jos nykykuvaa
   saatavilla).

---

## 7. Ristiriidat, epävarmuudet ja huomiot

1. **Kolme nostoa liikkuu lähellä visan aiheita, mutta ei anna vastausta
   suoraan.** Visa kysyy (a) minkä maan pääkaupunki Lima on, (b)
   millainen sää Limassa vallitsee, (c) minkä valtameren rannalla Lima
   sijaitsee, (d) mikä on ceviche, (e) miksi Limassa sataa vähän. K1
   käyttää Pizarron perustamiskertomusta ja nimietymologiaa, ei
   "Perun pääkaupunki" -sanamuotoa; K3 selittää garúan ja Humboldtin
   merivirran mekanismin visaa yksityiskohtaisemmin (kuukausittaiset
   sademäärät, "noitien taivas" -ilmiö); R2 kertoo cevichen alueelliset
   variaatiot ja limen alkuperän Aasiasta, ei toista visan
   "sitrusmehussa kypsennettyä kalaa" -määritelmää sellaisenaan.
2. **Kolonisaatioajan ja tasavaltakauden painotus on tarkoituksellinen.**
   Isoisän 1873-vierailun ajankohta osuu keskelle kolmea samanaikaista
   ilmiötä (guanotalous, rautatierakennus, siirtomaa-arkkitehtuurin
   jälleenrakennus), jotka kaikki ovat edustettuina — tämä on kerrottu
   suoraan koosteen alussa, jottei kirjoittaja unohda 1873-kulmaa.
3. **1746-maanjäristyksen uhriluvut vaihtelevat lähteen mukaan** (ks.
   H2-noston lähdemerkintä): NGDC:n kokonaisluku 5941 ja aikalaistilien
   Callao-kohtaiset luvut (n. 4000–6000 hukkunutta) eivät täsmää
   täydellisesti keskenään — käytetty varovaisempaa haarukkaa.
4. **Henry Meiggsin "I will place rails there, where the llamas walk"
   -sitaatti on merkitty en-Wikipediassa itsessään lähteettömäksi**
   ("citation needed") — käytettävissä on siis vain toisen käden
   maininta ilman alkuperäislähdettä. Suosittelen joko jättämään
   sitaatin pois tai etsimään sille erillisen vahvistuksen ennen
   julkaisua (ks. H4-noston huomio).
5. **Kiinalaisten sopimustyöläisten kohtalo (1849–1874) on kerrottu
   suoraan mutta hillitysti.** Lähde ("Chinese Peruvians") kertoo
   puolen väestöstä menehtyneen "abuse, exhaustion and suicide" -syistä
   ennen sopimuskauden loppua; olen käyttänyt tässä koosteessa
   sanamuotoa "puolet menehtyi ennen sopimuskauden loppua" ja jättänyt
   yksityiskohtaisemmat kuvaukset pois — sisältölinjauksen (Perustus-
   laki, spec-mantereet.md) mukaisesti väkivalta kerrotaan tapahtumana
   ilman yksityiskohtien korostusta. Kirjoittajan kannattaa säilyttää
   sama linja lopullisessa tekstissä.
6. **War of the Pacific (1879–1883) ja sitä seuranneet kiinalais-
   vastaiset väkivaltaisuudet (1880-luku) on TIETOISESTI jätetty tämän
   koosteen ulkopuolelle** — ne tapahtuivat isoisän matkan jälkeen
   eivätkä siksi kuulu 1873-painotukseen. En-Wikipedian "Lima" ja
   "Callao" -artikkeleissa on materiaalia sodasta ja Chilen miehityksestä
   (1881), jos kirjoittaja tarvitsee sitä myöhempää aikakautta
   käsittelevään sisältöön, mutta sitä ei ole tarkistettu tätä
   faktapohjaa varten yksityiskohtaisesti.
7. **"Category:Balconies of Lima" ja muiden tarkkojen Commons-
   kategorioiden olemassaoloa ei ole erikseen varmistettu hakurajapinnalla**
   tämän koosteen tekohetkellä (vain artikkelien raakateksti ja
   koordinaatit haettiin, ei Commons-kategoriahakuja) — kirjoittajan
   tulee tarkistaa tarkat kategorianimet kuvatyön alussa
   kaupunkilehti.md:n kuvasäännön mukaisesti.
8. **Coordinates-rajapinta ei tällä kertaa antanut yhtään 429-vastausta**
   — toisin kuin useissa aiemmissa E-Amerikan faktapohjissa (Rio,
   Vancouver), kaikki 12 koordinaattihakua onnistuivat ensimmäisellä
   yrityksellä.
9. **Vain en-Wikipediaa ja sen MediaWiki-koordinaattirajapintaa on
   käytetty.** Ei ulkopuolisia hakuja tämän faktapohjan sisältöön.
10. **Kaikki nostot ja jaksot on kirjoitettu valmiiksi suomenkieliseksi
    tekstiksi** merkkimäärävaatimusten mukaan (johdannot 201–222,
    nostot 532–656) ja tarkistettu koneellisesti Node-skriptillä
    (`node lima-texts.mjs`, tulokset kirjattu tämän koosteen
    työskentelyhistoriaan).
