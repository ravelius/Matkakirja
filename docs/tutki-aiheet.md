# Tutki-ikkunan aiheet — monistusresepti

## PÄÄTETTY 5.8.2026: maa kantaa aiheet, kaupunki kantaa kannen

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
  docs/tyolista-opukselle.md, "Lehtimaiden promptit".

Loput tämän tiedoston säännöt (kuvat, lisenssit, mitat, työkalu,
tarkistuslista) pätevät sellaisinaan molempiin tasoihin.

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

## PÄÄTETTY 5.8.2026: Tutki on paikallislehti (v270)

Omistajan visio: kansisivullinen kaupunki taittuu paikallislehdeksi.
Kaikki kolme mekanismia ovat datavetoisia — uusi maa tai kaupunki ei
vaadi koodimuutoksia:

- **Lehtitaitto (tarkennettu v277):** kun kaupungilla on aihe id:llä
  `kaupunki`, etusivu rakentuu esittelytekstin ja isojen kuvien
  varaan: masto (ylärivi, kaupungin nimi, päiväysrivi), sää, iso
  pääkuva, esittely, pienempien kuvien pari ja maa omana osastonaan —
  ilman Lue lisää -nappeja ja wikin kuvakarusellia (tekstien pitää
  riittää itsenään, kuvat ovat omia tarkistettuja valintoja
  kategorian `kansikuvat`-listasta). Kansiosion nostot saavat OMAN
  sivunsa heti etusivun jälkeen ja maan aiheet jatkuvat niiden
  perään. Ensimmäinen versio (v270) taittoi nostot etusivulle — sivu
  venyi liian pitkäksi ja maan ydintiedot hukkuivat; älä palaa
  siihen. Lehtimaan intro (esim. Italia europe-artikkelit.js:ssä)
  kirjoitetaan muita pidemmäksi, koska se kantaa maaosaston yksin.
  Muut kaupungit näyttävät etusivun entiseen tapaan
  (`.dialog.lehti`-luokka ohjaa kaiken).
- **Teosgalleria:** nosto voi kantaa `galleria: [{ otsikko, tiedosto,
  selite, lahde }]` -listan (pilotti: Venetsian Canaletto, 6 teosta).
  Noston kuva saa selailunuolet ja laskurin; selite- ja lähderivit
  vaihtuvat teoksen mukana. Suurennos avaa kohdalla olevan teoksen ja
  KOKO SARJAN selattavana täydellä ruudulla (v277) — sama koskee
  etusivun kansikuvia. Peilityökalu poimii galleria- ja kansikuvien
  `tiedosto:`-kentät automaattisesti.
- **Sää (v272):** lehtikaupunki saa mastoon päivän ennusteen ja
  napautuksesta koko vuoden graafin, kun sille on rivi
  `js/packs/saatiedot.js`:ssä (lat/lon + kuukausinormaalit; normaalien
  laskutapa kerrotaan tiedoston alussa). Ilman riviä lehti näkyy
  ilman säätä — mitään ei tarvitse koodata.
- **Kohtaaminen (v274):** "Etsi kätkö" -napin tilalla kohtaamis-
  kaupungissa on hahmon kutsu (esim. "Tapaa gondolieeri"), ja hahmo
  kehystää aarretehtävän tervehdyksineen ja repliikkeineen. Data:
  `js/packs/kohtaamiset.js` (hahmo, nappi, frame, tervehdys, loyto,
  tyhja, vaarin) — uusi kaupunki ei vaadi koodia.
- **Uutiset (v276, hiottu v280):** maaosastossa "Uutisissa tänään" —
  kolme tuoretta otsikkoa paikallisella kielellä pienellä kirjaimella
  maan kartan oikealla puolella (leveällä ruudulla), kun maalla on
  lähde `js/packs/uutislahteet.js`:ssä ja omistajan uutisvälitys on
  käytössä (tools/uutisproxy/OHJE.md; workerin sallitut ovat
  ETULIITTEITÄ, koska myös artikkelisivut haetaan sen kautta).
  Otsikoita ei lyhennetä eikä mukailla. Popup EI tummenna taustaa:
  otsikko, suomennos heti sen alla kevyellä kursiivilla (ilman
  etikettiä), KOKO artikkelin leipäteksti uutissivulta
  ([itemprop="articleBody"]; syötteen kuvaus on varateksti) ja
  "Käännä suomeksi" -nappi, jonka käännös KORVAA alkuperäisen (nappi
  vaihtaa niiden välillä — molemmat eivät mahdu kortille). Sähkeillä
  on suomennos otsikon alla ja artikkelin pikkukuva vieressä.
