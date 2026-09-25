# Taidemuseo-linssin pilotin teosluettelo (liite, 24.9.2026)

*Liite suunnitelmaan linssi-taidemuseo-suunnitelma-20260924.md. Sonnet-agentti varmensi rivit museoiden avoimista rajapinnoista, ja Linssiseppä tarkisti pistokokein NGA 26 (IIIF 24180×24180), SMK KAS83 (PDM 1.0, 3D) ja AIC 55006 (is_public_domain).*


Varmennettu teosluettelo, koostettu suoraan museoiden avoimista rajapinnoista curlilla.
Verifiointipäivä kaikille riveille, ellei toisin mainita: **2026-09-24**.

**Lähteet ja tunnisteet, joita käytettiin:**
- National Gallery of Art (NGA), Washington — avoin data ladattu kokonaisuudessaan
  `objects.csv` (82 MB) ja `published_images.csv` (89 MB) osoitteesta
  `https://raw.githubusercontent.com/NationalGalleryOfArt/opendata/main/data/`.
  Kenttä `openaccess=1` julkaistussa kuvassa = NGA:n oma CC0-luokitus (ks. myös
  repon `README.md`: "the National Gallery of Art waives any copyright... under
  the Creative Commons Zero designation"). IIIF-perusosoite muodosta kuva:
  `{iiifurl}/full/full/0/default.jpg` (palvelin tukee `sizeAboveFull`, eli täysi
  natiiviresoluutio on saatavilla).
- Art Institute of Chicago (AIC) API `api.artic.edu/api/v1/artworks/<id>`,
  kenttä `is_public_domain=true`; AIC:n oma lisenssiteksti: data CC0, kuvat
  julkisdomeenissa oleville teoksille vapaasti käytettävissä. IIIF:
  `https://www.artic.edu/iiif/2/{image_id}/full/843,/0/default.jpg` (tai suurempi koko).
- Statens Museum for Kunst (SMK), Tanska, `api.smk.dk/api/v1/art?object_number=...`,
  Kongelige Afstøbningssamling (kipsivalokset). Kentät `has_3d_file=true` ja
  `files_3D[].url` (STL-lataus), `rights` = Public Domain Mark 1.0
  (`creativecommons.org/publicdomain/mark/1.0/`). **Huom:** PDM 1.0 ei ole
  sanatarkasti CC0, mutta SMK julkaisee sen itse avoimena "ei tunnettuja
  tekijänoikeusrajoituksia" -merkintänä samalla tavalla kuin CC0-aineistonsa;
  merkitty jokaiseen riviin tarkasti.
- The Met ja Cleveland Museum of Art -rajapintoja käytettiin hakuun, mutta niistä
  ei löytynyt riittävän varmoja/uusia osumia, joita ei jo ollut katettu NGA:lla,
  AIC:lla tai SMK:lla (ks. tarkempi huomio osiossa C).
- Rijksmuseum ja Paris Musées: ei käytetty — ei löytynyt avainvapaata pääsyä
  tässä istunnossa riittävän nopeasti; ei merkittävää aukkoa, koska NGA+AIC+SMK
  kattoivat kaiken tarvitun.
- **Italian museoita (Uffizi, Vatikaani, Accademia, Borghese, Bargello, Brera...)
  ei ole käytetty kuvalähteenä missään rivissä** — Codice dei beni culturali
  art. 107–108 -riski on kirjattu osioon D aina kun keskeinen teos on vain
  niiden hallussa.

---

## A) Maalaukset (28 kpl, kaikki National Gallery of Art, Washington)

Kaikki tämän osion teokset varmennettu NGA:n `objects.csv`- ja
`published_images.csv`-tiedostoista, `openaccess=1`. Kuva-URL on IIIF-perusosoite;
lisää perään `/full/full/0/default.jpg` täyteen resoluutioon.

**Huom koulukunta vs. maalauspaikka:** "Koulukunta" on taidehistoriallinen
ryhmittely (mihin kolmesta salin vyöhykkeestä teos kuuluu tyylillisesti/tilaajan
kautta), "Kaupunki" on parhaan tiedon mukainen todellinen syntypaikka. Nämä eivät
aina ole sama kaupunki (esim. Perugino ja Signorelli kuuluvat rooman/keski-Italian
piiriin, mutta yksittäinen teos on voitu maalata Firenzessä tai Umbriassa) — poikkeamat
on merkitty huomautuksella.

### Firenze

| Taiteilija | Teos (EN / FI-ehdotus) | Vuosi | Kaupunki (lat/lon) | Museo | ID | Lisenssi | Kuva-URL (IIIF-pohja) | Maks. resoluutio | Varmennettu |
|---|---|---|---|---|---|---|---|---|---|
| Fra Angelico | The Madonna of Humility / *Nöyryyden Madonna* | n. 1430 | Firenze (43.7696, 11.2558) | NGA | 5 | NGA openaccess=1 | https://api.nga.gov/iiif/e64daf38-38e8-4d0c-acb2-8ff370cc188c | 18212×24424 | varmennettu 2026-09-24 NGA opendata |
| Fra Filippo Lippi | Madonna and Child / *Madonna ja lapsi* | n. 1440 | Firenze (43.7696, 11.2558) | NGA | 433 | NGA openaccess=1 | https://api.nga.gov/iiif/2b5b0121-85d6-4c8e-9752-a83fb70d7995 | 10913×17037 | varmennettu 2026-09-24 NGA opendata |
| Sandro Botticelli | The Adoration of the Magi / *Tietäjien kumarrus* | n. 1478/1482 | Firenze (43.7696, 11.2558) | NGA | 24 | NGA openaccess=1 | https://api.nga.gov/iiif/0fd27212-b70a-4a0b-9e7c-ed0d8bbe7ebf | 25750×17129 | varmennettu 2026-09-24 NGA opendata |
| Sandro Botticelli | Giuliano de' Medici / *Giuliano de' Medicin muotokuva* | n. 1478/1480 | Firenze (43.7696, 11.2558) | NGA | 41671 | NGA openaccess=1 | https://api.nga.gov/iiif/6ef2731f-05c7-422c-be03-c49b37112e66 | 11919×17723 | varmennettu 2026-09-24 NGA opendata |
| Filippino Lippi | Portrait of a Youth / *Nuorukaisen muotokuva* | n. 1485 | Firenze (43.7696, 11.2558) | NGA | 22 | NGA openaccess=1 | https://api.nga.gov/iiif/48990066-145b-49d2-bf4e-186de168f7c9 | 13085×18935 | varmennettu 2026-09-24 NGA opendata |
| Domenico Ghirlandaio | Madonna and Child / *Madonna ja lapsi* | n. 1470/1475 | Firenze (43.7696, 11.2558) | NGA | 46148 | NGA openaccess=1 | https://api.nga.gov/iiif/244fe732-1479-4963-a716-ab62b8ac4879 | 10403×15104 | varmennettu 2026-09-24 NGA opendata |
| Piero di Cosimo | The Visitation with Saint Nicholas and Saint Anthony Abbot / *Marian ja Elisabetin kohtaaminen pyhien Nikolauksen ja Antonius Suuren kanssa* | n. 1489/1490 | Firenze (43.7696, 11.2558) | NGA | 505 | NGA openaccess=1 | https://api.nga.gov/iiif/53a3d42d-c211-4df6-b199-88086fdbd5a9 | 10952×10524 | varmennettu 2026-09-24 NGA opendata |
| Agnolo Bronzino | A Young Woman and Her Little Boy / *Nuori nainen ja poikansa* | n. 1540 | Firenze (43.7696, 11.2558) | NGA | 1143 | NGA openaccess=1 | https://api.nga.gov/iiif/bb63dde5-923f-4f5a-a814-7a6d96642b8e | 13406×17542 | varmennettu 2026-09-24 NGA opendata |
| Leonardo da Vinci | Ginevra de' Benci [obverse] / *Ginevra de' Benci* | n. 1474/1478 | Firenze (43.7696, 11.2558) | NGA | 50724 | NGA openaccess=1 | https://api.nga.gov/iiif/8f29e3c9-a289-4d53-abf0-31a66e9e98fa | 23235×23968 | varmennettu 2026-09-24 NGA opendata |

### Rooma (ja rooman/keski-Italian piiri)

| Taiteilija | Teos (EN / FI-ehdotus) | Vuosi | Kaupunki (lat/lon) | Museo | ID | Lisenssi | Kuva-URL (IIIF-pohja) | Maks. resoluutio | Varmennettu |
|---|---|---|---|---|---|---|---|---|---|
| Pietro Perugino | Madonna and Child / *Madonna ja lapsi* | n. 1500 | Firenze¹ (43.7696, 11.2558) | NGA | 356 | NGA openaccess=1 | https://api.nga.gov/iiif/1ecf0487-06e6-4236-85c3-8f9d55da908c | 11700×16504 | varmennettu 2026-09-24 NGA opendata |
| Pietro Perugino | Portrait of Lorenzo di Credi / *Lorenzo di Credin muotokuva* | 1488 | Firenze¹ (43.7696, 11.2558) | NGA | 1177 | NGA openaccess=1 | https://api.nga.gov/iiif/7681ffe3-535b-4e75-9d28-a288d7ce0cf5 | 19300×27553 | varmennettu 2026-09-24 NGA opendata |
| Raphael | The Alba Madonna / *Alban Madonna* | n. 1510 | Rooma (41.9028, 12.4964) | NGA | 26 | NGA openaccess=1 | https://api.nga.gov/iiif/f033a552-2901-4c21-95ed-93d13e598632 | 24180×24180 | varmennettu 2026-09-24 NGA opendata |
| Raphael | Bindo Altoviti / *Bindo Altovitin muotokuva* | n. 1515 | Rooma (41.9028, 12.4964) | NGA | 12131 | NGA openaccess=1 | https://api.nga.gov/iiif/b567bff1-506c-4c08-9689-c801fc55a35e | 18702×25703 | varmennettu 2026-09-24 NGA opendata |
| Raphael | Saint George and the Dragon / *Pyhä Yrjö ja lohikäärme* | n. 1506 | Firenze/Urbino² (43.7696, 11.2558) | NGA | 28 | NGA openaccess=1 | https://api.nga.gov/iiif/a6a8ceef-d4ab-4318-a6d1-9d369737156e | 16086×21058 | varmennettu 2026-09-24 NGA opendata |
| Sebastiano del Piombo | Cardinal Bandinello Sauli, His Secretary, and Two Geographers / *Kardinaali Bandinello Sauli, hänen sihteerinsä ja kaksi maantieteilijää* | 1516 | Rooma (41.9028, 12.4964) | NGA | 46136 | NGA openaccess=1 | https://api.nga.gov/iiif/f145e1fa-552c-4ffd-95a8-db12b700dae2 | 36325×29344 | varmennettu 2026-09-24 NGA opendata |
| Sebastiano del Piombo | Portrait of a Humanist / *Humanistin muotokuva* | n. 1520 | Rooma (41.9028, 12.4964) | NGA | 46137 | NGA openaccess=1 | https://api.nga.gov/iiif/ae0a99ab-4018-4abc-8898-92d1db1d709f | 24109×32095 | varmennettu 2026-09-24 NGA opendata |
| Luca Signorelli | The Crucifixion / *Ristiinnaulitseminen* | n. 1504/1505 | Cortona³ (43.2745, 11.9853) | NGA | 41690 | NGA openaccess=1 | https://api.nga.gov/iiif/034bc932-e493-4847-8d1f-5c3852696462 | 39092×28142 | varmennettu 2026-09-24 NGA opendata |

¹ Perugino toimi pääosin Firenzen/Perusian työpajastaan käsin; kuuluu saliin
"Rooma"-lohkoon Sikstiiniläiskappelin (1481–82) ja Raffaellon opettajan roolin
kautta, ei kirjaimellisen maalauspaikan kautta.
² Todennäköisesti maalattu Firenzessä/Urbinon hovin tilauksesta ennen Raffaellon
Rooman-kautta (NGA:n kuvaus).
³ Signorelli kuului Sikstiiniläiskappelin maalareihin (Rooma 1481–82); tämä
myöhempi teos on tehty Umbriassa, Cortonassa — merkitty Rooma-lohkoon
taidehistoriallisen kytköksen takia.

### Venetsia

| Taiteilija | Teos (EN / FI-ehdotus) | Vuosi | Kaupunki (lat/lon) | Museo | ID | Lisenssi | Kuva-URL (IIIF-pohja) | Maks. resoluutio | Varmennettu |
|---|---|---|---|---|---|---|---|---|---|
| Giovanni Bellini & Titian | The Feast of the Gods / *Jumalten juhla* | 1514/1529 | Venetsia (45.4408, 12.3155) | NGA | 1138 | NGA openaccess=1 | https://api.nga.gov/iiif/3a640014-a2f0-4cd4-b440-979f62316da2 | 26900×24642 | varmennettu 2026-09-24 NGA opendata |
| Giovanni Bellini | Portrait of a Venetian Gentleman / *Venetsialaisen aatelismiehen muotokuva* | n. 1500 | Venetsia (45.4408, 12.3155) | NGA | 395 | NGA openaccess=1 | https://api.nga.gov/iiif/7f89c7c7-a5cf-499d-a7ab-d2aa33e360d1 | 4758×7311 | varmennettu 2026-09-24 NGA opendata |
| Titian | Venus with a Mirror / *Venus peilin edessä* | n. 1555 | Venetsia (45.4408, 12.3155) | NGA | 41 | NGA openaccess=1 | https://api.nga.gov/iiif/5174ca9a-42e7-4420-b5e5-ad063a9092f6 | 24992×29610 | varmennettu 2026-09-24 NGA opendata |
| Titian | Ranuccio Farnese / *Ranuccio Farnesen muotokuva* | 1541/1542 | Venetsia (45.4408, 12.3155) | NGA | 41593 | NGA openaccess=1 | https://api.nga.gov/iiif/acf2ae83-872b-4aee-b927-22913c5d06c1 | 28585×34917 | varmennettu 2026-09-24 NGA opendata |
| Giorgione | The Holy Family / *Pyhä perhe* | n. 1500 | Venetsia (45.4408, 12.3155) | NGA | 41590 | NGA openaccess=1 | https://api.nga.gov/iiif/cb225bd2-9148-4095-886c-5a2687bcb9e8 | 12286×9962 | varmennettu 2026-09-24 NGA opendata |
| Vittore Carpaccio | Madonna and Child / *Madonna ja lapsi* | n. 1505/1510 | Venetsia (45.4408, 12.3155) | NGA | 46107 | NGA openaccess=1 | https://api.nga.gov/iiif/35e1b7b8-2ea3-4c92-a17b-bd7be02880e9 | 10748×13388 | varmennettu 2026-09-24 NGA opendata |
| Carlo Crivelli | Madonna and Child Enthroned with Donor / *Valtaistuimella istuva Madonna ja lapsi lahjoittajan kanssa* | 1470 | Marche⁴ (43.1600, 13.7180) | NGA | 41616 | NGA openaccess=1 | https://api.nga.gov/iiif/de88485d-7b9d-4d49-a08d-3a6591dd0262 | 8149×20809 | varmennettu 2026-09-24 NGA opendata |
| Jacopo Tintoretto | Doge Alvise Mocenigo and Family before the Madonna and Child / *Doge Alvise Mocenigo perheineen Madonnan edessä* | n. 1575 | Venetsia (45.4408, 12.3155) | NGA | 46143 | NGA openaccess=1 | https://api.nga.gov/iiif/91dc9af2-187b-4fe2-97f6-044b598e7801 | 38956×20646 | varmennettu 2026-09-24 NGA opendata |
| Veronese | The Finding of Moses / *Mooseksen löytyminen* | n. 1581/1582 | Venetsia (45.4408, 12.3155) | NGA | 45 | NGA openaccess=1 | https://api.nga.gov/iiif/7ef08b06-e4ff-49e5-8c13-f79dd0b1a872 | 9440×12481 | varmennettu 2026-09-24 NGA opendata |
| Lorenzo Lotto | Saint Catherine / *Pyhä Katariina* | 1522 | Bergamo⁵ (45.6983, 9.6773) | NGA | 258 | NGA openaccess=1 | https://api.nga.gov/iiif/96c30b07-4c63-4cd8-84b3-92566494fe34 | 13615×15212 | varmennettu 2026-09-24 NGA opendata |
| Andrea Mantegna | Portrait of a Man / *Miehen muotokuva* | n. 1470 | Mantova⁶ (45.1564, 10.7914) | NGA | 41584 | NGA openaccess=1 | https://api.nga.gov/iiif/2540c5bf-5185-4c7e-b3f6-f0244ba1a0ec | 5062×6445 | varmennettu 2026-09-24 NGA opendata |

⁴ Crivelli koulutettiin Venetsiassa, mutta toimi 1468 alkaen Marchen alueella
(Fermo/Ascoli Piceno); täsmällistä maalauskaupunkia ei voitu varmentaa NGA:n
tiedoista, koordinaatti on alueellinen likiarvo.
⁵ Lotto asui ja toimi Bergamossa v. 1513–1525; teos ajoittuu tälle kaudelle.
⁶ Mantegna oli Mantovan hovimaalari v. 1460 alkaen; kuuluu saliin
venetsialaisvaikutteisen koulukunnan kautta (koulutus Padovassa Squarcionen
työpajassa, tyylillinen side venetsialaiseen maalaustaiteeseen Bellinien kautta).

---

## B) Veistokset 3D-malleina (5 kpl, kaikki Statens Museum for Kunst, Kongelige Afstøbningssamling)

Kyseessä ovat SMK:n **kipsivalokset** (1800-luvun lopun/1900-luvun alun valokset
italialaisista alkuperäisteoksista), jotka SMK on itse 3D-skannannut ja julkaisee
STL-tiedostoina. Kaikki viisi ovat Michelangelon teoksia — tämä ei ollut
tarkoituksellinen valinta vaan seuraus siitä, että SMK:n `has_3d_file=true`-suodatin
(371 osumaa) ei tuottanut yhtään Donatellon tai Verrocchion valosta 3D-skannattuna;
haettu myös hakusanoilla "Donatello", "Verrocchio", "Ghiberti", "Sansovino" —
ei osumia 3D-tiedoston kanssa.

**Lisenssi kaikille:** SMK API -kenttä `rights` =
`https://creativecommons.org/publicdomain/mark/1.0/` (Public Domain Mark 1.0) ja
`public_domain: true`. Tämä ei ole sanatarkasti "CC0", mutta SMK julkaisee sen
museon itsensä avoimena aineistona ilman tunnettuja rajoituksia — täyttää
tehtävän ehdon "museo itse julkaisee avoimena".

| Teos | Taiteilija | Alkuperäisen sijainti | Malli: lähde/URL | Formaatti | Tiedostokoko | Lisenssi | Varmennettu |
|---|---|---|---|---|---|---|---|
| Moses (Mooses) | Michelangelo (SMK:n kipsivalos) | S. Pietro in Vincoli, Rooma (marmori, n. 1513–1516, osa Julius II:n hautamonumenttia) | SMK, KAS243. STL: https://api.smk.dk/api/v1/download-3d/m900p022q_154-smk-inv-243-moses.stl (myös MyMiniFactory-katseluversio) | STL | 172,6 Mt (isoin variantti); pienempi versio ~20 Mt saatavilla | Public Domain Mark 1.0 (SMK) | varmennettu 2026-09-24 api.smk.dk |
| Bacchus | Michelangelo (SMK:n kipsivalos) | Museo Nazionale del Bargello, Firenze (veistetty Roomassa 1496–1497 Jacopo Gallille, siirretty Bargelloon myöh.) | SMK, KAS83. STL: https://api.smk.dk/api/v1/download-3d/r207tt71x_142-inv-83-bacchus.stl | STL | 99,8 Mt (iso) / 20,0 Mt (pieni) | Public Domain Mark 1.0 (SMK) | varmennettu 2026-09-24 api.smk.dk |
| Den oprørske fange (Kapinoiva orja / Rebellious Slave) | Michelangelo (SMK:n kipsivalos) | Louvre, Pariisi (marmori, n. 1513–1514, Julius II:n hautamonumentin osa) | SMK, KAS86. STL: https://api.smk.dk/api/v1/download-3d/dr26z301p_140-smk-inv-86-den-operprske-slave.stl | STL | 100,0 Mt (iso) / 20,0 Mt (pieni) | Public Domain Mark 1.0 (SMK) | varmennettu 2026-09-24 api.smk.dk |
| Den døende fange (Kuoleva orja / Dying Slave) | Michelangelo (SMK:n kipsivalos) | Louvre, Pariisi (marmori, 1513–1514) | SMK, KAS87. STL: https://api.smk.dk/api/v1/download-3d/6969z5201_the-dying-slave.stl | STL | 100,0 Mt (iso) / 20,0 Mt (pieni) | Public Domain Mark 1.0 (SMK) | varmennettu 2026-09-24 api.smk.dk |
| Den genopstandne Kristus (Ylösnoussut Kristus / Cristo della Minerva) | Michelangelo (SMK:n kipsivalos, avustajan Pietro Urbanon viimeistelemin osin) | Santa Maria sopra Minerva, Rooma (marmori, n. 1519–1521) | SMK, KAS422. STL: https://api.smk.dk/api/v1/download-3d/p5547x24g_smk40-kas422-risen-christ.stl | STL | 45,0 Mt (iso) / 20,0 Mt (pieni) | Public Domain Mark 1.0 (SMK) | varmennettu 2026-09-24 api.smk.dk |

Riski/huomio: kaikki viisi ovat *Rooman ajan* Michelangelo-teoksia (patsaita ei
löytynyt varmennettuna Firenzen tai Venetsian koulukunnista tällä hakukierroksella)
— jos pilottisaliin halutaan veistoksia myös Donatellolta tai Verrocchiolta
(Firenze), ne pitää joko hakea Smithsonian 3D:stä (3d.si.edu — rajapintaa ei
saatu toimimaan tässä istunnossa) tai Scan the World / MyMiniFactorysta
yksitellen lisenssi tarkistaen (moni siellä on CC BY-NC, joka EI kelpaa).

---

## C) Taiteilijoiden muotokuvat (7 kpl, 5 eri henkilöä)

Tämä osio jäi suppeammaksi kuin pyydetty 6–10 *eri taiteilijaa* — löysin
varmennetusti vain **5 pilottiin liittyvää henkilöä** (Giovanni Bellini, Gentile
Bellini, Michelangelo, Tiziano, Giorgione), yhteensä 7 kuvaa. Hain myös
Raffaellolle, Leonardolle, Botticellille, Peruginolle, Mantegnalle, Bronzinolle,
Carpacciolle, Tintorettolle, Veroneselle, Lotolle ja Crivellille NGA:sta, AIC:sta
ja Clevelandista — ei yhtään varmennettavissa olevaa aikalaismuotokuvaa tai
omakuvaa näissä kolmessa rajapinnassa. Todennäköinen syy: keskeisimmät aidot
aikalaismuotokuvat (esim. Uffizin Vasari-käytävän omakuvakokoelma) ovat
italialaisissa museoissa, jotka on suljettu pois lisenssisäännön takia.

| Taiteilija | Muotokuvan tekijä/nimi | Vuosi | Museo | ID | Lisenssi | Kuva-URL | Varmennettu |
|---|---|---|---|---|---|---|---|
| Giovanni Bellini | Vittore Gambello, muotokuvamitali "Giovanni Bellini, c. 1430–1516, Venetian Painter" (aikalaismitali) | n. 1490/1500 | NGA | 44578 | NGA openaccess=1 | https://api.nga.gov/iiif/9bb36b0b-3196-43cf-835f-6786bbcc375d | varmennettu 2026-09-24 NGA opendata |
| Gentile Bellini | Vittore Gambello, muotokuvamitali "Gentile Bellini, 1429–1507, Venetian Painter" (aikalaismitali) | n. 1500 | NGA | 44580 | NGA openaccess=1 | https://api.nga.gov/iiif/d6564100-1235-487a-8631-a2b859ba864b | varmennettu 2026-09-24 NGA opendata |
| Michelangelo Buonarroti | Leone Leoni, muotokuvamitali "Michelangelo Buonarroti, 1475–1564, Florentine Artist" (aikalaismitali, tehty Michelangelon eläessä) | 1560/1561 | NGA | 45094 | NGA openaccess=1 | https://api.nga.gov/iiif/11e27217-43b9-4bfc-8bbb-52d835c8c69c | varmennettu 2026-09-24 NGA opendata |
| Michelangelo Buonarroti | Giorgio Ghisi, kaiverrus Marcello Venustin muotokuvan mukaan | jälkeen 1564 | NGA | 48179 | NGA openaccess=1 | https://api.nga.gov/iiif/ba898775-a101-482d-92f1-85782f7c8ea4 | varmennettu 2026-09-24 NGA opendata |
| Michelangelo Buonarroti | Giulio Bonasone, kaiverrus (tehty Michelangelon eläessä) | 1546 | NGA | 50924 | NGA openaccess=1 | https://api.nga.gov/iiif/27703b9d-9162-4ca3-a156-6b8aad773b75 | varmennettu 2026-09-24 NGA opendata |
| Tiziano (Titian) | "Self-Portrait" — kaiverrus Titianin oman omakuvan mukaan | ei päivätty | AIC | 55006 | AIC is_public_domain=true | https://www.artic.edu/iiif/2/5ea967f4-eb96-afbe-63cb-924e8d305a24/full/full/0/default.jpg | varmennettu 2026-09-24 api.artic.edu |
| Tiziano (Titian) | Agostino Carracci, "Titian" — kaiverrus Titianin omakuvan mukaan | 1587 | NGA | 33772 | NGA openaccess=1 | https://api.nga.gov/iiif/db1376cb-46c6-48b0-b832-892e6e31af4b | varmennettu 2026-09-24 NGA opendata |

Lisäksi löytyi yksi **epävarma/postuumi** tapaus, joka merkitään erikseen eikä
lasketa yllä olevaan seitsemään: NGA obj. 150371, Cornelis van Dalen I:n
kaiverrus "Giorgione Barbarelli" (1600-luku) Titianille attribuoidun muotokuvan
mukaan — https://api.nga.gov/iiif/edb30064-fc0d-4143-a4ae-703ba68a6008, NGA
openaccess=1, varmennettu 2026-09-24 NGA opendata. Tämä nostaisi kuudenneksi
henkilöksi **Giorgionen**, mutta koska attribuutio Titianin alkuperäiseen
muotokuvaan on epävarma ("after Titian") ja kaiverrus on tehty ~150 vuotta
Giorgionen kuoleman (1510) jälkeen, suosittelen käyttöä vain merkinnällä
"epävarma jälkikäteinen tulkinta" — ei EI VARMENNETTU, koska teos ja lisenssi
itsessään ovat täysin varmennettuja, vain henkilöllisyyden osuvuus on epävarma.

---

## D) Ikoniset teokset, joita EI voida käyttää näillä ehdoilla

| Teos | Tekijä | Miksi ei käy |
|---|---|---|
| Venuksen syntymä (Birth of Venus) | Botticelli | Uffizi, Firenze. Uffizin omat digikuvat kuuluvat Italian kulttuuriperintölain (Codice dei beni culturali art. 107–108) piiriin — kaupallinen/pelikäyttö vaatii luvan ja maksun, vaikka teos itse on PD. Ei löydy CC0-versiota NGA/AIC/Cleveland/Met-rajapinnoista, koska teos ei ole niiden kokoelmissa. |
| Kevät (Primavera) | Botticelli | Sama syy — Uffizi. |
| Sikstiiniläiskappelin katto ja Viimeinen tuomio | Michelangelo | Vatikaanin museot — ei kuulu Italian siviililain rajoitusten piiriin samalla tavalla (eri valtio), mutta Vatikaanin Musei Vaticani -kuvapankki on erikseen lisensioitu ja maksullinen kaupalliseen käyttöön; ei avointa rajapintaa näissä lähteissä. |
| Mona Lisa | Leonardo da Vinci | Louvre, Pariisi — ei Italian lain piirissä, mutta ei myöskään NGA/AIC/Cleveland-kokoelmissa eikä auki avoimella rajapinnalla tässä haussa; Louvren oma "Collections"-rajapinta ei ollut tehtävänannon hyväksyttyjen lähteiden listalla. |
| Viimeinen ehtoollinen (The Last Supper) | Leonardo da Vinci | Santa Maria delle Grazie, Milano — Italian valtion/kirkon omistuksessa oleva seinämaalaus, kuvausoikeudet tiukasti rajatut (ei edes yleisölle vapaata kuvausta paikan päällä); ei avointa digitointia. |
| Vitruviuksen mies | Leonardo da Vinci | Gallerie dell'Accademia, Venetsia — nimenomaisesti kielletyistä museoista, tunnettu myös erittäin tiukoista kaupallisista kuvankäyttörajoituksista viime vuosina (Accademia haastoi useita kaupallisia käyttäjiä oikeuteen 2022–2023). |
| Tempesta | Giorgione | Gallerie dell'Accademia, Venetsia — sama syy. |
| Assunta (Neitsyt Marian taivaaseenastuminen) | Titian | Basilica dei Frari, Venetsia — kirkon omistuksessa, ei avointa museorajapintaa. |

---

## Yhteenveto

- **A) Maalaukset:** 28/28 varmennettu, kaikki National Gallery of Art
  Washington (openaccess=1, CC0). Jako: Firenze 9, Rooma 8, Venetsia 11
  (mukaan lukien Mantegna venetsialais-vaikutteisena). Kaikki tunnetuimpien
  pyydettyjen taiteilijoiden (Botticelli, Fra Angelico, F. Lippi, Ghirlandaio,
  Perugino, Raphael, Leonardo, Piero di Cosimo, Bronzino, G. Bellini, Giorgione,
  Titian, Carpaccio, Mantegna, Crivelli, Tintoretto, Veronese, Lotto) osalta
  löytyi vähintään yksi CC0-teos NGA:sta.
