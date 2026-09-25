# Viesti Fablelle: savukkeet Macin runnerille (17.9.2026)

Opus-agentti, haara `claude/bold-ride-vow4ki-mac-runner`.

## Mitä tehtiin

1. **`tools/savukkeet/aja-sarja.mjs` (uusi)** — ajaa savukesarjan
   rinnakkain yhdessä prosessipuussa:
   `node tools/savukkeet/aja-sarja.mjs [julkaisu|kaikki|lista] [tuloskansio]`.
   Lukee matriisin `rakenna-matriisi.mjs`:n uudesta
   `rakennaMatriisi()`-funktiosta (sarjat.json on yhä ainoa totuus,
   sitä ei muutettu). Rinnakkaisuus `SAVUKE_RINNAKKAIN` (oletus 6),
   aikakatto `SAVUKE_AIKAKATTO_MS` (oletus 10 min/savuke; katkaistu
   savuke kirjataan uudeksi punaiseksi). Per savuke:
   `KAAPPAUKSET=<tuloskansio>/kaappaukset/<nimi>`, kuvakansio-argumentti
   kuten työnkulussa, `savuke-<nimi>.log`, `vertaa-tulos.mjs` samoin
   argumentein kuin "Tarkista tulos", `tulos-<nimi>.json`
   (`{tiedosto,kesto,tulosJson}`). Lopuksi `kirjoita-yhteenveto.mjs`:n
   taulukko + lista uusista punaisista. Poistumiskoodi 1 vain UUSISTA
   punaisista.
2. **`rakenna-matriisi.mjs`** — sama logiikka nyt funktiona
   (`export function rakennaMatriisi`), CLI säilyi ennallaan (ajetaan
   vain kun tiedosto ajetaan suoraan).
3. **Portit** — julkaisusarjassa oli aito törmäys: `savuke-astro-valokuva`
   kuuntelee kiinteää 8757:ää ja `savuke-topografialinssi` samaa 8757:ää
   (lukee `PORTTI`-muuttujan). `aja-sarja.mjs` antaa jokaiselle
   savukkeelle oman `PORTTI`-arvon (8800 + indeksi), ellei sarjat.json
   sitä aseta, ja varoittaa ennen ajoa, jos kaksi sarjan savuketta
   jakaisi kiinteän portin ilman `PORTTI`-tukea. Julkaisusarjassa ei
   jäänyt varoituksia.
4. **Neljä savuketta** (`pariisi-lahizoom`, `pallo-nostolaput`,
   `nimikyltti`, `kaupunkipopup`) lukevat nyt ensin
   `process.env.CHROMIUM` ja vasta sitten `/opt/pw-browsers/chromium`.
   Samalla niiden playwright-tuonnin varapolku lukee
   `process.env.PLAYWRIGHT_JS` (ilman tätä ne kaatuvat worktreessa,
   jossa ei ole `node_modules`-kansiota). Muuta pelikoodia ei koskettu.
5. **`.github/workflows/savukkeet.yml`** — uusi job `savukkeet-mac`
   (`runs-on: [self-hosted, macOS, ARM64]`, timeout 20 min, ei
   setup-nodea eikä selainasennusta): checkout, `CHROMIUM` ja
   `PLAYWRIGHT_JS` env:ssä, `aja-sarja.mjs`, yhteenveto
   `$GITHUB_STEP_SUMMARY`yyn, yksi artifakti (tulokset + kaappaukset),
   `rm -rf` tuloskansiolle `if: always()`. Ehto: workflow_dispatch TAI
   oman repon PR. Vanha ubuntu-matriisi (`lista`/`savuke`/`yhteenveto`)
   jää vain fork-PR:ille. `pull_request.paths` rajattu pelikoodiin:
   `index.html`, `sw.js`, `js/**`, `css/**`, `tools/savukkeet/**`,
   työnkulku itse. `concurrency` ja `workflow_dispatch` säilyivät.
   Tiedoston alkukommentti ja `tools/savukkeet/README.md`:n
   Actions-osio päivitetty.

## Mittaus (yksi ajo, Mac Studio, worktree, `SAVUKE_RINNAKKAIN=6`)

Seinäkello **364 s (6 min 4 s)**, prosessiaikaa yhteensä 1718 s,
743/780 väitettä läpi.

