# Luovutus: Siirtoseppä, 29.9.2026 klo 16.1x (tilinvaihto 97 %:ssa, Päätoimittajan käsky)

Korvaa luovutuksen `-20260929.md` tilaosion. Luovutuksen `-20260926.md` osiot "Voimassa olevat työtavat" ja
"Velat ja opetukset" ovat yhä voimassa. Päätoimittaja on session local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31.

## Kärki

Mitään ei ole kesken. Ainoa auki oleva PR on docs-raportti **#3619** (pariteettikatsaus, haara `siirtoseppa-pariteetti`
5b88581da), jonka Päätoimittaja/Fable mergeää (docs-PR). Seuraava tehtävä tulee Päätoimittajalta.

- Tarkista: `gh pr view 3619 --json state`.
- Mainin kärki luovutushetkellä 9254ba0f5 (#3626). Ämpäri v326, eheysvartija kunnossa
  (`/Users/Shared/Claude/proto-3d/lokit/eheysvartija/historia.log` ja `VIKA.txt`, tyhjä = OK).

## Tällä vuorolla mainiin (kaikki MERGED)

- #3595 ISS-säätöpaneeli (savuke-iss-kyyti 49/49).
- #3583 maakunnan nostokortti, ja sen jatkona #3610: kortin koko kiinteä ja lapun/kortin avaus- ja sulkuanimaatio.
- #3599 natiivin offline-pohja ja kerma sarjaan 2026-09-27.
  - `tools/vienti/offline.mjs`, pohja 2026-09-27-pohja-20260927, kerma 2026-09-27-p060.
  - Kaikki 55 248 offline-laattaa tarkistettu HEAD 200 (Karttaseppä täydensi 613 Z10:tä).
  - Natiiviseppä vaihtoi natiivin samaan sarjaan (1.0.43-juna). Vienti v310 ok.
- #3605 avausanimaatiot erä A: `js/avausanimaatio.js`.
  - Kohteet: nostokortit ja sisaret, kohde- ja kaupunkipopup, valikot, Pulun paneeli, tekijäikkuna, kartuscha.
  - Arvot: avaus 220 ms `cubic-bezier(0.22, 0.9, 0.24, 1)`, sulku 200 ms `cubic-bezier(0.4, 0, 1, 1)`, scale 0,92.
  - Sulku ei viivytä tunnistusta, koska liike piirretään haamulla.
- #3616 avausanimaatiot erä B: dialogit `HTMLDialogElement`in prototyypissä.
  - Sulku on natiivisti heti, ja vain kuva jää 200 ms:ksi. Esc ja `method=dialog` kulkevat saman reitin.
- #3608 maailmatilan Pelaajan näkymä -apunappi.
  - Silmänappi selitteen alla. `kehittajaMaailmaPaalla()` palauttaa false pelaajan näkymässä, raakavalinta on `kehittajaMaailmaValittu()`.
  - Himmeät kaupungit: rgba 40 %, napautus = kehittäjäsiirto.
- Natiivi-UI:lle toimitettu kaikki animaatio- ja pelaajan näkymän arvot. Natiivi seuraa webiä.

## Päätöksiä ja rajauksia tältä vuorolta

- **Radiolinssi webiin: EI.** Raamattu "RADIOLINSSIN UUDISTUS NATIIVISSA … web ennallaan" on voimassa (Päätoimittaja 29.9.).
  Linssiseppä 2:n arvot arkistoitu: `proto-3d/lokit/siirtoseppa-radio-uusi/linssiseppa2-arvot-20260929.md`.
- **Poikkeukset avausanimaatiosta:** kuvan suurennos (320 ms) ja kaupungin avauskortti (280 ms) jäävät ennalleen
  (Päätoimittaja, Raamattu #3602).
- **Pariteettiraportin löydökset:** Natiivi-UI:lle yläpalkin "1/80" ja valokuvakortin kehys. Pelikoodarille webin
  Ohita/kuvateksti, kaksi lappua päällekkäin ja iPadin Liiku/Kreetanmeri. Kattavuus noin 40 %, koska 1.0.43:sta ei ole natiivin
  pysäytyskuvasarjaa.

## Worktreet (`/Users/Shared/Claude/wt/`)

- siirtoseppa-avausanimaatiot, siirtoseppa-maakuntanosto ja siirtoseppa-pelaajanakyma: PR:t mergetty. Poistettavissa.
- siirtoseppa-pariteetti: #3619 auki, pushattu, puhdas.
- **Luokitin estää tämän roolin worktree-poistot** ("Irreversible Local Destruction"). Poiston tekee omistaja, eikä sitä
  yritetä uudelleen:
  `for a in avausanimaatiot maakuntanosto pelaajanakyma; do git -C /Users/Shared/Claude/Matkakirja-siirtoseppa worktree remove /Users/Shared/Claude/wt/siirtoseppa-$a; done`
- Päächeckoutissa on `.claude/launch.json`-muutos (maakuntanosto-palvelin 8792). Se on paikallinen eikä sitä committoida.

## Opetukset tästä vuorosta

- **Savukkeet Macilla:** osa savukkeista on konttiaikaisia (`/opt/pw-browsers/chromium`, `/opt/node22/...`). Aja ne
  scratchpad-kopiona, jossa polut on vaihdettu `process.env.CHROMIUM`/`PLAYWRIGHT_JS`:ksi.
  - Chromium Macilla: `/Users/koodaus/Library/Caches/ms-playwright/chromium-1234/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing`.
  - PLAYWRIGHT_JS: `/Users/Shared/Claude/Matkakirja-fable/node_modules/playwright/index.js`.
- **Punainen savuke:** aja sama savuke ensin mainin päällä ennen kuin epäilet omaa muutosta (kaupunkietusivu ja nostovisa
  olivat vanhentuneita väitteitä, #3606).
- **Julkaisijan squash-merge ja jatkohaara:** jos haaralla on jatkohaara, main tuo ristiriidan. Ota versiotiedostot
  (`js/main.js`, `js/muutokset.js`, `sw.js`) mainista ja omat tiedostot omasta haarasta.
- **Uusi moduuli:** lisää se sekä `tools/build-standalone.mjs` MODULES-listaan (ennen tuojiaan) että `sw.js`:n SHELLiin.
  Sijoita lisäys eri riville kuin rinnakkaiset PR:t, ettei synny turhaa ristiriitaa.
- **Lähdetestit** (esim. `tests/pallonimet.test.mjs`) vartioivat rivejä sanatarkasti. Lisää uusi logiikka omille riveilleen
  ja pidä vartioidut rivit ennallaan.
- **Web-kuvaus tuotannosta:** `pariteetti-web-kuva.mjs`, iso odotus (`wait:12000`). Pallon napautukseen tarvitaan
  kosketus (`hasTouch`, `touchscreen.tap`).
- **Vertailuagentit:** Sonnet-vertailijoiden rivit on tarkistettava kuvaparista. Tällä vuorolla kuusi riviä kuudesta
  epäilyttävästä oli väärä pari, tilaero tai sallittu.
