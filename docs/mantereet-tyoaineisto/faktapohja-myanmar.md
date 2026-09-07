# Myanmar-maalehti (ISO-3: MMR) — lyhyt faktapohja

*Koonnut Opus-lehtiagentti 6.9.2026. Kaikki faktat haettu samana päivänä
en-Wikipedian raakatekstistä (`api.php?action=query&prop=extracts&
explaintext=1`, `NODE_USE_ENV_PROXY=1`). Lyhyt faktapohja: vain ne luvut,
päiväykset ja nimet, jotka päätyivät `js/packs/maa-kategoriat.js`:n
MMR-lohkoon, sekä ristiriidat. Rakenteen sitova lähde
docs/moduulit/maalehti.md.*

Aiheet (5 × 4 nostoa): **Luonto, Ruoka, Kuvataide, Musiikki,
Kirjallisuus.** Minitehtävä on Musiikki-sivulla.

**Miksi historia-aihetta ei ole.** Myanmarin molemmilla pelikaupungeilla
(`yangon`, `mandalay`) on `KULTTUURI_KATEGORIAT`-lohkossa oma
`historia`-sivunsa, ja `js/ui.js` `rakennaSivut` antaa samalla aihe-id:llä
voiton kaupungille. Maan historia-sivu ei siis näkyisi pelissä
kertaakaan, koska maalla ei ole muita kaupunkeja. Aiheet on siksi
valittu vakioaiheiden lopusta.

**Herkkä maa.** `docs/aasia-tyoaineisto/spec-asia.md`:n Myanmar-linjaus on
sitova: historia kerrotaan asiallisesti, nykyhetkestä vain kulttuuri,
luonto ja ruoka. Lähteistä on siksi jätetty pois Art of Myanmar
-artikkelin sensuuriosio, Yoke thé -artikkelin 1990-luvun elvytysjakso,
Lahpet-artikkelin teenviljelyalueiden nykytilanne ja Myanmar-artikkelin
vuoden 1962 jälkeinen politiikka.

**Rajaus.** Karttanostot kattavat jo paljon, eikä lehti koske yhteenkään
niistä: `js/packs/maastokohteet-mmr.js` (Bagan, Mrauk U, Beikthano,
Kyaiktiyo, Pindaya, Pyin Oo Lwin, Mawlamyine, Shwebo, Hkakabo Razi,
Inlejärvi, Chindwin), `js/packs/skandaalit.js` (Dhammazedin kello,
kultainen kirje) ja `js/packs/elaintakyt.js` (myanmarinsurkkunenäapina).
Siksi luonto-osiossa ei ole Inlejärveä eikä Hkakabo Razia vaan Indawgyi,
ja Bagan mainitaan vain Popan ja Myazedin sijaintina. Kaupunkilehdet
kattavat Yangonista Shwedagonin, Sulen, Botataungin, ruutukaavan ja
mohingan sekä Mandalaysta palatsin, Kuthodaw'n, Mindonin oppilaat,
kultalehden, silkin ja jaden — nekään eivät ole maalehden aiheina.

## 1. Luonto

