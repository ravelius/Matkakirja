# Euroopan herokuvien inventaario ja generointisuunnitelma

Koottu 26.8.2026. Lähteet: `js/packs/europe.js` + `js/packs/maailmankartta.js`
(laudan kaupungit), `js/tyohuone-kehitys-data.js` (KAARI_PAKETIT),
`js/packs/fokusvirrat.js` (pelattavat kaupungit),
`js/packs/kulttuuri-kategoriat.js` (`ampari`-kentät ja kuvatekstit),
`tools/hero-tyolista-*.mjs`, `js/viitekuva-herot.js`,
`docs/mantereet-tyoaineisto/herokuvien-silmatarkistus-1|2.md`,
`docs/mantereet-tyoaineisto/katselmointi-herot-22-25.md`,
`js/tyohuone-tilanne.js` (versiohistoria = kierrosten kirjanpito) sekä
peiliämpärin HEAD-luotaus curlilla (49 kaupunkia × 3 nimeä + erikoisnimet).

---

## 0. Luvut yhdellä silmäyksellä

| | kaupunkeja | kuvia |
|---|---|---|
| Euroopan laudan kaupunkeja tarkastelussa | **49** | – |
| Kaupunkeja joilla on herokuvia ämpärissä | 31 | 94 |
| — niistä **ankkuroitu** (viitekuvat, hyväksytty) | 2 | **5** |
| — niistä **FALSKI** (generoitu ilman viitteitä, kierrokset 1–20) | 29 | **89** |
| Kaupunkeja joilta herokuva puuttuu kokonaan | **18** | 0 |
| Juuri tehty uudella prosessilla (ei vielä ämpärissä) | 2 (Sofia 5, Rooma 4) | 9 |
| **TYÖLISTALLE JÄÄ: puuttuvat** | **17** | **51** (3/kaupunki) |
| **TYÖLISTALLE JÄÄ: falskit** | **29** | **86** |

Yhteensä työlistalla **46 kaupunkia / 137 kuvaa**.

---

## 1. Ämpäripolku ja nimeämiskäytäntö

Herokuva on kaupunkilehden avauskarusellin kuva, joka kulkee lehtidatassa
kentässä `ampari` (Commons-putken ohi):

```
js/packs/kulttuuri-kategoriat.js
  avauskuvat: [{ ampari: 'herokoe/hero-rooma-aamu.png', selite: …, lahde: … }]
        │
        ▼
js/media.js  julisteUrl(t) = PEILI_JUURI + 'julisteet/' + t
        │
        ▼
https://pub-7bc0ed2083a74a68bd7115618bca4709.r2.dev/julisteet/herokoe/hero-<kaupunki>-<aika>.png
```

- **Täysi ämpäripolku:** `julisteet/herokoe/hero-<kaupunki-id>-<aika>.png`
  (todennettu curlilla: `julisteet/herokoe/hero-rooma-aamu.png` → 200,
  `herokoe/hero-rooma-aamu.png` juuresta → 404).
- **Vuorokaudenajat:** `aamu`, `keskipaiva`, `ilta` — kolme per kaupunki.
- **Poikkeukset:** neljäs/viides kuva nimetään kohteen mukaan
  (`hero-tampere-nasinneula.png`). Helsinki on pelin ensimmäinen koe-erä ja
  kantaa vanhaa nimeä `hero7-tuomiokirkko.png`, `hero7-uspenski.png`,
  `hero7-oodi.png`.
- **Kuvien mitat:** 1536 × 1024 px, 3:2, PNG, 2,6–3,8 MB (mitattu
  kierrosten 22–25 katselmoinnissa).
- **Listaus ei onnistu:** r2.dev ei tarjoile hakemistolistausta (`/` → 404,
  `?list-type=2` → 404). Ainoa reitti on HEAD-luotaus tiedosto kerrallaan.
  **Noden fetch ei toimi r2.dev:iin — käytä curlia.**

> **TÄRKEÄ SÄÄNTÖ UUSINTOIHIN:** falskin kuvan korvaaja pitää tallentaa
> **samalla tiedostonimellä**. Silloin `kulttuuri-kategoriat.js`:ään ei
> tarvitse koskea eikä kuvatekstiä (`selite`) tarvitse kirjoittaa uusiksi —
> kuvateksti kertoo kohteesta, ja kohde pysyy samana. Puuttuville
> kaupungeille sen sijaan tarvitaan uusi `avauskuvat`-lohko lehteen
> (Fablen/Opuksen työ, ei omistajan).

---

## 2. Mistä tiedetään, mikä on falski

Viiteankkurointi (`tools/hae-viitekuvat.mjs` + generointiportti
`tools/hero-ajuri.mjs`) otettiin käyttöön vasta **23.8.2026**, ensimmäisenä
koe-eränä Tampere (`v1079`, `v1080`). Kaikki sitä ennen tehdyt kierrokset
generoitiin **ilman viitekuvia**, ja se näkyy suoraan työlistoista:

| työlista | viitekenttiä (`wiki`/`kategoria`/`viitehaku`) | tulkinta |
|---|---|---|
| `hero-tyolista-3 … -14`, `-20` | **0** | **viitteetön → FALSKI** |
| `hero-tyolista-tampere`, `-oodi`, `-korjaus1..3` | 2–8 | ankkuroitu |
| `hero-tyolista-brisbane/chicago/kabul/melbourne/perth/vancouver` | 6–11 | ankkuroitu |
| `hero-tyolista-22 … -25` | 16–32 | ankkuroitu |

Kierrokset 1–6 (Helsinki, Peking, Kairo, Tokio, Xian, Lontoo, Dubai,
Shanghai, Pariisi, Istanbul, Delhi, Rooma, Jerusalem, Singapore, Moskova,
Mekka, Hongkong, Wien, Petra, Bangkok) tehtiin ennen kuin työlistoja edes
tallennettiin `tools/`-kansioon — ne ovat samalla tavalla viitteettömiä.
Todiste versiohistoriasta: `v1079` "VIITEKUVAT HEROGENEROINTIIN … ensimmainen
koe-era on Tampere".

**Raamattu (rivi ~939, hybridimalli 25.8.2026):** *"Viitteettömiä
yleisnäkymiä ei generoida (kierrosten 22–25 oppi: ne keksivät maamerkkejä)."*

**"Hyväksytty" ei kumoa falskiutta.** Versiohistoriassa lukee useasta
kierroksesta "18/18 hyvaksyttiin" (kierrokset 13, 14, 16, 17, 18, 19) — mutta
tuo hyväksyntä oli Opuksen/Fablen silmäkatselmointi ilman aitoja
vertailukuvia. Kun samat kuvat myöhemmin verrattiin oikeisiin
Commons-valokuviin (silmätarkistukset 1 ja 2), löytyi neljä suoraa
väärää rakennusta ja seitsemän epäilyttävää. Ainoa aidosti hyväksytty
erä on **Tampere** (4 kuvaa, viitekuvilla, `v1080`) ja **Helsingin Oodi**
(1 kuva, uusittu viitekuvilla samassa versiossa). Nämä on kirjattu
koneellisesti `js/viitekuva-herot.js`:n VIITEKUVA_HEROT-tauluun —
Euroopasta siinä on vain `tampere: 4` ja `helsinki: 1`.

**Tunnetut riskisignaalit Euroopassa** (riskiarvio; huom. nämä kuvat
generoitiin ilman viitteitä, joten kyse ei ole "väärästä viitteestä" vaan
siitä, että kohteen tunnistus menee helposti pieleen — juuri se, mitä
uusinnassa pitää varoa):
- `hero-riika-ilta.png` — riskiarvion kohdehaku osui kategoriaan
  `Category:Lieto church` Riian Pyhän Pietarin kirkon sijaan.
- `hero-wien-ilta.png` — kohdehaku osui kategoriaan
  `Category:Hamburgische Staatsoper` Wienin Valtionoopperan sijaan.
