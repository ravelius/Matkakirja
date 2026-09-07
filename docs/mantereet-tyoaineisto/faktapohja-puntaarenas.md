# Punta Arenas — faktakoostaja, uusi kaupunkilehti

Lauta-id `southamerica`, kaupunki-id `puntaarenas`, maa CHL,
en-Wikipedia "Punta Arenas". Kaikki tiedot haettu en-Wikipedian
raakatekstistä (`index.php?action=raw`, `NODE_USE_ENV_PROXY=1`,
uusinnat kasvavalla viiveellä) **7.9.2026**. Malli ja mitat luettu
tiedostoista `tools/parvi/kaupunkilehti-ohje.md`,
`tools/parvi/kohdekartta-ohje.md`, `docs/moduulit/kaupunkilehti.md`,
`docs/aasia-tyoaineisto/lehtityo-resepti.md` ja
`docs/mantereet-tyoaineisto/spec-mantereet.md`. Mallilehdet: Lagos ja
Fes (v1670).

Luetut lähdeartikkelit (en-Wikipedia, 7.9.2026): **"Punta Arenas"**,
**"Strait of Magellan"**, **"Fuerte Bulnes"**, **"Puerto del Hambre"**,
**"Chilean schooner Ancud"**, **"Sociedad Explotadora de Tierra del
Fuego"**, **"Sara Braun"**, **"José Menéndez"**, **"Cemetery of Punta
Arenas"**, **"Sacred Heart Cathedral, Punta Arenas"**, **"Museo Nao
Victoria"**, **"Magdalena Island, Magallanes Region"**,
**"Magellanic penguin"**, **"Croatian Chileans"**, **"Luis Pardo"**,
**"Antarctic gateway cities"**, **"Selkʼnam people"**,
**"Magallanes Region"**.

## 0. Rajaus tälle lehdelle

**Chilen maalehti (`js/packs/maa-kategoriat.js`, CHL) on jo tehty, ja
sen aiheita EI toisteta.** Maalehti kertoo: mapuchejen raja ja
Biobío, itsenäisyysjulistus, saksalaissiirtolaiset ja poltetut metsät,
salpietarikaupunki Humberstone; Pääsiäissaari ja moait, Robinson
Crusoen saari, Chilotén puukirkot, **jaganit ja Thomas Bridgesin
sanakirja**; Atacama, Valdivian maanjäristys 1960, **eteläinen
jääkenttä**, alerce-puu; carménère, curanto, humita ja pastel de
choclo, merkén; cueca, Violeta Parra, sikut, guitarrón chileno.
Karttanostot (`js/packs/maastokohteet-chl.js`: Ojos del Salado,
Chiloé, Tyynimeri, Atacama, Chuquicamata, Humberstone, Chinchorron
muumiot, Sewell, Paranal, Isla Negra, Valdivia 1960),
`js/packs/skandaalit.js` (CHL: Colonia Dignidad, Santiagon taistelu
1962) ja `js/packs/elaintakyt.js` (CHL: guanako) on luettu — yksikään
ei ole tämän lehden aihe.

**HUOM. GUANAKO JA JAGANIT OVAT VARATTUJA.** Eläintäky kertoo jo
guanakon verestä ja laumakäytöksestä, ja maalehti jaganeista. Tämä
lehti mainitsee guanakon vain siinä yhdessä lauseessa, jossa se on
pakko mainita (lammasaitaukset veivät selkʼnamilta guanakon), eikä
kerro siitä lajina mitään uutta.

**Tämä lehti pysyy kaupungissa ja salmella:** nimi Sandy Point,
kuunari Ancud ja Fuerte Bulnes 1843, rangaistussiirtola ja
hiilenottopaikka 1873, lammastalouden nousu ja selkʼnamien kohtalo;
teemasivulla salmi, tuuli ja ilmasto, otsoniaukko ja Etelämantereen
portti.

**Olemassa olevat lohkot on luettu:**
- `js/packs/southamerica-saapumiset.js` (`puntaarenas`): valmis
  saapumisteksti 1873-kehyksineen (köydet kadulla, salmen tulli,
  patsaan varvas). **Ei kosketa.** Lehti ei toista sen aiheita:
  Magalhãesin patsas ja varpaan koskettaminen jäävät saapumiskortille.
- `js/packs/southamerica-valokuvat.js` (`puntaarenas`): valokuvataulu
  on valmis ja **sen vanha puoli kelpaa ennen–nyt-pariksi**
  (`General view of Punta Arenas.jpg`, 1912, PD; uusi puoli
  `Punta Arenas, Cerro de la Cruz 0798.jpg`, 2019, CC BY-SA 4.0).
  Molemmat ovat samalta suunnalta kaupungin yllä.
