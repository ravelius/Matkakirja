# Karttauudistus PALLOLLE: erien 2–8 uudelleenkirjoitus (13.9.2026)

*(Opus-työsessio Fablelle. Docs-only, ei versionostoa; js/, css/, tests/ ja
tools/ koskemattomia. Jokainen luku on LUETTU koodista tai LASKETTU koodin
luvuista; arviot merkitty sanalla "arvio". Ristiriidassa Raamattu voittaa.
PITUUS: tehtävänannon ohje oli ~500 riviä, raportti on ~760. Ylitys on
luvuissa: kahdeksan erän valmis-kriteerit ja vastakokeet, viisi mitattua
taulukkoa (laattaketju, kameran vakiot, 9 maan laatikot ja korkeudet, paletin
kroma/luminanssi, laattamäärät) ja luvun 2.2 koodimuutostaulu eivät mahdu sen
alle ilman faktojen pudottamista. Luku 1 on taustaa ja sen voi pudottaa
puoleen, jos Fable haluaa lyhyemmän version.)*

**Miksi tämä on olemassa.** Suunnitelma
`docs/raportit/karttauudistus-suunnitelma-20260913.md` kirjoitettiin
TASOKARTALLE. Erän 1 raportti (luku 7.1) löysi, että tasokartta on pelistä
pois: `js/ui-apurit.js:2102` `VANHA_KARTTA_KAYTOSSA = false`, `:2121`
`LAUDAT = new Set(['pallo'])` — `?lauta=kartta` ja laitteen muistama
valinta ohitetaan. Raamatun PÄÄTÖS 3: uudistus tehdään pallolle, tasokartta
ei palaa. Suunnitelman erät 2–8 osoittavat tiedostoihin, joita peli ei
lataa; tämä raportti kirjoittaa ne pallon koodiin.

---

## 1. PALLON NYKYTILA (mitattu)

### 1.1 Laattapyramidin laatat pallon pinnalla

Kaksi laattalähdettä päällekkäin: (1) kirjaston Mercator-sarja
(`globeTileEngineUrl`, js/pallo.js:719–723) on POHJA, ja kun laattakerros
on päällä, se rajataan tasoon `POHJAN_TASO_MAX` (:721); (2) **laattakerros**
= pyramidin laatat laatta kerrallaan pallon pinnalle (`luoLaattakerros`,
js/pallolaatat.js:915). Lähikuvassa pelaaja katsoo kerrosta.

Ketju yhdelle laatalle (js/pallolaatat.js:1176–1279):

| vaihe | rivi | mitä |
| --- | --- | --- |
| kerrostasot | 1187–1188 | `pyramidinKerrostasot(z)` → lista; suodatin `k.nosto ? kerrokset.nosto : (k.viiva ? … : (k.ranta ? … : true))` |
| haku | 1192–1193 | `pyramidinLaattaOlemassa` + `pyramidinLaattaUrl`, `haeKuva` (createImageBitmap, CORS) |
| **kangas** | 1223–1231 | YKSI 2D-kangas per laatta, `ctx.drawImage` **jokaiselle kerrostasolle päällekkäin** |
| verkko | 1234–1245 | laatan lat/lon-suorakaide, UV kankaalla |
| tekstuuri | 1246–1256 | `new Texture(kangas)`, mipmapit WebGL2:lla, anisotropia |
| materiaali | 1257–1260 | `LaattaMateriaali`, `transparent: true`, `polygonOffsetUnits −8` |
| vienti | 1273–1278 | `initTexture` **yksi laatta kehyksessä** (mitattu 3,0 ms p50 / 6,7 ms max) |

`pyramidinKerrostasot` (js/laattapyramidi.js:1921–1932) kokoaa pohjan +
ranta- + viiva- + nostotason. **Tämä on uudistuksen tärkein sauma: pallo
piirtää sen, mitä tuo funktio palauttaa, eikä tunne kerrosten merkitystä.**
Osoite, versioavain ja noutokirjanpito ovat samassa tiedostossa kolmena
hardkoodattuna if-ketjuna: `tasonVersio` (:602–607), `laattaUrl` (:640–662),
`noutoEtuliite` (:666–673).

Versioportti `lepokerroksenKerrokset` (js/pallolaatat.js:351–372) vaatii,
että pallon sarja (laatat.json) ja pyramidi (pyramidi.json) ovat samaa
versiota ja että viiva-, nosto- ja rantatason versiot täsmäävät — muuten
koko kerros sammuu.

Katot (js/pallolaatat.js:644–688): näkyviä laattoja enintään 48
(`LAATTAKATTO_NAKYVA`; isompi määrä pudottaa tason karkeammaksi), ennakossa
96, muistissa 24, tekstuurimuisti 96 Mt, rinnakkaisia latauksia 6, päivitys
liikkeessä 10 Hz, häive 260 ms, pito 2000 ms. Mittarit (`laattoja,
scenessa, kaytetytTavut, jumissa, valmisteluMs…`) luetaan savukkeista
polusta `ui.pallolauta.lepokerros().mittarit()`
(tools/savukkeet/mittaa-pallon-vektorit.mjs:238–246). **Korkeusrajaa ei
ole** (`suorita`, :1418–1465): taso valitaan ruudun laitepikseleistä
hystereesillä (`LAATTAKERROS_HYSTEREESI_ALAS 0,7`).

### 1.2 Kamera, zoomirajat ja saapuminen

| asia | paikka | arvo |
| --- | --- | --- |
| fov (pystykulma) | kamera.js:80 | 50° |
| kaukaisin korkeus | :82 | `PALLO_KORKEUS_MAX 2,5` |
| lähin näkyvä leveys | :226 | `PALLOLAUDAN_LAHIN_LEVEYS 60` yks (1,80°) |
| saapumisleveys (vara) | :111 | 240 yks |
| saapumisrajauksen marginaali | :123 | 0,05 joka reunalle |
| saapumisrajauksen katto | :139 | 2000 yks (≈ 60° pituuspiiriä) |
| kamera-ajon kesto | :148 | 1400 ms |
| zoomirajat sormelle | lauta.js:1304–1312 | `controls.min/maxDistance = sade × (1 + korkeus)` |
| rajojen syrjäytys | lauta.js:1303, 2724 | `zoomirajaSyrjaytys = { min, max }`, elää ResizeObserverin yli |

**"Maa niin suureksi kuin mahdollista" ON JO TEHTY PALLOLLA.**
`saapumisrajaus()` (lauta.js:2644–2656) lukee maan laatikon
`maanLautalaatikko(data, iso, { kohta })`illa (js/maanaariviivat.js:240;
`SAARIVARA 0.2` karsii merentakaiset osat) ja muistaa sen maittain;
`saavu()` (:2659–2661) antaa sen `kamera.kotiin({ bbox })`ille, joka
sovittaa laatikon ruutuun MOLEMPIIN suuntiin (`kameranKohde`,
kamera.js:363–377: `leveys = max(bbox.w × vara, bbox.h × vara × W/H)`) ja
putoaa entiseen kaupunkinäkymään vain, jos tarve ylittää katon 2000.

Mitattu `assets/data/maapolygonit.json`sta (134 maata, lauta 12000 × 5399,
tarkkuus 10); korkeus = kamera.js:n omat funktiot:

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