- **Mediarivi (v284):** maan radio ja tv-kanavan suora lähetys
  vierekkäin uutisten alla (`TV_KANAVAT` uutislahteet.js:ssä;
  YouTuben kanavaupotus live_stream?channel=... seuraa aina
  kulloistakin lähetystä). Tv aukeaa popupiin 16:9-upotuksena.
- **Minitehtävä:** aihe voi kantaa `tehtava: { kysymys, vaihtoehdot,
  oikea, fakta }` (pilotti: Italian Ruoka). Se piirtyy sivun loppuun
  kuponkimaisena tehtäväpalstana, ja vastaus LÖYTYY SAMAN SIVUN
  TEKSTISTÄ — se on lukemisen palkinto, ei tietovisa. Palkkio 10
  puntaa, kerran per lehti (game.actionMinitehtava, avain
  pakka:kaupunki:aihe). Vähintään yksi tehtävä lehteä kohti; sivu saa
  vaihdella maasta toiseen kuin ristikko lehden eri sivuilla.

*Kirjattu v220:ssä, kun Lontoon pilotti (9 aihetta, 54 nostoa) hiottiin
monistettavaksi. Tämä on resepti seuraaville kaupungeille — Lontoo on
mallikappale, jota vasten uutta kaupunkia verrataan.*

## Rakenne

Kaupungin aiheet asuvat `js/packs/kulttuuri-kategoriat.js`:ssä avaimella
`KULTTUURI_KATEGORIAT[cityId]` (paljas kaupunki-id, ei laudan tunnusta —
toimii siksi kaikilla laudoilla automaattisesti). Kategoria:

```js
{
  id: 'historia',          // pieni kirjain, ei ääkkösiä eikä välejä
  nimi: 'Historia',        // näkyy avatun aiheen otsikkona ja aria-labelina
  johdanto: '…',           // 1–2 virkettä: mitä täältä löytyy (154–232 mrk)
  ikoni: '<path …/>',      // VALINNAINEN: oma viivakuvake (24×24, pelkkä ääriviiva)
  nostot: [ { otsikko, teksti, tiedosto, selite, lahde, wiki?,
              musiikki?, musiikkiNimi?, musiikkiNayte?, musiikkiNayteNimi?,
              esikuuntelu?, aani?, aaniLahde? } ],
}
```

Musiikin kuunteluun on kaksi reittiä (7.8.2026): `musiikkiNayte` on
vapaasti lisensoitu äänite (Commons/archive.org; ogg/opus ei soi
iPadilla — käytä mp3:a tai Commonsin transcoded-mp3-osoitetta ja
tarkista se curlilla). Kun vapaata äänitettä ei ole (pop, iskelmä),
anna `esikuuntelu`-kenttään iTunes-hakutermi (esim. `'ABBA Waterloo'`)
— peli hakee Applen 30 s esikuuntelun lennossa. Esikuuntelunostolla on
oltava myös `musiikki`-linkki (Applen ehto). Tarkista termi ennen
julkaisua: `curl 'https://itunes.apple.com/search?term=…&entity=song&limit=1'`
— ensimmäisen osuman pitää olla oikea esittäjä ja kappale.

Kuvake katsotaan järjestyksessä: `kategoria.ikoni` → `AIHE_IKONIT[id]`
(ui.js: vakioaiheet historia, kuvataide, kirjallisuus, musiikki, ruoka,
luonto, tiede, nykytaide, huumori) → yleiskuvake (kirjanmerkki). Uusi
kaupunki ei siis koskaan vaadi koodimuutosta — mutta **käytä vakioaiheita
aina kun voit**, jotta kuvakkeet pysyvät tuttuina kaupungista toiseen.

## Mitat, jotka pitävät

- **Aiheita enintään 9** — yhdeksän kuvaketta mahtuu yhdelle riville
  kapeimmallakin puhelimella (360 px). Kymmenes rikkoo rivin.
- **Nostoja 4–7 per aihe**, tekstit 440–660 merkkiä. Johdanto kursiivilla
  aiheen ylle.
- **Yksi kuva esiintyy kaupungissa vain kerran.** Sama tarina ei saa
  toistua kahdessa aiheessa (Lontoosta siivottiin kaksi tällaista paria).

## Kuvat

- Commons-tiedosto, leveys ≥ 1200 px, lisenssi PD/CC0/CC BY/CC BY-SA,
  ja kuvan SISÄLTÖ tarkistettu silmin selitettä vasten.
- Lähdemerkintä aina muodossa `Tekijä, Wikimedia Commons (LISENSSI)` —
  lisenssiin `(PD)`, ei `(public domain)`. Lisenssi käskee nimetä tekijän.
- Kuvat päätyvät R2-peiliin itsestään: push mainiin käynnistää
  `.github/workflows/peilaa.yml`:n, joka peilaa uudet viittaukset.