- `js/packs/southamerica-artikkelit.js`: **Punta Arenasilta puuttuu
  merkintä kokonaan** → kirjoitetaan `intro` ja `teksti` avaimella
  `'Punta Arenas'` (maailmankartan `wiki`-kenttä).
- `js/packs/kulttuuri-kategoriat.js`, `maakartat.js`,
  `nahtavyysjutut.js`: ei riviä `puntaarenas` — kaikki uutta.

**Kulttuurivisa:** `js/packs/southamerica-kulttuuri.js` ja
`southamerica-questions.js` luetaan ennen minitehtävän kirjoittamista;
minitehtävä ei saa kysyä yhtäkään visan aihetta.

---

## 1. Nimi ja perustiedot

- Punta Arenas on Chilen eteläisimmän alueen, **Magallanesin ja Chilen
  Antarktiksen**, pääkaupunki. Kaupunki nimettiin virallisesti
  **Magallanesiksi 1927** ja nimi **palautettiin Punta Arenasiksi
  1938**. (Punta Arenas, johdanto.)
- Se on suurin kaupunki 46. eteläisen leveyspiirin eteläpuolella ja
  **maailman eteläisin yli 100 000 asukkaan kaupunki**; myös Argentiinan
  Ushuaia vaatii eteläisimmän kaupungin titteliä — Ushuaia on
  etelämpänä mutta pienempi. (Punta Arenas, johdanto.)
- **Vuoden 2024 väestönlaskenta: 132 363 asukasta**, joista 94,8 %
  kaupunkilaisia. Korkeus 34 m, kunnan pinta-ala 17 846,3 km².
  (Punta Arenas, infobox ja Demographics.)
- Nimi **Punta Arenas** on käännös espanjan sanoista *Punta Arenosa*,
  joka puolestaan on käännös englannin nimestä **"Sandy Point"**.
  Nimi tulee **John Narboroughin matkalta 1669–1671**; hän kirjoitti:
  *"Sand-Point is a mean low Point, lies out more than the other Points
  of the shore, and a few trees grow on it."* John Byronille nimeäminen
  joskus virheellisesti liitetään. (Punta Arenas, Etymology.)
- Lempinimi **"punaisten kattojen kaupunki"** punaiseksi maalatuista
  peltikatoista; noin 1970 alkaen muitakin värejä on ollut saatavilla
  ja katot ovat kirjavoituneet. (Punta Arenas, Etymology.)
- **Vuodesta 1977 Punta Arenas on ollut yksi Chilen kahdesta
  vapaasatamasta** (toinen on Iquique). Artikkelin oma alaviite
  tarkentaa: kaupunki itse ei ole vapaasatama, vaan sen ulkopuolella on
  *zona franca*, jossa osa tuonnista saa alennetun verokohtelun.
  (Punta Arenas, johdanto + efn.)

## 2. Espanjalaiset yritykset salmella

- Ensimmäinen yritys **Nombre de Jesús 1584**; kaatui säähän, ruoan ja
  veden puutteeseen ja etäisyyteen muista espanjalaissatamista.
  (Punta Arenas, History.)
- Toinen, **Ciudad del Rey don Felipe**, myöhemmin **Puerto del Hambre**
  (Nälän satama). Pedro Sarmiento de Gamboa perusti sen **maaliskuussa
  1584 noin 300 asukkaalla**; olot olivat ankarat ja kasvillisuus
  niukkaa, ja suurin osa asukkaista kuoli nälkään tai kylmään.
  (Puerto del Hambre, johdanto ja historia.)
- **Thomas Cavendish** löysi paikan **1587** ja tapasi kaksi eloonjäänyttä,
  joista toinen kuoli ennen lähtöä; toinen lähti laivueen mukana.
  Cavendish vei paikalta kuusi tykkiä ja **antoi paikalle nimen
  "Port Famine"**. (Puerto del Hambre.)
  → *Punta Arenas -artikkeli sanoo "rescued the last surviving member"
  eli yhden; ristiriita kirjattu tarkistukseen (kohta A).*
- Sarmiennon retkikunta: **23 laivaa ja lähes 3 000 miestä ja asukasta**
  lähti Sanlúcar de Barramedasta **27.9.1581**, mutta myrskyt tuhosivat
  kaksi laivaa ja käänsivät laivueen takaisin; kaksi kuukautta myöhemmin
  Sarmiento lähti uudelleen 16 laivalla ja 2 200 miehellä.
  (Puerto del Hambre.)