**Katon 2000 ylittävien määrä RIIPPUU KUVASUHTEESTA.** Koodin kommentti
(kamera.js:135) sanoo viisi, ja se pitää puhelimella (RUS, USA, CAN, GRL,
CHN); **työpöydällä 1440 × 900 niitä on yhdeksän** (lisäksi CHL, BRA, ARG,
AUS). Uusi mittaus, ei ristiriita: sama kaava, eri ruutu.

### 1.3 HTML-merkit, nostot ja fokusvirta

Merkkikerros on Globe.gl:n `htmlElementsData` (`luoMerkit`,
js/pallolauta/merkit.js:244–270): datumit pysyviä olioita avaimittain,
`htmlLat/htmlLng`, `htmlAltitude`, `htmlTransitionDuration`. Pallon takana
oleva merkki saa luokan **`.pallolauta-takana`**
(`htmlElementVisibilityModifier`, :268–270) ja häipyy CSS:llä
(css/styles.css:25561).

**Merkit ovat CSS2D:tä eli RUUTUVAKIOITA, eivät karttaan skaalautuvia.**
Kohdemerkki 24 px joka korkeudella (`KOHDEMERKIN_PX`, merkit.js:40); noston
mitta kiinteä `NOSTON_MITTA = KARTTANIMI_KOOT.kohde / NOSTOSYM_NIMIO_KOKO =
8,5 / 11 = 0,7727` (nostot.js:231, sovellus `asetteleNosto` :308:
`scale(0.7727)`); merkin ruutu `KOHDEMERKIN_RUUTU_PX = 2 × 7,4 × 0,7727 =
11,4 px` (:243). **Tämä on päätöksen 2 suora ristiriita nykytilan kanssa**
(luku 3.0).

Napautus ei kulje elementin kautta: elementit ovat `pointer-events: none`
ja osuma lasketaan pallon napautuksesta lähimpään merkkiin **44 px:n
sisällä** (`napautaPintaan`, lauta.js:2018–2052; `onGlobeClick` :2334–2339).
Kaupungin napautus `napautaKaupunki` (:1745–1800) → oma kaupunki avaa
kaupunkilehden `ui.avaaTutkinta(city)` (:1797).

Nostojen portti on **sama kuin tasokartalla**: `lehdenOsuus(pohja, nakyva,
packId) >= LEHDEN_VAHIN_OSUUS` (nostot.js:255–259, käyttö :461) eli maan
bboxin osuus näkyvän kartan leveydestä ≥ 0,5. Eläviä nostoja enintään
`NOSTOJEN_KATTO 40` (:62). Ladonta tulee samasta tyngästä kuin poltto
(`maanKohdemerkit` → `ladoMaanTynka`), eikä pallo lado nostoja itse;
poltettu nosto saa vain R-osuman (`pallonNostoOnPoltettu`, js/pallo.js).

Fokusvirran kortit ja aarrepiste ovat lautariippumattomia:
`avaaFokuskohde`/`asemoiFokuskohde` (js/fokuskohteet.js, kutsu
lauta.js:2446), `paivitaFokuspistePallolla` (:2708),
`fokusvirtaKohtaamispiste` (js/fokusvirta.js).

**Kartuutsi, maataulu ja maalehtilinkki OVAT JO PALLOLLA** (omistajan
pyyntö 11.9.2026): `pallolaudanMaa(ui)` (js/fokusmitat.js:348–354) antaa
pallolaudalle oman ehdon, `paivitaFokusmitat(ui)` ajetaan laudan
`paivita`sta (lauta.js:2548), ja ne ovat KARTTARUUDUN lapsia eivät pallon
kuoressa (:2824). **Maataulussa on jo plus-nappi**
(`.fokus-maataulu-lehti`, '+', fokusmitat.js:566–575) ja sen ainoa teko on
`ui.avaaMaalehti(iso)` — täsmälleen se nappi, josta omistaja haluaa
lisää-napin. `avaaMaalehti(ui, iso, { nimi })` (js/lehti.js:719) **ei ota
sivunumeroa.**

### 1.4 Pulu ja chat pallon päällä

Pulu on ruutuankkuroitu paneeli kartan päällä eikä tiedä laudasta muuta kuin
että kartan veto piilottaa kuplat: `kartalla(kohde)` tunnistaa `#board,
.kartta-kuori, .pallolauta` (js/pollo.js:4110), kuuntelijat dokumentissa
(:4131–4135). **Pallo ei tarvitse Pululle mitään uutta** — `polloVihje`,
`polloLisavihje`, `polloSaapumiskupla` toimivat sellaisenaan; tiedostot ovat
Codexin, joten ohjekuplat tehdään KUTSUINA.

### 1.5 Maan korostus, ääriviiva ja "muiden maiden feidaus"

Pallon ääriviiva on **vektoriviiva, ei poltto**:
`paivitaPallonMaakorostus` (js/maanaariviivat.js:363–383) →
`vektorit.korostaMaa(iso, renkaat)` (js/pallovektorit.js:1111–1121) →
`rakennaKorostus` (:885–907, `LineSegments2`, renderOrder −0,45).

**Väri on RUSKEA, ei punainen:** `KOROSTUS_MUSTE '#4a3320'`,
`KOROSTUS_PEITTO 0,68`, leveys `[1,7 … 2,5]` css-px (:231–234); perustelu
:210–230 *"KOROSTUS ON SAMAA MUSTETTA, EI TOISTA VÄRIÄ."* Erä 1 vaihti
punaisen `js/maatummennus.js`:ään ja `css/styles.css`:ään — ne ovat
TASOKARTAN kehä. Pallolla punainen on yhden vakion vaihto.

**Muiden maiden tummennusta tai feidausta EI OLE PALLOLLA LAINKAAN.**
`js/maatummennus.js` on tasokartan kerros; pallon tiedostoista ei löydy
siihen yhtään kutsua. Feidaus on kokonaan uutta työtä (luku 2.5).

---

## 2. ERÄ 1b — VÄRIKERROS PALLOLLE

Erä 1 (haara `claude/karttauudistus-era1-topografia`) tuotti
väriasteikkoparin `VARI_ASTEIKKO`/`VARI_SYVYYS`
(tools/fokuskartta/piirto.js:396–440 haarassa), ajotilan `--vari <ISO>`,
polun `pyramidi/<versio>/vari/z…`, luettelon `varitaso`-olion,
aluevesipuskurin `ALUEVESI_YKSIKKOA 6.7` + `maanAluevesiPolku()` ja mitatun
laataston **FRA 84 laattaa, 2,54 Mt, 61 s** (z4–7, 3′). Kaikki kelpaa
pallolle; vain PIIRTO vaihtuu.

### 2.1 Kaksi vaihtoehtoa

**(A) Leikkuri poltetaan laattaan generointivaiheessa (alfa).** Värilaatta
saa läpinäkyvän alfan: maapolygoni + 12 mpk aluevesi = täysi peitto,
ulkopuolella 0 (tai feidausarvo, luku 2.5). Pallo lisää tason vain
`pyramidinKerrostasot`-listaan, ja olemassa oleva `for (const kuva of
kuvat) ctx.drawImage(…)` (js/pallolaatat.js:1226–1229) piirtää sen pohjan
päälle source-overina.

