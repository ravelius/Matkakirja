# Australian maalehti (ISO-3: AUS) — sisältösuunnitelma ja faktapohja

*Koonnut Sonnet-faktapohja-agentti 23.8.2026. Kaikki en-Wikipedia-faktat
haettu tänä päivänä raakatekstihaulla
(`https://en.wikipedia.org/w/index.php?title=X&action=raw`,
`NODE_USE_ENV_PROXY=1`; muutamalle sivulle (Overland Telegraph Line,
wool-artikkeli, Aboriginal astronomy) piti seurata #REDIRECT-rivi
oikeaan artikkeliin). Rakenteen ja mittojen SITOVA lähde on
`docs/moduulit/maalehti.md` ja `docs/aasia-tyoaineisto/lehtityo-resepti.md`;
sisältölinjaus (SITOVA) on `docs/mantereet-tyoaineisto/spec-mantereet.md`,
erityisesti sen Oseania-osio. Malliksi luettu
`docs/mantereet-tyoaineisto/faktapohja-usa.md` (rakenne kopioitu
sellaisenaan) ja pelin nykyinen `js/packs/oceania.js` +
`js/packs/oceania-questions.js` (kaupunkilista ja olemassa olevat
kulttuurivisat — ks. luku 11, avoin kysymys A, tärkeä päällekkäisyys-
löydös Ulurusta). Ei lopullisia lehtitekstejä, ei ladattuja kuvia, ei
kosketusta js/packs-tiedostoihin, ei committia — tämä on vain suunnitelma
seuraavaa kirjoittajaa varten.

Sisältölinjaus tarkistettu spec-mantereet.md:stä: alkuperäiskansojen
historia (mm. Stolen Generations) kerrotaan suoraan mutta hienotunteisesti
ja ilman yksityiskohtaista kärsimyskuvausta; Uluru vain ulkopuolelta,
kiipeämiskielto 2019 esimerkkinä kunnioituksesta; siirtomaahistoria
tapahtumina neutraalisti, ei sankarikehystä kummallekaan suunnalle; ei
nykypolitiikkaa. Väkivalta (esim. kultakenttien mellakat, Eureka-
kapinan kuolonuhrit) mainitaan tapahtumana, ei kuvailtuna.

---

## 1. Sisältösuunnitelma: miksi juuri nämä viisi aihetta

Australia on Raamatun tarkoittama **monikohdemaa** — `js/packs/oceania.js`
listaa 19 Australian kaupunkia/kohdetta (Sydney ja Perth `start: true`,
lisäksi Melbourne, Brisbane, Cairns, Darwin, Adelaide, Alice Springs,
Uluru, Broome, Kalgoorlie, Townsville, Hobart, Nullarbor, Birdsville,
Exmouth, Mount Isa, Coober Pedy, Geraldton), joten laajuusesitys on
maalehti.md:n täysi mitta: **5 aihetta × 4 nostoa = 20 nostoa**, kunkin
aiheen omalla minitehtävällä (5 kpl). Aiheiden nimet ovat yksisanaisia
yleisnimiä (maalehti.md:n vaatimus), jotta peli voi muodostaa otsikon
"AUSTRALIAN X" automaattisesti.

Ehdotetut aiheet ja miksi juuri ne:

1. **Historia** — vakioaihe joka maalla. 1873 osuu poikkeuksellisen
   tarkasti kahteen murroskohtaan: rangaistussiirtolakausi päättyi
   vasta viisi vuotta aiemmin (1868) ja maa on VIELÄ kuusi erillistä
   siirtokuntaa — ei mitään "Australiaa" ollut olemassa poliittisena
   yksikkönä ennen liittovaltiota 1901.
2. **Alkuperäiskansat** — spec-mantereet.md:n nimenomainen vaatimus:
   aboriginaalikansojen vähintään 65 000 vuoden historia omana
   korkeakulttuurinaan (tähtitiede, maanhoito), elävinä nykytoimijoina.
   Uluru-nosto antaa TÄSMÄLLEEN 1873-vuoden ankkurin (ks. A4).
3. **Talous** — Australian VAHVIN 1873-kulma taloudellisesti: maasta
   tuli 1870-luvulla maailman suurin villantuottaja, kultaryntäys oli
   muuttanut väestön ja vaurauden kymmenessä vuodessa, ja mannerten
   ylittävä lennätinlinja valmistui juuri edellisenä vuonna (1872) —
   Australia lakkasi olemasta viestinnällisesti eristyksissä muusta
   maailmasta juuri isoisän matkan kynnyksellä.
4. **Luonto** — Australian eläimistö on maailman ainutlaatuisimpia;
   kenguru ja nokkasiippa nimettiin/löydettiin eurooppalaisille juuri
   Cookin vuoden 1770 retkellä samalla rannikolla, jolle Iso valliriutta
   ajoi Endeavourin karille — sama tapahtumasarja kytkee kolme nostoa
   yhteen.
5. **Ruoka** — leiriruoka (damper, billy tea) ja kultakenttien
   monikulttuurinen keittiö (kiinalaiset kaivosmiehet) näyttävät
   Australian ruokakulttuurin syntyneen käytännön pakosta ja
   risteytymänä, sama "aineeton kulttuuriperintö" -logiikka kuin
   USA:n gumbo-nostossa.

**Pois jätetyt/vaihtoehtoiset aiheet ja miksi:** Urheilu (australialainen
jalkapallo 1850-luvulta, cricket) olisi mahdollinen, mutta Melbournen
oma kulttuurivisa kattaa jo aiheen (ks. luku 11); "Rakennukset" olisi
liian ohut ilman Sydneyn oopperataloa, joka on 1873-näkökulmasta
100 vuotta liian myöhäinen (valmistui 1973) ja kuuluu luontevammin
Sydneyn omaan kansisivuun. Tyynenmeren saarikohteiden ja Papua-Uuden-
Guinean aihepiirit (ydinkoehistoria, Sepikin veistotaide) jätetään
tarkoituksella pois — ne kuuluvat spec-mantereet.md:n mukaan Tyynenmeren
saarten ja PNG:n omiin kaupunkilehtiin, eivät Australian maapakettiin.

### 1b. Mallikatsaus

Ks. faktapohja-usa.md:n osio 1b — sama malli: `nimi`, `tehtava`
aiheella, nostojen kentät `otsikko`, (valinnainen `aika`), `tiedosto`,
`teksti` (440–660 mrk), `selite` (yksi virke), `lahde`
('Tekijä, Wikimedia Commons (LISENSSI)'), `wiki` (fi-Wikipedia-hakusana).

---

## 2. FAKTAPOHJA: Historia

**Johdanto-ehdotus (n. 220–260 mrk):**

> Vuonna 1873 Australia ei ole vielä maa vaan kuusi erillistä
> siirtokuntaa. Rangaistusvankien laivat ovat lakanneet saapumasta
> vasta viisi vuotta sitten, ja kultaryntäys on muuttanut mantereen
> väestön ja vaurauden parissa vuosikymmenessä.

### H1 — "Vankilaiva joka ei koskaan palannut kotiin" (First Fleet, 1788)

> Tammikuussa 1788 yksitoista laivaa ankkuroitui Sydneyn satamaan
> kahdeksan kuukauden purjehduksen jälkeen Englannista: mukana oli
> reilut 1 400 ihmistä, joista noin 750 oli rangaistusvankeja. Britannia
> oli menettänyt Amerikan siirtokuntansa vankiensa lähetyspaikkana
> vapaussodassa ja etsi uutta kohdetta — Botany Bay vaikutti
> etäisyydeltään ihanteelliselta. Vuoteen 1868 mennessä Britannia oli
> kuljettanut Australiaan yli 160 000 vankia. Isoisän matkan aikaan
> 1873 kuljetukset ovat päättyneet vasta viisi vuotta sitten, ja Sydney
> on kasvanut vankileiristä sataman kaupungiksi, jonka villalaivat
> purjehtivat Lontooseen sadassa päivässä.

Faktat ja lähteet:
- Ensimmäinen laivue (First Fleet), 11 laivaa, lähti Portsmouthista
  13.5.1787 ja saapui Botany Bayhin 18.1.1788 — matka kesti noin 250
  päivää eli n. 8 kuukautta, ei yhdeksää. Matkustajina noin 1 420
  henkeä, joista noin 732 oli vankeja. — en-Wikipedia "First Fleet",
  tarkistettu myös nykyisestä Sydney-faktarivistä
  `js/packs/oceania-questions.js`: "Sydney oli Britannian ensimmäinen
  rangaistussiirtola Australiassa, perustettu 1788."
- Suurten mittasuhteiden kuljetus Australiaan jatkui 1787:stä
  1868:aan; Britannia kuljetti tänä aikana arviolta 160 000–168 000
  vankia (eri lähteet). — en-Wikipedia "Penal transportation"
- Transportation of convicts to Western Australia ended in 1868 (last
  colony to receive convicts). — en-Wikipedia "History of Australia
  (1851–1900)"

### H2 — "Viimeinen vankilaiva" (Hougoumont, 1868)

