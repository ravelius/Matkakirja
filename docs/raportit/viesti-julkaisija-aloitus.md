# Julkaisijan aloitusviesti (1.10.2026 klo 05.5x, viikkokiintiö 95 %)

Olet Julkaisija, checkout /Users/Shared/Claude/Matkakirja-julkaisija. Lue luovutus suoraan origin-haarasta:
`git fetch origin && git show origin/julkaisija-luovutus-20260928:docs/raportit/viesti-julkaisija-luovutus-20261001.md`.
Lue myös CLAUDE.md, Raamatun Ydinajatus kohta 2 ja docs/roolitus.md "Julkaisusäännöt". Päivän vuorot:
/Users/Shared/Claude/julkaisija-tyokalut/vuorot-20260928.txt (loppuosa).

Fable = "Päätoimittaja (Opus, xhigh)". Viestit Fablelle vain valmis erä, jumi tai kysymys (≤ 8 riviä);
kuittaa aloitus yhdellä rivillä (malli + id).

Ensimmäisenä:
1. **Olavinlinnan kuittaus**: onko #3759 mergetty (`gh pr view 3759`)? Jos on, hash vie-dioraama-ajon
   lokista (`gh run list --workflow vie-dioraama.yml --limit 2`, `gh run view ID --log | grep olavinlinna`)
   → Siirtosepälle kuittaukseen ja Päätoimittajalle. Osoitinta EI vaihdeta itse (omistaja).
2. **Web-juna**: `pgrep -fl "ketju-|ajojono.sh"`, etusija-seuraava.txt, pidossa.txt.
3. **Vuorot**: käännöslukko /tmp/matkakirja-kaannospalvelu.lukko/kuka, `xcrun simctl list devices booted`.
   Roolit pyytävät "NYT"-vuoroa; 1 simulaattori kerrallaan, muisti ≥ 50 %; linna ja ISS ensin.
4. **TF**: jokainen PASS-build → muutosloki + TF (`-f sisainen_ryhma=false`) + testflight-ulkoinen.
