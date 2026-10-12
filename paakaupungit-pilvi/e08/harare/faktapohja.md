# Harare — faktapohja 0–9, vaihe A

Erä e08, id `harare`, maa ZWE. Luettu **12.10.2026**. **A partial:** osiot 0–9, neljä kansiaihetta, neljä luontoaihetta ja viisi nykyopasjaksoa koottu. Historian ytimen 6–8 kohteen karttaportti on auki: omia rakennuspisteitä löytyy, mutta Africa Unity Squaren, Harare Gardensin ja Kopjen omia WP/WD-pisteitä ei saatu; rakennusten nykyisten osien tekijäketjuja ei hyväksytä oletuksin. Puutarhan/luontoalueen identiteetti voi olla oikea, vaikka se jää ydinkartan ulkopuolelle.

**Sää osittain varmennettu:** WMO:n alkuperäinen Harare Kutsaga -aineisto, 1961–1990, varmentaa ylimmät/alimmat lämpötilat ja sateen **36/48** kuukausiarvolle. Vuorokauden keskilämpö on siinä `null`; poiminnan erillistä NOAA-keskilämpölähdettä/asemaa ei saatu luettua. **Ei aste-/mm-lukuja uusiin lukijateksteihin ennen pääsession ratkaisua.** `saa.json`:ia ei muutettu. Tämä ei ole hylkäyspäätös, vaan nimetty lähdeportti.

Ei kuvia valittu, sisältö-JSONia, Git-operaatioita tai muiden kaupunkien muutoksia. Kaikki aineisto NASilla. A ei anna rakennus-/taideteoskuville lupaa tai julkaisuhyväksyntää.

## 0. Luetut lähteet, toisto ja 1873-kehys

Luettu e08:n `AGENTS.md`, `paakaupungit-pilvi/CODEX.md`, PILVIOHJE 3/4/7/A/LISÄSÄÄNTÖ, lehtityöresepti, kaupunkilehden kuvat/mitat, spec-mantereiden yleislinjat ja Nairobi-mallin rakenne. Hararen konteksti/sää sekä e08:n TILANNE, SAA-VALMISTELU ja SAA-LAHDEHYLKAYKSET luettu. E08:n raportti viittaa #74:n kaupallisen FOP:n teostyyppikohtaiseen tarkistukseen; A ei kuittaa sitä eikä kuvan omaa lisenssiä ratkaistuksi.

Raakalähteet, tekstipoiminnat, entiteetit ja metat NAS-kansiossa `valiaikainen/harare-A/`; `lahteet.json` sisältää **40 onnistunutta tallennetta**. Yhteinen `sallittu_haku.py`, robots ennen polkua/ohjausta, 1 pyyntö/s -lukko ja lähdevarasto. Omistajan hyväksymät sallitut alkuperäiset lähdesivut estettyjen rajapintojen sijasta. Ei `/w/`, `/api/`, User-Agent-vaihtoa, varmenteen poistamista tai estettyjen lähteiden kiertoa.

### Wikipedia

