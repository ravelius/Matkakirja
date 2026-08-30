# Viesti Fablelle — uloszoomauksen löysennys + arkki kameran maailmaksi

*(Opus, 30.8.2026. Haara `claude/zoom-loysennys` tuoreesta origin/mainista
**d3902f24 = v1366**. Versiota EI nostettu, PR:ää EI tehty — sinä
julkaiset. dist/ ei ole mukana, laattojen generointiin ei koskettu.)*

## Lyhyesti

Kaksi tehtävää, sama tiedosto ja sama aihe — molemmat määrittävät, mitä
kamera saa näyttää, ja ne on ratkaistu yhdessä:

1. **Uloszoomaus löysennetty kolminkertaiseen maan ikkunaan**
   (omistajan päätöskortti). Löysennys koskee sekä zoomia ETTÄ
   panorointia — ne on johdettu samasta laatikosta, jottei näkymä
   taistele itsensä kanssa.
2. **Kameran maailma on nyt laattapyramidin ARKKI eikä vanha lauta**
   (omistajan iPad-havainto kartan leikkautumisesta). Mitattu: kamera
   ylsi ennen y 254…5345, arkin kartta-ala on −611…5811 ja koko paperi
   −1046…6261.

Portit: `node --test tests/*.test.mjs` → **1047 pass / 0 fail**
(1 skipped), kaksoisavaimet ja niputus puhtaat, `build-standalone`
kääntyy (20 343 kt), `dist` poistettu. Savukkeet: panorointi 11/11,
kartta-tila 20/20, maailmanäkymä 15/15, jalkamatka 22/22, fokuskohteet
96/96. Kaikki mittaukset ja kuvakaappaukset ovat Chromiumista
(390×844 dpr 3 ja iPad 834×1112) **oikeilla R2-laatoilla**.

---

## 1. Uloszoomauksen löysennys

### Vakio, ei taikaluku

`js/kartta.js`:

    const ULOSZOOMAUS_KERROIN = 3;

Kommentti kertoo, että luku on **säädettävä** ja miksi: *"maa ja sen
naapurit"* on silmämääräinen mitta eikä laskettava, joten kolme on
lähtöarvo eikä mittaustulos — omistaja arvioi sen laitteella. Luku
kerrotaan ikkunan **molempiin** mittoihin keskipisteen ympäri
(`levitaAlue`), joten se jakaa uloszoomauksen mittakaavarajan
täsmälleen kolmella riippumatta maan muodosta. Sen todistaa Chilen ja
Norjan rivi taulukossa: suhde on 3,01 myös kapealla maalla.

### Zoom JA panorointi samasta laatikosta

Kysyit tätä nimenomaan, ja vastaus on: **ne kytkeytyivät**. Sama
`fokusRajaukset()` syöttää molemmat, joten pelkän zoomin löysääminen
olisi tuottanut juuri sen näkymän, jossa naapurit näkyvät muttei niihin
pääse. `fokusRajaukset()` palauttaa nyt kolme laatikkoa yhden sijaan:

| kenttä | mitä | kuka lukee |
| --- | --- | --- |
| `ikkuna` | maan oma ikkuna, ennallaan | `tarkistaFokusZoom` → `ajaKamera` (saapuminen) |
| `uloin` | **uusi**: ikkuna × 3 keskipisteensä ympäri | `fokusZoomMinimi` → koko zoomportaikon pohja |
| `kuva` | panoroinnin raja, **yhdiste** maan laatikosta ja `uloin`ista | `rajaaFokusPan` (käsiele) ja `sovitaMannerZoom` (pelin oma näkymä) |

Kolme muutettua kohtaa `js/kartta.js`:ssä:

1. `fokusRajaukset()` — laskee `uloin`in ja levittää `kuva`n vähintään
   sen kokoiseksi. Yhdiste eikä korvaus: maan oma laatikko (bbox) on
   ikkunaa väljempi, eikä löysennys saa kutistaa sitä.
   Matkavalinnan kohdealue liitetään kaikkiin kolmeen kuten ennenkin.
2. `fokusZoomMinimi()` — mitta on `uloin` eikä `ikkuna`.
3. `zoomaaPainikkeella` ja `tarkistaFokusZoom` — kommentit vastaamaan
   sitä, että pohja on löysennetty ikkuna, mutta kamera-ajon MAALI on
   yhä maan oma ikkuna. Näin äärilaaja näkymä (uudelleenlataus,
   maailmanäkymästä paluu) palautuu maahan, ja pelaaja loitontaa
   naapureihin itse.

