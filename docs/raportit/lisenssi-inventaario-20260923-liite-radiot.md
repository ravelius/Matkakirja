# Radiovirtojen käyttöehdot kaupalliseen upotukseen

Selvitys tehty repossa haara siirtoseppa-lisenssit (main 0891b81dd) (ei muutettu
mitään repon tiedostoja). Päivätty 2026-09-23.

## 1. Miten peli valitsee ja soittaa virrat (tekninen tausta)

- **Lähde:** `js/packs/radiot.js` on koneellisesti tuotettu tiedosto (komennot
  `node tools/hae-radiot.mjs` + `node tools/kirjoita-radiot.mjs`), joka hakee
  asemat Radio Browser -palvelusta (radio-browser.info). 115 riviä/maata
  taulukossa (tiedoston oma kommentti puhuu 113:sta — luku on jäänyt jälkeen
  käsin lisätyistä SVK/SVN/BEL/LUX/MLT-asemista).
- **Valintasääntö** (`tools/hae-radiot.mjs`): ensin maan virallinen
  ykkösradio (nimimallilla tunnistettuna), sen puuttuessa mikä tahansa maan
  asema Radio Browserista, ja varareittinä vanha 3 minuutin äänite
  (`js/packs/europe-kielet.js`). Osoite tarkistetaan aina hakemalla (HTTP 200
  + ääntä), koska hakemiston oma "toimii"-tieto voi olla vanhentunut.
- **Soitto on SUORA VIRTA, EI VÄLITYSPALVELINTA EIKÄ TALLENNUSTA.**
  `js/linssit/radio.js` rivi ~1230–1245: `const audio = new Audio(); …
  audio.src = kanava.url;` — selain avaa aseman oman julkisen HTTPS-striimin
  suoraan samalla tavalla kuin aseman oma nettisoitin tekisi. Peli ei toimi
  proxyna, ei tallenna eikä leikkaa lähetystä; se vain soittaa asemien omia,
  jo julkisia stream-osoitteita (jotka usein kulkevat kolmannen osapuolen
  CDN:ien, kuten Zeno.fm, StreamTheWorld, Radio.co, Airtime.pro tai
  icecast/shoutcast-palvelinten, kautta — nämä ovat pelkkiä teknisiä
  jakelualustoja eivätkä anna lisenssiä itse sisältöön, ks. kohta 2).
- Lisenssihuomautus on jo kirjattu peliin `js/lahteet.js`:ään (n. rivi
  292–298): "Asemaluettelo vapaasti käytettävä (Radio Browser); lähetykset
  asemien omilla ehdoilla" ja huomio, että Radio Browserin oma ehto on
  "this webservice can be used freely" eikä erillistä lisenssitekstiä ole,
  ja että "lähetyksillä ei ole yhteistä lisenssiä eikä peli välitä niitä
  edelleen: selain avaa aseman oman julkisen virran suoraan […] eikä sitä
  tallenneta." Tämä selvitys tarkentaa juuri sitä väitettä kaupallisen
  App Store -julkaisun näkökulmasta.

## 2. Radio Browser -palvelun ehdot

- **Data (asemaluettelo: nimet, tagit, virta-URL:t, kotisivut, kieli, maa):**
  julkisrekisteriä vastaava — sivusto ilmoittaa keräämänsä datan olevan
  vapaasti käytettävissä ("public domain"), ei ODbL:n alainen (ODbL on eri,
  OpenStreetMapin käyttämä lisenssi — ei sovi tähän).
- **Ohjelmisto:** GPL, avoin lähdekoodi.
- **API/palvelu:** "the webservice can be used freely but without guarantee
  to work"; ei erillistä maksua tai avainta.
- **KRIITTINEN RAJAUS: Radio Browser ei myönnä eikä välitä mitään oikeuksia
  itse radiolähetyksiin (stream-sisältöön).** Se on vain hakemisto osoitteista
  — täsmälleen sama huomio kuin pelin oma `js/lahteet.js`-kommentti jo tekee.
  Jokaisen aseman oma lähetys on aseman/lähetysyhtiön omistamaa sisältöä ja
  sen omien ehtojen alainen, riippumatta siitä että osoite löytyi Radio
  Browserista. Radio Browserin lisenssi kattaa VAIN luettelotiedon (mikä
  asema on olemassa ja missä sen virta on), ei oikeutta upottaa virtaa
  kaupalliseen sovellukseen.

Lähteet: radio-browser.info, docs.radio-browser.info.

## 3. Asemakohtaiset/yhtiökohtaiset ehdot (tarkistettu ryhmä)

Hakubudjetti (~40 hakua) riitti syvempään tarkistukseen vain suurimmille,
läntisille julkisen palvelun yleisradioille (task-listan mukaiset esimerkit)
sekä muutamalle muulle isolle toimijalle. Tulokset:

