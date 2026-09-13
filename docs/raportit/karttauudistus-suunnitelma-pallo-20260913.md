# Karttauudistus PALLOLLE: erien 2–8 uudelleenkirjoitus (13.9.2026)

*(Opus-työsessio Fablelle. Docs-only, ei versionostoa, ei js/-, css/-,
tests/- eikä tools/-muutoksia. Jokainen luku on LUETTU koodista tai
LASKETTU koodin luvuista; arviot on merkitty sanalla "arvio".
Ristiriidassa Raamattu (js/tyohuone-raamattu.js) voittaa tämän raportin.)*

**Miksi tämä raportti on olemassa.** Suunnitelma
`docs/raportit/karttauudistus-suunnitelma-20260913.md` kirjoitettiin
TASOKARTALLE (js/kartta.js, js/laattapyramidi.js:n SVG-kerrokset). Erän 1
raportti (luku 7.1, haara `claude/karttauudistus-era1-topografia`) löysi,
että tasokartta on pelistä pois: **`js/ui-apurit.js:2102`
`VANHA_KARTTA_KAYTOSSA = false`** ja `:2121` `LAUDAT = new Set(['pallo'])`
— `?lauta=kartta` ja laitteen muistama valinta ohitetaan. Peli avautuu
siis PALLOLLE, ja Raamatun KARTTAUUDISTUKSEN PÄÄTÖS 3 vahvistaa, että
uudistus tehdään pallolle eikä tasokartta palaa. Suunnitelman erät 2–8
osoittavat tiedostoihin, joita peli ei lataa. Tämä raportti kirjoittaa ne
uudelleen pallon koodiin.

**Pallon tiedostot:** `js/pallo.js` (runko, laatunosto, napakannet),
`js/pallolaatat.js` (laattakerros), `js/pallovektorit.js` (rannikko, rajat,
maan korostus), `js/pallolauta/*.js` (lauta, kamera, merkit, nimet, nostot,
reitit, siirto, avaus, linssit, sovittelu), Globe.gl + three.js.

---

## 1. PALLON NYKYTILA (mitattu)

### 1.1 Laattapyramidin laatat pallon pinnalla

Pallolla on **kaksi** laattalähdettä päällekkäin:

1. **Kirjaston oma Mercator-sarja** (`globeTileEngineUrl`,
   js/pallo.js:719–723). Se on POHJA, ja kun laattakerros on päällä, se
   rajataan tasoon `POHJAN_TASO_MAX` (js/pallo.js:721).
2. **Laattakerros** = pyramidin laatat laatta kerrallaan pallon pinnalle
   (`luoLaattakerros`, js/pallolaatat.js:915). Tämä on se kerros, jota
   pelaaja katsoo lähikuvassa.

**Laattakerroksen ketju yhdelle laatalle** (js/pallolaatat.js:1176–1279):

| vaihe | rivi | mitä |
| --- | --- | --- |
| kerrostasot | 1187–1188 | `pyramidinKerrostasot(z)` → lista tasoja; suodatin `k.nosto ? kerrokset.nosto : (k.viiva ? … : (k.ranta ? … : true))` |
| haku | 1192–1193 | `pyramidinLaattaOlemassa` + `pyramidinLaattaUrl`, `haeKuva` (createImageBitmap, CORS) |
| **kangas** | 1223–1231 | YKSI 2D-kangas per laatta, `ctx.drawImage(kuva, …)` **jokaiselle kerrostasolle päällekkäin** |
| verkko | 1234–1245 | laatan oma lat/lon-suorakaide, UV kankaalla |
| tekstuuri | 1246–1256 | `new Texture(kangas)`, mipmapit WebGL2:lla, anisotropia |
| materiaali | 1257–1260 | `LaattaMateriaali`, `transparent: true`, `polygonOffsetUnits = −8` |
| vienti | 1273–1278 | `renderer.initTexture` **yksi laatta kehyksessä** (`LAATTAKERROS_TEKSTUUREJA_PER_KEHYS = 1`, mitattu 3,0 ms p50 / 6,7 ms max) |

`pyramidinKerrostasot` (js/laattapyramidi.js:1921–1932) kokoaa pohjan +
ranta- + viiva- + nostotason. **Tämä on koko uudistuksen tärkein sauma:
pallo piirtää sen, mitä tuo funktio palauttaa, eikä tiedä mitään
kerrosten merkityksestä.** Laatan osoite, version­avain ja
noutokirjanpito ovat samassa tiedostossa kolmena hardkoodattuna
if-ketjuna: `tasonVersio` (:602–607), `laattaUrl` (:640–662),
`noutoEtuliite` (:666–673).

Versioportti: `lepokerroksenKerrokset` (js/pallolaatat.js:351–372) vaatii,
että pallon oma sarja (laatat.json) ja pyramidi (pyramidi.json) ovat
samaa versiota, ja että viiva-, nosto- ja rantatason versiot täsmäävät —
muuten koko kerros sammuu.

**Kuorma ja katot** (js/pallolaatat.js:644–688): näkyviä laattoja
enintään 48 (`LAATTAKATTO_NAKYVA`, tätä isompi määrä pudottaa tason
karkeammaksi), ennakossa 96, muistissa 24, tekstuurimuisti 96 Mt
(`LAATTAKATTO_TAVUT`), rinnakkaisia latauksia 6, päivitys liikkeessä
10 Hz, häive 260 ms, pito 2000 ms. Mittarit (`mittarit()`) kertovat
`laattoja, valmiita, scenessa, kaytetytTavut, jumissa, valmisteluMs…` ja
ne luetaan savukkeista polusta
`ui.pallolauta.lepokerros().mittarit()` (tools/savukkeet/
mittaa-pallon-vektorit.mjs:238–246). **Laattakerroksella ei ole
korkeusrajaa** (`suorita`, js/pallolaatat.js:1418–1465): taso valitaan
ruudun laitepikseleistä hystereesillä (`LAATTAKERROS_HYSTEREESI_ALAS 0,7`).

### 1.2 Kamera, zoomirajat ja saapuminen

| asia | paikka | arvo |
| --- | --- | --- |
| fov (pystykulma) | kamera.js:80 | 50° |
| kaukaisin korkeus | kamera.js:82 | `PALLO_KORKEUS_MAX = 2,5` |
| lähin näkyvä leveys | kamera.js:226 | `PALLOLAUDAN_LAHIN_LEVEYS = 60` lautayksikköä (= 1,80°) |
| saapumisleveys (vara) | kamera.js:111 | 240 yksikköä |
| saapumisrajauksen marginaali | kamera.js:123 | 0,05 joka reunalle |
| saapumisrajauksen katto | kamera.js:139 | 2000 yksikköä (≈ 60° pituuspiiriä) |
| kamera-ajon kesto | kamera.js:148 | 1400 ms |
| zoomirajat sormelle | lauta.js:1304–1312 | `controls.minDistance/maxDistance = sade × (1 + korkeus)` |
| rajojen syrjäytys | lauta.js:1303, 2724 | `zoomirajaSyrjaytys = { min, max }`, elää ResizeObserverin yli |

**"Maa niin suureksi kuin mahdollista" ON JO TEHTY PALLOLLA.**
`saapumisrajaus()` (lauta.js:2644–2656) lukee maan laatikon
`maanLautalaatikko(data, iso, { kohta })` -funktiolla
(js/maanaariviivat.js:240; `SAARIVARA = 0.2` karsii merentakaiset osat),
muistaa sen maittain, ja `saavu()` (lauta.js:2659–2661) antaa sen
`kamera.kotiin({ bbox })`ille. `kotiin` (kamera.js:513–531) sovittaa
laatikon ruutuun **molempiin suuntiin** (`kameranKohde`, kamera.js:363–377:
`leveys = max(bbox.w × vara, bbox.h × vara × W/H)`) ja putoaa entiseen
kaupunkinäkymään vain, jos tarve ylittää katon 2000.

Mitattu 134 maan aineistosta (`assets/data/maapolygonit.json`, lauta
12000 × 5399, tarkkuus 10):