- Riskiarvion kärkilistalla lisäksi mm. `hero7-oodi.png` (jo korjattu),
  `hero-barcelona-aamu`, `-keskipaiva`, `hero-kobenhavn-ilta`,
  `hero-krakova-ilta`, `hero-tampere-*` (jo korjattu), `hero-rooma-ilta`,
  `hero-praha-aamu`, `hero-dublin-ilta`, `hero-moskova-aamu/-keskipaiva/-ilta`,
  `hero-istanbul-aamu`, `hero-pietari-keskipaiva`, `hero-venetsia-ilta`,
  `hero-lontoo-ilta`.
- Riskiarvion mittaus jäi kesken (429-rajoitus): 120/258 kuvaa ei mitattu
  lainkaan. Siksi riskiarvio ei kelpaa poissulkuun — vain priorisointiin.

---

## 3. Taulukko: Euroopan laudan kaupungit

Prioriteetit: **P1** = pelattava fokusmaan kaupunki (oma fokusvirta);
**P2** = fokusmaan (GRC/BGR/ITA/TUR/BIH/ROU) muu laudan kaupunki;
**P3** = kaaripaketillinen kaupunki; **P4** = muu laudan kaupunki.

| Kaupunki (id) | Maa | Prio | Kaaripaketti | Tila | Kuvia ämpärissä | Tarvittavat kuvat (aiheet) |
|---|---|---|---|---|---|---|
| **ateena** | GRC | P1 | kyllä | **FALSKI** (kierros 3, `hero-tyolista-3`) | 3 | Parthenon · Zeuksen temppeli (Olympieion) · Panathinaikon stadion |
| **sofia** | BGR | P1 | kyllä | **TEHTY 26.8. (5 kuvaa, ei vielä ämpärissä)** | 0 | – |
| **rooma** | ITA | P1 | kyllä | **TEHTY 26.8. (4 kuvaa)**; vanhat 3 falskia | 3 (vanhaa) | – |
| **istanbul** | TUR | P1 | kyllä | **FALSKI** (kierros 2) | 3 | Hagia Sofia · Galatan torni · Sulttaani Ahmedin moskeija |
| **sarajevo** | BIH | P1 | kyllä | **PUUTTUU** | 0 | Gazi Husrev-begin moskeija + Sahat Kula · Jeesuksen pyhän sydämen katedraali · Latinalainen silta |
| **bukarest** | ROU | P1 | kyllä | **PUUTTUU** | 0 | Arcul de Triumf · Stavropoleos-luostari · CEC-palatsi |
| **kreeta** | GRC | P2 | kyllä | **PUUTTUU** | 0 | Rethymnon Fortezza · Arkadin luostari · Koulesin linnoitus (Iraklion) |
| **sisilia** | ITA | P2 | kyllä | **PUUTTUU** | 0 | Concordian temppeli (Agrigento) · Syrakusan tuomiokirkko · Monrealen tuomiokirkko |
| **izmir** | TUR | P2 | kyllä | **PUUTTUU** | 0 | İzmirin kellotorni (Konak) · Asansör · Kızlarağası Han |
| **kapadokia** | TUR | P2 | kyllä | **PUUTTUU** | 0 | Göremen kallioluostarit · Ortahisarin kalliolinnake · Selimen luostari (Ihlara) |
| **ankara** | TUR | P2 | kyllä | **FALSKI** (kierros 17, `hero-tyolista-12`) | 3 | Anıtkabir · Hacı Bayramin moskeija · Atakule *(Atakule EPÄILYTTÄVÄ, silmätarkistus 2)* |
| **dubrovnik** | HRV | P3 | kyllä | **PUUTTUU** | 0 | Lovrijenacin linnake · Rehtorinpalatsi · Pyhän Blasiuksen kirkko + Orlandon pylväs |
| **kiova** | UKR | P3 | kyllä | **PUUTTUU** | 0 | Pyhän Sofian katedraali + kellotorni · Kiovan luolaluostari (suuri kellotorni) · Isänmaa-äiti -monumentti |
| **odessa** | UKR | P3 | kyllä | **PUUTTUU** | 0 | Oopperatalo · Vorontsovin palatsi ja kolonnadi · Kaupungintalo (Dumska) |
| **vilna** | LTU | P3 | kyllä | **PUUTTUU** | 0 | Vilnan tuomiokirkko + kellotapuli · Aamunkoiton portti · Pyhien Pietarin ja Paavalin kirkko |
| **marseille** | FRA | P3 | kyllä | **PUUTTUU** | 0 | MuCEM + Fort Saint-Jean · La Majorin katedraali · Palais Longchamp |
| **granada** | ESP | P3 | kyllä | **PUUTTUU** | 0 | San Jerónimon luostari · La Cartuja · Corral del Carbón |
| **alpit** | CHE | P3 | kyllä | **PUUTTUU** | 0 | Sphinx-observatorio (Jungfraujoch) · Landwasserin viadukti · Eigerin pohjoisseinä |
| **islanti** | ISL | P3 | kyllä | **PUUTTUU** | 0 | Hallgrímskirkja · Þingvellir / Almannagjá · Strokkur-geysir |
| **tromssa** | NOR | P3 | kyllä | **PUUTTUU** | 0 | Jäämeren katedraali · Polaria · Polarmuseet |
| **lappi** (Rovaniemi) | FIN | P3 | kyllä | **PUUTTUU** | 0 | Arktikum · Jätkänkynttilä-silta · Sajos (Inari) |
| **nikosia** | CYP | P4 | kyllä | **PUUTTUU** | 0 | Faneromenin kirkko · Dragomaanin talo (Hadjigeorgakis Kornesios) · Büyük Han |
| lontoo | GBR | P3 | kyllä | **FALSKI** (kierros 3) | 3 | Tower Bridge · Westminsterin palatsi · St Paulin katedraali |
| pariisi | FRA | P3 | kyllä | **FALSKI** (kierros 2) | 3 | Eiffel-torni · Notre-Dame · Sacré-Cœur |
| praha | CZE | P3 | kyllä | **FALSKI** (`hero-tyolista-3`) | 3 | Pyhän Vituksen katedraali · Kaarlensilta · Tynin kirkko |
| wien | AUT | P3 | kyllä | **FALSKI** (kierros 6) | 3 | Stephansdom · Schönbrunn · Valtionooppera |
| venetsia | ITA | P3 | kyllä | **FALSKI** (kierros 12, `-7`) | 3 | Markuksenkirkko + kampanile · Rialton silta · Santa Maria della Salute |
| budapest | HUN | P3 | kyllä | **FALSKI** (kierros 13, `-8`) | 3 | Parlamenttitalo · Kalastajanlinnake · Ketjusilta |
| berliini | DEU | P3 | kyllä | **FALSKI** (kierros 11, `-6`) | 3 | Brandenburgin portti · Valtiopäivätalo · Berliinin tuomiokirkko |
| madrid | ESP | P3 | kyllä | **FALSKI** (kierros 11, `-6`) | 3 | Kuninkaanlinna · Plaza Mayor · Cibeles-suihkulähde ja -palatsi |
| barcelona | ESP | P3 | kyllä | **FALSKI** (kierros 16, `-11`) | 3 | Sagrada Família · Casa Batlló · Palau Nacional |
| amsterdam | NLD | P3 | kyllä | **FALSKI** (kierros 12, `-7`) | 3 | Westerkerk · Rijksmuseum · Magere Brug |
| lissabon | PRT | P3 | kyllä | **FALSKI** (kierros 15, `-10`) | 3 | Belémin torni · Jerónimosin luostari · Praça do Comércio |
| dublin | IRL | P3 | kyllä | **FALSKI** (kierros 16, `-11`) | 3 | Trinity Collegen kellotorni · Pyhän Patrickin katedraali · Tullitalo |
| edinburgh | GBR | P3 | kyllä | **FALSKI** (kierros 14, `-9`) | 3 | Edinburghin linna · St Gilesin katedraali · Calton Hillin kansallismonumentti |
| krakova | POL | P3 | kyllä | **FALSKI** (kierros 15, `-10`) | 3 | Wawelin katedraali · Mariacki-kirkko · Sukiennice |
| varsova | POL | P3 | kyllä | **FALSKI** (kierros 18, `-13`) | 3 | Kuninkaanlinna · Wilanówin palatsi · Saaripalatsi |
| pietari | RUS | P3 | kyllä | **FALSKI** (kierros 11, `-6`) | 3 | Talvipalatsi + Aleksanterin pylväs · Verikirkko · Pietari-Paavalin katedraali |
| moskova | RUS | P3 | kyllä | **FALSKI** (kierros 5) | 3 | Vasilin katedraali · Kremlin muurit · Moskovan yliopiston päärakennus |
| tukholma | SWE | P3 | kyllä | **FALSKI** (kierros 13, `-8`) | 3 | Kuninkaanlinna · Kaupungintalo · Riddarholmenin kirkko |
| oslo | NOR | P3 | kyllä | **FALSKI** (kierros 17, `-12`) | 3 | Akershusin linnoitus · Holmenkollen · Kuninkaanlinna |
| kobenhavn | DNK | P3 | kyllä | **FALSKI** (kierros 17, `-12`) | 3 | Marmorikirkko · Christiansborg · Vapahtajan kirkko |
| tallinna | EST | P3 | kyllä | **FALSKI** (kierros 19, `-14`) | 3 | Oleviste · Kadriorgin palatsi · Teletorni |
| riika | LVA | P3 | kyllä | **FALSKI** (kierros 18, `-13`) | 3 | Mustapäiden talo · Vapaudenpatsas · Pyhän Pietarin kirkko |
| helsinki | FIN | P3 | kyllä | **OSIN FALSKI** (2/3; Oodi ankkuroitu) | 3 | Tuomiokirkko · Uspenskin katedraali *(Oodi valmis)* |
| **tampere** | FIN | P4 | ei | **HYVÄKSYTTY / ANKKUROITU** (`v1080`) | 4 | – |
| firenze | ITA | P4 | ei | **FALSKI** (kierros 14, `-9`) | 3 | Brunelleschin kupoli · Ponte Vecchio · Palazzo Vecchio |
| sevilla | ESP | P4 | ei | **FALSKI** (kierros 19, `-14`) | 3 | Giralda · Plaza de España · Metropol Parasol |
| bergen | NOR | P4 | ei | **FALSKI** (kierros 19, `-14`) | 3 | Johanneksen kirkko · Fløibanen · Grieghallen |