`ui.fokusPohjaRajaus`iin EI koskettu: merkkien mittakaava
(`fokusMerkkiSkaala`) lukee sen, ja löysennys siellä olisi kutistanut
kaupunkipisteet ja kohdemerkit kolmasosaan. Löysennys asuu siis
kartassa, ei ui:ssa — se on kirjattu kommenttiin molempiin päihin.

### Mitattu, ei päätelty (390×844, dpr 3, oikeat laatat)

"Ennen" on mitattu samalla koneistolla kertoimella 1 = mainin
käyttäytyminen; se toistaa edellisen agentin luvun (Bulgaria 284 → minä
mittasin 285).

| maa | maan ikkuna | uloin (3×) | ääriuloszoom ENNEN | ääriuloszoom NYT | suhde ikkunaan |
| --- | --- | --- | --- | --- | --- |
| Bulgaria (iso) | 284×169 | 851×507 | 285×590 | **855×1768** | 3,01× |
| Venäjä (jättimäinen) | 5772×2273 | 17317×6818 | 5795×11787 | **11640×24146** | 2,02× * |
| Kypros (pieni) | 101×66 | 303×199 | 101×210 | **304×629** | 3,01× |
| Chile (kapea) | 1142×2076 | 3425×6227 | 1147×2372 | **3441×7117** | 3,01× |
| Norja (kapea) | 1198×973 | 3595×2920 | 1204×2490 | **3612×7307** | 3,01× |
| Kreikka | 468×292 | 1404×877 | 470×972 | **1410×2916** | 3,01× |

*) Venäjällä kolminkertainen ikkuna (17 317) on **laudan leveyttä
suurempi**, joten raja ei enää ole maan ikkuna vaan lauta itse: siellä
uloszoomaus vie koko maailmaan. Se ei ole kertoimen sijoitusvirhe vaan
seuraus siitä, että Venäjän ikkuna on jo lähes puoli maailmaa.

**Edellisen agentin koe toistettuna:** kamera pyydettiin 900
lautayksikön näkymään Bulgariassa. Ennen se pysyi 285:ssä, nyt se
päätyy **854,9**:ään.

**Panorointi todennettu oikealla raahauksella** (hiiriele kartalla, ei
laskennalla): Bulgariassa yksi porras sisäänpäin näkymä 470 yksikköä,
panoroitava alue 851 → veto siirsi näkymää **191,4 lautayksikköä**
(x 6447,1 → 6638,5) ja toi Turkin ja Syyrian ruudulle. Norjassa sama
veto siirsi **612,3** yksikköä. Ääriasennossa akseli on lukossa, koska
silloin koko sallittu alue on jo ruudulla — se on sääntö eikä vika.

### Ei riko lähtövalintaa, aloituslentoa eikä matkavalintaa

- **Lähtökaupungin valinta** ja **aloituslento**: portit ovat
  `ui.maanIkkuna()`:ssa ja `fokusRajaukset()`:ssä, enkä koskenut
  kumpaankaan. Löysennys lasketaan vasta sen jälkeen kun ikkuna on
  ylipäätään olemassa, joten porteissa ei ole mitään löysennettävää.
  Ajoin koko alkukulun läpi selaimessa (portti → *Valitse
  aloituskaupunki* → kaupungin napautus → lento → perillä): valinta
  tapahtuu aloituskartalla, jolla pyramidia ei ole, ja peli päätyy
  `action`-vaiheeseen maailmanlaudalle.
- **Matkavalinta**: `matkakohteidenAlue` liitetään nyt myös `uloin`iin,
  eli jos kohde on löysennettyä aluetta kauempana, uloszoomaus yltää
  sinne asti. Ennen se liitettiin `ikkuna`an, joka oli sama asia.

---

## 2. Arkki on kameran maailma (lisätehtäväsi)

### Todennettu: syy oli se, jonka annoit

Mittasin `ui.contentBox`in selaimesta: **y 254 … 5345,2**
(korkeus 5091,2). Pyramidin luettelo sanoo arkiksi y −1046,3 … 6261,4 ja
kartta-alaksi −611,3 … 5811,4. Diagnoosisi pitää.

