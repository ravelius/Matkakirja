# Opus → Fable: joet karttavakioksi, leveämmiksi ja kaikki tasokynnykset pois (haara claude/reitit-kasin)

Omistajan kaksi päätöstä 31.8.2026 toteutettu **saman haaran päälle**
(`claude/reitit-kasin`, pohja f5b81fe1). **Ei PR:ää, ei versionostoa,
ei pyramidiajoa.** Muutettu kaksi tiedostoa:

| tiedosto | mitä |
| --- | --- |
| `tools/fokuskartta/maailmapiirto.js` | `R` nostettu jokien ja reittien yhteiseksi; jokien leveys `1,4 / 1,0` → **`2,2 R` / `1,6 R`**; `nakyy(0.11)`, `nakyy(0.45)` ja koko `nakyy`-apufunktio poistettu |
| `docs/moduulit/laattapyramidi.md` | luku 6i: uusi alaluku "Jokien leveys on karttavakio — ja leveämpi" mittoineen; luvun 6k kynnysmaininta päivitetty |

**Rantaviiva, kehys, kartussi, nimiöt ja patina koskematta** — ne
pysyvät paperivakioina. `js/rules.js`, `js/packs/*`, `sisalto.mjs`,
Raamattu, tarina, isoisän raamattu ja `js/laattapyramidi.js`
koskematta. Jokien geometriaan, silotukseen (`lautaKaari`),
`tarkeys`-luokitteluun tai musteen sävyyn ei koskettu — vain leveyteen
ja sen skaalautumiseen.

Portit: `node --test tests/*.test.mjs` → **# pass 1047, # fail 0**
(1 skip); `tarkista-kaksoisavaimet` → ei kaksoisavaimia;
`build-standalone` → ok. `dist/` poistettu ennen committia.

**Katselukappale `joet-karttavakio.png`** haaran juuressa
(`/home/user/Matkakirja/joet-karttavakio.png`), **committoimatta**,
**1 435 kt** (raja 1,5 Mt), 1536 × 2746 px. Sisältö §6.

---

## 1. Leveys: mitattu, ei arvattu

Renderöin **neljä leveyttä** (1,4/1,0 · 1,8/1,3 · 2,2/1,6 · 2,6/1,9)
samasta z7-ruudusta (Mekong Kambodžassa) ja katsoin ne sekä 1:1 että
kolminkertaisena suurennoksena. **Valitsin 2,2 / 1,6** (kerroin 1,57).

- **1,8 / 1,3** jäi yhä ohueksi — se on parannus, mutta ei vastaa
  pyyntöön "näkyy paremmin" kuin puolittain.
- **2,6 / 1,9** meni yli: 1,9 pikselin sivujoki alkoi näyttää
  maantieltä eikä uomalta, ja sivujokia on 115 eli valtaosa uomista.
- **2,2 / 1,6** on se, jossa uoma on varmaotteinen kaiverrettu viiva
  mutta yhä selvästi rantaviivaa kevyempi.

Alin rivi katselukappaleessa on tämä koe 1:1 (1,4 · 2,2 · 2,6).

### Suhde rantaviivaan — leveytenä ja kontrastina

**Leveytenä.** Rantaviivan kynä on **1,1 P** eli paperivakio joka
tasolla (sen päällä on lisäksi 3 P:n usva alfalla 0,18). Joki on nyt
**2,2 R** eli karttavakio. Ne eivät siis ole vertailukelpoisia yhtenä
lukuna vaan tasoittain:

| taso | rantaviivan kynä | pääjoki | **joki : kynä** |
| --- | --- | --- | --- |
| z7 | 1,1 | 2,20 | **2,00** |
| z6 | 1,1 | 1,10 | 1,00 |
| z5 | 1,1 | 0,55 | 0,50 |
| z4 | 1,1 | 0,275 | 0,25 |
| z3 | 1,1 | 0,138 | 0,125 |
| z2…z0 | 1,1 | 0,069…0,017 | 0,06…0,02 |

**Ennen muutosta joki oli kynää leveämpi JOKA TASOLLA** (1,4 : 1,1 =
1,27 kaikkialla). Nyt se on kynää leveämpi vain z7:llä, yhtä leveä
z6:lla ja ohuempi kaikkialla muualla. **Sekaantumisriski siis pienenee
kaikkialla paitsi syvimmällä tasolla** — ja siellä katsoja on
lähimpänä, jolloin ero on helpoin nähdä.

**Kontrastina** (sama estimaattori molemmille, samasta laatasta;
rantaviiva mitattu taustalaatasta, jossa jokia ei ole):

| ala | rantaviivan Weber | joki 1,4 | **joki 2,2** | suhde ennen → jälkeen |
| --- | --- | --- | --- | --- |
| z7 Mekong | 0,532 | 0,128 | **0,221** | 0,24 → **0,42** |
| z6 Niilin suisto | 0,495 | 0,095 | **0,191** | 0,19 → **0,39** |
| z5 Niili ja Siinai | 0,479 | 0,032 | **0,069** | 0,07 → **0,14** |
| z4 Länsi-Eurooppa | 0,477 | 0,004 | **0,011** | 0,01 → **0,02** |

**Rantaviiva on yhä yli kaksinkertainen syvimmälläkin tasolla.** Sen
etu ei ole leveydessä vaan siinä, että sillä on oma usva ja maavärin
täyttöraja, ja että sen muste (58,40,25 alfalla 0,85) on paljon
tummempaa kuin joen siniharmaa (120,130,138 alfalla 0,72). Kartta ei
siis muutu sekavaksi — mutta tämä on se luku, jota kannattaa katsoa,
jos leveyttä joskus nostetaan lisää.

---

## 2. Muutos koodissa

`R` on nyt esitelty jokien EDESSÄ (joet piirretään ensin) ja palvelee
molempia pysyviä viivoja:

```js
const SYVIN_TIHEYS = 7.2;                                   // z7:n px/lautayksikkö
const R = paperiS != null ? (px / SYVIN_TIHEYS) * paperiS : P;
const JOKI_PAA = 2.2;
const JOKI_SIVU = 1.6;
...
ctx.lineWidth = (joki.tarkeys <= 1 ? JOKI_PAA : JOKI_SIVU) * R;
```

| taso | R | pääjoki px | sivujoki px |
| --- | --- | --- | --- |
| **z7** | **1,000** | **2,20** | **1,60** |
| z6 | 0,500 | 1,10 | 0,80 |
| z5 | 0,250 | 0,55 | 0,40 |
| z4 | 0,125 | 0,275 | 0,20 |
| z3 | 0,0625 | 0,138 | 0,10 |
| z2 | 0,0313 | 0,069 | 0,050 |
| z1 | 0,0156 | 0,034 | 0,025 |
| z0 | 0,0078 | 0,017 | 0,013 |

`tarkeys` ei enää valitse ketkä piirretään vaan pelkän leveyden:
kaikki 123 uomaa ovat joka tasolla, ja pääjoen (8 kpl) ja sivujoen
(115 kpl) ero on 2,2 : 1,6.

---

## 3. Milloin joki lakkaa erottumasta paperista

Sama paritettu koe kuin reiteillä (laatta myös ilman jokia, erotus).
**Menetelmällinen tarkennus:** näyte otetaan siltä Bézier-käyrältä,
jonka `lautaKaari` oikeasti piirtää — joki silotetaan
sentripetaalisella Catmull-Romilla, joten murtoviivalta ottaminen olisi
osunut viivan viereen. Sama kaava on toistettu mittausskriptissä rivi
riviltä.

**LISÄYS = (tummin ilman jokia − tummin jokien kanssa) / paperi**,
mediaani; n = 188…6894 per luku:

| taso | pääjoki 2,2 | sivujoki 1,6 | *(vertailu: leveys 1,4 / 1,0)* | **ennen** (paperivakio 1,4) |
| --- | --- | --- | --- | --- |
| z7 | 0,280 | 0,243 | *0,227 / 0,161* | identtinen 1,4:n kanssa |
| z6 | 0,190 | 0,121 | *0,101 / 0,067* | 0,227 / 0,156 |
| z5 | 0,071 | 0,047 | *0,036 / 0,022* | 0,228 / 0,151 |
| z4 | **0,025** | **0,013** | *0,008 / 0,004* | 0,231 / 0,152 |
| z3 | 0,004 | 0,003 | *0,002 / 0,001* | 0,227 / 0,155 |
| z2 | 0,001 | 0,000 | *0,000 / 0,000* | 0,230 / 0 (kynnys) |
| z1 | 0,000 | 0,000 | *0,000 / 0,000* | 0,226 / 0 (kynnys) |
| z0 | 0,000 | 0,000 | *0,000 / 0,000* | 0 (kynnys) |

**Vastaus:** havaitsemiskynnys on 0,01…0,02, joten **joki erottuu
z4:lle asti ja on hävinnyt z3:een mennessä.** Leveämpi uoma osti
täsmälleen yhden tason lisää — leveydellä 1,4 se hävisi jo z4:ään.

**Reitti erottuu z3:lle asti, joten joki katoaa yhä ennen reittiä.**
Ero kaventui kahdesta tasosta yhteen. Se on kartografisesti oikea
järjestys — rata on tärkeämpi kuin maasto — ja nyt se on myös
lähempänä toisiaan, mikä sopii siihen, että molemmat ovat nyt saman
säännön alla.

---

## 4. Usvakoe uudella leveydellä — ja yksi luku, joka ei ole enää nolla

Leveämpi uoma tarkoittaa suurempaa usvariskiä, joten koe ajettiin
kokonaan uudestaan. Tiheimmältä jokilaatalta joka tasolta:

| taso | usva ΔL (2,2/1,6) | paperin rae σ | usva rakeesta | *(leveydellä 1,4/1,0)* |
| --- | --- | --- | --- | --- |
| z0 | **0,003** | 13,7 | **0,02 %** | *0,000* |
| z1 | 0,014 | 9,7 | **0,14 %** | *0,005* |
| z2 | 0,032 | 6,5 | **0,50 %** | *0,017* |
| z3 | 0,068 | 6,3 | 1,1 % | *0,039* |
| z4 | 0,178 | 6,2 | 2,9 % | *0,087* |
| z5 | 0,368 | 6,2 | 5,9 % | *0,204* |

**Usvaa ei synny:** uloimmilla tasoilla tummeneminen on 0,02…0,5 %
paperin omasta rakeesta.

**Mutta yksi asia muuttui, ja se on kerrottava.** Leveydellä 1,4
z0-laatta oli TAVULLEEN sama jokien kanssa ja ilman, koska uoma oli
0,011 px eli Skian piirtorajan alla. Leveydellä 2,2 uoma on z0:lla
0,017 px eli **juuri rajan yläpuolella**, ja laatta muuttuu: usva
0,003 ΔL, 0,12 % pikseleistä tummenee vähintään yhden luminanssi-
yksikön, pahin yksittäinen pikseli 1,9. Se on 0,02 % rakeesta eikä
näy — mutta se ei ole enää nolla, ja jos leveyttä joskus nostetaan
lisää, tämä on se luku joka lähtee kasvamaan ensin.

---

## 5. Kynnykset — molemmat poistettu, ja eri syystä kuin odotin

Mittasin kynnyksettömän version erikseen (koeversio, z0…z3) ja
palautin lopullisen koodin vasta sen jälkeen: **poisto ei tuo näkyviin
mitään eikä tuota usvaa.**

Odotin, että kynnykset kannattaa säilyttää työn säästämiseksi.
**Se osoittautui vääräksi lasketuksi:** ne rajasivat piirtoa vain
uloimmilla tasoilla, joilla laattoja on z0 2, z1 6 ja z2 24 — eli
**32 laattaa 23 340:stä**, 0,14 % ajosta.

**Varsinainen peruste on pyramidin oma sääntö.**
`tools/generoi-laattapyramidi.mjs` alkaa sanoilla *"Jokainen taso
piirtää TÄSMÄLLEEN saman arkin samalla moottorilla"*, ja perustelu on
heti perässä: *"kun jokainen taso on sama arkki, mikään ei voi ajautua
eri sävyihin tasojen välillä"*. **Kynnys rikkoi juuri sen:** se teki
uloimmista tasoista eri SISÄLLÖN eikä vain pienemmän. `nakyy(0.45)`
oli koko laattapiirron ainoa kohta, jossa kartan uomasto vaihtui tason
mukaan — z0…z2 näytti 8 uomaa, z3 ja sitä syvemmät 123.

Nyt sisältö on sama joka tasolla ja vain koko muuttuu. **Koko
`nakyy`-apufunktio on poistettu; laattapiirrossa ei ole enää yhtään
tasokynnystä.**

**Riski, joka on syytä tietää:** yleistys tehdään nyt kokonaan koolla.
Jos mustetta tai leveyttä joskus nostetaan lisää, häipymispiste siirtyy
ulommas eikä mikään kytkin enää suojaa uloimpia tasoja. Silloin
fade-piste ja usva on mitattava uudestaan — se on nyt se yksi paikka,
jossa sääntö asuu.

---

## 6. Katselukappale — mitä siinä on

`joet-karttavakio.png`, 1536 × 2746 px, **1 435 kt**, haaran juuressa,
committoimatta.

1. **z0…z7 kahdeksana ruutuna**, jokainen 512 × 512 laattapikseliä 1:1.
   **Jokaisen otsikossa lukee uoman leveys ja se, erottuuko se** —
   muuten tyhjältä näyttävää z3-ruutua luulisi rikkinäiseksi renderiksi,
   vaikka se on mittaustulos. Alat: z0 arkin laita, z1 Eurooppa–Aasia,
   z2 Lähi-itä ja Intia, z3 Siperia (Ob, Jenisei, Lena), **z4
   Länsi-Eurooppa (Seine, Loire, Rein)**, **z5 Niili, Siinai ja Suez**,
   z6 Niilin suisto, z7 Mekong Kambodžassa. z4 ja z5 ovat mukana
   pyynnöstäsi ja ne on valittu niin, että samassa ruudussa on sekä
   uomaa että rantaviivaa — juuri ne tasot, joilla vertailu tehdään.
2. **z1 Eurooppa–Aasia ennen ja jälkeen vierekkäin.** Ennen: Niili,
   Volga, Tonava ja Ob täysleveinä harmaina viivoina yli maanosan.
   Jälkeen: puhdas.
3. **LEVEYSKOE alimmalla rivillä 1:1** — sama z7-kohta leveyksillä
   1,4 / **2,2** / 2,6, eli se koe, jolla leveys valittiin.
4. **Kaksi lukupaneelia:** joen oma lisäys tasoittain (§3) ja usvakoe
   (§4).
5. **Selite**, jossa pääjoki 2,2, sivujoki 1,6 ja **rantaviivan kynä
   1,1 samassa kuvassa**, sekä se raja kirjattuna, ettei rantaviiva
   muutu.

**Rehellisyysvaraus, joka lukee myös kuvassa:** tausta on kaavio eikä
lopullinen maasto (`ne50.geojson`, PD, Natural Earth 50m; maasto
tasainen). **Paperi, patina, kehys, projektio, arkkikoordinaatit ja
jokien piirto ovat oikeaa moottoria.**

---

## 7. Sauma — ei liikahtanut

Lohkorajakoe (kaksi vierekkäistä samankokoista lohkoa samalta arkin
alalta), pahin kanavaero 0–255:

| ala | ennen (f5b81fe1) | **jälkeen** |
| --- | --- | --- |
| z1 1,0 Eurooppa–Aasia | 4 | **4** |
| z3 8,1 Siperia | 6 | **6** |
| z5 13,15 Amazon | 4 | **4** |
| z7 128,46 Yunnan | 3 | **3** |

Sama luku joka alalla, eikä se yllätä: silotus ei riipu leveydestä,
`R` on tason vakio, ja käyrä lasketaan koko uomasta arkin
koordinaateissa.

Sama varaus kuin ennen: koe ajettiin kaaviotaustalla, koska pyramidin
raaka-aineistoa ei ole kontissa. Virallinen `--saumatesti` oikealla
aineistolla kuuluu ajaa ennen tuotantoajoa, **`--alue`-rajauksella
alueelle jolla on reittejä ja jokia** — työkalun vakioala on ulappaa.

---

## 8. Mitä jäi tekemättä

- **Pyramidiajo ja versionosto** — omistaja päättää.
- **Järvet.** Ne piirretään rantaviivan kanssa samasta vektorista
  (luku 6h) ja ovat siksi maaston rajaa eivätkä merkintää — en
  koskenut niihin. Mainitsen sen vain siksi, että "vesi" voisi
  kuulostaa yhdeltä asialta: joki on merkintä, järvi on täytön reuna.
- **z7-laatat eivät ole enää tavulleen samoja kuin ennen**, ja se on
  tarkoitus: leveys nousi. Jos joskus halutaan varmistaa, ettei mikään
  MUU muuttunut, sen voi tehdä ajamalla saman vertailun leveydellä
  1,4 / 1,0 — silloin z7 on bittiin asti sama kuin f5b81fe1:ssä
  (todennettu tässä erässä ennen leveyden nostoa).


# Opus → Fable: reittien muste karttavakioksi ja kynnys pois (haara claude/reitit-kasin)

Omistajan päätös 31.8.2026 toteutettu **saman haaran päälle**
(`claude/reitit-kasin`, pohja c23c2294). **Ei PR:ää, ei versionostoa,
ei pyramidiajoa.** Muutettu kaksi tiedostoa:

| tiedosto | mitä |
| --- | --- |
| `tools/fokuskartta/maailmapiirto.js` | reittilohko: uusi yksikkö `R` (karttavakio) paperivakion `P` tilalle; `nakyy(0.22)` pois |
| `docs/moduulit/laattapyramidi.md` | luku 6k: uusi alaluku "Reittien muste on karttavakio" mittoineen |

`js/rules.js`, `js/packs/*`, `tools/fokuskartta/sisalto.mjs`, Raamattu,
tarina, isoisän raamattu, `js/fokusnosto-symbolit.js`, `js/fokusniput.js`,
`js/karttavalot.js` ja `js/laattapyramidi.js` **koskematta**.
Katkoviivan hahmoa, himmennystä, sentripetaalista käyrää, korjattuja
vesireittejä, askelmien määrää (`steps`) eikä reittiverkkoa ei
muutettu — `git diff --stat` on kaksi tiedostoa ja siinä kaikki.

Portit: `node --test tests/*.test.mjs` → **# pass 1047, # fail 0**
(1 skip, sama kuin mainissa); `tarkista-kaksoisavaimet` → ei
kaksoisavaimia; `build-standalone` → ok. `dist/` ja `node_modules`
poistettu ennen committia.

**Katselukappale `reitit-karttavakio.png`** haaran juuressa
(`/home/user/Matkakirja/reitit-karttavakio.png`), **committoimatta**,
**1 272 kt** (raja 1,5 Mt). 1536 × 2460 px, paletti-PNG. Sisältö: z0…z7
kahdeksana ruutuna, **Australian ruutu z2:lta ennen ja jälkeen
vierekkäin**, kaksi lukupaneelia ja rehellisyysvaraus. Jokainen ruutu
on 512 × 512 laattapikseliä 1:1 eikä yhtään pikseliä ole skaalattu.

---

## 1. Mitä muutettiin — yksi rivi ja sen seuraukset

```js
const SYVIN_TIHEYS = 7.2;                                   // z7:n px/lautayksikkö
const R = paperiS != null ? (px / SYVIN_TIHEYS) * paperiS : P;
```