| maa | laatikko (yks) | tarve puh. 390×844 | tarve työp. 1440×900 | korkeus puh. | korkeus työp. |
| --- | --- | ---: | ---: | ---: | ---: |
| SGP | 12 × 6 | 13 | 13 | 0,016 | 0,005 |
| ALB | 59 × 120 | 65 | 211 | 0,079 | 0,074 |
| BGR | 209 × 121 | 229 | 229 | 0,279 | 0,081 |
| GRC | 287 × 264 | 316 | 465 | 0,384 | 0,163 |
| DEU | 306 × 344 | 336 | 606 | 0,409 | 0,212 |
| ITA | 397 × 462 | 437 | 813 | 0,531 | 0,285 |
| FRA | 490 × 406 | 539 | 715 | 0,655 | 0,251 |
| CHN | 2039 × 1368 | 2243 | 2407 | katto | 0,845 |
| RUS | 5713 × 2189 | 6285 | 6285 | katto | katto |

**Katon 2000 ylittävien määrä RIIPPUU KUVASUHTEESTA** — koodin
kommentti (kamera.js:135) sanoo viisi, ja se pitää puhelimella
(RUS, USA, CAN, GRL, CHN); **työpöydällä 1440 × 900 niitä on yhdeksän**
(lisäksi CHL, BRA, ARG, AUS). Tämä on uusi mittaus, ei ristiriita: sama
kaava, eri ruutu.

### 1.3 HTML-merkit, nostot ja fokusvirta pallolla

Merkkikerros on Globe.gl:n `htmlElementsData` (`luoMerkit`,
js/pallolauta/merkit.js:244–270): datumit ovat pysyviä olioita
avaimittain, `htmlLat/htmlLng`, `htmlAltitude(MERKIN_KORKEUS)`,
`htmlTransitionDuration(siirtyma)`. Pallon takana oleva merkki saa
luokan **`.pallolauta-takana`** (`htmlElementVisibilityModifier`,
merkit.js:268–270) ja häipyy CSS:llä (css/styles.css:25561).

**Merkit ovat CSS2D:tä eli RUUTUVAKIOITA, eivät karttaan skaalautuvia.**
Kohdemerkki on 24 px joka korkeudella (`KOHDEMERKIN_PX`, merkit.js:40),
noston mitta on kiinteä `NOSTON_MITTA = KARTTANIMI_KOOT.kohde /
NOSTOSYM_NIMIO_KOKO = 8,5 / 11 = 0,7727` (nostot.js:231; sovellus
`asetteleNosto`, nostot.js:308: `scale(0.7727)`), ja merkin oma ruutu on
`KOHDEMERKIN_RUUTU_PX = 2 × 7,4 × 0,7727 = 11,4 px` (nostot.js:243).
**Tämä on päätöksen 2 ("skaalautuvat zoomatessa kuin painettu kartta")
suora ristiriita nykytilan kanssa** — ks. luku 3.0.

Napautus EI kulje elementin kautta: elementit ovat `pointer-events:
none`, ja osuma lasketaan pallon omasta napautuksesta lähimpään merkkiin
**44 px:n sisällä** (`napautaPintaan`, lauta.js:2018–2052; `onGlobeClick`
:2334–2339). Kaupungin napautus: `napautaKaupunki` (lauta.js:1745–1800)
→ oma kaupunki avaa kaupunkilehden `ui.avaaTutkinta(city)` (:1797).

Nostojen portti on **sama kuin tasokartalla**: `lehdenOsuus(pohja,
nakyva, packId) >= LEHDEN_VAHIN_OSUUS` (nostot.js:255–259, käyttö :461) —
eli maan bboxin osuus näkyvän kartan leveydestä ≥ 0,5. Eläviä nostoja
enintään `NOSTOJEN_KATTO = 40` (nostot.js:62). Ladonta tulee samasta
tyngästä kuin poltto (`maanKohdemerkit` → `ladoMaanTynka`), eikä pallo
lado nostoja itse. Poltettu nosto saa vain R-osuman;
`pallonNostoOnPoltettu` (js/pallo.js) päättää kumpi kumpi on.

Fokusvirran saapumisketju, kortit ja aarrepiste ovat lautariippumattomia:
`avaaFokuskohde`/`asemoiFokuskohde` (js/fokuskohteet.js, kutsu
lauta.js:2446), `paivitaFokuspistePallolla` (lauta.js:2708),
`fokusvirtaKohtaamispiste` (js/fokusvirta.js).

**Kartuutsi, maataulu ja maalehtilinkki OVAT JO PALLOLLA.** Omistaja
pyysi ne takaisin 11.9.2026, ja ne palautettiin: `pallolaudanMaa(ui)`
(js/fokusmitat.js:348–354) antaa pallolaudalle oman ehdon, `paivitaFokusmitat(ui)`
ajetaan laudan `paivita`sta (lauta.js:2548) ja ne ovat KARTTARUUDUN
lapsia, eivät pallon kuoressa (lauta.js:2824, `nollaaFokusmitat`).
**Maataulussa on jo plus-nappi** (`.fokus-maataulu-lehti`, '+',
fokusmitat.js:566–575) ja sen ainoa teko on `ui.avaaMaalehti(iso)` —
täsmälleen se nappi, jonka omistaja haluaa muuttaa "lisää"-napiksi.
`avaaMaalehti(ui, iso, { nimi })` (js/lehti.js:719) **ei ota sivunumeroa**.

### 1.4 Pulu ja chat pallon päällä

Pulu on ruutuankkuroitu paneeli kartan päällä eikä tiedä laudasta
muuta kuin sen, että kartan veto piilottaa kuplat: `kartalla(kohde)`
tunnistaa `#board, .kartta-kuori, .pallolauta` (js/pollo.js:4110) ja
pointerdown/move/wheel-kuuntelijat ovat dokumentissa (:4131–4135).
**Pallo ei tarvitse Pululle mitään uutta** — `polloVihje`,
`polloLisavihje`, `polloSaapumiskupla` toimivat sellaisenaan. Pulun
tiedostot ovat Codexin omistuksessa (docs/roolitus.md), joten ohjekuplat
tehdään KUTSUINA.

### 1.5 Maan korostus, ääriviiva ja "muiden maiden feidaus"

Pallon maan ääriviiva on **vektoriviiva, ei poltto**:
`paivitaPallonMaakorostus` (js/maanaariviivat.js:363–383) →
`vektorit.korostaMaa(iso, renkaat)` (js/pallovektorit.js:1111–1121) →
`rakennaKorostus` (:885–907, `LineSegments2`, renderOrder −0,45).

**Väri on RUSKEA, ei punainen:** `KOROSTUS_MUSTE = '#4a3320'`,
`KOROSTUS_PEITTO = 0,68`, leveys `[1,7 … 2,5]` css-px
(js/pallovektorit.js:231–234). Perustelu :210–230: *"KOROSTUS ON SAMAA
MUSTETTA, EI TOISTA VÄRIÄ."* Erä 1 vaihti punaisen
**js/maatummennus.js**:ään ja `css/styles.css`:ään — ne ovat TASOKARTAN
kehä. Pallolla punainen on yhden vakion vaihto js/pallovektorit.js:ssä.

**Muiden maiden tummennusta tai feidausta EI OLE PALLOLLA LAINKAAN.**
`js/maatummennus.js` on tasokartan kerros; grep pallon tiedostoista ei
löydä siitä yhtään kutsua. Feidaus on siis kokonaan uutta työtä (luku 2.5).

---

## 2. ERÄ 1b — VÄRIKERROS PALLOLLE

Erä 1 (haara `claude/karttauudistus-era1-topografia`) tuotti:
väriasteikkoparin `VARI_ASTEIKKO`/`VARI_SYVYYS`
(tools/fokuskartta/piirto.js:396–440 haarassa), ajotilan
`--vari <ISO>`, laattapolun `pyramidi/<variversio>/vari/z…`, luettelon
`varitaso`-olion, aluevesipuskurin `ALUEVESI_YKSIKKOA = 6.7` +
`maanAluevesiPolku()` ja mitatun laataston: **FRA 84 laattaa, 2,54 Mt,
61 s (z4–7, 3′)**. Kaikki tuo kelpaa pallolle sellaisenaan; vain
PIIRTO vaihtuu.

### 2.1 Kaksi vaihtoehtoa

**(A) Leikkuri poltetaan laattaan generointivaiheessa (alfa).** Väri­laatta
saa läpinäkyvän alfan: maapolygoni + 12 mpk aluevesi = täysi peitto, sen
ulkopuolella 0 (tai feidausarvo, luku 2.5). Pallo lisää tason vain
`pyramidinKerrostasot`-listaan, ja olemassa oleva `for (const kuva of
kuvat) ctx.drawImage(…)` (js/pallolaatat.js:1226–1229) piirtää sen
pohjalaatan päälle normaalina source-over-yhdistelynä.

