# Laattapyramidi — mittaussuunnitelma ja siirtymä

*(Linjaus: Raamattu › "YKSI MAAILMANBITTIKARTTA - MAALEHDISTA
LUOVUTAAN" (omistaja 30.8.2026), "LAATTAPYRAMIDI JA KARTAN PATINA"
(29.8.2026) ja "BITTIKARTTA VAIHEET 2-3, MITATUT RAJAT". Tämä
dokumentti kertoo vain MITEN — ristiriidassa Raamattu voittaa.
Työkalu: tools/generoi-laattapyramidi.mjs · moottori:
tools/fokuskartta/maailmapiirto.js · peli: js/laattapyramidi.js.)*

Omistajan sanatarkka vaatimus: *"koko maailma on kokoajan yksi iso
bittikartta josta vain ladataan kulloinkin tarvittava palanen,
riippumatta siita onko maailma paalla vai ei? Maailma nappi pitaisi
vain ja ainoastaan rajoittaa miten pitkalle pelaaja voi panoroida
kartalla."*

**Kaikki tämän dokumentin luvut on MITATTU 30.8.2026** tässä kontissa
(Chromium /opt/pw-browsers/chromium, yksi säie), ellei niitä ole
erikseen merkitty arvioksi. Mittausajot on lueteltu luvussa 8.

---

## 1. Lukitut mitat

Nämä ovat **omistajan päätös 30.8.2026**, eivät tämän työn
johtopäätös. Työkalu kantaa ne vakioina, ja tämä ajo todensi ne
laskennallisesti.

| Asia | Arvo | Todennus |
| --- | --- | --- |
| Projektio | Millerin lieriö, leveys 12000 = 360°, lon0 −175, pohjoinen 76 | muuttumaton |
| Arkki | 76 °N … 76 °S = laudan y 0 … 6422,99 | 2 · \|millerY(76)\| · 12000/2π = 6422,99 ✓ |
| Tiheys syvimmällä | 7,2 px / lautayksikkö | = 240 px/aste = 4 px/kaariminuutti ✓ |
| Syvin taso | 86 400 × 46 246 px | 12000 · 7,2 = 86 400; 6422,99 · 7,2 = 46 246 ✓ |
| Tasoja | 8, kerroin 2 (675 → 86 400 px) | ✓ |
| Laatta | 512 × 512 | ✓ |
| Laattoja syvimmällä | 169 × 91 = 15 379 | ✓ |
| Laattoja yhteensä | 20 634 | ✓ (omistajan arvio ~20 500) |
| Korkeusdata | 3 kaariminuuttia kaikilla tasoilla | = 0,05°, ruudukon oma tarkkuus ✓ |

Korkeusdatan perustelu on kirjattu: ETOPO1:n natiivi 1′ on tässä
mittakaavassa pelkkää kohinaa varjostuksessa (varjo lasketaan
naapuriruutujen EROSTA), ja keskiarvoistava harvennus on
alipäästösuodatin — pehmeämpi pinta, ei köyhempi. Syvimmällä tasolla
yksi korkeussolu on 12 × 12 kuvapikseliä. Tarkempi ajo on myöhemmin
pelkkä `--kaariminuutit`-arvon muutos **samalle laattaruudukolle**.

**Kameran zoomiportaikko pysyy erillään.** Se on 1,5 × 6 porrasta
(js/kartta.js `zoomiTasot`; maailmanlaudalla portaita on käytännössä
14, näkyvä leveys 12 000 → 88 yksikköä). Laattatasoja ei sovitella
siihen: asiakas valitsee **lähimmän** laattatason logaritmisesti,
jolloin skaalaus on korkeintaan √2 ≈ 1,41× kumpaankin suuntaan.

## 2. Tasotaulu ja mitatut koot

