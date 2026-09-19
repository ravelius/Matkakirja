# Opus 2 → Fable: savukekarsinta – PR-portti ja harva sarja

19.9.2026 klo 19.05–19.20 Suomen aikaa, haara `opus2-savukekarsinta`
(origin/main v1961 + merge `opus2-ihmisen-kysymykset`, koska uusi
pulukysymyssavuke tulee porttiin). Omistaja 19.9.2026 klo 18.50:
*"Testejä voi vähentää siellä missä harvemmin tulee ongelmia vastaan"*.
Ei versionostoa, ei PR:ää. Fable hyväksyy jaon ennen mergeä.

## Tulos lyhyesti

- **PR-portti** (`julkaisu`) on nyt 26 riviä, ennen 34. Jonosimulaatio
  6 rinnakkain antaa **5 min 53 s**, ennen 9 min 23 s. Viimeisin oikea
  ajo (35451913616, 34 riviä) kesti 9 min 4 s, joten simulaatio osuu
  oikeaan suuruusluokkaan.
- **Harva sarja** (`harva`) on 9 aina vihreää tai pelkästään
  kalibroitua, hidasta riviä (112–180 s). Niiden aito löydöslukema on
  **0** koko CI-historiassa.
  - Schedule ajaa `taysi` (harva + julkaisu) kerran päivässä mainista
    klo 03 UTC eli 06 Suomen aikaa.
  - PR:ssä harvan rivin ajaa vain polkuosuma (`harvaPolut`): rivin omat
    moduulit, rivin savuketiedosto tai yhteiset apurit. Yhteisen apurin
    osuma ajaa kaikki harvat.
  - Jos PR:n tiedostolistaa ei saada, ajetaan kaikki harvat.
- **Takautuva tarkistus:** jokainen CI-historian aito löydös tuli
  riviltä, joka jää PR-porttiin (taulukko 3).

## 1. Aineisto

