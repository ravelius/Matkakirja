# USA-maalehti (ISO-3: USA) — sisältösuunnitelma ja faktapohja

*Koonnut Sonnet-faktapohja-agentti 22.8.2026. Kaikki en-Wikipedia-faktat
haettu tänä päivänä raakatekstihaulla
(`https://en.wikipedia.org/w/index.php?title=X&action=raw`,
`NODE_USE_ENV_PROXY=1` ei tarvittu — curl toimi suoraan). Malli luettu
tiedostosta `js/packs/maa-kategoriat.js` (ITA- ja IND-lohkot) sekä
`docs/aasia-tyoaineisto/faktapohja-kioto.md` (Sonnet-koostetyön ulkoasu).
Rakenteen ja mittojen SITOVA lähde on `docs/moduulit/maalehti.md` ja
`docs/aasia-tyoaineisto/lehtityo-resepti.md`. Ei lopullisia lehtitekstejä,
ei ladattuja kuvia, ei kosketusta js/packs-tiedostoihin — tämä on vain
suunnitelma seuraavaa kirjoittajaa varten.*

Sisältölinjaus tarkistettu: ei nykysotaa, ei nykypolitiikkaa. Orjuus,
sisällissota ja alkuperäiskansojen kohtalo mainitaan tarvittaessa
neutraalina historiana ilman väkivallan yksityiskohtia (esim. Powellin
sotavamma tai Lincolnin salamurha mainitaan vain tapahtumana, ei
kuvailtuna). 1873-kulma on mukana joka aiheessa, useassa nostossa
täsmällisenä vuosilukuna asti (ks. luku 10).

---

## 1. Sisältösuunnitelma: miksi juuri nämä viisi aihetta

USA on Raamatun tarkoittama **monikohdemaa** (New York, San Francisco,
Los Angeles, Chicago, Denver, Houston, New Orleans, Miami, Santa Fe,
Grand Canyon, Yellowstone, Mount Rushmore, Appalakit, Havaiji —
`js/packs/northamerica.js`, rivit 109–151), joten laajuusesitys on
maalehti.md:n täysi mitta: **5 aihetta × 4 nostoa = 20 nostoa**, kunkin
aiheen omalla minitehtävällä (5 kpl). Tämä vastaa ITA/IND-lohkojen
kokoluokkaa (ks. mallikatsaus alla).

Ehdotetut aiheet ja miksi juuri ne:

1. **Historia** — vakioaihe joka maalla; USA:n 1770–1870-luku on
   poikkeuksellisen rikas 1873-matkustajalle: itsenäisyys on juuri
   täyttämässä sata vuotta, sisällissota on juuri päättynyt ja
   rautatie yhdistänyt mantereen neljä vuotta aiemmin.
2. **Luonto ja kansallispuistot** — USA:n VAHVIN 1873-kulma: Yellowstone
   perustettiin maailman ensimmäiseksi kansallispuistoksi vuotta ennen
   isoisän matkaa (1872), ja Grand Canyon oli vasta juuri kartoitettu
   (Powell 1869). Peli kattaa jo pelilaudalla Yellowstonen ja Grand
   Canyonin omina kohteinaan, joten aihe palvelee useaa kaupunkia.
3. **Musiikki** — Fisk Jubilee Singers -kuoro esiintyi kuningatar
   Viktorialle Lontoossa TÄSMÄLLEEN keväällä 1873; tarjoaa myös
   Stephen Fosterin, banjon ja Yankee Doodlen kautta laajemman
   kaaren orjuuden ajan lauluperinteestä vapaussotaan.
4. **Tiede ja keksinnöt** — 1800-luvun puoliväli oli Yhdysvaltain
   "keksijäkulta-aika" (lennätin, hissin turvajarru, leikkuupuimuri,
   ompelukone) — kaikki ehdotetut nostot ovat selvästi ENNEN 1873:a,
   toisin kuin esimerkiksi Edisonin tai Bellin keksinnöt (1876+),
   jotka rajattiin siksi pois.
5. **Ruoka** — Kiitospäivä, barbecue, gumbo ja Johnny Appleseed
   näyttävät USA:n ruokakulttuurin syntyneen risteytymänä (alkuperäis-
   kansat, Eurooppa, Länsi-Afrikka) eivätkä yksittäisenä keittiönä —
   sama "aineeton kulttuuriperintö" -logiikka kuin
   `docs/moduulit/maalehti.md`:n Unesco-vinkissä.

**Pois jätetyt/vaihtoehtoiset aiheet ja miksi:** Rakennukset/arkkitehtuuri
ja Urheilu olisivat myös mahdollisia (ks. topiikkilista muissa maissa,
osio 1b), mutta niiden 1873-aineisto on ohuempi kuin yllä olevien
viiden. Tiede- ja Musiikki-aiheiden sisältä jätettiin pois kaikki
minstrel-showhin liittyvä kuvasto (ks. osio 11) sekä nykyaikaisemmat
keksijät (Edison, Bell) — nämä sopivat paremmin myöhempään kaupunki-
kohtaiseen sisältöön (esim. jos Menlo Park tai Boston saisivat oman
lehden).

### 1b. Mallikatsaus (miten muut isot maat on mitoitettu)

