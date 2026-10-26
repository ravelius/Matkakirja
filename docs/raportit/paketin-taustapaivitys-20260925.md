# Sisältöpaketin taustapäivitys natiivissa (selvitys, 25.9.2026)

Siirtoseppä (Opus), Fablen tilaus. Tämä on selvitys, ei toteutus. Esilatauspolitiikka
odottaa omistajan hyväksyntää. Mittaukset on tehty ämpäristä 25.9. klo 15.4x. Natiivin
nykytila on luettu proto-masterista (`Assets/Matkakirja/Kartta/Sisalto.cs`, `Laattapalvelin.cs`,
`Alueet.cs`, `UI/Kuvat.cs`).

## 1. Nykytila natiivissa

- Osoitin (`sisalto/1/uusin.json`, max-age 60 s) haetaan kerran istunnossa ensimmäisen
  sisältöpyynnön yhteydessä (`Sisalto.cs:104-141`). Siitä luetaan vain `versio`, `polku` ja
  `skeemaversio`. Jos haku epäonnistuu, käytetään `viimeisin.txt`:n polkua.
- Kokoelmat haetaan laiskasti tiedosto kerrallaan kansioon `persistentDataPath/sisalto/1/v<N>/`.
  Kirjoitus on atominen. Uusi versio tulee käyttöön seuraavassa istunnossa.
- **Puuttuu:** `minSovellus` ei ole luettu, `manifest.json`:ia ei käytetä, sha256:ta ei tarkisteta,
  verkkotyyppiä (Wi-Fi/mobiili) ei eroteta eikä vanhoja `v<N>`-kansioita poisteta.
- **Riski:** uusi versio otetaan käyttöön ennen kuin sen tiedostot ovat laitteella. Jos verkko
  katkeaa, kokoelma, jota ei ole vielä avattu, puuttuu, vaikka edellinen versio olisi levyllä kokonaan.
- **Tämänpäiväinen opetus (1.42):** vanha build kärsi aineistosta, joka oli kasvanut. Osoitin
  palautettiin käsiajolla, ja natiivi palaa versioon v106 seuraavassa käynnistyksessä. `minSovellus`
  olisi estänyt tämän, jos natiivi lukisi sen.

## 2. Mitattu: delta vai koko paketti

| Väli | Muuttuneet tiedostot | Raakana |
|---|---|---|
| v106 → v107 | 2 | 8,6 Mt (maakuntarajat 8,3) |
| v104 → v107 | 6 | 9,9 Mt |
| v102 → v107 | 9 | 43,8 Mt (kaupunkilehdet 15,5, media.json 13,4) |
| v90 → v107 | 119 / 498 | 87,4 Mt |

- Koko 1.x-paketti on raakana 108 Mt. Gzipattuna JSON on noin 22 Mt. Ämpäri palvelee brotlilla:
  kaupunkilehdet 15,5 Mt siirtyy 2,3 Mt:nä. Siirtokoko on siis noin **1/5 raakakoosta**.
- Manifestissa on jokaiselle tiedostolle `sha256` ja `tavuja` (498 tiedostoa, 0,26 Mt), joten
  **tiedostotason delta onnistuu ilman palvelinmuutosta**. Tyypillinen sisältöjuna muuttaa 2–10
  tiedostoa, eli siirrettävää on alle 3 Mt. Binääridelta (bsdiff) ei kannata, koska isot kokoelmat
  vaihtuvat kerralla ja brotli pakkaa ne jo hyvin.

## 3. Ehdotettu kulku

1. **Tarkistus:** hae osoitin käynnistyksessä ja taustalta palatessa, enintään kerran 6 tunnissa.
   Jos `minSovellus.ios` on suurempi kuin oman buildin taso, pysy nykyisessä versiossa (ks. kohta 5).
2. **Lataus taustalla:** hae uuden version `manifest.json` ja vertaa tiedostojen sha256-tiivisteitä
   levyllä oleviin. Hae vain puuttuvat, yksi kerrallaan matalalla prioriteetilla. Tarkista kunkin
   tiedoston sha256 heti latauksen jälkeen. Keskeytynyt lataus jatkuu seuraavasta tiedostosta, koska
   jokainen tiedosto on oma atominen yksikkönsä. Pelaaminen jatkuu vanhalla versiolla koko ajan.
