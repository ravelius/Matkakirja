# Taidemuseo-linssi: suunnitelma (24.9.2026)

*Linssiseppä (Opus) ja Natiiviseppä (Opus) Fablen pyynnöstä. Omistajan kortti 24.9.2026 klo 12.3x
(Fablen välittämä, sitova): linssi on vain natiivissa. Tämä on pelkkä suunnitelma. Toteutus alkaa vasta
pariteettikierroksen ja elokuvalennon jälkeen. Raamatun kohta on TAIDEMUSEO-LINSSI (Karttalinssit-osa),
ja sen kirjoittaa Fable. Luvut 6 ja 7 ovat Natiivisepän (sali, valot, efektit ja muistibudjetti); Natiiviseppä tarkisti ne 24.9. Niissä
on Linssisepän lähtöehdotus Natiivisepän korjauksin.*

## 0. Fablen päätökset 24.9.2026 (sitovat)

1. **Italian valtion museoiden teokset jäävät pilotista pois.** Tällaisia ovat Uffizin Venuksen syntymä ja
   Kevät sekä Torinon Leonardo. Pelissä on maksullisia lisäosia, joten Italian kulttuuriperintölaki
   (Codice dei beni culturali art. 107–108) on kaupallinen riski. Uffizille voidaan tehdä lupakysely myöhemmin.
   **Mona Lisa saa olla mukana** Commonsin PD-tiedostona: Louvre on Ranskassa, ja EU:n tekijänoikeusdirektiivin
   (2019/790) 14 artikla pätee, eli PD-teoksen jäljennös on vapaa.
2. **Oven museo ei ole teoksen museo.** Ovet avautuvat kaupunkilehdistä (Louvre, Uffizi, Prado, Rijksmuseum)
   siiven sisäänkäynteinä, ja jokaisen teoksen laatassa lukee oikea omistava museo.
3. **PDM 1.0 kelpaa.** Se kirjataan muodossa "PD (PDM 1.0)" (SMK:n valokset).
4. **Omakuvat.** Jos CC0-museosta (Met, NGA tai Rijks) löytyy PD-kaiverrusmuotokuva taiteilijasta, sitä
   käytetään. Muuten medaljongissa on nimi ja signeeraus.
5. **Layers of London ja NLS:** tarkistettava käsin ennen käyttöä.
6. Suunnitelma on hyväksytty, kun Natiiviseppä on tarkistanut luvut 6–7. **Toteutus alkaa vasta Fablen
   käskystä** (pariteetti ja elokuvalento ensin).

Avoimet: kertojan ääni on sama kuin ihmisen matkassa, ja Fable hyväksyy tekstit (luku 9). Avauskynnykseksi
ehdotetaan käyntiä Firenzessä, Roomassa tai Venetsiassa (kehittäjätilassa linssi on aina auki).

## 1. Linssi lyhyesti

Pelaaja astuu virtuaaliseen museoon, jonka siivet on jaettu aikakausittain: antiikki, renessanssi, barokki,
romantiikka, impressionismi ja moderni. Jokaisessa salissa on **opastettu kierros**, joka kestää 2–4
minuuttia. Kamera lentää teokselta toiselle elokuvamaisesti (KAMERA-AJOT: yhtenäinen spline ja tempon
dramaturgia), ja kertoja puhuu taustalla. Ilmaan piirtyvät musteella vuosiluvut, taidesuuntausten nimet,
taiteilijoiden omakuvat ja pienet karttapiirrokset. **Karttapiirrosta napauttamalla** kamera nousee
museosta pallolle teoksen syntykaupunkiin (Firenze, Rooma, Venetsia). Paluunappi tuo pelaajan takaisin
samaan kohtaan kierrosta.

Kierroksen voi **ohittaa**, jolloin pelaaja kulkee salissa vapaasti ja napauttaa teoksia. Kierroksen voi
myös **pysäyttää teoksen ääreen**: kamera jarruttaa pehmeästi lähimmän teoksen eteen, kertoja pitää
tauon, ja pelaaja voi zoomata yksityiskohtiin. Jatka-nappi palauttaa kierroksen samaan lauseeseen.

**Pilotti:** renessanssisali Firenze–Rooma–Venetsia, jossa on 20–30 maalausta ja 5 veistosta.

## 2. Rakenne

```
Museo
 ├─ Siipi (aikakausi): antiikki | renessanssi | barokki | romantiikka | impressionismi | moderni
 │   ├─ Sali (koulukunta/kaupunki): esim. renessanssi → "Firenze", "Rooma", "Venetsia"
 │   │   ├─ Teospaikat (seinä, jalusta): teos-id, koko metreinä, ripustuskorkeus
 │   │   ├─ Kierros: kameraketju + kertojan jaksot + ilmaan piirtyvät elementit
 │   │   └─ Ovi seuraavaan saliin
 │   └─ Sisäänkäynnit: kaupunkilehden ovi (Louvre → Pariisi, Uffizi → Firenze, Prado → Madrid,
 │      Rijksmuseum → Amsterdam) avaa siiven, jonka aikakausi sopii kaupunkiin
 └─ Aula: siipien valinta (aikajanan nauha, sama komponentti kuin ihmisen matkassa)
```

Pilotissa on **yksi pitkä sali kolmessa osassa** (Firenze → Rooma → Venetsia). Osien välissä on
kaariaukko, joten yksi jatkuva kamera-ajo riittää ilman latausta.

## 2A. Esitysmoottori ja lavat (Raamattu ESITYSMOOTTORI, omistaja 24.9. klo 12.4x)

