# Luovutus: Siirtoseppä, 26.9.2026 klo 05.2x (päivitetty iltapäivällä)

Luovuttaja on Siirtoseppä (Opus). Postivahti pyysi luovutusta, koska viikkokiintiöstä oli käytetty 90 % ja tilinvaihto
lähestyy. Tämä korvaa luovutuksen `-20260925.md`. Sen opit ja 24.9.-b:n kohdat "Koepaketit" ja "Opetukset" ovat yhä
voimassa.

## Lue ensin

- CLAUDE.md sekä Raamatun Ydinajatus, kohta 2 "TYÖTAPA JA SESSIOT", ja "NATIIVI PELI ETUSIJALLE" (EI WEBISSÄ → KYSY,
  WEB ON MALLI, MITATTUNA).
- docs/raportit/elava-kartta-suunnitelma-20260926.md (Elävä kartta, omistajan päätös 26.9.) ja
  docs/raportit/paketin-taustapaivitys-suunnitelma-20260925.md (taustapäivitys, hyväksytty 25.9.).

## Tila (päivitetty 26.9. iltapäivä)

- Tuotanto 1.x **v169** (skeema **1.50**). Tämän vuoron julkaisut:

| Skeema/versio | PR | Sisältö |
|---|---|---|
| v162 | #3303 | natiivin offline-rasteri pohja 26 (build 20 TF:ssä) |
| 1.49 (v159) | #3307 (+ Sisältökirjurin #3309) | pikkukuva (https) maakuntasalaisuuksille (+ pikkukuvaLahde) ja luonnehdinnat-moduulin alueille; asset-perhe maakunnat |
| 1.50 (v167) | #3317 | aanitaulut laji musiikkiaihe (14) ja musiikkiketju.maanosa |
| v169 | #3320 (+ Karttasepän #3321) | NIMETYT_LISATIEDOSTOT: assets/data/lippu-lonlat.json → kartta/lippu_lonlat.json (138 maata), ei skeemamuutosta |

- **Junassa:** #3327 tilannekuva.mjs 15 tiedostoa (14,2 Mt, Natiiviseppä kuitannut). Worktree wt/siirtoseppa-tilannekuva-kylma, poista mergen jälkeen.
- **Odottaa pyyntöä:** ISS-linssi (Linssiseppä): Actions-työnkulku CelesTrak ISS-TLE (NORAD 25544) 6 h välein ämpäriin data/iss-tle.json + sama tiedosto pakettiin (NIMETYT_LISATIEDOSTOT sopii).
- **Peruttu/ei tilattu:** offline-lataus pois simulaattorissa (Documents/offline oli tyhjä; levyn täyttäjät Build, DerivedData, git-pack, worktreet). Z9 satama- ym. kaupungeille (88/134 maata ilman Z9:ää, koska kaupunkitaso ottaa vain tyypin kaupunki).
- Taustapäivitys: siivouskorjaus build 19:ssä; seuraa edelleen laitetestiä.

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

- Opetus 26.9.: älä pushaa PR:n haaraan, kun Julkaisija on ilmoittanut ottavansa sen junaan (#3320:n head vaihtui kesken mergen). Kaksi PR:ää, jotka lisäävät saman tiedoston eri muotoilulla, konfliktoivat: data kuuluu tuottajan PR:ään.
- Opetus 26.9.: natiivi hakee Saapumistunnukset alueella, paketti antaa maanosan (vanhoissa buildeissa ita-eurooppa osuu).

0. Maakuntanimien suomennokset (Attika jne.) tulevat Sisältökirjurin #3297:stä (maakunnat-nimet.js ja
   maakuntarajat.json.gz samassa PR:ssä), eikä skeemaa muuteta. Ilmoita versio Natiivi-UI:lle, kun #3297 on tuotannossa.

1. `lisenssitarkistus.mjs` ei lue lisenssiä äänen nimestä, kun osoitteessa on `#voima=`-osa (neljä CC0-tehostetta ovat
   "tuntematon"). Korjaamatta.
2. Maakunta pisteestä: rannikon kohteet saavat lähimmän maakunnan ≤ 30 km (harvennettu raja). Strymonas-joki jää
   ilman maakuntaa.
3. Opetus: sisällön datamuutos voi lisätä kokoelmaan päätason kentän (#3162 monumentit.nimio), mikä vaatii
   skeemanoston. Aja sisältö-PR:n haarasta vienti ja sisaltopaketti-testit ennen kuin lupaat "ei skeemamuutosta".
4. Opetus: natiivin laiska välimuisti on polussa `persistentDataPath/sisalto/sisalto/1/vN` (Sisalto.Valimuisti).