3. **Valmis:** kun kaikki manifestin tiedostot on tarkistettu, kirjoita `valmis.json` (versio, polku).
   Vasta tämän jälkeen versio kelpaa käyttöön.
4. **Käyttöönotto** tapahtuu seuraavassa käynnistyksessä tai joutilaana, kun pelaaja on aloitusruudussa
   tai valikossa. Ei koskaan kesken lennon, luennan tai auki olevan lehden. Kerro muutoksesta
   "Mitä uutta" -rivillä (osoittimen `muutos`).
5. **Palautus:** natiivi seuraa osoitinta myös taaksepäin. Säilytä levyllä käytössä oleva ja
   edellinen versio, jolloin palautus toimii ilman latausta.

## 4. Mobiilidata

- Tarkistuksen käytössä ovat iOS:n `NWPathMonitor` ja sen tiedot `isExpensive` ja `isConstrained`
  (Low Data Mode). Unityn `internetReachability` erottaa vain mobiiliverkon.
- **Ehdotus omistajalle:**
  - Alle 5 Mt:n delta ladataan aina, myös mobiilidatalla (tavallinen juna on 1–3 Mt).
  - Yli 5 Mt:n delta ja koko paketti ladataan Wi-Fi:llä tai pelaajan luvalla (asetus
    "Päivitä mobiilidatalla").
  - Low Data Mode lykkää kaiken.
- Offline-laattoja ja -mediaa ei ladata automaattisesti koskaan. Pelaaja valitsee ne itse
  (`offline.json`, arvio tavuina).

## 5. offline.json:n rooli

- Tiedosto kertoo, mitä on ladattavissa, ei mitä on ladattu: laattasarjojen osoitteet, maittaiset
  laattavälit, median osoitteet ja arviot tavuina. Se päivittyy paketin mukana kuten muutkin tiedostot.
- Jos `lahteet.rasteri.url` tai maaston osoite (sarjan nimi) vaihtuu, jo ladatut maat merkitään
  päivitettäviksi. Vanha sarja säilyy, kunnes uusi on ladattu. Uusi haetaan vasta pelaajan luvalla
  tai Wi-Fi:llä.
- `minSovellus` ja välit kuuluvat samaan pakettiversioon. Offline-alue ladataan siksi sen
  pakettiversion `offline.json`:n mukaan, joka on käytössä.

## 6. Välimuistit levyllä (avaimet)

| Välimuisti | Avain | Vanheneminen | Nyt |
|---|---|---|---|
| Paketti | **sha256** (`sisalto/tiedostot/<sha256>`) + versiokohtainen manifest | Käytössä oleva ja edellinen versio pidetään, muut poistetaan manifestien viittauslaskennalla | kansio per versio, kasautuu |
| Laatat | **sarjan nimi URL:ssa** (`…/2026-09-25-pohja-20260925/z/x/y`, maasto `2026-09-23b`) | Sarjat ovat muuttumattomia. Vanha sarja poistetaan, kun uuden sarjan alue on valmis | URL-polku, sarja mukana, tilapäisessä välimuistissa raja 600 Mt |
| Kuvat ja media | **osoite** | Uudelleenvalidointi ETagilla (`If-None-Match`) harvoin, esim. 30 päivän välein | osoite, ei rajaa |

Sisältötiiviste avaimena tekee kahden version jakamista tiedostoista yhden kopion. Näin 22 Mt:n
pakettia ei tallenneta kahdesti, ja palautus toimii ilman latausta.

## 7. Siirtosepän puolella, jos omistaja hyväksyy

- Osoittimeen tasoittainen kartta `{ "ios": { "1": 106, "2": 107 } }`, jotta vanha build löytää
  uusimman version, jota se osaa lukea. Nyt osoitin on yksi, ja `minSovellus` vain estää.
- Osoittimeen paketin kokonaistavut ja siirtoarvio (brotli), jotta delta voidaan arvioida ennen
  latausta.
- `media.json`:iin tiiviste jokaiselle medialle. Tämä on uusi skeemaversio, ja sitä tarvitaan vain,
  jos kuvia vaihdetaan samassa osoitteessa.
- Julkaisusääntö (Fable 25.9.): kun aineiston koko tai kattavuus kasvaa oleellisesti, lisäys vaatii
  Natiivisepän kuittauksen ennen tuotantoa.