Museo on ensimmäinen käyttäjä **modulaariselle esitysmoottorille**. Sama moottori ajaa kaikki kerrotut
kamera-ajot, ja **lava** määrää, missä ne tapahtuvat.

```
Esitys (data: esitys.json + kertomusmanifesti)
 ├─ Aikajana      kello, tauko/jatka, ohitus, hyppy jaksoon; sana-ankkurit (manifestin sanat → hetki)
 ├─ Kameraraita   avainkehykset {hetki, asento, käyrä, pito} → spline + tempon käyrä (Kamerakoreografia)
 ├─ Kertojaraita  mp3 + lause- ja sana-aikaleimat (LuentaSoitin, Esitys.SananHetki)
 ├─ Merkintäraita ilmaan piirtyvät: vuosiluku, suuntaus, omakuva, karttapiirros, raja/alue (luku 8)
 └─ Lava (ILava)  muuntaa lavan koordinaatit maailmaan ja lataa sisällön
      ├─ SALI    huoneet, teospaikat, valot; asento = paikka + katse metreinä salin koordinaateissa
      └─ PALLO   Cesium-pallo; asento = lat, lon, korkeus, suunta, kallistus; aikaleikkeet vuosittain
```

**Unityn omat paketit (ei kolmannen osapuolen):**

| Paketti | Käyttö |
|---|---|
| Cinemachine 3 | salin kameran ajo (CinemachineCamera + SplineDolly). Lavat eivät sekoitu kameratasolla: esitysaikajana jatkuu, ja kamera vaihtuu pergamentin tai pilvihäivytyksen takana (luku 7). Pallolla on edelleen PalloKierto (Cesium). |
| Splines | kameran rata (SplineContainer) avainkehyksistä; katseen rata erikseen |
| Timeline | raitojen synkka editorissa ja esikatselussa; ajonaikana esitys luetaan datasta (Timeline-asset rakennetaan esitys.jsonista, ei käsin) |
| TextMeshPro | merkintöjen tekstit (Natiivi-UI:n fonttipinta) |
| Addressables | salin moduulit (pilarit, holvit, materiaalit) ja siipien tyylit sovelluksen mukana; etäluettelo myöhemmin |
| glTFast | veistosmallit (GLB) ajonaikana ämpäristä |

**Tempo ja pehmeys:** Cinemachinen oma easing ei riitä omistajan KAMERA-AJOT-linjaukseen, joten dollyn
paikka splinillä lasketaan Kamerakoreografian käyristä (Kuminauha, Syöksy, Kiihtyvä, Tasainen). Timeline-klipin
kesto on vaiheen kesto, ja klipin sisäinen käyrä tulee Kamerakayrat.Arvo-kutsusta. Näin sama kirjasto ajaa
aloituslennon, linssien pysäkkiajot ja museon.

**Sisältö datana** (sisältöpaketti, Siirtosepän skeema `esitykset`):

```json
{ "id": "renessanssi-pilotti", "lava": "sali", "sali": "renessanssi",
  "kertoja": "esitykset/renessanssi-pilotti/kertomus-manifesti.json",
  "avainkehykset": [ { "t": 0, "paikka": [0, 8.5, -2], "katse": [0, 3, 10], "fov": 50, "kayra": "SyoksyKuminauha" },
                     { "sana": "Botticelli", "teos": "nga-botticelli-...", "etaisyys": 2.4, "kayra": "Kuminauha", "pito": 6 } ],
  "merkinnat": [ { "sana": "Firenze", "tyyppi": "karttapiirros", "kohde": "firenze" },
                 { "t": 38.2, "tyyppi": "vuosiluku", "teksti": "1482", "ankkuri": "nga-botticelli-..." } ] }
```

Avainkehys voi olla ajassa (`t`) tai sanassa (`sana`), jolloin se liikkuu äänitteen mukana, kun teksti
luetaan uudelleen. Teospaikkaan viittaava avainkehys (`teos`, `etaisyys`) lasketaan salin mitoista, eikä
koordinaatteja kirjoiteta käsin.

### Lava PALLO: kaupungin kasvu

Kaupungin laajuus vuosisatojen yli 3D-pallolla. Pilotit ovat **Rooma** ja **Lontoo**.

- **Aikaleikkeet:** 6–12 vuotta kaupunkia kohden. Laajuus on polygonina (muurit, rakennettu alue) tai
  hilana (HYDE). Leikkeiden välissä häivytetään ja "kasvatetaan" (reuna etenee SDF-maskilla).
- **Automaattinen aikajana:** vuosiluku ilmaan, väkiluku ja kertoja. Kamera kiertää hitaasti ja vaihtaa
  kulmaa jakson vaihtuessa (orbit 20–40°, korkeus 3–15 km, kallistus 35–60°), ja pito on pidempi, kun
  muutos on suuri.
- **Merkinnät:** muurit viivoina (Servius, Aurelianus, Leo IV; Londiniumin muuri), nimetyt vaiheet
  ("Keisarillinen Rooma", "Paavien Rooma", "Rooma pääkaupunkina 1871").
- **Datalähteet:** luku 2B.

## 2B. Rooman ja Lontoon kasvun datalähteet

Täysi selvitys lisensseineen ja varmennuksineen on liitteessä **linssi-kaupungin-kasvu-lahteet-20260924.md**.
Pohjana ovat datalähteet-raportin luku 2.16 sekä HYDE, Reba ym., Layers of London ja Commons.
Lisenssisääntö (omistaja 24.9.): PD, CC0, CC BY, ODbL ja jakoehdolliset kelpaavat, NC ei kelpaa.