- **B) Veistokset 3D:** 5/5 varmennettu, kaikki SMK:n Michelangelo-kipsivalosten
  STL-skannauksia (Public Domain Mark 1.0). Ei löytynyt Donatello/Verrocchio-
  vaihtoehtoja tällä hakukierroksella — jos Firenzen koulukunnan veistos on
  tarpeen, vaatii lisähaun Smithsonian 3D:stä tai Scan the Worldista.
- **C) Taiteilijamuotokuvat:** 7 kuvaa / 5 varmaa henkilöä (Giovanni Bellini,
  Gentile Bellini, Michelangelo ×3, Tiziano ×2), lisäksi yksi epävarma
  (Giorgione, "after Titian" -attribuutio). Tavoitteesta 6–10 eri taiteilijaa
  jäätiin 1–5 henkilöä vajaaseen NGA/AIC/Cleveland-haulla; Raffaellolle,
  Leonardolle, Botticellille, Peruginolle, Mantegnalle, Bronzinolle,
  Carpacciolle, Tintorettolle, Veroneselle, Lotolle ja Crivellille ei löytynyt
  varmennettavaa CC0/PD-muotokuvaa näissä kolmessa rajapinnassa.
- **D) Ei-saatavilla olevat ikonit:** 7 kpl listattu syineen (Uffizi/Vatikaani/
  Louvre/Accademia/Frari — kaikki joko Codice dei beni culturali -riskin
  piirissä tai kokonaan tehtävänannon hyväksyttyjen lähteiden ulkopuolella).