- **Ajossa nolla uutta työtä:** ei toista verkkoa, ei toista tekstuuria,
  ei lisää GPU-muistia — sama kangas, sama `t.tavut` (:1268), sama yksi
  `initTexture`. Yksi lisähaku laattaa kohti.
- **Ei `clipPath`ia, ei `mask`ia, ei suodatinta** → suunnitelman riski 2.5
  ja erän 1 avoin kohta 7.6 (iOS webapp) **poistuvat pallolta kokonaan**.
- Hinta: aluevesipuskurin tai feidauksen muutos = laattojen uusi ajo.
  Se on jo linjattu (PÄÄTÖKSET 2: *"vaihto = asteikon muutos + laattojen
  uusi ajo, ei koodimuutos"*).

**(B) Leikkuri kankaalla laatta kerrallaan (`destination-in`).** Väri­laatta
piirretään toiselle kankaalle, maapolku muunnetaan laatan
pikselikoordinaatteihin, `globalCompositeOperation = 'destination-in'`,
ja tulos yhdistetään laatan päälle.

- Vaatii **toisen kankaan ja polygonitäytön laattaa kohti**. Ranskan
  aluevesipolku on 6 323 pistettä (erän 1 mittaus, 36 ms kerran); per
  laatta se olisi 20–80 täyttöä. Laatan valmistelun mitattu budjetti on
  3,0 ms (p50) / 6,7 ms (max) 16,7 ms:n kehyksestä
  (js/pallolaatat.js:664–673) — polygonitäyttö samaan kohtaan on juuri se
  työ, joka pudottaa kehyksen.
- Etu: leikkuri on ajossa muutettavissa (esim. puskurin koe ilman
  uusintapolttoa).

### 2.2 SUOSITUS: (A) poltettu alfa

Perustelut järjestyksessä: (1) ajossa nolla lisäverkkoa ja nolla
lisätekstuuria — tasokartalla väri­kerros lisäsi laattoja +54 %
(erän 1 luku 5), pallolla lisäys on **0 %**; (2) iOS-webappin
suodatin/maskiriski ei synny lainkaan; (3) laatat ovat jo maakohtaisia
(`vari/`-polku, haetaan vain kun pelaaja on siinä maassa), joten
poltettu leikkuri ei menetä uudelleenkäyttöä; (4) sama laatta toimii
myös lepokerroksessa ilman eri polkua (kerrostasot ovat yhteiset).

**Koodimuutokset (pallo), tarkat kohdat:**

| tiedosto:rivi | muutos |
| --- | --- |
| js/laattapyramidi.js:1921–1932 | `pyramidinKerrostasot`: lisää `varitasonTasot()?.find(t => t.z === z)` **pohjan jälkeen, rantatason edelle** (väri on maastoa, ranta/viiva/nosto sen päälle) |
| js/laattapyramidi.js:602–607 | `tasonVersio`: `if (taso.vari) return luettelo?.varitasot?.[maa]?.versio ?? ''` |
| js/laattapyramidi.js:640–662 | `laattaUrl`: `if (taso.vari) return pyramidiUrl('<versio>/vari/z…')` |
| js/laattapyramidi.js:666–673 | `noutoEtuliite`: `if (taso.vari) return 'c'` |
| js/laattapyramidi.js (uusi) | `varitasonTasot()` rantatason mallilla (:1509–1530): vanha luettelo ilman kenttää → `null`, kerros jää pois eikä peli kaadu |
| js/pallolaatat.js:1188 | suodatin: `k.vari ? kerrokset.vari : (k.nosto ? … )` — **ilman tätä väritaso menisi `: true`-haaraan ja piirtyisi aina, myös väärässä maassa** |
| js/pallolaatat.js:351–372 | `lepokerroksenKerrokset`: `vari = varitasot[pelaajanMaa] && sen versio` |
| js/pallolaatat.js:966, 1427 | `kerrokset` on nyt maakohtainen → maanvaihdon on **mitätöitävä laattakerroksen välimuisti** (`avain` sisältää version, mutta ei maata: js/laattapyramidi.js:609) |
| js/pallolaatat.js:917–953 | mittarit: `varillisia`, `variMaa` (erän 1 nimet tasokartalla) |

**Maanvaihto on tämän erän ainoa aito uusi mekanismi pallolla.**
Tasokartalla väritaso oli oma kerros, jonka sai piilottaa; pallolla se on
osa laatan kangasta, joten maan vaihtuessa kaikki värilliset laatat on
purettava ja haettava uudestaan. Purku on olemassa (LRU + `pura`), mutta
sen laukaisu maanvaihdosta on kirjoitettava: `paivitaPallonMaakorostus`
(js/maanaariviivat.js:367–370) tuntee maanvaihdon jo nyt yhtenä ehtona
(`uusi === korostettu`) ja on siksi oikea paikka herättää myös laattojen
mitätöinti — kutsuna laudan kautta, ei moduulien ristiin.

### 2.3 Murrettu paletti — konkreettiset luvut

PÄÄTÖKSET 2 valitsi *"seepiaan sointuvat MURRETUT sävyt (kellertävä
alanko, ruskehtava ylänkö, harmaanvihreä vuoristo, savunsininen vesi)"*.
Muoto on sama kuin erän 1 `VARI_ASTEIKKO`/`VARI_SYVYYS_ANKKURIT`
(tools/fokuskartta/piirto.js:396, 429); vain luvut vaihtuvat.

```js
export const VARI_ASTEIKKO = [            // MURRETTU (ehdotus)
  { m: 0,    v: [214, 203, 158] },  // kellertävä alanko
  { m: 150,  v: [206, 195, 146] },
  { m: 400,  v: [196, 183, 134] },
  { m: 800,  v: [183, 166, 122] },
  { m: 1400, v: [168, 148, 110] },  // ruskehtava ylänkö
  { m: 2200, v: [151, 130, 100] },
  { m: 3200, v: [134, 118,  98] },
  { m: 4200, v: [114, 118, 102] },  // harmaanvihreä vuoristo
  { m: 5200, v: [134, 140, 124] },
  { m: 6000, v: [186, 188, 180] },  // lumi, harmaan kautta
  { m: 7000, v: [214, 214, 208] },
];
const VARI_SYVYYS_ANKKURIT = [            // savunsininen vesi
  { m: 0,       v: [178, 192, 196] },
  { m: -200,    v: [160, 177, 185] },   // mannerjalustan reuna
  { m: -1000,   v: [138, 157, 171] },
  { m: -2500,   v: [116, 136, 154] },
  { m: -4000,   v: [ 98, 117, 138] },
  { m: -6000,   v: [ 84, 100, 122] },
  { m: -11000,  v: [ 70,  84, 104] },
];
```

**Mitattu perustelu** (`node`-laskenta kolmesta asteikosta;
kroma = max−min-kanava, L = ITU-R BT.709 -luminanssi):

| asteikko | kroma ka. | sävykulmat (H°) | L kulku |
| --- | ---: | --- | --- |
| seepia (peli nyt, piirto.js:172) | **68,4** | 54 → 12 (yksi ruskea perhe) | 214 → 80 |
| täysväri (erä 1) | **77,8** | 125 → 21 (vihreä → ruskea) | 97 → 168 |
| **murrettu (ehdotus)** | **39,1** | 48 → 33 → 83 (kellertävä → ruskea → harmaanvihreä) | 202 → 116 |
| syvyys täysväri (erä 1) | 91,3 | 193 → 215 | 208 → 28 |
| **syvyys murrettu** | **32,3** | 193 → 215 (sama sininen perhe) | 189 → 82 |

**Tämä on se luku, joka vastaa omistajan huoleen.** Murrettu paletti on
**vähemmän kylläinen kuin pelin nykyinen seepiakartta** (39 vs. 68) —
se ei voi rikkoa ilmettä värikkyydellä, vain sävyllä. Uutta on
sävykulmien vaihtelu (48° → 83°), ei kirkkaus. Luminanssi laskee
monotonisesti lumirajaan (202 → 116), eli korkeuslukema säilyy myös
mustavalkona.