| Yhtiö | Maat pelissä | Tulos | Peruste/lähde |
|---|---|---|---|
| **BBC** | GBR (World Service), UGA (relee "BBC Radio Uganda") | **KIELLETTY** | BBC vaatii 3. osapuolen alustoilta joko käyttäjän kirjautumisen BBC-tunnuksella tai kuuntelijadatan jakamisen sopimuksella; ilman sopimusta BBC on poistanut striiminsä esim. TuneIn-palvelusta (2019). Ei yleistä lupaa vapaalle upotukselle. |
| **Yle** | FIN | **KIELLETTY** | yle.fi/a/20-10004373: "Et saa käyttää Ylen nettiradioiden striimejä suoraan omilla sivuillasi." Poikkeus koskee vain Yle Areenan OMAN tuotannon jakamista upotuskoodilla — ei striimiosoitteen suoraa käyttöä. |
| **Radio France** | FRA (France Inter) | **KIELLETTY** | radiofrance.com CGU: striimiosoitteet annettu yksityiskäyttöön; muu käyttö → distribution@radiofrance.com. (VNM:n RFI Tiếng Việt on eri oikeushenkilö, France Médias Monde — ei erikseen tarkistettu, mutta sama varovaisuus suositeltava.) |
| **ARD / Deutschlandradio** | DEU (Deutschlandfunk) | **KIELLETTY** | LG München 5/2025 -oikeuskäytäntö ja ARD:n oma linja: Medienstaatsvertrag ei perusta yleistä jakeluvelvoitetta kaupallisille kolmansille osapuolille; kaupallinen käyttö vaatii luvan. |
| **RTVE** | ESP (RNE Radio 5) | **KIELLETTY** | RTVE rajoittaa käytön viralliseen sovellukseen laatu-/attribuutio-/tekijänoikeussyistä; epäviralliset sovellukset estetään. |
| **NRK** | NOR (P1) | **KIELLETTY** | Striimit "developed for private use"; uusien palvelujen tekeminen ilman NRK:n hyväksyntää ei ole sallittua. |
| **Sveriges Radio** | SWE (P1) | **KIELLETTY** | API-ehdot sallivat kaupallisen käytön rajoitetusti, mutta linjaaristen (suorien) kanavien käyttö vaatii SR:n kirjallisen ennakkosuostumuksen. |
| **ORF** | AUT (Ö1) | **KIELLETTY** | ORF ON -ehdot: sisältö yksinomaan yksityiskäyttöön; kaupallinen jakelu kolmannelle vaatii sopimuksen. |
| **SRG SSR** | CHE (RTS La Première) | **KIELLETTY** | Kehittäjäportaalin API:t "may only be used for non-commercial purposes." |
| **NPO** | NLD (Radio 1) | **KIELLETTY** | Ehdot kieltävät nimenomaisesti sisällön sisällyttämisen "own website, app, widget, gadget or other service"; vain henkilökohtainen ei-kaupallinen käyttö sallittu. |
| **CBC/Radio-Canada** | CAN (Radio One) | **KIELLETTY** | Kaupallinen/liiketoiminnallinen käyttö vaatii "prior written permission." |
| **ABC (Australia)** | AUS (Radio National) | **KIELLETTY** | Sisältö "personal, non-commercial use only"; ks. myös oma ohjeartikkeli 3. osapuolen alustoista. |
| **RTHK** | HKG (Radio 1) | **KIELLETTY** | Käyttö rajattu "non-commercial personal use or non-commercial internal use"; kaupallinen käyttö vaatii kirjallisen luvan. |
| **RTP** | PRT (RDP Internacional) | **KIELLETTY** | Sisältö "personal and non-commercial use"; muu käyttö vaatii RTP:n ennakkosuostumuksen. |
| **VRT** | BEL (Radio 1) | **KIELLETTY** | Käyttö vain "persoonlijke, niet-commerciële doeleinden"; VRT julkaisee striimilinkit mutta ei myönnä niille kaupallista lisenssiä. |
| **DR** | DNK (P1) | **EPÄSELVÄ** | Virallista DR:n omaa käyttöehtolähdettä ei löytynyt haulla (vain kolmannen osapuolen sivusto danmarkradio.com, joka ei ole DR) — sama muiden Pohjoismaiden linja tekee KIELLETTY-tulkinnan todennäköisemmäksi, mutta lähdettä ei ole. |
| **RAI** | ITA (Radio 1) | **EPÄSELVÄ** | Ei löytynyt yksiselitteistä lauseketta 3. osapuolen kaupallisesta upotuksesta; muiden EU-yleisradioiden linjan perusteella todennäköisesti luvanvarainen. |
| **TRT** | TUR (Radyo 1) | **EPÄSELVÄ** | Yleiset käyttöehdot eivät myönnä käyttöoikeutta/lisenssiä ilman kirjallista lupaa, mutta nimenomaista suorien lähetysten upotuslauseketta ei löytynyt. |
| **RTÉ** | IRL (Radio 1) | **EPÄSELVÄ** | RTÉ jakaa sisältöä hallituilla kumppanuuksilla (Alexa, Spotify) — ei löytynyt yleistä lupaa vapaalle upotukselle eikä nimenomaista kieltoa. |

**Johtopäätös:** JOKAINEN tarkistettu julkisen palvelun yleisradio joko
KIELTÄÄ nimenomaisesti kaupallisen/kolmannen osapuolen upotuksen ilman
erillistä sopimusta, tai sen ehdoissa ei ole mitään, mikä sen SALLISI
(EPÄSELVÄ → oletus on tulkita KIELLETTY:n suuntaisesti kunnes toisin
osoitetaan). **Yhtään SALLITTU-tapausta ei löytynyt koko tarkistetusta
joukosta.** Tarkistamattomien 96 aseman kohdalla (suurin osa maailman
valtio- tai kaupallisista radioista) ei ole syytä olettaa parempaa — päin
vastoin, monilla ei ole edes julkisia englanninkielisiä käyttöehtoja
ollenkaan, mikä sekin tarkoittaa "vaatii luvan" oletusarvoisesti.