| z | leveys × korkeus px | px/yks | sar × riv | laattoja | Mpx | tavua/px | koko taso |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | 675 × 361 | 0,056 | 2 × 1 | 2 | 0,2 | **0,126** | 0,03 Mt |
| 1 | 1 350 × 723 | 0,113 | 3 × 2 | 6 | 1,0 | **0,111** | 0,11 Mt |
| 2 | 2 700 × 1 445 | 0,225 | 6 × 3 | 18 | 3,9 | **0,088** | 0,34 Mt |
| 3 | 5 400 × 2 890 | 0,450 | 11 × 6 | 66 | 15,6 | **0,067** | 1,04 Mt |
| 4 | 10 800 × 5 781 | 0,900 | 22 × 12 | 264 | 62,4 | **0,052** | 3,24 Mt |
| 5 | 21 600 × 11 561 | 1,800 | 43 × 23 | 989 | 249,7 | **0,036** | 9,10 Mt |
| 6 | 43 200 × 23 123 | 3,600 | 85 × 46 | 3 910 | 998,9 | 0,027 … 0,044 | 27 … 44 Mt |
| 7 | 86 400 × 46 246 | 7,200 | 169 × 91 | 15 379 | 3 995,7 | 0,020 … 0,027 | 81 … 108 Mt |
| | | | | **20 634** | **5 327** | | **122 … 166 Mt** |

**Lihavoidut tavua/px-luvut on mitattu koko maailmasta.** z6 ja z7 on
mitattu Kreikan ja lähinaapureiden alueelta (0,044 ja 0,027) — se on
maapainotteinen alue eli **yläraja**; alempi luku on mitatun sarjan
oma trendi (suhde 0,75 tasoa kohti), joka on realistisempi koko
maailmalle, jossa kaksi kolmasosaa on merta.

**Tavua pikseliä kohti laskee tason mukana, ja se on rakenteellista.**
Syvemmällä tasolla sama kuvapikselimäärä kattaa pienemmän maa-alan,
joten sisältö on loivempaa ja webp pakkaa sen paremmin. Ainoa mikä ei
harvene on paperin rae; se on pakkauskustannuksen pohja.

### Tärkein tulos: pyramidi on paljon pienempi kuin arvioitiin

**122–166 Mt, ei 690 Mt.** Ero omistajan arvioon on nelin-viisinkertainen,
ja se on mitattu eikä arvattu: koko maailma tasoilta z0–z5 (1 345
laattaa) on **13,86 Mt**, ja syvät tasot skaalautuvat siitä mitatulla
pakkaussuhteella. R2:n ilmaisraja on 10 Gt, joten pyramidi mahtuu
sinne moneen kertaan — myös useana versiona rinnakkain.

## 3. Generointinopeus ja täysajon kesto

| tapa | Mpx/s | laattaa/s |
| --- | --- | --- |
| laatta kerrallaan (`--lohko 1`) | 0,44 | 1,74 |
| **lohko 4 × 4 (`--lohko 4`, oletus)** | **1,31** | **5,28** |
| yksi iso arkki (vertailu) | 1,39 | — |

Lohkopiirto on **3,0 kertaa nopeampi** kuin laatta kerrallaan ja yltää
94 %:iin yhden ison arkin nopeudesta. Ero ei ole pikselityössä vaan
kiinteässä kustannuksessa: jokainen erillinen laatta varaa canvasin,
ajaa kaksi koko kuvan `getImageData`/`putImageData`-kierrosta (rae ja
reunahäivytys) ja pakkaa oman base64-siirtonsa. Lohko jakaa sen
kuudellatoista.

**Koko maailman täysajo: 5 327 Mpx / 1,31 Mpx/s = 1,13 tuntia yhdellä
säikeellä.** Neljällä agentilla 17 min, kahdeksalla 8,5 min.

Aineiston keruu on **1,6 s** välimuistista ja noin **50 s** kylmänä
(ETOPO-maailmanruudukon haku ERDDAPista 45 s, Natural Earth 15 Mt).
Se on kertakustannus ajoa kohti, ei laattaa kohti.

## 4. Harva pyramidi — mitattu, ja suositus on olla tekemättä sitä

Omistajan oletus oli, että umpimeren laattojen karsinta puolittaa
pyramidin (20 500 → ~10 000 laattaa). **Mitattuna se ei tee sitä**, ja
tavuissa se tekee vielä vähemmän.

Karsinta on turvallinen vain, jos laatan tilalle maalattu **tasainen
sävy** on silmälle sama asia. Ehtoja on siksi neljä: ei maata eikä
järveä, ei asteverkon viivaa, ei valtameren nimeä eikä kompassia, ja
syvyyden tuottama värivaihtelu enintään `--harva-raja` kanavaa.

