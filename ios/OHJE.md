# Matkakirjan iPhone-kuori — ohje omistajalle

Tämä kansio sisältää **iPhone-sovelluksen**, joka näyttää Matkakirjan.
Se ei ole toinen versio pelistä. Peli pysyy verkossa täsmälleen kuten
tähänkin asti, ja tämä sovellus on ohut kehys sen ympärillä.

## Miksi kuori on olemassa

Kaksi asiaa, joita selain ei anna:

1. **Kotivalikon oikea sovellus.** Oma kuvake, oma nimi, ei osoiteriviä
   eikä selaimen palkkeja. Peli aukeaa koko ruudulle kuten mikä tahansa
   ostettu sovellus, ja se löytyy App Storesta jos joskus niin halutaan.
2. **Natiiviääni.** iPhonen oma puhesynteesi (luenta) ja puheentunnistus
   (sanelu) ovat selaimen vastaavia paljon parempia — ja ne toimivat
   ilman verkkoa ja ilman ulkopuolisia palveluita eikä niistä laskuteta
   mitään. Viisas Pöllö voi puhua ja kuunnella laitteen omilla äänillä.

## Tärkein periaate: peli päivittyy verkosta

Kuori hakee pelin verkosta joka kerta, joten **pelin päivitykset näkyvät
puhelimessa heti** — samalla tavalla kuin selaimessa. App Storen kautta
ei tarvitse käydä uudestaan, ellei kuoreen itseensä tehdä muutoksia
(uusi natiivitoiminto, uusi kuvake). Se on harvinaista, ehkä pari kertaa
vuodessa.

Kun sovellus avataan tai palataan siihen taustalta, se pyytää sivua
tarkistamaan onko uusi versio ilmestynyt. Pelin oma Päivitä-nappi toimii
kuoressa kuten selaimessa.

Kuorella on oma versionumeronsa (nyt 0.2.0). **Se ei liity pelin
versionumeroon** eikä kulje pelin muutoslokissa.

## Mitä pitää asettaa: pelin osoite

Sovellus ei vielä tiedä, mistä peli haetaan — osoitteeksi on jätetty
paikkamerkki, jottei väärä osoite paatuisi koodiin. Osoite kirjoitetaan
yhteen kohtaan:

**Tiedosto:** `ios/Matkakirja/Resurssit/Config.plist`

Sieltä löytyy rivi:

```xml
<key>PELIN_OSOITE</key>
<string>https://ASETA-PELIN-OSOITE.example/</string>
```

Alempi rivi vaihdetaan pelin oikeaksi osoitteeksi, esimerkiksi:

```xml
<string>https://esimerkki.fi/matkakirja/</string>
```

Muuta ei tarvita. Jos paikkamerkki jää paikalleen, sovellus kertoo sen
suomeksi käynnistyessään sen sijaan että näyttäisi tyhjän ruudun.

*(Kehityksen aikana osoitteen voi ohittaa myös Xcodessa:
Product → Scheme → Edit Scheme → Arguments → `-PELIN_OSOITE`
ja perään esimerkiksi oman koneen osoite.)*

## Mitä sovellus osaa nyt

- Peli koko ruudulle, myös lovellisissa puhelimissa.
- Ei selaimen kumiscrollausta reunoilla eikä vahinkozoomausta.
- Äänet ja luennat soivat ilman erillistä napautusta; pelaajan oma
  musiikki saa jäädä taustalle soimaan.
- Ulkopuoliset linkit (esimerkiksi lähdeviitteet) avautuvat Safariin,
  jolloin pelistä ei voi eksyä pois ilman paluuta.
- Verkkokatkolla siisti suomenkielinen ilmoitus ja **Yritä uudelleen**
  -nappi.
- Luenta ja sanelu tarjolla pelin koodille (`window.matkakirjaNatiivi`).
  Pelissä ei vielä ole niitä käyttävää kohtaa — sillat ovat valmiina,
  kun Viisas Pöllö niitä tarvitsee.
- Kuusi uutta siltaa, kotinäyttöwidget ja Siri-vastaus. Ne kuvataan
  omassa luvussaan alempana (**Kuoren versio 0.2.0**).
- Väliaikainen kuvake (tumma pohja, kultainen kompassiruusu). Oikea
  kuvake tehdään erikseen; sen jälkeen tiedosto
  `ios/tyokalut/tee-ikoni.py` voidaan poistaa.

