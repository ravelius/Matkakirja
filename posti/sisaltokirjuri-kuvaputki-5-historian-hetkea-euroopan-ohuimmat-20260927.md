## 2026-09-27 — SISÄLTÖKIRJURI → KUVAPUTKI: 5 historian hetkeä, Euroopan ohuimmat kaupungit

Fablen tilaus 27.9.2026 (Euroopan ohuimpien lehtikaupunkien erä, samat
viisi kaupunkia kuin PR #3419: Valletta, Luxemburg, Lappi, Sisilia,
Kreeta). Tekstit ovat valmiit tähän tilaukseen — kun kuvat saapuvat,
kortit lisätään suoraan `js/packs/historian-hetket.js`:ään samalla
kaavalla kuin muut 49 hetkeä (rooli `lahi` ensin, `kauko` toisena,
tiedostonimi `hetki-<id>-lahi-photo-v4.jpg` / `-kauko-photo-v4.jpg`,
kuvaversio v4 kuten uusimmat erät). Sarja on jo mitoiltaan valmis
`tests/historian-hetket.test.mjs`:n muotovaatimuksiin (teksti 120–170
sanaa, "ihminen edellä" -sääntö, kysymys+fakta minitehtävään).

**HUOM integroijalle:** Valletta ja Luxemburg ovat pistekaupunkeja
(oma kohdekartta olemassa, `js/packs/maakartat.js`), joten niiden
hetket voivat mennä joko `kartalla:false` + kohdekartan piste
(Lissabon-malli) tai `kartalla:true, kattoVapaa:true` -reitillä —
tarkista `tools/tarkista-nostopaikat.mjs` ajon jälkeen kumpi ei riko
`tests/nostot-kartalla.test.mjs`:n kattoja. Lappi, Sisilia ja Kreeta
eivät ole pistekaupunkeja, joten niiden hetket ovat suoraan
`kartalla:true` tavallisina pääkartan merkkeinä.

### 1. Valletta (MLT) — Suuri piiritys päättyy

```
id: 'suuri-piiritys-paattyy-1565'
otsikko: 'Valletta 1565 — purjeet horisontissa'
nimio: 'Apu saapuu 1565'
paivays: '7.9.1565'
paikka: 'Mellieħan lahti, Malta'
iso: 'MLT'
lat: 35.9556, lon: 14.3611
lehti: { laji: 'kaupunki', avain: 'valletta' }
```

**Teksti** (ihminen edellä, ~150 sanaa): Puolustaja nojaa muurin
ampuma-aukkoon, kun toinen tarttuu hänen olkapäähänsä ja osoittaa
merelle — silmät ovat liian väsyneet neljän kuukauden valvomisesta
uskoakseen ensin sitä, mitä näkevät. Purjeet horisontissa eivät ole
uusi osmanien laivue vaan sisilialainen apulaivasto, jota Don García
de Toledo on kerännyt Messinasta kuukausia. Yli kahdeksantuhatta
miestä nousee maihin Mellieħan lahdessa 7. syyskuuta, ja tieto kulkee
muurilta muurille nopeammin kuin kukaan ehtii huutaa sitä ääneen.
Ottomaanien komentaja Mustafa Pasha, jonka joukot ovat menettäneet jo
kymmeniätuhansia miehiä ja suurimman osan kesästä yhteen linnakkeeseen,
ei enää usko voittoon uuden armeijan edessä. Muutaman päivän kuluttua
laivasto lastaa jäljellä olevat joukot ja purjehtii pois — piiritys,
joka piti kestää päiviä, on lopulta kestänyt lähes neljä kuukautta,
ja saari on yhä ritarikunnan.

**Lähikuva (rooli `lahi`)**: Nääntynyt, pölyinen ja auringon polttama
puolustaja (ritari tai jalkaväen sotilas, 1560-luvun panssaripaita ja
kypärä) seisoo Vallettan/Fort St Elmon muurin ampuma-aukolla, toinen
mies tarttuu hänen olkapäähänsä osoittaen merelle päin; kasvoilla
epäuskoinen helpotus, ei vielä ilo. Tausta hämärä, katse ja käsi
etualalla.

**Kaukokuva (rooli `kauko`)**: Laaja näkymä Mellieħan lahdesta:
kymmeniä puisia purjelaivoja lähestymässä rantaa, sotilaita nousemassa
maihin veneistä matalikossa, taustalla Maltan kalkkikivinen rannikko
iltapäivän valossa. Sävy toivoa herättävä, ei taistelukuva.

