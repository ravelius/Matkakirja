# Sansibar — faktakoostaja, uusi kaupunkilehti

Lauta-id `africa`, kaupunki-id `sansibar`, maa TZA, en-Wikipedia
"Zanzibar". Kaikki tiedot haettu en-Wikipedian raakatekstistä
(`index.php?action=raw`, `NODE_USE_ENV_PROXY=1`, uusinnat kasvavalla
viiveellä) **7.9.2026**. Malli ja mitat luettu tiedostoista
`tools/parvi/kaupunkilehti-ohje.md`, `tools/parvi/kohdekartta-ohje.md`,
`docs/moduulit/kaupunkilehti.md` ja `docs/mantereet-tyoaineisto/
spec-mantereet.md`. Malli: Nairobin ja Miamin lehdet.

Luetut lähdeartikkelit (en-Wikipedia, 7.9.2026): **"Zanzibar"**,
**"Zanzibar City"**, **"Stone Town"**, **"History of Zanzibar"**,
**"Sultanate of Zanzibar"**, **"Christ Church, Zanzibar"**,
**"Emily Ruete"**, **"Tippu Tip"**, **"Tippu Tip's House"**,
**"Changuu"**, **"Dhow"**, **"Unguja"**, **"Said bin Sultan"**,
**"Majid bin Said"**, **"Old Fort of Zanzibar"**,
**"House of Wonders"**, **"Sultan's Palace, Zanzibar"**,
**"Old Dispensary (Zanzibar)"**, **"St. Joseph's Cathedral,
Zanzibar"**, **"Hamamni Persian Baths"**, **"Darajani Market"**,
**"Michenzani"**, **"State University of Zanzibar"**,
**"Zanzibar International Film Festival"**, **"Sauti za Busara"**,
**"Seaweed farming"**, **"Kizimkazi Mosque"**,
**"Zanzibar Archipelago"**.

## 0. Rajaus tälle lehdelle

**Tansanian maalehti (js/packs/maa-kategoriat.js, TZA) on jo tehty, ja
sen aiheita EI toisteta.** Maalehti kertoo: Helgoland–Sansibar-sopimus
1890, Anglo-Sansibarin 38 minuutin sota 1896, Nyerere ja ujamaa, TAZARA;
Ngorongoro, Ol Doinyo Lengai, sansibarinpunakolobi ja Jozan, kipunji;
**neilikka ja maustesaaret, pilau ja biriani, chipsi mayai,
Forodhanin iltatori**; Tingatinga, makondeveisto, **Kivikaupungin
veistetyt ovet ja baraza**, kanga; **taarab ja sulttaani Barghashin
egyptiläinen soittokunta, Siti binti Saad**, Hukwe Zawose.
Karttanostot (`js/packs/maastokohteet-tza.js`: Kilimandžaro, Intian
valtameri, Tanganjikajärvi, Olduvai, Serengeti, Kondoa, Kilwa
Kisiwani, Bagamoyo, Ujiji, Tabora, Kalambo) ja skandaalit
(`js/packs/skandaalit.js`, TZA: Maji Maji, Kongwan maapähkinät) on
luettu — yksikään ei ole tämän lehden aihe.

**Fablen nimenomainen ohje: taarab-nostoa ei toisteta.**

**Tämä lehti pysyy kaupungissa:** Shanganin kylästä kivikaupungiksi,
Omanin sulttaanikunnan pääkaupunki, vuoden 1873 sopimus ja orjatorin
sulkeminen, Sayyida Salme, vanha linnake ja elokuvajuhla; teemasivulla
monsuuni, dhow, Changuu ja merilevä.

Kaupungin visa on luettu tiedostosta `js/packs/africa-questions.js`
(avain `sansibar`, viisi kysymystä: neilikka, Tansania, Stone Town,
merilevän kasvatus, veistetyt puuovet). **Minitehtävä ei saa kysyä
yhtään näistä viidestä.** Merilevänosto on lehdessä tarkoituksella:
moduuliohje vaatii, että visan opettava aihe näkyy kategorioissa.
Kulttuurivisa `js/packs/africa-kulttuuri.js` (`sansibar`) kysyy
taarabista; **litteä taulu jätetään ennalleen**, jolloin sen
taarab-nosto, kuva ja Siti binti Saadin musiikkilinkki säilyvät
pelissä eikä lehti joudu toistamaan maalehden taarab-juttua. Sama
ratkaisu kuin Nairobissa ja Kapkaupungissa tässä parvierässä.

Olemassa olevat lohkot on luettu:
- `js/packs/africa-saapumiset.js` (`sansibar`): valmis, ei kosketa.
- `js/packs/africa-valokuvat.js` (`sansibar`): **ennen–nyt-pari on
  valmiiksi tarkistettu** (Rijksmuseumin satamapanoraama n. 1900 /
  Kivikaupungin satama nykyään) ja lisäkuvina neilikan kuivatus,
  veistetty ovi ja kapea kuja. Nämä viisi tiedostonimeä ovat
  varattuja.