## 4. Musiikin tekijänoikeus (Teosto/Gramex-tyyppiset korvaukset)

- Suomessa Teosto (säveltäjät/sanoittajat/sovittajat/kustantajat) ja Gramex
  (esittäjät/äänitetuottajat) keräävät korvauksia musiikin käytöstä; Gramex
  kerää korvauksia myös kaupallisilta radioasemilta ja Yleltä itse
  LÄHETYKSESTÄ.
- **Epävarmuus, jota EI ratkaistu tässä selvityksessä:** kun sovellus itse
  AVAA ja TOISTAA suoraa radiovirtaa käyttäjälle (ei vain linkitä asemalle),
  kyse voi tekijänoikeuslain systematiikassa olla erillisestä
  "edelleenvälityksestä" tai "yleisölle välittämisestä", joka on eri oikeus
  kuin itse alkuperäisen lähetyksen tekijä-/lähioikeuskorvaus, jonka ASEMA
  on jo maksanut omalle maansa järjestölle. Tästä seuraa, että:
    - Asema/lähetysyhtiö on jo lisensoinut OMAN lähetyksensä musiikin
      kotimaassaan.
    - Kolmannen osapuolen sovellus, joka soittaa saman virran suoraan
      (kuten Matkakirja tekee `new Audio()`-elementillä ilman tallennusta
      tai muokkausta), TODENNÄKÖISESTI ei synnytä uutta erillistä
      äänitekorvausvelvoitetta Teostolle/Gramexille SITÄ SAMAA
      lähetyshetkeä kohti, koska kyse ei ole tallenteen soittamisesta vaan
      alkuperäisen lähetyksen suorasta läpivälityksestä käyttäjän
      selaimeen (tekninen "framing/relay", ei uusi julkinen esitys).
      TÄTÄ TULKINTAA EI KUITENKAAN OLE VARMISTETTU OIKEUDELLISESTI eikä
      Teostolta/Gramexilta kysytty — se on juristin tarkistettava tapaus.
    - Jos joku maa/asema tulkitsee sovelluksen upotuksen omaksi
      "julkiseksi esitykseksi" (esim. koska sovellus on kaupallinen peli,
      ei yksityinen kuuntelu), voi syntyä vaatimus erillisestä luvasta
      RIIPPUMATTA siitä, mitä radiotoimija itse sanoo — tämä on juuri se
      alue, jolla asemien omat käyttöehdot (kohta 3) nimenomaisesti
      kieltävät kolmansien upotuksen: todennäköinen syy on juuri tämä
      mahdollinen lisäkorvausvastuu, ei pelkkä bränditurvallisuus.
  **Suositus: älä nojaa oletukseen "asema on jo maksanut, joten sovellus on
  turvassa" — kysy asiasta erikseen Teostolta/Gramexilta (tai vastaavalta
  ulkomaiselta järjestöltä) ennen kaupallista julkaisua, JOS striimien
  upotusta ylipäänsä jatketaan ilman asemien lupia.**

Lähteet: teosto.fi, gramex.fi, musiikkiluvat.fi.

## 5. Täydellinen asemataulukko (115 asemaa)

Sarake "Tyyppi" on paras arvio (julkinen/kaupallinen/valtiollinen/muu)
asemanimen ja tunnetun taustan perusteella — EI vahvistettu jokaisen aseman
kohdalla erikseen. "EPÄSELVÄ ilman erillistä tutkimusta" -rivit ovat
oletusarvoisesti "vaatii luvan", kuten tehtävänannossa pyydettiin.