| Lähde | Mitä antaa | Lisenssi (varmennettu 24.9.) | Käyttö |
|---|---|---|---|
| **Reba, Reitsma & Seto 2016** (Figshare: Chandler, Modelski) | väkiluvut pisteinä 3700 eaa.–2000 (Rooma 500 eaa.–1975, Lontoo 100 eaa.–1975) | **CC BY 4.0** (SEDACin uudelleenjulkaisu on NC, sitä ei käytetä) | väkilukukäyrä ja ilmaan piirtyvät luvut |
| **HYDE 3.2** (DANS) | kaupunkiväestö ja rakennettu ala 5′-hilana 10000 eaa.–2017 | **CC0** (**HYDE 3.3 on CC BY-NC-SA → hylätty**) | karkea taustahila leikkeiden väliin |
| **GHSL Built-up R2023A** (JRC) | rakennettu ala 100 m, 1975–2030 | **CC BY 4.0** | nykyiset leikkeet |
| **OSM** | Aurelianuksen muuri valmiina relaationa 10129640; Serviuksen ja Londiniumin muurit pirstaleisina | **ODbL** | muuriviivat ja Rooman keisarikauden raja |
| **Zenodo 20800572** | Lontoon 1,3 milj. rakennuksen jalanjäljet OS 1:1056 -kartoista 1891–96 | **CC BY 4.0** | Lontoon 1890-luvun raja alpha-shapena |
| **Commons PD-kartat** | Nolli 1748 (14 000 × 11 956 px), Platnerin Rooman kasvu, Lontoo 1300, 1381, 1815 (8534 × 5571 px) ja Vertuen Agas 1737 | **PD** (Lontoo c.1560 CC BY-SA, Map of ancient Rome CC0) | itse digitoitavat leikkeet |
| Pleiades / DARE | antiikin paikat ja tiet | CC BY 3.0 / CC BY-SA 3.0 | nimet ja tiet taustaksi |
| **Layers of London, NLS** | georeferoidut historialliset kartat | **ei varmennettu** (bottiesto); osa NC tai in-copyright | vain käsin tarkistetut kerrokset |
| MoEML Agas | 1561-kartta | CC BY-NC-SA → **hylätty**; tilalle Vertue 1737 (PD) | – |

**Aikaleikkeet:**

| Rooma | Lähde | Lontoo | Lähde |
|---|---|---|---|
| n. 750 eaa. Palatinus | arvio (merkitään arvioksi) | n. 200 jaa. Londinium | OSM-palat + digitointi |
| n. 378 eaa. Serviuksen muuri | OSM + Map of ancient Rome (CC0) | 1300 | Commons PD, digitointi |
| n. 200 jaa. huippu (1,2 milj.) | **OSM 10129640** valmis | 1560 | Vertue 1737 (PD), digitointi |
| 1377 pohja (17 000) | väkiluku; alue Nollin ja Platnerin mukaan | 1815 | Commons PD 8534 px, digitointi |
| 1748 | **Nolli** (PD), digitointi | 1891–96 | **Zenodo**, laskettu |
| 1871 pääkaupunki | HYDE 3.2 + digitointi | 1950 | HYDE 3.2 |
| 2020 | **GHSL** | 2020 | **GHSL** |

Valmiita leikkeitä on Roomalle 3 ja Lontoolle 3 (HYDE taustana). Muut digitoidaan georeferoiduista
PD-kartoista (QGIS), ja digitoitu polygoni julkaistaan lähteen lisenssillä. Rooma on pilotti (Fablen järjestys),
ja Lontoo tulee monistusvaiheessa.

## 3. Opastettu kierros

### 3.1 Tilakone

```
Saapuminen ──► Kierros(teos i) ──► … ──► Loppukuva ──► Vapaa
     │            │   ▲                                   ▲
     │            ▼   │                                   │
     │         Pysäytetty (teoksen ääressä) ──────────────┤
     └──────────── Ohita ─────────────────────────────────┘
```

- **Kierros(i):** kameravaihe teokselle i, pito ja kertojan jakso i. Kamera ja kertoja synkronoidaan
  **sana-aikaleimoilla** (sama kertomusmanifesti kuin ihmisen matkassa: Esitys.SananHetki). Esimerkiksi
  omakuva piirtyy, kun kertoja sanoo taiteilijan nimen.
- **Pysäytetty:** napautus tai "Pysähdy"-nappi. Kamera jarruttaa kuminauhamaisesti lähimpään teospaikkaan
  (Kayra.Kuminauha), ja kertoja pitää tauon (LuentaSoitin.Tauko). Vetäminen panoroi ja nipistys zoomaa
  teoksen yksityiskohtiin, rajattuna teoksen kehykseen.
- **Vapaa:** kamera kiertää hitaasti salin keskiakselia. Teoksen napautus lentää kameran teoksen eteen,
  ja laatta (nimi, taiteilija, vuosi, museo, lisenssi) aukeaa.
- **Karttapiirros → pallo:** linssi jää taustalle (tila säilyy), kamera nousee "katon läpi" pallolle ja
  lentää kaupunkiin. Takaisin-nappi palaa saliin samaan vaiheeseen.

### 3.2 Kamera salissa (Linssiseppä)