- `js/packs/africa-questions.js`:n huomiot (`sansibar`) kertovat
  ovien messinkipiikeistä ja **Freddie Mercuryn syntymästä 1946** —
  kumpaakaan ei toisteta lehdessä.
- `js/packs/africa-artikkelit.js` (`Sansibar`): lyhyt intro ja
  kolmiosainen artikkeli. **Intro kasvatetaan 7–10 virkkeeseen**
  (Nairobi-malli); artikkeli jää ennalleen.

**1873-KEHYS:** isoisän matkavuosi on Sansibarin historian
käännekohta. Britannian konsuli **Sir John Kirk** uhkasi sulttaani
**Barghashia** koko saaren saarrolla, ja Barghash allekirjoitti
vastentahtoisesti **anglo-sansibarilaisen sopimuksen**, joka lakkautti
orjakaupan, **sulki kaikki orjatorit** ja suojeli vapautettuja
sulttaanin alueilla. Saman vuoden **jouluna 1873** laskettiin
anglikaanisen **Kristuksen katedraalin peruskivi** juuri suurimman
orjatorin paikalle.

---

## 1. Saari ja kaupunki

- Sansibar on Intian valtameren saari Swahilirannikolla, Manner-
  Tansanian vieressä. Pääsaari **Unguja** on pääosin matalaa maata;
  rannat ovat hiekkaa ja niitä reunustavat korallirifit, jotka ovat
  lajistoltaan rikkaita.
- **Kivikaupunki (Stone Town)** on Sansibarin kaupungin vanha osa
  Ungujan länsirannikolla, pienellä niemellä. Uudempi osa on
  **Ngʼambo**, swahiliksi "toinen puoli". Raja niiden välillä on
  Creek Road (nyk. Benjamin Mkapa Road), joka merkitsee nyt
  täytetyn salmen länsireunaa.
- Kivikaupunki oli Sansibarin sulttaanikunnan pääkaupunki ja
  1800-luvulla mauste- ja orjakaupan keskus. Se on **Unescon
  maailmanperintökohde vuodesta 2000**. Sen arkkitehtuuri on pääosin
  1800-luvulta ja yhdistää arabialaisia, persialaisia, intialaisia ja
  eurooppalaisia aineksia.
- Kivikaupungin sydän on kapeiden kujien sokkelo. Useimmat kadut ovat
  liian kapeita autoille, joten kaupungissa liikutaan polkupyörillä ja
  moottoripyörillä; rantakadulla kadut ovat leveämpiä. Kivikaupungin
  1 709 rakennuksesta noin **80 prosenttia on rappeutumassa**, koska
  korallikivi on hauras ja vaatii jatkuvaa huoltoa. Vuoden 1994
  Stone Town Conservation and Development Act määrittelee suojelun
  toimet, ja Aga Khanin kulttuurirahasto on tehnyt suuria
  kunnostuksia etenkin rantakadulla.
- Julkinen liikenne on yksityinen **daladala**. Nimi tulee
  1970–80-luvuilta: matka kaupunkiin maksoi viisi shillinkiä eli
  *dala* (dollari), ja meno ja paluu tekivät *daladalan*. Kivikaupunki
  on saaren daladala-keskus; pääasemat ovat **Darajanin torilla**
  (pohjoinen ja koillinen) ja Mwanakwerekwen torilla (etelä ja
  kaakko). Bussit lähtevät täyttyessään, ei aikataulun mukaan.
- Sansibarin päälentoasema on **Abeid Amani Karume International
  Airport**. Pääsatama **Malindi** rakennettiin **1925** ja hoitaa
  90 prosenttia saarten kaupasta.

## 2. Ennen sulttaaneja: Shangani ja arkeologia

- Kreikkalais-roomalainen **Periplus of the Erythraean Sea**
  (1.–3. vuosisata) mainitsee saaren nimeltä **Menuthias**, joka on
  todennäköisesti Unguja.
- Sansibar asutettiin bantunkielisillä ensimmäisen vuosituhannen
  alussa. **Fukuchanissa** Sansibarin luoteisrannikolla on löydöksiä
  vakiintuneesta maanviljely- ja kalastusyhteisöstä viimeistään
  **500-luvulta**: savitiivistettä puurakennuksista, simpukkahelmiä,
  helmenhiomakiviä ja raudan kuonaa. Tuontikeramiikkaa on alle yksi
  prosentti löydöistä, enimmäkseen Persianlahdelta 400–700-luvuilta.
- Kauppa kasvoi nopeasti 700-luvun puolivälistä, ja **900-luvun
  lopulla Sansibar oli yksi keskeisistä swahilikauppakaupungeista**.
- **Shangani**, kalastajakylä josta Kivikaupunki kasvoi, perustettiin
  **1000-luvulla** ja oli pieni ja vähäpätöinen. Saaren mahdit olivat
  700–1500-luvuilla **Unguja Ukuu, Kizimkazi ja Tumbatu**.
