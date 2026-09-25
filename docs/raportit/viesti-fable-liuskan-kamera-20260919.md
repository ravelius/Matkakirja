# Liuskan kamera-ajo 20 s — juurisyy on äänilaite, ei kamera

Opus-erä 19.9.2026, haara `claude/bold-ride-vow4ki-liuskan-kamera`
(pohja `claude/bold-ride-vow4ki-v1947`, commit 06c4940b).

Tehtävä: selvittää, miksi `savuke-pariisi-lahizoom` vartio 8c
(*"kaupunkimerkin napautus ajaa kameran < 2000 ms ja avaa liuskan"*)
antoi 20 641–20 677 ms, kun v1946:ssa vartio oli vihreä. Epäillyt
olivat kaikki v1947:n omia muutoksia: kohdevalinnan `valitseSiirto`
(PAATOKSET 42), `ajaEnnakkozoomi` / `pysaytaKameraAjo(syy)`
(PAATOKSET 40) ja saaton uusi maali.

**Yksikään epäilty ei ollut syy. Kamera-ajo on 429 ms eli juuri se,
mitä päätös lupaa.** Koko kaksikymmentä sekuntia on YKSI kutsu:
`new AudioContext()`.

---

## 1. Mittaus: mistä 20 sekuntia koostuu

CDP-profiili (`Profiler`, näytteenotto 2 ms) napautuksen yli,
390 × 844, `SAVUKE_LOHKOT=liuska`:

```
TUTKINTA napauta kesti     20 171 ms
TUTKINTA profiili          20 909 ms, osumia 7 278
TUTKINTA    7038  AudioContext @ :0   <- kytkeVahvistin:494   (96,7 %)
TUTKINTA     167  (idle)
TUTKINTA      17  (program)
TUTKINTA      10  (garbage collector)
TUTKINTA       4  nimiAvain @ kaupunkiliuska.js:92
...                (loput yksittäisiä globe.gl:n piirto-osumia)
```

Sama ajo pelin omilla koukuilla mitattuna (`ajaKamera`,
`pysaytaKameraAjo`, `liuskanTilantarve`, `avaaLiuskaKaupungista`
kääritty, plus oma rAF-kehysmittari):

```
kehykset: kehyksiä 49, PISIN KEHYSVÄLI 20 028 ms
t = 20 184  liuskanTilantarve   0 ms, korkeus 512,3
t = 20 184  ajaKamera ALKU      kesto 420 ms, kohde x 5921,1 y 1440,1 leveys 40,0
t = 20 613  ajaKamera LOPPU     tulos true, syy 'perilla'      →  429 ms
t = 20 630  avaaLiuskaKaupungista 9 ms, tulos true
            liuskaAuki heti perään, rivejä 10
```

Eli: napautuksen jälkeen ruutu oli jumissa 20,0 sekuntia (rAF ei
käynyt kertaakaan), ja heti kun tukos aukesi, koko liuskan ketju
kulki **446 ms:ssä** — mitta, tilantarve, kamera-ajo ja avaus.

**Kolme epäiltyä pois suljettuna, mitattuna:**

* `ajaKamera` ajettiin **kerran**, kesto 420 ms, tulos `true`, syy
  `perilla` — ei jatkoajoja, ei `'ohjelma'`-keskeytystä, ei uusintaa.
* `pysaytaKameraAjo`ta ei kutsuttu ajon aikana kertaakaan (koukku ei
  kirjannut yhtään riviä ajon väliin).
* `liuskanTilantarve` 0 ms — kohdan 10 uusi ajon maali ei maksa mitään.
* `ui.siirtoKaynnissa` ei ollut päällä (peli on `action`-vaiheessa,
  ei noppaa) eikä `valitseSiirto`-haaraan mennä lainkaan: napautus on
  pelaajan OMA kaupunki (Pariisi), joten haara on `void (async …)`.

## 2. Juurisyy: `new AudioContext()` kestää 20 003 ms

Sama sivu, sama ajo, mitattuna suoraan ennen napautusta:

| missä | `new AudioContext()` | tila | `currentTime` |
| --- | --- | --- | --- |
| `about:blank`, sama Chromium | **127 ms** (2. ja 3. 0 ms) | running | 0 |
| pelin sivu `http://localhost:…` | **20 003 ms** | running | 0 |

Kaksikymmentä sekuntia tasan on sisäinen aikakatko: tässä
Chromiumissa (Mac Studio, Chromium 1234, ei äänilaitetta) äänilaitteen
valtuutus ei vastaa, konstruktori jää odottamaan ja palaa katkosta
kontekstilla, joka sanoo `running` mutta jonka kello ei koskaan etene
(`currentTime` 0).

**Tämä on SAMA juurisyy kuin kahdessa edellisen erän velassa**
(docs/raportit/viesti-fable-savukkeet-v1947-20260919.md kohdat 2 ja
3 b): `savuke-astro-aani` näki `ctxAika 0` ja `savuke-topografialinssi`
odotti `diaryVoice`n kelloa, joka ei etene. Kaikki kolme ovat yhden ja
saman asian oireita: **tämän koneen Chromiumissa ei ole toimivaa
äänilaitetta, ja Web Audion kello seisoo.**

## 3. Miksi juuri 8c maksoi sen

`js/puhe.js` virittää äänen ISTUNNON ENSIMMÄISESTÄ kosketuksesta:

```js
document.addEventListener('pointerdown', virita, { once: true, capture: true, passive: true });
```

`virita` → `kytkeVahvistin()` → `new AudioContext()`. Tämä on
omistajan päätös 15.8.2026 (Mac-Safari: striimiluenta käynnistyy vasta
verkkovastauksen saavuttua eli eleen ULKOPUOLELLA, joten piiri on
herätettävä eleessä) — **peli tekee oikein**.

