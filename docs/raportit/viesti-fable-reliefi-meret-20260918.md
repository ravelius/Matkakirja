# Viesti Fablelle: topografialinssin avomeri, navat ja puuttuvat laatat (18.9.2026)

Haara `claude/bold-ride-vow4ki-reliefi-meret`, pohja
`origin/claude/bold-ride-vow4ki-v1947` (Raamattu PAATOKSET 41 kohdat 1–3).
Astronautin kameran pyramidikytkentä (kohta 4) on toisen erän työ; siihen
ei ole koskettu.

## 1. Juurisyyt omistajan kolmeen iPhone-kuvaan

**a) Musta meri ja Välimeri — kaksi tummansinistä suorakaidetta.**
Polttotyökalu ohittaa laatan, jonka JOKAINEN pikseli on alle −200 m
(`tools/tee-reliefipyramidi.mjs pelkkaaMerta`), ja peli maalasi niiden
tilalle yhden vakiovärin `MERIVARI = rgb(38, 78, 145)` — asteikon arvo
−4 000 metrissä. Ohitusraja ja väri EIVÄT ole sama syvyys: Välimeren ja
Mustanmeren altaat ovat 1 000–2 500 metriä, eli asteikolla
`rgb(62,112,176)`…`rgb(100,155,208)`, selvästi vaaleampia. Laatta erottui
siksi täsmälleen laatan reunoja pitkin — suorakaide. Pyramidin meri on
batymetrinen; yksi vakioväri ei voi kuvata sitä missään.

**b) Pohjoisnapa — iso beige levy ja tummansininen rengas.**
Levy on pallon omat napakappaleet: yksivärinen napakansi
(`js/pallo.js NAPAKANSI_POHJOINEN '#c9c2af'`, 83,7°:sta napaan) ja sen
päälle ladattu SEEPIAKARTAN napakalotti. Kumpikaan ei tiennyt linssistä
mitään. Rengas on kansien ja reliefin poltetun reunan väliin jäävä
laattakaistale (z6/z7:n poltto loppuu 76,7°:seen), joka maalattiin
kohdan (a) vakiovärillä. Reliefi ”vain reunoilla” = poltettu alue.

**c) Siperia — seepiapohjaa reliefin vieressä.**
Laatasto on poltettu rajatulle alueelle: z7:n ja z6:n pohjoisreuna on
76,7°, z5:n 78,7° ja z4:n 82,4°; etelässä −58,5…−65,4° ja idässä 180°
(arkki ulottuu 185°:seen). Näitä laattoja EI ole luettelon
`meriLaatat`-listalla, joten peli pyysi ne ja sai 404:n — ja koska
paikanpitäjää ei ollut, alta näkyi pallon oma seepiatekstuuri
(`PALLO_TEKSTUURI`), vaikka LISAYS 16 kohta 49 kieltää pohjan linssin
alla. Siperian rannikko (Tajmyr, Severnaja Zemlja) osuu juuri tähän
rajaan.

## 2. Korjaukset

1. **Puuttuvan laatan paikanpitäjä on KARKEAMMAN TASON reliefilaatta**
   (`js/reliefipyramidi.js reliefinVaraLahde`, käyttö
   `js/pallolaatat.js`). Laatalle z/s/r etsitään lähin esi-isä, joka on
   poltettu, ja siitä piirretään tämän laatan oma neljännes
   (`sx,sy,sw,sh` → laatan kangas). Sama aineisto, sama asteikko, sama
   varjostus kuin naapurilla, joten sauman kahta puolta on sama väri —
   ja meri on sileä kenttä, joten venytys ei näy. Tämä korjaa yhdellä
   mekanismilla sekä avomeren suorakaiteen (a) että aukon seepian (c);
   kohdan 49 vaatimus ”paikanpitäjä on ylemmän tason reliefilaatta, ei
   seepiapohja” toteutuu kirjaimellisesti.
   *Valinta:* naapurin reunapikselien keskiarvoa (pehmeä reuna) EI
   toteutettu — karkea laatta on sama asia tarkemmin, koska se kantaa
   myös batymetrian muodon eikä vain yhtä sävyä.
   Varalaatoille on kuuden laatan LRU-välimuisti (yksi karkea laatta on
   paikanpitäjä kymmenille tarkoille; 512 × 512 × 4 = 1 Mt kappale).