- Rakennustavan kehitys (Pemban ja etenkin Shangan kaivauksista):
  talot rakennettiin ensin puusta (n. 1050), sitten mudasta ja
  korallimuureista (n. 1150), 1200-luvulla kivestä mudalla sidottuna
  ja 1300-luvulla kalkkilaastilla. Vain varakkaimmilla oli kivi- ja
  kalkkitaloja, joiden vahvuus salli tasakatot; suurin osa väestöstä
  asui yksikerroksisissa olkikattoisissa taloissa kuten 1000- ja
  1100-luvuilla. **Tom Middletonin ja Mark Hortonin mukaan näiden
  kivitalojen arkkitehtuurissa ei ole arabialaisia eikä persialaisia
  aineksia, vaan kyse on täysin paikallisesta kehityksestä.**
- Portugalilaiset rakensivat **1500-luvun alussa kirkon Shanganiin**.
  Pohjois-Ungujan kuningatar rakennutti sinne talon 1600-luvun
  puolivälissä. Kun sansibarilaiset ja pembalaiset karkottivat
  portugalilaiset 1600-luvulla, paikalliset ylimykset kutsuivat Omanin
  sulttaanin käyttämään valtaa vastineeksi puolustuksesta. Osa
  portugalilaisesta kirkosta rakennettiin sisään omanilaiseen
  linnakkeeseen, jossa oli noin viisikymmentä sotilasta. Poliittinen
  valta pysyi silti pitkälti **Mwinyi Mkuulla**, tuolloin kuningatar
  Fatimalla.

## 3. Omanin sulttaanit ja pääkaupungin siirto

- **1698** Sansibar tuli Omanin sulttaanikunnan vaikutuspiiriin.
  1784 oli lyhyt kapina omanilaisvaltaa vastaan. Paikalliset ylimykset
  kutsuivat 1800-luvun alkupuoliskolla omanilaisia kauppiasruhtinaita
  asettumaan saarelle. Monet sansibarilaiset korostavat yhä, että
  saaren alkuperäisasukkaat **kutsuivat** ensimmäisen busaidi-sulttaanin
  **Seyyid Saidin** saarelleen.
- **Said bin Sultan**, Muscatin ja Omanin sulttaani, siirsi
  pääkaupunkinsa Muscatista Kivikaupunkiin. **Lähteet antavat
  vuodeksi 1832 tai 1840** ("the date varies among sources"); Stone
  Town -artikkeli sanoo 1824. Ks. tarkistus, kohta A.
- Said kuoli kesäkuussa **1856**. Testamentti jakoi valtakunnan
  kahtia: **Thuwaini** Omanin sulttaaniksi ja **Majid** Sansibarin
  ensimmäiseksi sulttaaniksi. Veljekset riitelivät testamentista, ja
  sen vahvisti lopulta Britannian Intian varakuningas Charles Canning.
  Sansibar ja Oman erosivat **1861**.
- Said rohkaisi Intian niemimaan kauppiaita asettumaan saarille, ja
  kauppa siirtyi vähitellen heidän käsiinsä. Norsunluu oli tärkeä
  kauppatavara. Sulttaanit rakensivat kauppa- ja
  vientikasvitalouden arabieliitin johdolla.
- Vuoteen 1890 asti Sansibarin sulttaanit hallitsivat huomattavaa
  osaa Swahilirannikkoa, **Zanjia**, johon kuuluivat Mombasa ja Dar
  es Salaam. Lokakuussa 1886 brittiläis-saksalainen rajakomissio
  määritteli Zanjin kapeaksi rannikkokaistaleeksi Cape Delgadosta
  Kipiniin.
- Omanin talouden romahdettua brittien kiellettyä orjakaupan Intian
  valtamerellä moni omanilainen muutti Sansibariin. Arabiväestön kasvu
  vauhditti rakentamista, ja kaupunkiin nousivat **Ihmeiden talo** ja
  **sulttaanin palatsi**.

## 4. Vuosi 1873

- **1822** kapteeni Fairfax Moresby, Britannian konsuli Muscatissa,
  painosti sulttaani Saidin allekirjoittamaan **Moresbyn sopimuksen**,
  ensimmäisen orjuudenvastaisen sopimussarjan aloituksen. Se kielsi
  orjien kuljetuksen Moresbyn linjan eteläpuolelle ja itäpuolelle
  (Cape Delgadosta Diu Headiin Intian rannikolla). Said menetti
  tullitulot ja kehitti siksi orjakauppaa itse Sansibarissa.
- **1842** Britannia ilmoitti Saidille haluavansa lakkauttaa
  orjakaupan Arabiaan, Omaniin, Persiaan ja Punaisellemerelle.
  Kuninkaallisen laivaston aluksia käytettiin sopimusten
  valvontaan pysäyttämällä orjia kuljettavia dhow-aluksia, mutta
  neljällä aluksella ei voitu estää Ranskan, Espanjan, Portugalin ja
  Amerikan laivoja jatkamasta.