`R` korvasi `P`:n reittilohkon jokaisessa mitassa: viivanleveys,
helmen säde, helmen kehä, katkon jakso, katkon sivuheitto ja kaarevuus,
lyhimmän katkon raja sekä käsin piirretyn jäljen heitto. Muuta
painojälkeä ei koskettu — kehys, kartussi, nimiöt, patina, rannikon
kynä ja paperin rae ovat yhä paperivakioita, koska niiden mitat ovat
arkin geometriaa (luku 6d) ja niiden skaalaaminen rikkoisi
laattaruudukon.

**Yhden arkin lehti ei muutu.** Siellä `paperiS` on null, jolloin
`R = P = S` eli kartan mittakaava — reitit olivat siellä jo valmiiksi
karttavakioita, ja siksi vika ei näkynyt ennen pyramidia.

| taso | R | viiva px | helmi ⌀ px | katkon jakso px |
| --- | --- | --- | --- | --- |
| **z7** | **1,000** | **1,90** | **6,40** | **16,0** |
| z6 | 0,500 | 0,95 | 3,20 | 8,0 |
| z5 | 0,250 | 0,48 | 1,60 | 4,0 |
| z4 | 0,125 | 0,24 | 0,80 | 2,0 |
| z3 | 0,0625 | 0,12 | 0,40 | 1,0 |
| z2 | 0,0313 | 0,059 | 0,20 | 0,50 |
| z1 | 0,0156 | 0,030 | 0,10 | 0,25 |
| z0 | 0,0078 | 0,015 | 0,05 | 0,13 |

### z7 on tavulleen sama kuin ennen

Tämä on erän tärkein yksittäinen luku, koska omistaja hyväksyi z7:n
ilmeen: **kolme z7-laattaa (141,41 · 65,63 · 93,42) ovat bittiin asti
identtiset** vanhan koodin renderöimien kanssa. Muutos ei siis ole
"melkein sama syvimmällä" vaan sama.

### Sivutulos, joka kannattaa tietää

Kun sekä kaarenpituus että katkon jakso skaalautuvat samalla `px`:llä,
**katkojen lukumäärä reittiä kohti on sama joka tasolla**. Kuvio ei
harvene eikä tihene zoomatessa, se vain pienenee — niin kuin painettu
kartta pienenee. Samasta syystä **edellisen erän tunnettu rajatapaus
poistui rakenteellisesti**: z2:n helminauha (helmet lähempänä toisiaan
kuin lyhin katko) ei voi enää syntyä, koska helmen ja askelvälin suhde
on joka tasolla sama kuin z7:llä.

---

## 2. Kynnys `nakyy(0.22)` — poistettu, ja miksi se oli turvallista

Sinun tarkennuksesi kesken erän: *"eikös reitit pidä olla päällä
kaikilla zoomitasoilla? ne vain jäävät niin pieniksi että eivät siksi
juuri näy"*. Kynnys on poistettu reiteiltä; joet pitävät omansa
(0,11 ja 0,45), niitä tämä ei koske.

Olin päätymässä samaan mittausten perusteella, mutta **et pyytänyt
pelkkää poistoa vaan todistuksen siitä, ettei alipikselin viiva jätä
usvaa.** Se on §4, ja se on erän tärkein mittaus.

---

## 3. Milloin reitti lakkaa erottumasta paperista

### Menetelmä — ja miksi vanha ei riittänyt yksin

Vanha menetelmä (poikkileikkaus ±12 px, askel 0,5, bilineaarinen;
paperi = mediaani 7…12 px; muste = pienin luminanssi ≤ 3,5 px) on
ajettu sellaisenaan, mutta **se ei kelpaa yksin uloimmille tasoille**:
z1:llä ±3,5 px kattaa noin 60 lautayksikköä eli satoja kilometrejä,
joten "tummin pikseli" on siellä rantaviiva eikä reitti. Vanha kaava
antaakin z1:llä merireitille 0,44 — vaikka reittiä ei siinä koodissa
piirretä lainkaan.

Siksi ajoin **paritetun kokeen**: jokainen laatta piirrettiin myös
ILMAN reittejä, samasta arkin kohdasta, samalla patinalla ja samalla
moottorilla. Silloin reitin oma osuus saadaan vähennyslaskuna:

> **LISÄYS = (tummin ilman reittejä − tummin reittien kanssa) / paperi**

Nolla tarkoittaa, ettei reitti tummenna paperia lainkaan.

### Luvut (mediaani; n = 143…3247 per luku)

| taso | maa | meri | lento | **ennen** (paperivakio) maa / meri |
| --- | --- | --- | --- | --- |
| z7 | 0,197 | 0,322 | – | identtinen |
| z6 | 0,131 | 0,195 | – | 0,194 / 0,315 |
| z5 | 0,061 | 0,100 | – | 0,205 / 0,316 |
| z4 | 0,038 | 0,041 | 0,038 | 0,221 / 0,308 |
| z3 | 0,014 | 0,014 | 0,009 | 0,200 / 0,306 |
| z2 | 0,005 | 0,001 | 0,001 | 0,215 / 0,239 |
| z1 | 0,001 | 0,001 | 0,000 | 0 (kynnys) |
| z0 | **0,000** | **0,000** | **0,000** | 0 (kynnys) |

**Vastaus kysymykseen:** Weberin havaitsemiskynnys on laajalla
pinnalla 0,01…0,02 ja ohuella viivalla korkeampi. **z4 (0,04) on
selvästi sen yläpuolella, z3 (0,014) on täsmälleen siinä, ja z2:sta
ulospäin (0,005…0,000) reitti ei enää erotu paperista.** Reitti siis
häipyy z3:n ja z2:n välillä — ja z0:lla se on kirjaimellisesti
olematon.

Vertailuksi vanha koodi: sama luku pysyi 0,20…0,32:ssa joka tasolla,
eli reitti oli z2:lla yhtä vahva kuin z7:llä. Juuri se oli valitettu
vika.

---

## 4. Usvakoe — alipikselin viiva ei jätä harmaata

Riski oli oikea eikä teoreettinen: canvas ei piirrä puolikasta
pikseliä tyhjäksi vaan sekoittaa sen taustaan. Mittasin **koko laatan
keskisävyn muutoksen**, kun reitit lisätään, ja vertasin sitä
**paperin omaan rakeeseen** (hajonta 16 × 16 ruuduissa, mediaani).
Laataksi valitsin joka tasolta **tiheimmän** eli sen, jossa
reittiverkkoa on eniten (z0 koko maailma, z1 Eurooppa–Aasia, z2
Eurooppa–Intia).

| taso | usva ΔL | paperin rae σ | usva rakeesta | ΔL ≥ 1 osuus pikseleistä |
| --- | --- | --- | --- | --- |
| z0 | **0,000** | 13,7 | **0 %** | 0,000 % |
| z1 | 0,127 | 10,6 | 1,2 % | 2,59 % |
| z2 | 0,195 | 6,5 | 3,0 % | 4,36 % |
| z3 | 0,114 | 5,2 | 2,2 % | 2,36 % |
| z4 | 0,212 | 4,9 | 4,3 % | 4,82 % |

**Usvaa ei synny.** Tummeneminen on muutaman prosentin luokkaa
paperin omasta rakeesta, ja se on PIENIMMILLÄÄN uloimmilla tasoilla —
eli juuri päinvastoin kuin usva käyttäytyisi. Yksittäisiä pikseleitä
tummenee toki (z2:lla 4,4 % pikseleistä vähintään yhden
luminanssiyksikön), mutta ne ovat mustetta siellä missä reitti on,
eivät tasaista harmaata koko alueen yli.

### z0: Chromium ei piirrä reiteistä yhtään mitään

Tämä yllätti ja siksi tarkistin sen erikseen: **z0-laatta on
TAVULLEEN sama reittien kanssa ja ilman**. Se ei ole bugi vaan Skian
raja, ja mittasin sen koepenkillä (musta veto valkoisella, muste
yhteensä ja tummin pikseli):

| lineWidth | yhtenäinen viiva | katkoviiva (katko 8 · leveys) |
| --- | --- | --- |
| 0,125 | 5 424 / 240 | 6 382 / 235 |
| 0,0625 | 2 530 / 248 | 4 137 / 242 |
| 0,030 | 1 084 / 252 | 2 133 / 249 |
| 0,0148 | 360 / 254 | **0 / 255** |
| 0,0074 | **0 / 255** | **0 / 255** |

Alfa skaalautuu vedon leveydellä siististi noin 0,015 pikseliin asti,
ja sen alla piirto lakkaa. z0:lla viiva on 0,0148 px ja katko
0,07…0,10 px — täsmälleen siinä kohdassa, jossa alipikselin mittaiset
katkot katoavat. **Skia ei siis paksunna ohutta vetoa hiusviivaksi**,
mikä olisi ollut se ikävä vaihtoehto; se häivyttää sen ja lopettaa.

**Helmistä:** z2:lla helmen halkaisija on 0,20 px ja z0:lla 0,05 px.
Helmi on paperinvärinen TÄYTTÖ ja tumma KEHÄ, eli se vaalentaa ja
tummentaa samassa pisteessä; alipikselin koossa ne kumoavat toisensa,
eikä helmi jää harmaaksi täpläksi. Se näkyy Australian jälkeen-ruudussa
(§6): helminauhaa ei ole, ei myöskään pistejonoa sen tilalla.

**Et pyytänyt varasuunnitelmaa turhaan, mutta sitä ei tarvita.**
Kumpaakaan ehdottamaasi keinoa (peittävyyden häivyttäminen
mittakaavan mukana tai helmien pudottaminen ennen viivaa) ei
toteutettu, koska mittaus ei anna niille aihetta. Jos usvaa joskus
ilmenisi oikealla maastoaineistolla, **peittävyyden häivytys mittaa
paremmin**: se koskee kaikkia kolmea lajia yhtä aikaa, ei tarvitse
uutta kynnystä eikä riko helmen ja katkon suhdetta. Helmien
pudottaminen erikseen jättäisi viivan yksin ja palauttaisi juuri sen
portaan, jonka poisto oli päätöksen ydin.

---

## 5. Sauma — parani joka tasolla

Lohkorajakoe (kaksi vierekkäistä samankokoista lohkoa samalta arkin
alalta, verrataan aluetta jonka molemmat kattavat), pahin kanavaero
0–255. **Tämä on tuotannon oma tilanne**, toisin kuin 2 × 2 -laattakoe.

| ala | ennen (c23c2294) | **jälkeen** | eroavia pikseleitä ennen → jälkeen |
| --- | --- | --- | --- |
| z1 1,0 | 4 | **4** | 275 → 272 |
| z2 3,1 | 16 | **7** | 10 379 → 847 |
| z3 5,4 | 4 | **4** | 828 → 563 |
| z5 35,10 | 11 | **9** | 6 342 → 3 719 |
| z7 93,42 | 5 | **5** | 1 247 → 1 247 (identtinen) |

**Vaihe on yhä jatkuva laatan reunan yli samalla tasolla**, ja syy on
rakenteellinen: `R` on tason vakio (`px` on sama joka laatalla), ja
katkon numero tulee reitin kaarenpituudesta ARKIN koordinaateissa.
Laatan origo ei esiinny kaavassa. Piirtovälimuistin avain sai `R`:n
mukaansa (`${px}|${P}|${R}`), joten taso ei voi periä toisen tason
geometriaa.

Erot pienenivät, koska ulommilla tasoilla on yksinkertaisesti vähemmän
mustetta, jonka kelluvan pisteen pyöristys voisi heittää.

**Varaus, sama kuin edellisissä erissä:** koe ajettiin
kaaviotaustalla, koska pyramidin raaka-aineistoa (Natural Earth 10m +
ETOPO) ei ole kontissa. Virallinen `--saumatesti` oikealla aineistolla
kuuluu ajaa ennen tuotantoajoa, **ja mieluiten `--alue`-rajauksella
alueelle jolla on reittejä** — työkalun vakioala (sarake 8, rivi 2) on
ulappaa eikä koettele reittipiirtoa lainkaan. Tämä havainto on
edellisestä erästä eikä ole vieläkään korjattu.

---

## 6. Katselukappale — mitä siinä on

`reitit-karttavakio.png`, 1536 × 2460 px, **1 272 kt**, haaran
juuressa, committoimatta.

1. **z0…z7 kahdeksana ruutuna**, jokainen 512 × 512 laattapikseliä 1:1.
   Ruudut z2…z7 ovat SAMAT kuin edellisessä sarjassa, jotta vertailu on
   suora (z2 Australia, z3 Etelä-Afrikka, z4 Tasmaninmeri, z5 Korea,
   z6 Tyrrhenanmeri, z7 Soulin seutu). **z0 ja z1 ovat uutta aluetta** —
   niillä ei ole ennen piirretty reittejä lainkaan, joten niihin ei ole
   vertailukuvaa; niiksi valittiin tihein laatta (z0 arkin laita, z1
   Eurooppa–Aasia). z0-arkki on vain 675 × 411 px, joten ruudun alalaita
   on arkin ulkopuolta ja se näkyy paperina.
2. **Australia z2 ennen ja jälkeen vierekkäin** alimmalla rivillä —
   se ruutu, josta valitit. Ennen: mantereen yli kulkee helminauha.
   Jälkeen: manner on puhdas ja reitit ovat siellä, missä ne
   mittauksen mukaan ovat, eli näkymättömissä.
3. **Kaksi lukupaneelia:** reitin oma lisäys tasoittain (§3) ja
   usvakoe (§4).
4. **Selite** kolmesta lajista, piirretty z7:n mitoilla, koska ne ovat
   ne hyväksytyt.

**Rehellisyysvaraus, joka lukee myös kuvassa:** tausta on kaavio eikä
lopullinen maasto. Rantaviiva on repossa valmiina olevasta
`ne50.geojson`:sta (PD, Natural Earth 50m) ja maasto on tasainen.
**Paperi, patina, kehys, projektio, arkkikoordinaatit ja reittien
piirto ovat oikeaa moottoria** — arvioitava asia eli reittien muste on
siis aitoa jälkeä, tausta ei ole.

---

## 7. Mitä jäi tekemättä ja miksi

- **Pyramidiajo ja versionosto** — ohjeen mukaan omistaja päättää.
- **Virallinen `--saumatesti` oikealla aineistolla** (§5) — aineistoa
  ei ole kontissa.
- **Peittävyyden häivytys mittakaavan mukana** — mitattu tarpeettomaksi
  (§4), ehdotus on kirjattu siltä varalta että oikea maastoaineisto
  muuttaa tilanteen.
- **Havainto ohimennen, en korjannut:** `nakyy`-apufunktio jää
  reittilohkon jälkeen käyttöön vain joille (0,11 ja 0,45). Jos joet
  joskus halutaan samaan karttavakiokohteluun, se on oma päätöksensä —
  joen leveys (1,4 / 1,0) on kiinteä ulostulopikseleinä joka tasolla,
  eli sama vika kuin reiteillä oli. En koskenut siihen, koska päätös
  koski reittejä, mutta se on ilmeinen seuraava kysymys omistajalle.


# Opus → Fable: kaikki reitit katkoviivaksi, himmeämmäksi ja käsin piirretyiksi (haara claude/reitit-kasin)

Omistajan tilaus 31.8.2026 illalla toteutettu **saman haaran päälle**
(`claude/reitit-kasin`, pohja 92583b30). **Ei PR:ää, ei versionostoa,
ei pyramidiajoa.** Muutettu kolme tiedostoa:

| tiedosto | mitä |
| --- | --- |
| `tools/fokuskartta/maailmapiirto.js` | reittilohko: katkoviivakoneisto, himmennetyt musteet, katkon oma käsin piirretty heitto ja kaari |
| `tools/fokuskartta/sisalto.mjs` | lentoreitille `poly` + `solmut`, jotta se kulkee saman koneiston läpi |
| `docs/moduulit/laattapyramidi.md` | luku 6k: vanha sääntö merkitty kumotuksi + uusi alaluku mitoineen |

`js/rules.js`, `js/packs/*`, Raamattu, tarina, isoisän raamattu,
`js/fokusnosto-symbolit.js`, `js/fokusniput.js` ja `js/laattapyramidi.js`
**koskematta**. Askelmien määrää (`steps`), reittiverkkoa,
sentripetaalista käyrää eikä korjattuja vesireittejä ei muutettu —
`git diff --stat` on kolme tiedostoa ja siinä kaikki.

Portit: `node --test tests/*.test.mjs` → **# pass 1047, # fail 0**
(1 skip, sama kuin mainissa); `tarkista-kaksoisavaimet` → ei
kaksoisavaimia; `tarkista-niputus` → 293 moduulia, ei törmäyksiä;
`tarkista-savukkeet` → kunnossa; `build-standalone` → ok. `dist/` ja
`node_modules` poistettu ennen committia.

**Katselukappale `reitit-zoomtasot.png`** haaran juuressa,
**committoimatta**, **922 kt** (raja oli 1,5 Mt; edellinen 4,5 Mt:n
arkki jouduttiin pienentämään). Kavensin sen 1536 pikseliin ja
tallensin paletti-PNG:nä (256 väriä, järjestetty tärinä) — **ruudut
ovat yhä 512 × 512 laattapikseliä 1:1 eikä yhtään pikseliä ole
skaalattu**. Sisältö: z2…z7 kuutena ruutuna, ennen/jälkeen-pari z7
Kreetalta, selite ja lukutaulukko.

---

## 1. Mitä tehtiin — kolme muutosta

### 1.1 Kaikki kolme lajia katkoviivaksi

Vanha sääntö *"katkoviiva on varattu sille reitille, jolla ei ole
askelmia"* purettiin. Voimassa oleva sääntö on nyt: **muste kertoo
kulkutavan, helmet kertovat askelmat, ja katkoviiva on kartan yleinen
reittimerkintä.**

Lentoreitti ei enää käytä `ctx.setLineDash`ia vaan kulkee saman
koneiston läpi kuin muut. Se vaati yhden kentän `sisalto.mjs`:ään:
lentoreitille annetaan `poly` (kaksi pistettä) ja `solmut`, jolloin se
on piirrolle samaa muotoa kuin maa- ja merireitti. `ax…by` jäivät
paikalleen.

### 1.2 Himmeämmäksi — ja mitattuna

Peittävyys laskettiin, sävyyn ei koskettu:

| | eilen (kontrastinnosto) | tänään |
| --- | --- | --- |
| maan muste | `rgba(120,88,54,0.80)` | **0,64** |
| maan helmen kehä | 0,92 | **0,80** |
| meren muste | `rgba(32,60,98,0.84)` | **0,68** |
| meren helmen kehä | 0,94 | **0,84** |
| lennon muste | `rgba(150,54,40,0.76)` | **0,60** |
| helmen täyttö | 0,94 | 0,92 |

Viivanleveyksiin ja helmen kokoon ei koskettu (omistaja pyysi
himmeämpää, ei ohuempaa): viiva 1,9 P, helmen säde 3,2 P, lento 1,7 P.

**Katkoviiva himmentää jo itsessään:** mustetta on enää noin kaksi
kolmasosaa matkasta, joten silmän kokema keskimääräinen tummuus laskee
vaikkei alfa muuttuisi. Siksi alfaa ei tarvinnut laskea lähellekään
lähtötilaa.