| Maa | Asema | Yhtiö/omistaja | Tyyppi | Luokka | Peruste / lähde |
|---|---|---|---|---|---|
| AFG | Radio Begum (Kabul) | Radio Begum (riippumaton, maanpaossa) | muu/kansalaisjärjestö | EPÄSELVÄ | Ei julkisia upotusehtoja löytynyt; ei tutkittu erikseen (resurssisyy) |
| AGO | Rádio Luanda (RNA) | Rádio Nacional de Angola (RNA) | julkinen (valtio) | EPÄSELVÄ | Ei tutkittu erikseen; oletetaan luvanvaraiseksi kuten muut valtio/yleisradiot |
| ARE | Sharjah FM 94.4 (إذاعة الشارقة) | Sharjah Media Corporation (SBA) | julkinen (emiraatin valtio) | EPÄSELVÄ | Ei tutkittu erikseen |
| ARG | LRA1 Radio Nacional Argentina | Radio Nacional Argentina (RTA, valtio) | julkinen (valtio) | EPÄSELVÄ | Ei tutkittu erikseen |
| AUS | ABC Radio National | ABC (Australian Broadcasting Corporation) | julkinen | KIELLETTY | ABC Terms of Use: sisältö "personal, non-commercial use only"; ks. myös artikkeli "Changes to ABC Radio Live Streams on Third Party Platforms" (help.abc.net.au) — kaupallinen upotus vaatii luvan |
| AUT | Ö1 / ORF / HQ | ORF (Ö1) | julkinen | KIELLETTY | ORF ON -käyttöehdot: sisältö "ausschließlich für den privaten Gebrauch"; kaupallinen jakelu kolmannelle ei sallittu ilman sopimusta |
| BEL | VRT Radio 1 (Vlaanderen) | VRT (Radio 1) | julkinen | KIELLETTY | VRT gebruiksvoorwaarden: käyttö vain "persoonlijke, niet-commerciële doeleinden"; VRT julkaisee striimilinkit tietoisena 3.-osapuolen sovelluksista, muttei myönnä niille kaupallista lupaa |
| BGR | BNR Horizont | Bulgarian National Radio (BNR) | julkinen | EPÄSELVÄ | Ei tutkittu erikseen |
| BIH | Federalni radio (RTVFBiH) | RTVFBiH (Federalni radio) | julkinen | EPÄSELVÄ | Ei tutkittu erikseen |
| BOL | Radio Panamericana | Radio Panamericana | kaupallinen | EPÄSELVÄ | Kaupallinen asema, ei julkisia ehtoja — oletus "vaatii luvan" |
| BRA | BandNews FM | BandNews FM (Grupo Bandeirantes) | kaupallinen | EPÄSELVÄ | Kaupallinen verkosto, ei julkisia upotusehtoja |
| CAN | CBC Radio One - Toronto, ON (MP3 stream) | CBC/Radio-Canada | julkinen | KIELLETTY | CBC/Radio-Canada Terms of Use: kaupallinen/liiketoiminnallinen käyttö vaatii "prior written permission"; sisällön jakelu kolmansille vain luvalla |
| CHE | RTS La Première | SRG SSR (RTS La Première) | julkinen | KIELLETTY | SRG SSR Developer Portal: API:t "may only be used for non-commercial purposes"; suoran lähetyksen kaupallinen upotus vaatii sopimuksen |
| CHL | Radio Bio Bio Temuco | Radio Bio Bio | kaupallinen | EPÄSELVÄ | Kaupallinen asema, ei julkisia ehtoja |
| CHN | CNR-1 中国之声 | China National Radio (CNR, valtio) | julkinen (valtio) | EPÄSELVÄ | Ei tutkittu erikseen; valtiollinen media, luultavasti tiukasti luvanvarainen |
| CMR | Radio Bafung | Radio Bafung | kaupallinen/paikallinen | EPÄSELVÄ | Ei julkisia ehtoja löytynyt |
| COD | Top Congo FM 88.4 (Kinshasa) | Top Congo FM | kaupallinen | EPÄSELVÄ | Ei julkisia ehtoja löytynyt |
| COL | Caracol Radio - 100.9 FM / 810 AM - HJGL / HJCY - | Caracol Radio (Grupo PRISA/Caracol) | kaupallinen | EPÄSELVÄ | Suuri kaupallinen verkosto, ei julkisia upotusehtoja tarkistettu |
| CUB | Radio Rebelde 1180 AM | Radio Rebelde (valtio, ICRT) | julkinen (valtio) | EPÄSELVÄ | Ei tutkittu erikseen |
| CYP | ΡΙΚ Πρώτο Πρόγραμμα (CyBC) | CyBC (ΡΙΚ) | julkinen | EPÄSELVÄ | Ei tutkittu erikseen |
| CZE | ČRO Radiožurnál Sport | Český rozhlas (ČRo) | julkinen | EPÄSELVÄ | Ei tutkittu erikseen, mutta ARD/ORF/YLE-linjan perusteella todennäköisesti luvanvarainen |
| DEU | Deutschlandfunk / DLF / MP3 128k | Deutschlandradio / ARD | julkinen | KIELLETTY | Oikeuskäytäntö (LG München 5/2025) ja ARD:n linja: "Medienstaatsvertrag begründet keine allgemeine Verbreitungspflicht zugunsten kommerzieller Drittanbieter" — kaupallinen 3. osapuoli tarvitsee erillisen luvan |
| DNK | DR P1 | DR (Danmarks Radio) | julkinen | EPÄSELVÄ | Virallista DR-lähdettä ei löytynyt (vain kolmannen osapuolen sivusto danmarkradio.com, joka EI ole DR) — vaatii luvan, ellei muuta osoiteta |
| DZA | Algérie Chaine 1 | Radiodiffusion algérienne (valtio) | julkinen (valtio) | EPÄSELVÄ | Ei tutkittu erikseen |
| ECU | Radio Pichincha | Radio Pichincha | kaupallinen | EPÄSELVÄ | Ei julkisia ehtoja löytynyt |
| EGY | Radio 9090 / 90.90 FM Radio Egypt (Kairo) | Radio 9090 | kaupallinen | EPÄSELVÄ | Ei julkisia ehtoja löytynyt |
| ESP | Radio Nacional de España - Radio 5 Todo noticias | RTVE (Radio Nacional de España) | julkinen | KIELLETTY | RTVE rajoittaa lataukset/käytön viralliseen sovellukseen (RNE) laadun, attribuution ja tekijänoikeuksien vuoksi — epäviralliset/3. osapuolen sovellukset estetään |
| EST | Vikerraadio | ERR (Vikerraadio) | julkinen | EPÄSELVÄ | Ei tutkittu erikseen |
| ETH | EBC Radio 104.7 Addis Abeba | Ethiopian Broadcasting Corporation (EBC, valtio) | julkinen (valtio) | EPÄSELVÄ | Ei tutkittu erikseen |
| FIN | Yle Radio 1 Hifi | Yle (Yle Radio 1) | julkinen | KIELLETTY | Yle tekijänoikeusohje (yle.fi/a/20-10004373): "Et saa käyttää Ylen nettiradioiden striimejä suoraan omilla sivuillasi" — koskee myös sovelluksia, kaupallinen käyttö ei sallittu ilman lupaa |
| FJI | Radio Fiji One (FBC, fidžin kieli) | Fiji Broadcasting Corporation (FBC) | julkinen | EPÄSELVÄ | Ei tutkittu erikseen |
| FRA | France Inter | Radio France (France Inter) | julkinen | KIELLETTY | Radio France CGU: striimiosoitteet annettu yksityiskäyttöön ("usage privé"); muu käyttö edellyttää yhteydenottoa distribution@radiofrance.com |
| GBR | BBC World Service | BBC (World Service) | julkinen | KIELLETTY | BBC vaatii 3. osapuolen alustoilta joko kirjautumisen BBC-tunnuksella tai kuuntelijadatan jakamisen; ilman sopimusta BBC on esim. poistanut striiminsä TuneInistä (2019) — kaupallinen upotus ilman lupaa ei sallittu |
| GHA | Info Radio Ghana | Info Radio Ghana | kaupallinen/paikallinen | EPÄSELVÄ | Ei julkisia ehtoja löytynyt |
| GRC | ΕΡΤ Πρώτο Πρόγραμμα | ERT (Ελληνική Ραδιοφωνία Τηλεόραση) | julkinen | EPÄSELVÄ | Ei tutkittu erikseen |
| GRL | Nanoq FM (Nuuk) | Nanoq FM | kaupallinen/paikallinen | EPÄSELVÄ | Ei julkisia ehtoja löytynyt |
| GTM | Emisoras Unidas 89.7 | Emisoras Unidas | kaupallinen | EPÄSELVÄ | Ei julkisia ehtoja löytynyt |
| HKG | RTHK Radio 1 | RTHK (Radio Television Hong Kong) | julkinen (hallitus) | KIELLETTY | RTHK copyright-sivu: sisältö ladattavissa/käytettävissä vain "non-commercial personal use or non-commercial internal use" — kaupallinen käyttö vaatii kirjallisen luvan |
| HRV | HRT HR 1 - Prvi program | Hrvatska radiotelevizija (HRT) | julkinen | EPÄSELVÄ | Ei tutkittu erikseen |
| HUN | Kossuth | Magyar Rádió / MTVA (Kossuth) | julkinen | EPÄSELVÄ | Ei tutkittu erikseen |
| IDN | RRI Pro 3 KBRN | Radio Republik Indonesia (RRI, valtio) | julkinen (valtio) | EPÄSELVÄ | Ei tutkittu erikseen |
| IND | aakashvani | All India Radio / Prasar Bharati (valtio) | julkinen (valtio) | EPÄSELVÄ | Ei tutkittu erikseen |
| IRL | RTÉ Radio 1 | RTÉ (Radio 1) | julkinen | EPÄSELVÄ | RTÉ jakaa sisältöä hallituilla kumppanuuksilla (Alexa, Spotify) — ei löytynyt yleistä lupaa vapaalle 3. osapuolen upotukselle; vaatii selvennystä RTÉ:ltä |
| IRN | Radio Iran International | Radio Iran International (yksityinen, Lontoo) | kaupallinen/yksityinen | EPÄSELVÄ | Ei julkisia ehtoja löytynyt |
| IRQ | Radio Shafaq (Shafaq News) | Radio Shafaq (Shafaq News) | kaupallinen | EPÄSELVÄ | Ei julkisia ehtoja löytynyt |
| ISL | Útvarp Saga | Útvarp Saga | kaupallinen | EPÄSELVÄ | Ei julkisia ehtoja löytynyt |
| ITA | Rai Radio 1 | RAI (Radio 1) | julkinen | EPÄSELVÄ | Julkisia, yksiselitteisiä upotusehtoja ei löytynyt haulla; RAI:n yleinen linja muiden EU-yleisradioiden tapaan todennäköisesti luvanvarainen — vaatii varmistuksen |
| JOR | Hayat FM (Amman) | Hayat FM | kaupallinen | EPÄSELVÄ | Ei julkisia ehtoja löytynyt |
| JPN | エフエム世田谷 (FM Setagaya 83.4 MHz, Tokio) | FM Setagaya (paikallinen yhteisöradio) | kaupallinen/paikallinen | EPÄSELVÄ | Ei julkisia ehtoja löytynyt; HUOM: ei NHK |
| KAZ | Qazaq radiosy | Qazmedia (Qazaq radiosy, valtio) | julkinen (valtio) | EPÄSELVÄ | Ei tutkittu erikseen |
| KEN | KBC | Kenya Broadcasting Corporation (KBC) | julkinen | EPÄSELVÄ | Ei tutkittu erikseen |
| KOR | WBS 원음방송 서울 | 원음방송 (Won Buddhism -radio, yksityinen) | kaupallinen/uskonnollinen | EPÄSELVÄ | Ei julkisia ehtoja löytynyt; HUOM: ei KBS |
| KWT | moja (مُوجَة), Kuwait City | moja (مُوجَة) | kaupallinen | EPÄSELVÄ | Ei julkisia ehtoja löytynyt |
| LBR | LBS Radio (Liberia Broadcasting System) | Liberia Broadcasting System (LBS) | julkinen (valtio) | EPÄSELVÄ | Ei tutkittu erikseen |
| LBY | Radio Funun Tripoli (راديو فنون طرابلس) | Radio Funun Tripoli | kaupallinen/paikallinen | EPÄSELVÄ | Ei julkisia ehtoja löytynyt |
| LKA | SLBC Tamil National Service | Sri Lanka Broadcasting Corporation (SLBC) | julkinen | EPÄSELVÄ | Ei tutkittu erikseen |
| LTU | Žinių radijas | Žinių radijas | kaupallinen | EPÄSELVÄ | Ei julkisia ehtoja löytynyt |
| LUX | radio 100,7 (ERSL) | Établissement de Radiodiffusion Socioculturelle (ERSL, 100,7) | julkinen | EPÄSELVÄ | Ei tutkittu erikseen |
| LVA | Radio SWH+ | Radio SWH+ | kaupallinen | EPÄSELVÄ | Ei julkisia ehtoja löytynyt |
| MAR | MA:-Hit Radio Maroc | Hit Radio | kaupallinen | EPÄSELVÄ | Kaupallinen asema (merkintä "virallinen" datassa viittaa vain siihen että se on maan pääasema, ei omistukseen) |
| MDG | RNM | Radio Nationale Malagasy (RNM, valtio) | julkinen (valtio) | EPÄSELVÄ | Ei tutkittu erikseen |
| MEX | W Radio Ciudad de México - 96.9 FM / 900 AM - | W Radio (Grupo Fórmula / PRISA) | kaupallinen | EPÄSELVÄ | Ei julkisia ehtoja löytynyt |
| MLI | Radio Malijet | Radio Malijet | kaupallinen/yksityinen | EPÄSELVÄ | Ei julkisia ehtoja löytynyt |
| MLT | Calypso Radio 101.8 (Malta) | Calypso Radio 101.8 | kaupallinen | EPÄSELVÄ | Ei julkisia ehtoja löytynyt |
| MMR | Shwe FM (valtakunnallinen FM-verkko, Yangon) | Shwe FM | kaupallinen | EPÄSELVÄ | Ei julkisia ehtoja löytynyt |
| MNG | Гэр бүлийн радио 104.5 (Family Radio, Ulaanbaatar) | Гэр бүлийн радио (Family Radio) | kaupallinen | EPÄSELVÄ | Ei julkisia ehtoja löytynyt |
| MOZ | Rádio Moçambique | Rádio Moçambique (valtio) | julkinen (valtio) | EPÄSELVÄ | Ei tutkittu erikseen |
| NAM | Omulunga Radio 100.9 (Windhoek) | Omulunga Radio | kaupallinen | EPÄSELVÄ | Ei julkisia ehtoja löytynyt |
| NGA | Metro FM 97.7 (Radio Nigeria, Lagos) | Federal Radio Corporation of Nigeria (FRCN, valtio) — Metro FM | julkinen (valtio) | EPÄSELVÄ | Ei tutkittu erikseen |
| NIC | La Voz del Norte | La Voz del Norte | kaupallinen | EPÄSELVÄ | Ei julkisia ehtoja löytynyt |
| NLD | NPO Radio 1 | NPO (Radio 1) | julkinen | KIELLETTY | NPO:n yleiset ehdot: sisältöä ei saa sisällyttää "own website, app, widget, gadget or other service"; käyttö vain henkilökohtaiseen ei-kaupalliseen tarkoitukseen |
| NOR | NRK P1 (Stor-Oslo) | NRK (P1) | julkinen | KIELLETTY | NRK: striimit "developed for private use"; muu käyttö / uusien palvelujen luominen ilman NRK:n hyväksyntää ei ole sallittua |
| NPL | Kantipur FM | Kantipur FM | kaupallinen | EPÄSELVÄ | Ei julkisia ehtoja löytynyt |
| NZL | Newstalk ZB | Newstalk ZB (NZME) | kaupallinen | EPÄSELVÄ | Ei julkisia ehtoja löytynyt |
| OMN | Al Wisal (الوصال), Muscat | Al Wisal | kaupallinen/valtio | EPÄSELVÄ | Ei tutkittu erikseen |
| PAK | MERA FM 107.4 | MERA FM | kaupallinen | EPÄSELVÄ | Ei julkisia ehtoja löytynyt |
| PAN | La Exitosa Panamá | La Exitosa Panamá | kaupallinen | EPÄSELVÄ | Ei julkisia ehtoja löytynyt |
| PER | Radio RPP Noticias | RPP Noticias (Grupo RPP) | kaupallinen | EPÄSELVÄ | Ei julkisia ehtoja löytynyt |
| PHL | DZRH | DZRH (MBC Group) | kaupallinen | EPÄSELVÄ | Ei julkisia ehtoja löytynyt |
| PNG | Yumi FM (tok pisin, Port Moresby) | Yumi FM | kaupallinen/paikallinen | EPÄSELVÄ | Ei julkisia ehtoja löytynyt |
| POL | TOK FM | TOK FM (Grupa Agora) | kaupallinen | EPÄSELVÄ | Kaupallinen asema, ei Polskie Radio (valtio) — ei julkisia ehtoja löytynyt |
| PRT | RDP Internacional - Main | RTP (RDP Internacional) | julkinen | KIELLETTY | RTP:n yleiset käyttöehdot: sisältö vain "personal and non-commercial use"; kaikki muu käyttö vaatii RTP:n nimenomaisen ennakkosuostumuksen |
| QAT | Al Araby Radio (Doha/Lusail) | Al Araby Radio | kaupallinen | EPÄSELVÄ | Ei julkisia ehtoja löytynyt |
| ROU | Digi24 FM | Digi24 FM (RCS & RDS) | kaupallinen | EPÄSELVÄ | Ei julkisia ehtoja löytynyt |
| RUS | Вести ФМ | ВГТРК (Вести ФМ, valtio) | julkinen (valtio) | EPÄSELVÄ | Ei tutkittu erikseen; venäläinen valtiomedia — huomioi myös pakotteet/sanktioriskit erikseen kaupallisessa julkaisussa |
| SAU | SBA Riyadh Radio 91.5 FM | Saudi Broadcasting Authority (SBA) | julkinen (valtio) | EPÄSELVÄ | Ei tutkittu erikseen |
| SDN | Al Masaa FM 101 (Khartum) | Al Masaa FM | kaupallinen/yksityinen | EPÄSELVÄ | Ei julkisia ehtoja löytynyt |
| SDS | Freedom FM | Freedom FM | kaupallinen/yksityinen | EPÄSELVÄ | Ei julkisia ehtoja löytynyt |
| SEN | RTS Matam 89.1 | Radiodiffusion Télévision Sénégalaise (RTS, valtio) | julkinen (valtio) | EPÄSELVÄ | Ei tutkittu erikseen |
| SGP | CAPITAL 958 | CAPITAL 958 (Mediacorp) | kaupallinen (valtioyhtiö) | EPÄSELVÄ | Ei tutkittu erikseen |
| SHN | SAMS Radio 1 | SAMS Radio 1 (St Helena) | yhteisöradio | EPÄSELVÄ | Ei julkisia ehtoja löytynyt |
| SLB | SIBC Solomon Islands Broadcasting (Honiara) | Solomon Islands Broadcasting Corporation (SIBC) | julkinen | EPÄSELVÄ | Ei tutkittu erikseen |
| SLE | Culture Radio FM 104.5 (Freetown) | Culture Radio FM | kaupallinen | EPÄSELVÄ | Ei julkisia ehtoja löytynyt |
| SOM | Radio Shabelle 101.5 (Mogadishu) | Radio Shabelle | kaupallinen/yksityinen | EPÄSELVÄ | Ei julkisia ehtoja löytynyt |
| SVK | Rádio Slovensko (Slovenský rozhlas) | Slovenský rozhlas (RTVS) — Rádio Slovensko | julkinen | EPÄSELVÄ | Ei tutkittu erikseen |
| SVN | Radio Prvi (RTV Slovenija) | RTV Slovenija — Radio Prvi | julkinen | EPÄSELVÄ | Ei tutkittu erikseen |
| SWE | Sveriges Radio P1 | Sveriges Radio (P1) | julkinen | KIELLETTY | SR:n API-ehdot sallivat kaupallisen käytön vain tietyin ehdoin, mutta "linjaaristen kanavien" (suorien lähetysten) käyttö vaatii SR:n kirjallisen ennakkosuostumuksen — käytännössä luvanvarainen |
| SYR | Al Asemeh FM / العاصمة إف إم (Damaskos) | Al Asemeh FM | kaupallinen/yksityinen | EPÄSELVÄ | Ei julkisia ehtoja löytynyt |
| TCD | Radiodiffusion Nationale Tchadienne | Radiodiffusion Nationale Tchadienne (valtio) | julkinen (valtio) | EPÄSELVÄ | Ei tutkittu erikseen |
| THA | วิทยุเสียงอิสลาม | วิทยุเสียงอิสลาม (paikallinen/uskonnollinen) | yhteisöradio | EPÄSELVÄ | Ei julkisia ehtoja löytynyt |
| TLS | Rádio Liberdade Dili | Rádio Liberdade Dili | kaupallinen/paikallinen | EPÄSELVÄ | Ei julkisia ehtoja löytynyt |
| TUN | Diwan FM | Diwan FM | kaupallinen | EPÄSELVÄ | Ei julkisia ehtoja löytynyt |
| TUR | TRT Radyo 1 | TRT (Radyo 1, valtio) | julkinen (valtio) | EPÄSELVÄ | TRT:n yleiset käyttöehdot eivät myönnä käyttöoikeutta/lisenssiä ilman kirjallista lupaa kolmansien merkkien/sisällön osalta; ei nimenomaista suorien lähetysten upotuslauseketta löytynyt |
| TWN | 中廣新聞網 | 中廣新聞網 — Broadcasting Corporation of China (BCC, yksityistetty) | kaupallinen | EPÄSELVÄ | Ei julkisia ehtoja löytynyt |
| TZA | TBC Taifa | Tanzania Broadcasting Corporation (TBC, valtio) | julkinen (valtio) | EPÄSELVÄ | Ei tutkittu erikseen |
| UGA | 107.3 BBC Radio Uganda | BBC (World Service -relee, "BBC Radio Uganda") | julkinen | KIELLETTY | Sama BBC-linja kuin GBR: kolmannen osapuolen alustat tarvitsevat BBC:n sopimuksen (data-jako tai kirjautuminen) |
| UKR | Єдині новини (Radio News) | Suspilne / Radioplayer.ua (Єдині новини -pooli) | julkinen/valtiokonsortio | EPÄSELVÄ | Ei tutkittu erikseen |
| USA | WNYC-FM 93.9 New York Public Radio | New York Public Radio (WNYC, NPR-jäsenasema) | julkinen (voittoa tavoittelematon) | EPÄSELVÄ | Ei tutkittu erikseen; NPR-jäsenasemien striimit ovat tyypillisesti vain omaan soittimeen tarkoitettuja — vaatii varmistuksen |
| UZB | Qalbim navosi | Qalbim navosi | kaupallinen | EPÄSELVÄ | Ei julkisia ehtoja löytynyt |
| VEN | Radio Nacional de Venezuela - Informativa | Radio Nacional de Venezuela (RNV, valtio) | julkinen (valtio) | EPÄSELVÄ | Ei tutkittu erikseen |
| VNM | RFI Tiếng Việt | RFI Tiếng Việt (France Médias Monde, Ranskan valtio) | julkinen | EPÄSELVÄ | Eri oikeushenkilö kuin Radio France (France Inter), mutta samaa ranskalaista yleisradiokonsernia (France Médias Monde) — suositellaan samaa varovaisuutta kuin FRA:lle, ei erikseen tutkittu |
| VUT | Paradise 98FM (VBTC, Port Vila) | Vanuatu Broadcasting and TV Corporation (VBTC, valtio) | julkinen (valtio) | EPÄSELVÄ | Ei tutkittu erikseen |
| YEM | Sana'a Radio (إذاعة صنعاء) | Yemen Radio (valtio) | julkinen (valtio) | EPÄSELVÄ | Ei tutkittu erikseen |
| ZAF | Ukhozi FM (SABC) | SABC (Ukhozi FM) | julkinen | EPÄSELVÄ | Ei tutkittu erikseen |
| ZWE | Star FM 89.7 (Harare) | Star FM (Zimpapers) | kaupallinen | EPÄSELVÄ | Ei julkisia ehtoja löytynyt |

