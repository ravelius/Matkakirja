# Lalibela — faktakoostaja, uusi kaupunkilehti

Lauta-id `africa`, kaupunki-id `lalibela`, maa ETH, en-Wikipedia
"Lalibela". Kaikki tiedot haettu en-Wikipedian raakatekstistä
(`index.php?action=raw`, `NODE_USE_ENV_PROXY=1`, uusinnat kasvavalla
viiveellä) **7.9.2026**. Malli ja mitat luettu tiedostoista
`tools/parvi/agentin-yhteiset-saannot.md`,
`tools/parvi/kaupunkilehti-ohje.md`, `tools/parvi/kohdekartta-ohje.md`,
`docs/aasia-tyoaineisto/lehtityo-resepti.md`,
`docs/moduulit/kaupunkilehti.md`, `docs/tyolista-opukselle.md` ja
`docs/mantereet-tyoaineisto/spec-mantereet.md`. Malli: Fesin ja
Lagosin lehdet (v1670).

Luetut lähdeartikkelit (en-Wikipedia, 7.9.2026): **"Lalibela"**,
**"Rock-Hewn Churches, Lalibela"**,
**"Church of Saint George, Lalibela"**, **"Biete Medhane Alem"**,
**"Biete Maryam"**, **"Biete Meskel"**, **"Biete Amanuel"**,
**"Biete Abba Libanos"**, **"Biete Gabriel-Rufael"**,
**"Biete Qeddus Mercoreus"**, **"Biete Lehem"**,
**"Lalibela Cross"**, **"Gebre Meskel Lalibela"**,
**"Zagwe dynasty"**, **"Yemrehana Krestos Church"**,
**"Tekle Giyorgis II"**, **"Timkat"**.

## 0. Rajaus tälle lehdelle

**Etiopian maalehti (js/packs/maa-kategoriat.js, ETH) on jo tehty, ja
sen aiheita EI toisteta.** Maalehti kertoo: **"Yksitoista kirkkoa,
jotka kaivettiin alaspäin"** (Lalibelan kirkkojen louhintatapa,
yksitoista kirkkoa, Zagwe-kuningas Gebre Meskel Lalibela, nimien ja
sijoittelun Jerusalem-symboliikka, Jerusalemin menetys 1187,
Francisco Álvaresin vala 1520-luvulla — **kuva Bete Giyorgis 01.jpg**);
Kebra Nagast; Zemene Mesafint eli ruhtinaiden aika; Menelik II ja
posti; teff, doro wat, ensete, paastokeittiö; Yared ja nuottimerkit,
begena, masenqo, eskista; ge'ezin kirjaimisto, Garima-evankeliumit,
suojelukääröt, kolmastoista kuukausi; kirkkometsät, walia-vuorikauris,
katoava joki, etiopiansusi.

Karttanostot (`js/packs/maastokohteet-eth.js`: Ras Dejen, Tanajärvi,
Sininen Niili, Aksum, Fasil Ghebbi, Harar, Tiya, Debre Damo,
Danakilin syvänne, Hadar, Balen kansallispuisto) ja
`js/packs/skandaalit.js` ETH-osio on luettu. **Addis Abeban
kaupunkilehti (v1669) on tehty**, eikä sen aiheita toisteta.

**TÄSTÄ SEURAA KOVA RAJAUS:** maalehden nosto on jo kertonut
louhintatavan, kirkkojen lukumäärän, Jerusalem-symboliikan ja
Álvaresin valan. **Kaupunkilehti ei toista niitä otsikkoaiheena.**
Lehti kertoo sen sijaan asiat, joita maalehti EI kerro: kaupungin
oman nimen ja perustajakuninkaan tarinan, veden ja kaivannot,
vuoden 1873 valtatilanteen, kaupungin asuintalot — sekä teemasivulla
aksumilaisen rakennusperinteen kivessä, Lalibelan ristin, kirkkojen
ajoituskiistan ja luolakirkko Yemrehana Krestosin.
**Kohdekartan kohteet kertovat kukin oman kirkkonsa tarinan**, jota
lehti ei kerro.

**LISÄRAJAUS: ei nykysotaa eikä nykypolitiikkaa.** Lalibelan
artikkelin osiot 20. ja 21. vuosisadasta (Italian-sota 1935–36,
Etiopian sisällissota 1984–85, vuosien 2021 ja 2023 taistelut) ovat
tämän lehden ulkopuolella. Kaupunki mainitaan matkaoppaassa
turvallisuuden osalta lyhyesti ja asiallisesti (Raamattu, Kuvat ja
lähteet, linjaustarkennus 20.8.2026: opas sanoo suoraan, jos
matkustaminen on nykyisin vaarallista tai rajoitettua).

