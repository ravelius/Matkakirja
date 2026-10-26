# WEB-vertailukuvat: pallon maakuntarajakerros (js/pallomaakunnat.js)

Natiiviseppä, 25.9.2026. Kaappaustyökalu: `kuvaa-web.mjs` (samassa kansiossa).
Ei muutoksia repoon (Matkakirja-3d-selvittaja), ei committeja — vain nämä
kuvat, tämä tiedosto ja skripti kirjoitettu ulkopuoliseen lokikansioon.

## Menetelmä (tiivistetty — skriptin alussa pitempi selitys)

- **Lähde: tuotanto https://matkakirja.app/, EI paikallista palvelinta.**
  Kokeilin ensin `python3 -m http.server`-paikallisajoa tästä worktreestä
  (`/Users/Shared/Claude/Matkakirja-3d-selvittaja`), mutta pallon pintaa
  EI SAA NÄKYVIIN paikallisesti: peli hakee pallon tekstuurin ja
  maakuntavektoriaineiston osoitteesta `https://media.matkakirja.app/`, ja
  se palvelin ei salli CORS:ia `http://localhost:*`-originille. Pallon
  "juuri" (three-globe-kirjaston sisäinen scene-solmu) pysyy pysyvästi
  `visible=false`-tilassa, koska se odottaa `waitForGlobeReady`-ilmoitusta
  joka ei koskaan tule ilman tekstuuria (ks. js/pallolauta/lauta.js
  `tila()`-luennan kommentti "PALLON JUURI"). Näytöllä näkyy silloin pelkkä
  tumma tausta + paneelit, ei karttaa lainkaan. Tuotannossa sama origin
  saa tekstuurin normaalisti → pallo näkyy heti.
- **Pelaajan sijainti ja pallolauta: KEHITTÄJÄN PIKATIE**
  (`js/kehittaja-pikatie.js`, Fable 21.9.2026). Osoiteparametri
  `?lauta=pallo&dev=<kaupunkiId>` rakentaa pelin suoraan toimintavaiheeseen
  (`game.phase='action'`) yhdellä pelaajalla annetussa kaupungissa
  `maailmankartta`-pakassa (266 kaupunkia, koko maailma yhtenä lautana),
  nappula pois laudalta, JA ohittaa saapumissekvenssin (traileri + iso
  valokuva + "Ohita"-nappi) automaattisesti. `window.matkakirja.pikatie`
  on Promise — sitä pitää `await`-ata ennen kuin pallolauta ja kamera ovat
  valmiit. Kaupunkitunnukset (js/packs/maailmankartta.js `CITY_COUNTRY`):
  `marseille`/`pariisi` (FRA), `ateena`/`kreeta` (GRC), `tokio`/`kioto`
  (JPN), `moskova`/`pietari` (RUS).
- **Maakuntakerros on OLETUKSENA POIS.** `js/pallomaakunnat.js`:
  `PALLOMAAKUNNAT_OLETUS = false` ("sulavuus ensin"). Se pitää kytkeä
  päälle osoiteparametrilla `&maakunnat=1` (tai localStorage-avaimella
  `matkakirja-pallomaakunnat` = `'1'`). TÄRKEÄ SEKAANNUSVAARA: ilman
  lippua kartalla näkyy silti maakuntien NIMET ja haaleat aluerajat —
  ne tulevat AINA PÄÄLLÄ olevasta pohjakartan omasta piirrosta
  (todennäköisesti js/karttanimet.js + laattojen reliefi/rajaviiva-aineisto),
  EIVÄTKÄ ole sama asia kuin `pallomaakunnat.js`:n väritetty admin-1-
  vektoritaso. Kaikki tämän kansion kuvat on otettu `&maakunnat=1`-lipulla.
