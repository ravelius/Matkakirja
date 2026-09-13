# Karttauudistus, erät 1b + 2 — pallon värikerros ja zoomiraja (Ranska, pilotti)

*(Opus-työsessio Fablelle 13.9.2026. Haara
`claude/karttauudistus-era1b-pallo`, pohja origin/main v1843. Ei
versionostoa, ei dist/:iä, ei laattoja repossa — vain neljä
vaihtoehtokuvaa. Jokainen luku tässä raportissa on MITATTU; arviot on
merkitty sanalla "arvio".)*

## 0. Lyhyesti

**Erä 1b (värikerros pallolle) ja erä 2 (uloszoomauksen esto) on tehty
samassa PR:ssä pallosuunnitelman suosituksen (A) mukaan**: leikkuri ja
feidaus POLTETAAN värilaattaan alfana generointivaiheessa, ja peli
lisää värilaataston pallon laattakerroksen `pyramidinKerrostasot`-
listaan yhtenä uutena kerrostasona. Ei clipPathia, ei
`destination-in`-passia ajossa, ei toista verkkoa eikä toista
tekstuuria.

Savuke `savuke-varilaatat-pallo` on **11/11 vihreä**, ja sen molemmat
vastakokeet ovat punaisia oikeista väitteistä: leikkurin riisuminen
kaataa Belgian ja avomeren väitteet (9/11), ja pyramidin version
rikkominen kaataa versioportin väitteen ja koko kerroksen (4/11).
Luvut luvussa 4.

**Mitattu arkkitehtuurin lupaus pitää tarkalleen:** samalta kameralta
värillisen ja värittömän ajon `nakyvia`-laattamäärä on TÄSMÄLLEEN sama
ja tekstuuritavut laattaa kohti ovat samat (1 398 101 tavua/laatta
kumpikin). Tasokartalla erä 1 mittasi +54 %; pallolla lisäys on 0 %.

**KAKSI LÖYDÖSTÄ, JOTKA MUUTTAVAT SUUNNITELMAA** (luvut 7.1 ja 7.2):

1. **Feidaus EI peitä koko ruutua pystyruudulla.** Suunnitelman luku
   2.5 sanoo, että feidaus ei näy suorakaiteena, *"koska uloszoomauksen
   esto tekee laatikosta koko ruudun"*. Se pitää vain, jos ruudun
   kuvasuhde on sama kuin laatikon. Puhelimella (390 × 844) Ranskan
   laatikon LEVEYS täyttää ruudun, mutta korkeussuunnassa näkyy noin
   1 400 lautayksikköä eli kolminkertaisesti laatikon korkeus — ja
   ensimmäinen pilottikuva näytti sen: vaaleneva ala loppui Välimerellä
   terävään vaakasuoraan viivaan. Korjasin sen HÄIVEELLÄ (feidaus
   laskee nollaan laataston uloimmalla kaistaleella, oletus 15 %
   laatikon lyhyemmästä sivusta = Ranskalla 70 yksikköä), koska
   laataston kasvattaminen näkyvään alaan olisi Ranskassa 4,6-kertainen
   laattamäärä. **Tämä on omistajan päätettävä asia**, ks. luku 7.1.
2. **Feidaus NÄKYY koko näkymässä, mutta yksi pistemittaus ei sitä
   näytä.** Vertailukuvat (luku 6) ovat yksiselitteiset: värillisessä
   näkymässä Englanti, Saksa ja Espanja ovat selvästi vaaleampaa
   seepiaa kuin värittömässä. Feidaus vetää naapurin sävyä paperia
   kohti (B = (1−f)·A + f·paperi), ja koska valtaosalla naapurien
   pinnasta on reliefiä — eli se on paperia TUMMEMPI — vaikutus on
   vaaleneminen. Poikkeus, jonka savuke löysi: Belgian alanko on
   seepiakartalla JO vaaleampi kuin paperi (mitattu rgb(246,243,204)
   vs. paperi rgb(232,220,188)), joten siinä feidaus tummentaa pikseliä
   kaksi yksikköä. Jos omistaja haluaa vaalenemisen myös tasaisilla
   alangoilla, feidausväri on vaihdettava paperia vaaleammaksi — yksi
   rakennusaikainen luku, ks. luku 7.2.

---

## 1. Mitä tehtiin