Nykyinen Kameraketju on pallon koordinaateissa (lat, lon, korkeus). Salissa tarvitaan **3D-asento**:
paikka, katseen kohde ja näkökenttä. Ehdotus: `Salivaihe { Paikka, Katse, Fov, KestoS, Kayra, Parametri, Pito }`
Ydin/Kamera-kirjastoon samalla Kohta(s)-logiikalla. Paikat interpoloidaan **centripetaalisella
Catmull-Rom-splinillä** läpi kaikkien vaiheiden, jotta vaihtojen kohdalle ei synny kulmaa, ja
aikaparametrina käytetään vaiheen käyrää (Pehmea, Kuminauha, Syoksy…). Katse interpoloidaan samalla
splinillä erikseen, jolloin kamera "kääntää päätään" ennen kuin keho liikkuu, kuten elokuvan kamera-ajossa.

Tempon dramaturgia teosta kohden (Raamattu KAMERA-AJOT, omistaja 24.9.):

| Vaihe | Kesto | Käyrä | Tarkoitus |
|---|---|---|---|
| Lähestyminen | 1,5–2,5 s | SyoksyKuminauha | nopea lähtö, kuminauhamainen jarrutus teoksen eteen |
| Pito ja panorointi | 4–10 s | Tasainen, hyvin hidas (Ken Burns 3–6 % teoksesta) | kertoja puhuu, yksityiskohta |
| Irtautuminen | 1–1,5 s | Kiihtyva | kiihtyy pois, jatkuu seuraavan vaiheen vauhtiin |
| Kulku | 1,5–3 s | Tasainen | sivuttaisliuku seinän vierellä, teokset ohi |
| Veistoksen kierto | 5–8 s | Pehmea (kaari 60–120°) | kiertää jalustan, valo liukuu marmorilla |

### 3.3 Pilotin käsikirjoitus (luonnos, 3 min 20 s)

| Aika | Paikka | Kamera | Kertoja (aihe) | Ilmaan |
|---|---|---|---|---|
| 0:00 | aula → Firenzen kaari | laskeutuu kattoikkunasta, SyoksyKuminauha | Firenze 1400-luvulla, kilta ja pankki | "FIRENZE · 1400" + karttapiirros Toscanasta |
| 0:18 | Fra Angelico / Filippo Lippi | lähestyminen, pito | perspektiivi ja kulta | "Varhaisrenessanssi" |
| 0:30 | Leonardo: Ginevra de' Benci → Mona Lisa | kulku, lyhyt pito kummallakin | Leonardo ja sfumato | Leonardon muotokuva (Vasari 1568, Rijks) |
| 0:40 | Botticelli: Tietäjien kumarrus | Ken Burns kasvoihin | Medicit ja antiikin paluu | Botticellin muotokuva (Vasari-sarja, Rijks); "Medici" |
| 1:00 | Michelangelo: Bacchus (valos) | kierto 90° | nuori Michelangelo ja antiikki | Michelangelon mitali (Leoni 1560) |
| 1:15 | kaari Roomaan | kulku, kiihtyvä | paavit kutsuvat taiteilijat | "ROOMA · 1508" + karttapiirros |
| 1:30 | Rafael: Alban Madonna | pito | harmonia ja sommittelu | "Korkearenessanssi", Rafaelin muotokuva (Bonasone, Rijks) |
| 1:55 | Michelangelo: Mooses (valos) | kierto 120° | Sikstiinan kappeli (mainitaan) | karttapiirros → Rooma (napautettava) |
| 2:15 | kaari Venetsiaan | kulku, valo lämpenee | meri, kauppa ja väri | "VENETSIA · 1500" |
| 2:30 | Bellini ja Tizian: Jumalten juhla | pito | öljyväri ja valo | "Venetsialainen koulu", Bellinin mitali |
| 2:50 | Tizian: Venus peilin edessä | Ken Burns | väri ennen piirustusta | Tizianin muotokuva (Carraccin kaiverrus) |
| 3:10 | salin pää | irtautuminen ylös, hidas kierto | päätös: tie barokkiin | ovi "Barokki →" |

Tarkat teokset valitaan luvun 4 varmennetusta luettelosta.

## 4. Teosluettelo (pilotti)

Täysi varmennettu luettelo (ID:t, IIIF-osoitteet, resoluutiot ja lisenssit rivikohtaisesti) on liitteessä
**linssi-taidemuseo-teosluettelo-20260924.md**. Kaikki rivit on varmennettu 24.9.2026 museoiden avoimista
rajapinnoista. Italialaisten museoiden kuvia ei ole käytetty.

### 4.1 Maalaukset: 28, kaikki National Gallery of Art, Washington (openaccess = CC0)

| Osa | Teokset |
|---|---|
| **Firenze (9 + Mona Lisa)** | Fra Angelico: Nöyryyden Madonna · Filippo Lippi: Madonna ja lapsi · Botticelli: Tietäjien kumarrus, Giuliano de' Medici · Filippino Lippi: Nuorukaisen muotokuva · Ghirlandaio: Madonna ja lapsi · Piero di Cosimo: Marian ja Elisabetin kohtaaminen · Bronzino: Nuori nainen ja poikansa · **Leonardo: Ginevra de' Benci** (ainoa Leonardo Amerikassa) |
| **Rooma (8)** | Perugino: Madonna ja lapsi, Lorenzo di Credi · **Rafael: Alban Madonna**, Bindo Altoviti, Pyhä Yrjö ja lohikäärme · Sebastiano del Piombo: Kardinaali Sauli ja kaksi maantieteilijää, Humanistin muotokuva · Signorelli: Ristiinnaulitseminen |
| **Venetsia (11)** | **Bellini ja Tizian: Jumalten juhla** · Bellini: Venetsialainen aatelismies · **Tizian: Venus peilin edessä**, Ranuccio Farnese · Giorgione: Pyhä perhe · Carpaccio: Madonna ja lapsi · Crivelli: Valtaistuimen Madonna · Tintoretto: Doge Mocenigo perheineen · Veronese: Mooseksen löytyminen · Lotto: Pyhä Katariina · Mantegna: Miehen muotokuva |