Liuska-lohko (`SAVUKE_LOHKOT=liuska`) avaa oman sivunsa ja ajaa
vartiot 8a ja 8b pelkillä `evaluate`-luennoilla; `zoomaaPariisiin`
siirtää kameran `pointOfView`illa eikä eleillä. Niinpä **8c:n napautus
on koko lohkon ensimmäinen pointerdown**, ja se maksoi istunnon koko
äänivirityksen. Pelaajalla näin ei koskaan käy: hän on koskettanut
ruutua kymmeniä kertoja ennen kuin napauttaa kaupunkimerkkiä — ja
oikealla laitteella kutsu on millisekunteja.

## 4. EI v1947:n vika — vertailuajo ratkaisi

Sama savuke ajettiin `origin/main`-puussa (v1946, commit 671e7d49)
omassa worktreessä, samalla koneella, samalla Chromiumilla:

| | v1947 (06c4940b) | v1946 (`origin/main`) |
| --- | --- | --- |
| 8c ajo | 20 668 / 20 631 / 20 681 ms | **20 631 ms** |
| lohkon tulos | 16/17 | **16/17** |

Ero on kellon tarkkuudella nolla. **Vartio ei siis ollut vihreä
v1946:ssa tällä koneella**; aiempi vihreä on eri ympäristön tilasta
(äänilaite vastasi silloin). Kaikki kolme v1947-epäilyä ovat pois.

## 5. Korjaus — ei rajan löysennystä

Peliin **ei koskettu**: mitattu syy on äänilaitteessa, ja ainoa
peliin tehtävä muutos olisi purkaa omistajan 15.8.2026 päättämä
eleeseen sidottu äänen viritys. Se on Fablen/omistajan päätös
(Kustannuskuri kohta 1), ei tämän erän asia — ks. kohta 7.

`tools/savukkeet/savuke-pariisi-lahizoom.mjs`: uusi apuri
`viritaAanipiiri(sivu)` lähettää yhden synteettisen `pointerdown`in
BODYYN ennen 8c:n mittausta.

* **Katto pysyy 2 000 ms:ssä ja väite sanasta sanaan ennallaan.**
  Mitään ei löysennetty; istunnon kertaluonteinen äänikustannus
  siirrettiin kellon ULKOPUOLELLE, sinne missä se oikeassa pelissäkin
  on.
* Ele menee `document.body`yn eikä kartan koteloon, joten se ei
  pysäytä kamera-ajoa (`pysaytaKameraAjo('ele')`) eikä osu mihinkään
  merkkiin.
* Apurin kommentissa on mitatut luvut ja viittaus edellisen erän
  kohtiin 2 ja 3 b.

## 6. Kestot ja savukkeiden tulokset

| ajo | ennen | jälkeen |
| --- | --- | --- |
| pariisi-lahizoom 390-liuska, vartio 8c | **20 668 ms** (FAIL) | **632 ms** (OK) |
| pariisi-lahizoom 1400-liuska, vartio 8c | — | **646 ms** (OK; CI antoi ennen 20 666 ms) |
| liuskan oma kamera-ajo (mitattu koukulla) | 429 ms | 429 ms (ennallaan) |

| savuke | tulos | kesto |
| --- | --- | --- |
| pariisi-lahizoom 390-liuska | **17/17** | 158 s |
| pariisi-lahizoom 1400-liuska | **16/16** | 158 s |
| siirtozoomi | **16/16** | 70 s |
| kohdevalinta | **14/14** | 108 s |

## 7. Ehdotus Fablelle (oma eränsä)

Kahdenkymmenen sekunnin tukos on tässä ympäristössä artefakti, mutta
sen alla on todellinen pieni sääntö: **istunnon ensimmäinen napautus
maksaa koko äänipiirin rakentamisen synkronisesti, ennen kuin peli
ehtii vastata siihen napautukseen.** PAATOKSET 34 kohta 10 lupaa,
ettei napautus jää roikkumaan. Vaihtoehdot, joista kumpikaan ei ole
turvallinen ilman omistajan päätöstä:

1. `kytkeVahvistin` pois `virita`n synkroniselta polulta (esim.
   `setTimeout(…, 0)`): Chromen transientti ele kantaa 5 s, mutta
   WebKitin (iPad, iPhone) ele-ehto on tiukempi — riski on juuri se
   vika, jonka omistaja raportoi 15.8.2026 (*"striimi ääni ei kuulu
   macin selaimella"*).
2. Äänipiiri luodaan `suspended`-tilassa jo latauksessa ja vain
   `resume()` sidotaan eleeseen. Tämän ympäristön 20 s siirtyisi
   silloin sivun latausvaiheeseen — kaikkien savukkeiden hinnaksi.

Lisäksi: kolme savukevelkaa (tämä 8c, astro-aanen `taso 0` ja
topografialinssin `luenta false` / välähdys) ovat nyt mitatusti sama
asia. Jos CI-koneelle saadaan virtuaalinen äänilaite tai savukkeet
ajetaan lipulla, joka ohittaa laitevaltuutuksen, kaikki kolme
ratkeavat yhdellä kertaa.

## Portit ennen committia

* `node --test tests/*.test.mjs` → **# pass 3644, # fail 0** (skipped 13, 3 657 väitettä, 78 s)
* `node tools/tarkista-niputus.mjs` → niputus kunnossa, 398 moduulia, 4 497 top-level-julistusta, ei törmäyksiä
* `node tools/build-standalone.mjs` → dist/matkakirja.html 32 784 kt

Versionumeroa ei nostettu. Muutetut tiedostot:
`tools/savukkeet/savuke-pariisi-lahizoom.mjs` ja tämä raportti.
Peliin (`js/`) ei koskettu.