---

## 4. JÄRJESTETTY TYÖLISTA

### A. PUUTTUVAT — 17 kaupunkia, 51 kuvaa (pelattavuusjärjestys)

| # | Kaupunki | Miksi tässä kohtaa |
|---|---|---|
| 1 | **Sarajevo** | Pelattava fokusvirta, jolla ei ole yhtään heroa — `fokusvirta-sarajevo.js` joutuu käyttämään Commons-valokuvaa herokuvan sijasta |
| 2 | **Bukarest** | Sama: `fokusvirta-bukarest.js` kiertää puuttuvan heron Commons-kuvalla |
| 3 | **Kreeta** | Kreikka on fokusmaa; Kreeta on laudan toinen GRC-kaupunki |
| 4 | **Sisilia** | Italia on fokusmaa; Sisilia on laudan kolmas ITA-kaupunki |
| 5 | **İzmir** | Turkki on fokusmaa |
| 6 | **Kappadokia** | Turkki on fokusmaa |
| 7 | **Dubrovnik** | Kaaripaketti; Sarajevon naapuri pelin maantieteessä |
| 8 | **Vilna** | Kaaripaketti; Baltian ainoa ilman heroa |
| 9 | **Kiova** | Kaaripaketti |
| 10 | **Odessa** | Kaaripaketti |
| 11 | **Marseille** | Kaaripaketti |
| 12 | **Granada** | Kaaripaketti |
| 13 | **Nikosia** | Kaaripaketti (Lähi-idän osa), lauta-alue Euroopassa |
| 14 | **Alpit** | Kaaripaketti; luontokohde — kohteet nimettyjä rakennelmia/huippuja |
| 15 | **Islanti** | Kaaripaketti; luontokohde |
| 16 | **Tromssa** | Kaaripaketti; luontokohde + rakennuksia |
| 17 | **Lappi (Rovaniemi)** | Kaaripaketti; luontokohde + rakennuksia |

### B. FALSKIT — 29 kaupunkia, 86 kuvaa

| # | Kaupunki | Miksi tässä kohtaa |
|---|---|---|
| 1 | **Ateena** | Pelattava fokusvirta, pilottikaupunki — pelaajan ensimmäinen herokuva |
| 2 | **Istanbul** | Pelattava fokusvirta |
| 3 | **Ankara** | Fokusmaa TUR; lisäksi Atakule on kirjattu EPÄILYTTÄVÄKSI |
| 4 | **Riika** | Tunnettu virhe: viite haettiin kategoriasta `Category:Lieto church` |
| 5 | **Wien** | Tunnettu virhe: viite kategoriasta `Category:Hamburgische Staatsoper` |
| 6 | **Moskova** | Kolme kuvaa riskiarvion kärkilistalla (kaikki kolme) |
| 7 | **Venetsia** | Salute riskiarvion kärkilistalla |
| 8 | **Barcelona** | Kaksi kuvaa kärkilistalla (Sagrada Família, Casa Batlló) |
| 9 | **Praha** | Pyhä Vitus kärkilistalla |
| 10 | **Krakova** | Sukiennice kärkilistalla |
| 11 | **Kööpenhamina** | Vapahtajan kirkko kärkilistalla |
| 12 | **Dublin** | Tullitalo kärkilistalla |
| 13 | **Pietari** | Verikirkko kärkilistalla |
| 14 | **Lontoo** | St Paul kärkilistalla; pelin lähtökaupunki |
| 15 | **Pariisi** | Suuri kaupunki, kierros 2 |
| 16 | **Berliini** | Suuri kaupunki |
| 17 | **Madrid** | Suuri kaupunki |
| 18 | **Amsterdam** | |
| 19 | **Budapest** | |
| 20 | **Lissabon** | |
| 21 | **Varsova** | |
| 22 | **Tukholma** | |
| 23 | **Oslo** | |
| 24 | **Tallinna** | |
| 25 | **Edinburgh** | |
| 26 | **Helsinki** (2 kuvaa) | Oodi jo ankkuroitu, kaksi vanhaa jäljellä |
| 27 | **Firenze** | Ei kaaripakettia |
| 28 | **Sevilla** | Ei kaaripakettia |
| 29 | **Bergen** | Ei kaaripakettia |

---

## 5. VALMIIT CHATGPT-ERÄPROMPTIT

Käyttöohje: liitä prompti sellaisenaan siihen keskusteluun, jossa STEP 1–3
-resepti (research → verify → generate) ja VAKIO-kuvakulma on jo annettu.
Erikoiskulma mainitaan vain siellä, missä kohde sitä vaatii.
Tiedostojen nimet ovat rivin lopussa hakasuluissa — **falskien kohdalla
nimi on sama kuin vanhalla kuvalla**, jotta pelin koodiin ei tarvitse koskea.

### A. PUUTTUVAT

#### 1. Sarajevo

```
Next: a BATCH of 3 images of Sarajevo, Bosnia and Herzegovina. Same process
(research → verify → generate) and same style and framing as the previous
images, one at a time in this order:

1. The Gazi Husrev-beg Mosque in Baščaršija, Sarajevo, with its single stone
   minaret, lead-covered dome and the Sahat Kula clock tower standing beside
   its courtyard.
2. The Sacred Heart Cathedral (Katedrala Srca Isusova) on Ferhadija street,
   Sarajevo — the neo-Gothic Catholic cathedral with its twin west towers and
   rose window.
3. The Latin Bridge (Latinska ćuprija) over the Miljacka river in Sarajevo —
   the small Ottoman stone bridge with three arches and two round openings in
   the spandrels, with the corner building of the Museum of Sarajevo 1878–1918
   on the far bank.
```
[`hero-sarajevo-aamu.png`, `-keskipaiva.png`, `-ilta.png`]