Resoluutio riittää kaikkialla: pienin on 4758 × 7311 px (Bellini), ja suurin osa on 10 000–39 000 px.
Yksityiskohtatasot (luku 5) voidaan siis tehdä 8192 px:iin asti. Perugino, Signorelli, Crivelli, Lotto
ja Mantegna on sijoitettu saliin koulukunnan mukaan, ei maalauspaikan mukaan. Karttapiirros vie silti
oikeaan syntykaupunkiin (liitteen alaviitteet).

### 4.1b Mona Lisa (Fablen päätös 1)

Leonardo da Vinci: **Mona Lisa**, n. 1503–1519, Firenze, Louvre. Commons: *File:Mona Lisa, by Leonardo da Vinci,
from C2RMF retouched.jpg*, 7479 × 11146 px, **Public domain** (varmennettu 24.9.2026 Commons API, extmetadata).
Kuva on rajattu ja tasoitettu C2RMF:n kuvasta. Mona Lisa sijoitetaan Firenzen osaan Ginevra de' Bencin viereen.
Laatassa lukee "Musée du Louvre, Pariisi · kuva C2RMF / Wikimedia Commons, PD".

### 4.2 Veistokset: 5, SMK Kööpenhamina, kipsivalosten 3D-skannaukset (PD (PDM 1.0))

Michelangelo: **Mooses**, **Bacchus**, **Kapinoiva orja**, **Kuoleva orja** ja **Ylösnoussut Kristus**.
Tiedostot ovat STL-muodossa: pieni versio noin 20 Mt ja suuri 45–173 Mt. Ne muunnetaan GLB:ksi
(meshopt, 150–300 k kolmiota) ja paistetaan AO- ja normaalikartoiksi. Laatassa lukee "kipsivalos, SMK".
**Aukko:** Firenzen ja Venetsian koulukunnan veistoksia (Donatello, Verrocchio) ei löytynyt avoimena
3D-mallina. Pilotissa kaikki viisi ovat Michelangeloa, ja ne sijoitetaan Rooman osaan (Mooses, Kristus,
orjat) sekä Firenzen osaan (Bacchus). Lisähaku Smithsonian 3D:stä myöhemmin.
Lisenssi kirjataan muodossa "PD (PDM 1.0)" (Fable 24.9.).

### 4.3 Taiteilijoiden muotokuvat: 17 taiteilijaa

- **NGA (CC0):** Giovanni ja Gentile Bellini (Gambellon aikalaismitalit), Michelangelo (Leone Leonin
  mitali 1560 ja Bonasonen kaiverrus 1546) ja Tizian (Agostino Carraccin kaiverrus 1587). Lisäksi AIC:n
  kaiverrus Tizianin omakuvan mukaan.
- **Rijksmuseum (CC0):** Rafael (Bonasonen kaiverrus, 5455 × 7091 px), Leonardo, Botticelli, Mantegna,
  Perugino, Giorgione, Carpaccio, Fra Angelico, Filippo Lippi, Ghirlandaio, Piero di Cosimo, Sebastiano
  del Piombo ja Signorelli. Useimmat ovat Vasarin *Vite* -teoksen (1568) puupiirrosmuotokuvia, joten ne
  muodostavat yhtenäisen sarjan, joka sopii medaljonkeihin. Veronesesta ja Tintorettosta on
  1600-luvun kaiverrukset.
- **Ei avointa muotokuvaa:** Bronzino, Lotto ja Crivelli. Heidän medaljongissaan on nimi ja signeeraus
  (Fablen päätös 4).

Tunnisteet, IIIF-osoitteet ja resoluutiot ovat liitteen osioissa C ja E. Kuvattu henkilö on varmennettu
Rijksmuseumin tietueen represents-kentästä, joten esimerkiksi Ridolfo Ghirlandaion ja Eusebio Crivellin
muotokuvat on hylätty.

### 4.4 Ikonit, jotka jäävät kuvina pois

Venuksen syntymä, Kevät (Uffizi), Sikstiinan kappeli (Vatikaani), Viimeinen
ehtoollinen (Milano), Vitruviuksen mies ja Tempesta (Accademia) sekä Assunta (Frari). Syyt ovat liitteessä.
Kertoja mainitsee ne, ja karttapiirros vie niiden kaupunkiin pallolle.

## 5. Kuvat: resoluutio ja striimaus

- **Lähde:** museon IIIF-palvelin tai avoin kuvatiedosto → `tools/taidemuseo/hae.mjs` (uusi) tallentaa
  alkuperäisen NAS:iin (`/Volumes/.../linssiseppa/taidemuseo/`). Kuvia ei viedä repoon.
- **Tasot:** jokaisesta teoksesta on kaksi tasoa.
  - **Seinä:** pitkä sivu 2048 px, ASTC 6×6 (≈ 3,6 bit/px) eli noin 1,9 Mt GPU-muistia teosta kohden.
    Tämä näkyy kulussa ja pidossa.
  - **Yksityiskohta:** 4096–8192 px 512 px:n ruutuina (ASTC 6×6), ladataan vain pysäytetylle teokselle
    ja Ken Burns -kohteelle. Ruudut ovat samaa mallia kuin kartan laatat.
