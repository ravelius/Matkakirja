# 3D-nostot kategoriasymboleina, erä 1: Kaari ja Vuori reliefeinä (Natiivisepän apuagentti 26.9.2026 ilta)

Haara `natiiviseppa/kategoriat-reliefi`, worktree /Users/Shared/Claude/wt/proto-natiiviseppa-kategoriat. Pohja on
ylhaalta-175 f5900358. **Commit f27fca07.** Mitään ei ole mergetty eikä pushattu. Editoria, xcodebuildia,
simulaattoria ja laitetta ei ajettu, joten ruudulla ei ole todennettu mitään. Kuvat ovat Python-esikatseluja samasta
C#-geometriasta (stub-UnityEngine).

## Tila

| Mitä | Tulos |
|---|---|
| `Peli-testit/unity-tarkistus.sh` | 0 virhettä (Matkakirja.Kartta ios ja editori: 0 virhettä, 0 varoitusta) |
| Kartta-testit | KategoriaKartoitus 2/2 (uusi), Arkkityyppi 4/4 |
| Varjostin | Kääntymistä ei ole todennettu (tarvitsee Unityn), katso kohta "Katsottava" |

## Kolmiot (stub-ajuri, `verkot/`)

| Symboli | LOD0 | LOD1 | Budjetti LOD0/LOD1 | Kärkiä LOD0/LOD1 |
|---|---|---|---|---|
| Kaari (historia) | **224** | **100** | 250 / 120 | 34 / 18 |
| Vuori (luonto: vuori) | **147** | **77** | 250 / 120 | 22 / 12 |

Vertailuksi arkkityypit: Raunio 252/90 ja Vuori 157/36. Ääriviiva piirtää saman verkon toiseen kertaan, kuten
muissakin malleissa.

## Toteutus

- **Reliefi** (`Symbolimallit.Kategoriat.cs`, Rakentaja.Reliefi):
  - Siluetti pursotetaan 0,15 paksuiseksi, ja yläreunassa on 45°:n viiste 0,025. Mitat ovat mallin yksiköissä, leveys 1.
  - Malli makaa kasvot ylöspäin. Kylki on paperin ja seepian välissä, viiste ja yläkasvo paperia.
  - Kolmiointi tehdään korvien leikkauksella, joten kovera monikulmio käy.
  - Yläkasvo käyttää samaa kolmiointia sisennettynä. Jos jokin kolmio kääntyisi kapeassa kohdassa, viistettä puolitetaan.
  - UV1 on kärjen kulmasuunta (miter, enintään 2,2). Ääriviiva on siksi aito siirtymä siluetin ympäri, myös kaaren
    aukon sisäreunassa. Arkkityyppien osakohtaista UV1-kirjanpitoa ei käytetä reliefeissä.
  - Kolmioita tulee 5n − 2.
- **Apurit** (kaikki rajataan yläkasvon sisään):
  - Kohokerros: matala laatta, jossa kyljet ja kasvo.
  - Tasopinta ja Varjo: tasainen pinta, Varjo myös pudotusvarjona.
  - Viiva: seepiasauma, 2 kolmiota. Nosto on 0,012 kasvon yläpuolelle, jotta z-taistelua ei tule.
- **Siluetit:** `skriptit/jaljita.py` tekee ketjun alfa > 110 → sulkeminen 3 × 3 → reiät täyteen → suurin kappale →
  reunaseuranta → pehmennys → Douglas–Peucker kärkitavoitteeseen. Tulos on keskitetty, leveys 1 ja kuvan ylös = +Z.
  Tarkistuskuvat ovat `kuvat/jaljitys-*.png`.
  - Kaari: ulkoreuna. Aukko ulottuu pohjaan asti, joten U-muoto on yksinkertainen monikulmio.
  - **Vuori (tulkinta):** kuvamerkissä jalkojen väli on läpinäkyvä (chevron). Reliefiin tehtiin täysi vuori ylimmästä
    verhosta ja suorasta pohjasta. Tila on `ylaverho`.
- **Yksityiskohdat:**
  - Kaari:
    - 5 säteittäistä kaarikiven saumaa. Katkenneessa oikeassa yläosassa niitä ei ole.
    - Pilarien kivirivit ja jalustan sauma.
    - Pystysauma pilarin ja kivikasan välissä. Kivikasassa on 2 riviä ja limittäiset pystysaumat.
    - Kapiteelit ovat paperinvaaleita kohokerroksia, ja niiden alareunassa on seepiaviiva.
    - LOD1: 3 saumaa, pystysauma ja kapiteelit paksuina viivoina.
  - Vuori:
    - Itärinne (kuvamerkin varjopuoli) on seepiapintaa huipulta olkapäälle ja pääharjannetta pitkin.
    - Kaksi seepiavetoa olkapäillä.
    - Lumihuippu on paperinvaalea kohokerros, jonka pudotusvarjo on seepiaa kaakkoon. Ylhäältä huippu erottuu vain
      varjon ansiosta. LOD1:ssä lumihuippu on pintana.
  - Aksenttia ei ole (0 %). Historialla ja vuorella ei ole kuvamerkissä aksenttiväriä.
