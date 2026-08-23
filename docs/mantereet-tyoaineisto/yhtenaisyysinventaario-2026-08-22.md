# Yhtenäisyysinventaario 22.8.2026

Vain lukeva mittaus omistajan tilaamaa yhtenäisyysurakkaa varten ("kaikki kaupunki- ja maalehdet valmiiksi yhteneväisesti"). Kaikki luvut on laskettu suoraan pelidatasta (js/packs/*.js) ajamalla Node-skriptejä moduulien päälle — ei käsin arvioitu. Mittaustavat on kuvattu kunkin osion alla.

## D. Kärkiluvut

| Mittari | Luku |
|---|---:|
| Lehtikaupunkeja yhteensä (KULTTUURI_KATEGORIAT) | 112 |
| Lehtimaita yhteensä (MAA_KATEGORIAT) | 52 |
| Opas puuttuu | 0 |
| Säätiedot puuttuu | 6 |
| Kohdekartta puuttuu | 12 |
| Ennen/Nyt-kuvapari puuttuu | 14 |
| Vanha äänite puuttuu (pilotti, vain 2 tehty) | 110 |
| Generoitu herokuva puuttuu kokonaan | 92 |
| Miniatyyrikuvat puuttuvat kokonaan (kartallisista kaupungeista) | 81 |
| Kohdekartan kohteita ilman omaa juttua | 0 / 738 |
| Maalehden maakartta puuttuu | 12 |
| Maan radio puuttuu | 2 |
| Maan lippu puuttuu myös laudoilta (ei löydy mistään) | 0 |
| Maa puuttuu maailmankartan COUNTRY_SHAPES-taulusta (löytyy vain oman laudan kartasta) | 1 |
| Lippusivu (LIPPUTIEDOT) puuttuu | 6 |
| Maalehti alle 5 aiheen monistusmitasta | 24 |
| Maalehden aihesivuilta puuttuu johdanto (intro) | 0 / 253 (kaikilla on) |
| Kaupunkeja ilman lehteä yhteensä laudoilla (rivien summa, päällekkäisyyksiä sisältää) | 173 |

## A. Lauta × lehtitilanne

Lehti = onko kaupungilla `kaupunki`-aiheen kansiosio `KULTTUURI_KATEGORIAT`-taulussa (sama määritelmä kuin js/tyohuone-tilastot.js `kaupungillaLehti`). Huom: `maailma`-lauta ja porttikaupungit (Kairo, Istanbul, Teheran, Bagdad) esiintyvät useammalla laudalla, joten lautakohtaisten rivien summa on suurempi kuin pelin eri kaupunkien määrä (112).

| Lauta | Kaupunkeja | Lehtiä | Puuttuu | Puuttuvat kaupunki-id:t (aakkosissa) |
|---|---:|---:|---:|---|
| Eurooppa (`europe`) | 45 | 43 | 2 | `bergen`, `sevilla` |
| Lähi-itä (`middleeast`) | 29 | 29 | 0 | — |
| Aasia (`asia`) | 41 | 41 | 0 | — |
| Afrikka (`africa`) | 41 | 2 | 39 | `addisabeba`, `ahaggar`, `alkufra`, `angola`, `bahrelghazal`, `dakar`, `darfur`, `fes`, `gao`, `kamerun`, `kano`, `kapkaupunki`, `kappalmas`, `karthago`, `kilimandzaro`, `kimberley`, `kongo`, `kumasi`, `lagos`, `lalibela`, `madagaskar`, `marrakech`, `mosambik`, `murzuk`, `nairobi`, `namib`, `orjarannikko`, `rashafun`, `sahara`, `sansibar`, `sierraleone`, `sthelena`, `suakin`, `tanganjika`, `tanger`, `timbuktu`, `tshadjarvi`, `viktoria`, `viktorianputoukset` |
| Pohjois-Amerikka (`northamerica`) | 38 | 0 | 38 | `anchorage`, `appalakit`, `bermuda`, `chicago`, `churchill`, `denver`, `grandcanyon`, `guatemala`, `halifax`, `havanna`, `hawaii`, `houston`, `iqaluit`, `labrador`, `losangeles`, `managua`, `merida`, `mexico`, `miami`, `monterrey`, `montreal`, `mountrushmore`, `neworleans`, `newyork`, `nome`, `nuuk`, `panama`, `sanfrancisco`, `sanjuan`, `santafe`, `sitka`, `stjohns`, `toronto`, `vancouver`, `whitehorse`, `winnipeg`, `yellowknife`, `yellowstone` |
| Etelä-Amerikka (`southamerica`) | 38 | 0 | 38 | `antofagasta`, `asuncion`, `bananal`, `boavista`, `bogota`, `buenosaires`, `campogrande`, `caphorn`, `caracas`, `cayenne`, `falkland`, `galapagos`, `iguazu`, `iquitos`, `joaopessoa`, `lima`, `macapa`, `machupicchu`, `manaus`, `montevideo`, `ouropreto`, `panama`, `portoalegre`, `portovelho`, `puertomontt`, `puntaarenas`, `quito`, `rio`, `robinsoncrusoe`, `salta`, `salvador`, `sanambrosio`, `santacruz`, `santarem`, `saoluis`, `saopaulo`, `titicaca`, `valparaiso` |
| Oseania (`oceania`) | 33 | 0 | 33 | `adelaide`, `alicesprings`, `auckland`, `bali`, `birdsville`, `brisbane`, `broome`, `cairns`, `christchurch`, `cooberpedy`, `darwin`, `dili`, `dunedin`, `exmouth`, `geraldton`, `hobart`, `honiara`, `kalgoorlie`, `melbourne`, `milfordsound`, `mountisa`, `norfolk`, `noumea`, `nullarbor`, `perth`, `portmoresby`, `portvila`, `sepik`, `suva`, `sydney`, `townsville`, `uluru`, `wellington` |
| Suomi (`suomi`) | 19 | 2 | 17 | `inari`, `joensuu`, `jyvaskyla`, `kajaani`, `kemi`, `kilpisjarvi`, `kittila`, `kuopio`, `lappeenranta`, `maarianhamina`, `oulu`, `pori`, `rovaniemi`, `savonlinna`, `turku`, `utsjoki`, `vaasa` |
| Maailma (yhdistelmä) (`maailma`) | 14 | 8 | 6 | `kapkaupunki`, `losangeles`, `newyork`, `rio`, `sydney`, `tanger` |
| **Yhteensä** | **298** | **125** | **173** | *(huom: sama kaupunki voi esiintyä useammalla laudalla — esim. porttikaupungit ja maailma-lauta — joten rivien summa ei ole eri kaupunkien määrä)* |

## B. Kaupungit joilta puuttuu jotain

### B1. Ydinkentät (opas, sää, kohdekartta, ennen/nyt-pari)

24/112 lehtikaupungilta puuttuu vähintään yksi ydinkenttä:

| Kaupunki | Opas | Sää | Kohdekartta | Ennen/Nyt-pari | Jutut (kohteista) |
|---|:-:|:-:|:-:|:-:|---|
| `alpit` | ✓ | ✓ | – | ✓ | – |
| `astana` | ✓ | ✓ | ✓ | – | 8/8 |
| `borneo` | ✓ | ✓ | – | – | – |
| `chennai` | ✓ | – | ✓ | – | 10/10 |
| `colombo` | ✓ | – | ✓ | – | 9/9 |
| `doha` | ✓ | ✓ | ✓ | – | 6/6 |
| `dubai` | ✓ | ✓ | ✓ | – | 10/10 |
| `islanti` | ✓ | ✓ | – | ✓ | – |
| `kabul` | ✓ | – | ✓ | – | 8/8 |
| `kamtsatka` | ✓ | ✓ | – | ✓ | – |
| `kapadokia` | ✓ | ✓ | – | ✓ | – |
| `karachi` | ✓ | – | ✓ | – | 10/10 |
| `kashgar` | ✓ | ✓ | ✓ | – | 7/7 |
| `kolkata` | ✓ | – | ✓ | – | 10/10 |
| `kreeta` | ✓ | ✓ | – | ✓ | – |
| `lappi` | ✓ | ✓ | – | ✓ | – |
| `lhasa` | ✓ | ✓ | ✓ | – | 7/7 |
| `mumbai` | ✓ | – | ✓ | – | 10/10 |
| `rubalkhali` | ✓ | ✓ | – | ✓ | – |
| `sahalin` | ✓ | ✓ | – | ✓ | – |
| `salalah` | ✓ | ✓ | ✓ | – | 7/7 |
| `siinai` | ✓ | ✓ | – | ✓ | – |
| `sisilia` | ✓ | ✓ | – | ✓ | – |
| `sumatra` | ✓ | ✓ | – | – | – |

### B2. Pilottivaiheen kentät (miniatyyrit, herokuvat, vanha äänite)

Näitä kolmea ei ole vielä laajennettu kaikkiin kaupunkeihin edes suunnitelman mukaan — listataan kattavuus, ei "puutetta":

Miniatyyrikuvat (kartan kohdepiirrokset) — 19/112 kaupunkia: `amsterdam` (6), `bagdad` (8), `berliini` (6), `firenze` (9), `helsinki` (9), `kairo` (10), `kobenhavn` (9), `lontoo` (6), `pariisi` (11), `praha` (6), `rooma` (6), `shanghai` (9), `soul` (9), `tampere` (8), `teheran` (8), `tokio` (10), `tripoli` (7), `tukholma` (6), `wien` (7).

Generoidut herokuvat (avauskuvien `ampari`-kentät) — 20/112 kaupunkia: `bangkok` (3), `delhi` (3), `dubai` (3), `helsinki` (3), `hongkong` (3), `istanbul` (3), `jerusalem` (3), `kairo` (3), `lontoo` (3), `mekka` (3), `moskova` (3), `pariisi` (3), `peking` (3), `petra` (3), `rooma` (3), `shanghai` (3), `singapore` (3), `tokio` (3), `wien` (3), `xian` (3).

Vanha äänite (VANHAT_AANET) — 2/112 kaupunkia: `kairo`, `lontoo`.

## C. Maat joilta puuttuu jotain

36/52 lehtimaalta puuttuu vähintään yksi kentistä (maakartta, radio tai lippusivu) tai aiheita on alle monistusmitan (5):

| Maa | Aiheita | Nostoja | Minitehtäviä | Maakartta | Radio | Lippu (jollain laudalla) | Maailmankartalla | Lippusivu |
|---|---:|---:|---:|:-:|:-:|:-:|:-:|:-:|
| Bulgaria (`BGR`) | 2 | 2 | 1 | ✓ | ✓ | ✓ | ✓ | ✓ |
| Bahrain (`BHR`) | 4 | 16 | 4 | – | – | ✓ | – | – |
| Bosnia ja Hertsegovina (`BIH`) | 2 | 2 | 1 | ✓ | ✓ | ✓ | ✓ | ✓ |
| Sveitsi (`CHE`) | 4 | 9 | 3 | ✓ | ✓ | ✓ | ✓ | ✓ |
| Kiina (`CHN`) | 5 | 20 | 5 | – | ✓ | ✓ | ✓ | ✓ |
| Kypros (`CYP`) | 5 | 20 | 5 | ✓ | ✓ | ✓ | ✓ | – |
| Tanska (`DNK`) | 4 | 9 | 3 | ✓ | ✓ | ✓ | ✓ | ✓ |
| Viro (`EST`) | 2 | 2 | 1 | ✓ | ✓ | ✓ | ✓ | ✓ |
| Suomi (`FIN`) | 3 | 6 | 2 | ✓ | ✓ | ✓ | ✓ | ✓ |
| Kroatia (`HRV`) | 3 | 6 | 2 | ✓ | ✓ | ✓ | ✓ | ✓ |
| Indonesia (`IDN`) | 5 | 20 | 5 | – | ✓ | ✓ | ✓ | ✓ |
| Intia (`IND`) | 5 | 20 | 5 | – | ✓ | ✓ | ✓ | ✓ |
| Irlanti (`IRL`) | 6 | 18 | 5 | ✓ | ✓ | ✓ | ✓ | – |
| Irak (`IRQ`) | 4 | 15 | 4 | ✓ | ✓ | ✓ | ✓ | ✓ |
| Islanti (`ISL`) | 4 | 9 | 3 | ✓ | ✓ | ✓ | ✓ | ✓ |
| Jordania (`JOR`) | 4 | 16 | 4 | – | ✓ | ✓ | ✓ | – |
| Japani (`JPN`) | 5 | 20 | 5 | – | ✓ | ✓ | ✓ | ✓ |
| Etelä-Korea (`KOR`) | 6 | 24 | 6 | – | ✓ | ✓ | ✓ | ✓ |
| Kuwait (`KWT`) | 4 | 16 | 4 | ✓ | ✓ | ✓ | ✓ | ✓ |
| Liettua (`LTU`) | 3 | 6 | 2 | ✓ | ✓ | ✓ | ✓ | ✓ |
| Latvia (`LVA`) | 3 | 6 | 2 | ✓ | ✓ | ✓ | ✓ | ✓ |
| Malesia (`MYS`) | 5 | 20 | 5 | – | – | ✓ | ✓ | ✓ |
| Norja (`NOR`) | 4 | 9 | 3 | ✓ | ✓ | ✓ | ✓ | ✓ |
| Oman (`OMN`) | 4 | 16 | 4 | ✓ | ✓ | ✓ | ✓ | ✓ |
| Pakistan (`PAK`) | 5 | 20 | 5 | – | ✓ | ✓ | ✓ | ✓ |
| Filippiinit (`PHL`) | 5 | 20 | 5 | – | ✓ | ✓ | ✓ | ✓ |
| Puola (`POL`) | 3 | 4 | 2 | ✓ | ✓ | ✓ | ✓ | ✓ |
| Qatar (`QAT`) | 4 | 16 | 4 | ✓ | ✓ | ✓ | ✓ | ✓ |
| Romania (`ROU`) | 2 | 2 | 1 | ✓ | ✓ | ✓ | ✓ | ✓ |
| Venäjä (`RUS`) | 3 | 4 | 2 | ✓ | ✓ | ✓ | ✓ | ✓ |
| Saudi-Arabia (`SAU`) | 4 | 16 | 4 | ✓ | ✓ | ✓ | ✓ | ✓ |
| Syyria (`SYR`) | 3 | 11 | 3 | ✓ | ✓ | ✓ | ✓ | – |
| Thaimaa (`THA`) | 5 | 20 | 5 | – | ✓ | ✓ | ✓ | ✓ |
| Ukraina (`UKR`) | 3 | 4 | 2 | ✓ | ✓ | ✓ | ✓ | ✓ |
| Vietnam (`VNM`) | 5 | 20 | 5 | – | ✓ | ✓ | ✓ | ✓ |
| Jemen (`YEM`) | 4 | 14 | 4 | ✓ | ✓ | ✓ | ✓ | – |

**Erikoishuomio — BHR (Bahrain):** maalehti on olemassa (4 aihetta, 16 nostoa, 4 minitehtävää) ja Lähi-idän laudan omalla kartalla (`js/packs/middleeast-countries.js`) Bahrainilla on sekä muoto että lippu (`Flag of Bahrain.svg`) — mutta se puuttuu kokonaan käsin ylläpidetystä yhdistelmätaulusta `MAAILMANKARTTA.map.countryShapes` (js/packs/maailmankartta.js). Sen vuoksi maailmankartalla ei näy Bahrainin lippua eikä muotoa, vaikka Lähi-idän laudalla se toimii. Lisäksi `RADIOT.BHR` ja `MAAKARTAT.BHR` puuttuvat molemmat kokonaan omista tauluistaan — nämä ovat aitoja puutteita eivätkä liity yhdistelmäkarttabugiin. Kolme eri asiaa yhdessä maassa: syytä käydä läpi ja korjata erikseen ennen yhtenäisyystyön aloitusta.

**Lisäys 23.8.2026 (Fable, v1047:n jälkeen) — P-Amerikan pilotin jättämät aukot:**

- **northamerica-laudalta puuttuu `map.countryShapes` kokonaan** (lauta itse
  toteaa tämän kommentissaan "tulee myöhemmin sisältöagentin erässä").
  Seuraus: USA:n maalehti aukeaa toistaiseksi VAIN maailmankartalla
  (avaaMaalehti vaatii muodon), eikä P-Amerikan laudalla näy maiden
  korostuksia, lippuja eikä Maiden lehdet -nappia. Tehdään omana eränä
  tools/middleeast-countries.mjs-mallilla (projektio sovitetaan laudan
  kaupungeista, Natural Earth 50m -lähde). Sama puute koskee myös
  southamerica-, oceania- ja asia-lautoja.
- **newyork + sanfrancisco: kohdekartat puuttuvat** (`KAUPUNKIKARTAT`) —
  kohdekarttapuutteiden lista kasvoi siis 12 → 14 kaupunkiin.
- **newyork + sanfrancisco: herokuvat puuttuvat** — generointi kierroksella 9
  (tools/hero-tyolista-4.mjs) käynnissä 23.8.2026.
- **sanfrancisco: avauskuvat puuttuvat kokonaan** (0 aitoa valokuvaa;
  New Yorkilla 3) — kuvatoimitus käynnissä 23.8.2026.
- USA:n 4 lisäminitehtävää (maalehden aiheilta puuttuvat tehtävät) kirjattu
  aiemmin — yhä tekemättä.

## Lähteet ja mittaustavat

- **Kaupungit**: `Object.keys(KULTTUURI_KATEGORIAT)` (112 kpl), avain = kaupunki-id.
  - Opas: kaupunki-aiheen `matkailijalle.artikkeli.taitto === 'opas'` (ja aina yhdessä `matkailu`-lohkon kanssa — 112/112 samat kaupungit).
  - Sää: `SAATIEDOT[id]`.
  - Kohdekartta: `KAUPUNKIKARTAT[id]` (js/packs/maakartat.js).
  - Jutut: `KAUPUNKIKARTAT[id].kohteet[].nimi` löytyy `NAHTAVYYSJUTUT[id]`-taulusta.
  - Miniatyyrit: tiedostot `assets/kartat/miniatyyrit/<kaupunki>-*.webp|jpg` — ristiintarkistettu `MINIATYYRIT`-taulun kanssa, täsmää täydellisesti (19 kaupunkia).
  - Ennen/Nyt: kaupunki-aiheen `ennenNyt`-taulukko, pituus 2.
  - Vanha äänite: `VANHAT_AANET[id]` (kaupunki-avain; maafallback `VANHAT_AANET_MAA` on tyhjä).
  - Herokuvat: kaupunki-aiheen `avauskuvat[].ampari`-kentät (generoidut kuvat, eivät Commons-tiedostoja).
- **Maat**: `Object.keys(MAA_KATEGORIAT)` (52 kpl), avain = ISO-3.
  - Aiheet/nostot/minitehtävät: `MAA_KATEGORIAT[iso]` (`.length`, `.nostot.length`, `.tehtava`-kenttä).
  - Intro: jokaisen aiheen oma `johdanto`-kenttä (maalehti.js piirtää sen suoraan, ei erillisestä artikkelit-tiedostosta niin kuin kaupunkien "Artikkeli"-sarake) — kaikilla 253 aiheella on johdanto, ei puutteita.
  - Maakartta: `MAAKARTAT[iso]`.
  - Radio: `RADIOT[iso]`.
  - Lippu: ensisijaisesti `MAAILMANKARTTA.map.countryShapes[iso].lippu`, varalla oman laudan (europe/middleeast/asia/africa/northamerica/southamerica/oceania) `map.countryShapes[iso].lippu` — Commons-tiedostonimi.
  - Lippusivu: sama tiedostonimi löytyy `LIPPUTIEDOT`-taulusta (js/packs/lipputiedot.js) — tämä on oma, erillinen "lippu-ikkuna"-ominaisuus joka on vielä pilottivaiheessa.
- **Laudat**: `EUROPE/MIDDLE_EAST/ASIA/AFRICA/NORTHAMERICA/SOUTHAMERICA/OCEANIA/SUOMI/MAAILMA` (js/packs/*.js) `.cities[].id`, verrattu `KULTTUURI_KATEGORIAT`-avaimiin.

## Rajaus

Puhtaasti lukeva mittaus; yhtään pelitiedostoa ei muutettu. Skriptit ajettiin kertaluonteisesti tämän tehtävän aikana eikä niitä committoitu repoon.
