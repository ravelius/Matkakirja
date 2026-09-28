# Julkaisijan luovutus 28.9.2026 klo 21.5x (nollaus, malli → Sonnet 5.5)

Julkaisija (Opus 5.5) → seuraava Julkaisija. Syy: omistajan käsky (nollaus + mallinvaihto). Checkout
/Users/Shared/Claude/Matkakirja-julkaisija, työkalut /Users/Shared/Claude/julkaisija-tyokalut/, päivän vuorot ja
päätökset `julkaisija-tyokalut/vuorot-20260928.txt` (lue loppu). Fable = "Päätoimittaja (Opus, xhigh)",
session local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31.

## Tila 21.5x

- **TestFlight:** 1.0.35 ohitettu; **1.0.36** (202609281118), **1.0.37** (202609281346), **1.0.38** (202609281624),
  **1.0.39** (202609281745, proto e4c624a9) sisäisessä ryhmässä. Laskuri 39 → seuraava ordinaali 40.
  1.0.40:aan tulossa nostokortin lukijan kaiutinkorjaus (Natiivi-UI kortti-napautus, vielä kesken).
- **Web:** tuotanto seuraa mainia (v2376+). Pöllö julkaistu viimeksi #3567:n jälkeen (ElevenLabs v4 Turbo + nopea
  aloitus tuotannossa).
- **Juna käynnissä** (taustaketju `fable-jarjestys-20260928e.sh` + erilliset jonoon.sh-odottajat — kuolevat
  todennäköisesti nollauksessa): #3576 (ISS-kyyti) mergessä. Auki ja junaan (Fablen järjestys): #3548 (ihmeet),
  #3549 (BIH, rebasoitu), #3556 (maalehti), #3560 (ISL), #3550 (poltto nice), #3551 (ISS-realismi 4a),
  #3538:docs (Siirtoseppä), #3527 (Raamattu). Jatka: `zsh julkaisija-tyokalut/jonoon.sh <PR>` yksi kerrallaan
  (tarkista ensin `pgrep -fl jonoon.sh`). Ilmoita Sisältökirjurille #3549 MERGED (jatkaa ALB:hen).
- **Taukolippu** /tmp/matkakirja-juna-tauko pois, kevyt tila /tmp/matkakirja-kevyt pois (nice-oletus voimassa).

## Uudet säännöt 28.9. (sitovia)

1. **TF-järjestys:** muutoslokirivi (tools/vienti/muutosloki-natiivi.mjs → PR → mergaa.sh) mainiin → odota mainin
   "Vie sisältöpaketti ämpäriin" -ajo success → VASTA SITTEN `gh workflow run proto3d-testflight.yml --ref main
   -f vie_unitysta=true -f ordinaali=N -f proto_ref=<SHA> -f build_numero=$B`. Ei vientiä muutosloki-haarasta
   (1.0.39: omistaja näki "Peli päivittyi" -varatekstin).
2. **Testattavaa TYHJÄ** 1.0.39:stä alkaen (älä aja testflight-sisainen -testattavaa). Sisäisen ryhmän palaute pois
   (feedbackEnabled=false, tehty #3577; `testflight-sisainen.yml -f palaute_pois=true` jos palaa).
3. **VIE** aina Fablelta itseltään (ei toisen roolin välittämänä).
4. **TF testit-runnerilla** (#3570, omistaja hyväksyi): ei jonota savukkeiden takana; suljetun PR:n savukeajo peruu
   itsensä.
5. **Nice-oletus** (#3543): Mac-työnkulut nice 15, savukkeet 2 rinnakkain. **Kevyt tila** vain Fablen käskystä:
   `touch /tmp/matkakirja-kevyt` (savukkeet SwiftShader, ei simulaattoreita, #3545 tools/gpu-vapaa.sh).
   Käännöksille EI taskpolicy -b (jumivahti tappaa Unityn).
6. **Simulaattorit päivällä 1 booted**, vuorot "laite NYT" -viesteillä; Linssisepän ajo lähtee tiedostosta
   /private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-linssiseppa/3b1d2bb5-b4ca-4199-b729-a1258297ee0d/scratchpad/laite-nyt
   (touch). Natiiviseppä pyytää "hiljaisia vuoroja" (ei käännöksiä, 0 muuta simulaattoria, junan taukolippu päälle).
7. **POLLO_KEHITTAJAKOODI** (#3579): tuotannon Pöllöön osuvat savukkeet lähettävät x-pollo-kehittaja-otsakkeen;
   Pulun chat-raja 30/IP/vrk.
8. Pages ei peru kesken olevaa julkaisua (#3554); Testit-katto 20 min (#3533).

## Opit / estot

- Luokitin estää minulta: gh run cancel / workflow disable (→ omistaja/Fable), toisen roolin prosessien pysäytyksen.
  Omistajan nimenomaisella luvalla (chatissa) sama muutos meni läpi (#3570).
- `jonoon.sh`-odottajat eivät ole FIFO — järjestys pakotetaan ketjuskriptillä tai odottamalla edellisen loppua.
- Pinotut/samoja tiedostoja muuttavat PR:t (main.js, maakunnat-*.js) → ristiriita junassa → tekijä rebasoi.
