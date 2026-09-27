# Karttasepän luovutus 28.9.2026 klo 00.0x (sessio 16 → 17, tilinvaihto)

- **Rooli-worktree:** `/Users/Shared/Claude/Matkakirja-karttaseppa`, haara `karttaseppa-tyo-20260922`
  (tätä haaraa ei mergetä).
- **Commitit:** `git -c user.name=ravelius -c user.email=sami@valokuvaamoklik.fi`.
- **Edellinen luovutus:** `viesti-karttaseppa-luovutus-20260927-c.md`. Sen kohdat AAMULLA 1–5 ovat yhä
  voimassa, ja tämä tiedosto täydentää niitä.

## YÖPOLTTO KÄYNNISSÄ (omistaja 23.58: "kaikki muu tauolle, yöpoltto jatkuu")

- **Ajo:** `/Users/Shared/Claude/pyramidi-poltto/ajo-20260927y/`.
  - `aja.sh`, VIE=0 eli `--ei-vie`, vain levylle.
  - Vaihe 1: pohja z0–z8 + ranta + viivat. Klo 23.58 tila 105/144 shardia, 74 %, arvio noin 00.25.
  - Vaihe 2: syvä z9–z10, 298 335 z10-laattaa.
- **Syvä T7:lle:** `ajo-20260927y/syva` on symlinkki →
  `/Volumes/T7 4TB/Matkakirja-karttaseppa/ajo-20260927y-syva`, koska sisäinen levy on 74 GiB.
  - Pallon kokoaminen ja vienti lukevat syvän sieltä.
  - Jos T7 irtoaa, vaihe 2 kaatuu. Liitä T7 ja käynnistä vahti uudelleen; valmiit osat ohitetaan.
- **Polttovahti v5e,** `pyramidi-poltto/polttovahti-v5e.sh`, PID 85590 (nohup). Loki `ajo-20260927y/vahti.out`.
  - **Julkaisulippu `/tmp/matkakirja-julkaisu`** (omistaja 22.0x):
    - J1: lippu olemassa → 2 ydintä
    - J2: lippu ja muistipaine ≥ 2 → tauko
    - J3: yli 90 min vanha lippu poistetaan
    - Käyttöohje on lähetetty Julkaisijalle ja Natiivisepälle.
  - **Tauot SIGSTOP/SIGCONT, ei killiä** (Fable 22.1x). Kill vain, jos levyä on alle 20 Gt.
    - Levytauko alkaa alle 40 GiB:n ja jatkuu ≥ 45 GiB:ssa (Fable 22.2x).
    - Muu tauko: muistipaine critical (4) tai free < 10 %.
  - **Sääntö 1:** vain käännösprosessien CPU > 100 % 2 min ajan (Unity, il2cpp, xcodebuild, clang,
    swift-frontend, ld) tai > 2 simulaattoria → 4 ydintä. Pelkkä auki oleva Unity-editori ei rajoita.
  - `OMAKSU=<pgid>` ottaa käynnissä olevan polton valvontaan, joten vahdin voi vaihtaa katkaisematta:
    lopeta vanha vahti `kill -TERM <vahti>` ja käynnistä uusi `OMAKSU=<polton pgid> nohup zsh polttovahti-v5e.sh
    $U $U/aja.sh 16 $U/aja.out >> $U/vahti.out 2>&1 &`. Polton pgid on `zsh …/aja.sh` -prosessin pid.
    Tarkista ennen kill-komentoa, että grep ei osu itse vahtiin.
  - **Varoitus:** v5c:n vanha kill-sääntö katkaisi polton klo 22.05, ja keskeneräiset shardit menivät
    hukkaan. Uudelleenkäynnistys tapahtui klo 22.19, ja valmiit shardit ohitettiin.
- **Yötauko:** Julkaisija ja Fable pitävät savukkeet, CI:n ja käännökset tauolla, kunnes Karttaseppä ilmoittaa
  polton valmiiksi. ILMOITA Julkaisijalle ja Fablelle heti, kun `aja.out` näyttää "2 koodi 0".
- **Levy klo 23.58:** 74 GiB. Levyä syövät swap (36 Gt) ja muiden käännökset, poltto ei.

## AAMULLA: KORTTI FABLELLE, OMISTAJA HYVÄKSYY

Toimi kuten luovutuksen `-c` kohdat 1–5, ja lisäksi:

1. **Tarkistus:**
   - `aja.out`: "1 koodi 0" ja "2 koodi 0".
   - Eheys `1.log`:n ja `2.log`:n lopusta.
   - Laatat kansioissa `pohja/` ja `syva/` (T7).