- **Malindi** Sansibarin kaupungissa oli Swahilirannikon pääsatama
  Lähi-idän orjakaupalle. 1800-luvun puolivälissä sataman kautta
  kulki **jopa 50 000 orjaa vuodessa**.
- **1873** Britannian konsuli **Sir John Kirk** uhkasi Majidin
  seuraajaa, **sulttaani Barghashia**, Sansibarin täydellisellä
  saarrolla ja pakotti tämän vastentahtoisesti allekirjoittamaan
  **anglo-sansibarilaisen sopimuksen**. Se lakkautti orjakaupan,
  **sulki kaikki orjatorit** ja suojeli vapautettuja orjia sulttaanin
  alueilla.
- **Kristuksen katedraali** (anglikaaninen) rakennettiin seitsemässä
  vuodessa: peruskivi laskettiin **jouluna 1873** ja kirkko avattiin
  **jouluna 1879**; vihkiminen tapahtui 1903, ja kirkko nimettiin
  Canterburyn katedraalin mukaan. Se perustui **Edward Steeren**,
  Sansibarin kolmannen anglikaanipiispan, näkemykseen, ja hän osallistui
  itse suunnitteluun. Kuten useimmat Kivikaupungin rakennukset se on
  pääosin korallikiveä; katto on poikkeuksellinen betoninen tynnyriholvi,
  joka oli Steeren idea, ja kokonaisuus yhdistää myöhäisgotiikkaa ja
  islamilaisia yksityiskohtia. Kirkko rakennettiin **Sansibarin
  suurimman orjatorin paikalle**, ja rakentaminen oli tarkoitettu
  juhlistamaan orjuuden loppua; **alttarin sanotaan olevan täsmälleen
  siinä, missä torin pääruoskimispaalu oli**. Aukiolla on
  orjuudenvastainen muistomerkki (ketjuissa olevia ihmishahmoja
  nousemassa kuopasta) ja orjuuden historian museo. Steere kuoli
  sydänkohtaukseen katedraalin ollessa lähes valmis, ja hänet on
  haudattu alttarin taakse. Kirkossa on risti, joka on tehty sen puun
  puusta, jonka alle **David Livingstonen sydän** haudattiin
  Chitambossa.

## 5. Sayyida Salme (Emily Ruete)

- Syntyi **30.8.1844** nimellä Sayyida Salma bint Said Al Said,
  sulttaani **Said bin Sultanin 36 lapsesta nuorimpana**. Äiti
  **Jilfidan** oli tšerkessiorja ja myöhemmin jalkavaimo.
- Ensimmäiset vuodet suuressa **Bet il Mtonin** palatsissa meren
  rannalla noin kahdeksan kilometriä Kivikaupungista pohjoiseen
  (palatsi purettiin pääosin 1914). Hän kasvoi kaksikieliseksi,
  arabiaksi ja swahiliksi. 1851 hän muutti veljensä **Majidin** taloon
  Bet il Watoroon; veli opetti hänet ratsastamaan ja ampumaan. 1853
  hän muutti äitinsä kanssa Bet il Taniin. **Hän opetti itse itsensä
  kirjoittamaan** — taito, joka oli hänen kulttuurissaan naisille
  tuolloin epätavallinen.
- Isän kuoltua 1856 hänet julistettiin täysi-ikäiseksi
  kaksitoistavuotiaana ja hän sai perintönsä: viljelmän ja asunnon
  sekä 5 429 puntaa. 1859 äidin kuoltua hän sai kolme viljelmää.
- Samana vuonna 1859 puhkesi kiista veljien Majidin ja **Barghashin**
  välillä. Koska Salme osasi kirjoittaa, hän toimi **viisitoista-
  vuotiaana Barghashin puolueen sihteerinä**. Kapina päättyi
  englantilaisen tykkiveneen avulla; Barghash karkotettiin Bombayhin
  kahdeksi vuodeksi.
- Kivikaupungissa asuessaan Salme tutustui naapuriinsa, saksalaiseen
  kauppiaaseen **Rudolph Heinrich Rueteen**, ja tuli raskaaksi.
  **Elokuussa 1866** hän pakeni brittiläisellä fregatilla Adeniin,
  sai kristillisen opetuksen, kastettiin ja avioitui Adenissa
  **30.5.1867**.
- Ruetet asettuivat Hampuriin. Miehen kuoltua 1870 raitiovaunu-
  onnettomuudessa Salme joutui taloudellisiin vaikeuksiin, koska
  viranomaiset epäsivät hänen perintövaatimuksensa. Osin siksi hän
  kirjoitti **Memoiren einer arabischen Prinzessin**, joka ilmestyi
  Saksassa **1886** ja pian sen jälkeen Yhdysvalloissa ja
  Britanniassa. Kirja on **ensimmäinen tunnettu arabinaisen
  omaelämäkerta**, ja se antaa lähikuvan Sansibarin elämästä
  vuosina 1850–1865.

## 6. Vanha linnake ja elokuvajuhla

