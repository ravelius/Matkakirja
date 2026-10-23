# B Tekotavat: julkaisu

*(Julkaisija 23.10.2026, studiojako Raamattu 4.21; natiivikäännöksen ja muistiajon osuuden (luku 3) kirjoittaa Natiiviseppä.
Lähteet: Raamattu luku 10 (10.1, 10.2, 10.5, 10.6, 10.8, 10.9, 10.11, 10.14) ja 11.26, `docs/roolitus.md` "Julkaisusäännöt",
TF 209:n ketju 21.10.2026. Luvat, portit ja se, milloin junat lukitaan ja TestFlight ajetaan: D tuotannonohjaus. Tässä on
vain käytäntö: työkalut, komennot, järjestys ja tyypilliset virheet. `JT/` = `/Users/Shared/Claude/julkaisija-tyokalut/`.)*

## 1. Työkalut

| Osa | Missä | Mihin |
|---|---|---|
| Versionosto (web) | `node tools/uusi-versio.mjs "Muutoslokirivi"` | Seuraava vapaa vNNN atomisesti (fetchaa mainin); viimeisenä ennen buildia |
| Kaava | `node --test tests/*.test.mjs`, `node tools/tarkista-kaksoisavaimet.mjs`, `node tools/build-standalone.mjs` | Testit, avaintuplat, yhden tiedoston versio (dist/ ei committoida) |
| CI | `.github/workflows/testit.yml` (PR + main), `savukkeet.yml` (julkaisusarja `tools/savukkeet/sarjat.json`) | Testit-tarkistus vihreä ennen mergeä; pelkät docs/md ja `muutosloki-natiivi.json` ohittavat (paths-ignore) |
| Web-julkaisu | `pages.yml` (push mainiin) | GitHub Pages; yksi julkaisu kerrallaan, kesken olevaa ei peruta (~15 min) |
| Sisältövienti | `vie-sisalto.yml` (push mainiin: js, css, assets, tools/vienti, asetukset) | Sama commit → `sisalto/1/v<N>/` ämpäriin + osoitin natiiville; `palauta=N` palauttaa osoittimen |
| Merget | `zsh JT/odota-ja-mergea.zsh <PR>`, `JT/mergaa.sh <PR> "<otsikko>" [<head-SHA>]` | Odottaa nykyisen kärjen tarkistukset ja squash-mergeää vihreänä; punainen → lopettaa mergeämättä |
| Sisältöjuna (web) | `JT/juna.sh "<rivi ≤ 60>" <PR> [<PR>…]` | Sisältö-PR:t yhdeksi PR:ksi yhdellä versionostolla; datan rinnakkaislisäykset `yhdista-lisaykset.py` |
| Natiivin muutosloki | `node tools/vienti/muutosloki-natiivi.mjs --versio "1.1 (N)" --teksti "…"` | "Mitä uutta" -rivi `tools/vienti/muutosloki-natiivi.json`:iin, ≤ 280 merkkiä |
| TF-vienti | `zsh JT/tf-kaynnista.sh <N> <proto-master-SHA> <muutosloki-merge-SHA>` | `proto3d-testflight.yml` + irrotettu ketju `JT/tf<N>.sh` (pohja `tf-ketju-pohja.sh`) → `JT/tf<N>-ketju.log` |
| TF-odottaja | malli `JT/tf209-odota-muistiajo.zsh` | Odottaa NS:n `muistiajo-<N>.txt`:n ja käynnistää `tf-kaynnista.sh`:n vain oikealla SHA:lla |
| Ämpärivienti | `JT/vie-paketti.sh [--kuiva] [--osa=I/N] /Users/Shared/Claude/proto-3d/_valmiit/<nimi>-vienti-<pvm>` | Paketti samoille poluille; ei ylikirjoita; todentaa julkisen URLin |
| Osoitinvaihto | `zsh JT/vaihda-osoitin.zsh <paketti> <polku/uusin.json>` | `uusin*.json` vasta, kun paketin kohteet ovat 200 CDN:ssä |
| CDN-tarkistus | `zsh JT/tarkista-cdn.zsh <paketti> [max]` | Otos SHA256SUMS:sta: HTTP 200 + SHA `media.matkakirja.app`:sta |
| Vuorot ja vahdit | `zsh JT/lukkovahti.zsh` (Monitorina), `zsh JT/valoseppa-vahti-kaynnista.zsh` | Käännöslinjojen 1 ja 2 lukot; Valosepän haarojen automaattikäännökset |
| Jonoloki | `JT/tf-jono-20261002.txt` (`tail -60`) | Jokainen vuoro, käännös, TF-vaihe ja luovutus aikaleimalla (`date` ensin) |

## 2. Vaiheet (käytännössä)

### 2.1 PR ja merge (web)