- **Ämpäri:** `sisalto/1/vN/taidemuseo/<siipi>/<teos-id>/{seina.astc, yks/<z>/<x>_<y>.astc, laatta.json}` (raaka ASTC + otsake, luku 6.4),
  ja välimuisti on laitteella kuten muilla linssiaineistoilla. Siirtoseppä lisää skeemaan kokoelman
  `taidemuseo` (teos: id, nimi fi/en, taiteilija, vuosi, kaupunki lat/lon, museo, objekti-id, lisenssi,
  lähde-URL, koko cm, kuvasuhde, tasot).
- **Esilataus:** kierroksen aikana ladataan seuraavat 3 teosta (seinätaso) ja yksi yksityiskohtataso
  eteenpäin. Salin avaus odottaa ensimmäiset 4 teosta. Muut näytetään paperinvärisellä pohjalla, joka
  häivytetään kuvaksi.
- **Veistokset:** glTF/GLB, Draco- tai meshopt-pakattu, 150–300 k kolmiota, 2048 px:n AO- ja
  normaalikartta, 3–8 Mt kukin.
- **Laatta ja attribuutio:** jokaisessa teoksessa näkyy museon nimi ja lisenssi (CC0 ei vaadi mainintaa,
  mutta käytämme sitä). CC BY -malleissa tekijä on laatassa ja lähdeluettelossa.

## 6. Sali (Natiiviseppä; tarkistettu 24.9.2026)

*Natiivisepän korjaukset Linssisepän lähtöehdotukseen on merkitty sanalla **Korjaus**. Tekniikka on sama
kuin muussa natiivissa: Unity 6.3, URP, Metal, iOS/iPadOS; ei kolmannen osapuolen ajonaikaisia paketteja.*

### 6.1 Rakennus: parametrit JSONissa, sali leivotaan editorissa

- **Korjaus: sali ei synny ajonaikana.** Valokarttaa ei voi paistaa laitteella, ja ajonaikainen geometria
  pakottaisi reaaliaikavaloihin. Siksi `sali.json` (mitat, pilasterijako, holvi, lattiakuvio, tyyli, osat,
  teospaikat) luetaan **editoriskriptillä** (Rakennus.LuoSali, kuten Rakennus.LuoPallo), joka kokoaa salin
  modulaarisesta sarjasta (seinäjakso, pilasteri, kaari, holvisegmentti, kasettilaatta, kattolyhty, lattiaruutu,
  jalusta, kehys), paistaa valokartat ja heijastuskoettimet ja tallentaa siiven **Addressables-kimpuksi**.
  "Siipi on dataa" pätee edelleen: uusi siipi = uusi `sali.json` + ajo editorissa, ei mallinnusta.
- **Mitat (pilotti):** yksi galleria kolmessa osassa, kukin noin 24 × 11 m, korkeus 9 m (holvin laki),
  kaariaukot osien välissä. Teospaikat ovat `sali.json`issa seinäjaksojen mukaan (jakso, korkeus, leveys),
  joten kierroksen avainkehykset viittaavat teospaikkaan, eivät koordinaatteihin (luku 2A).
- **Geometria:** koko sali ≤ 250 k kolmiota, ≤ 120 piirtokutsua mistä tahansa kulmasta (SRP Batcher, sama
  materiaali per osa, GPU-instanssit pilastereille ja kasettilaatoille). Yksityiskohta normaalikartoista.
- **Tyyli siivittäin** (ennallaan): Firenze pietra serena ja kalkkivalkoinen, Rooma lämmin travertiini,
  Venetsia punainen damasti ja terrazzo. **Materiaalit:** ambientCG ja Poly Haven (CC0; marmori, travertiini,
  terrazzo, kipsi, kulta, puu) sekä omat Blender-proseduraaliset (damasti, kasetit, kehysten profiilit),
  kaikki lisenssiporttiin ja Tietoja.cs:ään. Tekstuurit ASTC 6×6, 1024–2048 px.
- **Kehykset:** proseduraalinen profiili (8 profiilia Blenderistä) teoksen mittojen mukaan, kultaus
  normaali- ja maskikartalla. Teoksen kuva on kehyksen sisällä oma quad (ei valokartassa).

### 6.2 Valaistus

- Kattolyhdyistä pehmeä päivänvalo **paistettuna** (Progressive CPU -paistin editorissa; GPU-paistin Metalilla
  kaatoi Blenderin Cyclesin 24.9., joten CPU myös tässä), valokartat ≤ 2 × 2048² ASTC per osa.
- **Teosten kohdevalot:** ei reaaliaikaisia spotteja (iPhonen URP Forward+ kestäisi, mutta 30 teosta on
  liikaa): kohdevalon valokeila on valokartassa seinällä, ja teoksen oma quad saa **valokeilamaskin**
  (varjostin: keila, reunahäive, lämpötila 3000 K) — sama ilme ilman valon hintaa.
- **Veistokset** (GLB ajonaikana, eivät voi olla valokartassa): valokoettimet (Light Probe Group, paistettu)
  + AO-kartta + **yksi** reaaliaikainen suunnattu valo, jonka suunta seuraa lähintä kattolyhtyä; se antaa
  "valo liukuu marmorilla" -kiillon kierrossa. Varjot veistoksesta lattialle: pehmeä paistettu tahra
  (kontaktivarjo-quad), ei varjokarttaa.
- **Heijastukset:** yksi paistettu heijastuskoetin per osa (box projection) lattian kiillolle. URP:ssa ei
  ole SSR:ää; tasoheijastus olisi toinen piirto, joten ei.

### 6.3 Filmiefektit