## Mitä ei vielä ole

- Sovellusta ei ole ajettu oikealla laitteella, koska kehityskoneessa ei
  ole Macia. Ensimmäinen laiteajo on se hetki, kun TestFlight-versio
  ilmestyy puhelimeen — ohje siihen on alempana.
- **Pelin osoite on yhä paikkamerkki.** Se kannattaa asettaa ennen
  ensimmäistä TestFlight-lähetystä, muuten sovellus näyttää puhelimessa
  vain suomenkielisen huomautuksen. Käännösajo huomauttaa tästä, mutta ei
  kaadu siihen.

## Kuoren versio 0.2.0: mitä uutta

Kuoreen tuli kerralla iso paketti. **Mikään näistä ei muuta peliä
itsessään** — pelin koodi ei vielä kutsu näitä, vaan kytkennät tehdään
erikseen. Kuori vain tarjoaa ne, ja selaimessa pelattaessa ne puuttuvat
kokonaan aivan kuten ennenkin.

| Uutuus | Mitä se tekee | Vaatiiko omistajalta toimia |
| --- | --- | --- |
| **Tallennussynkka** | Pelin tallennus siirtyy iPhonen ja iPadin välillä iCloudin kautta, jos laitteissa on sama Apple-tili | Ei |
| **Haptiikka** | Napautukset, onnistumiset ja aarrelöydöt tuntuvat kädessä | Ei |
| **Jako** | Pelaaja voi lähettää tekstin tai kuvakaappauksen eteenpäin iOS:n omalla jakoikkunalla | Ei |
| **Game Center** | Saavutukset ja pelaajan tunnus | **Kyllä** — saavutukset luodaan käsin App Store Connectissa |
| **Kotinäyttöwidget** | Pieni ja keskikokoinen widget: kaupunki, "Päivä N" ja kassa | Ei |
| **Siri: "Missä olen Matkakirjassa"** | Siri vastaa kaupungin ja matkapäivän lukematta peliä | Ei |
| **Push-ilmoitusten rekisteröinti** | Lupa ja laitetunnus otetaan talteen | **Kyllä, myöhemmin** — lähetysputki on oma projektinsa |

### Tallennussynkka lyhyesti

Alla on iCloudin avain–arvo-varasto: pieni (yhteensä 1 megatavu), ilmainen
ja se ei vaadi pelaajalta yhtään asetusta. Kuori **ei päätä mitään**: se
kuljettaa tallennuksen ja sen aikaleiman, ja kun toisesta laitteesta tulee
muutos, se kertoo pelille vain *mikä* muuttui. Sääntö "uusin voittaa"
elää pelin puolella, ei kuoressa — silloin sen voi korjata verkosta
päivittämällä eikä App Storen kautta.

Jos laitteessa ei ole iCloud-tiliä, varasto toimii yhä mutta vain
paikallisesti. Peli näkee sen (`ominaisuudet.talleSynkka`) ja voi kertoa
sen pelaajalle.

Pelin puoli on nyt kytketty (js/natiivi.js). Se tekee kolme asiaa:
pilveen kirjoitetaan korkeintaan kerran kymmenessä sekunnissa (viimeisin
tila ei silti koskaan jää lähettämättä); kesken olevaa matkaa **ei
koskaan korvata hiljaa**, vaan uudempi tallennus toiselta laitteelta
tarjotaan pelaajalle omassa ikkunassaan; ja passin leimat yhdistetään
sen sijaan että ne korvattaisiin, koska leimakokoelma vain kasvaa eikä
yhdistäminen voi hukata mitään.

### Widget ja Siri lyhyesti

Widget ei lue peliä eikä avaa verkkoa. Peli työntää tilansa (kaupunki,
maa, päivä, kassa) yhteiseen varastoon, ja widget näyttää tasan sen.
Siksi widget toimii lentokoneessa eikä kuluta akkua — ja siksi se näyttää
vanhaa tietoa, jos peliä ei ole avattu vähään aikaan. Sen varalta
keskikokoisessa widgetissä lukee pienellä "päivitetty eilen".

Siri-fraasit ovat valmiina, eikä pelaajan tarvitse rakentaa oikotietä:

