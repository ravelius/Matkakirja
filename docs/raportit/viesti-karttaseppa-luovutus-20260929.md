# Karttasepän luovutus 29.9.2026 klo 12.3x, päivitetty 16.1x (sessio 17 → 18, tilinvaihto)

- **Rooli-worktree:** `/Users/Shared/Claude/Matkakirja-karttaseppa`, haara `karttaseppa-tyo-20260922`
  (tätä haaraa ei mergetä).
- **Commitit:** `git -c user.name=ravelius -c user.email=sami@valokuvaamoklik.fi`.
- **Työtapa (omistaja 28.9. 23.3x):** rajatut erät annetaan Sonnet-ali-agentille (Agent, model sonnet, effort
  high/max). Rooli todentaa ja julkaisee. Viennit vaativat aina omistajan luvan tähän sessioon.

## KÄYNNISSÄ: JOKIPOLTTO `pyramidi-poltto/ajo-20260930/` (omistaja kortilla "Aloita poltto" 29.9.)

- **Mitä poltetaan:** GEOGLOWS-joet (`--joet-lisa pyramidi-poltto/joet-2026-09-29/iso`) sekä pohjaan että
  viivatasolle.
  - Uudet versiot: `2026-09-30-pohja`, `2026-09-30-viivat` ja `2026-09-30-ranta`.
  - Muuten sama kuin 27-pohja: resepti 2026-09-26, gshhs-data-j27b, järvi-, matala- ja pinta-liput, merireittien
    maaosuus.
  - VIE=0, eli vain levylle.
- **Koodi:** `wt/karttaseppa-poltto-20260930` (HEAD 43bc8c152, ei pushattu, paikallinen merge) = main + #3574 (pallon
  päivämääräraja) + #3613 (koodi 1) + #3614 (joet-lisa ja MultiLineString). Worktreetä EI saa poistaa polton aikana; node_modules on symlinkki
  Matkakirja-fableen.
- **Ketju** `ketju.sh` ajetaan polttovahti v5f:n alla (`pyramidi-poltto/polttovahti-v5f.sh`, katto 16, MIN 4,
  nice 15, kevyt-lippu → taskpolicy -b):
  1. `aja.sh` vaihe 1: pohja z0–z8 + ranta + viivat. Loki `1.log`, merkki `1.valmis`.
  2. `aja.sh` vaihe 2: syvä z9–z10 T7:lle. `syva` on symlinkki kohteeseen
     `/Volumes/T7 4TB/Matkakirja-karttaseppa/ajo-20260930-syva`. Loki `2.log`, merkki `2.valmis`.
  3. `pallo/aja-pallo.sh`:
     - Z0–Z9 48 osaa
     - Z10 kaupungit, 16 osaa (sisältää 613 rannikkolaattaa)
     - Z10 koko maailma `--vain-z10`, 64 osaa
     - `laatat.json`
     - Loki `pallo/aja.out`. Odotus 565 260 laattaa.
- **Seuranta:**
  - `aja.out`: vaiheet "1 koodi N", "2 koodi N", "KETJU VALMIS" tai "PALLO VIRHE".
  - `vahti.out`: ytimet ja tauot.
  - Kesto 27.9.:n perusteella: vaihe 1 noin 4 h, vaihe 2 noin 7 h 4–16 ytimellä, pallo noin 3–9 h.