## 3. Kuunari Ancud, Fuerte Bulnes ja kaupungin perustaminen

- **1843** Chilen hallitus lähetti retkikunnan rakentamaan linnakkeen ja
  perustamaan pysyvän asutuksen Magalhãesinsalmen rannalle. Sitä varten
  rakennettiin kuunari **Goleta Ancud** — *ensimmäinen Chilessä
  rakennettu sota-alus* — San Carlos de Ancudissa. Komentajana oli
  **britannialaissyntyinen Chilen laivaston upseeri John Williams
  Wilson** (espanjaksi Juan Guillermos). (Punta Arenas, Penal colony;
  Chilean schooner Ancud; Fuerte Bulnes.)
- Aluksen mitat: **27 tonnia, 15 m pitkä, 3,80 m leveä, syväys 2,78 m,
  neljä 20-naulaista tykkiä**. (Chilean schooner Ancud, infobox.)
- **Miehistön koko on ristiriitainen:** "Punta Arenas" sanoo *"a crew of
  21 people (captain, eighteen crew, and two women)"*; "Chilean schooner
  Ancud" sanoo *"On board were 23 crew (20 men, 2 women, 1 child)"*.
  → tarkistus, kohta B.
- Ancud lähti Ancudista **22.5.1843** ja saapui Punta Santa Analle
  **21.9.1843**; koko miehistö nousi maihin ja otti alueen haltuun
  Chilen nimissä. Ennen itään suuntautunutta tiedusteluretkeä 26.9. he
  jättivät rantaan kyltin, johon oli kaiverrettu "Republic of Chile" ja
  "Viva Chile!". Salmelta lähdettiin **4.12.1843**. (Chilean schooner
  Ancud.)
- Matkalla: myrsky vei toisen kahdesta pelastusveneestä; Puerto
  Americanossa Williams sai luvan vain **kopioida Robert FitzRoyn
  merikartat** (luonnontieteilijä **Bernardo Philippi** kopioi ne
  käsin), ei ostaa venettä. (Chilean schooner Ancud.)
- **Fuerte Bulnes** perustettiin 1843 kalliokukkulalle Punta Santa
  Analle ja nimettiin presidentti **Manuel Bulnes Prieton** mukaan.
  Se rakennettiin **hirsistä sekä mullasta ja ruohosta tehdyistä
  "tiilistä"**. (Fuerte Bulnes.)
- Etäisyys: Fuerte Bulnesin koordinaatit ovat 53°37,8′S 70°55,1′W ja
  Punta Arenasin 53°10′S 70°56′W → **noin 52 km etelään**. Leipätekstien
  luvut vaihtelevat (62 km, 58 km, 70 km, 80 km) → tarkistus, kohta C.
- Paikka ei kestänyt siviiliasutusta, joten **1848 sotilaskuvernööri
  José de los Santos Mardones siirsi asutuksen nykyiselle paikalle Las
  Minas -joen varteen ja antoi sille nimen Punta Arenas.** Kun väki oli
  muuttanut, sotilaat hylkäsivät ja polttivat linnakkeen; polton valvoi
  luutnantti Cambiaso. (Punta Arenas, Penal colony; Fuerte Bulnes.)
- Perustamispäivä infoboxissa: **18.12.1848**. (Punta Arenas, infobox.)
- Linnake rakennettiin uudelleen museokohteeksi **1941–1943** (kirkko,
  papin asunto, vankila, ruutivarasto, posti ja tallit) ja julistettiin
  kansallismonumentiksi **1968**. (Fuerte Bulnes.)

## 4. Rangaistussiirtola, kapinat ja vuosi 1873

- 1800-luvun puolivälissä Chile käytti Punta Arenasia
  **rangaistussiirtolana** ja kurinpitosijoituspaikkana ongelmallisiksi
  katsotuille sotilaille; sinne asutettiin myös siirtolaisia.
  (Punta Arenas, Penal colony.)
- **Joulukuussa 1851** vankien kapina luutnantti Cambiason johdolla
  johti kuvernööri **Muñoz Gameron** ja paikkakunnan papin surmaan sekä
  kirkon ja sairaalan tuhoon. Kapinan kukisti HMS *Viragon* komentaja
  Stewart kahden chileläisaluksen (*Indefatigable*, *Meteoro*) avulla.
  (Punta Arenas, Penal colony.)
- **1867** presidentti **José Joaquín Pérez** antoi asetuksen, joka
  tarjosi maata chileläisille ja ulkomaalaisille Punta Arenasin
  ympäristöstä. **Ensimmäiset brittisiirtolaiset saapuivat 1867**, ja
  heidän määränsä kasvoi lammastalouden myötä. Britit olivat suurin
  ryhmä **vuoteen 1906**, jolloin kroaatit ohittivat heidät.
  (Punta Arenas, Penal colony.)
