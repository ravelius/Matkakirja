# Viesti Fablelle: loitonnus ei vie pisteitä (18.9.2026)

Erä: Raamattu, KARTTAUUDISTUKSEN PAATOKSET 34 kohta 21 **"PISTEET
NAKYVAT AINA KOHDEMAASSA"**, jatkoerä. Haara
`claude/bold-ride-vow4ki-loitonnus-pisteet`, pohja
`claude/bold-ride-vow4ki-v1945` (f925a8ae).

Edellinen erä (docs/raportit/viesti-fable-pisteet-aina-20260918.md)
jätti auki luvun 6 kohdan 2: *"loitonnusele latoo uudelleen vaikka
kamera ei liiku"* — savukkeen vartio 7 oli punainen kaikilla kolmella
ruudulla (390 px 36 → 4, 1400 px 45 → 23, 2000 px 45 → 32).

**Vartio 7 on nyt vihreä kaikilla kolmella ruudulla, ja tunnettu
punainen on poistettu sarjat.json:ista. Pelin koodiin ei tarvinnut
koskea lainkaan — juurisyy oli mittarissa.**

---

## 1. Juurisyy: PALJAS RULLA EI OLE ZOOMI VAAN PANOROINTI

Vartio 7 loitonsi näin (vanha `loitonna`):

```js
await sivu.mouse.wheel(0, 240);   // kuusi kertaa, ei näppäintä pohjassa
```

Mutta tässä pelissä paljas wheel EI ole zoomi. Omistajan oma päätös
5.9.2026 (*"kahdella sormella (nipistys eleen voi ottaa pois
pöytäkoneelta)"*) on toteutettu js/pallo.js:n kotelon
wheel-kuuntelijassa KAAPPAUSVAIHEESSA (rivi 2822):

```js
kotelo.addEventListener('wheel', (e) => {
  // Cmd (mac) tai ctrl (Windows ja trackpadin nipistys) = zoom.
  if (e.metaKey || e.ctrlKey) return;
  e.preventDefault();
  e.stopPropagation();
  ...
  siirraPalloa(askel.dLat, askel.dLng);   // ← PANOROINTI
```

`rullanAskel` (js/pallo.js) muuntaa deltaY:n leveysasteiksi:
`dLat = -deltaY · k`, missä `k` = näkyvä kaista / kotelon leveys.
1400 px:llä korkeudella 0,2049 yksi 240 pikselin pykälä on **1,83°**,
ja kuusi pykälää **11°** etelään — enemmän kuin ruudullinen.

### Mittaus, joka kaatoi vanhan tulkinnan

Yksi Playwright-ajo, 1400 × 900, dpr 2, Ranskan saapumisnäkymä
(diagnoosiskripti, sama pohja kuin savukkeella):

| ele | lat | korkeus | nostopisteet | kaupungit |
|---|---|---|---|---|
| 1 saapuminen | 46,350448178680686 | 0,20493352671271636 | 57 | 7 |
| 2 **ctrl+wheel** (aito zoom ulos) | 46,350448178680650 | 0,20493352671271703 | **57** | **7** |
| 3 paljas wheel (panorointi) | **40,632944928447740** | 0,20493352671271614 | 34 | 4 |

Kameran korkeus ei muutu kummassakaan eleessä — ja se on oikein:
uloszoomaus on lukittu maan laatikkoon (PAATOKSET 17), ja
saapumisnäkymä ON uloin sallittu näkymä (`uloinOsuus` = 1). Aito
loitonnusele ei siis voi viedä kameraa kauemmas, eikä se vie
pisteitäkään: 57 → 57.

Paljas wheel sen sijaan vei kameran **5,72° etelään**. Ranskan
pohjoispuolisko — Pariisi, Lille, Strasbourg, Normandia — oli ruudun
ULKOPUOLELLA. Pudonneet 23 pistettä eivät olleet kerroksen
pudottamia; ne eivät olleet ruudulla. 390 px:n pystyruudulla sama ele
on vielä rajumpi (ruutu on 6,9° korkea), mistä luku 36 → 4.

**Vartio 7 siis mittasi panorointia ja väitti sitä loitonnukseksi.**
Epäilylistan kaikki kolme vaihtoehtoa (keraa() saa eri
`uloinOsuus`/`osuusNyt`, ruuhkasääntö karsii liikkeessä, vedon aikainen
lepokerros) ovat mittauksen valossa vääriä: `lehdenOsuus` on
`bbox.w / nakyva.w` eikä riipu panoroinnista lainkaan, `uloinOsuus`
pysyi arvossa 1, ja `pisteetVain`-haara oli päällä koko ajan.

