# Ranskan tasoituslaatat korjatulla leikkurilla: pilotti poltettu (14.9.2026)

*Opus-työagentti Fablelle. Haara `claude/bold-ride-vow4ki-poltto-tasoitus`,
pohja `claude/bold-ride-vow4ki-siirtyma` (PR #2444, leikkurikorjaus
`d > 0 ? HARVENNUS_YKSIKKOA : 0`). Vain Ranska poltettiin; muiden 26
maan ajo odottaa omistajan hyväksyntää. Ei versionostoa, ei
muutoslokiriviä, ei Raamattu-kirjausta, ei mergeä, ei dist/:iä.*

## 0. Lyhyesti

**Ranskan tasoituslaatasto on poltettu uudestaan korjatulla
leikkurilla ja viety ämpäriin versiolla `2026-09-14b-tasoitus`.**
Ajo 34885213499, `success`, 1 377 laattaa (z4–z8), 3 min 19 s.
`pyramidi.json`:ssa on 27 maata; **vain Ranskan kirjaus muuttui** ja
muiden 26 maan kirjaukset ovat tavulleen ennallaan, samoin pohjan,
viiva- ja nostotason versiot.

**Generaattorista ei löytynyt toista kopiota leikkurista.**
`tools/generoi-laattapyramidi.mjs:1068` tuo `maanAluevesiRenkaat`in
suoraan `js/maanaariviivat.js`:stä ja `tools/fokuskartta/maailmapiirto.js
polttaVariLeikkuri` saa renkaat parametrina — yksi totuus, ei
korjattavaa kopiota (luku 1).

**Mitattu laatasta (paikallinen pienoispoltto, FRA z6, sama ajo
molemmilla koodeilla):** kerman reiän reunan etäisyys elävän
ääriviivan geometriaan, lautayksikköinä:

| ala | ENNEN med / p95 / max | JÄLKEEN med / p95 / max |
| --- | --- | --- |
| koko Ranska | 0,266 / 0,450 / **0,871** | 0,265 / 0,394 / **0,463** |
| Bretagne | 0,251 / 0,461 / 0,797 | 0,267 / 0,395 / 0,463 |
| Korsika | 0,271 / 0,493 / 0,790 | 0,276 / 0,394 / 0,434 |

Mediaani EI liiku, ja se on mittauksen pohja eikä tulos: z6:lla yksi
laattapikseli on 1 / 3,6 = **0,278 lautayksikköä**, eli mediaani on
molemmissa täsmälleen puolen pikselin päässä. **Ero on hännässä**, ja
siellä se on yksikäsitteinen: maksimi puolittuu 0,871 → 0,463 (1,66 →
0,88 laattapikseliä) ja p95 laskee 0,45 → 0,39. Tavoite *"mediaani
≤ 0,1 yks"* ei ole z6:lla mitattavissa — pikseliruudukko ei anna sitä
lukua kummallekaan koodille.

**Sama asia ilman pikseliruudukkoa (pelkkä geometria, FRA):**
ääriviivan kärkipisteen etäisyys leikkurin reunaan

| | mediaani | p95 | max |
| --- | ---: | ---: | ---: |
| ENNEN | 0,0000 | 0,5458 | 1,1045 |
| **JÄLKEEN** | **0,0000** | **0,0000** | **0,0000** |

Leikkuri ja ääriviiva ovat korjauksen jälkeen sama käyrä pisteen
tarkkuudella. Renkaiden pistemäärä 4 668 → 6 348.

**Vastakoe ajettiin** (luku 5): harvennus pakotettiin 5,0 yksikköön ja
sama mittaus antoi p95 1,055 ja max 2,283 — mittaus siis kaatuu, kun
geometria on väärin, eikä mittaa kahden samanlaisen laatan samuutta.

**Pelissä Ranskassa ero ei näy, ja se oli odotettu tulos**
(siirtymä-raportin luku 4.2: Ranskan rannikko on sileä, vika on
Egeanmeren kokoluokan vika). Ruudulta mitattu kerman reunan etäisyys
ääriviivasta on **1,2…1,4 css-pikseliä sekä vanhoilla että uusilla
laatoilla** — korostusvedon puolikas leveys. **Laatta-404:iä 0**,
versioportti auki (`syy` tyhjä) kaikissa kolmessa näkymässä (luku 4).