| Tiedosto | Muutos |
| --- | --- |
| `tools/fokuskartta/piirto.js` | **Murrettu paletti**: `VARI_ASTEIKKO_MURRETTU` ja `VARI_SYVYYS_MURRETTU` suunnitelman luvun 2.3 luvuilla; erän 1 täysväriasteikko JÄI paikalleen vertailukuvia varten. Uusi taulu `VARIPALETIT` ja `variPaletista()`: paletti ja veden peittävyys yhdessä paikassa, jonka sekä generaattori että moottori lukevat. |
| `tools/fokuskartta/maailmapiirto.js` | `variPaletti` sietää kolme muotoa (`true` = erän 1 kutsutapa, nimi, olio) ja tuntematon nimi on VIRHE eikä hiljainen putoaminen seepiaan. Uusi asetus `variVesi` (meren peittävyys ajon valitsimena). Uusi vienti **`polttaVariLeikkuri`**: leikkuri ja feidaus poltetaan laatan alfaan kolmena alueena, ja feidaus häipyy laataston reunalla. |
| `tools/generoi-laattapyramidi.mjs` | Uudet valitsimet `--paletti`, `--vesi`, `--feidaus`, `--feidausreuna`, `--laatikkokerroin`, `--ilman-rajausta`. Laataston laatikko on kahden ehdon UNIONI (laatikko × 1,15 ja laatikko + aluevesipuskuri). Leikkurin renkaat tulevat pelin omasta funktiosta, menevät sivulle omana tiedostona (`vari.json`) ja poltetaan patinan JÄLKEEN. Luetteloon **`varitasot`-taulu** (ISO A3 → kirjaus), joka yhdistyy maittain eikä korvaudu. |
| `js/maanaariviivat.js` | Uusi vienti `maanAluevesiRenkaat()`: sama laskenta kuin leikkuripolulla, eri muoto (pistelistat canvasille). `maanAluevesiPolku` rakennetaan NÄISTÄ renkaista — yksi totuus rajasta. |
| `js/laattapyramidi.js` | Väritason kohdemaa on yksi moduulitason luku (`asetaVaritasonMaa`, `pyramidinVaritasonMaa`), josta osoite, laatasto ja versio luetaan. `varitasonTasot` lukee `varitasot[ISO]`-taulun. **`pyramidinKerrostasot` palauttaa väritason pohjan jälkeen ja rantatason edelle** — väri on maastoa, ranta on merkki. |
| `js/pallolaatat.js` | Väritason oma portti `kerrokset.vari` (ilman sitä väri menisi suodattimen `: true`-haaraan ja piirtyisi väärässä maassa). `lepokerroksenKerrokset` saa kolmannen argumentin (maa) ja palauttaa `vari`-lipun — **EI nullia**, jotta ajamaton maa ei sammuta koko laattakerrosta. Maanvaihto mitätöi laatat (väri on kankaassa, joten vanhan maan laatta on väärä kuva). Mittarit `variMaa`, `varillisia`, `varimitatointeja`. |
| `js/pallolauta/kamera.js` | `ULOSZOOMAUKSEN_KERROIN = 1,15`, apurit `laatikonTarve`, `laatikkoMahtuu` ja **`uloszoomausRaja`**. Saapumisajon kattoehto ja uloszoomauksen eston poikkeus lukevat nyt SAMAA funktiota. |
| `js/pallolauta/lauta.js` | Uloszoomauksen esto: `maanLaatikko` + `maanZoomiraja`, ja `tahdistaZoomirajat` valitsee katon järjestyksessä linssi → maa → laudan oma. Kohdemaa luetaan yhteen muuttujaan (`korostusIso`) ja siitä sekä punaiselle kehälle, väritasolle että zoomirajalle. |
| `js/pallovektorit.js` | **Punainen kehä pallolla**: `KOROSTUS_MUSTE` `#4a3320` → `#b03a2b` ja peitto 0,68 → 1. Sävy luetaan ajossa CSS-muuttujasta `--mark` (`korostuksenMuste()`), jotta pallolla ja tasokartalla on YKSI lähde eikä kahta heksalukua (suunnitelman riski 4.3). Vakio on vara testeille ja niputukselle. |
| `tools/savukkeet/savuke-varilaatat-pallo.mjs` | Uusi savuke (luku 4). Löytyy automaattisesti `tools/tarkista-savukkeet.mjs`:n sarjaan. |
| `tools/savukkeet/README.md` | Savuke luetteloon ja taulukkoon. |
| `tests/` | `maakorostus`, `pallo`, `pallolepokerros`, `pallolaatat`, `maakartuutsi`: vartiot päivitetty uusiin päätöksiin (punainen kehä, väriportti, kahden portaan zoomikatto). |

**EI koskettu:** `js/pollo.js`, `js/livia-*.js`, nostoihin, lehtiin,
kulkutapoihin, aarteeseen, versionumeroon, `SAAPUMISRAJAUKSEN_MAX`iin
(2000), `PALLOLAUDAN_SAAPUMISLEVEYS`iin (240) eikä lähimpään zoomiin.
Tasokartan väritaso (erä 1) jäi paikalleen ja seuraa nyt samaa
`varitasot`-taulua.

## 2. Kolme ratkaisua, jotka poikkeavat suunnitelman kirjaimesta