**Suurimmat ongelmat/aukot:**
1. Taiteilijamuotokuvia (osio C) ei saatu tavoitemäärään 6–10 eri henkilöä —
   vaatisi Rijksmuseumin tai Paris Musées -rajapinnan toimivan haun, tai
   Metin/Clevelandin syvemmän manuaalisen läpikäynnin (näiden hakuliitännät
   tuottivat liikaa kohinaa täsmällisten muotokuvien löytämiseen tässä istunnossa).
2. Veistokset (osio B) painottuvat yksipuolisesti Michelangeloon ja Roomaan —
   ei Firenzen tai Venetsian koulukunnan veistoksia.
3. SMK:n lisenssikenttä on tarkasti "Public Domain Mark 1.0", ei sanatarkasti
   "CC0" — tulkittu tehtävän ehdon mukaiseksi ("museo itse julkaisee avoimena"),
   mutta tämä kannattaa vielä hyväksyttää, jos peliprojektissa vaaditaan
   juridisesti täsmälleen CC0.
4. Kaupunki/koulukunta-sarake sisältää muutamia taidehistoriallisia
   yleistyksiä (Perugino, Signorelli, Crivelli, Lotto, Mantegna) — merkitty
   alaviitteillä, ei piiloteta.

---

## E) Taiteilijoiden kaiverrusmuotokuvat Rijksmuseumista (CC0), lisähaku 24.9.2026 Fablen päätöksen 4 mukaan


