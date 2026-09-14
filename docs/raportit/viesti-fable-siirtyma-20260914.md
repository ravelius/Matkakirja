# Rantaviivan siirtymä pallolla: mitattu ruudulta, juurisyy löytyi

*Opus-työagentti Fablelle 14.9.2026. Haara
`claude/bold-ride-vow4ki-siirtyma`, pohja origin/main (e9011f5e, v1877).
Ei laattojen polttoa, ei R2-vientiä, ei versionostoa, ei Raamattu-
kirjausta, ei mergeä.*

## 0. Lyhyesti

**Siirtymä ei ole projektiossa eikä tekstuurissa. Se on
TASOITUSKERROKSEN LEIKKURISSA, ja se on kahden totuuden vika.**

Kerman reikä (se, mikä jättää kohdemaan näkyviin) leikataan
`maanAluevesiRenkaat`-funktion **harvennetuista** renkaista
(`harvenna`, 1,2 lautayksikköä ≈ 4 km), kun taas elävä musteensininen
ääriviiva piirretään **harventamattomista** renkaista
(`maanRenkaatAsteina`). Sama tiedosto, sama maa, kaksi eri geometriaa.

Harvennus on perusteltu koodissa sillä, että *"puskuri on leveämpi kuin
virhe"*: 1,2 yksikön poikkeama katoaa 6,7 yksikön aluevesikaistaleen
sisään. **Tasoitusajossa puskuri on 0** (omistajan päätös 13.9.2026:
*"Aluevesien sininen ei kuulu alkuperäiseen"*), joten perustelu raukesi
— ja harvennettu rengas on nyt se reuna, jonka pelaaja näkee.

Mitattu vaikutus Kreikassa: **kerma peittää pikkusaarilla 12–32 %
saaren poltetusta maasta** ja reikä valuu 4–16 % merelle. Se on
omistajan *"poikkeavat jopa puoli saarta"*.

**Korjattu** (yksi ehto, `js/maanaariviivat.js`): kun puskuria ei ole,
harvennusta ei ole. Mitattu jälkeen: 0,00 % / 0,00 %.
**Korjaus näkyy ruudulla vasta, kun tasoituslaatat on poltettu
uudestaan** — leikkuri on poltettu laattaan. Poltto EI vaadi pallon
sarjan eikä pohjan uudelleenpolttoa (luku 6).

**Kumpi raportti oli oikeassa:** `viesti-fable-poltto-ranska` luvuissa
2–3 (pohjalaatat ovat nykykoodin mukaiset; Kykladeilla ON poltettu
maa — kuva 2 todistaa sen). `viesti-fable-rantaviiva` oli oikeassa
luvuissa 1–2 (lähdetaulukko, 0,03 yksikön ero) ja väärässä luvuissa
3–4 (vanha ETOPO-sääntö). **Kumpikaan ei löytänyt syytä**; polton
luvun 10 ehdokaslistan kohta (b) *"tasoituskerroksen kerma"* osui
oikeaan suuntaan, mutta syy ei ole kerman peitto vaan sen REUNA.

**Kuvat** (`docs/raportit/kuvat/`): `siirtyma-kreikka-saapuminen.png`
(omistajan näkymä toistettuna), `siirtyma-kyklades-abc.png`
(A · C · D), `siirtyma-leikkuri-renkaat.png` ja
`siirtyma-leikkuri-saari.png` (ääriviiva vs. leikkuri),
`siirtyma-ranska-saapuminen.png`.

## 1. Miten mitattiin — ruudulta, ei aineistosta

Playwright + Chromium `/opt/pw-browsers/chromium`, koodi tästä puusta,
laatat tuotannon ämpäristä. Neljä vaihetta samasta kamerasta, kaikki
kuvakaappauksina:

| vaihe | mitä | mitä siitä saa |
| --- | --- | --- |
| A | kaikki päällä | omistajan näkymä |
| B | `korostaMaa(null)` | **A − B = ääriviivan pikselit** (mitattu väri 31,58,95 = `#1f3a5f`) |
| C | `?vektorit=0` | **B − C = rannikkovektorin pikselit**; C = pelkät laatat |
| D | luettelo ilman `varitasot`-taulua | laatat ILMAN kermaa |