- **Jos koodi 1:** tarkista `1.log`/`2.log`:n lopusta eheys. Kanna-luettelokentat (#3521) on nyt mainissa, joten
  varitasovartion ei pitäisi laueta. Jos vaihe katkeaa, aja `ketju.sh` uudelleen vahdin alla: valmiit shardit ja
  osat ohitetaan (`OMAKSU`, ks. v5e-ohje edellisessä luovutuksessa).
- **Tunnettu ansa:** älä muokkaa käynnissä olevaa skriptiä (`python open('w')` tai sed samaan inodeen). Zsh lukee
  sen kesken ajon, ja 28.9. vie.sh sai tästä parse errorin.

- **Tila 16.12:** vaihe 1: 83/144 shardia (59 %), vain 4 ydintä ajossa muiden kuorman vuoksi, arvio noin 18.2x.
  Sen jälkeen syvä noin 7–10 h ja pallo 3–9 h, eli valmis 30.9. aamupäivällä tai iltapäivällä. Taustavalvonta
  on päättynyt tämän session myötä. Uusi sessio: `tail -3 ajo-20260930/aja.out ajo-20260930/vahti.out` ja
  `grep '·' ajo-20260930/1.log | tail -1` (tai 2.log).

## AAMULLA (tarkistus ilman Karttaseppää onnistuu näin)

1. **Tarkistus:**
   - `aja.out`: "1 koodi 0", "2 koodi 0" ja "KETJU VALMIS".
   - `pallo/aja.out`: "PALLO VALMIS: 565260".
   - Eheys: `1.log` ja `2.log` "eheystarkistus: laattojen määrä täsmää".
2. **Kuvaparit omistajalle:** 27-pohja (tuotanto) vs. uusi.
   - Kaupungit: Wien, Rooma, Moskova, Rovaniemi + Tukholma, Berliini, Bukarest (z8 + z10).
   - Mallit: `pyramidi-poltto/joet-koe-20260929/kuvaparit/kuvaparit-c.mjs` ja `ajo-20260927y/kuvaparit/kuvaparit.mjs`.
     Vaihda sharp-polku `/Users/Shared/Claude/Matkakirja-fable/node_modules`:iin ja versiot 30-sarjaan.
3. **Vienti** (ERILLINEN omistajan lupa tähän sessioon): `ajo-20260927y/vie.sh` on 27-sarjaa varten. Tee kopio
   `ajo-20260930/vie.sh` ja korvaa 27 → 30. Vaiheet: laatat, pallo ja luettelo `koe/2026-09-30`
   (`luettelo-vienti` = `syva/luettelo/pyramidi.json` + lähteisiin rivi "Järvet: …", jos puuttuu).
4. **Tuotantoon:** kuten 27.
   - JS-PR `js/pallo.js` PALLO_LAATTAVERSIO `2026-09-30-pohja` + TUNNISTE `20260930` + `sw.js` (malli #3597), sitten
     Julkaisija ajaa `vaihda-pyramidi-osoitin.yml` sarjalla `2026-09-30`.
   - Natiivi: kerma p060 poltetaan uudesta pohjasta (malli `pyramidi-poltto/kerma-2026-09-27/aja.sh`, noin 2 min).
     Pohjan järvet ja rannat eivät muutu, mutta joet muuttuvat. Kerma ei riipu joista (R−B-maski), joten vanha
     27-p060 luultavasti kelpaa. Tarkista vertailukuvalla ennen päätöstä.

## Tänään tehty (28.–29.9.)

- **2026-09-27-pohja tuotannossa:** osoitin vaihdettu 29.9. klo 08.43, varmuuskopio `pyramidi-20260929-0843.json`.
  - Pallo `2026-09-27-pohja-20260927`: 565 260 laattaa, josta 613 Z10-täydennystä.
  - JS-PR #3597, v2392.
  - Tarkistus: 5 308 laattaa, 0 aukkoa.
- **Natiivi:**
  - kerma `2026-09-27-p060` viety (33 788 webp + 28 json)
  - joet `joet-2026-09-28` viety (Eurooppa korjattu)
  - Natiiviseppä ja Siirtoseppä vaihtavat (#3599, 1.0.43).
- **BMNG 12 kk** (`julisteet/pallo/bmng/<kk>/` Z0–Z7 + `data/bmng/<kk>-4096.jpg`, 21600 px:n lähteestä) viety.
  Julkaisijan `iss-pilvet` käyttää `?v=21600` (#3561).
- **Maapallon vuosi** `data/maapallon-vuosi/` (6 kerrosta × 12 kk + `kerrokset.json` max-age=300) viety. Datakoe ja
  skriptit ovat kansiossa `pyramidi-poltto/maapallon-vuosi-2024/`.
- **PR:t (tila 16.12):**
  - MERGED: #3521 (kanna-luettelokentat), #3522 (joet-suunta), #3550 (nice-oletus), #3551 (BMNG-työkalu),
    #3613 (koodi 1, CI-testikorjaus 797c81dac /tmp → mkdtemp), #3597 (27-pohja webiin)
  - AUKI Julkaisijan junassa: #3574 `karttaseppa-pallo-sauma` 757affad7 (pallon päivämääräraja) ja #3614
    `karttaseppa-joet-lisa2` a3d0a76b3 (joet-lisa pisteittäin, MultiLineString-ketjutus). Jokipoltto käyttää niitä
    paikallisesti. Ne on mergettävä ennen kuin jokipolton tuotantoon vievä JS-PR tehdään.
- **Siivous:** vanhat kokeilut on siirretty T7:lle (`Matkakirja-karttaseppa/pyramidi-poltto-arkisto`).
  `.metadata_never_index` on lisätty pyramidi-poltto- ja T7-kansioihin.

## Avoimet

- **Kartan löydökset:** Reinin raja, Ponzan piste, Tejon ja Juutinrauman maareitit ja Étang de Berre (kolmas lähde
  ja lisenssi avoinna).
- **Arkistointi NAS:lle:** `ajo-20260927y` (3,9 Gt) ja T7 `ajo-20260927y-syva` (16 Gt). Arkistoi 30-pohjan vaihdon
  jälkeen. Poiston ajaa omistaja.
- **Maapallon vuosi:** raaka-GeoTIFFit (2,3 Gt) siirretään T7:lle.
