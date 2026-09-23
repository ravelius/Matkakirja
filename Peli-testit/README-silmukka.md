# Pelattava silmukka pallolla (erä 3) — ohje 3D-selvittäjälle ja Laitetestaajalle

Pariisi → napautus kaupunkiin → matkavalinta → kamera-ajo → kaupunkilehti → paluu kartalle.
Kaikki koodi on kansiossa `Assets/Matkakirja/Scripts/Peli/` (Assembly-CSharp):

| Tiedosto | Tehtävä |
|---|---|
| `PeliOhjain.cs` | Käynnistyy itse, lataa sisällön ja laattamäärät, luo/lataa pelin, ohjaa silmukkaa, tallentaa |
| `PeliApu.cs` | Puhdas logiikka ilman UnityEngineä: kulkutavat kohteeseen, Matkan teot, siirron valinta kohti tavoitetta, reitin askeleen lat/lon (isoympyrä), ajon kesto, atominen tallennus. Testit `Testit/PeliApuTestit.cs` |
| `MatkaDialogi.cs` | Matkavalinta (UGUI + TMP koodista, pergamentti + EB Garamond) ja "Heitä noppaa" -nappi |
| `Tilarivi.cs` | Raha · päivä · vuorokaudenaika · sijainti yläreunassa (safe area) + lyhyt viesti |
| `PeliKomennot.cs` | Testikomennot tiedostosta `Documents/peli-komento.txt` |

## Mitä 3D-selvittäjän pitää tehdä

**Ei Rakennus.cs- eikä kohtausmuutoksia.** `PeliOhjain.Kaynnista()` on
`[RuntimeInitializeOnLoadMethod(AfterSceneLoad)]`: se etsii kohtauksesta `PalloKierto`,
`KaupunkiMerkit` ja `LehtiKuori` (tai luo lehtikuoren `LehtiKuori.Hae()`), luo olion
`PeliOhjain` ja tarvittaessa `EventSystem` + `InputSystemUIInputModule` (UGUI-napit;
projektin syöte on pelkkä Input System). Fontti otetaan `KaupunkiMerkit.fontti`sta.

1. `./aja.sh sim && ./aja.sh xcode-sim && ./aja.sh asenna-sim <UDID>` (uudet skriptit tuodaan
   käännöksessä; `luo` ei ole pakollinen, koska kohtaus ei muutu).
2. Lokissa pitää näkyä `MATKAKIRJA peli: sisältö sisalto/1/v1/, 266 kaupunkia …`,
   `MATKAKIRJA peli: laattoja 266 (moduulit/js/packs/maailmankartta.json)` (tai `kokoelmat/laatat.json`,
   kun Siirtosepän pino on ämpärissä) ja `MATKAKIRJA peli: uusi peli, 300 puntaa · päivä 1 · aamu · Pariisi`.
   Kamera ajaa Pariisiin ja itsestään pyöriminen loppuu.
3. Aja testiskripti (alla) ja tarkista `peli-tila-*.json` ja `peli-loki.txt`.

**Jos itsekäynnistys ei jostain syystä herää** (lokissa ei yhtään `MATKAKIRJA peli:` -riviä):
tarkka koukku on yksi rivi `KaupunkiMerkit.Start()`in loppuun:
`Matkakirja.Natiivi.PeliOhjain.Kaynnista();` (toinen kutsu ei tee mitään).

**3D-mittaukset ilman peliä:** tiedosto `Documents/peli-pois.txt` käynnistyksessä tai
komento `peli pois` → napautus lentää kaupunkiin ja näyttää nimikortin kuten ennen, eikä
pelin UI:ta piirretä. `peli paalle` palauttaa. Huom: kun peli on päällä, 3D:n oma komento
`kaupunki id` (Komennot.cs) avaa matkavalinnan, ja peli korvaa lennon yleiskuvalla.

## Miten silmukka kulkee