`a` (poltettu maa/meri-raja) luetaan C:stä väriluokituksella (lämpö
R − B, Otsun kynnys) ja siitä reunapikselit + etäisyysmuunnos.
Maarajat suodatetaan pois: ääriviivan piste kelpaa rannikkomittaukseen
vain, jos sen ympärillä (14 css-px) on sekä maata että merta.

Neljä näkymää, kaikissa laattakerros **päällä** (`syy` tyhjä, versiovahti
ei sammuttanut mitään) ja **0 laatta-404:ää** Kreikassa:

| näkymä | pov altitude | laattataso | laattoja | 404 |
| --- | ---: | ---: | ---: | ---: |
| Ateena 2000 × 1300 dpr2 | 0,1547 | z6 | 24/24 | 0 |
| Ateena 1400 × 900 dpr1, 1 porras sisään | 0,0774 | z7 | 30/30 | 0 |
| Ateena 390 × 844 dpr2 | 0,2776 | z6 | 15/15 | 0 |
| Pariisi 1400 × 900 dpr1 | 0,1863 | z6 | 45 (24 scenessä) | 11 |

*(Ranskan 11 puuttuvaa laattaa ovat laatikon reunan meriruutuja —
z6/39/20, 38/17, 43/20, 44/18 — pohja, tasoitus ja nostotaso samasta
ruudusta. Oma havainto, ei tämän erän aihe; polton luku 7.2 mittasi
nollan pienemmällä laatikolla.)*

## 2. Siirtymän luonne: (i)/(iv), EI (ii) eikä (iii)

| näkymä | b→a rannikolla: med / ka / p95 / max (css-px) | keskivektori | systemaattisuus |
| --- | --- | --- | ---: |
| Ateena 2000 × 1300 | 3,91 / 4,73 / 11,85 / 16,28 | (−0,21, +0,02) | 0,04 |
| Ateena 1400 × 900 z+1 | 5,00 / 5,55 / 12,21 / 18,00 | (−0,09, +0,34) | 0,06 |
| Ateena 390 × 844 | 2,69 / 3,47 / 9,39 / 15,24 | (−0,12, −0,22) | 0,07 |
| Pariisi 1400 × 900 | 2,24 / 4,20 / 12,04 / 16,40 | (−0,23, +1,03) | 0,25 |

`systemaattisuus` = keskiarvovektorin pituus / keskietäisyys. Puhtaassa
siirrossa se olisi ~0,5 (lähimmän pisteen suunta puolittaa siirron);
mitattu **0,04–0,07**. Keskivektori on **alle 0,4 css-pikseliä**
kaikissa Kreikan näkymissä.

→ **(ii) systemaattinen projektio-/tekstuurisiirtymä: EI.**
Ei Mercator-sarjan reunaa, ei puolen pikselin UV-virhettä, ei laatan
pyöristystä. Jos sellainen olisi, keskivektori olisi mitattavan
suuruinen ja samansuuntainen.

→ **(iii) etäisyyden mukaan kasvava: EI.** Kaistoittain ruudun
keskeltä (Ateena 2000 × 1300): 0–200 px 5,00 · 200–400 px 4,50 ·
400–600 px 2,12. Luku ei kasva ulospäin.

→ **dpr ei vaikuta.** 390 × 844 ajettiin dpr 2:lla ja 1400 × 900
dpr 1:llä; luvut ovat samassa haarukassa. Tekstuurinäytteistys ei ole
mukana.

### 2.1 Mutta siirtymä SKAALAUTUU ZOOMIN MUKANA — se on geometriaa

Sama luku eri mittakaavoissa, kun px/lautayksikkö lasketaan kameran
korkeudesta:

| näkymä | css-px / lautayksikkö | b→a mediaani |
| --- | ---: | ---: |
| 390 × 844 | 1,71 | 2,69 |
| 2000 × 1300 | 4,72 | 3,91 |
| 1400 × 900 z+1 | 6,53 | 5,00 |