### 1.3 Käsin piirretty tunnelma katkon mittaan

Solmun mittainen heitto (0,35 P, smoothstep solmujen välillä) jäi
sellaisenaan. Sen rinnalle tuli **katkon mittainen**:

| mitta | arvo |
| --- | --- |
| jakso (katko + väli) | 16 P |
| katkon pituus | 55…78 % jaksosta = **8,8…12,5 P** |
| väli | **3,5…7,2 P** |
| koko katko sivussa viivalta | ±0,40 P |
| katkon kaarevuus keskellä | ±0,55 P |

Katko ei siis ole tarkka jana: se piirretään viitenä janana, jotka
istuvat reitin omalla käyrällä ja kaartavat siitä sinin muotoisesti
sivuun. Jokainen katko on eri pituinen, istuu eri kohdassa jaksoaan
(siksi myös **väli** vaihtelee) ja kaartaa eri suuntaan.

---

## 2. Kolme rajaa, jotka piti pitää — ja miten ne pidettiin

### 2.1 Determinismi: heitto tulee tunnuksesta, ei pikselistä

Katkon pituus, paikka, sivuheitto ja kaari arvotaan funktiolla
`arpa(r.siemen, n, k)`, jossa `n` on **katkon järjestysluku reitin
omalta kaarenpituudelta**. Ei pikseliä, ei laatan nurkkaa, ei
ajokertaa. Sama reitti saa saman kuvion joka laatalla ja joka ajolla.

### 2.2 Sauma: vaihe kaarenpituudesta arkin koordinaateissa

Tämä oli erän ainoa aito ansa, ja se ratkaistiin rakenteellisesti.
Katko `n` on kaarenpituusväli `[n·T, (n+1)·T)` **arkin pikseleissä**:
`lautaKuvaX` lukee arkin origon (ei laatan bboxia), joten pisteet ja
niiden väliset etäisyydet ovat samat luvut joka laatalla. Katkon
numeron saa siis suoraan kaarenpituudesta (`floor(s / T)`) eikä sitä
tarvitse kerätä laatan alusta — ja juuri se tekee kuviosta laatasta
riippumattoman. Sauman ylittävä hyppy (`|Δx| > arkin puolikas`)
katkaisee jakson eikä kartu kaarenpituuteen, kuten muukin piirto.

**Ajoin saumakokeen** (sama logiikka kuin `--saumatesti`: sama arkin
ala kerran 1024 px kuvana ja kerran neljänä 512 px laattana, sekä
tuotannon oma **lohkorajakoe**) kolmelle koodille ja neljälle alalle.
Edellisen erän ala (arkin sarake 8, rivi 2) on tyhjää ulappaa eikä
sisällä yhtään reittiä, joten valitsin alat, joilla reittejä on:

| ala | koodi | sauma: eroavia / pahin | **lohkoraja: pahin** |
| --- | --- | --- | --- |
| z5 Korea | alku (main) | 8 054 (0,19 %) / 13 | **9** |
| | edellinen erä | 7 922 (0,19 %) / 13 | **9** |
| | **tämä erä** | 11 793 (0,28 %) / 13 | **11** |
| z5 Egeanmeri | alku | 8 812 (0,21 %) / 8 | **8** |
| | edellinen erä | 4 860 (0,12 %) / 8 | **8** |
| | **tämä erä** | 7 068 (0,17 %) / 10 | **8** |
| z7 Korea | alku | 4 415 (0,11 %) / 13 | **13** |
| | edellinen erä | 4 541 (0,11 %) / 13 | **13** |
| | **tämä erä** | 4 520 (0,11 %) / 13 | **13** |
| z7 Egeanmeri | alku | 2 756 (0,07 %) / 5 | **5** |
| | edellinen erä | 2 531 (0,06 %) / 5 | **5** |
| | **tämä erä** | 2 588 (0,06 %) / 5 | **5** |

**Ratkaiseva luku on lohkoraja** — tuotannon oma tilanne, kaksi
samankokoista vierekkäistä lohkoa, joiden nurkat eroavat kokonaisella
pikselimäärällä. Siinä pahin kanavaero on **13, 8, 5 ja 11** eli sama
kuin ennen muutosta yhtä lukuun ottamatta (z5 Korea 9 → 11). Erot
eivät kasaudu laattarajalle: z5 Koreassa 110 eroa 11 793:sta eli
**0,9 %** on rajalla, kun työkalun oma varoitusraja on 50 %.

Eroavien pikselien määrän kasvu (7 922 → 11 793) on odotettu ja
selittyy: jokaisella katkolla on kaksi pyöreää päätä, joten
vektorireunoja on moninkertaisesti enemmän kuin yhtenäisellä viivalla,
ja niillä kelluvan pisteen pyöristys näkyy. Uutta saumamekanismia ei
ole.

**Varaus, sama kuin edellisessä erässä:** koe ajettiin
kaaviotaustalla, koska raaka-aineistoa ei ole kontissa. Virallinen luku
saadaan `node tools/generoi-laattapyramidi.mjs <kansio> --data
<aineisto> --saumatesti` oikealla aineistolla ennen tuotantoajoa — ja
**suosittelen ajamaan sen alueella, jolla on reittejä** (`--alue`),
koska työkalun vakioala on ulappaa eikä koettele reittejä lainkaan.
Tämä on löytö, ei mielipide: kaikki kolme koodia antoivat vakioalalla
tavulleen saman tuloksen.

### 2.3 Helmet jäivät — ja tässä on yksi asia, joka sinun on tiedettävä

Helmet ovat paikallaan, samankokoisina, ja ne maalataan viivan päälle
viimeisenä paperinvärisellä täytöllä. Katkon mitta valittiin niin,
ettei helmi voi mennä katkosta: helmen halkaisija on 6,4 P ja lyhinkin
katko 8,8 P — katko on aina pitkänomainen ja helmi aina pyöreä.

**Mutta z2:lla ne alkavat sotkeutua, ja se on mitattu.** Askelvälit
lautayksiköistä laattapikseleiksi:

| taso | lyhin askelväli | p10 | mediaani |
| --- | --- | --- | --- |
| **z2** | **7,2 px** | **12,3 px** | 18,6 px |
| z3 | 14,5 px | 24,6 px | 37,2 px |
| z4 | 29,0 px | 49,2 px | 74,3 px |

Helmen ulkohalkaisija kehineen on 7,7 px. Kymmenesosalla z2:n
askelväleistä helmien väliin jää siis **4,6 px tai vähemmän — vähemmän
kuin lyhin katko (8,8 px)**. Niillä reiteillä uloin taso lukee
helminauhana eikä katkoviivana. Se näkyy katselukappaleen
ensimmäisessä ruudussa (z2, Australia): mantereen sisäverkko on
helmiä, ei katkoja.

**En poistanut enkä pienentänyt helmiä**, koska ne ovat omistajan oma
tilaus. Kolme vaihtoehtoa, jos se häiritsee:

1. **Helmille oma kynnys** — piirretään vasta kun askelväli on
   vähintään ~2,5 × helmen halkaisija, käytännössä z3:sta alkaen. z2 on
   maailmanäkymä, jossa askelmien laskeminen ei ole se, mitä pelaaja
   tekee. Yksi ehto piirtokoodissa; suosittelen tätä.
2. **Helmi pienemmäksi vain z2:lla** — rikkoo paperivakioperiaatteen
   (painojälki on joka tasolla samanlevyinen), en suosittele.
3. **Jätetään** — z2:lla verkko on joka tapauksessa tiheä, ja
   helminauha on kartografisesti kelvollinen merkintä.

---

## 3. Kontrasti — luvut ennen ja jälkeen

### Menetelmä (sama kaikille kolmelle koodille)

Weberin kontrasti `(paperi − tummin pikseli) / paperi` Rec. 709
-luminanssista, **renderöidyistä laatoista**: näyte reitin murtoviivalta
2 px välein, jokaisessa näytteessä poikkileikkaus kohtisuoraan ±12 px
(askel 0,5 px, bilineaarinen), **paperi** = mediaani etäisyyksillä
7…12 px (paikallinen tausta, siis meri meressä ja maa maalla),
**muste** = pienin luminanssi etäisyyksillä ≤ 3,5 px. Helmen ympäristö
(≤ 6 px askelmasta) jätetään pois. Taulukossa on **mediaani**.

**Sama ala, samat laatat, kolme koodia** — ja koodit tulevat gitistä
(`git archive`), joten vertailu ei nojaa muistiin:

- **alku** = `fda3c08f` eli main ennen eilistä erää (se näkymätön viiva,
  josta valitettiin)
- **edellinen erä** = `92583b30` eli eilinen kontrastinnosto
- **tämä erä** = tämä koodi

### Egeanmeri (samat ruudut kuin edellisessä erässä)

| taso ja laji | alku | edellinen erä | **tämä erä** | n |
| --- | --- | --- | --- | --- |
| z3 maa | 0,180 | 0,326 | **0,231** | 1 900 |
| z3 meri | 0,276 | 0,435 | **0,362** | 743 |
| z3 lento | 0,158 | 0,302 | **0,207** | 881 |
| z5 maa | 0,176 | 0,314 | **0,220** | 242 |
| z5 meri | 0,264 | 0,428 | **0,356** | 552 |
| z5 lento | 0,135 | 0,305 | **0,209** | 143 |
| z7 meri | **0,254** | 0,423 | **0,341** | 478 |

### Korea (toinen ala, varmistukseksi)

| taso ja laji | alku | edellinen erä | **tämä erä** |
| --- | --- | --- | --- |
| z2 maa | 0,166 | 0,337 | **0,222** |
| z2 meri | 0,257 | 0,432 | **0,339** |
| z4 maa | 0,180 | 0,351 | **0,243** |
| z4 meri | 0,285 | 0,427 | **0,365** |
| z6 maa | 0,171 | 0,316 | **0,222** |
| z6 meri | 0,260 | 0,435 | **0,357** |
| z7 maa | 0,186 | 0,326 | **0,236** |
| z7 meri | 0,263 | 0,440 | **0,363** |

**Jokainen luku on 1,25…1,55-kertainen lähtötilaan nähden** ja
0,69…0,86-kertainen eiliseen. Se on juuri se, mitä pyydettiin:
himmeämpi kuin eilen, muttei paluuta siihen, mikä oli näkymätöntä.

### Kaksi asiaa, joissa olen eri mieltä edellisen erän luvuista

**1. Mittasin uudestaan enkä luottanut edellisen erän lukuihin, ja
tulos on eri asteikolla.** Edellinen raportti antoi z7 merireitille
lähtötilassa **0,064** ja `n = 7`. Minun tiheämmällä otannalla sama
lähtötila on **0,254** ja `n = 478…509`. Ero ei ole ristiriita vaan
otos: seitsemän näytettä osui ilmeisesti yhteen kohtaan, jossa tumma
ulappa syö kontrastin kokonaan. **Vertailukelpoisia ovat vain saman
menetelmän luvut**, ja siksi mittasin kaikki kolme koodia uudestaan.
Jos haluat alkuperäisen asteikon: tämän erän jakauman alin kymmenys on
0,05…0,08 (välit) ja lähtötilan 0,17…0,21, mutta niitä ei kannata
verrata keskenään, koska katkoviivan alin kymmenys on määritelmän
mukaan väliä eikä viivaa.

**2. Yksikään taso ei jää alle lähtötilan.** Se oli ohjeen ehto ja se
täyttyy joka rivillä.

### Peitto (kuinka suuri osa reitistä on mustetta)

Katkon pituus on keskimäärin 67 % jaksosta; pyöreät päät lisäävät noin
pikselin kumpaankin päähän, joten mitattu peitto renderöidyistä
laatoista on **0,77…0,93**. Vertailuksi: lähtötilassa maalla ja
merellä 0,90…1,00 ja lennolla (joka oli jo katkoviiva) 0,56…0,73;
edellisessä erässä maalla ja merellä 0,99…1,00 ja lennolla 0,72…0,97.
Ero *kokonaisen* viivan ja tämän välillä on siis noin 15
prosenttiyksikköä mustetta vähemmän — sen päälle 20 %:n alfan lasku.

---

## 4. Katselukappale — mitä siinä on

`reitit-zoomtasot.png`, 1536 × 1872 px, **922 kt**:

1. **z2…z7 kuutena ruutuna**, jokainen 512 × 512 laattapikseliä 1:1.
   Ruutu on haettu koneellisesti: reittien näytteet lasketaan
   laatoittain ja valitaan se laatta, jossa kaikki kolme lajia ovat
   mahdollisimman tasaisesti edustettuina. **Kaikilla tasoilla löytyi
   kolmen lajin ruutu**, joten punaisia puuttumismerkintöjä ei ole.
   Alat: z2 Australia, z3 Etelä-Afrikka, z4 Tasmaninmeri, z5 Korea,
   z6 Tyrrhenanmeri, z7 Soulin seutu.
2. **Ennen/jälkeen z7 Kreetalta** samasta ruudusta: vasemmalla eilinen
   yhtenäinen viiva, oikealla tämän erän katkoviiva.
3. **Lukutaulukko** kolmannen rivin kolmannessa ruudussa (§3:n
   Egeanmeren luvut).
4. **Selite** kolmesta lajista.

**Rehellisyysvaraus, joka lukee myös kuvassa:** tausta on kaavio eikä
lopullinen maasto. Kontissa ei ole pyramidin raaka-aineistoa (Natural
Earth 10m + ETOPO), joten rantaviiva on repossa valmiina olevasta
`ne50.geojson`:sta (PD, Natural Earth 50m) ja maasto on tasainen.
**Paperi, patina, kehys, projektio, arkkikoordinaatit ja reittien
piirto ovat oikeaa moottoria** — arvioitava asia eli viivat on siis
aitoa jälkeä, tausta ei ole. Uutta edelliseen arkkiin verrattuna: karsin
taustasta maiden väliset rajat (ne50 on maapolygoneja, ja jokainen
sisämaan raja piirtyi rantaviivana), joten kaavio ei enää sotke silmää.

**Tiedostokoko:** arkki on paletti-PNG (256 väriä mediaanijaolla,
järjestetty 4 × 4 tärinä). Totuusvärisenä sama arkki olisi 3,4 Mt,
koska paperin rae pakkautuu huonosti. **Pikseleitä ei ole skaalattu**
eikä ruutuja rajattu — vain väriavaruus on pakattu, eikä ero näy
käyttökoossa (vertasin).

---

## 5. Mitä jäi tekemättä ja miksi

- **Helmen oma kynnys z2:lla** (§2.3) — sanoin sen ja ehdotin
  ratkaisun, en tehnyt sitä. Helmet ovat omistajan tilaus, eikä niitä
  kosketa ilman päätöstä.
- **Virallinen `--saumatesti` oikealla aineistolla** — raaka-aineistoa
  ei ole kontissa. Ajoin vastaavan kokeen kaaviotaustalla kolmelle
  koodille ja neljälle alalle (§2.2). **Huomio työkaluun:** sen vakioala
  (sarake 8, rivi 2) on ulappaa, jolla ei ole yhtään reittiä — se ei siis
  koettele reittipiirtoa lainkaan. Kannattaa joko siirtää vakioala tai
  ajaa `--alue`-rajauksella.
- **Pyramidiajo ja versionosto** — ohjeen mukaan omistaja päättää.
- **Havainto ohimennen, en korjannut:** z2:n tiheys, josta edellinen
  raportti huomautti, on nyt hitusen parempi (katkoviiva ja himmeämpi
  muste), mutta helminauha (§2.3) korvasi osan siitä. Jos z2 halutaan
  ilmavammaksi, helmikynnys ratkaisee molemmat kerralla.

# Opus → Fable: sentripetaalinen käyrä ja 41 vesireittiä (haara claude/reitit-kasin)

Omistajan kaksi päätöstä 31.8.2026 toteutettu. **Ei PR:ää, ei
versionostoa, ei pyramidiajoa.** Muutetut tiedostot:

| tiedosto | mitä |
| --- | --- |
| `js/rules.js` | `densify` yhtenäisestä Catmull-Romista **sentripetaaliseksi** (alpha 0,5) |
| `js/packs/maailmankartta.js` | 41 maareitille `via`-pisteet; `sitka\|vancouver` uudelleen `korjaa-merireitit.mjs`:llä |
| `js/packs/middleeast.js` | `masqat\|dubai`-merireitin yksi välipiste 4 yksikköä länteen |
| `tools/fokuskartta/sisalto.mjs` | laatta piirtää **saman käyrän jota peli kävelee** (solmupolku pois) |
| `tools/fokuskartta/maailmapiirto.js` | käsin piirretty heitto ankkuroitu SOLMUIHIN, ei pehmennyspisteisiin |

Raamattu, tarina, isoisän raamattu, `js/fokusnosto-symbolit.js`,
`js/fokusniput.js` ja `js/laattapyramidi.js` **koskematta**. Askelmien
määrää (`steps`) ei muutettu yhdelläkään reitillä, reittejä ei poistettu
eikä kaupunkeja yhdistetty uudella tavalla — **ei yhtään `type`-muutosta**
(perustelu §3).

Portit: `node --test tests/*.test.mjs` → **# pass 1047, # fail 0**
(1 skip, sama kuin mainissa); `node tools/tarkista-kaksoisavaimet.mjs`
→ ei kaksoisavaimia; `node tools/build-standalone.mjs` → ok. `dist/` ja
`node_modules` poistettu ennen committia.

**Katselukappale: `reitit-zoomtasot.png`** haaran juuressa,
committoimatta. z2…z7, jokainen ruutu 512 × 512 laattapikseliä 1:1 ja
haettu koneellisesti niin että kaikki kolme reittilajia osuu siihen
(punaisia puuttumismerkintöjä ei tarvittu — jokaisella tasolla löytyi
kolmen lajin ruutu). Lisäksi kaksi ennen/jälkeen-paria: **Ateenan
eteläpuolen S** ja **New Orleans–Miami**.

---

## 1. Päätös 1 — sentripetaalinen Catmull-Rom (TEHTY, mitattu)

`js/rules.js densify` laskee segmentin nyt kuutiollisena
Bézier-käyränä, jonka ohjauspisteet tulevat naapurietäisyyksien
neliöjuurista — **rivi riviltä sama kaava kuin jokien
`lautaKaari`ssa** (maailmapiirto.js). Pistemäärä ja `perSpan` eivät
muuttuneet, joten mikään muu ei liikkunut.

### Kaksi pyydettyä lukua

| mitta | ennen | jälkeen |
| --- | --- | --- |
| **reittejä jotka leikkaavat itsensä** | **2** (`sisilia\|ateena` (6614, 1954), `anchorage\|vancouver` (1500, 1317)) | **0** |
| **laatan ja pelin polun ero** | mediaani 0,26 · p90 3,71 · max **38,35** lautayksikköä | **0** |

Ero on **täsmälleen nolla eikä likimain nolla**, ja syy on
rakenteellinen eikä mittaustarkkuus: `sisalto.mjs` ei enää johda omaa
polkuaan vaan antaa piirrolle saman `edge.poly`-taulukon, jota
`js/ui.js` ja `pixelOf` lukevat. Mitattuna 408 reittiä, 24 409 pistettä,
suurin poikkeama 0 — eri mittaisia polkuja 0 kappaletta.
Askelmahelmen suurin etäisyys omasta viivastaan on **1,8·10⁻¹²**
lautayksikköä eli kelluvan pisteen kohina.