- Ajossa **nolla uutta työtä**: ei toista verkkoa, ei toista tekstuuria, ei
  lisää GPU-muistia — sama kangas, sama `t.tavut` (:1268), sama yksi
  `initTexture`. Yksi lisähaku laattaa kohti.
- **Ei `clipPath`ia, ei `mask`ia, ei suodatinta** → suunnitelman riski 2.5
  ja erän 1 avoin kohta 7.6 (iOS webapp) poistuvat pallolta kokonaan.
- Hinta: puskurin tai feidauksen muutos = laattojen uusi ajo. Se on jo
  linjattu (PÄÄTÖKSET 2: *"vaihto = asteikon muutos + laattojen uusi ajo,
  ei koodimuutos"*).

**(B) Leikkuri kankaalla laatta kerrallaan (`destination-in`).** Värilaatta
toiselle kankaalle, maapolku laatan pikselikoordinaatteihin,
`globalCompositeOperation = 'destination-in'`, tulos laatan päälle. Vaatii
**toisen kankaan ja polygonitäytön laattaa kohti**: Ranskan aluevesipolku on
6 323 pistettä (erän 1 mittaus, 36 ms kerran), per laatta 20–80 täyttöä —
ja laatan valmistelun mitattu budjetti on 3,0 ms p50 / 6,7 ms max 16,7 ms:n
kehyksestä (js/pallolaatat.js:664–673). Etu: leikkuri muutettavissa ajossa
ilman uusintapolttoa.

### 2.2 SUOSITUS: (A) poltettu alfa

(1) Ajossa nolla lisäverkkoa ja nolla lisätekstuuria — tasokartalla
värikerros lisäsi laattoja +54 % (erän 1 luku 5), pallolla lisäys on **0 %**;
(2) iOS-webappin suodatin/maskiriski ei synny lainkaan; (3) laatat ovat jo
maakohtaisia, joten poltettu leikkuri ei menetä uudelleenkäyttöä; (4) sama
laatta toimii myös lepokerroksessa, koska kerrostasot ovat yhteiset.

Koodimuutokset pallolla:

| tiedosto:rivi | muutos |
| --- | --- |
| js/laattapyramidi.js:1921–1932 | `pyramidinKerrostasot`: `varitasonTasot()?.find(t => t.z === z)` **pohjan jälkeen, rantatason edelle** (väri on maastoa) |
| js/laattapyramidi.js:602–607 | `tasonVersio`: `if (taso.vari) return luettelo?.varitasot?.[maa]?.versio ?? ''` |
| js/laattapyramidi.js:640–662 | `laattaUrl`: `if (taso.vari) return pyramidiUrl('<versio>/vari/z…')` |
| js/laattapyramidi.js:666–673 | `noutoEtuliite`: `if (taso.vari) return 'c'` |
| js/laattapyramidi.js (uusi) | `varitasonTasot()` rantatason mallilla (:1509–1530): vanha luettelo ilman kenttää → `null`, kerros jää pois eikä peli kaadu |
| js/pallolaatat.js:1188 | suodatin `k.vari ? kerrokset.vari : …` — **ilman tätä väritaso menisi `: true`-haaraan ja piirtyisi myös väärässä maassa** |
| js/pallolaatat.js:351–372 | `lepokerroksenKerrokset`: `vari = varitasot[pelaajanMaa] && sen versio` |
| js/pallolaatat.js:966, 1427 | maanvaihdon on mitätöitävä laattavälimuisti — `avain` (js/laattapyramidi.js:609) sisältää version mutta ei maata |
| js/pallolaatat.js:917–953 | mittarit `varillisia`, `variMaa` (erän 1 nimet) |

**Maanvaihto on tämän erän ainoa aito uusi mekanismi pallolla.**
Tasokartalla väritaso oli oma kerros, jonka sai piilottaa; pallolla se on
osa laatan kangasta, joten maan vaihtuessa värilliset laatat on purettava
ja haettava uudestaan. Purku on olemassa (LRU + `pura`), sen laukaisu ei.
`paivitaPallonMaakorostus` (js/maanaariviivat.js:367–370) tuntee
maanvaihdon jo yhtenä ehtona ja on siksi oikea paikka herättää mitätöinti —
kutsuna laudan kautta, ei moduulien ristiin.

### 2.3 Murrettu paletti — konkreettiset luvut

PÄÄTÖKSET 2: *"seepiaan sointuvat MURRETUT sävyt (kellertävä alanko,
ruskehtava ylänkö, harmaanvihreä vuoristo, savunsininen vesi)"*. Muoto on
sama kuin erän 1 `VARI_ASTEIKKO`/`VARI_SYVYYS_ANKKURIT`
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
  { m: 6000, v: [186, 188, 180] },  // lumi harmaan kautta
  { m: 7000, v: [214, 214, 208] },
];
const VARI_SYVYYS_ANKKURIT = [            // savunsininen vesi
  { m: 0,      v: [178, 192, 196] },
  { m: -200,   v: [160, 177, 185] },   // mannerjalustan reuna
  { m: -1000,  v: [138, 157, 171] },
  { m: -2500,  v: [116, 136, 154] },
  { m: -4000,  v: [ 98, 117, 138] },
  { m: -6000,  v: [ 84, 100, 122] },
  { m: -11000, v: [ 70,  84, 104] },
];
```

Mitattu perustelu (kroma = max−min-kanava, L = BT.709-luminanssi):

| asteikko | kroma ka. | sävykulmat (H°) | L kulku |
| --- | ---: | --- | --- |
| seepia (peli nyt, piirto.js:172) | **68,4** | 54 → 12 (yksi ruskea perhe) | 214 → 80 |
| täysväri (erä 1) | **77,8** | 125 → 21 (vihreä → ruskea) | 97 → 168 |
| **murrettu (ehdotus)** | **39,1** | 48 → 33 → 83 | 202 → 116 |
| syvyys täysväri (erä 1) | 91,3 | 193 → 215 | 208 → 28 |
| **syvyys murrettu** | **32,3** | 193 → 215 | 189 → 82 |

**Tämä vastaa omistajan huoleen.** Murrettu paletti on **vähemmän
kylläinen kuin pelin nykyinen seepiakartta** (39 vs. 68): se ei voi rikkoa
ilmettä värikkyydellä, vain sävyllä. Uutta on sävykulmien vaihtelu
(48° → 83°), ei kirkkaus. Luminanssi laskee monotonisesti lumirajaan
(202 → 116), eli korkeuslukema säilyy myös mustavalkona.

Kaksi reunaehtoa: (1) 3200 → 4200 m sävykulma hyppää 33° → 75°, mutta
kroma on siinä 36 → 16, joten hyppy luetaan harmaantumisena eikä
värinvaihtona; (2) erän 1 ajo nosti meren peittävyyden 0,5 → 0,9
(`variPaletti`, tools/fokuskartta/maailmapiirto.js) — murretulla
syvyydellä 0,9 litistää veden, **suositus 0,70–0,75**, ja luku mitataan
pilottikuvasta eikä päätetä paperilla.

### 2.4 Punainen raja pallolla

Yksi vakio: `js/pallovektorit.js:231` `KOROSTUS_MUSTE '#4a3320'` →
**`'#b03a2b'`** (`--mark`, css/styles.css:90). Leveys `[1,7 … 2,5]` (:234)
on jo omistajan mitoitus (2,5 px lähellä) eikä muutu; peitto 0,68 nostetaan
täyteen vain jos punainen ei lue pilottikuvassa — mitataan, ei päätetä.
Viiva on jo yhtenäinen ja jo maakohtainen.

Tasokartan puoli on erässä 1 tehty (js/maatummennus.js:147 `TUMMENNUS_VIIVA`
2 → 2,5; css/styles.css:1702 `stroke: var(--mark)`), pallon vakio ei —
ks. riski 4.3.

### 2.5 Muiden maiden feidaus pallolla

Pallolla ei ole tummennuskerrosta (luku 1.5), eikä sitä voi tehdä
tasokartan tavalla: SVG-suodatin ei ole vaihtoehto ja reikä kalvossa
(kaikki paitsi kohdemaa) vaatisi stencilin.

**SUOSITUS: feidaus poltetaan SAMAAN värilaattaan sen alfaan.** Laatasto
kattaa maan laatikon **× 1,15** (sama kerroin kuin uloszoomauksen esto,
luku 3.1), ja alfa on kolmiportainen:

| alue | laattaan poltetaan |
| --- | --- |
| maa + 12 mpk aluevesi | murrettu paletti, alfa 1,0 |
| laatikon sisällä maan ulkopuolella | paperinsävy `PAPERI #e8dcbc`, alfa ≈ 0,35 |
| laatikon ulkopuolella | ei laattaa lainkaan (`laatasto`-bittikartta, js/laattapyramidi.js:611–637) |