- **Kamera:** `window.matkakirja.ui.pallonInstanssi` on globe.gl-instanssi
  (js/pallo.js). Tavallinen `pallo.pointOfView({lat, lng, altitude}, ms)`
  toimii. HUOM korkeuden (altitude) YLÄRAJA: `kattoPuristus`
  (js/pallolauta/lauta.js) palauttaa altituden korostetun maan omaan
  "koko maa näkyy" -kattoon, jos pyytää suurempaa arvoa — sitä EI voi
  ylittää käsin (testattu: Ranskassa 0,55 retkahti takaisin 0,205:een
  ~1 s:ssa). Pienemmän altituden (lähempi zoomi) voi asettaa vapaasti.
  "Koko maa" -kuvissa (1, 3, 4) kamera-arvo on siis PIKATIEN OMA
  automaattikamera (teleportin jälkeinen fly-to pysähtyy juuri kattoon),
  ei käsin asetettu. Venäjän kohdalla (iso maa, ulottuu päiväntasauksen
  yli) yläraja on niin suuri (>0,5), ettei se rajoittanut Tšukotka-kuvaa.
- **Paneelit/kortit:** pikatie sulkee saapumissekvenssin itse
  (`suljeFokusvirta`, `ohitaSaapumisluenta`, dialogit). Yhdessäkään
  lopullisessa kuvassa ei ole avointa lehteä, korttia tai postikorttia
  kartan päällä.
- Näyttö: iPhone-mitat 393×852, `deviceScaleFactor: 2`, JPEG-laatu 85.
- Playwright: Chromium `--use-angle=metal` (Metal-GPU pakollinen, muuten
  osa piirtoreiteistä ei toimi headlessissä — sama vaatimus kuin
  tools/pariteetti-web-kuva.mjs:ssä).

## Kuvat ja kamera-arvot

### 1-ranska.jpg — koko Ranska
- Pelaaja: **Marseille** (`dev=marseille`)
- Kamera (pikatien oma "koko maa" -katto): **lat 46,35°, lon 5,25°,
  altitude 0,205** (globe.gl-yksikkö, ei km)
- Näyttää koko Manner-Ranskan pohjoisesta (Lille, Strasbourg) etelään
  (Marseille); maakuntavärit selvästi eroteltuina (5 sävyä:
  ruoste/sammal/savi/taivas/okra).

### 2-provence.jpg — lähikuva Provencesta
- Pelaaja: sama Marseille (ei uutta teleporttia — Marseille on jo
  Provencessa)
- Kamera (käsin asetettu): **lat 44,0°, lon 6,0°, altitude 0,047**
  (lopullinen arvo pienen OrbitControls-vaimennuksen jälkeen; asetettu
  arvo oli 0,045)
- Näyttää "Provence" ja "Provence-Alpes-Côte d'Azur" -maakuntanimet ja
  niiden välisen ohuen harmaan maakuntarajaviivan (Dauphiné/Provence-raja)
  lähempää.

### 3-japani.jpg — koko Japani
- Pelaaja: **Tokio** (`dev=tokio`)
- Kamera (pikatien oma katto): **lat 35,31°, lon 138,23°,
  altitude 0,440**
- Näyttää Honshun, Hokkaidon ja osan Kyushua/Shikokua. **HUOM (katso
  Havainnot alla): maakuntien väritys ei näy silmämääräisesti juuri
  lainkaan**, vaikka data (JPN.bin/json) latautui 200 OK:lla.

### 4-kreikka.jpg — koko Kreikka + Kreeta
- Pelaaja: **Ateena** (`dev=ateena`)
- Kamera (pikatien oma katto): **lat 38,33°, lon 23,74°,
  altitude 0,146**
- Näyttää Manner-Kreikan (Thessaloniki—Peloponnesos) JA Kreetan
  (Iraklion) samassa kuvassa. **HUOM: maakuntien väritys ei näy
  silmämääräisesti lainkaan**, vaikka GRC.bin/json latautui 200 OK:lla
  (ks. Havainnot).

### 5-tsukotka.jpg — Venäjä, Tšukotka/Beringinsalmi (±180°)
- Pelaaja: **Moskova** (`dev=moskova`) — kamera siirretty erikseen
  Tšukotkaan, pelaaja itse jäi Moskovaan (tehtävänannon mukaan
  riittävä: *"jos mahdollista"*)
