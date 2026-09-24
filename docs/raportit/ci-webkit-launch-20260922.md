# CI: WebKit-savukkeiden launch-aikakatkaisu (22.9.2026)

Muistio Laitetestaajalta Fablen pyynnöstä, ei ratkaistu tänä iltana.
Jatko huomenna ennen päivän töitä (omistaja päättää ajan).

## Oire

Self-hosted-runnerin `savukkeet-mac`-jobissa (SamiMacStudio2) osa
WebKit-savukkeista kaatuu poikkeukseen koodilla 1 ennen yhtään
OK/FAIL-riviä. Sanatarkka virhe (identtinen joka kaatuneessa,
vaihtelee vain tiedostorivi ja pid):

```
browserType.launch: Timeout 180000ms exceeded.
Call log:
  - <launching> /Users/koodaus/Library/Caches/ms-playwright/webkit-2336/pw_run.sh --inspector-pipe --headless --no-startup-window
  - <launched> pid=NNNNN
    at .../tools/savukkeet/savuke-<nimi>.mjs:RR:CC {
  name: 'TimeoutError'
}
```

WebKit-prosessi saa pidin ("launched") mutta `--inspector-pipe`-
kättely ei koskaan valmistu — Playwrightin oma 180 s:n
launch-aikakatkaisu laukeaa. Chromium-savukkeet eivät kärsi.
Vaihteleva määrä eri savukkeita per ajo (10–15/76–78), aina niitä
jotka käyttävät WebKitiä (joko `#webkit`-variantti tai oletusmoottori).

## Aikaraja

Ensimmäinen kaatunut ajo: **35756125090, klo 19.44 paikallista
(16.44 UTC) 22.9.2026.** Kaikki `savukkeet-mac`-ajot siitä lähtien
ovat kaataneet saman WebKit-joukon riippumatta PR:n sisällöstä —
todettu myös PR #2850:ssä (ei liity sen koodiin) ja jokaisessa sen
jälkeisessä ajossa tähän iltaan asti.

## Poissuljetut syyt

- **Sarjan rinnakkaisuus (SAVUKE_RINNAKKAIN=6):** ei toistunut.
  Ajoin samat 12 CI:ssä kaatunutta savuketta paikallisesti samalla
  rinnakkaisuudella ja samasta PR-haarasta (`/Users/koodaus/
  wt-laitetestaaja-2850`) — 0/12 launch-aikakatkaisua, seinäkello 89 s.
- **Ruudunsäästäjä/näytön lukitus:** ei päällä tarkistushetkellä
  (`screenSaverIsRunning` → 0).
- **Näytön uni:** estetty (`pmset -g assertions`,
  InternalPreventDisplaySleep+PreventUserIdleSystemSleep päällä).
- **Tiedostokahvaraja (ulimit -n / kern.maxfilesperproc):** korkea
  sekä launchd-kontekstissa (`launchctl asuser $(id -u) ulimit -n` →
  1048576) että kernelin oletuksena (`kern.maxfilesperproc` 245760) —
  ei ilmeistä eroa ajurin ja tavallisen istunnon välillä.
- **Jumiutunut/orpo prosessi:** aiemmin havaittu jumissa ollut
  Playwright.app-prosessi (pid 91396) ei ollut enää käynnissä
  tarkistushetkellä; ei muitakaan orpoja `Playwright.app`/`pw_run`-
  prosesseja löytynyt.
- **Ajurin oma prosessitila:** omistaja käynnisti
  `actions.runner.ravelius-Matkakirja.SamiMacStudio2`-LaunchAgentin
  uudelleen klo 22.38 paikallista (`launchctl kickstart -k`,
  vahvistettu tuoreesta `Runner.Listener`-pidistä). **Ei korjannut**:
  seuraava ajo (35776510683, PR #2863, valmistui klo 23.08 paikallista)
  kaatoi silti 12/78 WebKitiä, sanatarkasti sama virhe (varmistettu
  artefaktista). Vika on siis ajurin OMAA prosessia ylempänä —
  WindowServer/GUI-sessio tai itse WebKit-selaimen tila, ei
  Runner.Listener.

## Ei vielä kokeiltu / ei ehditty

- Koko Macin uudelleenkäynnistys.
- `webkit-2336`-selainkopion poisto ja uudelleenlataus
  (`npx playwright install webkit`).
- Ajon SISÄLTÄ otettu env-dumppi (`env` savukkeen omasta
  prosessista) vertailuna omaan kuoreen — ei ehditty, koska
  paikallinen toisto ei toistanut vikaa eikä siksi antanut vertailu-
  ympäristöä samasta jumitilasta.

## Ehdotettu järjestys huomiselle

1. **Koko Macin uudelleenkäynnistys** (todennäköisin: korjaa
   WindowServer/GUI-session tason jumin, jota pelkkä LaunchAgentin
   restart ei tavoittanut).
2. **Jos jatkuu:** `rm -rf ~/Library/Caches/ms-playwright/webkit-2336`
   ja `npx playwright install webkit` (uudelleenlataa selainkopion
   siltä varalta, että se itse on korruptoitunut).
3. **Jos jatkuu:** env-dumppi ajon sisältä (esim. tilapäinen
   `env > /tmp/ajurin-env.txt` yhden savukkeen sarjaan ennen
   `browserType.launch`-kutsua) ja vertailu tavalliseen istuntoon
   — nyt paikallinen toisto ei tavoittanut jumitilaa, joten suora
   ympäristövertailu vaatii dumpin JUURI siltä ajurilta kun se on
   rikki.

## Väliaikainen sääntö (Fable, 22.9.2026 ilta)

Kunnes yllä oleva on ajettu: mergeille sallitaan vain punaisia, jotka
ovat launch-aikakatkaisuja (edellä kuvattu virhe), ei muita.

## Viitteet

- Ensimmäinen kaatunut ajo: 35756125090.
- PR #2850 (v2127) merged ympäristövikana.
- Vahvistusajo restartin jälkeen: 35776510683 (PR #2863).
- Laitetestaajan Fablelle lähettämät viestit tässä sessiossa (ei
  erillistä lokia).
