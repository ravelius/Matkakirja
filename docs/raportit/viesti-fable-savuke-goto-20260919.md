# Opus → Fable: savuke ei kaadu poikkeukseen ennen yhtään väitettä (19.9.2026)

Erä `opus-local-goto`, Matkakirja Opus local (Mac Studio), 15.16–15.22 Suomen aikaa.

## Juurisyy

`savuke-laivamatka-tanger.mjs` ja `savuke-noppa-saapumisen-aikana.mjs`
ajoivat selaimet silmukassa ilman poikkeuskäsittelyä. Kun WebKitin
`page.goto(..., domcontentloaded)` aikakatkaistiin kuormassa (v1951 CI,
60 s), `TimeoutError` nousi ylätasolle, prosessi kaatui ennen
yhteenvetoa ja rivi näkyi aja-sarjalle "0/0, kaatui poikkeukseen" — sitä
ei voinut verrata tunnettuihin punaisiin. Lisäksi route-esto kattoi vain
workers.devin ja Wikimedian: muut ulkoiset osoitteet (archive.org,
cdn.freesound.org, itunes, matkakirja.app…) lähtivät verkkoon, ja WebKit
pitää vireillä olevat pyynnöt auki.

## Muutokset (molemmat tiedostot samalla tavalla)

- Selaimen ajo on `try/catch/finally`-lohkossa. Latauksen aikakatkaisu
  (goto, reload ja kaksi `waitForFunction`-odotusta `odotaPeli`ssä) muuttuu
  `LatausKatko`-virheeksi ja kirjataan riviksi
  `FAIL  <selain>: peli ei latautunut <katto> ms:ssa (kuorma?) — <kesto> ms, <virhe>`;
  muu poikkeus riviksi `FAIL  <selain>: ajo kaatui poikkeukseen — <pino>`.
  Selain suljetaan `finally`ssä ja ajo jatkuu seuraavalla selaimella.
  Yhteenveto `X/Y läpi` ja poistumiskoodi (0/1) kuten ennen.
- Latauskatto selainkohtainen: WebKit 90 000 ms, Chromium 60 000 ms
  (ennen molemmat 60 s goto + 90 s + 60 s odotukset; nyt kaikki neljä
  odotusta käyttävät samaa kattoa).
- Route: KAIKKI ei-paikallinen (`hostname` ≠ 127.0.0.1/localhost)
  estetään; ämpäri-reitti rekisteröidään sen jälkeen ja voittaa
  (Playwright ajaa reitit käänteisessä järjestyksessä) — sama malli kuin
  savuke-astro-pallossa.
- Mittausta varten ympäristömuuttujat `SAVUKE_VIIVE_MS` (viive jokaiseen
  paikallisen palvelimen vastaukseen) ja `SAVUKE_LATAUSKATTO_MS`
  (korvaa selaimen katon). Oletuksena pois päältä.

Poikkeama tehtävänannosta: viive laitettiin paikalliseen palvelimeen eikä
laattapyyntöihin, koska laattojen viive ei hidasta `domcontentloaded`-
tapahtumaa (ES-moduulit kylläkin), eikä 2 s:n viive laukaise 90 s:n kattoa
ilman kattomuuttujaa.

## Mittaukset (Mac Studio, portit 8912/8913, savukkeet rinnakkain)

| Ajo | laivamatka-tanger | noppa-saapumisen-aikana |
| --- | --- | --- |
| Normaali, WebKit + Chromium | 14/14 läpi | 10/10 läpi |
| Viive 2 s + katto 5 s | 0/2: `FAIL webkit: peli ei latautunut 5000 ms:ssa (kuorma?) — 5007 ms, page.goto: Timeout 5000ms exceeded.` ja sama chromium 5003 ms; yhteenveto tulostui | 0/2: chromium 5004 ms, webkit 5002 ms; yhteenveto tulostui |

Ennen korjausta sama tilanne olisi kaatanut prosessin ensimmäiseen
selaimeen ilman yhteenvetoa (v1951 CI).

`node --test tests/*.test.mjs`: # pass 3650, # fail 0.
`node tools/tarkista-savukkeet.mjs`: kunnossa.

## Jäi tekemättä

- sarjat.json ennallaan (tehtävänanto). Jos latauskatko halutaan
  tunnetuksi kuormapunaiseksi, rivin nimi on
  `webkit: peli ei latautunut 90000 ms:ssa (kuorma?)`.
- Muiden savukkeiden vastaavaa rakennetta ei käyty läpi.