- **1877** tykkimiesten kapina (*El motín de los artilleros*) tuhosi
  suuren osan kaupungista. (Punta Arenas, Penal colony.)
- **VUOSI 1873, SUORA OSUMA:** *"…in a diplomatic letter to major
  shipping nations in 1873, Chile promised freedom of navigation
  through and neutrality within the strait."* (Strait of Magellan,
  Legal status.) Isoisän matkavuonna Chile siis lupasi salmen olevan
  vapaa ja puolueeton kaikille lipuille.
- Satama oli myrskyille altis mutta ennen Panaman kanavan valmistumista
  **yksi Chilen tärkeimmistä; se toimi hiilenottopaikkana** Atlantin ja
  Tyynenmeren välillä kulkeville höyrylaivoille. Nykyään sitä käyttävät
  enimmäkseen risteilyt ja tutkimusretkikunnat. (Punta Arenas, Economic
  boom.)
- **Sara Braun saapui Magallanesiin helmikuussa 1874**, vuosi isoisän
  matkan jälkeen, 12-vuotiaana, 46 muun siirtolaisen kanssa; perhe oli
  lähtenyt Kuurinmaalta (nyk. Latvia) juutalaisvainojen takia ja
  kiertänyt Buenos Airesin ja Paraguayn kautta. Chilen diplomaatti
  **Guillermo Blest Gana** värväsi siirtolaisia Magallanesiin.
  (Sara Braun, Early life.)

## 5. Lammastalous, Sociedad Explotadora ja selkʼnamit

- Noin **1890–1940** Magallanesista tuli merkittävä lammasalue.
  **Sociedad Explotadora de Tierra del Fuego** perustettiin
  **31.8.1893**. (Punta Arenas, Economic boom; Sociedad Explotadora.)
- Maa-alat: **José Nogueira** vuokrasi huhtikuussa 1889 **180 000 ha**
  Tulimaata, ja seitsemän kuukautta myöhemmin hänen lankonsa **Mauricio
  Braun** vielä **170 000 ha**. 1890 Nogueira ja Sara Braun saivat
  presidentti **José Manuel Balmacedan** hallinnolta 20 vuoden
  vuokrasopimuksen **1 009 000 hehtaarista** eli kolmanneksesta
  Tulimaan vuokrattavissa olleesta maasta. Ehtona oli chileläisen
  yhtiön perustaminen. (Sara Braun; Sociedad Explotadora.)
- Nogueira kuoli **1893** ennen yhtiön perustamista, ja **Sara Braun
  otti liiketoiminnan haltuunsa** — "Magallanesin historian ensimmäinen
  liikenainen". Hän oli kuolemaansa asti yhtiön suurin yksittäinen
  osakkeenomistaja. (Sara Braun; Sociedad Explotadora.)
- **1910** Sociedad Explotadora sulautui Sociedad Ganaderan kanssa:
  yhtiöllä oli **3 miljoonaa hehtaaria Etelä-Chilessä ja Argentiinassa
  ja yli kaksi miljoonaa lammasta**. Pääkonttori ja omistajien asunnot
  olivat Punta Arenasissa. (Punta Arenas, Economic boom.)
- **Pinta-alaluku on ristiriitainen:** johdanto sanoo "10,000 square
  kilometres", Economic boom "over 11,000 km²" ja Sociedad Explotadora
  -artikkeli "over 1,000,000 ha". → tarkistus, kohta D.
- **SELKʼNAMIT (pakollinen, ei kaunistella).** Sanatarkasti (Sociedad
  Explotadora): *"Fences created obstacles for the nomadic life of the
  Selkʼnam people and introduction of sheep herds displaced their main
  food source, the guanaco… The Exploitation Society asked and received
  permission from the Chilean government to remove the indigenous
  population from the area. Menéndez gave orders for the extermination
  of the Selkʼnam, paying a bounty for each death."* Ja (Sara Braun):
  *"In the 21st century, the Historical Truth Commission of 2008 and
  related scholarship uncovered the involvement of the Braun and
  Menéndez families in the genocide of the Selkʼnam people, calling
  into question their previously laudable reputation."*
  → Lehti kertoo tämän tapahtumana: aidat, guanakon katoaminen,
  hallituksen lupa poistaa väestö, Menéndezin käsky ja vuoden 2008
  totuuskomissio. **Ei tapporahan yksityiskohtia, ei keskitysleirien
  kuvausta, ei uhrilukuja** (ikäsopivuus, spec-mantereet §1 ja §2).