## 6. Yhteenveto luokittain

- **SALLITTU: 0** — yhtään asemaa/yhtiötä ei löytynyt, jonka julkiset ehdot
  nimenomaisesti sallisivat kolmannen osapuolen kaupallisen upotuksen ilman
  erillistä sopimusta.
- **KIELLETTY: 16** — kaikki tarkistetut suuret julkisen palvelun
  yleisradiot: BBC (GBR, UGA), Yle (FIN), Radio France (FRA), ARD/
  Deutschlandradio (DEU), RTVE (ESP), NRK (NOR), Sveriges Radio (SWE),
  ORF (AUT), SRG SSR (CHE), NPO (NLD), CBC (CAN), ABC (AUS), RTHK (HKG),
  RTP (PRT), VRT (BEL).
- **EPÄSELVÄ: 99** — loput asemat, sekä isot yleisradiot joita ei ehditty
  tarkistaa (mm. RAI/ITA, DR/DNK, TRT/TUR, RTÉ/IRL, sekä kymmeniä muita
  valtio-/julkisyleisradioita) että kaikki kaupalliset/yksityiset/
  paikalliset asemat (oletusarvo tehtävänannon mukaisesti: epäselvä →
  vaatii luvan).

## 7. Suositus

1. **Älä julkaise App Storeen maksullista/kaupallista versiota nykyisillä
   radiovirroilla ilman lupakierrosta.** Radio Browser antaa vain
   osoitteet, ei oikeuksia — tämä on jo kirjattu peliin, mutta sitä ei ole
   koskaan testattu kaupallisessa kontekstissa.