**Lehtijohdanto**: Neljä kuukautta kestänyt piiritys päättyi, kun
sisilialainen apulaivasto laski maihin Mellieħan lahdessa syyskuun
alussa 1565 — osmaanit purjehtivat pois muutamassa päivässä.

**Minitehtävä**: Kysymys "Mistä apulaivasto saapui Maltan avuksi
1565?" / vaihtoehdot: Sisiliasta (oikea), Espanjasta, Ranskasta,
Kreikasta / fakta: Sisiliassa Messinaan koottu, Don García de Toledon
johtama laivasto toi yli 8 000 miestä Mellieħan lahteen 7.9.1565.

---

### 2. Luxemburg (LUX) — Kreivi ostaa kalliolinnan

```
id: 'siegfried-ostaa-bockin-963'
otsikko: 'Luxemburg 963 — kallio, josta tuli kaupunki'
nimio: 'Bockin kauppa 963'
paivays: '963'
paikka: 'Bock-kallio, Luxemburg'
iso: 'LUX'
lat: 49.6117, lon: 6.1369
lehti: { laji: 'kaupunki', avain: 'luxemburg' }
```

**Teksti** (~140 sanaa): Kreivi Siegfried Ardennelainen seisoo jyrkän
hiekkakivikallion laella Alzette-joen mutkan yllä ja kuvittelee, mitä
sen sisään voisi louhia. Kallio on luonnostaan lähes valloittamaton —
kolmelta sivulta jyrkänne, yhdeltä kapea kannas — ja vain munkkien
pieni luostarirakennus seisoo sen päällä. Siegfried on juuri vaihtanut
Trierin luostarille maita ja muuta omaisuutta saadakseen kallion
itselleen, ja kauppakirja on allekirjoitettu vuonna 963. Hän ei vielä
tiedä rakentavansa jotain, joka kasvaa kaupungiksi: hänen mielessään
on vain linna, Lucilinburhuc, "pieni linna", josta hän voi hallita
jokilaaksoa. Vuosisatojen kuluessa kallion sisään louhitaan
kilometrikaupalla käytäviä, ja linnan ympärille kasvava kaupunki
kantaa yhä saman nimen johdannaista.

**Lähikuva**: Keskiaikainen kreivi (900-luvun frankkilainen/saksilainen
asu, ei vielä ritarivarustusta) seisoo kalliolla kääntynyt katsomaan
alas jyrkännettä kohti jokea, kädessään pergamenttinen kauppakirja;
ilme keskittynyt, suunnitteleva. Taustalla epätarkkana vanha
luostarirakennus.

**Kaukokuva**: Laaja näkymä Bock-kalliosta ja Alzette-joen mutkasta
ylhäältä, kallio kohoaa jyrkkänä jokilaakson yllä, metsäinen maisema
ympärillä, ei vielä mitään linnoitusta näkyvissä — vain paljas kallio
odottamassa.

**Lehtijohdanto**: Koko Luxemburgin kaupunki syntyi kaupasta: kreivi
Siegfried hankki jyrkän Bock-kallion vuonna 963 ja rakensi sen päälle
linnan, jonka ympärille kaupunki kasvoi.

**Minitehtävä**: Kysymys "Mistä Siegfried sai Bock-kallion itselleen
963?" / vaihtoehdot: Vaihtamalla maita luostarille (oikea), Valtaamalla
sen sotilaallisesti, Perimällä sen suvultaan, Ostamalla sen kullalla /
fakta: Siegfried vaihtoi kalliomaan muita maita ja omaisuutta vastaan
Trierin luostarilta vuonna 963.

---

### 3. Sisilia (ITA) — Kuninkaan lupaus myrskyssä

```
id: 'roger-ii-cefalu-lupaus-1131'
otsikko: 'Cefalù 1131 — lupaus myrskyävällä merellä'
nimio: 'Cefalùn lupaus 1131'
paivays: '1131'
paikka: 'Cefalùn edusta, Sisilia'
iso: 'ITA'
lat: 38.0433, lon: 14.0233
lehti: { laji: 'kaupunki', avain: 'sisilia' }
```