- **Paletti ja varjostin** (`Symbolimalli.shader`, uusi kohta 8):
  - Kärjen alfa 0 ottaa seepiarampin käyttöön. Ramppi on muste #3b2f22 → seepia #8a6a44 → paperi #efe4cc.
  - Valo on kuvamerkin oma kiinteä valo vasemmalta ylhäältä mallin avaruudessa, ei pelin aurinko. Varjopuoli on siksi
    sama kuin 2D-merkissä kartan kierrosta ja kellonajasta riippumatta.
  - Yläkasvo on täyttä paperia, ja varjon puolen kylki on seepiaa.
  - Arkkityypit ja erikoismallit (alfa 1) käyttävät vanhaa kaavaa muuttumattomana.
- **Kartoitus** (`KategoriaKartoitus.cs`, puhdas):
  - Enum kaikille 14 symbolille: Kaari, Tahti, Tiimalasi, Salama, Vuori, Tulivuori, Aallot, Tassu, Kellotorni, Malja,
    Vaaka, Ratas, Ankkuri ja Kiekko.
  - Valintajärjestys:
    1. `laji == tulivuori`.
    2. `NostoSaannot.Kuvamerkki(kategoria, laji)`:n tiedosto: historia → Kaari, vuori → Vuori, meri, joki, järvi ja
       saari → Aallot jne.
    3. Kuvamerkittömät rivit: ihme → Tahti, kaupunki → Kiekko.
    4. Muuten null.
- **Käyttö:**
  - Taso 1 (`Paivita`) ja tasot 2–3 (`Laske23`) valitsevat mallin `MalliIndeksi`:llä. Arkkityypit ovat indekseissä
    0–14 ja kategoriasymbolit niiden perässä.
  - Järjestys: erikoismalli voittaa aina, sitten rakennettu kategoriasymboli (nyt Kaari ja Vuori), muuten arkkityyppi.
  - **Muut kategoriat pysyvät tässä erässä arkkityyppeinä** (`SymboliRakennettu`).
  - Reliefit näkyvät kokeilussa myös pystysuorasta kamerasta (`YlhaaltaKelpaa`). Natiivi-UI piilottaa silloin 2D-merkin
    `OnMalli`:n kautta.
- **Komennot** (Komennot.cs: kaksi ohjeriviä ja kommentti, delegointi Symbolimallit.Komento-reittiä):
  - `symbolit kategoriat 1|0` (oletus 1) on A/B-vertailu arkkityyppeihin. Taso 1 vaihtaa verkon samaan kappaleeseen,
    ja tasot 2–3 laskevat uudelleen.
  - `symbolit kategoriat ruutu|pohjoinen` valitsee ylös-suunnan.
  - `symbolit tila` näyttää symbolit ja niiden kolmiot.

## Ylös-suunta (kysymys 1)

**Toteutettu, koska muutos oli triviaali** (`RuutuAsento`, noin 10 riviä). Reliefin +Z on kameran ylös-suunta
projisoituna tangenttitasoon. Suoraan ylhäältä katsottuna se on ruudun ylös, ja kallistetussa kamerassa suunta on
poispäin katsojasta. Kartan kierrossa merkki pysyy siksi pystyssä kuten 2D-merkki. Maavarjo (PohjaSiirto) kiertyy
mukana ja pysyy ruudun oikealla alhaalla, mikä vastaa kuvamerkin valoa. Kytkin on
`symbolit kategoriat pohjoinen`, joka palauttaa +Z:n pohjoiseen. Koskee vain kategoriasymboleita.

## Poikkeamat ja avoimet

1. **Liioiteltu perspektiivi ei ole tässä haarassa.** `LiioiteltuPerspektiivi` on vain haarassa
   `linssiseppa/perspektiivi`, ja ylhaalta-175:n perspektiivipatch on commitoimatta. En mergennyt enkä soveltanut
   patchia (kielletty).
   - Tässä haarassa reliefit saavat siksi saman 15°:n oman kallistuksen (`symbolit iso`) kuin muut mallit.
     `symbolit iso 0` näyttää puhtaan ylhäältä-näkymän.
   - Esikatselun 27,5° ja 55° jäljittelevät patchin käytöstä: pivot jalassa, jalan nosto ja levy maassa.
   - Patchin kanssa kallistus tulee `IsoKierto`n tilalle `PerusAsento`n eteen. Koodi ei vaadi muutosta, mutta patch voi
     törmätä rivitasolla (`IsoKierto(...) * PerusAsento(...)` sekä Paivitassa että Laske23:ssa).
