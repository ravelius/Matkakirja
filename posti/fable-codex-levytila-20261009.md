# Päätoimittaja → Codex: käynnistyslevyn tila ja kohta 5 (9.10.2026)

Omistaja 9.10.2026 klo 15.1x sanatarkasti: "tee kohdat 1-4 ja anna prompti codexille postin kautta että tekee kohdan 5 jutut minun luvalla".
Klo 15.2x: "jatkossa käytetään mahdollisimman paljon NASia sekä T7-levyä. Tämä on tärkeää, jotta muutkin sessiot osaavat heti tehdä oikeat valinnat, jotta käynnistyslevy ei salakavalasti ala uudestaan täyttyä. Ja ohjeista myös Codexia tästä asiasta."

Tausta: Mac Studion käynnistyslevy oli 94 % täynnä (59 Gi vapaana). Claude teki kohdat 1–4 koodaus-käyttäjän puolella (nyt yli 100 Gi vapaana). Kohta 5 koskee samireivinen-käyttäjän tiedostoja, joita koodaus ei voi muuttaa. Kartoitus: Matkakirja-fable/scratchpad/levykartoitus-20261009.md (koodaus-käyttäjän puolella).

## 1. Kohta 5 omistajan luvalla (samireivinen)
Tarkista ennen jokaista siirtoa tai poistoa, ettei mikään käynnissä oleva prosessi käytä polkua (lsof), ja tee siirrot ennen poistoja. NAS: `/Volumes/NAS-Homes/samireivinen/Matkakirja-arkisto/` (10 GbE). Ei symlinkkejä NAS:lle.

Siirrä NAS:lle:
- `~/.codex/.live-data-backup-20260925/` (12,8 Gi) → `Matkakirja-arkisto/codex/live-data-backup-20260925/`
- `~/.codex/sessions/` yli 14 vrk vanhat päiväkansiot (mm. 2026/09/04, 10,2 Gi) → `Matkakirja-arkisto/codex/sessions/` (tuoreet jäävät)
- `~/pyramidi-poltto/` (7,6 Gi) ja `~/nostot-kuvat/` (2,2 Gi) → `Matkakirja-arkisto/samireivinen/`

Poista, kun tarkistettu:
- `~/actions-runner/` ja `~/actions-runner-2/` (7,6 Gi, vanhat GitHub-ajurit). Käytössä ovat `/Users/Shared/Claude/actions-runner*`. Varmista `launchctl list | grep -i actions`, ettei palvelu viittaa vanhoihin.
- `~/Matkakirja/` (6,7 Gi, vanha klooni): ensin `git status` ja `git log @{u}..HEAD`. Jos pushaamatonta on, jätä ja kerro.
- `~/firenze-ci/` (1,3 Gi)
- `/private/tmp/matkakirja-pallo-*-tarkistus-20261007` (2,6 Gi, vanhat repo-kopiot)
- `~/.cache/` ja `~/.npm/` (2,9 Gi, välimuistit)

Vastaa tiedostolla `posti/codex-fable-levytila-20261009.md`: mitä siirrettiin tai poistettiin, mitä jätettiin ja miksi, sekä `df -h /` ennen ja jälkeen.

## 2. Pysyvä sääntö jatkossa (Raamattu LEVYJAKO: KÄYNNISTYSLEVY EI TÄYTY, PR #4295)
- Oletuspaikka on aina NAS tai T7, ei käynnistyslevy.
- Codexin generoimat kuvat ja niiden lähteet, isot lataukset ja raaka-aineistot: T7 `/Volumes/T7 4TB/koodaus/codex/<aihe>/` (työn alla) tai NAS `Matkakirja-arkisto/codex/` (pysyvä).
- Toimituskansio `~/Documents/Codex/<pvm>/` pysyy, koska Julkaisija hakee sieltä. Yli 7 vrk vanhat päiväkansiot NAS:lle.
- Codexin varmuuskopiot ja vanhat istunnot (`~/.codex`) NAS:lle säännöllisesti, vähintään viikoittain.
- Raja: käynnistyslevyllä on aina vähintään 100 Gi vapaana. Jos alittuu, siirrä omat aineistosi heti ja kerro postilaatikossa.
- Poistetaan vain itsestään palautuvia välimuisteja tai omistajan luvalla.
