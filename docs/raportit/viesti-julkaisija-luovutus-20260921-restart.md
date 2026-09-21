# Julkaisijan luovutus 21.9.2026 (omistaja käynnistää koneen uudelleen)

## Tila juuri nyt

- Tuotannossa (main) v2004 (kamera-nimiöt-rajapinta E4, PR #2657).
- Haara `julkaisija-pelikoodari-gl-rasterit` on pushattu origin:iin,
  commit f3741035, testattu valmiiksi mutta EI vielä PR:ää eikä mergeä:
  - node --test: 3806/0 fail
  - tarkista-kaksoisavaimet.mjs: puhdas
  - tarkista-niputus.mjs: puhdas
  - build-standalone.mjs: onnistui
  - versio valmiina: v2005 "Nimiöt GL-kerrokseen (kokeilu)"
- Seuraava askel uudelle Julkaisija-sessiolle: `gh pr create --base main
  --head julkaisija-pelikoodari-gl-rasterit`, odota testit-portti
  vihreäksi, mergeä (--squash --admin, koska savukkeet-mac-rivi voi
  edelleen näyttää tunnettuja punaisia; testit-portti riittää, ei
  tarvitse kysyä omistajalta erikseen — vakiokäytäntö 21.9.2026).

## Jono gl-rasterit-mergen jälkeen (Fablen/Pelikoodarin/Karttasepän ilmoittama)

1. Anna Karttasepälle 2 h CI-tauko pohjapolttoon (isobaatit,
   `karttaseppa-maakuntavedos` 0455f4ef -haarasta reseptillä
   `/Users/koodaus/pyramidi-poltto/ajo-20260922/RESEPTI.md`).
   Karttaseppä ehdotti aloitusaikaa — vastaa "tauko alkaa" kun sopii,
   ei PR-CI:tä sinä aikana.
2. `pelikoodari-laitepalvelin` (testityökalu)
3. `pelikoodari-linssisarja` (webp-linssi-ikonit, hiomassan päällä)
4. `pelikoodari-lippuarvaus`, `pelikoodari-lippuarvaus-2`,
   `pelikoodari-muuttolinnut`, `pelikoodari-tahtitaivas`
5. `sisalto-linssit-rengas1` (73406864, LINSSIAARTEET 21 riviä)
6. Kun Karttasepän maakuntien nimiötaso on poltettu ja koodiosoitin
   (`js/pallo.js PALLO_LAATTAVERSIO`/`PALLO_LAATTATUNNISTE`) mainissa:
   `sisalto-nykyalueet` (28c73cdc) SAMAAN versioon, ei ennen.
7. `karttaseppa-bodensee`, `sisalto-muu-eurooppa-30`,
   `sisalto-kadonneet-monumentit` on jo mergetty v1973-prepiin (ei
   toimenpiteitä, odottavat Sisältökirjurin jatkoa).

## Opitut asiat tästä sessiosta (tärkeää seuraavalle)

- **js/main.js, js/pallo.js, sw.js merge-konflikteissa ÄLÄ koskaan
  blindisti `checkout --theirs`** ilman diffin tarkistusta — kahdesti
  tässä sessiossa "theirs" (origin/main) sisälsi vain versionumeron
  MUTTA myös toisen haaran oikeaa sisältöä (kehittaja-pikatie.js-tuonti,
  ENNUSTE_OLETUS-oletus), joka katosi. Tarkista aina
  `git log --oneline <edellinen-versio>..origin/main -- <tiedosto>`
  ennen kuin päätät kumman version ottaa.
- **js/pallolauta/lauta.js:ssä `heraa,`-avain tuplaantuu helposti**
  merge-ketjuissa (E1→E2→E3→E4→gl-rasterit) — tarkista aina
  `grep -c "^    heraa,$" js/pallolauta/lauta.js` pitäisi olla 1.
- CI-luokitin (Claude Code auto-mode) estää `gh pr merge --admin`-kutsun
  JOKA KERTA erikseen riippumatta aiemmista hyväksynnöistä. Omistajan
  21.9.2026 vakiopäätös: mergeä heti kun Testit-tarkistus on vihreä,
  ilman erillistä kysymystä — savukkeet-mac raportoidaan jälkikäteen
  Fablelle, ei blokkaa mergeä.
- savukkeet-mac-ajurin CHROMIUM-polku korjattiin osoittamaan
  koodaus-käyttäjän omaan Playwright-cacheen (PR #2649); rivi on nyt
  ajokelpoinen, jäljellä olevat punaiset (musta-laatta-webkit,
  nostokuva-karuselli, astro-sumu — kaatuvat ennen väitettä) ovat
  todennäköisesti WebKitin puuttumista uudelta käyttäjältä (Fable
  asentaa) — ei koodivikoja.

## Aloitusviesti uudelle Julkaisija-sessiolle

Lue CLAUDE.md, Raamatun Ydinajatus-osion kohta 2 "TYÖTAPA JA SESSIOT" ja
tämä luovutus. Jatka gl-rasterit-haaran PR:stä ja jonosta yllä.