Kosketuslaitteella työnjako on sama: kaksi sormea panoroi, NIPISTYS
menee OrbitControlsille (dolly) — ja macOS lähettää nipistyksen juuri
ctrl+wheelinä. Omistajan oikea loitonnusele on siis nipistys, jonka
savuke tavoittaa `ctrl`-näppäimellä.

---

## 2. Muutokset

Pelin koodiin **ei muutoksia**. PAATOKSET 17:n saapumissovitusta,
`NOSTOJEN_KATTO`a ja `PISTEIDEN_KATTO`a ei koskettu.

**tools/savukkeet/savuke-ranskan-nostot-lukossa.mjs**

1. Uusi perustelulohko *ZOOMIELE ON CTRL+WHEEL, EI PALJAS WHEEL*
   mittaustaulukkoineen — jottei seuraava erä mittaa samaa väärin.
2. `loitonna` → `zoomaa(sivu, suunta, askelia)`: ctrl pohjassa, jolloin
   js/pallo.js päästää tapahtuman OrbitControlsille. Apurit
   `kankaanKeskus` ja `kameranTila` (lat, lng, korkeus, uloinOsuus).
3. **Vartio 7 siirtyi vedon jälkeen saapumisnäkymän perään.** Kohta 21
   puhuu saapumisnäkymästä ulospäin, joten mitta otetaan siitä eikä
   200 px:n vedon jälkeisestä tilasta.
4. Vartio 7:n mitta on nyt kaksiosainen: absoluuttinen raja (sama kuin
   vartiossa 5) JA ero lepotilaan ennen elettä (`LEPOTILAN_SIETO` = 1).
   Pelkkä raja ei huomaisi hiipumista rajan yläpuolella; pelkkä ero ei
   huomaisi sitä, että molemmat lepotilat ovat liian niukkoja.
5. Uusi **vartio 7a: loitonnusele zoomaa eikä panoroi**
   (`PANOROINNIN_SIETO_ASTETTA` = 0,05). Ilman tätä vartio 7 voisi
   jälleen livetä panoroinniksi huomaamatta — juuri se vika, joka teki
   siitä punaisen.
6. Uusi **vartio 7c: kaupunkimerkkejä yhtä porrasta loitompana**
   (määrä ennen/jälkeen, kuten koordinaattori pyysi). INFO-rivit
   kameran korkeudesta ja `uloinOsuus`ista ennen ja jälkeen.
7. Uusi **vartio 7d: zoomi sisään ja takaisin ulos palauttaa pisteet**.
   Vartio 7 mittaa eleen, jossa zoomilukko pitää kameran paikallaan;
   7d liikuttaa kameraa AIDOSTI (0,2049 → 0,1576 → 0,2049) ja vaatii
   pistejoukon palaavan ±1. Mitta on vain erotus, ei vartion 5
   absoluuttinen raja: 7d ajetaan vedon jälkeen, ja 200 px:n veto on
   390 px:n ruudulla yli puolet leveydestä (mitattu 28 → 28).

**tools/savukkeet/sarjat.json**

8. Tunnettu punainen `"yhtä porrasta loitompana nostopisteitä"` ja sen
   huomautus **poistettu** — savukkeella ei ole enää yhtään
   tunnettua punaista.

---

## 3. Luvut kolmella ruudulla (yksi savukeajo, PORTTI 8817)

Chromium, dpr 2, Ranskan saapumisnäkymä, Pariisi-tallenne. Ele on
ctrl+wheel × 6 ulospäin kartan keskellä.

| ruutu | korkeus ennen | korkeus jälkeen | pisteet ennen → jälkeen | kaupungit ennen → jälkeen |
|---|---|---|---|---|
| 390 × 844 | 0,20492975597087248 | 0,20492975597087248 | **50 → 50** | **5 → 5** |
| 1400 × 900 | 0,20493352671271636 | 0,20493352671271703 | **60 → 60** | **7 → 7** |
| 2000 × 1300 | 0,20493352671271636 | 0,20493352671271703 | **60 → 60** | **7 → 7** |

Rajat: pisteitä ≥ 40 (390 px ≥ 36), kaupunkeja ≥ 7 (390 px ≥ 5).
Ero lepotilaan on **0 kaikilla kolmella ruudulla** — vaatimus oli ±1.