Sama **filmiefektipino** kuin elokuvalennossa (erä 3, URP Volume): lämmin LUT (Color Lookup), Tonemapping
Neutral, lievä Bloom valoaukoista, Film Grain, Vinjetti. Salin profiili on oma Volume, lennon oma.
- **Syväterävyys pidossa:** iPhonella Gaussian DoF (halpa), iPad Pro M5:llä Bokeh. Fokus teoksen
  etäisyyteen kameraraidalta.
- **Korjaus: liike-epäterävyys pois oletuksena** (URP Camera Motion Blur on mobiililla kallis ja sotkee
  tekstit); kulun vauhdin tuntu syntyy tempon dramaturgiasta. Kokeillaan vasta iPad Prolla, kun budjetti on mitattu.
- **Budjetti:** pino ≤ 3 ms iPhonella (sama raja kuin lennossa), mitataan Laitetestaajan sulavuusportilla.
- Vähennetty liike (iOS Reduce Motion): ei DoF-siirtymiä, lyhyemmät ajot, ristihäivytykset.

### 6.4 Muisti ja lataus

| Osa | Budjetti | Huom. |
|---|---|---|
| Salin kimppu (geometria, materiaalit, valokartat, koettimet) | ≤ 60 Mt | Addressables, sovelluksen mukana tai ämpäristä ensimmäisellä avauksella |
| Teokset seinätasolla | ≤ 60 Mt | 30 × ~1,9 Mt (2048 px ASTC 6×6 + mipit) |
| Yksityiskohtaruudut | ≤ 40 Mt | LRU, vain pysäytetty teos + Ken Burns -kohde |
| Veistokset | ≤ 40 Mt | 5 × ≤ 8 Mt, vain näkyvä osa ladattuna |
| **Yhteensä museo** | **≤ 200 Mt** | + pelin pohja; iPhonen jetsam-raja huomioitava (4 Gt:n laitteilla ~2 Gt) |

- **Korjaus: kuvien muoto.** Ämpärissä raaka ASTC-lohkodata + pieni otsake (`seina.astc`, ei KTX2):
  `Texture2D.LoadRawTextureData(TextureFormat.ASTC_6x6)` + `Apply(false, makeNoLongerReadable: true)`, jolloin
  CPU-kopio vapautuu heti eikä tarvita KTX-pakettia. Latauksen purku ja luku taustasäikeessä, GPU-siirto
  enintään 2 kuvaa kehyksessä (ei yli 16 ms kehyksiä, luku 11 vaihe 7).
- **Pallo museon ajaksi:** pallon kamera pois, Cesium-tilesetin päivitys pysäytetään (`suspendUpdate`),
  laattapalvelin tauolle, tilesetin välimuisti pienennetään 64 Mt:iin 4 Gt:n laitteilla. Paluussa pallo
  palaa samaan kamera-asentoon ja välimuisti täyttyy uudelleen taustalla.
- Salin kimppu vapautetaan (Addressables.Release + Resources.UnloadUnusedAssets), kun museosta palataan
  pelin pallolle; karttapiirroksen välikäynnillä pallolla sali jää muistiin (tila säilyy, luku 3.1).

## 7. Siirtymä pallolta saliin ja takaisin (Natiiviseppä + Linssiseppä; tarkistettu 24.9.2026)

**Korjaus: lavat eivät sekoitu kameratasolla.** Pallon kamera (PalloKierto, Cesiumin ECEF-georeferenssi) ja
salin kamera (Cinemachine, salin metrit) eivät voi interpoloitua toisiinsa mielekkäästi, joten leikkaus
piilotetaan **pergamenttihäivytykseen**. Luvun 2A "sekoitus lavojen välillä" tarkoittaa tätä: sama
esitysaikajana jatkuu, kamera vaihtuu pergamentin takana.

**Sisään (kaupunkilehden ovi, noin 2,4 s):**
1. Oven napautus: salin kimppu ja 4 ensimmäistä teosta ovat jo latauksessa siitä hetkestä, kun kaupunkilehti
   avautui ovellisessa kaupungissa (esilataus, ei odotusta napautuksen jälkeen).
2. Kamera laskeutuu kaupunkiin (Kamerakoreografia: SyoksyKuminauha kohti museon lat/lon, 1,2 s, kallistus
   nousee 60°:een) — ei rakennusta, vaan liike antaa "sukelluksen" tunnun.
3. Pergamentti häivyttyy ruudun päälle (0,35 s, UI-kerros), kertoja ja pallon äänimaisema vaimenevat.
4. Pergamentin takana: salin kohtaus additiivisena (`LoadSceneAsync` jo valmiina, aktivointi tässä), pallo
   jäädytetään (6.4), salin kamera ensimmäiseen avainkehykseen.
5. **Musteviivapiirto (0,8 s):** koko ruudun URP-renderöintiominaisuus (ScriptableRendererFeature) piirtää salin
   reunat syvyys- ja normaalipuskurista seepiamusteena pergamentille ja häivyttää sitten täysväriin; viiva
   paljastuu alhaalta ylös kohinamaskilla (sama käsiala kuin luvun 8 elementeissä). Kamera liikkuu jo
   piirron aikana (Kuminauha ensimmäiseen teokseen), jolloin ruutu ei seiso.
6. Jos esilataus ei ole valmis, pergamentti pysyy ja siinä piirtyy mustekynän kiemura, kunnes sali on valmis.

**Ulos (Takaisin-nappi):** käänteinen: sali → musteviivat → pergamentti → pallo samaan kamera-asentoon, josta
lähdettiin, ja kamera nousee kaupungista hitaasti (Jarruttava).