- **Käynnistys:** `uusin.json` → versiopolku → `kokoelmat/kaupungit.json` ja `reitit.json`
  raakatekstinä samaan välimuistiin kuin Sisalto.cs (`persistentDataPath/sisalto/<polku>`,
  kirjoitus atomisesti) → `Reittiverkko`. Laattamäärät: `kokoelmat/laatat.json`, jos puuttuu
  (404) `moduulit/js/packs/maailmankartta.json` (1,7 Mt; määrät tiivistetään kerran
  tiedostoon `sisalto/<polku>peli/laattamaarat.json`); kumpaakaan ei saatu → peli ilman
  laattoja. Kysymykset, tarinakaari ja paikkatiedot ladataan taustalla (`PeliOhjain.Kysymykset`,
  seuraavaa erää varten; kysymys-UI:ta ei vielä ole, joten Pysy-tapaa ei tarjota).
- **Peli:** `tallennus.json` → `Matka.Lataa(verkko, json, laattamäärät)`, muuten uusi peli
  Pariisista (`Matka.UusiPeli(…, laattamäärät)`). Tallennus atomisesti (tmp + File.Replace)
  joka teon jälkeen, lehden sulkeutuessa ja sovelluksen mennessä taustalle.
- **Napautus kaupunkiin** (IKamera.KaupunkiNapautettu) kartalla → matkavalinta:
  kaupungin nimi, raha · päivä · aika, napit: **Bussi** 50 p (naapuri maareittiä, raha riittää;
  perillä heti, aika ei kulu), **Lento** 300 p (lentoreitti), **Liftaus** (noppa, ilmainen) ja
  **Laiva** (noppa, 100 p satamasta), noppamatkoille askelmäärä perille. Peruuta tai
  himmennyksen napautus sulkee. Kamera ajaa yleiskuvaan (pelaaja ja kohde), ei kaupunkiin.
- **Noppa:** Matka heittää; jos kohde on siirroissa, mennään sinne, muuten siirtoon, josta on
  vähiten askelia perille (tasapelissä lyhin isoympyrä).
- **Ajo:** `IKamera.Aja(lat, lon, KorkeusKaarelle(18,6°), 1,5–3 s)`; reitin varren piste on
  isoympyrällä a→b osuudella idx/askeleet. Sormi keskeyttää PalloKierron ajon ilman
  valmis-kutsua, joten silmukalla on varareitti (kesto + 0,75 s).
- **Perillä kaupungissa** → `LehtiKuori.Avaa(kaupunki)`; `Suljettu` → tallennus → kartta.
  **Reitin varrella** → ei lehteä, alareunaan "Heitä noppaa → Kohde".

## Testikomennot (Documents/peli-komento.txt)

Sovellus lukee tiedoston sekunnin välein, poistaa sen ja ajaa rivit järjestyksessä. Tulokset:
`Documents/peli-loki.txt` (joka rivi: aika, komento → ok/VIRHE, silmukan tila) ja `tila`-komennon
JSON-tiedostot. 3D:n `komento.txt` (esim. `kuva nimi`) toimii rinnalla.

| Komento | Toiminta |
|---|---|
| `napauta kaupunki` | kuin sormi kaupungin merkillä (KaupunkiMerkit.ValitseKaupunki) |
| `valitse bussi\|lento\|liftaus\|laiva` | matkavalinnan nappi |
| `peruuta` | matkavalinnan Peruuta |
| `matka kaupunki tapa` | valinta ilman dialogia |
| `heita` | "Heitä noppaa" (kesken reitin) |
| `sulje-lehti` | sulkee lehden kuin pelaaja |
| `tila [nimi]` | `peli-tila.json` / `peli-tila-nimi.json`: silmukka, vaihe, sijainti, raha, päivä, aika, tilarivi, dialogi ja vaihtoehdot, tavoite, lehtiAuki, viesti, virhe, viimeisin matka |
| `odota s` / `odota-tila tila [max s]` | tauko / odota tilaa Kartta, Dialogi, Matkalla, Lehti (aikaraja kirjataan lokiin) |
| `uusi-peli [siemen]` | uusi peli Pariisista, toistettava noppa |
| `peli pois\|paalle` | silmukka pois/päälle |

Simulaattorissa:

```sh
D="$(xcrun simctl get_app_container booted app.matkakirja.proto3d data)/Documents"
cp Peli-testit/silmukka-30s.txt "$D/peli-komento.txt"
sleep 35; cat "$D/peli-loki.txt"; for f in "$D"/peli-tila-*.json; do echo "$f"; cat "$f"; echo; done
```

