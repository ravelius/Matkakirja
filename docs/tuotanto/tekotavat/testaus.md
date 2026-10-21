# B Tekotavat: testaus

*(Projektiseppä 21.10.2026, studiojako Raamattu 4.21; laitemittaukset (luku 3) Laitetestaajan kanssa TF 209:n kierrosten 33–34 mallilla. Lähteet:
Raamattu luku 9 ja `docs/moduulit/tuotantopohjat/tuotantoputken-tarkistukset.md`. Luvat, portit, vaiheet ja se, milloin
tarkistukset ajetaan (päivä- ja yöjuna): D tuotannonohjaus. Tässä on vain käytäntö: työkalut, komennot, mittarit ja
tyypilliset virheet. Proton polut ovat proto-repon (`proto-3d/Matkakirja-proto`) juuresta.)*

## 1. Työkalut

| Osa | Missä | Mihin |
|---|---|---|
| Pelirepon testit | `npm test` (`node --test tests/*.test.mjs`) | Selainpeli, dokumentit, työkalut, Raamatun kartta |
| Käännöksen tarkistus | proto `tyokalut/tarkista.sh` (proto-kaanna.sh vaihe 2) | unity-tarkistus + USS-sulut, tyylikirja, pohja-, valo-, liike- ja kameravahti, kameratesti, kielivahti |
| Unityn testit | `Peli-testit/` (EditMode/PlayMode), mm. `Linssit-testit`, `Kartta-testit`, `BottiOsatTestit`, `BottiPelaaTestit` | Logiikka ilman simua |
| Kooste ennen junaa | proto `zsh tyokalut/ennen-junaa.sh [--loki <todistuskansio>]` | Tuontitarkistus, kameratesti, nykäysvahti, botti → `proto-3d/lokit/ennen-junaa-<aika>/JUNATARKISTUS.md` |
| Codex-tuontitarkistus | pelirepo `node tools/codex-3d-tarkistus.mjs <toimituskansio>` | glb, mittakaava, luuranko, manifesti, kuvat, lähteet |
| Kameratesti | proto `python3 tyokalut/kameratesti.py` (~45 s) | Kameraliikkeiden testit ja kattavuus (`tyylikirja/kameratesti.json`) |
| Nykäysvahti | proto `python3 tyokalut/nykaysvahti.py <todistuskansio \| loki>`; testit `nykaysvahti_testi.py` | Yli 20 ms:n ruudut kameran liikkeessä + 1 s |
| Läpipeluubotti | proto `tyokalut/botti-osat.sh --loki <todistuskansio>` (skenaario `botti-osat.txt`) | Botin simuajon raportti `RAPORTTI.md` |
| Todistusajo | proto `tyokalut/todistusajo/todistusajo.sh` (ohje `OHJE.md`, vakiosarja `sarja.sh`) | Simuajo oikein kosketuksin: lokit, stillit, ääni, `TODISTUS.md` |
| Sokkotarkistus: ääni | Gemini 3.1 Pro (`gemini.kuvaile`, `gemini.sopiiko`) + `proto-3d/tyokalut/aaniportti.py` | Ks. `tekotavat/aani.md` |
| Sokkotarkistus: kuvat | `vyoero.py paalla pois` (terävyys vyöhykkeittäin), `valahdys.py <video> 4` (välähdykset) | Kuvaparit ja videot luvuin, ei silmäarviolla |
| iPad | `xcrun devicectl`, apuri proto `tyokalut/ipad.sh`; LT:n skriptit `docs/raportit/laitetestaaja-pelaaja-tyokalut-20261020/` | Asennus, komennot, mittaukset isolla iPadilla |

## 2. Vaiheet (käytännössä)

1. **Oma tarkistus pelistä (9.5).** Katso oma tuotos pelissä, ei vain testeistä: kuvat ja UI 2× suurennettuna (reunavälit
   pikseleinä: kulmat, naapurit, keskilinjat, glyfit), videot ruutu ruudulta ja välähdyshaku `valahdys.py`:llä. Värit,
   tekstit, napit, valo ja sijainnit riittää katsoa Macin Unity-esikatselussa iPhonen ja iPadin ruutukoossa; simua
   ei tarvita. Korjaa ja katso korjattu vielä kerran. Raportissa kerrotaan, onko väite todennettu kuvalla vai lokilla.