Suora sovitus: **mediaani ≈ 1,9 css-px + 0,48 × (px/yksikkö)**.

* **1,9 css-px on mittauksen pohja** — korostusviivan puolikas leveys
  (3,1 css-px) ja väriluokituksen pehmeä reuna. Se ei ole siirtymää.
* **0,48 lautayksikköä (≈ 1,6 km) on TODELLINEN geometrinen ero.**
  Se ei riipu ruudusta eikä zoomista, eli se on aineistossa.

Rannikkovektori käyttäytyy täsmälleen samoin (c→a mediaani 3,00 ·
4,47 · 6,00 samoissa näkymissä, keskivektori alle 0,25 px). **Elävä
ääriviiva ja harmaa rannikkovektori ovat siis keskenään samaa mieltä;
poikkeava on se reuna, jonka laatta näyttää.**

## 3. Vastakokeet (A) ja (B): kerma leikkaa saaret

**(A) Ääriviiva pois (B-vaihe).** Poltettu ranta ja harmaa vektori
jäävät päällekkäin oikein — ei kaksoisrantaa, ei siirtymää niiden
kesken.

**(B) Tasoituskerros pois (D-vaihe) — TÄSSÄ SE ON.**
`kuvat/siirtyma-kyklades-abc.png` (vasen A, keski C, oikea D):

* **D:ssä (ei kermaa) jokaisella Kykladien saarella on poltettu maa,
  ja saaren muoto on EHJÄ ja pyöreä.** Polton luku 3 oli oikeassa.
* **C:ssä (kerma päällä) samat saaret ovat KATKAISTUJA:** Naxos ja
  Paros saavat suoran leikkausreunan, pikkusaarista näkyy sirpale.
* Ruudulta mitattuna C ja D eroavat maa/meri-LUOKASSA 259 065
  näytteessä rajatulla alalla.

Eli: kerma ei peitä väärää väriä — **kerman REIKÄ on väärän
muotoinen**.

## 4. Juurisyy: `harvenna(rengas, 1.2)` leikkurissa, jolla ei ole puskuria

```
js/maanaariviivat.js
  maanAluevesiRenkaat(data, iso, d)
      → tyonnaUlos(harvenna(rengas, HARVENNUS_YKSIKKOA = 1.2), d)
  ← tools/generoi-laattapyramidi.mjs:1142  (LEIKKURIN_PUSKURI = 0)
  ← tools/fokuskartta/maailmapiirto.js polttaVariLeikkuri  (reikä laattaan)

js/maanaariviivat.js
  maanRenkaatAsteina(data, iso, asteet)      ← EI harvennusta
      → js/pallovektorit.js korostaMaa       (musteensininen ääriviiva)
```

Koodin oma perustelu harvennukselle (rivit 434–445): *"TARKKUUS EI
KÄRSI, KOSKA PUSKURI ON LEVEÄMPI KUIN VIRHE … syntyvä poikkeama on
korkeintaan sama 1,2 yksikköä, kun kaistale itse on 6,7 yksikköä
leveä. Rantaviivan OMA muoto piirtyy laatoista, ei tästä."*
Tasoituksessa kaistaletta ei ole, ja rannan muoto piirtyy **juuri
tästä** — laatan maa näkyy vain reiän läpi.

### 4.1 Mitattu ero (Kreikka, `assets/data/maapolygonit.json`)

Kärkipisteen etäisyys harvennettuun reunaan:

| | lautayksikköä | km | css-px saapumisnäkymässä |
| --- | ---: | ---: | ---: |
| mediaani | 0,000 | 0,00 | 0,0 |
| p95 | 0,569 | 1,90 | 2,7 |
| max | 1,005 | 3,36 | 4,7 |

Pinta-alana (renkaan sisus vs. leikkurin sisus, 8 näytettä/yksikkö):