Tämä toimii, **koska uloszoomauksen esto tekee laatikosta koko ruudun**:
kamera ei pääse laatikkoa × 1,15 kauemmas, joten feidattu laatikko on
kaikki mitä pelaaja näkee. Ilman estoa feidaus näkyisi suorakaiteena —
**erät 1b ja 2 on tehtävä samassa PR:ssä tai peräkkäin ilman julkaisua
välissä.** Feidauksen 0,35 on rakennusaikainen ehdotus ja mitataan
pilottikuvasta (naapurin rantaviivan on yhä luettava).

### 2.6 Laattojen määrä, tavut ja aika

Mitattu pohja: erä 1 ajoi FRA:n laatikolle (ilman × 1,15) **84 laattaa /
2,54 Mt / 61 s**, tavua/px 0,108–0,161. Alla oleva malli antaa samalle
laatikolle 96, eli **yliarvioi ~14 %**; alfa lisää arviolta +25 % tavuja.

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

Euroopan pelattavat maat ovat **1–5 Mt kukin**; koko Eurooppa on
suuruusluokaltaan 50–100 Mt ja muutama tunti yhdellä säikeellä (erän 1
0,81 Mpx/s). Venäjä ja Kiina eivät tarvitse z7:ää: niiden saapumisrajaus
osuu kattoon 2000 joka tapauksessa (luku 1.2), joten niille riittää z4–z6
(RUS 1240 laattaa, ~47 Mt arvio) tai ei väriä ensimmäisessä aallossa.

### 2.7 Monen maan `varitasot`-taulu (erän 1 rajoite 7.2)

Erän 1 luettelossa `varitaso` on **yksi olio**, eli toinen ajo pyyhkii
ensimmäisen. Pallolla rajoite on pahempi, koska väri on laatan kangasta:
väärän maan laatta näyttäisi oikealta. Muutos on tehtävä ENNEN toista maata:

```json
"varitasot": {
  "FRA": { "versio": "2026-09-14a", "maa": "FRA", "aluevesi": 6.7,
           "feidaus": 0.35, "tasot": [ { "z": 4, "…": "…", "laatasto": "…" } ] },
  "GRC": { "…": "…" }
}
```

Koskee generaattoria (`tools/generoi-laattapyramidi.mjs`, `MERKKITASO`
erän 1 haarassa) ja kolmea if-ketjua js/laattapyramidi.js:ssä (:602, :640,
:666) sekä `varitasonTasot()`:ia. Kokoluokka **S**, erän 1b sisällä.

### 2.8 Erä 1b: valmis-kriteeri, savuke ja vastakoe

**Valmis:** Ranskassa pallolla maa ja aluevedet ovat murretuissa sävyissä,
naapurit ja avomeri feidattua paperia, kehä `--mark`-punainen,
`ui.pallolauta.lepokerros().mittarit()` näyttää SAMAN `scenessa`-luvun kuin
ilman väriä (± 1) ja `kaytetytTavut` enintään +5 % (väri ei lisää verkkoja
eikä tekstuureja). Kuvakaappaukset z5/z6/z7 — **katsottuna**.

**Savuke `savuke-pallon-varilaatat.mjs`** (mallit
tools/savukkeet/savuke-pallo-rantaviivat.mjs ja erän 1
`savuke-varilaatat.mjs`): avaa pallon, siirtää nappulan Pariisiin, ajaa
`saavu()`n, odottaa levon (`mittarit().jumissa === 0`) ja lukee neljä
pikseliä mediaanina 9 × 9 ruudusta. Luokittelu ja sen kaksi ansaa
periytyvät erän 1 luvusta 4.3 (sininen testataan ENSIN; jokainen piste
tarkistetaan `elementFromPoint`illa, että se on pallon kangas eikä kortti).
Pisteet: Keski-Ranska (murrettu maa) · Namur (feidattu) · Välimeri ~8 mpk
(savunsininen) · Välimeri ~40 mpk (feidattu paperi).

**Vastakoe 1 `--ilman-alfaa`:** sama laatasto ilman alfakanavaa. Belgian ja
avomeren pisteiden on luettava VÄRILLISIKSI ja savukkeen kaaduttava niissä
kahdessa väitteessä. Jos savuke on vihreä myös ilman alfaa, se mittaa
jotain muuta kuin leikkuria. **Vastakoe 2 `--eri-maa`:** pelaaja Belgiaan →
Ranskan laatastosta ei haeta yhtään laattaa (`mittarit().pyyntoja` ei kasva
`vari/`-poluilla). Se on maanvaihdon mitätöinnin ainoa konetarkistus.

---

## 3. ERÄT 2–8 PALLOLLE

### 3.0 STAATTINEN KARTTA (PÄÄTÖKSET 2, kohta 2) — läpileikkaava ehto

Omistaja: *"maan tiedot, lisää-valikko, nostot ja muut elementit
KIINNITETÄÄN KARTTAAN (karttakoordinaatit, skaalautuvat zoomatessa kuin
painettu kartta), maan reunan ulkopuolelle tai rajalle, ei ruutuun."*

Nykytila on päinvastainen kahdella tavalla (luku 1.3): kartuutsi ja
maataulu ovat RUUTUUN ankkuroituja karttaruudun lapsia, ja nostomerkit ovat
maantieteellisesti ankkuroituja mutta RUUTUVAKIOKOKOISIA.

**Toteutus pallolla, kolme palaa:**