- **Iravadinjokidelfiini** (en-Wikipedia "Irrawaddy dolphin", johdanto
  sekä osiot "Description", "Distribution and habitat" ja "Interaction
  with humans"): tylppä pää, **ei kuononokkaa**, pyöristynyt pieni
  selkäevä. Myanmarissa **58–72 yksilöä 370 kilometrin** makean veden
  osuudella Ayeyarwadyssa. **Yhteistyökalastus**: kalastajat kutsuvat
  delfiinejä rummuttamalla kanootin laitaa **kartionmuotoisella
  puukapulalla**, lyömällä melalla veden pintaa, helistämällä verkkoa tai
  päästämällä **kalkkunamaisen huudon**; parvi ajaa kalat **puolikaareen**
  kohti venettä ja saa palkakseen osan sivusaaliista. **Vuoden 1879
  raportin** mukaan kalastajat veivät paikallisiin oikeuksiin vaatimuksia
  osuudesta kilpailijan verkkoon, jos kantajan oma delfiini oli ajanut
  kalat sinne.
- **Popa** (en-Wikipedia "Mount Popa", johdanto sekä osiot "Features",
  "History and legend" ja "Tourism"): **sammunut tulivuori 1 518 m**,
  noin **50 km Baganista kaakkoon**. **Taung Kalat** on jyrkkäseinäinen
  laavatulppa **657 m** merenpinnasta, laella buddhalainen luostari;
  erakko **U Khandi** piti kunnossa **777 porrasta**. Popa on **Burman
  Olympos**, maan tärkein natinpalvonnan keskus: pyhätössä ovat esillä
  **kaikki 37 nattia**, mutta vain **neljä** asuu vuorella (Mahagirin
  sisarukset, Byatta ja Me Wunna). Kansanusko kieltää **punaisen, mustan
  ja vihreän** vaatteen ja **lihan, etenkin sianlihan**, tuomisen.
  **Yli 200 lähdettä** tekee alueesta keitaan kuivalla keskitasangolla.
  *(Popa-langur, ~200 yksilöä, jätettiin pois: eläintäky on jo
  surkkunenäapina.)*
- **Indawgyi-järvi** (en-Wikipedia "Indawgyi Lake", johdanto sekä osiot
  "Flora and fauna", "Geology" ja "Conservation Intervention"): **suurin
  kokonaan Myanmarissa sijaitseva järvi**, Kachinin osavaltiossa,
  **13 km itä–länsi, 24 km pohjoinen–etelä**, 166 m merenpinnasta.
  Geologia: **vajoama-allas (sag pond)** Sagaingin siirroksen
  **sivuaskelmassa**, vetorepeämäaltaan tyyppi, jota verrataan
  **Kalifornian Salton Troughiin**. Suullinen perimätieto: hedelmällinen
  laakso **täyttyi äkkiä maanjäristyksen jälkeen** ja hukutti kylän
  asukkaineen; ei tiedetä, oliko syynä vajoaminen vai maanvyörymä.
  **ASEAN Heritage Park 2004, Ramsar 2016, Unescon biosfäärialue 2017.**
  Kaksi **äärimmäisen uhanalaista korppikotkalajia** (bengalinkorppikotka
  *Gyps bengalensis* ja hoikkanokkakorppikotka *Gyps tenuirostris*)
  elää ja pesii alueella ympäri vuoden.
- **Tiikki** (en-Wikipedia "Teak", johdanto sekä osiot "Description",
  "Distribution and habitat" ja "Uses"): **Myanmarin tiikkimetsissä on
  lähes puolet maailman luonnonvaraisesta tiikistä**; geneettisiä
  alkukoteja on kaksi, **Intia** sekä **Myanmar ja Laos**. Puu kasvaa
  **jopa 40 metriä**, sydänpuu on **kellanruskea ja tummuu iän myötä**.
  **Oma öljy** tekee puusta **termiitti- ja tuholaiskestävän**, ja se
  säilyy ulkona **ilman öljyämistä tai lakkaamista**; käyttökohteina mm.
  **laivankannet** ja ovi- ja ikkunakarmit. **Piidioksidi puuaineessa
  tylsyttää terät** nopeasti. Suvussa on kolme lajia; **T. hamiltoniana
  on kotoperäinen Myanmarissa** ja T. philippinensis Filippiineillä.

## 2. Ruoka

- **Lahpet** (en-Wikipedia "Lahpet", johdanto sekä osiot "History",
  "Processing" ja "Preparation styles"): hapatettu teelehti, **kansallinen
  herkku**. Sanonta: *hedelmistä paras mango, lihoista sianliha, lehdistä
  lahpet.* Käsittely: nuorimmat lehdet ja silmut **höyrytetään noin viisi
  minuuttia**, pakataan **bambusaaveihin tai saviruukkuihin**, lasketaan
  kuoppaan ja **puristetaan painoilla** veden poistamiseksi; **hapetonta
  maitohappokäymistä 3–4 kuukautta**, väri muuttuu vihreästä
  **kullanvihreäksi**. Maustetaan **valkosipulilla, chilillä, suolalla,
  sitruunamehulla ja maapähkinäöljyllä**.
- **Juhlava lahpet** (sama artikkeli, osio "Preparation styles" ja
  "History"): **lahpet ohk** on matala kannellinen **lokeroitu
  lakka-astia**; keskellä seesamiöljyllä maustettu hapatettu tee,
  lokeroissa **paahdettua valkosipulia, kikherneitä, lablabpapuja,
  seesaminsiemeniä, maapähkinöitä, murskattua kuivattua katkarapua,
  säilöttyä inkivääriä ja paistettua kookosta**. Kuuluu **shinbyu-
  munkkivihkiäisiin ja häihin**; **kutsu vietiin ovelta ovelle astia
  mukana ja hyväksyttiin syömällä siitä**. Esikoloniaalisella ajalla
  lahpet oli **sotivien kuningaskuntien sovinnon merkki**, joka syötiin
  kiistan ratkettua, ja **siviilioikeuden tuomion jälkeen sen syöminen
  merkitsi tuomion hyväksymistä**.
- **Ngapi** (en-Wikipedia "Ngapi", johdanto sekä osiot "Etymology",
  "History", "Uses" ja "Regional variations"): nimi tarkoittaa
  **"puristettua kalaa"**; suolattu kala tai katkarapu **hapatetaan,
  jauhetaan ja kuivataan auringossa**. Vanhin maininta on **1. vuosisadan
  monin kivipiirtokirjoituksessa**, ja **ngapin tekijät luetellaan
  1100–1400-lukujen kivi- ja marmoripiirtokirjoituksissa**. **1400-luvulla
  monit vaihtoivat ngapia, suolaa ja riisiä** ylämaan burmalaisten
  **rubiineihin, bentsoehartsiin ja myskiin**. Siirtomaa-ajan
  eurooppalaiset kuvasivat hajua **loukkaavaksi**. **Rakhinen ngapi**
  tehdään **merikalasta ja lähes ilman suolaa**.
- **Shanin keittiö** (en-Wikipedia "Burmese cuisine", osiot "Regional
  variations", "Condiments and seasonings" ja "Noodle dishes"):
  **Shan khauk swé** = riisinuudelit **kanan tai jauhetun sianlihan,
  sipulin, valkosipulin, tomaatin, chilin ja murskattujen paahdettujen
  maapähkinöiden** kanssa, tarjolla **tofupihvien ja säilötyn
  sinappikaalin** kera. **Shanien tofu tehdään keltaisista herneistä**,
  ei soijasta, ja **tofu nway** on lämmin kermainen versio. Ylämaassa
  umami tulee **hapatetuista pavuista, pè ngapista**, ja kuivatut
  **papulastut** ovat oma mausteensa. Pohjois-Thaimaan shanravintoloissa
  sama salaatti tunnetaan thain kielellä. *(Mohinga jätettiin pois:
  Yangonin kaupunkilehti kertoo sen.)*

## 3. Kuvataide

- **Baganin seinämaalaukset** (en-Wikipedia "Art of Myanmar", osiot
  "Bagan Period" ja "Taungoo and Ava periods"): maalattiin **kuivalle
  pinnalle**, ei märkään laastiin kuten fresko. Selitteet **paliksi,
  muinaismoniksi tai muinaisburmaksi**, aiheet enimmäkseen
  **jataka-kertomuksia**; **kattomaalaukset olivat kuvioita**, joissa
  **lootus** toistui puhtauden merkkinä. **Avan kaudella** maalarit
  toivat kuviin **oman aikansa kampaukset** ja **arkisia toimia kuten
  kalastuksen**, ja käyttöön tulivat **siniset ja turkoosit** väriaineet.
- **Lakkatyö ja yun** (sama artikkeli, osiot "Bagan Period", "Taungoo and
  Ava periods" ja "Konbaung period"): lakkaesineet ovat **Baganin
  myöhäiskaudelta**, ja **vanhimmat punontarungot on ajoitettu Baganissa
  1200-luvulle**. Hienomman lajin, **yunin**, uskotaan tulleen maahan
  **Bayinnaungin valloitusten 1555–1562** mukana, kun **Chiang Main
  seudun yun- eli laosinshan-käsityöläisiä** tuotiin Burmaan; laji on
  saanut nimensä heistä. **Konbaungin Ayutthaya-valloituksen** jälkeen
  hovi otti **siamilaisen lasimosaiikin** käyttöönsä **ylivallan
  merkiksi**, ja tyyli **yhdistetään nykyään burmalaiseen taiteeseen —
  Siam ei koskaan saanut sitä täysin takaisin**.
- **Kalaga** (en-Wikipedia "Kalaga", koko artikkeli): raskaasti kirjailtu
  **applikaatiotyö**, jonka hahmot leikataan **silkistä, flanellista,
  huovasta, villasta ja pitsistä**, topataan ja ommellaan
  **puuvilla- tai samettipohjalle**, joka on tavallisesti **punainen tai
  musta**. Ompeleessa **metallilankaa ja tavallista lankaa**, koristeina
  **paljetteja, helmiä ja lasikiviä**. Aiheet **Ramayanasta ja
  jataka-tarinoista**. Laji syntyi **Konbaung-kaudella 1800-luvun
  puolivälissä** ja oli huipussaan **Mindon Minin aikana**, kun
  **sametti tuli hovissa muotiin**. Sana **kalaga tarkoittaa verhoa**;
  burmaksi työtä sanotaan **shwe gyi do**, kultalankakirjonta.
- **Ba Nyan** (en-Wikipedia "Ba Nyan", johdanto ja osiot "Early life" ja
  "Success"; tekniikan osalta "Art of Myanmar", osio "Konbaung period"):
  Konbaung-kaudella hoviin tulivat **viivaperspektiivi, chiaroscuro ja
  sfumato**, ja seinämaalauksiin **heitetyt varjot ja sumea etäisyys**.
  **Ba Nyan (1897 – 12.10.1945)**, syntyi **Pantanawissa** kuudesta
  lapsesta neljäntenä, opiskeli **neljä vuotta** perinteisiä kuvioita
  **Po Maungin** johdolla. **Burma Art Club (per. 1913)** auttoi hänet
  **1921 Lontoon Royal College of Artiin**; **1928** toisella
  matkallaan hän tutustui Frank Brangwyniin ja William Rothensteiniin ja
  **tapasi kuningas Yrjö V:n pelastettuaan tämän sukulaisen
  hukkumasta**. Palattuaan **1930** hän piti yksityisnäyttelyitä ja sai
  toimeksiantoja. Häntä on sanottu **burmalaisen nykymaalauksen
  suurimmaksi nimeksi**.

## 4. Musiikki

- **Saung gauk** (en-Wikipedia "Saung", johdanto sekä osiot
  "Description" ja "History"): **kaarreharppu ja kansallissoitin**, jota
  pidetään **Aasian ainoana säilyneenä harppuperinteenä**. Nimi juontuu
  **persian sanasta chang**. Kaikupohjan päällä **tiukasti pingotettu
  peurannahka**, joka on **lakattu paksusti punaiseksi**, ja siinä on
  **neljä pientä pyöreää äänireikää**. Mitat **80 × 16 × 16 cm**, kaari
  nousee **noin 60 cm**. Koristeena **kiillepaloja ("Mandalayn helmiä")**,
  lasia, kultausta sekä punaista ja mustaa lakkaa. **Kieliä 13–16**,
  ennen silkkiä, nykyään nailonia. Vanhin todiste: **600-luvun
  puolivälin reliefi Sri Ksetran Bawbawgyi-pagodissa**, jossa soitetaan
  **noin viisikielistä** kaarreharppua; **Pyu-lähetystön orkesterissa
  Kiinassa 801–802** oli kaarreharppu.
- **Myawaddy Mingyi U Sa** (sama artikkeli, osio "History"): kun
  **kuningas Hsinbyushin ryösti Ayutthayan**, hoviin tuotiin
  **siamilaisia hoviherroja, näyttelijöitä ja soittajia**, ja siitä
  syntyi uutta harppumusiikkia. **U Sa (1766–1853)** sovitti siamilaista
  ohjelmistoa burmaksi, loi lajin **yodaya** (burman sana Ayutthayalle),
  **nosti kielten määrän seitsemästä kolmeentoista** (ala C3–F5, kaksi ja
  puoli oktaavia) ja määräsi rungon tehtäväksi **sha-puun kaarevasta
  juuresta**. Viimeinen hovisoittaja **Maung Maung Gyi** lisäsi
  **neljännentoista** kielen; **Ba Than** teki myöhemmin 16-kielisen.
- **Hsaing waing ja pat waing** (en-Wikipedia "Hsaing waing", johdanto
  sekä osiot "Origins", "Instrumentation" ja "Types"): perinneorkesteri,
  jonka pääsoitin **pat waing** on **18–21 viritetyn rummun kehä**, jonka
  ala on **yli kolme oktaavia**; soittaja istuu kehän keskellä. Rummut
  viritetään yhä **intialaisella menetelmällä**, ja sitä pidetään
  **Kaakkois-Aasian viimeisenä jäänteenä intialaisesta
  soitinperinteestä**. **Vanhin kuvallinen todiste 1600-luvulta.** Viisi
  kokoonpanotyyppiä: **bala** (juhlat), **zat** (näytelmät), **yokthe**
  (nukketeatteri), **nat** (henkimenot) ja **anyeint**. **Sein Beda**
  toi siirtomaakaudella telineisiin **lasimosaiikin**, näyttämölle
  **valonheittimet** ja soittajille **univormut**.
- **Yoke thé** (en-Wikipedia "Yoke thé", johdanto sekä osiot "History",
  "List of characters", "Music" ja "Political role"): marionettiteatteri,
  jonka synty ajoitetaan **noin vuoteen 1780 kuningas Singu Minin
  aikaan**; keksijänä pidetään **hovin huvimestaria U Thawta**. **Naruja
  18 miespuolisilla ja 19 naispuolisilla hahmoilla**, ja **yksi nukettaja
  hoitaa yhden nuken**. Seurueessa **27 hahmoa**, mm. **kaksi norsua
  (valkoinen ja musta), tiikeri, apina, alkemisti (Zawgyi), neljä
  ministeriä ja kaksi ilveilijää**. Musiikin soittaa **hsaing waing**, ja
  **nukettajat puhuvat itse repliikit**. Hovissa nukeilla oli oma
  tehtävänsä: **kuningas saattoi ojentaa lastaan tai puolisoaan
  tilaamalla vertauksen**, ja **väki pyysi nukettajia sanomaan
  kuninkaalle asioita, joista ihminen olisi voitu tuomita kuolemaan**.
  *(1990-luvun elvytys jätettiin pois: nykypolitiikkaa.)*

## 5. Kirjallisuus

- **Myazedin piirtokirjoitus** (en-Wikipedia "Myazedi inscription",
  johdanto sekä osiot "Stone pillars", "Translation" ja "Analysis"):
  **vuodelta 1113**, sama julistus **neljällä kielellä** —
  **muinaisburma, pali, muinaismoni ja pyu**. Sveitsiläinen palintutkija
  **Emanuel Forchhammer** löysi **kaksi lähes samanlaista pilaria
  1886–1887** Myazedi-pagodin luota **Myinkabasta Baganissa**.
  **Pilari A: 142 cm korkea**, sivuilla **39 riviä muinaisburmaa, 41
  riviä palia, 33 riviä muinaismonia ja 26 riviä pyuta**; pilari B on
  215 cm. Kivi on ollut **ratkaiseva pyun kielen ja kirjoituksen
  tulkinnassa** ja on **Unescon Maailman muisti -rekisterissä**. Teksti
  jakautuu **lahjoitukseen, toivomukseen ja kirroukseen**: prinssi
  **Yazakumar** lahjoitti isälleen **kuningas Kyansitthalle** kultaisen
  Buddha-kuvan, ja kirous sanoo, ettei lahjoitettujen palvelijoiden
  kaltoinkohtelija **näe Maitreya-Buddhaa**. Käsiala muistuttaa
  artikkelin mukaan **tamarindin siemeniä**.
- **Parabaik** (en-Wikipedia "Parabaik", johdanto sekä osiot
  "Construction and use" ja "Black parabaik"; kirjaimista en-Wikipedia
  "Burmese alphabet", johdanto ja osio historiasta): **taittokirja**,
  jossa paksu paperi **liimataan yhdeksi pitkäksi arkiksi ja taitetaan
  haitariksi**, kannet **lakataan**. Paperi on **shanien mulperipaperia
  (saa)**, halvempina vaihtoehtoina **mangonkuori- ja bambupaperi**.
  Koot **43 × 18 cm – 122 × 46 cm**. **Musta parabaik** saa pintansa
  **jauhetusta hiilestä ja riisitärkkelyksestä tai eläinliimasta**, siihen
  kirjoitetaan **valkoisilla vuolukivipuikoilla**, ja teksti **voidaan
  pyyhkiä ja pinta mustata uudelleen**; **valkoinen parabaik** oli
  virallisten asiakirjojen ja maalausten alusta. **Suurin osa
  burmalaisista aikakirjoista kirjoitettiin alun perin parabaikiin.**
  Burman kirjaimet ovat **pyöreitä palmunlehden takia**: suora viiva
  repii lehden pinnan, ja **pyöreä kursiivinen muoto vakiintui
  1600-luvulta alkaen**, kun palmunlehti ja parabaik yleistyivät.
- **Runouden lajit** (en-Wikipedia "Burmese literature", osio "Classical
  literature"): 1400-luvulle mennessä neljä päälajia — **pyo**
  (jataka-runo), **linka** (metafyysinen ja uskonnollinen runo),
  **mawgun** (historiallinen runoelma, eepoksen ja oodin sekoitus) ja
  **eigyin** (kuningashuoneen kehtolaulu). Vanhin teos on **Yakhaing
  minthami eigyin, Arakanin prinsessan kehtolaulu, 1455**. Munkki **Shin
  Ottama Gyaw** kirjoitti **tawla**-säkeitä metsistä, vuodenajoista ja
  matkanteosta; hovinainen **Yawei Shin Htwe** sepitti **aingyin**-runon
  **55 kampaustavasta**. Hovimiehet hioivat **myittazan**, pitkän
  proosakirjeen.
- **Kirjapaino ja ensimmäinen romaani** (sama artikkeli, osiot "First
  printing press (1816)" ja "British Burma"): **lay-lone tha-paik** on
  runomuoto, jossa **nelitavuiset säkeet ketjutetaan kiipeävällä riimillä
  30 rivin säkeistöiksi**; **brittiläisen Serampore-lähetyksen tuoma
  ensimmäinen kirjapaino 1816** alkoi vapauttaa runomuodon otetta.
  Aikakirjat: **U Kala, Maha Yazawin 1724**, kattaa Burman historian
  **vuoteen 1711**; **kuningas Bagyidaw asetti 1829 oppineet laatimaan
  Hmannan Yazawinin (Lasipalatsin aikakirja)**, joka ulottuu vuoteen
  1821. **Ensimmäinen burmalainen romaani on James Hla Kyaw'n Maung Yin
  Maung Ma Me Ma (1904)**, jonka esikuvana oli **Monte-Criston kreivi**.
  *(Mindonin Dutiya Yazawin jätettiin pois: Mandalayn kaupunkilehti
  kertoo jo Mindonista.)*

## Uutislähde

**Myanmar Now** (myanmar-now.org/mm/), burma. Testattu 6.9.2026: syöte
`https://myanmar-now.org/mm/feed/` antaa kymmenen juttua, ja
artikkelisivun ainoasta `<article>`-lohkosta jäsentyy **18–24 yli 60
merkin kappaletta** sekä `og:image`. **Loppukauttaviiva on pakollinen**:
`…/mm/feed` vastaa 301:llä, eikä worker seuraa uudelleenohjauksia.
Hylätyt lähteet on lueteltu `js/packs/uutislahteet.js`:n MMR-kommentissa
(Eleven Media, The Irrawaddy, Mizzima, DVB, Khit Thit).

## Kuvat

Jokainen käytetty kuva on haettu Commonsin rajapinnasta (leveys ≥ 1 200 px,
jpg, lisenssi ja tekijä rajapinnasta) ja katsottu 480 px:n pikkukuvana
ennen käyttöä. Hylkäysperusteet kirjattuina, jottei samoja ehdokkaita
tarvitse katsoa uudestaan:

- *Popa Taung Kalat (10808713286).jpg* — kuvassa on vesileima
  "SHAUN DUNPHY 2013".
- *Lahpet Stall.JPG*, *Ngapi.JPG*, *Myizedi Script-Burmese.JPG*,
  *Myazedi-Bagan-Myanmar-14-…jpg* — tunnistettavia kasvoja.
- *Kalaga, Birmânia, Museu do Oriente 02.jpg* ja
  *17 gora Popa*-sarjan museokuvat — kuvassa on vain museon
  selitekyltti, ei itse esinettä.
- *OrcaellaBrevirostris.JPG* — museovitriinin luuranko kylttiteksteineen.
- *Irrawaddy dolphin spotting 001 - panoramio.jpg* — kuvassa ei näy
  delfiiniä lainkaan.
- *Teak (3522254046).jpg* ja *Kyun (in Burmese) (3522249838).jpg* —
  tiikin kukkamakroja, jotka eivät kerro noston aiheesta (puuaines);
  kaikki löytyneet tiikkiviljelmäkuvat ovat Intiasta, Meksikosta tai
  Beninistä, joten tiikkinosto jäi kuvattomaksi.
- *Myanmar Saung.JPG* — soitin on liikkeen tiskillä sekavassa
  taustassa; Metin CC0-esinekuva on selvästi parempi.

Delfiinikuva on Borneon rannikolta, koska Iravadista ei löytynyt
kelvollista otosta; selite kertoo paikan rehellisesti (sama linjaus kuin
eläintäyissä).

## Tunnusluvut

MMR:llä ei ole riviä `js/packs/asia-maatiedot.js`:ssä, joten se lisättiin
`tests/maatiedot.test.mjs`:n `VIELA_ILMAN_TUNNUSLUKUJA`-listalle. Luvut
tehdään omana eränään `tools/kirjoita-maatiedot.mjs`-työkalulla.

## Havainnot ja ristiriidat

- **Popan korkeus.** Artikkelin johdanto antaa vuorelle 1 518 m ja
  Taung Kalatille 657 m; osiossa "Features" kraatterin mitat vaihtelevat
  saman artikkelin sisällä (1,6 km leveä ja 0,85 km syvä geologiaosassa,
  610 m leveä ja 914 m syvä Features-osassa). Lehteen ei siksi
  kirjoitettu kraatterin mittoja lainkaan.
- **Nukkeseurueen hahmot.** Yoke thé -artikkelin luettelo summautuu
  tasan 27:ään, kun kahtena kappaleena esiintyvät hahmot lasketaan
  kahdesti (natinpalvelijatar, norsu, papukaija, kruununprinssi ja
  ilveilijä). Luku 27 on siis artikkelin sisällä yhtenäinen.
- **Delfiinien määrä.** Artikkeli antaa Myanmarin kannaksi 58–72
  yksilöä; sama artikkeli kertoo lajin kadonneen Laosista 2022. Lehteen
  kirjattiin vain Myanmarin luku.
- **Ba Nyanin syntymävuosi.** Artikkeli antaa syntymävuodeksi 1897 ja
  kuolinpäiväksi 12.10.1945, mutta ei syntymäpäivää; lehteen
  kirjoitettiin vain vuosiluku.