| rengas (koko, yks) | maata kerman alla | merta reiän sisällä |
| --- | ---: | ---: |
| #12 (4,0) | **32,3 %** | 0 % |
| #51 (3,3) | 29,2 % | 0 % |
| #17 (3,4) | 26,7 % | 0 % |
| #54 (3,1) | 23,5 % | 16,1 % |
| #53 (3,9) | 20,4 % | 4,4 % |
| #44 (5,7) | 15,9 % | 0,4 % |
| #25 (5,2) | 15,5 % | 1,4 % |
| #10 (4,5) | 12,9 % | 14,5 % |
| koko Kreikka | 0,72 % | 0,60 % |

Koko maan luku on pieni, koska manner on 14 583 yks² 17 735:stä.
**Silmä ei katso keskiarvoa vaan saarta**, ja saarella luku on 12–32 %.

`kuvat/siirtyma-leikkuri-renkaat.png` (musteensininen = ääriviiva =
totuus, punainen = leikkuri) ja lähikuva
`kuvat/siirtyma-leikkuri-saari.png`: punainen jänne oikaisee lahden yli
ja katkaisee niemen — juuri se suora reuna, joka C-vaiheen kuvassa
näkyy saaren poikki.

### 4.2 Miksi Ranskassa ei näy

Ranskan rannikko on sileä ja sen piirteet ovat kymmeniä yksiköitä;
1,2 yksikön oikaisu katoaa niihin. Mitattu b→a mediaani Pariisin
saapumisnäkymässä 2,24 css-px eli mittauksen pohjan tuntumassa
(`kuvat/siirtyma-ranska-saapuminen.png`). **Vika on Egeanmeren
kokoluokan vika**, ja siksi omistaja näki sen vasta Kreikassa.

## 5. Mitä korjattiin

`js/maanaariviivat.js`, yksi ehto ja sen perustelu:

```js
const harvennus = d > 0 ? HARVENNUS_YKSIKKOA : 0;
…
const tulos = tyonnaUlos(harvenna(rengas, harvennus), d);
```

`harvenna(pisteet, 0)` ei pudota yhtään pistettä (`|dx| + |dy| < 0` ei
toteudu), joten leikkuri on **sama rengas kuin ääriviiva** — yksi
totuus, ei uutta lähdettä eikä uutta aineistoa.

**Mitattu jälkeen:** kärkipisteen poikkeama mediaani/p95/max
**0,000 / 0,000 / 0,000** yksikköä; maata kerman alla **0,00 %**,
merta reiässä **0,00 %**. Renkaat tihenevät Kreikassa 1 758 → 2 570
pistettä ja Ranskassa 2 116:een — kertaluonteista polttoajon työtä,
ei kehyskustannus. Puskurillinen leikkuri (12 mpk, tasokartan
värikerros `js/laattapyramidi.js:1917`) **ei muutu**.

### 5.1 Testi ja vastakoe

`tests/tasoitustaso.test.mjs`, kaksi uutta väitettä:

1. *tasoituksen leikkuri (puskuri 0) on sama geometria kuin elävä
   ääriviiva* — GRC ja FRA, jokainen rengas, molempiin suuntiin (ei
   vieraita kärkiä eikä kadonneita kärkiä).
2. *aluevesipuskurin kanssa renkaat yhä harvennetaan* — korjaus ei saa
   poistaa harvennusta sieltä, missä se on perusteltu.

**Vastakoe (ajettu):** `harvennus` takaisin vakioksi
`HARVENNUS_YKSIKKOA`:

```
not ok 12 - tasoituksen leikkuri (puskuri 0) on sama geometria kuin elävä ääriviiva
ok 13 - aluevesipuskurin kanssa renkaat yhä harvennetaan
# pass 12 · # fail 1
```

Täsmälleen se yksi väite, joka korjausta mittaa.

## 6. Mitä vaaditaan, jotta korjaus näkyy pelaajalle

**Tasoituslaatat on poltettava uudestaan** (leikkuri on poltettu
laattaan, `polttaVariLeikkuri`). **Polttoa ei tehty tässä erässä.**