#### 2. Bukarest

```
Next: a BATCH of 3 images of Bucharest, Romania. Same process (research →
verify → generate) and same style and framing as the previous images, one at
a time in this order:

1. The Arcul de Triumf on Kiseleff Road, Bucharest — the granite triumphal
   arch with its single opening, sculpted reliefs and the roundabout around it.
2. The Stavropoleos Monastery Church in the old town of Bucharest — the small
   Brâncovenesc-style church with its carved stone portal, painted facade and
   the arcaded cloister beside it.
3. The CEC Palace (Palatul CEC) on Calea Victoriei, Bucharest — the Beaux-Arts
   savings-bank palace with its great glass-and-metal central dome and the
   arched stone entrance beneath it.
```
[`hero-bukarest-aamu.png`, `-keskipaiva.png`, `-ilta.png`]

#### 3. Kreeta

```
Next: a BATCH of 3 images of Crete, Greece. Same process (research → verify →
generate) and same style and framing as the previous images, one at a time in
this order:

1. The Venetian Fortezza of Rethymno, Crete — the low star-shaped fortress
   walls on the hill above the town, with the domed Sultan Ibrahim Han Mosque
   inside the walls and the town's roofs below.
2. Arkadi Monastery near Rethymno, Crete — the Venetian-Renaissance church
   facade with its four columns, broken pediment and bell-gable, standing in
   the walled monastery courtyard.
3. The Koules Fortress (Rocca a Mare) at the old Venetian harbour of
   Heraklion, Crete — the massive rectangular sea fort at the end of the
   breakwater, with the Venetian lion relief on its wall.
```
[`hero-kreeta-aamu.png`, `-keskipaiva.png`, `-ilta.png`]

#### 4. Sisilia

```
Next: a BATCH of 3 images of Sicily, Italy. Same process (research → verify →
generate) and same style and framing as the previous images, one at a time in
this order:

1. The Temple of Concordia in the Valley of the Temples, Agrigento, Sicily —
   the Doric peripteral temple with six columns across its front, standing
   almost complete on its ridge.
2. The Cathedral of Syracuse (Duomo di Siracusa) on Piazza Duomo, Ortygia,
   Sicily — the Baroque limestone facade with its two orders of columns, and
   the Doric columns of the older Temple of Athena embedded in its side wall.
3. The Cathedral of Monreale (Duomo di Monreale) near Palermo, Sicily — the
   Norman-Arab cathedral with its two square west towers and the interlaced
   blind arcading of its apses, with the cloister beside it.
```
[`hero-sisilia-aamu.png`, `-keskipaiva.png`, `-ilta.png`]

#### 5. İzmir

```
Next: a BATCH of 3 images of İzmir, Turkey. Same process (research → verify →
generate) and same style and framing as the previous images, one at a time in
this order:

1. The İzmir Clock Tower (İzmir Saat Kulesi) on Konak Square, İzmir — the
   Ottoman marble tower with its four fountains at the base, moorish arches
   and the clock faces near the top.
2. The historic Asansör in Karataş, İzmir — the brick elevator tower built
   into the cliff face, joining the shore street to the neighbourhood on the
   ridge above.
3. The Kızlarağası Han in the Kemeraltı bazaar, İzmir — the two-storey stone
   Ottoman caravanserai with its arcaded inner courtyard and vaulted rooms.
```
[`hero-izmir-aamu.png`, `-keskipaiva.png`, `-ilta.png`]

#### 6. Kappadokia

```
Next: a BATCH of 3 images of Cappadocia, Turkey. Same process (research →
verify → generate) and same style and framing as the previous images, one at
a time in this order:

1. The Göreme Open Air Museum, Cappadocia — the cluster of rock-cut monastic
   churches and refectories carved into the pale tuff cones, with their
   arched doorways and hollowed windows.
2. Ortahisar Castle (Ortahisar Kalesi), Cappadocia — the single tall tuff
   outcrop riddled with cut rooms and openings, rising above the stone houses
   of the town at its foot.
3. Selime Monastery at the mouth of the Ihlara Valley, Cappadocia — the large
   rock-cut cathedral and monastery carved into the cliff, with its cut
   staircases, chimney-like cones and the valley below.
```
[`hero-kapadokia-aamu.png`, `-keskipaiva.png`, `-ilta.png`]

#### 7. Dubrovnik

```
Next: a BATCH of 3 images of Dubrovnik, Croatia. Same process (research →
verify → generate) and same style and framing as the previous images, one at
a time in this order:

1. Fort Lovrijenac (Tvrđava Lovrijenac), Dubrovnik — the triangular stone
   fortress standing on its own rock west of the old town, its walls rising
   straight out of the sea cliff.
2. The Rector's Palace (Knežev dvor) on Pred Dvorom, Dubrovnik — the Gothic-
   Renaissance palace with its arcaded ground-floor loggia of six arches and
   the carved capitals above the columns.
3. The Church of St Blaise (Crkva svetog Vlaha) on Luža Square, Dubrovnik —
   the Baroque church with its broad flight of steps, balustrade and statue of
   St Blaise on the gable, with Orlando's Column standing in the square before
   it.
```
[`hero-dubrovnik-aamu.png`, `-keskipaiva.png`, `-ilta.png`]

#### 8. Vilna

```
Next: a BATCH of 3 images of Vilnius, Lithuania. Same process (research →
verify → generate) and same style and framing as the previous images, one at
a time in this order:

1. Vilnius Cathedral (Vilniaus Arkikatedra) and its free-standing Belfry on
   Cathedral Square — the white classical temple front with six columns and
   three statues on the pediment, and the round-based bell tower beside it.
2. The Gate of Dawn (Aušros Vartai), Vilnius — the last surviving city gate,
   seen from the street inside the old town, with the chapel of Our Lady of
   the Gate of Dawn above the arch.
3. The Church of St Peter and St Paul in Antakalnis, Vilnius — the white
   Baroque church with its twin towers, central dome and the statues in the
   niches of its facade.
```
[`hero-vilna-aamu.png`, `-keskipaiva.png`, `-ilta.png`]

#### 9. Kiova

```
Next: a BATCH of 3 images of Kyiv, Ukraine. Same process (research → verify →
generate) and same style and framing as the previous images, one at a time in
this order:

1. Saint Sophia Cathedral (Софійський собор) on Sofiyivska Square, Kyiv —
   the white cathedral with its green-and-gold cluster of domes and the tall
   Baroque bell tower with its gilded cupola beside it.
2. The Kyiv Pechersk Lavra — the Great Lavra Bell Tower and the Dormition
   Cathedral, with the white monastery buildings and golden domes on the
   terraces above the Dnipro.
3. The Motherland Monument (Батьківщина-Мати) on the bluff above the Dnipro
   in Kyiv — the stainless steel figure holding a sword and a shield, standing
   on its wide museum plinth.

For image 3, use the tighter framing (the figure filling the frame with only
the plinth and the river valley behind), because the monument has no street
level around it.
```
[`hero-kiova-aamu.png`, `-keskipaiva.png`, `-ilta.png`]

#### 10. Odessa

```
Next: a BATCH of 3 images of Odesa, Ukraine. Same process (research → verify →
generate) and same style and framing as the previous images, one at a time in
this order:

1. The Odesa National Academic Theatre of Opera and Ballet — the Neo-Baroque
   theatre with its curved colonnaded loggia, sculpted gable group and the
   open square in front of it.
2. The Vorontsov Palace and its curved Doric colonnade on the Primorsky
   boulevard bluff, Odesa, with the port below.
3. The Odesa City Hall (the former Stock Exchange) on Dumska Square, Odesa —
   the classical building with its pale columned portico, clock in the
   pediment and the statues of Laocoön and the cannon in the square.
```
[`hero-odessa-aamu.png`, `-keskipaiva.png`, `-ilta.png`]

#### 11. Marseille

