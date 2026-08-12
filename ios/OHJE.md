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

Kuorella on oma versionumeronsa (nyt 0.1.0). **Se ei liity pelin
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
Apple valita kaksoiskappaleesta. Näkyvän versionumeron (nyt 0.1.0) voi
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
| `project.yml` | Xcode-projektin määrittely (XcodeGen) |
| `Matkakirja/MatkakirjaSovellus.swift` | Sovelluksen käynnistys |
| `Matkakirja/Asetukset.swift` | Pelin osoitteen lukeminen |
| `Matkakirja/Selain/PeliSelain.swift` | Selain, lataus, virhetilat, linkit |
| `Matkakirja/Selain/NatiiviSilta.swift` | Sillat pelin JavaScriptiin |
| `Matkakirja/Selain/LuentaSilta.swift` | Teksti puheeksi |
| `Matkakirja/Selain/SaneluSilta.swift` | Puhe tekstiksi |
| `Matkakirja/Selain/natiivi-silta.js` | Rajapinta pelin puolella + sen ohje |
| `Matkakirja/Nakymat/` | Lataus-, virhe- ja asetusnäkymät |
| `Matkakirja/Resurssit/Config.plist` | **Pelin osoite** |
| `Matkakirja/Resurssit/Info.plist` | Nimi, luvat, asennot |
| `Gemfile`, `Gemfile.lock` | Fastlanen versio lukittuna lähetystä varten |
| `fastlane/Fastfile` | Lähetyskaista TestFlightiin (+ appimerkinnän kokeilu) |
| `fastlane/Appfile` | Sovelluksen tunniste fastlanelle |
| `tyokalut/tee-ikoni.py` | Väliaikaisen kuvakkeen piirtäjä |