Hyvä uutinen: **tämä ajo EI sammuta laattakerrosta.**
`js/pallolaatat.js lepokerroksenKerrokset` vertaa versioita pohjan,
viiva-, nosto- ja rantatason osalta, mutta **väritaso on BOOLEAN**
(rivit 372–389, *"VÄRITASO EI SAA SAMMUTTAA KERROSTA"*). Uusi
`varitasot`-versio ei siis vaadi pallon Mercator-sarjaa, `js/pallo.js`:n
muutosta eikä pohjan polttoa — toisin kuin polton luvun 5 ketju.

Ajo on sama kuin 14.9.2026:

```
generoi-varitaso.yml (tai generoi-laattapyramidi.mjs)
  --vari GRC --paletti tasoitus --peitto 0.85 --tasot 4-8
  --variversio 2026-09-15-tasoitus   (27 maata, kuten nyt)
```

ja `pyramidi.json` **peräkkäin, ei rinnakkain** (maat jakavat saman
`varitasot`-taulun).

**Ranska on pilotti, muut maat vasta sen jälkeen** (Raamattu PÄÄTÖKSET 9
kohta 1) — mutta huomattakoon, että vika näkyy Kreikassa eikä
Ranskassa, joten pilotin hyväksyminen kannattaa tehdä Kreikan kuvasta.

## 7. Kumpi raportti oli oikeassa — kohta kohdalta

| väite | kumpi | mitattu tässä |
| --- | --- | --- |
| Pohjalaatat ovat nykykoodin mukaiset | **poltto** | Kykladeilla on poltettu maa jokaisella saarella (kuva 2, D-vaihe) |
| *"Egeanmerellä joka viides saari on pelkkä ääriviiva"* | rantaviiva **väärässä** pohjalaatoista, **oikeassa ruudusta** | saari on poltettu, mutta kerma peittää siitä 12–32 % |
| Lähdetaulukko ja 0,03 yks | **rantaviiva** (luvut 1–2) | pitää: lähteet eivät eroa |
| Vanha ETOPO-sääntö syynä | rantaviiva **väärässä** | ei mitattavissa ruudulta; D-vaihe näyttää ehjät saaret |
| *"punainen raja myötäilee rantaa yhden pikselin tarkkuudella"* | poltto **oikeassa laatasta**, mutta se ei ole se reuna, jonka pelaaja näkee | ruudulla reuna on kerman reikä, ei laatan maa/meri-raja |
| Ehdokas (b) *"tasoituskerroksen kerma"* | **poltto osui suuntaan** | syy on kerman REUNA, ei peitto |
| Ehdokas (a) z8:n kaksinkertainen ranta | ei tämä | saapumisnäkymä on z6–z7; vika näkyy jo siellä |
| Ehdokas (c) versiovahti sammuttaa kerroksen | **ei** | `syy` tyhjä kaikissa neljässä näkymässä |

## 8. Portit

```
npm test                    # tests 3370 · # pass 3356 · # fail 1 · # skipped 13
tarkista-kaksoisavaimet     ei kaksoisavaimia
tarkista-niputus            kunnossa: 387 moduulia, 4218 top-level-julistusta
tarkista-savukkeet          kunnossa: 1651 ui-viittausta, 405 metodia, 534 kenttää
```

Ainoa punainen on **pollo.test.mjs:929 kuormavartio**
(*"indeksi rakentuu ja on kokoluokaltaan järkevä"*, indeksointi kesti
3 287 ms): kellomitta, joka kaatuu kuormitetussa kontissa — tässä
ajettiin rinnakkain kolme Chromiumia ja toisten sessioiden ajoja.
Ei liity tähän muutokseen (`js/maanaariviivat.js` ei ole
indeksoinnissa). `tests/tasoitustaso.test.mjs` 13/13 vihreänä.

## 9. Mitä EI tehty

Ei laattojen polttoa, ei R2-vientiä, ei `pyramidi.json`-muutoksia, ei
versionostoa, ei muutoslokiriviä, ei Raamattu-kirjausta, ei mergeä, ei
dist/:iä. `nimet.js`, `merkit.js`, `maapaneeli.js`, `nostot.js` ja
ääni-integraatio koskemattomat.