```
Next: a BATCH of 3 images of Marseille, France. Same process (research →
verify → generate) and same style and framing as the previous images, one at
a time in this order:

1. The MuCEM in Marseille — the dark concrete cube wrapped in its perforated
   lattice screen, standing on the water at the harbour mouth, with the long
   footbridge running from it to the ramparts of Fort Saint-Jean.
2. Marseille Cathedral, La Major (Cathédrale Sainte-Marie-Majeure) — the
   Byzantine-Romanesque cathedral in banded green and white stone, with its
   large central dome, two west towers and the wide steps in front.
3. The Palais Longchamp, Marseille — the semicircular colonnade linking the
   two museum wings, with the monumental fountain and its sculpted group of
   bulls and chariot in the centre.
```
[`hero-marseille-aamu.png`, `-keskipaiva.png`, `-ilta.png`]

#### 12. Granada

```
Next: a BATCH of 3 images of Granada, Spain. Same process (research → verify →
generate) and same style and framing as the previous images, one at a time in
this order:

1. The Monastery of San Jerónimo (Monasterio de San Jerónimo), Granada — the
   Renaissance church with its plain high stone flank, the great east end of
   the sanctuary and the two-storey arcaded cloister beside it.
2. The Charterhouse of Granada (Monasterio de la Cartuja) — the white
   monastery with its Baroque stone portal, square bell tower and the long
   plain walls of the cloister ranges.
3. The Corral del Carbón, Granada — the 14th-century Nasrid caravanserai with
   its tall horseshoe-arched brick gateway, carved stucco panels above it and
   the three-storey arcaded courtyard behind.
```
[`hero-granada-aamu.png`, `-keskipaiva.png`, `-ilta.png`]

#### 13. Nikosia

```
Next: a BATCH of 3 images of Nicosia, Cyprus. Same process (research → verify
→ generate) and same style and framing as the previous images, one at a time
in this order:

1. The Church of Panagia Faneromeni on Faneromeni Square, Nicosia — the stone
   church with its bell gable, arched portico and the marble mausoleum
   standing beside it.
2. The House of Hadjigeorgakis Kornesios (the Dragoman's house) on
   Patriarchou Grigoriou street, Nicosia — the Ottoman mansion with its
   carved stone coat of arms above the doorway, projecting upper storey and
   the walled courtyard.
3. The Büyük Han in Nicosia — the Ottoman caravanserai with its two storeys
   of pointed arcades around a square courtyard and the small domed mosque
   standing on pillars in the middle of the yard.
```
[`hero-nikosia-aamu.png`, `-keskipaiva.png`, `-ilta.png`]

#### 14. Alpit

```
Next: a BATCH of 3 images of the Alps, Switzerland. Same process (research →
verify → generate) and same style and framing as the previous images, one at
a time in this order:

1. The Sphinx Observatory at Jungfraujoch, Switzerland — the observatory
   building with its round white dome standing on its rock spur high above
   the snowfields, reached by the covered gallery on the ridge.
2. The Landwasser Viaduct of the Rhaetian Railway near Filisur, Switzerland —
   the curving six-arch limestone viaduct that runs straight into the tunnel
   mouth in the cliff face, with the wooded gorge below.
3. The north face of the Eiger above Grindelwald, Switzerland — the great
   concave wall of dark limestone rising from the alpine meadows and the
   scattered farmhouses at its foot.

Images 1 and 3 have no street level: keep the drone viewpoint but let the
alpine slope and the buildings on it stand in for the streets below.
```
[`hero-alpit-aamu.png`, `-keskipaiva.png`, `-ilta.png`]

#### 15. Islanti

```
Next: a BATCH of 3 images of Iceland. Same process (research → verify →
generate) and same style and framing as the previous images, one at a time in
this order:

1. Hallgrímskirkja in Reykjavík — the concrete church whose stepped wings
   sweep up on both sides of the tall central tower, with the statue of Leif
   Erikson on the plaza in front and the coloured roofs of Reykjavík behind.
2. Þingvellir, Iceland — the Almannagjá rift wall running straight across the
   plain, with the path along its foot, the Lögberg flagpole on the rock and
   the Öxará river and lake beyond.
3. The Strokkur geyser erupting in the Haukadalur geothermal field, Iceland —
   the column of water and steam rising from the pale sinter basin, with the
   boardwalks, steam vents and hills of the valley around it.

Images 2 and 3 are landscapes with no buildings: keep the drone viewpoint,
and let the paths, boardwalks and visitors provide the human scale that the
streets usually give.
```
[`hero-islanti-aamu.png`, `-keskipaiva.png`, `-ilta.png`]

#### 16. Tromssa

```
Next: a BATCH of 3 images of Tromsø, Norway. Same process (research → verify →
generate) and same style and framing as the previous images, one at a time in
this order:

1. The Arctic Cathedral (Ishavskatedralen, Tromsdalen Church), Tromsø — the
   white church built of eleven leaning concrete triangles, with the tall
   glass mosaic window filling its east end.
2. Polaria in Tromsø — the museum built as a row of tilted white slabs, like
   ice floes pushed up on the shore, standing at the water's edge.
3. The Polar Museum (Polarmuseet) in Tromsø — the ochre-red wooden customs
   warehouse of 1837 standing on its wharf at Søndre Tollbodgate, with the
   quay and moored boats in front of it.
```
[`hero-tromssa-aamu.png`, `-keskipaiva.png`, `-ilta.png`]

#### 17. Lappi (Rovaniemi)

```
Next: a BATCH of 3 images of Finnish Lapland. Same process (research → verify
→ generate) and same style and framing as the previous images, one at a time
in this order:

1. Arktikum in Rovaniemi, Finland — the museum and science centre whose long
   glass tube roof runs out from the low building towards the Ounasjoki river
   bank.
2. The Jätkänkynttilä Bridge (the Lumberjack's Candle Bridge) over the
   Kemijoki in Rovaniemi — the cable-stayed bridge whose single pylon carries
   a gas flame burning at its top.
3. Sajos, the Sámi Cultural Centre in Inari, Finland — the low timber-clad
   building with its curved wooden walls and the great glazed entrance front,
   standing among pines by the Juutuanjoki.
```
[`hero-lappi-aamu.png`, `-keskipaiva.png`, `-ilta.png`]

---

### B. FALSKIT

Näissä kohde pysyy samana kuin vanhassa kuvassa, jotta lehden kuvateksti
kelpaa sellaisenaan. **Tallenna vanhalla nimellä.**

#### 1. Ateena

```
Next: a BATCH of 3 images of Athens, Greece. Same process (research → verify →
generate) and same style and framing as the previous images, one at a time in
this order:

1. The Parthenon on the Acropolis of Athens — the Doric marble temple with
   eight columns across its front, standing on the rock above the city.
2. The Temple of Olympian Zeus (Olympieion) in Athens — the surviving group of
   tall Corinthian columns with their carved capitals and the fallen column
   lying beside them, with the Acropolis on the ridge behind.
3. The Panathenaic Stadium (Kallimarmaro) in Athens — the horseshoe of white
   marble tiers with the running track inside and the wooded Ardittos hill
   rising behind it.
```
[`hero-ateena-aamu.png`, `-keskipaiva.png`, `-ilta.png`]

#### 2. Istanbul

```
Next: a BATCH of 3 images of Istanbul, Turkey. Same process (research →
verify → generate) and same style and framing as the previous images, one at a
time in this order:

1. Hagia Sophia in Istanbul — the great shallow central dome with its ring of
   windows and the half-domes stepping down on either side, the pinkish
   buttressed walls, and the four minarets standing apart at the corners.
2. The Galata Tower in Istanbul — the round stone tower with its conical
   roof and the balcony running round beneath it, rising above the steep
   streets of Galata.
3. The Sultan Ahmed Mosque (the Blue Mosque) in Istanbul — the cascade of
   domes and half-domes over the prayer hall, the arcaded courtyard and the
   six minarets.
```
[`hero-istanbul-aamu.png`, `-keskipaiva.png`, `-ilta.png`]

#### 3. Ankara