**Kaupungin visat on luettu.** `js/packs/africa-questions.js`
(`lalibela`, viisi kysymystä: maa Etiopia, kallioon hakatut kirkot,
yksitoista kohdetta, Jordan-puro, rakennusvuosisadat 700–1200).
`js/packs/africa-kulttuuri.js`: **lalibelalle ei ole litteää taulua
eikä kulttuurivisaa** — ei siis kysymystä, johon lehden pitäisi
vastata. **Minitehtävä ei saa kysyä yhtäkään noista viidestä.**

Olemassa olevat lohkot on luettu:
- `js/packs/africa-saapumiset.js`: **lalibelalla EI OLE
  saapumistekstiä, eikä sitä saa kirjoittaa.** Kaupunki on
  `tests/vanha-maailma.test.mjs`:n **KAARETTOMAT**-listalla
  (`'fes', 'lalibela', // africa`), ja testi kaatuu, jos listalla
  olevalle kaupungille kirjoitetaan merkintä ilman listan purkamista.
  Listaa ei pureta ilman omistajan linjausta. **Raportoitu Fablelle.**
- `js/packs/africa-valokuvat.js` (`lalibela`): yksi kuva,
  `The Bete Giyorgis.jpg` (Tmanahan344, CC BY-SA 3.0, 2008).
  **Vanhaa puolta ei ole**, joten ennen–nyt-paria ei voi kopioida
  valokuvataulusta; vanha vedos on etsittävä Commonsista erikseen tai
  pari jää tekemättä (Lagos-ennakkotapaus v1670).
- `js/packs/africa-artikkelit.js`: **Lalibelalle ei ole merkintää.**
  Kirjoitetaan uusi (intro 7–10 virkettä + kolmikappaleinen
  `artikkeli`-kenttä). Avain on `city.wiki` eli **"Lalibela"**.
- `js/packs/maa-kategoriat.js` ETH: kuva `Bete Giyorgis 01.jpg` on
  varattu maalehdelle eikä sitä käytetä kaupunkilehdessä.

**1873-KEHYS:** isoisän matkavuonna Lalibelan maakunta **Lasta** oli
juuri menettänyt oman keisarinsa. **Wagshum Gobeze**, Wagin
maakunnan hallitsijan poika ja vanhan **Zagwe-valtaistuimen perijä**,
nousi kapinaan Lastassa **1864**, julistettiin keisariksi
**elokuussa 1868 Soqotassa** nimellä **Tekle Giyorgis II** ja
kruunattiin Debre Zebitissä. Hän hävisi ratkaisevan taistelun
Adwassa **11.7.1871**, ja voittaja julistautui **21.1.1872**
keisariksi nimellä **Yohannes IV**. Tekle Giyorgis vangittiin, ja
artikkelin tietolaatikko ajoittaa hänen kuolemansa **noin lokakuuhun
1873** (leipäteksti sanoo vain "joitakin vuosia myöhemmin" — ks.
tarkistus, kohta A). Isoisän matkavuonna Lastan oma keisari oli siis
vasta menetetty.

---

## 1. Kaupunki

- Lalibela (ላሊበላ) on kaupunki **Amharan alueella** Etiopiassa,
  **Lastan piirissä** ja **Pohjois-Wollon vyöhykkeellä**. Se oli
  aiemmin osa **Bugnan piiriä** ja on Lastan pääkaupunki.
- Korkeus noin **2 500 m merenpinnasta** (Rock-Hewn Churches
  -artikkeli sanoo arkeologisen alueen olevan noin 2 480 m).
- Väkiluku **17 367** (vuoden 2007 laskenta: 8 112 miestä ja
  9 255 naista). Vuoden 2005 arvio oli 14 668 ja vuoden 1994
  laskenta 8 484.
- Koordinaatit 12°01′54″ N, 39°02′28″ E.
- Kaupungissa on **lentoasema** (ICAO HALL, IATA LLI), suuri tori,
  kaksi koulua ja sairaala.
- Kaupungin perinteinen nimi on **Roha** (Pyhän Yrjön kirkon artikkeli
  antaa myös muodon *Warwar*), ja se nimettiin uudelleen kuningas
  Gebre Mesqel Lalibelan mukaan.
- Etiopia oli yksi ensimmäisistä kristinuskon omaksuneista maista
  300-luvun ensimmäisellä puoliskolla. **Osalle kristityistä Lalibela
  on Etiopian pyhimpiä kaupunkeja ja pyhiinvaelluksen keskus.**
- Paras aika käydä on kuiva kausi **loka–maaliskuussa**; kaupunki on
  erityisen täynnä suurten uskonnollisten juhlien aikaan, etenkin
  **Gennana (7. tammikuuta)** ja **Timkatina (19. tammikuuta)**,
  jolloin jumalanpalveluksiin liittyy monipäiväisiä kulkueita,
  perinnemusiikkia ja rituaaleja.
