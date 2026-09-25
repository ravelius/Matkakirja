# St. John's — faktakoostaja, uusi kaupunkilehti

Lauta-id `northamerica`, kaupunki-id `stjohns`, maa CAN, pelin
wiki-nimi `St. John's (Kanada)` (js/packs/northamerica.js),
en-Wikipedia **"St. John's, Newfoundland and Labrador"**. Kaikki
tiedot haettu en-Wikipedian raakatekstistä (`index.php?action=raw`,
`NODE_USE_ENV_PROXY=1`, uusinnat kasvavalla viiveellä) **7.9.2026**.
Malli ja mitat luettu tiedostoista `tools/parvi/kaupunkilehti-ohje.md`,
`tools/parvi/kohdekartta-ohje.md`,
`docs/aasia-tyoaineisto/lehtityo-resepti.md`,
`docs/moduulit/kaupunkilehti.md`. Malli: **Halifaxin ja Lagosin
lehdet**.

Luetut lähdeartikkelit (en-Wikipedia, 7.9.2026):
**"St. John's, Newfoundland and Labrador"**, **"Newfoundland
Colony"**, **"Newfoundland (island)"**, **"Fort William,
Newfoundland"**, **"Battle of Signal Hill"**, **"Signal Hill, St.
John's"**, **"Cabot Tower (St. John's)"**, **"The Battery, St.
John's"**, **"Fort Amherst, St. John's"**, **"Colonial Building"**,
**"Government House (Newfoundland and Labrador)"**, **"Basilica of
St. John the Baptist"**, **"Cathedral of St. John the Baptist (St.
John's)"**, **"National War Memorial (Newfoundland)"**, **"Water
Street (St. John's)"**, **"Great Fire of 1892"**, **"Great Fire of
1846"**, **"Royal St. John's Regatta"**, **"Quidi Vidi Lake"**,
**"Grand Banks of Newfoundland"**, **"Collapse of the Atlantic
northwest cod fishery"**, **"Heart's Content Cable Station"**,
**"Transatlantic telegraph cable"**, **"Guglielmo Marconi"**,
**"Transatlantic flight of Alcock and Brown"**, **"Newfoundland Time
Zone"**, **"Cape Spear"**, **"Pippy Park"**, **"Bowring Park (St.
John's)"**, **"Bannerman Park"**, **"Murray Premises"**, **"The
Rooms"**, **"Georgestown, St. John's"**, **"St. John's International
Airport"**.

## 0. Rajaus tälle lehdelle

**Kanadan maalehti (js/packs/maa-kategoriat.js, CAN) on jo tehty, ja
sen aiheita EI toisteta.** Maalehti kertoo muun muassa **L'Anse aux
Meadowsista ja vuodesta 1021**, Hudson's Bay Companysta,
Charlottetownin kokouksesta, ratsupoliisista, métis-kansasta,
toteemipaalusta, inuksukista, sisäoppilaitoksista, Banffista,
Fundynlahdesta, W. A. C. Bennettin padosta, Wood Buffalosta,
vaahterasiirapista, hummerista, leipäriidasta, poutinesta ja
urheilusta. Karttanostot (`js/packs/maastokohteet-can.js`, joukossa
**L'Anse aux Meadows** ja **Louisbourgin linnoitus**), skandaalit
(`js/packs/skandaalit.js`, CAN) ja eläintäyt
(`js/packs/elaintakyt.js`, CAN) on luettu — yksikään ei ole tämän
lehden aihe.

**VIIKINGIT OVAT MAALEHDEN JA KARTTANOSTON AIHE.** Tämä lehti ei
kerro L'Anse aux Meadowsista muuta kuin sen, että se on saaren
pohjoiskärjessä — ja sekin vain matkaoppaan yhdessä lauseessa.

**Halifaxin lehti (kulttuuri-kategoriat.js, `halifax`) on luettu.**
Sen teemasivu "Satama, sumu ja myrskyt" kertoo luonnonsatamasta,
Golfvirran leudontamasta ilmastosta, hurrikaaneista ja graniitista.
St. John'sin teemasivu on siksi tarkoituksella **tiedesivu**
("Viesti valtameren yli"), ei toinen sääsivu; sumu ja tuuli
kerrotaan matkaoppaan sääjaksossa ja yhdessä nostossa siltä osin
kuin ne ovat viestiyhteyksien este.

**Tämä lehti pysyy kaupungissa:** nimi ja ensimmäiset purjehdukset,
kapea satamansuu ja sen puolustus, turska ja öljy, viisi
suurpaloa — sekä teemasivulla merikaapeli, Marconi, Alcock ja Brown
ja Newfoundlandin oma aikavyöhyke.

Kaupungin visa on luettu tiedostosta `js/packs/northamerica-questions.js`
(avain `stjohns`, viisi kysymystä: saari Newfoundland; Grand Banks
tunnettu turskasta; rinteet tunnetaan kirkkaanvärisistä puutaloista;
Grand Banksilta pyydettiin turskaa; L'Anse aux Meadowsista löytyi
viikinkien asuinpaikka noin vuodelta 1000). **Minitehtävä ei saa
kysyä yhtään näistä viidestä.** Kulttuurivisa (sama tiedosto,
`stjohns`) kertoo vanhasta eurooppalaisperäisestä kaupungista,
Grand Banksin turskasta, Jellybean Rowsta ja isoisän epäilystä
viikingeistä.

Olemassa olevat lohkot on luettu:
- `js/packs/northamerica-saapumiset.js` (`stjohns`): valmis, ei
  kosketa. Kertoo Jellybean Rowsta, kapeasta satamansuusta ja
  isoisän muistiinpanon lennätinkaapelista — **teemasivu jatkaa
  juuri siitä**.
- `js/packs/northamerica-valokuvat.js` (`stjohns`): **ennen–nyt-pari
  on valmiiksi tarkistettu** (piirtäjä luonnostelee satamaa noin
  1890 / sama satama nykyään). Lisäkuvina Jellybean Row, Quidi Vidin
  kylä ja George Street. Nämä viisi tiedostonimeä ovat varattuja.
- `js/packs/northamerica-artikkelit.js`: St. John'silta **puuttuu
  merkintä kokonaan** → kirjoitetaan sekä intro että
  kolmikappaleinen teksti-kenttä. Avain on **`St. John's (Kanada)`**,
  sama kuin Halifaxilla (`Halifax (Kanada)`).

**1873-KEHYS:** isoisän matkavuonna St. John's **ei ollut Kanadaa**.
Newfoundland oli **itsehallinnollinen brittiläinen siirtomaa**, joka
oli **hylännyt liittymisen Kanadaan vuosina 1864–1869** ja liittyi
vasta 1949. Siirtomaan lakiasäätävä kokous istui **Colonial
Buildingissa**, joka oli avattu 1850. **Atlantin lennätinkaapeli oli
noussut maihin Heart's Contentissa 27. heinäkuuta 1866** eli
seitsemän vuotta ennen isoisän matkaa — juuri se on saapumistekstin
isoisä-noston aihe.

---

## 1. Nimi ja sijainti

- "St. John's is the capital and largest city of the Canadian
  province of Newfoundland and Labrador. It is located on the eastern
  tip of the Avalon Peninsula on the island of Newfoundland."
  Pinta-ala **446,04 km²**; **Pohjois-Amerikan itäisin kaupunki**
  (Grönlantia lukuun ottamatta). ("St. John's", johdanto)
- Nimi liitetään uskomukseen, että **John Cabot purjehti satamaan
  Johannes Kastajan syntymäjuhlana 1497**, mutta lähde sanoo tämän
  olevan **todennäköisesti legenda**, joka tuli brittiasutuksen
  mukana. Realistisempi mahdollisuus on samanniminen kalastajakylä
  ilman pysyvää asutusta suurimman osan 1500-lukua. Nimi **São
  João** on portugalilaisella **Pedro Reinelin kartalla 1519**.
  ("St. John's", johdanto ja Early history)
- **Sebastian Cabot** kirjoitti käsin latinaksi vuoden 1545
  kartassaan, että nimi syntyi, kun hän ja hänen isänsä **John
  Cabot** purjehtivat ensimmäisinä eurooppalaisina satamaan
  **24. kesäkuuta 1494** (brittiläisten ja ranskalaisten
  historioitsijoiden mukaan 1497), Johannes Kastajan juhlapäivänä.
  **Cabotin maihinnousupaikat ovat kuitenkin kiistanalaisia.**
  ("St. John's", Early history)
- Baskimaassa uskotaan yleisesti, että nimen antoivat **baskilaiset
  kalastajat**, koska St. John'sin lahti muistuttaa Pasaian lahtea,
  jonka yhdessä kalastajakylässä on nimi Donibane (San Juan).
  ("St. John's", Early history)
- Kaupunki **liitettiin virallisesti kaupungiksi 1888**.
  Metropolialueen väkiluku noin **239 316** (16.1.2025) — Kanadan
  22. suurin metropolialue ja Atlantin Kanadan toiseksi suurin
  Halifaxin jälkeen. ("St. John's", johdanto)
- Keskusta on sataman länsi- ja pohjoispuolella; kaupungin pinta-ala
  on suurempi kuin Montrealin, mutta suurin osa on rakentamatonta
  metsää. Havupuut — **mustakuusi, valkokuusi ja palsamipihta** —
  vallitsevat luontaista kasvillisuutta; suurin lehtipuu on
  **rauduskoivu**. ("St. John's", Geography)

## 2. Kalastajakylästä siirtomaaksi

- St. John'sia käyttivät kalastajat kausileireinä **1500-luvun
  alussa**. Portugalilaiset tekivät Azoreilta retkiä 1500-luvun
  alussa, ja **vuoteen 1540 mennessä ranskalaiset, espanjalaiset ja
  portugalilaiset alukset ylittivät Atlantin vuosittain** Avalonin
  niemimaan kalavesille. ("St. John's", Early history)
- Englantilainen merenkulkija **John Rut** kävi St. John'sissa
  **1527** ja löysi satamasta normanni-, bretagne- ja
  portugalilaisaluksia. **3. elokuuta 1527 Rut kirjoitti kuningas
  Henrik VIII:lle kirjeen** matkansa havainnoista — **ensimmäinen
  tunnettu Pohjois-Amerikasta lähetetty kirje**. ("St. John's",
  Early history)
- **5. elokuuta 1583** englantilainen **Sir Humphrey Gilbert**
  julisti alueen **Englannin ensimmäiseksi merentakaiseksi
  siirtomaaksi** kuningatar Elisabet I:n peruskirjalla. Pysyvää
  väestöä ei kuitenkaan ollut, ja Gilbert katosi merellä
  paluumatkalla. ("St. John's", Early history)
- **Bernard Draken retkikunta 1585** laskeutui St. John'siin ja
  vahvisti Englannin vaatimuksen. ("St. John's", Early history)
- **Vuoteen 1620 mennessä Englannin West Countryn kalastajat
  hallitsivat suurinta osaa Newfoundlandin itärannikosta.** Vuonna
  1627 William Payne kutsui St. John'sia "koko maan tärkeimmäksi,
  ensimmäiseksi ja pääasialliseksi tontiksi". ("St. John's",
  Early history)
- **Joskus vuoden 1630 jälkeen** St. John'sista tuli pysyvä
  yhteisö. Sitä ennen Englannin hallitus **nimenomaisesti kielsi**
  kalastajilta pysyvät asutukset West Countryn kalastuselinkeinon
  vaatimuksesta. ("St. John's", Early history)
- St. John's oli Newfoundlandin suurin asutus, kun laivaston
  upseerit alkoivat tehdä väestölaskentoja **noin 1675**. Vuonna
  **1680** kalastusalukset (enimmäkseen Etelä-Devonista) perustivat
  kaupunkiin "fishing rooms" -kalastustiloja ja toivat satoja
  irlantilaismiehiä rannikkoveneisiin. ("St. John's", Early history)
- **Vanhimman englanninkielisen pysyvän asutuksen kiista:** St.
  John'sia edelsivät **Jamestown Virginiassa (1607)**, **Cuper's
  Cove Cupidsissa Newfoundlandilla (1610)**, **St. George's
  Bermudalla (1612)** ja **Bristol's Hope Harbour Gracessa (1618)**.
  Kaikki nämä olivat paljon myöhempiä kuin Espanjan **St. Augustine
  Floridassa (1565)**. ("St. John's", The oldest European settlement
  … controversy)
- Siirtomaa: **Newfoundland perustettiin englantilaiseksi
  siirtomaaksi 1610**; siitä tuli **kruununsiirtomaa 1824** (johdanto)
  / **1825** (leipäteksti, ensimmäinen kuvernööri Thomas John
  Cochrane); se sai perustuslain **1832** ja **itsehallinnon 1854**
  (ensimmäinen pääministeri Philip Francis Little 1855–1858).
  **Maa hylkäsi liiton Kanadan kanssa vuosina 1864–1869.** Vuonna
  1907 siitä tuli **Dominion of Newfoundland**, 1934 hallinto
  siirtyi kuusijäseniselle komissiolle, ja **1948 kansanäänestykset
  johtivat liittymiseen Kanadaan 1. huhtikuuta 1949**.
  ("Newfoundland Colony")
  - *Huom. ristiriita:* kruununsiirtomaan vuosi 1824 vs. 1825, ja
    itsehallinto 1854 vs. Colonial Building -artikkelin
    "responsible government … in 1855". Ratkaisu:
    tarkistus-stjohns.md kohdat A ja B.

## 3. Kapea satamansuu ja sen puolustus

- Kaupungin ensimmäiset merkittävät varustukset rakennettiin
  todennäköisesti kauppaetujen takia sen jälkeen, kun hollantilainen
  amiraali **Michiel de Ruyter valtasi St. John'sin tilapäisesti
  kesäkuussa 1665**. ("St. John's", Early history) Fort William
  -artikkeli kertoo saman: **hollantilaislaivasto valtasi kaupungin
  1665** ja poltti aluksia ja omaisuutta rannalla. ("Fort William")
- Asukkaat torjuivat **toisen hollantilaishyökkäyksen 1673**.
  Puolustusta johti englantilainen kauppiaskapteeni **Christopher
  Martin**, joka laski maihin **kuusi tykkiä** aluksestaan *Elias
  Andrews* ja rakensi maavallin ja patterin **Chain Rockin**
  lähelle, mistä käsin hallittiin satamaan johtavaa **Narrowsia**.
  ("St. John's", Early history)
  - *Ristiriita:* pääartikkeli sanoo Martinilla olleen **23 miestä**
    ja torjuneensa **kolme hollantilaista sotalaivaa**; "Fort
    William" sanoo **alle kolmekymmentä miestä** ja torjuneensa sekä
    hollantilaishyökkäyksen että **neljän merirosvoaluksen** erillisen
    ryöstöretken. Ratkaisu: tarkistus-stjohns.md kohta C.
- Englannin hallitus suunnitteli laajentavansa varustuksia (**Fort
  William**) noin 1689, mutta rakentaminen alkoi vasta sen jälkeen,
  kun ranskalainen amiraali **Pierre Le Moyne d'Iberville valtasi ja
  tuhosi kaupungin 1696**. Kun 1 500 englantilaista vahvistusta
  saapui loppuvuodesta 1697, he löysivät raunioita.
  ("St. John's", Early history) Fort William valmistui **1700**:
  tiilipintaiset vallit, pomminkestävät rintavarustukset,
  ruutikellarit ja kunnon kasarmit. ("Fort William")
- Ranskalaiset hyökkäsivät uudestaan **1705** (viiden viikon piiritys,
  komentajana Daniel d'Auger de Subercase) ja **valtasivat kaupungin
  1709** (St. Ovide de Brouillon). **Utrechtin rauhassa 1713** Ranska
  luopui kaikista oikeuksistaan Newfoundlandilla. ("St. John's",
  Early history; "Fort William")
- **Seitsenvuotisen sodan viimeinen taistelu Pohjois-Amerikassa
  käytiin 1762 St. John'sissa.** Ranskalaiset olivat vallanneet
  kaupungin alkuvuodesta; **eversti William Amherst** nousi maihin
  **Torbayssa 13. syyskuuta**, ajoi ranskalaiset Quidi Vidin solasta
  ja **valtasi Signal Hillin yllätyshyökkäyksellä aamunkoitteessa
  15. syyskuuta**. Ranskalaiset antautuivat **18. syyskuuta**.
  ("St. John's", Early history; "Fort William")
- **1770-luvulta lähtien** Chain Rockin ja vastarannan **Pancake
  Rockin** välille kiristettiin yöksi **puomiketju** vintturilla
  estämään vihollisalusten pääsy satamaan; kivien väli on
  **174 metriä**. Maailmansodissa ketju korvattiin
  sukellusveneverkoilla. ("The Battery")
- **Fort Amherst ja Fort Waldegrave** rakennettiin 1700-luvun lopulla
  satamansuun puolustukseksi. ("St. John's", Early history)
- Fort William oli huonolla paikalla eikä pystynyt suojaamaan
  satamaa; **1779 britit rakensivat Fort Townshendin** lännemmäksi.
  **Fort William purettiin 1881** rautatien hotellin ja ratapihan
  tieltä; asemarakennus purettiin 1910. Paikalla ei ole näkyviä
  jäänteitä, ja se merkittiin **kansalliseksi historialliseksi
  kohteeksi 1952**; laatta on Cavendish Squaren ja Duckworth Streetin
  kulmassa. ("Fort William")

## 4. Turska, hylkeet ja öljy

- **Grand Banks** on sarja vedenalaisia tasankoja Newfoundlandin
  kaakkoispuolella mannerjalustalla, syvyydeltään noin 15–90 metriä.
  **Kylmä Labradorin virta sekoittuu lämpimään Golfvirtaan**, mikä
  aiheuttaa usein äärimmäistä sumua. Sekoittuminen ja pohjan muoto
  nostavat ravinteita pintaan ja tekivät alueesta **yhden maailman
  rikkaimmista kalavesistä**: turska, miekkakala, kolja, villakuore,
  kampasimpukka, hummeri sekä suuret merilintuyhdyskunnat (suulat,
  liitäjät) ja merinisäkkäät. ("Grand Banks of Newfoundland")
- **1700-luku toi Newfoundlandille suuria muutoksia:** väestönkasvun,
  hallinnon alun, kirkkojen perustamisen, kauppasuhteiden
  vahvistumisen Pohjois-Amerikkaan sekä **hylkeen-, lohen- ja Grand
  Banks -kalastuksen kehittymisen**. St. John's oli ensisijaisesti
  kalastusasema mutta myös varuskunta, hallintokeskus ja
  kauppakeskus. ("St. John's", Modern history)
- **1992 pohjoisen turskan kanta oli pudonnut yhteen prosenttiin
  historiallisesta tasosta** vuosikymmenten liikakalastuksen takia.
  Kalastusministeri **John Crosbie julisti pyyntikiellon**
  kalastukselle, joka oli muovannut Kanadan itärannikon elämää ja
  yhteisöjä **viisisataa vuotta**. Syynä oli etenkin 1950-luvulta
  alkanut tekniikka: troolarit, joissa oli tutka, elektroninen
  navigointi ja kaikuluotain, ulottivat pyynnin laajemmalle ja
  syvemmälle, ja saaliit huipentuivat 1970- ja 1980-luvuilla.
  Troolit ottivat myös valtavasti kaupallisesti arvotonta mutta
  ekologisesti tärkeää kalaa. ("Collapse of the Atlantic northwest
  cod fishery") Kanadan Grand Banks -kalastus oli suljettuna
  **1992–2024**. ("Grand Banks of Newfoundland")
  - *Ristiriita:* saman artikkelin kuvateksti sanoo romahduksen
    tapahtuneen **1993**, leipäteksti **1992**. Ratkaisu:
    tarkistus-stjohns.md kohta D.
- Romahduksen jälkeen kaupungin läheisyys **Hibernian, Terra Novan ja
  White Rosen öljykenttiin** käänsi talouden nousuun. St. John's on
  **Itä-Kanadan öljy- ja kaasuteollisuuden keskus** ja yksi 19
  "World Energy Cities" -kaupungista; ExxonMobil Canadan pääkonttori
  on täällä. Neljäs kenttä, **Hebron**, löydettiin 1981 ja avattiin
  2017; sen arvioidaan sisältävän yli **700 miljoonaa tynnyriä**
  tuotantokelpoisia hiilivetyjä. **St. John'sin alue vastaa noin
  puolta provinssin talouden tuotoksesta.** ("St. John's", Economy;
  Modern history)
- Julkinen sektori — liittovaltio, provinssi ja kunta — on ollut
  avainasemassa työvoiman kasvussa ja talouden vakaudessa.
  ("St. John's", Economy)

## 5. Viisi suurpaloa ja Jellybean Row

- **St. John's tuhoutui suurpaloissa 1816, 1817, 1819, 1846 ja
  1892**, joka kerta suuri osa kaupungista. Tunnetuin on **vuoden
  1892 suurpalo**. ("St. John's", Fires)
- **12. helmikuuta 1816** noin kello kahdeksan palo syttyi talossa
  King's Beach -nimisellä alueella ja levisi niin rajusti, että
  **satakaksikymmentä taloa** — noin tuhannen ihmisen kodit —
  paloivat ennen kuin tuli saatiin pysäytettyä. Vuonna **1817**
  paloja oli kaksi ("The Great Fire of 1817"), ja **1819** tuli
  tuhosi **120 taloa**. ("St. John's", Fires)
- **Vuoden 1846 palo** alkoi puusepän — nimeltään Hamlin — pajasta
  George Streetillä Queen Streetin varrella, kun **liimapata kiehui
  yli**. Palo levisi Water Streetiä ja Duckworth Streetiä pitkin, ja
  kauppiaiden varastoima **hylkeenrasva** ruokki sitä. Sitä lisäsi
  myös yritys räjäyttää talo Water Streetillä: räjäytys **levitti
  palavia kekäleitä ympäri kaupunkia**. ("St. John's", Fires)
- **Vuosisadan viimeinen suurpalo alkoi 8. heinäkuuta 1892
  iltapäivällä Carter's Hillillä Freshwater Roadin varrella.** Aluksi
  se ei aiheuttanut laajaa paniikkia, mutta sarja onnettomia
  yhteensattumia levitti sen niin, että se söi **käytännössä koko
  kaupungin itäpään**, myös suuren osan liikekeskustasta.
  ("St. John's", Fires)
- **Suurpalo 1892 tuhosi suurimman osan keskustan ytimestä, ja
  useimmat asuin- ja muut puurunkoiset rakennukset ovat siltä
  ajalta.** Kaupungin varhaisin esikaupunki **Georgestown** jäi
  palon ulkopuolelle. ("St. John's", Downtown architecture)
- **Jellybean Row:** kaupunki on rakennettu mäkiseen maastoon, ja
  asuinkatujen sokkelossa talot on tavallisesti maalattu kirkkain
  värein — siitä lempinimi keskustan rivitaloille. **Keskusta ei
  kuitenkaan ole aina ollut värikäs:** 1800- ja 1900-luvulla
  kaupunkia peittänyt **kivihiilinoki** teki vaaleista ulkomaaleista
  epäkäytännöllisiä, ja talot olivat enimmäkseen tummanvihreitä,
  -punaisia, -ruskeita ja harmaita. **Kirkkaat värit tulivat
  1970-luvulla**, kun kivihiilestä luovuttiin.
  ("St. John's", Downtown architecture)
- Kaupunginvaltuusto otti keskustassa käyttöön tiukat
  perintösäännöt, muun muassa **rakennusten korkeusrajoituksen**,
  ja ne ovat aiheuttaneet keskustelua vuosien varrella.
  ("St. John's", Downtown architecture)

## 6. Teemasivun aineisto: viesti valtameren yli

- **Merikaapeli:** Heart's Content Newfoundlandilla oli **ensimmäisen
  pysyvän valtamerenalaisen lennätinkaapelin läntinen pääte**;
  itäinen pääte oli **Valentian saarella Irlannissa**. Kaapeli
  vedettiin maihin **27. heinäkuuta 1866** useiden epäonnistuneiden
  yritysten jälkeen, ja sen toi **Great Eastern**, aikansa suurin
  höyrylaiva. Ensimmäiset viestit lähetettiin **morsella**, ja
  asemalla työskenteli kolme ihmistä. Aseman perusti **Anglo-American
  Telegraph Company**, ja **Western Union osti sen 1912**.
  Parhaimmillaan **yli 200 Heart's Contentin asukasta** työskenteli
  kaapeliyhtiölle. Nykyinen asemarakennus rakennettiin **1875–76**
  st. john'silaisen arkkitehdin **J. J. Southcottin** piirustusten
  mukaan, ja **1918** siihen tehtiin laajennus, jossa oli
  naishenkilökunnalle oma pesuhuone. **Asema suljettiin 1965**, kun
  puhelinkaapelit ja satelliitit tekivät lennättimestä vanhentuneen.
  Se on ollut provinssin historiallinen kohde ja museo vuodesta 1974.
  ("Heart's Content Cable Station")
- **Marconi:** **Guglielmo Marconi vastaanotti ensimmäisen
  langattoman viestin Atlantin yli St. John'sissa 12. joulukuuta
  1901**; lähetys tuli hänen asemaltaan **Poldhusta Cornwallista**.
  Vastaanottopaikka oli **lähellä Cabot Toweria Signal Hillillä**, ja
  viesti oli morsen kirjain **S**. ("St. John's", Modern history;
  "Cabot Tower")
- **Cabot Towerissa avattiin 1933 Marconi-asema**, joka toimi vuoteen
  1960. **Vuonna 1920 sieltä tehtiin yksi ensimmäisistä langattomista
  ihmisäänen lähetyksistä Atlantin yli**: aseman miehet puhuivat
  Englannista lähteneen höyrylaiva Victorian kanssa. ("Cabot Tower")
- **Lentäminen:** **St. John's oli lähtöpaikka ensimmäiselle
  keskeytyksettömälle Atlantin ylittäneelle lennolle**, jonka
  **Alcock ja Brown** tekivät **kesäkuussa 1919** muunnetulla
  Vickers Vimy IV -pommikoneella. Lento lähti **Lester's Fieldiltä**
  ja päättyi suohon **Clifdenin lähellä Connemarassa Irlannissa**.
  Heinäkuussa 2005 lennon toisti amerikkalainen **Steve Fossett**
  Vickers Vimyn jäljennöksellä; lähtöpaikkana oli tällöin **St.
  John'sin lentoasema**, koska Lester's Field on nykyään
  asuinaluetta. ("St. John's", Modern history)
- **Newfoundlandin aikavyöhyke (NT)** vähentää normaaliaikana
  **3,5 tuntia UTC:stä** (UTC−03:30). Kellonaika perustuu
  **52 astetta 30 minuuttia läntisen pituuspiirin** keskiaurinkoaikaan
  — ja se on **lähes tarkalleen St. John'sin oma pituuspiiri**.
  Vyöhyke on **Amerikoiden ainoa käytössä oleva puolen tunnin
  poikkeama UTC:stä**. Se on olemassa siksi, että saari oli
  **erillinen dominio, kun aikavyöhykkeet luotiin**, ja sillä oli
  siksi oikeus valita oma aikansa. **Vuonna 1935 Newfoundlandin
  hallintokomissio sääti Standard Time Actin**, joka asetti ajaksi
  GMT−3,5 h. **Vuonna 1963 provinssi yritti siirtyä Atlantin
  aikaan mutta perui hankkeen vastustuksen takia.** Saari on
  puolitoista tuntia Keski-Kanadaa edellä, puoli tuntia muuta
  Atlantin Kanadaa edellä ja puoli tuntia Saint-Pierreä ja
  Miquelonia jäljessä. ("Newfoundland Time Zone")
- **Sumu ja tuuli:** Kanadan suurista kaupungeista St. John's on
  **sumuisin (124 päivää)** ja **tuulisin (keskinopeus
  24,3 km/h)**. Vuosisade on **1 538,9 mm** — kaupunki on Kanadan
  sateisimpia Brittiläisen Kolumbian rannikon ulkopuolella. Sadetta
  tulee ympäri vuoden; **kesä on kuivin vuodenaika, kesäkuu kuivin
  kuukausi (88,2 mm)**, ja märimmät kuukaudet ovat lokakuusta
  tammikuuhun, **joulukuu märin (173,9 mm)** — mannerilmastolle
  epätavallinen talvimaksimi. ("St. John's", Climate)

## 7. Ilmasto (matkaoppaan sääjakso)

- Kostea mannerilmasto (Köppen **Dfb**), jonka vuodenaikaisvaihtelu on
  leveysasteeseen nähden pieni **Golfvirran tasoittavan vaikutuksen**
  takia. Keskilämpötila vaihtelee **helmikuun −4,7 °C:sta elokuun
  16,5 °C:seen** — vuodenajat siis viivästyvät. ("St. John's",
  Climate)
- Kaupunki on maan alttiimpia **trooppisten myrskyjen** vaikutuksille,
  koska Atlantti on idässä ja myrskyt kulkevat Yhdysvalloista
  pohjoiseen. ("St. John's", Climate)
- **Lumisade on runsasta, keskimäärin 242,8 cm talvikaudessa.**
  Talvimyrsky voi tuoda saman rytäkän aikana useaa
  sadetyyppiä — vettä, jäätävää sadetta, räntää ja lunta — jolloin
  lumipeitettä ei välttämättä kerry lainkaan. **Jäätävän sateen
  jaksot ("silver thaw")** halvaannuttivat kaupungin pahimmillaan
  huhtikuussa **1984** ja huhtikuussa **2017**. ("St. John's",
  Climate)
- **17. tammikuuta 2020 St. John's julisti hätätilan** lumimyrskyn
  takia: **76 cm** vuorokaudessa (kaupungin ennätys) ja
  hurrikaanivoimakkaita tuulia **130 km/h**. Seuraavana päivänä
  kutsuttiin **Kanadan armeija** avuksi lumitöihin, ja hätätila
  kesti kahdeksan päivää. ("St. John's", Climate)
- Korkein mitattu lämpötila **33,9 °C 14. elokuuta 1876**; kylmin
  **−29,4 °C 16. helmikuuta 1875**. ("St. John's", Climate)

## 8. Kohdekartan kahdeksan kohdetta (eivät toista lehden juttuja)

Koordinaatit en-Wikipedian coordinates-propista (artikkelien
`{{coord}}`-mallineista) ja geosearchista 7.9.2026; kaikki 28 väliä
laskettu haversinilla (tarkistus-stjohns.md kohta H).

1. **Colonial Building** 47.570928 / −52.706789. Siirtomaan ja
   myöhemmin provinssin hallituksen ja **House of Assemblyn koti
   28. tammikuuta 1850 – 28. heinäkuuta 1959**; provinssin
   historiallinen kohde 1974. Kun siirtomaa sai edustuksellisen
   hallinnon **1832**, lakiasäätävällä kokouksella ei ollut omaa
   taloa: ensimmäinen koti oli **Mary Traversin majatalo Duckworth
   Streetillä**, ja oleskelu jäi lyhyeksi, koska kokous unohti
   kiireessä ja kokemattomuudessaan hyväksyä vuokrarahat. Rakennus
   tuhoutui vuoden **1846 palossa**. Seuraavat seitsemäntoista vuotta
   kokoonnuttiin väliaikaisissa tiloissa, muun muassa raastuvassa.
   Vuonna 1846 hyväksyttiin laki pysyvän talon rakentamisesta;
   **peruskiven laski kuvernööri Sir John Gaspar Le Marchant
   24. toukokuuta 1847**, ja talo avattiin **28. tammikuuta 1850**.
   Pääarkkitehti oli **James Purcell**, urakoitsija Patrick Keough.
   Uusklassinen rakennus tehtiin **valkoisesta kalkkikivestä, joka
   tuotiin varta vasten Little Islandilta Corkista Irlannista**;
   julkisivussa on **kuuden joonialaisen pylvään portiikki** ja
   päädyssä syvänä reliefinä kuninkaalliset vaakunat. Kokonaishinta
   oli **18 335 puntaa**. Vuonna **1880 puolalainen freskomaalari
   Alexander Pindikowski**, joka istui 15 kuukauden tuomiota
   väärennöksestä, sai **kuukauden lyhennyksen tuomioonsa** siitä,
   että hän maalasi Colonial Buildingin ja Government Housen katot.
   Hallituspuolue valitsi istua puhemiehen **vasemmalla** puolella
   perinteisen oikean sijasta, koska **siellä olivat lämmittimet**
   — ja tapa jatkuu yhä. Talossa **Newfoundland sai
   parlamentaarisen hallinnon 1855**, siirtyi komissiohallintoon
   1934, piti kansalliskokouksen 1946–48 ja liittyi Kanadaan 1949.
   Talossa tehtiin myös **Newfoundlandin ensimmäinen pankkiryöstö
   1850**: yön 30. marraskuuta varkaat tulivat pohjakerroksen
   ikkunasta ja veivät **413 puntaa** säästöpankin rautaisesta
   arkusta. ("Colonial Building")
2. **Fort William** 47.570800 / −52.700600. Ks. kohta 3.
   Rakennettu **1698** (valmis 1700) suojaamaan Englannin etuja,
   **Newfoundlandin brittivaruskunnan alkuperäinen esikunta**.
   Toinen linnake, **Fort George**, oli sataman itäpäässä ja
   yhdistettiin Fort Williamiin **maanalaisella käytävällä**;
   Narrowsin eteläpuolella oli kolmas varustus, **the Castle**.
   Esikunta siirtyi **Fort Townshendiin** (rakennettu 1775–79).
   **Linnake purettiin 1881** rautatien ratapihan tieltä, ja kasarmia
   käytettiin asemana; se purettiin 1910. **Kansallinen
   historiallinen kohde 1952**; näkyviä jäänteitä ei ole, ja paikka
   on merkitty laatalla Cavendish Squaren ja Duckworth Streetin
   kulmassa olevaan tukimuuriin. ("Fort William")
3. **Cabot Tower** 47.570014 / −52.681772. Torni Signal Hillillä.
   **Rakentaminen alkoi 1898** John Cabotin Newfoundlandiin
   saapumisen 400-vuotispäivän ja **kuningatar Viktorian
   timanttijuhlavuoden** muistoksi, ja se **valmistui 1900**.
   Rakennushanke ei ollut suosittu: kaupunki oli palanut **1892** ja
   Newfoundlandin pankit kaatuivat **1894**, ja kun tuomari
   **D. W. Prowse** ehdotti tornia, eräs kirjoitti paikallislehdessä,
   että se on "kuin panisi silkkihatun miehen päähän, jolla ei ole
   varaa saappaisiin". **Torni oli ennen kaikkea lippusignaaliasema.**
   Britit käyttivät kukkulaa — alun perin nimeltään the Lookout —
   siihen jo **noin 1704**: korkeimmalla kohdalla oli masto, ja
   signaalimies ilmoitti lipulla saapuvan aluksen tyypin ja maan sekä
   ampui tykillä, jolloin kaupungissa vastattiin laukauksella.
   1700-luvun loppuun mennessä paikalle oli rakennettu vartiotalo.
   **Cabot Tower oli viimeinen Signal Hillin signaalitaloista, ja
   lippusignalointi jatkui siellä vuoteen 1958.** Arkkitehtuuri on
   myöhäistä uusgotiikkaa; materiaali on **epäsäännöllisesti ladottu
   punainen hiekkakivi**, ja rakennuksessa on kaksikerroksinen,
   30 jalan neliömäinen runko sekä kolmikerroksinen, 50 jalan
   kahdeksankulmainen torni kaakkoiskulmassa. Arkkitehti oli
   **William Howe Greene**. **31. joulukuuta 1918** tornissa sattui
   räjähdys, kun Michael Cantwell valmisteli ruutia keskipäivän
   tykinlaukausta varten; syyksi arvellaan hänen piippuaan.
   ("Cabot Tower")
   - **TIETOINEN RAJAUS:** Marconin vuoden 1901 vastaanotto on
     **teemasivun oma aihe**, eikä sitä kerrota tässä jutussa
     (vertaa Tangerin Pyhän Andreaksen kirkko ja Matisse, v1670).
   - *Ristiriita:* pääartikkeli sanoo tornin rakennetun **1897**,
     oma artikkeli **1898–1900**. Ratkaisu: tarkistus-stjohns.md
     kohta E.
4. **The Battery** 47.568892 / −52.690414. Kaupunginosa satamansuulla
   Signal Hillin rinteillä, jota kuvataan **outportiksi kaupungin
   sisällä**; tunnettu jyrkistä rinteistään ja värikkäistä
   taloistaan. Paikalla on ollut vuosisatojen ajan tykkipattereita,
   muun muassa **Fort Waldegrave**, myös molemmissa maailmansodissa.
   Alueella on **Chain Rock**, kallionokka, johon **jo 1770-luvulta
   lähtien** kiinnitettiin **Fort Amherstiin ulottuva ketju**
   estämään vihollisalusten pääsy satamaan. Vastaranta on **Pancake
   Rock**, ja kivien väli on **174 metriä**; ketju kiristettiin
   yöksi vintturilla. Maailmansodissa ketju korvattiin
   sukellusveneverkoilla. Rinteillä on ollut **pieniä maanvyöryjä ja
   lumivyöryjä**: 1900-luvulla kolme lumivyöryä aiheutti kuoleman tai
   vakavan loukkaantumisen (kaksi helmikuussa 1921, yksi helmikuussa
   1959). Kaupunki alkoi tutkia aluetta **1995** ja käytti arviolta
   **300 000 dollaria** rinteen vakauttamiseen; siitä huolimatta
   yksi talo vaurioitui pahoin lumivyöryssä **tammikuussa 2020**
   ennätyslumisateen ja hurrikaanivoimaisten tuulten jälkeen.
   ("The Battery")
5. **Pyhän Johannes Kastajan basilika** 47.567356 / −52.710100.
   Roomalaiskatolisen arkkihiippakunnan **metropoliittakatedraali**,
   joka sijaitsee **St. John's Ecclesiastical Districtissä**,
   kansallisessa historiallisessa kaupunginosassa. **Newfoundlandin
   siihenastisen historian suurin rakennushanke.** Kaivutyöt alkoivat
   **toukokuussa 1839**, peruskivi laskettiin **toukokuussa 1841**,
   ja kirkko vihittiin **9. syyskuuta 1855**. **Valmistuessaan se oli
   Pohjois-Amerikan suurin kirkkorakennus**, ja se on yhä Kanadan
   toiseksi suurin kirkko Montrealin Pyhän Joosefin oratorion jälkeen
   ja maan suurin katedraalikirkko. Rakennus on **yksi harvoista St.
   John'sin rakennuksista, jotka selvisivät vuoden 1892 suurpalosta.**
   Se on rakennettu **latinalaisen ristin muotoon lombardialaiseen
   romaaniseen tyyliin**, ja se on suunnattu poikkeuksellisesti:
   julkisivu osoittaa **talvipäivänseisauksen nousevan ja
   kesäpäivänseisauksen laskevan auringon linjaan**, kuten
   keskiaikainen Chartresin katedraali. Piispa **Michael Anthony
   Flemingille** sen suunnitteli Tanskan hallituksen arkkitehti
   **Ole Joergen Schmidt**, joka asui Altonassa Hampurissa.
   Materiaalit tuotiin osin kaukaa: **kalkkikivi ja graniitti
   Galwaysta ja Dublinista, 400 000 tiiltä Hampurista**, ja lisäksi
   paikallista hiekkakiveä St. John'sista ja Kelly's Islandilta.
   Ulkomitat **260 × 220 jalkaa**, tornit **150 jalkaa** kadun
   tasosta, ja kirkkoon mahtuu noin **2 500** ihmistä. Itätornissa on
   yksi kello, **kahden tonnin St. John Bell**, jonka piispa Mullock
   osti helmikuussa 1850; **John Murphy Dublinista** valoi sen, se
   oli **siihenastisista Irlannissa valetuista suurin** ja voitti
   kultamitalin Dublinin näyttelyssä. Länsitornissa on kahdeksan
   kelloa. Kirkossa on **28 lasimaalausta** ylemmillä seinillä
   (asennettu 1859–1905) ja **35 kiertokäytävässä** vuosilta
   1954–55 — läntisen pallonpuoliskon suurin yhden rakennuksen
   kokoelma irlantilaista Arts and Crafts -lasia. Alttarilla on
   irlantilaisen **John Hoganin** vuonna 1854 carraran marmorista
   veistämä *Kuollut Kristus*, kolmesta samanlaisesta ainoa Irlannin
   ulkopuolella. **Pius XII korotti kirkon basilikaksi 30. toukokuuta
   1955**, ja se nimettiin **kansalliseksi historialliseksi kohteeksi
   1983**. ("Basilica of St. John the Baptist")
6. **Kansallinen sotamuistomerkki** 47.567578 / −52.703797.
   Ensimmäisen maailmansodan muistomerkki **King's Beachilla Water
   Streetin varrella**, siinä missä Humphrey Gilbert julisti
   Newfoundlandin Englannille 1583. **Paljastettiin Memorial Daynä
   1. heinäkuuta 1924**, ja paljastajana oli sotamarsalkka **Douglas
   Haig**; paikalla oli **20 000 ihmistä eli noin kymmenen prosenttia
   saaren väestöstä**. Rakennustyötä valvoivat everstiluutnantti
   isä **Thomas Nangle** ja kapteeni **Gerald Whitty**. Muistomerkki
   liittyy **1. heinäkuuta 1916 Beaumont-Hameliin**, jossa Royal
   Newfoundland Regiment menetti noin puolessa tunnissa 86 prosenttia
   vahvuudestaan kaatuneina, kadonneina tai haavoittuneina;
   seuraavana aamuna 800 miehestä ilmoittautui **68**. Sodassa kuoli
   noin **1 700 newfoundlandilaista**, joista **820:llä ei ole
   tunnettua hautaa**. Muistomerkin **viisi hahmoa** suunnittelivat
   englantilaiset **Ferdinand Victor Blundstone** ja **Gilbert
   Bayes**: keskellä nainen soihtu vasemmassa ja miekka oikeassa
   kädessä, sivusiivillä merireservin merimies kaukoputkineen ja
   rykmentin sotilas, ja alempana kalastajia öljyvaatteissa sekä
   metsätyömies kirves olalla. Muistomerkin **satavuotispäivänä
   2024** siihen lisättiin **tuntemattoman sotilaan hauta** —
   ainoa kerta, jolloin Commonwealth War Graves Commission on
   sallinut samaan maahan toisen tuntemattoman sotilaan haudan.
   ("National War Memorial (Newfoundland)")
7. **Anglikaaninen Pyhän Johannes Kastajan katedraali**
   47.565500 / −52.708200. Newfoundlandin ja Labradorin
   anglikaanien **äitikirkko**. Seurakunta perustettiin **1699**
   vetoomuksella Lontoon piispalle **Henry Comptonille**, kun
   ranskalaiset olivat tuhonneet kaupungin ja sen kirkon **1696**.
   Paikalla tai sen lähellä on ollut ainakin **kuusi puukirkkoa**,
   ja jokainen tuhoutui sotatoimissa. Ensimmäisen kivikirkon
   rakentaminen alkoi **1843** piispa **Aubrey Spencerin** johdolla,
   mutta se **tuhoutui vuoden 1846 palossa**. Nykyisen katedraalin
   aloitti **1847** piispa **Edward Feild**, ja piirustukset tilattiin
   uusgotiikan johtavalta arkkitehdilta **George Gilbert Scottilta**.
   **Kirkkosali rakennettiin 1847–1850 ja toimi 35 vuotta koko
   katedraalina**; kuoro ja poikkilaiva rakennettiin vasta
   **1880–1885**, jolloin kirkko sai latinalaisen ristin muodon.
   **8. heinäkuuta 1892** katedraali vaurioitui pahoin suurpalossa:
   kattopalkit syttyivät, katto romahti ja veti mukanaan
   kirkkosalin ylemmät seinät ja pilarit; **kuumuus sulatti lyijyn
   ikkunoista niin, että kaikki paitsi kaksi tuhoutuivat** — ainoa
   säilynyt on sakastissa. Kunnostus alkoi 1893, kuori ja
   poikkilaivat olivat valmiit 1895 ja kirkkosali **1905**; kirkko
   vihittiin uudelleen **21. syyskuuta 1905**. **Katedraali on yhä
   kesken:** Scottin suunnittelema torninhuippu puuttuu, ja vaikka
   150 jalan tornin on todettu olevan rakenteellisesti mahdollinen,
   kustannusarvio oli kolme miljoonaa dollaria eikä seurakunnalla
   ole aikeita rakentaa sitä. Mitat: **200 jalkaa** länsiovista
   kuoriin, kirkkosali **60 jalkaa** leveä, poikkilaivojen kohdalla
   **99 jalkaa**; lattiasta kattoon **57 jalkaa**. **Kansallinen
   historiallinen kohde 1979.** ("Cathedral of St. John the Baptist")
8. **Water Street** 47.562581 / −52.708647. Keskustan katu, josta
   tuli **baskien, ranskalaisten, espanjalaisten, portugalilaisten ja
   englantilaisten kauppapaikka**. Katu on yhä kaupungin
   kaupallisen toiminnan ydin, ja **2020 kaupunki teki siitä
   kesäkaudeksi osittain kävelykadun**. **Water Street Historic
   District nimettiin kansalliseksi historialliseksi kohteeksi
   1987**; se koostuu liikerakennuksista, jotka edustavat
   1800-luvun kauppahuoneita, Newfoundlandin kalastusta ja
   Atlantin kauppaa. ("Water Street (St. John's)")

## 9. Matkaoppaan aineisto

- **Perille:** St. John's International Airport on **kymmenen
  minuutin päässä keskustasta luoteeseen** ja **Atlantin Kanadan
  toiseksi vilkkain lentoasema**. Kaupunki on **Trans-Canada
  Highwayn itäinen päätepiste** (Route 1), yksi maailman pisimpiä
  kansallisia valtateitä; kaupungin ohittava osuus tunnetaan nimellä
  Outer Ring Road. ("St. John's", Transportation)
- **Satama:** merkittävä satama, joka on **Kanadan rannikkovartioston
  aluksien kotisatama** — muun muassa jäänmurtajat Ann Harvey,
  George R. Pearkes, Henry Larsen, Louis S. St-Laurent ja Terry Fox.
  ("St. John's", Transportation) Risteilyalukset käyttävät satamaa
  sekä kotisatamana että välisatamana. ("St. John's", Tourism)
- **Kävelyreitit:** **Grand Concourse** kokoaa kaupungin polut:
  Quidi Vidin järven kierros, osia Signal Hillistä, keskustan katuja,
  jokivarsia ja muita järviä; se ulottuu myös Mount Pearliin.
  Signal Hillin **North Head Trail** avaa näkymän Atlantille.
  ("St. John's", Trails; National Historic Sites)
- **Puistot:** **Pippy Park** on kaupungin itäosassa, yli **1 400
  hehtaaria**, ja se on Kanadan suurimpia kaupunkipuistoja: kaksi
  golfkenttää, provinssin suurin varustettu leirintäalue, kävely- ja
  hiihtoreittejä sekä **Fluvarium**, ympäristökasvatuskeskus, joka
  näyttää purosta poikkileikkauksen. **Bowring Park** Waterford
  Valleyssä on kaupungin kauneimpia; sisäänkäynnin luona on
  ankkalampi ja **Peter Pan -patsas**. Puiston lahjoitti kaupungille
  **1911 Sir Edgar Rennie Bowring** Bowring Brothersin puolesta
  yhtiön satavuotisjuhlan kunniaksi, ja sen avasi **Connaughtin
  herttua 15. heinäkuuta 1914**. **Bannerman Park** on
  viktoriaaninen puisto keskustan lähellä; sen avasi **1891**
  siirtomaan kuvernööri **Sir Alexander Bannerman**, joka lahjoitti
  maan. Memorial-yliopistolla on **110 eekkerin kasvitieteellinen
  puutarha**. ("St. John's", Parks; Botanical Garden)
- **Museot:** **The Rooms** kokoaa provinssin museon, taidegallerian
  ja arkiston samaan taloon keskustassa (muutto 2005). Muita museoita
  ovat **Railway Coastal Museum** 104 vuotta vanhassa
  rautatieasemarakennuksessa Water Streetillä ja **Johnson Geo
  Centre**, geologinen tulkintakeskus Signal Hillillä.
  **Murray Premises** on keskustan kansallinen historiallinen kohde:
  rakennukset palvelivat kalastusta — kalan kuivausta ja
  pakkaamista, kalan, tynnyrien ja muun tavaran varastointia.
  Vanhin rakennuksista, Beck's Coveen päin, **rakennettiin vuoden
  1846 palon jälkeen** ja toimi aikanaan sekä kauppana että
  asuntona; se kunnostettiin 1979. ("St. John's", Museums; National
  Historic Sites)
- **Signal Hill:** kansallinen historiallinen kohde, jolla käy
  **97 prosenttia kaikista St. John'sin matkailijoista**; suosittuja
  ovat **Signal Hill Tattoo**, joka esittää Royal Newfoundland
  Regiment of Footia noin vuodelta 1795, ja North Head Trail.
  ("St. John's", National Historic Sites)
- **Ilta ja kadut:** **Water Street ja Duckworth Street** tunnetaan
  kirkkaanvärisistä matalista perintörakennuksista, joissa on
  matkamuisto- ja vaatekauppoja ja ravintoloita. **George Street**,
  lyhyt sivukatu Water Streetin länsipään yläpuolella, on kaupungin
  yöelämän keskus; siellä järjestetään elokuussa **George Street
  Festival** ja lokakuussa Mardi Gras -juhla. **LSPU Hall** on
  Resource Centre for the Artsin koti ja keskustan taide-elämän
  selkäranka; sieltä ovat ponnistaneet muun muassa **Rick Mercer,
  Mark Critch, Mary Walsh, Cathy Jones, Andy Jones ja Greg Thomey**.
  ("St. John's", Culture; Theatre)
- **Musiikki ja juhlat:** kaupungissa on **Newfoundland Symphony
  Orchestra**, jousikvartetti ja kuoroja; Memorial-yliopiston
  musiikkikoululla on omia yhtyeitä. **Tuckamore Festival** on
  järjestetty joka elokuu vuodesta 2001, **Opera on the Avalon**
  esittää oopperaa kesällä, ja **Kittiwake Dance Theatre** (1987) on
  provinssin johtavia tanssiryhmiä. **Kilautiup Songuninga** (2006)
  oli ensimmäinen St. John'siin sijoittuva inuiittien rumputanssi- ja
  kurkkulauluryhmä. **Sound Symposium** on järjestetty joka toinen
  vuosi vuodesta 1983, ja sen tunnusomaisin osa on **Harbour
  Symphony**, jonka sataman laivojen torvet soittavat päivittäin
  keskipäivällä. ("St. John's", Music)
- **Regatta:** **Royal St. John's Regatta on Pohjois-Amerikan vanhin
  vuosittainen urheilutapahtuma**, ja vuoden **1816** soutukilpailut
  ovat asiakirjoin todistetut. Kilpailu soudetaan **Quidi Vidin
  järvellä ensimmäisenä keskiviikkona elokuuta**; jos sää tai tuuli
  ei sovi, se siirretään seuraavaan sopivaan päivään. **Regatta Day
  on St. John'sissa vapaapäivä**, joten sää päättää, saavatko
  työntekijät vapaata — yksi maailman harvoista säästä riippuvista
  juhlapäivistä. Miehistöt soutavat kuuden hengen kiinteäistuimisia,
  perämiehellisiä kilpaveneitä, jotka omistaa regattakomitea;
  miesten rata on **2,450 km** ja naisten **1,225 km**, ja
  molemmissa käännytään poijulta takaisin lähtö- ja maaliviivalle.
  Katsojia on viime vuosina ollut noin **50 000**. **Ensimmäinen
  naisten kilpailu soudettiin 1856**; naiset palasivat rataan vasta
  1949, ja oma mestaruuskilpailu tuli 1979. Regattaa ovat käyneet
  katsomassa muun muassa **prinssi Albert Edward 1860** ja
  **kuningatar Elisabet II 1978**, ja **Royal-etuliite otettiin
  käyttöön 1993**. ("Royal St. John's Regatta")
  - *Huom.* Regattakomitea laskee vuosipäivänsä vuodesta **1818**,
    jolloin kilpailut pidettiin 22. syyskuuta kuningas Yrjö III:n
    kruunauksen 57-vuotispäivän kunniaksi; 200-vuotisjuhla
    vietettiin elokuussa 2018. Asiakirjat soutukilpailuista ovat
    kuitenkin vuodelta 1816.
- **Muu urheilu:** **Tely 10** on kymmenen mailin maantiejuoksu, joka
  alkaa Paradisesta ja päättyy Bannerman Parkiin; se houkuttelee yli
  2 500 juoksijaa ja alkoi **1922**. **Brad Gushuen** vuoden 2006
  olympiakultaa voittanut curlingjoukkue on kotoisin kaupungista.
  ("St. John's", Other sports)
- **Cape Spear** on lähellä; se on kaksi vaellusreittiä yhdistävä
  niemi. ("St. John's", Trails)