- **Vanha linnake (Ngome Kongwe / Boma la Kale)** on Kivikaupungin
  vanhin rakennus ja sen pääkohteita. Se on rantakadulla Ihmeiden
  talon vieressä, Forodhanin puistoa vastapäätä.
- Suojelutekstin mukaan portugalilaiset rakensivat linnakkeen
  **1600-luvulla** ja omanilaiset rakensivat sen uudelleen
  **1700-luvulla**. Stone Town -artikkeli sanoo omanilaisten
  rakentaneen sen 1699 (ks. tarkistus, kohta B). Sitä käytettiin
  1800-luvulla varuskuntana ja vankilana ja **1905–1928 Sansibarin
  rautatien päätepysäkkinä**; uusi vartiorakennus tehtiin 1947 ja
  amfiteatteri lisättiin 1990-luvulla.
- Linnake on korkeamuurinen neliö, jonka sisäpihalla on jäänteitä
  aiemmista rakennuksista, muun muassa portugalilaisesta kirkosta ja
  toisesta omanilaisesta linnoituksesta. Pihalla toimii nykyään
  kulttuurikeskus: myymälöitä (mm. tingatinga-maalauksia),
  ulkoilma-amfiteatteri, jossa on tanssi- ja musiikkiesityksiä lähes
  joka ilta, ravintola ja matkailuneuvonta.
- Linnake on **Sansibarin kansainvälisen elokuvajuhlan (ZIFF)**
  päämaja ja päänäyttämö sekä **Sauti za Busara** -musiikkijuhlan
  paikka. ZIFF tunnetaan myös nimellä **Festival of the Dhow
  Countries**, ja se järjestetään joka **heinäkuu**; se esittelee
  Swahilirannikon taidetta, myös taarabia.

## 7. Monsuuni, dhow, Changuu ja merilevä (teemasivu)

- **Ilmasto** on trooppinen monsuuni-ilmasto (Am). Kesän kuumuutta
  viilentävät usein voimakkaat merituulet, jotka liittyvät
  koillismonsuuniin — swahiliksi **kaskazi** — etenkin pohjois- ja
  itärannikolla. Päiväntasaajan lähellä saaret ovat lämpimiä ympäri
  vuoden. Sateet jakautuvat kahteen kauteen: pääsadekausi
  **maalis–toukokuussa** liittyy lounaismonsuuniin, **kusi**, ja
  toinen huippu on **marras–joulukuussa**; välikuukausina sataa
  vähemmän, vähiten **heinäkuussa**. Kuumimmat kuukaudet ovat
  helmi–maaliskuu, viileimmät heinä–elokuu.
- Arabian niemimaan, Persianlahden (etenkin **Shirazin**) ja
  Länsi-Intian kauppiaat kävivät Sansibarissa mahdollisesti jo
  1. vuosisadalla. **He purjehtivat monsuunituulten avulla Intian
  valtameren yli ja laskivat suojaisaan satamaan, joka on nykyisen
  Sansibarin kaupungin paikalla.**
- **Dhow** on yleisnimitys joukolle perinteisiä purjealuksia, joissa
  on yksi tai useampi masto ja **settee-purjeet, joskus
  latinalaispurjeet**. Niitä käytetään Punaisellamerellä ja Intian
  valtameren alueella. Rungot ovat pitkiä ja kapeita, ja alukset
  kuljettavat raskasta rahtia — hedelmiä, makeaa vettä ja muuta —
  Itä-Arabian, Iranin, Itä-Afrikan, Jemenin ja Etelä-Aasian
  rannikoilla. **Suuremmissa dhow-aluksissa on noin kolmekymmentä
  miehistön jäsentä, pienemmissä tavallisesti noin kaksitoista.**
  Sanan uskotaan nykyisin tulevan swahilin sanasta *daw*, alus, ja
  kokoava nimitys "dhow" on eurooppalaisten käyttöön ottama — arabit
  ja intialaiset eivät käytä sitä kokoavana terminä vaan nimeävät
  jokaisen tyypin erikseen. Tyyppejä ovat mm. **baghlah** (raskas
  syvänmeren dhow, arabian sanasta muuli), **boom** eli dhangi,
  **ghanjah**, **jahazi** (leveärunkoinen kalastus- tai kauppadhow,
  persian sanasta *jahāz*, laiva) ja **sambuk**. Swahilirannikolla
  dhow'sta käytetään swahilinkielistä sanaa **jahazi**. Aiemmin
  rungon päällyslaudat sidottiin yhteen kookosköydellä. **Kapteeni
  G. L. Sulivan kuvasi vuoden 1873 kirjassaan neljä eri
  rannikkodhow'n tyyppiä.** Dhow-aluksia käytettiin laajasti
  Punaisenmeren ja Intian valtameren orjakaupassa, jota kuninkaallinen
  laivasto yritti tukahduttaa. Sansibarissa on merkittävä kalastus ja
  **ruuhien valmistus**. Sansibarin elokuvajuhlan toinen nimi on
  Festival of the Dhow Countries.
