# Liite: App Store -säännöt sisältöpaketille ja lisäosille (Siirtoseppä 23.9.2026)

Liite raporttiin docs/raportit/sisallon-siirtoputki-20260923.md, osa 5. Sonnet-agentin verkkoselvitys 23.9.2026; tarkista maksulinkkisäännöt tuoreeltaan ennen julkaisua.


Lähde kaikelle: https://developer.apple.com/app-store/review/guidelines/
(nykyinen, jatkuvasti päivittyvä sivu — ei versionumeroa, tarkistettu 23.9.2026)

---

## 1. Ladattava koodi — 2.5.2, 4.7

**2.5.2 (Self-Contained Apps):** Sovellus ei saa ladata, asentaa tai suorittaa
koodia, joka tuo mukanaan tai muuttaa sovelluksen ominaisuuksia/toiminnallisuutta
(pätee myös muihin sovelluksiin sovelluksen sisällä). Poikkeus vain opetus-
sovelluksille, joissa opiskelija näkee ja saa muokata koodin — ei koske meitä.

**Mitä tämä tarkoittaa Matkakirjalle:**
- JSON-sisältö (tekstit, kuvien/äänien osoitteet, laudan data) on datalatausta,
  EI koodia → sallittua ilman rajoituksia niin kauan kuin JSON ei sisällä
  suoritettavaa logiikkaa (esim. eval-tyyppistä skriptiä, ehtolausekkeita jotka
  tulkitaan koodina). Puhdas data (tekstikentät, id-viittaukset, koordinaatit,
  URL-osoitteet mediaan) on turvallista.
- Jos JSON sisältää "pelilogiikkaa" (esim. pieni domain-specific-kieli
  reiteille/ehdoille, jota pelimoottori TULKITSEE ajonaikaisesti), raja on
  epäselvä: Apple on historiallisesti hyväksynyt datavetoiset pelimoottorit
  (esim. taulukkopohjaiset dialogipuut, tilakoneet), mutta jos rakenne alkaa
  muistuttaa yleiskäyttöistä skriptikieltä joka voi muuttaa sovelluksen
  toimintaa laajemmin, riski nousee. Suositus: pidä JSON kuvailevana
  (deklaratiivisena), ei Turing-täydellisenä skriptinä.
- **Unity Addressables / AssetBundlet:** Näitä käytetään laajasti tuotanto-
  sovelluksissa ja Apple hyväksyy ne yleisesti, KUNHAN ladatut bundlet
  sisältävät vain assetteja (mallit, tekstuurit, audio, scene-datat) eivätkä
  suoritettavaa natiivikoodia tai C#-skriptejä joita ei ollut alkuperäisessä
  binäärissä. Unityn dokumentaatio ja käytäntö tukevat tätä, mutta Apple ei
  mainitse Addressablesia nimeltä guidelinesissa — tulkinta on epäsuora.
- **4.7 (Mini apps, mini games, streaming games, chatbots, plug-ins):** Tämä
  on erillinen, uudempi poikkeus 2.5.2:een: sovellus SAA tarjota HTML5/
  JavaScript-pohjaisia mini-appeja/-pelejä, striimattuja pelejä, chatbotteja
  ja plug-inejä, jotka eivät ole upotettu binääriin — jos noudatat 4.7.1–4.7.5:
  yksityisyyssäännöt (5.1), sisällönsuodatus + raportointi + käyttäjän esto,
  3.1-maksusäännöt digitaalisille hyödykkeille, ei natiivi-API:en paljastusta
  ilman Applen lupaa (4.7.2), ei datan/oikeuksien jakoa ilman erillistä
  suostumusta per mini-app (4.7.3), indeksi + universal linkit kaikkiin
  tarjottuihin ohjelmiin (4.7.4), ikärajamerkintä + ikätarkistus jos mini-app
  ylittää sovelluksen ikäluokituksen (4.7.5).
  → JOS "käveltävät 3D-kohtaukset" toteutetaan WKWebViewissä JS-pelinä
  (kuten nykyinen web-peli), tämä on todennäköisesti oikea reitti: web-peli
  CDN:stä ladattuna = 4.7:n mini-game, ei 2.5.2-rikkomus, kunhan indeksi/
  linkit/ikäraja/yksityisyys hoidetaan.
  → JOS 3D-kohtaukset ovat natiivia Unity/Unreal-sisältöä ladattuna
  Addressables/AssetBundle-teitse, tämä kuuluu ennemmin 2.5.2:n "data vs.
  koodi" -tulkinnan piiriin kuin 4.7:ään (4.7 puhuu nimenomaan HTML5/JS:stä).