**Kuvat** (`docs/raportit/kuvat/`):
`poltto-tasoitus-leikkuri-ennen-jalkeen.png` (Korsika ja Bretagne,
laatan kerma vs. punainen ääriviiva ennen/jälkeen),
`poltto-tasoitus-ranska-390.jpg` (saapumisnäkymä puhelimella, uudet
laatat), `poltto-tasoitus-bretagne-1400.jpg` (zoom Bretagneen).

---

## 1. Generaattorin leikkuri: yksi totuus, ei kopiota

Tilaus pyysi varmistamaan, onko tasoituskerroksen leikkuri kopio
`js/maanaariviivat.js`:stä `tools/fokuskartta/`-puussa. **Ei ole.**
Ketju on tämä, ja jokainen kohta on luettu tästä puusta:

```
tools/generoi-laattapyramidi.mjs:1068
    const { maanAluevesiRenkaat, maanLautalaatikko }
      = await import(`${JUURI}/js/maanaariviivat.js`);
tools/generoi-laattapyramidi.mjs:1140-1142
    const LEIKKURIN_PUSKURI = TASOITUSTASO ? 0 : ALUEVESI_YKSIKKOA;
    … maanAluevesiRenkaat(polygonit, VARI_MAA, LEIKKURIN_PUSKURI)
tools/fokuskartta/maailmapiirto.js polttaVariLeikkuri(canvas, asetukset, leikkuri)
    → leikkuri.renkaat on PARAMETRI; tiedosto ei laske renkaita itse
```

`maailmapiirto.js` sanoo saman omassa kommentissaan (rivit 308–311):
*"RENKAAT OVAT LAUDAN YKSIKÖISSÄ ja samasta aineistosta kuin pelin oma
aluevesiraja (js/maanaariviivat.js maanAluevesiRenkaat) — yksi totuus
rajasta"*. Korjattavaa toista kopiota ei siis ole, eikä tässä erässä
muutettu riviäkään koodia.

Ajoloki todistaa, että korjattu leikkuri oli käytössä:

```
väripaletti  tasoitus · peitto 0.85 · kerma #faf4d6
             · leikkuri maan polygoni (puskuri 0) (häive 140 yks)
             · leikkuri 32 rengasta / 6348 pistettä
```

6 348 on harventamattoman renkaan pistemäärä; vanhalla koodilla sama
ajo tulostaa **4 668**.

## 2. Pienoispoltto ja mittaus — mitä tarkalleen mitattiin

Kaksi täyttä z6-ajoa tässä kontissa, samat liput, ainoana erona
`js/maanaariviivat.js`:n yksi ehto:

```
node tools/generoi-laattapyramidi.mjs <kansio> --tasot 6 \
  --vari FRA --paletti tasoitus --peitto 0.85 --variversio koe --laatikko-nakyma
```

70 laattaa, 9,6 s per ajo (4,86 Mpx/s). Mittaus lukee laatan **alfan**:
reiän reuna on se pikseli, jossa alfa on 0 ja naapurissa on peittoa.
Pikselin keskipiste muunnetaan laudan yksiköiksi (arkki x 0, y −1046,3;
3,6 px/yksikkö) ja siitä lasketaan etäisyys `puraMaanRenkaat(FRA)`:n
segmentteihin — siis siihen samaan harventamattomaan geometriaan, josta
`maanRenkaatAsteina` piirtää elävän ääriviivan.

Tulokset ovat luvussa 0. **Miksi mediaani ei liiku:** mediaanin arvo
0,27 on 0,97 laattapikseliä, eli reunapikselin keskipisteen väistämätön
etäisyys käyrästä. Laattaruudukko ei erota 0,0 ja 0,27 yksikön
poikkeamaa toisistaan. Hännässä ruudukko ei ole rajoite, ja siellä luku
puolittuu.

**Kuva `poltto-tasoitus-leikkuri-ennen-jalkeen.png`:** neljä paneelia
(Korsika ja Bretagne, ennen ja jälkeen), taustana poltettu laatta
(kerma vaalea, reikä tumma) ja päällä punaisena `puraMaanRenkaat`in
rengas. Ennen-paneeleissa punainen viiva oikaisee lahtien yli ja jää
kerman alle; jälkeen-paneeleissa se kulkee kerman reunaa pitkin.

## 3. Ajo: workflow, tulos ja tarkistukset

`generoi-varitaso.yml` ajettiin GitHub MCP:n `actions_run_trigger`illa
tästä haarasta (`ref=claude/bold-ride-vow4ki-poltto-tasoitus`). Haara
on identtinen mainin kanssa niissä tiedostoissa, joita ajo lukee —
`.github/workflows/generoi-varitaso.yml`, `tools/generoi-laattapyramidi.mjs`
ja `js/laattapyramidi.js` eivät eroa `origin/main`ista lainkaan; ainoa
ero on `js/maanaariviivat.js` eli juuri se korjaus, jota poltetaan.

