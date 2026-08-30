# Viesti Fablelle — vanhan fokuslehtijärjestelmän purku (haara claude/lehtipurku)

*(Opus, 30.8.2026. Haara rebasattu tuoreeseen origin/mainiin
**c0381572 = v1364**. Versiota EI nostettu, PR:ää EI tehty — sinä
julkaiset. dist/ ei ole mukana. tools/fokuskartta/-piirtokoodiin ei
koskettu: toinen agentti on siellä.)*

## PALAUTUSPISTE — lue tämä ensin

Mitään ei ole tuhottu. Kaikki poistettu on tallessa gitissä, ja
palautuspiste on **c0381572** (main ennen tämän haaran ensimmäistä
committia). Yksittäinen tiedosto palautetaan näin:

    git checkout c0381572 -- js/karttapohja.js

Koko lehtijärjestelmä kerralla:

    git checkout c0381572 -- js/fokuskartta.js js/karttapohja.js \
      tools/tee-fokuskartta.mjs tools/tee-yleislehti.mjs

**R2-ämpäriin ei ole koskettu.** Vanhat lehtitiedostot
(`julisteet/fokus/*.webp`, `*.json`, ~135 lehteä + MAAILMA) ovat
ämpärissä ennallaan. Koodi ei enää viittaa niihin mitenkään, joten ne
eivät sekoita ketään; ne voi poistaa erikseen milloin tahansa, ja se
on ainoa peruuttamaton poisto koko tässä erässä. **Suositukseni: älä
poista niitä vielä** — ne maksavat vain säilytystilaa, ja pyramidin
täysajo (1,16–1,30 Gt) mahtuu R2:n 10 Gt:hen niiden kanssakin.

Mitään ei myöskään siirretty arkistokansioon: git-historia on arkisto.

---

## Lyhyesti

Purin lehtijärjestelmän kokonaan. Purun aikana löysin **kaksi vikaa,
jotka olivat jo tuotannossa v1363:sta lähtien** — toisen niistä
omistaja huomasi itse TestFlightissa kesken tämän työn. Korjasin sen.

**12 126 riviä poistettu, 159 lisätty** (24 tiedostoa). Kaikki portit
vihreinä: `node --test tests/*.test.mjs` → **# pass 1047, # fail 0**
(1 skipped), kaksoisavaimet ja niputus puhtaat, `build-standalone`
kääntyy, `dist` poistettu.

**Mitattu sivutuote: kartan tökkiminen loppui.** savuke-maailmanäkymä
samalla koneella, main vs. tämä haara:

| mitta | main (v1364) | tämä haara |
| --- | --- | --- |
| panoroinnin longtaskit | 761 ms, pahin 528 ms | **0 ms, pahin 0 ms** |
| nipistyksen longtaskit | 5470 ms | **671 ms** |
| savuke yhteensä | 10/14 | **13/14** |

Syy on kohta 2 alla: peli piirsi ja rasteroi koko vanhan kartan
laattojen alle joka eleessä.

---

## 1. Omistajan havainto oli oikea, ja jäljitin sen

> *"Peli piirtää alle ensin sen vanhan kartan ja sitten päälle sen
> uuden."*

Todensin sen Chromiumissa ennen korjausta. Laattakerroksen ALLA oli:

    rect.paper-pohja
    g.taide-pohja[1 kuva]        ← koko laudan rasteroitu pohjataso
    g.staattinen[7 kuvaa]        ← tarkkojen ruutujen sarja
      └ waves[2324] terrain[1077] compass-rose[11] map-title-group[2]
        air-routes[71] routes[1526] fares

eli koko vanha kartta, 5000+ elementtiä, piirrettynä ja rasteroituna
laattojen alle näkymättömiin. Latauksen alussa se ehti näkyä ennen
kuin laatat saapuivat — juuri se välähdys, jonka omistaja näki.

**Korjaus:** pelilaudalla laudan omaa pohjamaalausta ei enää piirretä
eikä sen bittikarttaputkea ajeta. Laatat OVAT pohjakerros.
Todennettuna korjauksen jälkeen: `staattinen` 0 lasta, ei
`taide-pohja`, ei `grain`, 40 laattaa kerroksessa.