Zoomimatka (vartio 7d, korkeus ulko → sisä → ulko):

| ruutu | korkeudet | pisteet ennen → jälkeen |
|---|---|---|
| 390 × 844 | 0,204930 → 0,157606 → 0,204930 | 28 → 28 |
| 1400 × 900 | 0,204934 → 0,157609 → 0,204934 | 60 → 60 |
| 2000 × 1300 | 0,204934 → 0,157609 → 0,204934 | 60 → 60 |

Kamera siis todella liikkui (23 % sisään) ja palasi lukkoa vasten
samaan korkeuteen 15 desimaalin tarkkuudella — eikä yhtään pistettä
kadonnut matkalla.

**Luvut ovat nousseet edellisestä erästä** (45 → 60 leveällä, 36 → 50
puhelimella), koska tässä pohjassa ovat mukana rinnakkaisen erän 12
lisänostoa ja poltettu nostotaso: kaikki 50–60 pistettä tulevat nyt
laatasta (`poltettuja 60`, DOM-merkkejä vain 12–13). Edellisen erän
`PISTEIDEN_KATTO` 120 kantaa nekin.

---

## 4. Savukkeen tila

`node tools/savukkeet/savuke-ranskan-nostot-lukossa.mjs` (PORTTI=8817,
Mac Studio, Chromium, kolme ruutua): **26/27 vartiota läpi** —
ainoa punainen oli uuden 7d:n absoluuttinen raja 390 px:llä (28 ≥ 36),
joka korjattiin kohdan 2.7 mukaisesti. Korjauksen jälkeen 390 px:n
vahvistusajo: **11/11 vartiota läpi**.

Vartiot 7, 7a ja 7c ovat vihreitä KAIKILLA KOLMELLA RUUDULLA, samoin
vanhat 1–6, 4b ja uusi 7d.

`node --test tests/*.test.mjs`: **# pass 3625, # fail 0** (# skipped 13).
`node tools/build-standalone.mjs`: OK (dist 32694 kt).

**WebKit:** savuke ei tue `--webkit`-lippua (`chromium.launch` on
kovakoodattu) — tehtävänannon mukaisesti tukea EI lisätty tässä
erässä. Velka on yhä auki (edellinen erä kirjasi sen luvussa 5).

---

## 5. Viereiset havainnot (en korjannut)

1. **PANOROINTI VIE PISTEITÄ — JA SE ON OIKEIN, MUTTA OMISTAJA VOI
   NÄHDÄ SEN VIKANA.** Kuusi rullapykälää vie kameran 390 px:llä niin
   etelään, että Ranskan pohjoispuolisko on ruudun ulkopuolella, ja
   pisteitä jää 4. Panorointiraja (`maanPanoraja`,
   PANOROINNIN_KERROIN 1,3) sallii sen. Jos omistaja tarkoitti, ettei
   kohdemaa saa valua noin pitkälle ruudun ulkopuolelle, se on oma
   päätöksensä panorointirajasta — ei kohta 21.
2. **390 PX:LLÄ 10 RANSKAN NOSTOA ON YHÄ KUVAN ULKOPUOLELLA**
   (montblanc, biskajanlahti, carnacin-kivirivit, hahmotelma-verdon,
   hahmotelma-saint-malo, hahmotelma-pointe-du-raz, hahmotelma-ajaccio,
   hahmotelma-bonifacio, hahmotelma-biarritz, nosto-maalehti-chandeleur).
   Edellisessä erässä niitä oli 12; PAATOKSET 17:n korkeuteen sovitus,
   johon ei saanut koskea.
3. **PALJAS RULLA ZOOMAA KAIKISSA MUISSA KARTTAPELEISSÄ.** Omistajan
   päätös 5.9.2026 on tietoinen ja dokumentoitu, mutta se tekee
   työpöytäselaimen loitonnuksesta piilotetun (cmd tai ctrl pohjaan).
   Jos omistaja testaa hiirellä ilman näppäintä, hän näkee kartan
   liukuvan pois eikä loitontuvan — sama ilmiö, jonka tämä erä mittasi.
   Ei muutettu; kirjaan sen vain siksi, että se selittää löydöksen 1.
4. **KUVASARJA PEITTÄÄ KARTAN NOSTOT** — edellisen erän luvun 6 kohta 1
   on yhä auki, ei koskettu.

---

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
