# Natiivin julkaisuputki: TestFlight, nightly-käännös, versiointi (23.9.2026)

Tekijä: Julkaisija (Sonnet). Tilaaja: Fable, omistajan linjauksella "web-pelin kehitys
jätetään toistaiseksi kesken, koko peli tehdään natiiviin". Pohjana 3D-selvittäjän
raportit `docs/raportit/3d-xcode-20260923.md`, `3d-proto-virstanpylvas1-20260923.md`,
`3d-proto-kosketus-laite-20260923.md` ja `OHJE-laitekaannos.md`/`OHJE-unity-lisenssi.md`
(`/Users/Shared/Claude/proto-3d/`). Tässä ei asennettu mitään eikä ajettu sudoa.

## 1. Nykytila (perintönä 3D-selvittäjältä)

- Unity-projekti on **tämän repon ulkopuolella**:
  `/Users/Shared/Claude/proto-3d/Matkakirja-proto` (oma paikallinen git). `aja.sh` ajaa
  koko ketjun komentoriviltä: `luo | sim | xcode-sim | asenna-sim <UDID> | kaikki <UDID>`.
  Laitekäännölle (`IosLaite`) ei vielä ole `aja.sh`-komentoa — vain simulaattoripolku on
  automatisoitu tähän mennessä.
- Omistajan **Personal Team** (F72JLS57C5) on jo kirjattu Unityn iOS-asetuksiin,
  automaattinen allekirjoitus päällä, ja laitekäännös on ajettu käsin ainakin kerran
  (iPhone 17 Pro, 120 Hz, ks. kosketusraportti). Personal Team -rajat: asennus vanhenee
  7 päivässä, TestFlight/App Store eivät toimi sillä.
- **Apple Developer Program -maksu ei vielä näy** koodaus-käyttäjän Xcodessa (tämän
  raportin tilaus mainitsee: "Developer Program on olemassa mutta maksullinen tiimi ei
  näy koodaus-Xcodessa"). Tämä on kohdan 2 ensimmäinen selvitettävä.
- Xcode 27.0 riittää (Unity vaatii vähintään 16, Apple vaatii 28.4.2026 alkaen
  Xcode 26+/iOS 26 SDK -käännöksen — 27 täyttää senkin). macOS 26.6.2 riittää Xcode
  27:lle ilman käyttöjärjestelmäpäivitystä.

## 2. TestFlight-vaiheet

### 2.1 Maksullisen tiimin lisäys Xcodeen (omistajan tehtävä, kerran)

Oletus tilausviestin perusteella: Apple Developer Program -jäsenyys ON jo maksettu jollain
Apple ID:llä, mutta se ID ei ole vielä kirjautuneena Xcodeen tällä koneella, tai
Xcode ei ole vielä synkannut tiimilistaa. Tarkistusjärjestys omistajalle:

1. **Xcode → Settings… → Accounts.** Jos maksullisen tilin Apple ID EI ole listalla:
   lisää se samalla tavalla kuin Personal Team lisättiin (`OHJE-unity-lisenssi.md`-tyylinen
   "+", Apple Account, kirjaudu). Maksullinen tiimi ilmestyy listaan kirjautumisen jälkeen
   — Xcode hakee tiimijäsenyydet Apple ID:n takaa automaattisesti, tiimi-ID:tä ei syötetä
   käsin.
2. Jos ID ON jo listalla mutta **maksullinen tiimi ei näy sen alla**: yleisimmät syyt ovat
   a) jäsenyys on vielä käsittelyssä Applella (kesto voi olla tunteja jäsenyyden juuri
   ostamisen jälkeen), b) tiliä ei ole hyväksytty organisaation Agentiksi/Adminiksi Apple
   Developer -sivulla (developer.apple.com/account → Membership), tai c) Xcode on
   välimuistissa vanhan tiedon — korjaa **Settings → Accounts → valitse ID → Download
   Manual Profiles** tai poista ja lisää tili uudelleen.
3. Vahvista lopuksi komentoriviltä (sessio voi ajaa tämän itse, ei vaadi omistajaa):
   `security find-identity -v -p codesigning` ja Xcoden `Settings → Accounts` -listan
   tiimirivi tulevat näkyviin, kun tiimi on aktiivinen.
4. Kun maksullinen tiimi näkyy: kerro Fablelle yhdellä rivillä "Developer Program-tiimi
   näkyy Xcodessa" — sessio vaihtaa Unityn iOS-allekirjoitusasetuksen Personal Teamista
   maksulliseen tiimiin (sama `-allowProvisioningUpdates`-mekanismi kuin laitekäännöksessä).

**Ei tehtävissä sessiolta ilman omistajaa**: Apple ID:n kirjautuminen ja jäsenyyden
tila (maksu, organisaation Admin-oikeus) ovat aina omistajan tiliin sidottuja toimia.

### 2.2 Bundle ID ja App Store Connect

