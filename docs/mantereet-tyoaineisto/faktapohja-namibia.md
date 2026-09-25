# Namibia-maalehti (ISO-3: NAM) — lyhyt faktapohja

*Koonnut Opus-lehtiagentti 6.9.2026. Kaikki faktat haettu samana päivänä
en-Wikipediasta: ensisijaisesti raakatekstinä
(`api.php?action=query&prop=extracts&explaintext=1`, `NODE_USE_ENV_PROXY=1`),
ja niiden artikkelien osalta, joissa rajapinta vastasi "too many requests"
(parvessa oli monta agenttia yhtä aikaa), saman artikkelin wikitekstinä
(`index.php?action=raw`) — lähde on molemmissa sama artikkeli ja sama
päivä. Lyhyt faktapohja: vain ne luvut, päiväykset ja nimet, jotka
päätyivät `js/packs/maa-kategoriat.js`:n NAM-lohkoon, sekä ristiriidat.
Rakenteen sitova lähde docs/moduulit/maalehti.md.*

Aiheet (5 × 4 nostoa): **Historia, Luonto, Ruoka, Tiede, Kuvataide.**
Minitehtävä on Luonto-sivulla (welwitschian kaksi lehteä).

**Rajaus.** Namibiassa ei ole kaupunkilehteä: laudan ainoa Namibian
kaupunki on `namib`, eikä sillä ole `KULTTUURI_KATEGORIAT`-lohkoa.
Karttanostot rajaavat sen sijaan paljon. `js/packs/maastokohteet-nam.js`
kattaa Brandbergin, Atlantin, Oranjejoen, Spitzkoppen (myös sen
kalliomaalaukset), Kolmanskopin (timanttilöytö 1908, Sperrgebiet),
Fish Riverin kanjonin, Etoshan, Sossusvlein, Swakopmundin (saksalainen
siirtomaa-arkkitehtuuri), Hoban meteoriitin ja Cape Crossin (Diogo Cão).
`js/packs/skandaalit.js` kattaa Waterbergin taistelun 1904 ja sen
seuraukset sekä Caprivin kaistaleen ja Helgoland–Sansibar-sopimuksen
1890; `js/packs/elaintakyt.js` erämaanorsun. **Maalehti ei koske
yhteenkään näistä** — siksi historiaosiossa ei ole timantteja,
Swakopmundia, saksalaista siirtomaakautta eikä Caprivia, luonto-osiossa
ei norsuja, Etoshaa eikä Sossusvlein dyynejä, ja kuvataideosiossa
kalliotaide on Twyfelfonteinissa ja Apollo 11 -luolassa, ei
Spitzkoppessa eikä Brandbergissä (Valkoinen nainen jätettiin pois,
koska Brandberg on karttakohde).

**Herkät aiheet.** Vuosien 1904–08 herero- ja namakansanmurha on
skandaalikortin aihe, eikä maalehti kerro sitä uudelleen; hererojen
pukua käsittelevästä nostosta on jätetty pois sotasaaliiksi saatujen
univormujen tarina samasta syystä. Itsenäisyysnostossa kerrotaan nimen
valinta, YK:n päätökset ja itsenäistymispäivä, ei vapaussodan
sotatoimia. Nykypolitiikka (vaalit, maareformi, Saksan korvaukset)
on jätetty kokonaan pois.

## 1. Historia