- **Changuu** (myös Kibandiko, Prison Island, Quarantine Island) on
  saari Sansibarin kanaalissa noin viiden kilometrin päässä
  Kivikaupungista luoteeseen. Se on nimetty ympäröivässä meressä
  yleisen kalan swahilinkielisen nimen mukaan. Saari oli asumaton
  **1860-luvulle** asti, jolloin Sansibarin ensimmäinen sulttaani
  **Majid bin Said** antoi sen kahdelle arabille, jotka käyttivät sitä
  kapinallisten orjien vankilana ennen näiden vientiä tai myyntiä
  Kivikaupungin orjatorilla. Saarella louhittiin myös korallikiveä.
  Britannian ensimmäinen ministeri **Lloyd Mathews** osti saaren
  **1893** rakentaakseen sinne vankilan; **vankilarakennukset
  valmistuivat 1894, mutta yhtään vankia ei koskaan sijoitettu
  saarelle**. Sen sijaan saaresta tehtiin karanteenisaari koko
  Britannian Itä-Afrikalle, ja vanha vankila muutettiin sairaalaksi;
  **1923 saari nimettiin virallisesti Quarantine Islandiksi**.
  Tarkkailtava tauti oli ennen muuta **keltakuume**, ja karanteeniin
  jouduttiin viikoksi tai kahdeksi. Laivat saapuivat Itä-Afrikkaan
  yleensä vain joulukuusta maaliskuuhun, joten loppuvuoden saari oli
  suosittu lomakohde; ainoa makea vesi oli maanalaisiin säiliöihin
  kerättyä sadevettä, ja vanhat korallilouhokset puhdistettiin
  uima-altaiksi. Uusi karanteenirakennusten kokonaisuus valmistui
  1931 ja nosti kapasiteetin 904 henkeen.
- **Changuun kilpikonnat:** **1919** Seychellien brittikuvernööri
  lähetti saarelle lahjaksi **neljä aldabranjättiläiskilpikonnaa**
  Aldabran saarelta. Ne lisääntyivät nopeasti ja niitä oli **1955
  noin 200**. Sitten eläimiä alettiin varastaa myytäväksi lemmikeiksi
  tai ruoaksi: **1988 noin 100, 1990 viisikymmentä, 1996 vain
  seitsemän**. Saarelle tuotiin 1996 kahdeksankymmentä poikasta,
  joista neljäkymmentä katosi. Sansibarin hallitus rakensi
  eläinsuojelujärjestön avulla suuren aitauksen, ja **vuoteen 2000
  mennessä kanta oli 17 aikuista, 50 nuorta ja 90 poikasta**. Laji
  on luokiteltu vaarantuneeksi IUCN:n punaisella listalla.
- **Merilevä:** Sansibar vie mausteita, **merilevää** ja hienoa
  raffiaa. Merilevänviljelyn taloudellista potentiaalia tutki
  **Adelaida K. Semesi** vuodesta 1982 kuolemaansa 2001 asti.
  Viljelty punalevä on **Eucheuma**, ja viljelmiä on esimerkiksi
  **Jambianissa**. Lämpötilat ja tuulen nopeudet ovat nousseet
  neljässäkymmenessä vuodessa merkittävästi, ja nämä sekä
  sademallien muutokset ovat vaikuttaneet merileväviljelyyn: sato
  mätänee tai tuhoutuu korjuun aikana.

## 8. Kohdekartan kahdeksan kohdetta (ehdotus)

Koordinaatit en-Wikipedian geosearchista 7.9.2026. **Yksikään ei ole
lehden noston aihe.** Kristuksen katedraali (nosto S3), vanha
linnake (nosto S5) ja Forodhanin puisto (Tansanian maalehden aihe)
on jätetty pois. **Ihmeiden talo on 71 metriä vanhasta linnakkeesta**,
joten se ei olisi mahtunut kartalle linnakkeen kanssa; koska linnake
on lehden oma nosto, kartalle otettiin sen sijaan sulttaanin palatsi.

| # | Kohde | lat | lon |
| --- | --- | --- | --- |
| 1 | Vanha apteekki | -6.1584 | 39.1926 |
| 2 | Sulttaanin palatsi | -6.1599 | 39.1905 |
| 3 | Darajanin tori | -6.1621 | 39.1935 |
| 4 | Hamamnin kylpylä | -6.1623 | 39.191 |
| 5 | Pyhän Joosefin katedraali | -6.162778 | 39.188889 |
| 6 | Tippu Tipin talo | -6.164 | 39.187 |
| 7 | Michenzanin korttelit | -6.16526 | 39.1988 |
| 8 | Sansibarin valtionyliopisto | -6.165833 | 39.191667 |

Pienin väli on **239 metriä** (Pyhän Joosefin katedraali – Hamamni).
Malindin moskeija (155 m vanhasta apteekista), Ijumaan moskeija
(95 m vanhasta apteekista) ja Ihmeiden talo (151 m sulttaanin
palatsista) pudotettiin 200 metrin säännöllä.