2. **Jokainen tarkistettu suuri julkinen yleisradio kieltää nimenomaisesti**
   kolmannen osapuolen kaupallisen käytön ilman sopimusta. Realistisesti
   sama koskee todennäköisesti suurinta osaa lopuista 99:stä, koska
   käyttöehdot ovat lähes poikkeuksetta "yksityinen/ei-kaupallinen käyttö"
   -muotoisia siellä missä niitä ylipäänsä on julkaistu.
3. **Vaihtoehdot ennen App Store -julkaisua:**
   a) Neuvottele lisenssit tärkeimmille asemille (työläs — kymmeniä maita
      ja yhtiötä), TAI
   b) Korvaa radiovirrat kaupallisessa versiossa muulla äänisisällöllä
      (esim. pelin oma varareitti, kolmen minuutin äänite
      `js/packs/europe-kielet.js`, joka on jo pelissä olemassa juuri tätä
      varten — tosin senkin lisenssit on tarkistettava erikseen), TAI
   c) Rajaa suorat radiovirrat vain ilmaisversioon/ei-kaupalliseen
      käyttöön, jos sellainen erottelu on pelissä mahdollinen, TAI
   d) Käytä vain niitä asemia, joiden kanssa on olemassa nimenomainen
      upotussopimus (esim. Radio Garden -tyyppinen kaupallinen välittäjä,
      jolla on jo neuvotellut oikeudet — ei tutkittu tässä selvityksessä).
4. **Selvitä Teosto/Gramex-kysymys erikseen** (kohta 4) ennen päätöstä —
   se voi vaikuttaa myös ei-kaupalliseen käyttöön jos peli laajenee.
5. Tämä selvitys kattaa vain ~19 yhtiön syvätarkistuksen 40 haun budjetilla;
   loppujen 96+ aseman yksityiskohtainen läpikäynti vaatisi oman erillisen
   kierroksensa maittain/yhtiöittäin.

**Käytetyt haut:** noin 27 WebSearch-hakua + 4 WebFetch-yritystä (2
epäonnistui palvelimen estosta, bbc.co.uk ja help.abc.net.au — näiltä
osin tieto tulee vain hakutuloksista, ei alkuperäisestä sivusta).