| | |
| --- | --- |
| ajo | **34885213499**, run_number 59 |
| tulos | **success** (kaikki askeleet vihreitä; Natural Earth ja korkeuspalat `skipped`, kuten tasoitukselle kuuluu) |
| kesto | 19:09:52 → 19:13:10 UTC = **3 min 19 s** (generointi 38 s, vienti 96 s) |
| inputit | `maa=FRA paletti=tasoitus peitto=0.85 variversio=2026-09-14b-tasoitus tasot=4-8 laatikko_nakyma=true korkeus=1 kuiva=false vie=true` |
| laatat | **1 377** (z4 9 · z5 24 · z6 70 · z7 266 · z8 1 008) |
| polku | `julisteet/pyramidi/2026-09-14b-tasoitus/vari/FRA/z<taso>/<sarake>/<rivi>.webp` |

**R2 HEAD, 12 näytettä kaikilta viideltä tasolta: 12 × 200, ei yhtään
404:ää** (z4/9/3, z4/10/4, z5/19/8, z5/20/9, z6/39/17, z6/40/18,
z7/79/35, z7/80/36, z8/159/71, z8/160/72, z8/162/73, z8/179/90).

**`pyramidi.json` ennen ja jälkeen, kenttä kentältä:**

| | ennen | jälkeen |
| --- | --- | --- |
| maita `varitasot`-taulussa | 27 | **27** (samat avaimet) |
| FRA | `2026-09-14-tasoitus` | **`2026-09-14b-tasoitus`**, `maaPolussa: true` |
| **muut 26 maata** | 2026-09-14-tasoitus | **kirjaukset tavulleen ennallaan** |
| pohjan `versio` | 2026-09-07a | 2026-09-07a |
| `viivataso` / `nostotaso` | 2026-09-08a-viivat / -nostot | ennallaan |

Eli mikään ei pudonnut eikä mikään muu muuttunut. Ranskan uusi kirjaus:
`paletti tasoitus · peitto 0.85 · kerma #faf4d6 · leikkurinPuskuri 0 ·
feidausReuna 140 · kerroin 1.15 · laatikkoNakyma true · tasot 4–8`.

**Pelin dataan ei tarvittu riviäkään muutosta.** Väritason versio
luetaan luettelosta maakohtaisesti (`js/laattapyramidi.js
varitasonKansio` → `kirjaus.versio`), ja repossa ei ole yhtään
kovakoodattua tasoitusversiota — ainoat osumat `2026-09-1?-tasoitus`
-hakuun ovat kommentteja ja Raamatun kirjaus. Ämpärin luettelo
vaihtui ajossa, ja peli osoittaa uuteen versioon sitä kautta. Tämä
todennettiin ajamalla peli oikeasti (luku 4): `variMaa FRA`,
`varillisia > 0`, `syy` tyhjä.

## 4. Mittaus pelissä: Playwright, Chromium, kolme näkymää

Menetelmä on siirtymä-raportin luvun 1 menetelmä: **vaiheiden erotus
kuvakaappauksista**, ei aineistosta. Sama sivu, sama kamera, sama
laattataso; vain ämpärin `pyramidi.json` vaihtuu reitityksessä.

```
S2  ei kermaa (varitasot = null), ei korostusta      → pohja
S1  ei kermaa, korostus päällä       → S1−S2 = ääriviivan pikselit
S3  kerma VANHALLA versiolla 2026-09-14-tasoitus  → S3−S2 = kerman peitto ennen
S4  kerma UUDELLA versiolla 2026-09-14b-tasoitus  → S4−S2 = kerman peitto jälkeen
```

Molemmat laatastot ovat ämpärissä, joten ennen ja jälkeen ovat
**oikeita laattoja oikeasta ämpäristä**, eivät simulaatio.

**Mitta on ÄÄRIVIIVASTA KERMAN REUNAAN eikä päinvastoin**, ja se on
mittauksen korjaus: kerman reunaan kuuluu myös laataston häivereuna
kaukana maasta, ja ensimmäinen ajo mittasi sitä (mediaani 11 px
Bretagnessa, p95 = 40 px:n katkaisuraja). Ääriviiva sen sijaan on
kokonaan Ranskan raja, ja tasoituksessa kerman reiän on oltava sama
käyrä — siis jokaisella ääriviivapikselillä on oltava kerman reuna
vieressä.