Itseleikkaus mitattiin janapareittain koko murtoviivasta (kaikki
408 reittiä, ei otos).

### Miksi tämä kumoaa aiemman tulkinnan — ja miksi jälki säilyy

Edellinen erä piirsi solmupolun eli luotisuorat janat. Se poisti
silmukat mutta **oireena**: silmukat syntyivät epätasavälisten
`via`-jonojen ja alpha 0:n yhteispelistä, ja sentripetaalinen
parametrointi on todistetusti vapaa silmukoista ja kärjistä. Nyt
korjattu on syy, ja käyrä sai jäädä.

**Käsin piirretty jälki ei kadonnut, mutta se piti ankkuroida
uudelleen.** Heitto (0,35 paperipikseliä) arvottiin ennen jokaiselle
piirtopisteelle. Käyrällä niitä on neljätoista jokaista väliä kohti,
joten sama arvonta olisi tehnyt viivasta rosoista kohinaa eikä kynän
vapinaa. Nyt heitto arvotaan **solmuille** ja liukuu niiden välillä
smoothstepillä — vapina on solmun mitassa, kuten käsi vapisee.
Päätesolmut eivät heitä (kolme reittiä samasta kaupungista lähtee
samasta pisteestä), ja kynänpaine vaihtelee yhä reitistä toiseen.
Solmujen indeksit tulevat `sisalto.mjs`:stä, joka tarkistaa ne pakasta
riippumatonta odotusarvoa vasten ja varoittaa lokissa, jos `perSpan`
joskus muuttuu. Poikkeamia nyt 0/408.

### Merireitit, jotka käyrän muutos siirsi

Käyrän muoto muuttui, joten `via`-pisteet jotka oli kalibroitu vanhaa
käyrää vasten piti tarkistaa. **Kaksi reittiä siirtyi maalle ja
molemmat on korjattu:**

- `sitka|vancouver` — ajoin `node tools/korjaa-merireitit.mjs
  maailmankartta`: 2 → 12 välipistettä. Työkalu raportoi lisäksi
  `nikosia|kairo`: EI RATKENNUT, mutta se **ei ole uusi eikä tämän
  erän aiheuttama** — reitti läpäisee pelin oman testin sekä ennen
  että jälkeen; työkalun oma kelpuutus (1 yksikön askel) on testiä
  tiukempi ja on hylännyt sen jo aiemmin. Jätin sen rauhaan, koska
  koskeminen olisi muuttanut reittiverkkoa ilman vikaa.
- `masqat|dubai` (**middleeast-lähdelauta**, ei maailmankartta) —
  `tests/rules.test.mjs` kaatui kohtaan t = 0,50: uusi käyrä vei
  viivan Musandamin niemen yli. `korjaa-merireitit.mjs` ei osaa
  kirjoittaa tähän pakkaan (rivimuoto on eri kuin JSON-rivit), ja
  työkalun ehdotus olisi ollut välipisteiden POISTO — mikä olisi
  vetänyt suoran niemen yli, koska satamavyöhykkeet (55 + 55) peittävät
  89 yksikön reitistä lähes kaiken. Etsin sen sijaan pienimmän siirron,
  joka vie reitin veteen testin omalla mitalla: **yksi välipiste 818 →
  814**, neljä yksikköä länteen. Muut 107 merireittiä olivat kunnossa.

---

## 2. Päätös 2 — vesireitit (41 korjattu, tehty)

### Mitä mitattiin ja millä

Edellisen erän "37 maareittiä 297:stä" on tässä erässä mitattu
uudelleen tarkemmin. Mitta on **pisin YHTENÄINEN vesijakso
lautayksiköinä** (1 yks ≈ 3,3 km) reitin omalta piirretyltä viivalta,
näyte 1,5 yksikön välein, ja maa/meri luetaan **pakan omista
ääriviivoista** (`js/mapart.js isOnLand`) — samoista, joita peli
piirtää, testi tutkii ja `korjaa-merireitit` käyttää. Prosenttiosuus on
koko reitin vedessä oleva osuus.

Kynnykseksi otin **20 yksikköä (66 km)**: sitä lyhyemmät ovat
rantaviivan pyöristystä eivätkä kartalla erottuva vika. Kynnyksen
ylitti **41 maareittiä 297:stä** (edellisen erän 37 vastaa tässä
mitassa noin 29 yksikön kynnystä — sama lista, eri raja).

**Lopputulos: 41 → 1.** Ainoa yli 20 yksikön jäljelle jäävä on
`berliini|kobenhavn` (25,5), ja se on Itämeren lautta — perustelu §3.

### Miten välipisteet laskettiin

En arvannut yhtään pistettä. Kirjoitin `tools/merireitit.mjs`:n
peilikuvan (A* ruudukossa, jossa este on VESI eikä maa; sama
portaittainen tarkennus, sama Douglas-Peucker-pelkistys ja **sama
kelpuutus pelin omalla `edgePolyline`-viivalla**) ja ajoin sen jokaiselle
41 reitille. Sen päälle tuli **ahne karsinta**: pisteitä poistetaan
yksitellen niin kauan kuin viiva pysyy maalla. Ilman sitä työkalu
jäljitti rantaviivaa 39 pisteellä; karsinnan jälkeen **38 reittiä
41:stä pärjää yhdellä välipisteellä ja loput kolme kahdella**. Se on
sekä käsin piirretyn näköistä että pakalle kevyttä.

Työkalu on **worktreen ulkopuolella** (kertakäyttöinen analyysiskripti,
ei repossa). Jos haluat siitä pysyvän `tools/korjaa-maareitit.mjs`:n ja
sitä vastaavan testin — edellinen raportti ehdotti sitä §5:ssä — se on
oma pieni eränsä, ja alla oleva taulukko on sen väliaikainen korvaaja.

### Taulukko: kaikki 41 reittiä

Sarakkeet: vesiosuus / pisin yhtenäinen vesijakso ENNEN → JÄLKEEN,
välipisteiden määrä, ja mihin ne osuvat.

| reitti | ennen | jälkeen | via | välipisteet ja perustelu |
| --- | --- | --- | --- | --- |
| `chennai\|kolkata` | 75,4 % / 281,5 | 0,3 % / 1,4 | 1 | 79,6 °E 16,0 °N, Deccanin sisämaa. Suora kulki Bengalinlahden yli; Koromandelin rannikon maatie on ollut olemassa aina. |
| `neworleans\|miami` | 82,2 % / 268,9 | **0 %** | 2 | 89,3 °W 30,9 °N (Mississippin rannikko) ja 82,1 °W 29,3 °N (Floridan niemimaa). Ks. §3. |
| `bangkok\|singapore` | 64,5 % / 268,3 | **0 %** | 2 | 99,8 °E 13,5 °N ja 98,9 °E 9,6 °N: Kran kannas ja Malakan niemimaa. Suora kulki Thaimaanlahden yli. |
| `kalgoorlie\|adelaide` | 49,2 % / 240,5 | **0 %** | 1 | 138,3 °E 32,2 °S, Spencerinlahden pohjukka (Port Augusta). Suora oikaisi Ison Australianlahden yli. |
| `kolkata\|yangon` | 64,2 % / 206,9 | 1 % / 2,8 | 1 | 91,8 °E 23,5 °N, Bengalinlahden pohjukka (Chittagong). Sieltä Arakanin rannikkoa etelään. |
| `tripoli\|kairo` | 33,9 % / 206,4 | **0 %** | 1 | 18,5 °E 29,8 °N, Sidran lahden eteläpuoli. Karavaanitie kiersi lahden sisämaan kautta, ei rantaa pitkin. |
| `tanger\|karthago` | 45,1 % / 203 | **0 %** | 1 | 3,9 °W 34,7 °N, Atlas-käytävä. Suora kulki Välimeren yli Algerian pohjoispuolelta. |
| `mexico\|merida` | 60,4 % / 197,7 | **0 %** | 1 | 92,8 °W 17,8 °N, Tehuantepecin kannas. Suora ylitti Campechen lahden. |
| `halifax\|labrador` | 51,1 % / 192,2 | 2,3 % / 5,7 | 2 | 65,9 °W 46,7 °N (New Brunswick) ja 71,2 °W 48,5 °N (Saguenay). Nova Scotia on kiinni mantereessa Chignecton kannaksella. |
| `exmouth\|broome` | 51,4 % / 150,5 | 0,9 % / 2,8 | 1 | 121,0 °E 20,4 °S, Pilbaran sisämaa. |
| `managua\|panama` | 55 % / 135 | **0 %** | 1 | 82,2 °W 8,8 °N, Costa Rican ja Panaman raja. Suora kulki Karibialla. |
| `pietari\|helsinki` | 72,8 % / 130,2 | **0 %** | 1 | 29,1 °E 61,0 °N, Karjalan kannas (Viipurin seutu). Ks. §3. |
| `peking\|soul` | 63,9 % / 128,4 | **0 %** | 2 | 121,7 °E 41,5 °N (Shanhaiguan) ja 125,7 °E 40,0 °N (Yalu). Kierto Bohain ympäri Liaodongin kautta. |
| `nome\|anchorage` | 25,4 % / 127,4 | 0,4 % / 2,5 | 1 | 160,8 °W 65,4 °N, Sewardin niemimaan sisämaa. Suora ylitti Nortoninlahden. |
| `doha\|dubai` | 88,1 % / 112,3 | **0 %** | 2 | 51,1 °E 23,7 °N ja 54,7 °E 23,7 °N: Qatarin niemen tyvi ja Liwan aavikko. Rannikkokaravaanitie oli olemassa; suora kulki Persianlahdella. |
| `karthago\|tripoli` | 47,2 % / 107,3 | **0 %** | 2 | 10,3 °E 33,2 °N ja 12,5 °E 32,2 °N: Gabèsin lahden kierto Tripolitaniaan. |
| `broome\|darwin` | 29 % / 90,3 | **0 %** | 1 | 130,0 °E 15,8 °S, Kimberleyn ja Pohjoisterritorion raja. |
| `soul\|vladivostok` | 49 % / 80,7 | **0 %** | 1 | 127,0 °E 40,1 °N, Pohjois-Korea. Suora kulki Japaninmerellä. |
| `lagos\|kamerun` | 50 % / 76,9 | **0 %** | 1 | 8,8 °E 5,5 °N, Cross Riverin seutu Nigerin suistosta pohjoiseen. Ks. §3. |
| `christchurch\|dunedin` | 70,5 % / 64,7 | **0 %** | 1 | 170,1 °E 45,0 °S, Otagon sisämaa. Sama saari; suora oikaisi rannikon kuperan kohdan yli. |
| `marseille\|barcelona` | 42,8 % / 62,6 | **0 %** | 1 | 3,1 °E 43,8 °N, Languedoc (Narbonne). Suora ylitti Lioninlahden. |
| `oslo\|kobenhavn` | 44 % / 61,4 | 1,1 % / **2,7** | 2 | 13,1 °E 56,4 °N (Skåne) ja 12,4 °E 55,9 °N (Sjællandin pohjoiskärki). Ks. §3 — ylitys siirtyi Kattegatista Juutinraumaan. |
| `sofia\|ateena` | 37,1 % / 61,3 | 1,3 % / 2,7 | 1 | 22,2 °E 39,7 °N, **Thessalia (Larissan seutu)** — juuri se historiallinen maatie Thessalonikin ja Larissan kautta, jonka edellinen raportti nimesi. Thermaikoksen lahti ja Euboian salmi jäävät itään. |
| `berliini\|kobenhavn` | 40,8 % / 56,5 | 32,2 % / 25,5 | 2 | 13,2 °E 53,1 °N ja 11,9 °E 54,1 °N (Mecklenburgin rannikko). Ks. §3 — ylitys siirtyi Itämeren poikki lyhimpään lauttaväliin. |
| `townsville\|cairns` | 38,7 % / 53,5 | **0 %** | 1 | 145,9 °E 19,3 °S, Queenslandin sisämaa. |
| `yangon\|bangkok` | 29,8 % / 51 | **0 %** | 1 | 97,2 °E 17,9 °N, Mon ja Thaimaan raja. Suora ylitti Martabaninlahden. |
| `panama\|bogota` | 18,9 % / 45,4 | 0,5 % / 1,3 | 1 | 77,9 °W 8,7 °N, Darién. |
| `lontoo\|pariisi` | 31,7 % / 45,1 | 10,4 % / **16,8** | 1 | 1,8 °E 50,9 °N, Calais'n seutu. Ks. §3 — ylitys siirtyi Doverin salmeen. |
| `vancouver\|sanfrancisco` | 12,5 % / 43,3 | 0,6 % / 3 | 1 | 121,9 °W 49,0 °N, Kaskadien sisämaa. Suora kulki Georgian salmen ja Puget Soundin yli. |
| `tallinna\|riika` | 26,8 % / 41,7 | **0 %** | 1 | 24,9 °E 57,1 °N, Pärnun sisämaa. Suora ylitti Riianlahden. |
| `hanoi\|hongkong` | 19 % / 41,7 | **0 %** | 1 | 113,2 °E 23,6 °N, Guangdongin sisämaa. Suora ylitti Tonkininlahden. |
| `auckland\|wellington` | 45,1 % / 41,2 | 1,7 % / 3 | 1 | 175,5 °E 39,3 °S, Pohjoissaaren keskiosa. |
| `montreal\|halifax` | 13,4 % / 40,1 | 0,7 % / 2,6 | 2 | 73,2 °W 45,9 °N ja 64,5 °W 46,1 °N (Northumberlandin salmen ranta). Suora ylitti Fundynlahden. |
| `kappalmas\|kumasi` | 23,9 % / 38,7 | **0 %** | 1 | 3,8 °W 5,7 °N, Norsunluurannikon sisämaa. |
| `kioto\|tokio` | 18,4 % / 34,5 | **0 %** | 1 | 134,2 °E 35,0 °N, Honshun pohjoisrannikko. Suora kulki Seton sisämeren yli. |
| `jakutsk\|magadan` | 4,5 % / 31,8 | **0 %** | 1 | 144,4 °E 61,8 °N, Kolyman ylänkö. Suora sipaisi Ohotanmerta. |
| `istanbul\|izmir` | 24,3 % / 28,6 | 2,6 % / 3,2 | 1 | 29,8 °E 40,7 °N, Bursan seutu. Marmaranmeren kierto etelästä. |
| `asuncion\|buenosaires` | 9,4 % / 27,7 | **0 %** | 1 | 59,1 °W 33,7 °S, Paranán länsipuoli. |
| `yellowknife\|churchill` | 3,5 % / 25,1 | **0 %** | 1 | 94,6 °W 57,9 °N, Manitoba Churchillista etelään (Hudsoninlahti). |
| `kuwait\|persepolis` | 12,7 % / 24,4 | **0 %** | 2 | 47,2 °E 29,1 °N ja 48,7 °E 30,9 °N: Persianlahden pohjukan kierto Basran kautta. Ainoa reitti, jolla oli jo `via` (2 → 2). |
| `cooberpedy\|adelaide` | 10 % / 24,2 | **0 %** | 1 | 137,6 °E 31,6 °S, Spencerinlahden pohjukka. |

**Yhteensä 41 reittiä, 46 uutta välipistettä.** 30 reittiä on nyt
täysin kuivalla (0 %); yhdeksällä jää 1,3–5,7 yksikköä, mikä on pakan
oman rantaviivan karkeutta eikä kartalla erottuvaa; kaksi (`lontoo|pariisi`
16,8 ja `berliini|kobenhavn` 25,5) ovat aitoja lauttavälejä.

---

## 3. Meritse vai maitse — omistajan kolme epäilystä ja se, mitä löysin

Käytin yhtä ratkaisusääntöä, ja se on mitattava eikä makuasia:
**`type: 'sea'` vain jos maatietä EI OLE.** Syy on mekaaninen ja
löytyi koodista: `js/rules.js stepsFrom` suodattaa `if (e.type !== mode)
continue`, joten meriksi muuttaminen **poistaa reitin maamatkustajan
verkosta**. Se muuttaa sitä, kuka on kenenkin naapuri MAITSE — eli
täsmälleen sitä, minkä ohje kielsi. Siksi jokainen tapaus, jolla on
yhtenäinen maayhteys, sai `via`-pisteen.

### Omistajan kolme epäilystä: kaikki kolme ovat maareittejä

**`pietari|helsinki` — MAA, ja tämä on vahvin tapaus koko listalla.**
Riihimäki–Pietari-rata avattiin **11.9.1870**, eli Helsingistä
Pietariin pääsi vuonna 1873 junalla Riihimäen, Lahden ja Viipurin
kautta. Maayhteys on lisäksi katkeamaton Karjalan kannaksen yli.
Yksi välipiste (29,1 °E 61,0 °N ≈ Viipuri) vie reitin kannakselle ja
vesiosuus putoaa 72,8 %:sta **nollaan**. Laivayhteyskin oli olemassa,
mutta pakan reitti on maareitti eikä sitä tarvitse muuttaa
kertoakseen totuuden.

**`neworleans|miami` — MAA.** Yhdysvaltain Meksikonlahden rannikko on
katkeamatonta maata, ja vuonna 1873 sillä kulki rautatie: New Orleans–
Mobile valmistui 1870, ja Floridassa oli Jacksonville–Lake City–
Tallahassee-yhteys. (Miami itse on anakronismi — kaupunki perustettiin
1896 — mutta se on pakan valinta eikä tämän erän asia.) Kaksi
välipistettä vie reitin rannikkoa pitkin niemimaalle: 82,2 % → **0 %**.
Tämä on `reitit-zoomtasot.png`:n toinen ennen/jälkeen-pari.

**`lagos|kamerun` — MAA, mutta tämä on listan tulkinnanvaraisin.**
Nigerin suisto on 1873 käytännössä kulkukelvoton, ja Lagosista
Kameruniin matkustettiin höyrylaivalla rannikkoa pitkin. Maayhteys on
silti katkeamaton suistosta pohjoiseen (Yorubamaa → Cross River →
Kamerun), ja yksi välipiste (8,8 °E 5,5 °N) vie reitin sitä kautta:
50 % → **0 %**. Reitillä on `steps: 1`, eli peli tulkitsee sen jo nyt
yhdeksi hypyksi. **Jos haluat tästä merireitin, se on yhden kentän
muutos** — mutta silloin Lagos ja Kamerun eivät ole enää naapureita
maitse, ja se on sinun ja omistajan päätös eikä minun.

### Kolme tapausta, joilla maatietä EI ole — ja mitä tein niille

Nämä eivät olleet omistajan listalla mutta ovat sen looginen loppu:
**Sjælland ja Britannia ovat saaria.** A* ei löytänyt niille
maayhteyttä millään ruudun koolla aina 2 yksikköön asti.

| reitti | mitä tein | ennen → jälkeen | mikä ylitys nyt on |
| --- | --- | --- | --- |
| `lontoo\|pariisi` | via 1,8 °E 50,9 °N | 45,1 → **16,8** | Doverin salmi, eli vuoden 1873 Dover–Calais-postilaiva |
| `oslo\|kobenhavn` | via Skåne + Sjællandin pohjoiskärki | 61,4 → **2,7** | Juutinrauma Helsingborgin ja Helsingørin välissä (kapein kohta) |
| `berliini\|kobenhavn` | via Brandenburg + Mecklenburgin rannikko | 56,5 → **25,5** | Mecklenburgin lahti, eli Warnemünde–Gedser-lauttaväli |