Karsinta laattamäärästä, koko maailma:

| `--harva-raja` | z6 | z7 |
| --- | --- | --- |
| 2 (varovainen) | 3,4 % | 10,4 % |
| 4 | 10,3 % | 22,0 % |
| 8 | 19,7 % | 33,1 % |
| 16 (sävy heittää jo 6 %) | 27,2 % | 39,8 % |

Mikä estää karsinnan z7:llä (raja 8): maata 4 559, asteverkko 3 243,
syvyysvaihtelu 1 559, järvi 779, nimi 87, kompassi 64.

**Tavusäästö on noin puolet laattasäästöstä.** Mitattu z5:ltä oikeista
tiedostokoista: 6,2 % laatoista = **3,4 % tavuista** (raja 8), ja
2,4 % laatoista = 1,3 % tavuista (raja 4). Syy on ilmeinen jälkikäteen:
karsittavat laatat ovat juuri ne, jotka pakkautuvat parhaiten.

Siis z7:llä raja 8 säästäisi noin 17 % tavuista eli **~18 Mt** — ja
koko pyramidi on 122–166 Mt.

**Suositus: harvaa pyramidia ei kannata ottaa käyttöön.** Kolme syytä:

1. Säästö on ~12 % kokonaisuudesta, ja kokonaisuus mahtuu R2:een
   moninkertaisesti.
2. **Karsitulta laatalta katoaa paperin rae.** Syvimmällä tasolla
   rakeen mittakaava on S = 13,5, eli rakeen solu on parikymmentä
   pikseliä — tasainen laatta rakeisten naapureiden vieressä EROTTUU.
   Peli ei voi syntetisoida rakeen tilalle mitään, koska
   suodattimet on kartan kerroksilla kielletty (iOS-sääntö,
   tests/rules.test.mjs).
3. Se tuo pysyvän monimutkaisuuden (laatasto-bittikartta, merisävy,
   neljä karsintaehtoa) asiaan, joka ei ole ongelma.

Koneisto on silti **rakennettu ja mitattavissa** (`--harva`,
`--harvamittaus`), jotta päätös voidaan tehdä luvuilla eikä
mielipiteellä, ja jotta se on olemassa jos tarkkuutta joskus
nostetaan. Oletuksena se on pois päältä.

**Jos karsinta halutaan silti**, halvin lisäsäästö on antaa pelin
piirtää asteverkko itse: se on 21 % z7:n laatoista, ja verkko on
20 asteen välein vedettyjä suoria — pelille triviaali.

## 5. Säilytys, välimuisti ja nimeäminen

```
julisteet/pyramidi/<versio>/z<taso>/<sarake>/<rivi>.webp
```

- **Ämpäri (R2)**, `julisteet/`-juuren alla, koska
  `vie-julisteet.yml` vie ämpäriin vain sen kansion (mitattu
  24.8.2026: juuritason `fokus/` antoi 404).
- **Versio on POLUSSA, ei kyselyparametrissa.** Ero nykyisiin lehtiin
  (`?v=6`, js/media.js `FOKUS_VUOSIKERTA`) on tarkoituksellinen:
  parametrin nosto pakottaa lataamaan *kaikki* lehdet uudestaan,
  versiopolku vain ne laatat, joita oikeasti katsotaan. Uusi ajo saa
  uuden versio-osan, yksikään vanha osoite ei muutu, ja laatat
  kelpaavat siksi ikuiseen välimuistiin
  (`Cache-Control: public, max-age=31536000, immutable`).
- **Sekoittunut erä on rakenteellisesti mahdoton**: selain ei voi saada
  puolta karttaa vanhasta ajosta ja puolta uudesta.
- **Palvelutyöntekijä ei esilataa laattoja.** Ne kulkevat tavallista
  ämpärikoria pitkin (sw.js), kuten lehdetkin.
- **Luettelo `pyramidi.json`** kertoo arkin paikan laudalla,
  laattakoon ja tasojen mitat; peli ei arvaa niistä mitään. Luettelo
  **täydentyy** erä kerrallaan eikä korvaudu, jotta parven osa-ajot
  eivät pyyhi toistensa tasoja. Mukana on tasokohtainen **laatasto**
  (bittikartta siitä, mitkä laatat ovat olemassa) — ilman sitä harva
  pyramidi tuottaisi tuhansia 404-pyyntöjä.