**Varmuus:** Todennäköinen JSON-datan ja 4.7 HTML5-mini-game-reitin osalta;
epävarma "pelilogiikkaa sisältävä JSON" -rajanvedon ja Addressables-tulkinnan
osalta (ei nimenomaista mainintaa guidelinesissa).

**Lähde:** https://developer.apple.com/app-store/review/guidelines/#software-requirements
(2.5.2), https://developer.apple.com/app-store/review/guidelines/#software-requirements
(4.7 Mini apps -osio)

---

## 2. Minimitoiminnallisuus ja web-kuoret — 4.2, 4.2.2

**4.2:** Sovelluksen pitää tarjota enemmän kuin uudelleenpaketoitu verkkosivu —
oma UI, lisäarvoa, "app-mäisyyttä". Jos sovellus ei ole erityisen hyödyllinen/
uniikki, sitä ei hyväksytä.

**4.2.2:** Sovellus ei saa olla ensisijaisesti markkinointimateriaalia,
mainoksia, "web clippingiä", sisältökokoomaa tai linkkikokoelma (paitsi
katalogit).

**Mitä tämä tarkoittaa nykyiselle WKWebView-kuorelle:**
Tämä on todellinen riski nykyiselle iOS-kuorelle, jos se on käytännössä pelkkä
WKWebView joka lataa saman verkkosivun kuin selainversio ilman natiiveja
lisäominaisuuksia. Apple hylkää usein "ohuita kuoria". Riskiä pienentää:
natiivit iOS-integraatiot (push-ilmoitukset, Haptic Feedback, Game Center,
offline-tila, natiivi UI reunoilla/asetuksissa, iOS-jaettu clipboard/share-
sheet, natiivi IAP), selkeä oma UX joka poikkeaa web-sivusta, ja aito
offline-toiminnallisuus (ks. kohta 3). Suunniteltu Unity/Unreal/Swift-natiivi
peli poistaisi tämän riskin kokonaan, koska se ei enää olisi web-kuori vaan
oikea natiivisovellus joka LATAA sisältöä — täsmälleen sama malli kuin monilla
hyväksytyillä peleillä.

**Varmuus:** Varma säännön olemassaolosta; todennäköinen arvio nykyisen
WKWebView-kuoren riskitasosta (riippuu toteutuksen yksityiskohdista, joita
en tarkastanut koodista tässä tehtävässä).

**Lähde:** https://developer.apple.com/app-store/review/guidelines/#design
(4.2, 4.2.2)

---

## 3. Offline-toiminta ja arvostelu

Guidelinesissa ei ole yhtä nimettyä "3.x offline" -kohtaa, mutta yleiskäytäntö
ja 2.1 (App Completeness) edellyttävät, että arvostelija pystyy testaamaan
kaikki ilmoitetut ominaisuudet. Jos sovellus VÄITTÄÄ (metadatassa tai UI:ssa)
toimivansa offline, arvostelijat testaavat tätä oikeasti ilman verkkoa ja
hylkäävät, jos se ei toimi. Jos sovellus EI väitä offline-tukea, sen pitää
silti toimia luotettavasti arvostelijan normaalilla verkkoyhteydellä
(taustapalvelun pitää olla pystyssä ja vakaa arvostelun aikana — App Review
ei yleensä käytä erikoisverkkoa, mutta palvelun kaatuminen/hitaus johtaa
hylkäykseen "app is not functional" -perusteella, 2.1).

