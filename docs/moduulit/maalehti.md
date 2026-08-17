# Maalehti — moduuliohje

*(Moduuli: Maalehti ja liput — docs/moduulirakenne-suunnitelma.md
luku 3. Linjaukset: Raamattu › Maalehdet ja lukeminen. Tämä
dokumentti kertoo vain MITEN. Koottu tiedostosta
docs/tutki-aiheet.md 17.8.2026, dokumenttiremontin D3;
kaupunkilehden osuudet: docs/moduulit/kaupunkilehti.md.
Data: js/packs/maa-kategoriat.js, *-artikkelit.js ·
Koodi: js/ui.js (maalehti), js/maakayrat.js.)*

## Maa kantaa aiheet, kaupunki kantaa kannen

*(Omistajan malli 5.8.2026; linjaus Raamatussa: Maalehdet.)*

Omistajan malli: nostot tehdään ensisijaisesti MAASTA, ja kaupungilla
on muutaman noston kansisivu itsestään. Pilotti: Venetsia + Italia
(v265). Näin yksi maapaketti palvelee maan kaikkia kaupunkeja — sama
matkaopas kulkee laukussa koko maan ajan, vain kansilehti vaihtuu.

- **Maan aiheet:** `js/packs/maa-kategoriat.js`, avain ISO-3-tunnus
  (sama kuin `map.cityCountry`). Monistusmitta 5–6 aihetta × 4–5
  nostoa; Lontoo (54 nostoa) on lippulaiva, ei mittatikku.
  Aiheen `nimi` on **yksisanainen yleisnimi** ("Historia"), koska peli
  kirjoittaa otsikoksi maan genetiivin ja aiheen pienellä: "EGYPTIN
  HISTORIA" (v314). Uusi maa ei vaadi koodia — paitsi jos sen genetiivi
  ei synny säännöllä, jolloin se lisätään `MAAN_GENETIIVIT`-tauluun ja
  `tests/maa-otsikot.test.mjs` kaatuu siihen asti muistuttamassa.
- **Kaupungin kansi:** `KULTTUURI_KATEGORIAT[cityId]`, yksi aihe
  (id `kaupunki`, nimi = kaupungin nimi) ja 3–5 paikallista nostoa:
  maamerkit, paikallinen elämä, visan aihe.
- **Yhdistäminen** (js/ui.js rakennaSivut): kaupungin aiheet ensin,
  sitten litteä "Elämää" jos omia ei ole, sitten maan aiheet. Sama
  aihe-id kaupungilla voittaa maan version.
- **Järjestys monistukseen:** maat sen mukaan, montako kaupunkia ne
  kattavat ja mihin lennetään ensin — Italia ✅, Egypti ✅ (Kairo,
  v297: ensimmäinen monistus todisti reseptin — pelkkää dataa, ei
  koodimuutoksia lukuun ottamatta uutisten dir="auto"-tukea
  oikealta vasemmalle kirjoitettaville kielille), Britannia ✅
  (Lontoo, v305: kansi + sää + kohtaaminen + BBC + Sky News —
  maa-aiheita EI tehty, koska Lontoolla on omat 9 aihetta jotka
  kantavat lehden sisäsivut), Espanja ✅ (Madrid, v307: kansi
  Goya-galleriineen + 5 maa-aihetta, joita myös Barcelona ja Granada
  käyttävät, + 20minutos + RTVE Noticias), sitten loput Lontoon
  lentokohteet eli pelin ensimmäiset matkakohteet: Ruotsi ✅
  (Tukholma, v315: kansi Elias Martin -galleriineen + 5 maa-aihetta,
  SVT:n uutiset ja konemestari Elsa — tv jätettiin pois, koska
  ruotsalaiskanavilla ei ole aluerajatonta 24/7-liveä) ja Saksa ✅
  (Berliini, v316: kansi Gaertner-galleriineen + 5 maa-aihetta,
  tagesschaun uutiset, tagesschau24:n tv ja posetiivari Otto) —
  ja niiden perään Ranska, USA, Japani,
  Brasilia, Australia. Valmiit maakohtaiset promptit:
  docs/arkisto/tyolista-opukselle-2026-08.md, "Lehtimaiden
  promptit" (arkistoitu D6:ssa — promptit ovat yhä käyttökelpoisia).

Kuva-, mitta-, työkalu- ja tarkistussäännöt ovat
docs/moduulit/kaupunkilehti.md:ssä ja pätevät sellaisinaan
molempiin tasoihin.

## "Maa numeroina" syntyy itsestään — uusi lehtimaa EI vaadi mitään