- *"Missä olen Matkakirjassa"*
- *"Missä menen Matkakirjassa"*
- *"Matkakirjan tilanne"*
- *"Jatka Matkakirjaa"* / *"Avaa Matkakirja"* (avaa pelin)

Ennen kuin peliä on kertaalleen avattu uudella kuorella, widget lukee
"Matka ei ole alkanut" ja Siri vastaa samoin. Se on oikea vastaus eikä
vika.

## Mitä omistajan pitää tehdä

Kaksi asiaa, ja kumpikin voi odottaa: kuori kääntyy, lähtee TestFlightiin
ja toimii ilman niitä. Ne vain jäävät tekemättä siihen asti.

### 1. Game Center -saavutukset App Store Connectiin

Peli pyytää saavutuksia omilla tunnuksillaan (taulukko alla). Jos
samannimistä saavutusta ei ole luotu Applen puolelle, kutsu palautuu
hiljaa hylättynä eikä pelaaja huomaa mitään — mitään ei siis riko, mutta
mitään ei myöskään kirjaudu.

Saavutus luodaan näin:

1. **appstoreconnect.apple.com → Apps → Matkakirja → Palvelut (Services)
   → Game Center**.
2. Ensimmäisellä kerralla: **Enable Game Center** (kertaalleen koko
   sovellukselle).
3. **Achievements → +**.
4. **Reference Name**: oma muistiinpano, esimerkiksi `Aarre: Lontoo`.
5. **Achievement ID**: *tämä on se tunnus, jonka peli lähettää.* Sen on
   täsmättävä täsmälleen, isot ja pienet kirjaimet mukaan lukien.
6. **Point Value**: pisteet (kaikkien saavutusten summa saa olla enintään
   1000).
7. Kielikohtainen otsikko ja kuvaus suomeksi + kuva (512×512).
8. **Save**.

#### Tunnusluettelo

Peli lähettää näitä neljää tunnusta (js/natiivi.js,
`NATIIVI_SAAVUTUKSET`). Achievement ID on kopioitava täsmälleen — myös
pisteet ja väliviivat.

| Achievement ID | Milloin peli lähettää | Ehdotus otsikoksi |
| --- | --- | --- |
| `fi.matkakirja.peli.saavutus.ensimmainen-aarre` | Ensimmäinen unohdettu aarre löytyy | Ensimmäinen löytö |
| `fi.matkakirja.peli.saavutus.kaikki-aarteet` | Aarnin luettelo täyttyy — kaikki mantereiden aarteet löydetty | Aarnin luettelo täynnä |
| `fi.matkakirja.peli.saavutus.lapipeluu` | Peli päättyy voittoon | Matka kotiin |
| `fi.matkakirja.peli.saavutus.kymmenen-putkeen` | Kymmenen tehtävää oikein putkeen (visa, rosvo, kulttuurikysymys, lehden minitehtävä) | Kymmenen putkeen |

Kaikki neljä ovat kertasaavutuksia (peli lähettää aina 100 %), ja peli
lähettää saman tunnuksen vain kerran käynnissä. Tunnusta, jota ei ole
luotu, ei tarvitse poistaa pelistä — hylätty kutsu on hiljainen.

### 2. Push-avain — vasta kun lähetysputki rakennetaan

**Kuoressa on vain kuuntelupää.** Se kysyy pelaajalta luvan ja hakee
Applelta laitetunnuksen (device token), jonka se antaa pelille. Sillä ei
lähetetä yhtään ilmoitusta, koska **lähetyspäätä ei ole**: ilmoitusten
lähettäminen vaatii palvelimen, joka pitää kirjaa laitetunnuksista,
puhuu Applen APNs-rajapinnalle ja päättää mitä ja milloin lähetetään.

Se on oma projektinsa, ja se kannattaa aloittaa vasta kun tiedetään mistä
pelaajalle ylipäätään halutaan ilmoittaa. Silloin tarvitaan:

- **APNs-avain** (.p8) App Store Connectin *Integrations*-välilehdeltä —
  eri avain kuin käännösajon `ASC_KEY_P8`;
- paikka, jossa laitetunnukset säilytetään;
- palvelin tai palvelu, joka lähettää.

Kuoreen ei tarvitse silloin koskea: tunnus kulkee jo pelille asti.

## Miten tiedämme, että se toimii

`ios/`-kansiossa on kaksi ajoa, ja ne tekevät eri asiaa:

| Ajo | Milloin | Mitä tekee |
| --- | --- | --- |
| `.github/workflows/ios-kaannos.yml` | Joka `ios/`-muutoksesta | Kääntää simulaattorille **ilman allekirjoitusta**. Nopea savukoe: kääntyykö koodi, kelpaako kuvake, löytyvätkö resurssit paketista. |
| `.github/workflows/ios-testflight.yml` | Käsin tai `main`-haaran `ios/`-muutoksesta | Kääntää, **allekirjoittaa** ja lähettää version TestFlightiin. Nukkuu, kunnes salaisuudet on asetettu. |

Savukoe säilyy ennallaan, koska se antaa vastauksen minuuteissa eikä
tarvitse Apple-tiliä lainkaan. Kumpikin ajo käynnistyy vain
`ios/`-muutoksista — Applen koneet maksavat noin kymmenkertaisesti
tavalliseen verrattuna, eikä jokaisen lehtijutun takia ole syytä käyttää
niitä.

## Apple Developer -tili: mitä maksaa ja mihin tarvitaan

**Apple Developer Program maksaa noin 99 euroa vuodessa.** Se on
jatkuva tilaus: jos se päättyy, App Storessa oleva sovellus poistuu
myynnistä (jo asennetut jäävät puhelimiin).

Mihin sitä tarvitaan:

| Asia | Tarvitaanko maksullinen tili |
| --- | --- |
| Sovelluksen kääntäminen ja kokeilu simulaattorissa | Ei |
| Sovellus omaan puhelimeen 7 päiväksi kerrallaan | Ei — ilmainen Apple ID riittää, mutta tarvitaan Mac |
| TestFlight (testaajat, ei aikarajaa) | **Kyllä** |
| App Store -julkaisu | **Kyllä** |

Tili otetaan **henkilökohtaisena** (Individual), ellei sovellusta haluta
julkaista yrityksen nimissä — yritystili vaatii lisäksi ilmaisen mutta
hitaan D-U-N-S-tunnuksen. Henkilötilillä App Storessa lukee myyjänä oma
nimi.

**Tili on nyt hankittu**, joten alla oleva ohje on ajankohtainen.

## Näin peli tulee puhelimeen (tee nämä järjestyksessä)

TestFlight on Applen tapa jakaa sovellus testaajille ennen julkaisua.
Kaikki alla oleva **onnistuu puhelimella** — Macia ei tarvita missään
vaiheessa. Käännöksen, allekirjoituksen ja lähetyksen tekee GitHub
Applen omalla koneella.

Aikaa kuluu noin puoli tuntia näpyttelyä ja sen päälle odottelua:
jäsenyyden aktivoituminen (1–2 vrk) ja Applen käsittely jokaisen
lähetyksen jälkeen (yleensä 5–30 min).

### 1. Odota, että jäsenyys aktivoituu

Apple lähettää sähköpostin, kun **Apple Developer Program** -jäsenyys on
voimassa. Se kestää tavallisesti muutaman tunnin, joskus 1–2
vuorokautta. Ennen sitä App Store Connectin sivut näyttävät tyhjiltä tai
valittavat oikeuksista — silloin ei ole vikaa, vaan odotettavaa.

### 2. Ota talteen tiimitunnus (Team ID)

1. Avaa puhelimen selaimessa **developer.apple.com/account**.
2. Kirjaudu Apple-tunnuksellasi.
3. Valitse **Membership details** (tai *Membership*).
4. Sieltä löytyy **Team ID**: kymmenen merkkiä, esimerkiksi `A1B2C3D4E5`.
   Kopioi se talteen — se on myöhemmin salaisuus `TEAM_ID`.

### 3. Luo App Store Connect -API-avain

Tämä avain on se, jolla GitHub saa luvan allekirjoittaa ja lähettää
sovelluksen puolestasi. Ilman sitä tarvittaisiin Mac.

1. Avaa **appstoreconnect.apple.com** ja kirjaudu.
2. Valitse **Users and Access**.
3. Valitse välilehti **Integrations** (aiemmin *Keys*).
4. Valitse vasemmalta **App Store Connect API** ja sen alta **Team Keys**.
5. Paina **+** (uusi avain).
6. Nimi: esimerkiksi `Matkakirja GitHub`.
7. Rooli (Access): **App Manager**.
8. Paina **Generate**.
9. **Lataa .p8-tiedosto heti.** Sen saa ladata vain kerran — jos se
   katoaa, avain pitää poistaa ja tehdä uusi. Tiedosto menee puhelimen
   **Tiedostot**-kansioon nimellä `AuthKey_XXXXXXXXXX.p8`.