### Kierto ei ole laattakoon monikerta — ja se on ansa

Tason leveys on 675 · 2^z pikseliä, eikä **yksikään** niistä ole
jaollinen 512:lla. Viimeinen sarake on siis vajaa. Kierto EI siksi ole
"sarake modulo sarakkeiden määrä" tasavälisellä ruudukolla: se veisi
laatan 128 pikseliä väärään kohtaan päivämääränrajan takana. Kierros on
`taso.leveys` PIKSELIÄ, ja laatan paikka lasketaan kierroksittain —
sarake *c* kierroksella *k* on pikselissä *k · leveys + c · laatta*
(js/laattapyramidi.js).

## 6. Mitä pilotista mitataan

| Mitta | Mistä | Tila |
| --- | --- | --- |
| Levytila per taso, tavua/px | työkalun MITAT-tuloste | **mitattu**, luku 2 |
| Generointiaika, Mpx/s | työkalun piirtoaika-rivi | **mitattu**, luku 3 |
| Harvan säästö | `--harvamittaus` (laatat + tavut) | **mitattu**, luku 4 |
| Sauman jatkuvuus | `--saumatesti`, raakojen pikselien vertailu | **mitattu**, luku 7 |
| Laattojen määrä näkymässä | `__pyramidinMittarit().nakymassa` | **mitattu**, alla |
| Latausaika per laatta | `__pyramidinMittarit().keskiMs / hitainMs` | **mitattu**, alla |
| Muistinkäyttö | `__pyramidinMittarit().muistiMt` | **mitattu**, alla |
| Kehysaika panoroinnissa | savukkeen rAF-mittaus | **mitattu**, alla (emulaattori) |

Peliin on rakennettu kahva `window.__pyramidinMittarit()`, ja
savuke `tools/savukkeet/savuke-laattapyramidi.mjs` ajaa pelin
pilottilaatoilla ja lukee sen. Ajo 30.8.2026, iPhone-profiili
390 × 844, `deviceScaleFactor` 3 (= 1170 × 2532 laitepikseliä),
kolme zoomiporrasta sisään Ateenaan:

```
taso näkymässä           z7 (syvin)
laattoja näkymässä       25
purettu muisti           26,2 Mt   (25 × 512² × 4 tavua)
laattoja ladattu         167 · epäonnistui 0
latausaika               keski 787 ms · hitain 1916 ms
päivityksiä              23 · viimeisin päivitys 0,1 ms
kehysaika panoroinnissa  p50 16,7 ms · p95 37,9 ms (139 kehystä)
```

Luvuista kolme kannattaa lukea tarkkaan:

- **25 laattaa ja 26 Mt** puhelimen ruudulla syvimmällä tasolla. Se on
  samaa suuruusluokkaa kuin yksi nykyinen yleislehti puhelimessa
  pienennettynä (18 Mt) — mutta nyt kartalla ei ole sen lisäksi neljää
  tai viittä maalehteä. **Muisti siis laskee, ei nouse.**
- **Näkyvän palan päivitys maksaa 0,1 ms.** Se on se työ, jonka
  panorointi teettää pääsäikeessä: laattojen valinta ja DOM-vertailu.
  Vanha lehtijärjestelmä mittasi samassa kohdassa 140–677 ms
  (js/fokuskartta.js, "KAKSI POHJANVAIHTOA YHDESSÄ KEHYKSESSÄ").
