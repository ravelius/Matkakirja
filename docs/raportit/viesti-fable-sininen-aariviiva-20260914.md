# Viesti Fablelle: maan ääriviiva musteen siniseksi

**Erä:** KARTTAUUDISTUKSEN PAATOKSET 14 kohta 2 (omistaja 14.9.2026, sanatarkasti:
*"vaihda samalla kartan reuna musteen siniseksi"*, kortilla tarkennettuna maan
punaiseksi rajaviivaksi).
**Haara:** `claude/bold-ride-vow4ki-sininen` (pohja `origin/main` d79e2216).
**Ei versionostoa, ei Raamattuun, ei mergeä** — Fable versioi ja julkaisee.

---

## 1. Mitä muuttui yhdellä lauseella

Kohdemaan kehä on nyt **tummaa, murrettua musteensinistä `#1f3a5f`**, ja
muuttujan nimi vaihtui sävyn mukana `--raja-punainen` → **`--raja-muste`**;
leveys (3 px, v1873) ja aamupäivän katkokorjaus pysyvät koskemattomina, ja
`--mark` #b03a2b jää kartan muille merkinnöille.

## 2. Kolme ehdokasta, mitattuna

Ehdokkaat ovat kaikki samaa tummaa preussinsinistä perhettä, eroa on vain
vaaleudessa. Kontrasti on WCAG:n suhdeluku (relatiivinen luminanssi), taustat
ne, jotka kehän vieressä oikeasti ovat: paletin seepiapaperi `--paper` #efdcb4
ja kohdemaan vaalein värillinen maasto (230, 219, 172).

| sävy | HSL | kontrasti paperiin | kontrasti värilliseen maahan | sinidominanssi B − (R+G)/2 |
|---|---|---|---|---|
| #2b4a6f (vaalein) | H213 S44 % L30 % | 6,73 | 6,53 | +52,5 |
| **#1f3a5f (VALITTU)** | **H215 S51 % L25 %** | **8,51** | **8,25** | **+50,5** |
| #1a2f4a (tummin) | H214 S48 % L20 % | 10,05 | 9,74 | +37,5 |
| *entinen punainen #853124* | *H8 S57 % L33 %* | *6,32* | *6,13* | *−55,0* |
| *`--mark` #b03a2b* | *H7 S61 % L43 %* | *4,47* | *4,33* | *−74,0* |

Kaikki kolme ylittävät vaaditun 4,5:n reilusti, joten **keskimmäinen valittiin
ohjeen mukaisesti**: se on jo 35 % entistä punaista kontrastisempi, mutta ei
mene yhtä mustaksi kuin uloin vaihtoehto — viivan pitää lukea musteena, ei
piirustusrajana.