**En muuttanut niiden `type`-kenttää, enkä suosittele sitä ilman
omistajan erillistä päätöstä.** Seuraus olisi iso: Lontoo ja Edinburgh
jäisivät maamatkustajalle saareksi, josta pääsee pois vain laivalla ja
vain jos rahat riittävät (`SEA_FEE` 100), ja sama koskisi Kööpenhaminaa,
joka ei ole pakan `islands`-listalla. Se on pelisuunnittelua eikä
kartan korjaamista. Nykyisellä korjauksella **kuva kertoo totuuden
ilman mekaniikan muutosta**: viiva ylittää veden siitä kapeimmasta
kohdasta, josta 1873 mentiin lautalla.

`berliini|kobenhavn` on ainoa, joka jää yli 20 yksikön. Kokeilin myös
Jyllannin ja Fynin kautta kiertävää tietä (kaksi lyhyttä
salmiylitystä): pakan omalla rantaviivalla se on **58,5 yksikköä**
vettä eli selvästi huonompi, koska Fyn ja Sjælland eivät ole siinä
erikseen ratkaistuja. 25,5 on paras saatavilla oleva.

### Rajan alle jäävät, joita en koskenut (raportoitu, ei korjattu)

Kynnyksen (20 yks) alle jää kahdeksan reittiä, joilla on 10–18
yksikköä yhtenäistä vettä. Ne ovat kaikki oikeita, tunnistettavia
kapeikkoja eivätkä virheitä: `jerusalem|kairo` (17,5) ja `siinai|kairo`
(17,3) ylittävät **Suezin kannaksen ja kanavan** — kanava avattiin 1869,
ja Qantaran lautta on ajan mukainen; `iguazu|buenosaires` (17,2) ja
`portoalegre|buenosaires` (15,5) ylittävät **Paranán ja Uruguayn**;
`tukholma|kobenhavn` (12,5) on **Juutinrauma**; `labrador|iqaluit`
(12,5) on **Belle Islen salmi**. Jos haluat nekin siistiksi, sanon
etukäteen että kolme niistä on samaa saarikysymystä kuin §3:n taulukko.

---

## 4. Katselukappale — mitä kuvassa on ja mitä siinä EI ole

`reitit-zoomtasot.png` (haaran juuressa, committoimatta):

1. **z2–z7, kuusi ruutua.** Jokainen 512 × 512 laattapikseliä 1:1,
   ei suurennosta. Ruutu on haettu koneellisesti: reittien näytteet
   lasketaan laatoittain ja valitaan se laatta, jossa kaikki kolme
   lajia ovat mahdollisimman tasaisesti. Kaikilla tasoilla löytyi
   kolmen lajin ruutu, joten punaisia puuttumismerkintöjä ei ole
   yhtään — koodi silti tekee ne, jos jokin laji puuttuu.
2. **Selite** kolmesta lajista: maa (ruskea, helmet), meri
   (preussinsininen, helmet), lento (sinooperi, katkoviiva, ei helmiä).
3. **Ateenan eteläpuoli, ennen/jälkeen**, z7 (512 px = 71
   lautayksikköä), punainen rengas silmukan kohdassa (6614, 1954).
   Vasemmalla vanha käyrä leikkaa itsensä, oikealla ei. **Muste ja
   viivanleveys ovat molemmissa uudet**, jotta erona on vain geometria.
4. **New Orleans–Miami, ennen/jälkeen**, z4 (512 px = 569 yks).

**Rehellisyysvaraus, joka lukee myös kuvassa:** tausta on kaavio eikä
lopullinen maasto. Kontissa ei ole pyramidin raaka-aineistoa (Natural
Earth 10m + ETOPO), joten rantaviiva on repossa valmiina olevasta
`ne50.geojson`:sta (PD, Natural Earth 50m) ja maasto on tasainen.
**Paperi, patina, kehys, projektio, arkkikoordinaatit ja reittien
piirto ovat oikeaa moottoria** (`tools/fokuskartta/maailmapiirto.js`,
samat lukitut mitat kuin `generoi-laattapyramidi.mjs`:ssä) — arvioitava
asia eli viivat on siis aitoa jälkeä, tausta ei ole. Huomaa myös, että
ne50 on hitusen karkeampi kuin tuotannon 10m-aineisto: pikselintarkkaa
rantaviivan sivuamista ei tästä kuvasta kannata tuomita.

---

## 5. Saumat — ei rikottu, ja se on rakenteellista

Heitto lasketaan yhä REITIN TUNNUKSESTA (`r.siemen`, FNV-hash reitin
id:stä) ja **solmun järjestysluvusta** — ei pikselistä eikä laatan
nurkasta. Solmun järjestysluku on sama luku joka lohkossa, joka
laatalla ja joka ajolla, ja välipisteiden interpolointi on
deterministinen funktio siitä. Sauma on siis rakenteellisesti
poissuljettu, ei vain testattu. Reittien pistemäärä palasi
24 409:ään (edellinen erä oli pudottanut sen 2 174:ään), mikä on sama
kuin mainissa.

**En ajanut `--saumatesti`ä uudestaan**, koska sen ainoa mielekäs ajo
on oikealla aineistolla eikä sitä ole kontissa. Edellisen erän tulos
pätee yhä: lohkorajan pahin kanavaero oli **täsmälleen sama ennen ja
jälkeen** (11 z5:llä, 36 z7:llä). Suosittelen yhä
`node tools/generoi-laattapyramidi.mjs <kansio> --data <aineisto>
--saumatesti` oikealla aineistolla ennen tuotantoajoa.

---

## 6. Mitä jäi tekemättä ja miksi

- **Pysyvä `tools/korjaa-maareitit.mjs` + testi** maareiteille
  (`tests/rules.test.mjs`:ssä on jo pari merireiteille). Tämän erän
  välipisteet laskettiin sellaisella työkalulla, mutta pidin sen
  worktreen ulkopuolella, koska ohje rajasi muutokset via-pisteisiin ja
  `type`-kenttään. Suosittelen sitä omaksi eräkseen: se estäisi
  vastaavan ajautumisen jatkossa koneellisesti.
- **`nikosia|kairo`** ei ratkea `korjaa-merireitit`-työkalulla. Ei uusi
  eikä tämän erän aiheuttama (läpäisee pelin testin), joten jätin.
- **Kolmen saariylityksen `type`-muutos** (§3) — omistajan päätös.
- **Pyramidiajo ja versionosto** — ohjeen mukaan omistaja päättää.
- **Havainto ohimennen, en korjannut:** z2 on yhä tiheän näköinen
  (näkyy katselukappaleen ensimmäisessä ruudussa). Se on suora seuraus
  paksummasta musteesta; jos se häiritsee, lentoreiteille voi antaa
  oman ilmestymiskynnyksensä (nyt kaikki lajit ilmestyvät samalla
  kynnyksellä 0,22).

# Opus → Fable: reitit käsin piirretyiksi (haara claude/reitit-kasin)

Erä valmis, pushattu haaralle. **Ei PR:ää, ei versionostoa, ei
pyramidiajoa** (ohjeen mukaan). Muutettu tasan kaksi tiedostoa:
`tools/fokuskartta/sisalto.mjs` ja `tools/fokuskartta/maailmapiirto.js`.
`js/rules.js`, `js/packs/maailmankartta.js`, Raamattu, tarina ja
isoisän raamattu **koskematta**.

Portit: `node --test tests/*.test.mjs` → **# pass 1047, # fail 0**
(1 skip, sama kuin mainissa); `tarkista-kaksoisavaimet` → ei
kaksoisavaimia; `build-standalone` → ok. dist/ ja node_modules
poistettu ennen committia.

## 0. KATSELUKAPPALEET ENSIN — nämä pitää katsoa ennen ajoa

Haaran juuressa, **ei committoituna** (katselukappaleita):

| Tiedosto | Sisältö |
| --- | --- |
| `reitit-zoomtasot.png` | **Pääkuva.** z2…z7 allekkain, ennen/jälkeen rinnakkain. Jokaiselle tasolle on haettu erikseen ruutu, jossa on **kaikki kolme reittilajia** — siksi paikka vaihtuu tasolta toiselle. |
| `reitit-z2.png` … `reitit-z7.png` | Yksi taso per arkki, omistajan **omat kohteet**: Egeanmeri (Ateena), Adrianmeri (Dubrovnik), Pohjois-Afrikka (Tripoli) ja se piste, jossa vanha piirto teki silmukan. |

Kaikki ruudut ovat **512 × 512 laattapikseliä 1:1** — täsmälleen se
koko, jossa laatta näkyy pelaajan ruudulla, ei suurennosta. Jokaisessa
arkissa on selite (mikä viiva on mikä) ja punainen huomautus siitä, jos
jokin reittilaji ei osu kyseiseen ruutuun.

**Kaksi rehellisyysvarausta, jotka lukevat myös kuvissa:**

1. **Tausta on kaavio, ei lopullinen maasto.** Konttiin ei ole
   ladattuna pyramidin raaka-aineistoa (Natural Earth 10m + ETOPO),
   joten rantaviiva on repossa valmiina olevasta `ne50.geojson`:sta
   (PD) ja maasto tasainen. **Paperi, patina, kehys, projektio,
   arkkikoordinaatit ja reittien piirto ovat oikeaa moottoria** —
   arvioitava asia (viivat) on siis aitoa jälkeä, tausta ei ole.
2. **Kolme lajia samassa ruudussa ei onnistu joka paikassa.**
   `reitit-zoomtasot.png`:ssä onnistuu joka tasolla (haettu
   koneellisesti). Omistajan omissa kohteissa ei aina: z7:llä 512 px
   kattaa vain 71 lautayksikköä, ja esim. Adrianmeren ruudussa on vain
   merireitti. Se sanotaan kuvassa punaisella.

## 1. Tehtävä 1 — paksummaksi ja isommat helmet (TEHTY, mitattu)

| | ennen | jälkeen |
| --- | --- | --- |
| viiva | `1.1 * P` | `1.9 * P` |
| helmen säde | `2.4 * P` | `3.2 * P` |
| helmen kehä | `0.9 * P` | `1.3 * P` |
| lentoviiva | `0.9 * P` | `1.7 * P` |
| maan muste | `rgba(120,88,54,0.52)` | `rgba(120,88,54,0.80)` |
| meren muste | `rgba(32,60,98,0.56)` | `rgba(32,60,98,0.84)` |
| lennon muste | `rgba(150,54,40,0.50)` | `rgba(150,54,40,0.76)` |

**Sävy ei muuttunut, vain peittävyys** — sininen on yhä preussinsininen
(32,60,98) ja punainen poltettu sinooperi (150,54,40). Nostettu on
alfa, eli kynä painaa kovempaa samalla musteella. `P` on yhä
paperivakio, eli mitta pysyy ruudulla samana joka tasolla.

**MITATTU LUKUNA, ei silmällä.** Weberin kontrasti (paperi − viivan
tummin pikseli) / paperi, Rec. 709 -luminanssista, poikkileikkauksena
jokaisen reittijanan keskikohdan yli renderöidyistä laatoista:

| taso ja laji | ennen | jälkeen | n |
| --- | --- | --- | --- |
| z3 maa | 0,204 | **0,325** | 469 |
| z3 meri | 0,320 | **0,457** | 215 |
| z3 lento | 0,111 | **0,383** | 33 |
| z5 maa | 0,198 | **0,361** | 15 |
| z5 meri | 0,190 | **0,433** | 25 |
| z5 lento | 0,250 | **0,452** | 3 |
| z7 maa | 0,154 | **0,346** | 1 |
| z7 meri | **0,064** | **0,440** | 7 |
| z7 lento | 0,269 | **0,447** | 1 |

Pahin lähtöluku oli **merireitti z7:llä: 0,064** eli kuusi prosenttia
paperin kirkkaudesta — käytännössä näkymätön, ja juuri sitä omistaja
katsoi puhelimella. Nyt 0,440. Heikoin laji oli **lentoreitti z3:lla
(0,111)**; nyt 0,383.

Helmen ylärajan asetti tiheimmän askelvälin mittaus: z2:lla (ensimmäinen
taso, jolla reitit piirtyvät) lyhin väli on 5,6 px ja p10 11,4 px, joten
6,4 pikselin helmi erottuu naapuristaan kaikkialla paitsi muutamassa
tiheimmässä välissä. Isompi olisi tehnyt niistä yhtenäisen möykyn.

## 2. Tehtävä 3 — merireittien silmukat (TEHTY, juurisyy löytyi)

**Juurisyy ei ollut reitinhaku eikä solmujen järjestys.** Se on
`js/rules.js` `edgePolyline` → `densify`: **yhtenäinen Catmull-Rom
(alpha = 0)**, neljätoista pistettä jokaista väliä kohti. Se on täsmälleen
se spline-vaara, joka on jo kirjattu tähän repoon jokien kohdalla
(`maailmapiirto.js lautaKaari`): *"yhtenäinen Catmull-Rom yliampuu
terävissä mutkissa ja tekee silmukoita, kun pisteet ovat epätasavälein"*.
Ja epätasavälisiä ne ovat: `sisilia|ateena`-reitin `via`-jonossa on
vierekkäin 24 ja 276 lautayksikön välejä.

Mitattuna 408 reitistä:

- käyrä poikkeaa solmupolusta mediaanina **0,64**, p90 **7,8**,
  p99 **21,0** ja enimmillään **33,5** lautayksikköä;
- **kaksi reittiä leikkaa itsensä** eli tekee oikean silmukan:
  `sisilia|ateena` pisteessä **(6614, 1954)** — tasan se Ateenan
  eteläpuolen S, jonka omistaja näki — ja `anchorage|vancouver`
  pisteessä (1500, 1317);
- solmupolussa itseleikkauksia on **0**.

Ne näkyvät kuvissa: `reitit-z7.png` ja `reitit-z5.png`, rivi SILMUKKA.

**Dubrovnikin "iso kaari" ei ole silmukka eikä vika.** `dubrovnik|rooma`
kulkee `via`-pisteitään pitkin Adrianmerta etelään, Messinan salmen
kautta ja takaisin pohjoiseen Rooman edustalle — laatikko y 1695…1954.
Se on **maantieteellisesti oikein**: purjehdus Dubrovnikista Roomaan
kiertää Italian saappaan. Kaari näytti oudolta, koska pehmennys pyöristi
sen tiukat käännökset kaareviksi ja koska viiva oli niin haalea, ettei
sen kulkua erottanut. Suorat janat ja tummempi muste tekevät reitistä
luettavan; kaari jää, koska sen kuuluu jäädä.

## 3. Tehtävä 4 — käsin piirretty, luotisuorat (TEHTY)

`sisalto.mjs` **poimii solmupolun** ja piirto vetää solmusta solmuun
suoran janan. Ei splineä, ei tihennettyä pistejoukkoa: reittien
pistemäärä putosi **24 703 → 2 174** (−91 %).

**Solmut luetaan, ei arvata.** `densify` interpoloi ohjauspisteensä,
joten solmut ovat joka neljästoista pisteessä — mutta poiminta
**tarkistetaan** pakasta riippumatonta odotusarvoa vastaan
(`via`-pisteet + 2 päätä, tai maareitin 4). Jos poiminta ei osu,
reitti jää entiselleen ja lokiin tulee varoitus. Näin `perSpan`in
muutos rules.js:ssä ei voi hiljaa vääristää laattoja. Nyt osuma on
408/408.

**Askelmat lasketaan siitä polusta, joka piirretään.** Tämä oli pakko:
jos helmet laskettaisiin käyrästä ja viiva vedettäisiin solmupolkua,
**22 % helmistä jäisi yli lautayksikön** ja pahimmillaan **32,7 yksikön**
päähän omasta viivastaan. Nyt pahin helmen etäisyys viivastaan on
1,8·10⁻¹² lautayksikköä. Askelmien **määrä** tulee yhä `steps`-kentästä
eikä siihen kosketa; lennolla ei ole askelmia eikä niitä keksitty.

**Käsin piirretty jälki** on kaksi pikkuasiaa: kynänpaine vaihtelee
reitistä toiseen (viisi porrasta, ±12 %) ja **välisolmu heittää
enintään 0,35 paperipikseliä** suorasta. Päätesolmut eivät heitä —
kolme reittiä samasta kaupungista lähtee samasta pisteestä.

## 4. SAUMAT — mitattu, ei oletettu

Heitto **ei tule pikselistä eikä laatan nurkasta** vaan reitin
tunnuksesta (`r.siemen`, FNV-hash reitin id:stä) ja solmun
järjestysluvusta. Ne ovat samat luvut joka lohkossa, joka laatalla ja
joka ajolla — sama virhe kuin patinan rakeessa on siis rakenteellisesti
poissuljettu, ei vain testattu.

Ajoin työkalun oman saumakokeen (`--saumatesti`-logiikka: sama arkin ala
kerran 1024 px kuvana ja kerran neljänä 512 px laattana) **sekä ennen
että jälkeen**, jotta luvuilla on vertailukohta:

| koe | ennen | jälkeen |
| --- | --- | --- |
| sauma z5, eroavia kanavia | 9 527 / 4 194 304 (0,227 %) | 20 500 (0,489 %) |
| sauma z5, pahin kanavaero | 11 | 20 |
| sauma z7, eroavia | 9 597 (0,229 %) | 37 151 (0,886 %) |
| sauma z7, pahin | 55 | 55 |
| **lohkoraja z5, pahin** | **11** | **11** |
| **lohkoraja z7, pahin** | **36** | **36** |

**Ratkaiseva luku on lohkoraja** — tuotannon oma tilanne, kaksi
samankokoista vierekkäistä lohkoa kokonaisen pikselin siirrolla.
Siinä **pahin kanavaero on täsmälleen sama ennen ja jälkeen (11 ja 36)**.
Uutta saumamekanismia ei siis ole; eroavien pikselien määrä kasvoi vain
siksi, että sivulla on nyt enemmän mustetta eli enemmän vektorireunoja,
joilla vanha kelluvan pisteen pyöristys näkyy. Kummassakaan kokeessa
erot eivät kasaudu laattarajalle (työkalun oma varoitusraja on 50 %;
korkein osuus oli 8 %).

**Varaus:** koe ajettiin kaavio­taustalla, koska raaka-aineistoa ei ole
kontissa. Suosittelen ajamaan `node tools/generoi-laattapyramidi.mjs
<kansio> --data <aineisto> --saumatesti` oikealla aineistolla ennen
tuotantoajoa — se on halpa ja se on se virallinen luku.

## 5. Tehtävä 2 — Kreikan maareitti veden päällä: **VIKA ON DATASSA**

En siirtänyt solmuja. Ohjeen mukaan raportoin.

Vika on `sofia|ateena` (maareitti, `steps` 4, **ei yhtään
`via`-pistettä**). Suora Sofiasta (23,32 °E, 42,68 °N) Ateenaan
(23,74 °E, 37,97 °N) kulkee pituusasteen ~23,6 tuntumassa, ja siellä on
vettä: **Thermaikoksen lahti ja sen jälkeen koko Euboian salmi**.
Mitattuna `ne50.geojson`:n rantaviivaa vasten (400 näytettä reitiltä):

| piirtotapa | vedessä |
| --- | --- |
| pelkkä jana a→b | 119/401 näytettä, pisin yhtenäinen pätkä **29,4 yks** |
| solmupolku (nyt piirretty) | 122/401, pisin **45,5 yks**, t 0,588…0,830, 23,53 °E 39,94 °N → 23,61 °E 38,79 °N |
| vanha CR-käyrä | 125/401, pisin **45,5 yks** |