2. **Jalustaa ei ole.** Esityksen §2 mainitsee jalustan, mutta §4:n reliefi ja maavarjo riittivät. Jalusta maksaisi
   noin 5n kolmiota lisää.
3. **Siluetin paksuus:** jäljitys ottaa mukaan kuvamerkin oman mustan reunan, ja päälle tulee 1,2 pt:n ääriviiva.
   Siksi pilarit näyttävät hieman paksummilta ja aukko kapeammalta kuin 2D-merkissä. Korjaus olisi sisentää jäljitettyä
   monikulmiota noin 1 px (0,01), jos omistaja haluaa.
4. **Kiinteä valo vai pelin aurinko** (kohta 8): valitsin kiinteän, jotta 3D-merkki vastaa 2D-merkkiä. Jos kaikki
   mallit halutaan samalle rampille (esitys §1: "yksi varjostin"), arkkityypit ja erikoismallit siirtyvät asettamalla
   Rakentajan kärkialfa 0:ksi. Silloin terrakotta ja sage muuttuvat seepiaksi. Päätös on omistajan tai Linssisepän.
5. **Seepiaviivojen nosto 0,012** (0,5 pt 40 pt:n mallissa): Cesiumin syvyyspuskurissa voi näkyä z-taistelua.
   Katso simulaattorista.

## Kuvat (`kuvat/`, rajattu ilman reunaa; kohde 530–578 px leveä)

- `kooste-kaari-vuori.png`: rivi per symboli järjestyksessä 2D-merkki | ylhäältä keskellä 0° | puolivälissä 27,5° |
  reunassa 55° | kamera 30° keskellä. Kuvat on skaalattu samaan korkeuteen.
- `pari-<Symboli>-<näkymä>.png`: 2D-merkki ja reliefi vierekkäin samaan korkeuteen, ilman marginaaleja. Näkymät ovat
  ylhäältä 0°, 27,5° ja 55°, kamera 30° keskellä ja reunassa (5,7°) sekä LOD1 0° ja 55°.
- Yksittäiskuvat on nimetty `<Symboli>-<näkymä>.png`.
- Rajoitukset kuten ylhaalta-175:ssä:
  - Kamera on ortografinen, joten maasto ja usva puuttuvat.
  - Mittakaava on 40 pt (ääriviiva 0,03 yksikköä).
  - Tausta on karttanäyte.
  - Ääriviivan sävy on jäljitelmä.
- Toisto:
  - `sh skriptit/kaanna.sh <worktree>/Assets/Matkakirja/Kartta ../verkot`
  - `SS=2 python3 skriptit/esikatselu.py verkot kuvat Kaari <merkki-historia.png>` (Vuorelle vastaavasti).
- Siluetit uudelleen: `python3 skriptit/jaljita.py <merkki.png> Kaari ulko 34 18 kuvat` ja
  `... Vuori ylaverho 22 12 kuvat`.

## Katsottava simulaattorissa (käännöksen jälkeen)

1. **Varjostin kääntyy** Metalille, ja lokissa ei ole virheitä. Uusia ovat TEXCOORD4 (`nOS`) ja kohdan 8 haara.
   Tarkista myös, että instansoitu materiaali (SymbolimalliInstansoitu.mat) piirtää reliefit.
2. **Ylhäältä (kallistus 0):**
   - Historian ja vuoren nostot näkyvät reliefeinä, ja niiden 2D-merkki on piilossa.
   - Siluetti on tunnistettava 22–40 pt:n koossa, ja LOD1 toimii pienillä tasoilla.
   - Kuvapari `symbolit kategoriat 1` ↔ `0`.
3. **Ääriviiva** kulkee koko siluetin ympäri, myös kaaren aukon sisäreunassa, ja on noin 1,2 pt leveä. Vuoren
   juurikärjissä kulmakerroin on rajattu, joten kärki voi olla hieman tylppä.
4. **Seepiaviivat ja lumihuippu:** z-taistelua tai välkyntää ei saa näkyä, erityisesti kaukana ja tasoilla 2–3.
5. **Kartan kierto:** merkki pysyy pystyssä ruudulla, ja maavarjo pysyy oikealla alhaalla. Vertaa
   `symbolit kategoriat pohjoinen`.
6. **Kallistettu kamera ja oma kallistus 15°:** kylki näkyy seepiana varjopuolella eikä harmaana, eikä kaiverrusreuna
   mustu liikaa.
7. **Muut mallit:** Akropolis, Delfoi, Meteora ja muut arkkityypit (esim. Linna) ovat ennallaan. Ne käyttävät alfa 1
   -polkua.
8. **Kehys ja lepo:** symbolit vaihtavat asentoa vain kameran liikkuessa. Levossa ei tule ylimääräisiä kehyksiä.

## Estetyt komennot

Ei yhtään. Mitään komentoa ei estetty.