2. **Sokkotarkistukset (9.6, 9.11).** Tarkistaja ei tiedä, mitä pitäisi löytyä:
   - *Ääni ja puhe:* Gemini kuvaa äänen ensin tietämättä tavoitetta, vasta sitten verrataan tarpeeseen; ristiriita = hylkäys.
   - *Teksti:* tuore lukija lukee tekstin pelaajan näkymästä otetusta kuvasta (sävy, pituus, kaanon, faktat).
   - *Kuva-arkit ja pitkät lokit:* tuore Sonnet-apuagentti antaa lyhyen arvion; rooli katsoo itse vain lopullisen kuvaparin.
   - *Codexin 3D:* havainnekuva ja pelikuva rinnakkain täysikokoisina + tuontitarkistus.
3. **Automaatit (aina, ilman simua).**
   - Pelirepossa `npm test`; protossa käännös, jolloin `tarkista.sh` ajaa vahdit ja kameratestin.
   - Ennen junaan vientiä `zsh tyokalut/ennen-junaa.sh` proton juuresta. Ilman `--loki`-valintaa ajetaan tuontitarkistus,
     kameratesti ja botin logiikka; nykäysvahti ja botin simuajo ovat silloin EI AJETTU ja viimeinen rivi on
     `ENNEN JUNAA: KESKEN (…)`. Paluuarvot: 0 OK, 1 hylätty, 2 väärä valinta, 3 kesken, 4 odottaa (kevyt tila; `--nyt` ohittaa).
   - Uusi Codex- tai Tripo-toimitus: `node tools/codex-3d-tarkistus.mjs <kansio>`; ennen-junaa.sh tarkistaa myös itse tuoreet
     (`--paivia`, oletus 3) `_valmiit/`-kansiot ja postilaatikon kuvatoimitukset.
   - Uusi kameraliike: testi samaan erään (luokan nimi testissä), muuten kameratesti hylkää.
4. **Simuajo (vain D:n sallimissa tilanteissa: uusi tekniikka, omistajan pyytämät kuvat, yöjunan laitekierros).**
   - Vuoro Julkaisijalta (`SIMULAATTORI NYT`), vain vuoron UDID:llä; simut T7-sarjassa (`source …/simusarja.sh`).
   - `todistusajo.sh --era … --udid … --app … --sha … --haara … --skenaario …`; testattava napautus aina oikealla
     kosketuksella (`tap-teksti`, `tap-kohta`), tilan valmistelu komennoilla.
   - Aiemmat palautteet `palaute`-riveinä; toistuva lokirivi `oleta-uusi`-ehdolla, ei `oleta`.
   - Lopuksi `ennen-junaa.sh --loki <todistuskansio>` → nykäysvahti ja botin simuajo mukaan.
5. **Tulkinta.** `grep -nE "KUORMA|PUUTE|EI " TODISTUS.md` ennen kuittausta: KUORMA-rivi ei todista ruutunopeutta (uusinta
   kevyellä kuormalla), jokainen PUUTE selitetään. Nykäysvahdin HUOM kuormassa ei todista sulavuutta; EI TODISTETTU =
   yhtään vahdittua liikettä ei löytynyt.
6. **Vika ennen korjausta (9.7).** Toista vika ensin oikealla polulla testillä tai todistusajolla, varmista että mittari
   erottaa toimivan tilan (aja myös pohjahaarassa), korjaa ja aja sama uudelleen. Ämpärin sisältö puhtaalla asennuksella
   tuotannon osoittimen kautta.
7. **Opit** tämän tiedoston lukuun 5 ja työkalun omaan pohjaan.

## 3. Laitemittaukset (Laitetestaaja)

*Malli: yöjunan kierrokset 33–34 (TF 209, 21.10.2026), tulokset `proto-3d/_tyo/linssiseppa2/varjot-koko/kierros33/` ja
`kierros34/lt-tulos-*.txt`. Skriptit: `docs/raportit/laitetestaaja-pelaaja-tyokalut-20261020/` (alla K/).*

### 3.1 Laitteet ja valmistelu