Kaksi mitattua reunaehtoa: (1) 3200 → 4200 m sävykulma hyppää 33° → 75°,
mutta kroma on siinä 36 → 16, joten hyppy luetaan harmaantumisena eikä
värinvaihtona; (2) erän 1 ajo nosti meren peittävyyden 0,5 → 0,9
(`variPaletti`, tools/fokuskartta/maailmapiirto.js). Murretulla
syvyydellä 0,9 tekee vedestä liian tasaisen — **suositus 0,70–0,75**, ja
luku mitataan pilottikuvasta eikä päätetä paperilla.

### 2.4 Punainen raja pallolla

Yksi vakio: `js/pallovektorit.js:231` `KOROSTUS_MUSTE '#4a3320'` →
**`'#b03a2b'`** (`--mark`, css/styles.css:90). Leveys `[1,7 … 2,5]`
(:234) on jo omistajan mitoitus (2,5 px lähellä) eikä muutu; peitto 0,68
nostetaan täyteen 1,0 vain jos punainen ei lue pilottikuvassa — mitataan,
ei päätetä. Viiva on jo yhtenäinen (ei katkoviiva) ja jo maakohtainen.

**Huom.** Tasokartan puoli on erässä 1 jo tehty
(js/maatummennus.js:147 `TUMMENNUS_VIIVA` 2 → 2,5,
css/styles.css:1702 `stroke: var(--mark)`). Pallon vakio EI ole siinä
erässä. Jos erä 1 mergataan ennen tätä, punainen kehä on koodissa
kahdessa paikassa kahdella eri värillä — kirjattu riskiksi (luku 4.3).

### 2.5 Muiden maiden feidaus pallolla

Pallolla ei ole tummennuskerrosta (luku 1.5), eikä sitä voi tehdä
tasokartan tavalla: SVG-suodatin ei ole vaihtoehto, ja reikä kalvossa
(kaikki paitsi kohdemaa) vaatisi stencilin.

**SUOSITUS: feidaus poltetaan SAMAAN värilaattaan sen alfaan** — laatasto
kattaa maan laatikon **× 1,15** (sama kerroin kuin uloszoomauksen esto,
luku 3.1), ja alfa on kolmiportainen:

| alue | mitä laattaan poltetaan |
| --- | --- |
| maa + 12 mpk aluevesi | murrettu paletti, alfa 1,0 |
| laatikon sisällä maan ulkopuolella | paperinsävy `PAPERI #e8dcbc`, alfa ≈ 0,35 (feidaus) |
| laatikon ulkopuolella | ei laattaa lainkaan (`laatasto`-bittikartta, js/laattapyramidi.js:611–637) |

Tämä toimii, **koska uloszoomauksen esto tekee laatikosta koko ruudun**:
kamera ei pääse laatikkoa × 1,15 kauemmas, joten feidattu laatikko on
kaikki mitä pelaaja näkee. Ilman uloszoomauksen estoa feidaus näkyisi
suorakaiteena — **erät 1b ja 2 on siis tehtävä samassa PR:ssä tai
peräkkäin ilman julkaisua välissä.**

Feidauksen määrä on rakennusaikainen luku: 0,35 on ehdotus, ja se
mitataan pilottikuvasta (naapurin rantaviivan on yhä luettava).

### 2.6 Laattojen määrä, tavut ja aika

Mitattu pohja: erä 1 ajoi FRA:n laatikolle (ilman × 1,15) **84 laattaa /
2,54 Mt / 61 s**, tavua/px 0,108–0,161. Alla oleva malli antaa samalle
laatikolle 96, eli se **yliarvioi ~14 %**; alfa lisää arviolta +25 %
tavuja.

| maa | laatikko × 1,15 (yks) | z4 | z5 | z6 | z7 | yht. | Mt (arvio, RGBA) |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: |
| ALB | 83 × 153 | 4 | 4 | 6 | 12 | 26 | ~1,0 |
| BGR | 256 × 155 | 4 | 4 | 9 | 20 | 37 | ~1,4 |
| GRC | 345 × 319 | 4 | 9 | 16 | 36 | 65 | ~2,4 |
| DEU | 367 × 411 | 4 | 9 | 16 | 49 | 78 | ~2,9 |
| ESP | 538 × 374 | 4 | 9 | 20 | 63 | 96 | ~3,6 |
| ITA | 472 × 547 | 4 | 9 | 25 | 72 | 110 | ~4,1 |
| FRA | 579 × 482 | 6 | 12 | 30 | 80 | 128 | ~4,8 |
| CHN | 2360 × 1589 | 24 | 70 | 234 | 840 | 1168 | ~44 |
| RUS | 6585 × 2533 | 78 | 250 | 912 | 3478 | 4718 | ~177 |

Euroopan pelattavat maat ovat siis **1–5 Mt kukin**; koko Euroopan
laatasto on suuruusluokaltaan 50–100 Mt ja muutama tunti yhdellä
säikeellä (erän 1 0,81 Mpx/s). Venäjä ja Kiina eivät saa z7:ää: niiden
saapumisrajaus osuu kattoon 2000 joka tapauksessa (luku 1.2), joten
niille riittää z4–z6 (RUS 1240 laattaa, ~47 Mt arvio) tai ei väriä
lainkaan ensimmäisessä aallossa.

### 2.7 Monen maan `varitasot`-taulu (erän 1 rajoite 7.2)

Erän 1 luettelossa `varitaso` on **yksi olio**, eli toinen ajo pyyhkii
ensimmäisen. Pallolla sama rajoite on pahempi, koska väri on laatan
kangasta: väärän maan laatta näyttäisi oikealta. **Muutos on tehtävä
ENNEN toista maata:**

```json
"varitasot": {
  "FRA": { "versio": "2026-09-14a", "maa": "FRA", "aluevesi": 6.7,
           "feidaus": 0.35, "tasot": [ { "z": 4, … "laatasto": "…" } ] },
  "GRC": { … }
}
```

Muutos koskee generaattoria (`tools/generoi-laattapyramidi.mjs`,
`MERKKITASO`-vakio erän 1 haarassa) ja kolmea if-ketjua
js/laattapyramidi.js:ssä (:602, :640, :666) sekä `varitasonTasot()`:ia.
Kokoluokka **S**, ja se on erän 1b sisällä — ei erillinen erä.

### 2.8 Erä 1b: valmis-kriteeri, savuke ja vastakoe

**Valmis:** Ranskassa pallolla maa ja aluevedet ovat murretuissa
sävyissä, naapurit ja avomeri feidattua paperia, kehä `--mark`-punainen,
`ui.pallolauta.lepokerros().mittarit()` näyttää **saman** `scenessa`-luvun
kuin ilman väriä (± 1) ja `kaytetytTavut` enintään +5 % (väri ei lisää
verkkoja eikä tekstuureja). Kuvakaappaukset z5/z6/z7 — **katsottuna**.

**Savuke `savuke-pallon-varilaatat.mjs`** (malli:
tools/savukkeet/savuke-pallo-rantaviivat.mjs ja erän 1
`savuke-varilaatat.mjs`): avaa pallon, siirtää nappulan Pariisiin, ajaa
`saavu()`n, odottaa laattakerroksen levon (`mittarit().jumissa === 0`) ja
lukee neljä pikseliä kuvakaappauksesta mediaanina 9 × 9 ruudusta.
Luokittelu ja sen kaksi ansaa periytyvät erän 1 luvusta 4.3
(sininen testataan ENSIN; jokainen piste tarkistetaan
`elementFromPoint`illa, että se on pallon kangas eikä kortti).

Mittauspisteet: Keski-Ranska (murrettu maa) · Namur, Belgia (feidattu) ·
Välimeri ~8 mpk (savunsininen) · Välimeri ~40 mpk (feidattu paperi).

**Vastakoe (pakollinen): `--ilman-alfaa`** tarjoilee saman laataston,
josta alfakanava on riisuttu (täysi peitto). Silloin Belgian ja avomeren
pisteiden on luettava VÄRILLISIKSI ja savukkeen on kaaduttava niissä
kahdessa väitteessä. Jos savuke on vihreä myös ilman alfaa, se mittaa
jotain muuta kuin leikkuria. **Toinen vastakoe: `--eri-maa`** asettaa
pelaajan Belgiaan ja odottaa, ettei Ranskan laatastoa haeta yhtään
laattaa (`mittarit().pyyntoja` ei kasva `vari/`-poluilla) — se on
maanvaihdon mitätöinnin ainoa kone­tarkistus.