**2.1 Laataston laatikko on kahden ehdon unioni, ei pelkkä × 1,15.**
Suunnitelma (luku 2.5) sanoo laataston kattavan maan laatikon × 1,15.
Pikkuvaltiolla se olisi aluevesipuskuria PIENEMPI: Singaporen laatikko
on 12 × 6 yksikköä, jonka 15 % on 0,9 yksikköä, kun puskuri on 6,7.
Silloin rannikolle jäisi laataton kaistale juuri siihen, mihin sininen
vesi kuuluu. Laatikko on siksi `max(laatikko × 1,15, laatikko +
aluevesi)`. Ranskalla (1) voittaa, Singaporella (2).

**2.2 Väritaso piirtyy pohjan päälle mutta rantatason ALLE.**
Suunnitelma (luku 2.2) sanoo *"pohjan jälkeen, rantatason edelle"* ja
niin tein, mutta kirjaan perustelun auki, koska se on
piirtojärjestyksen päätös: rantaviiva, reitti ja noston symboli ovat
MERKKEJÄ kartan päällä, värillinen topografia on se kartta itse. Jos
väri piirtyisi rannan päälle, poltettu rantaviiva katoaisi kohdemaan
alta ja maa näyttäisi leijuvan.

**2.3 Feidauksen häive on uusi parametri, jota suunnitelmassa ei ole.**
Ks. luku 0 kohta 1 ja luku 7.1. Se on mitattu korjaus eikä lisäys:
ilman sitä pilottikuva näyttää vaakasuoran rajan keskellä Välimerta.

## 3. Laatat: määrä, koko, polut, aineisto

Ajettu kontin scratchpadiin, **ei repoon**:
`/tmp/claude-0/-home-user-Matkakirja/3ce1a9f3-f333-5bd4-bc99-e9dc3348e1f3/scratchpad/`
(kansiot `vari-072`, `vari-060`, `vari-085`, `vari-ilman`).

Komento (pilotin oletus, omistajan valinta 0,72/0,35):

```
node tools/generoi-laattapyramidi.mjs <kohde> --data <ne-kansio> \
     --tasot 4-8 --kaariminuutit 3 \
     --vari FRA --variversio pilotti --vesi 0.72 --feidaus 0.35
```

| ajo | tasot | laattoja | tavuja | aika |
| --- | --- | ---: | ---: | ---: |
| **vari-072** (vesi 0,72 / feidaus 0,35) | z4–z8 | **329** | **4,63 Mt** | **102 s** |
| vari-ilman (vastakoe, `--ilman-rajausta`) | z4–z8 | 329 | 8,25 Mt | 102 s |
| vari-060 (vesi 0,60 / feidaus 0,25) | z4–z7 | 91 | 1,40 Mt | 37 s |
| vari-085 (vesi 0,85 / feidaus 0,45) | z4–z7 | 91 | 1,42 Mt | 37 s |

Tasoittain (vari-072): z4 2 laattaa · z5 6 · z6 20 · z7 63 · **z8 238**.
Polku ämpärissä `pyramidi/<variversio>/vari/z<taso>/<sarake>/<rivi>.webp`.

**POLTETTU ALFA HALVENTAA LAATAT 44 %.** Sama ajo ilman leikkuria on
8,25 Mt ja leikkurin kanssa 4,63 Mt: läpinäkyvä ala pakkautuu webp:ssä
lähes olemattomaan (pienin laatta 1,0 kt). Suunnitelman arvio (luku
2.6) oli FRA ~4,8 Mt z4–z7:lle; mitattu on z4–**z8**:lle 4,63 Mt eli
arvio yliarvioi selvästi.

**Z8 ON PAKKO AJAA, JA SE ON LÖYDÖS.** Suunnitelma ja erä 1 ajoivat
z4–z7. Uloszoomauksen esto rajaa vain ULOS zoomaamisen: pelaaja saa yhä
zoomata sisään pyramidin syvimmälle tasolle (z8, 480 px/aste), ja
ilman z8-värilaattoja Ranska menettäisi värinsä juuri lähimmässä
näkymässä. Ensimmäinen savukeajo näytti sen suoraan: z8-näkymässä
`varillisia` oli 0 ja aluevesi luki seepiaksi.

**Korkeusaineisto on 3 kaariminuuttia** (repon oma
`tools/korkeusaineisto/etopo-3kaariminuuttia.bin.gz`, ETOPO1, PD).
Tuotannon z7–z8 ajetaan 1′:llä samalla komennolla
(`--kaariminuutit 1`), eikä se vaadi koodimuutosta. Natural Earthin
lähteet (`ne_10m_ocean.geojson`, `ne_10m_lakes.geojson`) noudettiin
ajoa varten scratchpadiin samasta osoitteesta kuin generoi-pyramidi.yml.

## 4. Savuke ja sen kaksi vastakoetta

`tools/savukkeet/savuke-varilaatat-pallo.mjs` avaa PALLON (ei
tasokarttaa), siirtää nappulan Pariisiin, ajaa `saavu()`n, odottaa
levon (`jumissa === 0`, kaikki valmiita, häive perillä) ja mittaa
neljä pikseliä KAHDELLA kameralla. Pohja, ranta-, viiva- ja nostotaso
tulevat tuotannon ämpäristä; vain `vari/z…` tarjoillaan pilottikansiosta
— muuten versioportti sammuttaisi koko kerroksen ja savuke mittaisi
sammunutta karttaa.