| Savuke | Tulos | Kesto |
| --- | --- | --- |
| astro-aani | 24/24 OK | 66 s |
| astro-pallo | 78/78 OK | 307 s |
| astro-valokuva | 180/180 OK | 138 s |
| ihmisen-esitys | 13/13 OK | 50 s |
| ihmisen-kappaleet | 36/38 tunnettu punainen | 125 s |
| ihmisen-kehys | 9/11 **2 uutta** | 61 s |
| kaupunkipopup | 44/61 tunnettu punainen (17) | 174 s |
| nimikyltti | 58/63 3 tunnettua + **2 uutta** | 120 s |
| pallo-nostolaput | 6/8 1 tunnettu + **1 uusi** | 31 s |
| pariisi-lahizoom | 72/74 **2 uutta** | 253 s |
| satelliittilinssi | 187/192 2 tunnettua + **3 uutta** | 249 s |
| topografialinssi | 36/38 **2 uutta** | 144 s |

Kriittinen polku on `astro-pallo` (307 s), joten alle 5 min ei pääse
rinnakkaisuutta nostamalla — 6 on käytännössä riittävä. Rinnakkaisuuden
nosto (8–12) lyhentäisi seinäkelloa vain ~60 s ja lisäisi kuorman
aiheuttamaa häilyntää; suositus: pidetään 6.

## Oletukset ja huomiot

- 12 "uutta punaista" EIVÄT näytä polku- tai porttiongelmilta (kaikki
  savukkeet käynnistyivät ja ajoivat väitteensä loppuun), vaan macOS +
  Chrome for Testing -ajoympäristön eroilta Linux-konttiin: mm.
  `nimikyltti` vetovartiot (siirto 102 px), `satelliittilinssi`
  asettelu-/kelausvartiot, `ihmisen-kehys` näytteenotto (0 näytettä),
  `pallo-nostolaput` napautusosumat. Tehtävänannon mukaan vastakoetta
  ei ajettu. **Tämä tarkoittaa, että ensimmäiset Mac-ajot näyttävät
  punaista, kunnes sarjat.json:n tunnetut punaiset kalibroidaan
  Macille** — se on Fablen päätös, sarjat.jsonia ei muutettu.
- `CHROMIUM`- ja `PLAYWRIGHT_JS`-polut on kirjoitettu työnkulkuun
  absoluuttisina (Chromium `~/Library/Caches/ms-playwright/chromium-1234`,
  playwright 1.62.1 päähakemiston `node_modules`:sta). Jos Playwright
  päivittyy, chromium-versionumero täytyy päivittää työnkulkuun.
- launchd-palvelun PATH:iin ei luotettu: askel lisää itse
  `/opt/homebrew/opt/node@22/bin` (node v22.23.2).
- `node --test tests/*.test.mjs`: 3578 testiä, **0 fail** (3565 pass,
  loput skip/todo).

## Auki

- Mac-ajon tunnettujen punaisten kalibrointi (ks. yllä).
- Runnerin asetuksiin ei koskettu; PR:n avaaminen laukaisee
  ensimmäisen oikean `savukkeet-mac`-ajon, jonka tulosta ei jääty
  odottamaan.

## HUOM: työnkulkumuutos ei mahtunut PR:ään

Agentin gh-token on scopeilla `gist, read:org, repo` — ei `workflow`,
joten GitHub hylkäsi pushin (`refusing to allow an OAuth App to create
or update workflow .github/workflows/savukkeet.yml`). `savukkeet.yml`
palautettiin siksi tässä haarassa mainin versioon, ja valmis muutos on
tallennettu patchina:

    tools/savukkeet/ehdotus/savukkeet-yml-20260917.patch

Ota käyttöön Fablen/omistajan tunnuksilla (token, jolla on `workflow`):

    git apply tools/savukkeet/ehdotus/savukkeet-yml-20260917.patch
    git add .github/workflows/savukkeet.yml && git commit

(tai `gh auth refresh -s workflow` ja push uudelleen). Ennen sitä
`savukkeet-mac`-jobia ei ole olemassa, eli tämän PR:n avaaminen EI
vielä laukaise Mac-ajoa — vanha ubuntu-matriisi ajaa normaalisti.
Patchin poistaminen repo-juuresta kannattaa tehdä samalla commitilla,
kun työnkulku on otettu käyttöön.
