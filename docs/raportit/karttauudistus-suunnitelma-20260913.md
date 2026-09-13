# Karttauudistus: suunnitelma ja toteutettavuusselvitys (13.9.2026)

*(Opus-työsessio Fablelle. Docs-only, ei versionostoa. Kaikki luvut on
LUETTU koodista tai laskettu koodin luvuista; jokainen väite on sidottu
tiedostoon ja riviin. Ristiriidassa Raamattu (js/tyohuone-raamattu.js)
voittaa tämän raportin. `npm test` ajettu: **3292 pass, 0 fail** —
docs/raportit/ on tarkoituksella kartan ulkopuolella
(tests/dokumentit.test.mjs:9–12), joten raportin polku ei laukaise
testiä eikä testeihin ole koskettu. PITUUS: tehtävänannon ohje oli
~600 riviä; raportti on ~930, koska kahdeksan luvun mitatut
inventaariot (maalehden otsikot, Pariisin jakotaulukko, kahdeksan
erää vastakokeineen) eivät mahtuneet sen alle ilman faktojen
pudottamista. Luku 1 on taustaa ja sen voi pudottaa puoleen, jos
Fable haluaa lyhyemmän version.)*

Omistajan idea on tehtävänannossa sanatarkasti; tämä raportti ei tulkitse
siitä mitään pois. Kohdat, jotka ovat ristiriidassa omistajan aiempien
päätösten kanssa, on merkitty **RISTIRIITA**-lipulla ja viety lukuun
"Omistajan päätettäväksi".

---

## 1. Nykytila

### 1.1 Kartta on yksi maailmanlaajuinen laattapyramidi

