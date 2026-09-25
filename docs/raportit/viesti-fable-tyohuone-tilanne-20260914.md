# Työhuoneen tilannekortti ajan tasalle — Sonnet, 14.9.2026

Tehtävä: `js/tyohuone-tilanne.js` oli n. viisi päivää vanhentunut
(`docs/raportit/siirto-2026-09-13-ilta-fablelle.md`, avoin kohta 7).
Päivitin `TILANNE.paivitetty`-kentän kattamaan julkaisut mainin
uusimpaan versioon asti. `TILANNE.tavoite`, `TILANNE.rivit`,
`TILANNE.odottaaPaatosta` ja `TESTATTAVAA`-taulukko ovat Fablen
juoksevaa työjonoa/testauslistaa (ei julkaisuhistoriaa), joten en
koskenut niihin — ne kuvaavat "mitä tehdään nyt", eivät menneitä
versioita, ja niiden päivittäminen vaatisi Fablen omaa arviota
kesken olevasta työstä.

## Ennen / jälkeen

- **Ennen:** `paivitetty` päättyi `8.9.2026 klo 03.40 UTC — v1683`.
- **Nyt:** uusin kirjaus on `14.9.2026 klo 01.02 UTC — v1857`.
- Lisätyt tarkistuspisteet (uusin ensin), kukin oma `EDELLINEN:`-lohkonsa:

| Aikaleima (UTC) | Kattaa versiot | Aihe |
|---|---|---|
| 14.9.2026 klo 01.02 | v1838–v1857 | Karttauudistus pallolle (erät 1–10) + v1857 kaistakorjaus |
| 13.9.2026 klo 08.42 | v1823–v1837 | Horatio/Livia-luentojen tuotantoketju + pulukorjaukset |
| 12.9.2026 klo 23.47 | v1765–v1822 | Karttanostot ≥20/maa, satelliittilinssi, karttakuvat |
| 11.9.2026 klo 12.22 | v1742–v1764 | Luentareaktiot, pulun kuuntelu, Fable-rooli Opukselle |
| 10.9.2026 klo 20.57 | v1724–v1741 | Isoisän paperikuvat 45/45, pulun reaktiorekisteri |
| 9.9.2026 klo 20.32 | v1706–v1723 | Omistajan 45 kaupungin tekstit + PuluCam-albumi |
| 8.9.2026 klo 21.41 | v1684–v1705 | Keksintölinssin viimeistely, Euroopan tekstit v1–v6 |

Vanha ketju (`8.9.2026 klo 03.40 UTC — v1683: ...` ja siitä taaksepäin)
säilyi kokonaan ennallaan uuden `EDELLINEN:`-linkin takana.

## Lähteet riveittäin

- **v1838–v1857** (huomiot Erä 1c, 3–10, v1839, v1842, v1852, v1853,
  v1856, v1857): commit-viestit `38a6bee2`, `be5ec4ad`, `4faf361a`,
  `d11a4658`, `061c3920`, `5da717c0`, `0efa3d9b`, `8609b8f1`,
  `6e8c7d6e`, `cf090106`, `27c0d43f`, `721efc3c`, `916636e4`,
  `86ad84a7`, `3894bed9`, `92e55048`, `3c985ede`, `03ef1f25`, `b20f1855`;
  raportti `docs/raportit/siirto-2026-09-13-ilta-fablelle.md` (era-
  luettelo ja avoimet kohdat); v1857:n täysi juurisyy ja AVOIN-huomio
  commit-viestistä `b20f1855` sekä `docs/raportit/viesti-fable-kaistat-20260913.md`.
- **v1823–v1837**: commit-viestit `5c39d7f1` (v1823), `6fbdc393`,
  `ed3fcc6a`, `b2875591`, `23e05bd5`, `d3bd7060`, `460b4533`,
  `786264b3`, `2edda1ab`, `3cd7d16d`, `f79fef03`, `6066f578`,
  `d3dbb242`, `595aae53`, `d2b0c3d9`, `b766f7fd` (v1821).