1. **Ankkuri karttaan on jo olemassa:** `htmlElementsData` +
   `htmlLat/htmlLng` (merkit.js:261–264). Maapaneeli ja lisää-valikko
   tehdään siis uusina merkkidatumeina (`merkit.aseta('maapaneeli', […])`),
   ei karttaruudun lapsina. Paikka: maan laatikon reunan ULKOPUOLELLA —
   laske `maanLautalaatikko`sta piste `(x0 − marginaali, y1)` ja käännä
   asteiksi `pallonAsteet`illa. Merentakaiset osat ovat jo karsittu.
2. **Skaalautuminen on yksi CSS-muunnos:** `asetteleNosto` (nostot.js:
   302–318) kirjoittaa jo `scale(NOSTON_MITTA)`. Kiinteä luku vaihdetaan
   korkeudesta laskettuun: `mitta = NOSTON_MITTA × (uloinLeveys /
   nakyvaLeveys)`, rajattuna esim. `[0,75 … 3,0]`. Näkyvä leveys on
   `kamera.kameranTila().leveys`, uloin on maan laatikko × 1,15 — **samat
   kaksi lukua, jotka erä 2 laskee joka tapauksessa.** Raja on pakollinen:
   ilman kattoa nimiö kasvaisi lähikuvassa ruudun kokoiseksi, ja
   `sovitteleLaput` (js/pallolauta/sovittelu.js) sekä `laatikot()`
   (merkit.js:366–382) laskevat ruutupikseleitä.
3. **Luettavuus mitoitetaan ULOIMMALLE zoomille** (omistajan oma seuraus):
   maataulun leveys uloimmalla zoomilla ≥ 240 css-px 400 px:n ruudulla.

**Puhelimella pannataan paneelin luo.** Paneeli on maan reunan
ulkopuolella, eli uloimmalla zoomilla ruudun laidassa. Kaksi lisää:
(a) pannauksen rajaan on laskettava paneeli mukaan laatikkoon
(`yhdista`-funktio on jo js/maanaariviivat.js:189); (b) paneelin merkki saa
napautuksen `napautettavat()`-polusta (merkit.js:385–392), joka vaatii
datumille `napautus(d)` — sama kuin linssimerkeillä.

**Kirjattava ristiriita:** maataulu ja kartuutsi palautettiin ruudun
nurkkaan **omistajan omasta pyynnöstä 11.9.2026** (js/fokusmitat.js:321–326,
*"Ne olivat ennen vasemmassa alakulmassa. Ne saisi palauttaa näkyviin"*),
ja PÄÄTÖKSET 2 siirtää ne karttaan. Uusi päätös voittaa, mutta asia on
hyvä varmistaa ennen kuin kaluste liikkuu — kysymys 2 luvussa 5.

### 3.1 Erä 2 — Zoomirajat ja punainen viiva (**S**, ei M)

**Pallolla saapumisrajaus on JO TEHTY** (luku 1.2), joten suunnitelman M-erä
kutistuu kahteen asiaan.

- Tiedostot: `js/pallolauta/lauta.js` (:1303–1312 `zoomirajaSyrjaytys`,
  :2644–2661 `saapumisrajaus`/`saavu`), `js/pallolauta/kamera.js` (uusi
  `korkeusLaatikosta(bbox, kerroin)`), `js/pallovektorit.js:231`.
- Toteutus: `saapumisrajaus()` laskee ja muistaa laatikon jo nyt. Sama
  laatikko × 1,15 muunnetaan korkeudeksi (`korkeusLeveydesta`,
  kamera.js:264–272) ja asetetaan `zoomirajaSyrjaytys = { max }`. Yksi
  paikka, elää ResizeObserverin yli (:1294–1302) ja kumoutuu linssin ajaksi
  kuten satelliittilinssillä.
- Mitatut kattokorkeudet (laatikko × 1,15): puhelin GRC 0,441 · ITA 0,610 ·
  FRA 0,753; työpöytä GRC 0,187 · FRA 0,288. Kaikki selvästi
  `PALLO_KORKEUS_MAX 2,5`:n alla, eli syrjäytys on aito tiukennus.
  **RUS, USA, CHN ja BRA osuvat kattoon jo saapumisessa**, joten niille
  syrjäytystä ei aseteta — muuten kamera lukkiutuisi maailmankuvaan.
- **Lähintä zoomia EI muuteta.** `PALLOLAUDAN_LAHIN_LEVEYS 60` yks = 1,80°,
  ja pyramidin syvin taso on 480 px/aste (`PYRAMIDIN_SYVIN_PX_ASTE`,
  kamera.js:234) → 864 laattapikseliä 1170 laitepikselille = **1,35×
  venytys**. Singapore (12 × 6 yks) on jo nyt lähempänä kuin lähin porras;
  ruudun täyttö vaatisi 4× venytyksen. Suunnitelman `ZOOMI_LAHIN =
  min(88, rajaus × 0,8)` ei siirry pallolle: **pikkuvaltion raja on
  rasterin raja, ei koodin.**
- EI: ei kosketa `SAAPUMISRAJAUKSEN_MAX`iin (2000),
  `PALLOLAUDAN_SAAPUMISLEVEYS`iin (240) eikä matkakohteiden laajennukseen;
  punainen viiva vain pallolla.
- Valmis: uloszoomaus pysähtyy laatikkoon × 1,15 sormella, rullalla ja
  napilla; kehä punainen; RUS/USA/CHN eivät lukitu.
- Savuke `savuke-pallon-maanikkuna.mjs`: `kameranTila().leveys` saapumisen
  jälkeen ja uloszoomauksen pohjalla kolmelle maalle (GRC, FRA, RUS),
  molemmilla kuvasuhteilla. **Vastakoe:** kehittäjän maailmanäkymä
  (`kehittajaMaailmaPaalla`) ja satelliittilinssi → syrjäytystä EI ole,
  ja koe kaatuu jos raja silti pitää.

### 3.2 Erä 3 — Maan perustiedot ja lisää-valikko (**M**)

Pallolla perustiedot ja plus-nappi ovat jo olemassa (luku 1.3), joten työ on
(a) valikko plussan taakse, (b) kaluste karttaan kiinnitetyksi (luku 3.0).

- Tiedostot: `js/fokusmitat.js` (:553–577 `rakennaMaataulu`, :566 plus,
  :2040–2060 näkyvyys), `js/lehti.js:719` (`avaaMaalehti` saa `{ sivu }`),
  `js/pallolauta/merkit.js` (uusi osa `maapaneeli`),
  `js/pallolauta/lauta.js:2548`, `css/styles.css`.
- Otsikot luetaan `MAA_KATEGORIAT[iso]`-taulusta (js/lehti.js:283–292);
  Ranskalla 8. Värikoodi ja ikonit poimitaan olemassa olevista symboleista
  (`assets/kartat/symbolit/sym-*.webp`, sw.js:354–366), jotta valikko ja
  nostot puhuvat samaa kieltä.
- Otsikon painallus → `avaaMaalehti(ui, iso, { sivu })`; sivuindeksi tulee
  taulun järjestyksestä, parametri on uusi.
- EI: ei kaupunkilehteen, ei nostoihin, ei `MAATIEDOT`-tauluun
  (js/fokusmitat.js:58), ei Pulun tiedostoihin.
