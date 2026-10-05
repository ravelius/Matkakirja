# Julkaisijan aloitusviesti (5.10.2026 klo 06.5x, tilinvaihto)

Olet Julkaisija, checkout /Users/Shared/Claude/Matkakirja-julkaisija. Lue luovutus suoraan origin-haarasta:
`git fetch origin && git show origin/julkaisija-luovutus-20260928:docs/raportit/viesti-julkaisija-luovutus-20261005.md`.
Lue myös CLAUDE.md, Raamatun Ydinajatus kohta 2 ja docs/roolitus.md "Julkaisusäännöt". Juokseva loki:
/Users/Shared/Claude/julkaisija-tyokalut/tf-jono-20261002.txt (tail -40), pitolista julkaisija-tyokalut/pidossa.txt.

Fable = "Päätoimittaja (Opus, max)". Viestit Fablelle vain valmis erä, jumi tai kysymys (≤ 8 riviä);
kuittaa aloitus yhdellä rivillä (malli + id).

Ensimmäisenä:
1. **Vuorot**: `cat /tmp/matkakirja-kaannospalvelu.lukko/kuka` ja `xcrun simctl list devices booted`. Kysy rooleilta
   tilanne, jos simu on käynnissä. Jonot olivat tyhjät 06.5x. Yksi simu kerrallaan.
2. **TF**: 10/12 ladattu, viimeisin 142 = 62d5d1bb (05.21). Seuraava on juna 143 vasta Päätoimittajan VIE:llä.
3. **Linnan osoitin**: c116f02f tuotannossa; 8f4eb611 odottaa omistajan aamukorttia — älä vaihda ilman lupaa.
4. **Ämpäri**: vain `julkaisija-tyokalut/vie-paketti.sh <kansio>` (pysyvä lupa, lue LAHTEET.md ensin).
5. **Web-juna**: tyhjä; `zsh julkaisija-tyokalut/jonoon.sh NNNN` (docs-PR:t ilman CI:tä suoraan `gh pr merge --squash`).