---

## 3. ERÄT 2–8 PALLOLLE

### 3.0 STAATTINEN KARTTA (PÄÄTÖKSET 2, kohta 2) — läpileikkaava ehto

Omistaja: *"maan tiedot, lisää-valikko, nostot ja muut elementit
KIINNITETÄÄN KARTTAAN (karttakoordinaatit, skaalautuvat zoomatessa kuin
painettu kartta), maan reunan ulkopuolelle tai rajalle, ei ruutuun."*

**Nykytila on päinvastainen kahdella tavalla** (mitattu, luku 1.3):
kartuutsi ja maataulu ovat RUUTUUN ankkuroituja karttaruudun lapsia, ja
nostomerkit ovat maantieteellisesti ankkuroituja mutta RUUTUVAKIOKOKOISIA
(`scale(0.7727)`, nostot.js:308).

**Toteutus pallolla, kolme palaa:**

1. **Ankkuri karttaan** on jo olemassa: `htmlElementsData` +
   `htmlLat/htmlLng` (merkit.js:261–264). Maapaneeli ja lisää-valikko
   tehdään siis **uusina merkkidatumeina** (`merkit.aseta('maapaneeli',
   […])`), ei karttaruudun lapsina. Paikka: maan laatikon reunan
   ULKOPUOLELLA — laske `maanLautalaatikko`sta piste `(x0 − marginaali,
   y1)` (laatikon vasen alakulma ulospäin) ja käännä asteiksi
   `pallonAsteet`illa. Merentakaiset osat ovat jo karsittu (SAARIVARA).
2. **Skaalautuminen** on yksi CSS-muunnos: `asetteleNosto`
   (nostot.js:302–318) kirjoittaa jo `scale(NOSTON_MITTA)`. Kiinteä luku
   vaihdetaan korkeudesta laskettuun: `mitta = NOSTON_MITTA ×
   (uloinLeveys / nakyvaLeveys)`, rajattuna esim. `[0,75 … 3,0]`. Näkyvä
   leveys on `kamera.kameranTila().leveys` ja uloin on maan laatikko ×
   1,15 — eli **sama kaksi lukua, jotka erä 2 laskee joka tapauksessa**.
   Raja on pakollinen: ilman kattoa lähikuvassa nimiö kasvaisi
   ruudun kokoiseksi, ja `sovitteleLaput` (js/pallolauta/sovittelu.js) sekä
   `laatikot()` (merkit.js:366–382) laskevat ruutupikseleitä.
3. **Luettavuus mitoitetaan ULOIMMALLE zoomille** (omistajan oma
   seuraus). Kartuutsin ja maataulun nykyinen kirjasinkoko on
   ruutupikseleitä; karttaan kiinnitettynä se on uloimmalla zoomilla
   pienin. Mitta: maataulun leveys uloimmalla zoomilla ≥ 240 css-px
   400 px:n ruudulla.

**Puhelimella pannataan paneelin luo.** Paneeli on maan reunan
ulkopuolella, eli uloimmalla zoomilla ruudun laidassa. Kaksi tarvittavaa
lisää: (a) pannauksen raja on jo olemassa (`zoomirajaSyrjaytys` +
OrbitControls), mutta sen on sallittava laatikko × 1,15 **paneelin
puoleltakin** — eli laatikko lasketaan paneelin kanssa yhteen
(`yhdista`-funktio on jo js/maanaariviivat.js:189); (b) paneelin merkki
saa napautuksen `napautettavat()`-polusta (merkit.js:385–392), joka
vaatii datumille `napautus(d)` — sama kuin linssimerkeillä.