- Valmis: Ranskan 8 otsikkoa aukeavat oikeille sivuille; paneeli on kiinni
  kartassa maan reunan ulkopuolella, skaalautuu rajoissa ja on luettava
  uloimmalla zoomilla 400 px:n ruudulla.
- Savuke `savuke-pallon-maapaneeli.mjs`: jokainen otsikko napautetaan
  (`napautettavat()`) ja avautunut sivu todennetaan; paneelin ruutulaatikko
  mitataan kahdella zoomilla. **Vastakoe:** maa ilman `MAA_KATEGORIAT`-riviä
  → valikko ei aukea eikä peli kaadu; **ja** laatikon on oltava uloimmalla
  zoomilla PIENEMPI kuin lähimmällä — jos sama, skaalautumista ei ole.

### 3.3 Erä 4 — Kaupungin iso pop-up ja turisti-info (**L**)

Napautusketju on pallolla valmis (`napautaKaupunki` → `ui.avaaTutkinta`,
lauta.js:1797), ja kaupunkilehti, nähtävyyskartta ja pop-up-kerrokset ovat
lautariippumattomia. Erän työ on **js/lehti.js:n etusivun osien irrotus
omiksi kutsuttavikseen** — sama kuin tasokartalla.

- Tiedostot: `js/lehti.js` (etusivun kokoaja :472–545), `js/nahtavyydet.js`
  (`piirraKaupunkiKartta` :159, `kytkeKarttaZoom` :868,
  `avaaKarttaSuurennos` :1015), uusi `js/kaupunkinosto.js`,
  `js/packs/fokuskohteet-fra.js`, `js/pallolauta/lauta.js:1797`.
- Pallon oma lisä: pop-up ankkuroidaan merkin RUUTUPISTEESTÄ kuten
  fokuskohteen kortti (`avaaFokuskohde({ ankkuri })`, `asemoiFokuskohde`
  levossa, lauta.js:2446) — ei ruudun keskelle. Turisti-info on tavallinen
  karttanosto omalla symbolilla ja `kattoVapaa: true`
  (js/fokuskohteet.js:726–727), joten se ohittaa kaupunkiruuhkan katon
  sekä pallolla että poltossa.
- EI: ei poisteta kaupunkilehteä; vanha ovi jää rinnalle kunnes omistaja on
  nähnyt uuden. `KORTTIVALITSIN`-listaan (lauta.js:1145) lisätään uusi
  luokka — se on nielu, joka estää sulkevan napautuksen avaamasta uutta.
- Valmis: Pariisin napautus avaa pop-upin (hero + esittely + zoomattava
  kohdekartta) merkin kohdalle; turisti-info avaa matkustusoppaan; kamera
  ei karkaa pop-upin alta.
- Savuke `savuke-pallon-kaupunkipopup.mjs`: molemmat pop-upit auki ja kiinni,
  kohdekartan zoom toimii, ankkuri seuraa kameraa levossa. **Vastakoe:**
  Marseille (2 osastoa) → pop-up aukeaa eikä jätä tyhjää lohkoa; **ja**
  pallon pyöritys pop-up auki → ankkurin ruutupisteen on liikuttava.

### 3.4 Erä 5 — Kaupunkilehden sivut nostoiksi, Pariisi (**L**)

**Melkein mikään ei muutu, ja se on hyvä uutinen:** nostojen ladonta on
pallolla sama tynkä kuin poltossa ja tasokartalla (`maanKohdemerkit` →
`ladoMaanTynka`, js/pallolauta/nostot.js:465–470), joten sisältöjako on
datatyötä eikä lautatyötä. Jako on hyväksytty (PÄÄTÖKSET 1 kohta 3:
Menovinkit maan valikkoon, Musiikin 3 nostoa yhdeksi, Historian 7 nostoa
kolmeksi karttapisteeksi + yhdeksi nostoksi, maaosasto pois; teksti siirtyy
sanatarkasti).

- Tiedostot: `js/packs/fokusvirta-pariisi.js`, `js/packs/maakartat.js`
  (Pariisin uudet kohdekarttapisteet), `js/packs/kulttuuri-kategoriat.js`.
- Pallon kaksi lisää: (1) **nostotaso on poltettava uudestaan samassa
  PR:ssä JA pallon oma sarja tarkistettava** — portti on
  `pallonNostoOnPoltettu` (js/pallo.js) ja versioportti
  `lepokerroksenKerrokset` (js/pallolaatat.js:355–358): jos nostotason
  versio ei täsmää, **koko laattakerros sammuu** ja kartta putoaa
  `POHJAN_TASO_MAX`iin. Ankarampi kuin tasokartalla, jossa vain
  nostokerros olisi väärä. (2) Elävien katto on 40 ja kasaus tehdään
  `sovitteleLaput`illa ruutupikseleissä — jos luku 3.0 tekee merkeistä
  skaalautuvia, sovittelu on mitattava uudestaan lähimmällä zoomilla.
- EI: ei keksitä yhtään uutta faktaa (sisältöpistokoe, docs/roolitus.md);
  ei muuteta `LEHDEN_VAHIN_OSUUS`-porttia tässä erässä.
- Valmis: PÄÄTÖKSET 1:n taulukko toteutettu; pääkartan merkkimäärä
  Ranskassa ≤ 21, kohdekartalla ≤ 17; pallon sarja ja pyramidi samaa
  versiota (kerros ei sammu).
- Savuke: `savuke-pallo-nostolaput` + `savuke-nostopoltto` laajennettuna.
  **Vastakoe:** yksi kohdekarttapiste pois → karsinta palauttaa noston
  pääkartalle; **ja** väärä nostotason versio luettelossa →
  `mittarit().syy` on *"pallon sarja ja pyramidi eri versiota"* eikä kerros
  piirrä. Tämä toinen vastakoe on erän tärkein: se on ainoa kone, joka
  näkee riskin 4.2.

### 3.5 Erä 6 — Minikysymykset nostoihin (**M**)

**Ei mitään lautakohtaista:** nostokortti on sama komponentti molemmilla
laudoilla (`avaaFokuskohde` → js/fokusnosto.js) ja palkkio kulkee
`game.actionMinitehtava`n (js/game.js:1202) läpi. Suunnitelman luku 5.1
siirtyy sanasta sanaan; PÄÄTÖKSET 1 kiinnitti palkkion (nostokysymys 25 p,
lehtitehtävä 50 p).

- Tiedostot: `js/fokusnosto.js` (visa kortin loppuun), `js/fokustehtavat.js`
  (jaettu `piirraNimettyTehtava` :828–960), `js/game.js` (laskuri
  `nostotehtavatRatkaistu`), `js/packs/fokusvirta-pariisi.js`.
- EI: ei muuteta lehtitehtävien palkkiota eikä `actionMinitehtava`n
  rajapintaa; ei nosteta tallennuksen skeemaversiota (luku 4.4).
- Valmis: joka kolmannessa Pariisin nostossa on kysymys, oikea vastaus
  lisää 25 p ja kirjautuu tallennukseen.
- Savuke `savuke-nostovisa.mjs` (`--lauta pallo`): oikea ja väärä vastaus,
  luetaan `money` ja laskuri. **Vastakoe:** väärä vastaus ei lisää
  kumpaakaan, eikä sama kysymys anna palkkiota kahdesti.