**Teksti** (~135 sanaa): Kuningas Roger II tarrautuu aluksensa
kaiteeseen, kun aalto nostaa keulan pystyyn ja pudottaa sen taas
kuiluun — merimiehet huutavat toisilleen käskyjä, joita tuuli repii
palasiksi. Legendan mukaan hän vannoo tässä hetkessä: jos hän pääsee
hengissä maihin, hän rakentaa kiitokseksi katedraalin siihen paikkaan,
johon myrsky hänet ajaa. Alus ajautuu lopulta Cefalùn kapealle
rannalle jylhän kalliovuoren juurelle, ja kuningas astuu maihin
märkänä mutta elossa. Samana vuonna, 1131, rakennustyöt alkavat —
Roger II:n ensimmäinen suuri kirkkohanke kuninkaana. Vuosikymmen
myöhemmin sen apsiksen kattoa hallitsee bysanttilaisten mestarien
tekemä valtava Kristus-mosaiikki, joka katsoo yhä alas tyhjää
kirkkosalia.

**Lähikuva**: Normannikuningas (1100-luvun kruunu/viitta, märkä
kankaasta) tarrautuu puisen laivan kaiteeseen keskellä myrskyä,
aallonharja roiskuu kasvoihin, ilme päättäväinen/rukoileva, katse
taivaalle; köysiä ja purjeenrepaleita ympärillä.

**Kaukokuva**: Laaja näkymä myrskyävästä merestä Cefalùn edustalla:
pieni keskiaikainen purjealus aaltojen keskellä, taustalla Cefalùn
jylhä kalliovuori (La Rocca) ja kapea rantaviiva, tummat myrskypilvet.

**Lehtijohdanto**: Tarinan mukaan kuningas Roger II lupasi myrskyssä
rakentaa katedraalin sinne, minne pääsisi hengissä rantaan — ja hänen
laivansa ajautui Cefalùhun 1131.

**Minitehtävä**: Kysymys "Minä vuonna Cefalùn katedraalin rakennustyöt
alkoivat?" / vaihtoehdot: 1131 (oikea), 1174, 1143, 963 / fakta: Roger
II käynnisti Cefalùn katedraalin rakennustyöt 1131 pian
haaksirikkotarinan jälkeen — hänen ensimmäisen suuren
rakennushankkeensa kuninkaana.

---

### 4. Kreeta (GRC) — Luostarin viimeinen ilta

```
id: 'arkadin-luostarin-rajahdys-1866'
otsikko: 'Arkadi 1866 — viimeinen ovi'
nimio: 'Arkadi 1866'
paivays: '9.11.1866'
paikka: 'Arkadin luostari, Kreeta'
iso: 'GRC'
lat: 35.3072, lon: 24.7683
lehti: { laji: 'kaupunki', avain: 'kreeta' }
```

**Teksti** (~145 sanaa): Nainen painaa lasta vasten seinää ruutivaraston
oven takana, kun kirveniskut ulkopuolella yltyvät — kaksi päivää
kestänyt taistelu on hävitty, muurit on murrettu, eikä paluuta enää
ole. Satoja kapinallisia ja siviilejä on paennut Arkadin luostariin
turvaan marraskuussa 1866, mutta ottomaanijoukot ovat piirittäneet
sen tykistöllä. Igumeni Gabriel on jo päättänyt, mitä tapahtuu, jos
muurit pettävät: ruutivarasto sytytetään mieluummin kuin antaudutaan.
Kun ovi vihdoin murtuu, joku laukaisee liekin — räjähdys tappaa
puolustajia ja hyökkääjiä yhdessä, ja luostarin pihalta löytyy
myöhemmin kuulien lävistämä tuulimylly, joka seisoo siellä yhä.
Uutinen tapahtuneesta kulkeutuu nopeasti Eurooppaan ja herättää
myötätuntoa kreetalaisten asialle Pariisista New Yorkiin asti.

**Lähikuva**: Nainen suojelee lasta luostarin kiviholvatun käytävän
nurkassa, ovi/seinä murtumassa taustalla, savua ja pölyä ilmassa,
kasvoilla pelko mutta ei paniikki — päättäväinen viimeinen hetki;
1800-luvun kreetalainen talonpoikaisasu.

**Kaukokuva**: Laaja näkymä Arkadin luostarin pihasta ja
kalkkikivisestä julkisivusta ulkopuolelta, savua nousemassa katolta,
ottomaanijoukkoja lähestymässä murrettua muuria, iltahämärä.

**Lehtijohdanto**: Arkadin luostarin puolustajat räjäyttivät
ruutivarastonsa marraskuussa 1866 mieluummin kuin antautuivat —
tapahtuma, joka herätti Euroopan myötätunnon kreetalaisten asialle.