- **Laitteet:** iPad Pro 13 M1 (`00008103-001819421413401E`, heikoin muisti, ensisijainen) ja iPhone-simulaattori. Iso iPad
  on roolien käytössä aina; ennen asennusta katso, onko laitteella auki Matkakirja3D-prosessi, jota et itse käynnistänyt
  (`xcrun devicectl device info processes --device $U | grep Matkakirja3D`) → se on omistajan, älä sulje sitä. Sovi
  muiden iPad-ajojen kanssa (NS, PK) VAPAA/OTTO ennen ketjua. Lopuksi iPadiin palautetaan uusin runko. Omistajan iPhonea
  ei käytetä.
- **Käännös ja asennus:** Release-laitekäännös (Natiiviseppä, `natiiviseppa-skriptit/laite-release.sh`, bundle
  `fi.matkakirja.peli.kehitys`; TestFlight-appiin ei voi kirjoittaa komentoja); `xcrun devicectl device install app`.
- **Ohjaus:** komentotiedostot sovelluksen Documents-kansioon (`devicectl device copy to --domain-type appDataContainer`):
  `peli-komento.txt` (esim. `uusi-peli 5 amsterdam`), `ui-komento.txt` (≥ 2,5 s peräkkäisten kirjoitusten väliin),
  `komento.txt` (`mittaus alku <n>` / `mittaus loppu`, `kuva <n>` → 2048 × 2732 PNG), `muisti-tarkka.txt` (`1000`).
  Käynnistys `devicectl device process launch --terminate-existing --console` taustalle; konsoli on mittausten lähde.
- **Skriptien polut:** skriptien alussa ovat oma scratchpad-polku `S` ja `U` (UDID); vaihda ne omiksi ja kopioi skriptit
  scratchpadiin (se tyhjenee session vaihtuessa).

### 3.2 Kierros yhdellä ketjulla

`bash K/ajo-ketju34.sh` (mallina; kopioi ja nimeä kierroksen mukaan) ajaa kaiken peräkkäin yhdestä bash-komennosta:

1. **Konsoli kiinni** (`launch`: vanha konsoli pois, ≥ 8 s, käynnistys `--console` → `kierrosNN/konsoli.txt`).
2. **Pelikierros** `K/ajo-kierros-yo30.zsh`: uusi peli; latauskuvat pysty ja vaaka (18 + 18 kuvaa); autopilotti reitti 1
   (`palatsi alku keski`, 150 s, iso aukio) ja reitti 2 (`-147.5,420`, 100 s, sisätila); GPU-mittaukset raskaassa kohdassa
   (A, jäädytys `ui juoksupeli valo jaady 1`) ja 25 s juoksussa (J, JA, JB); värinä kolmesta pisteestä (v11, v27, v52).
   Tulos: `tulosrivi-aukio.txt`, `tulosrivi-sisatila.txt`, `mittaus-*.txt`, `varina-tulos.txt`; kameran hyppyrivit
   `hyppysuoja-rivit.txt` (Pelikoodarille).
3. **Maali ja loppukortti** `K/ajo-maali-yo34.zsh`: botti + v4 ajaa, kunnes lokissa on `maali|loppukortti`; 24 pystykuvaa
   (`kierrosNN-maali/Maali-pysty-1…24.png`).
4. **Viisi kylmäkäynnistystä** (3.4) → `kylma5-kierrosNN/kylma-1…5.txt`.
5. **Tulosrivi** `kierrosNN/lt-tulos-NN.txt`: runko, laite, aika, lämpö alussa ja lopussa, GPU, värinä, autopilotin
   mittarit, loppukortti, kylmäkäynnistykset. Tämä rivi menee PT:lle; poikkeamien hyväksyntä on D:ssä.

### 3.3 Mittarit ja budjetit (iPad Pro 13, Release)