1. **Yksi kokonaisuus per PR**, squash-merge; koodimuutoksessa otsikkoon `(vNNN)`. Pelkkä docs ei nosta versiota.
2. **Kaava ennen pushia:** `uusi-versio.mjs` viimeisenä, sitten testit, kaksoisavaimet ja build. Lue `# pass`- ja `# fail`
   -rivit, älä katkaistua häntää.
3. **Merge:** `odota-ja-mergea.zsh <PR>`; docs-PR (ei tarkistuksia) mergeään suoraan, kun MERGEABLE. Ennen isoa mergeerää
   katso `gh pr list --state open`: luonnokset, omistajan hyväksyntää odottavat ja CLAUDE.md-muutokset jätetään.
4. **Versiokonflikti:** `js/main.js`, `sw.js` ja `js/muutokset.js` – omasta haarasta vain APP_VERSION-rivi, muu mainista;
   build-standalone ajetaan aina mergen jälkeen uudelleen.
5. **Mergen jälkeen:** oma haara mainiin (`git checkout -B <haara> origin/main` + force-with-lease; estetty → push
   `HEAD:refs/heads/<haara>-2` ja uusi PR), PR-palkki pois (`unbind_pr`), worktree `tools/uusi-worktree.sh --poista <rooli>-<aihe>`.
6. **Tarkistus mainista**, kun PR sulkeutuu toisen session kautta: `git grep -q "<tunniste>" origin/main` tai
   `git cat-file -e origin/main:<tiedosto>`.

### 2.2 Juna

1. **Yksi avoin juna** (`juna/b<N>`, natiivirunko Natiivisepällä): kaikki kuitattu kerätään siihen; keskeneräinen ei pidätä.
2. **Junaan menevässä koodi-PR:ssä ei omaa versionostoa** (juna nostaa); junaan otettuun haaraan ei enää pushata.
3. **Master junaan vasta sisällön kanssa:** jokainen uusi juna-commit käynnistää junavahdin käännöksen ja laiteasennukset.
4. **Käännösvuorot:** käännös tai simuajo alkaa vasta Julkaisijan viestistä `KÄÄNNÖS NYT` / `SIMULAATTORI NYT` (UDID:t
   nimetty). Linja 1 = juna, TF ja vahdit; linja 2 = roolien testikäännökset (`PROTO_LINJA=2`). Pyytäjä ajaa ensin proton
   `tyokalut/tarkista.sh` → "virheitä yhteensä 0". Lukko `/tmp/matkakirja-kaannospalvelu[-2].lukko/kuka`.
5. **Asemataulu:** jokainen junan ja TF:n vaihe talo/eteneminen-valoihin heti; `SISÄINEN` → rivi PT:lle ja KK:lle.

### 2.3 TestFlight-vienti

Järjestys on aina sama; TF 209 (21.10.2026) on malli.

1. **Pyyntö:** vain merkinnällä "OMISTAJA PYYSI JULKAISUA" (D). NS lukitsee junan ja mergeää proto-masteriin → BUILD-SHA
   PT:lle ja Julkaisijalle.
2. **Muutosloki ensin:** NS kirjoittaa, PT tarkistaa, Julkaisija ajaa `muutosloki-natiivi.mjs` ja mergeää PR:n mainiin
   (docs-pikatie, ei CI:tä). Yli 280 merkin teksti tiivistetään; tiivistys kerrotaan PT:lle.
3. **Sisältövienti valmis:** `Vie sisältöpaketti ämpäriin` -ajo successina commitille, joka sisältää muutoslokin (ketju
   tarkistaa tämän itse `merge-base --is-ancestor`illa ennen ulkoista ryhmää).
4. **Muistiportti:** NS:n tarkistusajo kirjoittaa `JT/muistiajo-<N>.txt` (1. rivi `OK <laite-SHA> <vapaa Gt> <ajaja>`,
   `EI-MUISTILISAYSTA <peruste>` tai `OHITETTU <peruste>`). Alle 0,5 Gt vapaata tai puuttuva tiedosto → ei käynnistetä.
5. **Käynnistys:** odottaja mallista `tf209-odota-muistiajo.zsh` (sed: build-numero, BUILD-SHA, M, `muistiajo-<N>.txt`) →
   `tf-kaynnista.sh <N> <BUILD-SHA> <M>`. Se ajaa `proto3d-testflight.yml` (`versio=1.1`, `ordinaali=N`,
   `build_numero=N`, `vie_unitysta=true`) ja irrottaa ketjun. Unity kiinni viennin ajan.
6. **Ketju (`tf<N>-ketju.log`):** TF-ajo success ja askel "Lähetä TestFlightiin" success → `testflight-sisainen.yml` →
   beta-arvio (`testflight-ulkoinen.yml vain_arvio=true`) → vienti ⊇ muutosloki → ulkoinen ryhmä → arvio APPROVED
   (uusinta 15 min välein, REJECTED pysäyttää) → `vanhenna_vanhemmat=N`. Lippu `JT/tf<N>-ei-ulkoista` tai
   `JT/ulkoinen-kielletty` katkaisee ketjun sisäiseen.