- **Jonker Afrikaner ja Windhoek** (en-Wikipedia "Jonker Afrikaner",
  johdanto; "Windhoek", osiot "Etymology" ja "Early settlement"):
  Jonker Afrikaner (**3.2.1785 – 18.8.1861**) oli oorlamien neljäs
  kapteeni **vuodesta 1823**; hän lähti isänsä asuinsijoilta kolmen
  veljensä ja **noin 300 seuraajan** kanssa pohjoiseen, ja **1825
  alkaen** hänen neuvostonsa hallitsi tosiasiallisesti Damaramaata ja
  Namamaata. **Noin 1840** hän perusti asutuksen Windhoekiin kuuman
  lähteen äärelle nykyisen **Klein Windhoekin** kaupunginosaan ja
  rakensi kivikirkon, johon mahtui **500 ihmistä** (Jonker
  Afrikaner -artikkeli sanoo seurakunnan olleen 500–600 henkeä).
  Nimi Windhoek on hänen antamansa; se on joko afrikaansia
  ("tuulinen kulma") tai muisto **Winterhoekin** vuorista Tulbaghin
  luona, ja **ensimmäinen tunnettu maininta** on hänen kirjeessään
  Joseph Tindallille **12.8.1844**. Reinin lähetysseuran
  **Carl Hugo Hahn ja Franz Heinrich Kleinschmidt** aloittivat työn
  Windhoekissa **loppuvuodesta 1842** Jonker Afrikanerin kutsusta;
  kaksi vuotta myöhemmin wesleyläiset Richard Haddy ja Joseph Tindall
  ajoivat heidät pois. **1850** valmistui tie Otjimbingwen kautta
  **Walvis Baylle** (Alter Baiweg). Hahn arvioi **1852**, että
  Jonkerin valtapiirissä oli 1 500 oorlamia, 2 000 hereroa ja 2 000
  damaraa. Sodat tuhosivat asutuksen: **kesäkuussa 1885** sveitsiläinen
  kasvitieteilijä löysi paikalta enää sakaaleja ja nälkiintyneitä
  helmikanoja hoitamattomien hedelmäpuiden seasta, ja kaupunki
  perustettiin toisen kerran **1890**. Kaupungin muut nimet ovat
  **ǀAi-ǁGams** (nama) ja **Otjomuise** (herero); väkiluku
  **486 186 (2023)**.
- **Suomalaiset Ambomaalla** (en-Wikipedia "Namibia", osio
  "Pre-colonial period" ja "Religion"; "Martti Rautanen"):
  *"In 1870, Finnish missionaries came to the northern part of Namibia
  to spread the Lutheran religion among the Owambo and Kavango
  people."* **Martti Rautanen** (10.11.1845 Inkeri – 19.10.1926
  Olukonda) lähti Suomesta **24.6.1868** neljän työtoverin kanssa,
  saapui Hereromaahan **huhtikuussa 1869** ja Ambomaalle **heinäkuussa
  1870**; ensimmäinen asema perustettiin samana vuonna **Omandongoon**
  ja siirrettiin seuraavana vuonna **Olukondaan**. Rautanen toimi
  Ambomaalla **yli 50 vuotta**, johti **1880** perustettua Olukondan
  asemaa, julkaisi **1892** virsikirjan **ndongaksi** ja aloitti
  Raamatun kääntämisen **oshindongaksi**; ensimmäiset paikalliset
  pastorit vihittiin **1925**. Hän teki säähavaintoja ja keräsi
  kasveja sveitsiläisen kasvitieteilijän **Hans Schinzin** vierailun
  (1885–86) innoittamana, ja Schinz nimesi hänen mukaansa suvun
  **Neorautanenia**; etnografinen kokoelma on **Suomen
  kansallismuseossa** ja päiväkirjat Turun yliopistossa. Lempinimi
  **Nakambale** tulee sanasta *okambale*, pieni kori, jollaiselta
  hänen kalottinsa näytti; nimi on hänen hautakivessään, ja perheen
  koti Olukondassa on nyt **Nakambale-museo**. Hän avioitui **1872**
  lähetyssaarnaaja Franz Heinrich Kleinschmidtin tyttären **Frieda
  Kleinschmidtin** kanssa; yhdeksästä lapsesta moni kuoli
  malariaan. Namibian kristityistä valtaosa on luterilaisia, mitä
  artikkeli pitää **saksalaisen ja suomalaisen lähetystyön perintönä**.
- **Walvis Bay** (en-Wikipedia "Walvis Bay", johdanto ja osio
  "History"): rannikon **ainoa luonnon syväsatama**, jota suojaa
  **Pelican Pointin** hiekkasärkkä. **Bartolomeu Dias** ankkuroi
  lahteen **8.12.1487** ja nimesi sen *O Golfo de Santa Maria da
  Conceição*, mutta Portugali ei vaatinut aluetta itselleen.
  Britannia otti sataman haltuunsa: **1878** ensiaskeleet ja **1884**
  Kapkolonian liittäminen yhdessä **Pingviinisaarten** kanssa, kun
  ympäröivä maa oli Saksan. **1910** Walvis Baysta tuli Etelä-Afrikan
  unionin eksklaavi; rajakiista Saksan kanssa ratkaistiin **1911**,
  pinta-alaksi **1 124 km²**. Hallinto siirrettiin Lounais-Afrikalle
  **1922** ja takaisin Kapmaalle **1977**, jolloin siitä tuli jälleen
  eksklaavi. YK:n turvallisuusneuvoston päätöslauselma **432 (1978)**
  vaati sataman palauttamista. Namibia itsenäistyi **1990**, mutta
  Walvis Bay pysyi Etelä-Afrikan hallussa; **1992** perustettiin
  yhteinen väliaikaishallinto ja **1.3.1994** Etelä-Afrikka luovutti
  Walvis Bayn ja Pingviinisaaret Namibialle.