## Kulttuurivisa ja litteä taulu

Kulttuurivisa (`kysymys`) asuu yhä litteässä taulussa
(esim. `EUROPE_KULTTUURI[cityId].kysymys`) ja piirtyy saapumiskortille.
Kun kaupunki saa kategoriat, sen litteät `nostot` eivät enää näy —
siirrä niiden ainutlaatuinen sisältö (etenkin musiikkilinkit ja
ääninäytteet) kategorioihin ja jätä litteään tauluun vain `kysymys`.
Varmista, että visan opettava nosto on kategorioissa näkyvillä.

## Työkalu

```
node tools/kirjoita-kategoriat.mjs <sisaan.json> js/packs/kulttuuri-kategoriat.js KULTTUURI_KATEGORIAT <kaupunki>
```

Kirjoitus on yhdistävä: muut kaupungit säilyvät, oma korvautuu.
Työkalu hylkää nostot, joiden kuva on alle 1200 px tai joiden
lähdemerkinnästä puuttuu tekijä — hylkäykset listataan ajon lopuksi.

**ÄLÄ aja tätä `js/packs/maa-kategoriat.js`:lle.** (Opittu v347:ssä
kantapään kautta.) Työkalu kirjoittaa kohdetiedoston KOKONAAN uusiksi
omalla otsakkeellaan, ja siinä katoaa kaksi asiaa kerralla:

1. **Tiedoston muut viennit.** maa-kategoriat.js sisältää myös
   `MAAN_GENETIIVIT`-taulun sekä funktiot `maanGenetiivi` ja
   `maanAiheOtsikko`. Ne katoavat, ja peli kaatuu tuontivirheeseen.
2. **Kentät, joita työkalu ei tunne.** Uudelleensarjallistus kirjoittaa
   vain otsikko/teksti/tiedosto/selite/lahde/wiki/musiikki*-kentät —
   `aika`, `tehtava`, `esikuuntelu`, `kansikuvat` ja `galleria` putoavat
   pois KAIKILTA mailta, myös niiltä joita ei ollut muuttamassa.

Petollisinta on, että ajo näyttää onnistuneen: se tulostaa "0
kategoriaa, 0 nostoa" (koska JSON on eri muotoa kuin se odottaa) ja
kirjoittaa silti tiedoston. Vahinko näkyy vasta testeissä.

Maan aiheet lisätään käsin. Muotoilun saa talon näköiseksi
generoimalla pelkän lohkon ja liittämällä sen paikalleen — vertaa
naapurimaan lohkoon ennen kuin liität.

## Tarkistuslista ennen julkaisua

1. `node tools/tarkista-kaksoisavaimet.mjs` ja koko testistö.
2. Avaa kaupunki selaimessa: aiherivi yhdellä rivillä (myös 360 px),
   jokainen aihe aukeaa, kuvat latautuvat, Lue lisää -napit toimivat.
3. Kuvien tekijämerkinnät näkyvät jokaisessa nostossa.
4. Kulttuurivisa aukeaa saapumiskortilta ja sen aihe löytyy aiheista.

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

## Loppu-QA:n tarkistuslista: tunnetut kuvatoistot

Nämä on löydetty työn aikana ja jätetty TARKOITUKSELLA korjaamatta
(Fablen ohje 8.8.2026: kirjaa listalle, korjaus tehdään QA-kierroksella
jos omistaja pitää niitä ongelmana). Molemmat ovat toistoa, eivät
virhettä — kuva on oikea ja lisenssi kunnossa kummassakin paikassa.

1. **Vasa-laiva kahdessa paikassa.**
   `Lateral view of the Vasa ship, Vasa Museum, Stockholm, Sweden
   julesvernex2.jpg` on sekä Ruotsin Historia-aiheessa
   (maa-kategoriat.js SWE) että Tukholman kannessa
   (kulttuuri-kategoriat.js). Vanha, ei tämän kirin tekemä. Sama
   pelaaja näkee molemmat, koska Tukholmassa käydessä maalehti on
   yhden napautuksen päässä.

2. **Kattohaikara pesällä kahdessa maassa.**
   Ukrainan menovinkkien `Family of White storks (35609152356).jpg` ja
   Bulgarian `White stork (Ciconia ciconia) Yastrebets.jpg`. Eri
   tiedostot ja eri maiden lehdet, mutta aihe on sama. Etsin
   Bulgarialle korvaajaa (lentävä pikkukorppikotka, Musalan huippu);
   molemmat olivat mitattavasti heikompia 84 pikselissä, joten kuva
   jäi ennalleen. Jos tämä korjataan, korvaajan pitää olla yhtä
   luettava pienenä — huono kuva on pahempi kuin toisto.