- Kamera (käsin asetettu): **lat 66,0°, lon 180,0° (päiväntasausraja),
  altitude 0,5**
- **LÖYDÖS (katso Havainnot): Tšukotkan niemimaan maakuntatäyttö
  katkeaa selvään PYSTYSUORAAN SAUMAAN juuri leveysasteella 180°/−180°**
  — väritetty alue loppuu kesken ja jatkuu viivan toisella puolella
  ilman rajaviivaa siinä kohtaa, ikään kuin kolmiointi tai
  koordinaattimuunnos leikkaisi polygonin väärin päiväntasausrajalla.
  Muualla samassa kuvassa (esim. rannikkoviiva, Wrangelin saari) ei ole
  vastaavaa saumaa — vika vaikuttaa koskevan nimenomaan
  `pallomaakunnat.js`:n täyttöä/kolmiointia, ei peruskarttaa.

## Havainnot (web-puolen oudot asiat)

1. **Kreikan ja Japanin maakuntatäyttö ei näy** oletusnäkymässä siitä
   huolimatta, että `&maakunnat=1` oli päällä ja `GRC.bin`/`GRC.json`
   sekä `JPN.bin`/`JPN.json` latautuivat verkosta 200 OK:lla (tarkistin
   pyynnöt erikseen). Vertailin myös kuvaa ILMAN `&maakunnat=1`-lippua
   samasta Ateena-näkymästä: pikselinäytteet (Peloponnesos, Attika,
   Makedonia, Thessalia) olivat lähes identtiset molemmissa — ero on
   JPEG-kohinan tasolla, ei todellinen väriero. Ranskassa (ja Venäjän
   Moskova-oletusnäkymässä) sama lippu tuottaa selvän, silmin nähtävän
   5-sävyisen aluetäytön. En selvittänyt juurisyytä pidemmälle (voisi
   olla esim. maan `vari`-attribuutin puuttuminen JSON-aineistosta,
   peittoarvon renderöintijärjestys tietyllä geometrialla, tai jokin
   muu maakohtainen ero) — tämä kannattaa antaa Karttasepälle/
   Pelikoodarille tarkistettavaksi ennen natiivivertailun tulkintaa,
   ettei Kreikka/Japani-eroja luulla natiivin bugeiksi kun ne saattavat
   olla web-puolen renderöintipuute.
2. **Päiväntasausrajan sauma** Venäjän Tšukotkassa (ks. 5-tsukotka.jpg
   yllä) — todennäköinen bugi `pallomaakunnat.js`:n aineistossa tai
   kolmioinnissa lon ±180°:n ympäristössä. `pallomaakunnat.js`:n
   omassa dokumentaatiossa mainitaan päiväntasausrajan ylittävät
   alueet (`saumassa`-käsittely `osuma()`-funktion yhteydessä
   silmämääräisesti vain napautustestausta varten) — silmämääräistä
   PIIRTOA se kommentti ei koske, joten tämä on eri koodipolku ja voi
   olla aidosti unohdettu tapaus.
3. Paikallinen `http-server`/`python3 -m http.server` EI KELPAA tämän
   kaltaiseen kaappaukseen CORS:in takia (ks. Menetelmä yllä) — jos
   joku toistaa tämän mittauksen myöhemmin, käytä suoraan tuotantoa.

## Toistaminen

```
node kuvaa-web.mjs
```

Vaatii Playwright + Chromium (sama `--use-angle=metal`-vaatimus kuin
`tools/pariteetti-web-kuva.mjs`:ssä). Tässä ajossa Playwright otettiin
käyttöön toisen roolin (Matkakirja-laitetestaaja) valmiiksi asennetusta
`node_modules`-kansiosta symlinkillä skriptin viereen, koska tämä
worktree (Matkakirja-3d-selvittaja) ei sisällä Playwright-pakettia
paikallisesti eikä tätä ajoa varten haluttu asentaa/muuttaa repoa.
