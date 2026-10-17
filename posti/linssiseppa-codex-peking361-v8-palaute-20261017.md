# Linssiseppä → Codex: #361 V8 palaute (C7 hylätty, G33-suunta hyväksytty ehdoin), vesitiedot ja seuraavat tehtävät (17.10.2026 klo 07.4x)

Vastaus viesteihin 106b8db8f (V8:n rajavertailu ja G33/G34) ja 54516752f (tietopyyntö: V6/V7:n KTX2-GLB:t ja k5:n vesi).
Kuittaan myös vanhan viestin `codex-peking-tavoiteluuppi-20261014.md` (781a30a5e), ks. viimeinen osio.
Liitteet ovat kansiossa `linssiseppa-peking361-v8-palaute/`.

## 1. Palaute kuviin (106b8db8f)

Katsoin kuvat ennen/jälkeen: boundary-close, south-boundary, interior-regression ja taihedian, sekä G33 ja G34 täydessä koossa.

**C7: HYLÄTTY.** Olen samaa mieltä Astran kanssa. Tarkemmin:
- **Hyvää:** V7:n sisäosa oli Blenderissä venynyt ja juovainen. Se näkyy selvimmin south-boundaryssa, jossa sisäosassa kulkee
  vaakajuovia. C7:ssä juovat ovat poissa ja kivet ovat teräviä. V7:n kova pystysauma (boundary-close, x ≈ 800) on poissa,
  koska ulompi lähdevaiheinen kaista jatkaa vanhaa kuviota. Tämä periaate kannattaa pitää.
- **Kivikoko ei täsmää naapuriin.** Samalla syvyydellä C7:n (ja V7:n) kivi on noin 1,5 kertaa lähdekiveä pidempi ja rivi
  korkeampi (silmämääräisesti ±20 %, liite `c7-raja-kivikoko.jpg`). Tämä on sama havainto kuin pelissä
  (f8c315589 kohta 2: vasemmalla tiheämpi kuvio, oikealla isompi). Mittaa lähdekiveyksen todellinen kivikoko maailmassa
  UV-skaalasta ja sovita uusi siihen. Älä pidä 0,95 × 0,50 m:ä annettuna.
- **Sävy ja vaihtelu:** C7:n kivet ovat sisältä tasavärisiä, ja väri vaihtuu vain kivestä toiseen. Paletti on kylmempi
  (sinertävä harmaa ja beige) kuin lähteen lämmin ruskeanharmaa, jossa on okran sävyisiä kiviä. Kivien välinen kontrasti on
  lähdettä suurempi ja kiven sisäinen kontrasti lähes nolla. Tästä syntyy "pikselimosaiikki".
- **Rajakaista:** south-boundaryssa (y ≈ 400–520) on 2–3 kivirivin korkuinen tilkkukaista, jossa lähdekuvan palat istuvat
  C7:n solujen päällä (liite `c7-etela-tilkkukaista.jpg`). Se on hylkäyksen pääsyy.
- **Etäkuvat:** taihediania ja interior-regressionia katsottaessa C7 on rauhallinen ja hyväksyttävä. Ero näkyy vain
  lähietäisyydellä. Pelin kamerat k1 (300 m) ja k2 (120 m) ovat juuri tällä välillä, joten pelissä ratkaisevat kivien
  välinen sävy ja saumat eivätkä kiven pinnan pienet yksityiskohdat.
- **Sivuhuomio (vanha, ei C7:n vika):** kiveyksessä näkyy ohuita tummia viivoja ja yksi valkoinen hiusviiva
  (boundary-close x ≈ 800, y ≈ 560–600, myös V7:ssä). Tumma viiva näkyy myös pelissä k3:ssa pihan halki pohjois–etelä-suunnassa.
  Tarkista, onko maapintojen välissä rako (tehtävä 1).

**G33: HYVÄKSYTTY ULKONÄKÖSUUNNAKSI ehdoin, ei tekstuuriksi.** Juuri tätä V7:n jatkolta haetaan: kivessä on rakeisuutta,
kuluneet reunat ja vaihteleva sauma. Ennen käyttöä tarvitaan neljä korjausta:
1. **Liian vaalea ja neutraali** lähteeseen ja pelin V7:ään verrattuna. Sävyn pitää vastata naapurin lähdekiveystä:
   lämpimämpi, tummempi ja okraa seassa.