**Mitä tämä tarkoittaa Matkakirjalle:**
Jos ensilataus CDN:stä on PAKOLLINEN eikä appia voi käyttää ollenkaan ilman
sitä, tämä itsessään ei riko sääntöjä — moni suuri peli lataa sisältöä
ensimmäisellä käynnistyksellä. Riski syntyy vain, jos: (a) CDN/Worker-
palvelu ei ole luotettavasti pystyssä arvostelun aikana, (b) sovellus jää
jumiin/kaatuu virheenkäsittelyn puutteessa ilman verkkoa, tai (c) App Store
-kuvauksessa väitetään offline-tukea jota ei ole. Hyvä käytäntö (kuten
kysymyksessä mainittu): pakkaa peruspaketti (ensimmäinen lauta/kohtaus,
oleelliset tekstit/kuvat) sovellukseen mukaan, jotta appi käynnistyy ja
näyttää jotain mielekästä myös hitaalla/katkeilevalla yhteydellä, ja lataa
loput/päivitykset taustalla. Tämä myös parantaa 4.2-arviota ("enemmän kuin
web-sivu") ja käyttökokemusta ylipäätään.

**Varmuus:** Todennäköinen (yleiskäytäntöön ja 2.1:een perustuva päättely,
ei yhtä suoraa "offline pakollinen" -lauseketta guidelinesissa).

**Lähde:** https://developer.apple.com/app-store/review/guidelines/#app-completeness
(2.1); yleiskäytäntö, ei yhtä spesifistä alakohtaa offline-vaatimuksesta.

---

## 4. In-App Purchase, hosted content ja lisenssien rajaus — 3.1.1, 3.1.3

**3.1.1:** Kaiken sisällön/toiminnallisuuden LUKITSEMISEEN sovelluksen sisällä
(tilaukset, pelitasot, premium-sisältö, "täysi versio") ON KÄYTETTÄVÄ Applen
IAP:tä — omia mekanismeja (lisenssiavaimet, QR-koodit jne.) ei sallita
lukitukseen. Tämä koskee suoraan "3D-lisäosat IAP:na" -suunnitelmaa: itse
osto pitää tehdä IAP:llä.

**Hosted content -lataus IAP:n jälkeen:** Guidelines EI vaadi tiettyä
teknistä toteutusta sisällön TOIMITTAMISELLE oston jälkeen — vain että osto
itse kulkee IAP:n kautta. Käytännön reitit:
- **Background Assets** (uusi, korvaa On-Demand Resourcesin, joka on
  poistumassa käytöstä) — Apple-hostattu tai oma palvelin, sopii isojen
  tiedostojen (3D-mallit, tekstuurit, äänet) lataukseen taustalla asennuksen
  jälkeen tai IAP:n jälkeen. Guidelinesin päivitysten mukaan Background
  Assetsia saa nyt käyttää myös kokonaisten pelien/mini-appien/plug-inien
  hakemiseen (aiemmin rajoitetumpi).
- **Signed URLs / palvelinpuolen tarkistus** on käytännön suositeltu malli:
  appi todentaa ostotapahtuman StoreKit 2:n allekirjoitetuilla Transaction/
  AppTransaction-objekteilla TAI App Store Server API:lla omalla palvelimella
  (nopeampaa ja turvallisempaa kuin vanha kuittivalidointi), palvelin
  merkitsee käyttäjän oikeutetuksi ("entitlement"), ja vasta sen jälkeen
  antaa Cloudflare R2:sta ajallisesti rajoitetun signed URL:n 3D-sisältöön.
  Tämä on standardikäytäntö eikä guidelines ota siihen erikseen kantaa —
  vaatimus koskee vain ostotapahtumaa itseään, ei toimitustekniikkaa.
- Sama R2-sisältöpaketti voidaan siis JAKAA vapaan ja maksullisen sisällön
  kesken palvelinpuolen entitlement-tarkistuksella (appi kysyy palvelimelta
  "onko tällä käyttäjällä oikeus laudan X 3D-kohtaukseen", palvelin
  tarkistaa StoreKitin transaktiot) — tämä ei riko mitään guidelines-kohtaa,
  kunhan itse lukituksen AVAAMINEN vaatii IAP-oston.

**3.1.3(a) Reader-apps:** Ei koske meitä suoraan (koskee lehtiä, kirjoja,
musiikkia, ääntä/videota jotka on ostettu MUUALLA) — peli/pelisisältö ei ole
"reader"-kategoriaa.

**3.1.3(b) Multiplatform Services:** Tämä ON relevantti: jos pelaaja ostaa
3D-lisäosan WEB-versiossa (esim. Stripe-maksulla omalla sivustolla), sen
SAA näyttää/avata myös iOS-sovelluksessa ILMAN eri IAP-ostoa, KUNHAN sama
sisältö on MYÖS tarjolla iOS-sovelluksen omana IAP-tuotteena (eli hinnoittelu
ja saatavuus IAP:na pitää olla olemassa rinnalla — ei voi myydä VAIN webissä
ja avata iOS:ssä ilmaiseksi ilman että iOS:ssä on myös IAP-vaihtoehto).
Sovellus ei saa (Yhdysvaltoja lukuun ottamatta, ks. alla) appin SISÄLLÄ
kannustaa käyttämään web-ostoa IAP:n sijaan.

**Ulkoiset maksulinkit (EPÄVARMA, nopeasti muuttuva alue 2025–2026):**
- **USA:** Toukokuusta 2025 alkaen (oikeuden päätöksen jälkeen) ulkoiset
  maksulinkit/-painikkeet ovat sallittuja USA:n App Storessa ILMAN erillistä
  entitlementtiä ja ilman Applen pakollista provisiota niistä — 3.1.1(a):ta
  päivitettiin. Tämä on toistaiseksi voimassa mutta oikeudellisesti
  epävakaa (Applen ja Epicin kiista jatkuu, tilanne voi muuttua).
- **EU (DMA):** Kesäkuusta 2025 / tammikuusta 2026 alkaen erillinen malli:
  ulkoiset ostolinkit sallittu StoreKit External Purchase Link -entitlementin
  kautta, uusi maksumalli (Core Technology Commission ~12–20 % + Core
  Technology Fee siirtymässä pois lokakuuhun 2026 mennessä). Monimutkainen
  ja muuttuva — Applen kehittäjätiedote on ainoa luotettava reaaliaikainen
  lähde.
- Muualla maailmassa (ei USA, ei EU): vanha malli voimassa — ulkoiset
  maksulinkit vaativat entitlementin hakemuksineen, eikä appin sisällä saa
  kehottaa käyttämään niitä.
→ Koska peli on suomenkielinen ja luultavasti EU/ETA-painotteinen, EU:n
DMA-sääntely on todennäköisesti relevantein, mutta tilanne on juuri nyt
(syksy 2026) siirtymävaiheessa — TÄMÄ KOHTA VAATII TUOREEN TARKISTUKSEN
juuri ennen julkaisua, älä luota tähän raporttiin pitkään.

**Varmuus:** Varma 3.1.1:n perusvaatimuksesta (IAP pakollinen sisällön
lukitukseen) ja 3.1.3(b):n periaatteesta; epävarma ulkoisten maksulinkkien
tarkasta tilasta USA:ssa/EU:ssa vuonna 2026 (aihe muuttuu jatkuvasti
oikeusprosessien ja DMA-täytäntöönpanon myötä).

**Lähteet:**
https://developer.apple.com/app-store/review/guidelines/#business (3.1.1, 3.1.3)
https://developer.apple.com/support/dma-and-apps-in-the-eu/
https://developer.apple.com/documentation/storekit/externalpurchaselink
https://developer.apple.com/documentation/BackgroundAssets

---

## 5. Yksityisyys, tekoäly-chat ja ikäluokitus — 5.1, 1.2

**5.1.2(i) Data Use and Sharing — UUSI 2025 vaatimus:** Guidelines sanoo nyt
nimenomaisesti: "sinun on selkeästi kerrottava, kun henkilötietoja jaetaan
kolmansille osapuolille, MUKAAN LUKIEN kolmannen osapuolen tekoälylle, ja
hankittava nimenomainen suostumus ennen sitä." Tämä on suoraan sovellettavissa
peliin, koska tekoäly-chat kulkee Cloudflare Workerin kautta Claude-mallille
(Anthropic = kolmas osapuoli tässä suhteessa). Vaatimus: sovelluksen tietosuoja-
käytännössä JA appin sisällä (esim. chat-näkymän yhteydessä tai asetuksissa)
pitää kertoa selkeästi, että käyttäjän chat-viestit lähetetään kolmannen
osapuolen (Anthropic/Claude) tekoälypalveluun, ja käyttäjän pitää antaa
nimenomainen suostumus tähän ennen käyttöä (ei riitä piilotettu maininta
pitkässä tietosuojaselosteessa).

**5.1.1(i) Privacy Policy:** Appissa pitää olla linkki tietosuojaselosteeseen
sekä App Store Connect -metadatassa että appin sisällä helposti löydettävästi;
selosteessa pitää kertoa mitä dataa kerätään, miten, mihin käytetään, ja mitkä
kolmannet osapuolet (mukaan lukien AI-palvelu) saavat sitä.

**5.1.4 Kids / ikäluokitus:** Koska kohderyhmä on 13+ eikä ole "lastenkategoriassa",
peli ei kuulu tiukimpien lapsisääntöjen piiriin, MUTTA Apple on äskettäin
laajentanut ikäluokitusjärjestelmää (nyt myös 13+, 16+, 18+ perinteisten
4+/9+/12+/17+ lisäksi) ja edellyttää, että AI-chat/-assistentti-ominaisuudet
huomioidaan ikäluokitusta arvioitaessa: jos tekoäly voi tuottaa arkaluonteista
sisältöä (esim. väkivalta, seksuaalisuus, karkea kieli), ikäluokitusta pitää
nostaa vastaavasti App Store Connectin ikäluokituskyselyssä. Suositus: testaa
mitä Claude-chat voi tuottaa 13+ kontekstissa ja aseta ikäluokitus rehellisesti
sen mukaan — voi tarkoittaa, että peli ei voi pysyä 13+:ssa jos chat sallii
täysin avoimia aiheita.

**1.2 User-Generated Content:** Jos tekoäly-chat sallii käyttäjän syöttää
vapaata tekstiä joka näkyy muille käyttäjille (ei todennäköisesti tässä
pelissä, koska AI-chat lienee 1-к-1 pelaajan ja tekoälyn välillä), vaaditaan
sisällönsuodatus + raportointi + käyttäjän esto + yhteystiedot. Jos chat on
puhtaasti yksityinen (pelaaja–AI, ei jaeta muille pelaajille), 1.2 ei
todennäköisesti sovellu suoraan, mutta 4.7.1:n kautta (jos chat lasketaan
4.7:n "chatbot"-poikkeukseksi) samat vaatimukset objektionable-sisällön
suodatuksesta voivat silti tulla voimaan epäsuorasti 5.1:n ja yleisen
turvallisuusarvion kautta.

**Varmuus:** Varma 5.1.2(i):n uudesta sanamuodosta (vahvistettu suoraan
guidelines-tekstistä); todennäköinen tulkinta sen soveltamisesta Claude-
chatiin; epävarma tarkasta ikäluokitusvaikutuksesta (riippuu chatin
sisältöasetuksista, joita en testannut).

**Lähteet:**
https://developer.apple.com/app-store/review/guidelines/#privacy (5.1.1, 5.1.2, 5.1.4)
https://developer.apple.com/app-store/review/guidelines/#safety (1.2)
https://developer.apple.com/help/app-store-connect/reference/app-information/age-ratings-values-and-definitions/

---

## 6. Kaupallinen käyttö ja CC-lisenssit (ei Applen sääntö)

CLAUDE.md:n mukaan pelissä käytetään vain PD/CC-mediaa Commonsista. Tämä ei
ole App Review -sääntö vaan lisenssiehto: CC BY ja CC BY-SA vaativat
attribuution (tekijän nimi + lisenssi + linkki lähteeseen), yleensä riittää
esim. appin "Tietoja"/"Credits"-näkymässä tai asetuksissa — ei tarvitse näkyä
jokaisen kuvan yhteydessä. CC0/PD ei vaadi attribuutiota mutta se on silti
hyvä käytäntö. Apple ei valvo tätä, mutta lisenssin rikkominen voi johtaa
oikeudelliseen ongelmaan riippumatta App Store -hyväksynnästä — pidä
credits-lista ajan tasalla natiivi-iOS-versiossakin, ei vain web-versiossa.

**Varmuus:** Varma (yleinen CC-lisenssitieto, ei App Store -spesifinen).
**Lähde:** ei Apple-lähde; https://creativecommons.org/licenses/by/4.0/deed.fi

---

## 7. Muut: koko, Background Assets, sisällön muutos arvostelun jälkeen — 2.3.1

**2.3.1 (a) Piilotetut/dokumentoimattomat ominaisuudet:** Sovelluksessa ei
saa olla piilotettuja/lepotilassa olevia ominaisuuksia; kaikki uudet
ominaisuudet pitää kuvata TARKASTI App Store Connectin "Notes for Review"
-kentässä ja niiden pitää olla arvostelijan saatavilla arvostelun aikana.

**Mitä tämä tarkoittaa CDN-päivitettävälle sisällölle:**
- SISÄLLÖN päivittäminen (uudet laudat, tekstit, kuvat, äänet, korjaukset
  olemassa olevaan sisältöön) CDN:n kautta on vakiintunut ja hyväksytty
  käytäntö (sama malli kuin mobiilipeleissä yleensä live-ops-sisältönä) —
  EI vaadi App Store -päivitystä eikä riko 2.3.1:tä, kunhan sisältö pysyy
  saman TYYPPISENÄ kuin arvostelussa nähtiin (esim. uusia lautoja samalla
  pelimekaniikalla).
- RISKI syntyy, jos CDN:n kautta avataan kokonaan UUSIA OMINAISUUKSIA tai
  UI-elementtejä joita arvostelija ei nähnyt eikä App Store Connectissa
  kuvattu (esim. piilotettu koodi/UI-polku joka aktivoituu vasta myöhemmin
  palvelimelta tulevalla lipulla). Tämä voidaan tulkita 2.3.1:n
  "hidden/dormant features" -rikkomukseksi, VAIKKA itse mekanismi (server-
  driven feature flag) olisi tekninen ja yleinen käytäntö monissa apeissa.
  Turvallisin linja: kuvaa Notes for Review -kentässä että sisältö
  (tekstit/kuvat/äänet/laudat) päivittyy palvelimelta, ja pidä kaikki UUDET
  TOIMINNALLISUUDET (ei pelkkä sisältö) App Store -päivitysten takana.
- **Sovelluksen koko:** Natiivin Unity/Unreal-rungon koko App Storessa
  kannattaa pitää kohtuullisena lataamalla raskas 3D-sisältö (tekstuurit,
  mallit) Background Assets -kehyksellä asennuksen jälkeen — Apple
  suosittelee tätä nimenomaisesti isoille peleille (esim. tutoriaalitaso
  mukana binäärissä, loput ladataan taustalla).

**Varmuus:** Todennäköinen (sisältöpäivitykset ok -tulkinta on vakiintunut
alan käytäntö ja linjassa 2.3.1:n kirjaimen kanssa, mutta "uusien
ominaisuuksien" ja "pelkän sisällön" raja on tulkinnanvarainen eikä Apple
määrittele sitä tarkasti).

**Lähde:** https://developer.apple.com/app-store/review/guidelines/#performance
(2.3.1); https://developer.apple.com/documentation/BackgroundAssets

---

## Yhteenveto — mitä kannattaa tehdä ennen natiivi-iOS-suunnitelman lukitsemista

1. Pidä CDN:stä ladattava JSON puhtaasti deklaratiivisena datana, ei
   yleiskäyttöisenä skriptinä (2.5.2-riski).
2. Jos 3D-kohtaukset ovat WKWebView/JS-pohjaisia, harkitse niiden asemointia
   nimenomaan 4.7:n mini-game-poikkeuksen alle (indeksi, universal linkit,
   ikäraja, sisällönsuodatus) — selkeämpi reitti kuin 2.5.2:n tulkinta.
3. Pakkaa peruspaketti appiin mukaan niin appi toimii heti ensikäynnistyksellä
   ilman verkkoa/hitaalla yhteydellä (4.2 + offline-luotettavuus).
4. 3D-lisäosien osto: IAP pakollinen lukitukseen; toimitus signed URL +
   StoreKit 2 -transaktiotarkistuksella palvelimella on turvallinen malli.
5. Ulkoiset maksulinkit (webistä ostettu → iOS avaa): tarkista TUOREIN
   tilanne juuri ennen julkaisua, tilanne muuttuu (USA vs. EU vs. muu maailma).
6. Kerro Claude-chatista selkeästi ja hae nimenomainen suostumus datan
   jakamiseen kolmannelle osapuolen tekoälylle (5.1.2(i), uusi 2025-vaatimus).
7. Arvioi ikäluokitus rehellisesti AI-chatin mahdollisen sisällön perusteella,
   ei pelkän pelin perussisällön perusteella.
8. Kuvaa Notes for Review -kentässä CDN-sisältöpäivitysten mekanismi; älä
   piilota uusia TOIMINNALLISUUKSIA (erotuksena sisällöstä) palvelimen taakse.