**Kohteiden ydinfaktat**

1. **Vanha apteekki (Old Dispensary, Ithnashiri Dispensary).**
   Rantakadulla Mizingani Roadilla, puolimatkassa palatsimuseon ja
   sataman välillä. Nimi tulee siitä, että talo toimi apteekkina
   1900-luvun alkupuoliskolla. Rakentamisen tilasi **1887** varakas
   ismailiitta-intialainen **Tharia Topan** kuningatar Victorian
   kultaisen juhlavuoden kunniaksi, ja hänen tarkoituksensa oli
   hyväntekeväisyyssairaala köyhille. Topan kuoli 1891 talon ollessa
   kesken; leski jatkoi töitä mutta joutui keskeyttämään 1893, ja
   samana vuonna talo myytiin perheriidan takia uudelle omistajalle,
   joka sai sen valmiiksi **1894**. **1900** talon osti toinen
   merkittävä intialainen kauppias **Haji Nasser Nurmohamed**, joka
   päätti, että pohjakerros on apteekki ja ylemmät kerrokset asuntoja.
   Rakennus on Kivikaupungin koristeellisimpia: intialaisvaikutteiset
   veistetyt puuparvekkeet lasimaalauksin, runko perinteistä
   korallikiveä ja kalkkikiveä mutta pinnoitettu uusklassisin
   eurooppalaisin stukkokoristein; sisällä katettu sisäpiha ja
   veistetyt sillat kerrosten välillä. Aga Khanin kulttuurirahasto sai
   1990 luvan kunnostaa talon, ja työ valmistui huhtikuussa 1994.
   Talossa on pieni Sansibarin historian museo.
2. **Sulttaanin palatsi (Palace Museum).** Kolmikerroksinen,
   valkoiset muurit ja hammasreunus; Mizingani Roadilla rantakadulla
   Ihmeiden talon ja vanhan apteekin välissä. Se seisoo aiemman
   palatsin **Bait As-Sahelin** paikalla, joka tuhoutui vuoden 1896
   sodassa. Nykyinen palatsi rakennettiin 1800-luvun lopulla
   sulttaanin perheen asunnoksi. **1964 se nimettiin Kansan
   palatsiksi** ja otettiin hallinnon käyttöön; **1994 siitä tuli
   museo** Sansibarin hallitsijasuvusta ja historiasta. Yksi kerros
   on omistettu sulttaani Sir Khalifa bin Harubille ja toinen
   **Sayyida Salmelle**: esillä on hänen kirjoituksiaan, vaatteitaan
   ja arkitavaroitaan. Huonekaluja ja perheen esineitä on esillä
   antamassa kuvan 1800-luvun elämästä.
3. **Darajanin tori.** Kivikaupungin päätori. Tunnetaan myös nimellä
   **Estella Market** — kreivitär Estellan, Sansibarin pääministerin
   Lloyd Mathewsin sisaren, mukaan — ja epävirallisesti nimellä
   **Marikiti Kuu**, pääkauppapaikka. Se sijaitsee Darajani Roadilla
   anglikaanisen katedraalin lähellä. Torin päärakennuksen rakensi
   **1904 Bomanjee Maneckjee** sulttaani **Ali bin Hamudille**; sitä
   on myöhemmin laajennettu ja korjattu. Torilla myydään ennen muuta
   ruokaa (merenherkkuja, lihaa, hedelmiä, viljaa, mausteita), mutta
   myös elektroniikkaa ja vaatteita. Tori on saaren daladalojen
   pääasema pohjoiseen ja koilliseen.
4. **Hamamnin kylpylä (Hamamni Persian Baths).** Rakennettiin
   **1870–1888 sulttaani Barghash bin Saidille** yleiseksi kylpyläksi,
   ja se toimi sellaisena **vuoteen 1920**. Persialaiseksi sitä
   kutsutaan, koska rakentaminen tilattiin **shiraziarkkitehdeilta**.
   Sana *hamamni* tarkoittaa kylpyjen paikkaa. Rakennuksessa oli
   monimutkainen tilasarja: kuumia ja kylmiä altaita, käymälöitä,
   parranajotiloja ja ravintola. Kuuma vesi tuli **maanalaisia
   akvedukteja** pitkin. Sisäänpääsy oli maksullinen, joten vain
   varakkaat sansibarilaiset saattoivat käyttää kylpylää säännöllisesti;
   se oli avoinna sekä miehille että naisille mutta eri aikoina.
   Kylpylä ei ole enää toiminnassa mutta on avoinna kävijöille;
   CHAM-yhdistyksen vapaaehtoiset kunnostivat sen 2006. Osa tiloista
   (mm. ravintola) on muutettu asunnoiksi, joten kaikkia osia ei voi
   kiertää.