**Minitehtävä**: Kysymys "Mitä Arkadin luostarin puolustajat tekivät,
kun muurit murtuivat 1866?" / vaihtoehdot: Räjäyttivät ruutivarastonsa
(oikea), Antautuivat ehdoitta, Pakenivat vuorille, Neuvottelivat
aselevon / fakta: Puolustajat sytyttivät luostarin ruutivaraston
mieluummin kuin antautuivat piirittäneille ottomaanijoukoille
9.11.1866.

---

### 5. Lappi (FIN) — Ensimmäinen juna Rovaniemelle

```
id: 'ensimmainen-juna-rovaniemi-1909'
otsikko: 'Rovaniemi 1909 — ensimmäinen juna'
nimio: 'Ensijuna 1909'
paivays: '1909'
paikka: 'Rovaniemen rautatieasema, Lappi'
iso: 'FIN'
lat: 66.5, lon: 25.7167
lehti: { laji: 'kaupunki', avain: 'lappi' }
```

**Teksti** (~130 sanaa): Poika seisoo isänsä käden varassa laiturilla
ja tuntee maan tärisevän jalkojensa alla ennen kuin näkee mitään —
sitten savupilvi ilmestyy metsän takaa ja ääni kasvaa jyskeeksi, jota
kukaan paikalla ei ole ennen kuullut näin läheltä. Rovaniemi on ollut
vuosisatoja markkinapaikka joen varrella, tavoitettavissa vain
veneellä tai reellä, mutta rautatie Kemistä pohjoiseen valmistuu 1909
ja tuo veturin puuvarikon läpi ensimmäistä kertaa. Koko kylä on
kokoontunut laiturille katsomaan, ja moni koskettaa vaunun kylmää
metalliseinää kuin varmistaakseen, että se on totta. Yhtäkkiä Lappi
ei ole enää matkan päässä muusta Suomesta — se on rautatien päässä.

**Lähikuva**: Poika (1900-luvun alun suomalainen talonpoikaispuku,
lippalakki) seisoo isänsä kädessä kiinni laiturilla, katse ylöspäin
kohti lähestyvää höyryveturia, suu auki hämmästyksestä; savua ja
höyryä taustalla.

**Kaukokuva**: Laaja näkymä Rovaniemen puisesta rautatieasemasta ja
laiturista: höyryveturi saapumassa, kokoontunut väkijoukko odottamassa
laiturilla, taustalla mäntymetsä ja joki, aikakauden puurakennukset.

**Lehtijohdanto**: Rautatie Rovaniemelle valmistui 1909 ja toi
ensimmäisen höyryveturin markkinakylään, joka oli tähän asti
tavoitettu vain veneellä tai reellä.

**Minitehtävä**: Kysymys "Miten Rovaniemelle pääsi ennen rautatien
valmistumista 1909?" / vaihtoehdot: Veneellä tai reellä (oikea),
Vain lentäen, Höyrylaivalla merta pitkin, Ei mitenkään talvisin /
fakta: Ennen rautatietä Rovaniemi tavoitettiin vain vesireittejä tai
rekiä pitkin — rautatie Kemistä valmistui 1909.

---

### Kuvatyyli (sama kuin muissa hetkissä)

Valokuvamainen havainnekuva, ei maalausmainen tyyli (Raamattu:
"KAIKKI GENEROIDUT KUVAT MAHDOLLISIMMAN VALOKUVAMAISIA"). Ei
tunnistettavia nykyihmisiä, ei nykypolitiikkaa. Kuvatekstit ja
lähderivit yllä ovat luonnoksia — muokkaa tarpeen mukaan kuvan
lopullista sisältöä vastaaviksi ennen PR:ää, samaan tapaan kuin
aiemmissa erissä.

### Toimitus

Kymmenen tiedostoa (5 × lähi + kauko), roolinimet ja tiedostonimet
yllä. PR Julkaisijan junaan (ei mergeä itse), rivi tähän
postilaatikkoon "PR #n valmis junaan" kun toimitettu. Lisää
`js/packs/historian-hetket.js`:ään täydellä kaavalla (ks. tiedoston
oma otsikkokommentti), aja `node tools/tarkista-nostopaikat.mjs` ja
korjaa kartalla/kohdekarttasijoittelu sen mukaan (ks. HUOM yllä).
