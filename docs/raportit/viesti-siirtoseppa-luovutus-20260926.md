# Luovutus: Siirtoseppä, 26.9.2026 klo 05.2x

Luovuttaja on Siirtoseppä (Opus). Postivahti pyysi luovutusta, koska viikkokiintiöstä oli käytetty 90 % ja tilinvaihto
lähestyy. Tämä korvaa luovutuksen `-20260925.md`. Sen opit ja 24.9.-b:n kohdat "Koepaketit" ja "Opetukset" ovat yhä
voimassa.

## Lue ensin

- CLAUDE.md sekä Raamatun Ydinajatus, kohta 2 "TYÖTAPA JA SESSIOT", ja "NATIIVI PELI ETUSIJALLE" (EI WEBISSÄ → KYSY,
  WEB ON MALLI, MITATTUNA).
- docs/raportit/elava-kartta-suunnitelma-20260926.md (Elävä kartta, omistajan päätös 26.9.) ja
  docs/raportit/paketin-taustapaivitys-suunnitelma-20260925.md (taustapäivitys, hyväksytty 25.9.).

## Tila

- **main = e8541dea3 (v2252).** Tuotanto 1.x **v144** (skeema **1.45**) ja 2.0 **v85**.
- Tässä vuorossa julkaistut:

| Skeema | PR | Sisältö |
|---|---|---|
| 1.40 | #3165 (juna #3168) | monumentit.nimio, kartan nimiöt ≤ 18 merkkiä (Sisältökirjurin #3162) |
| 1.41 | #3155 | offline-rasteri sarjasta 2026-09-25, z9 vain kaupunkien ympärillä |
| 1.42 | #3185, peruttu #3191, takaisin #3225 | maakuntarajat 138 maasta, juuren `maat`, lähde maakuntarajat.json.gz |
| 1.43 | #3237 | maakuntarajat.vari (webin väri-indeksi) |
| 1.44 | #3260 | karttavalot.laji (webin symLaji, löydös 125) |
| 1.45 | #3267 | Elävä kartta: karttavalot.kokoluokka, .maakunta (+Lahde), maakuntarajat.salaisuus |
| – | #3247 | taustapäivitys vaihe 1: hakemisto.json, osoittimen hakemisto/tavuja/siirto/tasoittain |
| – | #3246 | README: äänien lisenssit ilman CC BY-NC |
| – | #3192, #3200 | taustapäivityksen selvitys ja suunnitelma |

- **Natiivi:** taustapäivityksen vaihe 2 (proto-haara `siirtoseppa/paketti-paivitys` 99f049ec) on build 18 -junassa
  (juna/b13 99eaf8d9). Simulaattoriloki: `/Users/Shared/Claude/proto-3d/lokit/siirtoseppa-paketti-paivitys-20260926.txt`.

## Pushatut, julkaisemattomat PR:t (Julkaisijan jonossa, järjestyksessä)

1. **#3269 (1.46)** kokoelma `reitit1873` (Karttasepän #3266, 1368 riviä, CC0). Main v2251 on yhdistetty, ja Natiiviseppä
   on kuitannut. Worktree `wt/siirtoseppa-reitit1873`.
2. **#3285 (1.47)** kokoelma `maakuntasalaisuudet` (14 GRC). Oma kokoelma karttavalorivien sijaan, koska build 16/17
   piirtäisi karttavalorivit (Natiiviseppä). Natiiviseppä on kuitannut. Worktree `wt/siirtoseppa-salaisuudet`.
   Sisältökirjurin nimiöt (#3286) ovat jo mainissa, joten `nimio` täyttyy itsestään.

Julkaisija ilmoittaa jokaisen mergen, minkä jälkeen yhdistetään main seuraavaan: skeemariveistä pidetään haaran puoli,
**sw.js ja tools/build-standalone.mjs otetaan aina mainista** (`git checkout origin/main -- …`). Tarkista lopuksi
`git diff --name-only origin/main`, jotta mainista eroavat vain omat tiedostot.

## Kesken — tee nämä ensin

1. Pinon mergejen jälkeen: tuotannon ämpäritarkistus (`amparitarkistus.mjs --url …/sisalto/1/v<N>/`), sitten versio
   Natiivisepälle, Natiivi-UI:lle ja Pelikoodarille sekä rivi Fablelle.
2. Taustapäivitys, vaihe 3 (siivous) on jo vaiheen 2 koodissa. Seuraa build 18:n laitetestiä ja korjaa, jos Laitetestaaja
   löytää jotain.

## Voimassa olevat työtavat (tämän vuoron uudet)

- **Lisäysversio, joka kasvattaa kokoa tai kattavuutta = Natiivisepän kuittaus ennen tuotantoa** (Fable 25.9., 1.42:n
  palautus). Kysy myös, piirtääkö vanha build uudet rivit: uudet rivit olemassa olevaan kokoelmaan voivat näkyä
  vanhoissa buildeissa (1.47), joten uusi kokoelma on turvallisempi.
- **Palautus:** `gh workflow run vie-sisalto.yml --ref main -f palauta=N` ja peruutus-PR mainiin. Kun peruutus laskee
  skeemaversiota, osoitinvartija ei päästä peruutuksen vientiä läpi, joten sen jälkeen tarvitaan vielä
  `palauta=<peruutuksen versio>`.
- **Viestiraja:** SendMessage estyy noin 10 viestin jälkeen, kunnes omistaja kirjoittaa. Estoa EI kierretä muilla
  työkaluilla, vaan tila kirjataan PR-kommenttiin ja kerrotaan omistajalle.
- **Simulaattori:** oma `siirtoseppa-iPhone` F989814A. Pyydä vuoro Julkaisijalta, käynnistä vasta kun booted < 2, ja
  sammuta ajon jälkeen. proto-kaanna.sh:n Build-kansio vaihtuu seuraavasta käännöksestä, joten tarkista heti
  (`strings …/global-metadata.dat | grep <luokka>`) ja asenna itse.
- Omistajalle kuvat PNG-pysäytyskuvina laitteen ruutuun rajattuna (Fable 26.9.).

## Ympäristö

- Koepaketit: `/Users/Shared/Claude/sisalto-koe` v49–v51 ja `sisalto-koe-2` v11–v12 (vanhat siivottu 25.9.).
- Julkaisun koeajo: `node tools/vienti/julkaise-sisalto.mjs --ulos <scratch> --edellinen <uusin.json> --suurin <N>`.
- Kartta-testit (natiivi): `Kartta-testit/kaanna.sh PakettiPaatokset`, oikea paketti `PAKETTI_KOE=<versiokansio>`.

## Velat ja opetukset

1. `lisenssitarkistus.mjs` ei lue lisenssiä äänen nimestä, kun osoitteessa on `#voima=`-osa (neljä CC0-tehostetta ovat
   "tuntematon"). Korjaamatta.
2. Maakunta pisteestä: rannikon kohteet saavat lähimmän maakunnan ≤ 30 km (harvennettu raja). Strymonas-joki jää
   ilman maakuntaa.
3. Opetus: sisällön datamuutos voi lisätä kokoelmaan päätason kentän (#3162 monumentit.nimio), mikä vaatii
   skeemanoston. Aja sisältö-PR:n haarasta vienti ja sisaltopaketti-testit ennen kuin lupaat "ei skeemamuutosta".
4. Opetus: natiivin laiska välimuisti on polussa `persistentDataPath/sisalto/sisalto/1/vN` (Sisalto.Valimuisti).