**Kolme numeroa kertovat saman: pehmennys ei aiheuta tätä eikä sen
poisto korjaa sitä.** Jo pelkkä jana on 51 yksikköä vedessä. Syy on se,
että reitille ei ole koskaan laskettu välipistettä; oikea maatie kulkee
lännempää Thessalonikin ja Larissan kautta. **Korjaus on yhden
`via`-pisteen lisääminen** noin (22,6 °E, 39,8 °N) — mutta se on
reittiverkkoa eli pelimekaniikkaa, joten jätän sen sinulle.

**Tämä ei ole ainoa.** Sama mittaus koko laudalle: **37 maareittiä
297:stä kulkee osin veden yli.** Pahimmat yhtenäiset pätkät:

| reitti | vedessä | pisin pätkä |
| --- | --- | --- |
| `neworleans\|miami` | 62/62 (100 %) | ~248 yks (Meksikonlahti) |
| `chennai\|kolkata` | 67/79 | ~244 yks (Bengalinlahti) |
| `kalgoorlie\|adelaide` | 66/120 | ~244 yks |
| `bangkok\|singapore` | 56/77 | ~224 yks |
| `kolkata\|yangon` | 51/55 | ~204 yks |
| `mexico\|merida` | 46/55 | ~184 yks (Campechen lahti) |
| `tripoli\|kairo` | 43/125 | ~172 yks (Sidran lahti) |
| `pietari\|helsinki` | 19/19 (100 %) | ~76 yks (Suomenlahti) |
| `lagos\|kamerun` | 11/11 (100 %) | ~44 yks (Beninin lahti) |

Osa on tarkoituksellisia (Lontoo–Pariisi ylittää Kanaalin), mutta
100 %:n rivit eivät ole. **Ehdotus:** tehdään merireittien testin pari
maareiteille — `tests/rules.test.mjs` tarkistaa jo, että merireitit
kulkevat vedessä, mutta maareiteille ei ole mitään vastaavaa. Se on
oma eränsä ja vaatii reittidatan muutoksia, joten en aloittanut sitä.

## 6. YKSI PÄÄTÖS SINULLE ENNEN AJOA (tärkein kohta)

**Laatta ja peli piirtävät nyt reitin eri muotoisena.** Laatta piirtää
solmupolun; peli (`js/ui.js paivitaMatkareitit`, nappulan sijainti
`pixelOf`) käyttää `rules.js`:n pehmennettyä käyrää. Ero mitattuna:
**mediaani 0,26, p90 3,71, max 38,35 lautayksikköä.** Laatalla helmi on
aina omalla viivallaan; ero näkyy vain siinä, että nappula ja pelin oma
matkareittiviiva kulkevat mutkaisilla merireiteillä hieman laattaan
poltetun viivan vierestä.

**Oikea korjaus on poistaa `densify` `rules.js`:stä**, jolloin peli ja
laatta piirtävät saman polun. **Kokeilin sen ja mittasin — se ei ole
yhden rivin korjaus:**

```
node --test tests/rules.test.mjs   →  # pass 329, # fail 2
   dublin|edinburgh kulkee maalla kohdassa t=0.46
   sansibar|rashafun kulkee maalla kohdassa t=0.78
```

Syy on looginen: näiden reittien `via`-pisteet on aikanaan laskettu
`tools/merireitit.mjs`:llä **pehmennettyä polkua vasten**, ja käyrä
pullistuu ulos siellä missä suora jana oikaisisi niemen yli. Poisto
vaatii siis myös `node tools/korjaa-merireitit.mjs maailmankartta`
-ajon eli muutoksen reittiverkkoon. **Palautin `rules.js`:n
koskemattomaksi.**

Samasta syystä **piirretty solmupolku vie kolme merireittiä hieman
maalle** (pakan omaa rantaviivaa vasten, sama mitta kuin testissä):

| reitti | maalla |
| --- | --- |
| `dublin\|edinburgh` | ~37 yks / 523 yks reitistä |
| `sitka\|vancouver` | ~39 yks / 596 |
| `izmir\|nikosia` | ~1 yks / 293 |

Vertailun vuoksi **vanha käyrä vei kolme reittiä maalle sekin**
(`nikosia|kairo`, `puntaarenas|caphorn`, `suva|panama`), joten
lopputulos ei ole huonompi — mutta se ei ole nolla, ja se korjautuisi
samalla `korjaa-merireitit`-ajolla.

**Kolme vaihtoehtoa:**

1. **Aja pyramidi nyt.** Reitit näyttävät oikeilta; kolme merireittiä
   sipaisee rantaa ja nappula kulkee mutkaisilla merireiteillä
   keskimäärin 0,26 yks laattaviivan vierestä. Kumpikaan ei ole
   omistajan kaappauksissa näkyvä vika.
2. **Korjaa ensin reittiverkko** (`densify` pois + `korjaa-merireitit`
   + `sofia|ateena`-välipiste), sitten aja. Silloin peli ja laatta ovat
   samaa mieltä ja kaikki reitit ovat oikealla maastolla. **Suosittelen
   tätä**, jos ajolla ei ole kiire — se on erillinen, hyvin rajattu erä.
3. Aja nyt ja korjaa verkko seuraavaan ajoon.

## 7. Mitä jäi tekemättä ja miksi

- **Reittiverkon data** (`sofia|ateena`-välipiste, 37 vesireittiä,
  `densify`-poisto + `korjaa-merireitit`): ohje kielsi solmujen
  siirtelyn ja pelimekaniikkaan koskemisen. Raportoitu yllä numeroineen.
- **Virallinen `--saumatesti` oikealla aineistolla:** raaka-aineistoa
  (Natural Earth 10m, ETOPO) ei ole kontissa. Ajoin vastaavan kokeen
  kaaviotaustalla ja vertasin ennen/jälkeen; luvut yllä.
- **Pyramidiajo:** ohjeen mukaan omistaja päättää.
- **Havainto ohimennen, en korjannut:** Pohjois-Afrikan ruudussa
  maareitti ja lentoreitti kulkevat lähes päällekkäin (Tripoli–Kairo on
  sekä maa- että lentoyhteys). Katkoviiva erottuu, mutta pari on
  ahdas — näkyy `reitit-z5.png`:ssä ja `reitit-z7.png`:ssä. Jos se
  häiritsee, lentoviivan voi siirtää pari pikseliä sivuun; se on oma
  pieni päätöksensä.
- **Toinen havainto:** z2:lla verkko on nyt selvästi tiheämmän
  näköinen kuin ennen (`reitit-z2.png`). Se on suora seuraus siitä,
  mitä pyydettiin, mutta se on uloin taso ja kannattaa katsoa: jos se
  on liikaa, lentoreiteille voi antaa oman kynnyksensä (nyt kaikki
  lajit ilmestyvät samalla kynnyksellä 0,22).

# Opus → Fable: laattojen esilataus ja zoomin hitaus (haara claude/laattojen-esilataus)

Erä valmis, pushattu haaralle. **Ei PR:ää, ei versionostoa** (ohjeen
mukaan). Kaikki muutokset: `js/laattapyramidi.js`,
`tools/savukkeet/savuke-laattapyramidi.mjs`,
`docs/moduulit/laattapyramidi.md` (uusi luku 6h). **js/ui.js:ään ei
koskettu lainkaan** — panoroinnin suunta luetaan näkymän keskipisteen
siirtymästä moduulin sisällä.

## 1. Mitä oli vialla ja mitä tehtiin

**Panorointi.** `PUSKURI = 1` oli yksi laatta ≈ 120 CSS-pikseliä. Yksi
sormenveto paljastaa moninkertaisesti enemmän, ja koska laattoja ei
kiinnitetä kesken eleen (omistajan linjaus *"lataus siis aina vain juuri
kun sormi irtoaa"*), ruudulle jäi tyhjä pergamentti. Todennettu
kuvakaappauksella — sama näkymä kuin omistajan kuvassa.

**Ratkaisu on kahtiajako, ei reunuksen kasvattaminen:**

- **NOUTO** = verkko + selaimen HTTP-välimuisti. Laatta on 15–40 kt,
  ja ilman kiinnitystä siitä ei jää purettua bittikarttaa. → noudetaan
  **ruudun verran joka suuntaan**, kuten omistaja pyysi.
- **KIINNITYS** = DOM + purettu bittikartta, kallis vain ruudulla.
  → kiinnitetään **puoli ruutua** joka suuntaan + puoli panoroinnin
  suuntaan (suuntapainotus LISÄÄ, ei korvaa — kuten ohjeistit).
- **KARKEA POHJA** kaksi tasoa alempaa, kahden ruudullisen laajuudelta:
  1/16 laattoja samalle alalle. Tämä on se, mikä kattaa myös LIU'UN,
  jota mikään reunus ei voi kattaa.

**Zoom (laajennuksesi).** Molemmat nimeämäsi syyt pitivät paikkansa, ja
löysin kolmannen, joka oli niistä pahin:

1. Sääntö 2 ei ollut voimassa — korjattu: vanha taso jää alle kunnes
   uuden tason näkyvät laatat ovat load-tapahtuneet (katto 2 s).
2. Karkea pohjakerros lisätty (`KARKEA_ETAISYYS = 2`).
3. **Irrotettu `<image>` ei lopeta lataamista.** Mitattu: kolmen
   zoomiportaan jälkeen selain oli pyytänyt yli 700 laattaa, ja
   ohitettujen tasojen laatat valuivat sisään vielä kymmeniä sekunteja
   *sen tason edellä*, jota pelaaja katsoi — 1,5 Mbit/s:llä
   esilatauskin jäi kokonaan käynnistymättä sen taakse. Poistettavan
   laatan osoite nollataan nyt, mikä katkaisee haun.
4. Viereisten tasojen ennakkonouto (z ± 1) siltä alalta, joka
   zoomiportaan (1,5 ×) jälkeen näkyy — ei nykyinen ala toisella
   tarkkuudella, joka olisi z+1:llä nelinkertainen määrä.
5. `decoding="async"` + `fetchpriority` kaikille laatoille. Lisäksi
   **näkyvät laatat luodaan aina ennen reunuksen laattoja**: järjestys
   pätee joka selaimessa, fetchpriority on vain vihje.

## 2. Mitatut luvut (Chromium, iPhone 390 × 844 dpr 3, z7 Ateena)

Laatat paikallisesta peilistä oikeilla `immutable`-otsakkeilla (ei
Playwrightin routea — se ohittaa selaimen välimuistin, jolloin koko
esilatausta ei voisi mitata). Verkko kuristettu **1,5 Mbit/s + 200 ms**.
"Peitto" = kuinka suuri osa karttaruudusta on ladattujen laattojen alla.

| mitta | ennen (v1369) | jälkeen |
| --- | --- | --- |
| peitto näkymän asetuttua | 17,5 % | **100 %** |
| panorointi itään / ylös, pienin peitto | **0 %** | **100 %** |
| aika täyteen peittoon panoroinnin jälkeen | > 1 800 ms | **3–4 ms** |
| zoom ulos z7→z6, pienin peitto | **0 %** (tyhjä ruutu) | **100 %** |
| zoom ulos z6→z5, terävä kartta | > 6 000 ms | **69 ms** |
| zoom sisään z6→z7, terävä kartta | 246 ms | **68 ms** |
| kiinnitettyjä laattoja | 54 | 98 (karkeaa pohjaa 45) |
| niistä ruudulla | — | 34 |
| purettu muisti (ruudulla olevat) | 56,6 Mt* | **35,7 Mt** |
| sama kaava kaikille kiinnitetyille | 56,6 Mt | 102,8 Mt (yläraja) |
| siirtoa (sama skripti, nopea verkko) | 6,0 Mt | 19,8 Mt |

*Vanha mittari laski kaikki kiinnitetyt purettuina. **Se on väärin, ja
se mitattiin:** 54 → 238 kiinnitettyä laattaa nosti renderöijän RSS:ää
~80 Mt eli ~0,4 Mt/laatta, ei 1 Mt — selain purkaa kuvan vasta kun se
maalataan. Mittari raportoi nyt kaksi lukua: `muistiMt` (ruudulla
olevat) ja `muistiKattoMt` (vanha kaava, nyt yläraja).

**Silmillä todennettu** (kuvakaappaukset kesken pyyhkäisyn, iPhone- ja
iPad-profiili, kuristettu verkko): ennen ruudun yläkolmannes oli
paljasta pergamenttia; jälkeen kartta on täysi myös kolmen peräkkäisen
koko ruudun mittaisen rajun pyyhkäisyn ja niiden liukujen aikana.

## 3. Portit

- `node --test tests/*.test.mjs` → **1047 pass / 0 fail** (1 skipped)
- `tools/tarkista-kaksoisavaimet.mjs` → ei kaksoisavaimia
- `tools/tarkista-niputus.mjs` → 293 moduulia, ei törmäyksiä
- `node tools/build-standalone.mjs` → ok, `dist/` poistettu
- savuke-laattapyramidi (oikeat R2-laatat peilattuna) → **17/17**
- savuke-panorointi → 11/11 · savuke-kartan-sujuvuus → 40/40 ·
  savuke-maailmanakyma → 16/16

Savukkeeseen lisättiin P7a–P7d (karkea pohja on olemassa, esilataus
nouti laattoja, kiinnitettyjä on enemmän kuin ruudulla mutta muisti
maltillinen, **zoomatessa peitto ei putoa alle 98 %**). P5a korjattiin
vertaamaan vain saman tason laattoja: karkean pohjan laatat osuvat joka
neljännellä rivillä samalle y-arvolle, jolloin tasot sekaisin mitattuna
"rako" oli kolmen tarkan laatan levyinen — laatat olivat kyllä
paikallaan, mittari oli väärä.

## 4. Päätöksiä, jotka teit puolestani — ja mitä ne maksavat

- **Suuntapainotus** toteutettu sekä kiinnityksen lisäreunuksena
  (0,5 ruutua liikkeen suuntaan) että noutojonon järjestyksenä. Suunta
  luetaan näkymän keskipisteen siirtymästä, joten eleeseen tai ui.js:ään
  ei tarvinnut koskea.
- **Laatasto-bittikartta**: tuotannon `pyramidi.json` (2026-08-30b)
  kertoo `laatasto: null` kaikilla tasoilla eli kaikki laatat ovat
  olemassa. Esilataus kysyy silti `laattaOlemassa`-tarkistuksen kautta,
  joten harva pyramidi ei tuottaisi 404-ryöppyä. Mitattu: 0 epäonnistunutta.
- **Hinta on siirto.** Sama skripti siirtää nyt 19,8 Mt entisen 6,0 Mt
  sijaan — se on omistajan pyytämä ruudullinen joka suuntaan, ja R2:n
  ulosliikenne on maksutonta. Jos mobiilidata huolestuttaa, säädin on
  yksi vakio (`NOUTO_RUUTUJA`), ja viereisten tasojen ennakkonouto on
  jonon perällä eli hitaalla yhteydellä se jää luonnostaan tekemättä.
- **Päivityksen kustannus** nousi 0 ms → ~19 ms per asettunut näkymä
  (kaksinkertainen määrä DOM-solmuja). Se ajetaan kerran eleen lopussa,
  ei kehyksittäin; kehysaika panoroinnissa pysyi p50 16,7 / p95 17,2 ms.

## 5. Mitä EI tehty (rajaus)

- Ei versionostoa, ei PR:ää, ei generointityönkulkua.
- Ei koskettu `js/karttanimet.js`- eikä `js/fokuskohteet.js`-tiedostoihin
  (toinen agentti) eikä `tools/fokuskartta/`-piirtokoodiin (kolmas).
- Raamattuun, tarinaan tai isoisän raamattuun ei kirjoitettu.

## 6. Huomio jatkoa varten (ei korjattu, ei kuulunut erään)

Laattojen latausajat mitattiin kontista (ämpäriin 300–570 ms
välityspalvelimen kanssa). Kehysaika on emulaattoriluku; Raamattu vaatii
kehysajan mittaamisen oikealla iOS-laitteella, eikä tämä erä muuta sitä
vaatimusta. Karkean pohjan hyöty ja esilatauksen viive (300 ms) ovat
molemmat sellaisia, jotka kannattaa katsoa kerran oikealla iPadilla.

---

# Viesti Fablelle — kohdenimiöt yhteiseen ladontaan (haara claude/kohdenimiot)

*(Opus, 30.8.2026. Haara tuoreesta origin/mainista **1d64fa0b = v1369**.
Versiota EI nostettu, PR:ää EI tehty, pyramidin generointityönkulkua EI
ajettu — sinä julkaiset. dist/ ei ole mukana. `tools/fokuskartta/`-
piirtokoodiin ei koskettu: toinen agentti on siellä.)*

Sait minulle kuusi asiaa neljässä viestissä. **Kolme oli koodityötä ja
kolme oli kysymyksiä, joihin vastaus on mittaus.** Kaksi kysymystä
osoittautui siksi, ettei mitään ole rikki — ja yksi diagnoosi
osoittautui vääräksi, joten en tehnyt sitä työtä. Perustelut alla.

Portit: `node --test tests/*.test.mjs` → **# pass 1047, # fail 0**
(1 skipped, sama kuin mainissa). Kaksoisavaimet ja niputus puhtaat,
`build-standalone` kääntyy (20 393 kt), `dist` poistettu. Savukkeet:
fokuskohteet 96/96, maailmanakyma 16/16, kartta-tila 20/20, panorointi
11/11, kartan-sujuvuus 40/40.

---

## 1. Kohdenimiöt samaan ladontaan — TEHTY

Omistajan kortti: *"Sama ladonta kuin paikannimillä."* Kohdenimiöt
menevät nyt `js/karttanimet.js`:n ladontaan. **Omaa rinnakkaista
ladontaa ei tehty** — se oli juuri se vika.

**Vian mitta.** Kohdenimiön koko ei ollut minkään kartan oma mitta vaan
kahden kertoimen tulo: `NOSTOSYM_NIMIO_KOKO` 11 × `KOHDE_SYMBOLI_SKAALA`
11/21 = **5,8 CSS-pikseliä**. Paikannimet ovat 10,5–12. Ero oli siis
kaksinkertainen, ja se näkyi.

| | ENNEN | JÄLKEEN |
| --- | --- | --- |
| kohdenimiön korkeus ruudulla | 5,8 CSS-px (rasteriin paistettuna) | **11,0 CSS-px** |
| kohdenimiöitä Sofian näkymässä, skaala 1,355 | **18** | **12** |
| sama, skaala 2,710 | 18 | 17 |
| sama, skaala 9,214 (lähin) | 18 | 16 |
| sama, skaala 0,955 (kerros piilossa) | 0 | 0 |
| dpr 2 vs dpr 3 | — | **täsmälleen sama tulos** |

Viuhka katoaa siis itsestään, kuten kortilla luvattiin: kaukaa
kourallinen, lähempää useampi.

**Tärkeysjärjestys — päätös ja perustelu (kysyit tätä).** Olit oikeassa:
**kaupungin nimi voittaa.** Ladontajärjestys on kaupungit → kohteet →
maastonimet, ja perustelu on kirjoitettu koodiin:

1. Kaupunki on kartan perusrakennetta ja navigoinnin ankkuri; kohde on
   saman kaupungin yksityiskohta, ja sen kortti aukeaa merkkiä
   napauttamalla myös ilman nimeä. Kaupungin nimen katoaminen ei
   korvaudu millään.
2. **Kohde voittaa maastonimen** — tämän päätin itse, koska et sitä
   kysynyt. Maastonimi on kuvitusta, jota kartta latoo koko maailmaan;
   kohde on pelin omaa sisältöä ja vain siinä maassa, jossa pelaaja on.
   Kaksoisnimivaaraa ei synny: samanniminen kohde jättää nimiönsä pois
   jo lähteellä (`kohteenNimio` → `maastonimiLahella`).

**Yleistys ei tullut mittakaavakynnyksestä, ja se on kertomisen
arvoista.** Kynnys (`KYNNYS.kohdeNimi` 0,45) on sama luku kuin
kaupungeilla, mutta se ei tässä pure: kohdekerros on muutenkin piilossa
ennen kuin lehti täyttää puolet ruudusta, ja siihen mennessä kynnys on
ohitettu. Yleistyksen tekee **väljyysvara** (`NIMION_VALJYYS_X/Y`, 4 ja
5 CSS-px): nimi varaa itseään isomman laatikon, joten se vaatii oikeaa
paperia eikä pelkkää rakoa. Koska merkit elävät kartan mittakaavassa ja
nimet ruudun, rypään sarake levenee lähennettäessä ja päästää lisää
nimiä läpi. Se on sama idea kuin laattojen nimitiheyskynnyksissä, eri
mekanismilla, koska aineisto on erilainen.

**Merkit napautettavina ilman nimeä — todennettu.** Sofian näkymässä
ruudulla oli 6 nimetöntä ja 17 nimellistä merkkiä. Kokeilin kolme
nimetöntä: *Veliko Tarnovo*, *Balkanvuoret* ja *Plovdiv* avasivat
kaikki korttinsa napautuksesta. (Plovdiv näytti ensin kaatuvan, mutta
se oli kokeeni valitsin: sen kortti on `nahtavyys-kortti`, ei
`fokuskohde-popup`. Kortti aukesi.)

## 2. Nostot — jäivät, kuten korjasit

Osoitinviivat jäivät. Kaksi tarkennusta siitä, mitä ruudulla oikeasti
on, koska nimitys meni viesteissä ristiin:

- Kuvakaappauksen katkoviivat ovat **rypään yhdysviivoja** kaupungista
  siirretylle merkille (`js/fokusniput.js`, omistajan tilaus 27.8.).
  Ne eivät ole nimiön ja merkin välisiä. Ne jäivät koskematta
  rakenteeltaan — merkit siirretään yhä sarakkeeksi, koska muuten ne
  kasautuisivat kaupungin pisteen alle eikä niitä voisi napauttaa.
- **Nimi kiinnittyy nyt merkkiinsä**, ei kaupunkiin, joten ketju
  kaupunki → katkoviiva → merkki → nimi pysyy kasassa ja viiva seuraa
  nimeä sinne minne se asettuu. Tämän lisäksi ladonta piirtää **oman
  noston** silloin kun nimi ei mahdu merkin neljään kylkeen: 14 tai 26
  CSS-pikseliä, katkoviiva merkin reunalta nimen viereen. Pidempää ei
  ole — pitkä nosto ei enää kerro kenen nimi on kyseessä, ja silloin
  nimen kuuluu pudota. Paksuus ja katkot ovat **CSS-pikseleitä**
  (paperivakio), kuten pyysit.

Omistajan Ateena-toiveet tehtiin samalla: **katkoviiva kevyemmäksi**
(paksuus 1,2 → 0,8, himmeys 0,42 → 0,3, katko 2,6 → 2,0) ja **sarake
lähemmäs kaupunkia** (`NIPPU_DX` 37 → 28 px). Ateenan litania on
purkautunut: Maratonhuijaus, Elginin marmorit, Akropolis, Marathon ja
Antiikin agora ovat luettavina eri kohdissa eivätkä pinona.

## 3. Maan harmaa sävytys — POISTETTU

`.country-tint` on poissa **koodina eikä CSS-piilotuksena**, kuten
pyysit. Mukana lähtivät sen kerros (`g.country-borders`) ja sen rajaus
(`clipPath#maa-rajaus`): kumpikin oli olemassa vain sävytystä varten.
`drawCountryBorders` jäi siivoamaan maaselaimen kyltin, ei muuta.
Savuke `kartan-sujuvuus` odotti sävytystä — käänsin väitteen
päinvastaiseksi (nyt vaaditaan, ettei kerrosta ole).

**Kysyit jääkö maa ilman visuaalista vihjettä. Ei jää**, ja kaksi
merkkiä on yhä paikallaan:

1. **Kartuutsi vasemmassa alanurkassa** — "BULGARIA · България ·
   osmanivaltakuntaa v. 1873". Näkyy kaikissa kuvakaappauksissani.
2. **Fokusmoodin sumuverho** jättää nykyisen maan ainoaksi tarkaksi ja
   täysvärisenä piirretyksi alueeksi; naapurimaat ovat harmaana
   harson alla. Tämä on itse asiassa vahvempi vihje kuin sävy oli.

En keksinyt korviketta, kuten ohjeistit.

---

# Kolme kysymystä, joihin vastaus on mittaus

## 4. "Miksi osa ympyrä ja osa soikio?" — EI OLE MITTAKAAVAVIKA

**Epäilysi epäuniformista viewBox-mittakaavasta on mitattu vääräksi.**
Luin vaaka- ja pystymittakaavan erikseen kolmessa näkymässä, myös siinä
`kokoLeveys`-haarassa, jota epäilit:

| näkymä | viewBox vaaka | viewBox pysty |
| --- | --- | --- |
| lähikuva | 2,710000 | 2,710000 |
| keskinäkymä | 1,355000 | 1,355000 |
| kokoleveys / sauma | 0,955167 | 0,955167 |

Samat kuuden desimaalin tarkkuudella. (Syy: `nakyvaKorkeus = korkeus /
skaala` antaa pystyyn tasan `skaala`, ja vaakaan pyöristysvirhe on
puoli pikseliä yli 11 600:n eli 0,004 %.)

**Merkit samoissa näkymissä:**

| | leveys/korkeus |
| --- | --- |
| `karttanimet`-merkit (`.karttamerkki-piste`, `-rengas`) | **0,9999 … 1,0001** |
| pelin omat kaupunkilaatat (`.cities .city`) | **0,9104 … 1,0634** |

**Syy on siis pelin omissa kaupunkilaatoissa, ja se on tarkoituksellinen.**
`js/ui.js drawBoard` piirtää ne `<ellipse>`-elementteinä, joiden `rx` ja
`ry` saavat kumpikin oman satunnaisen heilahduksensa
(`vary('city:rx:…', 0.7)` ja `vary('city:ry:…', 0.7)`) plus kiertymän —
käsin piirretyn kartan tuntu. Perussäde on 11,6, joten ero voi olla
kuusi prosenttia suuntaansa, ja **jokainen kaupunki on eri lailla
soikea**.

Se, että tämä alkoi näkyä nyt, on uuden nimikerroksen ansiota: sen
`karttamerkki-piste` on **täydellinen ympyrä keskellä samaa merkintää**,
jonka ulkorengas on käsivarainen soikio. Kahden perheen erimielisyys on
saman merkin sisällä, ja siksi silmä poimii sen.

**En muuttanut sitä.** Heilahdus on kartan tyyliä eikä vika, ja sen
poistaminen on ulkoasupäätös — omistajan, ei minun. **Jos hän haluaa
merkeistä pyöreitä, se on kahden rivin muutos** (`ry = rx`
`drawBoard`issa), ja se koskee kaikkia lautoja. Sano, niin teen sen.

## 5. "Välillä pieni, välillä iso piste" — SÄÄNTÖ ON KUNNOSSA, MUTTA SYY ON TOINEN

Kaksi asiaa, ja kumpikaan ei ole rikki.

**a) `c.airport` on staattista kaupunkidataa, ei pelitilaa.** Vastaus
kysymykseesi 1: se on kiinteä kentän arvo `js/packs/maailmankartta.js`:ssä
(62 kaupungilla `"airport":true`), eikä sitä aseteta koodissa
kertaakaan — grep löytää vain lukijoita. Sama koskee `c.start`ia (19
kaupunkia). **`iso` ei siis voi muuttua pelin aikana**, eikä
välimuistin mitätöintiä tarvita. Kysymyksesi 2 raukeaa.