2. **Tasainen väri jää vain sinne, mihin karkeaakaan laattaa ei ole**,
   ja se on leveysasteen mukainen: `reliefinTaustavari(lat)` antaa
   avomeren sävyn ja `JAARAJA_LAT = −65`:n eteläpuolella napajään sävyn
   `JAAVARI = rgb(236, 240, 244)` (sama luku kuin työkalun `JAAN_VARI`).
   Etelämannerta ei enää maalata valtameren sinisellä.
3. **Navat seuraavat linssiä.** `js/reliefipyramidi.js` sai
   `kuunteleReliefiLinssi(fn)`:n, ja `js/pallo.js lisaaNapakannet`
   kuuntelee sitä: linssin ajaksi seepiakalotti piiloon ja kansi
   näkyviin reliefin sävyissä (pohjoinen `MERIVARI`, etelä `JAAVARI`),
   sulkiessa kaikki entiselleen. Beige levy katoaa, ja koska kansi on
   samaa sävyä kuin kaistale sen alla, myöskään rengasta ei synny.
4. **404-laskuri kentälle:** `window.matkakirja.ui.reliefi404()` →
   `{ puuttuvat, varoja, tasavareja, taso }` (kerroksen mittarit
   `reliefi404`, `reliefiVaroja`, `reliefiTasavareja`).

## 3. Puuttuvat laatat: luettelo vs. ämpäri (z5–z7)

Mitattu `aws s3 ls --recursive` (vain listaus) vs. `reliefipyramidi.json`:

| taso | ruudukko | ämpärissä | meriLaatat | puuttuu |
|------|----------|-----------|------------|---------|
| z4 | 22 × 13 = 286 | 201 | 30 | **55** |
| z5 | 43 × 26 = 1 118 | 626 | 214 | **278** |
| z6 | 85 × 52 = 4 420 | 1 958 | 1 318 | **1 144** |
| z7 | 169 × 103 = 17 407 | 6 631 | 6 228 | **4 548** |

Puuttuvien SIJAINTI (z5/z6/z7):

* pohjoinen yli 76,5°: 126 / 588 / 2 338
* etelä alle −60°: 84 / 420 / 1 670
* itä yli 180° (arkki jatkuu 185°:seen): 26 / 52 / 206
* muu: 42 / 84 / 334 — ja nekin ovat kaikki poltetun alueen ETELÄREUNAN
  yksi rivi (z5 −65,4…−60°, z6 −62,8…−60°, z7 −61,4…−58,5°).

**Poltetun alueen sisällä ei puutu yhtään maalaattaa.** Aukot ovat
yksinomaan ajon `--alue`-rajauksen ulkopuolella, eli kyse ei ole
epäonnistuneista laatoista vaan ajamattomasta alueesta. Määrä (5 970
laattaa z5–z7, z4 mukaan lukien 6 025) on paljon yli 50:n, joten
poltto on Fablen työ, ei tämän erän:

```
node tools/tee-reliefipyramidi.mjs \
  --alue -175,-90,185,90 --tasot 0-7 --jatka \
  --ulos <kansio> --versio 20260918
```

(`--jatka` ohittaa levyllä jo olevat ja `meriLaatat`-listalla olevat,
joten ajo koskee vain aukkoja. Huom. z0…z3 on johdettu
alinäytteistämällä, joten ne on ajettava uudestaan samalla kertaa:
niiden napa-alueet ovat nyt puuttuvien lasten takia `MERIVARI`-väriä.)

## 4. Mittaus — `VAIHE=meret` savukkeessa

`tools/savukkeet/savuke-topografialinssi.mjs` sai uuden vaiheen: kolme
näkymää 390 × 844, linssi auki, mitat vain kartan alueelta
(`.map-pane`; yläpalkki on pergamenttia eikä kuulu mittaan).
Sivutuote: `pngRGBA` luki kanavamäärän aina neljäksi, vaikka Chromiumin
CDP-kaappaus on RGB (3 tavua/pikseli) — värimitta luki väärää tavua joka
kolmannesta pikselistä. Korjattu IHDR:stä.