Kaksi tarkennusta mittauksista:

1. **Ylhäältä leikkasi.** Lähikuvassa (skaala 0,53) pohjoisin
   saavutettava kohta oli **y −124,4**; kartta-ala alkaa −611,3:sta.
   Huippuvuoret jäivät puoliksi ruudun yläpuolelle.
2. **Alhaalta leikkasi, mutta tyhjää EI ollut.** Vanha laatikko päättyi
   y 5345:een eli **arkin sisään**, ei 6423:een. Kartta-alan eteläisin
   466 yksikköä oli siis saavuttamattomissa, mutta laatatonta aluetta ei
   päässyt katsomaan. Sen sijaan **lava** (panoroitava ala) ulottui
   uloimmalla portaalla y −2389…8396 eli 1342 yksikköä arkin yläpuolelle
   ja 2135 alapuolelle — juuri sitä tyhjää, jonka kohta 3 mainitsi.

### Mitä muutin

| paikka | muutos | miksi |
| --- | --- | --- |
| `js/laattapyramidi.js` | uusi `pyramidinArkki(lauta)` + `ARKKI_VARALLA` | arkki samasta lähteestä kuin laattojen paikat; muille laudoille null |
| `js/laattapyramidi.js` `paivitaPyramidi` | luettelon saavuttua `ui.paivitaLaudanRajat?.()` ennen laattojen laskentaa | jos ämpärin arkki eroaa varaluvuista, kamera korjataan ennen piirtoa |
| `js/kartta.js` `boardBounds()` | pyramidilaudalla palauttaa arkin; muut laudat ennallaan | kaupungeista johdettu laatikko on vanhan laudan mitta |
| `js/kartta.js` `sovitaMannerZoom` | lava leikataan arkkiin (ei aloitusnäkymässä) | ylä-/alakaista veisi panoroinnin alueelle, jossa ei ole laattoja |
| `js/kartta.js` `sovitaMannerZoom` | arkkia lyhyempi lava keskitetään (`alignSelf`) | `panY` on silloin pakotettu nollaan, ja kartta olisi jäänyt ruudun ylälaitaan koko tyhjä paperi alla |
| `js/ui.js` | uusi `paivitaLaudanRajat()` | laskee rajat uudelleen ja sovittaa näkymän VAIN jos laatikko muuttui |
| `tools/build-standalone.mjs` | `js/laattapyramidi.js` siirretty ennen `js/kartta.js`:ää | kartta tuo siitä arkin; niputustarkistus vaati järjestyksen |

Katselutilan maanosalaudat (`?lauta=africa`) käyttävät yhä vanhaa
`boardBounds`ia: `pyramidinArkki` palauttaa niille nullin täsmälleen
samalla `pyramidiKattaa`-ehdolla, jolla laatatkin rajataan.

**Varaluvuista** (`ARKKI_VARALLA`) haluan sinun tietävän: ne ovat sama
geometria kuin `pyramidi.json`issa, koska kamera tarvitsee arkin jo
ensimmäisessä sovituksessa mutta luettelo saapuu verkosta vasta piirron
jälkeen. Luettelo voittaa aina kun se on kädessä, eli uusi ajo eri
mitoilla korjaa itsensä — mutta jos arkin mitat joskus muuttuvat,
`ARKKI_VARALLA` on se yksi paikka, joka kannattaa päivittää samalla.

### Mitattu (iPad 834×1112, oikeat laatat)

| mitta | ennen | nyt |
| --- | --- | --- |
| `contentBox` | y 254 … 5345,2 | **y −1046,3 … 6261,4** (arkki) |
| lava uloimmalla portaalla | y −2388,9, korkeus 10 784,7 | **y −1046,3, korkeus 7311,2** (= arkki) |
| näkyvä alue uloimmalla portaalla | 10 186 yksikköä (arkin yli molemmista päistä) | **7309 yksikköä = koko arkki** |
| pohjoisin saavutettava lähikuvassa | y −124,4 | **y −1046,3** |

### Silmillä

`.../scratchpad/zoom/kuvat/`:

- `maailma-ennen-toiseksi.png` → `maailma-keski-toiseksi.png` — uloin
  näkymä ennen ja jälkeen: arkki mahtuu kokonaan ruudulle
  paperimarginaaleineen, MATKAKIRJA-kehyskilpi ylhäällä ja
  mittakaava + painajan rivi alhaalla. Tyhjä paperi jakautuu tasan ylös
  ja alas (ennen kartta oli kiinni ylälaidassa).