**Karttapiirros → pallo ja takaisin:** salin kamera nousee kattolyhdyn läpi (Kiihtyva, 1,0 s), ruutu valkenee
pilveksi (valkoinen häivytys, ei pergamentti), pallo tulee näkyviin pilvien yläpuolella kohdekaupungin
yllä (LentoPilvet ja Aurinko kuten lennossa) ja kamera laskeutuu kaupunkiin Kamerakoreografialla.
Takaisin-nappi: nousu pilviin → valkoinen → kamera laskee kattolyhdystä saliin samaan kierroksen kohtaan.

**Ehdot:** siirtymän aikana ei yli 33 ms kehyksiä (kimppu ja kohtaus ladattu etukäteen, kuvasiirrot aikaviipaloituna,
`QualitySettings.asyncUploadTimeSlice`), kertoja tauolla (LuentaSoitin.Tauko) ja jatkaa samasta lauseesta;
Reduce Motion: ei syöksyä, pelkkä pergamenttihäivytys.

## 8. Ilmaan piirtyvät elementit

- **Tyyli:** musteviiva ja seepia, samaa perhettä kuin pelin kartta ja isoisän päiväkirja. Kaikki piirtyy
  vetona (viivan paljastus SDF-maskilla, 0,6–1,2 s) ja häipyy pois, kun kertoja siirtyy seuraavaan.
- **Vuosiluvut:** isot antiikvanumerot teoksen vieressä, kevyt varjo ja pieni syvyysero (parallaksi),
  kun kamera liikkuu.
- **Taidesuuntaukset:** kalligrafinen käsiala ja alleviivaus.
- **Omakuvat ja muotokuvat:** soikea kaiverrusmedaljonki (kuva seepiaksi sävytettynä), jossa on nimi ja elinvuodet.
  Jos avointa muotokuvaa ei ole (Bronzino, Lotto ja Crivelli, luku 4.3), medaljongissa on nimi, elinvuodet ja
  musteella piirretty typografinen signeeraus.
- **Karttapiirrokset:** pieni käsinpiirretty Italia ja reitti Firenze–Rooma–Venetsia, jossa nykyinen
  kaupunki on punaisella. Piirros on napautettava ja vie pallolle.
- **Paikka 3D-tilassa:** elementit ovat kameraan päin kääntyviä tasoja teoksen vieressä, eivät
  ruutu-UI:ta, joten ne kuuluvat kuvaan. Tekstit piirtää Natiivi-UI:n fonttipinta (TMP) Linssit-kerroksessa.

## 9. Kertojan tekstit (luonnos, Fable hyväksyy)

Tekstit kirjoitetaan TTS:lle (noin 130 sanaa minuutissa, eli 3 min 20 s on noin 430 sanaa). Luonnos
tehdään, kun teosluettelo on lukittu. Rakenne on kolme 60–70 sekunnin jaksoa (Firenze, Rooma ja Venetsia)
sekä avaus ja päätös. Jokaisessa jaksossa on 3–4 teosta, yksi taiteilijan nimi omakuvan ankkurina ja yksi
kaupungin nimi karttapiirroksen ankkurina.

## 10. Siipien monistuskaava

Jokainen siipi on dataa, ei koodia:

1. **Teosluettelo** (agentti varmentaa lisenssit rajapinnoista) → `taidemuseo/<siipi>/teokset.json`.
2. **Salin parametrit** (mitat, tyyli, osat) → `sali.json` (Natiivisepän skeema).
3. **Kierros** (vaiheet: teos-id, kesto, käyrä, ilmaan piirtyvät elementit ja sana-ankkurit) → `kierros.json`.
4. **Kertojan teksti** (Fable hyväksyy) → TTS → kertomusmanifesti (aikaleimat).
5. **Kuvien leikkaus** (tools/taidemuseo) → ämpäri. Siirtoseppä nostaa paketin versiota.

Arvio siiven työmäärästä pilotin jälkeen on 1–2 päivää, suurin osa teosluettelossa ja tekstissä. Järjestys
pilotin jälkeen: barokki (Rijksmuseum CC0: Rembrandt, Vermeer), impressionismi (AIC ja NGA CC0),
antiikki (Met CC0 ja veistosmallit), romantiikka ja moderni. Modernissa tekijänoikeudet rajaavat
teoksia 1950-luvulta alkaen.

## 11. Toteutusvaiheet ja työnjako

Järjestys (Fable 24.9.): pariteetti ja elokuvalento → **renessanssisali** → **Rooman kasvu** (lava PALLO) →
monistus (siivet, kaupunkien omat museot, Lontoon kasvu).

| Vaihe | Sisältö | Kuka |
|---|---|---|
| 1 | Salivaihe ja spline (Ydin/Kamera), kierroksen tilakone, testit | Linssiseppä |
| 2 | Proseduraalinen sali, valot, efektipino, muistibudjetti | Natiiviseppä |
| 3 | Kuvien haku ja leikkaus, skeema `taidemuseo` | Linssiseppä + Siirtoseppä |
| 4 | Ilmaan piirtyvät elementit, laatta ja ohjaimet (Pysähdy, Ohita, Jatka, Takaisin) | Linssiseppä + Natiivi-UI |
| 5 | Kertojan teksti → TTS → manifesti | Fable (teksti), TTS-putki kuten ihmisen matka |
| 6 | Ovet kaupunkilehdistä, siirtymät pallon ja salin välillä | Natiivi-UI + Natiiviseppä |
| 7 | Laitetesti: sulavuus (ei yli 16 ms kehyksiä kierroksella), muisti ja kuvasarja | Linssiseppä + Laitetestaaja |