- Prototyypin bundle id `app.matkakirja.proto3d` on käytössä simulaattorissa/laitteella.
  Julkaistava versio saa oman tunnuksensa, ehdotus `app.matkakirja.peli` (ks.
  `OHJE-laitekaannos.md` kohta 5) — lukitaan App Store Connectissa vasta kun Developer
  Program on aktiivinen tällä koneella.
- App Store Connectissa (appstoreconnect.apple.com, sama Apple ID/tiimi): luodaan uusi
  App-tietue (nimi, bundle id, kieli) **vasta kun** kohta 2.1 on kunnossa. Tämä on
  omistajan tehtävä selaimessa (ensimmäinen kerta); myöhemmät buildien lataukset voi
  automatisoida `xcrun altool`/`xcrun notarytool`/App Store Connect API -avaimella.
- **App Store Connect API -avain** (developer.apple.com/account → Users and Access →
  Integrations → App Store Connect API) kannattaa luoda heti Developer Program on
  aktiivinen: se antaa sessiolle mahdollisuuden ladata buildeja TestFlightiin
  komentoriviltä ilman että omistaja kirjautuu joka kerta. Avain talletetaan samalla
  tavalla kuin muut avaimet — ei koskaan repoon eikä lokiin (CLAUDE.md).

### 2.3 TestFlight-käännös ja lataus

Kun tiimi ja App Store Connect -tietue ovat kunnossa:

1. `aja.sh` tarvitsee uuden komennon (esim. `xcode-archive`) joka ajaa
   `xcodebuild archive` (Release, laitekohde, `DEVELOPMENT_TEAM=<maksullinen tiimi>`) ja
   `xcodebuild -exportArchive` TestFlight-vientiasetuksilla (`method: app-store-connect`).
2. Lataus: `xcrun altool --upload-app` tai uudempi `xcrun notarytool`/Transporter-reitti,
   API-avaimella (kohta 2.2) ilman interaktiivista kirjautumista.
3. Ensimmäinen build vaatii omistajalta selaimessa: Export Compliance -kysymyksen
   vastauksen (salaus — kyllä/ei, tämä peli ei käytä omaa salausta) ja TestFlight-
   testaajaryhmän luonnin (sisäinen testaus riittää alkuun, ei vaadi Applen katselmusta).
4. Jatkossa jokainen nightly-build (kohta 3) voidaan ladata TestFlightiin automaattisesti,
   kun 1–3 on kerran tehty.

## 3. Nightly iPad-käännös Macilla

Tavoite: joka yö yksi automaattinen `proto-3d/Matkakirja-proto`-käännös, joka asentuu
simulaattoriin (aina) ja mahdollisuuksien mukaan lataa TestFlightiin (kun kohta 2 valmis).

### 3.1 Miksi ei GitHub Actions -workflow tässä repossa

Unity-projekti on tarkoituksella **oman gitinsä alla eikä tässä repossa** (3D-selvittäjän
päätös, ks. virstanpylväs-raportti). Se tarkoittaa: tavallinen `.github/workflows/*.yml`
`pull_request`-liipaisin ei sovi, koska Unity-projektin muutokset eivät synny PR:einä
tähän repoon. Kaksi vaihtoehtoa:

- **A) Oma ajastettu workflow tässä samassa Mac-runnerissa**, `schedule`-liipaisimella
  (kuten `savukkeet.yml`:n `cron: '0 3 * * *'`), mutta workflow-tiedosto asuisi silti
  jossain gitissä joka GitHubissa on — jos proto-3d ei ole GitHub-repo, tämä ei toimi
  suoraan.
- **B) Paikallinen cron/launchd-ajastus Macilla** (ei GitHub Actions ollenkaan): yksinkertaisin,
  koska proto-3d ei ole (vielä) GitHub-repo. `launchd`-tehtävä ajaa `aja.sh kaikki <UDID>`
  tai vastaavan joka yö, kirjoittaa lokin `proto-3d/lokit/nightly-<pvm>.log`, ja
  ilmoittaa tuloksen (onnistui/epäonnistui) Postivahdin kautta Fablelle — samalla
  periaatteella kuin `tools/tarkista-tyotilat.sh`.

