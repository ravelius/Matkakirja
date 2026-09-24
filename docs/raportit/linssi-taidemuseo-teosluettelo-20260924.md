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