### 3.6 Erä 7 — Aarre vihreänä pisteenä (**S**)

Vihreä piste on jo pallolla (`paivitaFokuspistePallolla`, lauta.js:2708;
kuvio js/fokuspiste.js, `fokuspisteenSiirto`), ja ehto on
`fokusvirtaKohtaamispiste` (js/fokusvirta.js:5440–5457, `fokusAarreAvattu`).
Muutos on yksi ehtolauseke: **≥ 2 ratkaistua NOSTON minitehtävää**, ja
laskurin on oltava kaupunkikohtainen (erän 6 `nostotehtavatRatkaistu`) —
lehtitehtävät eivät saa täyttää ehtoa vahingossa.

- Tiedostot: `js/fokusvirta.js`, `js/fokuspiste.js`, Pulun ohje
  **`polloVihje`-KUTSUNA** kertalipulla `matkakirja-karttaohje` (malli
  `matkakirja-livia-paljastus`, js/livia.js:530).
- EI: ei muuteta aarrekysymystä, laatan palkkiota eikä `js/pollo.js`:ää
  (Codexin tiedosto). Teksti on Fablen.
- Valmis: piste syttyy kahdesta nostotehtävästä; Pulun ohje kerran
  ensimmäisessä kaupungissa; vanha `fokusAarreAvattu` luetaan TAI-ehtona.
- Savuke `savuke-aarrepiste.mjs` (`--lauta pallo`): 0, 1 ja 2 tehtävää.
  **Vastakoe:** yhdellä tehtävällä piste EI syty; **ja** vanha tallennus,
  jossa `fokusAarreAvattu` on tosi mutta laskuri 0 → piste syttyy silti.

### 3.7 Erä 8 — Liiku-nappi ja neljä kulkutapaa (**L**)

**Liftaus = noppa uudella nimellä ja autokyytianimaatiolla** (PÄÄTÖKSET 1
kohta 4): sama aika kuin jalan, `steps`-noppa ennallaan, **vain animaatio
muuttuu** hyppivästä pelinapista autokyydiksi, joka kiihdyttää alussa ja
jarruttaa lopussa.

Nykytila: kulkutavat `land, sea, fly, stay` (js/game.js:956–969), napit
`renderTravelChoice(modes)` (js/ui.js:10813, :10868), ja **alanappirivi on
aina täsmälleen kolme paikkaa** (js/ui.js:10843–10845) — Liiku mahtuu
siihen monitoiminappina eikä ole uusi kaluste. Jalkamatkan tahti
`jalkamatkanAskel(askelia)` (js/siirtokoreografia.js:96;
`JALKAMATKAN_STEP_MS 860`, lyhin 640, katto 5200).

**Autokyytianimaatio pallolla — tarkka sauma.** Kuljettajan sopimus on
`nosta / aseta / hyppaa / laske` (js/pallolauta/siirto.js:382), ja
`hyppaa(a, b, kesto, { vaihe })` ottaa jo valinnaisen vaihekäyrän. **Mutta
`vaihe` on toteutettu VAIN koneelle** (`piirraKone`, siirto.js:302:
`hyppy.vaihe ? hyppy.vaihe(t) : hypynVaihe(t).e`); **nappula lukee aina
`hypynVaihe`n** (`piirraNappula`, :222). Erän ensimmäinen muutos on siis
kolme riviä: nappula kunnioittaa `vaihe`a, ja kun `vaihe` on annettu,
pystykaari (`nousu`, huippu, varjon kutistus :237–241) jää pois — auto ei
hyppää. Kiihdytys ja jarrutus on sama ease-in-out, jonka `hypynVaihe` jo
laskee (js/siirtokoreografia.js:374–378), mutta **koko nopan matkalle
kertaalleen** eikä askelta kohti: yksi ajo `steps` askeleen päähän, kesto
`jalkamatkanAskel(askelia) × askelia`, käyrä `e(t)` koko matkalle.

- Tiedostot: `js/game.js` (`travelModes`: `land` → nimi *liftaus*, uusi
  `bussi` 50 p; hinnat :12, js/rules.js:6), `js/rules.js` (kaarisuodatus
  `e.type`, `stepsFrom` :215, `rideTarget` js/game.js:2282), `js/ui.js`
  (Liiku-nappi, `animatePawnSisalla`), `js/pallolauta/siirto.js` (:222,
  :302, :382), `js/pallolauta/kamera.js` (`siirtoZoomiKerroin` :495–500),
  `js/siirtokoreografia.js` (autokyydin vaihekäyrä).
- **Zoomi kulkutavan mukaan:** `siirtoZoomiKerroin(lahennys)` rajaa
  siirtonäkymän jo nyt eikä koskaan mene ULOS pelaajan lähikuvasta, katto
  `PALLOLAUDAN_SIIRTOLEVEYS 120` yks. Kulkutapakohtainen tavoite annetaan
  kutsussa: liftaus/bussi = kaaren päät + 25 %, laiva + 50 %, lento =
  molemmat maat (`maanLautalaatikko` kahdelle, `yhdista`). Lento ohittaa
  siirtonäkymän jo nyt ja ajaa oman rajauksensa (siirto.js:26–32).
- **Uloszoomauksen esto ja matkavalinta ovat ristiriidassa**, kuten
  tasokartalla: kulkutapa on se hetki, jolloin kameran on päästävä maan
  laatikon ulkopuolelle. Ratkaisu on yksi paikka: `zoomirajaSyrjaytys =
  null` matkavalinnan ja siirron ajaksi, takaisin saapumisen jälkeen — se on
  syrjäytyksen alkuperäinen tarkoitus (lauta.js:1294–1302).
- EI: ei muuteta nopan lukuja eikä `steps`-laskentaa (liftaus ON noppa); ei
  kosketa `stay`-tapaan; ei poisteta `land`-tunnusta datasta (vanhat
  tallennukset) vaan vain sen NIMI ja animaatio vaihtuvat.
- Valmis: neljä tapaa Liiku-napissa, bussi veloittaa 50 p, liftaus kuluttaa
  saman ajan kuin ennen jalan, nappula liikkuu autokyytinä
  (kiihdytys–jarrutus, ei hyppyä), kartta rajautuu tavan mukaan, vanhat
  tallennukset latautuvat.
- Savuke `savuke-liiku.mjs` (`--lauta pallo`): jokainen tapa kerran, `money`
  ja `kameranTila().leveys` ennen ja jälkeen, nappulan ruutupisteen
  nopeusprofiili. **Vastakoe:** ilman rahaa bussi ja laiva eivät ole
  valittavissa; **ja** liftauksen profiilin on oltava EI-tasainen — jos
  nopeus on vakio, kiihdytystä ja jarrutusta ei ole ja koe kaatuu. Kolmas:
  nappulan pystykorkeus liftauksessa pysyy nollassa (ei hyppyä).

---

## 4. RISKIT JA RAJAPINNAT