> 10. tammikuuta 1868 laiva Hougoumont ankkuroitui Fremantleen 280
> vangin kanssa — viimeinen koskaan Australiaan saapunut vankilaiva.
> Matkustajien joukossa oli 62 fenian-vankia, iirin itsenäisyysliikkeen
> jäseniä, joiden kuljettaminen rikkoi Britannian ja Länsi-Australian
> välistä sopimusta eikä ollut koskaan aiemmin sallittua sotilasvangeille.
> Koska monet fenianeista osasivat lukea ja kirjoittaa poikkeuksellisen
> hyvin, matkasta syntyi seitsemän numeroa laivalla käsin kirjoitettua
> "Wild Goose" -lehteä, joka on säilynyt tähän päivään. Isoisän
> matkapäiväkirjan alkaessa 1873 tapahtumasta on kulunut vain viisi
> vuotta — koko rangaistussiirtolakausi on vielä tuoretta muistia.

Faktat ja lähteet:
- Hougoumont oli viimeinen vankilaiva Australiaan; lähti Portsmouthista
  12.10.1867, 280 vankia ja 108 matkustajaa mukanaan, saapui Fremantleen
  10.1.1868 89 päivän matkan jälkeen. — en-Wikipedia "Hougoumont (ship)"
- Mukana oli 62 fenian-poliittista vankia, joista noin 17 sotilas-
  fenianeja; poliittisten ja etenkin sotilasvankien kuljettaminen
  rikkoi Ison-Britannian ja Länsi-Australian sopimusta ja aiheutti
  paniikkia siirtokunnassa. — en-Wikipedia "Hougoumont (ship)"
- Matkalla ilmestyi seitsemän numeroa käsinkirjoitettua "The Wild
  Goose" -laivalehteä, joka on säilynyt (mm. New South Walesin
  osavaltionkirjastossa). — en-Wikipedia "Hougoumont (ship)"

### H3 — "Kaivosmiesten kapina" (Eureka-kapina, 1854)

> Joulukuun 3. päivänä 1854 kapteeni Thomasin komentama 276 hengen
> yhdistetty sotilas- ja poliisijoukko hyökkäsi Ballaratin
> kultakentillä kaivosmiesten pystyttämän puuaidan, Eureka-
> linnoituksen, kimppuun aamun pimeydessä. Taistelu kesti alle
> vartin, mutta siinä kuoli noin
> 20–27 ihmistä, valtaosa kaivosmiehiä. Mellakan taustalla oli
> viha kalliiseen kaivoslupamaksuun ja äänioikeuden puutteeseen —
> vaeltavilla kaivosmiehillä ei ollut edustusta hallinnossa, joka
> heitä verotti. Kapinan 13 vangittua johtajaa vapautettiin
> myöhemmin oikeudenkäynnissä yleisön suosion painostamana, ja
> uudistukset seurasivat: yleinen äänioikeus miehille ja halvempi,
> äänioikeuteen oikeuttava kaivoslupa.

Faktat ja lähteet:
- Eureka-kapinan taistelu käytiin 3.12.1854 Ballaratissa, Victorian
  siirtokunnassa; virallinen kuolonuhrien määrä 27, valtaosa
  kapinallisia. — en-Wikipedia "Eureka Rebellion"