Poistin samalla `drawPaperOverlay`in rakeisuusrectin pelilaudalta: se
piirtyi laattojen PÄÄLLE multiply-tilassa, eli **kaksinkertaisti
patinan**, joka on jo poltettu laattoihin (Raamattu, "PAPERIVAKIOT JA
KARTTAVAKIOT"), ja pakotti koko ruudun uudelleensekoituksen aina kun
nappula liikkui sen alla.

**Rajaa ei ylitetty.** Poistin pohjan MAALAUKSEN, en rakennetta:
maiden muodot, osuma-alueet, kaupungit, laatat, nappula ja
merkkikerrokset ovat koskemattomina omissa ryhmissään laattojen
päällä. `.staattinen` sisälsi vain pohjamaalausta — maiden muodot ovat
erillisessä `countryLayer`issa, joten mitään pelattavaa ei ollut
vaarassa.

**Katselutilan maanosalaudat piirtävät oman karttansa kuten ennen.**
Tämä oli purun suurin ansa: pyramidin arkki on maailmankartan arkki,
ja jos pohjamaalaus olisi poistettu kaikilta laudoilta, `?lauta=africa`
olisi ollut tyhjä paperi. Portti on `pyramidiKattaa(lauta)`
js/laattapyramidi.js:ssä. **Se ei ole kytkin eikä varajärjestelmä** —
se on arkin identiteetti, ja pelilaudalla kartta on aina ja vain
pyramidi. Todensin Afrikan katselulaudan silmillä: pergamentti,
mantereet, aallot, kompassi, reitit ja nimet ennallaan.

Sivutuotteena tämä korjasi toisenkin vian: pyramidi piirsi laattansa
myös maanosalaudoille, joissa ne osuivat aivan väärään kohtaan.

---

## 2. Poistetut tiedostot nimeltä

Peli:

| tiedosto | riviä | mikä hoitaa sen nyt |
| --- | --- | --- |
| `js/fokuskartta.js` | 3722 | laattapyramidi: laatat ovat kartta |
| `js/karttapohja.js` | 1444 | laatat ovat valmiiksi bittikarttaa; koosteelle ei ole tehtävää (moduulin oma kommentti sanoi tämän itse: *"Tämän poistaa vasta vaihe 4 (laattapyramidi)"*) |

Generointiputki:

| tiedosto | riviä |
| --- | --- |
| `tools/tee-fokuskartta.mjs` | 751 |
| `tools/tee-yleislehti.mjs` | 552 |
| `tools/tee-fokus-lisanimet.mjs` | 265 |
| `.github/workflows/patinoi-fokus.yml` | 190 |
| `.github/workflows/vie-fokus.yml` | 51 |

Savukkeet (testasivat nimenomaan lehtijärjestelmää):

| tiedosto | riviä | miksi |
| --- | --- | --- |
| `tools/savuke-atlas.mjs` | 1296 | atlaksen lehtivalinta |
| `tools/savukkeet/savuke-fokuskartta.mjs` | 1176 | maalehden lataus ja piirto |
| `tools/savukkeet/savuke-bittikartta.mjs` | 664 | js/karttapohja.js:n savuke |
| `tools/savukkeet/savuke-atlas-purku.mjs` | 439 | lehden purku ja pienennys |
| `tools/savuke-lehtimuisti.mjs` | 337 | fokuslehden muistijalanjälki |
| `tools/savuke-fokuskartta.mjs` | 280 | vanhempi kaksoiskappale |

Muutetut: `js/ui.js` (−424), `css/styles.css` (−343),
`js/laattapyramidi.js`, `js/main.js`, `js/media.js`,
`js/packs/fokus-grc.js`, `index.html`, `sw.js`,
`tools/build-standalone.mjs`, `tools/savukkeet/savuke-laattapyramidi.mjs`,
`tests/lento-ajoitus.test.mjs`.

Poistettu koodista: `?pyramidi`-lippu, `localStorage`-avain
`matkakirja-pyramidi`, kehittäjävalikon pyramidi-kytkin,
`pyramidiPaalla()`/`asetaPyramidi()`, `FOKUS_ALIPOLKU`,
`FOKUS_VUOSIKERTA`, `fokuskarttaUrl`, `YLEISLEHTI`, `FOKUS_SVG_NIMET`,
`body.fokus-atlas-nakyma`-luokka säätöineen, `.karttapohja-canvas`,
`.fokuskartta-kuva`, `.fokus-piiri*`, `.fokus-nimet`,
`vanhaLautaPiilossa()`/`piirtoLykkaantyy()`/`jatkaLykattyPiirto()`
-ketju, `paivitaAtlasVerho()`, `saapumisAsettuu`.

---

## 3. Mitä EN poistanut ja miksi

- **`FOKUS_POHJAT`** (js/packs/fokus-grc.js) — ohjeesi mukaisesti.
  Ks. kuitenkin päätöskysymys 1: **rajat eivät tällä hetkellä elä
  missään.**
- **`FOKUS_LAUTAPROJEKTIOT`, `FOKUS_MAANIMET`** — js/fokusmitat.js
  käyttää (mittajana, kartuutsi).
- **`FOKUS_LISANIMET`** — js/fokuskohteet.js tuo sen yhä (nimien
  kaksoiskappaleiden esto). Se on nyt laattoihin poltettujen nimien
  peilikuva; sisältölähde `tools/fokuskartta/maat.mjs` jäi elämään.
  Poistin sen *generaattorin* (`tee-fokus-lisanimet.mjs`), koska se
  luki ämpärin lehtien JSONeja.
- **Matkasanomat** — en koskenut. `js/lehti.js`, `js/maalehti.js`,
  `docs/moduulit/maalehti.md`, `savuke-lehtiasettelu`,
  `savuke-lehtiotsikko`, `savuke-lehden-alareuna`,
  `savuke-lehden-mitta`, `savuke-kehittajalehti` tarkistettu yksitellen
  otsikkotasolla: kaikki sanomalehteä, eivät karttalehteä.
- **`assets/kartat/*-keskusta.png`** — kaupunkikarttoja, ei fokuslehtiä.
- **`tools/patina.mjs`** — laattapyramidi käyttää sitä
  (`generoi-laattapyramidi.mjs` tuo `RESEPTIT`, `TAUSTA`,
  `patinoiSelaimessa`). **Ei saa poistaa.**
- **`tools/fokuskartta/`** — ohjeesi mukaan. Ks. luku 5.
- **Bittikarttaputki js/ui.js:ssä** (`rasteroiTaide`, `taideRengas`,
  `rasteroiRuutu`, `pilkoTaide`…). Se on nyt kuollutta pelilaudalla
  mutta **elävää katselutilan maanosalaudoilla** — ne rasteroivat yhä
  oman karttansa. Ei siis jäänne.
- **`docs/`-ohjedokumentit** — en voinut. `tests/dokumentit.test.mjs`
  vaatii, että jokainen `docs/*.md` on Raamatun kartalla ja että
  kartalla ei ole kuolleita viitteitä. En saa kirjoittaa Raamattuun,
  joten dokumenttien poisto tai arkistointi kaatuisi testiin. Ei
  osunut: yhtään puhtaasti fokuslehteä käsittelevää ohjedokumenttia ei
  ole (`docs/moduulit/maalehti.md` on Matkasanomat).

---

## 4. PÄÄTÖSKYSYMYKSET — nämä ovat tärkeitä

### 1. Panorointirajat eivät elä missään (kysyit, mihin ne jäivät)

Kysyit, mihin `FOKUS_POHJAT`:n rajat jäivät elämään. **Vastaus: ne
eivät jääneet, eivätkä ne olleet elossa jo v1363:ssa.** Tämä on
main-peräinen vika, ei tämän purun aiheuttama.

Ketju on: `kartta.fokusRajaukset()` lukee `ui.fokusPohjaBbox` →
sen asetti **vain** js/fokuskartta.js:n `piirra()`, kun maalehden KUVA
oli latautunut → kuvan lataus taas oli `nykyinenMaa()`-portin takana,
joka palautti `null` heti kun pyramidi oli päällä. Pyramidi on ollut
oletuksena päällä v1363:sta, joten `fokusPohjaBbox` on ollut `null`
koko sen ajan.

Seuraukset, jotka ovat **jo nyt tuotannossa pimeinä** (en aiheuttanut
enkä korjannut näitä):

- panorointi ei rajaudu maan ympärille (rajaus putoaa vanhaan
  valloitetun alueen laatikkoon) — Raamattu vaatii *"maatila rajaa
  panoroinnin maan ympärille"*
- kartuutsi (KREIKKA), mittajana ja maataulu piilossa (js/fokusmitat.js)
- kartan klikattavat kohteet, kohtaamispiste, eläintäyt ja
  selitevalikon kappalemäärät pois (js/fokuskohteet.js:442
  `if (!ui?.fokusPohjaBbox) return []`)
- sumuverhon reikä ja saapumisen kamera-ajo maan ikkunaan

**En kytkenyt näitä takaisin päälle**, koska se olisi ollut
ominaisuuden palautus eikä purku, ja koska ainakin yksi kuluttaja on
laattamaailmassa suorastaan haitallinen: `paivitaFokusPallot`
piilottaa pelimerkit `fokusPohjaBbox`in alueelta (sääntö on peräisin
siitä, että maalehti oli OPAAKKI kuva yhden maan päällä). Pyramidissa
"lehti" on koko maailma, joten sama sääntö piilottaisi pelimerkit
kaikkialta. Myös sumuverho on Raamatun mukaan lakkautettu.

**Suositukseni:** oma pieni erä, jossa `fokusPohjaBbox` syötetään
suoraan `FOKUS_POHJAT`-taulusta (ei kuvaa, ei latausta) ja kuluttajat
käydään läpi yksitellen — rajaukset ja kartuutsi päälle, pelimerkkien
piilotus ja sumuverho pois. Se on ~60 riviä ja palauttaa neljä
ominaisuutta. **Tämä on mielestäni kiireellisin jatkotyö**, koska
omistaja pelaa nyt ilman panorointirajoja ja ilman kartuutsia.

### 2. Nimetyt erikoispiirit katosivat jo v1363:ssa

Päiväntasaaja, kääntöpiirit, napapiiri ja Greenwichin meridiaani
nimiöineen (`.fokus-piirit`) olivat atlaskerroksen osa ja sammuivat
pyramidin myötä. Poistin koodin. Laatoissa on 20°:n asteverkko ja
hitusen tummempi päiväntasaaja, mutta **ei nimettyjä piirejä**.
Palautetaanko ne pelitilakerroksena vai poltetaanko laattoihin?

### 3. Saapumisen kamera-ajo maan ikkunaan on poissa

Maanvaihdon kamera-ajo (`maanNakyma` → maan ikkuna) asui
js/fokuskartta.js:ssä ja oli sekin kuollut jo v1363:ssa. Matkan
saattoajo (`aloitaSaattavaKamera`, js/ui.js) vie kameran
kohdekaupunkiin ja toimii normaalisti, joten matkustaminen ei ole
rikki — mutta maahan saapuminen ei enää zoomaa maan ikkunaan.
Poistin samalla `saapumisAsettuu`-lipun ja sitä vartioineen
testitapauksen `tests/lento-ajoitus.test.mjs`:stä. Onko tämä ok, vai
kuuluuko saapumiszoom palauttaa (kuuluisi kohdan 1 erään)?

### 4. R2:n vanhat lehdet

Ks. palautuspistelaatikko yllä. Suositus: jätä toistaiseksi.

---

## 5. Piirtomoottorin kuolleet osat (en koskenut — ajat itse)

`tools/fokuskartta/`-moottori jää, mutta näistä osista ei ole enää
kutsujaa, kun `tee-fokuskartta.mjs` ja `tee-yleislehti.mjs` ovat
poissa. **Tarkista jokainen erikseen** — luettelo on kartoitus, ei
poistolista, ja toinen agentti on tiedostoissa juuri nyt:

- **`maat.mjs` `FOKUSMAAT`-taulun lehtikohtaiset kentät**: `vuoto`
  (lehden vuotoreuna), `rajaus`/ikkuna, `vesileima`, `naapurit`-
  himmennys. Pyramidissa ei ole lehden reunaa eikä naapureita.
  HUOM: `kaupungit`, `meret`, `vuoret`, `jokinimet`, `poltetutNimet`
  ovat yhä **sisällön lähde** (`sisalto.mjs` lukee ne laattoihin) ja
  `js/fokuskohteet.js` viittaa niihin — ne JÄÄVÄT.
- **`piirto.js`**: yhden lehden kehys, kartuutsi, mittajana ja
  vesileima — pyramidissa atlaskehys tulee `maailmapiirto.js`:stä
  uloimmille laatoille.
- **`maailmapiirto.js`**: mahdollinen reunahäivytys/vuotoparametri.
- **`etopo.mjs`/`aineisto.mjs`**: maakohtainen rajaus lehden bboxiin,
  jos sellainen haara on.

## 6. Savukkeiden tila

| savuke | ennen | nyt |
| --- | --- | --- |
| savuke-laattapyramidi | 9/13 | **9/9** — poistin P1:n (mittasi *"lippu pois = vanha järjestelmä ennallaan"*, jota ei enää ole). P2b jäi pysyväksi vartioksi: se kaatuu, jos lehtipyynnöt palaavat. |
| savuke-maailmanakyma | 10/14 (main) | **13/14** — kolme suorituskykykaatumista korjaantui |
| savuke-kartta-tila | — | **20/20** |
| savuke-karttazoom | 30 ok / 5 EI | **sama 5 EI** — main-peräinen, koskee Matkasanomien kaupunkikarttaa eikä fokuslehteä |
| savuke-kartan-sujuvuus | 47/49 (main) | **48/48** — poistin kaksi väitettä, jotka mittasivat purettua koneistoa (ks. alla) |
| savuke-fokuskartta, savuke-atlas, savuke-atlas-purku, savuke-bittikartta, savuke-lehtimuisti | punaisia | **poistettu** — testasivat poistettua järjestelmää |

`savuke-kartan-sujuvuus`: väite *"atlasnäkymä on päällä ja vanha lauta
piilossa"* oli punainen jo mainissa (todensin ajamalla mainilla) —
piilotusluokkaa ei enää ole, koska piilotettavaakaan ei ole. Toinen
väite vaati, että pelilauta tuottaa rasteroituja ruutuja; nyt se ei
tuota yhtään, koska laatat ovat pohja. Jätin väitteen siitä osasta,
joka mittaa oikeaa vikaa (SVG:tä ei jäsennetä uudelleen).
**Jatkotyö:** tämän savukkeen ruutumittarit kannattaisi osoittaa
katselutilan maanosalautaan, jossa ruutukoneisto yhä elää.

Jäljelle jäävä yksi punainen (savuke-maailmanäkymä 0a) vaatii
`fokusPohjaBbox`in — se on päätöskysymys 1, ja se on identtisesti
punainen myös mainissa (todensin ajamalla savukkeen molemmilla).

## 7. Miten todensin

- `node --test tests/*.test.mjs` → 1047 pass / 0 fail / 1 skipped
- `tarkista-kaksoisavaimet`, `tarkista-niputus`, `tarkista-savukkeet` puhtaat
- `node tools/build-standalone.mjs` kääntyy (20 348 kt), `dist` poistettu
- **silmillä Chromiumissa** (390×844, dpr 3, pilottilaatat): peli
  Ateenaan, DOM-kerrokset luettu ennen ja jälkeen, kuvakaappaukset
  latauksen alusta ja pelitilanteesta. Kartta piirtyy pelkistä
  laatoista, laattojen alla ei ole mitään, ei yhtään
  `julisteet/fokus/`-pyyntöä.
- **silmillä katselutila** `?lauta=africa`: oma kartta ennallaan.

---

# Viesti Fablelle — merten nimet, kompassi ja atlaskehyksen tekstit (haara claude/merten-nimet)

*(Opus, 30.8.2026. Eri haara kuin yllä oleva lehtipurku. Versiota EI
nostettu, PR:ää EI tehty. Koskin vain
`tools/fokuskartta/maailmapiirto.js`,
`tools/generoi-laattapyramidi.mjs` ja
`docs/moduulit/laattapyramidi.md` — js/-puoleen en koskenut.)*

Toteutettu on kuvattu kokonaan dokumentissa
`docs/moduulit/laattapyramidi.md` luku 6e. Tässä ovat vain ne kohdat,
jotka **eivät ole minun päätettäviäni**.

## PÄÄTÖSKYSYMYS A — kaksi mittakaavajanaa, joista poltettu voi olla
## 41 % pielessä

Mitattu 30.8.2026. Arkille poltettu mittakaavajana on **tarkka vain
tason omassa mittakaavassa**. Asiakas valitsee lähimmän laattatason
logaritmisesti ja skaalaa kuvaa sen jälkeen
(`js/laattapyramidi.js valitseTaso`); mitattuna kerroin vaihtelee
välillä **0,708 … 1,413**. Poltettu jana on kiinni kuvassa, joten se
venyy samalla kertoimella mutta lukema pysyy:

> "5000 km" on ruudulla oikeasti **3 538 … 7 066 km**.

Tämä on **täsmälleen se vika**, jonka takia `js/fokusmitat.js` on
olemassa. Sen oma johdanto, omistajan tilaus 25.8.2026:

> *"Mittajana valehteli heti kun pelaaja zoomasi. Kuvaan poltettu jana
> on kiinni KUVASSA, joten se venyi zoomin mukana ja väitti yhä samaa
> 200 kilometriä. Mittakaava on kuitenkin ruudun ominaisuus, ei
> kuvan."*

Peli piirtää siis jo oman, ruutuun ankkuroidun janansa
(`laskeMittajana` / `paivitaFokusmitat`, kutsu js/ui.js:stä), joka
laskee pituutensa näkymästä ja valitsee lukunsa sarjasta 1–2–2,5–5.

**En poistanut poltettua janaa**, koska Raamattu listaa
mittakaavajanan atlaskehyksen osaksi (29.8.2026) — se on omistajan
lista, ei minun. Kynnys (z0–z2) pitää sen niillä tasoilla, joilla
arkkia katsotaan kokonaisena.

**Kysymys omistajalle:** näkyykö pelissä molemmat janat yhtä aikaa?
Jos näkyy, kaksi janaa samasta pelistä antaa eri luvun, ja poltettu on
se joka poistuu — silloin kartussi ja painajanrivi jäävät arkin
kuvitukseksi ja mittaaminen jää sille janalle, joka osaa mitata. En
päässyt tarkistamaan sitä avaamatta js/ui.js:ää, joka on toisen
agentin työn alla.

## PÄÄTÖSKYSYMYS B — kehysviivojen paksuus on samaa vikaluokkaa

Kaksoisviivakehys piirretään `paksuus * S`, eli se on kartan
mittakaavassa. Mitattuna se tarkoittaa:

| taso | ohut reunaviiva (1,4) | vahva kehysviiva (3,0) |
| --- | --- | --- |
| z0 | 0,15 px (näkymätön) | 0,32 px (näkymätön) |
| z2 | 0,59 px | 1,27 px |
| z7 | 18,9 px | **40,5 px** |

Vertailukohta: rannikon kynä on paperivakiona 1,1 px joka tasolla
(luku 6d). Katsottuna z7:n alamarginaali on 40 pikselin ruskea palkki
meren ja paperin välissä.

Luvun 6d oma sääntö sanoo, että **painojälki** (viivanleveydet) on
paperivakio ja vain **arkin geometria** (marginaalin korkeus) on
S:ssä. Kehysviivan PAIKKA on geometriaa, mutta sen LEVEYS on
painotyötä — eli se kuuluisi P:hen, ei S:ään.

**En muuttanut sitä**, koska se ei ole tekstiä (sain rajaukseksi
kehyksen tekstit) ja koska se muuttaa ilmeen myös uloimmassa päässä:
z0:lla viiva menisi 0,3 pikselistä 3 pikseliin, eli kartan reuna
ilmestyisi näkyviin siellä missä sitä nyt ei käytännössä ole. Se on
sama korjaus kuin rannikolle tehtiin luvussa 6d, ja sama perustelu
pätee — mutta se on yhden rivin muutos, jonka lopputulos kannattaa
katsoa erikseen.

## MIKSI EN TEHNYT NIMIÖIDEN CSS-PIKSELIMITOITUSTA

Omistajan päätös oli *"sama näkyvä koko kaikilla laitteilla"*, ja
perustelu on oikea paperivertaus. **Sitä ei kuitenkaan voi toteuttaa
laattoja generoimalla**, ja tämä on rakenteellinen este eikä
työmäärä — siksi pysähdyin, kuten pyysit.

Laatta on sama tiedosto kaikille laitteille, eikä se tiedä katsojan
pikselitiheyttä. Asiakas valitsee tason luvusta `skaala · dpr`
(js/laattapyramidi.js), jolloin yhden kuvapikselin koko ruudulla on

    1 kuvapikseli = skaala / tason tiheys ≈ 1 / dpr CSS-pikseliä

Poltettu nimiö, jonka koko on `k` kuvapikseliä, on siis ruudulla
`k / dpr` CSS-pikseliä. Jotta se olisi sama kaikilla laitteilla, `k`:n
pitäisi kasvaa dpr:n mukana — mutta tasoindeksi ei erota dpr:ää
zoomista: **sama taso valitaan sekä "dpr 3 ja kaukana" että "dpr 1 ja
kolme kertaa lähempänä"**. Yksi luku laatassa ei voi palvella kahta
riippumatonta muuttujaa.

Konkreettisesti: iPad dpr 2 maailmanäkymässä ja työpöytä dpr 1 samassa
CSS-zoomissa päätyvät ERI tasoille (z2 ja z1). Jos nimiö olisi z2:lla
kaksi kertaa isompi kuin z1:llä — mikä tekisi iPadista oikean — niin
sama sääntö tekisi työpöydällä zoomatessa nimestä kaksinkertaisen joka
zoomiportaassa. Se on täsmälleen se vika, jonka juuri korjasimme
merten nimistä (z7:llä nimi oli 9 laattaa leveä).

Kaksi todellista tapaa, ja **molemmat ovat js/-puolella eli minun
rajaukseni ulkopuolella**:

1. **Asiakas valitsee tason pelkästä `skaala`sta ilman dpr:ää**
   (js/laattapyramidi.js `valitseTaso`). Silloin nimiöt ovat samat
   CSS-pikseleinä kaikilla laitteilla ja kaikilla zoomeilla — juuri
   mitä omistaja pyysi. Hinta on, että tiheillä näytöillä kartta
   venytetään (dpr 2 → 2×, dpr 3 → 3×), eli **maasto on pehmeämpi**.
   Nimiöt kasvavat, mutta eivät terävöidy. Tämä on suoraan ristiriidassa
   omistajalle esitetyn perustelun kanssa (*"tarkempi paino tarkoittaa
   enemmän pisteitä samaan kokoon"*): laattapyramidissa ne pisteet
   menevät maastoon, eivät nimeen.
2. **Nimiöt pois laatoista ja peli piirtää ne ruutuavaruudessa**
   (Raamatun "ohut pelitilakerros"). Silloin ne ovat oikean kokoisia
   joka laitteella JA teräviä, ja yleistys on pelin päätettävissä
   ajossa. Tämä on iso arkkitehtuurimuutos, ja se poistaisi juuri sen
   syyn, jonka takia sisältö poltettiin laattoihin (omistaja 29.8.:
   *"kaikki reittipisteet ja kaupungit yms voidaan piirtaa suoraan
   yhteen karttaan"*).

Molemmat ovat omistajan päätöksiä, eivät minun. **En myöskään
säätänyt yleistyskynnyksiä**, koska niiden säätäminen on mielekästä
vasta kun tiedetään kumpi tie valitaan: vaihtoehdossa 1 nimet kasvavat
2–3-kertaisiksi ja kynnyksiä on kiristettävä, vaihtoehdossa 2 kynnykset
siirtyvät kokonaan pelin puolelle.

Sama koskee muita poltettuja mittoja, jotka omistaja pyysi
tarkistamaan (kaupunkipisteen säde 2,0–2,6 px, ison kaupungin rengas
4,6 px, vuorisymboli 4–5 px, kohderengas 3,2 px, reittien viivat
0,9–1,4 px): ne ovat samassa laitepikseliavaruudessa kuin nimiöt ja
kärsivät täsmälleen samasta asiasta. Ne kuuluvat samaan korjaukseen ja
samaan päätökseen — en erottele niitä, koska ne pitää muuttaa yhtenä
joukkona tai ei lainkaan, muuten piste ja sen nimi eivät ole enää
samassa suhteessa.