10. Samalta sivulta talteen vielä kaksi asiaa:
    - **Issuer ID** (sivun yläosassa, pitkä viivoilla jaettu tunnus)
    - **Key ID** (avaimen rivillä, kymmenen merkkiä)

### 4. Lisää salaisuudet GitHubiin

GitHubissa: **Settings → Secrets and variables → Actions → New
repository secret**. Neljä kappaletta, nimet täsmälleen näin:

| Salaisuus | Mistä se tulee |
| --- | --- |
| `ASC_KEY_ID` | Kohdan 3 **Key ID** (10 merkkiä) |
| `ASC_ISSUER_ID` | Kohdan 3 **Issuer ID** (pitkä, viivoilla) |
| `ASC_KEY_P8` | Ladatun `.p8`-tiedoston **koko sisältö** |
| `TEAM_ID` | Kohdan 2 **Team ID** (10 merkkiä) |

`.p8`-tiedoston sisällön saa GitHubiin kahdella tavalla, ja **kumpi
tahansa kelpaa** — ajo tunnistaa muodon itse:

- **Helpoin puhelimella:** avaa `.p8` Tiedostot-sovelluksessa (pitkä
  painallus → *Pikakatselu*), tai jaa se johonkin muistiinpanoon, ja
  kopioi teksti sellaisenaan. Se alkaa rivillä
  `-----BEGIN PRIVATE KEY-----`. Liitä koko teksti rivinvaihtoineen.
- **Siistein:** muunna tiedosto base64-muotoon (esim. Oikotiet-sovellus
  → toiminto *Base64-koodaa*) ja liitä se yhtenä pötkönä.

Salaisuuksia ei kirjoiteta koskaan repoon eikä lokiin. Ajo ei tulosta
niiden arvoja, ja GitHub peittää ne lokista silloinkin kun jokin
työkalu yrittäisi näyttää ne.

### 5. Käynnistä ajo ensimmäisen kerran

GitHubissa: **Actions → iOS TestFlight → Run workflow**.

Ensimmäinen ajo tekee kaksi asiaa kerralla: se **luo sovelluksen
tunnisteen** (`fi.matkakirja.peli`) Applen puolelle ja kääntää
allekirjoitetun paketin. Loppu voi kaatua virheeseen tyyliin *"app not
found"* — se on odotettua, koska App Store Connectissa ei vielä ole
sovellusmerkintää. Jatka kohtaan 6.

Jos ajo kaatuu jo allekirjoitusvaiheessa oikeuksiin, tee kohdan 3
avain uudelleen roolilla **Admin** (roolia ei voi jälkikäteen muuttaa,
vaan avain poistetaan ja tehdään uusi) ja päivitä salaisuudet.

### 6. Luo sovellusmerkintä App Store Connectiin

1. **appstoreconnect.apple.com → Apps → +** → **New App**.
2. Platforms: **iOS**.
3. Name: sovelluksen nimi App Storessa, enintään 30 merkkiä
   (esim. `Matkakirja ja unohdettu aarre`). Nimen pitää olla vapaana
   koko App Storessa.
4. Primary Language: **Finnish**.
5. Bundle ID: valitse listasta **fi.matkakirja.peli** (se ilmestyi
   listaan kohdan 5 ajossa).
6. SKU: mikä tahansa oma tunnus, esimerkiksi `matkakirja-ios`.
7. User Access: **Full Access**.
8. **Create**.

*Voiko tämän automatisoida?* Osittain. Ajossa on valinta **"Yritä ensin
luoda App Store Connect -appimerkintä"** (`fastlane produce`), joka
yrittää saman asian API-avaimella. Se onnistuu joskus ja joskus ei:
Apple kysyy ensimmäistä sovellusta luotaessa tietoja, joita rajapinta ei
aina saa avaimelta, ja silloin ajo kaatuu selkeään virheeseen. Käsin
tehtynä tämä on viiden minuutin homma ja tehdään vain kerran, joten
kohdan 6 lista on se varma tie.