Lehden viimeinen arkkisivu (käyrät, väestöpyramidi, tulkintalauseet,
Suomi-vertailuviiva ja Vertailulinssi) EI kuulu monistustyöhön:
js/maakayrat.js piirtää sen suoraan assets/data/maakayrat.json-
aineistosta, jossa on valmiiksi 228 maan aikasarjat. Sivu ilmestyy
jokaiseen kaupunkiin, jolla on maatunnus (`map.cityCountry`) — siis
myös uuteen lehtimaahan sinä hetkenä kun kaupunki saa kansisivunsa,
ilman riviäkään uutta dataa tai koodia. Tulkintalauseet ovat
sääntöpohjaisia (kynnysarvot + lausepohjat), joten nekin toimivat
kaikille maille käsin kirjoittamatta. Sivun otsikkoon tulee maan nimi
nominatiivissa — "EGYPTI NUMEROINA" (v314) — myös itsestään.

Ainoa ylläpito on datan ajoittainen virkistys: `node
tools/hae-maakayrat.mjs` hakee tuoreet sarjat ja kirjoittaa
hakupäivän tiedostoon, josta sivun lähderivi lukee sen. Sen voi ajaa
milloin vain ja julkaista datapäivityksenä ilman koodimuutoksia
(docs/valtion-analyysi.md, riskiosio).

## Lehtimaan monistusohje (vaihe vaiheelta)

Kirjattu Kairon monistuksesta (v297) — ensimmäinen toisinto todisti,
että lehtimaa on pelkkää dataa. Tämä ohje on kirjoitettu ajettavaksi
ilman aiempaa kontekstia; jokainen kohta vastaa yhtä Kairossa tehtyä
työvaihetta. Yksi maa + lehtikaupunki per PR.

### 1. Kaupungin kansi — `KULTTUURI_KATEGORIAT[cityId]`

Yksi aihe (id `kaupunki`, nimi = kaupungin nimi, johdanto yhdellä
virkkeellä kaupungin luonteesta) ja:

- `kansikuvat`: 3 kpl — iso VAAKA pääkuva (kaupungin tunnetuin
  näkymä) + 2 pienempää (maamerkki + paikallista elämää).
- `nostot`: 3 kpl. Ensimmäinen on **taiteilijagalleria** Canaletton
  ja David Robertsin malliin: etsi taiteilija, joka kuvasi kaupunkia
  ennen valokuvia (Pariisi: esim. Pissarron/Caillebotten katunäkymät;
  Tokio: Hiroshigen sata näkymää Edosta; New York: Berenice Abbott
  tms.) ja anna `galleria`-listalla 4–5 lisäteosta otsikoineen.
  Wellcome/museo/LoC-skannauksista Wellcome ja Google Art Project
  ovat puhtaimpia — LoC-skannauksissa on usein VÄRIPALKKI reunassa,
  hylkää sellaiset. Toinen nosto: paikallinen elämä (tori, kahvila,
  kortteli). Kolmas: henkilö + `musiikki`-linkki (Apple Music).
- Jos kaupungilla on litteitä nostoja mantereen kulttuuripaketissa,
  SIIRRÄ ainutlaatuinen sisältö (musiikkilinkit!) kanteen ja jätä
  litteään tauluun vain `kysymys` + selittävä kommentti. Visan aiheen
  pitää näkyä jossakin kannen nostossa.

### 2. Maan aiheet — `MAA_KATEGORIAT[ISO3]`

5 aihetta × 4 nostoa vakioaiheista (historia, ruoka, kuvataide,
musiikki, luonto, tiede — valitse maalle osuvimmat 5). Tekstit
440–660 merkkiä, konkreettisia tarinoita eikä yleiskuvausta; lukijaa
koukuttavat yksityiskohdat edellä (Ever Given -tyyliin). Yhteen
aiheeseen `tehtava`, jonka vastaus LÖYTYY saman sivun tekstistä.

### 2b. Sisältölähteitä nostoihin (lisätty v301)

Aihe- ja kuvaideoiden aarreaittoja — käytä HAKUAPUNA, itse kuva
otetaan aina Commonsista (peiliputki tukee vain sitä):

- **Unescon aineeton kulttuuriperintö** (ich.unesco.org): maan
  juhlat, taidot, tanssit ja suullinen perinne — kertoo ihmisistä
  eikä monumenteista. Pilotti: Egyptin tahtib (v301). Espanjalla,
  Ranskalla ja Japanilla on luettelossa kymmeniä aiheita.
- **Vanhat kartat**: kaupungin kannen vakiovinkki on "kaupunki
  kartalla silloin" -nosto (pilotti: Kairo 1809, Description de
  l'Égypte). PD-sarjoja Commonsissa ja Library of Congressissa.
  David Rumseyn kokoelma on CC BY-NC — käytä vain hakuapuna ja
  etsi sama kartta Commonsista.