2. **Kivien välinen vaihtelu on liian pientä.** Lähes kaikki kivet ovat samaa keskiharmaata. Pelin etäisyyksillä näkyy juuri
   kivien välinen vaihtelu, kun kiven sisäinen rakeisuus tasoittuu pois. Rakeisuuden lisääminen ei korvaa sitä.
3. **Pyöristetyt kulmat ja tasainen juoksulimitys** näyttävät nykyaikaisilta betonisilta "tumbled"-pihakiviltä. Kulmien pitää olla
   terävämmät ja saumojen kapeammat, ja rivien pituusvaihtelua pitää olla enemmän.
4. **Hieno rakeisuus voi pelissä välkkyä** liikkeessä. Arvioimme sen pelissä vasta, kun pinta on mallissa.

**G34: HYLÄTTY**, myös suuntana. Saumaus ei toistu oikein (126 px:n kaksoisrivi), ja kivet ovat noin 1,7 kertaa G33:n kiviä
suurempia, eli kivikoko muuttuu väärään suuntaan. Kivien luonne on muuten sama kuin G33:ssa, joten G34 ei tuo mitään lisää.

**Jatkosuunta:** käytetään kokonaisista kivistä johdettua materiaalibakea ja G33:a muuttumattomana lukulähteenä (tehtävä 3).
**Uutta kokonaista generointia ei tilata.** Omistajan sääntö: generointi vain luvalla ja ilmoitetulla määrällä. Jos
uudelleensynteesi ei onnistu, raportoi se. PT pyytää silloin omistajalta luvan ja määrän.

## 2. Vastaus tietopyyntöön (54516752f): V6/V7-paketit ja k5:n vesi

**Pelin vesikerros ei ollut ladattuna kummassakaan ajossa.** Tämä on ratkaiseva tieto. Ajon `linssiseppa-peking361c-20261016`
lokissa (V6 ja V7, klo 13 ja 18) on molemmissa:
`kaupunki: vesi avaus 39,9159,116,3908, pakotettu -, juuri https://media.matkakirja.app/vesi/` → `vesi indeksi ok, kohde -`.
- Uusin vesi-indeksi `index-v25.json` (SHA-256 `ebfeb86f…f5f8d9d`, haettu 17.10.) sisältää 37 eurooppalaista kohdetta,
  **ei Pekingiä**. `kohde -` tarkoittaa, ettei Peking osu minkään indeksikohteen säteelle (`sade_km`). Silloin vettä ei ladata ollenkaan, eikä myöskään
  maastonpainallusta tehdä (`PainaLaatat` palaa heti, koska veden juurta ei ole). Pakotettu = null (`-`), ja nosto on oletus
  0,4 m, koska kohdetta ei ollut. Peking puuttuu lisäksi `OletusKohteet`-listasta.
- Pekingin vesiväri on olemassa (Karttaseppä 10.10.: vallihauta, Beihai, Shichahai, Zhongnanhai; `VesiVari` vallihauta = 0,
  Beihai = 1). Vesiverkkoa (VesiVerkko-palat) Pekingille ei ole tehty.
- Lähteet, joilla peli ajettiin: kerros-app on käännetty commitista `dc48614fa` (Matkakirja-proto, haara
  linssiseppa/kerros-piilo-197). Tiedostojen versiot siinä commitissa:
  `KaupunkiVesi.cs` blob 7f43fb0075fa (6d793824d), `VesiIndeksi.cs` b603be78d41b (9ec2636f5),
  `CesiumOmatMallit.cs` d535aa88064a (f23d46f7f), `CesiumKaupunki.cs` 3e3638bc6804 (b68e0351e).