Jos tunniste ei jostain syystä ilmestynyt listaan, sen voi luoda käsin:
**developer.apple.com/account → Identifiers → + → App IDs → App**,
Bundle ID **Explicit**: `fi.matkakirja.peli`, kuvaus `Matkakirja`.

### 7. Käynnistä ajo uudestaan

**Actions → iOS TestFlight → Run workflow.** Nyt paketti menee perille.
Ajon yhteenvedossa lukee, millä buildnumerolla versio lähti.

Apple käsittelee latauksen omaan tahtiinsa (yleensä 5–30 min). Sen
jälkeen versio näkyy App Store Connectin **TestFlight**-välilehdellä.

Vientilupakysymystä (*export compliance*) ei kysytä joka kerta, koska
`Info.plist` kertoo valmiiksi, ettei sovellus sisällä omaa salausta.

### 8. Ota TestFlight käyttöön puhelimessa

1. Asenna App Storesta sovellus **TestFlight**.
2. App Store Connectissa: **Apps → Matkakirja → TestFlight →
   Internal Testing → +** (uusi ryhmä), nimeksi esimerkiksi `Oma
   puhelin`.
3. Laita ryhmälle päälle **Automatically distribute builds** — silloin
   jokainen uusi lähetys tulee puhelimeen ilman erillistä klikkausta.
4. Lisää testaajaksi oma Apple-tunnuksesi (**+** testaajien kohdalla;
   olet itse listalla tilin omistajana).
5. Sähköpostiin tulee kutsu. Avaa se puhelimella, hyväksy, ja Matkakirja
   ilmestyy TestFlightiin. Paina **Asenna**.

Sisäisiä testaajia voi olla 100. Applen tarkistusta ei tarvita, joten
versio on käytettävissä heti käsittelyn jälkeen.

### 9. Seuraavilla kerroilla

Kun `ios/`-kansioon tulee muutos `main`-haaraan, ajo lähtee itsestään ja
uusi versio ilmestyy TestFlightiin. **Pelin päivitykset eivät vaadi
tätä** — peli haetaan verkosta, ja vain kuoren muutokset kulkevat App
Storen kautta.

Buildnumero on aina GitHub-ajon numero, joten se kasvaa itsestään eikä
Apple valita kaksoiskappaleesta. Näkyvän versionumeron (nyt 0.2.0) voi
nostaa käsin tiedostossa `ios/project.yml` (`MARKETING_VERSION`), kun
kuoreen tulee jotain kerrottavaa.

### Ennen App Storea (ei vielä ajankohtaista)

Kaksi asiaa, jotka Apple kysyy: sovellus tarvitsee
**tietosuojaselosteen osoitteen** (mikrofonin käytön takia), ja Apple
haluaa nähdä että sovellus tekee itse jotakin — pelkkä verkkosivun kehys
torjutaan joskus. Matkakirjan kohdalla natiiviluenta ja -sanelu ovat
juuri se ero, ja siksi ne ovat kuoressa alusta asti.

## Miten allekirjoitus toimii ilman Macia

Allekirjoitus tehdään **xcodebuildin pilviallekirjoituksella**
(`-allowProvisioningUpdates` + App Store Connect -API-avain): se valittiin
siksi, että Apple luo, säilyttää ja uusii varmenteet itse, jolloin repoon
tai GitHubin salaisuuksiin ei tarvitse tallettaa yhtään varmennetta,
salasanaa eikä erillistä sertifikaattirepoa (`fastlane match` olisi
vaatinut juuri sen). Fastlanea käytetään vain viimeiseen askeleeseen,
lähetykseen — se on ainoa työkalu, joka ottaa API-avaimen vastaan
sellaisenaan ilman käsin syötettäviä vastauksia.

Ajon kulku (`.github/workflows/ios-testflight.yml`):

1. **Portti** halvalla Linux-koneella: onko salaisuudet asetettu? Jos ei,
   kallista mac-ajuria ei käynnistetä lainkaan ja ajo jää vihreäksi.
2. Puretaan API-avain ajurin levylle ja luodaan väliaikainen avainnippu,
   johon Apple tallettaa luomansa varmenteen.
3. **XcodeGen** tekee Xcode-projektin `ios/project.yml`:stä.
4. **xcodebuild archive** kääntää ja allekirjoittaa; buildnumeroksi tulee
   ajon numero.