**Erottuvuus merestä ja aluevesistä ei ole ongelma, ja se on syytä sanoa
ääneen, koska sininen viiva sinisellä merellä olisi.** Tässä pelissä meri EI
ole sininen: `tools/fokuskartta/piirto.js` sanoo sen suoraan (*"meri on tässä
kartassa viileää paperia, ei sinistä"*), syvinkin meri on 134,132,124 ja
merisyvyyskerrokset ovat ruskeanharmaita (#877a63 … #c3b598). Mitattu
sinidominanssi: kehä **+50,5**, syvin meri **−9,0**, merisyvyys-6000 **−29,5**,
seepiapaperi **−49,5**. Ero on yli 59 yksikköä lähimpäänkin merisävyyn, eli
kehä ei sulaudu veteen missään kohdassa rannikkoa.

Kuvat: `kuvat/sininen-varivaihtoehdot-20260914.png` — kolme sävyä **samasta
kohdasta** Ranskan Atlantin rannikkoa (Bretagne–Gironde), sama kamera
(lat 45,9 / lng −1,2 / altitude 0,12), työpöytäruutu 1400 × 900, ainoa ero on
väri. `kuvat/sininen-atlantti-lahikuva-20260914.png` on valitusta sävystä
lähikuva.

## 3. Muutetut tiedostot

- **`css/styles.css`** — `--raja-punainen: #853124` → `--raja-muste: #1f3a5f`.
  Kommentti kirjoitettiin uusiksi: miksi oma nimi, mitattu valinta, ja miksi
  meri ei ole tässä uhka. `.maatummennus-viiva` (tasokartta) lukee uuden nimen.
- **`js/pallovektorit.js`** — `KOROSTUS_MUSTE` #853124 → #1f3a5f (vara, jos CSS
  ei ole ladattu), `korostuksenMuste` lukee `--raja-muste`. **Leveyteen
  (`VEKTORIT_KOROSTUS_LEVEYS_CSS` [2,1, 3,1]), päätypyörylöihin, peittoon tai
  katkokorjaukseen ei koskettu.**
- **`tests/maakorostus.test.mjs`** — värivartio vaihdettiin punaisesta
  siniseen: sinikanavan ylivoima, tumma (L < 0,35) ja murrettu (S < 0,7), arvo
  sama kuin paletissa, eri kuin `--mark`, ja **kontrastit ≥ 4,5 lasketaan
  testissä** paperiin ja värilliseen maahan. Tasokartta lukee saman muuttujan.
- **`tools/savukkeet/savuke-maan-aariviiva.mjs`** — `PUNAKYNNYS 70`
  (R − (G+B)/2) → `SINIKYNNYS 25` (B − (R+G)/2), paletti- ja värivartiot uuteen
  nimeen, otsikko ja vastakoeselitys ajan tasalle.

Muihin merkkeihin (`--mark`: lentoreitti, sinettivaha, maakäyrät,
vertailuvalinta) ei koskettu. Ei dist/-kansiota, ei muutoslokiriviä.

## 4. Savuke ja vastakoe

```
54/54 vartiota läpi
  puhelin-saapuminen   peitto 100,0 %   #1f3a5f / 2,92 px   renkaita 16/16   kaikki 8 kohtaa +
  puhelin-zoom         peitto 100,0 %   #1f3a5f / 3,07 px   renkaita 16/16   kaikki 8 kohtaa +
  tyopoyta-saapuminen  peitto  97,2 %   #1f3a5f / 3,66 px   renkaita 16/16   kaikki 8 kohtaa +
  tyopoyta-zoom        peitto  97,2 %   #1f3a5f / 3,66 px   renkaita 16/16   kaikki 8 kohtaa +
```

**Rehellisyyden nimissä:** työpöydän peitto on 97,2 % eikä 100 % kuten
punaisella. Syy on mitassa, ei viivassa: sinikynnys 25 on suhteessa tiukempi
kuin entinen punakynnys 70 (kehän oma arvo on +50,5, kun punaisella se oli
+106), joten reunanpehmennyksen haaleimmat pikselit eivät enää kelpaa. Kaikki
kahdeksan nimettyä kohtaa osuvat yhä, ja raja 90 % ylittyy selvästi. Kynnystä
ei laskettu vastaamaan vanhaa lukua, koska silloin savuke hyväksyisi myös
vaalean sinertävän pikselin viivaksi.

**VASTAKOE** (`SAVUKE_VASTAKOE=1`: kehä palautetaan ajossa entiseksi — `--mark`
#b03a2b, 2,5 px, ei päätypyörylöitä):

```
10/54 vartiota läpi
  FAIL  <näkymä>: kehä on ehjä (peitto ≥ 0.9) — 0.0 %                (4 ×)
  FAIL  <näkymä>: <kahdeksan nimettyä kohtaa> — ei rajan väriä      (32 ×)
  FAIL  <näkymä>: väri on paletin --raja-muste — #b03a2b ≠ #1f3a5f   (4 ×)
  FAIL  <näkymä>: väri ei ole --mark — #b03a2b                       (4 ×)
```

Punaisella viivalla sininen mitta löytää **0 %** — eli savuke mittaa juuri sitä
sävyä, joka vaihtui, eikä mitä tahansa viivaa. (Aamupäivän versiossa vastakoe
jätti peiton vihreäksi, koska mitta oli silloin punainen molemmissa.)

## 5. Kuvat

- `kuvat/sininen-varivaihtoehdot-20260914.png` — kolme sävyä samasta kohdasta
  Atlantin rannikkoa, 1400 × 900 -kaappauksista rajattuna.
- `kuvat/sininen-atlantti-lahikuva-20260914.png` — valittu #1f3a5f lähikuvana.
- `kuvat/sininen-tyopoyta-saapuminen-20260914.png` — savukkeen työpöytäkaappaus.
- `kuvat/sininen-puhelin-zoom-20260914.png` — savukkeen puhelinkaappaus.

## 6. Portit

| portti | tulos |
|---|---|
| `npm test` | # pass 3355, # fail 0 (skipped 13 — pollo.test.mjs:n kuormavartiot) |
| `node tools/tarkista-kaksoisavaimet.mjs` | ei kaksoisavaimia |
| `node tools/tarkista-niputus.mjs` | niputus kunnossa: 387 moduulia, 4211 top-level-julistusta |
| `node tools/tarkista-savukkeet.mjs` | savukkeet kunnossa: 1641 ui-viittausta, 405 metodia, 534 kenttää |
| `savuke-maan-aariviiva.mjs` | 54/54; vastakoe 10/54 |