**Ja kuvasi 1 vahvistaa säännön täsmälleen:** tarkistin ne kaupungit,
jotka luettelit. Praha, Wien, Budapest, Krakova, Venetsia ja Firenze:
**ei `airport`ia eikä `start`ia** → pieni paljas piste. Rooma:
`"airport":true` → rengas. Juuri niin kuin kuvassa. Rengas tarkoittaa
lentoyhteyttä, ja se on mielekästä pelitietoa.

**b) Kuvassa 2 ne olivat kuitenkin isoja — koska ne ovat eri merkkejä.**
Kaupungeilla on kartalla **kaksi merkkiperhettä**, ja ne eivät tiedä
toisistaan:

| perhe | mistä | koko | rengas |
| --- | --- | --- | --- |
| pelin kaupunkilaatta (`.cities .city`) | js/ui.js drawBoard | säde 11,6 (start 20) lautayksikköä | aina |
| nimikerroksen merkki (`.karttamerkki-*`) | js/karttanimet.js | 2,0–2,6 CSS-px | vain `iso` |

Mittasin ne samasta näkymästä: laatta ~24 CSS-px, nimikerroksen piste
4,0–5,2 CSS-px. **Se on se "pieni ja iso".** Kumpi näkyy, riippuu
näkymästä: kuvassasi 1 lauta oli vielä asettumatta (huomasit itsekin
puolivalmiin kartan), jolloin ruudulla oli vain nimikerroksen pienet
pisteet.

**Kirjaan tämän havaintona enkä korjaa sitä:** pyramidilaudalla sama
kaupunki saa nyt kaksi merkkiä päällekkäin, ja niiden koot ja säännöt
eroavat. Se on suurempi linjauskysymys kuin tämä erä — kumpi perhe on
pyramidilaudan kaupunkimerkki? — ja se on sinun ja omistajan
päätettävä. En koskenut siihen.

## 6. Skandaalien koordinaatit — DIAGNOOSI EI PIDÄ PAIKKAANSA, EN TEHNYT TYÖTÄ

Pyysit projisoimaan 83 skandaalin lat/lon laudan koordinaateiksi, koska
`grep maailmankartta js/packs/skandaalit.js` antoi 0 osumaa. **Osuma on
0, mutta johtopäätös ei seuraa siitä: skandaalit projisoidaan jo, vain
ajossa eikä datassa.**

`js/skandaalit.js skandaaliLisakohteet` kutsuu
`projisoiLaudalle(lauta, skandaali.lon, skandaali.lat)`
(`js/fokusmitat.js`), joka lukee juuri ne vakiot jotka annoit:
`FOKUS_LAUTAPROJEKTIOT.maailmankartta = { miller, leveys 12000,
lon0 −175, pohjoinen 76 }`. Siksi laudan koordinaatteja ei ole
tiedostossa — niitä ei kuulukaan olla, ja sama data palvelee jokaista
lautaa.

Ajoin sen läpi ja mittasin tuloksen:

- **83/83 projisoituu**, nolla epäonnistumista
- **83/83 päätyy uniikkiin pisteeseen** — yksikään ei putoa kaupungin
  pisteeseen
- Elginin marmorit → (6624,22 / 1881,94), **0,48 lautayksikköä**
  Ateenan pisteestä (6624,7 / 1882,0). Se ON Akropoliin kohdalla.
- Maratonhuijaus → (6624,70 / 1882,06), 0,06 yksikköä Ateenasta —
  Panathinaikon-stadion, kuten sanoit.

**Litanian syy on mittakaava, ei data.** Yksi lautayksikkö on
päiväntasaajalla noin 3,3 km, ja rypäytyssääntö nappaa kaiken, mikä on
noin 12 lautayksikön (≈ 35 km) sisällä kaupungista. Ateenan
nähtävyydet ja Ateenan skandaalit ovat kaikki sen sisällä — **42 kaikista
83:sta skandaalista** on. Ne eivät voi hajota datalla, koska ne
oikeasti ovat samassa kaupungissa.