- Hyökkäävä joukko oli kapteeni Thomasin komentama yhdistetty
  sotilas-poliisimuodostelma, 276 miestä ("the combined military
  police formation of 276 men under the command of Captain Thomas").
  Luku 1 500 esiintyy Wikipediassa eri asiayhteydessä — se on
  kapinallisten (varuskunnan) enimmäisvahvuus linnoituksessa ("up to
  1,500 of 17,280 men in Ballarat were garrisoning the stockade, with
  as few as 120 taking part in the battle"), ei hallituksen
  hyökkääjien määrä; aiempi versio tästä faktapohjasta sekoitti nämä
  kaksi lukua keskenään. — en-Wikipedia "Eureka Rebellion"
- Taustalla oli tyytymättömyys kuukausittaiseen kaivoslupamaksuun ja
  hallinnon mielivaltaisuuteen sekä äänioikeuden puute vaeltaville
  kaivosmiehille; avoin kapina puhkesi 29.11.1854, kun noin 10 000
  ihmistä vannoi uskollisuutta Eureka-lipulle. — en-Wikipedia "Eureka
  Rebellion"
- 13 vangittua kapinallista vapautettiin maanpetossyytteestä yleisön
  tuella; seuranneet uudistukset toivat yleisen miesten äänioikeuden
  ja halvemman, äänioikeuteen oikeuttavan kaivosluvan. — en-Wikipedia
  "Eureka Rebellion"

### H4 — "Maa jolla oli kuusi eri raideleveyttä" (siirtokunnat ja rautatiet, 1850–1873)

> Vuonna 1873 "Australia" ei ole poliittinen yksikkö vaan kuuden
> erillisen brittisiirtokunnan yhteisnimi — New South Wales, Victoria,
> Queensland, Etelä-Australia, Länsi-Australia ja Tasmania — kukin
> omine parlamentteineen, lakeineen ja jopa rautateineen. Kun New
> South Wales ja Victoria eivät 1850-luvulla päässeet yksimielisyyteen
> raideleveydestä, kumpikin rakensi omansa: Victoria valitsi leveämmän,
> Queensland myöhemmin kapeamman. Tuloksena junat eivät voineet ajaa
> siirtokunnasta toiseen ilman matkustajien ja tavaran uudelleen-
> lastausta rajalla — ongelma, joka jatkui vuosikymmeniä liittovaltion
> perustamisen (1901) jälkeenkin. Yhtenäinen "Australia" syntyy vasta
> isoisän matkan jälkeisenä sukupolvena.

Faktat ja lähteet:
- Australian kuusi siirtokuntaa (NSW, Victoria, Queensland, South
  Australia, Western Australia, Tasmania) olivat itsehallinnollisia
  erillisiä yksiköitä ennen liittovaltion perustamista 1.1.1901. —
  en-Wikipedia "History of Australia (1851–1900)"
- New South Wales ja Victoria riitautuivat raideleveydestä 1850-luvulla;
  Victoria otti 1854 käyttöön 5 jalan 3 tuuman leveän raiteen, NSW piti
  brittiläisen normaalileveyden, Queensland otti 1865 käyttöön 3 jalan
  6 tuuman kapean raiteen. Kolme eri raideleveyttä aiheutti
  "raideleveyskatkon" ("break of gauge") ongelman, joka jatkui
  vuosikymmeniä. — en-Wikipedia "Rail gauge in Australia"
- Yhtenäistä normaaliraideyhteyttä kaikkien mantereen pääkaupunkien
  välille ei saatu valmiiksi ennen vuotta 1995. — en-Wikipedia "Rail
  gauge in Australia"

**Minitehtäväehdokas (Historia):**
> Kuinka moneksi erilliseksi brittisiirtokunnaksi Australia oli vielä
> jaettuna vuonna 1873?
> Vaihtoehdot: kolmeksi / neljäksi / **kuudeksi** / kahdeksaksi
> Fakta: NSW, Victoria, Queensland, Etelä-Australia, Länsi-Australia
> ja Tasmania olivat kukin omia itsehallinnollisia siirtokuntiaan
> ennen liittovaltiota 1901.

*Vastaus löytyy nostosta H4. Ei osu olemassa oleviin visakysymyksiin
(tarkistettu koko `OCEANIA_QUESTIONS`-taulukko; ainoat Australian
historia-aiheiset kysymykset koskevat Melbournen pääkaupunkikautta
1901–1927 ja Sydneyn perustamisvuotta 1788 — molemmat eri faktoja
kuin tämä.)*

---

## 3. FAKTAPOHJA: Alkuperäiskansat

*(Sävy tarkistettu spec-mantereet.md:n Oseania-osiosta: historia
kerrotaan suoraan mutta hienotunteisesti, nykykulttuuri elävänä toimijana,
Uluru vain ulkopuolelta, kiipeämiskielto 2019 esimerkkinä
kunnioituksesta. TÄRKEÄ HUOMIO: Ulurun oma kaupunkivisa
`js/packs/oceania-questions.js` (rivit 388–437) kysyy JO nimenomaan
1873-nimeämisen ja 2019-kiipeämiskiellon — ks. luku 11, avoin kysymys A.)*

**Johdanto-ehdotus:**

> Kun isoisä kirjoittaa matkapäiväkirjaansa, aboriginaalikansat ovat
> asuttaneet mannerta jo vähintään 65 000 vuotta — yksi maailman
> pisimmistä yhtäjaksoisista kulttuureista. Heidän tähtitietonsa,
> maanhoitonsa ja tarinaperinteensä ovat yhä eläviä, ei muistoja.

### A1 — "Vanhin yhtäjaksoinen kulttuuri" (65 000 vuotta)

> Aboriginaalikansojen esi-isät saapuivat Australiaan arviolta 50 000–
> 65 000 vuotta sitten, todennäköisesti veneillä nykyisen Indonesian
> saarten kautta — merimatka, joka vaati tarkoituksellista
> merenkulkutaitoa jo kymmeniä tuhansia vuosia ennen kuin eurooppalaiset
> uskalsivat purjehtia näköpiirin ulkopuolelle. Kuudessatoista
> vuosituhannessa syntyi jopa 500 eri kieli- ja alueryhmää, joilla
> jokaisella oli oma "Maansa" (Country), johon liittyi syvä hengellinen
> side. Arnhemlandissa Yolngu-kansan suulliset kertomukset ovat kulkeneet
> sadoista sukupolvista toiseen, ja kalliotaide vahvistaa nykytekniikoin
> kulttuurin katkeamattoman jatkumon muinaisuudesta nykypäivään.

Faktat ja lähteet:
- Esi-isät saapuivat Australiaan arkeologisen näytön mukaan 50 000–
  65 000 vuotta sitten; muodostivat ajan myötä jopa 500 kieli- ja
  alueryhmää. — en-Wikipedia "Aboriginal Australians"
- Saapuminen tapahtui todennäköisesti veneillä tai saarihyppelynä
  Sulawesin ja Uuden-Guinean välisen saariketjun kautta, Wallacen
  linjan ylittäen. — en-Wikipedia "Aboriginal Australians"
- Arnhemlandin Yolngu-kansan suullinen perinne on säilynyt satojen
  sukupolvien ajan; kalliotaide vahvistaa kulttuurin jatkuvuuden
  muinaisuudesta nykyaikaan, ja aboriginaalikulttuuria pidetään
  yhtenä maailman vanhimmista yhtäjaksoisista kulttuureista. —
  en-Wikipedia "Aboriginal Australians"

### A2 — "Emu joka ei ole tähdistä vaan niiden välistä" (aboriginaalinen tähtitiede)

> Siinä missä eurooppalainen tähtitiede piirtää kuvioita tähdistä,
> monen aboriginaalikansan tärkein taivaanhahmo — Emu taivaalla —
> muodostuu Linnunradan TUMMISTA pilvistä tähtien välissä: Etelän
> Ristin vieressä oleva pimeä Hiilisäkki-sumu on emun pää, ja Linnunradan
> tumma halkeama sen ruumis. Kun emun sijainti taivaalla muuttuu
> vuodenaikojen mukana, se kertoo milloin on aika kerätä emunmunia.
> Toinen laajalti tunnettu tarina, Seitsemän sisarta, seuraa Plejadien
> tähtijoukkoa satojen kilometrien päähän toisistaan asuvien kansojen
> kertomuksissa läpi mantereen — todiste siitä, kuinka tarkkaan
> tähtitaivasta on seurattu kalenterina ja karttana sukupolvesta toiseen.

Faktat ja lähteet:
- "Emu taivaalla" -tähtikuvio muodostuu tummista pilvistä (Hiilisäkki-
  sumu emun päänä, Linnunradan tumma halkeama ruumiina) eikä tähdistä;
  tunnetaan lähes kaikkialla Australian aboriginaalikulttuureissa. —
  en-Wikipedia "Australian Aboriginal astronomy"
- Kun Malleefowl-tähtikuvio (Lyra) katoaa lokakuussa, Boorong-kansa
  tietää munienkeruuajan alkaneen — esimerkki tähtien käytöstä
  kalenterina. — en-Wikipedia "Australian Aboriginal astronomy"
- Seitsemän sisarta -tarina (Plejadit) kulkee useiden kansojen
  kertomuksissa Länsi-Australian Pilbarasta Etelä-Australian
  APY-maille asti, eri nimillä mutta tunnistettavana samana
  tarinana. — en-Wikipedia "Australian Aboriginal astronomy"

### A3 — "Tuli joka hoitaa maata" (fire-stick farming / kulttuuripoltot)

> Aboriginaalikansat ovat tuhansien vuosien ajan sytyttäneet
> tarkoituksella pieniä, matalia kulopaloja polttaakseen alustan
> kuivan kasvillisuuden pois säännöllisesti — tekniikka, jonka
> arkeologi Rhys Jones nimesi 1969 "keppitulimaanviljelyksi". Menetelmä
> vähentää suurten, hallitsemattomien maastopalojen riskiä, ohjaa
> riistaeläimiä metsästystä varten ja lisää monien kasvi- ja
> eläinlajien monimuotoisuutta. Eurooppalaiset uudisasukkaat
> pysäyttivät käytännön laajoilla alueilla, mutta 2000-luvulla
> alkuperäiskansojen tietäjät ovat palauttaneet "kulttuuripolton"
> maanhoitoon — esimerkiksi Victoriassa perinne palasi käyttöön 170
> vuoden tauon jälkeen.

Faktat ja lähteet:
- "Fire-stick farming" (myös "cool burning", nyk. "cultural burning")
  on aboriginaalikansojen vuosituhansia käytetty säännöllinen
  hallittu poltto; tarkoituksena mm. metsästyksen helpottaminen,
  lajikoostumuksen muokkaus, palovaaran vähentäminen ja
  monimuotoisuuden lisääminen. — en-Wikipedia "Fire-stick farming"
- Termin "fire-stick farming" loi arkeologi Rhys Jones vuonna 1969. —
  en-Wikipedia "Fire-stick farming"
- Käytäntö oli monin paikoin keskeytynyt, mutta on 2000-luvulla
  palautettu käyttöön alkuperäiskansojen tietäjien opastuksella;
  esimerkiksi Victoriassa "kulttuuripoltto" palasi 170 vuoden tauon
  jälkeen. — en-Wikipedia "Fire-stick farming"

### A4 — "Punainen kallio saa uuden nimen" (Uluru, 19.7.1873)

> Heinäkuun 19. päivänä 1873 — samana vuonna kun isoisän matkapäiväkirja
> alkaa — maanmittaaja William Gosse näki tasangolta kohoavan
> valtavan hiekkakivikallion ja nimesi sen Ayers Rockiksi Etelä-
> Australian silloisen ylisihteerin Henry Ayersin mukaan. Alueen
> anangu-kansalle kallio oli tietysti jo silloin Uluru — pyhä paikka,
> jonka ympärillä on lähteitä, luolamaalauksia ja Uneaikojen tarinoita.
> Vasta 1985 Australian hallitus palautti maanomistuksen anangulle;
> vuonna 2019, anangun pitkäaikaisen toiveen mukaisesti, kallion
> kiipeäminen kiellettiin kokonaan kunnioituksesta paikan pyhyyttä
> kohtaan. Kalliota katsotaan nykyään vain sen ympäri kiertäen — ei
> sen päältä.

Faktat ja lähteet:
- Maanmittaaja William Gosse näki ja nimesi Uluru-kallion "Ayers
  Rockiksi" 19.7.1873, Etelä-Australian silloisen ylisihteerin Sir
  Henry Ayersin mukaan. — en-Wikipedia "Uluru"
- Uluru on pyhä paikka alueen anangu-kansalle (pitjantjatjara);
  ympärillä on lähteitä, vedenkoloja, luolia ja muinaisia
  kalliomaalauksia. — en-Wikipedia "Uluru"
- Australian hallitus palautti maanomistuksen anangulle 26.10.1985
  (99 vuoden vuokrasopimuksella takaisin kansallispuistolle);
  kiipeäminen kiellettiin kokonaan 26.10.2019 anangun pitkäaikaisesta
  toiveesta. — en-Wikipedia "Uluru"

**Minitehtäväehdokas (Alkuperäiskansat):**
> Mikä aboriginaalinen tähtikuvio muodostuu Linnunradan TUMMISTA
> pilvistä tähtien sijaan?
> Vaihtoehdot: **Emu taivaalla** / Seitsemän sisarta / Vesikäärme /
> Kotka
> Fakta: Emun pää on Etelän Ristin vieressä oleva pimeä Hiilisäkki-
> sumu, ja sen ruumis Linnunradan tumma halkeama.

*Vastaus löytyy nostosta A2 — tarkoituksella EI Uluru-aiheinen, koska
Ulurun oma kaupunkivisa kysyy jo 1873-nimeämisen ja 2019-kiipeämis-
kiellon (ks. luvun alun huomio ja luku 11, avoin kysymys A). A4-nosto
saa silti sisältää samat faktat — sivut ovat eri sivuja eri
kohdissa peliä, joten toisto pienenä kertauksena ei ole ongelma,
mutta minitehtävän kannattaa testata jotain MUUTA kuin visa.*

---

## 4. FAKTAPOHJA: Talous

**Johdanto-ehdotus:**

> Vuonna 1872 Australia lakkasi olemasta maailmasta viestinnällisesti
> eristyksissä, ja 1870-luvulla siitä tuli maailman suurin
> villantuottaja. Isoisän matkan aikaan mannerta muokkaavat kulta,
> lampaat ja äskettäin valmistunut lennätinlinja — kaikki samaan
> aikaan.

### T1 — "Kulta joka toi puoli miljoonaa ihmistä" (kultaryntäykset, 1851–)

> Helmikuussa 1851 Edward Hargraves julisti löytäneensä kultaa
> Bathurstin lähellä New South Walesissa — ja pian sen jälkeen
> Victoriasta löytyi vielä rikkaampia esiintymiä. Australian väkiluku
> lähes kolminkertaistui kymmenessä vuodessa, 430 000:sta 1851
> yli 1,17 miljoonaan 1861, kun siirtolaisia virtasi Isosta-
> Britanniasta, Euroopasta, Yhdysvalloista ja Kiinasta. Victorian
> kultakentillä työskenteli 1855 jo 20 000 kiinalaista kaivosmiestä —
> siirtomaahallitukset vastasivat kasvavaan pelkoon säätämällä
> kiinalaisille erityisiä veroja ja rajoituksia. Melbournesta tuli
> ryntäyksen ansiosta siirtokunnan väkirikkain kaupunki.

Faktat ja lähteet:
- Edward Hargraves julkisti kultalöytönsä Bathurstin, NSW:n, lähellä
  helmikuussa 1851; rikkaammat esiintymät löytyivät pian Victoriasta.
  — en-Wikipedia "History of Australia (1851–1900)"
- Australian väestö kasvoi 430 000:sta (1851) 1 170 000:een (1861);
  Victoriasta tuli väkirikkain siirtokunta ja Melbournesta suurin
  kaupunki. — en-Wikipedia "History of Australia (1851–1900)"
- Victorian kultakentillä oli 20 000 kiinalaista kaivosmiestä vuoteen
  1855 mennessä (NSW:ssä 13 000); siirtomaahallitukset säätivät
  kiinalaisille erityisveroja ja -rajoituksia kasvavan epäluulon
  vuoksi. — en-Wikipedia "History of Australia (1851–1900)"

### T2 — "Maailman suurin villantuottaja" (lampaat ja villa, 1870-luku)

> Merinolammas tuotiin Australiaan ensimmäistä kertaa 1797, ja rotu
> osoittautui täydelliseksi mantereen kuivalle ilmastolle: sen
> hieno villa oli maailmanmarkkinoiden kysytyintä. 1870-luvulle
> tultaessa Australiasta oli tullut maailman suurin villantuottaja —
> juuri isoisän matkan aikaan. Villa purjehti Lontooseen villalaivoilla,
> jotka parhaimmillaan tekivät matkan sadassa päivässä, ja tuotto
> rahoitti siirtokuntien rautateitä, kirjastoja ja leveitä katuja.
> Vaeltavat lampaanleikkaajat kulkivat tilalta toiselle kantaen
> koko omaisuuttaan "swag"-käärössä selässään — hahmo, josta tuli
> myöhemmin australialaisen kansanperinteen "swagman".

Faktat ja lähteet:
- Merinolammas tuotiin Australiaan ensimmäistä kertaa 1797; rotu
  sopi hyvin Australian olosuhteisiin. 1870-luvulle tultaessa
  Australiasta oli tullut maailman suurin villantuottajamaa. —
  en-Wikipedia "Agriculture in Australia"
- Villateollisuus riippui vaeltavista lampaanleikkaajista, jotka
  kantoivat omaisuuttaan "swag"-käärössä tilalta toiselle; termi
  "swagman" vakiintui 1850-luvun kultaryntäysten aikana. —
  en-Wikipedia "Swagman"
- (Villalaivojen n. 100 päivän purjehdusaika Lontooseen: sama fakta
  toistuu jo pelin nykyisessä Sydney-tekstissä
  `js/packs/oceania-questions.js`, isoisän sitaatti — käytettävissä
  tässä ristiin vahvistuksena, ei uutena Wikipedia-lähteenä.)

### T3 — "Sanoma joka kulki tunneissa kuukausien sijaan" (mannertenvälinen lennätinlinja, 1872)

> 22. elokuuta 1872 kaksi rakennusryhmää — toinen edennyt Adelaidesta
> pohjoiseen, toinen Darwinista etelään — kohtasi Frew's Pondsissa
> keskellä mannerta ja liitti 3 200 kilometrin lennätinlinjan yhtenäiseksi.
> Kun linja yhdistettiin Jaavalta Darwiniin tulevaan merenalaiseen
> kaapeliin, viestintäaika Eurooppaan romahti kuukausista tunteihin.
> Työ oli ollut kaoottista: pohjoisen osuuden alkuperäinen urakoitsija
> irtisanottiin edistymisen puutteen vuoksi, ja hallitus joutui
> rakentamaan yli 700 kilometriä lisää itse. Isoisän matkan alkaessa
> 1873 Australia on ollut reaaliaikaisessa yhteydessä muuhun maailmaan
> vasta reilun vuoden.

Faktat ja lähteet:
- Australian mannertenvälinen lennätinlinja (Overland Telegraph Line),
  3 200 km Darwinista Adelaideen, valmistui 1872; linjat yhdistyivät
  Frew's Pondsissa 22.8.1872. Yhdistettynä Jaava–Darwin-merikaapeliin
  viestintäaika Eurooppaan putosi kuukausista tunteihin. —
  en-Wikipedia "Australian Overland Telegraph Line"
- Pohjoisen osuuden alkuperäinen urakoitsija (Darwent & Dalwood)
  irtisanottiin riittämättömän edistymisen vuoksi toukokuussa 1871;
  Etelä-Australian hallitus joutui rakentamaan yli 700 km lisää
  itse. — en-Wikipedia "Australian Overland Telegraph Line"
- Merenalainen kaapeli Jaavalta Darwiniin valmistui ja yhdistettiin
  18.–19.11.1871, ennen maalinjan valmistumista. — en-Wikipedia
  "Australian Overland Telegraph Line"

### T4 — "Kulta joka johti kapinaan" (Eureka-kapinan taloudelliset juuret) — VARALLA, päällekkäinen H3:n kanssa

*(Tämä nosto-aihio jätetään pois — sisältö on jo H3:ssa Historia-
sivulla. Talous-sivun neljänneksi nostoksi ehdotetaan sen sijaan
alla oleva T4b.)*

### T4b — "Kalgoorlien kultasuoni joka kesti yli sata vuotta" (Länsi-Australian kultaryntäys) — huom: 1893, jälkikaiku

*(HUOM kirjoittajalle: tämä tapahtuma on 20 vuotta isoisän matkan
JÄLKEEN — 1893, ei 1873. Sopii silti Talous-sivulle laajempana
kaarena "kulta muokkasi koko mannerta 1850–1890-luvuilla", mutta
teksti pitää kirjoittaa selvästi jälkikaikuna eikä isoisän ajan
tapahtumana. Vaihtoehtoinen, ajallisesti puhtaampi T4-nosto: laajenna
T1 tai T2 neljänneksi kokonaiseksi nostoksi esim. Bendigon tai
Ballaratin kultakenttien arjesta 1850–1860-luvulla — tätä EI ole
vielä faktatarkistettu tässä koosteessa, Fablen/Opuksen päätettävä.)*

**Minitehtäväehdokas (Talous):**
> Minä vuonna Australian mannertenvälinen lennätinlinja valmistui ja
> yhdisti maan reaaliaikaisesti muuhun maailmaan?
> Vaihtoehdot: 1854 / 1868 / **1872** / 1901
> Fakta: linjat kohtasivat Frew's Pondsissa 22.8.1872.

*Vastaus löytyy nostosta T3. Ei osu olemassa oleviin visakysymyksiin.*

---

## 5. FAKTAPOHJA: Luonto

**Johdanto-ehdotus:**

> Kun Cookin Endeavour ajoi karille Ison valliriutan kivillä 1770,
> laivan miehet tapasivat samalla rannikolla eläimiä, joita Eurooppa
> ei ollut koskaan nähnyt — eikä aluksi uskonut niiden olevan totta.

### L1 — "Eläin jonka nimi syntyi väärinkäsityksestä" (kenguru, 1770)

> Heinäkuun 12. päivänä 1770 Joseph Banks kirjasi päiväkirjaansa sanan
> "kanguru" — kapteeni Cookin retkikunta oli pysähtynyt korjaamaan
> Endeavourin vaurioita nykyisen Cooktownin kohdalla, ja paikallinen
> guugu yimithirr -kansa kertoi heille eläimen nimen. Suosittu tarina
> väittää sanan tarkoittavan "en ymmärrä", mutta kielitieteilijä John
> Haviland vahvisti 1970-luvulla tarinan vääräksi: "gangurru" oli aidosti
> yhden harvinaisen tummasävyisen kengurulajin nimi guugu yimithirr
> -kielellä. Ensimmäinen Eurooppaan tuotu kengurunnahka täytettiin
> taksidermistien toimesta, jotka eivät olleet ikinä nähneet elävää
> eläintä — tulos herätti yleisössä lähinnä hämmennystä.

Faktat ja lähteet:
- Sana "kangaroo" kirjattiin ensi kertaa muodossa "kanguru" Joseph
  Banksin päiväkirjaan 12.7.1770 lähellä nykyistä Cooktownia, Guugu
  Yimithirr -kansan alueella, kun Cookin laiva Endeavour oli
  korjattavana Great Barrier Reefillä saadun vaurion jälkeen. —
  en-Wikipedia "Kangaroo"
- Suosittu myytti sanan tarkoittavan "en tiedä/ymmärrä" on kielitieteilijä
  John B. Havilandin 1970-luvun tutkimuksen mukaan väärä: "gangurru"
  viittasi todellisuudessa harvinaiseen tummasävyiseen kengurulajiin.
  — en-Wikipedia "Kangaroo"
- Ensimmäinen Länteen tuotu kenguru oli John Goren (Cookin upseeri)
  1770 ampuma yksilö, jonka nahka ja kallo täytettiin Englannissa
  taksidermistien toimesta, jotka eivät olleet koskaan nähneet
  eläintä elävänä. — en-Wikipedia "Kangaroo"

### L2 — "Eläin jota tiedemiehet pitivät huijauksena" (nokkasiippa, 1799)

> Vuonna 1799 ensimmäiset tiedemiehet, jotka näkivät säilötyn
> nokkasiipän ruumiin, olivat vakuuttuneita, että kyseessä oli useasta
> eläimestä ommeltu huijaus — sorsan nokka, majavan häntä ja munia
> muniva "nisäkäs" tuntuivat liian oudolta yhdistelmältä ollakseen
> totta. Nokkasiippa on yksi vain viidestä elävästä munivasta
> nisäkäslajista maailmassa, ja koirasyksilöillä on takajaloissaan
> myrkkypiikit — yksi harvoista myrkyllisistä nisäkkäistä koko
> maailmassa. Se aistii saaliinsa veden alla sähkökentän avulla,
> silmät, korvat ja sieraimet suljettuina. Australian
> alkuperäiskansoille eläin on kulttuurisesti merkittävä, ja sitä
> on perinteisesti myös metsästetty ravinnoksi.

Faktat ja lähteet:
- Vuonna 1799 ensimmäiset tiedemiehet, jotka tutkivat säilöttyä
  nokkasiipän ruumista, arvioivat sen väärennökseksi, joka oli
  ommeltu yhteen useasta eri eläimestä. — en-Wikipedia "Platypus"
- Nokkasiippa on yksi viidestä elossa olevasta kloakkieläinlajista
  (muniva nisäkäs); koiras on yksi harvoista myrkyllisistä
  nisäkkäistä, sillä sen takajalan piikki erittää kivuliaan myrkyn.
  — en-Wikipedia "Platypus"
- Nokkasiippa käyttää sähköaistimusta (electrolocation) saaliin
  paikantamiseen veden alla silmien, korvien ja sierainten ollessa
  suljettuina; eläin on kulttuurisesti merkittävä useille
  aboriginaalikansoille, jotka ovat myös perinteisesti metsästäneet
  sitä ravinnoksi. — en-Wikipedia "Platypus"

### L3 — "Maailman suurin elävän rakentama rakennelma" (Iso valliriutta, 1770)

> Kesäkuun 11. päivänä 1770 kapteeni James Cookin Endeavour ajoi
> karille matalikolle nykyisen Cooktownin eteläpuolella ja vietti
> seitsemän viikkoa korjattavana — ensimmäinen eurooppalainen kohtaaminen
> Ison valliriutan kanssa. Riutta koostuu yli 2 900 erillisestä
> koralliriutasta ja 900 saaresta yli 2 300 kilometrin matkalla, ja
> se on maailman suurin yksittäinen elävien organismien rakentama
> rakenne — niin suuri, että sen näkee avaruudesta. Yli 1 500
> kalalajia ja 30 valaslajia elää sen vesillä. 1800-luvulla riutta
> tunnettiin lähinnä laivojen haaksirikkojen kautta, sillä sen
> tieteellinen tutkimus alkoi vasta 1900-luvulla.

Faktat ja lähteet:
- Ensimmäinen eurooppalainen, joka löysi Ison valliriutan, oli James
  Cook 1770; hänen laivansa Endeavour ajoi karille matalikolle
  11.6.1770 lähellä nykyistä Cooktownia ja tarvitsi seitsemän viikkoa
  korjauksiin. — en-Wikipedia "Great Barrier Reef"
- Riutta koostuu yli 2 900 yksittäisestä riutasta ja 900 saaresta,
  ulottuu yli 2 300 km matkalle ja on maailman suurin koralliriuttajärjestelmä
  sekä suurin yksittäinen elävien organismien rakentama rakenne;
  näkyy avaruudesta. — en-Wikipedia "Great Barrier Reef"
- Riutalla elää yli 1 500 kalalajia ja 30 valaslajia (mm. humpback-
  valas); riuttaa ei juuri tutkittu tieteellisesti 1800-luvulla sen
  atollittomuuden vuoksi — tutkimus käynnistyi vasta 1900-luvulla
  (1922 Great Barrier Reef Committee). — en-Wikipedia "Great Barrier
  Reef"

### L4 — "Eläin jonka nimi tarkoittaa 'ei vettä'" (koala)

> Koala-nimi juontuu Dharug-kansan sanasta "gula", joka tarkoittaa
> "ei vettä" — eläin juo hyvin harvoin, koska se saa lähes kaiken
> tarvitsemansa nesteen syömistään eukalyptuksenlehdistä. Koala nukkuu
> jopa 20 tuntia vuorokaudesta, sillä sen ruokavalio on energiaköyhää
> ja osittain myrkyllistä useimmille muille nisäkkäille. Eurooppalaiset
> uudisasukkaat ristivät sen virheellisesti "koala-karhuksi" sen
> karhumaisen ulkonäön vuoksi, vaikka koala on pussieläin ja sen
> lähin sukulainen on vombatti, ei karhu. Sana "koala" on yksi sadoista
> aboriginaalikielten lainasanoista, jotka ovat vakiintuneet
> australianenglantiin — samaan tapaan kuin "kenguru" ja "didgeridoo".

Faktat ja lähteet:
- Sana "koala" juontuu Dharug-kielen sanasta "gula", joka tarkoittaa
  "ei vettä" ("no water"); alkuperäiskielinen nimitys omaksuttiin
  osaksi australianenglantia yhdessä satojen muiden aboriginaali-
  lainasanojen kanssa. — en-Wikipedia "Koala"
- Koala syö lähes yksinomaan eukalyptuksenlehtiä, jotka ovat
  ravintoköyhiä ja osin myrkyllisiä; eläin nukkuu jopa 20 tuntia
  vuorokaudessa. — en-Wikipedia "Koala"
- Koala on pussieläin (ei karhu), lähin elävä sukulainen on vombatti;
  eurooppalaiset uudisasukkaat kutsuivat sitä virheellisesti "koala
  bear" -nimellä karhumaisen ulkonäön vuoksi. — en-Wikipedia "Koala"

**Minitehtäväehdokas (Luonto):**
> Mikä eläin on yksi vain viidestä elossa olevasta MUNIVASTA
> nisäkäslajista maailmassa?
> Vaihtoehdot: kenguru / koala / **nokkasiippa** / dingo
> Fakta: ensimmäiset tiedemiehet, jotka näkivät säilötyn nokkasiipän
> 1799, luulivat sitä useasta eläimestä ommelluksi huijaukseksi.

*Vastaus löytyy nostosta L2. Ei osu olemassa oleviin visakysymyksiin.*

---

## 6. FAKTAPOHJA: Ruoka

**Johdanto-ehdotus:**

> Leirinuotiolla paistettu leipä, kultakenttien monikansallinen keittiö
> ja alkuperäiskansojen tuhansia vuosia tunnetut ruoka-ainekset kertovat
> yhdessä, kuinka Australian ruokakulttuuri syntyi käytännön pakosta
> ja kohtaamisista, ei yhdestä keittiöstä.

### R1 — "Leipä joka paistettiin tuhkassa" (damper)

> Damper on paksu, hapattamaton leipä, jonka karjapaimenet ja
> vaeltavat kaivosmiehet leipoivat pelkästä jauhosta, suolasta ja
> vedestä suoraan leirinuotion hiillokseen tai peltisessä
> pata-astiassa. Nimi juontuu englannin sanasta "damper" —
> "jokin joka vaimentaa nälän" — ja resepti oli käytännöllinen
> juuri siksi, ettei jauho täyttänyt paljon tilaa satulalaukussa
> toisin kuin valmis leipä. Yön yli jätetty taikina saattoi hapata
> luonnostaan bakteerien avulla, ja jotkut leipojat lisäsivät
> edellisen illan taikinaa uuteen — sama periaate kuin
> hapanjuuritaikinassa. Damperia syötiin kuivatun tai keitetyn lihan
> ja kultaisen siirapin kanssa, ja pienempinä annoksina sitä kutsuttiin
> "bush sconeiksi" tai "johnnycakeiksi".

Faktat ja lähteet:
- Damper on paksu, kotitekoinen, perinteisesti hapattamaton leipä,
  jonka australialaiset karjapaimenet valmistivat vehnäjauhosta,
  suolasta ja vedestä ja paistoivat leirinuotion hiillossa tai
  pata-astiassa. — en-Wikipedia "Damper (food)"
- Nimi juontuu englannin sanasta "damper" ("jokin, joka vie ruokahalun
  kärjen pois"); vaikutteita myös ilmauksesta "damp down" (tulen
  hillitseminen). — en-Wikipedia "Damper (food)"
- Taikina saattoi hapata yön yli luonnostaan, ja jotkut reseptit
  lisäsivät edellisen taikinan osan uuteen (hapanjuuriperiaate);
  pienempiä annoksia kutsuttiin "bush sconeiksi" tai "johnnycakeiksi".
  — en-Wikipedia "Damper (food)"

### R2 — "Käärö jota kannettiin selässä" (swagman-kulttuuri)

> "Swagman" tarkoitti kiertelevää työmiestä, joka kulki tilalta
> toiselle jalan, kaikki omaisuutensa käärittynä "swagiin" selässään.
> Sana "swag" oli brittiläisten varkaiden slangia jo 1810-luvulla
> (mm. Francis Grosen sanakirjassa 1811) ja tarkoitti tuolloin
> varastettua tavaraa; vasta 1830-luvulla merkitys siirtyi
> Australiassa tarkoittamaan rehellisen kulkumiehen kantamuksia, ja
> sana "swagman" yleistyi 1850-luvulla kultaryntäysten aikana.
> Villateollisuus oli täysin riippuvainen
> vaeltavista lampaanleikkaajista, jotka kulkivat "asemalta" toiselle,
> ja monilla lammastiloilla oli tapana tarjota ruokaa ja yösija
> kaikille ohikulkijoille, olipa työtä tarjolla tai ei — Etelä-
> Australian Canowie-tilalla tarjottiin 1900-luvun alussa yli 2 000
> ateriaa ja yösijaa vuosittain. Hahmosta tuli myöhemmin australialaisen
> kansanperinteen symboli, kun Banjo Paterson kirjoitti siitä laulun
> "Waltzing Matilda".

Faktat ja lähteet:
- "Swagman" tarkoitti kiertelevää työmiestä, joka kulki jalan tilalta
  toiselle kantaen omaisuuttaan "swagissa"; termi yleistyi 1850-luvulla
  kultaryntäysten aikana, sanan "swag" itsensä ollessa peräisin
  1810-luvun brittiläisestä varasslingosta. — en-Wikipedia "Swagman"
- Australian villateollisuus oli riippuvainen vaeltavista
  lampaanleikkaajista, jotka kulkivat swageineen "asemalta" toiselle;
  Etelä-Australian Canowie-tila tarjosi n. 1903 yli 2 000 kulkijalle
  vuosittain ruoan ja yösijan. — en-Wikipedia "Swagman"
- Hahmosta tuli kansallinen symboli Banjo Patersonin laulun "Waltzing
  Matilda" kautta (HUOM: laulu on vuodelta 1895, siis 22 vuotta isoisän
  matkan jälkeen — mainitaan vain ilmiön myöhempänä kaikuna, ei
  1873-ajan tapahtumana). — en-Wikipedia "Swagman"

### R3 — "Riisiä leirinuotiolla" (kiinalaiset kaivosmiehet ja kultakenttien keittiö)

> Kultaryntäysten kentillä eli 1850-luvulla kymmeniätuhansia
> kiinalaisia kaivosmiehiä — Victoriassa 20 000 vuoteen 1855 mennessä —
> jotka toivat omat ruokatottumuksensa mukanaan: riisiä, vihanneksia
> ja teetä siirtomaisten kaivosmiesten mutti- ja damper-painotteisen
> ruokavalion rinnalle. Melbournen Little Bourke Streetille syntyi
> kiinalaisten majataloja ja kauppoja jo 1850-luvulla, ja siitä kasvoi
> vuosikymmenten kuluessa yksi maailman pisimpään toimineista
> kiinalaiskortteleista. Kultakenttien elämä oli kiinalaisille
> kaivosmiehille usein raskasta syrjinnän ja väkivaltaisten
> mellakoiden vuoksi, mutta heidän ruokakulttuurinsa ja
> kauppaverkostonsa jäivät pysyväksi osaksi Australian kaupunkeja.

Faktat ja lähteet:
- Kultaryntäykset houkuttelivat kymmeniätuhansia kiinalaisia
  siirtomaihin 1850-luvulla; Victoriassa oli 20 000 kiinalaista
  kaivosmiestä vuoteen 1855 mennessä, ja monet asuivat majataloissa
  Melbournen Little Bourke Streetillä. — en-Wikipedia "Chinese
  Australians"
- Kiinalaiset kaivosmiehet kohtasivat väkivaltaisia mellakoita (mm.
  Buckland Riot, Lambing Flat Riots) sekä syrjiviä siirtomaalakeja;
  siitä huolimatta perustettiin pysyviä yhteisöjä ja kauppaverkostoja,
  joista kasvoivat Australian nykyiset Chinatownit (Adelaide, Brisbane,
  Melbourne, Perth, Sydney). — en-Wikipedia "Chinese Australians"
- 1860-luvulla Australiassa oli n. 40 000 Kiinasta syntyperäistä
  asukasta. — en-Wikipedia "Chinese Australians"

### R4 — "Ruoka jota siirtolaiset väheksyivät" (alkuperäiskansojen ruoka-aineet)

> Alkuperäiskansat olivat tunteneet mantereen syötävät kasvit, hedelmät
> ja eläimet — kuten kengurun, hunajamuurahaisen, quandong-hedelmän ja
> makadamiapähkinän — tuhansia vuosia ennen eurooppalaisten saapumista,
> ja tämä tieto auttoi monia siirtomaan uudisasukkaita selviytymään,
> kun omat viljelykasvit epäonnistuivat ankarassa ilmastossa. Silti
> useimmat 1800-luvun siirtolaiset pitivät alkuperäisruokia
> vähäarvoisina verrattuna kotimaansa tuttuihin ruokiin, ja niiden
> laajempi käyttö jäi vuosikymmeniksi marginaaliin. Makadamiapähkinä on
> ainoa australialainen alkuperäiskasvi, josta kehittyi laajamittainen
> vientituote — mutta vasta 1880-luvulla, ja sekin lopulta suurimmaksi
> osaksi Havaijilla, ei Australiassa.

Faktat ja lähteet:
- Alkuperäiskansojen ruokakasvit ja -eläimet tarjosivat ravintoa myös
  ei-alkuperäisille siirtomaan asukkaille, mutta useimmat siirtomaan
  uudisasukkaat pitivät niitä huonompina verrattuna tuttuihin kotimaan
  ruokiin. — en-Wikipedia "Bush tucker"
- Makadamiapähkinä oli ainoa australialainen alkuperäiskasvi, joka
  kehittyi laajamittaiseen kaupalliseen viljelyyn — ensimmäinen
  pienimuotoinen kaupallinen viljelmä perustettiin Australiassa
  1880-luvulla, mutta pähkinä kehittyi suuren mittakaavan tuotteeksi
  lopulta Havaijilla. — en-Wikipedia "Bush tucker"
- Esimerkkejä alkuperäisruoka-aineista: quandong-hedelmä, kutjera,
  sitruunamyrtti (mauste), warrigal-vihannekset, bunya-pähkinä ja
  witchetty-toukat. — en-Wikipedia "Bush tucker"

**Minitehtäväehdokas (Ruoka):**
> Mistä sanasta "damper"-leivän nimi juontuu?
> Vaihtoehdot: paikkakunnan nimestä / **"jokin joka vie ruokahalun
> kärjen"** / leipojan sukunimestä / aboriginaalikielestä
> Fakta: leipä paistettiin nuotion hiillokseen jauhosta, suolasta ja
> vedestä, ja se oli tarkoituksella yksinkertaista matkaruokaa.

*Vastaus löytyy nostosta R1. Ei osu olemassa oleviin visakysymyksiin.*

---

## 7. Maan intro (~6 virkettä, `wiki`-avain "Australia")

Ei olemassaolevaa `oceania-artikkelit.js`-tiedostoa vielä (ks. luku 11,
avoin kysymys B) — teksti alla on ainesehdotus sille kohtaan, kun
tiedosto perustetaan `africa-artikkelit.js`/`northamerica-artikkelit.js`-
mallin mukaan (ks. faktapohja-usa.md, osio 7, sama avoin rakenne-kysymys
siellä — Fable päätti tuolloin, että kirjoittaja perustaa tiedoston
mantereen omalla nimellä).

> Vuonna 1873 Australia ei ole vielä yksi maa vaan kuusi erillistä
> brittisiirtokuntaa, joita yhdistää vain juuri valmistunut
> mannertenvälinen lennätinlinja — sekin on toiminut reaaliaikaisesti
> muuhun maailmaan vasta vuoden verran.
>
> Aboriginaalikansat ovat asuttaneet mannerta jo vähintään 65 000
> vuotta, ja heidän tähtitietonsa ja maanhoitonsa ovat yhä eläviä
> perinteitä, kun taas rangaistusvankien laivat ovat lakanneet
> saapumasta vasta viisi vuotta sitten. Kultaryntäykset ovat
> kaksinkertaistaneet väestön kymmenessä vuodessa ja tehneet
> Melbournesta siirtokuntien rikkaimman kaupungin, kun taas hienovillaiset
> lampaat ovat nostaneet Australian maailman suurimmaksi villantuottajaksi.
> Mantereen eläimistö — kenguru, nokkasiippa, koala — on niin
> ainutlaatuista, että ensimmäiset eurooppalaiset tiedemiehet epäilivät
> osan olevan huijauksia. Kultakenttien ruokapöydässä kohtaavat
> englantilainen damper-leipä, kiinalaisten kaivosmiesten riisi ja
> alkuperäiskansojen tuhansia vuosia tunnetut villiruoat. Isoisän
> matkapäiväkirja saapuu mantereelle juuri sinä hetkenä, kun sen kuusi
> osaa ovat vasta löytämässä toisiaan.

(n. 950 merkkiä — pituusluokka vastaa USA:n `intro`-kentän mittaa,
ks. faktapohja-usa.md osio 7.)

---

## 8. Kuvaehdokkaiden kategorialistaus (Commonsista)

**HUOM (päivitetty korjauskierroksella 23.8.2026): riippumaton
tarkistus (docs/mantereet-tyoaineisto/tarkistus-australia.md, luku 8)
teki pistokokeen `prop=categoryinfo`-kutsuilla ja vahvisti seuraavat
todelliset tiedostomäärät — nämä eivät ole enää hakuapuvinkkejä vaan
VAHVISTETTUJA. Loput kategoriat (merkitty "EI TARKISTETTU" alla) jäivät
Commonsin 429-rajoituksen taakse jo kahdella peräkkäisellä
tarkistuskierroksella (koostaja 23.8. ja tarkistaja 23.8.) — seuraavan
kirjoittajan on silti tehtävä niille oma `prop=categoryinfo`-kierros
ennen käyttöä, nukkuen 5–6 s hakujen välissä (lehtityö-resepti.md).**

**Vahvistetut tiedostomäärät (tarkistus-australia.md, luku 8):**

| Kategoria | Tiedostoja | Huomio |
|---|---|---|
| `Category:Uluru` | 543 | Vahva |
| `Category:First Fleet` | 51 | Käyttökelpoinen |
| `Category:Convicts in Australia` | 29 | Käyttökelpoinen mutta ohut |
| `Category:Great Barrier Reef` | 125 | Käyttökelpoinen |
| `Category:Eureka Stockade` | 30 | KORJATTU NIMI — ks. alla |
| `Category:Australian Overland Telegraph Line` | 24 | Ohut |
| `Category:Swagmen` | 30 | Käyttökelpoinen |
| `Category:Kangaroos` | 22 suoraan + 14 alakategoriaa | Hae myös alakategorioista |
| `Category:Platypus` | 5 suoraan + 16 alakategoriaa | Hae myös alakategorioista |
| `Category:Koalas` | **0 (tyhjä säiliökategoria)** | VÄÄRÄ valinta sellaisenaan — ks. alla |
| `Category:Chinese Australians` | **0 (tyhjä säiliökategoria)** | VÄÄRÄ valinta sellaisenaan — ks. alla |

- H1/H2 Vankisiirtolaisuus → `Category:Convicts in Australia` (29
  tiedostoa), `Category:First Fleet` (51 tiedostoa)
- H3 Eureka-kapina → **EI `Category:Eureka Rebellion` (ei ole
  olemassa Commonsissa) vaan `Category:Eureka Stockade` (30
  tiedostoa, vahvistettu)** — aiempi versio tästä faktapohjasta
  ehdotti väärää kategorianimeä
- H4 Raideleveys/rautatiet → `Category:Rail transport in Australia`,
  `Category:Break of gauge` — EI TARKISTETTU
- A2 Tähtitiede → `Category:Australian Aboriginal astronomy` tai
  hakusana "Emu in the sky" — EI TARKISTETTU
- A3 Kulttuuripoltot → `Category:Cultural burning` tai "fire-stick
  farming Australia" — EI TARKISTETTU
- A4 Uluru → `Category:Uluru` (543 tiedostoa, vahvistettu) — MUISTA
  spec-mantereet.md:n rajoite: VAIN ulkopuolelta, EI kiipeäjäkuvia.
  Petroglyfikuva ("Uluru petroglyphs") kelpaa, mutta tarkista ettei
  kuva riko valokuvausrajoituksia (Uluru-artikkeli mainitsee, ettei
  tiettyjä alueita saa kuvata Tjukurpa-uskomusten vuoksi — turvallisinta
  on käyttää yleiskuvaa kalliosta ulkopuolelta).
- T1 Kultaryntäys → `Category:Australian gold rushes`,
  `Category:Victorian gold rush` — EI TARKISTETTU
- T2 Villateollisuus/lampaat → `Category:Sheep shearing in Australia`,
  `Category:Merino` — EI TARKISTETTU
- T3 Lennätinlinja → `Category:Australian Overland Telegraph Line`
  (24 tiedostoa, vahvistettu — ohut; vara: hae myös "Charles Todd
  telegraph" tai "Frews Ponds")
- L1 Kenguru → `Category:Kangaroos` (22 tiedostoa suoraan +
  14 alakategoriaa, vahvistettu — hae myös alakategorioista, esim.
  lajinimillä)
- L2 Nokkasiippa → `Category:Platypus` (5 tiedostoa suoraan +
  16 alakategoriaa, vahvistettu — hae myös alakategorioista)
- L3 Iso valliriutta → `Category:Great Barrier Reef` (125 tiedostoa,
  vahvistettu)
- L4 Koala → **EI `Category:Koalas` sellaisenaan — vahvistettu TYHJÄ
  säiliökategoria (0 tiedostoa).** Hae sen sijaan lajinimellä
  `Phascolarctos cinereus` tai koalojen alakategorioista — EI VIELÄ
  TARKISTETTU mikä alakategoria toimii
- R1 Damper → hae "damper bread Australia" tai "camp oven Australia"
  (ei omaa Commons-kategoriaa löytynyt) — EI TARKISTETTU
- R2 Swagman → `Category:Swagmen` (30 tiedostoa, vahvistettu) tai hae
  "Down on His Luck McCubbin" (Frederick McCubbinin 1889 maalaus on
  tunnettu PD-teos aiheesta)
- R3 Kiinalaiset kultakentillä → **EI `Category:Chinese Australians`
  sellaisenaan — vahvistettu TYHJÄ säiliökategoria (0 tiedostoa).**
  Hae sen sijaan `Category:History of Chinese Australians` tai
  hakusanalla "Chinese diggers goldfields Victoria" — EI VIELÄ
  TARKISTETTU mikä kategoria toimii
- R4 Alkuperäisruoka → `Category:Bushfood` tai hae yksittäisiä kasveja
  ("quandong", "macadamia") — EI TARKISTETTU

**MAAKARTAT-nosto (relief-karttaan liitettävä yksittäiskuva, ks.
luku 9):** ehdotan Ison valliriutan ilmakuvaa tai Uluru-yleiskuvaa
ulkopuolelta — molemmat todennäköisesti Commonsissa runsaina.

---

## 9. MAAKARTAT-rivin tarve — TEKNINEN AVOIN KYSYMYS (kevyt, ei tutkittu loppuun)

AUS:lla EI ole vielä riviä `js/packs/maakartat.js`:n `MAAKARTAT`-taulussa
(tarkistettu `grep`illä 23.8.2026, sama tilanne kuin USA:lla oli
faktapohja-usa.md:tä kirjoitettaessa). Toisin kuin USA:lla, Australian
pelin kaikki 19 kaupunkia/kohdetta ovat mantereella itsellään (ei
erillisiä saaria kuten Havaiji/Alaska USA:lla) — Tasmania (Hobart)
on ainoa saari, mutta se on lähellä mannerta ja mahtuu useimpiin
Australia-relief-karttoihin ilman erillistä sivukuvaa. Tämä VIITTAA
siihen, ettei Australia todennäköisesti tarvitse RUS/USA:n kaltaista
erikoisprojektiohaaraa — tavallinen tasavälinen (equirectangular)
korkokartta riittänee — MUTTA tätä EI ole vahvistettu Commonsista
tässä koosteessa (rajapinnan 429-ongelmien vuoksi). Seuraavan
kirjoittajan pitää hakea Commonsista esim. "Australia relief location
map" ja tarkistaa projektiotyyppi kuvaussivulta ennen käyttöä —
sama sudenkuoppa kuin USA:lla ja Venäjällä oli mahdollinen.

**Ehdotetut 5 kaupunkia (jos/kun rivi tehdään), näyttämään mantereen
laajuuden:**

| Nimi | Lat | Lon | Huom |
|---|---|---|---|
| Sydney | -33,8688 | 151,2093 | `paa: true` — pelin ensimmäinen Australian kaupunki, `start: true` |
| Perth | -31,9523 | 115,8613 | Länsirannikko, myös `start: true`, maailman eristyneimpiä suurkaupunkeja |
| Darwin | -12,4634 | 130,8456 | Pohjoinen, lennätinlinjan pohjoispää (ks. T3-nosto) |
| Alice Springs | -23,6980 | 133,8807 | Keskusta, lähellä Ulurua (ks. A4-nosto) |
| Hobart | -42,8821 | 147,3272 | Tasmania, eteläisin kaupunki, näyttää saaren |

(Koordinaatit omia hakuja, ei erikseen Wikipedia-viitattu — tarkista
ennen käyttöä samalla tavalla kuin USA-koosteessa suositeltiin.)

---

## 10. 1873-kulma koottuna

Poikkeuksellisen moni Australia-fakta osuu tarkalleen tai lähes
tarkalleen vuoteen 1873:

- **Täsmälleen 1873 (19.7.):** William Gosse nimeää Uluru/Ayers Rockin
  (A4).
- **Yksi vuosi ennen (1872):** mannertenvälinen lennätinlinja valmistuu
  ja yhdistää Australian reaaliaikaisesti maailmaan (T3); Ernest Giles
  näkee Kata Tjutan.
- **1870-luku laajemmin:** Australiasta tulee maailman suurin
  villantuottaja (T2).
- **Viisi vuotta ennen (1868):** viimeinen vankilaiva Hougoumont
  saapuu Fremantleen, rangaistussiirtolakausi päättyy (H2).
- **19 vuotta ennen (1854):** Eureka-kapina Ballaratissa (H3).
- **22 vuotta ennen (1851):** ensimmäiset suuret kultalöydöt
  käynnistävät kultaryntäyksen (T1).
- **103 vuotta ennen (1770):** Cookin Endeavour tapaa kengurun ja
  ajaa karille Isolla valliriutalla samalla rannikon pätkällä (L1, L3).
- **74 vuotta ennen (1799):** nokkasiippa luullaan tiedemiesten
  toimesta huijaukseksi (L2).
- **Koko peliajan taustalla, ei vuosilukua:** aboriginaalikansojen
  vähintään 65 000 vuoden yhtäjaksoinen kulttuuri (A1, A2, A3) —
  ajallisesti mittaamattomasti suurin konteksti koko maalehdellä.

Historia-aiheen H4 (kuusi siirtokuntaa, ei vielä liittovaltiota) on
poikkeuksellisen vahva 1873-kulma, koska se ei ole yksittäinen
tapahtuma vaan koko ajanjakson POLIITTINEN TILA — samaan tapaan kuin
USA-koosteen huomio siitä, että "tasavalta ei ole vielä satavuotias".

---

## 11. Avoimet kysymykset

**A. Ulurun oma kaupunkivisa VS. Alkuperäiskansat-sivun A4-nosto —
tarkoituksellinen päällekkäisyys, EI ratkaistu tässä.** Uluru-kaupungin
oma kulttuurivisa (`js/packs/oceania-questions.js`, rivit 388–437)
kysyy jo suoraan: mikä Uluru on, millä nimellä se tunnettiin ("Ayers
Rock", "nimi annettiin 1873 Etelä-Australian silloisen pääministerin
mukaan" — HUOM: visan hint-teksti sanoo "pääministerin", mutta
Wikipedia-lähteen mukaan Henry Ayers oli tarkkaan ottaen "Chief
Secretary of South Australia", ei pääministeri; tämä pieni
epätarkkuus jo pelissä ei kuulu tämän koosteen korjattavaksi, mutta
Fablen kannattaa tietää siitä), korkeus tasangolta ja kiipeämiskielto
2019. Koska maa-aiheiden A4-nosto käsittelee TÄSMÄLLEEN samat faktat
laajemmin (Anangu-kansan side paikkaan, maanomistuksen palautus 1985),
päällekkäisyys ei ole virhe vaan tarkoituksellinen kertaus eri
kohdassa peliä — mutta Fablen pistokoetarkistuksessa kannattaa
varmistaa, ettei sävy tunnu toistolta pelaajalle joka lukee sekä
Uluru-kaupungin että Australian maalehden samalla pelikerralla.
Minitehtävä A4-sivulle valittiin siksi tarkoituksella eri aiheesta
(tähtitiede, ei Uluru).

**B. `oceania-artikkelit.js` puuttuu kokonaan**, samoin kuin
`northamerica-artikkelit.js` puuttui USA-koostetta kirjoitettaessa
(ks. faktapohja-usa.md, avoin kysymys A). Maan intro (luku 7) tarvitsee
kotipaikan.

**C. MAAKARTAT-projektio-ongelma (luku 9)** on tässä koosteessa
kevyemmin tutkittu kuin USA:lla — päättely viittaa siihen, ettei
Australia todennäköisesti tarvitse erikoisprojektiohaaraa (kaikki
kaupungit mantereella tai lähisaarella), mutta tätä EI ole vahvistettu
Commonsista API:n 429-ongelmien vuoksi. Tarkistettava ennen
lukkoonlyöntiä.

**D. Aihevalinta (5/5) on ehdotus, ei lukittu.** "Talous"-aiheen
neljäs nosto (T4) jäi auki tässä koosteessa (ks. luvun 4 T4/T4b-kohta) —
Eureka-kapinan taloudelliset juuret olisivat luonteva neljäs nosto,
mutta sisältö on jo H3:ssa Historia-sivulla; ehdotan joko laajempaa
Bendigo/Ballarat-arkinostoa (ei vielä faktatarkistettu) tai T1/T2:n
laajentamista. Vaihtoehtoisesti "Urheilu" (australialainen jalkapallo,
kehittyi 1850-luvulla — mainittu jo Melbournen omassa visassa) voisi
korvata koko Talous-aiheen neljännellä nostolla tai omana kuudentena
aiheena, jos maalehti.md:n 5-aiheraja halutaan venyttää — tämä on
Fablen/Opuksen päätös.

**E. Sisältökuri: alkuperäiskansojen kohtalo ja Stolen Generations.**
Tässä koosteessa PÄÄTETTIIN olla nostamatta Stolen Generations
-aihetta (sukupolvien pakkoerottaminen) omaksi nostokseen, vaikka
spec-mantereet.md mainitsee sen esimerkkinä hienotunteisesti
kerrottavasta historiasta. Perustelu: tapahtumat (pahimmillaan
1910–1970) ovat kaukana isoisän 1873-matkasta eivätkä sovi luontevasti
mihinkään neljästä valitusta nostosta ilman anakronismia. Jos Fable
haluaa aiheen mukaan, ehdotan sitä pikemminkin Historia-sivun
johdantoon lyhyenä mainintana ("myöhempinä vuosikymmeninä...") kuin
omaksi nostoksi — tätä EI ratkaista tässä koosteessa.

**F. Kuvahaku kesken lähes kokonaan (luku 8).** Commonsin
rajapinnan 429-ongelma katkaisi haun heti alkuvaiheessa, joten kaikki
kategoriat luvussa 8 ovat vahvistamattomia hakuvinkkejä — toisin kuin
USA-koosteessa, jossa suurin osa kategorioista oli jo vahvistettu.
Seuraava kirjoittaja tarvitsee kokonaisen kuvahaku-kierroksen
lehtityö-resepti.md:n mukaisesti (5–6 s tauko hakujen välissä).

**G. R2:n "Waltzing Matilda" -anakronismi.** Swagman-nosto (R2)
mainitsee laulun "Waltzing Matilda" (1895) kansanperinteen kaikuna,
vaikka se on 22 vuotta isoisän matkan jälkeen. Teksti on kirjoitettu
niin, että anakronismi on selvästi merkitty ("myöhemmin"), samaan
tapaan kuin USA-koosteen H2 mainitsi Philadelphian 1876-näyttelyn
tulevana tapahtumana. Fablen kannattaa vahvistaa, että tämä muotoilu
on hyväksyttävä rajaus.

---

## 12. Korjaushistoria

**23.8.2026, Sonnet-faktakoostaja, korjauskierros riippumattoman
tarkistuksen (docs/mantereet-tyoaineisto/tarkistus-australia.md,
tuomio "KELPAA KORJAUKSIN") löydösten pohjalta. Kaikki korjaukset
tarkistettu itse uudelleen en-Wikipediasta ja Commonsista
(`action=raw`/`prop=categoryinfo`, `NODE_USE_ENV_PROXY=1`-vastine
curlilla proxyn kautta) ennen tallennusta:**

1. **H3 (Eureka-kapina) — korjattu VIRHE.** Nostoteksti ja faktarivit
   muutettu "noin 1 500 hallituksen sotilasta ja poliisia" → "kapteeni
   Thomasin komentama 276 hengen yhdistetty sotilas- ja poliisijoukko".
   Itse vahvistettu en-Wikipedia "Eureka Rebellion" -raakatekstistä:
   "the combined military police formation of 276 men under the
   command of Captain Thomas". Luku 1 500 on eri asia (kapinallisten
   varuskunnan enimmäisvahvuus) — selitetty faktariveissä, ettei
   sekaannus toistu.
2. **R2 (Swagman) — korjattu VIRHE.** Nostoteksti muutettu erottamaan
   sanan "swag" alkuperä (1810-luvun brittiläinen varassleng, mm.
   Grosen sanakirja 1811) sen australialaisesta
   merkityksensiirtymästä kulkurin varustesanaksi (1830-luku).
   Itse vahvistettu en-Wikipedia "Swagman" -raakatekstistä: "In the
   early 1800s, the term swag was used by British thieves..." ja "By
   the 1830s, the term in Australia had transferred from meaning
   goods acquired by a thief to the possessions... carried by a
   bushman." Faktarivit olivat jo alun perin oikein — vain nostoteksti
   oli ristiriidassa niiden kanssa.
3. **H1 (First Fleet) — korjattu VAROITUS.** "yhdeksän kuukauden
   purjehduksen" → "kahdeksan kuukauden purjehduksen". Itse
   vahvistettu en-Wikipedia "First Fleet" -raakatekstistä: lähti
   Portsmouthista 13.5.1787, saapui Botany Bayhin 18.1.1788, "over
   250 days" — n. 8 kk 5 pv, ei 9 kk. Faktarivi täsmennetty samalla.
4. **Osio 8 (kuvakategoriat) — korjattu VAROITUS.** `Category:Eureka
   Rebellion` (ei ole olemassa Commonsissa) korvattu oikealla nimellä
   `Category:Eureka Stockade` (30 tiedostoa). Lisätty taulukko
   riippumattoman tarkistuksen vahvistamista tiedostomääristä
   (Uluru 543, First Fleet 51, Convicts in Australia 29, Great
   Barrier Reef 125, Overland Telegraph Line 24, Swagmen 30,
   Kangaroos 22+14 alakat., Platypus 5+16 alakat.).
   `Category:Koalas` ja `Category:Chinese Australians` merkitty
   vahvistetuiksi TYHJIKSI säiliökategorioiksi (0 tiedostoa) — itse
   uudelleenvarmistettu `prop=categoryinfo`-kutsulla Commonsista
   23.8.2026 (Chinese Australians: `"categoryinfo":{"size":0,...}`;
   Koalas ei ehditty uudelleenvarmistaa oman istunnon 429-rajoituksen
   vuoksi, mutta tarkistus-australia.md:n löydös hyväksytty
   sellaisenaan, koska se on riippumaton ja yksiselitteinen). Loput
   kategoriat merkitty selvästi "EI TARKISTETTU" siihen asti, kunnes
   seuraava kirjoittaja tekee täyden kuvahakukierroksen.

Kaikki muu sisältö (Alkuperäiskansat-, Talous-, Luonto- ja
Ruoka-osiot, maan intro, 1873-kulman kooste) jätetty koskemattomaksi —
riippumaton tarkistus vahvisti ne oikeiksi eikä tämä korjauskierros
laajentanut tarkistusta niiden ulkopuolelle.
