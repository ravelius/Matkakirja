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
`KaupunkiMerkit`, luo olion
`PeliOhjain` ja tarvittaessa `EventSystem` + `InputSystemUIInputModule` (UGUI-napit;
projektin syöte on pelkkä Input System). Fontti otetaan `KaupunkiMerkit.fontti`sta.

1. `./aja.sh sim && ./aja.sh xcode-sim && ./aja.sh asenna-sim <UDID>` (uudet skriptit tuodaan
   käännöksessä; `luo` ei ole pakollinen, koska kohtaus ei muutu).
2. Lokissa pitää näkyä `MATKAKIRJA peli: sisältö sisalto/1/v1/, 266 kaupunkia …`,
   `MATKAKIRJA peli: laattoja 266 (kokoelmat/laatat.json)` ja `MATKAKIRJA peli: uusi peli, 300 puntaa · päivä 1 · aamu · Pariisi`.
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
  kirjoitus atomisesti) → `Reittiverkko`. Laattamäärät: `kokoelmat/laatat.json` (määrät tiivistetään kerran
  tiedostoon `sisalto/<polku>peli/laattamaarat.json`; webin moduulin varareitti poistettu
  24.9.2026); ei saatu → peli ilman laattoja. Kysymykset, tarinakaari ja paikkatiedot ladataan taustalla (`PeliOhjain.Kysymykset`,
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
- **Perillä kaupungissa** → natiivilehti (`ILehtiNakyma.Nayta`, Natiivi-UI); `Suljettu` → tallennus → kartta.
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
| `etsi-katko [kaupunki]` / `aarrepiste` | lehden tehtävänappi (Etsi kätkö / Tapaa X; lehti auki → sulkeutuu ja kysymys alkaa) / vihreän aarrepisteen napautus (lukittuna ohje) |
| `mannerlennot` | kortin "Mannerlento": matkavalinta mannerlennoille (vain kun mantereen aarre löytyi ja vaihe Toiminta) |
| `matka kaupunki tapa` | valinta ilman dialogia (tapa bussi, lento, liftaus, laiva, mannerlento tai peninkulma = seitsemän peninkulman askel) |
| `heita` | "Heitä noppaa" (kesken reitin) |
| `sulje-lehti` | sulkee lehden kuin pelaaja |
| `ohita-traileri` | saapumistrailerin ohitus. Kun Natiivi-UI:n traileri on käytössä, saapuminen menee Matkalla → **Traileri** → Lehti, kerran per kaupunki eikä aarrekaupungeissa; käsikirjoituksissa `odota-tila lehti` tarvitsee lisäaikaa tai `ohita-traileri` |
| `maalehti ISO3 [aihe]` | maan lehti aiheen sivulta (kartuscha; web PR #2955) |
| `liiku kaupunki` | kortin "Liiku tänne": kortti kiinni, matkavalinta auki (tila Dialogi) |
| `kortti kaupunki` / `lue-lehti kaupunki` | kaupunkikortti (Natiivi-UI:n tehdas) / lehti ilman matkaa |
| `tutki [vaikea]` | "Tutki kaupunkia" -nappi: kysymys auki (tila Kysymys) |
| `vastaa i\|oikea\|vaara` | vaihtoehto i (0..), oikea tai ensimmäinen näkyvä väärä |
| `aloita` | kohtaamisen tervehdyssivun "Aloita peli" (aika alkaa vasta tästä) |
| `vihje` / `puolita` | vihje 40 £ / 50:50 80 £ (virhe näkyy kysymyksen alareunassa) |
| `jatka` | tuloksen Jatka-nappi: kysymys kiinni, vuoro päättyy |
| `luento kaupunki\|intro\|lento\|saapuminen kaupunki` | soittaa luennan ehdoitta (tila-JSONin `puhe`: soi, url, aika, virhe) |
| `puhe seis\|pois\|paalle` | pysäyttää puheen / kertoja pois tai päälle (Asetukset Kytkin.Kertoja) |
| `tila [nimi]` | `peli-tila.json` / `peli-tila-nimi.json`: silmukka, vaihe, sijainti, raha, päivä, aika, tilarivi, dialogi ja vaihtoehdot, tavoite, lehtiAuki, viesti, virhe, viimeisin matka; erä 4: syoteEstetty, tutkiTarjolla, kysymys (laji, otsikko, kysymys, vaihtoehdot, piilotetut, vihje, sekunnit, jaljella, vastattu, valittu, oikea, oikein, aikaLoppui, loyto, viesti); laukku (sijainti, kukkaro, tietaja, tilastot, aarni, kateissa, tavarat, julisteet); aanet (12 viimeisintä PeliOhjain.Aani-tunnusta), lentoSoi, aarrepiste (kaupunki, lukittu), tehtavaNappi |
| `odota s` / `odota-tila tila[\|tila…] [max s]` | tauko / odota tilaa Kartta, Dialogi, Matkalla, Lehti, Kysymys, Traileri, Aloitus; useampi pystyviivalla (aikaraja kirjataan lokiin) |
| `jatka-matka` / `uusi-matka [kaupunki] [siemen]` | aloitusnäkymän Jatka / Uusi matka lähtökaupungista (tila Aloitus, kun `PeliOhjain.AloitusNakyma` on päällä; `uusi-peli` toimii myös sieltä) |
| `uusi-peli [siemen] [kaupunki]` | uusi peli (oletus Lontoo, PeliOhjain.AloitusKaupunki), toistettava noppa; käsikirjoitukset antavat `pariisi` |
| `peli pois\|paalle` | silmukka pois/päälle |

Simulaattorissa:

```sh
D="$(xcrun simctl get_app_container booted app.matkakirja.proto3d data)/Documents"
cp Peli-testit/silmukka-30s.txt "$D/peli-komento.txt"
sleep 35; cat "$D/peli-loki.txt"; for f in "$D"/peli-tila-*.json; do echo "$f"; cat "$f"; echo; done
```

### 30 s silmukka (`Peli-testit/silmukka-30s.txt`)

```
odota-tila kartta|aloitus 40
uusi-peli 12345 pariisi
odota 2
tila 1-alku
napauta lontoo
odota 1
liiku lontoo
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
odota 1
liiku pariisi
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
| 1-alku | Kartta | c:pariisi | 300 · 1 · aamu | vaihe Toiminta (Pysy purkaa liftauksen esivalinnan, erä 4) |
| 2-dialogi | Dialogi | c:pariisi | 300 · 1 · aamu | dialogi lontoo, vaihtoehdot Bussi 50, Liftaus 0 (askelia 3) |
| 3-lehti-lontoo | Lehti | c:lontoo | 250 · 1 · aamu | lehtiAuki true, viimeisin saapui lontoo |
| 4-lontoossa | Kartta | c:lontoo | 250 · 1 · aamu | lehtiAuki false |
| 5-lehti-pariisi | Lehti | c:pariisi | 250 · 1 · keskipäivä | viimeisin noppa 4, saapui pariisi |
| 6-loppu | Kartta | c:pariisi | 250 · 1 · keskipäivä | |

Jos laattamääriä ei saatu (peli ilman laattoja), noppa on eri ja liftaus voi jäädä reitille:
silloin `odota-tila lehti` kirjaa aikarajan ja `heita` jatkaa. Reitin varren kokeilu:
`uusi-peli 1 pariisi`, `matka marseille liftaus` (noppa 3 → `e:pariisi|marseille:3`, Heitä-nappi
näkyy), `heita` (noppa 2 → Marseille, lehti).

### Kysymysvirta (`Peli-testit/silmukka-kysymys.txt`, erä 4)

Kysymysmoottori kytkeytyy, kun kysymykset ovat latautuneet; Pariisissa Pysy-tapa (tutkiminen)
purkaa vuoron alun liftausesivalinnan (web beginTurn), joten `k1-alku` on vaihe **Toiminta**.
Odotettu siemenellä 12345 (Testit/SilmukkaKysymysTestit.cs toistaa saman logiikan):

| Tiedosto | silmukka | sijainti | raha | muuta |
|---|---|---|---|---|
| k1-alku | Kartta | c:pariisi | 300 | vaihe Toiminta, tutkiTarjolla true |
| k2-lontoossa | Kartta | c:lontoo | 250 | tutkiTarjolla true (laatta + kohtaaminen) |
| k3-kysymys | Kysymys | c:lontoo | 250 | kysymys.otsikko "Lontoo · kohtaaminen", tervehdysVaihe true (Leilan tervehdys, "Aloita peli"), yritys 1, 4 vaihtoehtoa, syoteEstetty true; sitten `aloita` |
| k4-vastattu | Kysymys | c:lontoo | 440 | oikein true, tulosVaihe 2 (tuomio 0,9 s → paljastus), loytoTyyppi pieniAarre, loyto "Löysit: Kourallinen hopeakolikoita · +190 £" |
| k5-kartalla | Kartta | c:lontoo | 440 | vaihe Toiminta, keskipäivä, tutkiTarjolla false |
| k6-reitilla | Kartta | e:lontoo\|pariisi:2 | 440 | viimeisin noppa 2, Heitä-nappi, ilta |
| k7-lehti-pariisi | Lehti | c:pariisi | 440 | noppa 2, yö |
| k8-loppu | Kartta | c:pariisi | 440 | tutkiTarjolla true |


## Isoisän luennat (Puhe.cs, Luennat.cs)

- **Intro** (`audio/intro-puhe.mp3?v=2`) uuden pelin alussa, kun tallennusta ei ole.
- **Lennon alku** (`audio/puhe-lento-alku.mp3?v=2`) ensimmäisellä lennolla istunnossa.
- **Saapumispuhe** (kokoelma `saapumispuheet`, 45 Euroopan kaupunkia) kamera-ajon alkaessa kohti kaupunkia.
- **Matkakirjaluento** (kokoelma `luennat`, kun Siirtoseppä on sen vienyt) lehden sulkeuduttua,
  kerran per kaupunki istunnossa; paikkarivi tilariville.
- Yksi puhuja kerrallaan, loppuhäivytys 1,5 s, taustalle mentäessä katkeaa. Äänitteet välimuistiin
  `persistentDataPath/aani/`. iOS-istunto Playback + MixWithOthers (`Plugins/iOS/MatkakirjaAani.mm`),
  joten äänettömyyskytkin ei mykistä luentaa (kuten Safari webissä).
- Kokeilu: `luento intro`, `odota 2`, `tila puhe` → `puhe.soi` true ja `puhe.aika` > 0.

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
  Erä 4: matkavalinnan, kysymyksen ja lehden ajan pallo on lukossa (SyoteLukko → PalloKierto.SyoteEstetty; heittonapin päältä alkava veto ei pyöritä palloa, UiPeittaa).
- Samassa kysymysnäkymässä (IKysymysNakyma) kulkevat myös pulmat (Pysy-tapa pulmakaupungissa;
  piirros `KysymysNaytto.Luonnos`/`PulmaId` ja vaihtoehtokuvat odottavat Natiivi-UI:n näkymää,
  UGUI-vara näyttää vain tekstit).
  Kaupat (`PeliOhjain.Kaupat`) on luotu, mutta sen teot kutsuvat lehti, pulu ja sähke (Natiivi-UI). Kuva- ja lippukysymykset tarvitsevat kuvapoolin ja maalistan (Kysely.AsetaKuvat,
  Kysely.Liput), joita ei vielä ladata: niiden paino siirtyy visalle kuten webissä.
- Auki jäänyt kysymys avataan latauksessa uudelleen jäljellä olevalla ajalla (web visa.js);
  jos kysymykset eivät lataudu, se suljetaan ja vuoro päättyy.
- Maailmankartta-moduulin (1,7 Mt) jäsennys ensimmäisellä käynnistyksellä pääsäikeessä
  (~0,2 s Macilla), sen jälkeen tiivistetty välimuisti.
- Simulaattorissa lehti on oikea WKWebView (verkko tarvitaan); editorissa lehti sulkeutuu
  seuraavassa ruudussa.