- `pohjoinen-ennen.png` → `pohjoinen-jalkeen.png` — Tromssasta
  pohjoiseen ääriasentoon: ennen Huippuvuoret leikkautuivat ruudun
  yläreunaan, nyt saaristo on kokonaan näkyvissä, ruudukko 88 °P asti,
  kartta-alan reuna 84 °N ja sen yllä paperimarginaali kehyksineen.
- `sofia-2-aariuloszoom.png` — löysennetty uloszoomaus Bulgariassa
  (kohta 1): Bulgaria keskellä, ylhäällä Suomenlahti, alhaalla Punainen
  meri, sivuilla Italia ja Kaukasus. **36 maata** ruudulla.

---

## 3. PÄÄTÖSKYSYMYKSET JA HAVAINNOT

### 1. Onko kerroin 3 pystyruudulla liikaa?

Kerroin rajaa LEVEYDEN kolminkertaiseksi; korkeus seuraa ruudun
muodosta. Puhelimen pystyruudulla (390×844) näkymä on siksi noin kaksi
kertaa niin korkea kuin leveä: Bulgariassa ääriuloszoom näyttää
Suomenlahdelta Egyptiin. Se on "maa ja naapurit" leveyssuunnassa, mutta
pystysuunnassa selvästi enemmän. **Kerroin 2 antaisi 570 yksikön
levyisen näkymän** (Balkan + Kreikka + Turkin länsiosa). Yksi luku,
yksi rivi — sano jos vaihdan.

### 2. Venäjällä löysennys osuu laudan reunaan

Kolminkertainen ikkuna on Venäjällä laudan leveyttä suurempi, joten
uloszoomaus vie koko maailmankuvaan (11 640 yksikköä). Sama koskee
tulevaisuudessa Kanadaa ja Yhdysvaltoja. Jos se on väärin, raja pitäisi
sitoa laudan leveyden osuuteen eikä pelkkään maan ikkunaan — mutta se on
oma sääntönsä enkä keksinyt sitä omin päin.

### 3. Leveä ikkuna (Mac) saa nyt eri yleiskuvan

Arkki on korkeampi kuin vanha laatikko (7308 vs. 5091), joten korkeus
alkaa rajoittaa yleiskuvaa jo kuvasuhteesta 1,64:1 alkaen (ennen
2,36:1). Leveässä työpöytäikkunassa yleiskuva näyttää siis koko arkin ja
kartta on pienempi kuin ennen — juuri se, mitä lisätehtävä pyysi — mutta
samalla `fitViewBox`in korttikaista (`kaista`, varattu alareunan
korteille leveällä ikkunalla) jää pois, koska sen ehto on sama
kuvasuhdevertailu. iPadilla ja puhelimella ei muutu mikään: siellä
leveys rajoittaa kuten ennenkin. En muuttanut kaistan sääntöä.

### 4. Edellisen raportin avoimet kysymykset ovat yhä auki

Maastonimen Wikipedia-nappi (2), nimetyt erikoispiirit (3) ja
saapumisen kamera-ajo (4) ovat ennallaan — ne eivät kuuluneet tähän
erään. Huomaa kuitenkin, että kysymys 4:n perustelu heikkeni: kamera ei
enää osu maan ikkunaan epäsuorasti, koska uloszoomauksen raja on nyt
kolminkertainen ikkuna. Saapuminen jää siihen mittakaavaan, johon peli
sen jättää, ja pelaaja voi jäädä kolminkertaiseen näkymään.

---

## 4. Palautuspiste

Palautuspiste on **d3902f24** (main ennen tämän haaran ensimmäistä
committia). Yksittäinen tiedosto palautetaan näin:

    git checkout d3902f24 -- js/kartta.js

Muutetut tiedostot: `js/kartta.js`, `js/laattapyramidi.js`, `js/ui.js`,
`tools/build-standalone.mjs`. Molemmat tehtävät ovat samassa
koodicommitissa, koska ne muuttavat samoja `js/kartta.js`:n funktioita
(`boardBounds`, `sovitaMannerZoom`, `fokusRajaukset`) ja koska ne
vastaavat samaan kysymykseen — mitä kamera saa näyttää. Raportti on oma
committinsa.
