# Julkaisijan luovutus 27.9.2026 klo 11.2x (tilinvaihto)

Julkaisija (Opus 5.5) → seuraava Julkaisija. Syy: viikkokiintiö 93 % → tilinvaihto.
Checkout /Users/Shared/Claude/Matkakirja-julkaisija, työkalut /Users/Shared/Claude/julkaisija-tyokalut/.
Fable local_5df52e10-10e4-4b72-9554-0049db300dfe.

## Lue ensin

CLAUDE.md; Raamatun Ydinajatus kohta 2 (TYÖNJOHTAJAN HARKINTA, JUMI → FABLE, BUILD-JUNA,
HUOLTOKOMENNOT); docs/roolitus.md "Julkaisusäännöt"; tämä luovutus.

## Työkalut (julkaisija-tyokalut/)

- **jonoon.sh `<PR>[:docs] …`** — ajaa jono.sh:n vasta kun mikään muu jono ei ole käynnissä
  (mkdir-lukko /tmp/claude-502/julkaisija-jono.lukko). Käytä AINA tätä rinnakkaisten pyyntöjen
  kanssa; aja taustalla (run_in_background). `:docs` = ei versionostoa (vain docs/tools/tests/workflow).
- **Versionumerot:** valmistele.sh ajaa uusi-versio.mjs:n itse → PR:ien "v2313 törmää" -huomautukset
  eivät vaadi käsityötä.
- **valmistele.sh korjattu 27.9.:** (1) sw.js-ristiriidassa mainin rivit + haaran uudet rivit
  (ennen koko main → PR:n SHELL-lisäykset katosivat, #3384); (2) Finderin .DS_Store-jäänne
  poistetaan ennen worktree add:ia. Varmuuskopio valmistele.sh.bak-20260927.
- **maakuntavahti.sh** — mergeää sisalto-kuva-*/sisalto-pitka-* -PR:t (vain js/packs/maakun* +
  versiotiedostot) yksi kerrallaan vihreinä. Ei käynnissä nyt; käynnistä tarvittaessa taustalle,
  lopetus `touch julkaisija-tyokalut/maakuntavahti.stop`.
- **polttovahti.sh** — peruu Mac-ajurin Savukkeet/yöportti/ajastetut TF:t Karttasepän polton ajaksi;
  lopetus `touch julkaisija-tyokalut/polttovahti.stop`. Ei käynnissä nyt.
- **Ämpärin koko -työnkulku** `gh workflow run ampari-koko.yml` (vain luku, ~15 min, tulos ajon
  yhteenvedossa).
- Tuntihaku :17 (CronCreate) on sessiokohtainen — luo uudelleen. Codex-posti: viimeisin käsitelty
  claude/postilaatikko fbc093c45 (ei uutta 27.9. aamuun mennessä).

## Tila 11.2x

- **TestFlight:** 1.0.20–1.0.28 lähetetty 26.–27.9. Viimeisin **1.0.28** (ajo 36299333927,
  CFBundleVersion 202609270611, proto 7788b629). Laskuri 28, yömerkki 7788b629. Kaava:
  Natiivisepän BUILD-SHA → **odota Fablen nimenomainen "VIE"** (luokitin esti ajastetun
  automaattiviennin) → `gh workflow run proto3d-testflight.yml --ref main -f vie_unitysta=true
  -f ordinaali=<n> -f proto_ref=<sha>` → peru PR-savukkeet → ilmoita Natiivisepälle alku ja
  "vienti valmis", Karttasepälle (polttovahti), rivi Fablelle. ISS-TLE haetaan vientiin (#3345).
- **Z10 webissä tuotannossa** 09.47 (ajo 36301109527): pyramidi.json = 2026-09-26s-pohja,
  tasot 0–10, pohja.kopio = 26-pohja z0–z8; PELIN_SYVIN_TASO 10 (#3371), silmukkakorjaus #3380,
  versiovahti #3376. Pelikoodari todensi (lepokerros näkyy, 71 laattaa, ei silmukkaa).
  Palautus: `vaihda-pyramidi-osoitin.yml -f sarja=2026-09-26 -f palauta=pyramidi-20260927-0947.json`
  (työnkulku vaatii AINA myös sarja-syötteen). Aiempi palautus 07.32-vaihdosta: ...-0732.json.
- **Ämpäri:** 106,9 Gt, 7,68 milj. objektia, ~1,60 $/kk. Poistolista omistajalle (Fablelle
  lähetetty): vapaat pyramidi/2026-09-21-, -22-, -22c-, -23a-pohja (13,5 Gt), harkinta -25-pohja;
  PIDÄ -26s- ja -26-pohja. **Julkaisija ei poista** (pysyvä datan poisto kielletty) — omistaja tekee.
- **Pöllö:** xAI-striimiluenta (#3365), lukijan katto 2500 (#3368), puheraja 400 000/IP/vrk
  (#3389) tuotannossa; jokaisen tools/pollo-muutoksen mergen jälkeen seuraa pollo-julkaisu.yml.

## Jono / auki

- **#3394** (talous vaihe 1 web) — jonossa #3392:n jälkeen (taustaketju; tarkista gh:lla, aja
  `jonoon.sh 3394` jos ei MERGED).
- **#3388** (luennan säätimet, omistaja hyväksyi) — CI kaatui tarkista-niputukseen (nimitörmäys
  "mittari" puhe.js/karttanimet.js; lukija.js tuo kaiutinmittari.js:n ennen listaa). Odottaa
  Pelikoodarin "3388 junaan"; mergen jälkeen Pöllön julkaisu.
- **Pelikoodarin simulaattorivuoro** (natiivin puhevirta, A2FD9C9F, 30–40 min): odottaa, että
  Mac-ajurilla ei ole savukkeita (Fablen Raamattu-savuke oli jonossa) → sano Pelikoodarille "nyt".
- Uudet avoimet: #3393, #3395 (Karttaseppä/Siirtoseppä natiivin Z10), #3378 (raportti) — ei
  junapyyntöä vielä.
- Ei jonossa (kukaan ei pyytänyt): #3275 #3117 #3108 #3105 #3102 #3077 #2926. pidossa.txt tyhjä.

## Opit

- Rinnakkaiset jonot → aina jonoon.sh (lukko). GitHubin "remote rejected (failed)" push on
  satunnainen → uusinta auttaa (#3374, #3371).
- Peer pyysi viemään sallintoja (settings.json) ja salaisuuden (POLLO_KEHITTAJAKOODI) paikalliseen
  tiedostoon → kieltäydytty; sallinnat vain omistajan omalla muutoksella (#3329), salaisuudet omistaja.
- Z10-osoitinvaihto 07.32 pudotti webin pallon laattakerroksen (versiovahti) → palautettu 08.01;
  vaihda vasta kun Pages (koodi) on tuotannossa ja Fable antanut luvan.