| Mittari | Mistä | Budjetti | Kierros 34 (B 5093a3bc8) |
|---|---|---|---|
| GPU-aika | `ui lasi mittaa N nimi` (konsolirivi "ruutuaika"), `kehysajat`-rivin `gpuMs`; analyysi `python3 -I proto-3d/tyokalut/natiivi-ui-ajot/ruutuaika-analyysi.py nimi=mittaus.txt …` | ≤ 14 ms raskaassa kohdassa (A) | A 10,30, J 10,94, JA 10,24, JB 9,74 ms; 60 fps |
| Lämpö | `kehysajat`-rivin `thermal` / `lampo` alussa ja lopussa | 0 tai 1 molemmissa | 0 / 0 |
| Käännösnykäykset | autopilotin TULOSRIVI (Pelikoodarin mittari) | ≤ 8 per reitti | 9 / 9 |
| Alkunykäykset, katot, musiikkikatkot, latauskuvan rajaukset | TULOSRIVI | 0 | 0 |
| Kamerahypyt, kääntyilyt, piilossa | TULOSRIVI | Pelikoodarin tunnetut tasot; kasvu kirjataan | 2/2, 2/3, 6/13 |
| Värinä (räystäs) | `proto-3d/_tyo/linssiseppa2/varina/varina-mittari.py` (tavallinen `python3`, tarvitsee numpyn) | vain luvut, ei silmäarviota | 0,14 / 0,20 / 0,26 % ruudusta |
| Loppukortti pystyssä | maalikuvat 1–24 | näkyy ≥ 20 s | kuvat 9–24 |
| Kylmäkäynnistykset | `kylma-N.txt` | 0/5 kaatumista | 0/5 |
| Muisti | `muisti-tarkka.log` (`N <ms> fp <Mt> vapaa <Mt>`) | ei jetsameja, vapaata ≥ 0,5 Gt | 20.10.: huippu 3,1–3,6 Gt, vapaa ≥ 1,5 Gt |
| Terävyys (A/B-kuvapari) | `vyoero.py paalla pois` vyöhykkeittäin | ehto annetaan erässä | – |

- **Vaihtelu:** samojen ajojen ero on ±3–4 ms ajojärjestyksestä riippuen → vertaa vain samoilla jäädytyshetkillä (raskas
  kohta ~14 s juoksusta) ja samassa lämmössä; pienempi ero ei ole tulos.
- **Tauko ei ole nykäys:** sovelluksen tauko (resignActive) näkyy pitkinä ruutuina; ne suodatetaan TULOSRIVIn
  taukoruutuihin eikä niitä lasketa nykäyksiksi.
- `kehysajat`-rivi (`MATKAKIRJA kehysajat {…}`) kertoo myös p50/p95/p99, fps:n, virransäästön ja akun; kirjaa virransäästö
  pois ja akku, jos tulos poikkeaa.

### 3.4 Kylmäkäynnistys

Sovellus suljetaan, odotetaan ≥ 8 s ja käynnistetään uudelleen suoraan bash-silmukasta (`devicectl device process launch
--terminate-existing --console` → `kylma-N.txt`), ei taustaskriptistä. Askel `K/ajo-kylma-askel.zsh N <kansio>`: 25 s,
`uusi-peli 5 amsterdam` + 40 s, `ui konsoli pois`, `ui juoksupeli botti 1`, `ui juoksupeli v4`, odota lokiriviä
`avaus: OhjausPelaajalle` (enintään 120 s) + 12 s.

- **OK** = rivi `avaus: OhjausPelaajalle` löytyy eikä ennen sitä tullut `App terminated due to signal`. Muuten KAATUI tai
  EI PÄÄSSYT; tulos askelkohtaisesti ketjun lokiin.
- **Oikea runko:** `Built from` -rivi ja käännöksen tunniste konsolissa = mitattava runko.
- Viisi peräkkäin; yksikin kaatuminen on löydös.

### 3.5 Aineisto ja kuvat

- `proto-3d/_tyo/<rooli>/<aihe>/kierrosNN/`, `kierrosNN-maali/`, `kylma5-kierrosNN/`; vanhemmat ajot
  `proto-3d/lokit/laitetestaaja-*-ipad-<pvm>/` ja taulukko `RAPORTTI.md`.
- Kuvat täysikokoisina, kuvateksti omalle raidalleen (`docs/raportit/laitetestaaja-pelaaja-tyokalut-20261012/merkitse.py`);
  maali- ja latauskuvista kontaktiarkki vain apuagentille (9.6), omistajalle täysikokoiset.
- Fyysisestä iPadista ei saa näyttötallennetta ilman kaappauslaitetta: `kuva`-sarja (32 kuvaa / 16 s) + ffmpeg
  `-framerate 2`.
- Yöjunan kierroksen tarkistuslista: `docs/raportit/laitekierros-tarkistuslista-pohja.md` (perusrutiini P1–P7, NS:n
  muutosloki rivi riviltä, omistajan palautteet, regressio, löydökset, yksi VIHREÄ/PUNAINEN-rivi PT:lle).