| Tunnus | Alkuperäinen lähde | Revisio | Luettu osuus / raja |
|---|---|---|---|
| S1 | [Harare](https://en.wikipedia.org/wiki/Harare) | en 1379344630 | History, Geography/Suburbs/Climate ja viitteet, Transport; poliittiset nykyosiot eivät nostoiksi; artikkelilla lisälähdevaroitus |
| S2 | [Timeline of Harare](https://en.wikipedia.org/wiki/Timeline_of_Harare) | en 1270281628 | varhainen taajama, museo-/kaupunkikehitys; ei täsmävuosien automaattinen riippumaton vahvistus |
| S3 | [Mbare, Harare](https://en.wikipedia.org/wiki/Mbare,_Harare) | en 1350144481 | `Mbare` ohjautuu oikeaan kaupunkiosaan; historiallinen Harari-nimi, sijainti, maataloustuotteet; politiikka, häädöt ja asumislukujen draama pois |
| S4 | [Mbare Musika](https://en.wikipedia.org/wiki/Mbare_Musika) | en 1341469428 | tori-/jakelukeskus ja maaseutubussien solmukohta, oma piste |
| S5 | [National Archives of Zimbabwe](https://en.wikipedia.org/wiki/National_Archives_of_Zimbabwe) | en 1363572716 | dokumentoidun historian kokoelma, audiovisuaali- ja suullisen historian ohjelmat; kuvan **galleriakuvateksti** ei arkistotalon tunniste |
| S6 | [Reps Theatre](https://en.wikipedia.org/wiki/Reps_Theatre) | en 1372331834 | harrastajaseura, henkilöstö/tekijät, vanhat eri esityspaikat; alkuperäinen yhtiö ei sama kuin nykyinen talo; lisäviitteiden tarve |
| S7 | [Zimbabwe Museum of Human Sciences](https://en.wikipedia.org/wiki/Zimbabwe_Museum_of_Human_Sciences) | en 1344740432 | antropologia/arkeologia, kokoelmat, oma piste, nimihistoria; museon perustamisvaihe ja nykyinen rakennus erotetaan |
| S8 | [Jacaranda mimosifolia](https://en.wikipedia.org/wiki/Jacaranda_mimosifolia) | en 1378925905 | alkuperä, kukat, lehdet ja siemenkota; ei lääke-/lämpötilasieto-/kokolukuja |
| S9 | [Brachystegia spiciformis](https://en.wikipedia.org/wiki/Brachystegia_spiciformis) | en 1314558621 | msasan nuoret lehdet, yhdistelmälehdet, kukat/palot ja levinneisyys; puulajin artikkelilla lähdevaroitus |
| S10 | [Delonix regia](https://en.wikipedia.org/wiki/Delonix_regia) | en 1372334309 | Madagaskar-alkuperä, punertavat kukat, lehdet ja palot; muiden maiden kukintakalenteri ei Harareen |
| S11 | [National Botanic Garden (Zimbabwe)](https://en.wikipedia.org/wiki/National_Botanic_Garden_(Zimbabwe)) | en 1276902118 | puutarha ja herbaario, kasvialueet, oma piste; epävarmat prosentit, pinta-ala ja perustamisvuosi pois lukijatekstistä |
| S12 | [Mukuvisi Woodlands](https://en.wikipedia.org/wiki/Mukuvisi_Woodlands) | en 1373104634 | luontoalue, polut/katselulavat, oma WP-piste; rikos-/salakaato-/häädöt pois |
| S13 | [Cathedral of St Mary and All Saints, Harare](https://en.wikipedia.org/wiki/Cathedral_of_St_Mary_and_All_Saints,_Harare) | en 1366918563 | suunnittelu/rakennusvaiheet, oma piste, myöhemmät seinämaalaukset; kirkollinen nykykiista pois |
| S14 | [Herbert Baker](https://en.wikipedia.org/wiki/Herbert_Baker) | en 1376017930 | 1940-luvun kuolema ja Salisbury-katedraali työluettelossa; alkuperäinen arkkitehti ei myöhempien kuvattujen osien automaattinen tekijä |
| S15 | [National Gallery of Zimbabwe](https://en.wikipedia.org/wiki/National_Gallery_of_Zimbabwe) | en 1379622383 | oma Hararen piste, instituutio ja arkkitehtuuria koskevan attribuution raja; Shona-veistäjätarinat varattu maalehdelle |
| S16 | [Greenwood Park, Harare](https://en.wikipedia.org/wiki/Greenwood_Park,_Harare) | en 1145448445 | **puisto sekä kaupunginosa samalla nimellä**, rakennetun alueen historia; oma puistopiste ei sulkeutunut |
| S17 | [Causeway, Harare](https://en.wikipedia.org/wiki/Causeway,_Harare) | en 1348566156 | hallintoalue/kuivatus ja Kopjen ympäristö; artikkeli ei ole yksittäisen aukion/rakennuksen koordinaattilähde |
| S18 | [Robert Gabriel Mugabe International Airport](https://en.wikipedia.org/wiki/Robert_Gabriel_Mugabe_International_Airport) | en 1372870055 | nykyinen nimi/HRE ja kansainvälinen lentoasemarooli; ei reittilupauksia |
| S19 | [Balancing Rocks](https://en.wikipedia.org/wiki/Balancing_Rocks) | en 1358225109 | luettu retkipaikan erotteluun; Epworthin kalliot eivät ydinkeskustan Kopjen piste |

### Nykyopas ja alkuperäiset lisälähteet

| Tunnus | Lähde | Luettu osuus / rooli |
|---|---|---|
| O1 | [Harare, Wikivoyage](https://en.wikivoyage.org/wiki/Harare) | en 5383924; perille/liikkuminen, nähtävä/ruoka; vanhat hinnat, palveluajat ja omat pisteet eivät hyväksyttyyn karttaan |
| O2 | [UM: Zimbabwe, matkustustiedote](https://um.fi/matkustustiedote/-/c/ZW) | fi **18.9.2026**, luettu 12.10.2026; **Noudata erityistä varovaisuutta**, kuljetus, pimeä, vesi/terveys, kuvaus, käteinen/valuutta ja maahantulo |
| P1 | [Flora of Zimbabwe: National Botanic Garden, Harare](https://www.zimbabweflora.co.zw/speciesdata/location-display.php?location_id=21) | paikallisen kasvitietokannan tekijöiden havaintoja: alkuperäinen miombo, istutettu kokoelma, eri kasvupaikat ja herbaario; kuvattujen istutusten alkuperäisyydestä olennainen rajaus |
| P2 | [Airports Company of Zimbabwe: Robert Gabriel Mugabe International Airport](https://www.acz.co.zw/airports/tour/robert-gabriel-mugabe-international-airport) | nykyinen virallinen nimi, HRE/FVRG, kansainväliset/kotimaan terminaalit ja kuljetuspalveluroolit; hinnat/määrät ja koko-/kapasiteettien superlatiivit pois |
| P3 | [City of Harare: Mukuvisi Woodlands](https://www.hararecity.co.zw/places/tour/7/mukuvisi-woodlands) | kaupungin nykyinen paikkasivu, miombo/msasa, eläinlajit, ympäristötoimijat ja katselulava; vanhat/tarkat vierailuajat jätetään pois |
| P4 | [About Reps](https://www.reps.co.zw/About.html) | nykyiset harjoitus-/nuorisoryhmät, puvusto ja erilaiset näyttämö-/harjoitustilat; ei aikataulua, istuinlukua tai suoraa osallistumislupausta |
| P5 | [WMO World Weather Information Service: Harare](https://worldweather.wmo.int/en/city.html?cityId=263), alkuperäinen [kaupunkidata](https://worldweather.wmo.int/en/json/263_en.json) | stationName **Harare Kutsaga**, kaupungin/meteorologisen aseman data −17.92/31.13; climate datab/datae **1961/1990**; max/min/rainfall ja meanTemp:null luettu |
| P6 | [National Archives of Zimbabwe](https://www.archives.gov.zw/) | palauttaa **maintenance mode** -sivun: ei nykyistä kokoelma-, pääsy- tai palveluaikavahvistusta |
| P7 | [City of Harare, virallinen etusivu](https://www.hararecity.co.zw/) | paikkojen/virallisen sivuketjun tunnistus; vanha elokuun vesikatkoilmoitus ei tämän päivän katkosväite |

Wikidata-haut tehtiin omilta WP-sivuilta luetuilla tunnuksilla: **Q6971101** botanic, **Q28147101** katedraali, **Q31960760** Mukuvisi, **Q8071996** museo, **Q2860554** arkisto, **Q108365992** Greenwood, **Q6799631** Mbare Musika, **Q4113712** galleria, **Q382771** Baker. Raaka P625/P31/P84/P170/P570 ja revisiot tallennettu `Q…-meta.json`:iin; oma piste ei tarkoita porttipistettä. Katso paikkaroolit osiossa 5.

### Lähdeongelmat — eivät ratkaistuja lähteitä

- `Harare Gardens`, `Africa Unity Square`, `African Unity Square`, `Harare Kopje` ja `Harare railway station` palauttivat en-WP:stä 404. Ei omaa artikkelia tai pistettä keksitty.
- `Book Café` ohjautui yleiseen **Coffeehouse**-artikkeliin. Sitä ei käytetä Hararen kulttuuripaikan lähteenä.
- Arkiston virallinen sivu on ylläpitotilassa. Repsin luettu About on nykyinen toimintasivu, ei historiallisen vuosiluvun toinen riippumaton todiste.
- Mukuvisin ylläpitäjän sivu/home pysähtyi uudelleenohjaukseen yhteisessä robots-/hakuketjussa. P3 on onnistuneesti luettu nykyinen kaupungin paikkasivu.
- WMO:n vanha WP-viite `https://worldweather.wmo.int/130/c00263.htm` palautti 404. P5:n nykyinen saman cityId:n sivu ja alkuperäisdata ovat luetut lähteet.
- NOAA:n WP-viite on FTP-polku `…/GCOS/WMO-Normals/TABLES/REG__I/ZI/67775.TXT`. Samaa polkua ei saatu HTTPS:na luettua; NCEI:n 1961–1990-perinnepolku ja hakemisto palauttivat 404. **Ei väitettä NOAA-keskilämpöjen alkuperäisen aseman lukemisesta.**
- DWD:n humidity-viite koskee 1954–1975, MeteoClimat ääriarvoja. Näitä ei haeta kiellettyä polkua kiertäen, eivätkä ne ratkaise valitun keskilämpörivin asemaa.
- A:ssa ei Commons-hakua, kuvatiedostoa tai kuvan lisenssiratkaisua.

### 1873-kehys ja toisto

**Vuonna 1873 ei ollut tätä Fort Salisburysta kasvanutta kaupunkia.** Moderni taajama perustettiin 1800-luvun lopulla, myöhemmin nimettiin Harareksi. S1 liittää nykyisen nimen Kopjen lähellä sijainneeseen Shona-päällikkö Neharawan kylään. Tätä ei tulkita väitteeksi, että alue oli tyhjä ennen siirtokuntaa. S1/S17 kuvaavat varhaisen modernin taajaman ympäristöä huonosti kuivatuksi; juuri vuoden 1873 kylän rakennuksia, asukasrajaa tai yhtä tiettyä luontokasvia ei tässä varmennettu.

Nykyinen kaupunkiaukio, puistopalvelut, museo-/arkistolaitokset, teatteri, kasvitieteellinen kokoelma ja lentokenttä ovat myöhempiä. Luonnon kallio tai puulajin esiintyminen alueella ei tarkoita, että nykyinen nimetty puisto tai istutettu yksilö olisi ollut samanlainen 1873. Ei isoisän vierailua, päiväkirjatekstiä tai reittiä.

Kontekstin **kaikki maalehden otsikot ja lähinosto luettu**. Pois varattuina: vanhat valtakunnat/Mzilikazi, Nehanda-meedio, maan nimen valinta, Frank McEwenin veistäjäetsintä/Tengenenge/veistäjien kivitarinat/Rodin-näyttely, mbira/pullonkorkit/Stella Chiweshe/hiiritanssi/jit, sadzan kaksi ateriaa/mopanit/kapentan lamppukalastus/maapähkinäpavut, olympialaiskutsu/krikettimaaottelu/Bulawayon Valioliigapelaaja/Kirsty Coventryn mitalit sekä **Ruddin myönnytys 1888**. Uudet nostot ovat kaupungin tori- ja dokumentointitoiminnot, harrastajateatteri ja paikallisen kasvillisuuden tunnistaminen. Ruoka esiintyy lyhyesti nykyoppaassa, ei uudelleen maalehden nostotarinoina. Kansallisgalleria karttaehdokkaana ei avaa uudestaan veistäjäkertomusta.

## 1. Perusfaktat

- Harare on **Zimbabwen pääkaupunki**, maan koillisosassa Mashonalandin Highveld-ylängöllä. Ei Etiopian Harar. [S1]
- Pelin yleispiste **−17.82900, 31.05200**, Q3921. Se ei ole puistojen, museon tai lentokentän piste. [konteksti]
- Moderni kaupunki syntyi **1800-luvun lopulla** British South Africa Companyn siirtokunta-/linnoituspaikaksi ja tunnettiin Salisburyna. Harare-nimi tuli **1980-luvun alussa**. [S1/S2; konteksti sisältää tarkat vuodet, lukijateksti käyttää yleistä kehystä]
- Nimen taustalla S1 kuvaa Shona-päällikkö Neharawan kylää. Neharawa ei ole sama nimi/henkilö kuin maalehden Nehanda-meedio; henkilötarinaa ei tehdä siitä. [S1]
- Kontekstin väestö: **1 491 754, Harare Urban -kaupunkipiiri, 2022**, ZIMSTAT/City Population. Lukijamuoto **noin 1,5 miljoonaa asukasta Harare Urban -piirissä vuoden 2022 laskennassa**. Suurempi metropolitan-provinssi käsittää myös muita kuntia; S1:n ristiriitaisia infobox/intro- ja ennustelukuja ei sekoiteta tähän.
- Ylänkö selittää sijaintikehyksen; tarkkaa 1 483/1 490/1 500 m lukua ei tarvita eikä lentoaseman korkeutta käytetä koko kaupungille. [S1/konteksti]
- Oppaan maksut: UM:n mukaan paikallinen **ZiG ja Yhdysvaltain dollari** ovat käytössä, käteistä tarvitaan ja korttimaksu-/nostomahdollisuus voi olla rajattu. Ei valuuttakurssia, keksittyä hinnastoa tai automaattista vaihtolupausta. [O2]

## 2. Kansi — johdantoaihio ja 4 aihetta

**Johdantoaihio:** Hararen leveät kadut ja puiden reunustamat korttelit kuuluvat nuoreen ylänköpääkaupunkiin. Kaupungin historiaa voi tarkastella erilaisten kokoelmien kautta: arkisto säilyttää dokumentteja ja haastatteluja, museo esineitä. Mbare Musikassa kohtaavat maaseudun tuotteet ja liikenne, ja teatterissa näyttämön taakse kuuluu myös vapaaehtoisia tekijöitä. [S1/S4–S7]

### K1 — Tori, jonka vierestä lähdetään maaseudulle

**Wiki:** `Mbare Musika`. Faktat [S3/S4]:

1. Mbare Musika on Hararen **Mbaren kaupunginosassa**, keskustan eteläpuolella.
2. Tori toimii vihannesten ja hedelmien kaupankäyntipaikkana.
3. Se on myös maataloustuotteiden jakelukeskus; viljelijät tuovat tuotteita eri puolilta maata.
4. Sama paikka on maaseudulle suuntautuvan ja sieltä tulevan bussiliikenteen solmukohta.
5. Tori ja siihen liittyvä liikenne tekevät kaupungin ja ympäröivän maaseudun yhteyden konkreettiseksi; ei päätelmää yhden tietyn linjan tuotteista tai nykyisestä liikennöintiaikataulusta.
6. Mbare tunnettiin aiemmin nimellä **Harari**; kaupunginosan historia on eri asia kuin modernin pääkaupungin perustaminen.

**Raja:** ei ”maan suurin/ainoa” -superlatiivia, tarkkoja koju-/viljelijämääriä, torin nykykatoksen rakentamisvuotta, häädön tai palon tarinaa. Vanha torirooli ei todista tämänhetkistä pääsyä/uutta rakennusta. Nykyopas ei suosittele combi-bussia UM:n vastaisesti.

### K2 — Arkistoon mahtuu myös ääni

**Wiki:** `National Archives of Zimbabwe`. Faktat [S5]:

1. Kansallisarkisto sijaitsee Hararessa ja säilyttää maan dokumentoitua historiaa.
2. Kokoelmissa on myös entisen Etelä-Rhodesian asiakirjoja; nykyinen nimi ei aloita kokoelmien aikajanaa alusta.
3. Laitos syntyi **1900-luvun alkupuolella** ja toimi myöhemmin federaation keskisenä arkistovarastona.
4. Arkistossa on audiovisuaalinen yksikkö, joten historialähde voi olla kuvan tai tekstin lisäksi ääntä/liikkuvaa kuvaa.
5. Suullisen historian ohjelma kerää ja säilyttää haastatteluja ihmisiltä, joiden panos historiaan on jäänyt vähälle dokumentoinnille.
6. Arkistolla on myös yhteisöarkistojen toimintaa; ei väitettä, että kaikki aineisto on verkossa, tekijänoikeudeton tai vapaasti kopioitava.

**Imu:** paperi ei ole ainoa muistamisen väline. Arkiston ylläpitotilassa oleva virallinen sivu ei todista nykyistä käyntiaikaa. Ei tarkkoja aineisto-/aluearkistomääriä, arkiston johtajien paremmuuslistaa tai kuviteltua haastattelua/sitaattia.

### K3 — Harrastajateatterin ammatillinen arki

**Wiki:** `Reps Theatre`. Faktat [S6; P4 nykytoiminta]:

1. Reps, myös The Repertory Players, on Hararen teatteri ja teatteriseura.
2. Se lähti **1900-luvun alkupuolella** näytelmien lukuryhmästä esitystoimintaan.
3. Esityspaikat vaihtuivat ennen nykyistä teatteria: S6 nimeää Duthie Hallin, koulun salin ja myöhemmän vanhan näyttelyalueen hallin.
4. Seuran näyttelijöitä ja teknisiä tekijöitä kuvataan vapaaehtoisiksi; teatterissa on samalla palkattuja toiminnan työntekijöitä. Harrastajateatteri ei tarkoita, ettei siellä tehtäisi järjestelmällistä työtä.
5. P4 kertoo erikokoisista näyttämö-/harjoitustiloista ja puvustotoiminnasta.
6. P4 esittelee nuorempien ja teini-ikäisten ryhmiä näyttämötaitojen harjoitteluun; ei niiden tämän viikon aikataulun tai osallistumispaikan lupausta.

**Raja:** tarkat ensi-iltavuodet, jäsen-/esitysmäärät, istuinluvut ja maksut pois. Historiallinen erottelukäytäntö voidaan tarvittaessa käsitellä neutraalisti, mutta nosto ei tarvitse rotuerottelun käymäläkiistan yksityiskohtia. Seuran perustamisikä ei tee nykyisestä rakennuksesta/puvustosta suojatonta. Ei julisteen tai lavastuksen kuvalupaa A:ssa.

### K4 — Kaupunki on esineitään nuorempi

**Wiki:** `Zimbabwe Museum of Human Sciences`. Faktat [S7]:

1. Hararen human sciences -museo keskittyy antropologiaan ja arkeologiaan.
2. Sen aiempi nimi oli **Queen Victoria Museum**; nimi vaihtui itsenäisyyden jälkeen.
3. Kokoelmiin kuuluu etnografista ja arkeologista aineistoa; museon esineiden historia ei ala modernin Hararen perustamisesta.
4. S7 kuvaa museon kirjastoa, näyttelygallerioita ja Shona-kylän mallia. Malli ei ole vuonna 1873 paikalle säilynyt kylä.
5. Museossa esitellään myös luonnonhistoriallisia aineistoja/eläinnäyttelyitä; ei nykyistä lajiluetteloa ilman päivittynyttä ylläpitäjälähdettä.
6. Nykyinen museo sijoitetaan Civic Centreen Rotten Row’n/Samora Machel Avenuen kulmalle. Oma koordinaatti on nykyisen laitoksen piste, ei todiste jokaisesta vanhasta museotalosta.

**Raja:** raamatulliseen arkkiin rinnastetun Ngoma Lungundun väitetty ikä/”vanhin esine” jätetään pois, samoin esineen pyhyyden oma tulkinta. S7:n **James Cope Christie / 1903** -lauseessa museon historia ja nykyinen rakennus voivat sekoittua: ei tämän perusteella nykyjulkisivun vuosilukua tai tekijäsuojan hyväksyntää. Alkuperäistä nykyisen rakennuksen ketjua ei tässä suljettu.

## 3. Teemasivu — luonto, 4 aihetta ja minitehtävä

**Vakioaihe/id:** `luonto`. **Nimi:** ”Lehti vai kukka?” Johdantoaihio: Hararen puiden värit eivät aina tule kukista. Paikallisen msasan uudet lehdet voivat olla punaisia, kun taas tutut jakarandan violetit kukat kuuluvat muualta tuodulle puulle. Kasvitieteellinen puutarha auttaa näkemään myös lajeja, joiden luonnollinen kasvupaikka on kaukana kaupungista. [S1 Climate/S8–S11/P1]

### H1 — Msasan punainen on uusi lehti

**Wiki:** `Brachystegia spiciformis`. Faktat [S1 Climate; S9 johdanto/Appearance/Ecology]:

1. Msasa, **Brachystegia spiciformis**, kuuluu eteläisen/itäisen Afrikan puustoon ja Hararen ympäristön avointen metsien lajistoon.
2. Uudet lehdet voivat olla viininpunaisia, meripihkan värisiä tai ruskehtavia ennen vihertymistä.
3. Tässä värissä ei ole kyse violetista jakarandakukinnasta eikä syksyllä kuivuvasta lehdestä, vaan lehtien uudistumisesta.
4. Lehdet ovat yhdistelmälehtiä; vihreät kukat ovat lähteen kuvauksessa pieniä ja tuoksuvia.
5. Msasa on palkokasvi ja sen palot avautuvat levittämään siemeniä. Ei siemenlukuja, senttimetrejä tai leviämismatkaa.
6. S1 kuvaa paikallisen maiseman uuden lehdistön värejä loppukuivan kauden vaiheessa; yksittäisen puun täsmäpäivää ei luvata.

**Imu:** kaukaa nähty punainen puu voi olla lehdessä, ei kukassa. Ei ilmastolukuja puulajin lämpö-/saderajoista, puutavaran käsittelyä, kansanlääkintää tai muiden maiden suojelustatuksen siirtämistä Harareen.

### H2 — Violetti tuttu on eteläamerikkalainen

**Wiki:** `Jacaranda mimosifolia`. Faktat [S1 Climate; S8 johdanto/Description/Habitat]:

1. Sinijakaranda, Jacaranda mimosifolia, on alkuperältään **Etelä-Amerikasta**, ei Hararen alkuperäinen miombopuu.
2. Sitä on istutettu laajalti koristepuuksi violettien kukkien vuoksi; Hararen katujen jakarandat ovat tuotuja istutuksia.
3. Sen lehdet ovat kaksinkertaisesti parilehdykkäisiä, hentoja ja lehdyköihin jakautuneita.
4. Kukinnan jälkeen muodostuu puutuneita siemenkotia, joissa on litteitä siivellisiä siemeniä.
5. Yleisnimi jacaranda voi viitata sukuun; artikkelin tarkka lajiaihe on J. mimosifolia.
6. Kotiseudun luonnonkannan tila ja kaupungin runsaat istutukset ovat eri asioita. Vieraassa kaupungissa kasvava koristepuu ei yksin kerro alkuperäisen luonnonkannan yleisyydestä.

**Raja:** Hararen kukinta-ajasta voidaan antaa S1:n yleinen kevät/loppukuivan kauden kehys, ei taattua kukintamatkaa tai esitettyä yksilömäärää. Ei muun kaupungin jakarandakatua Harareksi, eikä nimettömästä puukuvasta varmaa lajintunnistusta.

### H3 — Liekkipuu ei ole punainen jakaranda

**Wiki:** `Delonix regia`. Faktat [S1 Climate; S10 johdanto/Description/Distribution]:

1. Liekkipuuksi/flamboyantiksi kutsuttu **Delonix regia** on alkuperältään **Madagaskarista**.
2. Se on eri laji ja kasviryhmä kuin J. mimosifolia, vaikka molempia käytetään lämpimien alueiden koristeistutuksissa.
3. Sen kukat ovat tavallisesti oranssinpunaisia/punaisia; S10 mainitsee myös keltaisia muotoja, joten joka yksilön väriä ei päätellä yhdestä kuvasta.
4. Lehdet koostuvat monista pienistä lehdyköistä ja näyttävät höyhenmäisiltä.
5. Pitkät palot muuttuvat kypsyessään tummiksi ja puutuneiksi; siemenkotaa ei kutsuta jakarandan pyöreäksi kodaksi.
6. S1 nimeää liekkipuun Hararen katujen koristepuiden joukossa jakarandan rinnalla. Madagaskar-alkuperä ei tee Hararen istutetusta puusta luonnonvaraista paikallista yksilöä.

**Raja:** ei Intian kukinta-/lehdettömyyskalenteria Harareen, palon pituuslukua, löytövuotta tai luonnonkannan uhanalaisuusluokan sisäisiä ristiriitoja nostoihin. Kuvateksti tunnistaa todellisen lajin vain B:n näkemästä todistetusta kuvasta.

### H4 — Istutuskokoelma ei ole levinneisyyskartta

**Wiki:** `National Botanic Garden (Zimbabwe)`. Faktat [S11; P1]:

1. Kansallinen kasvitieteellinen puutarha sijaitsee **Alexandra Parkissa**, pohjoisempana kuin vanha CBD.
2. Samalla alueella on **kansallinen herbaario**; elävä puutarha ja säilytetty kasvikokoelma ovat eri kokoelmarooleja.
3. Puutarhan taustalla on Highveldin miombometsäympäristö; P1:n havaintojen mukaan osia alkuperäisestä kasvupaikasta on säilynyt.
4. Suurille osille aluetta on luotu puistomaisia ja eri kasvien kasvupaikkoja jäljitteleviä ympäristöjä.
5. Harvinaisia tai muualla kaukana kasvavia lajeja voidaan kuvata istutuskokoelmassa, jolloin kukat ja hedelmät ovat tutkimuksen nähtävillä.
6. P1 huomauttaa, ettei tällainen istutushavainto välttämättä ole todistus lajin luonnonvaraisesta esiintymisestä juuri Zimbabwessa.
7. S11 kuvaa kotimaisia ja ulkomaisia kokoelmia; ei laji-/habitaattiprosentteja tai pinta-alaa, jotka tämän kierroksen lähteet eivät tue kahdesti.

**Raja:** aidon luontopaikan piste on puutarha-alueen piste, ei herbarium-rakennuksen sisäänkäynti. P1:n kasvihuone-/rakennuskuva ei anna rakennuksen tai sen sisällä olevan teoksen oikeutta. Puisto ei muutu historialliseksi ydinkohteeksi sillä, että se mahtuu kaupungin hallintorajoihin.

### Minitehtävän pohja

**Aihe:** H1, nuoren msasan lehden tunnistus. ”Mistä msasan viininpunainen sävy voi tulla?”

- Oikea: **uusista lehdistä**.
- Muut erilaiset vaihtoehdot: violeteista kukista / kypsistä hedelmistä / rungon kaarnasta.
- H1 sisältää vastauksen. C muotoilee tiedon omin sanoin eikä kopioi faktavirkeä. Ei esitetä palkkiota, isoisän ääntä tai toisteta osion 6 visa-aiheiden vastausta.

## 4. Nykyopas — 5 jaksoa

**O2 18.9.2026: Noudata erityistä varovaisuutta.** Opas sanoo tämän lyhyesti ja kertoo valmistautumisesta. Se ei sisällä nykyistä poliittista analyysia, rikostapausten tarinoita tai turvallisuuslupausta.

### O1 — Perille ja turvallinen liikkuminen

- Lentoasema **Robert Gabriel Mugabe International Airport (HRE)**. Nykyinen nimi/IATA ja matkustajarooli varmennettu P2/S18:sta. Nimen taustahenkilöä ei avata politiikkanostoksi.
- Kentällä on kansainväliset ja kotimaan terminaalit sekä operaattorin luettelemia taksi-/vuokra-auto-/kuljetuspalveluita. Kuljetus sovitaan luotettavan toimijan/majoituksen kanssa; ei hintaa tai minuuttimäärää. [P2]
- Vasemmanpuoleinen liikenne. UM pitää liikennettä tärkeänä vaaratekijänä, neuvoo välttämään pimeällä ajoa erityisesti kaupungin ulkopuolella ja sanoo bussien/combi-minibussien turvallisuustason heikoksi. Ei halvimman toribussin suositusta. [O2]
- Hararen vanhaa rautatiehistoriaa ei kirjoiteta nykyiseksi matkustajaliikenne-/kenttäjunapalveluksi. [S1/O1; nykyinen palvelu ei tässä suljettu]

### O2 — Keskustan erilaiset muistipaikat

- Vanha CBD, Africa Unity Square, Harare Gardens ja Kopje kuuluvat kaupungin keskisen alueen paikkakuvaukseen. Ne auttavat hahmottamaan nykykaupunkia, mutta opas ei lupaa ympärivuorokautista puistopääsyä tai määritä itse kävelyreittiä. [S1/O1/S17]
- Human Sciences -museo kertoo arkeologiasta ja antropologiasta; käynti, näyttelyt ja kuvaaminen tarkistetaan ylläpitäjältä. [S7/O1]
- Anglikaaninen St Mary and All Saints on toimiva kirkko, ei sama kuin kaupungin katolinen katedraali. Käynti sovitetaan kirkon toimintaan. [S13]
- Maalehti avaa kansallisgallerian taidehistoriaa; nykyopas voi mainita gallerian lyhyesti toistamatta veistäjätarinoita tai antamatta näyttelyteosten kuva-/kopiolupaa. [S15/konteksti]

### O3 — Puita ja luontopäiväretki

- Kasvitieteellisessä puutarhassa elävä kokoelma ja säilynyt miombo liittyvät toisiinsa; puutarha sijaitsee Alexandra Parkissa keskustan pohjoispuolella. [S11/P1]
- Mukuvisi Woodlands on oma luontoalue kaupungin itäpuolella. Kaupungin nykyinen paikkasivu kuvaa katselulavaa, paikallisia puita ja muun muassa seeproja, kirahveja ja antilooppeja. Ei lupausta nähdä tiettyä eläintä tietyllä kellonlyömällä. [S12/P3]
- Nämä ovat ydinkeskustasta erillisiä kohteita; ei kaupungin kokoista ”helppoa kävelykierrosta”. Pääsy-/opastusjärjestelyt tarkistetaan kohteelta.
- Epworthin Balancing Rocks on eri retkipaikka kuin Kopjen kukkula; sama kivisanasto ei tee niistä samaa sijaintia. [S19/S1]

### O4 — Syöminen ja asiointi

- Hararen ruokapaikoissa voi syödä Zimbabwen tuttuja ruokia ja muiden keittiöiden annoksia; sadza mainitaan tarvittaessa lyhyenä ateriasanana. Sen resepti-/kapenta-/mopanit-/maapähkinätarinat on jo varattu maalehdelle. [O1/konteksti]
- Mbare Musika on tuotteiden ja liikenteen solmupaikka, ei automaattinen ravintola- tai turvallisuussuositus. [S3/S4/O2]
- UM neuvoo käyttämään pullotettua juomavettä ja huolehtimaan käsihygieniasta. Ei oman puutarha-/pohjavesitiedon perusteella juomakelpoisuutta. [O2]
- ZiG ja Yhdysvaltain dollari ovat UM:n mukaan käytössä. Käteiseen varaudutaan, kortin toimintaan tai nostoon ei luoteta kaikkialla. Muuttuvat tuonti-/vientiehdot ja maksut tarkistetaan viranomaiselta. [O2]

### O5 — Ajankohta ja valmistautuminen

- S1:n laadullinen ilmastokehys: eteläisen pallonpuoliskon kesä on sateinen, keskivuoden talvikausi kuivempi ja viileämpi; loppukuivan kauden jakso lämpenee ennen kesäsateita. Tätä ei esitetä läpäistyyn 48-arvoiseen sarjaan perustuvana numeerisena sääluonnehdintana, koska keskisarjan asemaportti on auki.
- UM muistuttaa rankkasateiden/tulvien ja teiden huonon kunnon mahdollisesta vaikutuksesta. Ei vuodenaikaan sidottua matkaturvallisuuden takuuta. [O2]
- Vältä väkijoukkoja/mielenosoituksia, pidä tavarat huomaamattomina ja järjestä pimeän ajan kuljetukset. Nämä ovat lyhyitä matkustusohjeita, eivät uutiskertomuksia. [O2]
- Vakuutuksen kattavuus, maahantulo ja terveys-/rokotusohjeet tarkistetaan viranomaislähteistä; heikko hoitokapasiteetti ja mahdollinen evakuointi otetaan varautumisessa huomioon. Ei yksittäistä lääkitysneuvoa. [O2]
- Lentokenttien, sotilas-/hallintokohteiden kuvaaminen ja dronen maahantuonti voivat vaatia erillisen hyväksynnän; oma matkaopas ei anna lupaa. [O2]

**Parasta, 5 ehdotusta:**

1. Historiallisen keskustan puiden ja paikkojen tunnistaminen valoisaan aikaan (2 tähteä).
2. Human Sciences -museon arkeologia ja antropologia, nykykäynti varmistaen (2).
3. Kansallisen kasvitieteellisen puutarhan kasvipaikkojen vertailu (2).
4. Mukuvisin erillinen luontokäynti, ylläpitäjän nykyjärjestelyillä (2).
5. Repsin esitys-/teatteritoiminta silloin, kun ohjelma sopii matkaan (1).

**Hyvä tietää, 4 kohtaa:**

- Erityistä varovaisuutta: luotettava kuljetus, vasemmanpuoleinen liikenne ja ajo valoisaan aikaan.
- Pullotettu juomavesi ja kattava vakuutus; ajantasaiset terveys-/maahantulo-ohjeet ennen lähtöä.
- Käteiseen sekä kortti-/SIM-toiminnan epävarmuuteen varaudutaan; valuuttakurssia ei tässä luvata.
- Puistojen/teatterin/museon pääsy ja kuvaussäännöt tarkistetaan erikseen; normaali ei ole sääennuste.

### Säätaustan alkuperäistarkistus

Poiminnan WP-revisio **1379344630**, taulukko *Climate data for Harare (1961–1990, extremes 1897–present)*. `saa-auditointi.json` säilyttää alkuperäisen P5:n asema-/kausimetan ja vertailun:

- **Harare Kutsaga**, −17.92 / 31.13, `datab:1961`, `datae:1990`, Zimbabwe Meteorological Services Department WMO-jäsenlähteenä.
- WMO:n `maxTemp`, `minTemp` ja `rainfall` vastaavat kaikki poiminnan **36 kuukausiarvoa** samalla pyöristyksellä.
- WMO:n `meanTemp` on **null kaikissa 12 kuukaudessa**. WP:n keskilämpösarja ei siten tule tämän datan meanTemp-riviltä. WP nimeää erillisen NOAA-viitteen asemakoodille 67775, mutta alkuperäinen tiedosto/aseman nimi ei avautunut.
- 1961–1990-kausi on todellinen P5:n arvossa, ei pelkkä taulukko-otsikko. Tiedon toimituspäivä 2003 ei ole normaalikausi.
- Kosteusviite 1954–1975 ja ääriarvojen 1897–present eivät ole näiden 36 valitun kuukausiarvon lähdekausia. Niiden olemassaolo ei itsessään hylkää max/min/sade-rivejä.
- Pelin poiminnan lat/lon −17.83/31.05 on kaupungin yleispaikannus, ei sama kuin WMO:n Kutsaga-aseman sijainti. Normaalia ei nimetä jokaisen keskustakorttelin mittaukseksi.
- Puuttuvia keskilämpöjä **ei korvata ylin/alin-keskiarvolla** eikä numeroita muuteta. Pääsessio ratkaisee yhtenäisen asemasarjan hyväksynnän tai `null`:n. Kaikki ilmastoluvut uusista tekstikentistä pois siihen asti.

## 5. Kohdekartta — todelliset paikat, portit auki

**Kartta ei ole valmis 6–8 ydinkohteen kokonaisuus.** Seuraavat kohteet säilyttävät omat paikkaroolinsa. Arkkitehdin nimetty kuolinvuosi ei vapauta myöhempiä lisäosia/taideteoksia, eikä modernia teosta piiloteta luontotyypiksi. Pienen pääkaupungin poikkeusta ei esitetä noin 1,5 miljoonan Harare Urban -piirille.

### N1 — Pyhän Marian ja Kaikkien Pyhien katedraali

**Tyyppi:** rakennus. **Oma WP/WD-piste:** **−17.82800, 31.05120**, S13 / Q28147101. **Rooli:** katedraalin paikka, ei varmistettu sisäänkäynti. **Aika:** 1900-luvun alun suunnitelma ja rakennustyö, valmistuminen vasta myöhemmin. **1873:** ei tätä katedraalia. **Tila:** piste ja lähdehistoria, myöhempien osien/kuvien oikeusportti auki.

Faktat [S13/S14]:

1. Kyse on Hararen anglikaanisesta katedraalista.
2. Se sijaitsee Nelson Mandela Avenuen ja Sam Nujoma Streetin kulmalla.
3. S13 nimeää alkuperäisten suunnitelmien arkkitehdiksi Herbert Bakerin; S14:n työluettelo yhdistää Bakerin Salisbury-katedraaliin.
4. Rakentaminen käynnistyi **1910-luvulla**, pyhäkkö/kuoro-osa valmistui ennen koko rakennusta.
5. Keskeneräistä osaa suojasi pitkään aaltopelti; rakennus ei tullut valmiiksi yhdellä lyhyellä rakennusvaiheella.
6. Vanhan hiekkakiven saatavuuden vähennyttyä S13 kuvaa uusia kiviä jäljittelevien betonikappaleiden tekemistä kivipölyä käyttäen. Ei omaa päätelmää koko nykyjulkisivun materiaalista.
7. Rakennus valmistui **1960-luvulla**, ja siinä on kellotorni ja useita kappeleita. Ei täsmällistä kello-/kappelilukua.
8. Sisätilojen myöhemmät ristin tien seinämaalaukset ovat erillinen **1980-luvun** taideteosvaihe. Niitä ei vapauteta alkuperäisen arkkitehdin iän perusteella.

Baker kuoli 1940-luvulla, yli 70 vuotta sitten; WD P84 viittaa Q382771:een ja P570 on lähdeaineistossa. S13/S14:n rakennuksen vuositiedot eroavat suunnittelu-/aloitusvaiheessa (1912/1913), joten yleistävä 1910-luku. Myöhempien osien tekijäketju ja erityisesti seinämaalausten tekijä-/suojaketju jäävät B/D:n tarkistukseen. Kirkollinen oikeusriita ja nykyinen piispan rooli eivät nähtävyystarinaa.

### N2 — Zimbabwen human sciences -museo

**Tyyppi:** rakennus. **Oma WP-piste:** **−17.83250, 31.03889**, S7; WD Q8071996 −17.8325,31.0389, sama laitos. **Rooli:** nykyinen museo, ei automaattisesti vuoden 1903 museorakennus. **1873:** ei nykyistä museolaitosta/taloa. **Tila:** piste, 6 paikka-/kokoelmafaktaa, rakennusidentiteetti/tekijäketju auki.

1. Museo sijaitsee Hararen Civic Centre -alueella Rotten Row’n ja Samora Machel Avenuen kulmalla.
2. Aiempi laitoksen nimi oli Queen Victoria Museum.
3. Painopisteitä ovat antropologia ja arkeologia.
4. Etnografinen ja arkeologinen kokoelma käsittelee ihmisten historiaa ennen modernia kaupunkia.
5. S7 kuvaa kirjastoa, näyttelygallerioita ja Shona-kylän mallia.
6. Näyttelyissä on myös luonnonhistoriallista aineistoa; mallikylä ei ole paikalla säilynyt 1800-luvun asuinalue.
7. Museon nimenvaihto liittyy itsenäisyyden jälkeiseen aikaan, **1980-luvun alkuun**.

S7:n tekijälause ”James Cope Christie, opened 1903” ei tässä ratkaise nykyisessä pisteessä olevan talon rakennusvaihetta. WD P84 puuttuu; P571 voi kuvata **laitoksen** perustamisvuotta. Ei nykyjulkisivun ikää tai suojan päättymistä ilman rakennusketjua. Yksittäisen museoesineen kuvaoikeudet ja alkuperä arvioidaan erikseen.

### N3 — Africa Unity Square

**Tyyppi:** aukio/puistoalue sen todellisen paikkarakenteen mukaan. **Oma WP/WD-piste puuttuu. Tila:** ei tuotantokarttaan.

S1/S17/O1 nimeävät kaupungin keskeisen julkisen aukion ja viheralueen. S17 sijoittaa aukion Civic Centren läheisyyteen ja kuvaa ympäröivää keskustaa. Pelin **kaupungin** Q3921-piste on lähellä, mutta sitä ei käytetä aukion omana pisteenä. Oma en-otsikko kummallakaan Africa/African-kirjoitusasulla ei löytynyt. Rakennusten tai lähistön katedraalin piste ei aukion piste. Riittävän kuuden paikallisen faktan, historian ja oman koordinaatin kokonaisuus puuttuu; paikkaa ei keksitä tai täytetä nykyisen politiikan tapahtumilla.

### N4 — Harare Gardens

**Tyyppi:** luonto, jos juuri puistoalueen oma piste ja identiteetti varmistuvat. **Oma piste puuttuu. Tila:** ei tuotantokarttaan.

S1/S16/O1 nimeävät keskustan puiston; puisto ei ole galleriarakennuksen uusi nimi. Oma en-artikkeli ei löytynyt, eikä katedraalin/gallerian/hallinnon yleispistettä lainata. Kuusi paikallista historia-/luontofaktaa ja oman paikan piste jäivät auki. B ei kutsu kuvassa näkyvää suojattua veistosta tai modernia rakennusta vapaaksi vain koska kuva on puistosta.

### N5 — Harare Kopje

**Tyyppi:** luonto, fyysinen kukkula/kalliopaikka. **Oma piste puuttuu. Tila:** ei tuotantokarttaan.

S1/S17 liittävät kukkulan nykyisen keskustan alkuvaiheisiin, paikallisen Shona-kylän/nimen taustaan ja varhaisen modernin taajaman sijoittumiseen. Fyysinen kohouma on eri asia kuin myöhempi kaupunki tai sinne pystytetty muistomerkki. Vuoden 1873 täsmällistä asutusta tai nykyisten näköala-/porttirakenteiden olemassaoloa ei väitetä. Ei korkeussuperlatiivia tai pisteen lainausta Epworthin kivistä, kaupungin yleispisteestä tai monumentista. Oma koordinaatti ja riittävän yksilöidyt paikalliset faktat jäävät auki.

### N6 — Kansallisgallerian Hararen rakennus

**Tyyppi:** rakennus. **Oma WP-piste:** **−17.82528, 31.04889**, S15; WD Q4113712 −17.8253,31.0489. **Aika:** 1900-luvun puolivälin galleria, ei ollut 1873. **Tila:** paikka tunnistettu, nykyisen rakennuksen tekijäketju/suoja ei sulkeutunut; ei hyväksytyksi kohteeksi.

1. Gallerian päälaitos on Hararessa Julius Nyerere Wayn varrella.
2. Instituution aiempi nimi viittasi Rhodesiaan, myöhempi Zimbabween.
3. Se esittelee ja säilyttää maan visuaalista kulttuuriperintöä ja nykytaidetta.
4. Galleriarooli ja kokoelman taideteokset ovat eri oikeuskohteita.
5. Hararen päälaitos on eri paikka kuin Bulawayon Douslin House ja Mutaren Kopje House; niiden rakennusikää ei lainata.
6. Galleria syntyi 1900-luvun puolivälissä, ei isoisän matkavuonna.
7. Maalehti käsittelee jo gallerian Shona-veistäjien etsintää, joten tässä karttaehdokkaan historia ei toista samaa nostotarinaa.

S15:n Frank McEwen -lause yhdistää johtamista/suunnittelua mutta ei erottele varmasti toteutettujen rakennusosien arkkitehtia. WD P84 puuttuu. Ei tämän lauseen perusteella nykyisen rakennuksen tai kokoelman kuvalupaa. Modernit Shona-veistokset/installaatiot arvioidaan erikseen ja jäävät pois, jos suoja-/FOP-portti ei sulkeudu.

### N7 — Kansallinen kasvitieteellinen puutarha, erillinen luontoehdokas

**Tyyppi:** luonto. **Oma WP/WD-piste:** **−17.80167, 31.05083**, S11 / Q6971101. **Rooli:** puutarha-alue, ei herbaarion ovi. **Tila:** aito nykyinen luontopaikka, mutta CBD:n pohjoispuolella eikä oletuksena vanhan ydinkartan kohde.

1. Puutarha sijaitsee Alexandra Parkissa.
2. Se sisältää elävän kasvikokoelman; samassa kokonaisuudessa on kansallinen herbaario.
3. P1 kuvaa pohjana Highveldin miombometsää ja osia säilyneenä kasvupaikkana.
4. Alueella on myös maisemoituja puistotiloja.
5. Istutuksia on sijoitettu eri luonnollisia kasvupaikkoja jäljitteleviin ympäristöihin.
6. Kotimaisia ja ulkomaisia lajeja löytyy kokoelmista; puutarhan havainto ei automaattisesti todista lajin luonnonvaraisuutta kaupungissa tai maassa.
7. S11 kuvaa nykyisen kansallisen puutarhan/herbaarion järjestämistä **1900-luvun puolivälissä**, aiempaa virkistyskäyttöä jo **1900-luvun alussa**.
8. Vuonna 1873 ei ollut tätä nimettyä istutuskokoelmaa tai sen nykyisiä herbaario-/kasvihuonerakennuksia; yksittäisen vanhan puun ikää ei arvata.

Modernius ei itsessään sulje aitoa luontopaikkaa pois. Puutarhan kohdevalinta ei kuitenkaan vapauta kasvihuoneen, herbaarion tai puistotaiteen tekijäketjua. Ei 90 % habitaatti-/750 laji-/7 km² -lukuja ilman toista riippumatonta lähdettä.

### N8 — Mukuvisi Woodlands, erillinen luontoehdokas

**Tyyppi:** luonto. **Oma WP-piste:** **−17.83530, 31.08850**, S12. WD Q31960760 antaa **−17.84306,31.09500**, noin kilometrin eron. Käytetään WP:n omaa, kaupungin/tourism-lähteeseen linkitettyä **aluepistettä** ehdotuksena, ei porttina; ero kirjataan ennen B:n kuvatunnistusta. **Tila:** oikea nykyinen luontoalue, keskustan itäpuolella, ei ydinkartan täytteeksi.

1. Alue sijaitsee Hararessa; P3 kuvaa sitä Hillsiden suunnalla/Newmarch Driven osoitteella.
2. Se on luonnon- ja ympäristökasvatuksen alue, ei kaiverretun muistomerkin tai suojatun rakennuksen luontonimi.
3. Kasvillisuuteen kuuluu paikallista msasaa ja miombopuustoa. [P3]
4. S12/P3 kuvaavat polkuja ja eläinten katselulavan.
5. P3 nimeää muun muassa seeprat, kirahvit, elandit, gnuit ja impalat; määrä- ja näkemisgarantteja ei anneta.
6. Kaupungin paikkasivu nimeää alueelle myös ympäristöjärjestöjä ja kasvatustoimintaa.
7. Alue on myöhempi kaupungin luontokohde, S12:n mukaan perustettu **1900-luvun lopulla**. Ei juuri nykyistä rajattua palvelualuetta vuodelle 1873.
8. Puuston/eläimistön luonnonrooli ja katselulavan/portin/rakennusten teosroolit arvioidaan erikseen.

S12:n nykyiset salakaato-/ryöstö-/asumiskiistat eivät luontotarinaa. Omat WP/WD-pisteet ovat erilaiset; ei hiljaista ”tarkemman” valintaa, uuden porttipisteen laskentaa tai kaupungin hallintorajan venyttämistä historialliseksi ytimeksi.

### Muut paikkarajat ja kartan ehdollinen geometria

- **Greenwood Park**: S16 tarkoittaa sekä puistoa että kaupunginosaa; WD Q108365992: **P625 puuttuu**, P31 kuvaa kaupunginosaroolia. Kaupunginosan historia ja nimensama puisto eivät ole sama koordinaattikohde. Ei puistolle pistearvausta.
- **Mbare Musika**: oma WP/WD **−17.85778,31.03861**, S4/Q6799631, tori-/bussialue, keskustan eteläpuolella. Ei yhden markkinahallin tai uuden katoksen tekijä/avaamisvuosi tällä pisteellä. Sopii kansiaiheeksi, ei välttämättä alkuperäisen CBD:n ydinkarttaan.
- **National Archives**: WD Q2860554 **−17.75985,31.08724**, nykyisen laitoksen kaukainen pohjoinen piste, ei Causewayn yleisnimelle tai gallerian julkisivulle. S5:n galleriakuva on väärä todiste arkistotalosta. Ei ydinkarttaan tällä pisteellä.
- **Epworth / Balancing Rocks, Cleveland Dam ja muut retkialueet:** erillisiä paikkoja; ei Kopjen/Harare Gardensin korvike eikä nykyisen monumentin kiertotapa.

**Ehdollinen rajaus vain keskustan rakennuspisteille N1/N2/N6:** länsi **31.03600**, itä **31.05410**, pohjoinen **−17.82255**, etelä **−17.83525**, noin 300 m marginaali. Tämä ei ole valmis julkaistava kolmen kohteen kartta. Lopullinen 6–8 kohteen ydinjoukko ja rajaus muodostetaan vasta porttien täytyttyä; N7/N8 eivät kuulu tähän rajaukseen.

## 6. Viisi kysymysaihetta ja kolme taustatietoa

Vähintään tasot 1 ja 3. C muotoilee kysymykset ja neljä uskottavaa samanmittaista vastausvaihtoehtoa. Oikea vastaus ei ole toisen pelikaupungin nimi. Karstin sijasta tämän minitehtävän **msasan uudet lehdet** ei toistu visassa.

| Aihe / taso | Oikea vastaus | Kolme taustatietoa | Vaihtoehtojen periaate |
|---|---|---|---|
| V1: pääkaupungin maa, 1 | Zimbabwe | Harare on pääkaupunki; sijainti on Mashonalandin ylängöllä; Etiopian Harar on eri kaupunki. [S1] | Neljä eteläisen Afrikan maata |
| V2: Musikan kauppa, 1 | vihannekset ja hedelmät | Mbare Musika on Mbaressa; tuotteita tuodaan maaseudulta; paikka toimii myös maaseutubussien solmuna. [S3/S4] | Neljä tavararyhmää, ei väitettä ettei torilla olisi mitään muuta |
| V3: elävä ja säilytetty kasvikokoelma, 2 | kasvitieteellinen puutarha ja herbaario | puutarha on Alexandra Parkissa; siinä kasvatetaan kasveja; kansallinen herbaario kuuluu samaan kokonaisuuteen. [S11/P1] | Neljä kokoelmaparia; ei nimiä, joiden nykyistä laitosroolia ei ole varmennettu |
| V4: jakarandan alkuperä, 2 | Etelä-Amerikka | J. mimosifolia on siellä alkuperäinen; Hararen katujen puut ovat istutuksia; kukat ovat violetit. [S1/S8] | Neljä maanosaa/samankokoista aluetta, ei pääkaupunkinimeä |
| V5: arkiston puheaineisto, 3 | suullisen historian haastattelut | arkisto säilyttää dokumentteja; sillä on audiovisuaalinen yksikkö; oral history -ohjelma kerää vähän dokumentoitujen ihmisten kokemuksia. [S5] | Neljä aineistonkeruutapaa, ei palkkioita tai arkiston aineistomäärävisa |

V3:n vastaus tehdään kohtuullisen lyhyeksi; V5 kysyy ohjelman tarkoitusta, ei englanninkielisen termin sanatarkkaa muistamista. Hararen vanha Salisbury-nimi voi esiintyä historiakehyksessä, mutta maan nimen valintakokouksen visaa ei toisteta.

## 7. Kuvatarpeet — vain aiheet ja roolit

B valitsee Commons-tiedostot, tarkistaa lisenssin/tekijän/kaupallisen käytön sekä kuvatun teoksen ja katsoo jokaisen kuvan. A:n sanat eivät ole tiedostoja tai lupia. E08/#74 FOP ja kuvan lisenssi ovat erillisiä portteja. Siirtokuntakuvan nimi ei oikeuta väärää vuosilukua tai isoisän kuvaa.

| Kohta | Aihetarve / hakusanat | Raja |
|---|---|---|
| Kansikuva 1 | `Harare CBD broad city panorama` | laaja yleiskuva, todellinen nykyinen kaupunki; suojatut rakennukset/taideteokset tarkistettava |
| Kansikuva 2 | `Harare Africa Unity Square city surroundings` | eri puoli keskustaa, ei yksi moderni muistomerkki pääaiheena |
| Kansikuva 3 | `Harare Kopje city skyline` | laaja näkymä, oikea kukkula/paikka ja näkyvien teosten oikeudet; ei tuoreeksi nimetty 1970-luvun kuva |
| K1 | `Mbare Musika vegetables market Harare` | oikea tori, nykyinen/vanha päiväys, ei uuden hallin identiteetin arvausta |
| K2 | `National Archives Zimbabwe historical records` | oikea aineisto/laitos; S5:n galleriajulkisivu ei käy arkistoksi, dokumentin oma tekijäoikeus erikseen |
| K3 | `Reps Theatre Harare` | rakennuksen/produktion/puvuston oikeusketju, ei teatterijulisteen oletuslisenssiä |
| K4 | `Zimbabwe Museum of Human Sciences archaeology` | vanhan/nykyisen museotalon tunnistus, esineen alkuperä; Shona-malli ei 1873 kylä |
| H1 | `Brachystegia spiciformis new red leaves Zimbabwe` | punainen lehti, oikea puulaji; yleinen lajikuva nimetään yleiseksi jos ei Hararesta |
| H2 | `Jacaranda mimosifolia Harare flowering` | violetit kukat ja oikea lajikuva; toisen kaupungin katua ei Harareksi |
| H3 | `Delonix regia Zimbabwe flower pods` | oikea punertava kukka/palko, ei punainen jakaranda tai msasa |
| H4 | `National Botanic Garden Harare miombo` | puutarhan todellinen paikka, istutus vs luonnonvarainen ero; rakennusta ei vapauteta luontokuvalla |
| Matkailijalle | `Harare recent street gardens portrait` | tuore maltillinen pysty w/h 0,60–0,85; ei historiallista korttia |
| Opas perille | `Robert Gabriel Mugabe International Airport HRE` | oikea kenttä, rakennus- ja kuvausketju tarkistetaan, ei poliitikon henkilökuvaa |
| Opas keskusta | `Harare Gardens downtown daylight` | tarkka puistoidentiteetti ja näkyvien teosten arvio |
| Opas luonto | `Mukuvisi Woodlands Harare animals woodland` | oikea alue, ei eläinlajista paikka-arvausta tai porttipistettä |
| Opas ruoka | `Harare meal Zimbabwe sadza` | eri tiedosto kuin maalehdessä; lyhyt nykyateria, ei vanhojen maakertomusten kuvituksen toistoa |
| Opas ajankohta | `Harare street vegetation recent` | todellinen ajankohta vain metadataa vastaavasti, ei sääennusteen kuvitusväitettä |
| Kartta N1/N2/N6 | oma paikan nimi | vain rakennus-/myöhempien osien teosketjun sulkeuduttua; maalaukset/installaatiot erikseen |
| Kartta N3–N5 | aukio / Gardens / Kopje | vasta oman kohdepisteen ja identiteetin portin jälkeen; ei kaupungin koordinaatin korviketta |
| Valokuva | `Salisbury Harare 1890s historical panorama` | aito ≤1900 PD-vedos mahdollinen kaupungin syntyessä 1800-luvun lopulla; ei väitetä otetuksi 1873 |
| Ennen–nyt | `Salisbury Harare street historical same location` | sama paikka, vanhan kuvan vuosi/oikeus ja nykykuvan teosketju; muuten pari pois |

Kansikuvat eivät ole ruoka-, esine-, sisätila- tai veistoskuvia. Oppaassa enintään kaksi kuvatonta jaksoa; varauksellinen kuvaportti ei ratkea A:n oletuksella. Vanha rakennusinstituutio ja uudet taideteokset arvioidaan erillisinä.

## 8. Ristiriidat, rajaukset ja ratkaisut

1. **S1:n väestö:** infobox ja intro antavat toisistaan eroavia kaupungin/piirin/metropoliprovinssin lukuja. Kontekstin Harare Urban 1 491 754 / 2022 on käyttöperusta; noin 1,5 miljoonaa, laajuus ja vuosi mukana. Ei asukkaiden väitettyjä prosentteja tai ennustetta toteutuneeksi nykyluvuksi.
2. **Sääasema/keskilämpö:** WMO P5 on Harare Kutsaga 1961–1990, meanTemp:null. NOAA 67775:n nimi/kausi/12 alkuperäisarvoa eivät sulkeutuneet. Poiminnan yleispiste ei mittausasema. Ei laskettua keskisarjaa, ei hiljaista aseman vaihtoa, numeeriset tekstiväitteet pois odottamaan pääsession ratkaisua.
3. **Mukuvisi pisteet:** oman WP:n −17.83530/31.08850 vs WD −17.84306/31.09500. Erilaiset aluepisteet noin kilometrin päässä, porttia ei todistettu. Tallennetaan ero ja rooli; ei valita WD:n suurempaa desimaalimäärää automaattisesti tarkaksi.
4. **Greenwood Park:** sekä kaupunginosa että nimensama puisto; P625 puuttuu. Rakennusalueen historia ja puisto eivät yksi uusi luonnonpiste.
5. **Museon alkuperäinen talo:** S7 yhdistää James Cope Christie / avaaminen 1903 ja nykyisen Civic Centre -paikan. Vuosi/laitoshistoria ei yksin todista nykyjulkisivun ikää. Rakennus-/tekijäketju auki; kuva B:ssä tunnistettava.
6. **Arkisto:** WD-piste on pohjoisessa, S5:n kuva on kansallisgalleria. Ei gallerian kuvaa/paikkaa arkistoksi eikä K2:n aineiston ikää arkistotalon rakennusvuodeksi.
7. **Katedraali:** Bakerin työluettelossa suunnitelman vaihe 1912, rakennussivulla aloitus 1913. Käytetään 1910-lukua. Valmistuminen 1960-luvulla ja seinämaalausten myöhempi 1980-luku erikseen; alkuperäisen tekijän kuolema ei tee kaikkia osia vapaiksi.
8. **Galleria:** S15:n johtaja-/suunnittelulause ei sulje toteutettuja nykyosia koskevaa rakennusketjua. Nykytaidetta koskevat oikeudet erikseen; maalehden samat veistäjätarinat pois.
9. **Botanic-luvut:** S11:n pinta-ala/laji-/habitaattiosuudet eivät saaneet kahden riippumattoman lähteen varmennusta. P1:n vahva rooli on kokoelman/luonnonhavainnon ero. Ei niiden tarkkoja lukuja tai perustamisvuotta lukijatekstiin.
10. **Luonnon värit:** msasan uudet lehdet, jakarandan kukat ja Delonixin kukat ovat eri ilmiöitä. Ei pelkän kuvavärin avulla varmaa lajia tai kukintakuukautta.
11. **Mbare:** tori-/bussitoiminto on eri kohde kuin Mbaren kaupunginosa tai yksittäinen halli. Nykyinen mahdollinen rakennusmuutos ei tämän lähdekierroksen perusteella ratkennut; ei vanhoja aukioloaikoja tai johtopäätöstä nykykunnosta.
12. **Book Café:** hakema ohjaus on yleinen Coffeehouse; paikallinen paikka jäi pois. Se ei ole Hararen cafén historia vaikka URL oli Book Café.
13. **1873:** nykyistä Hararea ei ollut; modernin taajaman kosteasta perustamisympäristöstä ei päätellä asutuksen täsmällistä vuoden 1873 karttaa eikä luonnonvaraisten puulajien historiaa yhtä nykyistä puuta koskevaksi.
14. **Nykyopas:** O2 on luettu oikea 18.9.2026 varovaisuustaso. HRE-nimi/IATA varmennettu ACZ:stä. UM:n kuvaus-/liikkumisrajoitteet eivät ratkea Commons-kuvan lisenssillä. Vanha elokuun kunnallinen vesikatkoilmoitus ei nykyinen katkos.

## 9. Pois jätetyt aiheet ja avoimet portit

**Pois:** kaikki kontekstin maalehteen/lähinostoon jo kuuluvat tarinat; nykyinen puoluepolitiikka/vaalit/kirkollinen riita, häädöt/rikostapausten summat, urheiluennätyksen toisto, tarkat maakokoelma-/esitysmäärät, epävakaat valuuttakurssit/hinnat, arkki-esineen superlatiivi, julkista istutusta koskeva väärä luonnonvaraisuustodistus, modernit suojatut veistokset/maalaukset ilman hyväksyttyä teos-/FOP-ketjua.

Ennen A valmis / seuraavia vaiheita:

1. **Ydinkartta 6–8:** N3–N5:n omat WP/WD-pisteet sekä riittävät paikalliset faktat tai toiset aidot ydinkohteet. Botanic/Mukuvisi/arkisto/Mbare eivät korvaa puuttuvaa CBD-aukion pistettä vain kaupungin hallintorajojen sisällä olemalla. Ei perusteetonta pienen pääkaupungin poikkeusta.
2. **Tekijäketjut:** nykyinen museotalo, galleria, katedraalin myöhemmät osat sekä muut rakennusehdokkaat; suojatut teokset vain erikseen hyväksytyn teostyyppi-/kaupallisen FOP:n ja kuvan lisenssin puitteissa. A ei tee tällaista hyväksyntää.
3. **Sää:** alkuperäinen NOAA-keskilämpösarja/asema tai pääsession null-ratkaisu; 36 WMO-arvoa ja oikea kausi on varmennettu, loput 12 eivät. Ei tuotantonumeroiden korjausta tässä.
4. **Kuva- ja nykyidentiteetti:** rakennus-/puistopiste ei portti; Mukuvisin piste-ero, museon vanha/nykyinen talo ja arkiston väärä kuvateksti vaativat B/D:n tunnistuksen. Ei uusia hakukierroksia tässä A-luovutuksessa.
5. **C/D:** suomen viimeistely, mitat, visan uskottavat vaihtoehdot, samansivuisuus ja kuva-/faktatarkistus. Tässä ei sisältö-JSONia tai koko paketin tarkistinajoa.

**Luovutus:** hyödyllinen A partial, 40 lähde-/entiteettitallennetta; 0–9 ja 4 + 4 lähteistetty. Kartta-/rakennus- ja sääportti jäävät näkyvästi auki. Ei Git, sisältö-JSON, kuvat, pelikytkentä tai julkaisu.