```
Next: a BATCH of 3 images of Ankara, Turkey. Same process (research → verify →
generate) and same style and framing as the previous images, one at a time in
this order:

1. Anıtkabir in Ankara — the rectangular limestone hall surrounded by its
   colonnade of square pillars, with the flat roof, the broad steps and the
   ceremonial plaza in front.
2. The Hacı Bayram Mosque in Ankara — the tiled-roof mosque with its single
   stone minaret and small domed türbe, standing against the surviving wall
   of the Roman Temple of Augustus and Rome.
3. Atakule in Ankara — the tower with its slender shaft and the flat,
   sharp-edged disc of the revolving restaurant capsule near the top, with
   the shopping centre at its foot.

For image 3, note that Atakule's restaurant capsule is a flat, disc-shaped
platform with a glazed rim — not a bulbous or bell-shaped tower head — and
the shaft is slender.
```
[`hero-ankara-aamu.png`, `-keskipaiva.png`, `-ilta.png`]

#### 4. Riika

```
Next: a BATCH of 3 images of Riga, Latvia. Same process (research → verify →
generate) and same style and framing as the previous images, one at a time in
this order:

1. The House of the Blackheads (Melngalvju nams) on Town Hall Square, Riga —
   the tall stepped Dutch Renaissance gable with its clock, astronomical dial
   and figures, and the red brick facade beneath it.
2. The Freedom Monument (Brīvības piemineklis) in Riga — the tall travertine
   column carrying the copper figure of Liberty holding three gilded stars,
   with the sculpted groups on the granite base and the boulevard around it.
3. St Peter's Church in Riga (Rīgas Svētā Pētera baznīca) — the red brick
   Gothic church with its tall openwork spire in three receding tiers with
   galleries, rising above the roofs of the old town.

For image 3 the subject is St Peter's Church in RIGA, Latvia — do not confuse
it with any other church of the same dedication.
```
[`hero-riika-aamu.png`, `-keskipaiva.png`, `-ilta.png`]

#### 5. Wien

```
Next: a BATCH of 3 images of Vienna, Austria. Same process (research → verify
→ generate) and same style and framing as the previous images, one at a time
in this order:

1. St Stephen's Cathedral (Stephansdom) in Vienna — the tall south tower and
   the steeply pitched roof covered in glazed tiles laid in a zigzag pattern
   with the double-headed eagle worked into it.
2. Schönbrunn Palace in Vienna — the long ochre-yellow Baroque palace front
   with its central block and wings, the great forecourt in front and the
   parterre gardens rising to the Gloriette behind.
3. The Vienna State Opera (Wiener Staatsoper) on the Ringstrasse — the
   Renaissance Revival opera house with its arcaded loggia of five arches,
   the winged-horse groups on the corners of the roof and the Ring traffic in
   front.

For image 3 the subject is the VIENNA State Opera on the Ringstrasse — not
any other opera house.
```
[`hero-wien-aamu.png`, `-keskipaiva.png`, `-ilta.png`]

#### 6. Moskova

```
Next: a BATCH of 3 images of Moscow, Russia. Same process (research → verify →
generate) and same style and framing as the previous images, one at a time in
this order:

1. Saint Basil's Cathedral on Red Square, Moscow — the group of nine chapels
   with their differently patterned and coloured onion domes clustered around
   the tall central tent-roofed tower.
2. The Moscow Kremlin walls and towers — the red brick curtain wall with its
   swallow-tail merlons running along the river, with the tented tower roofs
   and the golden domes of the cathedrals inside.
3. The Main Building of Moscow State University on Sparrow Hills — the stepped
   Stalinist tower with its tiered setbacks, spire and star, and the symmetric
   wings spreading on both sides.
```
[`hero-moskova-aamu.png`, `-keskipaiva.png`, `-ilta.png`]

#### 7. Venetsia

```
Next: a BATCH of 3 images of Venice, Italy. Same process (research → verify →
generate) and same style and framing as the previous images, one at a time in
this order:

1. St Mark's Basilica in Venice — the five round-arched portals with their
   mosaic lunettes, the four bronze horses above the central portal, the
   ogee-crested roofline and the domes behind, with the campanile standing
   apart on the square.
2. The Rialto Bridge in Venice — the single wide marble arch over the Grand
   Canal carrying two rows of shops and three walkways, with the portico
   openings at its crown.
3. Santa Maria della Salute in Venice — the octagonal domed church with its
   great volutes ("ears") buttressing the drum, the second smaller dome and
   bell towers behind, standing at the entrance of the Grand Canal.
```
[`hero-venetsia-aamu.png`, `-keskipaiva.png`, `-ilta.png`]

#### 8. Barcelona

```
Next: a BATCH of 3 images of Barcelona, Spain. Same process (research →
verify → generate) and same style and framing as the previous images, one at a
time in this order:

1. The Sagrada Família in Barcelona — the basilica with its Nativity and
   Passion facades and the cluster of tall openwork spires with their
   mosaic-tipped pinnacles, standing above the Eixample blocks.
2. Casa Batlló on Passeig de Gràcia, Barcelona — the facade with its bone-like
   columns and gaping oval windows on the lower floors, the mosaic-flecked
   upper wall, the balconies like masks and the scaled, arched roof with its
   turret.
3. The Palau Nacional on Montjuïc, Barcelona — the great domed exhibition
   palace with its four corner towers, seen above the terraces, cascade and
   the Magic Fountain on the axis below.
```
[`hero-barcelona-aamu.png`, `-keskipaiva.png`, `-ilta.png`]

#### 9. Praha

```
Next: a BATCH of 3 images of Prague, Czechia. Same process (research →
verify → generate) and same style and framing as the previous images, one at a
time in this order:

1. St Vitus Cathedral in Prague Castle — the Gothic cathedral with its twin
   west towers and rose window, the tall south tower with its Renaissance
   cupola, and the flying buttresses along the nave.
2. Charles Bridge in Prague — the stone bridge with its sixteen arches, the
   rows of Baroque statues along the parapets and the Gothic bridge tower at
   the Old Town end.
3. The Church of Our Lady before Týn in Prague — the two tall Gothic west
   towers with their steep spires and the ring of small pinnacles around each,
   rising behind the row of houses on the Old Town Square.
```
[`hero-praha-aamu.png`, `-keskipaiva.png`, `-ilta.png`]

#### 10. Krakova

```
Next: a BATCH of 3 images of Kraków, Poland. Same process (research → verify →
generate) and same style and framing as the previous images, one at a time in
this order:

1. Wawel Cathedral on Wawel Hill, Kraków — the church with its mixed towers,
   the gilded dome of the Sigismund Chapel and the white Vasa Chapel dome,
   standing on the limestone hill above the Vistula.
2. St Mary's Basilica (Kościół Mariacki) on the Main Square of Kraków — the
   two unequal brick towers, the taller one crowned with a gilded spire and a
   ring of turrets, the lower with a Renaissance dome.
3. The Cloth Hall (Sukiennice) in the middle of the Main Square of Kraków —
   the long Renaissance hall with its arcaded loggia, decorated parapet with
   mascarons and the market square around it.
```
[`hero-krakova-aamu.png`, `-keskipaiva.png`, `-ilta.png`]

#### 11. Kööpenhamina

```
Next: a BATCH of 3 images of Copenhagen, Denmark. Same process (research →
verify → generate) and same style and framing as the previous images, one at
a time in this order:

1. Frederik's Church, the Marble Church (Marmorkirken) in Copenhagen — the
   great green copper dome on its colonnaded drum, with the classical portico
   and the statues of churchmen on the plaza around it.
2. Christiansborg Palace in Copenhagen — the grey granite palace with its
   tall square tower carrying a slender copper spire, and the riding grounds
   and equestrian statue in the courtyard.
3. The Church of Our Saviour (Vor Frelsers Kirke) in Christianshavn,
   Copenhagen — the brick church with the black-and-gold helical spire whose
   external staircase winds up the outside to the globe and figure at the top.
```
[`hero-kobenhavn-aamu.png`, `-keskipaiva.png`, `-ilta.png`]

#### 12. Dublin