## 4. Tyypilliset virheet

- **"0 pitkää ruutua" ilman yhteenvetoja** ei todista mitään → `Nykaysvahti.cs`:n yhteenvetorivit ja tulos EI TODISTETTU.
- **Kuorma-ajo fps-todisteena** → KUORMA-rivi vaatii uusinnan kevyellä kuormalla; kuorma-ajo todistaa vain toiminnan.
- **`oleta` toistuvalle riville** (tyrmä 2/3) löytää vanhan rivin → `oleta-uusi`.
- **Uusi lokimuoto ilman jäsennystä:** pelaava botti kirjoitti `botti: pelaa …`, raportti odotti `botti: osa` ja näytti
  "ei yhteenvetoa", vaikka ajo oli 3/3 LÄPI → jäsennys ja testi samaan erään.
- **Tuontitarkistus väärälle kansiolle:** Clauden `_valmiit/*-vienti-*`-paketit (KTX2, Draco) eivät ole Codexin toimituksia
  (346 väärää hylkäystä); porttia ei löysätä, vaan väärät kansiot ohitetaan. Codexin viitekuva tiivisteellä = HUOM, ei puute.
- **Simun video kuormassa:** aukko ja taaksepäin hyppäävä aikaleima katkaisee `-c:v copy`:n → koodaa uudelleen
  (`h264_videotoolbox`); iPad-tallenne on pystyssä (`-display_rotation` / `transpose=1`). Simun video on mykkä: ääni
  `aani N nimi` -askeleella ja yhdistys ffmpegillä; ääniraita todennetaan ffprobella.
- **Käynnistysruutu simussa:** `simctl uninstall` + `install` ei tyhjennä välimuistia (bundle-id ja CFBundleVersion samat)
  → vanha kuva näkyy, vaikka korjaus on oikein.
- **iPadin ajo keskeytyy:** konsoliprosessin tappaminen ennen mittausten loppua päättää myös sovelluksen; `ui-komento.txt`
  ylikirjoittuu, jos kirjoitusväli on alle 2,5 s; `ui juoksupeli jaady 1` ei jäädytä (oikea: `ui juoksupeli valo jaady 1`).
- **Konsoli ei kiinnity (CoreDeviceError 10002):** käynnistys skriptistä heti asennuksen tai `pkill`in jälkeen → käynnistä
  suoraan bashista, odota ≥ 8 s ja yritä uudelleen; tarkista `Built from` -rivi ennen askelta.
- **`pkill -f "device process launch"` tappaa oman komennon,** jos kuvio on samalla komentorivillä → pid-kill erillisessä
  kutsussa.
- **`signal 15` kylmäkäynnistyslokin lopussa** on seuraavan käynnistyksen `--terminate-existing`, ei kaatuminen; ratkaisee
  askeleen tulosrivi (OK/KAATUI), ei lokin viimeinen rivi.
- **Värinämittari `python3 -I`:llä** ei löydä numpya (`ModuleNotFoundError`) ja `varina-tulos.txt` jää tyhjäksi → tavallinen
  `python3`; tarkista tiedosto ennen tulosriviä.
- **Toinen ajo samalla iPadilla** (NS, PK) keskeyttää ketjun → VAPAA/OTTO ensin.
- **Sovelluksen tauko laskettuna nykäyksiksi** → resignActive-ruudut taukoruutuihin.
- **Omistajan peli suljettu:** `--terminate-existing` sulkee omistajan auki olevan pelin → tarkista prosessi ensin (luku 3).
- **JS-regex `\w`** ei osu ä- ja ö-kirjaimiin testeissä → `\S` tai u-lippu.
- **Rinnakkaisten PR:ien yhteinen lista** ("vain lyhenee") kaataa CI:n mergejärjestyksestä riippuen → valmis kohde tulostaa
  HUOM eikä kaada.

## 5. Opit

- 21.10.2026: ensimmäinen versio.
- 21.10.2026 ilta: luku 3 Laitetestaajan kanssa kierrosten 33–34 (TF 209) mallilla; kierroksen skriptit (`ajo-ketju34.sh`,
  `ajo-kierros-yo30.zsh`, `ajo-maali-yo34.zsh`, `ajo-kylma-askel.zsh`) repoon samaan kansioon kuin aiemmat.