2. **Kortin sisältö:**
   - Kuvaparit ennen/jälkeen: tuotanto 2026-09-26s-pohja vs. uusi 2026-09-27-pohja. Kaupungit Tukholma, Rooma,
     Oslo, Berliini, Riika, Bukarest, Lontoo ja Amsterdam. Kulma ja versio kuvaan, rajaus ≥ 300 px
     (muistio `kuviin-kulma-ja-versio`).
   - Laattamäärät tasoittain ja levykoko.
   - Vientikomennot: pohja z0–z10 + ranta + viivat uusiin polkuihin, pallo Z0–Z9 + Z10 uuteen sarjaan
     `2026-09-27-pohja-20260927`, sitten osoitin. Varmuuskopio ennen vaihtoa, palautus kuten 27.9.
   - **Vienti vaatii omistajan hyväksynnän TÄHÄN sessioon.** Luokitin esti sen ("Production Deploy"),
     ja vertaisen hyväksyntä ei riitä.
3. **Pallo** kootaan uudesta pohjasta (noin 2 h + Z10 noin 1 h). Natiivin sarjanimen muutos kysytään
   Siirtosepältä ja Natiivisepältä.

## Tämän session tulokset

- **Jokien tuplaviivan JUURISYY löytyi ja on korjattu:**
  - GEOGLOWS/TDX-Hydro digitoi pätkät alavirrasta ylävirtaan (vpu 207: 3 946/3 946).
  - `tools/tee-joet.mjs` `ketjuta` liitti ne kääntämättä, joten ketju hyppäsi joka pätkän yli ja palasi.
  - Korjaus: `suunnattu()` + testi. vpu 207: pituus 382 → 172, hyppyjä 1 847 → 20.
  - Haara `karttaseppa-joet-suunta`, commit 7337cc728, worktree `/Users/Shared/Claude/wt/karttaseppa-joet-suunta`.
    Testit 4 489 pass / 0 fail.
  - **EI PUSHATTU** (ei PR-CI:tä polton aikana). Push + PR polton jälkeen Julkaisijan junaan.
  - Jatkotyöt:
    - `pyramidi-poltto/joet-eurooppa-20260927/iso` tehdään uudelleen korjatulla työkalulla (gpkg:t
      `aws s3 cp --no-sign-request s3://geoglows-v2/hydrography/vpu=<n>/streams_<n>.gpkg`, 130–860 Mt/kpl).
    - **Natiivin pallon joet-vektorit** (`julisteet/pallo/vektorit/joet-<pvm>/`) on tehty samalla
      työkalulla, joten ne ovat todennäköisesti yhtä rikki. Kerro Fablelle ja Natiivisepälle.
- **NAS ajo-20260921:** todennettu, ilman `._`-tiedostoja 318 034 = 318 034, 0 puuttuu. Poistokomento on annettu
  Fablelle: `rm -rf /Users/samireivinen/pyramidi-poltto/ajo-20260921`. Omistaja ajaa sen, itse et poista.
- **Tuotannon tarkistus 21.5x** (Fablen pyynnöstä, TF 1.0.32 näytti pergamenttia):
  - Osoitin on muuttumaton (06:47 UTC).
  - Kreikan z6/z8/z10- ja pallolaatat vastaavat 200.
  - Vika ei ole ämpärissä.
- **iPadin pergamenttisuorakaiteet:** analyysi lähetettiin Pelikoodarille. Virheen jälkeen laatta jäi tyhjäksi
  ilman uusintaa (`js/laattapyramidi.js` valmis(false)). Korjaus on Pelikoodarin PR #3516.
- **27 pientä löydöstä:** suurin osa korjautuu tämän yön poltossa (järvet, Oslon saaret, pintatasoitus,
  merireitit), joten tarkista ne uusista laatoista aamulla. Jäljelle jäävät:
  - Reinin raja
  - joet (Tonava, Tiber, Moskva, Kemijoki): jokikorjaus + uusi aineisto
  - Ponzan piste
  - maareitit veden yli (Tejo, Juutinrauma), todennäköisesti tarkoituksellisia

## Avoimet (edellisestä)

- Étang de Berre tarvitsee kolmannen lähteen (lisenssi tarkistettava).
- Levyllä olevat kokeilut: `pyramidi-poltto/eurooppa-laatu-20260927/`, `gshhs-data-j27` (vanha) ja
  scratchpadin `streams_207.gpkg`.
