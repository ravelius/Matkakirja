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

- **Allekirjoitusta ei ole.** Sovellusta ei siis voi vielä asentaa
  puhelimeen. Tämä versio todistaa, että sovellus kääntyy.
- Sovellusta ei ole ajettu oikealla laitteella, koska kehityskoneessa ei
  ole Macia. Ensimmäinen laiteajo tehdään yhdessä.

## Miten tiedämme, että se toimii

Joka kerta kun `ios/`-kansioon tulee muutos, GitHub kääntää sovelluksen
Applen omalla koneella (`.github/workflows/ios-kaannos.yml`). Vihreä
merkki tarkoittaa: koodi kääntyi, kuvake kelpasi, ja sovelluspaketista
löytyivät kaikki tarvittavat osat. Ajo käynnistyy vain `ios/`-muutoksista
— Applen koneet maksavat noin kymmenkertaisesti tavalliseen verrattuna,
eikä jokaisen lehtijutun takia ole syytä käyttää niitä.

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

Tiliä ei kannata hankkia vielä. Se maksaa vuodesta riippumatta siitä,
käytetäänkö sitä, ja peli ehtii kehittyä ensin.

## Miten TestFlight etenee, kun sen aika on

TestFlight on Applen tapa jakaa sovellus testaajille ennen julkaisua.
Kun tili on hankittu, järjestys on:

1. **Tunnisteen varaus.** Sovellukselle varataan tunnus (nyt
   `fi.matkakirja.peli`) App Store Connectissa.
2. **Allekirjoitus.** Apple myöntää varmenteen, joka todistaa että
   sovellus on meiltä. Tämä tehdään kerran, ja sen jälkeen se uusiutuu
   pitkälti itsestään.
3. **Ensimmäinen lataus.** Sovellus käännetään, allekirjoitetaan ja
   lähetetään App Store Connectiin.
4. **Sisäiset testaajat.** Omat laitteet mukaan heti (enintään 100
   testaajaa, ei Applen tarkistusta). Sovellus tulee puhelimeen
   TestFlight-sovelluksen kautta.
5. **Ulkoiset testaajat**, jos halutaan: enintään 10 000 testaajaa, ja
   Apple katsoo sovelluksen kerran läpi (yleensä päivä tai pari).
6. **App Store**, jos ja kun halutaan: kuvaus, kuvakaappaukset,
   ikäraja, tietosuojaseloste ja Applen tarkistus.

Vaiheet 1–3 tehdään yhdessä: ne vaativat kirjautumisen Apple-tilille ja
muutaman valinnan, joita ei voi tehdä puolestasi. Kun ne on kerran
tehty, uuden version lähettäminen on nopeaa.

Ennen App Storea kannattaa varautua kahteen asiaan, jotka Apple kysyy:
sovellus tarvitsee **tietosuojaselosteen osoitteen** (mikrofonin käytön
takia), ja Apple haluaa nähdä että sovellus tekee itse jotakin — pelkkä
verkkosivun kehys torjutaan joskus. Matkakirjan kohdalla natiiviluenta
ja -sanelu ovat juuri se ero, ja siksi ne ovat kuoressa alusta asti.

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
| `tyokalut/tee-ikoni.py` | Väliaikaisen kuvakkeen piirtäjä |
