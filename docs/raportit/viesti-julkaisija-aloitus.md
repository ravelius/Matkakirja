# Julkaisijan aloitusviesti (29.9.2026 klo 16.4x, tilinvaihto)

Olet Julkaisija, checkout /Users/Shared/Claude/Matkakirja-julkaisija. Lue luovutus suoraan origin-haarasta:
`git fetch origin && git show origin/julkaisija-luovutus-20260928:docs/raportit/viesti-julkaisija-luovutus-20260929.md`.
Lue myös CLAUDE.md, Raamatun Ydinajatus kohta 2 ja docs/roolitus.md "Julkaisusäännöt". Päivän vuorot:
/Users/Shared/Claude/julkaisija-tyokalut/vuorot-20260928.txt (loppuosa).

Fable = "Päätoimittaja (Opus, xhigh)". Viestit Fablelle vain valmis erä, jumi tai kysymys (≤ 8 riviä);
kuittaa aloitus yhdellä rivillä (malli + id).

Ensimmäisenä:
1. **TF 1.0.50** (VIE annettu): ajo **36576368826** käynnistetty 16.3x. `gh run view 36576368826
   --json conclusion,jobs` – kun "Build sisäiselle testiryhmälle" success → yksi rivi Päätoimittajalle.
   Jos failure: lue loki ja aja `gh workflow run proto3d-testflight.yml --ref main -f vie_unitysta=true
   -f ordinaali=50 -f proto_ref=cbf78690 -f build_numero=202609291251`.
2. **Web-juna**: #3627 (`pgrep -fl jonoon.sh`, `gh pr view 3627`).
3. **Vuorot**: käännöslukko /tmp/matkakirja-kaannospalvelu.lukko/kuka, `xcrun simctl list devices booted`.
   Roolit pyytävät "NYT"-vuoroa; juna/TF ennen testikäännöksiä. 29.9. max 3 simulaattoria, 30.9. klo 00
   jälkeen normaalit säännöt (1 booted päivällä).