- **Selkʼnamit ovat elossa, eivät kadonnut kansa.** Chile tunnusti
  selkʼnamit virallisesti alkuperäiskansaksi **syyskuussa 2023**
  (Selkʼnam people, Recognition-osio). Tämä lause TÄYTYY olla mukana:
  kadonneen kansan romantiikka on kielletty (spec-mantereet §1).
- Sociedad Explotadora vaihtoi nimensä **1964** (Ganadera Tierra del
  Fuego S.A.) ja purettiin **1973**. (Sociedad Explotadora.)

## 6. Kroaatit ja muut siirtolaiset

- Kroaattien muutto Chileen alkoi laajemmin **1864** ja kasvoi vuoteen
  1956 asti. Yhteisö asettui kahteen maan ääripäähän: **Antofagastaan
  pohjoisessa ja Punta Arenasiin etelässä**. (Croatian Chileans.)
- Kroaattien vaikutus näkyy yhä kauppojen, katujen ja rakennusten
  nimissä. (Croatian Chileans; Punta Arenas, Immigration.)
- Kaupungissa on myös **maailman eteläisin hindutemppeli**, jota käyttää
  pieni mutta merkittävä **sindhiyhteisö**; sindhikauppiaita alkoi
  saapua 1900-luvun alussa. (Punta Arenas, Demographics.)
- Muut ryhmät: espanjalaiset, saksalaiset, englantilaiset,
  italialaiset, sveitsiläiset ja irlantilaiset. (Punta Arenas,
  Immigration.)
- Vuoden 2024 laskennassa maahanmuuttajia oli **6,0 %** väestöstä.
  (Punta Arenas, Immigration.)

## 7. Salmi (teemasivun ydin)

- Magalhãesinsalmi on **noin 570 km pitkä ja kapeimmillaan 2 km leveä**
  (Carlos III -saaren kohdalla, Cape Frowardista länteen). Se erottaa
  Etelä-Amerikan mantereen Tulimaan saaristosta ja on **tärkein
  luonnollinen kulkuväylä Atlantin ja Tyynenmeren välillä**.
  (Strait of Magellan, johdanto ja Geography.)
- Magalhãesin laivue purjehti salmeen **1.11.1520 pyhäinpäivänä**, ja
  Magalhães nimesi sen *Estrecho de Todos los Santos*. **Läpimeno kesti
  38 päivää.** (Strait of Magellan, Name ja Geography.)
- **Vuoteen 1620 mennessä eli sadassa vuodessa salmen oli kulkenut
  vähintään 55 laivaa**: 23 espanjalaista, 17 englantilaista ja 15
  hollantilaista. (Strait of Magellan, History.)
- **Phillip Parker King** kartoitti salmen 1826–1830 HMS *Adventurella*
  yhdessä HMS *Beaglen* kanssa. **Richard Charles Mayne** johti HMS
  *Nassaun* mittausretkeä 1866–1869, ja **Charles Darwin pyysi
  amiraliteettia** teettämään Maynella fossiilinkeruuta salmen
  läheltä — löydöt vietiin British Museumiin. Amiraliteetti kokosi
  salmen purjehdusohjeet **1871**. (Strait of Magellan, History.)
- **Vuoden 1881 rajasopimuksessa Argentiina tunnusti Chilen
  suvereniteetin salmeen**; aiemmin Argentiina oli vaatinut koko salmea
  tai vähintään sen itäkolmannesta. (Strait of Magellan, History.)
- Ilmasto salmella on sumuinen ja kylmä, ja reitti mutkittelee useiden
  kapeikkojen läpi. Se on satoja maileja lyhyempi kuin Drakensalmi,
  mutta **purjelaivat ja etenkin klipperit suosivat Drakensalmea**.
  Salmen tärkein satama on Punta Arenas, chileläisen lampaanlihan
  jälleenlaivauspaikka. (Strait of Magellan, Geography.)

## 8. Ilmasto, tuuli ja otsoni

- **Subpolaarinen merellinen ilmasto** (Köppen *Cfc*, Trewartha *Eolk*).
  Heinäkuun keskiylin **4,9 °C** ja keskialin lähellä **−1 °C**,
  tammikuun keskiylin **16,3 °C**; artikkelin johdantoteksti antaa
  heinäkuun aliksi noin −1 °C ja tammikuun yliksi 14 °C, sääruutu
  16,3 °C → tarkistus, kohta E. Vuoden keskiylin 11,6 °C.
  (Punta Arenas, Climate + sääruutu 1991–2020.)
