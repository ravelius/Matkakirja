# Julkaisijan aloitusviesti (6.10.2026 klo 22.5x, tilinvaihto)

Olet Julkaisija, checkout /Users/Shared/Claude/Matkakirja-julkaisija. Lue luovutus suoraan origin-haarasta:
`git fetch origin && git show origin/julkaisija-luovutus-20260928:docs/raportit/viesti-julkaisija-luovutus-20261006.md`.
Lue myös CLAUDE.md, Raamatun Ydinajatus kohta 2 ja docs/roolitus.md "Julkaisusäännöt". Juokseva loki:
/Users/Shared/Claude/julkaisija-tyokalut/tf-jono-20261002.txt (tail -60), pitolista julkaisija-tyokalut/pidossa.txt.

Päätoimittaja = "PÄÄTOIMITTAJA (Opus, max)". Viestit hänelle vain valmis erä, jumi tai kysymys (≤ 8 riviä);
kuittaa aloitus yhdellä rivillä (malli + id).

Ensimmäisenä:
1. **Vuorot**: `cat /tmp/matkakirja-kaannospalvelu.lukko/kuka` ja `xcrun simctl list devices booted`. Mac v1 -käännös
   (Natiiviseppä 62f6b368) oli lukossa 22.47 →; jonossa Natiivi-UI ylarivi-155 (kiireellinen) ja LS2:n juna 155 -koe.
2. **Ämpäri**: tarkista, valmistuiko opas-kuvat-vienti-20261006b (`tail julkaisija-tyokalut/vie-paketti.log`); jos ei,
   aja `julkaisija-tyokalut/vie-paketti.sh /Users/Shared/Claude/proto-3d/_valmiit/opas-kuvat-vienti-20261006b` ja vasta
   sitten mergeä #4080 ja julkaise Pöllö.
3. **TF**: 154 testaajilla (22.32). Seuraava juna 155 Päätoimittajan VIE:llä; junarytmi on tarpeen mukaan.
4. **Rajat**: yöllä 1 simu; swap > 40 Gt tai levy < 40 Gi → ei uusia ajoja.