Chromium 390 × 844 (`tools/savukkeet/kaappaukset/reliefi-meret/`):

| näkymä | tasavärilaattoja | varalaattoja | 404 | sauman hyppy | beige | laattoja/valmiita |
|--------|------------------|--------------|-----|--------------|-------|--------------------|
| Musta meri / Välimeri | **0** | 24 | 0 | 0 (0 merisaraketta) | 0,00 % | 72/72 |
| pohjoisnapa | 0 | 24 | 0 | **0,12** | **0,21 %** | 33/33 |
| Siperia | 104 (kumul.) | 49 | 130 | – | 1,18 % | 72/72 |

* **Välimeri: ei tasaisen värin suorakaidetta** — jokainen aukko (24 kpl)
  sai karkean reliefilaatan, yksikään ei tasaista väriä.
* **meren sauman kirkkausero < 6** — napanäkymässä 0,12 (264
  merisaraketta). Välimeren näkymä osui pallon yöpuolelle, jolloin
  merisarakkeita ei kertynyt joka ajolla; sen todiste on laskuri.
* **pohjoisnapa: ei beigeä levyä** — 0,21 % (pelin yläpalkin reuna
  rajauksen sisällä), ei levyä eikä rengasta, ks. kaappaus.
* **Siperia: ei seepiapohjaa linssin alla** — seepialaattapyyntöjä
  linssin aikana 0 ja jokainen näkyvä laatta koottu (72/72).

Väritesti ei kelpaa Siperiassa eikä yöpuolella: reliefin ylänkösävy
(205, 196, 112) on yhtä ”beige” kuin pergamentti, ja yövarjo painoi
mitattuna Egeanmeren batymetrian täsmälleen `MERIVARI`n lukemaan. Siksi
noiden kahden näkymän väitteet nojaavat laskureihin ja pyyntöihin.

Kaappaukset: `tools/savukkeet/kaappaukset/reliefi-meret/reliefi-meret-
{valimeri,napa,siperia}.png` (Chromium) ja `-webkit`-päätteiset.

WEBKIT: KESKEN_TAI_TULOS

Ennen-kuvia ei kaapattu: korjaus oli jo tehty, kun mittari syntyi, ja
ennen-tila on omistajan neljä iPhone-kuvaa (v1945). Laskurit kertovat
saman: ennen korjausta jokainen noista 24 + 49 aukosta olisi ollut
tasavärilaatta.

## 5. Avoimet ja viereiset havainnot

1. **Karkea laatta voi itsekin puuttua.** `reliefinVaraLahde` tuntee vain
   luettelon `meriLaatat`-listan, ei poltetun alueen rajaa, joten napojen
   yläpuolella myös esi-isä 404:ää ja laatta putoaa tasaiseen väriin
   (Siperian näkymässä 104 kpl kumulatiivisesti). Väri on siellä oikea
   (Jäämeri = syvää merta), joten vika on kosmeettinen — ja poistuu
   kokonaan, kun aukot on poltettu (luku 3).
2. **z0…z3 napa-alueet ovat `MERIVARI`-väriä aineiston sijaan**:
   alinäytteistys kirjoittaa puuttuvan lapsen tilalle vakiovärin
   (`tee-reliefipyramidi.mjs` rivi ~788). Sama poltto korjaa.
3. `savuke-topografialinssi.mjs`:n `teravyys` luki samaa väärää
   kanavamäärää kuin `meriMitat`; korjattu, mutta se muuttaa
   terävyyslukemien absoluuttista tasoa aiempiin raportteihin nähden
   (suhdeluvut ja vertailut näkymien välillä eivät muutu).
4. WebKitillä `page.goto(..., 'load')` ei valmistunut 30 sekunnissa
   tässä vaiheessa; odotus on nyt `domcontentloaded` + pelin oma tila.