5. **xcodebuild -exportArchive** paketoi IPA:n App Store -muotoon.
6. **fastlane pilot** (`upload_to_testflight`) lähettää paketin.
7. Avaimet ja avainnippu siivotaan pois, kävi ajossa miten tahansa.

**Ensimmäinen oikea ajo on savukoe.** Putkea ei ole voitu kokeilla
kehityksessä, koska koko ketju vaatii oikean Apple-tilin ja mac-koneen.
Nämä kohdat selviävät vasta silloin:

- riittääkö avaimen **App Manager** -rooli varmenteiden luomiseen, vai
  tarvitaanko **Admin**;
- meneekö `fastlane produce` läpi vai tehdäänkö appimerkintä käsin
  (kohta 6);
- hyväksyykö ajurin Xcode-versio vientitavan nimen `app-store-connect`
  (ajo valitsee sen versionumeron perusteella).

Jos jokin näistä kompastuu, virhe näkyy ajon lokissa selkokielisenä ja
korjaus on yhden rivin muutos — mutta kannattaa varata ensimmäiselle
kerralle rauhallinen hetki eikä yrittää sitä kiireessä.

## Version 0.2.0 riskit ensimmäisessä käännöksessä

Tämä on rehellinen lista, koska version 0.2.0 muutokset osuvat juuri
siihen kohtaan putkea, jota ei voi kokeilla ilman Macia ja Apple-tiliä:
**uudet oikeudet (entitlements) ja uusi widget-kohde**. Koodi kääntyy tai
ei käänny, sen kertoo savukoeajo minuuteissa — mutta *allekirjoitus*
selviää vasta oikeassa TestFlight-ajossa.

Jos ensimmäinen ajo kaatuu, se kaatuu todennäköisesti johonkin näistä.
Yksikään ei riko mitään pysyvästi, ja jokainen on korjattavissa.

**1. Uudet oikeudet eivät ole päällä sovelluksen tunnisteessa.**
Virhe näyttää tältä: *"Provisioning profile ... doesn't include the
com.apple.developer.ubiquity-kvstore-identifier entitlement"* (tai
`application-groups`, `game-center`, `aps-environment`).
Pilviallekirjoitus osaa yleensä kytkeä oikeudet päälle itse, mutta ei
aina — etenkään App Groupia, joka pitää myös *luoda* ennen kuin siihen
voi liittyä. Korjaus käsin, kerran:

- **developer.apple.com/account → Identifiers → App Groups → +**, tunnus
  `group.fi.matkakirja.peli`, kuvaus `Matkakirja`;
- **Identifiers → fi.matkakirja.peli → Capabilities**: rasti kohtiin
  *iCloud* (Key-value storage riittää), *App Groups* (ja valitse yllä
  luotu ryhmä), *Game Center*, *Push Notifications*;
- **Save**, ja aja ajo uudestaan.

**2. Widgetin tunnistetta ei ole olemassa.** Widget on Applelle oma
sovellus omalla tunnisteellaan `fi.matkakirja.peli.widget`. Automaattinen
allekirjoitus luo sen yleensä itse ensimmäisellä ajolla; jos ei, se
tehdään samalla tavalla käsin (*Identifiers → + → App IDs → App*,
Explicit `fi.matkakirja.peli.widget`) ja siihen lisätään **App Groups**.

**3. `aps-environment: production` ja TestFlight.** Tämä on oikea arvo
App Store- ja TestFlight-paketeille. Se ei estä mitään, mutta se vaatii
että Push Notifications on päällä tunnisteessa (kohta 1). Ilmoituksia ei
tule kummassakaan tapauksessa, koska lähetyspäätä ei ole.

**4. Widget kääntyy mutta ei näy kotinäytöllä.** Silloin paketti on
kunnossa mutta App Group -oikeus puuttuu joko sovellukselta tai
widgetiltä, ja widget lukee tyhjää. Tuntomerkki: widgetin voi lisätä
kotinäytölle, mutta siinä lukee ikuisesti "Matka ei ole alkanut".
Sama korjaus kuin kohdassa 1, molemmille tunnisteille.