Pelin **ainoa** karttapohja on laattapyramidi (js/laattapyramidi.js:1–24;
omistaja 30.8.2026: *"poista kaikki muut vaihtoehdot käytöstä"*, *"ei
pidetä mitään varajärjestelmiä yllä"*). Vanha maakohtainen
fokuslehtijärjestelmä on purettu kokonaan.

Lukitut mitat (docs/moduulit/laattapyramidi.md luku 1–2): Miller, leveys
12000 = 360°, lon0 −175, pohjoinen 76 · **7,2 px/lautayksikkö** syvimmällä
(z7 = 86 400 × 52 616 px) · 8 tasoa, kerroin 2 · laatta 512 × 512 webp
q0,9 · **23 340 laattaa, 1,16–1,30 Gt** ämpärissä · korkeusdata 3
kaariminuuttia (0,05°) · **patina = 3/4 kaikista tavuista** (tavua/px
0,307 → 0,220; ilman patinaa trendi 0,307 → 0,061).

Laatat ovat `<image>`-elementteinä laudan koordinaateissa, eivät canvasta
(canvas mitattiin 8× hitaammaksi, js/laattapyramidi.js:26–32); taso
valitaan ruudun tarkkuudesta (`valitseTaso` 518–526, kutsu 1699).
Väriasteikot asuvat yhtenä kappaleena tools/fokuskartta/piirto.js:80–92,
ja maailmanmoottori (maailmapiirto.js) tuo ne sieltä.

### 1.2 Nykyinen paletti on ruskea; täysväri on olemassa vain linssinä

Pyramidin hypsometria (piirto.js:179–193) kulkee 214,202,168 (−60 m) →
150,90,62 (2900 m) → lumi 168,158,150 (5500 m); perustelu 95–98: *"sama
väriperhe kuin pelin seepiakartassa (#e7d2a4 → #c69257 → #a2603a)"*. Meri
**ei ole sininen** vaan "viileä paperi, syvyys porrastettuna" (195–208).
Omistajan lause *"muiden maiden kartat ja valtion ulkopuoliset vedet ja
meret ennallaan ruskean sävyissä"* kuvaa siis nykytilaa täsmälleen.

Topografialinssi on **yksi `<image>`** laudan rajasuorakulmiossa
(js/linssit/topografia.js:15–21), peittävyys kova 0,72 (rivi 56), kuva
`assets/linssit/topografia.webp` **1 043 818 tavua, 3600 px leveä**
(tools/tee-reliefikartta.mjs:120–135) ja **jo Milleriin projisoitu samaan
lautaan** (96–104). Sen värit ovat aito hypsometria varjostuksineen
(160–185 `MAA`: 62,110,66 → 205,196,112 → 182,132,82 → 232,232,235;
195–205 `MERI`: 176,214,240 (0 m) → 140,190,228 (−200 m, mannerjalusta) →
62,112,176 (−2500 m) → 10,28,78 (−11 000 m)). **Batymetria on siis jo
olemassa ja jo väritetty.**

Tarkkuus 3600 px / 12 000 yksikköä = **0,30 px/yksikkö**, eli **24×
karkeampi kuin pyramidin z7**; Ranskan maa-ikkuna on tuosta kuvasta
200 × 166 px. Tämä on se, mitä omistaja tarkoittaa lauseella
*"renderöidään se vain mahdollisimman tarkaksi uudessa versiossa"*.

### 1.3 Korkeusaineisto, maamaskit ja rajadata

Korkeus (tools/hae-korkeusruudukko.mjs:1–16, 148–155): **ETOPO1 Global
Relief, Ice Surface**, NOAA, Amante & Eakins 2009,
doi:10.7289/V5C8276M — **public domain**. Kaksi tarkkuutta: **3′ (0,05°)**
repon oma `tools/korkeusaineisto/` (tällä pyramidi ajetaan) ja **1′** R2:n
10°-palat (maailma 466 Mt, `haeKorkeusikkuna()` kokoaa ikkunan). Uutta
lähdettä ei tarvita; ETOPO 2022 (15″) on myös PD mutta turha, koska 3′ on
valittu varjostuksen kohinan takia ja tarkennus on *"pelkkä
`--kaariminuutit`-arvon muutos samalle laattaruudukolle"*.

Maskit ja rajat, kolme aineistoa:

1. **`assets/data/maapolygonit.json` — 1 448 535 tavua.**
   `ne_10m_admin_0_countries`, harvennus 0,006°, avaimena **ISO A3, 134
   maata**, valmiiksi laudan koordinaateissa ja mitatusti samassa kohdassa
   kuin poltettu rajaviiva (*"mediaani 0,02 lautayksikköä"*,
   js/maanaariviivat.js:18–29); laiska lataus kerran istuntoa kohti
   (62–71). **Uudistuksen tärkein yksittäinen aineisto.**
2. **js/linssit/ihmisen-matka-maamaski.js** — 0,5° (≈ 55 km), Ihmisen
   matka -linssin kulkulaskentaan; liian karkea piirtoon.
3. **tools/fokuskartta/rajat.mjs + rajat-nykyiset.json.gz** — Natural
   Earth viivatasona pyramidin polttoa varten, 0,44 Mt gzipattuna.

### 1.4 Maan ääriviiva on jo pelissä — ja punainen on jo kokeiltu

js/maatummennus.js piirtää nykyisen maan renkaat viivana kaikissa
mittakaavoissa (10–17, 35–50; omistaja 11.9.2026: *"Peli voisi piirtää
vahvemmalla AINA kyseisen valtion rajat jossa pelaaja on"*). Leveys
`TUMMENNUS_VIIVA = 2` ruutupikseliä (147), väri `rgba(70,51,31,0.6)`
(css/styles.css:1700–1706). Polku rakennetaan harvennettuna
(`maanPolku(renkaat, tarkkuus, leveys)` 174) ja pidetään muistissa (213).

**RISTIRIITA 1.** Punainen ääriviiva `.country-korostus` **poistettiin
30.8.2026**: *"punainen maan ääriviiva on epätarkka → OTETAAN POIS"*
(css/styles.css:5500–5507). Syy oli aineisto eikä väri — viiva tuli laudan
karkeasta 50m-rannikosta, kun poltettu ranta on 10m:ää. **Syy on
poistunut:** nykyinen viiva tulee samasta 10m-lähteestä kuin poltto
(js/maatummennus.js:81–93). Samalla kertaa poistettiin maan sävytys
`.country-tint` (css/styles.css:5490–5499, omistaja: *"Poista väritys."*)
— sekin on huomioitava, koska uusi idea maalaa kohdemaan pinnan uudestaan.

### 1.5 Kamera ja zoomirajat

**js/karttazoom.js ei ole pääkartan zoomi** vaan kohdekartan ja
lippukarttojen widget (1–7; PIENIN 1, SUURIN 3, ASKEL 1,5, rivit 46–56).

Pääkartta: näkymä on SVG:n `viewBox` (`fitViewBox()` js/kartta.js:558,
asetus 633, `ui.viewBoxSize` 614). Portaat `zoomiTasot()` (847), askel
`ZOOMI_ASKEL = 1.5` (91), lähin porras **`ZOOMI_LAHIN = 88` lautayksikköä**
(93; kapealla ruudulla 58, rivi 110). Saapumisporras `saapumisPorras()`
(881): `min(leveys × 0,43, 1500 | 650)`. Kamera-ajo `ajaKamera()` (1965).

Rajaus `fokusRajaukset()` (2550–2640): `ikkuna` =
`FOKUS_POHJAT[iso].rajaus`; `uloin` = ikkuna × `ULOSZOOMAUS_KERROIN` (= 3);
`kuva` = panoroinnin raja. *"Kauemmas ei pääse painikkeella, rullalla,
nipistyksellä eikä pelin omalla kamera-ajolla"* (2571–2573). Ohittavat:
kehittäjän maailmanappi (2625), `kameraVapaa` (2627) ja yleiskuva ilman
`mannerZoom`ia (2636).

Maan ikkunataulu **FOKUS_POHJAT** (js/packs/fokus-grc.js:96–) säilyi
kuvien purussa: **134 maata**, kullakin `bbox` ja `rajaus` lautayksikköinä.
Ääripäät: SGP 52,1 × 46,2 · LUX 66,3 × 84,0 · ALB 98,8 × 167,5 · GRC
467,9 × 292,4 · FRA 666,1 × 553,4 · USA 2618 × 1314 · CAN 3745 × 2341 ·
**RUS 5772 × 2273**. Maltaa ja Monacoa ei taulussa ole eivätkä ne ole
pelissä kaupunkeina.

### 1.6 Karttanostot ja fokusvirta

Ladonta js/fokuskohteet.js (5 949 riviä) tarvitsee maan ikkunan: *"Ilman
lehden ikkunaa (FOKUS_POHJAT) maa ei lado mitään"* (3237–3242). Noston
kentät (js/packs/fokuskohteet-fra.js:68–): `id, nimi, nimio?, tyyppi,
symboli, kysymykset[], korostukset[], nappi,
laudat{maailmankartta:{x,y}}, teksti, lahde, ihme?, kattoVapaa?`;
täkynostolla lisäksi `otsikko, lunastus[], kuva{}, paikka{}`
(js/packs/fokusvirta-pariisi.js:622–676).

**Ranskassa 38 nostoa** (`node tools/laske-karttanostot.mjs`: koh 13 · maa
6 · elä 1 · ska 3 · het 6 · kul 9). Pääkartalla katon jälkeen 20 merkkiä,
kohdekartalla 11 (docs/moduulit/karttanostot-kattavuus.md:74, "täysi").

**Valikoituminen on nelivaiheinen, eikä zoomitaso- tai km-suodatusta ole:**
(1) maan ikkuna on oltava (js/ui.js:9530–9566, 9599);
(2) `kohdeKarttarivit()` pudottaa maan bboxin ulkopuoliset
(js/fokuskohteet.js:516, 531–538); (3) `karsiKaupunkikartanNostot()`
pudottaa jokaisen, jonka tunnus on jonkin
`KAUPUNKIKARTAT[x].kohteet[].nosto`-kentässä (545–604);
(4) `karsiKaupunkiruuhka()` (720) sallii `KAUPUNKIKATON_SADE = 8` yksikön
säteellä enintään `KAUPUNKINOSTOJEN_KATTO = 3` merkkiä (708–709),
prioriteetti ihme > `skandaali-` > `syvennys-` > `nosto-` > muu (711);
`tyyppi:'kaupunki'` ja `kattoVapaa: true` ohitetaan (726–727).

Zoom vaikuttaa vain näkyvyyskytkimeen: `paivitaNakyvyys()` (4012)
piilottaa koko kerroksen, jos maan bbox täyttää alle
**`LEHDEN_VAHIN_OSUUS = 0.5`** näkyvän kartan leveydestä (3924; perustelu
3902–3923: *"MITTA ON OSUUS, EI ZOOMITASO"*).

Raamatun päätös 2.9.2026 (N2) siirsi kartan omat kohteet pääkartalta
kaupunkilehden kohdekartalle (14/16 sai pisteen) — **sama liike, jota
omistaja nyt pyytää toiseen suuntaan.** Luku 4 on siis uudelleenjako, ei
uusi mekanismi. Karsintasääntö ajaa sekä elävässä kerroksessa että
poltossa (672–675, NOSTOLADONTA_SAANTO v3).

### 1.7 Kaupunki- ja maalehti

**Kaupunkilehti** (docs/moduulit/kaupunkilehti.md, js/lehti.js,
js/nahtavyydet.js): sivupino `rakennaSivut()` (js/lehti.js:208). Sivu 0 =
etusivu (masto, päiväysrivi, sää, herokuva, esittely, kansikuvat/ennenNyt,
maaosasto, **"Kaupunki kartalla"**, **"Matkailijalle"**, mediarivi —
js/lehti.js:472–545, js/nahtavyydet.js:159 ja 1432); sivu 1 = kansiosasto
`id:'kaupunki'` kulttuurivisoineen (304, 495–496); sivut 2…n−1 =
`KULTTUURI_KATEGORIAT[cityId]` (225); viimeinen = **Menovinkit**,
lainattuna maapaketista (327–329). Mitta ≤ 9 aihetta, 4–7 nostoa/aihe.

**Nähtävyyskartta:** `KAUPUNKIKARTAT` js/packs/maakartat.js:2963, **178
karttaa**; piirto `piirraKaupunkiKartta()` js/nahtavyydet.js:159, zoom
`kytkeKarttaZoom()` (kutsu 868), kokoruutu `avaaKarttaSuurennos()` (1015),
avaus `avaaNahtavyys()` (546–548). **Marseille 6 kohdetta**
(maakartat.js:4189), **Pariisi 25** (4679: 11 klassista + 14 kartalle
siirrettyä nostoa).

**Maalehti** (docs/moduulit/maalehti.md): sivupino js/lehti.js:283–292 =
`maa-etusivu` + `MAA_KATEGORIAT[iso]` + `maa-numeroina` (348); avaus
`avaaMaalehti()` (719); **114 maata**; mitta 5–6 aihetta × 4–5 nostoa.

**RANSKAN maalehden sivuotsikot sanatarkasti**
(js/packs/maa-kategoriat.js:6799–7423): **Historia** (4 nostoa) ·
**Ruokaa ja tapoja** (4) · **Keksinnöt** (4) · **Luonto** (4) ·
**Urheilu** (4) · **Arki ja tavat** (2) · **Tavat** (2) · **Menovinkit**
(4 ryhmää / 14 linkkiä). Ranskalta puuttuvat Musiikki ja Kuvataide, jotka
ovat koko pelin yleisimpien joukossa.

Koko pelin otsikkojoukko (114 maata, esiintymiä): Historia 89 · Ruoka 87 ·
Luonto 81 · Musiikki 69 · Kuvataide 43 · Menovinkit 31 · Historian hetki
18 · Urheilu 15 · Kirjallisuus 13 · Tiede 12 · Rakennukset 11 · Käsityö 10
· Keksinnöt 7 · Arki ja tavat 6 · Muinaisuus 6 · Tavat 5 · Meri 5.

### 1.8 Kulkutavat, kassa, visa, aarre ja saapuminen

**Kulkutapoja on neljä: `land`, `sea`, `fly`, `stay`**
(`game.travelModes()`, js/game.js:956–969). **Bussia ja liftausta ei ole**;
ainoa sukulainen on tapahtumakortin `{ kind: 'kyyti' }`
(js/packs/africa.js:364–366 → js/game.js:2223–2230), joka ei laukea
maailmankartalla (`MAAILMANKARTTA.events` on tyhjä). Hinnat
`SEA_FARE = 100` (js/game.js:12), `FLIGHT_PRICE = 300` (js/rules.js:6),
`START_MONEY = 300` (js/game.js:11).

Reittidata js/packs/maailmankartta.js: **261 kaupunkia** (62 lentokenttää,
19 aloituskaupunkia), **408 kaarta — 297 `land`, 111 `sea`** (`EDGES`,
533), **71 lentoparia** (`airRoutes`, 1139). Naapuruus on valmiina
`board.adj`issa (js/rules.js:181, 198–199), ja **valmis funktio
`rideTarget(player)` (js/game.js:2282–2292) tekee jo täsmälleen
"vierekkäisen kaupungin" päättelyn.**

Kassa: kenttä `money`; **yhtä `addMoney`-funktiota ei ole**, vaan
`p.money +=` on 11 paikassa (kulttuurivisa 25 rivi 1189, lehden
minitehtävä 10 rivi 1208, `EXPLORE_REWARD = 50` rivi 2424,
`HARD_BONUS = 100` rivi 2439, `STAR_PRIZE = 2000` rivi 2885…).
Lehtitehtävän palkkio UI:sta `FOKUS_TEHTAVA_PALKKIO = 50`
(js/fokustehtavat.js:111). Tietäjäpisteillä yksi portti `awardXp()`
(js/game.js:1017–1023).

Visan datarakenne `{ q, options[4], correct, level 1–3, hint, fact,
source }` (js/packs/europe-questions.js:7, 13–21); arvonta
`pickQuestion()` (2712–2737), esitys `actionQuiz()` (1896–1984),
palkitseminen `answerQuiz()` (2366).

**"Pieni kysymys lopussa" on jo olemassa** lehden sivuilla:
`lehtitehtavat`-taulukko fokusvirtapakassa, muoto `{ id, sivu, otsake,
palkinto: 'piste'|'juliste', juliste?, visa: { kysymys, vaihtoehdot, oikea,
fakta } }` (js/packs/fokusvirta-ateena.js:598–614), piirto
`piirraNimettyTehtava` (js/fokustehtavat.js:828–960), kirjaus
`game.actionMinitehtava` (js/game.js:1202). **Täkynoston
`nosto.kysymykset` EI ole visa** vaan chat-avaus pululle ilman oikeaa
vastausta ja ilman palkkiota (js/fokusnosto.js:1303–1327).

Aarre: vihreä piste syttyy, kun lehden AARTEEN AVAUS -kysymys on ratkaistu
(`fokusvirtaKohtaamispiste`, js/fokusvirta.js:5440–5457, ehto
`fokusAarreAvattu`); piirto js/fokuspiste.js (osuma-alue r = 22). **Matkan
voi jo nyt jatkaa ilman aarretta** (`travelModes` ei katso laattaa).

Saapuminen: `visitCity()` (js/game.js:1072–1088); UI-ketju `render()`issa —
`fokusvirtaSaapuminen` (js/fokusvirta.js:1291–1315) → `renderFact` →
`fokusvirtaMerkintaLuettu` (582–600) → `fokusvirtaSaapumiskupla` (1122) →
`naytaEtsiAarreNappi` (1226). **Kaupunkilehti ei aukea itsestään**; ovi on
`avaaTutkinta()` (js/ui.js:11149–11157).

Pulun ohjekupla: `polloVihje(teksti, kohde)` (js/pollo.js:6732–6734),
`polloLisavihje` (6748), `polloSaapumiskupla` (6758), `polloPuheenvuoro`
(js/fokusvirta.js:1214). Ensimmäisellä kaupungilla on jo erityiskohtelu:
Livian tuurauspaljastus kertalipulla `matkakirja-livia-paljastus`
(js/livia.js:496–656).

Tallennus: `SAVE_KEY = 'matkakirja-save-v1'` (js/main.js:127), skeema
`Game.toJSON()` **version 2** (js/game.js:2968–3025), migraatio
`Game.fromJSON` hyväksyy versiot 1 ja 2 (3033–3160), uudet kentät oletetaan
`?? []`-kuviolla (3140–3160).

---

## 2. Toteutettavuus: "vain kohdemaassa värillinen topografia"

### 2.1 Vastaus: KYLLÄ — mutta ei niin kuin kysymys olettaa

Kysymys olettaa, että *"pohjana pelissä jo oleva korkeuserolinssi"*
voidaan vain rajata maan muotoon. Se toimii heti, mutta vain
maailmannäkymän tarkkuudella (0,30 px/yksikkö, luku 1.3) — eli juuri siinä
mittakaavassa, jossa uutta karttaa ei katsota. *"Mahdollisimman tarkka"*
vaatii uuden rasterin.

**Rajaus on helppo osa, ja sen aineisto on jo pelissä.**
`assets/data/maapolygonit.json` (luku 1.5) on ISO A3 -avaimellinen,
laudan koordinaateissa ja mitatusti samassa kohdassa kuin poltettu raja.
Sama polku, jonka js/maatummennus.js jo piirtää viivana, kelpaa
sellaisenaan `<clipPath>`-sisällöksi.

Mitattu monimutkaisuus (renkaita / pisteitä): ALB 1 / 458 · ITA 12 / 2 956
· ESP 14 / 2 674 · FRA 16 / 4 264 · GRC 55 / 5 250 · IDN 199 / 17 264 ·
NOR 117 / 19 114 · **RUS 207 / 45 624**. FRA ja GRC ovat clipPathina
kevyitä, RUS/NOR/IDN eivät. **Suositus:** clipPath rakennetaan
js/maatummennus.js:n tapaan harvennettuna näkymän tarkkuuteen — siellä on
jo `maanPolku(renkaat, tarkkuus, leveys)` (rivi 174) ja polkumuisti (213)
juuri tätä varten.

### 2.2 Vaihtoehto (a): clipPath nykyisen reliefikuvan päällä

Yksi `<image>` + yksi `<clipPath>`; kuva osuu kohdalleen ilman uutta
laskentaa (luku 1.3). Lataus 1,0 Mt kerran koko maailmalle; batymetria
mukana. **Tarkkuus tappaa:** Ranskan ikkuna on 200 × 166 px, ruudulla
tuhansia — sumeaa puuroa.

**Tuomio: kelpaa pilotin ensimmäiseksi päiväksi ja vain sille.** Sillä
näkee viidessä minuutissa, näyttääkö värillinen maa ruskean naapurin
vieressä lainkaan siltä miltä omistaja haluaa. Lopulliseksi ei kelpaa.

### 2.3 Vaihtoehto (b): maakohtainen värireliefi rakennusaikana

**Koneisto on jo olemassa kahteen kertaan.** (1)
tools/fokuskartta/piirto.js osaa piirtää yhden maan maskin läpi:
`maanMaski = maski(aineisto.maa.renkaat)` (1107), maastokerros liitetään
maskin läpi (1135–1170), ja moottori tuntee jo eron kohdemaan ja
naapurin välillä (994: *"Sama kaava kuin kohdemaalla (osio 5)"*; 1183:
*"6a. VEDET KOHDEMAAN ULKOPUOLELLA"*). (2) tools/tee-reliefikartta.mjs
osaa täysvärisen hypsometrian ja meren syvyysasteikon.

Uutta koodia on siis vain **toinen väriasteikkopari** ja kytkin, jolla
kohdemaan maastokerros ja sen sisäiset vedet käyttävät sitä.

**Tiedostokoot**, laskettuna pyramidin mitatuista luvuista (värikerros on
patinoidun laatan päällä, joten patinaa ei piirretä kahteen kertaan →
0,06–0,08 tavua/px; patinan kanssa 0,19–0,21):

| Maa | `rajaus` | yksi kuva z6 (3,6 px/yks) | yksi kuva z7 (7,2 px/yks) |
| --- | --- | --- | --- |
| GRC | 468 × 292 | 1 684 × 1 053 = 1,8 Mpx → **0,14–0,37 Mt** | 7,1 Mpx → 0,6–1,5 Mt |
| FRA | 666 × 553 | 2 398 × 1 992 = 4,8 Mpx → **0,38–1,0 Mt** | 19,1 Mpx → 1,5–4,0 Mt |
| USA | 2 618 × 1 314 | 44,6 Mpx → 3,6–9,4 Mt | 178 Mpx → 14–37 Mt |
| RUS | 5 772 × 2 273 | **170 Mpx** → 14–36 Mt | 681 Mpx → **ei mahdollinen** |

**Johtopäätös: yksi kuva per maa toimii Euroopassa muttei
maailmanlaajuisesti.** RUS, CAN, USA, CHN, BRA, IND ja AUS eivät mahdu
yhteen kuvaan siinä tarkkuudessa, jossa niiden kaupunkeja katsotaan.

### 2.4 Vaihtoehto (c) — SUOSITUS: värilaatat samalle laattaruudukolle

Värireliefistä tehdään **toinen laattajoukko samaan ruudukkoon**
(`pyramidi-vari/z<taso>/<sar>/<riv>.webp`), jonka peli piirtää omana
`<image>`-kerroksenaan pyramidin päälle, **clipPath = nykyisen maan
polku**.

- **Peli ei tarvitse uutta latauslogiikkaa.** js/laattapyramidi.js
  valitsee jo tason (1699), noutaa näkyvän ympäriltä ruudun verran
  (sääntö 1), pitää karkean pohjan alla (2b) ja poistaa vanhan tason
  vasta kun uusi on paikallaan (2). Sama kerros toisella juurella on
  kopio, ei uusi moottori.
- **Kuorma seuraa ruutua, ei maata.** 1920 × 1080 syvimmällä tasolla on
  ~12 laattaa à 0,26 Mpx → **0,26–0,7 Mt** oli maa Albania tai Venäjä.
- **Rajaus on ilmainen:** clipPathin ulkopuoliset laatat voi jättää
  noutamatta, koska leikkurin laatikko tunnetaan ennen hakua.
- **Generointi tehdään maa kerrallaan** — siis pilotoitavissa yhdellä
  maalla, kuten Kustannuskuri vaatii.

Generointihinta (laattapyramidi.md luku 3: 1,17 Mpx/s ilman patinaa, lohko
4 × 4): GRC ~47 laattaa / 12 Mpx / ~10 s · FRA ~106 / 28 Mpx / ~24 s · RUS
~3 450 / 900 Mpx / ~13 min. Koko pelattava maailma on suuruusluokaltaan
**muutama tunti yhdellä säikeellä ja alle 0,3 Gt** (patinaton, vain
maa-alueet); pyramidi itse on jo 1,3 Gt ja R2:n ilmaisraja 10 Gt.

### 2.5 Suorituskyky, muisti ja välimuisti

- **Kontin 2–3 fps ei ole este** — se on ohjelmistorenderöinti ilman
  GPU:ta, ja kartan liike on jo kompositorilla. Mittaus tehdään silti
  savukkeella, ei arvata.
- **Muisti:** värikerros kaksinkertaistaa `<image>`-elementit kohdemaan
  alueella. Mittari `window.__pyramidinMittarit()`
  (js/laattapyramidi.js:536–543) on valmis; erän 1 valmis-kriteeri
  sidotaan siihen.
- **SVG-suodattimet ovat KIELLETTYJÄ.** tests/rules.test.mjs:4510–4522:
  *"iOS:n webapp-tilassa maa, rannikko, meren kaiut ja aallot katosivat
  kartalta heti kun sovellus kävi taustalla — kaikki juuri ne kerrokset,
  joilla oli suodatin."* Tästä kaksi kovaa rajaa: värjäystä **ei saa**
  tehdä ruskeista laatoista `feColorMatrix`illa (houkutteleva oikotie,
  joka myös epäonnistuisi, koska patinan rae on luminanssissa), eikä
  `<mask>`ia kannata käyttää rajaukseen. `clipPath` on turvallisin,
  mutta **se on todennettava oikealla iPadilla**.
- **Service worker:** sw.js esilataa vain repon omat tiedostot; laatat
  tulevat ämpäristä (`https://media.matkakirja.app/`, js/media.js:43).
  **Offline-pelissä kohdemaa on ruskea, kunnes värilaatat on kerran
  ladattu** (ks. luku 8.5).

### 2.6 Vedet: batymetria ja "valtion ulkopuoliset vedet ruskeina"

**Batymetria on ETOPO1:ssä mukana ja peli värittää sen jo**
(tee-reliefikartta.mjs:195–205). Uutta aineistoa ei tarvita.

Rajaussääntö on ainoa aito päätös. Natural Earthin `admin_0`-polygonit
ovat maa-alueita, joten pelkkä maan polygoni jättää rannikkovedet
ruskeiksi — ja *"vedetkin näkyvät sinisenä syyvyyserot huomioiden"* jäisi
rannikolla toteutumatta.

**Ehdotettu yksinkertaisin sääntö: maan polygoni laajennettuna ulospäin
12 meripeninkulmalla (22,2 km).** Se on aluevesiraja eli juuri se raja,
jonka omistajan sana *"valtion ulkopuoliset vedet"* olettaa.
Lautayksikköinä **6,7 yksikköä** (22,2 / 111,32 × 33,33) eli syvimmällä
tasolla 48 px sininen rannikkokaistale.

Toteutus **rakennusaikana, ei ajossa**: tools/generoi-maapolygonit.mjs
kirjoittaa toisen tiedoston `assets/data/maapolygonit-aluevesi.json`,
jossa renkaat on työnnetty 6,7 yksikköä ulos. Ajossa on silloin yhä yksi
tavallinen `clipPath` yhdellä polulla — ei `mask`, ei suodatin. Sisävedet
(järvet, joet) ovat polygonin sisällä ja tulevat mukaan itsestään.

Halvempi pilottivaihtoehto: ensimmäinen erä ilman puskuria, leikkuri =
rantaviiva. Silloin Ranskan järvet ja joet ovat sinisiä ja Välimeri
ruskea; Marseillen kaltaisessa merikaupungissa se todennäköisesti näyttää
keskeneräiseltä, ja siksi suositus on tehdä puskuri heti.

---

## 3. Zoomi ja rajat

### 3.1 "Maa niin suureksi kuin mahdollista"

Palaset ovat paikoillaan: maan laatikko on `FOKUS_POHJAT[iso].rajaus` (134
maata) tai laskettavissa kerran maapolygoneista; näkymä on `viewBox`
(`fitViewBox()`, js/kartta.js:558, asetus 633); saapumiszoomi on
`saapumisPorras()` (881) — **tämä on se rivi, joka vaihtuu**: tavoitteeksi
maan `rajaus` marginaaleineen; liike hoituu `ajaKamera()`lla (1965) jo
hyväksytyllä easingilla.

Marginaali: sama sääntö kuin `rajaaKasinPan`issa — neljännes
**pidemmästä** sivusta joka reunalle (js/kartta.js:2534–2547) — koska se
antaa kapealle maalle (Chile, Norja) leveyttä yhtä paljon kuin korkeutta.

### 3.2 Uloszoomauksen esto

**Tämä on jo toteutettu**: `uloin` = maan ikkuna ×
`ULOSZOOMAUS_KERROIN` (= 3), eikä kauemmas pääse millään eleellä
(js/kartta.js:2567–2576). Omistajan uusi lause on **tiukennus**:
kerroin 3 → 1.

**RISTIRIITA 2.** Kerroin 3 on omistajan oma päätös 30.8.2026, tehty
nimenomaan siksi, että *"Ilman löysennystä kamera oli lukossa maan omaan
laatikkoon, ja omistaja huomasi sen heti laitteella"* (2577–2581).
Sääntö 3 samassa lohkossa lisää: jos rajaus olisi ehdoton,
**naapurimaahan osoittava matkakohde jäisi ruudun ulkopuolelle eikä
matkaan pääsisi** (2589–2594).

Uusi **Liiku**-nappi (luku 6) ratkaisee tuon: kun kohteen valitsee napista
eikä kartalta, kameran ei tarvitse näyttää naapurimaata. Kerrointa voi
siis laskea — **mutta vain yhdessä Liiku-napin kanssa.** Suositus: 1,15 ja
`matkakohteidenAlue`-laajennus säilytetään.

### 3.3 Pienet ja suuret maat

- **Pienet** (SGP 52 × 46, LUX 66 × 84 lautayksikköä): lähin porras on
  `ZOOMI_LAHIN = 88` yksikköä (js/kartta.js:93), joten Singapore ja
  Luxemburg ovat jo nyt lähempänä kuin lähin porras — maa ei voi täyttää
  ruutua enempää. Suositus: `ZOOMI_LAHIN = min(88, rajaus × 0,8)`,
  jolloin pikkuvaltio saa oman lähiportaansa. Värilaattojen z7 kestää
  sen: 52 yksikköä = 374 px natiivia, ruudulla 1200 px eli 3,2×
  venytys; jos se on pehmeä, ratkaisu on z8, ei koodi. Maltaa ja Monacoa
  ei ole pelissä.
- **Suuret** (RUS 5 772 × 2 273): maan ikkuna on lähes puoli lautaa, ja
  *"niin suureksi kuin mahdollista"* olisi käytännössä uloszoomauksen
  pohja. Suositus: **saapumiszoomi kohdistuu kaupunkiin, ei maahan**,
  kun `rajaus.w > 1500` yksikköä — muuten pelaaja saapuu Vladivostokiin
  ja näkee Moskovan. Uloszoomauksen pohja pysyy silti maan ikkunassa.

### 3.4 Punainen rajaviiva

Paletin punaiset (css/styles.css): **`--mark: #b03a2b`** (muuttuja rivillä
90; käytössä maakäyrillä 14153, 14169, 15040, 15109) · `#c2452f` (4
osumaa) · `#c4321f` (radion live-piste 3235, sinettivaha) · `#a3281c`
(3228) · `#b0523c` (16290).

**Suositus: `--mark: #b03a2b`** — ainoa punainen, jolla on oma
muuttujanimi, ja jo kartan omien merkintäkerrosten väri. Toteutus:
`.maatummennus-viiva { stroke: rgba(70,51,31,0.6) }` →
`stroke: var(--mark)` (css/styles.css:1702) ja `TUMMENNUS_VIIVA` 2 →
2,5–3 (js/maatummennus.js:147).

Huom. css/styles.css:5845: *"Kirkas punainen ja sininen repisivät kartan
ilmeen rikki"* — se koski etusivun reittiviivoja, mutta sama esteettinen
riski koskee maan rajaa. Siksi punaisen sävy ja voimakkuus on kysymys 1
luvussa "Omistajan päätettäväksi". ---

## 4. Uusi käyttöliittymä

### 4.1 Maan perustiedot vasempaan alareunaan

Maalehden "Maa numeroina" -sivu on jo olemassa (`js/lehti.js:348`).
Perustiedot tulevat `MAATIEDOT`-taulusta (js/fokusmitat.js:58), jota maan
kartuutsi jo lukee. Uusi elementti on **HTML kartan päällä, ruutuun
ankkuroituna** — täsmälleen sama ratkaisu ja sama perustelu kuin
mittajanalla ja kartuutsilla (js/fokusmitat.js:22–40: *"Ruutuun ankkuroitu
nurkka pysyy nurkassa"*). Ei SVG:tä laudalle.

### 4.2 "Lisää"-nappi plussan tilalle ja värikoodattu valikko

Valikon otsikot = maalehden nykyiset sivuotsikot, jotka luetaan
`MAA_KATEGORIAT[iso]`-taulusta (js/lehti.js:283–292). Ranskan otsikot
ovat: **Historia · Ruokaa ja tapoja · Keksinnöt · Luonto · Urheilu · Arki
ja tavat · Tavat · Menovinkit** (js/packs/maa-kategoriat.js:6799–7423).

Koko pelin 114 maan otsikkojoukko (esiintymiä): Historia 89 · Ruoka 87 ·
Luonto 81 · Musiikki 69 · Kuvataide 43 · Menovinkit 31 · Historian hetki
18 · Urheilu 15 · Kirjallisuus 13 · Tiede 12 · Rakennukset 11 · Käsityö 10
· Keksinnöt 7 · Arki ja tavat 6 · Muinaisuus 6 · Tavat 5 · Meri 5.

**Värikoodi kannattaa sitoa jo olemassa oleviin symboleihin**, ei uuteen
väriskaalaan: `assets/kartat/symbolit/sym-historia.webp`,
`sym-ruoka`, `sym-kulttuuri`, `sym-urheilu`, `sym-luonto`,
`sym-tekniikka`, `sym-kauppa`, `sym-merenkulku`, `sym-sana`,
`sym-elain`, `sym-silma`, `sym-huuto` (sw.js:354–366). Kartalla on siis
jo kahdentoista aiheen kuvakieli; valikon värit ja ikonit poimitaan
siitä, jolloin nostot ja valikko puhuvat samaa kieltä.

Valikko aukeaa "napin paikalle ja sivuille ja alas" — eli se on
**ankkuroitu nappiin, ei ruudun reunaan**; pieni ruutu on mediakyselyllä
pinottu, kuten muillakin ruutuankkuroiduilla elementeillä
(js/fokusmitat.js:31–34).

Otsikon painallus → maalehden kyseinen sivu: ovi on `avaaMaalehti()`
(js/lehti.js:719); sivuindeksi tulee `MAA_KATEGORIAT`-taulun
järjestyksestä.

### 4.3 Kaupungin klikkaus → iso pop-up

Sisältö on kaupunkilehden etusivu palasteltuna: **herokuvat +
esittelyteksti + nähtävyyskartta**. Kaikki kolme ovat jo omia
funktioitaan: etusivun kokoaja js/lehti.js:472–545, kohdekartta
`piirraKaupunkiKartta()` js/nahtavyydet.js:159 (zoom `kytkeKarttaZoom`,
js/nahtavyydet.js:868), kokoruutu `avaaKarttaSuurennos()`
js/nahtavyydet.js:1015.

**Tämä on siis sivun uudelleenkokoamista, ei uutta piirtoa** — mutta
`js/lehti.js`in sivupinosta on irrotettava kolme osaa omiksi
kutsuttavikseen. Se on erän oma työ, ei sivutuote.

### 4.4 "Turisti-info" -merkki kaupungin viereen

Lähde on kansiosaston `matkailijalle{kuva, kappale, artikkeli}` (Pariisi
js/packs/kulttuuri-kategoriat.js:5868, Marseille :10094) ja etusivun
"Matkailijalle"-lohko (js/nahtavyydet.js:1432).

Merkki on tavallinen karttanosto, jolla on oma symboli; sijoitus kaupungin
viereen, ei päälle (kaupunkiruuhkan katto ohitetaan `kattoVapaa: true`,
js/fokuskohteet.js:726–727 — sama kuin Pariisin kaulanauhaskandaalilla jo
nyt).

### 4.5 Nostot näkyviin vasta lähizoomilla

**Tämä on jo olemassa mutta väärässä mittakaavassa uuteen käyttöön.**
`paivitaNakyvyys()` (js/fokuskohteet.js:4012) piilottaa koko
nostokerroksen, jos maan bbox täyttää alle `LEHDEN_VAHIN_OSUUS = 0.5`
näkyvän kartan leveydestä (js/fokuskohteet.js:3924; perustelu
:3902–3923 *"MITTA ON OSUUS, EI ZOOMITASO"*).

Uudessa kulussa kartta AVAUTUU maan kokoisena, joten osuus on ~1,0 ja
kaikki nostot näkyvät heti — juuri se, mitä omistaja ei halua. **Suositus:
nostoille kaksi luokkaa** — `nosto.lahi: true` syttyy vasta kun näkyvän
kartan leveys alittaa esim. kolmanneksen maan ikkunasta, muut näkyvät
heti. Mitta pysyy osuutena eikä zoomitasona, jolloin olemassa oleva
perustelu kestää.

### 4.6 Pilottikaupunki: PARIISI

**Perustelu.** Uudistuksen omien sanojen mukaan *"koko tämän
uudistuksen tärkein juttu on palastella kaikki materiaali
mahdollisimman pieniksi klikattaviksi paloiksi"* ja *"Tämä on
uudistuksen ehkä suurin työ."* Se työ on **jakopäätös**, ja jakopäätös
on olemassa vain siellä, missä on jaettavaa.

- **Pariisi:** 9 osastoa, 20 nostoa, 25 kohdekarttapistettä, 19 lähellä
  olevaa karttanostoa. Lisäksi Pariisissa on **jo tehty sama liike
  kerran**: Raamatun päätös 2.9.2026 (N2) siirsi 16 nostoa pääkartalta
  kohdekartalle, ja niistä näkee mikä toimi.
- **Marseille:** 2 osastoa, 5 nostoa, 6 kohdekarttapistettä. Siellä ei
  ole jaettavaa — pilotti näyttäisi helpolta ja valehtelisi.

Marseille on silti mainittava: se on pelin ohuimpia kaupunkilehtiä (ei
historiaa, ei musiikkia, ei kuvataidetta), ja uudessa käyttöliittymässä
ohuus **näkyy heti**, koska valikossa on vain kaksi riviä. Se on
sisältötyötä, ei tämän uudistuksen työtä — kirjattu Fablelle.

### 4.7 Pariisin inventaario ja ehdotettu jako

**A. Kaupunkilehden sivut** (js/packs/kulttuuri-kategoriat.js:5752–;
menovinkit js/packs/maa-kategoriat.js:7422):

| Nyk. sivu | nostoja | Ehdotus |
| --- | ---: | --- |
| Etusivu (hero, esittely, kansikuvat, ennenNyt, kohdekartta) | — | **Iso pop-up** (kaupungin klikkaus) |
| "Matkailijalle" (etusivun lohko) | — | **Turisti-info-merkki** → oma pop-up |
| Sää + päiväysrivi | — | Iso pop-up, esittelyn alle |
| Maaosasto (etusivun lohko) | — | **Pois** — maa on nyt vasemmassa alanurkassa ja lisää-valikossa |
| **Pariisi** (kansi) | 4 | Neljä erillistä nostoa: 72 nimeä → **kohdekartta** (Eiffel), Metron sisäänkäynti → **kohdekartta**, Kukko → **kohdekartta** (Notre-Dame), Patonki → **pääkartta** kaupungin viereen (ruoka-symboli) |
| **Musiikki** | 3 | **Yhdistetään yhdeksi nostoksi** "Pariisi soi" → kohdekartta (Opéra); yksi minikysymys |
| **Historia** | 7 | Kolme parasta **kohdekartan pisteiksi** (Bastilji, Tuileriat, Vrain-Lucas ovat jo siellä), loput neljä **yhdeksi nostoksi** "Pariisin vuosisadat" |
| **Historian hetki** × 6 | 6 | **Ei tehdä mitään** — kaikki kuusi ovat jo kohdekartalla (N2, 2.9.2026) |
| **Menovinkit** (lainattu FRA:sta, 14 linkkiä) | — | **Maan lisää-valikkoon** ("Menovinkit"), ei kaupunkiin — se on maalehden sivu jo nyt |
| Kulttuurivisa (sivulla 1) | — | Iso pop-up, sivun loppuun (jo nyt lehden minitehtävä) |

**B. Pariisin nykyiset karttanostot** (19 kpl; ks. luku 1.8):

| Nosto | et. (lautayks.) | Nyt | Ehdotus |
| --- | ---: | --- | --- |
| skandaali-kaulanauhajuttu-1785 | 7,3 | pääkartta (`kattoVapaa`) | **Pääkartta**, säilyy |
| chartresin-katedraali | 32,9 | pääkartta | **Pääkartta** (lähizoom) |
| loire | 42,7 | pääkartta | **Pääkartta**, säilyy (joki) |
| chambord | 59,0 | pääkartta | **Yhdistetään** Loiren nostoon ("Loiren linnat") |
| bayeux-seinavaate | 102,8 | pääkartta | **Pääkartta** (lähizoom) |
| douaumont | 104,1 | pääkartta | **Pääkartta**, säilyy |
| mont-saint-michel | 128,4 | pääkartta | **Pääkartta**, säilyy |
| carnacin-kivirivit | 187,6 | pääkartta | **Pääkartta** (lähizoom) |
| biskajanlahti | 237,3 | pääkartta | **Pääkartta**, säilyy (meri) |
| bastilji, tuileries, carmenin-ensi-ilta, kirahvin-kavelymatka, lustig-eiffel, mona-lisan-varkaus, vrain-lucas, impressionistit, kyyhkyposti, tuileriat | — | kohdekartta | **Kohdekartta**, säilyvät |

**Määrä katon jälkeen:** pääkartalla Ranskassa on nyt 20 merkkiä,
kohdekartalla 11 (docs/moduulit/karttanostot-kattavuus.md:74, tila
"täysi"). Ehdotus lisää kohdekartalle ~6 ja pääkartalle 1 —
**kaupunkiruuhkan katto `KAUPUNKINOSTOJEN_KATTO = 3` säteellä 8
yksikköä (js/fokuskohteet.js:708–709) hoitaa loput automaattisesti.**

---

## 5. Minikysymykset ja aarre

### 5.1 Kysymys joka kolmanteen nostoon

**Mekanismi on olemassa, mutta väärässä paikassa.** Lehden sivulla on jo
loppukysymys palkkioineen: `lehtitehtavat`-taulukko fokusvirtapakassa,
muoto `{ id, sivu, otsake, palkinto: 'piste'|'juliste', juliste?,
visa: { kysymys, vaihtoehdot, oikea, fakta } }`
(js/packs/fokusvirta-ateena.js:598–614), piirto `piirraNimettyTehtava`
(js/fokustehtavat.js:828–960), kirjaus `game.actionMinitehtava`
(js/game.js:1202), palkkio `FOKUS_TEHTAVA_PALKKIO = 50`
(js/fokustehtavat.js:111).

Täkynoston `nosto.kysymykset` **ei ole visa** vaan chat-avaus pululle
ilman oikeaa vastausta ja ilman palkkiota (js/fokusnosto.js:1303–1327).

**Suositus:** nostolle lisätään valinnainen kenttä `visa` samalla
muodolla kuin lehtitehtävällä, ja `js/fokusnosto.js` piirtää sen kortin
loppuun samalla komponentilla kuin `piirraNimettyTehtava`. Kirjaus
kulkee `game.actionMinitehtava`n läpi, jolloin kassa, tietäjäpisteet ja
tallennus toimivat ilman uutta koodia. Palkkio: sama 50 p, tai pienempi
(25 p) koska kysymyksiä tulee enemmän — **omistajan päätös**.

"Joka kolmanteen" on **sisältökiintiö, ei koodi**. Se kuuluu
docs/moduulit/tarinakaari.md:n kiintiöihin ja sitä valvotaan savukkeella
(luku 7).

### 5.2 Aarre vihreänä pisteenä

Vihreä piste on jo olemassa: `fokusvirtaKohtaamispiste`
(js/fokusvirta.js:5440–5457), piirto js/fokuspiste.js (osuma-alue r = 22).
**Nykyinen ehto on `fokusAarreAvattu`** eli lehden AARTEEN AVAUS
-kysymyksen ratkaisu.

Uusi ehto: **≥ 2 ratkaistua minitehtävää**. Laskuri on jo tallennuksessa
(`game.toJSON()` version 2, js/game.js:2968–3025); ratkaistut minitehtävät
kirjataan `actionMinitehtava`ssa (js/game.js:1202). Muutos on siis yksi
ehtolauseke, ei uusi tila — mutta **laskuri on kaupunkikohtainen**, ja se
on tarkistettava: nykyinen kirjaus voi olla globaali.

Omistaja sanoo *"kunhan on ratkaissut vähintään kaksi mitä tahansa mini
tehtävää nostoissa"* — siis **nostojen** minitehtäviä, ei lehden. Jos
laskuri on yhteinen, ehto täyttyy vahingossa vanhoista lehtitehtävistä.
Suositus: oma laskuri `nostotehtavatRatkaistu` per kaupunki.

### 5.3 Pulun ohjeviesti ensimmäisessä kaupungissa

Rajapinta on `polloVihje(teksti, kohde)` (js/pollo.js:6732–6734) tai
monikuplainen `polloPuheenvuoro` (käytössä js/fokusvirta.js:1214).
Ensimmäisen kaupungin erityiskohtelu on jo olemassa mallina: Livian
tuurauspaljastus kertalipulla `matkakirja-livia-paljastus`
(js/livia.js:530, 577, 641). Sama kuvio kertalipulla
`matkakirja-karttaohje` riittää.

**Teksti on Fablen**, ei tämän erän — työsessio ei kirjoita
tarinatekstiä (docs/roolitus.md, "Opus … Ei koske tarinateksteihin").

### 5.4 Matkan jatkaminen ilman aarretta

**Toimii jo.** `travelModes()` ei katso laattaa eikä aarretta lainkaan
(js/game.js:956–969), eikä mikään estä poistumista. Ei työtä.

---

## 6. Liiku-nappi

### 6.1 Nappi

Alareunan aina näkyvä nappi on ruutuankkuroitu HTML-elementti kartan
päällä (sama malli kuin luku 4.1). Se korvaa nykyisen
matkustustapavalinnan, joka tulee `game.travelModes()`ista
(js/game.js:956–969).

### 6.2 Neljä kulkutapaa

| Tapa | Nyt | Uusi |
| --- | --- | --- |
| **Liftaus** | ei ole | **ilmainen**, uusi `hitch` |
| **Bussi** | ei ole | **50 p**, vierekkäisten kaupunkien välillä |
| **Laiva** | `sea`, `SEA_FARE = 100` (js/game.js:12) | ennallaan |
| **Lento** | `fly`, `FLIGHT_PRICE = 300` (js/rules.js:6) | ennallaan |

Nykyinen `land` (noppa + askeleet) ja `stay` (Tutki paikka) ovat listalla
viides ja kuudes. **Omistajan lista ei mainitse noppaa** — tämä on
kirjattava päätettäväksi (luku 7, kysymys 5): korvaako liftaus nopan vai
tuleeko se sen rinnalle?

### 6.3 "Vierekkäinen kaupunki" — valmis funktio on jo olemassa

`rideTarget(player)` (js/game.js:2282–2292) tekee täsmälleen tämän
päättelyn: `board.adj.get(pos.city)` → kaaret → toinen pää → `cityById`.
`board.adj` rakennetaan `buildBoard`issa (js/rules.js:181, 198–199)
datasta `EDGES` — **408 kaarta: 297 `land`, 111 `sea`**
(js/packs/maailmankartta.js:533).

- **Bussi** = `EDGES`in `land`-kaari, jonka toinen pää on nykyinen
  kaupunki. Suodatus `e.type`-kentällä, kuten `stepsFrom` tekee jo
  (js/rules.js:215).
- **Liftaus** = sama joukko, hinta 0 — mutta silloin bussi on turha,
  ellei niillä ole eri ehtoa. **Suositus:** liftaus vie yhden `land`-
  kaaren mutta `steps`-kentän verran matka-aikaa (päiviä), bussi vie
  saman matkan kertakäynnillä ja ilman aikakustannusta. Siinä 50 p
  ostaa aikaa, ja 80 päivän tavoite pysyy pelinä
  (Raamattu, "Pelin kulku": *"Raja on tavoite, ei tuomio"*).
  **Tämä on omistajan päätös** (luku 7, kysymys 5).

### 6.4 Zoomi kulkutavan mukaan

**Nykytila:** kartta **ei** zoomaa eri tavalla kulkutavan mukaan.
`doMove()` lukee `game.travelMode === 'land'` vain askeltahtiin
(`jalkamatkanAskel` vs. `STEP_MS`, js/ui.js:19613–19615) ja
musiikkilajiin (js/ui.js:19597). Ainoa ero on koreografiassa:
maitse ja meritse saavat `saatto: true` → ennakkozoomi
`ennakoiSiirtoZoomi()` (js/ui.js:21507–21528, kerroin
`SIIRTOZOOMIN_LAHENNYS = 2.0`, js/siirtokoreografia.js:315, katto
`SIIRTONAKYMAN_LAHIN_KERROIN = 3.5`, js/kartta.js:137); `doFly()` ei saa
`saatto`-lippua lainkaan (js/ui.js:19681, 19686).

**Uusi sääntö** on siis pieni lisäys `ennakoiSiirtoZoomi`n kutsukohtaan:
kukin kulkutapa antaa oman tavoitemittakaavansa lautayksikköinä ennen
liikettä. Ehdotus:

| Tapa | Näkyvän kartan leveys ennen siirtoa |
| --- | --- |
| liftaus / bussi | kaaren molemmat päät + 25 % marginaali |
| laiva | kaaren päät + 50 % |
| lento | molemmat maat kokonaan (`FOKUS_POHJAT[iso].rajaus` × 1,25 molemmille) |

Tämä on sama laskenta kuin aloituslennon rajaus, joka on jo tehty
(Raamattu, "Fokusmoodi": *"kartta rajautuu automaattisesti niin, että
lähtömaa ja kohdemaa näkyvät molemmat sopivalla marginaalilla"*).

**Huomio uloszoomauksen estoon (luku 3.2):** kulkutapa ON se hetki,
jolloin kameran täytyy päästä maan ikkunan ulkopuolelle. Siksi
`matkakohteidenAlue`-laajennus (js/kartta.js:2589–2594) on
SÄILYTETTÄVÄ, ja tiukempi `ULOSZOOMAUS_KERROIN` koskee vain tilaa,
jossa matkavalinta ei ole auki.

---

## 7. Vaiheistus

Jokainen erä on yhden Opus-agentin kokoinen. **Erä 1 on pilotti yhdelle
maalle ja kaupungille (Ranska + Pariisi)** — Perustuslaki ja
Kustannuskuri: pilotti ennen skaalaa. Erät 2–5 ajetaan rinnakkain vasta,
kun erä 1 on mainissa. Jokaisen savukkeen **vastakoe on pakollinen**:
testi, joka läpäisee myös rikkinäisen toteutuksen, on pahempi kuin ei
testiä.

**Erä 1 — PILOTTI: värillinen topografia Ranskassa (L)**
· Tiedostot: tools/fokuskartta/piirto.js (toinen väriasteikkopari),
tools/generoi-laattapyramidi.mjs (`--vari <ISO>`), js/laattapyramidi.js
(toinen kerros + clipPath), js/maanaariviivat.js, css/styles.css.
· EI: ei kosketa nostoihin, lehtiin, kulkutapoihin eikä aarteeseen; ei
uutta korkeusaineistoa; ei versionostoa.
· Valmis: Ranskassa maa ja aluevedet värillisiä, naapurit ja Välimeri
ruskeita, raja paletin punainen, eikä `window.__pyramidinMittarit()`
näytä yli kaksinkertaista laattamäärää. Kuvakaappaukset z4/z6/z7 —
**katsottuna**.
· Savuke `savuke-varilaatat.mjs`: pikselimittaus maan sisältä (odotus
vihreä/sininen) ja naapurista (ruskea). **Vastakoe:** sama mittaus
Belgian puolelta samassa kuvassa — jos sekin on värillinen, leikkuri ei
toimi ja testi kaatuu.

**Erä 2 — Zoomi, rajat ja punainen viiva (M)**
· Tiedostot: js/kartta.js (`saapumisPorras`, `fokusRajaukset`,
`ULOSZOOMAUS_KERROIN`, `ZOOMI_LAHIN`), js/maatummennus.js:147,
css/styles.css:1700–1706.
· EI: ei kosketa laattoihin eikä väreihin; ei poisteta
`matkakohteidenAlue`-laajennusta.
· Valmis: saapuminen rajaa maan ruutuun, uloszoomaus pysähtyy
kertoimeen, SGP ja RUS käyttäytyvät luvun 3.3 mukaan.
· Savuke `savuke-maanikkuna.mjs`: viewBox saapumisen jälkeen ja
uloszoomauksen pohjalla kolmelle maalle. **Vastakoe:** kehittäjän
maailmanappi päällä → rajausta EI ole.

**Erä 3 — Maan perustiedot ja lisää-valikko (M)**
· Tiedostot: uusi js/maapaneeli.js, js/fokusmitat.js (ankkurointi),
js/lehti.js (`avaaMaalehti` sivuindeksillä), css/styles.css.
· EI: ei kosketa kaupunkilehteen eikä nostoihin.
· Valmis: Ranskan 8 otsikkoa aukeavat oikeille sivuille; perustiedot
näkyvät vasemmassa alanurkassa 400 px ja 1400 px leveydellä.
· Savuke `savuke-maapaneeli.mjs`: jokainen otsikko klikataan ja avautunut
sivu todennetaan. **Vastakoe:** maa ilman `MAA_KATEGORIAT`-riviä →
valikko ei aukea eikä peli kaadu.

**Erä 4 — Kaupungin iso pop-up ja turisti-info (L)**
· Tiedostot: js/lehti.js (etusivun osien irrotus), js/nahtavyydet.js,
uusi js/kaupunkinosto.js, js/packs/fokuskohteet-fra.js.
· EI: ei poisteta kaupunkilehteä — vanha ovi `avaaTutkinta` jää
rinnalle, kunnes omistaja on nähnyt uuden.
· Valmis: Pariisin klikkaus avaa pop-upin (hero + esittely + zoomattava
kohdekartta); turisti-info avaa matkustusoppaan.
· Savuke `savuke-kaupunkipopup.mjs`: molemmat pop-upit auki ja kiinni,
kohdekartan zoom toimii. **Vastakoe:** Marseille (ohut lehti) → pop-up
aukeaa silti eikä jätä tyhjää lohkoa.

**Erä 5 — Kaupunkilehden sivut nostoiksi, Pariisi (L)**
· Tiedostot: js/packs/fokusvirta-pariisi.js, js/packs/maakartat.js
(Pariisin uudet pisteet), js/packs/kulttuuri-kategoriat.js.
· EI: ei keksitä yhtään uutta faktaa — teksti siirretään sanatarkasti
(docs/roolitus.md, sisältöpistokoe). **Nostotaso poltetaan uudestaan
samassa PR:ssä** (ks. riski 2).
· Valmis: luvun 4.7 taulukko toteutettu; pääkartan merkkimäärä Ranskassa
≤ 21, kohdekartalla ≤ 17.
· Savuke: olemassa oleva `savuke-nostoladonta` laajennettuna.
**Vastakoe:** poistetaan yksi kohdekarttapiste → karsinta palauttaa
noston pääkartalle.

**Erä 6 — Minikysymykset nostoihin (M)**
· Tiedostot: js/fokusnosto.js (visa kortin loppuun), js/fokustehtavat.js
(jaettu komponentti), js/game.js (`nostotehtavatRatkaistu`),
js/packs/fokusvirta-pariisi.js.
· EI: ei muuteta lehtitehtävien palkkiota eikä `actionMinitehtava`n
rajapintaa; ei versionostoa tallennukseen.
· Valmis: joka kolmannessa Pariisin nostossa on kysymys, oikea vastaus
lisää rahaa ja kirjautuu tallennukseen.
· Savuke `savuke-nostovisa.mjs`: oikea ja väärä vastaus, luetaan `money`
ja laskuri. **Vastakoe:** väärä vastaus ei lisää kumpaakaan.

**Erä 7 — Aarre vihreänä pisteenä, uusi ehto (S)**
· Tiedostot: js/fokusvirta.js (`fokusvirtaKohtaamispiste`),
js/fokuspiste.js, ohjekupla `polloVihje`-kutsuna.
· EI: ei muuteta aarrekysymystä, laatan palkkiota eikä js/pollo.js:ää
(toisen session tiedosto, ks. riski 1).
· Valmis: piste syttyy kahdesta ratkaistusta nostotehtävästä; Pulun ohje
näkyy kerran ensimmäisessä kaupungissa.
· Savuke `savuke-aarrepiste.mjs`: 0, 1 ja 2 tehtävää. **Vastakoe:**
yhdellä tehtävällä piste EI syty.

**Erä 8 — Liiku-nappi ja neljä kulkutapaa (L)**
· Tiedostot: js/game.js (`travelModes`, hinnat), js/rules.js
(kaarisuodatus), js/ui.js (nappi ja koreografia), js/kartta.js
(kulkutapakohtainen tavoitemittakaava), js/siirtokoreografia.js.
· EI: ei poisteta noppaa ennen omistajan päätöstä (kysymys 5).
· Valmis: neljä tapaa toimivat, hinnat veloittuvat, kartta rajautuu tavan
mukaan, vanhat tallennukset latautuvat.
· Savuke `savuke-liiku.mjs`: jokainen tapa kerran, `money` ja viewBox
ennen ja jälkeen. **Vastakoe:** ilman rahaa bussi ja laiva eivät ole
valittavissa.

### Omistajan päätettäväksi

1. **Punaisen rajaviivan paluu.** Poistettiin 30.8.2026 epätarkkana
   (luku 1.6); syy on poistunut, koska aineisto on nyt sama 10m-lähde
   kuin poltetulla rajalla. *Suositus: palautetaan, `--mark: #b03a2b`,
   leveys 2,5 px.*
2. **Aluevesipuskuri sinisille vesille.** Pelkkä rantaviiva jättää
   Välimeren ruskeaksi Marseillen edustalla (luku 2.6). *Suositus: 12
   meripeninkulmaa = 6,7 lautayksikköä ulospäin.*
3. **Uloszoomauksen kerroin.** Nyt 3 (omistajan päätös 30.8.2026, tehty
   ettei kamera tunnu lukolta); uusi idea sanoo "ei ulospäin lainkaan"
   (luku 3.2). *Suositus: 1,15 ja vasta yhdessä Liiku-napin kanssa.*
4. **Mitkä kaupunkilehden sivut pudotetaan.** Luvun 4.7 taulukko
   ehdottaa: Menovinkit maan valikkoon, Musiikin 3 nostoa yhdeksi,
   Historian 7 nostoa kolmeksi pisteeksi + yhdeksi nostoksi, maaosasto
   pois. *Suositus: hyväksytään Pariisin pilottiin ja arvioidaan
   uudelleen toisen kaupungin jälkeen.*
5. **Liftaus vs. noppa.** Omistajan lista neljästä kulkutavasta ei mainitse
   noppaa (luvut 6.2–6.3). *Suositus: liftaus korvaa nopan (ilmainen,
   kuluttaa `steps` päivää), bussi 50 p ostaa saman matkan ilman
   aikakulua; noppa jää pois.*
6. **Minikysymyksen palkkio.** Lehtitehtävä antaa nyt 50 p
   (js/fokustehtavat.js:111), ja kysymyksiä tulee paljon enemmän.
   *Suositus: nostokysymys 25 p, lehtitehtävä pysyy 50 p:ssä.*

---

## 8. Riskit

1. **Horatio–Livia-työn rajapinnat.** Pulun saapumisketju
   (js/fokusvirta.js:1122–1226), luennat ja luentareaktiot ovat
   aktiivisessa yhteiskehityksessä Codexin kanssa (docs/roolitus.md;
   js/livia-*.js, js/pollo.js ja pulun CSS ovat tekstisession
   omistuksessa). **Erät 4, 7 ja 8 koskevat samaan ketjuun.** Sääntö on
   *"ei hiljaisia paikkauksia toisen omistamiin tiedostoihin"*: rajapinta
   sovitaan ennen toteutusta, ja Pulun ohjekupla tehdään
   `polloVihje`-kutsuna, ei muokkaamalla js/pollo.js:ää.
2. **Karttanostojen kaksi totuutta.** Karsintasääntö ajaa sekä elävässä
   kerroksessa että poltossa (js/fokuskohteet.js:672–675). Jos erä 5
   muuttaa karsintaa muuttamatta poltettua nostotasoa, kartalla on kaksi
   eri nostojoukkoa. **Nostotaso on poltettava uudestaan samassa PR:ssä**
   — kuten 2.9.2026 (N2) tehtiin.
3. **Savukkeiden kattavuus.** Nykyiset savukkeet mittaavat nostoladontaa
   ja fokusvirtaa, eivät värejä eivätkä leikkuria. Erän 1 savuke on
   **uusi laji** (pikselimittaus), ja sen vastakoe kirjoitetaan ensin.
4. **Safari/WebKit.** Kaksi kovaa havaintoa koodissa: SVG-suodattimet
   katoavat iOS:n webapp-tilassa (tests/rules.test.mjs:4510–4522), ja
   WebKit peruu osoitintapahtumat kesken nipistyksen
   (js/karttazoom.js:36–43). **Uusi `<clipPath>` koko kartan kokoisella
   kerroksella on todentamaton** — ei suodatin, mutta sama riskiperhe.
   Erän 1 valmis-kriteeriin kuuluu laitetodennus, ei vain kontin
   kuvakaappaus. docs/roolitus.md "Avoimet asiat" kohta 3 muistuttaa,
   että zoomin jäännösriskit odottavat yhä laitetodennusta.
5. **Offline-välimuisti.** sw.js esilataa vain repon omat tiedostot;
   laatat tulevat ämpäristä (js/media.js:43). **Offline-pelissä kohdemaa
   on ruskea, kunnes värilaatat on kerran ladattu**, eikä yhden tiedoston
   Pages-versio lataa niitä lainkaan. Hyväksyttävä heikennys, mutta
   kerrottava ennen julkaisua. Malli puuttuvan aineiston käsittelyyn on
   js/maanaariviivat.js:353–356: kerros jää tyhjäksi eikä peli kaadu.
6. **Tallennusten yhteensopivuus.** Skeema `version: 2`
   (js/game.js:2970); `Game.fromJSON` hyväksyy versiot 1 ja 2 ja
   palauttaa muista `null` (3035). **Erä 6 lisää kentän ja erä 8 uudet
   kulkutavat** — kumpikin tehdään olemassa olevalla `?? []`-kuviolla
   (3140–3160), EI versionostolla, tai jokainen vanha tallennus
   hylätään. Kaupunkilehden tila (`fokusAarreAvattu`, käytetyt
   kysymykset) on samassa oliossa, ja erä 7 muuttaa sen lukuehtoa:
   **vanha lippu on luettava TAI uuden laskurin rinnalla**, ettei
   pelaaja menetä jo avattua aarrepistettä.
7. **Marseillen ohuus.** Marseillen kaupunkilehdessä on kaksi osastoa ja
   viisi nostoa (luku 4.6); uusi valikko tekee ohuudesta näkyvää. Ei
   tämän uudistuksen vika eikä sen työ, mutta Fablelle kirjattu havainto:
   Marseille tarvitsee sisältöerän ennen kuin uusi käyttöliittymä
   julkaistaan sille.

---

*Raportin kirjoitti Opus-työsessio 13.9.2026 haarassa
`claude/karttauudistus-suunnitelma` (pohja origin/main, d2b0c3d).
`npm test`: 3292 pass, 0 fail.*