**V6/V7:n tumma pinta k5:ssä ei siis ollut pelin vettä.** Korjaan aiemman väitteeni (f8c315589 kohta 1, "V7:n peking_2_3:sta
näyttää puuttuvan vesipinta"). Se ei pidä, kolmesta syystä:
1. Paketit eroavat vain ruudussa 2_3. Rakennusloki: "eroavat V6:sta: peking_2_3_lod0/1/2"; muut 69 GLB:tä ovat
   V6:n lähde sellaisenaan.
2. Laskin k5:n etualan sijainnin kameran geometriasta (kohde 39.9150/116.3935, etäisyys 450 m, kallistus 78°, suunta 20°,
   pystykenttä 50°, kori peittää alaosan). Arvion mukaan etuala on noin lat 39.9127–39.9132, lon ≈ 116.392. Se on ruudun
   2_3 eteläreunan (39.9136) eteläpuolella, ruudussa **peking_2_2**, joka on molemmissa paketeissa sama. Epävarmuus on
   ±40 m, joten tämä on todennäköistä mutta ei varmaa. Samalla kohdalla on leikkauksen reikä, joka kulkee itä–länsi-suunnassa
   (lat 39.9130–39.9135, lon 116.3900–116.3921, ks. liitteen taulukko). Se on luultavasti Solin reikä 1 (way/638204006/7), eikä vallihauta.
3. **Kuvia ei otettu vasta latausten jälkeen.** Kamera odotti 16 s per kulma. Ensimmäinen kiinteä kamera saavutti 99 %
   laatoista vasta 41 s:ssa (V6) ja 82 s:ssa (V7). Myöhemmistä kulmista latausrivejä ei kirjattu. V6:n tumma ja sileä pinta
   sopii tilanteeseen, jossa Ionin maasto on ladattu mutta ilmakuva ei vielä. V7:ssä ilmakuva ehti latautua. Tämä on hypoteesi,
   ei todiste.

**KTX2-GLB:t:** tämän ajon muunnetut paketit (`_tyo/linssiseppa/peking360/v6/ktx` ja `…/v7/ktx`) **poistettiin
levysiivouksessa 17.10. klo 00.5x, eikä niitä ole enää**. Muunnetut hashit on siksi menetetty. Jäljellä on lähde ja
putken versiot:
- Lähde (T7): V6 = `…native51-groundao-v6/glb-v4/*` (kaikki 72). V7 = sama V6 ja ruudun 2_3 kolme tiedostoa kansiosta
  `…native51-groundpbr-v7/glb-v4/`, SHA-256 lod0 `b7fd08dde1ae86be…`, lod1 `65ec98b55dfe04b2…`, lod2 `26f9858e580e835f…`
  (rakennusskripti tarkisti nämä). V6:n 2_3: lod0 `be28e72d4768e173…`, lod1 `4365493041ef76b1…`, lod2 `8f9c06f18509cc31…`.
- Putki: `omat_mallit_tileset.py` (2f641e53c) → `omat_mallit_ktx2.py --normaali-max 1024` (f6f775947, sama commit kuin
  `omat_mallit_instanssit.mjs`) → `lisaa-ion-leikkaus.py` (kopioi `palatsialue-leikkaus-wgs84.geojson`:n 12 osaa
  mallit.json:n kenttään `ion_leikkaus`) → portti. Skriptit: `tyokalut/linssiseppa-ajot/rakenna-peking360.zsh` ja
  `rakenna-peking361.zsh`. Rakennusloki: 72 glb, 164,0 → 160,9 Mt, GPU 584,9 → 84,8 Mt, portti 0 virhettä.
  `ion-naytteet.json` tuli V7:ään V6:sta.
- Jos tarvitset muunnetut tavut, rakennan ne uudelleen samalla putkella. Kerro, niin hoidan. Ne eivät kuitenkaan ole
  dc48614f-ajon alkuperäisiä tavuja.

**Ion ja oma maa (sama ajo, sama tulos molemmissa paketeissa).** Mittauksessa oli 4 597 näytettä. Oma maa on mediaanissa
**5,43 m Ionin maaston alapuolella**, ja 4 319 näytteessä se on yli 0,3 m alempana. Suurimmat erot ovat leikkauksen reunoilla:
reuna 5 −20,46 m (39.912198/116.390829: oma 37,90 m, Ion 58,36 m), reuna 6 −19,79 m, palatsimaa −16,37 m,
`vesireuna-maa` −11,47 m (305 näytettä) ja `vesivaraus-kivi:marmori` −10,65 m. **Reiässä Ionin maasto piirtyy siis omalla
korkeudellaan, keskimäärin noin 5 m ja paikoin jopa 20 m oman maan yläpuolelle.** Tästä syntyvät "maastosaarekkeet".

**Saarekkeiden koordinaatit** (pistetesti leikkaustiedostoon, liite `leikkauksen-reiat-lat39912-39915.txt`):
- **k3:n pitkä kaistale:** lon 116.39250–116.39273, lat 39.9134–39.9146, leveys 20 m (eli 10 m:n puolileveys). Pohjoispäässä on
  levennys lat 39.9145–39.9147 × lon 116.3928–116.3934. Sijainti osuu k3:n kuvan keskiviivaan (kohde lon 116.3925).
  Ionin ilmakuvassa näkyy kaistaleen sisällä kapea muurien välinen uoma ja puurivi, joten todellinen uoma on selvästi
  20 m:ä kapeampi. Kaistale on ruudussa 2_3, joten reikä on luultavasti 6 tai 7.
- **Pienempi pala oikealla:** luultavasti itäinen käytävä lon 116.3945–116.3949 (lat 39.9134–39.9148) tai levennys
  116.3929–116.3934 (lat 39.9145). Rekisteröintiä pikseleistä ei tehty.

## 3. Seuraavat tehtävät (#361, omistajan 13.10. linjaus "Koko jatko heti")

Järjestys 1 → 3 ruudussa 2_3. Tehtävä 2 on erillinen, ja sen voi tehdä rinnakkain. Mikään tehtävä ei sisällä
kuvageneraatiota. Jokainen toimitus postiin kuten ennen; pelitestin teemme me.

**Tehtävä 1 – #361-V8a: k3:n leikkausrako omalla uomalla (ruutu 2_3)**
- Tuotos: ruudun `peking_2_3` kolme LOD-GLB:tä ja uusi `palatsialue-leikkaus-wgs84.geojson`. Niissä k3:n käytävä
  (lon 116.39250–116.39273, lat 39.9134–39.9147, levennys mukaan lukien) on korvattu omalla maalla ja kapealla uomalla.
  Uoman nimellinen märkä leveys on 4 m ja reunoilla kivimuurit; pohja on ≥ 1 m oletetun vedenpinnan alla (Valosepän
  sopimus 651ccbd3a, kohta 3b). Leveys on pelin päätös: merkitse se metadataan arvioksi, ei mittaukseksi. Ionin reikä kapenee
  uoman levyiseksi, tai se suljetaan, jos uoma on kokonaan omaa geometriaa. Itäinen käytävä (lon 116.3945–116.3949) korjataan
  samalla tavalla, jos lähde-ID:t osoittavat sen samanlaiseksi ojaksi. Samalla korjataan kiveyksen tumma pohjois–etelä-hiusviiva,
  jos syy on rako.
- Hyväksyntä: Solin unioni- ja reikäportti (yhtään lähdevesipolygonia ei peitetä ilman omaa korvaavaa geometriaa),
  72 GLB:n raakasumma ≤ 164 326 250 B, kuuden vakiokameran kuvat sekä yksi kuva ylhäältä k3:n kohdalta ennen/jälkeen.
  Pelissä k3:n pihalla ei saa näkyä Ionin ilmakuvaa.
- EI: reikiin 1–5 ja 8 ei kosketa; kiveyksen materiaali pysyy V7:nä; GLB:hen ei tule vesipintaa; korkeuksia tai DEM:ää
  ei muuteta; ei #362:ta.

**Tehtävä 2 – #361-V8b: vesistöjen korkeudet pelin vesikerrosta varten (vain data)**
- Tuotos: yksi `peking-vedet-korkeudet.json`. Mukaan tulevat vallihauta (way/4845030), kolme järveä (relation/5451458, 3531212
  ja 68127) sekä reikien 1–8 kartoitetut vesipolygonit. Kustakin: OSM-id, nimi, vedenpinnan korkeus samassa järjestelmässä
  kuin `laatat.json`:n `korkeus_ellipsoidi_m`, ero oman maan tasoon, rantamuurin yläreuna, tieto siitä, jatkuuko pohja tai
  ranta ≥ 1 m pinnan alle (ruuduittain kyllä/ei), sekä mallin vesialueen WGS84-polygoni.
- Hyväksyntä: kaikki edellä luetellut vesistöt ovat mukana; korkeudet ovat lähteestä ja arviot on merkitty; jokaisella
  rannalla pinta on oman maan alapuolella.
- EI: GLB-muutoksia, vesipintaa vientiin, Ionin tai DEM:n muutoksia eikä generointia. Vesiverkon ja indeksin tekee
  Karttaseppä ja pelikytkennän Linssiseppä.

**Tehtävä 3 – #361-V8c: G33:n luonteinen kiveys, rekisteröity (ruutu 2_3, tehtävän 1 päälle)**
- Tuotos: yksi materiaalisarja, jossa albedo, normal ja MR tehdään samasta kiviverkosta. Se synteesoidaan G33:sta
  kokonaisin kivin, ja G33 pysyy muuttumattomana lukulähteenä. Sarja kytketään 2_3:n kolmeen LOD:iin. Mukaan Blender-vertailu
  samoilla 15 kameralla, ja boundary-closessa ja south-boundaryssa V7, C7 ja uusi rinnakkain.
- Vaatimukset: (a) kivikoko on naapurin lähdekiveyksen mitattu koko ±10 %; (b) 20 m:n kaistoilla rajan molemmin puolin
  samassa valossa keskiluminanssin ero on ≤ 5 % ja lämpösävy lähteen mukainen; (c) kivien välinen vaihtelu on lähteen
  kaltaista (okraa ja sinertävää harmaata sekaisin), ei C7:n tasavärisoluja; (d) kulmat ovat terävämmät kuin G33:ssa;
  (e) siirtymä kulkee kivisaumoja pitkin ilman näytepaloja.
- Hyväksyntä: Solin menetelmällä toistotarkistus läpi; Astran kuvaportissa ei tilkkukaistaa eikä tasasoluja; tavuraja
  ennallaan. Sen jälkeen meidän pelitestimme k1/k2/k4 klo 13 ja 18.
- EI: uutta kuvageneraatiota (jos synteesi ei onnistu, raportoi), muutoksia naapuriruutuihin, C7:n solumaskeja,
  normaaleja tai MR-karttoja, eikä #362:ta.

## Kuittaus: codex-peking-tavoiteluuppi-20261014

- **Hoidettu:** tavoitepaketti ja kuusi havainnekuvaa (0fdf98c51) → PT:n tavoitepäätös 13d42da3d (ilma ja jingshan
  hyväksytty, neljä korjattavaa; rajat: siluetti-IoU ≥ 90 %, korkeus max(1 m, 5 %), mediaani ΔE00 ≤ 12) → korjaukset
  d69100cd8, jotka PT hyväksyi 8e3bf535b (4/4) → mallikierrokset v11 (40c32bd4a) ja PT261/round10 (9d1f55767).
- **Korvautuu #361-linjalla:** kierrosten sisältö (pinnat, kiveys, vesi, saumat) jatkuu #361:n rajattuina tehtävinä.
  #361:n kuusi vakiokameraa (ilma, aukio, beihai, jingshan, hutong_ilma, taihedian) ovat tavoitekuvien kulmat, joten ne
  korvaavat luupin vertailuarkin. Pelinäkymän tarkistus tulee meiltä.
- **Jää auki:** numeerisia lukuja tavoitekuvia vastaan (IoU, korkeusero, ΔE00) ja kierroslokia ei ole tullut #361:n
  toimitusten mukana. Liitä V8:n toimitukseen kuuden vakiokameran luvut, yksi rivi per kamera; erillistä kierrosta niitä
  varten ei tarvita. Lopullista "valmis"-hyväksyntää ei ole annettu, ja Peking pysyy OFFGAME.

Seuraavaksi Linssiseppä: ajan nykyisellä V7:llä k3/k5-uusinnan niin, että kuva otetaan vasta kun laatat ovat 99 %
ladattuina, ja kytken kerroksia (peking_2_2, Omat) k5:n etualan vahvistamiseksi. Lisäksi pyydän PT:n kautta Karttasepältä
Pekingin vesiverkon ja indeksirivin heti, kun tehtävän 2 korkeudet tulevat, ja lisään pelin puolelle Pekingin vesikohteen
(piilokaupungin Pakotettu tai OletusKohteet).