Se on siis kohtasi 4 (*"aidosti samassa pisteessä olevat… ratkaise se
ladonnalla"*), ja **se on ratkaistu** ladonnalla ja väljyysvaralla
kohdassa 1. En muuttanut yhtäkään lat/lon-arvoa enkä lisännyt yhtäkään
lautakoordinaattia — data on sinun aluettasi, eikä siinä ollut mitään
korjattavaa.

---

## 7. Mitä muutin tiedostoittain

| tiedosto | mitä |
| --- | --- |
| `js/karttanimet.js` | kohdenimiöt ladontaan (`asetaKohdenimet`, `karttanimetLatovat`), noston viivat, väljyysvara |
| `js/fokuskohteet.js` | `luovutaKohdeNimiot`: antaa nimet ladontaan, sammuttaa omat; merkit ja osumat ennallaan |
| `js/fokusniput.js` | yhdysviiva kevyemmäksi, sarake lähemmäs kaupunkia |
| `js/ui.js` | maan sävytys, sen kerros ja rajaus poistettu; nimikerros ajetaan kohdemerkkien jälkeen |
| `css/styles.css` | `.karttanimi-kohde`, `.karttanimi-nosto`; `.country-tint` poistettu |
| `tools/savuke-kartan-sujuvuus.mjs` | sävytysväite käännetty |
| `docs/moduulit/laattapyramidi.md` | uusi luku 6g.5 |

## 8. Miten todensin

- `node --test tests/*.test.mjs` → 1047 pass / 0 fail / 1 skipped
- kaksoisavaimet, niputus, `build-standalone`, `dist` poistettu
- savukkeet: fokuskohteet 96/96, maailmanakyma 16/16, kartta-tila
  20/20, panorointi 11/11, kartan-sujuvuus 40/40
- **peli ajettu tuotannon oikeilla laatoilla** (ämpärin luettelo
  2026-08-30b, `nimiot: false`) Chromiumissa iPadin mitoilla
  834×1112 — laatat noudettiin Noden kautta, koska kontin selain ei
  näe verkkoa
- **kuvakaappaukset katsottu ennen ja jälkeen** samasta näkymästä,
  Sofiasta ja Ateenasta, **dpr 2 ja dpr 3**
- napautuskoe pudotetun nimen merkeille
- merkkien ruutusuhteet ja viewBoxin vaaka/pystymittakaava mitattu
  kolmesta näkymästä (kohta 4)
- skandaalien projisointi ajettu läpi kaikille 83:lle (kohta 6)

## 9. Avoimet — sinulle ja omistajalle

1. **Kaupunkilaattojen soikeus** (kohta 4): tyylipäätös. Kahden rivin
   korjaus jos halutaan pyöreiksi.
2. **Kaksi kaupunkimerkkiperhettä pyramidilaudalla** (kohta 5b):
   linjauskysymys, kumpi on kaupungin merkki.
3. **Skandaalien data on kunnossa** (kohta 6) — ei tehtävää.

---

# Viesti Fablelle — laattojen viivatyö (haara claude/rantaviivan-kohdistus)

*(Opus, 30.8.2026. Haara alun perin **1d64fa0b = v1369**, rebasettu
main-kärkeen **535311f3 = v1372** (v1370 syvyysramppi, v1371 kaupunkien
laatat, v1372 selitenappi) — rebase meni puhtaasti, ja portit ajettiin
uudestaan sen jälkeen.
Versiota EI nostettu, PR:ää EI tehty, pyramidin generointityönkulkua EI
ajettu — sinä julkaiset ja pyydät omistajalta luvan ajoon. dist/ ei ole
mukana. js/-puoleen ei koskettu lainkaan.*

*Edellinen raportti (nimet laatoista peliin) on gitissä commitissa
1d64fa0b.)*

---

## LYHYESTI

Neljä omistajan havaintoa, kaikki laattoihin poltettavaa viivatyötä,
kaikki samassa erässä koska kaikki vaativat saman pyramidin ajon.

| # | havainto | tila |
| --- | --- | --- |
| 1 | *"Ääriviiva ja korkeus väritys eivät täsmää."* | korjattu, syy mitattu ja todennettu |
| 2 | *"Joet eivät mutkittele pehmeästi vaan kantikkaasti."* | korjattu |
| 3 | *"Poista pituus ja leveyspiiri viivat. Jätä vain 0 ja päiväntasaaja sekä kääntöpiirit ja napapiiri ja nimeä ne."* | tehty |
| 4 | *"Kaupunkien välissä pitäisi näkyä nopanheitto askelmat…"* | tehty, **yksi datakysymys sinulle** (kohta 4) |

Portit: `node --test tests/*.test.mjs` **1047 pass / 0 fail** (sama kuin
main), `tarkista-kaksoisavaimet` ei kaksoisavaimia,
`tarkista-niputus` kunnossa, `build-standalone` ajettu ja `dist/`
poistettu.

Muutetut tiedostot — **kaikki tools/-puolella**:

| tiedosto | mitä |
| --- | --- |
| `tools/fokuskartta/maailma.mjs` | `meriRenkaat` (uusi), `rannikot` johdetaan siitä |
| `tools/fokuskartta/maailmapiirto.js` | maa/meri vektorista, jokien käyrä, erikoispiirit, reittien askelmat |
| `tools/fokuskartta/sisalto.mjs` | reitit ratana askelmineen, meri/maa erotettu |
| `tools/generoi-laattapyramidi.mjs` | renkaat aineisto.jsoniin |
| `docs/moduulit/laattapyramidi.md` | luvut 6h–6l (mittaukset) |

**Moottori ei ole enää jaettu.** Tarkistin sen ennen kuin muutin mitään:
`tools/tee-yleislehti.mjs` ei ole enää olemassa, ja
`grep "fokuskartta/maailma"` löytää tasan yhden kutsujan —
`tools/generoi-laattapyramidi.mjs`. Näiden kahden tiedoston ainoa
käyttö on siis pyramidi, eikä md5-vertailua vanhaan lehteen ole mihin
tehdä. Maalehtien moottori (`piirto.js`) ja `aineisto.mjs` ovat
koskemattomat, ja niiden lukema merimaski jää paikalleen.

---

## 1. Ääriviiva ja maaväri — hypoteesisi piti paikkansa, ja tässä ovat luvut

Syy oli tasan se, minkä arvelit: **rantaviiva vektoreista, maa/meri-jako
rasterista.** Mutta en luottanut siihen vaan mittasin, ja mittaus
muuttaa yhden asian arviossasi: ero ei ole tasaisesti "5 km", vaan se
riippuu rannikon rikkonaisuudesta enemmän kuin ruudun koosta.

Mittatapa: kummankin lähteen maa/meri-vastaus laskettiin TÄSMÄLLEEN
samoille kuvapikseleille kuin moottori ne laskee (sama projektio, sama
bilineaarinen korkeus, sama maski), ja verrattiin.

- **siirtymä** = kuvarivillä mitattu etäisyys vektorin rantaviivan ja
  moottorin värinvaihdoksen välillä (mediaani; 40 px on mittarin katto)
- **vuoto** = erimielisen pikselin etäisyys rantaviivaan

| alue | z5 | z6 | z7 | vuoto enimmillään | eri-% (z7) |
| --- | --- | --- | --- | --- | --- |
| Egeanmeri (omistajan kuvakaappaus) | 1,0 px | 2,5 px | **5,5 px** | 21 px | 3,8 % |
| Länsi-Afrikka (sileä rannikko) | 4,0 px | 3,5 px | **13,0 px** | 11 px | 1,4 % |
| Norja (vuonot) | 20 px | 40 px | **yli 40 px** | 48 px | 10,5 % |
| Chile (saaristo) | 22 px | 32 px | **yli 40 px** | 23 px | 12,3 % |

Kaksi asiaa, jotka kannattaa lukea tästä:

1. **Kilometreinä ero pysyy samana, joten pikseleinä se
   kaksinkertaistuu joka tasolla.** Siksi omistaja näki sen vasta
   lähikuvassa — z3:lla se on nolla.
2. **Egeanmeren otoksessa 9 saarta 29:stä jäi kokonaan ilman
   maaväriä** — pelkkä ääriviiva meren päällä. Se on se, minkä silmä
   poimii ensin, eikä se näy siirtymäluvussa lainkaan.

Sileä rannikko (Länsi-Afrikka) on z7:llä 13 px pielessä, mutta siellä
se näkyy vain vyönä; rikkonaisella rannikolla ruudukko ei näe vuonoja
lainkaan ja koko maa/meri-kuvio on väärä.

### Korjaus

Tein täsmälleen sen, minkä ehdotit, ja vein sen yhden askelen
pidemmälle: **`rannikot` JOHDETAAN nyt samasta harvennetusta
rengasjoukosta, josta täyttö lasketaan.** Ei siis kahta rinnakkaista
polkua samasta lähteestä vaan yksi lista kärkipisteitä kahdessa
muodossa. Viiva ja täyttö eivät voi ajautua erilleen edes
periaatteessa.

Maski lasketaan juovapyyhkäisynä suoraan kuvan tarkkuudella (Millerissä
kuvarivi on tasan yksi leveyspiiri), joten välirasteria ei ole.

**Reunatapauksesi ratkesivat ilman uusia sääntöjä**, koska värit oli jo
kummassakin päässä leikattu — tämä oli minulle yllätys ja tarkistin sen
koodista:

| kysymyksesi | vastaus |
| --- | --- |
| matala meri rannan lähellä, kun ruudukko sanoo maata | `lerpSyvyys(m >= 0)` palauttaa matalimman merisävyn — juuri oikein |
| solu puoliksi maata, lähin ruudukkopiste merellä | `Math.max(0, m + kohina)` → hypsometrian alin sävy, eli rannikkoalanko |
| järvet ja sisävedet | olivat **jo** kunnossa: `ne_10m_lakes` piirretään ja täytetään samoista renkaista, joten ne leikkaavat maavärin pois nyt kuten ennenkin |
| Kaspianmeri / Kuollutmeri / Qattara | säilyivät ennallaan, koska ne ratkeavat siitä onko piste meren monikulmiossa |

### Suorituskyky — mitattu, koska pyysit

| mitta | ennen | jälkeen |
| --- | --- | --- |
| piirtoaika z6 (Eurooppa, 4x4-lohko) | 10,1 s | 10,3 s (**+2 %**) |
| piirtoaika z7 (Egeanmeri, 4x4-lohko) | 9,7 s | 10,0 s (**+3 %**) |
| tavua/px z6 (webp q0,9) | 0,265 | 0,266 (+0,4 %) |

**Monikulmioleikkaus ei moninkertaista piirtoa.** Juovapyyhkäisy tehdään
kerran koko kankaalle ja reunat indeksoidaan kerran koko ajolle, joten
lisätyö on 2–3 % eikä se kasva tasojen mukana. Ämpärin koko ei liiku.

### Todennettu silmillä

Ajoin samat alueet ennen ja jälkeen ja katsoin kuvat:

- **Norja z7** — tämä on selvin. Ennen: maaväri on karkea porrastus,
  joka on täysin irti ääriviivoista — harmaita meriläikkiä keskellä
  saaria, maaväriä vuonojen päällä. Jälkeen: jokainen vuono on vettä
  ja jokainen saari maata, ääriviivaan asti.
- **Chile z7** — ennen vuonot olivat lähes kokonaan maanvärisiä (ruudukko
  ei näe niitä), jälkeen jokainen haara on merta ääriviivaan asti.
- **Egeanmeri z7** — ennen useissa pikkusaarissa oli pelkkä ääriviiva
  ilman maaväriä; jälkeen kaikki ovat täynnä.
- **Peloponnesos z5** — ennallaan silmälle, kuten mittaus lupasi
  (siirtymä 1 px).

---

## 2. Joet kantikkaita — mitattu ensin, sitten silotettu

Ongelma on todellinen ja iso. Mitattuna (123 uomaa, 4 330 pistettä):

| taso | jakso mediaani | p90 | pisin |
| --- | --- | --- | --- |
| z3 | 6,0 px | 13,3 px | 55 px |
| z5 | 23,9 px | 53,4 px | 219 px |
| z6 | 47,9 px | 106,8 px | 438 px |
| z7 | **95,8 px** | 213,5 px | 875 px |

Taitteen mediaanikulma on **49 astetta**. Sadan pikselin välein
puolisuora kulma.

Käytin **sentripetaalista Catmull-Romia (alpha = 0,5)** kuten pyysit,
muunnettuna suoraan kuutiollisiksi Béziereiksi. Perustelu pitää
paikkansa juuri tässä aineistossa: pisin jakso on yli 200-kertainen
lyhimpään, eli pisteet ovat äärimmäisen epätasavälein, ja yhtenäinen
parametrisointi tekisi silmukoita.

**Jatkuvuus laattarajan yli**: silotus nojaa koko uomaan.
`sisalto.joet` on maailmanlaajuinen lista, jota mikään ei rajaa ennen
piirtoa, ja kärjet muunnetaan ARKIN pikseleiksi, jotka ovat samat joka
lohkossa — canvasin leikkuri hoitaa rajauksen vasta rasteroinnissa.
Lohkorajatesti alla (kohta 5): z6–z7 pahin 0.

**Rantaviiva ja järvet EIVÄT tarvitse tätä, ja se on mitattu:**
harvennettu rantaviiva on z7:llä mediaanina **3,55 px** jaksoa kohti
(järvet 3,38) eli 27 kertaa tiheämpi kuin joet. Ja tärkeämpi syy:
rantaviiva on nyt myös maan ja meren raja (kohta 1), joten viivan
silottaminen täyttöä silottamatta palauttaisi juuri sen eron, jonka
äsken korjasin. Reitit ovat kahden kaupungin janoja.

**Silmillä**: Jenisein terävä mutka z6:lla. Ennen: suora kulma ja
V-kärki. Jälkeen: pehmeä meandri, joka kulkee samojen pisteiden kautta,
ei silmukoita eikä yliampumista edes 149 asteen taitteessa.

**Hinta**: sisältyy yllä mitattuun 2–3 %:iin; joet ovat 4 207 jaksoa,
ja `bezierCurveTo` maksaa saman kuin `lineTo`.

---

## 3. Asteverkko pois, viisi piiriä nimineen

Tehty. Tasavälinen 20 asteen verkko on poistettu; jäljellä
nollameridiaani, päiväntasaaja, Kravun ja Kauriin kääntöpiirit
(±23,4365) ja pohjoinen napapiiri (66,5635 °N).

**Eteläinen napapiiri**: tarkistin arkin omista mitoista kuten pyysit
(`pyramidi.json` `rajaus`: y −611,31, h 6422,72 → 84 °N…66 °S). 66,56 °S
on reunan ulkopuolella. Ei piirretä, ei nimiötä, ei mainintaa avoimissa.

### Kynnys: en tarvinnut sitä, ja perustelu on rakenteellinen

Merten nimet ovat kartan mittakaavassa (`S`), koska nimi kuuluu
altaalle jonka se nimeää — siksi niillä ON pakko olla kynnys.

**Nämä nimet nimeävät VIIVAN, ja viivalla ei ole leveyttä, jonka mukaan
nimi kasvaisi.** Siksi ne ovat paperivakioita (`P`): 13 px joka
tasolla. Silloin ne eivät voi olla jättiläisiä syvässä zoomissa eivätkä
näkymättömiä uloimmalla — eli kynnyksen molemmat perusteet katoavat.
Ja koska nämä viivat kulkevat ruudun poikki joka tasolla, nimi on
mielekäs joka tasolla, aivan kuten arvelit.

Kynnyksen työn tekee **toistoväli**: nimi toistetaan noin 2 400
laitepikselin välein, jolloin näkymässä (puhelin 1 170, työpöytä
1 440–3 024) on korkeintaan yksi kappale kutakin nimeä. Määrä lasketaan
arkin mitoista, joten se on sama joka lohkossa:

| taso | z0–z2 | z3 | z4 | z5 | z6 | z7 |
| --- | --- | --- | --- | --- | --- | --- |
| nimiä viivaa kohti | 1 | 2 | 5 | 9 | 18 | 36 |

Jokaisella viivalla on oma faasi (0,17 / 0,26 / 0,5 / 0,74), koska
samalla faasilla kaikki neljä nimeä kasautuivat samaan
pystysarakkeeseen — näin kävi ensimmäisessä ajossa ja se näytti
tekstipalstalta. Nollameridiaanin päälle osuva kappale siirretään
sivuun oman leveytensä verran (z7:llä toistoväli osuu tasan asteelle 0).

### Nollameridiaanin nimi: "Nollameridiaani"

Perustelu on mitta eikä maku: nimi kulkee pystyviivan vartta, jolloin
sen pituus on korkeutta. "Greenwichin meridiaani" on 22 merkkiä eli
paperivakiona noin 150 px pystyyn, ja se leikkaisi kääntöpiirien
nimet. "Nollameridiaani" on 15 merkkiä, yksi sana, ja se on suomalaisen
kartaston oma termi juuri tälle viivalle.

### Todennettu silmillä

- **z0 (koko maailma)**: kaikki neljä viivaa ja viisi nimeä näkyvät ja
  ovat luettavia; asteverkkoa ei ole. Nimet hajautuvat eri kohtiin
  (napapiiri Kanadan yllä, Kravun kääntöpiiri Meksikon yllä,
  päiväntasaaja Afrikan yllä, Kauriin kääntöpiiri Intian valtameren
  yllä).
- **Päiväntasaaja z6 lähikuvassa**: kursiivi harvennettu nimi istuu
  viivan yläpuolella, sama kirjainkoko kuin z0:lla.
- **Kolme z6-laattaa vierekkäin päiväntasaajalla**: viiva jatkuu
  saumattomasti laatasta toiseen eikä nimi toistu — se on 2 400
  pikselin välein eli noin joka viidennessä laatassa.

### Havainto sinulle (en koskenut, koska se on js/-puolella)

`js/fokusmitat.js` piirtää ruudun laitoihin asteviivaimet ("22 °L",
"46 °P"). Ne osoittivat aiemmin kartan yli kulkeviin verkkoviivoihin;
nyt niitä ei ole. Viivaimet ovat yhä oikeita lukemia eivätkä valehtele,
mutta niiltä katosi visuaalinen vastine kartalla. **En koskenut niihin**
(toinen agentti on js/-puolella). Jos ne alkavat näyttää irrallisilta,
se on oma pieni erä.

---

## 4. Reittien askelmat — tehty, ja yksi asia jonka sinun pitää päättää

### Mitä selvitin (en olettanut)

| kysymyksesi | mitä data sanoo |
| --- | --- |
| miten merireitti erotetaan? | **`edges`-riveillä ON `type`-kenttä**: 111 riviä 408:sta on `type: 'sea'`. Sama kenttä, jota `tools/korjaa-merireitit.mjs` käyttää. Ei tarvinnut keksiä sääntöä. |
| miten askelmat jaetaan janalle? | **Vakiintunut tapa löytyi:** `js/rules.js` `edgePolyline` + `pointAlong(poly, idx/steps)`, tasavälein kaarenpituuden mukaan. Käytän niitä suoraan importtaamalla — en kirjoittanut omaa jakoa. |
| montako askelmaa kartalla on? | `steps` yhteensä **1 526**, piirrettyjä merkkejä **1 118** (steps − 1 reunaa kohti; idx 0 ja steps ovat kaupungit). |

Askelmien paikat tulevat siis pelin omista funktioista. Se on tässä
tärkeämpää kuin näyttää: jos työkalu jakaisi janan omalla kaavallaan,
laattaan poltettu ruutu ja nappulan pysähdyspaikka eroaisivat, ja se
olisi pelivirhe eikä ulkoasuvirhe.

### PÄÄTÖSKYSYMYS: lentoreiteillä ei ole askelmia

Tulkintasi oli *"askelmien on näyttävä kaikilla kolmella"*. **Se ei ole
mahdollista nykyisellä datalla eikä nykyisillä säännöillä**, ja kerron
sen sinulle enkä arvaa:

- `airRoutes`-riveillä on **vain `a` ja `b`** — ei `steps`-kenttää.
- Pelissä lentäminen **siirtää nappulan suoraan perille**:
  `js/game.js` `actionMannerLento` asettaa
  `p.pos = { type: 'city', city: cityId }`. Lennolla ei kuluteta
  nopanheittoa eikä pysähdytä matkan varrelle.

Lennolla ei siis ole ruutuja, joita piirtää. Piirsin lentoreitit
omistajan pyytämällä punaisella katkoviivalla ilman helmiä.
**Jos lentoon halutaan askelmat, se on pelimekaniikan muutos
(`steps` lentoreiteille ja lento matkana eikä hyppynä) — se on sinun ja
omistajan päätös, ei minun.**

Tästä syntyi sääntö, joka on mielestäni oikea ja jonka kerron
ääneen jotta voit kumota sen: **muste kertoo kulkutavan, helmet
kertovat askelmat, ja katkoviiva on varattu sille reitille, jolla ei
ole askelmia.**

| reitti | muste | viiva | helmet |
| --- | --- | --- | --- |
| maa (297) | seepia | yhtenäinen | kyllä |
| meri (111) | preussinsininen | yhtenäinen | kyllä |
| lento (71) | poltettu sinooperi | katkoviiva | ei |

### Värit

Preussinsininen (1706) on kaivertajan vakiosininen ja poltettu
sinooperi sen punainen. Käytin `rgba(32,60,98,0.56)` ja
`rgba(150,54,40,0.50)` — murrettuina niin, että ne erottuvat mutta
lukeutuvat musteeksi paperilla eivätkä näytön väriksi. Katsoin
lähikuvat: sininen luetaan siniseksi ja punainen punaiseksi, mutta
kumpikaan ei hyppää seepian päältä.

Askelmahelmi on paperivakio: 2,4 px säde, paperinvaalea täyttö ja
ohut musteinen kehä, eli asemamerkki radalla.

### Kynnys — mitattu, ei valittu

Reitit ilmestyvät jo nyt kynnyksellä `px >= 0,22` (z2). Askelvälit
ovat siellä p10 **11,4 px** ja mediaani **17,9 px**, joten 2,4 pikselin
helmet erottuvat toisistaan heti ensimmäisellä tasolla, jolla reitti
ylipäätään piirretään. **Omaa syvempää kynnystä ei tarvita.**

| taso | askelväli p10 | mediaani | p90 |
| --- | --- | --- | --- |
| z2 | 11,4 px | 17,9 px | 35,1 px |
| z4 | 45,4 px | 71,4 px | 140,2 px |
| z6 | 181,6 px | 285,7 px | 560,9 px |

### Yksi asia korjaantui matkan varrella

Reitin murtoviiva on avattu sauman yli (`avaaSauma`), joten sen x voi
olla laudan ulkopuolella. Vanha koodi piirsi reitit kahden pisteen
janoina ja katkaisi ne saumalla; uusi piirtää jokaisen reitin kolmena
kappaleena (−laudan leveys, 0, +laudan leveys), jolloin **Tokio–San
Francisco näkyy sauman molemmin puolin eikä katkea.** Tämä ei ollut
pyydetty, mutta se oli murtoviivoihin siirtymisen välitön edellytys.

### Todennettu silmillä

- **Kanaali z4**: samassa näkymässä maareittejä helmineen (Lontoo–
  Pariisi–Amsterdam), merireittejä sinisenä helmineen (Lontoo–Dublin,
  Lontoo–Rotterdam) ja lentoreitti punaisena katkoviivana. Kaikki
  kolme erottuvat toisistaan yhdellä silmäyksellä.
- **Lähikuva 4x**: yksittäinen helmi erottuu selvästi renkaana viivan
  päällä.
- **z6 kaukaa**: reitti on yhä luettava viivana ja helmet erottuvat.

---

## 5. Sauma ja jatkuvuus — todiste

`--saumatesti` kaikilla kahdeksalla tasolla, sama kone ja sama
aineisto ennen ja jälkeen. Luku on pahin kanavaero (0–255).

| taso | ennen (main) | jälkeen |
| --- | --- | --- |
| z0–z1 | 0 | **0** |
| z2 | 0 | 5 |
| z3 | 6 | 6 |
| z4 | 2 | 10 |
| z5 | 22 | **5** |
| z6–z7 | **0** | **0** |

**Syvimmät tasot ovat yhä tavulleen samat** — juuri ne, joita pelaaja
katsoo 1:1 ja joilla sauma näkyisi. Väliltä löytyvät erot ovat
hajallaan vektorien reunapehmennyksessä (uudet käyrät, helmet ja nimet
rasteroituvat eri kokoisilla kankailla hitusen eri tavoin), pahin ero
on 10 kanavaa 255:stä eli 4 % eli silmälle näkymätön, eikä työkalun oma
saumavaroitus lauennut. z5 parani 22:sta 5:een.

Kerron suoraan, koska pyysit: **tämä ei ole no-op muille käytöille —
mutta muita käyttöjä ei ole.** `tools/tee-yleislehti.mjs` on poistettu,
ja `maailma.mjs` + `maailmapiirto.js` ovat pyramidin yksinomaisia.
Maalehtien moottori `piirto.js` ja `aineisto.mjs` ovat koskemattomat.

---

## Mitä EN tehnyt

- **En noussut versiota, en tehnyt PR:ää, en ajanut työnkulkua.**
- En koskenut js/-puoleen (toinen agentti on siellä).
- En koskenut Raamattuun, tarina.md:hen tai isoisan-raamattu.md:hen.
  Luvut 6h–6l ovat `docs/moduulit/laattapyramidi.md`:ssä eli MITEN-
  dokumentissa. **Raamattuun tarvitaan sinulta kolme linjausta:**
  vektori maan ja meren auktoriteettina, asteverkon korvaaminen viidellä
  nimetyllä piirillä, ja reittien askelmat + niiden värisääntö.
- En muuttanut umpimerikarsintaa (`--harva`) käyttämään vektoria. Se on
  oletuksena pois päältä, mutta **jos se joskus kytketään päälle, sen
  maa/meri-testi on eri mieltä kuin piirto** — kirjaan sen tähän
  havaintona, en korjannut ohimennen.

## Ajo

Kaikki neljä muutosta näkyvät vasta uudessa pyramidiajossa. Ne kuuluvat
samaan ajoon, ja versio pitää nostaa polussa (`2026-08-30c` tai
myöhempi), koska laattojen osoitteet ovat ikuisessa välimuistissa.