| näkymä | laattataso | ENNEN med / p95 | JÄLKEEN med / p95 | 404 | `syy` |
| --- | --- | --- | --- | ---: | --- |
| saapuminen 390 × 844 (dpr 2) | z5 | 1,21 / 2,12 | **1,21 / 2,00** | 0 | tyhjä |
| saapuminen 1400 × 900 (dpr 1) | z6 | 1,41 / 44 | **1,41 / 44** | 0 | tyhjä |
| Bretagne 1400 × 900, zoom | z7 | 1,41 / 4,00 | **1,41 / 3,00** | 0 | tyhjä |

Kaikissa kolmessa `variMaa = FRA` ja `varillisia > 0`.

**Mediaani 1,2…1,4 css-px on korostusvedon puolikas leveys** (veto on
3,1 css-px), eli kerman reuna on ääriviivan alla. Savuke-kriteerin
*"≤ 1 css-px"* kirjaimellinen luku ei täyty kummallakaan laatastolla,
eikä voi täyttyä: mittauksen pohja on itse vedon paksuus. **Ranskassa
ennen ja jälkeen eivät eroa mitattavasti** — juuri kuten
siirtymä-raportin luku 4.2 ennusti.

**Hännät ovat mittausartefakteja, ja ne on jäljitetty, ei ohitettu.**
1400 × 900 -saapumisnäkymän p95 = 44 px tulee 2 773 pikselin
tiiviistä läiskästä ruudun oikeassa yläkulmassa (x 1034–1230,
y 79–136), joka on kokonaan kerman SISÄLLÄ: kyse on elementistä, joka
erosi S1:n ja S2:n välillä, ei Ranskan rajasta. Luku on **sama ennen
ja jälkeen** (44 / 44), joten se ei vaikuta vertailuun. Bretagnen
jälkeen-ajon p99 35 px on 211 pikseliä kerman ULKOPUOLELLA eli kahden
erillisen sivulatauksen häivytysero. Mediaani on näiltä osin ainoa
kelvollinen tunnusluku, ja se on identtinen.

**Ruudulta mitattava todiste korjauksesta on siis Kreikassa, ei
Ranskassa** — ja Kreikka ajetaan vasta hyväksynnän jälkeen (luku 6).
Pilotin hyväksyminen kannattaa siksi tehdä tämän raportin luvun 2
laattakuvasta eikä Ranskan saapumisnäkymästä.

## 5. Vastakoe

Mittaus, joka ei voi kaatua, ei ole mittaus. Kolmas z6-ajo tehtiin
harvennuksella **5,0 lautayksikköä** (karkeasti väärin) ja sama
laattamittaus ajettiin sille:

| ala | JÄLKEEN (0) | VASTAKOE (5,0) |
| --- | --- | --- |
| koko Ranska med / p95 / max | 0,265 / 0,394 / 0,463 | **0,340 / 1,055 / 2,283** |
| Bretagne | 0,267 / 0,395 / 0,463 | 0,326 / 0,902 / 1,473 |
| Korsika | 0,276 / 0,394 / 0,434 | 0,350 / 1,083 / 1,545 |

p95 nousee 2,7-kertaiseksi ja maksimi 4,9-kertaiseksi — mittaus siis
erottaa väärän geometrian, eikä se mittaa kahden samanlaisen laatan
samuutta. `js/maanaariviivat.js` palautettiin heti ennalleen (`git
diff` ei näytä sitä; ainoat muutokset tässä haarassa ovat raportti ja
kolme kuvaa).

Leikkurikorjauksen oma yksikkötesti ja sen vastakoe ajettiin jo
PR #2444:ssä (`tests/tasoitustaso.test.mjs`, siirtymä-raportin luku
5.1); niitä ei toistettu tässä.

## 6. Muiden 26 maan ajon suunnitelma — EI AJETTU

Raamattu PÄÄTÖKSET 9 kohta 1: Ranska on pilotti, muut vasta omistajan
hyväksynnän jälkeen. Tässä on ajolista valmiina, kun hyväksyntä tulee.

**Järjestys (aakkosissa, Ranska jo ajettu):**

```
AUT BGR BIH CHE CZE DEU DNK ESP EST FIN GBR GRC HRV HUN IRL ITA
LTU LVA NLD NOR POL PRT ROU SWE TUR UKR      (26 maata)
```