`js/packs/maa-kategoriat.js`: ITA = 5 aihetta (historia, ruoka, musiikki,
kuvataide, luonto) + menovinkit, jokaisella aiheella `tehtava`; IND = 5
aihetta (historia, rakennukset, ruoka, kuvataide, luonto). Nostojen
kenttärakenne: `otsikko`, (valinnainen `aika`), `tiedosto`, `teksti`
(440–660 mrk), `selite` (yksi virke), `lahde` ('Tekijä, Wikimedia
Commons (LISENSSI)'), `wiki` (fi-Wikipedia-hakusana). Tätä rakennetta
noudatetaan alla jokaisessa nostoehdotuksessa.

---

## 2. FAKTAPOHJA: Historia

**Johdanto-ehdotus (n. 220–260 mrk):**

> Vuonna 1873 nuori tasavalta ei ole vielä täyttänyt sataa vuotta.
> Sisällissota päättyi kahdeksan vuotta sitten, orjuus on juuri
> lakkautettu, ja mantereen halki kulkee rautatie, joka on ollut
> käytössä vasta muutaman vuoden.

### H1 — "Teetä satamaan" (Bostonin teekutsut, 1773)

> Joulukuun 16. päivänä 1773 joukko bostonilaisia kiipesi kolmeen
> brittiläiseen kauppa-alukseen intiaanien asuihin naamioituneina ja
> heitti mereen 342 laatikollista teetä protestiksi Britannian
> tearalle. "Vapaudenpojat"-ryhmän isku ei koskenut korkeaa hintaa —
> uusi Tea Act päinvastoin halpuutti teetä — vaan periaatetta: ei
> verotusta ilman edustusta. Lontoo vastasi rangaistustoimin, ja
> puolentoista vuoden päästä laukaukset Lexingtonissa ja Concordissa
> avasivat vapaussodan. Vuonna 1873 tapahtumasta on kulunut tasan
> sata vuotta.

Faktat ja lähteet:
- Bostonin teekutsut 16.12.1773; Vapaudenpojat naamioituneina heittivät
  340–342 teelaatikkoa Boston Harboriin protestina Tea Actia vastaan.
  — en-Wikipedia "Boston Tea Party"
- Tea Act (hyväksytty 10.5.1773) laski tosiasiassa laillisesti tuodun
  teen hintaa; ydinkysymys oli "ei verotusta ilman edustusta", ei
  hinta. — en-Wikipedia "Boston Tea Party"
- Lexingtonin ja Concordin taistelut 19.4.1775 aloittivat
  vapaussodan, alle kaksi vuotta teekutsujen jälkeen.
  — en-Wikipedia "Boston Tea Party"

### H2 — "Kansakunta joka ei ole vielä satavuotias" (itsenäisyysjulistus, 1776)

> Heinäkuussa 1776 viisikunta — muun muassa Thomas Jefferson, John
> Adams ja Benjamin Franklin — hioi asiakirjaa, joka selitti
> maailmalle, miksi kolmetoista siirtokuntaa katkaisi siteensä
> Britanniaan. Mannerkongressi hyväksyi tekstin yksimielisesti 4.
> heinäkuuta, ja allekirjoittajat tiesivät tekevänsä maanpetoksen,
> josta rangaistuksena oli kuolema. Jefferson kirjoitti luonnoksen
> kahdessa ja puolessa viikossa kesäkuussa. Vuonna 1873 tasavalta ei
> ole vielä täyttänyt sataa vuotta — juhlavuosi ja Philadelphian
> suuri satavuotisnäyttely ovat vasta kolmen vuoden päässä.

Faktat ja lähteet:
- Committee of Five (Adams, Franklin, Jefferson, Livingston, Sherman)
  nimitettiin 11.6.1776; Jefferson kirjoitti luonnoksen 11.–28.6.1776.
  — en-Wikipedia "United States Declaration of Independence"
- Mannerkongressi hyväksyi julistuksen yksimielisesti 4.7.1776;
  allekirjoittajat tekivät muodollisesti maanpetoksen, josta
  rangaistuksena oli kidutus ja kuolema. — en-Wikipedia "United States
  Declaration of Independence"
- (Taustatieto, ei tässä nostossa lähdettä vaativa yksityiskohta:
  Philadelphian Centennial-näyttely pidettiin 1876 — kolme vuotta
  Fogg'in matkan jälkeen.)

### H3 — "Halkeillut kello joka ei enää soi" (Vapauskello, 1752–1865)

> Philadelphian kaupungintalon kello halkesi jo ensimmäisellä
> soitolla saavuttuaan Englannista 1752, ja lopullisesti se
> vaikeni helmikuussa 1846 — sen jälkeen kelloa ei ole enää soitettu.
> 1830-luvulla orjuuden vastustajat ristivät kellon "Vapauskelloksi"
> ja lainasivat sen kylkeen valettua raamatunlausetta omaan
> asiaansa. Huhtikuussa 1865, sisällissodan juuri päätyttyä,
> presidentti Lincolnin ruumisarkku asetettiin kellon viereen
> Philadelphian kaupungintalossa, kun 120 000–140 000 surijaa
> kulki ohi. Halkeillut, ikuisesti vaiennut kello puhui silti —
> juuri vaikenemisellaan.

Faktat ja lähteet:
- Kello tilattiin 1752, halkesi ensi soitolla Philadelphiassa; valettiin
  uudelleen kahdesti (Pass & Stow). Vahingoittui pysyvästi jonain
  ajankohtana 1817–1846, todennäköisesti 1841–1846; helmikuussa 1846
  Public Ledger raportoi kellon soineen viimeisen kerran ja tulleen
  "korjaamattomasti haljenneeksi ja ikuisesti mykäksi".
  — en-Wikipedia "Liberty Bell"
- Orjuuden vastustajat antoivat kellolle nimen "Liberty Bell" 1830-luvulla
  (ensimmäinen maininta "Anti-Slavery Record" -lehdessä). — en-Wikipedia
  "Liberty Bell"
- Huhtikuussa 1865 Lincolnin ruumis tuotiin kaupungintalon kokoushuoneeseen
  kellon viereen julkista näyttelyä varten; 120 000–140 000 ihmistä kulki
  ohi. — en-Wikipedia "Liberty Bell"

### H4 — "Kultainen naula" (mannertenvälinen rautatie, 1869)

> 10. toukokuuta 1869 kaksi rautatietä kohtasi Utahin autiomaassa:
> idästä tullut Union Pacific ja lännestä noussut Central Pacific
> löivät kultaisen "viimeisen naulan" Promontory Summitissa, ja
> Amerikan rannikot yhdistyivät ensi kertaa raiteilla. Läntisen
> puoliskon 1 100 mailia (n. 1 770 km) louhivat suurelta osin
> kiinalaiset siirtotyöläiset, jotka murskasivat Sierra Nevadan
> kallioita nitroglyseriinillä ja lauttasivat yli kymmenen mailia
> raidetta yhdessä ainoassa päivässä huhtikuussa 1869 — ennätys,
> jota kukaan ei ole sittemmin rikkonut samalla menetelmällä. Matka
> rannikolta rannikolle, joka oli vienyt kuukausia, kesti nyt
> viikon.

Faktat ja lähteet:
- Kultainen naula lyötiin Promontory Summitissa 10.5.1869; Central
  Pacific rakensi 690 mailia lännestä, Union Pacific 1085 mailia
  idästä. — en-Wikipedia "First transcontinental railroad"
- Central Pacificin osuuden louhi suurelta osin kiinalainen
  siirtotyövoima (v. 1865 n. 3000 kiinalaista ja 1700 valkoista
  työntekijää); he rakensivat mm. 15 tunnelia Sierra Nevadaan
  ja käyttivät nitroglyseriiniä. — en-Wikipedia "First
  transcontinental railroad"
- Central Pacificin ratatyöryhmä laski ennätyksen 10 mailia 56 jalkaa
  rataa yhdessä päivässä 28.4.1869. — en-Wikipedia "First
  transcontinental railroad"

**Minitehtäväehdokas (Historia):**
> Minä vuonna Yhdysvaltain itä- ja länsirannikko yhdistyivät
> ensimmäistä kertaa rautateitse?
> Vaihtoehdot: 1861 / **1869** / 1876 / 1886
> Fakta: Kultainen naula lyötiin Promontory Summitissa 10.5.1869.

*Vastaus löytyy nostosta H4. Ei osu newyork/sanfrancisco-kysymyksiin
(ks. osio 8).*

---

## 3. FAKTAPOHJA: Luonto ja kansallispuistot

**Johdanto-ehdotus:**

> Vuosi ennen isoisän matkaa Yhdysvallat teki jotain, mitä mikään maa
> ei ollut aiemmin tehnyt: se rauhoitti valtavan erämaa-alueen pelkän
> luonnon ja huvin vuoksi. Idea oli niin uusi, ettei sille edes ollut
> vielä sanaa.

### L1 — "Maailman ensimmäinen kansallispuisto" (Yellowstone, 1872)

> 1. maaliskuuta 1872 presidentti Ulysses S. Grant allekirjoitti lain,
> joka teki Yellowstonesta maailman ensimmäisen kansallispuiston —
> vain vuosi ennen isoisän matkapäiväkirjan alkua. Alue oli niin
> kaukana ja niin uskomattoman kuuloinen — kiehuvia lähteitä,
> geysirejä, kanjoneita — että kongressi uskoi Ferdinand Haydenin
> retkikunnan raportin vasta nähtyään taidemaalari Thomas Moranin ja
> valokuvaaja William Henry Jacksonin todisteet. Ensimmäinen
> puistonjohtaja ei saanut kongressilta palkkaa eikä henkilökuntaa, ja
> salametsästys jatkui vuosia — puiston suojelu oli aluksi enemmän
> aate kuin todellisuutta.

Faktat ja lähteet:
- Presidentti Ulysses S. Grant allekirjoitti Yellowstone National Park
  Protection Actin 1.3.1872; laajalti pidetty maailman ensimmäisenä
  kansallispuistona. — en-Wikipedia "Yellowstone National Park"
- Ferdinand Haydenin 1871 geologinen retkikunta sisälsi Thomas Moranin
  maalauksia ja William Henry Jacksonin valokuvia, jotka auttoivat
  vakuuttamaan kongressin. — en-Wikipedia "Yellowstone National Park"
- Ensimmäinen puistonjohtaja Nathaniel Langford (nim. 1872) ei saanut
  kongressilta palkkaa, rahoitusta eikä henkilökuntaa; salametsästys
  jatkui 1870-luvulla. — en-Wikipedia "Yellowstone National Park"

### L2 — "Uskollinen vanhus" (Old Faithful, nimetty 1870)

> 18. syyskuuta 1870 Washburn–Langford–Doane-retkikunta saapui
> Yellowstonen ylägeysiribaltiolle ja näki geysirin, joka purkautui
> yhdeksän kertaa heidän vierailunsa aikana säännöllisin väliajoin.
> He nimesivät sen Old Faithfuliksi — se oli puiston ensimmäinen
> nimetty geysiri. Se purkautuu yhä keskimäärin 60–90 minuutin
> välein, ja vesipatsas nousee 32–56 metriin muutamaksi minuutiksi
> kerrallaan. Toisin kuin useimmat geysirit, se ei ole yhteydessä
> muihin lähteisiin, minkä ansiosta sen rytmi on pysynyt
> poikkeuksellisen ennustettavana jo yli 150 vuotta.

Faktat ja lähteet:
- Old Faithful nimettiin 18.9.1870 Washburn–Langford–Doane-retkikunnan
  toimesta; se oli puiston ensimmäinen nimetty geysiri.
  — en-Wikipedia "Old Faithful"
- Purkausväli keskimäärin 65–91 minuuttia (bimodaalinen jakauma,
  1900-luvun mittauksissa keskimäärin 66,5 min, 2000-luvulta alkaen
  keskimäärin n. 90 min); purkauskorkeus 106–185 jalkaa (32–56 m).
  — en-Wikipedia "Old Faithful"
- Geysiri ei ole yhteydessä muihin lähteisiin, mikä selittää sen
  ennustettavuuden. — en-Wikipedia "Old Faithful"

### L3 — "Yksikätinen veteraani soutaa tuntemattomaan" (Grand Canyon, Powellin retki 1869)

> Toukokuussa 1869 sisällissodan veteraani John Wesley Powell — joka
> oli menettänyt oikean käsivartensa Shilohin taistelussa — lähti
> yhdeksän miehen kanssa neljällä soutuveneellä alas Coloradojokea:
> ensimmäinen tunnettu retkikunta, joka kulki koko Grand Canyonin
> läpi. Matka kesti kolme kuukautta: yksi vene ja kolmasosa muonasta
> hukkui koskissa, ja miehet joutuivat lopulta nälkäkuurille. Kanjoni,
> jonka he kartoittivat, on 277 mailia (446 km) pitkä, jopa 18 mailia
> (29 km) leveä ja paikoin yli kilometrin syvä — Coloradojoki on
> kaivertanut sitä esiin miljoonia vuosia.

Faktat ja lähteet:
- John Wesley Powell menetti suurimman osan oikeasta käsivarrestaan
  Shilohin taistelussa (Yhdysvaltain sisällissota); palasi silti
  palvelukseen. — en-Wikipedia "John Wesley Powell"
- Powellin retkikunta lähti Green River, Wyomingista 24.5.1869
  neljällä veneellä ja yhdeksällä miehellä; ensimmäinen tunnettu
  kauttakulku koko Grand Canyonin läpi. Yksi vene ja kolmasosa
  muonasta menetettiin 7.6.1869. — en-Wikipedia "Grand Canyon";
  en-Wikipedia "John Wesley Powell"
- Grand Canyon on 277 mailia pitkä, jopa 18 mailia leveä, yli
  6093 jalkaa (yli maili) syvä. — en-Wikipedia "Grand Canyon"

### L4 — "Presidentti allekirjoitti sodan keskellä" (Yosemite Grant, 1864)

> Presidentti Abraham Lincoln allekirjoitti keskellä sisällissotaa,
> 30. kesäkuuta 1864, lain, joka luovutti Yosemiten laakson ja
> jättiläismäisten mammuttipuiden Mariposa-lehdon Kalifornian
> osavaltion suojeltavaksi — ensimmäisen kerran, kun Yhdysvaltain
> liittovaltio varasi maata nimenomaan luonnon ja huvin vuoksi.
> Ratkaisu loi mallin, jota seurattiin kahdeksan vuotta myöhemmin
> Yellowstonessa. Mariposa-lehdon jättiläissekvoiat löysi 1857 Galen
> Clark — yksi puista, Wawona-puu, oli yli 200-jalkainen ja
> arviolta 2 100 vuotta vanha.

Faktat ja lähteet:
- Lincoln allekirjoitti Yosemite Grantin 30.6.1864, keskellä
  sisällissotaa; ensimmäinen kerta, kun liittovaltio varasi maata
  suojeluun ja julkiseen käyttöön — malli, jota seurattiin Yellowstonen
  perustamisessa 1872. — en-Wikipedia "Yosemite National Park"
- Galen Clark löysi Mariposa Groven jättiläissekvoiat 1857.
  — en-Wikipedia "Yosemite National Park"
- Wawona-puu (Mariposa Grovessa) oli 234 jalkaa (71 m) korkea, 90
  jalkaa (27 m) ympärysmitaltaan, arviolta 2 100 vuotta vanha (kaatui
  1969). — en-Wikipedia "Yosemite National Park"

**Minitehtäväehdokas (Luonto):**
> Minä vuonna Yellowstonesta tuli maailman ensimmäinen kansallispuisto?
> Vaihtoehdot: 1850 / 1864 / **1872** / 1901
> Fakta: presidentti Grant allekirjoitti lain 1. maaliskuuta 1872.

*Vastaus löytyy nostosta L1. Ei osu newyork/sanfrancisco-kysymyksiin.*

---

## 4. FAKTAPOHJA: Musiikki

**Johdanto-ehdotus:**

> Keväällä 1873, samaan aikaan kun isoisän matkapäiväkirja alkaa,
> yksitoista nuorta laulajaa entisten orjien yliopistosta esiintyi
> Euroopan hoveissa. Amerikkalainen musiikki oli tuolloin risteystä:
> vapaussodan pilkkalaulu, orjuuden ajan hengelliset laulut ja
> Länsi-Afrikasta periytyvä soitin löysivät kaikki tiensä samaan
> kansalliseen sävelmistöön.

### M1 — "Laulua kuningattarelle" (Fisk Jubilee Singers, 1873)

> Huhtikuussa 1873 — samana keväänä kun isoisän matkapäiväkirja alkaa
> — yksitoista nuorta laulajaa Nashvillen Fisk-yliopistosta esiintyi
> Lontoossa kuningatar Viktorialle. He lauloivat orjuuden ajan
> hengellisiä lauluja, "Steal Away to Jesusia" ja "Go Down, Mosesia",
> jollaisia harva valkoinen eurooppalainen oli koskaan kuullut. Ryhmä
> oli lähtenyt Nashvillesta 1871 kerätäkseen rahaa köyhälle
> yliopistolleen, jonka oppilaat olivat vasta vapautettujen orjien
> lapsia. Kiertueet Yhdysvalloissa ja Euroopassa keräsivät lopulta niin
> paljon varoja, että niillä rakennettiin yliopistolle sen ensimmäinen
> kivirakennus.

Faktat ja lähteet:
- Fisk Jubilee Singers -kuoro perustettiin 1871 varainkeruuseen Fisk
  Universitylle (perustettu vapautettujen orjien opetukseen);
  ensimmäinen kiertue alkoi 6.10.1871. — en-Wikipedia "Fisk Jubilee
  Singers"
- Iso-Britannian ja Euroopan kiertueella huhtikuussa 1873 (11 jäsenen
  ryhmä) laulettiin "Steal Away to Jesus" ja "Go Down, Moses"
  kuningatar Viktorialle. — en-Wikipedia "Fisk Jubilee Singers"
- Kiertuetulot rahoittivat Fiskin ensimmäisen pysyvän rakennuksen,
  Jubilee Hallin (nimetty kansalliseksi historialliseksi maamerkiksi
  1975). — en-Wikipedia "Fisk Jubilee Singers"

### M2 — "Amerikkalaisen laulun isä" (Stephen Foster)

> Stephen Foster kirjoitti yli 200 laulua — "Oh! Susanna", "Camptown
> Races", "Old Folks at Home" — joita amerikkalaiset yhä laulavat,
> vaikka säveltäjä itse kuoli köyhänä ja lähes unohdettuna New
> Yorkissa tammikuussa 1864, kuukausia ennen sisällissodan päättymistä.
> Hänen kuolinhetkellään taskustaan löytyi lappu, jossa luki vain
> "Dear friends and gentle hearts", ja 38 senttiä. Foster ei koskaan
> asunut etelävaltioissa eikä juuri käynyt siellä, mutta hänen
> laulunsa loivat kuvan Amerikan maaseudusta, jota koko maailma
> lauloi vielä vuosikymmeniä hänen jälkeensä.

Faktat ja lähteet:
- Stephen Foster (1826–1864), "amerikkalaisen musiikin isä", kirjoitti
  yli 200 laulua, mm. "Oh! Susanna", "Camptown Races", "Old Folks at
  Home" ("Swanee River"), "My Old Kentucky Home". — en-Wikipedia
  "Stephen Foster"
- Foster kuoli Bellevue-sairaalassa 13.1.1864, 37-vuotiaana; taskusta
  löytyi lappu "Dear friends and gentle hearts" ja 38 senttiä
  (sisällissodan aikaista seteliä ja kolikoita). — en-Wikipedia
  "Stephen Foster"
- Foster kasvoi Pittsburghissa eikä juuri asunut etelässä (vieraili
  siellä vain kerran, häämatkallaan 1852), vaikka monet lauluista
  kuvasivat eteläisiä aiheita. — en-Wikipedia "Stephen Foster"

### M3 — "Kurpitsasta syntynyt soitin" (banjo)

> Banjo syntyi Länsi-Afrikasta orjalaivoilla tuodun muistin varaan:
> kurpitsakuoresta ja eläinnahasta tehty soitin, jollaisia orjuutetut
> afrikkalaiset rakensivat Karibialla ja Pohjois-Amerikassa jo
> 1600-luvulta lähtien — varhaisin kirjallinen maininta on vuodelta
> 1678. 1800-luvulla soitin levisi valkoisen yleisön keskuuteen
> minstrel-showjen mukana ja sai vähitellen puisen kaulan ja
> viritystapit. Nykyisin banjo tunnetaan ennen kaikkea
> appalakialaisesta kansanmusiikista ja countrysta, mutta sen juuret
> ovat kiistatta afrikkalaiset — instrumentin nimikin juontanee
> Länsi-Afrikan kielten sanoista, kuten kimbundun "mbanza".

Faktat ja lähteet:
- Varhaiset banjot rakensi Pohjois-Amerikassa ja Karibialla 1600-luvulta
  lähtien orjuutettu väestö, halkaistusta kurpitsasta ja eläinnahasta,
  Länsi- ja Keski-Afrikan soitinten (mm. kora) mallin mukaan; varhaisin
  kirjallinen maininta 1678 (Martinique). — en-Wikipedia "Banjo"
- 1800-luvulla soitin levisi valkoisen yleisön tietoisuuteen
  blackface-minstrel-showjen kiertueiden mukana; myöhemmin myös
  sarjatuotantona ja postimyyntinä. — en-Wikipedia "Banjo"
- Sanan "banjo" yksi selitys juontuu kimbunduksen sanasta "mbanza",
  toinen mandinkan kielen sanasta liittyen instrumenttiin akonting.
  — en-Wikipedia "Banjo"

### M4 — "Pilkkalaulusta ylpeyden ääneksi" (Yankee Doodle)

> Brittiupseerit sepittivät "Yankee Doodlen" 1750-luvulla pilkatakseen
> siirtomaasotilaita, jotka heidän mielestään luulivat höyhenen
> hatussa tekevän heistä hienoja herroja niin kuin Lontoon muodikkaat
> nuoret miehet. Amerikkalaiset kääntivät pilkan itselleen: he
> lisäsivät sävelmään omia säkeitään ja marssivat sen tahtiin koko
> vapaussodan läpi — laulu soi jopa brittien antautuessa Saratogassa
> 1777. Vuoteen 1873 mennessä siitä oli tullut yksi maan
> epävirallisista kansallislauluista, vaikka virallinen "The
> Star-Spangled Banner" -status tulisi vasta 1931.

Faktat ja lähteet:
- "Yankee Doodle" kirjoitettiin brittisotilaan toimesta n. 1755–1758
  Ranska–intiaanisodan aikaan pilkkalauluksi siirtomaajoukkoja
  vastaan; "Yankee doodle dandy" viittasi brittiläiseen macaroni-
  muoti-ilmiöön. — en-Wikipedia "Yankee Doodle"
- Amerikkalaiset omaksuivat laulun ja lisäsivät omia säkeitään;
  vuoteen 1781 mennessä siitä oli tullut kansallisylpeyden laulu.
  Laulua soitettiin brittien antautuessa Saratogassa 1777.
  — en-Wikipedia "Yankee Doodle"
- Toimi yhtenä de facto -kansallislauluista ennen "The Star-Spangled
  Bannerin" virallistamista 3.3.1931. — en-Wikipedia "Yankee Doodle"

**Minitehtäväehdokas (Musiikki):**
> Kenelle Fisk-yliopiston laulajat esiintyivät Lontoossa keväällä 1873?
> Vaihtoehdot: **Kuningatar Viktorialle** / presidentti Grantille /
> paavi Piukselle / kuningas Vilhelmille
> Fakta: kuoro lauloi Viktorialle huhtikuussa 1873.

*Vastaus löytyy nostosta M1. Ei osu newyork/sanfrancisco-kysymyksiin
(NY:n kysymykset koskevat Vapaudenpatsasta, Uutta Amsterdamia ja
kieliä; SF:n Golden Gate -siltaa, kultaryntäystä ja sumua).*

---

## 5. FAKTAPOHJA: Tiede ja keksinnöt

**Johdanto-ehdotus:**

> Vuosisadan puoliväli oli Yhdysvalloissa keksijöiden aikaa: lennätin
> kutisti mantereen etäisyydet minuutteihin, hissin turvajarru teki
> korkeista rakennuksista mahdollisia, leikkuukone vapautti käsiä
> pelloilta ja ompelukone kodeista. Nämä neljä keksintöä olivat kaikki
> arkipäivää jo ennen vuotta 1873.

### T1 — "Mitä Jumala on tehnyt" (sähkölennätin, 1844)

> 24. toukokuuta 1844 Samuel Morse lähetti Washingtonin
> korkeimman oikeuden istuntosalista Baltimoreen sähkölennättimellä
> sanat "Mitä Jumala on tehnyt" — ensimmäisen virallisen viestin
> uudella keksinnöllä. Kongressi oli rahoittanut koelinjan vain
> nihkeästi, ja Morse oli ennen läpimurtoaan yrittänyt tuloksetta
> vuosikausia sekä Yhdysvalloissa että Euroopassa. Kuutta vuotta
> myöhemmin lennätinlankaa oli jo yli 19 000 kilometriä, ja
> vuoteen 1861 mennessä linja ulottui rannikolta rannikolle — sanoma
> kulki nyt nopeammin kuin ratsumies pystyi koskaan kiitämään.

Faktat ja lähteet:
- Kokeellinen 38 mailin (61 km) lennätinlinja Washington–Baltimore
  rahoitettiin kongressin 30 000 dollarin määrärahalla 1843.
  — en-Wikipedia "Samuel Morse"
- 24.5.1844 Morse lähetti sanat "What hath God wrought" (Numbers 23:23)
  Washingtonin Capitolin kellarista Baltimoreen; viestin valitsi Annie
  Ellsworth. — en-Wikipedia "Samuel Morse"
- Vuoteen 1850 mennessä lennätinlankaa oli 12 000 mailia (n. 19 300 km)
  Yhdysvalloissa. — en-Wikipedia "Samuel Morse"

### T2 — "Katkaiskaa köysi" (hissin turvajarru, 1852–1854)

> New Yorkin Crystal Palace -näyttelyssä 1854 Elisha Otis seisoi
> köydellä nostetun tason päällä korkealla yleisön yläpuolella ja
> käski avustajaansa katkaisemaan köyden kirveellä. Taso putosi
> muutaman sentin ja pysähtyi — Otisin keksimä turvajarru oli
> tarttunut. Ennen tätä hissit olivat vaarallisia: köyden katketessa
> kori putosi pohjaan asti. Otisin turvalaite teki korkeista
> rakennuksista ensi kertaa turvallisia, ja ensimmäinen matkustajahissi
> asennettiin New Yorkin tavarataloon 1857 — pilvenpiirtäjien aikakausi
> tuli mahdolliseksi vasta tämän jälkeen.

Faktat ja lähteet:
- Elisha Otis keksi hissin turvajarrun 1852 Yonkersissa, New Yorkissa,
  estämään hissiä putoamasta nostoköyden katketessa; perusti Otis
  Elevator Companyn 1853. — en-Wikipedia "Elisha Otis"
- Otis esitteli julkisesti turvahissinsä New Yorkin Crystal Palace
  -näyttelyssä 1854. — en-Wikipedia "Elisha Otis"
- Ensimmäinen matkustajakäyttöön asennettu turvahissi asennettiin
  E. V. Haughwout & Co. -tavarataloon New Yorkissa 23.3.1857.
  — en-Wikipedia "Elisha Otis"

### T3 — "Kone joka niitti kuin sata kättä" (leikkuupuimuri, 1831)

> Vuonna 1831 Cyrus McCormick, silloin 22-vuotias, esitteli
> Virginiassa hevosvetoisen leikkuukoneen, joka niitti viljaa
> moninkertaisesti käsityötä nopeammin. Työn oli aloittanut jo hänen
> isänsä kahdenkymmenenkahdeksan vuoden ajan, ja perheen orjuuttama
> seppä Jo Anderson auttoi ratkaisevasti koneen viimeistelyssä.
> McCormick muutti 1847 Chicagoon, jonne rautatiet ja Suurten
> järvien laivaliikenne toivat raaka-aineet ja veivät valmiit koneet
> lännen viljapelloille — juuri se yhdistelmä, joka teki keskilännestä
> maailman viljakammion.

Faktat ja lähteet:
- Cyrus McCormick esitteli mekaanisen leikkuukoneensa ensi kertaa
  Steeles Tavernissa, Virginiassa, 1831 (patentti 1834); rakensi isänsä
  Robert McCormickin 28 vuoden kehitystyön päälle, avustajanaan
  perheen orjuuttama Jo Anderson. — en-Wikipedia "Cyrus McCormick"
- McCormick muutti veljensä kanssa Chicagoon 1847 perustaakseen
  tehtaan; Chicago valittiin parhaan vesikuljetuksen (Suuret järvet)
  ja myöhemmin rautateiden ansiosta. — en-Wikipedia "Cyrus McCormick"
- Koneen myynti kasvoi hitaasti: 7 kpl 1842, 29 kpl 1843, 50 kpl 1844
  — kaikki rakennettu käsityönä perheen tilalla ennen
  tehdasmittakaavaa. — en-Wikipedia "Cyrus McCormick"

### T4 — "Oikeussalista syntynyt yhtiö" (ompelukone, 1846–1856)

> Elias Howe patentoi lukkotikkiin perustuvan ompelukoneensa 1846,
> mutta rikastui vasta vuosia myöhemmin, kun hän haastoi kilpailijansa
> Isaac Singerin oikeuteen patentin loukkaamisesta — ja voitti.
> Singer oli parantanut konetta merkittävästi ja markkinoinut sitä
> taitavammin, muun muassa keksimällä osamaksukaupan, jolla tavallinen
> perhe saattoi ostaa koneen. Vuonna 1856 viisi suurinta valmistajaa
> lopettivat keskinäiset oikeusjuttunsa ja perustivat yhteisen
> patenttipoolin — yhden historian ensimmäisistä. Ompelukone siirsi
> vaatteiden valmistuksen kodeista tehtaisiin vuosikymmenessä.

Faktat ja lähteet:
- Elias Howe patentoi lukkotikki-ompelukoneensa 10.9.1846; voitti
  patenttioikeudenkäynnin Isaac Singeriä vastaan 1854 ja sai oikeuden
  rojalteihin. — en-Wikipedia "Sewing machine"
- Isaac Singer sai patentin omalle koneelleen 1851; Singer ja lakimies
  Edward Clark loivat ensimmäisen osamaksukauppajärjestelmän koneiden
  myyntiin. — en-Wikipedia "Sewing machine"
- 1856 perustettiin "Sewing Machine Combination" (Singer, Howe,
  Wheeler, Wilson, Grover & Baker), joka yhdisti patentit ja perii
  15 dollarin lisenssimaksun muilta valmistajilta — kesti vuoteen 1877
  asti. — en-Wikipedia "Sewing machine"

**Minitehtäväehdokas (Tiede):**
> Minä vuonna Elisha Otis esitteli turvahissinsä New Yorkin Crystal
> Palace -näyttelyssä pudottamalla itsensä köyden katketessa?
> Vaihtoehdot: 1844 / **1854** / 1869 / 1876
> Fakta: julkinen demonstraatio pidettiin Crystal Palacessa 1854.

*Vastaus löytyy nostosta T2. Ei osu newyork/sanfrancisco-kysymyksiin.*

---

## 6. FAKTAPOHJA: Ruoka

**Johdanto-ehdotus:**

> Amerikkalainen ruokapöytä on aina ollut risteys: alkuperäiskansojen
> kasvit, Euroopan siirtolaisten tavat ja Länsi-Afrikasta tuodut
> mausteet ja tekniikat sekoittuvat samaan pataan. Vuosisadan
> puolivälissä syntyivät monet niistä ruoista, joita Yhdysvallat yhä
> pitää "omanaan".

### R1 — "Presidentti julisti kiitoksen keskellä sotaa" (Kiitospäivä, 1863)

> Presidentti Abraham Lincoln julisti lokakuussa 1863 — keskellä
> sisällissotaa, tuoreena voitosta Gettysburgissa ja Vicksburgissa —
> marraskuun viimeisen torstain kansalliseksi kiitospäiväksi.
> Ajatuksen takana oli aikakauslehden toimittaja Sarah Josepha Hale,
> joka oli vuosikausia kirjoittanut presidenteille vaatien
> yhtenäistä kansallista juhlapäivää hajanaisten paikallisten
> perinteiden sijaan. Tarina kiitospäivän alkuperästä ulottuu
> vuoteen 1621 pilgrim-siirtolaisten satokauden juhlaan, mutta
> säännöllinen, koko maan yhteinen juhlapäivä on Lincolnin ja
> sisällissodan perua.

Faktat ja lähteet:
- Lincoln julisti 3.10.1863 (Seward'in kirjoittamana) marraskuun
  viimeisen torstain kansalliseksi kiitospäiväksi, innoittajanaan
  Sarah Josepha Halen kirjeenvaihto; taustalla tuoreet Unionin voitot
  Gettysburgissa ja Vicksburgissa. — en-Wikipedia "Thanksgiving
  (United States)"
- Ensimmäinen tunnettu New Englandin kiitosjuhla oli Plymouthin
  siirtokunnassa 1621 (satokauden juhla), mutta "ensimmäinen
  kiitospäivä" -tarina vakiintui vasta 1800-luvun puolivälissä.
  — en-Wikipedia "Thanksgiving (United States)"
- Lincolnin seuraajat jatkoivat perinnettä vuosittain aina 1939
  Rooseveltin muutokseen asti. — en-Wikipedia "Thanksgiving (United
  States)"

### R2 — "Sana joka tuli Karibialta" (barbecue)

> Sana "barbecue" tulee Karibian taíno-kielen sanasta "barabicu" —
> puisesta telineestä, jolla lihaa savustettiin tulen yllä.
> Espanjalaiset valloittajat kirjasivat sanan ylös 1500-luvulla
> nähtyään paikallisten kypsentävän ruokaa tällä tavalla, ja sana
> kulkeutui siitä englantiin "barbacoa"-muodon kautta. Yhdysvaltain
> eteläosissa savustus- ja hiillostustekniikat sekoittuivat
> afrikkalaisten, karibialaisten ja alkuperäiskansojen perinteistä
> omaksi, alueittain vaihtelevaksi ruokakulttuurikseen — jokaisella
> osavaltiolla on tänäkin päivänä oma väitteensä "aidosta"
> barbecuesta.

Faktat ja lähteet:
- Sana "barbecue" juontuu espanjan "barbacoa"-sanasta, joka puolestaan
  juontuu Karibian taíno/arawak-kielten sanasta "barabicu" (puinen
  runkorakenne lihan savustamiseen/säilyttämiseen tulen yllä).
  — en-Wikipedia "Barbecue"
- Espanjalainen Gonzalo Fernández de Oviedo y Valdés painatti sanan
  "barbecoa" ensi kertaa Espanjassa 1526. — en-Wikipedia "Barbecue"
- Tekniikka sekoitti Taíno-, Länsi-Afrikan (mm. orjuutettujen väestön)
  ja eurooppalaisia vaikutteita Etelä-Yhdysvalloissa; sanaan liitettiin
  1600–1700-luvuilla myös eurooppalaisten halveksuvia "villi"-
  mielikuvia. — en-Wikipedia "Barbecue"

### R3 — "Pata joka kokosi koko New Orleansin" (gumbo)

> Louisianan gumbo-muhennos syntyi 1700–1800-luvun New Orleansissa,
> kun ranskalaisten, espanjalaisten, länsiafrikkalaisten ja
> alkuperäiskansojen ruokaperinteet sulautuivat samaan pataan:
> ranskalaishenkinen tumma kastikepohja, länsiafrikkalainen
> okra-vihannes (jonka nimikin, "gombo", tulee bambaran kielestä)
> ja choctaw-intiaanien käyttämä filé-mauste saharaslehdistä.
> Ensimmäinen kirjallinen maininta gumbosta on vuodelta 1802.
> Ruokalaji tunnetaan yhä esimerkkinä siitä, miten Louisianan
> Mississippi-suistoon kohtasivat kaikki maailman kolkat — ja
> jokainen kokki keittää sitä hieman eri tavalla.

Faktat ja lähteet:
- Gumbo yhdistää Keski- ja Länsi-Afrikan, Ranskan, Saksan, Espanjan
  ja alkuperäiskansa choctawin ruokaperinteitä; kuvattiin kirjallisesti
  ensi kerran 1802, mainittiin useissa keittokirjoissa 1800-luvun
  jälkipuoliskolla. — en-Wikipedia "Gumbo"
- Sanan "gumbo" alkuperä liitetään bambaran kielen sanaan "gombo"
  (okra) tai bantukielten "ki ngombo/quingombo" -sanoihin; choctaw
  käytti filé-jauhetta (kuivattu sassafras) muhennoksen paksuntajana.
  — en-Wikipedia "Gumbo"
- Louisianan osavaltio nimesi gumbon viralliseksi osavaltioruoakseen
  (2004). — en-Wikipedia "Gumbo"

### R4 — "Mies joka istutti rajaseutua täyteen omenapuita" (Johnny Appleseed)

> John Chapman — tunnetumpi nimellä Johnny Appleseed — vaelsi
> vuosikymmeniä Pennsylvaniasta Ohioon ja Indianaan istuttaen
> omenapuiden taimitarhoja rajaseudun uudisasukkaille. Toisin kuin
> legenda kertoo, hän ei heitellyt siemeniä sattumanvaraisesti, vaan
> perusti aidattuja taimitarhoja, joita naapurit vartioivat ja joista
> puita myytiin osuuksilla. Hän kuoli 1845, mutta hänen tarinansa
> levisi laajalti vasta marraskuussa 1871 — vain kaksi vuotta ennen
> isoisän matkaa — kun Harper's-aikakauslehti julkaisi hänestä pitkän
> muistokirjoituksen ja teki hänestä yhdellä kertaa koko kansan
> tunteman rajaseudun sankarin.

Faktat ja lähteet:
- John Chapman (1774–1845), tunnettu Johnny Appleseedina, levitti
  omenapuita mm. Pennsylvaniaan, Ohioon, Indianaan ja Illinoisiin;
  toisin kuin suosittu mielikuva, hän perusti hoidettuja aidattuja
  taimitarhoja eikä heitellyt siemeniä satunnaisesti. — en-Wikipedia
  "Johnny Appleseed"
- Chapman kuoli 18.3.1845 (eri lähteissä esiintyy myös virheellisiä
  vuosia 1846/1847/1848). — en-Wikipedia "Johnny Appleseed"
- "Harper's New Monthly Magazine" julkaisi marraskuussa 1871
  laajalti luetun artikkelin "Johnny Appleseed: A Pioneer Hero", joka
  teki hänestä kansallisesti tunnetun hahmon. — en-Wikipedia "Johnny
  Appleseed"

**Minitehtäväehdokas (Ruoka):**
> Minä vuonna presidentti Lincoln julisti marraskuun viimeisen
> torstain kansalliseksi kiitospäiväksi?
> Vaihtoehdot: 1621 / 1848 / **1863** / 1901
> Fakta: julistus annettiin 3.10.1863, keskellä sisällissotaa.

*Vastaus löytyy nostosta R1. Ei osu newyork/sanfrancisco-kysymyksiin.*

---

## 7. Maan intro (~6 virkettä, `wiki`-avain "Yhdysvallat")

Ei olemassaolevaa `northamerica-artikkelit.js`-tiedostoa vielä (ks.
osio 11, avoin kysymys A) — teksti alla on ainesehdotus sille kohtaan,
kun tiedosto perustetaan `africa-artikkelit.js`/`europe-artikkelit.js`-
mallin mukaan.

> Yhdysvallat on nuori jättiläinen: vain vajaat sata vuotta
> itsenäisyysjulistuksestaan, mutta jo mannerta rannalta rannalle
> ulottuva liittotasavalta, jonka halki kulkee vasta äskettäin
> valmistunut rautatie. Siirtokunnista syntynyt kansakunta kävi juuri
> läpi raskaan sisällissodan orjuuden lakkauttamisesta, ja arvet
> näkyvät yhä pohjoisen ja etelän välillä. Länteen levittäytyy
> loputon preeria ja sen takana Kalliovuoret, joiden sydämeen on
> juuri perustettu maailman ensimmäinen kansallispuisto, Yellowstone.
> Idän suurkaupungit, New York etunenässä, pursuavat maahanmuuttajia
> Euroopasta, kun taas etelän New Orleans tuoksuu ranskalais-
> afrikkalaiselta keittiöltä ja länsirannikon San Francisco elää yhä
> kultaryntäyksen perintöä. Amerikkalainen musiikki, ruoka ja
> keksinnöt — ompelukoneesta hissiin — syntyvät juuri tässä
> murroksessa, kun vanha maailma ja uusi kohtaavat rautatien,
> sähkölennättimen ja höyrylaivan kyydissä. Isoisän matkapäiväkirja
> kulkee tähän nuoreen, ristiriitaiseen ja huikean laajaan maahan
> juuri sopivalla hetkellä.

(n. 900 merkkiä — pituusluokka vastaa Egyptin `intro`-kenttää
`africa-artikkelit.js`:ssä, kun kaupunkilehdellä ei ole omaa
`asia-artikkelit.js`-intron kaltaista ARTIKKELIT-merkintää käytössä.)

---

## 8. Kuvaehdokkaiden kategorialistaus (Commonsista, kuva+aihe aina USA:sta)

Kaikki kategoriat tarkistettu Commonsin API:sta (`prop=categoryinfo`)
22.8.2026 — luku kertoo tiedostomäärän kategoriassa nyt; itse kuvavalinta,
lisenssitarkistus ja silmätarkistus (900 px) tehdään vasta
lehtityövaiheessa `lehtityo-resepti.md`:n mukaan, ei tässä.

**Varmistettu olemassaolevaksi:**
- H1 Bostonin teekutsut → `Category:Boston Tea Party` (17 tiedostoa)
- H2 Itsenäisyysjulistus → `Category:United States Declaration of
  Independence` (200)
- H3 Vapauskello → `Category:Liberty Bell` (160)
- H4 Kultainen naula → `Category:Golden spike` (14) +
  `Category:Promontory, Utah` (5)
- L1 Yellowstone → `Category:Yellowstone National Park` (1153)
- L2 Old Faithful → `Category:Old Faithful Geyser` (löytyi hausta,
  tiedostomäärää ei erikseen tarkistettu — todennäköisesti riittävä)
- L3 Grand Canyon / Powell → `Category:Grand Canyon` (793) +
  `Category:John Wesley Powell` (95)
- L4 Yosemite / Mariposa Grove → `Category:Yosemite National Park`
  (195) + `Category:Mariposa Grove` (142)
- M1 Fisk Jubilee Singers → `Category:Fisk Jubilee Singers` (39)
- M2 Stephen Foster → `Category:Stephen Foster` (52)
- M3 Banjo → `Category:Banjos` (128)
- T1 Lennätin/Morse → `Category:Telegraphy in the United States` (53)
  (HUOM: `Category:Samuel Morse` on tyhjä säiliökategoria — käytä
  telegrafia-kategoriaa tai hae erikseen "Samuel Morse portrait")
- T3 McCormick-leikkuukone → `Category:Cyrus McCormick` (21)
- T4 Ompelukone → `Category:Sewing machines` (19)
- R1 Kiitospäivä → `Category:Thanksgiving` (228 — HUOM: rajaa
  1800-luvun/historiallisiin kuviin, valtaosa on nykyaikaisia)
- R3 Gumbo → `Category:Gumbo` (34)
- R4 Johnny Appleseed → `Category:Johnny Appleseed` (21)

**Ei vielä varmistettu — hakusanaehdotus lehtityövaiheeseen:**
- T2 Otis-hissi → `Category:Elisha Otis` on olemassa mutta ohut
  (4 tiedostoa); hae myös "Otis Elevator Company history" tai
  "Crystal Palace New York 1854"
- M4 Yankee Doodle → ei tarkistettu; hae "Yankee Doodle" ja/tai
  ikoninen maalaus "The Spirit of '76" (Archibald Willard)
  hakusanalla suoraan Commonsin kuvahausta
- R2 Barbecue → `Category:Barbecue` on tyhjä säiliökategoria; hae
  suoraan "barbecue" + "United States" tai "barbacoa" tiedostohausta
  (osui rajapinnan pyyntörajoitukseen tätä koostetta tehtäessä, ei
  ehditty tarkistaa loppuun)

**MAAKARTAT-nosto (relief-karttaan liitettävä yksittäiskuva, ks.
osio 9):** ehdotan Powell-retkikunnan venettä tai Yosemiten
Wawona-puuta — molemmat kategoriat jo yllä.

Yleishuomio: kaikki löydetyt kategoriat ovat aihepiiriltään
kiistattomasti USA:sta (ei naapurimaalta lainattua), kuten
Raamatun linjaus vaatii.

---

## 9. MAAKARTAT-rivin tarve — TEKNINEN AVOIN KYSYMYS

USA:lla EI ole vielä riviä `js/packs/maakartat.js`:n `MAAKARTAT`-
taulussa (tarkistettu `grep`illä 22.8.2026) — rivi tarvitaan
maalehden aloitussivulle (`docs/moduulit/maalehti.md`:n rakenteen
mukaan jokaisella lehtimaalla on korkokartta).

**Löydetty kandidaattitiedosto:** `Usa edcp (+HI +AK) relief location
map.png`, Wikimedia Commons, tekijä TUBS, CC BY-SA 3.0, 2000×1238 px.
Kattaa mantereisen USA:n keskeltä sivukuviin sijoitetuin Alaska- ja
Havaiji-kainaloin — juuri se kokoonpano, joka näyttäisi kaikki pelin
USA-kaupungit (Nome, Anchorage, Sitka Alaskassa; Havaiji omana
saarenaan).

**HUOM (tärkeä, samantyyppinen sudenkuoppa kuin Venäjällä):** tämä
tiedosto EI ole tasavälinen kartta vaan "EquiDistantConicProjection"
(keskileveyspiiri 37°N, keskipituuspiiri 96°W, standardileveyspiirit
32°N/42°N) sivukuvineen — sama ongelma, joka pakotti `MAAKARTAT.RUS`:n
käyttämään `projektio: 'laea'` -erikoishaaraa (ks. `maakartat.js`,
rivit 1490–1548, lohkokommentti "PELIN AINOA KARTTA, JOKA EI OLE
TASAVÄLINEN"). Suoran `rajat`-laatikon (`suoraPiste`-funktio)
käyttäminen tälle tiedostolle sijoittaisi kaupungit väärin, koska
projektio ei ole lineaarinen leveys-/pituusasteissa.

Kaksi vaihtoehtoa jatkolle (päätös kuuluu Opukselle/Fablelle, ei
tälle koosteelle):

1. **Uusi projektiohaara** `karttapiste()`-funktioon (kuten
   `laea`-haara), laskettuna tästä tiedoston EquiDistantConic-
   kaavasta (kaava talteen alla) — kattaa koko maan Alaska ja Havaiji
   mukaan lukien, mutta vaatii koodimuutoksen.
2. **RUS-mallin mukainen kompromissi:** käytä pelkkää mantereisen
   USA:n tasavälistä (equirectangular) korkokarttaa, jos sellainen
   löytyy Commonsista, ja jätä Alaska/Havaiji kaupungit pois tämän
   yhden kartan viidestä pisteestä — täsmälleen sama ratkaisu, jolla
   RUS jätti Siperian idän merkitsemättä. Ei vaadi koodimuutosta.

**Talteen otettu EquiDistantConic-kaava (jos vaihtoehto 1 valitaan),
tiedoston omalta kuvaussivulta:**
```
Central parallel: 37.0°N   Central meridian: 96.0°W
Standard parallels: 32.0°N ja 42.0°N
x = 50.0 + 124.03149777... * ((1.96944626... - (lat * pi/180))
      * sin(0.60105147... * (lon + 96) * pi/180))
y = 50.0 + 1.61559508... * 124.03149777... * 0.02613326...
      - 1.61559508... * 124.03149777... *
      (1.32367444... - (1.96944626... - (lat*pi/180))
      * cos(0.60105147... * (lon+96) * pi/180))
Havaiji-sivukuva: equirectangular, 22.4–18.7°N / 160.7–154.6°W
Alaska-sivukuva: equirectangular, 72.0–51.0°N / 172.0°E–129.0°W
```

**Ehdotetut 5 kaupunkia (jos/kun rivi tehdään), näyttämään mantereen
laajuuden — samalla logiikalla kuin RUS:n kuusi pistettä näyttävät
Venäjän valtavuuden:**

| Nimi | Lat | Lon | Huom |
|---|---|---|---|
| New York | 40,7128 | -74,0060 | `paa: true` — pelin ensimmäinen USA-kaupunki, historiallinen saapumissatama |
| Chicago | 41,8781 | -87,6298 | Keskilänsi, rautatiesolmu (ks. T3-nosto) |
| New Orleans | 29,9511 | -90,0715 | Etelä, Mississippi-suisto (ks. R3-nosto) |
| San Francisco | 37,7749 | -122,4194 | Länsirannikko, rautatien länsipääte (ks. H4-nosto) |
| Denver | 39,7392 | -104,9903 | Kalliovuoret, mantereen keskiosa |

(Koordinaatit omia hakuja, ei erikseen Wikipedia-viitattu — tarkista
ennen käyttöä samalla tavalla kuin Kioto-koosteessa suositeltiin.)

**Rajat (tasavälinen mannerkartta, JOS vaihtoehto 2 valitaan)** —
karkea arvio, EI VARMISTETTU: pohjoinen ~49,4°N, etelä ~24,5°N, länsi
~-124,8°, itä ~-66,9°. Tarkista Wikipedian
`Module:Location map/data/United States` -sivulta ennen lukkoon
lyömistä.

---

## 10. 1873-kulma koottuna

Poikkeuksellisen moni USA-fakta osuu tarkalleen tai lähes tarkalleen
vuoteen 1873 — harvinaisen vahva tuuri maalehdelle:

- **Täsmälleen 1873:** Fisk Jubilee Singers laulaa kuningatar
  Viktorialle huhtikuussa 1873 (M1).
- **Yksi vuosi ennen (1872):** Yellowstone perustetaan maailman
  ensimmäiseksi kansallispuistoksi (L1); Old Faithfulin nimeäminen on
  kolme vuotta aiemmin (1870, L2).
- **Neljä vuotta ennen (1869):** mannertenvälinen rautatie valmistuu
  (H4); Powellin Grand Canyon -retki (L3).
- **Yhdeksän vuotta ennen (1864):** Yosemite Grant, Lincolnin
  allekirjoitus kesken sisällissodan (L4).
- **Kymmenen vuotta ennen (1863):** Lincolnin kiitospäiväjulistus
  (R1).
- **Tasan sata vuotta ennen (1773):** Bostonin teekutsut — 1873 on
  satavuotismuisto (H1).
- **Kaksi vuotta ennen (1871):** Johnny Appleseedin Harper's-
  muistokirjoitus tekee hänestä kansallisesti tunnetun (R4).
- **Kolme vuotta jälkeen (1876):** Philadelphian satavuotisnäyttely —
  mainittu H2:n taustana tulevana tapahtumana, ei kuvattuna.

---

## 11. Avoimet kysymykset

**A. `northamerica-artikkelit.js` puuttuu kokonaan.** Maan intro
(osio 7) tarvitsee kotipaikan — joko uusi tiedosto perustetaan Opuksen
toimesta, tai intro sijoitetaan johonkin olemassaolevaan
tiedostoon. Tätä ei ratkaista tässä koosteessa.

**B. MAAKARTAT-projektio-ongelma (osio 9)** on suurin tekninen
päätös, joka pitää tehdä ennen kuin USA:n maakartta voidaan piirtää:
uusi conic-projektiohaara koodiin vai kompromissi ilman Alaskaa/
Havaijia. RUS-ennakkotapaus antaa mallin kummallekin.

**C. Aihevalinta (5/5) on ehdotus, ei lukittu.** Erityisesti
Ruoka-aihe kilpailee luontevasti myös "Arki ja tavat" -tyyppisen
aiheen kanssa (esim. villi länsi, karjapaimenet, preeriavaunut) —
tätä ei tutkittu tässä koosteessa, koska annetut viisi aihetta
tuntuivat riittävän vahvoilta faktapohjaltaan.

**D. Kaupunkien maalehti-päällekkäisyys ei ole vielä ongelma**,
koska yksikään pelin USA-kaupungeista (New York, San Francisco,
Los Angeles, Chicago, Denver, Houston, New Orleans, Miami, Santa Fe,
Grand Canyon, Yellowstone, Mount Rushmore, Appalakit, Havaiji) ei
vielä ole saanut omaa kaupunkilehteä — vain New Yorkilla ja San
Franciscolla on kulttuurivisakysymykset (`northamerica-questions.js`).
Kun ensimmäinen USA-kaupunki (todennäköisesti New York, koska
`start: true`) saa oman lehtensä, `tools/tarkista-aihetoisto.mjs`
kannattaa ajaa heti — erityisesti Yellowstone ja Grand Canyon ovat
pelilaudan omia kohteita (`js/packs/northamerica.js`), joten niiden
maalehti-nostot (L1–L4) saattavat päällekkäistyä tulevien
maasto-tekstien tai nähtävyysjuttujen kanssa siinä vaiheessa kun
niille kirjoitetaan omaa sisältöä.

**E. Sisältökuri: minstrel-show ja orjuus.** M3 (banjo) ja M2
(Foster) sivuavat minstrel-show-perinnettä ja orjuutta historiallisina
tosiasioina. Näissä on noudatettu samaa linjaa kuin Raamatun
"uskonto historiallis-kulttuurisena ilmiönä" -ohje: mainittu
faktana, ei kuvailtu yksityiskohtaisesti eikä ihannoitu. Suosittelen
Fablen tarkistavan sävyn ennen lopullista kirjoitusta, koska aihe on
herkempi kuin useimmat muut maalehtien aiheet tähän mennessä.

**F. Kuvahaku R2 (barbecue) ja M4 (Yankee Doodle) kesken** — Commonsin
API-rajapinnan pyyntörajoitus (`too many requests`) katkaisi haun
kesken tätä koostetta; molemmille on tyhjä tai puuttuva suora
kategoria, joten seuraava kirjoittaja tarvitsee vapaan tekstihaun.
