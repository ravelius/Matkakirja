# B Tekotavat: testaus

*(Projektiseppä 21.10.2026, studiojako Raamattu 4.21; laitemittaukset täydentää Laitetestaaja TF 209:n jälkeen. Lähteet:
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

*Laitetestaaja täydentää tämän luvun TF 209:n mittauksen jälkeen (kierroksen kulku, kylmäkäynnistykset, rajat).*

- **Laitteet:** iPad Pro 13 M1 (`00008103-001819421413401E`, heikoin muisti, ensisijainen) ja iPhone-simulaattori. Iso iPad
  on roolien käytössä aina; ennen asennusta katso, onko laitteella auki Matkakirja3D-prosessi, jota et itse käynnistänyt
  (`xcrun devicectl device info processes --device $U | grep Matkakirja3D`) → se on omistajan, älä sulje sitä.
  Lopuksi iPadiin palautetaan uusin runko. Omistajan iPhonea ei käytetä.
- **Käännös ja asennus:** Release-laitekäännös (Natiiviseppä, `natiiviseppa-skriptit/laite-release.sh`, bundle
  `fi.matkakirja.peli.kehitys`; TestFlight-appiin ei voi kirjoittaa komentoja); `xcrun devicectl device install app`.
- **Ohjaus:** komentotiedostot sovelluksen Documents-kansioon (`devicectl device copy to --domain-type appDataContainer`):
  `peli-komento.txt` (esim. `uusi-peli 5 amsterdam`), `ui-komento.txt` (≥ 2,5 s peräkkäisten kirjoitusten väliin),
  `komento.txt` (`mittaus alku <n>` / `mittaus loppu`, `kuva <n>` → 2048 × 2732 PNG), `muisti-tarkka.txt` (`1000`).
  Käynnistys `devicectl device process launch --terminate-existing --console` taustalle.
- **Kierros (yöjuna, 9.11):** pohja `docs/raportit/laitekierros-tarkistuslista-pohja.md`: perusrutiini P1–P7
  (käynnistys, jatka, uusi peli, vieritys, muisti 10 min, ääni, ⚙ asetukset), NS:n muutosloki rivi riviltä, omistajan
  palautteet (toista ensin vanha vika), regressio naapureista, löydökset ja yksi VIHREÄ/PUNAINEN-rivi PT:lle.
- **Mittarit:**
  - *Ruutuaika ja GPU:* `ui lasi mittaa N nimi` (konsolirivi "ruutuaika"), analyysi
    `python3 -I proto-3d/tyokalut/natiivi-ui-ajot/ruutuaika-analyysi.py nimi=mittaus.txt …` (p50/p95, yli 25 ja 100 ms:n ruudut).
    Kontrolliajojen vaihtelu on ±3 ms, joten pienempi ero ei ole tulos.
  - *Muisti:* `muisti-tarkka.log` (`N <ms> fp <Mt> vapaa <Mt>`); jetsam tai alle 0,5 Gt vapaata pysäyttää (9.4).
    Viimeisin taso 20.10.: huippu 3,1–3,6 Gt, pienin vapaa 1,5–2,0 Gt.
  - *Lämpö:* kirjaa laitteen lämpötila (0 = normaali) jokaiseen ajoon; vertaa vain samassa lämmössä ajettuja.
  - *Terävyys:* `vyoero.py paalla pois` vyöhykkeittäin, ei silmäarviota.
- **Kylmäkäynnistys:** sovellus suljettu ja käynnistetty uudelleen (ei taustalta palaava). Ensimmäinen käynnistys uudella
  asennuksella raskaassa kuormassa voi epäonnistua ("ei vastausta") → uusinta ennen kuin se kirjataan viaksi.
  Käynnistysruudun todiste simussa uudella bundle-id:llä tai nostetulla CFBundleVersionilla (välimuisti, luku 5).
- **Aineisto:** `proto-3d/lokit/laitetestaaja-*-ipad-<pvm>/`, taulukko `RAPORTTI.md`; kuvat täysikokoisina, kuvateksti
  omalle raidalleen (`merkitse.py`). Fyysisestä iPadista ei saa näyttötallennetta ilman kaappauslaitetta: `kuva`-sarja
  (32 kuvaa / 16 s) + ffmpeg `-framerate 2`.

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
- **Omistajan peli suljettu:** `--terminate-existing` sulkee omistajan auki olevan pelin → tarkista prosessi ensin (luku 3).
- **JS-regex `\w`** ei osu ä- ja ö-kirjaimiin testeissä → `\S` tai u-lippu.
- **Rinnakkaisten PR:ien yhteinen lista** ("vain lyhenee") kaataa CI:n mergejärjestyksestä riippuen → valmis kohde tulostaa
  HUOM eikä kaada.

## 5. Opit

- 21.10.2026: ensimmäinen versio; Laitetestaaja täydentää luvun 3 TF 209:n jälkeen.