**Riski, joka on kirjattava omistajalle:** maataulu ja kartuutsi
palautettiin ruudun nurkkaan **omistajan omasta pyynnöstä 11.9.2026**
(js/fokusmitat.js:321–326, sanatarkasti *"Ne olivat ennen vasemmassa
alakulmassa. Ne saisi palauttaa näkyviin"*). PÄÄTÖKSET 2 siirtää ne
karttaan. Ristiriita on tarkoituksellinen (uusi päätös voittaa), mutta se
on hyvä varmistaa ennen kuin kaluste liikkuu — kysymys 2 luvussa 5.

### 3.1 Erä 2 — Zoomirajat ja punainen viiva pallolla (**S**, ei M)

**Mikä muuttuu tasokarttaan nähden:** suunnitelman erä 2 oli M
(`saapumisPorras`, `fokusRajaukset`, `ULOSZOOMAUS_KERROIN`,
`ZOOMI_LAHIN`). **Pallolla saapumisrajaus on JO TEHTY** (luku 1.2), joten
jäljelle jää kaksi asiaa.

- Tiedostot: `js/pallolauta/lauta.js` (:1303–1312 `zoomirajaSyrjaytys`,
  :2644–2661 `saapumisrajaus`/`saavu`), `js/pallolauta/kamera.js`
  (uusi vientifunktio `korkeusLaatikosta(bbox, kerroin)`),
  `js/pallovektorit.js:231` (`KOROSTUS_MUSTE`).
- Toteutus: `saapumisrajaus()` laskee laatikon jo nyt ja muistaa sen
  maittain. Sama laatikko × 1,15 muunnetaan korkeudeksi
  (`korkeusLeveydesta`, kamera.js:264–272) ja asetetaan
  `zoomirajaSyrjaytys = { max }`. Se on yksi paikka, se elää
  ResizeObserverin yli (kommentti :1294–1302) ja se kumoutuu linssin
  ajaksi kuten satelliittilinssillä.
- Mitatut kattokorkeudet (laatikko × 1,15): GRC 0,441 / FRA 0,753 /
  ITA 0,610 puhelimella; GRC 0,187 / FRA 0,288 työpöydällä. Kaikki
  selvästi `PALLO_KORKEUS_MAX 2,5`:n alla, eli syrjäytys on aito
  tiukennus. **RUS, USA, CHN ja BRA osuvat kattoon jo saapumisessa**,
  joten niillä syrjäytystä ei aseteta — muuten kamera lukkiutuisi
  maailmankuvaan.
- **Lähin zoomi: ÄLÄ muuta.** `PALLOLAUDAN_LAHIN_LEVEYS = 60` yksikköä
  on 1,80°, ja pyramidin syvin taso on 480 px/aste
  (`PYRAMIDIN_SYVIN_PX_ASTE`, kamera.js:234) → 864 laattapikseliä
  1170 laitepikselille = **1,35× venytys**. Singapore (12 × 6 yksikköä)
  on jo nyt lähempänä kuin lähin porras; sen vetäminen ruudun täyteen
  vaatisi 4× venytyksen. Suunnitelman `ZOOMI_LAHIN = min(88, rajaus ×
  0,8)` ei siis siirry pallolle: **pikkuvaltion raja on rasterin raja,
  ei koodin.**
- EI: ei kosketa `SAAPUMISRAJAUKSEN_MAX`iin (2000), ei
  `PALLOLAUDAN_SAAPUMISLEVEYS`iin (240) eikä
  `matkakohteiden`-laajennukseen; punainen viiva vain pallolla (tasokartan
  puoli on erässä 1).
- Valmis: saapuminen rajaa maan ruutuun (on jo), uloszoomaus pysähtyy
  laatikkoon × 1,15 sormella, rullalla ja napilla, kehä on punainen,
  eikä RUS/USA/CHN lukitu.
- Savuke `savuke-pallon-maanikkuna.mjs`: `kamera.kameranTila().leveys`
  saapumisen jälkeen ja uloszoomauksen pohjalla kolmelle maalle (GRC,
  FRA, RUS), molemmilla kuvasuhteilla. **Vastakoe:** kehittäjän
  maailmanäkymä päällä (`kehittajaMaailmaPaalla`) ja satelliittilinssi
  auki → syrjäytystä EI ole, ja koe kaatuu jos raja silti pitää.

### 3.2 Erä 3 — Maan perustiedot ja lisää-valikko (**M**)

**Mikä muuttuu:** suunnitelman erä 3 olisi rakentanut uuden
`js/maapaneeli.js`:n ruutuankkuroituna. Pallolla **perustiedot ja
plus-nappi ovat jo olemassa** (luku 1.3), joten työ on (a) valikko
plussan taakse, (b) kaluste karttaan kiinnitetyksi (luku 3.0).

- Tiedostot: `js/fokusmitat.js` (:553–577 `rakennaMaataulu`, :566
  plus-nappi, :2040–2060 näkyvyys), `js/lehti.js:719` (`avaaMaalehti`
  saa `{ sivu }`), `js/pallolauta/merkit.js` (uusi osa `maapaneeli`),
  `js/pallolauta/lauta.js:2548` (kutsukohta), `css/styles.css`.
- Valikon otsikot luetaan `MAA_KATEGORIAT[iso]`-taulusta
  (js/lehti.js:283–292) kuten suunnitelmassa; Ranskalla 8 otsikkoa.
  Värikoodi ja ikonit poimitaan olemassa olevista symboleista
  (`assets/kartat/symbolit/sym-*.webp`, sw.js:354–366), jotta valikko
  ja nostot puhuvat samaa kieltä — sama suositus kuin tasokartalla.
- Otsikon painallus → `avaaMaalehti(ui, iso, { sivu })`. Sivuindeksi
  tulee `MAA_KATEGORIAT`-taulun järjestyksestä; parametri on uusi.
- EI: ei kosketa kaupunkilehteen, ei nostoihin, ei
  `MAATIEDOT`-tauluun (js/fokusmitat.js:58), ei Pulun tiedostoihin.
- Valmis: Ranskan 8 otsikkoa aukeavat oikeille sivuille; paneeli on
  kiinni kartassa maan reunan ulkopuolella, skaalautuu zoomatessa
  rajoissa ja on luettava uloimmalla zoomilla 400 px:n ruudulla.
- Savuke `savuke-pallon-maapaneeli.mjs`: jokainen otsikko napautetaan
  (`napautettavat()`-polku) ja avautunut sivu todennetaan; paneelin
  ruutulaatikko mitataan kahdella zoomilla. **Vastakoe:** maa ilman
  `MAA_KATEGORIAT`-riviä → valikko ei aukea eikä peli kaadu; **ja**
  paneelin laatikon on oltava uloimmalla zoomilla PIENEMPI kuin
  lähimmällä — jos se on sama, skaalautuminen ei toimi ja koe kaatuu.

### 3.3 Erä 4 — Kaupungin iso pop-up ja turisti-info (**L**)

**Mikä muuttuu:** ei paljon. Napautusketju on pallolla valmis
(`napautaKaupunki` → `ui.avaaTutkinta(city)`, lauta.js:1797), ja
kaupunkilehti, nähtävyyskartta ja pop-up-kerrokset ovat
lautariippumattomia (js/lehti.js, js/nahtavyydet.js). Erän työ on
**js/lehti.js:n etusivun osien irrotus omiksi kutsuttavikseen** — sama
työ kuin tasokartalla.

- Tiedostot: `js/lehti.js` (etusivun kokoaja :472–545), `js/nahtavyydet.js`
  (`piirraKaupunkiKartta` :159, `kytkeKarttaZoom` :868,
  `avaaKarttaSuurennos` :1015), uusi `js/kaupunkinosto.js`,
  `js/packs/fokuskohteet-fra.js`, `js/pallolauta/lauta.js:1797`
  (ovi vaihtuu pop-upiin).
- Pallon oma lisä: pop-up ankkuroidaan merkin RUUTUPISTEESTÄ kuten
  fokuskohteen kortti (`avaaFokuskohde({ ankkuri })`,
  `asemoiFokuskohde` levossa, lauta.js:2446) — ei ruudun keskelle.
  Turisti-info on tavallinen karttanosto omalla symbolilla ja
  `kattoVapaa: true` (js/fokuskohteet.js:726–727), joten se ohittaa
  kaupunkiruuhkan katon niin pallolla kuin poltossa.
- EI: ei poisteta kaupunkilehteä; vanha ovi jää rinnalle kunnes omistaja
  on nähnyt uuden. Ei kosketa `KORTTIVALITSIN`-listaan (lauta.js:1145)
  muuten kuin lisäämällä uusi luokka — se on nielu, joka estää
  sulkevan napautuksen avaamasta uutta korttia.
- Valmis: Pariisin napautus avaa pop-upin (hero + esittely + zoomattava
  kohdekartta) merkin kohdalle; turisti-info avaa matkustusoppaan;
  kamera ei karkaa pop-upin alta (`asemoiFokuskohde`).
- Savuke `savuke-pallon-kaupunkipopup.mjs`: molemmat pop-upit auki ja
  kiinni, kohdekartan zoom toimii, ankkuri seuraa kameraa levossa.
  **Vastakoe:** Marseille (ohut lehti, 2 osastoa) → pop-up aukeaa silti
  eikä jätä tyhjää lohkoa; **ja** pallon pyöritys pop-up auki → ankkurin
  ruutupisteen on liikuttava, muuten asemointi ei ole kytketty.

### 3.4 Erä 5 — Kaupunkilehden sivut nostoiksi, Pariisi (**L**)

**Mikä muuttuu: melkein mikään — ja se on hyvä uutinen.** Nostojen
ladonta on pallolla sama tynkä kuin poltossa ja tasokartalla
(`maanKohdemerkit` → `ladoMaanTynka`, js/pallolauta/nostot.js:465–470),
joten sisältöjako on data­työtä eikä lautatyötä. Jako on jo hyväksytty
(PÄÄTÖKSET 1, kohta 3: Menovinkit maan valikkoon, Musiikin 3 nostoa
yhdeksi, Historian 7 nostoa kolmeksi karttapisteeksi + yhdeksi nostoksi,
maaosasto pois; teksti siirtyy sanatarkasti).

- Tiedostot: `js/packs/fokusvirta-pariisi.js`, `js/packs/maakartat.js`
  (Pariisin uudet kohdekarttapisteet), `js/packs/kulttuuri-kategoriat.js`.
- Pallon omat kaksi lisää: (1) **nostotaso on poltettava uudestaan
  samassa PR:ssä JA pallon oma sarja tarkistettava** — pallolla portti on
  `pallonNostoOnPoltettu` (js/pallo.js) ja versioportti
  `lepokerroksenKerrokset` (js/pallolaatat.js:355–358): jos nostotason
  versio ei täsmää, koko laattakerros sammuu ja kartta putoaa
  `POHJAN_TASO_MAX`iin. Tämä on ankarampi kuin tasokartalla, jossa vain
  nostokerros olisi väärä. (2) Elävien nostojen katto on 40
  (`NOSTOJEN_KATTO`), ja kasaus/erottelu tehdään `sovitteleLaput`illa
  ruutupikseleissä — jos erä 3.0 tekee merkeistä skaalautuvia, sovittelu
  on mitattava uudestaan lähimmällä zoomilla.
- EI: ei keksitä yhtään uutta faktaa (sisältöpistokoe, docs/roolitus.md);
  ei muuteta `LEHDEN_VAHIN_OSUUS`-porttia tässä erässä.
- Valmis: PÄÄTÖKSET 1:n taulukko toteutettu; pääkartan merkkimäärä
  Ranskassa ≤ 21, kohdekartalla ≤ 17; pallon sarja ja pyramidi samaa
  versiota (kerros ei sammu).
- Savuke: olemassa oleva `savuke-pallo-nostolaput` + `savuke-nostopoltto`
  laajennettuna. **Vastakoe:** poistetaan yksi kohdekarttapiste →
  karsinta palauttaa noston pääkartalle; **ja** väärä nostotason versio
  luettelossa → `mittarit().syy` on *"pallon sarja ja pyramidi eri
  versiota"* eikä kerros piirrä. Toinen vastakoe on tämän erän tärkein:
  se on ainoa kone, joka näkee luvun 4.2 riskin.

### 3.5 Erä 6 — Minikysymykset nostoihin (**M**)

**Mikä muuttuu: ei mitään lautakohtaista.** Nostokortti on sama
komponentti molemmilla laudoilla (`avaaFokuskohde` → js/fokusnosto.js),
ja palkkio kulkee `game.actionMinitehtava`n (js/game.js:1202) läpi.
Suunnitelman luku 5.1 siirtyy pallolle sanasta sanaan; PÄÄTÖKSET 1
kiinnitti palkkion (nostokysymys 25 p, lehtitehtävä 50 p).

- Tiedostot: `js/fokusnosto.js` (visa kortin loppuun),
  `js/fokustehtavat.js` (jaettu komponentti, `piirraNimettyTehtava`
  :828–960), `js/game.js` (uusi laskuri `nostotehtavatRatkaistu`),
  `js/packs/fokusvirta-pariisi.js`.
- EI: ei muuteta lehtitehtävien palkkiota eikä `actionMinitehtava`n
  rajapintaa; ei nosteta tallennuksen skeemaversiota (luku 4.4).
- Valmis: joka kolmannessa Pariisin nostossa on kysymys, oikea vastaus
  lisää 25 p ja kirjautuu tallennukseen, väärä ei kumpaakaan.
- Savuke `savuke-nostovisa.mjs` (`--lauta pallo`): oikea ja väärä vastaus,
  luetaan `money` ja laskuri. **Vastakoe:** väärä vastaus ei lisää
  kumpaakaan, eikä sama kysymys anna palkkiota kahdesti.

### 3.6 Erä 7 — Aarre vihreänä pisteenä (**S**)

Vihreä piste on jo pallolla (`paivitaFokuspistePallolla`, lauta.js:2708;
kuvio js/fokuspiste.js, `fokuspisteenSiirto`), ja sen ehto on
`fokusvirtaKohtaamispiste` (js/fokusvirta.js:5440–5457, ehto
`fokusAarreAvattu`). Muutos on yksi ehtolauseke: **≥ 2 ratkaistua
NOSTON minitehtävää**, ja laskurin on oltava kaupunkikohtainen (erän 6
`nostotehtavatRatkaistu`) — lehtitehtävät eivät saa täyttää ehtoa
vahingossa.

- Tiedostot: `js/fokusvirta.js` (`fokusvirtaKohtaamispiste`),
  `js/fokuspiste.js`, Pulun ohje **`polloVihje`-KUTSUNA** kertalipulla
  `matkakirja-karttaohje` (malli: `matkakirja-livia-paljastus`,
  js/livia.js:530).
- EI: ei muuteta aarrekysymystä, laatan palkkiota eikä `js/pollo.js`:ää
  (Codexin tiedosto). Teksti on Fablen, ei tämän erän.
- Valmis: piste syttyy kahdesta ratkaistusta nostotehtävästä; Pulun ohje
  näkyy kerran ensimmäisessä kaupungissa; vanha `fokusAarreAvattu`
  luetaan TAI-ehtona (luku 4.4).
- Savuke `savuke-aarrepiste.mjs` (`--lauta pallo`): 0, 1 ja 2 tehtävää.
  **Vastakoe:** yhdellä tehtävällä piste EI syty; **ja** vanha tallennus,
  jossa `fokusAarreAvattu` on tosi mutta laskuri 0 → piste syttyy silti
  (pelaaja ei menetä jo avattua aarretta).

### 3.7 Erä 8 — Liiku-nappi ja neljä kulkutapaa (**L**)

**Liftaus = noppa uudella nimellä ja autokyytianimaatiolla** (PÄÄTÖKSET 1,
kohta 4, sanatarkasti): sama aika kuin jalan, `steps`-noppa ennallaan,
**vain animaatio muuttuu** hyppivästä pelinapista autokyydiksi, joka
kiihdyttää alussa ja jarruttaa lopussa.

Nykytila mitattuna: kulkutavat ovat `land, sea, fly, stay`
(js/game.js:956–969), napit `renderTravelChoice(modes)` (js/ui.js:10813,
:10868) ja **alanappirivi on aina täsmälleen kolme paikkaa**
(js/ui.js:10843–10845) — Liiku-nappi mahtuu siihen riviin
monitoiminappina, ei uutena kalusteena. Jalkamatkan tahti on
`jalkamatkanAskel(askelia)` (js/siirtokoreografia.js:96;
`JALKAMATKAN_STEP_MS 860`, lyhin 640, katto 5200).

**Autokyytianimaatio pallolla — tarkka sauma.** Kuljettajan sopimus on
`nosta / aseta / hyppaa / laske` (js/pallolauta/siirto.js:382), ja
`hyppaa(a, b, kesto, { vaihe })` ottaa jo valinnaisen vaihekäyrän.
**Mutta `vaihe` on toteutettu VAIN koneelle** (`piirraKone`,
siirto.js:302: `hyppy.vaihe ? hyppy.vaihe(t) : hypynVaihe(t).e`);
**nappula lukee aina `hypynVaihe`n** (`piirraNappula`, siirto.js:222).
Erän 8 ensimmäinen muutos on siis kolme riviä: nappula kunnioittaa
`vaihe`a, ja kun `vaihe` on annettu, pystykaari (`nousu`, huippu,
varjon kutistus :237–241) jää pois — auto ei hyppää. Kiihdytys ja
jarrutus on sama `ease-in-out`, jonka `hypynVaihe` jo laskee
(js/siirtokoreografia.js:374–378), mutta **koko nopan matkalle kertaalleen**
eikä askelta kohti: yksi ajo lähtökaupungista `steps` askeleen päähän,
kesto `jalkamatkanAskel(askelia) × askelia`, käyrä `e(t)` koko matkalle.
Se on täsmälleen omistajan kuvaus.

- Tiedostot: `js/game.js` (`travelModes`: `land` → nimi *liftaus*,
  uusi `bussi` 50 p; hinnat :12, js/rules.js:6), `js/rules.js`
  (kaarisuodatus `e.type`, `stepsFrom` :215, `rideTarget` js/game.js:2282),
  `js/ui.js` (Liiku-nappi `renderTravelChoice`, koreografia
  `animatePawnSisalla`), `js/pallolauta/siirto.js` (:222, :302, :382),
  `js/pallolauta/kamera.js` (`siirtoZoomiKerroin` :495–500),
  `js/siirtokoreografia.js` (uusi vaihekäyrä autokyydille).
- **Zoomi kulkutavan mukaan pallolla:** `siirtoZoomiKerroin(lahennys)`
  (kamera.js:495–500) rajaa siirtonäkymän jo nyt eikä koskaan mene ULOS
  pelaajan omasta lähikuvasta, katto `PALLOLAUDAN_SIIRTOLEVEYS = 120`
  yksikköä. Kulkutapakohtainen tavoite annetaan sille kutsussa:
  liftaus/bussi = kaaren molemmat päät + 25 %, laiva + 50 %, lento =
  molemmat maat (`maanLautalaatikko` kahdelle maalle, `yhdista`).
  Lento ohittaa siirtonäkymän jo nyt (`doFly` ei saa `saatto`-lippua)
  ja ajaa oman rajauksensa (js/pallolauta/siirto.js:26–32).
- **Uloszoomauksen esto ja matkavalinta ovat ristiriidassa**, kuten
  tasokartalla: kulkutapa on se hetki, jolloin kameran on päästävä maan
  laatikon ulkopuolelle. Pallolla ratkaisu on sama yksi paikka:
  `zoomirajaSyrjaytys = null` matkavalinnan ja siirron ajaksi, takaisin
  saapumisen jälkeen. Se on syrjäytyksen alkuperäinen käyttötarkoitus
  (kommentti lauta.js:1294–1302).
- EI: ei muuteta nopan lukuja eikä `steps`-laskentaa (liftaus ON noppa);
  ei kosketa `stay`-tapaan; ei poisteta `land`-tunnusta datasta (vanhat
  tallennukset, luku 4.4) vaan vain sen NIMI ja animaatio vaihtuvat.
- Valmis: neljä tapaa näkyvät Liiku-napissa, bussi veloittaa 50 p,
  liftaus kuluttaa saman ajan kuin ennen jalan, nappula liikkuu
  autokyytinä (kiihdytys–jarrutus, ei hyppyä), kartta rajautuu tavan
  mukaan, vanhat tallennukset latautuvat.
- Savuke `savuke-liiku.mjs` (`--lauta pallo`): jokainen tapa kerran,
  `money` ja `kameranTila().leveys` ennen ja jälkeen, nappulan
  ruutupisteen nopeusprofiili (ensimmäinen ja viimeinen viidennes
  hitaampia kuin keskiosa). **Vastakoe:** ilman rahaa bussi ja laiva
  eivät ole valittavissa; **ja** liftauksen profiilin on oltava
  EI-tasainen — jos nopeus on vakio, kiihdytystä ja jarrutusta ei ole ja
  koe kaatuu. Kolmas vastakoe: nappulan pystykorkeus liftauksessa pysyy
  nollassa (ei hyppyä).

---

## 4. RISKIT JA RAJAPINNAT

### 4.1 Horatio–Livia-työ (Codex)

`js/pollo.js`, `js/livia-*.js` ja Pulun CSS ovat tekstisession
omistuksessa; fokusvirran saapumisketju on Fablen (docs/roolitus.md,
"Yhteiskehitys tekstisession kanssa", kohta 2: *"Ei hiljaisia paikkauksia
toisen omistamiin tiedostoihin"*). **Erät 4, 7 ja 8 koskevat samaan
ketjuun.** Säännöt tähän työhön: Pulun ohjekuplat tehdään `polloVihje`-
ja `polloPuheenvuoro`-KUTSUINA; saapumisketjun muutokset menevät Fablelle
eikä niitä tehdä erässä; rajapinta (tapahtumat, kentät, keskeytyspolut)
kuitataan ennen toteutusta tilannekortilla.

### 4.2 Pallon sarja ja pyramidi: yksi versio, kaksi laatastoa

Tämä on pallon OMA riski, jota tasokartalla ei ole.
`lepokerroksenKerrokset` (js/pallolaatat.js:351–372) **sammuttaa koko
laattakerroksen**, jos pallon sarjan (laatat.json) ja pyramidin
(pyramidi.json) versiot eroavat tai jos viiva-, nosto- tai rantatason
versio ei täsmää. Silloin kartta on kirjaston Mercator-sarjaa tasoon
`POHJAN_TASO_MAX` asti — eli näkyvästi sumea (omistajan havainto v1650).
**Jokainen erä, joka polttaa laattoja (1b, 5), on ajettava niin, että
molemmat luettelot päivittyvät samassa julkaisussa**, ja savukkeen on
luettava `mittarit().syy`. Väritaso tarvitsee oman portin (`kerrokset.vari`,
luku 2.2), koska se on maakohtainen eikä maailmanlaajuinen.

### 4.3 Punainen kehä kahdessa paikassa

Erä 1 vaihtoi tasokartan kehän punaiseksi
(js/maatummennus.js + css/styles.css); pallon kehä on
js/pallovektorit.js:231. Kunnes erä 1b on mainissa, koodissa on kaksi
totuutta maan kehän väristä. Ne ovat eri laudoilla eikä pelaaja näe
molempia, mutta **vakion arvo on kirjattava yhteen paikkaan** tai sama
virhe toistuu seuraavassa muutoksessa. Suositus: `--mark`-arvo luetaan
molemmissa samasta CSS-muuttujasta tai yhdestä js-vakiosta; valinta on
erän 1b toteuttajan, mutta kahta kovakoodattua heksalukua ei jätetä.

### 4.4 Vanhat tallennukset

Skeema `version: 2` (js/game.js:2970), `Game.fromJSON` hyväksyy 1 ja 2 ja
palauttaa muista `null` (:3035); uudet kentät oletetaan `?? []`-kuviolla
(:3140–3160). **Erä 6 lisää kentän (`nostotehtavatRatkaistu`), erä 7
muuttaa aarrepisteen lukuehtoa ja erä 8 kulkutapojen nimet** — kaikki
tehdään `?? []`-kuviolla, EI versionostolla, tai jokainen vanha tallennus
hylätään. Erän 7 ehto on **TAI**: vanha `fokusAarreAvattu` TAI uusi
laskuri ≥ 2, muuten pelaaja menettää jo avatun aarrepisteen. Erässä 8
`land`-tunnus säilyy datassa; vain nimi ja animaatio vaihtuvat, joten
kesken reittiä oleva tallennus (`pos.type === 'edge'`,
js/game.js:959–961) latautuu.

### 4.5 Muut kirjatut riskit

- **iOS webapp.** Suositus (A) poistaa `clipPath`in pallolta kokonaan,
  mutta WebGL-kontekstin menetys on yhä olemassa (lauta.js:1315–1343:
  yksi uudelleenrakennus, sitten turvatila). Väri­laattojen lisähaku
  kasvattaa muistipiikkiä; `LAATTAKATTO_TAVUT` (96 Mt) on kova raja ja
  se on mitattava pilotissa. **Laitetodennus iPadilla on yhä avoin**
  (erän 1 luku 7.6).
- **Offline.** `sw.js` esilataa vain repon tiedostot; laatat tulevat
  ämpäristä (js/media.js:43). Offline-pelissä kohdemaa on seepiaa, kunnes
  värilaatat on kerran ladattu, eikä yhden tiedoston Pages-versio lataa
  niitä lainkaan. Malli puuttuvan aineiston käsittelyyn:
  js/maanaariviivat.js:353–356 (kerros jää tyhjäksi, peli ei kaadu).
- **Merentakaiset osat.** `maanLautalaatikko` karsii ne (`SAARIVARA 0.2`),
  joten Guayanassa ja Réunionissa ei ole värilaattoja eikä feidausta.
  Jos pelissä on kaupunki merentakaisella alueella, se näkyy seepiana —
  tarkistettava kaupunkilistasta ennen monistusta.
- **Sovittelu ja nimiladonta.** Jos luvun 3.0 skaalautuminen tehdään,
  `sovitteleLaput` (js/pallolauta/sovittelu.js) ja `laatikot()`
  (merkit.js:366–382) laskevat ruutupikseleitä muuttuvasta koosta —
  ladonta on mitattava uudestaan molemmilla ääri­zoomeilla.

---

## 5. OMISTAJAN PÄÄTETTÄVÄKSI (neljä kysymystä)

1. **Uloszoomauksen kerroin 1,15 — myös isoille maille?**
   Mitattuna RUS, USA, CHN ja BRA osuvat saapumisrajauksen kattoon
   (2000 yksikköä) jo saapuessa, eli niiden "laatikko × 1,15" on koko
   maailmankuva. *Suositus: syrjäytystä ei aseteta maille, joiden tarve
   ylittää katon — niissä kamera pysyy vapaana. Muut maat saavat
   1,15:n.* Ilman tätä poikkeusta Venäjässä kamera lukkiutuisi
   maailmankuvaan eikä pelaaja näkisi kaupunkia.

2. **Siirretäänkö maataulu ja kartuutsi ruudun nurkasta karttaan?**
   Ne palautettiin nurkkaan omistajan omasta pyynnöstä 11.9.2026, ja
   PÄÄTÖKSET 2 siirtää ne karttaan kiinnitetyiksi. *Suositus:
   siirretään, mutta pilottina yhdellä maalla ja niin, että nurkkatila
   on yhden vakion takana* — jos karttaan kiinnitetty paneeli osoittautuu
   puhelimella hankalaksi (se on uloimmalla zoomilla ruudun laidassa),
   paluu on yksi rivi eikä uusi erä.

3. **Murretun paletin voimakkuus: veden peittävyys ja feidauksen määrä.**
   Luvut ovat rakennusaikaisia (vaihto = uusi ajo, ei koodimuutos).
   *Suositus: vesi 0,70–0,75 (erän 1 täysväri käytti 0,9) ja muiden
   maiden feidaus 0,35 paperinsävyllä; molemmat mitataan pilottikuvasta
   ja näytetään omistajalle kolmena vaihtoehtona samasta näkymästä
   ennen kuin Euroopan laatasto ajetaan.*

4. **Mitkä maat saavat värit ensimmäisessä aallossa?**
   Euroopan pelattavat maat ovat 1–5 Mt kukin (yht. 50–100 Mt arvio),
   RUS ~177 Mt ja CHN ~44 Mt RGBA:na. *Suositus: ensimmäiseen aaltoon
   Ranska (pilotti) ja sen jälkeen ne Euroopan maat, joissa on pelin
   kaupunkeja; RUS, USA, CAN, CHN, BRA ja AUS jätetään toistaiseksi
   ilman väriä, koska niiden saapumisnäkymä osuu kattoon eikä z7 ole
   niissä katsottavissa.*

---

*Kirjoitti Opus-työsessio 13.9.2026 haarassa
`claude/karttauudistus-suunnitelma-pallo` (pohja origin/main).
Mittaukset: `assets/data/maapolygonit.json` (134 maata),
`js/pallolauta/kamera.js`:n omat funktiot, paletin kroma- ja
luminanssilaskenta kolmesta asteikosta. Erän 1 mitatut luvut on merkitty
lähteeseen `viesti-fable-karttauudistus-era1-20260913.md`.*