**5. Siri-fraasit iOS 16.0–16.3.** Valmiit puhefraasit vaativat iOS
16.4:n. Sitä vanhemmissa aikeet toimivat Oikotiet-sovelluksessa, mutta
Siri ei tunnista fraaseja ilman että pelaaja tekee oikotien itse. Tämä
koskee hyvin pientä joukkoa laitteita eikä sitä kannata korjata
nostamalla koko kuoren alarajaa.

**6. Widget-kohde ja versionumerot.** App Store Connect hylkää latauksen,
jos widgetin ja sovelluksen versionumerot eroavat. Molemmat lukevat samat
arvot `ios/project.yml`:stä, ja savukoeajo tarkistaa täsmäyksen — mutta
jos joskus lisää widgetin Info.plistiin kovan versionumeron, tämä
räjähtää vasta lähetysvaiheessa.

**7. Ensimmäinen käännös on pidempi.** Widget on toinen kohde, joten
mac-ajurin minuutteja kuluu enemmän kuin ennen. Se ei ole vika.

Mitä EI voi mennä rikki: peli. Kuori hakee pelin verkosta kuten ennenkin,
eikä yksikään uusi silta ole pelin toiminnan edellytys. Jos koko 0.2.0
osoittautuisi hankalaksi, edellinen TestFlight-versio on yhä testaajien
puhelimissa.

## Macilla tekeminen (tekninen muistilista)

```
brew install xcodegen
cd ios
xcodegen generate
open Matkakirja.xcodeproj
```

Xcode-projektitiedostoa ei säilytetä repossa: se on konegeneroitua
tuhatrivistä XML:ää, joka törmäisi joka yhdistämisessä. Kaikki projektin
asetukset ovat luettavassa muodossa tiedostossa `ios/project.yml`.

## Kansion sisältö

| Tiedosto | Mitä |
| --- | --- |
| `project.yml` | Xcode-projektin määrittely (XcodeGen), molemmat kohteet |
| `Matkakirja/MatkakirjaSovellus.swift` | Sovelluksen käynnistys + APNs-delegaatti |
| `Matkakirja/Asetukset.swift` | Pelin osoitteen lukeminen, sillan versionumero |
| `Matkakirja/Selain/PeliSelain.swift` | Selain, lataus, virhetilat, linkit |
| `Matkakirja/Selain/NatiiviSilta.swift` | Sillat pelin JavaScriptiin (komentojen jako) |
| `Matkakirja/Selain/LuentaSilta.swift` | Teksti puheeksi |
| `Matkakirja/Selain/SaneluSilta.swift` | Puhe tekstiksi |
| `Matkakirja/Selain/TalleSilta.swift` | Tallennussynkka iCloudin kautta |
| `Matkakirja/Selain/HaptiikkaSilta.swift` | Tuntopalaute |
| `Matkakirja/Selain/JakoSilta.swift` | Tekstin ja kuvan jakaminen |
| `Matkakirja/Selain/PelikeskusSilta.swift` | Game Center: kirjautuminen ja saavutukset |
| `Matkakirja/Selain/WidgetSilta.swift` | Pelin tila widgetille |
| `Matkakirja/Selain/IlmoitusSilta.swift` | Push-lupa ja laitetunnus (ei lähetystä) |
| `Matkakirja/Selain/natiivi-silta.js` | Rajapinta pelin puolella + sen ohje |
| `Matkakirja/Aikeet/MissaOlenAie.swift` | Siri: "Missä olen Matkakirjassa" |
| `Matkakirja/Nakymat/` | Lataus-, virhe- ja asetusnäkymät + värit |
| `Matkakirja/Resurssit/Config.plist` | **Pelin osoite** |
| `Matkakirja/Resurssit/Info.plist` | Nimi, luvat, asennot |
| `Matkakirja/Resurssit/Matkakirja.entitlements` | Oikeudet: iCloud, App Group, Game Center, push |
| `Yhteinen/JaettuPelitila.swift` | Sovelluksen ja widgetin yhteinen tila-varasto |
| `MatkakirjaWidget/` | Kotinäyttöwidget (oma laajennuskohteensa) |
| `Gemfile`, `Gemfile.lock` | Fastlanen versio lukittuna lähetystä varten |
| `fastlane/Fastfile` | Lähetyskaista TestFlightiin (+ appimerkinnän kokeilu) |
| `fastlane/Appfile` | Sovelluksen tunniste fastlanelle |
| `tyokalut/tee-ikoni.py` | Väliaikaisen kuvakkeen piirtäjä |