- **Met ja Smithsonian Open Access** (CC0): esineet, taide ja
  valokuvat etenkin Amerikkojen ja Tyynenmeren lehtiin — parhaat
  aineistot löytyvät Commonsiin peilattuina.
- **Kolikot**: "millä rahalla täällä maksettiin" on hyvä
  nostoaihe; museoiden kolikkokuvia on Commonsissa PD:nä.
- **GBIF** (gbif.org): mitä lajeja seudulla oikeasti elää —
  KIRJOITTAMISEN apuväline luonto-nostoihin, ei pelin datalähde
  (raakahavainnot ovat latinankielistä tutkijadataa).

### 3. Kuvat — säännöt ja sudenkuopat

- Hae Commonsin hakurajapinnalla (`generator=search`, `gsrnamespace=6`,
  `prop=imageinfo&iiprop=size|extmetadata`). Nukkuva 5–6 s haku­jen
  välissä — muuten tulee "too many requests".
- Kelpuuta: leveys ≥ 1200 px, jpg/png (EI .tif — selain ei näytä
  peilattua tiffiä), lisenssi PD/CC0/CC BY/CC BY-SA, tekijä tiedossa.
- **KATSO JOKAINEN KUVA SILMIN** ennen käyttöä: lataa 480 px thumb
  (`/w/thumb.php?f=<nimi>&w=480`) ja tarkista, että sisältö vastaa
  selitettä eikä kuvassa ole väripalkkeja, vesileimoja tai kollaaseja
  (Kairossa hylättiin kaksi tällaista). Tämä on reseptin tärkein
  kohta — omistaja on löytänyt vääriä kuvia aiemmista eristä.
- **Suosi vaakakuvia** (omistajan linjaus 5.8.2026): vaakakuva
  täyttää lehtijutun yläreunan kauniisti ja leipäteksti taittuu
  kahdelle palstalle sen alle. Pystykuva on sallittu, kun aihe sitä
  vaatii (muotokuva, portti, torni) — silloin taitto asettaa tekstin
  automaattisesti kuvan viereen (.pysty, v301) — mutta jos samasta
  aiheesta on hyvä vaaka- ja pystykuva, valitse vaaka. Yksi kuva
  vain kerran per kaupunki.

### 4. Sää — `SAATIEDOT[cityId]`

Hae ERA5-arkisto: `archive-api.open-meteo.com/v1/archive?latitude=…&
longitude=…&start_date=1991-01-01&end_date=2020-12-31&daily=
temperature_2m_mean,precipitation_sum&timezone=<paikallinen>` ja
laske kuukausikeskiarvot (lämpö: keskiarvo; sade: kuukauden summa
jaettuna 30 vuodella). Pyöristä yhteen desimaaliin / kokonais-mm.

### 5. Kohtaaminen — `KOHTAAMISET[cityId]`

Paikallinen hahmo, jolla on SIDE ISOISÄN KIRJAAN (gondolieerin
isoisä souti omistajaa; Kairon kirjakauppiaan isä myi kartan).
Kentät: hahmo, nappi ("Tapaa …"), frame, tervehdys, loyto, tyhja,
vaarin. Tervehdys päättyy aina kutsuun näyttää maailmantuntemus.

### 6. Uutiset — `UUTISLAHTEET[ISO3]` + workerin päivitys

- Etsi maan luetuimman uutissivuston RSS ja TESTAA curlilla
  (`-A "matkakirja-uutisvalitys/1.0"`): syöte aukeaa, otsikot ja
  linkit jäsentyvät. Iso osa sivustoista on botti-eston takana
  (Egyptissä Al-Ahram oli; Youm7 toimi) — kokeile kunnes löytyy
  toimiva. Paikalliskielinen lähde ensisijainen; kieli-kenttä on
  MyMemory-käännöksen lähdekieli.
- Testaa myös YKSI ARTIKKELISIVU: `[itemprop="articleBody"]` tai
  `<article>` löytyy ja sisältää >60 merkin kappaleita, ja sivulla
  on `og:image`. **Tämä on eri testi kuin syötteen testi, ja moni
  lähde läpäisee vain ensimmäisen:** Espanjassa El Paísin syöte
  aukesi (142 juttua) mutta artikkelisivut palauttivat 403, jolloin
  popupiin olisi jäänyt vain syötteen parin lauseen kuvaus (6.8.2026,
  20minutos läpäisi molemmat).
