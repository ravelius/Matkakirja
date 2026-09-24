# Liite: web-pelin pakettilataus ja julkaisuputki (Siirtoseppä 23.9.2026)

Liite raporttiin docs/raportit/sisallon-siirtoputki-20260923.md, osa 5. Opus-agentin selvitys; luvut import-graafista (main eaeda81cf).


Lähde: haara siirtoseppa-vienti (commit d5cbeb68a). Lukutehtävä, ei muutoksia.
Merkinnät: [varma] = luettu koodista tai mitattu, [arvio] = päätelty, [epävarma] = tarkistettava.

## 1. Nykytila

### 1.1 Miten js/packs ladataan
- Sisääntulo on yksi moduuli: `index.html:1470` `<script type="module" src="js/main.js">`.
  Staattinen graafi main.js:stä: 448 moduulia, joista 310 packia; pisin tuontiketju 19 [varma, oma
  kertakäyttöinen import-jäsennin, ei repossa].
- js/-puussa on 582 .js-tiedostoa, joista 353 on js/packs/-kansiossa. **42 muuta moduulia importtaa
  packeja staattisesti, joista 37 on js/*.js-juuritasolla.** Eniten packeja tuovat
  js/fokuskohteet.js (63), js/fokusnosto.js (29), js/sisaltotaulut.js (27),
  js/pallolauta/nostoankkurit.js (14), js/ui.js (14), js/tyohuone-tilastot.js (13), js/pack.js (8) [varma].
- Packit eivät ole erillään muusta:
  - 49 packia importtaa toisia packeja. Syvin pack→pack-ketju on 3 (js/packs/fokusvirrat.js).
  - 16 packia importtaa koodimoduuleja: js/tokens.js (11 lautapackia: europe, africa, asia,
    maailmankartta…), js/mapart.js (africa-/europe-puzzles), js/media.js, js/isoisan-valokuvat.js,
    js/tyohuone-kehitys-data.js (tarinakaari) [varma].
- **Dynaamisia `import()`-latauksia on 10 tiedostossa.** Packeja näistä ladataan vain
  js/kartta-lataus.js:stä (maasto-tekstit, maasto-tekstit-malli, maailmankartta-varjostus) sekä
  js/linssit/topografia.js:stä ja vesistot.js:stä (linssi-topografia-kuva, maailmankartta-maasto,
  maailmankartta-nimet). Muut 8 tiedostoa lataavat koodia: js/ui.js (pallolauta, etusivupallo,
  linssit…), js/linssit/rekisteri.js (18 linssiä), js/maalehti.js, js/vertailu.js, js/elaintaky.js,
  js/linssit/kerros.js ja js/linssit/ihmisen-matka-kortti.js [varma].
- **Moduulien ylätasolla lasketaan pack-datasta tuonnin aikana.** Esimerkkejä:
  - `js/fokuskohteet.js:225` `KOHDE_MAAT = { GRC: FOKUSKOHTEET_GRC, … }` sekä ylätason Mapit
    (rivit 1917, 3786, 3839, 4049).
  - `js/sisaltotaulut.js:85–187` kokoaa spreadeilla `KAIKKI_SAAPUMISET`, `KAIKKI_KULTTUURI`,
    `KAIKKI_VALOKUVAT`, `MAATIEDOT`, `ARTIKKELIT` ja muita.
  - Heuristinen laskenta: 58 moduulia ja noin 115 ylätason lausetta viittaavat tuotuihin
    pack-tunnisteisiin (fokuskohteet 39, sisaltotaulut 10, fokusnosto 3, maailmankartta 3…).
    Luku on [arvio], laskettu kertakäyttöisellä skriptillä (ei repossa).

  Tästä seuraa, että datan on oltava valmiina moduulin evaluointihetkellä. "Lataa JSON myöhemmin
  ja täytä" ei toimi ilman, että nämä 58 moduulia muutetaan laiskoiksi (getterit tai init-funktio).
- Pack-exporttien lajit viennin manifestissa: olio 213, taulukko 189, **funktio 44**, merkkijono 7,
  map 4, set 3, luku 1. Kolme exporttia on `Object.freeze`-jäädytetty (saapumispuheet.js:3 ja :11,
  iskulauseet.js:16) [varma].
- Packeissa on 540 595 riviä, joista 92 474 (17 %) on kommentteja: päätösperusteluja datan
  vieressä [varma]. 119 testitiedostoa 309:stä viittaa packeihin suoraan [varma].

### 1.2 Service worker ja versio
- `sw.js:2` `CACHE = 'matkakirja-2026-09-21.2143'`. Asennus (`sw.js:1980`) esilataa SHELLin:
  578 js-riviä, joista 350 on `./js/packs/…` [varma]. `cache: 'reload'` ohittaa HTTP-välimuistin.
- Aktivointi (`sw.js:2367`) poistaa kaikki korit paitsi CACHE, KUVACACHE, AANICACHE, VENDORCACHE,
  LAATTACACHE ja `matkakirja-puhe-*`. Uusi pysyvä kori (esim. sisältö) on lisättävä tähän
  sallittujen listaan, muuten se tyhjenee joka versiolla.
- Fetch (`sw.js:2387`):
  - Oman originin pyynnöt: välimuisti ensin ja päivitys taustalla (`~sw.js:2585`).
  - Ämpäristä välimuistitetaan vain kuvat (`/kuvat|liput|kohtaamiset/`), äänet ja
    `*.r2.dev/vendor/`.
  - **Muu ristiorigininen pyyntö menee suoraan verkkoon eikä päädy välimuistiin
    (`~sw.js:2568 return`).** Ämpärin sisältö-JSON ei siis nykyään toimisi offline [varma].
- APP_VERSION: `js/main.js:156`. `tools/uusi-versio.mjs` hakee mainin, valitsee
  max(CACHE-numero, muutoslokin kärki)+1 ja kirjoittaa sen kolmeen paikkaan: sw.js CACHE,
  main.js APP_VERSION ja js/muutokset.js. Julkaisusäännöt: `docs/roolitus.md:291–324`.
  Pelkkä docs-muutos ei nosta versiota (sääntö 4).

### 1.3 Yhden tiedoston versio
- `tools/build-standalone.mjs:17–1068` on käsin ylläpidetty MODULES-lista (452 tiedostoa, joista
  313 packia) riippuvuusjärjestyksessä. `checkModuleList` (:1071) valvoo, ettei tuonteja puutu.
- `stripModuleSyntax` (:1084) poistaa import- ja export-rivit, ja kaikki liitetään **klassiseen
  `<script>`-lohkoon** (:1134). **Top-level await ja import() eivät siis toimi siinä.** Sivu
  avataan file://-osoitteesta, jolloin fetch ei ole käytettävissä [varma rakenteesta; file://-fetch
  on selainkohtainen].
- `.github/workflows/pages.yml`: Ubuntu, `npm test` (:36), build-standalone (:39), kopioi css, js,
  assets ja docs `_site/`-kansioon sekä deploy-pages. Laukaisijat: push mainiin ja
  workflow_dispatch; `concurrency: pages`, cancel-in-progress true.

### 1.4 iOS-kuori
- `ios/OHJE.md`: kuori on WKWebView, joka hakee pelin verkosta
  (`ios/Matkakirja/Resurssit/Config.plist` `PELIN_OSOITE = https://matkakirja.app/`).
  `PeliSelain.swift:126–138` pyytää SW:n päivitystarkistusta.
- **Info.plist:ssä ei ole `WKAppBoundDomains`-avainta.** Ilman sitä service worker ei ole
  WKWebView:ssä käytössä (iOS 14+) [epävarma, tarkistettava laitteella]. Tällöin kuoren
  offline-tila nojaa HTTP-välimuistiin, ja pysyvän sisällön on oltava IndexedDB:ssä eikä SW-korissa.

### 1.5 Vienti (lähtökohta)
- `tools/vienti/vie-sisalto.mjs`: 391 moduulia, 544 exporttia, 125 funktiota ja 20 391
  mediaviitettä. Koko 57 Mt, josta moduulit/ 32 Mt ja media.json 10 Mt. Packien JSON on 27 Mt
  raakana; `cat js/packs/*.js | gzip` on 9,6 Mt ja packien JSON gzipattuna 9,1 Mt [varma].
- Manifestissa on jokaiselle moduulille `sha256` ja `lahdeSha256` (:125). Skeema on
  `'matkakirja-vienti/1'` (:44). Sisältöversiota, commitia tai minimisovellusversiota ei ole.
- Viennin rajoitteita:
  - Jaetut viittaukset kopioidaan puuksi (sarjallista.mjs:28–29), joten identiteettivertailu
    (`===`) datan välillä ei säily.
  - `palauta()` (:139) palauttaa funktiot vain merkkiolioiksi.
- Funktiot datan seassa ovat 67 exportissa. Suurimmat: MAAILMANKARTTA 13 (11 `arvo*`-generaattoria
  sekä `starFound` ja `winnerStar`), EUROPE 8, AFRICA 7, EUROPE_PUZZLES/GENERATORS 6+6 ja linssien
  LINSSI-oliot (piirtofunktiot). Lisäksi 44 exporttia on itse apufunktioita, esimerkiksi
  `paivanKuva`, `karttapiste`, `radioMaalle` ja `flickrOsoite`.

## 2. Vaiheittainen siirtymä: vaihtoehdot

### (a) TLA-latausmoduuli (js/sisalto.js fetchaa, packit re-exporttaavat)
- **Rikkoo yhden tiedoston version**: klassinen script ei salli top-level awaitia, eikä file://
  salli fetchiä. Paketti pitäisi upottaa HTML:ään (27 Mt tai enemmän).
- Käynnistys odottaisi koko paketin verkosta ennen ensimmäistä piirtoa. Tämä on sulavuustyön
  vastainen suunta.
- SW ei nykyään välimuistita ämpärin JSONia (1.2). Ensikäynnistys offline-tilassa kaatuisi.
- Funktiot eivät kulje JSONina: 44 funktioexporttia ja 67 funktioita sisältävää exporttia olisi
  siirrettävä koodiin ensin.
- Menetetyt jaetut viittaukset voivat rikkoa `===`-logiikan [epävarma, auditoimatta].
- Node-testit (119) lukevat packeja suoraan ja tarvitsisivat latauskerroksen.
- Poikkeus: jo valmiiksi dynaamisesti ladatut packit (kartta-lataus.js, linssit/topografia.js ja
  vesistot.js) voisi vaihtaa JSON-fetchiin ilman TLA-ongelmaa.
- **Ei suositella yleismalliksi.**

### (b) JSON on lähde, .js generoidaan
- Ajonaikainen käytös pysyy ennallaan: SW, standalone ja testit toimivat, jos .js committoidaan.
- Hinta:
  - 17 % packien riveistä on kommentteja, jotka menetetään tai joille tarvitaan oma kenttä.
  - Jokainen muutos näkyy kahdesti diffissä (JSON + .js), mikä paisuttaa historiaa. CLAUDE.md
    varoittaa jo dist/-kansion kohdalla samasta.
  - Jos .js jätetään committoimatta, projektin build-vaiheettomuus rikkoutuu (paikallinen ajo ja
    testit).
  - Sisältöroolien (Sisältökirjuri, Karttaseppä) työtapa muuttuu.
  - Funktiot on joka tapauksessa erotettava ensin.
- Lisäksi web saa sisällön edelleen vain koodijulkaisun mukana, eli (b) ei yksin tuo ämpärilatausta.
- **Ei nyt. Harkitaan vasta, jos natiivi nousee pääalustaksi.**

### (c) Packit oletuksena, ämpärin uudempi sisältö päälle (overlay)
- Mekanismi [arvio, toteutettavissa]:
  1. index.html lataa uuden js/kaynnistys.js:n, joka lukee overlayn IndexedDB:stä (nopea, ei
     odota verkkoa).
  2. `await import()` vain niille packeille, joita overlay koskee, lehdet ensin manifestin
     riippuvuusjärjestyksessä. Tämä evaluoi vain packit ja niiden koodiriippuvuudet, ei niiden
     käyttäjiä.
  3. Syvä in-place-merge exportattuihin olioihin.
  4. Vasta sitten `await import('./main.js')`.
  5. Ylätason johdannaiset (KOHDE_MAAT, sisaltotaulut) lasketaan tämän jälkeen, joten ne näkevät
     paikatun datan.
  6. Taustalla haetaan uusi osoitin ja paketti seuraavaa käynnistystä varten.
- Rajaukset:
  - Primitiiviexportteja (8) ei voi paikata ulkoa.
  - Jäädytetyt oliot (3) ja funktioita sisältävät exportit kuuluvat estolistalle, eli ne vaativat
    koodijulkaisun.
  - Tyyppimuutos (olio → taulukko) on kielletty.
  - Paikka koskee vain moduuleja, joiden sha poikkeaa leivotusta pohjasta. Pohjan
    sha-luettelo (391 × 12 merkkiä, noin 8 kt) kirjoitetaan `_site`:en Pages-ajossa, ei repoon.
    Puuttuva luettelo tarkoittaa, että overlay on pois päältä (paikallinen kehitys).
- Toimintaympäristöt:
  - Standalone: ei overlayta, leivottu sisältö. OK.
  - Offline: overlay on IndexedDB:ssä, joten se toimii ilman SW:tä ja myös WKWebView-kuoressa.
  - SW: ennallaan. Oma SISALTOCACHE on tarpeen vain, jos JSON halutaan SW:n kautta, ja silloin se
    lisätään activaten sallittujen listaan.
- Riskit:
  - Käynnistyspolku muuttuu (main.js ei enää ole sisääntulo).
  - Overlay ohittaa julkaisuputken savukkeet, ellei ämpäriin vientiä sidota samaan CI-porttiin.
  - Näkymät, jotka välimuistittavat dataa omiin kenttiinsä (esim. laattapyramidi.js
    `luettelo.__jokiTasot`), eivät häiriinny, koska paikkaus tehdään ennen ensimmäistä käyttöä.
    Nämä on silti auditoitava.

### Suositus
**Web ei tarvitse ajonaikaista ämpärilatausta ollakseen "sama lähde".** Pages julkaisee jokaisen
mergen minuuteissa. Kun CI vie paketin samasta commitista ja tarkistaa, että webin packit ja
paketti vastaavat toisiaan (sha), molemmat alustat näyttävät tavulleen saman sisällön.

Vaiheet (työmäärät sessioina):
1. **CI-paketti ämpäriin** (1–1,5): uusi työnkulku (luku 3), manifestiin sisältöversio, commit,
   APP_VERSION, skeeman major/minor ja minSovellus. Testi: jokainen web-koodin packeista
   importtaama nimi löytyy paketista (vaadittu exporttijoukko saadaan staattisesti import-graafista).
2. **Sisältöversio näkyviin** (0,5): paketin numero Tilannelehteen ja `?koe=`-diagnostiikkaan.
   Pages-ajo kirjoittaa pohjan sha-luettelon.
3. **Funktiot pois datasta** (2–3): generaattorit ja URL-apurit koodimoduuleihin. Data viittaa
   niihin tunnisteella (`generaattori: 'arvoRoomalaiset'`), jolloin natiivi voi toteuttaa saman
   tunnisteen. Vaatii savukkeet ja Laitetestaajan kierroksen. Hyödyttää natiivia joka tapauksessa.
4. **Overlay (c)** (2 + laitekierros): vasta jos omistaja haluaa tekstikorjauksia ohi
   koodijulkaisun, esimerkiksi mittausikkunan aikana, tai jos sisältöä muokataan repon ulkopuolella.
5. (b) tai (a): ei ajoitettu. (a) sopii jo dynaamisesti ladatuille maasto- ja linssipackeille,
   jos niiden koko halutaan pois SHELListä.

## 3. Julkaisuputki

### Nykyiset R2-viennit
- 33 työnkulkua koskee R2:ta tai Cloudflarea (vie-assetit, vie-vendor, vie-julisteet,
  vie-kohtaamiskuvat, vie-korkeuspalat, tee-pallolaatat, generoi-pyramidi, generoi-luennat,
  generoi-musiikki, peilaa, polta-macilla…). Lähes kaikki ovat workflow_dispatch-ajoja.
- Vientitapa: `aws s3 cp/sync` osoitteeseen `https://$R2_ACCOUNT_ID.r2.cloudflarestorage.com`,
  `AWS_DEFAULT_REGION=auto` (esim. vie-assetit.yml:48–55).
- Secretien nimet: `R2_ACCOUNT_ID`, `R2_BUCKET`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`,
  `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`. Workerit julkaistaan wranglerilla
  (pollo-julkaisu.yml, versio lukittu 4.125.0).
- Osoitinmallin ennakkotapaukset:
  - Muuttumaton data: `public, max-age=31536000, immutable`.
  - Osoitin tai luettelo lyhyellä välimuistilla: generoi-pyramidi.yml:820–830 `pyramidi.json`
    `max-age=300`, tee-pallolaatat.yml:121–123 `laatat.json` `max-age=3600`.
  - "Vanha koodi sietää uuden kentän" -sääntö: js/laattapyramidi.js:2529–2533.
- Pages: pages.yml (1.3). matkakirja.app = GitHub Pages ja Cloudflare-DNS
  (pelin-verkkotunnus.yml). CORS: ämpärin säännöt sallivat pelin originin (sw.js-kommentti:
  AllowedOrigins *) [epävarma, kumpi on voimassa].

### Ehdotus: vie-sisalto.yml
- Laukaisijat: push mainiin, polut `js/**` ja `assets/data/**`, lisäksi workflow_dispatch
  (`palauta: N`). `concurrency: sisalto-julkaisu`, cancel-in-progress **false**.
- Ajo:
  1. npm test (tai `needs:` Testit).
  2. `node tools/vienti/vie-sisalto.mjs`.
  3. Paketin tiiviste = sha256 manifestin moduulien sha-listasta. **Jos se on sama kuin nykyisen
     osoittimen, lopetetaan**, eli docs- ja koodimuutokset eivät nosta sisältöversiota.
  4. N = osoittimen N + 1, luettuna concurrency-ryhmän sisällä samaan tapaan atomisesti kuin
     uusi-versio.mjs.
  5. `aws s3 sync dist/vienti s3://$R2_BUCKET/sisalto/1/v<N>/`: `application/json; charset=utf-8`,
     `public, max-age=31536000, immutable`.
  6. Tarkistus julkisesta osoitteesta: manifest.json haetaan ja sha:t verrataan.
  7. **Viimeisenä** `sisalto/1/uusin.json`, `public, max-age=60`. Kenttinä
     `{sisaltoversio: N, polku, manifestSha256, commit, appVersio, julkaistu, minSovellus: {web, ios},
     edellinen: N-1}`.
  8. Valinnaisesti Cloudflaren purge osoittimen URL:lle `CLOUDFLARE_API_TOKEN`illa.
     R2:n custom domainin CDN-välimuisti noudattaa Cache-Controlia [epävarma].
- Atomisuus: yksittäinen R2 PUT on atominen. Paketti on näkymätön, kunnes osoitin vaihtuu.
  Järjestys: media → paketti → osoitin.
- Palautus: dispatch `palauta: N` kirjoittaa osoittimen vanhaan versioon (versio on oltava
  olemassa). Säilytetään viimeiset 20 versiota ja kaikki, joihin jokin osoitin viittaa, eikä
  poisteta samassa ajossa.
- Koko: noin 57 Mt raakana per versio. Natiivi hakee vain moduulit, joiden sha on muuttunut
  (manifestin sha-diff). Cloudflaren brotli/gzip JSONille custom domainilla [epävarma].
- **Sisältöversio ja APP_VERSION ovat erillisiä:**
  - APP_VERSION = koodijulkaisu (uusi-versio.mjs).
  - Sisältöversio N = CI:n laskuri, joka nousee vain, kun sisältö muuttuu.
  - Manifest kirjaa molemmat ja commitin jäljitettävyyttä varten.
  - Sisältöversiolle ei tarvita muutoslokiriviä, joten se ei kuormita julkaisijaa.

## 4. Yhteensopivuus
- **Skeema**: nykyinen `matkakirja-vienti/1` jaetaan kenttään
  `skeema: {nimi, major: 1, minor: 0}`.
  - Major nousee, kun rikotaan: export tai kenttä poistuu tai nimetään uudelleen, tyyppi vaihtuu,
    id:iden merkitys muuttuu tai tulee uusi `$`-merkintälaji (vanha `palauta()` ei tunne sitä).
  - Minor nousee lisäyksistä: uusi moduuli, export tai valinnainen kenttä.
  - Osoitin on **majorikohtainen** (`sisalto/<major>/uusin.json`), joten vanha sovellus ei koskaan
    näe uutta majoria.
- **Pakolliset vs. valinnaiset**:
  - Manifest listaa exportit (on jo). Kukin sovellus julistaa oman pakollisen joukkonsa. Webin
    joukko saadaan import-graafista, natiivi pitää omaa listaansa.
  - Puuttuva pakollinen export tarkoittaa, että paketti hylätään ja käytetään leivottua tai
    edellistä sisältöä.
  - Kentät: tunnetut luetaan nimeltä, tuntemattomat ohitetaan (laattapyramidi-sääntö).
  - JSON Schemaan (tools/vienti/skeema/) merkitään `required` vain aidosti pakollisille kentille.
- **Vanha sovellus ja uusi sisältö**:
  - Uusi enum-arvo (token-tyyppi, linssi-id, nostotyyppi, generaattoritunniste) ohitetaan
    alkiotasolla, ei kaatumalla. Tätä ei ole auditoitu koodista [epävarma, riski].
  - Mediaviitteen on oltava ämpärissä ennen osoittimen vaihtoa.
- **minSovellus**: osoittimessa ja manifestissa `{web: <APP_VERSION-numero>, ios: <build>}`.
  - Liian vanha sovellus jää edelliseen yhteensopivaan pakettiin (natiivi) tai leivottuun sisältöön
    (web).
  - CI asettaa arvon automaattisesti nykyiseksi APP_VERSIONiksi vain, jos paketti käyttää uutta
    merkintälajia tai generaattoritunnistetta. Muuten se periytyy edelliseltä.
- **Natiivi**: sovellukseen leivotaan pohjapaketti ensikäynnistystä ja offline-tilaa varten, ja
  päälle haetaan majorin osoitin ja sha-diff.