**Yksi poikkeus järjestykseen: GRC ensin.** Vika näkyy Egeanmerellä
eikä Ranskassa, joten Kreikka on ainoa maa, jolla korjauksen voi
_nähdä_ ruudulta. Se kannattaa ajaa ensin ja katsoa saapumisnäkymä
ennen kuin loput 25 ajetaan.

**PERÄKKÄIN, EI RINNAKKAIN.** Kaikki maat kirjoittavat samaan
`pyramidi.json`-tiedostoon; 14.9. ajettu 25 maan sarja tehtiin
peräkkäin juuri siksi (viesti-fable-laatta-ajot-20260914.md
"Rinnakkaisuudesta"), ja sama sääntö pätee tähän.

**Inputit (vain `maa` vaihtuu):**

| input | arvo |
| --- | --- |
| `paletti` | `tasoitus` |
| `peitto` | `0.85` |
| `variversio` | `2026-09-14b-tasoitus` (sama kaikille — ISO on polussa) |
| `tasot` | `4-8` |
| `laatikko_nakyma` | `true` |
| `korkeus` | `1` |
| `kuiva` | `false` |
| `vie` | `true` |
| `ref` | `main` **vasta kun leikkurikorjaus (PR #2444) on mainissa** — tätä ennen `ref` on korjauksen haara |

**Kesto:** Ranskan 1 377 laattaa kesti 3 min 19 s. 14.9. sarjan mitattu
haarukka oli n. 100 s (BGR, HUN) … 6–7 min (NOR, SWE), yhteensä
25 maalle n. 1 h 20 min. **Arvio 26 maalle: 1 h 20 min … 1 h 40 min**
peräkkäin ajettuna; korjattu leikkuri lisää renkaiden pistemäärää
(FRA +36 %), mikä kasvattaa leikkurin piirtoa mutta ei laattamäärää.

**Tarkistus jokaisen ajon jälkeen** (sama kuin tässä erässä):

```
curl -s https://media.matkakirja.app/julisteet/pyramidi/pyramidi.json \
  | node -e "let s='';process.stdin.on('data',d=>s+=d).on('end',()=>{
      const v=JSON.parse(s).varitasot;console.log(Object.keys(v).length,'maata');
      for(const k of Object.keys(v).sort())console.log(k,v[k].versio,v[k].maaPolussa?'':'VANHA');})"
```

Vaadittava: 27 maata, ajettu maa uudella versiolla ja `maaPolussa`,
muut ennallaan.

## 7. Portit

```
npm test                    # tests 3370 · # pass 3357 · # fail 0 · # skipped 13
tarkista-kaksoisavaimet     ei kaksoisavaimia
tarkista-niputus            kunnossa: 387 moduulia, 4218 top-level-julistusta
tarkista-savukkeet          kunnossa: 1651 ui-viittausta, 405 metodia, 534 kenttää
grep '^<<<<<<<'             tyhjä
```

Ei yhtään punaista — myöskään `pollo.test.mjs`:n kuormavartio ei
kaatunut tässä ajossa.

## 8. Mitä EI tehty

Ei muiden maiden polttoa, ei pohjan eikä pallon Mercator-sarjan
polttoa, ei versionostoa (`tools/uusi-versio.mjs` ajamatta), ei
muutoslokiriviä, ei Raamattu-kirjausta, ei mergeä, ei dist/:iä, ei
laattatiedostoja repoon, ei rinnakkaisia `pyramidi.json`-kirjauksia.
`js/pallolauta/*`, css, fokusvirta, nostodata ja ääniputki ovat
koskemattomat — tämä haara muuttaa vain raportin ja kolme kuvaa.

## 9. Avoimet asiat

1. **Muiden 26 maan ajo** (luku 6) odottaa omistajan hyväksyntää.
2. **Vanha laatasto `2026-09-14-tasoitus/vari/FRA/`** jää ämpäriin
   (1 377 laattaa). Sitä ei poistettu: se on vertailuaineisto, ja
   sen siivous kannattaa tehdä vasta kun kaikki 27 maata ovat uudella
   versiolla — silloin koko vanha versiokansio menee yhdellä kerralla.
3. **Savuke-kriteeri "kerman reuna ≤ 1 css-px ääriviivasta"** ei ole
   mitattavissa siinä muodossa (luku 4): korostusvedon puolikas leveys
   on 1,5 css-px, joten alle yhden pikselin lukua ei voi saada
   millään geometrialla. Jos kriteeri halutaan koneelliseksi, se on
   kirjoitettava laatan alfasta (luvun 2 mitta) eikä ruudulta.