- **Kehysaika p50 16,7 ms** eli täydet 60 kehystä sekunnissa
  panoroinnissa. **TÄMÄ ON EMULAATTORILUKU.** Raamattu ("BITTIKARTTA
  VAIHEET 2-3, MITATUT RAJAT") vaatii, että kehysaika mitataan
  OIKEALLA iOS-LAITTEELLA, koska emulaattorin perustaso oli
  harhaanjohtava. Luku on suuntaa antava, ei päätöksen peruste.

`epäonnistui 0` on oma tuloksensa: laatasto-bittikartta toimii, eikä
peli pyydä yhtäkään puuttuvaa laattaa.

Latausaika (787 ms keskimäärin) on mitattu paikallisesta
tiedostoreitityksestä eikä kerro verkosta mitään; se on mukana vain
osoittamassa, että mittari toimii.

## 7. Sauman todistus

Laattapyramidin pahin mahdollinen vika on sauma: jos paperin rae,
kuitujuovat tai mittakaava laskettaisiin laatan omasta nurkasta, joka
laatta saisi saman rakeen ja ruudukko näkyisi ruudukkona. Moottori
lukee ne siksi ARKIN koordinaateista (`koko` ja `siirto`,
tools/fokuskartta/maailmapiirto.js).

`--saumatesti` piirtää saman alueen kerran yhtenä 1024 × 1024 kuvana ja
kerran neljänä 512 × 512 laattana ja vertaa **raakoja pikseleitä**
(tiedostovertailu ei kelpaa: webp-enkooderi saa kuvan eri kokoisena
eikä tuota tavulleen samaa tulosta samoistakaan pikseleistä).

| ikkuna | pahin kanavaero | eroavia kanavia |
| --- | --- | --- |
| pelkkää pikselisilmukkaa (paperi, meri, rae, hypsometria) | **0** | 0 / 4 194 304 |
| vektoreita (rannikko, järvet, asteverkko) | 21…32 | 0,04…0,10 % |

**Tulos on täsmälleen se, mitä pitikin.** Ero on **nolla** kaikkialla,
missä kuva on pikselisilmukan tulosta — eli kohinan, mittakaavan ja
kehyksen laskenta on **todistetusti jatkuvaa laattojen yli**. Ero on
nollasta poikkeava vain siellä, missä ikkunassa on vektoreita, ja se
on hiusviivan reunapehmennyksen alle 1/8 pikselin heitto.

Syy on selainmoottorin viivanpiirrossa eikä kartan kaavoissa. Se
todennettiin: vektorien kuvakoordinaatit siirrettiin laskettavaksi
ARKIN origosta laatan bboxin sijaan (`arkki`-asetus + kokonaisluku
`ctx.translate`), mikä poisti pyöristyksen kaavoista — ero pieneni
vain 8 % eikä kadonnut, mikä sulkee kaavat pois. Muutos pidettiin,
koska se on käsitteellisesti oikein: vektorit elävät arkin
koordinaatistossa.

Käytännössä: vierekkäiset laatat ovat joko samasta lohkosta (täysin
jatkuvia) tai kahdesta lohkosta, jolloin niiden yhteisellä reunalla
kulkeva rannikkoviiva voi olla enintään 32/255 eri sävyinen yhden
pikselin matkalla. Silmälle näkymätön, eikä muodosta ruudukkoa, koska
paperi ja rae — se mitä katse lukee pintana — ovat bitilleen jatkuvia.

**Moottorin muutos on lisäksi todistettu oletuspolulla no-opiksi:**
`tools/tee-yleislehti.mjs --leveys 1600` tuottaa ennen ja jälkeen
muutoksen saman tiedoston (md5 `d5820ebf8548ebbe75e4f8242617e467`).
Se on koko muutoksen turvaverkko: yleislehti ja maalehdet ajavat samaa
moottoria, eikä pyramidi saanut muuttaa niistä yhtäkään pikseliä.

## 8. Korkeusasteikko yltää nyt huipulle

Asteikko päättyi 2900 metriin ja `lerpVari` clamppaa ylimpään
portaaseen — **kaikki Tiibetistä Andeille oli täsmälleen samaa
sävyä**. Maailmanlaajuisessa kartassa se on iso menetys.

Lisätyt portaat (tools/fokuskartta/piirto.js `ASTEIKKO`):

```
{ m: 4200, v: [128,  76,  58] },
{ m: 5500, v: [112,  72,  62] },
{ m: 7000, v: [140, 122, 116] },
{ m: 8850, v: [214, 208, 200] },
```

**Portaat 2900 ja alle eivät muutu**, joten nykyiset maalehdet ja
yleislehti renderöityvät pikselintarkasti samoin — uudet portaat ovat
puhdas lisäys. Ylin pää on ikuinen lumi aikakauden konvention mukaan.

Todennettu kuvaparilla (z5, Tiibetin ylänkö): ennen tasainen ruskea
läiskä, jälkeen ylänkö erottuu ja Himalajan rintama piirtyy. z7:llä
Everestin ympäristössä korkeimmat huiput saavat harmaan ja lumen
vaalean. Kuvat ovat kontin scratchpadissa (`himalaja-ennen/`,
`himalaja-jalkeen/`, `everest/`).

## 9. Pilotti — mitä ajettiin

```
node tools/generoi-laattapyramidi.mjs <kohde> --data <ne-kansio> --tasot 0-5
node tools/generoi-laattapyramidi.mjs <kohde> --data <ne-kansio> \
     --tasot 6-7 --alue 17,33,30,43
```

- **z0–z5 koko maailmasta**: 1 345 laattaa, 13,86 Mt, 332,9 Mpx,
  254,5 s. Pelin kaukonäkymä toimii kaikkialla heti.
- **z6–z7 Kreikasta ja lähinaapureista** (lon 17…30, lat 33…43):
  72 laattaa, 0,58 Mt, 44,6 s. Syvä zoomi siellä, missä patinan
  tyyliparametrit on ajettu.
- Pilotti levyllä yhteensä **18 Mt / 1 412 laattaa**, kontin
  scratchpadissa (`scratchpad/pilotti/`). **Laatat eivät ole
  repossa** — samoin kuin lehdet eivät ole.

**Alueajossa lohko hukkaa työtä reunoilla**: Kreikan ajossa 65 % (4 × 4
lohkosta tarvittiin vain osa). Koko maailman ajossa hukka on 0,0 %.
Parven osa-alueet kannattaa siksi rajata **lohkorajoille**.

Pelissä pilotti on **kehityslipun takana**: `?pyramidi=1` (muistetaan
laitteelle, sama kaava kuin karttamittarilla). **Lippu pois =
oletuspolku täsmälleen ennallaan**: js/laattapyramidi.js palaa heti
eikä hae verkosta mitään, kerros jää tyhjäksi, eikä yksikään lehti
muutu. Lippu päällä sammuttaa maalehdet ja yleislehden **kolmesta**
paikasta ja piirtää tilalle laatat:

| portti | mitä se sammuttaa |
| --- | --- |
| `atlasPaalla` | atlasryhmä, naapurilehdet, kaukozoomin yleislehti |
| `nykyinenMaa` | nykyisen maan oma lehti |
| `esilammitaFokuspohja` | saapumisen esilataus |

Kolmas löytyi vasta savukkeesta: esilämmitys on kartan ainoa lehtihaku,
joka ei kulje kahden ensimmäisen portin läpi, ja ilman sitä ehtoa lippu
päällä haettiin yhä megatavun webp, jota mikään ei piirrä. Savukkeen
väite P2b vartioi tätä.

## 10. Siirtymä vaiheittain

**Vaihe 1 — pilotti (tämä erä).** Työkalu, moottorin laattatuki, pelin
lataaja lipun takana, mittaukset. Vanhaa lehtijärjestelmää EI kosketa.

**Vaihe 2 — täysgenerointi agenttiparvella.** Laatat ovat toisistaan
riippumattomia ja luettelo täydentyy erä kerrallaan, joten työ
jakautuu luonnostaan. z7 on 75 % kaikesta työstä.

| agentti | erä | Mpx | aika @1,31 Mpx/s |
| --- | --- | --- | --- |
| 1 | z0–z6 kokonaan | 1 331 | 17 min |
| 2–5 | z7 neljänä pituuskaistana (43 saraketta / agentti) | 999 kukin | 13 min kukin |

**Kokonaisaika noin 20 minuuttia viidellä agentilla**; yksi agentti
tekisi saman 1,13 tunnissa. Kaistajako pituusasteina on turvallisin:
laatta ei koskaan riipu naapurilaatasta, koska kaikki lasketaan arkin
koordinaateista. Rajat lohkorajoille (sarake jaollinen neljällä).

Parvi on pieni juuri siksi, että työ osoittautui neljä kertaa
kevyemmäksi kuin arvioitiin — kymmenen agenttia olisi tässä
kokoluokassa pelkkää käynnistyskustannusta.

**Vaihe 3 — vanhan lehtijärjestelmän purku, omana eränään.** Mikään ei
saa jäädä kummittelemaan:

- `js/fokuskartta.js` (3 700 riviä) — maalehdet, atlasryhmä,
  yleislehti, lehtivalinta ja -budjetti, esilämmitys, muistipienennys.
- **Reunahäivytys** — moottorin osio 11. Pyramidissa ei ole reunaa,
  johon sulattaa.
- **Saumat ja vuoto** — `bbox` vs. `rajaus` -kaksoislaatikko koko
  putkessa (tools/tee-fokuskartta.mjs, js/packs/fokus-grc.js).
- **v1346:n jättilaislehtiväistö** — Raamattu sanoo suoraan, että
  pyramidi kumoaa sen.
- **Per-lehti-resoluutioerot** (RUS-ongelma) poistuvat
  rakenteellisesti.
- `js/packs/fokus-grc.js` `FOKUS_POHJAT`, `YLEISLEHTI`,
  `FOKUS_LAUTAPROJEKTIOT`, `FOKUS_LISANIMET`.
- `js/media.js` `FOKUS_ALIPOLKU`, `FOKUS_VUOSIKERTA`, `fokuskarttaUrl`.
- `tools/tee-fokuskartta.mjs`, `tools/tee-yleislehti.mjs`,
  `tools/fokuskartta/maat.mjs`, `.github/workflows/patinoi-fokus.yml`.
- Savukkeet `savuke-fokuskartta.mjs`, `savuke-atlas-purku.mjs`,
  `savuke-lehtimuisti.mjs`, `savuke-fokusvirta.mjs` — nämä testaavat
  purettavaa mekaniikkaa ja korvataan pyramidin omalla savukkeella.
- Ämpäristä `julisteet/fokus/` kokonaan.

**Purun ehto:** pyramidi kattaa kaikki käytöt — myös katselutilan
(`?lauta=`), kehittäjän maailmanäkymän ja turvatilan.

**Maailma-nappi vaiheen 3 jälkeen** ei vaihda karttaa vaan **vain
löysentää panorointirajoja** (Raamattu). Maatilassa panorointi
rajataan maan ympärille; kartta on molemmissa sama laatasto.

## 11. Avoimet päätökset

1. **Arkin leveyspiirit: 76 °N vai 84 °N?** Lukittu arkki on
   76 °N … 76 °S. Yleislehden kartta-ala on 84 °N … 66 °S, koska
   omistaja pyysi 29.8.2026 nimenomaan lisää tilaa (*"alhaalta ja
   varsinkin ylhäältä leikkautuu liikaa karttaa pois"*): Grönlannin
   pohjoiskärki on 83,7 °N ja Huippuvuoret 80,8 °N, ja **lukittu
   76 °N leikkaa ne jälleen pois**. Laajennus 84 °N … 66 °S maksaa
   +13,8 % arkin korkeutta eli noin +2 100 laattaa ja +17 Mt. Tämä on
   halpa korjaus, jos se on toivottu.
2. **Atlaskehykselle ei ole tässä arkissa tilaa.** Kartussi,
   mittajana, painajanrivi ja kermainen paperimarginaali vaativat
   marginaalin kartta-alan ulkopuolelle; lukittu arkki on tasan
   kartta-ala. Raamattu vaatii kehyksen uloimmalle tasolle. Kaksi
   vaihtoehtoa: korkeampi arkki (kohta 1 hoitaisi tämänkin) tai pelin
   piirtämä ohut kehyskerros (staattinen ja pieni). **Pilotissa kehys
   on pois päältä**, jotta lukitut laattaluvut pitävät.
3. **Harva pyramidi: suositus on jättää tekemättä** (luku 4).
4. **Kaupungit, reittipisteet ja kohteet laattoihin.** Raamattu
   vaatii, että kaikki pysyvä poltetaan laattoihin koko maailmasta.
   Tässä erässä laatoissa on topografia, meri, rannikko, järvet,
   asteverkko ja valtamerten nimet. Nimien ja kaupunkien siirto tähän
   moottoriin kannattaa tehdä **ennen** täysgenerointia — muuten
   pyramidi ajetaan kahdesti.
5. **webp-laatu 0,82.** Pilotti ajettiin sillä; yleislehti käyttää
   0,9. Ero on noin 30 % tavuja. Omistajan silmä ratkaisee laitteella.