- Lisää lähteen etuliite `tools/uutisproxy/worker.js` SALLITUT-
  listaan ja kirjaa OHJE.md:hen uusi päivitysmerkintä. Worker
  julkaistuu 7.8.2026 alkaen ITSESTÄÄN, kun muutos on mainissa
  (Cloudflaren Git-integraatio + wrangler.jsonc) — käsijulkaisua ei
  tarvitse muistuttaa. Jos integraatio on joskus pois käytöstä,
  varakeino on entinen käsijulkaisu (OHJE.md).
- Oikealta vasemmalle kirjoitettavat kielet toimivat ilman
  lisätöitä (dir="auto" on koodissa v297:stä alkaen).

### 7. Tv ja radio — `TV_KANAVAT[ISO3]`, `RADIOT[ISO3]`

- Tv: maan uutiskanava, joka lähettää YouTubeen 24/7 ILMAN
  aluerajausta (yleisradio usein estää ulkomailta — Rai ja Sky
  estivät, euronews ja Al Qahera eivät). Hae kanavatunnus live-sivun
  canonical-linkistä curlilla. `livesivu` = @kanava/live-osoite,
  `upotus` = live_stream?channel=<tunnus>-varareitti.
- Radio on yleensä valmiina RADIOT-taulussa — tarkista että maalla
  on rivi.

### 8. Maan intro

Pidennä maan intro (mantereen artikkelipaketissa, esim.
`africa-artikkelit.js` avaimella maan wiki-nimi) noin kuuteen
virkkeeseen + kommentti, että lehden maaosasto nojaa siihen yksin.

### 9. Tarkistus ja julkaisu

1. `node tools/tarkista-kaksoisavaimet.mjs` + koko testistö.
2. Playwright-kuvakaappaukset 834 JA 1024 px: kansi, kaupungin
   nostosivu ja pari maasivua — kuvat latautuvat, kuvasuhteet
   oikein, tekstipalstat eivät purista.
3. Versionosto, muutokset.js-rivit, standalone, PR, squash-merge,
   haaran nollaus. Merkitse maa tehdyksi tämän tiedoston
   monistusjärjestykseen (✅).

## Sarjakuva kuuluu Belgiaan ja Ranskaan (omistajan huomio 8.8.2026)

Saksalla oli oma sarjakuvasivu (Max ja Moritz). Se poistettiin
v364:ssä, koska yhden nostoin sivu on ohut eikä sarjakuva ole
Saksan vahvin aihe.

**Kun Belgia ja Ranska saavat maalehtensä, sarjakuva on niillä
aiheena vahva** — bande dessinée on molemmissa maissa oma
taiteenlajinsa kirjastoineen, museoineen ja katutaiteineen.
Saksan Max ja Moritz voi silloin palata mainintana siihen, mistä
kuvakertomus alkoi, sen sijaan että se kantaisi omaa sivuaan.

Sama koskee valokuvausta: sekin oli Saksalla yhden noston sivu ja
poistettiin. Yhden noston aihesivu on lähes aina merkki siitä, että
aihe kuuluu jonkin toisen sivun sisään tai toiseen maahan.

## Maiden tiedot -varusteelle pitää keksiä uusi merkitys

Omistaja ei löytänyt maalehteä pelistä (8.8.2026: *"En pääse Saksan
lehteen mistään?"* ja *"Kartalta pitäisi päästä myös"*). Maalehden
ainoa normaalireitti oli kaupunkilehden etusivun pieni kulmalinkki
"Saksa-osio ›", ja kartalta se aukesi vain Maiden tiedot -varusteella,
joka ansaitaan kokemuspisteillä.

v382:ssa löydettävyys korjattiin kolmella reitillä: kartan oma
"Maiden lehdet" -nappi, maaosion rivi kaupunkilehden
sisällysvalikossa ja sama valikko käyttöön myös kaupunkilehdessä.

v386:ssa kaksi jälkimmäistä otettiin pois omistajan päätöksellä:
*"Kaupunkilehdessä on niin vähän sivuja että se on turha."*
Reiteiksi jäivät kartan nappi ja etusivun kulmalinkki, jotka
omistaja on kuitannut riittäviksi. Sisällysvalikko on siis
maalehden ominaisuus, eikä kaupunkilehdellä ole sisällysluetteloa
lainkaan — se on tarkoitus, ei puute.

**Varuste jätettiin ennalleen tarkoituksella** (Fablen ohje: älä
poista äläkä muuta tässä kirissä), mutta sen päähyöty on nyt
poissa — se avaa saman kartan tilan, johon pääsee ilmankin.
Omistaja päättää myöhemmin, tuleeko varusteelle uusi merkitys (esim.
maiden vertailu, tunnusluvut kartalle tai suodatin "mitkä maat olen
jo lukenut") vai poistetaanko se. Tätä EI ratkaista loppukirissä.