**Mittaus on KAKSIVAIHEINEN, ja se on tämän savukkeen tärkein ero
erään 1:** murrettu paletti on tarkoituksella vähemmän kylläinen kuin
seepia (kroma 39 vs. 68), joten Ranskan alanko on samassa lämpimässä
perheessä kuin seepia eikä absoluuttinen luokittelija (erän 1 kolme
ehtoa) voi erottaa niitä. Vaihe A tarjoilee luettelon ILMAN
`varitasot`-taulua — eli pelin täsmälleen sellaisena kuin se oli ennen
tätä erää, mikä on samalla valmis-kriteerin vaatima vertailuajo — ja
vaihe B saman taulun kanssa. Väitteet ovat A:n ja B:n EROJA.

### 4.1 VIHREÄ AJO (vesi 0,72 · feidaus 0,35 · häive 70 yks)

```
PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers \
  node tools/savukkeet/savuke-varilaatat-pallo.mjs --laatat <kansio>
```

| piste | A (ilman väriä) | B (värillä) | ΔL | Δ(r−b) |
| --- | --- | --- | ---: | ---: |
| Keski-Ranska (2,0 E 47,3 N) | rgb(241,232,184) | **rgb(223,213,163)** | −19,3 | +3 |
| Belgia, Namur (4,6 E 50,6 N) | rgb(246,243,204) | rgb(244,240,203) | −2,0 | −1 |
| Lioninlahti 6 mpk (4,5 E 43,02 N) | rgb(219,211,188) | **rgb(191,199,193)** | −11,7 | **−33** |
| Lioninlahti 31 mpk (4,5 E 42,6 N) | rgb(210,204,183) | rgb(217,210,184) | +4,7 | +6 |

Mittarit: taso z5 saapumisnäkymässä, `varillisia` 6 · `variMaa` FRA ·
`syy` tyhjä. **11/11 väitettä läpi.**

Rannikon poikkileikkaus 4,5 E (savukkeen `profiili`-tuloste, sävy
0,05° välein) näyttää kaistaleen luvuissa: 43,15 N alkaen ylös
murrettua maata (228…233, 216…222, 167…175), **43,10…42,95
savunsinistä (191…195, 198…203, 192…196)** ja 42,90 alkaen feidattua
seepiaa (222,214,188).

### 4.2 PUNAINEN AJO 1 — vastakoe `--ilman-rajausta`

Laatat ajettiin generaattorin samalla lipulla ILMAN poltettua
leikkuria ja feidausta; pelissä ei muutettu mitään.

| piste | B (värillä, ilman leikkuria) | luokka | odotus |
| --- | --- | --- | --- |
| Keski-Ranska | rgb(223,212,162) | murrettu maa | murrettu maa |
| **Belgia, Namur** | **rgb(235,226,177)** | **murrettu maa** | feidattu seepia → **FAIL** |
| Lioninlahti 6 mpk | rgb(191,199,193) | savunsininen | savunsininen |
| **Lioninlahti 31 mpk** | **rgb(175,185,182)** | **murrettu vesi (b > r)** | feidattu seepia → **FAIL** |

**9/11 väitettä läpi.** Belgia saa murretun maastonsa ja avomeri
murretun vetensä heti kun leikkuri poistetaan — eli poltettu alfa on
se ja ainoa asia, joka pitää värit Ranskassa, ja savuke mittaa sitä
eikä jotain muuta.

### 4.3 PUNAINEN AJO 2 — vastakoe `--rikki-versio`

Pyramidin luettelon versio muutetaan (`<versio>-rikki`) eikä pallon
sarjaa; mitään muuta ei kosketa.

```
  A: taso znull · laattoja 0 · scenessä 0 · syy "pallon sarja ja pyramidi eri versiota"
  B: taso znull · laattoja 0 · scenessä 0 · syy "pallon sarja ja pyramidi eri versiota"
FAIL  V1 versioportti ei sammuttanut laattakerrosta (syy tyhjä)
```

**4/11 väitettä läpi** (läpi menevät vain erän 2 zoomiväitteet, jotka
eivät riipu laatoista). Tämä on ainoa koe siitä, että V1 mittaa
versioporttia: ilman sitä väritaso voisi olla "päällä" kartalla, joka
on pelkkää sumeaa Mercator-sarjaa (omistajan havainto v1650).

### 4.4 Kolme ansaa, jotka löytyivät matkalla

Kirjaan nämä, koska kaksi ensimmäistä olisi tehnyt mittarista
valehtelijan ja kolmas kirjasi väitteen väärin päin:

1. **Mittauspiste osui saapumiskorttiin.** Pariisin saapumiskortin
   valokuva peitti ruudun keskikolmanneksen, ja Keski-Ranskan piste
   luki sen harmaata (133,120,112). Erän 1 ansa 1 siis toistui.
   Korjaus on käänteinen sääntö: mittauksen ajaksi näkyviin jää VAIN
   pallon kangas ja sen esivanhemmat (906 elementtiä piiloon), ja
   jokainen piste tarkistetaan `elementFromPoint`illa — hyväksytään
   vain, jos osuma on CANVAS. Väljempi ehto ("jokin karttakuoren
   sisällä") päästi kortin läpi, koska kortti on kuoren lapsi.
2. **Kaksi eri kameraa vertailussa.** Ensin A mitattiin ensimmäisestä
   latauksesta ja B uudelleenlatauksen jälkeen; saapumisajon
   loppukorkeus oli A:ssa 0,445 ja B:ssä 0,624, ja `scenessa` erosi
   24 vs. 34 ILMAN että väri lisäsi yhtään verkkoa. Korjaus: A ja B
   ajetaan täsmälleen samalla koodipolulla (kumpikin lataa sivun,
   siirtää nappulan, saapuu, odottaa levon), ja V6 mittaa `nakyvia`-
   lukua kiinteältä kameralta eikä `scenessa`-lukua saapumisnäkymästä
   (`scenessa` laskee mukaan LRU:n pitämät edellisen näkymän laatat).
3. **Aluevesipiste osui rantaan, ja pistetesti valehteli.** Ensin
   mittauspisteen paikka laskettiin Natural Earthin merirenkaista, ja
   testi väitti rannan olevan 43,46 N:ssä; kartalta mitattu profiili
   näyttää sen olevan 43,12 N:ssä. Piste oli siis maalla ja luki
   murrettua maata. Piirtomoottorin oma maa/meri-päätös on se, mikä
   laatassa on — pistetesti oli neljäs totuus samasta rannasta, ja
   mittauspisteet tulevat nyt profiilista.

## 5. Suorituskyky ja laattamäärä

Mitattu kontissa, Chromium `/opt/pw-browsers/chromium`, iPhone-profiili
390 × 844 dpr 3, nappula Pariisissa, tuotannon pohjalaatat ämpäristä.

**Laattamäärä ja tekstuurimuisti.** Saapumisnäkymä (z5), molemmat
vaiheet samalla kameralla (lat 46,35 · lng 2,213 · alt 0,4448):

| | nakyvia | laattoja | scenessä | tavuja | tavuja/laatta |
| --- | ---: | ---: | ---: | ---: | ---: |
| ilman väriä | 24 | 30 | 24 | 41 943 030 | 1 398 101 |
| värillä (varillisia 6) | **24** | **30** | **24** | **41 943 030** | **1 398 101** |

Sama kiinteältä mittauskameralta (Ranska + Belgia, z6): `scenessä` 39
kumpaisessakin, `varillisia` 0 → 19. V6:n väite on juuri tämä —
`nakyvia` yhtä suuri ja tavut laattaa kohti samat.

**Lisäys on 0 %, ei +10 %.** Se on suosituksen (A) koko pointti: väri
piirtyy samaan kankaaseen (`for (const kuva of kuvat) ctx.drawImage`),
joten uutta verkkoa, uutta tekstuuria eikä uutta GPU-muistia ei synny —
vain yksi lisähaku laattaa kohti. Tasokartalla erä 1 mittasi pahimmassa
tapauksessa +54 %.

**Kehysajat JATKUVASTA UUDELLEENMAALAUKSESTA** (pallo pyörii 0,4°
kehyksessä, 12 s, rAF-erot; 15 kehystä per ajo):

| | p50 | p95 | max | fps |
| --- | ---: | ---: | ---: | ---: |
| ilman väriä | 833,3 ms | 916,7 ms | 916,7 ms | 1,2 |
| värillä | **833,3 ms** | 866,6 ms | 866,6 ms | 1,2 |

**Tulkinta rehellisesti:** kontissa ei ole GPU:ta, ja pallon
uudelleenmaalaus on ohjelmistorenderöinnillä 0,83 sekuntia kehykseltä.
Mediaani on SAMA värillä ja ilman, ja p95 on värillä pienempi kuin
ilman — ero on siis mittausmelun sisällä (kolmessa ajossa p50-parit
olivat 833/833, 833/817 ja 800/833 ms), ja se on odotettu tulos:
kerros ei lisää verkkoja eikä tekstuureja, joten piirtokutsujen määrä
ei muutu. **Tämä mittaus EI kerro laitteen nopeudesta** — se kertoo,
ettei värikerros lisää piirtotyötä. Erän 1 varoitus pitää siis yhä:
**laitetodennus oikealla puhelimella ja iPadilla on tekemättä**, ja
erityisesti `LAATTAKATTO_TAVUT` (96 Mt) on kova raja, jota tämä erä ei
liikuta mutta joka on mitattava laitteella.

## 6. Kuvakaappaukset — mitä NÄIN

Neljä kuvaa repossa (`docs/raportit/kuvat/`, 304 × 658, kukin alle
391 kt), loput scratchpadissa (`…/scratchpad/kuvat/`, mm. rannikon
lähikuvat kaikista kolmesta vaihtoehdosta). Kaikki neljä ovat
SAAPUMISNÄKYMÄSTÄ (Ranska kokonaan ruudussa, z5, 390 × 844) eli siitä
näkymästä, johon peli saapuu.

- **`karttauudistus-1b-ilman-varia.png`** — vertailu, sama kamera.
  Ranska on samaa seepiaa kuin naapurit, ja koko näkymä on selvästi
  lämpimämpi: Englanti, Saksa ja Espanja ovat oranssinruskeita.
  **Punainen kehä on tässä kuvassa jo mukana** — se tulee pallon
  vektorikerroksesta eikä värilaatoista, joten se toimii myös ilman
  laatastoa. Juuri tästä kuvasta näkee, mitä väritaso muuttaa ja mitä
  ei.
- **`karttauudistus-1b-vesi072-feidaus035.png` (OLETUS)** — Ranska on
  yhtenäinen murrettu alue: alangot kellertäviä, Massif Central,
  Vogeesit ja Alpit ruskehtavia, Alppien korkeimmat harmaanvihreitä.
  **Punainen kehä kulkee koko maan ympäri, myös Korsikan, ja lukee
  selvästi ilman että siitä tulee tolppa.** Rannikolla on ohut
  savunsininen kaistale, joka seuraa rantaa myös Gironden suistossa ja
  Bretagnen niemien ympäri. **Naapurit ovat selvästi vaaleampia kuin
  vertailukuvassa** ja häipyvät omaan sävyynsä laataston reunalla —
  reuna lukee vinjettinä eikä viivana (häive, luku 7.1). Mitään
  vaakasuoraa rajaa ei näy.
- **`karttauudistus-1b-vesi060-feidaus025.png`** ja
  **`karttauudistus-1b-vesi085-feidaus045.png`** — **SAAPUMISNÄKYMÄSSÄ
  KOLME VAIHTOEHTOA OVAT SILMÄLLE LÄHES SAMAT.** Sanon sen suoraan,
  koska se on tämän kuvasarjan tulos: 12 mpk:n kaistale on siinä
  mittakaavassa 3–4 pikseliä leveä, ja feidauksen ero 0,25 → 0,45 on
  muutaman yksikön kirkkausero. Valinta näkyy vasta rannikon
  lähikuvassa, ja siitä on numerot alla.

**RANNIKON POIKKILEIKKAUS 4,5 E — TÄSTÄ VALINTA TEHDÄÄN.** Savukkeen
`profiili`-tuloste, sävy 0,05° välein; aluevesi on 43,10…42,95 ja
feidattu avomeri 42,90 alkaen. Vertailuluku "ilman väriä" on samasta
kohdasta mitattu A-vaihe.

| | aluevesi 43,05 | b − r | avomeri 42,80 | ero väritömään |
| --- | --- | ---: | --- | ---: |
| ilman väriä | (ei kaistaletta) | — | rgb(210,204,183)\* | — |
| **vesi 0,60 / feidaus 0,25** | rgb(203,207,196) | **−7** | rgb(218,209,186) | +4 |
| **vesi 0,72 / feidaus 0,35** | rgb(194,202,196) | **+2** | rgb(220,212,187) | +6 |
| **vesi 0,85 / feidaus 0,45** | rgb(186,198,196) | **+10** | rgb(223,213,187) | +10 |

\* mitattu 42,6 N:stä, jossa A-vaiheen mittauspiste on.

**Tämä on se yksi luku, joka ratkaisee.** `b − r` kertoo, onko vesi
kanavajärjestyksessä sinistä vai lämmintä: **0,60:n vesi EI ole sinistä
(b < r)**, se on vaaleaa paperinharmaata; 0,72 on niukasti sinistä
(+2); 0,85 on selvästi sinistä (+10). Kuvissa kaikki kolme lukevat
sinertävinä, koska ympärillä on lämmintä maastoa (silmä tekee eron
kontrastista) — mutta 0,60 on sen varassa, eikä se kestä lämpimämpää
näyttöä tai painoa.

**Oma suositus: 0,72 / 0,35 (oletus), ja 0,85 / 0,45 jos omistaja
haluaa veden lukevan vetenä myös yksin katsottuna.** 0,60:tta en
suosittele: omistajan ehto oli *"vedetkin nakyvat sinisena syyvyyserot
huomioiden"*, eikä b < r ole sinistä. Vaihto on yksi valitsin ja uusi
laattojen ajo (37 s Ranskalle z4–z7, 102 s z4–z8) — ei koodimuutos.

## 7. Avoimet asiat (Fablelle ja omistajalle)

**7.1 FEIDATTU ALA EI OLE KOKO RUUTU — KAKSI TIETÄ, OMISTAJAN
PÄÄTÖS.** Suunnitelman luku 2.5 oletti, että uloszoomauksen esto tekee
laatikosta koko ruudun. Mitattuna se ei pidä pystyruudulla: Ranskan
laatikko × 1,15 on 648 yksikköä leveä, ja puhelimen kuvasuhteella
(390 × 844) sama näkymä on **1 403 yksikköä korkea** eli
kolminkertainen laatikon korkeuteen (467). Työpöydällä (1440 × 900)
sama lasku antaa 859 × 537, eli siellä ylimääräinen ala on LEVEYSsuunnassa.

- *(a) Häive (tehty, oletus).* Feidaus laskee nollaan laataston
  uloimmalla 70 yksiköllä. Hinta: nolla lisälaattaa. Ilme: vanhan
  kartan vinjetti, ja naapurit vaalenevat vain Ranskan ympärillä.
- *(b) Laatasto näkyvään alaan.* Laatikko kasvatetaan kuvasuhteiden
  unioniin (859 × 1 403 yksikköä). Hinta Ranskassa **4,6-kertainen
  pinta-ala**, arvio ~1 500 laattaa ja ~21 Mt z4–z8 (mitattu 329
  laattaa / 4,63 Mt × 4,6), ja sama kerroin joka maalle — koko
  Eurooppa olisi arvio 0,5–1 Gt. Ilme: feidaus kattaa koko ruudun
  kaikilla kuvasuhteilla.

Suositus: **(a)**, ja (b) vain jos omistaja sanoo häiveen näyttävän
keskeneräiseltä. Häiveen leveys on yksi valitsin (`--feidausreuna`),
joten sen kasvattaminen ei vaadi koodimuutosta.

**7.2 FEIDAUSVÄRI ON PAPERI — VAALENTAAKO SE RIITTÄVÄSTI?** Feidaus
vetää naapurin sävyä paperia `#e8dcbc` (232,220,188) kohti, ja
kokonaisnäkymässä se toimii (luku 6: naapurit ovat selvästi vaaleampia
kuin vertailukuvassa). Mutta siellä, missä naapurin seepia on JO
paperia vaaleampi — Belgian alanko rgb(246,243,204) — feidaus
tummentaa pikseliä kaksi yksikköä. Omistajan sana oli *"MUUT MAAT
FEIDATAAN vaaleammiksi"*. Jos tarkoitus on vaalentaa myös tasaiset
alangot, feidausväri pitää vaihtaa paperia vaaleammaksi (esim. arkin
marginaalin kerma rgb(246,237,198) tai sitä vaaleampi). Se on yksi luku
`polttaVariLeikkuri`ssa ja yksi uusi valitsin — **en tehnyt sitä, koska
se on ilmeen päätös eikä tekninen valinta**, ja koska nykyinen
käyttäytyminen on täsmälleen suunnitelman luvun 2.5 taulukko.

**MITTAUSPISTEEN RAJOITE, JOTTA V3:A EI LUETA ENEMPÄÄ KUIN SE ON.**
Belgian mittauspiste (4,6 E 50,6 N) on häiveen sisällä: laataston
pohjoisreuna on 51,8 N ja häive 70 yksikköä eli 2,1°, joten pisteessä
feidaus on noin 57 % nimellisestä 0,35:stä. V3 vaatii, että pikseli on
liikkunut paperia kohti ja pysynyt nimellisen feidauksen haarukassa
(± 8 kanavaa kohti) — se ei siis mittaa feidauksen MÄÄRÄÄ tarkasti,
vaan sen suunnan ja sen, ettei väri vuoda naapuriin. Vastakoe kaataa
sen (luku 4.2), joten väite ei ole tyhjä, mutta määrän mittaus vaatisi
pisteen täyden feidauksen alueelta.

**7.3 Z8 ON AJETTAVA JOKA MAALLE.** Ks. luku 3. Tämä nostaa arvion
Euroopan laatastosta: suunnitelman luku 2.6 laski z4–z7:n (FRA 128
laattaa), ja z8 nelinkertaistaa z7:n (FRA 238 laattaa yksin). Mitattu
FRA z4–z8 on 329 laattaa / 4,63 Mt, eli Euroopan pelattavat maat ovat
arvio **3–6 Mt kukin** ja koko Eurooppa arvio **80–150 Mt** —
suunnitelman arvio 50–100 Mt oli z8:tta vaille.

**7.4 Monen maan taulu on tehty, mutta sitä ei ole ajettu kahdella
maalla.** `varitasot` on ISO A3 -avaimellinen ja yhdistyy maittain
(`{...vanha, ...uusi}`), ja peli hakee laatastoa vain pelaajan maan
avaimella. **Toisen maan ajo on yksi komento** (luku 8), mutta kahden
maan yhtäaikaista luetteloa ei ole mitattu. Se kannattaa tehdä ennen
kolmatta maata.

**7.5 Kaksi viereistä havaintoa, joita EN korjannut.** (1)
Merkkitasoajo TYHJÄÄN kansioon kirjoittaa `luettelo.tasot`-kentän omista
tasoistaan, vaikka se ei piirrä yhtään pohjalaattaa; jos samaan kansioon
ajetaan sen jälkeen toinen merkkitaso eri tasoilla, vanha kenttä jää
(näin kävi pilotissa: z4–z8-ajo perisi z4–z7:n). Tuotannossa tämä ei
näy, koska kansiossa on aina pohja-ajo ensin, mutta savukkeen
laattaruudukon tarkistus kaatui siihen. (2) Pallon laattakerroksen
`scenessa`-mittari laskee mukaan LRU:n pitämät edellisen näkymän laatat,
joten se ei kelpaa kahden näkymän vertailuun — `nakyvia` kelpaa. Kumpikin
on kirjattu tähän, ei korjattu (Kustannuskuri 1).

**7.6 Mitä EI vielä ole todennettu.** Laitetodennus oikealla
puhelimella ja iPadilla (kehysajat, `LAATTAKATTO_TAVUT` 96 Mt);
merentakaiset osat (Ranskan Guayana ja Réunion jäävät laataston
ulkopuolelle, joten niissä kartta on seepiaa — tarkistettava ennen
monistusta, jos pelissä on kaupunki merentakaisella alueella); offline
(laatat tulevat ämpäristä, joten verkottomassa pelissä kohdemaa on
seepiaa kunnes värilaatat on kerran ladattu, eikä yhden tiedoston
Pages-versio lataa niitä lainkaan).

## 8. Mitä toisen maan ajo vaatii

**Peli ei tarvitse koodimuutosta.** Yksi komento maata kohti, ja
luettelo täydentyy:

```
node tools/generoi-laattapyramidi.mjs <kohde> --data <ne-kansio> \
     --tasot 4-8 --kaariminuutit 1 \
     --vari <ISO A3> --variversio <versio> --vesi 0.72 --feidaus 0.35
```

Ehdot: (1) sama `<kohde>`-kansio kuin muilla maan ajoilla, jotta
`varitasot`-taulu täydentyy; (2) sama `--variversio` kaikille maille,
koska osoite on `<variversio>/vari/z…` ja yksi versio on yksi julkaisu;
(3) pohja-ajon luettelo samassa kansiossa, jotta `tasot` on pohjan eikä
merkkitason (luku 7.5); (4) **molemmat luettelot (laatat.json ja
pyramidi.json) päivittyvät samassa julkaisussa**, tai versioportti
sammuttaa koko laattakerroksen (suunnitelman riski 4.2, todistus luvussa
4.3).

Mitattu FRA:sta johdettu arvio (0,014 tavua/px, 3,2 laattaa/s 3′:llä):

| maa | laatikko × 1,15 ∪ puskuri | laattoja z4–z8 (arvio) | tavuja (arvio) | aika (arvio) |
| --- | --- | ---: | ---: | ---: |
| FRA | 563 × 467 | **329 (mitattu)** | **4,63 Mt (mitattu)** | **102 s (mitattu)** |
| GRC | 345 × 319 | ~170 | ~2,4 Mt | ~55 s |
| ESP | 538 × 374 | ~250 | ~3,5 Mt | ~80 s |
| ITA | 472 × 547 | ~290 | ~4,1 Mt | ~90 s |
| DEU | 367 × 411 | ~200 | ~2,8 Mt | ~65 s |

RUS, USA, CAN, GRL, CHN (ja työpöydällä CHL, BRA, ARG, AUS) eivät saa
uloszoomauksen estoa eivätkä tarvitse z8:aa, koska niiden saapumisnäkymä
osuu kattoon 2000 — niille riittää z4–z6 tai ei väriä ensimmäisessä
aallossa (suunnitelman suositus kysymykseen 4 pätee edelleen).

## 9. Portit

| portti | tulos |
| --- | --- |
| `npm test` | **3308 testiä, 3295 pass, 0 fail** |
| `node tools/tarkista-kaksoisavaimet.mjs` | ei kaksoisavaimia |
| `node tools/tarkista-niputus.mjs` | 388 moduulia, 4172 julistusta, ei törmäyksiä |
| `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers node tools/tarkista-savukkeet.mjs` | savukkeet kunnossa: 1510 ui-viittausta, 399 metodia, 532 kenttää |
| `node tools/build-standalone.mjs` | dist/matkakirja.html 31 764 kt (EI committiin) |
| `grep -rn '^<<<<<<<' js css tests tools` | tyhjä |
| `savuke-varilaatat-pallo` | **11/11** |
| `savuke-varilaatat-pallo --ilman-rajausta` | **9/11 (vastakoe punainen, kuten pitää)** |
| `savuke-varilaatat-pallo --rikki-versio` | **4/11 (vastakoe punainen, kuten pitää)** |