### 30 s silmukka (`Peli-testit/silmukka-30s.txt`)

```
odota-tila kartta 40
uusi-peli 12345
odota 2
tila 1-alku
napauta lontoo
odota-tila dialogi 3
odota 1.5
tila 2-dialogi
valitse bussi
odota-tila lehti 6
tila 3-lehti-lontoo
odota 4
sulje-lehti
odota-tila kartta 3
odota 1
tila 4-lontoossa
napauta pariisi
odota-tila dialogi 3
odota 1
valitse liftaus
odota-tila lehti 6
tila 5-lehti-pariisi
odota 3
sulje-lehti
odota-tila kartta 3
odota 1
tila 6-loppu
```

Odotettu (laskettu dotnetilla samalla paketilla ja 266 laatalla):

| Tiedosto | silmukka | sijainti | raha · päivä · aika | muuta |
|---|---|---|---|---|
| 1-alku | Kartta | c:pariisi | 300 · 1 · aamu | vaihe Heitto (liftaus esivalittu) |
| 2-dialogi | Dialogi | c:pariisi | 300 · 1 · aamu | dialogi lontoo, vaihtoehdot Bussi 50, Liftaus 0 (askelia 3) |
| 3-lehti-lontoo | Lehti | c:lontoo | 250 · 1 · aamu | lehtiAuki true, viimeisin saapui lontoo |
| 4-lontoossa | Kartta | c:lontoo | 250 · 1 · aamu | lehtiAuki false |
| 5-lehti-pariisi | Lehti | c:pariisi | 250 · 1 · keskipäivä | viimeisin noppa 4, saapui pariisi |
| 6-loppu | Kartta | c:pariisi | 250 · 1 · keskipäivä | |

Jos laattamääriä ei saatu (peli ilman laattoja), noppa on eri ja liftaus voi jäädä reitille:
silloin `odota-tila lehti` kirjaa aikarajan ja `heita` jatkaa. Reitin varren kokeilu:
`uusi-peli 1`, `matka marseille liftaus` (noppa 3 → `e:pariisi|marseille:3`, Heitä-nappi
näkyy), `heita` (noppa 2 → Marseille, lehti).

## Käännöstarkistus ilman editoria

`Peli-testit/unity-tarkistus.sh` kääntää Unityn csc:llä `Assets/Matkakirja/Peli/*.cs`
(netstandard 2.1, ilman UnityEngineä kuten asmdef) ja `Assets/Matkakirja/Scripts/**/*.cs`
kahdesti: iOS/IL2CPP-moduuleja vasten (`UNITY_IOS`) ja editorin moduuleja vasten
(`UNITY_EDITOR`). Pakettien assemblyt (UGUI, TMP, Input System, Cesium, Mathematics …)
luetaan `/Users/Shared/Claude/proto-3d/Matkakirja-proto/Library/ScriptAssemblies/`
(vain luku; toinen polku: `MATKAKIRJA_KIRJASTOT=…`). Poistumiskoodi = virheiden määrä;
`-v` näyttää varoitukset. `./kaanna.sh` kääntää nyt myös `Scripts/Peli/PeliApu.cs`:n testeihin.

## Rajoitukset ja riskit

- Pallon napautus ei tiedä UI:sta (PalloKierto lukee kosketukset suoraan): peli ohittaa
  napautukset matkavalinnan ja Heitä-napin päällä ja korvaa 3D:n lennon LateUpdatessa.
  Veto dialogin päällä pyörittää silti palloa.
- Kysymykset, laattojen kääntö, kaksintaistelu ja pulmat odottavat kysymys-UI:ta; laatat
  vaikuttavat nyt vain pankkiavun tavoitteisiin. Auki jäänyt kysymys suljetaan latauksessa.
- Maailmankartta-moduulin (1,7 Mt) jäsennys ensimmäisellä käynnistyksellä pääsäikeessä
  (~0,2 s Macilla), sen jälkeen tiivistetty välimuisti.
- Simulaattorissa lehti on oikea WKWebView (verkko tarvitaan); editorissa lehti sulkeutuu
  seuraavassa ruudussa.