| Taiteilija | Objektinumero | Otsikko | Tekijä (kaivertaja) / esikuva | Ajoitus | Tekniikka | Oikeudet | Kuva (URL, resoluutio) | Kokoelmasivu | Varmennus |
|---|---|---|---|---|---|---|---|---|---|
| Raphael (Rafaël) | RP-P-OB-35.378 | Portret van de kunstenaar Rafaël | Giulio Bonasone (kaivertaja) — naar ontwerp van Rafaël — perinteisesti Raphaelin oman (Uffizin) omakuvan mukainen sommitelma | 1501 - 1580 | kaiverrus + etsaus (engraving/etching) | CC0 (Public Domain) | [5455×7091 px](https://iiif.micr.io/ULqyA/full/max/0/default.jpg) | [linkki](https://www.rijksmuseum.nl/nl/collectie/object/RP-P-OB-35.378--4c08294b45955874ac2f64c0cdd8bf4d) | varmennettu 24.9.2026 Rijksmuseum Linked Art API |
| Raphael (Rafaël) | RP-P-2021-6211 | Portret van Rafaël | Anonyymi kaivertaja — naar prent van Marcantonio Raimondi — Raimondi oli Raphaelin oma aikalaiskaivertaja Roomassa | 1510 - 1699 | kaiverrus (engraving) | CC0 (Public Domain) | [2159×2551 px](https://iiif.micr.io/QPeae/full/max/0/default.jpg) | [linkki](https://www.rijksmuseum.nl/nl/collectie/object/RP-P-2021-6211--2fad03d2f80edf9bbea28556393dc2f6) | varmennettu 24.9.2026 Rijksmuseum Linked Art API |
| Leonardo da Vinci | RP-P-2022-4655 | Portret van Leonardo da Vinci | Cristoforo Coriolano (mogelijk, kaivertaja) — Vasarin Vite-teoksen (1568) taiteilijamuotokuvasarjaa | 1568 - 1663 | puupiirros (houtsnede) + kirjapainoteksti | CC0 (Public Domain) | [2170×2004 px](https://iiif.micr.io/ZeqtS/full/max/0/default.jpg) | [linkki](https://www.rijksmuseum.nl/nl/collectie/object/RP-P-2022-4655--312f1b814b1e9169f665335312a93dfc) | varmennettu 24.9.2026 Rijksmuseum Linked Art API |
| Leonardo da Vinci | RP-P-1907-793 | Portret van Leonardo da Vinci | Toegeschreven aan Claude Mellan — attribuoitu Claude Mellanille | 1608 - 1688 | kaiverrus (engraving) | CC0 (Public Domain) | [2128×1742 px](https://iiif.micr.io/RmLPu/full/max/0/default.jpg) | [linkki](https://www.rijksmuseum.nl/nl/collectie/object/RP-P-1907-793--ceacaeb990bbcd75bdd3349c5843a00e) | varmennettu 24.9.2026 Rijksmuseum Linked Art API |
| Sandro Botticelli | RP-P-2020-2897 | Portret van Sandro Botticelli | Anonyymi puupiirtäjä — samaa Vasari-tyyppistä muotokuvasarjaa, myöhempi 1600-luvun painos | 1600 - 1699 | puupiirros (houtsnede) + kirjapainoteksti | CC0 (Public Domain) | [2172×2051 px](https://iiif.micr.io/FaDpn/full/max/0/default.jpg) | [linkki](https://www.rijksmuseum.nl/nl/collectie/object/RP-P-2020-2897--7bce7c330ef7788033d48d5c475ed1ee) | varmennettu 24.9.2026 Rijksmuseum Linked Art API |
| Andrea Mantegna | RP-P-2021-5699 | Portret van Andrea Mantegna | Cristoforo Coriolano (kaivertaja) — Vasarin Vite (1568) -sarjaa | 1568 - 1650 | puupiirros (houtsnede) + kirjapainoteksti | CC0 (Public Domain) | [2232×2059 px](https://iiif.micr.io/oqkgm/full/max/0/default.jpg) | [linkki](https://www.rijksmuseum.nl/nl/collectie/object/RP-P-2021-5699--0247f2e4e336528d3854abfdb375a5ff) | varmennettu 24.9.2026 Rijksmuseum Linked Art API |
| Andrea Mantegna | RP-P-OB-30.920 | Titelprent met portret van kunstenaar Andrea Mantegna | Andrea Andreani (kaivertaja) — nimiölehti; naar tekening van Bernardo Malpizzi, naar beeld van Andrea Mantegna (esikuvana Mantegnan rintakuva); omistettu Vincenzo Gonzagalle | 1599 | chiaroscuro-puupiirros (chiaroscuro woodcut) | CC0 (Public Domain) | [5422×5572 px](https://iiif.micr.io/IUulP/full/max/0/default.jpg) | [linkki](https://www.rijksmuseum.nl/nl/collectie/object/RP-P-OB-30.920--5e8b2ace763d02b9b02522e797d0d909) | varmennettu 24.9.2026 Rijksmuseum Linked Art API |
| Paolo Veronese | RP-P-1907-293 | Portret van schilder Paolo Veronese | Monogrammist IP (Italië) | ca. 1600 - ca. 1699 | kaiverrus (engraving) | CC0 (Public Domain) | [1894×2552 px](https://iiif.micr.io/OZhpr/full/max/0/default.jpg) | [linkki](https://www.rijksmuseum.nl/nl/collectie/object/RP-P-1907-293--c04b773b8bc4179ff5ea75a898725edb) | varmennettu 24.9.2026 Rijksmuseum Linked Art API |
| Tintoretto | RP-P-OB-15.716 | Portret van Jacopo Tintoretto met Atlas en Minerva | Gijsbert van Veen (kaivertaja) — naar ontwerp van Lodewijk Toeput / Alessandro Vittoria; allegorinen muotokuva Atlaan ja Minervan kanssa, lähellä Tintoretton elinaikaa | 1588 - 1628 | kaiverrus (engraving) | CC0 (Public Domain) | [5192×6684 px](https://iiif.micr.io/YBqxT/full/max/0/default.jpg) | [linkki](https://www.rijksmuseum.nl/nl/collectie/object/RP-P-OB-15.716--f7ef33c249c5c21babc1246d73e1c358) | varmennettu 24.9.2026 Rijksmuseum Linked Art API |
| Tintoretto | RP-P-2022-3414 | Portret van Jacopo Tintoretto | Monogrammist IP (Italië) | 1600 - 1699 | kaiverrus (engraving) | CC0 (Public Domain) | [2888×3708 px](https://iiif.micr.io/GKhFb/full/max/0/default.jpg) | [linkki](https://www.rijksmuseum.nl/nl/collectie/object/RP-P-2022-3414--d63b142034f8adea738590d87d69f7ee) | varmennettu 24.9.2026 Rijksmuseum Linked Art API |
| Pietro Perugino | RP-P-2021-7729 | Portret van Pietro Perugino | Cristoforo Coriolano (mogelijk, kaivertaja) — Vasarin Vite (1568) -sarjaa | 1568 - 1647 | puupiirros (houtsnede) + kirjapainoteksti | CC0 (Public Domain) | [2168×2037 px](https://iiif.micr.io/oMNmf/full/max/0/default.jpg) | [linkki](https://www.rijksmuseum.nl/nl/collectie/object/RP-P-2021-7729--07d481dea3592a60a1ea81c32b1debc2) | varmennettu 24.9.2026 Rijksmuseum Linked Art API |
| Agnolo Bronzino | EI VARMENNETTU | - | - | - | - | - | - | - | Ei löytynyt Rijksmuseumista (aboutActor=Bronzino tuotti vain Cristofano Allorin muotokuvia, eri henkilö) eikä Metin julkisesta hausta luotettavaa kaiverrettua muotokuvaa Bronzinosta itsestään. (haku 24.9.2026, ei julkaista ilman varmennusta) |
| Giorgione | RP-P-2020-5808 | Portret van Giorgione | Anonyymi puupiirtäjä — Vasarin Vite (1568) -sarjaa | 1568 - 1650 | puupiirros (houtsnede) + kirjapainoteksti | CC0 (Public Domain) | [2158×2037 px](https://iiif.micr.io/nEoKa/full/max/0/default.jpg) | [linkki](https://www.rijksmuseum.nl/nl/collectie/object/RP-P-2020-5808--5d6076c23cbd009aeb0e7daa1bcfe509) | varmennettu 24.9.2026 Rijksmuseum Linked Art API |
| Giorgione | RP-P-1885-A-9340 | Portret van schilder Giorgione | Cornelis van Dalen (II) (kaivertaja) — naar schilderij van Lorenzo Lotto (mogelijk) — esikuvana mahdollisesti Lorenzo Loton maalaus; kustantaja Abraham Bloteling | 1648 - 1664 | kaiverrus (engraving) | CC0 (Public Domain) | [4470×5998 px](https://iiif.micr.io/kNNsE/full/max/0/default.jpg) | [linkki](https://www.rijksmuseum.nl/nl/collectie/object/RP-P-1885-A-9340--71e44d5a258154e83d0c7d60beb4b5c9) | varmennettu 24.9.2026 Rijksmuseum Linked Art API |
| Vittore Carpaccio | RP-P-2022-2037 | Portret van Vittore Carpaccio | Cristoforo Coriolano (kaivertaja) — Vasarin Vite (1568) -sarjaa | 1568 - 1650 | puupiirros (houtsnede) + kirjapainoteksti | CC0 (Public Domain) | [2321×1871 px](https://iiif.micr.io/ekNsb/full/max/0/default.jpg) | [linkki](https://www.rijksmuseum.nl/nl/collectie/object/RP-P-2022-2037--f0a0eaf055673065c2172477c0650af6) | varmennettu 24.9.2026 Rijksmuseum Linked Art API |
| Vittore Carpaccio | RP-P-2020-2313 | Portret van Vittore Carpaccio | Anonyymi kaivertaja — ajoitus laaja (1648–1787), painos/vedos epävarma | 1648 - 1787 | kaiverrus (engraving) | CC0 (Public Domain) | [2317×3171 px](https://iiif.micr.io/qbkUn/full/max/0/default.jpg) | [linkki](https://www.rijksmuseum.nl/nl/collectie/object/RP-P-2020-2313--32bbd7d54ce6daa215323cd0232d7243) | varmennettu 24.9.2026 Rijksmuseum Linked Art API |
| Lorenzo Lotto | EI VARMENNETTU | - | - | - | - | - | - | - | Rijksmuseumin aboutActor-haku ("Lotto"/"Lorenzo Lotto") tuotti nolla objektia, joissa Lotto olisi kuvattu henkilö. Metin haku tuotti vain Loton itsensä maalaamia/piirtämiä teoksia, ei kaiverrettua muotokuvaa hänestä. Ei varmennettua ehdokasta. (haku 24.9.2026, ei julkaista ilman varmennusta) |
| Fra Angelico | RP-P-2020-4443 | Portret van Fra Angelico | Cristoforo Coriolano (kaivertaja) — Vasarin Vite (1568) -sarjaa | 1568 - 1650 | puupiirros (houtsnede) + kirjapainoteksti | CC0 (Public Domain) | [2138×1961 px](https://iiif.micr.io/pGgsX/full/max/0/default.jpg) | [linkki](https://www.rijksmuseum.nl/nl/collectie/object/RP-P-2020-4443--8f9f06a5c755ee6b0d279aece0c62233) | varmennettu 24.9.2026 Rijksmuseum Linked Art API |
| Filippo Lippi | RP-P-2021-3735 | Portret van Filippo Lippi | Cristoforo Coriolano (kaivertaja) — Vasarin Vite (1568) -sarjaa | 1568 - 1650 | puupiirros (houtsnede) + kirjapainoteksti | CC0 (Public Domain) | [2175×2033 px](https://iiif.micr.io/atEYk/full/max/0/default.jpg) | [linkki](https://www.rijksmuseum.nl/nl/collectie/object/RP-P-2021-3735--46cc5e7e7314cd294b672c00c7449d30) | varmennettu 24.9.2026 Rijksmuseum Linked Art API |
| Filippo Lippi | RP-P-1907-754 | Portret van Filippo Lippi | Nicolas de Larmessin (I) (kaivertaja) — kustantaja mahdollisesti François Foppens, Bryssel | 1682 | kaiverrus (engraving) | CC0 (Public Domain) | [2220×2980 px](https://iiif.micr.io/VngSN/full/max/0/default.jpg) | [linkki](https://www.rijksmuseum.nl/nl/collectie/object/RP-P-1907-754--28a0b5b3fea13ce736290e749363d4b0) | varmennettu 24.9.2026 Rijksmuseum Linked Art API |
| Domenico Ghirlandaio | RP-P-2020-5386 | Portret van Domenico Ghirlandaio | Anonyymi puupiirtäjä — Vasarin Vite (1568) -sarjaa. Huom: samasta sarjasta löytyy myös RP-P-2020-5387, mutta se kuvaa Domenicon poikaa Ridolfo Ghirlandaiota eikä siksi kelpaa | 1568 - 1650 | puupiirros (houtsnede) + kirjapainoteksti | CC0 (Public Domain) | [2163×1945 px](https://iiif.micr.io/mnpgk/full/max/0/default.jpg) | [linkki](https://www.rijksmuseum.nl/nl/collectie/object/RP-P-2020-5386--e50694dde0ebb244d488dc7a8ef38eef) | varmennettu 24.9.2026 Rijksmuseum Linked Art API |
| Carlo Crivelli | EI VARMENNETTU | - | - | - | - | - | - | - | Rijksmuseumin ainoa osuma ("Portret van Eusebio de Crivelli") kuvaa eri henkilöä, ei Carlo Crivelliä. Metin haut ("Carlo Crivelli", departmentId=9) eivät tuottaneet kaiverrettua muotokuvaa taiteilijasta itsestään. Ei varmennettua ehdokasta. (haku 24.9.2026, ei julkaista ilman varmennusta) |
| Piero di Cosimo | RP-P-2020-3286 | Portret van Piero di Cosimo | Anonyymi puupiirtäjä — Vasarin Vite (1568) -sarjaa, tarkka ajoitus 1568 | 1568 | puupiirros (houtsnede) + kirjapainoteksti | CC0 (Public Domain) | [2153×1962 px](https://iiif.micr.io/XmWLt/full/max/0/default.jpg) | [linkki](https://www.rijksmuseum.nl/nl/collectie/object/RP-P-2020-3286--11670a2232b45d81b80a06eecc6e5777) | varmennettu 24.9.2026 Rijksmuseum Linked Art API |
| Sebastiano del Piombo | RP-P-2021-9228 | Portret van Sebastiano del Piombo | Cristoforo Coriolano (mogelijk, kaivertaja) — Vasarin Vite (1568) -sarjaa | 1568 - 1650 | puupiirros (houtsnede) + kirjapainoteksti | CC0 (Public Domain) | [2154×1933 px](https://iiif.micr.io/NWoqW/full/max/0/default.jpg) | [linkki](https://www.rijksmuseum.nl/nl/collectie/object/RP-P-2021-9228--e6323b082e560bc436c0337889946748) | varmennettu 24.9.2026 Rijksmuseum Linked Art API |
| Sebastiano del Piombo | RP-P-OB-50.017 | Portret van schilder Sebastiano del Piombo | Cornelis van Dalen (II) (kaivertaja) — naar schilderij van Titiaan — esikuvana Tizianin maalaus | 1648 - 1664 | kaiverrus (engraving) | CC0 (Public Domain) | [4134×5848 px](https://iiif.micr.io/GkeWZ/full/max/0/default.jpg) | [linkki](https://www.rijksmuseum.nl/nl/collectie/object/RP-P-OB-50.017--0639d6127c97d1df7016ef5f43ace4ac) | varmennettu 24.9.2026 Rijksmuseum Linked Art API |
| Luca Signorelli | RP-P-2022-2690 | Portret van Luca Signorelli | Cristoforo Coriolano (kaivertaja) — Vasarin Vite (1568) -sarjaa | 1568 - 1650 | puupiirros (houtsnede) + kirjapainoteksti | CC0 (Public Domain) | [2162×2019 px](https://iiif.micr.io/TBSVe/full/max/0/default.jpg) | [linkki](https://www.rijksmuseum.nl/nl/collectie/object/RP-P-2022-2690--97d68003fe3849474676afd8ba2dde60) | varmennettu 24.9.2026 Rijksmuseum Linked Art API |

## Huomiot ja rajaukset

- **Agnolo Bronzino**, **Lorenzo Lotto** ja **Carlo Crivelli**: Rijksmuseumista ei löytynyt 
  yhtään tietuetta, jossa kuvattu henkilö (`represents`) olisi todistettavasti kyseinen taiteilija 
  itse — löytyneet osumat olivat joko näiden taiteilijoiden itse tekemiä teoksia (esim. Bronzinon 
  maalaama Eleonora di Toledon muotokuva) tai kuvasivat samannimistä eri henkilöä (esim. 
  "Portret van Eusebio de Crivelli" ≠ Carlo Crivelli; "Bronzino"-haku osui Cristofano Allorin 
  muotokuviin). Metin julkisen collectionapi.metmuseum.org-haun (`q=`, `departmentId=9` eli 
  Drawings and Prints) tulokset olivat niin ikään vääriä osumia (taiteilijoiden omia teoksia tai 
  täysin epäolennaisia). Näille kolmelle ei siis ole varmennettua kaiverrusmuotokuvaa tässä 
  luettelossa — merkitty "EI VARMENNETTU".

- **Domenico Ghirlandaio**: Vasari-sarjasta löytyy myös tietue RP-P-2020-5387, mutta se on hylätty, 
  koska kuvattu henkilö on Domenicon poika Ridolfo Ghirlandaio, ei Domenico itse 
  (Perustuslain/tehtävänannon sääntö: hylätään muotokuvat, joissa kohde on joku muu).

- **Raphael**: Bonasonen kaiverrus (RP-P-OB-35.378) on merkitty "naar ontwerp van Rafaël" — 
  Rijksmuseumin tietueessa ei ole eksplisiittistä "naar zelfportret"-mainintaa, mutta kuva-aihe 
  vastaa taidehistoriassa tunnettua Bonasonen n. 1546 kaiverrusta Raphaelin omakuvan (Uffizi) 
  pohjalta; tämä ei ole rajapinnasta suoraan varmennettu yksityiskohta, vain tietueen oma 
  maininta "naar ontwerp van Rafaël" on varmennettu.

- **Kuvien URL:t** ovat Rijksmuseumin IIIF/Micrio-palvelusta (`full/max/0/default.jpg`), resoluutio 
  haettu kunkin kuvan `info.json`-tiedostosta. Kuvia ei ole ladattu levylle.

- **Kokoelmasivun URL** on poimittu suoraan tietueen `subject_of.digitally_carried_by.access_point`
  -kentästä (sisältää hajautustunnisteen, esim. `.../object/RP-P-2020-3286--<hash>`). Lyhyempi 
  muoto `rijksmuseum.nl/nl/collectie/<objektinumero>` (ilman `object/`-osaa ja hajautusta) palautti 
  testissä 404 — sitä ei siis pidä käyttää.