```
Next: a BATCH of 3 images of Dublin, Ireland. Same process (research →
verify → generate) and same style and framing as the previous images, one at a
time in this order:

1. The Campanile of Trinity College Dublin — the granite bell tower with its
   arched openings and stone dome standing in Parliament Square, with the
   college buildings around it.
2. St Patrick's Cathedral in Dublin — the long grey Gothic cathedral with its
   massive square west tower and its stone spire, and the park beside it.
3. The Custom House in Dublin — the long Georgian riverfront with its columned
   central portico and the copper-covered dome on its drum, seen along the
   Liffey quays.
```
[`hero-dublin-aamu.png`, `-keskipaiva.png`, `-ilta.png`]

#### 13. Pietari

```
Next: a BATCH of 3 images of Saint Petersburg, Russia. Same process (research
→ verify → generate) and same style and framing as the previous images, one at
a time in this order:

1. The Winter Palace in Saint Petersburg — the long green-and-white Baroque
   facade with its white columns and roofline statues, facing Palace Square
   with the Alexander Column standing in the middle.
2. The Church of the Savior on Spilled Blood in Saint Petersburg — the
   Russian-revival church with its cluster of differently patterned onion
   domes and the tall gilded central tent tower, on the bank of the
   Griboyedov Canal.
3. The Peter and Paul Cathedral in Saint Petersburg — the golden needle spire
   with the angel and cross at its tip rising from the bell tower over the
   low church, inside the bastioned walls of the Peter and Paul Fortress.
```
[`hero-pietari-aamu.png`, `-keskipaiva.png`, `-ilta.png`]

#### 14. Lontoo

```
Next: a BATCH of 3 images of London, United Kingdom. Same process (research →
verify → generate) and same style and framing as the previous images, one at a
time in this order:

1. Tower Bridge in London — the two Gothic-revival stone towers, the high
   walkways between them and the pale blue suspension chains running out to
   the banks of the Thames.
2. The Palace of Westminster in London — the long river front with its
   pinnacled Perpendicular Gothic facade, the Victoria Tower at one end and
   the Elizabeth Tower with the Big Ben clock at the other.
3. St Paul's Cathedral in London — Christopher Wren's dome on its colonnaded
   drum with the stone lantern above, and the twin west towers over the
   columned portico.
```
[`hero-lontoo-aamu.png`, `-keskipaiva.png`, `-ilta.png`]

#### 15. Pariisi

```
Next: a BATCH of 3 images of Paris, France. Same process (research → verify →
generate) and same style and framing as the previous images, one at a time in
this order:

1. The Eiffel Tower in Paris — the wrought-iron lattice tower with its four
   splayed legs, the arched skirt between them and the two platforms, standing
   over the Champ de Mars.
2. Notre-Dame de Paris — the west front with its twin square towers, three
   deep portals and rose window, the flying buttresses along the choir and the
   restored spire, on the Île de la Cité.
3. The Basilica of Sacré-Cœur on Montmartre, Paris — the white travertine
   basilica with its central dome and the smaller domes and campanile behind,
   above the long flights of steps on the hillside.
```
[`hero-pariisi-aamu.png`, `-keskipaiva.png`, `-ilta.png`]

#### 16. Berliini

```
Next: a BATCH of 3 images of Berlin, Germany. Same process (research →
verify → generate) and same style and framing as the previous images, one at a
time in this order:

1. The Brandenburg Gate in Berlin — the sandstone gate with its twelve Doric
   columns forming five passages, and the Quadriga, the four-horse chariot,
   on the entablature above.
2. The Reichstag Building in Berlin — the Wilhelmine stone facade with its
   corner towers and columned portico, and Norman Foster's glass dome with its
   spiral ramp on the roof.
3. Berlin Cathedral (Berliner Dom) on Museum Island — the domed Baroque-
   revival church with its ribbed copper main dome, lantern and the four
   smaller corner domes, beside the Spree and the Lustgarten.
```
[`hero-berliini-aamu.png`, `-keskipaiva.png`, `-ilta.png`]

#### 17. Madrid

```
Next: a BATCH of 3 images of Madrid, Spain. Same process (research → verify →
generate) and same style and framing as the previous images, one at a time in
this order:

1. The Royal Palace of Madrid (Palacio Real) — the great square white
   limestone and granite palace with its columned upper storeys and the Plaza
   de la Armería courtyard, above the gardens on the west side.
2. The Plaza Mayor in Madrid — the closed rectangular square of uniform
   red-painted houses with 237 balconies, the arcades below, the slate spires
   of the Casa de la Panadería and the equestrian statue in the middle.
3. The Cybele Fountain (Fuente de Cibeles) in Madrid — the goddess in her
   lion-drawn chariot in the middle of the roundabout, with the white
   Cibeles Palace with its towers and pinnacles behind.
```
[`hero-madrid-aamu.png`, `-keskipaiva.png`, `-ilta.png`]

#### 18. Amsterdam

```
Next: a BATCH of 3 images of Amsterdam, the Netherlands. Same process
(research → verify → generate) and same style and framing as the previous
images, one at a time in this order:

1. The Westerkerk in Amsterdam — the Renaissance church with its tall tower
   in receding stages topped by the blue-and-gold imperial crown of
   Maximilian, on the Prinsengracht canal.
2. The Rijksmuseum in Amsterdam — the Gothic-Renaissance museum with its two
   towers, decorated gables and the vaulted passage cut straight through the
   middle of the building at ground level.
3. The Magere Brug in Amsterdam — the white wooden double-leaf drawbridge over
   the Amstel, with its balance beams, tie rods and lamps along the railings.
```
[`hero-amsterdam-aamu.png`, `-keskipaiva.png`, `-ilta.png`]

#### 19. Budapest

```
Next: a BATCH of 3 images of Budapest, Hungary. Same process (research →
verify → generate) and same style and framing as the previous images, one at
a time in this order:

1. The Hungarian Parliament Building in Budapest — the long neo-Gothic river
   front with its pinnacled wings, the great red ribbed dome in the middle,
   and the Danube in front.
2. The Fisherman's Bastion on the Buda Castle hill, Budapest — the white
   stone terrace with its seven conical-roofed turrets, arcaded walks and
   stairs, with the Matthias Church behind it.
3. The Széchenyi Chain Bridge in Budapest — the suspension bridge with its two
   classical stone tower pylons, the flat chains and the stone lions at the
   abutments.
```
[`hero-budapest-aamu.png`, `-keskipaiva.png`, `-ilta.png`]

#### 20. Lissabon

```
Next: a BATCH of 3 images of Lisbon, Portugal. Same process (research →
verify → generate) and same style and framing as the previous images, one at a
time in this order:

1. The Belém Tower in Lisbon — the four-storey Manueline tower with its
   ropework mouldings, armillary spheres and battlements of shields, standing
   on the low bastion at the water's edge.
2. The Jerónimos Monastery in Belém, Lisbon — the long ornate Manueline south
   front with its great carved portal, and the church and two-storey cloister
   behind it.
3. The Praça do Comércio in Lisbon — the great U-shaped square open to the
   Tagus, with its yellow arcaded ranges, the equestrian statue of José I in
   the middle and the Rua Augusta Arch on the north side.
```
[`hero-lissabon-aamu.png`, `-keskipaiva.png`, `-ilta.png`]

#### 21. Varsova

```
Next: a BATCH of 3 images of Warsaw, Poland. Same process (research → verify →
generate) and same style and framing as the previous images, one at a time in
this order:

1. The Royal Castle in Warsaw — the brick-red Baroque castle with its tall
   central clock tower, facing Castle Square with Sigismund's Column standing
   in front.
2. Wilanów Palace in Warsaw — the yellow Baroque country palace with its
   corner towers, sculpted parapet and the formal parterre garden behind it.
3. The Palace on the Isle (Pałac na Wyspie) in Łazienki Park, Warsaw — the
   white classical palace with its columned portico standing on the island,
   reflected in the water and joined to the banks by low bridges.
```
[`hero-varsova-aamu.png`, `-keskipaiva.png`, `-ilta.png`]

#### 22. Tukholma