- **Ilmasto** (Lalibelan artikkelin weather box):
  tammikuun keskiylin **23,3** ja keskialin **9,0**; huhtikuun
  keskiylin 24,2; heinä- ja elokuun keskiylin **20,6** ja keskialin
  11,3 / 11,2; joulukuun keskiylin 22,8 ja keskialin **8,1**.
  Mitatut ääriarvot: ylin **31,0** (toukokuu), alin **2,0**
  (marraskuu). Sade: heinäkuu **259 mm**, elokuu **278 mm**,
  marraskuu **8 mm**, joulukuu 10 mm, tammikuu 17 mm.
  → **Vuodenkierto on sateen eikä lämmön kierto**: lämpötila pysyy
  koko vuoden 20–25 asteessa, mutta heinä–elokuussa sataa yli
  kaksisataa milliä kuukaudessa ja marras–tammikuussa alle
  kaksikymmentä.

## 2. Kuningas Lalibela ja kaupungin nimi

- **Gebre Meskel Lalibela** (ge'ez ገብረ መስቀል, "Ristin palvelija"),
  Zagwe-dynastian kuningas, hallitsi **1181–1221**. Hän oli **Jan
  Seyumin** poika ja **Kedus Harben** veli. Hän on Zagwe-hallitsijoista
  tunnetuin, ja hänet muistetaan kaupungin monoliittikirkkojen
  suojelijana. Etiopian ortodoksinen kirkko kunnioittaa häntä
  pyhimyksenä **19. kesäkuuta**.
- Elämäkerta on hagiografiassa ***Gadla Lalibela***. Sen mukaan hänen
  vanhempansa olivat **Jan Seyoum**, Bugnan kuvernööri Lastan
  maakunnassa, ja **Kirwerna**, Jan Seyoumin palvelijatar. **Vuonna
  1162** Jan Seyoum suuttui Kirwernan raskaudesta, ja tämä pakeni
  **Rohan** kaupunkiin synnyttämään.
- **Mehiläisparven kerrotaan ympäröineen vastasyntyneen lapsen**, ja
  äiti tulkitsi sen merkiksi tulevasta vallasta. Siksi hänet nimettiin
  **Lalibelaksi**, joka vanhassa agaw-kielessä tarkoittaa
  **"mehiläiset tunnustavat hänen valtansa"**. Myöhemmin Roha
  nimettiin uudelleen kuninkaan kunniaksi.
- Ennustus tulevasta suuruudesta herätti vihamielisyyttä sedässä
  **Tatadimissa** ja veljessä **Kedus Harbessa**, joka oli laillinen
  hallitsija. **Maanpakoon joutuneena Lalibela vietti monta vuotta
  Jerusalemissa.** Hän palasi Lastaan riittävän pitkäksi aikaa
  naidakseen **Meskel Kibran**, joka pakeni hänen kanssaan.
- *Gadla* ei selitä, miten hän lopulta nousi valtaan. Gojjamin
  kronikan mukaan veljesten välille syntyi taistelu; Lalibela liittoutui
  **amharojen** kanssa ja Harbe säilytti paikallisen tuen
  **agaw-klaanien** parissa. Voitettuaan Lalibela karkotti agawit
  Lastasta ja antoi amharojen asettua heidän tilalleen — siitä
  amharankielinen sananlasku "amhara asettui, agaw karkotettiin".
- Paikallisen perinteen mukaan Lalibela sai ennen valtaannousuaan
  **Jeesuksen opastamana kierroksen Jerusalemissa** ja käskyn
  rakentaa toinen Jerusalem Etiopiaan.
- **Näyn kerrotaan innoittaneen häntä rakentamaan uuden Jerusalemin
  pääkaupungikseen** vastauksena Jerusalemin menetykseen 1187.
  Monilla kaupungin piirteillä on siksi raamatullisia nimiä, muun
  muassa vesiuomalla **Jordan-joki** (amharaksi ዮርዳኖስ ወንዝ,
  *Yordanos Wenz*). **Kaupunki pysyi Etiopian pääkaupunkina
  1100-luvun lopulta 1200-luvulle.**
- Rakentamisesta ei ole säilynyt yksityiskohtia. Myöhempi *Gadla
  Lalibela* sanoo kuninkaan veistäneen kirkot kivestä **vain enkelien
  avulla**. Portugalilaisen lähetystön kertomuksen mukaan (Francisco
  Álvares, julkaistu 1540) Lalibelan papit väittivät kirkkojen
  rakentamisen kestäneen **24 vuotta**.
- Pääkuningatar **Masqal Kibra**: hän sai **Abuna Mikaelin** tekemään
  veljestään **Hirunista** piispan, mutta miehet riitaantuivat
  vallasta ja Mikael lähti lopulta Egyptiin. Toisen perinteen mukaan
  hän sai kuninkaan luopumaan kruunusta veljenpoikansa
  **Na'akueto La'abin** hyväksi; tämä osoittautui huonoksi
  hallitsijaksi, ja 18 kuukauden jälkeen Lalibela palasi valtaan —
  jälleen Masqal Kibran aloitteesta. Taddesse Tamrat epäilee, ettei
  hallituskauden loppu ollut näin sovinnollinen, ja arvelee perinteen
  peittävän Na'akueto La'abin lyhyen vallankaappauksen, jonka
  Lalibelan poika **Yetbarak** päätti.
- Getachew Mekonnen katsoo, että Masqal Kibra rakennutti yhden
  kalliokirkoista, **Biete Abba Libanosin**, miehensä muistomerkiksi
  tämän kuoleman jälkeen.
- **Aleksandrian patriarkan lähetystö** vieraili Lalibelan hovissa
  noin **1210** ja jätti kuvauksen hänestä sekä seuraajistaan
  Na'akueto La'abista ja Yetbarakista. Italialainen **Carlo Conti
  Rossini** on toimittanut ja julkaissut useita hänen ajaltaan
  säilyneitä maalahjoituskirjoja.

## 3. Vesi, kaivannot ja tunnelit

- Arkeologinen alue koostuu **viidestä kirkosta kaupungin Jordan-puron
  pohjoispuolella, viidestä eteläpuolella ja yhdestä erikseen
  sijaitsevasta**. Kummankin ryhmän kirkot on yhdistetty toisiinsa
  **tunneli- ja kaivantojärjestelmällä**. Yhdestoista kirkko,
  **Biete Giorgis**, on yhdistetty muihin kaivannoin.
- Kaikki 11 kirkkoa syntyivät samalla menetelmällä: perustyökaluina
  **vasarat ja taltat**, joilla louhittiin kaivannot monoliittisten ja
  puolimonoliittisten rakenteiden ympärille sekä tunnelijärjestelmä,
  joka yhdisti kaksi erillistä kirkkoryhmää **kuonamaisessa
  basaltissa**. **Rakentaminen tehtiin ylhäältä alaspäin.**
- Yhdestätoista kirkosta **neljä on vapaasti seisovia (monoliittisia)
  ja seitsemän jakaa seinän vuoren kanssa**, josta ne on louhittu.
- Kirkkojen rakentamisen katsotaan tapahtuneen **kolmessa vaiheessa**.
- **Kirkot ovat myös merkittävä insinöörityö**: ne kaikki liittyvät
  veteen, joka täyttää monen kirkon vieressä olevat kaivot ja
  hyödyntää **artesista geologista järjestelmää**, joka nostaa veden
  sen vuorenharjanteen laelle, jolla kaupunki on.
- **Pyhän Yrjön kirkon** artikkelin mukaan Lalibelan kirkot ovat
  kahdessa pääryhmässä, joista toinen edustaa maallista ja toinen
  taivaallista Jerusalemia, ja niiden välissä on **Jordan-jokea
  edustava kaivanto, jonka mitat ovat 25 × 25 × 30 metriä**.
  (Mitat ovat epäselvät — ks. tarkistus, kohta B.)
- **Unesco tunnistaa 11 kirkkoa neljässä ryhmässä**; kohde otettiin
  maailmanperintöluetteloon **1978** (nro 18, kriteerit i, ii, iii).

## 4. Kirkkojen ajoituskiista

- **Kirkot ajoittuvat 600-luvulta 1200-luvulle**, ja ne ajoitetaan
  perinteisesti Zagwe-kuningas Gebre Meskel Lalibelan hallituskaudelle
  (n. 1181–1221).
- Alkuperästä on kuitenkin **kiistaa**, ja on todennäköisempää, että
  kirkot kehittyivät nykyiseen muotoonsa useassa rakennus- ja
  muokkausvaiheessa aiemmista rakenteista (Fauvelle-Aymar ym. 2010).
- **David Roden Buxton** loi yleisesti hyväksytyn kronologian ja
  huomautti, että "kaksi niistä noudattaa suurella
  yksityiskohtaisella uskollisuudella **Debre Dammon** edustamaa
  perinnettä sellaisena kuin se on muunnettuna **Yemrehana
  Krestosissa**". Koska rakenteiden veistäminen elävästä kalliosta on
  vienyt kauemmin kuin Gebre Meskel Lalibelan hallituskauden
  vuosikymmenet, Buxton olettaa työn jatkuneen **1300-luvulle**.
- **David Phillipson**, Cambridgen Afrikan arkeologian professori, on
  esittänyt, että **Merkorioksen, Gabriel-Rufaelin ja Danagelin
  kirkot louhittiin kalliosta puoli vuosituhatta aiemmin,
  linnoituksiksi tai muiksi palatsirakenteiksi vuosina 600–800**
  Aksumin kuningaskunnan aikana, ja että kuningas Lalibelan nimi
  liitettiin niihin vasta hänen kuolemansa jälkeen.
- **Uudet arkeologiset kaivaukset** ovat tuottaneet runsaasti keramiikkaa
  ja eläinjäänteitä vuosilta **900–1100**, mikä osoittaa, että paikka
  oli pitkälti **maallinen asuinpaikka** ennen kuin kuningas Lalibela
  teki siitä uskonnollisen keskuksen. Läheisen **Washa Mikaelin
  luolan** alaseinistä on löytynyt esikristillisiä eläinfriisejä,
  joiden yläpuolelle lisättiin myöhemmin kristillisiä maalauksia —
  merkki siitä, että alue oli tuolloin vielä kristillistymässä
  (Derat 2021).
- **Biete Maryamin** artikkelin mukaan arkeologiset analyysit
  ajoittavat puolustusvarustusten rauniot noin 700-luvulle, ja
  monoliittiset kalliokirkot rakennettiin **kahdessa vaiheessa**:
  ensimmäinen 1000-luvulta 1100-luvun alkuun ja toinen 1100-luvun
  lopulta 1200-luvun alkuun. (Ks. tarkistus, kohta C: vaiheita on
  lähteissä kaksi tai kolme.)

## 5. Arkkitehtuuri ja aksumilainen perintö

- Kirkkojen arkkitehtuurissa on merkittäviä **aksumilaisia**
  vaikutteita. **Stuart Munro-Hay** huomauttaa, että **Biete
  Amanuelissa** on kivestä tehty jäljitelmä puurakenteista, joita
  näkyy yhä joissakin Tigrayn ja Eritrean vanhoissa kirkoissa.
- **Kehystetyt ovet ja ikkunat toistuvat aiheena**, koska ne
  jäljittelevät **Aksumin steelojen muotoa**: esimerkkejä ovat
  **Biete Gabriel-Rufaelin kaarikäytävä**, **Biete Maryamin ovi** ja
  **Biete Amanuelin ikkunat**.
- **David Phillipsonin** mukaan aksumilaistyylisen arkkitehtuurin
  läsnäolo ei välttämättä tarkoita, että kirkot rakennettiin
  aksumilaisella kaudella — aksumilaisia piirteitä on voitu ottaa
  käyttöön kauan Aksumin tuhon jälkeen — mutta se osoittaa vahvan
  jatkuvuuden aksumilaiseen kulttuuriperinteeseen.
- Merkkejä on myös **itäisen kristikunnan, erityisesti syyrialaisen ja
  koptilaisen vaikutuksesta**. **Biete Maryamin harjakatto ja
  suoraviivaiset listat** viittaavat syyrialaiseen vaikutukseen.
- Munro-Hay: Gebre Meskel Lalibelan hallituskaudella monet
  **koptilaiset egyptiläiset** muuttivat Etiopiaan ja ovat voineet
  auttaa kirkkojen rakentamisessa. Monet vieraat matkaajat, kuten
  **Manuel de Almeida** ja **Hiob Ludolf**, lukivat suurimman osan
  muistomerkeistä egyptiläisten arkkitehtien ansioksi, ja **Francisco
  Álvares** havaitsi monien paikallisten pitävän kirkkoja pääosin
  ulkomaalaisten työnä. Munro-Hay kuitenkin katsoo, että koska
  kirkkojen arkkitehtuuri on aksumilaista tyyliä, ulkomainen vaikutus
  näyttää rajoittuneen "koristetekniikoihin".
- **David Buxton** vahvistaa tämän: "joissakin koristeyksityiskohdissa
  on selvästi merkkejä koptilaisesta vaikutuksesta", mutta "merkittävä
  tosiasia on, että kalliokirkot noudattavat edelleen paikallisten
  rakennettujen esikuvien tyyliä, joissa itsessään on selvä osoitus
  niiden pohjimmiltaan aksumilaisesta alkuperästä".
- **Koristelu ja maalaukset:** Bet Golgothan sisällä on **ihmishahmoja
  esittäviä reliefejä**, ja **Bet Mariamissa** on värikkäitä
  geometrisia kuvioita ja raamatullisia kohtauksia. **Listat ja
  vyöhykkeet jakavat suuret rakenteelliset muodot pienempiin osiin**
  monissa kirkoissa.
- **Vernakulaari asuinrakentaminen** (Sandro Angelinin raportti 1970
  Lalibelan maailmanperintökohteen maarakentamisesta): kaksi
  asuintalotyyppiä.
  1. **Tukul** — pyöreä maja, joka on rakennettu kivestä ja jossa on
     yleensä **kaksi kerrosta**.
  2. **Chika** — yksikerroksinen pyöreä rakennus, joka on tehty
     maasta ja risuista (*wattle*) ja joka Angelinin mukaan heijastaa
     enemmän niukkuutta.
  Raportti sisälsi myös luettelon Lalibelan perinteisistä
  rakennuksista säilymisasteen mukaan luokiteltuina.
  (Commonsin kuvateksteissä: kaksikerroksisessa tukulissa on
  **ulkoseinällä portaat toiseen kerrokseen**.)

## 6. Suojelu ja katokset

- Useita kunnostus- ja entisöintihankkeita on toteutettu, mutta
  toteutuksessa on ollut puutteita. Yhdysvaltain suurlähetystön
  rahoittamassa Bet Gabriel-Rafaelin ja Bet Golgotha-Mikaelin
  entisöinnissä on ollut erimielisyyttä hankkeen laajuudesta
  kulttuuriperintöviranomaisen (ARCCH) sekä paikallisen komitean ja
  kirkon välillä.
- **EU:n rahoituksella pystytettiin 2008 neljä katosta**, jotka
  peittävät viisi kohteen kirkoista; ne oli tarkoitettu väliaikaiseksi
  suojaksi, kunnes pysyvämpi ratkaisu päätettäisiin. **Katokset ovat
  jääneet paikoilleen paljon aiottua pidemmäksi ajaksi**, ja ne ovat
  nyt vaaraksi allaan oleville rakennuksille, koska ne uhkaavat
  romahtaa muun muassa suuren painonsa vuoksi. ARCCH:n johtaja on
  todennut, että katokset on poistettava, mutta lopullisia
  suunnitelmia poistamisesta tai sen jälkeisistä toimista ei vielä
  ole.

## 7. Lalibelan risti

- **Lalibelan risti** on suuri, runsaasti koristeltu
  **kulkueristi**, muunnos etiopialaisesta rististä, ja sitä pidetään
  yhtenä Etiopian arvokkaimmista uskonnollisista ja historiallisista
  perintöesineistä.
- Sitä säilytetään **Bet Medhane Alemissa**, Maailman Vapahtajan
  talossa. **Pappi voi hangata uskovia rististillä siunatakseen tai
  parantaakseen heidät.** Ristin tyyli oli aikanaan yleinen, ja tämän
  tyylin ristejä kutsutaan nykyään usein yksinkertaisesti
  "Lalibela-ristiksi".
- Ristin arvellaan olevan **1100-luvulta**. Se on noin **60 cm pitkä**
  ja painaa noin **7 kg**. Se on tehty **yhdestä metallikappaleesta**,
  joko kullasta tai pronssista ja kullasta.
- Keskusristillä on **pidennetty alaspäin suuntautuva sakara** ja
  levenevät päät, ja sitä ympäröi runsaasti koristeltu kehänauha.
  Kuten monissa etiopialaisissa kulkueristeissä, ristin alaosaa
  kannattavat **"Aadamin kädet"** — aihe, joka esittää realistisesti
  tai abstraktisti Aadamin käsivarret. Juhlatilaisuuksissa ne
  verhotaan kirkkaanvärisillä kangaskappaleilla.
- **Risti varastettiin maaliskuussa 1997.** Se paikannettiin
  **Belgiaan 1999**, kun addisabebalainen kauppias oli myynyt sen
  belgialaiselle keräilijälle **25 000 dollarilla**. Kun keräilijän
  rahat oli palautettu ja sovittu, ettei oikeustoimiin ryhdytä,
  **risti palautettiin Etiopiaan 2001**.

## 8. Yemrehana Krestosin kirkko

- **Etiopian ortodoksinen kirkko Amharan alueella**, rakennettu
  **kivestä ja puusta** muinaisen **Aksumin kuningaskunnan**
  rakennusperinteen mukaan. Sitä ei ole ajoitettu, mutta se
  rakennettiin luultavasti **1000- tai 1100-luvulla**.
- Kirkko rakennettiin suureen **koilliseen avautuvaan luolaan**
  **Abuna Yosef -vuoren** länsirinteellä. Paikka on **12,2 km
  Lalibelasta koilliseen**; ennen vuonna **2000** rakennettua tietä
  kirkolle pääsi David Phillipsonin mukaan vain "pitkän ja rasittavan
  päivämatkan jälkeen jalan tai muulilla". Lähin kaupunki on
  **Bilbala**, noin 10 km länteen.
- Rakentaminen luetaan **Yemrehana Krestosin** ansioksi. Rakennus on
  merkittävä samankaltaisuutensa vuoksi **Debre Damon** vanhan kirkon
  kanssa: Phillipsonin mukaan seinissä on "samanlainen vaakasuora
  kuvio upotettuja palkkeja ja ulkonevaa kivityötä", ja "puiset
  nurkkakivet sekä ovi- ja ikkunakehykset ovat olennaisesti
  aksumilaista tyyliä".
- **Stuart Munro-Hay** pitää kirkon sisustusta niin runsaana, että se
  tekee "Yimrehana Krestosista kaikista tunnetuista muinaisista
  etiopialaisista kirkoista koristeellisimman". **Korkealla
  keskilaivan seinillä olevia seinämaalauksia pidetään Etiopian
  vanhimpina säilyneinä seinämaalauksina.**
- Luolassa on myös **toinen rakennus kirkon pohjoispuolella**, jota
  perinne kuvaa Negus Yemrehana Krestosin palatsiksi tai asunnoksi;
  nykyään se on paikallisten pappien asuin- ja varastotila.
- **Álvares** jätti kuvauksen kirkosta 1500-luvun alusta teoksessaan
  *Prester John of the Indies*. **Taddesse Tamrat** arvelee, että
  kirkon rakentaminen liittyy tietoon etiopialaisesta lähetystöstä,
  joka saapui kalifi **Saladinin** luo **1173** ja esitti tälle
  kirjeen ja runsaita lahjoja; *Gadla Yemrehana Krestos* kertoo, miten
  hän sai kalifin palatsista oven kirkkoaan varten. Tämä sopisi
  yhteen Phillipsonin ajoituksen kanssa (1000- tai 1100-luku).
- Luolan suu on suljettu nykyaikaisella muurilla, joka rakennettiin
  1980-luvulla vanhemman tilalle.

## 9. Kohdekartan kahdeksan kohdetta

Koordinaatit en-Wikipedian **"Rock-Hewn Churches, Lalibela"**
-artikkelin taulukon coord-malleista ja coordinates-rajapinnasta;
Biete Golgotha Mikaelin sijainti Overpassista ("Bet Mikael"),
koska kirkolla ei ole omaa artikkelia eikä koordinaattia.
Kaikki tarkistettu **7.9.2026**. Numerointi lännestä itään.

| # | kohde | lat | lon | ryhmä | koordinaatin lähde |
| --- | --- | --- | --- | --- | --- |
| 1 | Biete Giyorgis | 12.03174 | 39.04113 | erillinen | Wikipedia |
| 2 | Biete Golgotha Mikael | 12.03356 | 39.04304 | pohjoinen | Overpass |
| 3 | Biete Maryam | 12.03371 | 39.04333 | pohjoinen | Wikipedia |
| 4 | Biete Medhane Alem | 12.03370 | 39.04370 | pohjoinen | Wikipedia |
| 5 | Biete Gabriel-Rufael | 12.03120 | 39.04464 | eteläinen | Wikipedia |
| 6 | Biete Lehem | 12.03169 | 39.04451 | eteläinen | Wikipedia |
| 7 | Biete Abba Libanos | 12.03141 | 39.04518 | eteläinen | Wikipedia |
| 8 | Biete Amanuel | 12.03182 | 39.04556 | eteläinen | Wikipedia |

**KOHTEIDEN OMAT TARINAT** (nähtävyysjuttujen aineisto):

1. **Biete Giyorgis** (Pyhän Yrjön kirkko, ቤተ ጊዮርጊስ): louhittu
   alaspäin vulkaanisesta **tuffista**, joka on rakenteen ainoa
   materiaali. Ajoitettu 1100-luvun loppuun tai 1200-luvun alkuun.
   **Ristinmuotoinen pohjakaava.** Tunnetuimpia ja viimeisenä
   rakennettuja Lalibelan yhdestätoista kirkosta; sitä on kutsuttu
   "maailman kahdeksanneksi ihmeeksi". Etiopialaisen
   kulttuurihistorian mukaan se rakennettiin, kun kuningas sai näyn,
   jossa häntä käskettiin rakentaa kirkko — käskyn antajaksi on
   mainittu sekä **Pyhä Yrjö** että Jumala. **Ensi näkemältä paikka
   vaikuttaa täysin saavuttamattomalta**: joka puolella on pystysuora
   pudotus eikä sisäänkäyntisiltaa. Sinne pääsee hyvin kapeaa
   ihmisen tekemää kanjonia pitkin, joka kiertää alaspäin ja muuttuu
   lähellä kirkkoa tunneliksi, mikä kätkee kirkon entisestään.
   Sisällä on yksinkertainen Pyhän Yrjön pyhäkkö ja verhon takana
   (pääsy vain papeilla) liitonarkin jäljennös. Ulkoseinillä on
   avoimia hautoja pyhiinvaeltajille, jotka kuolivat päästyään
   perille. Kirkko dokumentoitiin kolmiulotteisesti 2005.
2. **Biete Golgotha Mikael** (Golgata Mikaelin talo): pohjoinen
   ryhmä. **Tunnettu taiteestaan**, ja sen kerrotaan sisältävän
   **kuningas Lalibelan haudan**. Siinä on **Kristuksen ja Aadamin
   haudan sekä jouluseimen jäljennökset**. Sisällä on ihmishahmoja
   esittäviä **reliefejä** — Lalibelan arkkitehtonisen moninaisuuden
   selvin osoitus yhdessä Bet Mariamin maalausten kanssa.
   Yhdysvaltain suurlähetystön rahoittama entisöinti koskee tätä
   kirkkoa ja Bet Gabriel-Rafaelia.
3. **Biete Maryam** (Marian talo): mahdollisesti kirkoista vanhin ja
   **Aadamin ja Kristuksen hautojen jäljennös**. **Maalattu katto**,
   jossa on erilaisia raamatullisia kohtauksia. Rakennettu aikaisintaan
   600-luvulla ja viimeistään 1200-luvulla. **Harjakatto ja
   suoraviivaiset listat viittaavat syyrialaiseen vaikutukseen**, ja
   sen **ovi** on yksi esimerkeistä Aksumin steelojen muotoa
   toistavasta kehyksestä. Kuva vuodelta 2007 näyttää sisällä
   kulkueristien rivin.
4. **Biete Medhane Alem** (Maailman Vapahtajan talo): pohjoinen
   ryhmä. Uskotaan olevan **maailman suurin monoliittikirkko**.
   Rakennettu Zagwe-dynastian aikana. Siellä säilytetään
   **Lalibelan ristiä**. Richard Pankhurst päättelee, että jos
   Ahmad al-Ghazi olisi 1531 polttanut jonkin Lalibelan kirkoista,
   se olisi todennäköisimmin ollut juuri Biete Medhane Alem — mutta
   hän suhtautuu koko kertomukseen epäillen, koska kuninkaalliset
   kronikat vaikenevat kirkkojen hävittämisestä.
   (**Rajaus:** hyökkäystä ei kerrota kohtauksena; kerrotaan vain,
   että lähteet ovat erimielisiä siitä, tapahtuiko sitä lainkaan.)
5. **Biete Gabriel-Rufael** (Gabrielin ja Rafaelin talo): eteläinen
   ryhmä, maanalainen monoliittinen kalliokirkko. Rakennettu
   artikkelin mukaan **Aksumin kuningaskunnan aikana**. Mahdollisesti
   **entinen kuninkaanpalatsi**, joka on yhdistetty **pyhään
   leipomoon**. **Kaarikäytävä** on yksi kolmesta esimerkistä, joissa
   kehykset toistavat Aksumin steelojen muotoa. Phillipsonin
   hypoteesissa tämä on yksi kolmesta kirkosta, jotka louhittiin
   alun perin **600–800** linnoituksiksi tai palatsirakenteiksi.
   Federico Sanin ym. italialainen pilottitutkimus (2012) käsitteli
   juuri tätä kirkkoa geologis-arkkitehtonisesti.
6. **Biete Lehem** (ቤተልሔም, "Pyhän leivän talo"): maanalainen
   monoliittikirkko, luotu artikkelin mukaan Aksumin kuningaskunnan
   aikana. Nimi tulee **Betlehemistä** (hepr. בֵּית לֶחֶם, "leivän
   talo"). Eteläinen ryhmä. Kirkkojen nimet ja sijoittelu toistavat
   Jerusalemia — Betlehem on yksi niistä.
7. **Biete Abba Libanos** (apotti Libanoksen talo): maanalainen
   monoliittinen ortodoksinen kirkko, rakennettu artikkelin mukaan
   Aksumin kuningaskunnan aikana. **Getachew Mekonnenin mukaan
   kuningatar Masqal Kibra rakennutti sen miehensä Lalibelan
   muistomerkiksi tämän kuoleman jälkeen.** Zamani-hanke on tehnyt
   siitä 3D-mallin.
8. **Biete Amanuel** (Immanuelin talo): maanalainen monoliittinen
   kalliokirkko, mahdollisesti **entinen kuninkaallinen kappeli**.
   **Munro-Hay: kirkossa on kivestä tehty jäljitelmä puisista
   rakennuspiirteistä**, joita näkee yhä joissakin Tigrayn ja
   Eritrean vanhoissa kirkoissa; sen **ikkunat** toistavat Aksumin
   steelojen muotoa. Se on yksi Lalibelan neljästä vapaasti
   seisovasta monoliitista.

**HYLÄTYT EHDOKKAAT:** *Biete Meskel* (12.033941, 39.04340) ja
*Biete Denagel* — molemmat pohjoisen ryhmän kirkkoja, mutta Meskel on
vain 27 metrin päässä Biete Maryamista ja Denagelilta puuttuu sekä
artikkeli että koordinaatti. *Biete Qeddus Mercoreus* (12.03157,
39.04548) — 29 metriä Biete Amanuelista. *Yemrehana Krestos*
(12.13972, 39.07194) — 12,2 km koilliseen, rajauksen ulkopuolella;
siitä kerrotaan lehden teemasivulla. *Asheton Maryamin luostari* ja
*Na'akuto La'ab* — ei en-Wikipedia-artikkelia. *Lalibela Cultural
Center* ja *Lalibela Ethnographic Museum* (Overpass) — ei katetta.

**Rajaus:** pohjoinen 12.0370, etelä 12.0275, länsi 39.0355, itä
39.0480 → noin **1,36 × 1,06 km**. Rajaus on pelin tiiviimpiä ja se
on pakko: kohteet ovat 29–200 metrin päässä toisistaan, ja
väljemmässä ruudussa numeroympyrät menisivät päällekkäin (sama
ratkaisu kuin Fesissä v1670, jossa tiivein väli oli 98 metriä).