**Suositus: B nyt, A myöhemmin jos/kun proto-3d siirretään omaksi GitHub-repoksi**
(mikä on joka tapauksessa suunniteltu, ks. 3D-selvittäjän luovutus: "uusi repo
natiiviversiolle"). Kun repo on olemassa GitHubissa, nightly-workflow voi ajaa täsmälleen
saman self-hosted-mallin kuin `savukkeet.yml` tässä repossa (sama runner-label periaate,
oma `savukkeet-mac`-tyylinen concurrency-jono ettei se törmää tämän repon Mac-ajoihin —
ks. `.github/workflows/savukkeet.yml`:n uusi koko-repon-laajuinen jono, PR #2926/#2947).

### 3.2 Mitä nightly-ajo tekee (luonnos)

1. `git -C proto-3d/Matkakirja-proto pull` (jos/kun sillä on remote).
2. `./aja.sh luo` (kohtauksen rakennus) → `./aja.sh sim` (iOS-käännös) →
   `./aja.sh xcode-sim` (Xcode-käännös simulaattorille, aina, ei vaadi allekirjoitusta).
3. Jos Developer Program -tiimi on käytössä (kohta 2.1 valmis): myös laitekäännös
   (`IosLaite`-executeMethod, ei vielä `aja.sh`-komentona — lisätään kun tarvitaan) ja
   TestFlight-lataus (kohta 2.3).
4. Tulos lokiin + Postivahdin ilmoitus Fablelle vain jos epäonnistui, tai kerran viikossa
   yhteenvetona jos onnistuu (sama tokenikuri-periaate kuin muualla — ei kuittauksia
   jokaisesta onnistuneesta ajosta).
5. **Ei koskaan samaan aikaan tämän repon savukkeet-mac-ajojen tai Karttasepän polttojen
   kanssa** — sama yksi-Mac-yksi-raskas-ajo-kerrallaan-periaate kuin PR #2926:ssa. Koska
   nightly ajetaan yöllä (esim. klo 3–4, ennen `savukkeet.yml`:n oman `cron: '0 3 * * *'`
   -ajon kanssa törmäämistä — nämä kaksi pitää porrastaa, esim. nightly klo 2, savukkeet
   klo 3), yhteentörmäys on epätodennäköinen mutta pitää tarkistaa kun molemmat on
   pystytetty.

## 4. Versiointi natiiville

- Unity-projektin oma versio (`Application.version`, `CFBundleShortVersionString`) ei ole
  sama numerosarja kuin tämän repon `APP_VERSION`/`tools/uusi-versio.mjs`-numerointi —
  ne ovat kaksi eri tuotetta (web PWA vs. natiivi appi), vaikka sisältö (sisältöpaketti,
  ks. nippu 3 / `tools/vienti/`) on yhteinen.
- Ehdotus: natiivi noudattaa semanttista `MAJOR.MINOR.BUILD`-kaavaa
  (`CFBundleShortVersionString` = MAJOR.MINOR ihmisluettava, `CFBundleVersion` = BUILD
  juokseva kokonaisluku, kasvaa joka TestFlight-latauksella — Apple vaatii CFBundleVersion
  kasvamaan jokaisella latauksella samaan MAJOR.MINORiin). Nightly-käännökset, joita ei
  ladata TestFlightiin, eivät kasvata BUILD-numeroa (vain simulaattoritestaus).
- Sisältöpaketin oma versio (`sisalto/1/v<N>/`, `vie-sisalto.yml`) on jo erillinen
  juokseva numero — natiivi lukee sen ajonaikaisesti (`uusin.json`), se ei vaadi
  natiivin omaa buildia jokaista sisältöpäivitystä varten (ks. nippu 3:n tarkoitus).
- Muutosloki natiiville: oma tiedosto, esim. `proto-3d/Matkakirja-proto/MUUTOKSET.md`,
  koska projekti on oman gitinsä alla — ei sekoiteta `js/muutokset.js`:ään joka on
  web-PWA:n oma.

## 5. Avoimet päätökset omistajalle (ei kiireellisiä, ei kysytä erikseen ellei jokin näistä
estää etenemistä)

1. Kohta 2.1: onko Developer Program -tili sama Apple ID kuin Personal Team, vai eri ID?
   Vaikuttaa siihen, lisätäänkö uusi tili vai odotetaanko olemassa olevan synkkaa.
2. Kohta 3.1: siirretäänkö proto-3d omaksi GitHub-repoksi nyt vai vasta myöhemmin —
   vaikuttaa siihen kannattaako nightly rakentaa launchd:llä (väliaikainen) vai suoraan
   GitHub Actions -workflow'na (pysyvä, mutta vaatii repon).
3. App Store Connect API -avaimen luonti (kohta 2.2) — omistajan selaimessa tehtävä kerta,
   ei kiireellinen ennen kuin ensimmäinen TestFlight-lataus on ajankohtainen.

## 6. Tehty vs. tekemättä (tiivistelmä)

| Asia | Tila |
|---|---|
| Personal Team, laitekäännös simulaattoriin ja iPhoneen | valmis (3D-selvittäjä) |
| Developer Program -tiimi näkyy Xcodessa | **selvitettävänä, kohta 2.1** |
| App Store Connect -tietue, bundle id julkaisulle | ei aloitettu, odottaa kohtaa 2.1 |
| TestFlight-käännös/lataus `aja.sh`-komentona | ei aloitettu, luonnos kohdassa 2.3 |
| Nightly-ajastus | ei aloitettu, suositus kohdassa 3.1 (B: launchd) |
| Natiivin versiointikaava | ehdotettu kohdassa 4, ei vielä käytössä koodissa |