7. **Mac-TF** ajaa Natiiviseppä (`proto3d-mac-testflight.yml`); vanhempi Mac-build vanhennetaan samalla tavalla.
8. **Kuittaus:** rivi jonolokiin ja Asemataululle, PT:lle ja KK:lle (iOS-ajo, sisäinen/ulkoinen-aika, beta-arvio, BUILD-SHA,
   muutosloki-PR). Seuraava juna auki.

### 2.4 Sisältö ämpäriin

1. **Vain paketteina:** tekijä kokoaa `/Users/Shared/Claude/proto-3d/_valmiit/<nimi>-vienti-<pvm>/`: ämpäripolut +
   `SHA256SUMS` (manifest.json aina viimeiselle riville) + `LAHTEET.md` lisenssiriveineen (ei SHA256SUMS:iin, ei LUE.md:tä).
2. **Tekijä ajaa `vie-paketti.sh --kuiva`** → "tarkistukset ok"; Julkaisija ajaa varsinaisen viennin yksinään (ei ketjuja,
   jotta sallintasääntö osuu). Mallit läpäisevät `omat_mallit_ktx2.py --portti`, äänet `aaniportti.py`:n.
3. **Osoitin viimeisenä:** `vaihda-osoitin.zsh`, kun kohteet ovat 200 CDN:ssä; ei kesken simu- tai iPad-ajoa.
4. **Todennus:** `tarkista-cdn.zsh <paketti>`; pelissä puhtaalla asennuksella tuotannon osoittimen kautta, ei paikallista peiliä.

## 3. Natiivikäännös ja muistiajo (Natiiviseppä)

*(Natiiviseppä täydentää: junan rungon käännös linjalla 1, `kopioi-juna-app.sh`, Release-laitekäännös, muistiajo isolla
iPadilla ja `muistiajo-<N>.txt`, lukitus ja BUILD-merge, Mac-TF.)*

## 4. Tyypilliset virheet

- **Lähetetty paketti muutettu:** kun paketti on mainittu PT:lle tai Julkaisijalle, korjaus on uusi tiedostonimi ja uusi
  vientikansio (`-b`), ei muutos paikallaan.
- **CDN muistaa 404:n (~4 h):** julkisen URLin haku ennen vientiä myrkyttää reunan (cf-cache-status HIT). Tarkista
  olemassaolo `aws s3 ls` -komennolla, todenna `?t=$(date +%s)`; myrkytetty polku korvataan uudella polulla (v5 → v5b).
- **Suora `aws s3 cp`** ohittaa tarkistukset → aina `vie-paketti.sh`.
- **TF ennen muutoslokia:** käsivienti hylätään, jos rivi puuttuu; merge rivi ensin ja sama `ordinaali`.
- **Muistiajon SHA eri kuin BUILD:** odottaja ei käynnistä (exit 3) → pyydä NS:ltä uusi ajo oikealla rungolla.
- **Ketju kansion ulkopuolella:** `gh` vaatii repokansion (`cd /Users/Shared/Claude/Matkakirja-julkaisija || exit 2`), ja
  skriptin polku luetaan ennen `cd`:tä (`${0:A}`), muuten build-numero jää tyhjäksi (TF 206: 16 turhaa ajoa).
- **"Lähetä TestFlightiin" ohitettu** vaikka ajo on success → ketju tarkistaa askeleen erikseen; syy lokin `OHITETTU:`-rivillä.
- **Push mittausikkunassa:** push mainiin käynnistää Mac-jobin samalla koneella → commit paikallisesti, push mittauksen jälkeen.
- **Tyhjä junamerge** kääntää ja asentaa turhaan → master junaan vasta sisällön kanssa.
- **Vanha .app VIKA-mergen jälkeen:** kopioi vain, kun lokin viimeinen rivi on `KÄÄNNETTY <x> <oma SHA>`.
- **Rinnakkaiset web-mergeet:** Pages-julkaisua ei peruta, ja GitHub pitää jonossa vain uusimman → tuotanto etenee, mutta
  välissä olevat versioita ei julkaista erikseen. Älä aja `uusi-versio.mjs`:ää uudelleen ilman tarvetta.
- **Taukolippu unohtui:** vahdin `/tmp/matkakirja-valovahti-tauko` jää pysäytyksestä → poista käynnistyksen yhteydessä,
  muuten vahti näyttää käynnissä olevalta mutta ei käännä.
- **Pakkopush estetty** → `<haara>-2` ja PR, joka mainitsee korvaavansa vanhan.

## 5. Opit

- 23.10.2026: ensimmäinen versio (web, PR:t ja merget, juna, TF-vienti TF 209:n mallilla, ämpärivienti). Luku 3 Natiivisepältä.