3. **Surun maski kahdesti Magadanissa** (Fablen päätös 15.8.2026,
   Siperian erä 2). Lehden nosto käyttää tiedostoa `Маска Скорби.jpg`
   ja asia-valokuvat.js:n magadan-lohkossa on `Memorial magadan -
   panoramio.jpg` samasta muistomerkistä. Eri tiedostot, sama kohde.
   Noston kuvan on pakko olla maski (teksti kertoo juuri siitä),
   joten toisto hyväksytään samalla linjalla kuin Vasa ja
   kattohaikara.

Tarkistus, joka kannattaa ajaa QA:ssa: koko paketin duplikaattihaku
(kansikuvat + nostot + galleriat + listat) löytää nämä ja kaikki
myöhemmin syntyvät. Skripti on scratchpadissa, mutta sen voi kirjoittaa
uusiksi kymmenessä rivissä — olennaista on, että se katsoo KAIKKI
kuvakentät eikä vain nostojen tiedostoja. Ajettu v407:ssa: 314 kuvaa,
ei yhtään uutta duplikaattia.

## Kolme vikaa, jotka toistuvat agenttien tuottamassa lehtityössä

Nämä eivät ole yksittäistapauksia vaan sama vika eri kaupungeissa.
Kannattaa tarkistaa jokaisesta erästä erikseen.

1. **Käyttäjänimen takaa arvattu oikea nimi.** Barcelonan kansikuvan
   lähteeksi oli kirjoitettu "Pere López", vaikka Commons nimeää
   tekijäksi käyttäjänimen `pere prlpz`. Arvaus näyttää siistimmältä ja
   on tekijänoikeusvirhe. CC BY -kuvissa tekijä on kirjoitettava juuri
   niin kuin `extmetadata.Artist` sen antaa. Lyhenteen saa avata vain
   tarkistettuna (CNG = Classical Numismatic Group).

2. **Minitehtävä osuu kaupungin omaan kulttuurivisaan.** Ateenan
   ensimmäinen tehtävä kysyi foustanella-hameen 400 laskosta — ja
   `europe-kulttuuri.js`:n ateena-visa kysyy jo "Mitä evzonin puvun 400
   laskosta esittävät?" eli antaa luvun kysymyksessään. Kirjoittaja ei
   lukenut visaa, vaikka ohje käskee. Tarkista aina kaupungin
   `kysymys`-kenttä ennen kuin hyväksyt tehtävän.

3. **Fakta on lähdevirke sanasta sanaan, tai siihen on lisätty
   syy-yhteys.** Istanbulin ja Dublinin faktoista oli vaihdettu vain
   sidesana. Istanbulin bozafakta väitti, että juoma saa paksuutensa
   viljasta — lähde ei sano niin. Kumpikin menee helposti läpi, koska
   teksti kuulostaa oikealta.

Kahdeksasta v407:n uudesta minitehtävästä kaikki kahdeksan hylättiin
ensimmäisellä kierroksella. Riippumaton tarkistaja, joka ei näe
kirjoittajan perusteluja ja jolle sanotaan "oleta että jotain on
pielessä", löytää nämä. Pelkkä kirjoittajan oma tarkistus ei löydä.

## Venäjän kaupungit ja Kabul: mukaan, mutta ilman uutisosiota (omistajan linjaus 13.8.2026)

Aasian laudalla on kahdeksan venäläistä kaupunkia (Jekaterinburg,
Novosibirsk, Irkutsk, Jakutsk, Magadan, Kamtšatka, Sahalin,
Vladivostok) sekä Kabul. Ne tehdään normaalisti, neljällä ehdolla:

1. **Ei nykysotasisältöä eikä nykypolitiikkaa missään muodossa.** Sama
   sääntö kuin muualla pelissä. Historialliset tapahtumat ja taistelut
   ovat tavallista historiaa ja sallittuja.
2. **Painotus 1873-henkiseen historiaan, kulttuuriin, maantieteeseen
   ja arkkitehtuuriin.** Isoisän aikakauden näkökulma kantaa nämä
   kaupungit luontevasti.
3. **Uutisosio jätetään pois** Venäjän kaupungeista ja Kabulista:
   valtiollista tai sensuroitua mediaa ei oteta uutislähteeksi, eikä
   korvaavaa riippumatonta paikallislähdettä ole. Lehti toimii ilman
   uutisosiota täsmälleen kuten ei-lehtimaissakin.
4. **Neutraalit maantieteelliset nykytosiasiat saavat näkyä**
   wiki-tiivisteissä, esimerkiksi hallinnollinen asema — sama
   ennakkopäätös kuin Nikosiassa ("Antaa olla").