```
Next: a BATCH of 3 images of Stockholm, Sweden. Same process (research →
verify → generate) and same style and framing as the previous images, one at
a time in this order:

1. The Royal Palace of Stockholm (Kungliga slottet) — the large square
   Baroque palace with its plain roofline and the low wings reaching out on
   the north side, on the edge of Gamla Stan by the water.
2. Stockholm City Hall (Stadshuset) — the dark red brick building with its
   square tower carrying the three gilded crowns on the top, and the arcaded
   courtyard beside the water.
3. Riddarholmen Church in Stockholm — the brick medieval church with its
   openwork cast-iron spire, standing among the old buildings on Riddarholmen
   island.
```
[`hero-tukholma-aamu.png`, `-keskipaiva.png`, `-ilta.png`]

#### 23. Oslo

```
Next: a BATCH of 3 images of Oslo, Norway. Same process (research → verify →
generate) and same style and framing as the previous images, one at a time in
this order:

1. Akershus Fortress in Oslo — the medieval stone castle with its towers and
   steep roofs on the rock above the fjord, with the bastioned outer walls
   below.
2. The Holmenkollen ski jump in Oslo — the steel inrun cantilevered out from
   the hillside above the landing slope and the stadium bowl, with the city
   and the fjord in the distance.
3. The Royal Palace in Oslo (Slottet) — the pale yellow classical palace with
   its columned central portico, standing at the top of Karl Johans gate with
   the park in front.
```
[`hero-oslo-aamu.png`, `-keskipaiva.png`, `-ilta.png`]

#### 24. Tallinna

```
Next: a BATCH of 3 images of Tallinn, Estonia. Same process (research →
verify → generate) and same style and framing as the previous images, one at a
time in this order:

1. St Olaf's Church (Oleviste kirik) in Tallinn — the tall Gothic church with
   its slender green octagonal spire rising far above the roofs of the lower
   old town.
2. Kadriorg Palace in Tallinn — the pink-and-white Baroque palace with its
   sculpted pediment and pilasters, with the formal flower garden and
   fountain in front.
3. The Tallinn TV Tower — the concrete shaft with the wide round observation
   deck near the top and the mast above it, standing above the forest at
   Pirita.
```
[`hero-tallinna-aamu.png`, `-keskipaiva.png`, `-ilta.png`]

#### 25. Edinburgh

```
Next: a BATCH of 3 images of Edinburgh, Scotland. Same process (research →
verify → generate) and same style and framing as the previous images, one at
a time in this order:

1. Edinburgh Castle — the castle on its basalt crag with the Half Moon
   Battery, the Royal Palace block and St Margaret's Chapel, and the sheer
   cliff falling away on three sides.
2. St Giles' Cathedral on the Royal Mile, Edinburgh — the church with its
   distinctive crown steeple, the stone arches meeting over the lantern, above
   the dark stone of the High Street.
3. The National Monument on Calton Hill, Edinburgh — the unfinished row of
   twelve Doric columns carrying a short stretch of entablature on the bare
   rock of the hilltop.
```
[`hero-edinburgh-aamu.png`, `-keskipaiva.png`, `-ilta.png`]

#### 26. Helsinki (2 kuvaa)

```
Next: a BATCH of 2 images of Helsinki, Finland. Same process (research →
verify → generate) and same style and framing as the previous images, one at a
time in this order:

1. Helsinki Cathedral on Senate Square — Carl Ludvig Engel's white
   neoclassical church with its tall green central dome, the four smaller
   domes at the corners, the columned porticoes and the wide flight of steps
   down to the square.
2. Uspenski Cathedral in Helsinki — the red brick Orthodox cathedral with its
   thirteen golden onion domes, standing on the rock of Katajanokka above the
   harbour.
```
[`hero7-tuomiokirkko.png`, `hero7-uspenski.png` — **huom. vanha nimeämistapa,
säilytä se**]

#### 27. Firenze

```
Next: a BATCH of 3 images of Florence, Italy. Same process (research →
verify → generate) and same style and framing as the previous images, one at a
time in this order:

1. Brunelleschi's dome on Florence Cathedral — the red-tiled octagonal dome
   with its white marble ribs and the marble lantern on top, with Giotto's
   campanile beside it.
2. The Ponte Vecchio in Florence — the three-arched stone bridge over the Arno
   carrying its rows of overhanging goldsmiths' shops, with the Vasari
   Corridor running above them.
3. The Palazzo Vecchio in Florence — the rusticated stone block with its
   crenellated projecting gallery and the tall off-centre Torre di Arnolfo,
   on the Piazza della Signoria.
```
[`hero-firenze-aamu.png`, `-keskipaiva.png`, `-ilta.png`]

#### 28. Sevilla

```
Next: a BATCH of 3 images of Seville, Spain. Same process (research → verify →
generate) and same style and framing as the previous images, one at a time in
this order:

1. The Giralda in Seville — the Almohad brick minaret with its sebka-patterned
   panels, carrying the Renaissance bell stage and the Giraldillo weather vane
   on top, rising over the cathedral.
2. The Plaza de España in Seville — the great brick-and-tile semicircle with
   its two towers, the canal and its bridges, and the tiled alcoves along the
   base.
3. The Metropol Parasol (Las Setas) in Seville — the huge waffled timber
   canopy on its columns standing over the Plaza de la Encarnación, with the
   walkway winding across the top.
```
[`hero-sevilla-aamu.png`, `-keskipaiva.png`, `-ilta.png`]

#### 29. Bergen

```
Next: a BATCH of 3 images of Bergen, Norway. Same process (research → verify →
generate) and same style and framing as the previous images, one at a time in
this order:

1. St John's Church (Johanneskirken) in Bergen — the red brick neo-Gothic
   church with its tall single west tower and spire, standing on the highest
   point of the city centre.
2. The Fløibanen funicular in Bergen — the carriage climbing its steep track
   up the wooded side of Fløyen, with the lower station in the town and the
   harbour below.
3. Grieghallen in Bergen — the concert hall with its long low glazed foyer
   front and the taller windowless stage block behind it, with the open square
   in front.
```
[`hero-bergen-aamu.png`, `-keskipaiva.png`, `-ilta.png`]

---

## 6. Jatkohuomiot

1. **Sofia ja Rooma:** juuri tehdyt 5 + 4 kuvaa eivät ole vielä ämpärissä
   (curl-luotaus 26.8.: `hero-sofia-*` → 404, `hero-rooma-*` → 200 mutta
   vanhat). Kun ne viedään, päivitä samassa versiossa myös
   `js/viitekuva-herot.js` (VIITEKUVA_HEROT) — sen kommentti kieltää
   nimenomaan lupaamasta kuvia, joita pelissä ei vielä ole.
2. **Sofian ja Sarajevon fokusvirrat** kiertävät puuttuvan heron
   Commons-valokuvalla (`tiedosto` `ampari`:n sijasta). Kun herot
   valmistuvat, nuo kohdat voi halutessaan vaihtaa herokuviksi — mutta
   kummankin tiedoston kommentti perustelee, miksi vaihe 2 saattaa olla
   parempi Commons-kuvalla. Älä vaihda ilman Fablen tarkistusta.
3. **Puuttuville kaupungeille tarvitaan lehteen uusi `avauskuvat`-lohko**
   (`js/packs/kulttuuri-kategoriat.js`) kuvateksteineen ja lähderiveineen
   ("Matkakirjan havainnekuva"). Falskien uusinnat eivät vaadi koodimuutosta.
4. **Kohteen vaihtoa ei tarvita missään Euroopan uusinnassa.** Kaikki
   Euroopan kuvatekstien lupaamat kohteet ovat hyvin dokumentoituja
   Commonsissa, joten kohde voi pysyä samana ja kuvateksti kelpaa
   sellaisenaan. (Koko pelin ainoa kohdevaihto tehtiin Damaskoksessa:
   Suq al-Hamidiyya → linnoitus, koska luvattu aihe oli sisätila.)
5. **Ämpärin luotaus on toistettava ajo:** komento talletettu tiedostoon
   `probe.sh` samaan kansioon; tulokset `probe.txt`.