- **v1765–v1822**: commit-viestit `e2f146c1` … `2ee57c53` (koko lista
  `/tmp/allv2.txt`-poiminnassa git logista); ei erillistä Fable-
  raporttia tälle päivälle (12.9.), joten kuvaukset perustuvat suoraan
  commit-otsikoihin.
- **v1742–v1764**: `docs/raportit/siirto-2026-09-11-aamu-fablelle.md`
  (main v1753 -tila, pulun reaktiorekisteri) ja
  `docs/raportit/siirto-2026-09-11-ilta-opukselle.md` (main v1764
  -tila, Fable-rooli siirtyi Opus-malliin 11.9. klo 15.10) sekä
  commit-viestit v1754–v1764.
- **v1724–v1741**: commit-viestit `9d5b8528` … `96bed91c`; ei erillistä
  siirtoraporttia — kuvaukset commit-otsikoista.
- **v1706–v1723**: `docs/raportit/siirto-2026-09-09-ilta-fablelle.md`
  (Tila 9.9.2026 klo 23.30, main v1721) + commit-viestit v1722/v1723
  jatkeeksi.
- **v1684–v1705**: `docs/raportit/siirto-2026-09-08-ilta-fablelle.md`
  (sisäiset päivitysosiot 0–00000, main v1701–v1715 -tilat) +
  commit-viestit v1684–v1705 puuttuvilta kohdilta.

Aikaleimat: commitit ovat Suomen ajassa (+03:00); UTC-otsikot on
laskettu vähentämällä 3 h, samalla tavalla kuin tiedoston vanhat
kirjaukset (esim. v1683 committoitu 06.28 Suomen aikaa → kirjaus
"klo 03.40 UTC").

## Pois jääneet / ei sisällytetyt versiot

- Ei yhtään puuttuvaa versiota koko välillä v1684–v1857 jäänyt pois —
  jokainen `git log`:sta löytyvä `vNNNN:`-commit väliltä on mainittu
  vähintään ryhmätasolla.
- Versionumerot v1722, v1725–v1729, v1731–v1734, v1736 (osa),
  v1743–v1747, v1749–v1752, v1757–v1759, v1779 puuttuvat väliltä eivätkä
  ne ole virhe: ne ovat ChatGPT/Codex-session ("root") omia
  julkaisuja rinnakkaisessa versionumerosarjassa (ks.
  `docs/raportit/siirto-2026-09-11-aamu-fablelle.md`: "Tekstisessio
  (Codex) julkaisi rinnalla v1722, v1725–v1729…") — ne eivät kuulu
  Fablen/Opuksen ketjuun eikä niitä siksi listattu erikseen tässä
  tilannekortissa, samaan tapaan kuin tiedoston vanhemmatkin kirjaukset
  keskittyvät Fable/Opus-julkaisuihin.
- En muuttanut `TESTATTAVAA`-taulukkoa: se on eksplisiittisesti
  "juuri nyt testattavaa" -lista, jonka rivit siivotaan kun omistaja on
  katsonut ne (tiedoston oma docstring, omistajan linjaus 15.8.2026).
  Sen täyttäminen takautuvasti kaikilla 174 versiolla olisi ristiriidassa
  sen käyttötarkoituksen kanssa; jätin sen Fablen päätettäväksi.

## Tarkistukset

```
npm test
# tests 3321
# pass 3308
# fail 0
# skipped 13

node tools/tarkista-kaksoisavaimet.mjs
# ei kaksoisavaimia

node tools/tarkista-niputus.mjs
# niputus kunnossa: 387 moduulia, 4199 top-level-julistusta, ei törmäyksiä

grep -rn '^<<<<<<<' js css tests tools
# (ei osumia)
```

Muutettu vain `js/tyohuone-tilanne.js` (ei versionostoa, ei kosketa
muihin tiedostoihin, ei `js/tyohuone-raamattu.js`:ään).