**4.1 Horatio–Livia-työ (Codex).** `js/pollo.js`, `js/livia-*.js` ja Pulun
CSS ovat tekstisession omistuksessa; fokusvirran saapumisketju on Fablen
(docs/roolitus.md: *"Ei hiljaisia paikkauksia toisen omistamiin
tiedostoihin"*). **Erät 4, 7 ja 8 koskevat samaan ketjuun.** Säännöt: Pulun
ohjekuplat `polloVihje`- ja `polloPuheenvuoro`-KUTSUINA; saapumisketjun
muutokset Fablelle eikä erässä; rajapinta kuitataan tilannekortilla ennen
toteutusta.

**4.2 Pallon sarja ja pyramidi: yksi versio, kaksi laatastoa.** Pallon OMA
riski, jota tasokartalla ei ole. `lepokerroksenKerrokset`
(js/pallolaatat.js:351–372) **sammuttaa koko laattakerroksen**, jos pallon
sarjan (laatat.json) ja pyramidin (pyramidi.json) versiot eroavat tai jos
viiva-, nosto- tai rantatason versio ei täsmää — silloin kartta on
Mercator-sarjaa tasoon `POHJAN_TASO_MAX` asti eli näkyvästi sumea (omistajan
havainto v1650). **Jokainen laattoja polttava erä (1b, 5) on ajettava niin,
että molemmat luettelot päivittyvät samassa julkaisussa**, ja savukkeen on
luettava `mittarit().syy`. Väritaso tarvitsee oman portin
(`kerrokset.vari`), koska se on maakohtainen eikä maailmanlaajuinen.

**4.3 Punainen kehä kahdessa paikassa.** Erä 1 vaihtoi tasokartan kehän
(js/maatummennus.js + css/styles.css); pallon kehä on
js/pallovektorit.js:231. Ne ovat eri laudoilla eikä pelaaja näe molempia,
mutta **väriarvo on kirjattava yhteen paikkaan** tai sama virhe toistuu
seuraavassa muutoksessa. Suositus: sama arvo luetaan molemmissa yhdestä
lähteestä; kahta kovakoodattua heksalukua ei jätetä.

**4.4 Vanhat tallennukset.** Skeema `version: 2` (js/game.js:2970),
`Game.fromJSON` hyväksyy 1 ja 2 ja palauttaa muista `null` (:3035); uudet
kentät oletetaan `?? []`-kuviolla (:3140–3160). **Erä 6 lisää kentän, erä 7
muuttaa aarrepisteen lukuehtoa ja erä 8 kulkutapojen nimet** — kaikki
`?? []`-kuviolla, EI versionostolla, tai jokainen vanha tallennus hylätään.
Erän 7 ehto on **TAI**: vanha `fokusAarreAvattu` TAI uusi laskuri ≥ 2,
muuten pelaaja menettää jo avatun aarrepisteen. Erässä 8 `land`-tunnus
säilyy datassa, joten kesken reittiä oleva tallennus (`pos.type === 'edge'`,
js/game.js:959–961) latautuu.

**4.5 Muut.** *iOS webapp:* suositus (A) poistaa `clipPath`in pallolta, mutta
WebGL-kontekstin menetys on yhä olemassa (lauta.js:1315–1343: yksi
uudelleenrakennus, sitten turvatila), ja värilaattojen lisähaku kasvattaa
muistipiikkiä — `LAATTAKATTO_TAVUT` (96 Mt) on kova raja ja mitataan
pilotissa; **laitetodennus iPadilla on yhä avoin** (erän 1 luku 7.6).
*Offline:* `sw.js` esilataa vain repon tiedostot, laatat tulevat ämpäristä
(js/media.js:43) — offline-pelissä kohdemaa on seepiaa kunnes värilaatat on
kerran ladattu, eikä yhden tiedoston Pages-versio lataa niitä lainkaan
(malli puuttuvalle aineistolle js/maanaariviivat.js:353–356). *Merentakaiset
osat:* `maanLautalaatikko` karsii ne (`SAARIVARA 0.2`), joten niissä ei ole
värilaattoja eikä feidausta — jos pelissä on kaupunki merentakaisella
alueella, se näkyy seepiana; tarkistettava ennen monistusta. *Sovittelu:*
jos luvun 3.0 skaalautuminen tehdään, `sovitteleLaput` ja `laatikot()`
(merkit.js:366–382) laskevat ruutupikseleitä muuttuvasta koosta — ladonta
on mitattava uudestaan molemmilla äärizoomeilla.

---

## 5. OMISTAJAN PÄÄTETTÄVÄKSI (neljä kysymystä)

1. **Uloszoomauksen kerroin 1,15 — myös isoille maille?** Mitattuna RUS,
   USA, CHN ja BRA osuvat saapumisrajauksen kattoon (2000 yks) jo
   saapuessa, eli niiden "laatikko × 1,15" on koko maailmankuva.
   *Suositus: syrjäytystä ei aseteta maille, joiden tarve ylittää katon —
   niissä kamera pysyy vapaana; muut maat saavat 1,15:n.* Ilman poikkeusta
   Venäjässä kamera lukkiutuisi maailmankuvaan eikä pelaaja näkisi
   kaupunkia.
2. **Siirretäänkö maataulu ja kartuutsi ruudun nurkasta karttaan?** Ne
   palautettiin nurkkaan omistajan omasta pyynnöstä 11.9.2026, ja
   PÄÄTÖKSET 2 siirtää ne karttaan kiinnitetyiksi. *Suositus: siirretään,
   mutta pilottina yhdellä maalla ja niin, että nurkkatila on yhden vakion
   takana* — jos karttaan kiinnitetty paneeli on puhelimella hankala (se on
   uloimmalla zoomilla ruudun laidassa), paluu on yksi rivi eikä uusi erä.
3. **Murretun paletin voimakkuus: veden peittävyys ja feidauksen määrä.**
   Luvut ovat rakennusaikaisia (vaihto = uusi ajo, ei koodimuutos).
   *Suositus: vesi 0,70–0,75 (erän 1 täysväri käytti 0,9) ja muiden maiden
   feidaus 0,35 paperinsävyllä; molemmat mitataan pilottikuvasta ja
   näytetään omistajalle kolmena vaihtoehtona samasta näkymästä ennen kuin
   Euroopan laatasto ajetaan.*
4. **Mitkä maat saavat värit ensimmäisessä aallossa?** Euroopan pelattavat
   maat ovat 1–5 Mt kukin (yht. 50–100 Mt arvio), RUS ~177 Mt ja CHN ~44 Mt
   RGBA:na. *Suositus: ensimmäiseen aaltoon Ranska (pilotti) ja sen jälkeen
   ne Euroopan maat, joissa on pelin kaupunkeja; RUS, USA, CAN, CHN, BRA ja
   AUS jätetään toistaiseksi ilman väriä, koska niiden saapumisnäkymä osuu
   kattoon eikä z7 ole niissä katsottavissa.*

---

*Kirjoitti Opus-työsessio 13.9.2026 haarassa
`claude/karttauudistus-suunnitelma-pallo` (pohja origin/main). Mittaukset:
`assets/data/maapolygonit.json` (134 maata), `js/pallolauta/kamera.js`:n omat
funktiot, paletin kroma- ja luminanssilaskenta kolmesta asteikosta. Erän 1
mitatut luvut lähteestä `viesti-fable-karttauudistus-era1-20260913.md`.*