5. **Pyhän Joosefin katedraali.** Roomalaiskatolinen katedraali
   Baghanin alueella Kenyatta Roadin tuntumassa. **Ranskalaiset
   lähetyssaarnaajat rakensivat sen 1893–1898** (Stone Town
   -artikkeli sanoo 1893–1897; ks. tarkistus, kohta C).
   Suunnittelun esikuvana oli **Marseillen katedraali**, ja kirkot
   muistuttavat toisiaan, vaikka Kivikaupungin katedraali on paljon
   pienempi. Sen tunnusmerkki on **kaksi tornia**, jotka näkyvät
   kauas Kivikaupungin ylitse ja mereltä; ne ovat helpoimmin
   tunnistettavia osia kaupungin siluetissa. Kirkkoa on kuitenkin
   vaikea löytää Baghanin kujien sokkelossa. Sisätilat oli maalattu
   Vanhan testamentin kohtauksilla, mutta ne tuhoutuivat huonosti
   tehdyssä restauroinnissa 2014. Laatat ja lasimaalaukset tuotiin
   Ranskasta. Kirkko on yhä paikallisen katolisen seurakunnan
   käytössä.
6. **Tippu Tipin talo.** Historiallinen rakennus Shanganin
   kaupunginosassa, Suicide Alleyllä, noin 15–25 minuutin kävelyn
   päässä vanhasta linnakkeesta. Talossa asui mahtava kauppias ja
   **orjakauppias Tippu Tip (1837–1905)**. Rakennus oli
   yksityisasunto vuoden 1964 vallankumoukseen asti ja muutettiin
   sitten kerrostaloksi. Vaikka se on matkailunähtävyys, se ei ole
   virallisesti avoinna kävijöille, ja se on niin huonossa kunnossa,
   että sitä on kuvattu "koko Afrikan komeimmaksi valtaustaloksi".
   Suuri veistetty puuovi ja mustavalkoiset marmoriportaat kertovat
   yhä omistajan vauraudesta. Tippu Tip johti sisämaahan jopa
   nelituhatpäisiä retkikuntia; hän vei norsunluuta Sansibariin ja
   nousi saaren rikkaimpien joukkoon.
7. **Michenzanin korttelit.** Suuri Ngʼambon kaupunginosa aivan
   Creek Roadin toisella puolella, joka erottaa historiallisen
   Kivikaupungin (lännessä) ja Ngʼambon (idässä). Alue tunnetaan
   **elementtitaloista**, jotka rakennettiin 1960-luvun lopulla ja
   1970-luvun alussa **Itä-Saksan avustuksella** osana Ngʼambon
   kaupunkiuudistusta. Talot ovat eri kokoisia: korkein on
   seitsemänkerroksinen, matalin nelikerroksinen, ja rakennustavan
   takia sama talo voi olla eri osista eri korkuinen — esimerkiksi
   kortteli numero 7 on osin viisi-, osin seitsenkerroksinen.
   **Vaikka nämä ovat Sansibarin korkeimmat julkiset rakennukset,
   niihin ei asennettu hissejä**, ja kaikkiin asuntoihin mennään
   portaita. Huoltoa ei ole juuri tehty 1970-luvun jälkeen, ja
   vedenpaine ei riitä toisesta kerroksesta ylöspäin, joten moni
   asukas on asentanut oman pumppunsa. Osa asunnoista kunnostettiin
   2010.
8. **Sansibarin valtionyliopisto (SUZA).** Julkinen yliopisto, jonka
   Sansibarin edustajainhuone perusti lailla **1999** ja joka aloitti
   toimintansa **2002**. Yliopistossa on muun muassa **swahilin ja
   vieraiden kielten koulu (IKFL)**, täydennyskoulutuksen koulu,
   kasvatustieteiden koulu sekä luonnon- ja yhteiskuntatieteiden
   koulu. Kieli-instituutti on opettanut vuosia swahilia, arabiaa,
   englantia, espanjaa, portugalia, ranskaa ja saksaa, ja **se on
   opettanut swahilia ulkomaisille opiskelijoille eri puolilta
   maailmaa**. Sansibarissa puhuttava swahilin murre on
   **Kiunguja**, jossa on paljon arabialaisia lainasanoja, ja sillä
   "on standardiswahilin asema paitsi Tansaniassa myös muissa maissa,
   joissa swahilia puhutaan".

## 9. Minitehtäväehdotus

Tehtävä sijoitetaan **teemasivulle**, ja vastaus löytyy saman sivun
noston tekstistä. Kysymys ei osu kaupungin viiteen visakysymykseen
(neilikka, Tansania, Stone Town, merilevä, puuovet) eikä
kulttuurivisaan (taarab).

> **Miksi Changuun saarta kutsutaan vankilasaareksi, vaikka siellä ei
> koskaan ollut vankeja?**
> a) Vankila valmistui 1894, mutta saaresta tehtiin sen sijaan
> karanteenisaari (oikea) · b) Vankilaa ei koskaan rakennettu ·
> c) Vangit karkasivat heti · d) Nimi tarkoittaa swahiliksi kalaa
>
> Fakta: vanha vankila muutettiin karanteenisairaalaksi, ja 1923
> saari nimettiin virallisesti Quarantine Islandiksi.