- **Nimi ja itsenäisyys** (en-Wikipedia "Namibia", osiot "Etymology",
  "Independence" ja johdanto): nimi tulee **Namibin aavikosta**, ja
  sana *namib* on **khoikieltä**, "avara paikka". Nimen ehdotti
  **Mburumba Kerina**, joka esitti alun perin muotoa "Republic of
  Namib". YK:n yleiskokous antoi **12.6.1968** päätöslauselman, jolla
  Lounais-Afrikka nimettiin **Namibiaksi**, ja turvallisuusneuvoston
  päätöslauselma **269 (elokuu 1969)** julisti Etelä-Afrikan
  hallinnan laittomaksi. Perustuslaki hyväksyttiin **helmikuussa
  1990**, ja maa itsenäistyi **21.3.1990**. **Sam Nujoma** vannoi
  presidentin valan tilaisuudessa, jossa olivat läsnä **Nelson
  Mandela** (vapautunut vankilasta edellisenä kuukautena) ja
  **147 maan** edustajat, joukossa 20 valtionpäämiestä. Ensimmäisissä
  vaaleissa äänesti **yli 97 %** äänioikeutetuista, ja UNTAG:n
  valvonnassa palasi **42 000 pakolaista**.

## 2. Luonto

- **Welwitschia** (en-Wikipedia "Welwitschia", johdanto sekä osiot
  "Taxonomy", "Description", "Distribution and habitat" ja
  "Cultivation"): kasvilla on **vain kaksi pysyvää lehteä**, jotka
  kasvavat koko sen elämän ajan ja voivat venyä **4 metriin**;
  lehdet repeytyvät ajan mittaan nauhoiksi. Puinen kanta eli kruunu
  levenee **metriin** asti; suurin tunnettu yksilö on **2,77 m**
  läpimitaltaan ja **8,7 m** ympärysmitaltaan, ja vanhimmat ovat
  ehkä **2 000-vuotiaita**. **Friedrich Welwitsch** dokumentoi kasvin
  Angolassa **1859** ja kirjoitti voineensa vain polvistua sen ääreen
  peläten, että kosketus paljastaisi sen mielikuvituksen tuotteeksi;
  hän ehdotti sukunimeksi paikallista **Tumboa**, mutta **Joseph
  Dalton Hooker** nimesi suvun hänen mukaansa. Afrikaansiksi kasvi on
  **tweeblaarkanniedood** ("kaksi lehteä, ei voi kuolla"), namaksi
  *kharos*, damaraksi *nyanka*, hereroksi **onyanga**, "aavikon
  sipuli"; se on **Namibian vaakunassa** dyynin päällä. Laji on
  Namibin **endeeminen**, levinneisyys yli **1 000 km** Angolan ja
  Namibian rannikkoa; se on kaksikotinen, ja kävyt tuottavat mettä,
  joka houkuttelee kärpäsiä. Paikalliset syövät joskus kävyn raakana
  tai kuumassa tuhkassa paistettuna.
