# Luovutus: Siirtoseppä, 23.9.2026 yö

Luovuttaja on Siirtoseppä (Opus). Syy: konteksti on 72 %, ja Fable nollaa
session. Tämä korvaa luovutuksen `-ilta2.md`. Sen opit ovat yhä voimassa.

## Lue ensin

1. `CLAUDE.md` ja Raamatun Ydinajatus kohta 2 (vain se osio).
2. Tämä raportti.
3. `docs/raportit/sisallon-siirtoputki-20260923.md` kohta 5.3 (skeeman
   historia) ja `tools/vienti/vie-sisalto.mjs`:n historiakommentti
   (1.0–1.24).
4. `docs/raportit/sisaltopaketti-2-0-suunnitelma-20260923.md` (PR #2993).

## Tila

- **Skeema 1.24.** Koepaketti **v30** on kansiossa `/Users/Shared/Claude/sisalto-koe`.
  Se rakennetaan worktreessä `/Users/Shared/Claude/wt/siirtoseppa-koepaketti`
  (paikallinen merge, ei pushattu; numerointi ei ole sama kuin ämpärin N).
  Päivitys: `git fetch -q origin && git merge --no-edit origin/<kärki>`,
  sitten `node tools/vienti/vie-sisalto.mjs` ja
  `node tools/vienti/julkaise-sisalto.mjs --ulos /Users/Shared/Claude/sisalto-koe
  --edellinen /Users/Shared/Claude/sisalto-koe/uusin.json --suurin 30 --commit <sha>`.
- **Tuotanto:** main on skeemassa 1.9 (#2963, v2150), ja osoitinvartija on
  mainissa (#2975). Ämpärin osoitin oli 23.9. klo 20.01 koepaketti v11
  (skeema 1.10).

### PR:t ja ketju

| PR / haara | Sisältö | Tila |
|---|---|---|
| **#2984** `siirtoseppa-radiot` (907b89fa3) | 1.10–1.16 (nippu 4, Livia, assetit ämpäriin, korkeudet, UI-tekstit, kuvamitat, kuolleet pois, maakuntarajat, lisenssit.json, lehdet, radiot); main yhdistetty | odottaa Julkaisijaa TestFlight build 3:n jälkeen |
| **#2993** `siirtoseppa-paketti2` | 2.0-suunnitelma (raportti) | auki |
| #2948 `siirtoseppa-natiivi-suunnitelma` | siirtosuunnitelma, A10 päivitetty | auki |
| ketju ilman PR:ää | `siirtoseppa-kohdekartat` (1.17 kohdekartat, lehtitehtävät, PULLA_NIMET, radioraportit) → `-tyypitys-nahtavyydet` (1.18) → `-tyypitys-kysymykset` (1.19) → `-tyypitys-elaimet` (1.20) → `-tyypitys-fokusvirrat` (1.21 fokusvirrat ja laatat, 1.22 muutosloki-natiivi, radiotarkistus, B7, pulmien generaattori, 1.23 offline-ryhmät) → **`siirtoseppa-saapumiset` 9397e4c4e (kärki, 1.24)** | **Kun #2984 on mainissa: avaa PR kärjestä** (yhdistä main ensin; ratkaise konfliktit kuten #2984:ssä) |

## Tee nämä ensin

1. **Seuraa #2984:ää** (`gh pr view 2984`). Kun se on mergetty, yhdistä main
   haaraan `siirtoseppa-saapumiset`, aja `node --test tests/sisaltopaketti.test.mjs
   tests/vienti.test.mjs` (odotus 0 fail) ja web-testit muutetuille
   js-tiedostoille. Avaa sitten PR ja kerro Julkaisijalle.
   - Mainin squash-merge tuo samat muutokset eri historiassa. Konfliktitiedostoissa,
     joissa main on sama kuin #2984:n kärki, `git checkout --ours` on oikein.
     Tarkista erikseen tiedostot, joita main on muuttanut myöhemmin.
2. **Tuotannon osoitin:** osoitinvartija päästää 1.24:n osoittimeksi. Natiivin
   lukijat on sovitettu: lehdet 1.15 (Natiivi-UI 284c798), radiot ja toimii
   (Linssiseppä), manner (Natiiviseppä f645a9f).
3. **Web/lehti.json pois:** kun Pelikoodari ilmoittaa, että
   `pelikoodari/kuori-pois` on natiivin masterissa, poista paketista
   `web/lehti.json`, `skeema/web-nakyma.schema.json` ja `manifest.webNakymat`.
   Pyydä Fablelta minor-poikkeus kuten 1.14:ssä.

## 2.0-polku (Fablen päätös)

- 1.x-tyypitys on valmis: kaikki natiivin lukemat `data`-polut ovat
  päätasolla (1.18–1.21 sekä pulmien generaattori ja kuvat).
- **Natiivin vartijatestin omistaa Pelikoodari** (Natiiviseppä ajaa sen
  tarkista.sh:ssa). 2.0 (arvio noin 36 Mt, nyt 86,5 Mt) tehdään vasta, kun
  kaikki lukijat käyttävät päätasoa. Pelikoodari lukee jo kysymykset ja
  pulmat päätasolta (375c058).
- Vaiheet: suunnitelman kohdat 4–6 (`--major 2`, kahden majorin CI,
  1.x:n jäädytys).

## Radiot (skeema 1.16 + radiotarkistus)

- Omistaja: sallittu ja epäselvä soivat, kielletty EI ole paketissa.
  17 kielletyn yleisradion maassa soi korvaava asema
  (`tools/vienti/radiokorvaavat.json`). CHE on Radio Vostok, koska RaBe ei
  läpäise iOS ATS:ää.
- `tools/vienti/radiotarkistus.mjs --paivita`: ATS-kättely (TLS 1.3 tai
  ECDHE), verkkovirheet uusitaan kahdesti. Tila 23.9.: 0 hylkäystä.
  Riveillä on `toimii` ja `tarkistus`.
- Lupakirje fi/en omistajan allekirjoitettavaksi:
  `docs/raportit/radio-luvat-mallikirje-20260923.md` (20 asemaa: 17 korvaavaa
  sekä WNYC, AIR ja Radio 9090; toisena aaltona 18 realismi 3:n asemaa).
  **Ei lähetetä ilman omistajaa.**
- `docs/raportit/teosto-gramex-muistio-20260923.md`: kysymykset ennen App
  Storea. `docs/raportit/radio-luparealismi-20260923.md`: omistaja päätti,
  että 8 riskiasemaa pidetään kuten webissä ja tarkistetaan ennen App Storea.

## Muut tämän vuoron erät

- **muutosloki-natiivi (1.22):** kokoelma (Julkaisija lisää rivin joka
  TestFlight-buildista tiedostoon `tools/vienti/muutosloki-natiivi.json`,
  ohje annettu) ja osoittimen `muutos` + `kokoelmaLkm` (julkaise-sisalto.mjs
  muutosRivi).
- **B7-äänet (Pelikoodari):** aanitaulut maisemakori:<paikka>, aarreaihe:*
  ja tilaraitaUrl:*.
- **offline.json (1.23):** `ryhmat` (maailma, 7 maanosaa, kaikki) ja
  `maat[].manner`.
- **1.24 (agentti):** kokoelmat saapumistekstit (216), takynostot (113) ja
  liviansaapumiset (10). karttavalot on koottu webin mukaan (2960, uusi
  `tools/vienti/karttavalot.mjs`), ja kohdekarttojen linkeillä on aihe.
  Kenttäluettelot natiiville olivat scratchpadissa. Lajit on kuvattu
  kokoelmien `kuvaus`-kentissä.
- **DEM:** omat kaupunkiruudut ovat kansiossa `Matkakirja-arkisto/dem/kaupunkikorkeudet/`
  (ei Karttasepän glo30-kansioon). korkeudet.mjs lukee molempia.

## Avoimet (muiden vastuulla, seuraa)

- Livian eleet.json puuttuu 40/45 kaupungilta (Sisältökirjuri, ElevenLabs).
- Bergenin ja Sevillan julistetehtävälle ei ole julistetta (sisältö).
- Web-bugi: 23 kohdekartan historian hetkeä menee kaupunkiliuskassa
  "Muut"-ryhmään (`hetkiKarttarivit`, kartalla-ehto). Välitetty
  Pelikoodarille Fablen kautta.
- Natiivi-UI:n listalta vielä tekemättä: pöllöpoiminnat ja AIHE_IKONIT
  (Livian lehtireaktioiden aihekartta).
- Lehden kiinteitä tekstejä funktioiden sisällä (päiväysrivi,
  nappitekstit): listattu 1.15:n kenttäluettelossa.

## Opetukset tästä vuorosta

- **Squash-merge ja ketju:** kun Julkaisija squashaa osan ketjusta mainiin,
  yhdistä main ketjun kärkeen heti ja vertaa konfliktitiedostoja
  squashattuun kärkeen (`git diff <kärki> origin/main -- <tiedosto>`).
- **Tilapäiset verkkovirheet:** yksi ENOTFOUND ei tarkoita kuollutta
  asemaa. Uusi ennen kuin korvaat.
- **Pelkkä tunnus media-arvona:** miniatyyrit ja eläinkuvat ovat usein
  pelkkiä tunnuksia. Ratkaise ne pelin `assetOsoite`-funktiolla, älä
  polkurakennuksella.
- **Versionumerot rinnakkaisissa erissä:** jos agentti tekee erää
  rinnakkain, varaa sille versio etukäteen (1.23 → 1.24 -törmäys).
- **Jaettu arkisto:** omat lataukset omaan alikansioon (muisti
  nas-kansiot-roolin-omat).
- **Henkilötiedot:** agenttien raporteista poistetaan henkilöiden
  nimelliset sähköpostit ennen commitia (julkinen repo).