- `gh run list --workflow Savukkeet --limit 300`: 139 ajoa 17.9. klo 04 –
  19.9. klo 15 UTC, joista 109 on success tai failure. Savukkeet-CI on
  ollut olemassa vasta 17.9. alkaen (#2551), joten 14 päivän ikkuna =
  koko CI-historia.
- Jokaisen ajon `--log` luettiin: aja-sarja.mjs:n rivi
  `[n/N] nimi: x/y TILA, k s` per savuke.
  - **62 Mac-ajoa** sisältää rivit.
  - 47 ajoa jäi pois: 39 on 17.9:n ubuntu-matriisin aikaa (eri
    ympäristö ja vielä kalibroimaton), ja 8 kaatui ennen sarjaa tai
    peruttiin.
- Artefakteja (`savukkeet-mac-*`) ei ladattu. Niitä on 8,5 Gt, ja
  lokirivit sisältävät saman tuloksen.
- Kestot ovat **mediaani 6 rinnakkain -ajoista** (13 ajoa 19.9.).
- "Uusi punainen" on aja-sarjan `UUSI PUNAINEN`. Kunkin uuden punaisen
  seuraava ajo samalla haaralla ja `git diff --name-only` niiden välillä
  luokittelivat sen:
  - **aito**: korjaus tuli pelikoodiin tai dataan, ja commit sanoo
    korjanneensa vian.
  - **kalibrointi**: vain `sarjat.json` tai savukkeen oma tiedosto
    muuttui.
  - **häilyvä**: seuraava ajo oli vihreä ilman yhtään muutosta
    savukkeeseen, sarjaan tai js/-koodiin (yksi tapaus: astro-pallo,
    3dfaba2e → d965e2b6).
  - **massapunainen**: 4–8 riviä punaisena samassa ajossa samasta
    syystä (71b34536 ja f37d4102 ensimmäiset Mac-ajot 17.9.,
    628589f0 kerma katosi, 03f5ccd7, e2773578 pilvikuva).

## 2. Rivit ja päätökset

Ajot = rivin Mac-ajot. Jaetuilla riveillä (pariisi, satelliitti,
astro-pallo, kaupunkipopup) luku alkaa jaosta; yhdistetyn rivin historia
on luettu mukaan luokitteluun.

| Rivi | Ajot | Uudet punaiset | Aidot | Kalibrointi / häilyvä | Kesto (6 rinn.) | Päätös |
|---|---|---|---|---|---|---|
| luentakuvat | 27 | 0 | 0 | 0 | 180 s | **HARVA** (luenta*, fokusvirta, maapaneeli) |
| kaupunkipopup#390 | 43 | 2 | 0 | 2 (massapunainen 628589f0; 03f5ccd7) | 173 s | **HARVA** |
| kaupunkipopup#1400 | 43 | 2 | 0 | 2 (628589f0; fa5ab8cd = savukkeen oma vika, raportti kaupunkipopup-20260919) | 174 s | **HARVA** |
| satelliittilinssi#isot | 43 | 0 | 0 | 0 (yhdistetty rivi: 3 kalibrointia) | 128 s | **HARVA** (satelliitti*, astro*, reliefi) |
| satelliittilinssi#pienet | 43 | 1 | 0 | 1 (sarjat.json) | 121 s | **HARVA** |
| astro-pallo#vartija-a | 43 | 0 | 0 | 0 (yhdistetty rivi: 1 häilyvä) | 119 s | **HARVA** |
| astro-pallo#vartija-b | 43 | 2 | 0 | 2 (45c tunnetuksi, sarjat.json) | 131 s | **HARVA** |
| ihmisen-kappaleet | 62 | 0 | 0 | 0 | 121 s | **HARVA** (ihmisen-matka*, aikajana*) |
| astro-valokuva | 62 | 2 | 0 | 2 (sarjat.json) | 112 s | **HARVA** |
| pariisi-lahizoom#390-perus | 30 | 3 | 2 | 1 | 84 s | PORTTI |
| pariisi-lahizoom#1400-perus | 30 | 2 | 2 | 0 | 86 s | PORTTI |
| pariisi-lahizoom#390-liuska | 30 | 2 | 2 (8c aito vika, liuska) | 0 | 140 s | PORTTI |
| pariisi-lahizoom#1400-liuska | 30 | 2 | 2 | 0 | 142 s | PORTTI |
| topografialinssi | 62 | 10 | 3 (#2584, 9691d168) | 7 | 144 s | PORTTI |
| musta-laatta#webkit | 5 | 0 | – | – | 30 s | PORTTI (uusi vartio, v1955) |
| musta-laatta#chromium | 5 | 0 | – | – | 27 s | PORTTI (uusi vartio) |
| astro-pallo#vartija-c | 30 | 1 | 0 | 1 | 51 s | PORTTI (lyhyt) |
| astro-pallo#tyopoyta | 43 | 3 | 1 (pilvikuva) | 2 | 91 s | PORTTI |
| astro-pallo#puhelin | 43 | 2 | 1 (pilvikuva) | 1 | 96 s | PORTTI |
| astro-aani | 62 | 4 | 1 (pilvikuva) | 3 | 62 s | PORTTI |
| ihmisen-kehys | 62 | 1 | 0 | 1 (massapunainen) | 68 s | PORTTI (lyhyt, aikajana) |
| ihmisen-esitys | 62 | 2 | 0 | 2 | 45 s | PORTTI (lyhyt, aikajana) |
| pallo-nostolaput | 62 | 14 | 2 (kaupunkipiste, liuska) | 12 | 32 s | PORTTI |
| nimikyltti | 62 | 6 | 1 (569b55da) | 5 | 118 s | PORTTI |
| kerma-reuna | 37 | 3 | 1 (kerma katosi) | 2 | 44 s | PORTTI |
| ranskan-nostot-lukossa | 37 | 2 | 1 (#2584) | 1 | 177 s | PORTTI |
| astro-sumu | 27 | 1 | 1 (pilvikuva) | 0 | 59 s | PORTTI |
| kohdevalinta | 27 | 1 | 0 | 1 | 49 s | PORTTI (lyhyt) |
| laivamatka-tanger | 16 | 1 | 0 | 1 (0/0, savuke) | 29 s | PORTTI (lyhyt, uusi) |
| reittihelmet | 27 | 0 | 0 | 0 | 53 s | PORTTI (lyhyt) |
| siirtozoomi | 27 | 0 | 0 | 0 | 51 s | PORTTI (lyhyt) |
| noppa-saapumisen-aikana | 11 | 0 | 0 | 0 | 37 s | PORTTI (lyhyt, uusi v1950) |
| maailmatila-zoomi | 31 | 0 | 0 | 0 | 27 s | PORTTI (lyhyt) |
| kaupungit-piiloon | 27 | 0 | 0 | 0 | 17 s | PORTTI (lyhyt) |
| ihmisen-pulukysymykset | – | – | – | – | ~45 s | PORTTI (uusi, erä B) |

**Jakoperuste:** portti pitää rivit, joilla on ollut aito löydös, uudet
vartiot sekä alle 70 s:n lyhyet rivit. Lyhyet vartioivat usein
muuttuvaa koodia (pallolauta, nostot, aikajana) ja maksavat vähän.
Harvaan sarjaan menee vain rivi, joka on **sekä** ilman aitoa löydöstä
**että** hidas (≥ 110 s). Kaikki yhdeksän vartioivat rajattua
moduuliperhettä, joten polkusuodatin tuo ne takaisin PR:ään, kun
juuri niitä muutetaan.

## 3. Takautuva tarkistus: aidot löydökset jäävät porttiin

| Löydös (korjaava commit) | Punaiset rivit | Rivit portissa? |
|---|---|---|
| Nimikyltti vedon yli (569b55da) | nimikyltti, pariisi-lahizoom | kyllä |
| Kartalla-olo kerroksen rivistosta (dcc34e53) | pariisi-lahizoom | kyllä (4 riviä) |
| Liuskan piilomerkki + vaakapako (907e0097, fef6683b) | pariisi-lahizoom, pallo-nostolaput | kyllä |
| Kaupunkipiste ei pala laattaan (3684253d) | pallo-nostolaput | kyllä |
| Maakohtainen nostotaso (#2584, 8a85d8d7) | ranskan-nostot-lukossa, topografialinssi, pariisi-390/1400 | kyllä |
| Kerma katosi, luettelon vienti (98ffda0c) | kerma-reuna, pariisi-perus ×2, nostolaput, nimikyltti | kyllä |
| Lähizoom 8c aito vika (raportti 8090aa0e) | pariisi-liuska ×2 | kyllä |
| Pilvikuva kytkettiin pois (v1948, 3bd3513f) | astro-aani, astro-pallo-puhelin/-tyopoyta, astro-sumu, topografialinssi | kyllä |

Yksikään harvan sarjan rivi ei ollut minkään aidon löydöksen ainoa
vahti. Kaupunkipopupin kaksi uutta punaista olivat savukkeen oma vika
(raportti `viesti-fable-kaupunkipopup-20260919.md`: napautus osui
saapumistraileriin) tai massapunaista.

Ennen CI:tä (5.–16.9.) raporttien löydökset tulivat julkaisusarjan
ulkopuolisista vartioista:
- `viesti-fable-etusivu2-20260914.md`
- `viesti-fable-karttauudistus-era1b-20260913.md` (Belgian alanko)
- `viesti-fable-kaupunkiliuska-20260917.md` (MODULES-vartiot)
- `viesti-fable-vu-mittari-20260915.md`

Tämä jako ei koske niitä.

## 4. Jonosimulaatio

FIFO listan järjestyksessä kuten aja-sarja.mjs. Kestot ovat 6
rinnakkain -mediaaneja, ja pulukysymyksille arvioitiin 45 s.

| Ajo | Rivejä | Työ | Seinäkello (6) | (4) |
|---|---|---|---|---|
| Ennen: julkaisu 34 + pulukysymykset | 35 | 3058 s | 563 s (9 min 23 s) | 778 s |
| **PR, ei harvaosumia** | 26 | 1800 s | **353 s (5 min 53 s)** | 464 s |
| PR + satelliitti-avaruus.js | 31 | 2411 s | 447 s (7 min 27 s) | – |
| PR + luenta.js | 27 | 1980 s | 385 s | – |
| PR + ihmisen-matka-esitys.js | 27 | 1921 s | 379 s | – |
| PR + kaupunkinosto.js / pallolauta/lauta.js | 28 | 2146 s | 413 s | – |
| PR + yhteinen apuri (aja-sarja.mjs) = taysi | 35 | 3058 s | 563 s | 778 s |

Harvat rivit laitetaan jonon ALKUUN (`sarjaPr`, `taysi`): ne ovat
pisimpiä, ja perään lisättynä luentakuvat (180 s) venytti
seinäkelloa 457 s:iin, alkuun laitettuna 385 s:iin.

Kaikki PR-yhdistelmät jäävät alle 10 minuutin.

## 5. Muutokset

- `tools/savukkeet/sarjat.json`:
  - `julkaisu` on 26 riviä (9 pois, pulukysymykset mukaan)
  - uusi `harva` (9 riviä)
  - uusi `harvaPolut` (rivikohtaiset globit sekä `YHTEISET`: aja-sarja,
    rakenna-matriisi, vertaa-tulos, pallon-liike-mittarit,
    chromium-liput, työnkulku, index.html, sw.js)
  - `_kommentti` täydennetty
- `tools/savukkeet/rakenna-matriisi.mjs`: sarjanimet `harva` ja `taysi`.
  Pilkkulista voi yhdistää sarjanimiä ja tiedostoja
  (`savuke-luentakuvat.mjs,julkaisu`).
- `tools/savukkeet/valitse-harvat.mjs` (uusi): PR:n tiedostolista
  (stdin) → sarjamerkkijono.
- `.github/workflows/savukkeet.yml`:
  - `schedule: '0 3 * * *'` → `taysi`
  - PR laskee sarjan komennolla `gh pr diff --name-only | valitse-harvat`
    (`GH_TOKEN`, `pull-requests: read`); gh:n virhe → `taysi`
  - Mac-jobin `if` sallii scheduen
- `tests/savukesarjat.test.mjs` (6 testiä): sarjat eivät mene
  päällekkäin, polut ovat olemassa, glob, polkusuodatin, harvat ensin ja
  työnkulun kytkentä.
- `CONTRIBUTING.md`: lyhyt kappale sarjoista.
- Savukkeisiin itseensä ei koskettu.

## 6. Avoimet

- Schedule ajaa `taysi` mainista 06 Suomen aikaa. Jos harva rivi
  punastuu siellä, tieto tulee vasta aamulla: se on hinta, ja omistaja
  hyväksyi sen linjauksessa.
- `gh pr diff` ajetaan Macin runnerilla (gh on /opt/homebrew/bin).
  Ensimmäinen PR-ajo näyttää lokissa rivin `PR-sarja: …`. Tarkista, että
  se ei ole `taysi` (se tarkoittaisi, että gh-kutsu epäonnistui).