- **Keijukehät** (en-Wikipedia "Fairy circle (arid grass formation)",
  johdanto sekä osiot "Location", "Description", "Formation
  hypotheses", "Myths" ja "Use"): paljaita ympyröitä **2–12 metriä**
  halkaisijaltaan, reunallaan rehevämpi heinäkehä; ne elävät
  **30–60 vuotta**. Vyöhyke kulkee noin **160 km sisämaassa** ja
  ulottuu Angolasta **2 400 kilometriä** etelään. Ensimmäiset
  maininnat tieteellisessä kirjallisuudessa ovat **1920-luvulta**.
  Kaksi selitysperhettä: **hiekkatermiitti** *Psammotermes allocerus*
  (Juergens 2013) ja **kasvillisuuden itseorganisoituminen**
  (Cramer & Barger 2013, Getzin ym. 2014). **2022** kaivauksissa
  todettiin, että kehien sisällä heinät kuolivat **vedenpuutteeseen**
  eivätkä termiittien juuriston syöntiin, ja **helmikuun 2025**
  katsausartikkelissa Cramer ja Tschinkel pitävät itseorganisoitumista
  ainoana kaikkiin havaintoihin sopivana selityksenä. **Himbojen**
  suullisessa perinteessä kehät ovat esi-isä **Mukurun** työtä tai
  jumalien jalanjälkiä; opaskertomuksissa esiintyy myös maanalainen
  lohikäärme. Himbat käyttävät kehiä laitumina ja rakentavat niiden
  ympärille tilapäisiä puuaitoja vasikoiden yösuojaksi.
- **Sumua juova kuoriainen** (en-Wikipedia "Onymacris unguicularis",
  johdanto sekä osiot "Habitat", "Behaviour" ja "Physiology"):
  *fog-basking* havaittiin ensi kerran **1976**. Yön sumussa
  kuoriainen kaivautuu esiin, kiipeää dyynin suojanpuoleiselle
  rinteelle ja asettuu **noin 23 asteen** kulmaan pää alaspäin
  tuulta vasten; vesi tiivistyy peitinsiipiin ja valuu suuhun.
  Yksilö voi saada kerralla **34 % ruumiinpainostaan** vettä.
  Namibiin sataa **alle 50 mm** vuodessa, läntisimmässä osassa
  **0–12 mm**. Käyttäytyminen tunnetaan vain kahdelta lajilta
  (*O. unguicularis* ja *O. bicolor*), ja se sekoitetaan usein
  *Stenocara gracilipes* -lajiin. Sumuöinä ruumiinlämpö voi laskea
  yhteen asteeseen, ja hemolymfan **glyseroli ja trehaloosi**
  estävät jäätymisen.
- **Gepardit ja farmarit** (en-Wikipedia "Cheetah Conservation Fund"):
  Namibian gepardikanta on **maailman suurin ja terveimpiä**.
  Biologi **Laurie Marker** perusti **Cheetah Conservation Fundin
  1990**; tutkimus- ja opetuskeskus on **44 km Otjiwarongosta itään**,
  ja Marker sai **Tyler-palkinnon 2010**. Suurin osa villeistä
  gepardeista elää **farmien mailla**, joten työ kohdistuu farmareihin:
  **laumanvartijakoiraohjelma** vähentää karjan menetyksiä ja siten
  tarvetta tappaa gepardeja, ja pensoittuneesta maasta korjatusta
  puusta valmistetaan **Bushblok-polttopuubriketti**. Kentällä
  tutkitaan **15 000 km²:n** Otjiwarongon maatalousaluetta.

## 3. Ruoka

- **Kapana** (en-Wikipedia "Kapana (grilled meat)", johdanto sekä
  osiot "Preparation" ja "Culture"): avotulella grillattua **naudan**
  lihaa, joka myydään toreilla pieninä paloina grillin äärestä
  kypsyessään; myyjiä on samassa paikassa monta, joten **hinnasta
  neuvotellaan**. Windhoekin **Katuturan** kaupunginosa on kapanasta
  tunnetuin. Grilli on hitsattu metallilevy, jonka alla palaa puu;
  **kapana-miehet** (myös naisia) paloittelevat raa'an lihan
  **viidakkoveitsellä**, ja liha kypsyy **5–10 minuuttia**.
  Lisäksi tarjotaan "salsa" — sipulia, tomaattia, valkoviinietikkaa,
  rypsiöljyä ja **kapana-maustesekoitusta** — sekä **vetkoek**-
  taikinapalloja, joita kutsutaan nimellä *junkies*. Grillin ympärys
  on sosiaalinen paikka: moni tulee mieluummin syömään ja
  juttelemaan kuin paistaa lihansa kotona, ja myyjät huutavat
  kilpaa oman lihansa paremmuudesta. **2014** kuivuus nosti lihan
  hintaa niin, että sitä jouduttiin kuljettamaan kaukaa.
- **Mahangu ja oshikundu** (en-Wikipedia "Oshikundu"; "Pearl millet",
  johdanto ja osio "Cultivation"; "Namibia", osio "Climate"):
  **oshikundu** eli *ontaku* tehdään käyneestä **mahangu**- eli
  helmihirssijauhosta, leseistä ja mallastetusta durrajauhosta
  haaleaan veteen sekoitettuna. Se on juotava **kuuden tunnin**
  kuluessa valmistumisesta, se on ruskeaa ja paksua, ja se on
  tavallisin **aawambojen** ja osin Kavangon alueen kotijuoma;
  valmistustapa on siirtynyt sukupolvelta toiselle suullisesti.
  Namibian yliopiston elintarviketieteen laitos osoitti **2001**,
  että juomaa varten voi tehdä kuivaseoksen, jota bambaramaapähkinä
  ravitsee lisää. Helmihirssi kestää **kuivuutta, laihaa maata,
  kuumuutta ja suolaisuutta** ja kasvaa siellä, missä maissi tai
  vehnä ei tulisi toimeen; sen kesyttämisen ydinalue on **Sahel**.
  Pohjoisen pellot saavat vetensä **efundjasta**, Angolasta tulevasta
  vuotuisesta tulvasta, joka täyttää Cuvelai–Etoshan altaan
  **oshanat** (oshiwambon kielellä tulvatasanko).
- **Omajowa** (en-Wikipedia "Termitomyces schimperi", johdanto sekä
  osiot "Characteristics", "Termite association" ja "Cultural
  association"): termiittisieni, jonka hererokielinen nimi on
  **ejova** (yksikkö) / **omajowa** (monikko) ja saksannamibialaisten
  *Termitenpilz*. Se kasvaa **Macrotermes michaelseni** -termiitin
  kekojen juurella; keot ovat **3–4 metriä** korkeita ja niiden huippu
  kallistuu pohjoiseen. Lakki on esiin tullessaan nyrkin kokoinen ja
  laajenee **15–28 senttiin**, joskus **40 senttiin** — artikkelin
  sanoin "ison paistinpannun kokoinen". Maanalainen valejuuri voi olla
  **90 senttiä** pitkä. Sieniä nousee **5–10 keon ympärille**, joskus
  jopa **50**, ja ne ilmestyvät kevään ensimmäisten **yli 12 mm**
  sateiden jälkeen; pääsato tulee **tammi–maaliskuussa** alueilla,
  joilla sataa keskimäärin yli **350 mm**. Namibiassa sientä pidetään
  **kasvun ja vaurauden vertauskuvana**.
- **!Nara** (en-Wikipedia "Acanthosicyos horridus", johdanto sekä
  osiot "Description", "Ecology" ja "Uses"; "Topnaar people",
  johdanto ja osio "Culture and living conditions"): Namibin
  **endeeminen** meloni, joka on **lehdetön** — yhteyttäminen tapahtuu
  varsissa ja **2–3 cm:n piikeissä**. Paalujuuri ulottuu **50 metrin**
  syvyyteen pohjaveteen, ja kasvin ympärille kertyvä hiekkakumpu voi
  olla **1 000–1 500 m²** laaja ja **4 metriä** korkea. Hedelmä painaa
  keskimäärin **kilon**, on vaaleanvihreä ja piikikäs, ja sen sisällä
  on makeaa oranssinkeltaista massaa; isot siemenet tunnetaan nimellä
  **butter-nuts**, ja niitä on viety leipomoihin. **Mustaselkäsakaali**
  puree kuoren rikki ja levittää siemenet **7–15,9 kilometrin** päähän;
  ulosteesta peräisin olevat siemenet itävät paremmin kuin suoraan
  hedelmästä otetut, ja sakaali käy myöhemmin kaivamassa hautaamansa
  hedelmät. Nama-kansalle hedelmä on ruokaa **helmi–huhtikuussa ja
  elo–syyskuussa**; **topnaarit** (ǂAonin) Kuisebjoen varrella pitävät
  !naraa **pääasiallisena perusruokanaan**.

## 4. Tiede

- **H.E.S.S.** (en-Wikipedia "High Energy Stereoscopic System",
  johdanto sekä osiot "Installation" ja "Discoveries and
  observations"): gammasäteilyn ilmaisinjärjestelmä **Khomasin
  ylängöllä Gamsbergin lähellä**, toiminnassa **vuodesta 2002**,
  virallisesti vihitty **2004**. Nimi on kunnianosoitus **Victor
  Hessille**, joka osoitti kosmisen säteilyn tulevan avaruudesta.
  Teleskooppeja on **viisi**: neljä hieman alle **12 metrin**
  peilillä **120 metrin** sivuisen neliön kulmissa ja keskellä
  **28 metrin** peili, joka lisättiin **2012** (H.E.S.S. II).
  Mittausalue on **0,03–100 TeV**. **2004** järjestelmä erotti
  ensimmäisenä lajissaan gammalähteen rakenteen, **2005** se löysi
  kahdeksan uutta lähdettä ja kaksinkertaisti tunnettujen määrän,
  ja **2014** mennessä lähteitä oli yli **90**. **2016** ryhmä
  raportoi **petaelektronivolttien protoneista** Linnunradan
  keskustan mustan aukon **Sagittarius A\*:n** suunnalta.
- **Gobabeb** (en-Wikipedia "Gobabeb", johdanto sekä osiot "Station",
  "Climate" ja "Appropriate technology"): aavikkotutkimuksen asema
  **120 km Walvis Baysta kaakkoon**, perustettu **1962** itävaltalaisen
  hyönteistieteilijän **Charles Kochin** toimesta; **vuodesta 1998**
  ympäristöministeriön ja **Desert Research Foundation of Namibian**
  yhteishanke. Asema on **kolmen ekosysteemin** kohtauspisteessä:
  kausiluonteinen **Kuisebjoki**, dyynimeri etelässä ja soratasangot
  pohjoisessa. Sadetta tulee keskimäärin **23,8 mm vuodessa**;
  sumupäiviä on Gobabebissa **94** ja rannikon Walvis Bayssa **140**.
  Sumuvedenkeräysverkko tuottaa sumuisena yönä jopa **3,3 litraa
  vettä neliömetriltä**. Aseman **370 aurinkopaneelia** ja
  akkujärjestelmä kattavat yli **90 %** energiasta, uudet rakennukset
  muurataan Kuisebin lietteestä poltetuista tiilistä, ja eloperäinen
  jäte menee **topnaarien vuohille**.
- **NamibRand ja tähtitaivas** (en-Wikipedia "NamibRand Nature
  Reserve"; "Namibia", osio "Climate"): yksityinen suojelualue,
  jonka **J. A. (Albi) Brückner** perusti **1984**; pinta-alaa on yli
  **215 000 hehtaaria** (2 150 km²) ja **100 kilometrin** yhteinen
  raja Namib-Naukluftin kansallispuiston kanssa. Alue rahoittaa
  itsensä **vähän kuormittavan matkailun** maksuilla.
  **International Dark-Sky Association** julisti sen **2012**
  kansainväliseksi **pimeän taivaan suojelualueeksi**. Namibiassa on
  yli **300 aurinkoista päivää** vuodessa, ja Kauriin kääntöpiiri
  halkaisee maan suunnilleen kahtia.
- **Cloudina ja Naman ryhmä** (en-Wikipedia "Cloudinidae", johdanto
  sekä osiot "Morphology" ja "Ecology"): cloudinidit elivät
  ediacaran kauden lopulla noin **550 miljoonaa vuotta sitten** ja
  jättivät millimetrimittakaavan kalkkikartioita, jotka ovat sisäkkäin
  kuin suppilot; itse eläimen ulkonäkö on yhä tuntematon. **Cloudina**
  löydettiin ensimmäisenä **Naman ryhmästä Namibiasta** (Germs 1972),
  ja suku on nimetty geologi **Preston Cloudin** mukaan. Koko
  vaihtelee **0,3–6,5 mm** läpimitaltaan ja **8–150 mm** pituudeltaan.
  Cloudinidit ovat varhaisimpia ja runsaimpia **mineralisoituneen
  tukirangan** fossiileja, ja yleisimmin kannatettu selitys kuorille
  on **suoja saalistajilta**: osassa Kiinasta löytyneitä yksilöitä on
  useita porausreikiä, joiden koko on suhteessa kuoren kokoon, kun
  taas samoista kerroksista löytyvässä *Sinotubulites*-suvussa reikiä
  ei ole. Tästä pääteltyä **kilpavarustelua** pidetään usein yhtenä
  kambrikauden räjähdyksen syynä.

## 5. Kuvataide

- **Apollo 11 -luola** (en-Wikipedia "Apollo 11 Cave", johdanto ja
  osio "Overview"): kalliosuoja **ǀAi-ǀAisin ja Richtersveldin
  rajapuistossa** noin **250 km Keetmanshoopista lounaaseen**.
  Nama-nimi alueelle oli **Goachanas**; saksalainen arkeologi
  **Wolfgang Erich Wendt** antoi luolalle nimen juuri palanneen
  **Apollo 11:n** mukaan. Kerrostumat kertyivät **noin 71 000–29 000
  vuotta sitten**. Luolasta kaivettiin **seitsemän kvartsiittilaattaa**,
  joiden maalaukset on ajoitettu radiohiilellä noin **30 000 vuoden**
  ikäisiksi; ne ovat **Afrikan vanhimpia esittäviä kuvia**, ja ne ovat
  nyt **Namibian kansallismuseossa** Windhoekissa. Tunnetuin laatta
  esittää olentoa, jossa yhdistyvät **ihmisen takajalat**, antiloopin
  vartalo ja sarvet sekä **kissapedon pää**. Luolassa on myös valkoisia
  ja punaisia maalauksia, aiheina muun muassa mehiläisiä. **2007**
  paikalla käyneet tutkijat totesivat sen **pahoin vandalisoiduksi**.
- **Twyfelfontein** (en-Wikipedia "Twyfelfontein", johdanto sekä
  osiot "History", "Artworks" ja "Site protection and recognition"):
  damara/nama-nimi **ǀUi-ǁAis** tarkoittaa "hyppäävää vesipaikkaa".
  Laaksossa on asuttu **6 000 vuotta**. **Ernst Rudolph Scherz**
  kuvasi **1950-luvulta** alkaen yli **2 500 kaiverrusta 212
  hiekkakivilaatalla**; nykyarvio on yli **5 000 kuvaa**. Kaiverrukset
  tehtiin hakkaamalla **aavikkolakan** läpi vaaleampaan kiveen.
  Kuuluisin on **Leijonamies**, jonka pitkä taittunut häntä päättyy
  **kuusivarpaiseen tassunjälkeen**; merileijonan, pingviinien ja
  ehkä flamingojen kuvat viittaavat siihen, että tekijät kävivät
  yli **100 kilometrin** päässä rannikolla. Kalliomaalauksia on
  **13 paikassa**, ihmishahmot punamullalla. Khoikhoi-paimentolaiset
  tekivät geometriset kuviot sekä jauhinkuopat, lautapelien ruudukot
  ja **gongikivet**. Farmari **David Levin** rekisteröi tilansa
  **1948** nimellä Twyfelfontein, koska hän epäili lähteen riittävyyttä
  niin usein, että ystävä alkoi kutsua häntä "David Twyfelfonteiniksi"
  — afrikaansin *twyfel* on pikemmin "epävarma" kuin "epäilyttävä".
  Alue julistettiin kansallismuistomerkiksi **15.8.1952**, mutta se oli
  vartioimatta **1986** asti; **2007** siitä tuli **Namibian
  ensimmäinen maailmanperintökohde**.
- **John Muafangejo** (en-Wikipedia "John Muafangejo", johdanto sekä
  osiot "Biography", "Works" ja "Exhibitions"): **5.10.1943 –
  27.11.1987**, syntyi **Etunda lo Nghadissa Angolassa**
  kwanjamaperheeseen ja paimensi lapsena karjaa avojaloin. Isän
  kuoltua **1955** äiti — yksi kahdeksasta vaimosta — kääntyi
  kristityksi ja muutti **1956** Epingan lähetysasemalle rajan
  eteläpuolelle; John seurasi **1957**. Amerikkalainen lähetti
  **C. S. Mallory** auttoi häntä hakemaan **Rorke's Driftin**
  taidekeskukseen Natalissa, jonka ruotsalaispariskunta **Ulla ja
  Peder Gowenius** oli perustanut **1962**; opettajana oli **Azaria
  Mbatha**. Muafangejo erottui **etsauksessa ja linoleikkauksessa**,
  sai tutkintonsa **1969** ja opetti Odibossa **1970–74**, muutti
  **1977** Windhoekiin ja kuoli sydänkohtaukseen **Katuturassa**.
  Tuotantoa on vain noin **260 eri vedosta**; niissä yhdistyvät
  **teksti ja kuva** sekä ovakwanjamojen historia. Näyttelyitä olivat
  muun muassa **São Paulon biennaali 1972** ja **Helsingin
  Bullankulman galleria 1980**. Hän ei ehtinyt nähdä Namibian
  itsenäistymistä.
- **Hererojen puku** (en-Wikipedia "Herero people", osio "Dress"):
  lähetystyöntekijät pitivät perinteistä sarvimaista **ekori**-
  päähinettä paholaisen merkkinä ja hylkäsivät sen. Naiset ottivat
  käyttöön **1800-luvun lopun** lähetyssaarnaajien lattiaan asti
  ulottuvat puvut, mutta tekevät ne nyt **kirkkaista väreistä ja
  kuoseista**: **ohorokova**-puvussa on korkea kaulus, tyköistuva
  yläosa ja valtava laskostettu hame, johon menee jopa **kymmenen
  metriä kangasta**, sekä hihat, jotka pullistuvat olkapäistä.
  Arkipuvut kootaan **tilkuista**, usein vanhoista vaatteista;
  yhdestä kankaasta tehty puku on juhlaa varten. Tunnusmerkki on
  vaakasuora sarvipäähine **otjikaiva**, joka on kunnianosoitus
  **karjalle** ja jonka runko voi olla **kankaaseen käärittyä
  sanomalehteä**. Puku elää yhä: windhoekilainen suunnittelija
  **McBright Kavari** on voittanut parhaan hererupuvun kilpailun
  kolmesti peräkkäin ja saanut kritiikkiä helman nostamisesta
  polveen.

## Uutislähde

**New Era** (neweralive.na), englanti. Testattu 6.9.2026: syötteessä
kymmenen juttua; artikkelisivun ensimmäisestä `<article>`-lohkosta
jäsentyy 7–18 yli 60 merkin kappaletta ja `og:image` löytyy (testattu
kahdella eri artikkelilla). Englanti on Namibian **ainoa virallinen
kieli**, vaikka vain 2,3 % puhuu sitä kotikielenään (oshiwambo 49,7 %);
mikään Namibian päivälehti ei ilmesty oshiwamboksi.

**Testattu ja hylätty:** *The Namibian* (namibian.com.na/feed/, maan
luetuin lehti — syötteessä kaksitoista juttua ja `og:image` löytyy,
mutta sivun **ensimmäinen `<article>` on sivupalkin juttukortti**,
josta ei jäsenny yhtään yli 60 merkin kappaletta, ja juuri sen
js/uutiset.js poimii); *Namibian Sun* ja *Republikein* (yhteinen
julkaisujärjestelmä: `/rss` palauttaa HTML-sivun, ei syötettä);
*Allgemeine Zeitung* (sama järjestelmä; `/rss` on hakemistosivu, jonka
takana on vain aihekohtaisia `/rssFeed/-nnn`-osoitteita);
*Windhoek Observer* (observer24.com.na/feed/ — syöte ja leipäteksti
jäsentyvät, mutta testatulla artikkelisivulla **ei ole `og:image`ä**);
*Informanté* (yhteys katkeaa); *The Brief* (403); *NBC* (ei toimivaa
RSS-osoitetta).

## Havainnot ja ristiriidat

- **Windhoekin perustamisvuosi.** Windhoek-artikkeli sanoo Jonker
  Afrikanerin asettuneen paikalle **1840**, Jonker Afrikaner
  -artikkeli "noin 1840"; kirkon kooksi edellinen antaa 500 ja
  jälkimmäinen 500–600. Lehteen on kirjoitettu tapahtuma, ei
  perustamisvuosi, ja kirkon koko pienemmän luvun mukaan.
- **Welwitschian ikä.** Johdanto puhuu "tuhansista vuosista",
  Description-osio täsmentää vanhimpien olevan "ehkä 2 000-vuotiaita".
  Lehdessä on jälkimmäinen, varovaisempi luku.
- **Keijukehien selitys on yhä auki**, vaikka 2025 katsaus asettuu
  itseorganisoitumisen taakse; nosto kertoo kiistan sellaisenaan eikä
  julista voittajaa.
- **Cloudinan porausreiät** on raportoitu etenkin Kiinan aineistosta,
  vaikka suku löydettiin Namibiasta; nosto sanoo tämän ääneen.
- **Twyfelfontein-artikkelin ikäluvut vaihtelevat** (vanhimmat
  kaiverrukset "ehkä 10 000 vuotta", British Museumin ajoitukset
  c. 5 850–180 BP, tekstin oma arvio 6 000–1 000 vuotta). Lehteen on
  otettu vain asutuksen ikä (6 000 vuotta) ja kaiverrusten määrä.
- **Anakronismit isoisän 1873-kirjaan nähden** (ei korjattu,
  ilmoitettu Fablelle): maalehden nostoista suurin osa sijoittuu
  1873:n jälkeiseen aikaan. Isoisän matkan aikaan Windhoek oli
  Jonker Afrikanerin kuoleman jälkeen rappiolla, suomalaislähetit
  olivat olleet Ambomaalla kolme vuotta, ja Walvis Bay oli vielä
  ilman brittihallintoa (liitos 1878). Nämä eivät ole virheitä
  lehdessä — lehti on nuoren Foggin nykyhetkeä — mutta ne kannattaa
  tietää, jos kaaritekstejä joskus kirjoitetaan.