- **Sademäärä on pieni, noin 380 mm vuodessa** (artikkelissa "only 15
  in"), koska Andit tekevät sadevarjon. Sateisinta huhti–toukokuussa,
  lumikausi kesäkuusta syyskuuhun. (Punta Arenas, Climate.)
- **Tuuli jopa 130 km/h**, voimakkaimmillaan kesällä. Artikkelin väite
  keskustan kadulle viritetyistä köysistä on merkitty
  `{{citation needed}}` -lipulla → **lehti ei toista sitä**;
  saapumisteksti puhuu köysistä, ja se saa jäädä sinne. Tarkistus,
  kohta F.
- **Otsoni:** *"After 1986, Punta Arenas became the first significantly
  populated city in the world to be affected directly by the thinning
  ozone layer. Its residents are considered to be exposed to
  potentially damaging levels of ultraviolet radiation."* Viite on
  vertaisarvioitu tutkimus ihosyövästä ja UV-B:stä Etelä-Chilessä
  1987–2000. (Punta Arenas, Climate.)
- **Vuodesta 2017 kaupunki ja alue ovat omassa aikavyöhykkeessään** ja
  käyttävät kesäaikaa ympäri vuoden (UTC−3). Kaupungin vesi tulee
  San Juan -joesta. (Punta Arenas, johdanto.)

## 9. Etelämantereen portti

- Punta Arenas on **1 419 km Etelämantereen rannikolta** ja **635 km
  Ushuaiasta**. (Punta Arenas, Geography.)
- Kaupunki on yksi Etelämantereen **porttikaupungeista** yhdessä
  Ushuaian ja Christchurchin kanssa, ja se on tärkeä Länsi-Etelämantereen
  tutkimusasemien huoltopiste. (Punta Arenas, Modern city ja Economy;
  Antarctic gateway cities.)
- **Luis Alberto Pardo Villalón** (1882–1935) komensi elokuussa 1916
  höyryhinaaja **Yelchoa**, joka pelasti Ernest Shackletonin
  *Endurance*-retkikunnan **22 miestä Elephant Islandilta**.
  Kolme aiempaa yritystä epäonnistui (*Southern Sky*, *Instituto de
  Pesca N°1*, *Emma* — viimeisen rahoitti Punta Arenasin brittiklubi).
  Yelcho oli 36,5 m pitkä hinaaja **ilman kunnollista radiota,
  lämmitystä ja kaksoisrunkoa**. Pardo lähti Punta Arenasista
  **25.8.1916** Shackleton mukanaan, miehet pelastettiin **30.8.** ja
  paluu Punta Arenasiin oli **3.9.1916**. Britannian hallitus tarjosi
  suurta rahapalkkiota; **Pardo kieltäytyi** sanoen vain täyttäneensä
  laivaston hänelle antaman tehtävän. (Luis Pardo.)
- Punta Arenasissa on Pardon muistomerkki (Punta Arenas, kuvateksti).

## 10. Museot ja kohteet (kohdekarttaa varten)

- **Braun-Menéndezin palatsi** — *Museo Regional de Magallanes*. Talo on
  kansallismonumentti, ja siinä on toiminut **helmikuusta 1983** alkaen
  Magallanesin aluemuseo, jonka aineisto kertoo alueen lähihistoriasta.
  (Punta Arenas, Museums.)
- **Sara Braunin palatsi** ostettiin kalusteineen Braunin kuoltua Punta
  Arenasin Unionin klubille ja julistettiin historialliseksi
  monumentiksi **1981**. (Sara Braun, Legacy.) — *ei numeroitu kohde,
  ks. kohdekartan lohkokommentti.*
- **Salesiaanien aluemuseo Maggiorino Borgatello**, Avenida Bulnes 374,
  Santuario María Auxiliadoran vieressä. **Salesiaanit perustivat sen
  1893**; se on alueen tärkein, ja siinä on täydellinen kokoelma alueen
  lajeja ja **selkʼnam-kulttuuria** sekä näytteitä Etelämantereelta.
  Museota ylläpidetään yhteisön vapaaehtoisin lahjoituksin.
  (Punta Arenas, Museums.)
- **Merisotamuseo** (Museo Naval y Marítimo), Pedro Montt 981, sotilas-
  museon vieressä: Chilen asevoimien historiallinen kokoelma
  Magallanesin alueen kolonisaation ajalta. (Punta Arenas, Museums.)
- **Nao Victoria -museo**, 7,5 km pohjoiseen tietä Y-565 Rio Secoon.
  Täysimittainen jäljennös **Nao Victoriasta**, ensimmäisestä maailman
  ympäri purjehtineesta laivasta; lokakuusta 2011 myös täysimittainen
  jäljennös **James Cairdista**, Shackletonin veneestä. Museossa on myös
  Ancud-kuunarin jäljennös. (Punta Arenas, Museums; Chilean schooner
  Ancud, Replica.)
- **Museo del Recuerdo** (Magallanesin yliopiston Instituto de la
  Patagonia): **8 perinnerakennusta puusta, 40 vanhaa ajoneuvoa**,
  koneita ja työkaluja, enimmäkseen karjatalouteen ja öljyntuotantoon
  liittyviä. (Punta Arenas, Museums.)
- **Sagrado Corazónin katedraali.** Perustettu 1892; rakennustyö alkoi
  **28.12.1892** salesiaani-isä **Juan Bernabén** piirustusten mukaan ja
  valmistui **1.6.1901**. Sisätila on kolmilaivainen, **46 m pitkä,
  18 m leveä ja 30,60 m korkea**, romaanisin holvein ja korinttilaisin
  pylväin. **Kellotorni nousi 1898 ja on 30 m ristiin asti.**
  Paikalla oli ensimmäinen kirkko jo 1584 (artikkelin oma väite).
  Vihitty **4.12.1977**. (Sacred Heart Cathedral, Punta Arenas.)
  → 1584-väite on epäuskottava (Punta Arenasia ei ollut olemassa) →
  tarkistus, kohta G. **Lehti ei käytä sitä.**
- **Sara Braunin hautausmaa** (Cementerio Municipal Sara Braun),
  Avenida Bulnes 29, **4 hehtaaria**, kolme sisäänkäyntiä. Vihittiin
  **9.4.1894** kuvernööri Manuel Señoretin aikana; se korvasi vanhan
  hautausmaan, joka oli nykyisen Lautaron aukion paikalla. **Maan
  lahjoitti Sara Braun**, ja **insinööri Fortunato Circutti suunnitteli
  portit ja muurit 1919**. CNN on listannut sen maailman kauneimpien
  hautausmaiden joukkoon, ja se on ollut **Chilen kansallismonumentti
  vuodesta 2012**. Hautoja: Menéndez-Behety, Braun Hamburger,
  Blanchard, Greenshields, Kusanovic ja Menéndez-Montes; myös
  **Charles Amherst Milward**, brittimerimies, joka innoitti Bruce
  Chatwinin kirjan *In Patagonia*. Legendat: Sara Braunin toive, että
  pääportti suljetaan hänen kuolemansa jälkeen (se on yhä kiinni), sekä
  **Indio Desconocidon** hauta, jolle on 1950-luvulta alkaen jätetty
  kynttilöitä ja kolikoita ja jolle Magdalena Vrsalovic ja muut
  rakennuttivat muistomerkin (kuvanveistäjä Edmundo Casanova).
  (Cemetery of Punta Arenas.)
- **Magdalenan saari**, 32 km koilliseen: **Los Pingüinos Natural
  Monument** vuodesta 1982 (yhdessä Martan saaren kanssa).
  **Magalhãespingviinien** pesimäkolonia: 59 000 paria 2000/01,
  63 000 paria 2008/09 ja **43 000 paria 2018/19**. Lasku johtuu
  vuosien 2009–2010 kuivuudesta, joka tappoi kasvillisuuden; tuuli
  siirsi irtomaata ja peitti koloja, munia ja poikasia. **Turismi ei
  ole syy** — päinvastoin, pääpeto skua karttaa turistipolkuja ja
  polun varren pesät menestyvät hieman muita paremmin. Saarella asuu
  ympäri vuoden puistovartijoita: kuusi kesällä, kolme talvella.
  (Magdalena Island, Magallanes Region.)
- **Cerro de la Cruz**: keskustan yläpuolinen näköalapaikka
  (koordinaatit Nominatimista; valokuvataulun uusi kuva on otettu
  sieltä). Ei omaa en-Wikipedia-artikkelia → kohdekartan juttu nojaa
  siihen, mitä kaupungista sieltä näkyy, ja kaikki asiafaktat tulevat
  Punta Arenas -artikkelista.
- **Muelle Arturo Prat**: kaupungin laituri. Satamaa käyttävät nykyään
  risteilyt ja tutkimusretkikunnat, ja osa Etelämantereen risteilyistä
  lähtee täältä; satamassa on myös **County of Peebles** ja *Cavenga*
  aallonmurtajina. (Punta Arenas, Economy + kuvateksti.)
- **Kaupungintori** (Mercado Municipal): ei omaa artikkelia;
  koordinaatit Nominatimista. Juttu nojaa Punta Arenas -artikkelin
  talous- ja ruokatietoihin ja kertoo salmen kalasta.
  → **HUOM: jos kelvollista lähdettä ei löydy, kohde vaihdetaan.**
- **Lampuripatsas** (Monumento al Ovejero): pystytetty lampureiden
  muistoksi; artikkelissa "Shepherd Monument" mainitaan infoboxin
  kuvakoosteessa. Koordinaatit Nominatimista.
  → **Lähde on ohut** → tarkistus, kohta H.

## 11. Talous, liikenne ja koulutus (matkaopasta varten)

- Vuoteen 2006 mennessä talous oli monipuolistunut. **Chilen tärkeimmät
  öljyvarat ovat lähellä**, samoin heikkolaatuista kivihiiltä.
  Maatalous, lampaat ja karja ovat yhä merkittäviä. Turismi kasvaa:
  katedraali ja muut kirkot, hautausmaa ja Magalhãesin patsas.
  (Punta Arenas, Economy.)
- **Carlos Ibáñez del Campon** kansainvälinen lentoasema on 20 km
  keskustasta. Lentoyhtiöt LATAM Chile ja Sky Airline.
  **Maanteitse muualle Chileen pääsee vain Argentiinan kautta.**
  Lautta kulkee Tulimaan pääsaarelle ja harvemmin Puerto Williamsiin.
  (Punta Arenas, Transport ja Economy.)
- **Magallanesin yliopisto (UMAG)** perustettiin 1981; sitä ennen
  paikalla toimi Universidad Técnica del Estadon Punta Arenasin osasto
  vuodesta 1961. Kampuksia on Punta Arenasissa ja Puerto Natalesissa
  sekä yliopistokeskus Puerto Williamsissa. Yliopisto julkaisee
  humanistis-yhteiskuntatieteellistä **Magallania**-lehteä kahdesti
  vuodessa. Kaupungissa on myös saksalainen koulu. (Punta Arenas,
  Education.)

## 12. Mitä JÄTETÄÄN POIS

- **Vuoden 1984 mielenosoitus katedraalin edustalla ja Pinochet**
  (Sacred Heart Cathedral): 1973–1990 on rajattu ulos jo Chilen
  maalehdessä samalla perusteella (spec-mantereet, "ei
  nykypolitiikkaa"; CHL-lohkokommentti). Ei mainita.
- **Antonio Soto ja Patagonia Rebelde** (Cemetery of Punta Arenas):
  työtaistelun väkivaltainen kukistaminen Argentiinassa 1921–22 —
  ei tämän lehden aihe eikä ikäryhmälle tarpeen.
- **Hugo Banzer**, nykyiset kunnanvaltuutetut, kansanedustajat ja
  senaattorit (Punta Arenas, Administration): nykypolitiikkaa.
- **Punta Arenasin vuoden 1920 tapahtumat** (ei tässä artikkelissa,
  mutta lähialueen aihe): ei oteta mukaan.
- **Öljy- ja kaivosnykytalouden yksityiskohdat**: mainitaan yhdellä
  lauseella oppaassa, ei omana nostona.

## 13. Kohdekartan kahdeksan kohdetta

Rajaus `js/packs/maakartat.js` KAUPUNKIKARTAT.puntaarenas:
pohjoinen −53,1478, etelä −53,1712, länsi −70,9218, itä −70,8906
(2 080 × 2 602 m, 1600 × 2001 px, 1,30 m/px).

| # | kohde | lat | lon | lähde koordinaatille |
|---|---|---|---|---|
| 1 | Lampuripatsas | −53.149764 | −70.896575 | Nominatim |
| 2 | Sara Braunin hautausmaa | −53.152999 | −70.897648 | Nominatim |
| 3 | Salesiaanien museo | −53.155612 | −70.902287 | Nominatim |
| 4 | Cerro de la Cruz | −53.160112 | −70.915813 | Nominatim |
| 5 | Sagrado Corazónin katedraali | −53.162000 | −70.909000 | en-Wikipedia, coord |
| 6 | Braun-Menéndezin palatsi | −53.162177 | −70.905893 | Nominatim |
| 7 | Kaupungintori | −53.167096 | −70.911137 | Nominatim |
| 8 | Arturo Pratin laituri | −53.169188 | −70.907110 | Nominatim |

Kaikki 28 väliä laskettu haversinilla: **pienin 208 m** (katedraali –
Braun-Menéndezin palatsi), toiseksi pienin 355 m (kaupungintori –
laituri). Kaikki kohteet ovat vähintään 200 m rajauksen reunasta.
